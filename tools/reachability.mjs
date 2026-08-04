#!/usr/bin/env node
/**
 * Rendered-reachability gate: every mark declared in /data must be reachable in built output.
 *
 * Why this cannot be a validator rule. The validator sees /data only, so any check it makes
 * about rendering has to MODEL the render paths — and the failure this rule exists to catch
 * is precisely a divergence between the model and the components. The series page suppresses
 * its own absence block on the assumption that a pair view pools it; phase 6c rewired the pair
 * view and dropped the pooling; four declarations rendered nowhere for three phases. A
 * validator rule encoding "the pair pools them" would have agreed with the assumption and
 * stayed silent. So this reads the actual HTML.
 *
 * The pattern it guards, stated generally: a component suppresses a mark because another
 * component is expected to render it instead. Nothing fails loudly when the other component
 * stops, and the gate cannot see it, because the data was correct throughout.
 *
 * The test is PER-RECORD, not corpus-wide, and that distinction is load-bearing. Corpus-wide
 * reachability is satisfied by /unmeasured, which lists every declaration in the instrument
 * whatever the record pages do — so a corpus-wide count passes even with every record page
 * suppressing its own mark, which is exactly the failure. Verified: with pooling disabled and
 * the site rebuilt, a corpus-wide check reported 185/185 reachable. The mark has to render on
 * the page of the record that declares it.
 *
 * The data count is authoritative. Built output is the thing under test.
 *
 * Usage:
 *   node tools/reachability.mjs                     # data/ against out/
 *   node tools/reachability.mjs --data D --out O    # fixtures
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
const VERBOSE = process.argv.includes('--verbose');
const DATA_DIR = arg('--data', join(ROOT, 'data'));
const OUT_DIR = arg('--out', join(ROOT, 'out'));

// Freshness before anything else: a gate that reads built output must know the output is the
// build of the data it is about to check. Asserted only for the repository's own directories, or
// when a caller asks for it explicitly — a fixture supplies its own hermetic pair. See
// tools/lib/freshness.mjs for why a false PASS is the direction that matters.
if (argv.indexOf('--data') === -1 && argv.indexOf('--out') === -1) {
  assertFresh('reachability', OUT_DIR, ['data', 'app', 'components', 'lib'].map((d) => join(ROOT, d)));
} else if (argv.includes('--check-freshness')) {
  assertFresh('reachability', OUT_DIR, [DATA_DIR]);
}

/**
 * Marks that can be suppressed by a competing view.
 *
 * `notes` and `caveat` are here for the same reason `unmeasured` is: the series detail page
 * suppresses each of them when a pair view takes over, delegating to the pair. That is the
 * identical shape to the failure that produced this rule, and being currently correct is not
 * a reason to leave them unguarded.
 */
const MARKS = [
  { field: 'unmeasured', layers: ['series', 'ledger'], each: (r) => (r.unmeasured ?? []).map((u) => u.what) },
  { field: 'caveat', layers: ['series', 'ledger'], each: (r) => (r.caveat ? [r.caveat] : []) },
  { field: 'notes', layers: ['series'], each: (r) => (r.notes ? [r.notes] : []) },
  { field: 'differentFactsNote', layers: ['ledger'], each: (r) => (r.differentFactsNote ? [r.differentFactsNote] : []) },
];

/** @returns {string[]} every .json under dir */
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

/**
 * Visible text of a built page.
 *
 * Script blocks are stripped FIRST and deliberately: Next embeds the whole rendered payload
 * as escaped JSON in a hydration script, so a mark that renders nowhere on the page is still
 * present in the file. Searching raw HTML would report everything reachable and the rule
 * would never fire.
 */
function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;|&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;|&#x2019;/g, ' ')
    .replace(/&mdash;|&#8212;/g, '—')
    .replace(/&ndash;|&#8211;/g, '–')
    .replace(/\s+/g, ' ');
}

/** Same normalisation on the needle, so escaping differences cannot cause a false failure. */
const norm = (s) =>
  s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

function htmlFiles(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...htmlFiles(full));
    else if (e.isFile() && e.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pages = htmlFiles(OUT_DIR);
if (pages.length === 0) {
  console.error(`reachability: no built HTML under ${OUT_DIR} — run the build first`);
  process.exit(2);
}
const corpus = pages.map((p) => visibleText(readFileSync(p, 'utf8')));

/** The page a record owns, where its own marks must render. */
function ownPage(layer, id) {
  const dir = layer === 'series' ? 'series' : 'ledger';
  const p = join(OUT_DIR, dir, id, 'index.html');
  return existsSync(p) ? visibleText(readFileSync(p, 'utf8')) : null;
}
const ownCache = new Map();
const ownText = (layer, id) => {
  const k = `${layer}/${id}`;
  if (!ownCache.has(k)) ownCache.set(k, ownPage(layer, id));
  return ownCache.get(k);
};

/**
 * A needle long enough to be distinctive but short enough to survive any wrapping the
 * renderer applies. Marks in this instrument never truncate (CLAUDE.md rule 3a), so a prefix
 * is a sound test of presence.
 */
const PROBE = 60;

const missing = [];
let checked = 0;
const byField = {};

for (const mark of MARKS) {
  byField[mark.field] = { declared: 0, reachable: 0 };
  for (const layer of mark.layers) {
    for (const r of loadLayer(layer)) {
      for (const text of mark.each(r)) {
        const needle = norm(text).slice(0, PROBE);
        if (!needle) continue;
        checked += 1;
        byField[mark.field].declared += 1;
        const own = ownText(layer, r.id);
        if (own === null) {
          missing.push({ field: mark.field, layer, id: r.id, text: norm(text).slice(0, 90), why: 'no page built for this record' });
          continue;
        }
        if (own.includes(needle)) byField[mark.field].reachable += 1;
        else {
          const elsewhere = corpus.some((page) => page.includes(needle));
          missing.push({
            field: mark.field, layer, id: r.id, text: norm(text).slice(0, 90),
            why: elsewhere ? 'renders elsewhere but NOT on its own record page' : 'renders nowhere at all',
          });
        }
      }
    }
  }
}

const label = (f) => `${f} ${byField[f].reachable}/${byField[f].declared}`;
const summary = MARKS.map((m) => label(m.field)).join(' · ');

if (missing.length > 0) {
  console.error(`reachability FAILED — ${missing.length} of ${checked} declared marks are unreachable on their own record page`);
  console.error(`  pages scanned: ${pages.length}`);
  for (const m of missing) {
    console.error(`  - [${m.field}] ${m.id} (${m.layer}): ${m.why}`);
    console.error(`      "${m.text}"`);
  }
  console.error(
    '\n  The data count is authoritative. A mark declared and not rendered is invisible to a\n' +
      '  reader while looking correct to the gate. Check whether a component is suppressing it\n' +
      '  on the assumption that another component renders it instead.',
  );
  process.exit(1);
}

console.log(`reachability OK — ${checked}/${checked} declared marks reachable on their own record page (${pages.length} pages scanned)`);
if (VERBOSE) console.log(`  ${summary}`);
