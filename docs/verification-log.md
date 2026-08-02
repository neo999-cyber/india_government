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
