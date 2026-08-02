# 08-RECONCILED. PUBLIC EDUCATION SPENDING — two independent passes, reconciled

**Reconciliation date: 2 August 2026.** Read-only pass over two research outputs produced without knowledge of each other.

| Label | File | Scope reconciled here |
|---|---|---|
| **Pass A** | `drops/phase-education/parts/08.md` | All of it |
| **Pass A′** | `drops/phase-education/parts/8A.md` | Only where it bears on Pass A's Economic Survey 2025-26 tier claim |
| **Pass B** | `drops/phase-education/parts/11-spending-literacy.md` | **PART A only.** Part B (literacy) is out of scope and is not touched here. |

Nothing in this file was retrieved. Every figure below is carried from Pass A or Pass B with its attribution. Where I performed arithmetic on figures **both** passes already carry, it is labelled **[derived here]** and is subtraction or division only — no interpolation, no estimation, no filling of gaps.

---

## R1. AGREEMENT

The two passes agree far more than they disagree, and the agreement is load-bearing because it is independent.

### R1.1 The primary document

Both identify the same document, the same table, the same page, and the same retrieval failure.

- **Pass A:** *"Analysis of Budgeted Expenditure on Education 2019-20 to 2021-22, Ministry of Education, Table No. (4), p. 16."* Original URL `.../statistics-new/budget_exp_2020_22.pdf` — **HTTP 404**. Retrieved via Internet Archive snapshot **2025-02-12**. **Tier T1** — *"the ministry's own document byte-for-byte; the archive is transport, not source."*
- **Pass B:** same document, same table, same page, adds the publication vintage — *"New Delhi, **2024** (PDF last modified 3 Dec 2024)"* — and the same 404, retrieved from `web.archive.org/web/20250212064309id_/...` (**the identical snapshot timestamp**). Tier **T1** with a retrieval caveat.

**Carried once:** ABE 2019-20 to 2021-22, MoE (DoHE), Planning/Monitoring/Statistics Bureau, New Delhi, 2024. Table No. (4), report p. 16. **T1**, retrieved via Internet Archive capture 2025-02-12; the live ministry URL 404s. Record the retrieval route in `notes` (Pass A's instruction, adopted).

Both independently establish that `education.gov.in` now serves a client-rendered SPA that returns HTTP 200 with an empty shell for any path, so **the live document inventory cannot be enumerated by fetch**. Pass A verified this with five fabricated ABE paths, all returning 200 with no content. Pass B verified it via the Wayback CDX API and adds the stronger finding: **the newest ABE ever archived is this edition** (last capture 26 Sep 2025).

### R1.2 The two numerators

Both establish, independently, that ABE Table 4 publishes **two side-by-side totals** for the same year:

- **Education departments only** — education departments of the Centre and all States/UTs.
- **Education and other departments** — additionally sweeping in education spending booked by non-education ministries.

Both quote the ABE's own framing of the gap. Pass A quotes ABE §3.2 p. 8 verbatim: *"only 2.75% of the GDP… the percentage figure reaches to 4.12%."* Pass B quotes ABE §1.1: *"the expenditures incurred by other departments include those on training, research, and development"* and confirms double-counting of centrally sponsored schemes is avoided by splitting central and state shares.

### R1.3 The series itself — 22 years × 6 columns, zero divergence

**Pass A's table and Pass B's table agree on every one of the 132 published cells.** FY2000-01 through FY2021-22; States %, Centre %, Total % on both bases. I checked all of them. This is the strongest single result of the reconciliation: two independent extractions of the same T1 table produced identical values.

Pass B additionally carries the **GDP denominator column in ₹ crore for all 22 years**, which Pass A does not. Pass A carries none of it; there is no conflict, only coverage.

**Pass B's term aggregates recompute correctly [derived here — I re-averaged them]:**

| Period | All-departments mean | Education-departments mean | Recheck |
|---|---|---|---|
| UPA-2 (FY2009-10→FY2013-14) | 3.87% | 3.08% | both confirmed |
| T1 (FY2014-15→FY2018-19) | 4.06% | 2.76% | both confirmed |
| T2 partial (FY2019-20→FY2021-22) | 4.17% | 2.81% | both confirmed |
| T3 (FY2024-25→) | no data | no data | both passes agree |

> **But see R5.4:** the UPA-2 means straddle the GDP-base splice and are not comparable to the T1/T2 means as printed.

### R1.4 The GDP-base splice

Both passes independently establish that **the denominator inside ABE Table 4 is spliced across base years**, that the splice is **undocumented in the 2024 edition**, and that it inflates the early (UPA-era) ratios. Both establish this by comparing ABE editions with identical numerators and different denominators. Both connect it forward to the **February 2026 rebasing to a 2022-23 base**, and both conclude the rebasing will **mechanically raise every education share** with no change in spending. See R5 for the consolidated statement and for where they part company.

### R1.5 The estimate-status pattern

Both establish the same pattern for the last three rows of the ABE:

- **FY2019-20 = Actual · FY2020-21 = Revised Estimate · FY2021-22 = Budget Estimate.**

Pass B states the generating rule and is honest about its status: *"in every ABE edition, the last three rows are Actual / RE / BE respectively; all earlier rows are Actuals. The status column is therefore **not** an ABE annotation for rows 1–19 — it is inferred from the publication convention, which the ABE follows consistently across all four editions I examined."* Pass A labels rows 1–19 "A" without flagging the inference. **Pass B's framing is adopted**: the estimate stage for FY2000-01→FY2018-19 is **inferred from convention, not annotated in the source**.

### R1.6 The 2020-21 spike is a denominator artefact

Both reach this independently and their arithmetic agrees.

- **Pass A:** *"The 2020-21 rise is a denominator artefact. Nominal GDP fell from ₹201.0 lakh crore to ₹198.3 lakh crore. Same shape as `P-48`."*
- **Pass B:** *"Nominal GDP fell from ₹2,01,03,593 cr to ₹1,98,29,927 cr (−1.4%)… The numerator grew 6.4%; the ratio rose 0.32pp. Roughly a fifth of the apparent rise is the denominator shrinking."*

**[derived here]** Both check out: 4.04% → 4.36% is +0.32pp; holding GDP at the FY2019-20 level gives 4.30%, so 0.06 of the 0.32pp move — **19%** — is the denominator. Pass A's link to `P-48` (agriculture's COVID share rise as a compositional artefact) is the right cross-reference and is adopted.

### R1.7 The series stops, and the stop is a finding

Both establish that no ABE covers FY2022-23 onward, that the data plainly still exists in the holder's hands, and that this is therefore an **absence of publication, not an absence of data**. Pass A proposes `reasonKind: not-published` explicitly. Pass B reaches the same substance — *"T3 has zero observations"* — and supplies Pass A's requested verification partly: the Wayback CDX check establishes that **nothing newer was ever archived**. Neither can prove nothing exists behind the live site's runtime API.

---

## R2. DISAGREEMENT

Nine points. Each carries both accounts. Where neither is better evidenced, both stay on the record.

### D-1. Economic Survey 2025-26: does it contain an education-share-of-GDP figure at all? **RESOLVED AGAINST PASS A.**

- **Pass A:** *"A third number — the government's own flagship annual uses the narrow basis. Economic Survey 2025-26: 'General government expenditure on education has declined from **2.9% of GDP in FY20 to 2.7% in FY26 (BE)**', flat at 2.7% since FY22. **T4 as held** — the Survey chapter PDF was not directly pulled and must be upgraded to T1 before authoring."*
- **Pass B:** *"**Economic Survey 2025-26 dropped the education-%-of-GDP table entirely.** I searched all 13 chapters and the 233-page appendix: **no education-as-%-of-GDP figure anywhere.** Ch. XIII gives only CAGRs (SSE 12%, education 11%, health 8%, FY22→FY26BE) and a chart."* Pass B's comparison table records the same: *"Economic Survey 2025-26 | no %-of-GDP figure at all."* **T1, retrieved.**

**Pass B is better evidenced and Pass A's quote must not be carried.** Three reasons, compounding:
1. Pass B performed the retrieval and the exhaustive search; Pass A explicitly did not pull the chapter and self-graded the quote **T4**.
2. **Pass A′ (`8A.md`) retrieved Economic Survey 2025-26 material directly** — the Statistical Appendix, the Infographics, and Chapter 11 including footnote 8 on p. 422, all graded **T1** — and **did not upgrade or repeat the 2.9%→2.7% quote.** The same research pass got hands on the document and left the claim at T4. That is the strongest available signal that the quote was never located in the document.
3. Pass A used the quote to extend the narrow series from FY2022 to FY2026 at ≈2.7%. **That extension is withdrawn.** The narrow series ends at FY2021-22.

