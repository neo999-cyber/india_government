# A2-coal-expansion

_Stage 2 research, phase 15 (environment and energy), Arc A. Started 2026-08-05T11:48:35Z._


---

## A2.4 Coal PLF

**Source document (T1, retrieved this run):** Central Electricity Authority, *Growth of Electricity Sector in India from 1947-2025* ("Growth Book 2025"), published under CEA's `notification` uploads, 84 pages, retrieved as `application/pdf`, 7,567,010 bytes.
Deep URL opened: `https://cea.nic.in/wp-content/uploads/notification/2026/01/Growth_Book_2025.pdf` (via `curl --resolve cea.nic.in:443:45.127.74.41`, HTTP 200).
Location in document: **Chart 13, "All India PLF (%) of Thermal Power Stations (Coal and Lignite-based)"** — listed in the document's own contents as item 26, page 26. The chart is a horizontal bar chart whose data labels are one PLF value per financial year; `pdftotext -layout` recovers the full label series.

All-India PLF of coal- and lignite-based thermal stations, %, as printed in Chart 13:

| Financial year | PLF (%) |
|---|---|
| 2009-10 | 77.68 |
| 2010-11 | 74.97 |
| 2011-12 | 73.47 |
| 2012-13 | 70.13 |
| **2013-14** | **65.56** |
| 2014-15 | 64.25 |
| 2015-16 | 62.24 |
| 2016-17 | 59.88 |
| 2017-18 | 60.72 |
| 2018-19 | 61.07 |
| 2019-20 | 55.99 |
| 2020-21 | 54.49 |
| 2021-22 | 58.87 |
| 2022-23 | 64.15 |
| 2023-24 | 69.09 |
| **2024-25** | **69.45** |

(The same chart carries the series back to 1985-86 — 52.40% in 1985-86, peaking at 78.60% in 2007-08. Included here only to establish that the fall to 54.49% in 2020-21 is a low against a four-decade series, not against a short window.)

### What the shape actually is — a U, not a decline

The naive expectation stated in the brief ("if renewables were displacing coal you'd expect PLF to fall") is satisfied only for the first half of the period and then reversed.

- Trough-finding, operand by operand: minimum of the FY2013-14→FY2024-25 series = 54.49 (2020-21). Fall from the start of the window: 65.56 − 54.49 = **11.07 percentage points** over seven years.
- Recovery from the trough: 69.45 − 54.49 = **14.96 percentage points** over four years.
- Net change across the whole window: 69.45 − 65.56 = **+3.89 percentage points**. Coal PLF at the end of the period is *higher* than at the start.
- 2024-25 (69.45%) is the highest coal PLF since 2010-11 (74.97%). Every year from 2011-12 to 2023-24 inclusive is below it.

The 2019-20 and 2020-21 readings (55.99, 54.49) sit either side of the COVID demand collapse; the pre-COVID local low is 59.88% in 2016-17, and PLF had already turned upward (60.72, 61.07) in 2017-18 and 2018-19 before the pandemic. So the series is not "declining until COVID"; it bottomed in 2016-17, was recovering, was knocked down twice by the demand shock, and then rose four years running.

**Caveat on what this figure is.** Chart 13's own title says "Thermal Power Stations (Coal and Lignite-based)" — it is a coal+lignite aggregate, not coal alone, and it is a utility-sector figure. The Growth Book does not, in the pages retrieved, decompose PLF by sector (central/state/private) or separate coal from lignite. A PLF number quoted elsewhere for "coal PLF" that excludes lignite or covers only central-sector stations is a *different quantity* and would not be expected to match — see the note under "Handoff to A5".

