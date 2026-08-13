import Link from 'next/link';
import type { Metadata } from 'next';
import { series } from '@/lib/data';
import { DOMAIN_LABELS, periodKey, periodLabel } from '@/lib/format';
import { CaveatRow, OutcomeRow, RecordMarks, StatusKey, TierTag } from '@/components/marks';
import { SERIES_FINDINGS } from '@/lib/series-copy';
import { ListingFacets } from '@/components/ListingFacets';
import { SpanStrip } from '@/components/SpanStrip';
import { spanRows, spanAxis, spanFrontier } from '@/lib/spans';
import { StripFilter } from '@/components/StripFilter';
import { routeLabel } from '@/lib/routes';

/** See the same helper on the ledger index for why options come from the data, not the enum. */
function opts<T extends string>(values: T[], label: (v: T) => string) {
  return [...new Set(values)].sort().map((v) => ({ value: v, label: label(v) }));
}

// The tab title is the registry's public name, not a fourth copy of it. Was: 'Series'.
export const metadata: Metadata = { title: routeLabel('/series/') };

// The span derivation, the frontier and the axis now live in `lib/spans.ts`, shared with the
// year pages. One definition of what a span IS; see that file's header for why.

const yearOfPeriod = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

export default function SeriesIndex() {
  const rows = spanRows();
  const FRONTIER = spanFrontier(rows);
  const { x0: X0, x1: X1 } = spanAxis(rows);
  const earlierThanAxis = rows.filter((r) => r.start < X0).length;
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
        /* PREFETCH OFF ON THIS PAGE'S DENSE LISTS.
           Next prefetches every in-viewport route by default. A lab run measured a topic page issuing 71
           requests and pulling ~359 KB of route payloads a reader had not asked for, and these are the
           pages that carry 494 to 1,286 links each. A catalogue row is a LOW-PROBABILITY destination —
           a reader follows one of them, not forty — so the prefetch is spent almost entirely on routes
           nobody opens, on the pages least able to afford it. Navigation is unchanged; only the
           speculative fetch is. */
        <Link prefetch={false} href="/">instrument</Link> / indicator series
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
      <p className="prose-note">
        <span className="label">Why the axis begins in {X0}</span> Anchored to the earliest
        observation the axis started in {rows[0]?.start}, and that one series took half the width
        while the median series begins in 2014 — 265 spans crushed into the right-hand third. It
        begins instead at the second-percentile start year, computed from the data.{' '}
        <strong>
          The {earlierThanAxis} series that begin earlier are not cut short:
        </strong>{' '}
        each runs to the left edge with a continuation mark and its own start year beside it.
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
        initialTotal={series.length}
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

      <div className="table-wrap" tabIndex={0}>
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
                      <Link prefetch={false} href={`/series/${s.id}/`}>{s.title}</Link>
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
                  {/* The two tracks. This catalogue shipped the evidence track alone. */}
                  <OutcomeRow finding={SERIES_FINDINGS[s.id]?.finding} colSpan={9} />
                  <CaveatRow record={s} colSpan={9} />
                </tbody>
              );
            })}
        </table>
      </div>
    </>
  );
}
