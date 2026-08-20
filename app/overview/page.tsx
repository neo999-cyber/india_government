import Link from 'next/link';
import type { Metadata } from 'next';
import { ledger, series, seriesUnderLens } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';
import { DOMAINS, LENSES } from '@/lib/types';
import type { Lens, Series, Domain } from '@/lib/types';
import { OverviewBoard } from '@/components/OverviewBoard';
import type { ODomain, OSeries } from '@/components/OverviewBoard';

export const metadata: Metadata = {
  title: 'Atlas of change since 2014',
  description:
    'A coordinated visual view of change across every topic in the record, with one shared year control.',
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
export const HEADLINE: Record<string, string> = {
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
export const INSTEAD: Record<string, string> = {
  kashmir:
    'No series files Kashmir as its own subject: its thirty indicator series are filed under defence, governance and federalism and read through the Kashmir lens. What this topic holds is forty-six records — detentions, communications shutdowns, human-rights complaints — and counts that come largely from hospitals, courts and commissions rather than from the state.',
  poverty:
    'India’s last official poverty headcount was measured for 2011-12: 21.9 per cent on the Tendulkar methodology, down from 37.2 per cent in 2004-05. Nothing comparable has been published since, so there is no line to draw across the period this site covers — the absence is the finding, and it sits before the window every other card shares.',
};

export function toO(s: Series): OSeries | null {
  const pts = s.points
    .filter((p) => p.country === 'IND' && p.value !== null && yearOf(p.period) >= Y_MIN)
    .map((p) => ({ y: yearOf(p.period), v: p.value as number, s: p.status }))
    .sort((a, b) => a.y - b.y);
  if (pts.length < 2) return null;
  return {
    id: s.id,
    title: s.title,
    domain: s.domain,
    unit: s.unit,
    pts,
    brk: (s.breaks ?? []).map((b) => yearOf(b.period)),
    before: s.points.some((p) => p.country === 'IND' && yearOf(p.period) < Y_MIN),
  };
}

/**
 * ITEM 1 — THE EVENTS, derived and never inferred.
 *
 * A year appears for an area when a record the area DECLARES carries a date in that year. Records
 * carry more than one domain, so one record can mark more than one area — that is the corpus's own
 * filing and not a duplication. Measured at the time of writing: **223 records, all 223 carrying a
 * parseable date, 220 of them inside the 2010-2026 chart window**; the 3 outside are pre-2010
 * baseline records and are dropped rather than clamped to the edge, because a mark at 2010 would
 * assert a date the record does not have.
 *
 * **12 of 14 areas end up carrying marks. Two do not — Kashmir and Poverty — and neither is quiet.**
 * They lead with no chart, so there is nothing to hang a tick on; Kashmir has records in 15 distinct
 * years and is among the most eventful areas in the corpus. The card states that in words, because
 * a row of no ticks is otherwise indistinguishable from an area where nothing happened.
 */
function eventYears(d: string) {
  const by = new Map<number, number>();
  for (const l of ledger) {
    if (!l.domains.includes(d as never)) continue;
    const y = Number(String(l.date).slice(0, 4));
    if (!Number.isFinite(y) || y < Y_MIN || y > 2026) continue;
    by.set(y, (by.get(y) ?? 0) + 1);
  }
  return [...by.entries()]
    .map(([year, n]) => ({ year, n }))
    .sort((a, b) => a.year - b.year);
}

/**
 * THE BOARD'S DATA, PROJECTED FOR THE FOURTEEN TOPIC PORTRAITS. It carries the headline line,
 * counts, composition, chronology and a title-only search index. Full non-headline records remain
 * on the merged topic pages; the Compare mode requests the already-published `/data/v1` contract
 * only when a reader opens that mode. Keeping those two payloads out of this projection is what
 * prevents the default Atlas document from becoming a second copy of the record database.
 */
export function buildBoard(keys: Domain[]): ODomain[] {
  return keys.map((d) => {
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
      instead: INSTEAD[d] ?? (head ? null : 'This topic holds no series long enough to chart.'),
      searchText: list.map((record) => record.title).join(' '),
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
      events: eventYears(d),
    };
  });
}
export default function Overview() {
  const domains: ODomain[] = buildBoard([...DOMAINS])
    .filter((d) => d.nSeries > 0 || d.nRecords > 0)
    .sort((a, b) => {
      const ia = ORDER.indexOf(a.key);
      const ib = ORDER.indexOf(b.key);
      // An area missing from ORDER sorts last rather than to position 0, which is what indexOf's
      // -1 would do silently — a new domain would otherwise open the page.
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

  return (
    <>
      <p className="crumb">
        <Link prefetch={false} href="/">instrument</Link> / atlas
      </p>
      <p className="home-kicker mono">A visual reading of the public record</p>
      <h1 className="home-lead">Atlas of change since 2014</h1>
      <p className="lede">
        Move the year control and every topic moves with it. Each card leads with one real series;
        open it for the other indicators, official records, disputes and caveats behind the line.
      </p>
      {/* ============ `/domains/` WAS FOLDED IN HERE ON 2026-08-14 ==============================
          It was fourteen cards linking to the same fourteen topic pages these cards link to, with
          the same counts and the same lead figure derived by the same criterion. **The only thing
          it carried that this board did not was the one-line character** — so that became a prop
          and the page went. `character` is off on the landing board, whose cut is five short cards.

          The topics remain fourteen, in the schema's own order, and nothing is ranked. */}

      {/* Directly under this page's h1, so the cards are its first sections: h2. */}
      <OverviewBoard domains={domains} headingLevel={2} character />

      <p className="prose-note board-framing">
        <span className="label">What every Atlas view preserves</span> No mode creates a government
        score, ranks a topic or fills a missing observation. Topic and year controls change the
        view, not the records; every qualification remains attached to its underlying page.
      </p>

      <section className="atlas-year-section" aria-labelledby="atlas-years-title">
        <div className="atlas-year-head">
          <div>
            <p className="home-kicker mono">Open the underlying chronology</p>
            <h2 id="atlas-years-title">One year at a time</h2>
          </div>
          <Link href="/years/">See the complete year index →</Link>
        </div>
        <ol
          className="atlas-years"
          data-scroll-x
          aria-label="Years 2014 to 2026; scroll horizontally to see every year"
          tabIndex={0}
        >
          {TERM_YEARS.map((year) => {
            const term = year < 2019 ? 'First term' : year < 2024 ? 'Second term' : 'Third term';
            return (
              <li key={year} data-term={term}>
                <Link href={`/years/${year}/`}>
                  <span>{year}</span>
                  <small>{term}</small>
                </Link>
              </li>
            );
          })}
        </ol>
        <p className="prose-note">
          Each year page contains the full dated ledger for that year. The equal-width points are
          navigation; they do not encode the number or importance of records.
        </p>
      </section>
    </>
  );
}
