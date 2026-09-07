import Link from '@/components/Link';
import type { Metadata } from 'next';
import { DIRECTORY, routeLabel, crumbLabel } from '@/lib/routes';

export const metadata: Metadata = { title: routeLabel('/directory/') };

/**
 * EVERY DESTINATION, AS A PAGE.
 *
 * ============================ WHY THIS EXISTS =================================================
 *
 * The masthead's `All pages` disclosure is a `<details>` panel, built without script so it works on
 * a page whose bundle never loaded. **On a phone it opens to 941px inside an 812px viewport** —
 * measured at 375x812 — with no backdrop, no Escape and no scroll lock, so a reader who opens it
 * has to find the summary again to get out.
 *
 * **The obvious fix is the wrong one.** Focus-trap, Escape and scroll-lock all need JavaScript, and
 * turning the directory into a scripted modal would make the one control designed to survive a
 * failed bundle depend on it. That reverses a decision rather than repairing a defect.
 *
 * **So the panel becomes a PAGE at narrow widths and stays a panel where it was measured to work.**
 * Both render from `DIRECTORY` in `lib/routes.ts` — one list, two surfaces, and the swap is CSS
 * only. A page scrolls normally, can be linked and bookmarked, and needs nothing to close.
 *
 * ============================ WHAT THIS PAGE IS NOT ===========================================
 *
 * **Not `/sitemap.xml`.** That is a machine document for crawlers and this site sends
 * `X-Robots-Tag: noindex, nofollow` deliberately. This is a reader's contents page, and it is named
 * for what a reader would call it.
 *
 * **And it ranks nothing.** The groups are the seven concepts the masthead teaches, in that same
 * authored order. Specialist routes sit under the concept a reader already knows rather than
 * under a second vocabulary invented for the directory.
 */
export default function Directory() {
  const total = DIRECTORY.reduce((n, g) => n + g.items.length + 1, 0);

  return (
    <>
      <p className="crumb">
        <Link href="/">instrument</Link> / {crumbLabel('/directory/')}
      </p>

      <h1 className="page-lead">All pages</h1>
      <p className="lede">
        The same seven sections used in the masthead, each followed by the specialist views it
        contains. All {total} destinations keep their existing addresses, and nothing here is
        ordered by importance.
      </p>

      <div className="dir-groups">
        {DIRECTORY.map((g) => (
          <section key={g.key} className="dir-group">
            <h2><Link href={g.href}>{g.label}</Link></h2>
            <p>{g.description}</p>
            <ul>
              {g.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="prose-note">
        The records themselves are not listed here — there are 679 of them. They are reached through{' '}
        <Link href="/search/">{routeLabel('/search/')}</Link>, or through any of the surfaces above.
      </p>
    </>
  );
}
