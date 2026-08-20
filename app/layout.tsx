import type { Metadata } from 'next';
import { PrimaryNav } from '@/components/PrimaryNav';
// `navLabel` moved with `DIRECTORY`: the per-item labels are resolved where the list is declared.
import { DIRECTORY } from '@/lib/routes';
import { AllPagesDisclosure } from '@/components/AllPagesDisclosure';
import Link from 'next/link';
import localFont from 'next/font/local';
import { series } from '@/lib/data';
import { ProvenanceDrawer } from '@/components/ProvenanceDrawer';
import './globals.css';

/**
 * TYPE — phase 18 §6 made concrete: display serif + technical sans + mono.
 *
 * ============================ VENDORED 2026-08-13, AND THE REASON IS A RED DEPLOY =============
 *
 * These loaded through `next/font/google` until today. That helper downloads at BUILD time and
 * self-hosts the result, so the DEPLOYED site never contacted a font CDN — the promise below held —
 * **but the BUILD contacted one on every run, and a build-time network dependency is a deploy that
 * can fail for a reason unrelated to the change being deployed.**
 *
 * **It has now done so twice.** `6d7ec5c` in this phase, and `de1c3ff`, where all 29 gates passed
 * and `next build` then failed on `module-not-found` for the IBM Plex Sans CSS module. Nothing was
 * wrong with either commit. The hazard was recorded in `STATE.md` after the first one and left
 * unfixed, which is how it got a second turn.
 *
 * **So the files are in the repository.** Six of them, latin subset, taken from the same
 * `fonts.gstatic.com` URLs the helper resolved — `plex-sans-var.woff2` is byte-identical in size to
 * the file the last successful build produced, which is how it was checked rather than assumed. IBM
 * Plex Sans is a VARIABLE font and one file covers 400 to 600; Spectral and Plex Mono ship static
 * weights, so they get one file each.
 *
 * **What this does not change:** the deployed site still makes no font request, the CSS variables
 * are the same three names, and nothing in the stylesheet moves. What it changes is that a deploy
 * can no longer fail because a Google server had a bad minute.
 */
