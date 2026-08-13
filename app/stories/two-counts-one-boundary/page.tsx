import Link from 'next/link';
import type { Metadata } from 'next';
import { storyCard } from '@/lib/share-card';
import { storyBySlug } from '@/lib/stories';
import { getLedger, getProvenance, getSeries } from '@/lib/data';
import { StoryScroller } from '@/components/StoryScroller';
import { CaveatFlag } from '@/components/marks';
import { StorySources } from '@/components/StorySources';

/**
 * The card comes from `lib/stories.ts` through `storyCard`, not from a literal here. Every
 * story was unfurling the root fallback because a page that sets only `description` does not
 * override the layout's `openGraph`; the composer sets both.
 */
export const metadata: Metadata = storyCard(
  storyBySlug('two-counts-one-boundary')!.title,
  storyBySlug('two-counts-one-boundary')!.share,
  'two-counts-one-boundary',
);

/**
 * STORY SIX — PR-35, and the fourth form, built.
 *
 * ============================ WHAT THE FORM IS, AND WHY IT IS NOT ANY OF THE THREE ============
 *
 * Established last batch and unchanged on re-reading. The two instruments carry DIFFERENT units —
 * `detenus` against `prisoners` — and the SAME quantity: both count preventive-detention prisoners
 * in J&K prisons at year end. That is not the jobs case (same unit, same quantity, unresolved), not
 * the reading or Kashmir case (different quantities, no shared axis), and not the renewables case
 * (one publisher, one boundary).
 *
 * **THE FOURTH FORM IS: TWO INSTRUMENTS, ONE QUANTITY, AND A DISCREPANCY THAT RESOLVES.** P-90
 * records `bridgeExists: true` — the only story subject so far where the corpus holds a bridge. The
 * parliamentary figure equals NCRB's count of J&K-domiciled detenus, and NCRB's foreign nationals
 * are the whole of the difference.
 *
 * ============================ WHAT THE FORM REQUIRES, AND IT IS THE HARD PART =================
 *
 * **THREE STATES, KEPT APART, BECAUSE THEY ARE THREE DIFFERENT CLAIMS.**
 *   PROVEN — 2014, 2015, 2018: the domicile decomposition was retrieved and the identity holds to
 *     the unit.
 *   CONSISTENT BUT UNPROVEN — 2016, 2017: the decomposition was not retrieved. The implied residuals
 *     of 37 and 40 fit the pattern and **are not evidence for it**, which is the corpus's own
 *     wording and the distinction the absence vocabulary exists to carry.
 *   NOT COMPUTABLE — 2019: a November figure against a 31 December one. No residual could be formed
 *     even with the decomposition in hand.
 *
 * **AND NO DIFFERENCE IS DRAWN ANYWHERE.** Not a band, not a residual column, not a subtraction in
 * prose. `gapComputable` is false and the reason is the finding: where the subtraction CAN be done
 * it produces **zero**, so a drawn gap would assert a quantity that the one testable case says is
 * not there. What renders instead is the COMPOSITION as the corpus states it — *35 = 7 + 0 + 28* —
 * which is an identity rather than a difference, and the coincidence is visible without subtracting.
 *
 * **The decomposition is not a series.** It exists in P-90's prose and nowhere in `/data` as points,
 * so a third line cannot be drawn without computing from prose. Two lines, and the identity in words.
 *
 * ============================ THE PREFIX THAT WOULD MISLEAD, WHICH IS THIS PAGE'S WHOLE RISK ===
 *
 * *Two official figures for the same thing differ in every year* is true, is the obvious opening,
 * and is **the opposite of the finding**. A reader who stops there leaves with a contradiction the
 * page exists to dissolve. The failing shape — true statement first, correction second — has now
 * appeared in five carriers. **Step one carries both halves in one sentence** and the sequence does
 * the work of showing how, and where the showing runs out.
 */

