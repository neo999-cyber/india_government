# Phase 13 — federalism — stage 2, part 07
# Case states: West Bengal and Bihar

Run: `/phase federalism`. Model recorded on this transcript: **claude-opus-5** (requested opus; the
transcript records `claude-opus-5`). One subagent was dispatched (parliamentary sweep, opus). The
concurrent-subagent ceiling (20) was already saturated by sibling parts, so **four further planned
subagents could not be launched and their threads were run by this part directly**. That is recorded
because it bears on coverage: the Finance Commission, CAG, RBI and court threads were run serially
by one worker rather than in parallel, and the court thread ran into a hard stop (§9).

Every figure below carries the instrument that produced it. Nothing is filled from memory.

---

## The analytical result, stated first

The phase's stated purpose for this part is to **split the devolution dispute from the conditionality
dispute**. That separation is established, and it is sharper than expected:

- On **devolution**, West Bengal and Bihar sit on opposite sides of a line that also has Tamil Nadu
  on it. Bihar's share of the states' pool has run between 9.67 and 10.92 per cent across the last
  three awards against a 2011 population share of 8.74 per cent. West Bengal's has run 7.26 to 7.52
  per cent against a 2011 population share of **7.67 per cent** — that is, **West Bengal has received
  slightly LESS than its population share under every Finance Commission since the Thirteenth**
  (ratio 0.95, 0.95, 0.98), while Bihar has received more (1.25, 1.11, 1.15) and Tamil Nadu much less
  (0.82, 0.66, 0.67). West Bengal is a *net recipient in level* and *approximately neutral on the
  horizontal formula*. It is not the formula's beneficiary. Source: Sixteenth Finance Commission,
  Report for 2026-31, Vol. I, Tables 8.4 and 8.5 (T1, retrieved).
- On **conditionality**, West Bengal is the extreme case in the country and Bihar is nowhere near
  it. West Bengal received **₹0.00** under MGNREGA in FY2022-23 on the Union's own by-state release
  table; Bihar received ₹6,395.29 crore in the same year. Source: PIB / Lok Sabha Unstarred Question
  No. 254, 5 December 2023, Annexure-II (T1, retrieved).

So the two disputes come apart cleanly: **a state can be near-neutral on the formula and still be the
country's sharpest instance of withholding.** The public argument that runs them together ("Bengal
gets more than it gives, so it should not complain") does not survive the Sixteenth Finance
Commission's own ratio table.

Bihar supplies the mirror finding the phase was missing. Its constraint is not withholding — it is
**that it cannot afford to be a recipient**. The CAG's Bihar State Finances Audit Report for
FY2022-23 records that the state raised its Contingency Fund corpus from ₹350 crore to ₹9,500 crore
expressly *"to meet the State share of Central Government sponsored schemes, for which sufficient
budgetary provisions of corresponding state share had not been made"*, and separately that
**"GoB had not released the proportionate State share of ₹2,258.37 crore to SNA"**. Item 8 of the
brief anticipated an absence finding here. It is not an absence. It is measured, by the Union's own
constitutional auditor, in the state's own accounts (§Findings — Bihar, 8).

---

## Findings — West Bengal

### 1. MGNREGA stopped under section 27

**The date and the ground — established at T1, in the Union's own words.**
Lok Sabha Unstarred Question No. 254, answered 5 December 2023 by the Minister of State for Rural
Development (Sadhvi Niranjan Jyoti), reported through PIB Kolkata, states verbatim:

> "Release of funds to the State of West Bengal has been stopped from March 9, 2022 as per provision
> of Section 27 of the Mahatma Gandhi National Rural Employment Guarantee Act, 2005 due to
> non-compliance of directives of the Central Government."

Two dates circulate and they are different quantities. **9 March 2022** is the Union's own stated date
of the *stoppage of release of funds*. The **last wage instalment** is reported (T4) as 26 December
2021, and the *stoppage of issuing work* is reported (T4) as from March 2022. The scope note for this
phase carried "December 2021" from stage 1; **the Union's own date for the section 27 action is
9 March 2022** and that is what the record should carry, with the December 2021 last-payment date
noted separately as a different fact.

**The amounts not released — the Union's own by-state table.**
Annexure-II to the same answer, "State/UT-wise details of funds released under Mahatma Gandhi NREGS",
in ₹ lakh (converted to ₹ crore here, arithmetic mine, inputs shown):

| State | FY2020-21 | FY2021-22 | FY2022-23 |
|---|---|---|---|
| West Bengal | ₹11,454.05 cr (11,45,405.21 lakh) | ₹7,507.80 cr (7,50,780.15 lakh) | **₹0.00** |
| Bihar | ₹7,284.24 cr | ₹5,407.37 cr | ₹6,395.29 cr |
| Tamil Nadu | ₹8,788.82 cr | ₹9,638.13 cr | ₹9,706.62 cr |
| Uttar Pradesh | ₹12,014.10 cr | ₹8,509.57 cr | ₹10,629.01 cr |

West Bengal is the only entry in the 34-row table with a zero for FY2022-23 (Lakshadweep and Dadra &
Nagar Haveli show 0.00 in some years; among the twenty-eight States, West Bengal alone).

**The pending liability — and the Union's figure moves.** Two Union figures exist and they are not
the same quantity:
- **₹5,553 crore** — "As per data available in NREGA Soft and PFMS an amount of Rs.5553 crore is the
  pending liability under wage and material components for the State Government of West Bengal"
  (LSUQ 254, 5 December 2023). **T1, retrieved.**
- **₹3,082.52 crore** — the pending liability *as at 8 March 2022, the day before the stoppage*,
  disaggregated as ₹1,457.22 crore wages, ₹1,607.68 crore material, ₹17.62 crore administration.
  **T4, known only through a relayed account; not retrieved from a Union document.**
- **₹3,038 crore** — the Union's figure in a Rajya Sabha written answer of 1 August 2025 (MoS Rural
  Development, Kamlesh Paswan). **T4, relayed; not retrieved.** The parliamentary subagent was tasked
  with this and had not reported at the time of writing (§9).

These are **not inconsistent**; they are three different quantities (accrued liability at a date;
accrued liability three years later including material and administration; a later restatement). The
authoring stage must not collapse them.

**Workers and job cards affected.** New job cards issued in West Bengal (same answer, Annexure-I):
FY2020-21 **16,82,297**; FY2021-22 **8,25,225**; FY2022-23 **2,14,953** — a fall of 87.2 per cent over
two years (arithmetic mine). The frequently repeated figure of "2.5 crore workers affected" is **T4
and unretrieved**; the count of *active workers* in West Bengal at the date of stoppage is
**unretrieved** and is recorded as an absence.

**Whether wages already earned went unpaid.** The Union's own ₹3,082.52 crore/₹5,553 crore "pending
liability" figures include a wage component, which is on its face an acknowledgement that earned
wages were outstanding. The wage component is stated at ₹1,457.22 crore at T4 only. **Unretrieved at
T1.**

**Resumption and the condition.** The Calcutta High Court directed implementation from **1 August
2025**; the Supreme Court dismissed the Union's challenge on **27 October 2025**; the Calcutta High
Court then directed resumption again. All three are **T4** here — see §9 for why, and read the
caveat: I could not obtain the courts' own copies.

**The section 27 order itself: NOT RETRIEVED.** See §9. `nrega.nic.in`'s circulars path returned 404;
no MoRD order or letter to the Government of West Bengal invoking section 27 was located on
`rural.gov.in` or `nrega.nic.in`. The order's existence, date and ground are known only from the
Union's *description* of it in Parliament — which is T1 evidence of the description, not of the
document.

### 2. The Union's case, in its own terms and its own figures

This deserves as serious a statement as the state's. Two PIB releases carry it, both retrieved (T1,
Union — party to the dispute).

**PIB 2152391, 4 August 2025, Minister of Agriculture and Rural Development Shivraj Singh Chouhan:**

> "Between 2019 and 2022, central teams investigated 19 districts of West Bengal and found massive
> irregularities in MGNREGA works. These included no actual work at the workplace, splitting of works
> in violation of rules, and serious issues like misappropriation of funds. As a result, the Ministry
> of Rural Development had to stop releasing funds to West Bengal under Section 27 of the MGNREGA
> Act."

The same release gives the Union's cumulative figures for West Bengal from FY2014-15: ₹1.10 lakh
crore total from the Ministry of Rural Development, of which **₹54,465 crore under MGNREGA
(2014-15 to 2022)**, ₹25,798 crore PMAY-G, ₹16,505 crore PMGSY, ₹8,389 crore NSAP, ₹3,881 crore NRLM,
₹274 crore DDU-GKY/RSETI.

**PIB 1963198, 2 October 2023, Minister of Rural Development Giriraj Singh** — the Union's fullest
rebuttal, with a UPA/NDA comparison table (₹ crore, as printed):

| Scheme | UPA | NDA |
|---|---|---|
| MGNREGA (central funds released) | 14,985 | 54,150 |
| PMGSY (total expenditure incl. state share) | 5,431 | 11,051 |
| PMAY (funds released) | 4,466 | 30,000 |
| NRLM bank linkage | 626 | 74,034 |
| NRLM RF/CIF | 23 | 3,735 |
| NSAP (funds released) | 3,685 | 6,806 |
| Finance Commission (funds released) | 3,270 | 25,000 |
| RGSA (funds released) | 41 | 227.41 |
| **Total** | **58,058** | **2,05,003.41** |

and the allegation: **"West Bengal government issued 25 lakh fake MNREGA job cards"**; that the state
failed to act on a monitoring team's report; that an Action Taken Report was demanded repeatedly;
that the state was warned "non-submission of ATR in time could also lead to withholding of funds
under MNREGA Act 2005"; and that the ATR eventually filed was one "protecting the culprits".

**Note the table's own definitional break, which is the Union's, not mine.** The MGNREGA row is
"central funds released"; the PMGSY row is "total expenditure including state share". A table that
mixes a Union-share basis and a total-outlay basis in adjacent rows is not comparable down its own
column. This is the "Union share vs total outlay including matching share" break the brief names, and
it appears *inside a single Union document*.

**The two cases rest on DIFFERENT WEIGHTINGS OF THE SAME FACTS, not on different facts.** Neither
side disputes that (i) central teams found irregularities in West Bengal's MGNREGA works, (ii)
section 27 exists and confers the power, (iii) release was stopped on 9 March 2022, (iv) a pending
liability with a wage component existed at that date. The Union weights (i) and (ii) as sufficient;
the state weights (iv) — that a statutory entitlement of workers, not of the state government, was
suspended over a dispute between governments — as decisive. The single genuinely factual dispute is
the "25 lakh fake job cards" figure, which the state contests and which is **unretrieved from any
document; it appears only as a minister's assertion in a press release.**

### 3. Other schemes

- **PMAY-G.** The Union's stated grievance is *branding plus eligibility*: "complaints were received
  about the state government changing the name of the central scheme to Bangla Awas Yojana"
  (PIB 1963198, T1); "the state government selected ineligible families, removed eligible ones and
  changed the name of the scheme while disregarding the rules. All these complaints were found to be
  correct by national and central monitoring teams" (PIB 2152391, T1). Physical position as at
  17 March 2025 (PIB 2113753, Lok Sabha answer, T1): West Bengal target **45,69,423**, completed
  **34,19,193**; Bihar target **44,92,010**, completed **37,22,797**. **The dates and amounts of any
  PMAY-G release stoppage to West Bengal are UNRETRIEVED at T1** — the Union's releases figure of
  ₹25,798 crore cumulative is retrieved but is not disaggregated by year.
