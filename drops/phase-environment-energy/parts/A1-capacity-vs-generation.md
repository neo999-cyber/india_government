# A1-capacity-vs-generation

_Stage 2 research, phase 15 (environment and energy), Arc A. Started 2026-08-05T11:48:35Z._

## A1.0 The document that closes the gap

**CEA, *General Review 2025*** (Central Electricity Authority, Ministry of Power).
Retrieved this run: `https://cea.nic.in/wp-content/uploads/general/2025/Updated_GR_2025_merged_new.pdf`
Retrieval: `curl --resolve cea.nic.in:443:45.127.74.41`, HTTP 200, 12,151,904 bytes PDF, 984,398 characters of extracted text (`pdftotext -layout`). **Tier T1** — primary statutory publication, retrieved and read.
Found via: `https://cea.nic.in/general-review-report/?lang=en` (HTTP 200 after `-L`; the un-followed request 301s), which lists exactly four document links, one of which is this one.

This single document carries BOTH halves of the arc in adjacent tables:

- **Table 1.2 — "Growth of Installed Capacity - Mode-wise, Utilities Only" (MW)**, one row per year-end from 31.12.1950 to 31.03.2024. Columns: Hydro | Thermal (including Steam, Gas & Diesel) | Nuclear | RES | Total.
- **Table 1.3 — "Growth of Gross Electricity Generation - Mode-wise, Utilities Only" (GWh)**, one row per financial year from 1950 to 2023-24. Same four columns plus Total.

**This is decisive for A5 and for the shipped record L-0052.** L-0052's `unmeasured[]` entry says the renewable generation share is missing and gives `reasonKind: "not-published"`, with the rationale that "the two shares are simply not set side by side in anything retrieved." The two shares are set side by side, on consecutive pages, in CEA's own annual General Review, by the same authority, on the same "Utilities Only" universe, for every year from 1950 to 2023-24. **The `reasonKind` is wrong: the datum is published, it was not retrieved.** See A5.

### The RES column's own definition, quoted from the table footnote
> "RES : Renewable Energy Sources. Includes Solar, Small Hydro Projects, Wind, Bio Power Baggasse, Bio Power-Waste to Energy"

So in CEA's General Review, **large hydro is NOT in the RES column** — it sits in its own "Hydro" column. This matters enormously and is carried into A3.

### The basis-change footnote on Table 1.3, quoted verbatim
> "Note: 1. RES Generation upto 2013-2014 as per normative generation. RES Generation during 2014-2015 onwards are as per actual generation received from utilities."

**The RES generation series changes measurement basis exactly at the start of the period this instrument studies.** Before FY2013-14 it is *normative* (i.e. imputed from capacity and an assumed load factor); from FY2014-15 it is *actual metered generation reported by utilities*. The visible consequence is that RES generation **falls** from 65,520 GWh (2013-14) to 61,719 GWh (2014-15) while RES capacity rose from 35,850 MW to 39,950 MW over the same twelve months. That fall is very likely an artefact of the basis change, not a real decline in renewable output. Any growth ratio computed across the FY2013-14 / FY2014-15 boundary spans two different definitions of the numerator.

## A1.1 The central table — renewable share of capacity vs share of generation

All figures below are transcribed from CEA *General Review 2025* Tables 1.2 and 1.3 as quoted above. "RES" is CEA's own column and **excludes large hydro** (it includes small hydro). The comment lines are internal consistency checks I ran on CEA's own printed totals: in four capacity years the four component columns sum to 1 MW less than the printed total, and in five generation years the components sum ±1 GWh from the printed total. These are rounding artefacts in the source, recorded so a hand-checker is not surprised by them; they are immaterial to every share below.

Arithmetic, stated operand by operand for two years so the whole table can be spot-checked:
- **FY2013-14 capacity share:** 35,850 MW ÷ 249,416 MW × 100 = 14.37%.
- **FY2013-14 generation share:** 65,520 GWh ÷ 1,026,649 GWh × 100 = 6.38%. Gap = 14.37 − 6.38 = **7.99 percentage points**.
- **FY2023-24 capacity share:** 143,645 MW ÷ 441,970 MW × 100 = 32.50%.
- **FY2023-24 generation share:** 225,835 GWh ÷ 1,734,375 GWh × 100 = 13.02%. Gap = 32.50 − 13.02 = **19.48 percentage points**.

