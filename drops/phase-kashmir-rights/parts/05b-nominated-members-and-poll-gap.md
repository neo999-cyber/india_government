# 05b — Nominated members of the J&K Assembly, the 2014–2024 poll gap, the electoral rolls, and the delimitation order's effective date

**Stage-2 research part, phase 12 (`kashmir-rights`).** Companion to `05-elections-delimitation.md`, which
this part does NOT duplicate. It closes four items that part 05 explicitly left open (§3.10, §5.3, §5.5,
§5.6) and adds the nominated-members question, which part 05 did not treat at all.

**Model that actually served this agent: `claude-opus-5` (Opus 5).** Recorded as instructed.

**Retrieval convention used throughout, per instruction:** every document is marked **RETRIEVED** (I
fetched it and read its bytes in this session) or **RELAYED** (I know it only because another document
quotes or describes it). Tier grades the *document I retrieved*, not the institution behind it. A fact
known only through a press account is **T4 even when the underlying figure is official**.

**Absence classes used, in the order tested:** `not-collected` · `not-published` · `withheld` (requires a
NAMED REQUESTER, a SPECIFIC REQUEST and a DATE) · `never-defined`.

---

# 1. NOMINATED MEMBERS OF THE J&K LEGISLATIVE ASSEMBLY

## 1.1 The 2019 Act, section 15 — verbatim primary text

**D1 — Jammu and Kashmir Reorganisation Act, 2019 (Act 34 of 2019), Gazette of India Extraordinary.
RETRIEVED** directly from the Government of India's own Gazette host,
`https://egazette.gov.in/WriteReadData/2019/210407.pdf` — HTTP 200, **1,324,210 bytes**, MD5
`0e16a53f5e362636f3d65294e562259f`, converted with `pdftotext -layout`. **Tier T1.**

*How that retrieval was obtained, because it matters for every future phase.* `egazette.gov.in` does **not**
fail DNS — the system resolver fails, the host does not. `dig +short @1.1.1.1 egazette.gov.in` returns
**164.100.190.144**, and `curl --resolve egazette.gov.in:443:164.100.190.144` with a browser User-Agent
succeeds. I verified this myself in this session after a sibling agent flagged it, and I re-verified the
same trick on `api.sci.gov.in` (103.195.217.72) and `sansad.in` (164.100.252.170), both of which also
answer. **Part 05's statement that `egazette.gov.in` fails DNS should be read as "the resolver in this
environment fails on it", not as a property of the host, and the same applies to the other hosts part 05
recorded as dead.**

I separately downloaded the PRS mirror at
`https://prsindia.org/files/bills_acts/bills_parliament/2019/Jammu%20and%20Kashmir%20Reorganisation%20Act,%202019.pdf`
(HTTP 200) and it is **byte-identical to the eGazette copy — same 1,324,210 bytes, same MD5
`0e16a53f5e362636f3d65294e562259f`**. So the PRS copy is a bit-exact mirror and either citation is sound;
I cite the Gazette host.

**Section 15, verbatim and complete** (marginal heading: *Representation of women*):

> **15.** Notwithstanding anything in sub-section (*3*) of section 14 the Lieutenant Governor of the
> successor Union territory of Jammu and Kashmir may nominate two members to the Legislative Assembly to
> give representation to women, if in his opinion, women are not adequately represented in the Legislative
> Assembly.

The section it disapplies, **section 14(3)**, verbatim:

> (*3*) The total number of seats in the Legislative Assembly of the Union territory of Jammu and Kashmir
> to be filled by persons chosen by direct election shall be 107.

And **section 14(4)**, which is why 107 is not the working number:

> (*4*) Nowithstanding anything contained in sub-section (*3*), until the area of the Union territory of
> Jammu and Kashmir under the occupation of Pakistan ceases to be so occupied and the people residing in
> that area elect their representatives— (*a*) twenty four seats in the Legislative Assembly of Union
> territory of Jammu and Kashmir shall remain vacant and shall not be taken into account for reckoning the
> total membership of the Assembly; and (*b*) the said area and seats shall be excluded in delimiting the
> territorial constituencies as provided under PART V of this Act.

*("Nowithstanding" is the Gazette text's own typographical error, reproduced here as printed. The seat
arithmetic is out of scope — see part 05.)*

**Four things section 15 does and does not say, and each matters downstream:**

1. **Who nominates: the Lieutenant Governor**, not the Central Government, and not on any stated advice.
   The section confers the power on the LG in terms and attaches a subjective test — "*if in his opinion*,
   women are not adequately represented".
2. **How many: two.** No more, no fewer, and no category other than women.
3. **The "notwithstanding" clause is doing structural work.** By disapplying s.14(3) — the sub-section that
   fixes the directly-elected seats at 107 — s.15 makes the two nominated members *additional to*, not
   drawn from, the elected complement. They are not elected and are not counted in the direct-election
   total.
4. **Section 15 is silent on whether nominated members may vote.** There is no words-on-the-page answer in
   the 2019 Act. This silence is the whole of the Puducherry-comparator problem in §1.4 below.

## 1.2 The 2023 amendment — which one, and its verbatim operative text

**First, a naming trap that must not be reproduced downstream.** There are **two** J&K Reorganisation
amendment bills of 2023 and they are different instruments doing different things:

| Instrument | Introduced LS | Passed LS | Passed RS | Subject |
|---|---|---|---|---|
| **J&K Reorganisation (Amendment) Bill, 2023** — Bill No. **100 of 2023** | **26 Jul 2023** | **6 Dec 2023** | **11 Dec 2023** | seats 83→90; ST reservation; **nomination of Kashmiri Migrants and PoJK displaced persons** |
| J&K Reorganisation (**Second** Amendment) Bill, 2023 | 12 Dec 2023 | 12 Dec 2023 | 18 Dec 2023 | one-third reservation for women in elected seats, contingent on a post-commencement census and a further delimitation |

**The nomination provisions are in the FIRST of these**, Bill No. 100 of 2023. Anything citing "the Second
Amendment Act 2023" for nominated members is citing the wrong instrument. (The Second Amendment's women's
reservation is a separate, not-yet-operative thing and is out of this part's scope; I note only that its
own commencement is tied to a census that has not been taken.)

**D2 — The Jammu and Kashmir Reorganisation (Amendment) Bill, 2023, Bill No. 100 of 2023, "AS INTRODUCED
IN LOK SABHA", with Statement of Objects and Reasons, Financial Memorandum and Annexure. RETRIEVED** by
`curl` from
`https://prsindia.org/files/bills_acts/bills_parliament/2023/Jammu%20and%20Kashmir%20Reorganisation%20(Amendment)%20Bill,%202023.pdf`
— HTTP 200, 72,508 bytes, 7 pages, `pdftotext -layout` clean. Printer's line at the foot:
`MGIPMRND—152LS(S3)—20-07-2023`. Signed **AMIT SHAH**, NEW DELHI, **17th July 2023**.
**Tier: T1 for the Bill text** (this is the Lok Sabha printed Bill, a primary parliamentary document,
mirrored by PRS). **But see §1.3: this is the Bill as INTRODUCED, not the Act as PASSED.**

**Clause 3, verbatim — the operative nomination provisions:**

> **3.** After section 15 of the principal Act, the following sections shall be inserted, namely:—
>
> **'15A.** Notwithstanding anything contained in sub-section (*3*) of section 14, the Lieutenant Governor
> of the Union territory of Jammu and Kashmir may nominate **not more than two members, one of whom shall
> be a woman, from the community of Kashmiri Migrants**, to the Jammu and Kashmir Legislative Assembly.
>
> *Explanation.*—For the purposes of this section, the term "Migrant" shall have the same meaning as
> assigned to it in clause (*e*) of section 2 of the Jammu and Kashmir Migrant Immovable Property
> (Preservation, Protection and Restraint on Distress Sales) Act, 1997.
>
> **15B.** Notwithstanding anything contained in sub-section (*3*) of section 14, the Lieutenant Governor of
> the Union territory of Jammu and Kashmir may nominate **one member from displaced persons from Pakistan
> occupied Jammu and Kashmir** to the Jammu and Kashmir Legislative Assembly.
>
> *Explanation.*—For the purposes of this section, the term "displaced person" means any person, who, on
> account of the setting up of the dominions of India and Pakistan, or on account of civil disturbances or
> fear of such disturbances in any area of the then State of Jammu and Kashmir presently under occupation
> of Pakistan, **during the years 1947-48, 1965 and 1971**, had left or had been displaced due to such
> disturbances from his place of residence in such area and who has been subsequently residing outside such
> area **and also includes successors-in-interest of any such person**.'.

**Clause 2, verbatim** — the seat consequential (in scope only because it is the same instrument):

> **2.** In the Jammu and Kashmir Reorganisation Act, 2019 … in section 14,— (*i*) in sub-section (*3*),
> the following proviso shall be inserted, namely:— 'Provided that subject to the provisons of
> sub-section (*1*) of section 60, on and from the date of commencement of the Jammu and Kashmir
> Reorganisation (Amendment) Act, 2023, the provisons of this sub-section shall have effect as if for the
> figures "107", the figures "114" had been substituted.'; (*ii*) for sub-section (*10*), the following
> sub-section shall be substituted … `"3. Jammu and Kashmir  90  7  9  90  7  9"`.

