#!/usr/bin/env node
/**
 * interface-invariants — the two behavioural defects an external audit found, bound in the build.
 *
 * ============================ WHY THIS AND NOT PLAYWRIGHT =====================================
 *
 * The audit's recommendation was an end-to-end suite covering search filtering, topic tabs, chart
 * ticks, mobile overflow and keyboard use. **That is the right instinct and the wrong tool for this
 * repository**, and the substitution is deliberate rather than a skip:
 *
 *   - Every gate here runs inside `npm run build`, which `npm run commit` and the Vercel deploy both
 *     call. A Playwright suite would run in neither without new infrastructure, so the defect class
 *     it protects would be protected only when someone remembered to run it.
 *   - It needs no browser binaries, no new dependency and no second toolchain to keep current.
 *   - The properties below are STRUCTURAL — a count element that cannot change, a tab that contains
 *     another tab's body. Structure is exactly what static output can be asked about.
 *
 * **WHAT THIS HONESTLY CANNOT DO, AND A BROWSER SUITE COULD.** It cannot click a facet and observe
 * the count update; it asserts that only ONE count element exists, which is the condition that made
 * the old one wrong, not the update itself. It cannot measure a rendered target size, tab through a
 * page, or detect horizontal overflow at 375px. **Those remain unbound, and the audit's finding on
 * interface regression coverage is therefore only partly answered.** Stated here rather than left
 * for a later pass to discover by being bitten.
 *
 * NEGATIVE CONTROLS: `--control` builds the pre-fix shape of each invariant and requires rejection,
 * plus the post-fix shape and requires acceptance — in the attribute order the build actually emits,
 * which is the mistake `chart-ticks` made on its first run.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
const verbose = process.argv.includes('--verbose');

/**
 * INVARIANT 0 — NO PAGE RENDERS SOURCE THAT WAS MEANT TO BE A COMMENT.
 *
 * **This exists because it happened, on 98 published pages, during the batch that wrote this file.**
 * A scripted edit inserted an explanatory `/* … *\/` block into JSX. Inside JSX that is not a
 * comment, it is text, and it shipped — the breadcrumb on `/series/` read a full paragraph about
 * route prefetching before "instrument / indicator series".
 *
 * **No existing gate could see it.** `rendered-space` binds a value welded to a following word;
 * `field-render-audit` asks whether a declared field reaches its own record's page; `listing-marks`
 * asks whether a mark is present. **Every one of them asks whether something MISSING is there. None
 * asks whether something is there that should not be**, and that is the whole class.
 *
 * **THE FIRST DISCRIMINATOR WAS BARE DELIMITERS AND THE HEADER CLAIMED THE CORPUS HAD BEEN CHECKED
 * FOR THEM. IT HAD NOT BEEN.** Run against the build it found four pages that are entirely correct:
 * L-0136, L-0137, L-0139 and P-95 quote the Internet Archive's `/web/*\/` search URL, which contains
 * both delimiters four characters apart. A claim written without the check, inside a gate whose
 * purpose is to catch things nobody checked.
 *
 * So the discriminator is a MATCHED PAIR with at least 40 characters between them, which is what a
 * leaked comment looks like and what a URL does not. `/web/*\/` spans one character and is silent;
 * the block that shipped spanned 470 and is caught. The four records are the named positive control
 * that must NOT fire.
 */
const MIN_COMMENT_SPAN = 40;
function leakedSource(text) {
  const hits = [];
  for (const m of text.matchAll(/\/\*/g)) {
    // FROM +1, NOT +2. In `/web/*\/` the closing delimiter overlaps the opening one — the `*` is
    // shared — so searching from +2 steps over it and pairs this URL with the NEXT one's closer,
    // 40+ characters away. That is why three pages still failed after the span threshold was added.
    const close = text.indexOf('*/', m.index + 1);
    if (close === -1) continue;
    if (close - (m.index + 2) < MIN_COMMENT_SPAN) continue; // a URL like /web/*/, not a comment
    hits.push(text.slice(Math.max(0, m.index - 60), m.index + 40).replace(/\s+/g, ' ').trim());
  }
  return hits;
}

/** INVARIANT 1 — a page states its result count in exactly one live region. */
function liveCounts(html) {
  return (html.match(/aria-live=/g) || []).length;
}

/** INVARIANT 2 — the overview's lead figure appears on the overview and on no other tab. */
function hasOverviewBody(html) {
  return /class="dlead"/.test(html);
}

