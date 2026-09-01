import { series } from '@/lib/data';
import type { Domain, Series } from '@/lib/types';

/**
 * WHERE THE MEASURING INSTRUMENTS CHANGED.
 *
 * ============================ WHAT THIS IS A CLAIM ABOUT =====================================
 *
 * **Indian statistical practice, not this archive's coverage.** Every seam here is a decision taken
 * by MoSPI, ASER, the RBI, the NCRB or a ministry — a base year moved, a definition narrowed, a
 * collection system replaced — and the corpus is the evidence for it, not the subject of it. That
 * distinction is what keeps this off the self-audit shelf at `/derivations`: something outside this
 * corpus would have to change for a seam to move.
 *
 * ============================ WHY IT CAN BE BUILT AT ALL =====================================
 *
 * Because `breaks[]` has been first-class since the schema was written, and rule 2 has always
 * refused to splice across one. This view draws what the records were already carrying; it derives
 * nothing, infers nothing and smooths nothing.
 */
export type Seam = {
  readonly seriesId: string;
  readonly title: string;
  readonly domain: Domain;
  readonly year: number;
  /** The break's own `period` string, printed as the record states it rather than as a bare year. */
  readonly period: string;
  readonly note: string;
};

const yearOf = (period: string) => Number(String(period).replace(/^FY/, '').slice(0, 4));

/** Every break in the corpus, in chronological order, then by subject, then by series title. */
export function seams(): Seam[] {
  const out: Seam[] = [];
  for (const s of series)
    for (const b of s.breaks ?? []) {
      const year = yearOf(String(b.period));
      if (!Number.isFinite(year)) continue;
      out.push({
        seriesId: s.id,
        title: s.title,
        domain: s.domain,
        year,
        period: String(b.period),
        note: b.note ?? '',
      });
    }
  return out.sort(
    (a, b) => a.year - b.year || a.domain.localeCompare(b.domain) || a.title.localeCompare(b.title),
  );
}

/** The series a seam belongs to, so its own marks can render beside it (rules 3a and 4b). */
export function seamSeries(id: string): Series {
  const s = series.find((x) => x.id === id);
  if (!s) throw new Error(`seams: no series ${id}`);
  return s;
}

/**
 * The axis is the RANGE THE BREAKS THEMSELVES OCCUPY, not a fixed window. A view whose columns were
 * chosen by hand would quietly hide a seam the first time one landed outside them.
 */
export function seamYears(all: Seam[]): number[] {
  const ys = all.map((s) => s.year);
  const lo = Math.min(...ys);
  const hi = Math.max(...ys);
  return Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
}

/** Subjects that have any seam at all, in the corpus's own order. Subjects with none are absent. */
export function seamSubjects(all: Seam[]): Domain[] {
  const seen: Domain[] = [];
  for (const s of all) if (!seen.includes(s.domain)) seen.push(s.domain);
  return seen.sort();
}
