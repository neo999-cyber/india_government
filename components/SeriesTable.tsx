import { Fragment } from 'react';
import Link from 'next/link';
import type { Country, Series } from '@/lib/types';
import { COUNTRY_LABELS, periodKey, periodLabel } from '@/lib/format';
import { Value } from './marks';

/**
 * Points as a table, with every break rendered as a visible seam.
 * Nothing is smoothed, interpolated or fitted across a seam (CLAUDE.md rule 2):
 * the seam is a hard stop in the table, and the two sides never share a row.
 */
export function SeriesTable({ series }: { series: Series }) {
  const countries = [...new Set(series.points.map((p) => p.country))];
  const isPanel = countries.length > 1;
  const periods = [...new Set(series.points.map((p) => p.period))].sort(
    (a, b) => periodKey(a) - periodKey(b),
  );
  const breaks = [...(series.breaks ?? [])].sort((a, b) => periodKey(a.period) - periodKey(b.period));
  const colSpan = isPanel ? countries.length + 1 : 3;

  /** Breaks that sit before the first observed period render above the table body. */
  const seamsBefore = (index: number) =>
    breaks.filter((b) => {
      const key = periodKey(b.period);
      const here = periodKey(periods[index]);
      const prev = index === 0 ? -Infinity : periodKey(periods[index - 1]);
      return index === 0 ? key < here : key >= prev && key < here;
    });

  const seamsAfterLast = breaks.filter(
    (b) => periods.length > 0 && periodKey(b.period) >= periodKey(periods[periods.length - 1]),
  );

  const seamRow = (b: { period: string; note: string; provenanceRef: string }) => (
    <tr className="seam" key={`seam-${b.period}-${b.provenanceRef}`}>
      <td colSpan={colSpan}>
        series break · {periodLabel(b.period, series.calendar)} · {b.note} ·{' '}
        <Link href={`/provenance/${b.provenanceRef}/`}>{b.provenanceRef}</Link> · do not splice
      </td>
    </tr>
  );

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
              {seamsBefore(i).map(seamRow)}
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
          {seamsAfterLast.map(seamRow)}
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
