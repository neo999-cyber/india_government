import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  assessmentCounts,
  ledgerUnderLens,
  pairHref,
  pairsUnderLens,
  seriesUnderLens,
  statusCounts,
} from '@/lib/data';
import {
  ASSESSMENT_LABELS,
  LENS_BLURBS,
  LENS_LABELS,
  TERM_SHORT,
  formatDateRange,
} from '@/lib/format';
import { LENSES, LENSES_THAT_ARE_DOMAINS, LENS_ONLY, type Lens } from '@/lib/types';
import { RecordMarks, StatusKey, StatusTally, TierTag } from '@/components/marks';

type Props = { params: Promise<{ lens: string }> };

export function generateStaticParams() {
  return LENSES.map((lens) => ({ lens }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lens } = await params;
  const label = LENS_LABELS[lens as Lens];
  return { title: label ?? 'Lens' };
}

/**
 * One lens surface.
 *
 * Every list on this page shows the record's SUBJECT beside it, and that column is the point of
 * the page rather than a nicety. A lens page without it reads as a domain page and invites exactly
 * the collapse the second axis was added to prevent — a reader seeing fourteen records under
 * `china` would take "China" for a subject area, which it is not.
 */
export default async function LensPage({ params }: Props) {
  const { lens } = await params;
  if (!(LENSES as readonly string[]).includes(lens)) notFound();
  const l = lens as Lens;

  const s = seriesUnderLens(l);
  const led = ledgerUnderLens(l);
  const p = pairsUnderLens(l);
  const counts = assessmentCounts(led);
  const alsoDomain = LENSES_THAT_ARE_DOMAINS.includes(l);
  const lensOnly = (LENS_ONLY as readonly string[]).includes(l);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / <Link href="/lenses/">lenses</Link> / {l}
      </p>
      <h1>{LENS_LABELS[l]}</h1>
      <p className="lede">{LENS_BLURBS[l]}</p>

      {alsoDomain ? (
        <p className="prose-note">
          This value is a lens <em>and</em> a subject.{' '}
          {lensOnly
            ? 'No record may file it as its own subject, but it has a domain page because the domain enum admits the word.'
            : 'A record may file it as either, never as both.'}{' '}
          The subject side is at <Link href={`/domains/${l}/`}>/domains/{l}/</Link>; this page is
          the lens side only.
        </p>
      ) : (
        <p className="prose-note">
          Not a domain value, and never will be — it answers who a record is about, not what. Every
          record below is filed under some other subject, named in the Subject column.
        </p>
      )}

      <ul className="counts">
        <li>
          <span className="figure">{s.length}</span>
          <span className="label">series</span>
        </li>
        <li>
          <span className="figure">{led.length}</span>
          <span className="label">ledger records</span>
        </li>
        <li>
          <span className="figure">{p.length}</span>
          <span className="label">pairs</span>
        </li>
      </ul>

      <h2>Series</h2>
      {s.length === 0 ? (
        <p className="prose-note">No series is read under this lens.</p>
      ) : (
        <>
          <StatusKey />
          <StatusTally counts={statusCounts(s)} />
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Series</th>
                  <th>Subject</th>
                  <th>Unit</th>
                  <th>Cal.</th>
                  <th>Tier</th>
                  <th className="num">Points</th>
                  {/* THE SEAM COUNT, which this table alone omitted until 2026-08-08.
                      Its two sibling tables — the series index and the domain page — both carry
                      it, in alert red, and 24 of the 54 lensed series declare 33 seams between
                      them. On /lenses/kashmir/ nineteen of the series listed have a declared
                      break and a reader saw no sign of it. A seam is the one thing this
                      instrument refuses to let a reader splice across, so a listing that hides
                      it is not a density choice. */}
                  <th>Breaks</th>
                </tr>
              </thead>
              <tbody>
                {s.map((x) => (
                  <tr key={x.id}>
                    <td>
                      <Link href={`/series/${x.id}/`}>{x.title}</Link>
                      <RecordMarks record={x} />
                    </td>
                    <td className="mono">
                      <Link href={`/domains/${x.domain}/`}>{x.domain}</Link>
                    </td>
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
      )}

      <h2>Ledger</h2>
      {led.length === 0 ? (
        <p className="prose-note">No ledger record is read under this lens.</p>
      ) : (
        <>
          <p className="status-key">
            {Object.entries(counts).map(([k, v]) => (
              <span key={k}>
                {v} {ASSESSMENT_LABELS[k as keyof typeof ASSESSMENT_LABELS] ?? k}
              </span>
            ))}
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Term</th>
                  <th>Record</th>
                  <th>Subject</th>
                  <th>Assessment</th>
                </tr>
              </thead>
              <tbody>
                {[...led]
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
                      <td className="mono">
                        {x.domains.map((d, i) => (
                          <span key={d}>
                            {i > 0 ? ' · ' : ''}
                            <Link href={`/domains/${d}/`}>{d}</Link>
                          </span>
                        ))}
                      </td>
                      <td className="t-note">{ASSESSMENT_LABELS[x.assessment]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <h2>Pairs</h2>
      {p.length === 0 ? (
        <p className="prose-note">No pair is read under this lens.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pair</th>
                <th>Subject</th>
                <th>Kind</th>
              </tr>
            </thead>
            <tbody>
              {p.map((x) => {
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
                            {x.status === 'declared-pending'
                              ? '— declared, not yet authored; renders nowhere by design'
                              : '— neither side is a series, so no series page hosts it'}
                          </span>
                        </>
                      )}
                    </td>
                    <td className="mono">
                      <Link href={`/domains/${x.domain}/`}>{x.domain}</Link>
                    </td>
                    <td className="t-note">{x.kind}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
