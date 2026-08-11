'use client';

import { memo, useDeferredValue, useState } from 'react';
import { RecordMarks } from '@/components/marks';
import type { Unmeasured } from '@/lib/types';
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
  /**
   * THE MARKS TRAVEL WITH THE PROJECTION, and their absence here was the defect.
   *
   * This type is the board's own view of a series, and it was built with exactly the six fields the
   * chart needs. That is why the mini wall listed 250 records with no declarations: **the projection
   * dropped them before the component could render them**, so no amount of care in the view would
   * have caught it. A listing surface must carry what rule 4b requires, and a projection that
   * narrows a record is where that requirement is silently lost.
   */
  caveat?: string;
  unmeasured?: Unmeasured[];
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
  /**
   * THE AREA'S CHARACTER, DERIVED — added 2026-08-11, and it is what survived the Overview grid.
   *
   * A grid of area-by-year cells was specified and measured before it was built. **The shape was
   * not there**: Education came out 12 solid of 13 against Defence's 11, and at a finer grain the
   * ordering inverted, because share-of-series-reporting tracks how many series an area holds
   * rather than how well it is measured. What the measurement DID show is that areas differ
   * enormously on two other axes — **what they are made of** (Infrastructure 16 announced reforms
   * against Governance's 42 episodes and 37 institutional changes) and **the status of their
   * figures** (Federalism 100 per cent verified, Infrastructure and Employment 0).
   *
   * So the grid's readout ships without the grid. Stated per area as numbers and words, which is
   * where a status distinction belongs — encoded as a wall of shading it becomes the metadata view
   * that was rejected twice for showing the filing system rather than the country.
   */
  obs: number;
  /** Exact counts, not a share. See the card for why a bare percentage was withdrawn. */
  status: { verified: number; approx: number; pending: number };
  yearsWith: number;
  yearsTotal: number;
  breaks: number;
  /** Composition in the corpus's own `type` words. No second vocabulary — see the page. */
  composition: string;
  /**
   * ITEM 1 — WHAT HAPPENED IN THE YEARS. Years in which a record filed under this area was
   * announced, and the count per year. Derived only from `date` on records the area declares:
   * 220 of 223 fall inside the 2010-2026 window, the other 3 are pre-2010 baseline records.
   * Nothing is inferred and no year is invented.
   */
  events: { year: number; n: number }[];
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

/**
 * ============================ WHY THE SCRUB LINE IS NOT REACT STATE =========================
 *
 * Every chart on this page shows the SAME year at the same fraction of its own width, because the
 * X axis is shared — that is the board's whole argument. So the scrub position is **one number for
 * the entire page**, and re-rendering 262 SVG components to move 262 lines to the same relative
 * place is work the shared axis makes unnecessary.
 *
 * It is published as `--scrub-t` (0..1) on the board container and each line is translated by CSS.
 * `transform-box: view-box` makes the translation happen in the SVG's own user units, so one
 * variable drives a 260-wide head chart and a 120-wide mini alike; each `<svg>` carries its own
 * `--w`. **React renders each line exactly once, at x = PAD, and never touches it again.**
 *
 * MEASURED, because item 2 asked for numbers and not an assurance. Before: median 6.9ms per slider
 * step, p90 11.1, worst 22, on this desktop. The tool cannot throttle CPU; at the standard 4x
 * mid-tier multiplier that is 28 / 44 / 88ms against a 16.7ms frame — a dragged slider at roughly
 * 20-36fps. The fix is the one the instruction asked for: **nothing stops moving.** All 262 lines
 * still sweep; they simply stop going through React to do it.
 */
