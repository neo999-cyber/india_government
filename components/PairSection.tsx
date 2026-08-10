import { getProvenance, resolvePairSide } from '@/lib/data';
import type { Pair } from '@/lib/types';
import { CoverageUsageView } from './CoverageUsageView';
import { ContestedPairView } from './ContestedPairView';

/**
 * ONE PAIR, RENDERED WHOLE, WHEREVER IT LIVES.
 *
 * WHY THIS EXISTS. The choice between `ContestedPairView` and `CoverageUsageView` was written
 * inline on the series page, which is fine while a series page is the only thing that can host a
 * pair — and it was not. Three pairs are a second pair of some series, and six name no series at
 * all and are hosted by a provenance record. Three surfaces choosing the view by copying a ternary
 * is the ad-hoc-normaliser shape CLAUDE.md names as a class: corrected four separate times before
 * anyone wrote it down.
 *
 * THE DISPATCH, AND IT IS NOT `kind` ALONE. `ContestedPairView` compares two instruments on one
 * axis, so it needs two SERIES. A contested pair with a non-series side falls through to
 * `CoverageUsageView`, which can render an absence or a set of competing accounts in a side slot.
 * The series page depends on this distinction for a second reason — it suppresses its own caveat
 * only where `ContestedPairView` actually renders one — so the test is exported rather than
 * duplicated there.
 */
export function contestedPairRendersBothSeries(pair: Pair): boolean {
  if (pair.kind !== 'contested') return false;
  const a = resolvePairSide(pair.a);
  const b = resolvePairSide(pair.b);
  return a?.kind === 'series' && b?.kind === 'series';
}

export function PairSection({ pair }: { pair: Pair }) {
  const a = resolvePairSide(pair.a);
  const b = resolvePairSide(pair.b);
  if (!a || !b) return null;

  if (contestedPairRendersBothSeries(pair) && a.kind === 'series' && b.kind === 'series') {
    return (
      <ContestedPairView
        pair={pair}
        instruments={[a.series, b.series]}
        labels={[pair.a.label, pair.b.label]}
        reconciliation={
          (pair.provenanceRefs ?? [])
            .map((ref) => getProvenance(ref)?.bridgeNote)
            .find((note): note is string => !!note) ?? undefined
        }
      />
    );
  }

  return <CoverageUsageView pair={pair} a={a} b={b} />;
}
