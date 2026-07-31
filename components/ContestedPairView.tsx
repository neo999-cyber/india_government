import Link from 'next/link';
import type { ProvenanceRecord, Series } from '@/lib/types';
import type { ContestedPair } from '@/lib/rules';
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

function Instrument({ series }: { series: Series }) {
  const point = latest(series);
  return (
    <div className="cp-side">
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
      <Absences items={series.unmeasured} />
    </div>
  );
}

export function ContestedPairView({
  pair,
  instruments,
  governing,
}: {
  pair: ContestedPair;
  /** Both series, in the pair's declared order — which is not precedence. */
  instruments: Series[];
  governing?: ProvenanceRecord;
}) {
  if (instruments.length < 2) return null;

  return (
    <section className="cp-view">
      <div className="cp-head">
        <span className="label">Contested measurement</span>
        <p>
          {pair.subject}. {pair.framing} Both instruments are carried in full and neither is
          presented as the answer (
          <Link href={`/provenance/${pair.governing}/`}>{pair.governing}</Link>
          {governing ? <>, {governing.title}</> : null}). They are shown in a fixed order for
          layout; the order is not precedence.
        </p>
      </div>

      <div className="cp-pair">
        {instruments.map((s) => (
          <Instrument key={s.id} series={s} />
        ))}
      </div>

      <p className="cp-note">
        <span className="label">What can be said</span>
        {governing?.bridgeNote ? (
          governing.bridgeNote
        ) : (
          <>
            No reconciliation exists between these two instruments and none should be
            manufactured.
          </>
        )}{' '}
        No difference is computed between them: two figures that disagree about the sign of the
        change do not have a gap, they have a disagreement, and subtracting them would produce
        a number describing neither survey.
      </p>
    </section>
  );
}