const spectral = localFont({
  src: [
    { path: './fonts/spectral-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/spectral-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/spectral-600.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-display',
  display: 'swap',
});
const plexSans = localFont({
  // One variable file across the range the site uses. Declaring '400 600' rather than three faces
  // is what the file actually is; three entries pointing at one file would be a lie the browser
  // then has to resolve.
  src: [{ path: './fonts/plex-sans-var.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-body',
  display: 'swap',
});
const plexMono = localFont({
  src: [
    { path: './fonts/plex-mono-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/plex-mono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono-face',
  display: 'swap',
});

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
  /**
   * REQUIRED FOR SHARE CARDS TO WORK AT ALL. Without it Next emits `og:url` as the relative path it
   * was given, and an unfurler has no origin to resolve it against — the card either fails or
   * points at the pasting site. Not a style choice: a relative `og:url` is a broken tag.
   *
   * `robots: noindex` below is UNCHANGED and the two are not in conflict. WhatsApp, Slack and
   * Signal fetch these tags directly when a link is pasted; crawlers are told not to index. So the
   * cards work for a pasted link and do nothing for search discovery, which is the recorded choice.
   */
  metadataBase: new URL('https://india-government.vercel.app'),
  title: {
    default: 'India, On the Record',
    template: '%s · India, On the Record',
  },
  description:
    'What India’s own published statistics and official documents can establish about how the country changed since 2014 — and exactly where the record stops.',
  robots: { index: false, follow: false },
  /**
   * THE FALLBACK CARD, so an index surface pasted into a chat unfurls as something.
   *
   * Record routes override title and description through `lib/share-card.ts`; the ~49 index and
   * utility surfaces inherit this. Without it they emitted no `og:` tags at all and unfurled as a
   * bare URL — which is not a wording problem, it is the absence of a card on half the site's
   * entry points.
   *
   * The description is the site's own, unchanged, and carries no figure — the same rule the record
   * cards are held to, and it already satisfied it.
   */
  openGraph: {
    title: 'India, On the Record',
    description:
      'What India’s own published statistics and official documents can establish about how the country changed since 2014 — and exactly where the record stops.',
    siteName: 'India, On the Record',
    type: 'website',
  },
  twitter: { card: 'summary' },
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
/**
 * RENAMED 2026-08-11 — §6. WITHDRAWN LABELS, quoted so the change can be checked: *Overview* and
 * *Explore*. Neither distinguished itself from the other, and neither said what was behind it.
 * **The routes are unchanged**, so every existing link still lands; only the words moved.
 */
/**
 * `Questions` added 2026-08-12 with the question routes (DESIGN-REVISION-2 §2). **It goes in the
 * primary nav rather than the browse group and the distinction is the item's point:** the browse
 * group is entered by someone who already knows what a series, a lens or a term is. These are the
 * questions a reader arrives with, before any of that vocabulary, so a route offered only under
 * `browse` would be reachable exactly by the readers who need it least. Fifth entry; nothing
 * removed, nothing renamed.
 */
/**
 * READER-FACING LABELS, ROUTES UNTOUCHED — and every one is taken from the page's own h1.
 *
 * The prose vocabulary pass renamed `area` and `subject` wherever a reader met them and **never
 * touched navigation**, so the schema's words survived at exactly the point a first-time reader
 * meets them first. `unmeasured` is a field name; `exposure` and `peers` mean nothing cold.
 *
 * **A label is prose and a path is an identifier.** 3,384 internal hrefs and `link-check` assert the
 * routes; none of them moves here. Withdrawn labels are quoted beside each so the change is
 * checkable.
 *
 * TWO PROPOSALS IN THE INSTRUCTION WERE CHECKED AND ONE WAS WRONG. *`contested pairs` and the
 * where-measures-disagree route are the same content under two names* — **they are not.**
 * `/contested/` selects ledger records whose VERDICT is contested (68); the question route selects
 * PAIRS where two instruments disagree (21). Seven records appear in both. Different objects, so
 * both keep a name and each says which it is.
 *
 * `counterfactual` was the one to decide before naming, and it is not a limit of the evidence: it is
 * the record of a feature this instrument considered and declined. **Moved out of `limits` and into
 * `about the record`,** where the other statements about how the instrument was built live. The
 * route does not move.
 */
// `GROUPS` moved to `lib/routes.ts` as `DIRECTORY` so `/directory/` can render the same list.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spectral.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>
        {/* SKIP LINK. Absent from all 753 pages until 2026-08-13. Automated tooling did not call it
            a violation because the landmarks are correct, which is exactly why it survived: the
            masthead carries five primary links plus a directory disclosure, and some routes run
            past 200,000px, so a keyboard reader had no way past the navigation on any of them.
            Visible only on focus — `app/globals.css`, `.skip-link`. */}
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <div className="shell">
          <header className="masthead">
            {/* A <p>, not an <h1>, since 2026-08-10 — walk 9's one finding. The masthead had
                been an h1 since phase 0, so every page in the instrument carried two h1s: the
                site name and the page's own title, 661 of 661 in the built output. The page's
                h1 is the page's subject; the masthead is the wrapper it arrives in. Styling is
                by class, so nothing visual moves. */}
            <p className="masthead-title">
              <Link prefetch={false} href="/">India, On the Record</Link>
              {/* SPELLED OUT 2026-08-13. It read *"T1 2014–19 · T2 2019–24 · T3 2024– living"* on
                  every page — an internal shorthand that a reader has no way to expand, and where
                  "living" reads either as a database state or, worse, as commentary. The terms are
                  named as terms and the open one says what it means. */}
              <span className="masthead-sub">
                May 2014 to {LATEST} · first term 2014–19 · second 2019–24 · third 2024–, still
                being added to
              </span>
            </p>
            {/* The five primary links moved to `components/PrimaryNav.tsx` so they can carry
                `aria-current`, which needs the pathname and therefore a client component. The
                All-pages disclosure stays here and stays script-free — see its own note. */}
            <PrimaryNav />
            <nav className="nav nav-primary nav-secondary" aria-label="All pages">
              {/* THE SIXTEENTH DESTINATION, AND IT IS A DISCLOSURE RATHER THAN A LINK.

                  **Seventeen destinations sat in a footer, and a footer is read by almost nobody.**
                  A page nobody reaches is functionally unpublished, which is the shape rule 4b
                  exists for. The masthead cannot absorb them — it is deliberately short, and the
                  reason it is short is that a long one made the site read as a portal.

                  **NO JAVASCRIPT, AND THAT IS THE WHOLE IMPLEMENTATION CHOICE.** `<details>` opens
                  on click and on Enter, is in the tab order, announces its state to a screen
                  reader, and works on a page whose script never ran. An overlay built on a state
                  hook would be a control that renders correctly and reaches nobody the moment the
                  bundle fails — the defect this exists to fix, reintroduced by the fix.

                  **AMENDED 2026-08-14, AND THE PARAGRAPH ABOVE STILL STANDS.** It is still a
                  `<details>`, the state is still the browser's, and with no script it behaves
                  exactly as it did. What it was NOT doing was closing: not on a click elsewhere,
                  not on Escape, and not when a reader followed one of its own 17 links — client-side
                  navigation keeps this element alive, so the panel hung open over the next page.
                  `AllPagesDisclosure` adds those three dismissals and owns nothing else, so a
                  failed bundle costs a reader the ways OUT of an open panel and never the way in.

                  **Not a side rail.** A persistent sidebar is application furniture and argues
                  against the register the palette and the type protect; at 375 px it collapses to a
                  hamburger, which is the footer with extra steps.

                  The panel renders `DIRECTORY` — the same array `/directory/` renders. One list, two
                  places; a second copy would drift the first time a surface is added. */}
              {/* AT NARROW WIDTHS THIS LINK REPLACES THE PANEL, and the swap is CSS only — see
                  `app/directory/page.tsx` for why the panel could not simply be made a modal.
                  Both render `DIRECTORY`; neither holds its own copy of the list. */}
              <Link prefetch={false} className="allpages-link" href="/directory/">
                All pages
              </Link>
              <AllPagesDisclosure>
                <div className="allpages-panel">
                  {DIRECTORY.map((g) => (
                    <div key={g.label} className="allpages-group">
                      <span className="allpages-label">{g.label}</span>
                      {g.items.map((item) => (
                        <Link prefetch={false} key={item.href} href={item.href}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </AllPagesDisclosure>
            </nav>
          </header>
          <main id="main">{children}</main>
          {/* THE DIRECTORY. The five groups, whole and unchanged, in the place a reader looks for
              a site map rather than the place they meet the site. Every route that was in the
              masthead is here; none moved, none is behind a disclosure. */}
          <nav className="foot-dir" aria-label="Directory">
            {DIRECTORY.map((g) => (
              <div key={g.label} className="foot-dir-group">
                <span className="foot-dir-label">{g.label}</span>
                {g.items.map((item) => (
                  <Link prefetch={false} key={item.href} href={item.href}>
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
              <Link prefetch={false} href="/method/#limits">what that means</Link>.
            </span>
            <Link prefetch={false} href="/method/">method, sources &amp; tiers</Link>
          </footer>
          <ProvenanceDrawer />
        </div>
      </body>
    </html>
  );
}
