/**
 * RECORD CONSTELLATION — the areas as a reader would name them, and the geometry behind the art.
 *
 * ============================ WHY GROUPS AND NOT THE DOMAIN ENUM =============================
 *
 * The operator's design reference labels seven symbols Education, Defence, Foreign relations,
 * Infrastructure, Human development, Environment and Energy. Measured against `/data`, that set
 * names six real domains, one thing that is not a domain at all — **`energy` is inside
 * `environment`; phase 15 was literally "environment and energy"** — and it covers **239 of 702
 * filings, 34%**. The eight it omits are not the tail: `governance` and `federalism` alone are 214.
 *
 * So a seven-symbol artwork captioned *the areas the archive covers* would have been false about
 * this archive, which is the invented-structure defect the brief's own content boundaries forbid.
 *
 * **THE OPERATOR'S RULING, 2026-08-14: keep the plain words, drop the jargon.** *"these words were
 * used because most easily understood. didn't wanna use kashmir or poverty, federalism."* That is a
 * reading decision and a good one — `federalism` and `human-development` are terms of art, and a
 * landing page is the worst place to meet one.
 *
 * **The resolution is grouping, not selection.** Eight groups carry the plain words AND every one of
 * the fourteen domains, so nothing is hidden and no reader meets the word `kashmir` before they have
 * chosen to. It is eight rather than seven because `governance` + `federalism` is the single largest
 * block in the corpus and none of the reference's seven had a home for it.
 *
 * **TOTALITY IS ASSERTED AT MODULE LOAD, NOT PROMISED IN A COMMENT.** A domain added to the enum
 * with no home here fails the build rather than quietly vanishing from the picture — which is
 * exactly how the 34% happened in the first place.
 *
 * ============================ WHAT THE ART ENCODES, AND WHAT IT REFUSES TO ====================
 *
 * **THE MARKS SIT INSIDE THE OUTLINE, AND POSITION STILL MEANS NOTHING.** They are tested for
 * containment against the official geometry, so the field of records has India's shape — which is
 * the whole idea, *India, made of records*. Where any individual mark falls is a low-discrepancy
 * sequence and nothing else, and the page says so twice: in the visible note, and in the SVG
 * description for the reader who cannot see it.
 *
 * Two things keep that honest, and the second is the operator's:
 *   1. The scatter is an **R2 low-discrepancy sequence interleaved across areas by steepest
 *      deficit**, so every area covers the whole country and no area occupies a region. There is no
 *      cluster to mistake for a state, by construction rather than by hope. **The reference clusters
 *      each domain around a single anchor point and this deliberately does not** — that is the
 *      operator's correction of 2026-08-14 and it is the substantive change from the prototype.
 *   2. **Selecting an area SPREADS its constellation outward** rather than concentrating it, so the
 *      one moment a reader looks hardest at a single area is the moment it most obviously spans the
 *      whole map.
 *
 * **DENSITY IS THE ONE THING THAT IS TRUE.** Marks per area are proportional to what the archive
 * holds there, at a stated ratio, computed from `/data` by the caller. No figure is printed: the
 * homepage rule is that the size of the database is not the lead.
 *
 * **WHAT IS NOT HERE.** No verdict, no score, no verified/unverified split, no severity colour, no
 * state comparison. A mark is a record existing, nothing more. The area hues are NOMINAL — they say
 * which area, never how much or how well — and shape carries the same information for anyone who
 * cannot separate them.
 */
import { DOMAINS, type Domain } from '@/lib/types';
import { INDIA_OUTLINE, VIEWBOX, ORBIT } from '@/lib/india-outline';

/** The eight non-colour mark shapes. Colour is never the only difference between two areas. */
export type NodeShape =
  | 'circle'
  | 'diamond'
  | 'square'
  | 'triangle'
  | 'star'
  | 'hexagon'
  | 'cross'
  | 'chevron';

export type Area = {
  id: string;
  /** The plain words — the caption, the tooltip and the status line. */
  label: string;
  /** Accessible name. Says what selecting does, because an icon button's label should. */
  aria: string;
  /** Which of the fourteen domains this area carries. Every domain appears exactly once. */
  domains: readonly Domain[];
  /** One domain → its own page; several → the topics index. */
  href: string;
  shape: NodeShape;
  /** Position on the orbital ring, in degrees clockwise from the top. */
  angle: number;
  /** 24×24 icon path, in the reference's line-icon idiom. */
  icon: string;
};

