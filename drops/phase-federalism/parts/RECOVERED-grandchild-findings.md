# RECOVERED — completed grandchild research whose parent parts died

**Status: preserved, not authored.** Four stage-2 grandchild agents COMPLETED and returned rich
primary-source findings; their parent parts (05, 06) and one addendum (04) died on the session
limit before incorporating them. This material existed only in the orchestrator's context and is
written here so it is not paid for twice. **It has not been through a part's own synthesis** — treat
it as raw retrieved evidence, not as a finished part.

All four grandchildren recorded **claude-opus-5**.

**Environment finding that applies to every part (M1, mode 1):** the system resolver is broken in
this environment. `dig +short @1.1.1.1` + `curl --resolve host:443:<ip>` worked throughout.
**Playwright and WebFetch both inherit the broken system resolver** (`ERR_NAME_NOT_RESOLVED` /
`getaddrinfo ENOTFOUND`), so **M1 mode 3 (different client) is effectively unavailable here** —
this is a material limit on what "unreachable" can mean in this run and must be stated on any
absence record resting on it. `WebSearch` resolves server-side and was used only to locate
documents, never as a source.

---

## A. For part 06 (Tamil Nadu) — CAG State Finances Audit Reports

Retrieval: `dig +short @1.1.1.1 cag.gov.in` → `164.100.59.171`; all fetches via
`curl -sL --resolve cag.gov.in:443:164.100.59.171`. **`cag.gov.in` is fully live.** No fallback
needed. Six consecutive editions retrieved, **FY2018-19 → FY2023-24. FY2024-25 for Tamil Nadu does
not exist** (a `title=2024-25` sweep across 3 pages / 30 reports returned zero TN entries).

**Portal navigation finding:** `cag.gov.in/en/audit-report` returns 200 but its own documented facet
filters **do not work over GET**; `cag.gov.in/en/search?keywords=` returns **HTTP 500**. The reliable
route to a state's corpus is the AG mirror `https://cag.gov.in/ag2/tamil-nadu/en/audit-report?page=N`.

**Negative result with positive control (M3):** searched all ten files for `e-Lekha`, `CPSMS`,
`Central Plan Scheme Monitoring` → **zero hits**. Positive control `PFMS` → hits in 2019-20 (1),
2020-21 (1), 2021-22 (2), 2022-23 (3), 2023-24 (3). **Conclusion: TN SFARs reconcile against
PFMS/CGA, never against e-Lekha or CPSMS by name.**

### The five independent checks on Union transfers — this is the disciplining-measure answer for TN

**1. Direct GoI → State Implementing Agency transfers, outside the State budget entirely.**
FY2023-24 Report No. 2 of 2025, Ch. IV para 4.3, pp.114-116, verbatim:
> "The Government of India (GoI) transfers substantial funds directly to the State Implementing
> Agencies (SIAs)… **These funds are not routed through the State Budget/State Treasury System.**
> During the year 2023-24, GoI transferred ₹30,085.53 crore directly to SIAs…"

and, p.116:
> "…the Annual Finance Accounts did not capture the flow of the funds or related expenditure.
> **Hence, the State's receipt and expenditure as well as other fiscal variables/parameters derived
> from them did not present the true and fair picture to that extent.**"

Series (₹ crore, Exhibit 4.1 + back-years from the 2019-20 and 2022-23 editions):
FY2015-16 **3,914.73** · FY2016-17 **5,694.39** · FY2017-18 **11,643.64** · FY2018-19 **11,751.30** ·
FY2019-20 **15,113.00** · FY2020-21 **18,226.43** · FY2021-22 **23,156.22** · FY2022-23 **27,816.54** ·
FY2023-24 **30,085.53**.

Largest FY2023-24 lines (Table 4.2): MGNREGS → State Employment Guarantee Fund **₹10,254.44 cr**;
NFSA decentralised procurement → TN Civil Supplies Corp **₹7,072.53 cr**; Jal Jeevan → TN State Water
and Sanitation Mission **₹2,617.10 cr**; PM-KISAN **₹1,441.32 cr**; PMJAY **₹691.28 cr**.