**Search performed to confirm no second PLF series exists in the document.** `grep -n -iE "plant load factor|PLF" Growth_Book_2025.txt` over the full extracted text (258,862 characters) returned exactly **3** hits: line 227 (the contents-page entry, "26. Chart : 13 All India PLF (%) of Thermal Power Stations (Coal and Lignite-based) 26"), line 1293 (the chart's axis label "PLF (%)"), and line 1315 (the chart title). There is exactly one PLF chart in this document; the string "plant load factor" spelled out appears **zero** times. Positive control run in the same form on the same file: `grep -c -i "installed capacity"` returns **20**, so the search mechanism was working against this text and the low PLF count is a property of the document, not of the tooling.

---

## A2.1 Coal production

### Sources retrieved this run (all T1 unless marked)

| # | Document | Deep URL opened | HTTP | Bytes | Tier |
|---|---|---|---|---|---|
| P1 | Ministry of Coal, **Annual Report 2024-25, Chapter 9 "Coal and Lignite Production"**, 8 pp. | `https://coal.gov.in/sites/default/files/2025-02/chap9AnnualReport2025en2.pdf` | 200 | 170,384 | T1 |
| P2 | Ministry of Coal, **"Company Wise Production of Raw Coal during last ten years (MT)"**, single-page statistical sheet, current to FY2024-25 | `https://coal.gov.in/sites/default/files/2021-01/productiondata_tenyear.pdf` | 200 | 437,389 | T1 |
| P3 | Ministry of Coal, **"Historical Coal Production growth: Cheaper and Assured Availability"**, PIB release dated 04 MAR 2024 4:17PM, hosted as PDF by MoC itself, 3 pp. | `https://coal.nic.in/sites/default/files/2024-03/PIB2011252.pdf` | 200 | 94,916 | T1 (MoC-hosted primary of a PIB release) |
| P4 | Ministry of Coal, **Annual Report 2015-16, Chapter 6 "Coal and Lignite Production"** | `https://coal.gov.in/sites/default/files/2019-11/chap6AnnualReport1516en.pdf` | 200 | 123,121 | T1 |
| P5 | Ministry of Coal, **"Ministry of Coal's Year End Review-2025"**, PIB-format release hosted by MoC, posted Jan 2026 | `https://coal.gov.in/sites/default/files/2026-01/Pib-120126.pdf` | 200 | 2,086,239 | T1 |
| P6 | Ministry of Coal, **"Production and Supplies"** statistics web page (HTML; text extracted = 6,316 characters after tag-stripping, so a real document body, not a JS shell) | `https://coal.gov.in/major-statistics/production-and-supplies` | 200 | 60,802 | T1 |

`coal.gov.in` and `coal.nic.in` both resolve to **164.100.166.94** and both served content under `--resolve`.

### All-India raw coal production, FY2013-14 → FY2024-25 (million tonnes)

| FY | All-India (MT) | Source | CIL (MT) | Source |
|---|---|---|---|---|
| 2013-14 | 565.77 | P3 (table "historical coal production data since 2008-09"); restated in P5 ("from 565.77 Million Tonne in FY 2013-14") and in P4 (table "Company wise production of Coal", 2013-14 Actual column) | 462.41 | P4, "Company wise production of Coal" table, CIL row, 2013-14 (Actual) |
| 2014-15 | 609.18 | P3, second table | 494.23 | P4, same table, 2014-15 (Actual) |
| 2015-16 | 639.22 | P2 and P3 | 538.75 | P2, CIL row |
| 2016-17 | 657.87 | P2 and P3 | 554.14 | P2 |
| 2017-18 | 675.41 (P2) / 675.40 (P3) | P2, P3 | 567.37 | P2 |
| 2018-19 | 728.72 | P2 and P3 | 606.89 | P2 |
| 2019-20 | 730.87 | P2 and P3 | 602.13 | P2 |
| 2020-21 | 716.09 (P2) / 716.08 (P3) | P2, P3 | 596.22 | P2 |
| 2021-22 | 778.21 | P2 and P3 | 622.63 | P2 |
| 2022-23 | 893.19 | P2, P3, P1 | 703.20 | P2; P1 gives 703.20 as the 2022-23 CIL "(Actual)" |
| 2023-24 | 997.826 (P2, P5) / 997.83 (P1, P6) | P1 §3, P2, P5, P6 | 773.806 (P2) / 773.65 (P1) / 773.81 (P6) | see conflict note |
| 2024-25 | 1047.523 | P5 §4.1 and P2 | 781.056 | P2 and P6 |

Reference points before the window, from P3's own table, for scale: 2008-09 = 492.76, 2009-10 = 532.04, 2010-11 = 532.69, 2011-12 = 539.95, 2012-13 = 556.40.

### Arithmetic, operand by operand

- Absolute increase across the window: 1047.523 − 565.77 = **481.753 MT**.
- Ratio: 1047.523 ÷ 565.77 = **1.8515**, i.e. all-India coal production is **85.15% higher** in FY2024-25 than in FY2013-14.
- CIL absolute increase: 781.056 − 462.41 = **318.646 MT**; ratio 781.056 ÷ 462.41 = **1.6891**, i.e. **+68.91%**.
- Non-CIL production (all-India minus CIL), FY2013-14: 565.77 − 462.41 = **103.36 MT**. FY2024-25: 1047.523 − 781.056 = **266.467 MT**. Increase = 163.107 MT; ratio 266.467 ÷ 103.36 = **2.578**, i.e. non-CIL output grew **~158%**, more than twice as fast in proportional terms as CIL's.
- CIL share of all-India production: FY2013-14, 462.41 ÷ 565.77 = **81.73%**. FY2024-25, 781.056 ÷ 1047.523 = **74.56%**. CIL's share fell **7.17 percentage points** while its absolute output rose 318.646 MT. (This is the same absolute-up / share-down shape that A2.2 finds for coal capacity, appearing here inside the coal sector itself.)
- Year-on-year declines, computed over the whole series rather than eyeballed. **All-India: exactly one** — FY2019-20 → FY2020-21, 730.87 → 716.09, **−14.78 MT** (the COVID year). Every other year-on-year change in the all-India series over FY2013-14 → FY2024-25 is positive. **CIL: two** — FY2018-19 → FY2019-20, 606.89 → 602.13 (−4.76 MT), and FY2019-20 → FY2020-21, 602.13 → 596.22 (−5.91 MT). **SCCL: three** — FY2018-19 → FY2019-20 (−0.36), FY2019-20 → FY2020-21 (−13.46), FY2023-24 → FY2024-25 (−1.015). So CIL's output was already flattening for a year before the pandemic, while all-India output was not: in FY2019-20 CIL fell 4.76 MT and all-India still rose 2.15 MT (730.87 − 728.72), the difference being made up by captive/commercial mines.

P3 states the growth-rate framing in the government's own words: CAGR "2.80% from 2008-09 to 2013-14" against "5.20% from 2014-15 to 2022-23", and asserts that at the older rate 2022-23 output "would have been only 725.39 MT". That counterfactual is the Ministry's, retrieved verbatim; it is not independently checked here.

### Was there ever a stated intent to *reduce* production?

Searched P5 (Year End Review 2025, 76,068 characters of extracted text) for any production-reduction language. `grep -n -iE "production"` returns many hits; every occurrence in the production sections frames the direction as increase — "highest ever coal production in the Year 2024-25", "domestic raw Coking Coal production is likely to reach 140 MT by 2030", "target for the financial year 2025-26 is 83 MT" (coking coal). **The documents retrieved contain no target, plan, or statement of intent to reduce coal production in any year.** The only reduction targets stated anywhere in these documents are for *imports* (A2.5), not output.

---

## A2.6 Coal capacity planned / NEP projection — and the upward revision

### Sources retrieved this run

| # | Document | Deep URL opened | HTTP | Bytes / text | Tier |
|---|---|---|---|---|---|
| N1 | Central Electricity Authority, **National Electricity Plan 2022-32, Volume I — Generation** (the gazette-notified English text). PDF internal metadata read with `pdfinfo`: Author "GIRIJA SANKAR PATI", Creator "Microsoft® Word 2013", **CreationDate Tue May 16 2023, ModDate Wed May 31 2023**. | `https://cea.nic.in/wp-content/uploads/irp/2023/05/NEP_2022_32_FINAL_GAZETTE-1.pdf` | 200 (server `Content-Length: 19539146`) | 19,539,146 bytes downloaded in full; 1,179,149 characters of extracted text | T1 |
| N2 | Ministry of Power, PIB release **"EXPANSION OF THERMAL POWER CAPACITY"**, Posted On **25 JUL 2024 5:09PM by PIB Delhi** | `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2037006&reg=3&lang=1` | 200 | 401,338 bytes; 67,239 characters of extracted text | T1 |
| N3 | Ministry of Power, PIB release **"Thermal (coal and lignite) Installed Capacity Requirement Estimated at 3,07,000 MW by 2024-35"** [sic — the body says 2034–35], Posted On **09 FEB 2026 4:15PM by PIB Delhi**; a written reply in the Rajya Sabha by the Minister of State for Power, Shri Shripad Naik | `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2225430&reg=3&lang=1` | 200 | 82,479 bytes; 12,174 characters of extracted text | T1 |

The brief's suggested copy at `cea.nic.in/wp-content/uploads/news_live/2026/08/NEP_2022_32_FINAL_GAZETTE_English.pdf` was verified live by `HEAD` (HTTP/1.1 200, `Content-Length: 19375645`, `Content-Type: application/pdf`) but was **not** the copy read; the `irp/2023/05/` copy was read instead. The two differ in byte length (19,539,146 vs 19,375,645) and have not been compared.

Retrieval note worth recording: the first `GET` of N1 returned **HTTP 200 with only 1,199,427 of 19,539,146 bytes** — a silently truncated body that `pdftotext` rejected with "Invalid XRef entry 0 / Couldn't find trailer dictionary". Only a `HEAD` revealed the true length. The file was then completed with three resumed range requests (`curl -C -`, HTTP 206, 439,750 + 14,491,590 + 3,408,379 bytes) to exactly 19,539,146. **A 200 with a plausible-looking PDF is not proof of a complete retrieval on this host.**

### What the National Electricity Plan (May 2023) actually projects

From N1, "MAJOR HIGHLIGHTS", items xiii, xvii, xviii (page numbered lxi of the front matter), quoted from the extracted text:

- item xiii: "apart from under construction coal based capacity of 26.9GW, the additional coal based capacity required till 2031-32 may vary from **19.1 GW to around 27.1 GW** across various scenarios."
- item xvii: "The average PLF of the total Installed coal capacity of **235.1 GW** is likely to be about **58.4%** in 2026-27 and that of **259.6 GW** of coal based capacity is likely to be about **58.7 %** in 2031-32."
- item xviii: "The domestic coal requirement has been estimated to be **866.4 Million Tonnes** for the year 2026-27 and **1025.8 Million Tonnes** for the year 2031-32 and estimated requirement of **28.9 MT** of coal imports for the plants designed to run on imported coal."

From N1 §5.8.5 "Observations based on Scenario Analysis" and Exhibit 5.5a "Likely Coal Capacity in Different Scenarios in 2026-27 and 2031-32":

- "It is observed that the range of coal based installed capacity varies from **259.6 GW to 262.6 GW** in 2031-32 across various scenarios".
- Exhibit 5.5a data labels, 2031-32 by scenario: Base Case **259.6**, High Demand **262.6**, High BESS Cost **261.2**, Conservative **254.6**, High Hydro **259.0** GW. (Note the text's stated range "259.6 to 262.6" does not include its own chart's Conservative value of 254.6 — the low end of the printed range is *higher* than the lowest scenario in the accompanying exhibit. Flagged for A5.) The 2026-27 value is **235.1 GW in every one of the five scenarios**.
- "Apart from under construction coal based capacity of 26.9 GW, additional coal based capacity of **24.2 GW** (which is identified at sites at a distance of less than 500 km from coal mines) may be required till 2031-32 in base case. However, this requirement of additional coal capacity increases to around **27.1 GW** in conservative scenario."

So the NEP's base-case *new-build* arithmetic to 2031-32 is: 26.9 GW under construction + 24.2 GW additional = **51.1 GW** of coal capacity beyond what was standing when the Plan was written.

### The number was revised upward — twice

| Vintage | Document | Target year | Coal (or coal+lignite) capacity **requirement** | Stated **additional** capacity to be built |
|---|---|---|---|---|
| May 2023 | N1, NEP 2022-32 Vol I (gazette) | 2031-32 | **259.6 GW** coal, base case (scenario range 254.6–262.6 GW) | 26.9 GW under construction **+ 19.1–27.1 GW** additional (24.2 GW base case) |
| 25 Jul 2024 | N2, MoP via PIB | 2032 | **283 GW** coal & lignite | "additional **minimum 80 GW** coal-based capacity by 2031-32" |
| 09 Feb 2026 | N3, MoP via PIB (Rajya Sabha reply) | 2034-35 | **≈3,07,000 MW** (307 GW) thermal, coal and lignite | "additional **minimum 97,000 MW** coal and lignite based thermal capacity" |

Exact wording, so the revision cannot be read as a paraphrase:

- N2 (25 Jul 2024): "it is envisaged that to meet the base load requirement of the country in 2032, the required coal & lignite based installed capacity would be **283 GW** against the present installed capacity of 217.5 GW. Considering this, Government of India proposes to set up an additional **minimum 80 GW coal-based capacity by 2031-32**." It further prices this: "The estimated capital cost for setting up of new coal based thermal capacity as considered in National Electricity Plan is **Rs 8.34 Cr/ MW** (at 2021-22 price level). Hence, the thermal capacity addition is expected to entail an expenditure of **minimum Rs. 6,67,200 Crs** by 2031-32."
- N3 (09 Feb 2026): "projected thermal (coal and lignite) capacity requirement by the year 2034–35 is estimated at approximately **3,07,000 MW** as against the **2,11,855 MW** installed capacity as on 31.03.2023. To meet this requirement, Ministry of Power has envisaged to set up an additional **minimum 97,000 MW** coal and lignite based thermal capacity."

Operand by operand:

- Requirement: 283 − 259.6 = **+23.4 GW** between the May 2023 Plan and the July 2024 statement; 307 − 283 = **+24 GW** between July 2024 and February 2026. Total drift 307 − 259.6 = **+47.4 GW**.
- Additional build: 80 − 51.1 = **+28.9 GW** (against the NEP's under-construction-plus-additional base case); 97 − 80 = **+17 GW**. Total drift 97 − 51.1 = **+45.9 GW**, i.e. the announced new-coal programme roughly **doubled** in under three years.

**Two honest qualifications, because these are not perfectly like-for-like quantities.**

1. **Fuel scope.** N1's 259.6 GW is labelled "coal based capacity". N2's 283 GW and N3's 307 GW are both labelled "coal & lignite" / "thermal (coal and lignite)". Lignite capacity is small but not zero: CEA's own installed-capacity report as on 30.06.2026 (see A2.2) puts lignite at **6,620 MW**. Adding a comparable ~6.6 GW to the NEP's 259.6 GW gives ≈266.2 GW, so even on the most generous like-for-like adjustment the July 2024 figure is **283 − 266.2 = +16.8 GW** above the Plan. The revision survives the scope correction; it does not vanish into it.
2. **Horizon.** N1 and N2 both target 2031-32 / 2032. N3 moves the horizon out to **2034-35** — three years further. Part of the 283 → 307 GW step is therefore three extra years of growth rather than a re-rating of the same year. What is *not* explained by the horizon shift is the **denominator N3 chose**: it measures its 97,000 MW "additional" against "the 2,11,855 MW installed capacity **as on 31.03.2023**", a baseline nearly three years stale at the time of the reply, rather than against then-current capacity. The documents retrieved contain no statement of why the 31.03.2023 baseline was used.

### The pipeline, enumerated (N3, 09 Feb 2026)

N3 is the only document retrieved that itemises the coal build by stage. Its four categories, quoted:

| Stage | Capacity | Wording |
|---|---|---|
| Commissioned | **17,360 MW** | "thermal capacities of around 17,360 MW have already been commissioned since April 2023 till 20.01.2026" |
| Under construction | **39,545 MW** | "39,545 MW of thermal capacity (including **4,845 MW of stressed thermal power projects**) is currently under construction" |
| Contracts awarded, construction due | **22,920 MW** | "The contracts of 22,920 MW have been awarded and is due for construction" |
| Candidate capacity identified | **24,020 MW** | "24,020 MW of coal and lignite-based candidate capacity has been identified which is at various stages of planning in the country" |

Sum of the three not-yet-commissioned stages: 39,545 + 22,920 + 24,020 = **86,485 MW**. Adding the 17,360 MW already commissioned gives 103,845 MW, against the "minimum 97,000 MW" additional requirement — i.e. the identified pipeline as of Feb 2026 already exceeds the stated target by 6,845 MW, or falls 10,515 MW short of it if the already-commissioned tranche is counted against the 2023 baseline instead. Which reading the Ministry intends is **not stated in the document**; the release does not say whether the 17,360 MW commissioned since April 2023 counts toward the 97,000 MW.

### Projected coal PLF in the plan documents

Both planning vintages project coal PLF to *fall back* from where it now is (A2.4 measures 69.45% actual in FY2024-25):

- N1, item xvii: **58.4%** in 2026-27 and **58.7%** in 2031-32.
- N3: "The projected Plant Load Factor (PLF) of coal-based plants by the year 2031-32 is estimated to be around **61%**." — itself revised **upward** from the Plan's 58.7%, consistent with the larger fleet being expected to run harder, not idle. N3 hedges: PLF "will depend on a number of factors like the increase in electricity demand, actual coal based and RE capacity materializing etc."

### Cost comparison the government put on the record (N3)

Retrieved verbatim because it is the stated economic justification and is directly checkable later: existing coal-based all-India Weighted Average Rate of Sale of Power over "the past three years" is **INR 4.36–4.58/kWh** (lowest about INR 1.52/kWh); tariff discovered for **new** coal plants under Tariff Based Competitive Bidding in 2025 is **INR 5.38–6.30/kWh**; tariff under SECI's firm and dispatchable renewable energy (FDRE) tenders awarded August 2024 is **INR 4.98–4.99/kWh**. N3 then states that "a direct comparison is not appropriate on like-to-like basis". On the Ministry's own retrieved numbers, new coal is dearer per kWh than FDRE at the top of both ranges and at the bottom of both ranges.

---

## A2.5 Coal imports and import substitution

### Sources retrieved this run

| # | Document | Deep URL opened | HTTP | Bytes / text | Tier |
|---|---|---|---|---|---|
| I1 | Ministry of Coal / Coal Controller's Organisation, **"Table 8.1 : Year Wise Import of Coal, Coke & Other Coal Products to India during last Ten Years"** (the file the MoC import page links as "Import of Coal and Coke to India during last ten years", 147 KB). Covers FY2015-16 → FY2024-25. Sourced "DGCI&S, Kolkata". | `https://coal.gov.in/sites/default/files/2021-01/Import-of-Coal-and-Coke-last-ten-years.pdf` | 200 | 148,874 | T1 |
| I2 | Ministry of Coal, **"Import and Export"** major-statistics web page, table "IMPORT OF COAL FROM 2010-11 TO 2020-21"; page footer reads "Last Updated: 05 Aug 2026" | `https://coal.gov.in/major-statistics/import-and-export` | 200 | 58,313 bytes; 5,041 characters of extracted text | T1 |
| I3 | Ministry of Coal, PIB release **"India to stop import of thermal coal from Financial Year 2023-24 - Pralhad Joshi"**, Posted On **18 FEB 2020 5:42PM by PIB Delhi**, Release ID 1603554 | `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1603554&reg=3&lang=1` | 200 | 78,121 bytes; 9,865 characters of extracted text | T1 |
| I4 | Ministry of Coal, **"Strategy Paper on Coal Import Substitution — Inter-Ministerial Committee Report", March 2024**, 61 pp. | `https://coal.gov.in/sites/default/files/2024-03/07-03-2024a-wn.pdf` | 200 | 2,148,311 bytes; 115,286 characters of extracted text | T1 |
| I5 | Ministry of Coal, Year End Review-2025 (= P5 above) | `https://coal.gov.in/sites/default/files/2026-01/Pib-120126.pdf` | 200 | 2,086,239 | T1 |

`pib.gov.in` (without `www.`) returned **HTTP 301 with a 0-byte body** and extracted text length **0**. The same PRID on `www.pib.gov.in` with `-L` returned 200 and a full body. Recorded so the host is not mistaken for dead.

### Coal imports by year, million tonnes

From I1, Table 8.1 (columns: Coking Coal Qty., Non Coking Coal Qty., Total Coal Qty.):

| FY | Coking (MT) | Non-coking (MT) | **Total coal (MT)** | Total value (US $ million) |
|---|---|---|---|---|
| 2015-16 | 44.561 | 159.388 | **203.949** | 13,166.50 |
| 2016-17 | 41.644 | 149.365 | **191.009** | 14,948.01 |
| 2017-18 | 47.003 | 161.245 | **208.249** | 21,479.51 |
| 2018-19 | 51.838 | 183.510 | **235.348** | 24,513.22 |
| 2019-20 | 51.833 | 196.704 | **248.537** | 21,387.28 |
| 2020-21 | 51.198 | 164.054 | **215.251** | 15,665.39 |
| 2021-22 | 57.123 | 151.504 | **208.627** | 30,628.87 |
| 2022-23 | 56.053 | 181.615 | **237.668** | 48,034.94 |
| 2023-24 | 58.813 | 205.718 | **264.531** | 37,478.06 |
| 2024-25 | 57.576 | 186.046 | **243.622** | 29,549.29 |

The two earlier years of the window come from I2, whose table runs FY2010-11 → FY2020-21: 2013-14 total **166.86 MT**, 2014-15 total **212.10 MT** (2010-11 = 68.92, 2011-12 = 102.84, 2012-13 = 145.79, 2015-16 = 203.95, 2016-17 = 191.01, 2017-18 = 208.25, 2018-19 = 235.35, 2019-20 = 248.54, 2020-21 = 215.25 — the overlap with I1 agrees to the second decimal in every overlapping year, which is the check that licenses using I2 for the two years I1 does not cover).

**Defect in the live source, recorded because it affects how the numbers must be read.** I2's year column does not render as financial years. The eleven rows are labelled, literally, `2010-11, 2010-12, 2010-13, 2010-14, 2010-15, 2010-16, 2010-17, 2010-18, 2010-19, 2010-20, 2010-21` — the first component is frozen at 2010 in every row. The table's own heading says "IMPORT OF COAL FROM 2010-11 TO 2020-21" and there are exactly eleven rows, so the intended labels are 2010-11 … 2020-21; the identity of rows 2 through 11 is confirmed independently by I1, whose FY2015-16 → FY2020-21 quantities match rows 6 through 11 exactly. **The 2013-14 and 2014-15 figures therefore rest on a positional inference from a page whose year labels are visibly broken.** They should not be treated as equal in strength to the I1 figures. Flagged for A5.

### Arithmetic

- FY2013-14 → FY2024-25: 243.622 − 166.86 = **+76.762 MT**, i.e. imports at the end of the window are **46% above** the level at the start (243.622 ÷ 166.86 = 1.460).
- Peak of the series: **264.531 MT in FY2023-24** — the highest total-coal import in any year shown by either source, and it occurs **in the financial year by which imports of thermal coal were to have stopped** (see below).
- FY2024-25 fall: 264.531 − 243.622 = **−20.909 MT**, −7.90%. I5 states this as "the coal imports in the country during 2024-25 fell by 7.9%, totaling 243.62 million tonnes (MT), compared to 264.58 MT in the same period of previous fiscal year" — note I5 says **264.58**, I1's table says **264.531**; a 0.05 MT gap between two Ministry of Coal documents. I5 attaches a saving claim: "foreign exchange savings of approximately $7.93 billion (₹60681.67 crore)".
- Non-coking coal (the substitutable/thermal category) FY2013-14 is not separately recoverable from I2's extracted text at the precision I1 gives; on I1's own decade, non-coking imports run 159.388 (2015-16) → **205.718 (2023-24, the maximum)** → 186.046 (2024-25). Non-coking imports in FY2024-25 are **26.658 MT higher** than in FY2015-16 (186.046 − 159.388).

### The import-substitution objective, with dates and exact wording

Three distinct dated formulations were retrieved. They do not say the same thing.

**1. I3, 18 February 2020 — a hard stop with a named year.** Headline: "India to stop import of thermal coal from Financial Year 2023-24 - Pralhad Joshi". Body, first sentence, verbatim: *"India will stop importing thermal coal from Financial Year 2023-24, said Union Minister of Coal and Mines Shri Pralhad Joshi while chairing "Chintan Shivir" - a two day brainstorming session."* The same release records the associated production goal — "various ways and means were discussed with key stakeholders to achieve **1 billion tonnes (BT) coal production target by Coal India Limited (CIL) by Financial Year 2023-24**" — and three further FY2023-24 targets: CIL to "generate 5 GW of solar power by FY 2023-24", coal gasification "target of 50 Million Tonnes by 2030", and coal companies to "achieve zero mortality rate by FY 2023-24".

  **Outcome against that objective, from the same ministry's own data:** total coal imports in FY2023-24 were **264.531 MT (I1)**, the highest in the ten-year table, of which non-coking was **205.718 MT**, also the highest. CIL production in FY2023-24 was **773.806 MT (P2)** against the 1,000 MT target — a shortfall of 226.194 MT. Four financial years after the announcement (FY2024-25) non-coking imports were still 186.046 MT. **The documents retrieved contain no statement acknowledging that the FY2023-24 thermal-coal-import stop was not met, and no restatement of that specific commitment.**

**2. I4, March 2024 — the horizon moves to 2030, and "eliminate" is narrowed to "substitutable".** The Strategy Paper's §1.1.4 states the Ministry "has set a vision to curb the import of coal. With this aim, Ministry of Coal, Government of India, has constituted an Inter-Ministerial Committee (IMC), for the purpose of **import substitution of coal by 2030**". The Committee's Terms of Reference (§1.2) are narrower than the 2020 headline in a way that matters: ToR (a) is to "suggest supply side measures to eliminate **substitutable** coal import" and ToR (d) is to "suggest course corrections for **elimination of imports**". The paper's own framing of the problem: "import of coal reached to 73 MT in FY 2010 and 237 MT in FY 2023."

  The IMC is chaired by the Additional Secretary, Ministry of Coal, with 18 further members drawn from Commerce, Power, Railways, Shipping, Mines, Steel, NITI Aayog, DPIIT, MSME, CIL, SCCL, CEA, the Coal Controller Organization and the Paradip, Visakhapatnam and Kolkata Port Trusts (I4, Table 1).

  I4 Table 7, "Year-Wise Company-wise coal production projection in country" (Source line: "Ministry of coal"), is the supply side of that substitution plan:

  | FY | Coal India Ltd | SCCL | Captive & Others | Total (MT) |
  |---|---|---|---|---|
  | 2023-24 | 780.00 | 70.00 | 162.14 | 1012.14 |
  | 2024-25 | 838.00 | 72.00 | 170.00 | 1080.00 |
  | 2025-26 | 915.00 | 75.00 | 203.39 | 1193.39 |
  | 2026-27 | 1004.00 | 79.00 | 227.80 | 1310.80 |
  | 2027-28 | 1043.00 | 80.00 | 255.14 | 1378.14 |
  | 2028-29 | 1082.00 | 82.00 | 285.75 | 1449.75 |
  | 2029-30 | 1131.00 | 82.00 | 320.04 | 1533.04 |

  Against this, actual FY2023-24 total production was 997.826 MT (against 1012.14 projected, −14.31) and FY2024-25 was 1047.523 MT (against 1080.00 projected, **−32.48 MT**), with CIL at 781.056 against 838.00 (**−56.94 MT**) — a widening miss in the two years for which outturn exists. The Ministry's own 2029-30 projection of **1533.04 MT** is 46.4% above FY2024-25 actual.

**3. I5, January 2026 — the claim shifts from "imports" to "imports for blending".** I5's own summary of progress: "Abundant and uninterrupted supply of coal to power sector has led to **reduction in imported coal blending by 54.17%** over the last year. This coal imported for blending upto December 25 is just **5.5 MT** as compared to 12 MT last year", and "The coal imported for blending was **35 MT in 2022-23** which is gradually reducing due to abundant supply of domestic coal". I5 also gives, on coking coal specifically: "domestic raw Coking Coal production is likely to reach **140 MT by 2030**. The total domestic raw coking coal production during the financial year 2024-25 is **59.6 million tonnes (MT)**. The domestic raw coking coal production target for the financial year 2025-26 is **83 MT**." Coking-coal imports were 57.576 MT in FY2024-25 (I1) — essentially flat against 44.561 MT in FY2015-16 in a decade in which total production rose 63%.

  Note the category substitution: **"imported coal for blending" (5.5 MT) is a small subset of "coal imports" (243.622 MT)**, roughly 2.3% of the total. A reader who takes the 54.17% reduction as a statement about coal imports would be out by two orders of magnitude in the base. The two categories appear in the same document without a stated relationship between them.

### Summary of the objective-versus-outturn record

| Objective | Announced | Deadline | Outturn in the documents retrieved |
|---|---|---|---|
| Stop importing thermal coal | 18 Feb 2020 (I3) | FY2023-24 | FY2023-24 non-coking imports 205.718 MT, the series maximum (I1) |
| CIL production 1 billion tonnes | 18 Feb 2020 (I3) | FY2023-24 | 773.806 MT (P2) |
| Import substitution of coal | March 2024 (I4) | 2030 | horizon open; production running 32.48 MT below the plan's own FY2024-25 line |
| Domestic raw coking coal 140 MT | Jan 2026 (I5) | 2030 | 59.6 MT in FY2024-25 |
