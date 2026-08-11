import Link from 'next/link';
import type { Metadata } from 'next';
import { getLedger, getProvenance, getSeries } from '@/lib/data';
import { StoryScroller } from '@/components/StoryScroller';
import { SeriesChart } from '@/components/SeriesChart';
import { CaveatFlag, RecordMarks } from '@/components/marks';

export const metadata: Metadata = {
  title: 'Can Indian children read?',
  description:
    'Two national instruments measure whether Indian children can read, and they point different ways. What each one is, why they disagree, and what neither can tell you.',
};

/**
 * PHASE 18 PROTOTYPE C — the scroll story, on the subject the inventory selected.
 *
 * WHY EDUCATION AND NOT RENEWABLES. The pre-phase drafts chose renewables, calling it "the richest
 * uncertainty material in the corpus." Measured, environment's series layer carries **zero caveats
 * and zero absence declarations** — the only domain in the corpus at 0% against a corpus rate of
 * 48%. Education carries 49 caveats, 45 absences, 67 declared seams and 14 provenance records, of
 * which twelve have no bridge. The full correction, with the withdrawn wording quoted, is §11a of
 * `drops/phase-18-design-lock/DESIGN-SCOPE.md`.
 *
 * AND IT PASSES THE INVENTORY'S TEST — *would a normal person notice this in their life?* Whether
 * a child in Standard III can read is the question a parent actually has.
 *
 * WHAT THE STORY MAY AND MAY NOT DO. It may show that two instruments disagree, and say what each
 * one is. **It may not pick between them**, and it does not: P-59 records five competing accounts
 * including one that runs against ASER, and all five reach the page. The corpus's position is that
 * both are recorded and neither is endorsed, and a narrative surface that quietly resolved the
 * dispute would be the moment this became advocacy.
 */

const STEPS = [
  {
    id: 'step-aser',
    body: (
      <>
        <h2>One instrument says this</h2>
        <p>
          Every other year since 2005, volunteers for a survey called ASER have gone to rural
          households — not schools — and asked children to read a short paragraph written at
          Standard II level. Among children in Standard III, the share who could manage it rose
          slowly to 27 per cent by 2018, collapsed to 20.5 per cent by 2022, and recovered to 27.1
          per cent in 2024.
        </p>
        <p>
          That is the picture almost every news report you have read about Indian learning comes
          from. Note what it is measuring: not marks, not attendance — whether a nine-year-old can
          read a sentence written for a seven-year-old.
        </p>
      </>
    ),
  },
  {
    id: 'step-nas',
    body: (
      <>
        <h2>The government has its own</h2>
        <p>
          The state does not rely on ASER. It runs its own assessment in schools — the National
          Achievement Survey, renamed PARAKH Rashtriya Sarvekshan in 2024 — testing millions of
          students rather than hundreds of thousands. On its measure, Grade 3 language sits in the
          sixties.
        </p>
        <p>
          The two lines are not the same quantity and are not drawn against a shared scale. One is
          the share of children who can read a text; the other is the average share of test items
          answered correctly. <strong>No gap between them is drawn here</strong>, because
          subtracting one from the other would be arithmetic the evidence does not support.
        </p>
      </>
    ),
  },
  {
    id: 'step-diverge',
    body: (
      <>
        <h2>They do not agree, and that is the finding</h2>
        <p>
          The disagreement is not noise. An independent study by Johnson and Parrado found that
          state averages from the government&rsquo;s survey run significantly higher than ASER&rsquo;s
          and higher than an independently conducted assessment — and the gap is not the same
          everywhere, which is the part that matters. A separate experiment in Madhya Pradesh put
          the same questions to the same students under an administration that counted for the
          school and one that did not, and got different answers.
        </p>
        <p>
          The instrument that is graded on the result reports the better result. That is the
          mechanism, and it is documented rather than alleged.
        </p>
      </>
    ),
  },
  {
    id: 'step-reset',
    body: (
      <>
        <h2>And the official one cannot be compared with itself</h2>
        <p>
          There is a second problem, and it is arguably larger. The pre-2017 NAS, NAS 2017, NAS 2021
          and PARAKH 2024 are <strong>four incompatible instruments wearing one name</strong> —
          different grades, frames, administrators and metrics. Each round&rsquo;s own custodians
          say it breaks comparison with the one before.
        </p>
        <p>
          So the red line above is cut at every reset, because joining those points would state a
          trend that the survey&rsquo;s own documentation denies. There is no official series here to
          read a direction from.
        </p>
      </>
    ),
  },
];