**The CAG holding the Union to its own policy** — FY2019-20 para 4.14, repeated FY2020-21 para 4.4:
> "as per GoI decision (08 July 2015), all assistance to Centrally Sponsored Schemes (CSS)… would be
> released to the State Government and not directly to the Implementing Agencies… **However, in Tamil
> Nadu, the funds under Mahatma Gandhi National Rural Employment Guarantee Programme… was released
> directly to SIAs without routing it through the State budget since 2015-16.**"

**2. Finance Commission projection minus actual devolution — a printed subtraction column.**
FY2023-24 Table 2.7, col. 5 headed literally `5 (4-3)`. Source: "Details furnished by the Finance
Department". ₹ crore, projection / actual / difference:

FY2015-16 23,389 / 20,354 / **(-)3,035** · FY2016-17 26,992 / 24,538 / **(-)2,454** ·
FY2017-18 31,189 / 27,100 / **(-)4,089** · FY2018-19 36,084 / 30,639 / **(-)5,445** ·
FY2019-20 41,796 / 26,393 / **(-)15,403** · **FY2015-20 total 1,59,450 / 1,29,024 / (-)30,426** ·
FY2020-21 35,823 / 24,925 / **(-)10,898** · FY2021-22 26,864 / 37,459 / **+10,595** ·
FY2022-23 29,884 / 38,731 / **+8,847** · FY2023-24 33,627 / 46,072 / **+12,445**.

XIV FC basis 4.023% of net proceeds ex-service-tax + 4.104% service tax; XV FC 4.189% (FY2020-21)
then 4.079%. **₹30,426 crore cumulative shortfall against XIV FC projections; a surplus against XV FC.**

**3. FC grant recommended → released → passed on (three-way).** FY2023-24 Table 2.10: grand total
recommended ₹6,200.18 cr vs released ₹5,827.57 cr — **shortfall ₹372.61 cr**, of which **State
Disaster Mitigation Fund ₹225.00 cr released NIL** and Ambient Air Quality ₹129.00 cr → ₹12 cr.
FY2022-23: recommended ₹5,192.00 / released ₹5,084.90, shortfall ₹107.10 cr, all SDMF.
**FY2019-20 Table 2.14 (XIV FC, 2015-20) is the sharpest:** PRI General Performance Grants
**₹877.74 cr recommended, ₹172.12 cr released**; ULB General Performance Grants **₹1,646.47 cr
recommended, ₹322.87 cr released**. **₹2,029.22 crore of XIV FC performance grants never came.**

**4. PFMS Single Nodal Account: received ≠ transferred on.** FY2022-23 p.26: PFMS says the State
received **₹14,137.90 cr** central share; the State transferred **₹13,629.21 cr** — and
> "**The details of the vouchers with respect to expenditure are not available in the AG (A&E) office.**"
Unspent in SNA accounts at 31 Mar 2023: **₹11,453.81 cr**; at 31 Mar 2024: **₹10,083.87 cr**.
FY2023-24: received ₹13,133.76 cr, transferred ₹13,487.29 cr. Delays in GoI release to SNA of
**1 to 106 days** across seven shared schemes (Appendix 2.2).

**5. The CAG recomputes GST protected revenue from the statutory base year.** FY2018-19 Table 1.8:
base year FY2015-16 subsumed-tax revenue **₹29,786.36 cr**; projected FY2018-19 = 29,786.36 × 1.14³ =
**₹44,129.80 cr**; actual incl. compensation ₹41,684.09 cr → **shortfall ₹2,445.71 cr** (growth 7.68%
against the protected 14%). Jul 2017–Mar 2018 shortfall **₹455.16 cr**.

**And the certification caveat — the Union would not give its own auditor the data:**
> "The required access to data is yet to be provided. **Not having access to the data pertaining to
> all GST transactions has come in the way of comprehensively auditing the GST Receipts.** The
> accounts for the year 2018-19 are, therefore, certified on the basis of test audit… as a one-time
> exception."

**GST compensation received by TN** (FY2023-24 Table 2.19(a), ₹ cr): FY2018-19 3,151.00 ·
FY2019-20 8,922.03 · FY2020-21 10,602.83 · FY2021-22 7,235.80 · FY2022-23 16,214.83 ·
FY2023-24 4,574.20 (arrears) — **total ₹50,700.69 cr**. The 5th State Finance Commission's accepted
10% share to local bodies — **₹5,070.06 cr — was never transferred**; "The Department admitted the
same during Exit conference."

