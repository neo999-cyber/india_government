import Link from 'next/link';
import { DIRECTION_OF_BIAS_LABELS, ASSESSMENT_LABELS } from '@/lib/format';
import { RecordMarks } from '@/components/marks';
import { resolveRef, storyBySlug } from '@/lib/stories';
import type { LedgerRecord, ProvenanceRecord, Series } from '@/lib/types';

/**
 * WHERE A STORY COMES FROM — rendered from the same list that gives those records a route back.
 *
 * Four stories each hand-built this grid, and three series reached only from charts appeared in no
 * grid at all. Both problems are the same problem: **the relation was written in the markup instead
 * of declared.** `lib/stories.ts` now holds it once, this renders it, and `stepsForSeries` /
 * `stepsForLedger` read the same list from the other end.
 *
 * **The label is derived, the blurb is authored.** A ledger card's chip was hand-written per story —
 * *record · contested*, *record · the dispute itself* — and is now the record's own assessment,
 * which is consistent across stories and cannot go stale against a rescore. What the record is
 * DOING in this story stays authored, in `blurb`, because nothing derives that.
 *
 * Rule 4b binds a story page as it binds a table: these are listing rows, a reader leaves for the
 * record from here, so the marks travel. Provenance carries no caveat field and no marks — that is
 * the three-layers-are-not-alike fact recorded in `share-card.ts`, not an omission.
 */
export function StorySources({ slug }: { slug: string }) {
  const story = storyBySlug(slug);
  if (!story) return null;
  return (
    <>
      <h2>Where this comes from</h2>
      <p className="prose-note">
        Every claim above is on a record with its sources, its competing accounts and its declared
        gaps. Each of these pages links back to this story.
      </p>
      <div className="grid">
        {story.rests.map((ref) => {
          const rec = resolveRef(ref);
          if (!rec) return null;
          if (ref.kind === 'provenance') {
            const p = rec as ProvenanceRecord;
            return (
              <Link key={p.id} href={`/provenance/${p.id}/`}>
                <span className="label">{p.id} · measurement dispute</span>
                <span className="grid-title">{p.title}</span>
                <span className="grid-meta">
                  {DIRECTION_OF_BIAS_LABELS[p.directionOfBias] ?? p.directionOfBias}
                </span>
              </Link>
            );
          }
          if (ref.kind === 'series') {
            const s = rec as Series;
            return (
              <Link key={s.id} href={`/series/${s.id}/`}>
                <span className="label">series · tier {s.tier}</span>
                <span className="grid-title">{s.title}</span>
                <span className="grid-meta">{ref.blurb}</span>
                <RecordMarks record={s} linkify={false} />
              </Link>
            );
          }
          const l = rec as LedgerRecord;
          return (
            <Link key={l.id} href={`/ledger/${l.id}/`}>
              <span className="label">record · {ASSESSMENT_LABELS[l.assessment]}</span>
              <span className="grid-title">{l.title}</span>
              <span className="grid-meta">{ref.blurb}</span>
              <RecordMarks record={l} linkify={false} />
            </Link>
          );
        })}
      </div>
    </>
  );
}