| FY end | RES cap MW | Total cap MW | RES cap share % | RES gen GWh | Total gen GWh | RES gen share % | gap pp |
|---|---|---|---|---|---|---|---|
| 31.03.2013 / FY2012-13 | 27,542 | 223,344 | 12.33% | 57,449 | 964,489 | 5.96% | +6.38 |  (gen col sum check 964,489 vs 964,489 diff 0)
| 31.03.2014 / FY2013-14 | 35,850 | 249,416 | 14.37% | 65,520 | 1,026,649 | 6.38% | +7.99 |  (gen col sum check 1,026,649 vs 1,026,649 diff 0)
| 31.03.2015 / FY2014-15 | 39,950 | 275,895 | 14.48% | 61,719 | 1,105,006 | 5.59% | +8.89 |  (gen col sum check 1,105,006 vs 1,105,006 diff 0)
<!-- CEA Table 1.2 internal sum check 2016: components sum 306329 vs printed total 306330, diff -1 MW -->
| 31.03.2016 / FY2015-16 | 47,091 | 306,330 | 15.37% | 65,781 | 1,167,584 | 5.63% | +9.74 |  (gen col sum check 1,167,584 vs 1,167,584 diff 0)
| 31.03.2017 / FY2016-17 | 58,558 | 328,146 | 17.85% | 81,548 | 1,235,358 | 6.60% | +11.24 |  (gen col sum check 1,235,358 vs 1,235,358 diff 0)
| 31.03.2018 / FY2017-18 | 70,651 | 345,631 | 20.44% | 101,839 | 1,303,455 | 7.81% | +12.63 |  (gen col sum check 1,303,454 vs 1,303,455 diff -1)
<!-- CEA Table 1.2 internal sum check 2019: components sum 357870 vs printed total 357871, diff -1 MW -->
| 31.03.2019 / FY2018-19 | 79,412 | 357,871 | 22.19% | 126,759 | 1,371,779 | 9.24% | +12.95 |  (gen col sum check 1,371,780 vs 1,371,779 diff 1)
| 31.03.2020 / FY2019-20 | 88,255 | 371,334 | 23.77% | 138,337 | 1,383,417 | 10.00% | +13.77 |  (gen col sum check 1,383,416 vs 1,383,417 diff -1)
<!-- CEA Table 1.2 internal sum check 2021: components sum 383520 vs printed total 383521, diff -1 MW -->
| 31.03.2021 / FY2020-21 | 95,803 | 383,521 | 24.98% | 147,248 | 1,373,187 | 10.72% | +14.26 |  (gen col sum check 1,373,188 vs 1,373,187 diff 1)
| 31.03.2022 / FY2021-22 | 109,885 | 399,497 | 27.51% | 170,912 | 1,484,463 | 11.51% | +15.99 |  (gen col sum check 1,484,462 vs 1,484,463 diff -1)
| 31.03.2023 / FY2022-23 | 125,160 | 416,059 | 30.08% | 203,553 | 1,617,903 | 12.58% | +17.50 |  (gen col sum check 1,617,903 vs 1,617,903 diff 0)
| 31.03.2024 / FY2023-24 | 143,645 | 441,970 | 32.50% | 225,835 | 1,734,375 | 13.02% | +19.48 |  (gen col sum check 1,734,375 vs 1,734,375 diff 0)

## A1.2 The same computation on the post-2019 basis (large hydro counted as renewable)

Because a March 2019 decision moved large hydro into the renewable category (A3), the same series computed on the wider definition is a different series. Both are given so the reclassification's contribution is visible rather than buried. Operands: RES+Hydro capacity = CEA Table 1.2 "RES" column + "Hydro" column; RES+Hydro generation = CEA Table 1.3 "RES" + "Hydro".

