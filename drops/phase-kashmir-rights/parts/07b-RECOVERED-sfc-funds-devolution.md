# 07b — RECOVERED: J&K panchayat funds, functions, functionaries

**PROVENANCE OF THIS FILE.** This is a stage-2 fan-out child's report, preserved **verbatim**. Its
parent (`07-panchayat-local.md`) died on an API session limit before folding it in, and the child
itself **wrote no files** — this report existed only in the orchestrator's context. Same shape as
phase 11's `06b-caso-and-source-attribution.md`, and the same remedy: preserve, do not re-derive,
and let stage 3 reconcile it against `07-panchayat-local.md` rather than assuming either supersedes
the other.

**Model serving the child: opus (`claude-opus-5`), self-reported.** Per the spec the run report
states the observed model; this is the child's own statement and not a transcript reading, and is
recorded at that strength.

**A note carried on the notification, not from the child:** the safety classifier
(`claude-sonnet-5[1m]`) was unavailable when this subagent's work was reviewed. Its output is
therefore unreviewed by that layer. Nothing in it is acted on without stage-3 and stage-4 checks.

**Do not treat §9's relayed figures as established.** The child says so itself, repeatedly. Anything
marked RELAYED or "not asserted" stays that way through authoring.

---

## RETRIEVAL ENVIRONMENT (verified by the child itself)

**Reachable (curl with browser UA):** `panchayat.gov.in` (200), `www.mha.gov.in` (200),
`www.pib.gov.in` (200), `static.pib.gov.in` (200), `cdnbbsr.s3waas.gov.in` (200), `cag.gov.in` (200),
`web.archive.org` (200), `prsindia.org` (200), `www.india.gov.in` (200).

**Failed from this environment — exact results:**
- Connect timeout (000 after 20s): `jk.gov.in`, `rdd.jk.gov.in`, `jksec.nic.in`, `jkpanchayat.nic.in`,
  `jkgad.nic.in`, `ladakh.gov.in`, `jklaw.nic.in`, `jk.data.gov.in`, `egramswaraj.gov.in`,
  `fincomindia.nic.in`.
- WebFetch `getaddrinfo ENOTFOUND`: `www.indiacode.nic.in`, `fincomindia.nic.in`, `ladakh.gov.in`,
  `newsonair.gov.in`.
- `eparlib.sansad.in` → **`connect ECONNREFUSED 164.100.166.186:443`** (DNS resolves, TCP refused).
  `sansad.in`, `egazette.gov.in`, `loksabha.nic.in` → 000.
- **WebFetch cannot reach `web.archive.org`** ("Claude Code is unable to fetch from web.archive.org")
  — but **curl can**. The archive was the route to India Code and jkgad.

The child states only that *this environment* could not reach those hosts.

---

## 1. THE 73rd/74th AMENDMENTS AND J&K — instrument chain

**RETRIEVED — T1.** J&K Reorganisation Act 2019 (Act 34 of 2019), full text, 61pp:
`https://web.archive.org/web/2023id_/https://www.indiacode.nic.in/bitstream/123456789/15875/1/the_jammu_and_kashmir_reorganisation_act_2019.pdf`

- **s.95 "Territorial extent of laws"**: *"All Central laws in Table-1 of the Fifth Schedule to this
  Act, on and from the appointed day, shall apply in the manner as provided therein…"*
- **s.96 "Power to adapt laws"**: the Central Government may, *"before the expiration of one year from
  that day, by order, make such adaptations and modifications of the law, whether by way of repeal or
  amendment, as may be necessary or expedient."*
- **Appointed day = 31st October, 2019**, notified by **S.O. 2889(E) dated 09 August 2019**
  (footnote to s.2(a)).
- **Fifth Schedule, TABLE-4** ("STATE ACTS INCLUDING GOVERNOR'S ACTS THAT SHALL REMAIN IN FORCE…"),
  **entry 97: "The Jammu and Kashmir Panchayati Raj Act, 1989. — IX of 1989."** So the 1989 Act was
  *preserved*, not replaced.

**Arithmetic that matters:** appointed day 31 Oct 2019 + one year = 30 Oct 2020. The DDC amendment
(below) is dated **16.10.2020** — inside the s.96 window by 14 days.

**COULD NOT ESTABLISH / NOT RETRIEVED:** the child did **not** retrieve the text of **C.O. 272 of
5 August 2019** or of the Constitution (Application to Jammu and Kashmir) Order 1954.
`ladakh.gov.in` (which hosts a C.O. 272 page) is unreachable; Wayback attempts on a guessed PDF path
returned 404. It therefore cannot quote C.O. 272 or identify which clause carried Part IX/IX-A.
Anything about C.O. 272 mechanics would be RELAYED from search snippets, and is not asserted.

