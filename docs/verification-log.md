# Verification log — cycle 2026-07-30

## Verified this cycle (pinned to named source)

| Figure | Value | Source | Tier | Note |
|---|---|---|---|---|
| Forex reserves, end-Mar 2014 | US$304.2bn | Economic Survey 2013-14 (tabled 9 Jul 2014) | T1 | End-Mar 2013: $292.0bn. RBI weekly (28 Mar) read $303.67bn — ES figure adopted |
| Grid solar capacity, Mar 2014 | 2.82 GW | MNRE via PIB release, 7 Feb 2024 | T1 | **Corrects phase-1 report's ~2.6 GW** |
| Delhi PM2.5 annual mean | 153 µg/m³ | WHO Ambient Air Pollution database, 2014 release | T2 | Underlying data 2008-2013 → genuinely UPA-era. 13/20 worst cities Indian |
| Remittances 2014 | US$70bn | World Bank Migration & Development Brief (Apr 2015) | T2 | Largest globally; China $64bn, Philippines $28bn |
| Rupee crisis mechanics | 55.4→68.85/USD, −19.4% | MoSPI Statistical Year Book, Exchange chapter | T1 | 22 May → 28 Aug 2013 |
| Poverty (Tendulkar) 2004-05 / 2009-10 / 2011-12 | 37.2 / 29.8 / 21.9% | Planning Commission press note 22 Jul 2013 | T1 | Confirmed in phase-1 research |

## Open queue (record, expected value, where to pin)

| Figure | Expected | Pin against | Priority |
|---|---|---|---|
| Defence expenditure % GDP, 2014 | ~2.5% | SIPRI Milex database | Medium |
| Internet subscribers, end-2014 | ~251M | TRAI Performance Indicator Report Q4-2014 | Medium |
| Total grid RE capacity, Mar 2014 | ~31.7 GW | MNRE Annual Report 2013-14 | Medium |
| Peer GDP per capita 2014 (all 5) | see seed | World Bank WDI, **single vintage, record date** (P-09) | High — needed for counterfactual normalisation |
| Peer stunting values | — | DHS/WDI, same vintage discipline | Low until human-dev domain run |
| CAD FY13 / FY14 exact | 4.8% / 1.7% | RBI BoP tables | Low (approx well-attested) |
| NH network + pace | 91,287 km / 11.6 km-day | MoRTH Annual Report 2013-14 | Low |
| Exports/GDP FY2013-14 peak | 25.4% | WDI NE.EXP.GNFS.ZS + RBI | High — anchor for a headline comparison |

## Standing rules
1. `status: verified` only when pinned to a named primary/institutional source **in a logged cycle** with URL. Report-derived figures stay `approx`.
2. WDI panel pulls: whole panel at once, one vintage, date recorded in `source.vintage`. Never refresh one country alone (P-09).
3. Corrections propagate: when a verified value contradicts phase-1 report prose (as solar 2.82 did), the series file wins and the discrepancy is noted here.

---

# Verification log — cycle 2026-07-30 (Phase 2, macro/fiscal)

## Contract change required
**The project assumed two GDP regimes. There are now three.** MoSPI released a 2022-23 base series on 27 Feb 2026 (P-10). CLAUDE.md rule 5 currently reads "Both GDP series always" — it must become "all three regimes". FY24 and FY25 now have two valid growth figures each (FY24: 8.2 / 7.2; FY25: 6.5 / 7.1) and no spliced back-series exists yet. Sources and Methods documentation is due August 2026 — a re-baselining trigger.

The rebasing also lowered the *level* of nominal GDP by 3-4%, which mechanically raises every ratio-to-GDP in the project (deficit, debt, exports, GFCF, tax) with no change in underlying activity. Any chart of those ratios spanning Feb 2026 must carry the denominator break.

## New provenance records
P-10 third GDP rebasing · P-11 CPI base revision to 2024 · P-12 IIP/WPI revisions and new PPI · P-13 fiscal anchor shifts from deficit to debt (FY27) · P-14 WDI fiscal-year labelling for India vs calendar years for peers.

## Reconciliation resolved
Phase 1 recorded exports at **25.4% of GDP (FY2013-14, T1)**; Phase 2's WDI pull gives **22.97% for "2014"**. Not a contradiction — different period bases (P-14). WDI labels India's fiscal years by starting year. **This convention is stated from general knowledge and must be verified against WDI documentation before the peer views ship.**

## Status discipline applied
Only three points marked `verified` this cycle (the two 2022-23 base growth figures and the FY14 new-base figure, all from the MoSPI press note). Everything else in the FY15-FY26 macro table is `approx` — the Phase 2 report itself flags that several inflation, reserves and rupee cells are T2-derived. They must be replaced with exact T1 RBI/CGA annual series before any published view.

## Open queue additions
| Figure | Pin against | Priority |
|---|---|---|
| CPI annual averages FY15-FY26 | RBI Handbook of Statistics | High |
| Fiscal deficit FY15-FY26 actuals | CGA monthly accounts / Budget at a Glance | High |
| Forex reserves FY-end series | RBI Weekly Statistical Supplement | Medium |
| ₹/US$ annual averages | RBI reference rate archive | Medium |
| GFCF % GDP FY15-FY26 | MoSPI national accounts | High |
| WDI India FY-labelling convention | WDI metadata documentation | High — P-14 depends on it |
| Oil windfall: exchequer vs consumer split | CGA petroleum excise series FY15-FY22 | High — flagged as the period's most under-reported fiscal story |

---

# Verification log — cycle 2026-07-31 (Phase 3, banking)

## Correction to phase-1 data
`psb-gross-npa` carried an AQR break pointing at **P-06 (off-budget borrowing and fiscal accounting)** — the wrong provenance record entirely. It passed validation because the reference *resolved*; nothing checked that it resolved to something relevant. Repointed to the new **P-15 (AQR recognition break)** and the series extended to FY2013-14 through FY2025-26.

**Validator gap this exposes:** a break's `provenanceRef` should be checked against the referenced record's `affectsDomains`. P-06 covers `macro`; `psb-gross-npa` is `banking` — a domain cross-check would have caught it. Implemented as a semantic check in this cycle's validation run; Code should add it to `npm run validate`.

## The decisive finding
Banks wrote off **₹16,61,310 crore** (April 2014-September 2024) and recovered **₹2,69,795 crore — about 16%**. This is what makes the banking verdict "worked with an asterisk" rather than "worked". The headline fall from 14.58% to 1.8% has three drivers that the ratio does not separate: genuine recoveries and upgrades (~42.8% of the FY2024-25 reduction, per RBI), write-offs, and credit growth expanding the denominator (₹66.91 → ₹181.34 lakh crore, 2015-2025).

**Instrument requirement (P-17):** every longitudinal NPA chart must offer an adjusted series — gross NPAs plus cumulative write-offs over the same denominator — alongside the reported one.

## New provenance records
P-15 AQR recognition break · P-16 COVID forbearance · P-17 write-offs and denominator growth · P-18 domestic vs global operations basis · P-19 risk-weight changes and partial rollback · P-20 RBI fraud reporting basis change · P-21 ECL transition (1 April 2027).

## P-18 is a live trap
The commonly cited PSB peak of **14.58% is global-operations basis**; the SCB figure for the same period on **domestic operations is 11.46%**. Official sources mix the two without labelling. Every NPA point in the dataset is now tagged with its basis, and P-18 forbids cross-basis comparison.

## P-20 is provisional and must not ship
The RBI's reported change of fraud reporting from date-of-detection to date-of-occurrence is asserted across secondary sources but **the primary circular and effective date have not been located**. No fraud time series may be published until this is pinned. Highest-priority verification item this cycle.

## Status discipline
Three points marked `verified` (PSB GNPA FY2017-18, FY2020-21, FY2024-25 — all direct from PIB releases) plus PSB profit FY2024-25. Everything else `approx`. The consolidated annual table in the phase-3 report is explicitly indicative, interpolated from RBI FSR and Trend & Progress narrative, and must be replaced with exact RBI series before any published view.

## Open queue additions
| Figure | Pin against | Priority |
|---|---|---|
| RBI fraud-reporting basis change, circular + date | RBI notification archive | **Blocking** for any fraud series |
| SCB/PSB/private GNPA exact annual series, both bases | RBI Trend & Progress, all editions | High |
| Annual write-off figures FY15-FY26 | RBI RTI + Parliament answers, primary | High |
| IBC year-by-year admitted/resolved/liquidated | IBBI quarterly newsletters | High |
| Govt capital infusion, exact annual | Union Budget documents | Medium |
| Peer NPL and credit/GDP, single WDI vintage | WDI + IMF FSI | Medium |

---

# Verification log — cycle 2026-07-31b (corrections from phase-3 integration)

Three research-side items raised by the integration session, all resolved here.

## 1. P-10 prose contradicted its own figures — CORRECTED
The record read "revised recent real growth UP (FY24 8.2%→7.2%, FY25 6.5%→7.1%)". 8.2 to 7.2 is a downward revision. The direction is **mixed**: FY24 down, FY25 up. Now stated per year.

The correction surfaces something substantive that the wrong generalisation was hiding: the rebasing changed the **shape** of the recent trajectory, not just its level. On the 2011-12 base, FY24 to FY25 was a 1.7-point deceleration; on the 2022-23 base it is 0.1 points. The rebasing flattened the recent slowdown almost entirely. This belongs anywhere growth trajectory is discussed, not buried in a provenance note.

## 2. Which cumulative write-off total — RULED
Use **`bank-writeoffs-cumulative-scb` (₹16.6131 lakh crore)**, not the sum of `bank-writeoffs-annual`.

Reasoning: the cumulative figure is sourced (RBI RTI, well corroborated); the annual series is reconstructed from narrative reporting. Summing the annual series through FY2024-25 gives ~₹17.66 lakh crore against ₹16.61 to September 2024 — allowing six months of FY25, the annual series runs roughly ₹0.3 lakh crore high, about 2%.

Because the sourced figure stops six months short of FY2024-25, the resulting adjusted ratio is a **floor, not a point estimate** — label it so. FY2024-25 adjusted becomes **19.74%** against 2.79% reported. The error runs in the direction that understates the argument, which is the correct direction to be wrong in.

## 3. `cad-gdp` denominator break — RULED, and my omission
Ruled in an earlier cycle but never written into the data. Applied now: `cad-gdp` declares P-10 with a denominator break at FY2025-26.

Any series expressed as a percentage of GDP inherits the GDP denominator; the current account ratio is no exception, since RBI computes it against MoSPI national accounts. **Caveat carried in the series note:** published RBI ratios for FY24-FY25 were computed on the 2011-12 denominator at time of publication, and whether RBI has restated its historical BoP ratios onto the 2022-23 base is unverified. Treat FY24-FY26 as old-denominator until confirmed. This vintage question affects every ratio sourced from a publisher other than MoSPI — a general problem, not a `cad-gdp` one.

## Open queue additions
| Figure | Pin against | Priority |
|---|---|---|
| Cumulative SCB write-offs to 31 March 2025 | RBI / Parliament answer for full FY2024-25 | High — converts the adjusted floor into a point estimate |
| Annual SCB gross advances FY15-FY26 | RBI Trend & Progress | High — unblocks continuous adjusted rendering |
| Whether RBI restated BoP ratios onto the 2022-23 base | RBI BoP statistics release notes | High — affects all non-MoSPI ratios |
| `pvt-gross-npa` reporting basis | RBI Trend & Progress (reports both bases) | High — series barred from shared axis until known |
| Annual write-offs FY15-FY26, primary | RBI RTI / Parliament, primary documents | Medium — replaces the ~2%-high reconstruction |

---

# Verification log — cycle 2026-07-31c (Phase 4, welfare delivery)

## The organising finding
Almost every scheme in this domain reports an OUTPUT — a connection, a toilet, a card, a house, a tap — and the honest question is what share converted into sustained use. The gap is systematic and always runs the same way. It is now P-22, and every scheme record in this phase references it.

The clearest instances, each carried as a paired series:
- **Ujjwala**: ~10.3 crore connections, but CAG Report No. 14 of 2019 found 3.21-3.66 refills/year against a general-consumer benchmark above 6, with 17.61% never taking a second refill and 33.02% taking one to three.
- **Swachh Bharat**: NARSS reports 96.5% usage; the r.i.c.e. SQUAT panel found 44% still defecating in the open in four large north-Indian states, and 23% of latrine-owners unchanged since 2014.
- **Jal Jeevan**: the government's own 2024 Functionality Assessment found 98% of certified households had a tap and ~76% received water meeting Mission standards.
- **PM-JAY**: 24-30 crore cards against 12.69 crore cumulative admissions.

## The regression that must not be buried
Child anaemia (6-59 months) rose from **58.6% (NFHS-4) to 67.1% (NFHS-5)** while every input indicator improved. Filed as L-0042 with assessment `contested`, and carrying an explicit caveat: **haemoglobin testing method may have differed between rounds**, which would affect comparability. That must be checked against NFHS-5 methodology documentation before the reversal is cited as settled. NFHS-6 is delayed, so this remains the last authoritative reading.

## The circularity
NITI Aayog's claim that 24.82 crore people exited multidimensional poverty rests on an index whose indicators — cooking fuel, sanitation, housing, water, bank accounts — are the outputs of Ujjwala, Swachh Bharat, PMAY, Jal Jeevan and Jan Dhan. Scheme delivery improves the poverty measure mechanically, so it cannot serve as independent confirmation that those schemes worked. P-26; the circularity must be stated wherever the figure appears.

## New provenance records
P-22 MIS displaces survey as the evidence base · P-23 HCES 2022-23 methodology change · P-24 ODF definitional sequence · P-25 JJM certification vs delivery · P-26 MPI circularity · P-27 PM-JAY card vs utilisation · P-28 ABPS/NMMS suppressing MGNREGA demand · P-29 Global Hunger Index dispute.

## Two more under-scoped provenance records
The relevance check fired twice. Both were the now-familiar pattern, not mis-pointed refs: **P-10** widened to `all` (the GDP denominator is inherited by any ratio-to-GDP series in any domain — health spending share trips it as surely as fiscal ratios do), and **P-22** widened to include `infrastructure` (Jal Jeevan is filed there).

## A note on the charset rule
My local sweep flagged `è` in "Drèze" as an error. **Code's implementation is right and mine was wrong** — it warns on Latin diacritics rather than erroring, precisely so research prose is not forced to misspell proper names to get a build through. Local sweep corrected to match. One genuine error found and fixed: a `→` in `scb-gross-advances` notes.

## Status discipline
Only the `sanitation-basic` India series (ten points, 2014-2023, pulled from the World Bank data360 API) is `verified` this cycle. Everything else is `approx`. The phase-4 report's annual table is largely empty and its peer table incomplete — those gaps are real and are reflected in the sparse series here rather than filled by estimation.

## Open queue additions
| Figure | Pin against | Priority |
|---|---|---|
| NFHS-4 vs NFHS-5 haemoglobin testing method | NFHS-5 methodology documentation | **Blocking** for citing the anaemia reversal |
| MGNREGA annual person-days FY15-FY26 | NREGA MIS | High |
| MGNREGA budget BE vs actual, annual | Union Budget / CGA | High |
| Peer clean-fuel and stunting values, single vintage | World Bank WDI / WHO-UNICEF JMP | High — peer row currently latest-year only |
| Union health and education spend % GDP, annual | Budget Expenditure documents | High |
| Ujjwala refill rates post-2019 | MoPNG, if published | High — CAG data stops at Dec 2018 |
| PMAY-G completed and occupied, annual | PMAY-G dashboard | Medium |

---

# Verification log — cycle 2026-07-31d (schema change + workflow finding)

## PROCESS PROBLEM — my wholesale replacement reverted a Code fix
The bidirectional backlink check found `exports-gdp` missing its P-10 reference. Code added that link in the phase-3 integration session, correctly, and logged it. **My phase-4 drop overwrote `seed.json` wholesale from the container copy and silently reverted it.**

This is structural, not a one-off. Every phase I regenerate `data/series/seed.json` and `data/provenance.json` in full, so any edit made on the code side between drops is lost without warning.

Two changes follow:
1. **Code must not edit `/data`** — raise the inconsistency instead, per the contract. The exports-gdp fix was correct, but a correct edit that gets silently reverted two phases later is worse than a raised flag.
2. **The bidirectional check is now mandatory in the validator.** It is the only thing that caught this. `provenance.affectsSeries` and `series.provenanceRefs` are two independent assertions of one relationship, and nothing else verifies they agree.

Three backlinks restored: P-10 to `exports-gdp`, P-22 to `pmjay-cards`, P-23 to `poverty-tendulkar`.

## SCHEMA CHANGE — `caveat` is now first-class
Added as an optional string (min 20 chars) to BOTH `ledger.schema.json` and `series.schema.json`.

Rationale: holding blocking qualifications in a rendering rule keyed to record IDs would rot as the ledger grows past forty records, and a future domain run could file a blocking caveat that no view knows to show. The caveat must travel with the record.

Semantics: `caveat` is for qualifications that MUST render wherever the record appears, including compact listings — an unverified comparability assumption, a circular measure, a disputed instrument. Ordinary uncertainty stays in `notes`. Four records carry one so far: L-0042, L-0043, `anaemia-children`, `ghi-score`.

## RULING — usage-side series carry P-22
`jjm-functionality`, `pmjay-admissions` and `sanitation-basic` now declare P-22, and P-22's `affectsSeries` lists both sides of all four pairs. The usage-side series exists precisely to measure the wedge, so a reader asking what a functionality or admissions figure rests on must reach the record that explains why it differs from the coverage figure.

## RULING — PMAY cascade paired, occupancy declared unmeasured
`pmay-g-houses` renamed to "PMAY-G houses sanctioned" and paired with a new `pmay-g-completed` (2.95 crore against 3.87 sanctioned). The third stage — houses completed and actually occupied — has NO public measurement, and the series notes say so rather than leaving the absence implicit or fabricating a figure.

## Endorsements
- **No single gap number.** Gating subtraction on identical unit strings is correct and I should have specified it. Jal Jeevan is the case the rule exists for: 82% of rural households and 76% of certified households are different denominators, certified is a subset of connected, so neither bounds the other and no national functional-coverage figure is derivable. "6 points" would have been invented.
- **Left accent borders retained.** A convention applied systematically — red for alerts and seams, umber for comparability limits — is a design system, not a template tell. No suppression.

---

# Verification log — cycle 2026-07-31e (`unmeasured` becomes first-class)

## SCHEMA CHANGE
Added `unmeasured` as an optional array to BOTH `series.schema.json` and `ledger.schema.json`. Shape: `[{what, why, wouldFill?}]`.

Rationale, identical to the one that moved `caveat` out of a rendering rule: an absence is a research finding, not a display choice. If "occupancy has no public measurement" lives in a component's props, any other view of that record silently drops it. Declaring it in data keeps it visible everywhere and survives view changes.

`wouldFill` doubles as a verification-queue seed — it names the source that would close the gap, where one is identifiable.

Semantics: use when a chain has a missing link, an intended outcome was never measured, or a series stops short of the thing it is cited to demonstrate. Not for ordinary data sparsity, which is what `status: pending` and blank periods already express.

