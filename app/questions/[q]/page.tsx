import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { DirectedMove } from '@/lib/questions';
import {
  QUESTION_ROUTES,
  disagreeing,
  improved,
  measuredWell,
  routeBySlug,
  stoppedSeries,
  tooEarly,
  worsened,
} from '@/lib/questions';
import { getSeries } from '@/lib/data';
import { spanFrontier, spanRows } from '@/lib/spans';
import {
  ASSESSMENT_LABELS,
  DOMAIN_LABELS,
  HIGHER_IS_BETTER_LABELS,
  TERM_SHORT,
  formatDateRange,
  formatValue,
  periodLabel,
} from '@/lib/format';
import { CaveatFlag, CaveatRow, OutcomeRow, RecordMarks, TierTag } from '@/components/marks';
import { SERIES_FINDINGS } from '@/lib/series-copy';

type Props = { params: Promise<{ q: string }> };

export function generateStaticParams() {
  return QUESTION_ROUTES.map((r) => ({ q: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { q } = await params;
  const r = routeBySlug(q);
  return { title: r ? r.question : 'Questions' };
}

/**
 * ONE QUESTION, ONE FILTERED COLLECTION — and every collection here renders BOTH TRACKS.
 *
 * ============================ WHY BOTH TRACKS IS THE LOAD-BEARING CONSTRAINT ==================
 *
 * Item 1 of this brief measured the site and found the evidence track reaching **11.5 times** as
 * many pages as the outcome track: a reader met a title, a status mark and a full-width caveat, and
 * no statement of what the measured result did. A new family of listing surfaces built the same way
 * would put that asymmetry back on day one, on the pages a first-time reader is most likely to open.
 *
 * So on every set of series here the row carries `OutcomeRow` above `CaveatRow`, drawn from the same
 * `SERIES_FINDINGS` the catalogue and the search cards draw from. The two empty cases carry
 * unchanged and are visible on these pages rather than hidden by them:
 *
 *   - **measured-well is an outcome-only set BY CONSTRUCTION.** *No blocking caveat* is one of its
 *     seven tests, so not one row can carry an evidence track. Nothing is emitted for the absent
 *     one, because a rendered "no qualifications" would assert that the measurement is clean and
 *     the corpus holds only that these records declared none.
 *   - **publication-stopped carries both on most rows and neither on some.** Of its 93 series, 82
 *     carry a finding and 57 carry a caveat. A row with neither is a series whose whole statement
 *     is that its run ended, which is what the page is for.
 *
 * ============================ THE LEDGER SET, AND WHAT IT DELIBERATELY DOES NOT DO =============
 *
 * `too-early` lists ledger records, and **the outcome track has no ledger form** — that was decided
 * in item 1, on the ground that a ledger row already states an outcome (its assessment) and that
 * `summary` and `whatHappened` have never been through the true-alone check the 237 series findings
 * went through. Nothing here reverses it. What each row carries instead is its `assessmentNote`:
 * not an outcome sentence but the GROUND of the verdict, which on this page is the answer to the
 * question the page asks. It is labelled as what it is.
 *
 * ============================ THE PAIR SET, AND RULE 3a =======================================
 *
 * A pair row leads with its own `PR-xx`, which exempts it from carrying its linked series' marks —
 * the linked record is a pair's address, not its subject. **That exemption is not used here.** On
 * this page the two series ARE the subject, so both sides' caveats render in the row. The pair's
 * `framing` is its outcome track: it is the pair's own statement of what the disagreement is, and
 * it is the only sentence on the page that answers the question directly.
 */
export default async function QuestionRoute({ params }: Props) {
  const { q } = await params;
  const route = routeBySlug(q);
  if (!route) notFound();

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/questions/">questions</Link>
      </p>
      <h1>{route.question}</h1>
      <p className="lede">{route.lede}</p>
      {/* THE CRITERION, PRINTED WHERE THE SELECTION IS MADE — rule 9's requirement, and it is
          printed here rather than on a method page because that is where the rule puts it. */}
      <div className="qcrit">
        <span className="label">What this selects</span>
        <p>{route.criterion}</p>
      </div>

      {q === 'improved' ? <MoveTable rows={improved()} /> : null}
      {q === 'worsened' ? <MoveTable rows={worsened()} /> : null}
      {q === 'too-early' ? <TooEarly /> : null}
      {q === 'publication-stopped' ? <Stopped /> : null}
      {q === 'sources-disagree' ? <Disagree /> : null}
      {q === 'measured-well' ? <MeasuredWell /> : null}
    </>
  );
}

/** The improved and worsened sets: the same table, selected on opposite sides of one field. */
function MoveTable({ rows }: { rows: DirectedMove[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Direction of merit</th>
            <th>From</th>
            <th>To</th>
            <th>Obs.</th>
            <th>Topic</th>
          </tr>
        </thead>
        {rows.map(({ s, from, to, n }) => (
          <tbody key={s.id} data-row>
            <tr>
              <td>
                <Link href={`/series/${s.id}/`}>{s.title}</Link>
                <RecordMarks record={s} deferCaveat />
                <br />
                <span className="t-note mono">
                  {s.unit} · <TierTag tier={s.tier} />
                </span>
              </td>
              {/* The field the page selects on, on the row it selected. */}
              <td className="t-note">{HIGHER_IS_BETTER_LABELS[String(s.higherIsBetter)]}</td>
              <td className="mono">
                {formatValue(from.value!)}
                <br />
                <span className="t-note">{periodLabel(from.period, s.calendar)}</span>
              </td>
              <td className="mono">
                {formatValue(to.value!)}
                <br />
                <span className="t-note">{periodLabel(to.period, s.calendar)}</span>
              </td>
              {/* Printed on every row so a two-observation move is not read as a trend. There is
                  no threshold here and this column is what stands in for one. */}
              <td className="mono t-note">{n}</td>
              <td className="t-note">{DOMAIN_LABELS[s.domain]}</td>
            </tr>
            <OutcomeRow finding={SERIES_FINDINGS[s.id]?.finding} colSpan={6} />
            <CaveatRow record={s} colSpan={6} />
          </tbody>
        ))}
      </table>
    </div>
  );
}

function Stopped() {
  const frontier = spanFrontier(spanRows());
  const rows = stoppedSeries(frontier);
  return (
    <>
      <p className="prose-note">
        The frontier is <span className="mono">{frontier}</span>, derived from where the corpus&rsquo;s
        series-ends plateau rather than chosen. A series ending in {frontier} is an annual series
        whose next figure is not out yet; the ones below end before it.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Indicator</th>
              <th>Last observation</th>
              <th>Topic</th>
            </tr>
          </thead>
          {rows.map(({ s, end }) => (
            <tbody key={s.id} data-row>
              <tr>
                <td>
                  <Link href={`/series/${s.id}/`}>{s.title}</Link>
                  <RecordMarks record={s} deferCaveat />
                  <br />
                  <span className="t-note mono">
                    {s.id} · <TierTag tier={s.tier} />
                  </span>
                </td>
                <td className="mono">{end}</td>
                <td className="t-note">{DOMAIN_LABELS[s.domain]}</td>
              </tr>
              <OutcomeRow finding={SERIES_FINDINGS[s.id]?.finding} colSpan={3} />
              <CaveatRow record={s} colSpan={3} />
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

function MeasuredWell() {
  const rows = measuredWell();
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Observations</th>
            <th>Source grade</th>
            <th>Topic</th>
          </tr>
        </thead>
        {rows.map((s) => (
          <tbody key={s.id} data-row>
            <tr>
              <td>
                <Link href={`/series/${s.id}/`}>{s.title}</Link>
                <RecordMarks record={s} deferCaveat />
                <br />
                <span className="t-note mono">{s.unit}</span>
              </td>
              <td className="mono">{s.points.filter((p) => p.country === 'IND').length}</td>
              <td>
                <TierTag tier={s.tier} />
              </td>
              <td className="t-note">{DOMAIN_LABELS[s.domain]}</td>
            </tr>
            <OutcomeRow finding={SERIES_FINDINGS[s.id]?.finding} colSpan={4} />
            {/* No CaveatRow, and its absence is the set's own criterion rather than an omission:
                "no blocking caveat" is one of the seven tests, so a row here cannot carry one.
                Nothing is emitted in its place — see the file header. */}
          </tbody>
        ))}
      </table>
    </div>
  );
}

function TooEarly() {
  const rows = tooEarly();
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Term</th>
            <th>Record</th>
            <th>Verdict</th>
          </tr>
        </thead>
        {rows.map((l) => (
          <tbody key={l.id} data-row>
            <tr>
              <td className="mono">
                <Link href={`/ledger/${l.id}/`}>{l.id}</Link>
              </td>
              <td className="mono t-note">{formatDateRange(l.date, l.dateEnd)}</td>
              <td className="mono">{TERM_SHORT[l.term]}</td>
              <td>
                <Link href={`/ledger/${l.id}/`}>{l.title}</Link>
                <RecordMarks record={l} deferCaveat />
              </td>
              <td className="t-note">{ASSESSMENT_LABELS[l.assessment]}</td>
            </tr>
            {l.assessmentNote ? (
              <tr className="qground-row">
                <td colSpan={5}>
                  <span className="qground">
                    <span className="qground-label">Why it cannot yet be scored</span>{' '}
                    {l.assessmentNote}
                  </span>
                </td>
              </tr>
            ) : null}
            <CaveatRow record={l} colSpan={5} />
          </tbody>
        ))}
      </table>
    </div>
  );
}

function Disagree() {
  const rows = disagreeing();
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Pair</th>
            <th>The two instruments</th>
            <th>Topic</th>
          </tr>
        </thead>
        {rows.map((p) => {
          const sides = [p.a, p.b].map((side) => ({
            side,
            s: side.series ? getSeries(side.series) : undefined,
          }));
          return (
            <tbody key={p.id} data-row>
              <tr>
                {/* Leading cell is the pair's own id — the shape `isPairRow` recognises. The row is
                    about the pair; the series are reached through the two sides beside it. */}
                <td className="mono">{p.id}</td>
                <td>
                  {sides.map(({ side, s }, i) => (
                    <span key={side.label} className="qside">
                      {i > 0 ? <span className="qside-v">against</span> : null}
                      {s ? <Link href={`/series/${s.id}/`}>{s.title}</Link> : side.label}
                      <span className="t-note"> — {side.label}</span>
                    </span>
                  ))}
                  {(p.provenanceRefs ?? []).map((pr) => (
                    <Link key={pr} className="tag" href={`/provenance/${pr}/`}>
                      {pr}
                    </Link>
                  ))}
                </td>
                <td className="t-note">{DOMAIN_LABELS[p.domain]}</td>
              </tr>
              {/* The pair's own statement of what the disagreement is. This is the outcome track:
                  it answers the question the page asks, and neither side answers it alone. */}
              <tr className="outcome-row">
                <td colSpan={3}>
                  <span className="outcome-inline">
                    <span className="outcome-label">Outcome</span> {p.framing}
                  </span>
                </td>
              </tr>
              {p.gapReason ? (
                <tr className="qground-row">
                  <td colSpan={3}>
                    <span className="qground">
                      <span className="qground-label">Why the difference is not a gap</span>{' '}
                      {p.gapReason}
                    </span>
                  </td>
                </tr>
              ) : null}
              {/* Rule 3a, without leaning on the pair-row exemption: where a side's series carries
                  a caveat, it renders here in full, because on this page that series is the
                  subject rather than the address. */}
              {sides
                .filter((x) => x.s?.caveat)
                .map(({ s }) => (
                  <tr key={s!.id} className="caveat-row">
                    <td colSpan={3}>
                      <CaveatFlag caveat={s!.caveat!} variant="inline" />
                    </td>
                  </tr>
                ))}
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