**RELAYED — T4.** MHA Year Ender 2020 (RETRIEVED, T1, see §6) *characterises* the DDCs as *"the last
and final step in establishing a fully functional Panchayati Raj System in the Union Territory of
Jammu & Kashmir as mandated under the 73rd Constitutional Amendment, 1992."* That is the ministry's
own characterisation, not an instrument.

---

## 2. THE DDC INSTRUMENT — EXACT NUMBER CONFIRMED

**RETRIEVED — T1.** India Code, *Jammu and Kashmir Panchayati Raj Act, 1989 (Act No. IX of 1989)*,
as-amended text, 105pp:
`https://web.archive.org/web/2023id_/https://www.indiacode.nic.in/bitstream/123456789/16478/1/panchayati_raj_act,_1989.pdf`

**The instrument is `S.O. 3654(E) dated 16.10.2020`. Not 3465(E).** It appears as the amending
footnote on dozens of sections. Confirmed footnotes include:

- *"Section 2A inserted ibid"* — new **s.2A**: *"Throughout the Act, for 'District Planning and
  Development Board' wherever then occur substitute 'the District Development Council.'"*
- *"Substituted by S.O. 3654(E) dated 16.10.2020"* → **s.45** (Establishment of DDC), **45-A**
  (Constitution), 45-B, 45-C, 45-D.
- *"Chapter XII-A inserted by S.O. 3654(E) dated 16.10.2020"* → **ss.47A–47B, District Planning
  Committee**.
- *"Section 47 substituted ibid"*, *"Section 10 omitted"*, *"Chapter I-A inserted ibid"* (Ward Majlis /
  Halqa Majlis), *"Section 15-A inserted"*, *"Section 26 substituted"*.

**Separately RETRIEVED:** the J&K Finance Commission Act 2011 carries footnotes *"Substituted by
S.O. 1229(E) dated 31.03.2020"* — i.e. the **J&K Reorganisation (Adaptation of State Laws) Order
2020, S.O. 1229(E), 31 March 2020**, which replaced "State" with "Union territory of Jammu and
Kashmir" throughout and **deleted the word "State" from the Commission's own name**.

---

## 3. WHAT THE DDC ACTUALLY DOES (exact statutory text)

All from the RETRIEVED India Code text.

**s.45**: *"For each district there shall be a District Development Council, having jurisdiction, over
the entire district excluding, such portions of the district as are included in a Municipality or
Municipal Corporation…"*

**s.45-A**: DDC = (a) directly elected members from territorial constituencies; (b) MLAs whose
constituencies lie within the district; (c) Chairpersons of all BDCs. **s.45-A(2)**: elected members
*"shall be fourteen in number."* **s.45-A(8)**: *"The Additional District Development Commissioner of
the District shall be the Chief Executive Officer of the District Development Council."*
**s.45-A(9)**: term five years.

**s.46 — powers** (the marginal heading still reads "District Planning and Development Board"; s.2A
does the renaming). Amended to add *"in addition to functions specified in Schedule III"*. Key clause,
**s.46(ii-a)** (inserted by S.O. 3654(E)):

> *"to receive all Block Level Plans and consolidated panchayat Plans from Block Development Council;
> compile, consolidate and integrate all plans into the District Plan and forward to the District
> Planning Committee which shall form the basis for the District Plan"*

Clauses (iii) and (iv) were **omitted** by S.O. 3654(E). Retained: (v) lay down policy guidelines for
BDC/Halqa Panchayat; (vi) **approve the budget of the Block Development Council**; (vii)
poverty/employment measures; (ix) *"such other functions and duties as may be assigned or entrusted to
it by the Government of the Union territory of Jammu and Kashmir from time to time."*

**s.47 (substituted) — finance.** *"(4) Every District Development Council shall have a fund to be
called the District Development Council Fund comprising grants by the Government and own resources."*
**There is no taxing power conferred on the DDC in s.47.** *"(2) The District Development Council
shall pay the remuneration to such staff out of its own resources."*

**Schedule III (See Section 46)** — the DDC's substantive functions, hedged three ways:
> *"I. It shall be the duty of the District Development Council to meet the requirements of area in
> respect of the matters contained in this Schedule… **subject to availability of funds under various
> schemes**."*
> *"III. The District Development Council shall perform its functions **strictly as per the guidelines
> for estimation of the projects, expenditure sanction and implementation framework issued by the
> Government**."*
> *"V. The Government may, by general or special order, add to any of the functions… **or withdraw the
> functions and duties entrusted** to such a District Development Council…"*

**THE CENTRAL FINDING ON DDC POWER — s.47A/47B, District Planning Committee.** The DPC, not the DDC,
holds the district budget:

> **s.47B**: *"The District Planning Committee shall perform the following functions: … (iii) **to
> formulate and finalise the plan and non-plan budget for the District**."*

