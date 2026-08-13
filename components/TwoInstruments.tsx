'use client';

import type { Point } from '@/lib/types';
import { ticksForMax } from '@/lib/ticks';

/**
 * The story's figure: two instruments measuring the same thing on one set of axes.
 *
 * WHY THEY MAY SHARE AXES WHEN THE CORPUS USUALLY FORBIDS IT. CLAUDE.md's authoring conventions
 * name four measurement categories, and the third — INCOMMENSURABLE — bars putting two instruments
 * side by side when they measure DIFFERENT quantities. These do not fall there. P-59 records them
 * as a `differentFacts` dispute: **the same quantity, two instruments, incompatible answers.**
 * That is category one, where showing both and picking neither is exactly what is required.
 *
 * AND THE UNITS STILL DIFFER, SO NOTHING IS PLOTTED AGAINST A SHARED VALUE AXIS. ASER reports the
 * share of children who can read a Standard II text; PARAKH reports the mean share of test items
 * answered correctly. Those are both percentages and they are not the same percentage. Each line
 * therefore carries its own label and its own unit, the axis is unlabelled, and **no gap between
 * the lines is drawn, shaded or measured** — a wedge here would be a subtraction the corpus refuses.
 * What the chart shows is the SHAPE of two series over the same years, which is the thing in
 * dispute.
 *
 * `active` varies emphasis only. Every line, point and label is in the DOM at every value,
 * including the -1 that a no-JS or reduced-motion reader never leaves.
 */

const W = 640;
const H = 300;
// Right padding holds the inline series labels, which are the legend. 96 clipped them —
// "can read a Std II text" ran off the frame — and a clipped label on a chart whose whole point is
// that the two lines measure different things is the one label that may not be cut.
const PAD = { top: 24, right: 148, bottom: 34, left: 20 };

type Line = {
  key: string;
  label: string;
  unit: string;
  points: Point[];
  /** Years where the instrument's own custodians declare a break with the previous round. */
  breaks: number[];
};

const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

/**
 * ============================ PARAMETERISED 2026-08-13, AND IT WAS SHIPPING WRONG =============
 *
 * This component was written for one story and used by a second, and **two things in it were
 * hardcoded to the first**: the accessible name and the y-window.
 *
 * **The accessible name is the serious one.** The jobs story shipped an SVG whose `aria-label` read
 * *"Two national instruments measuring Grade 3 reading in India, 2010 to 2024"* — so a screen
 * reader on a page about employment was told it was looking at a reading assessment. Live, on
 * production, and invisible to every gate: `field-render-audit` reads page TEXT and an `aria-label`
 * is an attribute. Found by reading the previous batch's output as an adversary, which is the rule
 * that exists for exactly this.
 *
 * **The y-window is the second.** `0–75` was correct for two percentage series in that range and
 * squashed the jobs pair, which runs 3.1 to 9.05, into the bottom eighth of the plot — flattening
 * the divergence that was the whole point of the page.
 *
 * **The reason the window is FIXED rather than fitted survives and is why `yMax` is a prop.** A
 * scale fitted per step would let the emphasis step change the geometry, which would be the chart
 * arguing. So the caller fixes it once for the whole story and it never moves with `active`.
 */
export function TwoInstruments({
  lines,
  active,
  yMax = 75,
  label,
}: {
  lines: Line[];
  active: number;
  /** Fixed for the whole story, never derived per step. See the header. */
  yMax?: number;
  /** The SVG's accessible name. Required in practice: the default names no subject. */
  label?: string;
}) {
  const years = lines.flatMap((l) => l.points.map((p) => yearOf(p.period)));
  const x0 = Math.min(...years);
  const x1 = Math.max(...years);
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (yr: number) => PAD.left + ((yr - x0) / (x1 - x0 || 1)) * plotW;
  // Fixed by the caller for the whole story: a scale fitted to the data would let the emphasis
  // step change the geometry, which would be the chart arguing. See the header for why it moved
  // from a constant to a prop.
  const y = (v: number) => PAD.top + plotH - (v / yMax) * plotH;

  // Step 0 introduces ASER alone; every later step shows both. -1 (no JS, reduced motion) shows both.
  const shown = (i: number) => active !== 0 || i === 0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="two-svg" role="img"
      aria-label={label ?? `Two instruments, ${x0} to ${x1}, on separate scales. They do not agree.`}>
      {/* DERIVED FROM `yMax`, NEVER CONSTANT. These were `[0, 25, 50, 75]` while `yMax` was a prop,
          so five of seven stories drew their grid somewhere other than on their own scale — three
          of four lines off-canvas at yMax 6 and 10, all four welded to the baseline at 600 and
          12000. `lib/ticks.ts` carries the measurement; `tools/chart-ticks.mjs` asserts the result
          in the built output rather than trusting this call site. */}
      {ticksForMax(yMax).map((t) => (
        <line key={t} x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} className="two-grid" />
      ))}

      {lines.map((l, i) => {
        const pts = l.points
          .filter((p) => p.value !== null)
          .slice()
          .sort((a, b) => yearOf(a.period) - yearOf(b.period));
        if (!pts.length) return null;

        // Rule 2 again: the path is cut at every declared break, so no segment spans one.
        const segs: Point[][] = [];
        let cur: Point[] = [];
        for (const p of pts) {
          if (l.breaks.includes(yearOf(p.period)) && cur.length) {
            segs.push(cur);
            cur = [];
          }
          cur.push(p);
        }
        if (cur.length) segs.push(cur);

        const last = pts[pts.length - 1];
        const on = shown(i);
        return (
          <g key={l.key} className={`two-line two-line-${l.key}${on ? '' : ' is-muted'}`}>
            {segs.map((seg, k) => (
              <path
                key={k}
                d={seg
                  .map((p, j) => `${j === 0 ? 'M' : 'L'} ${x(yearOf(p.period))} ${y(p.value as number)}`)
                  .join(' ')}
                className="two-path"
              />
            ))}
            {pts.map((p) => (
              <circle
                key={p.period}
                cx={x(yearOf(p.period))}
                cy={y(p.value as number)}
                r={3.5}
                className={`two-dot two-dot-${p.status}`}
              />
            ))}
            <text
              x={x(yearOf(last.period)) + 8}
              y={y(last.value as number) + 4}
              className="two-label"
            >
              {l.label}
            </text>
            <text
              x={x(yearOf(last.period)) + 8}
              y={y(last.value as number) + 17}
              className="two-unit"
            >
              {l.unit}
            </text>
          </g>
        );
      })}

      <text x={PAD.left} y={H - 10} className="two-axis">
        {x0}
      </text>
      <text x={W - PAD.right} y={H - 10} className="two-axis" textAnchor="end">
        {x1}
      </text>
    </svg>
  );
}
