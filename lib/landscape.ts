import { ledger, series } from '@/lib/data';
import type { Domain } from '@/lib/types';
import { LANDMARKS, type Landmark } from '@/lib/landscape-plate';
import { YEARS } from '@/lib/years';

export { PLATE, LANDMARKS } from '@/lib/landscape-plate';
export type { Landmark } from '@/lib/landscape-plate';

/** Series filed to the subject, plus ledger records that declare it. One mark each. */
const filings = (d: Domain) =>
  series.filter((s) => s.domain === d).length + ledger.filter((l) => l.domains.includes(d)).length;

const yearOf = (period: string) => Number(String(period).replace(/^FY/, '').slice(0, 4));

/**
 * THE SCRUBBER'S RANGE IS `YEARS`, AND IT IS NOT DECLARED HERE.
 *
 * **WITHDRAWN: `export const LSC_YEARS = Array.from({ length: 14 }, (_, i) => 2013 + i)`**, written
 * in this file for one measured reason — the corpus holds 52 India observations and 7 filings dated
 * 2013, which a reader asking about 2013 would otherwise be refused.
 *
 * It was wrong twice over. `lib/years.ts` already holds this range once, and its own header records
 * that the last caller to invent a copy linked `/years/2013/` and FAILED `link-check`: pre-baseline
 * records have no year page, deliberately, because the instrument's baseline is frozen at May 2014.
 * A brief that counts a year it cannot link to is a brief with a dead end in it. And a fourth copy
 * of a range held once is the axis-in-two-places defect this instrument has paid for repeatedly —
 * the file being copied from is literally the note recording that lesson.
 *
 * What is true about 2013 is stated where it belongs instead: before 2014 the corpus holds 195
 * observations and 18 records against 1,391 and 205 after it, so the floor is where the record
 * actually starts rather than an arbitrary cut.
 */
const Y0 = YEARS[0];

/** Bit (year - YEARS[0]) set for every year in `years` that the scrubber covers. */
const yearMask = (years: Iterable<number>) => {
  let m = 0;
  for (const y of years) {
    const b = y - Y0;
    if (b >= 0 && b < YEARS.length) m |= 1 << b;
  }
  return m;
};

/**
 * The first year the subject is present at all — an India observation or a record date. It is what
 * the picture would fade in on if a year control is ever added, and it is a fact about the record's
 * START, never about what the subject did.
 */
const firstYear = (d: Domain) => {
  const years: number[] = [];
  for (const s of series.filter((x) => x.domain === d))
    for (const p of s.points)
      if (p.country === 'IND' && p.value !== null) {
        const y = yearOf(String(p.period));
        if (y >= 2000 && y <= 2100) years.push(y);
      }
  for (const l of ledger.filter((x) => x.domains.includes(d))) {
    const y = yearOf(l.date);
    if (y >= 2000 && y <= 2100) years.push(y);
  }
  return years.length ? Math.min(...years) : null;
};

/**
 * ONE MARK PER FILING, IN A PATCH THAT DOES NOT GROW. Deterministic: a fixed seed, so the same
 * scatter is emitted on the server and on every rebuild, and hydration cannot disagree with itself.
 */
function marks(cx: number, baseY: number, w: number, n: number) {
  let seed = 20260827;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const rx = w * 0.62, ry = rx * 0.42;
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, r = 0.45 + Math.sqrt(rnd()) * 0.55;
    out.push({
      x: Number((cx + Math.cos(a) * rx * r).toFixed(1)),
      y: Number((baseY + 4 + Math.sin(a) * ry * r).toFixed(1)),
    });
  }
  return out;
}

/**
 * A MARK CARRIES THE YEARS ITS OWN FILING IS ACTIVE IN, so the year control lights exactly the
 * filings that year holds and not a fixed prefix of the scatter.
 *
 * **WHICH mark lights is as meaningless as where it sits, and that is already the picture's own
 * settlement**: density is the claim, position is not. What is a claim is the COUNT — a series is
 * lit in a year it reported an India observation, a record in the year it is dated — and that is
 * exact, per filing, and checkable against `/data`.
 */
export type LandscapeMark = { readonly x: number; readonly y: number; readonly m: number };

/**
 * What the record holds for one subject in one year. COUNTS ONLY — no record is named, which is
 * what keeps this off the listing rules that would drag every caveat onto the landing page.
 *
 * **It reported HOW MUCH and said nothing about WHAT KIND**, which is the whole of what a reader
 * asked of it. Counts of assessments are the one roll-up the rules allow by name: a scorecard rolls
 * up to counts of assessments, never to a grade, and this is that and stops there.
 */
export type SubjectYear = {
  readonly year: number;
  /** Distinct series of this subject carrying an India observation dated in this year. */
  readonly reporting: number;
  /** Ledger records declaring this subject and dated in this year. */
  readonly records: number;
  /** `[assessment, n]`, commonest first. Empty where the year's filings carry none. */
  readonly assessments: readonly (readonly [string, number])[];
  /** `[type, n]`, commonest first. */
  readonly types: readonly (readonly [string, number])[];
  /**
   * Series of this subject whose own `breaks[]` fall in this year. The most useful thing the brief
   * can say, because no count tells a reader that the year's figures are not comparable.
   */
  readonly seams: number;
};