**s.47A** composition: MPs; MLAs; **the Chairperson of the DDC** (one seat); Chairpersons of Town
Area/Municipal Committees; President of Municipal Council/Corporation; District Development
Commissioner; Additional DDC; District Statistics and Evaluation Officer; Chief Planning Officer; and
*"(x) All District Level officers shall be ex-officio members of the Committee."*
**s.47A(2): "The Member of Parliament representing the area shall be the Chairperson of the
Committee."**

**The child's analysis, flagged BY THE CHILD as analysis:** this DPC is chaired by an MP and is
numerically dominated by ex-officio officials, with the elected DDC holding a single seat. Article
243ZD(2)(a) requires four-fifths of a DPC to be elected by and from among elected members of the
district panchayat and municipalities. **The child did not retrieve the text of Article 243ZD**, and
flags the apparent divergence as requiring verification against the constitutional text rather than
asserting it. **Stage 3 must retrieve Article 243ZD before any record rests on this.**

**"District Capex Budget":** that phrase does **not** appear in the retrieved statute. The statutory
term is the DPC's *"plan and non-plan budget for the District"* (s.47B(iii)). No statutory DDC control
over a district capex budget could be established.

---

## 4. STATE FINANCE COMMISSION — the sharpest finding

**RETRIEVED — T1 (full text).** *The Jammu and Kashmir State Finance Commission for Panchayats and
Municipalities Act, 2011 (Act No. XVI of 2011)*:
`https://web.archive.org/web/2023id_/https://www.indiacode.nic.in/bitstream/123456789/16438/1/finance_commission_for_panchayats_and_municipalities_act,_2011.pdf`

- *"[Received the assent of the Governor on 23rd April, 2011 and published in the Government Gazette
  dated 25th April, 2011.]"*
- Footnote: *"Enforced vide **SRO-195 dated 24-06-2011** w.e.f. 24th June, 2011."*
- **s.3(1)**: *"The Government shall, as soon as may be from the commencement of the Act, and
  thereafter at the expiration of every fifth year, constitute a 'Finance Commission for Panchayats
  and Municipalities'…"*
- **s.3(2)(a)**: Chairperson *"shall be an eminent economist with expertise in State finance…"*;
  **(b)** not more than two other members.
- **s.4(1)**: term *"one year… or until they submit the report to the Government or attain the age of
  sixty-five years, whichever is earlier"*, extendable by not more than six months.
- **s.10**: functions = the Art. 243-I / 243-Y list (tax-sharing, assignment, grants-in-aid from the
  Consolidated Fund, measures to improve finances) for both Panchayats and Municipalities.
- **s.12 — the whole of it**: *"**The Commission shall submit its report to the Government within the
  time prescribed.**"*

**The child grepped the full Act for "laid", "laying", "lay before", "action taken". The only hits are
s.16 "Protection of action taken in good faith."** There is **no provision in the J&K Act requiring
the report to be laid before the legislature with an action-taken memorandum** — the mechanism
Article 243-I(2)/243-Y(2) supplies. A documented structural gap, established from the retrieved text.

**RETRIEVED — T1.** *Report of the Committee on Devolution of Powers to the Panchayats*, Govt. of J&K,
chaired by Chief Secretary Madhav Lal, constituted by **Government Order No. 447-GAD of 2011 dated
13.04.2011**: `https://web.archive.org/web/2024id_/https://jkgad.nic.in/Pdf/Report_PRIs.pdf`

- **¶3.6**: *"While the J&K Panchayati Raj Act, 1989 does not have any provision for State Finance
  Commission, the State Government has enacted, consistent with the recommendations of the 13th
  Central Finance Commission, the J&K State Finance Commission for Panchayats and Municipalities Act,
  2011."*
- **¶3.7**: *"The Committee recommends that the State Finance Commission be formed as early as
  possible under the Act, and mandated to give its recommendation within one year of its constitution.
  Until then, the Government may consider making an ad-hoc untied grant available to the Halqa
  Panchayats…"* — i.e. as of this report, **no SFC had been constituted**.

**RETRIEVED — T1, and the strongest negative evidence.** IIPA, *Fiscal Framework for Local Government
Growth: Analysing State-Local Fiscal Transfers for the 16th Finance Commission — **Summaries of Latest
SFC Reports***, study sponsored by and commissioned to IIPA by the **16th Finance Commission**, June
2025:
`https://web.archive.org/web/2026id_/https://fincomindia.nic.in/asset/doc/commission-reports/16th-FC/studies/commission/Summaries%20of%20Latest%20SFC%20Reports%20by%20IIPA.pdf`

