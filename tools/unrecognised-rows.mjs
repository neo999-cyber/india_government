#!/usr/bin/env node
/**
 * UNRECOGNISED ROWS — a record link that looks like a listing and sits in no shape any gate knows.
 *
 * ============================ WHY THIS EXISTS, AND IT IS THE SEVENTH TIME =====================
 *
 * `listing-marks` binds rule 4b by recognising row SHAPES. Its shape list has been widened five
 * times, every time after a surface shipped outside it:
 *
 *   · the anchor card, recognised by `grid-title` — the overview's minis carry `mini-t`, so **199
 *     declarations reached no reader on a page that had shipped four commits earlier**;
 *   · the pair row, recognised by `<td>PR-xx</td>` — the reverse index uses `<li>` with a `<span>`;
 *   · the container, recognised by class — the domain rebuild put the anchor around the TITLE and
 *     the marks beside it, and **462 record links with a declared mark sat outside every shape**.
 *
 * Every one was found by hand. **The gate reported clean throughout, because a shape it does not
 * know is not a row it is failing to check — it is a row it cannot see**, and the two are
 * indistinguishable in its output. That is the guard-scope defect in its purest form.
 *
 * So this gate asks the complement: **not "does every row carry its marks" but "is every listing
 * inside a row".** It cannot be widened into blindness the same way, because its subject is
 * precisely the thing outside the list.
 *
 * ============================ THE DISCRIMINATOR, AND IT IS THE WHOLE DESIGN ===================
 *
 * Most record links are not listings. A crumb, a cross-reference, a *see L-0011* inside a caveat —
 * none of them lists the record and none owes its declarations. A check that flagged all of them
 * would report 649 links and be switched off within a week.
 *
 * **A LISTING NAMES THE RECORD BY ITS TITLE. A CITATION NAMES IT BY ITS ID.** That is the
 * discriminator, and it is a property of the rendered page rather than a convention anyone must
 * remember. Measured when it was written: of the links outside every shape whose record declares a
 * mark, **462 used the title and 17 used an id**. Adding the four container shapes those 462 turned
 * out to be took the title count to **62**, which is what this gate now reports and what remains to
 * be triaged. **The rate is printed on every run rather than quoted from this comment** — a measured
 * deferral whose number is quoted from prose becomes a stale one, which this corpus has paid for.
 *
 * ============================ WHAT IT BINDS AND WHAT IT CANNOT ================================
 *
 * IT BINDS: a link whose text equals a record's title, on a page that is not that record's own,
 * outside every shape in `tools/lib/listing-shapes.mjs`, where the record declares a mark.
 *
 * **IT SHARES ITS SHAPE LIST WITH `listing-marks` RATHER THAN RESTATING IT.** Two copies would be
 * the ad-hoc-normaliser class, and the divergence would be silent in the worst direction: this
 * gate calling a shape unrecognised that the other binds, or the reverse, with neither failing.
 *
 * IT CANNOT SEE a listing that names a record in running prose without linking it, and it cannot
 * see one whose link text is neither the title nor the id. Both are stated rather than implied: the
 * first is unreachable by any markup check, and the second would need a similarity test that would
 * fire on paraphrase.
 *
 * Usage:
 *   node tools/unrecognised-rows.mjs             # summary
 *   node tools/unrecognised-rows.mjs --verbose   # every finding
 *   node tools/unrecognised-rows.mjs --control   # prove it fires
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { assertFresh } from './lib/freshness.mjs';
import { listingRows } from './lib/listing-shapes.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const CONTROL = argv.includes('--control');

/** Text of a rendered anchor, normalised the way the page renders entities. */
const linkText = (html) =>
  html
    .replace(/<[^>]*>/g, '')
    .replace(/&#x27;|&#39;|&rsquo;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const ANCHOR = /<a [^>]*href="\/(ledger|series)\/([^"/]+)\/"[^>]*>([\s\S]*?)<\/a>/g;

function records() {
  const out = new Map();
  const add = (r) => {
    if (!r?.id) return;
    out.set(r.id, {
      title: linkText(String(r.title ?? '')),
      declares: Boolean(r.caveat || (r.unmeasured ?? []).length || r.differentFacts),
    });
  };
  for (const f of readdirSync(join(ROOT, 'data/ledger')))
    for (const r of JSON.parse(readFileSync(join(ROOT, 'data/ledger', f), 'utf8'))) add(r);
  for (const f of readdirSync(join(ROOT, 'data/series')))
    for (const r of JSON.parse(readFileSync(join(ROOT, 'data/series', f), 'utf8'))) add(r);
  return out;
}

/**
 * AN ATTRIBUTION IS NOT A LISTING, AND THE TITLE/ID TEST CANNOT TELL THEM APART.
 *
 * `<p class="source-line">Declared on <a href="/ledger/L-0134/">…title…</a>.</p>` names the record
 * that DECLARED an absence being shown. It presents no record as an item: rendering L-0134's own
 * caveat and absences there would attach one record's qualifications to another record's data.
 *
 * **The discriminator this gate was built on — a listing names a record by its TITLE, a citation by
 * its ID — is a proxy, and this is where the proxy breaks.** It breaks in the honest direction: the
 * link uses the title because *"Declared on The power to hold a J&K detenu anywhere in India"* is
 * the sentence a reader needs and *"Declared on L-0134"* is not. Penalising good prose is not a
 * finding about the page.
 *
 * So attribution is recognised STRUCTURALLY, by the `source-line` class that already carries every
 * such sentence in this codebase, and never by guessing from the link text.
 */
const ATTRIBUTION_CLASS = 'source-line';

/**
 * EXEMPTED BY NAME, WITH THE MEASUREMENT THAT JUSTIFIES IT.
 *
 * A pair side genuinely lists a record — title, tier, figure, caveat, absences — so it is not an
 * attribution and calling it one would be a dodge. It is unbindable for a different reason:
 * **the declaration is pooled to the PAGE.** 137 sides are built, 59 belong to a series declaring
 * an absence, and 28 render none because an earlier pair on the same page already rendered it.
 * Which container holds it is an accident of pair order, so no container is the unit.
 *
 * **The pooling was verified correct before this exemption was written: 45 of 45 pooled-away
 * declarations are still present elsewhere on their own page**, so rule 4b holds and what fails is
 * the gate's container model. An exemption with a stated, re-runnable reason is better than a shape
 * that reports clean because nobody looked — and better than a residue nobody can act on.
 */
const POOLED_TO_PAGE = ['cp-side', 'cu-side'];

/**
 * ROW SPANS BY POSITION, replacing a string-containment test — the gate's own recorded weakness,
 * raised 2026-08-12 and fixed 2026-08-13 on the operator's direction.
 *
 * **THE DEFECT.** The test was `spans.some((b) => b.includes(m[0]))` — does any listing row's HTML
 * CONTAIN this anchor's HTML? A page that renders one record link twice, once inside a listing row
 * and once outside it, produces two byte-identical anchors, so the OUTSIDE copy was exempted by the
 * inside one and the gate reported clean on exactly the thing it exists to catch. It was found when
 * next-step anchors turned out byte-identical to pair-side anchors: the pooled count fell 36 -> 0
 * and attributions 724 -> 708 — 52 links silently exempted — and the gate stayed green. The
 * workaround at the time was to rename an anchor class.
 *
 * **THE FIX.** Ask whether THIS OCCURRENCE sits inside a row, by index. `listingRows` is built on
 * string removal and returns `[kind, html]` pairs grouped by kind rather than in document order, so
 * positions are recovered by locating every occurrence of each row's HTML in the page. Two identical
 * rows are both genuinely rows, so covering both is correct; an anchor outside every span is not in
 * a row however many identical copies sit inside one.
 */
function rowSpans(html) {
  const spans = [];
  for (const [, row] of listingRows(html)) {
    if (!row) continue;
    let i = html.indexOf(row);
    while (i !== -1) {
      spans.push([i, i + row.length]);
      i = html.indexOf(row, i + 1);
    }
  }
  return spans;
}

/** Is this anchor occurrence inside a listing row? Positional, never a string test.
 *  Named `anchorInRow` and not `inRow`: the control block below already binds `inRow` to a fixture
 *  string, and the shorter name silently shadowed this function inside it — the control caught it,
 *  which is what a control is for. */
const anchorInRow = (spans, index) => spans.some(([a, b]) => index >= a && index < b);

/** Is this anchor inside an element of the given class? Balanced scan, not a proximity guess. */
function insideClass(html, index, cls) {
  const open = new RegExp(`<(p|div|section|article|li|span)[^>]*class="(?:[^"]*\\s)?${cls}(?:\\s[^"]*)?"`, 'g');
  for (const m of html.matchAll(open)) {
    if (m.index > index) break;
    const tag = m[1];
    const re = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'g');
    re.lastIndex = m.index;
    let depth = 0, t;
    while ((t = re.exec(html))) {
      depth += t[0][1] === '/' ? -1 : 1;
      if (depth === 0) { if (index > m.index && index < t.index) return true; break; }
    }
  }
  return false;
}

