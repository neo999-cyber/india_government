import { series } from '@/lib/data';

/**
 * SPAN DERIVATION, SHARED — one definition of what a series' span IS.
 *
 * **Lifted out of `app/series/page.tsx` on 2026-08-11 when the year pages needed the same spans.**
 * A second derivation of one quantity is the ad-hoc-normaliser class this instrument has paid for
 * four times: the two would agree today and drift on the first change to either, and nothing would
 * report it because both would be internally consistent. The year slice must draw the spans
 * `/search/?layer=series` draws, so it reads them from here.
 */

const yearOfPeriod = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

/**
 * THE PUBLICATION FRONTIER, DERIVED — the year most current annual series have reached.
 *
 * **NOT the maximum end year in the corpus.** The maximum is 2026 and five series reach it, because
 * 2026 has barely begun; measured against it, *ends before the latest year* returns 264 of 269 and
 * marks still-current series as stopped for lacking a figure that does not exist anywhere. The
 * frontier is **where the current plateau BEGINS**, and against it the answer is 93.
 *
 * THE FIRST CUT TOOK THE LATEST PLATEAU YEAR AND WAS WRONG BY 85 SERIES. End years run
 * …2022:21, 2023:31, **2024:85, 2025:86**, 2026:5 — a step, not a slope. Taking the latest year
 * above a fifth-of-a-percent threshold gave 2025, and *ends before 2025* then swept in the entire
 * 2024 cohort: **178 instead of 93**. Those 85 series are not stopped; they are annual series whose
 * 2025 figure is not out yet.
 *
 * So the frontier is the EARLIEST year holding at least half the busiest year's count — 43 of 86 —
 * which is 2024, the first year of the plateau. A series ending before it has stopped; one ending
 * in it has simply not been updated yet.
 *
 * Derived rather than hardcoded so it moves when the corpus does. **A later pass must not replace
 * this with `Math.max`, nor with the latest plateau year.** Both look like simplifications and both
 * turn a filter naming 93 publishers who stopped into one asserting that most of the corpus has.
 */
function publicationFrontier(ends: number[]): number {
  const byYear = new Map<number, number>();
  for (const e of ends) byYear.set(e, (byYear.get(e) ?? 0) + 1);
  const busiest = Math.max(...byYear.values());
  return Math.min(...[...byYear].filter(([, n]) => n >= busiest / 2).map(([y]) => y));
}

export type SpanRow = {
  id: string;
  title: string;
  start: number;
  end: number;
  breaks: number[];
  verified: number;
  span: number;
  stopped: boolean;
  short: boolean;
};

/** Every series with at least one India observation, as a span, sorted by first observation. */
export function spanRows(): SpanRow[] {
  const base = series
    .map((s) => {
      const pts = s.points.filter((p) => p.country === 'IND' && p.value !== null);
      if (!pts.length) return null;
      const ys = pts.map((p) => yearOfPeriod(p.period)).sort((a, b) => a - b);
      const start = ys[0];
      const end = ys[ys.length - 1];
      return {
        id: s.id,
        title: s.title,
        start,
        end,
        breaks: (s.breaks ?? []).map((b) => yearOfPeriod(b.period)).filter((b) => b >= start && b <= end),
        verified: pts.filter((p) => p.status === 'verified').length / pts.length,
        span: end - start + 1,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => a.start - b.start || a.end - b.end || a.id.localeCompare(b.id));

  const frontier = publicationFrontier(base.map((r) => r.end));
  return base.map((r) => ({ ...r, stopped: r.end < frontier, short: r.span <= 3 }));
}

export function spanFrontier(rows: SpanRow[]): number {
  return publicationFrontier(rows.map((r) => r.end));
}

/**
 * THE AXIS BEGINS WHERE THE DATA IS, NOT AT THE EARLIEST DATUM.
 *
 * Anchoring to `Math.min` put the origin at **1952 — one series — and that single row consumed
 * 51 per cent of the width.** Four series begin before 2000 and between them they took 65 per
 * cent of the axis, so the other 265 were crushed into the right-hand third and the strip could
 * not do the one job it has: show the shape of the spans. The median start year is 2014.
 *
 * So the origin is the **2nd-percentile start year**, computed here so it moves with the corpus.
 * NOTHING IS CLIPPED AWAY: a series beginning earlier is drawn to the left edge and carries a
 * continuation mark plus its true start year, which is the same idiom as the dashed end. **The
 * axis is narrowed; the record is not.**
 */
export function spanAxis(rows: SpanRow[]): { x0: number; x1: number } {
  const startsSorted = rows.map((r) => r.start).sort((a, b) => a - b);
  return {
    x0: startsSorted[Math.floor(startsSorted.length * 0.02)],
    x1: Math.max(...rows.map((r) => r.end)),
  };
}
