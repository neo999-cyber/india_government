import { Fragment } from 'react';
import Link from 'next/link';
import type { Country, Series, SeriesBreak } from '@/lib/types';
import { COUNTRY_LABELS, periodKey, periodLabel } from '@/lib/format';
import { denominatorBreaksFor, type DenominatorBreak } from '@/lib/rules';
import { Value } from './marks';

type Marker =
  | { kind: 'break'; placement: 'origin' | 'mid' | 'terminus'; brk: SeriesBreak }
  | { kind: 'denominator'; denom: DenominatorBreak };

/**
 * Points as a table, with every break rendered as a visible seam.
 * Nothing is smoothed, interpolated or fitted across a seam (CLAUDE.md rule 2):
 * the seam is a hard stop in the table, and the two sides never share a row.
 *
 * Two kinds of mark, deliberately different:
 *
 *   seam        the series itself changes basis at this period. Where one regime ends and
 *               the next begins, the seam says so on both sides — the older series carries
 *               a terminus, the newer an origin — so a handoff reads as a handoff rather
 *               than as two unrelated tables.
 *   denominator the series is unchanged; what moved is what it is divided by. Every
 *               ratio-to-GDP steps at the 2022-23 rebasing with no change in underlying
 *               activity, and that must never be read as a series break.
 */
export function SeriesTable({
  series,
  handoff,
}: {
  series: Series;
  /** Titles of the regimes either side, when this series is one of several bases. */
  handoff?: { previous?: { id: string; title: string }; next?: { id: string; title: string } };
}) {
  const countries = [...new Set(series.points.map((p) => p.country))];
  const isPanel = countries.length > 1;
  const periods = [...new Set(series.points.map((p) => p.period))].sort(
    (a, b) => periodKey(a) - periodKey(b),
  );
  const colSpan = isPanel ? countries.length + 1 : 3;

  const first = periods.length ? periodKey(periods[0]) : Infinity;
  const last = periods.length ? periodKey(periods[periods.length - 1]) : -Infinity;

  /**
   * Where a break sits relative to this series' own span decides what it means, and the
   * same period means opposite things on either side of a handoff: FY2013-14 is the last
   * year of the 2004-05 base and the first of the 2011-12 base.
   */
  const markers: Marker[] = [
    ...[...(series.breaks ?? [])]
      .sort((a, b) => periodKey(a.period) - periodKey(b.period))
      .map((brk): Marker => {
        const key = periodKey(brk.period);
        const placement = key >= last ? 'terminus' : key <= first ? 'origin' : 'mid';
        return { kind: 'break', placement, brk };
      }),
    ...denominatorBreaksFor(series).map((denom): Marker => ({ kind: 'denominator', denom })),
  ];

  const markerPeriodKey = (m: Marker) =>
    m.kind === 'break' ? periodKey(m.brk.period) : periodKey(m.denom.period);

  /**
   * Marks that render above the row for `periods[index]`.
   *
   * A mark takes effect above the first row at or after it, rather than only above a row
   * whose period matches it exactly. The distinction matters whenever a series is sparse:
   * the write-off-adjusted NPA view is defined at three sourced periods (FY2013-14,
   * FY2017-18, FY2024-25) and spans both the AQR and COVID recognition breaks without
   * carrying a row for either. Matching exactly would drop those seams entirely and print
   * three figures that read as a trajectory across two breaks the instrument exists to
   * mark — rule 2, in the one view most likely to be read as a verdict on the cleanup.
   */
  const marksBefore = (index: number) =>
    markers.filter((m) => {
      if (m.kind === 'break' && m.placement === 'terminus') return false;
      const key = markerPeriodKey(m);
      if (key > last) return false;
      return index === 0 ? key <= first : key > periodKey(periods[index - 1]) && key <= periodKey(periods[index]);
    });

  /** Terminal marks: the series stops here, or the mark post-dates every observation. */
  const marksAfterLast = markers.filter((m) =>
    m.kind === 'break' ? m.placement === 'terminus' : markerPeriodKey(m) > last,
  );

  const seamRow = (m: Extract<Marker, { kind: 'break' }>) => {
    const { brk, placement } = m;
    const lead =
      placement === 'origin'
        ? 'series begins at break'
        : placement === 'terminus'
          ? 'series ends at break'
          : 'series break';
    const handoffNote =
      placement === 'origin' && handoff?.previous ? (
        <>
          {' '}
          · supersedes{' '}
          <Link href={`/series/${handoff.previous.id}/`}>{handoff.previous.title}</Link>
        </>
      ) : placement === 'terminus' && handoff?.next ? (
        <>
          {' '}
          · continues in <Link href={`/series/${handoff.next.id}/`}>{handoff.next.title}</Link>
        </>
      ) : null;

    return (
      <tr className="seam" key={`seam-${brk.period}-${brk.provenanceRef}-${placement}`}>
        <td colSpan={colSpan}>
          {lead} · {periodLabel(brk.period, series.calendar)} · {brk.note} ·{' '}
          <Link href={`/provenance/${brk.provenanceRef}/`}>{brk.provenanceRef}</Link> · do not
          splice
          {handoffNote}
        </td>
      </tr>
    );
  };

  const denominatorRow = (m: Extract<Marker, { kind: 'denominator' }>) => (
    <tr className="denominator-break" key={`denom-${m.denom.provenance}`}>
      <td colSpan={colSpan}>
        denominator break · {m.denom.date} ({periodLabel(m.denom.period, series.calendar)}) ·{' '}
        {m.denom.label} ·{' '}
        <Link href={`/provenance/${m.denom.provenance}/`}>{m.denom.provenance}</Link>
        <span className="denominator-gloss">
          The ratio steps here because what it is divided by was restated, not because
          activity changed. Values either side rest on different denominators and no
          reconciliation is published.
        </span>
      </td>
    </tr>
  );

  const renderMark = (m: Marker) =>
    m.kind === 'break' ? seamRow(m) : denominatorRow(m);

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>{series.calendar === 'FY' ? 'Fiscal year' : 'Year'}</th>
            {isPanel ? (
              countries.map((c) => (
                <th key={c} className="num">
                  {COUNTRY_LABELS[c as Country]}
                </th>
              ))
            ) : (
              <>
                <th className="num">{series.unit}</th>
                <th>Note</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {periods.map((period, i) => (
            <Fragment key={period}>
              {marksBefore(i).map(renderMark)}
              <tr>
                <td className="mono">{periodLabel(period, series.calendar)}</td>
                {isPanel ? (
                  countries.map((c) => {
                    const point = series.points.find((p) => p.country === c && p.period === period);
                    return (
                      <td key={c} className="num">
                        {point ? <Value point={point} /> : <span className="t-note">—</span>}
                      </td>
                    );
                  })
                ) : (
                  (() => {
                    const point = series.points.find((p) => p.period === period);
                    return (
                      <>
                        <td className="num">
                          {point ? <Value point={point} /> : <span className="t-note">—</span>}
                        </td>
                        <td className="t-note">{point?.note ?? ''}</td>
                      </>
                    );
                  })()
                )}
              </tr>
            </Fragment>
          ))}
          {marksAfterLast.map(renderMark)}
        </tbody>
      </table>
      {isPanel ? (
        <p className="source-line">
          Blank cells are unreported, not zero. Peer values carry one shared vintage (P-09).
        </p>
      ) : (
        <p className="source-line">Blank cells are unreported, not zero.</p>
      )}
    </div>
  );
}