/**
 * NEGATIVE CONTROL, through the same shape detection the live pass uses.
 *
 * A title-link outside every shape must be caught; the SAME link inside a `<tr>` must not; and a
 * link naming the record by its id must not, because that is a citation. All three, because a check
 * that flags everything discriminates nothing and this one's entire value is the discriminator.
 */
if (CONTROL) {
  const title = 'A record that declares something';
  const bare = `<main><a href="/ledger/L-9001/">${title}</a></main>`;
  const inRow = `<table><tr><td><a href="/ledger/L-9001/">${title}</a></td></tr></table>`;
  const byId = `<main>see <a href="/ledger/L-9001/">L-9001</a></main>`;
  const rec = new Map([['L-9001', { title, declares: true }]]);
  const flag = (html) => {
    const spans = rowSpans(html);
    let n = 0;
    for (const m of html.matchAll(ANCHOR)) {
      const r = rec.get(m[2]);
      if (!r?.declares) continue;
      if (anchorInRow(spans, m.index)) continue;
      if (linkText(m[3]) !== r.title) continue;
      // The SAME two exemptions the live pass applies, through the same function. A control that
      // reimplements the thing it checks is testing its own copy.
      if (insideClass(html, m.index, ATTRIBUTION_CLASS)) continue;
      if (POOLED_TO_PAGE.some((c) => insideClass(html, m.index, c))) continue;
      n += 1;
    }
    return n;
  };
  // THE TWO EXEMPTIONS ADDED 2026-08-11 GET CONTROLS IN THE SAME COMMIT, because an exemption
  // without one is an unchecked escape hatch — the gate would report clean and the reason would be
  // that nobody looked. Each is tested in BOTH directions, and the prefix cases are tested because
  // a `\b` match on a class name is the defect this instrument has already paid for twice.
  const inSourceLine = `<main><p class="source-line">Declared on <a href="/ledger/L-9001/">${title}</a>.</p></main>`;
  const inPairSide = `<main><div class="cu-side cu-side-usage"><h3><a href="/ledger/L-9001/">${title}</a></h3></div></main>`;
  const prefixOnly = `<main><p class="source-lines"><a href="/ledger/L-9001/">${title}</a></p></main>`;
  const afterSourceLine = `<main><p class="source-line">x</p><a href="/ledger/L-9001/">${title}</a></main>`;
  // THE CASE THE STRING TEST COULD NOT SEE, and the reason the containment test is positional.
  // One byte-identical anchor twice: once inside a listing row, once outside it. Under
  // `spans.some((b) => b.includes(m[0]))` the outside copy was exempted BY the inside one and this
  // returned 0. It must return 1.
  const twiceOneInside =
    `<main><table><tr><td><a href="/ledger/L-9001/">${title}</a></td></tr></table>` +
    `<p><a href="/ledger/L-9001/">${title}</a></p></main>`;
  const cases = [
    ['title-link outside every shape', bare, 1],
    ['the same link inside a <tr>', inRow, 0],
    ['the SAME anchor twice, one inside a row and one outside — the string test scored this 0', twiceOneInside, 1],
    ['a link naming the record by id', byId, 0],
    ['a title-link inside a source-line — an attribution', inSourceLine, 0],
    ['a title-link inside a pair side — pooled to the page', inPairSide, 0],
    ['a title-link inside class="source-lines" — a PREFIX, not the class', prefixOnly, 1],
    ['a title-link AFTER a closed source-line, not inside it', afterSourceLine, 1],
  ];
  const bad = cases.filter(([, html, want]) => flag(html) !== want);
  if (bad.length) {
    console.error('unrecognised-rows --control FAILED — the checker does not discriminate.');
    for (const [what, html, want] of cases)
      console.error(`  ${what}: ${flag(html)} (expected ${want})`);
    process.exit(1);
  }
  console.log(
    'unrecognised-rows --control — a title-link outside every shape is caught; the same anchor twice, one inside a row and one outside, is caught ONCE; the same link in a ' +
      'row, in a source-line attribution, or in a pooled pair side is not; an id-link is not; and a ' +
      'class that merely STARTS with an exempted name does not exempt, nor does one that has closed ' +
      'before the link',
  );
  process.exit(0);
}

