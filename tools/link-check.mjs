#!/usr/bin/env node
/**
 * INTERNAL-LINK CRAWL — every internal href in built output resolves to a built page.
 *
 * WHY THIS EXISTS, AND IT IS THE CLASS AND NOT THE INSTANCE. Walk 6 found sixteen anchors
 * returning 404 on the live site. `resolvePairSide` resolves an `absenceFrom` host against EITHER
 * layer and used to hand back a bare id carrying no layer, so `CoverageUsageView` guessed
 * `/series/${hostId}/` — and a ledger host has no `/series/` route. 22 pair sides declare a ledger
 * host, 16 rendered the anchor, all 16 were dead, for the whole life of the pairs layer.
 *
 * **NO GATE CRAWLED INTERNAL HREFS AT ALL.** `reachability` proves a declared mark reaches its
 * record's page; `field-render-audit` proves a field's VALUE appears in some page's text;
 * `domain-coverage` proves every record is referenced from a surface. None of them asks whether an
 * anchor a reader can click leads anywhere. A route composed from an id whose layer is guessed
 * satisfies every one of them and 404s.
 *
 * THE GUARD'S SCOPE, STATED BECAUSE CLAUDE.md REQUIRES IT. This binds INTERNAL hrefs emitted into
 * built HTML: it proves the target route was built. It does NOT bind
 *   - external URLs — that is `url-check`, over `/data`, and deliberately not in the build;
 *   - whether the target page says the right thing — that is `field-render-audit`;
 *   - a link a reader should have and does not — an ABSENT anchor is invisible here by
 *     construction, exactly as `withdrawn-wording` binds presence and not position;
 *   - fragments (`#why-this-verdict`), which are not resolved against the target's anchors.
 * If the claim moved one level out — to a link that should exist, or to a fragment — this guard
 * would not see it.
 *
 * METHOD. Walk `out/**\/index.html`, extract every `href="/..."`, map each to the file that
 * would serve it, and assert it exists. Static export, so the mapping is exact: `/a/b/` is served
 * by `out/a/b/index.html`, and there is no rewrite layer to model.
 *
 * Usage:
 *   node tools/link-check.mjs             # summary; failures listed with the pages that emit them
 *   node tools/link-check.mjs --verbose   # per-prefix counts even when clean
 *   node tools/link-check.mjs --control   # negative control: prove the crawl can fail
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertFresh } from './lib/freshness.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const arg = (name, fallback) => {
  const i = argv.indexOf(name);
  return i === -1 ? fallback : argv[i + 1];
};
const OUT = arg('--out', join(ROOT, 'out'));
const VERBOSE = argv.includes('--verbose');
const CONTROL = argv.includes('--control');

if (!existsSync(OUT)) {
  console.error(`link-check: no build at ${OUT} — run \`npm run build\` first (exit 2)`);
  process.exit(2);
}

/**
 * FRESHNESS FIRST, BEFORE THE CRAWL — CLAUDE.md's ordering rule. A check that decides whether this
 * gate can answer at all belongs above the work, not below it, or its refusal arrives after a
 * result has already been computed against the wrong artefact.
 *
 * `--out` is exempt on the documented fixture convention: a caller supplying its own build is
 * pointing this at a hermetic artefact whose mtime is whenever git or a copy wrote it, so
 * comparing it to `data/` would test the checkout rather than the build.
 */
if (OUT === join(ROOT, 'out')) {
  assertFresh('link-check', OUT, [
    join(ROOT, 'data'),
    join(ROOT, 'app'),
    join(ROOT, 'components'),
    join(ROOT, 'lib'),
  ]);
}