Full contents list (each state's *latest* SFC): Sixth SFC — Assam, Bihar, Haryana, HP, Kerala, Punjab,
Rajasthan, Sikkim, Tamil Nadu. Fifth — Karnataka, MP, Maharashtra, Odisha, Tripura, Uttarakhand, UP,
West Bengal. Fourth — Andhra Pradesh, Chhattisgarh, Manipur. Third — Goa, Gujarat, Nagaland. Second —
Arunachal Pradesh, Mizoram. **First — Jharkhand, Telangana.**

**That is 28 States and zero UTs. Jammu & Kashmir does not appear anywhere in the document** (grepped
for "jammu", "J&K", "ladakh", "union territor" — zero hits). Even states with only a *first* SFC
(Jharkhand, Telangana) are captured. **J&K has no SFC report in the corpus the 16th FC itself
commissioned.**

**Honest limit, the child's own:** the IIPA study covers States (Art. 243-I binds States/Governors),
so J&K's absence is partly explained by its UT status and is *not by itself proof* that no J&K
commission was ever constituted. But combined with the 2011 GAD report showing none constituted as of
2011, and the Finances score below, **no document was found establishing that a J&K SFC was ever
constituted, reported, tabled, or answered by an ATR.** `jakfinance.nic.in` and every J&K host were
unreachable.

**RETRIEVED — T1, on the "all states have one" claim.** The MoPR/IIPA Devolution Index report states:
*"SFC though a mandatory provision in the Constitution is not a component of 'Framework' dimension for
two reasons. Firstly, SFC is a strong factor in 'Finances' dimension. Secondly, **we know that all
States have constituted at least a first generation SFC.** Hence, no State can be disqualified on this
factor."* Note the word is **States** — J&K is scored as a UT.

---

## 5. XV FINANCE COMMISSION AND J&K — J&K IS NOT IN THE TABLE

**RETRIEVED — T1.** XV-FC, *Chapter 5: Empowering Local Bodies*:
`https://cdnbbsr.s3waas.gov.in/s316026d60ff9b54410b3435b403afd226/uploads/2023/01/2023013159.pdf`

Entry conditions, verbatim:
- **¶xxi (property tax)**: *"We recommend that to qualify for any grants for urban local bodies in
  2021-22, States will have to appropriately notify floor rates and thereafter show consistent
  improvement in collection in tandem with the growth rate of State's own GSDP."*
- **¶xxii (online accounts)**: *"We consider such availability of accounts online, both before and
  after audit, of individual local bodies and at the State and all-India level a critical reform
  agenda."*
- **¶xxiii**: PRIAsoft to move *"from the current four levels to the six-level structure"* and
  integrate with IFMIS and PFMS.
- **¶xx**: transfer within ten working days, *"Any delay beyond ten working days will require the State
  Governments to release the same with interest…"*

Grepped this chapter for "jammu", "union territor", "State Finance Commission". **The only J&K hit
is:** *"There are fifty such Million-Plus cities in the country, excluding the Union Territory of
Delhi, and Union Territory of Jammu and Kashmir."* **"State Finance Commission" returns zero hits in
Chapter 5.**

**RETRIEVED — T1, and the key funds document.** PIB / Ministry of Panchayati Raj, **"FIFTEENTH FINANCE
COMMISSION GRANTS", 09 DEC 2025**, containing Annexure-I (XIV-FC) and Annexure-II (XV-FC):
`https://www.pib.gov.in/PressReleasePage.aspx?PRID=2200805&reg=3&lang=1`

Closing line: *"This information was given by Union Minister Shri Rajiv Ranjan Singh alias Lalan Singh
in a written reply in **Lok Sabha on 09th December 2025**."* — so this is a parliamentary answer.

**Annexure-I, XIV-FC grants to Gram Panchayats, Jammu & Kashmir (Rs. crore), allocation / release:**

| Year | Allocation | Release |
|---|---|---|
| 2015-16 | 373.96 | 367.72 |
| 2016-17 | 585.73 | 474.41 |
| 2017-18 | 675.15 | 470.97 |
| 2018-19 | 779.40 | 544.83 |
| 2019-20 | 1049.49 | **0.00** |
| **Total** | **3463.73** | **1857.93** |

*The child's arithmetic, checked against the printed totals:*
367.72+474.41+470.97+544.83+0.00 = 1857.93 ✔; 373.96+585.73+675.15+779.40+1049.49 = 3463.73 ✔.
**Unreleased = 3463.73 − 1857.93 = Rs 1,605.80 crore. Release rate = 1857.93 ÷ 3463.73 = 53.64%.**
The **entire 2019-20 allocation of Rs 1,049.49 crore was released at zero** — 2019-20 being the year
of reorganisation.

> **STAGE 4 MUST RE-CHECK ALL OF THE ABOVE BY HAND.** This is the phase's largest block of authored
> arithmetic and it originates in `parts/`, which is where four of phase 11's six arithmetic errors
> came from.

**Annexure-II — "Year-wise allocation and release of Fifteenth Finance Commission (XV FC) Grant to
Rural Local Bodies as on 02.12.2025":** the full row list runs Andhra Pradesh, Arunachal Pradesh,
Assam, Bihar, Chhattisgarh, Goa, Gujarat, Haryana, Himachal Pradesh, **Jharkhand** (Sl. 10),
Karnataka … West Bengal, Total. **Jammu & Kashmir is absent** — the sequence goes Himachal Pradesh →
Jharkhand. **28 States, no UTs.** Grand total: allocation 297555.00, release 245541.40.

**Corroborating — RETRIEVED, T1.** PIB/MoPR, 25 MAR 2026: *"Government of India through Ministry of
Panchayati Raj and Ministry of Jal Shakti… recommends release of XV-FC grants **to States** for Rural
Local Bodies, which is then released by Ministry of Finance."*
(`https://www.pib.gov.in/PressReleasePage.aspx?PRID=2244985&reg=3&lang=2`)

**Conclusion on §5, stated carefully by the child:** the Union ministry's own state-wise XV-FC RLB
table **contains no J&K row**. J&K received XIV-FC grants (as a State, through 2018-19) and does not
appear in the XV-FC series. The XV-FC main report's UT provisions could **not** be retrieved (Wayback
403 for the 16th-FC Vol-1; `fincomindia.nic.in` unreachable), so **the legal basis for J&K's exclusion
is not documented — only the fact of its absence from this table.** The "1% adjustment from the
resources of the Centre for the new UTs of J&K and Ladakh" is **RELAYED (T4)** from search snippets
and PRS summaries — not retrieved.