**A plausible origin for the 2.7%, flagged as a hypothesis and not established:** Pass B retrieved, at T1, an **Economic Survey 2023-24** table giving **2.7% for FY2023-24 BE** on the RBI *"Education, Sports, Arts and Culture"* definition. Pass A's figure may be a garbled relay of that. **Not resolved — do not encode either way.**

**What Pass B offers instead, and its limits:** *"Derived (not retrieved) recent values. From ES 2025-26 Chart XIII.2 data labels (₹9.1 lakh cr FY25 RE, ₹9.8 lakh cr FY26 BE) on the 'Education, Sports, Arts and Culture' definition: **≈2.75% (FY25 RE) and ≈2.74% (FY26 BE)** on the 2011-12 base; ≈2.86% / 2.84% on the 2022-23 base. **Chart-label derivation, T1 source but inferred values — do not treat as retrieved.**"* These are **a third definition**, not ABE-narrow. Their numerical proximity to ABE-narrow's 2.75% is a coincidence of magnitude, not a continuation of the series, and they must not be appended to it.

### D-2. How many GDP bases are inside the table, and were the early years restated? **UNRESOLVED. Both stay.**

The two passes used **different earlier ABE editions** and reached incompatible conclusions about FY2004-05.

- **Pass A**, from *ABE 2007-08 to 2009-10* (third-party mirror, self-graded **T4**), quotes its footnote: *"GDP figures are on the base year 1999-00 series. **From 2004-05 onwards GDP figures are on the base year 2004-05 Series**."* Pass A concludes **three bases** — 1999-2000, 2004-05, 2011-12 — and prints an edition-comparison showing **2004-05 unchanged at 3.26% across both editions ("Restated? no")** and 2007-08 unchanged at 3.40%.
- **Pass B**, from *ABE 2006-07 to 2008-09* (MHRD, New Delhi 2010), quotes its footnote: *"GDP figures are on the base year 1999-00 series… taken from National Accounts Statistics 2009 published by CSO."* Pass B concludes **two regimes** and prints: *"the 2010 edition gives 2004-05 all-departments as **3.36%** (GDP ₹28,77,701 cr); the 2024 edition gives **3.26%** (GDP ₹29,71,464 cr). The numerator is byte-identical (₹96,694 cr). **The entire difference is the rebasing.**"*

**Neither can be preferred on the evidence present.** Pass B's claim is the more decomposable — it names both denominators and the shared numerator, so it is checkable — but it is a claim about a **different document** than Pass A's. Pass A's edition explicitly footnotes a 2004-05 base regime that Pass B's edition does not mention; Pass B's edition footnotes only the 1999-00 base, which is consistent with it printing 3.36% where Pass A's edition prints 3.26%. **The two accounts are reconcilable if the 2007-10 edition had already adopted the 2004-05 base for FY2004-05 onward while the 2006-09 edition had not — but neither pass tested that, and I cannot test it here.**

**Both stay on the record.** Do not average, do not choose. The verification step is stated in R6.

### D-3. Is ABE Table 4's denominator at factor cost or at market prices? **PARTIALLY RESOLVED.**

- **Pass A:** *"The ABE's column 3 is headed 'GDP AT CURRENT PRICES (AT FACTOR COST)'. **That header is wrong**: the values are GDP at current **market** prices. Check — ABE gives 2013-14 GDP as ₹1,12,33,522 crore; India's GDP at current market prices in 2013-14 on the 2011-12 base is ₹112.3 lakh crore, while GVA at basic prices was ~₹103.6 lakh crore."*
- **Pass B:** *"The ABE's column header is wrong. It reads 'GDP AT CURRENT PRICES (AT FACTOR COST)' for the whole column. **That label is true only of the early rows.**"* Pass B concludes: FY2011-12 onward = market prices, 2011-12 base; FY2000-01→FY2010-11 = *"old-base GDP **at factor cost** — spliced on, not recomputed."*

**Resolution, in two halves:**
- **From FY2011-12 onward the two agree and Pass B's evidence is decisive.** Pass B matched the ABE denominator against Economic Survey 2025-26 Statistical Appendix **Table 1.6, "Components of Gross Domestic Product at Current Prices", 2011-12 Series** (T1) and found **exact matches for FY2011-12, FY2012-13, FY2013-14 and through FY2019-20**, against **non-matches for 2004-05, 2009-10 and 2010-11**. Pass B corroborates with ES 2023-24 Table VII.1 Note (i): *"The ratios to GDP at current market prices are based on 2011-12 base till 2021-22."*
- **For the pre-FY2011-12 rows, Pass A's evidence does not reach.** Pass A's single check is on **FY2013-14** — a post-splice row where both passes agree the values are market prices. Pass A generalised from one row on the wrong side of the break to the whole column. **Pass A's "the header is wrong, full stop" is therefore over-broad.** But **Pass B asserted "at factor cost" for the early rows without demonstrating it** — its evidence shows only that those rows are *not* on the 2011-12-base market-price series, which is a weaker statement.

**Carried:** FY2011-12 onward — GDP at current **market** prices, 2011-12 base, **established**. FY2000-01→FY2010-11 — an older base, **established**; whether factor cost or market prices, **not established by either pass**. The column header is wrong for at least part of the column, and anyone recomputing the ratio from the stated definition will not reproduce the printed values.

### D-4. Which ministries are swept into the broad total. **NOT A CONTRADICTION — A COVERAGE GAP IN PASS A.**

- **Pass A** lists ten ministries from **ABE §4.2**: Culture; Labour & Employment; Minority Affairs; Personnel PG & Pensions; Railways; Social Justice & Empowerment; Textiles; Tribal Affairs; Women & Child Development; Food Processing Industries. Pass A presents this as the sweep.
- **Pass B** gives **all three allocation buckets, §§4.2–4.4** — the same ten into Elementary & Secondary, plus nineteen into University & Higher Education (including **Finance**, Home Affairs, External Affairs, Jal Shakti), plus fifteen into Technical Education (including **Health & Family Welfare, Space, Atomic Energy**, Skill Development, Power, Coal, Petroleum).

**Pass A's list is ABE §4.2 alone — one of three buckets.** That is why Pass A never surfaces Atomic Energy, Space or Health: they sit in §4.4. **Pass B's coverage is adopted.** Pass B further reports the lists are **stable between the 2022 and 2024 editions**, which Pass A could not check.

**But Pass B has an internal inconsistency here and it is not resolved.** Pass B's headline says the 4.12% *"includes Ministry of **Defence** (₹15,519 cr)"*, and its FY2021-22 Centre extraction carries Defence as the **fourth-largest** non-education line — yet **Defence appears in none of Pass B's three "verbatim" §§4.2–4.4 lists.** Either the transcribed lists are incomplete or Defence appears in ABE Statement 1 without an assigned bucket. **Unresolved. The Defence line should be re-verified against ABE Statement 1 before it is quoted.**

### D-5. Training. **PASS B ONLY. NOT CONTRADICTED.**

Pass A does not mention training anywhere in `08.md`. Pass B establishes it as a distinct definitional layer and quantifies it: **₹20,205 cr = 0.09pp of GDP**, FY2021-22 BE, and states the asymmetry — *"ABE Table 4's narrow column is education **only**; its headline column is education **and training**. The two columns are not like-for-like."* Adopted from Pass B. **[derived here]** Pass B's own arithmetic closes: 9,67,177 − 9,46,972 = 20,205, and 20,205 ÷ 2,34,71,012 = 0.086% → 0.09pp.

### D-6. Where the broad series peaks. **PASS B'S LABEL IS WRONG AS PRINTED.**

Pass B annotates **FY2016-17 = 4.24% "← series peak"** — but its own table's row 21 carries **FY2020-21 = 4.36%**, which is higher. The label is defensible only as *"highest Actual"* (4.36% is a Revised Estimate). **Corrected here: 4.24% (FY2016-17) is the highest Actual on the broad basis; 4.36% (FY2020-21, RE) is the table maximum and is a COVID denominator artefact (R1.6).** Pass A makes no peak claim on the broad basis and is unaffected.

