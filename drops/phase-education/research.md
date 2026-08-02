# Phase research — School and higher education as subjects in their own right

**Stage:** 2 (Research). **Date:** 2026-08-01. **Instrument:** India Roadmap.
**Terms:** baseline = pre-2014-05 (UPA) · T1 = 2014-05→2019-05 · T2 = 2019-05→2024-06 · T3 = 2024-06→.

**Out of scope by instruction (refs only, owned elsewhere):** PMKVY/Skill India placement, the CAG December 2025 skilling audit, graduate/youth unemployment rates, ILO India Employment Report 2024, vocational skilling.

**Prior art in `/data`:** no education series, no education ledger record. `L-0063` (educated youth unemployment) and `L-0060` (female LFPR) touch education only as a covariate. Provenance runs to `P-58`; ledger to `L-0077`. **This domain is virgin.** The domain enum has no `education` value — see §12 on filing.

---

## 0. Tiering note — read before using any tier suggestion below

The task brief and the live `series.schema.json` / `provenance.schema.json` tier enums **do not say the same thing**. The brief's ladder is "primary → institutional → quality press". The schema's ladder is by *kind of body*:

- **T1** = official Indian statistical or institutional source, retrieved directly
- **T2** = multilateral or international statistical source, retrieved directly
- **T3** = peer-reviewed research or working paper
- **T4** = journalism, **NGO datasets**, and anything relayed rather than retrieved
- **T5** = contested composite index

Every tier in this report is stated **against the live schema**, not against the brief. That produces one uncomfortable result that the author stage must decide deliberately rather than by accident:

> **ASER is an NGO dataset.** By the letter of the schema it is **T4**, the same grade as a newspaper report — even though it is a directly-retrieved, 20-year, fixed-instrument, 650,000-child household survey with published tools, published microdata-on-request, and external process audits, and even though it is the *only* consistent learning-outcome time series India has. Meanwhile PARAKH Rashtriya Sarvekshan 2024 is **T1** by the letter, despite publishing no methodology section at all (§2.4).

I have tiered ASER **T4** throughout, as the schema requires, and flagged every instance. **This is a first-class finding in its own right and is listed under ABSENCES/BREAKS as `tier-ladder-misgrades-aser`.** It is not a data problem; it is an instrument problem, and it is the sort of thing the schema's own tier description ("grade what you hold, not what it is about") was written to prevent in the opposite direction.

**Retrieval-environment failures encountered (recorded because they bear on tier, not as excuses):**

| Host | Result | Consequence |
|---|---|---|
| `nas.gov.in` | `ECONNREFUSED 164.100.252.80:443` | NAS 2021 national/state/district report cards **not retrievable from outside India**. NAS 2021 headline figures below are therefore **T4 (relayed)**, not T1. |
| `udiseplus.gov.in`, `dashboard.udiseplus.gov.in` | connection timeout | UDISE+ report PDFs not directly retrievable; UDISE+ figures reach this report via the Economic Survey appendix (T1) or via press (T4). |
| `ncert.nic.in` | `getaddrinfo ENOTFOUND` | NAS technical manuals not retrievable. |
| `education.gov.in/sites/upload_files/mhrd/files/**` | **HTTP 404 on every path** | See §8.5 — this is a substantive finding, not a transport failure. |
| `web.archive.org` | HTTP 429 after sustained use | Some archived retrievals incomplete; noted inline. |
| WebSearch | budget exhausted mid-phase (200/200) | Late-phase gaps filled by direct-URL retrieval only. |

---

## 1. LEARNING OUTCOMES — the ASER trajectory

### 1.1 What ASER is, precisely

Rural household survey. Every rural district. Two-stage sample: 30 villages per district by PPS from the Census village directory, 20 households per village. **All** children aged 3–16 resident in the sampled household are surveyed; **all** aged 5–16 are assessed **one-on-one, orally**, at home — including children enrolled in private school, in unrecognised school, in madrasa, absent from school that day, and never enrolled. Each child is marked at the **highest level reached comfortably**. The reading ladder tops out at "reads a Std II level text"; the arithmetic ladder tops out at "3-digit ÷ 1-digit division", a Std III/IV skill. It is a **floor test**, not a grade-level test.

> Source: ASER 2018 full report, "ASER and NAS: different metrics with a common goal", pp. 314–320 — https://img.asercentre.org/docs/ASER%202018/Release%20Material/aserreport2018.pdf (published Jan 2019). **Tier T4** (NGO dataset, retrieved directly — see §0).
> Source: ASER 2024 National findings, pp. 46–49 — https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-National-findings.pdf (published Jan 2025). **T4.**

**Denominator, stated exactly.** Every ASER learning percentage below has as its denominator *"all children currently enrolled in the named standard, in the rural sample, government and private schools combined, who were assessed"* — **not** all children of that age, and **not** government-school children only. Where a figure is government-school-only or private-only it is labelled. This matters: the government-school-only series and the all-children series move differently, and the government/private enrolment mix shifted violently in 2022 (§9), which by itself moves the all-children series without any child learning anything.

### 1.2 The structure of the series — three breaks before you read a single number

1. **2005–2014 annual; no survey 2015; alternate-year from 2016.** From 2016 ASER alternates a "Basic" round (rural, all districts, ages 5–16) with a "Beyond Basics" round (ages 14–18, ~28 districts, one per state). **Basic rounds: 2005–2014, 2016, 2018, 2022, 2024. Beyond Basics rounds: 2017, 2023.** A 2017 or 2023 ASER figure is not on the same series as a 2018 or 2024 one.
2. **Sampling-frame break at 2016.** "Census 2001 frame was used for ASER surveys 2005-14 and Census 2011 frame was used for ASER 2016 onwards." (ASER 2018, p. 317 fn. 22.) The village universe changed between 2014 and 2016.
3. **ASER 2020 and 2021 were telephone surveys ("ASER Wave 1", Sept 2020), not field surveys.** Any 2020/2021 ASER number is from a different instrument on a different frame. There was **no nationwide field ASER between 2018 and 2022 — a four-year gap straddling exactly the period the pandemic did its damage.**