RES+HYDRO (large hydro counted as renewable, post-2019 basis):
| FY end | RES+Hydro cap MW | cap share % | RES+Hydro gen GWh | gen share % | gap pp |
|---|---|---|---|---|---|
| 2013 | 67,033 | 30.01% | 171,169 | 17.75% | +12.27 |
| 2014 | 76,381 | 30.62% | 200,367 | 19.52% | +11.11 |
| 2015 | 81,217 | 29.44% | 190,963 | 17.28% | +12.16 |
| 2016 | 89,874 | 29.34% | 187,158 | 16.03% | +13.31 |
| 2017 | 103,036 | 31.40% | 203,926 | 16.51% | +14.89 |
| 2018 | 115,944 | 33.55% | 227,962 | 17.49% | +16.06 |
| 2019 | 124,811 | 34.88% | 261,653 | 19.07% | +15.80 |
| 2020 | 133,954 | 36.07% | 294,106 | 21.26% | +14.81 |
| 2021 | 142,012 | 37.03% | 297,548 | 21.67% | +15.36 |
| 2022 | 156,608 | 39.20% | 322,539 | 21.73% | +17.47 |
| 2023 | 172,010 | 41.34% | 365,652 | 22.60% | +18.74 |
| 2024 | 190,573 | 43.12% | 359,889 | 20.75% | +22.37 |

## A1.3 The same computation on the non-fossil basis (RES + large hydro + nuclear)

This is the basis on which the NDC and the 500 GW target are stated (A4). Operands: CEA Table 1.2 "RES" + "Hydro" + "Nuclear" over "Total"; and Table 1.3 same columns.

NON-FOSSIL (RES+Hydro+Nuclear):
| FY end | non-fossil cap MW | cap share % | non-fossil gen GWh | gen share % | gap pp |
|---|---|---|---|---|---|
| 2013 | 71,813 | 32.15% | 204,035 | 21.15% | +11.00 |
| 2014 | 81,161 | 32.54% | 234,595 | 22.85% | +9.69 |
| 2015 | 86,997 | 31.53% | 227,065 | 20.55% | +10.98 |
| 2016 | 95,654 | 31.23% | 224,571 | 19.23% | +11.99 |
| 2017 | 109,816 | 33.47% | 241,842 | 19.58% | +13.89 |
| 2018 | 122,724 | 35.51% | 266,308 | 20.43% | +15.08 |
| 2019 | 131,591 | 36.77% | 299,466 | 21.83% | +14.94 |
| 2020 | 140,734 | 37.90% | 340,578 | 24.62% | +13.28 |
| 2021 | 148,792 | 38.80% | 340,577 | 24.80% | +13.99 |
| 2022 | 163,388 | 40.90% | 369,651 | 24.90% | +16.00 |
| 2023 | 178,790 | 42.97% | 411,513 | 25.43% | +17.54 |
| 2024 | 198,753 | 44.97% | 407,826 | 23.51% | +21.46 |

## A1.4 What the three tables say

1. **The gap is not just large, it is widening.** On CEA's own RES definition the capacity share rose from 14.37% (FY2013-14) to 32.50% (FY2023-24) — a gain of 18.13 pp — while the generation share rose from 6.38% to 13.02%, a gain of 6.64 pp. The gap between them grew from 7.99 pp to 19.48 pp. Renewables' capacity share has risen roughly 2.7× as fast as their generation share.
2. **In FY2023-24 renewables were 32.50% of capacity and 13.02% of generation.** The ratio generation-share ÷ capacity-share = 13.02 ÷ 32.50 = 0.40. Two-fifths. That ratio was 0.44 in FY2013-14 (6.38 ÷ 14.37) and 0.39 in FY2021-22 (11.51 ÷ 27.51) — i.e. it has fallen slightly, so the divergence is not merely arithmetic dilution; the marginal renewable MW added has a load factor at or below the existing fleet average.
3. **On the non-fossil basis the same structure holds.** Non-fossil capacity share reached 44.97% at 31.03.2024 while non-fossil generation share was 23.51%. The 50%-of-capacity NDC limb (A4) and any casual reading of it as "half the electricity" differ by roughly a factor of two.
4. **The choice of basis moves the headline by ~12 percentage points.** At 31.03.2024 the renewable capacity share is 32.50% on the RES-only basis and 43.12% on the RES-plus-large-hydro basis. Both are computed from the same CEA table. Neither is wrong; they are different definitions (A3).

## A1.5 The most recent years — FY2024-25 and FY2025-26