**RETRIEVED — T1, XII-FC/XIII-FC baseline** (J&K GAD report, ¶3.4–3.5):
- XIII-FC: *"an amount of Rs 918 crore has been given for rural local bodies of the State. Out of this,
  Rs 600 crores falls under General Basic Grant and Rs 318 crore falls under General Performance
  Grant."*
- XII-FC: *"an amount of Rs 281 crore was earmarked for the PRIs. However, **due to non-fulfillment of
  prescribed conditions State Government could not secure release of Rs 228 crore, i.e. 81 percent of
  the earmarked amount**."*

---

## 6. DEVOLUTION INDEX — WHO PRODUCES IT, AND J&K'S SCORE

**ESTABLISHED, from the RETRIEVED report itself:** the Devolution Index is produced by the **Indian
Institute of Public Administration (IIPA), New Delhi**, authored by **Prof. Alok**, for the Ministry
of Panchayati Raj. Not TISS, not IRMA, not NCAER. Advance-praise text: *"The dedication and rigorous
effort put forth by **Prof Alok of the Indian Institute of Public Administration (IIPA), in
collaboration with the Ministry of Panchayati Raj**…"* — R. Balasubramaniam, Capacity Building
Commission.

**RETRIEVED — T1.** *Status of Devolution to Panchayats in India: An Indicative Evidence Based
Ranking, 2024* (PIB-hosted copy, 43pp):
`https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/feb/doc2025213501601.pdf`

**Table 2 headers:** Framework D1 | Functions D2 | Finances D3 | Functionaries D4 | Capacity
Enhancement D5 | Accountability D6 | **D**.

**Row 32, Union Territories section:**

> **Jammu and Kashmir — 23.07 | 11.88 | 13.29 | 36.97 | 55.08 | 39.76 | 27.85**
> **National Average — 54.29 | 29.18 | 37.04 | 50.96 | 54.63 | 47.51 | 43.89**
> Ladakh — 22.21 | 11.08 | 0.00 | 25.25 | 29.32 | 27.43 | 16.18

Notes on the table: *"*Provisions of Part IX (The Panchayat) do not apply to these States"* (Meghalaya,
Mizoram, Nagaland); *"** Panchayats are not operational in these UTs"* (Chandigarh, NCT of Delhi).

**J&K is below the national average on five of six dimensions.** Finances 13.29 vs 37.04 national —
**35.9% of the national average**. Functions 11.88 vs 29.18 — **40.7%**. Framework 23.07 vs 54.29 —
**42.5%**. Overall 27.85 vs 43.89 — **63.5%**.

**Rank — THE CHILD'S ARITHMETIC, not stated in the report:** sorting all 31 scored entities by D, J&K
at 27.85 falls **23rd of 31** — between Punjab (29.34, 22nd) and Jharkhand (27.73, 24th). Treat as
computation, not as a published rank. **Stage 4 re-checks.**

**The one dimension where J&K is above average is Capacity Enhancement**, and the report singles it
out:
> *"Seventeen States and two UTs i.e., Jammu & Kashmir and Andaman and Nicobar Islands scored more than
> the national average of 54.63. It is heartening to note that Jammu & Kashmir has made a remarkable
> achievement in capacity enhancement by scoring an index value of 55.08, which augurs well and
> conveys commitment by the J&K Administration to strengthen Panchayats."*
> *"The States of Gujarat, Karnataka, Kerala, Madhya Pradesh, Rajasthan, Tamil Nadu, Telangana, Uttar
> Pradesh and West Bengal are leading. **UT of Jammu and Kashmir is at par with these leading
> States**."*