**Back-to-back loan treatment.** FY2020-21 ₹6,241 cr; FY2021-22 ₹8,095.25 cr; **cumulative ₹14,336 cr**.
Booked under **Major Head 6004 – Public Debt** but excluded from every debt indicator by GoI decision:
> "the Department of Expenditure, GoI had decided that GST compensation of ₹8,095.25 crore given to
> State as back-to-back loan under debt receipts would not be treated as debt of the State for any
> norms which may be prescribed by the Finance Commission."

**Persistent deficit understatement — the CAG restates TN's own numbers every year.**
FY2018-19: RD ₹23,459.44 → understated by **₹3,757.23 cr**; FD ₹47,335 → understated by ₹1,300.49 cr.
FY2020-21 carries a chart titled **"Chart 1.6 – Persistent understatement of Revenue and Fiscal
Deficits"** running FY2016-17→FY2020-21 — the CAG asserting a pattern, not an incident.
FY2022-23 FD ₹81,886 → ₹82,188. FY2023-24 FD ₹90,430 → **₹90,631.27**.

**Off-budget borrowing — and a definitional break that must not be spliced.** FY2021-22 report,
Table 2.32: total OBB **₹27,669.88 cr**, of which **TANGEDCO ₹26,427.92 cr**; debt/GSDP 28.87% →
**30.21%** if included, against an MTFP target of 28.70%. **The FY2023-24 report restates the same
FY2021-22 year as ₹1,241.96 crore** — the TANGEDCO line was dropped from the OBB definition between
editions. **Do not build a time series across the two.**

**GSDP source string changes across editions** (FY2018-19 "Central Statistics Office" → FY2019-20/
FY2020-21/FY2021-22 "Department of Economics and Statistics, Central Statistics Office" → FY2022-23/
FY2023-24 "Ministry of Statistics and Programme Implementation"), **and the values are restated**:
FY2020-21 growth is 3.73% in the FY2021-22 edition and 2.58% in the FY2022-23 and FY2023-24 editions;
FY2021-22 growth appears as 14.22 / 15.84 / 15.91 across three editions. **Do not splice.**

**TN revenue receipts, FY2019-20 → FY2023-24 (₹ crore, FY2023-24 edition Table 2.4 / Appendix 2.1):**
RR 1,74,526 / 1,74,076 / 2,07,492 / 2,43,749 / **2,64,597**; Own Tax 1,07,462 / 1,06,153 / 1,22,866 /
1,50,223 / **1,67,279**; Own Non-Tax 12,888 / 10,422 / 12,117 / 17,061 / **25,904**; **Share of Union
taxes 26,393 / 24,924 / 37,458 / 38,731 / 46,072**; **Grants-in-aid from GoI 27,783 / 32,577 / 35,051 /
37,734 / 25,342**. Deficits: RD 35,909 / 62,326 / 46,538 / 36,215 / **45,121**; FD 60,179 / 93,983 /
81,835 / 81,886 / **90,430**; FD/GSDP 3.45 / 5.26 / 3.95 / 3.42 / **3.32**. Outstanding fiscal
liabilities 4,23,743 / 5,18,796 / 6,10,667 / 6,91,591 / **7,72,423**; liabilities/GSDP 24.35 / 28.70 /
28.83 / 28.39 / **28.00**. Guarantees 47,319 / 65,659 / 91,975 / 90,709 / **1,22,270**.

**Grants-in-aid fell 32.84% in FY2023-24** — the CAG's own gloss: "mainly due to discontinuation of
GST compensation to the States from July 2023 and **non-receipt of Central share of ₹225 crore for
the State Disaster Mitigation Fund**".

---

## B. For part 03 (cesses/surcharges) — AIDC rates and the parliamentary record

### The AIDC offsetting table, established from four independent primary documents

Finance Bill 2021, **Seventh Schedule [See section 116(1)]**: petrol **Rs 2.50/litre**, high speed
diesel **Rs 4.00/litre**. Effective **2 February 2021** under the Provisional Collection of Taxes
Act 1931. Clauses 115 and 116 both open verbatim: *"There shall be levied and collected… **for the
purposes of the Union**"* — the Article 270(1)-proviso formula that puts a levy outside the pool.

