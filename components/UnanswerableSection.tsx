import Link from 'next/link';
import { getLedger } from '@/lib/data';
import { REASON_KIND_LABELS, RecordMarks } from '@/components/marks';
import type { LedgerRecord } from '@/lib/types';

/**
 * THE ABSENCE PAGE — measured before it was built, and the measurement admitted it.
 *
 * ============================ THE TEST IT HAD TO PASS, AND IT IS THE MATRIX'S =================
 *
 * *We cannot answer this* means one of two things, and only one is publishable. It can mean
 * **nobody measured it** — a fact about India's statistical system. Or it can mean **we have not
 * researched it** — a fact about this corpus's own coverage, which is the ground on which the
 * status grid was refused and the topic-year matrix after it.
 *
 * **So the test was: for each question, is the reason a DECLARED absence in `/data`?** Measured,
 * word-bounded through `corpus-search`, all four are. Demonetisation carries two, farmers' income
 * eight, highways two, sanitation one. Every reason on this page is a record's own statement about
 * what was not measured, not this instrument's statement about what it has not looked at.
 *
 * ============================ WHY IT IS NOT A STORY AND IS NOT ON /stories/ ===================
 *
 * The stories index says it holds *subjects where the order you meet the evidence in changes what it
 * means*, and the scroller is earned only where sequence does work. **Four independent questions
 * have no sequence.** Putting this on `/stories/` would contradict that index's own stated
 * criterion, so it sits with the questions instead, which is where a reader arrives with them.
 *
 * ============================ WHY IT IS NOT A SECOND DOOR ONTO /unmeasured/ ===================
 *
 * The question-navigation item declined a route for *what cannot be known* precisely because
 * `/unmeasured/` answers it. **This is a different object.** That page lists all 374 declarations
 * organised by record and by kind; this one takes four questions a reader actually asks and shows
 * what specifically was not measured under each. The relation is the same as `/questions/` to
 * `/search/?layer=ledger`: not a filter over the same list, but the public question the list answers.
 *
 * ============================ THE FINDING, WHICH IS NOT "THESE CANNOT BE ANSWERED" ============
 *
 * It is that **the four reasons are different, and only one of them is a limit.** Demonetisation's
 * two absences carry no `wouldFill` at all — the quantity is counterfactual and could not be
 * collected even in principle. The other three name exactly what would close them: a survey that has
 * not been fielded since 2018-19, a traffic census that is collected and not released, an
 * independent national measurement nobody has run. **Those are decisions, not limits.**
 */

type Q = {
  question: string;
  recordIds: string[];
  /** What the corpus does hold, so the absence is not read as the corpus holding nothing. */
  holds: string;
};

const QUESTIONS: Q[] = [
  {
    question: 'Did demonetisation achieve what was announced?',
    recordIds: ['L-0011'],
    holds:
      'One ledger record, scored failed on the limb its own announcement led with, and no time series at all — searched for demonetisation, banknote and specified bank note, and the corpus holds none.',
  },
  {
    question: 'Did farmers’ incomes double?',
    recordIds: ['L-0067'],
    holds:
      'Eight ledger records and four series. The target was set from a 2015-16 base for 2022-23, requiring about 10.4 per cent annual real income growth.',
  },
  {
    question: 'Did highways expand faster?',
    recordIds: ['L-0044', 'L-0045'],
    holds:
      'Three ledger records and four series, and the length built is published and not in dispute. What is missing is on the other side of the claim.',
  },
  {
    question: 'Did sanitation improve, and which measure says so?',
    recordIds: ['L-0035'],
    holds:
      'Two ledger records and one series. The question presupposes two measures; the corpus holds one, and the pair it sits in has an absence on its other side.',
  },
];

