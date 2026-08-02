#!/usr/bin/env node
/**
 * Domain-surface gate: every domain value the schemas admit must have a rendered page, and
 * every record must reach the domain surface it declares.
 *
 * WHY THIS EXISTS, stated as the finding rather than the bug. `education` had no domain page
 * for a month behind a green gate. It was added to the schemas in phase 10 and never to
 * `lib/types.ts`, so `generateStaticParams` never emitted it: 48 series and 20 ledger records
 * — the whole phase-10 corpus — had no domain surface. Nothing failed. `validate` passed,
 * `typecheck` passed, `reachability` reported 492/492 every single run.
 *
 * All three were RIGHT. Reachability asks whether a declared mark renders on the page of the
 * record that declares it, and it did, on all 492. The question it does not ask is whether the
 * record is reachable from anywhere a reader would start. **A check can be sound, complete and
 * green while the question it asks is not the one that would have caught the defect** — and the
 * green number is actively reassuring while the dimension goes unexamined.
 *
 * This is the same class as the phase-6c view-suppression regression, one level up. There, a
 * component suppressed a mark because another component was expected to render it. Here, an
 * entire axis of navigation was absent and no check enumerated the axis.
 *
 * REGENERATING SPECS FROM /data DOES NOT ADDRESS THIS. That discipline — which this gate also
 * follows — guards against a stale needle: a check that looks for what the data used to say.
 * Every needle here is derived from /data and the schemas at run time, and it would have been
 * just as green, because the needle was never stale. The gap was a dimension nobody checked,
 * and freshness is orthogonal to coverage.
 *
 * THE EXPECTED SET IS DERIVED FROM THE SCHEMAS, NEVER FROM lib/types.ts. `types.ts` is the thing
 * that drifted; asking it what domains exist would be asking the defect to report itself, and
 * the gate would have been green through the whole month. The schemas are the contract
 * (CLAUDE.md, Roles) and the union across all four is taken, so a value present in one schema
 * and missing from another is also caught.
 *
 * Reads built output, per Rule 1 — page emission is decided by `generateStaticParams`, and a
 * validator rule about it would have to model the render path it is meant to police. It runs
 * after `next build` for the same reason `reachability` does: `validate` runs before `out/`
 * exists and cannot see any of this.
 *
 * Usage:
 *   node tools/domain-coverage.mjs                     # data/ + schemas/ against out/
 *   node tools/domain-coverage.mjs --data D --out O    # fixtures
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i === -1 ? fallback : argv[i + 1];
};
const DATA_DIR = arg('--data', join(ROOT, 'data'));
const OUT_DIR = arg('--out', join(ROOT, 'out'));
const SCHEMAS_DIR = join(ROOT, 'schemas');

const readSchema = (name) => JSON.parse(readFileSync(join(SCHEMAS_DIR, `${name}.schema.json`), 'utf8'));

/**
 * Where each schema states its domain values. Four declarations of one enum, and the union is
 * taken rather than any single one, so divergence between them is itself caught.
 *
 * `all` is provenance-only and is not a domain: it means the record bears on every domain, so
 * it is stripped from the expected page set and handled as a fan-out in the reach check below.
 */
const DOMAIN_PATHS = [
  ['series', (s) => s.properties.domain.enum],
  ['ledger', (s) => s.properties.domains.items.enum],
  ['pairs', (s) => s.properties.domain.enum],
  ['provenance', (s) => s.properties.affectsDomains.items.enum],
];
const ALL = 'all';
const declaredDomains = new Map();
for (const [name, pick] of DOMAIN_PATHS) declaredDomains.set(name, pick(readSchema(name)));
const DOMAINS = [...new Set([...declaredDomains.values()].flat())].filter((d) => d !== ALL).sort();

/** The lens values, from their own enum — a subset of DOMAINS today, asserted rather than assumed. */
const LENSES = readSchema('series').properties.lenses.items.enum;

// ---------------------------------------------------------------- data

function jsonFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...jsonFiles(full));
    else if (e.isFile() && e.name.endsWith('.json')) out.push(full);
  }
  return out;
}

function loadLayer(layer) {
  const roots = [join(DATA_DIR, layer), join(DATA_DIR, `${layer}.json`)];
  const files = roots.flatMap((p) =>
    existsSync(p) ? (statSync(p).isDirectory() ? jsonFiles(p) : [p]) : [],
  );
  const records = [];
  for (const f of files) {
    const parsed = JSON.parse(readFileSync(f, 'utf8'));
    const list = Array.isArray(parsed) ? parsed : (parsed.records ?? parsed.series ?? []);
    for (const r of list) records.push(r);
  }
  return records;
}

// ---------------------------------------------------------------- output

/**
 * Script blocks are stripped BEFORE anything else is read off a page, and that is not a detail.
 * Next embeds the entire rendered payload as escaped JSON in a hydration script, so every href
 * and every string is present in the file whether or not it renders. A gate that searched raw
 * HTML would report total coverage on a site with no domain pages at all.
 */
const strip = (html) =>
  html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');

