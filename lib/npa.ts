import type { Point, Series, Status } from '@/lib/types';
import { periodKey } from '@/lib/format';

/**
 * The two banking rules that change how an NPA ratio may be rendered.
 *
 * P-17 — the reported ratio overstates the cleanup. Its fall from the 2018 peak mixes
 * genuine recovery with write-offs and with a denominator inflated by credit growth. The
 * instrument must offer the adjusted view alongside the reported one.
 *
 * P-18 — NPA figures are published on two bases, domestic and global operations, and
 * official sources mix them unlabelled. The same 2018 peak reads 14.58% (PSB, global) or
 * 11.46% (SCB, domestic). Two to three percentage points of spurious movement come free
 * with any unlabelled comparison.
 */
export const WRITE_OFF_DISPUTE = 'P-17';
export const BASIS_DISPUTE = 'P-18';

/** Annual write-offs, all scheduled commercial banks, ₹ lakh crore. */
export const WRITE_OFFS_SERIES = 'bank-writeoffs-annual';

/**
 * The shared denominator the adjustment divides by: total advances, ₹ lakh crore, same
 * calendar and periods as the ratio series.
 *
 * NOT PRESENT IN /data. P-17 quotes domestic credit rising ₹66.91 → ₹181.34 lakh crore
 * between 2015 and 2025, but two endpoints in prose are not an annual series, and deriving
 * the intervening years would be fabricating the very denominator the adjustment exists to
 * expose. The id below is provisional: research sessions own it, and the adjusted view
 * stays blocked until it lands. `npm run validate` warns while it is absent.
 */
export const ADVANCES_SERIES = 'scb-advances';

export type Basis = 'domestic' | 'global';

/**
 * Reporting basis, read from the series' own prose rather than stored separately, so the
 * data stays the single source of truth and no schema change is invented here. Earliest
 * mention wins: psb-gross-npa's note opens "GLOBAL OPERATIONS basis" and goes on to
 * mention the domestic figure for contrast, and taking the first match reads it correctly.
 *
 * Returns null when the series states no basis. That is not a default — it renders as
 * "basis not stated", because under P-18 an unlabelled NPA figure is the trap itself.
 */
export function basisOf(series: Series): Basis | null {
  const find = (text: string): Basis | null => {
    const global = text.search(/global operations/i);
    const domestic = text.search(/domestic operations/i);
    if (global === -1 && domestic === -1) return null;
    if (global === -1) return 'domestic';
    if (domestic === -1) return 'global';
    return global < domestic ? 'global' : 'domestic';
  };
  return find(series.title) ?? find(series.notes ?? '');
}

export const BASIS_LABEL: Record<Basis, string> = {
  domestic: 'domestic operations',
  global: 'global operations',
};

/** Does this series carry the write-off dispute? */
export function hasWriteOffAdjustment(series: Series): boolean {
  return (series.provenanceRefs ?? []).includes(WRITE_OFF_DISPUTE);
}

export type AdjustedPoint = {
  period: string;
  /** The ratio as published. */
  reported: number;
  /** Reported plus cumulative write-offs over the same denominator. */
  adjusted: number;
  /** Cumulative write-offs to this period, ₹ lakh crore. */
  cumulativeWriteOffs: number;
  /** The gap in percentage points — what the reported ratio leaves out. */
  gap: number;
  /** Weakest status among the inputs: a derived figure is only as good as its worst input. */
  status: Status;
};

/** verified < approx < pending, weakest wins. */
function weakest(...statuses: Status[]): Status {
  if (statuses.includes('pending')) return 'pending';
  if (statuses.includes('approx')) return 'approx';
  return 'verified';
}

/**
 * Why an adjusted view cannot be drawn. Rendered instead of numbers, never around them:
 * a partial adjustment presented as the adjustment would repeat P-17's own error.
 */
export type Blocker = { kind: 'missing-input' | 'population-mismatch'; detail: string };

export type Adjustment = { points: AdjustedPoint[]; blockers: Blocker[] };

/**
 * Population match between the ratio series and the write-off series.
 *
 * Write-offs are reported for all scheduled commercial banks. Subtracting them against a
 * public-sector-only ratio mixes populations, which is P-18's error wearing different
 * clothes — the resulting line would be neither PSB nor SCB. Flagged rather than computed.
 */
