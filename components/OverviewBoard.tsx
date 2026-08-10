'use client';

import { useState } from 'react';
import Link from 'next/link';

/**
 * THE OVERVIEW BOARD — what changed, across every area, with one control that moves all of it.
 *
 * WHY THE FIRST OVERVIEW WAS REPLACED. It drew one cell per area-year coloured by whether the
 * observation was verified, approximate or absent. That is **a picture of the filing system, not
 * of the country.** A reader who has never opened this site does not want the corpus's confidence
 * grade for education in 2019; they want to know what happened to schooling. The metadata view
 * answered a question only the instrument's author was asking.
 *
 * SO THE UNIT CHANGED FROM STATUS TO MOVEMENT. Every card carries a real series — real values,
 * real span — and states its change in words. The status vocabulary is still present, because
 * rule 3 requires it, but it is now an attribute of a line rather than the subject of the page.
 *
 * ============================ THE THREE HONEST ENCODINGS =====================================
 *
 * 1. **X IS SHARED AND MEANS TIME.** Every sparkline runs on the same 2010→2026 axis, so a series
 *    that stops in 2019 is *visibly a stub* and one that runs the period spans its card. This is
 *    the whole reason to place them side by side: **span is comparable because the axis is the
 *    same.** Series holding observations before 2010 carry a ◀ and say so.
 *
 * 2. **Y IS PER-CHART AND MEANS NOTHING ACROSS CHARTS.** Each line is scaled to its own range,
 *    because the units are incommensurable — per cent, rupees, kilometres, people. A tall line is
 *    not a big number. **The caption says this in those words**, because an unlabelled
 *    shared-looking height is exactly the encoding rule 7 forbids.
 *
 * 3. **NOTHING ELSE IS ENCODED.** Card size is uniform; order is fixed, not ranked. A ranked grid
 *    would be a scoreboard, and there is no defensible quantity to rank on.
 *
 * ============================ THE YEAR CONTROL ================================================
 *
 * One slider sweeps a rule across every chart at once and prints each area's value at that year.
 * §7a's three-state rule binds it and is implemented: a card shows **the value** where the year
 * has one, **the nearest year, labelled as such** where it does not, or **"no observation"** where
 * the series does not reach. It never silently substitutes a neighbour — §2b's documented failure
 * is that readers do not notice missing data replaced by a default.
 *
 * Default is "no year selected": every chart whole. A reader who never touches the control sees
 * the complete picture, and one who does can put it back.
 */

export type OPoint = { y: number; v: number; s: string };
export type OSeries = {
  id: string;
  title: string;
  unit: string;
  pts: OPoint[];
  brk: number[];
  before: boolean;
};
export type ODomain = {
  key: string;
  label: string;
  nSeries: number;
  nRecords: number;
  head: OSeries | null;
  /** Where no series can carry the card, what the area holds instead. Authored, never derived. */
  instead: string | null;
  rest: OSeries[];
};

const X0 = 2010;
const X1 = 2026;
const W = 260;
const H = 62;
const PAD = 4;

const fmt = (v: number) =>
  Math.abs(v) >= 100000
    ? v.toLocaleString('en-IN', { maximumFractionDigits: 0 })
    : Math.abs(v) >= 100
      ? v.toLocaleString('en-IN', { maximumFractionDigits: 1 })
      : String(Number(v.toFixed(2)));

function geom(pts: OPoint[], w: number, h: number) {
  const vs = pts.map((p) => p.v);
  const lo = Math.min(...vs);
  const hi = Math.max(...vs);
  const span = hi - lo || 1;
  return {
    x: (y: number) => PAD + ((y - X0) / (X1 - X0)) * (w - PAD * 2),
    y: (v: number) => h - PAD - ((v - lo) / span) * (h - PAD * 2),
  };
}

/** Segments cut at every declared break — rule 2, at sparkline scale. */
function paths(s: OSeries, x: (y: number) => number, y: (v: number) => number) {
  const out: string[] = [];
  let cur: OPoint[] = [];
  for (const p of s.pts) {
    if (s.brk.includes(p.y) && cur.length) {
      out.push(cur.map((q, i) => `${i ? 'L' : 'M'} ${x(q.y).toFixed(1)} ${y(q.v).toFixed(1)}`).join(' '));
      cur = [];
    }
    cur.push(p);
  }
  if (cur.length)
    out.push(cur.map((q, i) => `${i ? 'L' : 'M'} ${x(q.y).toFixed(1)} ${y(q.v).toFixed(1)}`).join(' '));
  return out;
}

/** §7a: the value at a year, the nearest labelled, or nothing — never a silent substitute. */
function at(s: OSeries, year: number | null) {
  if (year === null || !s.pts.length) return null;
  const exact = s.pts.find((p) => p.y === year);
  if (exact) return { p: exact, exact: true };
  if (year < s.pts[0].y || year > s.pts[s.pts.length - 1].y) return null;
  const near = s.pts.reduce((a, b) => (Math.abs(b.y - year) < Math.abs(a.y - year) ? b : a));
  return { p: near, exact: false };
}

