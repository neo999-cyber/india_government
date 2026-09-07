import Link from '@/components/Link';
import { InlineSpark } from '@/components/InlineSpark';
import type { Metadata } from 'next';
import type { Domain } from '@/lib/types';
import { getSeries, ledger, series } from '@/lib/data';
import { DOMAIN_CHARACTER } from '@/lib/domain-copy';
import { HEADLINE, INSTEAD, ORDER, buildBoard } from '@/app/overview/page';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, formatValue, periodLabel } from '@/lib/format';
import { RecordMarks } from '@/components/marks';

/**
 * IN SHORT — the whole record in one read, and the surface this site did not have.
 *
 * ============================ THE FEEDBACK THAT PRODUCED IT ==================================
 *
 * The site was shared with readers who are not researchers, and the report back was consistent:
 * good records, no way to get an overall picture, too much to look at. Measured, the cause was not
 * volume — it was that **every entry surface opened by explaining the instrument.** The homepage's
 * `<main>` was 725 words about the archive; `/questions/` 1,041 words about how its filters select;
 * `/questions/improved/` 6,313 words beginning with three paragraphs of method. A reader could
 * traverse the whole site and learn nothing about India.
 *
 * ============================ WHAT MAKES THIS DIFFERENT FROM THE ATLAS =======================
 *
 * `/overview/` is a BROWSE surface: fourteen cards laid out by how the corpus is structured, 5,042px
 * tall, entered by someone who already knows what they are looking for. **This is a READ surface**,
 * organised as a sequence and finished in a few minutes without clicking anything. The difference
 * is compression and order, not new material.
 *
 * ============================ EVERY SENTENCE HERE ALREADY EXISTED ============================
 *
 * **Nothing on this page is a new claim, and that is a hard constraint rather than a style.** Code
 * sessions do not author research; chat sessions own the truth of `/data`. So the topic paragraphs
 * are `DOMAIN_CHARACTER` verbatim, the absences are `INSTEAD` verbatim, the lead indicators are the
 * ones `HEADLINE` already picked for the Atlas, and the figures are read off the records. This page
 * chooses SEQUENCE. It does not choose findings.
 *
 * It also imports `buildBoard` and `ORDER` from the Atlas rather than recomputing either. Two
 * derivations of the same fourteen rows would agree until the day somebody edited one.
 *
 * ============================ THE THREE RULES THAT SHAPED IT ================================
 *
 * **Rule 9 — no aggregate verdict, ever.** The obvious form of this page is a scorecard and it is
 * forbidden, correctly. What is permitted is *counts of assessments*, which is what the second
 * section prints: ten numbers that sum to 223, with no total standing for anything.
 *
 * **Rule 4b — an absence is never summed corpus-wide.** So this page states no total for declared
 * absences. Where a topic's own lead is an absence it renders as one, in the `.absence` mark, with
 * no figure invented into the space — Poverty and Kashmir are that case and they are the two most
 * informative sections here.
 *
 * **The embedded-feature defect, which this page would otherwise have reintroduced.** CLAUDE.md
 * names three shapes a mark can go missing in, and the third is a component that HAS the whole
 * record and renders no marks on a surface that is not a listing — outside both render gates by
 * construction. This page names fourteen series, so every one is fetched WHOLE with `getSeries`
 * and passed to `RecordMarks`. **The Atlas's own `OSeries` projection is deliberately not used
 * here**: it drops `caveat` and `unmeasured`, which is the narrowing-projection shape of the same
 * defect one step earlier.
 */

export const metadata: Metadata = {
  title: 'In short',
  description:
    'The whole record in one read — what this instrument holds on each of fourteen subjects, how the commitments came out, and what it cannot tell you.',
};

