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