**CEA, *Executive Summary on Power Sector, March 2026***, retrieved this run:
`https://cea.nic.in/wp-content/uploads/executive/2026/03/Executive_Summary_March_2026_Actual.pdf`
HTTP 200 via `--resolve cea.nic.in:443:45.127.74.41`, 3,714,899 bytes PDF → 445,079 characters of text. **T1.** Found from `https://cea.nic.in/executive-summary-report/?lang=en`.

Section 1.1, "Electricity Generation During Apr-24 to Mar-25 & Apr-25 to Mar-26 (BU)", transcribed verbatim:

| Type | FY2024-25 (Apr-24 to Mar-25) BU | FY2025-26 (Apr-25 to Mar-26)* BU | % change as printed |
|---|---|---|---|
| Thermal | 1363.07 | 1307.13 | −4.10 |
| Nuclear | 56.68 | 55.19 | −2.63 |
| Hydro (Large) | 148.63 | 167.20 | +12.49 |
| RES including SHP | 255.01 | 310.59 | +21.79 |
| Bhutan Import | 5.48 | 7.83 | +42.80 |
| **All India** | **1,828.88** | **1,847.94** | **+1.04** |

`*` marked "Actual" in the source.

Column check: 1363.07 + 56.68 + 148.63 + 255.01 + 5.48 = 1,828.87 against the printed 1,828.88 (0.01 BU rounding). 1307.13 + 55.19 + 167.20 + 310.59 + 7.83 = 1,847.94, exact.

**Computed shares (my arithmetic, operands shown):**
- RES-only generation share FY2024-25 = 255.01 ÷ 1,828.88 × 100 = **13.94%**
- RES-only generation share FY2025-26 = 310.59 ÷ 1,847.94 × 100 = **16.81%**
- RES + large hydro FY2025-26 = (310.59 + 167.20) ÷ 1,847.94 × 100 = 477.79 ÷ 1,847.94 × 100 = **25.85%**
- Non-fossil (RES + large hydro + nuclear) FY2025-26 = (310.59 + 167.20 + 55.19) ÷ 1,847.94 × 100 = 532.98 ÷ 1,847.94 × 100 = **28.84%**

**The single most consequential number in this file: thermal generation FELL in FY2025-26, by 4.10%, from 1363.07 BU to 1307.13 BU — a fall of 55.94 BU — while total generation rose 1.04%.** On the series retrieved this is the first year-on-year fall in thermal generation in the period other than the COVID year FY2020-21 (CEA General Review Table 1.3: thermal 1,072,314 GWh in FY2018-19 → 1,042,838 in FY2019-20 → 1,032,611 in FY2020-21, then rising every year to 1,326,549 in FY2023-24). Whether this is displacement or a demand-growth artefact is not settled by these documents alone: total generation grew only 1.04%, an unusually weak year, so a slack-demand explanation is live. **The documents retrieved contain no CEA statement attributing the thermal decline to renewable displacement.** Needle: `node tools/scan-text.mjs ES_Mar2026.txt displace substitut decline renewable --substring` over 441,857 characters returns `displace: 0`, `substitut: 0`, `decline: 0`, against the positive control `renewable: 18` in the same run and the same form — so the file is loaded and the scan is live. The Executive Summary is a statistical bulletin and carries essentially no interpretive prose, which is the likeliest reason for the zeroes; they establish that this document does not attribute the decline, not that no document does.

Renewable generation source-wise, FY2025-26 vs FY2024-25 (same document, table "All India Generation From Renewables", BU):

| Source | Apr-24 to Mar-25 | Apr-25 to Mar-26 |
|---|---|---|
| Wind | 83.35 | 106.70 |
| Solar | 144.15 | 174.76 |
| Biomass | 3.74 | 4.14 |
| Bagasse | 9.34 | 9.94 |
| Small Hydro | 11.57 | 12.01 |
| Others | 2.87 | 3.03 |
| **Total** | **255.01** | **310.59** |

Sum check FY2025-26: 106.70 + 174.76 + 4.14 + 9.94 + 12.01 + 3.03 = 310.58 vs printed 310.59 (0.01 rounding).

## A1.6 Capacity added, by type, in the two most recent years

Same document, section 2, "Generating Capacity Addition(MW) during Apr-24 to Mar-25 & Apr-25 to Mar-26":

