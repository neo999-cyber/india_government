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

function QuestionGlyph({ kind }: { kind: string }) {
  const path =
    kind === 'improved'
      ? 'M4 18 10 12l4 3 6-9M15 6h5v5'
      : kind === 'worsened'
        ? 'M4 6l6 6 4-3 6 9M15 18h5v-5'
        : kind === 'too-early'
          ? 'M12 4v8l5 3M5 5l-2 3M19 5l2 3M5 20h14'
          : kind === 'publication-stopped'
            ? 'M4 7h5v10H4zM15 7h5v10h-5zM11 12h2'
            : kind === 'sources-disagree'
              ? 'M4 7h7l-2-2m2 2L9 9M20 17h-7l2-2m-2 2 2 2'
              : kind === 'measured-well'
                ? 'M4 18V6m0 12h16M7 15l4-4 3 2 5-7'
                : kind === 'answered-elsewhere'
                  ? 'M5 6h14v12H5zM8 9h8M8 13h5'
                  : kind === 'not-offered'
                    ? 'M6 6l12 12M18 6 6 18'
                    : 'M12 4a7 7 0 1 0 0 14m0-10v5m0 3v.1';
  return (
    <span className="qcard-glyph" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false"><path d={path} /></svg>
    </span>
  );
}

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
      {/* THE PLATE IS DECORATION AND IS MARKED AS SUCH — the same reading, and the same treatment,
          as the Atlas banner. A supplied illustration: a spray of filed papers feeding a row of
          lenses, each lens dropping a tag, the tags landing in trays. It encodes NOTHING. There are
          eight lenses and eight questions, and that is a coincidence of the drawing rather than a
          mapping — no lens IS a question, no tag is a record, and no tray is a count. So it carries
          no `alt` and sits behind the text as a background rather than as content.

          THE TEXT IS PLACED IN THE ARTWORK'S OWN HOLES, WHICH WERE MEASURED RATHER THAN EYEBALLED.
          A 40x24 alpha grid over the source PNG, then the largest disjoint rectangles under 2% ink:
          a full-height strip at x 0-18%, a large field at x 0-41% below y 42%, and a top-right
          block at x 60-100% above y 21%. The two blocks below sit in the second and the third. The
          words are unchanged — the same h1, lede and notes this page already carried. */}
      <div className="qhero">
        <div className="qhero-art" />
        <div className="qhero-lead">
          <h1 className="page-lead">Questions</h1>
          <p className="lede">
            Eight questions a reader arrives with. Each is a filter over records the instrument
            already holds — <strong>not a new score, and not a ranking of anything against
            anything.</strong>{' '}
            Under every question is the criterion it selects on, named field by field, so that a
            reader can check it and disagree with it.
          </p>
        </div>
        <div className="qhero-note">
          <p className="prose-note">
            The order is the one the design brief lists them in — an authored choice, stated so it
            is not read as a ranking. Six lead to a page of their own; one is answered by a surface
            that already exists and links to it; one is not offered, and the reason is under the
            question.
          </p>
        </div>
      </div>

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

      <div className="qlist">
        {ordered.map(({ route, disposal }) => {
          if (route) {
            return (
              <section key={route.slug} className="qcard">
                <QuestionGlyph kind={route.slug} />
                <div className="qcard-body">
                  <h2>
                    <Link href={`/questions/${route.slug}/`}>{route.question}</Link>
                  </h2>
                  <p className="qcard-n mono">
                    {counts[route.slug]} {route.slug === 'too-early' ? 'records' : route.slug === 'sources-disagree' ? 'pairs' : 'series'}
                  </p>
                  <p className="qcard-crit">{route.criterion}</p>
                </div>
              </section>
            );
          }
          const d = disposal!;
          return (
            <section key={d.question} className="qcard qcard-off">
              <QuestionGlyph kind={d.kind} />
              <div className="qcard-body">
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
                    <Link href="/search/?layer=ledger">The ledger</Link> lists every record with its own
                    assessment, and filters by it.
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {/* A NINTH ENTRY, HELD OUTSIDE THE EIGHT DELIBERATELY. **WITHDRAWN: "A NINTH ROUTE".**
          It stopped being a route on 2026-09-01, when it folded into `/unmeasured/` as a section —
          four records whose declared absences ARE the answer, on the page that holds declared
          absences. It is still held outside the eight and still not one of them. The list above is the brief's own
          order and says so; slipping a ninth into it would falsify that sentence. This is a
          different object anyway — not a filter over records, but four questions the instrument
          CANNOT answer, with the four different reasons. Built after the same test that refused the
          topic-year matrix: every reason on it is a record's declared absence, not this corpus
          reporting its own coverage. */}
      <section className="qcard qcard-extra">
        <QuestionGlyph kind="unanswerable" />
        <div className="qcard-body">
          <h2>
            <Link href="/unmeasured/#unanswerable">Four questions this cannot answer</Link>
          </h2>
          <p className="qcard-n mono">Not one of the eight</p>
          <p className="qcard-crit">
            Demonetisation, farmers&rsquo; incomes, highway usage and sanitation behaviour. Each has a
            record that declares what was not measured, and the reasons differ:{' '}
            <strong>only one of the four is unanswerable in principle.</strong> The other three would
            be settled by a survey that has not been re-run, or by figures the state collects and does
            not publish.
          </p>
        </div>
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
