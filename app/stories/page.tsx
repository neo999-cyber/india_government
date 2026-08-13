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
        <Link href="/stories/did-jobs-grow/">
          <span className="label">Employment · measurement dispute</span>
          <span className="grid-title">Did jobs grow after 2014?</span>
          <span className="grid-meta">
            Two surveys of the same quantity that disagree about the direction, and an official fall
            made of something other than jobs
          </span>
        </Link>
        <Link href="/stories/who-counts-the-dead/">
          <span className="label">Kashmir · who publishes</span>
          <span className="grid-title">Who counts the dead in Kashmir?</span>
          <span className="grid-meta">
            Twenty-seven of thirty indicators are published by the state; the three that are not all
            count deaths, and they do not sit where you would expect
          </span>
        </Link>
        <Link href="/stories/how-renewable/">
          <span className="label">Environment · one publisher, four answers</span>
          <span className="grid-title">How much of India&rsquo;s electricity is renewable?</span>
          <span className="grid-meta">
            Four official figures for the same year, all correct, from 16.88 per cent to 53.21 — and
            coal production nearly doubled underneath them
          </span>
        </Link>
      </div>
    </>
  );
}
