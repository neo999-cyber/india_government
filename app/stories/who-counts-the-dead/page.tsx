import Link from 'next/link';
import type { Metadata } from 'next';
import { getLedger, getProvenance, getSeries } from '@/lib/data';
import { StoryScroller } from '@/components/StoryScroller';
import { SeriesChart } from '@/components/SeriesChart';
import { CaveatFlag, RecordMarks } from '@/components/marks';
import { DIRECTION_OF_BIAS_LABELS } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Who counts the dead in Kashmir?',
  description:
    'Twenty-seven of thirty indicators here are published by the Indian state. Three are not, and all three count deaths. What happens when you put them next to the official figure is not what you would expect.',
};

/**
 * STORY THREE — Kashmir, and the pair-type check changed what it could draw.
 *
 * ============================ THE ASYMMETRY, MEASURED AND NARROWED ============================
 *
 * The scoping note for this story described the counts bearing against the state as coming from
 * *hospitals, courts and commissions*. **Measured across the 30 series read through this lens, that
 * is not what the corpus holds.** 27 are published by the Indian state — the Ministry of Home
 * Affairs, the Election Commission, the NCRB, the National Human Rights Commission, the territory's
 * own departments. **Three are not**, and they are a press-compiled register (SATP, two series) and
 * a human-rights coalition (JKCCS and APDP, one). No hospital series and no court series exists
 * here. The NHRC is a statutory commission and its two series are the state measuring itself, which
 * RULING 1a admits as intra-state evidence and requires be said plainly.
 *
 * **The narrower fact is the stronger one:** all three of the non-official series count DEATHS, all
 * three are T4, and each is paired against an official count that disagrees.
 *
 * ============================ WHY THIS STORY DRAWS DIFFERENTLY FROM THE JOBS ONE ==============
 *
 * The jobs story shares one axis because PLFS and CMIE measure the same quantity in the same unit —
 * that is what makes them contested rather than incommensurable. **Every Kashmir contested pair was
 * checked and not one of them is that case.** PR-26 and PR-32 are the same unit (`deaths`) and
 * explicitly NOT the same quantity: *the two are not one quantity measured with error*. PR-27 is two
 * `incidents` series where one is a component of the other's composite. PR-35 puts `detenus` against
 * `prisoners`. **Same unit is not same quantity, and the two look identical on a page.**
 *
 * So the figure here shows both series at their real magnitudes — PR-26 requires it, *neither may be
 * shown alone* — and **no difference is drawn, computed or stated anywhere**, because
 * `gapComputable` is false on every one of these pairs.
 *
 * ============================ THE STEP THAT WOULD HAVE MISLED, AND WHAT IT SAYS INSTEAD ========
 *
 * The obvious third step is *the independent count is higher than the official one*. It is what a
 * reader expects and it is **contradicted by the corpus's own figures**: the press register runs
 * above the ministry in one year of the five they share and below it in four. Leading with the
 * expected version would have been a prefix that misleads alone — the jobs story's failure, which
 * was itself item 6's truncation rule in a different carrier. The step leads with the crossover.
 */

const STEPS = [
  {
    id: 'step-who',
    body: (
      <>
        <h2>Almost everything here is counted by the state</h2>
        <p>
          Thirty indicators in this instrument are read through Kashmir. Twenty-seven of them are
          published by the Indian state — the Ministry of Home Affairs, the Election Commission, the
          prison statistics bureau, the human rights commission, the territory&rsquo;s own
          departments.
        </p>
        <p>
          That is not, by itself, an accusation. Counting is what states do, and a territory
          administered directly from Delhi will be counted from Delhi. It is the starting condition
          for everything below.
        </p>
      </>
    ),
  },
  {
    id: 'step-three',
    body: (
      <>
        <h2>Three are not, and all three count deaths</h2>
        <p>
          The exceptions are a press-compiled register maintained by a terrorism-monitoring portal,
          which keeps two of them, and a single series from a human-rights coalition working in the
          territory. There is no hospital series here and no court series.{' '}
          <strong>Every one of the three counts people killed.</strong>
        </p>
        <p>
          All three are graded T4 in this instrument — a document held and read, but not an official
          primary. That grade is about what the document is, not about whether it is right.
        </p>
      </>
    ),
  },
  {
    id: 'step-crossover',
    body: (
      <>
        <h2>And they do not sit where you would expect</h2>
        <p>
          The expected shape is an official undercount and an independent count above it. For
          civilians killed, that holds in exactly one year. In 2018 the ministry&rsquo;s column reads
          55 and the press register 86. Then it inverts: 44 against 42 in 2019, 38 against 33 in
          2020, 41 against 36 in 2021, 31 against 28 in 2022.
        </p>
        <p>
          <strong>The register runs above the official count in one of the five years they share and
          below it in four.</strong> Whatever is going on between these two instruments, it is not
          one of them catching deaths the other misses.
        </p>
      </>
    ),
  },
  {
    id: 'step-nosub',
    body: (
      <>
        <h2>Which is why you cannot subtract them</h2>
        <p>
          The two count different things under one word. The ministry&rsquo;s column merges civilians
          killed in terrorist-initiated incidents with civilians killed during counter-terrorism
          operations and attributes neither, on returns booked by police stations, on a basis never
          defined in seventeen years of reports. The register counts people it classifies as
          civilians in incidents it classifies as terrorism-related, compiled from news reports, with
          no published definition of the word and no methodology page of any kind.
        </p>
        <p>
          <strong>They fail in opposite directions.</strong> Press reportability misses routine,
          remote-sector and blackout-period deaths; administrative reportability misses deaths the
          state has an interest in not booking. Neither contains the other, so no difference between
          them is drawn on this page and none is computed.
        </p>
      </>
    ),
  },
];

