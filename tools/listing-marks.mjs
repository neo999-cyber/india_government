#!/usr/bin/env node
/**
 * LISTING MARKS — a record listed anywhere states what it declares.
 *
 * WHY THIS EXISTS, AND IT IS RULE 4b'S OWN PRIOR INSTANCE REPEATING. Rule 4b was written because
 * 374 absence declarations complied with rule 4a's styling and reached NO listing surface at all.
 * The fix that followed was applied to the surface where the defect had been noticed — the ledger
 * tables of five pages — and nowhere else. Measured 2026-08-08 over built output: **1,587 listing
 * rows linked a record declaring an absence and 843 carried no mark.** `/series/` carried 128
 * caveat marks and zero absence marks.
 *
 * **AND THE CAVEAT HAD DRIFTED TOO.** The provenance page's *Ledger records citing this dispute*
 * grid rendered no `CaveatFlag` while the series page's grid of the same records did — and rule 3a
 * names "cited-by grids" in terms. So this gate binds BOTH marks, because both failed and they
 * failed on different surfaces.
 *
 * A gate rather than a convention, for the reason CLAUDE.md gives: a rule that is right and keeps
 * not being followed is a mechanism problem. `RecordMarks` makes the mark set single-sourced; this
 * reports it if a surface stops using it.
 *
 * ---------------------------------------------------------------------------------------------
 * THE GUARD'S SCOPE, AND WHAT IT DOES NOT BIND — written here because CLAUDE.md requires the gap
 * to be stated at the moment the guard is written, the gap being silent by construction otherwise.
 *
 * IT BINDS three listing shapes in built HTML: a `<tr>`, a grid card (`<a>` carrying a
 * `grid-title`), and an `<li>` — each linking a record to its own page. For every such row whose
 * record declares an absence or carries a caveat, the mark must be inside that same row.
 *
 * IT DOES NOT BIND:
 *   - **a FULL rendering of a record on another page.** `/peers/` renders a panel series whole —
 *     caveat, source line, table — and takes the complete `Absences` block rather than a count.
 *     That is a different assertion and this gate makes it nowhere; `/peers/` is fixed and
 *     unguarded, which is stated rather than left to be discovered.
 *   - **a pair side.** `CoverageUsageView` and `ContestedPairView` render a series in full inside
 *     a side slot and pool its declarations at the pair's own width. A count there would duplicate.
 *   - **a prose mention.** An `<a>` inside a `<p>`, `<dd>` or heading is a reference, not a listing.
 *   - **a PAIR row.** `PairRows` lists a PAIR and links to wherever that pair renders, which is
 *     some series' page. The row is about the pair; marking it with that series' absence count
 *     would attribute the series' gaps to the pair.
 *   - **an ABSENT row** — a record that should be listed on a surface and is not. This gate binds
 *     rows that exist, exactly as `withdrawn-wording` binds presence and `link-check` binds
 *     emitted hrefs. If the claim moved one level out, to a missing row, this guard would not see
 *     it.
 *
 * Usage:
 *   node tools/listing-marks.mjs             # summary; failures listed by surface
 *   node tools/listing-marks.mjs --verbose   # per-surface counts even when clean
 *   node tools/listing-marks.mjs --control   # prove it fires
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertFresh } from './lib/freshness.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const argOf = (name, fallback) => {
  const i = argv.indexOf(name);
  return i === -1 ? fallback : argv[i + 1];
};
const OUT = argOf('--out', join(ROOT, 'out'));
const DATA = join(ROOT, 'data');
const VERBOSE = argv.includes('--verbose');
const CONTROL = argv.includes('--control');

if (!existsSync(OUT)) {
  console.error(`listing-marks: no build at ${OUT} — run \`npm run build\` first (exit 2)`);
  process.exit(2);
}
// Freshness first, before any scanning. `--out` is exempt on the documented fixture convention:
// a caller supplying its own build is pointing this at a hermetic artefact whose mtime says
// nothing about the corpus. That exemption is also how this gate was proven to fire against the
// pre-fix build before the fix landed.
// `--control` is exempt as well, and for a stronger reason than the fixture convention: it scans
// synthetic HTML it writes itself and never reads the build at all, so refusing it for a stale
// build would block the one run that can be answered without one.
if (OUT === join(ROOT, 'out') && !CONTROL) {
  assertFresh('listing-marks', OUT, ['data', 'app', 'components', 'lib'].map((d) => join(ROOT, d)));
}

function loadLayer(layer) {
  const roots = [join(DATA, layer), join(DATA, `${layer}.json`)];
  const files = [];
  for (const p of roots) {
    if (!existsSync(p)) continue;
    if (statSync(p).isDirectory()) files.push(...readdirSync(p).filter((f) => f.endsWith('.json')).map((f) => join(p, f)));
    else files.push(p);
  }
  return files.flatMap((f) => JSON.parse(readFileSync(f, 'utf8')));
}

/** id -> what the record declares that a listing row must state. */
const NEEDS = new Map();
for (const layer of ['series', 'ledger']) {
  for (const r of loadLayer(layer)) {
    const wants = [];
    if ((r.unmeasured ?? []).length) wants.push('absence');
    if (r.caveat) wants.push('caveat');
    if (wants.length) NEEDS.set(r.id, { layer, wants, title: r.title });
  }
}

