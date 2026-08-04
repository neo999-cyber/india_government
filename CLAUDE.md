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
5c. **A derived quantity inherits its inputs' contests.** Any ratio, percentage, share or per-unit figure whose numerator or denominator appears in a `differentFacts` pair carries the divergence forward as a RANGE with each bound attributed to its source — or is not stated at all. Picking one side silently converts a recorded disagreement into a settled number, and the record that carries the pair is precisely the one a reader trusts not to do that. **Arithmetic hand-checking cannot catch this class and neither can any gate**: both computations are correct in isolation, each against its own input, and the defect is only visible by asking where the input came from. L-0200 is the first identified instance — thirteen emergency-procurement contracts stated by the Ministry of Defence at ₹1,981.90 crore in June 2025 and ₹1,958.80 crore in December, against a ₹2,000 crore outlay, giving 99.1 or 97.9 per cent committed depending on which total is used. State the range and say why the range exists, distinguishing a contested numerator from an uncertain denominator; where the range is too wide to support the argument being made, the argument is what changes.

5d. **A claim about what EXISTS is not a claim about what the SOURCES CONTAIN, and only the second is checkable.** "No explanation is available", "no other body publishes this", "this is the only case" — each asserts something about the world that no retrieval can establish, because retrieval bounds what was found and never what there is. Rewrite as the observation actually made: *the documents retrieved contain no explanation*, *no other publisher was located*, *this is the only case in the corpus*. The rewrite is not hedging; it is the difference between a statement a later reader can test against the same sources and one they cannot test at all.

**Superlatives are the loudest symptom and not the only one.** The class also covers a bare "unexplained", an "unprecedented", and any negative existential smuggled in as background. **The test is mechanical: could a single document, if it turned up tomorrow, falsify the sentence without any figure in the record changing?** If yes, it is a claim about existence and must be re-grounded on what was searched, where, and what was found.

Caught in cycle 2026-08-04o. L-0200 said same-publisher divergence had "no equivalent explanation available", when a post-signature revision, a tax-basis difference or a redrawn subset all fit and ₹23.10 crore is 1.17 per cent of the total — one revised contract's worth. It now rests on a property of the documents: the later one acknowledges no revision and does not contain the earlier figure. **Ordinary explanations being available is compatible with none being published, and the record must say which it means.**

6. **Tier tags travel with claims.** Any rendered number can be traced to source name, URL, tier. T5 (contested indices) always carries a dispute record covering its own domain, so a contested number never renders without the dispute — P-08 for the governance indices (RSF, Freedom House, V-Dem), P-29 for the Global Hunger Index. The rule is "its dispute", not "P-08": naming one record was right only while every T5 series was a governance index, and demanding P-08 of a human-development index would require a reference the relevance check forbids.
7. **Peer panel vintage discipline** (P-09): panel values carry `source.vintage`; UI shows the vintage date on peer views.
8. **Counterfactual views show both methods** (UPA-trend extrapolation AND peer-index normalisation, 2014=100) and show endpoint sensitivity for trend fits. No composite score of any kind, ever.
9. **English only; no title counts** — n/a here, but: no aggregate "verdict number" for a term or for the government. Scorecards roll up to counts of assessments, not to a grade.

## Research and verification discipline

Every rule here was earned by a defect that got through. None is a precaution against something
imagined. **A rule earned mid-batch is written into this file in the same commit that earns it** —
otherwise it lives only in a verification-log entry and in the head of whoever was working, and the
next cycle silently drops it. A phase-14 audit found 23 of 28 standing rules present nowhere but the
log.

**Rule 1 — read at the moment of quoting.** Record text is read from `/data` in the same operation
that quotes or edits it. Never reconstructed from memory, never carried forward from an earlier
read. Anchor every prose edit on a string read in that operation and abort if the string is absent.
Detect indentation from the file being written; do not assume it.

**Rule 3 — a document is a source only if it was retrieved in this run.** An unretrieved URL is not
a source. **A 200 serving a JavaScript shell is not a retrieval** — check that the body contains the
document, not just that the request succeeded. **OCR output is not the document**: it may locate a
passage, but a quote drawn from it is tiered as OCR, not as the instrument.

**M1 — a reachability failure is retested from a second process, with both resolver and client
varied, before it is recorded as an environment fact.** Expect a meaningful fraction of URLs to need
the fallback. Known environment facts, not to be re-derived: `mod.gov.in` and `ddpmod.gov.in`
resolve and refuse port 443; `pca-cpa.org` is Cloudflare-gated; `mea.gov.in` serves a JS shell;
`federalregister.gov` CAPTCHAs full-text endpoints while its API works. Hosts needing an explicit
resolver: `ppac.gov.in` 164.100.198.160, `mea.gov.in` 13.224.236.14, `www.pib.gov.in` 94.202.207.57.

