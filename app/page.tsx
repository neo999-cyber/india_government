import Link from 'next/link';
import { getSeries, ledger, provenance, series } from '@/lib/data';
import { DOMAIN_LABELS } from '@/lib/format';
import { DOMAINS } from '@/lib/types';
import { SeriesChart } from '@/components/SeriesChart';
import { Evaluability } from '@/components/Evaluability';

/**
 * THE HOMEPAGE — phase 18 prototype B, built to the §3a order.
 *
 * WHAT THIS PAGE USED TO BE, AND WHY IT COULD NOT STAY. It opened with the size of the database:
 * 269 series, 1,759 observations, 223 ledger records, 127 disputes, six figures in a row above the
 * fold. That is the thing the scope forbids in two separate places — *"do not lead with the size of
 * the database, lead with why the database is useful"*, and *"no verdict aggregates, no database
 * counts above the fold"*. It also led with the one-in-223 `worked` paragraph, which is the closest
 * thing this instrument has to a scoreboard even though every word of it is true.
 *
 * THE ORDER BELOW IS §3a AND IT IS LOAD-BEARING, not a layout preference:
 *   1. the positioning line;
 *   2. ONE strongly measured change, told well;
 *   3. several more recognisable, well-measured changes;
 *   4. a deliberate transition into a series that stops;
 *   5. that stop's reason, printed;
 *   6. only then anything cross-record.
 *
 * The reason for the order is the failure mode named in §3: **nihilism.** If every chart breaks and
 * every verdict is contested, a reader concludes the site knows nothing and leaves. A gap is only
 * interesting against a background of things that are solidly known — so the majority of what a
 * reader meets here is what India does measure, and the memorable minority is where it does not.
 *
 * EVERY CHART IS FROM THE INVENTORY (§3b). `drops/phase-17-design-lock/SERIES-INVENTORY-2026-08-08.md`
 * measured 26 series carrying ten or more verified India observations with no pending point. The
 * pre-phase drafts had named rail electrification and road length; neither is in that set. These are.
 */

/** Charts chosen from the inventory's clean set, with the sentence each one is here to say. */
/**
 * THE OPENING TAKEAWAY, REWRITTEN 2026-08-11 — and the withdrawn version is quoted because what was
 * wrong with it is not obvious.
 *
 * IT READ: *"Thirty per cent of Indians aged 18 to 23 are enrolled in higher education, up from 21
 * per cent in 2011-12. The line breaks in FY2020-21 because the population it is divided by was
 * restated, not because enrolment jumped."*
 *
 * **It was written when this chart rendered no marks.** As of `99754d0` it renders its 622-character
 * caveat directly beneath — *the denominator is falling and it is doing half the work* — and the two
 * sat stacked as if unrelated: a takeaway reporting a rise, under a heading calling the series well
 * measured, above a qualification saying half the rise is not enrolment.
 *
 * **AND THE OLD WORDING WAS WORSE THAN SILENCE, WHICH IS THE PART WORTH RECORDING.** It mentioned
 * the denominator — the FY2020-21 restatement — so a reader had already been told the denominator
 * was accounted for. That is a different denominator fact from the one that matters: a one-off
 * restatement causing a visible break, against an ongoing decline making roughly half the trend an
 * artefact. **Naming the smaller of two problems inoculates against the larger one.**
 *
 * The rewrite states the compound fact and hands the arithmetic to the caveat rather than
 * duplicating it. Rule 3a binds the caveat; the copy bends around it.
 */
const OPENING = {
  id: 'higher-ed-ger',
  takeaway:
    'Thirty per cent of Indians aged 18 to 23 are enrolled in higher education, up from 21 per cent in 2011-12 — and roughly half of that rise is the 18-23 cohort shrinking rather than enrolment growing. The break at FY2020-21 is the same population being restated, not a jump. The record sets out the arithmetic itself, below.',
};

const SUPPORTING: { id: string; takeaway: string }[] = [
  {
    id: 'res-capacity-share',
    takeaway:
      'Renewables excluding large hydro have gone from an eighth of installed electricity capacity to roughly a third. Fourteen years, every one of them verified, no break.',
  },
  {
    id: 'coal-production',
    takeaway:
      'Coal production rose by about two-thirds over the same period. The energy transition and the coal expansion are both true at once, which is why they are shown together.',
  },
  {
    id: 'sanitation-basic',
    takeaway:
      'The share of Indians using at least a basic sanitation service rose steeply and then flattened. This one is measured by the World Bank, not by the programme that built the toilets.',
  },
];

const THE_STOP = 'schools-above-rte-ptr-primary-dise';

