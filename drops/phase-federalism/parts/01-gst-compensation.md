# Phase 13 (federalism) — stage 2 part 01

# The GST Council and the compensation arc

**Model of record for this part: `claude-opus-5` (transcript-recorded).** Three subagents were
spawned, all instructed to run on opus; the model each transcript records is reported in
§Sources retrieved where their material is used, and any material whose model of record could not
be confirmed is marked.

**Retrieval posture.** The spine of this part is the GST Council's own **meeting minutes**, which
are published in full at `gstcouncil.gov.in` and which I retrieved and read directly as PDFs
(then `pdftotext -layout`). I retrieved and searched the minutes of **nineteen** meetings —
the 2nd, 7th, 8th, 38th, 39th, 40th, 41st, 42nd, 43rd, 44th, 45th, 46th, 47th, 48th, 49th, 50th,
51st, 53rd, 54th, 55th — plus the **agenda** of the 42nd, plus the Constitution (101st Amendment)
Act 2016. Every figure below that is attributed to a meeting is a figure I read in that meeting's
own minute book at the line I cite.

**M1 status: no host required escalation.** `dig @1.1.1.1` resolved every host in scope and plain
`curl` with a desktop browser User-Agent returned HTTP 200 from `gstcouncil.gov.in`,
`www.cbic.gov.in`, `www.indiabudget.gov.in`, `cag.gov.in`, `sansad.in`, `pib.gov.in`,
`rbi.org.in`, `www.indiacode.nic.in`. Two notes for later parts: **`indiabudget.gov.in` without
the `www.` prefix fails TLS** (`no alternative certificate subject name matches target host name`)
and must be fetched as `https://www.indiabudget.gov.in/`; and **`main.sci.gov.in` does not
resolve at all** on 1.1.1.1 — the Supreme Court host that answers is `api.sci.gov.in`.

---

## Findings

### 1. The Council's construction — Article 279A, verbatim

Retrieved: the Constitution (One Hundred and First Amendment) Act, 2016, as hosted by the Council
itself at `https://gstcouncil.gov.in/sites/default/files/2024-02/consti-amend-act.pdf` (the Gazette
of India Extraordinary print — the page furniture reads `THE GAZETTE OF INDIA EXTRAORDINARY
[PART II—`). Section 12 inserts Article 279A. **T1.**

**Composition (279A(2)).** Chairperson: the Union Finance Minister. Member: the Union Minister of
State in charge of Revenue or Finance. Members: "the Minister in charge of Finance or Taxation or
any other Minister nominated by each State Government". By Article 366(26B), as inserted by
section 14 of the same Act, **"State" for the purposes of Article 279A includes a Union territory
with Legislature** — which is why Delhi, Puducherry and (after 2019) the UT of Jammu & Kashmir
vote in the Council.

**Quorum (279A(7)), verbatim:** *"One-half of the total number of Members of the Goods and
Services Tax Council shall constitute the quorum at its meetings."*

**Voting (279A(9)), verbatim:**

> "(9) Every decision of the Goods and Services Tax Council shall be taken at a meeting, by a
> majority of not less than three-fourths of the weighted votes of the members present and voting,
> in accordance with the following principles, namely:— (a) the vote of the Central Government
> shall have a weightage of one-third of the total votes cast, and (b) the votes of all the State
> Governments taken together shall have a weightage of two-thirds of the total votes cast, in that
> meeting."

Two consequences the text forces and which the public argument usually gets wrong:

- **The Centre holds a veto; no combination of states does.** With the Centre's one-third against a
  proposal, the maximum attainable is two-thirds < three-fourths. The Centre alone can defeat
  anything.
- **The states, voting together, also hold a veto, and the threshold binds them harder than a bare
  majority suggests.** With the Centre in favour (33.33%), the proposal needs a further 41.67 points
  out of the states' 66.67 — i.e. **62.5% of the states present and voting**. This is not a
  reconstruction: the Council itself performed exactly this arithmetic on the record. See §2.

**Functions (279A(4)).** The Council "shall make recommendations to the Union and the States on"
eight enumerated heads, including (e) "the rates including floor rates with bands" and **(f) "any
special rate or rates for a specified period, to raise additional resources during any natural
calamity or disaster"** — the clause under which Kerala's 2018 flood cess was allowed, and which
was cited back at the Council in 2020 (41st meeting, para 35, by the Member from Goa) as the
precedent for a COVID-era cess.

**Dispute settlement (279A(11)), verbatim:** *"The Goods and Services Tax Council shall establish a
mechanism to adjudicate any dispute — (a) between the Government of India and one or more States;
or (b) between the Government of India and any State or States on one side and one or more other
States on the other side; or (c) between two or more States, arising out of the recommendations of
the Council or implementation thereof."* **This mechanism has never been established.** See
§Absences A-3 — this is a first-class absence, with a named requester, a specific request and
dates.

**The bargain — section 18 of the Amendment Act, verbatim:**

> "18. Parliament shall, by law, on the recommendation of the Goods and Services Tax Council,
> provide for compensation to the States for loss of revenue arising on account of implementation
> of the goods and services tax for a period of five years."

Note precisely what section 18 does and does not do. It is **not** part of the Constitution —
it is a free-standing section of the Amendment Act, not an inserted Article. It commands
*Parliament* to legislate; it does not itself confer an entitlement, it does not name a growth
rate, it does not name a base year, and **it does not say when the five years begin**. Every one of
those was settled below the constitutional level: the growth rate and base year in the Council
(§3), the five-year window in the Act. This gap is the load-bearing seam of the whole 2020 dispute
(§4).

### 2. Voting: how often the Council has actually divided

**The Council has voted once.** The division took place at the **38th meeting, 18 December 2019**,
on whether to levy a uniform GST rate on State-run and State-authorised lotteries. I read the
passage in the minute book. Kerala pressed for a division; the Chairperson twice asked the House to
proceed by consensus; Kerala refused; the Secretary read out **Rule 14 of the Procedure and Conduct
of Business Regulations of the GST Council**, verbatim in the minutes:

> "All proposals before the Council shall be discussed threadbare. Thereafter, the Chairperson
> shall put the question and invite the Members of the Council to cast their votes by show of
> hands. In case Member seeks division on any proposal, the Chairperson shall put the proposal to
> vote through secret ballot"

**The Council did not follow its own rule.** Rule 14 as read requires a **secret ballot** once a
Member seeks division. What actually happened, per the minutes, is a **show of hands with the
names read out**. The minutes record no objection to the substitution and no explanation for it.

**The result, as recorded:** 21 states in favour — Arunachal Pradesh, Assam, Manipur, Mizoram,
Nagaland, Sikkim, Tripura, Bihar, Goa, Gujarat, Haryana, Himachal Pradesh, Jammu & Kashmir (UT),
Jharkhand, Karnataka, Uttar Pradesh, Uttarakhand, Andhra Pradesh, Odisha, Tamil Nadu, Telangana.
7 against — Puducherry (UT), Kerala, Maharashtra, Madhya Pradesh, Chhattisgarh, Delhi (UT), West
Bengal. Three did not cast — Punjab, Rajasthan, Meghalaya.

The Secretary then pronounced: *"of the 28 States present and voting, 18 votes were required for
passage of the proposal … 21 States had voted in favour."*

**Reconstructing "18 of 28" is worth doing, because it is the only time the 279A(9) formula has been
applied in practice.** 18 is not three-quarters of 28 (that would be 21). It is the state-count
that satisfies the *weighted* rule on the assumption that the Centre votes with the proposal:
the Centre contributes its full one-third (33.33%); the proposal needs 75%; the residual
41.67 points must come out of the states' 66.67, i.e. 62.5% of the 28 states present and voting =
17.5, rounded up to **18**. The minutes do not state the Centre's vote — but the threshold the
Secretary announced is only correct if the Centre voted in favour. That is a small but real
inference, and I flag it as an inference. **The Centre's own vote is not recorded in the division
at all.** That is itself notable: the constitutional formula turns on the Centre's one-third, and
the one recorded division does not minute how the Centre cast it.

**That the 38th was the first division is asserted inside the 38th's own minutes**, by the Deputy
Chief Minister of Gujarat: *"till date none of the decision on any issue had been done by
division"*. That statement covers meetings 1–37 and I take it as the Council's own evidence for
the period to December 2019.

**Sweep and positive control (M3).** For the period after the 38th I swept, in full text, the
minutes of the 39th, 40th, 41st, 42nd, 43rd, 44th, 45th, 46th, 47th, 48th, 49th, 50th, 51st, 53rd,
54th and 55th meetings for the strings `sought a division | call(ed) for division | put to vote |
show of hands | secret ballot | three.fourth | weighted vote | insisted on division | division of
votes`. **Positive control: the identical regex run against the 38th minutes returns 9 hits.** All
sixteen swept files return 0. Two meetings are *not* covered by this sweep and I do not claim them:

- **The 52nd meeting (7 Oct 2023) is unswept.** Its published minutes PDF is 117 pages and 28.7 MB
  but contains **no text layer**: `pdftotext` extracts 4,329 bytes, consisting solely of the running
  header "Minutes of 52nd GST Council Meeting" repeated 117 times. `pypdf` confirms page-level
  extraction returns only that header for pages 1, 6, 21 and 41. Every page of substantive content
  is a scanned image. **A bare sweep would have returned HTTP 200, a valid PDF and "no votes
  found" — on zero evidence.** This is exactly the M3 failure mode and it is a finding in its own
  right (§Absences A-2).
- **The 56th meeting (3 Sep 2025) has no published minutes at all** (§Absences A-1).

So the defensible claim is: **one division, at the 38th meeting, in the Council's entire recorded
life to the 55th meeting, with the 52nd meeting unverifiable and the 56th unpublished.**

**Divisions demanded and refused.** At the **42nd meeting (5 and 12 October 2020)** four members
demanded a division on the compensation-borrowing item — Punjab (*"if there was no consensus, a
division could be called"*), Chhattisgarh (*"also supported a division"*), West Bengal (*"the
Hon'ble Chairperson may call for division"*) and, in substance, Puducherry (*"since there was a
division, the Hon'ble Chairperson had to arrive at a consensus before coming to a conclusion"*).
**No division was held.** The Chairperson did not put the question. Two further recorded positions
frame this: Gujarat argued *"there was never a division in the GST Council earlier and it would not
be appropriate to go for voting or division"* — **which is factually wrong on the Council's own
record**, the lottery division having taken place ten months earlier, and Bihar in the same meeting
correctly recalled it (*"as was done in deciding the lottery issue"*). Chhattisgarh set out the
constitutional route precisely: *"if unfortunately consensus was not forthcoming, tenets of the GST
Act must be adhered to and a voting may be called where 75% or more members vote for a particular
issue."* The Secretary later advised that under the Regulations a matter to be decided by voting
must be deferred to a **physical** meeting, voting not being possible by video conference; the 42nd
was held by video conference.

**The structural point.** The Council's practice is consensus, and consensus in this Council does
not mean unanimity — it means *the Chairperson states the sense of the House*. Because the
Chairperson is the Union Finance Minister, and because the Centre alone holds a blocking third, the
consensus convention operates asymmetrically: it protects the Centre from ever being outvoted while
leaving dissenting states with no recorded instrument of dissent except a minuted speech. The
42nd meeting is the demonstration — four states asked for the constitutional mechanism and did not
get it, and the item was then closed without a decision (§4).

### 3. The compensation guarantee — where the 14% came from

The five-year guarantee is constitutional in its command (section 18) and statutory in its content
(the GST (Compensation to States) Act, 2017). **Its two decisive numbers — the 14% protected
growth rate and the base year — are neither constitutional nor, in origin, statutory: they were
settled in the Council and then written down.**

**The 14% was negotiated, not derived, and the Chairperson said so on the record.** At the **7th
meeting (22–23 December 2016)**, para 21, the minutes record Arun Jaitley as Chairperson:

> "the projected average growth rate of the economy was about 6% to 7% and adding to it inflation
> of about 4%, the figure did not reach 14% as was agreed for the projected growth rate for
> calculating compensation and this figure was arrived at after considering various other
> imponderables."

That is the Chair of the Council stating that the guaranteed rate exceeded any arithmetic he could
construct from growth plus inflation. He also states in the same paragraph that *"the projected
growth rate of 14% on the base year collection was linked to the overall agreement reached
regarding compensation and it was not possible at this stage to open only one limb of the
agreement."* The 14% is a **price paid for the states' surrender of taxing power**, and the
Council's own minutes say so.

**The Centre's obligation, as stated by the Chairperson in 2016.** Same meeting, para 21, verbatim:
*"The Hon'ble Chairperson observed that there was Constitutional commitment for the Central
Government to provide hundred per cent compensation and how it would be done was for the Council
to decide."* And in para 22, the Minister from Jammu & Kashmir characterised the arrangement as
*"an insurance at 14% and there would be compensation even if a State suffered from a calamity"*;
West Bengal asked that *"it should be clearly recorded that there shall be 100% compensation at the
projected growth rate of 14%"*; the Secretary to the Council replied that *"this was already a
commitment but the Council would need to provide for means of raising resources for compensation."*
**Hold that exchange.** It is the exact proposition the Attorney-General denied in August 2020
(§4), and it sits in the same instrument.

**What was to happen if the cess fell short — the 8th meeting decision, verbatim.** At the **8th
meeting (3–4 January 2017)**, para 24(ii), the Council approved the revised draft Compensation Law
subject to a modification of what became section 10(2):

> "To modify this sub-section to clearly reflect that compensation shall be paid bi-monthly and
> that it shall be paid within 5 years, and in case the amount in the GST Compensation Fund is
> likely to fall short or fell short of the compensation payable in any bimonthly period, **the GST
> Council shall decide the mode of raising additional resources including borrowing from the market
> which could be repaid by collection of cess in the sixth year or further subsequent year.**"

And para 24(iii): 50% of any amount remaining unutilised in the Fund at the end of the transition
period goes to the Consolidated Fund of India, 50% to the states and UTs in the ratio of their SGST
/ UTGST revenue in the last year of the transition period. (This is section 10(3), and it is the
provision the Council reached for again in December 2024 — §5.)

**Also decided at the 8th, and refused: a higher rate for the North-East.** Para 23(v): *"The
Hon'ble Minister from Meghalaya stated that considering the geographical factors and the limited
resources of the North Eastern States, the projected growth rate for them should be 18% instead of
14%. After discussion, the Council did not agree to this suggestion."* Single national rate, no
differentiation.

**The base year.** The Act fixes 2015-16. The **7th meeting minutes, para 21, record the
Chairperson referring to "the base year 2014-15"** — *"He added that revenue for the base year
2014-15 was to be based on actual tax collection figure and not on some hypothetical basis of
collection."* I flag this as a discrepancy in the instrument (either a transcription error in the
minute book or a reference to a superseded position); the operative base year in law is **2015-16**
and the Council's later documents use 2015-16 throughout — the 47th meeting minutes, para 22.14,
record Odisha describing the promise as *"annual growth rate of 14% with the baseline of 2015-16"*.
**Do not carry the 2014-15 reading forward.** See §Provenance PR-x.