*("provisons" twice is the printed Bill's own error, reproduced as printed.)*

**Clause 1(2), verbatim — the commencement clause, which matters in §1.6:**

> (*2*) It shall come into force on **such date as the Central Government may, by notification in the
> Official Gazette, appoint**.

### The count of nominated seats

| Provision | Category | Number | Constraint |
|---|---|---|---|
| s.15 (2019 Act) | women, if in the LG's opinion inadequately represented | **2** | — |
| s.15A (2023) | Kashmiri Migrants | **not more than 2** | one of whom **shall be** a woman |
| s.15B (2023) | displaced persons from PoJK | **1** | — |
| | | **5 maximum** | |

**Who nominates: the Lieutenant Governor in all three sections.** Not the Central Government, not the
Council of Ministers, not on any stated advice. The statute names the LG and says nothing about advice.
This is a first-class finding and the single most consequential textual fact in this section: the same
officer whom the Reorganisation Act makes the Union's appointee under Article 239 holds, on the face of
the Act, an unadvised power to add up to five members to a 90-member house — **5.26 % of the resulting
95-member body, appointed by the centre's own officer.** How that interacts with a 90-seat elected house
is the arithmetic in §1.5.

### What the categories actually mean

- **"Migrant"** is not defined in the Reorganisation Act. s.15A borrows the definition from **clause (e)
  of section 2 of the J&K Migrant Immovable Property (Preservation, Protection and Restraint on Distress
  Sales) Act, 1997 (J&K Act XVI of 1997)** — a *State* Act of the pre-2019 J&K legislature, whose text I
  did **not** retrieve (`indiacode.nic.in` and `jk.gov.in` both fail DNS here). **So the operative
  definition of who counts as a Kashmiri Migrant for the purpose of a seat in the legislature is, in this
  part, RELAYED only.** PRS's summary of it (D3, T4) is: persons who migrated from the Kashmir Valley or
  any other part of the State after **1 November 1989** and are registered with the Relief Commissioner,
  plus unregistered persons in three saving categories (in government service in a moving office; left for
  work; own immovable property at the place of migration but cannot reside there due to disturbed
  conditions). **I could not verify that against the 1997 Act's own words and I flag it as the one load-
  bearing definition in this section that rests on a T4 source.**
- **"Displaced person"** IS defined on the face of s.15B, above, and the definition is closed to three
  named episodes — 1947-48, 1965, 1971 — and open to successors-in-interest without generational limit.

### The Statement of Objects and Reasons — the government's own population figures

D2's SOR carries the only official population counts for the two nominated categories that this part
located, and they are **T1 because they are in the printed Bill**:

- **Kashmiri Migrants:** "forty-six thousand five hundred and seventeen families having one lakh fifty-eight
  thousand nine hundred and seventy-six persons registered with the Relief Organisation of the Government
  of Jammu and Kashmir" — **46,517 families / 158,976 persons**, registered "over a period of last three
  decades". Note the frame: *registered*, which by the 1997 Act's own definition is not the same as the
  population of migrants.
- **PoJK displaced:** 31,779 families migrated in the wake of 1947; 26,319 settled in the erstwhile State
  and 5,460 moved elsewhere in India; 10,065 more families displaced from Chhamb Niabat in 1965 (3,500) and
  1971 (6,565); "a total of **forty-one thousand eight hundred and forty-four families**" — 41,844.

SOR para 5 states the trigger: "The Delimitation Commission, after considering the matter in depth
recommended for representation of communities of 'Kashmiri Migrants' and 'Displaced Persons from Pakistan
occupied Jammu and Kashmir' in the Legislative Assembly … **by way of nomination**."

## 1.3 What Parliament enacted versus what the Commission recommended — the substantive divergence

The recommendation (already established upstream, not re-derived): at least two members, one of them a
female, from the Kashmiri Migrant community, **"with power at par with the power of nominated members of
the Legislative Assembly of Union territory of Puducherry"**; and, separately, that the Government consider
nominating representatives of PoJK displaced persons.

**What the Bill did with the powers clause: it dropped it.** There is no reference to Puducherry anywhere
in D2 — not in clause 3, not in the Explanations, not in the SOR. Instead, **SOR paragraph 7 substitutes a
different comparator**, verbatim:

> "7. The representation of the 'Kashmiri Migrants' and 'Displaced Persons from Pakistan occupied Jammu and
> Kashmir' in Legislative Assembly of the Union territory of Jammu and Kashmir **shall be given on lines of
> section 15 of the Act, which provides for the representation of women**."

So the drafting instruction Parliament acted on was *"like our own section 15"*, not *"like Puducherry"*.
That is a real difference, not a stylistic one, because **section 15 itself says nothing about powers**.
The recommendation named a comparator whose powers had been judicially settled; the enactment named a
comparator whose powers had not. The three divergences, stated plainly:

1. **The words "power at par with … Puducherry" were not enacted, and no substitute powers clause was
   enacted either.** The statute is silent on the rights of nominated members.
2. **"At least two"** in the recommendation became **"not more than two"** in s.15A. The recommendation
   set a floor; the enactment set a ceiling. The floor is gone: nothing in s.15A obliges the LG to
   nominate anybody at all. Both s.15A and s.15B use "**may** nominate", as does s.15.
3. The PoJK item, which the Commission put as a matter for the Government to *consider*, was enacted as a
   substantive power for one member — so on that head the enactment went **further** than the
   recommendation's own framing, not less far.


## 1.4 The Act as PASSED, and its commencement — both retrieved, both T1

**D4 — a single MHA-hosted PDF containing TWO Gazette instruments. RETRIEVED** by `curl` with a browser
User-Agent from `https://www.mha.gov.in/sites/default/files/2024-09/J&KReorganisatiG_04092024_0.pdf` —
HTTP 200, 1,476,247 bytes, 3 pages, `pdftotext -layout` yields a usable but OCR-degraded text layer
(scanned Gazette; Devanagari renders as mojibake, English is legible with occasional character corruption
such as "l5A" for "15A" and "m" for "90" in one table cell). **Tier T1** — Gazette scans on the Ministry of
Home Affairs' own domain. This is the single most productive retrieval in this part.

**Instrument 1 — the Act as passed.**
Gazette of India Extraordinary, PART II — Section 1, **No. 43, NEW DELHI, FRIDAY, DECEMBER 15, 2023 /
AGRAHAYANA 24, 1945 (SAKA)**, CG-DL-E-15122023-250692. Ministry of Law and Justice (Legislative
Department). "The following Act of Parliament received the assent of the President on the 15th December,
2023 and is hereby published for general information:—"

> **THE JAMMU AND KASHMIR REORGANISATION (AMENDMENT) ACT, 2023 — No. 35 of 2023 — [15th December 2023]**

Authenticated **S.K.G. RAHATE, Secretary to the Govt. of India**.

**I compared clause 3 of the Act as passed against clause 3 of the Bill as introduced (D2), word by word.
They are identical.** Sections 15A and 15B were enacted exactly as introduced on 26 July 2023: same
"not more than two members, one of whom shall be a woman", same 1997-Act cross-reference, same one PoJK
member, same 1947-48/1965/1971 closed list, same successors-in-interest extension. **No amendment was made
to the nomination provisions during passage.** Clause 2 likewise carries through (107→114 proviso; RPA
Second Schedule entry "3. Jammu and Kashmir 90 7 9 90 7 9"). The only textual differences between D2 and
D4 are printer's corrections — D2's "provisons" is "provisions" in the enacted text.

**The Act as passed contains NO powers or voting clause for nominated members. Confirmed against the
enacted text, not the Bill.** Section 3 of Act 35 of 2023 ends with the s.15B Explanation and the
Secretary's authentication. There is no s.15C, no proviso, and no consequential amendment to any section
dealing with the rights of members.

**Instrument 2 — the commencement notification. This closes the commencement question completely.**
Gazette of India Extraordinary, PART II — Section 3 — Sub-section (ii), **No. 5227, NEW DELHI, TUESDAY,
DECEMBER 26, 2023 / PAUSHA 5, 1945**, CG-DL-E-26122023-250903. **MINISTRY OF HOME AFFAIRS (Department of
Jammu, Kashmir and Ladakh Affairs), NOTIFICATION, New Delhi, the 26th December, 2023**, verbatim:

> **S.O. 5458(E).**—In exercise of the powers conferred by sub-section (*2*) of section 1 of the Jammu and
> Kashmir Reorganisation (Amendment) Act, 2023 (35 of 2023), the Central Government hereby appoints the
> **26th day of December, 2023**, as the date on which the provisions of the said Act shall come into force.

File number **[F. No. 11012/02/2020-SRA]**, signed **AJAY KUMAR BHALLA, Home Secy.**

**So: sections 15A and 15B of the J&K Reorganisation Act 2019 have been in force since 26 December 2023 —
nine months before the September–October 2024 assembly election.** Note also that the Act's own commencement
carried the 107→114 proviso and the 90/7/9 RPA entry into force on the same date, which is the statutory
basis on which the 2024 election was fought on 90 seats.

**A note on the naming of the answering department.** The notification is issued by the **Department of
Jammu, Kashmir and Ladakh Affairs** within MHA. That is the department to address for anything in this
part, and its file-number stem `11012/02/2020-SRA` is a usable RTI handle.

## 1.5 Do nominated members have the right to VOTE? — the statute is silent, and the silence is the finding

**On the retrieved primary text: sections 15, 15A and 15B say nothing about the rights, powers, privileges
or voting entitlement of nominated members.** All three are single-sentence enabling provisions attached to
a "notwithstanding s.14(3)" hinge. Nothing in Act 34 of 2019 as retrieved (D1) and nothing in Act 35 of
2023 as retrieved (D4) supplies a powers clause.

This is a genuine legal gap and it has a name in the Indian material: it is the **Puducherry problem**, and
the Delimitation Commission's recommendation was drafted to solve it in advance by borrowing Puducherry's
settled position. Parliament did not enact that borrowing (§1.3). What it enacted instead is a provision
"on lines of section 15", which is itself silent.

### The Puducherry comparator — RELAYED, and I could not retrieve the judgment

**D5 — K. Lakshminarayanan v. Union of India, (2020) 14 SCC 664 (Supreme Court of India). NOT RETRIEVED —
RELAYED ONLY. Tier T4.** What I attempted, stated plainly so a reviewer can see the failure is mine and not
an absence:

- `curl` to `https://api.sci.gov.in/supremecourt/2022/9598/9598_2022_16_1501_41932_Judgement_13-Feb-2023.pdf`
  (a different SCI judgment, used as a reachability probe for the SCI API host): **connection produced HTTP
  code 000, zero bytes, i.e. no response at all** within a 40-second timeout.
- `egazette.gov.in` was re-tested in this session for an unrelated document and also returned **HTTP 000,
  zero bytes**. Its unreachability from part 05 is unchanged.

Therefore **the holding in K. Lakshminarayanan is RELAYED in this part and must be carried downstream as
RELAYED.** The proposition as commonly stated — that nominated members of the Puducherry Legislative
Assembly are entitled to vote, including on a confidence motion, and that the Central Government may
nominate them without consulting the UT government — is **not verified here from the judgment's own text,
and no quotation from it may be authored from this part.**

**Why the comparator would not settle J&K even if it were retrieved.** This is a point of substance that a
reader will otherwise get wrong. Puducherry's nominated members exist under **section 3(3) of the Government
of Union Territories Act, 1963**, a different statute from the J&K Reorganisation Act 2019, with a
different nominating authority (the Central Government for Puducherry; the Lieutenant Governor for J&K on
the face of ss.15/15A/15B), and a different textual setting. A holding construing the 1963 Act is
persuasive for J&K, not dispositive. **The Delimitation Commission's phrase "power at par with … Puducherry"
was precisely an instruction to make it dispositive by enactment, and that instruction was not enacted.**
So the divergence in §1.3 is not cosmetic: it is the difference between a settled entitlement and an open
question.

### The two readings, each in its own terms

**Reading A — nominated members can vote.** The "notwithstanding s.14(3)" formula makes them *members of
the Legislative Assembly* without qualification; the Act nowhere creates a class of non-voting member; the
Fourth Schedule oath form retrieved at D1 is a single form covering a person "having been **elected (or
nominated)** a member of the Legislative Assembly", which treats the two routes as producing the same
office; the SOR says the representation is given "to preserve their political rights", which is
unintelligible if the seats carry no vote; and the closest Indian analogue that has been litigated came out
this way. On this reading the silence is not a gap at all — a member is a member, and disabilities must be
enacted expressly.

**Reading B — the question is open and, on the recommendation's own logic, was deliberately left open.**
The Commission thought the point needed saying and said it; the drafters removed it and substituted a
comparator that does not answer it; a court construing that history can read the omission as deliberate.
Article 239A and the 1963 Act, which govern Puducherry, are not the instruments here, and the J&K Act's own
scheme repeatedly distinguishes what is done "by direct election" (s.14(3)) from what is done by nomination
(ss.15, 15A, 15B). Until a J&K-specific ruling or a rule under the Assembly's own Rules of Procedure exists,
"they can vote" is an inference, not a finding.

**Do the two readings rest on different facts or different weightings?** **Different weightings of the same
facts.** Both sides have the same three documents — the 2019 Act, Act 35 of 2023, and the Commission's
recommendation — and neither disputes what any of them says. They differ on what to make of an omission:
Reading A treats statutory silence as leaving the general position intact, Reading B treats the deletion of
a specific powers clause from a specific recommendation as legislative choice. **No fact is in dispute. The
disagreement is entirely about the inference from a deletion.** That is worth stating precisely because
public argument about this has been conducted as though it were a factual dispute.

**Absence class for "the voting rights of nominated members of the J&K Legislative Assembly":
`never-defined`.** Tested in order: it is not `not-collected` (this is not a statistic anyone gathers); it
is not `not-published` (there is no unreleased document that settles it — the producibility test fails,
because no organ has produced a determination that could be compelled out); it is not `withheld` (no named
requester, no specific request, no dated refusal). **No agreed definition of the powers of a nominated
member of the J&K Legislative Assembly exists in the enacted law.** Route: this is closable only by
enactment of a powers clause, by the Assembly's Rules of Procedure and Conduct of Business (which would
settle voting on the floor if not the constitutional question), or by a court. **I am not inventing a data
route where the gap is legislative.**


## 1.6 Corroboration of the enactment and commencement dates from a second T1 source

**D6 — MHA Annual Report 2023-24 (`AnnualReport_27122024.pdf`). RETRIEVED** by `curl` from
`https://www.mha.gov.in/sites/default/files/AnnualReport_27122024.pdf` — HTTP 200, 23,583,045 bytes,
`pdftotext -layout` clean (16,807 lines). **Tier T1.** Para 15.6(b), verbatim:

> "The Jammu and Kashmir Reorganisation (Amendment) Bill, 2023 has been passed by the Parliament which
> provides for nomination of two members from the community of Kashmiri Migrants, one of whom shall be a
> woman from the community and one member from Displaced persons from Pakistan Occupied Jammu and Kashmir
> to the Jammu and Kashmir Legislative Assembly. After assent of the President the Jammu and Kashmir
> Reorganisation (Amendment) Act, 2023 has been **notified in the Gazette of India on 15.12.2023 which came
> into effect on 26th December, 2023**."

That is an independent T1 confirmation of both dates in D4, from the ministry's own annual report. Para
15.6(d) separately records the **Second** Amendment Act 2023 as "notified in the Gazette of India on
22.12.2023" — a third 2023 date that must not be confused with the two above.

**No paragraph in MHA Annual Report 2023-24 records any nomination having been made.** I grepped the
extracted text for "nominat", "Kashmiri Migrant", "15A" and "15B"; the only J&K hits are the legislative
paragraph quoted above and the Kashmiri-migrant *relief and employment* paragraphs at 15.16–15.17.

**A negative worth recording for part 05's benefit:** MHA Annual Report 2022-23
(`AnnualReportEngLish_11102023.pdf`, RETRIEVED by `curl`, HTTP 200, 17,341,998 bytes, T1) mentions
delimitation exactly twice, in para 14.8, and **gives no date at all** — "The Delimitation Commission
constituted by the Government has completed the work of delimitation … Assembly constituencies have been
increased from 83 to 90". MHA Annual Report 2023-24 contains **zero** occurrences of "delimitat". So the
Annual Report series does **not** carry the delimitation order's effective date. That route is closed.

## 1.7 Have any nominated members actually been nominated? — NO, and this is established from a T1 source

**D7 — Jammu & Kashmir Legislative Assembly, National eVidhan Application (NeVA) portal,
`https://jkla.neva.gov.in/`. RETRIEVED in the browser** (`curl` gets no response from this host; the
browser reaches it). Footer, verbatim: "Content managed by: Jammu & Kashmir Legislative Assembly", "Version:
2.0.2", "**Last Updated: 25 Mar 2026**", visitor counter 541,785. **Tier T1 — this is the House's own
published members directory.** Retrieved **3 August 2026**.

**This is the single most important empirical finding in Section 1**, and it is a direct answer where I
expected to have to report a failure:

- Members Contact Directory, "Ist J&K Legislative Assembly UT": **"Hon'ble Member (90)"**.
- The directory carries a built-in filter labelled **"Nominated"**. Activating it returns, verbatim:
  **"Nominated (0)"**.
- Party breakdown on the dashboard sums to exactly 90: Jammu And Kashmir National Conference 41,
  Bharatiya Janata Party 29, Independent 7, Indian National Congress 6, Peoples Democratic Party 4, Jammu
  and Kashmir Peoples Conference 1, Aam Aadmi Party 1, Communist Party of India (Marxist) 1.
- The "Female Members" filter returns **"Female Members (4)"** — four women among 90 elected members,
  **4.44 %**.
- A portal news item reads "J&K Speaker to Administer Oath to Two Newly Elected MLAs, **Assembly Strength
  Rises to 90**".

**Finding: as of 3 August 2026 — twenty-two months after the October 2024 election and thirty-one months
after sections 15A and 15B came into force — the J&K Legislative Assembly has ninety members, all elected,
and zero nominated members.** The House's own directory has a category for them and the category is empty.

**The consequence for section 15 is worth stating separately.** Section 15's condition is "if in his
opinion, women are not adequately represented in the Legislative Assembly". The Assembly's own directory
records four women out of ninety. The power has not been exercised. **Whether the Lieutenant Governor has
formed any opinion under section 15, and what it was, is not published** — see §1.9.

**Limits of D7 that a reviewer must hold.** (a) A directory can lag: "Last Updated: 25 Mar 2026" is the
portal's own stamp, and I cannot exclude a nomination between 25 March and 3 August 2026 that the portal has
not ingested. (b) The filter's semantics are the portal's, not a statutory definition. (c) I did not find a
dated statement from the LG's office or MHA saying "no nominations have been made", so what I have is the
House's own roll, not a declaration. I searched for such a statement and did not find one; **its absence is
a failure of my search, not established evidence.** Even with those limits, a T1 House roll showing 90/90
elected and a nominated count of zero is a much stronger answer than the "not established" I was prepared
to file.

## 1.8 The live litigation — and what it does and does not settle

**All of §1.8 is RELAYED. Tier T4.** I could not retrieve a single court document: `api.sci.gov.in` returns
`getaddrinfo ENOTFOUND` from the WebFetch tool and HTTP 000 from `curl`; `main.sci.gov.in` was not reachable;
the J&K High Court's own site was not tried successfully. Two press pages were attempted directly and both
failed — `scroll.in/latest/1085452/...` returned **HTTP 403** and
`business-standard.com/article/politics/j-k-delimitation-commission-order-comes-into-effect-122052001709_1.html`
returned **HTTP 403**. One press page was successfully fetched (D8 below). Everything else in this
sub-section is known only through search-engine extraction of pages I did not open, and I mark it as such
rather than dressing it up.

**D8 — Greater Kashmir, "LG's power to nominate 5 members to J&K Assembly becomes centre of political,
legal debate", PTI, 8 October 2024. RETRIEVED via WebFetch (page fetched and read). Tier T4.** It records
the pre-count row: Congress, National Conference and PDP opposing any nomination during government
formation, Farooq Abdullah quoted as saying that if it is done "we will go to the Supreme Court", and — the
line that matters here — the assertion that the nominated members "will have the same powers and voting
rights as other MLAs". **That is a press assertion, not a statutory or judicial statement, and it is
exactly the proposition the statute does not contain.** It must be carried as T4 and must not be laundered
into a finding.

**RELAYED, NOT RETRIEVED — the litigation chronology as it appears in search extraction only.** I set it
out because it is the live route by which the voting question may be answered, and I flag every element as
unverified by me:

- **14 October 2024** — the Supreme Court declined to entertain a plea against the nomination power and
  directed the petitioner to the High Court. *RELAYED.*
- A petition by **Ravinder Kumar Sharma**, chief spokesperson of the J&K Pradesh Congress Committee,
  challenging sections 15, 15A and 15B in the High Court of Jammu & Kashmir and Ladakh, on the ground that
  five nominations "with full voting rights" over and above the sanctioned strength could convert a
  minority government into a majority and so offend the basic structure. *RELAYED.*
- **August 2025** — MHA affidavit in the High Court, filed through Deputy Solicitor General Vishal Sharma,
  to the effect that "Sections 15, 15A, and 15B all recognise the power and authority of the Lieutenant
  Governor to make a nomination to the Legislative Assembly", exercisable "in his discretion, without aid
  and advice" of the elected government. *RELAYED.* **If that quotation is accurate it is the Union's own
  reading of the nominating authority and it matches the face of the statute as I retrieved it in §1.2 —
  the LG, not the Council of Ministers.** I am not authoring it as a quotation because I did not read the
  affidavit or a page carrying it.
- **5 December 2025 / 18 December 2025 / 6 February 2026** — successive hearing dates, with adjournments
  sought by the Union. *RELAYED.* I do not know the current status and did not establish any outcome.

**What the litigation shows about the shape of the record.** The petitioner's case is pleaded *on the
assumption* that the nominated members have full voting rights; the Union's answer defends the LG's
discretion to nominate and, on the relayed account, does not address voting at all. **So the two sides in
the only live proceeding are not joined on the voting question either.** That is consistent with §1.5:
the question is open in the enacted law and is being litigated around rather than through.

## 1.9 Absences established in Section 1

**(a) The voting rights of nominated members of the J&K Legislative Assembly — `never-defined`.** Reasoning
in §1.5. No route invented.

**(b) Whether the Lieutenant Governor has formed the opinion required by section 15 that women are not
adequately represented, and what that opinion is — `not-published`.** Tested in order: it is not
`not-collected`, because the statute makes the opinion a condition precedent to a power the LG holds and
any such opinion would be recorded in the Raj Bhavan file; the producibility test is therefore satisfied —
this is a document that either exists or the power has simply never been considered, and either state of
affairs is producible under compulsion. It is not `withheld`, because **I found no named requester, no
specific dated request and no refusal**, and I will not upgrade it on the strength of general political
demand. **Route:** an RTI to the Public Information Officer, Raj Bhavan, Union Territory of Jammu and
Kashmir, for any note, file or order recording the Lieutenant Governor's consideration of section 15 of the
J&K Reorganisation Act 2019 since 16 October 2024; and to the Secretary, Department of Jammu, Kashmir and
Ladakh Affairs, MHA, file stem **11012/02/2020-SRA**, for any correspondence on the exercise of sections 15,
15A and 15B. The MHA file stem is retrieved and exact (D4); the Raj Bhavan PIO designation is **not**
verified by me.

**(c) The operative definition of "Migrant" for section 15A — retrieval failure, not an absence.** Clause
(e) of section 2 of the J&K Migrant Immovable Property (Preservation, Protection and Restraint on Distress
Sales) Act, 1997 (J&K Act XVI of 1997) was **not retrieved**. `indiacode.nic.in` and `jk.gov.in` fail DNS
here. **This is not an established absence and must not be authored as one.** Route: `indiacode.nic.in`
State Acts (J&K) from any environment with working DNS.

**(d) Not an absence, and I want it on the record so it is not miscounted:** whether any nomination has
been made is **established as "none" by D7**, subject to the three limits stated in §1.7. It should not be
carried downstream as unknown.

## 1.10 If this becomes a ledger record

The nominated-members material is **the L-0086 shape**, not the L-0092 shape. The provisions are **in
force** (S.O. 5458(E), 26 December 2023, retrieved), the central question they raise — whether the five
nominated seats carry a vote — is **testable in principle** but has no answer yet in the enacted law, and
it is **awaiting external adjudication** in the High Court of Jammu & Kashmir and Ladakh on a petition that
has been adjourned repeatedly since 2024. That is the `too-early` written definition on all three limbs. It
is **not** the L-0092 presentational-findings shape: nothing here turns on how a figure is presented, and
the disagreement in §1.5 is about the legal effect of a statutory silence, not about the framing of a
number. **I am not proposing any new enum value.**


## 1.11 ADDENDUM — the Act as passed retrieved a SECOND time, from the Gazette host itself

**D4b — Act 35 of 2023, Gazette of India Extraordinary, PART II — Section 1, No. 43, New Delhi, Friday,
15 December 2023 / Agrahayana 24, 1945 (Saka), CG-DL-E-15122023-250692. RETRIEVED** from
`https://egazette.gov.in/WriteReadData/2023/250692.pdf` via `curl --resolve egazette.gov.in:443:164.100.190.144`
with a browser User-Agent — HTTP 200, 131,621 bytes, 2 pages, **clean born-digital text layer** (unlike the
MHA scan at D4, which is OCR-degraded). **Tier T1, retrieved from the Government of India Gazette host.**

