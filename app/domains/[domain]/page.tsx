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
import { CaveatRow, OutcomeRow, RecordMarks, REASON_KIND_LABELS, StatusKey, StatusTally, TallyGloss, TierTag } from '@/components/marks';
import { SeriesChart } from '@/components/SeriesChart';
import { DomainTabs } from '@/components/DomainTabs';
import { DOMAIN_CHARACTER, DOMAIN_EVIDENCE, DOMAIN_PERIODS } from '@/lib/domain-copy';
import type { LedgerRecord, Unmeasured } from '@/lib/types';
import { SERIES_FINDINGS } from '@/lib/series-copy';

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

  // Years in which a record filed under this topic was announced, deduplicated, most-cited first
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
   * Every declared absence in this topic, from series and ledger alike, each carrying the record
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
        {lensed.length
          ? `${s.length + lensed.length} indicators — ${s.length} filed under this topic, ${lensed.length} read through it as a lens`
          : `${s.length} indicators`}{' '}
        · {l.length} records · {p.length} disputes
      </p>

      {/* §10 — THE DECOMPOSITION, AND KASHMIR IS THE CASE.

          Two numbers two lines apart were both correct against different queries: `series.domain`
          is 0 and `series.lenses` is 30. The counts line above already says which is which — that
          was fixed two batches ago. **What it still did not say is what the 30 ARE**, and the brief
          is right that the decomposition is the fix rather than the wording.

          **The brief's figures were checked and they hold, which is worth recording because the
          pattern has run the other way**: Governance 15, Defence 13, Federalism 2, summing to 30.
          Fourteen premise corrections in thirteen batches, and this is not one.

          **Computed, never typed** — the same query the counts line runs, grouped by the domain each
          series is actually filed under. It renders on any topic whose lens set is non-empty, not
          only on Kashmir, because a decomposition that exists for one topic and is hardcoded for it
          is a caption rather than a derivation.

          Not a ranking: the order is by count and the criterion is printed, which describes the
          record and makes no merit claim. */}
      {lensed.length > 0 ? (
        <div className="lensdec">
          <p className="lensdec-h">
            {lensed.length} indicators read through this lens, by the topic each is filed under —
            largest group first, a count and not an order of importance.
          </p>
          <ul className="lensdec-l">
            {Object.entries(
              lensed.reduce<Record<string, number>>((m, x) => {
                m[x.domain] = (m[x.domain] ?? 0) + 1;
                return m;
              }, {}),
            )
              .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
              .map(([dom, n]) => (
                <li key={dom}>
                  <Link href={`/domains/${dom}/indicators/`}>{DOMAIN_LABELS[dom as Domain]}</Link>{' '}
                  <span className="lensdec-n mono">{n}</span>
                </li>
              ))}
          </ul>
          {s.length === 0 ? (
            <p className="lensdec-f">
              None is filed with this topic as its formal subject, which is the technical fact under
              the number rather than a gap in the evidence.
            </p>
          ) : null}
        </div>
      ) : null}

      {s.length + lensed.length + l.length === 0 ? (
        <div className="stub">
          <span className="label">Unopened domain</span>
          No indicators and no government records have been researched into this topic yet. Nothing is
          inferred to fill the gap.
        </div>
      ) : null}

      {/* ============ THE TABS ARE TABS NOW, AND WERE ADDITIONS ==============================
          Everything from the lead chart to the readable record list rendered on EVERY tab, before
          the selected tab's own body. So `/domains/macro/records/` opened with the overview's lead
          chart, its period narrative, four more charts and the whole 57-record readable list, and
          only then reached the records table — 269,862 bytes against the overview's 158,021, with
          "Demonetisation" appearing twice and no way for a reader to tell whether the tab had done
          anything. An external audit called it the most misleading page on the site and that was
          the right word: the control said it had filtered and it had appended.

          **`listing-marks` will read lower after this and that is the expected direction, not a
          regression.** The readable list stops rendering on four tabs where it was a duplicate;
          every record it named is still a row of the records tab's own table, so rule 4b is
          satisfied where it was always meant to be. */}
      {tab === 'overview' ? (
        <>
      {/* ---- THE LEAD. One chart at full width, chosen by a STATED criterion. ---------------- */}
      {lead ? (
        <figure className="dlead">
          {/* NO CAPTION OF ITS OWN. `SeriesChart` renders the title, the figure, the unit, the
              span and the source line — a wrapper repeating any of them prints it twice, which the
              first build of this page did with both the title and the source. The rule above and
              the criterion note below are all this wrapper adds. */}
          <div className="dlead-rule" />
          {/* THE OUTCOME TRACK on a chart is the takeaway slot, which this page was the only
              SeriesChart caller not to use — the homepage has passed one since the series-page
              rebuild. The lead chart carried a caveat and no statement of what the result did. */}
          {/* Directly under the domain h1. */}
          <SeriesChart
            headingLevel={2}
            series={lead}
            events={leadEvents}
            highlightLast
            takeaway={SERIES_FINDINGS[lead.id]?.finding}
          />
          <p className="dlead-note">
            <strong>Chosen for the longest unbroken run in this topic, not for importance.</strong>{' '}
            {leadRun} consecutive observations with no declared break inside them, which is the
            longest of the {(s.length || lensed.length)} series here.
            {leadEvents.length > 0 ? (
              <>
                {' '}
                The brass ticks are years in which a record filed under this topic was announced —{' '}
                <strong>a note of what else was happening, not an explanation of the shape.</strong>
              </>
            ) : null}
          </p>
        </figure>
      ) : null}

      {/* ---- WHAT CHANGED. Authored, per period, from the records. One of fourteen written. --- */}
      {evidence ? (
        <p className="evidence-note">
          <span className="label">How this topic is published</span> {evidence}{' '}
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
              {periods.length} periods, written from the records in this topic. Each names the
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
              The next longest unbroken runs in this topic — a stated criterion, not a ranking. All{' '}
              {(s.length || lensed.length)} series are below.{' '}
              <strong>Each carries the same three layers as the lead</strong> — what the measure did,
              the years this topic&rsquo;s commitments were announced, and any point at which the
              instrument changed basis, with the reason printed.
            </p>
          </div>
          <div className="cgrid">
            {grid.map((g) => (
              <div key={g.id} className="cw">
                {/* h3: this grid sits under the "N more, side by side" h2. It was h4, which
                    skipped a level on every domain page. */}
                <h3 className="cw-h">
                  <Link href={`/series/${g.id}/`}>{g.title}</Link>
                </h3>
                <MiniLine series={g} events={leadEvents.map((e) => e.year)} />
                <p className="cw-val">
                  <span className="figure">{lastValue(g)}</span>
                  <span className="mono t-note">
                    {g.unit} · {lastPeriod(g)}
                  </span>
                </p>
                {/* THE COMMITMENT LAYER, NAMED IN WORDS. A 320px figure cannot carry a legible
                    year label, and an illegible one is worse than none — so the ticks are drawn
                    and the years are printed. The disclaimer is the lead chart's, verbatim: a mark
                    beside a movement asserts nothing about the movement, and a reader will make the
                    connection unless told not to. */}
                {(() => {
                  const yrs = leadEvents
                    .map((e) => e.year)
                    .filter((yr) =>
                      g.points.some(
                        (pt) =>
                          pt.country === 'IND' &&
                          pt.value !== null &&
                          Number(String(pt.period).replace(/^FY/, '').slice(0, 4)) === yr,
                      ),
                    );
                  return yrs.length ? (
                    <p className="cw-layer">
                      <span className="cw-layer-k">Commitments</span> {yrs.join(' · ')} — years a
                      record filed under this topic was announced,{' '}
                      <strong>a note of what else was happening, not an explanation of the shape.</strong>
                    </p>
                  ) : null;
                })()}
                {/* THE EVIDENCE-LIMIT LAYER. The path was already cut here; the seam is now drawn
                    and its reason PRINTED IN FULL, which is §4a — a seam a reader cannot read the
                    reason for asserts a mystery. Never abbreviated to fit the card. */}
                {(g.breaks ?? []).map((b) => (
                  <p key={b.period} className="cw-seam">
                    <span className="cw-layer-k">Basis change {b.period}</span> {b.note}{' '}
                    <Link href={`/provenance/${b.provenanceRef}/`}>{b.provenanceRef}</Link>
                  </p>
                ))}
                {SERIES_FINDINGS[g.id]?.finding ? (
                  <p className="cw-outcome">
                    <span className="outcome-label">Outcome</span>{' '}
                    {SERIES_FINDINGS[g.id]?.finding}
                  </p>
                ) : null}
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
              Everything entered in this topic, most recent first. Nothing is ranked.
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
        </>
      ) : null}

      {/* §2 — THE OVERVIEW CLOSES ON WHAT THE EVIDENCE CANNOT ESTABLISH, AND IT HAD STOPPED DOING SO.

          The brief says this is *already how topic pages end*. **It was, and the tab split ended it:**
          the declared absences moved to the Missing data tab, so the surface a reader lands on
          finished on a list of records. That is the reading order the corpus cares most about, and
          it regressed silently three batches ago.

          **A STATEMENT AND A ROUTE, NEVER A SECOND LISTING.** The tab lists each absence in full and
          rule 4b is satisfied there. Repeating them here would render every declaration twice on one
          area, which is the other half of the same rule — so this says how many there are, what kind
          of thing they are, and sends the reader to them. The count is a fact about this topic and
          not a corpus-wide sum, which 4b forbids.

          **AND IT RENDERS WHEN THE COUNT IS ZERO**, which is the case that matters: a topic that
          declares no absence is making a claim about itself, and printing nothing would let a
          reader take the silence for completeness. */}
      {tab === 'overview' ? (
        <section className="dclose">
          <div className="sec-h">
            <h2>What this topic cannot establish</h2>
          </div>
          {/* THE SITE'S OWN ABSENCE IDIOM, NOT A LOOKALIKE. `absence-note` was written here and
              turned out to have no CSS rule anywhere — it inherited body prose, so a statement
              about what cannot be established rendered exactly like a finding, which is rule 4a
              inverted. `.absence` is the existing mark: dashed, unfilled, `--ink-2`, visibly not a
              panel of results. Reused rather than reimplemented. */}
          <div className="absence">
            {absences.length === 0 ? (
              <p>
                No record filed under this topic declares a quantity it cannot measure. That is a
                fact about the records, not a finding that nothing is missing.
              </p>
            ) : (
              <p>
                {absences.length} {absences.length === 1 ? 'quantity' : 'quantities'} that records
                here say {absences.length === 1 ? 'is' : 'are'} not measured, each with the reason
                its own record gives and whether any source would close it.{' '}
                <Link href={`/domains/${d}/missing/`}>Read them in full</Link> — they are listed
                there rather than repeated here, so that no declaration renders twice on one topic.
              </p>
            )}
          </div>
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
          <div className="table-wrap" tabIndex={0}>
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
                {x.affectsDomains.includes('all') ? ' · all topics' : ''}
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
          not exist on any topic page, and every topic has something for it — 4 declarations in
          poverty to 181 in governance, 374 across the corpus.

          **Rule 4a governs the form and rule 4b the reach.** Each entry is dashed, unfilled and
          carries no figure, because an absence is a finding and must not be styled as a panel of
          results; and it names the record that declared it, so a reader can get to the ground. */}
      {tab === 'missing' ? (
        absences.length === 0 ? (
          <p className="prose-note">
            No record in this topic declares an unmeasured quantity. That is a statement about what
            has been entered, not a claim that everything here is measured.
          </p>
        ) : (
          <>
            <p className="prose-note">
              {absences.length} {absences.length === 1 ? 'quantity' : 'quantities'} that records in
              this topic say {absences.length === 1 ? 'is' : 'are'} not measured, each named by the
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
      <div className="table-wrap" tabIndex={0}>
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
                {/* THE TWO TRACKS, in reading order: what the measured result did, then what is
                    known about the measurement. The outcome row is new — this table shipped the
                    evidence track alone, which is the 11.5x asymmetry recorded on `OutcomeRow`. */}
                <OutcomeRow finding={SERIES_FINDINGS[x.id]?.finding} colSpan={7} />
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
    <div className="table-wrap" tabIndex={0}>
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
 * A small line for the grid — now carrying THE SAME THREE LAYERS AS THE LEAD, which is item 4.
 *
 * ============================ THE BRIEF'S PREMISE, CORRECTED BY MEASUREMENT ===================
 *
 * §1 says the topic pages *select the longest unbroken run* and asks for four or five directly
 * labelled charts instead of one lead series. **Measured, the page already renders five** — a lead
 * chart and four cards, each with its title, its latest figure and unit, its outcome sentence and
 * its marks. **And the renewables case §1 offers as the argument is already satisfied:** on
 * `/domains/environment/`, `res-capacity-share` ranks 2 and `coal-production` ranks 4, so the two
 * sit side by side in the grid today.
 *
 * **What was genuinely missing is the sentence after it: *three layers on one strip*.** The lead
 * chart carried all three — the measured outcome, the commitments along the same timeline, and the
 * evidence limits where an indicator changed basis. The four cards carried one. So a reader met one
 * chart that said when the promises were made and four that did not.
 *
 * ============================ WHAT EACH LAYER IS, AND WHAT IT IS NOT ==========================
 *
 * **Outcome** — the path, and the marks and outcome sentence beside it in the card.
 * **Commitments** — a dashed brass tick at each year in which a record filed under this topic was
 * announced. Same source and same mark as the lead: `date`, and nothing else. **The years are
 * printed in words under the card rather than labelled in the SVG**, because a 320px figure cannot
 * carry a legible label and an illegible one is worse than none.
 * **Evidence limits** — the path is cut at a declared break, and now the seam is DRAWN as well as
 * cut, with its note printed in full below. §4a: a seam a reader cannot read the reason for is a
 * seam that asserts a mystery. 16 of the 49 cards carry one, 30 notes in all.
 *
 * **A tick asserts nothing about the shape** and the card's caption says so in the lead's own
 * words. Rule 7 is why the ticks are dashed and in the mark colour: they mean *a mark was made*,
 * one thing, and they are never solid, which is the seam.
 */
function MiniLine({ series, events }: { series: Series; events?: number[] }) {
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
  // An event lands only on a period the series actually observes. Dropped rather than interpolated
  // onto the nearest — the lead chart's rule, restated here because this is a second implementation
  // of the same decision and the two must not drift.
  const eventIdx = (events ?? [])
    .map((yr) => pts.findIndex((p) => yearOf(p.period) === yr))
    .filter((i) => i >= 0);
  const seamIdx = pts.map((p, i) => (brk.has(yearOf(p.period)) ? i : -1)).filter((i) => i >= 0);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cw-line" role="img" aria-label={`${series.title}, ${pts[0].period} to ${pts[pts.length - 1].period}`}>
      {eventIdx.map((i) => (
        <line key={`e${i}`} className="chart-event" x1={x(i)} x2={x(i)} y1={2} y2={H - 2} />
      ))}
      {seamIdx.map((i) => (
        <line key={`s${i}`} className="chart-seam" x1={x(i)} x2={x(i)} y1={2} y2={H - 2} />
      ))}
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
