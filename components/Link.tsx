import NextLink from 'next/link';
import type { ComponentProps } from 'react';

/**
 * THE SITE'S LINK, WITH PREFETCH OFF — and the only file that may import `next/link`.
 *
 * ============================ WHAT WAS MEASURED, 2026-09-02 ==================================
 *
 * Operator: "overall the website is slow — check if anything can be done." The router prefetches
 * the full payload of every static route whose link enters the viewport, and this site's pages are
 * made of links: 272 on `/overview/`, 399 on a topic page, 929 on `/search/`. Scrolled once, top to
 * bottom, on the built site:
 *
 *   /overview/            120 route payloads    9,620,842 bytes
 *   /domains/education/   114 route payloads    5,376,118 bytes
 *   /search/              150 route payloads    5,850,110 bytes
 *
 * None of it was asked for. A reader on a phone paid ten megabytes to read the Atlas, and the main
 * thread parsed every byte of it while they scrolled — which is the jitter, as much as any style.
 *
 * `prefetch={false}` in the App Router disables prefetching on viewport entry AND on hover; the
 * route is fetched when the link is followed, once, at the size of the page it opens. Client-side
 * navigation is unchanged. Every `<Link>` on the site goes through here, so the decision is made
 * once; a caller that wants prefetching back for one link passes `prefetch` explicitly.
 *
 * **Bound by `tools/link-prefetch.mjs`**, which fails the build on any other import of `next/link`.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink prefetch={false} {...props} />;
}
