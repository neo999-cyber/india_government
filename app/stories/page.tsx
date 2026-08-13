import Link from 'next/link';
import type { Metadata } from 'next';
import { STORIES, STORY_CRITERION, signatureFor } from '@/lib/stories';

export const metadata: Metadata = { title: 'Stories' };

/**
 * The stories index — now rendered from `lib/stories.ts` rather than hand-listed, and now printing
 * its criterion.
 *
 * ============================ WHY A CRITERION, AND WHY HERE ===================================
 *
 * **Every other selection on this site prints one.** The domain lead prints *chosen for the longest
 * unbroken run in this topic, not for importance*; the search page prints what its sort actually is,
 * and has no *relevance* order because that name would teach a reader something false. A stories
 * index is a selection of four subjects out of the whole corpus, and **without a stated criterion a
 * reader is entitled to read the selection as an argument** — that these four are what matters about
 * the last decade. With four subjects that is a live risk and it grows with every one added.
 *
 * The criterion is computable, carries no merit claim, and **each card names the pair or dispute
 * that qualifies it**, recomputed from `/data` by `signatureFor` rather than restated. §2c's rule
 * still governs whether a subject gets the scroll form: sequence has to do work.
 */
export default function StoriesIndex() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / stories
      </p>
      <h1>Stories</h1>
      <p className="lede">
        A few subjects where the order you meet the evidence in changes what it means. Everything
        here is also in the records; these read it in sequence.
      </p>

      {/* THE CRITERION COVERS WHICH FOUR; IT DOES NOT COVER THE ORDER, and rule 9 binds both.
          The cards come out in `STORIES` order, which is the order they were written — a fact, not
          a judgement — and a reader who is not told that is entitled to read the first as the most
          important. Stated rather than left to be inferred, for the same reason the criterion is
          printed at all. */}
      <div className="qcrit">
        <span className="label">How these four were chosen</span>
        <p>{STORY_CRITERION}</p>
        <p className="qcrit-order">
          They are listed in the order they were written, which is a fact about this site rather
          than a judgement about the subjects. Nothing here is ranked.
        </p>
      </div>

      <div className="grid">
        {STORIES.map((s) => (
          <Link key={s.slug} href={`/stories/${s.slug}/`}>
            <span className="label">
              {s.topic} · {signatureFor(s).map((x) => x.id).join(', ')}
            </span>
            <span className="grid-title">{s.title}</span>
            <span className="grid-meta">{s.card}</span>
          </Link>
        ))}
      </div>

      <p className="prose-note">
        Each story ends with the records it rests on, and{' '}
        <strong>each of those records links back to it</strong> — the route runs both ways, which
        until 13 August 2026 it did not: every story had exactly one inbound link, from this page.
      </p>
    </>
  );
}
