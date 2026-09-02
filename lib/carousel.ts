import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { getSeries, ledger, series } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';
import { LANDMARKS } from '@/lib/landscape-plate';
import { AREAS } from '@/lib/constellation';
import { HEADLINE, ORDER } from '@/app/overview/page';
import type { Domain } from '@/lib/types';

/**
 * THE FOURTEEN SUBJECTS AS CARDS — everything the Atlas carousel needs, derived from `/data` so it
 * cannot drift from it, in the order the Atlas board already uses.
 *
 * THE FIGURE IS A FIGURE, NOT A RATING. The reference this was built from shows "8.7 ★" on every
 * card. This site publishes no score, so a card carries its lead indicator's latest India value with
 * its unit — the same series, chosen by the same stated rule, that the board below leads with.
 *
 * TWO CARDS ARE DIFFERENT ON PURPOSE. Where a subject has no lead, `lead` is null and the card renders
 * an absence in the figure's place (rule 4a). Where the lead counts the dead, `sober` is true and the
 * card states the figure in a sentence at text size, never as a bold poster number.
 */
export type CarouselSubject = {
  readonly key: Domain;
  readonly label: string;
  readonly area: string;
  readonly art: string;
  /** The art's pixel size, read off the file at build time so the card never reflows on load. */
  readonly artW: number;
  readonly artH: number;
  readonly series: number;
  readonly records: number;
  readonly span: readonly [number, number] | null;
  readonly lead: { title: string; value: number; period: string; unit: string } | null;
  readonly sober: boolean;
};

const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

/**
 * A WEBP'S PIXEL SIZE, READ FROM ITS HEADER AT BUILD TIME. VP8 (lossy), VP8L (lossless) and VP8X
 * (extended) each state it differently; a file that is none of the three throws, because a card
 * with a guessed size would reflow exactly as one with no size does.
 */
function artSize(art: string): { artW: number; artH: number } {
  const b = readFileSync(join(process.cwd(), 'public', 'landscape', `${art}.webp`));
  const tag = b.toString('ascii', 12, 16);
  if (tag === 'VP8 ') return { artW: b.readUInt16LE(26) & 0x3fff, artH: b.readUInt16LE(28) & 0x3fff };
  if (tag === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { artW: (bits & 0x3fff) + 1, artH: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (tag === 'VP8X') return { artW: b.readUIntLE(24, 3) + 1, artH: b.readUIntLE(27, 3) + 1 };
  throw new Error(`carousel: ${art}.webp is not a WebP this reader knows (${tag})`);
}

export function carouselSubjects(): CarouselSubject[] {
  // ORDER is the board's own list and is typed as strings; every member is a Domain by construction.
  return (ORDER as readonly string[]).map((k) => {
    const key = k as Domain;
    const mark = LANDMARKS.find((l) => l.key === key);
    if (!mark) throw new Error(`carousel: no landmark for ${key}`);
    const area = AREAS.find((a) => (a.domains as readonly string[]).includes(key))?.id ?? 'government';
    const mine = series.filter((s) => s.domain === key);
    const recs = ledger.filter((r) => r.domains.includes(key));
    const head = HEADLINE[key] ? getSeries(HEADLINE[key]) : undefined;
    const pts = (head?.points ?? [])
      .filter((p) => p.country === 'IND' && p.value !== null)
      .sort((a, b) => yearOf(String(a.period)) - yearOf(String(b.period)));
    const last = pts[pts.length - 1];
    const years = [
      ...mine.flatMap((s) => s.points.filter((p) => p.country === 'IND' && p.value !== null).map((p) => yearOf(String(p.period)))),
      ...recs.map((r) => yearOf(r.date)),
    ].filter((y) => Number.isFinite(y));
    const lead = head && last ? { title: head.title, value: last.value as number, period: String(last.period), unit: head.unit ?? '' } : null;
    return {
      key,
      label: DOMAIN_LABELS[key],
      area,
      art: mark.art,
      ...artSize(mark.art),
      series: mine.length,
      records: recs.length,
      span: years.length ? [Math.min(...years), Math.max(...years)] : null,
      lead,
      sober: !!lead && /killed|death|died|casualt|fatal/i.test(lead.title),
    };
  });
}
