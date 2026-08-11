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
 * IT BINDS four listing shapes in built HTML: a `<tbody>` holding exactly one record, a `<tr>`, a
 * grid card (`<a>` carrying a `grid-title`), and an `<li>` — each linking a record to its own page.
 * The `<tbody>` unit arrived 2026-08-10 when the caveat moved out of the table cell into a
 * full-width row of its own; see `listingRows` for why the one-record test is load-bearing. For every such row whose
 * record declares an absence or carries a caveat, the mark must be inside that same row.
 *
 * AND, SINCE 2026-08-10, THE CARDINALITY OF THE RENDERED ABSENCE BLOCK: no page shows the same
 * declaration twice. This is the assertion the duplicate-absence regression proved addable —
 * `field-render-audit` was auditing the exact field on the exact page that duplicated and
 * reported 52/52, because its predicate is presence and a page showing a block twice still
 * CONTAINS it. A field-level exactly-once rule is NOT addable (759 of 5,683 prose values repeat
 * legitimately — titles in <title> and <h1>, objectives in the limb list and the note); the
 * RENDERED BLOCK — "No public measurement exists for {what}. {why}" — repeats nowhere
 * legitimately, measured at 0 of 374 on own pages and 0 of 444 across every page. Bind the
 * mark, not the field.
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
import { norm, pageTextFromHtml } from './lib/page-text.mjs';

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