/** Ledger counts by assessment. A count, never a grade — rule 9 permits exactly this and no more. */
function tally() {
  const m = new Map<string, number>();
  for (const l of ledger) m.set(l.assessment, (m.get(l.assessment) ?? 0) + 1);
  // Ordered by how many records carry each value. That is a fact about the corpus and is stated as
  // one below; it is not an order of severity and nothing here is ranked.
  return [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

/** The three records the evidence-shape examples rest on, moved here with the section. */
const WAY_RECORDS = [
  'res-capacity-share',
  'coal-production',
  'schools-above-rte-ptr-primary-dise',
] as const;

const yearOf = (period: string) => Number(String(period).replace(/^FY/, '').slice(0, 4));

export default function InShort() {
  const wayRecords = WAY_RECORDS.map((id) => {
    const record = getSeries(id);
    if (!record) throw new Error(`in-short: missing required series ${id}`);
    return record;
  });
  const board = buildBoard([...ORDER] as Domain[]);
  const rows = tally();
  const scored = rows.reduce((t, [, n]) => t + n, 0);
  const worked = rows.find(([k]) => k === 'worked')?.[1] ?? 0;

  return (
    <>
      <p className="crumb">
        <Link prefetch={false} href="/">instrument</Link> / in short
      </p>
      <h1 className="page-lead">In short</h1>
      <p className="lede">
        The whole record in one read. Every sentence below is taken from a record this instrument
        already holds — this page chooses the order, not the findings. Where a subject is not
        measured at all, that is what it says.
      </p>

      <p className="prose-note">
        {series.length} indicator series and {ledger.length} commitments and events, filed under
        fourteen subjects, from the May 2014 baseline onward. Each subject below gives its character
        in a sentence, then the one indicator the Atlas leads with and where that indicator started
        and finished.{' '}
        <strong>The lead is a stated choice, not the most important thing in the subject.</strong>
      </p>

      <h2>The fourteen subjects</h2>

      {/* TWO COLUMNS ON A WIDE SCREEN, ONE ON A NARROW ONE. These fourteen are independent blocks,
          not a continuous argument, so reading down one column and back up the next costs nothing —
          and it takes the page from 6.3 screens to roughly half that, which is the entire complaint
          this page exists to answer. The prose sections above and below stay one column, because
          those ARE continuous. */}
      <div className="ins-grid">
      {board.map((d) => {
        const head = HEADLINE[d.key] ? getSeries(HEADLINE[d.key]) : undefined;
        const pts = (head?.points ?? []).filter((p) => p.country === 'IND' && p.value !== null);
        const from = pts[0];
        const to = pts[pts.length - 1];
        const instead = INSTEAD[d.key];

        return (
          <section key={d.key} id={d.key} className="ins">
            <h3>
              <Link prefetch={false} href={`/domains/${d.key}/`}>{DOMAIN_LABELS[d.key as Domain]}</Link>
            </h3>
            <p className="ins-char">{DOMAIN_CHARACTER[d.key as Domain]}</p>

            {instead ? (
              /* Rule 4a: an absence renders unlike a finding — dashed, no figure, nothing estimated
                 into the space. These two sections are the ones a summary page most wants to fill
                 in and least may. */
              <div className="absence">
                <span className="label">No lead indicator — and that is the finding</span>
                <p>{instead}</p>
              </div>
            ) : head && from && to ? (
              <>
                <p className="ins-lead">
                  <Link prefetch={false} href={`/series/${head.id}/`}>{head.title}</Link>
                  {': '}
                  <span className="mono">
                    {formatValue(from.value as number)} {head.unit} in{' '}
                    {periodLabel(from.period, head.calendar)} to{' '}
                    {formatValue(to.value as number)} in {periodLabel(to.period, head.calendar)}
                  </span>
                </p>
                {/* THE RECORD, WHOLE. Its caveat and its declared absences travel with it here
                    exactly as they do on its own page — see this file's header for why. */}
                {/* THE SLOPE THE SENTENCE ABOVE DESCRIBES, drawn from the same points. */}
                <InlineSpark points={pts} breaks={head.breaks ?? []} yearOf={yearOf} />
                <RecordMarks record={head} />
              </>
            ) : null}

            <p className="t-note mono">
              {d.nSeries} indicators · {d.nRecords} records ·{' '}
              <Link prefetch={false} href={`/domains/${d.key}/`}>browse this subject</Link>
            </p>
          </section>
        );
      })}
      </div>

      <h2>How the commitments came out</h2>
      <p>
        Every one of the {scored} commitments and events carries one of these. They are counts of
        records and nothing else:{' '}
        <strong>they do not add up to a verdict, and this site publishes none</strong> — not for a
        term, not for a government, not anywhere.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Assessment</th>
              <th scope="col">Records</th>
              <th scope="col">What it means</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([k, n]) => (
              <tr key={k}>
                <td>{ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}</td>
                <td className="mono">{n}</td>
                <td className="t-note">{GLOSS[k] ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="t-note">
        Ordered by how many records carry each value, which is a fact about this corpus rather than
        an order of severity. Nothing here is ranked.
      </p>

      {/* MOVED HERE FROM THE LANDING PAGE, 2026-09-01, on the operator's reading that readers
          "are overwhelmed with records and text" and that the landing page should be the picture.
          It is three worked examples of what an evidence shape looks like, in plain language, with
          three real records attached — which is this page's audience exactly, and was the last
          block of prose standing between a first-time reader and the fourteen landmarks.

          Its `way` containers are bound by `listing-marks`, which counts rows across all 699 pages,
          so moving them changes which page carries the rows and not how many are checked. */}
      <section className="ways" aria-labelledby="ways-h">
        <div className="home-section-head">
          <p className="home-kicker mono">How to read the archive</p>
          <h2 id="ways-h" className="ways-h">Three ways the record speaks</h2>
          <p>These are evidence shapes, not grades. The underlying records carry the detail.</p>
        </div>

        <div className="ways-grid">
          <article className="way">
            <span className="way-n mono">01</span>
            <h3>Clear trend</h3>
            <p>
              Renewables excluding large hydro rose from an eighth of installed electricity
              capacity to roughly a third across a continuous published series.
            </p>
            <RecordMarks record={wayRecords[0]} />
            <p className="source-line">
              <Link href="/series/res-capacity-share/">Open the renewable-capacity record →</Link>
            </p>
          </article>

          <article className="way">
            <span className="way-n mono">02</span>
            <h3>Two truths</h3>
            <p>
              Renewables grew and coal production grew. A transition and an expansion can occupy
              the same decade; the archive carries both instead of selecting the easier story.
            </p>
            <RecordMarks record={wayRecords[1]} />
            <p className="source-line">
              <Link href="/series/coal-production/">Open the coal-production record →</Link>
            </p>
          </article>

          <article className="way">
            <span className="way-n mono">03</span>
            <h3>The record ends</h3>
            <p>
              The school-level pupil-teacher series stopped after 2015-16 even though its successor
              system still holds the inputs. The full reason remains visible with the record.
            </p>
            <RecordMarks record={wayRecords[2]} />
            <p className="source-line">
              <Link href="/series/schools-above-rte-ptr-primary-dise/">
                Open the discontinued school record →
              </Link>
            </p>
          </article>
        </div>
      </section>

      <h2>What this cannot tell you</h2>
      <p>
        <strong>
          {worked} of {scored} records is marked as having worked.
        </strong>{' '}
        That is a statement about the standard of proof used here, not a finding about how much
        succeeded, and reading it the other way is the single easiest mistake this page could invite.
        Two rules produce it. A record can only be called <em>worked</em> on evidence from someone
        other than the body that made the announcement — a ministry press release is a primary
        document and, on the question of whether that ministry succeeded, no evidence at all. And
        where any one of several announced objectives was never measured by anyone,{' '}
        <em>worked</em> is unavailable whatever the others show.
      </p>
      <p>
        So the large <em>contested</em> and <em>no stated objective</em> counts are mostly about what
        can be established rather than about what happened. A contested record is one where two
        instruments measure the same thing and disagree, and this site shows both rather than
        picking. A record with no stated objective announced no target that could be failed.
      </p>
      <p>
        Where nothing measures a subject at all, no figure is estimated into the gap. Those absences
        are declared on the records they belong to and are never added together into a number, because
        a total would turn fourteen separate facts about fourteen subjects into one claim this
        instrument cannot support.
      </p>
      <p className="prose-note">
        From here: the <Link prefetch={false} href="/overview/">Atlas</Link> lays the same fourteen
        subjects out with their charts,{' '}
        <Link prefetch={false} href="/questions/">the questions</Link> filter the records eight ways,
        and <Link prefetch={false} href="/method/">the method</Link> states how everything above was
        graded and where it stops.
      </p>
    </>
  );
}

/** Plain-English glosses. Two of these carry half the corpus and neither explains itself. */
const GLOSS: Record<string, string> = {
  contested: 'Two instruments measure it and disagree. Both are shown; neither is picked.',
  'no-objective': 'Nothing was announced that could be failed — no target, no date.',
  partly: 'Some announced objectives are established, others are not.',
  failed: 'The announced objective was not met, on evidence.',
  'too-early': 'Announced too recently for any result to exist yet.',
  'baseline-context': 'Recorded for context before the window; not scored.',
  'awaiting-adjudication': 'Before a court or tribunal; the question is not settled.',
  'undated-commitment': 'A stated, quantified promise with no deadline — progress reportable, never overdue.',
  reversed: 'Announced, then undone.',
  worked: 'Met, on evidence independent of the body that announced it.',
};