This supersedes D4 as the authority for the words of Act 35 of 2023. The text is identical to what I quoted
in §1.2 from the Bill and in §1.4 from the MHA scan — sections 15A and 15B word for word as set out above,
with the printed spellings "provisions" (not the Bill's "provisons") and the marginal headings "Nomination
of Kashmiri Migrants" and "Nomination of displaced persons". **The corrected Gazette number is No. 43, not
431 — the MHA scan's OCR renders "No. 43]" in a way I initially misread, and this addendum corrects it.**

**Consequence for §1.5, restated with the better source: Act 35 of 2023 as printed in the Gazette contains
no powers clause, no voting clause, and no reference to Puducherry.** That is now established from the
Gazette itself and not from a scan or a Bill.


## 1.12 Two first-class findings from the government's own account of its own Bill

**D9 — PIB press release, Ministry of Home Affairs, "Union Home Minister and Minister of Cooperation, Shri
Amit Shah replied to the discussion on Jammu and Kashmir Reservation (Amendment) Bill, 2023 and Jammu and
Kashmir Reorganization (Amendment) Bill, 2023 in the Lok Sabha today…", Release ID 1983311, **06 DEC 2023
7:53PM by PIB Delhi**. RETRIEVED in the browser** (`curl` and WebFetch get no response from `pib.gov.in`;
`mcp__Claude_Browser__navigate` to `https://www.pib.gov.in/PressReleasePage.aspx?PRID=1983311` renders it in
full). **Tier T1.**

### (a) A definitional break: the statute says NOMINATE, the government says RESERVE

The Act's words, retrieved at D4b, are "**may nominate**". The Delimitation Commission's recommendation, in
its own PIB release (D10 below), is "**by way of nomination**". The Bill's own Statement of Objects and
Reasons (D2) says "**by way of nomination**" and "**so as to nominate**".

D9's headline bullets say, verbatim:

> "By giving **reservation** to displaced Kashmiris, they will have voice in the Kashmir Assembly…"
>
> "…the Narendra Modi government has given **reservation of 2 seats** to provide justice to the brothers and
> sisters of their own country who were displaced since last 70 years"

and the body records the Home Minister saying "it is a matter of joy that the Commission has made a
provision that **2 seats will be reserved** for displaced Kashmiri people and **1 seat to be reserved** for
the people displaced from Pakistan-occupied Kashmir".

**These are not the same thing and the difference is the whole of §1.5.** A *reserved* seat is filled by
election within a defined electorate and its holder is an elected member with an elected member's rights. A
*nominated* seat is filled by the Lieutenant Governor's discretion, is expressly outside the direct-election
total by force of the "notwithstanding s.14(3)" hinge, and carries no stated rights at all. **The
government's own promotional account of its own Bill uses the word that implies the rights the Bill does not
confer.** This is a presentational finding of exactly the L-0092 kind — but note that it does **not** turn
the nominated-members record into an L-0092-shaped record, because the underlying question in §1.5 is legal,
not presentational. It is a finding *within* the L-0086-shaped record.

I record the qualification fairness requires: PIB releases summarise a speech, and the Minister spoke in
Hindi (the release is the English rendering). **I did not retrieve the Lok Sabha debate of 6 December 2023
and cannot say what word was used on the floor.** What is established is that the Government of India's own
official press organ described the measure as reservation, five times, on the day the Bill passed.

### (b) Two official sources disagree on the size of the registered Kashmiri Migrant population

| Source | Families | Persons |
|---|---|---|
| **D2**, Statement of Objects and Reasons, J&K Reorganisation (Amendment) Bill 2023 (printed Bill, T1) | **46,517** | **1,58,976** |
| **D9**, PIB record of the Home Minister's Lok Sabha reply, 6 Dec 2023 (T1) | **46,631** | **1,57,967** |
| Difference | +114 | −1,009 |

Both are the Government of India, on the same Bill, four and a half months apart, describing the same
Relief-Organisation register. **Neither carries an as-at date, and neither carries a note explaining the
change.** The SOR attributes its figure to "data available with Government of Jammu and Kashmir … registered
with the Relief Organisation"; D9 says "as per the current figures".

This is a **reporting-base problem, not a rounding problem**: families rose while persons fell, which cannot
happen by simple accretion and implies either a re-verification exercise, a deduplication, or two different
registers. **Which of those it is, is not established.** It matters because the register is the operative
gateway to s.15A: the 1997 Act definition (as relayed at §1.2) turns on registration with the Relief
Commissioner, so the register is the electorate-equivalent for the two Kashmiri Migrant nominated seats.

**Absence class for the register itself: `not-published`.** Tested in order — it is plainly not
`not-collected` (both figures are quoted from it), not `withheld` (no named requester, no dated request, no
refusal that I located), and not `never-defined` (the 1997 Act defines the category). The register exists,
is quantified by the Government in Parliament, and is producible under compulsion; it is simply not
released, and no as-at date or methodology note accompanies either published figure. **Route:** RTI to the
Relief and Rehabilitation Commissioner (Migrants), Government of Jammu and Kashmir, Jammu, for the
registered-migrant family and person counts as at 17 July 2023 and as at 6 December 2023 with the
reconciliation between them; and to the Department of Jammu, Kashmir and Ladakh Affairs, MHA, file stem
**11012/02/2020-SRA**. The MHA addressee and file stem are retrieved and exact; **the J&K Relief Commissioner
designation is not verified by me.**

### (c) The count of five, stated by the Government

D9 also carries the government's own arithmetic, verbatim: "Earlier there were 107 seats in the Jammu and
Kashmir Assembly, now there are 114 seats, **earlier there were 2 nominated members in the Assembly, now
there will be 5**." That corroborates §1.2's table from the government's own mouth.

## 1.13 The Commission's recommendation, now retrieved primary rather than inherited

**D10 — PIB press release, Election Commission, "DELIMITATION COMMISSION FINALISES THE DELIMITATION ORDER
TODAY", Release ID 1822939, **05 MAY 2022 3:23PM by PIB Delhi**. RETRIEVED in the browser. Tier T1.**

The recommendation was given to me as already established, but I retrieved it independently and it is worth
having the primary in this part, verbatim:

> "Provision of at least two members (one of them must be a female) from the community of Kashmiri Migrants
> in the Legislative Assembly and such members may be given **power at par with the power of nominated
> members, of the Legislative Assembly of Union Territory of Puducherry**."
>
> "The Central Government may consider giving the Displaced Persons from Pakistan occupied Jammu and Kashmir
> some representation in the Jammu and Kashmir Legislative Assembly, by way of nomination of representatives
> of the Displaced Persons from Pakistan Occupied Jammu and Kashmir."

And, on the effective date — the sentence that sets up Section 4 of this part:

> "As per the final Delimitation Order, the following will come into effect **from the date to be notified by
> the Central Government**:-"

**Note the drafting of the recommendation itself, which nobody seems to remark on: it says "such members
*may* be given power at par…". Even the recommendation is permissive.** Parliament's failure to enact a
powers clause is therefore a failure to act on a suggestion, not a departure from a direction — which
strengthens Reading A's case that no disability was intended, and weakens the sharper version of Reading B.
I record this because the recommendation is usually quoted as though it were mandatory language.


---

# 2. THE DATE THE DELIMITATION ORDER TOOK EFFECT — **ESTABLISHED, PRIMARY, T1**

*(Taken out of order because it is the shortest and it is now closed. This is part 05 §3.10 and §5.5.)*

**ANSWER: 20 May 2022, by S.O. 2223(E) of the Ministry of Law and Justice (Legislative Department).**

**D11 — Gazette of India Extraordinary, PART II — Section 3 — Sub-section (ii), **No. 2203, NEW DELHI,
FRIDAY, MAY 20, 2022 / VAISAKHA 30, 1944**, CG-DL-E-20052022-235901. RETRIEVED.** Obtained from the
Election Commission of India's own document store, page
`https://www.eci.gov.in/1547-presidential-orders-delimitation-commission-orders` (titled "Presidential
Orders/Act/Notifications 2020"), where it is listed as **"Notification of Law Ministry for J&k", PDF 963 KB,
page-listed date "Wednesday 16 Aug 2023"** (that is the ECI's upload date, not the instrument's date). The
file is served through the ECI's obfuscated download endpoint
`https://www.eci.gov.in/eci-backend/public/api/download?url=…`; navigating to it in the browser triggers a
save dialog and the file lands in `~/Downloads` as a dotfile, recovered with
`f=$(ls -t ~/Downloads/.*claudefordesktop* | head -1); cp "$f" lawmin_jk.pdf`. Recovered file: **985,857
bytes, 2 pages, MD5 `cbae22e92cc438a2a115392c76c9dffb`**, `pdftotext -layout` gives a clean bilingual text
layer. **Tier T1.** The PDF carries a visible digital signature block: "ALOK KUMAR, Date: 2022.05.20
16:40:50 +05'30'".

**The operative text, verbatim and complete:**

> **MINISTRY OF LAW AND JUSTICE**
> (LEGISLATIVE DEPARTMENT)
> **ORDER**
> New Delhi, the 20th May, 2022
>
> **S.O. 2223(E).**–– In exercise of the powers conferred by sub-sections (*2*) and (*3*) of section 62 of
> the Jammu and Kashmir Reorganisation Act, 2019 (34 of 2019), the Central Government hereby appoints the
> **20th day of May, 2022**, as the date on which the orders of the Delimitation Commission, **Order No. 1,
> dated the 14th March, 2022** and **Order No. 2, dated the 5th May, 2022**, published in the Gazette of
> India, Extraordinary, Part II, Section 3, Sub-section (*iii*), vide numbers **O.N. 6(E), dated the 14th
> March, 2022**, and **O.N. 17(E), dated the 05th May, 2022**, respectively, shall take effect.
>
> [F. No. H.11019/03/2019-Leg.-II]
> **Dr. REETA VASISHTA, Secy.**

## 2.1 What this settles, and what part 05 must be corrected on

1. **The break date for every PC-level and AC-level electoral series in J&K is 20 May 2022.** Part 05 §3.10
   is right that it is neither 5 May 2022 nor 31 October 2019, and right to forbid either as a proxy. It is
   **fifteen days after** the Commission signed, and **two years, six months and twenty days after** the
   appointed day.
2. **The instrument is an ORDER of the Ministry of Law and Justice (Legislative Department), not of MHA.**
   That is why the MHA Annual Report series does not carry it (§1.6) and why searching `mha.gov.in` for it
   fails. Anyone resuming should look at Legislative Department instruments, not Home Ministry ones. The
   file number is **H.11019/03/2019-Leg.-II** and the signing officer is the Secretary, Legislative
   Department.
3. **Part 05 §3.9's finding about publication language is nuanced by this document but not overturned.**
   D11 is bilingual — full Hindi text and full English text on facing halves of the same Gazette page.
   Part 05's finding was about the *delimitation order itself* (D3/D4 on the ECI page, Hindi-only scans with
   an unusable text layer), not about this notification, and that finding stands. **But the operative
   commencement instrument IS published in English, and this part retrieved it.**
4. **The two Commission orders are now identified precisely**, which part 05 could not do: Order No. 1 =
   **O.N. 6(E) of 14 March 2022**; Order No. 2 = **O.N. 17(E) of 5 May 2022**; both in Gazette Part II,
   Section 3, Sub-section (*iii*). Part 05 §3.8's route ("the Gazette of India Extraordinary of 14 March
   2022") is thereby confirmed as the right place to look for the draft-stage material, and now has a
   citable number.
5. **Part 05 §5.5 should be closed.** It was filed as "a retrieval failure of my session, not an
   established absence", with the route given as "MHA gazette notifications, 2022". The route was wrong in
   its addressee but the instinct was right; **the item is now closed with primary text and is no longer an
   absence of any class.**

## 2.2 One thing this does NOT settle

**Whether the Delimitation Commission's Order No. 1 of 14 March 2022 and Order No. 2 of 5 May 2022 are
themselves retrievable in English is still open**, and part 05's §3.9 finding on that stands unchanged. D11
tells you their Gazette numbers; it does not reproduce them. **This is not an absence — it is an
unattempted retrieval in this part.** Route: `egazette.gov.in` for Part II Section 3 Sub-section (iii),
O.N. 6(E) of 14.03.2022 and O.N. 17(E) of 05.05.2022, reachable with
`curl --resolve egazette.gov.in:443:164.100.190.144` and a browser User-Agent (verified working in this
session, §1.1).


---

# 3. WHY NO J&K ASSEMBLY ELECTION BETWEEN DECEMBER 2014 AND SEPTEMBER–OCTOBER 2024

**Scope, so nothing is duplicated.** Live record **L-0123** carries the institutional sequence and must not
be re-derived: assembly in suspended animation 20 June 2018, dissolved 21 November 2018, President's Rule,
revoked by **S.O. 4484(E) dated 13 October 2024** (primary-sourced to MHA Annual Report 2024-25 para 15.5).
L-0123's own `assessmentNote` puts the assembly, the elections and the restoration of statehood outside its
subject. Part 04 carries the **Supreme Court's direction** of 11 December 2023 and the statehood question.
**What is mine, and what part 05 §5.6 left open, is the OFFICIAL STATED REASON for the postponement, for
each year of the gap, and whether it is published.**

## 3.1 The corpus I searched, and how

**D12 — the Ministry of Home Affairs' own archive of its own parliamentary answers. RETRIEVED, in bulk.**
Route, recorded exactly because it is reusable: `https://mha.gov.in/MHA1/Par2017/PArQueAnsPage-new.html`
(note: the bare host `mha.gov.in` returns 200; `www.mha.gov.in` returns **no response** for this path — the
`www.` prefix matters and part 04's index URL must be rewritten without it) → session pages
`Par{Bud|Monsoon|Winter}<YYYY>.html` → 106 sitting-date pages → **1,862 distinct answer PDFs listed for
2019–2024**, downloaded with a browser User-Agent at 24-way parallelism. Combined with residue from
adjacent sessions the working corpus is **4,590 PDFs, 691 MB, of which 4,581 text-extracted** with
`pdftotext -layout`; **zero produced an empty text file**, so this is a real corpus and not a pile of
image-only scans. **Tier T1 — each PDF is headed "GOVERNMENT OF INDIA / MINISTRY OF HOME AFFAIRS".**

I then extracted the subject line of every answer (the line printed between the "(SAKA)" date stamp and the
question number) and searched the whole corpus two ways: by subject line for
`ELECTION|ASSEMBLY|POLL|DEMOCRA|LEGISLATUR|DELIMIT|STATEHOOD`, and full-text for co-occurrence of "Election
Commission" and "Jammu".

## 3.2 THE RESULT: in six years of MHA answers there is ONE answer on the timing of the J&K assembly election

Full subject-line sweep of the corpus, every hit, verbatim as printed:

| File | Subject line as printed | On my subject? |
|---|---|---|
| `rs-15122021_1959` | **STATEHOOD AND ELECTIONS IN JAMMU AND KASHMIR** | **YES** |
| `ls-07122021_1562` | **DELIMITATION IN J&K** | partly |
| `rs-20112019_391` | GIVING BACK STATEHOOD STATUS TO JAMMU AND KASHMIR | no — statehood only |
| `ls-19112019_285` | ELECTIONS FOR BLOCK DEVELOPMENT COUNCIL | no — BDC, not assembly |
| `rs-05022020_382` | RESOLUTION OF STATE ASSEMBLY AGAINST NPR AND CAA | no |
| `ls-11022020_1480` | SPECIFIC PROCEDURE FOR SELECTION OF CAPITAL CITY | no |
| `LS04022025_276` | SELECTION PROCEDURE OF PADMA AWARDEES | no |
| `LS24032026_5119` | DEMOCRATIC REPRESENTATION OF UT | no — read in full, about a proposed UT ministry |

Full-text sweep for "Election Commission" + "Jammu" in the same answer returned **nine files, six distinct
answers**, of which four are on unrelated subjects (undertrials in prisons, CAPF vacancies, investments and
land sale in J&K, and a duplicate).

**Finding, stated flatly: across the whole of MHA's published parliamentary answers for 2019–2024, the
Ministry of Home Affairs was asked about the timing of the Jammu and Kashmir assembly election, and
answered, EXACTLY ONCE.**

## 3.3 The one answer, verbatim — and what it does

**D13 — Rajya Sabha Unstarred Question No. 1959, "STATEHOOD AND ELECTIONS IN JAMMU AND KASHMIR", to be
answered on 15 December 2021 / Agrahayana 24, 1943 (Saka), asked by SHRI VIVEK K. TANKHA, answered by the
Minister of State in the Ministry of Home Affairs, SHRI NITYANAND RAI. RETRIEVED** as
`https://mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/rs-15122021/1959.pdf`. **Tier T1.**
*(Part 04 already carries this document as its R7/C4 for the STATEHOOD limb. I am using the ELECTIONS limb,
which part 04 quotes but does not analyse, and I flag the overlap so it is not double-counted.)*

The question, verbatim:

> (*a*) whether there is a timeline to grant statehood to the Union Territories of Jammu & Kashmir and
> Ladakh;
> (*b*) whether there is a **timeline to hold the state elections** in the Union Territories of Jammu &
> Kashmir and Ladakh; and
> (*c*) if so, the details thereof and **if not, the reasons therefor**?

The answer, verbatim and complete:

> (*a*): Statehood to Jammu and Kashmir would be granted at an appropriate time.
>
> (*b*) & (*c*): **The decision to schedule elections is the prerogative of the Election Commission of
> India.**

**Read the question and the answer against each other.** Limb (c) asks, in terms, for *the reasons* if
there is no timeline. The answer gives no reason. It identifies a different body as the decision-maker and
stops. **The Ministry of Home Affairs did not decline to answer, did not claim privilege, and did not say
the information was unavailable — it answered a question about reasons with a statement about
jurisdiction.** That is the entire official MHA record on the subject for the whole gap.

## 3.4 The jurisdictional answer is formally correct, and that is precisely what makes the record circular

MHA's answer is not evasive as a matter of law. Under **section 14(11) of the Reorganisation Act** (D1,
retrieved), "The provisions of articles 324 to 327 and 329 of the Constitution of India, shall apply in
relation to the Union territory of Jammu and Kashmir, the Legislative Assembly and the members thereof as
they apply, in relation to a State…" — so superintendence, direction and control of the election is the
Election Commission's under Article 324, and MHA is right that the scheduling decision is not its own.

**But that produces a closed loop in the published record, and the loop is the finding:**

- **The Election Commission does not answer parliamentary questions.** It is not a ministry. Questions
  touching it are answered by the **Ministry of Law and Justice**, and MHA's archive — the corpus at D12 —
  structurally cannot contain them. **My sweep therefore establishes the absence of an MHA statement, not
  the absence of a Government statement.** I say that plainly because the distinction is exactly the kind
  that gets lost downstream.
- **The Election Commission's own reasons, where it gave any, were given in press conferences and press
  notes, not in a published decision.** I retrieved no ECI document from the 2019–2023 window stating why
  an election was not being held.

## 3.5 The one reason the Government DID publish, and it is at the far end of the gap

**D14 — PIB press release, Election Commission, "General Election to Legislative Assemblies of Haryana, and
Jammu and Kashmir, 2024", Release ID 2046014, **16 AUG 2024 5:51PM by PIB Delhi**. RETRIEVED in the
browser. Tier T1** (with part 04's warning honoured: a PIB carriage of an ECI press note is the ECI's own
account of the ECI's own conduct, not an independent check on it). Verbatim:

> "Election Commission of India (hereinafter ECI) is committed to conduct free, fair, participative,
> accessible, inclusive and safe election to the Legislative Assemblies of Haryana and Jammu and Kashmir in
> exercise of the authority and powers conferred upon under Article 324 read with Article 172 (1) of the
> Constitution of India and Section 15 of the Representation of the People Act, 1951. **As per Supreme Court
> judgment dated 11th December 2023 in the matter of Writ Petition (Civil) No. 1099 of 2019, the Commission
> has also decided to take necessary steps to conduct election to the legislative assembly of UT of Jammu
> and Kashmir.**"

**This is a reason for HOLDING the election, and it is a judicial direction — not a reason for the ten
years of not holding one.** The Commission's own stated trigger is the Supreme Court's judgment. That is a
first-class finding in its own right: **on the Election Commission's own published account, the proximate
cause of the 2024 J&K assembly election was a court order.**

A small artefact from the same table, worth recording because it is the ECI's own way of writing the gap:
the table of "Term of Assembly" gives Haryana as "04.11.2019 to 03.11.2024" and **Jammu and Kashmir as
"--"**. The Commission's own schedule sheet has no term to state for J&K.

## 3.6 What the official reasons for each postponement actually were — the honest answer

**I could not establish a published official statement of reasons for any individual postponement between
2019 and 2023.** What exists, on retrieved primary documents, is a chain of statements about *sequence*
rather than *reasons*:

1. **Delimitation was in train and was officially described as the precondition-shaped step.** D2's own
   Statement of Objects and Reasons (T1) records the sequence — delimitation completed, seats fixed at 90,
   then nomination provisions. D11 (T1) fixes the delimitation order's effect at **20 May 2022**. And
   **D13's companion answer, LS Unstarred Q.1562 of 7 December 2021, "DELIMITATION IN J&K" (RETRIEVED, T1,
   `https://mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/ls-07122021/1562.pdf`)**, asked when delimitation
   would be completed and answered, verbatim: "**The endeavour of Commission is to complete the said
   exercise as early as possible.**" No date. That is the closest the Government came to explaining the
   pace of the gate that everyone treated as the gate.
2. **After 20 May 2022 the stated next step was revision of the electoral rolls** — which is Section 4 of
   this part.
3. **After 11 December 2023 the stated trigger was the Supreme Court's direction** — D14.

**Nowhere in any retrieved document does the Government of India state why an assembly election could not
be held in 2019, in 2020, in 2021 or in 2023.** Not in 4,581 MHA answers, not in three MHA Annual Reports
read in full for this part, not in any PIB release I retrieved.

## 3.7 Absence class for the reasons — `not-published`, and why not `withheld`

**What:** the Government of India's statement of the reasons for not holding a general election to the
Jammu and Kashmir Legislative Assembly in each year from 2019 to 2023.

**Tested in order.**
- **`not-collected`?** No. A decision not to hold an election in a territory under President's Rule is
  taken, and the material on which it is taken exists — the ECI's poll-preparedness assessments, MHA's and
  the J&K administration's security assessments, and the ECI's file. D14 itself records that "The
  Commission has visited these State/UT to review the poll preparedness" and "has also interacted with Home
  Secretary, Government of India" — so the assessment documents exist and are named in a public release.
- **`not-published`?** **Yes, and this is the class.** The producibility test is satisfied: these are
  documents held by identifiable bodies that could be produced under compulsion. They have not been
  released.
- **`withheld`?** **No, and I decline to upgrade it.** The class requires a NAMED REQUESTER, a SPECIFIC
  REQUEST and a DATE, with a refusal. The nearest thing I have is D13 — Shri Vivek K. Tankha, Rajya Sabha,
  15 December 2021, asking in terms for "the reasons therefor" — and **that is a named requester, a specific
  request and a date.** But MHA did not *refuse*; it answered by identifying another authority, which on
  the constitutional allocation is a correct answer to the question "who decides". **A jurisdictionally
  correct non-answer is not a refusal, and treating it as one would be classification laundering of exactly
  the kind this instrument forbids.** I record the near-miss explicitly so that a later researcher who finds
  a genuine refusal can upgrade it on evidence rather than on impatience.
- **`never-defined`?** No. "The reasons a general election was not called" is not a quantity lacking a
  definition; it is a document that was not published.

**Route — real, addressed, and each addressee stated with its verification status:**
1. A parliamentary question to the **Ministry of Law and Justice** (not MHA) asking the Election Commission,
   through that Ministry, to lay on the table the Commission's assessments and decisions on holding a
   general election to the J&K Legislative Assembly in each of 2019, 2020, 2021, 2022 and 2023. **This is
   the addressee MHA's own answer at D13 points to, and it is the one route the record itself nominates.**
2. An RTI to the **Secretary, Election Commission of India, Nirvachan Sadan, Ashoka Road, New Delhi
   110001** — that address is printed on `eci.gov.in`'s own footer, which I retrieved in the browser in
   this session, so the address is verified; the designation "Secretary" as the correct CPIO is **not**
   verified by me.
3. An RTI to the **Department of Jammu, Kashmir and Ladakh Affairs, Ministry of Home Affairs**, file stem
   **11012/02/2020-SRA** (verified and exact, from D4) for any correspondence with the Election Commission
   on the timing of the J&K assembly election, 2019–2024.

## 3.8 Both cases, in their own terms

**The case that there is nothing to explain.** The gap has a lawful and fully documented architecture and
each step is on the record: the assembly was dissolved in November 2018 by the Governor; the territory came
under President's Rule; the Reorganisation Act of 2019 required a fresh delimitation on the 2011 Census
before any election could be held on constituencies that legally existed (s.62, and D11 shows the machinery
running to completion); the delimitation order took effect on 20 May 2022; the rolls then had to be revised
on the new constituencies; and the election followed. Every one of those steps is a legally necessary
predicate, not a discretionary delay. On this reading the "reason" is the statute, MHA's answer at D13 is
not evasive but correct, and the demand for a year-by-year statement of reasons misunderstands what kind of
thing a delimitation is. The Government also delivered: the election was held, it was held on the ECI's own
account without a single repoll, and President's Rule was revoked on 13 October 2024.

**The case that the absence is the point.** Nothing in the statute set a deadline for the delimitation, and
when asked directly when it would finish the Government said "as early as possible" (LS Q.1562) — a
non-answer to a question about timing, in December 2021, three months before the Commission's first order.
The Commission's own tenure was extended more than once. Meanwhile the same period saw Lok Sabha elections
held in the same territory in 2019 and 2024, on the same rolls machinery, without waiting for anything —
so the proposition that elections were impossible in J&K is contradicted by the ECI's own conduct in the
same territory. And the one time Parliament asked for reasons, the answer named a different body; the body
named does not answer parliamentary questions; and the reason that body eventually published for acting was
that a court had told it to. **On this reading the record does not contain a reason because no organ of the
State was ever placed under an obligation to give one, and the accountability circuit was open at both
ends.**

**Do these rest on different facts, or on different weightings?** **Different weightings of the same facts,
with one genuine factual disagreement inside them.** Both sides accept the whole chronology, accept D11's
date, accept D13's text and accept D14's trigger. The one place they touch a fact rather than a weighting
is **whether an assembly election was legally possible before the delimitation took effect**. The
"nothing to explain" case treats that as settled by s.62; the "absence is the point" case answers that the
2019 general election to the Lok Sabha *was* held in J&K on pre-delimitation constituencies, so the
territory's electoral machinery was demonstrably operable, and that the legal bar, if any, applied to
assembly constituencies specifically and was created by the same Act that created the delay. **That is a
real disagreement about what the law required, and it is not resolved by any document in this part.** It is
also, note, the same disagreement now before the High Court in a different guise (§1.8).

## 3.9 If this becomes a ledger record

The poll-gap material is **the L-0092 shape, not the L-0086 shape.** Nothing here is in force and awaiting
adjudication — the gap is closed, the election happened, President's Rule was revoked. What remains is a
disagreement about how a documented sequence should be *characterised* and about the meaning of a
documented silence, on facts neither side disputes. That is the presentational-findings shape and it is
filed `contested` on the written definition. **Note this is the opposite classification from §1.10**, and
deliberately: the two subjects in this part take different shapes and should not be merged into one record.


---

# 4. THE ELECTORAL ROLLS AND THE SPECIAL SUMMARY REVISION AFTER THE DOMICILE RULES

**This closes part 05 §5.3, which recorded "NOT ESTABLISHED, and I will not guess".** It is now established
as to what was said, by whom, when, in what forum, and that it was contradicted three days later by the
J&K administration. **It is NOT established from any primary official document, and that failure is set out
in full below rather than papered over.**

## 4.1 The anchor, inherited and not re-derived

From part 05, computed from ECI's own GE statistical reports: **the J&K electorate on the post-2019
territory grew from 7,743,306 (GE 2019, Ladakh removed) to 8,802,348 (GE 2024) — +1,059,042, +13.68 %.**
That is a five-year elector-count fact and it is **not evidence about who was added.**

## 4.2 What was said, by whom, on what date, in what forum

**The statement.** **Hirdesh Kumar, Chief Electoral Officer, Union Territory of Jammu and Kashmir**, at a
**press conference in Jammu on 17 August 2022**, announcing the Special Summary Revision of electoral rolls
with 1 October 2022 as the qualifying date. His identity in the post is independently established from the
Delimitation Commission's own compendium (part 05's D2) and is not in doubt.