Per litre, before → after (TRU D.O. letter Annexure C part II; Memorandum §V; notifications
01/2021-CE and 02/2021-CE; "before" from PPAC/MoPNG table posted 6 June 2020):

| | BED before → after | SAED before → after | RIC | AIDC | Total before → after |
|---|---|---|---|---|---|
| Petrol unbranded | 2.98 → **1.40** | 12 → **11** | 18 | +2.50 | 32.98 → **32.90** |
| Petrol branded | 4.16 → **2.60** | 12 → **11** | 18 | +2.50 | 34.16 → **34.10** |
| Diesel unbranded | 4.83 → **1.80** | 9 → **8** | 18 | +4.00 | 31.83 → **31.80** |
| Diesel branded | 7.19 → **4.20** | 9 → **8** | 18 | +4.00 | 34.19 → **34.10** |

**One correction to the phase's framing: SAED is itself a surcharge, not a shareable head.** The
Union says so in its own document — Receipt Budget 2026-27 note **6.05**, verbatim: *"Special
Additional Excise Duties (SAED) is leviable by the Finance Act, 2002… **This is commonly known as
surcharge.**"* So the movement out of the divisible pool is exactly the BED cut:

**Petrol −1.58/litre and diesel −3.03/litre left the divisible pool, at a pump-price change of
minus 8 paise and minus 3 paise.** All four rows reconcile exactly.

**Revenue-neutrality in the Union's own words, four formulations** — Speech para 188 ("not to put
additional burden on consumers on most items"); Annexure Part B para 5 ("**so that overall consumer
does not bear any additional burden**"); Memorandum §V; TRU D.O. ("calibrated so that there would be
no additional burden on the consumer").

**Effect on States' share: NOT ADDRESSED ANYWHERE.** "Divisible pool", "devolution", "States' share"
and "shareable" appear **zero times** in the Budget Speech Part B and its Annexures, the Memorandum's
AIDC sections, and the TRU D.O. letter. **The silence is itself the finding.**

### The 2018 precedent — the same mechanism, three years earlier, fully offset

Finance Act 2018 (Act 13 of 2018) **ss.111 and 112**, Sixth Schedule: Road and Infrastructure Cess
**Rs 8/litre**. Budget Speech 2018-19 **Annexure 6 item 4.I**, verbatim table: RIC nil → Rs 8;
Additional Duty of Excise [Road Cess] Rs 6 → nil; BED unbranded petrol 6.48 → **4.48**, branded petrol
7.66 → **5.66**, unbranded diesel 8.33 → **6.33**, branded diesel 10.69 → **8.69**. **Net change to
the consumer: zero. Exactly Rs 2 per litre migrated from BED (shareable) to the cess side.**

**Health and Education Cess 4% — NO offsetting cut.** Finance Act 2018 s.2(13). Speech para 156:
*"I propose to increase the cess by one per cent"*, yield *"an estimated additional amount of
₹11,000 crores"*. A clean +1 point.

**Social Welfare Surcharge — NOT offset; 3% → 10% on an identical base.** Finance Act 2018 s.110.
Carve-outs at 3%: petrol/diesel, silver, gold. Notification 12/2021-Customs later rescinded
12/2018-Customs "to keep only one SWS rate of 10% for all goods".

**Health Security se National Security Cess Act, 2025 (Act No. 35 of 2025)** — assent 15 Dec 2025,
in force 1 Feb 2026 vide S.O. 6153(E) of 31 Dec 2025. **Capacity-based monthly levy on machines**,
not ad valorem: Schedule II Table 1, Rs lakh/month/machine, up to 500 pouches/min — 101 (≤2.5 g),
364 (>2.5 g <10 g), 849 (>10 g), scaling to 303/1092/2547 at 1001-1500; wholly manual Rs 11 lakh/month.
s.6 lets the Centre **double these by notification**. **s.7(2): proceeds "shall first be credited to
the Consolidated Fund of India" — no reserve fund at all**, unlike RIC or AIDC.
**Does it replace the GST Compensation Cess? The Act is silent** — "compensation" appears zero times,
and there is no repeal or savings provision. Succession is visible only in the accounts (head 8.03
GST Compensation Cess FY2024-25 actual ₹1,50,569.84 cr → RE ₹88,000 cr → **BE2026-27 blank**; head
9.03 new cess nil / nil / RE ₹2,330 cr / **BE ₹14,000 cr**). **Do not assert the replacement as a
documented fact.**

