import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger, series, seriesUnderLens } from '@/lib/data';
import { DOMAIN_LABELS, formatDateRange } from '@/lib/format';
import { DOMAINS, LENSES } from '@/lib/types';
import type { Lens, Series } from '@/lib/types';
import { RecordMarks } from '@/components/marks';
import { OverviewBoard } from '@/components/OverviewBoard';
import type { ODomain, OSeries } from '@/components/OverviewBoard';

export const metadata: Metadata = {
  title: 'Overview — what changed, everywhere, since 2014',
  description:
    'Every area of Indian policy, the movement in each, and one control that runs the whole page through the years. Then every record, year by year.',
};

/**
 * THE OVERVIEW — rebuilt 2026-08-11, and the rebuild is a correction rather than a refinement.
 *
 * THE VIEW THIS REPLACES DREW THE FILING SYSTEM. One cell per area-year, coloured by whether the
 * observation was verified, approximate or absent. Every cell was true and the page was about the
 * wrong thing: it showed **the corpus's confidence in its own holdings**, which is a question only
 * this instrument's author asks. The reader the overview exists for — the one who will never open
 * a record — wants to know what happened to schools, to electricity, to jobs.
 *
 * SO THE UNIT IS MOVEMENT NOW, NOT STATUS. Each area leads with a real series: real values, real
 * span, its change stated in words. Status has not been dropped — rule 3 forbids that, and the
 * point markers and readings still carry it — but it has stopped being the subject.
 *
 * WHAT THE HEADLINE SERIES MAY BE, AND THE TWO IT MAY NOT.
 *   · **Not GDP growth** for macroeconomy. Rule 5: three incompatible bases, all three always, in
 *     base order. A single sparkline of one base is precisely the thing that rule forbids, so the
 *     macro card leads with CPI inflation — which a reader also actually feels.
 *   · **Not an NPA ratio** for banking. Rule 5b: an NPA ratio never renders alone and never
 *     without its reporting basis, and a card has room for neither the write-off adjustment nor
 *     the domestic/global basis. The card leads with loans written off instead.
 * Both exclusions are enforced below by name, with the rule cited, so a later edit that "improves"
 * the pick has to read the reason first.
 *
 * AND WHERE NO SERIES CAN CARRY A CARD, THE CARD SAYS WHAT THE AREA HOLDS INSTEAD. Kashmir holds
 * no series as its own subject and poverty's last official line was measured for 2011-12. Forcing
 * a chart into either would be inventing a picture; saying so is the finding.
 */

const Y_MIN = 2010;
const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));

/** The window the readout counts over — the period this instrument covers. */
const TERM_YEARS = Array.from({ length: 13 }, (_, i) => 2014 + i);

/**
 * ROW ORDER IS RECOGNISABILITY, NOT EVIDENCE STRENGTH — operator decision 2026-08-11.
 *
 * Ordering by how well an area is measured puts the impeccably documented and unfelt at the top:
 * Federalism is 100 per cent verified over 236 observations and is the last thing a reader who has
 * never opened this site wants to meet. Jobs, roads and health come first even though those rows
 * are thinner. **The order is editorial and is written down here rather than emerging from a sort**,
 * because a sort would have to rank on something, and every quantity available to rank on is one
 * this instrument refuses to present as a ranking.
 */
const ORDER = [
  'employment',
  'infrastructure',
  'human-development',
  'education',
  'macro',
  'welfare',
  'banking',
  'poverty',
  'environment',
  'defence',
  'kashmir',
  'foreign',
  'governance',
  'federalism',
];

/**
 * Composition in the corpus's OWN `type` words, pluralised and nothing more.
 *
 * The design brief proposed a friendlier vocabulary — programmes, surveys, agreements,
 * constitutional duties, episodes. Three of those five name nothing the corpus holds, and glossing
 * `institutional` as "constitutional duties" would put a **second vocabulary** for the `type` axis
 * on a public surface: the prose-shadow defect by construction, since the gloss cannot move when
 * the value does. The corpus's words are the ones a reader meets on every record page anyway.
 */
