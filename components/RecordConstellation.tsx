'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import {
  AREAS,
  FRAME,
  FILINGS_PER_MARK,
  buildConstellation,
  type NodeShape,
} from '@/lib/constellation';

/**
 * RECORD CONSTELLATION — "India, made of records", on the official sheet.
 *
 * ============================ THE MAP, AND THE ONE THING STILL OWED ==========================
 *
 * The artwork sits on the **Political Map of India, Thirteenth Edition, Survey of India,
 * Department of Science and Technology, Government of India**. It is the official depiction,
 * complete, uncropped at every width — which is the point of using it: the boundary treatment for
 * Jammu and Kashmir, Ladakh, POK and the LOC is the government's own and is not something a
 * generic outline gets right.
 *
 * **THE SHEET CARRIES ITS OWN COPYRIGHT NOTICE: "© GOVERNMENT OF INDIA COPYRIGHT 2026."** That was
 * put to the operator before a line of this was written, together with the brief's own instruction
 * to *confirm any reproduction or licensing obligations before production deployment*. The operator
 * ruled on 2026-08-14: *"its ok use it."* **It is recorded here rather than in a commit message
 * because the obligation travels with the asset, and the next person to touch this file should meet
 * it here.** Attribution renders below the map, unconditionally, per the brief.
 *
 * ============================ WHY THERE IS NO ResizeObserver =================================
 *
 * There is nothing to observe. One SVG, one fixed `viewBox`, the map as an `<image>` inside it, and
 * every mark in the same coordinate space — so the whole figure scales with its container in CSS
 * and the geometry never has to be recomputed. The brief asked for this specifically; it also falls
 * out of the honest design, because a measurement loop would be the only reason to want one.
 *
 * ============================ THREE THINGS IT DELIBERATELY DOES NOT DO =======================
 *
 * **No mark links to a record.** The brief permits it *where appropriate* and it is not appropriate
 * here: a linked mark makes this surface a LISTING of that record, and rule 4b then requires the
 * record's absences and rule 3a its caveats — in full, never truncated — which a 6px dot cannot
 * carry. A picture that lists 200 records without their marks is precisely the failure those rules
 * exist for. The AREA controls link, to pages that do carry them.
 *
 * **No count is printed.** The homepage rule is that the size of the database is not the lead.
 * Density is proportional and the ratio is stated; the total is not.
 *
 * **No verdict, no score, no severity colour.** A mark means one record exists. Nothing else.
 */
