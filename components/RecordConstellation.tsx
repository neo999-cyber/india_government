'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import {
  AREAS,
  VIEWBOX,
  ORBIT,
  FILINGS_PER_MARK,
  buildConstellation,
  orbitPercent,
  tether,
  type NodeShape,
} from '@/lib/constellation';
import { INDIA_OUTLINE } from '@/lib/india-outline';

/**
 * RECORD CONSTELLATION — "India, made of records."
 *
 * ============================ THE MAP, AND THE OBLIGATION THAT TRAVELS WITH IT ================
 *
 * Two artefacts, both from the **Political Map of India, Thirteenth Edition, Survey of India,
 * Department of Science and Technology, Government of India**: the vector outline in
 * `lib/india-outline.ts`, which is what a reader actually sees, and the published sheet itself in
 * `public/map/`, which sits behind it at **six per cent opacity as a ghost texture** — the faint
 * grid of roads and district lines inside the shape, not a map anyone reads.
 *
 * The official depiction is used rather than a generic outline for one reason: the Jammu and
 * Kashmir, Ladakh, POK and LOC treatment is the government's own and a world-atlas silhouette gets
 * it wrong. **The sheet carries "© GOVERNMENT OF INDIA COPYRIGHT 2026."** That was put to the
 * operator with the licensing question before anything was built, and they ruled it usable on
 * 2026-08-14. **Recorded here rather than only in a commit message, because the obligation travels
 * with the asset** and this file is where the next person meets it.
 *
 * ============================ WHERE THIS DEPARTS FROM THE REFERENCE ===========================
 *
 * Faithful to it in structure — the split window, the dashed orbit, the tethered icon badges, the
 * mono status caption, the two-part source line. **Three deliberate differences, all of them
 * substantive rather than stylistic:**
 *
 *   1. **EIGHT AREAS, NOT SEVEN.** The reference's seven cover 34% of this archive and caption
 *      themselves as the whole of it. `lib/constellation.ts` has the measurement.
 *   2. **THE MARKS ARE SPREAD, NOT CLUSTERED.** The reference gathers each domain around a single
 *      anchor point inside the map — which is exactly the cluster a reader reads as a claim about
 *      the state beneath it. The operator's instruction of 2026-08-14 was to spread them, and
 *      selecting an area now pushes its constellation OUTWARD rather than concentrating it.
 *   3. **NO PERMANENT DOMAIN LABELS AND NO SEVENTH "ENERGY" SYMBOL** — energy is not a domain in
 *      this corpus, it is inside environment.
 *
 * ============================ WHY THERE IS NO ResizeObserver =================================
 *
 * Nothing measures anything. One fixed `viewBox`, the outline and every mark in its coordinate
 * space, the controls positioned as a PERCENTAGE of the same stage — so the whole figure scales in
 * CSS and no geometry is ever recomputed. The brief asked for this; it also falls out of the design.
 *
 * ============================ THREE THINGS IT DELIBERATELY DOES NOT DO =======================
 *
 * **No mark links to a record.** A linked mark would make this surface a LISTING of that record, and
 * rule 4b then requires its absences and rule 3a its caveats, in full — which a 5px mark cannot
 * carry. The AREA controls link, to pages that do carry them.
 *
 * **No count is printed.** Density is proportional and the ratio is stated; the total is not.
 *
 * **No verdict, no score, no severity colour.** The area hues are nominal — which area, never how
 * much or how well — and every area has its own mark SHAPE so the distinction never rests on colour.
 */
