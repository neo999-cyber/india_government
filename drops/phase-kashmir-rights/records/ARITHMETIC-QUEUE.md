# Stage 4 — arithmetic hand-check queue

**Run as its own stage.** It found six errors in phase 11 that no gate caught, and **four of the six
originated in `parts/`** — so a fix applied only to a record re-enters on the next run. Correct the
research, not only the record.

Every item below is a figure a stage-3 record would rest on. Each must be recomputed **from the
retrieved source**, not from the part's restatement of it.

---

## 1. Fifth Schedule entry counts — `04-article370-reorganisation.md`

Claimed: Table-1 **106** Central Acts (15 extended whole + 91 by deleting a J&K exclusion clause);
Table-2 **7**; Table-3 **153 + 11 Governor's Acts = 164** repealed; Table-4 **166** retained; and
**"total State-law entries 337"**.

**CHECK — the stated total does not obviously follow.**
- 15 + 91 = 106 ✔ internally consistent.
- 153 + 11 = 164 ✔.
- 164 + 166 = **330**, not 337. 330 + 7 (Table-2) = 337.
- **So "total State-law entries 337" only holds if Table-2's 7 entries are State laws.** If Table-2
  holds Central laws (its position between two Central-law tables suggests it might), the correct
  total is **330** and 337 is wrong by exactly Table-2.

**Recount all four tables from the Gazette PDF and state what Table-2 actually contains.** Do not
accept the total; recompute it. This is precisely the phase-11 shape — a plausible sum that nobody
re-added.

## 2. ✅ RESOLVED — the commissions' entry numbers. **The predicted error was real, and it was mine.**

Claimed by the Article 370 child and **propagated by the main loop to the rights-institutions child**:
Human Rights Table-3 entry 117, Accountability entry 1, Vigilance **Table-3 entry 164**, Women
entry 23; PSA retained at Table-4 entry 123.

This queue flagged entry 164 before the check ran, on the ground that a misread of *"164 entries"* as
*"entry 164"* is exactly the error the stage exists to catch. **That is what it was.**

**Resolved against two primaries (Gazette + India Code) by the rights-institutions child:**
- **Table-3 has no entry 164 at all. 164 is Table-3's TOTAL** — 153 State Acts + 11 Governor's Acts.
- **The Vigilance Commission is TABLE-4 entry 164 — RETAINED, not repealed.**

**Consequence, and it improves the finding rather than damaging it.** The spine is not "four
accountability bodies repealed". It is a **distinction the schedule draws**: the bodies that received
**the citizen's complaint against the state** were repealed, while the bodies that **look inward at
staff and at the citizen** were retained — Vigilance retained at Table-4/164, the Public Safety Act
retained at Table-4/123. One instrument, one day, sorting institutions by which direction they face.
That is a sharper and better-evidenced claim than the one I propagated.

**Stage 3 must confirm which four bodies are the repealed set** before writing "four" — the fourth is
most likely the State Information Commission (one of the seven winding-up orders), not Vigilance.
Count them from the Schedule, do not inherit the number.

**Standing cross-checks that held:** `07b` reports the Panchayati Raj Act 1989 at **Table-4 entry 97**;
`02-detention-psa.md` reports the PSA in Table 4. Both consistent with the corrected reading.

## 2b. Table-1 entry 86 — the sources disagree, and the older reading won

**Gazette says "Protection of Human Rights Act, 1994"; India Code says 1993.** Phase 11's part 12
recorded **1994** and was **right**. An intermediate draft of the phase-12 file "corrected" it to 1993
and then reversed itself against the Gazette.

**Method rule, for stage 3 and beyond: where the Gazette and India Code disagree, quote the Gazette.**
India Code is a consolidation; the Gazette is the instrument. **No amendment is owed to L-0121**,
which cites the 1994 form.

## 3. XIV Finance Commission J&K release arithmetic — `07b-RECOVERED-sfc-funds-devolution.md`

Claimed, from a Lok Sabha reply of 09 Dec 2025 via PIB:

| Year | Allocation | Release |
|---|---|---|
| 2015-16 | 373.96 | 367.72 |
| 2016-17 | 585.73 | 474.41 |
| 2017-18 | 675.15 | 470.97 |
| 2018-19 | 779.40 | 544.83 |
| 2019-20 | 1049.49 | 0.00 |
| Total | 3463.73 | 1857.93 |

Derived: unreleased **1,605.80**; release rate **53.64%**.

**CHECK.** The child says it verified both column sums against the printed totals. Re-add both columns
independently. Then verify 3463.73 − 1857.93 = 1605.80, and 1857.93 ÷ 3463.73 = 0.53640… → 53.64%.
**This is the phase's largest block of authored arithmetic and it originates in `parts/`.**

## 4. Devolution Index rank — `07b`

Claimed: J&K at 27.85 ranks **23rd of 31**, between Punjab (29.34) and Jharkhand (27.73). The child
flags this as **its own computation, not a published rank.**