Pass A's narrow-basis claims check out and are carried: **[derived here]** the narrow column's maximum is **3.22% (FY2010-11)** and its minimum is **2.61% (FY2018-19)**, exactly as Pass A states.

### D-7. The size of the definitional gap. **PASS A'S RANGE IS TRUE ONLY OF THE RECENT DECADE.**

- **Pass A:** the two totals differ *"by **1.2 to 1.4 percentage points** of GDP."*
- **Pass B:** *"the gap is far larger than the 0.5–0.8pp expected: it is **1.37 percentage points** (4.12% vs 2.75% in FY2021-22)."*

**[derived here — subtraction of two published columns both passes carry identically]** across the full 22-year table the gap runs from **0.52pp (FY2004-05)** to **1.46pp (FY2016-17)**:

| FY | 2004-05 | 2012-13 | 2013-14 | 2014-15 | 2016-17 | 2021-22 |
|---|---|---|---|---|---|---|
| Broad − narrow (pp) | **0.52** (min) | 0.69 | 0.87 | 1.17 | **1.46** (max) | 1.37 |

**Pass A's "1.2 to 1.4" describes FY2014-15 onward and understates nothing about the present, but it conceals that the gap itself roughly tripled.** Pass B captures the same movement from the other side: *"Other-departments share of the total rose from **15.9% (2004-05) to 33.3% (2021-22)**. The headline ratio is increasingly driven by non-education ministries."* **Pass B's framing is adopted; the gap is not a constant and must never be treated as a fixed offset between the two series.**

### D-8. The Centre/State split, and the "ABE 2022-23 BE" citation. **PASS A IS INTERNALLY INCONSISTENT.**

Pass A: *"States carry three-quarters of the money and always have — **ABE 2022-23 BE: 24.62% Centre, 75.38% States/UTs.**"* But Pass A itself states the latest locatable ABE edition ends at FY2021-22, and Pass B independently establishes that **no ABE covers FY2022-23 onward**. **The vintage attached to this figure is unsupported by either pass's own findings.**

The *substance* survives: **[derived here]** ABE Table 4's own FY2021-22 broad columns give States 3.10 of 4.12 = **75.2% States / 24.8% Centre**, within rounding of Pass A's split. **Carry the claim; drop the "ABE 2022-23 BE" citation until an edition covering FY2022-23 is produced.** Pass A's downstream point stands and is adopted: *"Any Union-budget-only story about Indian education spending is a story about a quarter of it."*

### D-9. Tier gradings assigned to the same or parallel documents

| Document | Pass A | Pass B | Reconciled |
|---|---|---|---|
| ABE 2019-20→2021-22 | **T1** (archive = transport) | **T1** with retrieval caveat | **T1.** No disagreement. |
| Earlier ABE edition | *ABE 2007-08→2009-10* via `educationforallinindia.com` — **T4 as retrieved**, with the mitigation that *"values match the later ministry edition exactly for 2004-05 through 2007-08"* | *ABE 2006-07→2008-09* (2010) via Internet Archive — treated as usable primary; no explicit tier | **Different documents, different routes.** Pass A's T4 self-grade for a third-party mirror is the correct discipline and should apply to any mirror-sourced edition. Pass B's Wayback-sourced edition is T1-content-via-archive on the same logic Pass A applies to the 2019-22 edition. **Report both; do not merge.** |
| Economic Survey 2025-26 | **T4 as held** (chapter not pulled) for the spending quote; **T1** in Pass A′ for the Statistical Appendix, Infographics and Ch. 11 | **T1**, chapters and appendix retrieved and searched | **Tier depends on the artefact, not the publication.** The spending quote stays **T4 and is withdrawn** (D-1); the appendix/infographics/Ch.11 material is **T1**. |
| ES 2023-24 Ch. 7 Table VII.1 | not retrieved | **T1**, retrieved live | **T1**, Pass B only. |
| Standing Committee 363rd Report | not retrieved | **T1**, `sansad.in` | **T1**, Pass B only. |
| WDI `SE.XPD.TOTL.GD.ZS` | **T2**, World Bank API, WDI vintage published 2026-02 | not covered | **T2**, Pass A only. |
| MoSPI 2022-23 base rebasing | cited as `P-10` | **T1** via PIB PRID 2233518 (the MoSPI PDF itself timed out) | **T1** via PIB; matches the existing `P-10` record's own sourcing. |
| NEP 2020 document | 404 on the ministry site | 404 live, **403/429 archived** — 6% commitment confirmed instead via PIB Lok Sabha reply, 6 Dec 2021, **T1** | **The NEP text itself is unretrieved by both.** The 6% commitment is **T1 via PIB only.** |
| Allocation of Business Amendment Rules (2020 rename gazette) | not covered | **T4** — `cabsec.gov.in` DNS-failed; *"356th Amendment Rules, 2020"* is press-sourced, *"do not promote to T1"* | **T4**, Pass B only. |

---

## R3. THE DEFINITIONAL SPLIT — the single most consequential thing in this section

**"India spends X% of GDP on education" has no single true answer.** The Ministry of Education publishes two answers side by side in one table for the same year, and they differ by more than half of the smaller one.

**For FY2021-22 (Budget Estimate), the last year any ABE covers, denominator GDP ₹2,34,71,012 crore:**

| Definition | ₹ crore | % of GDP | Source |
|---|---|---|---|
| **Education departments only** (Centre + all States/UTs), revenue account | 6,45,333 | **2.75%** | ABE Table 4, narrow column · T1 · both passes |
| + other departments' education spending, revenue account | 9,46,972 | **4.03%** | ABE decomposition · T1 · **Pass B only** |
| **+ training** → the headline everyone quotes | 9,67,177 | **4.12%** | ABE Table 4, broad column · T1 · both passes |
| Education departments, all three accounts (rev + cap + L&A) | 6,66,968 | 2.84% | ABE · T1 · **Pass B only** |
| All departments, all three accounts | 9,88,812 | 4.21% | ABE · T1 · **Pass B only** |

**THE GAP IS 1.37 PERCENTAGE POINTS OF GDP.** The narrow figure is **two-thirds** of the headline. **[derived here]** I verified Pass B's decomposition against the shared Table 4 and it reconciles exactly: 6,45,333 ÷ 2,34,71,012 = 2.7495% → 2.75 ✓; 9,67,177 ÷ 2,34,71,012 = 4.1207% → 4.12 ✓; 9,46,972 ÷ 2,34,71,012 = 4.0346% → 4.03 ✓. Pass B's ₹-crore layer and Pass A's %-layer are the same object.

**What the extra 1.37pp is made of** (Pass B, ABE Statement 1, FY2021-22 BE, Centre only, ₹ crore):

| Ministry / Department | ₹ crore |
|---|---|
| Health & Family Welfare | 30,097 |
| Women & Child Development (ICDS / anganwadi) | 21,661 |
| Department of Atomic Energy | 16,392 |
| Ministry of Defence | 15,519 ⚠ *bucket unverified — see D-4* |
| Social Justice & Empowerment | 9,113 |
| Agriculture & Farmers Welfare | 8,876 |
| Science & Technology | 5,950 |
| Department of Space | 5,720 |
| Railways | 4,615 |
| Tribal Affairs | 4,013 |
| **All other ministries, total** | **1,45,250** |
| **Ministry of Education** | **93,169** |
| **Grand total, Centre** | **2,38,419** |

**The Ministry of Education is 39% of what the 4.12% headline calls "education."** The top four non-education ministries alone (₹83,669 cr) come to **90% of the entire Ministry of Education budget**.

**The government itself documents the sweep.** Pass B's most useful single retrieval, ES 2023-24 Ch. 7 Table VII.1 Note (ii), **T1**:

> *"While RBI's data on Education expenditure incorporates the spending incurred by Centre and States on 'Education, Sports, Arts, and culture', MoE's estimates also include expenditure incurred on medical and public health education, agriculture research and education, welfare of SC, ST, OBC & Minority's education, other scientific research & development, Education under social security, Nutritious food expenditure under mid-day meal, expenditure on imparting training to police, Labour employment and skill development expenditure, education/training expenditure under rural development Programmes etc. This leads to a higher estimate of expenditure on education, which is 4.64 per cent of GDP in 2020-21 (latest available)."*

**And the ABE concedes the allocation is an assumption, not a measurement** (Pass A, ABE §4.2): the sector-wise breakup of other departments' spending *"is not available in the budget documents"*, so it is assigned on the stated ground that it *"mainly goes towards Elementary and Secondary Education sectors and therefore expenditure incurred by these Ministries has been counted towards Elementary & Secondary."*