export function RecordConstellation({
  counts,
}: {
  /** Filings per area, from `/data`. Density is the one real encoding in the picture. */
  counts: Record<string, number>;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const { nodes, edges } = buildConstellation(counts);

  // Scoped ids — a duplicate `id` would break the SVG's accessible name, not merely be untidy.
  const uid = useId();
  const titleId = `${uid}-t`;
  const descId = `${uid}-d`;

  const active = AREAS.find((a) => a.id === selected) ?? null;

  return (
    <section className="rc" aria-labelledby={`${uid}-h`}>
      <div className="rc-window">
        <div className="rc-copy">
          <p className="rc-kicker mono">The archive</p>
          <h2 id={`${uid}-h`} className="rc-h">
            India, made of records.
          </h2>
          <p className="rc-lede">
            Every mark is one record. Eight symbols trace the areas the archive
            covers — grouped so that all fourteen of the subjects a record is
            filed under have a home, and none of them has to be explained before
            you can read the picture.
          </p>
          <hr className="rc-rule" />
          <p className="rc-hint mono">Select a symbol to trace its constellation.</p>
        </div>

        <div className="rc-art">
          <div className="rc-stage">
            {/* The published sheet, at six per cent — texture inside the shape, never a map to be
                read. `alt=""` because it carries no information a reader needs; the outline does,
                and the SVG below names it. */}
            <img
              className="rc-reference"
              src="/map/india-political-2026-soi-13th-edition-texture.webp"
              srcSet="/map/india-political-2026-soi-13th-edition-texture.webp 600w, /map/india-political-2026-soi-13th-edition.jpg 927w"
              sizes="(max-width: 767px) 80vw, 33rem"
              width="600"
              height="712"
              loading="lazy"
              decoding="async"
              alt=""
              aria-hidden="true"
            />

            <svg
              className="rc-map"
              viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
              role="img"
              aria-labelledby={`${titleId} ${descId}`}
              data-selected={selected ?? ''}
            >
              <title id={titleId}>
                The official outline of India, filled with conceptual record
                constellations for eight areas of the archive
              </title>
              <desc id={descId}>
                Each small mark is a group of records in this archive, and the
                fine lines join the marks belonging to the same area. How many
                marks an area has is proportional to how much the archive holds
                about it. Where a mark sits is not: the positions are conceptual
                and say nothing about any state, district or place. The outline
                is the official depiction published by the Survey of India.
              </desc>

              <ellipse
                className="rc-orbit"
                cx={ORBIT.cx}
                cy={ORBIT.cy}
                rx={ORBIT.rx}
                ry={ORBIT.ry}
              />
              <path className="rc-outline" d={INDIA_OUTLINE} />

              {AREAS.map((a) => (
                <path key={a.id} className="rc-tether" data-area={a.id} d={tether(a.angle)} />
              ))}

              {/* One <g> per area. THE SPREAD LIVES HERE — the selected constellation scales about
                  the centre of the sheet, so it grows and sprawls rather than drawing the eye to
                  wherever its marks happen to sit. `non-scaling-stroke` keeps the lines fine while
                  the figure grows. */}
              {AREAS.map((a) => {
                const on = selected === a.id;
                return (
                  <g
                    key={a.id}
                    className="rc-group"
                    data-area={a.id}
                    data-state={on ? 'on' : selected ? 'off' : 'all'}
                  >
                    {edges
                      .filter((e) => e.area === a.id)
                      .map((e, i) => (
                        <line
                          key={i}
                          className="rc-edge"
                          x1={e.x1}
                          y1={e.y1}
                          x2={e.x2}
                          y2={e.y2}
                          vectorEffect="non-scaling-stroke"
                        />
                      ))}
                    {nodes
                      .filter((n) => n.area === a.id)
                      .map((n, i) => (
                        <Mark key={i} shape={a.shape} x={n.x} y={n.y} />
                      ))}
                  </g>
                );
              })}
            </svg>

            {/* The controls, on the ring. Real buttons, `aria-pressed`, 46px circles, positioned as
                a percentage of the stage so they stay on the orbit at every size. */}
            {AREAS.map((a) => {
              const pos = orbitPercent(a.angle);
              return (
                <button
                  key={a.id}
                  type="button"
                  className="rc-node-btn"
                  data-area={a.id}
                  style={{ left: pos.left, top: pos.top }}
                  aria-label={a.aria}
                  aria-pressed={selected === a.id}
                  onClick={() => setSelected((s) => (s === a.id ? null : a.id))}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d={a.icon} />
                  </svg>
                  <span className="rc-tip">{a.label}</span>
                </button>
              );
            })}
          </div>

          {/* `aria-live` so a screen-reader user hears what changed — `aria-pressed` alone reports
              the button's state and never says what happened to the picture. */}
          <p className="rc-status mono" aria-live="polite">
            {active ? `${active.label} constellation` : 'All eight constellations'}
          </p>

          <p className="rc-source mono">
            <span>
              Source geometry: Survey of India, Government of India · 2026
              official outline and political map
            </span>
            <span>Conceptual positions · not geographic values</span>
          </p>
        </div>
      </div>

      <p className="rc-note">
        {active ? (
          <>
            <strong>{active.label}</strong> — spread across the whole sheet, not
            gathered anywhere.{' '}
            <Link href={active.href}>Read the records &rarr;</Link>{' '}
            <span className="rc-note-hint">Select the symbol again for all eight.</span>
          </>
        ) : (
          <>
            One mark for roughly every {FILINGS_PER_MARK} records and indicators
            the archive holds in an area, so how dense an area looks is a real
            measure of how much is filed under it.{' '}
            <strong>Conceptual positions — not geographic values.</strong> Where
            a mark sits says nothing about any state, district or place, and
            nothing here is a score, a ranking or a verdict.
          </>
        )}
      </p>

      <p className="rc-attrib">
        Outline and base map: <em>Political Map of India</em>, Thirteenth
        Edition, published under the direction of the Surveyor General of India.
        Survey of India, Department of Science and Technology, Government of
        India. © Government of India copyright 2026. The constellation marks are
        this site&rsquo;s and are not part of the published sheet.
      </p>
    </section>
  );
}

/**
 * The eight shapes, drawn about (x, y) in viewBox units. Each area is told apart by SHAPE first —
 * colour reinforces and never carries, which is the reference's own requirement and this
 * instrument's standing rule that a distinction a reader cannot see is not a distinction.
 */
function Mark({ shape, x, y }: { shape: NodeShape; x: number; y: number }) {
  const r = 2.9;
  const c = 'rc-node';
  const poly = (pts: string) => <polygon className={c} points={pts} />;
  switch (shape) {
    case 'circle':
      return <circle className={c} cx={x} cy={y} r={r} />;
    case 'diamond':
      return poly(`${x},${y - r * 1.3} ${x + r},${y} ${x},${y + r * 1.3} ${x - r},${y}`);
    case 'square':
      return <rect className={c} x={x - r * 0.85} y={y - r * 0.85} width={r * 1.7} height={r * 1.7} />;
    case 'triangle':
      return poly(`${x},${y - r * 1.2} ${x + r * 1.1},${y + r * 0.8} ${x - r * 1.1},${y + r * 0.8}`);
    case 'star':
      return poly(
        `${x},${y - r * 1.6} ${x + r * 0.42},${y - r * 0.42} ${x + r * 1.6},${y} ${x + r * 0.42},${y + r * 0.42} ${x},${y + r * 1.6} ${x - r * 0.42},${y + r * 0.42} ${x - r * 1.6},${y} ${x - r * 0.42},${y - r * 0.42}`,
      );
    case 'hexagon':
      return poly(
        `${x},${y - r * 1.25} ${x + r},${y - r * 0.62} ${x + r},${y + r * 0.62} ${x},${y + r * 1.25} ${x - r},${y + r * 0.62} ${x - r},${y - r * 0.62}`,
      );
    case 'cross':
      return poly(
        `${x - r * 0.34},${y - r * 1.25} ${x + r * 0.34},${y - r * 1.25} ${x + r * 0.34},${y - r * 0.34} ${x + r * 1.25},${y - r * 0.34} ${x + r * 1.25},${y + r * 0.34} ${x + r * 0.34},${y + r * 0.34} ${x + r * 0.34},${y + r * 1.25} ${x - r * 0.34},${y + r * 1.25} ${x - r * 0.34},${y + r * 0.34} ${x - r * 1.25},${y + r * 0.34} ${x - r * 1.25},${y - r * 0.34} ${x - r * 0.34},${y - r * 0.34}`,
      );
    case 'chevron':
      return poly(
        `${x},${y - r * 1.3} ${x + r * 1.2},${y + r * 0.4} ${x},${y - r * 0.2} ${x - r * 1.2},${y + r * 0.4}`,
      );
  }
}