/**
 * THE ICONS CARRY NO DIRECTION, WHICH TOOK ONE REJECTION TO GET RIGHT.
 *
 * The obvious icon for the money area is a rising bar chart, and a rising bar chart is a verdict —
 * it says the economy went up, on a landing page whose whole discipline is that it does not say
 * that. It is three bars of EQUAL length here, a ledger rather than a trend. The government icon is
 * a portico for the same reason: an institution, not an outcome.
 *
 * Drawn as strokes rather than fills to match the reference's line-icon register.
 */
export const AREAS: readonly Area[] = [
  {
    id: 'education',
    label: 'Education',
    aria: 'Education — trace this constellation',
    domains: ['education'],
    href: '/domains/education/',
    shape: 'circle',
    angle: 0,
    icon: 'M3 5.5c3-1.1 5.5-1.1 8.5 0v13c-3-1.1-5.5-1.1-8.5 0zM21 5.5c-3-1.1-5.5-1.1-8.5 0v13c3-1.1 5.5-1.1 8.5 0zM12 6.6v11.5',
  },
  {
    id: 'world',
    label: 'India and the world',
    aria: 'India and the world — trace this constellation',
    domains: ['foreign'],
    href: '/domains/foreign/',
    shape: 'cross',
    angle: 45,
    icon: 'M12 2.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4zM2.8 12h18.4M12 2.8c2.3 2.5 3.6 5.8 3.6 9.2s-1.3 6.7-3.6 9.2c-2.3-2.5-3.6-5.8-3.6-9.2S9.7 5.3 12 2.8z',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    aria: 'Infrastructure — trace this constellation',
    domains: ['infrastructure'],
    href: '/domains/infrastructure/',
    shape: 'triangle',
    angle: 90,
    icon: 'M3 20.5h18M5.5 20.5V9.2L12 4l6.5 5.2v11.3M9.5 20.5v-6h5v6',
  },
  {
    id: 'health',
    label: 'Health and welfare',
    aria: 'Health and welfare — trace this constellation',
    domains: ['human-development', 'welfare', 'poverty'],
    href: '/overview/',
    shape: 'diamond',
    angle: 135,
    icon: 'M12 20.3 4.6 13a4.4 4.4 0 0 1 0-6.3 4.7 4.7 0 0 1 6.4 0l1 1 1-1a4.7 4.7 0 0 1 6.4 0 4.4 4.4 0 0 1 0 6.3z',
  },
  {
    id: 'environment',
    label: 'Environment and energy',
    aria: 'Environment and energy — trace this constellation',
    domains: ['environment'],
    href: '/domains/environment/',
    shape: 'star',
    angle: 180,
    icon: 'M20.2 3.6C11.4 3.4 4.8 6.9 4.8 13.5a7 7 0 0 0 1.3 4.1L3.6 20.1M7.4 18.9a7 7 0 0 0 4.1 1.3c6.6 0 10.1-6.6 9.9-15.2M8.6 16.6c1.2-4.1 4.2-7.1 8.3-8.3',
  },
  {
    id: 'government',
    label: 'Government and the states',
    aria: 'Government and the states — trace this constellation',
    domains: ['governance', 'federalism'],
    href: '/domains/governance/',
    shape: 'chevron',
    angle: 225,
    icon: 'M2.6 8.2 12 3.2l9.4 5M4.6 8.2v10M9.5 8.2v10M14.5 8.2v10M19.4 8.2v10M2.6 20.8h18.8',
  },
  {
    id: 'economy',
    label: 'Money and work',
    aria: 'Money and work — trace this constellation',
    domains: ['macro', 'banking', 'employment'],
    href: '/overview/',
    shape: 'square',
    angle: 270,
    icon: 'M3.6 6.2h16.8M3.6 12h16.8M3.6 17.8h16.8',
  },
  {
    id: 'security',
    label: 'Security',
    aria: 'Security — trace this constellation',
    domains: ['defence', 'kashmir'],
    href: '/domains/defence/',
    shape: 'hexagon',
    angle: 315,
    icon: 'M12 2.9 4.4 5.7v6c0 4.7 3.3 8.6 7.6 9.6 4.3-1 7.6-4.9 7.6-9.6v-6z',
  },
] as const;

