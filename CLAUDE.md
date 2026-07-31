# CLAUDE.md — India Roadmap Instrument

Longitudinal research instrument: India's condition and trajectory, UPA baseline (frozen May 2014) through the Modi-era terms (T1 2014-19, T2 2019-24, T3 2024-, living). Private audience; research rigour is non-negotiable.

## Architecture
- Three data layers, all JSON in `/data`, each governed by a schema in `/schemas`:
  - **series** — indicator time series, India + peer panel (BGD, VNM, IDN, CHN)
  - **ledger** — discrete reform/event/episode records
  - **provenance** — measurement-dispute records (P-xx), first-class citizens
- Next.js, static export, deployed to Vercel. No server, no database, no auth.
- Data enters via `/data/incoming/` drops from research sessions → validate → merge.

## Non-negotiable data rules
1. **Schema validation gates every merge.** A record failing validation never enters `/data`. Build the validator as a CLI (`npm run validate`) and wire it into the build so an invalid repo cannot deploy.
2. **Never splice across a break.** Series with `breaks[]` render with a visible seam (the dual GDP series is the canonical case, P-01). No smoothing, no interpolation across breaks, no trend lines fitted through them.
3. **Status renders visibly.** `approx` and `pending` points are visually distinct from `verified` everywhere they appear. Pending never renders without a flag.
3a. **A caveat never truncates, anywhere, at any density.** `caveat` is a schema field on both the ledger and series schemas. A record carrying one would mislead without it, so it renders wherever the record appears — detail pages, index tables, domain and term pages, cited-by grids — in full, every time. No ellipsis, no clamp, no truncation to fit a cell, no hiding it behind a hover or a disclosure. A qualification cut to fit is the failure the field exists to prevent: a half-read caveat is worse than none, because it looks like the whole of it. This binds future table and density work — if a caveat will not fit a layout, the layout is what changes. Ordinary uncertainty is not a caveat and belongs in `notes`.
4. **Blanks are unreported, not zero.** Same discipline as the paper-leaks instrument.
4a. **An absence renders unlike a finding.** Distinguish a gap in the data from a gap in the world. A blank cell says "not reported this period" (rule 4); where *nothing measures a thing at all*, that is a fact about the record and often the most important thing on the page — it renders, named, rather than being left off. PMAY-G is the canonical case: sanctioned and completed are published, occupancy is not, and a reader shown only the first two would reasonably take completion for the end of the chain. Use the `Absence` mark: dashed, unfilled, no figure, no table, visibly not a panel of results. An absence styled like a finding invites a reader to treat the frame as the content, and nothing is ever estimated into the space. Expect several in infrastructure.
5. **All three GDP regimes always.** GDP growth exists on three incompatible bases: 2004-05 (as contemporaneously reported, ends FY2013-14), 2011-12 (FY2013-14 to FY2024-25), and 2022-23 (from FY2023-24, released 27 Feb 2026, P-10). No spliced back-series exists for either revision. Rules that follow from that:
   - Never present any one base alone as "GDP growth". Anywhere the regimes could be confused, all three render, in base order, with every seam intact.
   - **Overlap years carry every valid figure.** FY2013-14 reads 4.7% (2004-05 base) and 6.9% (2011-12 base); FY2023-24 and FY2024-25 each read differently on the 2011-12 and 2022-23 bases. Both figures are official and current — the instrument shows them adjacent and picks neither. A single number for an overlap year is a claim the published statistics do not support.
   - **A seam knows which side it is on.** Where one regime ends and the next begins, the same period means opposite things: FY2013-14 is the terminus of the 2004-05 base and the origin of the 2011-12 base. A seam at the end of a series renders below the last row and names its successor; a seam at the start renders above the first row and names what it supersedes; a seam mid-series renders above the row it takes effect in. A handoff is never rendered as two unrelated series.
   - When MoSPI publishes the 2022-23 back-series, it is a new record, not an edit: the regimes stay separate and the bridge is documented in provenance.
5a. **A denominator break is not a series break.** The 2022-23 rebasing lowered the level of nominal GDP by 3-4%, so every ratio-to-GDP (`fiscal-deficit`, `genl-govt-debt`, `exports-gdp`, `gfcf-gdp`) steps at 27 Feb 2026 with no change in underlying activity. Any chart or table of those spanning that date must mark it, and mark it **differently** from a series break: the seam is a solid red stop meaning do not splice, the denominator break is a dashed umber band meaning the line may continue but the values either side are divided by different things. Never render an arithmetic step as if it were activity. The marker is derived, not stored — a series qualifies when its unit is a ratio to GDP and it carries the restating provenance record — so no schema change is needed and none was made.
5b. **An NPA ratio never renders alone, and never without its basis.** Two banking rules, both structural:
   - **The write-off adjustment is always offered** (P-17). The fall from the 2018 peak mixes genuine recovery with write-offs (₹16.6 lakh crore gross, ~16% recovered) and with a denominator expanded by credit growth. Any view of `scb-gross-npa` or `psb-gross-npa` carries a toggle to gross NPAs plus cumulative write-offs over the same denominator. Where an input is missing the adjusted view says so and shows nothing — an adjusted line on an assumed denominator overstates the cleanup exactly as the reported ratio does.
   - **The reporting basis is stated wherever the figure appears** (P-18). Domestic and global operations are different populations: the 2018 peak is 14.58% (PSB, global) or 11.46% (SCB, domestic). Series on different bases never share an axis, and a series that states no basis renders as "basis not stated" rather than being assumed onto one.
6. **Tier tags travel with claims.** Any rendered number can be traced to source name, URL, tier. T5 (contested indices) always carries a dispute record covering its own domain, so a contested number never renders without the dispute — P-08 for the governance indices (RSF, Freedom House, V-Dem), P-29 for the Global Hunger Index. The rule is "its dispute", not "P-08": naming one record was right only while every T5 series was a governance index, and demanding P-08 of a human-development index would require a reference the relevance check forbids.
7. **Peer panel vintage discipline** (P-09): panel values carry `source.vintage`; UI shows the vintage date on peer views.
8. **Counterfactual views show both methods** (UPA-trend extrapolation AND peer-index normalisation, 2014=100) and show endpoint sensitivity for trend fits. No composite score of any kind, ever.
9. **English only; no title counts** — n/a here, but: no aggregate "verdict number" for a term or for the government. Scorecards roll up to counts of assessments, not to a grade.

## Build workflow
- Run phases autonomously: plan → apply → self-verify → commit → push.
- Stop only for: (a) new security surface — new routes serving user data, auth changes, anything beyond static rendering; (b) destructive/irreversible actions — deleting data files, force-pushes, history rewrites.
- Additive-only for `/data`: corrections happen by editing the record and noting the change in `docs/verification-log.md`, never by silent deletion.
- Visual verification: Playwright screenshots (desktop 1440px, mobile 390px) on every view after significant UI changes; review renders before considering a phase done.
- Verify on the production deploy after push, not just locally.

## Design system (provisional — locked properly in a later session)
- Instrument register, not dashboard-flashy: restrained, archival, dense-but-legible.
- Light canvas. Red reserved for deaths, alerts, and break-seams. No decorative gradients.
- Mono for system labels and figures (tabular-nums), humanist sans for prose.
- Every view must answer: "what does this number rest on?" — one click to source + tier + provenance.

## Roles
- Chat sessions own research and the truth of `/data` records (drafted to schema, delivered to `/data/incoming/`).
- Code sessions own everything else: pipeline, validation, views, deploy.
- The schemas are the contract. Code may propose schema changes but they're agreed in chat before hardening, since research sessions author against them.