### The parliamentary record — sansad.in is fully open, no CAPTCHA, no JS wall

Endpoints: `https://sansad.in/api_ls/question/qetFilteredQuestionsAns?...&keyWord=` (LS, matches on
**question subject only**) and `https://rsdoc.nic.in/Question/Search_Questions?whereclause=<raw SQL>`
(RS, 164.100.192.59). **`loksabhaph.nic.in`, `eparlib.nic.in`, `pqars.nic.in` do not resolve on any
resolver.**

**The Government's own statement that cesses sit outside the pool** — RS Starred Q. *18, answered
21.07.2026, Minister of Finance, verbatim:
> "This Article exempts cesses and surcharges from distribution between the Union and the States and
> hence do not form part of the divisible pool."

Same reply: the 16th FC "recommended retaining the States' share in the divisible pool at its current
level, and the Government has **no proposal to amend** the existing Constitutional provisions".
Corroborated in LS U.1637 (13.02.2023), LS U.583 (06.02.2023), RS U.564 (07.02.2023), LS U.3595
(20.12.2021), LS U.1709 (31.07.2023 — asked whether cess will become part of the divisible pool:
**"No, Sir;"**), LS S.251 (21.03.2022), RS S.*173 (19.12.2023), RS U.385 (03.02.2026).

**RS Starred *18, 21.07.2026, Annexure-A — the definitive series** (₹ crore, FY2022-23 / FY2023-24 /
FY2024-25 / RE2025-26 / BE2026-27):
AIDC 74,142.03 / 80,923.60 / 75,455.06 / 81,580 / 85,440 · Crude oil cess 21,497.14 / 18,803.41 /
17,931.29 / 15,810 / 16,210 · **GST Compensation Cess 125,862.41 / 141,436.16 / 150,569.84 / 88,000 /
0.00** · Health & Education Cess 61,809.29 / 71,156.96 / 84,337.16 / 90,000 / 100,000 · NCCD 7,168.30 /
7,812.25 / 8,341.22 / 10,140 / 10,910 · Road & Infrastructure Cess 59,234.95 / 44,552.49 / 44,679.82 /
45,780 / 46,930 · Health Security cess 0 / 0 / 0 / 2,330 / 14,000.
**Total cesses 350,487.53 / 364,687.64 / 381,323.36 / 333,650 / 273,500 — as % of GTR 11.5 / 10.5 /
10.0 / 8.2 / 6.2.**
Surcharges: corporation tax 55,103.79 / 60,373.34 / 72,118.36 / 81,000 / 90,000 · income tax
53,914.24 / 54,793.80 / 66,778.28 / 71,000 / 79,000 · SWS 16,178.79 / 16,273.41 / 17,477.86 / 18,040 /
18,130 · **SAED 147,163.79 / 146,619.61 / 142,880.01 / 165,930 / 169,720**.
**Total surcharges 272,360.61 / 278,060.16 / 299,254.51 / 335,970 / 356,850 — as % of GTR 8.9 / 8.0 /
7.9 / 8.2 / 8.1.**

LS U.137 (20.07.2026) gives cess+surcharge as % of GTR: **FY2014-15 9.6% → FY2019-20 17.5% →
FY2024-25 17.9% → FY2025-26 16.4%.** LS U.2013 (19.12.2022) carries the Government's own figure that
cess+surcharge rose from **8.16% of GTR in FY2011-12 to 28.08% in FY2021-22** — a different
convention again, and a fourth data point for the definitional-spread finding.

**Cess proceeds not credited to the designated funds — and one item indicts the AIDC directly.**
RS U.385, 03.02.2026, Annexure B item 4, **Agriculture Infrastructure & Development Fund** (₹ crore,
collection / transfer / balance): FY2021-22 76,950.68 / **nil** / 76,950.68 · FY2022-23 74,142.03 /
**nil** / 74,142.03 · FY2023-24 80,923.60 / 120,714.39 / −39,790.79 · FY2024-25 RE 75,180.00 /
138,822.37 / −63,642.37. **In the first two full years of the AIDC, not one rupee was transferred to
the fund the cess was created to finance.**