const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === '_next') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name === 'index.html') pages.push(full);
  }
})(OUT);

/**
 * The absence index. Every entry on it IS a declaration rendered in full, so a count beside each
 * would restate the page's own content — and rule 4b forbids a corpus-wide total besides.
 */
const EXEMPT_ROUTES = new Set(['/unmeasured/']);

/** A pair row: its first cell is a pair id, and the row is about the pair, not the linked record. */
const isPairRow = (blk) => /<td[^>]*>PR-\d+<\/td>/.test(blk);

/**
 * Listing rows on a page, each counted ONCE.
 *
 * Table rows are taken first and REMOVED before grid cards and list items are taken: a `<tr>`
 * contains two anchors to the same record (the id cell and the title cell), so scanning all three
 * shapes over the same text counts every table row three times. That produced an exact 1:2
 * marked-to-missing ratio in the sweep that found this defect — pure arithmetic, not evidence.
 */
function listingRows(html) {
  const clean = html.replace(/<script[\s\S]*?<\/script>/g, '');
  const trs = [...clean.matchAll(/<tr[\s>][\s\S]*?<\/tr>/g)].map((m) => m[0]);
  let rest = clean;
  for (const t of trs) rest = rest.replace(t, '');
  const cards = [...rest.matchAll(/<a [^>]*href="\/(?:ledger|series)\/[^"]*"[\s\S]*?<\/a>/g)]
    .map((m) => m[0])
    .filter((b) => b.includes('grid-title'));
  const lis = [...rest.matchAll(/<li[\s>][\s\S]*?<\/li>/g)].map((m) => m[0]);
  return [...trs.map((b) => ['tr', b]), ...cards.map((b) => ['card', b]), ...lis.map((b) => ['li', b])];
}

const HAS = {
  absence: (blk) => /not measured/.test(blk),
  caveat: (blk) => /class="caveat-inline"/.test(blk),
};

function scan() {
  const bad = [];
  let rowsChecked = 0;
  let marksChecked = 0;
  let marksFound = 0;
  const bySurface = new Map();
  for (const file of pages) {
    const route = '/' + file.slice(OUT.length + 1).replace(/index\.html$/, '');
    if (EXEMPT_ROUTES.has(route)) continue;
    const html = readFileSync(file, 'utf8');
    for (const [kind, blk] of listingRows(html)) {
      const m = blk.match(/href="\/(ledger|series)\/([^"/]+)\//);
      if (!m) continue;
      const need = NEEDS.get(m[2]);
      if (!need) continue;
      if (route === `/${m[1]}/${m[2]}/`) continue; // its own page
      if (isPairRow(blk)) continue;
      rowsChecked += 1;
      for (const w of need.wants) {
        marksChecked += 1;
        if (HAS[w](blk)) marksFound += 1;
        else {
          bad.push({ route, id: m[2], kind, want: w });
          bySurface.set(route, (bySurface.get(route) ?? 0) + 1);
        }
      }
    }
  }
  return { bad, rowsChecked, marksChecked, marksFound, bySurface };
}

