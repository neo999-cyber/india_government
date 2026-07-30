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
4. **Blanks are unreported, not zero.** Same discipline as the paper-leaks instrument.
5. **Both GDP series always.** Anywhere old-base and new-base growth could be confused, show both with the seam. Never present either alone as "GDP growth".
6. **Tier tags travel with claims.** Any rendered number can be traced to source name, URL, tier. T5 (contested indices) always carries its dispute link (P-08).
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