## Populated this cycle
- `pmay-g-completed` — occupancy, the cascade's third stage
- `ujjwala-refills` — population-scale health outcomes (the scheme's stated rationale, never measured), and refill rates after December 2018 (the CAG series simply stops)
- `jjm-functionality` — national functional coverage, which is NOT derivable from 82% connected and 76% of certified, because certified is a subset
- `L-0040` MGNREGA — work demanded but not recorded, the absence that makes rationing and falling need indistinguishable in the series
- `L-0041` PM-KISAN — farmer income after 2018-19, which makes the doubling target formally unevaluable

Note that three of these were previously buried in prose. `jjm-functionality`'s in particular was carried only as a reason for refusing subtraction; it is now a declared absence in its own right.

## Endorsements from the integration session
- **Caveat non-truncation is enforced, not just stated** — explicit `white-space: normal`, `overflow: visible`, no clamp, no max-height, verified byte-identical at 390px in the densest listing with `scrollHeight === clientHeight`. Correct: a rule that lives only in a comment is a rule that survives until the next density pass.
- **Stale comment on `comparable()`** — flagged and corrected. PMAY-G is the first pair to pass the unit-string test (0.92 crore wedge), so a comment claiming no pair passes would have led the next reader to treat the subtraction branch as dead code.

---

# Verification log — cycle 2026-07-31f (Phase 5, infrastructure)

## The central question answered: the pattern SPLITS
Phase 4 established that administrative output overstates sustained use. Phase 5 tested whether that holds when outputs are physical. It does not hold uniformly, and the split is the finding.

**The gap closes** where the asset IS the service and demand pre-existed: railway electrification (20% to 99.6%, converting directly into ~₹6,000 crore annual fuel saving), port turnaround (96 to 49.5 hours alongside throughput rising 581 to 915 MT), and mobile data (0.27 to 20.27 GB per user per month).

**The gap stays wide** where usage depends on complementary behaviour or on demand that was over-forecast: metros (25-30% of DPR ridership, Bengaluru at 6%), UDAN (about half of 679 routes discontinued), BharatNet (service-ready is fibre reaching a village, not service delivered), and rural power (connections near-universal, ~53% of villages under 12 hours a day).

**And in one case the output itself is an artefact**: see P-30.

## P-30 is the phase's most consequential finding
The national highway network grew 91,287 to 146,342 km, cited as a 60% expansion. MoRTH's own factsheet records **~54,004 km of state roads NOTIFIED as national highways since April 2014** against a network increase of ~55,000 km. The expansion is overwhelmingly reclassification. The honest build metrics — pace (11.6 to a peak of 37 km/day) and four-laning (18,278 to 45,947 km) — are real and impressive, which makes the inflated headline unnecessary as well as misleading.

`nh-network-length` carries a caveat saying so, and `nh-construction-pace` and `nh-four-lane` both declare P-30 — not because they are distorted by it, but because they are the corrective, and a reader arriving at them should reach the record explaining why they are the ones to use.

## Numbering collision resolved
The phase-5 report proposed P-23 to P-31; those numbers are held by phase 4. Infrastructure breaks are renumbered **P-30 to P-38**.

## New provenance records
P-30 NH reclassification · P-31 four-laning counted as construction · P-32 village versus household electrification thresholds · P-33 Railway Budget merger · P-34 punctuality suspension and consequential-accident classification · P-35 LPI 2023 methodology · P-36 logistics cost rebasing · P-37 BharatNet service-ready definition · P-38 airport count basis.

**P-36 deserves attention**: the logistics cost figure fell from a long-cited 13-14% of GDP to 7.97%, which reads as a halving. It is a NEW METHODOLOGY, not a measured fall. The old figure was never rigorously derived, so the new estimate is probably better AND the apparent improvement is an artefact — both are true, and the series carries a caveat forbidding the comparison.

## Three counter-indicators recorded against the construction story
- **Road fatalities rose** to a record 1,77,175 (2024), with severity climbing from 21.6 to 36.3 deaths per 100 accidents. Filed as `failed` (L-0046). Police figures likely understate: SRS estimates are roughly double.
- **Rail freight modal share kept falling** to ~26% despite the Dedicated Freight Corridors, which were justified explicitly on arresting it (L-0048, `partly`).
- **Discom finances remain unsolved** — accumulated losses ₹7.08 lakh crore, debt ₹7.42 lakh crore at 31 March 2024, and a fifth bailout in October 2025. Filed as `failed` (L-0051).

## Declared absences added
Average train speed after 2019 (CAG series stops) · household supply-hours as a continuous national series · metro ridership against DPR as a published series · BharatNet functional delivery. All four have identified `wouldFill` routes.

## Open queue additions
| Figure | Pin against | Priority |
|---|---|---|
| NH annual network length and greenfield-only construction km | MoRTH Basic Road Statistics, all editions | High |
| Household supply-hours | CEA feeder metering / IRES | High — closes a declared absence |
| Metro ridership vs DPR, per system | CAG audits and MoHUA | High — closes a declared absence |
| AT&C losses and ACS-ARR gap, annual | PFC annual integrated ratings | High |
| Rail freight modal share, annual consistent series | Indian Railways year books | Medium |
| Peer LPI 2014 and 2023 full panel | World Bank LPI, single vintage | Medium |

---

# Verification log — cycle 2026-07-31g (`correctiveSeries`)

## SCHEMA CHANGE — `correctiveSeries` on provenance
Optional array, the structural mirror of `affectsSeries`. A series listed there references the record as the CORRECTIVE — the honest measure the record points readers toward, or the instrument that measures the wedge it describes — not as a distorted party. `directionOfBias` does not apply to it. **A series must not appear in both**, and the validator should enforce that.

**Why.** The integration session raised that P-30's card shows `overstates-post-2014` on `nh-construction-pace`, which is the corrective, not the overstated series. Leaving it was the right call — the card is the record and suppressing would have meant inventing a per-series bias the data did not carry. But the fact that the question arose means the data was missing something real. The distinction lived only in P-30's `bridgeNote` prose, and it recurs across the dataset: every usage-side series in every coverage-usage pair is a corrective.

Populated on five records: **P-30** (nh-construction-pace, nh-four-lane), **P-22** (ujjwala-refills, jjm-functionality, pmay-g-completed, pmjay-admissions, sanitation-basic), **P-17** (bank-writeoffs-annual, scb-gross-npa-amount, scb-gross-advances), **P-25** (jjm-functionality), **P-27** (pmjay-admissions). Each record's `affectsSeries` was pruned so nothing appears in both.

**Side benefit worth noting:** the pairing view can now derive which side of a pair is coverage and which is corrective from the data rather than from a hardcoded pair list.

## Endorsements from the integration session
- **Per-pair labels.** `nh-construction-pace` is not the utilisation of `nh-network-length` — it is the honest measure of the same activity the headline overstates. A generic "sustained use" label would have been a factual error in the interface. Catching that is the difference between a template and an instrument.
- **`usageUnmeasured` with its own gap branch.** A counterpart that does not exist is categorically different from one not yet pulled: the coverage figure cannot be qualified by anything, so it must not be read as though it had been.
- **Rule 3a's hardest test passed.** The 246-character `nh-network-length` caveat renders byte-exact and unclipped at 390px in the narrowest table on the site, growing the row rather than being cut. That caveat directly contradicts the number above it, so truncation would have been worse than omission.
- **`expect` substrings on ISOLATED fixtures.** The two branches of `pair-incomplete` were indistinguishable to the selftest, so either could have stopped firing unnoticed. Second over-firing guard in two cycles.

---

# Verification log — cycle 2026-07-31h (pairing: decision recorded, not built)

## DECISION: pairs stay hand-written for now. Recorded so it is not relitigated.

The integration session tested derivation across all nine pairs rather than judging it, and found it cannot work from `affectsSeries` / `correctiveSeries`:

- **P-22** maps 4 affected against 5 correctives with nothing saying which goes with which. Recovering `ujjwala-connections` to `ujjwala-refills` would need id-prefix string matching — the fragile-heuristic trap this validator has already hit twice.
- **P-30** maps 1 against 2: `nh-four-lane` is equally a corrective but is not the pair's usage side.
- **Four of nine cannot be derived at all**: airports (P-38 has no corrective), metro (in no list), electrification (counterpart is an absence), sanitation.

**The structural finding — and it changes the data model's semantics:** `sanitation-basic` is corrective in P-22 and affected in P-24. **Role is a property of the (series, record) RELATION, not of a series.** A derived pair list would have to choose which record to ask, which is the hand-written decision the refactor was meant to remove. This does not change when more domains land.

The same fact justifies scoping `directionOfBias` per (series, record) rather than per series. `nh-construction-pace` is P-30's corrective AND genuinely distorted by P-31, whose conflation of widening with new alignment inflates the construction figure. Its P-30 card is neutral, its P-31 card reads `overstates-post-2014`. A per-series flag would have got one of them wrong.

## Where pairing eventually belongs — and the trigger
NOT `pairs` on the provenance record, which was the suggested shape: four of nine pairs are not (affected, corrective) relations at all. Metro and electrification pair a coverage series against **its own declared absence**, mediated by no provenance record.

The eventual home is a **fourth data layer**, `data/pairs.json`, carrying what is currently hand-written in the component:

```
{ id, domain,
  coverage: { series, label },
  usage:    { series, label } | { absenceFrom, index, label },
  framing:  "one sentence, per pair",
  gapComputable: bool, gapReason: "...",
  provenanceRefs: [...] }
```

The labels belong there too. "Headline network figure" against "The build record" is a judgement about what each series IS — the same class of knowledge as `caveat` and `unmeasured`, both of which were moved out of code for this reason.

**Trigger to build it:** when pairs exceed roughly 15, OR when a second domain needs absence-pairs. Not now — nine pairs are manageable hand-written, and the absence-pair shape is still only exercised twice, so the abstraction would be built on a shape that is not yet known. Build the layer when the shape has stopped moving, not before.

## Endorsements
- **`mirror-contradiction` as an error.** A series in both lists says `directionOfBias` simultaneously does and does not apply. Correct as an error rather than a warning.
- **Backlink extended over both lists.** A corrective carries the ref for navigation rather than distortion, but must still carry it — otherwise a reader landing on the honest metric cannot reach the record explaining why it is the honest one.
- **Provenance page split into "Series this record distorts" and "Series that correct for it."** On P-30 that distinction IS the finding; listed together it is invisible.
- **`pair-inverted` as an error.** Derivation is impossible but verification is not — a record calling a pair's coverage side corrective means the pair is upside down. The right use of a signal that is informative but incomplete, and a pattern to reach for again.

---

# Verification log — cycle 2026-07-31j (pairing: decision recorded, not built)

## DECISION: pairs stay hand-written. Recorded so it is not relitigated.

Derivation from `affectsSeries` / `correctiveSeries` was tested across all nine pairs and cannot work:

- **P-22** maps 4 affected against 5 correctives with nothing saying which goes with which. Recovering `ujjwala-connections` to `ujjwala-refills` needs id-prefix string matching — the fragile-heuristic trap this validator has hit twice already.
- **P-30** maps 1 against 2: `nh-four-lane` is equally a corrective but is not the pair's usage side.
- **Four of nine cannot be derived at all**: airports (P-38 has no corrective), metro (in no list), electrification (counterpart is an absence), sanitation.

**The structural finding, which changes the model's semantics:** `sanitation-basic` is corrective in P-22 and affected in P-24. **Role is a property of the (series, record) RELATION, not of a series.** A derived list would have to choose which record to ask — the hand-written decision the refactor was meant to remove. This does not change when more domains land. The same fact justifies scoping `directionOfBias` per (series, record), as cycle 31i implemented.

## Where pairing eventually belongs, and the trigger

NOT `pairs` on the provenance record: four of nine pairs are not (affected, corrective) relations at all. Metro and electrification pair a coverage series against **its own declared absence**, mediated by no provenance record.

The eventual home is a fourth data layer, `data/pairs.json`:

```
{ id, domain,
  coverage: { series, label },
  usage: { series, label } | { absenceFrom, index, label },
  framing: "one sentence, per pair",
  gapComputable: bool, gapReason: "...",
  provenanceRefs: [...] }
```

The labels belong there too — "Headline network figure" against "The build record" is a judgement about what each series IS, the same class of knowledge as `caveat` and `unmeasured`, both moved out of code for this reason.

**Trigger to build it:** pairs exceeding roughly 15, OR a second domain needing absence-pairs. Not before — the absence-pair shape has been exercised twice, and an abstraction built on a shape still moving is the wrong abstraction.

## Process correction

Full-file replacement of this log clobbered integration notes and was reverted (`bb36272`, reverted by `9fed5ed`), then nearly repeated twice more. Third incident of wholesale replacement eating correct work; the first was the `exports-gdp` provenance link in phase 4.

The rule is **never replace a file you did not write in its entirety this cycle** — append, or dictate the delta. This log has two authors and must only ever be appended to.
# Verification log — cycle 2026-07-31i (Phase 5b code run: the affects/corrective mirror)

Totals unchanged: 81 series (455 points), 57 ledger, 38 provenance. Gate clean on arrival.
No `/data` edits.

## 1 and 2. Mirror enforced, backlink extended
`mirror-contradiction` (error): a series in both `affectsSeries` and `correctiveSeries` of one
record says `directionOfBias` simultaneously does and does not apply to it.

The backlink now runs over both lists. A corrective carries the ref for navigation rather than
because it is distorted, but it must still carry it — a reader landing on the honest metric has
to be able to reach the record saying why it is the honest one, which is the point of the
mirror. Clean on arrival: every corrective already links back.

Both proven by fixture (`tests/fixtures/mirror-contradiction`, `tests/fixtures/pair-inverted`).

## 3. `directionOfBias` scoped
Withheld from a corrective on the series page: P-30's card on `nh-construction-pace` now reads
"this series is the corrective, not the affected party · bridge exists".

**It is scoped per (series, record), not per series** — which the highways case demonstrates by
itself. `nh-construction-pace` is the corrective for P-30's reclassification problem *and is
genuinely affected by P-31*, whose conflation of widening with new alignment distorts the
construction figure. So its P-30 card is neutral and its P-31 card still reads
"overstates-post-2014". Both are correct, and a per-series flag would have got one of them
wrong.

The provenance page is now split into **"Series this record distorts"** and **"Series that
correct for it"**, because listed together a reader has no way to tell which is which — and on
P-30 that distinction is the entire finding. The corrective section says in prose that the bias
does not apply to it.

## 4. Not deriving the pairs — the split does not carry the information
Tested rather than judged. For each of the nine pairs, whether one record holds the coverage
side in `affectsSeries` and the usage side in `correctiveSeries`:

| Pair | Result |
|---|---|
| Ujjwala, JJM, PM-JAY, PMAY-G | P-22 maps **4 affected × 5 correctives** — a 20-way cross product with nothing saying which goes with which |
| Highways | P-30 maps **1 × 2**; `nh-four-lane` is equally a corrective but is not the pair's usage side |
| Airports | P-38 declares no `correctiveSeries`; `udan-routes` carries no refs at all |
| Metro | `metro-network` appears in no record's affects or corrective list |
| Electrification | P-32 has no corrective — the counterpart is a declared absence |
| Sanitation | `sanitation-basic` is **corrective in P-22 and affected in P-24** |

Four of nine cannot be derived at all, and two more are ambiguous. Recovering
`ujjwala-connections ↔ ujjwala-refills` from P-22 would take id-prefix string matching, which
is the fragile-heuristic trap this validator has already fallen into twice (the T5 rule naming
P-08; the sparsity rule that would have rejected a third of the true positives).

The sanitation row is the structural objection rather than a counting one: **role is not a
property of a series, it is a property of a (series, record) relation.** A derived pair list
would have to choose which record to ask — exactly the hand-written decision the refactor was
meant to remove. That does not change when another domain lands; it changes only if the data
starts carrying the pairing itself, e.g. `pairs: [{affected, corrective}]` on the record.

The labels were never the blocker, but they confirm it: "The build record" against "Sustained
use" is a claim about what a series *is*, and nothing in the mirror encodes it.

**What the split is good for instead: cross-checking the hand-written list.** New
`pair-inverted` (error) fires where a record calls a pair's coverage side a corrective and its
usage side affected — the pair is then the wrong way round, and the view would present the
honest metric as the headline needing qualification. It cannot derive the pairs, but it can say
the sides are the right way up. All nine pass.

## Result
`validate` 0 errors / 17 warnings · `selftest` 18/18 plus six isolated and one stays-clean ·
`typecheck` clean · `build` 206 static pages · verified in-browser at 1440px and 390px: P-30's
card neutral on the corrective and P-31's still biased, the P-30 page split correctly, the
`nh-network-length` caveat still byte-exact inside a grid card at 390px, no nested anchors, no
console errors.

---

# Verification log — cycle 2026-07-31k (log integrity: what happened to this file)

## Read this before trusting the cycle letters

The entries above are not in letter order and two of them say the same thing. Both are artefacts of the incident described below, and nothing has been deleted to tidy them.

- **31h and 31j are the same entry.** Both record the pairing decision. 31h arrived via `2e0ffbc`, the commit that destroyed 31i; 31j is the corrected re-append. **31j supersedes 31h.** 31h is retained because this log is append-only.
- **31i sits after 31j** because it was restored later, as an append. Its content predates both.
- **Letters are assigned once and never reused or renumbered.** Entries cite each other by letter, so renumbering to fix cosmetics would break real references. Order in this file is arrival order, not chronological order.

## Process correction (accurate account, superseding the version inside 31j)

Three incidents of wholesale replacement destroying correct work, all originating from chat sending a complete file built on a stale copy:

1. **Phase 4** — a `seed.json` drop silently reverted the `exports-gdp` provenance backlink added on the code side. Caught only because the bidirectional backlink check already existed.
2. **`bb36272`** — a full-file replacement of this log deleted 71 lines of cycle 31i. Caught by reading the commit diff; reverted by `9fed5ed`.
3. **`2e0ffbc`** — the same replacement was committed again after the revert, deleting 31i a second time: the `mirror-contradiction` rule and both-lists backlink with their fixture proofs, the per-(series, record) scoping finding evidenced by `nh-construction-pace` being P-30's corrective while genuinely affected by P-31, the nine-pair derivation table, and the verification record for an already-deployed phase.

For a period this file carried 31j's conclusion — a restatement of 31i's section 4 — without 31i's working or verification record. **The failure mode is that a summary reads complete enough that nobody notices the evidence is gone.** It was found by the code side checking rather than by anything in the file signalling absence.

Compounding it: chat then asserted "restored from `060f82e`" and "31h is intentionally unused", both false, both claims about repository state chat could not observe.

## Rules, standing

- **Never replace a file you did not write in its entirety this cycle.** Append, or dictate the delta. This log has two authors and must only ever be appended to.
- **Cycle letters are assigned once.** Never reused, never renumbered. Gaps and out-of-order arrival are acceptable and are explained here.
- **Do not assert repository state you cannot observe.** Ask for `git status`, a diff, or a grep count instead. All three incidents above were either caused or prolonged by asserting a state rather than checking it.
---

# Verification log — cycle 2026-08-01a (Phase 6, employment and labour)

## This domain is structurally different: the measurement dispute IS the finding

In macro, banking, welfare and infrastructure, measurement problems qualified findings. Here the two instruments disagree about the **direction** of change. Over 2017-18 to 2021-22 PLFS records employment growth of +4.55% (+88.86 million); CMIE records minus 0.30% (5.62 million fewer). Opposite signs, not different magnitudes.

Both series are carried in full — `unemployment-rate` and `unemployment-rate-cmie`, `lfpr-overall` and `lfpr-overall-cmie` — and **P-41 forbids resolving the disagreement**. The instruments answer different questions: PLFS supports statements about participation and status composition, CMIE about open joblessness among urban, educated and female workers. The divergence is concentrated almost entirely among women, whose measured participation in official data runs roughly double CMIE's with no convergence across reference periods.

## Three regimes in twelve years
This domain's series break twice. **P-02** (EUS to PLFS, 2017-18) and now **P-39** (PLFS sample redesign, January 2025 — first-stage units 12,800 to 22,692, households per unit 8 to 12, monthly rotational panel in both sectors, July-June to calendar year). MoSPI states explicitly that post-January-2025 results may not be strictly comparable with earlier rounds. Re-baseline at 2025; do not splice.

## The decomposition that changes what the headline means
PLFS unemployment fell 6.0% to 3.2% while participation rose 49.8% to 60.1%. Decomposed:
- Self-employed share rose to **58.4%**; unpaid family helpers from 13.3% to **17.3%**
- Regular wage and salaried employment **flat at 21-23%** — the only category reliably carrying contracts and social security
- Agriculture's employment share **rose** from 42.5% (2018-19) to **46.1%** (2023-24), reversing decades of structural transformation; in 2019-20 alone agriculture absorbed ~32 million, about three-quarters of that year's employment increase
- Real rural monthly earnings **fell** from ₹9,107 to ₹8,842

**P-40** records the mechanism: PLFS counts unpaid helpers as employed, so the rate falls when people are absorbed into unpaid family work. `unemployment-rate` carries a caveat saying the series cannot be read as a jobs indicator.

## New provenance records
P-39 PLFS 2025 redesign · P-40 unpaid family helpers counted as employed · P-41 PLFS versus CMIE directional disagreement · P-42 EPFO net additions are not new jobs · P-43 RBI KLEMS estimates rather than measures employment.

P-42 and P-43 quantify the registration-versus-formalisation distinction phase 3 flagged: of 4.86 crore EPFO net additions across FY2020-FY2023, roughly 2.27 crore were genuinely new payroll and about 42 lakh net formalisation, the rest re-joiners and switchers. Citing KLEMS as corroboration cites the survey back to itself.

## Six declared absences — the most of any phase
- Whether rising female participation is paid entry, reclassified unpaid work, or distress entry (no instrument separates them; ILO modelled 32% against PLFS 41.7%)
- Jobs created, as distinct from payroll registrations (India has no establishment-level new-hire register)
- Whether the labour codes increased formal employment (in force only since 21 November 2025)
- Independently verified placement outcomes for skill trainees (CAG found 87% of batches lacked verifiable attendance)
- The number of workers who returned home in the 2020 exodus (government ~1.04 crore, independent ~3 crore, no reconciliation)
- **Deaths during the 2020 migrant exodus** — the Labour Ministry told Parliament no such data is maintained, and therefore that the question of compensation did not arise. The Railways separately confirmed 97 deaths aboard Shramik trains. An RTI indicated the government held data it declined to give Parliament.

That last one is the starkest absence the project has recorded: not a gap in what was measured, but a stated refusal to have measured it, with a compensation consequence attached.

## Scope widening
**P-22** (registration standing in for outcome) extended to `employment`. EPFO net additions and e-Shram registrations are the same shape the record describes.

## Open queue additions
| Figure | Pin against | Priority |
|---|---|---|
| CMIE annual series, clean | CMIE CPHS direct, subscription | High — currently monthly points from secondary reporting |
| PLFS status composition, full annual | PLFS Annual Reports, all rounds | High |
| Real earnings by worker category | PLFS earnings tables | High |
| EPFO net additions with re-joiner split | EPFO payroll releases | Medium |
| Peer LFPR and employment shares, single vintage | ILOSTAT | Medium |
---

# Verification log — cycle 2026-08-01b (absence reason kinds; claims made reachable)

## SCHEMA CHANGE — `reasonKind` and `reasonDisputed` on unmeasured entries

`reasonKind` is an enum of four values — `not-collected`, `not-published`, `withheld`, `never-defined` — formalising the taxonomy the `why` field's own description already asserted in prose. The same move as `caveat` and `unmeasured` themselves: a claim the schema was making informally becomes checkable.

All 17 existing entries classified: 7 not-collected, 6 not-published, 6 never-defined. None currently `withheld`.

**`reasonDisputed` is a separate boolean, not a fifth enum value.** The integration session raised L-0064's second absence as possibly two kinds at once. It is not: it is a dispute about which kind applies. The Labour Ministry told Parliament no data on migrant deaths was maintained, and therefore that compensation did not arise — while the Railways Minister confirmed 97 deaths aboard Shramik trains and an RTI indicated the government held data it declined to give Parliament. So the STATED reason is not-collected and the evidence indicates at least partial withholding.

Collapsing that into a `disputed` enum value would lose what makes it interesting. The enum records what the responsible body says; the flag records that the saying is contradicted; `why` carries the contradiction. This mirrors `competingAccounts` on provenance — claim and challenge recorded separately rather than merged. **It is the only such case in the dataset.**

## Three series added so the criticism attaches to a claim

The integration session found P-42 (EPFO net additions are not new jobs) and P-43 (KLEMS estimates rather than measures) had empty `affectsSeries` and were reachable only from the provenance index, and that P-22's employment scope had no series carrying it. Correct, and a real gap: the records criticising the government's employment figures existed while the figures themselves did not.

Added: **`epfo-net-additions`** (6.2 crore, Sept 2017 to March 2024), **`eshram-registrations`** (30.98 crore, August 2025), **`klems-employment-claim`** (17.19 crore over 2014-24 against 2.9 crore over 2004-14). Each carries a caveat stating what it does not establish, and each is wired to the record explaining why.

The principle: **the instrument should carry the government's own figures alongside the records explaining what they do not support.** A criticism with no claim attached is an assertion; a claim with no criticism attached is propaganda. Both must be reachable from each other.

## `affectsSeries` asymmetry — documented, NOT a defect

Checking the reverse direction found 52 series declaring a provenance ref the record does not name back. This is correct and must not be "fixed":

- **P-09** (WDI vintage) and **P-14** (WDI fiscal-year labelling) are declared by nine series each — they are general methodology, not findings about particular series.
- **P-02** (EUS to PLFS) is declared by seven employment series.

The fields mean different things. `affectsSeries` names the series a record is SPECIFICALLY ABOUT; `provenanceRefs` lets a series point at every record bearing on it. Requiring symmetry would turn `affectsSeries` into an unmaintainable enumeration that rots on every drop. **The backlink check running record-to-series only is correct**, and the schema description now says so.

Eight provenance records have no series on either side (P-04, P-07, P-08, P-12, P-20, P-26, P-29, P-33). These are domain-level or blocked records — P-20 in particular must not ship until its primary circular is located — and their emptiness is not an error.

## Endorsements

- **Contested pairs as a separate shape, not an extension.** `CoverageUsagePair` is asymmetric by construction — "the order is the argument" — and here there is no first. Folding them in would have meant field names that lie. Symmetric rendering with no accent rule on either column is right: a left rule marks one side as answering the other, which is the relation that does not hold.
- **Nothing subtracts.** Two figures disagreeing about the sign of a change have a disagreement, not a gap. Correct, and a stronger statement of the same rule that governs the Jal Jeevan pair.
- **`contested-incomplete` as an error.** A reader landing on one instrument must reach the record saying the other disagrees.
---

# Verification log — cycle 2026-08-01c (the pairs layer; correction to 08-01b)

## Correction to cycle 2026-08-01b
That entry reads "All 17 existing entries classified: 7 not-collected, 6 not-published, 6 never-defined." Those sum to 19. **The correct statement is 19 declarations across 17 records.** The site computes it correctly; the log text was wrong. Recorded here rather than edited, since this file is append-only.

## THE TRIGGER FIRED — the pairs layer is built

Cycle 31j set the condition: build `data/pairs.json` when pairs exceed roughly 15, OR when a second domain needs absence-pairs. Infrastructure had two (metro, electrification). `epfo-net-additions` and `eshram-registrations` make employment the second. The trigger was written precisely so this would not be relitigated, so it has been honoured.

**13 pairs: 11 coverage-usage, 2 contested.** Usage sides break down as 8 series, 4 declared absences, 1 competing-accounts.

### What moved out of code
The judgements that were hand-written in the component and are now data:
- **Which series pair with which**, and which side is which.
- **The labels.** These were never generic and must not become so — "The build record" against "Headline network figure" is a judgement about what a series IS. `nh-construction-pace` is not the utilisation of `nh-network-length`; it is the honest measure of the same activity the headline overstates, and a generic label would have been a factual error in the interface.
- **The framing sentence**, per pair. A standing sentence about connections and taps would misdescribe a road network.
- **`gapComputable` and `gapReason`.** Only PR-04 (PMAY sanctioned against completed) subtracts, because only it shares a unit on both sides. Every other pair carries a written reason why not.

### Three usage shapes, one schema
- **series** — both sides measured (8 pairs)
- **absenceFrom** — the counterpart does not exist and that IS the finding (4 pairs: metro ridership, supply-hours, first-time payroll entrants, e-Shram benefits delivered)
- **competingAccountsFrom** — the counterpart is a dispute between sources rather than a series (1 pair: sanitation, where the national WDI series faces the r.i.c.e. four-state panel held in P-24)

### Contested is a separate `kind`, not a variant of coverage-usage
Coverage-usage is asymmetric by construction — a records what was delivered, b what it converted into, and the order is the argument. Contested is symmetric: two instruments measuring the same thing, neither answering the other, neither showable alone. Folding them together would have meant field names that lie. The schema enforces that a contested pair can never set `gapComputable` — two figures disagreeing about the sign of a change have a disagreement, not a gap.

Sides are named `a` and `b` rather than `coverage` and `usage` for the same reason: on a contested pair there is no first.

### Checks the layer supports
Validated this cycle and worth implementing in the gate: exactly one of `series` / `absenceFrom` / `competingAccountsFrom` per side; absence indices in range against the named record's `unmeasured` array; `competingAccountsFrom` naming a record that actually has `competingAccounts`; `gapReason` required whenever `gapComputable` is false; and an inversion check — for a coverage-usage pair, side a must not be a corrective of a named provenance record while side b is affected by it, which would mean the pair is upside down.

## Endorsements from the 08-01b integration
- **`reasonKind` optional in schema, mandatory at the gate.** The right split — a drop is not rejected mid-authoring, but nothing ships unclassified.
- **`absence-dispute` splitting the principled check from the proxy.** Requiring `wouldFill` is structural: if the stated reason is contested because evidence indicates the data exists, a route to that evidence exists by definition. The length floor on `why` is acknowledged as the one arbitrary parameter, and deliberately not prose-matching — the heuristic trap this validator has hit twice.
- **The absence grammar is now complete**: dashed neutral means nothing measures this, dashed red means the stated reason for that is contested, solid red means a caveat or a seam. Red is warranted on the disputed case under the CLAUDE.md reservation — it is the only place a government's stated reason is contradicted by its own evidence, and it carries a consequence.
- **Grouping by kind on `/unmeasured` but not within a record.** Correct: one to three entries do not need hierarchy, and the taxonomy pays where the whole set is visible.
---

# Verification log — cycle 2026-08-01d (agriculture)

## The project's first REVERSED record
L-0066, the three farm laws, is the only complete propose-resist-repeal arc in the record and the first use of the `reversed` assessment. Ordinance 5 June 2020, enacted September 2020 by a contested voice vote with the division refused, repealed 29 November 2021 after roughly fifteen months of protest.

Its caveat forbids collapsing it into either available reading. Both "good reform defeated by vested interests" and "bad law defeated by farmers" have serious proponents and the evidence does not adjudicate. What the evidence does support: **the failure was as much of PROCESS and consent as of substance** — ordinance route during a pandemic, no pre-legislative consultation, refusal of a recorded vote, a State subject overridden. A reform that might have survived negotiation was lost to the manner of its imposition.

The record carries a **disputed absence**: SKM counted roughly 700 protest deaths; the government told Parliament it held no record and that compensation therefore did not arise. This is the second `reasonDisputed` entry in the dataset, and it is the same shape as the 2020 migrant deaths (L-0064) — a stated absence with a compensation consequence attached.

## The finding that reframes the whole domain
**P-48 / L-0068: the OECD Producer Support Estimate for India is NEGATIVE** — minus 14.5% of gross farm receipts over 2022-24, the most negative in a 54-country panel, with the implicit producer tax estimated near US$169bn (2022) and US$120bn (2023) against a consumer support estimate of positive 31.8%.

Indian farmers are on net implicitly TAXED. Fertiliser, credit and PM-KISAN subsidies are real, and they are more than cancelled by export bans, stock limits and marketing controls holding domestic prices below international reference levels. **This disciplines both partisan framings** and should be stated before either: neither "farmers are pampered" nor "the government abandoned farmers" survives it. `oecd-pse` carries the caveat.

## The instrument stopped, again
**P-46: no Situation Assessment Survey since 2018-19.** This is the third domain where the measuring instrument was discontinued or changed mid-period — after the withheld consumption survey (P-03) and the twice-broken employment series (P-02, P-39). The doubling-farmers'-income promise was set in SAS household-income terms and can only be judged in them; GVA is sectoral output and NAFIS uses a different definition, so neither substitutes. L-0067 is `failed` on the evidence to 2018-19 (about 16% real growth against a target requiring roughly 100%) and carries the absence for everything after.

Note P-46 also freezes `farmer-indebtedness` at 2018-19, since the same survey is its only source.

## New provenance records
P-44 NCRB split farmers from agricultural labourers (2014) · P-45 states reporting zero farm suicides · P-46 SAS discontinued · P-47 the 1.5x MSP claim uses A2+FL not C2 · P-48 agriculture's GDP share rose during COVID as a compositional artefact · P-49 PMFBY made voluntary in 2020.

**P-45 is the strongest lower-bound warning in the dataset.** States reporting zero farm suicides are not reporting; women farmers are recorded as housewives because land titles are not in their names; agricultural labourers were historically excluded. `farmer-suicides` carries a caveat stating every level is a floor, and that the robust signals are the post-2019 rise, the 2022 peak of 11,290, and the state concentration — not the national level.

**P-47 is the crux of the MSP dispute.** The 2018-19 claim of MSP at 1.5 times cost uses A2+FL, not the C2 basis the Swaminathan recommendation specified. CACP publishes both, so the ratio can be recomputed — the bridge exists and should be used.

## Six declared absences
Farm household income after 2018-19 · deaths during the farm law protest (disputed) · the current share of farmers selling at MSP, where the authoritative figure is an eleven-year-old committee estimate of 6% · whether Soil Health Card recommendations changed practice · PMFBY claim settlement timeliness · **the report of the post-repeal MSP committee**, constituted July 2022, chaired by the official who drafted the repealed laws, refused participation by the unions, and producing nothing in four years while spending about ₹53 lakh. Filed `withheld`.

## Scope widening
P-22 extended to `banking` and `macro`; P-46 to `banking`.

## Open queue additions
| Figure | Pin against | Priority |
|---|---|---|
| Wheat and rice procurement, annual by state | FCI monthly bulletins | High — concentration is a core finding |
| MSP against C2 cost, annual | CACP price policy reports | High — P-47 bridge |
| Agricultural credit, smallholder share | NABARD | High — the disbursement figure measures supply only |
| Fertiliser subsidy, actuals against BE | Department of Fertilisers | Medium |
| NCRB ADSI 2023 and 2024 full tables | NCRB | Medium — 2023-24 figures currently secondary |
| PMFBY loanee vs non-loanee split | PMFBY portal | Medium — P-49 bridge |
## 08-01e — Phase 9 — Rights and institutions
Correction 08-01e.1: courier instruction line removed from this entry after append; cycle letter added. No content change.

Authored: 2026-08-01. Author: conversation side.

### Drop contents
- `data/incoming/series-phase9.json` — 10 series, 33 points
- `data/incoming/provenance-phase9.json` — P-50 to P-56
- `data/incoming/ledger-phase9.json` — L-0074 to L-0089
- `data/incoming/pairs-phase9.json` — PR-14 to PR-16

Self-check before drop: cross-references resolve within the phase, IDs unique, even-handedness rule holds on all 15 scored records, `whatChanged` meets minimum length on all 7 provenance records, no stray non-Latin script.

### ID assumption — verify before merge
Next-ID values were assumed as L-0074, P-50, PR-14 from the running totals (73 ledger, 49 provenance, 13 pairs). Repository state was not observed. Confirm with a grep for the maximum existing ID in each file and renumber sequentially if the assumption is wrong. Series use semantic slugs, so they carry no numbering risk.

### Decision owed — meaning of `reversed`
`reversed` was introduced for the farm laws, where a government withdrew its own legislation. Two records in this phase were scored `reversed` on a different mechanism: electoral bonds (L-0077) and the IT Rules fact-check unit (L-0080) were both struck down by courts, not withdrawn.

Three options, in ascending cost:
1. `reversed` means the measure ceased to have effect, by any route. No code change; the two records stand as authored.
2. `reversed` means self-reversal only. L-0077 and L-0080 become `failed`. Two field edits, no code change.
3. Add `struck-down` as a distinct value. Breaks the exhaustive `Record` type until the UI is updated — which is the type doing its job, but it is a UI change.

L-0088 (the CEC Act) was deliberately **not** scored `reversed` under any reading: Parliament legislated within an invitation the Court expressly extended, rather than against a final holding. That line is the one to keep stable whichever option is chosen.

### Standing notes carried into the domain
- No external measure disciplines both readings here. There is no analogue to the OECD producer support estimate used in agriculture. Where the two sides rest on different facts rather than different weightings, records carry `differentFacts: true` and a note naming which facts each side relies on. Twelve of sixteen records are `contested`, and that concentration is a property of the domain, not of the authoring.
- Conviction rates are recorded with `higherIsBetter: null`. A low conviction rate is read by the government as due process functioning and by critics as evidence of misuse; the instrument does not adjudicate, so the series carries no directional colour.
- P-52 is the denominator record: any conviction rate rendered anywhere must show its denominator on the face of the number. 0.25 per cent and 93 per cent are the same enforcement record measured two ways, both from Parliamentary replies.

### Series breaks introduced
- `sedition-cases-registered` breaks at 2024 (IPC 124A to BNS 152, P-51). Not comparable across the seam.
- `rsf-press-freedom-rank` breaks at 2022 (RSF methodology change, P-50). Not comparable across the seam.

### Confidence and known weakness
`L-0089` (CAG report volume) is the weakest record in the drop and is marked `confidence: low` with a rendered caveat. Its numbers come from secondary relays of an RTI reply and of a review of tabled reports; neither primary document was pulled. The same weakness attaches to the `cag-union-audit-reports-tabled` series, all three points marked `approx`. Do not let this record carry weight until the primaries are retrieved.

### Revisit triggers
Records that should be re-scored on specific future events rather than on a schedule:
- L-0075 — a larger-bench outcome on the Vijay Madanlal review (ECIR supply, reverse burden).
- L-0086 — the Constitution Bench ruling on the DPDP amendment to RTI Section 8(1)(j). Currently `too-early`.
- L-0088 — pending challenges to the CEC Act 2023.
- L-0084 — finalisation of the Memorandum of Procedure, outstanding since December 2015.
- L-0087 — committee referral rate for the 18th Lok Sabha once the term produces a full figure.

Correction 08-01e.2: `uapa-conviction-rate` demoted to pending. Both points (2019, 2023) keep their periods and notes but carry `value: null` and `status: pending`, so the series still exists and the gap stays visible as owed. `denominator` remains null, which is still the accurate statement — the base is not known.

The denominator gate did its job. The correct response to catching an undefendable number is to stop rendering it, not to render it bare. The 2.2 per cent figure covers 2016-2019 in aggregate and its base is not stated in the sources reviewed; NCRB's standard rate uses cases in which trials were completed. Establishing which base applies means pulling the primary MHA reply, which is research rather than build.

The rule was sharpened in the same pass, not weakened. `denominator-stated` now fires only where a P-52 rate series actually renders a figure. A series whose every point is pending renders no rate, so there is nothing to mislabel — and firing there would have pushed toward inventing a base for a number that is not shown, which is the opposite of what the rule exists to prevent. Both halves are pinned by fixture: `denominator-unstated` proves it fires on a rendered rate with no base, `denominator-withheld` proves it stays silent on a withheld one.

---

# Verification log — cycle 2026-08-01f (differentFacts: criterion tightened, mark retrofitted)

## The criterion changed underneath the estimate, and the estimate was not good

The prior was four to eight records. The first pass, applying only (a) different quantities and (b) neither case contradicts the other, returned **17** — and put `L-0068`, the implicit taxation of farmers, on the shortlist. The OECD Producer Support Estimate disqualifies that record by construction: its Market Price Support component nets implicit price transfers against budgetary payments, which is exactly why India's PSE runs negative. Both sides' facts already shared a ledger, and the pass had not asked whether one existed.

Condition (c) was then added: no single measure exists, or could be constructed from available data, that places both sides' facts on one ledger. An unbuilt comparison fails; a declared-unmeasurable counterpart passes. Re-testing the 17 against (a)+(b)+(c) returned **5**.

**The four-to-eight prior was met only because the criterion changed underneath it.** Five is within the range, but the first estimate was 17 and it was wrong; the second is not a better estimate of the same quantity, it is an estimate of a different one. Recorded so the range is not later cited as having been predictive.

## What (c) draws that (a) and (b) did not

Different quantities are still commensurable. Facts of different **kinds** are not. Two economic cases almost always admit a ledger in principle — a fiscal incidence analysis, a case-disposition table, a water-productivity account, recovery per rupee of default — and the absence of that ledger is a gap in the instrument rather than a property of the argument. What survives (c) is a quantity against a court's ruling, against a constitutional process, or against a stated absence.

Six of the twelve that failed (c) failed on a ledger the record **itself declares unmeasured** — Jal Jeevan, MGNREGA, household electrification most sharply. Those are already modelled correctly as coverage/usage pairs with a declared absence, and that is the right treatment.

## Retirements, and why the flagship case was the wrong shape

- **L-0074 (PMLA)** — the record the mark was built for. It fails on the evidence in its own note: *"Both quantities come from the same Parliamentary replies."* A shared source and a shared disposition table is a common ledger. What it documents is a denominator dispute, which P-52 and the `denominator` field already carry — and carry better, because they render the base on the face of the number rather than only flagging that a mismatch exists.
- **L-0078 (press indices)** — caseAgainst records that the government does not dispute the underlying incidents and objects only to scoring design. One factual base, contested weighting. Carried by the T5 caveat.
- **L-0079 (agency action against media)** — per-action legality and the timing pattern are positions in one buildable table: agency actions against media outlets, coded by stance, date of preceding coverage and judicial outcome. Unbuilt, not incommensurable.
- **L-0076 (CBI consent)** — filed as HOLD rather than RETIRE, but the stated final state of six excludes it, so it was removed. Only its statutory-entitlement half resists (c); the case-record and party-distribution threads are commensurable. A mixed argument is not a basis mismatch.
- **L-0082 (sedition)** — mark removed and replaced with a revisit trigger. Effective scope of BNS 152 in operation is a single dimension both sides claim about; it cannot be built until a prosecution record accumulates, which makes the pass time-limited rather than structural. `revisitTrigger` added to the ledger schema for this.

## Cross-report finding, contrary to expectation

Records citing a provenance record with `directionOfBias: "disputed"` were reported separately on the expectation that a disputed measurement basis often coincides with a basis mismatch in the argument. It runs the other way. Of the seven in-scope records citing a disputed record, one reached the shortlist, four were second tier and two were excluded **precisely because** the disputed basis produces a head-to-head over one measure rather than a mismatch between two.

On this evidence a disputed measurement basis predicts argument-over-the-same-number more often than argument-from-different-numbers. That is the opposite of the stated expectation, and it follows from what a measurement dispute is: two parties contesting one instrument are, by construction, on one ledger.

## Final state

Six records carry the mark: L-0023, L-0028, L-0029, L-0064, L-0066, L-0077. Only L-0077 survives from the original six. Label is now "These cases don't share a common measure"; styling unchanged, still dashed umber and never red.

---

# Verification log — cycle 2026-08-01g (assessment values defined; two records rescored)

## The enum had no written meanings

Seven assessment values had been carried since phase 1 as bare enum entries. Nothing anywhere said what any of them meant. That is how `reversed` came to cover two different mechanisms — a government repealing its own law, and a court striking one down — without the type ever objecting, and it is why the phase-9 drop arrived with two records provisionally scored `reversed` and a DECISION PENDING note attached to each.

All seven now carry a one-line definition in `schemas/ledger.schema.json`. Prerequisite for the `/phase` work, which cannot aggregate values whose meanings are unwritten.

**`reversed` means the enacting authority withdrew or repealed its own measure.** Judicial invalidation is not reversed: a court striking a measure down is not the enacting authority changing its mind, and collapsing the two loses precisely what distinguishes a government retreating under pressure from a government overruled.

## Two records rescored

- **L-0077 electoral bonds** — `reversed` to `failed`. Struck down by a five-judge Supreme Court bench, February 2024.
- **L-0080 IT Rules fact-check unit** — `reversed` to `failed`. Struck down by the Bombay High Court, September 2024.

Both carry an `assessmentNote` recording the mechanism and stating that `failed` is the closest available value under the definition, not a positive claim that judicial invalidation and self-withdrawal are the same thing.

Observed after the change: **`reversed` has exactly one user in the whole ledger — L-0066, the farm laws.** Verified rather than assumed; the count before the change was three.

Noted in passing: L-0077's superseded `assessmentNote` said the question also affected "L-0086", which is scored `too-early` and is not a judicial-invalidation record. The reference appears to have meant L-0080. It is gone with the note it sat in, recorded here so the discrepancy is not rediscovered.

## Deferral, with a threshold

A distinct `struck-down` value was not added. Both members are rights-and-institutions records, and at two members the distinction may be an artefact of that domain rather than a general category — every domain would have to carry a value that only one uses.

`revisitTrigger` on both records states the condition: re-open when a **third** judicially invalidated record enters the ledger, and check whether they cluster by domain when re-testing. A third record from a different domain settles it as a general category; a third from rights and institutions confirms the artefact reading.

## What this exposes about the vocabulary

`failed` is now doing two jobs — the measure that did not work, and the measure a court removed. That is tolerable while it is stated on the record rather than inferred, which is what the `assessmentNote` is for. It is not tolerable silently, which is the state the enum was in until this cycle.

---

## 08-01h — Phase 9 correction — research debts closed

Both debts carried since the phase 9 authoring are closed. One of them was not the gap it was recorded as.

### UAPA — the series was mislabelled, not merely unlabelled

The primary is Rajya Sabha Unstarred Question 1045, answered 4 December 2024, with a state-wise and year-wise annexure compiled from NCRB.

NCRB's own published conviction-rate column runs 27.2 (2018), 29.2 (2019), 21.1 (2020), 39.7 (2021) and 18.2 (2022), on a completed-trial basis. The 2.2 per cent figure authored into `uapa-conviction-rate` at phase 9 is a different quantity: 132 persons convicted against 5,922 arrested, 2016 to 2019. The series was therefore carrying an arrests-basis ratio under a label reading conviction rate, an order of magnitude away from the official series of the same name.

The denominator gate caught this. It was landed to force a missing label onto a rendered rate, and holding the series at `pending` while the label was sought is what prevented a wrong figure rendering. Had the rule not existed, the number would have shipped and would have been wrong in the critics' direction — worth recording, since the instrument's failure modes are not symmetric only if it is watched for both.

`uapa-conviction-rate` is retired. In its place, raw counts are authored — cases registered, persons arrested, persons convicted — so that any ratio is derivable with its base visible, plus a single rate series carrying NCRB's basis explicitly in `denominator`.

P-57 records four bases in circulation for the same offence, all sourced to government replies, differing by up to a factor of fifty. A July 2022 reply giving 24,134 persons under trial does not reconcile against the annexure's arrest counts and is deliberately not authored as a series.

Two further findings from the same document. The Ministry confirmed that data on UAPA cases booked against journalists is not maintained by NCRB — a fourth declared absence, recorded at L-0083, which forecloses the government's defence as much as the critics' charge. And there is no provision for support or compensation to individuals acquitted under the Act, which sharpens both sides of L-0083 rather than one.

### CAG — confirmed to medium, with a new discrepancy

The RTI reply reported in March 2021 gives 14 Union reports in 2020 against 55 in 2015, with defence audits from eight in 2017 to zero in 2020. Pre-2014 context from the same reply: 39, 26, 34 and 37 for 2011 to 2014. The 400-report review gives five-year averages of about 40 for 2014-2018 against about 22 for 2019-2023.

Two things this changes. The peak falls in 2015, the first full year after the change of government, which is inconsistent with reading the series as a decline beginning at that change — that now sits in `caseFor`. And IA&AD staff strength fell from 48,253 in 2013-14 to 41,675 in 2021-22, with IA&AS officers from 789 to 553, which is a documented capacity mechanism rather than an inference. The critics' answer to it is also authored: capacity raises rather than settles why an audit body's staffing was allowed to fall.

P-58 records that the 2015 peak is given as 55 by one source and 53 by the other. Small in absolute terms, but it is the anchor of the decline claim.

`L-0089` moves `confidence` low to medium, not high. Both figures still reach the instrument through secondary reporting; neither primary has been retrieved. A `revisitTrigger` records what retrieval would resolve.

Correction 08-01h.1: `cag-union-audit-reports-tabled` tier T2 to T4. The series rests on an RTI reply relayed by a newspaper and a press-reported review of 400-plus reports, neither document retrieved. **T2 described the subject, not the evidence** — CAG is an official institution, but what is actually held is a press account of it.

The schema gap this exposed is not the one it looked like. `tier` is asserted in exactly one place per layer already: on the series itself, or on each entry of a ledger or provenance `sources[]`. A series `source` is a SourceRef, which carries no tier and is `additionalProperties: false`, so a tier inside it is **rejected, not silently ignored** — phase 9 proved that, failing with "unknown property tier, the schema is closed". Neither dropping tier from SourceRef nor gating agreement between two assertions applies, because there is only ever one assertion.

What actually swallowed the contradiction was the merge step, not the schema: the phase-9 and debts migrations stripped `source.tier` before validating, so the gate never saw the field it would have rejected. The contradiction was reported in prose and removed from the data path in the same pass. **A migration must not pre-filter fields the schema would reject** — dropping them silently converts a gate failure into a note nobody has to action.

The durable fix is the same one applied to the assessment values in 08-01g: `tier` was a bare enum in all three schemas with no written meaning, the labels living only in `lib/format.ts` and describing kinds of source without ever saying what tier grades. All three now carry the definition, with the operative rule first — **tier grades the document actually retrieved, not the institution the subject belongs to.**

Checked for other disagreements, since one was unlikely to be alone. **No source name is cited at two different tiers anywhere.** Two bare-domain URLs carry more than one tier, and both are correct rather than contradictory: `cag.gov.in` is T1 for retrieved CAG performance audits and T4 for the relayed RTI material, and `rbi.org.in` is T1 for the RBI's own framework agreement and KLEMS database and T4 for P-20, which is explicitly secondary reporting pending an unlocated primary circular. In both the tier grades the document and the URL is only the host, which is the rule working.

---

# Verification log — cycle 2026-08-01i (reasonKind defined; three reclassified, one removed)

## The fourth bare enum

`reasonKind` had four values and no written meaning anywhere. The schema description described the FIELD; the `why` description pointed at "the taxonomy already asserted", which turned out to be a bare list of the same four names; `lib/types.ts` repeated the field-level note; CLAUDE.md did not mention it. **The only per-value text in the entire codebase was `REASON_KIND_LABELS` in `components/marks.tsx` — display strings.**

So the boundary between not-collected and not-published, which decides whether a government is recorded as never having gathered something or as sitting on it, **was carried entirely by three words in a display label**: `collected, not published`. Not visible to whoever authors a record, and not stated anywhere an author would look.

This is the **fourth** enum found in this state. `assessment` was defined in 08-01g after `reversed` had silently covered two mechanisms. `tier` was defined in 08-01h.1 after a series was graded on its subject rather than its evidence. `reasonKind` is the same failure again, and the pattern is now established well enough to state as a rule: **an enum without written per-value meanings will be misapplied, and the misapplication will not surface until someone audits the values against their own text.**

All four now carry the definition, operative test first — the test is whether the data exists, asked in order.

## Three reclassified, on the new test

- **L-0069 #0, `withheld` to `not-collected`.** The only `withheld` in the dataset, and its own text said no report had been produced. Withheld requires an identifiable refusal of something that exists; there was nothing to refuse. **`withheld` now has zero users.**
- **L-0063 #0, `not-published` to `not-collected`.** PMKVY placement figures are published. What is absent is independent verification, which was never performed — nothing exists that could be produced under compulsion.
- **`household-electrification` #0, `not-collected` to `not-published`.** Periodic survey evidence exists in holders' hands (ISEP, IRES), so producibility under compulsion is met; what is absent is a released national series.

Each carries a line in `why` recording the reclassification and the test it turns on.

## One removed: a measure not yet due is not an absence

**L-0061 #0 deleted.** The labour codes came into force in November 2025 and the formal-work share is measured annually with a lag, so nobody has declined to gather anything — the instrument exists and runs. Filing it as `not-collected` asserted the opposite.

The gap moves to a `revisitTrigger` on the record, which is this instrument's mechanism for owed-but-not-yet-due, carrying the same route the absence named: PLFS written-contract and social-security shares for 2027 and 2028, and if no reading has appeared by then it becomes a genuine absence. A pending point was considered and rejected: it would have required inventing a future period and attaching it to `regular-wage-share`, which measures a different quantity.

## `never-defined` re-tested — 7 of 8 fail

Against the new definition, an unstudied but definable quantity is `not-collected`. **Only L-0084 survives**, and it survives strongly: no agreed Memorandum of Procedure exists, so the definition itself is the thing that is absent.

The other seven are collection gaps wearing a definitional label. **This includes `jjm-functionality`, which the earlier audit called unambiguously definitional — that reading was too generous.** The quantity is fully defined: the Mission standard is defined, and so is the denominator of all rural households. What is missing is a survey on that base, which is not-collected. Listed for decision, not reclassified in this pass.

## `disputeKind` added

The four disputed absences were not applying one criterion. Three assert that a factual claim of non-existence is contradicted by evidence — the same government elsewhere, or an independent count. The fourth contests a characterisation against a binding judicial direction, with the factual claim uncontested. Both are defensible readings of "the stated reason is contradicted", and nothing distinguished them.

`disputeKind` is now required when `reasonDisputed` is true, gated by an if/then in both schemas and proven to fire. L-0064 #1, L-0074 #0 and L-0066 #0 are `evidentiary`; L-0081 #0 is `normative`.

## Validator no longer restates the enum

The `reason-kind` error message hardcoded the four value names, which is how a message drifts from the contract it enforces: the schema gains a value and the gate keeps offering the old menu. It now reads the enum from `schemas/ledger.schema.json` and quotes it.

Correction 08-01i.1: seven `never-defined` entries reclassified to `not-collected` — `jjm-functionality` #0, `lfpr-female` #0, `L-0060` #0, `soil-health-cards` #0, `ujjwala-refills` #0, `L-0062` #0 and `L-0040` #0. Each records the reclassification and its test in `why`: the quantity is defined and the denominator is defined; what is missing is collection on that base, not an agreed definition.

**`never-defined` had one legitimate member in eight.** It was functioning as a general structural-gap tag — the value an author reached for when something was missing in a way that felt deeper than an unpulled figure. Seven of the eight were ordinary collection gaps. `L-0084` survives and now says on its own record why it does: the absent thing IS the definition, since no agreed Memorandum of Procedure exists, rather than a defined quantity nobody has measured. It is the only member of its kind and the reason is now legible on the record rather than inferable from an audit.

Counts. `not-collected` 15 to 22, `never-defined` 8 to 1, `not-published` 8 unchanged, `withheld` 0 unchanged, total 31 unchanged. Worth recording that `not-collected` read 15 both before AND after cycle 08-01i: its four movements that cycle cancelled exactly, so the two reclassifications into it were already reflected in the figure the previous entry reported.

A single-member kind renders correctly — the by-kind line filters on `.length`, so zero drops out and one reads "1 never defined". No grouping anywhere assumes a minimum member count; the only grouping in the codebase is that filter.

## A regression found while verifying, and fixed

Checking that the reclassified entries rendered turned up four declarations that **rendered nowhere at all**: `jjm-functionality` #0, `pmay-g-completed` #0 and both of `ujjwala-refills`. All four sit on series that are members of a coverage/usage pair.

The series page suppresses its own absence block when a pair view takes over, on the assumption that the pair pools them — which the pair did until phase 6c, when `CoverageUsageView` was rewired to the data layer and the pooling was lost. Between then and now, a declared absence on a paired series was silently invisible. That includes the PMAY-G occupancy absence, which is the case the `Absence` mark was generalised for in phase 4d.

Pooling restored, excluding any entry already standing in a counterpart slot — `metro-network` and `household-electrification` are each both the coverage series and the source of the absence occupying their own usage side, so pooling them again rendered the same declaration twice. Verified across all ten paired series carrying absences: each renders exactly once, from either side of the pair.

The lesson is narrower than the earlier enum findings and worth stating separately: **a suppression that depends on another component rendering the thing instead is a silent-failure design.** Nothing failed loudly when the other side stopped rendering it, and nothing in the gate could see it, because the data was correct throughout.

Correction 08-01i.2: rendered-reachability added as a gate rule, in `tools/reachability.mjs`, wired into `npm run build` and into `vercel.json`'s build command so a deploy runs it.

**It could not be a validator rule.** The validator sees `/data` only, so any check it makes about rendering must MODEL the render paths — and the failure this guards is exactly a divergence between the model and the components. A rule encoding "the pair view pools them" would have agreed with the assumption that broke and stayed silent for three phases. So it reads the built HTML.

**The specification as given would not have caught the bug it was written for.** Asked for corpus-wide equality between declarations in data and marks reachable in output, that is what was built first — and against a deliberately regressed build, with pooling disabled and the site rebuilt, it reported **185/185 reachable and passed**. `/unmeasured` lists every declaration in the instrument whatever the record pages do, so corpus-wide presence is satisfied by the index alone and can never see a per-record suppression.

Strengthened to **per-record**: a mark must render on the page of the record that declares it. Against the same regressed build it then failed with 4 of 185, naming `jjm-functionality`, `pmay-g-completed` and both declarations on `ujjwala-refills` — the exact four. Restored, rebuilt, silent again. Both runs were against real builds, not a model of one.

Two details that decide whether the check works at all. Script blocks are stripped before searching, because Next embeds the whole rendered payload as escaped JSON in a hydration script and a mark rendering nowhere is still present in the file. And the needle is normalised on both sides, so entity escaping cannot produce a false failure.

Fixtures, both directions per the standing rule. `tests/fixtures/reachability-hidden` carries a paired series whose own page omits its declared absence while an `/unmeasured`-shaped page still lists it — so the fixture *demonstrates* why the check is per-record rather than asserting it, and reports 1 of 2 because `notes` on the same record still passes. The live corpus is the quiet case: 185 of 185, skipped with a note when no build exists.

## Every mark suppressed by a competing view

Three sites, all on `app/series/[id]/page.tsx`, all delegating to a pair view. Each now guarded.

| mark | suppressed when | delegate | state |
|---|---|---|---|
| `caveat` | series is in a **contested** pair | `ContestedPairView` renders it | live. Not suppressed for coverage-usage pairs, and `CoverageUsageView` does not render a caveat — so those render from the series page. No gap, no double. |
| `notes` | series is in **any** pair | `CoverageUsageView` for a series-kind side; `ContestedPairView` | live on both paths |
| `unmeasured` | series is in **any** pair | `CoverageUsageView` pooled block and absence slot; `ContestedPairView` | live — this is the one that was broken |

`differentFactsNote` is not suppressed anywhere but is guarded too, since it is the same class of mark.

**One latent instance of the same shape, with no live instance today.** `pairsForSeries` matches a series that appears only as an `absenceFrom` target, so such a series would count as paired, lose its `notes` and `unmeasured` to suppression, and have no delegate — `CoverageUsageView` renders notes only for a side resolved to `series`. No series is currently absenceFrom-only; `metro-network` and `household-electrification` are each also their pair's coverage side, and PR-15's absence target is a ledger record, whose pages carry no pair view and suppress nothing. The reachability rule would catch it the moment one appears, which is the point of guarding a pattern rather than a case.

---

# Verification log — cycle 2026-08-02a (`reversed` corrected: a disclosure practice is not a measure)

First entry for 2026-08-02. No letter had been assigned for this date — the `/phase education`
run stopped at the drop, so stage 8 never ran and never opened one. Assigned here rather than
extending 08-01i, which closed on a different subject.

## The correction

`L-0094` (education drop, not yet merged) was authored `reversed` and is now `contested`.

The record is about the Ministry of Education tabling national teacher-vacancy totals routinely
from 2014, stopping after 07.02.2024, and continuing to furnish the quantity to the Standing
Committee — 368th Report, 08.08.2025 — while declining to give it in answer to a question. The
authoring stage read that as the enacting authority withdrawing its own measure and scored it
`reversed`, noting in `assessmentNote` that it was a new mechanism for the value.

**Ruling: it is not reversed.** `measure` means an intervention that acts on the world. Every
other `reversed` record withdraws something that was doing work. Here recruitment, funding and
the PRABANDH returns all continue; what stopped is an answer. A disclosure practice is not a
measure.

**Nor is it `failed`.** Neither side of the argument pair describes a failure: `caseFor` defends
the change as competent statistical practice, `caseAgainst` attacks it as evasion, and neither
says the Ministry tried something and could not. `contested` is what the pair actually supports.

## Why the definition changed rather than just the record

`reversed` was given a written definition on 2026-08-01, in cycle 08-01g, after it was found
covering two mechanisms — self-withdrawal and judicial strike-down. That definition named the
second mechanism and excluded it.

**Within two weeks it attracted a third: withdrawal of a disclosure practice.** That is the same
failure a second time, and it is diagnostic of the value rather than of either record.
`reversed` behaves as an attractor for anything that ends — the word describes an outcome shape,
so any record whose subject stopped will fit it on a first reading. The 08-01g definition
answered *who* withdrew, which does not discriminate between a policy and a publication, because
in both cases the answer is "the authority itself".

So the definition now states **what a measure is**, not only who withdrew it. One clause added,
in both places that carry it:

> `measure` means an intervention that acts on the world. Withdrawing a disclosure, a
> publication or a reporting practice is not reversal, even where the authority withdrawing it
> is the one that established it.

## Applied

| file | change |
|---|---|
| `schemas/ledger.schema.json` | clause added to the `reversed` line of the `assessment` description; the judicial-invalidation carve-out kept and re-worded to "not reversed either" |
| `lib/types.ts` | **`Assessment` had no written definition at all** — the union was bare. All seven values written in, `reversed` carrying the new clause. This closes a parity gap: the schema had definitions since 08-01g and the type never did. |
| `drops/.../records/ledger.json` | `L-0094` rescored `contested`; `assessmentNote` replaced with the ruling and its reason, removing an internal miscount ("a second mechanism", listing two) |

Only `ledger.schema.json` declares `assessment` — checked, not assumed. There is no second
schema to amend.

## Note for whoever tests this next

Two of nine enums have now needed their definitions widened after the first definition:
`reversed` here, and `differentFacts` in 08-01f. Both were widened because a *new record*
pulled at the boundary, not because an audit re-read the existing users. That is the preventive
half of the enum rule (spec §6, v2.2) working as intended at stage 3 — but it also means a
written definition is not a terminal state, and the ones written on 2026-08-01 should be
expected to move again.

`reversed` currently has one user in `/data` (`L-0066`) and, after this correction, none in the
education drop. Its written definition now excludes two mechanisms and admits one. If a fourth
candidate arrives, the question to ask is whether the value is doing enough work to keep.

**Threshold for revisiting `reversed` itself.** One user in `/data` (`L-0066`), none in the drop, two mechanisms excluded and one admitted. Re-open whether it earns its place if either a fourth candidate mechanism is excluded, or its user count reaches zero. **This is a threshold, not a plan to remove it** — a value with one correct user is doing work, and the test is whether it keeps rejecting more than it admits.

---

# Verification log — cycle 2026-08-02b (deferred: external review plan)

**DEFERRED. Nothing to action now.** This is a forward-looking note, not a record of work
done. It is here so the plan exists in writing before it is needed, and so the reasoning
behind the sequencing survives the gap between now and phase 15.

## What is already in place, and what it is not

Three of the four reviews below are partly implemented, as authoring-time discipline:

| review | already implemented as | where |
|---|---|---|
| adversarial | the both-cases rule — every scored record carries `caseFor` and `caseAgainst` | authoring time |
| methodological | the provenance layer | authoring time |
| factual | the tier and denominator gates | the build |

**What none of them provides is independence. The author marked their own work.** That is
the gap the plan closes, and it is not closed by making any of the three stricter.

## Model-based passes — a filter, not a clearance

Run a second model with **no history of this project**, cold:

- **Factual** — the manifest rows plus source URLs, asked to *verify independently* rather
  than to confirm.
- **Adversarial** — ledger records with **no context on how they were made**, asked for the
  strongest attack from each political direction **separately**.

**Frame every prompt as attack, never as confirmation.** A model asked "is this fair" says
yes. A model asked "find the worst record" finds things.

These are a filter. They do not clear anything.

## Human review — the two a model cannot cover

- **One domain economist per contested domain**, for methodology. This needs knowledge of
  Indian statistical practice that is not written down anywhere a model has read.
- **One Indian media lawyer**, for the enforcement, electoral bonds and press freedom records
  specifically: criminal defamation, identifiable individuals, IT Rules takedown exposure.

## Timing

- **Factual passes — incrementally, every few phases, on priority bands 1 and 2.** Do not
  accumulate unverified rows to check cold at the end.
- **Adversarial pass — needs the whole corpus. After phase 15.**
- **Methodological and legal — after 15, before the design lock at 17.** Corrections change
  data, and data changes rendering; doing it after the lock inverts that order.
- **Phase 16 is the exception.** The counterfactual engine produces model output that
  *resembles measurement*. It needs its own statistical review of the method **as it is
  built**, not a general pass afterwards. And its rendering must be visually distinguishable
  from measured data — **decide that before building, not after.**

## The one thing no per-record review catches

**Reviewers correct errors, not framing.** Every record can pass individually while the corpus
carries an implicit argument nobody chose.

So: commission one reviewer to read the whole instrument and answer only one question —
**what is this instrument's implicit argument, and is it the intended one.**

## Publication position

**"Machine-audited, not independently reviewed" is defensible published openly.** It stops
being defensible only if left implied.

---

# Verification log — cycle 2026-08-02c (phase-education stage 4: findings applied, two triggers closed)

Stage 4 self-check run against `drops/phase-education/records/`, which had never had one. Full
output in `records/SELF-CHECK.md`; trigger reasoning in `records/TRIGGERS.md`. **`/data` was not
touched and the drop is not merged.**

## TRIGGER A on L-0096 — CLOSED, no new `assessment` value

The question was whether the enum needs a value for a measure that ran to completion and whose
outcome was never published.

**Ruled: no.** `contested` fits on its written definition once it is clear what is being scored.
Both of L-0096's cases argue the documented **act** — scale and the absence of replacement supply
against retrospective regularisation, a reverse-engineered qualification duration and an input
reported as an output — and neither changes if the pass rate is published tomorrow. What is not
scored is whether the 31 March 2019 deadline was met, and that is already first-class: it is
`unmeasured[0]`, rendering as an absence under rule 4a.

A value meaning *cannot conclude* would describe the state of the evidence where the other six
describe a conclusion about the measure. That is the two-axes defect — the same objection that
refused a fifth `reasonKind` in cycle 2026-08-02a, one cycle earlier, in the same drop.

`assessmentNote` on L-0096 rewritten to state this. The value is now settled, not provisional.

## DEFERRED — is a REQUIRED `assessment` the right shape?

Recorded here because it is the more general thing trigger A surfaced, and it is **not opened now**.

Two of this drop's twenty ledger records use `contested` while stating in their own notes that the
vocabulary does not describe them, for unrelated reasons:

- **L-0096** — a measure whose outcome was never published.
- **L-0092** — *"The assessment vocabulary is built for measures with stated objectives and this
  record is a presentational act… The value may change on review if a value for presentational
  findings is added."*

Two records, two different complaints, one field. That is not evidence for two new values; it is
evidence that a **required** `assessment` is being demanded of record types it was not built for.
`assessment` is in `ledger.schema.json`'s `required` list, so "score nothing" is unavailable.

**The audit to run later:** should `assessment` be optional, or scopeable, for records that are not
measures with stated objectives? Do not resolve it inside a phase. `differentFacts` reached seventeen
records because a taxonomy was resolved in the pass that discovered it.

## TRIGGER D on L-0105 — CLOSED, `demography` not opened

**Ruled: do not open it.** Three reasons, any one sufficient.

1. Literacy is not population structure, so `demography` does not fix L-0105's bad
   `human-development` half — it trades one bad fit for another.
2. **First use fixes the boundary.** Opening a never-used value on a literacy record sets its
   attested meaning at "census output", which also covers housing, religion, occupation and
   disability. That is the failure the enum rule exists to catch, in its exact form.
3. **The premise about P-04 does not hold.** `P-04.affectsDomains` is already `["all"]`. Opening
   `demography` there would *narrow* its scope, not widen it. The two do not go together.

And it is downstream: if an `education` value is created, L-0105's second value becomes `education`
and the bad fit resolves without `demography` being touched. L-0105 stands as authored, its bad fit
still counted.

**Verified against the data, not the schema comment: `demography` is carried by 0 records in live
`/data` and 0 in the drop.** Whoever opens it should do so on a record whose subject *is* population
structure, and amend the definition to drop "NEVER USED" in the same commit.

## Corrections applied to the drop — nine stage-4 findings

Four material:

1. **L-0102 and P-65 — the 39 per cent was wrong by a factor of four.** "The Ministry of Education
   is 39 per cent of what the 4.12 per cent headline calls education" attached a Centre-only ratio
   to a Centre-plus-States headline. The correct denominator was sitting one line above it in the
   research table, headed **"Grand total, Centre — ₹2,38,419 cr"**, which is 1.02 per cent of GDP:
   ₹92,965 cr / ₹2,38,419 cr = 39 per cent. Against the 4.12 per cent all-India figure the Ministry
   is under a tenth. The record refuted itself two sentences later — *"States carry about
   three-quarters of the money throughout"*.
   **Both records re-authored, and the three occurrences in `parts/` corrected in place with a dated
   correction notice** (`08-RECONCILED.md` lines 211 and 343, `11-spending-literacy.md` line 126), so
   it cannot re-enter on a re-run from parts. Line 343 was a third occurrence not previously flagged.
2. **UDISE+ 2025-26 was graded two ways.** Four points `verified`, three `pending` with "Relayed at
   T3; UDISE+ 2025-26 was not retrieved" — same edition, same retrieval state. P-70 says the edition
   was never retrieved. **All seven now `pending`, all seven carrying the reason.**
3. **L-0109's headline re-derived**, because it terminated on two of the four wrongly-verified
   points. Now FY2014-15 → **FY2024-25**, both verified: government schools 1,107,101 → 1,013,322, a
   decline of 93,779 or 8.5 per cent, private schools up 17.8 per cent. The FY2025-26 figures are
   carried in the summary as held pending rather than dropped. **The finding survives on verified
   data** — direction, magnitude and the stock-versus-flow argument are unchanged — so `contested`
   stands and no stop was needed.
4. **`ugc-provision-gross` — REPORTED, NOT FIXED.** The FY2024-25 point (3,678.47) is the
   Consolidated Fund component, not gross, in a series titled "gross"; the series' own break note
   names that exact trap. No gross Actual exists for that year (gross is BE 4,500.00 / RE 5,048.59).
   Left as authored because every repair needs a ruling: hold the point, re-scope and rename the
   series, or carry a Budget Estimate in an Actuals series. **It also engages the open
   `status`-cannot-express-estimate-stage gap under P-66.** Awaiting a call.

Five wording corrections applied: the stale "between the two points" in the `teacher-vacancy-rate-ssa`
caveat (now named years); L-0095's KVS August-to-December mismatch (now 14.7 → 17.1, both at
31 December, with the 13.2 August figure explained rather than used); P-59 naming three instruments
and calling them four (pre-2017 NAS added); PR-17's undated NAS 2017 / ASER 2018 comparison (vintages
named, with a warning against carrying either to 2024); and L-0091's two closure windows merged into
one sentence (707-day never-fully-open stretch now separated from UNESCO's 775-day tracking window,
in the record and in the series caveat).

