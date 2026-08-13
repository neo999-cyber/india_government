/**
 * RECORD CONSTELLATION — the areas as a reader would name them, and the geometry behind the art.
 *
 * ============================ WHY GROUPS AND NOT THE DOMAIN ENUM =============================
 *
 * The brief that commissioned this asked for seven symbols labelled Education, Defence, Foreign
 * relations, Infrastructure, Human development, Environment and Energy. Measured against `/data`,
 * that set names six real domains, one thing that is not a domain at all — **`energy` is inside
 * `environment`; phase 15 was literally "environment and energy"** — and it covers **239 of 702
 * filings, 34%**. The eight it omits are not the tail: `governance` and `federalism` alone are 214.
 *
 * So a seven-symbol artwork captioned *the areas the archive covers* would have been false about
 * this archive, which is the invented-structure defect the brief's own content boundaries forbid.
 *
 * **THE OPERATOR'S RULING, 2026-08-14: keep the plain words, drop the jargon.** *"these words were
 * used because most easily understood. didn't wanna use kashmir or poverty, federalism."* That is a
 * reading decision and it is a good one — `federalism` and `human-development` are terms of art, and
 * a landing page is the worst place to meet one.
 *
 * **The resolution is grouping, not selection.** Eight groups carry the plain words the operator
 * asked for AND every one of the fourteen domains, so nothing is hidden and no reader meets the
 * word `kashmir` before they have chosen to. It is eight rather than seven for one reason:
 * `governance` + `federalism` is the single largest block in the corpus and none of the brief's
 * seven had a home for it. Seven would have put 214 filings nowhere.
 *
 * **TOTALITY IS ASSERTED AT MODULE LOAD, NOT PROMISED IN A COMMENT.** `assertTotality()` runs in
 * the build. A domain added to the enum with no home here fails the build rather than quietly
 * vanishing from the picture — which is exactly how the 34% happened in the first place.
 *
 * ============================ WHAT THE ART ENCODES, AND WHAT IT REFUSES TO ====================
 *
 * **POSITION MEANS NOTHING AND THE PAGE SAYS SO.** This is the rule the nodal-discovery mock was
 * rejected under — *if every position needs an explainer, position is the wrong primary encoding* —
 * and putting marks over a map of India makes it sharper, because geography is the most strongly
 * read encoding there is. A reader who sees a dot over Bihar will read it as a claim about Bihar.
 *
 * Two things hold that off, and the second is the operator's:
 *   1. The scatter is a **low-discrepancy R2 sequence over the whole frame, interleaved across
 *      groups by steepest deficit**, so no group occupies a region. There is no cluster to mistake
 *      for a state, by construction rather than by hope.
 *   2. **Selecting an area SPREADS its constellation outward** rather than zooming into it —
 *      operator's instruction, 2026-08-14. The selected constellation gets larger and sprawls
 *      further across the sheet, so the one moment a reader looks hardest at a single group is the
 *      moment that group most obviously spans the whole country.
 *
 * **DENSITY IS THE ONE THING THAT IS TRUE.** Marks per group are proportional to what the archive
 * actually holds there, at a stated ratio, computed from `/data` by the caller. It is the only
 * defensible encoding in the picture and it is the one that makes "India, made of records" a
 * statement rather than a slogan. No figure is printed: the homepage rule is that the size of the
 * database is not the lead.
 *
 * **WHAT IS NOT HERE.** No verdict, no score, no verified/unverified split, no severity colour, no
 * state comparison. A mark is a record existing, nothing more.
 */
import { DOMAINS, type Domain } from '@/lib/types';

/** The eight non-colour node shapes. Colour is never the only difference between two groups. */
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
  /** Stable id — used for `data-area`, the button key and the CSS hook. Not shown to a reader. */
  id: string;
  /** The plain words. This is what a reader sees, in the tooltip and the status line. */
  label: string;
  /** The accessible name. Says what selecting does, because an icon button's label should. */
  aria: string;
  /** Which of the fourteen domains this group carries. Every domain appears exactly once. */
  domains: readonly Domain[];
  /** Where the control links. One domain → its own page; several → the topics index. */
  href: string;
  shape: NodeShape;
  /** 24×24 icon path. Deliberately geometric and deliberately verdict-free — see below. */
  icon: string;
};

/**
 * THE ICONS CARRY NO DIRECTION, WHICH TOOK ONE REJECTION TO GET RIGHT.
 *
 * The obvious icon for the money group is a rising bar chart, and a rising bar chart is a verdict —
 * it says the economy went up, on a landing page whose entire discipline is that it does not say
 * that. It is three bars of EQUAL length here, a ledger rather than a trend. The government icon is
 * a portico for the same reason: an institution, not an outcome.
 */
