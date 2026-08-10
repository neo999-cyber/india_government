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
}: {
  series: Series;
  /** One plain sentence stating what the chart shows. Authored per use, never derived. */
  takeaway?: string;
  highlightLast?: boolean;
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

  const last = pts[pts.length - 1];
  const first = pts[0];
  const ticks = [yMin + (yMax - yMin) * 0.5, yMax - (yMax - yMin) * 0.08];

  return (
    <figure className="chart">
      <figcaption className="chart-head">
        <h3 className="chart-title">
          <Link href={`/series/${series.id}/`}>{series.title}</Link>
        </h3>
        {takeaway ? <p className="chart-takeaway">{takeaway}</p> : null}
      </figcaption>

      <div className="chart-frame">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="chart-svg"
          role="img"
          aria-label={`${series.title}. ${series.unit}. ${periodLabel(first.period, series.calendar)} to ${periodLabel(last.period, series.calendar)}.`}
        >
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
                r={highlightLast && i === pts.length - 1 ? 5 : 3}
                className={`chart-dot chart-dot-${p.status}`}
              />
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
        <a href={series.source.url} target="_blank" rel="noreferrer">
          {series.source.name}
        </a>{' '}
        · tier {series.tier}
        {series.source.vintage ? ` · vintage ${series.source.vintage}` : ''}
      </p>
    </figure>
  );
}