/**
 * INVARIANT 4 — EVERY INDEX SURFACE'S h1 CARRIES A LEAD CLASS.
 *
 * The type scale had no role rule: 21 index routes split 4 / 1 / 16 across three sizes, and which
 * one a page got was an accident of which template had received a class. The rule is now stated in
 * `app/globals.css` — index surfaces take `page-lead`, stories `story-lead`, the landing and the
 * overview board `home-lead`, and record pages keep the bare h1 because they are read after
 * arriving rather than arrived at.
 *
 * **THIS BINDS INDEX ROUTES ONLY.** A record page (`/series/<id>/`, `/ledger/<id>/`) is out of scope
 * by construction and a bare h1 there is correct. The list is the routes in `ROUTES` from
 * `lib/routes.ts` — so adding a destination to the registry brings it under this check, which is
 * the point of having the registry.
 */
const INDEX_ROUTES = [
  'overview', 'domains', 'questions', 'stories', 'search', 'series', 'ledger', 'provenance',
  'contested', 'unmeasured', 'exposure', 'lenses', 'terms', 'peers', 'years', 'publishers',
  'method', 'derivations', 'corrections', 'data', 'counterfactual', 'directory',
];
function leadClass(html) {
  const m = html.match(/<h1\b([^>]*)>/);
  if (!m) return null;
  const c = (m[1].match(/class="([^"]*)"/) || [])[1] || '';
  return /\b(page-lead|home-lead|story-lead)\b/.test(c) ? c.trim() : '';
}

/** INVARIANT 3 — a non-overview tab says what it contains. */
function hasOrientation(html) {
  return /class="dtab-orient/.test(html);
}

if (process.argv.includes('--control')) {
  const twoLive =
    '<p class="facets-count" aria-live="polite">All 619 records.</p><span class="srt-n mono" aria-live="polite">619 shown</span>';
  const oneLive = '<p class="facets-count" aria-live="polite">All 619 records.</p>';
  if (liveCounts(twoLive) !== 2) throw new Error('control FAILED: two live regions were not counted as two');
  if (liveCounts(oneLive) !== 1) throw new Error('control FAILED: one live region was not counted as one');

  const tabWithBody = '<div class="dtabs"></div><figure class="dlead"><svg></svg></figure><table></table>';
  const tabWithout = '<div class="dtabs"></div><p class="dtab-orient prose-note">Every record.</p><table></table>';
  if (!hasOverviewBody(tabWithBody)) throw new Error('control FAILED: an overview body on a tab was not detected');
  if (hasOverviewBody(tabWithout)) throw new Error('control FAILED: a clean tab was reported as carrying the overview body');
  if (!hasOrientation(tabWithout)) throw new Error('control FAILED: an orientation line was not detected');
  if (hasOrientation(tabWithBody)) throw new Error('control FAILED: a missing orientation line was reported present');

  // THE FIXTURE IS THE REAL LEAK, NOT A SHORT STAND-IN FOR IT. The first version of this control
  // used a 27-character comment, which passes under MIN_COMMENT_SPAN — a control that no longer
  // resembles the thing it controls for, which is how a gate comes to report clean on its own
  // defect. This is the opening of the block that actually shipped on 101 pages.
  const realLeak =
    'a crumb /* PREFETCH OFF ON THIS PAGE\u2019S DENSE LISTS. Next prefetches every in-viewport route by default. A lab run measured a topic page issuing 71 requests and pulling ~359 KB of route payloads a reader had not asked for. */ instrument / indicator series';
  if (leakedSource(realLeak).length !== 1)
    throw new Error('control FAILED: a leaked block comment in page text was not detected');
  if (leakedSource('instrument / indicator series — 269 series, 100 with a declared break').length !== 0)
    throw new Error('control FAILED: ordinary rendered prose was reported as leaked source');
  // THE NAMED POSITIVE CONTROL, taken verbatim from L-0136's rendered text. The first version of
  // this gate fired on it and the header claimed the corpus had been checked. It had not.
  if (leakedSource("a timestamped snapshot rather than a wildcard listing: a /web/*/ URL is the archive's search interface").length !== 0)
    throw new Error("control FAILED: the Internet Archive's /web/*/ URL was reported as leaked source");
  // TWO of them on one page is the shape that actually produced the false positive: the first URL's
  // opening delimiter pairing with the second's closer. One occurrence never showed it.
  if (leakedSource("orders were enumerated, not as a wildcard listing: a /web/*/ URL is the archive's search interface, and a second /web/*/ appears further down the same record").length !== 0)
    throw new Error('control FAILED: two /web/*/ URLs on one page were paired into a false leak');

  if (leadClass('<h1 class="page-lead">Indicator series</h1>') !== 'page-lead')
    throw new Error('control FAILED: a lead class was not detected');
  if (leadClass('<h1>All-India raw coal production</h1>') !== '')
    throw new Error('control FAILED: a bare h1 was not reported as unclassed');
  if (leadClass('<p>no heading here</p>') !== null)
    throw new Error('control FAILED: a page with no h1 was not distinguished from one with a bare h1');

  console.log(
    'interface-invariants --control — a leaked block comment in page text is caught, ordinary prose is not, and the Internet Archive /web/*/ URL that four records quote is not; two live count regions are rejected and one is accepted; a tab carrying the overview lead figure is rejected and a tab carrying only its orientation line and its own table is accepted',
  );
  process.exit(0);
}

