import { Fragment } from 'react';
import Link from 'next/link';
import { ledgerUnderLens, pairsUnderLens, seriesUnderLens } from '@/lib/data';
import { LENS_BLURBS, LENS_LABELS } from '@/lib/format';
import { LENSES, LENSES_THAT_ARE_DOMAINS } from '@/lib/types';

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
export function LensesSection() {
  return (
    <>
      <h2 id="lenses">Lenses</h2>
      <p className="lede">
        {/* REWRITTEN 2026-08-12 on a reader's review. It read: *"A lens is not a subject.
            `domain` says what a record is about; `lenses[]` says what it also bears on. Every record
            listed under a lens is filed under some other subject, and the subject is shown beside
            it."* Two field names in mono and the word *subject* three times — the distinction stated
            in the data model's own vocabulary, to a reader who has not been given it. This is the
            one place the site says what a lens is, so it says it in ordinary words. */}
        A lens cuts across the topics. Everything here is filed under one topic — the thing it is
        mainly about — and some of it also bears on something that runs through several: Kashmir,
        federalism, the defence sector. Those are lenses. <strong>Nothing is filed under a lens.</strong>{' '}
        A lens gathers what is filed elsewhere, and each item shows the topic it belongs to. A lens
        holding nothing would be a filter that returns nothing, which the build refuses to ship.
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
