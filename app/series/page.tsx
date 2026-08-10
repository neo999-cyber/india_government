import Link from 'next/link';
import type { Metadata } from 'next';
import { series } from '@/lib/data';
import { DOMAIN_LABELS, periodKey, periodLabel } from '@/lib/format';
import { CaveatRow, RecordMarks, StatusKey, TierTag } from '@/components/marks';
import { ListingFacets } from '@/components/ListingFacets';

/** See the same helper on the ledger index for why options come from the data, not the enum. */
function opts<T extends string>(values: T[], label: (v: T) => string) {
  return [...new Set(values)].sort().map((v) => ({ value: v, label: label(v) }));
}

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

      <ListingFacets
        target="series-table"
        noun="series"
        facets={[
          { key: 'domain', label: 'Area', options: opts(series.map((s) => s.domain), (d) => DOMAIN_LABELS[d]) },
          { key: 'tier', label: 'Tier', options: opts(series.map((s) => s.tier), (t) => t) },
          { key: 'calendar', label: 'Calendar', options: opts(series.map((s) => s.calendar), (c) => c) },
          { key: 'break', label: 'Breaks', options: [
            { value: 'yes', label: 'has a declared break' },
            { value: 'no', label: 'no break declared' },
          ] },
        ]}
      />

      <div className="table-wrap">
        <table id="series-table">
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
            {series.map((s) => {
              const periods = s.points.map((p) => p.period).sort((a, b) => periodKey(a) - periodKey(b));
              const span =
                periods.length === 0
                  ? '—'
                  : periods.length === 1
                    ? periodLabel(periods[0], s.calendar)
                    : `${periodLabel(periods[0], s.calendar)} – ${periodLabel(periods[periods.length - 1], s.calendar)}`;
              return (
                <tbody
                  key={s.id}
                  data-row
                  data-f-domain={s.domain}
                  data-f-tier={s.tier}
                  data-f-calendar={s.calendar}
                  data-f-break={s.breaks?.length ? 'yes' : 'no'}
                  data-text={`${s.id} ${s.title} ${s.unit}`}
                >
                  <tr>
                    <td>
                      <Link href={`/series/${s.id}/`}>{s.title}</Link>
                      <br />
                      <span className="t-note mono">{s.id}</span>
                      <RecordMarks record={s} deferCaveat />
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
                  <CaveatRow record={s} colSpan={9} />
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  );
}
