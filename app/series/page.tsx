import Link from 'next/link';
import type { Metadata } from 'next';
import { series } from '@/lib/data';
import { DOMAIN_LABELS, periodKey, periodLabel } from '@/lib/format';
import { RecordMarks, StatusKey, TierTag } from '@/components/marks';

export const metadata: Metadata = { title: 'Series' };

export default function SeriesIndex() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / series
      </p>
      <h1>Indicator series</h1>
      <p className="lede">
        {series.length} series. Every series names its calendar and never mixes calendars
        internally; every break is carried as a seam rather than smoothed away.
      </p>
      <StatusKey />

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Series</th>
              <th>Domain</th>
              <th>Unit</th>
              <th>Cal.</th>
              <th>Tier</th>
              <th className="num">Points</th>
              <th>Span</th>
              <th>Breaks</th>
            </tr>
          </thead>
          <tbody>
            {series.map((s) => {
              const periods = s.points.map((p) => p.period).sort((a, b) => periodKey(a) - periodKey(b));
              const span =
                periods.length === 0
                  ? '—'
                  : periods.length === 1
                    ? periodLabel(periods[0], s.calendar)
                    : `${periodLabel(periods[0], s.calendar)} – ${periodLabel(periods[periods.length - 1], s.calendar)}`;
              return (
                <tr key={s.id}>
                  <td>
                    <Link href={`/series/${s.id}/`}>{s.title}</Link>
                    <br />
                    <span className="t-note mono">{s.id}</span>
                    <RecordMarks record={s} />
                  </td>
                  <td className="t-note">{DOMAIN_LABELS[s.domain]}</td>
                  <td className="t-note">{s.unit}</td>
                  <td className="mono">{s.calendar}</td>
                  <td>
                    <TierTag tier={s.tier} />
                  </td>
                  <td className="num">{s.points.length}</td>
                  <td className="mono t-note">{span}</td>
                  <td className="mono">
                    {s.breaks?.length ? (
                      <span style={{ color: 'var(--alert)' }}>{s.breaks.length}</span>
                    ) : (
                      <span className="t-note">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
