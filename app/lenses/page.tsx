import { Fragment } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ledgerUnderLens, pairsUnderLens, seriesUnderLens } from '@/lib/data';
import { LENS_BLURBS, LENS_LABELS } from '@/lib/format';
import { LENSES, LENSES_THAT_ARE_DOMAINS } from '@/lib/types';

export const metadata: Metadata = { title: 'Lenses' };

/**
 * The lens index.
 *
 * Lenses had no surface of their own until phase 14, and did not need one: both values were also
 * domain values, so `/domains/kashmir/` was the lens page and `generateStaticParams` over DOMAINS
 * emitted it for free. Six counterparty lenses that are not domain values broke that — a lens with
 * no page is a declared filter that returns nothing, which is the failure `lenses[]` was added to
 * fix, one axis over.
 *
 * Two values still have a domain page as well. That is not duplication: the domain page answers
 * "what is filed under this subject", this one answers "what is read under this lens", and pooling
 * them would restate the conflation the axis exists to remove.
 */
export default function LensesIndex() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / lenses
      </p>
      <h1>Lenses</h1>
      <p className="lede">
        A lens is not a subject. <span className="mono">domain</span> says what a record is about;{' '}
        <span className="mono">lenses[]</span> says what it also bears on. Every record listed under
        a lens is filed under some other subject, and the subject is shown beside it. An empty lens
        would be a filter that returns nothing, which the build refuses to ship.
      </p>
      <div className="grid">
        {LENSES.map((l) => {
          const s = seriesUnderLens(l);
          const led = ledgerUnderLens(l);
          const p = pairsUnderLens(l);
          return (
            <Link key={l} href={`/lenses/${l}/`}>
              <span className="label">
                {l}
                {LENSES_THAT_ARE_DOMAINS.includes(l) ? ' · also a domain' : ''}
              </span>
              <span className="grid-title">{LENS_LABELS[l]}</span>
              <span className="grid-meta">
                {s.length} series · {led.length} ledger · {p.length} pairs
              </span>
            </Link>
          );
        })}
      </div>

      <h2>What each one means</h2>
      <dl className="dl">
        {LENSES.map((l) => (
          <Fragment key={l}>
            <dt>{l}</dt>
            <dd>{LENS_BLURBS[l]}</dd>
          </Fragment>
        ))}
      </dl>
    </>
  );
}
