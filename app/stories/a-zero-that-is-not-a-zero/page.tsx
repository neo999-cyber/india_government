import Link from '@/components/Link';
import type { Metadata } from 'next';
import { storyCard } from '@/lib/share-card';
import { storyBySlug } from '@/lib/stories';
import { getLedger, getProvenance, getSeries } from '@/lib/data';
import { StoryScroller } from '@/components/StoryScroller';
import { SeriesChart } from '@/components/SeriesChart';
import { CaveatFlag } from '@/components/marks';
import { StorySources } from '@/components/StorySources';

/**
 * The card comes from `lib/stories.ts` through `storyCard`, not from a literal here. Every
 * story was unfurling the root fallback because a page that sets only `description` does not
 * override the layout's `openGraph`; the composer sets both.
 */
export const metadata: Metadata = storyCard(
  storyBySlug('a-zero-that-is-not-a-zero')!.title,
  storyBySlug('a-zero-that-is-not-a-zero')!.share,
  'a-zero-that-is-not-a-zero',
);

/**
 * STORY SEVEN — P-114, and it is a FIFTH form.
 *
 * ============================ ESTABLISHED BEFORE DRAWING, AS PR-35 WAS ========================
 *
 * Tested against the four that exist:
 *   1 · two instruments, same quantity, same unit, unresolved — **no**, there is one instrument.
 *   2 · two instruments, different quantities — **no**, same reason.
 *   3 · one publisher whose DEFINITION admits more than one boundary — **no**, and P-114 says why
 *       in its own first sentence: *nothing in the construction of the table changed; the change is
 *       in the world it measures.* No boundary moved.
 *   4 · two instruments, one quantity, a discrepancy that resolves — **no**, nothing differs.
 *
 * **THE FIFTH IS: ONE INSTRUMENT, A CELL IT CANNOT EXPLAIN, AND A SIBLING ROW THAT MAKES THE
 * READING POSSIBLE.** A zero in a release table normally means no demand or no claim. In West
 * Bengal's FY2022-23 row it means release was stopped under section 27, and the table carries no
 * column for that. What makes the cell legible is not a second measurement of the same quantity —
 * it is **Bihar's row on the same table, published by the same body in the same years, where no
 * stoppage was ordered.**
 *
 * ============================ WHAT THE FORM REQUIRES ==========================================
 *
 * **The control must be drawn, not described.** Without Bihar on the same axis the West Bengal line
 * is a collapse with an obvious cause, and the obvious cause is the thing the record forbids
 * asserting.
 *
 * **And the control must not be turned into a counterfactual.** This instrument declined a
 * counterfactual engine and the reasoning stands. Bihar is not what West Bengal would have looked
 * like; it is a second state on one table whose job cards fell 57 per cent with no stoppage in
 * force. **The corpus makes that claim, not this page** — it is in P-114's notes and in the
 * job-card series' own caveat, which forbids the causal reading by name.
 *
 * **The act itself is carried externally and says so.** P-114's bridge note: the section 27 fact
 * cannot be carried by the release table, and the order has never been published, so even the
 * external fact is a description rather than an instrument.
 *
 * ============================ THE PREFIX DESIGNED OUT ==========================================
 *
 * *West Bengal's MGNREGA money was stopped and its job cards collapsed* is true, is the sentence
 * this story is for, and is **the misleading half** — the reader who stops there has the causal
 * reading the record explicitly forbids. Seventh carrier for that shape. Step four carries both
 * states in its heading, so no prefix of the sequence states the collapse without its control.
 */

const STEPS = [
  {
    id: 'step-zero',
    body: (
      <>
        <h2>One row of the table reads nought</h2>
        <p>
          The Union publishes what it releases to each state under the rural employment guarantee.
          West Bengal&rsquo;s row reads ₹11,454.05 crore for 2020-21, ₹7,507.80 crore for 2021-22 and{' '}
          <strong>₹0.00 for 2022-23.</strong>
        </p>
        <p>
          A zero in a release table normally means no demand or no claim was made. This one does not.
          It means a power was exercised — and the table has no column in which to say so.
        </p>
      </>
    ),
  },
  {
    id: 'step-control',
    body: (
      <>
        <h2>The row underneath it did not stop</h2>
        <p>
          Bihar sits on the same table, published by the same body for the same years: ₹7,284.24
          crore, ₹5,407.37 crore, ₹6,395.29 crore. No stoppage was ordered against it and the
          releases continue.
        </p>
        <p>
          <strong>That sibling row is the only reason the zero is legible at all.</strong> Read alone,
          West Bengal&rsquo;s line is a scheme winding down. Read against Bihar&rsquo;s, it is
          something that happened to one state and not the other.
        </p>
      </>
    ),
  },
  {
    id: 'step-act',
    body: (
      <>
        <h2>The act is not in the instrument</h2>
        <p>
          Section 27 of the Act lets the Centre order stoppage of release of funds. Central release
          to West Bengal stopped on 9 March 2022 and did not resume for more than four years, and it
          was restored by a court rather than by the Ministry.
        </p>
        <p>
          <strong>The order itself has never been published.</strong> So the fact that makes the zero
          mean what it means has to be carried in from outside the table — and even that is a
          description of an order rather than the order.
        </p>
      </>
    ),
  },
  {
    id: 'step-both',
    body: (
      <>
        <h2>And new job cards collapsed in both states</h2>
        <p>
          New job cards issued in West Bengal fell from 16.82 lakh in 2020-21 to 8.25 lakh and then
          2.15 lakh. <strong>Bihar, against which no stoppage was ordered, fell from 26.68 lakh to
          11.37 lakh over the same two years</strong> — 57 per cent in 2022-23 alone.
        </p>
        <p>
          Whatever moved job-card issue in this period was not confined to West Bengal, and{' '}
          <strong>no retrieved instrument separates the two effects.</strong> The record says so in
          the series&rsquo; own words, and this page does not go further than that.
        </p>
      </>
    ),
  },
];

