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
  readonly series: number;
  readonly records: number;
  readonly span: readonly [number, number] | null;
  readonly lead: { title: string; value: number; period: string; unit: string } | null;
  readonly sober: boolean;
};

const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

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
      series: mine.length,
      records: recs.length,
      span: years.length ? [Math.min(...years), Math.max(...years)] : null,
      lead,
      sober: !!lead && /killed|death|died|casualt|fatal/i.test(lead.title),
    };
  });
}
