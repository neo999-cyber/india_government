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