/**
 * Every domain lands in exactly one area, checked in the build.
 *
 * A domain in two areas double-counts its filings; a domain in none disappears from the picture
 * silently — which is the 34% defect, and the reason this throws rather than warns.
 */
function assertTotality(): void {
  const seen = new Map<string, string>();
  for (const a of AREAS)
    for (const d of a.domains) {
      const prior = seen.get(d);
      if (prior)
        throw new Error(
          `constellation: domain "${d}" is in two areas — "${prior}" and "${a.id}". Filings would be counted twice.`,
        );
      seen.set(d, a.id);
    }
  const missing = DOMAINS.filter((d) => !seen.has(d));
  if (missing.length)
    throw new Error(
      `constellation: ${missing.length} domain(s) have no area and would vanish from the landing artwork: ${missing.join(', ')}. ` +
        `Add each to an area in lib/constellation.ts, or the picture asserts a corpus that does not exist.`,
    );
}
assertTotality();

/**
 * One mark per this many filings. Printed on the page — a ratio a reader cannot check is decor.
 *
 * **IT WAS 3.5 AND THAT WAS TOO MANY.** 200 marks and 192 spanning-tree lines inside the outline is
 * the *noisy particle effect* the brief names as the failure mode on the other side of "numerous
 * enough to communicate an archive". At 5 the field reads as a constellation rather than static,
 * and the proportion between areas — the only thing the density claims — is unchanged.
 */
export const FILINGS_PER_MARK = 5;
const MIN_MARKS = 4;

export type ConstellationNode = { x: number; y: number; area: string };
export type ConstellationEdge = { x1: number; y1: number; x2: number; y2: number; area: string };

export { VIEWBOX, ORBIT };

/** A point on the orbital ring, in viewBox units — where an area's control and its curve begin. */
export function orbitPoint(angleDeg: number): { x: number; y: number } {
  const t = ((angleDeg - 90) * Math.PI) / 180;
  return { x: ORBIT.cx + ORBIT.rx * Math.cos(t), y: ORBIT.cy + ORBIT.ry * Math.sin(t) };
}

/** The same point as a percentage of the stage, for positioning the HTML control buttons. */
export function orbitPercent(angleDeg: number): { left: string; top: string } {
  const p = orbitPoint(angleDeg);
  return { left: `${(p.x / VIEWBOX.w) * 100}%`, top: `${(p.y / VIEWBOX.h) * 100}%` };
}

/**
 * The tether from an area's control inward. Quadratic, swept a few degrees so it curves rather than
 * pointing — the reference's most characteristic line, and the thing that makes the badge read as
 * belonging to the field rather than floating beside it.
 */
export function tether(angleDeg: number): string {
  const s = orbitPoint(angleDeg);
  const at = (f: number, d: number) => {
    const t = ((angleDeg + d - 90) * Math.PI) / 180;
    return { x: ORBIT.cx + ORBIT.rx * f * Math.cos(t), y: ORBIT.cy + ORBIT.ry * f * Math.sin(t) };
  };
  const c = at(0.78, 6);
  const e = at(0.46, 14);
  return `M${s.x.toFixed(1)},${s.y.toFixed(1)} Q${c.x.toFixed(1)},${c.y.toFixed(1)} ${e.x.toFixed(1)},${e.y.toFixed(1)}`;
}

/**
 * THE OUTLINE AS RINGS. `lib/india-outline.ts` is M/L/Z only, which is why this can be a parse and
 * not a bezier flattener — and why it asserts rather than guessing if that ever stops being true.
 */
