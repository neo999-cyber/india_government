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

# Verification log — cycle 2026-07-31d (Phase 4 code run: coverage/usage pairs)

Counts as expected: 58 series (351 points), 43 ledger, 29 provenance. Relevance check clean.

## Four errors at the gate
| Record | Change | Why |
|---|---|---|
| `pmjay-cards` | added **P-22** | P-22 lists it in `affectsSeries`; the series did not link back. |
| `poverty-tendulkar` | added **P-23** | Same, and HCES comparability bears directly on a poverty headcount. |
| `exports-gdp` | added **P-10** | Same — **and this is the third cycle running**. See below. |
| `ghi-score` | *no data change* | The rule was wrong, not the record. See below. |

## `exports-gdp` has now lost its P-10 back-link three cycles in a row
Fixed in phase 2 (33d7e13), again in phase 3 (1c61bc3), and again here. Each wholesale
replacement of `seed.json` drops it. Widening P-10's `affectsDomains` to `all` this cycle does
**not** prevent it: that satisfies `ref-relevant`, which asks whether a cited record covers the
domain, while the failure is `back-link`, which asks whether a series cited by
`P-10.affectsSeries` cites P-10 in return. Different rules, different directions. Until the
drop process carries `provenanceRefs` forward, this will recur every cycle — it is the single
most reliable prediction in this log.

## The T5 rule was demanding a reference the relevance rule forbids
`ghi-score` is the first contested index outside governance. Rule 6 was implemented as "a T5
series must carry **P-08**", and P-08 is `Contested governance indices (RSF, Freedom House,
V-Dem)`, scoped to `governance`. `ghi-score` is `human-development` and carries **P-29**, a
dedicated GHI methodology dispute covering its domain.

So the two error-level rules contradicted each other: `t5-dispute-link` demanded P-08 and
`ref-relevant` forbade it. **No data could satisfy both**, and satisfying the T5 rule literally
would have pointed readers of a hunger index at a record about press-freedom rankings.

Generalised the rule to what it was actually protecting: a T5 series must carry a dispute
record **covering its own domain** — the same test `checkRelevance` applies. P-08 remains the
governance instance. CLAUDE.md rule 6 amended to match, since it hardcoded P-08 and would
otherwise contradict the validator. The broken fixture still fires the rule (its T5 series
carries no dispute at all), so the gate did not loosen.

## The feature: coverage versus usage (P-22)
Four pairs, rendered together from either side, in a fixed order — output first, then what it
converted into. Landing on `ujjwala-refills` shows the same pair as landing on
`ujjwala-connections`; a coverage series can no longer render alone, the same way no GDP base
can. P-22 is linked from every pair, including sanitation, whose series does not carry P-22.

**No pair prints a single gap number, and that is the finding rather than a shortfall.**
Subtraction is offered only where both sides carry the identical unit string, because that
string is where the denominator lives. None of the four passes:

| Pair | Coverage | Usage | Why it does not subtract |
|---|---|---|---|
| Ujjwala | crore connections | refills per year | different quantities entirely |
| Jal Jeevan | % of **rural** households | % of **certified** households | different denominators |
| PM-JAY | crore cards | crore admissions | a stock of eligibility against cumulative events |
| Swachh Bharat | % of population (WDI, national) | r.i.c.e. SQUAT, four states | different populations; not a series at all |

Jal Jeevan is the trap the rule exists for: 82% and 76% are both percentages and look
subtractable, but "6 points" would be a number no source supports. The view names both
denominators instead. Sanitation renders P-24's two competing accounts side by side and
endorses neither — the counterpart stays in provenance, because two survey figures that
disagree are a disagreement, not a time series.

## Blocking caveats
L-0042 and L-0043 now carry their caveat on the detail page (above the summary, not below it)
and as an inline flag in every compact rendering — ledger index, domain pages, term pages —
because that is where a record could previously appear as a title plus the word "contested"
with the qualification dropped. L-0043's flag leads to P-26; L-0042's points at its own
`caseFor`, there being no provenance record for NFHS haemoglobin comparability.

Held as a rendering rule in `lib/rules.ts`, not a schema field — schemas are agreed in chat.
If this should be first-class data, a `caveat` field on the ledger schema is the way, and the
rendering rule would then read from it.

## New validator rules, both proven by fixture
`pair-incomplete` (tests/fixtures/pair-half) and `caveat-target` (tests/fixtures/caveat-orphan).
Both fire only where part of the guarded thing is present, mirroring `regime-group`: a dataset
carrying neither side simply lacks that pair, and erroring there is noise. `caveat-target`
catches a caveat whose provenance target is dropped or unclaimed — a caveat that silently
vanishes is worse than one never written.

## For research
- `jjm-functionality`, `pmjay-admissions` and `sanitation-basic` do not carry P-22 in
  `provenanceRefs`, and P-22 does not list them. The view links P-22 structurally so every pair
  reaches it, but the "what this number rests on" block on those three pages does not show it.
  Whether the usage side of a pair should also carry P-22 is a research call, not a code one.
- P-22's `affectsSeries` includes `pmay-g-houses`, which has no usage counterpart and is
  therefore **not** paired. It is a coverage figure carrying P-22 that renders alone — exactly
  the shape the pairing exists to prevent. Either a counterpart lands, or it is worth saying in
  the record that none exists.

## Result
`validate` 0 errors / 16 warnings · `selftest` 18/18 plus three isolated rules · `typecheck`
clean · `build` 159 static pages · verified in-browser at 1440px and 390px: all four pairs from
both sides, both caveats on four surfaces each, no console errors.
