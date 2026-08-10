import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'India Roadmap Instrument',
    template: '%s · India Roadmap Instrument',
  },
  description:
    'Longitudinal research instrument: India’s condition and trajectory from the UPA baseline (frozen May 2014) through the Modi-era terms.',
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
  { href: '/', label: 'overview' },
  { href: '/domains/', label: 'explore' },
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
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <header className="masthead">
            {/* A <p>, not an <h1>, since 2026-08-10 — walk 9's one finding. The masthead had
                been an h1 since phase 0, so every page in the instrument carried two h1s: the
                site name and the page's own title, 661 of 661 in the built output. The page's
                h1 is the page's subject; the masthead is the wrapper it arrives in. Styling is
                by class, so nothing visual moves. */}
            <p className="masthead-title">
              <Link href="/">India Roadmap Instrument</Link>
              <span className="masthead-sub">
                baseline frozen May 2014 · T1 2014–19 · T2 2019–24 · T3 2024– living
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
