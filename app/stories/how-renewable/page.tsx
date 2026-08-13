import Link from 'next/link';
import type { Metadata } from 'next';
import { getLedger, getProvenance, getSeries } from '@/lib/data';
import { StoryScroller } from '@/components/StoryScroller';
import { SeriesChart } from '@/components/SeriesChart';
import { CaveatFlag, RecordMarks } from '@/components/marks';
import { DIRECTION_OF_BIAS_LABELS } from '@/lib/format';

export const metadata: Metadata = {
  title: 'How much of India’s electricity is renewable?',
  description:
    'Four official answers for the same year, all correct, from 16.88 per cent to 53.21. The spread is the definition, not the data — and coal production nearly doubled underneath it.',
};

/**
 * STORY FOUR — renewables, and the form had to be different because there is no dispute.
 *
 * ============================ WHY THIS ONE COULD NOT USE THE OTHER TWO FORMS ==================
 *
 * The reading story and the jobs story are both **two instruments disagreeing**; the Kashmir story
 * is **two instruments counting different things under one word**. Renewables has neither.
 * **Environment's series layer carries 0 caveats and 0 declared absences across all 15 series** —
 * re-tested for this story, and it is the same measurement that disqualified renewables as the
 * subject of the FIRST story back in the design phase. There is no contested pair in the domain.
 *
 * **What there is instead: one publisher, four numbers that are all true, and a word whose official
 * boundary moved.** Nobody is disputing anything. The error is the reader's, and it is definitional.
 * That is a third form and it is why this story exists rather than being declined a second time.
 *
 * ============================ WHAT THE FIGURE MAY DRAW ========================================
 *
 * The two lines are non-fossil share of CAPACITY and non-fossil share of GENERATION — the same
 * boundary, two different quantities, both per cent. Same unit, different quantity: the Kashmir
 * case, so both render at real magnitude and neither is presented as a correction of the other.
 *
 * **The 24.24-point gap IS stated, and only because the corpus states it.** L-0221's own summary
 * computes it. This page quotes that record's arithmetic rather than performing its own — the
 * distinction that matters wherever `gapComputable` is false elsewhere in the corpus.
 *
 * ============================ THE PREFIX THAT WOULD MISLEAD ===================================
 *
 * Step one must not open with *53.21 per cent of India's generating fleet is non-fossil*. It is
 * true, it is the sentence the milestone press release makes, and alone it is the misreading the
 * whole page exists to correct. The step opens on the spread instead — four answers, 16.88 to
 * 53.21 — which cannot be read as a headline by a reader who stops there.
 */

const STEPS = [
  {
    id: 'step-four',
    body: (
      <>
        <h2>There are four official answers, and all of them are right</h2>
        <p>
          Ask how much of India&rsquo;s electricity is renewable and the government publishes four
          numbers for the same year. For 2025-26: <strong>53.21</strong> per cent, 41.91 per cent,{' '}
          <strong>28.96</strong> per cent and 16.88 per cent.
        </p>
        <p>
          None is wrong and none is a revision of another. They differ on two questions that are
          never asked out loud — whether you are counting the machines or the electricity, and what
          the word renewable is taken to include.
        </p>
      </>
    ),
  },
  {
    id: 'step-capacity',
    body: (
      <>
        <h2>Capacity is not electricity</h2>
        <p>
          The number that gets announced is the fleet: 53.21 per cent of India&rsquo;s installed
          generating capacity was non-fossil at 31 March 2026, and the 50 per cent milestone was
          declared reached five years early. The electricity that fleet actually produced over the
          same year was 28.96 per cent non-fossil.
        </p>
        <p>
          <strong>The record puts the two 24.24 percentage points apart, and says the gap is
          widening.</strong> A solar panel at midnight is still installed capacity. Nothing here is
          concealed — both figures come from the same authority — but only one of them is the one
          people mean.
        </p>
      </>
    ),
  },
  {
    id: 'step-word',
    body: (
      <>
        <h2>And the word moved</h2>
        <p>
          &ldquo;Renewable&rdquo; has at least four concurrent official boundaries in Indian
          practice. On 7 March 2019 the Union Cabinet moved large hydropower across one of them:
          before that only projects under 25 MW counted as renewable, and after it all of them did.
          At the end of that month large hydro stood at 45,399 MW.
        </p>
        <p>
          <strong>Forty-five gigawatts changed category without a turbine being built.</strong> This
          instrument carries both boundaries as separate series rather than choosing one, which is
          why two of the four numbers above exist at all.
        </p>
      </>
    ),
  },
  {
    id: 'step-coal',
    body: (
      <>
        <h2>Underneath all of it, coal grew</h2>
        <p>
          Over roughly the same period India&rsquo;s raw coal production went from 565.77 million
          tonnes to 1,047.52 — an increase of about 85 per cent. Thermal coal imports were to stop in
          2023-24, and in that year they reached the highest figure in the published ten-year table.
        </p>
        <p>
          <strong>And the coal plants are running harder, not less.</strong> Their load factor rose
          from 65.56 per cent to 69.45. Displacement would show up here first, as coal plant standing
          idle. It has not.
        </p>
      </>
    ),
  },
];