function composition(types: string[]): string {
  const counts = new Map<string, number>();
  for (const t of types) counts.set(t, (counts.get(t) ?? 0) + 1);
  const say = (t: string, n: number) =>
    `${n} ${t === 'institutional' ? (n === 1 ? 'institutional change' : 'institutional changes') : n === 1 ? t : `${t}s`}`;
  return [...counts]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t, n]) => say(t, n))
    .join(' · ');
}

/**
 * The headline series per area, chosen and pinned rather than derived.
 *
 * A rule like "the longest series" would pick `jk-detenus-psi` to represent governance and
 * `edu-spend-gdp-edu-depts` to represent education — both real, neither the thing a reader came
 * for. The choice is editorial, so it is written down where it can be argued with.
 */
const HEADLINE: Record<string, string> = {
  macro: 'cpi-inflation', // NOT gdp-growth-*: rule 5 forbids one base alone.
  banking: 'bank-writeoffs-annual', // NOT *-npa: rule 5b forbids an NPA ratio without its basis.
  education: 'higher-ed-ger',
  environment: 'res-capacity-share',
  federalism: 'fc-vertical-devolution-share',
  infrastructure: 'nh-construction-pace',
  employment: 'lfpr-overall',
  welfare: 'msp-paddy',
  foreign: 'exports-gdp',
  'human-development': 'sanitation-basic',
  defence: 'jk-security-forces-killed',
  governance: 'cag-union-audit-reports-tabled',
  poverty: 'poverty-tendulkar',
};

/**
 * Areas that cannot honestly lead with a line, and what they hold instead.
 *
 * These are authored, never derived, because each states a different reason and a generic fallback
 * would flatten three findings into one shrug. The fallback below exists only so a future area
 * cannot render an empty card silently — if it ever fires, the right response is to write the
 * area's real reason here, not to leave the generic one standing.
 */
const INSTEAD: Record<string, string> = {
  kashmir:
    'No series files Kashmir as its own subject: its thirty indicator series are filed under defence, governance and federalism and read through the Kashmir lens. What this area holds is forty-six records — detentions, communications shutdowns, human-rights complaints — and counts that come largely from hospitals, courts and commissions rather than from the state.',
  poverty:
    'India’s last official poverty headcount was measured for 2011-12: 21.9 per cent on the Tendulkar methodology, down from 37.2 per cent in 2004-05. Nothing comparable has been published since, so there is no line to draw across the period this site covers — the absence is the finding, and it sits before the window every other card shares.',
};

function toO(s: Series): OSeries | null {
  const pts = s.points
    .filter((p) => p.country === 'IND' && p.value !== null && yearOf(p.period) >= Y_MIN)
    .map((p) => ({ y: yearOf(p.period), v: p.value as number, s: p.status }))
    .sort((a, b) => a.y - b.y);
  if (pts.length < 2) return null;
  return {
    id: s.id,
    title: s.title,
    unit: s.unit,
    pts,
    brk: (s.breaks ?? []).map((b) => yearOf(b.period)),
    before: s.points.some((p) => p.country === 'IND' && yearOf(p.period) < Y_MIN),
  };
}

