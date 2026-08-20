import { ledger, pairs, series, allUnmeasured } from '@/lib/data';
import { QUESTION_ROUTES, type QuestionRoute } from '@/lib/question-index';
import type { LedgerRecord, Pair, Series, Point } from '@/lib/types';

export { QUESTION_ROUTES, type QuestionRoute } from '@/lib/question-index';

/**
 * THE EIGHT QUESTIONS — a filter each, and a filter is a claim about what it selects.
 *
 * ============================ WHAT THIS FILE IS FOR ===========================================
 *
 * `DESIGN-REVISION-2.md` §2 names eight questions a visitor arrives with and asserts that **every
 * one is a filter over data already held**. That assertion was tested question by question rather
 * than accepted, because a filter that cannot name the field it selects on is a judgement made at
 * query time wearing a filter's clothes — the same defect as an ordering labelled *relevance* that
 * is really title-first, which is why the search page has no relevance sort.
 *
 * **Two of the eight did not survive the test, and they failed in different ways.** They are
 * recorded here with their reasons rather than dropped silently, because an omission with a stated
 * reason is a different object from an omission.
 *
 * ============================ THE SELECTION RULE THIS FILE OBEYS ==============================
 *
 * Rule 9 permits selection and forbids ranking, and the discriminator is whether the criterion is
 * STATED AND CHECKABLE, not whether something comes first. So every question below carries a
 * `criterion` string that is **printed on the page where the selection is made**, names the fields
 * it tests, and describes the record rather than its merit. Where a set is ordered, the ordering
 * criterion is printed too and is deliberately one that refuses a merit reading — *longest run
 * first*, *earliest last observation first* — never *largest move* or *most important*.
 *
 * ============================ WHY THE SET SIZES LIVE HERE AND NOT IN THE PAGES ================
 *
 * One definition of each set, computed from `/data`, read by the index and by the route. Two
 * derivations of one set is the ad-hoc-normaliser class this instrument has paid for five times:
 * the index would say 35 and the page would list 34 and nothing would report it.
 */

/** A year from either period form. Same derivation as `lib/spans.ts`; see the note on REJECTED. */
const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

/**
 * THE BASELINE FLOOR, AND THE ONE SERIES IT REMOVES.
 *
 * The instrument's frame is the UPA baseline frozen May 2014 through the Modi-era terms, so a
 * question about what changed is asked inside that frame. Without the floor,
 * `lok-sabha-sitting-days` enters the worsened set on a comparison between **1952 and 2019** —
 * true of the series and an answer to a different question than the one the page asks.
 *
 * **It is a frame, not a threshold.** It removes exactly one series and trims the start of seven
 * others, and it flips no direction: the improved set is 35 either way and the worsened set is 14
 * without it and 13 with it. A floor that changed which way a series moved would be a thumb on the
 * scale; this one changes only which window the reader is being shown.
 */
const BASELINE_YEAR = 2014;

/** India's observations, in period order, with a value. */
const indiaPoints = (s: Series): Point[] =>
  s.points
    .filter((p) => p.country === 'IND' && typeof p.value === 'number')
    .sort((a, b) => yearOf(a.period) - yearOf(b.period));

/**
 * The window a comparison may be drawn across: from the later of the last methodology break and
 * the baseline, to the last observation.
 *
 * **Rule 2 is why the break bound is here and not a convenience.** A series with `breaks[]` may not
 * be spliced, so a first-to-last comparison spanning a break would be the exact arithmetic the
 * corpus forbids — two figures divided by different things, subtracted. Eighteen of the series in
 * these sets carry at least one break, and for every one of them the window starts at the break.
 */
function currentWindow(s: Series): Point[] {
  const pts = indiaPoints(s);
  const breaks = (s.breaks ?? []).map((b) => yearOf(b.period));
  const floor = Math.max(BASELINE_YEAR, ...(breaks.length ? [Math.max(...breaks)] : []));
  return pts.filter((p) => yearOf(p.period) >= floor);
}

export type DirectedMove = {
  s: Series;
  from: Point;
  to: Point;
  /** Observations in the window, printed on the row so a two-point move is not read as a trend. */
  n: number;
  /** True where the move ran in the direction the record itself declares as better. */
  better: boolean;
};

/**
 * THE ONLY FIELD IN THE CORPUS THAT HOLDS WHICH DIRECTION IS BETTER, AND IT HAD NEVER RENDERED.
 *
 * *What clearly improved* cannot be answered from a trend: a falling unemployment rate and a
 * falling conviction rate are both falls, and only the record knows which is the good one.
 * `higherIsBetter` is that knowledge and nothing else in `/data` carries it.
 *
 * **Its schema description logged the fact that no view read it as a DEBT rather than a decision**,
 * and this is the batch that discharges it — because a filter selecting on an invisible field gives
 * a reader a criterion they cannot check, which is rule 9's requirement failing quietly.
 *
 * 70 series declare a direction, 76 declare explicitly that there is no agreed one, and 123 are
 * silent. Those are three different facts and the index says so: this set is not *everything that
 * improved*, it is *everything the corpus is willing to call an improvement*.
 */
export function directedMoves(): DirectedMove[] {
  const out: DirectedMove[] = [];
  for (const s of series) {
    if (s.higherIsBetter !== true && s.higherIsBetter !== false) continue;
    const w = currentWindow(s);
    if (w.length < 2) continue;
    const from = w[0];
    const to = w[w.length - 1];
    if (to.value === from.value) continue;
    out.push({ s, from, to, n: w.length, better: (to.value! > from.value!) === s.higherIsBetter });
  }
  // Longest run first. Chosen because it is the ordering that most actively refuses the reading a
  // page like this invites — ordering by the size of the move would be a ranking of severity, and
  // the run length is the thing a reader most needs in order to discount a two-point row.
  return out.sort((a, b) => b.n - a.n || a.s.id.localeCompare(b.s.id));
}

