#!/usr/bin/env node
/**
 * url-check — every URL added or amended in a cycle is fetched and confirmed before it lands.
 *
 * WHY THIS EXISTS. Cycle 2026-08-03f applied eight amendments to live records and, in doing so,
 * wrote TWO URLs that were guesses. One was a plausible Amnesty document path that returned 403;
 * the other was a plausible Lok Sabha Secretariat path for a report that had actually been
 * retrieved from an Internet Archive capture. Both were valid JSON, both passed every schema, both
 * satisfied `format: "uri"`, and every reference in the corpus still resolved. Nothing in the tree
 * could see them. They were caught by fetching them by hand, and only because someone thought to.
 *
 * A fabricated citation is the one defect with no downstream check, and the SKILL names it a HARD
 * STOP for exactly that reason. This tool does not restore judgement — it closes the narrow,
 * mechanical part of the gap: a URL that cannot be fetched is not a source.
 *
 * WHAT IT DELIBERATELY DOES NOT DO. It does not read prose, does not extract citations from text,
 * does not check that the document at the URL says what the record claims it says, and does not
 * grade tier. Those are judgements. It checks URLs, and only URLs.
 *
 *   node tools/url-check.mjs                      # URLs added or changed against origin/main
 *   node tools/url-check.mjs --base HEAD~1
 *   node tools/url-check.mjs --all                # every URL in the corpus
 *   node tools/url-check.mjs --responses <json>   # fixture mode, no network
 *
 * FIXTURE MODE. `--responses` supplies a recorded url -> {status, contentType} map, so both
 * fixtures are deterministic and neither needs the network. The fires-correctly fixture is not
 * hand-written: it carries the two URLs actually guessed in 2026-08-03f together with the
 * responses actually observed from them (Rule 2 — a real regression, not a model of one).
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};
const has = (flag) => process.argv.includes(flag);

const DATA_DIR = arg('--data', join(ROOT, 'data'));
const SCHEMAS_DIR = join(ROOT, 'schemas');
const BASE = arg('--base', 'origin/main');
const RESPONSES = arg('--responses', null);
const CHECK_ALL = has('--all');

// ---------------------------------------------------------------- schema-derived URL paths
/**
 * The URL-bearing fields are DERIVED from `format: "uri"` in the schemas, never listed here.
 * A listed field cannot know about a field nobody remembered to add — which is the same reason
 * `deriveRefForms` reads the id contracts rather than enumerating reference fields.
 *
 * Returns paths as arrays of segments, where `[]` means "every element of this array".
 */
function uriPaths(node, path = []) {
  const out = [];
  if (!node || typeof node !== 'object') return out;
  if (node.format === 'uri' && (node.type === 'string' || !node.type)) out.push(path);
  for (const [k, v] of Object.entries(node)) {
    if (k === 'properties' || k === '$defs') {
      for (const [name, sub] of Object.entries(v ?? {})) out.push(...uriPaths(sub, [...path, name]));
    } else if (k === 'items') {
      out.push(...uriPaths(v, [...path, '[]']));
    } else if (k === 'allOf' || k === 'anyOf' || k === 'oneOf') {
      for (const sub of v ?? []) out.push(...uriPaths(sub, path));
    }
  }
  return out;
}

const LAYER_FILES = {
  series: () => readdirSync(join(DATA_DIR, 'series')).filter((f) => f.endsWith('.json')).map((f) => join(DATA_DIR, 'series', f)),
  ledger: () => readdirSync(join(DATA_DIR, 'ledger')).filter((f) => f.endsWith('.json')).map((f) => join(DATA_DIR, 'ledger', f)),
  provenance: () => [join(DATA_DIR, 'provenance.json')],
  pairs: () => [join(DATA_DIR, 'pairs.json')],
};

const SCHEMA_PATHS = {};
for (const layer of Object.keys(LAYER_FILES)) {
  const p = join(SCHEMAS_DIR, `${layer}.schema.json`);
  if (existsSync(p)) SCHEMA_PATHS[layer] = uriPaths(JSON.parse(readFileSync(p, 'utf8')));
}

/** Walk a record along a derived path, collecting every string it reaches. */
function collect(node, path) {
  if (node == null) return [];
  if (path.length === 0) return typeof node === 'string' ? [node] : [];
  const [head, ...rest] = path;
  if (head === '[]') return Array.isArray(node) ? node.flatMap((n) => collect(n, rest)) : [];
  return collect(node[head], rest);
}

/** url -> [{layer, file, id}] across a whole corpus given as {file: records[]}. */
function urlsIn(corpus) {
  const found = new Map();
  for (const [file, recs] of Object.entries(corpus)) {
    const layer = Object.keys(LAYER_FILES).find((l) =>
      file.includes(`/${l}/`) || file.endsWith(`${l}.json`));
    if (!layer || !SCHEMA_PATHS[layer]) continue;
    for (const rec of recs ?? []) {
      for (const path of SCHEMA_PATHS[layer]) {
        for (const url of collect(rec, path)) {
          if (!found.has(url)) found.set(url, []);
          found.get(url).push({ layer, file, id: rec.id ?? '(no id)' });
        }
      }
    }
  }
  return found;
}

function readCorpus() {
  const corpus = {};
  for (const files of Object.values(LAYER_FILES)) {
    for (const f of files()) {
      if (existsSync(f)) corpus[f] = JSON.parse(readFileSync(f, 'utf8'));
    }
  }
  return corpus;
}