const STEPS = [
  {
    id: 'step-both',
    body: (
      <>
        <h2>Two official counts, and the gap between them is one thing</h2>
        <p>
          Two arms of the Indian state publish a year-end count of people held in preventive
          detention in Jammu and Kashmir. Neither cites the other, and their figures differ in every
          year they both cover — <strong>and in half of those years the difference is exactly the
          number of foreign nationals.</strong>
        </p>
        <p>
          This is not two instruments disagreeing. It is one count on two population boundaries,
          where only one of them says which boundary it is using.
        </p>
      </>
    ),
  },
  {
    id: 'step-identity',
    body: (
      <>
        <h2>Where it can be tested, it holds to the unit</h2>
        <p>
          NCRB&rsquo;s prison statistics break the count down by where the detenu belongs. In the
          three years for which that breakdown was retrieved, the parliamentary figure is the
          own-State column and nothing else:
        </p>
        {/* BLOCK ELEMENTS, NOT `<br />`. With line breaks the three identities weld in extracted
            text — `Parliament: 72015` — which is what a screen reader and any text check read. Same
            class as the flex-gap weld caught on the topic decomposition, and `rendered-space` cannot
            see it either: that gate binds JSX expression welding, not a break tag. */}
        <div className="story-ident mono">
          <span>2014 · 35 = 7 own + 0 other State + 28 other country · Parliament: 7</span>
          <span>2015 · 90 = 54 + 0 + 36 · Parliament: 54</span>
          <span>2018 · 283 = 253 + 0 + 30 · Parliament: 253</span>
        </div>
        <p>
          <strong>Three years, three exact matches, on two primaries neither of which cites the
          other.</strong> The parliamentary table excludes foreign nationals and never says so.
        </p>
      </>
    ),
  },
  {
    id: 'step-unproven',
    body: (
      <>
        <h2>In two more years the explanation fits and is not established</h2>
        <p>
          For 2016 and 2017 the domicile breakdown was not retrieved. The figures differ by 37 and by
          40, and those numbers are the right size to be foreign nationals.
        </p>
        <p>
          <strong>Consistent with the pattern is not evidence for it.</strong> Those two years are
          carried as unproven rather than folded into the three that were tested, because a story
          that counts five matches where the record has three is doing the thing this instrument
          exists to catch.
        </p>
      </>
    ),
  },
  {
    id: 'step-nocompute',
    body: (
      <>
        <h2>And in one year the question cannot be asked</h2>
        <p>
          For 2019 the two figures are not on the same date. The parliamentary answer states its
          count to November; NCRB&rsquo;s is at 31 December. No residual could be formed between them
          even with the breakdown in hand.
        </p>
        <p>
          Which is why <strong>no difference is drawn anywhere on this page</strong>. In the one place
          the subtraction can honestly be done, it comes out at zero — so a gap on a chart would
          assert a quantity the evidence says is not there.
        </p>
      </>
    ),
  },
];