export const AREAS: readonly Area[] = [
  {
    id: 'education',
    label: 'Education',
    aria: 'Education — trace this constellation',
    domains: ['education'],
    href: '/domains/education/',
    shape: 'circle',
    icon: 'M3 5.5c3-1.2 5.5-1.2 8.5 0v13c-3-1.2-5.5-1.2-8.5 0zM21 5.5c-3-1.2-5.5-1.2-8.5 0v13c3-1.2 5.5-1.2 8.5 0z',
  },
  {
    id: 'health',
    label: 'Health and welfare',
    aria: 'Health and welfare — trace this constellation',
    domains: ['human-development', 'welfare', 'poverty'],
    href: '/domains/',
    shape: 'diamond',
    icon: 'M12 20.2 4.2 12.6a4.6 4.6 0 0 1 0-6.6 4.9 4.9 0 0 1 6.7 0l1.1 1.1 1.1-1.1a4.9 4.9 0 0 1 6.7 0 4.6 4.6 0 0 1 0 6.6z',
  },
  {
    id: 'economy',
    label: 'Money and work',
    aria: 'Money and work — trace this constellation',
    domains: ['macro', 'banking', 'employment'],
    href: '/domains/',
    shape: 'square',
    icon: 'M3.5 5.5h17v3.2h-17zM3.5 10.4h17v3.2h-17zM3.5 15.3h17v3.2h-17z',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    aria: 'Infrastructure — trace this constellation',
    domains: ['infrastructure'],
    href: '/domains/infrastructure/',
    shape: 'triangle',
    icon: 'M12 2.4 2.6 20.4h3.1L12 8.6l6.3 11.8h3.1zM12 12.6l-3.1 5.9h6.2z',
  },
  {
    id: 'environment',
    label: 'Environment and energy',
    aria: 'Environment and energy — trace this constellation',
    domains: ['environment'],
    href: '/domains/environment/',
    shape: 'star',
    icon: 'M20.4 3.2C11.2 3 4.4 6.6 4.4 13.6a7.4 7.4 0 0 0 1.3 4.3L3.2 20.4l1.6 1.6 2.5-2.5a7.4 7.4 0 0 0 4.3 1.3c7 0 10.6-6.8 10.4-16zM8.2 17.1c1.2-4.3 4.4-7.5 8.7-8.7-1.2 4.3-4.4 7.5-8.7 8.7z',
  },
  {
    id: 'security',
    label: 'Security',
    aria: 'Security — trace this constellation',
    domains: ['defence', 'kashmir'],
    href: '/domains/defence/',
    shape: 'hexagon',
    icon: 'M12 2.2 3.6 5.4v6.1c0 5 3.6 9.1 8.4 10.3 4.8-1.2 8.4-5.3 8.4-10.3V5.4zm0 2.3 6.2 2.4v4.6c0 3.8-2.6 7-6.2 8.1-3.6-1.1-6.2-4.3-6.2-8.1V6.9z',
  },
  {
    id: 'world',
    label: 'India and the world',
    aria: 'India and the world — trace this constellation',
    domains: ['foreign'],
    href: '/domains/foreign/',
    shape: 'cross',
    icon: 'M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6zm0 2c1.3 0 2.6 2.1 3.2 5.3H8.8C9.4 6.3 10.7 4.2 12 4.2zM4.4 12c0-.7.1-1.4.3-2h3.7a24 24 0 0 0 0 4H4.7a7.8 7.8 0 0 1-.3-2zm4 4h6.1c-.6 3.2-1.9 5.3-3.2 5.3S9 19.2 8.4 16zm7.2-2H8.4a21 21 0 0 1 0-4h7.2a21 21 0 0 1 0 4zm1.7 2h2.6a7.9 7.9 0 0 1-4.3 3.7c.7-1 1.3-2.3 1.7-3.7zm.3-2a24 24 0 0 0 0-4h3.7a7.7 7.7 0 0 1 0 4zm2.3-6h-2.6c-.4-1.4-1-2.7-1.7-3.7A7.9 7.9 0 0 1 19.9 8zM8.7 4.3C8 5.3 7.4 6.6 7 8H4.4a7.9 7.9 0 0 1 4.3-3.7zM4.4 16H7c.4 1.4 1 2.7 1.7 3.7A7.9 7.9 0 0 1 4.4 16z',
  },
  {
    id: 'government',
    label: 'Government and the states',
    aria: 'Government and the states — trace this constellation',
    domains: ['governance', 'federalism'],
    href: '/domains/governance/',
    shape: 'chevron',
    icon: 'M12 2.4 1.8 7.6v2.1h20.4V7.6zM4.4 11.4h2.8v7.2H4.4zm3.9 0h2.8v7.2H8.3zm3.9 0H15v7.2h-2.8zm3.9 0h2.8v7.2h-2.8zM1.8 19.7h20.4v2H1.8z',
  },
] as const;

/**
 * Every domain lands in exactly one group, checked in the build.
 *
 * A domain in two groups double-counts its filings and inflates the picture; a domain in none
 * disappears from it silently — which is the 34% defect, and the reason this throws rather than
 * warns. Called at module load below, so importing this module is the check.
 */
