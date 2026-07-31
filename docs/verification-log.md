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

# Verification log — cycle 2026-07-31 (Phase 3 code run: first execution of the banking pipeline)

The Phase 3 validator, NPA view and fixtures were written in a prior session with no shell
available and had never been executed. This entry records what running them surfaced.

## Corrections to `/data` (all meaning-preserving)
| Record | Change | Why |
|---|---|---|
| P-10 `whatChanged` | `→` replaced with "to" (×2) | Charset allowlist. Prose only; figures untouched. |
| `scb-gross-advances` `notes` | `→` replaced with "to" | Same. |
| `exports-gdp` `provenanceRefs` | added **P-10** | P-10 already listed `exports-gdp` in `affectsSeries`; the series did not link back, so the gate failed on `back-link`. CLAUDE.md rule 5a names `exports-gdp` as one of the four ratio-to-GDP series that step on 27 Feb 2026, and `fiscal-deficit`, `genl-govt-debt` and `gfcf-gdp` all already carried it — `exports-gdp` was the outlier. Adding the ref is what makes the denominator band render; verified in the browser. |

## Code corrected to match P-17's contract
- **Stale series id.** `lib/npa.ts` and `tools/lib/integrity.mjs` both hardcoded `scb-advances`;
  the denominator landed as **`scb-gross-advances`**. Both updated. Two `npa-adjustment`
  warnings were false — they named a series that exists.
- **The adjustment was keyed off the wrong series.** It iterated the *published ratio*
  (`scb-gross-npa`, which begins FY2014-15) and so could only ever yield two points. P-17
  requires `scb-gross-npa-amount`, which carries FY2013-14. Recomputed as
  `(gross NPAs + cumulative write-offs) / gross advances` keyed off the amount, giving the
  three contracted points. Derived `reported` reproduces the published ratio exactly at both
  overlapping periods (11.46, 2.79), which is a useful consistency check on the derivation.
- **PSB blocker widened.** It named only the write-off series as the population mismatch.
  Per-group cumulative write-off series now exist in `/data`, so that wording invited a false
  "fix" — swapping them in while the denominator is still all-SCB. It now names the
  denominator too. PSB remains blocked; verified.
- **Breaks were being dropped from sparse series** (`components/SeriesTable.tsx`). Seam
  placement required an *exact* period match, so a break falling between two rendered rows
  rendered nowhere. The adjusted NPA view spans the AQR (FY2015-16) and COVID (FY2020-21)
  breaks while carrying a row for neither: it printed 4.10 → 16.20 → 20.81 across two
  "do not splice" seams, showing neither — a rule-2 splice in the one view most likely to be
  read as a verdict on the cleanup. A mark now renders above the first row at or after it.
  Dense series are unaffected (byte-identical reported tables; GDP handoffs re-verified).

## Open question for research — which cumulative write-off total
The adjusted view sums `bank-writeoffs-annual`, because it is the only write-off source with
values at all three contracted periods. Through FY2024-25 that sums to **₹17.66 lakh crore**,
against **₹16.6131 lakh crore** in `bank-writeoffs-cumulative-scb`. The gap is a window
difference — the sourced cumulative runs April 2014 to **September 2024**, so it stops
mid-year and would understate a FY2024-25 column. Summing was chosen for consistency across
the three periods, and it moves the FY2024-25 adjusted figure from ~19.74% to 20.81%.
Worth a reconciliation: a cumulative-to-March-2025 figure would settle it.
`bank-writeoffs-cumulative-{scb,psb,pvt}` are otherwise unused by this view.

## Second open question — P-10 prose
P-10 `whatChanged` says the revision moved "recent real growth **UP**" and then gives
FY24 as 8.2% to 7.2%, which is a downward revision (FY25 6.5% to 7.1% is upward). Left
exactly as written — the figures are research's, not code's — but the generalisation does not
hold for FY24.

## Left alone deliberately
`cad-gdp` still warns `denominator-break`: it is a `% of GDP` series spanning 27 Feb 2026 that
does not carry P-10, and P-10 does not list it. Whether RBI's BoP ratio rests on the restated
denominator is a research question, not a code one. Warn only; does not block.

## Result
`validate` 0 errors / 11 warnings · `selftest` 18/18 rules fire, 3 invalid fixtures rejected ·
`typecheck` clean · `build` 125 static pages · NPA toggle verified in-browser at 1440px and
390px: renders at FY2013-14, FY2017-18, FY2024-25 for SCB domestic; blocked for PSB.
