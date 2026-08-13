import Link from 'next/link';
import type { Metadata } from 'next';
import { storyCard } from '@/lib/share-card';
import { storyBySlug } from '@/lib/stories';
import { getLedger, getSeries } from '@/lib/data';
import { StoryScroller } from '@/components/StoryScroller';
import { CaveatFlag } from '@/components/marks';
import { StorySources } from '@/components/StorySources';

/**
 * The card comes from `lib/stories.ts` through `storyCard`, not from a literal here. Every
 * story was unfurling the root fallback because a page that sets only `description` does not
 * override the layout's `openGraph`; the composer sets both.
 */
export const metadata: Metadata = storyCard(
  storyBySlug('what-counts-as-education-spending')!.title,
  storyBySlug('what-counts-as-education-spending')!.share,
  'what-counts-as-education-spending',
);

/**
 * STORY FIVE — PR-22, and it is the renewables form with a second publisher's habit attached.
 *
 * ============================ WHY THIS ONE FIRST OF THE THREE =================================
 *
 * PR-22, PR-35 and P-114 were all read before any was chosen. **PR-22 goes first on three counts
 * and the first is the material:** 22 observations on each side, against 6 for PR-35 and a
 * single state's release table for P-114 — the deepest pair in the candidate set by a factor of
 * three. **Its form is already published**, so the risk sits in the writing rather than in
 * establishing a shape. And its subject is a target the government invokes in Parliament, which is
 * the kind of thing a reader arrives holding.
 *
 * **PR-35 IS A FOURTH FORM AND IT IS NOT WRITTEN HERE.** Established rather than assumed: its two
 * instruments carry DIFFERENT units (`detenus` against `prisoners`) and the SAME quantity — both
 * count preventive-detention prisoners in J&K — which is neither the jobs case (same unit, same
 * quantity), the Kashmir case (different quantities) nor the renewables case (one publisher). What
 * makes it a fourth rather than a variant is that **its discrepancy is explained to the unit**: in
 * three of six overlapping years the difference is exactly NCRB's foreign-detenu count. What that
 * form requires, and why it is a batch of its own: the page must separate the three years where the
 * explanation is proven from the two where it is merely consistent and the one where the two figures
 * sit on different dates — and it must draw no difference at all, because in the one place the
 * subtraction can be done it produces ZERO rather than a gap.
 *
 * ============================ THE FORM, AND THE PAIR IS FILED THE OTHER WAY ===================
 *
 * PR-22 is a `contested` pair in the data and **structurally it is the renewables form**: one
 * publisher, one table, two definitional scopes, both correct. No instrument disagrees with
 * another. So the two lines share an axis — same unit, same denominator, same source — and the page
 * computes no difference, because `gapComputable` is false and the pair says why: the gap is not a
 * constant that could be reported as one figure, running from 0.52 points of GDP to 1.46.
 *
 * ============================ THE SEAM THE COMPARISON CROSSES =================================
 *
 * **L-0102 states the FY2013-14 to FY2021-22 divergence and that comparison crosses a declared
 * break at FY2019-20** — an estimate-stage seam, after which the table annotates Actual, Revised
 * Estimate, Budget Estimate. The corpus makes the comparison and the corpus also declares the seam.
 * **Both render.** The chart cuts at every seam, and the page says in words that the last two points
 * are estimates and the last Actual is FY2019-20. That is not a correction of the record; it is the
 * record and its own provenance shown together, which is the whole job.
 */

const STEPS = [
  {
    id: 'step-two',
    body: (
      <>
        <h2>There are two totals, in one table, for the same year</h2>
        <p>
          The Ministry of Education publishes public spending on education as a share of GDP, and it
          publishes two of them side by side. For 2021-22 they read <strong>2.75</strong> per cent
          and <strong>4.12</strong> per cent.
        </p>
        <p>
          Neither is a revision of the other and neither is wrong. The narrow one counts what
          education departments spend. The broad one adds training and the education spending of
          roughly 44 other ministries.
        </p>
      </>
    ),
  },
  {
    id: 'step-diverge',
    body: (
      <>
        <h2>Across the decade they move in opposite directions</h2>
        <p>
          From 2013-14 to 2021-22 the broad total rises, 3.84 per cent to 4.12. The narrow total
          falls over exactly the same years, 2.97 to 2.75.
        </p>
        <p>
          <strong>Same budgets, same table, opposite direction — and the whole of the difference is
          which ministries you count.</strong> Whichever sentence you have read about Indian
          education spending over the last decade, the other one is also published.
        </p>
      </>
    ),
  },
  {
    id: 'step-target',
    body: (
      <>
        <h2>And the target is measured against the one that rises</h2>
        <p>
          India has a long-standing commitment to spend 6 per cent of GDP on education. Parliament is
          briefed on the broad series — the Standing Committee&rsquo;s 363rd Report reproduces it
          verbatim — and the target is invoked against that one.
        </p>
        <p>
          <strong>So the distance to the target is 1.9 points or 3.3 points, depending on a
          definitional choice that is never stated when the target is quoted.</strong> That is not a
          rounding difference. It is most of the gap.
        </p>
      </>
    ),
  },
  {
    id: 'step-doubling',
    body: (
      <>
        <h2>And the rise has an unexplained step in it</h2>
        <p>
          The broad series is the only one of the two that improves across the change of
          government, and the record&rsquo;s own case against it says why: other-departments
          education spending grew <strong>41.7 per cent and then 49.0</strong> across 2013-14 and
          2014-15, roughly doubling in two years, against 11.4 and 8.4 per cent for education
          departments. <strong>No retrieved document explains it.</strong>
        </p>
        <p>
          The record is explicit that this makes the broad series unusable for the comparison it is
          most often used for, and that instruction is above rather than below: it is the sentence a
          narrative is most likely to lose.
        </p>
      </>
    ),
  },
];