**PROVENANCE OF THE J&K SCORE — the produces-vs-relays test, answered:**
> *"**The questionnaire had been sent to all State Governments on 20 December 2022 to elicit data.**
> Data was also collected from the field in all States to supplement or validate the data received
> from State Governments. All States and Union Territories are covered in the study except the States
> of Meghalaya, Mizoram and Nagaland…"*

So IIPA **produces** the index; the underlying J&K data is **self-reported by the J&K
administration**, with field collection to "supplement or validate". **The favourable Capacity
Enhancement score rests on that self-report.** This is trap (2) landing squarely: a Union-published
index whose J&K row is produced by the body being scored.

---

## 7. DEVOLUTION OF THE 29 ELEVENTH-SCHEDULE SUBJECTS

**RETRIEVED — T1.** The 2011 GAD Committee report, **¶2.7**, enumerating the pre-existing gap:

> *"The Eleventh Schedule of the Constitution of India lists 29 categories of subjects in which the
> local government could have a role. While many of these subjects find mention in sections 12, 31 and
> 46 of the J&K Panchayati Raj Act, 1989, the following subjects are **not** specifically mandated as
> functions to be performed by panchayats in J&K:- Land improvement, implementation of land reforms,
> land consolidation (entry 2). Minor irrigation, water management and water shed development
> (entry 3). Fisheries (entry 5). Drinking water (entry 11). Roads, culverts, bridges, ferries
> waterways and other means of communication (entry 12). Rural Electrification, including distribution
> of electricity. Non-conventional energy sources (entry 15). Tech. Training and Vocational Education
> (entry 18). Secondary Schools (part of entry 17). Women and Child Development (entry 25). Public
> Distribution system (entry 28)."*

**¶2.9** identifies the enabling hooks: *"Sub section (3) of section 12, sub section (vi) of section 31
and sub section (ix) of section 46 of the Panchayati Raj Act, 1989 are the enabling sections in terms
of which the Government may assign or entrust to the PRIs any more functions and duties from time to
time."* — i.e. devolution in J&K runs by **executive entrustment, not statutory assignment**.

**RETRIEVED — T1.** The pre-2020 RDD J&K printing, *Panchayati Raj Act, 1989 (Amended up to October
2018)*, **Schedule I-C (See Section 14)**, on the Halqa Panchayat Fund — the fund composition includes
*"Grants of State and Central Finance Commission"*, *"80% funds under Annual Action Plan for
MGNREGA"*, *"100% funds under PMAY (construction component only), IWMP (works component only), Mid day
Meal, ICDS (Nutrition component only), NSAP and ISSS"*, subject to *"the procedure to be notified by
the Department of Rural Development & Panchayati Raj."*
`https://cdnbbsr.s3waas.gov.in/s316026d60ff9b54410b3435b403afd226/uploads/2023/08/2023080283.pdf`

**COULD NOT ESTABLISH — the post-2019 order number.** There is reporting (Daily Excelsior, ~Sept 2021)
that the UT government placed all 29 Eleventh-Schedule subjects with panchayats. **Not retrieved**:
`https://www.dailyexcelsior.com/all-29-subjects-under-11th-schedule-of-indian-constitution-placed-at-disposal-of-panchayats/`
returned **404** to both WebFetch and curl. Every J&K government host that would carry the SO/GO is
unreachable. **There is no Government Order number or date for the post-2019 devolution of the 29
subjects.** The only order numbers vouched for are G.O. No. 447-GAD of 2011 dated 13.04.2011,
S.O. 1229(E) of 31.03.2020, and S.O. 3654(E) of 16.10.2020.

---

## 8. CAG AUDIT OF J&K LOCAL BODIES — a documented nil

**RETRIEVED — T1.** The child reverse-engineered the CAG AG(J&K) audit-report search form from
`https://cag.gov.in/ag/jammu-kashmir/en/audit-report` and read its field values: `gt` (Government
Type) = 51 for "Local Bodies"; `state[]` = 74 "Jammu and Kashmir State (Upto 30-Oct-2019)" and 380
"Jammu and Kashmir UT (31-Oct-2019 Onwards)"; `lbt` = 94 Local Bodies / 95 Panchayat Raj Institutions
/ 96 Urban Local Bodies / 97 Rural Local Bodies.

**Note the form's own field values confirm the 31 October 2019 referent break independently** — CAG
itself splits J&K into two entities at that date. That is a second instrument attesting the break.

Queries run and results:
- `https://cag.gov.in/ag/jammu-kashmir/en/audit-report?gt=51&state%5B%5D=74` → **0 results**
- `https://cag.gov.in/ag/jammu-kashmir/en/audit-report?gt=51&state%5B%5D=380` → **0 results**
- `https://cag.gov.in/en/audit-report?gt=51&state%5B%5D=380` → **0 results**

