import { RecordMarks } from '@/components/marks';
import Link from 'next/link';
import type { Series } from '@/lib/types';
import { periodLabel } from '@/lib/format';

/**
 * PHASE 18 §4a — THE BROKEN LINE. The signature visual, and the one chart type this instrument
 * needs that no chart library ships.
 *
 * WHAT MAKES IT DIFFERENT FROM EVERY OTHER LINE CHART. Three things, and each is a corpus rule
 * rather than a style choice:
 *
 *  1. **A GAP IS DRAWN AS A GAP.** Where a period has no observation the line STOPS and restarts.
 *     No interpolation, no bridging, no "connect nulls". Rule 4: blanks are unreported, not zero
 *     — and the study behind §2b is blunt about the cost of the alternative: readers do not notice
 *     missing data when a default value stands in for it.
 *  2. **A SEAM IS A STOP, AND ITS REASON IS PRINTED.** Rule 2 forbids splicing across a declared
 *     break, so the path is cut there and the two sides never join. The `note` is rendered as text
 *     below the chart, **not in a tooltip** — a tooltip is unreachable on a phone, unprintable,
 *     unshareable, and invisible to a screen reader.
 *  3. **STATUS SHOWS ON THE POINT.** `approx` is hollow, `pending` renders no dot at all. Rule 3.
 *
 * WHY CATEGORICAL SPACING AND NOT A TIME AXIS. These are annual observations on fiscal or calendar
 * years, and a period is a label rather than an instant. Equal spacing states "one observation per
 * period" and encodes nothing else. A true time axis would imply a precision — a value located at a
 * moment — that an annual aggregate does not have.
 *
 * NOTHING HERE IS HOVER-ONLY. Every figure a reader needs is in the SVG or in the text beneath it,
 * because the acceptance constraint is a phone (§1) and hover does not exist there.
 */

const W = 720;
const H = 240;
const PAD = { top: 18, right: 16, bottom: 30, left: 44 };

/** Sortable year from `FY2013-14` or `2013`. The first four digits are the opening year either way. */
const yearOf = (period: string) => Number(String(period).replace(/^FY/, '').slice(0, 4));