export function RecordConstellation({
  counts,
}: {
  /** Filings per area, computed from `/data` by the page. Density is the one true encoding here. */
  counts: Record<string, number>;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const { nodes, edges } = buildConstellation(counts);

  /**
   * IDs ARE SCOPED TO THE INSTANCE. `useId` rather than a literal, because a duplicate `id` in the
   * document is the exact robustness failure the brief names — and the SVG's title and description
   * are referenced by `aria-labelledby`, so a collision would break the accessible name rather than
   * merely being untidy.
   */
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;

  const active = AREAS.find((a) => a.id === selected) ?? null;

  return (
    <section className="rc" aria-labelledby={`${uid}-h`}>
      <div className="rc-copy">
        <h2 id={`${uid}-h`} className="rc-h">
          India, made of records
        </h2>
        <p className="rc-lede">
          Every mark is a record in this archive. Eight symbols trace the areas
          it covers — chosen so that all fourteen of the subjects the record is
          filed under have a home, and none of them has to be explained before
          you can read the picture.
        </p>
      </div>

      {/* ============================ THE FIGURE ==========================================
          `role="img"` with a title AND a description: the title names the object, the description
          says what the positions do NOT mean, which is the thing a reader using this without sight
          most needs and would otherwise be the only reader who never gets it — the caveat below the
          map is visual. */}
      <div className="rc-art">
        <svg
          className="rc-svg"
          viewBox={`0 0 ${FRAME.w} ${FRAME.h}`}
          role="img"
          aria-labelledby={`${titleId} ${descId}`}
          data-selected={selected ?? ''}
        >
          <title id={titleId}>
            The official map of India, carrying conceptual record constellations
            for eight areas of the archive
          </title>
          <desc id={descId}>
            Each small mark is one group of records in this archive, and the fine
            lines join the marks belonging to the same area. How many marks an
            area has is proportional to how much the archive holds about it.
            Where a mark sits is not: the positions are conceptual and say
            nothing about any state, city or place. The base map is the Political
            Map of India, Thirteenth Edition, published by the Survey of India.
          </desc>

          <image
            href="/map/india-political-2026-soi-13th-edition.jpg"
            x="0"
            y="0"
            width={FRAME.w}
            height={FRAME.h}
            className="rc-map"
            preserveAspectRatio="xMidYMid meet"
          />

          {/* One <g> per area. THE SPREAD LIVES HERE — operator's instruction of 2026-08-14: a
              selected constellation gets BIGGER and sprawls FURTHER across the sheet, rather than
              zooming in on wherever its marks happen to be. The scale is about the centre of the
              whole sheet in view-box units, so the effect is the same for every area regardless of
              where its marks fell, and the moment a reader concentrates on one area is the moment
              that area most obviously spans the country. `non-scaling-stroke` keeps the lines fine
              while the figure grows. */}
          {AREAS.map((a) => {
            const on = selected === a.id;
            const off = selected !== null && !on;
            return (
              <g
                key={a.id}
                className="rc-group"
                data-area={a.id}
                data-state={on ? 'on' : off ? 'off' : 'all'}
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
                  .filter((p) => p.area === a.id)
                  .map((p, i) => (
                    <Mark key={i} shape={a.shape} x={p.x} y={p.y} />
                  ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* ============================ THE CONTROLS ========================================
          Real buttons, `aria-pressed`, reachable by tab, 44px minimum, and they wrap rather than
          orbit. The brief allows an orbital path — *may* — and a ring of eight is the arrangement
          that overlaps first at 320px and puts the last control furthest from the thumb. A wrapping
          row is the boring answer and it is the one that survives every width in the brief. */}
      <div className="rc-controls" role="group" aria-label="Areas of the archive">
        {AREAS.map((a) => (
          <button
            key={a.id}
            type="button"
            className="rc-btn"
            aria-label={a.aria}
            aria-pressed={selected === a.id}
            onClick={() => setSelected((s) => (s === a.id ? null : a.id))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={a.icon} />
            </svg>
            {/* The shape a reader is about to look for, beside the icon that selects it. Meaning
                never rests on colour: every area has its own mark shape, and this is where the two
                are tied together. */}
            <span className="rc-btn-shape" aria-hidden="true">
              <svg viewBox="-8 -8 16 16" focusable="false">
                <Mark shape={a.shape} x={0} y={0} />
              </svg>
            </span>
            <span className="rc-btn-label">{a.label}</span>
          </button>
        ))}
      </div>

      {/* The status line. `aria-live="polite"` so a screen-reader user hears the change they just
          made — without it, `aria-pressed` alone reports the button's state and never says what
          happened to the picture. */}
      <p className="rc-status" aria-live="polite">
        {active ? (
          <>
            <strong>{active.label}</strong>, spread across the whole sheet.{' '}
            <Link href={active.href}>Read the records &rarr;</Link>{' '}
            <span className="rc-status-hint">
              Select it again for all eight.
            </span>
          </>
        ) : (
          <>All eight constellations. Select a symbol to trace one.</>
        )}
      </p>

      {/* ============================ WHAT THE PICTURE IS AND IS NOT ======================
          Both halves matter and the second is the one that is easy to leave off. The first sentence
          is the encoding that IS defensible; the rest is every encoding a reader might reasonably
          assume and none of which is here. */}
      <p className="rc-note">
        One mark for roughly every {FILINGS_PER_MARK} records and indicators the
        archive holds in an area, so the density of an area is a real measure of
        how much is filed under it.{' '}
        <strong>Conceptual positions — not geographic values.</strong> Where a
        mark sits says nothing about any state, district or place, and nothing
        here is a score, a ranking or a verdict on anything.
      </p>

      <p className="rc-attrib">
        Base map: <em>Political Map of India</em>, Thirteenth Edition, published
        under the direction of the Surveyor General of India. Survey of India,
        Department of Science and Technology, Government of India. © Government
        of India copyright 2026. Reproduced as the official depiction; the
        constellation marks are this site&rsquo;s and are not part of the
        published sheet.
      </p>
    </section>
  );
}

/**
 * The eight shapes, drawn about (x, y). Each area is told apart by SHAPE first — colour is a
 * reinforcement and never the carrier, which is the brief's requirement and also this instrument's
 * standing rule that a distinction a reader cannot see is not a distinction.
 */
function Mark({ shape, x, y }: { shape: NodeShape; x: number; y: number }) {
  const r = 5.2;
  const c = 'rc-node';
  switch (shape) {
    case 'circle':
      return <circle className={c} cx={x} cy={y} r={r} />;
    case 'diamond':
      return (
        <polygon
          className={c}
          points={`${x},${y - r * 1.25} ${x + r},${y} ${x},${y + r * 1.25} ${x - r},${y}`}
        />
      );
    case 'square':
      return (
        <rect className={c} x={x - r * 0.88} y={y - r * 0.88} width={r * 1.76} height={r * 1.76} />
      );
    case 'triangle':
      return (
        <polygon
          className={c}
          points={`${x},${y - r * 1.15} ${x + r * 1.1},${y + r * 0.8} ${x - r * 1.1},${y + r * 0.8}`}
        />
      );
    case 'star':
      return (
        <polygon
          className={c}
          points={`${x},${y - r * 1.5} ${x + r * 0.42},${y - r * 0.42} ${x + r * 1.5},${y} ${x + r * 0.42},${y + r * 0.42} ${x},${y + r * 1.5} ${x - r * 0.42},${y + r * 0.42} ${x - r * 1.5},${y} ${x - r * 0.42},${y - r * 0.42}`}
        />
      );
    case 'hexagon':
      return (
        <polygon
          className={c}
          points={`${x},${y - r * 1.2} ${x + r},${y - r * 0.6} ${x + r},${y + r * 0.6} ${x},${y + r * 1.2} ${x - r},${y + r * 0.6} ${x - r},${y - r * 0.6}`}
        />
      );
    case 'cross':
      return (
        <polygon
          className={c}
          points={`${x - r * 0.36},${y - r * 1.2} ${x + r * 0.36},${y - r * 1.2} ${x + r * 0.36},${y - r * 0.36} ${x + r * 1.2},${y - r * 0.36} ${x + r * 1.2},${y + r * 0.36} ${x + r * 0.36},${y + r * 0.36} ${x + r * 0.36},${y + r * 1.2} ${x - r * 0.36},${y + r * 1.2} ${x - r * 0.36},${y + r * 0.36} ${x - r * 1.2},${y + r * 0.36} ${x - r * 1.2},${y - r * 0.36} ${x - r * 0.36},${y - r * 0.36}`}
        />
      );
    case 'chevron':
      return (
        <polygon
          className={c}
          points={`${x},${y - r * 1.25} ${x + r * 1.15},${y + r * 0.35} ${x},${y - r * 0.2} ${x - r * 1.15},${y + r * 0.35}`}
        />
      );
  }
}