let RINGS: [number, number][][] | null = null;
function polygons(): [number, number][][] {
  if (RINGS) return RINGS;
  const bad = INDIA_OUTLINE.match(/[CcQqAaSsTtHhVv]/);
  if (bad)
    throw new Error(
      `constellation: the India outline contains a "${bad[0]}" command. This parser handles M/L/Z only; ` +
        `containment would be computed against a mis-read shape. Flatten the path or extend the parser.`,
    );
  const rings: [number, number][][] = [];
  let cur: [number, number][] = [];
  for (const m of INDIA_OUTLINE.matchAll(/([MLZ])([-\d.]+)?,?([-\d.]+)?/g)) {
    if (m[1] === 'Z') {
      if (cur.length > 2) rings.push(cur);
      cur = [];
      continue;
    }
    if (m[1] === 'M') {
      if (cur.length > 2) rings.push(cur);
      cur = [];
    }
    if (m[2] !== undefined && m[3] !== undefined) cur.push([Number(m[2]), Number(m[3])]);
  }
  if (cur.length > 2) rings.push(cur);
  RINGS = rings;
  return rings;
}

/** Even-odd crossing count across every ring — islands are separate rings and count correctly. */
function inside(x: number, y: number): boolean {
  let crossings = 0;
  for (const ring of polygons())
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i];
      const [xj, yj] = ring[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) crossings++;
    }
  return crossings % 2 === 1;
}

const G = 1.32471795724474602596;
const A1 = 1 / G;
const A2 = 1 / (G * G);

/**
 * Build the field. R2 gives even coverage without randomness — a pseudo-random scatter clumps, and a
 * clump over a state is the misreading this component is arranged to prevent. It is also pure: same
 * input, same sky, on the server and in the browser, which matters because this is prerendered into
 * the static HTML and must not hydrate into a different picture.
 */
export function buildConstellation(counts: Record<string, number>): {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
} {
  const marks: Record<string, number> = {};
  for (const a of AREAS) {
    const count = counts[a.id] ?? 0;
    marks[a.id] = count <= 0 ? 0 : Math.max(MIN_MARKS, Math.round(count / FILINGS_PER_MARK));
  }
  const total = Object.values(marks).reduce((s, n) => s + n, 0);

  // Candidate points from the sequence, keeping only those that land on land.
  const pts: { x: number; y: number }[] = [];
  for (let n = 1; pts.length < total && n < 60_000; n++) {
    const x = ((0.5 + A1 * n) % 1) * VIEWBOX.w;
    const y = ((0.5 + A2 * n) % 1) * VIEWBOX.h;
    if (inside(x, y)) pts.push({ x, y });
  }

  // Steepest-deficit interleave: each area's marks are spread through the whole sequence, and
  // because the sequence covers the landmass evenly, through the whole country.
  const assigned: Record<string, number> = {};
  for (const a of AREAS) assigned[a.id] = 0;
  const nodes: ConstellationNode[] = pts.map((p, n) => {
    let pick = AREAS[0];
    let best = -Infinity;
    for (const a of AREAS) {
      const deficit = (marks[a.id] / total) * (n + 1) - assigned[a.id];
      if (deficit > best) {
        best = deficit;
        pick = a;
      }
    }
    assigned[pick.id]++;
    return { x: p.x, y: p.y, area: pick.id };
  });

  /**
   * The lines. A minimum spanning tree over each area's own marks — every mark joined to the nearest
   * one already in the figure. It reads as a constellation rather than a chart and never strands a
   * mark. It is also, deliberately, the ONLY thing the lines say: these marks belong to the same
   * area. They do not claim a relationship between two records, because no such relationship exists
   * in `/data` at this level.
   */
  const edges: ConstellationEdge[] = [];
  for (const a of AREAS) {
    const p = nodes.filter((n) => n.area === a.id);
    if (p.length < 2) continue;
    const tree = [0];
    const out = p.map((_, i) => i).slice(1);
    while (out.length) {
      let bi = 0;
      let bk = 0;
      let bd = Infinity;
      for (const i of tree)
        for (let k = 0; k < out.length; k++) {
          const d = (p[i].x - p[out[k]].x) ** 2 + (p[i].y - p[out[k]].y) ** 2;
          if (d < bd) {
            bd = d;
            bi = i;
            bk = k;
          }
        }
      const j = out[bk];
      edges.push({ x1: p[bi].x, y1: p[bi].y, x2: p[j].x, y2: p[j].y, area: a.id });
      tree.push(j);
      out.splice(bk, 1);
    }
  }

  return { nodes, edges };
}
