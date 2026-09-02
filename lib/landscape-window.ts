import type { SubjectYear } from '@/lib/landscape';

/**
 * A WINDOW OVER THE YEARS — pure, so the landing picture, the topic timeline and the year page can
 * all read one through the same arithmetic in the browser. Nothing here touches `/data`; every
 * input is a per-year payload the server already derived.
 *
 * ============================ WHAT A WINDOW CAN AND CANNOT COUNT ============================
 *
 * **Records add across years and series do not.** A record is dated in exactly one year, so the
 * window's filings are the years' filings summed, and the assessment tallies merge the same way.
 * A series that reported in three years of the window is ONE series reporting, which is why the
 * distinct count is taken from the per-filing year masks the landscape already carries — one bit a
 * year, one mask a filing — and never from the per-year counts. Summing those would have said
 * "47 series reported" of a subject with 20.
 *
 * **Seams are counted as series-years**: a series breaking twice inside the window is two changes
 * of basis, and both are the reader's business.
 */
export type Window = { readonly from: number; readonly to: number };

/** Bit i set for every year of `years` inside the window, inclusive. */
export const windowMask = (years: readonly number[], w: Window): number => {
  let m = 0;
  years.forEach((y, i) => {
    if (y >= w.from && y <= w.to) m |= 1 << i;
  });
  return m;
};

export type WindowCell = {
  readonly from: number;
  readonly to: number;
  /** Distinct series with an India observation in at least one year of the window. */
  readonly reporting: number;
  /** Records dated inside the window. */
  readonly records: number;
  readonly assessments: readonly (readonly [string, number])[];
  readonly types: readonly (readonly [string, number])[];
  /** Series-years in which a series of the subject changed basis, inside the window. */
  readonly seams: number;
  /** The years inside the window that carry at least one seam, ascending. */
  readonly seamYears: readonly number[];
};

const merge = (
  lists: readonly (readonly (readonly [string, number])[])[],
): (readonly [string, number])[] => {
  const m = new Map<string, number>();
  for (const l of lists) for (const [k, n] of l) m.set(k, (m.get(k) ?? 0) + n);
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
};

/**
 * @param cells one `SubjectYear` per year of `years`, in that order
 * @param seriesMasks the year mask of every SERIES of the subject (or of the archive) — filings that
 *   are records are not passed, because records are counted from the cells
 */
export function windowCell(
  years: readonly number[],
  cells: readonly SubjectYear[],
  seriesMasks: readonly number[],
  w: Window,
): WindowCell {
  const mask = windowMask(years, w);
  const inside = cells.filter((c) => c.year >= w.from && c.year <= w.to);
  return {
    from: w.from,
    to: w.to,
    reporting: seriesMasks.filter((m) => (m & mask) !== 0).length,
    records: inside.reduce((n, c) => n + c.records, 0),
    assessments: merge(inside.map((c) => c.assessments)),
    types: merge(inside.map((c) => c.types)),
    seams: inside.reduce((n, c) => n + c.seams, 0),
    seamYears: inside.filter((c) => c.seams > 0).map((c) => c.year),
  };
}

/** The lead series of a subject, as the landing picture needs it: its India points and its seams. */
export type Lead = {
  readonly id: string;
  readonly title: string;
  readonly unit: string;
  /** `[year, value, period]`, ascending by year. */
  readonly points: readonly (readonly [number, number, string])[];
  /** Years in which the lead's own `breaks[]` fall. */
  readonly seams: readonly number[];
};

/**
 * WHAT THE LEAD DID ACROSS A WINDOW — or why it cannot be read.
 *
 * **A seam inside the window refuses the comparison.** Rule 2 forbids a line across a break, and a
 * sentence "moved from X to Y" IS that line in words. The refusal names the year the instrument
 * changed, because that is the more useful finding: the 2020 education figure and the 2016 one are
 * not the same measurement, and a reader comparing them needs to be told before the numbers.
 *
 * The seam test is `from < seam <= to`: a break dated in the window's first year sits BEFORE the
 * first observation the window would read, and the window's figures are all on the new basis.
 */
export type LeadMove =
  | { readonly kind: 'refused'; readonly seams: readonly number[] }
  | { readonly kind: 'moved'; readonly a: readonly [number, string]; readonly b: readonly [number, string] }
  | { readonly kind: 'one'; readonly a: readonly [number, string] }
  | { readonly kind: 'none' };

export function leadMove(lead: Lead, w: Window): LeadMove {
  const seams = lead.seams.filter((s) => s > w.from && s <= w.to);
  if (seams.length) return { kind: 'refused', seams };
  const inside = lead.points.filter(([y]) => y >= w.from && y <= w.to);
  if (!inside.length) return { kind: 'none' };
  const first = inside[0], last = inside[inside.length - 1];
  if (inside.length === 1 || first[2] === last[2]) return { kind: 'one', a: [first[1], first[2]] };
  return { kind: 'moved', a: [first[1], first[2]], b: [last[1], last[2]] };
}