RS U.1324 (01.08.2023) — asked whether the CAG observed cess retained in the CFI instead of credited
to dedicated funds: **"Yes, Sir;"**, naming CAG Report 20 of 2018 para 4.3.2; Report 6 of 2021 para
2.5.3; Report 7 of 2021 para 1.9.1.1; Report 31 of 2022 para 2.5.1.
**Contested item worth a provenance record:** RS U.240 (21.07.2026) — on the CAG's finding that
₹50,072 crore of H&E Cess in FY2022-23 was not transferred, the Government **denies it**: *"During
2022-23, there was no shortfall in transfer of Health and Education Cess collections to the
designated Reserve Fund(s)."* **Pair with the CAG report itself.**

**Two citation corrections to carry forward:** the Budget 2018-19 memorandum path is
`ub2018-19/memo/memo.pdf` (not `mem/mem1.pdf`); and **Finance Act 2018 section numbers are +2 from
the Bill clause numbers** — cite ss.110 (SWS), 111 and 112 (RIC), not clauses 108/109/110.

---

## C. For part 04 (CSS) — MGNREGA s.27, and a threshold finding that reframes the item

### ⚠️ MGNREGA IS REPEALED

The Mahatma Gandhi National Rural Employment Guarantee Act 2005 stands **repealed with effect from
1 July 2026** by the **Viksit Bharat—Guarantee for Rozgar and Ajeevika Mission (Gramin): VB—G RAM G
Act, 2025 (Act No. 36 of 2025)**, enacted **20 December 2025**, commencement notified by
**S.O. 2382(E) dated 11 May 2026**. **A statute passed by Parliament, not an executive decision**, and
it predates Budget 2026-27. India Code now carries MGNREGA only in its *Repealed Acts* register.
Trail: PIB PRID 2204496 (introduced 16 Dec 2025), PRID 2207187 (assent 21 Dec 2025), Press Note
158510 (11 May 2026, commencement + repeal).

**s.27 MGNREGA 2005, verbatim** (from India Code handle 123456789/4649, `a2005-42.pdf`, full text
layer — note the repealed-register PDF `A200542.pdf` is **image-only with no text layer**):
> "(2) …the Central Government may, on receipt of any complaint regarding the issue or improper
> utilisation of funds granted under this Act in respect of any Scheme if prima facie satisfied that
> there is a case, cause an investigation into the complaint made by any agency designated by it and
> if necessary, **order stoppage of release of funds to the Scheme**…"

**The drafting matters: the power runs to "the Scheme", not to the State. No notice, no hearing, no
time limit, no ceiling, no appeal. "Prima facie satisfied" is the only threshold.**