const Spark = memo(function Spark({
  s,
  year,
  w = W,
  h = H,
  showDots = true,
  events,
}: {
  s: OSeries;
  /** Only for the hit dot, whose Y is per-series and cannot be a shared variable. */
  year?: number | null;
  w?: number;
  h?: number;
  showDots?: boolean;
  /** Years in which a record filed under this area was announced. Head charts only. */
  events?: number[];
}) {
  const { x, y } = geom(s.pts, w, h);
  const hit = year == null ? null : at(s, year);
  const last = s.pts[s.pts.length - 1];
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="spk"
      style={{ ['--w' as string]: w }}
      role="img"
      aria-label={`${s.title}, ${s.pts[0].y} to ${last.y}${
        events && events.length ? `. ${events.length} year(s) in which a record here begins` : ''
      }`}
    >
      {/* Rendered once at the axis origin; CSS moves it. See the header. */}
      <line className="spk-scrub" x1={PAD} x2={PAD} y1={0} y2={h} />
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
      {/* EVENT TICKS — item 1. A record was announced in this year, in this area. They sit on the
          baseline rather than crossing the plot: the line, the seams and the scrub rule already use
          the vertical, and a fourth full-height mark would make the busiest areas unreadable
          (Governance carries a record in all 17 years). Nothing is inferred — one tick per distinct
          year in which a record filed under this area carries a date. */}
      {events?.map((ey) => (
        <line
          key={`e${ey}`}
          className="spk-event"
          x1={x(ey)}
          x2={x(ey)}
          y1={h - 3.5}
          y2={h}
        />
      ))}
      {hit ? <circle cx={x(hit.p.y)} cy={y(hit.p.v)} r={4} className="spk-hit" /> : null}
      {s.before ? (
        <text className="spk-before" x={1} y={h - 2}>
          ◀
        </text>
      ) : null}
    </svg>
  );
});

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

/**
 * WHAT HAPPENED IN THIS YEAR, IN THIS AREA — the count, and a route to the records.
 *
 * IT COUNTS AND LINKS RATHER THAN LISTING, and that is a rule decision rather than a space one.
 * A card that named the records would be a LISTING SURFACE, and rule 4b would then require every
 * caveat and every declared absence to render inside it, in full — on fourteen cards, for up to
 * **16 records in one area-year** (Governance, 2019). The year-by-year section further down this
 * same page already lists all 223 with their marks and is already bound by `listing-marks`, so the
 * count links there instead of building a second listing that would have to be kept in step.
 *
 * Choosing which one or two records to name would also be a ranking, and there is no defensible
 * quantity to rank on.
 */
function WhatHappened({ d, year }: { d: ODomain; year: number | null }) {
  if (year === null) return null;
  const hit = d.events.find((e) => e.year === year);
  return (
    <p className="card-happened">
      {hit ? (
        <Link href={`/overview/#y${year}`}>
          <strong>
            {hit.n} record{hit.n === 1 ? '' : 's'}
          </strong>{' '}
          begin{hit.n === 1 ? 's' : ''} here in {year}
        </Link>
      ) : (
        <span className="card-happened-none">No record in this area begins in {year}</span>
      )}
    </p>
  );
}

