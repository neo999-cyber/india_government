import Link from 'next/link';
import type { Pair, Series } from '@/lib/types';
import type { ResolvedSide } from '@/lib/data';
import { periodLabel } from '@/lib/format';
import { SeriesTable } from './SeriesTable';
import { Absences, Value } from './marks';

/**
 * A delivered figure beside what it converted into.
 *
 * Asymmetric by construction: side a records what was delivered, side b what came of it, and
 * the order is the argument. `ujjwala-connections` alone reads as ten crore households moved
 * to clean fuel, and it is the refill rate that says otherwise, so neither side renders
 * without the other.
 *
 * Everything that is a judgement now comes from data/pairs.json — which series pair, which
 * side is which, what each side is called, why the two do or do not subtract. Nothing here
 * regenerates any of it: "The build record" is not "sustained use", and only the data knows
 * which a given pair needs.
 */

const latest = (s: Series) => {
  const india = s.points.filter((p) => p.country === 'IND');
  return india[india.length - 1];
};

function Side({ side, position }: { side: ResolvedSide; position: 'a' | 'b' }) {
  const className = `cu-side cu-side-${position === 'a' ? 'coverage' : 'usage'}`;

  if (side.kind === 'series') {
    const point = latest(side.series);
    return (
      <div className={className}>
        <span className="label">{side.label}</span>
        <h3>
          <Link href={`/series/${side.series.id}/`}>{side.series.title}</Link>
        </h3>
        {point ? (
          <p className="cu-headline">
            <Value point={point} denominator={side.series.denominator} />{' '}
            <span className="cu-unit">
              {side.series.unit} · {periodLabel(point.period, side.series.calendar)}
            </span>
          </p>
        ) : null}
        <SeriesTable series={side.series} />
        {side.series.notes ? <p className="prose-note">{side.series.notes}</p> : null}
      </div>
    );
  }

  if (side.kind === 'absence') {
    return (
      <div className={className}>
        <span className="label">{side.label}</span>
        <Absences items={[side.entry]} heading="The counterpart that would go here" />
        <p className="source-line">
          Declared on <Link href={`/series/${side.hostId}/`}>{side.hostTitle}</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <span className="label">{side.label}</span>
      <h3>
        <Link href={`/provenance/${side.record.id}/`}>{side.record.title}</Link>
      </h3>
      <dl className="cu-accounts">
        {(side.record.competingAccounts ?? []).map((account, i) =>
          typeof account === 'string' ? (
            <div key={`acc-${i}`}>
              <dd>{account}</dd>
            </div>
          ) : (
            <div key={account.holder}>
              <dt>{account.holder}</dt>
              <dd>{account.position}</dd>
            </div>
          ),
        )}
      </dl>
      <p className="prose-note">
        Both accounts are recorded and neither is endorsed. The instrument does not pick between
        a government survey and an independent panel; it shows that they disagree and by how
        much.
      </p>
    </div>
  );
}

export function CoverageUsageView({ pair, a, b }: { pair: Pair; a: ResolvedSide; b: ResolvedSide }) {
  /**
   * A wedge is printed only where the data says one exists.
   *
   * `gapComputable` is a research judgement, not something to infer: both sides sharing a unit
   * is necessary but not sufficient, and the file is where that call is recorded. Where it is
   * false, `gapReason` says why — different quantities, different denominators, different
   * populations, or a disagreement rather than a gap.
   */
  const wedge = (() => {
    if (!pair.gapComputable || a.kind !== 'series' || b.kind !== 'series') return null;
    const av = latest(a.series);
    const bv = latest(b.series);
    // A pending point with no figure cannot enter a subtraction.
    if (!av || !bv || av.value === null || bv.value === null) return null;
    if (a.series.unit.trim() !== b.series.unit.trim()) return null;
    return { value: av.value - bv.value, unit: a.series.unit };
  })();

  // Entries already standing in a counterpart slot. A series can be both the coverage side
  // and the source of the absence occupying the usage side — metro-network and
  // household-electrification both are — and pooling those again renders the same
  // declaration twice on one page. Identity comparison is exact here: the resolver returns
  // the very entry object off the loaded record.
  const consumed = new Set([a, b].flatMap((side) => (side.kind === 'absence' ? [side.entry] : [])));
  const pooled = [a, b].flatMap((side) =>
    side.kind === 'series' ? (side.series.unmeasured ?? []).filter((u) => !consumed.has(u)) : [],
  );

  const refs = pair.provenanceRefs ?? [];

  return (
    <section className="cu-view">
      <div className="cu-head">
        <span className="label">Coverage versus usage</span>
        <p>
          {pair.framing} Neither figure is presented without the other
          {refs.length > 0 ? (
            <>
              {' ('}
              {refs.map((ref, i) => (
                <span key={ref}>
                  {i > 0 ? ', ' : ''}
                  <Link href={`/provenance/${ref}/`}>{ref}</Link>
                </span>
              ))}
              {')'}
            </>
          ) : null}
          .
        </p>
      </div>

      <div className="cu-pair">
        <Side side={a} position="a" />
        <Side side={b} position="b" />
      </div>

      {/* Absences declared by either SERIES side, pooled at the pair's own width.
          Without this they render nowhere: the series page suppresses its own block when a
          pair view takes over, on the assumption the pair pools them, and between phase 4d
          and this fix the pair did not. Four declarations were invisible, including the
          PMAY-G occupancy absence the Absence mark was generalised for. A side resolved to
          `absence` already renders its entry in the slot above, so it is not pooled twice. */}
      <Absences items={pooled} heading="Not measured in this chain" />

      <p className="cu-gap">
        <span className="label">The gap</span>{' '}
        {wedge ? (
          <>
            The wedge is <strong>{wedge.value.toFixed(2)}</strong> {wedge.unit}, side a over side
            b. Both are on the same basis, so this one subtracts.
          </>
        ) : (
          pair.gapReason
        )}
      </p>

      {pair.notes ? <p className="source-line">{pair.notes}</p> : null}
    </section>
  );
}
