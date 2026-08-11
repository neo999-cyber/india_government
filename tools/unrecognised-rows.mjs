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
    const spans = listingRows(html).map((r) => r[1]);
    let n = 0;
    for (const m of html.matchAll(ANCHOR)) {
      const r = rec.get(m[2]);
      if (!r?.declares) continue;
      if (spans.some((b) => b.includes(m[0]))) continue;
      if (linkText(m[3]) === r.title) n += 1;
    }
    return n;
  };
  const a = flag(bare);
  const b = flag(inRow);
  const c = flag(byId);
  if (a !== 1 || b !== 0 || c !== 0) {
    console.error(
      'unrecognised-rows --control FAILED — the checker does not discriminate.\n' +
        `  title-link outside every shape: ${a} (expected 1)\n` +
        `  the same link inside a <tr>:    ${b} (expected 0)\n` +
        `  link naming the record by id:   ${c} (expected 0)`,
    );
    process.exit(1);
  }
  console.log(
    'unrecognised-rows --control — a title-link outside every shape is caught, the same link in a ' +
      'row is not, and an id-link is not; the discriminator is TITLE against ID',
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
let titleLinks = 0;
let citations = 0;
let graphical = 0;
for (const file of pages) {
  const route = '/' + file.slice(OUT.length + 1).replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8').replace(/<script[\s\S]*?<\/script>/g, '');
  const spans = listingRows(html).map((r) => r[1]);
  for (const m of html.matchAll(ANCHOR)) {
    const rec = REC.get(m[2]);
    if (!rec?.declares) continue;
    if (route === `/${m[1]}/${m[2]}/`) continue; // its own page
    if (spans.some((b) => b.includes(m[0]))) continue;
    const text = linkText(m[3]);
    if (text === rec.title) {
      titleLinks += 1;
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
 * REPORT-ONLY, WITH A MEASURED RATE AND A NAMED NEXT STEP.
 *
 * It is not a gate yet and the reason is specific rather than caution. Turning it red requires
 * every reported shape to be ADDED to the shape list, and the first two tried — `chart` and
 * `cu-view` — were rejected by `listing-marks` on contact: a pair pools its sides' absences and
 * renders them once at pair width, so taking the side as the unit demands a declaration twice and
 * taking a ledger-hosted side demands one that is pooled nowhere. **Where the unit is depends on
 * where the component renders the declaration, which is a question per component and not a
 * property of markup.**
 *
 * So this reports, and the report is the work item: each route below needs its component read once
 * and its unit named. **That is a deferral with a measured rate and a named next step, which is a
 * different object from a deferral that says logged** — and the rate is printed on every run rather
 * than quoted from this comment, because a stale rate is how the first kind becomes the second.
 */
if (found.length) {
  const byRoute = new Map();
  for (const f of found) byRoute.set(f.route, (byRoute.get(f.route) ?? 0) + 1);
  console.log(
    `unrecognised-rows — ${found.length} record link(s) name a record by its TITLE, on a page that ` +
      `is not its own, outside every listing shape any gate knows. REPORT-ONLY; each needs its ` +
      `component's unit named. ${citations} link(s) name a record by id — citations, correctly not ` +
      `counted — and ${graphical} carry no text at all, being graphical links whose accessible name ` +
      `is an attribute; they display no title, so they list nothing.`,
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
    `listing shape, across ${pages.length} built pages. ${citations} name a record by id and are ` +
    `citations; ${graphical} carry no text and are graphical links. Neither displays a title, which ` +
    `is the discriminator, stated because it is the whole design.`,
);