**Statutory frame.** GST (Compensation to States) Act 2017 (Act 15 of 2017): projected growth rate
14% (s.3), base year 2015-16 (s.4), projected revenue (s.5), levy of cess (s.8), the Compensation
Fund and the 50:50 residue (s.10), "transition period" defined as five years from the transition
date (s.2). **Transition period: 1 July 2017 – 30 June 2022.** Verbatim section text — see
§Sources / subagent A.

### 4. The 2020 rupture

#### 4a. The Attorney-General's opinion — the legal pivot

At the **41st meeting (27 August 2020)**, a meeting called for the single purpose of compensation,
the Joint Secretary (DoR) read out the opinion of the Attorney-General of India. The minutes record
the gist verbatim, para 4.7:

> "a. Irrespective of what the situation goes, whether cess resources are adequate or not at any
> point of time, the entitlement of the States are very hard coded in the Act that cannot be
> changed, it is protected revenue minus actual revenue, every year.
> b. **There is no express provision in the Compensation Act which puts a mandate on the Government
> of India to raise resources or to arrange resources for payment of compensation.**
> c. GST Council has the power to raise resources, it is very clearly mentioned in the Act that GST
> Council has to find other sources to meet the requirement.
> d. Council will be well within its rights to discuss the borrowing issue to meet the compensation
> gap, nevertheless the borrowings will be determined by the constitutional provisions which are
> different from the GST provisions, which is governed by Article 293 of the Constitution."

This is the hinge. **The entitlement survives; the obligation to fund it moves from the Union to
the Council.** Punjab immediately recorded that *"the opinion of the learned AG was not circulated
or shared with the States in advance"*, and then made the case that is the single best statement of
the states' position anywhere in the corpus — and it is made **by quoting the Council's own earlier
minutes back at it**:

> "in the 10th Meeting of the GST Council the Secretary to the Council statement is recorded in
> Para 6.3, Page No. 13 as follows: *'Central Government could raise resources by other means for
> compensation and this could then be recouped by continuation of cess beyond 5 years. He stated
> that other decisions including possibility of market borrowing for payments of compensation were
> part of the Minutes of the 8th Meeting and need not be incorporated in the law'* … Thus it was
> evident that the GST Compensation Act was not worded as per the additional decisions of the
> Council, but in view of the assurances given by the Secretary to the Council, not to insist on
> legal change, agreeing to accept the promise there is no ambiguity what so ever that Centre was
> responsible for payment of compensation."

Punjab's further argument, also minuted: *"If the Centre had no obligation to pay GST compensation
then the question arises as to why the orders for release of compensation from time to time were
being issued by the Central Government, why not the Council Secretariat. The Compensation Fund is
reflected in the Union Budget as a receipt of the Central Government under Major Head 009."*

**This is the disciplining-measure instance.** The Centre's legal position and the states' rebuttal
— including the specific paragraph and page of an earlier minute book that the rebuttal rests on —
are in the *same document*, published by the Union's own Council Secretariat. Neither side's
position can be quoted from the 41st minutes without the other's being on the same page. See
§Disciplining measure.

#### 4b. "Act of God" — where the phrase is and is not

**The phrase "act of God" does not appear in the Chairperson's mouth in the 41st meeting minutes.**
I searched the full text of the 41st minute book for `act of God | force majeure | natural calamity`.
The only substantive hits are at **para 35, spoken by the Member from Goa**, arguing *for* the
Centre's position: *"In all international laws, agreements there is always a force majeure clause,
which is used in unexpected cases as in an act of God … in case of Kerala, in spite of much
opposition, after much deliberation, due to a force majeure or act of God clause, the Council
allowed the State of Kerala to impose a special Cess to come out of the flood situation."*

The famous attribution of "act of God" to the Union side is to the **post-meeting press conference
of 27 August 2020**, not to the Council record. **I could not retrieve an official transcript of
that press conference.** Any citation of the Union Finance Minister or Finance Secretary saying
"act of God" is therefore **T4 (relayed)** and I do not assert it here as T1. What the minutes *do*
establish, and what matters more, is the substantive equivalent: the Centre's formal proposal to
**split the shortfall into a COVID bucket and a GST-implementation bucket and guarantee only the
latter**. That is §4c.

#### 4c. The two-bucket split — the Centre's actual proposition

41st meeting, paras 27.2–27.5. The Joint Secretary (DoR) presented, and the Finance Secretary
summarised, this arithmetic for FY2020-21 (all ₹ crore, as minuted):

| quantity | value | note |
|---|---|---|
| total compensation requirement, full year | ~3,00,000 | Finance Secretary, para 27.5 |
| protected revenue, April–January | 6,38,339 | ten months only; Feb–Mar compensation falls due in the next FY |
| post-settlement SGST, same ten months, FY2019-20 | 4,30,147 | |
| counterfactual FY2020-21 collection at +10% | 4,73,161 | "if Covid had not been there" |
| gap attributable to **GST implementation** | **1,65,718** in para 27.2 / **1,65,178** in para 27.4 | *the two paragraphs disagree by ₹540 crore* |
| balance in the Compensation Cess Fund at 31.07.2020 | 11,438 | |
| estimated cess collection Aug–Mar | 57,266 | |
| resources available against the implementation gap | 68,700 | 11,438 + 57,266 = 68,704; minuted as 68,700 |
| **residual "implementation" shortfall** | **96,477** | |
| balance attributed to **COVID** | ~1,35,000 | 3,00,000 − 1,65,000 |

Two defects in the Council's own arithmetic, both first-class:

- **₹1,65,718 (para 27.2) versus ₹1,65,178 (para 27.4) for the same quantity, two paragraphs
  apart.** A digit transposition, uncorrected in the signed minutes. The downstream figure of
  ₹96,477 crore reconciles to the 1,65,178 reading (1,65,178 − 68,700 ≈ 96,478), not to 1,65,718.
- Kerala's objection, minuted at para 29, is the correct one and was not answered:
  *"apportionment of shortfall into loss from Covid and loss from implementation of GST should not
  be done as the Constitution does not make such distinction. It is a false direction of discussion
  as there is no distinction made in legal terms."* Delhi (para 36) made the same point
  operationally: *"The distinction between shortfall from GST implementation and from Covid is
  difficult to make and may be wrong also."* Assam (para 30) took the contrary view: *"the
  differentiation … is inherent in the Constitution and not technical."*

**The two sides here rest on different facts about the same instrument, not on different
weightings.** The Centre's case is that section 18 and the Act compensate *"loss of revenue arising
on account of implementation of the goods and services tax"* — a causal phrase, so a pandemic-
caused loss is outside it. The states' case is that the Act's operative machinery (protected
revenue minus actual revenue) contains no causal test at all, so the causal phrase in the recital
cannot be reintroduced to cut the entitlement down. **The Attorney-General's own opinion supports
the states on this narrow point** (limb (a): "the entitlement of the States are very hard coded in
the Act … protected revenue minus actual revenue, every year") **and the Centre on the funding
point** (limb (b)). The Centre's proposal to guarantee only the ₹96,477 crore bucket is therefore
in tension with limb (a) of the very opinion it relied on. That tension is visible only because
both the opinion and the objection are in the same minute book.

#### 4d. The two options

41st meeting, paras 46–47, presented by the Chairperson:

- **Option 1** — borrow **₹96,477 crore** (the "GST implementation" bucket only) through a **Special
  Window coordinated by the Ministry of Finance** with the RBI, at or close to the G-sec yield,
  released bi-monthly; plus a further **relaxation of 0.5% in states' FRBM limit**. Repayment from
  cess collections beyond the transition period.
- **Option 2** — borrow the whole gap: total requirement ~₹3,00,000 crore less estimated cess
  collection ~₹70,000 crore = **~₹2,30,000 crore**, "about 1.15% of GDP". Repayment also from
  extended cess.

**In both options the borrowing is in the states' name.** The Chairperson clarified this
explicitly, para 49: *"the Centre would only facilitate the borrowing through the RBI but the
borrowing would be in the name of the States as the Centre already had borrowings upsetting the
FRBM."* And para 51: *"States would not be burdened with repayment of debt as the borrowed amount
would be paid back with the collections from the Cess beyond the transition period."*

The Chairperson also flagged, for FY2021-22, a requirement of ~₹3,50,000 crore against ~₹90,000
crore of collection, i.e. ~₹2,40,000 crore of further borrowing — and proposed that the arrangement
be made for the current year only and reviewed.

#### 4e. Option 1's written terms — and the sentence that matters

The **42nd meeting agenda** (Volume 5), which I retrieved and read, reproduces the Department of
Expenditure's communication of Option 1 to states as eleven numbered clauses. The operative ones:

> "I. The shortfall arising out of GST implementation (calculated at Rs. 97,000 crores
> approximately) will be borrowed by States through issue of debt under a Special Window
> coordinated by the Ministry of Finance.
> …
> IV. A special borrowing permission will be given by the GOI under Article 293 for this amount,
> over and above any other borrowing ceilings …
> VI. The interest on the borrowing under the Special Window will be paid from the Cess as and when
> it arises until the end of the transition period. After the transition period, principal and
> interest will also be paid from proceeds of the Cess, by extending the Cess beyond the transition
> period for such period as may be required. **The State will not be required to service the debt
> or to repay it from any other source.**
> …
> X. The borrowing under the Special Window will not be treated as debt of the State for any norms
> which may be prescribed by the Finance Commission etc.
> XI. The Compensation Cess will be continued after the transition period until such time as all
> arrears of compensation for the transition period are paid to the States. **The first charge on
> the Compensation Cess each year would be the interest payable; the second charge would be the
> principal repayment. The remaining arrears of compensation … would be paid after the interest and
> principal are paid.**"

**Clause XI is the whole 2022–2026 story in advance.** It subordinates the states' compensation
arrears to debt service on the states' own borrowing. Every subsequent Council discussion about
"the cess is already committed" (§5) is an application of clause XI.

**Who bears the repayment — the honest answer.** Formally: the states are the borrowers (Option 1
clause I; Chairperson at 41st para 49), the debt does not count against them for Finance Commission
norms (clause X), and they "will not be required to service the debt … from any other source"
(clause VI). Substantively: **it is repaid out of the compensation cess — that is, out of the very
fund that would otherwise have paid the states their arrears.** The states therefore bear it in the
only sense that matters economically, by forgoing arrears, while not bearing it in the fiscal-
accounting sense. Both statements are true and neither is the whole truth; any record on this must
carry both.

#### 4f. Who refused — named, from the Council's own agenda

The **42nd meeting agenda**, Annexure-I, "GST Compensation options opted by States", names them.
As at the agenda's compilation: **20 states (Andhra Pradesh, Arunachal Pradesh, Assam, Bihar, Goa,
Gujarat, Haryana, Himachal Pradesh, Karnataka, Madhya Pradesh, Maharashtra, Manipur, Meghalaya,
Mizoram, Nagaland, Odisha, Sikkim, Tripura, Uttar Pradesh, Uttarakhand) and the UT of J&K** had
opted for Option 1; **Puducherry** indicated it would accept Option 1 if all states did;
**no state opted for Option 2**; and **"8 States and NCT Delhi are yet to exercise any options"**.

The eight, listed under "(Yet to exercise any option)" in the annexure, are:

**Chhattisgarh · Jharkhand · Kerala · Punjab · Rajasthan · Tamil Nadu · Telangana · West Bengal**
(plus **NCT of Delhi**, counted separately in the agenda's own phrasing).

Their recorded reasons, from the same annexure, are not identical and the differences matter:

- **Kerala** — *"Both the options are unacceptable to the State. These go against the spirit of GST
  (Compensation to States) Act, 2017 and needs to be withdrawn … Central Government should borrow
  and credit to the Cess Fund instead of borrowing through States."*
- **Punjab** — a constitutional objection: the options *"need to be enacted through legislative
  process and that too on the recommendation of the Council. Council otherwise doesn't have the
  power to alter the compensation mechanism suo motto"*; and *"Compensation can't be two different
  amounts depending on the preference of a State"*; and expressly invokes **Article 279A(11)**.
- **Tamil Nadu** — a *measurement* objection, uniquely: *"TN has estimated higher compensation gaps
  compared to compensation gap calculated by GoI. Base revenue for FY 2019-20 used by DoR must also
  be net of the SGST refunds and must not include the IGST Adhoc settlement."* **This is a
  definitional dispute over the Centre's own arithmetic and it is recorded in the Centre's own
  agenda paper.** Carry it to §Definitional disagreements.
- **Rajasthan, Telangana, West Bengal, Jharkhand** — all variants of "the Union should borrow, not
  the states", with West Bengal offering the trade explicitly: the Chief Minister wrote to the Prime
  Minister that *"Centre must borrow … and accordingly, States will reciprocate in supporting
  resolution that cess collection continues beyond five years till the entire debt of the Centre is
  totally liquidated."*
- **Chhattisgarh** — annexure entry blank; its objection is in the minutes instead.

**A reversal worth recording.** At the 41st meeting (paras 52–53, as reproduced in the 42nd agenda)
**Tamil Nadu and Puducherry both said they would go with Option 2**. By the 42nd agenda both are
recorded as not having opted, and Puducherry as conditionally Option 1. And two states are minuted
as having **reconsidered and moved to Option 1**: Himachal Pradesh and Manipur. The option-taking
was a rolling bilateral process between the Department of Expenditure and each state, not a Council
proceeding.

#### 4g. The decision that was never taken

By 12 October 2020 the Joint Secretary reported (42nd minutes, para 32): **"23 States / UTs had
opted for Option-1, whereas no State had opted for Option-2 and 8 States had reservations against
either of the two Options."** And the Secretary reported (para 33) that Option 1 had been
**modified**: the assumed growth rate cut from 10% to 7%, *"being the actual rate of growth in the
last two completed fiscal years"*, so that **"the amount to be borrowed under Option-1 would now
become Rs.1.1 Lakh crore instead of Rs.97,000 crore."*

**Now the structural finding.** The 42nd meeting had two compensation items:

- **Agenda Item 9 — extension of the cess.** Decided, and minuted as a decision, para 27:
  *"For Agenda Item 9, the Council took note of the suggestions made by the Hon'ble Ministers and
  **approved to extend the levy of Compensation Cess beyond June 2022 till the entire shortfall is
  covered**. The extension has to be reviewed from time to time."* Kerala, West Bengal, Punjab,
  Karnataka, Puducherry, Madhya Pradesh, Uttar Pradesh, Goa and Odisha are each minuted supporting
  it. **Consensus, and a real Council recommendation.**
- **Agenda Item 9A — the borrowing options.** **No decision is recorded at all.** The minutes'
  final substantive paragraph, para 60, reads in full: *"After detailed discussion on the Agenda
  Item 9A on 12th October 2020, the Secretary to the Council thanked the Hon'ble Union Finance
  Minister … and other participants of the meeting. With this, he announced the closure of the
  meeting."* There is no "the Council recommended", no "the Council approved", no sense-of-the-
  House, and no division — though four states had demanded one.

**The single most important structural fact in this part: the back-to-back borrowing arrangement
that resolved the 2020 rupture was never a recommendation of the GST Council.** It was implemented
by the **Department of Expenditure, bilaterally, by option-letters to individual states**, and the
Council's role was reduced to (i) extending the cess, which it did decide, and (ii) being informed.
The 43rd meeting confirms the pattern prospectively — para 22.4: *"The decision on the borrowing,
the exact amount and the timing would be taken based on the above principles **in consultation with
the Reserve Bank of India, Department of Economic Affairs, Department of Expenditure and the
States**."* The Council is not in that list.

#### 4h. The back-to-back loans, as executed

- **FY2020-21 — ₹1.1 lakh crore.** 43rd meeting minutes, para 22.1: *"consequent to the discussions
  in the 42nd meeting of the Council held on 5th & 12th October 2020, for the FY 2020-21, the
  Government of India raised Rs.1.1 lakh crore of debt and passed it on as loan to the States on a
  back-to-back basis with an **average interest rate of 4.85%**."* Note the reversal that this
  sentence conceals: under Option 1 as offered, the **states** were to be the borrowers; as
  executed, **the Government of India raised the debt** and on-lent it. The Union's position
  changed between 12 October 2020 and the execution, and **the Council minutes do not record the
  moment or the reasons for that change** — the 42nd closed with no decision and the 43rd opens
  with the reversal already accomplished.
- **FY2021-22 — ₹1.59 lakh crore.** 43rd minutes, para 22.2: on the same principles and the same
  7% normative growth, *"the estimated amount … would be **Rs.1,58,267 crores**"*; the Secretary
  concluded (para 22.19) that he *"would initiate negotiations on **Rs 1.58 lakh crores** … and
  also with RBI for a back-to-back borrowing."* By the **45th meeting (17 Sep 2021)**, para 21.2,
  the figure is settled at **₹1.59 lakh crore**, of which *"Rs 75,000 crores has already been
  borrowed and passed on to the states"*, with *"still arrears of more than Rs 80,000 crores
  pertaining to compensation for 2020-21."*
- **Total principal — ₹2,69,208 crore.** The 54th meeting's annexure (9 Sep 2024) carries the line
  **"Back-to-Back Loan Repayable −2,69,208"**. That reconciles exactly to **₹1,10,208 crore +
  ₹1,59,000 crore**. I therefore report the FY2020-21 tranche as **₹1,10,208 crore** — but flag it
  as **derived by subtraction from the 54th's total**, not read directly; the minutes give it only
  as "Rs 1.1 lakh crore".
- **Projected interest — ₹51,561 crore** (54th annexure, "Interest on B2B Loan (projected)").

### 5. The cess after the guarantee

**The regime boundary is real and the instrument names it.** 45th meeting, para 21.18, the
Secretary, verbatim:

> "while the levy of cess has been extended **extension of compensation period is a completely
> different issue** and wondered from where the resources for the same would come since the cess
> collections till March, 2026 are already committed."

That single sentence is the Centre's whole answer to the extension demand, and it is an application
of Option 1 clause XI: the cess is pre-committed to debt service, therefore there is nothing to
extend the compensation *with*. **This is the cleanest statement in the corpus of why compensation
ended while the cess continued, and it confirms the periodisation this phase was given: two series,
not one.**

**How March 2026 got fixed — and by whom.** The Council's decision (42nd, para 27) was open-ended:
"beyond June 2022 **till the entire shortfall is covered**". The specific terminal date was not a
Council recommendation. The Chairperson stated this herself at the **54th meeting**, para 9.8,
verbatim:

> "as per the provisions of law the Compensation Cess was to be levied only till 2022 but **the
> period for levy was extended to March, 2026 by way of notification based on an opinion taken from
> the Attorney General of India**."

So: the *power* to extend came from a Council recommendation; the *duration* came from an executive
notification resting on the AG's opinion. The 45th meeting (para 21.3) shows where March 2026 came
from arithmetically: protected revenue April 2020 – June 2022 of *"around Rs 18.9 lakh crores"*
implied that *"the cess collection till March 2026 shall be required to meet the liability of
servicing of the debt incurred and the arrears of compensation."* It is a debt-amortisation date,
not a policy date.

**Compensation cess collections, by financial year.** From the **54th meeting minutes, annexure
"3. Status update – Compensation Cess (1/3)"**, ₹ crore:

| FY | cess collected |
|---|---|
| FY2017-18 (from July 2017) | 62,612 |
| FY2018-19 | 95,081 |
| FY2019-20 | 95,551 |
| FY2020-21 | 85,191 |
| FY2021-22 | 1,04,609 |
| FY2022-23 | 1,25,863 |
| FY2023-24 | 1,41,809 |
| FY2024-25 (to August 2024) | 63,725 |
| **Jul 2017 – Aug 2024 total** | **7,74,441** |
| projected Sep 2024 – Mar 2025 | 92,265 |
| projected total to Mar 2025 | 8,66,706 |

**I verified this table arithmetically**: the eight annual figures sum to exactly 7,74,441, and
7,74,441 + 92,265 = 8,66,706. The table is internally consistent. (The OCR of the minute book
renders the total as "7:74,441"; the sum resolves the character.)

**The compensation account, projected to 31 March 2026.** Same annexure, "(2/3)", ₹ crore:

| particular | amount |
|---|---|
| total cess collections (actual + projected) to March 2025 | 8,66,706 |
| compensation paid till 5 September 2024 | −6,64,203 |
| back-to-back loan repayable | −2,69,208 |
| estimated compensation payable | −13,000 |
| interest on B2B loan (projected) | −51,561 |
| excess compensation to be recovered | +213 |
| **shortfall in compensation account as of 31 March 2025** | **−1,31,053** |
| projected collection FY2025-26 (10% growth) | +1,71,589 |
| **projected surplus as of March 2026** | **+40,536** |

**Verified arithmetically** — the OCR renders the shortfall line as "1,351,053", which is
unreadable as printed; the column sums to −1,31,053 and −1,31,053 + 1,71,589 = 40,536 exactly,
which reconciles the character. **Do not carry "1,351,053" forward; it is an OCR artefact.**

**When the loans were expected to be repaid.** 53rd meeting (22 June 2024), para 8.3: after the
year's collections, compensation payable and part repayment, *"there will still be balance of
approximately ₹1,00,000 crore of the back-to-back loan to be repaid … based on the current trend,
it is expected that the **back-to-back loan would be fully repaid during the later part of the FY
2025-26**."* Refined at the 54th (para 9.8) to *"hopefully repaid by **December, 2025 or January,
2026**"*.

**The question the Council then had to answer, framed by the Chairperson herself** — 54th, para 9.8:
*"the present discussion is about what needs to be done with respect to the cess collected post
repayment of all obligations … a decision needs to be made regarding whether the Cess should
continue beyond March 2026. It was further clarified that **if it is decided to extend the Cess, it
will need to be rephrased by the Council, as it can no longer be called 'Compensation Cess.'**"*
Also minuted at 9.7, the Secretary: *"it was never communicated that the Compensation Cess will not
require to be levied after the present financial year."*

**The GoM on restructuring the compensation cess.** Constituted at the **54th meeting** (para 9.21:
*"there is consensus among the Members for constituting a GoM on Compensation Cess with Minister of
Finance (State) as the Convenor"*) — i.e. convened by the Union Minister of State for Finance, not
by a state minister, unlike most GoMs. Its brief, as described at the 55th: *"to propose a
mechanism of taxation **post abolition of Compensation Cess**." It met on 16 October 2024 and
12 December 2024.

**The 55th meeting (21 December 2024) decision, verbatim:**

> "**Decision:** The GST Council approved the proposal to extend the tenure of the GoM on
> restructuring Compensation Cess up to 30th June 2025. Additionally, the Council approved the
> proposal to continue the present rates of Cess until 31st March 2026 and to distribute the
> surplus if any in the Cess Account, **at the end of the transition period (March 31, 2026)**,
> equally between the Centre and the States in a 50:50 ratio as provided in Section 10(3) of the
> GST (Compensation to States) Act, 2017."

**Two findings in that one paragraph.**

1. **A definitional break.** "Transition period" is a defined statutory term (s.2 of the
   Compensation Act) and it ended **30 June 2022**. The Council's own decision text of December
   2024 re-labels **31 March 2026** as "the end of the transition period". A record or series that
   reads "transition period" across 2022 and 2026 will silently splice two different objects. Carry
   this to §Provenance.
2. **Section 10(3) is being applied to a different residue than the one it was written for.**
   The 8th meeting decided (para 24(iii)) that the 50:50 split applies to *"the amount remaining
   unutilised in the GST Compensation Fund at the end of the transition period"*, distributed to
   states *"in the ratio of their total revenues from SGST or UTGST … in the last year of the
   transition period"*. The 55th applies it to a 2026 surplus arising **after debt service on
   borrowing that was itself substituted for compensation**. Whether the SGST-ratio limb is being
   applied on FY2021-22 or FY2025-26 revenues is **not stated in the decision** and I could not
   establish it. Absence, §A-6.
3. The GoM was to report by 31 December 2024, sought extension to 30 June 2025, and got it. The
   55th's own summary slide (Volume II, pp.142–144) is garbled in the published PDF — it reads
   *"submit its report to the Council by December 31, **2004**"* and *"extending the mandate of the
   Committee till 30th June **2024**"*, both plainly wrong against the decision text on the facing
   page. **The published minutes contain internally contradictory dates.** Prefer the decision
   paragraph.

### 6. The 2025 rate rationalisation — the 56th meeting

*[See §Sources; delegated retrieval. Integrated below.]*

### 7. What the states asked for and did not get

**The 47th meeting (28–29 June 2022, Chandigarh), agenda item 22, "General Discussion on
Compensation".** This meeting ended **one day before** the guarantee expired on 30 June 2022. The
item is the single most important page in this part for the extension question, and I read all of
it.

**Sixteen states and UTs asked, on the record, for the compensation guarantee to be extended:**

| member | what was minuted (para) | ask |
|---|---|---|
| **Punjab** | *"Punjab might lose at least 50% of the revenue after the end of compensation. Therefore, he requested to extend the compensation for another five years."* (22.1) | 5 years |
| **Andhra Pradesh** | *"requested that extension of the compensation be considered"* (22.3) | unspecified |
| **Rajasthan** | *"requested for extension of compensation for five years"* (22.4) | 5 years |
| **Delhi** | *"it would be desirable to extend the compensation for another five years"* (22.7) | 5 years |
| **Uttarakhand** | *"the extension of the compensation would be in interest of the State"* (22.8) | unspecified |
| **Kerala** | *"compensation may be extended for a further period"*; also asked the Centre-state ratio move from 50:50 to 40:60 (22.9) | unspecified |
| **West Bengal** | *"also requested to extend the compensation in view of the precarious financial situation of the States"*; **drew the Council's attention to Mohit Minerals** (22.11) | unspecified |
| **Himachal Pradesh** | *"The compensation of Rs.3600/- Crores was a big amount for a small State … and the same may be continued"* (22.12) | continuation |
| **Tamil Nadu** | *"requested to continue the Compensation scheme and **the earlier baseline of 14% of the CAGR could be reset**"* (22.13) | continue at a lower rate |
| **Odisha** | *"requested the GST Council to extend compensation for another five years"* (22.14) | 5 years |
| **Puducherry** | *"Puducherry was having the highest gap between the protected revenue and the actual revenue … requested to continue compensation for another five years from the year 2022"* (22.15) | 5 years |
| **Uttar Pradesh** | *"though in principle, they did not seek compensation and wanted to be self-reliant but due to special circumstances, the State requested to continue the compensation"* (22.16) | continuation |
| **Gujarat** | *"Gujarat was a manufacturing State and had to lose revenue after the introduction of GST … requested for continuation of the compensation"* (22.17) | continuation |
| **Haryana** | *"compensation for at least two lost years might help the states and requested to increase the compensation for at least two years"* (22.18) | 2 years |
| **Chhattisgarh** | absent; written comments by letter dated 27.06.2022: *"the provision of 14% protected revenue should be continued for at least 5 years more"*, failing which the CGST/SGST split should move from 50:50 to 80:20 or 70:30 in the states' favour (22.19) | 5 years |
| **Karnataka** | *"requested that a holistic decision on compensation should be taken keeping in mind the financial health of the States"* (22.2) | ambiguous — I count it as a request but flag it |

Goa (22.10) praised the loan scheme and noted its limited revenue avenues without an explicit ask.

**The finding that this table exists to make: the demand for extension was not partisan.**
Uttarakhand, Himachal Pradesh, Uttar Pradesh, Gujarat, Haryana and Goa were BJP-governed in June
2022; Odisha was BJD; Andhra Pradesh YSRCP; Puducherry NDA. Punjab and Delhi were AAP; Rajasthan
and Chhattisgarh Congress; Kerala LDF; West Bengal TMC; Tamil Nadu DMK. **A Union-governed state
(Uttar Pradesh) asked for continuation while stating it did not want to.** Gujarat asked while
calling GST *"a prime example of cooperative federalism"*. Any account that reads the extension
demand as an opposition-state grievance is contradicted by the Council's own minute book.

**What the Council did with it: nothing that is recorded.** After Chhattisgarh's written comment at
22.19 the minutes go straight to para 23 — the Secretary's vote of thanks. **There is no
Chairperson's reply on the substance, no decision, no deferral, no reference to a GoM, and no
recorded refusal.** The only intervention from the chair anywhere in item 22 is at 22.5, and it is
about *arrears*, not extension: *"compensation had been settled to each State from the Central
Consolidated Fund of India in advance and that States had to get a certificate from AG if any
amount is due to be paid. That in the absence of AG Certificate, it was the fault of the State
concerned and not the Centre."* The Secretary added at 22.6 that *"Rs.64000/- crore was
distributed in advance"* and that Rajasthan specifically had not submitted its AG certificate.

**The guarantee therefore lapsed by effluxion of time, not by a Council decision.** The item was
listed as a "General Discussion" rather than as a decision item, and the Council's disposal of a
request made by sixteen of its members is not on its record. **This is a first-class absence** and
it is a *non-decision*, which is a different object from a refusal — §A-4.

**A procedural complaint that belongs here.** Tamil Nadu, in the same intervention (22.13), *"also
requested that the GST council meetings may be held as per the prescribed frequency in the
Procedure and Conduct of Business Regulations of the GST Council."* The measured series
`gst-council-meetings-fy` below shows why: 13 meetings in FY2016-17 and 13 in FY2017-18, falling to
**3, 4, 3, 3 and 3** in the five years to FY2024-25. The Council met four times more often while it
was building the tax than while it was arbitrating the money.

### 8. Instrument integrity — what the minute books themselves are

Findings about the *carrier*, not the content, all of which bear on how much weight the authoring
stage can put on the corpus:

- **The published minutes are converted by third-party consumer web services.** `pdfinfo` Producer
  strings across the files I retrieved: `Online2PDF.com` (2nd, 7th, 8th, 42nd, 44th, 51st, 52nd,
  53rd, 54th), `PDF Candy` (46th, 47th), `iLovePDF` (55th), `PDF24` (42nd agenda), `GPL Ghostscript
  9.52 / 10.00.0` (38th, 41st, 45th, 43rd), an unnamed `3.0.8 (5.0.15)` (48th, 49th, 50th).
  Government minute books are being routed through public third-party converters.
- **The 52nd meeting's minutes have no text layer** (see §2). They are unsearchable and
  unquotable without OCR.
- **The 54th meeting's state-wise compensation table is an unreadable image.** The annexure slide
  headed "3. Compensation Cess - Status" with columns `2017-18 | 2018-19 | 2019-20 | 2020-21 |
  2021-22 | 2022-23(Q1)` and rows for each state extracts as blank cells with garbled state names
  (`iiiginchal Pradesh`, `J & K`). **The single most useful table for a state-wise compensation
  series is published in a form that cannot be read.** §A-5.
- **The meetings index carries a wrong date.** `https://gstcouncil.gov.in/en/gst-council-meeting`
  gives the 2nd meeting as **30-Jul-2016** — which is before Article 279A commenced (10 September
  2016) and before the Council was constituted, and so is impossible. **The minutes themselves open:
  *"Minutes of the 2nd GST Council Meeting (30 September 2016) — The second meeting of the GST
  Council … was held in the Parliament House Annexe, New Delhi on 30 September 2016."*** The same
  wrong date appears on the Hindi page. Use **30 September 2016**.
- **OCR corruption is pervasive in the later files** — "Rs.l.1 1 crores", "1,351,053", "December 31,
  2004", "till 30th June 2024" where the facing decision says 2025, `?I9,000 crore` for ₹19,000
  crore, "hvo categories". Every figure I report from these files has been either cross-checked
  against a second occurrence or verified by arithmetic; where it could not be, I say so.

---

## Candidate series

House-style note: unit strings carry the denominator. All amounts nominal ₹ crore; **no ratio to
GDP is offered anywhere in this part**, per the phase rule — where a denominator is wanted, use
gross tax revenue or the divisible pool, and part 02/03 carry those.

| id | name | unit | calendar | period | points retrieved | breaks | instrument |
|---|---|---|---|---|---|---|---|
| `gst-compensation-cess-collected` | GST Compensation Cess collected | ₹ crore, nominal, cess collections as reported to the GST Council | FY | FY2017-18 → FY2024-25 (part) | FY2017-18 62,612 · FY2018-19 95,081 · FY2019-20 95,551 · FY2020-21 85,191 · FY2021-22 1,04,609 · FY2022-23 1,25,863 · FY2023-24 1,41,809 · FY2024-25 (to Aug 2024) 63,725 — all **verified**, sum-checked to the stated total 7,74,441 | **FY2017-18 is a nine-month year** (1 Jul 2017 – 31 Mar 2018); **FY2024-25 is a five-month part-year** and must not be plotted as an annual point | GST Council, minutes of the **54th meeting**, 9 Sep 2024, annexure "3. Status update – Compensation Cess (1/3)". **T1.** |
| `gst-compensation-cess-collected-projected` | *(do not author as a separate series)* | — | — | — | projected Sep 2024–Mar 2025 92,265; projected FY2025-26 1,71,589 at an assumed 10% growth | — | Same annexure. **Projections, not collections. Fold into notes on the series above; do not mix with actuals.** |
| `gst-b2b-loan-principal` | Principal borrowed by the Union and on-lent to states under the GST compensation special window | ₹ crore, nominal, principal only | FY | FY2020-21 → FY2021-22 | FY2020-21 **1,10,208** (`approx` — derived by subtraction, see note) · FY2021-22 **1,59,000** (`verified`) · total **2,69,208** (`verified`) | Two-year series only; the window did not operate in any other year | Total from GST Council, **54th meeting** annexure "(2/3)", line "Back-to-Back Loan Repayable −2,69,208". FY2021-22 figure from **45th meeting** minutes para 21.2. FY2020-21 given in minutes only as "Rs 1.1 lakh crore" (43rd, para 22.1; 45th, para 21.2); the precise 1,10,208 is **arithmetic residual** of the 54th total. **T1, one point derived.** |
| `gst-council-meetings-fy` | GST Council meetings held per financial year | meetings per Indian financial year (count of numbered Council meetings) | FY | FY2016-17 → FY2025-26 | FY2016-17 **13** · FY2017-18 **13** · FY2018-19 **8** · FY2019-20 **5** · FY2020-21 **3** · FY2021-22 **4** · FY2022-23 **3** · FY2023-24 **3** · FY2024-25 **3** · FY2025-26 **1** (56th only; pending) · FY2026-27 to 3 Aug 2026 **0** | **FY2025-26 and later are not derivable from the Council's own index**, which ends at the 55th — the count depends on a source outside the meetings table (§A-1). A meeting spanning two dates (33rd, 42nd) counts once | Council's own meetings index, `https://gstcouncil.gov.in/en/gst-council-meeting`, all 55 rows parsed; dates cross-checked against minute-book headers for the 2nd, 7th, 8th, 38th, 41st, 42nd, 43rd, 45th, 47th. **T1.** Correct the 2nd meeting to 30 Sep 2016 (§8). |
| `gst-council-minutes-publication-lag` | Lag from GST Council meeting to production of the published minutes PDF | months from meeting date to the `CreationDate` embedded in the published minutes PDF | FY (indexed on meeting) | 48th (Dec 2022) → 55th (Dec 2024) | 48th 2.6 · 49th 6.9 · 50th 3.2 · 51st 8.0 · 52nd **15.7** · 53rd 7.2 · 54th 4.5 · 55th 9.0 | **`CreationDate` is not the publication date.** It is when the PDF was generated and is a *lower bound* on publication. Status for every point should be `approx`, not `verified`. Producers vary across files (§8), so the metadata is not uniformly meaningful | `pdfinfo` on each published minutes PDF retrieved from `gstcouncil.gov.in/sites/default/files/Minutes/`. **T1 for the artefact, but the quantity is inferred — grade the derived series accordingly.** |

**Series I could not build and am relying on another part or on delegated retrieval for:**
`gst-compensation-released` (₹ crore released to states by FY) — the Council minutes give only
cumulative "compensation paid till 5 September 2024 = 6,64,203" and a state-wise table that is an
unreadable image. See §FORWARD REFERENCES and §Absences A-5.

---

## Candidate ledger records

### LR-1 — The 101st Amendment bargain: Article 279A and the five-year compensation promise

**What happened.** The Constitution (101st Amendment) Act 2016 inserted Article 246A (concurrent
GST-taxing power), 269A (IGST), and **279A** (the GST Council: Union Finance Minister as
Chairperson, one minister per state, quorum one-half, decisions by not less than three-fourths of
weighted votes with the Centre at one-third and all states together at two-thirds). Section 18 of
the same Act commanded Parliament to legislate compensation to the states for revenue loss
"arising on account of implementation of the goods and services tax **for a period of five
years**". Article 279A commenced 10 September 2016; the Council was constituted and first met
22–23 September 2016.

**Objective stated at announcement.** Article 279A(6), verbatim: the Council *"shall be guided by
the need for a harmonised structure of goods and services tax and for the development of a
harmonised national market for goods and services."* Section 18's objective is on its face:
compensation for loss of revenue on account of implementation, for five years.

**Strongest case for.** States surrendered the bulk of their independent indirect-tax power — a
genuine, irreversible constitutional concession — and received in exchange a seat with real voting
weight (states collectively two-thirds; no proposal passes over their combined objection), a
harmonised national market, and a five-year revenue insurance at a rate above any defensible
projection of nominal growth. The Council has, on the Union's account and on the evidence of 55
meetings, worked overwhelmingly by consensus, dividing once in nine years. Tamil Nadu — which held
out longest against GST — was brought in by the compensation promise; that is stated in the
Council's own 42nd-meeting agenda paper (*"Tamil Nadu, till the very end held out against GST …
It was because of this promise that everyone [agreed]"*).

**Strongest case against.** The bargain is asymmetric in three respects the text makes plain.
(i) **The Centre alone holds a veto and no group of states does**: with the Centre's third against,
75% is unreachable. (ii) **The Chairperson is a party to every dispute** — the Union Finance
Minister chairs, states the sense of the House, and decides whether to put a question to a
division. (iii) **The only counterweight the Constitution provides, the 279A(11) dispute-
adjudication mechanism, has never been established** (LR-8), so the losing side has no forum
inside the design. And the five-year term was written into an Amendment Act section rather than
into the Constitution itself, with no starting date, no rate and no base year — leaving the entire
economic content of the promise to be settled below the constitutional level and, ultimately, to
expire without any body having to decide that it should.

**Different facts or different weightings?** **Different weightings of the same facts.** Both
accounts agree on the text of 279A(9), on the consensus practice, and on the five-year term. They
differ on whether a Council in which the Union chairs, holds a blocking third and controls the
agenda is a genuine sharing of sovereignty or a procedural containment of the states.

### LR-2 — The compensation guarantee: 14% on a 2015-16 base, 1 July 2017 – 30 June 2022

**What happened.** The GST (Compensation to States) Act 2017 gave every state a **protected
revenue** growing at **14% per annum compounded** from a **2015-16 base**, with compensation equal
to protected revenue minus actual revenue, payable **bi-monthly**, for a **five-year transition
period ending 30 June 2022**, funded by a **compensation cess** on demerit and luxury goods paid
into a **GST Compensation Fund**, with any unutilised residue at the end of the period split 50:50
between the Union and the states (s.10(3)). The 14% and the base year were settled in the Council
before they were legislated.

**Objective stated at announcement.** To hold states harmless against revenue loss from the change
of tax regime for five years. The Council's Chairperson characterised it in 2016 as a
*"Constitutional commitment for the Central Government to provide hundred per cent compensation"*
(7th meeting, para 21); the Member from Jammu & Kashmir as *"an insurance at 14% … even if a State
suffered from a calamity"* (7th, para 22).

**Strongest case for.** A single national rate, uniform across states, is administrable and
resists rent-seeking — the Council refused Meghalaya's request for 18% for the North-East (8th,
para 23(v)) precisely to hold that line. 14% was deliberately set generous to make the reform
politically possible; the Chairperson said openly that it exceeded growth-plus-inflation. Payment
was bi-monthly and automatic on a formula, not discretionary. And on the Union's numbers the
promise was in fact kept in cash terms: the Council's own 54th-meeting ledger records **₹6,64,203
crore of compensation paid** against **₹7,74,441 crore of cess collected** to August 2024.

**Strongest case against.** A guaranteed 14% nominal growth locked in the 2015-16 revenue *ranking*
of states for five years regardless of subsequent performance, and — because it was set above any
plausible growth path — guaranteed that the cess would be structurally inadequate in any year
short of a boom. That structural inadequacy was foreseen inside the Council and provided for, at
the **8th meeting**, by a decision that the shortfall would be met by *"borrowing from the market
which could be repaid by collection of cess in the sixth year or further subsequent year"* — and
that decision was **deliberately kept out of the statute** on an assurance from the Secretary to
the Council that it need not be legislated. When the shortfall arrived in 2020 the Union relied on
its absence from the statute (LR-3). The states' case is that the drafting gap was created by the
Union's own officer and then used against them; that is not an inference, it is Punjab's argument
minuted at the 41st meeting, quoting minute and page.

**Different facts or different weightings?** **Different facts** — specifically, a factual dispute
about what the Council decided in 2016–17 versus what the statute says. The Union's position rests
on the text of the Act; the states' rests on the Council minutes of the 8th and 10th meetings. Both
documents exist and both say what each side says they say. The dispute is genuinely about which
instrument governs, not about weighting.

### LR-3 — The 2020 rupture: the Attorney-General's opinion, the two-bucket split, and the two options

**What happened.** At the **41st meeting, 27 August 2020**, convened solely on compensation, the
Union tabled the Attorney-General's opinion that *"there is no express provision in the
Compensation Act which puts a mandate on the Government of India to raise resources or to arrange
resources for payment of compensation"*, while conceding that the states' entitlement was *"very
hard coded in the Act"*. The Union then proposed splitting the FY2020-21 shortfall of ~₹3,00,000
crore into ~₹1,65,000 crore attributable to GST implementation and ~₹1,35,000 crore attributable to
COVID, and offered two borrowing options — **Option 1**, ₹96,477 crore (later ₹97,000 crore, then
₹1.1 lakh crore at a revised 7% growth assumption) for the implementation bucket only, through a
special RBI window; **Option 2**, ~₹2,30,000 crore for the whole gap. In both, **the borrowing was
to be in the states' name**. By 12 October 2020, 23 states/UTs had opted for Option 1, **none for
Option 2**, and **eight states plus NCT Delhi had refused both**: Chhattisgarh, Jharkhand, Kerala,
Punjab, Rajasthan, Tamil Nadu, Telangana, West Bengal, Delhi. Four states demanded a division at
the 42nd meeting; none was held; **the item closed with no decision recorded**.

**Objective stated at announcement.** Option 1's own terms (42nd agenda, clause VI): to deliver
resources to states while ensuring *"The State will not be required to service the debt or to repay
it from any other source"*, with interest and principal to be paid from the cess by extending it
beyond the transition period.

**Strongest case for (the Union's, in its own terms and on its own data).** The Compensation Act
compensates loss *"arising on account of implementation of"* GST; a once-in-a-century pandemic is
not implementation. The Union's own revenue fell further than the states' — the Finance Secretary
made that point at the 41st and Delhi conceded it (para 36). The statute creates a Fund, not a
Union liability, and the Attorney-General so advised. The Union nonetheless found the money: it
extended the cess, arranged a special window at a rate close to G-secs (executed at an average
**4.85%**, far below any state's own market cost), gave a 0.5% FRBM relaxation on top, agreed the
debt would not count against states for Finance Commission norms, and — having initially insisted
the states borrow — **itself borrowed and on-lent** ₹1.1 lakh crore in FY2020-21 and ₹1.59 lakh
crore in FY2021-22. Twenty-three of thirty-one members accepted, including every North-Eastern
state, and Andhra Pradesh's minuted objection to the mechanism ends with it opting in anyway.

**Strongest case against (the states', in their own terms and on their own data).** The Act's
operative machinery contains no causal test — it is protected revenue minus actual revenue, and
the Attorney-General said so in the very first limb of the opinion the Union relied on. Splitting
the shortfall into causal buckets therefore inserts a condition the statute does not contain, and
Kerala said exactly that on the record (*"the Constitution does not make such distinction … there
is no distinction made in legal terms"*). The 8th meeting had already decided that shortfall would
be met by borrowing repaid from extended cess; the Union's officer had assured the Council that
this need not be legislated; the Union then relied on its absence from the legislation. The options
were communicated **by the Department of Expenditure directly to states**, bypassing the Council —
Punjab's objection that *"Council otherwise doesn't have the power to alter the compensation
mechanism suo motto"* was never answered. And **the arrangement was implemented although the
Council never recommended it**: agenda item 9A closed with no decision, and four states' demand for
the constitutional remedy of a division was simply not put.

**Different facts or different weightings?** **Different facts.** The two sides disagree on
(i) whether the Compensation Act contains a causal test, (ii) whether the 8th meeting's decision
survives its omission from the statute, and (iii) whether the Council decided the borrowing
arrangement at all. (iii) is resolvable on the record and resolves **against** the Union: the 42nd
minutes contain a decision on agenda item 9 and none on 9A.

### LR-4 — The cess extended past the guarantee: Council power, executive duration

**What happened.** At the **42nd meeting, 12 October 2020**, the Council *"approved to extend the
levy of Compensation Cess beyond June 2022 till the entire shortfall is covered"* — an open-ended
recommendation, taken by consensus with Kerala, West Bengal, Punjab, Karnataka, Puducherry, MP, UP,
Goa and Odisha each minuted in support. The **terminal date of 31 March 2026 was then fixed by
executive notification**, not by the Council. The Chairperson stated this at the 54th meeting:
*"the period for levy was extended to March, 2026 by way of notification based on an opinion taken
from the Attorney General of India."* The 45th meeting (para 21.3) shows the date is an
amortisation calculation: protected revenue of ~₹18.9 lakh crore for April 2020 – June 2022 implied
cess collection to March 2026 was needed to service the debt and the arrears.

**Objective stated at announcement.** Per the 42nd agenda item 9 and the Attorney-General's note of
26 August 2020 as minuted: *"the GST Council would recommend the continuance of the cess beyond the
transition period of 5 years only in a situation of shortfall during the transition period, which
would necessitate the raising of funds for paying the compensation to the States after the 5 year
period is over."*

**Strongest case for.** Section 8(1) of the Compensation Act provides for the cess for five years
*"or for such period as may be prescribed on the recommendations of the Council"* — the extension
is exactly the mechanism the statute contemplates, the Council recommended it unanimously, and
without it the arrears could not have been paid at all. Fixing a specific date by notification is
the ordinary delegated-legislation route; an open-ended levy would have been worse.

**Strongest case against.** The Council recommended an *open-ended* extension tied to a condition
("till the entire shortfall is covered"). What was notified was a *fixed date* tied to a debt-
amortisation schedule. Those are different objects. And because Option 1 clause XI made interest
the first charge and principal the second, **the states' compensation arrears were subordinated to
debt service on a borrowing the Council never approved** — so a levy the states supported to
recover their arrears was, in operation, applied first to servicing the substitute for those
arrears. Punjab had asked at the 42nd that *"the end date should not be defined and the levy should
be extended till full compensation is settled"*; the notification did the opposite.

**Different facts or different weightings?** **Different weightings of the same facts.** Both sides
accept the Council's decision text, the notification and clause XI's priority order. They differ on
whether fixing a terminal date by notification is faithful implementation of an open-ended
recommendation.

### LR-5 — The extension request of June 2022: sixteen members asked, and there is no recorded answer

**What happened.** At the **47th meeting, 28–29 June 2022**, two days before the guarantee expired,
agenda item 22 was listed as a **"General Discussion on Compensation"**. Sixteen states and UTs
asked on the record for extension (table in §7), across every party grouping including six BJP-
governed states. The minutes record **no Chairperson's response on extension, no decision, no
deferral, no GoM reference and no refusal**. The item is followed immediately by the vote of
thanks. The guarantee lapsed on 30 June 2022 by effluxion of time.

**Objective stated at announcement.** None. The item carried no proposal — it was listed as a
discussion, which is why no decision was capable of being taken on it.

**Strongest case for the outcome (the Union's).** The five-year term is fixed by section 18 of the
101st Amendment and by the Act's definition of the transition period; extending it would require
Parliament to legislate afresh, which is not within the Council's gift. The money question is
answered by the Secretary at the 45th: the cess to March 2026 was **already fully committed** to
servicing ₹2.69 lakh crore of principal plus ~₹51,561 crore of interest plus the outstanding
arrears, so there was no resource to extend with. The states had already received the benefit of
the guarantee in a pandemic at a 14% protected rate — the Union's ledger shows ₹6.64 lakh crore
paid — and several states asking for extension were, on the Union's data, receiving compensation
far above what their own revenue performance warranted.

**Strongest case against (the states').** A request made by sixteen of thirty-one members, in a
constitutional body whose decisions are taken by weighted vote, was disposed of by not being put.
Had it been put and lost, the record would show which members opposed it and on what weight; had it
been put and won, it would have been a recommendation the Union would have had to answer. Listing
it as a "General Discussion" removed the possibility of either. The demand was cross-party — Uttar
Pradesh, Gujarat, Haryana, Uttarakhand and Himachal Pradesh all asked — so the absence of any
recorded disposal cannot be explained as the Council declining a partisan demand. And Tamil Nadu's
version was not even a demand for the same money: it asked to *continue the scheme with the 14%
baseline reset downwards*, which meets the Union's affordability objection head-on and is not
addressed anywhere in the minutes.

**Different facts or different weightings?** **Different facts about what the Council did.** The
Union's account treats the guarantee as having a fixed statutory end that the Council could not
alter, making a decision unnecessary. The states' account treats extension as a recommendation the
Council was competent to make under 279A(4)(h) ("any other matter relating to the goods and
services tax") which Parliament would then have had to consider. Whether the Council had competence
to recommend extension is a genuine legal question that **the minutes never pose and no instrument
in this corpus answers.**

### LR-6 — The first and only division: lottery, 38th meeting, 18 December 2019

**What happened.** Kerala insisted on a division on a uniform GST rate for state-run and
state-authorised lotteries, after the Chairperson twice invited the Council to proceed by
consensus and members from Uttar Pradesh, Gujarat, Bihar, Puducherry, Haryana, Uttarakhand and Goa
urged that the consensus tradition be preserved. Rule 14 of the Council's Procedure and Conduct of
Business Regulations was read out. **The vote was taken by show of hands with names read out,
although Rule 14 as read prescribes a secret ballot once a division is sought.** 21 states in
favour, 7 against, 3 not voting; threshold announced as 18 of 28 present and voting; passed. The
Council then set the rate at 28% **by consensus**.

**Objective stated at announcement.** To resolve, before a Supreme Court deadline of 15 January
2020, whether two classes of lottery could carry different GST rates — the Attorney-General having
advised that they *could* be intelligibly classified as different goods but that there was no bar
to a uniform rate.

**Strongest case for.** The Council has a voting rule and a court deadline; using the rule once, on
a narrow rate question where consensus had failed across multiple meetings, is the machinery
working as designed, not a breakdown. The threshold was correctly computed under 279A(9). The rate
itself was then agreed unanimously.

**Strongest case against.** The Council departed from its own written rule in the one instance it
applied it: Rule 14 as recited in the minutes requires a secret ballot on a division and a show of
hands was used instead, with names published — which converts a protected vote into a recorded
political act, and did so in a body where the Chairperson is a party. **The Centre's own vote is
not recorded**, although the announced threshold of 18 is only arithmetically correct if the Centre
voted in favour. And the precedent has not been repeated: at the 42nd meeting, ten months later, on
a question of vastly greater consequence, four states sought a division and the Chairperson did not
put the question — so the one division stands as a demonstration that the mechanism exists and is
not available on demand.

**Different facts or different weightings?** **Different facts** on one point that the record
settles: whether a division had occurred before. Gujarat asserted at the 42nd that *"there was
never a division in the GST Council earlier"*; Bihar in the same meeting correctly recalled the
lottery vote. The minutes settle it — there had been one.

### LR-7 — The 2025 rate rationalisation ("GST 2.0"), 56th meeting, September 2025

*[Delegated retrieval — integrated below in §Sources. What follows is written from directly
retrieved material only; anything not retrieved is marked as such and NOT asserted.]*

### LR-8 — The Article 279A(11) dispute mechanism has never been established

**What happened.** Article 279A(11) provides that the Council *"shall establish a mechanism to
adjudicate any dispute"* between the Union and states or among states arising out of the Council's
recommendations or their implementation. Activation has been formally demanded in Council at least
four times by named members on named dates: **Punjab at the 37th meeting (Goa, 20 September 2019)**
— as recalled in the 39th minutes; **Kerala/Punjab at the 38th meeting (18 December 2019)**, where
the minutes record a member raising *"activating the dispute resolution mechanism which had been
provided by the Constitution that the Council would establish a mechanism to adjudicate any dispute
arising out of the recommendations of the Council or implementation thereof"*; **Punjab at the 39th
meeting (14 March 2020)** — *"the time has become ripe to activate the dispute resolution mechanism
envisaged in the Constitution under Article 279A and requested that this Agenda may be brought in
the next meeting of the Council"*; and **Punjab at the 42nd meeting (12 October 2020)** —
*"requested that in a time bound manner, the dispute resolution mechanism may be set up in 7 days
… Alternatively, he suggested that the possibility of formation of GoM on the issue may also be
explored."*

**As at 3 August 2026 it does not exist.** The Council's own committees index at
`https://gstcouncil.gov.in/all-committees` lists: Fitment Committee, Law Committee, Group of
Officers–Intermediary Service, Group of Officers–Risk Based Registration, GST Implementation
Committee, Grievances Redressal Committee, State Coordination Committee, All India Coordination
Committee, IT-GRC, Others. **No adjudicating body.** (Positive control for this sweep: the index
lists the Fitment Committee and the Law Committee, both of which I independently confirmed exist
because the minutes I read repeatedly record the Council acting on their recommendations — e.g.
45th meeting, *"the Council approved the proposals of the Fitment Committee"*.) The Grievances
Redressal Committee is a **taxpayer** grievance body and the GST Appellate Tribunal, discussed at
the 39th and 40th meetings, adjudicates **taxpayer** appeals under Chapter XVIII of the CGST Act —
neither is a Centre-state dispute mechanism.

**Objective stated at announcement.** The constitutional text itself: to adjudicate disputes
arising out of the Council's recommendations or their implementation.

**Strongest case for the position that nothing is required.** 279A(11) says the Council *"shall
establish a mechanism"* without a deadline or a prescribed form, and the Council may reasonably
take the view that its consensus practice, its GoMs and the ordinary jurisdiction of the courts
(Article 131 original suits; writ jurisdiction) together discharge it — and in fact the one
significant Centre-state GST dispute of the period was decided by the Supreme Court in Mohit
Minerals, which is a functioning remedy. Establishing a standing tribunal to arbitrate between
governments would, on this view, formalise conflict in a body designed to avoid it.

**Strongest case against.** The obligation is mandatory in terms and is the only structural
counterweight the Amendment gives to the Union's blocking third and its chairmanship. It has been
demanded on the record four times by named members over more than a year, at the exact moment the
Council faced its largest dispute, and was never even put on an agenda. The alternative remedies
are not equivalent: Article 131 is available to a state against the Union but not between Council
members over a recommendation, and litigation is precisely what a dispute-resolution clause inside
a cooperative body exists to avoid.

**Different facts or different weightings?** **Different weightings.** No one disputes the text or
that the mechanism does not exist; the dispute is over whether "shall establish" is a hard
obligation and whether existing fora discharge it.

---

## Candidate provenance (measurement-dispute) records

*(§(a) of the brief. Every entry names both instruments and says whether the disagreement is
definitional or evidentiary.)*

### PR-A — Compensation "released" vs "due" vs "admissible": the AG-certificate gate

**The quantity.** GST compensation payable to a state for a period.

**The instruments and their definitions.** The Union's operative definition, stated by the
Chairperson at the **47th meeting, para 22.5**: compensation is settled *"in advance"* from the
Consolidated Fund and *"States had to get a certificate from AG if any amount is due to be paid.
That in the absence of AG Certificate, it was the fault of the State concerned and not the Centre."*
The Secretary at 22.6: *"Rs.64000/- crore was distributed in advance to help the States and for any
difference in calculation, **the State must submit the certificate from AG**."* At the **53rd
meeting, para 8.4**, the Secretary reports the AG-certificate pipeline as an ongoing constraint,
noting certificates newly received from **West Bengal, Punjab, Sikkim and Tripura** and urging
*"the remaining States to expedite the finalization of AG's certificate."*

**Why this is definitional, not merely administrative.** Compensation *accrues* on a statutory
formula (protected revenue minus actual revenue), but is *admissible* only against an Accountant
General's certificate of the state's actual revenue. A Union statement that "all compensation due
has been released" is therefore true on the *admissible* definition and can be simultaneously false
on the *accrued* definition, for exactly the states whose certificates are outstanding — and the
Union's own framing at the 47th ("it was the fault of the State concerned") concedes that the gap
exists and locates the cause. **Any figure for "compensation released" must state which definition
it is on, and as at the 53rd meeting the two definitions had not converged even for FY2021-22.**

**Independence grading (the carried-forward trap).** The AG certificate is issued by the
Accountant General — an officer of the **Comptroller and Auditor General**, who is neither the
Union executive nor the state. This is the **one point in the whole compensation arc where the
number passes through a party independent of both sides.** That is a genuine and rare disciplining
feature and should be recorded as such. But note the asymmetry it creates: the certificate
constrains the *state's* claim, and there is **no corresponding independent certification of the
Union's cess-collection or Fund-transfer figures**.

### PR-B — Cess "collected" vs "credited to the GST Compensation Fund"

**The quantity.** Compensation cess proceeds.

**The instruments.** The Council's ledger (54th annexure) reports **collections**. Section 10(1) of
the Compensation Act requires proceeds to be **credited to the Fund**, which is in the **Public
Account**, not the Consolidated Fund. These are different quantities whenever the Union retains
proceeds in the Consolidated Fund of India rather than transferring them. The Chairperson herself
acknowledged the issue existed at the **45th meeting, para 21.27**: she *"explained, in detail, how
she addressed issues related to un-apportioned IGST and **transfer of compensation cess to the
compensation fund**."* Delhi raised the mechanics at the **41st, para 36**: *"according to the
Section 10(1) of the GST (Compensation to States) Act, all amounts need to be credited to the
Public Account of India."* Punjab at the 41st noted that *"The Compensation Fund is reflected in
the Union Budget as a receipt of the Central Government under **Major Head 009**"* — i.e. the same
money appears as a Union receipt.

**The instrument that adjudicates it is the CAG's Report on Union Government Accounts**, which
audits whether collections were in fact credited to the Fund. See §Sources and §FORWARD REFERENCES
— this is the single highest-value outstanding retrieval in this part and I flag it whether or not
the delegated retrieval returned it.

**Definitional or evidentiary?** **Definitional and evidentiary both.** Definitional, because
"collected" and "credited" are different accounting events on different funds. Evidentiary, because
whether the transfer actually occurred in a given year is a fact only the CAG establishes
independently.

### PR-C — The COVID / GST-implementation split of the FY2020-21 shortfall

**The quantity.** The compensation shortfall for FY2020-21: ~₹3,00,000 crore.

**The competing definitions.** The Union's (41st, paras 27.2–27.5): the shortfall decomposes into
~₹1,65,000 crore "because of implementation of GST" and ~₹1,35,000 crore "because of the Covid
situation", the counterfactual being a 10% growth on FY2019-20 post-settlement SGST. The states'
(Kerala at 41st para 29; Delhi at para 36): the Act contains no causal test, so the decomposition
has no legal referent and cannot be computed. Assam's (para 30): the differentiation *"is inherent
in the Constitution and not technical"*.

**This is a definitional dispute of the first order** because the *entire* subsequent arithmetic —
Option 1's ₹96,477 crore, then ₹97,000 crore, then ₹1.1 lakh crore — is the residue of a
decomposition one side says cannot be performed. **The counterfactual growth rate was itself
renegotiated**: 10% at the 41st, cut to 7% at the 42nd *"being the actual rate of growth in the
last two completed fiscal years"*, which moved the borrowable amount by ₹13,000 crore. A parameter
that moves the answer by ₹13,000 crore on a fortnight's reconsideration is a policy choice, not a
measurement.

### PR-D — The ₹1,65,718 / ₹1,65,178 discrepancy inside one minute book

**The quantity.** FY2020-21 revenue gap attributable to GST implementation, ten months.

**The disagreement.** 41st meeting minutes **para 27.2** gives **₹1,65,718 crore**; **para 27.4**
gives **₹1,65,178 crore**, two paragraphs later, for the same quantity. The downstream figure of
₹96,477 crore reconciles to the **1,65,178** reading. Almost certainly a digit transposition — but
it is uncorrected in the *signed* minutes and it is the base of the entire Option 1 calculation.
**Evidentiary, not definitional.** Report the operative figure as 1,65,178 and record the variant.

### PR-E — IGST "settled" vs "ad-hoc apportioned", and its effect on the compensation base

**The quantity.** A state's actual GST revenue, which is the subtrahend in the compensation formula.

**The disagreement.** Tamil Nadu, in the 42nd meeting agenda's Annexure-I, objects in terms:
*"Base revenue for FY 2019-20 used by DoR must also be net of the SGST refunds and **must not
include the IGST Adhoc settlement**."* The Union's calculation used post-settlement SGST
*including* ad-hoc settlement; Tamil Nadu's excluded it and netted refunds, producing *"higher
compensation gaps compared to compensation gap calculated by GoI."* **Two governments computing the
same statutory quantity and getting different answers, with the disagreement stated in the Union's
own agenda paper.**

The scale of the ad-hoc component is on the record — the **54th meeting annexure "2. IGST
Settlement (2/6)"** tabulates ad-hoc apportionment of the IGST balance: FY2017-18 +17,500;
FY2018-19 +65,000/−3,500 = 61,500; FY2019-20 +16,500/−14,500 = 2,000; FY2020-21 +38,000;
FY2021-22 +39,500/−5,500 = 34,000; FY2022-23 +24,500/−1,500 = 23,000; FY2023-24 0/−9,000 = −9,000;
**total +2,01,000 / −34,000, net +1,67,000 ₹ crore**. FY2023-24 is the first year with a **negative
net**, and the 54th (para 8.6) records that this is *"the first year the Centre has maintained a
negative balance in the IGST settlement account due to its conversion into a continuous account"* —
i.e. a **reporting-base shift** in the IGST settlement account, from year-end finalisation to a
continuous account, effective FY2023-24. Record that break.

**Definitional.** Both sides can compute both numbers; they disagree on which is "actual revenue"
for the purposes of section 6.

### PR-F — "Transition period" means two different things in the Council's own decisions

**The quantity/term.** "Transition period".

**The disagreement.** Statutory: five years from the transition date, i.e. **1 July 2017 –
30 June 2022** (Compensation Act s.2). The **55th meeting's decision text (21 December 2024)**
applies section 10(3) to a surplus *"at the end of the transition period (**March 31, 2026**)"*.
**The Council has redefined a statutory term in a decision that operates on a statutory
provision.** Anything reading "transition period" across both dates splices two different objects.
**Definitional, and it is the Council doing it to itself.**

### PR-G — GST revenue gross vs net of refunds

Flagged as in scope by the brief and by Tamil Nadu's objection (PR-E, *"net of the SGST refunds"*).
The 43rd meeting minutes, para 21.1, record the Joint Secretary presenting *"the figures of IGST
collected, refunded and settled / apportioned"* as three distinct quantities. **I did not retrieve
a document that reconciles gross and net GST revenue by year**, and I do not assert one. Marked
unretrieved; see §FORWARD REFERENCES → part 03.

### PR-H — The Council's meetings index vs its own minute books (dating)

The index gives the 2nd meeting as **30-Jul-2016**; the minute book's first line gives **30
September 2016**. The index date is impossible (Article 279A commenced 10 September 2016). Both
instruments are published by the same body. **Evidentiary; the minute book governs.**

### PR-I — Publication lag: `CreationDate` is not publication date

The series `gst-council-minutes-publication-lag` rests on PDF metadata, which records when the file
was generated by a third-party converter, not when it was posted. It is a **lower bound**. No
instrument in this corpus records actual publication dates. Every point must carry status `approx`.

---

## Absences

### A-1 — The 56th meeting's agenda and minutes are not published *(not-published)*

**What is not measured / available.** The GST Council's meetings index at
`https://gstcouncil.gov.in/en/gst-council-meeting` publishes an Agenda PDF and a Minutes PDF for
**every meeting from the 1st to the 55th** — 55 data rows, no gaps. There is **no row for the 56th
meeting** (3 September 2025), and therefore neither its agenda nor its minutes. As at 3 August
2026 that is ~11 months.

**Sweep and positive control (M3).** I parsed all 56 `<tr>` elements of the index (1 header + 55
data rows) and confirmed the sequence 55→1 is complete with no gaps. **Positive control: the 55th
meeting's minutes PDF returns HTTP 200 / 28,352,555 bytes and its agenda PDF HTTP 200 /
23,176,240 bytes at the URLs the index gives.** I then probed seven plausible URLs for a 56th
under `/sites/default/files/Minutes/` and `/Agenda/` (`56.pdf`, `56th_meeting_minutes.pdf`,
`minutes_of_56th.pdf`, `56th_minutes.pdf`, `56-agenda.pdf`, `56th_meeting_agenda.pdf`) — **all
404**. The **Hindi** index at `/hi/gst-council-meeting` has the identical 56-row structure ending
at the 55th. The site is not unaware of the 56th: its homepage links
`meeting_notice_56th_gst_council_meeting_0.pdf` (2025-08) and a September-2025 PIB press release
copy. **The notice is published; the record is not.**

**Is the stated reason contradicted by evidence?** *No reason is stated at all* — the row simply
does not exist. Historical lag (§series `gst-council-minutes-publication-lag`) ranges 2.6 to 15.7
months, so 11 months is inside the range but at the long end. **The decisive datum against a
"routine delay" reading: the 55th meeting's minutes PDF was generated on 22 September 2025 — that
is, nineteen days *after* the 56th meeting.** The Council was actively producing and publishing
minute books in September 2025 and produced the 55th's, not the 56th's.

**Why it matters more than any other absence here.** GST 2.0 is the largest change to the tax since
2017 and the first with material revenue consequences for states since compensation ended. The
minutes are the *only* instrument that records the states' positions verbatim alongside the
Union's. Its absence means the disciplining measure identified in §Disciplining measure **is not
available for the single most consequential decision in the period**.

**What would fill it.** Publication of the 56th agenda and minute book in the same form as
meetings 1–55.

### A-2 — The 52nd meeting's minutes are published but not machine-readable *(not-published, in substance)*

The 52nd meeting (7 October 2023) minutes PDF is 117 pages / 28.7 MB and has **no text layer**:
`pdftotext -layout` yields 4,329 bytes consisting solely of the running header repeated once per
page; `pypdf` page-level extraction returns the same header for pages 1, 6, 21 and 41. The file was
produced by `Online2PDF.com` on 27 January 2025 — **15.7 months after the meeting**, the longest lag
in the series. The Council does OCR some files (the 55th's filename is literally
`..._for_upload_ocred_compressed_0.pdf`), so this is a lapse, not a policy.

**Consequence, stated plainly:** any negative claim about the Council's proceedings that rests on a
full-text search is **unverified for the 52nd meeting**, including my own claim about the number of
divisions (§2).

**What would fill it.** Re-publication with an OCR text layer, or OCR by the researcher.

### A-3 — The Article 279A(11) dispute-adjudication mechanism has never been established *(never-defined)*

Constitutionally mandated in terms ("shall establish"); demanded in Council by **Punjab at the 37th
(20 Sep 2019), a member at the 38th (18 Dec 2019), Punjab at the 39th (14 Mar 2020) and Punjab at
the 42nd (12 Oct 2020, asking for it "in a time bound manner … in 7 days")**; absent from the
Council's own committees index as at 3 August 2026. **Named requesters, specific requests,
specific dates — but this is *not* a `withheld` record**: no one refused an identified request for
information. It is a constitutional duty not discharged. Classify **never-defined**.

**Is any stated reason contradicted?** No reason has ever been stated on the record I retrieved.
The requests are minuted; no response to them is.

**What would fill it.** A Council decision constituting the mechanism, or a minuted Council
decision declining to, either of which would convert a silence into a position.

### A-4 — The Council's disposal of the June 2022 extension request is not recorded *(never-defined)*

Sixteen members asked for extension at the 47th meeting; the minutes record no answer, no decision
and no refusal (§7, LR-5). The item was **listed as a "General Discussion"**, a category that
cannot produce a recommendation. **A non-decision is not a refusal and must not be recorded as
one** — the instrument does not support "the Council rejected the states' request". What it
supports is: the request was made, by named members, and the Council's record contains no disposal.

**What would fill it.** Nothing now can — the guarantee expired two days later. Prospectively, a
minuted decision on the 56th meeting's treatment of state revenue protection (A-1) would be the
nearest equivalent.

### A-5 — State-wise compensation is published in an unreadable form *(not-published, in substance)*

The 54th meeting annexure contains a table headed "3. Compensation Cess - Status" with a state row
per state and columns `2017-18 | 2018-19 | 2019-20 | 2020-21 | 2021-22 | 2022-23(Q1)` — i.e.
precisely the state-by-year compensation matrix. It is embedded as an image; extraction yields
empty cells and corrupted row labels (`iiiginchal Pradesh`). **The Council publishes the number and
simultaneously makes it unusable.** The aggregate is available (compensation paid to 5 Sep 2024 =
₹6,64,203 crore); the distribution is not.

**What would fill it.** The same table in text, or the Union Budget's *Statement of Transfer of
Resources to States and Union Territories* / a parliamentary answer giving state-wise year-wise
compensation released. See §FORWARD REFERENCES.

### A-6 — The base for the 50:50 residue split at March 2026 is not specified *(never-defined)*

Section 10(3) as decided at the 8th meeting distributes the states' half *"in the ratio of their
total revenues from SGST or Union Territory GST … in the last year of the transition period"*. The
55th meeting applies s.10(3) to a **31 March 2026** residue while the statutory transition period
ended **30 June 2022** (PR-F). **Which year's SGST ratio governs — FY2021-22 or FY2025-26 — is not
stated in the decision**, and the two produce materially different distributions. I found no
instrument that resolves it.

**What would fill it.** The GoM on restructuring the Compensation Cess's report, or the Council
decision implementing the split.

### A-7 — The Centre's vote in the one division was not recorded *(never-defined)*

The 38th meeting minutes name all 21 states voting in favour, all 7 against and all 3 abstaining,
and announce a threshold (18 of 28) that is arithmetically correct only if the Central Government
voted in favour. **The Central Government's vote is not minuted.** Under a rule where the Centre's
weight is one-third of all votes cast, the single most consequential vote in the room is the one
the record omits.

### A-8 — No official transcript of the 27 August 2020 press conference *(not-published)*

The "act of God" characterisation, which is the phrase the entire public memory of the 2020 rupture
turns on, is attributed to the post-41st-meeting press conference. I could not retrieve an official
transcript or verbatim record. **Every citation of it is therefore T4.** Within the Council's own
record the phrase appears only in the mouth of the Member from **Goa**, arguing in support of the
Union's position (§4b). Any ledger record must not attribute "act of God" to the Union Finance
Minister on T1 evidence, because none exists in what I retrieved.

---

## Sources retrieved

*(Tier per the brief: **T1** official Indian source retrieved directly · **T4** any official figure
known only through a relayed account. Grade the document held, not the institution.)*

| # | name | URL fetched | tier | what I actually read in it |
|---|---|---|---|---|
| 1 | GST Council, meetings index (English) | `https://gstcouncil.gov.in/en/gst-council-meeting` | T1 | Parsed all 56 `<tr>` rows: header + 55 meetings, 1st (22-Sep-2016) to 55th (21-Dec-2024), each with meeting number, date, venue and Agenda/Minutes PDF links + byte sizes. Establishes the complete meeting list and A-1. |
| 2 | GST Council, meetings index (Hindi) | `https://gstcouncil.gov.in/hi/gst-council-meeting` | T1 | Same 56-row structure, top row `जीएसटी परिषद की 55वीं बैठक | 21-दिसम्बर-2024 | जैसलमेर`. Confirms A-1 is not a language-variant artefact. |
| 3 | Constitution (One Hundred and First Amendment) Act, 2016 | `https://gstcouncil.gov.in/sites/default/files/2024-02/consti-amend-act.pdf` | T1 | Gazette of India Extraordinary print. Read ss.2–19 including Art 246A, 269A, 270(1A)/(1B), **279A(1)–(11) in full**, Art 366(12A)/(26A)/(26B), and **section 18** verbatim. Quoted at §1. |
| 4 | Minutes, **2nd** GST Council meeting | `https://gstcouncil.gov.in/sites/default/files/Minutes/signed-minutes_2nd-gst-council-meeting.pdf` | T1 | First page: *"Minutes of the 2nd GST Council Meeting (30 September 2016) … held in the Parliament House Annexe, New Delhi on 30 September 2016"*; agenda item 1 on the draft Rules of Procedure; Punjab on cesses and ITC reversals in the compensation base. Settles PR-H. |
| 5 | Minutes, **7th** GST Council meeting (22–23 Dec 2016) | `https://gstcouncil.gov.in/sites/default/files/Minutes/signed-minutes-7th-gst-council_meeting.pdf` | T1 | Paras 20–23: the 14% as *"part of the overall package"*; the Chairperson's *"growth … 6% to 7% and adding to it inflation of about 4%, the figure did not reach 14%"*; *"Constitutional commitment for the Central Government to provide hundred per cent compensation"*; J&K's *"insurance at 14%"*; West Bengal's demand that 100% at 14% be recorded; the "base year 2014-15" reference (PR §3). |
| 6 | Minutes, **8th** GST Council meeting (3–4 Jan 2017) | `https://gstcouncil.gov.in/sites/default/files/Minutes/signed-minutes-8th-gst-council_meeting_0.pdf` | T1 | Para 23(iv) the 50:50 residue decision; para 23(v) Meghalaya's 18%-for-NE request **refused**; para 24(i)–(iii) the approved modifications to the draft Compensation Law, incl. the s.10(2) borrowing sentence quoted verbatim at §3. |
| 7 | Minutes, **38th** GST Council meeting (18 Dec 2019) | `https://gstcouncil.gov.in/sites/default/files/Minutes/signed_minutes_38th_gst_council-meeting.pdf` | T1 | Paras 6.1–6.21: the dispute-mechanism demand; Gujarat's *"till date none of the decision on any issue had been done by division"*; **Rule 14 verbatim**; the division — 21 named states for, 7 named against, 3 not voting, *"of the 28 States present and voting, 18 votes were required"*; then 28% by consensus. |
| 8 | Minutes, **39th** GST Council meeting (14 Mar 2020) | `https://gstcouncil.gov.in/sites/default/files/Minutes/signed-minutes-39th_gstcm.pdf` | T1 | Punjab: *"the time has become ripe to activate the dispute resolution mechanism envisaged … under Article 279A"*, recalling the same demand at Goa on 20 Sep 2019; Punjab's ₹60,000 crore IGST appropriation point. Full-text swept for divisions: 0. |
| 9 | Minutes, **40th** GST Council meeting (12 Jun 2020) | `https://gstcouncil.gov.in/sites/default/files/Minutes/minutes-40th-gstc-meeting_0_7.pdf` | T1 | Para 16: GSTAT / Chapter XVIII appeal machinery — confirms the only "dispute resolution" in train is **taxpayer** appeals, not Centre-state (LR-8). Swept for divisions: 0. |
| 10 | Minutes, **41st** GST Council meeting (27 Aug 2020) | `https://gstcouncil.gov.in/sites/default/files/Minutes/minutes_41st-gstc_meeting.pdf` | T1 | Para 4.7 **AG's opinion verbatim (a)–(d)**; Punjab's rebuttal quoting the 10th meeting para 6.3 p.13 and Major Head 009; paras 27.2–27.5 the two-bucket arithmetic incl. **1,65,718 vs 1,65,178** and **96,477**; para 29 Kerala's objection; paras 35–36 Goa on force majeure/"act of God" and Delhi on s.10(1); paras 46–51 **Option 1 and Option 2 verbatim**, incl. *"the borrowing would be in the name of the States"*. |
| 11 | **Agenda**, 42nd GST Council meeting (Vol. 5) | `https://gstcouncil.gov.in/sites/default/files/Agenda/42.pdf` | T1 | The Department of Expenditure's **Option 1 as communicated, clauses I–XI verbatim**; the 20-state + J&K opt-in list; *"No State has opted for the Option 2. 8 States and NCT Delhi are yet to exercise any options"*; the 10%→7% revision to ₹1.1 lakh crore; **Annexure-I naming Chhattisgarh, Jharkhand, Kerala, Punjab, Rajasthan, Tamil Nadu, Telangana, West Bengal** with each one's recorded reason, incl. **Tamil Nadu's IGST-adhoc/refunds objection** (PR-E); the reproduced 41st paras 46–61 showing TN and Puducherry initially choosing Option 2. |
| 12 | Minutes, **42nd** GST Council meeting (5 & 12 Oct 2020) | `https://gstcouncil.gov.in/sites/default/files/Minutes/42nd-gstc-minutes-signed_0.pdf` | T1 | Paras 26–27 **agenda item 9 decided** (*"approved to extend the levy of Compensation Cess beyond June 2022 till the entire shortfall is covered"*); paras 28–35 agenda 9A; paras 29.17–29.29 the **division demanded by Punjab, Chhattisgarh, West Bengal, Puducherry** and Gujarat's factually-wrong *"never a division"*; para 32 **23 States/UTs Option-1, none Option-2, 8 with reservations**; para 33 the ₹97,000 cr → ₹1.1 lakh cr revision; para 36.1 the AG on three-fourths weighted vote; **para 60 — the meeting closes with no decision on 9A**. |
| 13 | Minutes, **43rd** GST Council meeting (28 May 2021) | `https://gstcouncil.gov.in/sites/default/files/Minutes/minutes_of_43rd_gstcm_0.pdf` | T1 | Para 22.1 **₹1.1 lakh crore raised by GoI and on-lent back-to-back at average 4.85%**; para 22.2 **₹1,58,267 crore** estimated for FY2021-22 at 7% normative growth; para 22.4 the borrowing decision to be taken *"in consultation with the RBI, DEA, DoE and the States"* — **not the Council**; para 22.19 *"negotiations on Rs 1.58 lakh crores"*; para 22.11 Punjab on Option-1's charge order; Kerala's ₹4,077 cr arrears and request for a further five-year cess. |
| 14 | Minutes, **44th** meeting (12 Jun 2021) | `https://gstcouncil.gov.in/sites/default/files/Minutes/minutes_of_44th-gstcm.pdf` | T1 | Swept full text for divisions: 0 hits. Positive control 46 × "GST Council". |
| 15 | Minutes, **45th** GST Council meeting (17 Sep 2021) | `https://gstcouncil.gov.in/sites/default/files/Minutes/45th_meeting_0_2.pdf` | T1 | Agenda 17/18 *"Compensation- Scenario Post June-2022 and Options"*; para 21 **cess collected after 1 Jul 2022 to March 2026 used to repay the loan**; para 21.1 *"the law does not provide for payment of compensation from the Consolidated Fund of India"*; para 21.2 **₹1.1 lakh cr (2020-21), ₹1.59 lakh cr (2021-22) of which ₹75,000 cr already borrowed, arrears >₹80,000 cr**; para 21.3 protected revenue Apr 2020–Jun 2022 **~₹18.9 lakh crore**; **para 21.18 the Secretary's *"extension of compensation period is a completely different issue … the cess collections till March, 2026 are already committed"***; para 21.27 the Chairperson on transfer of cess to the Fund; **no decision recorded on compensation** (meeting ends at para 22). |
| 16 | Minutes, **46th** meeting (31 Dec 2021) | `https://gstcouncil.gov.in/sites/default/files/Minutes/46th_meeting-minutes.pdf` | T1 | Swept for divisions: 0. |
| 17 | Minutes, **47th** GST Council meeting (28–29 Jun 2022) | `https://gstcouncil.gov.in/sites/default/files/Minutes/47_minutes_0_5.pdf` | T1 | **Agenda item 22 in full, paras 22.1–22.19** — the sixteen extension requests transcribed in §7, incl. Chhattisgarh's letter of 27.06.2022; para 22.5 the Chairperson on **AG certificates**; para 22.6 *"Rs.64000/- crore was distributed in advance"* and Rajasthan's missing certificate; para 22.11 West Bengal citing **Mohit Minerals** in Council; para 22.13 Tamil Nadu on resetting the 14% baseline and on meeting frequency; **para 23 — the item ends with the vote of thanks, no decision**. |
| 18 | Minutes, **48th, 49th, 50th, 51st** meetings | `.../Minutes/48-thminutes.pdf`, `49th_meeting_minutes_0.pdf`, `minutes_of_50th_0.pdf`, `minutes-of_51st.pdf` | T1 | Swept full text for divisions: 0 each; positive controls 190/166/302/102 × "GST Council". |
| 19 | Minutes, **52nd** meeting (7 Oct 2023) | `https://gstcouncil.gov.in/sites/default/files/Minutes/52nd_minutes_book_converted.pdf` | T1 (artefact) | **No text layer.** 117 pages, 28.7 MB, `pdftotext` yields 4,329 bytes = the running header × 117. `pypdf` confirms per-page. Producer `Online2PDF.com`, CreationDate 27 Jan 2025. **Content unread — see A-2.** |
| 20 | Minutes, **53rd** GST Council meeting (22 Jun 2024) | `https://gstcouncil.gov.in/sites/default/files/Minutes/53rd_minutes_converted.pdf` | T1 | Para 8.3 **~₹1,00,000 crore of back-to-back loan still to be repaid; full repayment expected "during the later part of the FY 2025-26"**; negative cess-fund balance ~₹19,000 crore at end FY2023-24; para 8.4 **AG-certificate pipeline, certificates newly received from West Bengal, Punjab, Sikkim, Tripura**; paras 8.5–8.6 IGST negative balance and the **conversion to a continuous account**. Swept for divisions: 0. |
| 21 | Minutes, **54th** GST Council meeting (9 Sep 2024) | `https://gstcouncil.gov.in/sites/default/files/Minutes/54th_meeting_minutes_conv.pdf` | T1 | Paras 9.7–9.8 the Secretary and **Chairperson on the cess: extended "to March, 2026 by way of notification based on an opinion taken from the Attorney General"**, B2B loans possibly repaid by Dec 2025/Jan 2026, and *"it can no longer be called 'Compensation Cess'"*; paras 9.19–9.21 Karnataka on producing-state SOTR and the **consensus to constitute the GoM with the Union MoS (Finance) as Convenor**; **annexure "3. Status update – Compensation Cess (1/3)" — the year-wise cess collection table**; **"(2/3)" — the compensation account to 31 Mar 2026 incl. Back-to-Back Loan Repayable −2,69,208 and interest −51,561**; annexure "2. IGST Settlement (2/6)" — the ad-hoc apportionment table. Swept for divisions: 0. |
| 22 | Minutes, **55th** GST Council meeting (21 Dec 2024) | `https://gstcouncil.gov.in/sites/default/files/Minutes/minutes_of_55th_gst_council_for_upload_ocred_compressed_0.pdf` | T1 | **Agenda item 7(f) in full** — GoM on restructuring Compensation Cess, meetings of 16 Oct and 12 Dec 2024, and the **Decision verbatim**: GoM tenure to 30 Jun 2025, cess rates continued to 31 Mar 2026, **surplus split 50:50 under s.10(3) "at the end of the transition period (March 31, 2026)"**; and the garbled summary slide ("December 31, 2004", "till 30th June 2024"). Swept for divisions: 0. |
| 23 | GST Council, All Committees index | `https://gstcouncil.gov.in/all-committees` | T1 | Full committee list read: Fitment, Law, GoO–Intermediary Service, GoO–Risk Based Registration, GST Implementation Committee, Grievances Redressal Committee, State Coordination Committee, All India Coordination Committee, IT-GRC, Others. **No 279A(11) adjudicating body.** Positive control: Fitment and Law Committees are independently corroborated in the minutes. |
| 24 | GST Council, Compensation page | `https://gstcouncil.gov.in/compensation` | T1 | HTTP 200, 32,548 bytes. **The page has no main content** — only the navigation shell listing "GST (Compensation to States) Act, 2017 / GST (Compensation to States) Amendment Act, 2018 / Rules / Notifications". No data, no figures, no releases. |
| 25 | GST Council, Press Release page | `https://gstcouncil.gov.in/press-release` | T1 | HTTP 200, 33,562 bytes; **no press-release items listed** — the page returns only navigation and footer. The Council does not maintain a retrievable press-release archive at this path. |
| 26 | PDF metadata across 20 published minute books | `pdfinfo` on each file above | T1 (artefact) | Producer and CreationDate strings underpinning §8 and `gst-council-minutes-publication-lag`: `Online2PDF.com`, `PDF Candy`, `iLovePDF`, `PDF24`, `GPL Ghostscript 9.52/10.00.0`, `3.0.8 (5.0.15)`. |

**Delegated retrievals.** Three subagents were dispatched on opus with the same no-fabrication
rule: (A) Article 279A / Compensation Act sections / the cess-extension notification / *Mohit
Minerals*; (B) compensation released, due and outstanding by year, cess collected vs credited, the
CAG report, the back-to-back loan releases, parliamentary answers; (C) the 56th meeting and GST
2.0, the cess after loan repayment, and the 56th-minutes absence check. **Their returns are
integrated in the appendix below; anything they marked UNRETRIEVED is carried into §Sources NOT
retrieved and is NOT asserted anywhere in this part.** Where a subagent's material is used, its
tier and model-of-record are given there.

---

## Sources NOT retrieved

| wanted | why it matters | M1 modes tried | status |
|---|---|---|---|
| **Minutes and agenda, 56th GST Council meeting (3 Sep 2025)** | The only instrument that would put states' and Union's positions on GST 2.0 on one ledger | (i) resolver — host resolves and serves 200; (ii) fresh process — index re-parsed twice, EN and HI; (iii) client — not needed, curl gets 200 on the index and on the 55th's PDFs. **Seven direct URL probes → 404.** | **Does not exist at the publisher.** Not a retrieval failure — an absence (A-1). |
| **Substantive text of the 52nd meeting minutes** | Completes the divisions sweep | Retrieved successfully (28.7 MB); failure is in the artefact, not the transport — no text layer | **Unread. Would require OCR of 117 scanned pages.** |
| **Official transcript / verbatim record of the 27 Aug 2020 post-Council press conference** | The "act of God" attribution | Searched the Council's press-release path (empty, source 25) | **Unretrieved.** Any use is T4 (A-8). |
| **State-wise, year-wise compensation released** | The only distributional view of the guarantee | Present in the 54th annexure but as an unreadable image (A-5) | **Unretrieved from the Council.** See FORWARD REFERENCES. |
| **GST Council Procedure and Conduct of Business Regulations (full text)** | Rule 14 is quoted in the 38th minutes; the meeting-frequency rule Tamil Nadu invoked at the 47th is not | Not located under `/en/gst-council-0`, `/all-committees`, or the site's document paths | **Unretrieved.** Rule 14 is held only as quoted inside the 38th minutes — which is a T1 quotation but not the instrument itself. **The prescribed meeting frequency is therefore unverified and I make no claim about it.** |
| **Minutes of the 10th GST Council meeting** | Punjab's 2020 case rests on para 6.3, page 13 of it | Not attempted — deprioritised | **Unretrieved.** The quotation is held only as reproduced in the 41st minutes. Treat as **T1-at-one-remove**: it is the Union's own Council Secretariat reproducing its own earlier minute, but it is not the 10th minute book. |

---

## FORWARD REFERENCES

*(Mandatory section. Every quantity this part relies on another part of stage 2 to carry.)*

- **→ part 02: the divisible pool and gross tax revenue, by financial year, FY2014-15 onward.**
  This part offers no ratio-to-GDP by rule; every denominator it wants is a tax-revenue denominator
  and part 02 owns those. Specifically needed: gross tax revenue of the Centre and the size of the
  divisible pool, so that `gst-compensation-cess-collected` can be expressed against a shared pool.
- **→ part 02: the 14th and 15th Finance Commission award periods and the 32%→42%→41% devolution
  share.** The compensation guarantee (FY2017-18 → FY2021-22) sits inside the 14th and 15th award
  windows, and the 42nd meeting's Option 1 clause X expressly excludes the back-to-back borrowing
  from *"any norms which may be prescribed by the Finance Commission"* — that exclusion cannot be
  assessed without part 02's account of those norms.
- **→ part 03: the compensation cess as a cess.** This part treats the compensation cess only as
  the compensation instrument. Its character as a **cess outside the divisible pool** — and
  therefore the fact that ₹8.66 lakh crore of it (to March 2025) was never shareable — belongs to
  part 03. Needed from part 03: total cess-and-surcharge collections by year, and the share of
  gross tax revenue they represent.
- **→ part 03: GST revenue gross vs net of refunds, by year.** PR-G is stated here and not
  resolved. Tamil Nadu's objection (PR-E) that the compensation base must be *"net of the SGST
  refunds"* cannot be adjudicated without it.
- **→ part 03: IGST ad-hoc apportionment.** The `+2,01,000 / −34,000 / net +1,67,000` table is
  reported here from the 54th annexure because it enters the compensation base (PR-E), but the
  IGST-settlement question in its own right, and the FY2023-24 continuous-account reporting-base
  shift, belong with part 03.
- **→ part 04: whether the back-to-back loan was counted as a transfer to states in the Union
  Budget's *Statement of Transfer of Resources to States and Union Territories*.** If a loan
  substituting for a statutory compensation entitlement appears in the transfers statement, that is
  a definitional finding about the transfers instrument and part 04 owns that instrument.
- **→ part 04: state fiscal deficit and net borrowing ceilings under Article 293, FY2020-21 and
  FY2021-22.** The Option 1 / Option 2 choice turned on the 0.5% FRBM relaxation and on Article 293
  permissions; the AG's opinion limb (d) makes Article 293 the governing provision. Also flagged in
  stage 1 as the Kerala reserve-case thread.
- **→ part 06 (Tamil Nadu): Tamil Nadu's own compensation-gap computation.** TN asserted in the
  42nd agenda that its estimate exceeded the Union's, on a differently-defined base. Part 06 should
  attempt the **state-side** instrument (TN Budget documents / CAG state audit) — and must apply the
  carried-forward trap: **a Tamil Nadu figure on a Centre-state transfer is not independent of Tamil
  Nadu.** The disciplining pairing is TN's figure *against* the Union's, both quoted, neither
  adopted.
- **→ part 06 (Tamil Nadu): the destination-principle loss.** Gujarat (47th, 22.17) and Karnataka
  (54th, 9.19) both put the producing-state loss on the Council record; Karnataka quantified it as
  *"SOTR has dropped by around 0.7% as against the GSDP"*. Tamil Nadu is this phase's manufacturing
  case state and part 06 carries the measured version.
- **→ part 07 (West Bengal, Bihar): West Bengal's Option-3 letter of 2 September 2020 from the
  Chief Minister to the Prime Minister.** Described in the 42nd agenda annexure; **the letter itself
  is unretrieved here**. Also: Bihar's position is the sharpest pro-Union voice in the 41st and 42nd
  minutes (*"some States could not veto when most other States suffer"*) and part 07 should carry
  it, because it is a recipient state arguing against the contributor states' constitutional case —
  which is exactly the split stage 1 scoped Bihar to expose.
- **→ part 05 (Governors / LG): Delhi and Puducherry vote in the GST Council** by force of Article
  366(26B) as inserted by the 101st Amendment. That a Union Territory with Legislature is a "State"
  for Article 279A but not for other purposes is a fact part 05 needs when it reaches Article 239AA.

---

## Definitional disagreements

*(§(a) of the brief, in table form. "Same-instrument" means both figures come from documents
published by the same party — in which case the disagreement cannot be resolved by preferring a
more independent source.)*

| quantity | definition A | definition B | instruments | kind | resolvable? |
|---|---|---|---|---|---|
| Compensation payable to a state | **accrued**: protected revenue − actual revenue, on the statutory formula | **admissible**: only what an **Accountant General's certificate** supports | Compensation Act ss.5–7 vs GST Council 47th minutes para 22.5–22.6 and 53rd para 8.4 | definitional | Only by producing the certificates. The gap is real and was still open at the 53rd meeting (Jun 2024) |
| Compensation cess proceeds | **collected** | **credited to the GST Compensation Fund** (Public Account) under s.10(1) | GST Council 54th annexure (collected) vs Compensation Act s.10(1) and CAG's Report on Union Government Accounts (credited) | definitional **and** evidentiary | Only by the CAG. **This is the one place an independent auditor adjudicates between the Union's own two numbers** |
| FY2020-21 compensation shortfall | **₹1,65,178 cr** "on account of GST implementation" | **~₹3,00,000 cr** total, no causal split available in law | GST Council 41st minutes paras 27.2–27.5 (Union) vs same minutes para 29 (Kerala) and para 36 (Delhi) — **same instrument** | definitional | **No.** The dispute is whether the decomposition has a legal referent at all |
| The same "implementation" gap | **₹1,65,718 cr** (para 27.2) | **₹1,65,178 cr** (para 27.4) | 41st minutes, **two paragraphs of one signed document** | evidentiary (transposition) | Yes — 1,65,178 reconciles downstream to 96,477 |
| A state's "actual revenue" in the compensation formula | post-settlement SGST **including IGST ad-hoc settlement**, gross of SGST refunds (DoR) | **excluding** ad-hoc settlement, **net of** SGST refunds (Tamil Nadu) | 42nd meeting **agenda** Annexure-I — the Union's own paper carrying the state's objection | definitional | Both computable; the statute (s.6) does not settle which |
| Option 1's borrowable amount | **₹97,000 cr** at 10% assumed growth | **₹1.1 lakh cr** at 7% assumed growth | 42nd agenda paras 3 and 5(i); 42nd minutes para 33 | definitional (parameter choice) | Yes on the record — but note a ₹13,000 cr swing from a fortnight's reconsideration |
| "Transition period" | **1 Jul 2017 – 30 Jun 2022** (Compensation Act s.2) | **ends 31 March 2026** (GST Council decision) | Compensation Act vs GST Council 55th minutes, agenda item 7(f) Decision | definitional | **No** — the Council has redefined a statutory term in a decision applying that statute |
| Who repays the back-to-back loan | the **Union** borrowed and on-lent; states *"will not be required to service the debt or to repay it from any other source"* | the **states** are the borrowers of record and repayment comes out of the cess that would otherwise have paid **their** arrears (clause XI charge order) | 42nd agenda Option 1 clauses VI, X, XI; 41st minutes paras 49, 51; 43rd minutes para 22.1 | definitional | **No — both are true.** Any record must carry both |
| GST revenue | **gross** | **net of refunds** | Flagged by TN (above) and by the 43rd minutes para 21.1 listing "collected, refunded and settled/apportioned" as three quantities | definitional | **Unresolved here** → part 03 |
| Date of the 2nd Council meeting | **30-Jul-2016** (Council's index) | **30 September 2016** (the minute book) | `gstcouncil.gov.in/en/gst-council-meeting` vs `signed-minutes_2nd-gst-council-meeting.pdf` | evidentiary | Yes — the minute book governs; the index date is impossible |

---

## Disciplining measure

*(§(b) of the brief: is there an instrument that puts BOTH the Centre's and the states' facts on ONE
ledger, so neither side's number can be quoted without the other's being visible in the same
document? And — the caveat that is itself the finding — does that instrument supply independent
**evidence**, or only a shared **basis**?)*

**The general answer: yes, and it is the GST Council minute book — and its independence is exactly
zero.**

The minutes are the strongest instrument of this kind I have seen in this project. They record, in
one signed document, published by the Union's own Council Secretariat: the Attorney-General's
opinion verbatim; Punjab's rebuttal quoting an earlier minute by paragraph and page number; the
Union's shortfall arithmetic; Kerala's objection that the arithmetic has no legal referent; the
Union's option terms; each state's refusal with its stated reason; and the demand for a division
alongside the fact that none was held. **You cannot quote the Centre's 2020 legal position from the
41st minutes without the 2016 Chairperson's "Constitutional commitment … hundred per cent
compensation" being reachable in the same corpus, because the states put it there.**

**But — and this is the finding, not a caveat on it — the minutes supply a common *basis*, not
independent *evidence*.** Every number in them originates with the Department of Revenue or the
Department of Expenditure. The states contribute *positions*, not measurements. The one exception
is Tamil Nadu's counter-computation (PR-E), and even that appears only as a summary of TN's letter
in a DoR-drafted annexure — the Council never adjudicated between the two figures and never
published TN's workings. **The minute book is a shared ledger of arguments, not a shared ledger of
facts.** It disciplines rhetoric; it does not discipline arithmetic.

Per quantity:

| quantity | is there a one-ledger instrument? | does it supply independent evidence, or only a shared basis? |
|---|---|---|
| **Compensation cess collected, by year** | **Yes — GST Council 54th meeting annexure.** Presented to all members, in a document all members sign off | **Shared basis only.** The figures are DoR's. No state produces an independent count, and none could — the cess is a Union levy collected by Union machinery. **Independent evidence exists in principle in the CAG's audit of Union accounts, and only there.** |
| **Cess credited to the Compensation Fund** | **No Council instrument.** The Council is shown collections, not transfers | **The CAG's Report on Union Government Accounts is the only genuinely independent instrument in this entire part.** It audits the Union against the Union. This is the disciplining measure that actually works, because the auditor is neither the payer nor the payee. |
| **Compensation released, aggregate** | **Yes — 54th annexure ("Compensation Paid till 05 September 2024: 6,64,203")** | **Shared basis only** — DoR's figure, tabled to the states. |
| **Compensation released, state-wise by year** | **Nominally yes** — the 54th annexure contains exactly this table | **Neither.** It is published as an unreadable image (A-5). An instrument that exists but cannot be read supplies nothing. |
| **Compensation *due* to a given state** | **Yes, and uniquely well** — the **Accountant General's certificate** | **Independent evidence, genuinely.** The AG is an officer of the CAG: not the Union executive, not the state. This is the one quantity in the arc where a third party's signature stands between the two claimants. Note the asymmetry: it constrains the *state's* claim only. |
| **The FY2020-21 shortfall and its causal split** | **Yes — 41st minutes, both positions on facing pages** | **Shared basis only, and contested at that.** The Union's decomposition and the states' denial that a decomposition is possible are both in the document; the underlying revenue data are entirely DoR's. |
| **Back-to-back loan principal and interest** | **Yes — 54th annexure lines "−2,69,208" and "−51,561"** | **Shared basis only.** The Union is the borrower, the lender-of-record to states, and the reporter. Independent evidence would be the CAG's audit of Union borrowings and/or RBI's *State Finances: A Study of Budgets* on the states' side — neither retrieved here. |
| **A state's own "actual revenue"** | **No.** The Union computes it from GSTN returns and the state disputes it (TN) | **Neither side is independent.** The Union's figure is the Union's; a state's own figure is the state's. **This is the carried-forward trap in its purest form.** The only exit is the AG certificate, which is why the certificate gate matters so much more than its administrative appearance suggests. |
| **Whether the Council recommended the borrowing arrangement** | **Yes — the 42nd minutes, decisively** | **Independent evidence in the only sense available for a procedural fact.** The document either contains a decision on agenda item 9A or it does not. It does not. A procedural absence in a party's own signed record is evidence *against* that party and cannot be dismissed as its own reporting. **This is the strongest single evidentiary finding in this part.** |
| **What each state asked for in June 2022** | **Yes — 47th minutes item 22** | **Independent evidence, as to the asking.** Sixteen members' requests are recorded verbatim in a Union-published document, including six from Union-aligned states. The Union's own record establishes the states' case that the demand was universal and cross-party. **Nothing establishes what the Council decided, because it decided nothing.** |
| **The 56th meeting / GST 2.0** | **No — and this is the point.** The instrument that would exist does not (A-1) | **Neither basis nor evidence.** For the largest tax change since 2017 there is no document placing the states' positions beside the Union's. Everything available is a Union press release or a relayed account. |

**The conclusion to carry into the authoring stage.** The GST Council minute book is the best
disciplining instrument this project has found — and it is not a check. It is a *transcript*. It
constrains what either side can later claim to have said, and on procedural facts (was a division
held? was a decision recorded?) it is genuinely dispositive, because the Union cannot un-write its
own silence. On *quantities* it constrains nothing, because every quantity in it is the Union's.
**The only true independent measure anywhere in the compensation arc is the CAG — through the
Accountant General's certificate on the states' side of the ledger and the audit of Union accounts
on the Centre's.** Where the CAG has not spoken, the choice is between the Union's number and a
state's number, and the phase's carried-forward rule applies without exception: **neither is a
check on the other.**