**D15 — The Tribune (Chandigarh), "Over 25L voters likely to be added in summary revision", dateline Jammu,
17–18 August 2022, byline "Our Correspondent". RETRIEVED via WebFetch (page fetched and read). Tier T4.**
It reports the CEO saying, and quotes him directly:

> "Before the abrogation of Article 370, there were many people who could not vote but now even they can
> cast their vote."

and reports the figure as **20 to 25 lakh new voters expected to enrol during the summary revision**, with
the schedule: draft roll 15 September 2022, claims and objections 15 September – 25 October 2022, disposals
complete 10 November 2022. It also records that **no summary revision had been carried out since 2019.**

**D16 — Brighter Kashmir, "25 lakh new voters expected to be added in J&K: J&K CEO", 18 August 2022.
RETRIEVED via WebFetch. Tier T4.** It reports the CEO saying:

> "around 25 lakh new voters are expected to be enrolled in Jammu and Kashmir after the summary revision of
> eletoral list" *(the misspelling is in the retrieved text)*
>
> "any person attaining the age of 18 years on or before October 1, 2022 and is otherwise qualified to be
> enrolled as an elector in the Electoral Roll, can apply for his registration."

and reports him saying that **"Article 370 was a barrier for those who wanted to get listed as voters"** and
that under the Representation of the People Act **"all the eligible people, regardless of their place of
residence, will be enlisted as voters"**, and that persons "not residing in J&K but having achieved the age
of 18 or above as on October 1 will be included in the voter list."