/** The same corpus as it stood at a git ref. A file absent at that ref is simply new. */
function readCorpusAt(ref) {
  const corpus = {};
  for (const files of Object.values(LAYER_FILES)) {
    for (const f of files()) {
      const rel = f.startsWith(ROOT) ? f.slice(ROOT.length + 1) : f;
      try {
        corpus[f] = JSON.parse(execFileSync('git', ['show', `${ref}:${rel}`], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }));
      } catch {
        corpus[f] = [];
      }
    }
  }
  return corpus;
}

// ---------------------------------------------------------------- expectation
/**
 * Content-type expectation comes from the URL's own extension, and exists for one failure mode:
 * a soft-404 that answers a `.pdf` path with 200 and an HTML error page. Status alone passes that.
 * Where the URL states no extension, no content-type is asserted — guessing one would invent a
 * contract the source never offered.
 */
const EXPECTED = { '.pdf': 'application/pdf', '.csv': 'text/csv', '.json': 'application/json', '.xlsx': 'spreadsheet', '.xls': 'spreadsheet' };
const expectationFor = (url) => {
  try { return EXPECTED[extname(new URL(url).pathname).toLowerCase()] ?? null; } catch { return null; }
};

// ---------------------------------------------------------------- fetch
/**
 * curl, not fetch, and with the resolver fallback M1 records: this environment's system resolver
 * SERVFAILs on hosts that 1.1.1.1 resolves, and a tool that reported those as dead would
 * manufacture exactly the false finding M1 exists to prevent.
 */
function probe(url) {
  const run = (args) => {
    try {
      return execFileSync('curl', args, { encoding: 'utf8', timeout: 45000, stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    } catch { return ''; }
  };
  const parse = (out) => {
    const [status, ctype] = out.split('|');
    return { status: Number(status) || 0, contentType: (ctype ?? '').split(';')[0].trim() };
  };
  const base = ['-sL', '-o', '/dev/null', '-w', '%{http_code}|%{content_type}', '--max-time', '40', '-A', 'Mozilla/5.0', url];
  let r = parse(run(base));
  if (r.status !== 0) return r;

  // Resolver fallback — M1. Only on a total failure, never to paper over a real non-200.
  let host;
  try { host = new URL(url).hostname; } catch { return r; }
  const dig = run(['-s', '--max-time', '8', `https://1.1.1.1/dns-query?name=${host}&type=A`, '-H', 'accept: application/dns-json']);
  let ip = null;
  try { ip = (JSON.parse(dig).Answer ?? []).find((a) => a.type === 1)?.data ?? null; } catch { /* no answer */ }
  if (!ip) return r;
  const port = url.startsWith('http://') ? 80 : 443;
  return { ...parse(run(['-sL', '-o', '/dev/null', '-w', '%{http_code}|%{content_type}', '--max-time', '40', '--resolve', `${host}:${port}:${ip}`, '-A', 'Mozilla/5.0', url])), viaResolver: true };
}

// ---------------------------------------------------------------- run
const corpus = readCorpus();
const live = urlsIn(corpus);

let targets;
if (CHECK_ALL) {
  targets = [...live.keys()];
} else {
  const before = urlsIn(readCorpusAt(BASE));
  targets = [...live.keys()].filter((u) => !before.has(u));
}

const recorded = RESPONSES ? JSON.parse(readFileSync(RESPONSES, 'utf8')) : null;

console.log(`url-check · ${live.size} URL(s) in corpus · ${targets.length} to check` +
  (CHECK_ALL ? ' (--all)' : ` (added or amended against ${BASE})`) +
  (recorded ? ' · FIXTURE MODE, no network' : ''));
console.log(`  URL fields derived from the schemas: ${Object.entries(SCHEMA_PATHS).map(([l, ps]) => `${l} ${ps.map((p) => p.join('.')).join(', ') || '(none)'}`).join(' · ')}`);

const failures = [];
for (const url of targets) {
  const want = expectationFor(url);
  const r = recorded ? (recorded[url] ?? { status: 0, contentType: '' }) : probe(url);
  const where = live.get(url).map((w) => `${w.layer}:${w.id}`).join(', ');
  const ctypeBad = want && r.status === 200 && !(r.contentType || '').includes(want.split('/')[1] ?? want);
  if (r.status !== 200 || ctypeBad) {
    failures.push({ url, where, ...r, want });
  } else {
    console.log(`  ok  ${r.status} ${r.contentType || '-'}${r.viaResolver ? ' (via 1.1.1.1)' : ''}  ${url}`);
  }
}

if (failures.length > 0) {
  console.error(`\nurl-check FAILED — ${failures.length} of ${targets.length} URL(s) did not confirm`);
  for (const f of failures) {
    const why = f.status !== 200
      ? `HTTP ${f.status || 'no response'}`
      : `served ${f.contentType || 'no content-type'} where the path states ${f.want}`;
    console.error(`  - ${f.url}\n      ${why}  ·  cited by ${f.where}`);
  }
  console.error(
    '\n  A URL that cannot be fetched is not a source. This check is mechanical and narrow: it\n' +
    '  proves the document is THERE, never that it says what the record claims. Confirm the\n' +
    '  content by hand, or remove the citation — do not relax this to make a commit pass.');
  process.exit(1);
}

console.log(`\nurl-check OK — ${targets.length}/${targets.length} URL(s) confirmed`);
