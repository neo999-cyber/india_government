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
const PRIMARY = [
  // Overview is its own surface since 2026-08-10 — the whole record in one view. The wordmark is
  // the way home; "overview" pointing at "/" made the first nav item a synonym for the logo.
  { href: '/overview/', label: 'overview' },
  { href: '/domains/', label: 'explore' },
  // Joined the primary row when the surface shipped, not before — see the note above.
  { href: '/stories/', label: 'stories' },
];

const EVIDENCE = [
  { href: '/domains/', label: 'domains' },
  // Next to domains rather than at the end, because the two are the same question asked twice —
  // what a record is about, and what it also bears on. A lens reached only from a record page
  // would be a filter a reader could use but not find.
  { href: '/lenses/', label: 'lenses' },
  { href: '/series/', label: 'series' },
  { href: '/ledger/', label: 'ledger' },
  { href: '/provenance/', label: 'provenance' },
  { href: '/terms/', label: 'terms' },
  { href: '/peers/', label: 'peers' },
  { href: '/counterfactual/', label: 'counterfactual' },
  { href: '/contested/', label: 'contested' },
  { href: '/exposure/', label: 'exposure' },
  { href: '/unmeasured/', label: 'unmeasured' },
  { href: '/method/', label: 'method' },
  { href: '/derivations/', label: 'derivations' },
  // Added 2026-08-11. All three answer questions a reader of the evidence has and no surface
  // answered: who published this, has it been revised, and can I have the whole thing as data.
];

/**
 * THE CORPUS ABOUT ITSELF — a second labelled group, operator decision 2026-08-11.
 *
 * WHAT THIS RECORDS RATHER THAN JUST FIXES. The nav has been a standing open design item at
 * **thirteen destinations** since phase 17, under the operator's ruling that the accretion is
 * design work. It reached **nineteen**, and the last three are mine: `/publishers/`,
 * `/corrections/` and `/data/`, added 2026-08-11 in `4bcfcb3`. Each was defensible on its own —
 * they answer *who published this*, *has this been revised*, *can I have the whole thing as data* —
 * **and that is exactly how a list gets from thirteen to nineteen: one defensible item at a time,
 * each noted nowhere.** The count is written into this comment so the next addition has to walk
 * past it.
 *
 * THE CONTAINMENT IS PARTIAL BY DESIGN AND SAYS SO. Grouping these three is not the nav grouping;
 * it touches only what this session added and leaves the other sixteen exactly as they were. **The
 * full grouping stays reserved for the design work** and this must not be read as having done it.
 *
 * WHY THESE THREE ARE ONE GROUP AND NOT THREE ITEMS. They are the only surfaces whose subject is
 * the CORPUS rather than India: who published the evidence, what this instrument has revised, and
 * the data itself. Everything in EVIDENCE above is a way into the records; these three are ways
 * into the record-keeping.
 */
const ABOUT_THE_RECORD = [
  { href: '/publishers/', label: 'publishers' },
  { href: '/corrections/', label: 'corrections' },
  { href: '/data/', label: 'data' },
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
            <nav className="nav nav-evidence" aria-label="Evidence">
              <span className="nav-group-label">evidence</span>
              {EVIDENCE.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* Same shape as the evidence group, same reason it is a labelled group rather than a
                disclosure: a control a phone reader has to find is a surface that reaches nobody. */}
            <nav className="nav nav-evidence nav-about" aria-label="About the record">
              <span className="nav-group-label">about the record</span>
              {ABOUT_THE_RECORD.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <main>{children}</main>
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
