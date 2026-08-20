import Link from 'next/link';
import type { Metadata } from 'next';
import { SectionNav } from '@/components/SectionNav';
import { routeLabel } from '@/lib/routes';

export const metadata: Metadata = {
  title: routeLabel('/about/'),
  description: 'Method, sources, public data, derivations and corrections for India, On the Record.',
};

/**
 * ABOUT IS A HUB, NOT A SECOND METHOD PAGE.
 *
 * The masthead used to say About and land directly on `/method/`, while the sources, data,
 * derivations and corrections it appeared to promise lived under a differently grouped directory.
 * This page states the boundary and routes onward. `/method/` remains unchanged and every old URL
 * continues to resolve.
 */
export default function AboutPage() {
  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / about
      </p>
      <h1 className="page-lead">About this record</h1>
      <p className="lede">
        How the archive decides what a document can establish, who published its evidence, how its
        public files are derived, and what it has corrected. This is documentation of the record—not
        another reading of government performance.
      </p>
      <SectionNav section="about" />
      <p className="prose-note">
        Start with <Link href="/method/">Method</Link> for the evidence rules and declared limits.
        Use <Link href="/publishers/">Sources and publishers</Link> to inspect attribution, or{' '}
        <Link href="/data/">Public data</Link> to work from the published records directly.
      </p>
    </>
  );
}
