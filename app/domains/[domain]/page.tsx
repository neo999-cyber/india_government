import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  assessmentCounts,
  ledgerInDomain,
  pairHref,
  pairsInDomain,
  pairsUnderLens,
  provenanceInDomain,
  seriesInDomain,
  seriesUnderLens,
  statusCounts,
} from '@/lib/data';
import {
  ASSESSMENT_LABELS,
  DIRECTION_OF_BIAS_LABELS,
  DOMAIN_LABELS,
  PAIR_KIND_LABELS,
  TERM_SHORT,
  formatDateRange,
} from '@/lib/format';
import { DOMAINS, LENSES, LENS_ONLY, type Domain, type Lens } from '@/lib/types';
import type { Pair, Series } from '@/lib/types';
import { CaveatRow, RecordMarks, REASON_KIND_LABELS, StatusKey, StatusTally, TallyGloss, TierTag } from '@/components/marks';
import { SeriesChart } from '@/components/SeriesChart';
import { DomainTabs } from '@/components/DomainTabs';
import { DOMAIN_CHARACTER, DOMAIN_EVIDENCE, DOMAIN_PERIODS } from '@/lib/domain-copy';
import type { LedgerRecord, Unmeasured } from '@/lib/types';

type Props = { params: Promise<{ domain: string }> };

export function generateStaticParams() {
  return DOMAINS.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  const label = DOMAIN_LABELS[domain as Domain];
  return { title: label ?? 'Domain' };
}

export const DOMAIN_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'indicators', label: 'Indicators' },
  { key: 'records', label: 'Government records' },
  { key: 'disputes', label: 'Disputes' },
  { key: 'missing', label: 'Missing data' },
] as const;
export type DomainTab = (typeof DOMAIN_TABS)[number]['key'];

export default async function DomainPage({ params }: Props) {
  const { domain } = await params;
  if (!DOMAINS.includes(domain as Domain)) notFound();
  return <DomainSurface d={domain as Domain} tab="overview" />;
}

/**
 * ONE SURFACE, FIVE ADDRESSES — §5's local tabs, as real routes rather than as anchors.
 *
 * **A fragment would have satisfied the letter of *each tab is a URL* and not the point of it.**
 * The three disclosures this replaces already held their content in the DOM; an anchor-tab is the
 * same long page with a different control on it. A route gives each tab its own title, its own
 * share card, and a state a reader can send to someone.
 *
 * **WHAT CONSTRAINED THE SPLIT.** `domain-coverage` asserts that every record declaring a domain
 * appears on `/domains/<d>/` itself — 1,137 references — so the tables could not simply move out
 * from under the overview. The overview therefore lists EVERY record rather than six and a
 * disclosure: the tab holds the table with verdicts and marks, the overview holds the links. That
 * is not a workaround; an overview that omitted half its records to a sub-page would be the
 * reachability defect that gate exists to catch, introduced by the fix for a different one.
 */