const text = (html) => strip(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

/** Hrefs that a reader can actually click — from stripped HTML, for the reason above. */
function hrefs(html) {
  const out = new Set();
  for (const m of strip(html).matchAll(/href="([^"]+)"/g)) out.add(m[1]);
  return out;
}

const pagePath = (d) => join(OUT_DIR, 'domains', d, 'index.html');
const readPage = (d) => (existsSync(pagePath(d)) ? readFileSync(pagePath(d), 'utf8') : null);

const indexPath = join(OUT_DIR, 'domains', 'index.html');
if (!existsSync(indexPath)) {
  console.error(`domain-coverage: no domain index at ${indexPath} — run the build first`);
  process.exit(2);
}
const indexHrefs = hrefs(readFileSync(indexPath, 'utf8'));

// ---------------------------------------------------------------- assertions

const failures = [];
const counts = { pages: { want: 0, got: 0 }, indexed: { want: 0, got: 0 }, records: { want: 0, got: 0 } };

/** A. Every schema domain value emits a page, and the index links to it. */
const surfaces = new Map();
for (const d of DOMAINS) {
  counts.pages.want += 1;
  counts.indexed.want += 1;
  const html = readPage(d);
  if (html === null) {
    const where = declaredDomains.entries();
    const inSchemas = [...where].filter(([, vals]) => vals.includes(d)).map(([n]) => n);
    failures.push({
      kind: 'page',
      what: d,
      why:
        `the schemas admit "${d}" (declared in ${inSchemas.join(', ')}) and no page was built for it. ` +
        `Any record filing this domain is unreachable from /domains/ — check that the value is in ` +
        `DOMAINS in lib/types.ts, which generateStaticParams reads`,
    });
    continue;
  }
  counts.pages.got += 1;
  surfaces.set(d, { text: text(html), hrefs: hrefs(html) });
  if (indexHrefs.has(`/domains/${d}/`)) counts.indexed.got += 1;
  else failures.push({ kind: 'index', what: d, why: `a page exists at /domains/${d}/ but the domain index does not link to it, so nothing navigates there` });
}

/** Every lens value must also be a surface — asserted, not inferred from the subset relation. */
for (const l of LENSES) {
  if (!DOMAINS.includes(l)) {
    failures.push({ kind: 'lens', what: l, why: `"${l}" is a lens value with no matching domain value, so records carrying it in lenses[] have no surface to reach` });
  }
}

/**
 * B. Every record reaches the surface of every domain it declares.
 *
 * The page existing is not the same claim as the record being on it — the phase-6c shape says
 * a surface can render and still omit what it was supposed to carry. Both are asserted.
 */
const reach = (domain, probe, subject) => {
  counts.records.want += 1;
  const s = surfaces.get(domain);
  if (!s) return; // the missing-page failure above already names it; do not report it twice
  const hit = probe.href ? s.hrefs.has(probe.href) : s.text.includes(probe.text);
  if (hit) counts.records.got += 1;
  else failures.push({ kind: 'record', what: subject, why: `declares domain "${domain}" but does not appear on /domains/${domain}/` });
};

for (const s of loadLayer('series')) {
  if (s.domain) reach(s.domain, { href: `/series/${s.id}/` }, `series ${s.id}`);
  for (const l of s.lenses ?? []) reach(l, { href: `/series/${s.id}/` }, `series ${s.id} (lens)`);
}
for (const l of loadLayer('ledger')) {
  for (const d of l.domains ?? []) reach(d, { href: `/ledger/${l.id}/` }, `ledger ${l.id}`);
}
for (const p of loadLayer('pairs')) {
  if (p.domain) reach(p.domain, { text: p.id }, `pair ${p.id}`);
  for (const l of p.lenses ?? []) reach(l, { text: p.id }, `pair ${p.id} (lens)`);
}
for (const p of loadLayer('provenance')) {
  // `all` fans out: the record bears on every domain, so it must appear on every surface.
  const targets = (p.affectsDomains ?? []).includes(ALL) ? DOMAINS : (p.affectsDomains ?? []);
  for (const d of targets) reach(d, { href: `/provenance/${p.id}/` }, `provenance ${p.id}`);
}

// ---------------------------------------------------------------- report

if (failures.length > 0) {
  console.error(`domain-coverage FAILED — ${failures.length} coverage failure(s)`);
  for (const f of failures) console.error(`  - [${f.kind}] ${f.what}: ${f.why}`);
  console.error(
    '\n  The schemas are the expected set, never lib/types.ts — types.ts is the layer that drifts,\n' +
      '  and asking it what domains exist is asking the defect to report itself.',
  );
  process.exit(1);
}

console.log(
  `domain-coverage OK — ${counts.pages.got}/${counts.pages.want} domain surfaces built, ` +
    `${counts.indexed.got}/${counts.indexed.want} linked from the index, ` +
    `${counts.records.got}/${counts.records.want} record-to-surface references reachable`,
);
console.log(`  domains ${DOMAINS.length} (union of 4 schemas) · lenses ${LENSES.join(', ')}`);
