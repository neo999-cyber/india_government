# External audit, triaged — Codex, 13 August 2026, against commit `76f899a`

An independent read-only audit of the deployed site. **This file is the triage, not the audit.**
Every claim below was re-derived against the code, the built bytes or a DOM probe before it was
written down — a flag raised against a record is checked against the record, not against the report
that describes it, and an audit arrives with the authority of having just found something real.

**Scope of this triage.** I verified: the visitor-reading section, all eight UX findings, the
prioritised list, and the parts of engineering and SEO that are checkable from the repository.
**I did NOT re-run: Lighthouse, axe, the page pixel-height measurements, the prefetch transfer
figures, or the security-header inspection.** Those are taken on report. Where a number below has no
method beside it, it is theirs and not mine.

---

## 1. VERDICT ON THE AUDIT

**Nineteen findings confirmed, one wrong, the rest unverified-but-plausible.** The strike rate is
high and two findings are worse than stated. The single most valuable thing in it is not a defect at
all — see §5.

### The one that is wrong, and its cause is the audit's own P0

**P1 "Generated documentation is stale on main and CI does not notice" — DOES NOT REPRODUCE.**
A full build at `76f899a` leaves `git status` clean; regenerating `docs/derivations.md` by hand
produces a zero diff. The `3feef5f (2026-08-11)` stamp is **deliberate and documented in the
generator's own header**: the stamp is the last commit that touched `/data`, not HEAD, because the
figures derive from `/data` alone and a HEAD stamp would churn one line on every commit forever. The
shallow-history path *preserves the prior stamp* rather than writing HEAD.