**Two further facts fix the stakes:**

1. **Parliament is briefed on the broad number.** Pass B, T1: the Standing Committee on Education, Women, Children, Youth and Sports, **363rd Report** (DfG 2025-26, DoSEL), presented to Rajya Sabha **26 March 2025**, Para 2.10, reproduces the broad series verbatim — *"4.07%, 4.20% and 4.24% … decreased to 3.87%, 3.90% and 4.04% … increased to 4.36% during 2020-21 and again declined to 4.12 during 2021-22"* — plus the broad Centre row. **Every value matches both passes' extraction.** This is an **independent T1 confirmation of the broad series** and it establishes that **Parliament sees 4.12%, not 2.75%**.

2. **The 6% target is compared against the broad number.** Pass B: the commitment (*"increase the public investment in Education sector to reach 6% of GDP at the earliest"*, PIB, Lok Sabha written reply, 6 Dec 2021, **T1**) is invoked against 4.12%. **The gap to target is therefore 1.9pp or 3.3pp depending on a definitional choice that is never stated when the target is invoked.** Pass B adds two sharpeners: **the ABE never mentions the 6% target, NEP 2020 or Kothari** (all four editions grepped) — the comparison is made outside the statistical document; and **Kothari's "6% of national income" was not verified** in either pass, which matters because national income is a smaller denominator than GDP at market prices, so **the two "6%" targets are not the same bar.**

**And the split reverses the direction of history.** Both passes reach this independently and it is the finding:

- **Broad basis, FY2013-14 → FY2021-22: 3.84% → 4.12% — improvement.**
- **Narrow basis, FY2013-14 → FY2021-22: 2.97% → 2.75% — decline.**
- **Centre's own education-department spending: 0.64% → 0.40% of GDP — the lowest value in the 22-year table**, a 38% fall in share terms (Pass B).

Pass A states it best: *"Same budgets, opposite direction, purely from numerator choice."*

---

## R4. THE SERIES

**The definitional split requires separate series.** Not as a formatting preference — as a correctness requirement. The two columns move in **opposite directions across the political transition** (R3), the gap between them **varies from 0.52pp to 1.46pp** (D-7), and one is education-only while the other is education-plus-training (D-5). They are not one series with an offset. **Any single "education spending % of GDP" line in this instrument is a false object.**

Five specifications follow. All use the instrument's `series.schema.json`.

> **ENCODING CONSTRAINT THAT MUST BE RAISED BEFORE ANY OF THIS IS APPLIED.** The schema's `status` enum is **`verified` / `approx` / `pending`** — an *evidence* grade. It cannot express **Actual / Revised Estimate / Budget Estimate**, which is an *estimate-stage* grade and is orthogonal to it (a Budget Estimate can be perfectly verified and still be wrong by 0.3pp). Pass B's encoding recommendation #2 asks for an `estimate_status` field; **the schema has no such field and `additionalProperties` is false.** Until it is added, estimate stage is carried in each point's `note` and **must render**. This is a schema gap, not an authoring choice. *Code does not edit `/data` or `/schemas` — raised here for the operator to apply at source.*

---

### S-1 · `edu-spend-gdp-edu-depts` — the narrow series

- **title:** Public expenditure on education by education departments, share of GDP
- **unit:** `% of GDP`
- **domain:** `human-development` *(matching `health-exp-union`, the closest existing analogue)*
- **calendar:** `FY`
- **tier:** `T1`
- **higherIsBetter:** `true`
- **DENOMINATOR (stated explicitly, per `P-52`):** *GDP at current prices as printed in ABE Table 4 column 3. The column header reads "at factor cost" and is wrong for at least part of the column (D-3). From FY2011-12 the values are GDP at current **market** prices on the **2011-12 base**, confirmed cell-exact against Economic Survey 2025-26 Statistical Appendix Table 1.6. Before FY2011-12 the values are on an **older base**, and whether they are factor cost or market prices is **not established** (D-3). The base is spliced inside the published column and the 2024 edition carries no note saying so.*
- **NUMERATOR:** *Revenue-account expenditure only, by the education departments of the Centre and all States/UTs. **Capital expenditure and Loans & Advances are excluded** — verified by Pass B against ABE §2.6: FY2019-20 across all three accounts is ₹5,60,107 cr (Rev 5,49,606 + Cap 10,303 + L&A 198) while **Table 4 carries ₹5,49,606 cr**. Nothing is netted out except the CSS central/state split that prevents double counting.*
- **source:** name `Analysis of Budgeted Expenditure on Education 2019-20 to 2021-22, Ministry of Education, Table No. (4), p. 16`; url `https://web.archive.org/web/20250212064309id_/https://www.education.gov.in/sites/upload_files/mhrd/files/statistics-new/budget_exp_2020_22.pdf`; **vintage `2024-12`** (PDF last modified 3 Dec 2024). Original ministry URL `https://www.education.gov.in/sites/upload_files/mhrd/files/statistics-new/budget_exp_2020_22.pdf` — **HTTP 404 as of 2026-08-01.**
- **provenanceRefs:** `P-10` *(GDP rebasing — see R5)*, `P-52` *(denominator must render)*, plus the two proposed records in R7.

**Points** — all values from ABE Table 4 narrow "Total" column; both passes extracted these identically.

| period | value | status | note |
|---|---|---|---|
| FY2000-01 | 3.14 | verified | Actual (stage inferred from ABE convention, not annotated) · **old GDP base** |
| FY2001-02 | 2.99 | verified | Actual (inferred) · old GDP base |
| FY2002-03 | 2.93 | verified | Actual (inferred) · old GDP base |
| FY2003-04 | 2.79 | verified | Actual (inferred) · old GDP base |
| FY2004-05 | 2.74 | verified | Actual (inferred) · old GDP base; **possible base change here — disputed, D-2** |
| FY2005-06 | 2.79 | verified | Actual (inferred) · old GDP base |
| FY2006-07 | 2.79 | verified | Actual (inferred) · old GDP base |
| FY2007-08 | 2.74 | verified | Actual (inferred) · old GDP base |
| FY2008-09 | 2.88 | verified | Actual (inferred) · old GDP base |
| FY2009-10 | 3.11 | verified | Actual (inferred) · old GDP base |
| FY2010-11 | 3.22 | verified | Actual (inferred) · old GDP base · **series maximum** |
| FY2011-12 | 3.09 | verified | Actual (inferred) · **2011-12 base begins — denominator break** |
| FY2012-13 | 3.01 | verified | Actual (inferred) |
| FY2013-14 | 2.97 | verified | Actual (inferred) · **last full UPA year — baseline** |
| FY2014-15 | 2.90 | verified | Actual (inferred) |
| FY2015-16 | 2.81 | verified | Actual (inferred) |
| FY2016-17 | 2.78 | verified | Actual (inferred) |
| FY2017-18 | 2.68 | verified | Actual (inferred) |
| FY2018-19 | 2.61 | verified | Actual (inferred) · **series minimum** |
| FY2019-20 | 2.73 | verified | **ACTUAL — annotated in source** |
| FY2020-21 | 2.95 | verified | **REVISED ESTIMATE — annotated in source.** Rise is a denominator artefact (R1.6) |
| FY2021-22 | 2.75 | verified | **BUDGET ESTIMATE — annotated in source.** BE revises down systematically (R4.6) |
| FY2022-23 | `null` | pending | **No ABE published.** Not collected-at-the-instrument; data exists with the holder |
| FY2023-24 | `null` | pending | No ABE published |
| FY2024-25 | `null` | pending | No ABE published — **T3 has zero observations** |
| FY2025-26 | `null` | pending | No ABE published |

**breaks**

