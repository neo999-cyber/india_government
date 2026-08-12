/**
 * THE YEAR RANGE, HELD ONCE.
 *
 * **It was held twice, identically, in `app/years/page.tsx` and `app/years/[year]/page.tsx`** —
 * `Array.from({ length: 13 }, (_, i) => 2014 + i)` in both files. Two copies of one derivation is
 * the ad-hoc-normaliser class this instrument has paid for five times: they agree today and drift
 * on the first change to either, and nothing reports it because both are internally consistent.
 *
 * Lifted 2026-08-12 when a third caller appeared — the next-steps year link, which linked
 * `/years/2013/` for seven pre-baseline records and failed `link-check`. **A third copy would have
 * been the one that was wrong**, and it was: the caller had no range to test against.
 *
 * 2014 is the UPA baseline year, frozen May 2014. The upper bound moves when the corpus reaches a
 * new year, and moving it here moves it everywhere.
 */
export const YEARS: readonly number[] = Array.from({ length: 13 }, (_, i) => 2014 + i);

/** True where a date's year has a year page. Pre-baseline records do not, and that is correct. */
export const hasYearPage = (date: string): boolean => YEARS.includes(Number(date.slice(0, 4)));
