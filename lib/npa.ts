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
 * The adjustment's numerator: gross NPAs in absolute rupees, ₹ lakh crore.
 *
 * P-17's contract names it as a required input, and the ratio series cannot stand in for
 * it. `scb-gross-npa` begins at FY2014-15, while the amount and the denominator are both
 * sourced at FY2013-14 — so keying the adjustment off the published ratio silently drops
 * the pre-cleanup baseline year, which is the one year the comparison most needs.
 */
export const NPA_AMOUNT_SERIES = 'scb-gross-npa-amount';

/**
 * The shared denominator: gross advances, ₹ lakh crore, on the same bank population and
 * the same reporting basis as the numerator.
 *
 * Sourced at three periods only — FY2013-14, FY2017-18, FY2024-25 — which is why the
 * adjusted view is defined at those points and is NOT a continuous annual line. P-17 is
 * explicit that 'domestic credit' must not be substituted for it: that is a different and
 * much larger aggregate (~₹181 lakh crore against ~₹98 lakh crore of advances at Mar
 * 2025), and using it would understate the adjustment by roughly half.
 */
export const ADVANCES_SERIES = 'scb-gross-advances';

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

export type Adjustment = {
  points: AdjustedPoint[];
  blockers: Blocker[];
  /**
   * Limits on what the rendered points mean. Unlike a blocker these do not suppress the
   * view — they travel with it, because three sourced points are worth showing and a
   * reader must not read them as an annual line.
   */
  caveats: string[];
};

/**
 * Population match between the ratio series and the adjustment's inputs.
 *
 * Both the write-off series and the advances denominator cover all scheduled commercial
 * banks. Applying either to a public-sector-only ratio mixes populations, which is P-18's
 * error wearing different clothes — the resulting line would describe neither PSBs nor
 * SCBs. Flagged rather than computed.
 *
 * Note both inputs, not just write-offs: per-group cumulative write-off series do exist in
 * /data, so naming only write-offs would invite someone to "resolve" this by swapping them
 * in while the denominator is still all-SCB — which would leave the mismatch in place and
 * hide it. P-17 requires the whole calculation on one population.
 */
function populationBlocker(series: Series, writeOffs: Series): Blocker | null {
  const ratioIsSectoral = /public sector|private sector/i.test(series.title);
  const writeOffsAreSystemWide = /scheduled commercial banks/i.test(writeOffs.title);
  if (ratioIsSectoral && writeOffsAreSystemWide) {
    return {
      kind: 'population-mismatch',
      detail: `"${series.title}" covers one bank group, while both ${WRITE_OFFS_SERIES} and the ${ADVANCES_SERIES} denominator cover all scheduled commercial banks. Adjusting one by the other produces a line describing neither population. P-17 requires the numerator, the write-offs and the denominator to be on one population: a same-group write-off series alone is not enough while the denominator is still all-SCB.`,
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
  amount: Series | undefined,
): Adjustment {
  const blockers: Blocker[] = [];
  const caveats: string[] = [];

  if (!writeOffs) {
    blockers.push({
      kind: 'missing-input',
      detail: `${WRITE_OFFS_SERIES} (annual write-offs, ₹ lakh crore) is not loaded.`,
    });
  }
  if (!advances) {
    blockers.push({
      kind: 'missing-input',
      detail: `${ADVANCES_SERIES} (gross advances, ₹ lakh crore) is not in /data. It is the shared denominator, and without it the adjustment cannot be expressed as a ratio.`,
    });
  }
  if (!amount) {
    blockers.push({
      kind: 'missing-input',
      detail: `${NPA_AMOUNT_SERIES} (gross NPAs, ₹ lakh crore) is not in /data. P-17 defines the adjustment on absolute amounts, and the published ratio cannot stand in for it.`,
    });
  }
  if (writeOffs) {
    const mismatch = populationBlocker(series, writeOffs);
    if (mismatch) blockers.push(mismatch);
  }
  if (!writeOffs || !advances || !amount || blockers.length > 0) {
    return { points: [], blockers, caveats };
  }

  const india = (s: Series) => s.points.filter((p) => p.country === 'IND');
  const writeOffByPeriod = new Map(india(writeOffs).map((p) => [p.period, p.value]));
  const advancesByPeriod = new Map(india(advances).map((p) => [p.period, p.value]));
  const ordered = [...writeOffByPeriod.keys()].sort((a, b) => periodKey(a) - periodKey(b));
  const earliestWriteOff = ordered[0];

  const statusByPeriod = (s: Series) => new Map(india(s).map((p) => [p.period, p.status]));
  const writeOffStatus = statusByPeriod(writeOffs);
  const advancesStatus = statusByPeriod(advances);

  // Keyed off the absolute amount, not the published ratio: P-17 defines the adjustment as
  // (gross NPAs + cumulative write-offs) / gross advances, and the amount is sourced for one
  // period (FY2013-14) that the ratio series does not carry.
  const points: AdjustedPoint[] = [];
  for (const point of india(amount).sort((a, b) => periodKey(a.period) - periodKey(b.period))) {
    const denominator = advancesByPeriod.get(point.period);
    if (denominator === undefined || denominator === 0) continue;
    const contributing = ordered.filter((p) => periodKey(p) <= periodKey(point.period));
    const cumulative = contributing.reduce((sum, p) => sum + (writeOffByPeriod.get(p) ?? 0), 0);
    const reported = (100 * point.value) / denominator;
    const adjusted = (100 * (point.value + cumulative)) / denominator;
    points.push({
      period: point.period,
      reported,
      adjusted,
      cumulativeWriteOffs: cumulative,
      gap: adjusted - reported,
      status: weakest(
        point.status,
        advancesStatus.get(point.period) ?? 'pending',
        ...contributing.map((p) => writeOffStatus.get(p) ?? 'pending'),
      ),
    });
  }

  // P-17: the denominator is sourced at discrete periods, so these are points, not a line.
  // Said out loud rather than left to be inferred from the gaps in the table.
  if (points.length > 0) {
    caveats.push(
      `Defined at ${points.length} sourced period${points.length === 1 ? '' : 's'} (${points
        .map((p) => p.period)
        .join(', ')}), not as a continuous annual line: ${ADVANCES_SERIES} is sourced at those periods only. The intervening years are not computed, because deriving the denominator would fabricate the very quantity the adjustment exists to expose. An annual advances series from RBI Trend & Progress would lift this.`,
    );
    // A zero here is the window opening, not an absence of write-offs before it.
    const zeroPoint = points.find((p) => p.cumulativeWriteOffs === 0);
    if (zeroPoint && earliestWriteOff) {
      caveats.push(
        `At ${zeroPoint.period} the cumulative write-off total is zero because ${WRITE_OFFS_SERIES} begins at ${earliestWriteOff}, so the adjusted and reported figures coincide. That is the window opening, not a claim that nothing was written off earlier — it makes ${zeroPoint.period} the pre-cleanup baseline the later points are read against.`,
      );
    }
  }

  return { points, blockers, caveats };
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