| period | note | provenanceRef |
|---|---|---|
| FY2004-05 | **DISPUTED.** Pass A's earlier ABE edition footnotes a switch to the 2004-05 GDP base from this year; Pass B's earlier edition does not, and shows FY2004-05 restated 3.36→3.26 between editions on the broad basis. Neither preferred — D-2. | `P-10` |
| FY2011-12 | **Denominator base switches to 2011-12, GDP at current market prices.** Confirmed cell-exact against ES 2025-26 Statistical Appendix Table 1.6 from this year forward; non-matching before it. Values before and after this row are not on one denominator. | `P-10` |
| FY2019-20 | **Estimate-stage break.** From here the ABE annotates stage: FY2019-20 Actual, FY2020-21 RE, FY2021-22 BE. Earlier rows' stage is inferred from publication convention, not annotated. | *(proposed P-60, R7)* |
| FY2022-23 | **Series terminates.** No ABE edition covers FY2022-23 onward as of 2026-08-01 — a four-year gap in a 25-year annual statistical series. | *(proposed P-59, R7)* |
| FY2022-23 *(prospective)* | **The 2022-23 GDP base will land here when the back series is published.** Nominal GDP is ~3.8% lower on the new base, so this series will step up ~+3.9% in relative terms — **≈ +0.11pp at a 2.75% level** — with no change in spending. Not yet applicable: the ABE predates the rebasing and the MoSPI back series is unreleased. | `P-10` |

**caveat:** *This is the NARROW numerator — education departments only, revenue account only. It is not the figure quoted in Parliament, in the Economic Survey, or against the 6% target; that is `edu-spend-gdp-all-depts`, which is 1.37pp higher in FY2021-22 and moves in the OPPOSITE direction across FY2013-14→FY2021-22. Never render either series without the other. The denominator is spliced across GDP base years inside the published column and the source carries no note saying so.*

**unmeasured:** what — *disaggregated education spending as a share of GDP for FY2022-23 onward*; why — *the ABE, an annual Ministry of Education publication running since at least 2000-01, has published no edition covering FY2022-23 or later; the underlying data plainly still exists and is still compiled, since the Ministry answers on it in Parliament*; reasonKind — **`not-published`**; wouldFill — *an ABE edition covering FY2022-23 onward, or the ministry's runtime API queried from an Indian IP*.

---

### S-2 · `edu-spend-gdp-all-depts` — the broad series (the headline)

Identical in every structural respect to S-1 — same source, same table, same page, same tier, same denominator, same breaks, same terminal absence — with these differences:

- **title:** Public expenditure on education by education and all other departments, share of GDP
- **NUMERATOR:** *Revenue-account expenditure by education departments **plus** education and **training** spending booked by roughly 44 other ministries and departments across three allocation buckets (ABE §§4.2–4.4), including Health & Family Welfare, Women & Child Development (ICDS), Atomic Energy, Space, Railways, Finance and Home Affairs. **Training is included in this column and excluded from S-1 — the two columns are not like-for-like** (₹20,205 cr = 0.09pp in FY2021-22). The ABE cannot break other departments' spending down by education sector — it states the breakup "is not available in the budget documents" — and **allocates it by assumption**.*
- **higherIsBetter:** `null` — **deliberately.** A rise in this series can be a rise in anganwadi nutrition, in atomic-energy training, or in police training, none of which a reader tracking education would call an improvement. Asserting a direction here takes a side.

**Points** — ABE Table 4 broad "Total" column. Notes as in S-1.

| period | value | status | note |
|---|---|---|---|
| FY2000-01 | 4.14 | verified | Actual (inferred) · old GDP base · **Pass A records the earlier ABE edition printing 4.28 for this year — restated, D-2** |
| FY2001-02 | 3.68 | verified | Actual (inferred) · old GDP base |
| FY2002-03 | 3.66 | verified | Actual (inferred) · old GDP base |
| FY2003-04 | 3.40 | verified | Actual (inferred) · old GDP base |
| FY2004-05 | 3.26 | verified | Actual (inferred) · old GDP base · **Pass B records the 2010 ABE edition printing 3.36 for this year; Pass A records 3.26 in its edition. Both on record, D-2** |
| FY2005-06 | 3.34 | verified | Actual (inferred) · old GDP base |
| FY2006-07 | 3.48 | verified | Actual (inferred) · old GDP base |
| FY2007-08 | 3.40 | verified | Actual (inferred) · old GDP base · unchanged across editions (Pass A) |
| FY2008-09 | 3.56 | verified | Actual (inferred) · old GDP base · **earlier edition printed 3.77 as RE — the RE→Actual revision confounds the base comparison (Pass A)** |
| FY2009-10 | 3.95 | verified | Actual (inferred) · old GDP base · **earlier edition printed 3.85 as BE — BE→Actual confounds (Pass A)** |
| FY2010-11 | 4.05 | verified | Actual (inferred) · old GDP base |
| FY2011-12 | 3.82 | verified | Actual (inferred) · **2011-12 base begins** |
| FY2012-13 | 3.70 | verified | Actual (inferred) |
| FY2013-14 | 3.84 | verified | Actual (inferred) · **last full UPA year — baseline** |
| FY2014-15 | 4.07 | verified | Actual (inferred) · **confirmed independently by Standing Cttee 363rd Report** |
| FY2015-16 | 4.20 | verified | Actual (inferred) · confirmed by 363rd Report |
| FY2016-17 | 4.24 | verified | Actual (inferred) · confirmed by 363rd Report · **highest ACTUAL in the table** (D-6) |
| FY2017-18 | 3.87 | verified | Actual (inferred) · confirmed by 363rd Report |
| FY2018-19 | 3.90 | verified | Actual (inferred) · confirmed by 363rd Report |
| FY2019-20 | 4.04 | verified | **ACTUAL** · confirmed by 363rd Report · BE for this year was **4.39**, RE **4.30** (Pass B) |
| FY2020-21 | 4.36 | verified | **REVISED ESTIMATE** · confirmed by 363rd Report · **table maximum, and an artefact** (R1.6). BE was **4.64**; Actual **never published** |
| FY2021-22 | 4.12 | verified | **BUDGET ESTIMATE** · confirmed by 363rd Report · the figure quoted against the 6% target |
| FY2022-23 → FY2025-26 | `null` | pending | **No ABE published** |

**Second source (independent, T1):** Standing Committee on Education, Women, Children, Youth and Sports, **363rd Report**, Rajya Sabha, 26 March 2025, Para 2.10 — `https://sansad.in/getFile/rsnew/Committee_site/Committee_File/Press_ReleaseFile/16/198/776P_2025_3_16.pdf?source=rajyasabha`. Covers FY2014-15→FY2021-22 on the broad basis plus the broad Centre row; **every value matches.**

**caveat:** ***THIS SERIES MUST NOT BE USED FOR UPA-VERSUS-MODI COMPARISON.*** *An unexplained near-doubling of "other departments" education spending straddles FY2013-14/FY2014-15 — exactly the political transition — and is the main driver of the apparent improvement. Its cause was not established by either research pass (R6.1). Separately, this numerator includes training and the education spending of Health, WCD, Atomic Energy, Space, Railways and Defence; the Ministry of Education is 39% of it; and its gap to the narrow series widened from 0.52pp to 1.46pp over the table, so it is not the narrow series plus a constant.*

---

### S-3 · `edu-spend-gdp-wdi` — the international comparator (Pass A only)

- **title:** Government expenditure on education, total, share of GDP — UNESCO/World Bank
- **unit:** `% of GDP` · **domain:** `human-development` · **tier:** `T2` · **higherIsBetter:** `true`
- **calendar:** `FY` — **under protest, see the caveat.**
- **DENOMINATOR:** *GDP as constructed by the World Bank for WDI. **This is a third definition, distinct from both ABE columns**, and neither the World Bank nor the Ministry publishes a note reconciling them.*
- **source:** World Bank API, indicator `SE.XPD.TOTL.GD.ZS`; **retrieved 2026-08-01**; **vintage `2026-02`** (WDI publication, sourced from the UNESCO data API).
- **provenanceRefs:** `P-14`, `P-10`.

| period (as WDI labels it) | value | status |
|---|---|---|
| 2009 | 3.28 | verified |
| 2010 | 3.38 | verified |
| 2011 | 3.80 | verified |
| 2012 | 3.87 | verified |
| 2013 | 3.85 | verified |
| 2014 | 3.90 | verified |
| 2015 | 4.12 | verified |
| 2016 | 4.25 | verified |
| 2017 | 4.31 | verified |
| 2018 | 4.36 | verified |
| 2019 | 3.90 | verified |
| 2020 | 4.29 | verified |
| 2021 | 4.63 | verified |
| 2022 | 4.10 | verified |
| 2023–2025 | `null` | pending — **not published; the series is four years stale** |

**breaks:** 2007 and 2008 are **absent from the source entirely** — a hole, not a zero.