export default function Story() {
  const wbFunds = getSeries('wb-mgnrega-funds-released');
  const bhFunds = getSeries('bihar-mgnrega-funds-released');
  const wbCards = getSeries('wb-mgnrega-new-jobcards');
  const bhCards = getSeries('bihar-mgnrega-new-jobcards');
  const p114 = getProvenance('P-114');
  const l0168 = getLedger('L-0168');

  const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));
  const lines =
    wbFunds && bhFunds
      ? [
          {
            key: 'wb',
            label: 'West Bengal',
            unit: '₹ crore released',
            points: wbFunds.points.filter((p) => p.country === 'IND'),
            breaks: (wbFunds.breaks ?? []).map((b) => yearOf(b.period)),
          },
          {
            key: 'bihar',
            label: 'Bihar',
            unit: '₹ crore released',
            points: bhFunds.points.filter((p) => p.country === 'IND'),
            breaks: (bhFunds.breaks ?? []).map((b) => yearOf(b.period)),
          },
        ]
      : [];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/stories/">stories</Link> / a zero that is not
        a zero
      </p>

      <h1 className="story-lead">A zero that is not a zero</h1>
      <p className="lede">
        One row of the Union&rsquo;s rural-employment release table reads nought. It does not mean
        nothing was claimed — it means a statutory power was used, and the table has no way of saying
        so. What makes the cell readable is the row underneath it.
      </p>
      <p className="story-standfirst">
        A sequence, because the zero has to be believed before the control matters. Everything here
        is on the records, linked at the end.
      </p>

      {lines.length === 2 ? (
        <StoryScroller
          steps={STEPS}
          lines={lines}
          /* Fixed at 12000 for the story: the two series run 0 to 11,454.05 and the window never
             moves with the emphasis step, so the chart cannot argue by rescaling. */
          yMax={12000}
          figureLabel="MGNREGA central funds released by the Government of India to West Bengal and to Bihar, 2020-21 to 2022-23, from the Union's own by-state table. West Bengal's line is cut at 2022-23, where the figure is nought because release was stopped under section 27."
        />
      ) : null}

      {/* THE REFUSAL, ABOVE THE ARGUMENT. This story's most quotable line is the causal one — money
          stopped, job cards collapsed — and the job-card series' own caveat forbids exactly that
          reading and names Bihar's figures against it. It cannot sit at the foot. It renders again
          on its sources card, which is a listing row and where rule 3a requires it. */}
      {wbCards?.caveat ? (
        <>
          <h2>What the record forbids reading into this</h2>
          <CaveatFlag caveat={wbCards.caveat} />
        </>
      ) : null}

      {/* THE CONTROL, DRAWN RATHER THAN DESCRIBED — the thing the fifth form requires. Two charts
          on their own axes rather than one: these are two states' counts, and a shared axis would
          invite a reading about which state issues more cards, which is not the subject. */}
      {wbCards && bhCards ? (
        <>
          <h2>The two job-card series, side by side</h2>
          <p>
            The fall a reader expects the stoppage to explain happened in both states. Neither series
            is drawn against the other and no difference between them is computed: they are two
            states&rsquo; counts, and the point is the shape rather than the level.
          </p>
          <SeriesChart
            series={wbCards}
            takeaway="New job cards issued in West Bengal, across the two years spanning the stoppage."
            highlightLast={false}
          />
          <SeriesChart
            series={bhCards}
            takeaway="Bihar, on the same table and the same years, with no stoppage in force."
            highlightLast={false}
          />
          <p className="story-callout">
            <strong>Bihar is not what West Bengal would have looked like.</strong> This instrument
            declined to build a counterfactual engine and that reasoning holds here: Bihar is a
            second state on one table, not a model of a state that was not stopped. What the two rows
            together establish is narrower and firmer — that the fall was not confined to the state
            whose money was stopped.
          </p>
        </>
      ) : null}

      {/* WHO PUBLISHED IT, which is the other half of why the table is weak evidence. */}
      <h2>Whose figure this is</h2>
      <p>
        The publisher of the release table is the Union — <strong>a party to the dispute, stating its
        own release figures.</strong> So the table is evidence of what the Union says it released and
        not of what any state received, and those are different quantities: released, received and
        passed on are three numbers for one transfer, and only one of them is audited.
      </p>

      {/* WHAT CANNOT BE KNOWN — three absences on L-0168, and the first is the order itself. */}
      <h2>What is not published</h2>
      <p>
        The record carries three declared gaps, and the first is the document that would settle what
        the zero means.
      </p>
      <div className="absence">
        <ul className="story-gaps">
          {(l0168?.unmeasured ?? []).map((u) => (
            <li key={u.what}>
              <strong>{u.what}</strong> — {u.why}
            </li>
          ))}
        </ul>
      </div>

      {p114 ? (
        <p className="story-callout">
          <strong>And two dates circulate for this stoppage.</strong> 26 December 2021 is the last
          wage instalment and 9 March 2022 is the Union&rsquo;s own date for the stoppage of release
          under section 27. They are two different events, the record holds them at different grades,
          and the earlier one must not be propagated as the date of the stoppage.
        </p>
      ) : null}

      <StorySources slug="a-zero-that-is-not-a-zero" />
    </>
  );
}