**CHECK.** Recompute the ordering from the published table. If it cannot be reproduced exactly, the
record must state the score and the national average and **drop the rank** — a computed rank presented
as a finding is an unsourced number. The percentages (13.29/37.04 = 35.9%; 11.88/29.18 = 40.7%;
23.07/54.29 = 42.5%; 27.85/43.89 = 63.5%) also need re-division.

## 5. ⚠ THE J&K DETENU TOTAL — `02-detention-psa.md`. **HIGHEST PRIORITY: this is an inference presented as a total.**

Claimed: on 31 December 2019, **J&K 404** (own out-of-State cell = 0); **Uttar Pradesh 188**
out-of-State detenus; **Haryana 27** out-of-State. Concluded: *"J&K's real detenu count was ~619,
not 404."*

**404 + 188 + 27 = 619 ✔ — the addition is right and the inference is not established.**

- **Haryana's 27 is corroborated**: MHA told the Rajya Sabha that 27 J&K prisoners were held in
  Haryana, and NCRB's figure matches to the unit. Two instruments agreeing independently. Sound.
- **Uttar Pradesh's 188 is NOT.** PSI's column is *"belongs to other State"* — it does **not** say
  which State. **Nothing retrieved establishes that all 188, or any specific number of them, are from
  J&K.** The strong circumstantial case (UP held **zero** out-of-State detenus at end-2018 and 188 at
  end-2019, spanning August 2019) is genuinely strong — but it is an inference from a step change, not
  an attribution in the source.

**Stage 3 must not author 619 as a count.** Either author 404 as the J&K-row figure with the UP and
Haryana cells recorded beside it and the attribution question stated as open, or author the
corroborated 404 + 27 = **431** and carry UP's 188 as a separate, explicitly-unattributed observation.
**A figure whose basis cannot be established from the sources retrieved is trigger B**, and 619 is
that figure. Escalate rather than round.

### ✅ RESOLVED — 619 is dead, and what replaces it is better

Settled from **ten full official PSI volumes** (2011, 2013–2021), retrieved, in
`02b-psi-archive-retrieval.md`. The decisive text is **Table 2.12B "Domicile of Detenues"**:

> As on 31 Dec 2021 — **Haryana held 41 detenus of whom ZERO were Haryana-domiciled**; **Uttar Pradesh
> held 222 of whom 110 belonged to another State/UT. The table does not name which other State.**

**So the attribution never existed in the source, in any year.** 619 must not be authored. The
suspicion this queue raised is confirmed on the primary rather than on reasoning.

**What replaces it is a structural finding, not a number** — and it inverts the obvious reading of the
series:

- PSI's unit of account is the **holding** State, stated exactly once in PSI's own words: detenus are
  attributed to the State *"where they are incarcerated"*.
- **Transfers of detenus are not counted at all.** Convicts have a transfer table (7.1, 1,713 in 2021)
  and undertrials have one (7.3, 10,641). **Detenu Table 7.5 has four release columns and no transfer
  column.** The one category the state moves out of territory is the one category whose movement no
  table records.
- Therefore **J&K's recorded detenu stock FALLING from 404 (2019) to 228 (2020) — across the largest
  PSA wave — is partly an artefact of transfer**, because a transferred detenu leaves the J&K row and
  enters the UP or Haryana row. A J&K-row-only reading systematically undercounts, **and PSI offers no
  mechanism to recover them.**

**This is the same shape as phase-11 absence B1** (Army/CAPF custody has no cell) but not identical,
and the difference must be stated: there **is** a cell here, the person is counted, and only the
attribution to origin is missing. The national total is complete; transferred detenus are **misfiled,
not lost**. Classify `not-published` — the holder produces the domicile table and simply does not
cross it with origin.

**Stage 3 must carry this on the series itself**, not only in prose: a reader shown 404 → 228 without
it will read a fall in detention where part of the fall is a change of address.

## 6a. ⚠ SUPERSEDES §6 BELOW — the series is longer again, and the peak moved

From `02b-psi-live-host.md` (591 lines, written 13:16), which reached **ncrb.gov.in live** rather than
via the archive and retrieved **PSI-2022, 352 pages, 25.7 MB**.

**J&K detenus, full retrieved series:**
2009 = **182** · 2010 = **409** · 2011 = **239** · *(2012, 2013 not retrieved — PDFs truncate
mid-transfer)* · 2014 = **35** · 2015 = **90** · 2016 = **432** · 2017 = **212** · 2018 = **283** ·
2019 = **404** · 2020 = **228** · 2021 = **252** · **2022 = 546**

**The peak is 2022, not 2016 and not 2019.** Anything written on the earlier four-point series
(283/404/228/252) is wrong about shape, direction and peak. **546 in 2022 is the highest value in the
series and it is three years AFTER the reorganisation** — a record framing 2019 as the high-water mark
is contradicted by the instrument's own latest volume.