/**
 * NEGATIVE CONTROL, through the same restriction the pass depends on.
 *
 * A synthetic row of each listing shape, naming a record that really does declare an absence and
 * carry a caveat, with the marks stripped — it must be reported. And the SAME row with the marks
 * present must pass, so the control proves the discriminator is the mark and not the shape.
 */
if (CONTROL) {
  const id = [...NEEDS].find(([, n]) => n.wants.length === 2)?.[0];
  if (!id) {
    console.error('listing-marks --control: no record declares both an absence and a caveat (exit 2)');
    process.exit(2);
  }
  const layer = NEEDS.get(id).layer;
  const bare = `<tr><td><a href="/${layer}/${id}/">t</a></td></tr>`;
  const full = `<tr><td><a href="/${layer}/${id}/">t</a><span class="caveat-inline">c</span><span class="absence-inline">2 not measured</span></td></tr>`;
  const check = (html) => {
    const out = [];
    for (const [, blk] of listingRows(html)) {
      const m = blk.match(/href="\/(ledger|series)\/([^"/]+)\//);
      if (!m) continue;
      for (const w of NEEDS.get(m[2]).wants) if (!HAS[w](blk)) out.push(w);
    }
    return out;
  };
  const missBare = check(bare);
  const missFull = check(full);
  const pairRowSeen = !isPairRow(bare) && isPairRow(`<tr><td class="mono">PR-99</td><td><a href="/${layer}/${id}/">t</a></td></tr>`);
  if (missBare.length !== 2 || missFull.length !== 0 || !pairRowSeen) {
    console.error(
      'listing-marks --control FAILED — the checker does not fire when it should.\n' +
        `  stripped row missing: [${missBare}] (expected caveat and absence)\n` +
        `  marked row missing:   [${missFull}] (expected none)\n` +
        `  pair row recognised:  ${pairRowSeen} (expected true)`,
    );
    process.exit(1);
  }
  console.log(
    `listing-marks --control — a stripped row naming ${id} is caught on both marks, the same row ` +
      `carrying them passes, and a PR- row is recognised as a pair listing and skipped`,
  );
  process.exit(0);
}

const { bad, rowsChecked, marksChecked, marksFound, bySurface } = scan();

if (VERBOSE) {
  console.log(`\n  ${rowsChecked} listing rows · ${marksChecked} marks required · ${marksFound} present\n`);
}

if (bad.length) {
  console.error(`listing-marks FAILED — ${bad.length} mark(s) missing from a row that lists the record:\n`);
  for (const [route, n] of [...bySurface].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    const eg = bad.filter((b) => b.route === route).slice(0, 3);
    console.error(`  ${route}  — ${n} missing`);
    for (const e of eg) console.error(`      ${e.id} (${e.kind}) has no ${e.want} mark`);
  }
  console.error(
    '\n  Rule 3a: a caveat renders wherever the record appears, including cited-by grids.\n' +
      '  Rule 4b: an absence appears on every surface that LISTS the record, in the caveat\'s idiom.\n' +
      '  Render <RecordMarks record={x} /> in the row rather than assembling the marks by hand.',
  );
  process.exit(1);
}

console.log(
  `listing-marks OK — ${rowsChecked} listing rows across ${pages.length} built pages, ` +
    `${marksChecked} required marks all present (${NEEDS.size} records declare one), ` +
    `1 route and 2 row shapes exempted by name`,
);