- **The branding instruction itself is UNRETRIEVED.** No Union order requiring Union insignia or the
  scheme name on state-implemented works was located. What is retrieved is the Union *complaining*
  about renaming, which is not the same as an instruction. Recorded as `not-published` unless a
  named requester and date can be established.
- **Jal Jeevan Mission, National Health Mission, Samagra Shiksha for West Bengal: UNRETRIEVED at T1.**
  Samagra Shiksha withholding is already held in the instrument at **L-0101**, but on Tamil Nadu, not
  West Bengal. The state's own claim puts Samagra Shiksha dues to West Bengal at **₹15,864.84 crore**
  — T4, relayed, and a party's figure.

### 4. The state's counter-claim — and who computed it

**Every figure in this paragraph is a party's own figure and none was retrieved from a West Bengal
government document.** The West Bengal Finance Department's own site could not be reached at all
(§9), so the state side of this dispute is held here entirely at T4 through relayed accounts.

Figures in circulation, all attributed to the Chief Minister or the ruling party:
- **₹1.16 lakh crore** — letter from the Chief Minister to the Prime Minister, 20 December 2023,
  described as dues "on account of various Centrally Sponsored Schemes and pending claims for natural
  disasters over past years" (T4).
- **₹1.75 lakh crore** — Chief Minister, July 2025 (T4).
- **₹97,807.91 crore** — Trinamool Congress, itemised, including Samagra Shiksha ₹15,864.84 crore
  (T4).
- **~₹52,000 crore** under MGNREGA alone — Trinamool Congress (T4).

**How this figure differs BY DEFINITION from the Union's.** The Union publishes *funds released*: a
cash number, the sum actually transferred in a year. The state publishes *dues outstanding*: the sum
it says would have been released had the Union applied the normal allocation rules — that is,
**counterfactual allocation minus actual release, accumulated**. The two quantities do not contradict
each other and there is no arithmetic that reconciles them, because they answer different questions.
The Union's ₹0.00 for FY2022-23 and the state's ~₹52,000 crore MGNREGA claim are **both true of
different objects**. Resolved formally in §11.

The campaign framing ("Bonchito Bangla" / deprived Bengal) was **not located as such** in any
retrievable source; the term itself is unretrieved and should not be asserted.

### 5. The Governor

**Almost entirely unretrieved and bounded away.** Part 05 owns Governors and the LG. What is
established here: C. V. Ananda Bose was Governor of West Bengal from 18 November 2022 to 11 March
2026 (T4, encyclopaedic — weak). The West Bengal assent litigation and the university-chancellor /
vice-chancellor appointment proceedings were **not retrieved**: the Supreme Court's and Calcutta High
Court's own search interfaces are CAPTCHA-gated and completing a CAPTCHA is prohibited (§9). The
Supreme Court's April 2025 Tamil Nadu assent judgment and the subsequent Article 143 Presidential
Reference are **part 05 and part 06 material**, forward-referenced rather than duplicated.

### 6. State finances — West Bengal

From the **CAG's State Finances Audit Report, Government of West Bengal, for the year ended
31 March 2021 (Report No. 1 of 2022), Table 2.3, sourced by the CAG to the Finance Accounts** (T1,
retrieved; the CAG audits the state, and the state is a party — but the CAG is not):

| ₹ crore | FY2016-17 | FY2017-18 | FY2018-19 | FY2019-20 | FY2020-21 |
|---|---|---|---|---|---|
| Revenue receipts | 1,17,832 | 1,31,270 | 1,45,975 | 1,42,914 | 1,48,394 |
| Own tax revenue | 45,466 | 52,721 | 60,732 | 60,669 | 60,287 |
| Non-tax revenue | 2,950 | 3,117 | 3,657 | 3,213 | 5,198 |
| State's share of Union taxes | 44,625 | 49,321 | 55,776 | 48,048 | 44,737 |
| Grants-in-aid from GoI | 24,791 | 26,111 | 25,810 | 30,984 | 38,172 |
| GSDP (2011-12 series) | 8,72,527 | 9,74,700 | 11,02,283 | 12,07,823 | 13,01,017 |
| RR/GSDP (per cent, CAG-published) | 13.50 | 13.47 | 13.24 | 11.83 | 11.41 |

Derived by me from the CAG's inputs (stated as computed): own tax revenue as a share of revenue
receipts **38.59 / 40.16 / 41.60 / 42.45 / 40.63 per cent**; Union transfers (share + grants) as a
share of revenue receipts **58.99 / 57.44 / 55.89 / 55.30 / 55.87 per cent**; own tax revenue as a
share of GSDP **5.21 / 5.41 / 5.51 / 5.02 / 4.63 per cent**.

Note the structural fact visible inside this table: between FY2018-19 and FY2020-21 West Bengal's
**share of Union taxes fell by ₹11,039 crore** while **grants-in-aid rose by ₹12,362 crore**. The
composition of the transfer shifted from the untied, formula-bound instrument to the tied,
discretionary one across exactly the period in which the conditionality dispute begins.

From the **Sixteenth Finance Commission, Vol. I, ch. 5** (T1, retrieved; sourced by the Commission to
**"States' Finance Accounts"**), for FY2023-24:
- West Bengal own tax **5.4 per cent of GSDP**, non-tax **0.2 per cent** — the lowest own-tax-to-GSDP
  ratio among the nineteen large non-NEH states shown, below Bihar's 5.6.
- Reliance on devolution and grants as a share of revenue receipts: **West Bengal 53.5 per cent**
  (Bihar 72.3, Uttar Pradesh 55.5, all-States average 42.2, non-NEH average 39.9).
- Fiscal deficit **3.3 per cent of GSDP**, revenue deficit **1.6**, total outstanding liabilities
  **38.3 per cent of GSDP** (internal debt 31.6, loans from the Union 1.6, public account 5.1) —
  second highest among non-NEH states after Punjab.
- Total expenditure **15.3 per cent of GSDP** (revenue 13.6, capital 1.7).
- Commission's narrative: West Bengal began at a debt-to-GSDP ratio of **40.1 per cent in FY2011-12**
  and "has not been successful in achieving a meaningful fiscal consolidation"; "borrowings being
  substantially used to finance" revenue deficits; "capital expenditure has been low" (paras 5.55-5.56).

**West Bengal's own budget documents were NOT retrieved** (§9). Nothing in this section rests on a
West Bengal government publication.

---

## Findings — Bihar

### 6. The horizontal formula from the receiving end

All from Finance Commission reports retrieved directly as PDFs from `fincomindia.nic.in` and
text-extracted with `pdftotext -layout` (T1).

**Inter-se share of the states' share of central taxes, per cent:**

| Commission (award) | Bihar | West Bengal | Tamil Nadu | Source |
|---|---|---|---|---|
| FC-XI | 14.60 | 8.12 | 5.39 | FC-16 Table 8.4 |
| FC-XII | 11.03 | 7.06 | 5.31 | FC-16 Table 8.4 |
| FC-XIII (FY2010-11→FY2014-15) | **10.917** | **7.264** | **4.969** | FC-13 Table 8.2, read directly |
| FC-XIV (FY2015-16→FY2019-20) | **9.665** | **7.324** | **4.023** | FC-14 Table 8.2, read directly |
| FC-XV (FY2021-22→FY2025-26) | **10.058** | **7.523** | **4.079** | FC-15 Vol. I Table 6.5, read directly |
| FC-XVI (FY2026-27→FY2030-31) | **9.948** | **7.215** | **4.097** | FC-16 Vol. I Table 8.9, read directly |

Population shares for scale, from FC-16 Table 8.4: Bihar 8.20 (2001) / **8.74 (2011)**; West Bengal
7.92 / **7.67**; Tamil Nadu 6.17 / **6.06**.

**The Commission's own normalisation — devolution share ÷ population share** (FC-16 Table 8.5,
"Ratios of Share in Devolution to Share in Population: Non-NEH States"; the Commission notes it uses
2001 population shares for FC-XI and FC-XII and 2011 shares for FC-XIII to FC-XV):

| | FC-XI | FC-XII | FC-XIII | FC-XIV | FC-XV |
|---|---|---|---|---|---|
| Bihar | 1.78 | 1.35 | 1.25 | 1.11 | **1.15** |
| West Bengal | 1.03 | 0.89 | 0.95 | 0.95 | **0.98** |
| Tamil Nadu | 0.87 | 0.86 | 0.82 | 0.66 | **0.67** |
| All non-NEH | 0.99 | 0.98 | 0.97 | 0.95 | **0.95** |

**This is the single most load-bearing table in this part.** It is the Commission's own arithmetic,
not mine, and it says that West Bengal is at or just below parity throughout while Bihar's advantage
has *halved* since FC-XI.

**The criteria and weights, per cent, read from each report's own table:**

| Criterion | FC-XIII (Table 8.1) | FC-XIV (Table 8.1) | FC-XV (Table 6.4) | FC-XVI (Table 8.8) |
|---|---|---|---|---|
| Population | 25.0 (1971) | 17.5 (1971) | 15.0 (2011) | 17.5 (2011) |
| Demographic change / performance | — | 10 (2011 population) | 12.5 | 10 |
| Area | 10.0 | 15 | 15.0 | 10 |
| Forest (cover / and ecology) | — | 7.5 | 10.0 | 10 |
| **Fiscal capacity distance** | **47.5** | — | — | — |
| **Income distance** | — | **50** | **45.0** | — |
| **Per capita GSDP distance** | — | — | — | **42.5** |
| Fiscal discipline | 17.5 | — | — | — |
| Tax and fiscal efforts | — | — | 2.5 | — |
| Contribution to GDP | — | — | — | 10 |

**Three definitional breaks live inside this table and none of them is a data problem — they are
changes of object:**
1. **FC-XIII used "fiscal capacity distance", not income distance.** FC-XIV para 8.28: FC-XIII
   "introduced a new criterion based on distance between estimated per capita *taxable capacity*…
   However, we observed that the relationship between income and tax is non-linear… We have decided
   to revert to the method of representing fiscal capacity in terms of income distance and assigned
   it 50 per cent weight." A series called "income-distance weight" that runs 47.5 → 50 → 45 → 42.5
   **splices two different criteria at the first step.**
2. **The population base changes at FC-XV.** FC-XIV was bound by its ToR to 1971 (para 8.23) and
   handled 2011 as a separate 10 per cent "demographic change" criterion; FC-XV para 6.43: "the
   specific ToR has mandated the use of 2011 population data and so this is what this Commission has
   done." FC-XVI uses 2011 population at 17.5 per cent.
3. **FC-XVI introduces "Contribution to GDP" at 10 per cent**, defined as the state's share of
   all-states GSDP transformed by square root (para 8.95) — a criterion that rewards *size of
   economy*, i.e. the first explicitly anti-equalising criterion in the formula. FC-XVI's own
   justification: it "serves as a surrogate for efficiency-based criteria such as tax effort", because
   tax effort "exhibits a limited variation across States" — correlation 0.98 with population shares
   (para 8.96).