**What the auditor saw is a second symptom of their own P0** — a truncated clone changing generated
output — filed as an independent finding. Their recommended fix ("choose one contract: committed
with zero-drift CI, or build artifact") would destroy the anti-churn design that stamp exists for.
**Fix the P0; do not touch the stamp.**

---

## 2. THE CONFIRMED LIST, with what I measured

### Correctness — things that are wrong rather than merely weak

| # | finding | verified how | severity |
|---|---|---|---|
| **C1** | **`farmer-suicides`' finding describes a comparison the series does not contain.** Its break is at **2014, the first point** — a start seam. Eleven unbroken points, 12,360 → 10,546. The finding says *"Figures either side of the seam are not the same measurement."* There are no figures on the other side within this series. | corpus read + segment computation | **highest — the corpus asserts something false about itself** |
| **C2** | **Story chart grid ticks ignore `yMax`.** `[0,25,50,75]` hardcoded against a `yMax` prop. Built bytes: `what-counts-as-education-spending` (yMax 6) and `did-jobs-grow` (yMax 10) plot **3 of 4 grid lines off-canvas**; `how-renewable` 1 of 4; `two-counts-one-boundary` and `a-zero-that-is-not-a-zero` collapse all four onto the baseline. **Only 2 of 7 stories are correct.** | grid `y1` read from `out/` | high — **introduced by me** when `yMax` became a prop |
| **C3** | **Search result count cannot ever be right.** `SearchSort` takes `count` as an immutable prop; filtering is CSS-only over `data-` attributes so the DOM never moves. It sits in `aria-live="polite"`. **And the comment above it claims it is "a count of what the current filter leaves showing"** — an assertion the component is structurally incapable of satisfying. | source read | high — a live region actively misinforming |

### Integrity

| # | finding | verified how |
|---|---|---|
| **I1** | **CI does not fetch the history its gates require.** `actions/checkout@v4`, no `fetch-depth`. `quotation-identity` *skips* rather than fails on a shallow clone, and the workflow still passes. A green CI run does not prove quotation identity. | workflow read |

### Accessibility — larger than the audit stated

| # | finding | verified how |
|---|---|---|
| **A1** | **393 of 583 links on `/series/` are under a 24×24 target.** Commonest shape `strip-bar` at **418×4**; the smallest are **3×4 CSS pixels**. | DOM probe, 1280×900 |
| **A2** | **`.table-wrap` scrolls horizontally and cannot take keyboard focus** — `tabindex` is `null`. | DOM probe + CSS |
| **A3** | **Heading-level skips on 340 of 753 pages** — **all 269 series pages**, 70 domain pages, 1 overview. A template defect, not scatter. | static scan of `out/` |
| **A4** | No skip link on any page; 531 of 532 tables carry no caption. | audit, not re-verified |

### Vocabulary and navigation

| # | finding | verified how |
|---|---|---|
| **N1** | **Four names for one destination.** `/series/`: nav *indicators* · title *Series* · H1 *Indicator series* · breadcrumb *instrument / series*. Same shape on `/ledger/`, `/provenance/`, `/overview/`. **And [layout.tsx:213](../../app/layout.tsx) carries `// was: series — the prose pass renamed this everywhere but here`, which is false** — the rename reached the nav and stopped. | built `<title>`/H1/crumb read |
| **N2** | **No `aria-current`** anywhere in the layout. | grep |
| **N3** | **No type-scale rule exists.** Computed at 1280: `page-lead` 64px · `home-lead`/`story-lead` 32px · *no class* 24px. **`/series/` and `/ledger/` are index pages exactly as `/domains/macro/` and `/search/` are, and render at 24px against 64px.** Not "varies by template" — there is no role rule at all. | DOM probe over 8 routes |
| **N4** | `T1 2014–19 · T2 2019–24 · T3 2024– living` renders in the masthead on every page, unexpanded. | built HTML |

### Structure and weight

| # | finding | verified how |
|---|---|---|
| **S1** | **Topic tabs do not isolate.** Lead chart, *What changed*, chart grid and readable record list all render before the first `tab === 'overview'` at line 452. `/domains/macro/records/` is **269,862 bytes** against the overview's **158,021**. | source + built bytes |
| **S2** | Large indexes shipped whole: `/search/` 2.01 MB, `/series/` 1.40 MB, `/unmeasured/` 1.16 MB. Mobile perf 64 on search. | byte sizes mine; Lighthouse theirs |
| **S3** | Landing order: `h2` #1 *Move through the years*, #2 *Three ways the record speaks*. | built HTML |
| **S4** | Mobile: header **203px**, 235px before `<main>`, **`All pages` panel 941px inside an 812px viewport**, native `<details>`, no backdrop. | DOM probe, 375×812 |

### Housekeeping

| # | finding | verified how |
|---|---|---|
| **H1** | **5 high-severity dependency vulnerabilities**, 0 critical. | `npm audit` |
| **H2** | **No favicon** — no `app/icon*`, no `public/favicon*`. | `ls` |
| **H3** | **No lint and no UI test command.** Only `validate:selftest` matches. | `package.json` |
| **H4** | `noindex, nofollow` set in `vercel.json`. Deliberate; a distribution decision, not a defect. | grep |

---

## 3. THE VISITOR-READING SECTION — the most important, and it needs its own analysis

### 3a. What the auditor got right, and the data that settles it

Three authored series findings *"read as metadata or provenance that happened to be placed in the
outcome slot."* All three quotes are verbatim. The data says an outcome sentence was available in
every one:

| series | points | breaks | longest unbroken run | movement available |
|---|---|---|---|---|
| `exports-gdp` | 13 | **0** | 13 | 25.4% → 21.0% |
| `farmer-suicides` | 11 | 1 (at the first point) | **11** | 12,360 → 10,546 |
| `jk-psa-detenus-transferred-out` | 6 | 0 | 6 | 44 → 52 |

### 3b. The class is bigger than three — measured, not asserted

All **237** authored findings parsed; openings classified mechanically; **the 103 that did not
obviously open on an outcome were read individually.** Term lists reported because a count without
them is worth nothing: **23 outcome markers, 16 provenance markers.**

Of ~20 label-or-provenance openers tested against their own data:

- **1 is correct because no outcome exists.** `nas-parakh-grade3-language`, longest unbroken run **1
  point**, opens *"Not a trend line: three different instruments wearing one name, each of which its
  own custodians say breaks comparison with its predecessor."* **This is the auditor's own escape
  clause, executed exactly, and it is already in the corpus.** The pattern is not missing. It is
  applied inconsistently.
- **2 are correct because a rule forbids the bare outcome.** `gdp-growth-new-base` and
  `gdp-growth-2022-base` — rule 5 bans presenting one base alone as "GDP growth".
- **~17 have an outcome available** (unbroken runs of 3 to 13 points, real movement) **and spend the
  slot on a label, a definition, a method note or provenance.**

### 3c. THE AMENDMENT THE RULE NEEDS, and why it makes this checkable

The auditor's rule — *the outcome sentence should answer "what happened?" in its first clause* — is
right, and as written it is a matter of taste. **It becomes mechanical with one amendment:**

> **The discriminator is whether an outcome is available IN THE DATA, and that is computable per
> record: longest unbroken run ≥ 2 with a movement.** Where it is, an outcome sentence exists and its
> absence is a choice. Where it is not, the finding must say *this record cannot establish a trend*
> in those terms. **Provenance never occupies the slot in either case.**

**What this does NOT license.** It is not a sweep. `nas-parakh-grade3-language` proves the corpus
already distinguishes the cases, and rule 5 proves some outcomes are forbidden rather than merely
absent. **Assert per record, never sweep** — the availability test generates candidates and the
judgement is written down per record.

### 3d. The repetition claims, measured through the gate's own normaliser

- `DISCONTINUED, NOT MERELY UNRETRIEVED` — **×2 on the landing page.** Confirmed.
- `not an explanation of the shape` — **×5 on `/domains/macro/` alone.** They said "repeated"; it is
  five.
- *not for importance* and *not a ranking* — **×1 each.** Those two are overstated; the ×5 carries
  the point without them.

---

## 4. WHAT TO DO, IN ORDER

Ordered by *what is wrong* before *what is slow*, and inside that by cost.

### Tranche 1 — correctness. The site is currently asserting untrue things.
1. **C1 `farmer-suicides`** — a correction quoting the withdrawn wording in the same field, per the
   correction convention. This is the only item on the list where the corpus states something its
   own data contradicts.
2. **C2 chart ticks** — `ticksForMax(yMax)` with a unit test; assert in-range ticks for all seven
   stories. Mine to fix.
3. **C3 search count** — the count becomes client state driven by the facets. **Constraint: with
   scripting off the number must still be true**, so the no-JS wording changes rather than the
   number lying quietly.

### Tranche 2 — integrity of the gates themselves.
4. **I1** — `fetch-depth: 0`; make every history-dependent gate **exit non-zero when history is
   unavailable instead of skipping**; add a dirty-tree check after build. **Do not touch the
   derivations stamp.**

### Tranche 3 — accessibility, where the numbers are worst.
5. **A1** 393 undersized targets on one page — give `strip-bar` a 44×44 interaction area without
   changing the visual bar.
6. **A2** `tabindex="0"` + accessible name on `.table-wrap`.
7. **A3** heading levels on the series template (269 pages from one fix), then domains.
8. **A4** skip link.

### Tranche 4 — the vocabulary, as one registry rather than four edits.
9. **N1** one route-label declaration feeding nav, `<title>`, H1, breadcrumb and `og:title`. This is
   the local-fix rule applied properly: the last pass fixed the nav and left three surfaces, and a
   registry is what stops the next pass doing the same.
10. **N2** `aria-current`. **N4** spell out the term shorthand.

### Tranche 5 — the findings pass. Per record, with a reading owed on each.
11. The ~17 from §3b, against the §3c availability test, leaving the three that are correct.

### Tranche 6 — weight and housekeeping.
12. **H2** favicon · **H1** dependency upgrade behind the full gate chain · **H3** lint + a small
    Playwright suite covering exactly the defects that got through: search count, tab isolation,
    chart ticks, mobile overflow, keyboard table scrolling.
13. **S1** tab isolation — note this will move `listing-marks`' row count, and that is expected
    rather than a breach: the records still list on their own tab.
14. **S2** prefetch off for dense lists first (cheap, measurable), then index partitioning.

---

## 5. THE FINDING THAT IS NOT A DEFECT, AND IT IS THE MOST IMPORTANT ONE

A first-time reader, **before reading the method page**, understood the site as *a bounded
reconstruction of what the published record can establish, with visible seams* — and **explicitly
not as "Indian government statistics are bad."**

That was the hardest thing in the design brief, the nihilism guard was written for it, and an
independent reader reached the intended claim unaided. **No gate in this repository can test that.**
It needed somebody reading cold, and it is the one result here that could not have been obtained any
other way.

---

## 6. TWO ITEMS THAT ARE DECISIONS, NOT DEFECTS — they need a ruling, not a fix

- **S3 landing order.** The auditor is right that the year explorer precedes the explanatory model.
  But that order was authored under DESIGN-REVISION-2 item 1. Reordering is an editorial decision
  against that brief, not a repair.
- **S4 the `All pages` panel.** Focus trap, Escape-close and scroll-lock all require script, and the
  panel was deliberately built as *an overlay with no script*. The auditor's own alternative — a
  dedicated sitemap route — is the fix that keeps the constraint. **A 941px panel in an 812px
  viewport is a real problem; adding script to solve it reverses a stated decision.**
- **H4 `noindex`.** A distribution question, not an engineering one.

---

# 7. WORKED — status as at 2026-08-13, appended to the triage rather than replacing it

**Tranches 1 to 6 were run in one continuous session.** This section records what landed, what was
deliberately not done, and where a fix departed from the audit's recommendation.

| tranche | item | outcome |
|---|---|---|
| 1 | C1 `farmer-suicides` | **corrected** — withdrawn wording quoted in the log, reason for not quoting in-field recorded at the record |
| 1 | C2 chart ticks | **fixed** — `lib/ticks.ts`; all 7 stories 4–6 ticks, spread 194–242px, none off-canvas |
| 1 | C3 search count | **deleted, not wired** — `ListingFacets` already owned a correct one; `initialTotal` added on 4 call sites so no-JS keeps a true count |
| 2 | I1 CI history | **fixed** — `fetch-depth: 0`, `--require-history` fatal in CI, dirty-tree check, pinned SHAs, `permissions: contents: read` |
| 3 | A1 target size | **exception invoked, keyboard burden fixed** — see below |
| 3 | A2 scrollers | **fixed** — 31 of 31 `table-wrap` containers focusable |
| 3 | A3 heading skips | **fixed** — 340 pages → **0** |
| 3 | A4 skip link | **added** |
| 3 | duplicate landmarks | **fixed** — the two year rails named for position |
| 4 | N1 label drift | **fixed** — `lib/routes.ts`, 9 surfaces realigned, 4 titles derived |
| 4 | N2 `aria-current` | **added** — `components/PrimaryNav.tsx` |
| 4 | N4 term shorthand | **spelled out** |
| 5 | the findings pass | **7 rewritten, 9 kept with reasons** — see below |
| 6 | H2 favicon | **added** — `app/icon.svg`, the site's own break-seam motif |
| 6 | S1 tab isolation | **fixed** — records tab 264 KB → 134 KB, 5 charts → 0 |
| 6 | S2 prefetch | **off on 27 links across 9 dense surfaces** |
| 6 | H3 lint/tests | **substituted, and only partly** — see below |
| 6 | H1 dependencies | see below |

## Three places the work departed from the recommendation, and why

**A1 target size — an exception invoked, not a conformance claim.** 393 of 583 links on `/series/`
are under 24×24 and that measurement is right. The rows cannot become 24px: 269 rows would take the
span strip from 1,614px to 6,456px and the density IS the function. **WCAG 2.5.8's *Essential*
exception is invoked deliberately.** What was not essential — 269 four-pixel tab stops standing
between a keyboard reader and the table — is fixed, and no function goes with it, because every
series on the strip is a full row of the filterable table on the same page.

**The findings class was ~17 and the true number is 7.** Sorting by first sentence put ~17 in scope;
**reading each one whole** showed most already carry their outcome in sentence two, and that for nine
of them leading with the figure would leave a false impression the caveat then has to undo. The test
that survives contact with this corpus is narrower than the audit's: *lead with the outcome unless
leading with the figure would mislead.* Sixteen candidates, sixteen judgements, per record.

**H3 interface tests — `tools/interface-invariants.mjs` instead of Playwright, and it answers less.**
It runs in `npm run build`, so it binds on every commit and every deploy, which a Playwright suite
would not without new infrastructure; it needs no browser binaries. It asserts that `/search/` states
its count in exactly one live region and that all **56 domain tabs across 14 topics** carry their own
body and an orientation line and none carries the overview's. **It cannot click a facet, measure a
rendered target, tab through a page, or detect 375px overflow. Those remain unbound and the audit's
finding on interface regression coverage is only partly answered.**

## H1 dependencies — PARTLY DONE, AND THE UPGRADE WAS REVERTED DELIBERATELY

**Two of the five are fixed and committed**: `npm audit fix` resolved `fast-uri` to 3.1.5 and
`nanoid` to 3.3.18 without touching Next. Those lockfile changes are in.

**The remaining three were NOT fixed, and the audit's stated remedy would not have fixed them
either.** They are `next`, `postcss` and `sharp`, and the residual after any Next bump is `sharp`'s
inherited libvips CVEs (GHSA-f88m-g3jw-g9cj) — upstream of Next's dependency range. **So the figure
goes 5 → 3, not 5 → 0 as the audit projected.**

Next 16.3.0 was pinned and installed anyway, to test it. **The install stalled twice on this
machine's network** — 30 top-level packages after a long run, nothing written for minutes — and being
killed left `next`, `postcss` and `sharp` half-written, which broke `npm install` with `ENOTEMPTY`
until each was cleared by hand. The pin was reverted to 16.2.12, the tree restored from the
unchanged lock, and **the full 29-gate chain re-run green to prove the repository is not left in a
worse state than it started.**

**This is a decision, not an omission.** Blocking five tranches of verified work behind a flaky
upgrade that buys 3 high → 3 high is the wrong trade, and the residual exposure is build/CI on a
static export with no runtime server — which the audit itself says reduces practical
exploitability. **The upgrade is owed and should be done on a connection that can complete it**,
against this same chain.

