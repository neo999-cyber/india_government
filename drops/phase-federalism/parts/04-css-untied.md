# Phase 13 (federalism) — stage 2 part 04

# Centrally sponsored schemes and the share of untied transfers

**Model of record for this part: `claude-opus-5`** (the model this transcript records; the system
prompt for this session states "You are powered by the model named Opus 5. The exact model ID is
claude-opus-5"). Four subagents were spawned, every one instructed to run on opus and to report the
model its own transcript records; each one's reported model is stated where its material is used in
§Sources retrieved, and any material whose model of record could not be confirmed is marked there.

**Retrieval posture.** The spine of this part is the **Union Budget itself**, retrieved directly
from `www.indiabudget.gov.in` for **every budget from 2013-14 to 2026-27**, as PDFs, then read with
`pdftotext -layout`. Specifically: the *Budget at a Glance* transfer-of-resources table for each of
those years (which is where the year-by-year Actuals live, each year's Actuals column appearing in
the budget presented two years later), the *Expenditure Budget Vol. I / Expenditure Profile*
Statements 4A, 4AA, 18 and the Introductory Notes, the *Receipts Budget* Annexes 1 and 4B, and the
Statements of Budget Estimates for Demands 25, 63 and 87. Alongside it: the **Fourteenth Finance
Commission report**, the **Fifteenth Finance Commission Volume I**, the **Report of the Sub-Group of
Chief Ministers on Rationalisation of Centrally Sponsored Schemes (October 2015)** from
`niti.gov.in`, and three **CAG** reports from `cag.gov.in`. Every number below that carries a source
is a number I read at the line I cite.

**M1 status — one host required escalation and it is a trap later parts will hit.**
`www.indiabudget.gov.in` **returns HTTP 404 to a bare `curl` for its own document URLs and HTTP 200
to the identical request carrying a `Referer` header.** `GET https://www.indiabudget.gov.in/doc/eb/stat18.pdf`
with `-A "Mozilla/5.0 …"` alone → `HTTP/2 404`, `content-length: 1245`, `edge-cache-tag:
ub-doc-folder,ub-pdf-ext`. The same URL with `-e "https://www.indiabudget.gov.in/"` added →
`HTTP/2 200`, `content-type: application/pdf`, 697,496 bytes. **A sweep that treated the 404 as a
fact would have concluded the Union Budget does not publish the Statement of Transfer of Resources
to States.** This is exactly the M1 client-mode failure and it does not announce itself: the 404 body
is a well-formed HTML error page with normal security headers. `dig @1.1.1.1 www.indiabudget.gov.in`
resolves (164.100.85.252) and the resolver was never the problem. Every other host in scope —
`sansad.in` (164.100.252.170), `niti.gov.in` (45.127.74.51), `nrega.nic.in` (164.100.192.125),
`rural.gov.in` (164.100.11.195), `education.gov.in` (164.100.11.218), `cag.gov.in`
(164.100.59.171), `pfms.nic.in` (164.100.128.140), `dbtbharat.gov.in` (103.207.128.39),
`jaljeevanmission.gov.in` (164.100.213.63), `fincomindia.nic.in` (Akamai CNAME), `rbi.org.in` —
resolved on 1.1.1.1 and answered plain `curl` with a desktop User-Agent. Carrying part 01's finding
forward: `indiabudget.gov.in` **without** the `www.` prefix fails TLS and must be fetched with it.

**A second M1-class trap, in the archive rather than the network.** The Union Budget archive keeps
three different URL shapes for three eras — `/budgetYYYY-YYYY/ubYY-YY/bag/bagN.pdf` (2013-14 to
2018-19), `/budgetYYYY-YY/doc/Budget_at_Glance/bagN.pdf` behind `budgetglance.php` (2019-20,
2020-21) and `/budgetYYYY-YY/doc/Budget_at_Glance/bagN.pdf` linked from `index.php` (2021-22 on).
The index pages for 2019-20 and 2020-21 expose **no** PDF links at all on `index.php`; the links
live on `budgetglance.php`. A scraper walking `index.php` for every year returns 200 on every page
and silently produces a corpus with two missing years — the M3 failure the brief warns about, in a
different costume. I enumerated the link set on each era's own index page separately and state the
per-year link counts in §Sources retrieved. **All hrefs in the Union Budget archive are
double-quoted; I checked both quote styles on the 2016-17 glance page and the single-quoted match
returned zero, so double-quoted matching is complete for this corpus.**

---

## Findings

### 1. The bargain, in the Finance Commission's own words — and what it did *not* say

The premise of this part is that the Fourteenth Finance Commission raised the vertical share from
32% to 42% on an argument about untied money. That is correct, and the argument is at **paragraph
8.13** of the FC-XIV report (retrieved: `https://fincomindia.nic.in/asset/pdf/commission-reports/14thFCReport.pdf`,
1,364,786 bytes, read at chapter 8). Verbatim:

> "However, a compositional shift in transfers from grants to tax devolution is desirable for two
> reasons. First, it does not impose an additional fiscal burden on the Union Government. Second, an
> increase in tax devolution would enhance the share of unconditional transfers to the States. …
> Considering all factors, in our view, increasing the share of tax devolution to 42 per cent of the
> divisible pool would serve the twin objectives of **increasing the flow of unconditional transfers
> to the States and yet leave appropriate fiscal space for the Union to carry out specific-purpose
> transfers to the States.**"

Three things in that paragraph are routinely lost and all three matter to this part:

- **The Commission did not recommend abolishing tied transfers.** It expressly preserved "appropriate
  fiscal space for the Union to carry out specific-purpose transfers". A test of the bargain framed
  as "did CSS transfers go to zero" is not a test of what was recommended.
- **The Commission did not recommend increasing total transfers.** Para 8.12: *"We recognise that
  amounts equivalent to more than 60 per cent of the divisible pool goes to the States in various
  forms of transfers and keeping in view the Union Government's expenditure responsibilities, there
  is little scope to increase the share of aggregate transfers."* The recommendation was a
  **compositional** shift inside a roughly fixed envelope. This is the single most important framing
  fact in this part, because it means the right test is a **share**, not a level.
- **The Commission did set a level benchmark, once, and it is testable.** Para 12.49: *"we expect
  that the Union Government will utilise its available fiscal space to continue to address the needs
  and expectations of the States and ensure the prevailing level of transfers to States of about
  **49 per cent of the gross revenue receipts** during the award period."* That is a Union-side
  obligation the Commission wrote down. **Whether it was met is a gross-revenue-receipts question and
  part 02 owns that denominator — see §FORWARD REFERENCES.**

The Commission also recorded, in chapter 12, that it had found the states' complaint about
conditionality factually made out. Para 12.22, third and fifth points, verbatim:

> "Concerns have been expressed that the scope and conditionality of such transfers have expanded
> considerably in recent years. **Our data confirms that such a significant expansion did take
> place.**"

> "Data reveal that the share of formula-based distribution … in the aggregate transfers has been
> decreasing. It is noted that the Union Government does adopt certain criteria for allocation of
> funds in respect of Centrally sponsored schemes and some other forms of grants. However, **the
> actual transfers to States are often noticeably different from the allocations based on these
> criteria for a variety of reasons, including non-compliance with conditionalities and the
> procedures laid down for releases.**"

That last sentence is a constitutional body stating, in 2014, that *allocation* and *release* are
different quantities and that the gap between them is produced by conditionality. It is the earliest
T1 statement of the definitional problem this part is about (§Definitional disagreements, D-3).

### 2. The reporting-base shift is real, is dated, and was made by the *previous* government

**The fact.** Until FY2013-14 a large volume of centrally sponsored scheme money was released
**directly to state- and district-level implementing agencies and autonomous bodies**, bypassing
state budgets and state legislatures. From FY2014-15 it was routed through state consolidated funds.

**The exact magnitude, from the Union Budget's own ledger.** The Expenditure Budget Vol. I carried a
statement whose entire subject was this money: **Statement 18, "DIRECT TRANSFER OF CENTRAL PLAN
ASSISTANCE TO STATE/DISTRICT LEVEL"** (titled in 2013-14 "… STATE/DISTRICT LEVEL AUTONOMOUS
BODIES/IMPLEMENTING AGENCIES"). Its GRAND TOTAL line, read from three successive volumes:

| volume | FY2011-12 A | FY2012-13 A | FY2012-13 BE/RE | FY2013-14 BE | FY2013-14 RE | FY2013-14 A | FY2014-15 BE |
|---|---|---|---|---|---|---|---|
| EB Vol.I 2013-14 | **1,09,173.13** | — | 1,33,515.93 / 1,06,218.97 | 1,43,039.68 | — | — | — |
| EB Vol.I 2014-15 (interim, Feb 2014) | — | 1,04,971.35 | — | 1,43,039.68 | 1,07,014.58 | — | **0.00** |
| EB Vol.I 2014-15 (full, Jul 2014) | — | 1,04,971.35 | — | 1,43,039.68 | 1,07,014.58 | — | **0.00** |
| EB Vol.I 2015-16 | — | — | — | — | — | **1,12,707.83** | **…** (nil) |

(₹ crore. "A" = Actuals, provisional in the year first published. URLs in §Sources retrieved.)

Two findings follow and neither is available from a secondary account:

- **The switch was made in the Interim Budget of February 2014, by the UPA government, not by the
  incoming government in July 2014.** The interim volume (`/budget2014-2015(I)/ub2014-15/eb/stat18.pdf`)
  already shows `0.00` in every BE 2014-15 cell, including the GRAND TOTAL. The full July 2014 volume
  reproduces the same table unchanged. **The Fourteenth Finance Commission says so itself**, in a
  footnote on page 90 of its report: *"The Interim Budget 2014-15 reversed this by announcing fund
  flow through the Consolidated Fund of the States instead of directly to the implementing
  agencies."* And the Sub-Group of Chief Ministers dates the decision earlier still, to the **June
  2013 restructuring of CSS**: *"In accordance with the view of many States, it also mandated that
  Central Assistance under CSS would flow to the Consolidated Funds of the States and that the fund
  flows would be classified as part of Central Assistance to State Plan (CASP)."* Three independent
  T1 documents — the Budget's own statement, the FC-XIV report, the Sub-Group report — put the
  decision before the change of government. **Any account that attributes the routing change to the
  Modi government's fiscal design is wrong on the record.** What the incoming government did was
  carry it through and then, from FY2016-17, restructure the schemes that flowed through it.
- **The statement was then abolished.** By Expenditure Budget Vol. I 2016-17, "Statement 18" had been
  reassigned to *"Statement showing position of Major Reserve Funds operated in the Public Account"*.
  The direct-transfer statement does not exist in any later budget. It was not replaced. So the last
  published figure for direct-to-agency releases is **₹1,12,707.83 crore for FY2013-14** and there is
  no continuation. This is a **discontinued instrument** and it is the reason the pre- and
  post-FY2014-15 transfer series cannot be spliced.

**The same figure appears in a second instrument in the same budget**, which is a genuine
cross-check: *Budget at a Glance 2015-16*, "Resources Transferred to State and U.T. Governments",
line *"In addition — (2) Direct release under Central Plan to State/District level autonomous
bodies/implementing agencies $"*, FY2013-14 Actuals **1,12,708**, with FY2014-15 BE, FY2014-15 RE and
FY2015-16 BE all "…" and a footnote *"$ For details refer to Statement 18, Expenditure Budget
Vol.1."* Two statements, one figure, agreeing to the rounding.

**What the Finance Commission did with it, which is what a disciplined instrument does.** FC-XIV
para 5.8 states the definitional problem explicitly and then restates the series both ways:

> "In calculating the share of transfers from the Union to the States, the standard approach used is
> to include only those transfers that are received in the Consolidated Funds of States. **Direct
> transfers to implementing agencies are not taken as part of State Finance Accounts and are captured
> only in the Union Government's accounts.** However, to get clarity on the structural shifts in the
> transfer system, it is important to include the direct transfers to implementing agencies in the
> States as part of the total transfers to the States."

Its Table 5.1 (excluding direct transfers) and Table 5.2 (including them) give the same quantity two
values in the same chapter. **Finance Commission transfers as a percentage of total Union transfers,
FC-XIII award period average: 67.4% excluding direct transfers, 56.7% including them** (para 5.9) —
a 10.7-percentage-point definitional gap in the pre-2015 baseline against which the 42% award is
judged. **This is the single most consequential definitional fact in this part** and it is stated by
a constitutional body, in its own report, before the award.

### 3. The Single Nodal Agency change (FY2021-22) and SNA SPARSH (2023) — a second reporting-base shift

Retrieved: *Expenditure Profile 2026-2027, Statement 4AA, "Fund balances under Single Nodal Agency
(SNA) Accounts & Status of SNA SPARSH"* (`https://www.indiabudget.gov.in/doc/eb/stat4aa.pdf`). The
statement's own head note, verbatim:

> "Since, FY 2021-22, the Union Government has been implementing the Single Nodal Agency (SNA) model.
> It aims at enhancing visibility and transparency in fund flows to States under Centrally Sponsored
> Schemes (CSS). It seeks to ensure just-in-time release of scheme funds to States based on the pace
> of expenditure. … For each scheme, the State Government designates one Single Nodal Agency (SNA)
> and opens its account in a scheduled commercial bank. All scheme funds remain only in the SNA
> account. Other scheme Implementing Agencies (IAs) down the line, open Zero Balance Subsidiary
> Accounts (ZBSAs) to draw funds from SNA account. State treasuries are integrated with PFMS &
> exchange data on release of Central & State share of CSS funds."

And on SNA SPARSH (*Samyochit Pranali Ekikrit Shighra Hastantaran*), the government's own statement
of what was wrong with the SNA model it had itself introduced three years earlier:

> "The SNA SPARSH is an improvement over the SNA Account Model which **resulted in transfer of
> balances outside the Consolidated Fund of India and the Consolidated Fund of the State(s) into the
> SNA bank accounts where the released funds remain idle until their final utilization.** Bulk
> releases by GoI and States also resulted in cash mismatch in RBI accounts which were bridged by
> borrowed funds either through Ways and Means Advance (WMA) or other short-term borrowings. Under
> SNA SPARSH, both Centre and State Consolidated Funds are impacted **only when an actual claim is
> raised from the State**, thus preventing bulk transfers and idling of funds."

**Why this is a reporting-base shift and not merely plumbing.** Under the pre-2021 model, "released"
meant money left the Consolidated Fund of India and entered a state's account. Under SNA it meant
money entered a designated commercial-bank account outside both Consolidated Funds. Under SNA SPARSH
it means **a claim was raised and paid** — the Union's release and the state's expenditure are now
the *same event*. The word "released" therefore denotes three different things in FY2020-21,
FY2022-23 and FY2025-26. A release series spanning those years is not a series.

**Rollout dates, from the same statement (T1, verbatim):** module launched **August 2023**, pilot in
six states (Rajasthan, Odisha, Karnataka, Telangana, Jharkhand, Chhattisgarh) and two schemes (PM
USHA, Swachh Bharat Mission–Gramin); **May 2024** notification of 14 states and 23 CSS; **December
2024** the North-eastern states and three UTs with legislature; **June 2025** 37 CSS; **November
2025** the remainder. As at 31 December 2025: *"Out of **81 notified Centrally Sponsored Schemes**,
50 have been onboarded till 31.12.2025."*

**The instrument that reports it is itself unstable.** "Statement 4AA" of the Expenditure Profile has
been used for two unrelated subjects and has twice not existed:

| budget year | is there a Statement 4AA? | subject |
|---|---|---|
| 2019-20, 2020-21, 2021-22 | **no** (HTTP 404 on `/doc/eb/stat4aa.pdf` with the referer supplied) | — |
| 2022-23 | yes | **"Revamping/Rationalisation of Centrally Sponsored Scheme"** — the 130→65 mapping |
| 2023-24, 2024-25 | **no** — and not merely a URL miss: the Expenditure Profile link list on each year's `index.php` runs `stat4a, stat4b, stat4c, stat4d` with no `4aa` entry | — |
| 2025-26, 2026-27 | yes | **"Fund balances under Single Nodal Agency (SNA) Accounts"** |

So the Budget published a scheme-rationalisation map once, in 2022-23, dropped it, and then reused
the same statement number for a different subject two years later. Neither series continues.

### 4. The 2015-16 restructuring: 66 → 28, and the tier ratios, from primary documents

**The Sub-Group.** Retrieved: *Report of the Sub-Group of Chief Ministers on Rationalisation of
Centrally Sponsored Schemes, October 2015*,
`https://www.niti.gov.in/sites/default/files/2019-08/Final%20Report%20of%20the%20Sub-Group%20submitter%20to%20PM.pdf`
(150 pages; I read the Executive Summary, Chapter IV Recommendations 1–7, and the 66-CSS mapping
table at para 4.14). Constituted **9 March 2015** by the Prime Minister, in pursuance of the first
Governing Council meeting of NITI Aayog on **8 February 2015**. Convener: **Chief Minister of Madhya
Pradesh** (Shivraj Singh Chouhan). Coordinator: CEO, NITI Aayog. Members: the Chief Ministers of
Arunachal Pradesh, Jammu & Kashmir, Jharkhand, Kerala, Manipur, Nagaland, Rajasthan, Telangana,
Uttar Pradesh, and the Lt. Governor of the Andaman & Nicobar Islands. Four meetings.

**The starting count, from the Sub-Group's own words:** *"in BE 2014-15, budgetary provisions were
made for **66 CSS** which included **17 large CSS which were called 'flagship' schemes**."* The
report carries the list as Annexure IX, "List of 66 CSS implemented in 2014-15".

**What was already gone before the Sub-Group reported:** *"the Government of India has retained **50
of the 66** ongoing CSS in Budget 2015-16. The balance are being either taken into the Central
sector, or reformulated as new Umbrella Schemes or have been transferred to the States."*

**The money the Union itself says it took out, in the Union's own framing:** *"post-14th FC
devolution, the BE for Central Assistance to State Plan (CASP) has been reduced from **Rs. 3.38 lakh
cr in 2014-15, to Rs. 2.05 lakh cr in 2015-16**. The BE for CSS has reduced from **Rs. 2.52 lakh cr
to about Rs. 1.69 lakh cr** (excluding provision for CSS for UTs)."* Against, on the same page: *"it
is estimated that this entails **additional devolution of Rs. 1.78 lakh cr** to the States."* Both
figures are BE-to-BE, in the same document, on the same page. **A ₹0.83 lakh crore cut in budgeted
CSS against a ₹1.78 lakh crore rise in budgeted devolution** is the Union's own arithmetic of the
compositional shift, and it is the strongest single piece of evidence that the bargain was honoured
at the moment of award.

**The recommended target:** *"restructured and their number should be reduced to a maximum of **30
Schemes**. All these schemes would be 'Umbrella Schemes', with every Scheme having a large number of
components with a uniform funding pattern."* (para 4.13). The para-4.14 table maps the 66 onto a
numbered list of proposed umbrella programmes running to 29, with a residue "transferred to Central
Sector" or "delinked from Union support".

**The recommended sharing pattern, verbatim from the Executive Summary:**

> "From now onwards, the sharing pattern should be:
> **For Core Schemes** — (a) For 8 NE and 3 Himalayan States: Centre: State: **90:10**; (b) For other
> States: Centre: State: **60:40**; (c) For Union Territories: **Centre: 100%**.
> **For Optional Schemes** — (a) For 8 NE and 3 Himalayan States: Centre: State: **80:20**; (b) For
> other States: Centre: State: **50:50**; (c) For Union Territories: **Centre: 100%**.
> Existing funding pattern of schemes classified as **Core of the Core** to continue."

**Flexi-funds** (Recommendation 6, paras 4.28–4.29): the Sub-Group records that *"the flexi-fund
method … has already been introduced during the last restructuring of CSS in June 2013 which mandated
to keep **at least 10%** of allocation in schemes in a year as Flexi-Fund"*, and recommends *"Flexi-
Funds in each Scheme should be **25% (twenty five percent)** of allocation in each financial year, to
be made available to every State."* The Department of Expenditure's flexi-fund guidelines are
reproduced as Annexure VIII of the report.

**What was actually decided, from the Union Budget itself.** *Expenditure Budget Vol. I 2016-17,
Introductory Notes*, paragraphs 4–6, verbatim:

> "4. The Plan estimates of 2016-17 has to be seen in the context of the revised funding pattern on
> the recommendations of the Sub-group of Chief Ministers on Rationalisation of Centrally Sponsored
> schemes. As per the decision of Government, **the existing funding pattern of schemes defined as
> 'core of the core' have been retained.** A list of these schemes is attached at Annexure A.
> 5. The funding pattern of **'core' schemes**, which also form part of the National Development
> agenda, will be shared **60:40 between the Centre and the States (90:10 for the 8 North Eastern
> States and 3 Himalayan states)**. A list of these schemes is attached at Annexure B.
> 6. In case a scheme/sub-scheme in the above list has a Central Funding pattern of less than 60:40,
> **the existing funding pattern will continue**. The other **optional schemes** as listed in
> Annexure B will be optional for the State Governments and their fund sharing pattern will be
> **50:50 between the Centre and the States (80:20 for the 8 North Eastern States and 3 Himalyan
> States)**."

Paragraph 6 is the operative asymmetry: the 60:40 was a **ceiling on the Union's share, not a
floor**. Where the Union was already paying less than 60%, it kept paying less.

**The 28 schemes, named, from the Union Budget's own annexes.** *Budget at a Glance 2016-17*,
`bag10.pdf`, carries ANNEX-A (Core of the Core), ANNEX-B (Core) and an unlettered "C Optional
Scheme" block:

- **Core of the Core — 6:** MGNREGA; National Social Assistance Programme; Umbrella Scheme for the
  Development of Scheduled Castes; Umbrella Programme for Development of Scheduled Tribes (Tribal
  Education and Van Bandhu Kalyan Yojana); Umbrella Programme for Development of Backward Classes and
  other vulnerable groups; Umbrella Programme for Development of Minorities.
- **Core — 19 numbered entries:** Green Revolution (Krishi Unnati Yojana; RKVY); White Revolution;
  Blue Revolution; PM Krishi Sinchai Yojana (AIBP/Har Khet Ko Paani; Per Drop More Crop; IWDP); PM
  Gram Sadak Yojana; National Rural Drinking Water Mission; Swachh Bharat Abhiyan (Rural; Urban);
  National Health Mission (Rural & Urban; HR in Health & Medical Education; AYUSH); Rashtriya
  Swasthya Suraksha Yojana; National Education Mission (SSA; RMSA; Teachers Training & Adult
  Education; RUSA); Mid Day Meals; Umbrella ICDS (Core ICDS; National Nutrition Mission; Maternity
  Benefits; Scheme for Adolescent Girls; ICPS); PMAY (Rural; Urban); National Livelihood Mission
  (Rural; Urban); Forestry and Wild Life; Urban Rejuvenation Mission – SMART Cities and AMRUT;
  Modernization of Police Forces; Infrastructure Facilities for Judiciary; MPLADS.
- **Optional — 3:** Border Area Development Programme; National River Conservation Plan; Shyama
  Prasad Mukherjee RURBAN Mission.

6 + 19 + 3 = **28**. *(A defect in the primary document: the printed Core list carries two entries
numbered "1" — a stray "Cattle Development" line above "Green Revolution" — so the printed list has
20 lines under 19 numbers. I have counted the numbered entries.)*

**And the Fifteenth Finance Commission gives a different decomposition of the same 28.** FC-XV Vol I,
para 3.3, verbatim: *"the Union Government in 2016-17 also rationalised the Centrally sponsored
schemes (CSS) into twenty-eight umbrella schemes, consisting of **six core of the core schemes,
twenty core schemes and two optional schemes**."* Six + twenty + two = 28; six + nineteen + three =
28. **Two T1 documents give the same total and different tiers.** Since the tier determines the
funding ratio, this is not cosmetic: one scheme is 60:40 on one account and 50:50 on the other. It
is P-record material (§Candidate provenance, PR-4).

### 5. The count of centrally sponsored schemes was never defined, and the Finance Commission says so

Put the counts on one line, each from the instrument that produced it:

| as at | count | what is being counted | instrument |
|---|---|---|---|
| BE 2014-15 | **66** (of which 17 "flagship") | schemes with a budgetary provision | Sub-Group of CMs report, Exec. Summary + Annexure IX |
| BE 2015-16 | **50** retained of the 66 | schemes retained after the FC-XIV award | Sub-Group of CMs report, Exec. Summary |
| recommended, Oct 2015 | **max 30** umbrella schemes | Sub-Group's recommendation | Sub-Group report para 4.13 |
| BE 2016-17 | **28** umbrella schemes (6+19+3) | as classified in the Budget's own annexes | Union Budget 2016-17, BaG Annexes A/B/C |
| BE 2016-17 | **28** umbrella schemes (6+20+2) | the same decision, as described five years later | FC-XV Vol I para 3.3 |
| c. 2020 | **131** CSS / **30** umbrella CSS | DoE's own list / Union Budget 2020-21 | FC-XV Vol I para 12.51(ii) |
| 1 Apr 2020 | **130** sub-schemes | pre-revamp column of the rationalisation map | Expenditure Profile 2022-23, Statement 4AA |
| after revamp (FY2021-22) | **65** schemes | post-revamp column of the same map | Expenditure Profile 2022-23, Statement 4AA |
| 31 Dec 2025 | **81 notified** CSS, 50 onboarded to SNA SPARSH | schemes notified for SNA SPARSH | Expenditure Profile 2026-27, Statement 4AA Part B |
| BE 2026-27 | **86 line items** (85 named schemes + "Others") | CSS as budgeted, by ministry | Expenditure Profile 2026-27, Statement 4A |

The Fifteenth Finance Commission says the quiet part on the record, at para 12.51(ii), verbatim:

> "**Till recently, there seemed to be confusion about the number of existing CSS**, indicating the
> complexity of the entire structure. The Department of Expenditure, Ministry of Finance, has
> recently drawn up a list of **131 CSSs**. The Union Budget 2020-21 shows that fifteen of the
> **thirty umbrella CSS** account for about 90 per cent of the total allocation under CSS. Many
> umbrella schemes have, within them, a number of small schemes, some of them with negligible
> allocations."

So the correct statement of the "66 → 28" fact is not that India went from 66 schemes to 28. It is
that **the unit of account changed**: 66 *schemes* became 28 *umbrellas* containing an unenumerated
and larger number of sub-schemes, and the Department of Expenditure's own subsequent count of the
same population was 131. **"Number of centrally sponsored schemes" is a `never-defined` quantity**
(§Absences, A-1) and the reduction from 66 to 28 is, on the primary record, at least partly a change
in how the same things were grouped. That is a first-class finding, not a caveat.

### 6. What the 15th FC recommended on CSS, and what it capped

FC-XV Vol I, paras 12.51–12.52 (retrieved:
`https://fincomindia.nic.in/asset/doc/commission-reports/XVFC%20VOL%20I%20Main%20Report.pdf`,
31,057,059 bytes; read at chapter 12). Recommendations, verbatim in substance:

- **(i)** Records that *"In February 2017, the Union Government indicated that, for aligning the
  schemes with the financial resources cycle … ongoing schemes would be **co-terminus with the
  Finance Commission cycles**. This meant that the continuation of the schemes would be **contingent
  on outcome review, fresh appraisal and approval**."*
- **(iii)** *"It is important to gradually stop the funding for those CSS and their sub-components
  which have either outlived their utility or have insignificant budgetary outlays … There should
  also be a **minimum threshold funding size for the approval of a CSS**."*
- **(iv)(a)** *"fix a threshold amount of annual appropriation below which the funding for a CSSs may
  be stopped"*; **(iv)(b)** *"conduct an **independent evaluation** of all the CSS. We understand
  that the Department of Expenditure had asked NITI Aayog to conduct a third-party evaluation of all
  the CSS."*
- **(v)** *"**Clarity and stability in the share of the Union Government in CSS is important for the
  fiscal arithmetic of the States. The funding pattern of the CSSs should be fixed upfront in a
  transparent manner and should be kept stable.**"*
- **12.52** *"We have assessed that keeping the aggregate size of the schematic transfers from the
  Union to the States at the FC-XIV levels (**12.81 per cent of the gross revenue receipts**) will be
  adequate."*

Recommendation (v) is the states' complaint restated by a constitutional body: the Union's share in
a CSS is not fixed and not stable, and states cannot budget against it. And 12.52 is a **second
testable benchmark**, again on a gross-revenue-receipts denominator — **part 02 owns it**.

---

## The quantities

### 7. Total transfers to states and UTs with legislature, decomposed, FY2013-14 → FY2024-25

**Instrument.** The Union Budget's *Budget at a Glance*, table "**Transfer of Resources to States and
Union Territories with Legislature**" (called "Resources Transferred to State and U.T. Governments"
before the 2017-18 budget), read from the budget of year *T* for the Actuals of year *T−2*. Every
Actuals figure below is read from the document named in its row and no figure is carried from a
Budget Estimate or a Revised Estimate.