**The exact wording is not established.** D15 and D16 are two press renderings of the same press
conference and they do not agree on the number (D15: "20 to 25 lakh"; D16: "around 25 lakh"). **I retrieved
no transcript, no CEO press note and no video.** Anyone quoting "25 lakh" as the CEO's words is quoting a
newspaper, not the CEO.

## 4.3 The correction — who issued it, when, and exactly what it said

**D17 — The Tribune, "Addition of 25 lakh voters in Jammu and Kashmir is misrepresentation of facts: Govt",
**20 August 2022**, Tribune News Service. RETRIEVED via WebFetch. Tier T4.** It attributes the clarification
to the **Information Department of the Jammu and Kashmir administration**, on **20 August 2022**, and quotes
it:

> "This is a **misrepresentation of facts, which is being spread by vested interests**."
>
> "This revision of electoral rolls will cover **existing residents of the UT of J&K** and increase in
> numbers will be of the voters who have **attained the age of 18 years as on October 1, 2022 or earlier**."

**Three days. The Chief Electoral Officer speaks on 17 August; the territory's own administration says on
20 August that the resulting figure is a misrepresentation of facts spread by vested interests.**

**Read the two statements against each other, because the shape of the correction matters.**
- **What the clarification denies:** that the revision extends beyond existing residents of the UT, and
  that the increase comes from anywhere other than newly-eligible 18-year-olds.
- **What the clarification does NOT do:** it does not name the Chief Electoral Officer; it does not say the
  CEO was misquoted; it does not withdraw or correct the 20–25 lakh projection as a projection; and it does
  not come from the office that made the statement. **It is issued by the executive administration about a
  statement made by the constitutional election machinery**, which under Article 324 (applied to J&K by
  s.14(11) of the Reorganisation Act, D1) is not subordinate to it.
- **So on the retrieved record this is a contradiction, not a retraction.** A retraction comes from the
  speaker. **I found no statement by the Chief Electoral Officer or by the Election Commission of India
  withdrawing, correcting or clarifying the 17 August 2022 remarks.** That is an absence and it is
  classified at §4.6.

## 4.4 What the revision actually produced — and the numbers do not support the projection

Reported figures for the SSR 2022, final publication **25 November 2022** (all **T4, and all RELAYED — see
§4.5 for the retrieval failure**): total electors **8,359,771** (42,91,687 male, 40,67,900 female, 184 third
gender); **net increase 772,872** over the draft roll, a 10.19 % net increase; photo coverage 99.99 %;
attributed to **Anil Salgotra, Joint Chief Electoral Officer**.

Set against the anchor, and this is the part that can be stated with confidence because the endpoints are
part 05's own ECI-derived numbers:

| Point | Electors | Source status |
|---|---|---|
| GE 2019, post-2019 territory (Ladakh removed) | **7,743,306** | part 05, from ECI statistical reports |
| SSR 2022 final roll, 25 November 2022 | **8,359,771** | **T4, RELAYED** |
| GE 2024 | **8,802,348** | part 05, from ECI statistical reports |
| **Total growth 2019 → 2024** | **+1,059,042 (+13.68 %)** | part 05 |

**The projection was 20–25 lakh. The entire five-year growth of the J&K electorate, across two general
elections, two special summary revisions and the whole post-domicile period, was 10.59 lakh — under
half the bottom of the projected range, and roughly two-fifths of the top of it.** Whatever the CEO meant,
the outcome did not resemble the number that was reported.

**But note precisely what that does and does not establish.** It establishes that **the projection was
wrong by a factor of about two.** It establishes **nothing whatever about who was added.** A net figure is
compatible with very large gross additions and very large deletions — indeed one retrieved press account
frames the same revision as "highest ever addition of 11 lakh new voters; net increase at 7.72 lakh", which
if true means roughly 3.3 lakh deletions in the same exercise. **Gross additions, gross deletions and the
domicile status of either are not established by anything in this part, and no figure in this part may be
used to characterise the composition of the roll.**

## 4.5 What I could not retrieve, exactly

**No primary document on this subject was retrieved. None. I state the attempts so a reader can see that
this is a retrieval failure and a publication gap, not an inference:**

- `ceojk.nic.in` — resolves to **45.127.74.180** via `dig @1.1.1.1`, but `curl` with a browser User-Agent
  and an explicit `--resolve` override returns **HTTP 000, zero bytes**, over both https and http. The host
  answers DNS and refuses connections. **This is not the DNS failure part 05 recorded; it is a live refusal,
  and that distinction should travel forward.**
