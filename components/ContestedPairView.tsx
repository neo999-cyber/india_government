import Link from 'next/link';
import type { Pair, Series } from '@/lib/types';
import { periodLabel } from '@/lib/format';
import { SeriesTable } from './SeriesTable';
import { Absences, CaveatFlag, SourceLine, TierTag, Value } from './marks';

/**
 * Two instruments that disagree, rendered together with neither endorsed.
 *
 * The nearest existing thing is RegimeOverlap, which shows every GDP base and picks none.
 * The difference is that the GDP regimes are all official and merely incompatible, while
 * here one survey is official and one is private, they disagree about the direction of
 * change, and no reconciliation exists or should be manufactured (P-41).
 *
 * Deliberately symmetric. No column is the headline and no column is the correction, so
 * there is no gap statement and nothing subtracts — a difference between two numbers that
 * disagree about their own sign is not a wedge, it is the absence of a finding. What the
 * view states instead is what each instrument can support, which is the only thing the
 * record licenses.
 */

const latest = (s: Series) => {
  const india = s.points.filter((p) => p.country === 'IND');
  return india[india.length - 1];
};

function Instrument({
  series,
  label,
  alreadyPooled,
}: {
  series: Series;
  label: string;
  /* Declarations an earlier pair on the same page already rendered — see `pooledByPair`. */
  alreadyPooled?: ReadonlySet<unknown>;
}) {
  const point = latest(series);
  return (
    <div className="cp-side">
      <span className="label">{label}</span>
      <h3>
        <Link href={`/series/${series.id}/`}>{series.title}</Link>
      </h3>
      <p className="tag-row">
        <TierTag tier={series.tier} />
        <span className="tag">{series.unit}</span>
      </p>
      {point ? (
        <p className="cu-headline">
          <Value point={point} />{' '}
          <span className="cu-unit">
            {series.unit} · {periodLabel(point.period, series.calendar)}
          </span>
        </p>
      ) : null}
      <SourceLine source={series.source} tier={series.tier} />
      {series.caveat ? <CaveatFlag caveat={series.caveat} /> : null}
      <SeriesTable series={series} />
      {series.notes ? <p className="prose-note">{series.notes}</p> : null}
      {/* A series that is a side of TWO pairs has its declarations rendered by both views —
          this one in the instrument column, the coverage/usage one pooled at pair width — and
          a reader meets the same absence twice on one page. Three did on `jk-detenus-psi`.
          Identity comparison on the entry objects off the loaded record. */}
      <Absences items={(series.unmeasured ?? []).filter((u) => !alreadyPooled?.has(u))} />
    </div>
  );
}

export function ContestedPairView({
  pair,
  instruments,
  labels,
  reconciliation,
  alreadyPooled,
}: {
  pair: Pair;
  /** Both series, in the pair's declared order — which is not precedence. */
  instruments: Series[];
  /** Hand-written per side in data/pairs.json, never derived from the titles. */
  labels: [string, string];
  /** The governing record's bridgeNote, where one exists. */
  reconciliation?: string;
  /** Absence entries an earlier pair on the same page already rendered. See `pooledByPair`. */
  alreadyPooled?: ReadonlySet<unknown>;
}) {
  if (instruments.length < 2) return null;

  return (
    <section className="cp-view">
      <div className="cp-head">
        <span className="label">Contested measurement</span>
        <p>
          {pair.framing} Both instruments are carried in full and neither is presented as the
          answer
          {(pair.provenanceRefs ?? []).length > 0 ? (
            <>
              {' ('}
              {(pair.provenanceRefs ?? []).map((ref, i) => (
                <span key={ref}>
                  {i > 0 ? ', ' : ''}
                  <Link href={`/provenance/${ref}/`}>{ref}</Link>
                </span>
              ))}
              {')'}
            </>
          ) : null}
          . They are shown in a fixed order for layout; the order is not precedence.
        </p>
      </div>

      <div className="cp-pair">
        {instruments.map((s, i) => (
          <Instrument key={s.id} series={s} label={labels[i] ?? ''} alreadyPooled={alreadyPooled} />
        ))}
      </div>

      <p className="cp-note">
        <span className="label">What can be said</span>
        {reconciliation ?? 'No reconciliation exists between these two instruments and none should be manufactured.'}{' '}
        {pair.gapReason}
      </p>

      {/* `notes` — rendered here since 2026-08-08, and it rendered NOWHERE before.
          `CoverageUsageView` has always carried it and this view never did, so every contested
          pair's notes were invisible however well the pair itself rendered. Seventeen pairs'
          notes reached no reader, and only six of those were pairs that render nowhere at all —
          the other eleven rendered perfectly, minus this field. It is the shape the field-render
          audit exists for: a field nominally fine, suppressed by one view of two, with the data
          correct and every other gate green. Found by extending that audit to the pairs layer. */}
      {pair.notes ? <p className="source-line">{pair.notes}</p> : null}
    </section>
  );
}