if (!existsSync(OUT)) {
  console.error(`unrecognised-rows: no build at ${OUT} — run \`npm run build\` first (exit 2)`);
  process.exit(2);
}
assertFresh('unrecognised-rows', OUT, ['data', 'app', 'components', 'lib'].map((d) => join(ROOT, d)));

const REC = records();
const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === '_next') continue;
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.isFile() && e.name === 'index.html') pages.push(full);
  }
})(OUT);

const found = [];
let citations = 0;
let graphical = 0;
let attributions = 0;
let pooled = 0;
for (const file of pages) {
  const route = '/' + file.slice(OUT.length + 1).replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  const spans = rowSpans(html);
  for (const m of html.matchAll(ANCHOR)) {
    const rec = REC.get(m[2]);
    if (!rec?.declares) continue;
    if (route === `/${m[1]}/${m[2]}/`) continue; // its own page
    if (anchorInRow(spans, m.index)) continue;
    const text = linkText(m[3]);
    if (text === rec.title && insideClass(html, m.index, ATTRIBUTION_CLASS)) {
      attributions += 1;
    } else if (text === rec.title && POOLED_TO_PAGE.some((c) => insideClass(html, m.index, c))) {
      pooled += 1;
    } else if (text === rec.title) {
      found.push({ route, id: m[2] });
    } else if (!text) {
      // AN ANCHOR WITH NO TEXT IS NEITHER, and counting it as a citation was wrong the moment the
      // span strip landed: 269 of its bars are links whose accessible name is an `aria-label` and
      // whose content is a `<span>`. They display no title, so they are not listings; they name no
      // id either. Counted apart, because a number printed on every run gets quoted, and "144
      // citations" would have been read as 144 prose references when 140 of them are bars.
      graphical += 1;
    } else {
      citations += 1;
    }
  }
}