**How much of Bihar's share is attributable to income distance: NOT PUBLISHED, and this is a
first-class absence.** No Finance Commission report retrieved publishes a **criterion-by-state
decomposition** — a table of each state's share under each criterion. FC-XV's Annexes 6.1-6.4 give
the method and calculation table *per criterion* (Vol. II was downloaded; the per-criterion state
tables exist for the *inputs*, not as a share decomposition), and FC-XVI's Technical Note defines
C(i,j) — "the share of State j in the part of the States' portion of the divisible pool disbursed
based on criterion i" — **as a symbol, without publishing the matrix**. The quantity is therefore
*defined* and *computable from published inputs*, but **not published**. Recorded as `not-published`,
not `not-collected`: the Commission holds it.

**Vertical share.** 32 per cent (FC-XIII) → **42 per cent** (FC-XIV para 8.13, which lists as one of
its four considerations "States not being entitled to the growing share of cess and surcharges in the
revenues of the Union Government") → **41 per cent** (FC-XV). FC-XV para 6.9 gives the reason for
42→41 explicitly: it "only adjusted for the newly carved out Union Territories of Jammu and Kashmir
and Ladakh, keeping the balance share broadly equivalent at 41 per cent for the remaining twenty-eight
States." **FC-XVI para 7.68 retains 41 per cent.** So the 42→41 step is *not* a reduction in the
states' aggregate entitlement; it is the removal of a state from the denominator. Any series that
reads it as a cut is wrong.

**Per-capita transfer received against per-capita tax contributed: NOT ESTABLISHED.** The receiving
side is fully published (the ratio table above is its normalised form). The *contributing* side is not:
no Union publication retrieved attributes central tax collection to the state of economic origin, and
under GST's destination principle the concept of a state's "contribution" is itself contested.
Forward-referenced to part 01 and part 02.

### 7. Special category status

**The Union's stated reason, in Parliament.** Minister of State for Finance Pankaj Chaudhary, written
reply, Lok Sabha, **22 July 2024** (monsoon session, to a question by Shri Ramprit Mandal, JD(U)):
the case for special category status for Bihar "is not made out". The reasoning as reported rests on
the **Inter-Ministerial Group report of March 2012**, which concluded that on the existing National
Development Council criteria the case was not made out. **This is T4 — the answer PDF was not
retrieved** (§9); the parliamentary subagent was tasked with it and had not reported at the time of
writing.

**The 14th Finance Commission's abolition of the distinction — retrieved, T1.** FC-XIV **para 2.29**:

> "We did not make a distinction between special and general category states in determining our
> norms and recommendations."

What replaced it, in the Commission's own account of the same paragraph: an assessment of "the
disabilities arising from constraints unique to each State… Our objective has been to fill the
resource gaps of each State to the extent possible through tax devolution. However, we have provided
post-devolution revenue deficit grants for States where devolution alone could not cover the assessed
gap." The Commission's dissenting member, Prof. Abhijit Sen, lists it as the third of "five major
shifts": "to discontinue the distinction between special category and other States" (Note of Dissent,
FC-XIV).

