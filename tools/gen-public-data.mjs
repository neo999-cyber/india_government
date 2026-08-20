#!/usr/bin/env node
/**
 * PUBLISH THE CORPUS AS DATA — emit `public/data/v1/` so the machine-readable layer is reachable
 * by something other than `git clone`.
 *
 * WHY THIS EXISTS. 2.8 MB of schema-validated JSON is revalidated on every build and served to
 * nobody: `https://india-government.vercel.app/data/pairs.json` returned **404** when this was
 * written, no page carried a download, and no build output contained a `.json` a reader could
 * fetch. Every number on the site is traceable to a source by hand and none of it is traceable by
 * a machine — which is the difference between a site a researcher reads and one they can cite.
 *
 * ============================ THE VERSIONED PATH IS THE WHOLE DESIGN =========================
 *
 * **Serving `/data` turns the schemas into a public contract, and that is a cost, not a freebie.**
 * Today an enum addition is a one-line change agreed in chat; the moment somebody's script parses
 * `assessment`, it is a breaking change for them. So the path carries a version — `/data/v1/` —
 * and `v1` means *these schemas*. A member added to an enum ships under the same version because
 * it cannot break a reader that ignores unknown values; **a member removed, renamed or retyped, or
 * a required field added, is `v2`.** That rule is printed in the manifest, beside the data, where
 * a consumer meets it, rather than living here where only this repository can read it.
 *
 * The schemas ship WITH the data for the same reason. A contract a consumer cannot read is not a
 * contract, and pointing at a GitHub URL makes the guarantee depend on a repository staying public.
 *
 * ============================ WHAT IT DOES NOT DO ============================================
 *
 * **It publishes no derived quantity, no roll-up, and no join.** `/derivations` exists for the
 * first, and the other two would be this instrument shipping an analysis under the name of data.
 * The files are the layers as they sit in `/data`, concatenated per layer and otherwise untouched
 * — same ids, same field names, same values, so a figure on a page and a figure in the JSON are
 * the same figure and can be checked against each other.
 *
 * **It writes into `public/`, which is gitignored for this path.** The output is derived and would
 * otherwise churn the tree on every build; it is regenerated before `next build` in the same
 * chain, so the deployed copy is always the committed corpus and never an older snapshot.
 *
 * Usage:  node tools/gen-public-data.mjs   ·   npm run public-data
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveBuildCommit } from './lib/build-commit.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data');
const SCHEMAS = join(ROOT, 'schemas');
const OUT = join(ROOT, 'public', 'data', 'v1');

/** Read one layer, whether it is a directory of files or a single file. */
function layer(rel) {
  const p = join(DATA, rel);
  if (!existsSync(p)) throw new Error(`gen-public-data: missing layer ${rel}`);
  const files = rel.endsWith('.json')
    ? [p]
    : readdirSync(p)
        .filter((f) => f.endsWith('.json'))
        .sort()
        .map((f) => join(p, f));
  const out = [];
  for (const f of files) {
    const j = JSON.parse(readFileSync(f, 'utf8'));
    const arr = Array.isArray(j) ? j : (j.records ?? []);
    out.push(...arr);
  }
  return out;
}

const layers = {
  ledger: layer('ledger'),
  series: layer('series'),
  provenance: layer('provenance.json'),
  pairs: layer('pairs.json'),
};

/**
 * ASSERT BEFORE WRITE — the ordering rule, applied here because this script deletes a directory.
 *
 * Every layer must be non-empty and every record must carry an id, checked on the computed value,
 * BEFORE anything is removed or written. A generator that empties the published corpus and reports
 * success is the exact shape of the failure that cost this project a memory file.
 */
for (const [name, arr] of Object.entries(layers)) {
  if (!Array.isArray(arr) || arr.length === 0) {
    console.error(`gen-public-data FAILED — layer "${name}" came back empty; nothing written`);
    process.exit(1);
  }
  const missing = arr.filter((r) => !r || typeof r.id !== 'string' || !r.id).length;
  if (missing) {
    console.error(`gen-public-data FAILED — ${missing} record(s) in "${name}" carry no id`);
    process.exit(1);
  }
}

const schemaFiles = readdirSync(SCHEMAS).filter((f) => f.endsWith('.json')).sort();
if (schemaFiles.length === 0) {
  console.error('gen-public-data FAILED — no schemas to publish beside the data');
  process.exit(1);
}

const { commit, source: commitSource } = resolveBuildCommit({ cwd: ROOT });

/**
 * The contract, stated where a consumer meets it.
 *
 * `asOf` is derived from the corpus rather than stamped from the clock: a build timestamp would
 * change the bytes on every rebuild and tell a reader nothing about whether the DATA moved.
 */
const asOf = [...layers.ledger, ...layers.provenance]
  .map((r) => r.asOf)
  .filter(Boolean)
  .sort()
  .pop();

/**
 * THE CONTRACT IS READ, NOT RETYPED. `lib/data-contract.json` is the one copy; the human page at
 * `/data/` imports the same file. Two statements of a promise is two promises, and the one nobody
 * updates is the one a consumer relies on.
 */
const contract = JSON.parse(readFileSync(join(ROOT, 'lib', 'data-contract.json'), 'utf8'));
delete contract._comment;

const manifest = {
  ...contract,
  commit,
  latestRecordAsOf: asOf ?? null,
  counts: Object.fromEntries(Object.entries(layers).map(([k, v]) => [k, v.length])),
  files: Object.keys(layers).map((k) => `/data/v1/${k}.json`),
  schemas: schemaFiles.map((f) => `/data/v1/schemas/${f}`),
};

// Everything above computed and asserted; only now is anything destroyed or written.
rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'schemas'), { recursive: true });

let bytes = 0;
const write = (rel, text) => {
  const p = join(OUT, rel);
  writeFileSync(p, text);
  bytes += Buffer.byteLength(text);
};

for (const [name, arr] of Object.entries(layers)) write(`${name}.json`, `${JSON.stringify(arr)}\n`);
for (const f of schemaFiles) write(join('schemas', f), readFileSync(join(SCHEMAS, f), 'utf8'));
write('manifest.json', `${JSON.stringify(manifest, null, 2)}\n`);

// M2: verify the write by reading the disk back, not by trusting the counter above.
for (const [name, arr] of Object.entries(layers)) {
  const back = JSON.parse(readFileSync(join(OUT, `${name}.json`), 'utf8'));
  if (!Array.isArray(back) || back.length !== arr.length) {
    console.error(
      `gen-public-data FAILED — ${name}.json read back as ${back?.length} record(s), expected ${arr.length}`,
    );
    process.exit(1);
  }
}

const counts = Object.entries(manifest.counts)
  .map(([k, v]) => `${k} ${v}`)
  .join(' · ');
console.log(
  `public-data OK — /data/v1/ published at contract v1: ${counts} · ${schemaFiles.length} schema(s) · ` +
    `${(bytes / 1024 / 1024).toFixed(2)} MB · commit ${commit.slice(0, 7)} (${commitSource})`,
);