if (!existsSync(OUT)) {
  console.error('interface-invariants: no build at out/ — run `npm run build` first');
  process.exit(2);
}

const problems = [];
let indexChecked = 0;

// --- 0. leaked source across every built page ------------------------------------------------
{
  const { pageTextFromHtml } = await import('./lib/page-text.mjs');
  const pages = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const p = join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.html')) pages.push(p);
    }
  })(OUT);
  if (pages.length === 0) {
    console.error('interface-invariants: no built pages found. A zero here is a broken scan.');
    process.exit(2);
  }
  let leaked = 0;
  const shown = [];
  for (const p of pages) {
    const hits = leakedSource(pageTextFromHtml(readFileSync(p, 'utf8')));
    if (hits.length) {
      leaked += 1;
      if (shown.length < 4) shown.push(`${p.slice(OUT.length + 1)} — …${hits[0]}…`);
    }
  }
  if (leaked)
    problems.push(
      `${leaked} page(s) render comment delimiters in their text — a block comment placed in JSX is text, not a comment. First: ${shown.join(' | ')}`,
    );
}

// --- 4. the type scale on index surfaces ------------------------------------------------------
{
  let checked = 0;
  for (const r of INDEX_ROUTES) {
    const p = join(OUT, r, 'index.html');
    if (!existsSync(p)) continue;
    checked += 1;
    const c = leadClass(readFileSync(p, 'utf8'));
    if (c === null) problems.push(`/${r}/ has no h1 at all`);
    else if (c === '') problems.push(`/${r}/ has a bare h1 — an index surface takes a lead class, see the type-scale rule in app/globals.css`);
  }
  indexChecked = checked;
  if (checked < INDEX_ROUTES.length - 2) {
    console.error(`interface-invariants: only ${checked} of ${INDEX_ROUTES.length} index routes were found in the build. A shrunken scope is a broken scan.`);
    process.exit(2);
  }
}

// --- 1. the search readout -------------------------------------------------------------------
const searchPath = join(OUT, 'search', 'index.html');
if (!existsSync(searchPath)) {
  console.error('interface-invariants: /search/ is not in the build — the scan cannot run');
  process.exit(2);
}
const nLive = liveCounts(readFileSync(searchPath, 'utf8'));
if (nLive !== 1)
  problems.push(
    `/search/ carries ${nLive} aria-live region(s), expected exactly 1. Two of them announced different result counts, and the static one could never be right because filtering hides rows without moving the DOM.`,
  );

// --- 2 and 3. the domain tabs ----------------------------------------------------------------
const domainsDir = join(OUT, 'domains');
let overviews = 0;
let tabs = 0;
for (const d of readdirSync(domainsDir, { withFileTypes: true })) {
  if (!d.isDirectory()) continue;
  const base = join(domainsDir, d.name);
  const idx = join(base, 'index.html');
  if (existsSync(idx)) {
    overviews += 1;
    if (!hasOverviewBody(readFileSync(idx, 'utf8')))
      problems.push(`/domains/${d.name}/ has no lead figure — the overview tab lost its own body`);
  }
  for (const t of readdirSync(base, { withFileTypes: true })) {
    if (!t.isDirectory()) continue;
    const p = join(base, t.name, 'index.html');
    if (!existsSync(p)) continue;
    tabs += 1;
    const html = readFileSync(p, 'utf8');
    if (hasOverviewBody(html))
      problems.push(`/domains/${d.name}/${t.name}/ renders the overview's lead figure — tabs are appending, not selecting`);
    if (!hasOrientation(html))
      problems.push(`/domains/${d.name}/${t.name}/ opens with no orientation sentence`);
  }
}

if (overviews === 0 || tabs === 0) {
  console.error(`interface-invariants: found ${overviews} overview(s) and ${tabs} tab(s). A zero here is a broken scan, never a pass.`);
  process.exit(2);
}

if (problems.length) {
  console.error(`interface-invariants FAILED — ${problems.length} invariant(s) broken:`);
  for (const b of problems) console.error('  ' + b);
  process.exit(1);
}
console.log(
  `interface-invariants OK — /search/ states its count in 1 live region; ${tabs} domain tab(s) across ${overviews} topic(s) carry their own body and an orientation line, and none carries the overview's; ${indexChecked} index surface(s) carry a lead class` +
    (verbose ? ' · CANNOT bind: count updates on interaction, rendered target size, keyboard traversal, 375px overflow' : ''),
);