**The frame break is compounding.** ASER 2024 still samples villages "using Census 2011 frame" (ASER 2024 all-India deck, slide 2 — https://asercentre.org/wp-content/uploads/2022/12/ASER-2024-All-India-ppt-Jan-27-11am.pdf, **T4**). India has held no census since 2011 (`P-04`). The 2024 rural sample is drawn from a 13-year-old village universe. This is `P-04` reaching into learning measurement, and it will worsen every round until a census lands.

### 1.3 TWO DENOMINATORS, AND THE ERROR THEY CAUSE

**This is the single most important thing to get right in §1, and I got it wrong on my first pass.** ASER publishes each learning percentage on **two different bases**, differing by roughly 0.1 point, and they are printed in adjacent tables:

- **"Govt & Pvt"** — ASER's own footnoted definition: *"the weighted average for children in government and private schools only."* **Excludes** children in "Other" schools (madrasa, EGS — 0.5–1.2% of the sample). **This is the column ASER's own analysts and PIB quote.**
- **"All children"** — every child enrolled in that standard in the sampled rural households, *including* "Other". This is each report's Table 4 (reading) / Table 7 (arithmetic).

On my first pass I read the 2018/2022 reports' "All children" prose figures (27.2, 50.4, 28.1, 27.8) against the 2024 report's "Govt & Pvt" chart figures (27.3, 50.5, 28.2, 27.9), found a systematic 0.1-point gap, and wrote it up as evidence of a silent back-revision across ASER vintages. **That was wrong.** It is a denominator difference, not a revision, and it is documented in ASER's own footnotes. **The finding is withdrawn.** What survives is a much smaller real one — see §1.7.

> **Rule for the author stage: pick ONE base, state it in the series `denominator` field, and never mix.** Recommendation: use **"Govt & Pvt"**, because it is the base ASER itself headlines, the base PIB quotes, and the base on which every published commentary is written — so a series built on it can be checked against the public record. Record the "All children" values in `notes`.

### 1.4 The numbers — all-India rural, **Govt & Pvt** basis

| Quantity | 2010 | 2012 | 2014 | 2016 | 2018 | 2022 | 2024 |
|---|---|---|---|---|---|---|---|
| **Std III reading ≥ Std II text** | **19.6** | **21.5** | **23.6** | **25.2** | **27.3** | **20.5** | **27.1** |
| **Std III ≥ subtraction** | **36.3** | **26.4** | **25.4** | **27.7** | **28.2** | **25.9** | **33.7** |
| **Std V reading ≥ Std II text** | **53.7** | **46.9** | **48.0** | **47.9** | **50.5** | **42.8** | **48.8** |
| **Std V ≥ division** | **36.2** | **24.9** | **26.1** | **26.0** | **27.9** | **25.6** | **30.7** |
| Std VIII reading ≥ Std II text | 83.5 | 76.5 | 74.7 | 73.1 | 73.0 | 69.6 | 71.1 |
| Std VIII ≥ division | 68.4 | 48.1 | 44.2 | 43.3 | 44.1 | 44.7 | 45.8 |

Corresponding **"All children"** values, for the `notes` field: Std III reading 20.0 / 21.4 / 23.6 / 25.1 / 27.2 / 20.5 / 27.0; Std III subtraction 36.4 / 26.3 / 25.4 / 27.6 / 28.1 / 25.9 / 33.7; Std V reading 53.4 / 46.8 / 48.1 / 47.8 / 50.3 / 42.8 / 48.7; Std V division 35.9 / 24.8 / 26.1 / 25.9 / 27.8 / 25.6 / 30.7.

**Sector splits** (the series the government is accountable for):

| Government schools only | 2010 | 2012 | 2014 | 2016 | 2018 | 2022 | 2024 |
|---|---|---|---|---|---|---|---|
| Std III reading ≥ Std II text | 16.8 | 16.7 | 17.2 | 19.3 | 20.9 | 16.3 | **23.4** |
| Std III ≥ subtraction | 33.2 | 19.8 | 17.2 | 20.3 | 20.9 | 20.2 | **27.6** |
| Std V reading ≥ Std II text | 50.7 | 41.7 | 42.2 | 41.7 | 44.2 | 38.5 | **44.8** |
| Std V ≥ division | 33.9 | 20.3 | 20.7 | 21.1 | 22.7 | 21.6 | **26.5** |

| Private schools only | 2010 | 2014 | 2018 | 2022 | 2024 |
|---|---|---|---|---|---|
| Std III reading ≥ Std II text | 29.7 | 37.8 | 40.6 | 33.1 | **35.5** |
| Std V reading ≥ Std II text | 64.2 | 62.6 | 65.1 | 56.8 | **59.3** |
| Std III ≥ subtraction | 47.8 | 43.4 | 43.5 | 43.1 | **47.5** |
| Std V ≥ division | 44.2 | 39.3 | 39.8 | 38.7 | **41.8** |

Longer tail for Std V reading (Govt & Pvt where published, else govt/all): 2006 **53.1** (all children), 2008 govt 53.1, 2011 **48.3**, 2013 **47.0**.

Sources: ASER 2010, 2012, 2014, 2016, 2018, 2022 and 2024 full reports, Tables 4–9 and the trend tables in each — all retrieved directly from `img.asercentre.org` / `asercentre.org`. **T4** per §0.

### 1.5 Coverage — and two states missing from the national number

| Round | Districts analysed | Villages | Households | Children 3–16 |
|---|---|---|---|---|
| 2010 | **522 of 583** | — | — | — |
| 2012 | 567 of 585 | — | — | — |
| 2014 | 577 of 585 | 16,497 | 341,070 | 569,229 |
| 2016 | 589 of 619 | 17,473 | 350,232 | 562,305 |
| 2018 | 596 of 619 | — | 354,944 | 546,527 |
| 2022 | 616 of 627 | 19,060 | 374,554 | 699,597 |
| 2024 | 605 of 618 | 17,997 | 352,028 | 649,491 |

- **2010 is the weakest anchor in the series** — 522 of 583 districts, 89.5%, the lowest coverage of any round. Every "back to 2010 levels" claim inherits this.
- **ASER 2022 was not conducted in Goa. ASER 2024 was not conducted in Goa or Manipur.** Manipur has been in ethnic conflict since May 2023. **A state in active internal conflict is simply absent from India's headline national learning statistic, and the report does not say why.** First-class finding.
- Dadra & Nagar Haveli and Daman & Diu, and Puducherry, are excluded from published estimates in 2022 and 2024 for insufficient sample.
- **Ladakh and J&K are reported combined** "for comparability with ASER estimates of previous years" — the 2019 reorganisation is papered over rather than shown. A defensible choice, but it means the series cannot show what happened in either unit separately.

### 1.6 The long view — the collapse is UPA-era, it is in ARITHMETIC, and it happened in one two-year step

**UPA-II, ASER 2010 → 2014 (Govt & Pvt):**

| Indicator | 2010 | 2014 | Change |
|---|---|---|---|
| Std III reading | 19.6 | 23.6 | **+4.0** |
| Std V reading | 53.7 | 48.0 | **−5.7** |
| **Std III subtraction** | **36.3** | **25.4** | **−10.9** |
| **Std V division** | **36.2** | **26.1** | **−10.1** |

**NDA T1, ASER 2014 → 2018:**

| Indicator | 2014 | 2018 | Change |
|---|---|---|---|
| Std III reading | 23.6 | 27.3 | **+3.7** |
| Std V reading | 48.0 | 50.5 | **+2.5** |
| Std III subtraction | 25.4 | 28.2 | **+2.8** |
| Std V division | 26.1 | 27.9 | **+1.8** |

**The answer to the question as posed — "was the pre-COVID trend already flat or declining under both?" — is no, and the asymmetry is large:**

1. **UPA-II saw the single largest deterioration in the entire twenty-year ASER series, and it was in arithmetic**: Std III subtraction 36.3 → 25.4 and Std V division 36.2 → 26.1, each losing roughly **30% of its base**. Almost all of it is one two-year step, **2010→2012** (36.3 → 26.4; 36.2 → 24.9). ASER 2012's own national findings state it in the negative: children in Std V unable to do subtraction rose *"from 29.1% in 2010 to 39% in 2011 to 46.5% in 2012"*; unable to divide, *"from 63.8% in 2010 to 72.4% in 2011 to 75.2% in 2012."*
2. **Reading fell at Std V under UPA-II (53.7 → 48.0) but rose at Std III (19.6 → 23.6).**
3. **NDA T1 was uniformly positive but small** — +1.8 to +3.7 points over four years, i.e. **+0.5 to +0.9 points a year.** ASER 2018's own language is flat: Std III subtraction *"has not changed much"*; Std V division *"has inched up slightly."*
4. **2018 had not recovered the 2010 arithmetic level.** Std III subtraction 28.2 vs 36.3 — still **8.1 points below** after eight years. Std V division 27.9 vs 36.2 — **8.3 below**. Std V reading 50.5 vs 53.7 — **3.2 below**. ASER 2018 says it plainly: *"the small improvements over the last four to six years have not been enough to bring the arithmetic ability levels to what they were ten years ago."*
5. **The bottom tail lengthened and never fully recovered.** Std III government-school children who cannot recognise even letters: **6.5% (2010) → 14.8% (2012) → 19.2% (2014) → 17.1% (2016) → 15.7% (2018).** Wadhwa: *"By 2014, this number had more than tripled… we are still far from where we started in 2010."*

> **Neither era can claim this series. The UPA owns a collapse; T1 owns a decade of not undoing it.**

**THREE CAVEATS THAT MUST TRAVEL WITH THAT PARAGRAPH:**

- **(a) No-detention.** The fall coincides with RTE's no-detention provision taking effect (RTE Act 2009, in force 1 April 2010), which pushed weaker children up through grades instead of holding them back. One side reads the fall as a real collapse in teaching; the other as a compositional artefact of automatic promotion. **Different weightings of identical numbers.** ASER's own people make the correlation: Wadhwa, *"the fact that learning levels fell after the RTE came into effect in 2010 is well documented now"*; Chavan, *"Passage and implementation of the Right to Education Act in the 2009-10 period has to be correlated with the decline."*
- **(b) Part of the collapse is an artefact of ASER's own procedures tightening.** Joshi (2024, T3, §2.9b) shows against an external benchmark that **pre-2011 ASER estimates are systematically biased upwards, with the bias disappearing after robust survey procedures were introduced in 2011.** The decline is concentrated exactly at 2010–2012, is uniform across the distribution, and is permanent — the signature of a measurement-regime change as much as of a real fall. Joshi's conclusion is that the real decline was *smaller than previously thought*, **not zero**.
  > **Operative consequence: a ledger record attributing a learning collapse to the UPA on ASER evidence would be overclaiming. The trustworthy ASER series runs from 2011-12 onward** — which is, fortunately, the span this instrument most needs. Pre-2011 points belong in the series only with a widened band and this record attached.
- **(c) The government denied the decline while it was happening.** Chavan, ASER 2018: *"In 2012, the then Planning Commission acknowledged for the first time that there was a problem with learning outcomes, although the Ministry of Human Resource Development had been maintaining that learning levels had not gone down."* **A UPA-era data-denial finding, sourced to Pratham's own president.** It is the baseline-era counterpart to the T3-era PIB deletions in §3.6 — and the instrument should carry both, or neither.

### 1.7 A reporting-frame change across the 2014 boundary, and genuine small back-revisions

**(a) The headline indicator changed between ASER 2014 and ASER 2016 — in the harder direction.** ASER 2014's own trend tables headlined **Std II reading letters, Std III reading words**, and **Std III recognising numbers 10–99, Std IV subtraction, Std V division**. From ASER 2016 the headline became **Std III at Std-II-text** and **Std III at subtraction**. ASER 2012 had headlined Std III against **Std I level text**. The underlying progressive tool never changed, so back-figures are recoverable and ASER duly published the Std III series back to 2010 — **but the indicator ASER put in front of the public shifted, at a higher rung, across the UPA→NDA boundary.** Log it as a reporting-frame change, not a tool change.

**(b) Silent 0.1-point back-revisions do exist — but they are far narrower than my first pass claimed.** Comparing the *same* basis across report years:

| Indicator, year 2016 | As published in ASER 2016 | As published in ASER 2018/2022/2024 |
|---|---|---|
| Std V reading, govt / pvt / g&p | 41.6 / 62.9 / 47.8 | 41.7 / 63.0 / 47.9 |
| Std III subtraction, govt / pvt | 20.2 / 44.0 | 20.3 / 44.1 |
| Std V division, pvt | 37.9 | 38.0 |
| Std VIII reading, pvt | 80.9 | 81.0 |

Also Std V reading 2014 g&p: 48.1 (ASER 2014) → 48.0 (all later reports). Undocumented, 0.1 point, immaterial to trend, material to reproducibility. **Author stage: take every point from one report vintage — recommend ASER 2024 — and note the earlier values.**

**(c) The ASER 2024 report is still marked "Provisional" and has been silently replaced.** PIB's February 2025 factsheet cites `ASER_2024_Final-Report_25_1_24.pdf`, which now returns **HTTP 404**; ASER currently posts `..._13_2_24.pdf`. State-level Std V figures differ between the version PIB quoted and the version now posted (PIB: Mizoram 64.9%, HP 64.8%; current: Mizoram 65.9%, Punjab 66%, HP 70.1%). The withdrawn version could not be retrieved, so **the revision is inferred; the discrepancy is verified.**

### 1.8 Enrolment and out-of-school (ASER frame)

**Age 6–14, % by school type** (ASER All-India Table 1):

| Year | Govt | Pvt | Other | Not in school |
|---|---|---|---|---|
| 2010 | 71.1 | 24.3 | 1.1 | 3.5 |
| 2012 | 67.0 | 28.3 | 1.2 | 3.5 |
| 2014 | 64.9 | 30.8 | 1.0 | 3.3 |
| 2016 | 65.4 | 30.5 | 1.0 | 3.1 |
| 2018 | 65.6 | 30.9 | 0.7 | 2.8 |
| **2022** | **72.9** | **25.1** | 0.5 | **1.6** |
| **2024** | **66.8** | **30.6** | 0.7 | 1.9 |

**The government-school swing — +7.3 points in, then −6.1 points back out — is the single most consequential compositional fact in the whole domain.** It is used in §3.

Out-of-school, age 15–16, all-India: 16.2% (2010) → 13.1% (2018) → 7.5% (2022) → **7.9% (2024)** — it ticked *up*. Girls 15–16 not enrolled 7.9% (2022) → **8.1% (2024)**, still above 10% in Madhya Pradesh (16.1%), Uttar Pradesh (15%), Rajasthan (12.7%), Mizoram (12.2%), Gujarat (10.5%), Chhattisgarh (10%).
Girls 11–14 not enrolled: **10.3% (2006) → 4.1% (2018) → 2.0% (2022)**. **This is the series' unambiguous success and it should be recorded as one.**

**Pre-primary, ages 3–5** — % enrolled in any pre-school institution (anganwadi, government pre-primary, or private LKG/UKG):

| Age | 2018 | 2022 | 2024 |
|---|---|---|---|
| 3 | 68.1 | 75.8 | **77.4** |
| 4 | 76.0 | 82.0 | **83.4** |
| 5 | 58.5 | 62.2 | **71.4** |

Anganwadi specifically: age 3 **57.1 → 66.8 → 66.8**; age 4 **50.5 → 61.2 → 57.7**; age 5 **27.6 → 35.3 → 37.0**. Age 5 in a *government school* (Std I+): 23.9 → 24.6 → **14.1** — a large shift of five-year-olds out of formal school into pre-primary provision.
**Definitional break, stated by ASER itself: "The data collection format was modified in 2018 to include more categories of pre-school institutions." Pre-2018 pre-school figures are not comparable.**

**A confounder hiding here, and it is unquantified by anyone.** The share of "underage" children (age ≤5) in Std I fell **25.6% (2018) → 22.7% (2022) → 16.7% (2024)**, its lowest ever. **ASER tests by grade, not by age.** A 9-point reduction in underage Std I entry mechanically raises the average age — and therefore the expected ability — of Std III cohorts two years later. **Nobody has adjusted for it. It could be a material share of the Std III gain.** Filed as an absence (`not-collected`).

### 1.9 School-observation series (one government primary school per sampled village; 15,728 schools in 2024)

Usable girls' toilets **66.4 (2018) → 68.4 (2022) → 72.0 (2024)**; drinking water **74.8 → 76.1 → 77.7**; library books in use on day of visit **36.9 → 43.9 → 51.3**; electricity connection **75.0 (2018) → 95.9 (2024)**; playground **66.5 → 68.9 → 66.2** (no improvement). Student attendance **72.4 → 73.0 → 75.9**; teacher attendance **85.1 → 86.8 → 87.5** — ASER notes both are *"largely driven by changes in teacher and student attendance in Uttar Pradesh"*, the same state carrying the largest reading gain.

**Government primary schools with fewer than 60 children enrolled: 44.0% (2022) → 52.1% (2024)** — a sharp rise, and the most under-discussed number in the 2024 round. **Two-thirds of Std I and Std II classrooms are multigrade.** Both bear directly on §5 (single-teacher schools) and §9 (mergers).

---

## 2. THE ASER-versus-NAS MEASUREMENT DISPUTE

This is the domain's central measurement question. It produces enough for a standalone provenance record — arguably for two. It also turns out to be **less one-sided than the popular version**, and the report below deliberately dismantles the popular version before rebuilding the case.

### 2.1 There is no "NAS series". There are four incompatible instruments wearing one name.

| Round | Date | Grades | Frame | Administered by | Metric | Comparable to predecessor? |
|---|---|---|---|---|---|---|
| NAS cycles 1–4 | 2001 – 2015-16 | III, V, VIII | school, sampled districts | state agencies (SCERTs, SIEs); data collection by DIET students | % correct; **CTT→IRT switch at Cycle 3** | breaks at Cycle 3 |
| **NAS 2017** | 13 Nov 2017 | III, V, VIII | school; **government + government-aided only** at elementary; 701 districts | **state education departments**; FIs from DIET trainees | mean % of items correct | **No** — NCERT: "not comparable with earlier versions due to changes in sampling, test design, and content" |
| **NAS 2021** | 12 Nov 2021 | III, V, VIII, **X** | school; govt + aided **+ private unaided**; 720 districts; 1,18,274 schools; 34,01,158 students; 5,26,824 teachers | **CBSE** — "To maintain impartiality, actual administration of the test in the sampled schools was conducted by CBSE" | **scaled score /500** *and* mean % correct | **No** |
| **PARAKH Rashtriya Sarvekshan 2024** | 4 Dec 2024 | **III, VI, IX** | school; state govt + aided + private recognised + central govt; 781 districts; 74,229 schools; 21,15,022 students | **CBSE as Test Administrator**, external observers from CBSE-affiliated schools | mean % of items correct **+ proficiency bands** | **Grade 3 only, by PARAKH's own statement — and PARAKH compares it anyway** |

Sources: NAS 2017 non-comparability from NCERT "Post NAS Interventions" p. 3, quoted in ASER 2018 p. 320 (**T4**, NCERT original unreachable). NAS 2021 from PIB, 25 May 2022, https://www.pib.gov.in/PressReleasePage.aspx?PRID=1828301 (**T1**, retrieved) and Education for All in India (**T4**). PARAKH 2024 from the National Report p. 2, https://parakh.ncert.gov.in/sites/default/files/2025-07/REPORT_India_IND.pdf (**T1**, retrieved) and the Operational Guidelines-cum-Training Manual, https://parakh.ncert.gov.in/themes/parakh/prs-files/OPERATIONAL_GUIDELINES2024.pdf (**T1**, retrieved).

**Consequence, and it is the load-bearing one:** *India's official learning-outcome instrument has been reset three times in seven years, each time in a way its own custodians say breaks comparison, and each reset lands on a fresh "baseline".* **There is no official national learning trend line.** ASER — the T4 NGO dataset — is the only continuous one.

**And the comparability caveat is applied asymmetrically.** PARAKH's stated position is that only Grade 3 survives across 2017/2021/2024, because comparing Grade 5→6 and Grade 8→9 "could indicate loss in learning levels when there is none". PARAKH's own release then compares Grade 3 to NAS 2021 and announces an **18-point jump in language proficiency and a 23-point jump in mathematics proficiency**. **The caveat is deployed exactly where the trend would look bad and set aside exactly where it looks good.** *(The "only Grade 3 comparable / spurious conclusions" wording is carried consistently by several independent secondaries attributing it to PARAKH/NCERT; it is **not** in the National Report or the FAQ as retrieved. **T4 pending recovery of the underlying PARAKH note — flagged as a verification target.**)*

### 2.2 What each instrument measures — side by side, on retrieved documents

| | **ASER** | **NAS 2017 / 2021 / PRS 2024** |
|---|---|---|
| Frame | **Household**, **rural only** | **School**, rural + urban |
| Sampling | 30 villages/district by PPS from the Census directory; 20 households/village by the **"right-hand rule"** (no household listing) | schools by PPS from UDISE/DISE lists; up to 30 students per sampled section, systematic from the **school attendance register** |
| Who is in it | every child 5–16 resident in the household: enrolled, unenrolled, absent, private, unrecognised, madrasa | children **enrolled in a sampled school and present on the test day**; NAS 2017 also excluded private unaided entirely |
| Who is missing | **urban children** — no regular urban ASER | out-of-school children (**1.9% of 6–14; 7.9% of 15–16**, ASER 2024); **children absent on the day** |
| **Absentee handling** | not applicable — tested at home | **absentees are replaced by present children** — see §2.3, verified in PARAKH's own manual |
| What is tested | a **floor**: reading tops out at a Std II text, arithmetic at 3-digit ÷ 1-digit | **grade-level** curricular outcomes (2017, RTE-2017 learning outcomes) / **NEP 2020 stage competencies** (2024) |
| Format | **oral, one-on-one**, 19 languages, marked at highest level reached comfortably | **paper OMR, four-option MCQ**, 90 min (Gr 3, 6) / 120 min (Gr 9); NAS 2017 Std III/V had questions and options read aloud but not the passage |
| Reported quantity | **headcount ratio** — share of children clearing a fixed threshold | **mean item-success rate** — "the average percentage of correctly answered questions" (PARAKH National Report, verbatim) — plus, in 2024, a proficiency headcount |
| Standard errors | divisional level; precision study published (Ramaswami & Wadhwa 2010) | **NAS Cycle 3 published them; NAS 2017 and PRS 2024 do not.** PARAKH's National Report is point estimates to the whole percentage point with no uncertainty anywhere. **A regression in reporting practice.** |
| Tools public | **yes** — items and procedures in the public domain | **no** — "NAS does not make public the test questions it uses" (Johnson & Parrado). PARAKH publishes *sample* items only |
| Microdata | available to researchers on request (ASER's stated policy; **not independently verified in this phase**) | **not released, any round.** PARAKH FAQ: "NAS does not provide individual school or student scores" |
| Psychometrics | test–retest r = 0.95 reading / 0.90 maths; decision-consistency κ = 0.76/0.71; inter-rater κ = 0.64/0.65 (weighted 0.82/0.79, n=590); criterion validity vs an EGRA/DIBELS-derived Fluency Battery **r = 0.90–0.94** *(via ASER Centre's 2014 note citing Vagh 2012 — **cited, not retrieved**)* | **none retrievable.** See §2.4 |
| Recheck | multi-layer field + desk recheck; **54.6% of villages rechecked in ASER 2018**; external process audits | no published recheck data; irregularities recorded on Control Sheets returned to CBSE but **never tallied publicly** |
| Publication lag | fields Sept–Nov, publishes **January of the same school year** | **PRS 2024: fielded 4 Dec 2024, released July 2025 (~7 months). NAS Cycle 3: ~16 months.** |

### 2.3 The absentee replacement rule — verified in the government's own manual

This was the weakest link when it rested on ASER's characterisation of an NCERT document. It no longer does. **PARAKH's own Operational Guidelines-cum-Training Manual (T1, retrieved)** instruct the Field Investigator to list the sampled section from the school attendance register, compute a sampling interval, take a random start, and then:

> "**Step-6: If by chance you get again to a student already selected or the absent student in this process, then select the immediate next student** and continue your counting following the same process until you get 30 students."
> "**Note - If selected students are absent then move to the next student.**"

**The absent child is not a missing observation. The absent child is replaced.** The realised sample is a probability sample of *students present on 4 December 2024*, not of *students enrolled*. There is **no absentee count field, no non-response flag and no non-response weight** — so the absentee rate is **destroyed at the point of collection** and is unrecoverable even in principle from the returned instruments. The published national score is conditioned on attendance and the conditioning is nowhere documented in the report.

**The magnitude of what is being conditioned away, measured independently:** ASER's school-visit module puts average student attendance in government primary schools at **72.4% (2018) → 73.0% (2022) → 75.9% (2024)**. Denominator: children on the rolls of the sampled school on the day of visit. **So roughly a quarter of enrolled children are absent on a typical day.**

**Counter-evidence, and it is honest counter-evidence.** Johnson & Parrado tested this channel directly using IHDS self-reported absence and found it **small**: "students with higher rates of absence tend to have lower learning outcomes. **The effect of these absences on overall scores is very small though.** In only a few cases does taking absence into account shift relative ranking of the state." Their caveat is the one that matters: this tests *voluntary* absence only — "**Teachers may have selectively encouraged certain students to stay at home on NAS exam day**", which is untestable from published data.

**Net: the absenteeism channel is real, is now documented in the government's own words, but is probably worth a few points, not the gap.** The gap is explained elsewhere — §2.6.

### 2.4 PARAKH 2024 publishes no methodology and no psychometrics — verified two ways

**(a) The National Report contains no methodology section.** I extracted the full text of the 2.4 MB National Report and searched it. These strings occur **zero times**: `sampling` · `Sampling` · `methodology` · `Methodology` · `Field Investigator` · `observer` · `Observer` · `multiple choice` · `MCQ` · `December 2024` · `NAS` · `National Achievement Survey` · `2021`. The string `comparab*` occurs **once**, describing OBC and SC students performing "comparably" with each other.

So the National Report of India's flagship national learning assessment **does not state when the survey was conducted, does not describe its sampling design, does not state who administered or invigilated it, does not state the item format, does not mention its own predecessor instrument at all, and does not mention the year 2021.** It does disclose, in the acknowledgements, that execution ran through "the State Project Directors (SPDs), Directors of SCERTs, and the Principals of State Institutes of Education (SIEs)" with CBSE facilitating — i.e. through the state education departments the survey grades.

**Mitigating, and it matters:** the methodology *is* published — just not in the report. The **Operational Guidelines-cum-Training Manual** (retrieved, T1) documents the sampling procedure, the observer architecture, the FI eligibility ladder, the seal-and-custody chain and the test durations in detail. The failure is that **the report a policymaker or journalist will actually read carries none of it, and does not point to it.**

**(b) There is no psychometric technical report.** The file PARAKH publishes as `PRS_2024_Technical_Report.pdf` is **274 MB, 1,008 pages, rasterised images** (produced by an Acrobat image-conversion plug-in); `pdftotext` recovers 224 lines, all front matter. Its actual title is *"Understanding Stage Specific Learnings: Competencies, Context and Collective Voices"* — **it is not a technical report in the psychometric sense at all.** There is **no retrievable IRT model description, no reliability coefficient, no standard error, no scaling documentation** anywhere in the PARAKH corpus. URL: https://parakh.ncert.gov.in/themes/parakh/prs-files/PRS_2024_Technical_Report.pdf. **T1, retrieved and confirmed.**

**(c) PARAKH's two official sample counts do not agree.** The report says **74,229 schools / 21,15,022 students / 781 districts**. PARAKH's own landing page says **75,565 schools / "over 2,294,377 students" / 782 districts**. That is ~1,336 schools and **~179,000 students — about 8% of the intended sample — unreconciled between two PARAKH sources.** The natural reading is sampled-versus-realised, but PARAKH nowhere says so. Sources: https://parakh.ncert.gov.in/prs against the National Report. Both **T1**.

**(d) A hand-transcription step at Grade 3.** The Operational Guidelines: for Grade 3 the FI must "**Transfer students' responses from test booklet and PQ to OMR sheet**". Every Grade 3 datum passes through a Field Investigator's hand between the child and the scanner, with no documented double-entry or re-key verification. Grade 3 is the grade PARAKH says is the only one comparable over time.

### 2.5 The numbers

**Denominators, stated once and applying throughout.** NAS/PARAKH percentages are **mean proportions of test items answered correctly, averaged over students present on test day**. ASER percentages are **headcount ratios: the share of children enrolled in that standard, in sampled rural households, who clear a fixed threshold**. *These are not the same kind of quantity and must never be differenced.*

| Cycle | Grade | Language | Mathematics | EVS/TWAU | Science | Soc.Sci | Overall |
|---|---|---|---|---|---|---|---|
| **NAS 2017** | 3 | 68% | 64% | — | — | — | — |
| **NAS 2021** | 3 | 62% | 57% | — | — | — | 59% |
| | 5 | 52% | 44% | — | — | — | 49% |
| | 8 | 53% | 36% | — | 39% | — | 41.9% |
| | 10 | — | 32% | — | 35% | — | 37.8% |
| **PARAKH 2024** | 3 | **64%** | **60%** | — | — | — | — |
| | 6 | **~57%** | **~46–50%** (unresolved) | **~49%** | — | — | — |
| | 9 | **~54%** | **~37%** | — | **~40%** | **~40%** | — |

PARAKH 2024 figures are **T1-derived**: the national headline sits inside rasterised infographics, but every disaggregation is machine-readable and brackets it tightly (Grade 3 Language: boys 63/girls 65, rural 64/urban 63, state-govt 64/aided 63/private 64/central 60, SC 64/ST 61/OBC 63/Others 66 → 64%). **Grade 6 Mathematics is genuinely unresolved between ~46–47% (read from the report's own disaggregations) and 50% (press).** NAS 2017 and NAS 2021 rows are **T4** — `ncert.nic.in` and `nas.gov.in` do not resolve from this environment, so no NAS report was retrieved first-hand in this phase.

**PARAKH's second metric — proficiency bands, Grade 3:** Language 39% (NAS 2021) → **57%** (2024); Mathematics 42% → **65%**. **T4** (careers360, 8 Jul 2025). Two things to flag. First, this is the more ASER-comparable statistic, because it is also a headcount ratio. Second, **it inverts**: Language has the higher mean (64) but the lower proficiency share (57); Mathematics has the lower mean (60) but the higher share (65). That can only happen if the two subjects' cut-scores sit at different points of their distributions — and **the cut-scores are published nowhere.** Without them the +18/+23-point gains are uninterpretable: they could be learning, or a moved band boundary, and no external party can tell which.

**Selected PARAKH 2024 competency results, verbatim from the report (T1)** — these are the numbers that matter, because they are the grade-level equivalents of ASER's floor:
- Grade 3 Maths **C-8.4, "arranges numbers up to 99 in ascending/descending order": 55%** — the weakest Grade 3 maths competency, and the one closest to an ASER-type foundational skill.
- Grade 3 Language C-10.5, "reads short stories and comprehends their meaning … **on their own**": **60%**.
- Grade 6 Maths, "represents and compares commonly used fractions": **29%**.
- Grade 9, "applies percentages": **28%**; "works with fractions": **29%**; "reads simple maps with symbols and directions": **46%**.

### 2.6 THE HEADLINE CONTRAST — and why most of it is a category error

Same year, same grade, same country:

> **PARAKH 2024 reports Grade 3 language at 64% and mathematics at 60%. ASER 2024 reports 27.1% of Std III children able to read a Std II text and 33.7% able to subtract.**

Even on PARAKH's *headcount* metric — 57% of Grade 3 "proficient or above" in language against ASER's 27.1% — it is roughly **2:1, with the harder test producing the better result.**

**But before treating that as proof of fraud, two corrections must be applied, and together they close most of the gap:**

**(1) Threshold NAS's own data and it agrees with ASER.** The World Bank applied a Minimum Proficiency Level benchmark to **NAS 2017 Grade 5 data** and found:
> "**In India, 54 percent of students do not achieve the Minimum Proficiency Level (MPL) at the end of primary school, proxied by data from grade 5 in 2017.**" · Learning Poverty **56%** adjusted for out-of-school children · Schooling Deprivation **5%**.
> — World Bank, *India Learning Poverty Brief*, April 2024 (Version 2), https://documents1.worldbank.org/curated/en/099090524113131044/pdf/P179209-8dbd998a-95f1-4709-9001-7c6f4b92d182.pdf. **T2, retrieved directly.**

**ASER 2018 says 49.5% of Std V cannot read a Std II text. NAS's own Grade 5 data, re-cut as a headcount, says 54% are below MPL. Five points apart, same direction, same population.** *The two instruments converge once you stop comparing a mean to a headcount.* **This is the single most under-appreciated fact in the whole dispute and the author stage should weight it heavily.**

**(2) Chance-correct the MCQ mean.** PARAKH 2024 Grade 3 items are **confirmed four-option MCQs** (verified directly from the retrieved sample-item paper, https://parakh.ncert.gov.in/themes/parakh/prs-files/Grade3.pdf — e.g. *"How many major seasons does India have? One / Two / Three / Four"*), and the Operational Guidelines instruct the FI that students "should read the passage **silently by themselves**". So a Grade 3 child who cannot read is asked to read silently and then pick one of four. **The guessing floor is 25%.** Rescaling onto the (chance, 100) interval — *this arithmetic is mine, not PARAKH's, and PARAKH publishes no chance-corrected score anywhere*:

| PARAKH 2024 | Raw | Above the guessing floor |
|---|---|---|
| Grade 3 Language | 64% | **52%** |
| Grade 3 Mathematics | 60% | **47%** |
| Grade 6 Mathematics | ~47% | **29%** |
| **Grade 9 Mathematics** | **37%** | **16%** |

**Grade 9 mathematics is sixteen points above pure random guessing.** The bleakness ASER is accused of exaggerating is *present inside the PARAKH numbers*, concealed by an uncorrected mean.

**Anyone who says "the official survey says 64% and ASER says 27%, so one of them is lying" has made an error before reaching the substance.**

### 2.7 Where the dispute is genuinely a dispute: NAS carries almost no information about relative state performance

This is the part that survives every correction above, and it is decisive.

**Johnson, D. & Parrado, A., "Assessing the assessments: Taking stock of learning outcomes data in India", *International Journal of Educational Development* 84 (July 2021), DOI 10.1016/j.ijedudev.2021.102409.** RISE working-paper version: https://riseprogramme.org/sites/default/files/inline-files/Johnson_Assessing%20the%20assessments_RISE%20version_v2.pdf · PMC: https://pmc.ncbi.nlm.nih.gov/articles/PMC8246517/ — **T3, retrieved and read in full.**

> "After restricting our sample to maximize comparability, we find that NAS state averages are significantly higher than ASER state averages and averages from an independently conducted nationally representative survey (IHDS). In addition, **state rankings based on NAS data display almost no correlation with state rankings based on ASER, IHDS, or net state domestic product per capita.** We conclude that **NAS state averages are likely artificially high and contain little information about states' relative performance.**"

| Pair (state averages, Class 3) | Pearson r |
|---|---|
| ASER ↔ IHDS (independent NCAER/Maryland survey, ASER-derived oral tool) | **+0.62** |
| **NAS ↔ ASER** | **+0.19** |
| **NAS ↔ IHDS** | **−0.03** |
| ASER reading ↔ ASER maths (benchmark: different constructs, sound instrument, same children) | **+0.82** |
| ASER ↔ net state domestic product per capita | **+0.41** |
| **NAS ↔ NSDP per capita** | **+0.05** |

**Why this is the strongest evidence in the file.** Every frame difference catalogued in §2.2 — rural-only, out-of-school exclusion, absentee replacement, floor-versus-grade-level — shifts *levels*, and shifts them roughly **in common across states**. State *rankings* are precisely where frame effects wash out. And that is exactly where NAS fails: it correlates with neither of the two independent instruments, and it is **uncorrelated with state income**, a variable that correlates with essentially every education outcome in India. The 0.82 ASER-reading-to-ASER-maths benchmark closes the escape route: even *different constructs* measured well on the same children correlate at 0.82, so 0.19 cannot be dismissed as "NAS measures something slightly different."

They also foreclose the two innocent explanations: the tested-level difference **runs the wrong way** ("NAS tests for standard 3 proficiency while ASER tests for standard 2 … **As we will see, NAS scores are actually much higher than ASER for our restricted samples**"), and voluntary absence has a "very small" effect.

**Their recommendation, verbatim:** "policymakers and analysts should be careful in how they use ASER and should **avoid use of NAS altogether**." They also warn that **NITI Aayog's School Education Quality Index (SEQI)** is "based to a large extent on NAS data, though findings suggest that NAS data should not be used for these purposes." **SEQI is therefore a contaminated composite — a T5 candidate, and it must not be used as evidence of learning anywhere in this instrument.**

**Corroborating illustration (T4).** Same state, same cohort, same period: NAS says West Bengal Class 5 maths fell from 48 to 45 between 2017 and 2021, with "solve simple problems using addition and subtraction" falling 66 → 51; ASER's Std II-2018 cohort reaching Std V by 2021-22 shows subtraction-or-more **up by over 23 percentage points**. *(Factly, 31 May 2022, https://factly.in/review-as-nas-2021-shows-a-decline-in-learning-outcomes-here-is-what-these-surveys-are-all-about/.)*

**And an internal oddity in PARAKH 2024's own data (T1):** at Grade 3, **Central Government schools (KVs/NVs) score *lowest* in mathematics (57%)** while State Government schools score *highest* (61%); by Grades 6 and 9 the ordering flips completely — Central Govt leads everything (Grade 9 Language 69%, Grade 9 Maths 48%) and State Govt is last (Grade 9 Maths 33%). A 15-point Grade 9 gap alongside a 4-point *reverse* gap at Grade 3 requires explanation. The report offers none.

### 2.8 The mechanism, demonstrated experimentally, in India

**Singh, A., "Myths of Official Measurement: Auditing and Improving Administrative Data in Developing Countries", RISE Working Paper 20/042 (22 July 2020); published as "Myths of official measurement: Limits to test-based education reforms with weak governance", *Journal of Public Economics* 239 (2024).** https://riseprogramme.org/publications/myths-official-measurement-auditing-and-improving-administrative-data-developing.html — **T3.**

1. **Madhya Pradesh (Pratibha Parv), ~6–7 million students annually since 2011.** Comparing responses **to the same questions by the same students** in the administrative test versus an independent test shows a **doubling of reported achievement**, and the distortion "affects students at all levels of achievement but is **particularly severe for low-performing students**."
2. **Andhra Pradesh randomised experiment, >2,400 schools.** "**Paper-based assessments proctored by teachers severely exaggerate achievement, in both private and government schools, but find no evidence of such distortion in tablet-based assessments**" — roughly 20% inflation.

**Singh did not test NAS.** But NAS 2017 was a paper-based, group-administered, in-school assessment — exactly the modality shown to distort — and the distortion is **worst for low performers**, which is precisely the shape needed to produce "high everywhere and uninformative about relative performance."

**The counter, and it is substantial: the modality changed.** NAS 2021 moved administration to **CBSE** explicitly "to maintain impartiality"; PRS 2024 added external observers drawn from CBSE-affiliated schools (not the sampled school), confidentiality agreements, tamper-evident OMR return bags, locked trunks with keys held by Board Representatives, separate custody of used and unused booklets, and MoE-appointed National Level Experts charged with validating instrument fairness. **This is a materially stronger chain of custody than the arrangement the academic critique was aimed at — and Johnson & Parrado themselves named "CBSE implementation involvement" as a "welcome development".**

**Whether it worked is unmeasured.** Nobody has re-run the state-correlation test on PARAKH 2024. **That test is computable today from published PARAKH state figures, published ASER 2024 state figures and NSDP, and it would settle §2.7 for the current instrument. It is the single highest-value missing analysis in this entire domain.** Filed as an absence.

### 2.9 The critique that runs the other way — ASER is not clean either

Fairness, and the same authors:

**(a) ASER district and year-on-year figures are mostly noise.** Johnson & Parrado's Kane–Staiger variance decomposition: **5–9%** of the variance in state score *levels* is transitory (ASER state levels are solid); **one third to one half** of the variance in *changes* in state scores is transitory; **over 75%** of the variance in *changes* in district scores is transitory. Their worked example: "approximately 40% of the variance in the changes is due to transitory effects … if we attempt to identify the top 25% of states in terms of reading gains, **a third of the states identified would not actually be in the top 25%**." And the noise is **non-sampling** error — from surveying, not sample size — attributed to volunteer surveyors and the **"right-hand rule"** household walk in place of a full listing. They are explicit this is not an attack: "These are not criticisms of the ASER survey – without these cost-saving measures the survey would likely be prohibitively expensive."

> **Operative rule for this instrument: ASER *levels* at national and state scale are usable. ASER *deltas* below the national level are not. Any state-level ASER change this project reports must carry that caveat.**

**(b) Pre-2011 ASER is upward-biased — which partly undermines the "learning collapsed under UPA" story in §1.4.**

**Joshi, S., "Has India's learning crisis really worsened?", University of Warwick, 2 October 2024** (working paper; acknowledges Abhijeet Singh, Andreas Stegmann, Sonia Bhalotra). https://warwick.ac.uk/fac/soc/economics/staff/sjoshi/learning_trends.pdf — **T3, retrieved and read in full.**

> "Despite near-universal enrolment and continuing progress across multiple input-based measures of learning, standardized test scores amongst Indian children show a large and permanent decline after 2010. I argue that **this puzzling decline is partly an artefact of changing measurement error in the main source of learning outcome data in the country.** Using an external benchmark, I show that **pre-2011 estimates are systematically biased upwards. Bias disappeared and data quality improved after robust survey procedures were introduced in 2011.** Even if the real decline was smaller than previously thought, concerns around declining productivity of the Indian education system remain."

The three facts he must explain are exactly the ones in §1.4: the decline is concentrated **2010–2012**, it is **large (0.3 sd maths, 0.2 sd reading) and uniform across the distribution**, and it is **persistent**.

> **This materially revises §1.4 and the author stage must carry it: the 2010→2012 "collapse" is partly an artefact of ASER's own procedures tightening in 2011.** It does not vanish — Joshi says "the real decline was smaller than previously thought", not zero — but a ledger record attributing a learning collapse to the UPA on ASER evidence would be overclaiming. **The trustworthy ASER series runs from 2011–12 onward, which is fortunately the span this instrument most needs.** Pre-2011 ASER points should carry a widened band or a documented correction.

Joshi's own reason for not touching NAS is the cleanest statement of the access problem in the literature: "the NAS data series cannot be used to study trends … **student-level data from the NAS is not in the public domain, and standardized measures of within-NAS changes in learning levels cannot be constructed using aggregate statistics presented in NAS reports** … as shown by Johnson and Parrado (2021), data quality of NAS assessments appears to [be] poor."

### 2.10 The strongest official case FOR NAS/PARAKH — in its own terms

1. **Scale.** 21.15 lakh students (2024), 34 lakh (2021) against ASER's ~650,000 assessed — **three to five times larger**, and larger than almost any national assessment anywhere.
2. **Covers urban India, which ASER simply does not.** ASER 2024 covered **605 *rural* districts**; urban districts are excluded from the annual series. Roughly a third of Indians live in towns and cities. And the gap is not trivial in PARAKH's own data: at Grade 9, urban leads rural by **7 points in Language**. An instrument that cannot see urban India cannot produce a national figure.
3. **Resolves school management types ASER cannot.** PARAKH separates State Govt / Govt Aided / Private recognised / Central Govt, and the differences are large. Johnson & Parrado had to *drop* private-aided from their ASER restriction because "we are not able to distinguish between students attending private and private aided schools in the ASER dataset." **A real ASER limitation, conceded by NAS's own critics.**
4. **Covers grades ASER cannot.** ASER applies the *same floor tool* to a 16-year-old as to a 6-year-old; above Std V it is nearly uninformative (Std VIII "division" is a Std III/IV skill). Johnson & Parrado concede: "comparisons of ASER and NAS for higher grades would not be valid." **For secondary education, NAS/PARAKH is the only national instrument that exists.**
5. **Diagnostic depth.** ASER can say a Std V child cannot read a Std II story. It cannot say *which* competency failed. PARAKH can, at item-cluster level, and does.
6. **District actionability.** 781 districts, district report cards, district workshops, district-specific roadmaps, integration into state academic planning and AWPB cycles.
7. **Institutional integrity from 2021.** CBSE as external administrator, external observers, sealed chains, confidentiality agreements, MoE-appointed validators — a direct structural answer to the conflict-of-interest charge, and the reform the critique itself asked for.
8. **Grade-level standards are the policy-relevant benchmark.** NEP 2020 requires stage-competency measurement. An instrument reporting only whether a child clears a Std II bar has told you almost nothing about that goal.

### 2.11 The strongest case FOR ASER — in its own terms

1. **Independence from the body being graded.** No budget, ranking, promotion or NIPUN Bharat target depends on ASER's number. **Nothing in NAS/PARAKH's architecture makes the measurer independent of the measured** — even the improved 2024 design has CBSE, a board under MoE, observing schools under MoE, on behalf of a ministry being evaluated.
2. **The household frame catches whom the school frame structurally cannot** — and the exclusion is not accidental but **written into the sampling protocol** (§2.3).
3. **Oral one-on-one administration is the only format that yields information about a non-reader.** Confirmed four-option MCQ + "read the passage silently by themselves" means a Grade 3 non-reader contributes a 25% guess, not a zero. ASER records "cannot recognise letters" as a real category.
4. **A genuinely continuous series.** "The assessment method has remained the same since 2006, enabling comparisons over time" (ASER 2024, verbatim). Against three official resets in seven years, this is decisive for any trajectory question — **which is exactly what this instrument is for.** *(Subject to Joshi's pre-2011 correction.)*
5. **Published, validated, transparent tool** with published psychometrics, against a counterpart whose "Technical Report" is a 274 MB image file.
6. **Independent corroboration, three ways:** IHDS agrees with ASER at r = 0.62 and with NAS at −0.03; ASER correlates with state income at 0.41 and NAS at 0.05; and **the World Bank, using NAS's own Grade 5 data, lands within five points of ASER.**
7. **Speed** — same-school-year publication against PARAKH's seven months and NAS Cycle 3's sixteen.

### 2.12 Verdict: different facts or different weightings?

**Both, in a separable proportion — roughly two-thirds different facts, one-third different weightings. But the largest single component of the "different facts" is a *reporting-metric* difference, not a difference about the world.**

**Layer 1 — a category error (largest component).** A mean item-success rate is not a headcount ratio. Threshold NAS's own data (World Bank: 54% below MPL at Grade 5) or chance-correct PARAKH's means, and the two instruments broadly agree that **about half of Indian children finish primary school unable to read at a Std II level.** Most of the headline contradiction is manufactured.

**Layer 2 — genuinely different populations.** Rural-only vs all-India; enrolled-and-present vs resident. Each is measurable and each has a documented direction:

| Difference | Pushes which higher | Measured size |
|---|---|---|
| ASER rural-only; PARAKH includes urban | **PARAKH** | +7 pts Grade 9 Language, +4 pts Grade 6 Language (PARAKH, T1) |
| PARAKH excludes out-of-school children | **PARAKH** | 1.9% of 6–14; 7.9% of 15–16 (ASER, primary) |
| PARAKH replaces absentees | **PARAKH** | ~24–28% daily absence (ASER, primary); voluntary component "very small" (J&P) |
| PARAKH cannot be matched on private/private-aided in ASER | **PARAKH** | private > govt by ~12 pts at Std III reading |
| ASER tests a floor 2–4 grades below | **ASER** | **runs the wrong way** — conceded by J&P |

**Note the last row.** The single most obvious "different facts" explanation predicts ASER should read *higher*, not lower. It doesn't. **That is why the frame differences cannot close the gap on their own.**

**Layer 3 — genuinely different facts about instrument integrity.** NAS state rankings correlate with nothing (0.19 / −0.03 / +0.05 against a 0.82 benchmark). **No frame difference explains this, because frame effects shift levels roughly in common across states and rankings are where they wash out.** The mechanism is documented experimentally in India (Singh: ~100% inflation in an audited state census, ~20% in an RCT, worst among low performers) on exactly NAS 2017's modality. **This layer stands unrebutted for 2017 and 2021 and is simply untested for 2024.**

**Layer 4 — genuinely different weightings.** What should a national learning number mean — "can this child clear the floor?" or "how much of the grade-level curriculum has this cohort absorbed?" Independence versus coverage. Precision versus trustworthiness. Which failure mode is worse: an inflated official number that lets a system congratulate itself, or a floor-only number that cannot say whether Grade 9 mathematics is being learnt. **These are values questions and both answers are defensible.**

**Operative conclusions for the instrument:**
- **On trends: build the spine on ASER, from 2011-12 onward.** It is the only continuous series, and NAS/PARAKH cannot carry a trend by its own custodians' admission.
- **On levels: carry both, and never difference them.** Note the World Bank convergence as the honest reconciliation.
- **On inter-state comparison: use ASER levels, not NAS.** Do not use SEQI at all.
- **On secondary education: there is no independent instrument.** Grade 9 mathematics at ~37% raw / ~16% above chance is the most alarming number in this domain and it comes from the instrument with the weakest independence guarantee. **Record it with a wide band and an explicit note that no second source exists.**
- **On ASER deltas below national level: caveat or omit.**

### 2.13 Absences specific to §2

| Absence | reasonKind | Note |
|---|---|---|
| Bridge/concordance between the ASER and NAS/PARAKH scales | **never-defined** | No linking study, no equating design, no anchor items. ASER Centre: "their results are not comparable." Nobody disputes it; nobody has built one. |
| Any study running **both** instruments on the **same children** | **not-collected** | IHDS is the closest (independent, ASER-derived tool) but is not ASER-vs-NAS on the same children. Singh's AP RCT is the right design, run on state tests. **A cheap, decisive experiment that has never been run.** |
| Re-run of the Johnson–Parrado state-correlation test on **PARAKH 2024** | **not-collected** | Computable today from published data. Would establish whether the CBSE reform worked. **Highest-value missing analysis in the domain.** |
| NAS/PARAKH student-level microdata, any round | **not-published** | PARAKH FAQ: "NAS does not provide individual school or student scores." Joshi: NAS microdata "not in the public domain". |
| NAS test items / question papers | **withheld** | "NAS does not make public the test questions it uses" (J&P) — an identifiable, standing refusal, not mere non-release. PARAKH publishes sample items only. |
| PARAKH 2024 psychometric documentation (IRT model, reliability, standard errors, scaling) | **not-published** | The "Technical Report" is a 274 MB image file with no extractable psychometrics. |
| PARAKH 2024 proficiency-band **cut-scores** | **not-published** | Without them the headline +18/+23-point gains are uninterpretable. The Language/Maths inversion proves the cuts sit at different distributional points. |
| Standard errors on any PARAKH 2024 figure | **not-published** | Point estimates only. **NAS Cycle 3 published standard errors; PRS 2024 does not — a regression.** |
| Test-day absentee rate and characteristics of replaced students | **not-collected**, by design | The replacement happens invisibly inside the FI's sampling sheet. No absentee field, no non-response weight. **Destroyed at the point of collection; unrecoverable in principle.** |
| Count of broken-seal / irregularity-flagged schools in PRS 2024 | **not-published** | The Guidelines require the FI to record a broken seal on the Control Sheet and **continue administering anyway**; Control Sheets are returned to CBSE. The data exists in CBSE's hands. No tally published. |
| Reconciliation of PARAKH's two official sample counts (75,565/2,294,377 vs 74,229/21,15,022) | **not-published** | ~8% of students unaccounted for between two PARAKH sources. |
| NAS 2017 exact sample size | **never-defined / contested** | Three official-derived figures circulate — 2.2m, 2.5m, 3.6m students; 110,000 vs 120,000 schools. No official reconciliation exists. |
| Any NCERT/MoE published **response** to the score-inflation critique | **not-published** | None found in the National Report, Operational Guidelines or FAQ. **The response has been structural (change the administration) rather than argumentative.** No audit demonstrating the reforms worked; no re-analysis of the ranking anomaly. |
| A regular **urban** ASER | **not-collected** | India has no independent household-based learning measurement for its urban children at all. |
| India's participation in any international large-scale assessment | **not-collected** | World Bank: India "did not participate in any ILSAs in recent years"; no GLAD harmonisation exists for India, which "limits the current analytical possibilities for this country." NAS 2021 has **not** been linked to the global scale. |

### 2.14 Open retrieval targets for §2 (do not author around these silently)

1. **NAS 2017 and NAS 2021 National Reports** from `ncert.nic.in` / `nas.gov.in` — unreachable from this environment. Needed for Class 5 percentages first-hand, the 2017 invigilation protocol, and whether the Cycle-3 unweighted-estimates problem was ever fixed.
2. **The PARAKH document carrying the "only Grade 3 comparable / spurious conclusions" language** — not in the National Report or FAQ as retrieved; it is the load-bearing official comparability statement and is currently T4.
3. **Vagh (2012) "Validating the ASER Testing Tools"** and **Ramaswami & Wadhwa (2010) "Survey Design and Precision of ASER Estimates"** — ASER's psychometrics are currently second-hand.
4. **Rajagopalan & Vaidya, "Improving Learning Outcomes in India Through Large-Scale Assessments"** (Taylor & Francis, DOI 10.4324/9781003664222-9) — HTTP 403.
5. **Karthik Muralidharan, *Accelerating India's Development* (2024)** on learning measurement — **no retrievable passage found. Do not attribute a position to him.** Likewise **no document was found in which Lant Pritchett, Yamini Aiyar or Rukmini Banerji adjudicates NAS vs ASER — do not attribute positions to them either.**
6. **Accountability Initiative's actual position, corrected:** contrary to expectation, AI's contemporaneous piece (Mridusmita Bordoloi, 13 Nov 2017, https://accountabilityindia.in/blog/nas-2017-a-much-needed-move/) is **supportive** of NAS 2017 — "a much-needed move" — praising district-representative sampling and rapid report cards, with its only reservation being dissemination. **No Accountability Initiative or NIPFP document attacking NAS reliability was located. The report should not imply one exists.**

## 3. COVID LEARNING LOSS AND RECOVERY

### 3.1 The loss and the recovery, Govt & Pvt basis

| Indicator | 2018 | 2022 | **Loss** | 2024 | **2022→2024** | **2018→2024** |
|---|---|---|---|---|---|---|
| Std III reading | 27.3 | 20.5 | **−6.8** | 27.1 | **+6.6** | **−0.2** |
| Std V reading | 50.5 | 42.8 | **−7.7** | 48.8 | **+6.0** | **−1.7** |
| Std VIII reading | 73.0 | 69.6 | −3.4 | 71.1 | +1.5 | **−1.9** |
| Std III subtraction | 28.2 | 25.9 | **−2.3** | 33.7 | **+7.8** | **+5.5** |
| Std V division | 27.9 | 25.6 | **−2.3** | 30.7 | **+5.1** | **+2.8** |
| Std VIII division | 44.1 | 44.7 | +0.6 | 45.8 | +1.1 | **+1.7** |

**THE ASYMMETRY IS CLEAN AND ADMITS NO EXCEPTION: arithmetic in 2024 exceeded the 2018 level at every grade; reading did not recover to 2018 at any grade.**

Two facts discipline the reading of that:
1. **The arithmetic loss was small to begin with (−2.3) and the reading loss was large (−6.8 to −7.7).** "Arithmetic more than recovered" is partly an artefact of a much lower bar. Wadhwa concedes it: *"a fall of less than 3 percentage points which was much lower than the 7 percentage point loss observed in reading."*
2. **Std VIII arithmetic shows no COVID dip at all** (44.1 → 44.7 → 45.8). If a general instrument drift or enumerator effect were producing the 2024 gains, Std VIII arithmetic should have moved with everything else. It barely did. **This cuts against a pure measurement-artefact explanation and in favour of a genuine early-grade-specific effect.**

**The sector split, which the national aggregate hides:**

| Std III reading | 2018 | 2022 | 2024 | 2018→2024 |
|---|---|---|---|---|
| Government | 20.9 | 16.3 | **23.4** | **+2.5 — above 2018** |
| Private | 40.6 | 33.1 | **35.5** | **−5.1 — below 2018** |

| Std V reading | 2018 | 2022 | 2024 | 2018→2024 |
|---|---|---|---|---|
| Government | 44.2 | 38.5 | **44.8** | **+0.6** |
| Private | 65.1 | 56.8 | **59.3** | **−5.8** |

**The national reading aggregate's failure to reach 2018 is driven entirely by private schools.** The government/private gap in Std III reading narrowed from **19.7 points (2018) to 12.1 points (2024)** — but partly by private schools falling, not only by government schools rising. In arithmetic **both** sectors exceeded 2018 (govt Std III subtraction 20.9 → 27.6; private 43.5 → 47.5).

### 3.2 An original decomposition: how much of the swing is composition rather than learning?

ASER's "Govt & Pvt" figure is an explicit weighted mean of two sector figures, so the implied government share among tested children is recoverable exactly as `w = (Pvt − All)/(Pvt − Govt)`. **This derivation is mine; it is arithmetic on ASER's published triples, and I have found no published version of it.**

Implied government share of children tested: Std III reading **0.675 (2018) → 0.750 (2022) → 0.694 (2024)**; Std V reading 0.699 → 0.765 → 0.724. This tracks the enrolment swing in §1.8, as it must.

Holding sector weights fixed at their 2018 values:

| Series | 2022 published → weight-fixed | 2024 published → weight-fixed | **2018→2024 published** | **2018→2024 composition-fixed** |
|---|---|---|---|---|
| Std III reading | 20.5 → **21.8** | 27.1 → **27.3** | −0.2 | **+0.0** |
| Std V reading | 42.8 → **44.0** | 48.8 → **49.2** | −1.7 | **−1.3** |
| Std III subtraction | 25.9 → **27.6** | 33.7 → **34.0** | +5.5 | **+5.8** |
| Std V division | 25.6 → **26.8** | 30.7 → **31.2** | +2.8 | **+3.3** |

**What this establishes:**
- **Roughly 1.2–1.7 points of the apparent 2018→2022 "COVID loss" was compositional, not learning** — children shifting into lower-scoring government schools mechanically depressed the 2022 aggregate. **The published loss overstates the true loss.**
- **Roughly 10–18% of the headline 2022→2024 recovery is compositional** — children shifting back out to private schools.
- **Composition cannot explain the government-school gains at all**, which are within-sector by construction. For the government Std III reading gain (16.3 → 23.4) to be compositional, departing children would need negative proficiency. Impossible.
- **The 2018-vs-2024 comparison is nearly composition-neutral** (weights 0.675 vs 0.694), which is what makes it the clean comparison. On it, reading is flat-to-down and arithmetic is up.
- It also explains why private schools look weak in 2024: **they re-absorbed the marginal returnees.**

> **Verdict: the compositional argument is the sharpest available sceptical line, it survives as a ~10–18% haircut on the headline recovery, and it fails as a debunking of the government-school gains.** Carry it as a caveat, not as a refutation. Because this derivation is not published anywhere, the author stage must mark it **derived**, not sourced.

### 3.3 The strongest case that the recovery is real and policy-driven

- **The gains are large, national, and near-universal across states** — every state recovered in Std III government-school reading; Std III arithmetic rose in every major state except Gujarat, Kerala and Jammu & Kashmir.
- **They are concentrated exactly where NIPUN Bharat operates**: Std I–III foundational literacy and numeracy. **Std VIII, which the FLN mission does not touch, is flat.** A policy aimed at the early grades produced movement in the early grades and nowhere else. That is what a working policy looks like.
- **They are concentrated in government schools**, where the policy operates.
- **Composition cannot explain the government-school gains** (§3.2) — established, not asserted.
- **The delivery chain was independently observed, not self-reported by the ministry.** ASER's own surveyors, in 15,728 government schools, found >80% had received an FLN directive, 77.6% had a teacher trained in person, 74.5% had received TLM, >95% had distributed textbooks — "a substantial increase over 2022 levels." **This is the rare case where `P-22` (MIS standing in for outcome) does not bite.**
- **Std III arithmetic at 33.7% is the highest in over a decade** and Std V division at 30.7% is above every reading in the 2012–2022 span. Not a return to trend — above it.
- **ASER Centre itself endorses the attribution.** Wadhwa, ASER 2024: *"We have not seen improvements of this magnitude in the last 20 years… **Everything seems to point towards NEP 2020 and its focus on foundational skills.** … it is the first time that there has been a systemic national push to improve foundational learning outcomes."* **The independent instrument's own director credits the government's policy. That is the strongest form this case can take, and the report should say so plainly.**

### 3.4 The strongest case that 2024 merely returned to a weak 2018 level

- **On reading it literally did.** Std III 27.1 (2024) vs 27.3 (2018); Std V 48.8 vs 50.5. **After six years, two of them with an FLN mission and a National Education Policy, rural India's children read no better than in 2018 and slightly worse.** Composition-adjusted, +0.0 and −1.3.
- **2018 was itself a weak level.** Std V reading in 2018 (50.5) was *below* 2010 (53.7). Std III arithmetic in 2018 (28.2) was 8.1 points below 2010 (36.3). **"Recovery to 2018" means recovery to a level below where the country stood at the start of the UPA's second term.**
- **Roughly three of four Std III children still cannot read a Std II text** (27.1% can) and **two of three still cannot subtract** (33.7% can).
- **There is no causal identification and nobody claims one.** NIPUN Bharat launched 5 July 2021, nationally and simultaneously — no untreated comparison group, no staggered adoption, no discontinuity. ASER has one pre-period (2018), one trough (2022), one post-period (2024). **The FLN implementation questions were asked for the first time in 2024, so there is no 2018 or 2022 comparator and they cannot support a difference-in-differences of any kind.**
- **The 2022 baseline is already partially recovered, which inflates the measured gain.** Wadhwa's own state surveys (Karnataka Feb 2021, Chhattisgarh Oct 2021, West Bengal Dec 2021) found *"learning levels had fallen by far more than the loss between 2018 and 2022. In fact, **there had been a recovery between 2021 and 2022**."* **So 2022→2024 measures the tail of a recovery already under way before NIPUN Bharat could plausibly have bitten.**
- **A large policy-independent confounder that nobody controls for: maternal education.** ASER 2024 Annexure 6, all-India, mothers by schooling — **no schooling 46.6% (2016) → 42.6% (2018) → 33.7% (2022) → 29.4% (2024)**; above Std X **9.2 → 11.0 → 16.0 → 19.5**. **Maternal illiteracy fell 13 points and mothers educated past Std X nearly doubled between 2018 and 2024.** That is a large, slow, policy-independent improvement in the home literacy environment which would raise early reading with or without NIPUN Bharat — **and it makes the flatness of reading over 2018–2024 look worse, not better.**
- **The age-composition confounder** (§1.8): underage Std I entry fell 25.6% → 16.7%, mechanically ageing Std III cohorts. ASER tests by grade. Unquantified by anyone.
- **ASER's own classroom fieldwork finds the NIPUN pedagogy largely is not happening.** Bhattacharjea, Bhutada and Bisht (ASER Centre's own Director of Research), in the *same report*: across 45 lessons in 24 Std II classrooms in 8 states, *"students were observed using any form of TLM other than textbooks and notebooks in just 6 snapshots"*; *"Small-group activities were observed in just one classroom"*; independent writing *"was not recorded in any of the snapshots"*; where TLM appeared it was *"in 'demonstration' mode — in all but one case it was the teacher using the TLM, not the students"*; officials *"check compliance with data collection protocols rather than teaching-learning in the classroom"*; and teachers reported *"the focus on collecting and documenting student-level outcomes has increased time spent on reporting at the expense of time available for teaching."* **n = 24 classrooms, convenience sample, non-representative — state that. The finding is the internal tension: the report attributing the gains to NIPUN Bharat also reports that NIPUN Bharat's pedagogy is not visible in its classrooms.**
- **ASER's FLN input series moved the wrong way year-on-year**: teachers trained in person 80.4% (2023-24) → 77.6% (2024-25); trained online 72.5% → 64.0%; **funds received for FLN activities 43.6% → 36.2%.** Inputs tapering while outputs rose.
- **Geographic concentration undercuts a national-policy story.** Std III government-school reading spans >40 points: Himachal Pradesh 49.7%, Kerala 44.4%, Odisha 37.7% at the top; **Telangana 6.8%** (from 6.3% in 2022 — flat), J&K 6.7%, Arunachal 7.2%, Rajasthan 12.1%, Assam 13.2%, Tamil Nadu 13.2%, Andhra Pradesh 14.7%, Madhya Pradesh 14.8%, Karnataka 15.4% at the bottom. Wadhwa singles out **Uttar Pradesh** (12.3% in 2018 → 16.4% in 2022 → **27.9%** in 2024). **A uniform national intervention producing radically non-uniform results is weak evidence for the intervention** — and UP is also the state driving the national attendance gain, which is a competing explanation.

**Sharpest sceptical sentence the evidence supports:** *On a composition-neutral 2018-to-2024 comparison, rural India's Std III reading went 27.3% → 27.1% and Std V reading 50.5% → 48.8%; the entire net six-year national gain is in arithmetic; maternal illiteracy fell 13 points over the same window; and no causal evaluation of NIPUN Bharat against any of it exists.*

### 3.5 Verdict for §3

**Different weightings of the same facts, plus two genuine factual gaps.** Both sides accept the ASER numbers — they are the same numbers, from the same NGO, and the government quotes them approvingly. The disagreement is over whether the benchmark is 2018, 2010 or 2008, and whether "recovery to a bad level" counts as success. That is weighting.

The two genuine gaps, both `not-collected`: **(a)** no decomposition of the gain into learning versus composition has been published (§3.2 supplies one, but it is my derivation, not a source); **(b)** no causal evaluation of NIPUN Bharat against learning outcomes exists at all, and the design that would produce one was never built into the mission.

### 3.6 SCHOOL CLOSURE DURATION — computed from the UNESCO raw panel

Retrieved directly: **UNESCO school closures database**, the raw daily country panel — 162,750 rows, 210 countries, 16 Feb 2020 to 31 Mar 2022. https://covid19.uis.unesco.org/wp-content/uploads/sites/11/2021/05/UNESCO_school_closures_database.xlsx. Recommended citation carried in the file: *"UNESCO map on school closures and UIS, March 2022."* **T2, retrieved directly, and the figures below were computed from the panel rather than read off a summary.**

**UNESCO's own definitions** (from the retrieved Methodological Note, https://covid19.uis.unesco.org/wp-content/uploads/sites/11/2021/05/Global-Monitoring-COVID19_Methodological-Note.pdf, **T2**) — these are load-bearing:
- *Closed due to COVID-19*: "Government-mandated closures of educational institutions affecting most or all of the student population."
- *Partially open*: "(a) open in certain regions and closed in others; and/or (b) open for some grades, levels, or age groups and closed for others; and/or (c) open with reduced in-person class time, combined with distance learning."
- **Duration of school closures**: "the number of weeks estimated by the number of days for which the status of schools was either **'Closed due to COVID-19' or 'Partially open'** divided by 7."

| Measure | **India** | Global mean (210) | Global median | Global max |
|---|---|---|---|---|
| Weeks **fully closed** | **25** | 19.7 | 16 | 75 (Philippines) |
| Weeks **partially open** | **68** | 20.8 | 18.5 | 77 (USA) |
| **UNESCO "duration of school closures"** (sum) | **93 weeks** | **40.6** | **37.0** | **93 — India** |

**India ranks #1 of 210 countries on UNESCO's own definition of closure duration, and is the unique global maximum.** On *full* closure alone India ranks **58th**.

India's timeline from the panel: fully closed 25 Mar – 30 Apr 2020 and 1 Jun – 14 Oct 2020 (**173 days total fully closed**); partially open 15 Oct 2020 – 30 Apr 2021, 1 Jun – 23 Dec 2021, and 10 Jan – 1 Mar 2022 (**476 days**); 79 days academic break; **47 days fully open in the entire 25-month window.**

> **The sharpest statement the data supports: from 25 March 2020 to 1 March 2022 — 707 consecutive days, 23 months and 5 days — Indian schools were never classified "fully open."**

Affected population: UNESCO records India's pre-primary-to-upper-secondary enrolment as **294,893,120 — the largest of any country in the world** (China 236,991,152; Indonesia 60,228,568; USA 58,498,076).

Comparators (fully closed / partially open / total weeks): **Indonesia 20/72/92 · Nepal 40/47/87 · Uganda 66/23/89 · Bangladesh 63/23/86 · Mexico 53/28/81 · Brazil 38/41/79 · Korea 11/68/79 · USA 0/77/77 · Philippines 75/1/76 · Sri Lanka 49/25/74 · South Africa 15/48/63 · Pakistan 37/24/61 · Viet Nam 7/39/46 · Germany 14/24/38 · Kenya 28/9/37 · China 9/21/30 · UK 16/11/27 · France 7/5/12 · Japan 3/8/11.**

**FIRST-CLASS DEFINITIONAL FINDINGS ON THIS SERIES:**

1. **"India was among the longest-closed" is TRUE on UNESCO's own definition (93 weeks, world #1) and FALSE if you mean full closure (25 weeks, rank 58).** Any claim in either direction that does not name which measure it uses is unusable. **This is where most commentary goes wrong, in both directions.**
2. **A single national daily label for India is a definitional fiction, and UNESCO's methodology admits it.** Closure in India was **state-decided and grade-differentiated**. "Partially open" covers everything from "one grade in one state shut" to "all primary grades shut across most of the country" — and India spent **476 days, 61% of the window, in that one undifferentiated bucket.** **Neither UNESCO nor the Government of India published a state-by-state or grade-by-grade closure-duration series.** `not-collected`.
3. **ASER's stronger claim is compatible with UNESCO's milder national label, and the reconciliation is grade-differentiation.** ASER 2022: *"India had one of the longest durations of school closures – primary schools were closed for almost two years."* For most of the 476 "partially open" days, senior grades had reopened while primary had not. **Grade-differentiated reopening is exactly what makes India's national number look mild and its primary-grade reality severe — and primary is where the learning loss landed.**
4. **UNESCO imputes where it does not know**: "When no information is available then assume 50% of the student population based on latest enrolment estimates is impacted." Any UNESCO India "students affected" figure resting on that branch is an assumption.
5. **No Indian government document stating a national closure duration was retrieved.** Flag as a candidate `not-published`, pending a parliamentary-reply search.
6. **The dataset stops at 31 March 2022.** UNICEF's parallel reports could not be retrieved (`data.unicef.org` returns HTTP 403 to every request). **Do not cite a UNICEF closure number.** The UNESCO panel supersedes it in any case, being the underlying data rather than a derived report.

**And the measurement consequence that matters most for this instrument: there was no nationwide field ASER between November 2018 and November 2022.** ASER 2020 and 2021 were **telephone surveys with no learning assessment at all**. **India therefore has no measurement of learning at any point during its own school closures.** The loss was measured only at its end, four years after the last pre-COVID reading. **The depth of the trough is a `not-collected` absence — nothing exists that compulsion could produce, because nobody was in the field.**

### 3.7 GOVERNMENT ATTRIBUTION — and a first-class finding about how it was presented

**(a) The Ministry of Education's first ASER 2024 factsheet does not attribute the recovery to NIPUN Bharat. It deletes the pandemic instead.**

PIB Release **PRID 2099725, 4 February 2025, Ministry of Education, "Leap in Rural School Enrollment"** — https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2099725. **T1.** It reproduces ASER's national findings near-verbatim, with systematic deletion of every 2022 trough:

| | ASER 2024 report | PIB PRID 2099725 |
|---|---|---|
| Govt enrolment 6–14 | "In 2018, 65.6% … **The pandemic saw large increases in government school enrollments (72.9% in 2022). But by 2024, the all-India figure declined to 66.8%.**" | "In 2018, 65.5% … **By 2024, the all-India figure increased to 66.8%.**" |
| Std III reading, govt | "was 20.9% in 2018. **This figure fell to 16.3% in 2022**, and has increased to 23.4% in 2024." | "was 20.9% in 2018. This figure increased to 23.4% in 2024." |
| Std III arithmetic | "was 28.2% in 2018 **and 25.9% in 2022**. This figure has increased to 33.7%…" | "was 28.2%. This figure has increased to 33.7%…" |
| 15–16 not enrolled | "dropped from 13.1% in 2018 **to 7.5% in 2022, but stayed about the same at 7.9% in 2024**" | "dropped sharply from 13.1% in 2018 to 7.9% in 2024" |

> **A 6.1-point decline in government-school enrolment from its 2022 peak is presented, under the headline "Leap in Rural School Enrollment," as an increase — by deleting the peak. Three separate 2022 data points removed from a document that otherwise reproduces ASER verbatim.**

**(b) The attribution proper arrives six months later, and it needs the trough back.** PIB backgrounder **"Classrooms of Change: NEP 2020 and the New Era of Schooling", 28 July 2025** — https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/jul/doc2025729593801.pdf, **T1**, sourced internally to the Department of School Education and Literacy's *5 Years NEP 2020 Ready Reckoner*:

> *"**The Impact of these initiatives are reflected in national learning assessments.** … As per ASER 2024, Foundational reading levels among Class III children in government schools have reached their highest since 2005: 23.4% children could read Grade II-level text in 2024, **up from 16.3% in 2022** and 20.9% in 2018. Arithmetic proficiency has also improved, with 27.6% of Class III students now able to perform basic subtraction, compared to **20.2% in 2022** and 20.9% in 2018."*

and, on PARAKH: *"rural and government school Grade 3 students showing strong performance, **validating NIPUN Bharat**."*

> **Note the inversion. In February the 2022 trough had to disappear to make enrolment look like a leap. In July the same trough is essential to make the learning recovery look large. Same ministry, opposite framings, six months apart, identical underlying data.** This is a first-class finding about presentation, and it is fully documented in T1 sources on both sides.

**(c) NCERT/PARAKH's own attribution:** *"State Government schools led foundational outcomes—validating the impact of NIPUN Bharat"* — https://parakh.ncert.gov.in/blog/parakh-rashtriya-sarvekshan-2024, **T1**. Note the claim rests on a **0-point gap in Language (64 vs 64) and a 1-point gap in Mathematics (61 vs 60)** between state-government and private schools, unadjusted for household selection.

**(d) No statement by the Education Minister personally attributing ASER 2024 to NIPUN Bharat could be retrieved. Treat personal attribution as UNVERIFIED; institutional attribution is verified.**

### 3.8 The government's own Standing Committee contradicts the government's press releases

**Rajya Sabha Department-related Parliamentary Standing Committee on Education, Women, Children, Youth and Sports, 363rd Report** (Demands for Grants 2025-26, Department of School Education & Literacy, March 2025; Chair: Digvijaya Singh) — https://sansad.in/getFile/rsnew/Committee_site/Committee_File/Press_ReleaseFile/16/198/776P_2025_3_16.pdf?source=rajyasabha. **T1, retrieved.**

- **¶4.3.6 — the flagship target will be missed:** *"NIPUN Bharat aims to have every child in the country attain foundational literacy and numeracy by the end of Grade 2, by 2026-27. **Despite the progress recorded, this is a target that we are highly unlikely to meet. Accordingly, the deadline for the NIPUN Bharat Mission must be extended from 2027 to 2032.**"*
- **¶3.4.52 — official data does not match independent data:** *"**often times, there is lack of correspondence between Government data and independent evaluations of school education.** For instance, the [ASER] 2024 report shows that only 76% of schools have implemented Vidya Pravesh, only **90% of those schools who claim to have electricity connection actually have it**, only 92% of eligible schools have mid-day meals, only 78% have drinking water, and 72% have a usable girls toilet. **These figures are considerably lower than official data reports.**"* — directly contradicting PIB's "Classrooms of Change", which claims 98.4% drinking water and 97.1% girls' toilets. **This is `P-22` (MIS versus survey) stated by a parliamentary committee about its own government's numbers.**
- **¶4.3.8 — the mission's own definition was narrowed:** *"**the mission has been re-focused recently to exclude oral reading fluency as one of its objective**"*, because oral reading fluency was a Grade 3 target and Grade 3 falls outside NEP's five-year foundational stage. The Committee *"strongly recommends that the Mission be refocused once again to include the attainment of universal oral reading fluency."* **The government removed the reading-fluency goal from the reading mission. First-class definitional break, and it sits directly under the "reading did not recover" finding in §3.4.**
- **¶4.3.5:** no NIPUN Bharat annual report exists — the Committee has to *recommend* that the Department publish one. `not-published`.
- **¶4.3.4:** the per-teacher FLN resource allowance is **₹150 per year**; the Committee asks for ₹1,500.
- **¶3.4.61 — the Committee criticises the government's own instrument:** *"NAS numeracy tests at Grade 3 include three-digit numbers and operations, which is beyond the scope of many children's learning capacity"*; *"**NAS should be redesigned to conduct one-on-one oral assessments as used in the FLS.**"* **A parliamentary committee recommending that the official instrument adopt ASER's method — relevant to §2.**

### 3.9 The government's own ASER-comparable instrument was run once and abandoned

The **Foundational Learning Study (FLS) 2022** — ~86,000 Std III students, **one-on-one oral assessment**, 20 languages, 36 States/UTs — is the only government instrument methodologically comparable to ASER. Per ASER 2024 Annexure 9: *"it has been implemented once in 2022."* It has not been repeated, and the Standing Committee's ¶3.4.61 recommendation that NAS adopt its method has not been acted on. **`not-collected` — the state built the right instrument, used it once, and shelved it.** (FLS report at `ncert.nic.in` — **not retrieved**, host unreachable.)

**And ASER itself warns against the comparison the government makes.** ASER 2024 Annexure 9: *"Comparing results across assessments can be challenging due to the different purposes and designs of each program. **Direct comparisons are difficult** as they must account for… alignment between content standards and assessments, the target populations assessed, the nature of student participation."* PARAKH Grade 3 "add and subtract 2-digit numbers" = **58% of items correct**; ASER Std III "can do 2-digit subtraction with borrowing" = **33.7% of children**. Different quantities; irreconcilable without item-level data.

## 8. PUBLIC EDUCATION SPENDING — the required series, and the reason it is four series

### 8.1 The primary document, and how it had to be retrieved

The authoritative source is **"Analysis of Budgeted Expenditure on Education" (ABE)**, an annual Ministry of Education (formerly MHRD) publication. The latest edition locatable covers **2019-20 to 2021-22**.

> **Analysis of Budgeted Expenditure on Education 2019-20 to 2021-22**, Ministry of Education, Table No. (4), p. 16.
> Original URL `https://www.education.gov.in/sites/upload_files/mhrd/files/statistics-new/budget_exp_2020_22.pdf` — **now HTTP 404.**
> Retrieved via Internet Archive snapshot of that ministry PDF, 2025-02-12: https://web.archive.org/web/20250212064309/https://www.education.gov.in/sites/upload_files/mhrd/files/statistics-new/budget_exp_2020_22.pdf
> **Tier T1** — the ministry's own document byte-for-byte; the archive is transport, not source. Record the retrieval route in `notes`.

Earlier edition, for the pre-2010 tail and the rebasing comparison:
> **Analysis of Budgeted Expenditure on Education 2007-08 to 2009-10**, MHRD, Table No. (5). Retrieved from third-party mirror: https://www.educationforallinindia.com/Budget-Exp-2007-08-to-2009-10.pdf. **T4 as retrieved.** Values match the later ministry edition exactly for 2004-05 through 2007-08, which is good evidence the mirror is faithful.

### 8.2 THE DEFINITIONAL QUESTION — and it is the whole ballgame

The ABE publishes **two different totals** for "public expenditure on education", side by side in one table, differing by **1.2 to 1.4 percentage points of GDP**:

- **Column 9 — "by EDUCATION DEPARTMENTS"**: education departments of the Centre and all States/UTs only.
- **Column 15 — "by EDUCATION & OTHER DEPARTMENTS"**: additionally sweeps in education spending by the **Ministries of Culture; Labour & Employment; Minority Affairs; Personnel, PG & Pensions; Railways; Social Justice & Empowerment; Textiles; Tribal Affairs; Women & Child Development; and the Department of Food Processing Industries** (ABE 2019-22, §4.2). The ABE concedes it cannot break these down — sector-wise breakup "is not available in the budget documents" — and so **allocates them by assumption**: this spending "mainly goes towards Elementary and Secondary Education sectors and therefore expenditure incurred by these Ministries has been counted towards Elementary & Secondary."

The ABE's own summary box states the gap in one sentence:

> "the budget allocation by education department of all States/UTs and centre for education sector is **only 2.75% of the GDP**. While taking into account the provision for education by all departments of States/UTs and centre including education departments the percentage figure reaches to **4.12%**."
> — ABE 2019-22, §3.2, p. 8. **T1.**

**So "India spends X% of GDP on education" has no single true answer.** It is 2.75% or 4.12% for the same year, depending on whether the WCD ministry's anganwadi spending and the Railways' schools count as education. Every 6%-target comparison in circulation should be checked for which numerator it uses; most do not say.

**A third number — the government's own flagship annual uses the *narrow* basis.** Economic Survey 2025-26: "General government expenditure on education has declined from **2.9% of GDP in FY20 to 2.7% in FY26 (BE)**", flat at 2.7% since FY22. **T4 as held** — the Survey chapter PDF was not directly pulled and **must be upgraded to T1 before authoring**. It cross-checks against ABE column 9 (2019-20 = 2.73%, 2021-22 = 2.75%), so the *basis* identification is secure even where the exact FY26 value is relayed.

**A fourth — UNESCO/World Bank, on a third definition again.** `SE.XPD.TOTL.GD.ZS`, retrieved directly from the World Bank API on 2026-08-01 (WDI vintage: published 2026-02, from the UNESCO data API). **T2.**

| WDI year | 2009 | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| % of GDP | 3.28 | 3.38 | 3.80 | 3.87 | 3.85 | 3.90 | 4.12 | 4.25 | 4.31 | 4.36 | 3.90 | 4.29 | 4.63 | 4.10 |

**`P-14` applies directly** — the WDI year label maps to the Indian fiscal year *beginning* in that calendar year (WDI 2013 = 3.845 against ABE 2013-14 = 3.84, an exact match). Beyond that mapping the two diverge sharply and neither body publishes a note explaining why (WDI 2018 = 4.36 vs ABE 2018-19 = 3.90; WDI 2021 = 4.63 vs ABE 2021-22 = 4.12). **Latest WDI year is 2022 — the internationally comparable series is four years stale**, and 2007, 2008 and 2023-25 are missing entirely.

### 8.3 THE DENOMINATOR PROBLEM — three GDP bases spliced inside one published table, with a fourth pending

The ABE's column 3 is headed **"GDP AT CURRENT PRICES (AT FACTOR COST)"**. **That header is wrong**: the values are GDP at current **market** prices. Check — ABE gives 2013-14 GDP as ₹1,12,33,522 crore; India's GDP at current market prices in 2013-14 on the 2011-12 base is ₹112.3 lakh crore, while GVA at basic prices was ~₹103.6 lakh crore. **The label contradicts the numbers, and anyone recomputing the ratio from the stated definition gets a different answer than the table prints.**

Worse, the denominator is spliced across base years, and the splice is **documented in the earlier edition and undocumented in the later one**:

> ABE 2007-10, note to Table 5: "GDP figures are on the base year 1999-00 series. **From 2004-05 onwards GDP figures are on the base year 2004-05 Series**."
> ABE 2019-22, note to Table 4: "GDP figures have been taken from Press Note Released on 02-08-2021 by National Accounts Division, CSO, MOSPI" — i.e. the **2011-12** base.

Comparing the two editions shows which years moved:

| Year | ABE 2007-10 edition (broad) | ABE 2019-22 edition (broad) | Restated? |
|---|---|---|---|
| 2000-01 | 4.28 | 4.14 | **yes** (1999-00 → 2004-05 base) |
| 2004-05 | 3.26 | 3.26 | no |
| 2007-08 | 3.40 | 3.40 | no |
| 2008-09 | 3.77 (RE) | 3.56 (actual) | yes — RE→actual confounds it |
| 2009-10 | 3.85 (BE) | 3.95 (actual) | yes — BE→actual confounds it |

So the published series carries **1999-2000, 2004-05 and 2011-12 base years**, restated unevenly, with **no note in the later edition telling the reader the early years moved**. And **a fourth rebasing has now landed**: MoSPI's 2022-23 base series of 27 Feb 2026 (`P-10`), which lowered the level of nominal GDP by roughly 3–4% and will therefore **mechanically raise every education-share figure by roughly 0.1 percentage point** with no change in a rupee spent or a child taught.

**This is the education-spending-share series `P-10` has been waiting for.** The ratio moves for reasons that have nothing to do with education, in both directions, at least four times.

### 8.4 THE SERIES — all-India, both numerators, 2000-01 to 2021-22

ABE 2019-22, Table No. (4), p. 16. **T1.** Denominator: GDP at current market prices (mislabelled "factor cost" in the source), spliced across 1999-00 / 2004-05 / 2011-12 bases.

| Year | Edu Depts: States % | Centre % | **Total NARROW %** | Edu & Other: States % | Centre % | **Total BROAD %** | Status |
|---|---|---|---|---|---|---|---|
| 2000-01 | 2.74 | 0.40 | **3.14** | 3.63 | 0.51 | **4.14** | A |
| 2001-02 | 2.62 | 0.37 | **2.99** | 3.03 | 0.65 | **3.68** | A |
| 2002-03 | 2.54 | 0.39 | **2.93** | 2.97 | 0.69 | **3.66** | A |
| 2003-04 | 2.40 | 0.39 | **2.79** | 2.74 | 0.65 | **3.40** | A |
| 2004-05 | 2.29 | 0.44 | **2.74** | 2.65 | 0.61 | **3.26** | A |
| 2005-06 | 2.26 | 0.53 | **2.79** | 2.66 | 0.68 | **3.34** | A |
| 2006-07 | 2.19 | 0.60 | **2.79** | 2.61 | 0.87 | **3.48** | A |
| 2007-08 | 2.15 | 0.58 | **2.74** | 2.53 | 0.87 | **3.40** | A |
| 2008-09 | 2.23 | 0.65 | **2.88** | 2.66 | 0.90 | **3.56** | A |
| 2009-10 | 2.46 | 0.65 | **3.11** | 2.90 | 1.05 | **3.95** | A |
| 2010-11 | 2.51 | 0.72 | **3.22** | 2.94 | 1.11 | **4.05** | A |
| 2011-12 | 2.40 | 0.69 | **3.09** | 2.84 | 0.99 | **3.82** | A |
| 2012-13 | 2.34 | 0.66 | **3.01** | 2.80 | 0.90 | **3.70** | A |
| **2013-14** | 2.33 | 0.64 | **2.97** | 2.83 | 1.00 | **3.84** | A · **last full UPA year** |
| 2014-15 | 2.35 | 0.55 | **2.90** | 3.00 | 1.07 | **4.07** | A |
| 2015-16 | 2.32 | 0.49 | **2.81** | 3.16 | 1.04 | **4.20** | A |
| 2016-17 | 2.31 | 0.47 | **2.78** | 3.15 | 1.09 | **4.24** | A |
| 2017-18 | 2.21 | 0.47 | **2.68** | 2.90 | 0.97 | **3.87** | A |
| 2018-19 | 2.20 | 0.41 | **2.61** | 2.93 | 0.96 | **3.90** | A |
| 2019-20 | 2.30 | 0.43 | **2.73** | 3.03 | 1.01 | **4.04** | **Actual** |
| 2020-21 | 2.52 | 0.43 | **2.95** | 3.32 | 1.04 | **4.36** | **RE** |
| 2021-22 | 2.35 | 0.40 | **2.75** | 3.10 | 1.02 | **4.12** | **BE** |

Continuation beyond 2021-22 on the **narrow** basis only, from Economic Survey 2025-26: FY22 ≈ 2.7, flat through **FY26 (BE) = 2.7**. **T4 as held; upgrade before authoring.**

**What the series says, on either basis:**
- **The Centre's own share of GDP fell across T1 and T2 on the narrow basis** — 0.64% in 2013-14 (UPA's last full year) to **0.40% in 2021-22, the lowest value in the 22-year table.** On the broad basis it is roughly flat near 1.0%.
- **States carry three-quarters of the money and always have** — ABE 2022-23 BE: 24.62% Centre, 75.38% States/UTs. **Any Union-budget-only story about Indian education spending is a story about a quarter of it.**
- **The narrow total peaked at 3.22% in 2010-11 (UPA) and has never returned there.** 2.97% in 2013-14; **2.61% in 2018-19, the lowest in the table**; then COVID pushed the ratio up mechanically by shrinking the denominator.
- **On the broad basis T1 looks better than the baseline** (3.84% → 4.24%). **On the narrow basis T1 looks worse** (2.97% → 2.78%). **Same budgets, opposite direction, purely from numerator choice.** This is the cleanest available demonstration that the definitional question is not pedantry.
- **The 2020-21 rise is a denominator artefact.** Nominal GDP *fell* from ₹201.0 lakh crore to ₹198.3 lakh crore. Same shape as `P-48`.

### 8.5 The ABE has stopped being published where it was published — and so has NEP 2020

Every path under `https://www.education.gov.in/sites/upload_files/mhrd/files/**` now returns **HTTP 404**, including:
- `statistics-new/budget_exp_2020_22.pdf` (ABE 2019-22) — **archived live on 2025-02-12; 404 on 2026-08-01**
- `statistics-new/budget_exp.pdf` (ABE 2018-20) — archived live 2024-12-17; now 404
- `statistics-new/Analysis_of_Budgeted_Expenditure_on_Education_2018-2020.pdf` — now 404
- **`NEP_Final_English_0.pdf` — the National Education Policy 2020 itself — now 404**

The ministry has migrated `education.gov.in` to a client-rendered Next.js application which returns HTTP 200 with an empty shell for *any* path (verified: five fabricated ABE paths all returned 200 with no content). **The live document inventory therefore cannot be enumerated by fetch**, and I could not establish by retrieval whether newer ABE editions exist behind the site's runtime API. **Stated as a limit on what I checked, not as proof of discontinuation.**

What *is* established:
1. The latest ABE edition locatable anywhere covers budget years only through **2021-22 (BE)** — a four-year publication gap as of August 2026;
2. The underlying data plainly still exists and is still compiled, because the Economic Survey 2025-26 quotes the education share through FY26 (BE);
3. **Every academic and policy citation to the ministry's own document URLs — including citations to NEP 2020 — is now dead.**

**Suggested reasonKind for the disaggregated ABE beyond 2021-22: `not-published`** (data exists in the holder's hands; producible under compulsion; no identifiable refusal documented, so *not* `withheld`). **Verification step before authoring: query the new site's runtime API, or retrieve from an Indian IP, to confirm no 2022-24 edition exists.** If an edition exists but is merely unlinked, this shrinks to a link-rot finding; if it does not, it is a lapse in a 25-year annual statistical series.

## 8A. INTERLUDE — three contradictions inside a single government document (Economic Survey 2025-26)

Retrieved directly and confirmed: **Economic Survey 2025-26, Statistical Appendix** (https://www.indiabudget.gov.in/economicsurvey/doc/Statistical-Appendix-in-English.pdf) and **Economic Survey 2025-26 Highlights/Infographics** (https://www.indiabudget.gov.in/economicsurvey/doc/Infographics%20English.pdf). Both **T1**.

**(1) The same Survey uses two different AISHE vintages, and they disagree on higher-education GER.**
- Statistical Appendix, Table 8.3, source line: **"UDISE+ 2024-25 (NEP Structure), Department of School Education & Literacy and AISHE 2021-22"** → all-India higher-education GER (18–23) = **28.4**.
- Infographics, Chapter 11: **"GER increased from 27.1 in 2019-20 to 29.5 in 2022-23 (AISHE)."**

**RESOLVED, and the resolution is worse than the contradiction.** AISHE 2022-23 was **not published until 8 July 2026** (PIB PRID 2282525), when it was released *together with* AISHE 2023-24. The Economic Survey 2025-26 was tabled months earlier — it must have been, since its own Statistical Appendix names AISHE 2021-22 as the current vintage and its data run to FY26 BE.

> **So the Ministry of Finance published the AISHE 2022-23 higher-education GER of 29.5 in the Economic Survey while the AISHE 2022-23 report itself was still unpublished — and the same Survey's statistical appendix, unable to cite an unpublished report, fell back on AISHE 2021-22 and printed 28.4.**

The number existed, in government hands, and was used in the government's flagship economic document, months before the report that contains it was released. That is a **`not-published`** absence with an identifiable *use* attached — the strongest form of the category, because producibility is not merely inferred but demonstrated. See §10 for the full AISHE publication-lag series.

**(2) The same Survey reports school GER on two incompatible level structures, both labelled UDISE+.**
- Appendix, Table 8.3 — **NEP structure**, 2024-25: Foundational (Pre-Primary to Class II) **41.4**, Preparatory (III–V) **95.4**, Middle (VI–VIII) **90.3**, Secondary (IX–XII) **68.5**.
- Infographics, Chapter 11 — **old structure**: "GER: **90.9 for Grades I to V, 90.3 for Grades VI to VIII, 78.7 for Grades IX and X and 58.4 for Grades XI and XII** (UDISE+)."

**CORRECTION TO MY FIRST READING, made after retrieving the full chapter:** the Survey *does* reconcile these, in **footnote 8 to Chapter 11** (Economic Survey 2025-26, echap11.pdf, p. 422), which states both structures explicitly — "As per previous academic structure GER scores are 90.9 at the primary stage (Grade I to V), 90.3 at the upper primary (Grade VI to VIII), 78.7 at the secondary stage (Grade IX and X) and 58.4 at the higher secondary stage (Grade XI and XII)" — and explains the low foundational figure: it "is due to GER being calculated using Pre-Primary enrolments in recognised schools as reported by States/UTs, **which excludes Anganwadi enrolments and enrolments in standalone Private Pre-Primary Schools**." **This is good practice and the report should say so.** The finding is therefore narrower and fairer than it first appeared:

- The **break is real and consequential** — Grades I–V at 90.9 and Grades III–V at 95.4 are not the same quantity and must never be put on one line. **Any GER series must declare its structure and must break at the changeover.**
- The **foundational-stage GER of 41.4 is not a measure of pre-primary participation** and must not be read as one: it excludes anganwadis, which ASER shows are the largest single provider for ages 3 and 4. Against ASER's 77.4% / 83.4% / 71.4% enrolment for 3/4/5-year-olds, UDISE+'s 41.4 is measuring something else entirely.
- What is genuinely at fault is **placement, not disclosure**: the reconciliation sits in a footnote in a 48-page chapter, while the infographic and the statistical appendix each carry one structure with no cross-reference.

**(3) The government's headline evidence for NIPUN Bharat is the one PARAKH statistic whose cut-scores are unpublished.**
Infographics, Chapter 11, under "Universal FLN under NIPUN Bharat":
> "Improved proficiency at the foundational level (Grade III) (PARAKH 2024): **From 39% in 2021 to 57% in 2024 in language. From 42% in 2021 to 65% in 2024 in mathematics.**"

That is the **proficiency-band headcount**, not the mean score — and per §2.5 the band cut-scores are published nowhere, the bands invert against the means (Language has the higher mean but the lower proficiency share), and PARAKH's own stated position is that comparability across cycles holds for Grade 3 alone. **The central official claim that the FLN mission worked rests on a statistic no external party can audit, drawn from the one grade where the comparison is permitted, from an instrument whose predecessor's state rankings correlate with nothing.** Record this as a first-class finding, not a footnote.

**Other T1 figures from the same infographic, for use downstream:** "~**25 crore** students enrolled in **14.7 lakh** schools supported by over **1 crore** teachers"; higher education "**4.46 crore** students enrolled in over **70,018** institutions"; policy targets **100% school GER by 2030** and **50% higher-education GER by 2035**.