export default function HomePage() {
  const opening = getSeries(OPENING.id);
  const supporting = SUPPORTING.map((c) => ({ ...c, s: getSeries(c.id) })).filter((c) => c.s);
  const stop = getSeries(THE_STOP);
  const domainsWithData = DOMAINS.filter(
    (d) => series.some((s) => s.domain === d) || ledger.some((l) => l.domains.includes(d)),
  );

  return (
    <>
      {/* 1. THE POSITIONING LINE. What the site is, in one sentence, before anything is counted. */}
      <h1 className="home-lead">What we can actually know about how India changed</h1>
      <p className="lede">
        Since 2014, from India&rsquo;s own published statistics and official documents. Every figure
        here shows where it came from — and where the record stops, this says so, with the reason.
      </p>
      {/* The at-a-glance path. Most readers want the whole picture before — or instead of — any
          single chart, and the overview is built for exactly that reader. One link, high, not a
          duplicate of the page below it. */}
      <p className="home-overview-link">
        <Link href="/overview/">
          See the whole record in one view — every area, every year, and what happened →
        </Link>
      </p>

      {/* 2. ONE strongly measured change, told well. */}
      {opening ? (
        <>
          {/* The heading used to read "Start with something the state measures well" full stop,
              which promised a clean number over a chart whose own caveat says half the movement is
              a denominator effect. The series IS well measured — the qualification is about what
              the number means, not how well it was taken — so the heading keeps its claim and stops
              implying the claim is the whole of it. */}
          <h2>Start with something the state measures well, and read what comes with it</h2>
          <SeriesChart series={opening} takeaway={OPENING.takeaway} />
        </>
      ) : null}

      {/* 3. Several more. Plainly and confidently — §3's tone rule: a site about uncertainty must
             not sound uncertain. */}
      {supporting.length > 0 ? (
        <>
          <h2>And several more</h2>
          {supporting.map((c) => (
            <SeriesChart key={c.id} series={c.s!} takeaway={c.takeaway} />
          ))}
        </>
      ) : null}

      {/* 4 and 5. THE TRANSITION, and the reason printed. This is the whole argument of the site in
             one chart: the same statistical system that produced everything above stopped producing
             this, and the corpus knows why. */}
      {stop ? (
        <>
          <h2>Now one that stops</h2>
          <p>
            Everything above is published every year and can be checked. This one was too — until
            2015-16. The Right to Education Act sets a staffing standard for{' '}
            <em>each school</em>, and this is the measure of how many schools were breaching it.
          </p>
          <SeriesChart
            series={stop}
            takeaway="Published every year by DISE through 2015-16, and by its successor system in no edition since — although that system holds the enrolment and teacher counts for every school in the country."
          />
          {/* A DIFFERENT FIX FROM THE OPENING'S, because this copy had the OPPOSITE problem.
              It read: *"The published series ends in 2015-16. That is a fact about what was
              published, not about what happened in the schools. What replaced it is a national
              average — one number for the whole country — against a duty the Act imposes school by
              school."* Every clause of that is now in the caveat rendering directly above it —
              *DISCONTINUED, NOT MERELY UNRETRIEVED*, and the national mean against a school-by-school
              duty. The copy was standing in for a mark that did not render; the mark renders, so the
              stand-in goes, and what is left is the one thing the caveat does not say: why this
              chart is the hinge of the page. */}
          <p className="home-stop-note">
            <strong>The same statistical system produced everything above.</strong> It did not stop
            being able to measure this. Read the caveat: the successor system holds the school-level
            counts and publishes a national mean instead — which is why this chart, and not any of
            the four above it, is what the rest of this site is about.
          </p>
        </>
      ) : null}

      {/* 6. Only now, anything cross-record. Entry points, not a scoreboard: no tally, no
             composite, no count presented as a score. */}
      <h2>Where to look</h2>
      <p className="prose-note">
        {domainsWithData.length} subject areas are open. Each one leads to the series, the records
        and the measurement disputes behind them.
      </p>
      <div className="grid">
        {DOMAINS.map((d) => {
          const s = series.filter((x) => x.domain === d).length;
          const rows = ledger.filter((x) => x.domains.includes(d));
          return (
            <Link key={d} href={`/domains/${d}/`}>
              <span className="grid-title">{DOMAIN_LABELS[d]}</span>
              <span className="grid-meta">
                {s + rows.length === 0
                  ? 'not yet opened'
                  : `${s} series · ${rows.length} record${rows.length === 1 ? '' : 's'}`}
              </span>
            </Link>
          );
        })}
      </div>

      {/* WHAT THE SITE CANNOT SHOW — the second half of the thesis, and it comes AFTER the evidence
          rather than instead of it. No corpus-wide absence total: rule 4b forbids one, because a
          number there would read as a completeness score for the instrument. */}
      <h2>And what nobody measures</h2>
      <p>
        Some of what a reader would want is not missing from this site — it is missing from the
        record. Where nothing measures a thing at all, that is stated on the record it belongs to,
        with the reason and with what would close it: never collected, collected but not published,
        withheld on request, or never defined in the first place.
      </p>
      <p className="prose-note">
        <Link href="/unmeasured/">Everything the instrument declares it cannot show</Link> ·{' '}
        <Link href="/contested/">where two official sources disagree</Link> ·{' '}
        <Link href="/method/">how the evidence is graded, and what the grading cannot do</Link>
      </p>

      {/* §4c — LAST, and the position is the ruling as much as the wording is. Rev1 wanted this
          as the OPENING image; §3a moved it here because a naive reader meets "Defence 0 of 10"
          as an institutional score unless several screens of solidly measured things have already
          established what the site is doing. The evaluability view belongs IN the argument, not
          above it. */}
      <Evaluability />

      <p className="t-note">
        {provenance.length} measurement disputes are carried as records in their own right rather
        than as footnotes. Counts appear here as a description of the instrument, never as a score
        for anything it describes.
      </p>
    </>
  );
}
