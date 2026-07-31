import Link from 'next/link';
import type { ProvenanceRecord, Series } from '@/lib/types';
import type { CoverageUsagePair } from '@/lib/rules';
import { periodLabel } from '@/lib/format';
import { SeriesTable } from './SeriesTable';
import { Value } from './marks';

/**
 * A coverage figure beside the usage figure that qualifies it (P-22).
 *
 * The welfare domain's finding is that administrative output overstates sustained use and
 * the gap runs one direction every time. That finding only survives contact with a reader
 * if the two sides arrive together: `ujjwala-connections` alone reads as ten crore
 * households moved to clean fuel, and it is the refill rate that says otherwise. So this
 * renders both, in a fixed order — output first, then what it converted into — and the
 * order is the argument.
 *
 * What it deliberately does NOT do is print a single gap number. See `gapStatement`.
 */

/**
 * Whether the two sides can be subtracted.
 *
 * Only when they carry the identical unit string. That string is where the data authors put
 * the denominator — "% of rural households" against "% of certified households", "crore
 * cards" against "crore admissions" — so comparing unit strings is comparing populations,
 * not formatting. As of phase 4 no pair passes this test, and that is the finding rather
 * than a gap in the data: a connection is not a refill, a tap is not safe water, and a card
 * is not an admission. Subtracting them would manufacture a number no source supports,
 * which is the error P-22 exists to name, committed in the opposite direction.
 */
function comparable(coverage: Series, usage: Series): boolean {
  return coverage.unit.trim() === usage.unit.trim();
}

const latest = (s: Series) => {
  const india = s.points.filter((p) => p.country === 'IND');
  return india[india.length - 1];
};

function Reading({ series, role }: { series: Series; role: 'coverage' | 'usage' }) {
  const point = latest(series);
  return (
    <div className={`cu-side cu-side-${role}`}>
      <span className="label">{role === 'coverage' ? 'Administrative output' : 'Sustained use'}</span>
      <h3>
        <Link href={`/series/${series.id}/`}>{series.title}</Link>
      </h3>
      {point ? (
        <p className="cu-headline">
          <Value point={point} />{' '}
          <span className="cu-unit">
            {series.unit} · {periodLabel(point.period, series.calendar)}
          </span>
        </p>
      ) : null}
      <SeriesTable series={series} />
      {series.notes ? <p className="prose-note">{series.notes}</p> : null}
    </div>
  );
}

export function CoverageUsageView({
  pair,
  coverage,
  usage,
  counterpart,
  governing,
}: {
  pair: CoverageUsagePair;
  coverage: Series;
  usage?: Series;
  /** The record holding the independent counterpart, when it is not a series. */
  counterpart?: ProvenanceRecord;
  governing?: ProvenanceRecord;
}) {
  const gapStatement = (() => {
    if (usage && comparable(coverage, usage)) {
      const c = latest(coverage);
      const u = latest(usage);
      if (c && u) {
        return (
          <>
            The wedge is <strong>{(c.value - u.value).toFixed(2)}</strong> {coverage.unit}, output
            over use. Both sides are on the same basis, so this one subtracts.
          </>
        );
      }
    }
    if (usage) {
      return (
        <>
          These two do not subtract. Coverage is measured in{' '}
          <strong>{coverage.unit}</strong> and use in <strong>{usage.unit}</strong>
          {' — '}different quantities on different denominators, so no single gap figure is
          computed and none is estimated. The gap is the direction, and it is stated in each
          side&rsquo;s own terms above. A subtraction here would invent a number no source
          supports, which is the error <Link href="/provenance/P-22/">P-22</Link> names,
          committed the other way round.
        </>
      );
    }
    return (
      <>
        The independent counterpart is not a series. It is a pair of competing survey readings
        held in <Link href={`/provenance/${counterpart?.id}/`}>{counterpart?.id}</Link>, and it
        stays there: two survey figures that disagree are a disagreement, not a time series.
      </>
    );
  })();

  return (
    <section className="cu-view">
      <div className="cu-head">
        <span className="label">Coverage versus usage</span>
        <p>
          {pair.scheme}. Administrative systems record an output — a connection issued, a tap
          installed, a card created. Sustained use is a different measurement, and where both
          exist the second is lower. Neither figure is presented without the other (
          <Link href={`/provenance/${pair.governing}/`}>{pair.governing}</Link>
          {governing ? <>, {governing.title}</> : null}).
        </p>
      </div>

      {/* Two columns whenever a second reading renders at all, whether it is a series or
          the competing accounts held in a provenance record. */}
      <div className={usage || counterpart ? 'cu-pair' : 'cu-pair cu-pair-single'}>
        <Reading series={coverage} role="coverage" />
        {usage ? (
          <Reading series={usage} role="usage" />
        ) : counterpart ? (
          <div className="cu-side cu-side-usage">
            <span className="label">Independent reading</span>
            <h3>
              <Link href={`/provenance/${counterpart.id}/`}>{counterpart.title}</Link>
            </h3>
            <dl className="cu-accounts">
              {(counterpart.competingAccounts ?? []).map((a) => (
                <div key={a.holder}>
                  <dt>{a.holder}</dt>
                  <dd>{a.position}</dd>
                </div>
              ))}
            </dl>
            <p className="prose-note">
              Both accounts are recorded and neither is endorsed. The instrument does not pick
              between a government survey and an independent panel; it shows that they disagree
              and by how much.
            </p>
          </div>
        ) : null}
      </div>

      <p className="cu-gap">
        <span className="label">The gap</span> {gapStatement}
      </p>
    </section>
  );
}