**Positive control** — `https://cag.gov.in/en/audit-report?gt=51` (Local Bodies, all states) →
**results returned**, including *"Report No. 7 of 2026: …on Local Bodies for the period ended March
2023"*, *"Report No. 1 of 2025 – Report on Local Bodies, Government of Chhattisgarh…"*, *"Report No. 6
of 2024 – Audit Report on Local Bodies… Government of Assam"*, *"Annual Technical Inspection Report on
Local Bodies for the year ended 31 March 2021."* So the filter works.

**Negative control** — `https://cag.gov.in/ag/jammu-kashmir/en/audit-report?state%5B%5D=74` (no
govt-type filter) → 10 results, e.g. *"Report 2 of 2026: …on Union Territory Finances for the year
2024-25"*, *"Report 1 of 2026: …Composite Audit Report: UT Revenues of UT of Jammu and Kashmir"*,
*"Report 4 of 2025: …on Conservation and Management of Lakes in Jammu and Kashmir"*. So J&K reports
exist in the database in general.

**Conclusion:** the CAG's own database returns **zero Local-Bodies-category audit reports for J&K
(either as State or as UT)**, while returning them for other states. One older 2015-vintage J&K
ATIR-on-ULBs link surfaced inside a CAG page
(`.../annual-technical-inspection-report-urban-local-bodies-year-ended-31-march-2015-government`) but
**fetching it returned 404**, so its existence and tabling are unconfirmed. **It could not be
established that any CAG report on J&K local bodies has been tabled.**

**Method note worth carrying:** this is a positive-and-negative-controlled absence — the query that
should return nothing returns nothing, the query that should return something does. That is a
materially stronger absence than "we looked and did not find it", and it is the standard the rest of
the phase's absences should be held to where the instrument permits.

---

## 9. FUNCTIONARIES — largely unestablished

**RETRIEVED — T1**, indirect. The pre-2020 Act's Schedule I-B/I-C names the cadre the Halqa Panchayat
draws: *"Village Level Worker, Auxiliary Nurse Midwife (ANM), Female Multipurpose Health Worker
(FMPHW), Accountant-cum-Data Entry Operator, Aganwadi Worker/Helper and Asha Worker"* — whose
salary/honorarium *"shall be drawn by the Halqa Panchayat as per the prescribed procedure."* And:
*"Halqa Panchayats may engage staff at its level only after formal sanction from the Government for
such engagement."*

**RETRIEVED — T1**, capacity scale. GAD report ¶7.1: *"around **34,000 Elected Representatives** have
to be trained."*

**RETRIEVED — T1**, on the general staffing problem (Devolution Index report, Functionaries
dimension): *"It is observed that Panchayats are marred by a lack of support staff and personnel, such
as secretaries, assistant secretaries, accountants, engineers, computer operators, data entry
operators etc."* J&K's Functionaries score is **36.97 vs 50.96 national**. The DI's Functionaries
dimension explicitly includes the indicator *"Panchayats Officials: – Sanctioned and actual staff
position"* — so a sanctioned-vs-filled figure for J&K **exists inside IIPA's underlying dataset**, but
the published report gives only the composite score, not the raw counts.

> **This is a clean `not-published` with a real route**: the quantity demonstrably exists in a
> holder's hands (IIPA's dataset, collected under a Ministry of Panchayati Raj commission) and only
> the composite is released. Producible under compulsion. Stage 3 should classify it that way.

**COULD NOT ESTABLISH:** no published sanctioned-vs-filled figure for J&K Panchayat Secretaries /
Village Level Workers.

**RELAYED only (T4, search snippets, NOT retrieved and NOT asserted):** figures circulating for
Panchayat Ghars (target 640, land identified 577, 269 completed/advanced; 500 new Panchayat Ghars
sanctioned; Rs 350.56 cr over three years, Rs 290.23 cr for Panchayat Bhawans, Rs 164.9 cr CSCs,
Rs 6.31 cr computers) and for eGramSwaraj (7,795 GPs onboarded, 7,729 making online payments).
**Not one of these was retrieved from source.** `newsonair.gov.in` → ENOTFOUND; `egramswaraj.gov.in` →
connect timeout. **Do not treat any of these numbers as established. They must not enter a record.**

---

## 10. PARLIAMENTARY ANSWERS — and the produces/relays test

**Parliament's own servers were unreachable from that process.** `eparlib.sansad.in` → ECONNREFUSED
164.100.166.186:443 (both curl and WebFetch); `sansad.in`, `loksabha.nic.in` → 000. **No parliamentary
answer was retrieved from an official parliamentary host.**

> **CAUTION, added in the main loop:** the detentions child established that a second process on the
> same machine reached `mha.gov.in` when the first could not. This section's host-failure list is
> therefore **single-process evidence** and must not be recorded as an environment fact without a
> retest. See STATE.md.

What was retrieved, all T1 via PIB:

1. **Lok Sabha written reply, 09 Dec 2025**, Minister Rajiv Ranjan Singh (Lalan Singh) — the XIV/XV-FC
   annexures in §5. Relevant relay/limits language, verbatim:
   > *"The grants under the 15th FC are released to the RLBs **based on the Grant Transfer Certificate
   > (GTC) submitted by the States** & the fulfillment of all the mandatory eligibility conditions by
   > the RLBs and the States as stipulated in the Operational Guidelines… issued by the Finance
   > Ministry **vide letter dated 14.07.2021**."*
   > *"**The Central Government does not collect data** regarding the number of families or individuals
   > which have directly benefited from the projects funded through such grants in the beneficiary
   > States."*
2. **Rajya Sabha written reply, 07 Feb 2024**, MoS Kapil Moreshwar Patil (PIB PRID 2003522) —
   RGSA/PDI/e-Panchayat narrative, **no J&K figures**.
3. **PIB Year End Review 2023, MoPR** (PRID 1991702) — the only J&K mention is a workshop:
   *"Three-day National Workshop on Theme 8-Panchayat with Good Governance of LSDGs held in Srinagar,
   Jammu & Kashmir during 21 – 23 August 2023."* No funds figures.
4. **T4 — RELAYED via a third-party mirror, not an official host.** Lok Sabha Q. No. 1091,
   08 Feb 2022, Ministry of Panchayati Raj, answered by MoS Kapil Moreshwar Patil, retrieved from
   `https://www.datais.info/loksabha/question/ff86cf8444a8c3b68b8b6fa1c0d5c2ba/...`. The question asked
   about funds allocated/released/utilised in named states including J&K. The mirror renders the answer
   as: funds are released against an *"approved annual action plan to the States and not to their
   Districts"*, releases depend on utilisation certificates and matching state contributions.
   **Because this is a mirror, not sansad.in, it is graded T4 and its wording is not treated as
   verbatim.**

**On the produces-vs-relays test:** the clearest documented instance of a Union body *relaying rather
than producing* a J&K panchayat figure is **not** in a parliamentary answer but in the MoPR/IIPA
Devolution Index methodology quoted in §6 — *"The questionnaire had been sent to all State Governments
on 20 December 2022 to elicit data."* **The specific phrasing "as reported by the UT of J&K" was not
found in any retrieved document. It was searched for and not manufactured.**

---

## WHAT COULD NOT BE ESTABLISHED — plainly

1. **C.O. 272 text** — not retrieved. Cannot say which clause extended Part IX/IX-A, or quote the 1954
   Order. *(Main loop: this is the other dead child's subject; it goes back on the resume list.)*
2. **Whether any J&K State Finance Commission was ever constituted under the 2011 Act** — no document
   either way. Strong negative circumstantial evidence (2011 GAD report says none yet; absent from the
   16th FC's own SFC corpus; Finances score 13.29 vs 37.04). No chairperson, no date, no report, no
   tabling, no ATR.
3. **The Government Order/SO number and date for the post-2019 devolution of the 29 Eleventh-Schedule
   subjects.**
4. **The XV-FC's legal treatment of UTs** — J&K's absence from the release table is shown; the rule
   that produced it is not. The "1% adjustment" is relayed only.
5. **Any CAG report on J&K local bodies** — CAG's own filtered database returns zero, with a working
   positive control. The 2015 ULB ATIR link 404s.
6. **Sanctioned vs filled Panchayat Secretary / VLW posts in J&K** — no figure retrieved.
7. **Panchayat Ghar and eGramSwaraj counts for J&K** — relayed only, not retrieved, not asserted.
8. **XVI Finance Commission Vol-1 Main Report** — Wayback 403; `fincomindia.nic.in` unreachable.
9. **The J&K Panchayati Raj Rules 1996 and their October 2020 amendment** — not retrieved.

## THE FOUR HARDEST FACTS VOUCHED FOR

1. **`S.O. 3654(E) dated 16.10.2020`** is the instrument, made under s.96 of the Reorganisation Act
   2019 **within 14 days of that power expiring**. The 1989 Act survived reorganisation as Fifth
   Schedule Table-4 entry 97.
2. **The district budget belongs to the DPC, not the DDC** — s.47B(iii), and s.47A(2) makes the **MP**
   its chairperson with all district officers ex officio; the elected DDC holds one seat. The DDC's own
   fund (s.47(4)) is "grants by the Government and own resources", with no taxing power, and Schedule
   III lets Government withdraw its functions by order.
3. **The J&K Finance Commission Act 2011's s.12 is one sentence with no laying/ATR requirement**, and
   no J&K SFC report exists in the 16th FC's own commissioned corpus of 28 State SFC summaries.
4. **J&K has no row in the Union ministry's XV-FC rural-local-body allocation/release table**, while
   its XIV-FC record shows **Rs 1,605.80 crore of Rs 3,463.73 crore never released (53.64% release
   rate), including Rs 1,049.49 crore at zero in 2019-20.**