**M2 — a write is verified by diffing `/data`, never by the writer's own count.** Declare the
expected diff shape before the edit — keys added, line delta — and abort on mismatch. A non-zero
report with an empty or wrong diff is a failure, not a success. **A JSON round-trip is not a safe
way to edit a file whose formatting you did not choose**: four whole-file reformats were caught this
way, each reported clean by the script that caused it.

**A correction guard asserts a presence, never an absence.** When a record is corrected, the
withdrawn wording survives in the sentence that records the withdrawal — that is the form every
correction in this instrument takes, because stating the change inside the record is what
distinguishes a correction from a silent edit. **A guard that forbids a token therefore fails on a
correctly corrected record.** Assert the specific string in its specific context — "the withdrawn
phrase appears exactly once, inside the sentence beginning CORRECTED" — not that it is gone. Caught
in cycle 2026-08-05b, where a guard demanding the absence of "binding" aborted an edit that had
correctly withdrawn the word and said so.

**Assert per record, never sweep.** A keyword or pattern search generates CANDIDATES; the judgement
is made per record and written down per record. Three substring sweeps in one phase produced 59, 197
and 7 false candidates respectively. **Word boundaries are the default** in corpus search
(`tools/lib/corpus-search.mjs`); `substring: true` is the explicit, reviewable opt-out.

**Observe the effect, do not match the spelling.** Where a property can be observed, observe it. A
static scan for `writeFileSync` missed the only mutating gate because it shelled out to `touch`; a
grep for top-level `build()` calls would encode a belief about how a side effect looks. Import the
module and look at the disk.

**Every negative control needs a same-form positive that passes THROUGH the restriction the negative
depends on.** A check reporting clean with no positive beside it proves the needle absent, not the
search working. If the negative depends on "mentions China", the positive must also mention China.

**Every zero result is confirmed by relaxing one restriction at a time until it goes non-zero — the
restriction that flips it is the finding.** A zero that stays zero under full relaxation is the only
citable zero. Record which relaxation flipped it.

**No new bare-domain roots.** Deep-link every source. T1 on a bare root is worse than T4: it asserts
primary strength for a citation that retrieves nothing. Partner-side and multilateral sources are as
citable as domestic ones and often more retrievable — tier them honestly, by the document actually
retrieved rather than the institution behind it.

**A publication choice is not a retrieval failure.** The test: could a better retrieval technique
produce the figure? For a Cloudflare gate, a JS shell, a textless scan or a refused port — yes in
principle; the document exists and the channel failed, and that is retrieval-capability material.
Where the documents retrieve perfectly and the content simply was not published, it is ordinary
corpus material and belongs to its subject arc.

## Session cost

Orientation is paid for at the start of every session, so it is measured and kept small.

**What a session must read:** this file (22 KB) and the phase's `STATE.md` (16 KB) — about 38 KB.
`docs/verification-log.md` is 438 KB and is **not** read whole; it is grepped for the specific
question. `/data` is 2.3 MB across 645 records and **is not read for orientation at all** — read
`docs/corpus-manifest.md` (66 KB), which is generated by `tools/gen-manifest.mjs` as a build step and
carries one line per record: id, domains, lenses, title. A hand-kept index of a corpus that grows
every cycle is stale within one cycle, and a stale index is worse than none because it is read with
the same confidence as a fresh one.

**Gates are silent on success.** One summary line each; full detail only on failure, or with
`--verbose`. A passing `validate` used to print 190 lines, 149 of them open-research warnings
unchanged between cycles — which is how a real warning stops being read. Anything asserting on a
gate's PASSING output must pass `--verbose` explicitly; the selftest does this for `url-check`.

**Retrievals are bounded by default.** Fetch what answers the question — a targeted extract around
the passage sought — and raise the limit per document only when the document warrants it. The MoD
Year End Review is 654,000 characters; almost every use of it needed four passages.

**Author the batch, then gate.** Do not interleave a full gate run with each record. Gates are a
check on the batch, and running them per record multiplies the cost of the slowest part of the cycle
without finding anything a single run at the end would miss. Validate early only when a schema
question is genuinely open.

## Gate discipline

**Gates that read built output refuse to run against a stale build** (exit 2), and exit 2
distinguishes "no build" from "stale build" — both used to land in one silent-skip branch. The
direction that matters is the false PASS: a gate reading the previous build finds every mark it
already knew about and reports clean, and nothing in the output distinguishes that from a real pass.

**Every fixture asserts the specific failure it tests for — the branch, the message — never merely
that a failure occurred.** Two lens fixtures asserted exit 1, got exit 1, and tested the wrong branch
for two cycles while the selftest reported green.

**Generated fixtures carry `GENERATED-FROM.json` and the selftest fails on enum drift**, naming
`npm run regen:lens-fixtures` as the fix. A discipline requirement is what M2 and build-freshness
exist to replace.

