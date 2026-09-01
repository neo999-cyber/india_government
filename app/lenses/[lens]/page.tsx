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
  formatDateRange, PAIR_KIND_LABELS } from '@/lib/format';
import { LENSES, LENSES_THAT_ARE_DOMAINS, LENS_ONLY, type Lens } from '@/lib/types';
import { CaveatRow, RecordMarks, StatusKey, StatusTally, TierTag } from '@/components/marks';
import { NextSteps } from '@/components/NextSteps';
import { stepsForLens } from '@/lib/next-steps';

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
        <Link href="/">instrument</Link> / <Link href="/overview/#lenses">lenses</Link> / {l}
      </p>
      <h1>{LENS_LABELS[l]}</h1>
      <p className="lede">{LENS_BLURBS[l]}</p>

      {alsoDomain ? (
        <p className="prose-note">
          This word is both a topic and a lens.{' '}
          {lensOnly
            ? 'Nothing is filed under it as a topic — it has a topic page because the two share a name.'
            : 'Anything here is filed under it as a topic or read through it as a lens, never both.'}{' '}
          The topic side is at <Link href={`/domains/${l}/`}>/domains/{l}/</Link>; this page is the
          lens side only.
        </p>
      ) : (
        <p className="prose-note">
          This is a lens only, never a topic: it answers who something is about rather than what.
          Everything below is filed under some other topic, named in the Topic column.
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
          <div className="table-wrap" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Series</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Cal.</th>
                  <th scope="col">Tier</th>
                  <th scope="col" className="num">Points</th>
                  {/* THE SEAM COUNT, which this table alone omitted until 2026-08-08.
                      Its two sibling tables — the series index and the domain page — both carry
                      it, in alert red, and 24 of the 54 lensed series declare 33 seams between
                      them. On /lenses/kashmir/ nineteen of the series listed have a declared
                      break and a reader saw no sign of it. A seam is the one thing this
                      instrument refuses to let a reader splice across, so a listing that hides
                      it is not a density choice. */}
                  <th scope="col">Breaks</th>
                </tr>
              </thead>
                {s.map((x) => (
                  <tbody key={x.id}>
                    <tr>
                    <td>
                    <Link href={`/series/${x.id}/`}>{x.title}</Link>
                    <RecordMarks record={x} deferCaveat />
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
                    <CaveatRow record={x} colSpan={7} />
                  </tbody>
                ))}
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
          <div className="table-wrap" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Term</th>
                  <th scope="col">Record</th>
                  <th scope="col">Topic</th>
                  <th scope="col">Assessment</th>
                  {/* Same column as /ledger, /terms and the domain page — see the note there. */}
                  <th scope="col">Conf.</th>
                </tr>
              </thead>
                {[...led]
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((x) => (
                    <tbody key={x.id}>
                      <tr>
                      <td className="mono">
                      <Link href={`/ledger/${x.id}/`}>{x.id}</Link>
                      </td>
                      <td className="mono t-note">{formatDateRange(x.date, x.dateEnd)}</td>
                      <td className="mono">{TERM_SHORT[x.term]}</td>
                      <td>
                      <Link href={`/ledger/${x.id}/`}>{x.title}</Link>
                      <RecordMarks record={x} deferCaveat />
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
                      <td className="mono t-note">{x.confidence}</td>
                      </tr>
                      <CaveatRow record={x} colSpan={8} />
                    </tbody>
                  ))}
            </table>
          </div>
        </>
      )}

      <h2>Pairs</h2>
      {p.length === 0 ? (
        <p className="prose-note">No pair is read under this lens.</p>
      ) : (
        <div className="table-wrap" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Pair</th>
                <th scope="col">Topic</th>
                <th scope="col">Kind</th>
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
                    <td className="t-note">{PAIR_KIND_LABELS[x.kind] ?? x.kind}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* The topics this lens cuts across — which is the fact that makes it a lens rather than a
          topic, and the page ended without naming any of them as a route. */}
      <NextSteps
        steps={stepsForLens(l, [...new Set(s.map((x) => x.domain))])}
      />
    </>
  );
}
