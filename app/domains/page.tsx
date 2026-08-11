import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger, provenance, series, seriesUnderLens } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';
import { DOMAINS, LENSES, type Domain } from '@/lib/types';
import { DOMAIN_CHARACTER } from '@/lib/domain-copy';

export const metadata: Metadata = {
  title: 'Explore',
  description:
    'The fourteen subject areas, each with what it holds and where its longest-running measurement ' +
    'currently stands. Same fourteen, same order, nothing ranked.',
};

/**
 * `/domains/` — REBUILT 2026-08-11 from fourteen identical boxes with counts.
 *
 * WHAT WAS WRONG. Every card read `N series · N ledger · N disputes`, which distinguishes no area
 * from any other: a reader learns that governance is big and poverty is small, and nothing about
 * what either contains. **A count is the one fact about an area that cannot tell you what it is.**
 *
 * TWO THINGS REPLACE IT, and only one of them is authored.
 *
 * **A one-line character**, from `lib/domain-copy.ts` — a claim about what the AREA holds, not about
 * India, checkable against the area's own page in one click.
 *
 * **The lead series' current value**, derived by the same criterion the domain page leads with: the
 * longest unbroken run of India observations. **Stating the criterion is what makes this not a
 * ranking** — the cards are in the schema's own order and nothing is sorted by anything.
 *
 * The counts stay, small, because they are still the honest answer to *how much is here*.
 */

const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

/** Longest run of consecutive India observations with no declared break inside it. */
function longestRun(x: (typeof series)[number]): number {
  const brk = new Set((x.breaks ?? []).map((b) => yearOf(b.period)));
  const years = x.points
    .filter((p) => p.country === 'IND' && p.value !== null)
    .map((p) => yearOf(p.period))
    .sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  let prev: number | null = null;
  for (const y of years) {
    if (prev !== null && (y !== prev + 1 || brk.has(y))) run = 0;
    run += 1;
    prev = y;
    if (run > best) best = run;
  }
  return best;
}

function leadOf(d: Domain) {
  const own = series.filter((x) => x.domain === d);
  const asLens = (LENSES as readonly string[]).includes(d) ? (d as unknown as never) : null;
  const list = own.length ? own : asLens ? seriesUnderLens(asLens) : [];
  const ranked = list
    .filter((x) => x.points.filter((p) => p.country === 'IND' && p.value !== null).length >= 2)
    .map((x) => ({ x, run: longestRun(x) }))
    .sort((a, b) => b.run - a.run || a.x.id.localeCompare(b.x.id));
  const lead = ranked[0]?.x;
  if (!lead) return null;
  const pts = lead.points.filter((p) => p.country === 'IND' && p.value !== null);
  const last = pts[pts.length - 1];
  const v = last.value as number;
  return {
    series: lead,
    value:
      Math.abs(v) >= 100000
        ? v.toLocaleString('en-IN', { maximumFractionDigits: 0 })
        : String(Number(v.toFixed(2))),
    unit: lead.unit,
    period: last.period,
  };
}

export default function DomainsIndex() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / explore
      </p>
      <h1 className="page-lead">Explore</h1>
      <p className="standfirst">
        Fourteen subject areas, fixed by the schemas. Each card says what the area holds and where
        its longest-running measurement currently stands — <b>chosen for the longest unbroken run,
        not for importance</b>. Same fourteen, same order, nothing ranked.
      </p>

      <div className="dcards">
        {DOMAINS.map((d) => {
          const s = series.filter((x) => x.domain === d);
          const l = ledger.filter((x) => x.domains.includes(d));
          const p = provenance.filter(
            (x) => x.affectsDomains.includes(d) || x.affectsDomains.includes('all'),
          );
          const lead = leadOf(d);
          return (
            <Link key={d} href={`/domains/${d}/`} className="dcard">
              <h2 className="dcard-title">{DOMAIN_LABELS[d]}</h2>
              <p className="dcard-char">{DOMAIN_CHARACTER[d]}</p>
              {lead ? (
                <p className="dcard-lead">
                  <span className="figure">{lead.value}</span>
                  <span className="mono t-note">
                    {lead.unit} · {lead.period}
                  </span>
                  <span className="dcard-lead-name">{lead.series.title}</span>
                </p>
              ) : (
                <p className="dcard-lead">
                  <span className="dcard-none">
                    No series here runs long enough to lead with — what this area holds is records.
                  </span>
                </p>
              )}
              <p className="dcard-counts mono">
                {s.length} series · {l.length} records · {p.length} disputes
              </p>
            </Link>
          );
        })}
      </div>

      <p className="prose-note">
        An empty area is an unopened one — a blank here means unreported, not zero. The figure on
        each card is the most recent observation of that area&rsquo;s longest unbroken series and is
        not a summary of the area; the area&rsquo;s own page carries the rest.
      </p>
    </>
  );
}
