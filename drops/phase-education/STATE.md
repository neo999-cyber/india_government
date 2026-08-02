# /phase education --dry — HALTED IN STAGE 2

**Halted 2026-08-02.** Not a drop. No records authored. `/data` untouched.

## Where it stopped

Stage 1 (scope) completed and cleared. Stage 2 (research) was **terminated by a
session/API limit**, not by a stop trigger, while the lead agent was writing §5.
Stages 3–8 never ran.

## What is on disk

`parts/` holds the recoverable stage-2 output. `research.md` is the lead agent's
assembly and is **STALE** — it was written at 23:23 and covers §§0,1,2,3,8,8A only.
Parts 04, 09, 10 landed after it. Parts 06, 07, 11 were recovered afterwards from
subagent transcripts and were never in it at all.

**Do not feed `research.md` to stage 3. Read `parts/` directly.**

| part | section | status |
|---|---|---|
| `00.md`, `00-head.md` | tiering note | in research.md |
| `01.md` | ASER trajectory | in research.md |
| `02.md` | ASER-vs-NAS dispute | in research.md |
| `03.md` | COVID loss and recovery | in research.md |
| `04.md` | UDISE+ enrolment base shift | **not in research.md** |
| — | **teachers** | **MISSING — never written** |
| `06-rte-12-1-c.md` | RTE §12(1)(c) | **recovered, not in research.md** |
| `07-nep-state-adoption.md` | NEP 2020, TN dispute, state adoption | **recovered, not in research.md** |
| `07b-FAILED-pmshri.md` | PM-SHRI funds agent | **FAILED — 172 bytes, no content** |
| `08.md`, `8A.md` | public education spending | in research.md |
| `09.md` | private schooling share | **not in research.md** |
| `10.md` | higher education / AISHE | **not in research.md** |
| `11-spending-literacy.md` | spending (2nd pass) + literacy | **recovered, not in research.md** |

## To resume

1. Re-run stage 2 for **§5 teachers only** — vacancies, PTR, single-teacher
   schools, share professionally qualified. Nothing else is missing.
2. Reconcile `08.md` against `11-spending-literacy.md` Part A. Two agents covered
   public education spending independently. They agree on the ABE Table 4 series
   but differ in emphasis; the duplication has not been resolved.
3. Then stage 3, reading `parts/` — not `research.md`.

## Constraints carried in from the brief

- No `education` domain value. File provisionally into the live enum and **flag
  every bad fit**; the flag is the requested output.
- `graduate-unemployment` stays in `employment`. L-0063 stays as authored. No
  parallel record on graduate outcomes or skilling — new skilling material amends
  L-0063.
- The ASER-vs-NAS dispute must produce a provenance record regardless of how the
  series come out.
- P-10's rule scope has been waiting on an education-spending-share series.

---

## UPDATE 2026-08-02, after the drop

Stage 3 authored (`records/`). **Then two stage-2 teacher subagents returned** —
they had been running since before the drop and were listed as unreturned in
§5's own digest. Preserved as `parts/05b-recruitment-integrity.md` and
`parts/05c-vacancy-parliamentary.md`.

**The drop is therefore itself a stale assembly**, the exact failure §8 of spec
v2.3 names. Stage 3 never saw either file.

**One is a material contradiction, not an addition.** `05-teachers.md` authored
its central absence as *no national teacher-vacancy statistic exists*
(`not-collected`). `05c` establishes from ~253 retrieved parliamentary answers
that the figure **existed and was tabled routinely 2014–2024, then stopped** —
last full national figure RS UN 1460 (02.08.2023), last vacancy-only RS UN 525
(07.02.2024), and it is still furnished to the Standing Committee (Report 368,
08.08.2025) while being refused in answer to questions. That is
`not-published`/discontinuation, not `not-collected`. **Any ledger or absence
record resting on the teacher-vacancy absence must be re-authored before merge.**