The separate Union position — that special category status is **outside the Finance Commission's
Terms of Reference** altogether — is on the record from the Chairman of the Fifteenth Finance
Commission (PIB, "'Special Category Status' to states does not form part of Terms of Reference of
Finance Commission, says Shri N. K. Singh", PRID 1549490; located but **not retrieved**, T4).

**What was announced for Bihar in the FY2024-25 Union Budget — retrieved at T1 from the Budget
speech of 23 July 2024** (`indiabudget.gov.in/budget2024-25/doc/budget_speech.pdf`, paras 29-32, 83,
89-91):
- **Purvodaya** (para 29), a plan for Bihar, Jharkhand, West Bengal, Odisha and Andhra Pradesh — **no
  amount attached**.
- Road connectivity: Patna-Purnea Expressway, Buxar-Bhagalpur Expressway, Bodhgaya/Rajgir/Vaishali/
  Darbhanga spurs, an additional 2-lane Ganga bridge at Buxar — **"at a total cost of ₹26,000 crore"**.
- Power: a new 2,400 MW plant at Pirpainti and other projects — **"at a cost of ₹21,400 crore"**.
- Flood mitigation and irrigation (para 83): Kosi-Mechi intra-state link and 20 other schemes —
  **"projects with estimated cost of ₹11,500 crore"**.
- "An additional allocation to support capital investments will be provided" — **no amount**.
- "The requests of Bihar Government for external assistance from multilateral development banks will
  be expedited" — **a facilitation, not a transfer**.
- Temple corridors at Vishnupad and Mahabodhi; Rajgir; Nalanda — **no amounts**.

**The unit is "total cost of the project", not "grant to Bihar", not "in this financial year".** The
often-quoted "₹58,900 crore package" is the sum of three *project cost* figures across multiple years
and multiple financing routes (Union budget, AIBP, multilateral loans, central public sector
undertakings). It is **not a fiscal transfer figure and must not be entered as one.**
**Whether any of it was disbursed: UNRETRIEVED.**

The contrast the speech itself draws is instructive and should be carried: the adjacent paragraphs
(33-36) commit to Andhra Pradesh **"₹15,000 crore will be arranged in the current financial year"** —
a stated amount, a stated year, a statutory hook (the Andhra Pradesh Reorganisation Act). Bihar's
paragraphs have project costs and no year. **Two different instruments in the same speech.**

### 8. The matching-share burden — MEASURED, not absent

The brief anticipated this might be an absence finding. **It is not.** The CAG measures it, in Bihar's
own accounts, and the finding is unusually direct.

From the **State Finances Audit Report, Government of Bihar, for the year ended 31 March 2023
(Report No. 1 of 2024)**, retrieved as PDF from `cag.gov.in` (T1):

**(a) Bihar could not fund its matching share from budget provision and used the Contingency Fund
for it.** Para 3.4.7:

> "The State Government increased the corpus of the Contingency Fund from ₹350 crore to ₹9,500.00
> crore, on a temporary basis, for the period from 1 April 2022 to 30 March 2023. The increase in
> corpus was for relief on natural calamities like drought and earthquake **and to meet the State
> share of Central Government sponsored schemes, for which sufficient budgetary provisions of
> corresponding state share had not been made.**"

A **27-fold** temporary enlargement of the Contingency Fund, half of it ring-fenced for calamities,
the other half available for — among other things — matching shares the budget did not provide for.
116 withdrawals totalling ₹6,395.47 crore were made, of which 15 withdrawals totalling ₹3,327.42 crore
(52 per cent) the CAG found were "for foreseeable nature of expenditure".

**(b) The state share actually fell short, by a stated amount.** Para 4.21(ii):

> "During FY 2022-23, ₹35,420.09 crore was released (GoI: ₹24,398.36 crore and GoB: ₹11,021.73 crore)
> for CSS under SNA, out of which only ₹34,462.41 crore was accounted for as expenditure. An amount of
> ₹3,641.63 crore as advance and ₹6,673.73 crore was yet to be utilised against the release of
> ₹34,337.99 crore by the treasuries to SNA. **GoB had not released the proportionate State share of
> ₹2,258.37 crore to SNA.**"

**(c) And the transfer was slow.** Para 4.21(v): "The State Government had taken **up to 181 days
each**, to transfer the Central and State Shares, from the treasuries, to the SNAs."

**(d) The three-figure discrepancy, on one page, from one auditor.** Para 4.21(iv):

> "As per the Finance Accounts 2022-23, the State Government had received **₹22,481.46 crore** during
> 2022-23, in its Treasury Accounts. As on 31 March 2023, the Govt. had transferred Central share of
> **₹22,231.91 crore**, received in the Treasury Accounts and State Share of ₹14,190.40 crore, to the
> SNAs. However, **as per PFMS, GoI had released ₹24,398.36 crore** for CSS under SNA."

Three numbers for the same money in the same year: **₹24,398.36 crore released by the Union (PFMS),
₹22,481.46 crore received by the state (Finance Accounts), ₹22,231.91 crore passed on to the
implementing agencies.** A gap of ₹1,916.90 crore between "released" and "received" and a further
₹249.55 crore between "received" and "passed on" (arithmetic mine). This is the released-vs-received
break the brief asked about, **located in a single document by a single auditor who can see both
sides**. It is the strongest single piece of evidence in this part for the disciplining-measure
question (§12).

**Whether Bihar has ever SURRENDERED or forfeited a Union allocation for want of state share:
still not established.** (b) is a shortfall in transferring the state share to the SNA, not a
forfeiture of a Union allocation; the Union money was released. The narrower proposition —
"a Union allocation to Bihar lapsed or was reduced *because* the state could not fund its share" —
was searched (needle: *Bihar + surrendered/lapsed/under-drawn + centrally sponsored scheme + state
matching share*) across PIB, `cag.gov.in` and the Bihar SFARs for FY2021-22 and FY2022-23 and
**was not found**. **Positive control (M3): the same corpus and the same search method DID return
the two paragraphs quoted above, and returned the Union's West Bengal section 27 answers from PIB by
the same route** — so the corpus was live and the search method works. The negative is therefore a
real negative *for the documents searched*, but the search covered two years of one state's SFAR
and not the Appropriation Accounts, where surrenders are actually booked. **Reported as: not
established, corpus verified live, sweep incomplete.** The Appropriation Accounts route is named as
the next step rather than claimed as done.

### 9. Own-tax revenue and dependence

From the **CAG's Bihar State Finances Audit Report FY2022-23, Table 2.3**, sourced by the CAG to
"Finance Accounts of the respective years and MoSPI" (T1):

| ₹ crore | FY2018-19 | FY2019-20 | FY2020-21 | FY2021-22 | FY2022-23 |
|---|---|---|---|---|---|
| Revenue receipts | 1,31,794 | 1,24,233 | 1,28,168 | 1,58,797 | 1,72,688 |
| Own tax revenue | 29,408 | 30,158 | 30,342 | 34,855 | 44,018 |
| Non-tax revenue | 4,131 | 3,700 | 6,201 | 3,984 | 4,135 |
| Grants-in-aid from GoI | 24,652 | 26,969 | 31,764 | 28,606 | 29,025 |
| GSDP (2011-12 series) | 5,27,976 | 5,81,855 | 5,67,263 | 6,50,302 | 7,51,396 |
| RR/GSDP (per cent, CAG-published) | 24.96 | 21.35 | 22.59 | 24.42 | 22.98 |

Derived by me (stated as computed; the CAG's table does not print the state's share of Union taxes as
a separate line, so it is the residual RR − OTR − NTR − GIA): share of Union taxes **73,603 / 63,406 /
59,861 / 91,352 / 95,510** ₹ crore. Own tax as a share of revenue receipts **22.31 / 24.28 / 23.67 /
21.95 / 25.49 per cent**. Union transfers (share + grants) as a share of revenue receipts **74.55 /
75.99 / 71.48 / 75.54 / 72.12 per cent**.

**The comparison the phase needs, on one basis** — the Sixteenth Finance Commission's own published
figure for FY2023-24, reliance on devolution and grants as a percentage of revenue receipts (para
5.46, sourced to States' Finance Accounts):

| | Reliance on devolution and grants, FY2023-24 |
|---|---|
| **Bihar** | **72.3 per cent** |
| Uttar Pradesh | 55.5 per cent |
| **West Bengal** | **53.5 per cent** |
| All States | 42.2 per cent |
| Non-NEH States | 39.9 per cent |

My computed Bihar figure for FY2022-23 (72.12 per cent) and the Commission's published FY2023-24
figure (72.3) agree to within 0.2 points, which is a useful cross-check that the two instruments are
measuring the same thing on the same basis (both trace to the Finance Accounts).

**Own tax as a share of GSDP, FY2023-24** (FC-16 Figure 5.8, "States' Finance Accounts"): Bihar
**5.6**, West Bengal **5.4**, Tamil Nadu **6.6**, Uttar Pradesh **7.6**, non-NEH states **6.8**.
FC-16 para 5.43 makes the point explicitly and it cuts against the simple story: "the
own-tax-to-GSDP ratio does not depend in any systematic manner on per capita income… both Bihar and
West Bengal have had consistently lower own tax-GSDP ratio than Uttar Pradesh. Even Tamil Nadu and
Karnataka… achieve a significantly lower own-tax-to-GSDP ratio than Uttar Pradesh."

**This is the number that makes the cesses question bite.** A cess or surcharge does not enter the
divisible pool. Bihar draws **72 per cent** of its revenue from the pool and grants; West Bengal
**53.5 per cent**; the all-state average **42.2**. A one-rupee shift from a shareable tax to a cess
therefore costs Bihar roughly 1.7 times what it costs the average state and roughly 1.35 times what
it costs West Bengal, before any horizontal-share effect. Forward-referenced to part 03.

### 10. GST from the consuming side

**Largely unretrieved and bounded away — part 01 owns GST.** What is established here: the
compensation guarantee protected each state's revenue at a **14 per cent** compound growth rate over
the base year **FY2015-16**, and ran the five years from 1 July 2017 to 30 June 2022 (PIB 1842755,
located; the constitutional hook is section 18 of the Constitution (One Hundred and First Amendment)
Act 2016). **Bihar's own SGST and IGST-settlement position, its compensation receipts, and its
post-June-2022 revenue gap were NOT retrieved** and are not asserted. The one Bihar-specific datum
retrieved is indirect: Bihar's own-tax-to-GSDP ratio was 5.6 per cent in FY2023-24, and FC-16 observes
that own-tax ratios "vary significantly across States even seven years after the implementation of
GST" (para 5.42) — which is the Commission declining to credit GST with convergence.

### 11. State finances — Bihar

From FC-16 Vol. I ch. 5 (T1, States' Finance Accounts), FY2023-24:
- Fiscal deficit **4.1 per cent of GSDP**; revenue balance **−0.3** (i.e. a small surplus as the
  Commission signs it: revenue deficit of −0.3); outstanding liabilities **37.0 per cent of GSDP**
  (internal debt 27.2, **loans from the Union 3.8** — the highest Union-loan component among the
  large non-NEH states except Madhya Pradesh's 3.9 — public account 6.1).
- Total expenditure **26.3 per cent of GSDP** (revenue 21.9, capital 4.4) — the highest total
  expenditure-to-GSDP ratio of any non-NEH state.
- Commission's narrative (para 5.57): debt-to-GSDP 28.3 per cent in FY2011-12, peaking at 40.6 in
  FY2020-21 and 37.0 in FY2023-24; "Until 2018-19, Bihar exhibited substantial revenue surpluses,
  allowing it to undertake substantial capital expenditures. However, the situation has deteriorated
  since the post-COVID years, with revenue balance turning negative and fiscal deficit spiking. The
  latter stood at 5.9 per cent in 2022-23 and 4.1 per cent in 2023-24."
- And the Commission's own framing of Bihar's position, which is the strongest statement of Bihar's
  case in a non-party document (para 5.57): "Bihar has the lowest per capita income in India. Its
  high debt-to-GSDP ratio can be partially viewed as an artefact of its low GSDP. Yet, insofar as the
  same low per capita GSDP determines the State's capacity to raise its own tax revenues, and it
  depends heavily on FC devolution and Union grants for additional revenues, the high debt-GSDP ratio
  is of concern."

**Bihar's own budget documents were NOT retrieved** (§9). Nothing here rests on a Bihar government
publication.

---

## What L-0040 and L-0108 already cover

Both were read in full from `data/ledger/`. This section is mandatory and precise, so the authoring
stage amends rather than duplicates.

### L-0040 — "MGNREGA under an inheriting government" (`data/ledger/welfare.json`)

`date` 2014-05 → `dateEnd` 2026-03, `term` T1, `domains` [welfare, employment, federalism],
`type` episode, `assessment` contested, `confidence` high, `asOf` 2026-07-31.
`seriesRefs` [`mgnrega-persondays`], `provenanceRefs` [P-28], sources: LibTech India (T4) only.

**What it already covers:** the national arc — 2,923 crore person-days FY2014-15→FY2024-25 against
~1,660 crore in the preceding eight years; the FY2020-21 peak of 389 crore person-days and >₹1.1
trillion; 7.8 crore households at 100 days; chronic under-budgeting and mid-year revision; the
FY2024-25 ₹9,860 crore deficit by January 2025 and the absence of a revised allocation; ABPS made
compulsory January 2024; ~1.46 crore workers net-deleted in FY2023-24; FY2024-25 registrations +8.6
per cent against delivery −7.1 per cent; the February 2015 "living monument" remark. It carries one
`unmeasured` entry: work demanded but not recorded, `not-collected`.

**What it already says about West Bengal — one sentence, and it is imprecise:**
> "West Bengal's funds have been suspended since 2022."

and one clause in `caseAgainst`:
> "suspending an entire state's funds for four years turns a statutory entitlement into a
> discretionary transfer."

**Therefore the amendment this part supports, and the two errors it fixes:**
1. **The date.** "since 2022" should become **9 March 2022**, on the Union's own statement in Lok
   Sabha Unstarred Question No. 254 of 5 December 2023, with the section 27 hook named.
2. **"for four years" is now wrong as a closed statement.** The Calcutta High Court directed
   implementation from 1 August 2025 and the Supreme Court dismissed the Union's challenge on
   27 October 2025 — both **T4 here** — so the record must either state the stoppage as running
   9 March 2022 to (at least) mid-2025, or say the terminus is unretrieved. It should not carry a
   bare "four years".
3. **Nothing in L-0040 carries the Union's case.** The record's `caseFor` is entirely about national
   retention and ABPS. The section 27 case — 19 districts investigated 2019-2022, works not present,
   splitting of works, misappropriation, an ATR demanded and refused, a statutory power that exists
   precisely for this — is **absent**, and the record's `assessment: contested` is presently supported
   on one side only for this element.
4. **L-0040 has no Union-figure series at all** — its only `seriesRefs` entry is
   `mgnrega-persondays`. The by-state release table (Annexure-II, LSUQ 254) is a new instrument for it.

**No duplicate record should be written for the West Bengal stoppage.** It belongs in L-0040 as an
amendment plus, arguably, its own `event` record for the section 27 action and the litigation. The
phase must decide which; **this part recommends a separate record for the section 27 action and the
court proceedings** (a discrete, dated, adjudicated event with two named parties), with L-0040
amended to point at it, because folding a four-year state-specific stoppage into a national
eleven-year episode buries it.

### L-0108 — "The West Bengal teacher-recruitment panel annulled…" (`data/ledger/education.json`)

`date` 2016 → `dateEnd` 2025-04-03, `term` T1, `domains` [governance, federalism, education],
`type` event, `assessment` failed, `confidence` high, `asOf` 2026-08-02.
`seriesRefs` [`teacher-vacancy-rate-ssa`], `provenanceRefs` [P-64]. Sources: 2025 INSC 437 (T1),
the Public Examinations (Prevention of Unfair Means) Act 2024 (T1 ×2).

**What it already covers:** the Supreme Court's 3 April 2025 judgment upholding the Calcutta High
Court's 22 April 2024 judgment setting aside the entire 2016 West Bengal Central School Service
Commission selection; the findings of fact (OMR destruction by executive decision of 22 July 2019,
no mirror images, purportedly scanned sheets supplied 2018-2023 with none on the server, appointments
beyond declared vacancies in all four categories, appointments off-panel and after panel expiry,
blank OMR sheets, merit list never published, beneficiaries unidentified, supernumerary posts sought);
the remedy falling on untainted candidates with re-sit and age relaxation; and — the record's
distinctive contribution — that the Public Examinations (Prevention of Unfair Means) Act 2024's
Schedule names six central authorities and **no state body**, so the central law reaches none of the
listed state teacher-examination failures including **Bihar TRE-3**. Two `unmeasured` entries, both
`not-collected`. A `caveat` refusing the widely quoted 25,753 figure.

**Its relation to this part.** L-0108 is a *federal-competence* record about West Bengal, not a
*fiscal-federalism* record. It shares only the subject state. **It should NOT be amended by this
part** except possibly to cross-reference, and this part writes nothing that duplicates it.
Two contact points worth noting for the authoring stage:
- L-0108 already establishes the pattern "a Union instrument does not reach a state process". This
  part establishes the converse: a Union instrument (section 27) reaching *all the way into* a state
  process. The two together are the clean statement of the federal boundary being asymmetric —
  **the Union's enforcement reach is weakest where it legislates and strongest where it pays.** That
  is a candidate finding for the phase's synthesis and it is not currently anywhere in the corpus.
- L-0108 names **Bihar TRE-3** in its list. This part's Bihar record must not restate that.

---

## Candidate series

House precedent for state-specific ids: `jk-xiv-fc-panchayat-grants-allocated`. State prefix, then
subject.

| proposed id | name | exact unit string | calendar | period | retrieved points | breaks | instrument |
|---|---|---|---|---|---|---|---|
| `wb-mgnrega-funds-released` | MGNREGA central funds released to West Bengal | `₹ crore` | FY | FY2020-21→FY2022-23 | FY2020-21 **11454.05**; FY2021-22 **7507.80**; FY2022-23 **0.00** | FY2022-23: section 27 stoppage from 9 Mar 2022 — the zero is an administrative act, not a demand signal | PIB / Lok Sabha Unstarred Q. No. 254, 5 Dec 2023, Annexure-II (T1). Source table is in ₹ lakh; conversion mine |
| `bihar-mgnrega-funds-released` | MGNREGA central funds released to Bihar | `₹ crore` | FY | FY2020-21→FY2022-23 | 7284.24; 5407.37; 6395.29 | none | same table |
| `tn-mgnrega-funds-released` | MGNREGA central funds released to Tamil Nadu | `₹ crore` | FY | FY2020-21→FY2022-23 | 8788.82; 9638.13; 9706.62 | none | same table — **hand to part 06** |
| `wb-mgnrega-new-jobcards` | New MGNREGA job cards issued in West Bengal | `job cards` | FY | FY2020-21→FY2022-23 | 1682297; 825225; 214953 | none in the source; the FY2022-23 fall coincides with the stoppage and the series cannot separate cause | same answer, Annexure-I (T1) |
| `bihar-mgnrega-new-jobcards` | New MGNREGA job cards issued in Bihar | `job cards` | FY | FY2020-21→FY2022-23 | 2386693; 2668111; 1137336 | none | same |
| `bihar-fc-interse-share` | Bihar's inter-se share of the states' share of central taxes | `per cent of states' share` | award | FC-XI→FC-XVI | 14.60; 11.03; **10.917**; **9.665**; **10.058**; **9.948** | FC-XIII→FC-XIV: criterion changes from fiscal capacity distance to income distance. FC-XIV→FC-XV: population base 1971→2011. FC-XV→FC-XVI: new "contribution to GDP" criterion. FC-XV excludes J&K | FC-13 Table 8.2; FC-14 Table 8.2; FC-15 Vol. I Table 6.5; FC-16 Vol. I Tables 8.4 and 8.9 (all T1, retrieved) |
| `wb-fc-interse-share` | West Bengal's inter-se share | `per cent of states' share` | award | FC-XI→FC-XVI | 8.12; 7.06; **7.264**; **7.324**; **7.523**; **7.215** | same | same |
| `tn-fc-interse-share` | Tamil Nadu's inter-se share | `per cent of states' share` | award | FC-XI→FC-XVI | 5.39; 5.31; **4.969**; **4.023**; **4.079**; **4.097** | same | same — **hand to part 06** |
| `bihar-devolution-population-ratio` | Bihar's devolution share divided by its population share | `ratio` | award | FC-XI→FC-XV | 1.78; 1.35; 1.25; 1.11; 1.15 | denominator changes: 2001 census for FC-XI/XII, 2011 for FC-XIII/XIV/XV (stated in the source note) | FC-16 Vol. I Table 8.5 (T1). **Published by the Commission, not derived by me** |
| `wb-devolution-population-ratio` | West Bengal's devolution/population ratio | `ratio` | award | FC-XI→FC-XV | 1.03; 0.89; 0.95; 0.95; 0.98 | same | same |
| `tn-devolution-population-ratio` | Tamil Nadu's devolution/population ratio | `ratio` | award | FC-XI→FC-XV | 0.87; 0.86; 0.82; 0.66; 0.67 | same | same — **hand to part 06** |
| `fc-income-distance-weight` | Weight on the equity criterion in the horizontal formula | `per cent of formula weight` | award | FC-XIII→FC-XVI | 47.5; 50; 45.0; 42.5 | **FC-XIII's 47.5 is fiscal capacity distance, a DIFFERENT criterion; FC-XVI's 42.5 is "per capita GSDP distance"**. If the series is authored it must be named for the slot, not the criterion, and carry the break | FC-13 Table 8.1; FC-14 Table 8.1; FC-15 Table 6.4; FC-16 Table 8.8 (T1) |
| `fc-vertical-devolution-share` | States' share of the divisible pool | `per cent of divisible pool` | award | FC-XIII→FC-XVI | 32; 42; 41; 41 | FC-XV's 41 is FC-XIV's 42 with J&K removed from the denominator, not a reduction (FC-15 para 6.9) | FC-14 para 8.13; FC-15 paras 6.9/6.29; FC-16 para 7.68 (T1) — **hand to part 02** |
| `bihar-own-tax-revenue` | Bihar own tax revenue | `₹ crore` | FY | FY2018-19→FY2022-23 | 29408; 30158; 30342; 34855; 44018 | none stated | CAG, SFAR Bihar FY2022-23 (Report No. 1 of 2024), Table 2.3, sourced to Finance Accounts (T1) |
| `bihar-revenue-receipts` | Bihar total revenue receipts | `₹ crore` | FY | FY2018-19→FY2022-23 | 131794; 124233; 128168; 158797; 172688 | none stated | same |
| `bihar-grants-in-aid-from-union` | Grants-in-aid from the Union to Bihar | `₹ crore` | FY | FY2018-19→FY2022-23 | 24652; 26969; 31764; 28606; 29025 | none stated | same |
| `bihar-gsdp-current` | Bihar GSDP at current prices, 2011-12 series | `₹ crore` | FY | FY2018-19→FY2022-23 | 527976; 581855; 567263; 650302; 751396 | 2011-12 base series | same (CAG cites MoSPI) |
| `bihar-own-tax-share-revenue-receipts` | Bihar own tax revenue as a share of revenue receipts | `per cent of revenue receipts` | FY | FY2018-19→FY2022-23 | 22.31; 24.28; 23.67; 21.95; 25.49 | none | **DERIVED by me from the two CAG series above; must be flagged as computed, not published** |
| `wb-own-tax-revenue` | West Bengal own tax revenue | `₹ crore` | FY | FY2016-17→FY2020-21 | 45466; 52721; 60732; 60669; 60287 | none stated | CAG, SFAR West Bengal FY2020-21 (Report No. 1 of 2022), Table 2.3, sourced to Finance Accounts (T1) |
| `wb-revenue-receipts` | West Bengal total revenue receipts | `₹ crore` | FY | FY2016-17→FY2020-21 | 117832; 131270; 145975; 142914; 148394 | none stated | same |
| `wb-share-union-taxes` | West Bengal's share of Union taxes and duties | `₹ crore` | FY | FY2016-17→FY2020-21 | 44625; 49321; 55776; 48048; 44737 | none stated | same — **published as a separate line for WB; the Bihar table does NOT print it, which is a table-shape difference between two CAG reports** |
| `wb-grants-in-aid-from-union` | Grants-in-aid from the Union to West Bengal | `₹ crore` | FY | FY2016-17→FY2020-21 | 24791; 26111; 25810; 30984; 38172 | none stated | same |
| `wb-gsdp-current` | West Bengal GSDP at current prices, 2011-12 series | `₹ crore` | FY | FY2016-17→FY2020-21 | 872527; 974700; 1102283; 1207823; 1301017 | 2011-12 base | same |
| `wb-own-tax-share-revenue-receipts` | West Bengal own tax revenue as a share of revenue receipts | `per cent of revenue receipts` | FY | FY2016-17→FY2020-21 | 38.59; 40.16; 41.60; 42.45; 40.63 | none | **DERIVED by me; flag as computed** |
| `state-reliance-union-transfers` | Reliance on devolution and grants as a share of revenue receipts | `per cent of revenue receipts` | FY | FY2023-24 (one point per state) | Bihar 72.3; Uttar Pradesh 55.5; West Bengal 53.5; all States 42.2; non-NEH 39.9 | single year | FC-16 Vol. I para 5.46, sourced to States' Finance Accounts (T1). **Published, not derived** |
| `state-own-tax-gsdp` | Own tax revenue as a share of GSDP | `per cent of GSDP` | FY | FY2023-24 (one point per state) | Bihar 5.6; West Bengal 5.4; Tamil Nadu 6.6; Uttar Pradesh 7.6; non-NEH 6.8 | single year | FC-16 Vol. I Figure 5.8 (T1) |
| `state-outstanding-liabilities-gsdp` | Outstanding liabilities as a share of GSDP | `per cent of GSDP` | FY | FY2023-24 (one point per state) | West Bengal 38.3; Bihar 37.0; Tamil Nadu 29.9; non-NEH 28.0; Punjab 42.9 | single year | FC-16 Vol. I Table 5.11 (T1) |
| `state-fiscal-deficit-gsdp` | Gross fiscal deficit as a share of GSDP | `per cent of GSDP` | FY | FY2023-24 (one point per state) | West Bengal 3.3; Bihar 4.1; Tamil Nadu 3.6; non-NEH 3.0 | single year | FC-16 Vol. I Table 5.11 (T1) |
| `state-total-expenditure-gsdp` | Total expenditure as a share of GSDP | `per cent of GSDP` | FY | FY2023-24 (one point per state) | Bihar 26.3; West Bengal 15.3; Tamil Nadu 14.1; non-NEH 16.2 | single year | FC-16 Vol. I Table 5.10 (T1) |
| `bihar-css-state-share-not-transferred` | Bihar state share of centrally sponsored schemes not transferred to Single Nodal Accounts | `₹ crore` | FY | FY2022-23 (one point) | 2258.37 | single year; the SNA regime itself begins with MoF letter 1(13)PFMS/FCD/2020 of 23 Mar 2021, so no pre-FY2021-22 comparator exists on this basis | CAG, SFAR Bihar FY2022-23, para 4.21(ii) (T1) |

**Denominator note (rule 5).** Every ratio proposed here uses **revenue receipts** or **GSDP**, never
national GDP. That is deliberate: it is the meaningful denominator for this subject and it sidesteps
the GDP-base problem entirely.

---

## Candidate ledger records

**LR-A — "West Bengal's MGNREGA money stopped under section 27, and the four-year argument about
what was owed."** `type` episode. `date` 2022-03-09 → `dateEnd` open (2025-10-27 if the Supreme
Court order is confirmed at T1; otherwise open). `term` T2/T3 spanning. `domains` [federalism,
welfare, employment, governance]. `assessment` **contested**, and `differentFacts: false` — the two
cases weight the same facts differently (§Findings — WB, 2). Carries: the 9 March 2022 date and the
statutory hook; the ₹0.00 release for FY2022-23 against ₹11,454.05 crore two years earlier; the
three Union pending-liability figures and why they are three quantities; the Union's 19-district
finding and the ATR sequence; the state's dues claim and its definitional basis; the 87 per cent fall
in new job cards. **Must state on its face that the section 27 order was not retrieved.**
**Bound against L-0040 — amend L-0040 to point here rather than restate.**

**LR-B — "Bihar's Contingency Fund as a matching-share facility."** `type` event/pattern.
`date` 2022-04-01 → `dateEnd` 2023-03-30. `domains` [federalism, macro-fiscal, governance].
`assessment` — recommend **contested** rather than `failed`: the Union's design intent (states
co-own schemes so they choose well) and the CAG's finding (the state could not budget its share and
used a constitutional emergency instrument for a foreseeable recurring liability) are both defensible
on the same facts. Carries: the ₹350 crore → ₹9,500 crore enlargement and its stated purpose in the
CAG's words; the ₹2,258.37 crore state share not transferred; the 181-day transfer lag; the 52 per
cent of withdrawals the CAG found were for foreseeable expenditure. **This is the record that stops
the phase carrying only the contributor states' case.**

**LR-C — "Three numbers for the same money: PFMS released, Treasury received, agency got."**
`type` finding. `date` 2023-03-31. `domains` [federalism, governance]. `assessment` — recommend
**not-assessed / analytical**, or `contested` if the schema requires an assessment. Carries the
₹24,398.36 / ₹22,481.46 / ₹22,231.91 crore triple from CAG SFAR Bihar FY2022-23 para 4.21(iv) and
the general point that "released" is not "received" is not "passed on". **This is the record the
disciplining-measure finding hangs on and it is the most reusable thing in this part.**

**LR-D — "The formula's beneficiary is not the state that complains loudest about the formula."**
`type` finding. `date` 2025-12 (FC-XVI report) with a series back to FC-XI. `domains` [federalism].
`assessment` **not-assessed / analytical**. Carries FC-16 Tables 8.4 and 8.5: West Bengal at 0.95-0.98
of its population share under three successive Commissions while Bihar falls 1.78→1.15 and Tamil Nadu
falls 0.87→0.67. **The point of the record is the separation of the devolution dispute from the
conditionality dispute, which is this part's assignment.**

**LR-E — "Special category status: abolished by a Commission, refused by a Ministry, replaced by a
list of project costs."** `type` episode. `date` 2015-02 (FC-XIV report) → 2024-07-23 (Budget speech).
`domains` [federalism, macro-fiscal]. `assessment` **contested**. Carries FC-XIV para 2.29 verbatim;
the Union's "case is not made out" position (**T4 — must be marked, or the record waits for the
answer PDF**); and the FY2024-25 Budget speech's Bihar paragraphs with the explicit note that
₹26,000 / ₹21,400 / ₹11,500 crore are **project costs, not transfers**, contrasted with the Andhra
Pradesh paragraph's stated ₹15,000 crore in a stated year under a statute.