/**
 * REPORT-ONLY, AND THE RESIDUE IS NOW ZERO — WHICH IS A DECISION FOR THE OPERATOR, NOT FOR THIS FILE.
 *
 * WITHDRAWN WORDING, quoted so the change can be checked: this read *"It is not a gate yet and the
 * reason is specific rather than caution. Turning it red requires every reported shape to be ADDED
 * to the shape list… So this reports, and the report is the work item: each route below needs its
 * component read once and its unit named."* **The work item is done.** The 62 resolved into four
 * components, each answered on its own terms rather than by widening a regex:
 *
 *   - **`chart`, the embedded feature — BOUND.** It was never a pooling problem; it failed on the
 *     `\b` class matcher, since fixed. 3 links.
 *   - **`source-line`, an attribution — RECOGNISED, not bound.** *"Declared on <record>"* names the
 *     record that made a declaration and presents no record as an item. 23 links.
 *   - **`cp-side` and `cu-side`, the pair views — EXEMPTED BY NAME.** These genuinely list a
 *     record, and the declaration is pooled to the PAGE: 28 of 59 eligible sides render none
 *     because an earlier pair already did. Verified before exempting — 45 of 45 pooled-away
 *     declarations are still on their own page, so rule 4b holds. 36 links.
 *
 * **IT STAYS REPORT-ONLY. RULED BY THE OPERATOR 2026-08-11, AND THIS IS A DECISION RATHER THAN A
 * DEFERRAL — it should stop appearing in reports as an availability.**
 *
 * WITHDRAWN WORDING, quoted so the change can be checked: this read *"Flipping it to exit 1 is a
 * gate contract change and this batch had no authority for one; the residue being zero is what
 * makes the flip available, not what makes it decided."* **The authority question is settled and
 * the answer is no.**
 *
 * **The reasoning, because a later cycle will re-propose this.** Zero residue means gating changes
 * nothing today — it would pass on every commit until something moved. What it would do is fail the
 * build the first time a component's POOLING SHIFTS, and a pooling shift is a design question about
 * that component, not a defect: the declaration would still be reaching the page, just from a
 * different container. **A red build is the wrong instrument for a question whose answer might be
 * "the new arrangement is correct, register it".** A report-only check sitting at zero has already
 * won; making it fail builds is a cost with no matching gain.
 *
 * Every number above is printed on each run rather than quoted from here, because a stale rate is
 * how a measured deferral becomes the other kind.
 */
