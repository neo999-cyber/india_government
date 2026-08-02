# STAGE 4 — SELF-CHECK, phase-education

**Run 2026-08-02, in the main loop rather than as a subagent.** Every mechanical result below is
the observed output of a check run against the drop and against live `/data`, not a restatement
of what the drop says about itself (Rule 1). `/data` was read and not touched. No record was
edited: this file reports, it does not fix.

Scope: `drops/phase-education/records/` — 90 records (49 series, 20 ledger L-0090→L-0109,
12 provenance P-59→P-70, 9 pairs PR-17→PR-25), as at the teacher re-author.

---

## 1. Mechanical — clean

| check | result |
|---|---|
| Schema validity, per record, against live `/schemas` | **90 / 90 valid** |
| IDs unique within the drop | **0 duplicates** |
| IDs against live `/data` (299 records) | **0 collisions** |
| Cross-references resolve — `seriesRefs`, `provenanceRefs`, `ledgerRefs`, `affectsSeries`, `correctiveSeries`, pair `a`/`b` | **0 dangling.** One ref out to live `/data` (`graduate-unemployment`, from L-0104) resolves |
| Series in the drop referenced by nothing | **0** |
| Every scored record carries both cases | **20 / 20.** All twenty are scored (11 `contested`, 5 `partly`, 4 `failed`); none is thin (shortest `caseFor`/`caseAgainst` is well above the 200-character floor) |
| Provenance `whatChanged` minimum length | **12 / 12 pass.** Shortest 612 characters |
| Charset sweep (CLAUDE.md rule 9) | **0 errors, 2 warnings** — `précis` twice in L-0092 (`caseFor`, `assessmentNote`). Not a proper name, so normalise or reword |
| Duplicate `(country, period)` in any `points[]` | **0** |
| Points out of chronological order | **0** |
| `calendar` against `period` format | **0 mismatches** |

---

## 2. Arithmetic against the authored points — nine findings

The check the spec singles out. Each finding below was verified against the drop's own points and,
where the number is not derivable from a point, against the research parts.

### 2.1 — MATERIAL. `L-0102` and `P-65`: the 39 per cent is wrong by a factor of four

> "The Ministry of Education is 39 per cent of what the 4.12 per cent headline calls education;
> the rest is training plus the education spending of roughly 44 other ministries."
> — L-0102 `whatHappened`, and again in P-65 `competingAccounts`

39 per cent is the Ministry of Education against the **Centre's** all-departments education
spending: ABE Table 4, FY2021-22, Centre education departments 0.40 per cent of GDP against
Centre all departments 1.02 — 0.40 / 1.02 = 39.2 per cent.

The 4.12 per cent headline is **Centre plus States**. Against it the Ministry is under 10 per cent.

The record contradicts itself two sentences later: *"States carry about three-quarters of the money
throughout."* No single Union ministry can be 39 per cent of a total three-quarters of which is
spent by the States.

Inherited verbatim from `parts/08-RECONCILED.md:211` and `parts/11-spending-literacy.md:126`, where
it is stated the same wrong way. The underlying decomposition is sound; the denominator named in the
sentence is not.

**Fix:** name the Centre as the base — "39 per cent of the Centre's own broad education spending"
— in both records.

### 2.2 — MATERIAL. `ugc-provision-gross`: the last point is not gross

Series title: *"University Grants Commission gross budget provision, actuals"*.
FY2024-25 point: **3,678.47**, own note: *"Actual, CFI component."*

`parts/10.md:146` confirms it: the FY2024-25 Actual of ₹3,678.47 crore is the Consolidated Fund
component with the MUSK sub-lines not shown that year. It is not a gross figure. No gross Actual for
FY2024-25 was published; the gross figures for that year are BE 4,500.00 and RE 5,048.59.

The series' own FY2024-25 break note states the trap and the series then falls into it:

> "Gross and net now diverge by roughly 29 per cent because of MUSK routing, so reporting gross
> where the source reports net, or the reverse, produces a spurious step change."