function assertTotality(): void {
  const seen = new Map<string, string>();
  for (const a of AREAS) {
    for (const d of a.domains) {
      const prior = seen.get(d);
      if (prior)
        throw new Error(
          `constellation: domain "${d}" is in two areas — "${prior}" and "${a.id}". Filings would be counted twice.`,
        );
      seen.set(d, a.id);
    }
  }
  const missing = DOMAINS.filter((d) => !seen.has(d));
  if (missing.length)
    throw new Error(
      `constellation: ${missing.length} domain(s) have no area and would vanish from the landing artwork: ${missing.join(', ')}. ` +
        `Add each to an area in lib/constellation.ts, or the picture asserts a corpus that does not exist.`,
    );
  const unknown = [...seen.keys()].filter((d) => !(DOMAINS as readonly string[]).includes(d));
  if (unknown.length)
    throw new Error(`constellation: area(s) name domains that are not in the enum: ${unknown.join(', ')}`);
}
assertTotality();

/**
 * ONE MARK PER THIS MANY FILINGS. Printed on the page, because a ratio a reader cannot check is
 * decoration. At 702 filings this yields roughly 200 marks — enough to read as an archive, few
 * enough to stay under a sane DOM budget on a phone.
 */
export const FILINGS_PER_MARK = 3.5;
/** No area shrinks below this, so a small area is still visibly present rather than absent. */
const MIN_MARKS = 4;

export type ConstellationNode = { x: number; y: number; area: string };
export type ConstellationEdge = { x1: number; y1: number; x2: number; y2: number; area: string };

/** The frame the scatter fills, in viewBox units, inset so the spread transform stays on the sheet. */
export const FRAME = { w: 927, h: 1100, inset: 92 };

/**
 * THE R2 LOW-DISCREPANCY SEQUENCE — even coverage without randomness.
 *
 * A pseudo-random scatter clumps, and a clump over a state is precisely the misreading this whole
 * component is arranged to prevent. R2 is the two-dimensional generalisation of the golden-ratio
 * sequence and fills a square about as evenly as anything can while still looking unplanned. It is
 * also pure: same input, same picture, on the server and in the browser, which matters because this
 * component is prerendered into the static HTML and must not hydrate into a different sky.
 */
const G = 1.32471795724474602596;
const A1 = 1 / G;
const A2 = 1 / (G * G);

/**
 * Assign each successive point to whichever area is furthest behind its quota — a steepest-deficit
 * interleave. The effect is that every area's marks are spread through the WHOLE sequence, and
 * because the sequence covers the frame evenly, through the whole frame. No area gets a corner.
 */
export function buildConstellation(counts: Record<string, number>): {
  nodes: ConstellationNode[];
  edges: ConstellationEdge[];
  marks: Record<string, number>;
} {
  const marks: Record<string, number> = {};
  for (const a of AREAS) {
    const filings = counts[a.id] ?? 0;
    marks[a.id] = Math.max(MIN_MARKS, Math.round(filings / FILINGS_PER_MARK));
  }
  const total = Object.values(marks).reduce((s, n) => s + n, 0);

  const assigned: Record<string, number> = {};
  for (const a of AREAS) assigned[a.id] = 0;

  const nodes: ConstellationNode[] = [];
  for (let n = 0; n < total; n++) {
    let pick = AREAS[0];
    let best = -Infinity;
    for (const a of AREAS) {
      const deficit = ((marks[a.id] / total) * (n + 1)) - assigned[a.id];
      if (deficit > best) {
        best = deficit;
        pick = a;
      }
    }
    assigned[pick.id]++;

    const fx = (0.5 + A1 * (n + 1)) % 1;
    const fy = (0.5 + A2 * (n + 1)) % 1;
    nodes.push({
      x: FRAME.inset + fx * (FRAME.w - 2 * FRAME.inset),
      y: FRAME.inset + fy * (FRAME.h - 2 * FRAME.inset),
      area: pick.id,
    });
  }

  /**
   * The lines. A minimum spanning tree over each area's own marks — every mark joined to the
   * nearest one already in the figure. It reads as a constellation rather than as a chart, it never
   * leaves a mark stranded, and it is deterministic. It is also, deliberately, the ONLY thing the
   * lines say: these marks belong to the same area. They do not claim a relationship between two
   * records, because no such relationship is in `/data` at this level.
   */
  const edges: ConstellationEdge[] = [];
  for (const a of AREAS) {
    const pts = nodes.filter((p) => p.area === a.id);
    if (pts.length < 2) continue;
    const inTree = [0];
    const out = pts.map((_, i) => i).slice(1);
    while (out.length) {
      let bi = 0;
      let bj = 0;
      let bd = Infinity;
      for (const i of inTree)
        for (let k = 0; k < out.length; k++) {
          const j = out[k];
          const d = (pts[i].x - pts[j].x) ** 2 + (pts[i].y - pts[j].y) ** 2;
          if (d < bd) {
            bd = d;
            bi = i;
            bj = k;
          }
        }
      const j = out[bj];
      edges.push({ x1: pts[bi].x, y1: pts[bi].y, x2: pts[j].x, y2: pts[j].y, area: a.id });
      inTree.push(j);
      out.splice(bj, 1);
    }
  }

  return { nodes, edges, marks };
}