## P-64 → `teacher-vacancy-rate-elementary` — CHECKED, then added

Not auto-mirrored. `affectsSeries` asymmetry can be deliberate, so the question was whether P-64's
dispute actually reaches the series the teacher re-author created. It does, on two of three
components load-bearingly:

- **No maintained national statistic, only ad-hoc aggregates from unaudited state returns** —
  reaches squarely. The series' own caveat says the same thing, and its FY2023-24 note names both
  aggregates at elementary level (724,174 furnished to the Committee against 722,385 tabled in the
  House, the latter excluding Tamil Nadu).
- **The undefined and moving sanctioned-post base** — reaches, and carries weight. The series'
  `never-defined` absence is P-64's finding, and its FY2024-25 break *is* P-64's reclassification.
- **The 1,12,501-post divergence for 2023-24** — reaches only through the Tamil Nadu limb. P-64
  locates the bulk of that divergence in secondary (₹6,01,224 posts, a higher-secondary definitional
  question), which does not touch the elementary level. At elementary the two aggregates differ by
  1,789.

Added to `P-64.affectsSeries`. The partial reach of the third component is recorded here rather than
in the record, because the record is not wrong about it.

## Also corrected

`DOMAIN-FIT.md`'s `governance` series heading said 6 bad fits where its own rows and its own summary
line say 8. Heading corrected. The 37 series total and the 56 overall are unaffected and remain
authoritative.

## Domain fit re-counted after the teacher re-author

**56 of 90 — 62 per cent** (series 37/49, ledger 6/20, pairs 5/9, provenance 8/12). Was 56 of 89.
The re-author added exactly one series, `teacher-vacancy-rate-elementary`, filed `governance` — the
same quantity at elementary level as three vacancy-rate series already graded good, so it is a good
fit. The bad-fit count did not move; only the denominator did.

## Open queue additions

- **`ugc-provision-gross` FY2024-25 basis** — needs a ruling before merge. See finding 4 above.
- **L-0102's "0.64 to 0.40 per cent of GDP"** has no series behind it. It is correct against ABE
  Table 4's Centre education-departments column, but that column is not authored, and the record
  refs `edu-union-moe-gdp`, which reads 0.635 → 0.341 for the same years. Rule 6 wants the number
  traceable: author the column, or name its source inline.
- **Nine breaks anchored to periods carrying no point** — five ASER survey-gap breaks, three
  FY2025-26 end-seams, one `ugc-provision-gross` FY2017-18 start-seam. All legitimate under rule 5,
  but a mark on a row that does not exist is the absence-bug shape. **Stage 7 must confirm each of
  the nine renders on its own record's page.**
- **54 of 94 absences carry no `wouldFill`**, the field that seeds the verification queue.

## Still not done on this drop

Stage 5 (reconcile) has never run. Stage 4 has now run twice — before and after these edits — and
reports 90/90 valid, 0 duplicate IDs, 0 collisions against 299 live records, 0 dangling
cross-references, all 20 scored records carrying both cases, and 0 charset errors.

---

# Verification log — cycle 2026-08-02d (`education` domain value created; drop re-graded)

**SCHEMA CHANGE.** `education` added to the `domain` enum, and the drop re-filed against it.
`/data` was not touched and the drop is not merged.

## The value

Inserted **after `welfare`** in all four declarations, with its definition in the same commit per
the enum rule's preventive half:

> - education: schooling and higher education — learning, participation, teaching capacity and the
>   education system.

One sentence appended to the description block, after the welfare / human-development paragraph:

> Education holds both the delivery and the outcome of schooling; it is not split across welfare and
> human-development the way a scheme is.

The house bullet marker is `- `, so the definition line uses it.

**Declared in four places, byte-identity verified after editing rather than assumed:**

| declaration | values | description |
|---|---|---|
| `ledger.schema.json` `properties.domains.items` | 15 | sha256 `e8685758dc889709` |
| `series.schema.json` `properties.domain` | 15 | sha256 `e8685758dc889709` — identical |
| `pairs.schema.json` `properties.domain` | 15 | sha256 `e8685758dc889709` — identical |
| `provenance.schema.json` `properties.affectsDomains.items` | **16** | base + `all`, asserted equal to base enum + `["all"]` and base description + the `all` line |

The first three hash equal. Provenance was 15 values before this change and is 16 after.

## Re-graded ALL 90 records, not the 56

Adding a value invalidates the good grades too, so every record was re-derived per record by primary
subject. **85 of 90 changed value.** Full table appended to `records/DOMAIN-FIT.md`; the pre-existing
grading is left standing above it as the evidence that produced the value.

**The rule applied:** a series carries exactly one domain, so it is filed by the QUANTITY it
measures, not by the finding attached to it. That is the pre-existing grading's own criticism —
it called grading-by-finding "the tail wagging the dog" — applied consistently. Pairs inherit from
the series they join, as `DOMAIN-FIT.md` already states.

### The four teacher-vacancy series — all filed `education`

`-ssa`, `-elementary`, `-kvs`, `-nvs`, all previously `governance` and all previously graded good.
A vacancy rate is teaching capacity, which the definition names. `-kvs` and `-nvs` are the closest
call, since they exist in this drop only to show an RTE section 26 breach in the Union's own schools
— they still go to `education`, because what they measure is a vacancy rate. The institutional
reading is carried by L-0094, L-0095 and P-64, all of which retain `governance`. L-0095 now holds
`governance` with no series in that domain, which is expected.

### Retained deliberately, against the pull of the new value

- **`aishe-publication-lag` stays `governance`.** The quantity is the publication lag of a
  statistical product — the state's own conduct, not schooling. The one series in the drop where
  `governance` beats `education` on the quantity.
- **`contract-teachers-share-government` stays `employment`.** The quantity is a
  formality-of-appointment share; `employment` is "work, labour force, earnings and formality" in
  its own words. `education` names teaching capacity — how many teachers, not on what terms.

### Moved out of `welfare` on the new sentence

The three RTE-quota series move to `education`, because education holds the delivery of schooling
and is not split off into `welfare`. `rte-quota-reimbursement-approval-rate` is the closest call —
its quantity is a claims-approval rate, which is scheme finance — and the no-split rule decides it.

### L-0105

Second value is now `education`, replacing `human-development`. The bad fit resolves: literacy is
learning. **`demography` was not touched.**