Read as a series the three points give 5,091.62 → 6,324.12 → 3,678.47, a 42 per cent fall — which is
the misreading the record's own caveat exists to prevent, reproduced inside the series.

**Fix:** hold FY2024-25 `pending` with the reason, or carry the gross BE with its stage in the note,
or re-scope and rename the series to the CFI component. Engages the known `status`-cannot-express-
estimate-stage gap already raised under P-66.

### 2.3 — `teacher-vacancy-rate-elementary` ↔ `P-64`: the link runs one way

The series added by the teacher re-author carries `provenanceRefs: ["P-64"]` and three `breaks[]`
each with `provenanceRef: "P-64"`. **P-64's `affectsSeries` does not list it** — it still names the
six series it named before the re-author.

Every other series in the drop is reciprocated. The consequence is directional: the series reaches
P-64, P-64 does not reach the series, so the new series is invisible from the provenance record's own
page. This is the re-author's residue — the series was created, P-64 was not updated.

**Fix:** add `teacher-vacancy-rate-elementary` to `P-64.affectsSeries`.

### 2.4 — MATERIAL. UDISE+ 2025-26 is graded two ways in the same drop

Seven series carry an FY2025-26 point. Three are held:

| series | status | note |
|---|---|---|
| `teachers-total-udise` | `pending` | "Relayed at T3; UDISE+ 2025-26 was not retrieved." |
| `ptr-primary-udise` | `pending` | "Relayed at T3; UDISE+ 2025-26 not retrieved." |
| `single-teacher-schools-udise` | `pending` | "100,843 of 1,466,682. Relayed at T3." |

Four are not:

| series | status | value |
|---|---|---|
| `school-enrolment-total-udise` | **`verified`** | 247,219,766 |
| `private-unaided-enrolment-share-udise` | **`verified`** | 40 |
| `govt-schools-count` | **`verified`** | 1,005,245 |
| `private-schools-count` | **`verified`** | 341,605 |

Same edition, same retrieval state, opposite grading, no note on the four. P-70 states plainly that
the UDISE+ 2025-26 figures are T3 *because the edition was never retrieved*.

This is material, not cosmetic. **L-0109's headline arithmetic terminates on two of the four
`verified` points:**

> "the number of government schools fell from 1,107,101 (FY2014-15) to 1,005,245 (FY2025-26), a net
> decline of 101,856 or about 9.2 per cent, while private schools rose 18.5 per cent."

The arithmetic itself is exact (101,856 checks; 9.20 per cent checks; private 288,164 → 341,605 =
18.55 per cent checks). What is wrong is that the terminal figures are relayed and are marked
`verified`, so the record's central number renders without the flag the other three series carry.

**Fix:** grade the four consistently with the three, and re-express L-0109's headline against a
verified terminal year if the FY2025-26 points go `pending`.

### 2.5 — `teacher-vacancy-rate-ssa`: the caveat is stale after the re-author

The caveat opens *"Between the two points, total sanctioned posts rose 10.4 per cent"*. The series now
has **three** points — FY2022-23 was added by the re-author from Standing Committee Report 349.

The arithmetic is right for the pair it means, FY2023-24 → FY2024-25: sanctioned 6,326,207 → 6,985,760
is +10.42 per cent, and −258,513 elementary + 918,066 secondary = +659,553 exactly. Only the pointer
is wrong.

PR-21's `notes` states the same claim correctly, by naming the rates rather than counting points:
*"the reported rate fell from 15.16 to 14.07 per cent while the absolute number of vacant posts rose
by 23,514."*

**Fix:** name the two years in the caveat.

### 2.6 — `L-0095`: the summary's start point is not the series' start point

> "In Kendriya Vidyalayas… the rate rose from 13.2 per cent (August 2024) to 17.1 (December 2025);
> in Navodaya Vidyalayas it rose from 23.6 to 29.6 per cent over twelve months"

13.2 is real — it sits in the FY2024 point's own note, as on 01.08.2024. But the series the record
refs plots **14.7 (31.12.2024) → 17.1 (31.12.2025)**. Mixing a August start with a December end makes
the KV deterioration read 3.9 points against the chart's 2.4, and it is what produces the record's
*"across seventeen and twelve months respectively"* where the two year-end readings are twelve and
twelve. NVS, which uses year-end on both sides, matches its series exactly.

