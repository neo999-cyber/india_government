import type { Metadata } from 'next';
import Link from 'next/link';
import { Spectral, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { series } from '@/lib/data';
import './globals.css';

/**
 * TYPE — phase 18 §6 made concrete: display serif + technical sans + mono. Loaded through
 * `next/font`, which downloads at BUILD time and self-hosts: the deployed site makes no request
 * to any font CDN, which matters for a static instrument that promises nothing phones home.
 */
const spectral = Spectral({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-display', display: 'swap' });
const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-body', display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono-face', display: 'swap' });

/**
 * THE SITE IS "INDIA, ON THE RECORD". Named by the operator 2026-08-10.
 *
 * WHY THIS NAME. It signals **evidence rather than explanation**. "India, Explained" — the working
 * title in the design research — promises an account; this promises something narrower and more
 * honest, which is the corpus's whole positioning: here is what the record shows, and here is where
 * it stops. Anything containing *truth*, *fact*, *check* or *watch* was excluded because those read
 * as advocacy, and an anonymous instrument whose credibility rests entirely on its evidence chain
 * cannot afford a name that argues.
 *
 * **THE SPAN IS IN THE SUBTITLE, NOT THE TITLE, AND IT IS DERIVED.** A name carrying "2014–2026"
 * goes stale on a date nobody is watching for. Putting the span one line down and computing it from
 * the corpus means the site never claims a coverage it does not have, and exactly one line changes
 * when the coverage does — no edit, no reminder, no drift.
 *
 * THE SITE'S NAME AND THE INSTRUMENT'S NAME ARE DIFFERENT OBJECTS, AND THIS IS THE ONE PLACE THAT
 * SAYS SO. The repository, `CLAUDE.md`, `README.md` and the tooling remain the *India Roadmap
 * Instrument*: that is the research apparatus — corpus, schemas, gates. "India, On the Record" is
 * what the apparatus publishes. A later cycle finding the two names side by side should not
 * "correct" either into the other; the phase-name collision is the same lesson one level up.
 */

/** The last year the corpus actually observes. Derived, so the masthead cannot overstate coverage. */
const LATEST = Math.max(
  ...series.flatMap((s) =>
    s.points.filter((p) => p.country === 'IND').map((p) => Number(String(p.period).replace(/^FY/, '').slice(0, 4))),
  ),
);

export const metadata: Metadata = {
  title: {
    default: 'India, On the Record',
    template: '%s · India, On the Record',
  },
  description:
    'What India’s own published statistics and official documents can establish about how the country changed since 2014 — and exactly where the record stops.',
  robots: { index: false, follow: false },
};

/**
 * NAVIGATION IN TWO TIERS — phase 18 §10a, and it resolves the design-queue item that had stood
 * since the nav reached thirteen destinations by accretion.
 *
 * THE PROBLEM WAS NOT LENGTH, IT WAS REGISTER. Thirteen equally-weighted mono links ask a
 * first-time reader to know what `provenance`, `exposure` and `derivations` mean before choosing
 * one. Nothing here is removed — removing a surface would break `domain-coverage`, and every one
 * of them is reachable evidence. The split is: a public path a few doors wide, and the instrument
 * one named group behind it.
 *
 * The EVIDENCE group is also where the "How do we know?" control lands (§4b): the control opens
 * in place, and its deepest link is one of these surfaces. They are the layer, not a leftover.
 *
 * PRIMARY HOLDS ONLY ROUTES THAT EXIST. `Stories` and `Search` are named in §10a and are not here,
 * because `link-check` walks every emitted href and a nav link to an unbuilt route is a dead link
 * — the defect that gate was built for. They join when the surfaces ship.
 */
/**
 * THE NAV, GROUPED WHOLE — operator decision 2026-08-11, releasing the item reserved since phase 17.
 *
 * IT WAS EIGHTEEN DISTINCT DESTINATIONS IN THREE GROUPS, one of which held thirteen. Thirteen items
 * under one word is not a group, it is a list with a heading; a reader scanning it has to know what
 * `provenance`, `exposure`, `derivations` and `counterfactual` mean before choosing, and the answer
 * to "where do I look" was "read all thirteen".
 *
 * ============================ THE GROUPING, AND WHAT DECIDES IT ================================
 *
 * Not by layer, and not by how often a surface is used. **By the question a reader arrives with**,
 * because that is the only thing they know before they know the vocabulary.
 *
 *   READ      — the three ways in that need no vocabulary at all.
 *   BROWSE    — what is the record ABOUT: subject, lens, term, peer. Four axes over one corpus.
 *   RECORDS   — the corpus itself, by layer: series, ledger, provenance, pairs.
 *   LIMITS    — what the record does NOT establish. The four surfaces that exist because this
 *               instrument's subject is partly its own incompleteness, and putting them together
 *               is the strongest single statement the nav can make about what the site is.
 *   ABOUT     — the corpus about itself.
 *
 * **`/contested/` MOVES FROM THE OLD FLAT LIST INTO `RECORDS`, not into `LIMITS`**, and the call is
 * arguable. It holds 60 paired divergent measurements — a disagreement between two instruments is a
 * thing the corpus HOLDS, not a thing it cannot establish. `/unmeasured/`'s 374 declared absences
 * are the opposite: the record saying nothing measures this.
 *
 * ============================ WHAT IT COSTS A READER WHO GOES DIRECT ===========================
 *
 * **Nothing. Every route is unchanged and every one is still one click from every page.** No surface
 * moved behind a disclosure, nothing became a sub-page, and `link-check` walks every emitted href.
 * The change is that the thirteen are now five short rows instead of one long one, so a reader
 * scanning for "where does it say what is missing" finds a heading called *limits* rather than
 * having to already know that `unmeasured` is the answer.
 *
 * The cost is paid by a reader who had memorised the old order — the flat list was alphabetical by
 * nothing and stable, and it is now regrouped. That is a real cost and a small one against the
 * reader who has never been here, who is the reader this whole phase is for.
 *
 * ============================ THE GROUPS MOVED TO THE FOOTER, 2026-08-11 ======================
 *
 * **The grouping was right and it was in the wrong place.** Five labelled groups made nineteen links
 * navigable — for a reader who already knows what `provenance`, `exposure` and `derivations` mean.
 * It did not reduce what a FIRST-TIME reader has to parse, and **three rows of links in a masthead
 * is the single strongest signal that a site is a government portal.** The audience arrives from a
 * forwarded link.
 *
 * So the masthead carries four destinations and the groups move whole into the footer directory.
 * **Nothing is removed, nothing goes behind a disclosure, every route still resolves** — the
 * grouping work is kept, it simply stops being the first thing a reader meets.
 *
 * `search` is in PRIMARY now because `/search/` was built in the same commit. It was absent before
 * for the reason stated here since phase 18 opened: `link-check` walks every emitted href and a nav
 * item pointing at an unbuilt route is a dead link.
 */
const PRIMARY = [
  { href: '/overview/', label: 'Overview' },
  { href: '/domains/', label: 'Explore' },
  { href: '/stories/', label: 'Stories' },
  { href: '/search/', label: 'Search' },
];

const GROUPS: { label: string; items: { href: string; label: string }[] }[] = [
  {
    label: 'browse',
    items: [
      { href: '/domains/', label: 'subjects' },
      { href: '/lenses/', label: 'lenses' },
      { href: '/terms/', label: 'terms' },
      { href: '/peers/', label: 'peers' },
    ],
  },
  {
    label: 'records',
    items: [
      { href: '/series/', label: 'series' },
      { href: '/ledger/', label: 'ledger' },
      { href: '/provenance/', label: 'disputes' },
      { href: '/contested/', label: 'contested pairs' },
    ],
  },
  {
    label: 'limits',
    items: [
      { href: '/unmeasured/', label: 'unmeasured' },
      { href: '/exposure/', label: 'exposure' },
      { href: '/counterfactual/', label: 'counterfactual' },
      { href: '/method/', label: 'method' },
    ],
  },
  {
    label: 'about the record',
    items: [
      { href: '/derivations/', label: 'derivations' },
      { href: '/publishers/', label: 'publishers' },
      { href: '/corrections/', label: 'corrections' },
      { href: '/data/', label: 'data' },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <div className="shell">
          <header className="masthead">
            {/* A <p>, not an <h1>, since 2026-08-10 — walk 9's one finding. The masthead had
                been an h1 since phase 0, so every page in the instrument carried two h1s: the
                site name and the page's own title, 661 of 661 in the built output. The page's
                h1 is the page's subject; the masthead is the wrapper it arrives in. Styling is
                by class, so nothing visual moves. */}
            <p className="masthead-title">
              <Link href="/">India, On the Record</Link>
              <span className="masthead-sub">
                May 2014 to {LATEST} · T1 2014–19 · T2 2019–24 · T3 2024– living
              </span>
            </p>
            <nav className="nav nav-primary" aria-label="Main">
              {PRIMARY.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* A labelled group, not a disclosure. A disclosure would hide thirteen surfaces
                behind a control a phone reader has to find, which is the §8.2 defect: a thing
                that renders correctly and reaches nobody. It wraps instead. */}


          </header>
          <main>{children}</main>
          {/* THE DIRECTORY. The five groups, whole and unchanged, in the place a reader looks for
              a site map rather than the place they meet the site. Every route that was in the
              masthead is here; none moved, none is behind a disclosure. */}
          <nav className="foot-dir" aria-label="Directory">
            {GROUPS.map((g) => (
              <div key={g.label} className="foot-dir-group">
                <span className="foot-dir-label">{g.label}</span>
                {g.items.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>

          <footer className="foot">
            <span>
              A public record of Indian government commitments and what became of them, from the
              May 2014 baseline onward — built from primary documents and graded by what was
              actually retrieved.
            </span>
            <span>No composite score, no verdict number — anywhere, ever.</span>
            <span>
              One author, written with an AI assistant. No independent review has been run:{' '}
              <Link href="/method/#limits">what that means</Link>.
            </span>
            <Link href="/method/">method, sources &amp; tiers</Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
