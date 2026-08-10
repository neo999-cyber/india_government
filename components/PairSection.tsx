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

/**
 * Absence entries this pair's view will pool, so a page rendering several pairs can tell the next
 * one what the last already showed. Kept beside the view it describes: two places computing "what
 * this pair pools" is the drift this component exists to prevent.
 */
export function pooledByPair(pair: Pair): unknown[] {
  const a = resolvePairSide(pair.a);
  const b = resolvePairSide(pair.b);
  if (!a || !b) return [];
  // BOTH views put declarations on the page and they must both be reported here, or the dedup
  // covers one shape and silently misses the other. `ContestedPairView` renders each instrument's
  // own `unmeasured` inside its column; `CoverageUsageView` pools its series sides' at pair width.
  // Reporting only the second is what left `jk-detenus-psi` showing three absences twice after the
  // first fix: the page's first pair pooled them and its second re-rendered them in a column.
  if (contestedPairRendersBothSeries(pair)) {
    return [a, b].flatMap((s) => (s.kind === 'series' ? (s.series.unmeasured ?? []) : []));
  }
  const consumed = new Set([a, b].flatMap((s) => (s.kind === 'absence' ? [s.entry] : [])));
  return [a, b].flatMap((s) =>
    s.kind === 'series' ? (s.series.unmeasured ?? []).filter((u) => !consumed.has(u)) : [],
  );
}

export function PairSection({
  pair,
  alreadyPooled,
}: {
  pair: Pair;
  alreadyPooled?: ReadonlySet<unknown>;
}) {
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
        alreadyPooled={alreadyPooled}
      />
    );
  }

  return <CoverageUsageView pair={pair} a={a} b={b} alreadyPooled={alreadyPooled} />;
}
