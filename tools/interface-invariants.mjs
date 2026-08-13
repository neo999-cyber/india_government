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

/** INVARIANT 1 — a page states its result count in exactly one live region. */
function liveCounts(html) {
  return (html.match(/aria-live=/g) || []).length;
}

/** INVARIANT 2 — the overview's lead figure appears on the overview and on no other tab. */
function hasOverviewBody(html) {
  return /class="dlead"/.test(html);
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

  console.log(
    'interface-invariants --control — two live count regions are rejected and one is accepted; a tab carrying the overview lead figure is rejected and a tab carrying only its orientation line and its own table is accepted',
  );
  process.exit(0);
}

if (!existsSync(OUT)) {
  console.error('interface-invariants: no build at out/ — run `npm run build` first');
  process.exit(2);
}

const problems = [];

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
  `interface-invariants OK — /search/ states its count in 1 live region; ${tabs} domain tab(s) across ${overviews} topic(s) carry their own body and an orientation line, and none carries the overview's` +
    (verbose ? ' · CANNOT bind: count updates on interaction, rendered target size, keyboard traversal, 375px overflow' : ''),
);