export function SeriesChart({
  series,
  takeaway,
  highlightLast = true,
  events,
  marksHostedByPage = false,
  headingLevel = 3,
  showTitle = true,
}: {
  series: Series;
  /**
   * THE OUTLINE POSITION OF THE CHART'S TITLE, BECAUSE IT WAS HARDCODED TO `h3` AND THAT WAS WRONG
   * ON EVERY SURFACE THAT LEADS WITH ONE.
   *
   * An external audit found heading-level skips on **340 of 753 built pages**. The largest cause was
   * here: a series page renders `h1` then this chart, so every one of the **269 series pages** went
   * h1 -> h3. The domain lead did the same, and the four-up grid below it went h2 -> h4.
   *
   * The rule the corpus wants is the plain one — **heading levels express hierarchy, not size** —
   * and the CSS class carries the appearance, so moving the level changes the outline and nothing
   * visual. The default stays 3 for the callers that are genuinely three deep.
   */
  headingLevel?: 2 | 3 | 4;
  /** The record page already has the exact series title as its h1; embedded charts keep it. */
  showTitle?: boolean;
  /** One plain sentence stating what the chart shows. Authored per use, never derived. */
  takeaway?: string;
  highlightLast?: boolean;
  /**
   * MOMENTS THIS AREA'S OWN RECORDS RETURN TO — brass ticks with a label, on the domain lead only.
   *
   * Each is a year in which a record filed under this area was announced, taken from `date` and
   * nothing else. **It is not an explanation of the chart's shape and the caption says so**: a mark
   * at 2016 beside a fall in the line asserts nothing about the fall, and a reader will make the
   * connection unless told not to. Rendered dashed and in the mark colour, which means one thing —
   * a mark was made — and never solid, which is the seam.
   */
  events?: { year: number; label: string }[];
  /**
   * SET ONLY WHERE THE HOST PAGE RENDERS THE SAME RECORD'S MARKS ITSELF — which today is the
   * series' own page and nowhere else.
   *
   * **Added 2026-08-11 after this chart landed on `/series/<id>/` and put the caveat on 130 pages
   * twice**: once here and once in the page's own qualification section. Rule 3a says a caveat
   * renders wherever the record appears, in full; it does not say twice on one page, and the
   * duplicate pushed the reading order backwards — the inline copy arrived before the key figures,
   * ahead of the layer it belongs to.
   *
   * **NO GATE SAW IT.** `listing-marks` binds *each declaration at most once per page* to listing
   * ROWS, and on a record's own page neither copy is a row; `field-render-audit` asks whether the
   * field reaches the page, and it reached it twice. Same guard-scope shape as the embed defect
   * this component was built to fix, arriving from the opposite direction — that fix made the chart
   * carry marks everywhere, and this is the one surface where carrying them is a duplicate.
   *
   * **The default is false, so every embedded use keeps its marks.** A host that suppresses them
   * must render them itself; this flag is a statement about the page, not a way to drop a caveat.
   */
  marksHostedByPage?: boolean;
}) {
  const pts = series.points
    .filter((p) => p.country === 'IND')
    .slice()
    .sort((a, b) => yearOf(a.period) - yearOf(b.period));

  if (pts.length === 0) return null;

  const values = pts.map((p) => p.value).filter((v): v is number => v !== null);
  if (values.length === 0) return null;

  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  // A little headroom so the extremes are not welded to the frame.
  const yMin = lo - span * 0.15;
  const yMax = hi + span * 0.15;

  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + (pts.length === 1 ? plotW / 2 : (i / (pts.length - 1)) * plotW);
  const y = (v: number) => PAD.top + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  const breakPeriods = new Set((series.breaks ?? []).map((b) => b.period));

  // An event lands on the point whose period starts in that year. Where the series has no such
  // point the event is DROPPED rather than interpolated onto the nearest — a tick at a year the
  // series does not observe would place a record on an axis position the data does not occupy.
  const yearAt = (period: string) => Number(String(period).replace(/^FY/, '').slice(0, 4));
  const eventMarks = (events ?? [])
    .map((e) => ({ ...e, i: pts.findIndex((p) => yearAt(p.period) === e.year) }))
    .filter((e) => e.i >= 0);

  /**
   * LABEL PLACEMENT — two lanes and a right-edge flip, because every label used to sit on one line
   * at one height and two events close together simply overlapped.
   *
   * **Measured before it was fixed: three overlapping pairs across eight pages**, worst 60px, on the
   * topic lead charts where two commitment years fall near each other. It looked like a rendering
   * bug because it was one.
   *
   * **THE WIDTH IS ESTIMATED, NOT MEASURED, AND IT HAS TO BE.** This is server-rendered SVG — there
   * is no layout to ask. The label is `.chart-event-label`: IBM Plex Mono at 9px with 0.08em
   * tracking, so every glyph advances the same 0.6em + tracking. `CH` below is that advance, and
   * the estimate is checked against the built output rather than trusted.
   *
   * **NOTHING IS DROPPED.** Where more than two labels collide the third reuses the nearer lane and
   * may still touch — a label removed is a commitment year the reader never learns about, and that
   * is worse than a tight fit. The lanes reduce collisions; they do not promise none.
   */
  const CH = 9 * 0.6 + 9 * 0.08; // advance per character: mono at 9px, plus letter-spacing
  const GAP = 8;
  /**
   * LANE SPACING IS 13 BECAUSE THE LABEL BOX IS 12, and the first attempt used 11 — one pixel less
   * than the box. Two labels in DIFFERENT lanes still overlapped by 1px, so the fix reported four
   * collisions where there had been three and I had to measure the rendered boxes to see it:
   * lane 0 occupied screen y 13-25 and lane 1 occupied 24-36. **A lane that does not clear the
   * glyph box is not a lane.**
   *
   * THREE lanes, not two: `/domains/banking/` has commitment years in 2014, 2015 and 2016, and with
   * two lanes the third wraps back onto the first at almost exactly its right edge.
   */
  const LANES = 3;
  const LANE_H = 13;
  const laneEnd: number[] = [];
  const placedEvents = eventMarks.map((e) => {
    const w = e.label.length * CH;
    // Past the right edge, the label reads back from the tick instead of running off the chart.
    const flip = x(e.i) + 5 + w > W - PAD.right;
    const left = flip ? x(e.i) - 5 - w : x(e.i) + 5;
    let lane = [...Array(LANES).keys()].find(
      (l) => laneEnd[l] === undefined || left >= laneEnd[l] + GAP,
    );
    // All lanes busy: reuse the one that frees up soonest rather than drop the label. A commitment
    // year the reader never learns about is worse than a tight fit.
    if (lane === undefined)
      lane = [...Array(LANES).keys()].reduce((a, b) => (laneEnd[a] <= laneEnd[b] ? a : b));
    laneEnd[lane] = left + w;
    return { ...e, lane, flip };
  });

  /**
   * Segments. A new one starts whenever the line may not continue: a missing value, a
   * non-consecutive year, or a declared break at this period. The break case is rule 2 — the
   * seam is where a reader must NOT read straight through.
   */
  const segments: { i: number; v: number }[][] = [];
  let current: { i: number; v: number }[] = [];
  pts.forEach((p, i) => {
    const prev = pts[i - 1];
    const cut =
      p.value === null ||
      (prev && yearOf(p.period) - yearOf(prev.period) > 1) ||
      breakPeriods.has(p.period);
    if (cut && current.length) {
      segments.push(current);
      current = [];
    }
    if (p.value !== null) current.push({ i, v: p.value });
  });
  if (current.length) segments.push(current);

  const path = (seg: { i: number; v: number }[]) =>
    seg.map((s, k) => `${k === 0 ? 'M' : 'L'} ${x(s.i).toFixed(1)} ${y(s.v).toFixed(1)}`).join(' ');

  const minYear = yearOf(pts[0].period);
  const maxYear = yearOf(pts[pts.length - 1].period);

  const xForYear = (yr: number) => {
    if (yr <= minYear) return PAD.left;
    if (yr >= maxYear) return W - PAD.right;
    for (let i = 0; i < pts.length - 1; i++) {
      const y1 = yearOf(pts[i].period);
      const y2 = yearOf(pts[i + 1].period);
      if (yr >= y1 && yr <= y2) {
        const frac = (yr - y1) / (y2 - y1 || 1);
        return x(i) + frac * (x(i + 1) - x(i));
      }
    }
    return PAD.left;
  };

  const termBands = [
    { name: 'Term 1 (2014-19)', start: 2014, end: 2019, fill: 'var(--band-term-1)' },
    { name: 'Term 2 (2019-24)', start: 2019, end: 2024, fill: 'var(--band-term-2)' },
    { name: 'Term 3 (2024-)', start: 2024, end: 2026, fill: 'var(--band-term-3)' },
  ]
    .filter((t) => maxYear >= t.start && minYear <= t.end)
    .map((t) => {
      const startX = Math.max(PAD.left, xForYear(t.start));
      const endX = Math.min(W - PAD.right, xForYear(t.end));
      return { ...t, startX, endX, width: Math.max(0, endX - startX) };
    })
    .filter((t) => t.width > 8);

  const last = pts[pts.length - 1];
  const first = pts[0];
  const ticks = [yMin + (yMax - yMin) * 0.5, yMax - (yMax - yMin) * 0.08];

  // Appearance is `chart-title`, so this only moves the outline.
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';

  return (
    <figure className="chart">
      {showTitle || takeaway || !marksHostedByPage ? <figcaption className="chart-head">
        {showTitle ? <Heading className="chart-title">
          <Link href={`/series/${series.id}/`}>{series.title}</Link>
        </Heading> : null}
        {takeaway ? <p className="chart-takeaway">{takeaway}</p> : null}
        {marksHostedByPage ? null : <RecordMarks record={series} />}
      </figcaption> : null}

      <div className="chart-frame">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="chart-svg"
          role="img"
          aria-label={`${series.title}. ${series.unit}. ${periodLabel(first.period, series.calendar)} to ${periodLabel(last.period, series.calendar)}.`}
        >
          {/* Government term shading background bands */}
          {termBands.map((t) => (
            <g key={t.name}>
              <rect
                x={t.startX}
                y={PAD.top}
                width={t.width}
                height={plotH}
                fill={t.fill}
                className="chart-term-band"
              />
              {t.width > 45 ? (
                <text x={t.startX + 6} y={PAD.top + 11} className="chart-term-label">
                  {t.name}
                </text>
              ) : null}
            </g>
          ))}

          {ticks.map((t, k) => (
            <g key={k}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="chart-grid" />
              <text x={PAD.left - 8} y={y(t) + 4} className="chart-axis" textAnchor="end">
                {t.toFixed(t > 100 ? 0 : 1)}
              </text>
            </g>
          ))}

          {/* THE SEAM. A solid red stop, drawn before the line so the line reads on top of it —
              and never a bridge across it. */}
          {placedEvents.map((e) => (
            <g key={`ev-${e.year}`}>
              <line className="chart-event" x1={x(e.i)} x2={x(e.i)} y1={PAD.top - 6} y2={H - PAD.bottom} />
              <text
                className="chart-event-label"
                x={e.flip ? x(e.i) - 5 : x(e.i) + 5}
                y={PAD.top + 4 + e.lane * LANE_H}
                textAnchor={e.flip ? 'end' : undefined}
              >
                {e.label}
              </text>
            </g>
          ))}
          {(series.breaks ?? []).map((b) => {
            const i = pts.findIndex((p) => p.period === b.period);
            if (i < 0) return null;
            return (
              <line
                key={b.period}
                x1={x(i)}
                x2={x(i)}
                y1={PAD.top - 6}
                y2={PAD.top + plotH}
                className="chart-seam"
              />
            );
          })}

          {segments.map((seg, k) => (
            <path key={k} d={path(seg)} className="chart-line" />
          ))}

          {pts.map((p, i) =>
            p.value === null ? null : (
              <circle
                key={p.period}
                cx={x(i)}
                cy={y(p.value)}
                r={highlightLast && i === pts.length - 1 ? 5 : 3.5}
                className={`chart-dot chart-dot-${p.status}`}
                tabIndex={0}
                role="img"
                aria-label={`${periodLabel(p.period, series.calendar)}: ${p.value} ${series.unit}, ${p.status}`}
              >
                <title>{`${periodLabel(p.period, series.calendar)}: ${p.value} ${series.unit} (${p.status})`}</title>
              </circle>
            ),
          )}

          <text x={PAD.left} y={H - 8} className="chart-axis">
            {periodLabel(first.period, series.calendar)}
          </text>
          <text x={W - PAD.right} y={H - 8} className="chart-axis" textAnchor="end">
            {periodLabel(last.period, series.calendar)}
          </text>
        </svg>
      </div>

      {/* THE READING, IN TEXT. Everything above is also stated here, because the SVG is not where a
          screen reader, a printer or a forwarded screenshot finds meaning. */}
      <p className="chart-read">
        <span className="chart-latest">
          {last.value === null ? '—' : last.value}
          <span className="chart-unit"> {series.unit}</span>
        </span>{' '}
        <span className="t-note">
          at {periodLabel(last.period, series.calendar)} · {pts.length} observations from{' '}
          {periodLabel(first.period, series.calendar)}
        </span>
      </p>

      {/* §4a: the reason is PRINTED, not hidden. A seam a reader cannot read the reason for is a
          red line that looks like a rendering artefact. */}
      {(series.breaks ?? []).map((b) => (
        <p key={b.period} className="chart-seam-note">
          <span className="label">Break · {periodLabel(b.period, series.calendar)}</span> {b.note}
        </p>
      ))}

      <p className="chart-source">
        <span className="label">Source</span>{' '}
        <a href={series.source.url} target="_blank" rel="noreferrer noopener">
          {series.source.name}
        </a>{' '}
        · tier {series.tier}
        {series.source.vintage ? ` · vintage ${series.source.vintage}` : ''}
      </p>
    </figure>
  );
}