function Absences({ record }: { record: LedgerRecord }) {
  const items = record.unmeasured ?? [];
  if (!items.length) return null;
  return (
    <div className="absence">
      <ul className="story-gaps">
        {items.map((u) => (
          <li key={u.what}>
            <strong>{u.what}</strong>
            {u.reasonKind ? (
              <span className="absence-inline">{REASON_KIND_LABELS[u.reasonKind]}</span>
            ) : null}
            <br />
            {u.why}
            <br />
            {/* THE SECOND AXIS, AND IT IS THE PAGE'S POINT. `wouldFill` names the source that would
                close the absence. Where it is empty, nothing would — and saying so is a stronger
                statement than the absence itself. Rendered as words in both branches, never as a
                blank, because an empty cell and a declared impossibility are different facts. */}
            {u.wouldFill ? (
              <span className="unans-fill">
                <strong>What would close it:</strong> {u.wouldFill}
              </span>
            ) : (
              <span className="unans-fill unans-none">
                <strong>Nothing would close it.</strong> The record names no source that could, and
                the quantity is one that could not be collected even in principle.
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UnanswerableSection() {
  const rows = QUESTIONS.map((q) => ({
    ...q,
    records: q.recordIds.map(getLedger).filter((r): r is LedgerRecord => !!r),
  }));
  const total = rows.flatMap((r) => r.records).flatMap((r) => r.unmeasured ?? []).length;
  const noRoute = rows
    .flatMap((r) => r.records)
    .flatMap((r) => r.unmeasured ?? [])
    .filter((u) => !u.wouldFill).length;

  return (
    <>
      <h2 id="unanswerable">Four questions this cannot answer</h2>
      <p className="lede">
        These are questions people ask about the last decade, and this instrument cannot answer any
        of them. <strong>The useful part is that it cannot answer them for four different
        reasons</strong> — and only one of the four is a limit rather than a decision.
      </p>
      <p className="prose-note">
        Every reason below is a record&rsquo;s own declaration about what was not measured, quoted in
        its own words. None of them is this instrument saying it has not looked: that distinction is
        the whole test this page had to pass before it was built, and it is the same test that
        refused the topic-year matrix. {total} declared absences across the four, of which{' '}
        <strong>{noRoute} name no source that would close them</strong>.
      </p>

      {/* THE ORDERING, STATED — the half of rule 9 this page had not carried. Four questions in a
          fixed order is a selection with an order, and a reader not told is entitled to read the
          first as the worst. It is not: it is the only one that is a LIMIT, which is computable
          from whether any of its absences names a source that would close it. */}
      <p className="prose-note">
        <span className="label">How this is ordered</span> The one question that is unanswerable in
        principle comes first, then the three that are unanswered by decision. That is computed from
        whether each record&rsquo;s absences name a source that would close them, not from how
        serious any of them is.
      </p>

      {rows.map((r) => (
        <section key={r.question} className="unans">
          <h3 id="">{r.question}</h3>
          <p className="unans-holds">
            <span className="unans-k">What the corpus does hold</span> {r.holds}
          </p>
          {/* A LIST ITEM, AND THE GATE ASKED FOR IT. These paragraphs named five records by TITLE
              outside every listing shape, and `unrecognised-rows` reported it — **report-only, so
              the build passed**, which is the exact shape CLAUDE.md names: an unrecognised shape is
              not a failure but an absence. This page LISTS these records; it does not cite them. So
              the unit is `<li>`, which both render gates already recognise, and `RecordMarks` puts
              the record's own declarations on the row. None of the five carries a caveat — checked,
              not assumed — so what the marks add here is the absence count beside the absences
              themselves, and the declarations still render exactly once each. */}
          <ul className="unans-recs">
            {r.records.map((rec) => (
              <li key={rec.id}>
                <p className="unans-rec">
                  <Link href={`/ledger/${rec.id}/`}>{rec.title}</Link>{' '}
                  <span className="t-note mono">{rec.id}</span>
                  <RecordMarks record={rec} linkify={false} />
                </p>
                <Absences record={rec} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      <h3 id="why-the-difference-matters">Why the difference matters</h3>
      <p>
        One of these four is unanswerable in principle. The effect of demonetisation on terror
        financing, and the share of digital-payment growth attributable to it, are{' '}
        <strong>counterfactual quantities</strong> — what would have happened otherwise — and no
        agreed definition of either exists, so neither could be collected even if someone tried.
      </p>
      <p>
        The other three are not like that at all. Whether farm household income doubled would be
        settled by fielding a survey that has not been run since 2018-19. Whether the upgraded
        highways carry more traffic would be settled by traffic-census and toll data{' '}
        <strong>that is already collected</strong>. Whether open defecation fell would be settled by
        a national survey run by someone other than the ministry being assessed.
      </p>
      <p className="story-callout">
        <strong>Three of these four questions are unanswered rather than unanswerable.</strong> That
        is not a complaint about difficulty. It is that the instrument which would settle them either
        exists and is not published, or was built once and not run again.
      </p>

      <p className="prose-note">
        Every declared absence in the instrument, organised by record and by kind rather than by
        question, is on <Link href="/unmeasured/">the unmeasured page</Link>. This page is the four
        questions; that one is the whole set.
      </p>
    </>
  );
}