export default function Story() {
  const narrow = getSeries('edu-spend-gdp-edu-depts');
  const broad = getSeries('edu-spend-gdp-all-depts');
  const l0102 = getLedger('L-0102');

  const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));
  const lines =
    narrow && broad
      ? [
          {
            key: 'narrow',
            label: 'Education departments only',
            unit: '% of GDP',
            points: narrow.points.filter((p) => p.country === 'IND'),
            breaks: (narrow.breaks ?? []).map((b) => yearOf(b.period)),
          },
          {
            key: 'broad',
            label: 'All departments',
            unit: '% of GDP',
            points: broad.points.filter((p) => p.country === 'IND'),
            breaks: (broad.breaks ?? []).map((b) => yearOf(b.period)),
          },
        ]
      : [];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/stories/">stories</Link> / what counts as
        education spending?
      </p>

      <h1 className="story-lead">Is India spending more on education, or less?</h1>
      <p className="lede">
        Both, and from the same table. The Ministry publishes two totals for the same years; over the
        last decade one rises and the other falls, and the difference between them is entirely which
        ministries are counted.
      </p>
      <p className="story-standfirst">
        A sequence, because the second number is only interesting once you believe the first.
        Everything here is on the records, linked at the end.
      </p>

      {lines.length === 2 ? (
        <StoryScroller
          steps={STEPS}
          lines={lines}
          /* Fixed at 6 for the story, which is the target both series are measured against — so the
             window is the one the argument is about, and it never moves with the emphasis step. */
          yMax={6}
          figureLabel="Public spending on education as a share of GDP on two official definitions, education departments only and all departments, 2000-01 to 2021-22. One table, one publisher, two numerators. The lines are cut at every declared change of basis."
        />
      ) : null}

      {/* THE REFUSAL, ABOVE THE PAGE. The jobs story put L-0058's instruction here for the reason
          that applies again: a narrative wants an ending, and this record's caveat is the sentence
          most likely to be lost to one. It is also the sentence that disarms the story's own most
          quotable line, which is exactly why it cannot sit in the sources. */}
      {l0102?.caveat ? (
        <>
          <h2>What the record says about using this comparison</h2>
          <CaveatFlag caveat={l0102.caveat} />
        </>
      ) : null}

      <h2>Who actually spends it</h2>
      <p>
        The broad total is not a ministry&rsquo;s budget. Within the Centre&rsquo;s own broad total of
        1.02 per cent of GDP the Ministry of Education is <strong>39 per cent</strong>, the rest being
        training and the education spending of the roughly 44 other ministries. Measured against the
        4.12 per cent all-India figure the Ministry is under a tenth, because{' '}
        <strong>the states carry about three-quarters of the money throughout.</strong>
      </p>
      <p className="story-callout">
        The Centre&rsquo;s own education-department spending fell from 0.64 to 0.40 per cent of GDP
        across the same window. <strong>A national total that rises can contain a central component
        that falls by nearly two-fifths</strong>, and the broad series is the one that hides it.
      </p>

      {/* THE SEAM AND THE STAGE. The comparison the record makes crosses a declared break, and the
          terminal points are Budget Estimates. Both facts are the corpus's own and both belong on
          the page that makes the comparison. */}
      <h2>What the last two points actually are</h2>
      <p>
        The table annotates its stage from 2019-20 onward: <strong>2019-20 Actual, 2020-21 Revised
        Estimate, 2021-22 Budget Estimate.</strong> So the terminal figures on both series are
        budgeted rather than spent, and the last Actual on either is 2019-20 — 2.73 and 4.04 per
        cent.
      </p>
      <p className="story-callout">
        Budget Estimates are revised down. On the one year where all three stages exist the broad
        basis reads <strong>4.39 budgeted, 4.30 revised, 4.04 actual</strong> — a 0.35-point fall
        from the first figure to the last. The chart cuts at that seam and at every other one, and
        no line is drawn across any of them.
      </p>

      {/* WHAT IS NOT PUBLISHED. Three declared absences on L-0102, in the corpus's own words. */}
      <h2>What is not published</h2>
      <p>
        The record carries three declared gaps, and the first is the one the whole comparison turns
        on.
      </p>
      <div className="absence">
        <ul className="story-gaps">
          {(l0102?.unmeasured ?? []).map((u) => (
            <li key={u.what}>
              <strong>{u.what}</strong> — {u.why}
            </li>
          ))}
        </ul>
      </div>
      <p className="story-callout">
        <strong>And the series has stopped.</strong> No edition of the analysis covering 2022-23 or
        later has been published — a four-year hole in an annual statistical series running since at
        least 2000-01 — so the current term has no observation on either of the two totals.
      </p>

      <StorySources slug="what-counts-as-education-spending" />
    </>
  );
}