/** Every built HTML page, as routes. */
function walkPages(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walkPages(full, out);
    else if (e.isFile() && e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = walkPages(OUT);

/**
 * Does a route resolve to something the static export actually serves?
 *
 * Next's static export writes `/a/b/` as `out/a/b/index.html` and `/a/b` as `out/a/b.html`; both
 * forms are accepted here because both are served, and asserting one house style is a different
 * check from asserting the link works.
 */
function resolves(route) {
  const clean = route.replace(/[?#].*$/, '');
  const rel = clean.replace(/^\/+/, '');
  if (rel === '') return existsSync(join(OUT, 'index.html'));
  const candidates = [
    join(OUT, rel, 'index.html'),
    join(OUT, `${rel.replace(/\/$/, '')}.html`),
    join(OUT, rel), // a static asset served as-is
  ];
  return candidates.some((p) => existsSync(p) && statSync(p).isFile());
}

const HREF = /href="(\/[^"]*)"/g;
/** Emitted by the framework, not by a view, and not a navigable route. */
const SKIP = /^\/(_next\/|favicon\.|robots\.txt|sitemap\.xml)/;

const byTarget = new Map(); // dead route -> Set of pages emitting it
const prefixCounts = new Map();
let hrefTotal = 0;

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const from = '/' + file.slice(OUT.length + 1).replace(/index\.html$/, '');
  for (const m of html.matchAll(HREF)) {
    const target = m[1];
    if (SKIP.test(target)) continue;
    hrefTotal += 1;
    const prefix = '/' + (target.split('/')[1] ?? '');
    prefixCounts.set(prefix, (prefixCounts.get(prefix) ?? 0) + 1);
    if (resolves(target)) continue;
    if (!byTarget.has(target)) byTarget.set(target, new Set());
    byTarget.get(target).add(from);
  }
}

/**
 * NEGATIVE CONTROL, in the crawl's own terms.
 *
 * A crawl reporting clean proves nothing unless it can be shown to fail, and the failure has to
 * pass through the SAME restriction the pass depends on — here, `resolves()`. So the control asks
 * `resolves()` about a route of exactly the shape the live defect had: a ledger id under the series
 * route. It must be unresolvable, and the same id under its own route must resolve, or the crawl is
 * answering a question about its own path arithmetic rather than about the build.
 */
if (CONTROL) {
  const ledgerDir = join(OUT, 'ledger');
  const anyLedger = existsSync(ledgerDir)
    ? readdirSync(ledgerDir, { withFileTypes: true }).find((e) => e.isDirectory() && /^L-\d+$/.test(e.name))
    : null;
  if (!anyLedger) {
    console.error('link-check --control: no built ledger page to form the control from (exit 2)');
    process.exit(2);
  }
  const good = `/ledger/${anyLedger.name}/`;
  const bad = `/series/${anyLedger.name}/`;
  const okGood = resolves(good);
  const okBad = resolves(bad);
  if (!okGood || okBad) {
    console.error(
      `link-check --control FAILED — the crawl cannot tell a live route from a dead one.\n` +
        `  ${good} resolves: ${okGood} (expected true)\n` +
        `  ${bad} resolves: ${okBad} (expected false)`,
    );
    process.exit(1);
  }
  console.log(
    `link-check --control — ${good} resolves and ${bad} does not; ` +
      `the crawl distinguishes the live route from the shape of the sixteen dead ones`,
  );
  process.exit(0);
}

if (VERBOSE) {
  console.log('\n  internal hrefs by route prefix');
  for (const [p, n] of [...prefixCounts].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${p.padEnd(16)} ${String(n).padStart(6)}`);
  }
  console.log('');
}

const dead = [...byTarget.entries()].sort((a, b) => b[1].size - a[1].size);
if (dead.length) {
  console.error(`link-check FAILED — ${dead.length} internal route(s) linked but not built:\n`);
  for (const [target, froms] of dead) {
    const list = [...froms].sort();
    console.error(`  ${target}  — linked from ${list.length} page(s)`);
    for (const f of list.slice(0, 6)) console.error(`      ${f}`);
    if (list.length > 6) console.error(`      … and ${list.length - 6} more`);
  }
  console.error(
    '\n  A route composed from an id whose layer is guessed passes every other gate and 404s.\n' +
      '  Carry the route on the resolved object rather than re-deriving it at the call site.',
  );
  process.exit(1);
}

console.log(
  `link-check — ${hrefTotal} internal hrefs across ${pages.length} built pages, ` +
    `${prefixCounts.size} route prefixes, 0 dead`,
);