**A failing check, re-run with no fix applied, must still fail.** Both assertions are required: a
fast self-repair heals before the check runs and fails assertion one; a lazy self-repair passes run
one and fails run two. **No checker imports from its own repair path** — asserted by importing each
library in a child process and requiring the fixture tree to be byte-identical afterwards.

**Any gate asserting a property of a field cites the schema.** If the property is not in the schema,
either put it there or drop the assertion.

**Do not pipe gates** — an exit code does not survive a pipe. And a structural check passes on a
stub: structure passing is not content passing.

**`figure-consistency`** checks declared arithmetic claims against BOTH their source values and their
printed operands. A non-reconstructing figure must be declared, not merely correct. The claims file's
own source values are checked, not typed from memory. Separators are normalised.

**The gate list, run in full every cycle:** `validate` · `typecheck` · `validate:selftest` ·
`reachability` · `domain-coverage` (which carries `lens-empty`) · `figure-consistency` ·
`enum-stamp` · `url-check` on `/data`. Plus an arithmetic hand-check of every derived figure
including internal consistency, a check that every declared lens returns a non-empty and correct
set, and zero forward references between `parts/` files.

## Authoring conventions

**The four measurement categories.** A record must say which it is:

1. **`differentFacts` pair** — two instruments measuring the SAME quantity and disagreeing. Both
   sides retrieved, same period and basis, methodological reason stated where known. Never averaged,
   never picked. (P-119, India-China trade.)
2. **Single-sided** — one party publishes and the other does not. Not a pair; the absence is the
   finding, localised by relaxation before it is recorded. (L-0191.)
3. **Incommensurable** — instruments measuring DIFFERENT quantities. Not a dispute and not an
   absence. No conversion, no side-by-side placement. **Agreement between them is as unsound as
   disagreement and reviews clean** — "SIPRI broadly confirms the trend" is the same category error
   wearing a friendlier face. (L-0197, TIV against rupees against HS 93.)
4. **Mutually declined** — BOTH parties decline the same quantity, and differently. Not a pair
   (neither gives a conflicting figure), not the single-sided case (both withhold). Record the
   absences separately with their own `reasonKind`: `withheld` where there is an identifiable
   refusal to a specific request, `not-published` where release is simply absent. (L-0202, the S-400
   delivery schedule: `withheld` on the Russian side, `not-published` on the Indian.)

**Share-shaped figures name their numerator and denominator.** If either is unstated in the source,
that is the finding — do not infer the obvious one. Three distinct quantities shared the word
"indigenisation" in one ministry's publications.

**Commitment states.** Every commitment record resolves into one, stated rather than implied:
**(a)** not yet due — the trigger date or condition, named; **(b)** due and undelivered — the date
passed, with evidence of non-delivery; **(c)** abandoned — evidence of abandonment. **Absence of news
is not (c).** A commitment whose source names no due date cannot leave (a) by the passage of time
alone, and the record says so rather than inventing a trigger.

**Procurement filing rule, settled.** Acquisition cost, capital-budget share, payment schedule and
escalation file `macro`; indigenisation share, offsets, exports and DAP domestic content file
`foreign`; a G2G deal read as a diplomatic instrument files `foreign`. The `defence-sector` lens goes
on all of them; counterparty lenses where the record is genuinely about the relationship. `defence`
as a DOMAIN remains armed conflict and counter-insurgency, per phase 11.

**A lens is admitted when its records land, not when it is planned**, and only where the instrument
holds a FILE — several records read together because the counterparty is itself the policy object. A
lens over one record is a filter that returns what the reader already had.

## Phase stop conditions

Distinct from the code-session stops in Build workflow below. A phase run halts, reports and waits
only for:

1. A source that cannot be retrieved and that a record materially depends on — scoped to that
   record's file, not to its arc.
2. A lens or enum change requiring a new principle rather than an application of an existing one.
3. A gate failure surviving two independent reproductions per M1.
4. Anything requiring a phase 11 or 13 record's SUBSTANCE to change. Lens additions are not
   substance and do not stop.

Room is a real constraint and is not a stop condition. **A clean partial beats thin records** — close
what is done, state what is not, and say whether it was attempted.

## Build workflow
- Run phases autonomously: plan → apply → self-verify → commit → push.
- Stop only for: (a) new security surface — new routes serving user data, auth changes, anything beyond static rendering; (b) destructive/irreversible actions — deleting data files, force-pushes, history rewrites.
- Additive-only for `/data`: corrections happen by editing the record and noting the change in `docs/verification-log.md`, never by silent deletion.
- **A closed verification-log entry is never edited.** Corrections are APPENDED and name what they supersede. The log has been append-only since the first cycle, and the reason is not bookkeeping: an append-only log that gets edited whenever an entry turns out to be wrong records only the errors nobody caught, which inverts what it is for. The record is corrected in place — that is what `/data` is — and the entry that stated the error stands, with the later entry governing. Same discipline as stating a correction inside the record rather than making it silently.
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
