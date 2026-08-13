import Link from 'next/link';
import type { Metadata } from 'next';
import {
  QUESTION_DISPOSALS,
  QUESTION_ROUTES,
  disagreeing,
  improved,
  measuredWell,
  notPublished,
  stoppedSeries,
  tooEarly,
  worsened,
} from '@/lib/questions';
import { allUnmeasured, series } from '@/lib/data';
import { spanFrontier, spanRows } from '@/lib/spans';

export const metadata: Metadata = { title: 'Questions — eight ways in, and two that are not' };

/**
 * QUESTION NAVIGATION — `DESIGN-REVISION-2.md` §2, and the two questions it could not build.
 *
 * ============================ WHAT THIS PAGE IS ===============================================
 *
 * A door per question, not a page per question. The brief's claim is that **every one of the eight
 * is a filter over data already held**, and the useful work of the item was testing that claim
 * eight times rather than accepting it. Six survived as routes, one is answered better by a
 * surface that already exists, and one is not offered.
 *
 * ============================ WHY THIS PAGE LISTS NO RECORDS ==================================
 *
 * It names no series and no ledger record, so it is not a listing surface and carries no marks —
 * the same reading, and for the same reason, as the topic tab strip: a container that lists
 * nothing has nothing to bind. Every count below links to the page that shows its members with
 * their qualifications attached, and that page is where rule 4b is satisfied.
 *
 * ============================ THE ORDER IS THE BRIEF'S, AND SAYS SO ===========================
 *
 * Not a ranking and not a derived selection. It is the order §2 lists the questions in — an
 * authored decision defended by its source, which is the other legitimate form. A derived ordering
 * here would have to be computed from something, and the only candidates (set size, most recently
 * added) would put a merit reading on a list of questions.
 */
