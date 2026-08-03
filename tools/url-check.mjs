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

// A missing layer is an absent layer, not a crash: a fixture root carrying only ledger records is a
// legitimate corpus for this tool, and the first version died on scandir before checking a thing.
const dirFiles = (sub) => {
  const d = join(DATA_DIR, sub);
  return existsSync(d) ? readdirSync(d).filter((f) => f.endsWith('.json')).map((f) => join(d, f)) : [];
};
const LAYER_FILES = {
  series: () => dirFiles('series'),
  ledger: () => dirFiles('ledger'),
  provenance: () => [join(DATA_DIR, 'provenance.json')].filter(existsSync),
  pairs: () => [join(DATA_DIR, 'pairs.json')].filter(existsSync),
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

/**
 * A SEARCH INTERFACE IS NEVER A DOCUMENT, and status alone cannot tell you so — it answers 200.
 *
 * Found by hand, not by this tool, after the first pass of citation fixes: two records cited
 * the archive wildcard form on jkhome.nic.in while naming specific Government Orders. That URL has no
 * path extension, so no content-type was asserted, so a 200 passed. The wildcard `.pdf` variants
 * were caught only because their extension happened to trigger the content-type branch — an
 * accident, not the rule working.
 *
 * These forms are rejected on their shape rather than their response: the archive's wildcard listing,
 * its timestamp-less `/web/` redirect-to-latest, and a bare CDX endpoint carrying no query.
 */
const INTERFACE_NOT_DOCUMENT = [
  { re: /web\.archive\.org\/web\/\*/i, why: "the archive's wildcard LISTING interface — cite the /web/<timestamp>id_/ snapshot" },
  { re: /web\.archive\.org\/cdx\/search\/cdx\/?(\?)?$/i, why: 'a bare CDX endpoint with no query — cite the exact query that was run' },
];
const interfaceFault = (url) => INTERFACE_NOT_DOCUMENT.find((f) => f.re.test(url))?.why ?? null;

// ---------------------------------------------------------------- fetch
/**
 * curl, not fetch, and with the resolver fallback M1 records: this environment's system resolver
 * SERVFAILs on hosts that 1.1.1.1 resolves, and a tool that reported those as dead would
 * manufacture exactly the false finding M1 exists to prevent.
 */
function probe(url) {
  /**
   * NEVER DISCARD STDOUT ON A NON-ZERO EXIT. curl exits 6 when it cannot resolve a host — including
   * a host it only meets while FOLLOWING a redirect — and it still prints everything `-w` asked for
   * before doing so. The first version of this function did `catch { return '' }` and threw that
   * away, which turned "answered 307 and then could not resolve the next hop" into "no response".
   * It reported roughly fifty live government hosts as dead: the exact false finding M1 exists to
   * prevent, produced by the tool written to prevent it.
   */
  const run = (args) => {
    try {
      return { out: execFileSync('curl', args, { encoding: 'utf8', timeout: 50000, stdio: ['ignore', 'pipe', 'ignore'] }).trim(), code: 0 };
    } catch (e) {
      return { out: `${e.stdout ?? ''}`.trim(), code: e.status ?? -1 };
    }
  };
  const parse = ({ out }) => {
    const [status, ctype, redirect] = out.split('|');
    return { status: Number(status) || 0, contentType: (ctype ?? '').split(';')[0].trim(), redirect: (redirect ?? '').trim() };
  };
  const W = '%{http_code}|%{content_type}|%{redirect_url}';

  const direct = parse(run(['-sL', '-o', '/dev/null', '-w', W, '--max-time', '40', '-A', 'Mozilla/5.0', url]));
  // A 3xx as the FINAL code means `-L` could not complete the follow — almost always because the
  // next hop is a host this environment cannot resolve. That is the resolver problem wearing a
  // different status, so it goes to the fallback rather than being reported as the answer.
  if (direct.status !== 0 && !(direct.status >= 300 && direct.status < 400)) return direct;

  /**
   * Resolver fallback — M1, and it must follow redirects ACROSS hosts. `--resolve` pins one
   * host:port:ip, so a 307 from `example.gov.in` to `www.example.gov.in` lands on a name curl still
   * cannot resolve. Each hop's host is resolved through 1.1.1.1 and added to the pin list, up to a
   * small bound. Without this the fallback fires and still reports the host dead.
   */
  const resolveHost = (host) => {
    const { out } = run(['-s', '--max-time', '8', `https://1.1.1.1/dns-query?name=${host}&type=A`, '-H', 'accept: application/dns-json']);
    try { return (JSON.parse(out).Answer ?? []).find((a) => a.type === 1)?.data ?? null; } catch { return null; }
  };

  const pins = [];
  let target = url;
  for (let hop = 0; hop < 5; hop++) {
    let host, port;
    try { const u = new URL(target); host = u.hostname; port = u.protocol === 'http:' ? 80 : 443; } catch { break; }
    if (!pins.some((p) => p.startsWith(`${host}:${port}:`))) {
      const ip = resolveHost(host);
      if (!ip) break;
      pins.push(`${host}:${port}:${ip}`);
    }
    // No -L: take one hop at a time so each new host can be pinned before it is reached.
    const r = parse(run(['-s', '-o', '/dev/null', '-w', W, '--max-time', '40',
      ...pins.flatMap((p) => ['--resolve', p]), '-A', 'Mozilla/5.0', target]));
    if (r.status === 0) break;
    if (r.status >= 300 && r.status < 400 && r.redirect && r.redirect !== target) { target = r.redirect; continue; }
    return { ...r, viaResolver: true };
  }
  return direct;
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

/**
 * THREE OUTCOMES, NOT TWO, AND THE MIDDLE ONE IS THE WHOLE POINT.
 *
 * A 401, 403 or 429 means the host answered and refused an automated client. That is NOT evidence
 * the document is absent, and failing on it would make this tool push authors to delete good
 * citations — the opposite of what it is for, and the surest way to get a gate switched off. The
 * corpus audit of 2026-08-03 found 17 such URLs against 4 genuine 404s, and one of the 17
 * (`eci.gov.in/statistical-reports`) is cited by live phase-12 records: on a fail-everything rule
 * this gate would have blocked that commit over a document that is really there.
 *
 * 5xx is transient by definition and joins them. Everything else — a 404, a malformed 400, no
 * response after the resolver fallback, or a content-type the path contradicts — is a failure.
 */
const UNVERIFIABLE = (s) => s === 401 || s === 403 || s === 429 || (s >= 500 && s < 600);

const failures = [];
const unverifiable = [];
for (const url of targets) {
  const want = expectationFor(url);
  const where = live.get(url).map((w) => `${w.layer}:${w.id}`).join(', ');

  // Shape first, and it does not need the network: a search interface answers 200 and is still not
  // the document the record cites. Checked before fetching so it cannot be masked by a good status.
  const iface = interfaceFault(url);
  if (iface) { failures.push({ url, where, status: -1, contentType: '', want: null, iface }); continue; }

  const r = recorded ? (recorded[url] ?? { status: 0, contentType: '' }) : probe(url);
  const ctypeBad = want && r.status === 200 && !(r.contentType || '').includes(want.split('/')[1] ?? want);
  if (r.status === 200 && !ctypeBad) {
    console.log(`  ok  ${r.status} ${r.contentType || '-'}${r.viaResolver ? ' (via 1.1.1.1)' : ''}  ${url}`);
  } else if (UNVERIFIABLE(r.status)) {
    unverifiable.push({ url, where, ...r });
  } else {
    failures.push({ url, where, ...r, want });
  }
}

if (unverifiable.length > 0) {
  console.log(`\n  ${unverifiable.length} URL(s) UNVERIFIABLE — the host answered and refused an automated client.`);
  console.log('  Not counted as failures: a refusal is not evidence the document is absent.');
  for (const u of unverifiable) console.log(`    ? HTTP ${u.status}  ${u.url}\n        cited by ${u.where}`);
}

if (failures.length > 0) {
  console.error(`\nurl-check FAILED — ${failures.length} of ${targets.length} URL(s) did not confirm`);
  for (const f of failures) {
    const why = f.iface ? `NOT A DOCUMENT — ${f.iface}`
      : f.status !== 200 ? `HTTP ${f.status || 'no response'}`
      : `served ${f.contentType || 'no content-type'} where the path states ${f.want}`;
    console.error(`  - ${f.url}\n      ${why}  ·  cited by ${f.where}`);
  }
  console.error(
    '\n  A URL that cannot be fetched is not a source. This check is mechanical and narrow: it\n' +
    '  proves the document is THERE, never that it says what the record claims. Confirm the\n' +
    '  content by hand, or remove the citation — do not relax this to make a commit pass.');
  process.exit(1);
}

console.log(`\nurl-check OK — ${targets.length - unverifiable.length}/${targets.length} confirmed` +
  (unverifiable.length ? `, ${unverifiable.length} unverifiable (host refused an automated client)` : ''));
