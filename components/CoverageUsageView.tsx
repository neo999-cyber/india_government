import Link from 'next/link';
import type { ProvenanceRecord, Series } from '@/lib/types';
import type { CoverageUsagePair } from '@/lib/rules';
import { periodLabel } from '@/lib/format';
import { SeriesTable } from './SeriesTable';
import { Absences, Value } from './marks';

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
 * not formatting.
 *
 * PMAY-G passes: sanctioned and completed are both "crore houses", counting the same objects
 * at two stages, so the wedge is a real quantity. The other four fail, and that is the finding
 * rather than a gap in the data — a connection is not a refill, a tap is not safe water, and
 * a card is not an admission. Subtracting those would manufacture a number no source supports,
 * which is the error P-22 exists to name, committed in the opposite direction.
 */
function comparable(coverage: Series, usage: Series): boolean {
  return coverage.unit.trim() === usage.unit.trim();
}

const DEFAULT_LABELS = { coverage: 'Administrative output', usage: 'Sustained use' };

const DEFAULT_FRAMING =
  'Administrative systems record an output — a connection issued, a tap installed, a card created. Sustained use is a different measurement, and where both exist the second is lower.';

const latest = (s: Series) => {
  const india = s.points.filter((p) => p.country === 'IND');
  return india[india.length - 1];
};

function Reading({ series, role, label }: { series: Series; role: 'coverage' | 'usage'; label: string }) {
  const point = latest(series);
  return (
    <div className={`cu-side cu-side-${role}`}>
      <span className="label">{label}</span>
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
  const labels = pair.labels ?? DEFAULT_LABELS;
  // Coverage-side declarations already render in the usage slot when they ARE the
  // counterpart, so pooling them again below would print the same absence twice.
  const absences = [
    ...(pair.usageUnmeasured ? [] : (coverage.unmeasured ?? [])),
    ...(usage?.unmeasured ?? []),
  ];

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
    if (pair.usageUnmeasured) {
      return (
        <>
          There is no second figure to place beside this one, and that is the finding rather
          than a hole in the dataset. The counterpart is not late or unpulled — nothing measures
          it, so the coverage figure cannot be qualified by anything and must not be read as
          though it had been. It stands as an upper bound on an outcome no one has established
          (<Link href={`/provenance/${pair.governing}/`}>{pair.governing}</Link>).
        </>
      );
    }
    if (usage) {
      return (
        <>
          These two do not subtract. {labels.coverage} is measured in{' '}
          <strong>{coverage.unit}</strong> and {labels.usage.toLowerCase()} in{' '}
          <strong>{usage.unit}</strong>
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
          {pair.scheme}. {pair.framing ?? DEFAULT_FRAMING} Neither figure is presented without
          the other (
          <Link href={`/provenance/${pair.governing}/`}>{pair.governing}</Link>
          {governing ? <>, {governing.title}</> : null}).
        </p>
      </div>

      {/* Two columns whenever anything renders in the second position — a usage series, the
          competing accounts held in a provenance record, or the declared absence standing in
          for a counterpart that does not exist. The absence occupies the slot precisely so
          the reader sees a counterpart was expected there. */}
      <div
        className={
          usage || counterpart || pair.usageUnmeasured ? 'cu-pair' : 'cu-pair cu-pair-single'
        }
      >
        <Reading series={coverage} role="coverage" label={labels.coverage} />
        {usage ? (
          <Reading series={usage} role="usage" label={labels.usage} />
        ) : pair.usageUnmeasured ? (
          <div className="cu-side cu-side-usage">
            <span className="label">{labels.usage} — no measurement exists</span>
            <Absences
              items={coverage.unmeasured}
              heading="The counterpart that would go here"
            />
          </div>
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

      {/* Absences declared by either side, pooled into one block below the pair rather than
          squeezed into a column (CLAUDE.md rule 4a). They are facts about the chain the pair
          describes — sanctioned beside completed reads as the whole chain unless what comes
          after completion is on the page — so they belong at the pair's own width. */}
      <Absences items={absences} heading="Not measured in this chain" />

      <p className="cu-gap">
        <span className="label">The gap</span> {gapStatement}
      </p>
    </section>
  );
}