/** Every rendered absence block, as the one normalised needle its rendering produces. */
const BLOCKS = [];
for (const layer of ['series', 'ledger']) {
  for (const r of loadLayer(layer)) {
    for (const u of r.unmeasured ?? []) {
      BLOCKS.push({ id: r.id, needle: norm(`No public measurement exists for ${u.what}. ${u.why}`) });
    }
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

  /**
   * A `<tbody>` HOLDING EXACTLY ONE RECORD IS THE LISTING UNIT, AND IT IS TAKEN BEFORE `<tr>`.
   *
   * WHY THE UNIT HAD TO WIDEN. Rule 3a says that where a caveat will not fit a layout, the LAYOUT
   * changes — and on 2026-08-10 it did: a caveat crammed into a 140px cell (rows to 1,080px
   * against a 122px median) moved into a full-width row of its own directly beneath its record.
   * The two rows are one listing, grouped in a `<tbody>`, so a check whose unit was the `<tr>`
   * reported 334 marks missing from listings that render them perfectly.
   *
   * **THE WIDENING IS FAITHFUL, NOT A LOOSENING, AND THE ONE-RECORD TEST IS WHAT MAKES IT SO.** A
   * `<tbody>` wrapping a whole table would let ANY row's mark satisfy EVERY record in it — the
   * gate would pass on a table where one caveat covered for two hundred missing ones. So a
   * `<tbody>` is only a unit when it links exactly one record; otherwise its `<tr>`s are taken
   * individually, exactly as before.
   */
  const REC = /href="\/(?:ledger|series)\/[^"/]+\//g;
  const bodies = [...clean.matchAll(/<tbody[\s>][\s\S]*?<\/tbody>/g)].map((m) => m[0]);
  const units = bodies.filter((b) => {
    const ids = new Set([...b.matchAll(/href="\/(?:ledger|series)\/([^"/]+)\//g)].map((m) => m[1]));
    return ids.size === 1;
  });

  let scoped = clean;
  for (const u of units) scoped = scoped.replace(u, '');

  const trs = [...scoped.matchAll(/<tr[\s>][\s\S]*?<\/tr>/g)].map((m) => m[0]);
  let rest = scoped;
  for (const t of trs) rest = rest.replace(t, '');
  /**
   * CARD CLASSES ARE ENUMERATED BY NAME, AND THE LIST IS THE GATE'S SCOPE.
   *
   * A card is distinguished from an incidental link to a record by the class its title carries.
   * That filter read `grid-title` alone until 2026-08-11, and **the overview board's 250 mini cards
   * carry `mini-t`** — so a surface listing 250 series, 141 of them with a caveat and 58 declaring
   * an absence, was outside this gate BY CONSTRUCTION from the day it was built. 199 declarations
   * reached no reader and the gate reported clean throughout, because it was never looking.
   *
   * **A NEW LISTING SHAPE BUILT PAST AN EXISTING GUARD** — the same class as the three A-4 finds,
   * running the other way. The list is named here rather than inferred so a third shape has to be
   * added deliberately; widening it to "any anchor to a record" would sweep in every cross-link in
   * the corpus and make the gate useless.
   */
  const CARD_TITLE_CLASSES = ['grid-title', 'mini-t'];
  const cards = [...rest.matchAll(/<a [^>]*href="\/(?:ledger|series)\/[^"]*"[\s\S]*?<\/a>/g)]
    .map((m) => m[0])
    .filter((b) => CARD_TITLE_CLASSES.some((c) => b.includes(c)));
  const lis = [...rest.matchAll(/<li[\s>][\s\S]*?<\/li>/g)].map((m) => m[0]);
  return [
    ...units.map((b) => ['tbody', b]),
    ...trs.map((b) => ['tr', b]),
    ...cards.map((b) => ['card', b]),
    ...lis.map((b) => ['li', b]),
  ];
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

  /**
   * THE ONE-RECORD TEST, PROVEN. This is the property that makes the `<tbody>` widening a faithful
   * change rather than a hole: a tbody wrapping TWO records must NOT become a single unit, or one
   * record's marks would satisfy the other's. Asserted here rather than trusted.
   */
  const second = [...NEEDS.keys()].find((k) => k !== id);
  const oneRec = `<tbody><tr><td><a href="/${layer}/${id}/">a</a></td></tr><tr><td>c</td></tr></tbody>`;
  const twoRec = `<tbody><tr><td><a href="/${layer}/${id}/">a</a></td></tr><tr><td><a href="/${NEEDS.get(second).layer}/${second}/">b</a></td></tr></tbody>`;
  const kindsOf = (h) => listingRows(h).map(([k]) => k);
  const oneIsTbody = kindsOf(oneRec).includes('tbody');
  const twoIsNotTbody = !kindsOf(twoRec).includes('tbody') && kindsOf(twoRec).filter((k) => k === 'tr').length === 2;
  if (!oneIsTbody || !twoIsNotTbody) {
    console.error(
      'listing-marks --control FAILED — the tbody unit does not apply the one-record test.\n' +
        `  single-record tbody treated as a unit: ${oneIsTbody} (expected true)\n` +
        `  two-record tbody falls back to rows:   ${twoIsNotTbody} (expected true)`,
    );
    process.exit(1);
  }
  if (missBare.length !== 2 || missFull.length !== 0 || !pairRowSeen) {
    console.error(
      'listing-marks --control FAILED — the checker does not fire when it should.\n' +
        `  stripped row missing: [${missBare}] (expected caveat and absence)\n` +
        `  marked row missing:   [${missFull}] (expected none)\n` +
        `  pair row recognised:  ${pairRowSeen} (expected true)`,
    );
    process.exit(1);
  }
  // Cardinality branch, proven through the same needle construction the live pass uses: a
  // synthetic page carrying a real record's block twice must be caught, once must pass.
  const blk = BLOCKS[0];
  if (!blk) {
    console.error('listing-marks --control: no declared absence in the corpus to form the control from (exit 2)');
    process.exit(2);
  }
  const once = `<p>x</p><p>${blk.needle}</p>`;
  const twice = `<p>${blk.needle}</p><p>y</p><p>${blk.needle}</p>`;
  const countIn = (html) => {
    const text = norm(html.replace(/<[^>]+>/g, ' '));
    const first = text.indexOf(blk.needle);
    return first === -1 ? 0 : text.indexOf(blk.needle, first + 1) === -1 ? 1 : 2;
  };
  if (countIn(once) !== 1 || countIn(twice) !== 2) {
    console.error(
      `listing-marks --control FAILED — the cardinality pass cannot count.\n` +
        `  block once counted ${countIn(once)} (expected 1); twice counted ${countIn(twice)} (expected 2)`,
    );
    process.exit(1);
  }
  console.log(
    `listing-marks --control — a stripped row naming ${id} is caught on both marks, the same row ` +
      `carrying them passes, a PR- row is recognised as a pair listing and skipped, a single-record ` +
      `tbody is one unit while a two-record tbody falls back to rows, and a page carrying ` +
      `${blk.id}'s declaration twice is distinguished from one carrying it once`,
  );
  process.exit(0);
}

/**
 * Cardinality: each rendered declaration at most once per page. Exempt routes are NOT exempt
 * here — /unmeasured lists every declaration and must still not show one twice.
 */
function scanCardinality() {
  const dup = [];
  for (const file of pages) {
    const route = '/' + file.slice(OUT.length + 1).replace(/index\.html$/, '');
    const text = pageTextFromHtml(readFileSync(file, 'utf8'));
    for (const b of BLOCKS) {
      const first = text.indexOf(b.needle);
      if (first === -1) continue;
      if (text.indexOf(b.needle, first + 1) !== -1) dup.push({ route, id: b.id });
    }
  }
  return dup;
}

const { bad, rowsChecked, marksChecked, marksFound, bySurface } = scan();
const dup = scanCardinality();

if (dup.length) {
  console.error(`listing-marks FAILED — ${dup.length} rendered declaration(s) shown twice on one page:`);
  for (const d of dup.slice(0, 12)) console.error(`  ${d.route}  ${d.id}`);
  console.error(
    '\n  A reader met the same absence twice on one page. The page stops being a faithful count\n' +
      '  of what is declared — the fault the duplicate-absence regression of 2026-08-08 shipped\n' +
      '  for an hour with every gate green.',
  );
  process.exit(1);
}

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
    `${BLOCKS.length} rendered declarations each at most once per page, ` +
    `1 route and 2 row shapes exempted by name`,
);
