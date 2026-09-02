import Link from 'next/link';
import { publisherFor } from '@/lib/publishers';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ledgerCard } from '@/lib/share-card';
import { getLedger, getProvenance, getSeries, ledger as allLedger, pairHref, pairsHostedOn, pairsNaming } from '@/lib/data';
import { lastTouched } from '@/lib/history';
import { PairSection } from '@/components/PairSection';
import { HowDoWeKnow, RestsOn } from '@/components/RecordEvidence';
import { RecordHistory } from '@/components/RecordHistory';
import { RecordChronology } from '@/components/RecordChronology';
import { NextSteps } from '@/components/NextSteps';
import { stepsForLedger } from '@/lib/next-steps';
import { LedgerLd } from '@/components/StructuredData';
import {
  ASSESSMENT_LABELS,
  CONTESTED_GROUND_LABELS,
  DOMAIN_LABELS,
  INDEPENDENCE_LABELS,
  LENS_LABELS,
  TERM_LABELS,
  TERM_SHORT,
  formatDateRange,
  DIRECTION_OF_BIAS_LABELS,
} from '@/lib/format';
import { Absences, CaveatFlag, DifferentFactsMark, DifferentFactsNegativeMark, Objectives, RecordMarks, ShockExposures, SourceList } from '@/components/marks';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return allLedger.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const l = getLedger(id);
  return l ? ledgerCard(l) : { title: 'Ledger record' };
}