export async function DomainSurface({ d, tab }: { d: Domain; tab: DomainTab }) {

  const s = seriesInDomain(d);
  const l = ledgerInDomain(d);
  const p = provenanceInDomain(d);
  const counts = assessmentCounts(l);

  // The lens axis. `domain` is what a record is ABOUT, `lenses[]` what it also BEARS ON, and the
  // two are never pooled: a J&K militancy count is a defence series read under the Kashmir lens,
  // and merging it into the Kashmir subject list would restate the conflation `lenses[]` exists to
  // remove. Both blocks render only where they are non-empty, so a domain that is nobody's lens
  // and holds no pairs looks exactly as it did.
  //
  // The narrowing below is load-bearing rather than ceremonial. Until phase 14 every lens was also
  // a domain, so a Domain could be handed to a lens query and the compiler agreed. Six counterparty
  // lenses that are not domains ended that, and `isLens` is now the guard that says which of the
  // fourteen domain values may be asked a lens question at all.
  const asLens = (LENSES as readonly string[]).includes(d) ? (d as unknown as Lens) : null;
  const isLens = asLens !== null;
  const lensOnly = (LENS_ONLY as readonly string[]).includes(d);
  const lensed = asLens ? seriesUnderLens(asLens) : [];
  const pairsHere = pairsInDomain(d);
  const pairsLensed = asLens ? pairsUnderLens(asLens) : [];

  /**
   * THE LEAD, AND THE CRITERION IS THE POINT.
   *
   * Chosen for the longest unbroken run of India observations — consecutive periods with no
   * declared break inside them. **A stated, checkable criterion is not a ranking**, which is why
   * this page may lead with one series where the rule against ranking would otherwise force it to
   * dump all thirty-one at equal weight. See CLAUDE.md.
   *
   * It picks a DIFFERENT series from the overview board's pinned headline, deliberately: the board
   * pins by hand with the rule cited (no GDP under rule 5, no NPA ratio under rule 5b), and this
   * derives. Two leads chosen two ways for two jobs, and each says which it is.
   */
  const chartable = (s.length ? s : lensed).filter(
    (x) => x.points.filter((pt) => pt.country === 'IND' && pt.value !== null).length >= 2,
  );
  const ranked = chartable
    .map((x) => ({ x, run: longestRun(x) }))
    .sort((a, b) => b.run - a.run || a.x.id.localeCompare(b.x.id));
  const lead = ranked[0]?.x ?? null;
  const leadRun = ranked[0]?.run ?? 0;
  const grid = ranked.slice(1, 5).map((r) => r.x);

  // Years in which a record filed under this area was announced, deduplicated, most-cited first
  // then earliest. Capped at three: the lead chart has room for three labels and a fourth overlaps.
  const evYears = new Map<number, number>();
  for (const r of l) {
    const y = Number(String(r.date).slice(0, 4));
    if (Number.isFinite(y)) evYears.set(y, (evYears.get(y) ?? 0) + 1);
  }
  const leadEvents = [...evYears.entries()]
    .sort((a, b) => b[1] - a[1] || a[0] - b[0])
    .slice(0, 3)
    .sort((a, b) => a[0] - b[0])
    .map(([year, n]) => ({ year, label: `${year} · ${n} record${n === 1 ? '' : 's'}` }));

  const periods = DOMAIN_PERIODS[d];
  // THE COUNTS ARE DERIVED, the sentence beside them is authored. A hardcoded "94 of 95" would be
  // a claim about the past in the present tense the first time a series is added.
  const evidence = DOMAIN_EVIDENCE[d];
  // COUNT THE SERIES A READER OF THIS PAGE ACTUALLY MEETS. Where an area files none of its own —
  // `kashmir` files zero and is read entirely through its lens — counting `s` yields "0 of 0
  // observations", which asserts the area is unmeasured. It is the exact misreading the note exists
  // to stop, produced by the note. The page already picks `s.length ? s : lensed` for its charts;
  // the note now uses the same set, so the prose and the figures beside it describe one thing.
  const counted = s.length ? s : lensed;
  const indiaPoints = counted.flatMap((x) => x.points.filter((pt) => pt.country === 'IND' && pt.value !== null));
  const verifiedPoints = indiaPoints.filter((pt) => pt.status === 'verified').length;
  const approxPoints = indiaPoints.filter((pt) => pt.status === 'approx').length;
  // Series carrying a single observation — the shape welfare's note is about, and worth printing on
  // every area that carries one, because it is the difference between a series and a running total.
  const onePointSeries = counted.filter(
    (x) => x.points.filter((pt) => pt.country === 'IND' && pt.value !== null).length === 1,
  ).length;
  const byDate = [...l].sort((a, b) => b.date.localeCompare(a.date));
  /**
   * Every declared absence in this area, from series and ledger alike, each carrying the record
   * that declared it. Built here rather than in the panel so the count is available to the tab
   * strip, which must be able to say the tab is empty before a reader opens it.
   */
  const absences = [
    ...s.map((x) => ({ rec: x, href: `/series/${x.id}/`, title: x.title, from: x.id })),
    ...lensed.map((x) => ({ rec: x, href: `/series/${x.id}/`, title: x.title, from: x.id })),
    ...l.map((x) => ({ rec: x, href: `/ledger/${x.id}/`, title: x.title, from: x.id })),
  ].flatMap((e) =>
    ((e.rec as { unmeasured?: Unmeasured[] }).unmeasured ?? []).map((u) => ({
      ...e,
      what: u.what,
      why: u.why,
      reasonKind: u.reasonKind,
    })),
  );

  const shownRecords = byDate.slice(0, 6);
  const restRecords = byDate.slice(6);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/domains/">domains</Link> / {d}
      </p>
      <h1 className="page-lead">{DOMAIN_LABELS[d]}</h1>
      <p className="standfirst">
        {DOMAIN_CHARACTER[d]}
        {isLens ? (
          <>
            {' '}
            It is a cross-cutting lens
            {lensOnly
              ? ', and only that — no record may file it as its own subject.'
              : ', and a subject in its own right — a record may file it as either, never as both.'}
          </>
        ) : null}
      </p>

      <DomainTabs
        d={d}
        active={tab}
        counts={{
          indicators: s.length + lensed.length,
          records: l.length,
          disputes: p.length,
          missing: absences.length,
        }}
      />

      <p className="counts-line mono">
        {s.length} series{lensed.length ? ` · ${lensed.length} under this lens` : ''} · {l.length}{' '}
        records · {p.length} disputes
      </p>

      {s.length + lensed.length + l.length === 0 ? (
        <div className="stub">
          <span className="label">Unopened domain</span>
          No series and no ledger records have been researched into this domain yet. Nothing is
          inferred to fill the gap.
        </div>
      ) : null}

      {/* ---- THE LEAD. One chart at full width, chosen by a STATED criterion. ---------------- */}
      {lead ? (
        <figure className="dlead">
          {/* NO CAPTION OF ITS OWN. `SeriesChart` renders the title, the figure, the unit, the
              span and the source line — a wrapper repeating any of them prints it twice, which the
              first build of this page did with both the title and the source. The rule above and
              the criterion note below are all this wrapper adds. */}
          <div className="dlead-rule" />
          <SeriesChart series={lead} events={leadEvents} highlightLast />
          <p className="dlead-note">
            <strong>Chosen for the longest unbroken run in this area, not for importance.</strong>{' '}
            {leadRun} consecutive observations with no declared break inside them, which is the
            longest of the {(s.length || lensed.length)} series here.
            {leadEvents.length > 0 ? (
              <>
                {' '}
                The brass ticks are years in which a record filed under this area was announced —{' '}
                <strong>a note of what else was happening, not an explanation of the shape.</strong>
              </>
            ) : null}
          </p>
        </figure>
      ) : null}

      {/* ---- WHAT CHANGED. Authored, per period, from the records. One of fourteen written. --- */}
      {evidence ? (
        <p className="evidence-note">
          <span className="label">How this area is published</span> {evidence}{' '}
          <span className="mono">
            {approxPoints} of {indiaPoints.length} India observations are published as
            approximations; {verifiedPoints} {verifiedPoints === 1 ? 'is' : 'are'} verified.{' '}
            {onePointSeries} of {counted.length} series carry a single observation
            {s.length === 0 && lensed.length > 0 ? ', all of them read through this lens' : ''}.
          </span>
        </p>
      ) : null}

      {periods ? (
        <section className="periods">
          <div className="sec-h">
            <h2>What changed</h2>
            <p className="sec-note">
              {periods.length} periods, written from the records in this area. Each names the
              records it draws on.
            </p>
          </div>
          {periods.map((per) => (
            <div key={per.years} className="per">
              <span className="per-yrs mono">{per.years}</span>
              <div>
                <h3>{per.heading}</h3>
                <p>{per.body}</p>
                <p className="per-from mono">
                  {per.from.map((id, i) => (
                    <span key={id}>
                      {i > 0 ? ' · ' : ''}
                      <Link href={`/ledger/${id}/`}>{id}</Link>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {/* ---- MORE CHARTS. Same criterion, stated again where it is applied. ------------------ */}
      {grid.length > 0 ? (
        <section className="charts">
          <div className="sec-h">
            <h2>
              {grid.length} more, side by side
            </h2>
            <p className="sec-note">
              The next longest unbroken runs in this area — a stated criterion, not a ranking. All{' '}
              {(s.length || lensed.length)} series are below.
            </p>
          </div>
          <div className="cgrid">
            {grid.map((g) => (
              <div key={g.id} className="cw">
                <h4>
                  <Link href={`/series/${g.id}/`}>{g.title}</Link>
                </h4>
                <MiniLine series={g} />
                <p className="cw-val">
                  <span className="figure">{lastValue(g)}</span>
                  <span className="mono t-note">
                    {g.unit} · {lastPeriod(g)}
                  </span>
                </p>
                <RecordMarks record={g} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* ---- RECORDS as readable items, grouped by term, a handful shown. -------------------- */}
      {l.length > 0 ? (
        <section className="drecords">
          <div className="sec-h">
            <h2>{l.length} records</h2>
            <p className="sec-note">
              Everything entered in this area, most recent first. Nothing is ranked.
            </p>
          </div>
          {shownRecords.map((r) => (
            <RecordItem key={r.id} record={r} />
          ))}
          {/* NO DISCLOSURE. Every record in the area is listed here, because `domain-coverage`
              asserts each one appears on `/domains/<d>/` and because an overview that hides half
              its subject behind a control is the thing the tabs replace. The TABLE, with verdicts,
              confidence and marks, is the Government records tab. */}
          {restRecords.map((r) => (
            <RecordItem key={r.id} record={r} />
          ))}
        </section>
      ) : null}

      {tab === 'indicators' ? (
        <>
      {s.length === 0 ? (
        <p className="prose-note">
          No series has this domain as its subject.
          {lensed.length
            ? ' The series below are read under it as a lens — their subjects sit elsewhere.'
            : ''}
        </p>
      ) : (
        <SeriesBlock items={s} />
      )}

      {lensed.length ? (
        <>
          <h2>Series under this lens</h2>
          <p className="prose-note">
            {lensed.length} series whose subject is another domain and which are also read under{' '}
            <span className="mono">{d}</span>. Listed apart from the table above rather than pooled
            into it: what a series measures and what it bears on are two different claims, and a
            single-valued <span className="mono">domain</span> could carry only the first. The
            Subject column names the domain each one is actually filed under.
          </p>
          <SeriesBlock items={lensed} showSubject />
        </>
      ) : null}
        </>
      ) : null}

      {tab === 'records' ? (
        <>
      {l.length === 0 ? (
        <p className="prose-note">No ledger records in this domain.</p>
      ) : (
        <>
          <p className="status-key">
            {Object.entries(counts).map(([k, v]) => (
              <span key={k}>
                {v} {ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}
              </span>
            ))}
          </p>
<TallyGloss />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Term</th>
                  <th>Record</th>
                  <th>Assessment</th>
                  {/* view-parity's one defect find: /ledger and /terms carried this column and
                      the two domain-axis tables did not, so the same verdict listed on four
                      surfaces stated its evidential weight on only two. 170 high · 52 medium ·
                      1 low — and the low one especially is a qualification a reader must meet
                      wherever the verdict is met. */}
                  <th>Conf.</th>
                </tr>
              </thead>
                {[...l]
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((x) => (
                    <tbody key={x.id}>
                      <tr>
                      <td className="mono">
                      <Link href={`/ledger/${x.id}/`}>{x.id}</Link>
                      </td>
                      <td className="mono t-note">{formatDateRange(x.date, x.dateEnd)}</td>
                      <td className="mono">{TERM_SHORT[x.term]}</td>
                      <td>
                      <Link href={`/ledger/${x.id}/`}>{x.title}</Link>
                      <RecordMarks record={x} deferCaveat />
                      </td>
                      <td className="t-note">{ASSESSMENT_LABELS[x.assessment]}</td>
                      <td className="mono t-note">{x.confidence}</td>
                      </tr>
                      <CaveatRow record={x} colSpan={8} />
                    </tbody>
                  ))}
            </table>
          </div>
        </>
      )}

      {pairsHere.length + pairsLensed.length ? (
        <>
          <h2>Pairs</h2>
          <p className="prose-note">
            Two things the instrument refuses to show apart — a coverage figure against what it
            converted into, or two instruments measuring the same quantity and disagreeing. A pair
            has no page of its own: it renders inside the first series that names it, which is
            where the link goes.
          </p>
          <PairRows items={pairsHere} />
          {pairsLensed.length ? (
            <>
              <p className="prose-note">
                Under this lens — subject filed elsewhere:
              </p>
              <PairRows items={pairsLensed} showSubject />
            </>
          ) : null}
        </>
      ) : null}

        </>
      ) : null}

      {tab === 'disputes' ? (
        <>
      {p.length === 0 ? (
        <p className="prose-note">No disputes recorded against this domain.</p>
      ) : (
        <div className="grid">
          {p.map((x) => (
            <Link key={x.id} href={`/provenance/${x.id}/`}>
              <span className="label">
                {x.id}
                {x.affectsDomains.includes('all') ? ' · all domains' : ''}
              </span>
              <span className="grid-title">{x.title}</span>
              <span className="grid-meta">
                {DIRECTION_OF_BIAS_LABELS[x.directionOfBias] ?? x.directionOfBias} · bridge{' '}
                {x.bridgeExists ? 'exists' : 'none'}
              </span>
            </Link>
          ))}
        </div>
      )}
        </>
      ) : null}

      {/* ============================ MISSING DATA — NEW CONTENT, NOT A RE-ARRANGEMENT ========
          §5's fifth tab had nothing behind it. The other four move existing sections; this one did
          not exist on any domain page, and every area has something for it — 4 declarations in
          poverty to 181 in governance, 374 across the corpus.

          **Rule 4a governs the form and rule 4b the reach.** Each entry is dashed, unfilled and
          carries no figure, because an absence is a finding and must not be styled as a panel of
          results; and it names the record that declared it, so a reader can get to the ground. */}
      {tab === 'missing' ? (
        absences.length === 0 ? (
          <p className="prose-note">
            No record in this area declares an unmeasured quantity. That is a statement about what
            has been entered, not a claim that everything here is measured.
          </p>
        ) : (
          <>
            <p className="prose-note">
              {absences.length} {absences.length === 1 ? 'quantity' : 'quantities'} that records in
              this area say {absences.length === 1 ? 'is' : 'are'} not measured, each named by the
              record that declared it. <strong>These are findings, not gaps in this record</strong> —
              a declared absence is something the corpus establishes about the published statistics,
              and nothing is estimated into the space.
            </p>
            <div className="miss-list">
              {absences.map((a, k) => (
                <div key={`${a.from}-${k}`} className="miss">
                  <p className="miss-what">{a.what}</p>
                  {/* AN ATTRIBUTION, NOT A LISTING — and it uses the class the corpus already has
                      for that. The subject of this entry is the ABSENCE; the record is named as the
                      body that declared it, exactly as *"Declared on <record>"* does on a pair
                      side. Written first as a bare title link, `unrecognised-rows` reported 701 —
                      the eighth new shape, caught the moment it landed because the residue was 0
                      and a non-zero number is the signal. Rule 4b is satisfied by construction
                      here: this page lists absences, and each one is shown in full. */}
                  <p className="miss-meta">
                    <span className="absence-kind">
                      {a.reasonKind ? REASON_KIND_LABELS[a.reasonKind] : 'reason not stated'}
                    </span>
                  </p>
                  <p className="source-line miss-src">
                    Declared on <Link href={a.href}>{a.title}</Link>{' '}
                    <span className="mono t-note">{a.from}</span>
                  </p>
                  {a.why ? <p className="miss-why">{a.why}</p> : null}
                </div>
              ))}
            </div>
          </>
        )
      ) : null}
    </>
  );
}

/**
 * The series table, used twice on this page: once for the domain's own subject series and once for
 * the series read under it as a lens. One component, two call sites, because the two lists differ
 * in exactly one column — the lens list names each series' actual subject, since "what is this
 * doing here" is the first question a reader has about it.
 */
function SeriesBlock({ items, showSubject }: { items: Series[]; showSubject?: boolean }) {
  return (
    <>
      <StatusKey />
      <StatusTally counts={statusCounts(items)} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Series</th>
              {showSubject ? <th>Subject</th> : null}
              <th>Unit</th>
              <th>Cal.</th>
              <th>Tier</th>
              <th className="num">Points</th>
              <th>Breaks</th>
            </tr>
          </thead>
            {items.map((x) => (
              <tbody key={x.id}>
                <tr>
                <td>
                <Link href={`/series/${x.id}/`}>{x.title}</Link>
                <RecordMarks record={x} deferCaveat />
                </td>
                {showSubject ? (
                <td className="mono">
                <Link href={`/domains/${x.domain}/`}>{x.domain}</Link>
                </td>
                ) : null}
                <td className="t-note">{x.unit}</td>
                <td className="mono">{x.calendar}</td>
                <td>
                <TierTag tier={x.tier} />
                </td>
                <td className="num">{x.points.length}</td>
                <td className="mono">
                {x.breaks?.length ? (
                <span style={{ color: 'var(--alert)' }}>{x.breaks.length}</span>
                ) : (
                <span className="t-note">—</span>
                )}
                </td>
                </tr>
                <CaveatRow record={x} colSpan={7} />
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
}

/**
 * Pair rows. A pair with no href renders as text, not as a dead link, and says so.
 *
 * CORRECTED 2026-08-08. THE WITHDRAWN PARAGRAPH, QUOTED: *"That is not defensive coding for a case
 * that cannot arise — PR-31 is in that state today. Both its sides are non-series (a provenance
 * record's competing accounts against a ledger absence), so no series page hosts it and this
 * listing is the only surface it has ever had."* **PR-31 now has a page: the provenance record
 * whose competing accounts are one of its two sides hosts it**, along with five more of exactly
 * that shape the old note did not know about.
 *
 * The unlinked branch is still live and still not defensive coding, for a different and narrower
 * reason: PR-16 and PR-55 are `declared-pending` with a side that names nothing, so there is no
 * pair to render anywhere. For those two this row IS the only surface, which is why it prints the
 * framing and the gap reason in full rather than the title alone.
 */
function PairRows({ items, showSubject }: { items: Pair[]; showSubject?: boolean }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pair</th>
            {showSubject ? <th>Subject</th> : null}
            <th>Kind</th>
          </tr>
        </thead>
        <tbody>
          {items.map((x) => {
            const href = pairHref(x);
            const name = x.title ?? x.framing;
            return (
              <tr key={x.id}>
                <td className="mono">{x.id}</td>
                <td>
                  {href ? (
                    <Link href={href}>{name}</Link>
                  ) : (
                    <>
                      {name}{' '}
                      <span className="t-note">
                        — declared, not yet authored: one side names nothing, so there is no pair
                        to render and this row is the whole of it
                      </span>
                      {/* THE FRAMING AND THE GAP REASON, IN FULL, BECAUSE THIS ROW IS THE ONLY
                          SURFACE THESE PAIRS HAVE. A pair with an unauthored side reaches no host
                          page, so until 2026-08-08 its framing and gap reason rendered nowhere in
                          the instrument while this row carried the title alone — a declaration of
                          something owed, invisible, which is precisely what rule 4b forbids of an
                          absence. Printed whole, never clamped: the same discipline rule 3a sets
                          for a caveat in a cell applies to a declaration in one. */}
                      {/* THE TWO SIDES, NAMED. A pair is the judgement that these two things
                          belong beside each other, and the side labels are the only place that
                          judgement is written down — the framing says why it matters and the
                          labels say what the two quantities ARE. Three of them rendered nowhere
                          in the instrument: PR-16.b and both of PR-55's. Printing the framing
                          and stopping short of the labels leaves the row saying what is owed
                          without saying what would settle it. */}
                      <span className="t-note pair-declared">
                        <strong>a</strong> {x.a.label} · <strong>b</strong> {x.b.label}
                      </span>
                      <span className="t-note pair-declared">{x.framing}</span>
                      {x.gapReason ? (
                        <span className="t-note pair-declared">{x.gapReason}</span>
                      ) : null}
                      {x.notes ? <span className="t-note pair-declared">{x.notes}</span> : null}
                    </>
                  )}
                </td>
                {showSubject ? (
                  <td className="mono">
                    <Link href={`/domains/${x.domain}/`}>{x.domain}</Link>
                  </td>
                ) : null}
                <td className="t-note">{PAIR_KIND_LABELS[x.kind] ?? x.kind}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


/** Longest run of consecutive India observations with no declared break inside it. */
function longestRun(x: Series): number {
  const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));
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

const indiaPoints = (x: Series) =>
  x.points.filter((p) => p.country === 'IND' && p.value !== null);

function lastValue(x: Series): string {
  const pts = indiaPoints(x);
  const v = pts[pts.length - 1]?.value as number | undefined;
  if (v === undefined) return '—';
  return Math.abs(v) >= 100000
    ? v.toLocaleString('en-IN', { maximumFractionDigits: 0 })
    : String(Number(v.toFixed(2)));
}

function lastPeriod(x: Series): string {
  const pts = indiaPoints(x);
  return pts[pts.length - 1]?.period ?? '—';
}

/**
 * A small line for the grid. Deliberately NOT `SeriesChart`: that component carries axes, a source
 * line, break notes and now the record's marks, all of which belong at full width. This is the
 * shape only, and the marks render beside it in the card rather than inside the figure.
 *
 * Breaks still cut the path — rule 2 does not relax at small size.
 */
function MiniLine({ series }: { series: Series }) {
  const W = 320;
  const H = 72;
  const PADX = 3;
  const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));
  const pts = indiaPoints(series).sort((a, b) => yearOf(a.period) - yearOf(b.period));
  if (pts.length < 2) return null;
  const vs = pts.map((p) => p.value as number);
  const lo = Math.min(...vs);
  const hi = Math.max(...vs);
  const span = hi - lo || 1;
  const x = (i: number) => PADX + (i / (pts.length - 1)) * (W - PADX * 2);
  const y = (v: number) => H - 4 - ((v - lo) / span) * (H - 12);
  const brk = new Set((series.breaks ?? []).map((b) => yearOf(b.period)));
  const segs: string[] = [];
  let cur: string[] = [];
  pts.forEach((p, i) => {
    if (brk.has(yearOf(p.period)) && cur.length) {
      segs.push(cur.join(' '));
      cur = [];
    }
    cur.push(`${cur.length === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.value as number).toFixed(1)}`);
  });
  if (cur.length) segs.push(cur.join(' '));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cw-line" role="img" aria-label={`${series.title}, ${pts[0].period} to ${pts[pts.length - 1].period}`}>
      {segs.map((dd, i) => (
        <path key={i} d={dd} className="spk-line" />
      ))}
      <circle cx={x(pts.length - 1)} cy={y(pts[pts.length - 1].value as number)} r={3} className="spk-dot" />
    </svg>
  );
}

/**
 * A record as a readable item rather than a table row: title in serif at reading size, id and date
 * small, marks as chips, verdict in words.
 *
 * The whole `RecordMarks` set renders — rule 4b binds this exactly as it binds a table row, and
 * `listing-marks` reads it as a listing card. The caveat renders in full inside the item, which is
 * why the item is full-width rather than a grid cell.
 */
function RecordItem({ record }: { record: LedgerRecord }) {
  return (
    <article className="drec">
      <div className="drec-main">
        <Link href={`/ledger/${record.id}/`} className="drec-title">
          {record.title}
        </Link>
        <p className="drec-meta mono">
          {record.id} · {formatDateRange(record.date, record.dateEnd)} ·{' '}
          {record.domains.map((x) => DOMAIN_LABELS[x]).join(', ')}
        </p>
        <RecordMarks record={record} />
      </div>
      <p className="drec-verdict">{ASSESSMENT_LABELS[record.assessment]}</p>
    </article>
  );
}