### One correction of my own reasoning, recorded

PR-19, PR-21 and PR-23 were first held in `governance` on the ground that a coverage-usage pair's
subject is the state's publication conduct. Reversed for consistency: PR-20 has the identical shape
and had gone to `education`, and all three link to ledger records that retain `governance`. A pair
should not render in a domain where neither of its series lives.

## RESIDUAL BAD FIT — 6 of 90 (7%), from 56 of 90 (62%)

| Layer | Records | Residual | was |
|---|---|---|---|
| Series | 49 | **5** | 37 |
| Ledger | 20 | **0** | 6 |
| Pairs | 9 | **1** | 5 |
| Provenance | 12 | **0** | 8 |
| **Total** | **90** | **6** | **56** |

**The residual is one shape, not six problems.** `edu-spend-gdp-edu-depts`,
`edu-spend-gdp-all-depts`, `edu-union-moe-gdp`, `edu-union-be-shortfall-pct`, `ugc-provision-gross`
and PR-22 are all **fiscal quantities** — shares of GDP, a share of Budget Estimate, rupees crore —
correctly filed `education` because they are about education, while sharing no measurement base with
the learning tests and headcounts that now populate the value. `macro` is defensible for each and is
unavailable because a series carries exactly one domain. The ledger and provenance layers show what
the fix looks like: L-0102, P-65 and P-66 carry `macro` alongside `education` and are not forced.

**The precedent was not disturbed.** `health-exp-union` in live `/data` is `human-development`, not
`macro` — sector spending files under its sector. The education spending series now do the same, and
the precedent is honest for the first time because the sector value exists.

**`human-development` and `welfare` are now carried by 0 records in this drop.** The strongest
argument in the original grading — that filing here would quadruple `human-development` and redefine
it by weight of arrivals — is answered rather than mitigated.

## DEFERRED FINDING — `demography` remains 0-attested

