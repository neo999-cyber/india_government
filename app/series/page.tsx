import Link from 'next/link';
import type { Metadata } from 'next';
import { series } from '@/lib/data';
import { DOMAIN_LABELS, periodKey, periodLabel } from '@/lib/format';
import { CaveatRow, RecordMarks, StatusKey, TierTag } from '@/components/marks';
import { ListingFacets } from '@/components/ListingFacets';
import { SpanStrip } from '@/components/SpanStrip';
import { StripFilter } from '@/components/StripFilter';

/** See the same helper on the ledger index for why options come from the data, not the enum. */
function opts<T extends string>(values: T[], label: (v: T) => string) {
  return [...new Set(values)].sort().map((v) => ({ value: v, label: label(v) }));
}

export const metadata: Metadata = { title: 'Series' };

/**
 * THE PUBLICATION FRONTIER, DERIVED — the year most current annual series have reached.
 *
 * **NOT the maximum end year in the corpus.** The maximum is 2026 and five series reach it, because
 * 2026 has barely begun; measured against it, *ends before the latest year* returns 264 of 269 and
 * marks still-current series as stopped for lacking a figure that does not exist anywhere. The
 * frontier is **where the current plateau BEGINS**, and against it the answer is 93.
 *
 * THE FIRST CUT TOOK THE LATEST PLATEAU YEAR AND WAS WRONG BY 85 SERIES. End years run
 * …2022:21, 2023:31, **2024:85, 2025:86**, 2026:5 — a step, not a slope. Taking the latest year
 * above a fifth-of-a-percent threshold gave 2025, and *ends before 2025* then swept in the entire
 * 2024 cohort: **178 instead of 93**. Those 85 series are not stopped; they are annual series whose
 * 2025 figure is not out yet.
 *
 * So the frontier is the EARLIEST year holding at least half the busiest year's count — 43 of 86 —
 * which is 2024, the first year of the plateau. A series ending before it has stopped; one ending
 * in it has simply not been updated yet.
 *
 * Derived rather than hardcoded so it moves when the corpus does. **A later pass must not replace
 * this with `Math.max`, nor with the latest plateau year.** Both look like simplifications and both
 * turn a filter naming 93 publishers who stopped into one asserting that most of the corpus has.
 */
function publicationFrontier(ends: number[]): number {
  const byYear = new Map<number, number>();
  for (const e of ends) byYear.set(e, (byYear.get(e) ?? 0) + 1);
  const busiest = Math.max(...byYear.values());
  return Math.min(...[...byYear].filter(([, n]) => n >= busiest / 2).map(([y]) => y));
}

const yearOfPeriod = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

export default function SeriesIndex() {
  const spanRows = series
    .map((s) => {
      const pts = s.points.filter((p) => p.country === 'IND' && p.value !== null);
      if (!pts.length) return null;
      const ys = pts.map((p) => yearOfPeriod(p.period)).sort((a, b) => a - b);
      const start = ys[0];
      const end = ys[ys.length - 1];
      return {
        id: s.id,
        title: s.title,
        start,
        end,
        breaks: (s.breaks ?? []).map((b) => yearOfPeriod(b.period)).filter((b) => b >= start && b <= end),
        verified: pts.filter((p) => p.status === 'verified').length / pts.length,
        span: end - start + 1,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .sort((a, b) => a.start - b.start || a.end - b.end || a.id.localeCompare(b.id));

  const FRONTIER = publicationFrontier(spanRows.map((r) => r.end));
  const rows = spanRows.map((r) => ({
    ...r,
    stopped: r.end < FRONTIER,
    short: r.span <= 3,
  }));
  const X0 = Math.min(...rows.map((r) => r.start));
  const X1 = Math.max(...rows.map((r) => r.end));
  const wallCount = rows.filter((r) => r.start === 2014).length;
  const frontierN = rows.filter((r) => r.end === FRONTIER).length;
  const stripCounts = {
    '': rows.length,
    stopped: rows.filter((r) => r.stopped).length,
    basis: rows.filter((r) => r.breaks.length > 0).length,
    short: rows.filter((r) => r.short).length,
  };

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

      {/* ---- THE SPAN STRIP. 269 spans on one axis, sorted by first observation. -------------- */}
      <div className="sec-h">
        <h2>Every series as a span</h2>
        <p className="sec-note">
          Sorted by first observation. Left to right is time and shared; bar length is the span; the
          vertical order encodes nothing but the start year.
        </p>
      </div>
      <p>
        <strong>The wall at 2014 is the picture.</strong> {wallCount} of {rows.length}{' '}
        series begin there, because that is where this instrument&rsquo;s baseline is frozen — a fact about the
        record, not about India. Below it the spans fan out; above it a thin tail runs back to{' '}
        {rows[0]?.start}.
      </p>
      <p className="prose-note">
        <span className="label">What &ldquo;ends before {FRONTIER}&rdquo; means</span> {FRONTIER}{' '}
        is where the corpus&rsquo;s publication frontier begins: {frontierN} series carry a figure for it
        and a comparable number for {FRONTIER + 1}, and before it the counts fall away. A series
        ending earlier has stopped being published; one ending in {FRONTIER} is an annual series
        whose next figure is not out yet. Measured instead against the latest year any series
        reaches, the same filter would return {rows.length - 5} of {rows.length} and mean nothing.
      </p>
      <StripFilter counts={stripCounts} frontier={FRONTIER} />
      <SpanStrip rows={rows} x0={X0} x1={X1} frontier={FRONTIER} />
      <p className="prose-note">
        <span className="label">What the strip does not carry</span> Its bars draw spans, not
        declarations. Every one of these {rows.length} series is in the table below with its caveats
        and declared absences in full, exactly once — rendering them twice on one page is the
        duplicate-declaration defect, so the strip points at the table rather than repeating it.
      </p>

      <div className="sec-h">
        <h2>The table</h2>
        <p className="sec-note">
          The same {rows.length} series, with spans, bases, tiers and every declaration in full.
        </p>
      </div>

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