export default async function LedgerDetail({ params }: Props) {
  const { id } = await params;
  const l = getLedger(id);
  if (!l) notFound();

  const refSeries = (l.seriesRefs ?? []).map(getSeries).filter((s): s is NonNullable<typeof s> => !!s);
  const hostedPairs = pairsHostedOn(`/ledger/${l.id}/`);
  const namingPairs = pairsNaming(l.id);
  const refDisputes = (l.provenanceRefs ?? [])
    .map(getProvenance)
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <>
      <LedgerLd record={l} modified={lastTouched(l.id)} />
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/search/?layer=ledger">ledger</Link> /{' '}
        <Link href={`/terms/${l.term}/`}>{TERM_SHORT[l.term]}</Link>
      </p>
      <h1>{l.title}</h1>
      <p className="tag-row">
        <span className="tag">{l.id}</span>
        <span className="tag">{formatDateRange(l.date, l.dateEnd)}</span>
        <span className="tag">{l.type}</span>
        {/* THE CHIP IS A ROUTE TO ITS GROUND WHERE ONE EXISTS, and neither it nor the note moves.
            A verdict tag with no way to reach the reasoning behind it is a claim shown without its
            argument — the defect found when `assessmentNote` rendered NOWHERE on 164 records, at
            lower severity: the argument is on the page now and a reader has to know to look for it.

            THE NOTE STAYS WHERE IT IS, under the two cases, because that is what it resolves; the
            chip stays at the top because the verdict is what the record is for. Moving either
            inverts the record's structure. So the conclusion acquires a route to its ground and
            nothing else changes.

            NOT A LINK WHERE THERE IS NO NOTE — 52 records carry none, and a link to an anchor that
            does not exist is worse than no link. 11 are `baseline-context`, which is never scored;
            the other 41 are a finding and are reported rather than papered over here. */}
        {l.assessmentNote ? (
          <a className="tag tag-verdict" href="#why-this-verdict">
            {ASSESSMENT_LABELS[l.assessment]}
          </a>
        ) : (
          <span className="tag">{ASSESSMENT_LABELS[l.assessment]}</span>
        )}
        {/* What would settle a contested record — for three of the six grounds, nothing would.
            NOW A ROUTE TO THE PAGE THAT GROUPS THEM, from the fourth walk: the ground was named
            here and `/contested` was reachable only from the top nav, so a reader met the label
            with no way to learn that 38 of the 68 are unsettleable in principle. */}
        {l.contestedGround ? (
          <Link className="tag tag-state" href="/search/#contested">
            would settle it: {CONTESTED_GROUND_LABELS[l.contestedGround]}
          </Link>
        ) : null}
        <span className="tag">confidence {l.confidence}</span>
        {l.domains.map((d) => (
          <Link key={d} className="tag" href={`/domains/${d}/`}>
            {DOMAIN_LABELS[d]}
          </Link>
        ))}
        {/*
          The lens axis, on the record's own page. It rendered on /lenses, on the lens pages and on
          the domain pages, and nowhere on the record that declares it — and a mark rendered
          somewhere other than the page of the record declaring it does not count. A reader on this
          page could not tell that it is also read under Russia and the United States.
        */}
        {(l.lenses ?? []).map((x) => (
          <Link key={x} className="tag tag-lens" href={`/lenses/${x}/`}>
            lens · {LENS_LABELS[x]}
          </Link>
        ))}
      </p>
      <p className="source-line">
        {TERM_LABELS[l.term]} · researched as of {l.asOf}
      </p>

      {/* Below the assessment tag: it qualifies what "contested" means for this record.
          A note recorded against a FALSE reading renders too, in the negative mark — the
          test having been run and returned negative is itself a finding, and gating the
          note on the boolean left it rendering nowhere. */}
      {l.differentFacts ? <DifferentFactsMark note={l.differentFactsNote} /> : null}
      {l.differentFacts === false ? (
        <DifferentFactsNegativeMark note={l.differentFactsNote} />
      ) : null}

      {/* The caveat sits above the summary, not below it: it qualifies the claim the
          summary makes, and a reader who stops after one paragraph must still have it. */}
      {l.caveat ? <CaveatFlag caveat={l.caveat} /> : null}

      <h2 className="stage">What changed</h2>
      <p>{l.summary}</p>

      {/* §4b — the control sits directly under the summary, which is the first place a reader
          meets a claim on this page. */}
      <HowDoWeKnow record={l} disputes={refDisputes} />

      {/* MOVED ABOVE THE ARGUMENT 2026-08-06, on the operator's ruling that an absence arriving
          below two argument blocks is the same defect as a verdict chip preceding its reasoning:
          the conclusion reaching the reader before what qualifies it.

          UNIFORMLY, AND NOT ON A TEST — a departure from the proposal, which said "where the absence
          is load-bearing". Three candidate tests were measured before one was built and they
          returned 13, 47 and 47 records, so the load-bearing set is an artefact of the test chosen;
          the only faithful one was a keyword scan of `assessmentNote`, which is exactly the class of
          thing this cycle has spent itself correcting. A view whose READING ORDER depends on a term
          list is a defect waiting. So the block sits after the summary and before the argument on
          every record that carries one — the position rule 3a gives the caveat, for the same
          reason. */}
      {/* NO HEADING ABOVE THIS BLOCK, AND ITS POSITION IS NOT A DESIGN CHOICE. The 2026-08-06
          ruling pinned the absence block to exactly here — after the summary, before the argument,
          uniformly and not on a test. Phase 18's four-part structure (§7 "what changed → expected
          → observed → limits") would put limits LAST, and that is the one rearrangement this page
          may not make: an absence arriving below two argument blocks is the same defect as a
          verdict chip preceding its reasoning. The structure bends around the ruling. */}
      <Absences items={l.unmeasured} />

      <h2 className="stage">What was expected</h2>
      <dl className="dl">
        {l.claimAtLaunch ? (
          <>
            <dt>Claim at launch</dt>
            <dd>{l.claimAtLaunch}</dd>
          </>
        ) : null}
        {/* The limbs, directly under the claim they decompose. Ruling 9's disclosure is only
            legible beside what was announced. */}
        {l.objectives && l.objectives.length > 0 ? (
          <>
            <dt>Objectives announced</dt>
            <dd>
              <Objectives items={l.objectives} />
            </dd>
          </>
        ) : null}
      </dl>

      {/* Where a record announced nothing, say so rather than leaving an empty stage. `no-objective`
          is a finding — nothing was claimed to score against — not a blank. */}
      {!l.claimAtLaunch && !(l.objectives && l.objectives.length > 0) ? (
        <p className="prose-note">
          No objective was stated at announcement that outcomes could be checked against.
        </p>
      ) : null}

      <h2 className="stage">What the record shows</h2>
      <dl className="dl">
        {l.whatHappened ? (
          <>
            <dt>What happened</dt>
            <dd>{l.whatHappened}</dd>
          </>
        ) : null}
        {l.caseFor ? (
          <>
            <dt>Case for</dt>
            <dd>{l.caseFor}</dd>
          </>
        ) : null}
        {l.caseAgainst ? (
          <>
            <dt>Case against</dt>
            <dd>{l.caseAgainst}</dd>
          </>
        ) : null}
        {l.shockExposure && l.shockExposure.length > 0 ? (
          <>
            <dt>Shock exposure</dt>
            <dd>
              <ShockExposures items={l.shockExposure} />
            </dd>
          </>
        ) : null}
        {/* The reasoning BEHIND the verdict, and it sits directly under the two cases because
            that is what it resolves. It rendered nowhere at all until phase 15 — 164 records
            carried one and a reader could reach none of them, including the 33 written by the
            assessment audit specifically to stop verdicts standing without stated ground. The
            verdict tag at the top of the page is the claim; this is the argument for it, and a
            claim shown without its argument is the thing this instrument exists not to do. */}
        {l.assessmentNote ? (
          <>
            <dt id="why-this-verdict">Why this verdict</dt>
            <dd>{l.assessmentNote}</dd>
          </>
        ) : null}
      </dl>

      {/* What would change the reading. Also previously unrendered, on 62 records. Its own stage,
          because it is the only forward-looking field on the page: everything above is what the
          record establishes, and this is what would make it wrong. */}
      {l.revisitTrigger ? (
        <>
          <h2 className="stage">What would change this reading</h2>
          <p>{l.revisitTrigger}</p>
        </>
      ) : null}

      {l.assessment === 'baseline-context' ? (
        <p className="prose-note">
          Carried as pre-2014 context. Baseline records are not scored: they exist so that
          post-2014 records are read against a stated starting condition rather than a blank page.
        </p>
      ) : null}

      {/* THE SPINE, §3 — the chronological rendering, placed BEFORE the sources, the disputes and
          the correction history because that is where §3 puts it: a reader meets how the evidence
          moved before meeting where it came from. Renders on the 76 records whose cited series
          declare a change of basis and on no others; see the component header. */}
      <RecordChronology record={l} />

      {/* §4d.1 — every edge below is a field in `/data`. No causal edge is drawn. */}
      <h2>What this rests on</h2>
      <RestsOn record={l} series={refSeries} disputes={refDisputes} />

      {/* THE REVERSE INDEX — item 4, and it renders a link that was already in `/data` and ran only
          one way. A pair's `ledgerRefs` names the records it bears on; nothing named the pair back,
          and a two-series pair lives on a series page, so this record could not know it was being
          measured. Placed under the connections diagram because that is where declared edges live,
          and this is one: it is `ledgerRefs`, not an inference. */}
      {namingPairs.length > 0 ? (
        <>
          <h3 className="rests-sub">Measurements that name this record</h3>
          <p className="prose-note">
            {namingPairs.length === 1 ? 'One paired measurement names' : `${namingPairs.length} paired measurements name`}{' '}
            this record in its own <span className="mono">ledgerRefs</span>. Each sets two
            instruments against each other on a quantity this record is about; each renders on the
            page of a series it compares, not here.
          </p>
          <ul className="naming-pairs">
            {namingPairs.map((pr) => {
              const href = pairHref(pr);
              return (
                <li key={pr.id}>
                  <span className="mono t-note">{pr.id}</span>
                  {href ? <Link href={href}>{pr.title ?? pr.framing}</Link> : (pr.title ?? pr.framing)}
                </li>
              );
            })}
          </ul>
        </>
      ) : null}

      <h2>Sources</h2>
      {/* THE INDEPENDENCE GRADE SITS HERE AND NOT BESIDE THE VERDICT, deliberately. It grades the
          EVIDENCE, and the ladder beside it grades the artefact — two questions asked of the same
          citations, with different answers. A chip beside the verdict would read as a demerit, and
          `none` is a description: L-0030's single authoritative statement that no bank was
          privatised is the right evidence, not weak evidence. */}
      {l.independence ? (
        <p className="independence-line">
          <span className="label">Independence of the evidence</span>{' '}
          {INDEPENDENCE_LABELS[l.independence]}
          {l.independence === 'intra-state'
            ? ' — better than a body scoring itself, and not the same thing as a source outside the state'
            : ''}{' '}
          <Link href="/method/#independence">what this grades</Link>
        </p>
      ) : null}
      <SourceList sources={l.sources} resolve={publisherFor} />

      {refSeries.length > 0 ? (
        <>
          <h2>Series cited</h2>
          <div className="grid">
            {refSeries.map((s) => (
              <Link key={s.id} href={`/series/${s.id}/`}>
                <span className="label">
                  {s.id} · tier {s.tier}
                </span>
                <span className="grid-title">{s.title}</span>
                <span className="grid-meta">
                  {s.unit} · {s.points.length} points
                  {s.breaks?.length ? ` · ${s.breaks.length} break(s)` : ''}
                </span>
                <RecordMarks record={s} linkify={false} />
              </Link>
            ))}
          </div>
        </>
      ) : null}

      {refDisputes.length > 0 ? (
        <>
          <h2>Measurement disputes bearing on this record</h2>
          <div className="grid">
            {refDisputes.map((p) => (
              <Link key={p.id} href={`/provenance/${p.id}/`}>
                <span className="label">{p.id}</span>
                <span className="grid-title">{p.title}</span>
                <span className="grid-meta">{DIRECTION_OF_BIAS_LABELS[p.directionOfBias] ?? p.directionOfBias}</span>
              </Link>
            ))}
          </div>
        </>
      ) : null}

      {/* Pairs whose only hostable side is an absence declared on THIS record, and which name no
          series on either side. None exist today — every pair with no series side leads with a
          provenance `competingAccountsFrom`, which takes precedence in side order — and the branch
          is here because the alternative is that the first one authored renders nowhere and the
          build fails. `pairsHostedOn` is the single source of truth for where a pair lives; a
          surface that does not consult it is a surface a pair can fall through. */}
      {hostedPairs.map((pair) => (
        <PairSection key={pair.id} pair={pair} />
      ))}

      <RecordHistory id={l.id} />

      {/* §9 — contextual next steps, after the record is understood rather than before it. The
          brief is explicit that navigation off a page a reader has not finished is worse than
          none, which is why this is the last thing on the page and not a sidebar. */}
      <NextSteps steps={stepsForLedger(l)} />

    </>
  );
}