export default function Story() {
  const aser = getSeries('aser-std3-reading');
  const nas = getSeries('nas-parakh-grade3-language');
  const band = getSeries('parakh-grade3-proficient-language');
  const p59 = getProvenance('P-59');
  const p60 = getProvenance('P-60');
  const l0092 = getLedger('L-0092');

  const lines =
    aser && nas
      ? [
          {
            key: 'aser',
            label: 'ASER',
            unit: 'can read a Std II text',
            points: aser.points.filter((p) => p.country === 'IND'),
            breaks: (aser.breaks ?? []).map((b) => Number(b.period)),
          },
          {
            key: 'nas',
            label: 'NAS / PARAKH',
            unit: 'mean items correct',
            points: nas.points.filter((p) => p.country === 'IND'),
            breaks: (nas.breaks ?? []).map((b) => Number(b.period)),
          },
        ]
      : [];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/stories/">stories</Link> / can Indian
        children read?
      </p>

      <h1 className="story-lead">Can Indian children read?</h1>
      <p className="lede">
        India measures this twice, with two instruments that point different ways. Neither is
        hidden, neither is obviously wrong, and the disagreement between them is one of the most
        consequential unresolved questions in Indian public policy.
      </p>
      <p className="story-standfirst">
        What follows is a sequence, because the order matters: you have to believe the first
        instrument before the second one is interesting. Everything in it is on the records, linked
        at the end.
      </p>

      {lines.length === 2 ? (
        <StoryScroller steps={STEPS} lines={lines} />
      ) : null}

      <h2>What neither instrument can tell you</h2>
      <p>
        The disagreement is not the only gap. Each instrument declares things nothing measures, and
        those declarations are part of the record rather than an admission tacked onto it.
      </p>

      {aser ? (
        <>
          <h3>ASER, and what it does not cover</h3>
          {aser.caveat ? <CaveatFlag caveat={aser.caveat} /> : null}
          <ul className="story-gaps">
            {(aser.unmeasured ?? []).map((u) => (
              <li key={u.what}>
                <strong>{u.what}</strong> — {u.why}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {nas ? (
        <>
          <h3>The official survey, and what it does not publish</h3>
          <ul className="story-gaps">
            {(nas.unmeasured ?? []).map((u) => (
              <li key={u.what}>
                <strong>{u.what}</strong> — {u.why}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {/* The second dispute, and it is the one the Government's own success claim rests on. */}
      {band && p60 ? (
        <>
          <h2>The number the success claim rests on</h2>
          <p>
            Alongside the averages, PARAKH publishes a second and more ASER-comparable statistic: the
            share of students reaching a proficiency band. On that measure Grade 3 language rose from
            39 per cent in 2021 to 57 in 2024, and it is this figure the central claim that the
            foundational-literacy mission worked is built on.
          </p>
          <SeriesChart
            series={band}
            takeaway="The eighteen-point rise the Government's headline evidence rests on."
            highlightLast={false}
          />
          {/* THE SAME DUPLICATION AS THE HOMEPAGE STOP, and found by the same sweep. This callout
              read: *"The cut-scores that define the band are published nowhere. Without them, no
              one outside the body reporting the improvement can check whether the band moved or the
              children did."* It was written when this chart rendered no marks. It now renders a
              548-character caveat opening *THE CUT-SCORES ARE PUBLISHED NOWHERE* and making the
              same point — plus a declared absence naming the cut-scores as not-published.

              The callout stands rather than being deleted, because a scroll story's callout does
              work a caveat cannot: the caveat qualifies the record, the callout carries the
              sequence. So it stops restating the caveat and says the thing the caveat has no
              standing to say — what this does to the government's own claim. */}
          <p className="story-callout">
            <strong>So the headline evidence cannot be checked by anyone outside the body that
            reports it.</strong> That is not an argument that the gain is unreal. It is that the one
            number the foundational-literacy claim rests on is, on its own publisher&rsquo;s
            disclosure, unverifiable — and the caveat above is the record saying so.
          </p>
        </>
      ) : null}

      <h2>Where this comes from</h2>
      <p className="prose-note">
        Every claim above is on a record with its sources, its competing accounts and its declared
        gaps. Nothing here resolves the dispute, because the corpus does not.
      </p>
      <div className="grid">
        {[p59, p60].filter(Boolean).map((p) => (
          <Link key={p!.id} href={`/provenance/${p!.id}/`}>
            <span className="label">{p!.id} · measurement dispute</span>
            <span className="grid-title">{p!.title}</span>
            <span className="grid-meta">{p!.directionOfBias}</span>
          </Link>
        ))}
        {/* RULE 4b BINDS A STORY PAGE TOO. These are listing rows: a reader can leave for the
            record from here, so the record's caveat and its declared absences travel with the
            link. `listing-marks` named all three before this page was ever deployed — the third
            time in one phase that a new surface reproduced A-4 and the gate caught it. */}
        {aser ? (
          <Link href="/series/aser-std3-reading/">
            <span className="label">series · tier {aser.tier}</span>
            <span className="grid-title">The ASER reading series in full</span>
            <span className="grid-meta">2010 to 2024 · three declared breaks</span>
            <RecordMarks record={aser} linkify={false} />
          </Link>
        ) : null}
        {l0092 ? (
          <Link href="/ledger/L-0092/">
            <span className="label">record · contested</span>
            <span className="grid-title">{l0092.title}</span>
            <span className="grid-meta">
              the same findings reproduced, then attributed differently
            </span>
            <RecordMarks record={l0092} linkify={false} />
          </Link>
        ) : null}
      </div>
    </>
  );
}