function populationBlocker(series: Series, writeOffs: Series): Blocker | null {
  const ratioIsSectoral = /public sector|private sector/i.test(series.title);
  const writeOffsAreSystemWide = /scheduled commercial banks/i.test(writeOffs.title);
  if (ratioIsSectoral && writeOffsAreSystemWide) {
    return {
      kind: 'population-mismatch',
      detail: `"${series.title}" covers one bank group, while ${WRITE_OFFS_SERIES} covers all scheduled commercial banks. Adjusting one by the other produces a line describing neither population. A write-off series for the same group is needed.`,
    };
  }
  return null;
}

/**
 * The adjusted series: gross NPAs plus cumulative write-offs, over the same denominator
 * (P-17's bridgeNote). Returns blockers rather than approximations when an input is
 * missing — every number here would otherwise be invented.
 */
export function writeOffAdjustment(
  series: Series,
  writeOffs: Series | undefined,
  advances: Series | undefined,
): Adjustment {
  const blockers: Blocker[] = [];

  if (!writeOffs) {
    blockers.push({
      kind: 'missing-input',
      detail: `${WRITE_OFFS_SERIES} (annual write-offs, ₹ lakh crore) is not loaded.`,
    });
  }
  if (!advances) {
    blockers.push({
      kind: 'missing-input',
      detail: `${ADVANCES_SERIES} (total advances, ₹ lakh crore, one value per fiscal year) is not in /data. It is the shared denominator, and without it the adjustment cannot be expressed as a ratio.`,
    });
  }
  if (writeOffs) {
    const mismatch = populationBlocker(series, writeOffs);
    if (mismatch) blockers.push(mismatch);
  }
  if (!writeOffs || !advances || blockers.length > 0) return { points: [], blockers };

  const india = (s: Series) => s.points.filter((p) => p.country === 'IND');
  const writeOffByPeriod = new Map(india(writeOffs).map((p) => [p.period, p.value]));
  const advancesByPeriod = new Map(india(advances).map((p) => [p.period, p.value]));
  const ordered = [...writeOffByPeriod.keys()].sort((a, b) => periodKey(a) - periodKey(b));

  const statusByPeriod = (s: Series) => new Map(india(s).map((p) => [p.period, p.status]));
  const writeOffStatus = statusByPeriod(writeOffs);
  const advancesStatus = statusByPeriod(advances);

  const points: AdjustedPoint[] = [];
  for (const point of india(series).sort((a, b) => periodKey(a.period) - periodKey(b.period))) {
    const denominator = advancesByPeriod.get(point.period);
    if (denominator === undefined || denominator === 0) continue;
    const contributing = ordered.filter((p) => periodKey(p) <= periodKey(point.period));
    const cumulative = contributing.reduce((sum, p) => sum + (writeOffByPeriod.get(p) ?? 0), 0);
    const adjusted = point.value + (100 * cumulative) / denominator;
    points.push({
      period: point.period,
      reported: point.value,
      adjusted,
      cumulativeWriteOffs: cumulative,
      gap: adjusted - point.value,
      status: weakest(
        point.status,
        advancesStatus.get(point.period) ?? 'pending',
        ...contributing.map((p) => writeOffStatus.get(p) ?? 'pending'),
      ),
    });
  }

  return { points, blockers };
}

/**
 * The adjustment shaped as a Series, so it renders through SeriesTable and inherits the
 * seam and status marks rather than reimplementing them. Derived for display only — it is
 * never written to /data, and it carries the source series' breaks because a recognition
 * break cuts the adjusted line exactly where it cuts the reported one.
 */
export function adjustedSeries(series: Series, adjustment: Adjustment): Series | null {
  if (adjustment.blockers.length > 0 || adjustment.points.length === 0) return null;
  const points: Point[] = adjustment.points.map((p) => ({
    country: 'IND',
    period: p.period,
    value: Number(p.adjusted.toFixed(2)),
    status: p.status,
    note: `reported ${p.reported.toFixed(2)} + ${p.gap.toFixed(2)}pp of cumulative write-offs`,
  }));
  return {
    ...series,
    id: `${series.id}-writeoff-adjusted`,
    title: `${series.title} — write-off adjusted`,
    points,
    notes: undefined,
  };
}