The rest of the record's arithmetic is sound: 17.1 / 10 = 1.71 and 29.58 / 10 = 2.96 support "1.7
times" and "3.0 times"; 7,909 contract engagements at 15.7 per cent of sanctioned implies 50,376
sanctioned, against which 8,618 vacant gives 17.1 per cent.

**Fix:** use 14.7 → 17.1, or state both reference dates.

### 2.7 — `P-59` names three instruments and calls them four

> "NAS 2017, NAS 2021 and PARAKH Rashtriya Sarvekshan 2024 are four incompatible instruments wearing
> one name"

Three are named. The fourth — the pre-2017 NAS — is real and is evidenced elsewhere in the drop (the
`nas-parakh-grade3-language` break note cites NCERT on NAS 2017 not being comparable with earlier
versions), but it is not in this list, and the companion series caveat says *"These three points are
three different instruments wearing one name."*

**Fix:** name the fourth, or say three.

### 2.8 — `PR-17` drops the vintages from a cross-vintage comparison

> "applied to the official survey's own Grade 5 data, a Minimum Proficiency Level benchmark puts 54
> per cent below it, against the household survey's 49.5 per cent of Standard V unable to read a
> Standard II text. Five points apart, same direction, same population."

`parts/02.md:103-107` dates both: the World Bank MPL figure is **NAS 2017** Grade 5, and 49.5 per cent
is **ASER 2018** (the exact complement of the authored 2018 point, 50.5).

The pair's own `a` and `b` are 2024 series and its `framing` quotes 2024 figures (27.1 against 57), so
an undated 54 / 49.5 in `notes` reads as current. The 2024 Standard V value is 48.8, i.e. 51.2 per cent
unable — not 49.5. And the drop's own rule is that NAS 2017 may not be joined to anything later.

**Fix:** name the vintages — "NAS 2017 Grade 5" and "ASER 2018".

### 2.9 — `L-0091` merges two different windows in one sentence

> "Indian schools were never classified fully open for 707 consecutive days, from 25 March 2020 to
> 1 March 2022 — 47 days fully open in the entire 25-month window."
> …"India spent 173 days fully closed and 476 days — 61 per cent of the window — in UNESCO's single
> undifferentiated 'partially open' bucket."

Two windows, one sentence. `parts/03.md:106,108` keeps them apart: the 707 days is the never-fully-open
stretch and is *"23 months and 5 days"*; the 25-month window is 173 fully closed + 476 partially open +
79 academic break + 47 fully open = 775 days, and 476 / 775 = 61 per cent.

A reader dividing 476 by 707 gets 67 per cent and concludes the record is wrong. It is not — it is
compressed. The same compression sits in `school-closure-weeks-covid`'s caveat.

**Fix:** name the two windows separately.

---

## 3. One traceability gap, not an arithmetic error

**`L-0102`: "The Centre's own education-department spending fell from 0.64 to 0.40 per cent of GDP
across the same window, the lowest in the twenty-two-year table."**

Correct — it is ABE Table 4's Centre education-departments column (`parts/08.md:94`), and 0.40 is
that column's minimum. But that column is **not authored as a series**, and the record refs
`edu-union-moe-gdp`, which for the same two years reads **0.635 → 0.341**: a different construction
with a similar name, differing at the second decimal.

A reader following the citation gets a different number from the one in the sentence. CLAUDE.md rule 6
— tier tags travel with claims, any rendered number traceable to source — argues for either authoring
the column or naming its source inline.

---

## 4. Handed to stage 7, not a stage 4 defect

**Nine breaks are anchored to periods that carry no point:**

- `aser-std3-reading-private` (2012, 2016), `aser-out-of-school-15-16` (2012, 2016),
  `aser-girls-11-14-not-enrolled` (2016) — regime breaks falling in survey-gap years
