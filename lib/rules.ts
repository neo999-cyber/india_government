import type { Calendar, Series } from '@/lib/types';
import { periodKey } from '@/lib/format';

/**
 * Rendering rules that are structural, not cosmetic. The validator enforces the same
 * lists in tools/lib/integrity.mjs — the two must stay in step.
 */

/**
 * Regime groups: one indicator carried on incompatible bases, oldest first. No member may
 * be presented alone (CLAUDE.md rule 5). GDP growth now has three: 2004-05, 2011-12 and
 * 2022-23, the last released 27 Feb 2026 (P-10).
 */
export const REGIME_GROUPS: readonly (readonly string[])[] = [
  ['gdp-growth-old-base', 'gdp-growth-new-base', 'gdp-growth-2022-base'],
];

/** Provenance record carrying the contested-index dispute (rule 6). */
export const CONTESTED_INDEX_DISPUTE = 'P-08';

/**
 * Rebasings that restated the LEVEL of nominal GDP. These move every ratio-to-GDP with no
 * change in underlying activity, which is a different thing from a series break and gets a
 * different mark. Derived rather than stored: the series already declare the provenance
 * record, and the schemas are the contract, so no new field is invented here.
 */
export const DENOMINATOR_REVISIONS: readonly {
  provenance: string;
  date: string;
  label: string;
}[] = [
  {
    provenance: 'P-10',
    date: '2026-02-27',
    label: 'nominal GDP restated 3–4% lower on the 2022-23 base',
  },
];

const RATIO_TO_GDP_UNITS = new Set(['% of GDP']);

/** The regime group a series belongs to, or null if it stands alone. */
export function regimeFor(id: string): readonly string[] | null {
  return REGIME_GROUPS.find((group) => group.includes(id)) ?? null;
}

/** The regimes immediately either side of this one, in base order. */
export function regimeNeighbours(id: string): { previous: string | null; next: string | null } {
  const group = regimeFor(id);
  if (!group) return { previous: null, next: null };
  const i = group.indexOf(id);
  return { previous: group[i - 1] ?? null, next: group[i + 1] ?? null };
}

/**
 * The period containing a wall-clock date. Indian fiscal years run April to March, so
 * 2026-02-27 falls in FY2025-26.
 */
export function periodContaining(date: string, calendar: Calendar): string {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(5, 7));
  if (calendar === 'CY') return String(year);
  const startYear = month >= 4 ? year : year - 1;
  return `FY${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`;
}

export type DenominatorBreak = {
  provenance: string;
  date: string;
  label: string;
  /** Period on this series' calendar in which the restatement lands. */
  period: string;
  /** False when the restatement post-dates every observation held. */
  withinSpan: boolean;
};

/**
 * Denominator breaks affecting a series: it is a ratio to GDP, and it declares a
 * provenance record that restated the level of GDP.
 */
export function denominatorBreaksFor(series: Series): DenominatorBreak[] {
  if (!RATIO_TO_GDP_UNITS.has(series.unit.trim())) return [];
  const refs = series.provenanceRefs ?? [];
  const keys = series.points.map((p) => periodKey(p.period));
  const first = Math.min(...keys);
  const last = Math.max(...keys);

  return DENOMINATOR_REVISIONS.filter((rev) => refs.includes(rev.provenance)).map((rev) => {
    const period = periodContaining(rev.date, series.calendar);
    const key = periodKey(period);
    return { ...rev, period, withinSpan: key >= first && key <= last };
  });
}
