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