**Post-shift series (FY2015-16 → FY2024-25), all ₹ crore, Actuals:**

| FY | tax devolution | Finance Commission grants | of which post-devolution revenue deficit grants | "Some important items of transfer" | CSS (revenue, to States) | Central Sector schemes (revenue, to States) | transfer to Delhi/Puducherry(/J&K) | **total transfers** | read from |
|---|---|---|---|---|---|---|---|---|---|
| FY2015-16 | 5,06,193 | 84,579 | 48,905 | 43,143 † | 1,75,736 | 2,606 | 5,139 (+378 NE) | **8,34,483** | BaG 2017-18 |
| FY2016-17 | 6,08,000 | 95,550 | 41,307 | 48,054 | 2,25,848 | 2,407 | 5,113 | **9,85,674** | BaG 2018-19 |
| FY2017-18 | 6,73,006 | 92,244 | 35,819 | 37,236 | 2,62,043 | 15,964 | 3,832 | **10,85,130** | BaG 2019-20 |
| FY2018-19 | 7,61,454 | 93,704 | 34,582 | 46,236 | 2,71,478 | 13,629 | 7,955 | **11,95,394** | BaG 2020-21 |
| FY2019-20 | 6,50,678 | 1,23,710 | 28,314 | 53,706 | 2,75,428 | 12,864 | 28,161 | **11,45,487** | BaG 2021-22 |
| FY2020-21 | 5,94,997 | 1,84,063 | 74,340 | 1,64,873 ‡ | 3,08,306 | 16,143 | 50,667 | **13,20,053** | BaG 2022-23 |
| FY2021-22 | 8,98,392 | 2,07,435 | 1,18,452 | 2,02,808 ‡ | 3,34,581 | 9,994 | 51,128 | **17,05,610** | BaG 2023-24 |
| FY2022-23 | 9,48,406 | 1,72,760 | 86,201 | 1,20,366 | 4,05,918 | 12,867 | 56,199 | **18,64,615** | BaG 2024-25 |
| FY2023-24 | 11,29,494 | 1,48,522 | 51,673 | 1,60,257 | 4,25,296 | 15,096 | 55,213 | **20,64,829** | BaG 2025-26 |
| FY2024-25 | 12,86,885 | 1,20,858 | 24,483 | 2,02,664 | 3,82,336 | 19,167 | 60,007 | **22,25,513** | BaG 2026-27 |

† FY2015-16's table has a different architecture: "Scheme Related Transfers" (III) and "Other
Transfers" (IV); 43,143 is head IV. From the 2018-19 budget the same money is head II, "Some
Important Items of Transfer". Same money, different heading — a presentation change, not a break.
‡ Includes the **back-to-back loans to states in lieu of GST compensation shortfall**: ₹1,10,208
crore in FY2020-21 and ₹1,47,866 crore in FY2021-22. **These are loans, in a table headed
"transfer".** Answering part 01's forward reference: **yes — the GST back-to-back loan is counted as
a transfer to states in the Union Budget's transfer statement**, as line II.2, with no
grant/loan distinction drawn in the total.

**Pre-shift years (FY2013-14, FY2014-15) — a different instrument, and not spliceable:**

| FY | states' share of taxes | non-Plan grants & loans | Central Assistance for State/UT Plans | assistance for Central & CSS | less recovery of loans | **net resources transferred** | *plus, outside the total*: direct release to implementing agencies |
|---|---|---|---|---|---|---|---|
| FY2013-14 A | 3,18,230 | 60,631 | 1,05,252 | 44,111 | 10,120 | **5,18,104** | **1,12,708** |
| FY2014-15 A | 3,37,808 | 77,198 | 2,70,829 | — | 10,658 | **6,75,177** | **nil** |

(BaG 2015-16 `bag3a.pdf` and BaG 2016-17 `bag3a.pdf`.) Note the FY2013-14→FY2014-15 jump in "Central
Assistance for State/UT Plans" from 1,05,252 to 2,70,829 — that is the direct-to-agency money
arriving inside the reported base. Note also that this old series is **net of recoveries of loans and
advances** while the post-2017 series is not; the two denominators are not the same object even
before the routing change.

### 8. The derived quantity: the untied share of total transfers to states