- `ger-primary-udise`, `ger-higher-secondary-udise`, `dropout-secondary-udise` (FY2025-26) — end-seams
- `ugc-provision-gross` (FY2017-18) — a start-seam five years before the series' first point

All nine are legitimate under CLAUDE.md rule 5, which puts an end-seam below the last row and a
start-seam above the first. But **a mark anchored to a row that does not exist is exactly the class
that renders nowhere while validating perfectly** — the shape of the absence-suppression bug. Stage 7
must confirm each of the nine appears on its own record's page, reading built HTML with `<script>`
blocks stripped.

---

## 5. Observations, no action implied

- **54 of 94 absences carry no `wouldFill`.** Optional in the schema; its description says it
  "doubles as a verification-queue seed", so the queue it seeds is a little over half-populated.
- **Six absence `why` fields are under 160 characters** — `nas-parakh-grade3-language` and
  `-maths` (159, the withheld test items), `school-closure-weeks-covid` (142), L-0090 (85, the NIPUN
  annual report), L-0091 (123), L-0106 (131). The 160 floor binds only *disputed* absences and none
  of these is one, so no rule is breached.
- **Three FY2025-26 points are `pending` and carry a value.** Within the written definition
  (`pending` = "placeholder, must not render without a flag"), and it is how a per-point tier
  downgrade is expressed on a series whose `tier` is a single record-level field. Noted because the
  drop uses `pending` in two senses — no value yet, and provisional value — and only the second
  renders a number.

---

## 6. `DOMAIN-FIT.md` contradicts itself

The `governance` series section is headed *"15 series, of which **6 are bad fits**"*. Its own rows list
**8** bad (`govt-schools-count`, `private-schools-count`, `teachers-total-udise`, `ptr-primary-udise`,
`ptr-elementary-dise`, `single-teacher-schools-udise`, `single-teacher-schools-share-dise`,
`ugc-provision-gross`), and the section's own summary line says 8: *"29 filed human-development plus
8 of the 15 filed governance."* 15 − 8 = 7, which matches the named list of 7 good fits.

**The heading's 6 is the error. The 37 series total, and therefore the 56 total, are right.**

---

## 7. Domain-fit recount

The 56/89 count was taken before the teacher re-author. Recounted here against the records as they
now stand. Every premise in `DOMAIN-FIT.md` was re-derived from the JSON rather than taken from the
file:

- Series by domain: `human-development` 29, `governance` **16**, `welfare` 3, `employment` 1 = **49**
- Ledger domain tags: `governance` 17, `human-development` 9, `federalism` 7, `welfare` 3, `macro` 1,
  `employment` 1
- Live `/data` for comparison: 7 `human-development` series, 7 `human-development` ledger records,
  13 `governance` series
- **`demography`: carried by 0 records in live `/data` and 0 in the drop.** Confirmed, not assumed

**What the re-author changed:** exactly one series, `teacher-vacancy-rate-elementary`, filed
`governance`. It is the same quantity at elementary level as `teacher-vacancy-rate-ssa`, `-kvs` and
`-nvs`, all three of which `DOMAIN-FIT.md` grades **good** ("vacancy against a statutory ceiling …
measures of the state's own conduct"). It is a **good fit**. L-0094, L-0095, L-0096 and L-0108 kept
their domain values through the re-author; no other fit moved.

| Layer | Records | Filed where the fit is bad | Share |
|---|---|---|---|
| Series | **49** | 37 | 76% |
| Ledger | 20 | 6 | 30% |
| Pairs | 9 | 5 | 56% |
| Provenance | 12 | 8 | 67% |
| **Total** | **90** | **56** | **62%** |

**56 of 90 — 62 per cent.** The bad-fit count did not move; only the denominator did. The case for an
`education` value is unchanged in substance and one series stronger in the good half.

---

## 8. What stage 4 does not cover

Nothing here reads a rendered page, so nothing here says whether a caveat, absence or note reaches a
reader — that is stage 7. Nothing here grades an argument pair; no check does, and that remains the
drop's largest unguarded exposure.

**Stage 4 raised no stop trigger.** All nine arithmetic findings are corrections to authored text, not
judgements the run is unable to make.