export default function Story() {
  const psi = getSeries('jk-detenus-psi');
  const parl = getSeries('jk-prison-detained-category');
  const p90 = getProvenance('P-90');
  const l0135 = getLedger('L-0135');

  const lines =
    psi && parl
      ? [
          {
            key: 'psi',
            label: 'NCRB prison statistics',
            unit: 'detenus, 31 December',
            points: psi.points.filter((p) => p.country === 'IND'),
            breaks: (psi.breaks ?? []).map((b) => Number(b.period)),
          },
          {
            key: 'parl',
            label: 'Tabled in the Rajya Sabha',
            unit: 'prisoners, ‘Detained’ category',
            points: parl.points.filter((p) => p.country === 'IND'),
            breaks: (parl.breaks ?? []).map((b) => Number(b.period)),
          },
        ]
      : [];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/stories/">stories</Link> / two counts, one
        boundary
      </p>

      <h1 className="story-lead">
        Two counts of Kashmir&rsquo;s detainees, and the boundary between them
      </h1>
      <p className="lede">
        Two official instruments count the same thing and disagree in every year they share. The
        disagreement turns out not to be one: it is the same count drawn on two population
        boundaries, and only half the years can prove it.
      </p>
      <p className="story-standfirst">
        A sequence, because the resolution is only interesting once you have seen what it resolves.
        Everything here is on the records, linked at the end.
      </p>

      {lines.length === 2 ? (
        <StoryScroller
          steps={STEPS}
          lines={lines}
          /* Fixed at 600 for the story: the two series run 7 to 546 and the window never moves with
             the emphasis step, so the chart cannot argue by rescaling. */
          yMax={600}
          figureLabel="Preventive-detention prisoners in Jammu and Kashmir counted by NCRB's prison statistics and by a table tabled in the Rajya Sabha, 2009 to 2022. The same quantity on two population boundaries. No difference between them is drawn."
        />
      ) : null}

      {/* THE REFUSAL, ABOVE THE ARGUMENT. A reader arriving at a page about detention in Kashmir
          will assume these are Public Safety Act figures. Neither series is, and NCRB's caveat says
          so in its first four words — which is the sentence that disarms this story's most quotable
          line, and exactly why it cannot sit at the foot. Deferred in the sources grid so it renders
          once; `lib/stories.ts` names it. */}
      {psi?.caveat ? (
        <>
          <h2>What neither of these series is</h2>
          <CaveatFlag caveat={psi.caveat} />
        </>
      ) : null}

      {/* THE CORROBORATION, and it is the strongest single check in the subject. Not a difference:
          two independent primaries reporting the same figure for the same object. */}
      <h2>The check that runs the other way</h2>
      <p>
        The two documents also record J&amp;K prisoners held outside the territory, and there they
        agree exactly. The Ministry states <strong>27</strong> J&amp;K prisoners lodged in Haryana in
        2019; NCRB&rsquo;s own table shows Haryana holding exactly <strong>27</strong> out-of-State
        detenus and no others in the same year.
      </p>
      <p className="story-callout">
        <strong>Neither document cites the other.</strong> That is corroboration between two official
        sources rather than between a source and its own echo, and the record calls it the strongest
        single check anywhere in the detention subject. It is also the reason the boundary
        explanation is worth taking seriously in the years it cannot be tested.
      </p>

      {/* WHAT CANNOT BE KNOWN. The absences on both series and on L-0135, in the corpus's own words
          and inside the established dashed box. The first of them is the one that makes this whole
          subject harder than it looks. */}
      <h2>What neither instrument can tell you</h2>
      <p>
        Both series count preventive detention as a single undifferentiated category. Neither can
        say which law anyone is held under, which is the question almost everyone asking about
        detention in Kashmir is actually asking.
      </p>
      <div className="absence">
        <ul className="story-gaps">
          {[psi, parl, l0135]
            .filter(Boolean)
            .flatMap((r) => (r!.unmeasured ?? []).map((u) => ({ id: r!.id, ...u })))
            .map((u) => (
              <li key={`${u.id}-${u.what}`}>
                <strong>{u.what}</strong> — {u.why}
              </li>
            ))}
        </ul>
      </div>

      {p90 ? (
        <p className="story-callout">
          <strong>The bridge is recorded, and it is recorded as partial.</strong> P-90 states the
          identity, names the three years it is verified in, and says in its own words that 2016 and
          2017 are consistent rather than established and that 2019 cannot be tested at all. This
          page adds nothing to that; it puts the three states where a reader meets them.{' '}
          <strong>It is also filed with its direction of bias disputed</strong>, which the card below
          will say — and that is not in tension with anything here. The identity holds in the three
          years it can be tested; which instrument runs high or low as a general matter is a
          different question, and the record does not settle it.
        </p>
      ) : null}

      <StorySources slug="two-counts-one-boundary" />
    </>
  );
}