**s.22(1)(a) MGNREGA: unskilled wage was 100% Central, unqualified, with no State share at all.**
**VB-G RAM G s.22 changes this**: unskilled wage now appears in **both** s.22(6)(a) (Centre) and
s.22(7)(a) (State) and is subsumed into **60:40** (90:10 for NE/Himalayan/J&K). Further: s.22(4)-(5)
converts a demand-driven entitlement into a **capped normative allocation with all overrun on the
State**. And s.5 guarantees **125 days** — but **s.6 imposes a statutory 60-day blackout** ("no work
shall be commenced or executed… during such peak seasons"), so 125 days must be delivered inside 305.
**s.29 carries the fund-stopping power over near-verbatim** — the only textual differences from s.27(2)
are "any issue" for "the issue" and a comma.

### West Bengal — the Union's own account, four Lok Sabha answers

**Date: 9 March 2022** (liability frozen as at 08.03.2022). **Provision: s.27.** **Stated ground:**
LS U.403, 22.07.2025, verbatim:
> "…based on central teams' inspection reports highlighting the implementation issues such as
> financial misappropriation, execution of non-permissible activities, splitting of works, lack of
> transparency & accountability… **release of funds to the State of West Bengal has been stopped
> since March 9, 2022, under Section 27 of the Act due to non compliance with Central Government
> directives.**"

**The antecedent step, stated only in LS S.39, 02.12.2025:** *"The proposal for upward revision of the
Labour Budget for FY 2021-22 for the State of West Bengal was not approved by the Empowered
Committee…"* — the stoppage followed a refused labour-budget revision.

**Quantum — LS U.525, 03.02.2026:** *"the total pending liability pertaining to the State of West
Bengal (as on 08.03.2022) stands at **₹3082.52 crore**, comprising **₹1457.22 crore under the wage
component**, ₹1607.68 crore material, and ₹17.62 crore administrative. **The admissibility of this
liability is subject to verification by the Central Government.**"*

**Restoration came from the court, not the Ministry:** Calcutta High Court order **18.06.2025** →
departmental orders **06.12.2025** → resumption **w.e.f. 01.06.2026**. Interim FY2026-27 allocation
**₹8,508 cr**, first instalment **₹1,264.50 cr**, Mother Sanction June 2026 **₹346.58 cr**
(LS U.1542 and U.1505, 28.07.2026). **The ₹3,082.52 crore of pre-2022 arrears is not mentioned as
paid in either answer.**

**s.27 is SINGULAR — used once, against one State, for 51 months.** Direct primary proof, LS U.2608,
19.12.2023, verbatim: *"**No direction have been issued under section 27… to the State of Tamil
Nadu.**"* Sweep scope: **18th LS Rural Development 884/884 questions enumerated; 17th LS 1,643/1,643;
18th LS Education 1,521/1,529; 18th LS Finance 1,191/1,195.** Positive controls named and returning.
In the release annexures West Bengal is the only row reading 0.00 in every year, and the s.27 footnote
attaches to that row and no other.

**The Samagra Shiksha analogue is contractual, not statutory** — LS U.3732, 16.03.2026, verbatim:
*"States and UTs are required to sign a Memorandum of Understanding (MoU)… **However, West Bengal has
not signed the PM SHRI MoU.**"* An MoU condition, not a statute. **This is the distinction the phase
needs: one instrument is a statutory stoppage power, the other is a contractual precondition.**

**⚠️ Citation that does NOT check out — do not carry it into the instrument:** the widely-cited
"LS Question No. 2989 of 10 March 2025" does not exist as described; question 2989 in the Rural
Development corpus is dated 10.03.2026 and is titled "Assessment of Infrastructure of Rural Areas".
Use Q.403/22.07.2025 and Q.2867/18.03.2025 instead.

### No official statement of CSS funds withheld by State and year exists

LS U.142 (Dept of Expenditure), 01.12.2025, was asked for funds released **and pending** by State.
The reply gives **releases only**; the "pending" half is simply not answered and **no withheld column
exists**. CSS releases to West Bengal (₹ crore): FY2020-21 27,406.79 · FY2021-22 18,545.33 ·
FY2022-23 13,137.87 · FY2023-24 11,386.61 · FY2024-25 9,081.21 — **a 67% fall across the period**.
LS U.2685, 09.03.2026, put Tamil Nadu's charge that funds were "withheld, reduced or unilaterally
deducted" — the reply neither confirms nor denies, and answers with what was released.
**Positive control confirmed the Finance corpus answers on adjacent subjects.**

### PFMS, DBT Bharat, DEA and RBI — where the state dimension lives and does not

**PFMS itself: UNRETRIEVED and unverified.** `pfms.nic.in` resolves (164.100.128.140, confirmed
identical from 1.1.1.1, 9.9.9.9 and 208.67.222.222) but **accepts no TCP connection on 443 or 80**;
raw `nc -z` times out. All three M1 modes tried. **Positive control proving it is not a blanket
`.nic.in` block: `https://cga.nic.in/` → HTTP 200, and `cga.nic.in/Page/About-PFMS.aspx` → HTTP 200,
and CGA links out to exactly the PFMS URL that times out.** **No claim about what PFMS does or does
not publish may rest on this run.**

**But the state dimension demonstrably exists inside PFMS**: the DoE OM of 23.03.2021 para 9 makes
release conditional on balances "**as per PFMS**", and the Lok Sabha annexure below cites its own
source as "**PAB Minutes / PFMS / PRABANDH Portal**".

**The one Union-side state×scheme×year disclosure that could be retrieved is a parliamentary answer.**
LS U.5783, 30.03.2026, Ministry of Education — Samagra Shiksha central allocation / released, ₹ lakh:
Bihar FY2023-24 502,132.66 / 424,173.08 · FY2024-25 499,123.47 / 421,781.44 · FY2025-26 589,656.73 /
553,372.53. **Kerala FY2024-25 42,889.42 / 0.00.** **Tamil Nadu FY2024-25 215,315.01 / 0.00.**
**West Bengal FY2023-24 176,747.91 / 31,129.41 · FY2024-25 174,579.86 / 0.00 · FY2025-26 199,839.46 /
0.00.** All-India FY2025-26 4,701,725.80 / 2,999,682.58.
**Disclosure is on demand, not by publication.**

**DEA's *Indian Public Finance Statistics* — the one publication naming "Transfer of Resources from
the Centre to the States" as a table — carries it as an ALL-INDIA time series only (Table 6.4, no
state rows), and the series STOPPED after the FY2017-18 edition, published July 2019.** The live DEA
list page is empty; the archive tops out at 2016-17. Positive controls on both DoE and DEA search
returned live hits on adjacent terms, so the engines work and the documents are not there.