`05b` adds without contradicting: the Public Examinations Act 2024 Schedule
reaches no state teacher exam and not CTET; *Devesh Sharma* (2023 INSC 704);
Tripura's 10,323.

---

## STATE AT 2026-08-02, before the teacher re-author

Drop authored and on disk at `records/` — 89 records (48 series, 20 ledger
L-0090→L-0109, 12 provenance P-59→P-70, 9 pairs PR-17→PR-25). All compile
against the live schemas. Nothing merged; `/data` untouched.

Domain fit: 56 of 89 filed where the fit is bad. Series 37/48, provenance 8/12,
pairs 5/9, ledger 6/20. Full table in `records/DOMAIN-FIT.md`. NOT re-counted
after the teacher re-author — the count above is as at the original drop.

Open stops carried, none decided: **A** on L-0096 (no assessment value fits a
measure whose outcome was never published); **D** on L-0105 (opening
`demography` would be that value's first use); **B** on 29 held points.

**Now doing item 1 only** — re-authoring the teacher records against
`parts/05b-recruitment-integrity.md` and `parts/05c-vacancy-parliamentary.md`.
Self-check is NOT being re-run and domain fit is NOT being re-counted.

Records in scope: L-0094 (the vacancy record, whose premise is wrong),
L-0095, L-0108, and series `teacher-vacancy-rate-ssa`.

---

## ITEM 1 DONE — teacher records re-authored, 2026-08-02

Re-authored against `parts/05c-vacancy-parliamentary.md` and
`parts/05b-recruitment-integrity.md`. Drop now 90 records (49 series). Valid
against the live schemas, per record, via `tools/lib/schema.mjs`. No ID
collisions with `/data`, no dangling seriesRefs. `/data` untouched.

**L-0094** — premise replaced. Was "The Union declines to maintain a national
teacher-vacancy statistic"; now "A national teacher-vacancy statistic, tabled
for a decade and then withdrawn". `assessment` moved `contested` → `reversed`.
All three absences rewritten; the false one — "Any pre-2021-22 national
teacher-vacancy figure … none should be constructed" — **deleted**, because the
figures exist and are now carried.

**NEW series `teacher-vacancy-rate-elementary`** — 9 points FY2013-14 →
FY2025-26 (last pending), 3 declared breaks. This is the series the deleted
absence wrongly said could not be built. Carries a UPA baseline.

**`teacher-vacancy-rate-ssa`** — retitled to all-levels, FY2022-23 point added
from Standing Committee Report 349, absences corrected to `not-published`.

**L-0108** — the Public Examinations Act 2024 Schedule written in full.

NOT done, as instructed: self-check not re-run, domain fit not re-counted. The
56/89 count in `records/DOMAIN-FIT.md` is as at the original drop and does not
cover the new series.

### OPEN — reported, not decided

Whether `reasonKind` needs a value for **discontinuation**. Filed
`not-published` per the written definitions. See the run report.

---

# HANDOFF — read this first in a new session

**Date:** 2026-08-02. Everything below is committed and pushed to `main`.
**`/data` has not been touched at any point.** The drop is not merged.

## Where things stand

`/phase education --dry` ran to the drop and stopped there, as instructed.
Stage 8 never ran, so no PR was opened and no cycle letter was assigned by the
run — `2026-08-02a` in `docs/verification-log.md` was assigned by hand.

**The drop:** `drops/phase-education/records/` — 90 records (49 series, 20 ledger
L-0090→L-0109, 12 provenance P-59→P-70, 9 pairs PR-17→PR-25). Valid per record
against the live schemas. No ID collisions with `/data`, no dangling seriesRefs.

**The research:** `drops/phase-education/parts/` — 14 files. Read the PARTS.
`research.md` in the parent directory is a STALE assembly covering about half the
scope; do not feed it to anything.

## Decided this session — do not re-litigate

- No `education` domain value yet. Records filed provisionally; the bad-fit flag
  is the output. Count: **56 of 89** at the original drop (series 37/48,
  provenance 8/12, pairs 5/9, ledger 6/20) — see `records/DOMAIN-FIT.md`.
- **No fifth `reasonKind` value.** "Discontinued" describes the history of the
  publication where the other four describe the status of the quantity — that is
  the `directionOfBias` two-axes defect and a fifth value would build it a second
  home. `not-published` stands.
- `reversed` amended: **a disclosure practice is not a measure.** L-0094 rescored
  `reversed` → `contested`.
- `graduate-unemployment` stays `employment`; L-0063 untouched; no parallel
  record on graduate outcomes or skilling.
- L-0105 stays `governance` + `human-development`. `demography` not opened, and
  unused across the whole drop.

## OPEN — carried, not decided

1. **Trigger A on L-0096.** No `assessment` value fits a measure that ran to
   completion and whose outcome was never published. Authored `contested` with a
   loud `assessmentNote`. Question: does the enum need such a value?
2. **Trigger D on L-0105.** Does it open `demography`? If so, `P-04` arguably
   should have opened it first and the two go together. Not opened here.
3. **Trigger B — 29 points held pending**, none guessed.
4. **The domain-fit count is stale.** It predates the teacher re-author and the
   L-0096 change, and does not cover `teacher-vacancy-rate-elementary`.
5. **Self-check (stage 4) has never been run on this drop.**

## Known defects in the drop, recorded not fixed

- The FY2013-14/FY2014-15 doubling of "other departments" education spend is
  unresolved. **The all-departments spending series must not be used for
  UPA-versus-Modi comparison until it is.** Encoded as a caveat, not laundered.
- `edu-spend-gdp-wdi` deliberately not authored — its calendar assignment rests
  on P-14, whose own bridgeNote requires a verification never performed.
- Two schema gaps raised for the operator to apply at source, not worked around:
  `status` cannot express Actual / Revised Estimate / Budget Estimate, and
  `points[]` admits one value per period where FY2023-24 (MUSK) and every
  post-rebasing ratio have two.

## To resume

Run stage 4 (self-check) and stage 5 (reconcile) against `records/`, then
re-count domain fit, then decide the two open triggers. Merge is stage 6 and
needs the operator's call on the `education` domain value first.

---

# STAGE 4 RUN — 2026-08-02

Run in the main loop, not as a subagent. `/data` read, not touched. **No record
edited.** Full output: `records/SELF-CHECK.md`. Triggers worked up separately in
`records/TRIGGERS.md`.

**Mechanical half clean.** 90/90 valid against the live schemas; 0 duplicate IDs;
0 collisions against 299 live records; 0 dangling cross-references in either
direction; all 20 scored records carry both cases; all 12 `whatChanged` above the
floor (shortest 612 chars); charset 0 errors / 2 warnings (`précis` ×2 in L-0092);
no duplicate or out-of-order points; no calendar mismatches.

**Nine arithmetic findings, four material.** Reported, not fixed:

1. **L-0102 + P-65** — "the Ministry of Education is 39 per cent of what the 4.12
   per cent headline calls education" is wrong by a factor of four. 39% is MoE
   against the **Centre's** broad total (0.40/1.02 % of GDP); the 4.12% headline is
   Centre + States, against which it is under 10%. The record contradicts itself two
   sentences later ("States carry about three-quarters of the money"). Inherited
   verbatim from `parts/08-RECONCILED.md:211` and `parts/11-spending-literacy.md:126`.
2. **`ugc-provision-gross`** — the FY2024-25 point (3,678.47) is the CFI component,
   not gross, in a series titled "gross". The series' own break note names this exact
   trap. Plotted, the three points read as a 42% fall, which the caveat exists to
   prevent.
3. **UDISE+ 2025-26 graded two ways** — four points `verified` (`school-enrolment-total`,
   `private-unaided-share`, `govt-schools-count`, `private-schools-count`) against
   three `pending` with "Relayed at T3; UDISE+ 2025-26 not retrieved". P-70 says the
   edition was never retrieved. **L-0109's headline arithmetic terminates on two of
   the four.**
4. **`teacher-vacancy-rate-elementary` → P-64 is one-way** — the new series refs P-64
   from `provenanceRefs` and all three breaks; P-64's `affectsSeries` was never
   updated. The re-author's residue.
5. `teacher-vacancy-rate-ssa` caveat still says "between the two points"; there are
   now three. Arithmetic right, pointer stale.
6. L-0095 summary runs KVS 13.2 (Aug 2024) → 17.1 (Dec 2025) where the series plots
   14.7 → 17.1, both year-end.
7. P-59 names three instruments and calls them four.
8. PR-17 `notes` drops the vintages — the 54% is NAS 2017, the 49.5% is ASER 2018.
9. L-0091 merges the 707-day never-fully-open stretch with the 25-month window in one
   sentence; 476/707 = 67%, 476/775 = 61%.

Plus one traceability gap (L-0102's "0.64 to 0.40" has no series behind it), nine
breaks anchored to periods with no point (**handed to stage 7** — a mark on a
non-existent row is the absence-bug shape), and an internal contradiction in
`DOMAIN-FIT.md` (governance heading says 6 bad, its own rows and summary say 8; the
37 and the 56 are right).

**Stage 4 raised no stop trigger.**

## Domain fit re-counted

Every premise re-derived from the JSON. The re-author added exactly one series,
`teacher-vacancy-rate-elementary` (`governance`) — the same quantity at elementary
level as the three vacancy-rate series `DOMAIN-FIT.md` already grades **good**, so it
is a good fit. No other fit moved.

**56 of 90 — 62%** (series 37/49, ledger 6/20, pairs 5/9, provenance 8/12). Was
56 of 89. The bad-fit count did not move; only the denominator did.

Also verified rather than assumed: **`demography` is carried by 0 records in live
`/data` and 0 in the drop.**

## The two triggers — recommended, not applied

- **A on L-0096: no new `assessment` value.** `contested` fits on its written
  definition once you see that both cases argue the documented *act* and neither needs
  the unpublished completion rate; the outcome's absence is already carried by four
  `unmeasured[]` entries under rule 4a. A value meaning "cannot conclude" is the same
  two-axes defect that killed the fifth `reasonKind` this session. Fix the
  `assessmentNote`, not the enum. **L-0092 carries the same complaint for a different
  reason** — log both as evidence for a later audit of whether a *required*
  `assessment` is the right shape. Not this phase.
- **D on L-0105: do not open `demography`.** Literacy is not population structure, so
  it does not fix the bad half — and first use defines the value, so opening it here
  would set its boundary at "census output". The P-04 premise does not hold: P-04's
  `affectsDomains` is already `["all"]`, so opening `demography` there would narrow it.
  Decisive: **this is downstream of the education question** — if `education` is
  created, L-0105's second value becomes `education` and the bad fit resolves without
  `demography` being touched.

## To resume

Stage 5 (reconcile) has still not run. Before merge: apply whichever of the nine
findings the operator accepts, then stage 5, then stage 6 — which still needs his call on
the `education` domain value.

---

# `education` CREATED + DROP RE-GRADED — 2026-08-02 (cycle 2026-08-02d)

**SCHEMA CHANGE.** `education` added after `welfare` in all four declarations, definition in the
same commit. Byte-identity of the three that must match **verified, not assumed** (sha256
`e8685758dc889709`); provenance is base + `all`, asserted structurally. Provenance goes 15 → 16
values, the other three 14 → 15.

**All 90 records re-graded, not the 56. 85 changed value.** Filed by the QUANTITY a record measures,
not by the finding attached to it — a series carries one domain, and the institutional readings ride
on the ledger and provenance records, which carry several. Full table appended to
`records/DOMAIN-FIT.md`; the original grading left standing above it.

**Residual bad fit: 6 of 90 (7%), from 56 of 90 (62%).** Series 5/49, ledger 0/20, pairs 1/9,
provenance 0/12. The residual is one shape — five spending series plus PR-22, all fiscal quantities
correctly filed `education` while `macro` is the unavailable second domain.

Calls worth knowing without opening the file:
- **All four teacher-vacancy series → `education`.** A vacancy rate is teaching capacity. L-0094,
  L-0095 and P-64 keep `governance`, so nothing institutional is lost.
- **`aishe-publication-lag` retained in `governance`** and **`contract-teachers-share-government`
  retained in `employment`** — the only two series where an existing value beats the new one.
- **The three RTE-quota series left `welfare`** on the added no-split sentence.
- **L-0105's second value is `education`**; the bad fit resolves.
- **`human-development` and `welfare` are now carried by 0 records in this drop.**

**`demography` untouched.** Confirmed 0 in live `/data` and 0 in the drop; logged as a deferred
finding, value not removed.

**Live `/data` scanned — no back-filing debt.** Of 299 merged records, four matched a schooling
term: two false positives (L-0007 quotes "RTE 2009" in a list of UPA legislation; P-49 is crop
insurance) and L-0063 with its series `graduate-unemployment`, both excluded by standing decision.

**A gap in the stage-4 check, found and closed:** it never validated `b.absenceFrom` /
`b.absenceIndex`, the form the five coverage-usage pairs use. All five resolve, 0 dangling.

Gates: `npm run validate` VALID, 0 errors / 42 pre-existing warnings; `validate:selftest` 18/18;
drop 90/90 against the amended schemas. **`/data` untouched. Not merged.**

## To resume

Stage 5 (reconcile) still has never run. Then stage 6 (merge and gate), which is now unblocked on
the domain question. Outstanding rulings: the `ugc-provision-gross` FY2024-25 basis, and whether to
author the ABE Centre education-departments column behind L-0102's "0.64 to 0.40".

---

# RULINGS 1-2 APPLIED; STAGES 4-7 RUN — 2026-08-02 (cycle 2026-08-02e)

Drop is **91 records** (50 series, 20 ledger, 12 provenance, 9 pairs). `/data` untouched. **Not merged.**

- **Ruling 1, branch taken: point DROPPED.** The UGC gross FY2024-25 figure is not retrievable —
  `indiabudget.gov.in` does not resolve (P-70 reproducing itself). `ugc-provision-gross` keeps its
  title and carries two points; the gap is an absence, `not-published`.
- **Ruling 2: `edu-spend-gdp-centre-edu-depts` authored**, 22 points + 4 pending, carries P-10 by
  span as required. Reconciles to the published narrow total exactly in 18 of 22 years, 0.01 apart in
  four. **It exposed a new error:** L-0102's "0.40 … the lowest in the twenty-two-year table" is
  wrong — FY2001-02 is 0.37. Corrected in the record; `parts/08.md` and `08-RECONCILED.md` state it
  the same wrong way.
- **Stage-4 checker replaced** by `tools/stage4-selfcheck.mjs`, which derives coverage from the
  schemas and fails on any unenumerated reference form. It found **two more missed forms** beyond the
  reported one: `series.breaks[].provenanceRef` (67 instances) and `pairs.{a,b}.competingAccountsFrom`.
  11 forms, 367 references, 0 dangling. `SKILL.md` stage 4 rewritten.
- **Stage 5 found 6 gate-failing errors** the drop had never been exposed to, because it had only
  ever seen JSON Schema and not `integrity.mjs`. All resolved: `P-52` removed from three spending
  series (it is the PMLA dispute and belongs to none of them — pre-existing, not caused by the
  re-grade), `employment` added to P-64, P-68 back-linked to two ASER series. IDs need no
  renumbering: live maxima are L-0089 / P-58 / PR-16 and the drop starts above each.
- **Stage 6 gate passes**, merge not performed. **Stage 7 ran on the LIVE corpus only — 185/185 —
  and proves nothing about the drop**, whose 91 records render no pages. Re-run after merge.
- **Stage 8: log drafted, no PR.** The phase number is not settled.

**Residual domain fit: 7 of 91.** Six sector-fiscal series plus PR-22, one shape, recorded in
`DOMAIN-FIT.md` as standing evidence for a deferred series-cardinality question. Not to be re-filed.

## To resume

Settle the phase number, then merge, then re-run stage 7 against the merged corpus. Raised for
`/data`: `P-10.affectsSeries` should gain the four education `% of GDP` series after merge.

---

# MERGED — 2026-08-02. NOT DEPLOYED, NO PR.

**91 records merged into `/data`.** `data/series/education.json` (50), `data/ledger/education.json`
(20), appended to `data/provenance.json` (58→70) and `data/pairs.json` (16→25). Unified corpus is
**390 records**. `P-10.affectsSeries` gained the four education `% of GDP` series in the same change
(6→10).

Gate on the merged corpus: `validate` VALID 0 errors / 112 warnings; `build` 396 pages;
**`reachability` 397/397**, up from 185/185 pre-merge.

**Stage 7 verified per class, not by aggregate.** Absences 31 + 97 = 128, matching 128/128 exactly.
Caveats 33 + 66 = 99, matching 99/99 exactly. The **ten** breaks anchored to periods carrying no
point (nine were reported earlier; `ugc-provision-gross` FY2024-25 became the tenth when ruling 1
dropped that point) were checked directly against built HTML with `<script>` stripped — **10/10
render both the seam note and the period on their own record page**, as `series ends at break ·
FY2025–26 · …`. Not one drop mark is unreachable.

That check hit the Rule 1 trap twice before it was right: first a wrong page path (`<id>.html`
rather than `<id>/index.html`) reporting 0/10, then an ASCII hyphen tested against a rendered
en-dash reporting 7/10. Both were checker defects. It now carries a negative and a positive control.

## Two new report-only checks added to `tools/stage4-selfcheck.mjs`

- **Bidirectional references.** Drop **0**, live pre-merge **68**, unified **83**. Only
  series↔provenance is genuinely two-way; the other forms have no reverse field to assert.
- **Orphan provenanceRefs.** Drop **83**, live pre-merge **192**, unified **275**. Low specificity —
  see the log; it flags correct references too.

Neither gates. Nothing was auto-fixed.

## STOPPED BEFORE

- **Deploy** — held pending the `unmeasured-route` answer, as instructed.
- **Log cycle 2026-08-02f and the PR** — the phase number was sent as the literal `[NUMBER]` and has
  not been supplied. Not invented.

---

# PHASE 10 — CLOSED. Deployed, logged as cycle 2026-08-02f.

Education is **phase 10**. Merged (390-record corpus), gated, deployed, PR opened.

**The roadmap renumber was NOT performed: there is no roadmap document in this repository and git
history shows there never has been one.** No phase list, no Kashmir part 1 / part 2 entry, nothing
running to nineteen. Nothing was created to satisfy the instruction — a canonical phase list is an
artefact other work would depend on, and inventing an ordering nobody stated would manufacture false
authority. **Carried forward as open.** If the roadmap lives outside the repository it was not
renumbered here.

**§7 checked: no defect, and no such rule.** §7 of the spec is "Model routing", its text is unchanged,
and it names no phase numbers. There is no "Fable rule" anywhere — `fable` occurs once in the whole
repository, as one of four selectable model values at `docs/phase-command-spec-v2.md:168`. The three
phase-number mentions in the spec are all historical provenance (evidence base phase 9, phase 7's
eight records, "expect 10–12 to add more" — still correct) and must not be renumbered, because each
is a dated claim about when something entered.