| Type | FY2024-25 (MW) | FY2025-26 (MW, provisional) |
|---|---|---|
| Thermal | 3,875 | 8,640 |
| Hydro (Large) | 799.99 | 3,620 |
| RE (including SHP) | 28,723.67 | 50,905.25 |
| Nuclear | 0 | 700 |
| **All India** | **33,398.66** | **63,865.25** |

**Thermal capacity addition more than doubled in FY2025-26 (3,875 → 8,640 MW) in the same year renewable addition rose to 50,905 MW.** This is the arc in one table: both are growing, from the same authority, on the same page. It is also directly contrary to any reading in which renewables have stopped new coal being built — see A2.

## A1.7 Latest installed capacity by source

**CEA, *Installed Capacity (in MW) of the country as on 30.06.2026***, retrieved this run:
`https://cea.nic.in/wp-content/uploads/installed/2026/06/Website_June.pdf`
HTTP 200 via the same pin, 659,068 bytes, 9 pages, 54,648 characters of text. **T1.** Linked from `https://cea.nic.in/installed-capacity-report/?lang=en` (that index page carries only the current month — see A5 for the archive gap).

Front-page summary table, transcribed exactly:

| Category | Installed Capacity (MW) | % share as printed |
|---|---|---|
| Coal | 224,158 | 40.84% |
| Lignite | 6,620 | 1.21% |
| Gas | 20,122 | 3.67% |
| Diesel | 589 | 0.11% |
| **Total Fossil Fuel** | **251,489** | **45.82%** |
| RES (including Hydro) | 288,589 | 52.58% |
| — Hydro (including PSPs) | 52,065 | 9.49% |
| — Wind, Solar & Other RE | 236,525 | 43.09% |
| — Wind | 57,443 | 10.47% |
| — Solar | 162,152 | 29.54% |
| — BM Power | 10,869 | 1.98% |
| — Waste to Energy | 878 | 0.16% |
| — Small Hydro | 5,182 | 0.94% |
| Nuclear | 8,780 | 1.60% |
| **Total Non-Fossil Fuel** | **297,369** | **54.18%** |
| **Total Installed Capacity** | **548,858** | **100.0%** |

Internal checks I ran on CEA's own figures:
- Fossil: 224,158 + 6,620 + 20,122 + 589 = 251,489 ✓ exact.
- "RES (including Hydro)": 52,065 + 236,525 = 288,589 ✓ exact.
- Wind/Solar/Other RE: 57,443 + 162,152 + 10,869 + 878 + 5,182 = 236,524 vs printed 236,525 (1 MW rounding).
- Non-fossil: 288,589 + 8,780 = 297,369 ✓ exact.
- Grand total: 251,489 + 297,369 = 548,858 ✓ exact.

**Note the naming.** This CEA table calls the 288,589 MW row **"RES (including Hydro)"** — i.e. it puts large hydro *inside* RES — whereas CEA's own General Review Table 1.2, published by the same authority, keeps Hydro in a separate column and defines RES to exclude it. Two CEA publications, two definitions of "RES", both current. Carried into A3.