**caveat:** ***Do not place this on an axis with either ABE series.*** *Pass A applies `P-14` (WDI labels India's fiscal-year observations by the starting calendar year) on the strength of one near-coincidence — WDI 2013 = 3.85 against ABE 2013-14 broad = 3.84. **The mapping fails immediately on either side:** WDI 2014 = 3.90 against ABE 2014-15 = 4.07; WDI 2018 = 4.36 against ABE 2018-19 = 3.90; WDI 2021 = 4.63 against ABE 2021-22 = 4.12. Pass A states this plainly — "beyond that mapping the two diverge sharply and neither body publishes a note explaining why." **`P-14`'s own bridgeNote requires the WDI India labelling convention to be verified against WDI documentation before the record is relied on, and that verification has not been done.** The `calendar: FY` assignment therefore rests on an unverified provenance record plus a single-year coincidence; the alternative — treat the labels as calendar years — is equally defensible on the evidence held. **Flagged for the operator's decision; the values are unaffected either way.***

---

### S-4 · `edu-union-moe-gdp` — Union Ministry of Education actual spend, share of GDP (Pass B only)

- **unit:** `% of GDP` · **domain:** `human-development` · **calendar:** `FY` · **tier:** `T1` (source) · **higherIsBetter:** `true`
- **DENOMINATOR:** *Nominal GDP at current market prices, **2011-12 base**, from Economic Survey 2025-26 Statistical Appendix Table 1.6.*
- **NUMERATOR:** *Union Ministry of Education (DoSEL + DoHE) **Actuals**, net of recoveries, from indiabudget.gov.in Statements of Budget Estimates.*
- **source:** `https://www.indiabudget.gov.in/` (SBE, per-year demand numbers verified by Pass B) with GDP from `https://www.indiabudget.gov.in/economicsurvey/doc/Statistical-Appendix-in-English.pdf`.
- **Status note:** **the ratio is computed by Pass B, not printed by any source.** Every point is therefore `approx`, not `verified`, however solid its two inputs.

| period | value | status | note |
|---|---|---|---|
| FY2009-10 | 0.604 | approx | derived ratio |
| FY2011-12 | 0.688 | approx | **series maximum** |
| FY2013-14 | 0.635 | approx | UPA baseline |
| FY2016-17 | 0.468 | approx | |
| FY2019-20 | 0.445 | approx | |
| FY2021-22 | 0.341 | approx | |
| FY2023-24 | 0.410 | approx | **MUSK-adjusted value is 0.332 — TWO VALID FIGURES, see caveat** |
| FY2024-25 | 0.335 | approx | |
| FY2010-11, FY2012-13, FY2014-15 to FY2015-16, FY2017-18 to FY2018-19, FY2020-21, FY2022-23 | `null` | pending | **Actuals exist in Pass B's §A3 table; the ratio was not computed for these years and is NOT interpolated here** |

**caveat:** ***FY2023-24 has two valid values and the schema can hold one.*** *₹17,000 cr (DoSEL) + ₹18,500 cr (DoHE) were transferred to the **Madhyamik and Uchhatar Shiksha Kosh** against only ₹6,000 cr each drawn back — **₹23,500 cr net parked in a non-lapsable fund, not spent on programmes.** In every other year these lines net to zero. Published Actual ₹1,23,364.96 cr (0.410% of GDP) versus MUSK-adjusted ₹99,864.96 cr (0.332%). The published figure turns a 11.54% shortfall into a 9.27% "overspend". FY2024-25 carries a smaller ₹1,500 cr version. **Both must be carried; this is the same one-period-two-values problem `P-10` creates for the GDP denominator, and the schema handles neither.***

**notes:** *Pass B's headline reading: real Union education spending in FY2024-25 (₹62,946 cr, 2011-12 prices) is barely above FY2013-14 (₹62,229 cr) — **eleven years of near-zero real growth**, while the share of GDP halved from 0.688% to 0.335%. Deflator is the implied GDP deflator (2011-12 = 100), computed by Pass B from ES 2025-26 Tables 1.6 and 1.7. **No deflator exists for FY2026-27; that year is nominal-only and was not estimated.***

---

### S-5 · `edu-union-be-shortfall-pct` — Union MoE Budget Estimate versus Actuals (Pass B only)

This series exists because **it is the evidence for the estimate-status rule in S-1/S-2.** Without it, "BE" is a label; with it, "BE" is a systematic overstatement.

- **unit:** `percent of Budget Estimate` · **domain:** `human-development` · **calendar:** `FY` · **tier:** `T1` · **higherIsBetter:** `false`
- **DENOMINATOR:** *the year's own Budget Estimate for the Union Ministry of Education (DoSEL + DoHE combined, net of recoveries). Positive = Actual fell short of BE.*
- **source:** `https://www.indiabudget.gov.in/` Statements of Budget Estimates; demand numbers verified per year by Pass B (57/58 → 58/59 → 59/60 → 51/52 → 57/58 → 58/59 → 24/25 → 25/26).

| period | value | status | note |
|---|---|---|---|
| FY2009-10 | 13.70 | verified | |
| FY2010-11 | −4.01 | verified | overspend |
| FY2011-12 | 5.08 | verified | |
| FY2012-13 | 10.80 | verified | |
| FY2013-14 | 10.23 | verified | |
| FY2014-15 | 16.79 | verified | **largest percentage shortfall in the series — the UPA→T1 transition year** |
| FY2015-16 | 2.66 | verified | BE level fell 16.5%, coinciding with the 14th Finance Commission devolution restructuring |
| FY2016-17 | 0.52 | verified | |
| FY2017-18 | −0.66 | verified | overspend |
| FY2018-19 | 5.49 | verified | |
| FY2019-20 | 5.71 | verified | **RE was set exactly equal to BE for both departments, yet Actuals came in ₹5,417 cr lower — RE is not a reliable intermediate** |
| FY2020-21 | 15.20 | verified | **largest absolute shortfall, ₹15,092 cr** |
| FY2021-22 | 13.81 | verified | DoSEL spent ₹46,821 cr against an already-cut RE of ₹51,970 cr — a further 9.9% below RE |
| FY2022-23 | 6.79 | verified | |
| FY2023-24 | −9.27 | verified | **ARTEFACT — MUSK. Adjusted value is +11.54% shortfall** (see S-4 caveat) |
| FY2024-25 | 8.20 | verified | MUSK-adjusted 9.44% |
| FY2025-26 | `null` | pending | Actuals not published; BE ₹1,28,650.05 cr, RE ₹1,21,948.81 cr |
| FY2026-27 | `null` | pending | BE ₹1,39,289.48 cr only |

**notes:** *Underspending in **13 of 16 completed years**; mean 6.31%, median 6.25%; **cumulative BE-minus-Actual FY2009-10→FY2024-25 = ₹83,582 cr**, ≈₹1.07 lakh cr MUSK-adjusted. Departments indistinguishable overall (DoSEL 6.40%, DoHE 6.43% mean), though DoHE was worse in FY2020-21 (17.96% vs 13.37%).*

**caveat:** *FY2023-24 and FY2017-18 and FY2010-11 read as overspends. Only the last two are real; FY2023-24 is a transfer to a non-lapsable fund, not programme spending.*

---

### R4.6 The status rule, stated once

**Budget Estimates are systematically revised down.** Pass B establishes it on the broad ABE series:

> *"FY2019-20: **BE 4.39% → RE 4.30% → Actual 4.04%**. FY2020-21: **BE 4.64% → RE 4.36% → Actual never published.** Economic Survey 2023-24 quoted **4.64% as 'latest available'** — a Budget Estimate presented as fact."*

**That is a −0.35pp BE-to-Actual revision on the only year where all three stages exist**, and it is corroborated from a completely different direction by S-5, where the Union ministry underspent its BE in 13 of 16 years at a 6.31% mean. **Consequence for the series:** FY2021-22's **4.12% / 2.75%** are **Budget Estimates**, so the terminal points of both ABE series are the stage most likely to overstate. **The last Actual on either series is FY2019-20 — 4.04% broad, 2.73% narrow.** Every chart terminating at FY2021-22 must say so on its face.

---

## R5. THE GDP-BASE PROBLEM — the conclusion, stated once

`P-10` records that the February 2026 rebasing to a 2022-23 base affects every ratio-to-GDP in this instrument, and its own `notes` say so explicitly: *"health and education spending shares trip this as surely as fiscal."* **These are the first education series to which that rule applies, so the base handling is stated here in full and `P-10`'s `affectsSeries` must be extended to carry S-1 through S-4.**

### R5.1 Which years sit on which base

| Period | Base | Established by | Confidence |
|---|---|---|---|
| FY2011-12 → FY2021-22 | **2011-12 base, GDP at current market prices** | Pass B, cell-exact match against ES 2025-26 Statistical Appendix Table 1.6 for FY2011-12, FY2012-13, FY2013-14 and through FY2019-20; corroborated by ES 2023-24 Table VII.1 Note (i): *"The ratios to GDP at current market prices are based on 2011-12 base till 2021-22."* | **Established.** Both passes agree. |
| FY2004-05 → FY2010-11 | **An older base — NOT 2011-12.** Pass B: 2004-05 base per Pass A's edition footnote / factor cost per Pass B. | Pass B's non-matches against ES Table 1.6: FY2004-05 ABE 29,71,464 vs ES 31,86,332; FY2009-10 61,08,903 vs 63,66,407; FY2010-11 72,48,860 vs 76,34,472 | **"Not 2011-12" is established. WHICH older base is disputed (D-2), and factor-cost-versus-market-prices is unresolved (D-3).** |
| FY2000-01 → FY2003-04 | **1999-2000 base**, per the footnote in Pass A's earlier edition | Pass A only | **One pass, one footnote, one T4-graded mirror document.** |

### R5.2 The size of the distortion

Pass B recomputed the **broad** series on the 2011-12 base, holding numerators fixed and substituting denominators from ES Table 1.6:

| Year | Published | Recomputed, 2011-12 base | Overstatement |
|---|---|---|---|
| FY2000-01 | 4.14% | 3.85% | **+0.29pp** |
| FY2004-05 | 3.26% | 3.03% | **+0.23pp** |
| FY2009-10 | 3.95% | 3.79% | **+0.16pp** |
| FY2010-11 | 4.05% | 3.84% | **+0.21pp** |
| FY2011-12 → | — | *identical* | 0.00 |

**The pre-2011-12 years — all of them UPA years — are published 0.16 to 0.29 percentage points too high.** These recomputed values are **derived by Pass B, not retrieved**, and must be encoded `approx` if encoded at all.

**Pass A measured a different quantity and its numbers are not comparable to these.** Pass A's table records **edition-to-edition restatement** (FY2000-01: 4.28 in the earlier edition → 4.14 in the later one, −0.14pp), not published-versus-recomputed. Both are real; they answer different questions; neither corrects the other.

### R5.3 What happens when the 2022-23 base propagates

Both passes agree on the direction and roughly on the magnitude.

- **Pass A:** the new base *"lowered the level of nominal GDP by roughly 3–4% and will therefore mechanically raise every education-share figure by roughly **0.1 percentage point** with no change in a rupee spent or a child taught."*
- **Pass B:** *"the new base gives lower nominal GDP (2023-24: 289.84 vs 301.23; 2024-25: 318.07 vs 330.68 — about **3.8% lower**). So every ratio-to-GDP will jump **~+3.9% in relative terms** on rebasing. **A 4.12% figure becomes ≈4.28%** for no educational reason."*

**Reconciled — express it in RELATIVE terms, because the percentage-point effect depends on the level.** **[derived here]** at Pass B's +3.9% relative: 4.12% → **≈4.28%** (+0.16pp) on the broad series, 2.75% → **≈2.86%** (+0.11pp) on the narrow. **Pass A's "roughly 0.1pp" is right for the narrow series and understates the broad by half.** Pass B is better evidenced — it names the two GDP vectors on both bases — and its relative form is adopted. Pass B's derived ES-chart figures (R4/D-1) show the same arithmetic: ≈2.75%/2.74% on the 2011-12 base become ≈2.86%/2.84% on the 2022-23 base.

**Both agree the rebasing is NOT YET APPLIED and CANNOT YET BE.** Pass B is explicit: *"Neither, strictly: it was left on the 2011-12 base and cannot be recomputed. The last ABE (2024) predates the rebasing entirely. Economic Survey 2025-26 (PDFs created 28 January 2026) also predates it and its Table 1.6 is explicitly labelled '2011-12 Series'."* **The MoSPI back series has not been released** — the 27 Feb 2026 press note promises only *"Information related to release dates of Back Series"* — so annual estimates on the new base exist for **FY2022-23, FY2023-24, FY2024-25 only**, none of which any ABE covers. This matches `P-10`'s existing `bridgeExists: false` and its instrument policy of **three regimes, never one line**.

### R5.4 The consequence nobody drew — the term averages straddle the splice

**[derived here]** Pass B's UPA-2 averages (R1.3) span FY2009-10 to FY2013-14. **The first two of those five years sit on the old base and the last three on the 2011-12 base.** Substituting Pass B's own recomputed values for FY2009-10 (3.79) and FY2010-11 (3.84) gives a UPA-2 broad mean of **3.80% instead of the printed 3.87%** — the printed figure is **0.07pp too high purely from the splice**, before any question of what was spent. The T1 and T2 averages are unaffected, both being wholly post-splice.

**This makes the base problem directly comparative, not merely technical: it inflates the UPA baseline against which everything after is measured.** Note the direction — the splice flatters the UPA period, while the "other departments" doubling (R6.1) flatters the post-2014 period. They do not cancel, and neither is quantified against the other.

**The narrow series cannot be corrected this way at all.** Pass B's recomputation table is **broad-basis only**. There is no published or derived correction for the narrow series' pre-2011-12 rows in either pass — see R6.5.

---

## R6. WHAT NEITHER PASS ESTABLISHED

### R6.1 The "other departments" doubling at the UPA→T1 boundary — **NOT RESOLVED**

**A correction to the reconciliation brief: only Pass B raised this. Pass A did not.** Pass A notes that the two series diverge across the transition but offers no mechanism and does not identify the discontinuity. The finding is Pass B's alone:

> *"There is a structural break in 'other departments' straddling FY2013-14/FY2014-15. Other-departments education spend grew **+41.7%** (FY2013-14) then **+49.0%** (FY2014-15), against +11.4% and +8.4% for education departments. It roughly **doubled** between FY2012-13 (₹68,920 cr) and FY2014-15 (₹1,45,537 cr). Both years are Actuals and the values are **identical across three ABE editions**, so this is not a vintage artefact — but **I could not establish its cause from any retrieved document.** Since it sits exactly on the UPA→T1 boundary and is the main driver of the headline 'improvement', **the all-departments series should not be used for UPA-vs-Modi comparison without resolving this.**"*

**[derived here] Pass B's figures reconcile exactly against the Table 4 columns both passes carry**, so the break is real and not an extraction error: the broad-minus-narrow gap × GDP gives ₹68,614 cr for FY2012-13 (Pass B: 68,920), ₹97,732 cr for FY2013-14, and ₹1,45,875 cr for FY2014-15 (Pass B: 1,45,537) — all within rounding of the ratios' precision. **The doubling is in the published data.**

**It was NOT resolved.** No document retrieved by either pass explains it. Candidate mechanisms — a change in which ministries were counted, a reclassification of ICDS or mid-day-meal spending, a change in what "training" captured, or a genuine expansion — were **not tested by either pass**, and the ABE's ministry lists were only verified stable between the **2022 and 2024** editions, which is a decade too late to bear on it.

> **RULING, carried into `edu-spend-gdp-all-depts` as a blocking caveat:** **the all-departments series must not be used for UPA-versus-Modi comparison until this is resolved.** It is simultaneously (i) the series Parliament is briefed on, (ii) the series compared against the 6% target, and (iii) the only one of the two that shows improvement across the transition — and the improvement is driven by a doubling in non-education ministries that no retrieved document accounts for.

### R6.2 Retrieval failures common to both passes

| Target | Pass A | Pass B | Status |
|---|---|---|---|
| **Live ABE on education.gov.in** | 404; SPA returns 200 with empty shell for any path, verified with five fabricated paths | 404; `/statistics-new` renders an empty stub; **Wayback CDX confirms nothing newer was ever archived** | **Both failed.** Every ABE edition used by either pass came from an archive or a mirror. |
| **Any ABE covering FY2022-23+** | could not establish existence by retrieval | could not establish existence by retrieval | **Both failed. T3 has zero observations.** |
| **NEP 2020 document text** | `NEP_Final_English_0.pdf` — 404 | 404 live; Wayback 403/429 | **Both failed.** The 6% commitment is T1 via a PIB Lok Sabha reply only, never from the policy text. |

### R6.3 Retrieval failures Pass B hit that Pass A did not attempt

Pass A never reached these targets, so its silence is not corroboration.

| # | Target | Outcome |
|---|---|---|
| 1 | **CAG — `cag.gov.in`, `www.cag.gov.in`, `cag.nic.in`, `saiindia.gov.in`** | **Total DNS failure; Wayback 429/503.** **No CAG report retrieved from source. No Union-level CAG performance audit of SSA/Samagra Shiksha located — an unresolved gap, not a negative finding.** One archived MP state report obtained. |
| 2 | **`mospi.gov.in`** | Unreachable (TCP timeout to resolved IP). |
| 3 | **`cabsec.gov.in`** | DNS failure — **the 2020 MHRD→MoE rename gazette was NOT retrieved.** "356th Amendment Rules, 2020" stays **T4**. |
| 4 | **RBI State Finances 2025-26** | Identified (pub. 23 Jan 2026), PDF failed (SSL/socket). Per its index it reports education as % of **aggregate expenditure**, not GDP — **a fourth denominator, unretrieved.** |
| 5 | **MoSPI new-GDP press note PDF** | curl timeout; content taken from PIB PRID 2233518 instead. |
| 6 | **Standing Cttee DfG reports 2026-27** | Not located (JS-driven listings). **The ₹4,012 cr Samagra Shiksha withholding figures are as of 26 Mar 2025 and may be superseded.** |
| 7 | **CAG Report No. 20/21 of 2021 on new IITs** | Not retrieved; PRS's own citation is internally inconsistent on the report number — **do not cite without verifying.** |
| 8 | **WebSearch budget** | **Exhausted, 200/200.** All later retrieval was direct-URL, API and Wayback CDX only. |

### R6.4 Open questions one pass raised and the other did not answer

1. **Pass A's verification step is only half-discharged.** Pass A: *"query the new site's runtime API, or retrieve from an Indian IP, to confirm no 2022-24 edition exists."* Pass B's Wayback CDX check establishes that **nothing newer was ever archived** — which is weaker than establishing nothing exists. **Neither queried the runtime API; neither retrieved from an Indian IP.** Until one does, `not-published` is the right `reasonKind` but the alternative — that an edition exists and is merely unlinked, making this a link-rot finding rather than a lapse in a 25-year series — **is not excluded.**
2. **Which ABE edition is authoritative for the early years.** Pass A used *ABE 2007-08 to 2009-10* (mirror, T4); Pass B used *ABE 2006-07 to 2008-09* (2010, archive). **Neither examined the other's.** D-2 cannot close without both.
3. **Whether the pre-2011-12 denominators are factor cost or market prices.** Neither demonstrated it. D-3.
4. **The Defence line's allocation bucket.** Pass B carries Defence at ₹15,519 cr — the fourth-largest non-education item — but Defence appears in none of its three transcribed ABE §§4.2–4.4 lists. D-4.
5. **A ₹50 crore discrepancy inside Pass B's own extraction.** Pass B's ABE Statement 1 table gives Ministry of Education Centre revenue as **₹93,169 cr**, while its §A2.3 caveat states *"every other table gives ₹93,219 cr"* and shows 5,52,114 + 93,219 = 6,45,333 closing the narrow total. **[derived here]** the ₹93,219 figure is the one that reconciles to Table 4. Minor, but unexplained.
6. **Two ABE document-quality defects Pass B found and could not resolve.** (i) ABE §1.2 states the Centre's FY2021-22 revenue figure as *"Rs.9,32,189 crore"* — a digit transposition. (ii) **§2.5's FY2019-20 arithmetic does not close:** it states ₹8,22,715 cr across three accounts while its own components (7,97,174 + 10,303 + 198) sum to ₹8,07,675 cr — **a ₹15,040 cr gap.** FY2021-22 reconciles cleanly; FY2019-20 does not. Pass B flagged rather than papered over; carried forward unresolved.
7. **Kothari Commission's "6% of national income" — NOT VERIFIED** by either pass (Pass B's search budget was exhausted). It matters: national income is a smaller denominator than GDP at market prices, so **the Kothari 6% and the NEP 6% are not the same bar**, and the instrument should not treat them as one target with a 60-year history until this is checked.
8. **No ministry or PIB statement defending the Samagra Shiksha withholding was found**, despite six Rajya Sabha/Lok Sabha answers retrieved. An absence, not a finding.