export default function Overview() {
  /**
   * Computed here, never quoted. The design scope recorded 0.91 when it was written and the live
   * value is 0.92 — a rate stated from memory is the deferral defect this instrument has paid for
   * more than once, and this is the same computation `components/Evaluability.tsx` runs.
   */
  const rho = (() => {
    const EVALUATED = new Set(['worked', 'partly', 'failed', 'reversed']);
    const rs = DOMAINS.map((d) => {
      const all = ledger.filter((l) => l.domains.includes(d));
      return {
        n: all.length,
        pct: all.length ? (100 * all.filter((l) => EVALUATED.has(l.assessment)).length) / all.length : 0,
        reformPct: all.length ? (100 * all.filter((l) => l.type === 'reform').length) / all.length : 0,
      };
    }).filter((r) => r.n > 0);
    const rank = (xs: number[]) => {
      const sorted = [...xs].sort((a, b) => a - b);
      return xs.map((x) => sorted.indexOf(x) + 1);
    };
    const rr = rank(rs.map((r) => r.reformPct));
    const re = rank(rs.map((r) => r.pct));
    const n = rs.length;
    const d2 = rr.reduce((t, x, i) => t + (x - re[i]) ** 2, 0);
    return 1 - (6 * d2) / (n * (n * n - 1));
  })();

  const domains: ODomain[] = DOMAINS.map((d) => {
    const own = series.filter((s) => s.domain === d);
    // A lens-only area reads through its lens rather than as an empty row — drawing Kashmir blank
    // would assert that nothing about it is measured, which is false and is the misreading the
    // lens axis exists to prevent.
    const asLens = (LENSES as readonly string[]).includes(d) ? (d as unknown as Lens) : null;
    const list = own.length > 0 ? own : asLens ? seriesUnderLens(asLens) : [];
    const records = ledger.filter((l) => l.domains.includes(d)).length;

    const chartable = list.map(toO).filter((s): s is OSeries => s !== null);
    const head = chartable.find((s) => s.id === HEADLINE[d]) ?? null;

    // The readout. Counted over India's own points only: a peer-panel observation is a fact about
    // Bangladesh or Vietnam and would inflate an area's apparent coverage of India.
    const pts = list.flatMap((s) => s.points.filter((p) => p.country === 'IND' && p.value !== null));
    const verified = pts.filter((p) => p.status === 'verified').length;

    return {
      key: d,
      label: DOMAIN_LABELS[d],
      nSeries: list.length,
      nRecords: records,
      head: INSTEAD[d] ? null : head,
      instead: INSTEAD[d] ?? (head ? null : 'This area holds no series long enough to chart.'),
      rest: chartable.filter((s) => s.id !== head?.id),
      obs: pts.length,
      status: {
        verified,
        approx: pts.filter((p) => p.status === 'approx').length,
        pending: pts.filter((p) => p.status === 'pending').length,
      },
      yearsWith: TERM_YEARS.filter((y) => pts.some((p) => yearOf(p.period) === y)).length,
      yearsTotal: TERM_YEARS.length,
      breaks: list.reduce((t, s) => t + (s.breaks?.length ?? 0), 0),
      composition: composition(ledger.filter((l) => l.domains.includes(d)).map((l) => l.type)),
    };
  })
    .filter((d) => d.nSeries > 0 || d.nRecords > 0)
    .sort((a, b) => {
      const ia = ORDER.indexOf(a.key);
      const ib = ORDER.indexOf(b.key);
      // An area missing from ORDER sorts last rather than to position 0, which is what indexOf's
      // -1 would do silently — a new domain would otherwise open the page.
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

  // Every record, grouped by the year it begins. All of them: choosing "the important ones" is a
  // ranking this instrument refuses to make.
  const byYear = new Map<number, typeof ledger>();
  for (const l of ledger) {
    const y = yearOf(l.date);
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(l);
  }
  const baseline = [...byYear.entries()]
    .filter(([y]) => y < 2014)
    .flatMap(([, ls]) => ls)
    .sort((a, b) => a.date.localeCompare(b.date));
  const termYears = [...byYear.keys()].filter((y) => y >= 2014).sort((a, b) => a - b);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / overview
      </p>
      <h1 className="home-lead">What changed, everywhere, since 2014</h1>
      <p className="lede">
        One area of policy per card, each leading with a real measurement and where it went. Move
        the year control and the whole page moves with it. Open any card for every series behind
        it, or any title for the records themselves.
      </p>

      <OverviewBoard domains={domains} />

      <p className="prose-note board-caption">
        <strong>Every chart shares the same years and none shares a scale.</strong> Left to right is
        2010 to 2026 on all of them, so a line that stops short really did stop — that is the point
        of putting them side by side. Up and down is scaled to each series&rsquo; own range, because
        the units are per cent, rupees, kilometres and people: <strong>a taller line is not a bigger
        number,</strong> and heights cannot be compared between cards. A red edge is a declared
        change of basis — figures either side are not the same measurement. A hollow point was
        published as an approximation. <span className="mono">◀</span> means the series holds
        observations from before 2010, not drawn here.
      </p>

      {/* §4c's ruling, applied to this surface. The permitted claim is about the record set; a
          claim about what India measures is not available from a corpus whose own selection is
          unestablished. `tools/evaluability-wording.mjs` binds the literal forbidden phrasings and
          cannot bind the claim — see its header — so the wording here is a reading, not a pass. */}
      <p className="prose-note board-framing">
        <span className="label">What these cards are about</span> They describe{' '}
        <strong>what this record set holds</strong> — the series entered here, their observations
        and their status. They are not a measure of what the Indian state measures. Which
        government claims were never entered into this corpus has not been established, and no
        amount of further research makes that sample a known one.
      </p>
      <p className="prose-note">
        <span className="label">Why the thin areas are thin</span> Across the fourteen areas, the
        share of records that are announced <em>reforms</em> and the share that could be scored
        against an outcome move together almost exactly — Spearman&rsquo;s &rho; = {rho.toFixed(2)}.
        So an area holding few scored outcomes is largely an area that <strong>contains</strong>{' '}
        institutional practice and constitutional duty rather than announced programmes. That is
        what the <em>Made of</em> line on each card is for: it sits beside the numbers so the
        composition and the coverage are read in the same glance, rather than the second being
        taken for a verdict on the first.{' '}
        <Link href="/method/">How records are scored, and what a verdict does not mean</Link>.
      </p>

      <h2>What happened, year by year</h2>
      <p className="prose-note">
        Every record in the ledger, grouped by the year it begins — all of them, because choosing
        the important ones would be a ranking this instrument does not make. Each carries its
        verdict on its own page, with the reasoning beside it.
      </p>

      {baseline.length > 0 ? (
        <details className="yeargroup">
          <summary>
            <span className="yeargroup-year">Before May 2014</span>
            <span className="yeargroup-count">
              {baseline.length} records · baseline context, not scored
            </span>
          </summary>
          <ul className="yeargroup-list">
            {baseline.map((l) => (
              <li key={l.id}>
                <Link href={`/ledger/${l.id}/`}>{l.title}</Link>
                <span className="yeargroup-meta">
                  {formatDateRange(l.date, l.dateEnd)} ·{' '}
                  {l.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
                </span>
                <RecordMarks record={l} />
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {termYears.map((y) => {
        const ls = byYear.get(y)!.sort((a, b) => a.date.localeCompare(b.date));
        return (
          <details key={y} className="yeargroup" id={`y${y}`}>
            <summary>
              <span className="yeargroup-year">{y}</span>
              <span className="yeargroup-count">
                {ls.length} record{ls.length === 1 ? '' : 's'} begin{ls.length === 1 ? 's' : ''}
              </span>
            </summary>
            <ul className="yeargroup-list">
              {ls.map((l) => (
                <li key={l.id}>
                  <Link href={`/ledger/${l.id}/`}>{l.title}</Link>
                  <span className="yeargroup-meta">
                    {formatDateRange(l.date, l.dateEnd)} ·{' '}
                    {l.domains.map((d) => DOMAIN_LABELS[d]).join(', ')}
                  </span>
                  <RecordMarks record={l} />
                </li>
              ))}
            </ul>
          </details>
        );
      })}
    </>
  );
}