**Amendment to L-0040** (not a new record): see §"What L-0040 and L-0108 already cover", items 1-4.

**No amendment to L-0108** beyond an optional cross-reference.

---

## Candidate provenance records

**PR-α — The Union's by-state MGNREGA release table, and what a zero in it means.**
The instrument is Annexure-II to Lok Sabha Unstarred Question No. 254 of 5 December 2023. What
changed: nothing in the table's construction — the change is in the *world* it measures, and that is
precisely the difficulty. A zero in a release table normally means no demand or no claim; here it
means a statutory power was exercised. **A series built on this table cannot distinguish the two from
the table alone**, and every reading of it must carry the section 27 fact externally. Also record: the
table is published in **₹ lakh**, not ₹ crore, and the unit is *funds released*, not *funds allocated*
and not *expenditure incurred*.

**PR-β — RBI's *State Finances: A Study of Budgets* is a common basis, not independent evidence.**
**STATUS: NOT ESTABLISHED IN THIS PART.** The RBI publication was assigned to a subagent that could
not be launched (concurrency ceiling) and was not retrieved by me. The proposition to be tested —
that RBI compiles from the states' own budget documents and therefore cannot corroborate them — is
**stated as a hypothesis and must not be authored until the methodology note is read.** What this part
*can* say is the contrast that makes the question sharp: **the Sixteenth Finance Commission sources
its state-finance chapter to "States' Finance Accounts"** (the CAG-compiled accounts), not to budget
documents — so at least one major compilation uses the audited base. That is retrieved and quotable.