if (found.length) {
  const byRoute = new Map();
  for (const f of found) byRoute.set(f.route, (byRoute.get(f.route) ?? 0) + 1);
  console.log(
    `unrecognised-rows — ${found.length} record link(s) name a record by its TITLE, on a page that ` +
      `is not its own, outside every listing shape any gate knows. REPORT-ONLY; each needs its ` +
      `component's unit named. ${citations} name a record by id — citations; ` +
      `${graphical} carry no text at all, being graphical links whose accessible name is an ` +
      `attribute; ${attributions} sit in a source-line and ATTRIBUTE a declaration to the record ` +
      `that made it, which lists nothing; and ${pooled} sit in a pair side whose declaration is ` +
      `pooled to the page, exempted by name with the measurement in this file.`,
  );
  for (const [route, n] of [...byRoute].sort((a, b) => b[1] - a[1]).slice(0, VERBOSE ? 999 : 12))
    console.log(`  ${String(n).padStart(4)}  ${route}`);
  console.log(
    '\n  A listing names a record by its title; a citation names it by its id. Each route above\n' +
      '  needs its component read once and its listing UNIT named — the element that renders the\n' +
      '  declaration exactly once — then added to tools/lib/listing-shapes.mjs, which both gates read.',
  );
  process.exit(0);
}

console.log(
  `unrecognised-rows OK — every record link naming a record by its title sits inside a recognised ` +
    `listing shape or a named exemption, across ${pages.length} built pages. ${citations} name a ` +
    `record by id and are citations; ${graphical} carry no text and are graphical links; ` +
    `${attributions} attribute a declaration to the record that made it; ${pooled} sit in a pair ` +
    `side whose declaration is pooled to the page and are exempted by name.`,
);