**RBI *State Finances: A Study of Budgets 2025-26* (23 Jan 2026)** — Statement 17 gives per-state
gross/net central transfers (WB FY2024-25 RE gross ₹1,39,551.2 cr / net ₹1,37,697.6 cr; Bihar
1,95,737.7 / 1,93,389.9; TN 83,755.0 / 79,368.6; Kerala 36,996.9 / 35,523.4; all States 21,76,247.8 /
21,32,089.5). Appendix I gives the per-state **tied/untied split**. **Appendix Table 2 has the full
decomposition but is all-States aggregate only.**
**And the source, verbatim from RBI's own Explanatory Note — this settles the disciplining-measure
question for RBI:**
> "This Report is based on the receipts and expenditure data presented in the **budget documents of
> 31 State governments** and union territories (UTs) with legislature… supplemented with… Finance
> Accounts of the States published by [the] CAG… The analysis conforms to the data presented in State
> budgets and the accounting classification thereof."

**So RBI *State Finances* is the STATES' own numbers restated on a common basis. It is a common
BASIS, not independent EVIDENCE, and it cannot audit what the Union actually released.** Statement 17
footer: "Source: Budget documents of the State governments."
**`rbidocs.rbi.org.in` is unreachable from here (TLS handshake stalls on both IPs); the HTML mirrors
on `www.rbi.org.in/Scripts/PublicationsView.aspx?id=` carry the identical published tables and were
used instead — RBI's own site, not a third-party reproduction.**

**DoE fund-release OMs retrieved** (the structural withholding mechanism): base OM
F.No. 1(13)/PFMS/FCD/2020 of **23.03.2021** (SNA model, effective 1 Jul 2021, supersedes all earlier
guidelines) — para 12 caps the opening release at 25% and conditions further tranches on transfer of
the State share **and** 75% utilisation; para 16 requires the State to move central share to the SNA
within **21 days** and forbids diversion to a Personal Deposit account. Amended 16.02.2023 (single
30-day window plus **7% p.a. penal interest on delay**), 15.04.2024 (**PFMS validation check blocking
release when the SNA balance exceeds 12.5%**), 29.10.2024, 07.04.2025 (SNA SPARSH, Mother Sanction,
unutilised FY2024-25 sanction **lapsed 31 Mar 2025**), 06.06.2025 (TSA/Hybrid TSA from 01.08.2025).
**There is no clause reading "the Union may withhold" — the withholding power is structural: a
tranche simply does not move unless PFMS validates the conditions.**

---

## Where this material must land

| Recovered block | Belongs to | Action on resume |
|---|---|---|
| A — CAG TN SFARs | **part 06** | 06 does not exist; this is a large fraction of its evidence base |
| B — AIDC + parliamentary cess record | **part 03** (complete) | 03 reports it retrieved AIDC itself but its third grandchild was still running at close — **reconcile B against 03's existing text and append what is new** |
| C — MGNREGA s.27 / VB-G RAM G / PFMS / RBI | **part 04** (complete but `## Addendum` may be truncated) | check 04's addendum and append what is missing |

**None of this has been through a part's synthesis. It is retrieved evidence, not findings.**
