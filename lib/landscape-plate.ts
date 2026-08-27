/**
 * SPLIT FROM `lib/landscape.ts` ON THE FIRST BUILD, AND THE ERROR IS WORTH RECORDING.
 * `RecordLandscape` is a client component and imported `PLATE` from the module that derives the
 * counts — which imports `lib/data`, which reads the filesystem. Turbopack failed the whole page
 * with *the chunking context does not support external modules (request: node:fs)*: a value import
 * had dragged `fs` into the browser bundle. Geometry that the client needs lives here, with no data
 * import at all; anything derived from `/data` stays server-side next door.
 */
import type { Domain } from '@/lib/types';

/**
 * THE RECORD LANDSCAPE — the landing page's second picture, and the one a reader enters through.
 *
 * ============================ WHAT THE ARTWORK IS, AND WHERE IT CAME FROM =====================
 *
 * **Fourteen isometric landmarks and one terrain plate, generated to a written brief and supplied
 * by the operator on 2026-08-27.** They are not photographs, not traced from any published map, and
 * carry no third-party rights — which is the whole reason this picture can exist beside the
 * constellation, whose base geometry is Survey of India material with an attribution obligation
 * that travels with the assets. **The landscape is invented and says so; the constellation is
 * official and says that.** Nothing here should ever be described as a map of India.
 *
 * A first set arrived as VTracer autotraces of the same sheet and was WITHDRAWN: each carried a
 * cream ground pad baked into the trace, so every landmark sat on a pale rectangle that only
 * disappeared on cream. The shipped set is properly cut out — alpha corners, soft edges, no pad —
 * which is what lets a contact shadow do that job honestly instead.
 *
 * ============================ WHAT IS ENCODED, AND WHAT IS NOT ================================
 *
 * **POSITION IS CONCEPTUAL AND IS NOT GEOGRAPHY.** The plate has mountains, a river delta and a
 * coast because a landscape needs them, not because they are India's. The positions below were
 * chosen so that nothing stands in water — a land mask classified off the plate's own pixels, where
 * water is TEAL rather than blue — and then nudged until no landmark covered another by more than
 * 6%. They are frozen here rather than re-solved at render: a solver in the page would put a mask
 * scan in the request path and could move a landmark between builds.
 *
 * **DENSITY IS REAL, AND IT IS THE ONE TRUE ENCODING.** `marks()` scatters one mark per filing in a
 * patch of FIXED size, so Governance's 139 and Poverty's 5 occupy the same ground at very different
 * densities. That is the claim `RecordConstellation` already makes and defends, reused rather than
 * reinvented — and it is what stops a school being just a school.
 *
 * **A RECORD FILED UNDER SEVERAL SUBJECTS IS MARKED UNDER EACH.** The marks therefore sum to more
 * than the corpus holds, and nothing anywhere sums them: the figure is per subject, and rule 4b's
 * prohibition on corpus-wide totals is why it stays that way.
 *
 * **THE TWO EMPTY PLOTS WERE WITHDRAWN 2026-08-27, ON THE OPERATOR'S INSTRUCTION, AND WHAT THAT
 * COSTS IS RECORDED HERE.** Poverty and Kashmir used to render as marked-out ground with nothing
 * built on it — rule 4a's absence mark in this picture's idiom, and the sharpest honest thing on
 * the page. They now take supplied artwork like every other subject: mountains for Kashmir, a
 * market stall for Poverty.
 *
 * **The facts did not change and are still shown, but the PICTURE no longer says them.** Kashmir
 * carries 46 records and NO measured series; Poverty's last official headcount was taken for
 * 2011-12 and its series stop in 2018. Both survive in the hover readout, which prints each
 * subject's series and record counts, and in the filing density — Poverty's five marks against
 * Governance's 139. A reader who only looks will no longer see it; a reader who points will.
 */

export type Landmark = {
  readonly key: Domain;
  readonly label: string;
  /** File under `public/landscape/`. Every subject now has its own; two once shared one plot. */
  readonly art: string;
  /** Frozen placement, in the plate's own 1536x1024 coordinate space. `baseY` is where it stands. */
  readonly cx: number;
  readonly baseY: number;
  readonly w: number;
  readonly h: number;
};

export const PLATE = { w: 1536, h: 1024, src: '/landscape/plate.webp' } as const;

export const LANDMARKS: readonly Landmark[] = [
  { key: 'kashmir', label: 'Kashmir', art: 'kashmir-peaks', cx: 414.7, baseY: 399.4, w: 140.4, h: 155.7 },
  { key: 'defence', label: 'Defence', art: 'radar-tower', cx: 583.7, baseY: 276.5, w: 106.3, h: 194.9 },
  { key: 'governance', label: 'Governance', art: 'parliament', cx: 875.5, baseY: 307.2, w: 151.5, h: 187.5 },
  { key: 'federalism', label: 'Federalism', art: 'boundary-stones', cx: 1059.8, baseY: 348.2, w: 101.1, h: 126.2 },
  { key: 'environment', label: 'Environment', art: 'broadleaf-trees', cx: 230.4, baseY: 460.8, w: 133.1, h: 171.9 },
  { key: 'human-development', label: 'Human development', art: 'hospital', cx: 537.6, baseY: 481.3, w: 121.8, h: 156.8 },
  { key: 'macro', label: 'Macroeconomy', art: 'bank', cx: 775.7, baseY: 436.3, w: 140.1, h: 152.6 },
  { key: 'banking', label: 'Banking and credit', art: 'coins-vault', cx: 983.0, baseY: 481.3, w: 119.8, h: 134.1 },
  { key: 'infrastructure', label: 'Infrastructure', art: 'overpass-power-pylon', cx: 1105.9, baseY: 583.7, w: 157.2, h: 148.0 },
  { key: 'foreign', label: 'Foreign policy', art: 'quay-crane', cx: 1259.5, baseY: 624.6, w: 159.2, h: 160.4 },
  { key: 'education', label: 'Education', art: 'school', cx: 384.0, baseY: 614.4, w: 160.8, h: 132.6 },
  { key: 'employment', label: 'Employment', art: 'workshop-shed', cx: 537.6, baseY: 645.1, w: 136.7, h: 144.8 },
  { key: 'welfare', label: 'Welfare delivery', art: 'grain-silos', cx: 675.8, baseY: 727.0, w: 137.9, h: 200.7 },
  { key: 'poverty', label: 'Poverty', art: 'poverty-market', cx: 885.9, baseY: 815.8, w: 168.4, h: 176.4 },
];
