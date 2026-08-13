import Link from 'next/link';
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
  storyBySlug('did-jobs-grow')!.title,
  storyBySlug('did-jobs-grow')!.share,
  'did-jobs-grow',
);

/**
 * STORY TWO — DESIGN-REVISION-2 §7, and the second subject this corpus can carry in this form.
 *
 * ============================ WHY THIS QUESTION, AND NOT THE ONE THE BRIEF LISTS FIRST ========
 *
 * §7 offers nine candidate questions and says most are answerable from the corpus. **Measured, they
 * are not equally answerable, and the one listed FIRST is the least.** *Did demonetisation achieve
 * what was announced?* has **zero series** in this corpus — one ledger record, L-0011, and nothing
 * measured over time. Relaxed to `currency`, `cash`, `note` and to the November 2016 date, still
 * zero. The story form here needs one measure and a conflicting measure; demonetisation has neither.
 *
 * *Did jobs grow after 2014?* has both, declared: **PR-12 and PR-13 are contested pairs** — the same
 * quantity measured by two instruments that disagree — with four series, four provenance records and
 * three ledger records behind them. It is the closest structural match to the story already built.
 *
 * ============================ WHAT MAKES THIS DIFFERENT FROM THE READING STORY ================
 *
 * The reading story draws two lines and says **no gap between them is drawn here**, because ASER and
 * PARAKH measure different quantities. **These two measure the SAME quantity** — the unemployment
 * rate, as a share of the labour force — which is what makes them a `contested` pair rather than an
 * incommensurable one. So the lines share a scale, and they may.
 *
 * **What still may not happen is a gap.** PR-12 records `gapComputable: false` with its reason:
 * *two figures that disagree about the sign of a change have a disagreement, not a gap.* No number
 * is subtracted anywhere on this page, and neither side is called the corrective.
 *
 * ============================ THE CONSTRAINT THAT SHAPES EVERY FIGURE ON THIS PAGE ============
 *
 * **Every PLFS series here breaks at FY2025-26** (P-39, the January 2025 sample redesign), and at
 * FY2017-18 (P-02, the EUS-to-PLFS transition). Rule 2 forbids reading across either. So every
 * comparison on this page runs **FY2017-18 to FY2023-24** and stops there, and the most recent
 * published figures are deliberately not compared to anything. That is not caution about the data;
 * it is the survey's own custodians saying the series does not join.
 *
 * ============================ WHAT THIS PAGE MAY NOT DO =======================================
 *
 * It may not answer its own title. L-0058 carries the instruction in the corpus's own words —
 * *this record must not be resolved in either direction* — and it renders here in full. A narrative
 * surface that quietly picked PLFS or CMIE would be the moment this became advocacy, which is the
 * same line the reading story draws.
 */

