/**
 * Rendering rules that are structural, not cosmetic. The validator enforces the
 * same pairing in tools/lib/integrity.mjs — the two lists must stay in step.
 */

/** Series that may never be presented alone (CLAUDE.md rule 5: both GDP series always). */
export const PAIRED_SERIES: readonly (readonly string[])[] = [
  ['gdp-growth-old-base', 'gdp-growth-new-base'],
];

/** Provenance record carrying the contested-index dispute (rule 6). */
export const CONTESTED_INDEX_DISPUTE = 'P-08';

/** The pair a series belongs to, or null if it stands alone. */
export function pairFor(id: string): readonly string[] | null {
  return PAIRED_SERIES.find((pair) => pair.includes(id)) ?? null;
}