**PR-γ — The Finance Commission publishes the formula and the result but not the decomposition.**
Every Commission from FC-XIII to FC-XVI publishes the criteria, the weights, the method per criterion
and the final inter-se shares. **None publishes the state × criterion share matrix.** FC-XVI's
Technical Note names the object — C(i,j), "the share of State j in the part of the States' portion of
the divisible pool disbursed based on criterion i" — and does not print it. The consequence for this
phase: **the sentence "Bihar gains X per cent from income distance" cannot be sourced to any Finance
Commission report** and any figure of that shape in circulation is somebody's reconstruction.
`not-published`.

**PR-δ — Two CAG State Finances Audit Reports of two states print different rows in "the same" table.**
The Bihar SFAR FY2022-23 Table 2.3 prints Revenue Receipts, Own Tax, Non-Tax, Grants-in-aid from GoI
and GSDP — **and does not print the state's share of Union taxes as a line**, which must be taken as a
residual. The West Bengal SFAR FY2020-21 Table 2.3 **does** print it. Two reports by the same
constitutional auditor, on the same template, differ in what they expose. This is not an error; it is
a warning that cross-state series built from SFARs are not automatically like-for-like.

**PR-ε — The date of the West Bengal stoppage: two dates, two events, one conflation.**
26 December 2021 (last wage instalment, T4), 8/9 March 2022 (the Union's own date for the stoppage of
release under section 27, T1), March 2022 (stoppage of issuing work, T4). The stage-1 scope note
carried "December 2021". The Union's own T1 statement says **9 March 2022**. Record the correction
and the reason, so the earlier date is not silently propagated.

---

## Absences

Each is classified. **The two senses of "withheld" are kept apart throughout: money withheld from a
state is not data withheld from the public, and only the second can produce a `withheld` record.**

**A1. The section 27 order itself — `not-published`.** No Ministry of Rural Development order or
letter to the Government of West Bengal invoking section 27 was located on `nrega.nic.in` or
`rural.gov.in`. The Union describes the order in Parliament; it does not publish it. **This is
`not-published`, NOT `withheld`** — no named requester, no specific request, no date is established,
and without all three the definition is not met.

**A2. The state × criterion decomposition of Finance Commission devolution — `not-published`.** See
PR-γ. The Commission computes it (it is the arithmetic of its own formula) and does not print it.

**A3. Per-capita central tax contributed by state — `never-defined`.** There is no agreed definition
of a state's "contribution" to central tax revenue: corporate tax follows the registered office, GST
follows destination, customs follow the port. No Union publication retrieved attributes collection to
a state of economic origin. The quantity that drives the loudest claim in the whole federalism
argument has **no definition**, and that is a stronger finding than "not collected".

**A4. West Bengal's active MGNREGA workers at the date of stoppage — `not-collected` (here).** The
MGNREGA MIS holds active-worker counts; I did not retrieve a dated figure for 8/9 March 2022. This is
a retrieval gap in this part, not an absence in the world. **Marked as unretrieved, not as an
absence record.**

**A5. Whether the FY2024-25 Budget's Bihar announcements were disbursed — unretrieved.** Not
classified as an absence: no sweep behind it. The correct next instrument is the Union Budget's
scheme-wise Detailed Demands for Grants and the Ministry of Road Transport / Power / Jal Shakti
annual reports, none of which was searched.

**A6. The Union Budget's Expenditure Profile no longer carries a by-state transfer statement —
`not-published`, and this one is checkable.** In the Expenditure Profile 2026-2027 (retrieved,
`indiabudget.gov.in/doc/eb/vol1.pdf`, Contents, Part II — States), **Statement 18, "Transfer of
Resources to States and Union Territories with Legislature", is ONE PAGE (p. 215) and is entirely
aggregate** — Devolution, Some Important Items of Transfer, Finance Commission Grants, Transfers under
CSS/CS, Transfer to Delhi/Puducherry/J&K, Grand Total. **There is no state-wise breakdown anywhere in
Part II.** Statement 19 is Externally Aided Projects; Statement 20 is grants to foreign governments.
`Budget at a Glance` statement `bag3.pdf` reproduces the same aggregate. **So the Centre's own annual
by-state transfer ledger — the instrument the brief named as a disciplining-measure candidate — is
not in the current Union Budget.** I could not confirm whether it was present in earlier budgets: the
archived expenditure-profile index pages for FY2016-17 and FY2019-20 returned empty. **Classified
`not-published` for the current budget; the "was it ever published" question is unresolved and is the
single highest-value follow-up in this part.**

**A7. Bihar's surrender or forfeiture of a Union allocation for want of matching share — NOT
ESTABLISHED, corpus verified live, sweep incomplete.** See §Findings — Bihar, 8. Positive control
stated. **Do not author this as `not-collected` and do not author it as "never happened".**

**A8. West Bengal's and Bihar's own budget documents — unretrieved, host-level failure.** See §9.
Not an absence in the world; the documents exist. But it has a real consequence for this part: **the
state side of both ledgers rests entirely on the CAG and the Finance Commission**, i.e. on Union
constitutional institutions reading state accounts, with no state-published cross-check. That is
worth saying out loud in any record that uses these figures.

**A9. The branding instruction — `not-published`.** The Union complains publicly about a state
renaming a scheme; the instruction that makes renaming a breach was not located. Same reasoning as A1:
`not-published`, not `withheld`.

---

## Sources retrieved

Party-to-the-dispute status is stated on every one.

1. **Sixteenth Finance Commission, Report for 2026-31, Volume I — Main Report.**
   `https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/reports/Vol1-Main-Report.pdf`
   **T1.** Read: Contents; ch. 5 paras 5.41-5.57 and Tables 5.10, 5.11, Figures 5.8, 5.10 (state
   own-tax/GSDP, reliance on transfers, expenditure, deficit and debt for FY2023-24, sourced by the
   Commission to States' Finance Accounts); ch. 7 para 7.68 (vertical share retained at 41 per cent);
   ch. 8 paras 8.68-8.72, 8.90-8.97, Tables 8.4, 8.5, 8.8, 8.9 and the Technical Note.
   **Party status: a constitutional body appointed by the President on the Union's Terms of Reference,
   adjudicating between the Union and the states. Not neutral in the sense of being outside the
   dispute — its ToR are the Union's — but not a party's advocate either.** Treat as the closest thing
   to an umpire in the fiscal dispute and say so, rather than as an independent third party.
2. **Fourteenth Finance Commission Report.**
   `https://fincomindia.nic.in/asset/doc/commission-reports/14th-FC/14thFCReport.pdf`
   **T1.** Read: para 2.29 (no distinction between special and general category states); paras
   8.13 (42 per cent, with the cesses-and-surcharges consideration), 8.23-8.30 (population base 1971 at
   17.5, 2011 at 10, area, forest, income distance at 50), Tables 8.1, 8.2, 8.3; Prof. Abhijit Sen's
   Note of Dissent. Same party status as 1.
3. **Thirteenth Finance Commission Report, Chapter 8 (Sharing of Union Tax Revenues).**
   `https://fincomindia.nic.in/asset/doc/commission-reports/13th-FC/english/Chapter8.pdf`
   **T1.** Read: paras 8.26-8.41, Tables 8.1 (criteria and weights: population 1971 25.0, area 10.0,
   fiscal capacity distance 47.5, fiscal discipline 17.5), 8.2 (inter-se shares), 8.3, 8.4 (average
   devolution as a percentage of GSDP: Bihar 19.44, West Bengal 3.67, Tamil Nadu 2.58 under FC-XIII).
   Same party status.
4. **Fifteenth Finance Commission, Report for 2021-26, Volume I — Main Report.**
   `https://fincomindia.nic.in/asset/doc/commission-reports/XVFC%20VOL%20I%20Main%20Report.pdf`
   **T1.** Read: paras 6.9-6.10, 6.29, 6.43-6.53, 6.57-6.58 and Tables 6.3, 6.4, 6.5. Same party status.
   (Volume II Annexes downloaded to `fc15v2.pdf`; not read in detail — the per-criterion input tables
   are there and are the route to any decomposition attempt.)
5. **PIB / Ministry of Rural Development, "Status of MGNREGS Jobcards and Funds Due for Allocation in
   West Bengal", 5 December 2023 — carrying the text and both Annexures of Lok Sabha Unstarred
   Question No. 254 of 5 December 2023, answered by MoS Sadhvi Niranjan Jyoti.**
   `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1982799`
   **T1.** Read: the 9 March 2022 / section 27 sentence; the ₹5,553 crore pending liability sentence;
   Annexure-I (new job cards by state, three years) and Annexure-II (funds released by state, three
   years, ₹ lakh) in full.
   **PARTY: this is the Union Government, a party to the dispute, stating its own release figures.**
   Retrieval note (M1 mode iii): PIB returns 302 to a bare `curl`; retrieved with `-L`, a browser
   user-agent and a cookie jar.
6. **PIB / Ministry of Rural Development, "Central Government rejects allegations of West Bengal
   Government on discrimination in rural development schemes", 2 October 2023 (Minister Giriraj
   Singh).** `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1963198`
   **T1** as evidence of the Union's stated case; the *figures inside it* are the Union's own and
   uncorroborated. Read: the UPA/NDA scheme table in full; the "25 lakh fake MNREGA job cards"
   allegation; the ATR sequence; the "Bangla Awas Yojana" renaming complaint.
   **PARTY: the Union, and this is explicitly an advocacy document — it is a rebuttal press
   conference. Grade its figures accordingly.**
7. **PIB / Ministry of Rural Development, "'The central government has given more than ₹1.10 lakh
   crore for the development of West Bengal' — Shri Shivraj Singh Chouhan", 4 August 2025.**
   `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2152391`
   **T1** as evidence of the Union's case. Read: the 19-districts/2019-2022 investigation sentence
   with the three named categories of irregularity; the section 27 sentence; the scheme-wise
   cumulative figures for West Bengal since FY2014-15. **PARTY: the Union, advocacy framing.**
8. **PIB / Ministry of Rural Development, "Beneficiaries of Pradhan Mantri Awas Yojana (Rural)",
   21 March 2025 (Lok Sabha written answer).**
   `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2113753`
   **T1.** Read: the state-wise PMAY-G target/completed table as at 17 March 2025 (West Bengal
   45,69,423 / 34,19,193; Bihar 44,92,010 / 37,22,797) and the monitoring-mechanism description.
   **PARTY: the Union.**