**Renewable share of capacity at 30.06.2026, all three bases (my arithmetic):**
- Wind/solar/bio/WTE/small-hydro only: 236,525 ÷ 548,858 × 100 = **43.09%** (matches CEA's printed figure).
- Including large hydro: 288,589 ÷ 548,858 × 100 = **52.58%** (matches).
- Non-fossil (adding nuclear): 297,369 ÷ 548,858 × 100 = **54.18%** (matches).

**Coal alone is still 224,158 MW, 40.84% of installed capacity, the single largest category by a wide margin — larger than solar (162,152 MW) and wind (57,443 MW) combined less 4,563 MW.** (162,152 + 57,443 = 219,595; 224,158 − 219,595 = 4,563.)

## A1.8 CEA publishes the renewable share of generation by name, monthly, state-wise

**CEA Renewable Project Monitoring Division, *Broad Overview of RE Generation, June 2026***, retrieved this run:
`https://cea.nic.in/wp-content/uploads/resd/2026/07/Broad_Overview_of_RE_Generation_June_2026.pdf`
HTTP 200 via `--resolve cea.nic.in:443:45.127.74.41`, 2,926,962 bytes, 117,290 characters of extracted text. **T1.** Linked from `https://cea.nic.in/renewable-generation-report/?lang=en`.
(A first download of this file truncated and produced `Syntax Error: Couldn't read xref table` from `pdftotext`; re-fetching with `--retry 5 --retry-all-errors` gave a complete file. Recorded because a truncated PDF that still opens is a live failure mode on this host — the CEA *General Review 2025* download failed the same way twice before completing.)

Its table of contents, transcribed verbatim, includes:
> "Table 4: Fossil and Non-Fossil Generation for the Month of June 2026"
> "Table 5: Fossil and Non-Fossil Generation for the period of April 2026- June 2026"
> "Table 6: Monthly Renewable Energy as % of Total Electricity Generated"
> "Table 7: Cumulative Renewable Energy as % of Total Electricity Generated"

**The quantity L-0052 records as `not-published` is the literal title of two tables in a monthly CEA publication, computed for every State and Union Territory and for All India.** See A5.

All India rows, transcribed:

| table | period | Thermal (MU) | Gas (MU) | Nuclear (MU) | Large Hydro (MU) | Renewable excl. LH (MU) | aggregate (MU) | Grand Total (MU) | printed % |
|---|---|---|---|---|---|---|---|---|---|
| Table 4 (non-fossil) | June 2026 | 120,240.13 | 2,253.65 | 5,564.10 | 13,362.39 | 36,991.39 | non-fossil 55,917.88 | 178,411.66 | **31.34%** |
| Table 5 (non-fossil) | Apr–Jun 2026 | 360,979.36 | 6,599.54 | 16,426.79 | 36,878.98 | 100,934.46 | non-fossil 154,240.23 | 521,819.13 | **29.56%** |
| Table 6 (RE incl. LH) | June 2026 | 120,240.68 | 2,253.65 | 5,564.10 | 13,362.39 | 36,991.39 | RE 50,353.78 | 178,412.21 | **28.22%** |
| Table 7 (RE incl. LH) | Apr–Jun 2026 | 360,979.91 | 6,599.54 | 16,426.79 | 36,878.98 | 100,934.46 | RE 137,813.44 | 521,819.13 | **26.41%** |

Checks I ran: 13,362.39 + 36,991.39 = 50,353.78 ✓ (Table 6 aggregate). 5,564.10 + 13,362.39 + 36,991.39 = 55,917.88 ✓ (Table 4 aggregate). 50,353.78 ÷ 178,412.21 × 100 = 28.22% ✓. 137,813.44 ÷ 521,819.13 × 100 = 26.41% ✓. 154,240.23 ÷ 521,819.13 × 100 = 29.56% ✓.
Note Tables 4 and 6 print grand totals for the same month differing by 0.55 MU (178,411.66 vs 178,412.21) and thermal differing by 0.55 MU. Immaterial; recorded because it is an internal inconsistency inside one document.

**Three different "green shares" of the same month's electricity, all from this one document:**
- Renewable **excluding** large hydro: 36,991.39 ÷ 178,411.66 × 100 = **20.73%** (my computation from the document's own columns; the document does not print this ratio)
- Renewable **including** large hydro: **28.22%** (printed)
- **Non-fossil** (adding nuclear): **31.34%** (printed)
A 10.6 percentage-point spread, for June 2026, with no wrong answer among them.

**Cross-check against the other CEA publication, which reconciles exactly.** CEA *Executive Summary June 2026* section 1 gives, for June 2026 (BU): Thermal 122.49, Nuclear 5.56, Hydro (Large) 13.36, RES including SHP 36.99, Bhutan Import 0.71, All India 179.12. The RE overview's Thermal + Gas = 120,240.13 + 2,253.65 = 122,493.78 MU = 122.49 BU ✓; Nuclear 5,564.10 = 5.56 ✓; Large Hydro 13,362.39 = 13.36 ✓; RE 36,991.39 = 36.99 ✓; and the RE overview's grand total 178,411.66 MU = 178.41 BU, which is exactly the Executive Summary's 179.12 BU less the 0.71 BU Bhutan import that the RE overview excludes (its footnote says so: "($) Large Hydro Generation data excluding import from Bhutan. However, the import from Bhutan during June 2026 is 705.35 MUs"). **Two CEA publications, produced by different divisions, reconcile to the MU once the stated exclusion is applied.** This is a genuine consistency finding, not an accident: see A5 on why agreement here is not independent corroboration.

## A1.9 A material limitation on the generation data itself: only 87% of renewable capacity is monitored

Same document, Table 1 ("All India Summary of Renewable Energy Generation"), which prints two capacity columns side by side: **"Installed Capacity (MW) (as on 30.06.2026)"** and **"Monitored Capacity (MW) (as on 30.06.2026) for which generation data is available"**.

| Category | Installed MW | Monitored MW | monitored as % of installed | unmonitored MW |
|---|---|---|---|---|
| Wind | 57,443.39 | 55,683.35 | 96.94% | 1,760.04 |
| Solar | 162,151.97 | 127,731.07 | 78.77% | 34,420.90 |
| Biomass | 10,869.17 | 10,246.69 | 94.27% | 622.48 |
| Small Hydro | 5,181.76 | 4,271.77 | 82.44% | 909.99 |
| Large Hydro | 52,064.67 | 52,064.67 | 100.00% | 0.00 |
| Others (Waste to Energy) | 878.40 | 896.89 | 102.10% | −18.49 |
| **Total including Large Hydro** | **288,589.36** | **250,894.44** | **86.94%** | **37,694.92** |
| **Total excluding Large Hydro** | **236,524.69** | **198,829.77** | **84.06%** | **37,694.92** |

The solar row carries the footnote, verbatim: **"(*) Solar Installed capacity including rooftop solar."**

**Consequences, stated carefully:**
- **34,420.90 MW of solar — 21.23% of India's installed solar capacity — produces no generation data in CEA's monthly renewable generation report.** The footnote points at rooftop solar as the reason the installed figure is larger. MNRE's own physical-progress page gives "Grid Connected Solar Rooftop: 30.11 GW" and "Off-Grid Solar: 6.43 GW", summing to 36.54 GW, which is in the same range as the 34.42 GW gap; I have not found a document that states the identity, so I do not assert it.
- **The renewable generation share computed from these tables is therefore a share of *monitored* renewable generation, not of all renewable generation.** Whether the true share is higher depends on whether the unmonitored capacity's output appears in the denominator too. Rooftop solar consumed behind the meter typically appears in neither numerator nor denominator of a grid-generation series, in which case the effect on the *ratio* is ambiguous rather than simply understating it. **The documents I retrieved do not state how unmonitored renewable output is treated in the denominator.** I searched `reov.txt` for `behind the meter` (0 hits, `--substring`), `net metering` (0), `estimated` (0) and `imputed` (0); positive control in the same form, `rooftop` returns 1 hit — the footnote quoted above — so the file is loaded and the scan is live. That single hit is the only place the report addresses the gap.
- The "Others (Waste to Energy)" row has **monitored capacity 18.49 MW greater than installed capacity**, which is not possible on the plain reading of the two column headings. Recorded as an unexplained inconsistency in the source; the document offers no note on it.

## A1.10 The report's own headline observations, quoted

Numbered list on its first page, verbatim in relevant part:
> "1. RE capacity addition during June 2026 has been 5844.29 MW (Solar – 5105.54 MW, Wind –636.35 MW, Large Hydro-100 MW, Small Hydro-2.40 MW)."
> "2. All India RE generation during June 2026 has increased by 8.44 % as compared to June 2025."
> "3. Large Hydro Power generation during June 2026 as compared to June 2025 has decreased by 20.35 % on All India Basis."
> "4. Solar Power generation during June 2026 as compared to June 2025 has increased by 57.09 % on All India Basis."
> "9. Small Hydro Power generation during June 2026 as compared to June 2025 has decreased by 45.60 %."

Note item 1: **the report counts "Large Hydro-100 MW" inside "RE capacity addition"** — the reclassification of A3 in operation. And item 2's "8.44%" is the *hydro-inclusive* RE growth (50,353.78 ÷ 46,436.44 = 108.44); the hydro-*exclusive* figure from the same table is 36,991.39 ÷ 29,660.94 = 124.71, i.e. **+24.71%**. The report's headline bullet uses the basis that gives the smaller number, because large hydro fell 20.35% that month. Both are printed in Table 1; only one is in the bullet list.