export default function Story() {
  const official = getSeries('jk-civilians-killed-composite');
  const register = getSeries('jk-civilians-killed-satp');
  const jkccs = getSeries('jkccs-civilians-killed-by-armed-forces');
  // Traced to the pairs' own `provenanceRefs`: PR-26 declares P-73, P-75, P-85; PR-32 declares
  // P-73 and P-87. An earlier draft cited P-78, which belongs to neither, and the names below are
  // what each record SAYS rather than which pair it came from, so the slip cannot repeat.
  const pMeaning = getProvenance('P-73');
  const pMethod = getProvenance('P-75');
  const pAttrib = getProvenance('P-87');
  const l0110 = getLedger('L-0110');
  const l0111 = getLedger('L-0111');

  const yearOf = (p: string) => Number(String(p).replace(/^FY/, '').slice(0, 4));
  const lines =
    official && register
      ? [
          {
            key: 'official',
            label: 'MHA, official',
            unit: 'civilians killed',
            points: official.points.filter((p) => p.country === 'IND'),
            breaks: (official.breaks ?? []).map((b) => yearOf(b.period)),
          },
          {
            key: 'register',
            label: 'Press-compiled register',
            unit: 'civilians killed',
            points: register.points.filter((p) => p.country === 'IND'),
            breaks: (register.breaks ?? []).map((b) => yearOf(b.period)),
          },
        ]
      : [];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/stories/">stories</Link> / who counts the
        dead in Kashmir?
      </p>

      <h1 className="story-lead">Who counts the dead in Kashmir?</h1>
      <p className="lede">
        Twenty-seven of the thirty indicators this instrument reads through Kashmir are published by
        the Indian state. Three are not, and all three count deaths — which makes the question of
        who is doing the counting the same question as what is being counted.
      </p>
      <p className="story-standfirst">
        A sequence, because the expected answer is wrong and you have to see the official figure
        first to see why. Everything here is on the records, linked at the end.
      </p>

      {lines.length === 2 ? (
        <StoryScroller
          steps={STEPS}
          lines={lines}
          /* Fixed at 100 for the story: the two series run 14 to 86 and the window never moves with
             the emphasis step, so the chart cannot argue by rescaling. */
          yMax={100}
          figureLabel="Civilians killed in Jammu and Kashmir as counted by the Ministry of Home Affairs and by a press-compiled register, 2014 to 2024. The same unit, and not the same quantity: no difference between them is drawn."
        />
      ) : null}

      {/* THE REFUSAL, WHERE A READER MEETS IT. The jobs story put L-0058's instruction above the
          page rather than in the sources, because a narrative wants an ending. The same applies
          here and more sharply: this is a page about deaths in a disputed territory, and the
          official series' own caveat is the thing most likely to be lost to the argument. */}
      {official?.caveat ? (
        <>
          <h2>What the official column actually is</h2>
          <CaveatFlag caveat={official.caveat} />
        </>
      ) : null}

      {/* The second non-official series, and it is a different finding from the first: not a rival
          count but the only attributed one, and it stopped. */}
      {jkccs ? (
        <>
          <h2>The count that attributed the deaths, and then stopped</h2>
          <p>
            One instrument in this domain did the thing the official column does not: it named who
            was responsible for each death it could, and left the largest group unattributed rather
            than forcing it. It was kept by a human-rights coalition, not by the state, and it
            covers two years.
          </p>
          <SeriesChart
            series={jkccs}
            takeaway="Civilians killed by armed forces, as recorded by a non-official coalition. Two observations, and the second is a floor."
            highlightLast={false}
          />
          <p className="story-callout">
            <strong>The 2019 figure is a floor, stated as such by the body that produced it</strong>{' '}
            — its own edition records that after 5 August 2019 no proper research or documentation
            could be undertaken. So the corpus holds two-sided accounting for civilian deaths in
            Kashmir for exactly two years, it was never official, and it ended.
          </p>
        </>
      ) : null}

      {/* 116 ABSENCES, AND THE FORM IS THE ESTABLISHED ONE. Rule 4b requires an absence to reach a
          reader; it does not require 116 of them to be listed on a narrative page, and a list that
          long stops being read. The count, its kinds and a route — the dashed unfilled box that
          every other absence on this site renders in. The members are on the topic's own tab, in
          full, which is where rule 4b binds them. */}
      <h2>What is not counted at all</h2>
      <p>
        The disagreements above are between things that were counted. Underneath them sit the
        quantities that records in this topic declare nobody measures.
      </p>
      <div className="absence">
        <p>
          <strong>116 declared absences across 54 records</strong> — 64 collected and not published,
          31 never collected, 12 never defined, 9 withheld. Each is named on its own record with the
          reason that record gives, and they are listed in full on{' '}
          <Link href="/domains/kashmir/missing/">this topic&rsquo;s missing-data page</Link> rather
          than repeated here, so that no declaration renders twice.
        </p>
        <p>
          The largest kind is the one that is hardest to argue with:{' '}
          <strong>collected and not published</strong> means a figure exists inside the state and has
          not been released.
        </p>
      </div>

      <h2>Where this comes from</h2>
      <p className="prose-note">
        Every claim above is on a record with its sources, its competing accounts and its declared
        gaps. Nothing here resolves which count is right, because the corpus does not, and because
        the two are not answers to one question.
      </p>
      <div className="grid">
        {[pMeaning, pMethod, pAttrib].filter(Boolean).map((p) => (
          <Link key={p!.id} href={`/provenance/${p!.id}/`}>
            <span className="label">{p!.id} · measurement dispute</span>
            <span className="grid-title">{p!.title}</span>
            <span className="grid-meta">
              {DIRECTION_OF_BIAS_LABELS[p!.directionOfBias] ?? p!.directionOfBias}
            </span>
          </Link>
        ))}
        {official ? (
          <Link href="/series/jk-civilians-killed-composite/">
            <span className="label">series · tier {official.tier}</span>
            <span className="grid-title">{official.title}</span>
            <span className="grid-meta">the official column, merged and unattributed</span>
            <RecordMarks record={official} linkify={false} />
          </Link>
        ) : null}
        {register ? (
          <Link href="/series/jk-civilians-killed-satp/">
            <span className="label">series · tier {register.tier}</span>
            <span className="grid-title">{register.title}</span>
            <span className="grid-meta">the press-compiled register, with no published method</span>
            <RecordMarks record={register} linkify={false} />
          </Link>
        ) : null}
        {jkccs ? (
          <Link href="/series/jkccs-civilians-killed-by-armed-forces/">
            <span className="label">series · tier {jkccs.tier}</span>
            <span className="grid-title">{jkccs.title}</span>
            <span className="grid-meta">the attributed count, two years, then silence</span>
            <RecordMarks record={jkccs} linkify={false} />
          </Link>
        ) : null}
        {l0111 ? (
          <Link href="/ledger/L-0111/">
            <span className="label">record · three figures for one year</span>
            <span className="grid-title">{l0111.title}</span>
            <span className="grid-meta">how the official instrument was restated, twice, with no note</span>
            <RecordMarks record={l0111} linkify={false} />
          </Link>
        ) : null}
        {l0110 ? (
          <Link href="/ledger/L-0110/">
            <span className="label">record · the counts side by side</span>
            <span className="grid-title">{l0110.title}</span>
            <span className="grid-meta">what the two families of instrument each hold</span>
            <RecordMarks record={l0110} linkify={false} />
          </Link>
        ) : null}
      </div>
    </>
  );
}