const STEPS = [
  {
    id: 'step-plfs',
    body: (
      <>
        <h2>The official number falls, and it keeps falling</h2>
        <p>
          India&rsquo;s official measure of joblessness is the Periodic Labour Force Survey, run by
          the Ministry of Statistics. On it, the unemployment rate among people aged 15 and over fell
          from 6.0 per cent in 2017-18 to 3.2 per cent in 2023-24. Over the same years the share of
          people in the labour force at all rose from 49.8 per cent to 60.1 per cent.
        </p>
        <p>
          Together those two movements invite one reading — more people looking for work, and a
          smaller share of them failing to find it — and it is the reading every official statement
          about Indian employment is built on. <strong>Hold it lightly.</strong> The record attached
          to this series opens by saying it cannot be read as a jobs indicator, and the next three
          steps are why.
        </p>
      </>
    ),
  },
  {
    id: 'step-cmie',
    body: (
      <>
        <h2>A second survey runs the other way</h2>
        <p>
          A private research company, the Centre for Monitoring Indian Economy, runs its own
          household survey. On it the unemployment rate went from 7.0 per cent in 2018-19 to 9.05 per
          cent in 2023-24 — and participation fell, from 43 per cent to 40.
        </p>
        <p>
          <strong>The two do not differ by a margin. They differ by a sign.</strong> Over 2017-18 to
          2021-22 the official survey records employment growing by 4.55 per cent, some 88.86 million
          people; the private one records it shrinking by 0.30 per cent, some 5.62 million fewer.
          One instrument says the thing went up and the other says it went down.
        </p>
      </>
    ),
  },
  {
    id: 'step-nogap',
    body: (
      <>
        <h2>You cannot split the difference</h2>
        <p>
          The obvious move is to average them, or to pick the one with the better pedigree. The
          official survey is a government primary and the private one is a subscription-gated survey
          with a contested sampling frame, so the pedigree argument looks easy.
        </p>
        <p>
          It does not work, and the reason is not diplomacy. The two surveys ask different questions.
          One supports statements about who is in the labour force and what kind of work they do; the
          other about open joblessness among people actively looking. <strong>No bridge estimate
          exists between them</strong>, and two figures that disagree about the direction of a change
          have a disagreement, not a gap. Nothing is subtracted on this page.
        </p>
      </>
    ),
  },
  {
    id: 'step-composition',
    body: (
      <>
        <h2>And the official fall is not made of jobs</h2>
        <p>
          There is a second problem with the falling rate, and it is inside the official survey
          rather than between the two. The survey counts an unpaid helper in a household enterprise
          as employed. <strong>So the unemployment rate falls when people are absorbed into unpaid
          family work</strong> — which is close to the opposite of what a falling unemployment rate
          is normally taken to mean.
        </p>
        <p>
          Decomposed over the same 2017-18 to 2023-24 window, that is largely what happened.
          Self-employment rose from 52 to 58.4 per cent of workers. Agriculture&rsquo;s share of
          employment rose, from 42.5 per cent in 2018-19 to 46.1. Regular wage employment — a job
          with a wage and an employer — did not rise at all: 22.8 per cent, then 21.7.
        </p>
      </>
    ),
  },
];