**Definition used.** `untied` = **tax devolution** (states' share of the net proceeds of Union taxes),
which is untied by construction — Article 270 assigns it, no ministry releases it against
conditions, and no utilisation certificate attaches. `total` = the Budget's own "Total Transfer to
States/UTs". Everything else in the denominator is tied to something: a scheme, a sector, a disaster,
a project, a reform milestone, or a loan agreement. **The one arguable exception is the
post-devolution revenue deficit grant**, which is general-purpose money and is shown separately
below.

| FY | untied share of total transfers | + PDRD grants | CSS share of total transfers | FC grants share |
|---|---|---|---|---|
| FY2013-14 *(pre-shift base, as published)* | **61.42%** | — | — | — |
| FY2013-14 *(restated onto the FY2014-15 base)* | **50.45%** | — | — | — |
| FY2014-15 *(first year on the new base)* | **50.03%** | — | — | — |
| — **break: reporting base + FC award** — | | | | |
| FY2015-16 | **60.66%** | 66.52% | 21.06% | 10.14% |
| FY2016-17 | 61.68% | 65.87% | 22.91% | 9.69% |
| FY2017-18 | 62.02% | 65.32% | 24.15% | 8.50% |
| FY2018-19 | **63.70%** *(peak)* | 66.59% | 22.71% | 7.84% |
| FY2019-20 | 56.80% | 59.28% | 24.04% | 10.80% |
| — **break: FC-XV award, 42%→41%** — | | | | |
| FY2020-21 | **45.07%** *(trough)* | 50.71% | 23.36% | 13.94% |
| — **break: SNA model** — | | | | |
| FY2021-22 | 52.67% | 59.62% | 19.62% | 12.16% |
| FY2022-23 | 50.86% | 55.49% | 21.77% | 9.27% |
| FY2023-24 | 54.70% | 57.20% | 20.60% | 7.19% |
| FY2024-25 | **57.82%** | 58.92% | **17.18%** | 5.43% |

*(Percentages are mine, computed from the T1 figures in §7. The arithmetic is division; the inputs
are not estimates. The FY2013-14 restatement adds the ₹1,12,708 crore of direct-to-agency releases —
a T1 figure from the same budget — to that year's denominator. It is an illustration of the
definitional gap, not a spliced point, and it is not offered as a series point.)*

**What this shows, stated carefully.**

1. **The bargain was delivered, at the moment of award, and the delivery is large.** On the
   post-shift base the untied share went from **50.03% (FY2014-15) to 60.66% (FY2015-16)** — a
   **+10.6 percentage point** step in one year, at exactly the 32%→42% boundary. It then rose
   further, to a peak of **63.70% in FY2018-19**. Over the whole FC-XIV award period the untied share
   never fell below 56.8%.
2. **It was then given back, and not fully recovered.** FY2020-21 read **45.07%** — below the
   pre-award level on the comparable base. By FY2024-25 it had recovered to **57.82%**, still
   **5.9 points below the FY2018-19 peak** and **2.8 points below the first post-award year**.
3. **The give-back was not caused by centrally sponsored schemes.** The CSS share of total transfers
   *fell* across the whole period, from **24.15% in FY2017-18 to 17.18% in FY2024-25**. What grew was
   the residual — loans and non-scheme transfers. **In FY2024-25, "Special Assistance as Loan to
   States for Capital Investment" alone was ₹1,49,483.73 crore**, 6.7% of all transfers, and it is a
   loan conditioned on reform milestones. In FY2020-21 and FY2021-22 the ₹1,10,208 and ₹1,47,866 crore
   back-to-back GST loans sat in the same column.
4. **The naive comparison points the other way, and this is the trap.** FY2013-14 *as the Union
   published it at the time* reads **61.42% untied** — higher than FY2024-25's 57.82%, and within a
   point of the post-award FY2015-16. Anyone comparing published-to-published across FY2014-15
   concludes the 42% award **reduced** the untied share. That conclusion is an artefact of ₹1.13 lakh
   crore of tied money having been outside the FY2013-14 denominator. **Restated, FY2013-14 reads
   50.45%.** The direction of the finding flips on a definitional choice, and only the restated
   comparison is meaningful. §Definitional disagreements D-1.

**Sensitivity to the denominator — the same quantity, three defensible definitions:**

| FY | denominator = total transfers to States **and UTs** | denominator = **States only** (UT block removed) | denominator = total transfers **less loans** |
|---|---|---|---|
| FY2015-16 | 60.66% | 61.06% | 60.66% |
| FY2018-19 | 63.70% | 64.13% | 64.99% |
| FY2020-21 | 45.07% | 46.87% | **50.80%** |
| FY2021-22 | 52.67% | 54.30% | **59.09%** |
| FY2024-25 | 57.82% | 59.43% | **63.03%** |

The spread is **5.2 points in FY2024-25 and 6.4 points in FY2021-22**. Devolution goes only to
States, so including UT transfers in the denominator biases the untied share down; loans are not
grants, so including them biases it down further. **A single "untied share" number is a claim about
which of these three denominators was chosen, and no published source states which.**

### 9. What the Union Budget does *not* publish: the state dimension

The Union Budget publishes tax devolution **state by state** — Receipts Budget Annex 4 (BE), 4A (RE)
and **4B (Actuals)**, each a 28-row table by state with the horizontal share to three decimals
(retrieved: `https://www.indiabudget.gov.in/doc/rec/annex4b.pdf`; FY2024-25 Actuals total
**12,65,660.58** crore; Uttar Pradesh 17.939% / 2,27,046.82 crore, Bihar 10.058% / 1,27,300.15 crore,
West Bengal 7.523% / 95,215.65 crore, Tamil Nadu 4.079% / 51,626.29 crore, Kerala 1.925% /
24,363.98 crore).

It publishes centrally sponsored scheme transfers **by ministry and by scheme** — Expenditure Profile
Statement 4A, 86 line items, Grand Total FY2024-25 Actuals **4,02,367.62** crore.

**It publishes centrally sponsored scheme transfers by state nowhere.** Statement 18 is an aggregate
of four categories with no state dimension (51 lines, checked). Statement 4A has ministry and scheme
columns and no state column. The Statements of Budget Estimates for the implementing demands (I
checked Demand 25 Department of School Education and Literacy and Demand 87 Department of Rural
Development) carry scheme lines with BE/RE/Actual columns and no state breakdown — a search for
"state-wise", "Andhra", "West Bengal" and "Tamil Nadu" in both returns nothing.

**Consequence, and it is the central absence of this part: the untied share of transfers cannot be
computed for any individual state from the Union Budget.** The numerator is published per state; the
denominator is not. Every state-level claim about tied-versus-untied money therefore rests either on
scheme-by-scheme parliamentary answers (which exist only where a member asked) or on the state's own
accounts (which are not independent of the state). §Absences A-2.

### 10. Two statements in the same budget disagree about what "transfers to states" means

- **Budget at a Glance 2026-27, paragraph 6 of the text**: *"Total resources being transferred to the
  States including the devolution of State's share, Grants/Loans and releases under Centrally
  Sponsored Schemes, etc. in BE 2026-27 is **₹25,43,769 crore**."*
- **Budget at a Glance 2026-27, `bag3.pdf`, the table, two pages later**: "Total Transfer to
  States/UTs", BE 2026-27 = **₹26,20,769 crore**.

The difference is **₹77,000 crore** and it is exactly head V, "Total Transfer to Delhi, Puducherry and
Jammu & Kashmir", BE 2026-27 = ₹76,999.80 crore. So the prose means *States*; the table means
*States and UTs with legislature*; both are called "total transfers to states"; and nothing in the
document says which is which. PR-1.

Separately, the same document's note on total expenditure — *"Total expenditure is inclusive of
States' share of taxes and duties which have been netted against receipts in the table on page 1"* —
cannot be read literally without breaking the deficit identity printed in the same document. Total
expenditure FY2024-25 Actuals = 46,52,867; revenue receipts (Annex 1, "Tax Revenue **(Net of States'
share)**") = 30,36,619 plus non-debt capital receipts 24,617 + 17,202; the difference is
**15,74,429**, which is the fiscal deficit as reported. That only works if devolution is **outside**
the expenditure total. **Therefore total Union expenditure must not be used as a denominator for
total transfers**, and this part does not use it. PR-2.

### 11. The CAG and the Union Budget disagree about the size of CSS transfers by up to ₹1 lakh crore

Retrieved: **CAG Report No. 21 of 2023, Union Government, Accounts of the Union Government (Financial
Audit), for the year 2021-22** (`https://cag.gov.in/uploads/download_audit_report/2023/Report-No.-21-of-2023-Finance-English-PDF-A-DSC-064d501d8224738.38514342.pdf`,
2,120,522 bytes). Its **Figure 2.24, "Grants-in-Aid to States and UTs with legislature"**, is the
same quantity as the Budget's transfer table, compiled from the Finance Accounts. Setting the two
side by side:

| FY | CAG Fig. 2.24: CSS grants-in-aid to States | Union Budget BaG: "Under Centrally Sponsored Schemes (Revenue)" | **gap** | CAG: FC grants | Budget: FC grants | gap |
|---|---|---|---|---|---|---|
| FY2017-18 | 1,96,088 | 2,62,043 | **−65,955** | 92,244 | 92,244 | **0** |
| FY2018-19 | 2,03,151 | 2,71,478 | **−68,327** | 93,703 | 93,704 | 1 |
| FY2019-20 | 2,08,543 | 2,75,428 | **−66,885** | 1,23,710 | 1,23,710 | **0** |
| FY2020-21 | 2,08,395 | 3,08,306 | **−99,911** | 1,84,062 | 1,84,063 | 1 |
| FY2021-22 | 2,40,383 | 3,34,581 | **−94,198** | 2,07,435 | 2,07,435 | **0** |

**The two instruments agree to the rupee on Finance Commission grants and disagree by 25–32% on
centrally sponsored schemes.** That pattern rules out a compilation error and points at a definition:
the CAG counts what the Finance Accounts book as **grants-in-aid to State Governments**; the Budget's
Statement 18 counts *"the allocation made under Major Heads relevant to States"* — and, since the
2024-25 Expenditure Profile, expressly *"includes releases made to States **both through State
treasuries and other implementing agencies**"*. The gap is, on its face, the money that does not
enter a state's accounts. **The CAG's own totals for transfers to UTs with legislature match the
Budget exactly** (FY2020-21 50,667; FY2021-22 51,128), which further isolates the disagreement to the
CSS line. This is the strongest single provenance finding in this part. PR-3.

### 12. The footnote that reopens the 2014 question

The Expenditure Profile's Statement 18 carried, for years, exactly one footnote: *"^ including
provisions relating to North Eastern Regions and Sikkim."* I read the foot of that statement in the
2019-20, 2020-21, 2021-22, 2022-23, 2023-24, 2024-25, 2025-26 and 2026-27 Expenditure Profiles. A
second footnote appears for the first time in **2024-25** and persists:

> "**\* includes releases made to States both through State Treasuries and implementing agencies.**"
> *(2024-25 wording; 2025-26 and 2026-27 read "…both through State treasuries and other implementing
> agencies".)*

Absent in 2023-24 and every year before it. The asterisk is attached to line III.a, "Under Centrally
Sponsored Schemes (Revenue)". **On the Union's own current statement, the routing change of FY2014-15
did not end direct releases to implementing agencies; some part of CSS money still goes to them, and
the Budget's CSS figure is a sum of the two channels.** How much of it is which is **not published**
(§Absences A-3), and that unpublished split is very plausibly the ₹0.66–1.0 lakh crore gap against
the CAG in §11.

### 13. The Jal Jeevan Mission line, FY2025-26 — a scheme collapsing inside a live budget

From *Expenditure Profile 2026-27, Statement 4AA Part A*, which reports, per scheme, the BE, the RE,
the total released by the Government of India to 31 December 2025, the SNA bank balance and the funds
sitting in state treasuries:

| scheme | BE 2025-26 | RE 2025-26 | released by GoI to 31.12.2025 | SNA balance | in State treasuries | total idle |
|---|---|---|---|---|---|---|
| **Jal Jeevan Mission / NRDWM** | **67,000.00** | **17,000.00** | **31.00** | 5,371.12 | 145.54 | 5,516.66 |
| Samagra Shiksha | 41,250.00 | 38,000.02 | 14,715.16 | 6,729.85 | 1,090.90 | 7,820.75 |
| MGNREGA | 86,000.00 | 88,000.00 | 72,115.79 | 166.82 | 2,653.31 | 2,820.13 |
| PMAY–Rural | 54,832.00 | 32,500.01 | 12,178.74 | 2,117.95 | 76.69 | 2,194.64 |
| PM Gram Sadak Yojana | 19,000.00 | 11,000.00 | 2,535.76 | 2,540.08 | 462.41 | 3,002.49 |
| Swachh Bharat Mission–Urban | 5,000.00 | 2,000.00 | 1,006.11 | 2,858.76 | 92.47 | 2,951.23 |
| Ayushman Bharat PM-JAY | 9,406.00 | 9,000.00 | 6,637.83 | 2.09 | — | 2.09 |

**Jal Jeevan Mission was budgeted at ₹67,000 crore, cut to ₹17,000 crore at Revised Estimates, and
₹31 crore had been released nine months into the year** — 0.05% of the Budget Estimate, 0.18% of the
Revised Estimate. Meanwhile ₹5,371.12 crore of previously released JJM money sat idle in SNA
accounts. PMAY-Rural: 22% of BE released with three months left. PM Gram Sadak Yojana: 13%. This is a
T1 statement, published by the Union, of very large in-year shortfalls against its own budget for
schemes that states have already staffed and contracted for. **It is also the single best argument
for the Union's position on parking of funds** — for four of these schemes the money sitting idle
exceeds the money released.

### 14. MGNREGA is being replaced, and the Union's own budget states the statutory character of the
liability it has been withholding

From the *Statement of Budget Estimates, Demand No. 87 – Department of Rural Development*
(`https://www.indiabudget.gov.in/doc/eb/sbe87.pdf`):

| line | FY2024-25 A | BE 2025-26 | RE 2025-26 | **BE 2026-27** |
|---|---|---|---|---|
| Viksit Bharat–Guarantee for Rozgar and Aajeevika Mission (Gramin), "VB-G RAM G" | … | … | … | **95,692.31** |
| MGNREGA–Programme Component | 85,834.40 | 86,000.00 | 88,000.00 | **30,000.00** |
| Transfer to National Employment Guarantee Fund | 85,838.76 | 86,000.00 | 88,000.00 | **…** |

The Budget's own note on VB-G RAM G: *"VB G RAM G is a Centrally Sponsored Scheme with the fund
sharing ratio of **60-40** between the Centre and States for all states and **90-10** for NER States,
Himalayan States & UTs with legislature and **100% central share** for Union Territories (UT) without
legislature. … for providing statutory guarantee of one hundred and twenty-five (125) days of wage
employment in every financial year to every rural household."* That is the 2016 tier structure, now
applied to a scheme replacing what was the flagship *Core of the Core* scheme.

And the Budget's own note on MGNREGA, which bears directly on §15: *"As per the Mahatma Gandhi NREGA
Act, **100% wage payment within 15 days of work done is the liability of Central Government**."*
The Union states, in its own budget document, that the wage component is a 100% statutory Central
liability. Any withholding of it is a withholding of a statutory liability on the Union's own account
of what it is.

---

## The quantities (continued)

*(Sections 15–18 were added in a resumed session on the same part; the retrieval posture, the M1
findings and the periodisation stated at the head of this file govern them unchanged. **One M1
update, and it is a live trap for every later part:** in the resumed session the **system resolver
returned nothing at all** for `www.indiabudget.gov.in` — `curl` failed with `(6) Could not resolve
host` — while `dig +short @1.1.1.1 www.indiabudget.gov.in` resolved it to an Akamai edge
(`www.indiabudget.gov.in-v1.akamaized.net` → **94.202.207.57 / 94.202.207.51**, not the
164.100.85.252 recorded earlier in this file). Every fetch below was made with
`--resolve www.indiabudget.gov.in:443:94.202.207.57` **and** the `Referer` header the earlier
session found to be mandatory. **Both escalations were needed; either alone returns nothing.** A
sweep run on the system resolver in this session would have reported the entire Union Budget as
unreachable, and a sweep run on 1.1.1.1 without the Referer would have reported every document as
404. Neither would have been a fact.)*

### 15. Withholding a statutory Central liability — and the two senses of "withheld"

**This section exists to prevent a specific corruption of the record, and the corruption is
available in this part more than in any other.** The word *withheld* is used in this phase for two
entirely different acts:

1. **Money withheld from a State.** A fiscal act. It has a payer (the Union), a payee (a named
   State), an amount, a date, and a stated or unstated ground. It is a dispute about *entitlement*.
2. **Data withheld from the public.** A publication act. It has a custodian, a requester, a request,
   a date, and a refusal. It is a dispute about *disclosure*.

**These are not the same thing and neither implies the other.** A Union that releases every rupee it
owes and publishes nothing about it is withholding data and not money. A Union that publishes a
complete, timely, state-wise account of money it has stopped releasing is withholding money and not
data. **In §Absences below, the reasonKind `withheld` is used *only* in sense (2), and only where
there is a named requester, a specific request, and a date.** Nothing in this part is coded
`withheld` on the strength of a fiscal grievance, however well evidenced. The absences in this part
that concern money not reaching states are recorded in the ledger and provenance sections, not as
data absences.

**Now the substantive finding, which is a genuine tension inside the Union's own documents.**

The Union states, in the Statement of Budget Estimates for its own Department of Rural Development
(`https://www.indiabudget.gov.in/doc/eb/sbe87.pdf`), that under the Mahatma Gandhi NREGA Act
*"**100% wage payment within 15 days of work done is the liability of Central Government**"* (§14).
That is the Union characterising a component of a centrally sponsored scheme as (a) statutory,
(b) wholly its own, and (c) time-bound.

Against that, the Union's operating practice on centrally sponsored schemes generally — visible in
its own Statement 4AA — is that release is **discretionary in fact and conditional in form**. At
31 December 2025, nine months into FY2025-26, the Union had released **₹31.00 crore against a Budget
Estimate of ₹67,000 crore** for Jal Jeevan Mission and **₹2,535.76 crore against ₹19,000 crore** for
PM Gram Sadak Yojana (§13). Whatever the merits in each case, the instrument that produced those
numbers is one in which the Union decides, in-year, how much of a budgeted transfer to send.

**The two propositions are both the Union's, and they are in tension:** a wage payment that is a
100% Central statutory liability payable within fifteen days is not a thing that can be managed by
in-year release discretion, and a system built on in-year release discretion cannot honour a
fifteen-day statutory deadline as a matter of design. **The instrument should record the tension
rather than resolve it**, because resolving it requires a legal judgement the instrument does not
make. What the instrument can record is that the Union has stated both.

**And the replacement changes the character of the liability.** VB-G RAM G is described in the same
budget as *"a Centrally Sponsored Scheme with the fund sharing ratio of **60-40** between the Centre
and States"* providing *"statutory guarantee of one hundred and twenty-five (125) days"* (§14). If
the guarantee is statutory and the funding is 60:40, then a wage bill the Union's own note calls a
100% Central liability under the 2005 Act becomes, under its successor, a **60% Central liability
with a 40% State matching obligation attached to a statutory guarantee the State did not enact**.
**That is the single most consequential change to the tied/untied architecture in the whole period
covered by this part, and it is happening at the end of it.** Whether the 125-day guarantee is in
fact statutory, and what instrument creates it, is stated in §Sources NOT retrieved if I could not
establish it; nothing is asserted here beyond what the Budget's own note says.

**What this part does *not* establish, and must not be read as establishing.** I did not retrieve
any Union document stating that MGNREGA releases to a named State were stopped, on a named date, on
a named ground. **Part 07 (West Bengal and Bihar) holds the measured case** — on its account the
Union's own figure for West Bengal's MGNREGA release in FY2022-23 is ₹0.00. **I am relying on part
07 for that fact and have not independently retrieved it** (§FORWARD REFERENCES). The general form
of the mechanism is this part's; the instance is part 07's.

### 16. The Union restated its own transfers-to-states Budget Estimate upward by ₹2.10 lakh crore between two consecutive editions of the same statement, and disclosed it as a footnote

This is a direct extension of §12, which found the footnote. **This section finds what the footnote
did.**

**Statement 18 of the Expenditure Profile** — *"TOTAL TRANSFER OF RESOURCES TO STATES AND UNION
TERRITORIES WITH LEGISLATURE (excluding States' share of Net Proceeds of Union Taxes and Duties)"* —
prints four columns each year: Actuals of *T−2*, Budget Estimates of *T−1*, Revised Estimates of
*T−1*, and Budget Estimates of *T*. So **each Budget Estimate is printed twice, in two consecutive
editions of the same numbered statement.** They should agree. For FY2023-24 they do not.

| line | Expenditure Profile **2023-24**, BE 2023-24 column | Expenditure Profile **2024-25**, BE 2023-24 column | difference |
|---|---|---|---|
| I. Some Important Items of Transfer | 1,83,613.38 | 1,83,613.38 | **0** |
| II. Finance Commission Grants | 1,65,480.00 | 1,65,480.00 | **0** |
| III.a Under Centrally Sponsored Schemes (Revenue) | 3,64,269.50 | **4,53,145.38** | **+88,875.88** |
| III.b Under Central Sector Schemes | 60,942.24 | 64,571.34 | +3,629.10 |
| III.c Under Other Categories of Expenditure | **1,681.27** | **1,33,764.38** | **+1,32,083.11** |
| III.d Capital Transfers | 103.00 | 103.00 | 0 |
| **III. Transfer to States [Other than (I)+(II)]** | **4,26,996.01** | **6,51,584.10** | **+2,24,588.09** |
| IV.c Other Categories of Expenditure (Revenue) — Delhi/Puducherry/J&K | 54,367.21 | 39,867.21 | **−14,500.00** |
| IV. Transfer to Delhi, Puducherry and Jammu & Kashmir | 65,336.99 | 50,836.99 | −14,500.00 |
| **Grand Total** | **8,41,426.38** | **10,51,514.47** | **+2,10,088.09** |

(₹ crore. Retrieved: `https://www.indiabudget.gov.in/budget2023-24/doc/eb/stat18.pdf` and
`https://www.indiabudget.gov.in/budget2024-25/doc/eb/stat18.pdf`.)

**The arithmetic closes exactly on both sides**, which is what makes this a restatement rather than
an error: each edition's head totals equal the sum of its own components (426,996.01 and
651,584.10 both check), and the Grand Total difference of 2,10,088.09 equals the head III difference
of 2,24,588.09 less the head IV difference of 14,500.00. **Two internally consistent documents,
published by the same office one year apart, give the same Budget Estimate for the same year as
₹8.41 lakh crore and ₹10.52 lakh crore.**

**Everything the Union says about this is one footnote.** The 2024-25 edition is the first to carry
`* includes releases made to States both through State Treasuries and implementing agencies`, and
it is attached to line III.a only (§12). **The footnote is attached to the ₹88,876 crore line and
not to the ₹1,32,083 crore line.** Line III.c, "Under Other Categories of Expenditure", was restated
from ₹1,681.27 crore to ₹1,33,764.38 crore — a **79-fold** restatement of a single line, and the
document offers no note at all for it. In the following editions III.c continues at that order of
magnitude (BE 2024-25 ₹1,43,876.23 crore; Actuals 2024-25 ₹1,53,594.84 crore) and the **2026-27
edition finally attaches a note to it**: *"# Compensation to States/UTs for revenue losses on roll
out of GST has been phased out w.e.f. 2026-2027"* — with BE 2026-27 for that line falling to
₹11,201.13 crore from ₹1,25,954.02 crore. **So the line that was silently inflated by ₹1.32 lakh
crore is, on the Union's own eventual note, predominantly GST compensation to States**, appearing
inside the transfers statement for the first time in the 2024-25 edition and disappearing from it
in 2026-27. **That is a second answer to part 01's forward reference** and it is a larger one than
the back-to-back loan finding at §7: GST compensation entered and left the Union's headline
"transfers to states" total by reclassification, two years apart, without either move being carried
in the total's own definition. Both moves change the denominator of every share computed against
it, including this part's headline series. **PR-5.**

**The ₹14,500.00 crore taken *out* of head IV is a round number**, which is what a single
reclassified item looks like rather than a rebasing. I did not establish what it was; it is recorded
as unresolved.

### 17. What the same statement shows about release discipline: the FY2024-25 regime change

Reading line III.a, "Under Centrally Sponsored Schemes (Revenue)", across eight consecutive
Expenditure Profiles — each figure taken from the edition in which it is the stated column, so that
BE is read from the year it was set and Actuals from the year they were closed:

| FY | BE, as first published | RE | Actual | RE ÷ BE | Actual ÷ BE |
|---|---|---|---|---|---|
| FY2018-19 | 2,77,759.85 | 2,77,413.57 | 2,71,478.36 | 99.9% | 97.7% |
| FY2019-20 | 2,92,002.57 | 2,83,057.35 | 2,75,428.24 | 96.9% | 94.3% |
| — **break: FC-XV award, 42%→41%** — | | | | | |
| FY2020-21 | 2,95,268.74 | 3,15,238.39 | 3,08,305.59 | 106.8% | 104.4% |
| — **break: SNA model** — | | | | | |
| FY2021-22 | 3,18,857.20 | 3,26,239.51 | 3,34,580.84 | 102.3% | 104.9% |
| FY2022-23 | 3,33,086.65 | 3,46,992.48 | **4,05,918.12** | 104.2% | **121.9%** |
| — **break: the §16 restatement of the line's definition** — | | | | | |
| FY2023-24 | 3,64,269.50 **→ restated 4,53,145.38** | 4,39,314.07 | 4,25,295.58 | 96.9% ‡ | 93.9% ‡ |
| FY2024-25 | 4,79,604.86 | 3,92,724.72 | **3,82,335.71** | **81.9%** | **79.7%** |
| FY2025-26 | 5,14,442.45 | **3,99,854.32** | *(not yet closed)* | **77.7%** | — |
| FY2026-27 | 5,20,333.39 | — | — | — | — |

(₹ crore. ‡ computed on the restated BE, which is the only basis on which the RE and Actual are
comparable. On the BE as first published the same year reads 120.6% and 116.8%.)

**Two findings, and the second is the larger.**

1. **The FY2022-23 Actual is the first figure published under the broadened definition**, and it
   exceeds its own Budget Estimate by 21.9% where no prior year in the run exceeds it by more than
   4.9%. That is the definitional break of §16 arriving in the Actuals column, one edition before
   it arrives in the BE/RE columns. **It follows that the Actual-over-BE comparison for FY2022-23 is
   not a measure of anything, and that §7's CSS column may contain an unflagged definitional break
   between FY2021-22 and FY2022-23.** See the correction note at §18 — **I have not established
   that the Actuals were restated, only that the estimates were, and the direction of the FY2022-23
   residual is consistent with the Actuals having been on the broader basis throughout.** Recorded
   as an open provenance question, not as a finding.
2. **FY2024-25 and FY2025-26 are the only two years in the eight-year run in which the Revised
   Estimate cuts the centrally sponsored schemes transfer line at all materially, and both cut it by
   about a fifth.** In FY2024-25 the Union budgeted ₹4,79,604.86 crore for CSS transfers to States
   and spent ₹3,82,335.71 crore — **₹97,269.15 crore, 20.3% of the Budget Estimate, not
   transferred**. In FY2025-26 the Revised Estimate is ₹1,14,588.13 crore, 22.3%, below the Budget
   Estimate. In the six preceding years the RE never departed from the BE by more than 6.8% and
   departed downward only twice, by 0.1% and 3.1%. **Both of the anomalous years are in T3.** This
   is a T1 quantity, published by the Union, in its own transfers statement, and it is the single
   cleanest measure in this part of the gap between what the Union budgets for States and what it
   sends them.

**The whole of head III moves with it**: BE 2025-26 ₹7,17,041.50 crore → RE 2025-26 ₹4,98,159.00
crore, a cut of **₹2,18,882.50 crore (30.5%)**, of which ₹1,14,588.13 crore is the CSS line and
₹95,540.49 crore the "Other Categories" (GST compensation) line. **The Grand Total of the whole
statement — every non-devolution transfer to every State and UT with legislature — falls from
₹11,37,320.41 crore at BE 2025-26 to ₹9,43,172.86 crore at RE, a cut of ₹1,94,147.55 crore inside a
live year.** Set that against §8: **it is not the tied money that has been protected. It is that
the untied share rises partly because the tied money is being cut in-year**, which is a very
different mechanism from the one the Fourteenth Finance Commission designed, and produces the same
sign in the share.

### 18. Correction notes and one completed sweep

**Correction note to §7 and §8 (appended, not applied — the original lines stand).** The CSS column
of §7 and the "CSS share of total transfers" column of §8 are read from *Budget at a Glance*, which
takes them from Statement 18. §16 establishes that the Statement 18 CSS line changed definition in
the Expenditure Profile 2024-25. **The Actuals published for FY2022-23 and later are therefore
certainly on the post-change basis, and the Actuals for FY2021-22 and earlier may or may not be.**
Until that is settled, **the CSS share series in §8 must carry a possible break at
FY2021-22/FY2022-23** in addition to the breaks already marked, and the statement at §8 point 3
that "the CSS share of total transfers *fell* across the whole period, from 24.15% in FY2017-18 to
17.18% in FY2024-25" should be read as **conservative**: if the earlier years are on a narrower
basis than the later ones, the true fall is larger than stated, not smaller. The direction of the
finding is safe; its magnitude is a lower bound. **The correction does not change any number printed
in §7 or §8 and none has been altered.**

**Correction note on the M1 host record.** The head of this file records
`www.indiabudget.gov.in` at 164.100.85.252 and reports that the resolver "was never the problem".
In the resumed session **the system resolver was the problem** — it returned nothing for every host
tried — and the host now resolves through Akamai to 94.202.207.57 / 94.202.207.51 on 1.1.1.1. Both
records are true of their own session. **The operational rule for later parts is to assume neither
and to run both escalations.**

**Completed sweep: absence A6, referred to this part by part 07 — "the Union Budget's Expenditure
Profile has no by-state transfer statement; part 04 should settle whether one ever existed."**

**The needle.** I searched for the proposition *"the Union Budget's expenditure-side documents
contain, in some year, a statement decomposing transfers to States by State."*

**The corpus and the method.** Every statement of the **Expenditure Profile 2026-27** (statements 1,
4A, 4AA, 4B, 4C, 4D, 5, 6, 7, 8, 9, 11–27 — every URL that returns 200 under `/doc/eb/statN.pdf`;
statements 2, 3, 4 and 10 do not exist in that year) and every statement of the **Expenditure Budget
Vol. I for 2013-14 and 2015-16** (statements 10–23 in both, the full published range), fetched as
PDFs and read with `pdftotext -layout`, then grepped for the names of ten large States.

**The positive control, which is the whole value of the sweep.** The grep is not blind: **it
returns 53 hits in Statement 19 of the Expenditure Profile 2026-27, 73 in Statement 19 of the
Expenditure Budget 2013-14, and 83 in Statement 19 of 2015-16.** Statement 19 is *"Externally Aided
Projects"*, and its **Part-II(i), "Additional Central Assistance (ACA) to States for Externally
Aided Projects (EAPs)"**, is a project-by-project listing in which the State is identifiable on the
face of each row — *"Bihar State Highway II Project"*, *"West Bengal Development Finance
Programme"*, *"Tamil Nadu Urban Infrastructure Project"*, *"Karnataka State Highway Improvement
Project"* — with loan amount, utilisation to a stated date, and year columns. **The corpus can
carry a State dimension, the format exists, and it has existed continuously since before 2013.**

**The result.** Outside Statement 19, no statement in either corpus carries a State dimension for
transfers. The incidental hits are Statements 14/15/25/26 (public enterprises, where the State
appears in a company's name), Statement 9 (grants to private institutions, where it appears in an
address), and Statement 4AA (where the six SNA SPARSH pilot States are named in a head note). The
old **Statement 18, "Direct Transfer of Central Plan Assistance to State/District Level"** — the
statement whose entire subject was the money that bypassed State budgets — is organised by
**Ministry, Department and scheme with a Major Head column, and has no State column at all**. The
old **Statement 16 ("Central Assistance for State and Union Territory Plans")** and **Statement 17
("Plan Grants and Loans to State & Union Territory Governments")** are likewise Ministry- and
scheme-wise; Statement 17's own top line is "CENTRAL ASSISTANCE TO STATE PLAN" and it decomposes it
by Ministry, not by State. **Statement 10 ("Non-Plan Grants and Loans to State & U.T. Governments")
has rows headed "STATE GOVERNMENTS" and "UNION TERRITORIES" and then decomposes each by Ministry.**

**So A6 is settled, and the answer is sharper than "no".** The Union Budget has never published a
by-State decomposition of its transfers to States on the expenditure side — **except for the money
lent to India by the World Bank, the ADB and JICA, which it publishes by project and therefore by
State, and has done throughout.** The distinguishing feature of the one category that is published
by State is that a foreign lender requires the accounting. **The capability, the format and the
statement number all exist; they are applied to the transfers a third party audits and not to the
transfers only the Union audits.** §Absences A-2/A-6.

---

## Candidate series

**House-style note on units, which is load-bearing here more than anywhere.** Every series below is
a **share of a transfer aggregate or a nominal ₹ crore amount**. *No series in this part is offered
as a ratio to GDP*, per the phase rule — and in this part the rule is not a formality: §7 shows the
transfer aggregate itself carries at least three defensible definitions and §16 shows the Union
restated one of them by ₹2.10 lakh crore without changing its name. **A GDP ratio computed over
this material would be a ratio of two numbers neither of which is stable, and it would conceal
which.** The denominator therefore lives in the unit string and must be carried into the record
verbatim.

**Periodisation applied to every series below**: FY2014-15/FY2015-16 (routing base shift **and** the
32%→42% award, coincident — they cannot be separated and the break must be labelled as both);
FY2019-20/FY2020-21 (42%→41%); FY2020-21/FY2021-22 (SNA model); FY2022-23/FY2023-24 (SNA SPARSH
begins Aug 2023, phased to Nov 2025); and — **new from §16, and not anticipated by stage 1** —
FY2023-24/FY2024-25, the Statement 18 definitional restatement. Part 07 additionally reports a
FY2025-26/FY2026-27 break from the Sixteenth Finance Commission award.

| id | name | unit (the denominator is part of the unit) | calendar | period | points retrieved | breaks | instrument |
|---|---|---|---|---|---|---|---|
| `untied-share-total-transfers` | Untied share of total Union transfers to States and UTs | **per cent — States' share of the net proceeds of Union taxes (Article 270 devolution) as a percentage of the Union Budget's own "Total Transfer to States/UTs", i.e. devolution *plus* every non-devolution transfer to States *and* UTs with Legislature, gross of loans** | Indian FY | FY2015-16 → FY2024-25 | FY2015-16 **60.66** · FY2016-17 **61.68** · FY2017-18 **62.02** · FY2018-19 **63.70** · FY2019-20 **56.80** · FY2020-21 **45.07** · FY2021-22 **52.67** · FY2022-23 **50.86** · FY2023-24 **54.70** · FY2024-25 **57.82**. Derived by division from the T1 nominal figures in §7; inputs are Actuals, not estimates | FY2014-15/15-16 (routing base **and** 32→42%); FY2019-20/20-21 (42→41%); FY2020-21/21-22 (SNA); **FY2023-24/24-25 (§16 restatement of the denominator)** | Union Budget, *Budget at a Glance*, "Transfer of Resources to States and Union Territories with Legislature", each year's Actuals read from the budget presented two years later. **T1.** |
| `untied-share-total-transfers-states-only` | Untied share, UT block removed from the denominator | **per cent — Article 270 devolution as a percentage of total transfers to States only (head IV, "Transfer to Delhi, Puducherry and Jammu & Kashmir", removed from the denominator)** | Indian FY | FY2015-16, FY2018-19, FY2020-21, FY2021-22, FY2024-25 (sensitivity points only) | 61.06 · 64.13 · 46.87 · 54.30 · 59.43 | as above | Same. **T1 inputs, derived.** **Devolution goes only to States; including UT transfers in the denominator biases the share down. This is the more defensible denominator and the less commonly used one.** |
| `untied-share-transfers-ex-loans` | Untied share, loans removed from the denominator | **per cent — Article 270 devolution as a percentage of total transfers less loan instruments (back-to-back GST compensation loans; Special Assistance as Loan to States for Capital Investment)** | Indian FY | FY2015-16, FY2018-19, FY2020-21, FY2021-22, FY2024-25 | 60.66 · 64.99 · 50.80 · 59.09 · 63.03 | as above | Same. **T1 inputs, derived.** Spread against the headline series is **5.2 points in FY2024-25 and 6.4 points in FY2021-22** — i.e. the choice of denominator moves the answer by more than the FC-XV award did |
| `transfers-total-states-uts` | Total Union transfers to States and UTs with Legislature | ₹ crore, nominal, Actuals, Union Budget definition (devolution + all other transfers, gross of loans) | Indian FY | FY2015-16 → FY2024-25 | 8,34,483 · 9,85,674 · 10,85,130 · 11,95,394 · 11,45,487 · 13,20,053 · 17,05,610 · 18,64,615 · 20,64,829 · 22,25,513 | as above | *Budget at a Glance*, per §7. **T1.** |
| `transfers-tax-devolution` | States' share of the net proceeds of Union taxes | ₹ crore, nominal, Actuals | Indian FY | FY2015-16 → FY2024-25 | 5,06,193 · 6,08,000 · 6,73,006 · 7,61,454 · 6,50,678 · 5,94,997 · 8,98,392 · 9,48,406 · 11,29,494 · 12,86,885 | FY2014-15/15-16 (32→42%); FY2019-20/20-21 (42→41%) | *Budget at a Glance*, per §7; state-wise decomposition in Receipts Budget Annex 4B. **T1.** **Part 02 owns this quantity; it is carried here only as the numerator.** |
| `css-transfers-revenue-states` | Transfers to States under Centrally Sponsored Schemes (Revenue) | ₹ crore, nominal, **Actuals**, Statement 18 head III.a — **note this line's definition changed in the Expenditure Profile 2024-25 (§16)** | Indian FY | FY2015-16 → FY2024-25 | 1,75,736 · 2,25,848 · 2,62,043 · 2,71,478 · 2,75,428 · 3,08,306 · 3,34,581 · 4,05,918 · 4,25,296 · 3,82,336 | all the above **plus a possible unflagged break at FY2021-22/FY2022-23 (§18 correction note) — not established, carry it as suspected** | *Budget at a Glance* / Expenditure Profile Statement 18. **T1.** |
| `css-share-total-transfers` | CSS share of total transfers | **per cent — Statement 18 head III.a as a percentage of total transfers to States and UTs** | Indian FY | FY2015-16 → FY2024-25 | 21.06 · 22.91 · 24.15 · 22.71 · 24.04 · 23.36 · 19.62 · 21.77 · 20.60 · 17.18 | as `css-transfers-revenue-states` | Derived from §7. **T1 inputs.** |
| `fc-grants-share-total-transfers` | Finance Commission grants share of total transfers | per cent of total transfers to States and UTs | Indian FY | FY2015-16 → FY2024-25 | 10.14 · 9.69 · 8.50 · 7.84 · 10.80 · 13.94 · 12.16 · 9.27 · 7.19 · **5.43** | FC award boundaries | Derived from §7. **T1 inputs.** **This is the series that falls furthest and most monotonically in the whole part** — FC grants are now 5.4% of transfers against 10.1% in the first post-award year. **Part 02 should carry it if it wants it; it is offered here because it is the third leg of the decomposition.** |
| `css-transfers-actual-over-be` | CSS transfers to States: Actual as a percentage of the Budget Estimate as first published | **per cent — Statement 18 head III.a Actual ÷ the same line's Budget Estimate as printed in the edition that set it** | Indian FY | FY2018-19 → FY2024-25 (Actuals); FY2025-26 on RE only | FY2018-19 **97.7** · FY2019-20 **94.3** · FY2020-21 **104.4** · FY2021-22 **104.9** · FY2022-23 **121.9** *(definitional, see §17)* · FY2023-24 **93.9** *(on the restated BE)* · FY2024-25 **79.7** · FY2025-26 **77.7** *(RE÷BE; year not closed — must not be plotted as an Actual)* | **FY2023-24/FY2024-25 — and it is this series' whole point.** Also the FY2022-23 definitional break | Expenditure Profile Statement 18, eight consecutive editions, each figure read from the edition in which it is the stated column. **T1.** |
| `css-transfers-be-to-re-cut` | In-year cut to budgeted CSS transfers to States at Revised Estimates | ₹ crore, nominal (BE − RE), Statement 18 head III.a | Indian FY | FY2018-19 → FY2025-26 | FY2018-19 +346 · FY2019-20 +8,945 · FY2020-21 −19,970 · FY2021-22 −7,382 · FY2022-23 −13,906 · FY2023-24 +13,831 · FY2024-25 **+86,880** · FY2025-26 **+1,14,588** (positive = cut) | as above | Same. **T1.** |
| `direct-to-agency-releases` | Central plan assistance released directly to State/district-level implementing agencies, bypassing State budgets | ₹ crore, nominal, GRAND TOTAL of Expenditure Budget Vol. I Statement 18 (the *old* Statement 18) | Indian FY | FY2011-12 → FY2013-14 | FY2011-12 **1,09,173.13** · FY2012-13 **1,04,971.35** · FY2013-14 **1,12,707.83** · FY2014-15 **0.00 / nil** | **Discontinued instrument.** The statement was abolished; "Statement 18" was reassigned to a different subject by 2016-17 and the series was never continued or replaced | Expenditure Budget Vol. I 2013-14, 2014-15 (interim and full), 2015-16. **T1.** **Do not extend past FY2014-15. The §12 footnote establishes that direct-to-agency releases did not stop — only their measurement did.** |
| `special-assistance-loan-capital-investment` | Special Assistance as Loan to States for Capital Investment | ₹ crore, nominal, Actuals, Statement 18 head I | Indian FY | FY2020-21 → FY2024-25 | FY2020-21 **11,830.29** · FY2021-22 **14,185.78** · FY2022-23 **81,195.34** · FY2023-24 **1,09,554.30** · FY2024-25 **1,49,483.73**; BE 2025-26 1,50,000.00, RE 1,44,000.00, BE 2026-27 1,85,000.00 | Instrument did not exist before FY2020-21. Renamed from "…for Capital **Expenditure**" to "…for Capital **Investment**" between the 2024-25 and 2025-26 editions — a name change, not a break | Expenditure Profile Statement 18 head I.f/I.h across editions; Demand No. 42 SBE. **T1.** **This is the instrument that grew where CSS did not** (§8 point 3): 12.6× in four years, 6.7% of all transfers in FY2024-25, and it is a **loan conditioned on reform milestones**, counted inside a total called "transfer" |
| `sna-sparsh-schemes-onboarded` | Centrally sponsored schemes onboarded to SNA SPARSH | count of schemes, against a stated denominator of notified schemes | as at a date, not a fiscal year | one point: **50 of 81 notified, at 31 December 2025** | — | — | Expenditure Profile 2026-27, Statement 4AA Part B. **T1. One point. Do not author as a series** — the instrument has published this once and the denominator ("notified CSS") is itself a §5 quantity |

**Series I deliberately do NOT propose, and the reason matters.**

- **`css-scheme-count`.** §5 establishes that "the number of centrally sponsored schemes" is a
  `never-defined` quantity: 66, 50, 30, 28, 28-on-different-tiers, 131, 130, 65, 81, 86 are all T1
  figures for overlapping populations on incompatible units of account, and the Fifteenth Finance
  Commission itself records that *"there seemed to be confusion about the number of existing CSS"*.
  **A series here would manufacture a trend out of a change in the unit of account.** The counts
  belong in the ledger record for the 2015-16 restructuring and in §Absences A-1, as *counts with
  their definitions attached*, not as a time series.
- **Any per-State untied share.** §9 establishes the numerator is published per State and the
  denominator is not. **The quantity is not computable from the Union Budget for any State**
  (§Absences A-2). Parts 06 and 07 must not be read as supplying it.
- **Any splice across FY2014-15/FY2015-16.** The FY2013-14 and FY2014-15 figures at §7 are
  reported on a different instrument, net of recoveries of loans and advances, and with ₹1.13 lakh
  crore of tied money outside the total. The restated FY2013-14 figure of **50.45%** at §8 is an
  **illustration of the definitional gap and is expressly not offered as a series point.**

---

## Candidate ledger records

*(Each: what happened; the objective stated at announcement if any; the strongest case for and the
strongest case against, each in its own terms; and whether the two accounts differ on facts or on
the weighting of agreed facts.)*

### LR-1 — The routing change: centrally sponsored scheme money moved from implementing agencies into State Consolidated Funds, FY2014-15

**What happened.** Until FY2013-14 the Union released a large volume of centrally sponsored scheme
money **directly to State- and district-level implementing agencies and autonomous bodies**,
bypassing State budgets and State legislatures — **₹1,12,707.83 crore in FY2013-14 alone**, on the
Union's own last published count. From FY2014-15 that channel was budgeted at zero and the money was
routed through State Consolidated Funds. **The decision was taken before the change of government**:
the Interim Budget of February 2014 already shows `0.00` in every BE 2014-15 cell of the
direct-transfer statement; the Fourteenth Finance Commission's own footnote says *"The Interim Budget
2014-15 reversed this by announcing fund flow through the Consolidated Fund of the States"*; and the
Sub-Group of Chief Ministers dates the mandate to the **June 2013 restructuring of CSS** (§2).

**Objective stated at announcement.** The Sub-Group records the stated ground as *"the view of many
States"* — that assistance should flow to the Consolidated Funds of the States and be classified as
Central Assistance to State Plan. The objective was legislative visibility and State control of
scheme money.

**Strongest case for.** It ended a practice under which a State's legislature could not see, vote on
or audit a substantial share of the public money spent inside the State. It brought roughly ₹1.1
lakh crore a year inside the constitutional appropriation machinery of the States. It was demanded
by States, granted before any Finance Commission required it, and — this is the strongest single
point — it made the Union's transfers to States **measurable for the first time**, because a
transfer into a Consolidated Fund appears in the Finance Accounts of both governments.

**Strongest case against.** The change is what makes the pre- and post-2015 record incomparable, and
it has been used ever since to make the compositional shift look larger than it was: the naive
published-to-published comparison at §8 point 4 reads FY2013-14 as 61.42% untied and FY2024-25 as
57.82%, while the restated comparison reads 50.45% and 57.82% — **the sign of the whole finding
flips on the choice, and nothing in the Union's documents tells a reader which comparison is
meaningful.** Second, and worse: **the routing change did not end direct-to-agency releases.** On the
Union's own footnote, added in 2024 and quoted at §12, the CSS line *"includes releases made to
States both through State treasuries and other implementing agencies"* — so the practice continued
and only its separate measurement was discontinued. **What was abolished in FY2014-15 was a
statement, and the thing the statement measured is on the Union's own account still happening,
unmeasured.**

**Different facts or different weightings?** **Different facts, and they are settleable.** Whether
direct-to-agency releases ended in FY2014-15 is a question with an answer, and the Union's 2024
footnote answers it: no. The disagreement survives only because the two answers are eleven years and
one abolished statement apart.

### LR-2 — The abolition of the direct-transfer statement

**What happened.** Statement 18 of the Expenditure Budget Vol. I, *"Direct Transfer of Central Plan
Assistance to State/District Level"*, published a scheme-by-scheme account of the money that bypassed
State budgets. Its last figure is **₹1,12,707.83 crore for FY2013-14**. By the Expenditure Budget
Vol. I of 2016-17 the number "Statement 18" had been reassigned to *"Statement showing position of
Major Reserve Funds operated in the Public Account"*. **The statement was not replaced and the
quantity has never been published again** (§2).

**Objective stated at announcement.** **None was stated.** No note in any budget document I read
announces the discontinuation, explains it, or points to a successor. The statement simply stops
appearing and its number is reused.

**Strongest case for.** If the channel had genuinely closed, a statement measuring it would report
zeros in perpetuity and its retirement would be housekeeping. The 2014-15 and 2015-16 volumes do
show nil, which is exactly what a closed channel looks like.

**Strongest case against.** The channel had not closed — the Union says so itself in 2024 (§12) —
and by then there had been **eight budgets** in which the reader had no way to know it. The
discontinuation is also the load-bearing cause of the one thing this part cannot do: **there is no
instrument, at any point after FY2013-14, that separates money reaching a State's Consolidated Fund
from money reaching an agency inside the State.** The gap of **₹0.66 lakh crore to ₹1.0 lakh crore
a year** between the CAG's grants-in-aid figure and the Budget's CSS figure (§11) is very plausibly
exactly that unmeasured channel, and it cannot be confirmed because the measurement was retired.

**Different facts or different weightings?** **Different facts.** One account says the thing measured
ceased; the other says the measurement ceased. The Union's own footnote supports the second.

### LR-3 — The 2015-16 restructuring: 66 schemes into 28 umbrellas, with fixed tier ratios

**What happened.** Following the first NITI Aayog Governing Council meeting of 8 February 2015, a
**Sub-Group of Chief Ministers** was constituted on 9 March 2015 under the Chief Minister of Madhya
Pradesh, with ten Chief Ministers and one Lt. Governor as members, and reported in **October 2015**.
It recommended reducing 66 CSS to **a maximum of 30 umbrella schemes** on a fixed sharing pattern
(Core 60:40, 90:10 for the 8 NE and 3 Himalayan States; Optional 50:50, 80:20; Core-of-the-Core
unchanged) and raising flexi-funds from 10% to **25%**. The Union adopted the structure in the
2016-17 budget with **28** umbrella schemes and the Sub-Group's tier ratios — but with a proviso, at
paragraph 6 of the Expenditure Budget's own Introductory Notes: *"In case a scheme/sub-scheme in the
above list has a Central Funding pattern of less than 60:40, the existing funding pattern will
continue"* (§4).

**Objective stated at announcement.** The Union's own framing, quoted by the Sub-Group: *"post-14th
FC devolution, the BE for Central Assistance to State Plan (CASP) has been reduced from Rs. 3.38 lakh
cr in 2014-15, to Rs. 2.05 lakh cr in 2015-16. The BE for CSS has reduced from Rs. 2.52 lakh cr to
about Rs. 1.69 lakh cr"*, against *"additional devolution of Rs. 1.78 lakh cr"* — i.e. the stated
objective was to convert tied scheme money into untied devolution, exactly as the FC-XIV
recommended.

**Strongest case for, in the Union's own arithmetic.** A **₹0.83 lakh crore cut in budgeted CSS
against a ₹1.78 lakh crore rise in budgeted devolution**, both BE-to-BE, both in the same document,
on the same page. **The compositional shift was delivered and over-delivered at the moment of
award**, and §8 confirms it landed in the Actuals: the untied share rose **+10.6 points in one
year**, from 50.03% to 60.66%, and peaked at 63.70% in FY2018-19. The process was also genuinely
federal in form: the design came from a Sub-Group of Chief Ministers of ten States including
Kerala, Rajasthan, Telangana and Jammu & Kashmir, not from the Union alone, and the tier ratios
adopted are the Sub-Group's own.

**Strongest case against.** Three points, all on the primary record. **(i) The 60:40 was a ceiling on
the Union's share, not a floor.** Paragraph 6 preserves any pattern *below* 60:40 and none above it,
so the reform could only move the Union's share down or leave it — which is the Fifteenth Finance
Commission's later complaint at para 12.51(v) that *"the funding pattern of the CSSs should be fixed
upfront in a transparent manner and should be kept stable"*, i.e. that it was not. **(ii) The
Sub-Group's central recommendation on flexibility was not adopted**: it asked for flexi-funds of
**25%** of each scheme's allocation and the Department of Expenditure's guideline stood at 10%.
**(iii) The reduction from 66 to 28 is partly a change in the unit of account, not a reduction.**
The Department of Expenditure's own subsequent count of the same population was **131** and the
Fifteenth Finance Commission recorded that *"there seemed to be confusion about the number of
existing CSS"* (§5). Umbrellas containing an unenumerated number of sub-schemes are not fewer
schemes; they are the same schemes with a different header.

**Different facts or different weightings?** **Both, in different places.** On the money it is a
weighting dispute — nobody contests the ₹0.83 lakh crore and ₹1.78 lakh crore; the dispute is
whether a compositional shift inside a fixed envelope is a gain to States. On the scheme count it
is a **factual** dispute, and the primary documents settle it against the "66 to 28" framing.
**On the tier composition there is a straight factual disagreement between two T1 documents:** the
Union Budget's own annexes give 6 core-of-the-core + 19 core + 3 optional, and the Fifteenth Finance
Commission gives 6 + 20 + 2. Both total 28; they differ on which tier one scheme sits in, and the
tier fixes the funding ratio (PR-4).

### LR-4 — The Single Nodal Agency model (FY2021-22) and SNA SPARSH (from August 2023)

**What happened.** From FY2021-22 every State designates, per scheme, **one Single Nodal Agency**
holding a commercial-bank account into which all scheme funds flow, with subsidiary implementing
agencies drawing on zero-balance accounts; State treasuries are integrated with PFMS. From August
2023 the **SNA SPARSH** module replaced bulk release with claim-based release, so that both
Consolidated Funds are debited *"only when an actual claim is raised from the State"*. Rollout: pilot
in six States and two schemes (Aug 2023) → 14 States and 23 CSS (May 2024) → NE States and three UTs
with legislature (Dec 2024) → 37 CSS (Jun 2025) → the remainder (Nov 2025); **50 of 81 notified CSS
onboarded at 31 December 2025** (§3).

**Objective stated at announcement.** The Union's own head note: *"enhancing visibility and
transparency in fund flows to States … just-in-time release of scheme funds to States based on the
pace of expenditure."* And on SPARSH, its own diagnosis of the model it had introduced three years
earlier: the SNA model *"resulted in transfer of balances outside the Consolidated Fund of India and
the Consolidated Fund of the State(s) into the SNA bank accounts where the released funds remain
idle until their final utilization"*, with bulk releases causing *"cash mismatch in RBI accounts
which were bridged by borrowed funds"*.

**Strongest case for, and it is evidenced.** The parking problem was real and the Union's own
Statement 4AA measures it: at 31 December 2025, for **four of the seven largest schemes** the money
sitting idle in SNA accounts and State treasuries **exceeded the money released in the year** —
Swachh Bharat Mission-Urban ₹2,951.23 crore idle against ₹1,006.11 crore released; PM Gram Sadak
Yojana ₹3,002.49 crore against ₹2,535.76 crore; Jal Jeevan Mission ₹5,516.66 crore against ₹31.00
crore (§13). Just-in-time release against actual claims is the textbook answer to that, it removes a
real interest cost borne by the Union's borrowing programme, and it puts a scheme's cash position on
one system visible to both governments.

**Strongest case against.** Three points. **(i) It is a reporting-base shift and the Union does not
say so.** "Released" means money left the Consolidated Fund of India (pre-2021), money entered a
commercial-bank account outside both Consolidated Funds (SNA), and a claim was raised and paid
(SPARSH) — three different events under one word, with no bridging series published. **A release
series spanning FY2020-21 to FY2025-26 is not a series** (§3). **(ii) Just-in-time release converts a
budgeted allocation into a claim**, and a claim can be declined. The mechanism that removes idle
balances is the same mechanism that removes a State's certainty about when money arrives — which is
precisely the Fifteenth Finance Commission's stated concern that *"clarity and stability in the share
of the Union Government in CSS is important for the fiscal arithmetic of the States."* **(iii) The
instrument reporting it is itself unstable**: Statement 4AA has been used for two unrelated subjects
and has twice not existed, so the SNA data begin in 2025-26 with no comparable prior series (§3).

**Different facts or different weightings?** **Different weightings of agreed facts.** Both accounts
accept the parking measurements and both accept the claim-based mechanism. They differ on whether
removing a State's float is discipline or leverage — and that is a question about the Union's future
conduct, on which the FY2024-25 and FY2025-26 release record (§17) is the only evidence either way.

### LR-5 — Jal Jeevan Mission, FY2025-26: a scheme's funding collapsing inside a live budget

**What happened.** The Jal Jeevan Mission / National Rural Drinking Water Mission was budgeted at
**₹67,000.00 crore** in BE 2025-26, revised to **₹17,000.00 crore** at Revised Estimates, and **₹31.00
crore had been released by 31 December 2025** — 0.05% of the Budget Estimate and 0.18% of the Revised
Estimate, nine months into the year. Meanwhile ₹5,371.12 crore of previously released JJM money sat
in SNA accounts and ₹145.54 crore in State treasuries (§13). In the same statement PMAY-Rural stood
at 22% of BE released and PM Gram Sadak Yojana at 13%.

**Objective stated at announcement.** None is stated in the instrument. Statement 4AA reports the
figures without narrative; the Budget documents I read carry no note explaining the JJM revision.

**Strongest case for.** ₹5.5 thousand crore of JJM money already released was lying unspent at the
same date. A government that keeps releasing against unspent balances is financing idle cash with
borrowed money, which is exactly the defect SNA SPARSH was built to fix (LR-4). On that reading the
₹31 crore is the new mechanism working: releases now follow claims, and the claims did not come.

**Strongest case against.** ₹5,516.66 crore idle does not explain a ₹50,000 crore revision and a
₹66,969 crore shortfall against the Budget Estimate. The scale is two orders of magnitude apart. And
the cost of an in-year collapse of this size does not fall on the Union: **States have already
staffed, tendered and contracted against a published Budget Estimate**, and a 60:40 or 90:10 scheme
obliges them to have appropriated their own matching share against it. **A Budget Estimate that a
State must budget against, and that the Union may reduce by three-quarters in-year without stating a
reason, is not a plannable instrument** — which is the Fifteenth Finance Commission's para 12.51(v)
complaint in its concrete form.

**Different facts or different weightings?** **Different weightings, with a factual gap.** The
figures are the Union's own and undisputed. What is missing from every instrument I retrieved is
**any statement of reasons for the revision**, and without it neither account can be tested. That
absence is A-4.

### LR-6 — MGNREGA replaced by VB-G RAM G, BE 2026-27

**What happened.** The Statement of Budget Estimates for Demand No. 87 (Department of Rural
Development) carries, for BE 2026-27, a new line **"Viksit Bharat–Guarantee for Rozgar and Aajeevika
Mission (Gramin)" at ₹95,692.31 crore**, while **MGNREGA–Programme Component falls from ₹88,000.00
crore at RE 2025-26 to ₹30,000.00 crore** and the Transfer to the National Employment Guarantee Fund
line goes to "…" (§14). The Budget's own note describes VB-G RAM G as *"a Centrally Sponsored Scheme
with the fund sharing ratio of **60-40** between the Centre and States for all states and **90-10**
for NER States, Himalayan States & UTs with legislature and **100% central share** for Union
Territories (UT) without legislature … for providing statutory guarantee of one hundred and
twenty-five (125) days of wage employment in every financial year to every rural household."*

**Objective stated at announcement.** As quoted: a statutory guarantee raised from 100 to **125
days**, delivered as a Centrally Sponsored Scheme on the 2016 tier ratios.

**Strongest case for.** The guarantee is **increased by a quarter**, from 100 to 125 days. The total
budgeted provision for the successor (₹95,692.31 crore) **exceeds** the highest MGNREGA provision in
the series (₹88,000.00 crore at RE 2025-26). And placing the scheme on the standard 60:40 / 90:10
tier structure adopted in 2016 is the Fifteenth Finance Commission's own recommendation (v) being
implemented: a funding pattern *"fixed upfront in a transparent manner"* rather than the ad hoc
mixture MGNREGA's wage/material/administrative split produced.

**Strongest case against, and it is the sharpest single point in this part.** MGNREGA sat in the
**Core of the Core** tier — the six schemes whose *"existing funding pattern … have been retained"*
expressly because they were not to be exposed to State matching (§4). The Union's own budget note
says that under the 2005 Act *"100% wage payment within 15 days of work done is the liability of
Central Government"* (§14). **Moving the same guarantee to a 60:40 Centrally Sponsored Scheme
converts a wage liability the Union describes as wholly its own into one on which a State must find
40 paise in the rupee** — and it does so for a guarantee the State did not enact and cannot vary.
The budgeted increase is therefore not comparable: ₹95,692.31 crore at 60% Union share implies a
State obligation of roughly ₹63,795 crore on top, where ₹88,000.00 crore at a 100% wage share did
not. **On the tier alone, this is the largest single movement of money from the untied to the tied
side of a State's budget in the period this part covers**, and it operates on the one scheme the
2016 restructuring had specifically protected.

**Different facts or different weightings?** **This one turns on a fact I have not established** —
what instrument creates the 125-day guarantee, whether it amends or repeals the 2005 Act, and
whether the Act's characterisation of the wage component as a 100% Central liability survives it.
Until that is settled the case against is stated at its strongest and marked as resting on the
Budget's note alone. See §Sources NOT retrieved and §FORWARD REFERENCES.

---

## Candidate provenance records

*(Every quantity in this part where two instruments disagree. Each entry names both instruments,
gives the size of the disagreement, and says whether it is **definitional** — the instruments measure
different objects — or **evidentiary** — they measure the same object and one is wrong.)*

### PR-1 — "Total transfers to States" means two things in one budget, ₹77,000 crore apart

**The quantity.** Total resources transferred to States, BE 2026-27.

**The instruments, both inside *Budget at a Glance 2026-27*.** The prose at paragraph 6: *"Total
resources being transferred to the States including the devolution of State's share, Grants/Loans
and releases under Centrally Sponsored Schemes, etc. in BE 2026-27 is **₹25,43,769 crore**."* The
table two pages later, `bag3.pdf`, "Total Transfer to States/UTs", BE 2026-27 = **₹26,20,769 crore**.

**The difference is ₹77,000 crore and it is exactly head V**, "Total Transfer to Delhi, Puducherry and
Jammu & Kashmir", BE 2026-27 = ₹76,999.80 crore. **Definitional**: the prose means *States*, the
table means *States and UTs with Legislature*, both are called "total transfers to States", and
nothing in the document says which is which. **Consequence for this part: every share in §8 is
computed on the table's definition, which is the one that includes UTs and therefore the one that
biases the untied share down.** The States-only variant is carried as a separate series with the
denominator in its unit string.

### PR-2 — Total Union expenditure cannot be used as a denominator for transfers, and the Budget's own note says it can

**The quantity.** Whether States' share of taxes is inside or outside total Union expenditure.

**The instruments.** *Budget at a Glance 2026-27* note: *"Total expenditure is inclusive of States'
share of taxes and duties which have been netted against receipts in the table on page 1."* Against
that, the Receipts Budget Annex 1 line **"Tax Revenue (Net of States' share)"** and the deficit
identity printed in the same document: total expenditure FY2024-25 Actuals 46,52,867 less revenue
receipts 30,36,619 less non-debt capital receipts 24,617 + 17,202 = **15,74,429**, which is the
fiscal deficit as reported. **The identity only closes if devolution is *outside* the expenditure
total.**

**Evidentiary, and the note is wrong on its own document's arithmetic.** The operative consequence
is a rule this part obeys: **total Union expenditure must not be used as a denominator for total
transfers.** Any part that wants a "transfers as a share of Union spending" figure must state which
of the two constructions it used, and the two differ by the whole of devolution — ₹12.9 lakh crore
in FY2024-25.

### PR-3 — The CAG and the Union Budget disagree about CSS transfers by up to ₹1 lakh crore, and agree to the rupee on Finance Commission grants

**The quantity.** Grants to States under centrally sponsored schemes, by year.

**The instruments.** **CAG Report No. 21 of 2023** (Accounts of the Union Government, Financial Audit,
FY2021-22), Figure 2.24, compiled from the **Finance Accounts**, against the Union Budget's
Statement 18 / *Budget at a Glance* transfer table. The gaps: FY2017-18 −65,955; FY2018-19 −68,327;
FY2019-20 −66,885; FY2020-21 **−99,911**; FY2021-22 −94,198 ₹ crore — 25% to 32% of the Budget's
figure (§11).

**Why this is definitional and not a compilation error.** On **Finance Commission grants** the same
two instruments agree to the rupee or to one rupee in all five years (0, 1, 0, 1, 0), and on
**transfers to UTs with legislature** they match exactly. A compilation error does not have that
shape. The definitions: the CAG counts what the Finance Accounts book as **grants-in-aid to State
Governments** — money that entered a State's Consolidated Fund; the Budget counts *"the allocation
made under Major Heads relevant to States"* and, on its own 2024 footnote, *"includes releases made
to States both through State treasuries and other implementing agencies"*. **The gap is, on the
Union's own account of its own line, the money that does not enter a State's accounts.**

**This is the strongest provenance finding in the part** and it is the one place where an instrument
independent of the Union's budget office measures the same quantity. It is also the place where
the disciplining question of §Disciplining measure bites hardest, because the CAG is auditing the
Union against the Union — not the Union against the States.

### PR-4 — Two T1 documents give the same 28 umbrella schemes different tiers

**The quantity.** The tier composition of the 28 umbrella schemes adopted in 2016-17.

**The instruments.** *Budget at a Glance 2016-17*, `bag10.pdf`, ANNEX-A / ANNEX-B / the unlettered
"C Optional Scheme" block: **6 core-of-the-core + 19 core + 3 optional**. Fifteenth Finance
Commission, Volume I, para 3.3: *"twenty-eight umbrella schemes, consisting of six core of the core
schemes, twenty core schemes and two optional schemes"* — **6 + 20 + 2**.

**Not cosmetic, because the tier fixes the funding ratio.** A scheme in the Core tier is 60:40; the
same scheme in the Optional tier is 50:50, and optional for the State. **One scheme is 60:40 on one
official account and 50:50 on the other.** **Evidentiary in principle** — one of the two is wrong
and the 2016-17 annexes are the contemporaneous instrument — but the primary document has a defect
of its own: the printed Core list carries **two entries numbered "1"** (a stray "Cattle Development"
line above "Green Revolution"), so it prints 20 lines under 19 numbers. **Counting lines gives 6 +
20 + 2 and counting numbers gives 6 + 19 + 3.** The Fifteenth Finance Commission's figure is
consistent with counting the lines. **Record both and adopt neither without re-reading `bag10.pdf`
line by line.**

### PR-5 — The same Budget Estimate, printed twice, ₹2,10,088.09 crore apart

**The quantity.** Total transfer of resources to States and UTs with Legislature (excluding
devolution), Budget Estimate for FY2023-24.

**The instruments.** **Statement 18 of the Expenditure Profile 2023-24**, BE 2023-24 column: Grand
Total **₹8,41,426.38 crore**. **Statement 18 of the Expenditure Profile 2024-25**, BE 2023-24 column:
Grand Total **₹10,51,514.47 crore**. Same statement number, same publisher, same title, consecutive
editions, same year's estimate (§16).

**The decomposition, and it is what makes this a provenance record rather than a curiosity.** Heads
I and II are identical to the rupee across the two editions. The entire difference is inside heads
III and IV: CSS **+₹88,875.88 crore**, Central Sector Schemes +₹3,629.10 crore, "Other Categories of
Expenditure" **+₹1,32,083.11 crore**, and Delhi/Puducherry/J&K "Other Categories" **−₹14,500.00
crore**. Both editions are internally consistent — each head total equals the sum of its own
components — so this is a restatement, not an arithmetic error.

**Definitional, and disclosed only in part.** The Union's disclosure is a single new footnote,
attached to the CSS line only: *"includes releases made to States both through State Treasuries and
implementing agencies"*. **The ₹1.32 lakh crore movement in "Other Categories" gets no note in that
edition at all**; two editions later the same line acquires *"Compensation to States/UTs for revenue
losses on roll out of GST has been phased out w.e.f. 2026-2027"*, which identifies it retrospectively
as predominantly GST compensation. **So GST compensation entered the Union's headline transfers total
by silent reclassification in the 2024-25 edition and leaves it in 2026-27, and both moves change the
denominator of every share computed against that total, including this part's headline series.** The
₹14,500.00 crore removed from head IV is a round number and is unexplained; I did not establish what
it was.

### PR-6 — A suspected, unestablished break in the CSS Actuals series at FY2021-22/FY2022-23

**The quantity.** CSS transfers to States, Actuals.

**The evidence for.** The FY2022-23 Actual exceeds its own Budget Estimate by **21.9%**, where the
six preceding years range from −5.7% to +4.9% (§17). The Actual for FY2022-23 is first published in
the same edition — Expenditure Profile 2024-25 — that carries the new footnote and restates the
BE/RE columns (PR-5).

**The evidence against.** The FY2021-22 Actual of ₹3,34,580.84 crore already exceeds the CAG's
grants-in-aid figure for the same year by ₹94,198 crore (PR-3), which suggests the **Actuals were on
the broad basis throughout** and only the estimates were realigned to them. On that reading there is
no break in the Actuals and the FY2022-23 residual is a genuine over-release.

**Unresolved, and it must be carried as unresolved.** I could not find any note, in any edition,
stating whether the Actuals column was restated. **Consequence, stated conservatively at §18: the
finding that the CSS share of total transfers fell from 24.15% to 17.18% is a lower bound on the
fall, not an upper bound**, because any restatement would have raised the later years relative to
the earlier ones. The direction of the finding is safe on either reading; only its magnitude is at
risk. **Evidentiary in principle, unresolvable on the published record.**

### PR-7 — "Released" denotes three different events across the period

**The quantity.** A release of centrally sponsored scheme funds to a State.

**The instruments, all the Union's.** Pre-FY2021-22: money leaves the Consolidated Fund of India and
enters a State's account. FY2021-22 onward under the **SNA model**: money enters a designated
commercial-bank account **outside both Consolidated Funds** — the Union's own words, *"transfer of
balances outside the Consolidated Fund of India and the Consolidated Fund of the State(s)"*. From
August 2023 under **SNA SPARSH**: both Consolidated Funds are touched *"only when an actual claim is
raised from the State"*, so release and expenditure are the same event (§3).

**Definitional, threefold, undisclosed as a break, and progressive.** Because SPARSH was phased in
over six notifications between August 2023 and November 2025, **there is no single date on which the
meaning changed** — for FY2024-25 and FY2025-26 the word means different things for different
schemes and different States within the same table. **No bridging series is published** (A-5). Any
release series crossing FY2020-21 → FY2025-26 is three series wearing one label.

### PR-8 — Two Union documents give the same capital-investment loan two different totals

**The quantity.** Special Assistance as Loan for Capital Investment, BE 2026-27.

**The instruments.** Expenditure Profile 2026-27 Statement 18, head I.f: **₹1,85,000.00 crore**.
Statement of Budget Estimates, Demand No. 42 (Transfers to States), line 11: **₹2,00,000.00 crore**.

**Definitional, and it resolves cleanly** — Demand 42's line is *"Special Assistance as Loan to
States/UTs (with Legislature)"*, and the UT share appears separately in Statement 18 at head IV.d,
"Capital Transfers (Including SASCI)", BE 2026-27 = ₹15,380.01 crore. 1,85,000.00 + 15,000.00 =
2,00,000.00. **Recorded because it is the general shape of the trap**: the Union routinely publishes
a "States" figure and a "States and UTs" figure for the same instrument, under similar names, in
documents that do not cross-refer, and the gap is a two-digit percentage of the smaller figure.

---

## Absences

*(reasonKind per the brief: `not-collected` · `not-published` · `withheld` · `never-defined`.
**`withheld` is used only where there is a named requester, a specific request, and a date** — and,
per §15, only in the sense of **data withheld from the public**, never of money withheld from a
State. On the evidence I retrieved, **no absence in this part qualifies as `withheld`**, and that is
itself recorded below at A-7.)*

### A-1 — "The number of centrally sponsored schemes" has never been defined *(never-defined)*

**What is not measured.** There is no definition, in any instrument I retrieved, of what counts as
one centrally sponsored scheme. The T1 counts for overlapping populations are: **66** (BE 2014-15,
of which 17 "flagship"), **50** retained (BE 2015-16), **max 30** recommended (Oct 2015), **28**
umbrellas (BE 2016-17, on two incompatible tier splits — PR-4), **131** on the Department of
Expenditure's own list (c. 2020), **30** umbrella CSS in the Union Budget 2020-21, **130**
sub-schemes pre-revamp and **65** post-revamp (Statement 4AA, 2022-23), **81** notified for SNA
SPARSH (31 Dec 2025), **86** line items in Statement 4A (BE 2026-27) (§5).

**Is the stated reason contradicted by evidence?** **No reason is stated, and the Fifteenth Finance
Commission concedes the absence in terms**: *"Till recently, there seemed to be confusion about the
number of existing CSS, indicating the complexity of the entire structure."* A constitutional body
recording confusion about a count in a document that then relies on the count is as close to an
official acknowledgement of a `never-defined` quantity as this project is likely to find.

**What would fill it.** A published rule fixing the unit of account — scheme, sub-scheme, umbrella,
budget line — applied consistently across the Statement 4A line items, the SNA SPARSH notification
list and the Department of Expenditure's list. **Note the direction of the consequence: without it,
"we reduced 66 schemes to 28" and "there are 131 schemes" are both true.**

### A-2 — Centrally sponsored scheme transfers are not published by State *(not-published)*

**What is not measured.** The Union Budget publishes tax devolution **by State** (Receipts Budget
Annex 4/4A/4B, 28 rows, horizontal shares to three decimals) and CSS transfers **by ministry and
scheme** (Expenditure Profile Statement 4A, 86 line items, Grand Total FY2024-25 Actuals
₹4,02,367.62 crore). **It publishes CSS transfers by State nowhere.** The numerator of a State's
untied share is published; the denominator is not. **Therefore the untied share of transfers cannot
be computed for any individual State from the Union Budget** (§9).

**Sweep and positive control (M3), completed at §18.** Every statement of the Expenditure Profile
2026-27 that exists (1, 4A, 4AA, 4B, 4C, 4D, 5–9, 11–27) and every statement of the Expenditure
Budget Vol. I for 2013-14 and 2015-16 (10–23) was fetched and grepped for the names of ten large
States. **Positive control: the grep returns 53, 73 and 83 hits respectively in Statement 19,
"Externally Aided Projects", whose Part-II(i) is a project-by-project listing of Additional Central
Assistance to States in which the State is on the face of every row.** The corpus can carry a State
dimension and does — for one category.

**Is the stated reason contradicted by evidence?** **No reason is stated. And the absence is
contradicted by capability three times over.** (i) Statement 19 has published State-identifiable
central assistance continuously since before 2013 — for the projects a foreign lender audits.
(ii) Annex 4B publishes devolution by State to three decimal places, so the Union has both the data
architecture and the practice. (iii) The SNA/PFMS system exists precisely to hold scheme-wise,
State-wise release and balance data, and Statement 4AA publishes the balances **by scheme** while
withholding — in the publication sense — the State dimension it necessarily holds.

**What would fill it.** A State × scheme release table in the Expenditure Profile, on the same
periodicity as Statement 4A. **Nothing new would have to be collected.**

### A-3 — The split of CSS releases between State treasuries and implementing agencies is not published *(not-published)*

**What is not measured.** Since the 2024-25 edition, Statement 18 states that its CSS line *"includes
releases made to States both through State treasuries and other implementing agencies"* (§12). **The
two components are never given separately.** The last published figure for the agency channel is
**₹1,12,707.83 crore for FY2013-14** from a statement abolished in 2016 (LR-2).

**Is the stated reason contradicted by evidence?** No reason is stated. **The Union's own footnote
establishes that the quantity exists and is inside a number it publishes**, which is the strongest
possible internal evidence that it is `not-published` rather than `not-collected`.

**What would fill it, and what it would settle.** Two sub-lines under Statement 18 head III.a. It
would very probably close the **₹0.66–1.0 lakh crore annual gap against the CAG's Finance-Accounts
figure** (PR-3) and it would settle whether the FY2014-15 routing change (LR-1) delivered what it
promised. **This is the single highest-value absence in this part.**

### A-4 — No instrument states reasons for in-year revisions to scheme transfers *(not-published)*

**What is not measured.** Jal Jeevan Mission was cut from ₹67,000.00 crore to ₹17,000.00 crore at
Revised Estimates and had ₹31.00 crore released nine months in (§13); the CSS transfer line as a
whole was cut by ₹86,880 crore in FY2024-25 and ₹1,14,588 crore in FY2025-26 (§17). **No document I
retrieved states a reason for any of these.** Statement 4AA reports the numbers without narrative;
Statement 18 reports the aggregates without narrative; the Notes on Demands for Grants describe each
scheme's purpose and not its revision.

**Is the stated reason contradicted by evidence?** No reason is stated. The nearest thing to one is
the footnote added to the Finance Commission health grants line — *"@ allocations are provisional,
based on utilisation trends and will be augmented, if necessary"* — which shows the Budget **can**
attach a stated basis to a line when it chooses to.

**What would fill it.** A reasons column, or a note, against any line where RE departs from BE by
more than a stated threshold. **Absent it, LR-5 cannot be adjudicated in either direction**, and
every party's account of why the money did not move is unfalsifiable.

### A-5 — No bridging series across the three meanings of "released" *(not-published)*

**What is not measured.** The Union changed what a release *is* twice (PR-7) and published no
restated back-series on either new basis. Statement 4AA's SNA data begin with the 2025-26 edition
and there is no comparable prior series, because the statement number was used for a different
subject in 2022-23 and did not exist in 2019-20 through 2021-22 and again in 2023-24 and 2024-25
(§3).

**Is the stated reason contradicted by evidence?** No reason is stated. **The data exist**: PFMS
holds release records on all three bases and the Union's own SPARSH rollout notifications identify
exactly which schemes and States moved on which dates, so a bridging table is a query, not a
collection exercise.

**What would fill it.** Two years of overlap published on both bases, per scheme, at each of the six
rollout stages.

### A-6 — The Union Budget has never published a by-State transfer statement on the expenditure side *(not-collected in the published record; capability demonstrated)*

**Referred to this part by part 07 and settled at §18.** The finding is not "no such statement
exists" but something sharper: **the only category of central assistance the Union Budget publishes
in State-identifiable form is the category financed by the World Bank, the ADB and JICA** —
Statement 19, Part-II(i), continuously across 2013-14, 2015-16 and 2026-27. The old Statement 18
(direct transfers), Statement 16 (Central Assistance for State and UT Plans), Statement 17 (Plan
grants and loans to States) and Statement 10 (non-Plan grants and loans to States) are **all
Ministry- and scheme-wise, with "STATE GOVERNMENTS" as an aggregate row and no State column**.

**reasonKind, stated carefully.** Coded **`not-collected`** *for the published instrument* — no such
statement has ever existed to be published — but **the underlying data plainly are collected**, as
A-2 establishes. **This is the case where the two available codes both mislead**: `not-published`
implies a suppressed document and `not-collected` implies missing data. **The accurate statement is
that the Union has never built the instrument, while building and maintaining the identical
instrument for the money a third party audits.** The record should carry that sentence rather than
either code alone.

### A-7 — Nothing in this part meets the bar for `withheld`, and that is a finding about my evidence, not about the world

**Why this entry exists.** This part concerns money that States say was not sent to them and data
the Union does not publish, and the word "withheld" attaches naturally to both. **Per §15 the two
senses must not be merged, and per the brief `withheld` requires a named requester, a specific
request and a date.**

**What I have.** For every absence above I have the absence and the capability. **For none of them do
I have a request.** I did not retrieve an RTI application, a parliamentary question seeking the
specific unpublished quantity and being refused, a Public Accounts Committee demand, or any other
instrument naming a requester, a request and a date in respect of A-1 through A-6. **Therefore every
absence in this part is `not-published`, `not-collected` or `never-defined`, and none is
`withheld`.**

**What would change it.** A parliamentary question asking for CSS releases by State and being
declined, or an RTI refusal on the treasury/agency split (A-3), would convert that specific absence
to `withheld` — and only that one. **A later part must not import a `withheld` coding from a fiscal
grievance in parts 06 or 07: money not released to a State is not data withheld from the public, and
this part will not lend its absences to that argument.**

---

### PR-4 (verified) — the re-read PR-4 asked for, and it moves the finding

PR-4 said the tier disagreement should not be adopted *"without re-reading `bag10.pdf` line by
line"*. I re-retrieved it (`https://www.indiabudget.gov.in/budget2016-2017/ub2016-17/bag/bag10.pdf`,
HTTP 200, 39,936 bytes, bilingual Hindi/English, read in full) and the result changes the record.

**What the Budget's annexes actually print:**

- **ANNEX-A, "CSS: (A) Core of the Core Schemes" — 6 numbered entries**, 1 to 6, no defect.
- **ANNEX-B, "CSS: (B) Core Schemes" — 20 named schemes printed under 19 numbers.** The defect is
  exact and reproducible: the list opens `1. Cattle Development` and then `1. Green Revolution`,
  after which numbering runs 2 to 19. *(Cattle Development is a real scheme line, not a typographic
  ghost — it appears as line 1.01 under the Ministry of Agriculture in Statement 17 of the
  Expenditure Budget Vol. I 2015-16, with an Actuals 2013-14 provision.)*
- **"C Optional Scheme" — 3 numbered entries**: Border Area Development Programme; National River
  Conservation Plan; Shyama Prasad Mukherjee RURBAN Mission. **No defect: three entries, three
  numbers, three distinct schemes.**

**So the Budget's own annexes yield 6 + 20 + 3 = 29 named schemes, or 6 + 19 + 3 = 28 numbers**, and
the Fifteenth Finance Commission's **6 + 20 + 2 = 28** matches neither.

**The disagreement is therefore not where PR-4 placed it.** On the Core tier the two documents can be
reconciled — FC-XV's "twenty core schemes" is the Budget's printed line count, and the "19" is an
artefact of the Budget's duplicated numeral. **On the Optional tier they cannot: the Budget prints
three optional schemes and the Commission says two.** That is a flat factual disagreement between two
T1 documents about a tier that determines whether a scheme is 50:50 and whether a State may decline
it at all.

**And a finding that supersedes the tier question.** The figure "28 umbrella schemes" — repeated in
the Union Budget, in the Fifteenth Finance Commission and in every account of the 2016 restructuring
— **is not reproducible from the Budget's own annexes**, which name twenty-nine. It is recoverable
only by counting the duplicated numeral as one scheme. **The headline number of the largest
restructuring of centrally sponsored schemes in the period rests on a numbering error in the
document that announced it.** This strengthens A-1 rather than qualifying it: the count was never
defined, and the most-cited value of it cannot be reconstructed from the primary source.

---

## Sources retrieved

*(Tier: **T1** official Indian source retrieved directly · **T2** multilateral retrieved directly ·
**T3** peer-reviewed · **T4** journalism, NGO data, **or any official figure known only through a
relayed account** · **T5** contested index. **Grade the document held, not the institution.** Every
row below is a document that was fetched and read; nothing is listed because it is known to exist.
Rows marked **[s1]** were retrieved in the first session of this part, **[s2]** in the resumed
session. Every `www.indiabudget.gov.in` fetch in **[s2]** required both M1 escalations — resolution
via `dig @1.1.1.1` and `curl --resolve …:443:94.202.207.57`, **and** an explicit
`Referer: https://www.indiabudget.gov.in/`.)*

| # | name | URL fetched | tier | what I actually read in it |
|---|---|---|---|---|
| 1 | **Fourteenth Finance Commission report** | `https://fincomindia.nic.in/asset/pdf/commission-reports/14thFCReport.pdf` (1,364,786 bytes) | **T1** | **[s1]** Para 8.12 (*"little scope to increase the share of aggregate transfers"*), **para 8.13 verbatim** (the compositional-shift argument and the 42% recommendation), para 12.22 (*"Our data confirms that such a significant expansion did take place"*; allocation ≠ release), **para 12.49** (the 49% of gross revenue receipts benchmark), **para 5.8** (direct transfers not in State Finance Accounts) and **para 5.9** with Tables 5.1/5.2 (67.4% vs 56.7%), and the **page-90 footnote** attributing the routing change to the Interim Budget 2014-15 |
| 2 | **Fifteenth Finance Commission, Volume I, Main Report** | `https://fincomindia.nic.in/asset/doc/commission-reports/XVFC%20VOL%20I%20Main%20Report.pdf` (31,057,059 bytes) | **T1** | **[s1]** Para 3.3 (the 6+20+2 decomposition of the 28 umbrella schemes); paras 12.51(i)–(v) verbatim (co-terminosity with FC cycles, threshold funding size, independent evaluation, and *"clarity and stability in the share of the Union Government in CSS"*); **para 12.51(ii)** (*"there seemed to be confusion about the number of existing CSS"*; the DoE list of **131**); **para 12.52** (schematic transfers at 12.81% of gross revenue receipts) |
| 3 | **Report of the Sub-Group of Chief Ministers on Rationalisation of Centrally Sponsored Schemes, October 2015** | `https://www.niti.gov.in/sites/default/files/2019-08/Final%20Report%20of%20the%20Sub-Group%20submitter%20to%20PM.pdf` (150 pp.) | **T1** | **[s1]** Executive Summary (66 CSS with 17 flagship; 50 of 66 retained in BE 2015-16; the CASP ₹3.38→₹2.05 lakh crore and CSS ₹2.52→₹1.69 lakh crore figures against ₹1.78 lakh crore additional devolution; the sharing-pattern recommendation verbatim); constitution and membership; **para 4.13** (max 30 umbrella schemes); the para-4.14 mapping table; **paras 4.28–4.29** (flexi-funds: 10% from June 2013, recommended 25%); Annexure VIII (DoE flexi-fund guidelines); Annexure IX (list of the 66) |
| 4 | **CAG Report No. 21 of 2023, Accounts of the Union Government (Financial Audit), FY2021-22** | `https://cag.gov.in/uploads/download_audit_report/2023/Report-No.-21-of-2023-Finance-English-PDF-A-DSC-064d501d8224738.38514342.pdf` (2,120,522 bytes) | **T1** | **[s1]** **Figure 2.24, "Grants-in-Aid to States and UTs with legislature"** — the CSS, Finance Commission and UT series for FY2017-18 to FY2021-22 that produce PR-3. The **only** independent measurement of a Union transfer quantity anywhere in this part |
| 5 | **Union Budget, *Budget at a Glance*, transfer-of-resources table, every year 2013-14 → 2026-27** | `…/budgetYYYY-YYYY/ubYY-YY/bag/bagN.pdf` (2013-14 to 2018-19), `…/budgetYYYY-YY/doc/Budget_at_Glance/bagN.pdf` (2019-20 onward) | **T1** | **[s1]** Each year's **Actuals** column for the year *T−2*, giving the full decomposition at §7; **BaG 2015-16 `bag3a.pdf`** and **BaG 2016-17 `bag3a.pdf`** for the pre-shift years and the ₹1,12,708 crore direct-release line with its cross-reference footnote to Statement 18; **BaG 2026-27 `bag3.pdf`** and its paragraph 6 for PR-1 |
| 6 | **Union Budget 2016-17, *Budget at a Glance*, `bag10.pdf`** | `https://www.indiabudget.gov.in/budget2016-2017/ub2016-17/bag/bag10.pdf` (HTTP 200, 39,936 bytes) | **T1** | **[s1] and re-read in full [s2]**. ANNEX-A (6 Core of the Core), ANNEX-B (**20 named Core schemes under 19 numbers**, opening `1. Cattle Development` / `1. Green Revolution`), "C Optional Scheme" (**3 entries**, no defect). Bilingual Hindi/English. Basis of PR-4 and PR-4(verified) |
| 7 | **Expenditure Budget Vol. I, Statement 18, "Direct Transfer of Central Plan Assistance to State/District Level"**, 2013-14, 2014-15 (interim), 2014-15 (full), 2015-16 | `…/budget2013-2014/ub2013-14/eb/stat18.pdf`; `…/budget2014-2015(I)/ub2014-15/eb/stat18.pdf`; `…/budget2014-2015/ub2014-15/eb/stat18.pdf`; `…/budget2015-2016/ub2015-16/eb/stat18.pdf` | **T1** | **[s1] and re-fetched [s2]**. GRAND TOTAL lines giving 1,09,173.13 / 1,04,971.35 / 1,43,039.68 BE / 1,07,014.58 RE / **1,12,707.83 Actuals FY2013-14** / **0.00 BE 2014-15 already in the February 2014 interim volume**. **[s2]** also read its internal structure: Ministry → Department → scheme, with a Major Head column and **no State column** |
| 8 | **Expenditure Budget Vol. I 2016-17, Introductory Notes** | `…/budget2016-2017/ub2016-17/eb/` | **T1** | **[s1]** Paragraphs 4–6 verbatim: core-of-the-core patterns retained; core at 60:40 / 90:10; **paragraph 6 — where a pattern is already below 60:40 it continues**; optional at 50:50 / 80:20. Also that "Statement 18" had by then been reassigned to Major Reserve Funds |
| 9 | **Expenditure Profile, Statement 18, "Total Transfer of Resources to States and Union Territories with Legislature"**, eight consecutive editions | `…/budget2019-20/doc/eb/stat18.pdf`, `…/budget2020-21/…`, `…/budget2021-22/…`, `…/budget2022-23/…`, `…/budget2023-24/…`, `…/budget2024-25/…`, `…/budget2025-26/…`, and `https://www.indiabudget.gov.in/doc/eb/stat18.pdf` (2026-27) — all HTTP 200 | **T1** | **[s2], and this is the spine of §16 and §17.** Full head I/II/III/IV decomposition and Grand Total from each edition, with the column headers read off each PDF so no column is assigned by assumption. Yields: the FY2023-24 BE printed at ₹8,41,426.38 crore in one edition and ₹10,51,514.47 crore in the next; the CSS BE/RE/Actual run FY2018-19→FY2025-26; the ₹2,18,882.50 crore in-year cut to head III in FY2025-26; and the full footnote history (`^` NER and Sikkim, throughout; **`*` treasury-and-implementing-agency, first in 2024-25**; `@` provisional-on-utilisation-trends, 2024-25 on; **`#` GST compensation phased out w.e.f. 2026-27**, 2026-27 only) |
| 10 | **Expenditure Profile 2026-27, every statement that exists** | `https://www.indiabudget.gov.in/doc/eb/stat{1,4a,4aa,4b,4c,4d,5,6,7,8,9,11…27}.pdf` — 27 fetches, all HTTP 200; `stat2`, `stat3`, `stat4`, `stat10` HTTP 404 (do not exist in this edition) | **T1** | **[s2]** Titles of every statement, and a full-text State-name sweep of each (§18 / A-2 / A-6). Read in substance: **Statement 4A** (Centrally Sponsored Schemes, 86 line items), **Statement 4AA** (SNA and SNA SPARSH — head note verbatim, rollout dates, 50 of 81 onboarded, the per-scheme BE/RE/released/idle table at §13), **Statement 5** (Transfers to UTs with Legislature), **Statement 18**, **Statement 19** (Externally Aided Projects — 53 State-name hits, the positive control) |
| 11 | **Expenditure Budget Vol. I 2013-14 and 2015-16, every statement 10–23** | `…/budget2013-2014/ub2013-14/eb/stat{10…23}.pdf` and `…/budget2015-2016/ub2015-16/eb/stat{10…23}.pdf` | **T1** | **[s2]** Titles and full-text State-name sweep of both years. Read in substance: **Statement 10** (Non-Plan Grants and Loans to State & U.T. Governments — "STATE GOVERNMENTS" as an aggregate row, decomposed by Ministry), **Statement 16** (Central Assistance for State and UT Plans — blocks A/B/C/D, scheme-wise), **Statement 17** (Plan Grants and Loans — "CENTRAL ASSISTANCE TO STATE PLAN" decomposed by Ministry and scheme, and the "Cattle Development" line that corroborates PR-4), **Statement 18**, **Statement 19 Part-II(i)** ("Additional Central Assistance (ACA) to States for Externally Aided Projects" — the State-identifiable project list; 73 and 83 State-name hits) |
| 12 | **Receipts Budget 2026-27, Annex 4B** | `https://www.indiabudget.gov.in/doc/rec/annex4b.pdf` | **T1** | **[s1]** State-wise **Actuals** of tax devolution, 28 rows, horizontal shares to three decimals; FY2024-25 total 12,65,660.58 crore; UP 17.939%, Bihar 10.058%, West Bengal 7.523%, Tamil Nadu 4.079%, Kerala 1.925% |
| 13 | **Statements of Budget Estimates, Demand No. 87 (Department of Rural Development)** | `https://www.indiabudget.gov.in/doc/eb/sbe87.pdf` | **T1** | **[s1]** The VB-G RAM G line at ₹95,692.31 crore BE 2026-27 against MGNREGA-Programme Component falling to ₹30,000.00 crore; the note on VB-G RAM G verbatim (60:40 / 90:10 / 100% for UTs without legislature; 125-day statutory guarantee); **and the note "As per the Mahatma Gandhi NREGA Act, 100% wage payment within 15 days of work done is the liability of Central Government"** |
| 14 | **Statements of Budget Estimates, Demands No. 25 and 63** | `https://www.indiabudget.gov.in/doc/eb/sbe25.pdf`, `…/sbe63.pdf` | **T1** | **[s1]** Scheme lines with BE/RE/Actual columns and **no State breakdown**; searches for "state-wise", "Andhra", "West Bengal", "Tamil Nadu" return nothing (the §9 sweep) |
| 15 | **Statement of Budget Estimates, Demand No. 42 (Transfers to States), 2026-27** | `https://www.indiabudget.gov.in/doc/eb/sbe42.pdf` (HTTP 200) | **T1** | **[s2]** The whole demand: Finance Commission grants by component; **Special Assistance as Loan to States/UTs (with Legislature) for Capital Investment ₹1,49,483.73 crore Actual FY2024-25 → ₹2,00,000.00 crore BE 2026-27** (PR-8); the NDRF/NDMF netting against National Calamity Contingent Duty; and a **new cess-funded CSS appearing at RE 2025-26 — "Assistance to States for Public Health Infrastructure", met from a "Health Security se National Security Cess Fund"**, ₹699.00 crore RE 2025-26 and ₹4,200.00 crore BE 2026-27. *(Flagged to part 03; not developed here.)* Also confirms **no GST compensation line survives in this demand at BE 2026-27** |
| 16 | **Union Budget archive index** | `https://www.indiabudget.gov.in/previous_union_budget.php` (HTTP 200, 24,985 bytes) | **T1** | **[s2]** The complete archive link set, 2011-12 to 2025-26, which is what establishes the three URL eras and the existence of **two interim budgets in scope, `budget2014-2015(I)` and `budget2024-25(I)`** |
| 17 | **`pdfinfo` / `pdftotext -layout` artefacts** | local, over every PDF above | **T1 (artefact)** | **[s2]** Page counts and text-layer integrity. Two Statement 18 PDFs (2020-21 and 2023-24) emit `Syntax Error: Expected the optional content group list` on extraction but yield complete, arithmetically self-consistent text; **their head totals were checked against the sum of their own components before use** |

**Tier summary.** **Every source used in this part is T1.** No T2, T3 or T5 source is used. **No
figure in this part is taken from a relayed account, and therefore no figure in this part is T4.**
Where a quantity is known only through another part of this phase, it is not listed here as a source
— it is listed in §FORWARD REFERENCES as a reliance, and the two must not be confused.

**Delegated retrievals.** Two subagents were dispatched in the resumed session, both instructed to
run on opus, both under the same no-fabrication and three-mode-M1 rules: **(A)** the Mahatma Gandhi
NREGA Act's fund-stopping and wage-liability provisions, the Union's stated grounds for any stoppage,
and the statutory basis of VB-G RAM G; **(B)** whether any official instrument publishes State-wise
CSS releases (PFMS, DBT Bharat, parliamentary answers, Indian Public Finance Statistics, RBI *State
Finances*), and the Department of Expenditure's CSS release guidelines. **Their returns are recorded
in the addendum at the end of this file, with each one's reported model of record. Anything they
marked UNRETRIEVED is carried into §Sources NOT retrieved and is asserted nowhere in this part.**

---

## Sources NOT retrieved

| wanted | why it matters | M1 modes tried | status |
|---|---|---|---|
| **The Mahatma Gandhi NREGA Act 2005 — the fund-stopping provision and the wage-liability provision, verbatim** | §15 and LR-6 turn on whether the Union's own budget note ("100% wage payment … is the liability of Central Government") restates a statutory provision or summarises one, and on what power lets the Union stop a release | Delegated to subagent A under the three-mode rule; **result recorded in the addendum**. Nothing in §15 or LR-6 asserts a section number I did not read | **See addendum.** Until read, this part asserts only what the *Budget document* says, and says so |
| **The instrument creating VB-G RAM G and its 125-day statutory guarantee** | LR-6's case against rests on the Core-of-the-Core → 60:40 tier move; if the successor statute preserves a 100% Central wage liability the case collapses | Delegated to subagent A | **See addendum.** LR-6 is explicitly marked as resting on the Budget's note alone |
| **PFMS state-wise, scheme-wise release reports** | Would settle A-2 (is the State dimension published anywhere official?) and would put a second Union instrument beside the Budget on the same quantity | Delegated to subagent B | **See addendum** |
| **The Department of Expenditure's CSS release guidelines / the SNA Office Memorandum (part 07 cites F.No.1(13)PFMS/FCD/2020 of 23 March 2021)** | The clause conditioning release on utilisation certificates or on a State transferring its matching share is the operative text behind LR-4, A-4 and D-5 | Delegated to subagent B. **[s2] did not attempt it directly** | **Unretrieved by me.** Part 07 cites the OM number; **I have not read it and do not quote it** |
| **The two other CAG reports the header of this file records as retrieved in [s1]** | Only **CAG Report No. 21 of 2023** is named and cited anywhere in §1–§18 | Not re-attempted in [s2] | **Recorded as a gap in this part's own record.** The header says "three CAG reports from `cag.gov.in`"; **one is identified.** Anything a later stage wants from the other two must be re-retrieved. This is a self-correction, not an assertion that they were not read |
| **CAG State Finances Audit Reports for any State** | The only instrument the phase has found that prints the Union's PFMS release figure and the State's Finance Accounts receipt figure **in one paragraph** (part 07: Bihar FY2022-23, para 4.21(iv)) | Not attempted here — the State-side instrument belongs to parts 06 and 07 | **Unretrieved by me.** I rely on part 07 for its existence and content and say so at §Disciplining measure |
| **What the ₹14,500.00 crore removed from Statement 18 head IV.c between the 2023-24 and 2024-25 editions was** | It is the one component of the §16 restatement that is unexplained, and its roundness suggests a single reclassified item | Read both editions in full; neither carries a note. Demand No. 42 does not contain it (head IV is Delhi/Puducherry/J&K, whose demands were not retrieved) | **Unretrieved.** Recorded as unresolved in PR-5 |
| **The Expenditure Profile 2023-24 and 2024-25 editions of Statement 4AA** | Would show whether the 130→65 rationalisation map was continued or dropped | **Retrieved as a negative, and it is a fact:** `…/budget2023-24/doc/eb/stat4aa.pdf` and `…/budget2024-25/doc/eb/stat4aa.pdf` both return **HTTP 404 with the Referer supplied**, and the Expenditure Profile link list on each year's `index.php` runs `stat4a, stat4b, stat4c, stat4d` with no `4aa` entry. **Positive control: `…/budget2022-23/doc/eb/stat4aa.pdf` and `…/budget2025-26/doc/eb/stat4aa.pdf` both return HTTP 200** and carry, respectively, "Revamping/Rationalisation of Centrally Sponsored Scheme" and the SNA statement | **Does not exist in those editions.** Not a retrieval failure — the §3 finding that the statement number was vacated and reused |
| **A State-wise decomposition of the ₹1,12,707.83 crore of FY2013-14 direct-to-agency releases** | Would give one pre-2015 State-level baseline for tied money outside State budgets | Read the old Statement 18 in full for 2013-14 and 2015-16: Ministry → Department → scheme with a Major Head column, **no State column** | **Does not exist in the instrument.** A-6 |
| **Any request-and-refusal document (RTI, parliamentary question declined, PAC demand) for any quantity in §Absences** | Without one, no absence in this part can be coded `withheld` (A-7) | Not attempted; I have no evidence of any such request | **Unretrieved, and the absence of the request is itself the reason A-7 exists.** No absence here is coded `withheld` |

---

## FORWARD REFERENCES

*(Mandatory. Every quantity this part relies on another part of stage 2 to carry. A later stage
asserts that each of these resolves before any record is authored, so each is stated as a specific
quantity, not as a topic.)*

- **→ part 02: gross revenue receipts of the Union, by financial year, FY2015-16 onward.** This part
  found **two testable Union-side benchmarks written down by Finance Commissions on that
  denominator and cannot test either**: FC-XIV para 12.49 (*"ensure the prevailing level of transfers
  to States of about **49 per cent of the gross revenue receipts** during the award period"*) and
  FC-XV para 12.52 (*"keeping the aggregate size of the schematic transfers from the Union to the
  States at the FC-XIV levels (**12.81 per cent of the gross revenue receipts**)"*). **Part 04
  supplies both numerators** — total transfers (`transfers-total-states-uts`) and CSS transfers
  (`css-transfers-revenue-states`) — **and part 02 must supply the denominator.** These are the two
  cleanest pass/fail tests of the 2015 bargain available anywhere in this phase.
- **→ part 02: the divisible pool and gross tax revenue by year, and the 32%→42%→41% award
  boundaries.** `transfers-tax-devolution` is carried here only as this part's numerator; part 02
  owns it. Part 07 additionally reports a **Sixteenth Finance Commission award live from FY2026-27
  at 41 per cent with a new "Contribution to GDP" criterion** — a **fourth award boundary** the
  stage-1 periodisation did not anticipate, and one that falls inside this part's BE 2026-27 column.
- **→ part 03: cesses and surcharges as a share of gross tax revenue.** Two hooks from this part.
  (i) FC-XIV names *"States not being entitled to the growing share of cess and surcharges"* as one
  of the considerations behind the 42 per cent — the Union's own umpire conceding the point (part 07
  reports this; I did not read that paragraph). (ii) **A new cess-funded centrally sponsored scheme
  appears in the resumed retrieval**: Demand No. 42 carries "Assistance to States for Public Health
  Infrastructure" met from a **"Health Security se National Security Cess Fund"**, ₹699.00 crore RE
  2025-26 and ₹4,200.00 crore BE 2026-27. **A CSS financed from a cess is a transfer to States funded
  from revenue that was never in the divisible pool**, and part 03 owns that.
- **→ part 03 and part 01: what line III.c of Statement 18 contains.** §16/PR-5 establishes that
  "Under Other Categories of Expenditure (Revenue)" was restated from ₹1,681.27 crore to ₹1,33,764.38
  crore for BE 2023-24 and that the Union's own later footnote identifies it as predominantly **GST
  compensation to States, phased out w.e.f. 2026-27**. **This part cannot say what it was in each
  year and part 01 must.** It matters because it is inside the denominator of every share in §8.
- **→ part 01: answered, twice.** (i) **Yes — the GST back-to-back loan is counted as a transfer to
  States in the Union Budget's transfer statement**, as head II.2/I.b, ₹1,10,208 crore in FY2020-21
  and ₹1,47,865.55 crore in FY2021-22, with no grant/loan distinction drawn in the total (§7).
  (ii) **And GST compensation itself entered the same statement's headline total by silent
  reclassification in the 2024-25 edition and leaves it in 2026-27** (PR-5). Part 01 should carry
  both, because both change what "transfers to States" means in the years it covers.
- **→ part 01: state fiscal deficit and net borrowing ceilings under Article 293, FY2020-21 and
  FY2021-22.** Part 01 forwarded this to part 04. **I did not retrieve it and this part does not
  carry it.** It is a State-borrowing quantity, not a transfers quantity, and on the evidence I have
  it belongs with part 02 (the FRBM/Article 293 machinery) or with parts 06/07 (the State-side
  accounts), not here. **Flagged as unowned — a later stage must assign it.**
- **→ part 06 (Tamil Nadu) and part 07 (West Bengal, Bihar): the per-State untied share is not
  computable and neither part should be read as supplying it.** §9 and A-2: the Union publishes the
  numerator (devolution, Annex 4B) per State and never the denominator. Any State-level tied/untied
  claim rests either on a parliamentary answer that exists only because a member asked, or on the
  State's own accounts — **and a State's figure on a Centre-State transfer is not independent of the
  State.**
- **→ part 07: the West Bengal MGNREGA stoppage.** §15 states the **general form** — that the Union's
  own budget calls the wage component a 100% Central statutory liability while operating a system of
  in-year release discretion. **The instance is part 07's and I have not independently retrieved
  it.** I rely on part 07 for the figure that the Union's own release to West Bengal for MGNREGA in
  FY2022-23 was ₹0.00. **§15 must not be read as this part having established that.**
- **→ part 07: the matching-share burden.** Part 07 forwarded it. **This part supplies the general
  mechanism and one new instance**: LR-6, where a Core-of-the-Core scheme with a 100% Central wage
  liability is replaced by a 60:40 CSS carrying a statutory 125-day guarantee, implying a State
  obligation of roughly ₹63,795 crore against the ₹95,692.31 crore Union provision at BE 2026-27.
  **Whether any State has forfeited an allocation for want of its matching share remains unresolved
  and the Appropriation Accounts remain the route** — I did not attempt them.
- **→ part 07: the "three numbers for the same money" finding (LR-C there) generalised.** Part 07
  asked part 04 to own the general form. **It is owned here as PR-7** ("released" denotes three
  different events across the SNA regimes) **and D-2** below. The SNA/SNA SPARSH regime and
  Expenditure Profile Statement 4AA are retrieved and read (§3, §13).
- **→ part 05 (Governors and the office of the LG): the UT-with-Legislature block is ₹60,007.07 crore
  of Actual FY2024-25 transfers and ₹76,999.80 crore at BE 2026-27**, is head IV/V of the transfers
  statement, and is **the entire ₹77,000 crore difference between the two "total transfers to States"
  figures printed in one budget** (PR-1). Delhi, Puducherry and Jammu & Kashmir are inside the
  Union's transfers total, are governed through an LG, and their transfer head was restated downward
  by ₹14,500.00 crore in the §16 exercise. **Part 05 should know that the fiscal treatment of these
  three is not separable from the transfers instrument.**
- **→ whichever part carries employment: MGNREGA is being replaced.** LR-6. If no part of this phase
  owns rural employment, **the replacement of a Core-of-the-Core statutory scheme by a 60:40 CSS is a
  federalism fact regardless**, and this part carries it as such.

---

## Definitional disagreements

*(Table form. "Same-instrument" means both figures come from documents published by the same party,
in which case the disagreement cannot be resolved by preferring a more independent source. **This is
the section most likely to be mis-carried into the authoring stage, because in this part almost
every disagreement is same-instrument.**)*

| # | quantity | definition A | definition B | instruments | kind | resolvable? |
|---|---|---|---|---|---|---|
| **D-1** | "Transfers to States", pre-2015 | **excluding** direct-to-agency releases (the reported base to FY2013-14) | **including** them (FC-XIV Table 5.2) | Union Budget BaG pre-2015 vs FC-XIV paras 5.8–5.9 | **definitional** | Yes for FY2013-14 only, because Statement 18 published the missing ₹1,12,707.83 crore. **The direction of the whole finding flips on the choice: FY2013-14 reads 61.42% untied as published and 50.45% restated** (§8 pt 4). **No later year is restatable, because the statement was abolished** |
| **D-2** | "Released" | money left the Consolidated Fund of India | money entered a Single Nodal Agency account **outside both Consolidated Funds** (FY2021-22 on) — **or** a claim was raised and paid (SNA SPARSH, phased Aug 2023 → Nov 2025) | Union's own Statement 4AA head note, all three | **definitional, threefold** | **No.** No bridging series is published (A-5), and because SPARSH was phased in over six notifications there is **no single date on which the word changed meaning** — in FY2024-25 it means different things for different schemes and States in one table |
| **D-3** | "Allocated" vs "released" vs "utilised" | an allocation is an intention | a release is a cash event; a utilisation is an expenditure event | FC-XIV para 12.22 states the problem in 2014: *"the actual transfers to States are often noticeably different from the allocations based on these criteria … including non-compliance with conditionalities"*. Statement 4AA now prints allocation (BE), revision (RE), release and idle balance in one row | **definitional** | **Yes as to the facts, no as to the entitlement.** Statement 4AA is the first Union instrument to print all four side by side. What it cannot settle is whether an unreleased allocation is a debt — which is a legal question, not a measurement question (part 07's D1) |
| **D-4** | A scheme's size | the **Union's** provision | the **total outlay** including the State's matching share | Every CSS line in Statement 4A, Statement 18 and the SBEs is the Union share only; the tier ratios (60:40, 90:10, 50:50, 80:20) are stated separately in the 2016-17 Introductory Notes and in the VB-G RAM G note | **definitional** | **Computable but never published.** No Union instrument prints the implied State obligation. **At BE 2026-27 the VB-G RAM G provision of ₹95,692.31 crore at 60% implies roughly ₹63,795 crore of State money** — a number that appears in no budget document of either government |
| **D-5** | BE vs RE vs Actual | the Budget Estimate as first published | the RE, or the Actual, or **the Budget Estimate as restated a year later** | Statement 18, eight editions. **The FY2023-24 BE is printed as ₹3,64,269.50 crore in one edition and ₹4,53,145.38 crore in the next** (PR-5) | **definitional, and the fourth term is the trap** | **Yes, but only by reading both editions.** A series built from "the BE as published in the budget that set it" and a series built from "the BE as shown in the next year's comparative column" **differ by ₹88,875.88 crore on the CSS line alone in FY2023-24** |
| **D-6** | "Total transfers to States" | **States only** (₹25,43,769 crore, BE 2026-27, the prose) | **States and UTs with Legislature** (₹26,20,769 crore, the table) | *Budget at a Glance 2026-27*, paragraph 6 vs `bag3.pdf` — **same document** | **definitional** | Yes arithmetically (₹77,000 crore = head V), **not editorially** — both are called the same thing and the document does not distinguish them (PR-1) |
| **D-7** | The transfers total | **gross** | **net of recoveries of loans and advances** (the pre-2017 series) | BaG 2015-16/2016-17 vs BaG 2017-18 onward | **definitional** | Yes in principle; **it is a second, independent reason the pre- and post-shift series cannot be spliced**, on top of D-1 |
| **D-8** | CSS grants to States | what the **Finance Accounts** book as grants-in-aid to State Governments (CAG) | *"the allocation made under Major Heads relevant to States"*, including releases through implementing agencies (Union Budget) | CAG Report No. 21 of 2023 Fig. 2.24 vs Statement 18 | **definitional** | **Only by publishing the treasury/agency split (A-3).** The gap is ₹0.66–1.0 lakh crore a year and its shape — exact agreement on FC grants and on UT transfers, 25–32% disagreement on CSS — rules out a compilation error |
| **D-9** | "Number of centrally sponsored schemes" | scheme · sub-scheme · umbrella · budget line | — | 66 / 50 / 30 / 28 / 131 / 130 / 65 / 81 / 86, all T1 (§5) | **never-defined**, not merely disputed | **No.** And the **28** cannot be reconstructed from the Budget's own annexes, which name 29 (PR-4 verified). The Statement 4AA map is additionally footnoted *"New Schemes approved after 1.04.2020 are not included in the list"*, so **the 130→65 mapping is a closed-cohort exercise and is not a count of the population at either date** |
| **D-10** | "Special Assistance as Loan for Capital Investment" | ₹1,85,000.00 crore (States) | ₹2,00,000.00 crore (States **and** UTs with Legislature) | Statement 18 head I.f vs Demand No. 42 line 11, same budget | **definitional** | Yes — the ₹15,000.00 crore UT share sits at Statement 18 head IV.d. **Recorded because it is the general shape of the trap** (PR-8) |
| **D-11** | The transfers total | **gross of loans** | **net of loans** (back-to-back GST loans; Special Assistance as Loan) | Statement 18 prints loans inside the total; no instrument prints the total without them | **definitional** | **Computable, never published.** Moves the untied share by **5.2 points in FY2024-25 and 6.4 points in FY2021-22** — more than the FC-XV award moved it |
| **D-12** | The wage component of the rural employment guarantee | **100% Central statutory liability**, payable within 15 days (MGNREGA, per the Union's own SBE note) | **60:40 Centre:State** under a statutory 125-day guarantee (VB-G RAM G, BE 2026-27) | Demand No. 87 SBE, **same document, adjacent notes** | **definitional and consequential** | **Not by measurement.** Which characterisation governs is a question about the successor instrument, which I did not retrieve (LR-6) |

**One disagreement the brief anticipated and this part could not test: PFMS release figures against
the Budget's.** I did not retrieve a PFMS figure. The delegated attempt is in the addendum; **until
it returns, no PFMS number appears anywhere in this part**, and D-8 (CAG vs Budget) is the only
cross-instrument test of a transfer quantity this part actually performed.

---

## Disciplining measure

*(Per quantity: is there an instrument putting BOTH the Centre's and the States' facts on ONE ledger,
so neither side's number can be quoted without the other's being visible in the same document? And —
the caveat that is itself the finding — does such an instrument supply independent **evidence**, or
only a shared **basis**?)*

### The general answer for this part, stated first

**Almost nothing in this part has two parties on one ledger, because almost nothing in this part has
two parties at all.** The quantities here — how much the Union transferred, under what head, to whom,
in what year — are *produced entirely by the Union*. States do not measure them; they receive them.
The Union is the payer, the classifier, the accountant and the publisher. **A Centre-produced
statement of what the Centre sent is a single ledger containing one party's bookkeeping**, and the
brief asks whether that is discipline.

**The answer this part reaches is: not in general, but in two specific circumstances it is
evidentially binding, and both occur here.**

**(a) When a single-party instrument prints the same quantity twice and the two disagree.** This is
the mechanism that produced the two strongest provenance findings in the part, and neither required
any second party. **PR-1**: *Budget at a Glance 2026-27* gives "total transfers to States" as
₹25,43,769 crore in its prose and ₹26,20,769 crore in its table, two pages apart. **PR-5**: Statement
18 gives the FY2023-24 Budget Estimate as ₹8,41,426.38 crore in one edition and ₹10,51,514.47 crore
in the next. **Neither could have been found by comparing the Union to anyone. Both were found by
comparing the Union to the Union — across pages in the first case and across time in the second.**
The Union's own publication schedule, which prints every Budget Estimate twice, is a check on the
Union that the Union did not design and cannot easily evade. **Time is a disciplining axis whenever a
single-party instrument reports the same quantity more than once**, and this part recommends that the
authoring stage treat it as one.

**(b) When a single-party instrument concedes a fact against its own interest.** Three times in this
part the Union writes down something no adversary could have extracted from it. The **§12 footnote**
— *"includes releases made to States both through State treasuries and other implementing
agencies"* — concedes that the FY2014-15 routing change did not end direct-to-agency releases, eight
budgets after the statement measuring them was abolished. The **SNA SPARSH head note** concedes that
the Union's own SNA model *"resulted in transfer of balances outside the Consolidated Fund of India
and the Consolidated Fund of the State(s) … where the released funds remain idle"* and forced
borrowing to bridge cash mismatches. And **FC-XV para 12.51(ii)** concedes that *"there seemed to be
confusion about the number of existing CSS."* **An admission against interest in a party's own
published record is evidence, and it is the strongest kind available in a single-party corpus.**

**What neither circumstance can reach — and this is the limit that matters most.** A single-party
instrument cannot disclose a **definitional choice shared by all its editions**. Nothing inside the
Union Budget could ever reveal that "transfers to States" excludes something every edition has
excluded, because there is no second reading to disagree with. **That is precisely what the CAG's
₹0.66–1.0 lakh crore gap (PR-3) exposes, and it is why the two binding absences of this part are
A-3 (the treasury/agency split) and A-2 (the State dimension).** They are the two facts that no
amount of internal comparison can recover.

### Testing the two sibling findings against this part's evidence

**(i) "The GST Council minute book is a shared ledger of *arguments*, not of *facts*, because every
number in it originates with the Department of Revenue" (part 01).** **This part confirms the
principle and supplies a second instance with a different shape.** The Sub-Group of Chief Ministers'
report is this part's nearest analogue to the Council minute book: a document produced by a body of
ten Chief Ministers, recording States' positions on centrally sponsored schemes. **And every fiscal
number in it is the Union's** — the ₹3.38 → ₹2.05 lakh crore CASP figures, the ₹2.52 → ₹1.69 lakh
crore CSS figures, the ₹1.78 lakh crore additional devolution, the 66-scheme list, the 10% flexi-fund
baseline. **The States contributed the recommendation and the Union contributed every quantity it was
computed against.** So the principle generalises: **in Centre-State fiscal instruments, States supply
positions and the Union supplies measurements**, and a body's federal composition does not change
that. The Sub-Group is, however, evidentially stronger than the Council minute book in one respect
part 01 identified: it is **binding as to what was asked for**. The Sub-Group asked for 25% flexi-
funds and got a 10% guideline; that the ask was made and not met is established by a document the
Union itself published on a Union website.

**(ii) "CAG State Finances Audit Reports DO print the Union's PFMS release figure and the State's
Finance Accounts receipt figure in one paragraph (Bihar FY2022-23, para 4.21(iv)) — genuinely both
sides on one ledger, but retrospective, and silent by design on whether the Union *should* have
released more" (part 07).** **This part confirms it, sharpens it, and identifies the property that
actually does the work.**

Set part 07's instrument beside this part's PR-3. Both are CAG. Both put two numbers for one quantity
in one document. **But they are not the same kind of instrument at all.**

- **Part 07's Bihar SFAR** compares a **Union** record (PFMS release, ₹24,398.36 crore) with a
  **State** record (Finance Accounts receipt, ₹22,481.46 crore) and a second State record (transfer
  to implementing agencies, ₹22,231.91 crore). **Two parties' books, one auditor, one paragraph.**
- **This part's PR-3** compares the **Union Budget** with the **Union Finance Accounts**. **One
  party's books, twice, one auditor.** The States contribute nothing to it.

**And PR-3 is the one that found the ₹1 lakh crore.** That is the finding: **it is the independence
of the auditor, not the presence of two parties, that does the disciplining work.** Part 07's Bihar
paragraph is more complete — it shows all three stages of the money and it is the only instrument in
this phase that does — but its power comes from the same source: an officer of the CAG standing
between two claimants, not from the arithmetic of two ledgers. **Two parties' books with no
independent compiler would produce two irreconcilable numbers and no adjudication**, which is exactly
what part 07's own D1 shows happening between "released" and "dues outstanding".

**And part 07's caveat holds without qualification here.** The CAG is retrospective — Report No. 21
of 2023 audits FY2021-22 — and **silent by design on whether the Union should have released more.**
It audits classification and compilation, not entitlement. **Nothing in this part's corpus, at any
tier, adjudicates whether a transfer that was budgeted and not made ought to have been made.** That
question has no instrument. It is why A-4 (no stated reasons for in-year revisions) is not a
housekeeping absence but the one that makes LR-5 untestable.

### Per quantity

| quantity | is there a one-ledger instrument? | independent evidence, or only a shared basis? |
|---|---|---|
| **Total transfers to States and UTs, by year** | **No second party exists.** The Union's *Budget at a Glance* is the sole instrument | **Shared basis only — and it disagrees with itself.** PR-1 (₹77,000 crore, prose vs table) and PR-5 (₹2.10 lakh crore, edition vs edition) are internal contradictions, which is the only discipline available. **Binding as to the contradiction, silent as to which figure is right** |
| **Tax devolution, aggregate and by State** | **Effectively yes, and it is the best-disciplined quantity in the part** | **Closest to independent evidence of anything here.** It is formula-bound by a Finance Commission (a third body), assigned by Article 270, published by State to three decimals in Annex 4B, and lands in each State's Finance Accounts where the CAG audits it. **This is why it is a defensible numerator and why the untied share is a better-founded series than any tied-money series in this part** |
| **CSS transfers to States, aggregate** | **Yes — the CAG's audit of Union accounts (PR-3)** | **Independent evidence, and it is the single most valuable instrument in this part.** But note its exact scope: **it audits the Union against the Union.** It establishes that the Budget's figure and the Finance Accounts' figure differ by ₹0.66–1.0 lakh crore a year. **It does not establish which is the transfer to States**, because that turns on the treasury/agency split the Union does not publish (A-3) |
| **CSS transfers to a named State** | **No Union instrument at all** (A-2). Part 07 reports that the **CAG State Finances Audit Report** does it for one State-year, from both sides | **The State-level instrument is the strongest in the phase and this part does not hold it.** For the Union side there is nothing: the numerator is published per State and the denominator is not |
| **Whether a release was made, and when** | **Partly — Statement 4AA prints BE, RE, released-to-date, SNA balance and treasury balance in one row** | **Shared basis, one party, and it is the Union's best voluntary disclosure in the whole corpus.** It is genuinely informative — it is what makes §13 possible — but every number in it is the Union's, and **it reports the cash position without reporting the entitlement position.** A State's claim that more was due appears nowhere in it |
| **Whether a release *should* have been made** | **No instrument, at any tier** | **Neither.** The CAG does not audit entitlement; the Budget states no reasons (A-4); no adjudicating body exists. **This is the largest disciplining gap in the part and it is structural, not accidental** |
| **The scheme count and the tier of each scheme** | **Yes, formally — the Union Budget's annexes and FC-XV both state it** | **Neither, and they contradict.** 6+19+3 by numbering, 6+20+3 by lines, 6+20+2 per FC-XV, and **the canonical "28" is not reconstructible from the primary document** (PR-4 verified). Two official accounts of a decision, disagreeing about a tier that fixes a funding ratio |
| **The State's matching-share obligation** | **No instrument on either side** (D-4) | **Neither.** The Union publishes its own share; no Union document computes the implied State liability, and no State document I hold aggregates it. **A quantity that no party measures is not disciplined by anyone** |
| **The direct-to-agency channel after FY2014-15** | **No — the instrument was abolished** (LR-2) | **Neither, and the abolition is why.** The Union's 2024 footnote concedes the channel exists; nothing measures it. **This is the cleanest demonstration in the part that a party can extinguish a disciplining instrument unilaterally, without announcement, by reusing its number for another subject** |
| **The meaning of "released"** | **Yes — the Union's own Statement 4AA head note states all three regimes** | **Independent evidence as to the definitional history, in the only sense available for a definitional fact.** The Union cannot un-write its own description of what SNA and SPARSH changed. **But no bridging series exists** (A-5), so the concession disciplines the *label* and not the *numbers* |

### The conclusion to carry into the authoring stage

**On the untied share — the headline quantity of this part — there is genuine discipline, and it
should be said plainly.** Tax devolution is formula-bound by a third body, constitutionally assigned,
published per State, and audited on both sides. **That is why `untied-share-total-transfers` can be
authored with confidence in its numerator.** Its denominator is a Union artefact that has been
restated by ₹2.10 lakh crore without notice and that means two different things in one document —
**so the series is only as good as the explicitness of its unit string**, which is why this part puts
the denominator inside the unit and offers three of them.

**On tied money there is no discipline worth the name, and the reason is not secrecy.** It is that
the Union is the only party that measures, and the two facts that would let anyone else check it —
the State dimension (A-2) and the treasury/agency split (A-3) — are the two facts it does not
publish. **Neither is withheld in any sense this part can evidence** (A-7). **Both are simply not
built**, while the identical instrument is built and maintained for the money the World Bank, the ADB
and JICA audit (A-6). **That contrast is the finding: the Union publishes by State exactly where a
third party requires it to, and nowhere else.**

---

## Addendum

### PR-9 — Two statements of the same Expenditure Profile give the CSS total ₹10,565–14,901 crore apart

Found while verifying the inherited §9 figure. **Statement 4A ("Centrally Sponsored Schemes",
ministry- and scheme-wise) and Statement 18 (head III.a + head IV.a, the CSS transfer to States and
to UTs with Legislature) both total centrally sponsored schemes, in the same volume**, and they do
not agree:

| column | Statement 4A, Revenue | Statement 18, III.a + IV.a | gap |
|---|---|---|---|
| Actuals FY2024-25 | 4,02,338.05 | 3,91,773.39 | **10,564.66** |
| BE 2025-26 | 5,41,826.78 | 5,26,926.16 | **14,900.62** |
| RE 2025-26 | 4,20,059.07 | 4,09,453.30 | **10,605.77** |
| BE 2026-27 | 5,48,279.98 | 5,33,945.18 | **14,334.80** |

(₹ crore. `https://www.indiabudget.gov.in/doc/eb/stat4a.pdf` — Grand Total line, Revenue column,
which reads `402338.05 … 541826.78 … 420059.07 … 548279.98`, with a Capital column of 29.57 / 23.43 /
18.63 / 517.75 and a Grand Total of **4,02,367.62** for FY2024-25 Actuals, confirming the inherited
§9 figure exactly — and `https://www.indiabudget.gov.in/doc/eb/stat18.pdf`.)

**The gap is systematic, not noise** — it appears in all four columns, in the same direction, at the
same order of magnitude. **Definitional**: Statement 4A totals the Union's CSS *provision*;
Statement 18 totals the part of it classified as a *transfer to a State or UT with Legislature*.
The residue — money provided under a centrally sponsored scheme that the Union does not classify as
a transfer to a State — is **₹10,564.66 crore in FY2024-25 Actuals and is never itemised**. It is
also, note, the same order of magnitude as the Union's own admitted implementing-agency channel
(A-3) but an order of magnitude smaller than the CAG gap (PR-3), so **it is not the same
discrepancy** and does not explain it.

**Why it belongs in the record.** It is a third instance of the disciplining mechanism identified at
§Disciplining measure (a): **the finding required no second party — only the Union printing the same
quantity twice in one volume.** Any series named "centrally sponsored schemes" must state which of
the two statements it came from, and this part's `css-transfers-revenue-states` comes from
Statement 18.

---

### 19 — The aggregate of §13, which the per-scheme table's own Total line gives

Verifying §13's per-scheme figures against `https://www.indiabudget.gov.in/doc/eb/stat4aa.pdf`
(HTTP 200, 848,479 bytes) reproduced every one of them exactly — Jal Jeevan 67,000.00 / 17,000.00 /
**31.00** / 5,371.12 / 145.54 / 5,516.66; Samagra Shiksha 41,250.00 / 38,000.02 / 14,715.16;
MGNREGA 86,000.00 / 88,000.00 / 72,115.79; PMAY-Rural 54,832.00 / 32,500.01 / 12,178.74; Swachh
Bharat Mission-Urban 5,000.00 / 2,000.00 / 1,006.11; Ayushman Bharat PM-JAY 9,406.00 / 9,000.00 /
6,637.83 — **and the table carries a Total line that §13 does not report:**

| | BE 2025-26 | RE 2025-26 | released by GoI to 31.12.2025 | SNA balance | CSS funds in State treasuries | total idle |
|---|---|---|---|---|---|---|
| **Total, all schemes in the statement** | **5,05,749.72** | **3,76,113.15** | **2,08,380.05** | **43,636.16** | **25,323.52** | **68,959.68** |

(₹ crore. The statement's own head note limits it to schemes with a BE above ₹500 crore.)

**Three quantities follow, all T1, all the Union's own.**

1. **At three-quarters through FY2025-26 the Union had released 41.2% of the Budget Estimate** for
   the centrally sponsored schemes this statement covers, and **55.4% of the Revised Estimate** —
   the RE itself already having been cut by ₹1,29,636.57 crore (25.6%) below the BE.
2. **₹68,959.68 crore of previously released money was idle** at the same date — **33.1% of
   everything released in the year**, sitting in Single Nodal Agency accounts (₹43,636.16 crore) and
   in State treasuries (₹25,323.52 crore).
3. **Both facts are true at once, and that is the whole difficulty of this part.** A third of what
   the Union sent was unspent, and three-fifths of what the Union budgeted was unsent. **The Union's
   case (parking) and the States' case (non-release) are both evidenced, in one table, by the same
   party, at the same date** — and the table settles neither, because it reports the cash position
   and not the entitlement position.

**Handling rules.** This is a **part-year figure at 31 December 2025** and must never be plotted as
an annual point or compared with a full-year Actual. Its denominator is the statement's own scheme
set (BE above ₹500 crore), **not** the Statement 4A or Statement 18 CSS totals, which differ from
each other in any case (PR-9). And the statement has existed in this form for two editions only
(§3), so there is no prior year to compare it with.

---

**Model of record.** These additions (§15–§19, PR-4 verified, PR-9, and the eight mandated sections)
were produced in a session whose system prompt states: *"You are powered by the model named Opus 5.
The exact model ID is `claude-opus-5`."* Two subagents were dispatched on opus; where their material
is used it is recorded below with the model each one's own transcript reports, and any material whose
model of record could not be confirmed is marked as such.

---