**Three structural facts that must render with it:**
- **PSI-2023 and PSI-2024 do not exist** — established positively, not merely unretrieved: both year
  pages return HTTP 200 with "no record found". **PSI-2022 is the latest volume published.** The
  series ends because the instrument stopped, which is the phase-9/10/11 pattern again.
- **A second undocumented break:** the table is **3.3 in Chapter 3** pre-2016 and **2.1 in Chapter 2**
  from 2016. That is a break in the instrument distinct from the 31 October 2019 referent break.
- **Ladakh has real prisons (26/20/30 inmates 2020–22) and ZERO detenus in every year.** So the
  31 October 2019 referent change **has no arithmetic effect on this series** — the break is real and
  must be declared, but it moves no number. **Declare it and say the effect is nil**; do not silently
  omit it because the value did not move, and do not imply a discontinuity in the figures.

## 6b. The 188, resolved as far as the source permits — and it stays unattributed

`02b-psi-live-host.md` strengthens the circumstantial case and **confirms the source never closes it**:

- **Table 2.12B "Domicile of Detenues"** columns are *Belongs to State / other State / other Country*.
  **The column never names the sending state.** PSI cannot attribute an out-of-state detenu to J&K.
- 2019: **Haryana held exactly 27, all out-of-state** — matching MHA's relayed "27 in Haryana" to the
  unit. UP's out-of-state series runs 5, 8, 4, 4, 3, 0 — **then 188 in 2019.**
- 2022: Haryana **235 detenus of whom 226 out-of-state**; UP **172 of whom 86** — together **312 of
  India's 398**.

**The step change is stark and it is still not an attribution.** Author the J&K row; carry UP and
Haryana as explicitly unattributed; **do not sum them into a J&K total.** The honest finding is the
one already recorded: a J&K-row reading systematically undercounts, transferred detenus are misfiled
rather than lost, and **Table 7.5 (Detenues Released) has no transfer column at all** while convicts
(7.1) and undertrials (7.3) do.

**Front matter states no attribution rule in words.** The holding-state basis rests on the Methodology
(data furnished by State/UT Prison Headquarters, captured at prison level) plus the 2.12B headers.
**That silence is itself the finding** and should be said, not smoothed over with a confident sentence
about what PSI "counts".

## 6. J&K detenu series — `02-detention-psa.md` — SUPERSEDED BY §6a, retained for the audit trail

The series is longer than first reported. From ten retrieved volumes:
**2011 = 239 · 2013 = 72 · 2014 = 35 · 2015 = 90 · 2016 = 432 · 2017 = 212 · 2018 = 283 ·
2019 = 404 · 2020 = 228 · 2021 = 252**, all-laws (not PSA-specific). 2012 could not be retrieved —
the volume's own contents page is archived and lists Table-3.3, but the file 404s at every capture.
**A gap year inside a series is a break in coverage and must render as one, not be interpolated.**

Note **2016 = 432**, higher than 2019's 404 — the 2016 unrest year exceeds the 2019 reorganisation
year on this measure. Any record leaning on 2019 as a peak is wrong on the instrument's own numbers.

The child reports every all-India total cross-checks exactly against the native trend series in
PSI 2021 Chart 2.12 — **re-verify that claim on at least three years**, since it is the check that
licenses the whole series.

Claimed new T1 series: **283 / 404 / 228 / 252** for 2018–2021, all-laws (not PSA-specific).

**CHECK** each value against the PSI volume and table it came from, and confirm the 2018 and 2019
values are on the **State** basis and the 2020 and 2021 on the **UT-excluding-Ladakh** basis. The
child established the volume-wide break lands in **PSI 2020**, so the series must break between 2019
and 2020 — **and note the referent and the reporting lag disagree**: PSI 2019's reference date of
31 December 2019 is 61 days *after* J&K ceased to be a State, yet that volume still reports a State of
Jammu & Kashmir. The break in the *instrument* is 14 months later than the break in the *referent*,
and the series must carry that rather than smoothing it.

## 7. Election direction versus completion — `05-elections-delimitation.md` (pending)

Court direction **by 30 September 2024**; final phase polled **1 October**; counting **8 October**;
ECI's stated completion **10 October 2024**. **No arithmetic to check — but no rounding either.**
Both readings render; the record must not resolve a 1-to-10-day gap in either side's favour.

## 8. Seat arithmetic — `05-elections-delimitation.md` (pending)

87 → less Ladakh's 4 → 83 → plus 7 → **90**, plus **24** notionally reserved for PoK and never filled.
**CHECK every step against the Act and the Commission's final order**, and establish whether ECI
computes turnout over **90 or 114**. A turnout denominator of 114 including 24 permanently empty seats
would be a different object from one over 90.

## 9. Population-per-seat by division — `05-elections-delimitation.md` (pending)

To be computed by the child from 2011 Census figures and the final allocation, with arithmetic shown.
**Recompute independently.** This figure decides whether the delimitation dispute fails criterion (c)
and is therefore a *weighting* dispute rather than a different-facts one — so an arithmetic slip here
propagates into a `differentFacts` flag, not just into a number.