### R6.5 The gap this reconciliation itself opens

**There is no base correction for the narrow series.** Pass B recomputed only the broad series' pre-2011-12 years (R5.2). The narrow series' FY2000-01→FY2010-11 rows are equally spliced and equally overstated, and **no corrected value exists in either pass.** Since the narrow series is the one whose UPA peak (3.22%, FY2010-11) is used to say the level has never been regained, **that claim rests on an uncorrected number.** The correction is computable from figures both passes already hold — Pass B carries every ABE denominator and Pass B cites ES Table 1.6 — but **computing it here would be inventing figures, so it is left open as a verification-queue item.**

---

## R7. PROPOSED PROVENANCE RECORDS AND ENCODING ACTIONS

*Code does not edit `/data` or `/schemas`. These are raised for the operator to apply at source. Highest existing provenance id is **P-58**.*

**PROPOSED `P-59` — "Education spending has two official numerators and they move in opposite directions."** The ABE publishes education-departments-only and all-departments totals side by side; the gap ran 0.52pp to 1.46pp of GDP over FY2000-01→FY2021-22 and was 1.37pp in the last published year. Across FY2013-14→FY2021-22 the broad series rises 3.84→4.12 while the narrow series falls 2.97→2.75. `directionOfBias: disputed`. `bridgeExists: false` — the two are not convertible by a constant. `affectsSeries: [edu-spend-gdp-edu-depts, edu-spend-gdp-all-depts]`. **Analogous in structure to `P-52` (the PMLA denominator dispute): neither figure is fabricated and neither corrects the other.**