9. **PIB / Ministry of Rural Development, "Funds for Construction of Houses under PMAY-G",
   11 February 2025 (Lok Sabha written answer).**
   `https://www.pib.gov.in/PressReleasePage.aspx?PRID=2101871`
   **T1.** Read: unit assistance ₹1.20 lakh plain / ₹1.30 lakh NE and hilly, the MGNREGS convergence
   of 90/95 person-days, SBM-G toilet support ₹12,000, the FY2024-25→FY2028-29 continuation.
   **No West Bengal-specific release figure in it.** **PARTY: the Union.**
10. **Union Budget FY2024-25, Budget Speech of 23 July 2024.**
    `https://www.indiabudget.gov.in/budget2024-25/doc/budget_speech.pdf`
    **T1.** Read: paras 29-36 (Purvodaya; Bihar roads ₹26,000 crore; power ₹21,400 crore; the
    multilateral-assistance sentence; and, adjacent, the Andhra Pradesh Reorganisation Act paragraphs
    with ₹15,000 crore in the current financial year), para 83 (flood/irrigation ₹11,500 crore), paras
    89-91 (temple corridors, Rajgir, Nalanda). **PARTY: the Union.**
11. **Union Budget FY2026-27, Expenditure Profile — Statement 18 and the Expenditure Profile
    Contents.** `https://www.indiabudget.gov.in/doc/eb/stat18.pdf` and
    `https://www.indiabudget.gov.in/doc/eb/vol1.pdf`
    **T1.** Read: Statement 18 in full (aggregate transfers, FY2024-25 Actuals through FY2026-27 BE,
    grand total ₹9,38,628.46 crore Actuals FY2024-25); the Contents pages of the Expenditure Profile
    establishing that Part II — States contains Statements 18-21 and **no state-wise transfer
    statement**. Also `doc/eb/stat5.pdf` (Transfers to UTs with Legislature, checked and not the
    state ledger), `doc/eb/stat17.pdf`, `doc/eb/stat19.pdf`, `doc/eb/stat20.pdf`,
    `doc/Budget_at_Glance/bag3.pdf`. **PARTY: the Union, publishing its own transfer accounts.**
12. **CAG, State Finances Audit Report, Government of Bihar, for the year ended 31 March 2023
    (Report No. 1 of 2024).**
    `https://cag.gov.in/webroot/uploads/download_audit_report/2024/State-Finance-Report-2022-23-(ENGLISH)-066a229e6b84881.48517440.pdf`
    **T1.** Read: Table 2.3 (trends in revenue receipts, five years, sourced to Finance Accounts and
    MoSPI); the Single Nodal Agency passage at p. 33; para 3.4.7 (Contingency Fund corpus ₹350 crore →
    ₹9,500 crore and its stated purpose; 116 withdrawals of ₹6,395.47 crore; 15 withdrawals of
    ₹3,327.42 crore for foreseeable expenditure); para 4.21(i)-(vii) (SNA audit, including the
    ₹2,258.37 crore state share not released, the 181-day transfer lag, and the
    ₹24,398.36 / ₹22,481.46 / ₹22,231.91 crore triple).
    **PARTY: the CAG is a Union constitutional office auditing a state government. It is a party to
    NEITHER side of the Centre-state fiscal dispute, and it is the only instrument in this part that
    reads both sides' books. But note the asymmetry: it is appointed under the Union Constitution and
    reports to the state legislature — so a state that wished to contest its characterisations has a
    forum, and none was found.**
13. **CAG, State Finances Audit Report, Government of West Bengal, for the year ended 31 March 2021
    (Report No. 1 of 2022).**
    `https://cag.gov.in/uploads/subsite_whats_new/Report-No-1-of-2022-State-Finances-Audit-Report-Government-of-West-Bengal-of-2020-21-0624434d4dc9868-21501088.pdf`
    **T1.** Read: para 2.5.1 and Table 2.3 (trends in revenue receipts, five years FY2016-17→FY2020-21,
    with the state's share of Union taxes printed as a separate line, sourced to Finance Accounts and
    MoSPI dated 2 August 2021), and the narrative bullets following it. Same party status as 12.
14. **Sixteenth Finance Commission report landing pages and the Finance Commission repository index.**
    `https://fincomindia.nic.in/commission-reports`, `/commission-reports-sixteenth`,
    `/commission-reports-fifteenth`, `/commission-reports-fourteenth`, `/commission-reports-thirteenth`
    **T1.** Read: to enumerate the available report PDFs, including the FC-XV commissioned study
    **"Cesses and Surcharges"** and the FC-XV state evaluation study **"STATE OF WEST BENGAL"**
    (both downloaded, neither read — flagged for parts 03 and any follow-up).
15. **`data/ledger/welfare.json` (L-0040) and `data/ledger/education.json` (L-0108)**, read in full
    from the repository. Not sources about the world; sources about the instrument.

---

## Sources NOT retrieved

**Calcutta High Court, Paschim Banga Khet Mazdoor Samity v. Union of India, WPA(P) 237 of 2023, order
of 18 June 2025 (CJ T. S. Sivagnanam and Chaitali Chatterjee (Das) JJ).**
**HARD STOP, and the reason is a rule, not a failure.** M1 modes tried: (i) resolver —
`calcuttahighcourt.gov.in` resolves to 202.61.117.204 at 1.1.1.1 and serves 200 to `curl`;
(ii) fresh process — same; (iii) client — headless browser (playwright) loaded
`https://www.calcuttahighcourt.gov.in/highcourt_order_search` successfully. **The search form requires
a CAPTCHA.** Completing or bypassing a CAPTCHA is prohibited, so I stopped. The same applies to
`https://judgments.ecourts.gov.in/pdfsearch/` and `https://www.sci.gov.in/judgements-judgement-date/`,
both of which returned 200 to `curl` with CAPTCHA markup in the body (25 and 22 occurrences of
"captcha" respectively). **Consequence: the June 2025 order, its findings, the Union's and the
petitioner's pleadings, any figure on the record, and any treatment of arrears are ALL held at T4
through journalism only, and the phase must treat every statement about them as T4.** A reproduction
on indiankanoon/casemine/livelaw would not change this and was not used.

**Supreme Court of India, Union of India v. Paschim Banga Khet Mazdoor Samity, SLP(C) 25528/2025,
order of 27 October 2025 (Vikram Nath and Sandeep Mehta JJ).** Same reason. The case number and bench
are **T4** and should be verified before being written down.

**Rajya Sabha written answer of 1 August 2025 (MoS Rural Development Kamlesh Paswan) giving ₹3,038
crore MGNREGA dues to West Bengal.** Modes tried: `sansad.in` question-search page returns 200 but is
a client-rendered app with no discoverable API (`/api_rs/questions/questionSearch` → 403); PIB search
did not surface it. **Note the one working technique found: `sansad.in/getFile/...` PDF paths DO serve
200 to `curl` with a `Referer: https://sansad.in/` header** (verified on
`sansad.in/getFile/loksabhaquestions/annex/1711/AU3178.pdf`, which returned a real 2-page PDF). The
obstacle is finding the path, not fetching it. Assigned to the parliamentary subagent, which had not
reported at the time of writing.

**Lok Sabha written answer of 22 July 2024 (MoS Finance Pankaj Chaudhary) refusing special category
status to Bihar.** Same reason as above. **T4 only.**

**Ministry of Rural Development's section 27 order/letter to the Government of West Bengal.**
`nrega.nic.in/MGNREGA_new/Nrega_home.aspx` → 404; `nrega.nic.in/netnrega/home.aspx` → 404;
`nreganarep.nic.in` → TLS handshake failure; `mnregaweb4.nic.in/.../all_lvl_details_dashboard_new.aspx`
→ 200 but is a dashboard, not a circulars index. Not located. See absence A1.

**West Bengal Finance Department budget documents.** `wbfin.wb.gov.in` — **no A record at 1.1.1.1**
(authoritative `wb.gov.in` returns SOA with no answer); `www.wbfin.wb.gov.in` — same.
`wbfin.gov.in` **does** resolve (164.100.233.151) but **refuses TLS**: `SSL_ERROR_SYSCALL` from `curl`,
`Empty reply from server` over plain HTTP, and `net::ERR_CONNECTION_CLOSED` from the headless browser.
**All three M1 modes tried; all three fail.** Likely geo-restricted.

**Bihar Finance Department budget documents.** `finance.bih.nic.in` — **no A record at 1.1.1.1**
(authoritative `nic.in` returns SOA with no answer); `finance.bihar.gov.in` — does not resolve;
`state.bihar.gov.in` resolves (103.55.73.125) but **refuses TLS** (`SSL_ERROR_SYSCALL`, also with
`--resolve`, also with `--tlsv1.2 --tls-max 1.2`, also `Empty reply from server` over HTTP). All three
M1 modes tried.

**RBI, *State Finances: A Study of Budgets*.** Not attempted by me (assigned to a subagent that could
not be launched). **Explicitly not asserted anywhere in this part.**

**CAG State Finances Audit Reports for West Bengal after FY2020-21, and for Bihar after FY2022-23.**
Located in listings but not retrieved; the FY2023-24 "Report No. 1 of 2025" PDF surfaced by search
turned out on retrieval to be **Government of Sikkim**, which is exactly the kind of mis-attribution
the retrieval rule exists to catch. **The question "does the CAG's West Bengal report record the
MGNREGA non-release" is therefore UNANSWERED.**

**Archived Union Budget expenditure profiles (FY2016-17, FY2019-20) to test whether a by-state
transfer statement was ever published.** `budget2016-2017/expenditurebudget.asp` and
`budget2019-20/expenditureprofile.php` returned empty bodies. Not pursued further. This is the key
open thread behind absence A6.

---

## FORWARD REFERENCES

- → part 01: **Bihar's SGST and IGST-settlement position as a consuming state, its compensation
  receipts FY2017-18→FY2021-22, and its revenue position after 30 June 2022.** Nothing state-specific
  on GST was established here. Also: the compensation base year is FY2015-16 and the protected growth
  rate 14 per cent — confirm at T1 from the GST (Compensation to States) Act 2017 rather than PIB.
- → part 01: **West Bengal's GST position**, likewise unestablished here.
- → part 02: `fc-vertical-devolution-share` — 32 / 42 / 41 / 41 across FC-XIII to FC-XVI, **with the
  finding that the 42→41 step is J&K leaving the denominator, not a cut (FC-XV para 6.9)**. Do not
  let that step be read as a reduction.