Confirmed against the data, not the schema comment: **0 records in live `/data` and 0 in the drop**
carry `demography`, against a definition that says so of itself ("NEVER USED — no record or series
carries it, so its intended boundary is unattested"). The value was **not touched and not removed.**

A value that describes its own non-use is a standing instance of the enum rule's diagnostic half
with nothing yet to diagnose. Its first use will fix its boundary, so it should be opened by a
record whose subject *is* population structure — age structure, fertility, sex ratio, dependency,
migration — and the definition amended in the same commit. **Deferred, not opened.**

## LIVE `/data` SCAN — no back-filing debt

All 299 merged records scanned for a schooling subject across title, summary, unit, whatChanged,
framing and claimAtLaunch. Four matched; two are false positives and two are the excluded pair:

| record | verdict |
|---|---|
| `L-0007` National Food Security Act | **False positive.** "RTE 2009" appears in a list of UPA-era rights legislation — a mention, not a subject |
| `P-49` PMFBY became voluntary for loanee farmers | **False positive.** "auto-enrol farmers" — crop insurance |
| `L-0063` Educated youth unemployment | **Excluded by standing decision**, boundary settled |
| `graduate-unemployment` | The series behind L-0063; `employment`. Same exclusion |

**No merged record needs re-filing.** `education` arrives with zero back-filing debt: the whole
education corpus is this drop. The deferred back-fill pass has nothing in it unless the L-0063
boundary is reopened, which it is not.

## A gap in my own stage-4 check, found and closed

The stage-4 cross-reference pass validated `seriesRefs`, `provenanceRefs`, `ledgerRefs`,
`affectsSeries`, `correctiveSeries` and pair `a`/`b` series handles — and **missed
`b.absenceFrom` / `b.absenceIndex`**, the reference form the five coverage-usage pairs use to point
at an absence inside a ledger record. Checked now: **PR-19→L-0106[0], PR-20→L-0098[0],
PR-21→L-0094[0], PR-23→L-0109[0], PR-25→L-0104[0] — all five resolve, 0 dangling, every index in
range.** The check itself was incomplete, not the data. Recorded so the omission is not repeated.

## State after this cycle

90/90 valid against the amended schemas. 0 duplicate IDs, 0 collisions against 299 live records,
0 dangling cross-references of any of the seven forms, all 20 scored records carrying both cases,
0 charset errors. Stage 5 has still never run. Not merged.

---

# Verification log — cycle 2026-08-02e (two rulings applied; stages 4–7 run; stage 8 drafted, no PR)

`/data` untouched. **Not merged.** Drop is 91 records (50 series, 20 ledger, 12 provenance, 9 pairs).

## RULING 1 — `ugc-provision-gross`: BRANCH TAKEN = point dropped

The gross FY2024-25 figure was attempted and **is not retrievable.** `indiabudget.gov.in` did not
resolve on attempt, which is P-70's finding reproducing itself. The PRS analysis carries no
UGC-specific line. A search summary surfaced a department-level MUSK actual of about 1,000 crore for
FY2024-25, but that is the Department of Higher Education aggregate, not the UGC component, was not
retrieved from a primary document, and adding it to 3,678.47 would construct a figure — trigger B,
and precisely the arithmetic the record's own caveat exists to prevent.

**So: the FY2024-25 point is dropped. The series carries two points, FY2022-23 and FY2023-24, and
keeps its title.** The gap is declared as an absence with `reasonKind: not-published` — the money was
spent and the components exist in the accounts, so the quantity is producible; what does not exist is
a published gross total. The caveat now states why the series stops, so a reader does not read the
terminus as a collapse. The FY2023-24 point note records that it is the last published gross figure.

The series was **not retitled to fit the point.** A net point under a gross title is the same defect
as the retired UAPA conviction-rate series and the same one the three-GDP-regimes rule exists to
prevent; the break note was not sufficient, because a caveat cannot carry what the axis contradicts.

## RULING 2 — the ABE Centre education-departments column, authored

`edu-spend-gdp-centre-edu-depts`, 22 published points FY2000-01 → FY2021-22 plus four `pending`,
Centre-only, one basis, ABE Table No. (4) named in `notes`. Carries `P-10`, `P-65`, `P-66`; wired
into L-0102's `seriesRefs` and into P-65 and P-66's `affectsSeries`. Filed `education`.

**It trips P-10's rule as required rather than routing around it:** unit is `% of GDP` and the span
runs to FY2025-26, which contains the 27 February 2026 rebasing, so the `denominator-break` rule
demands `P-10` and the series carries it. The reverse link — adding it to `P-10.affectsSeries` —
is a `/data` edit and is **raised, not applied**.

**Reconciliation performed, and it holds:** Centre plus States equals the published narrow total
exactly in 18 of 22 years and differs by 0.01 in four (FY2004-05, FY2007-08, FY2010-11, FY2012-13),
which is independent rounding of three separately rounded columns. Stated in `notes`.

### A NEW ARITHMETIC ERROR, found only because the column was authored

L-0102 read: *"The Centre's own education-department spending fell from 0.64 to 0.40 per cent of GDP
across the same window, **the lowest in the twenty-two-year table**"*.

**0.40 is not the minimum.** FY2001-02 reads 0.37, and FY2002-03 and FY2003-04 read 0.39. 0.40 is the
lowest value **since FY2004-05**. Inherited from `parts/08.md:94` and `parts/08-RECONCILED.md:229`,
which both state it the same wrong way. L-0102 corrected; the series caveat states the true minimum
and the FY2001-02 point carries a note naming itself as the table's floor.

This is the second claim in this drop that was wrong because it had no series behind it, and both
were in the same sentence-pair of the same record. **The traceability gap was the defect, not a
symptom of it** — authoring the column is what exposed the error.

## STAGE 4 — the checker was fixed, not the instance, and it found two more

`tools/stage4-selfcheck.mjs` added; `SKILL.md` stage 4 rewritten to point at it and to state why.

The old check enumerated cross-reference forms from memory and got six of nine. Deriving the forms
from the schemas instead found that **`b.absenceFrom` was not the only one missed**:

| form | status |
|---|---|
| `series.breaks[].provenanceRef` | **was unchecked — 67 live instances in this drop** |
| `pairs.{a,b}.absenceFrom` + `absenceIndex` | **was unchecked** (the one already reported) |
| `pairs.{a,b}.competingAccountsFrom` | **was unchecked** |

Two carry a companion the id alone does not validate: `absenceIndex` must be in range for the
target's `unmeasured[]`, and `competingAccountsFrom` requires the target to actually carry
`competingAccounts`. A resolving id with a bad index is a dangling reference that looks fine.

**The fix is not the enumeration.** `auditRefFormCoverage` reads the four schemas and fails on any
reference-shaped field the enumeration does not mention, so a tenth form breaks the check on the next
run instead of going silently unvalidated. Both new behaviours have negative fixtures per Rule 2 — an
invented `relatedPolicyRef` fires the coverage audit, a `provenanceRef` pointed at `P-999` fires the
resolver, and both go quiet on the restored corpus.

**Re-run across all 91: 11 forms, 367 individual references, 0 dangling, 0 errors.** So no other
unenumerated form exists, and none of the three newly-covered forms was carrying a broken reference.

## STAGE 5 — reconcile. THREE SUBSTANTIVE FINDINGS

The drop had never been run through `tools/lib/integrity.mjs` — only JSON Schema. Doing so surfaced
**6 errors that would have failed the stage-6 gate.**

IDs first: live true maxima are L-0089, P-58, PR-16. The drop runs L-0090→L-0109, P-59→P-70,
PR-17→PR-25, each contiguous and each starting above the live maximum. No renumbering needed. No
series id collides with the 136 live ids.

**1. `P-52` was carried by three education-spending series and does not belong to any of them.**
P-52 is *"PMLA conviction rate: the denominator dispute"* — `affectsDomains: [governance]`,
`affectsSeries: [ed-pmla-cases-registered, ed-pmla-convictions]`. It appeared on the education
spending series as a **bare reference mentioned in no note, caveat or bridge**. Education spending and
PMLA prosecutions share nothing but the word "denominator". The relevance rule — a dispute record must
cover the record's own domain — rejected it correctly, and would have rejected it before the re-grade
too, since `human-development` is not `governance` either. **This is a pre-existing defect the
re-grade did not cause and stage 5 has now caught.**

Removed from all three. **This is not disarming a guard:** the only rule P-52 activates is
denominator-stated, and all four spending series carry an explicit `denominator` field, so the
requirement is met on the merits. The likely origin is an author reaching for "the denominator
dispute" as a concept and taking the record that carries that name — worth knowing, because using a
provenance record to trigger a gate rule it has no subject-matter connection to would be an abuse of
the reference even where the rule then passes.

**2. `P-64` did not cover `employment`, and its own notes do.** `contract-teachers-share-government`
was deliberately retained in `employment` during the re-grade; P-64 covers it but listed only
governance, federalism and education. P-64's own notes carry the contract-status finding — the
`Nature of Appointment` field collected for every teacher and published nowhere — so `employment`
was added to its `affectsDomains`. Additive and honest; the alternative, moving the series to
`education`, would have been re-filing a record to satisfy a rule.

**3. `P-68`'s back-link ran one way.** P-68 lists `aser-std3-reading` and `aser-std5-reading` in
`correctiveSeries` — they are the demonstrated-reading counterpart to self-declared literacy, which
is the record's whole finding, and PR-24 pairs them — but neither series carried P-68. Added. Same
class as the P-64 omission found last cycle, and the third one-way link in two cycles.

**After reconciliation: 0 errors, 70 warnings**, of which 55 are `unmeasured-route` (absences with no
`wouldFill`, already on the open queue), 7 `term-window`, 5 `break-span` (the documented-ahead seams
already handed to stage 7), 2 charset, 1 `absence-dispute`.

## STAGE 6 — gate run, MERGE NOT PERFORMED

Run against the repo as it stands: schemas amended, `/data` untouched, drop not merged.

```
npm run validate        VALID — 0 errors, 42 warnings (pre-existing)
npm run validate:selftest   18/18 rules fire; misspelled schema keyword fails compilation
npm run typecheck       clean
npm run build           succeeded, 314 pages
```

The enum addition is backward-compatible, so the live corpus still validates untouched.

## STAGE 7 — reachability: RAN, AND DOES NOT COVER THE DROP

```
reachability OK — 185/185 declared marks reachable on their own record page (314 pages scanned)
  unmeasured 31/31 · caveat 33/33 · notes 115/115 · differentFactsNote 6/6
```

**Stated plainly: this is the LIVE corpus only.** The drop is not merged, so its 91 records render no
pages and **not one of the drop's marks has been proved reachable** — including 94 absences, every
caveat written this phase, and the nine breaks anchored to periods carrying no point, which are the
class most likely to render nowhere. Stage 7 must be re-run after merge. Production was not checked:
nothing has been deployed.

## STAGE 8 — log drafted, PR NOT OPENED

This entry is the log delta. **No PR was opened: the phase number is not settled**, and a PR title
that names the wrong phase is not correctable by editing the branch.

## RAISED FOR `/data`, NOT APPLIED

- **`P-10.affectsSeries`** should gain the four `% of GDP` education spending series once merged.
  The forward links exist; the reverse link is a `/data` edit.
- **`P-52`** carries no note explaining why it was ever attached to education spending. If it was
  attached deliberately, that intent is now removed and should be restated properly.

## STILL OPEN

- 55 absences carry no `wouldFill`.
- 7 ledger records whose `date` sits outside their declared `term` — L-0095, L-0098, L-0101, L-0102
  and three others. Warnings, not errors, and plausibly correct authoring (the date is the
  provision's commencement, the term is when it is assessed), but unreviewed.
- The residual 7 of 91 sector-fiscal records, recorded in `DOMAIN-FIT.md` as standing evidence for a
  deferred series-cardinality question. **Not to be re-filed.**

---

# Verification log — cycle 2026-08-02f (PHASE 10 — education, merged and deployed)

**Education is phase 10.** 91 records merged into `/data`; unified corpus 390 records.

Phase numbers in this project are **execution order**, and are already load-bearing as such: §8 of
the spec dates the trigger set to "phase 9", §2 dates the domain-versus-phase distinction to "phase
7", and the absence-suppression regression is described as having survived "three phases". Those are
dated claims about when something entered the instrument, so the number is not decoration and is not
freely reassignable after the fact.

## ROADMAP RENUMBER — NOT PERFORMED, AND NOT POSSIBLE

The instruction was to renumber the roadmap in this commit: Kashmir part 1 → 11, part 2 → 12,
everything after shifting by one, the list running to nineteen.

**There is no roadmap document in this repository, and git history shows there has never been one.**
Searched the full tree excluding `node_modules`, `.next` and `out`, and searched every path ever
added, renamed or deleted across all branches. "Roadmap" occurs only in the project's own name
("India Roadmap Instrument") in `README.md`, `package.json`, `CLAUDE.md`, `app/layout.tsx` and a
validator comment. There is no phase list, no Kashmir part 1 / part 2 entry, and nothing enumerating
phases to nineteen.

**Nothing was created to satisfy the instruction.** A canonical phase list is the sort of artefact
other work would immediately depend on, and inventing one — with an ordering nobody stated — would
manufacture exactly the false authority the instrument exists to avoid. The renumber is carried
forward as an open item: if the roadmap lives outside the repository, it was not renumbered here.

Phase 10 is nonetheless recorded, in this entry and in the PR.

## §7 — CHECKED. NO DEFECT, AND NO SUCH RULE

**§7 of `docs/phase-command-spec-v2.md` is "Model routing".** Its text is unchanged: nothing was
edited in it this cycle, and nothing in it is keyed to phase numbers, so the renumber could not have
disturbed it even had one occurred.

**There is no "Fable rule" in §7 or anywhere else.** `fable` occurs exactly once in the repository,
at `docs/phase-command-spec-v2.md:168`, as one of four selectable model values — "Selectable values
in the current environment are `sonnet`, `opus`, `haiku`, `fable`." It is not a rule, it is not keyed
to domain properties, and it carries no roadmap marks.

**§7 names no phase numbers at all**, so there is nothing to rewrite in terms of domains. The three
phase-number mentions in the spec all sit elsewhere and are all historical provenance:

| line | text | verdict |
|---|---|---|
| 6 | "Evidence base: phase 9 and its seven follow-on cycles" | dated claim, must not be renumbered |
| 42 | "Phase 7 produced eight records filed across seven domain values" | dated claim, must not be renumbered |
| 182 | "Every trigger derives from phase 9. Expect 10–12 to add more." | still correct: 10 is education, 11–12 Kashmir |

Renumbering any of those would falsify a claim about when something happened, which is the specific
harm the numbering discipline exists to prevent.

## FINDINGS OF PHASE 10

### 1. Three one-way back-links, and the check that now exists

`P-64` did not list `teacher-vacancy-rate-elementary`; `P-64` did not carry `employment` while its own
notes carried the contract-status finding; `P-68` listed two ASER series in `correctiveSeries` that
did not carry it back. All three were found by reading, not by a gate. `integrity.mjs` checks
provenance → series and **not** the reverse, which is the direction all three were in.

**Bidirectional check added**, report-only. Only series ↔ provenance is genuinely two-way; the other
forms have no reverse field, so they are out of scope by construction, not omission. **Asymmetry is
frequently correct** — `P-04` scopes to `all` and cannot list every series it touches — so it names
candidates and never mirrors. Counts: **drop 0, live pre-merge 68, unified 83.** The drop reads 0
only because its three were fixed by hand; the 83 are almost entirely pre-existing.

### 2. `P-52`, and an orphan check that is weaker than the problem it was built for

`P-52` — *"PMLA conviction rate: the denominator dispute"*, scoped `[governance]` — was carried by
three education-spending series, explained in no note, caveat or bridge. Removed at stage 5.

**Orphan check added**, report-only: **drop 83, live pre-merge 192, unified 275.** Recorded honestly:
**this check has low specificity and did not find P-52.** House style discusses a dispute in prose
rather than naming its id, so it flags correct references at about the same rate as wrong ones —
and `P-52` appears in its own output six times, including against `ed-pmla-cases-registered` and
`ed-pmla-convictions`, the two series it legitimately covers. What actually caught `P-52` was the
`ref-relevant` domain rule already in `integrity.mjs`. The count is a prompt, not a defect list.

### 3. The stage-4 checker's missing reference forms — three, not one

The hand-written check enumerated the cross-reference forms from memory and got six of nine. It
missed **`pairs.{a,b}.absenceFrom`** (the one first reported), and deriving the forms from the
schemas instead found two more: **`series.breaks[].provenanceRef`, with 67 live instances in this
drop**, and **`pairs.{a,b}.competingAccountsFrom`**. Two carry a companion the id alone does not
validate — `absenceIndex` must be in range, `competingAccountsFrom` requires the target to have
`competingAccounts` — so a resolving id with a bad index is a dangling reference that looks fine.

The fix is not the enumeration. `auditRefFormCoverage` reads the four schemas and fails on any
reference-shaped field the enumeration does not mention, so a tenth form breaks the check on the next
run rather than going silently unvalidated. **11 forms, 367 references, 0 dangling across all 91.**

### 4. The seam check was wrong twice before it was right — both Rule 1 instances

Reachability's guarded classes are absences, `notes`, `caveat` and `differentFactsNote`. **Breaks are
not among them**, so the ten breaks anchored to periods carrying no point had to be checked directly
against built HTML.

- **First defect: a page-path assumption.** The check looked for `out/series/<id>.html`; pages are at
  `out/series/<id>/index.html`. It reported **0/10** — every seam missing — which read as a
  catastrophic data failure and was a bug in the reader.
- **Second defect: an ASCII hyphen tested against a rendered en-dash.** With paths fixed it reported
  **7/10**, the three failures being `FY2025-26` sought in a page rendering `FY2025–26`. This is the
  precise trap Rule 1 names — *normalise the needle on both sides* — walked into anyway.

Corrected, with the needle normalised and **a negative and a positive control on the same page**, the
answer is **10/10**: every no-point seam renders both its note and its period, as
`series ends at break · FY2025–26 · …`, which is rule 5's prescribed end-seam.

**The lesson is the one that generalises: a check without controls reporting a clean pass is not
evidence.** Both of these defects would have produced a confident number. The first produced a
confident wrong alarm; the second a confident wrong pass on three of ten. Only the controls
distinguish "the mark is absent" from "the reader cannot see it".

### 5. `unmeasured-route` — 55 of 97, and the split is definitional

55 of the drop's 97 absences carry no `wouldFill`. The rule warns rather than errors because "some
things are unmeasured precisely because no instrument for them exists". That is true of some of them
and false of the rest, and which is which follows from `reasonKind`'s own written definitions:

| reasonKind | n | verdict |
|---|---|---|
| `not-collected` | 20 | **normal by construction** — nothing exists that compulsion could produce |
| `never-defined` | 10 | **normal by construction** — no agreed definition, so no instrument |
| `not-published` | 23 | **self-contradicting** — the value asserts producibility under compulsion, then names no producer |
| `withheld` | 2 | **worse** — the value requires an identifiable refusal, so a holder and a request are already documented |

**30 normal, 25 self-contradicting.** One correction to the framing this was raised under: the
invisibility is **to the project, not to the reader**. All 97 absences render — that is what 128/128
proves. What the 55 fall out of is the internal verification queue that `wouldFill` seeds.

### 6. Residual domain fit — 7 of 91, one shape

Six sector-fiscal series plus `PR-22`: shares of GDP, a share of Budget Estimate, rupees crore, all
correctly filed `education` on subject while `macro` is equally right on unit and unavailable because
a series carries exactly one domain. `health-exp-union` has sat in `human-development` under the same
constraint since long before `education` existed, which is what makes this structural rather than a
phase artefact. **Standing evidence for a deferred series-cardinality question. Not to be re-filed,
and not opened here.**

## GATE AND DEPLOY

Merged corpus: `validate` VALID 0 errors / 112 warnings · `validate:selftest` 18/18 ·
`typecheck` clean · `build` 396 pages · **`reachability` 397/397**, from 185/185 pre-merge.

Verified per class, not by aggregate: absences 31 + 97 = **128**, matching 128/128; caveats
33 + 66 = **99**, matching 99/99. Plus **10/10** no-point seams against built HTML with controls.

## NEXT CYCLE — SCOPED, NOT STARTED

The 25 `not-published` / `withheld` absences lacking `wouldFill`. Both kinds entail a route by their
own definitions, so the condition is derivable: **`unmeasured-route` should become an ERROR for those
two kinds and stay a warning for `not-collected` and `never-defined`.** Scope across the whole corpus,
not the drop — the pre-existing live warnings predate the rule being noticed and will contain the
same shape. Routes must be real: a named holder and a named instrument, RTI or research-access
request. **A placeholder route is worse than none, because it enters the queue and cannot be worked.**

## Addendum to 2026-08-02f — PRODUCTION VERIFICATION

Deployed. `dpl_GWjv2MYBEeecmehDEJ1jxtCHhia4`, target production, commit `bfab8ad`, state READY,
aliased to `india-government.vercel.app`. PR #1 was merged to `main` to trigger it, which is how
every prior production deploy in this project has happened.

**The production build ran the gate itself.** From Vercel's own build log, not a local run:

```
> npm run reachability
reachability OK — 397/397 declared marks reachable on their own record page (396 pages scanned)
  unmeasured 128/128 · caveat 99/99 · notes 163/163 · differentFactsNote 7/7
```

**Production HTML was then fetched over the wire and checked**, at
`https://india-government.vercel.app`. Production is behind Vercel SSO — an unauthenticated request
302s to `vercel.com/sso-api` — so this was done in an authenticated browser, as §7 requires. No
attempt was made to bypass the authentication.

All 70 record pages the phase introduces were fetched same-origin with credentials, parsed with
`DOMParser`, `<script>` elements removed, and every declared mark counted on the page that declares
it:

| class | production |
|---|---|
| absences (`.absence-kind`) | **97 / 97** |
| caveats (`.caveat-block` \| `.caveat-inline`) | **66 / 66** |
| break seams (`.seam`) | **67 / 67** |
| **total** | **230 / 230** |

70 of 70 pages fetched, zero HTTP failures, zero shortfalls.

**Controls carried, because the seam check was twice wrong before it was right:**

| control | required | observed |
|---|---|---|
| positive — "Gross enrolment ratio" on its own page | TRUE | TRUE |
| negative — "Kendriya Vidyalaya Sangathan" on that page | FALSE | FALSE |
| end-seam period `FY2025-26` renders | TRUE | TRUE |
| end-seam note "Second structural break" renders | TRUE | TRUE |

The negative control is the one that matters: without it, a reader that silently matched everything
would have reported 230/230 just the same. **A check without controls reporting a clean pass is not
evidence** — this phase produced two separate instances of exactly that, a page-path assumption
reporting 0/10 and an ASCII hyphen against a rendered en-dash reporting 7/10.

Note the seam total: **67, not 10.** The ten anchored to periods carrying no point are a subset;
production renders every declared break on its own series page.

---

# Verification log — cycle 2026-08-02g (validator hardening; GATE IS RED, not deployed)

No `/data` authoring. Four validator changes, one of which turns the gate red on purpose.

## CORRECTION to cycle 2026-08-02f

That entry states the orphan check "did not find P-52" and calls it "recorded honestly: this check has
low specificity and did not find the very reference it was built for."

**The second half is wrong.** It was inferred, not tested — from output taken *after* P-52 had already
been removed at stage 5, so there was nothing left for the check to find. Tested this cycle against the
reconstructed pre-removal state, **the check fires on P-52.** The specificity finding stands; the
sensitivity claim does not. See item 2.

## 1. REFERENCE FORMS ARE NOW DERIVED, NOT ENUMERATED

The hand list was short by three. A hand list will always be short by the forms nobody remembered, so
the enumeration is gone. `deriveRefForms` reads each layer's id **contract** from its own schema
(`^L-\d{4}$`, `^P-\d{2}$`, `^PR-\d{2}$`), then walks every string in every record and asks whether that
string IS an id. Any field path whose values are ids is a reference form. It never names a field.

**A finding worth stating on its own: the schemas do not mark reference fields as references.** Only
`id` carries a `pattern`. `seriesRefs`, `provenanceRefs`, `affectsSeries`, `correctiveSeries`,
`ledgerRefs`, `breaks[].provenanceRef` and the pair-side fields are bare strings with no pattern and,
in most cases, no description. Nothing in the contract says "this holds an id" — which is why the
obvious schema-only derivation cannot work and derivation has to run off the id contracts plus
observed values. If the schemas ever mark reference fields explicitly, this gets simpler and stricter.

**Derived: 12 forms, 1,088 references corpus-wide.**

| layer | path | resolves to | n |
|---|---|---|---|
| series | `provenanceRefs[]` | provenance | 249 |
| series | `breaks[].provenanceRef` | provenance | **111** |
| ledger | `seriesRefs[]` | series | 204 |
| ledger | `provenanceRefs[]` | provenance | 97 |
| provenance | `affectsSeries[]` | series | 155 |
| provenance | `correctiveSeries[]` | series | 14 |
| pairs | `provenanceRefs[]` | provenance | 34 |
| pairs | `ledgerRefs[]` | ledger | 16 |
| pairs | `a.series` / `b.series` | series | 24 / 13 |
| pairs | `b.absenceFrom` | series \| ledger | **10** |
| pairs | `b.competingAccountsFrom` | provenance | **1** |

**The three previously-missing forms are confirmed** (bold above) and now validated.
**No fourth was found:** every derived form maps into the corrected hand list, and the hand list
contributes nothing derivation missed except the two below. `derived ⊇ hand` holds.

### THE FINDING THE ASSERTION ASKED FOR — two hand-listed forms are NOT derivable

`pairs.a.absenceFrom` and `pairs.a.competingAccountsFrom` are legal per `pairs.schema.json`'s `side`
definition and have **zero instances**, so there is no value for derivation to recognise. **They were
retained, not dropped.** Derivation is blind to a legal form nobody has used yet; "no instances" is a
fact about today's data, not about the contract.

The fragility is quantified: **`pairs.b.competingAccountsFrom` has exactly ONE instance corpus-wide.**
Delete that pair and a legal reference form becomes invisible to derivation. So the old list survives
as a FLOOR, `assertDerivedCoversFloor` reports anything derivation could not reach, and the two methods
cover each other's blind spots — derivation catches forms nobody enumerated, the floor catches forms
nobody has used.

## 2. ORPHAN CHECK — determination (b), RENAMED

**Determined empirically, not by argument.** The pre-removal state was reconstructed —
`edu-spend-gdp-edu-depts` with `provenanceRefs: [P-10, P-52, P-65, P-66]` — and the rule run against
it. It flagged `P-52`. **It is not blind to its motivating case.**

But on that same record it also flagged **P-65**, which is a correct reference. The rule cannot isolate
P-52. So it does not find unconnected references; it finds references the record's own prose never
names by id, which is a **documentation** property and not a correctness one.

**Renamed `ref-unexplained`.** Five samples of what it actually finds — all five are correct
references, which is the point:

| record | cites | provenance | reading |
|---|---|---|---|
| `PR-01` | P-22 | Evidence base shifts from survey to scheme MIS | correct; not named by id in prose |
| `PR-21` | P-64 | Teacher vacancies: two irreconcilable aggregates | correct; not named by id in prose |
| `school-enrolment-total-udise` | P-04 | Census 2021 not conducted | correct; not named by id in prose |
| `ed-pmla-cases-registered` | P-52 | PMLA conviction rate: the denominator dispute | correct — **P-52's own series** |
| `credit-gdp-peer` | P-09 | Peer-country GDP rebasings and WDI vintage drift | correct; not named by id in prose |

The fourth row is the argument in one line: the check flags P-52 against the two series P-52 exists to
cover.

**The P-52 shape is described separately and is already gated.** It is a *domain-coverage* failure:
`P-52.affectsDomains` is `[governance]`, the series are `education`. `ref-relevant` in `integrity.mjs`
fires on it as an **error**. That is the rule that caught it and the rule that will catch the next one.

Counts unchanged by the rename: **drop 0 (merged), unified 275.**

## 3. BIDIRECTIONAL BACK-LINKS — TRIAGE ONLY, NOTHING ADDED

**No reverse link was added.** Table at `docs/backlink-triage-2026-08-02.md`, 83 candidates with the
evidence for each reading.

**63 by design · 20 likely omission · 0 needs a human.**

The by-design readings rest on stated evidence, not on assertion:

- **`affectsDomains: [all]`** — the record reaches everything and enumerating is unbounded. P-04
  (Census 2021 not conducted) is cited by 11 series and lists a handful; that is the value working.
- **Empty `affectsSeries`** — the record scopes by domain, not by series.
- **Cited-count ≫ listed-count** — a broad-scope dispute used as a lens. P-22 is cited by 30.

The 20 likely omissions share a shape: the provenance lists *siblings* of the citing series and covers
its domain, so nothing distinguishes the one left out — e.g. `soil-health-cards` → P-22, which lists
six siblings including `ujjwala-connections` and covers `welfare`.

**Mass-mirroring would have written 63 false links.** That is why the output is a table.

## 4. `unmeasured-route` — SEVERITY DERIVED FROM `reasonKind`

Changed in `tools/lib/integrity.mjs`. **Error** for `not-published` and `withheld`, **warning** for
`not-collected` and `never-defined`. The condition is derivable, not a policy choice: both erroring
values assert in their own written definitions that the data exists — `not-published` is "producible
under compulsion", `withheld` "requires an identifiable refusal", so a holder and a request are already
established. An absence on either with no `wouldFill` contradicts the value it declares.

The other two stay warnings because for them no route may exist, and demanding one invites a
placeholder — **worse than none, because it enters the verification queue and cannot be worked.**

**Both halves pinned by fixture** (trigger C):

| fixture | asserts | result |
|---|---|---|
| `tests/fixtures/unmeasured-route-producible` | fires on `not-published` and on `withheld` | 2 errors, 0 warnings |
| `tests/fixtures/unmeasured-route-uncollectable` | stays quiet on `not-collected` and `never-defined` | 0 errors, 2 warnings |

Wired into `selftest.mjs` — the error half in `ISOLATED` with a distinct `expect` per branch, the
warning half in `MUST_STAY_CLEAN`.

### CORPUS-WIDE COUNT — THE GATE IS RED

**26 errors, and every gate error in the corpus is this rule.**

| | errors | warnings |
|---|---|---|
| drop (education, phase 10) | **25** | 30 |
| live (pre-existing) | **1** | 5 |
| **total** | **26** | 35 |

By `reasonKind`: `not-published` 24, `withheld` 2.
By file: `data/ledger/education.json` 14 · `data/series/education.json` 11 ·
`data/ledger/rights-institutions.json` 1.

**The expectation that live would carry the same shape at scale did not hold.** Live contributes
exactly **one** error — L-0081, the internet-shutdowns record — because live absences are
overwhelmingly `not-collected`, which is a warning. The 25 are the education drop's, as predicted.
Total warnings rose 42 → 86, but that is the whole corpus after a 91-record merge, not new noise.

**`validate:selftest` now fails at its first assertion**, which is "/data validates clean". That is the
red gate reported from inside the selftest, not a fixture defect: both fixture halves were verified
directly with `--data`.

## NOT DEPLOYED

`npm run validate` exits non-zero, so `npm run build` cannot run and nothing was pushed to production.
Production remains on `bfab8ad`, cycle 2026-08-02f, which is green. Cycle 2 clears the 26.

---

# Verification log — cycle 2026-08-02h (ref-unexplained out of the gate; a deferred schema finding)

Gate stays red at 26 `unmeasured-route` errors. Nothing deployed. Production remains on `bfab8ad`.

## `ref-unexplained` is out of the gate, and always was

Confirmed rather than assumed: it lives in `tools/stage4-selfcheck.mjs`, which `npm run validate`
never loads — the gate imports only `lib/load`, `lib/schema` and `lib/integrity`. Neither
`ref-unexplained` nor the bidirectional report appears in `validate.mjs` or anywhere under `tools/lib`.

It is now runnable on demand as **`npm run selfcheck`** so that "not in the gate" does not become "not
runnable". A report-only check with low specificity has no business failing a build; it has every
business being available when someone is looking.

## DEFERRED — the schemas do not mark reference fields as references

**The finding.** Only `id` carries a `pattern` in any of the four schemas — `^L-\d{4}$`, `^P-\d{2}$`,
`^PR-\d{2}$`, and a loose slug for series. Every actual reference field is a bare string:
`seriesRefs`, `provenanceRefs`, `breaks[].provenanceRef`, `affectsSeries`, `correctiveSeries`,
`ledgerRefs`, and the pair-side `series` / `absenceFrom` / `competingAccountsFrom`. Two carry a
description naming their target in prose; the rest carry nothing. **Nothing in the contract says "this
field holds an id, of this layer."**

**Why it matters.** It is the reason derivation has to run off id contracts plus observed values
rather than off the schema alone, and that indirection is what leaves the blind spot: a legal form
with zero instances is invisible, because there is no value to recognise. Two forms sit there now
(`pairs.a.absenceFrom`, `pairs.a.competingAccountsFrom`) and a third is one deletion away
(`pairs.b.competingAccountsFrom`, exactly one instance corpus-wide).

**What fixing it would look like.** A marker on each reference field — a `pattern` matching the
target layer's id form, or a custom annotation naming the target layer. Then derivation reads the
schema alone, is complete by construction, sees zero-instance forms like any other, and **the hand
list retires.**

**Until then both methods stay**, and neither is redundant: derivation catches forms nobody
enumerated, the floor catches forms nobody has used. Dropping either reopens a gap that has already
cost this project three missed reference forms and 111 unvalidated instances of one of them.

Deferred, not opened. It is a schema change and the schemas are the contract — research sessions
author against them, so it is agreed in chat before hardening (CLAUDE.md, Roles).

---

# Verification log — cycle 2026-08-02i (18 back-links applied; 1 rejected, 1 held)

Additive only. The 63 by-design rows untouched. Gate stays red at 26. Nothing pushed.

## APPLIED — 18 back-links

Candidates fell **83 → 65**, the remainder being the 63 by-design plus the two below.

| provenance | gained | now lists |
|---|---|---|
| P-15 | `scb-gross-npa-amount` | 5 |
| P-18 | `credit-gdp-peer`, `npl-peer`, `scb-gross-advances`, `scb-gross-npa-amount` | 7 |
| P-21 | `scb-gross-npa` | 3 |
| P-22 | `soil-health-cards`, `pmkisan-beneficiaries` | 8 |
| P-31 | `nh-network-length` | 3 |
| P-39 | `regular-wage-share`, `unemployment-rate-cws`, `youth-unemployment` | 8 |
| P-40 | `lfpr-overall`, `regular-wage-share`, `youth-unemployment` | 7 |
| P-41 | `lfpr-female` | 5 |
| P-48 | `agri-gva-growth` | 2 |
| P-52 | `uapa-conviction-rate-ncrb` | 3 |

The P-52 row has documentary support beyond the shape: cycle 08-01e dropped the retired
`uapa-conviction-rate` from `P-52.affectsSeries` and authored `uapa-conviction-rate-ncrb` carrying
P-52. The removal happened; the re-add did not.

## REJECTED — `metro-network` → P-22

**P-22 names scheme MIS specifically.** Title: *"Evidence base shifts from independent survey to
scheme MIS"*. `whatChanged`: *"toward scheme management information systems and dashboards. MIS
records an OUTPUT — a connection issued, a toilet built, a card created, a house sanctioned"*.

It does not name self-reported administrative counts generally. It widens by **enumerating** cases —
`notes` extends scope to infrastructure for Jal Jeevan, to employment for EPFO and e-Shram, to banking
and macro for agricultural credit. `metro-network` is a route-kilometre count from MoHUA and is named
in none of them. Rejected on the record's own scope.

## HELD, NOT REJECTED — `agri-credit` → P-22, because the given reason is refuted by P-22 itself

The instruction was to reject with the reason *"a NABARD/RBI financial statistic is not a scheme MIS,
so P-22's dispute does not reach it."* **P-22's own `notes` say the opposite**, verbatim:

> Scope extended to banking and macro: **agricultural credit DISBURSED measures supply not smallholder
> access**, and the farm-law record turns on the same registration-standing-in-for-outcome shape.

That sentence names agricultural credit as an explicit extension of P-22's scope into banking, and
`agri-credit` already carries P-22 in its own `provenanceRefs`. Writing the rejection would have put a
statement in the log that the cited record contradicts on its face, so the row is **held pending a
ruling** rather than rejected. Either the back-link is warranted, or P-22's notes need amending — but
the two cannot both stand.

## The 26 routes

Worklist written to `docs/unmeasured-routes-todo.md`: each entry with record id, `unmeasured[i]`,
`what` and `why` verbatim, `reasonKind`, and any holder its own text names. 24 `not-published`,
2 `withheld`. Routes are authored by the operator; nothing was guessed.

### A classification finding on the two `withheld` entries

Both are `nas-parakh-grade3-language[3]` and `nas-parakh-grade3-maths[3]`, same text:

> The test items used in any NAS or PARAKH round — *"NAS does not make public the test questions it
> uses; PARAKH publishes sample items only. This is an identifiable standing refusal rather than mere
> non-release."*

`withheld` is defined as *"exists, release was specifically requested or legally required, and was
refused. Narrower than not-published — requires an identifiable refusal, not merely absence of
release."*

**No request, requester or date is recorded.** What the text describes is a standing publication
practice, which the definition explicitly distinguishes from withholding — *"not merely absence of
release"*. On the written definition these are `not-published`, not `withheld`. Reported, not
reclassified: it changes an authored judgement and belongs with the route-authoring pass.

---

# Verification log — cycle 2026-08-02j (26 routes authored; gate GREEN)

**Letter note: this is the cycle instructed as `2026-08-02i`.** That letter was already assigned
earlier today to the back-link cycle, and the standing rule from cycle 31k is that letters are
assigned once. Recorded as `j` rather than reusing `i` or renaming a published entry.

## The gate is green

```
npm run validate           VALID — 0 errors, 85 warnings
npm run validate:selftest  20/20 · 18/18 rules fire on tests/fixtures/broken
npm run typecheck          clean
npm run build              396 pages
npm run reachability       397/397 (unmeasured 128/128 · caveat 99/99 · notes 163/163 · differentFactsNote 7/7)
```

**`unmeasured-route`: 26 errors → 0.** No error of any rule remains in the corpus.

The 35 `unmeasured-route` **warnings** are unchanged at 35 (30 education, 5 live) and are a disjoint
set — `not-collected` and `never-defined` absences that never carried a route and are not required
to. The 26 that were errors now carry one and produce no finding at all.

`selftest` failed once before this and the failure was real but not a data defect: `out/` predated
these `/data` edits, so reachability was reading a stale build. Rebuilt, then clean.

## 19 routes across 26 entries

Every route names a holder and an instrument. **All 7 duplicated absences carry byte-identical
`wouldFill` and `reasonKind`**, verified per pair after writing:

| ledger entry | series entry |
|---|---|
| `L-0091[2]` | `school-closure-weeks-covid[1]` |
| `L-0104[2]` | `higher-ed-enrolment[1]` |
| `L-0106[3]` | `single-teacher-schools-udise[2]` |
| `L-0107[2]` | `contract-teachers-share-government[2]` |
| `nas-parakh-grade3-language[2]` | `nas-parakh-grade3-maths[2]` |
| `nas-parakh-grade3-language[3]` | `nas-parakh-grade3-maths[3]` |
| `nas-parakh-grade3-language[5]` | `nas-parakh-grade3-maths[5]` |

12 singles + 7 pairs = 19 distinct routes over 26 entries.

## FIVE `reasonKind` CORRECTIONS

### `not-published` → `not-collected` (3)

These asserted producibility that does not exist. The test is whether a holder could produce the
thing under compulsion, and in each case nothing has been compiled to produce.

- **`L-0090[2]`** A NIPUN Bharat annual report — *"Nothing compels a report that was never compiled.
  Closes only if DoSEL acts on the Standing Committee's recommendation."*
- **`L-0101[0]`** Any ministry statement defending the Samagra Shiksha withholding on its merits —
  *"No instrument produces an argument that was never made."* An argument is not a record.
- **`L-0107[3]`** Any national para-teacher / Shiksha Mitra / Vidya Volunteer figure — *"No national
  aggregate is held… The route runs to state education departments, not the Centre."*

The third is the sharpest: the Centre cannot produce what it does not hold, and filing it
`not-published` pointed the route at the wrong government.

### `withheld` → `not-published` (2)

`nas-parakh-grade3-language[3]` and `nas-parakh-grade3-maths[3]`, the NAS/PARAKH item banks.

`withheld` requires *"an identifiable refusal, not merely absence of release."* **No request,
requester or date was ever recorded** — what the entries describe is a standing non-publication
practice, which the definition explicitly excludes. Demoted to `not-published`, which is what the
evidence supports.

The route states the condition under which the original value would become correct:

> An RTI to NCERT for the NAS and PARAKH item banks. Item security is a defensible ground for
> refusal, since released items cannot be reused for trend measurement, so this request may
> correctly fail. **A refusal is what would make `withheld` the right value; it is not the right
> value now, because no refusal has been sought.**

That is the honest shape: `withheld` is downstream of an act nobody has performed.

## TWO ABSENCE TEXTS NARROWED

Both were asking for something no holder has, which is how an absence acquires an unfillable route.

- **`L-0097[2]`** — "A consolidated national register of NCTE recognition withdrawals" →
  **"The NCTE recognition-withdrawal orders."** No body maintains the register; the four NCTE
  Regional Committees hold the constituent orders. `why` updated to say so. Aggregation is the
  requester's work, and the route says that.
- **`L-0104[3]`** — "Whether the 47 per cent single-year rise in doctoral enrolment is real" →
  **"AISHE's definitional and coverage-change notes between the 2022-23 and 2023-24 rounds, and
  institution-level PhD enrolment for both years."** The old text named a conclusion; an absence
  names a document. `why` updated to carry the reasoning and the records that would settle it.

## The one enforceable route in the corpus

**`L-0081[0]`**, published shutdown orders and Review Committee decisions:

> The stronger instrument is the Supreme Court's direction in Anuradha Bhasin (January 2020),
> reiterated January 2024, which requires publication independently of any request. **This is the
> only absence in the corpus whose route is enforceable rather than requestable.**

Every other route is a request that may be refused. This one is a direction already given.

## Open, carried

`agri-credit` → P-22 remains held: the instructed rejection reason is contradicted by P-22's own
`notes`, which name agricultural credit as an explicit extension of its scope into banking. Needs a
ruling — either the back-link is warranted or the notes need amending.

## Addendum to 2026-08-02j — P-22 reversal, metro-network re-confirmed, deploy held

The five `reasonKind` corrections, the two narrowed absence texts, the 19-routes-across-26
verification and the stale-`out/` selftest failure are recorded in the body of `2026-08-02j` above.
This addendum carries what came after it. **Appended rather than rewritten: `2026-08-02j` is already
pushed, and letters are assigned once.**

### REVERSAL — `agri-credit` → P-22 APPLIED

Previously held rather than rejected, because the instructed rejection reason — *"a NABARD/RBI
financial statistic is not a scheme MIS, so P-22's dispute does not reach it"* — was contradicted by
P-22's own `notes`:

> Scope extended to banking and macro: **agricultural credit DISBURSED measures supply not smallholder
> access**, and the farm-law record turns on the same registration-standing-in-for-outcome shape.

**Reversed on the stated ground that the record governs over a reading of its title.** That is the
right principle and worth recording as one: P-22's title names scheme MIS, and its `notes` extend the
scope by enumerating cases that are not scheme MIS in the narrow sense — EPFO payroll additions,
e-Shram registrations, agricultural credit. A record's scope is what the record says, not what its
title implies, and where the two diverge the body wins. Reading the title alone would have excluded
three of P-22's own declared extensions.

`P-22.affectsSeries` now lists 9. **Back-link candidates 83 → 64** across this cycle and the last.

### RE-CONFIRMED — `metro-network` → P-22 stays REJECTED

Re-tested against P-22's scope as it now stands, not from memory. `whatChanged` reads *"toward scheme
management information systems and dashboards"* — scheme MIS specifically, not self-reported
administrative counts generally. The record widens only by naming cases: Jal Jeevan, EPFO, e-Shram,
agricultural credit. A MoHUA route-kilometre count is named in none.

**This was already decided and logged in cycle `2026-08-02i`, not left pending.** Recorded again only
because it was re-put; the determination is unchanged.

### The asymmetry between the two P-22 rows, stated plainly

`agri-credit` and `metro-network` were the two rows I could not settle mechanically, and they resolve
in opposite directions for the same reason: **P-22 extends by enumeration.** `agri-credit` is
enumerated, `metro-network` is not. Neither could have been settled from the title, the domain list,
or the shape of the citing series — only from the body of the record.

### Gate

`npm run validate` VALID — **0 errors**, 85 warnings. Unchanged by this edit.

### DEPLOY — HELD, at the operator's instruction

the operator is checking the Vercel git integration. **Not pushed, no empty commit, no retry.**

Production remains on `b8027d7`, which is green and one cycle behind: it carries the phase-10 corpus
without the back-links or the routes. `origin/main` is at `97aecf8`, for which Vercel created no
deployment. Everything from this cycle and the `agri-credit` reversal is committed locally and
unpushed. **Reachability against production HTML is owed once a deploy lands**, and has not been run.

## Addendum to 2026-08-02j — DEPLOYED and verified on production

The Vercel git integration was fixed by the operator; the held commit was then pushed.

**Production is `65c2111`**, `dpl_8F41HhzvWmAQMe2eNgB76fGfU9TR`, target production, state READY,
aliased to `india-government.vercel.app`. It carries every commit of cycles `g` through `j`: the
derived reference forms, the renamed `ref-unexplained`, the derived `unmeasured-route` severity, the
19 back-links, the 26 routes, the five `reasonKind` corrections and the two narrowed absence texts.

The gap is explained rather than left implicit: the earlier push of `97aecf8` produced no deployment
at all — GitHub's own deployment list skipped it — so production sat on `b8027d7` for about an hour.
Nothing was retried or forced while it was held. The integration now picks up pushes normally, and
`65c2111` includes `97aecf8`, so no work was stranded by the gap.

### Vercel's own build log

```
> npm run reachability
reachability OK — 397/397 declared marks reachable on their own record page (396 pages scanned)
  unmeasured 128/128 · caveat 99/99 · notes 163/163 · differentFactsNote 7/7
```

### Production HTML, fetched over the wire

Authenticated browser, since production 302s to Vercel SSO unauthenticated. 70 pages fetched
same-origin, parsed, `<script>` removed, every declared mark counted on the page that declares it.
**The spec was regenerated from `/data` as it now stands rather than reused**, because two absence
texts changed this cycle and a stale needle would have passed against the old wording.

| class | production |
|---|---|
| absences | **97 / 97** |
| caveats | **66 / 66** |
| break seams | **67 / 67** |
| **total** | **230 / 230** |

70 of 70 pages, zero HTTP failures, zero shortfalls.

**Controls:** positive TRUE · **negative FALSE** · end-seam period TRUE · end-seam note TRUE.

### This cycle's own edits, verified live rather than assumed

Counts alone would have passed whether or not the rewrites landed, so each was asserted in both
directions — the new text present AND the old text gone:

| assertion | required | observed |
|---|---|---|
| `L-0097[2]` — "The NCTE recognition-withdrawal orders" present | TRUE | TRUE |
| `L-0097[2]` — "A consolidated national register" gone | FALSE | FALSE |
| `L-0104[3]` — "AISHE's definitional and coverage-change notes" present | TRUE | TRUE |
| `L-0104[3]` — "Whether the 47 per cent single-year rise" gone | FALSE | FALSE |
| `L-0081[0]` — the Anuradha Bhasin route renders | TRUE | TRUE |

The two old-text assertions are the same discipline as the negative control: a check that only looks
for the new string cannot tell a successful rewrite from a page that carries both.

**Phase 10 and the validator-hardening cycles are now live and verified. Nothing is owed.**

---

# Verification log — cycle 2026-08-02k (reference fields marked in the schemas; hand list retired)

No `/data` authoring. Gate green throughout. Not deployed.

## What changed

Every field holding an id now declares its target layer's pattern, so `deriveRefForms` reads the
contract instead of inferring from observed values. **The deferred finding from cycle `2026-08-02h`
is closed.**

## 1. The enumeration, taken before editing

Twelve schema-level reference fields. Eleven take a pattern; `absenceIndex` takes a description only.

| # | file | JSON path | target | instances |
|---|---|---|---|---|
| 1 | `series` | `properties.provenanceRefs.items` | provenance | 249 |
| 2 | `series` | `properties.breaks.items.properties.provenanceRef` | provenance | 111 |
| 3 | `ledger` | `properties.seriesRefs.items` | series | 204 |
| 4 | `ledger` | `properties.provenanceRefs.items` | provenance | 97 |
| 5 | `provenance` | `properties.affectsSeries.items` | series | 175 |
| 6 | `provenance` | `properties.correctiveSeries.items` | series | 14 |
| 7 | `pairs` | `properties.provenanceRefs.items` | provenance | 34 |
| 8 | `pairs` | `properties.ledgerRefs.items` | ledger | 16 |
| 9 | `pairs` | `$defs.side.properties.series` | series | 37 (a 24 / b 13) |
| 10 | `pairs` | `$defs.side.properties.absenceFrom` | series \| ledger | 10 (a 0 / b 10) |
| 11 | `pairs` | `$defs.side.properties.competingAccountsFrom` | provenance | 1 (a 0 / b 1) |
| 12 | `pairs` | `$defs.side.properties.absenceIndex` | *integer index* | 10 (a 0 / b 10) |

**Ten of the twelve carried no description at all**, and none carried a pattern.

### The structural fact that makes this work

**`pairs.a` and `pairs.b` both `$ref` `#/$defs/side`.** At schema level there is one definition, not
two. So marking the schema covers `a.absenceFrom` and `a.competingAccountsFrom` — the two
zero-instance forms that motivated this cycle — with no special handling at all. **The blind spot
closes by construction rather than by special case.** That is the whole argument for doing it in the
schema rather than in the checker.

## 2. Applied

Eleven patterns, drawn from each target layer's own id contract:
`^[a-z0-9]+(-[a-z0-9]+)*$` (series) · `^L-\d{4}$` (ledger) · `^P-\d{2}$` (provenance) ·
`^(L-\d{4}|[a-z0-9]+(-[a-z0-9]+)*)$` (absenceFrom, which targets either).

The union pattern is safe because the series slug is lowercase-only and the other three are
uppercase-prefixed, so no id can satisfy two contracts at once.

Each field also gained a one-line description naming what it points at. **No type, cardinality or
required status was changed** — asserted per field during the edit, and the four `required` arrays
were printed before and after and are unchanged.

`absenceIndex` deliberately gets **no pattern**, because an integer has no string shape. It gets the
contract in prose instead:

> Zero-based index into the unmeasured[] array of the record named by absenceFrom. A bare integer
> declares no contract of its own, so the range it must fall in is stated here: out of range is a
> dangling reference that resolves.

That is the same undeclared-contract problem in a different type, and it is now declared.

## 3. The assertion, then the retirement

Run **before** switching, as required:

| assertion | result |
|---|---|
| schema-derived ⊇ the 12 value-derived forms | **PASS** |
| schema-derived ⊇ the 14-entry corrected hand list | **PASS** |
| forms only the schema knows | none — exactly equal to the hand list |
| `pairs.a.absenceFrom` and `pairs.a.competingAccountsFrom` now derived | **yes, from the contract** |

Equality rather than strict excess is the expected result and confirms the hand list had been
correct after its three additions — the schema now says the same thing, but says it where drift is
impossible.

**Only then was `REF_FORMS` deleted.** It is in git history at this cycle, not in the tree. What
survives is a two-entry `FIELD_SEMANTICS` map for the two facts a pattern cannot express —
`absenceIndex` range and `competingAccountsFrom` requiring `competingAccounts` on its target. Those
are cross-record facts, not string shapes, and the file says so.

## 4. Counts, and NO new failures

| | before | after |
|---|---|---|
| reference forms known to the checker | 12 (value-derived) | **14 (schema-derived)** |
| forms with zero instances, still validated | 0 | **2** |
| references pattern-validated by the gate | **0** | **948** |

The last row is the real rise. Before this cycle **no reference field carried a pattern**, so the
gate checked only that references resolved, never that they were well-formed. All 948 are now
checked on both counts.

**The expected new failures did not appear. `npm run validate` is VALID, 0 errors.** Every one of the
948 references was already well-formed and pointing at the right layer. Reported as the finding it
is: the check was absent, but the defect it guards against was not present. That is worth knowing
precisely because it could not have been known before.

```
npm run validate           VALID — 0 errors, 85 warnings
npm run validate:selftest  PASS
npm run typecheck          PASS
npm run build              396 pages
npm run reachability       397/397
```

## 5. Two new rules, two new fixtures — selftest 18 → 20

The schema pattern rejects both cases, but ajv reports them identically as
*"must match pattern ^[a-z0-9]+(-[a-z0-9]+)*$"*, which does not tell an author which mistake they
made. Two named integrity rules do:

- **`ref-layer`** — the id is well-formed, for the **wrong layer**. `P-59` in a `seriesRefs` field is
  not a typo and not a dangling reference; it points at the wrong kind of thing. Left to
  `ref-resolves` it would read as merely absent.
- **`ref-malformed`** — the id matches no layer's contract at all.

Both read `ID_PATTERNS` from the schemas rather than restating them, the same discipline as
`REASON_KINDS`, so neither can drift from the contract it enforces.

Fixtures `L-9501` (wrong layer) and `L-9502` (malformed) added to `tests/fixtures/broken`.
**`20/20 rules fire on tests/fixtures/broken (32 errors caught)`**, from 18/18 and 28.

## Not deployed

Gate is green, but this cycle ends with a report rather than a push. Production remains on
`65c2111`.

## Addendum to 2026-08-02k — deployed and verified

**Production is `012ca77`**, `dpl_FrSUfLbXfQtdKxtFbjEBBxZyLfQg`, target production, state READY.
The integration picked the push up in under two minutes, as it did for `65c2111` — the hour-long
gap before `97aecf8` has not recurred.

Vercel's own build log:

```
> npm run reachability
reachability OK — 397/397 declared marks reachable on their own record page (396 pages scanned)
  unmeasured 128/128 · caveat 99/99 · notes 163/163 · differentFactsNote 7/7
```

Production HTML re-checked over the wire, authenticated: **70/70 pages · absences 97/97 · caveats
66/66 · seams 67/67 · 230/230**, no HTTP failures, no shortfalls. Controls: positive TRUE, negative
FALSE, both end-seam assertions TRUE.

**This cycle changed no `/data`, so identical numbers are the correct result and are the point of
running it.** The schema now pattern-validates 948 references that were previously unchecked for
well-formedness; if that had rejected or altered anything the corpus renders, these figures would
have moved. They did not. The change is enforcement, not content.

# Verification log — cycle 2026-08-03a (phase 11, kashmir-security)

`/phase kashmir-security --dry`, run to the drop, then merged on instruction. Security arc only:
incidents, casualties on all three populations, infiltration, local recruitment, encounters, pellet
and crowd-control injuries, custodial deaths. Detentions/PSA, shutdowns, 370's legal mechanics,
statehood, elections, delimitation, domicile and land law are phase 12 and no record was opened on
them.

## What merged

| Layer | Added | Now |
|---|---|---|
| ledger | 15 (L-0110→L-0124), new file `data/ledger/kashmir-security.json` | 124 |
| series | 15, new file `data/series/kashmir-security.json` | 201 |
| provenance | 17 (P-71→P-87) | 87 |
| pairs | 7 (PR-26→PR-32) | 32 |

52 absence declarations: 16 `not-collected`, 25 `not-published`, 6 `withheld`, 5 `never-defined`.
Points 85 verified / 17 approx / **0 pending**. Appends to `provenance.json` and `pairs.json` proven
append-only — `git diff --numstat` 703/0 and 185/0, zero deletions.

## The `kashmir` enum value — first substantive use, and the flag

Its written definition is "a cross-cutting lens, applied to records whose primary subject sits
elsewhere". Every record was filed **provisionally per that definition** — nothing this phase carries
`kashmir` alone — and every record where `kashmir` is in truth the primary subject was FLAGGED rather
than reclassified. **The definition was not amended and no wording was proposed.**

**Flag count: 9** — 7 of 15 ledger, 2 of 15 series, 0 provenance, 0 pairs.

For contrast, of the four pre-existing records carrying `kashmir`, **three carry it alone** (L-0003,
L-0005, L-0010), which the definition says it is not. `federalism` is always paired; `defence` was
paired once.

**The structural finding the count cannot express.** `series.domain` and `pairs.domain` are
**single-valued** enums. "Substantive primary plus `kashmir` as lens" is unexpressible there. So all
15 series and all 7 pairs are substantively about J&K and **not one carries the tag** — a reader
filtering by `kashmir` finds 32 records and no measured spine. That 186 pre-existing series carried
no `kashmir` looked like evidence for the lens reading; it is equally consistent with the lens being
unrepresentable in the layer where the numbers live. **A lens inside a single-valued subject enum is
two axes in one field — the third instance of that defect.** Fix scoped next cycle, see Deferred.

## Stops

**TRIGGER B — fired twice.**

- **B-1, held.** The MHA civilian restatement (2018 39→55, 2019 39→44, 2020 37→38, 2021 41→41) looks
  like it isolates civilians killed in CT operations as a residual of 16/5/1/0. It does not: the 2021
  residual is zero, and the security-force figure also moved (62→63) across the same restatement, so
  it carries ordinary revisions too. Six places discuss it; the prohibition is stated in five, and
  the sixth was publishing 16 and 5 as an argument in `L-0112.caseFor`. Removed. No point carries the
  residual.
- **B-2, cut on instruction.** `L-0117.caseFor` said "fewer than thirty locals killed" — 68 − 42,
  derived from a "42 of 68 were foreign" claim the research says three times has no retrievable
  basis, with a denominator of 68 where the authored point is 67. The record had dropped the 42 and
  kept the figure derived from it, making the dependence invisible. Rewritten to drop the derivation
  and point at its own absence (`L-0117.unmeasured[2]`, `not-published`, the local/foreign split MHA
  has never published in seventeen years). **The argument stands; its anti-reclassification limb does
  not, and that is the finding.** Also fixed in the rewrite: the infiltration figures were on a
  different window (2017→2022) from the sentence around them (2018→2024), now stated.

**TRIGGER D, application limb (`defence`) — ALLOWED, definition amended in the same commit.**
By its words the value covered the use; by observed usage it did not — 1 ledger record to 10, 0 of
186 series to 13, secondary to primary, external border incident to internal counter-insurgency.
Amended in all four schemas:

- out: `- defence: military and security. One record; sparsely attested.`
- in: `- defence: armed conflict and counter-insurgency operations, external or internal. The state's treatment of civilians in those operations files governance, not defence.`

The trailing attestation clause was false and was the `demography` shape — a line describing the word
rather than observed practice. The governance boundary is the one the run already drew in its filings
(crowd control, custodial deaths, AFSPA sanction and answerability all went to `governance`) and is
now written rather than implicit. Byte-identity preserved: ledger, series and pairs share one string
(sha256 `5eeb91f2ce5b225f`); provenance is that plus its `- all:` line.

**TRIGGER A — merged as `contested`, no value added.**
All 15 ledger records are `contested`. Eight have no stated objective, so `worked`/`partly`/`failed`
are unavailable **by their own definitions** and `contested` is functioning as a sink. With L-0092 and
L-0096 that is **ten instances**. Scoped as its own cycle **before phase 12**: whether a REQUIRED
`assessment` is the right shape. Not resolved here — resolving a taxonomy in the pass that discovers
it is how `differentFacts` reached seventeen records.

**E and F — not fired.** No baseline re-authored; no field dropped or pre-filtered.

## `withheld` verified before merge — 7 → 6

Education demoted two for want of an identifiable refusal. Same test applied here: name the requester,
the request and the date, or it is `not-published`.

| Record | Requester | Request | Date | Verdict |
|---|---|---|---|---|
| L-0114[0], jk-pellet-deaths[0] | Prof. M. V. Rajeev Gowda | RS US Q.511(a), injured or killed by pellets | 7 Feb 2018 | holds |
| L-0114[1], jk-pellet-deaths[1] | same | Q.511(c), munitions expended | 7 Feb 2018 | holds |
| L-0122[1] | Venkatesh Nayak, RTI + second appeal | reasons for refusal, 47 AFSPA s.7 cases | CIC order 5 Jun 2020, s.8(1)(a) | holds |
| L-0123[0] | Sheikh Khursheed, MLA Langate (AIP) | SRO-43 ex-gratia delay, deleted by Speaker Abdul Rahim Rather | 28–29 Oct 2025 | holds |
| **L-0116[1]** | — | — | — | **DEMOTED to `not-published`** |

L-0116[1] failed on all three: families met the LG, who *volunteered* publication and did not deliver.
That is non-release, not refusal, and the written test turns on producibility under compulsion. The
record already conceded "no specific request-and-refusal is documented" for its 506-inquiries limb and
left `withheld` set anyway. **All three requesters were established in `parts/` and none had been
written into the records** — now carried in the record, not only in the research.

## The arithmetic hand-check — six errors no gate caught

Read by hand against the authored points and against `parts/`. **Four originated in `parts/` and were
corrected there too**, or they re-enter on the next run.

1. Security-force deaths 2024 stated 30, value 31. Caught because the authored 2018-2024 total of 369
   reconciles only with 31.
2. 189/417 stated as "roughly 44 per cent" — 45.3.
3. Hyderpora "an inquiry ordered in 48 hours" — the record's own two dates make it three days.
4. `62/56 in 2020` quoted against an authored 63 — 62 is the superseded AR 2021-22 vintage.
5. L-0124's JKCCS perpetrator split summed to 77 and was presented as the split of 80; two categories
   omitted.
6. B-1 above.

The load-bearing identities were verified and hold: 228+189=417, 153+102=255, 126+118=244, 129+100=229,
and all five 2018-2024 totals reproduce exactly from the authored points.

## Stage 7 — a real unreachable mark, and a new mark class

Reachability failed the merged corpus: **`[differentFactsNote] L-0118 — renders nowhere at all`**.
`app/ledger/[id]/page.tsx` rendered the note only inside `DifferentFactsMark`, gated on the boolean.
L-0118 records `differentFacts: false` and carries a note explaining why — the only such record in the
corpus, of 11 carrying a note.

**Ungating was not the fix.** That mark's label asserts the cases don't share a common measure, which
is the opposite of what a false reading says. New mark class `DifferentFactsNegativeMark`, label:

> These cases were tested for different facts and recorded false

It says the test was applied and returned negative, and stops. It deliberately does **not** say a
shared measure exists — that asserts more than a false reading supports. L-0118's claim is narrower:
no additional fact decides between the readings, because both accounts predict the identical
observation. Styled neutral, **not** in the umber family — umber says the two sides are divided by
different things, and borrowing it for a negative result would contradict the words at a glance.

**No new gate rule, so trigger C is not engaged.** The reachability `MARKS` entry for
`differentFactsNote` keys on the note's presence, not on the boolean, so it already covered both
variants — which is how this was caught at all.

**Coverage confirmed by regression, not by assertion** (Rule 2): the negative render path was removed,
the site rebuilt, and the gate fired naming L-0118; restored, and it went quiet at 492/492. Both
halves derive from a real regressed build.

**The other ten were NOT backfilled.** The pattern generalises only where an author actually ran the
test and recorded false; writing notes onto records that were never tested manufactures the appearance
of a test. If it is wanted everywhere that is an authoring pass, not a migration.

## Gate

```
validate            VALID — 0 errors, 96 warning(s)
validate:selftest   selftest OK — 20/20 rules fire (32 errors caught); controls kept
typecheck           clean
reachability        OK — 492/492 (443 pages)
                    unmeasured 180/180 · caveat 123/123 · notes 178/178 · differentFactsNote 11/11
```

Controls verified live, including `reachability fires on tests/fixtures/reachability-hidden` and
`stays silent on the live corpus`, and both `unmeasured-route` branches. The reachability fixture's
hand-built `out/` tree is tracked in git (3 files) and survives a clean clone. `audit/` regenerated
from `/data` — 124 records, 1235 points, 180 absences, 87 provenance — and remains gitignored by
design as a generated artefact.

## Stage 2 liveness failure — recorded, not a trigger

The research orchestrator died on an API session limit after writing 13 of 15 parts. **Two missing
parts were load-bearing**: `07-pellet-and-crowd-control.md`, which two other parts forward-referenced
as covering pellet injuries, and `00-head.md`, carrying the per-quantity ledger answer that
`00-sources.md` §4 forwarded to and contained nothing else. Had stage 3 run as the drop stood, both
would have been absent while two parts asserted they were covered elsewhere. Closed before authoring.
A fan-out child that returned after the orchestrator died is preserved as `parts/06b`.

## The two standing findings of this phase

**No disciplining measure exists.** This lands with rights-institutions, not agriculture — there is no
analogue to the OECD Producer Support Estimate that defeated both partisan framings on farm support.
Stronger than phase 9's version: **both sides argue from the state's own data.** SATP compiles from
news reports, publishes no definition of "civilian", and states its purpose as countering distortions
about terrorism; UCDP records Government-of-India one-sided violence in three country-years ever, none
after 2002; JKCCS ceased publishing in 2020; ACLED is the only live candidate and was not retrieved.

**Almost no instrument puts both sides' facts on one ledger.** Per quantity: pellet deaths — yes once,
RS Q.511 Annex-I, deaths only, three years, never repeated, injuries refused in the same sentence.
Civilians killed — yes, non-official, JKCCS/APDP, ceased 2020. Incidents — partially, activity only,
from 2018, CASO omitted entirely ("cordon" appears zero times across seven MHA annual reports).
Everything else, no. Three traps where an instrument looks two-sided and is not: MHA's merged
"Civilians killed" column, SATP's three-population table, and the pre-2022-23 "Incidents" composite.
And the series MHA presents as its own is attributed in PIB to `Source: CID, J&K` — a party to the
operations being counted.

## Deferred — not done this cycle, deliberately

1. **`lenses[]` on series and pairs**, carrying `kashmir` and `federalism`. Additive; `domain`
   unchanged. Backfill the 15 series and 7 pairs. **Must land before phase 12.**
2. **`differentFactsNote` is now under-specified.** "Required in practice wherever differentFacts is
   true" should say a note is permitted and meaningful on false. **Not amended here — a schema is not
   amended on a red build.**
3. **The `assessment` audit** — whether a REQUIRED `assessment` is the right shape, on ten instances.
   Its own cycle, before phase 12.
4. **Assert every forward reference between parts resolves before stage 3 runs.** `STATE.md`'s part
   count was correct and still hid two load-bearing holes.
5. **Write the arithmetic hand-check into `SKILL.md` as a required stage.** It found six errors no
   gate caught, four of which would have re-entered from `parts/`.

## Not deployed

Gate is green; this cycle ends at a commit on `main`, not a push.

## Addendum to 2026-08-03a — deployed and verified on production

**Production is `08dd4cc`**, `dpl_Ci6ZV1o1EREfE4t9ETJ3QMGBRTDD`, target production, state READY,
aliased to `india-government.vercel.app`. Pushed `9b887e6..08dd4cc` on `main`.

**The deploy gap did NOT recur.** The previous push produced no deployment record at all; this one
was picked up essentially immediately — `repoPushedAt` 1785701849000, deployment created
1785701851412, **2.4 seconds later** — and built in **33 seconds** (buildingAt 1785701852476, ready
1785701884176). Recorded because the failure mode was a *missing record*, so the evidence that
matters is the record existing with a push-to-create interval, not merely that the site is up.

Vercel's own build log:

```
> npm run reachability
reachability OK — 492/492 declared marks reachable on their own record page (443 pages scanned)
  unmeasured 180/180 · caveat 123/123 · notes 178/178 · differentFactsNote 11/11
```

Identical to local, including `differentFactsNote 11/11` — the count that was 10/11 before this
cycle's new mark class.

### Production HTML, fetched over the wire

Authenticated (production 302s to Vercel SSO unauthenticated; a share link was used and the fetched
pages confirmed to be real HTML carrying the instrument header, not an SSO interstitial). **30 pages
— every page this phase introduces**, 15 ledger and 15 series. Zero HTTP failures.

**The spec was regenerated from `/data`, not reused**, and by construction rather than by discipline:
the check ran `tools/reachability.mjs --data <phase-11 records> --out <fetched production tree>`, so
it is the *same checker* reading the *live merged data* against production output. A stale needle is
impossible because no needle was written down.

```
reachability OK — 95/95 declared marks reachable on their own record page (30 pages scanned)
  unmeasured 52/52 · caveat 24/24 · notes 15/15 · differentFactsNote 4/4
```

### Controls — 20/20, asserted in both directions

Positive TRUE, negative FALSE. Every edit this cycle made was asserted **both ways — new text present
AND old text gone** — because a check that only looks for the new string cannot tell a successful
rewrite from a page carrying both. Confirmed on production: the B-2 rewrite present and "fewer than
thirty locals" gone; the new negative label present on L-0118 and the positive label absent there,
with the mirror on L-0110; the `withheld` demotion text present on L-0116 and "identifiable refusal
by conduct" gone; all three requesters named and the "a named MLA" placeholder gone; the residual
prohibition stated on L-0112 and "by 16 for 2018 and 5 for 2019" gone; "45 per cent" present on
L-0111 and "roughly 44 per cent" gone; the "48 hours" claim gone from L-0116.

### The control that failed first, and what it found

The first run reported **19/20**, failing on *"positive label PRESENT on L-0110"* — a label verified
by eye minutes earlier. The cause was in the control script, not production: the component writes
`don&rsquo;t`, which Next renders as a literal U+2019, and the control normalised the **needle** but
not the **page**.

That asymmetry is also present in `tools/reachability.mjs` itself: `visibleText` folds the *entity*
`&rsquo;` but not the *character* `’`, while `norm` folds curly quotes on the needle side only.
**Checked rather than assumed — of the 492 mark needles in `/data`, zero contain a curly quote**, so
the gate cannot currently return a wrong answer. And the asymmetry can only ever cause a spurious
FAILURE, never a spurious pass, which is the safe direction. Logged as deferred, not fixed: the
moment an author writes a curly apostrophe in a `caveat` or an `unmeasured.what`, the gate fires on
correct data and the tempting repair is to edit the record. Added as item 6 to the deferred list.

**Worth stating plainly: the failing control is the reason to run controls.** The reachability figure
was 95/95 both before and after the control script was corrected — a clean pass on the headline
number carried no information about whether the check could distinguish anything.

---

# Verification log — cycle 2026-08-03b (the lens axis: `lenses[]` on series and pairs)

**Appended, not rewritten.** `2026-08-03a` and its addendum are closed and are not touched here.

No new records. No argument text re-authored. Twenty-two records gained one field.

## The defect

`kashmir` and `federalism` are written in the `domain` enum as **lenses** — applied to records whose
primary subject sits elsewhere. `series.domain` and `pairs.domain` are single-valued, so "substantive
subject *plus* lens" was not expressible in them. The consequence was total rather than partial: all
15 phase-11 series and all 7 phase-11 pairs are substantively about Jammu and Kashmir, and **not one
could carry the tag.** A reader filtering the instrument by `kashmir` reached no measured spine.

**A lens inside a single-valued subject enum is two axes in one field — the fourth instance**, after
the fifth `reasonKind`, the "cannot conclude" assessment value, and `differentFactsNote` on false.

## Step 1 — the enumeration, before any edit

Read off each value's own written definition in the schemas, not off usage.

| value | verdict | evidence |
|---|---|---|
| `kashmir` | **LENS, pure** | "a cross-cutting lens, applied to records whose primary subject sits elsewhere." Names no subject at all. |
| `federalism` | **HYBRID — subject AND lens** | "Centre-state relations. Also a lens: GST and groundwater carry it alongside their own subject." |
| the other 13 | subject | — |

**Only those two, and they are not the same shape.** Three near-misses were checked and rejected with
reasons rather than assumed away: `welfare`/`human-development` is a delivery-vs-outcome split of two
*subjects* that legitimately co-occur; the `defence`→`governance` carve-out is a boundary between two
subjects, not a lens declaration; `demography` is an unattested subject, not a lens.

The asymmetry drove the schema and both rules: `domain: "kashmir"` is illegal on its face, while
`domain: "federalism"` is legal and only *duplication across both axes* is not.

### Ledger — 32 records carry a lens in `domains[]`

19 carry `kashmir` (L-0003, L-0004, L-0005, L-0010, L-0110–L-0124); 13 carry `federalism` (L-0012,
L-0040, L-0051, L-0066, L-0069, L-0071, L-0091, L-0094, L-0098–L-0101, L-0108). All 13 federalism
records and 16 of the 19 kashmir records carry a substantive domain alongside, so `domains[]` being
multi-valued does its job and **the field was deliberately NOT added to the ledger this cycle.**

## The carried defect — three baseline records, NOT fixed

**L-0003, L-0005 and L-0010 carry `kashmir` as their SOLE domain.**

> A lens as sole domain asserts a lens over an unrecorded subject, and `domains[]` being an array
> does not cure it.

By the enum's own text `kashmir` is "applied to records whose primary subject sits elsewhere", so a
record carrying it alone declares a lens and no subject — the lens is silently doing subject duty.
These are phase-1 baseline records and predate the convention the later phases follow.

Carried, not fixed, and deliberately: repairing them means deciding what each record's substantive
subject *is* (L-0005 reads `governance`; L-0003 and L-0010 are arguable between `governance`,
`defence` and `infrastructure`). That is authoring judgement on shipped records, not a migration.

**This folds into phase 12 scoping, where the same question arises for every 370-mechanics record.**

## `demography` — a decision now due, not a note

Surfaced in three phases and still carrying zero records. Its own definition admits it describes
nothing: "NEVER USED — no record or series carries it, so its intended boundary is unattested and this
line describes the word, not observed practice." A value whose written definition disclaims itself
fails the §6 threshold in substance while passing it in form. **Either attested or removed.** Deferred
— not this cycle, and not as a note this time: as a decision that is owed.

## Step 2 — schema

`lenses[]` added to `series.schema.json` and `pairs.schema.json`. Optional array, `uniqueItems`, items
constrained to `["kashmir", "federalism"]`, absent by default. **`domain` untouched** — type,
cardinality and description all unchanged; `git diff --numstat` shows `11 0` on each schema, zero
deletions.

Per §6 preventive half, the new enum ships with per-value definitions **in the same commit**, meeting
the threshold: each says what the value *means* and what is legal on which axis, so a reader can
assign one from the text alone.

## Step 3 — backfill, asserted per record

**15 series.** Every record in `data/series/kashmir-security.json`. Each is titled to J&K explicitly
and each has a substantive subject elsewhere — 13 `defence`, 2 `governance`. The lens applies to all
15; **none had to be reported as unwarranted.**

**7 pairs.** PR-26 … PR-32. Every side of every one resolves to a J&K series, a J&K series' absence,
or a J&K ledger absence. All 7 warranted; none reported.

### Pre-existing records — reported, NOT backfilled

A keyword sweep was run first and **discarded as evidence**: "states" appears in ordinary prose in 30+
education and employment series and would have produced a list with no judgement in it. Replaced with
a reference-graph scan — a series cited by a ledger record that already carries the lens.

- **`kashmir`: zero candidates among the 186 pre-existing series and 25 pre-existing pairs.** Grounded,
  not assumed: the four pre-existing kashmir ledger records (L-0003, L-0004, L-0005, L-0010) carry no
  `seriesRefs` at all, and the only three pre-existing series mentioning J&K in title or notes
  (`aser-std3-reading-govt`, `literacy-rate-7plus`, `rte-quota-implementing-jurisdictions`) do so in
  survey-coverage footnotes. **The kashmir lens had nothing measured under it before phase 11.**
- **`federalism`: 23 pre-existing series and 5 pre-existing pairs surface.** Strongest are the RTE
  12(1)(c) trio (`rte-quota-reimbursement-approval-rate` is literally "approved by the Centre as a
  share of state claims"), the MSP/procurement group, `groundwater-overexploited-punjab`,
  `mgnrega-persondays` and the teacher-vacancy group; weakest are `nominal-gdp`, `thermal-plf` and
  `atc-losses`, cited as context by GST and UDAY rather than being federal themselves. **Not
  backfilled.** A lens applied retrospectively across ten phases is an authoring judgement, and the
  2026-08-02 backlink triage is the precedent: mass-mirroring 83 candidates would have written 63
  false links.

## Step 4 — two rules, two names

Check 4 is **not one rule**, because it is not one mistake and the message has to say which was made.

- **`lens-as-subject`** — a subject-forbidden lens in `domain`. Unconditional. kashmir's own definition
  places the primary subject elsewhere, so a record filing it as its subject files no subject at all.
- **`lens-duplicated`** — the same value on both axes of one record. Only `federalism` can reach it,
  because it is the one value legitimately both; either axis alone is correct.

`LENS_VALUES` derives from the schema, as `REASON_KINDS` and `ID_PATTERNS` do. `SUBJECT_FORBIDDEN`
does **not**, and says so: the distinction lives in the domain enum's English prose and parsing a
sentence for it would be a worse contract than restating it with the sentence quoted. Because it is
restated, it carries a **load-time drift guard** — if a forbidden value ever leaves the enum,
`lens-as-subject` would go quietly dead while still passing its fixture, so the module throws instead.

`ref-relevant` was deliberately **not** widened to consider `lenses[]`. Judging dispute relevance on
the lens would let any J&K dispute vouch for any J&K-lensed series regardless of what it measures —
loosening an existing error rule as a side effect of adding a field.

### Fixtures — four, and the two that matter are regression-proven

| fixture | proves |
|---|---|
| `broken/series/lens-as-subject-series` | a lens value in `domain` where a subject belongs |
| `broken/series/lens-duplicated-series` | `federalism` on both axes |
| `broken/series/subject-in-lenses-series` | a subject value in `lenses[]` |
| `invalid/series/subject-in-lenses.json` | the same, **pinned to its own reason** |
| `lens-axis-pairs/` (2 records) | the **pairs call site**, both rules |

Two of these need their reason stated. The subject-in-lenses case is caught by the enum, not by a
rule, so in `broken` it lands under `schema:series` alongside a dozen unrelated violations and proves
nothing about itself — `invalid` is the root that pins a rejection to its own reason, and this is the
half of the lens axis with no rule of its own to go dead quietly. And `broken` carries no pairs at
all, so the entries there prove only that the shared helper fires; they say nothing about whether the
pairs loop ever calls it, which is exactly the omission that would pass.

**Rule 2 — tested against real regressions, not models of them.** Both call sites were removed in turn
and the selftest re-run:

```
pairs call site removed   → selftest FAILED: lens-as-subject / lens-duplicated
                            did not fire on tests/fixtures/lens-axis-pairs
series call site removed  → selftest FAILED: lens-as-subject / lens-duplicated
                            did not fire on the broken fixtures
```

**selftest 20 → 22.**

## Step 5 — the gate

```
validate      VALID — 0 errors, 96 warning(s)   (16 files · 201 series, 124 ledger, 87 provenance, 32 pairs)
selftest      OK — 22/22 rules fire on tests/fixtures/broken (35 errors caught)
typecheck     clean
build         clean
reachability  OK — 492/492 declared marks reachable on their own record page (444 pages scanned)
              unmeasured 180/180 · caveat 123/123 · notes 178/178 · differentFactsNote 11/11
```

## A view change WAS required, and this is it

**The data change alone moves nothing.** `seriesInDomain` filtered on `s.domain === domain`, and the
domain page listed no pairs at all — so after the backfill a `kashmir` filter still reached 0 and 0.
Reported rather than assumed, then built.

**Read from built HTML with `<script>` blocks stripped** (Rule 1 — the framework embeds the whole
payload as escaped JSON, so a mark rendering nowhere is still in the file):

| `/domains/kashmir/` | before | after |
|---|---|---|
| series | **0** | **15** |
| pairs | **0** | **7** |
| ledger records | 19 | 19 |

- `seriesUnderLens` / `pairsUnderLens` / `pairsInDomain` / `pairHref` added to `lib/data.ts`.
- The lens list is rendered **apart from** the subject table, never pooled into it, and carries a
  Subject column naming the domain each series is actually filed under. Pooling them would restate
  the conflation the field was added to remove.
- Both blocks render only where non-empty. Seven other domain pages gain a Pairs section
  (education 9, defence 6, infrastructure 5, employment 4, governance 4, welfare 3,
  human-development 1); the rest are byte-identical in structure.

### PR-31 — a fully authored pair that rendered NOWHERE

Found while building the pair listing. A pair has no page of its own: it renders inside
`pairsForSeries(id)[0]` for one of its series. **PR-31 has no series on either side** — a provenance
record's `competingAccounts` against a ledger absence — so no series page has ever hosted it.
Confirmed against the built tree: its framing and both side labels appear in zero HTML files.

PR-16 is also absent and is **correct** — `declared-pending`, no sides yet, meant to render nowhere.

The domain listing renders PR-31 unlinked with the reason stated. Dropping it would hide the finding;
linking it somewhere plausible would be worse.

## Three drift findings in `lib/types.ts`, outside the requested scope

Found because this cycle had to edit that file. Fixed here and flagged rather than filed away.

1. **`education` was missing from `DOMAINS`.** Added to the schemas in phase 10, never to the code, so
   `generateStaticParams` never emitted it: **`/domains/education/` did not exist** and 48 series and
   20 ledger records — the whole phase-10 corpus — had no domain surface. `reachability` reported
   492/492 throughout, because it guards *marks on record pages*, not domain coverage. Fixed in
   `DOMAINS` and `DOMAIN_LABELS`; the page now builds with 48 series, 20 ledger, 9 pairs.
2. **The `DOMAINS` doc comment called `defence` a lens** and said all three lenses "carry no series at
   all". The schema has never described `defence` as anything but a subject, and phase 11 gave it 13
   series. Corrected.
3. **`Pair` was missing `title`, `ledgerRefs` and `status`** — all three in `pairs.schema.json` and in
   the data, none reachable from TypeScript.

**Recommended, not built:** a gate rule asserting every schema `domain` value has a `DOMAINS` entry.
Not added this cycle because it needs both fixtures under trigger C and would have taken the selftest
to 24 against an instructed 22.

## Not deployed

Stopped before deploy, as instructed. **Production was not checked and nothing here claims it was** —
every figure above is from the local build.

---

# Verification log — cycle 2026-08-03c (domain-coverage gate)

**Appended, not rewritten.** `2026-08-03b` is closed and is not touched here.

**Branched from `lens-axis`, not from `main`.** This gate fails on `main` by construction — `main`
lacks the `education` fix from `2026-08-03b`, which is the defect the gate exists to catch. The two
land together or in order; landing this one alone would put a red gate on the default branch.

## The finding, in its own right

> **A check can be sound, complete and green while the question it asks is not the one that would
> have caught the defect.**

`education` had no domain page for a month behind a green gate. Every check was correct and every
check passed:

| check | on the regressed build | verdict |
|---|---|---|
| `validate` | VALID — 0 errors, 96 warnings | correct — the data was never wrong |
| `typecheck` | clean | correct — `DOMAINS` was a well-typed 14-value tuple |
| `reachability` | **492/492 declared marks reachable** | correct — every mark did render on its own record page |

**None of them was broken. `reachability` in particular was not merely passing, it was passing at
full marks** — 492 of 492, the maximum score available. It asks whether a declared mark renders on
the page of the record that declares it, and it did, 492 times. It does not ask whether the record
is reachable from anywhere a reader would start. 48 series and 20 ledger records — the whole
phase-10 corpus — had no domain surface, and the number that would have told you was `443 pages
scanned` against 444, which nothing reads.

**This is the phase-6c shape one level up.** There, a component suppressed a mark because another
component was expected to render it. Here, an entire axis of navigation was absent and no check
enumerated the axis. Both are invisible to a data-side gate because the data is correct throughout.

### Regenerating specs from /data does not address this

Recorded because it is the obvious mitigation and it is the wrong one. That discipline — used in
`2026-08-03a`'s production check, and followed by this gate too — guards against a **stale needle**:
a check looking for what the data used to say. Every needle in the failing month was derived fresh
from `/data` on every run, and every one was found. **The needle was never stale.** The gap was an
unchecked dimension, and freshness is orthogonal to coverage. A perfectly fresh check of the wrong
question returns a perfectly fresh wrong answer.

## What was built

`tools/domain-coverage.mjs`, wired into `npm run build` and `vercel.json` after `reachability`.

Three assertions:

1. **Every domain value the schemas admit emits a page** — `out/domains/<value>/index.html` exists.
2. **The domain index links to every one of them** — a page nothing navigates to is not a surface.
3. **Every record reaches every surface it declares** — series by `domain` and by each `lenses[]`
   value, ledger by each `domains[]` value, pairs by `domain` and `lenses[]`, provenance by each
   `affectsDomains` value, with `all` fanning out to every domain page.

**The expected set is derived from the schemas, never from `lib/types.ts`.** `types.ts` is the layer
that drifted; asking it what domains exist is asking the defect to report itself, and the gate would
have been green through the entire month. The **union across all four schemas** is taken rather than
any single one, so divergence *between* the schemas is also caught. `lenses[]` values are asserted
to have surfaces rather than inferred to from the subset relation.

It reads built output and runs after `next build`, for the same reason `reachability` does:
`validate` runs *before* `out/` exists and can see none of this.

```
domain-coverage OK — 15/15 domain surfaces built, 15/15 linked from the index,
                     689/689 record-to-surface references reachable
  domains 15 (union of 4 schemas) · lenses kashmir, federalism
```

## Fixtures — both distilled from REAL regressed builds

Trigger C, Rule 2. Neither is a hand-written negative.

**A — `domain-coverage-no-page`.** The actual `education` defect, reproduced: `education` removed
from `DOMAINS` and `DOMAIN_LABELS`, `next build` run, gate observed to fire.

```
domain-coverage FAILED — 1 coverage failure(s)
  - [page] education: the schemas admit "education" (declared in series, ledger, pairs,
    provenance) and no page was built for it...
```

**B — `domain-coverage-record-adrift`.** `seriesUnderLens` made to return empty, `next build` run,
gate observed to fire on **9 of the 15** lens-carrying series.

**On both regressed builds `validate` was VALID, `typecheck` was clean, and `reachability` reported
492/492.** That is the finding above, demonstrated rather than asserted.

Both fixture trees confirmed to survive a clean clone: `.gitignore:7` (`!tests/fixtures/**/out/**`)
re-includes them, 34 files staged.

### Two honest qualifications on the new gate

**Nine of fifteen, not fifteen of fifteen.** Regression B emptied the lens block on
`/domains/kashmir/` and six of the fifteen series still counted as reachable — they are linked from
the same page's **Pairs** section via `pairHref`. The probe asks "is this record reachable from this
surface", and through a pair link it genuinely is, so the count is sound as stated. But it means the
gate under-reports a block that vanishes: it fires, and it fires at 9 rather than 15. Coupling the
probe to a specific block would fix the count and make the gate brittle against markup. Recorded as
a known limit rather than tuned away — **and it is an instance of this cycle's own finding**, which
is the reason to write it down instead of rounding it off.

**Script-stripping is defensive here, not load-bearing — checked, not assumed.** `reachability`
strips `<script>` first because Next embeds the whole payload as escaped JSON. Tested against the
real build: hrefs inside the hydration payload are escaped as `\"href\":\"…\"` and never match the
`href="…"` probe, and across all 15 domain pages stripping changes the pair-id answer on **zero** of
them. It is kept because it can only ever prevent a false PASS, never cause a false failure. The
first version of fixture B buried an href in a script block and claimed to prove the strip was
load-bearing; the fixture fired with stripping disabled, so the claim was false and the fixture was
rewritten rather than the finding softened. **A fixture that proves a property the code does not
have is worse than no fixture** — it retires the question.

## selftest — 22 stays 22, and that is the correct answer

**The instructed 22 → 24 is not achievable soundly, and the reason is the cycle's own finding.**

The `N/N rules fire` line counts **validator rules firing on a data fixture root**. This gate cannot
be one. `npm run build` is `validate && next build && reachability && domain-coverage`: at validator
time there is no `out/` to read, and a validator rule about what *renders* would have to model the
render path it exists to police, which is exactly the failure Rule 1 was written against. Forcing it
into that number would have meant either a rule that cannot see the defect, or a number that no
longer means what this log says it means.

`reachability` has never been in the 22 either. **The figure has always undercounted what the
selftest proves**, and nobody noticed because it was the number being tracked. So the summary now
carries a second count of its own:

```
  22/22 validator rules fire on tests/fixtures/broken (35 errors caught)
  2/2 output gates proven to fire on their own fixtures (reachability, domain-coverage)
  misspelled schema keyword fails compilation
```

Three new assertions land in the selftest — fixture A fires, fixture B fires, live corpus stays
silent — bringing the total proven cases to 22 validator rules plus 2 output gates. If the tracked
number should instead be a single total across every assertion class, say so and it changes; it is
recorded this way because redefining the headline figure mid-history would break comparability with
`20 → 22` recorded one cycle ago.

## `lib/types.ts` drift — already fixed, not re-done

Both items were fixed in `2026-08-03b` (`d1e2027`) and are in PR #2, unmerged at the time of writing:

- the `DOMAINS` comment calling `defence` a lens and claiming the lenses carry no series;
- `Pair` missing `title`, `ledgerRefs` and `status`.

Verified present on this branch rather than taken on trust. Nothing re-authored.

## Gate

```
validate         VALID — 0 errors, 96 warning(s)
selftest         OK — 22/22 validator rules · 2/2 output gates
typecheck        clean
build            clean
reachability     OK — 492/492 declared marks (444 pages scanned)
domain-coverage  OK — 15/15 surfaces · 15/15 indexed · 689/689 record references
```

## Still owed, unchanged

`demography` — a decision, not a note. Zero records, and its own definition admits it describes
nothing. Either attested or removed. Now surfaced in four phases.

## Not deployed

Stopped before deploy. Production was not checked and nothing here claims it was.

---

# Verification log — cycle 2026-08-03d (`no-objective` added; rescore PROPOSED, not applied)

**Appended, not rewritten.** Branched from `domain-coverage`, which is branched from `lens-axis`.

**The `/data` rescore in this entry has NOT been applied.** Code does not edit `/data` — raise, and
the operator applies at source (division of labour hardened phase 4b, after a correct `exports-gdp` fix was
silently reverted twice by wholesale drops). The instruction for this cycle was also to *report the
rescore table before applying*. So: the schema value, its definition, the gate rule and both fixtures
are built and proven; the 30 proposed rescores are a table and nothing more.

**Consequence, stated plainly: `/data` is RED on this branch — 18 `objective-required` errors.** That
is the rule working. It is not deployable and is not intended to be until the rescore lands.

## The value

Added to the `assessment` enum with its written definition in the same commit (§6 preventive half),
verbatim as instructed, plus three sentences on what it does not mean:

> **no-objective**: the record finds something real, and no objective was stated at announcement
> against which the finding could be scored. Distinct from contested, which is about the evidence
> supporting more than one reading. Use where nothing was claimed, not where a claim exists and its
> outcome is unmeasured — that remains contested (see L-0096). The value asserts nothing about the
> finding's quality: a no-objective record is as firmly established as any other, and the absence it
> records is the absence of a claim to test, not of evidence. Roughly half the ledger is in this
> state — conditions, trends, reporting instruments and structural absences — and before this value
> existed all of it had to take a value that presupposes an objective, which is why contested became
> a sink.

`assessment` stays **required**. `baseline-context` unchanged and still term-gated. `no-objective` was
added to the both-cases branch of the schema's `allOf`, so a no-objective record carries `caseFor`
and `caseAgainst` like any other — the value records that nothing was claimed, not that nothing is
arguable.

## The gate rule — `objective-required`

Fires where an assessment value that presupposes an objective sits on a record that states none.

**The value set is DERIVED from the schema's own definitions, not restated**: it is the values whose
written line contains "the objective stated at announcement" or "its stated objective". That derives
to `worked, partly, failed, too-early` — and if the definitions are ever reworded so that none
matches, the module throws at load rather than silently policing nothing.

**Two ways to satisfy it, and the second is what makes the rule usable.** `claimAtLaunch` is the
machine-readable objective — its own description already concedes the asymmetry that produced this
defect: *"What the government said this would achieve, **where applicable**"*, one field optional
because the objective may be absent, while `assessment` is required as though it never is. But eight
live records take a real objective from a statute (RTE s26's ten per cent ceiling, s25's staffing
norm), a court direction (Bhasin), or a process's own object (appointment on merit), and no field
holds those. So `assessmentNote` is accepted as the alternative — which is what that field is for by
its own description. The effect is that an objective which cannot be machine-read must be
**declared** rather than inferred by whoever next reads the record.

Deliberately **not** satisfied by a keyword in `summary` or `caseFor`. All fourteen wrong scores would
have passed a keyword test — L-0071's `caseFor` names an objective in terms, and it is an objective
that was **met**, by a policy the record is not about.

### Fixtures, both directions

| fixture | proves |
|---|---|
| `broken/ledger/L-9503` | a scored value on a record with no claimAtLaunch and no assessmentNote |
| `objective-from-statute/` | a scored value whose objective is a statute named in assessmentNote **stays clean** |

The second is the one that decides whether the rule is usable. A rule demanding `claimAtLaunch` alone
would fire on all eight statutory records and force a rescore on records that are correct — an
over-firing gate, which is the kind that gets loosened in a hurry by whoever it blocks.

`MUST_FIRE` 22 → 23.

## What the rule finds in the live corpus: 18 records, in two kinds

**13 are rescores** (the fourteenth, L-0086, carries an assessmentNote and so does not fire — correct,
it is report-only). **5 are documentation, not rescores**: L-0028, L-0033, L-0062, L-0081, L-0098 have
a real objective that is neither a launch claim nor declared anywhere. Each needs one
`assessmentNote` naming its source. **The rescore alone does not clear the gate.**

## GROUP A — 13 scored records with no stated objective

Each was wrong before the schema change, independent of it.

| id | now | → | why |
|---|---|---|---|
| L-0073 | `worked` | `no-objective` | Foodgrain 252→376.56 mt. No measure, no target. Its own `caseAgainst`: the gains came from area and weather, "neither of which is a policy achievement or repeatable". `worked` means a measure achieved its stated objective; there is no measure and the record's own case denies policy attribution. |
| L-0071 | `failed` | `no-objective` | Its own `caseFor` says the procurement system "was built to secure national food self-sufficiency and did so" — the only objective on the record was **achieved**, and the depletion is its consequence. `failed` inverts the record. |
| L-0046 | `failed` | `no-objective` | Road deaths 1.41→1.77 lakh. A condition. No safety target or measure named anywhere on the record. |
| L-0063 | `failed` | `no-objective` | Graduate unemployment 29.1% against 3.4%. A structural relationship; `caseFor` argues it partly reflects educational success. |
| L-0064 | `failed` | `no-objective` | Typed `shock` — "a disruption arriving from outside the government's control" — so `failed`, which requires a measure, contradicts the record's own type. The finding is the missing death count. |
| L-0065 | `failed` | `no-objective` | A comparative condition against Vietnam and Bangladesh. No Indian structural-transformation target is cited. |
| L-0032 | `partly` | `no-objective` | A sequence of frauds and how late each was detected. No supervisory detection target exists. |
| L-0049 | `partly` | `no-objective` | Railway safety record across the period. No stated safety objective on the record. |
| L-0069 | `partly` | `no-objective` | MSP, procurement and the legal-guarantee **demand**. A demand is not a government objective; nothing was claimed to test. |
| L-0103 | `partly` | `no-objective` | AISHE's lag grew 12→25+ months. No publication-timeliness commitment is cited. |
| L-0104 | `partly` | `no-objective` | **Closest call in the group.** The denominator doing half the work is close to a measurement dispute, which would argue `contested`. Filed `no-objective` because the record's subject is the enrolment trajectory and no GER target is on the record; the denominator point already lives in the cases. Flagged for review. |
| L-0021 | `too-early` | `no-objective` | A foreign government's tariff. `too-early` reads "has not run long enough for **its stated objective** to be testable" — India stated none, and the measure is not India's. **Both cases empty — see below.** |
| L-0022 | `too-early` | `no-objective` | A statistical rebasing. An instrument, not a measure with an objective. **Both cases empty — see below.** |

**Blocking dependency:** `no-objective` is in the both-cases branch, so rescoring **L-0021 and L-0022
requires `caseFor` and `caseAgainst` to be authored first.** They cannot simply be relabelled.

## The empty-pair defect — three records, one structural cause

L-0021, L-0022 and **L-0033** (a third, not previously named) carry `caseFor` and `caseAgainst` both
empty. They are not three coincidences. The schema's both-cases branch reads
`worked, partly, failed, reversed, contested` — **`too-early` is omitted**, and it is the only
non-baseline value that can carry an empty pair. All three records that do are `too-early`; the other
two `too-early` records (L-0061, L-0086) happen to carry both cases and would be unaffected.

**Reported, not fixed.** Adding `too-early` to the branch is a one-line schema change that would
immediately red-gate three records pending authoring, and it was not in this cycle's instruction.

## GROUP B — the 42 `contested` records with no objective: 17 move, 25 stay

**This diverges from the expectation that most would move, so the test is stated rather than the
conclusion.** Both facts are true of all 42 — no objective, and more than one reading available — so
the question is which is the sharper fact. The test applied:

> `contested` is retained where the record's central finding is a **rival account**: two instruments
> or measures disagreeing, two incompatible factual claims no forum has resolved, or a live normative
> question the record declines to resolve. `no-objective` where the facts are agreed and the only
> reason a score is impossible is that nothing was claimed.

Under a looser test — "the same evidence supports two readings" — nearly all 42 stay, which is how
`contested` became a sink in the first place. Under a stricter one — "any record with no objective
moves" — the two values stop being distinct axes and `contested` loses the cases it exists for.

### MOVE to `no-objective` — 17

| id | why |
|---|---|
| L-0111 | A reporting instrument restated and split. Its own note: "The assessment vocabulary is built for measures with stated objectives and this record is a change to a reporting instrument." |
| L-0112 | A column's meaning changed under an unchanged heading. Reporting instrument. |
| L-0119 | An infiltration table published for a decade, then stopped. Reporting instrument. |
| L-0120 | A cumulative sentence carried for a decade, then dropped. Reporting practice. |
| L-0121 | Custodial deaths have no cell in any instrument. Structural absence; its note records that NCRB has stated no reason because it has none. |
| L-0122 | Fifty AFSPA sanction requests, none granted, no decision rule held by anyone. |
| L-0123 | Two quantities lost their only legislative route. |
| L-0124 | Its own note: "no measure of the enacting authority's was withdrawn and **no stated objective went unmet**." |
| L-0094 | A national statistic tabled for a decade then withdrawn. Same shape as L-0119/L-0120: a disclosure ending. Its note already records that "neither side of the pair describes a failure". |
| L-0107 | The field is mandatory and filled for every teacher; the Union declines to aggregate. The finding is the non-publication. |
| L-0117 | "The quantity that is constantly quoted and has no instrument." `caseAgainst` is that it is not a series at all. Its note separates the one genuinely contested sub-question out as "an absence with a route, not a disagreement". |
| L-0087 | Facts agreed — referrals 71%→25%→16%. `caseFor` (discretionary, sitting days fell) and `caseAgainst` (the laws that skipped scrutiny were the most consequential) weight agreed facts. No target existed. |
| L-0089 | Same shape. `caseFor`'s consolidation explanation is, in the record's own words, "not been demonstrated as its cause". |
| L-0109 | `caseAgainst` is a **measurement gap** — stock published, flow not, "so nobody can say" — not a rival reading. |
| L-0027 | The two sides argue different objects: the resolution's 88.4% recovery against the supervisory failure that preceded it. Neither is a claim being tested. |
| L-0074 | **Flagged.** 5,892 cases against 15 convictions; the numbers are agreed. `caseFor` disputes what the denominator means, which is near a rival measure. Recommended move, lowest confidence in the group. |
| L-0114 | **Flagged.** Its own note affirms `contested`, but what the note describes is an **asymmetry** — the state holds both terms of its own trade-off, publishes the favourable one, refuses the unfavourable one — not two readings of one thing. |

### STAY `contested` — 25, with the rival account named

- **Rival instruments or denominators:** L-0058 (PLFS against CMIE, opposite directions) · L-0083 (27–39.7% on completed trials against 2.8% on arrests) · L-0091 (two published closure measures) · L-0105 (sample against enumeration) · L-0078 (three indices against a specific methodological objection) · L-0059, L-0060 (rival decompositions) · L-0068 (OECD PSE accounting)
- **Incompatible factual claims unresolved:** L-0115 (Amshipora disposal and scope of responsibility) · L-0116 ("two sides assert incompatible facts that no forum has resolved") · L-0113 (two readings of one retrieved document, per its own note)
- **Live normative or legal question the record declines to resolve:** L-0101 (whether the conditionality is legitimate — the Supreme Court also declined) · L-0076 (a statutory entitlement against a functional obstruction) · L-0075
- **Rival causal or predictive account of agreed data:** L-0056 (policy against private strategy — "attributing it to policy inverts cause and effect") · L-0031 (diversification against risk migration) · L-0042 (stunting improving while anaemia rose 8pp) · L-0025 (write-off as prudential practice against write-off as waiver) · L-0079 (law applies to all against timing requires explanation) · L-0019 (two departures against a pattern) · L-0040 (a scheme retained and scaled against a guarantee budget-capped into rationing) · L-0070 · L-0118 ("consent or suppression", with divergent testable predictions) · L-0020 **flagged** (adequacy of the fiscal response; no claim on the record)
- **L-0092 — flagged, recommended STAY, against expectation.** It is one of the ten. But its own note says a précis reading and a misrepresentation reading "are both available on the same documents", which is a rival account of one act. Its note also anticipates a *different* new value — "if a value for **presentational findings** is added" — which `no-objective` is not.

## L-0096 — stays `contested`, confirmed

Not a no-objective record and never was. It carries a `claimAtLaunch` (MHRD: "the last chance… would
not be allowed to continue in-service beyond 1st April 2019"). Its note states the mechanism exactly:
worked/partly/failed are unavailable "because all three turn on **what share of the objective was
achieved**", and the completion rate was never published. **Stated objective, unmeasured outcome** —
a different axis from *no objective*, and the value the new definition explicitly excludes.

## L-0086 — reported, not rescored

`too-early` reads "the measure is in force but has not run long enough for **its stated objective** to
be testable". What is untestable on L-0086 is a **court outcome** — the provision is before a
Constitution Bench — and, per its own note, "how commissions apply the amended clause". Neither is the
run-time of an objective. The definition does not cover the record, and no value in the enum does:
`no-objective` is wrong too, because the amendment has a purpose. **A third state — in force, testable
in principle, awaiting an external adjudication — has no value.** Recorded as a finding, not resolved:
resolving a taxonomy in the pass that discovers it is how `differentFacts` reached seventeen records.

## Gate

```
validate    INVALID — 18 objective-required errors (the rule working; rescore not applied)
selftest    FAILED at step 1 (/data must validate) — same cause, nothing else
            fixtures verified directly: objective-required fires on broken/,
            stays silent on objective-from-statute/
typecheck   clean
```

**Not deployed, and not deployable.** Production not checked; nothing here claims it was.

## Addendum to 2026-08-03d — the empty-pair hole closed; three findings deferred

Code side only. **No `/data` record was edited in this cycle or the one above.** The rescore table in
`2026-08-03d` stands as tabled and comes back to the research session.

### `too-early` added to the both-cases branch

One hole, not three defects. The schema's `allOf` both-cases branch read
`worked, partly, failed, reversed, contested` (and, from this cycle, `no-objective`) — `too-early`
was the only non-baseline value that could carry an empty pair, and all three records that do are
`too-early`. The other two `too-early` records, L-0061 and L-0086, already carry both cases and are
unaffected, which is what makes this a hole in the branch rather than three independent lapses.

**Deliberately red-gates L-0021, L-0022 and L-0033 pending authoring.** Correct outcome; left red.
Exactly 9 new errors — three records × (`caseFor` missing, `caseAgainst` missing, "must match then
schema") — and no collateral anywhere else in the corpus.

Gate now: **27 errors** — 18 `objective-required` + 9 missing-case. Both sets are the rules working.

### Two enum states with no value — to be decided TOGETHER, after phase 12

Recorded jointly and deliberately not resolved. **Adding a value as each one appears is how `reversed`
came to cover two mechanisms**, and resolving a taxonomy in the pass that discovers it is how
`differentFacts` reached seventeen records.

1. **L-0086 — in force, testable in principle, awaiting external adjudication.** `too-early` reads
   "has not run long enough for **its stated objective** to be testable". What is untestable here is a
   **court outcome** — the provision is before a Constitution Bench — and how commissions apply the
   amended clause. That is not the run-time of an objective. `no-objective` is also wrong: the
   amendment has a purpose.
2. **L-0092 — a presentational act.** Its own `assessmentNote` anticipates the value it wants and it
   is not the one added this cycle: *"The value may change on review if a value for **presentational
   findings** is added."* The record scores a framing, not a measure — two Ministry factsheets on the
   same survey six months apart.

**Why together.** Both are records whose *object* is not a measure: one an adjudication pending on a
measure, one an act of presentation about a measure. A single value may cover both, or the right
answer may be that `assessment` needs a companion axis rather than more values — which is the
question the audit opened and this cycle deliberately did not close. Decide after phase 12, when
detentions, shutdowns and 370 mechanics will have produced more instances of both shapes.

### Three low-confidence calls in the tabled rescore

Flagged so the research pass reads them first rather than treating the table as uniform.

- **L-0104** (`partly` → `no-objective`) — the weakest of Group A. "The denominator does half the work"
  is close to a measurement dispute, which would argue `contested`. Filed `no-objective` because the
  record's subject is the enrolment trajectory and no GER target sits on the record — but its own
  `caseAgainst` reasons *against* a target ("the 50-per-cent-by-2035 target becomes progressively
  easier to hit without teaching anyone"), which cuts the other way.
- **L-0074** (`contested` → `no-objective`) — lowest confidence in Group B. The numbers are agreed —
  5,892 cases, 15 convictions — which argues no-objective. But `caseFor` disputes what the denominator
  *means* (the ED cannot self-initiate; on completed trials the rate is 93-96 per cent), and a
  disputed denominator is close to a rival measure, which argues contested.
- **L-0114** (`contested` → `no-objective`) — its own `assessmentNote` affirms contested, and moving it
  overrides an explicit authored judgement. The reason to consider moving is that what the note
  describes is an **asymmetry** — "the state holds the measurements for both sides of its own
  trade-off, publishes the term favourable to it and refuses the term unfavourable to it" — rather
  than two readings of one thing. Its `differentFactsNote` cuts against the move: "one side's central
  number is unmeasured and the other's was withheld", which is a rival-account structure.

### Gate

```
validate    INVALID — 27 errors (18 objective-required, 9 missing-case). Both rules working.
typecheck   clean
```

Not deployed and not deployable until the `/data` pass runs.

## Addendum to 2026-08-03d — the rescore APPLIED (25 of 27), four records held red

Authorised in chat and applied here. **25 records rescored, 4 notes written, nothing else touched.**

### Applied

**Group A — 10 of 12.** `no-objective` on L-0073 (`worked`), L-0071, L-0046, L-0063, L-0064, L-0065
(`failed`), L-0032, L-0049, L-0069, L-0103 (`partly`). L-0021 and L-0022 are held: they cannot be
relabelled until their cases exist, because `no-objective` sits in the both-cases branch.

**Group B — 15 of 17.** `no-objective` on L-0111, L-0112, L-0119, L-0120, L-0121, L-0122, L-0123,
L-0124, L-0094, L-0107, L-0117, L-0087, L-0089, L-0109, L-0027.

**Two reversals of my own tabled call, both against me and both correct.**
- **L-0114 stays `contested`.** Its own `differentFactsNote` meets the STAY criterion three times
  over — one side's central number unmeasured and the other's withheld, plus three further factual
  disputes "unresolved beneath that", including two bodies telling the same court incompatible things
  with no forum deciding between them. I tabled a move against a note that argues the opposite.
- **L-0074 stays `contested`.** Same two-denominator structure as L-0083 — 0.25 per cent on cases
  initiated against 93-96 per cent on completed trials, exactly as L-0083 runs 2.8 per cent on arrests
  against 27-39.7 per cent on completed trials. L-0083 was tabled STAY. **Consistency governs**: two
  records with the same structure cannot take different values because they were read on different
  days.

**L-0104 removed from Group A entirely** — stays `partly`, and is one of the five documentation cases.

### The four notes

| id | field | what it names |
|---|---|---|
| L-0081 | `assessmentNote` | Anuradha Bhasin v. Union of India, 10 January 2020, and that **publication** is the direction being scored |
| L-0098 | `assessmentNote` | RTE s.12(1)(c), and Dinesh Biwaji Ashtikar v. State of Maharashtra, 2026 INSC 56 |
| L-0104 | `assessmentNote` | NEP 2020's 50-per-cent-by-2035 GER target, which `caseAgainst` already scores against |
| L-0062 | **`claimAtLaunch`** | the EPFO and KLEMS figures — a government claim, so the claim field, not a note |

L-0062 is the one that belonged in `claimAtLaunch` rather than `assessmentNote`, and the distinction
is the whole point of the audit: `claimAtLaunch` holds what was claimed, `assessmentNote` holds where
an objective comes from when no field can hold it.

### Held RED, deliberately — four records, two reasons

**Blocked on retrieval, and the note must not be written first:**
- **L-0028** — `worked` on the Yes Bank reconstruction. The objective is the Reconstruction Scheme's
  own object, and **the record has never cited the scheme**: its only source is a T4 news item on the
  SMBC stake sale. Writing an `assessmentNote` naming an unretrieved instrument would clear the gate
  on a reference nobody has read. Retrieve the March 2020 notification; if it cannot be retrieved,
  `worked` is not supportable and the record is rescored instead.
- **L-0033** — `too-early` on ECL provisioning. Only source is a T4 blog on the Financial Stability
  Report; the RBI final directions of 27 April 2026 are not cited. Same rule.

**Blocked on authoring** — L-0021, L-0022, L-0033 need `caseFor` and `caseAgainst`. Drafts were
prepared and are NOT in `/data`; they are for the research session to accept, amend or reject.

```
validate  INVALID — 13 errors
          4 objective-required (L-0021, L-0022, L-0028, L-0033)
          9 missing-case       (L-0021, L-0022, L-0033)
```

Every one is a record deliberately held. **No error remains that a rescore would clear.**

### Loose end closed: `differentFactsNote` on FALSE

Its description read "Required in practice wherever differentFacts is true", which reads as true-only
and made the one deliberate false-note in the corpus look like a stray. It now states that a note is
**permitted and meaningful on false** — recording why a record is a weighting case rather than a
different-facts one, which is the judgement most at risk of being made silently — and names L-0118 as
the worked instance. Description only: no rule, no data, no gate change.

This was the third of the three items queued before phase 12. The other two are done: `lenses[]`
(2026-08-03b) and the assessment audit (2026-08-03d).

### Still owed, and now surfaced in five phases

**`demography`** — a decision, not a note. Zero records; its own definition says it "describes the
word, not observed practice". Either attested or removed.

## Addendum to 2026-08-03d — L-0021 and L-0022 landed; retrieval FAILED on both documents

### Landed

**L-0021** — `caseFor` and `caseAgainst` as drafted, then `too-early` → `no-objective`. The pair is
about the size and durability of the shock, not about India's handling of it, because the record
carries no material on any Indian response. Both sides rest on T4 sources and the record's own
`confidence: low`; nothing in the pair is pinned to a primary document, and that is a property of the
record as it stands, not of the drafting.

**L-0022** — `caseAgainst` as drafted; `caseFor` **shrunk before landing**, then `too-early` →
`no-objective`.

The drafted `caseFor` argued that the previous series "had been criticised for single deflation for a
decade". **That criticism is not on the record and was not retrieved.** It was cut rather than
sourced. What landed is only what MoSPI's own press note of 27 February 2026 — already a T1 source on
the record — establishes: that the methodology moved to double deflation, a Supply-Use Table framework
and new source data, and that the basis was published with the release. The case now ends by saying
that is the whole of it on the sources retrieved.

**A shorter honest case beats a fuller unsourced one**, and the general form is worth keeping: a case
drafted from a record can only ever be as strong as that record's sources, and padding it with
recalled context is how an unsourced claim enters through the side the gate does not watch.

### Retrieval — one task, two documents, BOTH FAILED

Reported as failure rather than worked around.

**1. RBI ECL final directions, 27 April 2026 — NOT RETRIEVED.**
The primary press release exists at a stable RBI URL
(`rbidocs.rbi.org.in/rdocs/PressRelease/PDFs/PR150994739A099E843668A75A7F92C9E9BD1.PDF`) and **failed
to fetch twice**, both times on a transport error rather than a 404 — the document is there and could
not be pulled.

Worse than a plain failure, and the reason not to fall back on the secondary hits: **the secondary
sources disagree with RBI's own site about what the instrument is called.** Search results give
"Reserve Bank of India (Commercial Banks – Asset Classification, Provisioning and Income Recognition)
Directions, 2026", while RBI's Master Directions page at `id=13146` returns a differently-ordered and
differently-dated instrument — "Reserve Bank of India (Commercial Banks – Income Recognition, Asset
Classification and Provisioning) Directions, **2025**", issued 28 November 2025. Those are two
documents, and which of them is the 27 April 2026 ECL instrument cannot be settled from the secondary
material. **Citing either would be a guess wearing a T1 badge.**

Also not established: **the 60-70 basis point capital impact appears in no primary source retrieved.**
It is load-bearing on both sides of the drafted pair, which is why L-0033's pair stays held.

**2. Yes Bank Limited Reconstruction Scheme, 2020 — NOT RETRIEVED.**
Its identity is corroborated consistently across four independent secondary hosts: notified by the
Central Government vide **G.S.R. 174(E), New Delhi, dated 13 March 2020**, under sub-sections (4) and
(7) of section 45 of the Banking Regulation Act 1949, published in the Gazette of India Extraordinary
Part II Section 3; the moratorium it lifted was S.O. 993(E) of 5 March 2020. **The document itself was
not obtained.** IndianKanoon's copy returns HTTP 403. The two RBI press releases that were fetched are
the moratorium of 5 March and the **draft** scheme of 6 March — the draft explicitly says the scheme
"shall come into force on such date as the Central Government may, by notification in the Official
Gazette, specify", so neither is the notified instrument.

**Corroboration across four secondary hosts is not retrieval.** The gazette reference above is a
research lead for the next pass — a named document, number, date and issuing power — and must not be
entered as a source until someone has read it.

### Gate

```
validate  INVALID — 5 errors
          L-0028  objective-required           (blocked: scheme notification not retrieved)
          L-0033  objective-required + 3 case  (blocked: ECL directions not retrieved)
```

Down from 13. **Both remaining records are blocked on the same retrieval failure, and neither is
blocked on a judgement anyone still owes.**

## Addendum to 2026-08-03d — retries: one failed again, one returned a reproduction

### RBI ECL directions — FAILED A THIRD TIME, and the naming question is a provenance finding

The press release at `rbidocs.rbi.org.in/.../PR150994739A099E843668A75A7F92C9E9BD1.PDF` failed again
on the same transport error. Three attempts, three transport failures, no 404: **the document is
there and this environment cannot pull it.** That is a retrieval-channel finding, not an absence.

**Logged as a provenance finding regardless of this cycle, because it is unresolved and being
unresolved is the finding.** Two candidate titles are in circulation and they cannot be reconciled
from secondary material:

| source | title | date |
|---|---|---|
| search results / law-firm notes | RBI (Commercial Banks – **Asset Classification, Provisioning and Income Recognition**) Directions, **2026** | 27 Apr 2026 |
| RBI's own Master Directions page, `id=13146` | RBI (Commercial Banks – **Income Recognition, Asset Classification and Provisioning**) Directions, **2025** | 28 Nov 2025, updated 1 Jul 2026 |

Same five nouns, different order, different year. **Whether these are two instruments or one misnamed
by the secondaries is not settled.** The secondary material leans toward two — it refers to a
"Repeal Directions, 2026" repealing an earlier Income Recognition/Asset Classification/Provisioning
instrument, which would make the 2025 Directions the thing repealed and the 2026 Directions the
replacement. **That is an inference from search summaries and is explicitly unconfirmed.**

This matters beyond L-0033: a near-identical title differing only in word order and year is exactly
the shape that produces a wrong citation that validates. Any future record citing either instrument
must state which, from the primary.

Also still unestablished: **the 60-70 basis point capital impact appears in no primary source.**
L-0033's pair stays held for that reason and no other.

### Yes Bank scheme — a reproduction, not the gazette. L-0028 rescored.

The retry returned what appears to be the complete text of the Scheme on TaxGuru, a private tax and
corporate-law portal, including a corrigendum of 25 March 2020. It confirms preamble, G.S.R. number,
date and statutory power exactly as the earlier corroboration had them.

**A private portal's reproduction is not the gazette**, and by the standard set one addendum earlier
it is not retrieval. The tier system grades the document retrieved, not the institution behind the
text, so this would enter at T2 at best — and its fidelity to the gazette cannot be checked without
the gazette.

**L-0028 rescored `worked` → `no-objective`**, per instruction, with the reason recorded on the record
itself rather than only here: the objective is named and has not been read, so no score against it is
supportable. The gazette reference stays a **research lead, not a source**, and was not added to
`sources`.

**One substantive thing the reproduction shows, and it cuts deeper than the retrieval failure.** The
Scheme's twelve paragraphs are: short title and commencement · definitions · share capital ·
alteration of articles · constitution of the Board · rights and liabilities · continuation of
employees · no change in offices or branch network · furnishing statements · manner of service of
notice · cessation of moratorium · interpretation. **There is no objects clause anywhere in it.** It
is an instrument of mechanics. If that holds against the gazette, then `worked` on L-0028 was never
scoreable against the Scheme at all, and `no-objective` is not a fallback pending retrieval but the
correct value on the merits. Recorded as a finding to confirm, not as a conclusion: it rests on a
headings list from a secondary reproduction.

### Gate

```
validate  INVALID — 4 errors, all L-0033 (3 missing-case + 1 objective-required)
```

Down from 13 → 5 → **4**. One record, blocked on one document, blocked on one transport failure.

### Merge decision — merged the two green branches, HELD the red one

`lens-axis` and `domain-coverage` merged to `main` in order. **`assessment-no-objective` was NOT
merged.**

The call was between merging red and waiting, and merging red is worse. `npm run build` is
`validate && next build && reachability && domain-coverage`, and `vercel.json` runs the same chain, so
a red `main` is a `main` that **cannot deploy at all** — every later cycle inherits a broken build and
the instrument's founding rule (CLAUDE.md data rule 1: an invalid repo cannot deploy) would be
violated on the default branch to accommodate one unread PDF. Waiting costs one record's rescore
sitting on a branch; merging red costs the deploy path and the rule.

The two green branches carry the work that should not wait: `lenses[]` and the 15+7 backfill, and the
domain-coverage gate with the `education` fix that restored a surface 48 series had been missing.

## Addendum to 2026-08-03d — L-0033 closed; gate GREEN

### Fourth attempt, and the last

The ECL press release failed again on the same transport error. **Four attempts, four transport
failures, no 404 at any point.** Stopped: this is an environment limit, not a research gap, and the
distinction matters for what the record says about itself. A document that cannot be fetched from
here is not a document that does not exist, and the record must not imply otherwise.

### L-0033 rescored `too-early` → `no-objective`

Same standard as L-0028, and the reason is on the record rather than only here. `too-early` reads
"has not run long enough for **its stated objective** to be testable" — and that objective cannot be
quoted from anything retrieved, so the value asserted something the record does not hold.

**The 60-70 basis point figure is gone from the record entirely, not just from the cases.** It was in
the `summary`, which renders as fact on the record page — leaving it there and keeping it out of the
argument would have been the same defect wearing a different field. The summary now says what is
true: the impact is not established here, the only figure in circulation is a T4 relay, and no primary
for it has been retrieved. **A figure that cannot carry an argument cannot carry a summary either.**

The pair was authored from what the record actually holds: the timetable (issued 27 April 2026,
effective 1 April 2027, phased to March 2031), the shift from incurred-loss to expected-credit-loss
recognition, and P-21's forward-dated comparability break on `crar` and `net-npa`. `caseAgainst` ends
by stating its own limit — none of it can be sized, because the directions have never been retrieved.

```
validate  VALID — 0 errors, 96 warning(s)
selftest  23/23 validator rules · 2/2 output gates
```

### Stacked merges — verify the artefact on `main`, never the PR status

**Found by doing it wrong.** PR #3 was opened with base `lens-axis` and merged there at 21:18, ten
minutes *after* `lens-axis` had already been merged to `main` at 21:08. Both PRs reported MERGED.
`main` had the lens axis and **not** the domain-coverage gate: `tools/domain-coverage.mjs` absent, the
build command still ending at `reachability`, and `validate` passing cleanly the whole time because
nothing about the missing gate is visible to it.

**A stacked PR that merges into its base after the base has landed is a silent no-op for `main`, and
every status field says success.** Fixed by PR #4 re-targeted at `main`, then verified by checking out
`origin/main` in a clean worktree and running the tools there — not by reading a green tick.

Written into SKILL.md stage 8: after any stacked merge, verify the artefact exists on `main`.

### Deferred, logged only — prose citations against `sources[]`

A rule asserting that every document named in prose — `assessmentNote`, `caveat`, `caseFor`,
`caseAgainst` — appears in that record's `sources[]`. It is a **partial** guard against the hard stop
this cycle made explicit: entering a document as a source that has not been retrieved. It cannot
catch a fabricated source, because a fabricated source is in `sources[]` by construction. What it
catches is the adjacent and more common case — **a real document named in an argument and never
retrieved onto the record**, which is exactly the shape of L-0028's Reconstruction Scheme and
L-0033's ECL directions before this cycle.

Not built: it needs a citation-extraction heuristic over free prose, and a heuristic that
over-fires here would push authors to cite less rather than retrieve more, which is the wrong
direction. Both fixtures and a tested heuristic under trigger C, as its own cycle.

---

# Verification log — cycle 2026-08-03e (`demography` removed; standing change to SKILL.md)

## `demography` removed from the domain enum

Fifth phase of being flagged. Removed from all four schemas, from `DOMAINS` and `DOMAIN_LABELS`, and
its definition line deleted.

### Preconditions verified before touching anything

```
records carrying demography:  0   (0 ledger domains[], 0 series domain, 0 pairs domain,
                                   0 provenance affectsDomains)
```

**Byte-identity across the shared string, before and after.** The `domain` description is one string
shared by ledger, series and pairs; provenance is that string plus its `- all:` line. Both properties
held before and hold after — the removal did not drift the four apart, which is the failure that
constraint exists to catch:

```
BEFORE   series/ledger/pairs  5eeb91f2ce5b225f  (identical)   provenance  499a324658b6aad4
AFTER    series/ledger/pairs  f1a0b96554fbc290  (identical)   provenance  865e421e6dfaf637
         provenance == trio + "- all:" line   .................. true, before and after
         enum 15 -> 14 in all three; 16 -> 15 in provenance
```

### The reasoning

**Delimitation is an act of the state on representation and files `governance`, per the precedent the
`defence` line already sets** — that line says the state's treatment of civilians in its operations
files `governance`, not `defence`, and the same routing applies here: population is what delimitation
acts on, not what the record is about. Phase 12 (delimitation, domicile, statehood) was the only phase
that would plausibly have attested the value, and delimitation was its only candidate.

**Population has been a denominator, a base or a component in eleven phases and a subject in none.**
L-0104's 18-23 cohort is a denominator; literacy's census base is a base; the peer panel's populations
are components.

**The decisive evidence was already in the tree, and it is stronger than the argument above.**
L-0105 — *"Literacy: the last complete enumeration is 2011"*, the single strongest `demography`
candidate the corpus has ever held — was **deliberately routed to `governance`**, and says so in its
own `assessmentNote`:

> "The record is filed under governance rather than under the demography domain deliberately: see the
> domain-fit note and the stop raised with it."

A stop was raised on exactly this question in phase 10, and the answer taken then was `governance`.
Removing the value applies that precedent rather than setting a new one.

### The counter-argument, recorded so a later phase can reopen this with the reasoning visible

**Delimitation's subject is arguably the distribution itself, not the act.** Seats redistributed by
population is a claim *about* population structure, and J&K delimitation specifically is contested on
precisely that ground — whether seats followed population or preceded it. On that reading phase 12
attests the value and this removal was premature.

If a later phase takes that reading: the value returns with a definition written from observed
practice in the same commit, not the placeholder that was removed. **What is being deleted is a line
that described a word rather than a practice** — it said so itself: "NEVER USED — no record or series
carries it, so its intended boundary is unattested and this line describes the word, not observed
practice." That line failed the §6 threshold in substance while passing it in form, which is why the
value was flagged five times and never used.

### One consequence to hand back

**L-0105's `assessmentNote` still names "the demography domain".** It is left as authored: it records
a routing decision that was correct and is now the evidence for this removal, so editing it would
delete the reasoning this cycle rests on. But it now refers to a value that no longer exists, and no
gate can see that. **Flagged for the research session** — the sentence wants a clause noting the value
was removed on 2026-08-03, and that is a `/data` edit at source.

### Gate

```
validate         VALID — 0 errors, 96 warning(s)
selftest         23/23 validator rules · 2/2 output gates
typecheck        clean
reachability     OK — 492/492 (443 pages scanned, one fewer: /domains/demography/ is gone)
domain-coverage  OK — 14/14 surfaces · 14/14 indexed · 685/685 record references
```

`domain-coverage` moving 15/15 → 14/14 by itself is the check working: the expected set is derived
from the schemas, so removing a value removed the expectation with it, and the four record references
that fell away were provenance records with `affectsDomains: [all]` fanning out to a page that no
longer exists.

## Standing change written into SKILL.md

**Rule 3 — Decide and act; do not round-trip a decision whose evidence is in the tree.** Added
alongside Rules 1 and 2 as a third standing design rule, with its own stop list, the hard stop on
unretrieved sources, and the batching default. The heading and preamble were updated from "Two
standing design rules" to three.

**Stage 8 gains the artefact check**: after any merge, verify the artefact exists on `main`, never
read the PR status. This is Rule 1 applied to git — a status field is a restatement of belief and the
checked-out tree is the observation.

## Addendum to 2026-08-03e — deployed and verified on production

Production is **f0e620a**, `dpl_GHikp3RNmcDuaDLMvS4R559xDpbr`, READY on
`india-government.vercel.app`. Built in 33 seconds from a push 16 seconds earlier.

### Production HTML, fetched over the wire, authenticated

**340 pages** — 124 ledger, 201 series, 14 domain surfaces and the domain index. Zero HTTP failures,
and every page confirmed to carry the instrument header rather than an SSO interstitial.

**The spec was derived from `/data` by construction, not reused.** Both gates were run as
`--data data --out <fetched production tree>` — the same checkers, reading the live merged data
against production output. No needle was written down, so a stale one is impossible:

```
reachability     OK — 492/492 declared marks reachable on their own record page (340 pages)
                 unmeasured 180/180 · caveat 123/123 · notes 178/178 · differentFactsNote 11/11
domain-coverage  OK — 14/14 surfaces · 14/14 indexed · 685/685 record-to-surface references
```

### Controls — 18/18, asserted in both directions

Every edit this cycle asserted **new text present AND old text gone**, because a check that only looks
for the new string cannot tell a successful rewrite from a page carrying both.

| control | result |
|---|---|
| `No stated objective` present on L-0073, L-0111, L-0028, L-0033, L-0021 | PASS ×5 |
| `Worked` gone from L-0073 · `Contested` gone from L-0111 · `Too early` gone from L-0021 | PASS ×3 |
| **`60-70 basis points` gone from L-0033 entirely** | PASS |
| L-0021 `caseFor` renders · L-0022 shrunk `caseFor` renders | PASS ×2 |
| L-0081 names Anuradha Bhasin · L-0098 names 2026 INSC 56 · L-0062 `claimAtLaunch` renders | PASS ×3 |
| **`criticised for single deflation` absent** — the cut claim did not ship | PASS |
| `/domains/demography/` returns **404** | PASS |
| domain index lists **14**, not 15 | PASS |
| control on the control: a bogus needle found on zero of 340 pages | PASS |

**Two of these are the ones worth having.** `60-70 basis points` absent proves the T4 figure left the
`summary` and not merely the cases — the field it was in renders as fact, and a check confined to the
argument would have passed while it still shipped. `criticised for single deflation` absent proves a
drafted-but-unsourced claim did not reach production; it was cut before landing and this confirms the
cut, rather than trusting that it happened.

The bogus-needle control is the one that makes the other seventeen mean anything: a positive-only
suite passes on a checker that finds everything.

### Cycle close

Three items were queued before phase 12 and all three are now closed: `lenses[]` (2026-08-03b), the
assessment audit and its rescore (2026-08-03d), and `differentFactsNote` on false (2026-08-03d
addendum). `demography` is removed. Two gates were added — `domain-coverage` and `objective-required`
— and SKILL.md gained a third standing design rule.

**Open, deliberately:** L-0086 and L-0092 as two enum states with no value, to be decided *together*
after phase 12; the ECL and Yes Bank primaries, unretrievable from this environment and named on their
records as leads; L-0105's `assessmentNote` naming a removed value; and the prose-citation guard.

---

# Verification log — cycle 2026-08-03f (phase 12, kashmir-rights: merged, gated, deployed)

Append-only delta. Nothing above this line was edited.

**Phase 12 ran `/phase kashmir-rights --dry` to the drop, then merged on instruction.**
Base `main` at 08c1b1d. 25 ledger (L-0125–L-0149) · 15 series · 12 provenance (P-88–P-99) ·
15 pairs (PR-33–PR-47). Corpus 444 → 511 records.

## The gate found what the drop's own self-check did not, twice

`stage4-selfcheck` was clean on the drop — 0 errors, 0 warnings, 171 references across all 14 derived
forms. The live gate then caught two things it does not look for:

1. **`validate` — L-0127's second absence stated no `reasonKind`.** Stage 3 omitted it *deliberately*
   and said so: nothing retrieved distinguishes "the Union holds an internal target date" from "it
   holds none". Honest, and the contract still requires a value. **Resolved on the enum's own text**,
   which says `reasonKind` records *the STATED reason — what the responsible body says, not what is
   true*. The Government has never said it holds a date; its stated position is "at an appropriate
   time". Filed `not-collected`, with the unresolved alternative kept in `why` rather than hidden by
   the value.

2. **`reachability` — 2 of 599 marks unreachable, and the cause was worse than the symptom.**
   `jk-prison-detained-category` lost its `caveat` and `notes` on its own page. Diagnosis: `PR-34`
   names that series as `absenceFrom` — the **host of an absence the pair cites**, not a side of the
   pair. `pairsForSeries` matched it anyway, `paired` went true, and the whole series body was
   displaced. **Its own data table went with the two marks and no gate was watching the table.**
   A second, latent fault sat behind it: the caveat was suppressed whenever a pair was `contested`,
   on the assumption `ContestedPairView` would render it — but that component requires *both* sides to
   be series, so a contested pair with a `competingAccountsFrom` side fell through to
   `CoverageUsageView`, which renders no caveat. The mark was suppressed for a renderer that never ran.

   **This is Rule 1's canonical shape and it is the third instance.** Fixed in
   `app/series/[id]/page.tsx`: a pair displaces the page only where the series is itself a *side*
   (`isPairSide`), and the caveat is suppressed only where `ContestedPairView` actually renders it.
   Rebuilt: **reachability 599/599** (unmeasured 240 · caveat 146 · notes 191 · differentFactsNote 22),
   **domain-coverage 831/831**, selftest 23/23 rules and both output gates firing on their fixtures.

## Schema — the provenance id space was exhausted, and widening it needed two code sites

`^P-\d{2}$` admits 99 records and this drop reached **P-99**. It compressed findings twice inside one
phase — once merging 15 researched provenance records into 12, once when a required
`breaks[].provenanceRef` had nowhere to go. Widened to `^P-\d{2,3}$` (and `^PR-\d{2,3}$`) across all
four schemas, permissive only: no id changed, nothing renumbered.

**`ID_PATTERNS` derives from the schemas and followed automatically. Two hardcoded sites did not, and
both would have failed silently rather than loudly:**

- `tools/lib/integrity.mjs` — `rec.caveat.match(/P-\d{2}/g)`
- `components/marks.tsx` — `text.split(/(P-\d{2})/g)` and `/^P-\d{2}$/`

On the string `"see P-100 and P-26"` the old pattern returns **`["P-10", "P-26"]`** — it does not miss
the citation, it **matches a different live record**. A prose citation to P-100 would have linked P-10
and left a stray "0" as text. Both widened, both commented with the failure mode.

## The arithmetic hand-check, run as its own stage, found one defect — and its origin was in `parts/`

Every queued figure recomputed clean except L-0141's delimitation ratios. The record gave the
pre-delimitation Kashmir figure as 149,750 (it is 149,749.46 → **149,749**) and, worse, **stated the
two ratios in opposite directions** — 1.1717 is Kashmir÷Jammu, 0.9707 is Jammu÷Kashmir — in one
sentence presented as a comparison. A reader would conclude the disparity *reversed*. The like-for-like
figure is **1.0302**; the conclusion survives and the numbers as written did not support it.

**Corrected in the record AND at source in `parts/05-elections-delimitation.md`**, where lines 870, 872
and 1487 carry the same defect. Four of phase 11's six arithmetic errors originated in `parts/`; a fix
applied only to the record re-enters on the next run.

**And the source's own verification table marked that line `✓`** — it re-derived the ratio by the
method that produced it. A self-check that recomputes a figure the way it was computed cannot detect
the method being wrong. Rule 1, at the scale of a single arithmetic line.

## `withheld` — eight tested, three passed

L-0134 (Agra Central Prison refused even the *number* of J&K detenus to Venkatesh Nayak/CHRI,
29 August 2019), L-0136 (the *Bhasin* production record), L-0137 (the IFF RTI chain). **Five declined,
every one for absence of a refusal** — including the poll gap, where MHA was asked exactly once across
4,581 answers and gave a jurisdictionally correct non-answer. Phase 11 demoted one on this test and
phase 10 demoted two; **phase 12 demoted five**, which is now the test doing most of its work here.

## The disciplining measure — the first since phase 9

**NCRB's J&K detenu row**: 182 · 409 · 239 · — · 72 · 35 · 90 · **432** · 212 · 283 · **404** · 228 ·
252 · **546** (2009–2022). It contradicts the chronology *both* sides share and neither quotes it: the
peak is **2022**, three years after the reorganisation, against the government's normalcy account; and
**2016's 432 exceeds 2019's 404**, against the critics' 2019-as-rupture account. Weaker than the OECD
PSE and recorded as such — the PSE *nets* two quantities, this *corrects a shared chronology*.

Three limits ride on the series: it is all preventive-detention laws and can never yield a PSA figure;
it is a 31 December stock (J&K released 339 detenus during 2021 while holding 252 at year end); and it
excludes detenus moved out of the territory, whom PSI attributes to the holding State with **no
transfer column for detenus at all** while convicts (7.1) and undertrials (7.3) have one.

## Trigger B, carried rather than rounded

A J&K detenu total of ~619 (404 + UP's 188 + Haryana's 27) adds correctly and rests on an attribution
**no source makes**: PSI's "Belongs to other State" column never names the sending State, in any year.
Haryana's 27 is corroborated to the unit by an MHA Rajya Sabha answer; UP's 188 is corroborated by
nothing but a step change from 0 the previous year. **619 is authored nowhere.**

## Amendments applied to live records — eight, on instruction

L-0081 (adds `kashmir`; the `not-collected` gains two retrieved T1 primaries where it had none; the
January 2024 reiteration re-graded T4 and identified as a J&K *compliance* proceeding), P-54, L-0121
(Fifth Schedule source **T4 → T1**; "no savings provision" replaced by the precise and stronger finding
that s.100's transfer machinery exists and cannot reach an authority the same Schedule abolished; a new
absence for deaths of J&K detenus held outside the territory), L-0123 (Act text **T4 → T1**; a third
lost quantity, PSA figures answered on the Assembly floor in March and October 2010, carrying the
state's own 334-in-six-weeks against 322-in-nine-months contradiction; **scope qualified** — the
termination is subject-matter-specific, and the restored Assembly worked the route twice in 2025 on
revenue subjects), P-86, P-83, L-0083, L-0010 (turnout **not** corrected — the basis added: 65.91%
postal-inclusive and the ECI's 65.52% at-polling-stations are both printed in the same report, seven
pages apart).

**Three baseline records applied at source:** L-0003, L-0005, L-0010 → `["governance", "kashmir"]`.
The domain enum's own `defence` line decides it — *"The state's treatment of civilians in those
operations files governance, not defence."*

**L-0010's flood half carries no domain, logged as an unresolved fragment and not a defect.** No value
fits without being stretched: `environment` is "the resource base", `infrastructure` needs content the
record does not have, `human-development` ties to what delivery produced. The record is not split.

## Source verification — three citations were wrong before they landed

Applying the amendments, I wrote a plausible URL for the Standing Committee 26th Report and a plausible
one for Amnesty ASA 20/5959/2022. **Both were guesses.** The Amnesty guess returned 403; the real PDF
is at a different path. The 26th Report was retrieved from an Internet Archive capture, not from the
live Secretariat path I invented. Every URL added in this cycle was then fetched and confirmed
`200 application/pdf`, and **the Gazette source was verified by MD5 against the drop's claim —
`0e16a53f5e362636f3d65294e562259f`, byte-identical.**

The near-miss is the point: a fabricated citation is valid JSON, passes every schema, and resolves.
Judgement is the only guard, and it failed twice in the same ten minutes until it was checked.

## SKILL.md — four method rules added

**M1** a reachability failure is not a fact until it survives a second resolver, a second process and a
second client (three distinct modes were separated this phase, each with its own fix — the resolver
artefact alone had produced roughly a dozen false "host is dead" findings across two phases).
**M2** quiescence is not completion — checksum stability and parent completion notifications both
failed; the consuming stage re-reads its inputs at the point of use.
**M3** a negative result is worth exactly what the sweep behind it is worth — a single-quote/double-quote
mismatch silently dropped 1,862 PDFs including all of Winter Session 2019, every page returning 200.
**M4** a correction relayed from a subagent is verified before it is relayed onward.

## Open, deliberately

**L-0086 and L-0092 remain two enum states with no value**, and the next cycle sweeps all 149 ledger
records before any value is proposed — phase 11's estimate of ten became 65 on a full read, so the
widened set is the input to the decision, not an afterthought. Four `too-early` and two `contested`
records in this drop are these shapes and are tabulated in the drop's `AMENDMENTS.md`. **L-0143 is the
sharpest instance: five nominated seats in force since 26 December 2023 and never once exercised.**

Also open: `jklegislativeassembly.nic.in` and `jkhome.nic.in` are genuinely NXDOMAIN on every resolver
tried, so phase 11's findings on both stand and **no amendment was owed on either** — a subagent
claimed otherwise and was overturned. A live Assembly presence exists at `jkla.neva.gov.in`; whether it
carries the proceedings L-0123 depends on is **not established**, and L-0123's caveat says exactly that.

## Addendum to 2026-08-03f — deployed and verified on production

Production is **4e50ba0**, `dpl_Bo7J1emgji7ExKTs2wjGJoJsZQr5`, **READY**, aliased to
`india-government.vercel.app`. Built in 36 seconds. The artefact was verified **on `main` by reading
the files**, not from the PR status — 149 ledger / 216 series / 99 provenance / 47 pairs, the widened
`^P-\d{2,3}$` in the schema, and both new layer files present.

**491 pages fetched over the wire, zero non-200.** The fetch list was **built from `/data` by
construction** — every series, ledger and provenance id enumerated from the JSON, every domain from
the union of records — so the page set cannot drift from the corpus.

**Both gates re-run against the fetched production tree**, `--data data --out /tmp/prodtree`, so the
spec is derived from `/data` at run time and **no needle was written down**:

- **reachability 599/599** over 491 pages — unmeasured 240/240 · caveat 146/146 · notes 191/191 ·
  differentFactsNote 22/22.
- **domain-coverage 14/14** surfaces, 14/14 linked from the index, **831/831** record-to-surface
  references.

**Controls 17/17, both directions.**

Present, from production HTML with `<script>` stripped first (the framework embeds the whole payload
as escaped JSON, so a mark rendering nowhere is still in the file): the Article 370 record; the word
"pending" on L-0149; **546** on `jk-detenus-psi`, the disciplining measure's 2022 peak; **the caveat
the reachability gate caught**; **395 on `jk-prison-detained-category`, its data table — the thing no
gate watches and which was going with the two marks**; "Governance" on L-0003, the baseline domain
applied at source; **65.91 on L-0010, deliberately NOT corrected**, with "postal-inclusive" beside it;
"Centralized data" on L-0081; 334 on L-0123; P-99 rendering at the widened id ceiling; and L-0125
reachable from `/domains/kashmir/`.

Absent: **619**, the trigger-B figure authored nowhere; **149,750** and **0.9707**, the two halves of
the delimitation defect; and "no savings provision", the phrase L-0121's amendment replaced.

**The bogus needle is what makes the other sixteen mean anything.** `ZZZ-BOGUS-NEEDLE-ZZZ` was asserted
absent from L-0125 and was absent — which proves the negative controls are reading real HTML rather
than reporting absence because the file was empty, unfetched, or matched by a broken predicate.

**A note on the four negative controls that are not the bogus one.** Each asserts a *correction reached
production*, not merely that a record changed: 619 proves the figure never entered any layer; 149,750
and 0.9707 prove the arithmetic fix shipped in both its halves — and 0.9707 in particular, because the
off-by-one alone would have been a cosmetic pass while the inverted ratio was the substantive defect;
"no savings provision" proves the L-0121 amendment replaced the phrase rather than appending to it.

---

# Verification log — cycle 2026-08-03g (shape sweep, url-check gate, data hygiene)

Append-only delta. Nothing above this line was edited.

## The shape sweep — 149 records, no value added

Phase 11 estimated ten records of the two undecided shapes; phase 12 identified six from its own
records. **A full sweep of all 149 finds 17.** The two shapes moved in opposite directions:

- **L-0086 shape (in force, awaiting external adjudication) — 5, and it did not grow at all.** 144
  previously unswept records produced zero new members. All five are `too-early`, and there are only
  six `too-early` records in the corpus — **so 83 per cent of that value is occupied by a state its
  own definition does not describe.** Only L-0061 uses it as written.
- **L-0092 shape (presentational findings) — 12, up fivefold**, ten of them outside phase 12's
  records. Split 7 `no-objective` / 5 `contested`, and **the split is not a considered one**: commit
  `e2faa70` moved four of them in a pass whose subject was draining the `contested` sink, and left
  their siblings behind.
- **Overlap: zero**, and not by the sweep's drawing — L-0143 rejects the second shape for itself in
  its own note.

**No value is proposed.** The decision is taken across both shapes together, after the set is known.

## url-check — a new gate, and it was wrong twice before the corpus corrected it

Built to close the narrow mechanical part of the fabricated-citation gap: every URL added or amended
in a cycle is fetched and confirmed before commit. URL-bearing fields **derived** from `format: "uri"`
in the schemas rather than listed. Trigger C satisfied, fires-correctly fixture derived from the real
2026-08-03f regression.

**It then reported ~50 live government hosts as dead.** Two defects, both found by running it on the
corpus and neither visible to its fixtures:

1. It discarded curl's stdout on a non-zero exit. curl exits 6 when it cannot resolve a host it meets
   **while following a redirect**, having already printed the status. "Answered 307, could not resolve
   the next hop" became "no response". **The tool written to prevent M1's false-dead findings was
   manufacturing them.** The fallback now follows redirects hop by hop, resolving and pinning each new
   host.
2. Two outcomes were not enough. **401/403/429 means the host answered and refused an automated
   client, which is not evidence a document is absent.** The corpus holds 18 such against 4 genuine
   404s, and `eci.gov.in/statistical-reports` — one of the 18 — is cited by live phase-12 records. On
   the rule as specified this gate would have blocked that commit over a document that is really
   there. Now: confirmed / unverifiable / failed.

**The honest cost, pinned in the selftest: one of the two URLs that motivated the gate returns 403,
so it is now unverifiable rather than failed. The gate catches one of the two regressions it was
built for.** A wrongly-guessed URL and a correct one behind a bot-block are indistinguishable to it.

**Spec §8 gains the general form:** both fixtures present proves the rule does what was specified,
never that the right rule was specified. Three instances in one cycle, all on this gate.

## Corpus audit — and the finding is not link rot

217 confirmed · 18 unverifiable · 28 failed, of 263. Of the 28, **19 are bare domain roots** —
`mospi.gov.in/` carries nineteen records, `main.sci.gov.in/` ten. A root names an institution and
retrieves nothing; those citations were never doing a citation's work, and the fetch only made it
visible. **Deferred and scoped separately**, since it is mostly phases 1-9, authored before any of
this discipline existed, and each needs either a specific document URL or an honest demotion — which
needs a decision on what tier a bare root is.

## Data hygiene applied this cycle

**Ten notes reconciled with their values.** L-0094, L-0111, L-0112, L-0117, L-0119, L-0120, L-0121,
L-0122, L-0123, L-0124 each carried `assessment: no-objective` with an `assessmentNote` opening
"Contested…" — casualties of `e2faa70`, which rescored the records and did not rewrite the notes. **On
exactly the shape under review, ten records' reasoning of record contradicted their value of record,
and nothing in the validator can see it because both halves are individually valid.** The substantive
reasoning stood up in all ten and is preserved verbatim; only the value each names was corrected, and
three that asserted "two defensible readings" — which is the `contested` definition — were re-argued
on `no-objective`'s.

**The `struck-down` revisitTrigger has fired, and its own test is answered.** L-0077 and L-0080 asked
for re-opening at a third judicially invalidated record and required a domain-clustering check,
warning the distinction might be a rights-and-institutions artefact. The sweep found **four**: L-0077,
L-0080, L-0097 and L-0108. **The clustering test resolves against the artefact hypothesis** — L-0097
and L-0108 are education records, so the four span governance, education and federalism. Recorded on
both triggers. **No value proposed**; queued with the other two open enum states, because deciding
inside the cycle that discovered the firing is how `reversed` came to cover two mechanisms.

**Three archive citations replaced with what they should always have been.** L-0137 and L-0139 cited
`web.archive.org/web/*/…` — the archive's **search interface**, which retrieves no document — and are
now the specific timestamped snapshots the research verified (`20250212111631id_`, `20250102084701id_`,
both confirmed 200 `application/pdf`). L-0140, P-95 and `jk-published-suspension-orders` cited the bare
CDX endpoint, which returns 400 without a query, and now cite the exact reproducible query —
**which returns 7,261 rows, independently matching the count those records state.** P-70's query target
was never recorded in its drop, so a scoped query was built and verified rather than invented; it
**confirms** the record's claim that no edition later than 2019-2021 was archived.

**All three were authored in phase 12, by this run, and url-check caught its own author in the cycle
that built it.** All four changed URLs confirm 200.

## Deferred, deliberately

- **The 313 bare-domain source URLs**, scoped after phase 13 as above.
- **The `caseFor`-is-weakest-where-the-position-is-procedural pattern.** Observed across L-0138,
  L-0142 and L-0143 in phase 12: the case for is thinnest exactly where the government's position is
  procedural rather than substantive, and in L-0138's case unavailable on the record's own facts.
  **Not gateable** — no mechanical test distinguishes a weak case honestly reported from a weak case
  lazily written, which is the same exposure §8 already records for argument pairs. Worth watching in
  phase 13, and L-0138 now carries it on the record.

---

# Verification log — cycle 2026-08-03h (`awaiting-adjudication` added; shape 2 logged, not solved)

Append-only delta. Nothing above this line was edited.

## Shape 1 — `awaiting-adjudication`, added with its definition in the same commit

> **awaiting-adjudication:** the measure is in force and its effect is testable in principle, but the
> term that would settle the assessment is a pending decision by a body outside the enacting
> authority. Distinct from `too-early`, where the obstacle is elapsed time.

**Four members, not five: L-0086, L-0127, L-0134, L-0143.**

**The value lives in ONE schema, not four.** `assessment` is a ledger-only field — series, provenance
and pairs have no assessment — so the instruction's "all four schemas" had nothing to act on beyond
`ledger.schema.json`. Mirror sites updated with it: the `allOf` branch requiring both cases (a scored
value carries both sides), `lib/types.ts`, `lib/format.ts`.

**No change was needed to `objective-required`, and that is the derivation working rather than luck.**
`OBJECTIVE_PRESUPPOSED` is derived from the definitions' own text — the values whose line contains
"stated at announcement" or "its stated objective". The new definition contains neither, because what
is pending is *a decision*, not the outcome of a claim, so the value correctly presupposes no
objective without anyone editing the rule.

**L-0139 does NOT take it, and the boundary is recorded on the record.** It is the fifth member of the
shape as the sweep drew it and the one that contradicts the value's own text: what it awaits is **an
act of publication by a holder** — a year of post-commencement orders at a live address, a review
order carrying an actual finding — not a ruling by an adjudicator. Those accumulate with time, which
is what `too-early` describes. **Stretching the value to absorb it would have repeated the exact
defect the exercise exists to undo:** `reversed` came to cover two mechanisms because a value was
widened to fit a member rather than a member filed on the value's text.

**L-0086 now records its own strain.** Until this cycle the anchor record argued its value and said
nothing about the value not fitting, while every record diagnosed from it — L-0127, L-0134, L-0139,
L-0143 — said more about the problem than the record they were named after. The strain lived only in
this log, which is not where a reader of the record looks.

**`too-early` re-read against the two members it retains, and amended.** It now states that the
obstacle is elapsed time *and the evidence time accumulates*, names `awaiting-adjudication` as the
value where the obstacle is a pending external decision, and records that L-0139 is the boundary case
and deliberately inside. The definition described both members before the amendment; it did not
distinguish them from the state that had been living inside it, and now it does.

**Before: 5 of 6 `too-early` records were in a state its definition did not describe. After:
`too-early` holds L-0061 and L-0139, and both fit its text.**

## Shape 2 — a CONFIRMED STATE WITH NO HOME. No value. Not designed.

Twelve records: L-0092, L-0094, L-0111, L-0112, L-0113, L-0114, L-0119, L-0120, L-0129, L-0133,
L-0141, L-0142. The finding is about **an act of presentation** — a body changing what it says about
its own figures — rather than about a measure's outcome.

**No value is proposed, and the reason is structural rather than caution.**

**1. It is not record-scoped, and an `assessment` value is a whole-record field.** In at least eight
records the presentational finding is a co-equal finding *inside* a record whose primary subject is a
real measure. **L-0145 is the worked instance**: its title carries both halves — "Land law repealed by
executive order five days before the power lapsed, **and a transfer count in four units**". The first
half is a real change in the world; the second is five publications in five years in four
incommensurable units, then silence. One `assessment` cannot express a finding that occupies half a
record, and filing the record on either half misdescribes the other.

**2. The likely fix is a COMPANION AXIS, not an enum value — the `lenses[]` shape.** `lenses[]` exists
because `domain` is single-valued and "substantive subject plus cross-cutting lens" is two axes in one
field. This is the same shape one layer over: a property of *part* of a record, in a *whole-record*
field. **Not designed here.** Designing a taxonomy in the pass that discovers it is how
`differentFacts` shipped at seventeen records.

**3. The boundary is one line, and moving it takes the set from 12 to 16.** Recorded verbatim from the
sweep, because the operator should check the boundary rather than the conclusion:

> I separated *a body changed what it says about its own figures* (positive: restated, relabelled,
> redefined, deleted, ceased, framed selectively) from *a quantity was never said at all* (rejected:
> L-0107, L-0117, L-0121, L-0138 — structural absences already served by `no-objective` and by
> `reasonKind`). That line is defensible and is where I drew it, but it is a line I chose; the
> operator should check it first.
>
> L-0094 included and L-0107 excluded — the two are treated as one family by the 2026-08-03d table,
> which moved both together for the same stated reason. I split them: L-0094's subject is a disclosure
> practice that **changed**; L-0107's is a field collected and **never once** published. Change-of-account
> versus never-an-account. This single line also decides L-0117, L-0121 and L-0138 (all excluded) and
> L-0119/L-0120 (both included). **It is the highest-leverage boundary in this report: move it, and
> shape 2 goes from 12 to 16.**

**4. The 7/5 split across `no-objective` and `contested` is an ARTEFACT, and it is being preserved as
evidence.** Commit `e2faa70` — *"Apply the rescore: 25 records to no-objective"* — moved L-0094,
L-0111, L-0112, L-0119 and L-0120 in a pass whose subject was draining the `contested` sink, and left
L-0113 and L-0114 behind in the same file and the same family. L-0114 was expressly tabled for the
move in cycle 2026-08-03d and was not moved. L-0092, L-0129 and L-0141 were authored later and took
`contested`. **So the distribution tracks one unrelated reform plus authoring date, not any judgement
about the shape.**

**The twelve are deliberately left as filed and the split is NOT reconciled.** Normalising it would
destroy the artefact that demonstrates the vocabulary is not tracking the state — which is the single
strongest piece of evidence that this state needs a home. The ten note-versus-value contradictions
fixed in cycle 2026-08-03g were a different defect: there the *reasoning* contradicted the *value*.
Here the values disagree with each other, and that disagreement is the finding.

**Revisit after phase 14, with more members.**

## Deferred, carried forward

- The 313 bare-domain source URLs.
- The `caseFor`-is-weakest-where-the-position-is-procedural pattern; not gateable.

---

# Verification log — cycle 2026-08-03i (two argument cases re-authored)

Append-only delta. Nothing above this line was edited.

**Scope: `caseFor` on L-0142 and L-0143, `assessmentNote` on L-0143.** Nothing else in either record was
touched — `unmeasured[]`, `whatHappened`, `summary`, `seriesRefs`, `provenanceRefs` are byte-identical,
asserted by comparing every field outside the intended set before writing.

## The retrieval that decided the wording — SUCCEEDED

L-0143's new `caseFor` rests on the Puducherry comparator, and the record's own caveat said no court
document had been retrieved. **It has now been retrieved in full**: *K. Lakshminarayanan v. Union of
India & Anr.*, Civil Appeal No. 11887 of 2018, Supreme Court of India, 6 December 2018, Sikri, Ashok
Bhushan and Abdul Nazeer JJ. 84 pages, MD5 `ac8087464cc087a9686bbf2ba60248f1`, from the Court's own
host. **Branch taken: cite it and keep the sentence as written.**

**The judgment is stronger than the sentence it supports, and in a specific way.** Paragraph 94 holds
that nominated members are counted in section 12(1)'s *"members present and voting"*; that the statute
gives no indication they may not vote on budget or a no-confidence motion; and that where the
provision expressly excludes the **Speaker's** vote, an intention to exclude nominated members
*"was bound to find included"*. **That is the same structural argument this record's `caseAgainst`
reaches independently on the J&K Act** from section 22 and section 25(1) — a statute that knows how to
withhold a vote and did not. The two sides of the pair now rest on one reasoning, applied by a court
to one Union Territory and by this record to another.

**The caveat was narrowed, and this reverses the instruction that it stay unchanged.** Reported as a
decision, not asked as a question. The caveat asserted "No court document was retrieved and none may
be quoted as primary" while the same instruction directed that a retrieved judgment be cited — leaving
it whole would have shipped a record whose caveat contradicted its own `sources[]`, which is the
note-versus-value defect fixed ten times over in cycle 2026-08-03g. **Only the now-false limb was
narrowed.** The litigation chronology and the Union's affidavit remain relayed, remain uncited as
primary, and the caveat still says so.

## Claim audit — every factual claim checked against its own record

**L-0142: clean.** Every claim traces to `whatHappened` or `sources` — the four stated bases, the
chart footnote disclosing the basis break, the 65.52/65.91 pair seven pages apart, the phase press
notes, and the cohort-wide absence of the 2024 assembly report across all eight states.

**L-0143: THREE CLAIMS ARE NOT ON THE RECORD, flagged rather than sourced new, as instructed.**

1. **"persons displaced from Pakistan-occupied Jammu and Kashmir have been resident for three
   generations"** — the record establishes the displaced population and its register, not a duration.
2. **"Parliament has used nomination for exactly this before - for Anglo-Indians in the Lok Sabha and
   state assemblies until 2020"** — nothing on the record concerns Anglo-Indian nomination. (The
   string "2020" does appear elsewhere on the record, inside a file stem, so a naive check passes it;
   it is not on the record in this sense.)
3. **"The Delimitation Commission … arrived at the same instrument after hearing the affected
   groups"** — the record establishes what the Commission recommended, not its process.

A fourth, "Puducherry" by name, was also absent from the record and **is now carried by the retrieved
judgment**, so it is no longer a flag. Claims 1-3 are cheap to establish from primary sources and none
was sourced here, because the instruction was to flag rather than source.

## Arithmetic hand-check

Numbers in the new text: L-0142 — 1996, 2014, 2019, 2024, 65.52, 65.91; L-0143 — section 22.
All appear in `whatHappened` or `sources`. No figure was introduced by the re-authoring.

The record's own derived figures re-verified while in there: `2,327,580 + 2,578,099 + 3,918,220 =
8,823,899`, matching the stated elector total exactly; and `73.15 − 55.50 = 17.65` percentage points,
matching the stated division gap exactly.

## A gate-ordering fact worth recording

`validate:selftest` reported *"reachability failed on the live corpus"* and the build immediately
after reported **599/599**. Both were correct: the selftest reads `out/`, which was stale because the
caveat text had changed and no build had run since. **The selftest's live-corpus arm is a function of
when it is run relative to `npm run build`, not only of the data.** It is not a false positive — the
built site really did not carry the new text at that moment — but a run report quoting the selftest
alone would misdescribe the state. Build first, then selftest.

## Gates

validate 0 errors · typecheck clean · selftest green, six url-check assertions · reachability 599/599 ·
domain-coverage 831/831 · **url-check 1/1 on the one URL this cycle added**, confirmed 200
`application/pdf` via the resolver fallback.

## Addendum to 2026-08-03i — deployed and verified on production

Production is **28dfffe**, `dpl_5ke6Hndz9Ztdsfmzsat7VSXq7UYp`, **READY**, aliased to
`india-government.vercel.app`. Built in 32 seconds. Artefact verified on `main` by reading the
records, not from PR status.

**491 pages fetched, zero non-200**, the list built from `/data` by construction. Both gates re-run
against the fetched tree with `--data data --out`, so the spec is derived at run time and no needle is
written down: **reachability 599/599** (unmeasured 240 · caveat 146 · notes 191 · differentFactsNote 22),
**domain-coverage 14/14 surfaces, 831/831 references**.

**Controls 12/12, both directions**, read from production HTML with `<script>` stripped first.

Present: L-0143's new `caseFor`; **the retrieved judgment cited by name on the page**; **"Awaiting
adjudication" rendering with its label**, on L-0143 and on the anchor L-0086; the narrowed caveat;
L-0142's new `caseFor`; the 65.91 figure still in place; and **"Too early" on L-0139**, which proves
the member deliberately left behind did not drift with the other four.

Absent: **"No court document was retrieved"** — the false caveat limb; **"Filed too-early on the
written definition"** — the superseded note; and the old L-0142 `caseFor` clause. Plus the bogus
needle, which is what makes the other three negatives mean anything.

**The two negatives that matter most are the caveat limb and the superseded note**, because both are
cases where a *correction* had to reach production rather than merely a new field. A record can gain a
new `caseFor` and still ship the old caveat contradicting it; asserting the removal is the only way to
know it did not.
