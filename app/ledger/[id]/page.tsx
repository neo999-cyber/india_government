import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getLedger, getProvenance, getSeries, ledger as allLedger } from '@/lib/data';
import {
  ASSESSMENT_LABELS,
  CONTESTED_GROUND_LABELS,
  DOMAIN_LABELS,
  LENS_LABELS,
  TERM_LABELS,
  TERM_SHORT,
  formatDateRange,
} from '@/lib/format';
import {
  Absences,
  CaveatFlag,
  DifferentFactsMark,
  DifferentFactsNegativeMark,
  ShockExposures,
  SourceList,
} from '@/components/marks';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return allLedger.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const l = getLedger(id);
  return { title: l ? l.title : 'Ledger record' };
}

export default async function LedgerDetail({ params }: Props) {
  const { id } = await params;
  const l = getLedger(id);
  if (!l) notFound();

  const refSeries = (l.seriesRefs ?? []).map(getSeries).filter((s): s is NonNullable<typeof s> => !!s);
  const refDisputes = (l.provenanceRefs ?? [])
    .map(getProvenance)
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/ledger/">ledger</Link> /{' '}
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
        {/* What would settle a contested record — for three of the six grounds, nothing would. */}
        {l.contestedGround ? (
          <span className="tag tag-state">
            would settle it: {CONTESTED_GROUND_LABELS[l.contestedGround]}
          </span>
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

      <p>{l.summary}</p>

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
      <Absences items={l.unmeasured} />

      <dl className="dl">
        {l.claimAtLaunch ? (
          <>
            <dt>Claim at launch</dt>
            <dd>{l.claimAtLaunch}</dd>
          </>
        ) : null}
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
        {/* What would change the reading. Also previously unrendered, on 62 records. */}
        {l.revisitTrigger ? (
          <>
            <dt>Revisit when</dt>
            <dd>{l.revisitTrigger}</dd>
          </>
        ) : null}
      </dl>

      {l.assessment === 'baseline-context' ? (
        <p className="prose-note">
          Carried as pre-2014 context. Baseline records are not scored: they exist so that
          post-2014 records are read against a stated starting condition rather than a blank page.
        </p>
      ) : null}

      <h2>Sources</h2>
      <SourceList sources={l.sources} />

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
                {s.caveat ? <CaveatFlag caveat={s.caveat} variant="inline" linkify={false} /> : null}
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
                <span className="grid-meta">{p.directionOfBias}</span>
              </Link>
            ))}
          </div>
        </>
      ) : null}

      <div className="stub">
        <span className="label">Scaffold</span>
        Phase 0 renders the record as authored. Timeline placement, term comparison and
        shock-attribution views come later.
      </div>
    </>
  );
}
