#!/usr/bin/env node
/**
 * own-caveat-once — does a record's own caveat render EXACTLY ONCE on its own page?
 *
 * ============================ THE GAP THIS SITS IN, WHICH IS REAL AND WAS MEASURED ============
 *
 * Three gates touch caveats and none asks this question.
 *
 *   `listing-marks`      binds *each declaration at most once per page* — to LISTING ROWS. On a
 *                        record's own page the caveat is not in a row, so neither copy is in scope.
 *   `field-render-audit` asks whether a field reaches a page. Its scope is `[any page]`, and a
 *                        caveat rendered twice reaches the page twice.
 *   `no-unguarded-prose-field` binds the guarded-marks LIST to the schema, not the rendering.
 *
 * **So a record's own caveat could be duplicated, or absent from its own page, with all three
 * green.** At `ac20d3d` two series rendered theirs twice — `jk-detenus-psi` and
 * `jk-civilians-killed-composite` — both from guards bound to one pair on a page rendering several.
 *
 * ============================ WHY THIS IS A PROBE AND NOT A GATE ==============================
 *
 * The measured backlog is zero, which is the condition under which `quotation-identity` was allowed
 * to gate. This one is not, for the reason the pair-pooling parking gives: the failure it would
 * catch arrives when a component's POOLING changes, and the right answer to that is sometimes
 * *register the new arrangement* rather than *revert*. **A red build is the wrong instrument for a
 * question whose answer might be that the new layout is correct.** Run it by hand when pair or card
 * rendering changes.
 *
 * ============================ THE NEEDLE, AND THE THREE THAT FAILED FIRST =====================
 *
 * **The full caveat text, normalised through `tools/lib/page-text.mjs`.** Three hand-rolled
 * variants were wrong before this one was right, all in the loud direction — reporting defects that
 * did not exist:
 *
 *   a hand-rolled normaliser        → 4 false MISSING (the class CLAUDE.md already documents)
 *   a first-70-character needle     → 1 false DUPLICATE, because L-0118's caveat OPENS WITH THE
 *                                     SAME WORDS as `jk-organised-stone-pelting`'s and sits in that
 *                                     page's cited-by grid. Two records correctly rendering their
 *                                     own caveat is not a duplicate, and a prefix cannot tell them
 *                                     apart.
 *   an element regex ending at      → 29 false MISSING, stopping at the first NESTED `</div>`.
 *   `</div>`
 *
 * A whole caveat cannot collide with another record's and cannot be truncated by markup. That is
 * the entire reason this file exists rather than the check being re-derived a fifth time.
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const { norm, pageTextFromHtml } = await import(join(ROOT, 'tools/lib/page-text.mjs'));
const { loadCorpus } = await import(join(ROOT, 'tools/lib/corpus-search.mjs'));

const routeFor = (r) => (r.points ? 'series' : r.id.startsWith('P-') ? 'provenance' : 'ledger');

// POSITIVE AND NEGATIVE CONTROL, through the same counting the live pass uses. A check whose whole
// value is its zeros needs a positive beside it.
{
  const cav = 'A qualification that would mislead without it.';
  const count = (page) => norm(page).split(norm(cav)).length - 1;
  if (count(`x ${cav} y`) !== 1) throw new Error('own-caveat-once: missed its positive control');
  if (count(`x ${cav} y ${cav} z`) !== 2) throw new Error('own-caveat-once: missed a duplicate');
  if (count('x y z') !== 0) throw new Error('own-caveat-once: fired on its negative control');
}

const records = [...loadCorpus()].map((x) => x.record).filter((r) => r.caveat);
let once = 0;
const bad = [];
for (const r of records) {
  const f = join(ROOT, 'out', routeFor(r), r.id, 'index.html');
  if (!existsSync(f)) continue;
  const text = norm(pageTextFromHtml(readFileSync(f, 'utf8')));
  const n = text.split(norm(r.caveat)).length - 1;
  if (n === 1) once += 1;
  else bad.push({ id: r.id, route: `/${routeFor(r)}/${r.id}/`, n });
}

console.log(
  `own-caveat-once — ${once} of ${once + bad.length} record(s) carrying a caveat render it exactly ` +
    `once on their own page. REPORT-ONLY; no gate binds this question. ` +
    `${bad.filter((b) => b.n === 0).length} missing, ${bad.filter((b) => b.n > 1).length} duplicated.`,
);
for (const b of bad) console.log(`   ${b.n === 0 ? 'MISSING   ' : `×${b.n}        `} ${b.route}`);