function Spark({
  s,
  year,
  w = W,
  h = H,
  showDots = true,
}: {
  s: OSeries;
  year: number | null;
  w?: number;
  h?: number;
  showDots?: boolean;
}) {
  const { x, y } = geom(s.pts, w, h);
  const hit = at(s, year);
  const last = s.pts[s.pts.length - 1];
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="spk"
      role="img"
      aria-label={`${s.title}, ${s.pts[0].y} to ${last.y}`}
    >
      {year !== null ? <line className="spk-scrub" x1={x(year)} x2={x(year)} y1={0} y2={h} /> : null}
      {s.brk.map((b) => (
        <line key={b} className="spk-brk" x1={x(b)} x2={x(b)} y1={2} y2={h - 2} />
      ))}
      {paths(s, x, y).map((d, i) => (
        <path key={i} d={d} className="spk-line" />
      ))}
      {showDots
        ? s.pts.map((p) => (
            <circle
              key={p.y}
              cx={x(p.y)}
              cy={y(p.v)}
              r={p.y === last.y ? 3 : 1.8}
              className={`spk-dot spk-${p.s}`}
            />
          ))
        : null}
      {hit ? <circle cx={x(hit.p.y)} cy={y(hit.p.v)} r={4} className="spk-hit" /> : null}
      {s.before ? (
        <text className="spk-before" x={1} y={h - 2}>
          ◀
        </text>
      ) : null}
    </svg>
  );
}

function Reading({ s, year }: { s: OSeries; year: number | null }) {
  const first = s.pts[0];
  const last = s.pts[s.pts.length - 1];
  if (year === null) {
    return (
      <p className="card-read">
        <span className="card-figure">{fmt(last.v)}</span>
        <span className="card-unit">{s.unit}</span>
        <span className="card-from">
          from {fmt(first.v)} in {first.y} · latest {last.y}
        </span>
      </p>
    );
  }
  const hit = at(s, year);
  if (!hit) {
    return (
      <p className="card-read">
        <span className="card-none">No observation for {year}</span>
        <span className="card-from">
          this series runs {first.y}–{last.y}
        </span>
      </p>
    );
  }
  return (
    <p className="card-read">
      <span className="card-figure">{fmt(hit.p.v)}</span>
      <span className="card-unit">{s.unit}</span>
      <span className="card-from">
        {hit.exact ? `in ${year}` : `nearest year with a figure: ${hit.p.y}`}
        {hit.p.s !== 'verified' ? ` · ${hit.p.s}` : ''}
      </span>
    </p>
  );
}

export function OverviewBoard({ domains }: { domains: ODomain[] }) {
  const [year, setYear] = useState<number | null>(null);

  return (
    <>
      {/* THE SLIDER IS THE SHARED X-AXIS, which is why its range is the charts' range exactly.
          An earlier version ran 2014→2026 while the charts ran 2010→2026, leaving a sixth of every
          line unreachable and unlabelled. Matched, the control stops being a filter beside the
          charts and becomes the one axis all of them are drawn on — which is also the only place a
          year label is needed, since the shared axis is what makes the spans comparable. */}
      <div className="scrub">
        <label className="scrub-label" htmlFor="yr">
          Move through the years
        </label>
        <div className="scrub-track">
          <input
            id="yr"
            type="range"
            min={X0}
            max={X1}
            step={1}
            value={year ?? X0}
            onChange={(e) => setYear(Number(e.target.value))}
            aria-valuetext={
              year === null ? 'no year selected; every chart shows its whole span' : String(year)
            }
          />
          <span className="scrub-ends" aria-hidden="true">
            <span>{X0}</span>
            <span>{X1}</span>
          </span>
        </div>
        <output className="scrub-out">{year ?? '—'}</output>
        <button type="button" className="scrub-reset" onClick={() => setYear(null)} disabled={year === null}>
          Show every year
        </button>
      </div>

      <div className="cards">
        {domains.map((d) => (
          <section key={d.key} className="card">
            <h3 className="card-title">
              <Link href={`/domains/${d.key}/`}>{d.label}</Link>
            </h3>
            <p className="card-counts">
              {d.nSeries} series · {d.nRecords} records
            </p>

            {d.head ? (
              <>
                <p className="card-metric">{d.head.title}</p>
                <Spark s={d.head} year={year} />
                <Reading s={d.head} year={year} />
              </>
            ) : (
              <p className="card-instead">{d.instead}</p>
            )}

            {d.rest.length > 0 ? (
              <details className="card-more">
                <summary>All {d.nSeries} series in this area</summary>
                <div className="minigrid">
                  {d.rest.map((s) => (
                    <Link key={s.id} href={`/series/${s.id}/`} className="mini">
                      <Spark s={s} year={year} w={120} h={30} showDots={false} />
                      <span className="mini-t">{s.title}</span>
                    </Link>
                  ))}
                </div>
              </details>
            ) : null}
          </section>
        ))}
      </div>
    </>
  );
}
