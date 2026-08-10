import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Stories' };

/**
 * The stories index. Deliberately short: §2c says scroll-driven narrative is for the few subjects
 * where sequence explains something, not the default page structure, so this list should stay
 * small and each entry should be able to say why it earned the form.
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

      <div className="grid">
        <Link href="/stories/can-indian-children-read/">
          <span className="label">Education · measurement dispute</span>
          <span className="grid-title">Can Indian children read?</span>
          <span className="grid-meta">
            Two national instruments, one question, and answers that point different ways
          </span>
        </Link>
      </div>
    </>
  );
}