export default function Story() {
  const capacity = getSeries('non-fossil-capacity-share');
  const generation = getSeries('non-fossil-generation-share');
  const coal = getSeries('coal-production');
  const plf = getSeries('coal-plf');
  const pWord = getProvenance('P-121'); // four boundaries, and large hydro moved across one
  const pImputed = getProvenance('P-122'); // generation was imputed, not metered, up to FY2013-14
  const pJoin = getProvenance('P-126'); // the generation series joins two documents with no overlap
  const l0221 = getLedger('L-0221');
  const l0222 = getLedger('L-0222');
  const l0226 = getLedger('L-0226');

  const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));
  const lines =
    capacity && generation
      ? [
          {
            key: 'capacity',
            label: 'Share of the fleet',
            unit: '% of installed capacity',
            points: capacity.points.filter((p) => p.country === 'IND'),
            breaks: (capacity.breaks ?? []).map((b) => yearOf(b.period)),
          },
          {
            key: 'generation',
            label: 'Share of the electricity',
            unit: '% of generation',
            points: generation.points.filter((p) => p.country === 'IND'),
            breaks: (generation.breaks ?? []).map((b) => yearOf(b.period)),
          },
        ]
      : [];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/stories/">stories</Link> / how much is
        renewable?
      </p>

      <h1 className="story-lead">How much of India&rsquo;s electricity is renewable?</h1>
      <p className="lede">
        The government publishes four answers for the same year and every one of them is correct.
        They run from 16.88 per cent to 53.21. Nothing is disputed and nothing is hidden — the
        spread is what the words mean.
      </p>
      <p className="story-standfirst">
        A sequence, because the number you have already heard is the one that needs unpicking first.
        Everything here is on the records, linked at the end.
      </p>

      {lines.length === 2 ? (
        <StoryScroller
          steps={STEPS}
          lines={lines}
          /* Fixed at 60 for the story: both series are percentages running 21 to 54 and the window
             never moves with the emphasis step, so the chart cannot argue by rescaling. */
          yMax={60}
          figureLabel="India's non-fossil share of installed generating capacity and of electricity generated, 2012-13 to 2025-26. The same boundary applied to two different quantities: the fleet and the electricity it produced."
        />
      ) : null}

      {/* THE CIRCULATING NUMBER, AND THE RECORD'S OWN CORRECTION OF IT. Placed above the rest for
          the reason the jobs and Kashmir stories place their refusals there: this is the sentence a
          reader is most likely to arrive already believing. */}
      {l0221?.caveat ? (
        <>
          <h2>The figure you may have seen instead</h2>
          <CaveatFlag caveat={l0221.caveat} />
        </>
      ) : null}

      {/* THE COAL SIDE, GIVEN ITS OWN CHART. Not on the axis above: tonnes and per cent are not one
          quantity and no conversion between them exists. Two facts about one system, kept apart. */}
      {coal ? (
        <>
          <h2>What happened to coal over the same years</h2>
          <SeriesChart
            series={coal}
            takeaway="Raw coal production, which rose while the non-fossil share of the fleet was passing half."
            highlightLast={false}
          />
          {plf ? (
            <p className="story-callout">
              <strong>And the plants ran harder.</strong> The load factor of coal and lignite
              thermal stations rose from 65.56 per cent in 2013-14 to 69.45 in 2024-25. A fleet being
              displaced runs less; this one runs more. That is not an argument that the renewable
              build-out is not real — it is that the two things happened at once, and only one of
              them is usually mentioned.
            </p>
          ) : null}
        </>
      ) : null}

      {/* THE BASELINE PROBLEM. P-122 is the sharpest measurement fact in this domain and it has no
          natural home in the narrative above, because it is about the instrument rather than the
          policy. It gets its own section rather than a footnote. */}
      {pImputed ? (
        <>
          <h2>One more thing about the earliest figures</h2>
          <p>
            Renewable generation before 2014-15 was <strong>imputed rather than metered</strong> —
            derived from installed capacity and an assumed load factor — and metered from 2014-15
            onward. The authority states the change in a note under its own table.
          </p>
          <p className="story-callout">
            The break falls on 1 April 2014, within weeks of this instrument&rsquo;s frozen baseline
            of May 2014. <strong>So the last year of the imputed basis is the baseline year</strong>,
            and any comparison of renewable generation across that line compares an estimate with a
            measurement. The series is cut there and no line is drawn across it.
          </p>
        </>
      ) : null}

      {/* WHAT IS NOT PUBLISHED. Environment's SERIES layer declares no absences at all — measured,
          0 of 15 — so every absence in this story comes from the ledger records, and they are
          rendered in the corpus's own words inside the established dashed box. */}
      <h2>What is not published</h2>
      <p>
        The environment series in this instrument declare no gaps of their own. The records built on
        them do, and the three below are the ones this page rests on.
      </p>
      <div className="absence">
        <ul className="story-gaps">
          {[l0221, l0222, l0226]
            .filter(Boolean)
            .flatMap((l) => (l!.unmeasured ?? []).map((u) => ({ id: l!.id, ...u })))
            .map((u) => (
              <li key={`${u.id}-${u.what}`}>
                <strong>{u.what}</strong> — {u.why}
              </li>
            ))}
        </ul>
      </div>

      <h2>Where this comes from</h2>
      <p className="prose-note">
        Every claim above is on a record with its sources and its declared gaps. Nothing here is a
        dispute between publishers, because there is not one: the numbers all come from the same
        authority and mean different things.
      </p>
      <div className="grid">
        {[pWord, pImputed, pJoin].filter(Boolean).map((p) => (
          <Link key={p!.id} href={`/provenance/${p!.id}/`}>
            <span className="label">{p!.id} · measurement dispute</span>
            <span className="grid-title">{p!.title}</span>
            <span className="grid-meta">
              {DIRECTION_OF_BIAS_LABELS[p!.directionOfBias] ?? p!.directionOfBias}
            </span>
          </Link>
        ))}
        {l0221 ? (
          <Link href="/ledger/L-0221/">
            <span className="label">record · {l0221.assessment}</span>
            <span className="grid-title">{l0221.title}</span>
            <span className="grid-meta">the capacity milestone and the electricity behind it</span>
            <RecordMarks record={l0221} linkify={false} />
          </Link>
        ) : null}
        {l0222 ? (
          <Link href="/ledger/L-0222/">
            <span className="label">record · {l0222.assessment}</span>
            <span className="grid-title">{l0222.title}</span>
            <span className="grid-meta">the import stop that did not happen</span>
            <RecordMarks record={l0222} linkify={false} />
          </Link>
        ) : null}
        {l0226 ? (
          <Link href="/ledger/L-0226/">
            <span className="label">record · {l0226.assessment}</span>
            <span className="grid-title">{l0226.title}</span>
            <span className="grid-meta">a rule and a plan that do not agree</span>
            <RecordMarks record={l0226} linkify={false} />
          </Link>
        ) : null}
      </div>
    </>
  );
}