export default function Questions() {
  const rows = spanRows();
  const frontier = spanFrontier(rows);
  const counts: Record<string, number> = {
    improved: improved().length,
    worsened: worsened().length,
    'too-early': tooEarly().length,
    'publication-stopped': stoppedSeries(frontier).length,
    'sources-disagree': disagreeing().length,
    'measured-well': measuredWell().length,
  };
  const declaring = series.filter((s) => s.higherIsBetter === true || s.higherIsBetter === false).length;
  const noDirection = series.filter((s) => s.higherIsBetter === null).length;
  const silent = series.length - declaring - noDirection;
  const np = notPublished();
  const absences = allUnmeasured();
  const absenceRecords = new Set(absences.map((a) => a.recordId)).size;

  // The brief's order, with the two disposals sitting where their questions sit in it.
  const ordered: Array<{ route?: (typeof QUESTION_ROUTES)[number]; disposal?: (typeof QUESTION_DISPOSALS)[number] }> = [
    { route: QUESTION_ROUTES[0] },
    { route: QUESTION_ROUTES[1] },
    { disposal: QUESTION_DISPOSALS[0] },
    { route: QUESTION_ROUTES[2] },
    { route: QUESTION_ROUTES[3] },
    { route: QUESTION_ROUTES[4] },
    { route: QUESTION_ROUTES[5] },
    { disposal: QUESTION_DISPOSALS[1] },
  ];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / questions
      </p>
      <h1 className="page-lead">Questions</h1>
      <p className="lede">
        Eight questions a reader arrives with. Each is a filter over records the instrument already
        holds — <strong>not a new score, and not a ranking of anything against anything.</strong>{' '}
        Under every question is the criterion it selects on, named field by field, so that a reader
        can check it and disagree with it.
      </p>

      {/* THE FIVE THAT BLUR, AND SEPARATING THEM IS THE POINT OF THE ITEM.

          The brief is exact about this: `no result`, `no objective to score`, `no measurement`,
          `too early` and `conflicting measurements` mean radically different things and read alike
          to a non-specialist. They are the corpus's own taxonomy, and putting them in a reader's
          words is the translation the audience needs. This paragraph is the one place on the site
          where all five sit together, deliberately. */}
      <div className="qdistinct">
        <p className="prose-note">
          <strong>Five of these look alike and are not.</strong> A record with{' '}
          <em>no result yet</em> is not one with <em>no objective that could be failed</em>; neither
          is one where <em>nothing measures the thing at all</em>; neither is one where{' '}
          <em>two instruments measure it and disagree</em>; and none of them is a record that is
          simply <em>too early to judge</em>. The questions below separate those, because the
          difference between them is most of what this instrument knows.
        </p>
      </div>

      <p className="prose-note">
        The order is the one the design brief lists them in — an authored choice, stated so it is
        not read as a ranking. Six lead to a page of their own; one is answered by a surface that
        already exists and links to it; one is not offered, and the reason is under the question.
      </p>

      <div className="qlist">
        {ordered.map(({ route, disposal }) => {
          if (route) {
            return (
              <section key={route.slug} className="qcard">
                <h2>
                  <Link href={`/questions/${route.slug}/`}>{route.question}</Link>
                </h2>
                <p className="qcard-n mono">
                  {counts[route.slug]} {route.slug === 'too-early' ? 'records' : route.slug === 'sources-disagree' ? 'pairs' : 'series'}
                </p>
                <p className="qcard-crit">{route.criterion}</p>
              </section>
            );
          }
          const d = disposal!;
          return (
            <section key={d.question} className="qcard qcard-off">
              <h2>{d.question}</h2>
              <p className="qcard-n mono">
                {d.kind === 'not-offered' ? 'Not offered as a filter' : 'Answered elsewhere'}
              </p>
              <p className="qcard-crit">{d.reason}</p>
              {d.href ? (
                <p className="qcard-crit">
                  <Link href={d.href}>{d.hrefLabel}</Link> — {absences.length} declared absences
                  across {absenceRecords} records, each with its kind and its stated reason.
                </p>
              ) : (
                <p className="qcard-crit">
                  <Link href="/ledger/">The ledger</Link> lists every record with its own
                  assessment, and filters by it.
                </p>
              )}
            </section>
          );
        })}
      </div>

      {/* A NINTH ROUTE, HELD OUTSIDE THE EIGHT DELIBERATELY. The list above is the brief's own
          order and says so; slipping a ninth into it would falsify that sentence. This is a
          different object anyway — not a filter over records, but four questions the instrument
          CANNOT answer, with the four different reasons. Built after the same test that refused the
          topic-year matrix: every reason on it is a record's declared absence, not this corpus
          reporting its own coverage. */}
      <section className="qcard qcard-extra">
        <h2>
          <Link href="/questions/unanswerable/">Four questions this cannot answer</Link>
        </h2>
        <p className="qcard-n mono">Not one of the eight</p>
        <p className="qcard-crit">
          Demonetisation, farmers&rsquo; incomes, highway usage and sanitation behaviour. Each has a
          record that declares what was not measured, and the reasons differ:{' '}
          <strong>only one of the four is unanswerable in principle.</strong> The other three would
          be settled by a survey that has not been re-run, or by figures the state collects and does
          not publish.
        </p>
      </section>

      {/* WHAT THE FILTERS REST ON, PRINTED ONCE RATHER THAN REPEATED ON SIX PAGES.

          Two of these numbers are the honest limits of two of the questions above, and they belong
          where a reader meets the questions rather than only after clicking one. */}
      <h2>What these filters can and cannot reach</h2>
      <p className="prose-note">
        <strong>Direction of merit is declared for {declaring} of {series.length} series.</strong>{' '}
        Another {noDirection} declare explicitly that there is <em>no agreed direction</em> — a
        conviction rate and an enforcement count are read differently by different readers, and the
        record refuses to take a side — and {silent} say nothing either way. So the improved and
        worsened sets are not a picture of everything that moved. They are everything the corpus is
        willing to call a movement in a direction, and the two remainders are different facts:
        one is a refusal on the record, the other is a question never put.
      </p>
      <p className="prose-note">
        <strong>
          Where publication stopped is asked twice here, of two different things.
        </strong>{' '}
        A run of observations can simply end, which is derived from the data and is the{' '}
        <Link href="/questions/publication-stopped/">publication-stopped</Link> page. Or a record
        can declare that a figure was collected and never released, which is a stated absence:{' '}
        {np.entries} of them across {np.records} records, on{' '}
        <Link href="/unmeasured/">the unmeasured page</Link>. Neither substitutes for the other, and
        a page pooling them would report a single number for two findings.
      </p>
    </>
  );
}