export default function Story() {
  const plfs = getSeries('unemployment-rate');
  const cmie = getSeries('unemployment-rate-cmie');
  const unpaid = getSeries('unpaid-helper-share');
  const p39 = getProvenance('P-39');
  const l0058 = getLedger('L-0058');
  const l0064 = getLedger('L-0064');

  /**
   * ONE SCALE, AND HERE IT IS EARNED. The reading story refuses a shared scale because ASER and
   * PARAKH measure different quantities. These two measure the same one, in the same unit, which is
   * precisely what makes PR-12 a contested pair — so the lines belong on one axis and the
   * divergence is the picture. The breaks still cut both paths; rule 2 does not relax for a story.
   */
  const lines =
    plfs && cmie
      ? [
          {
            key: 'plfs',
            label: 'PLFS, official',
            unit: '% of labour force',
            points: plfs.points.filter((p) => p.country === 'IND'),
            breaks: (plfs.breaks ?? []).map((b) => Number(String(b.period).replace(/^FY/, '').slice(0, 4))),
          },
          {
            key: 'cmie',
            label: 'CMIE, private',
            unit: '% of labour force',
            points: cmie.points.filter((p) => p.country === 'IND'),
            breaks: (cmie.breaks ?? []).map((b) => Number(String(b.period).replace(/^FY/, '').slice(0, 4))),
          },
        ]
      : [];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/stories/">stories</Link> / did jobs grow
        after 2014?
      </p>

      <h1 className="story-lead">Did jobs grow after 2014?</h1>
      <p className="lede">
        India measures this twice too. The official survey and the best-known private one disagree
        about which way employment moved — not by how much, but in which direction — and the official
        fall in joblessness turns out to be made of something other than jobs.
      </p>
      <p className="story-standfirst">
        A sequence, because the order matters: the official number is the one you have heard, and it
        is only interesting once you know what it counts. Everything here is on the records, linked
        at the end.
      </p>

      {lines.length === 2 ? (
        <StoryScroller
          steps={STEPS}
          lines={lines}
          /* 10, not the component's old hardcoded 75: these two run 3.1 to 9.05, and on a 0-75
             window the divergence that is the whole point of the page sat in the bottom eighth.
             Fixed for the story, so the emphasis step never changes the geometry. */
          yMax={10}
          figureLabel="Two surveys of the Indian unemployment rate, 2017-18 to 2025-26, on one scale because both measure the same quantity. They disagree about the direction."
        />
      ) : null}

      {/* THE INSTRUCTION IS THE CORPUS'S OWN, AND IT RENDERS IN FULL. L-0058's caveat says the
          record must not be resolved in either direction. A story is exactly the surface most
          likely to resolve it by accident — a narrative wants an ending — so the instruction sits
          above the rest of the page rather than in the sources at the foot. */}
      {l0058?.caveat ? (
        <>
          <h2>What the record says about resolving this</h2>
          <CaveatFlag caveat={l0058.caveat} />
        </>
      ) : null}

      {/* The definitional finding, given its own chart, because it is the mechanism the whole
          composition argument runs on and it is measured rather than asserted. */}
      {unpaid ? (
        <>
          <h2>The definition that makes the fall possible</h2>
          <p>
            If unpaid family labour counts as employment, then the share of workers who are unpaid
            helpers is the quantity to watch. It is published, and over the three years it covers —
            2018-19 to 2020-21 — it rose from 13.3 per cent of workers to 17.3.
          </p>
          <p>
            <strong>And then it stops.</strong> The last observation is 2020-21, well before the
            year most series in this instrument reach, so the quantity that shows what the falling
            unemployment rate is made of is not one a reader can follow to the present. That is a
            fact about what is published, not an inference about why.
          </p>
          <SeriesChart
            series={unpaid}
            takeaway="Unpaid helpers in household enterprises, as a share of all workers. Counted as employed."
            highlightLast={false}
          />
          <p className="story-callout">
            <strong>None of this makes the official rate wrong.</strong> It is correct on its own
            definition, and the definition is published. What it means is that the sentence
            &ldquo;unemployment fell&rdquo; and the sentence &ldquo;more people got jobs&rdquo; are
            not the same sentence, and only the first is supported here.
          </p>
        </>
      ) : null}

      {/* WHAT CANNOT BE KNOWN. The four series carry no declared absence of their own; the absence
          in this domain sits on L-0064, and it is the largest one the employment record holds. It
          renders in the corpus's own words, with its own reason kind, per rule 4b. */}
      {l0064 ? (
        <>
          <h2>What no instrument here can tell you</h2>
          <p>
            The disagreement is not the only gap. In March 2020 a lockdown announced with four
            hours&rsquo; notice sent urban informal workers home on foot, and the record of what
            happened to them is a record of two things nobody counted.
          </p>
          <div className="absence">
            <ul className="story-gaps">
              {(l0064.unmeasured ?? []).map((u) => (
                <li key={u.what}>
                  <strong>{u.what}</strong> — {u.why}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {/* THE BREAK THAT ENDS THE COMPARISON, and the reason every figure above stops at 2023-24. */}
      {p39 ? (
        <>
          <h2>Why every number above stops at 2023-24</h2>
          <p>
            From January 2025 the official survey was substantially redesigned — first-stage sampling
            units raised from 12,800 to 22,692, households per unit from 8 to 12, the total sample to
            roughly 2.72 lakh households against about 1.02 lakh before, with a monthly rotational
            panel introduced. Figures published after that redesign are not on the same basis as the
            ones before it.
          </p>
          <p className="story-callout">
            So the series is broken against itself at the most recent end, and the newest official
            employment figures cannot be compared with the years this page is about.{' '}
            <strong>That is not this instrument being careful. It is the survey&rsquo;s own
            redesign.</strong>
          </p>
        </>
      ) : null}

      <StorySources slug="did-jobs-grow" />
    </>
  );
}