export type LandscapeSubject = Landmark & {
  readonly series: number;
  readonly records: number;
  readonly filings: number;
  readonly from: number | null;
  readonly marks: readonly LandscapeMark[];
  /** One entry per year of `YEARS`, in that order. */
  readonly years: readonly SubjectYear[];
  /** Declared absences on this subject's records. Per subject, never summed across them. */
  readonly absences: number;
  /**
   * The last year ANY series of this subject reported, and the total observations under it.
   *
   * **BOTH, BECAUSE THE FIRST ALONE MISLEADS, AND IT DID.** The panel first read "this subject's
   * series last reported for 2018" — true of poverty, and read as "poverty was measured in 2018".
   * It was not. Poverty carries TWO series: `poverty-tendulkar`, the headcount, whose last
   * observation is FY2011-12, and `farm-household-income`, which runs to FY2018-19. A `max()` over
   * a subject's heterogeneous series is a number about the FILING, not about the thing, and
   * presenting it as the latter is the read-the-label-beside-the-value defect exactly.
   *
   * With the observation count beside it the sentence stops claiming a measurement and starts
   * describing a record: poverty carries 2 series and 5 observations in all. That thinness is the
   * finding, and it points the reader at the subject rather than answering for it.
   */
  readonly lastReported: number | null;
  /** India observations across every series of this subject, over their whole spans. */
  readonly observations: number;
};

/**
 * THE FILING ORDER IS THE MARK ORDER: this subject's series first, then its records, both in corpus
 * order. Mark i is filing i, which is what lets a mark carry its filing's years.
 */
const filingMasks = (d: Domain): number[] => {
  const out: number[] = [];
  for (const s of series.filter((x) => x.domain === d))
    out.push(
      yearMask(
        s.points
          .filter((p) => p.country === 'IND' && p.value !== null)
          .map((p) => yearOf(String(p.period))),
      ),
    );
  for (const l of ledger.filter((x) => x.domains.includes(d))) out.push(yearMask([yearOf(l.date)]));
  return out;
};

/** `[value, n]` commonest first, then alphabetical so the order is stable across builds. */
const tally = (values: readonly (string | undefined)[]): (readonly [string, number])[] => {
  const m = new Map<string, number>();
  for (const v of values) if (v) m.set(v, (m.get(v) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
};

/** The last year ANY series of this subject carried an India observation, over its whole span. */
const lastReported = (d: Domain): number | null => {
  const ys: number[] = [];
  for (const s of series.filter((x) => x.domain === d))
    for (const p of s.points)
      if (p.country === 'IND' && p.value !== null) {
        const y = yearOf(String(p.period));
        if (Number.isFinite(y)) ys.push(y);
      }
  return ys.length ? Math.max(...ys) : null;
};

/** Server-side: everything the picture needs, derived from `/data` so it cannot drift from it. */
export function landscapeSubjects(): LandscapeSubject[] {
  return LANDMARKS.map((l) => {
    const mine = series.filter((x) => x.domain === l.key);
    const rs = ledger.filter((x) => x.domains.includes(l.key));
    const masks = filingMasks(l.key);
    const pts = marks(l.cx, l.baseY, l.w, filings(l.key));
    return {
      ...l,
      series: mine.length,
      records: rs.length,
      filings: filings(l.key),
      from: firstYear(l.key),
      marks: pts.map((p, i) => ({ ...p, m: masks[i] ?? 0 })),
      years: YEARS.map((year) => {
        const dated = rs.filter((r) => yearOf(r.date) === year);
        return {
          year,
          reporting: mine.filter((s) =>
            s.points.some(
              (p) => p.country === 'IND' && p.value !== null && yearOf(String(p.period)) === year,
            ),
          ).length,
          records: dated.length,
          assessments: tally(dated.map((r) => r.assessment)),
          types: tally(dated.map((r) => r.type)),
          seams: mine.filter((s) =>
            (s.breaks ?? []).some((b) => yearOf(String(b.period)) === year),
          ).length,
        };
      }),
      absences: rs.reduce((n, r) => n + (r.unmeasured?.length ?? 0), 0),
      lastReported: lastReported(l.key),
      observations: mine.reduce(
        (n, s) => n + s.points.filter((p) => p.country === 'IND' && p.value !== null).length,
        0,
      ),
    };
  });
}

/**
 * THE ARCHIVE'S OWN PER-YEAR COUNTS — corpus totals, and deliberately NOT the fourteen subjects
 * added up. A record declaring three subjects is ONE filing in its year and THREE marks on the
 * picture; summing the per-subject counts is the same defect that once made this component's
 * readout say 433 records against a corpus of 223.
 */
export function archiveYears(): SubjectYear[] {
  return YEARS.map((year) => {
    const dated = ledger.filter((r) => yearOf(r.date) === year);
    return {
      year,
      reporting: series.filter((s) =>
        s.points.some(
          (p) => p.country === 'IND' && p.value !== null && yearOf(String(p.period)) === year,
        ),
      ).length,
      records: dated.length,
      assessments: tally(dated.map((r) => r.assessment)),
      types: tally(dated.map((r) => r.type)),
      seams: series.filter((s) =>
        (s.breaks ?? []).some((b) => yearOf(String(b.period)) === year),
      ).length,
    };
  });
}
