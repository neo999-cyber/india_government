import { ledger, series } from '@/lib/data';
import type { Domain } from '@/lib/types';
import { LANDMARKS, type Landmark } from '@/lib/landscape-plate';

export { PLATE, LANDMARKS } from '@/lib/landscape-plate';
export type { Landmark } from '@/lib/landscape-plate';

/** Series filed to the subject, plus ledger records that declare it. One mark each. */
const filings = (d: Domain) =>
  series.filter((s) => s.domain === d).length + ledger.filter((l) => l.domains.includes(d)).length;

const yearOf = (period: string) => Number(String(period).replace(/^FY/, '').slice(0, 4));

/**
 * The first year the subject is present at all — an India observation or a record date. It is what
 * the picture would fade in on if a year control is ever added, and it is a fact about the record's
 * START, never about what the subject did.
 */
const firstYear = (d: Domain) => {
  const years: number[] = [];
  for (const s of series.filter((x) => x.domain === d))
    for (const p of s.points)
      if (p.country === 'IND' && p.value !== null) {
        const y = yearOf(String(p.period));
        if (y >= 2000 && y <= 2100) years.push(y);
      }
  for (const l of ledger.filter((x) => x.domains.includes(d))) {
    const y = yearOf(l.date);
    if (y >= 2000 && y <= 2100) years.push(y);
  }
  return years.length ? Math.min(...years) : null;
};

/**
 * ONE MARK PER FILING, IN A PATCH THAT DOES NOT GROW. Deterministic: a fixed seed, so the same
 * scatter is emitted on the server and on every rebuild, and hydration cannot disagree with itself.
 */
function marks(cx: number, baseY: number, w: number, n: number) {
  let seed = 20260827;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const rx = w * 0.62, ry = rx * 0.42;
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, r = 0.45 + Math.sqrt(rnd()) * 0.55;
    out.push({
      x: Number((cx + Math.cos(a) * rx * r).toFixed(1)),
      y: Number((baseY + 4 + Math.sin(a) * ry * r).toFixed(1)),
    });
  }
  return out;
}

export type LandscapeSubject = Landmark & {
  readonly series: number;
  readonly records: number;
  readonly filings: number;
  readonly from: number | null;
  readonly marks: readonly { x: number; y: number }[];
};

/** Server-side: everything the picture needs, derived from `/data` so it cannot drift from it. */
export function landscapeSubjects(): LandscapeSubject[] {
  return LANDMARKS.map((l) => {
    const s = series.filter((x) => x.domain === l.key).length;
    const r = ledger.filter((x) => x.domains.includes(l.key)).length;
    return { ...l, series: s, records: r, filings: filings(l.key), from: firstYear(l.key),
             marks: marks(l.cx, l.baseY, l.w, filings(l.key)) };
  });
}
