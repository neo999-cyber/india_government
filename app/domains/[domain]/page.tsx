import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  assessmentCounts,
  ledgerInDomain,
  pairHref,
  pairsInDomain,
  pairsUnderLens,
  provenanceInDomain,
  seriesInDomain,
  seriesUnderLens,
  statusCounts,
} from '@/lib/data';
import { ASSESSMENT_LABELS, DOMAIN_LABELS, TERM_SHORT, formatDateRange } from '@/lib/format';
import { DOMAINS, LENSES, LENS_ONLY, type Domain, type Lens } from '@/lib/types';
import type { Pair, Series } from '@/lib/types';
import { RecordMarks, StatusKey, StatusTally, TallyGloss, TierTag } from '@/components/marks';

type Props = { params: Promise<{ domain: string }> };

export function generateStaticParams() {
  return DOMAINS.map((domain) => ({ domain }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain } = await params;
  const label = DOMAIN_LABELS[domain as Domain];
  return { title: label ?? 'Domain' };
}

export default async function DomainPage({ params }: Props) {
  const { domain } = await params;
  if (!DOMAINS.includes(domain as Domain)) notFound();
  const d = domain as Domain;

  const s = seriesInDomain(d);
  const l = ledgerInDomain(d);
  const p = provenanceInDomain(d);
  const counts = assessmentCounts(l);

  // The lens axis. `domain` is what a record is ABOUT, `lenses[]` what it also BEARS ON, and the
  // two are never pooled: a J&K militancy count is a defence series read under the Kashmir lens,
  // and merging it into the Kashmir subject list would restate the conflation `lenses[]` exists to
  // remove. Both blocks render only where they are non-empty, so a domain that is nobody's lens
  // and holds no pairs looks exactly as it did.
  //
  // The narrowing below is load-bearing rather than ceremonial. Until phase 14 every lens was also
  // a domain, so a Domain could be handed to a lens query and the compiler agreed. Six counterparty
  // lenses that are not domains ended that, and `isLens` is now the guard that says which of the
  // fourteen domain values may be asked a lens question at all.
  const asLens = (LENSES as readonly string[]).includes(d) ? (d as unknown as Lens) : null;
  const isLens = asLens !== null;
  const lensOnly = (LENS_ONLY as readonly string[]).includes(d);
  const lensed = asLens ? seriesUnderLens(asLens) : [];
  const pairsHere = pairsInDomain(d);
  const pairsLensed = asLens ? pairsUnderLens(asLens) : [];

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/domains/">domains</Link> / {d}
      </p>
      <h1>{DOMAIN_LABELS[d]}</h1>

      {isLens ? (
        <p className="lede">
          A cross-cutting lens
          {lensOnly
            ? ', and only that — no record may file it as its own subject.'
            : ', and a subject in its own right — a record may file it as either, never as both.'}{' '}
          Records read UNDER it, whose subject is another domain, are listed apart from the subject
          tables and carry the domain they are actually filed under.
        </p>
      ) : null}

      <ul className="counts">
        <li>
          <span className="figure">{s.length}</span>
          <span className="label">series</span>
        </li>
        {lensed.length ? (
          <li>
            <span className="figure">{lensed.length}</span>
            <span className="label">series under this lens</span>
          </li>
        ) : null}
        <li>
          <span className="figure">{l.length}</span>
          <span className="label">ledger records</span>
        </li>
        <li>
          <span className="figure">{p.length}</span>
          <span className="label">disputes</span>
        </li>
      </ul>

      {s.length + lensed.length + l.length === 0 ? (
        <div className="stub">
          <span className="label">Unopened domain</span>
          No series and no ledger records have been researched into this domain yet. Nothing is
          inferred to fill the gap.
        </div>
      ) : null}

      <h2>Series</h2>
      {s.length === 0 ? (
        <p className="prose-note">
          No series has this domain as its subject.
          {lensed.length
            ? ' The series below are read under it as a lens — their subjects sit elsewhere.'
            : ''}
        </p>
      ) : (
        <SeriesBlock items={s} />
      )}

      {lensed.length ? (
        <>
          <h2>Series under this lens</h2>
          <p className="prose-note">
            {lensed.length} series whose subject is another domain and which are also read under{' '}
            <span className="mono">{d}</span>. Listed apart from the table above rather than pooled
            into it: what a series measures and what it bears on are two different claims, and a
            single-valued <span className="mono">domain</span> could carry only the first. The
            Subject column names the domain each one is actually filed under.
          </p>
          <SeriesBlock items={lensed} showSubject />
        </>
      ) : null}

      <h2>Ledger</h2>
      {l.length === 0 ? (
        <p className="prose-note">No ledger records in this domain.</p>
      ) : (
        <>
          <p className="status-key">
            {Object.entries(counts).map(([k, v]) => (
              <span key={k}>
                {v} {ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}
              </span>
            ))}
          </p>
<TallyGloss />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Term</th>
                  <th>Record</th>
                  <th>Assessment</th>
                  {/* view-parity's one defect find: /ledger and /terms carried this column and
                      the two domain-axis tables did not, so the same verdict listed on four
                      surfaces stated its evidential weight on only two. 170 high · 52 medium ·
                      1 low — and the low one especially is a qualification a reader must meet
                      wherever the verdict is met. */}
                  <th>Conf.</th>
                </tr>
              </thead>
              <tbody>
                {[...l]
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((x) => (
                    <tr key={x.id}>
                      <td className="mono">
                        <Link href={`/ledger/${x.id}/`}>{x.id}</Link>
                      </td>
                      <td className="mono t-note">{formatDateRange(x.date, x.dateEnd)}</td>
                      <td className="mono">{TERM_SHORT[x.term]}</td>
                      <td>
                        <Link href={`/ledger/${x.id}/`}>{x.title}</Link>
                        <RecordMarks record={x} />
                      </td>
                      <td className="t-note">{ASSESSMENT_LABELS[x.assessment]}</td>
                      <td className="mono t-note">{x.confidence}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {pairsHere.length + pairsLensed.length ? (
        <>
          <h2>Pairs</h2>
          <p className="prose-note">
            Two things the instrument refuses to show apart — a coverage figure against what it
            converted into, or two instruments measuring the same quantity and disagreeing. A pair
            has no page of its own: it renders inside the first series that names it, which is
            where the link goes.
          </p>
          <PairRows items={pairsHere} />
          {pairsLensed.length ? (
            <>
              <p className="prose-note">
                Under this lens — subject filed elsewhere:
              </p>
              <PairRows items={pairsLensed} showSubject />
            </>
          ) : null}
        </>
      ) : null}

      <h2>Measurement disputes</h2>
      {p.length === 0 ? (
        <p className="prose-note">No disputes recorded against this domain.</p>
      ) : (
        <div className="grid">
          {p.map((x) => (
            <Link key={x.id} href={`/provenance/${x.id}/`}>
              <span className="label">
                {x.id}
                {x.affectsDomains.includes('all') ? ' · all domains' : ''}
              </span>
              <span className="grid-title">{x.title}</span>
              <span className="grid-meta">
                {x.directionOfBias} · bridge {x.bridgeExists ? 'exists' : 'none'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

/**
 * The series table, used twice on this page: once for the domain's own subject series and once for
 * the series read under it as a lens. One component, two call sites, because the two lists differ
 * in exactly one column — the lens list names each series' actual subject, since "what is this
 * doing here" is the first question a reader has about it.
 */
function SeriesBlock({ items, showSubject }: { items: Series[]; showSubject?: boolean }) {
  return (
    <>
      <StatusKey />
      <StatusTally counts={statusCounts(items)} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Series</th>
              {showSubject ? <th>Subject</th> : null}
              <th>Unit</th>
              <th>Cal.</th>
              <th>Tier</th>
              <th className="num">Points</th>
              <th>Breaks</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) => (
              <tr key={x.id}>
                <td>
                  <Link href={`/series/${x.id}/`}>{x.title}</Link>
                  <RecordMarks record={x} />
                </td>
                {showSubject ? (
                  <td className="mono">
                    <Link href={`/domains/${x.domain}/`}>{x.domain}</Link>
                  </td>
                ) : null}
                <td className="t-note">{x.unit}</td>
                <td className="mono">{x.calendar}</td>
                <td>
                  <TierTag tier={x.tier} />
                </td>
                <td className="num">{x.points.length}</td>
                <td className="mono">
                  {x.breaks?.length ? (
                    <span style={{ color: 'var(--alert)' }}>{x.breaks.length}</span>
                  ) : (
                    <span className="t-note">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/**
 * Pair rows. A pair with no href renders as text, not as a dead link, and says so.
 *
 * CORRECTED 2026-08-08. THE WITHDRAWN PARAGRAPH, QUOTED: *"That is not defensive coding for a case
 * that cannot arise — PR-31 is in that state today. Both its sides are non-series (a provenance
 * record's competing accounts against a ledger absence), so no series page hosts it and this
 * listing is the only surface it has ever had."* **PR-31 now has a page: the provenance record
 * whose competing accounts are one of its two sides hosts it**, along with five more of exactly
 * that shape the old note did not know about.
 *
 * The unlinked branch is still live and still not defensive coding, for a different and narrower
 * reason: PR-16 and PR-55 are `declared-pending` with a side that names nothing, so there is no
 * pair to render anywhere. For those two this row IS the only surface, which is why it prints the
 * framing and the gap reason in full rather than the title alone.
 */
function PairRows({ items, showSubject }: { items: Pair[]; showSubject?: boolean }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Pair</th>
            {showSubject ? <th>Subject</th> : null}
            <th>Kind</th>
          </tr>
        </thead>
        <tbody>
          {items.map((x) => {
            const href = pairHref(x);
            const name = x.title ?? x.framing;
            return (
              <tr key={x.id}>
                <td className="mono">{x.id}</td>
                <td>
                  {href ? (
                    <Link href={href}>{name}</Link>
                  ) : (
                    <>
                      {name}{' '}
                      <span className="t-note">
                        — declared, not yet authored: one side names nothing, so there is no pair
                        to render and this row is the whole of it
                      </span>
                      {/* THE FRAMING AND THE GAP REASON, IN FULL, BECAUSE THIS ROW IS THE ONLY
                          SURFACE THESE PAIRS HAVE. A pair with an unauthored side reaches no host
                          page, so until 2026-08-08 its framing and gap reason rendered nowhere in
                          the instrument while this row carried the title alone — a declaration of
                          something owed, invisible, which is precisely what rule 4b forbids of an
                          absence. Printed whole, never clamped: the same discipline rule 3a sets
                          for a caveat in a cell applies to a declaration in one. */}
                      {/* THE TWO SIDES, NAMED. A pair is the judgement that these two things
                          belong beside each other, and the side labels are the only place that
                          judgement is written down — the framing says why it matters and the
                          labels say what the two quantities ARE. Three of them rendered nowhere
                          in the instrument: PR-16.b and both of PR-55's. Printing the framing
                          and stopping short of the labels leaves the row saying what is owed
                          without saying what would settle it. */}
                      <span className="t-note pair-declared">
                        <strong>a</strong> {x.a.label} · <strong>b</strong> {x.b.label}
                      </span>
                      <span className="t-note pair-declared">{x.framing}</span>
                      {x.gapReason ? (
                        <span className="t-note pair-declared">{x.gapReason}</span>
                      ) : null}
                      {x.notes ? <span className="t-note pair-declared">{x.notes}</span> : null}
                    </>
                  )}
                </td>
                {showSubject ? (
                  <td className="mono">
                    <Link href={`/domains/${x.domain}/`}>{x.domain}</Link>
                  </td>
                ) : null}
                <td className="t-note">{x.kind}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