export function OverviewBoard({ domains }: { domains: ODomain[] }) {
  const [year, setYear] = useState<number | null>(null);
  /**
   * The line moves now; the words catch up. `useDeferredValue` lets React drop an intermediate
   * text update during a drag without ever dropping one at rest, so the readings are always
   * correct when the reader stops — which is the only moment they are read.
   */
  const shown = useDeferredValue(year);

  return (
    <div
      className="board"
      data-scrub={year === null ? undefined : ''}
      style={{ ['--scrub-t' as string]: year === null ? 0 : (year - X0) / (X1 - X0) }}
    >
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
                <Spark s={d.head} year={shown} events={d.events.map((e) => e.year)} />
                <Reading s={d.head} year={shown} />
                <WhatHappened d={d} year={shown} />
              </>
            ) : (
              <>
                <p className="card-instead">{d.instead}</p>
                {/* AN AREA WITH NO TICKS MUST NOT LOOK LIKE AN AREA WHERE NOTHING HAPPENED.
                    Kashmir and Poverty lead with no chart, so they can carry no marks — and
                    Kashmir is among the most eventful areas in the corpus, with records in 15
                    distinct years. Stating the count in words is what stops the absence of a
                    tick row reading as an absence of events. */}
                {/* AND THE PER-YEAR READOUT BELONGS HERE TOO. It was first written inside the
                    chart branch only, which meant scrubbing to 2016 said nothing about Kashmir —
                    the area with records in fifteen distinct years — because it has no chart. The
                    readout is about the RECORDS, not about the series, so it does not depend on
                    there being a line to draw. */}
                <WhatHappened d={d} year={shown} />
                {d.events.length > 0 ? (
                  <p className="card-noticks">
                    No chart here to hang them on, and{' '}
                    <strong>
                      {fmt(d.events.reduce((t, e) => t + e.n, 0))} records begin in this area
                    </strong>{' '}
                    across {d.events.length} separate years, {d.events[0].year} to{' '}
                    {d.events[d.events.length - 1].year}.
                  </p>
                ) : null}
              </>
            )}

            <dl className="card-stats">
              <div>
                <dt>Made of</dt>
                <dd>{d.composition}</dd>
              </div>
              {/* EXACT COUNTS, NOT A SHARE. This read "{pct}% verified" for one build, and on
                  Employment and Infrastructure — which are genuinely 0 of 76 and 0 of 95 — it
                  rendered "0% verified", which a first-time reader can only take as *these numbers
                  are wrong*. They are not: they are published approximations, which is a fact
                  about how the figure was released. Naming each status spends one more line and
                  cannot be read as a grade. */}
              <div>
                <dt>Observations</dt>
                <dd>
                  {fmt(d.obs)}
                  {d.obs > 0 ? (
                    <span className="card-stat-note">
                      {[
                        d.status.verified ? `${fmt(d.status.verified)} verified` : null,
                        d.status.approx ? `${fmt(d.status.approx)} approximate` : null,
                        d.status.pending ? `${fmt(d.status.pending)} pending` : null,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                    </span>
                  ) : null}
                </dd>
              </div>
              <div>
                <dt>Years with a figure</dt>
                <dd>
                  {d.yearsWith} of {d.yearsTotal}
                </dd>
              </div>
              <div>
                <dt>Basis changes</dt>
                <dd>
                  {d.breaks}
                  {d.breaks > 0 ? (
                    <span className="card-stat-note">no line is drawn across one</span>
                  ) : null}
                </dd>
              </div>
            </dl>

            {d.rest.length > 0 ? (
              <details className="card-more">
                <summary>All {d.nSeries} series in this area</summary>
                <div className="minigrid">
                  {d.rest.map((s) => (
                    <Link key={s.id} href={`/series/${s.id}/`} className="mini">
                      {/* NO `year` PROP, DELIBERATELY. The mini charts are memoised and never
                          re-render: their scrub line is moved by CSS like every other, and the hit
                          dot is dropped here because its Y is per-series and cannot be shared. At
                          120x30 the dot was 4px on a line already carrying every point — the line
                          still sweeps all 250, which is what the shared axis promises. */}
                      <Spark s={s} w={120} h={30} showDots={false} />
                      <span className="mini-t">{s.title}</span>
                      {/* RULE 4b. This wall LISTS 250 series, so every declaration they carry must
                          reach a reader here — 141 caveats and 58 declared absences did not, until
                          2026-08-11. The wall escaped `listing-marks` because that gate recognises a
                          card by the class `grid-title` and these carry `mini-t`: **a new listing
                          shape built past an existing guard**, which is the guard-scope defect this
                          corpus has now paid for a fourth time. The gate's filter was widened in the
                          same commit; fixing the surface alone would have left the next shape free
                          to escape the same way. A caveat-bearing mini takes the full row, on the
                          `.grid > a:has(.caveat-inline)` pattern — rule 3a, the layout changes. */}
                      <RecordMarks record={s} linkify={false} />
                    </Link>
                  ))}
                </div>
              </details>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