**PROPOSED `P-60` — "The ABE stopped being published, and the last two points are estimates."** No edition covers FY2022-23 onward; the terminal FY2021-22 points on both series are Budget Estimates, and BE revises down ~0.35pp to Actual on the only year where all three stages exist. `reasonKind: not-published`.

**Amend `P-10`** to add `edu-spend-gdp-edu-depts`, `edu-spend-gdp-all-depts`, `edu-spend-gdp-wdi` and `edu-union-moe-gdp` to `affectsSeries`. Its `notes` already anticipate this (*"health and education spending shares trip this as surely as fiscal"*); the series ids simply did not exist yet.

**Schema gap to raise:** `series.schema.json` has no field for **estimate stage** (Actual / RE / BE) and `additionalProperties` is `false`, so Pass B's recommended `estimate_status` cannot be encoded. It is orthogonal to `status` (evidence grade). Until a field exists, stage lives in each point's `note` and must render. **A second, related gap:** two periods here have **two simultaneously valid values** — FY2023-24 published-versus-MUSK-adjusted, and every ratio-to-GDP once the 2022-23 base propagates — and `points[]` admits one value per period.

**Adopted from Pass B's encoding recommendations 1, 2, 3 and 10.** Recommendations 4–9 concern the Union budget series and Part B (literacy) and are out of scope for this file except where carried in S-4 and S-5.

---

## R8. THE SHORT VERSION

1. **Two independent extractions of ABE Table 4 agree on all 132 published cells.** The series is solid.
2. **There is no single "India spends X% of GDP on education."** It is **2.75%** or **4.12%** for FY2021-22 — a **1.37pp** gap — and the choice reverses the direction of the last decade. Parliament and the 6% target both use the higher one.
3. **The higher one is 61% non-Ministry-of-Education**, includes training, and includes Health, WCD/ICDS, Atomic Energy, Space, Railways and Defence.
4. **Both terminal points are Budget Estimates**, and BE revises down ~0.35pp. The last Actual is FY2019-20.
5. **The denominator is spliced across GDP bases inside one published column with no note**, inflating the pre-2011-12 (UPA) years by 0.16–0.29pp, and a fourth base is inbound that will raise every share ~3.9% in relative terms for no educational reason.
6. **The series stops at FY2021-22. T3 has zero observations.** The document is no longer served by the ministry that wrote it.
7. **The unexplained doubling of "other departments" spending at the FY2013-14/FY2014-15 boundary was NOT resolved.** Until it is, **the all-departments series must not be used for UPA-versus-Modi comparison.**