export const improved = (): DirectedMove[] => directedMoves().filter((m) => m.better);
export const worsened = (): DirectedMove[] => directedMoves().filter((m) => !m.better);

/**
 * THE PUBLICATION FRONTIER, READ FROM `lib/spans.ts` RATHER THAN RE-DERIVED.
 *
 * That file already computes it, argues it at length, and warns a later pass off both obvious
 * simplifications. A second derivation here would be the defect its own header names.
 */
export type StoppedRow = { s: Series; end: number };

export function stoppedSeries(frontier: number): StoppedRow[] {
  return series
    .map((s) => {
      const pts = indiaPoints(s);
      return pts.length ? { s, end: yearOf(pts[pts.length - 1].period) } : null;
    })
    .filter((r): r is StoppedRow => r !== null && r.end < frontier)
    // Earliest last observation first: the longer a publisher has been silent, the higher it sits.
    // A fact about the record, and the one a reader asking this question is asking for.
    .sort((a, b) => a.end - b.end || a.s.id.localeCompare(b.s.id));
}

/** Ledger records the corpus declines to score yet, with the note that says why. */
export const tooEarly = (): LedgerRecord[] =>
  ledger.filter((l) => l.assessment === 'too-early').sort((a, b) => a.date.localeCompare(b.date));

/**
 * Two instruments measuring the same quantity, both retrieved, disagreeing.
 *
 * **`contested` pairs only, and the exclusion is the substance.** The other 39 pairs are
 * `coverage-usage` — instruments measuring DIFFERENT quantities, the incommensurable category,
 * where agreement is as unsound as disagreement. Pooling them would answer the question with cases
 * that are not disagreements at all.
 */
export const disagreeing = (): Pair[] =>
  pairs.filter((p) => p.kind === 'contested').sort((a, b) => a.domain.localeCompare(b.domain) || a.id.localeCompare(b.id));

/**
 * SEVEN TESTS, ALL EXACT, AND ONE THAT WAS TRIED AND REMOVED.
 *
 * **The removed test was `every India observation verified`, and removing it is the point.** It
 * looked like the strongest test in the list and it is a fact about this instrument rather than
 * about India: `status: approx` means *from a credible report, exact primary pull outstanding* —
 * a statement about what has been retrieved, not about what was published. Requiring it would have
 * made this page a picture of **the corpus's confidence in its own holdings, a question only the
 * author asks**, which is the stated ground on which the status grid was refused. It also cut the
 * set from 91 to 18 and left three coal series, so the wrong test would have produced the loudest
 * finding.
 */
export function measuredWell(): Series[] {
  const contestedSides = new Set(
    pairs.filter((p) => p.kind === 'contested').flatMap((p) => [p.a.series, p.b.series]).filter(Boolean),
  );
  return series
    .filter(
      (s) =>
        (s.tier === 'T1' || s.tier === 'T1F' || s.tier === 'T2') &&
        !(s.breaks ?? []).length &&
        !s.caveat &&
        !(s.unmeasured ?? []).length &&
        !(s.provenanceRefs ?? []).length &&
        !contestedSides.has(s.id) &&
        indiaPoints(s).length >= 2,
    )
    .sort((a, b) => indiaPoints(b).length - indiaPoints(a).length || a.id.localeCompare(b.id));
}

/** How many declared absences say the figure was collected and not published, and across how many records. */
export function notPublished(): { entries: number; records: number } {
  const all = allUnmeasured().filter((a) => a.entry.reasonKind === 'not-published');
  return { entries: all.length, records: new Set(all.map((a) => a.recordId)).size };
}

export const routeBySlug = (slug: string): QuestionRoute | undefined =>
  QUESTION_ROUTES.find((q) => q.slug === slug);

/**
 * THE TWO THAT DID NOT BECOME ROUTES, AND THEY FAILED DIFFERENTLY.
 *
 * Held here rather than written into the index's JSX so that the index cannot list eight questions
 * while the corpus answers six, and so the reasons travel with the definitions they qualify.
 */
export type QuestionDisposal = {
  question: string;
  /** `elsewhere` — the corpus answers it, on a surface that already exists. */
  kind: 'elsewhere' | 'not-offered';
  href?: string;
  hrefLabel?: string;
  reason: string;
};

export const QUESTION_DISPOSALS: QuestionDisposal[] = [
  {
    question: 'Which commitments were met, and which missed?',
    kind: 'not-offered',
    reason:
      'This one is not offered, on two grounds. The first is mechanical: the ledger index already filters by assessment, so a route here would be a second door onto a filter that exists. The second is the reason the design brief rejects target met and target missed as public labels — grouping records under their verdicts produces a tally whatever the labels say, and a tally is the scorecard vocabulary an earlier pass removed. The verdicts are not hidden: every record states its own, with the ground it rests on, on its own page and in the ledger.',
  },
  {
    question: 'What cannot be known?',
    kind: 'elsewhere',
    href: '/unmeasured/',
    hrefLabel: 'What is not measured',
    reason:
      'Answered by a surface that already exists and answers it better than a filter would. Every declared absence in the instrument is listed there with its kind, its stated reason, and whether any source would close it. A question route here would be a second door onto the same page.',
  },
];
