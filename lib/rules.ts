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

/**
 * Coverage-versus-usage pairs (P-22).
 *
 * The welfare domain's central finding is that administrative output overstates sustained
 * use, and the gap runs the same direction every time. A single-series chart of a coverage
 * figure states the opposite: `ujjwala-connections` alone reads as ten crore households
 * moved to clean fuel, and the refill rate is what says otherwise. So a coverage series is
 * never presented alone — the same discipline REGIME_GROUPS applies to GDP bases, for the
 * same reason.
 *
 * `usage` is null where the counterpart is not a series at all. Sanitation's independent
 * reading is the r.i.c.e. SQUAT panel, held in P-24's competingAccounts, and it stays there:
 * inventing a series to hold two survey figures would fabricate a time series out of a
 * disagreement.
 */
export interface CoverageUsagePair {
  /** Scheme, used as the heading and the key. */
  scheme: string;
  /** The administrative / MIS figure: an output, an upper bound on the outcome. */
  coverage: string;
  /** The utilisation figure, where one exists as a series. */
  usage: string | null;
  /** Independent counterpart held in a provenance record rather than as a series. */
  usageFromProvenance?: { record: string; holder: string };
  /**
   * A further stage of the cascade that has no public measurement at all.
   *
   * PMAY runs sanctioned → completed → occupied, and only the first two are measured. An
   * absent third stage is a finding, not a blank: a reader who sees sanctioned beside
   * completed will reasonably assume completion is the end of the chain. Naming the stage
   * and saying nothing measures it is the difference between an admission and an omission.
   * The claim itself lives in the series record; this only says which stage is missing.
   */
  unmeasuredStage?: string;
  /** The record that states what the gap is and why it runs one way. */
  governing: string;
}

export const COVERAGE_USAGE_GOVERNING = 'P-22';

export const COVERAGE_USAGE_PAIRS: readonly CoverageUsagePair[] = [
  {
    scheme: 'Ujjwala (LPG)',
    coverage: 'ujjwala-connections',
    usage: 'ujjwala-refills',
    governing: COVERAGE_USAGE_GOVERNING,
  },
  {
    scheme: 'Jal Jeevan Mission',
    coverage: 'jjm-tap-coverage',
    usage: 'jjm-functionality',
    governing: COVERAGE_USAGE_GOVERNING,
  },
  {
    scheme: 'PM-JAY',
    coverage: 'pmjay-cards',
    usage: 'pmjay-admissions',
    governing: COVERAGE_USAGE_GOVERNING,
  },
  {
    // The first pair whose two sides share a unit, so the wedge genuinely subtracts.
    scheme: 'PMAY-G (rural housing)',
    coverage: 'pmay-g-houses',
    usage: 'pmay-g-completed',
    unmeasuredStage: 'occupancy — houses completed and actually lived in',
    governing: COVERAGE_USAGE_GOVERNING,
  },
  {
    scheme: 'Swachh Bharat (sanitation)',
    coverage: 'sanitation-basic',
    usage: null,
    usageFromProvenance: { record: 'P-24', holder: 'r.i.c.e. SQUAT panel 2018' },
    governing: COVERAGE_USAGE_GOVERNING,
  },
];

/** The pair a series belongs to, from either side, or null if it stands alone. */
export function pairFor(id: string): CoverageUsagePair | null {
  return COVERAGE_USAGE_PAIRS.find((p) => p.coverage === id || p.usage === id) ?? null;
}

/**
 * A record's blocking caveat, read from the record itself.
 *
 * `caveat` became a schema field on both the ledger and series schemas in phase 4b, so this
 * no longer holds a list of record ids. That list was the weak point: it lived in code, it
 * could only ever name records someone had thought to add, and it went stale silently the
 * moment a drop renamed or replaced one. Research sessions now author the caveat with the
 * record, which is the only place that can stay correct.
 *
 * The contract the schema states, and which the rendering obeys: a caveat must appear
 * wherever the record appears, compact listings included. Ordinary uncertainty is not a
 * caveat and belongs in `notes` — a caveat marks a record that would mislead without it.
 */
export function caveatOf(record: { caveat?: string } | undefined | null): string | null {
  const text = record?.caveat?.trim();
  return text ? text : null;
}