- → part 02: **the Sixteenth Finance Commission's award for FY2026-27→FY2030-31 is live as of this
  phase** (report retrieved; vertical share retained at 41 per cent; new criterion "Contribution to
  GDP" at 10 per cent; per-capita-GSDP-distance weight down to 42.5 per cent). This is a **new award
  boundary the stage-1 periodisation did not anticipate** — the fixed boundaries were FY2014-15/15-16
  and FY2019-20/20-21; **FY2025-26/FY2026-27 is a third.**
- → part 02: absence A2 — no Commission publishes the state × criterion decomposition.
- → part 03: **the dependence ratios are the cess multiplier.** Bihar draws 72.3 per cent of revenue
  receipts from devolution and grants, West Bengal 53.5, all states 42.2 (FC-16 para 5.46). Also
  FC-XIV para 8.13 explicitly names "States not being entitled to the growing share of cess and
  surcharges" as one of the four considerations behind the move to 42 per cent — that is the Union's
  own umpire conceding the cess point in 2015. Also: the FC-XV commissioned study
  **"Cesses and Surcharges"** is downloaded and unread at
  `fincomindia.nic.in/asset/doc/commission-reports/15th-FC/reports/studies/Cesses and Surcharges.pdf`.
- → part 04: **LR-C (three numbers for the same money) is a centrally sponsored schemes finding, not
  a Bihar finding**, and part 04 should own the general form. The SNA/SNA-SPARSH regime (MoF letter
  1(13)PFMS/FCD/2020 of 23 March 2021) is the mechanism; Expenditure Profile Statement 4AA
  ("Accounts & Status of SNA SPARSH") is an instrument part 04 should retrieve.
- → part 04: **absence A6 — the Union Budget's Expenditure Profile has no by-state transfer
  statement.** Part 04 should settle whether one ever existed.
- → part 04: **the matching-share burden as a general quantity.** Bihar's case is measured (§8);
  whether any state has forfeited an allocation for want of its share is unresolved and the
  Appropriation Accounts are the route.
- → part 05: **the West Bengal Governor's assent record and the university-chancellor dispute are
  entirely unretrieved here** (CAPTCHA stop). Part 05 must not assume this part covered them.
- → part 05: the Article 143 Presidential Reference following the April 2025 assent judgment — noted
  as existing (T4), not established.
- → part 06: `tn-fc-interse-share` (5.39 / 5.31 / 4.969 / 4.023 / 4.079 / 4.097 across FC-XI to
  FC-XVI) and `tn-devolution-population-ratio` (0.87 / 0.86 / 0.82 / 0.66 / 0.67 across FC-XI to
  FC-XV), both from FC-16 Tables 8.4 and 8.5, retrieved. **Tamil Nadu's ratio fell 24 per cent between
  FC-XIII and FC-XIV — the single largest fall of any large state in the table — and that is the
  measured form of Tamil Nadu's grievance.** Also `tn-mgnrega-funds-released`.
- → part 06: **the comparator that makes Tamil Nadu's case land is West Bengal at 0.95-0.98, not
  Bihar at 1.15.** Tamil Nadu loses to the formula; West Bengal roughly breaks even on it and loses
  elsewhere. Part 06 should not set Tamil Nadu against Bihar alone.

---

## Definitional disagreements

**D1. "Released" (Union) vs "dues outstanding" (state) — the crux, resolved for both states.**

These are **not competing measurements of one quantity**. They are two quantities:
- *Released* = cash actually transferred in the year. It is an accounting fact, checkable against
  PFMS and the Union's Finance Accounts. Union figure for West Bengal MGNREGA FY2022-23: **₹0.00**.
- *Dues outstanding* = (what the normal allocation rules would have produced) − (what was released),
  accumulated over years. It contains a **counterfactual** and therefore cannot be checked against any
  account. State-side figures for West Bengal range from ₹97,807.91 crore to ₹1.75 lakh crore across
  schemes.

**They do not disagree about any fact.** They disagree about whether an unreleased allocation is a
debt. The Union's position is that an allocation is an intention, extinguishable under section 27; the
state's is that a demand-driven statutory scheme creates an entitlement that non-release does not
extinguish. **That is a legal question, not a measurement question**, and it is precisely the question
the Calcutta High Court and the Supreme Court were asked. The instrument should carry both numbers,
never net them, and never present either as "the" figure.
**For Bihar the same distinction exists but is not politically live**: Bihar's releases were not
stopped, so its "dues" claim is about the *level* of the formula, not about non-release — which is
why Bihar's grievance takes the form of a special-category demand and West Bengal's takes the form of
a dues campaign. **Same mechanism, two different symptoms, and the difference is diagnostic.**

**D2. "Released" vs "received" vs "passed on" — measured, in one document.**
CAG SFAR Bihar FY2022-23 para 4.21(iv): PFMS says the Union released **₹24,398.36 crore**; the Finance
Accounts say the state received **₹22,481.46 crore**; the state transferred **₹22,231.91 crore** to
the implementing agencies. Three stages, three numbers, none of them wrong. Any series named
"central funds to Bihar" must say which of the three it is.

**D3. "Allocated" vs "released" vs "utilised".** All three appear in the Union's own MGNREGA
documents. LSUQ 254 gives FY2023-24 allocation ₹60,000 crore at BE, plus ₹10,000 crore advanced from
the Contingency Fund of India, of which ₹66,994.17 crore "released as on 28.11.2023" — so releases
exceeded the BE allocation and drew on a different instrument. **A series on "MGNREGA allocation"
and a series on "MGNREGA release" will cross each other, legitimately.**

**D4. Union share vs total outlay including the state's matching share — and the Union mixes them
in one table.** PIB 1963198's UPA/NDA table gives MGNREGA as "central funds released" and PMGSY as
"total expenditure including state share" in adjacent rows, then totals the column. **The ₹2,05,003.41
crore total is not a single quantity.** Do not carry it as one.

**D5. Population base: 1971 vs 2011 vs projected.** FC-XIII and FC-XIV are bound to 1971 (FC-XIV para
8.23, quoting its ToR verbatim); FC-XIV adds 2011 as a separate 10 per cent criterion; FC-XV and
FC-XVI use 2011 (FC-XV para 6.43). **FC-XVI's local-body grants use projected 2026 population**
(Summary of Recommendations item 14: rural local bodies on "projected rural population (2026)").
So three bases are live simultaneously in the current award. Any per-capita series must name its base.
And note FC-16 Table 8.5's own note: it uses 2001 population shares for FC-XI and FC-XII and 2011 for
FC-XIII to FC-XV — **the Commission's own ratio series has a denominator break inside it, disclosed.**

**D6. "Income distance" is three different criteria wearing one name.** Fiscal capacity distance
(FC-XIII, taxable capacity), income distance (FC-XIV and FC-XV, per capita GSDP distance from the
third-highest state), per capita GSDP distance (FC-XVI, distance from the *average of the top three*,
with the fourth-highest state's distance assigned to all four plus Goa and Sikkim). The benchmark
state changes too: Haryana under FC-XIV and FC-XV; an average under FC-XVI.

**D7. "Project cost" vs "allocation" vs "transfer" — the Bihar package.** ₹26,000 crore, ₹21,400
crore and ₹11,500 crore in the FY2024-25 Budget speech are **estimated total project costs**, spread
over years and financed from several sources. They are not annual transfers to Bihar and not
necessarily Union money at all (the speech also promises to "expedite" Bihar's requests for
multilateral loans, which are borrowings by Bihar). **Anyone summing them to "₹58,900 crore given to
Bihar" has produced a category error.**

**D8. Two senses of "withheld", kept apart.** Money withheld from West Bengal (a fiscal act, T1-
established as to date and statutory basis) is not data withheld from the public. **No `withheld`
absence record is proposed in this part**, because no absence here has a named requester, a specific
request and a date. A1, A2, A6 and A9 are all `not-published`.

---

## Disciplining measure

**Is there an instrument placing BOTH sides' facts on ONE ledger?** Per quantity:

**For "how much money moved": YES — the CAG, and only the CAG.**
CAG SFAR Bihar FY2022-23 para 4.21(iv) prints, in one paragraph, the Union's PFMS release figure, the
state's Finance Accounts receipt figure and the state's onward transfer figure, and identifies the
gaps. **No other instrument retrieved does this.** The Union's PIB releases give only the Union's
number; the state's dues campaign gives only the state's; the Finance Commission takes the Finance
Accounts as given.

**The CAG's both-sides position, addressed properly.** The CAG audits the Union's accounts *and* each
state's accounts, and in the SNA paragraphs it reads PFMS (a Union system) against the Finance
Accounts (the state's audited books). That is genuinely both sides on one ledger, and it is the
strongest disciplining measure in this subject. **Three qualifications, all real:**
1. **It is retrospective and slow.** The FY2022-23 report was issued in 2024. It cannot discipline a
   live dispute.
2. **It audits accounts, not decisions.** It can say the Union released X and the state received Y.
   It does not, in these reports, ask whether the Union *should* have released more — that is outside
   the audit mandate for a State Finances Audit Report. So on the *dues* question (D1) the CAG is
   silent by design.
3. **The state-by-state table shape is not uniform** (PR-δ): West Bengal's Table 2.3 prints the share
   of Union taxes as a line and Bihar's does not. Cross-state comparison from SFARs needs care.

**For "what the formula gave each state": YES — the Finance Commission itself.**
FC-XVI Tables 8.4 and 8.5 are the closest thing to a neutral scorecard in the whole dispute: the
Commission publishes every state's share against its population share across five awards, and its
narrative (paras 8.68-8.72) says plainly that Bihar's and Uttar Pradesh's shares are "significantly
lower during the award periods of the last two FCs", and that Odisha, Chhattisgarh and Madhya Pradesh
have gained more than the low-income states. **A Commission whose award benefits a state saying that
the state's advantage has shrunk is close to an admission against interest and should be weighted as
such.** Qualification: the Commission is constituted on the Union's Terms of Reference, so it is not
outside the vertical dispute even where it is credible on the horizontal one.

**For "was the section 27 action lawful": the COURT RECORD would be, and I do not have it.**
The Calcutta High Court proceeding is the one forum where the Union's pleadings and the petitioner's
pleadings sit in one file and are tested. **It is the single most valuable unretrieved instrument in
this part** (§9). Until it is read, the phase's account of the West Bengal stoppage has the Union's
case at T1 and the state's case at T4 — **an asymmetry that must be declared on the face of any
record written from this part.**

**For "what West Bengal is owed": NO instrument exists.** Because the quantity is counterfactual (D1),
no ledger can carry both sides of it. The dispute is legal, not evidentiary, and no amount of data
resolves it.

**The basis-vs-evidence caveat, answered.**
- **RBI's *State Finances: A Study of Budgets*: NOT TESTED IN THIS PART.** The hypothesis in the brief
  — that it is compiled from the states' own budget documents and is therefore a *common basis*, not
  independent *evidence* — was not verified, because the publication was not retrieved. **It is
  therefore not used anywhere above and must not be cited on my authority.**
- **What WAS established, and it cuts the same way:** the Sixteenth Finance Commission's state-finance
  chapter sources every figure to **"States' Finance Accounts"** (Figures 5.8, 5.10, Tables 5.10,
  5.11), and the CAG's own SFAR tables source to **"Finance Accounts"**. So the Finance Commission and
  the CAG are drawing on the *same base document*. That means **FC-16 and the CAG agreeing is not two
  independent confirmations — it is one document read twice.** The check that matters is not
  FC-vs-CAG; it is **Finance Accounts vs PFMS**, and that is exactly the check the CAG performs in
  para 4.21(iv). The Finance Accounts are the states' books *audited by the CAG*; PFMS is the Union's
  disbursement system. **Those two are genuinely independent instruments, and where they disagree —
  ₹22,481.46 crore against ₹24,398.36 crore — the disagreement is informative.**
- **PIB is not an instrument.** It is the Union's publication channel. A PIB release carrying the
  text of a parliamentary answer is T1 evidence of *what the Union told Parliament*, which is exactly
  what several findings above need, and is not evidence that the figure is right.

**Summary judgement.** The disciplining measure for this subject is **the CAG's reading of PFMS
against the Finance Accounts** — narrow, retrospective, and the only place both sides' numbers meet.
The Finance Commission's ratio tables discipline the *formula* dispute. **Nothing disciplines the
dues dispute, and nothing will, because it is not a dispute about facts.**