- `jkdirinf.jk.gov.in` (the J&K Department of Information and Public Relations, which is the department
  that issued D17's clarification and which a search result shows hosts a page titled "J&K's final electoral
  rolls published: Chief Electoral Officer" at `news_slider_details.php?news_id=14971`) — resolves to
  **164.100.223.161**, and returns **HTTP 000, zero bytes** over https and http with `--resolve`, and the
  headless browser refuses to navigate to it. **The single most on-point official document located in this
  entire subject is on a host that will not answer.**
- `www.eci.gov.in` — reachable in the headless browser (I used it successfully for Section 2), but **I did
  not locate any ECI press note on the J&K SSR 2022 or on the CEO's remarks.** I searched the ECI
  delimitation area, not an exhaustive sweep of the ECI press-note archive. **This is an unattempted
  retrieval, not an established absence,** and I flag it as the single most promising unclosed route in this
  part.
- PIB — no release on the J&K SSR 2022 controversy was located.
- MHA parliamentary answers — **the 4,581-answer corpus at D12 contains no answer whose subject line
  concerns electoral rolls in J&K**, which is consistent with §3.4: electoral rolls are the Election
  Commission's business and MHA is not the answering ministry.

## 4.6 Absences, classified

**(a) A primary text of what the Chief Electoral Officer said on 17 August 2022 — `not-published`.**
Not `not-collected`: a press conference was held, a schedule was announced, and the CEO's office issues
press notes as a matter of routine — the document class exists and the announcement plainly had a written
basis (the SSR schedule with its five dates was read out). Not `withheld`: no named requester, no specific
dated request, no refusal located. **Route:** RTI to the Chief Electoral Officer, Jammu and Kashmir, for the
press note, schedule and any transcript or recording of the press conference of 17 August 2022, and for any
subsequent clarification issued by that office. **The CEO's office address is not verified by me and
`ceojk.nic.in` does not answer, so this route has an unverified addressee — I flag that rather than invent
one.**

**(b) Any clarification, correction or retraction BY the Chief Electoral Officer or the Election Commission
— NOT ESTABLISHED AS AN ABSENCE.** I searched and did not find one. Given that `ceojk.nic.in` will not
answer and that I did not sweep the ECI press-note archive, **the honest statement is that I do not know
whether one exists.** A failed fetch is not evidence of an absence. **Do not author "the CEO never
clarified" from this part.** What IS established is that **the clarification that was made public on
20 August 2022 came from the J&K administration's Information Department, not from the electoral
machinery** (D17).

**(c) Gross additions, gross deletions and the domicile composition of the 2022 and 2024 rolls —
`not-published`.** The Election Commission and the CEO hold form-wise Form 6 (addition), Form 7 (deletion)
and Form 8 (correction) counts for every revision as a matter of course; these are produced for every
State's SSR. For J&K they were reported in press accounts and, so far as I could retrieve, in no official
publication I could open. Producible under compulsion, therefore `not-published`. **Not `withheld`** — I
found no named requester and no dated refusal. **Route:** RTI to the Election Commission of India,
Nirvachan Sadan, Ashoka Road, New Delhi 110001 (address verified from `eci.gov.in`'s own footer, retrieved
in the browser this session; the correct CPIO designation is not verified), for the SSR 2022 and SSR 2024
Form 6/7/8 statistics for the UT of Jammu and Kashmir, AC-wise.

**(d) "Who was added" as a characterisation — `never-defined`, and I will not build a route for it.** The
public argument is about whether "outsiders" were added to the J&K roll. **The rolls do not record domicile
status; they record ordinary residence under section 19 of the Representation of the People Act, 1950.**
There is therefore no quantity called "non-local voters added" that any register holds, because the
category is not one the instrument collects. This is precisely the `never-defined` case: not "nobody has
counted it" but "the thing has no agreed definition in the instrument that would have to count it".
**No route exists and I am not going to invent one.**

## 4.7 Both cases, in their own terms

**The case that the 2022 statement was an administrative correction of a longstanding disenfranchisement.**
The Representation of the People Act, 1950 has always keyed the franchise to **ordinary residence**, not to
citizenship of a State or to a domicile certificate. Before 2019, J&K ran a separate roll for assembly
elections under the J&K Representation of the People Act 1957, restricted to "permanent residents", which
meant that people ordinarily resident in J&K — long-serving employees, students, labourers, and the
descendants of West Pakistan refugees and Valmiki and Gorkha communities — could vote for the Lok Sabha but
not for the assembly that governed them. The CEO's remark that "there were many people who could not vote
but now even they can" describes that, and MHA's own Annual Report 2022-23 (RETRIEVED, T1, para 14.8) says
the same thing in the Government's own words: "**People of the Valmiki community, Gorkhas, and refugees from
Western Pakistan now have the right to cast their vote in UT elections.**" On this reading the projection
was a bad estimate by an official speaking loosely at a press conference, promptly corrected, and the
outcome — a net addition under half the projection, and a five-year growth of 13.68 % on a base that had not
been revised since 2019 — is what demographic catch-up looks like.

**The case that the statement revealed the design and the correction was damage control.** The CEO did not
say "previously excluded permanent residents"; on the retrieved renderings he said "**regardless of their
place of residence**" and that persons "**not residing in J&K**" would be included, and he tied it explicitly
to the abrogation of Article 370 rather than to any provision of the 1950 Act — which had applied to J&K's
parliamentary roll all along and did not change in 2019. The number he gave was not a marginal correction:
20–25 lakh against a 2019 base of 77.4 lakh is **26 % to 32 % of the entire electorate**, announced three
months after the delimitation order took effect and in the run-up to the first assembly election in eight
years. The correction came within 72 hours, from the **executive**, not the electoral authority, in language
that attacked the reporting ("vested interests") rather than the speaker, and it substituted a narrower
proposition — 18-year-olds only — that is not what was said. And the correction's own substitute does not
survive arithmetic either: 18-year-olds alone cannot produce 20–25 lakh on a 77 lakh base in one revision.
**On this reading two official statements three days apart are mutually inconsistent, neither was
withdrawn, and the underlying figures that would settle it have never been published.**

**Do these rest on different facts or on different weightings?** **Genuinely different facts, and this is
the one place in this whole part where that is true.** The two readings disagree about **what the CEO
actually said** — whether the operative phrase was about previously-excluded *residents* or about people
"regardless of place of residence" — and that is a question of fact with a determinate answer that a
transcript would settle. **No transcript was retrieved and none is published.** They also disagree about
**what the 20–25 lakh figure was a projection OF**, which the CEO's own press note would settle and which is
likewise unretrieved. So the disagreement is not irreducible; it is unresolved because **the primary record
of a press conference held by a constitutional authority about the electorate of a territory has not been
published, and the two secondary renderings I could retrieve do not agree with each other.** That is the
finding: **the dispute is empirically settleable and the document that would settle it is missing.**

## 4.8 If this becomes a ledger record

**The L-0092 shape — presentational findings — filed `contested`.** Two official statements three days
apart, neither withdrawn, a projection falsified by a factor of about two by the outcome, and a public
argument conducted over a characterisation ("who was added") that no register defines. Nothing here is in
force awaiting adjudication, so it is not the L-0086 `too-early` shape. **I am not proposing any new enum
value.**


---

# 5. ADDENDUM TO SECTION 1 — the voting question, re-argued on documents retrieved after §1.5 was written

Two retrievals made after Section 1 was drafted change the strength of the argument, though not the
absence class. Both are recorded here rather than by editing §1.5, so the sequence of what I knew when is
visible.

## 5.1 The Commission's own reasoning, retrieved primary — and the recommendation is TWO items, not one

**D18 — Election Commission of India / Delimitation Commission, *Delimited Landscape of Union Territory of
Jammu & Kashmir*, the Commission's compendium. RETRIEVED.** Downloaded in the headless browser from
`https://www.eci.gov.in/Documents/Delimitation/DelimitedLandscapeOfUnionTerritoryOfJammuKashmir.pdf` —
save-dialog route, recovered from `~/Downloads`, **33,563,204 bytes, 240 pages**, `pdftotext -layout` clean.
**Tier T1.** The Recommendation is signed **"(K.N. Bhar), Secretary"**.

The Commission's reasoning, verbatim, on why it could not itself do what was asked:

> "We find substance in the grievances of the Kashmiri Migrants. Their plight is unparalled. However, it is
> not possible for us to reserve seats for them or direct the Government to nominate their representatives
> to the Legislative Assembly or to Parliament. This exercise does not fall within the purview of our
> mandate. **Law does not confer such power on us.** Besides in both the above mentioned cases there were
> clear constitutional or statutory provisions empowering Government to reserve seats or nominate persons
> to the Legislative Assembly. **Such legal provisions are absent here. Unless there is a statutory base no
> such exercise can be conducted.**"

And the recommendation itself, verbatim, **as two separately numbered items**:

> "However, we feel it appropriate to recommend to the Government for its sympathetic consideration the
> following:
> **(i)** Provision of at least two members (one of them must be a female) from the community of Kashmiri
> Migrants in the Legislative Assembly.
> **(ii)** Such members may be given power at par with the power of nominated members, of the Legislative
> Assembly of Union Territory of Puducherry."

**This sharpens §1.3 materially. The powers proposal is not a subordinate clause inside a single
recommendation — it is recommendation (ii), a separate numbered item. Parliament enacted (i) and did not
enact (ii).** Anyone quoting the recommendation as a single sentence is quoting it wrongly; the retrieved
text has two items and only one of them became law.

## 5.2 The Puducherry holding — still RELAYED, but now relayed inside a T1 official publication

D18 states, in the Commission's own words:

> "The Government of India issued Notification dated 23.06.2017 nominating three persons as members of the
> Legislative Assembly of the Union Territory of Puducherry. Several writ petitions were filed in the Madras
> High Court… The Madras High Court repelled the challenge and upheld the nominations. The matter was
> carried to the Supreme Court. **The Supreme Court not only upheld the nominations but further held that
> the nominated members will be entitled to vote in the sittings of the Legislative Assembly.**"

and sets out the statutory setting: Article 239-A; the **Government of Union Territories Act, 1963**;
**s.3(2)** (thirty directly-elected seats) and **s.3(3)** — "the **Central Government** may nominate not more
than three persons, **not being persons in the service of the Government**, to be members of the Legislative
Assembly of the Union Territory".

**Status, stated exactly:** **K. Lakshminarayanan v. Union of India, (2020) 14 SCC 664, remains NOT
RETRIEVED.** What I now have is the holding **relayed inside a document I did retrieve from the Election
Commission's own host**. That is materially better than a press account and materially worse than the
judgment. **Grade it T4 as a relay, while noting the relaying document is T1** — the tier rule grades the
document retrieved, and what I retrieved for this proposition is a compendium describing a judgment, not
the judgment. **No quotation from the judgment may be authored from this part.** `api.sci.gov.in` IS
reachable with `curl --resolve api.sci.gov.in:443:103.195.217.72` (I proved it in this session by pulling an
unrelated 54-page SCI judgment, HTTP 200, 192,963 bytes) — **so the judgment is retrievable by anyone who
finds its case/diary number, and that is a five-minute job for the next agent.**

**And note the divergence D18 itself exposes, which cuts against the comparator:** Puducherry's nominating
authority under s.3(3) of the 1963 Act is **the Central Government**; J&K's under ss.15/15A/15B is **the
Lieutenant Governor**. The two schemes differ on the single most contested point in the live litigation
(§1.8). A holding on the 1963 Act therefore transfers less cleanly than "power at par" implies.

## 5.3 The strongest textual argument on the voting question — from the 2019 Act itself, and it favours Reading A

Re-reading D1 in full for this addendum turned up two sections neither §1.5 nor any account of this
controversy I encountered takes into consideration. Both are verbatim from the Gazette text (D1).

**Section 22 — "Rights of Ministers and Advocate General as respects Legislative Assembly":**

> "**22.** Every Minister and the Advocate-General for the Union territory of Jammu and Kashmir shall have
> the right to speak in, and otherwise to take part in the proceedings of, the Legislative Assembly, and to
> speak in, and otherwise to take part in the proceedings of, any committee of the Legislative Assembly of
> which he may be named a member, **but shall not by virtue of this section be entitled to vote.**"

**Section 25(1) — "Voting in Assembly":**

> "**25.** (*1*) Save as otherwise provided in this Act, all questions at any sitting of the Legislative
> Assembly shall be determined by a **majority of votes of the members present and voting**, other than the
> Speaker or person acting as such."

**Put those three provisions together and the argument is this.** The Act's default voting rule (s.25(1))
operates on "**members**". Sections 15, 15A and 15B each authorise the Lieutenant Governor to "**nominate…
members to the Legislative Assembly**" — the word is *members*, and the Fourth Schedule oath form (D1) is a
single form for a person "having been **elected (or nominated)** a member". **And the Act demonstrably knows
how to withhold a vote when it means to: section 22 does exactly that, in terms, for the one class of
persons who may take part in proceedings without being members.** On the ordinary canon that an express
exclusion in one place implies none elsewhere, the absence of any such words in ss.15/15A/15B is a strong
indication that nominated members vote.

**I state the limits of that argument honestly, because I am not a court.** (a) Section 22's exclusion is
narrowly framed — "**by virtue of this section**" — which is language aimed at not conferring a vote rather
than at removing one, and a court could read it as carrying no implication either way. (b) The Delimitation
Commission plainly thought the point needed express provision, and it had the whole Act in front of it when
it thought so. (c) The Union's own affidavit in the High Court, on the relayed account at §1.8, defends the
LG's discretion and — so far as relayed — does not run this argument, which is at least mildly telling.

**Effect on §1.5.** Reading A is now considerably the stronger of the two on the retrieved text, and the
part should say so rather than affect neutrality: **on the words of the Act, nominated members of the J&K
Legislative Assembly appear to be members for the purposes of section 25(1) and therefore to vote.** But
**the absence class does not change and must not be changed.** `never-defined` was assigned because no
agreed definition of the powers of a nominated member exists in the enacted law, and that remains exactly
true: a strong inference from s.22 and s.25(1) is an argument, not a definition, and the question is
currently before the High Court of Jammu & Kashmir and Ladakh precisely because the Act does not answer it
on its face. **A record authored from this part must present the s.22/s.25(1) argument, must not present it
as settled, and must keep the `never-defined` classification.**


---

# 6. CLOSING — retrieval ledger, environment findings, and everything I could not establish

## 6.1 Retrieval ledger for this part

**RETRIEVED — I fetched the bytes and read them.**

| # | Document | Where from | Tier |
|---|---|---|---|
| D1 | J&K Reorganisation Act 2019 (34 of 2019), full Gazette text | `egazette.gov.in/WriteReadData/2019/210407.pdf` via `--resolve` | T1 |
| D2 | J&K Reorganisation (Amendment) Bill 2023, Bill No. 100 of 2023, as introduced, with SOR | `prsindia.org/files/bills_acts/bills_parliament/2023/…Bill,%202023.pdf` | T1 |
| D4 | MHA-hosted scan containing **Act 35 of 2023** and **S.O. 5458(E) of 26.12.2023** | `mha.gov.in/sites/default/files/2024-09/J&KReorganisatiG_04092024_0.pdf` | T1 |
| D4b | Act 35 of 2023, Gazette No. 43 of 15.12.2023, clean text layer | `egazette.gov.in/WriteReadData/2023/250692.pdf` via `--resolve` | T1 |
| D6 | MHA Annual Report 2023-24, para 15.6 | `mha.gov.in/sites/default/files/AnnualReport_27122024.pdf` | T1 |
| — | MHA Annual Report 2022-23, para 14.8 | `mha.gov.in/sites/default/files/AnnualReportEngLish_11102023.pdf` | T1 |
| D7 | J&K Legislative Assembly members directory, NeVA | `jkla.neva.gov.in/ContactDirectory/MenuContactDirec` (browser) | T1 |
| D8 | Greater Kashmir / PTI, 8 Oct 2024, nomination row | greaterkashmir.com (WebFetch) | T4 |
| D9 | PIB, MHA, Amit Shah's LS reply, 6 Dec 2023, PRID 1983311 | `pib.gov.in` (browser) | T1 |
| D10 | PIB, ECI, Delimitation Commission finalises order, 5 May 2022, PRID 1822939 | `pib.gov.in` (browser) | T1 |
| D11 | **S.O. 2223(E) of 20 May 2022**, Ministry of Law and Justice — the delimitation effective-date order | ECI download endpoint (browser save-dialog route) | T1 |
| D12 | MHA parliamentary-answer corpus, 4,590 PDFs / 4,581 text-extracted | `mha.gov.in/MHA1/Par2017/…` | T1 |
| D13 | RS Unstarred Q.1959 of 15.12.2021, STATEHOOD AND ELECTIONS IN J&K | `mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/rs-15122021/1959.pdf` | T1 |
| — | LS Unstarred Q.1562 of 07.12.2021, DELIMITATION IN J&K | `mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/ls-07122021/1562.pdf` | T1 |
| D14 | PIB, ECI, election announcement 16 Aug 2024, PRID 2046014 | `pib.gov.in` (browser) | T1 |
| D15 | The Tribune, 17–18 Aug 2022, "Over 25L voters likely to be added…" | tribuneindia.com (WebFetch) | T4 |
| D16 | Brighter Kashmir, 18 Aug 2022, "25 lakh new voters expected…" | brighterkashmir.com (WebFetch) | T4 |
| D17 | The Tribune, 20 Aug 2022, "…misrepresentation of facts: Govt" | tribuneindia.com (WebFetch) | T4 |
| D18 | ECI, *Delimited Landscape of Union Territory of Jammu & Kashmir*, 240 pp | `eci.gov.in/Documents/Delimitation/…pdf` (browser save-dialog route) | T1 |

**RELAYED — known only through another document.**

| Item | Relayed through | Tier |
|---|---|---|
| The holding in **K. Lakshminarayanan v. Union of India (2020) 14 SCC 664** that nominated members of the Puducherry assembly are entitled to vote | D18 (an ECI publication, T1, describing the judgment) | T4 as a relay |
| The definition of "Migrant" in cl.(e) of s.2 of the **J&K Migrant Immovable Property Act, 1997** | PRS bill summary | T4 |
| The **MHA affidavit of August 2025** in the High Court, and the litigation chronology at §1.8 | search-engine extraction of pages I did not open | T4 |
| SSR 2022 final-roll figures (8,359,771 electors; +772,872 net) | press accounts only | T4 |

**NOT RETRIEVED — attempts recorded so no absence is manufactured from a network condition.**

| Target | Result |
|---|---|
| `api.sci.gov.in` for **K. Lakshminarayanan** | **The host IS reachable** (`--resolve api.sci.gov.in:443:103.195.217.72`, proved with an unrelated judgment, HTTP 200). **I did not find the case's diary number.** Retrieval failure, not an absence. |
| `main.sci.gov.in` | resolves to 164.100.85.60; HTTP 000 |
| `ceojk.nic.in` | resolves to **45.127.74.180**; HTTP 000 over https and http with `--resolve`. **Live refusal, not DNS failure.** |
| `jkdirinf.jk.gov.in` (J&K Dept of Information — holds the official page on the final electoral rolls) | resolves to **164.100.223.161**; HTTP 000 both schemes; headless browser refuses |
| `jklegislativeassembly.nic.in`, `jkassembly.nic.in` | HTTP 000 — **but `jkla.neva.gov.in` is the working replacement and gave D7** |
| `scroll.in`, `business-standard.com` | HTTP 403 |
| `outlookindia.com` | connection timed out |
| `egazette.gov.in` ASP.NET search UI (`SearchMenu.aspx`) | 200 but renders empty to `curl`; postback-driven, not driven |
| ECI press-note archive for the J&K SSR 2022 | **not attempted exhaustively** — the single most promising unclosed route in this part |

## 6.2 Environment findings that must travel forward

1. **`egazette.gov.in`, `sansad.in`, `indiacode.nic.in`, `legislative.gov.in` and `api.sci.gov.in` are NOT
   dead.** The system resolver fails on them. `dig +short @1.1.1.1 <host>` then
   `curl --resolve <host>:443:<ip> -A '<browser UA>'` works. Verified addresses this session:
   `egazette.gov.in` **164.100.190.144**, `sansad.in` **164.100.252.170**, `indiacode.nic.in`
   **94.202.207.51/.59**, `legislative.gov.in` **164.100.220.71**, `api.sci.gov.in` **103.195.217.72**,
   `sci.gov.in` **164.100.224.38**. **Part 05's and L-0123's "DNS fails" lines should be re-read as
   "the resolver fails", and part 05 §3.8's route via `egazette.gov.in` is now open.**
2. **The `www.` prefix matters on `mha.gov.in` and it matters in both directions.** `www.mha.gov.in` serves
   `/sites/default/files/…` and `/en/documents/…`; it returns **no response at all** for
   `/MHA1/Par2017/…`. The bare host `mha.gov.in` serves the parliamentary archive. Part 04's index URL,
   which carries the `www.`, does not fetch.
2b. **`sansad.in` file endpoints work without knowing the search API:**
   `https://sansad.in/getFile/loksabhaquestions/annex/<session>/AU<qno>.pdf?source=pqals` and
   `https://sansad.in/getFile/annex/<session>/AU<qno>.pdf?source=pqars` both return PDFs (tested, HTTP 200).
   **The question-search API is not `api_ls/question/*` — those 404, and `api_ls/Question/GetQuestion`
   returns 403.** I did not find the right endpoint.
3. **`jkla.neva.gov.in` is the live, official J&K Legislative Assembly presence** and it is browser-only
   (`curl` gets nothing). It carries the members directory, business, questions, debates and daily
   bulletins. **This host was not known to part 05 or to L-0123, and it is the route to J&K assembly
   proceedings that L-0123's caveat says was unavailable.** L-0123's caveat that "No J&K Legislative
   Assembly proceedings record of any date was retrieved" should be revisited against this host.
4. **eci.gov.in PDF downloads via the browser save-dialog route work**, including through the obfuscated
   `eci-backend/public/api/download?url=…` endpoint. That is how D11 and D18 were obtained.
5. **`web.archive.org` playback was not used and was not needed.**

## 6.3 Everything I could not establish, stated plainly

1. **The text of K. Lakshminarayanan v. Union of India.** Retrievable; I did not find the case number.
2. **Clause (e) of section 2 of the J&K Migrant Immovable Property Act, 1997** — the operative definition
   of who is a "Migrant" for a seat in the legislature. Not retrieved. `indiacode.nic.in` is now known to be
   reachable via `--resolve` and this should be closed there.
3. **Any court document in the pending High Court challenge to ss.15/15A/15B**, and therefore the exact
   words of the MHA affidavit. Everything in §1.8 is relayed.
4. **Whether any nomination has been made between 25 March 2026 (D7's last-updated stamp) and 3 August
   2026.** D7 shows zero; I cannot exclude a very recent change the portal has not ingested.
5. **Whether the Lieutenant Governor has ever formed or recorded an opinion under section 15.**
   `not-published` (§1.9(b)).
6. **Any official statement of reasons for not holding a J&K assembly election in 2019, 2020, 2021, 2022 or
   2023.** `not-published` (§3.7). MHA's archive is exhausted; the Ministry of Law and Justice's is not,
   and that is the correct next addressee.
7. **A primary text of the Chief Electoral Officer's remarks of 17 August 2022** — no press note, no
   transcript, no recording. `not-published` (§4.6(a)). The two press renderings I retrieved disagree with
   each other on the number.
8. **Whether the Chief Electoral Officer or the Election Commission ever clarified or retracted those
   remarks.** **NOT ESTABLISHED EITHER WAY.** Do not author "the CEO never clarified".
9. **Official SSR 2022 and SSR 2024 figures for J&K from an ECI or CEO source.** Every figure in §4.4 is
   press-derived. `not-published` as to Form 6/7/8 detail (§4.6(c)).
10. **The Delimitation Commission's Order No. 1 (O.N. 6(E), 14.03.2022) and Order No. 2 (O.N. 17(E),
    05.05.2022) in English.** D11 gives their Gazette numbers; I did not fetch them. Not attempted, not an
    absence.
11. **The Lok Sabha debate of 6 December 2023**, which would show whether the Home Minister said
    "reservation" or "nomination" on the floor (§1.12(a)).
12. **Which of the two conflicting official Kashmiri-Migrant population figures is correct, and why they
    differ** (§1.12(b)). `not-published` as to the register.

## 6.4 Shapes, for the record — no new enum value is proposed

- **Nominated members (Section 1 + Section 5):** the **L-0086 shape** — in force since 26 December 2023,
  testable in principle, awaiting external adjudication in the High Court of Jammu & Kashmir and Ladakh.
  Filed on the `too-early` written definition.
- **The 2014–2024 poll gap (Section 3):** the **L-0092 shape** — presentational findings on an agreed
  chronology. Filed on the `contested` written definition.
- **The electoral rolls and the August 2022 statement (Section 4):** the **L-0092 shape**, filed
  `contested`, with the qualification at §4.7 that the disagreement here is empirically settleable and the
  settling document is unpublished.
- **The delimitation effective date (Section 2):** not a record at all — a **fact**, now established, that
  every J&K electoral series in this instrument needs as its break date. **20 May 2022.**

*End of part 05b.*
