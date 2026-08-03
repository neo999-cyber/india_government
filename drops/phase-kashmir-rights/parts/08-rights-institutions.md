# 08 — RIGHTS INSTITUTIONS OF JAMMU AND KASHMIR, AS INSTITUTIONS

Phase 12, stage 2 research child, `--dry`. Model: **opus** (claude-opus-5). This file is written
INCREMENTALLY — sections were appended as established, not held to the end. An earlier run of this
child died on a session limit mid-fan-out; this is the resumed run.

**Inherited without re-retrieval** from `../phase-kashmir-security/parts/12-rights-instruments.md`
(phase 11): the Protection of Human Rights Act 1993 ss.19 and 2(1)(a) and the original s.1(2)
proviso from NHRC's own server (RETRIEVED, phase 11); NHRC's 1993 and 1995 custodial-death
intimation letters (RETRIEVED, phase 11); the JKCCS/APDP *Annual Human Rights Review 2019*
(RETRIEVED via mirror, phase 11); the SHRC's 2011 unmarked-graves enquiry report (RETRIEVED,
phase 11); OHCHR June 2018 and July 2019 including para 95 (RETRIEVED, phase 11). Their
RETRIEVED/RELAYED grading is carried forward unchanged and phase 11 is cited as origin.

---

## 0. RETRIEVAL ENVIRONMENT — read this before grading anything below

Phase 11 recorded `indiacode.nic.in` as DNS-failed and graded the J&K Reorganisation Act **T4
RELAYED** on that basis, with the instruction that it "must not be quoted as verbatim primary".
**That is now superseded.** The failure was a resolver failure in one process, not a reachability
fact about the host.

- The system resolver on this machine returns SERVFAIL for `*.nic.in`, `mha.gov.in` and `sansad.in`.
  `WebFetch` uses that resolver and fails with ENOTFOUND. `web.archive.org` is blocked to WebFetch.
- **`curl` with DNS-over-HTTPS reaches all of them.** The working form:
  `curl -sS -L --doh-url https://cloudflare-dns.com/dns-query -A "Mozilla/5.0 …Chrome/126…" --http1.1`
  MHA additionally 403s a default user-agent and serves normally to a browser user-agent.
- **Retested per the coordinator's instruction that a reachability failure must be confirmed from a
  second process before being recorded as an environment fact.** Two phase-11 environment findings
  are therefore wrong as stated: `indiacode.nic.in` is reachable, and `nhrc.nic.in` is reachable.
  See §7 for the `jkhome.nic.in` retest, which bears on phase-11 absence B7's route.

Everything below marked RETRIEVED was fetched in this run, with the HTTP status recorded.

**AND A FINDING IN ITS OWN RIGHT, not a retrieval note.** Retested on three resolvers (system,
Cloudflare DoH, `dig @1.1.1.1`) on 3 August 2026:

| Host | Resolves? | Reached? |
|---|---|---|
| `nhrc.nic.in` | yes (not on system resolver) | **HTTP 200** |
| `indiacode.nic.in` | yes | **HTTP 200** |
| `egazette.gov.in` | yes | **HTTP 200** on direct file paths |
| `jkgad.nic.in` | yes (164.100.239.147) | **HTTP 200**, serves J&K government orders |
| **`jkhome.nic.in`** | **NO — NXDOMAIN on Cloudflare, empty on `dig @1.1.1.1`** | — |
| **`jkshrc.nic.in`** | **NO — NXDOMAIN** | — |
| **`jksic.nic.in`** | **NO — NXDOMAIN** | — |
| `jksvc.gov.in` | no A record returned | connection timeout |

**The Union's documentary presence is intact and the J&K administration's is patchy to absent.** The
National Human Rights Commission, India Code and the Gazette all answer; the hostnames that would
belong to the J&K Home Department, the abolished State Human Rights Commission and the abolished
State Information Commission do not exist in DNS at all. The General Administration Department is
the exception and it is a real one — `jkgad.nic.in` works and is where several primary instruments
in this part came from.

**Stated carefully, because it is easy to overclaim.** This is one observation, from one network
position, on one date. **A hostname that does not resolve is not evidence that records were
destroyed, and it is not evidence of intent.** But it is a fact about what a citizen can reach, in a
part about what happened to J&K's own accountability institutions, and it belongs here.

**One consequence for the corpus, and it is a negative one:** phase-11 absence B7's route ("RTI to
the J&K General Administration Department… addressee could not be verified because jkhome.nic.in was
unreachable") **cannot be repaired by retesting** — `jkhome.nic.in` fails on the good resolver too,
so phase 11's finding stands. But the route can be improved another way: see §7.

---

## 1. THE INSTRUMENT — J&K Reorganisation Act 2019, retrieved as primary text

**RETRIEVED.** `https://www.indiacode.nic.in/bitstream/123456789/15875/1/the_jammu_and_kashmir_reorganisation_act_2019.pdf`
— HTTP 200, 748,052 bytes, 61 pages, via curl + DoH. **T1.** This is the first primary retrieval of
the Act text in the corpus; phase 11 could not obtain it and worked from relayed extracts.

Header, verbatim: "THE JAMMU AND KASHMIR REORGANISATION ACT, 2019 / ACT NO. 34 OF 2019 /
[9th August, 2019.]". s.2(a): "'appointed day' means the day which the Central Government may, by
notification in the Official Gazette, appoint" — 31 October 2019 by S.O. 2889(E).

### 1.1 THE SAVINGS QUESTION, ANSWERED ON THE TEXT

My brief forbade asserting the absence of a savings provision without checking the general savings
section. **Checked. The Act's full arrangement of sections was read.** Findings:

- **There is no general savings section.** Part XIV is headed "LEGAL AND MISCELLANEOUS PROVISIONS"
  and runs ss.94–103: 94 amendment of another Act, 95 territorial extent of laws, 96 power to adapt
  laws, 97 power to construe laws, 98 power to name authorities, 99 legal proceedings, 100 transfer
  of pending proceedings, 101 right of pleaders, 102 effect of inconsistent provisions, 103 power to
  remove difficulties. **The Act ends at s.103.**
- **The only section headed "Savings" in the entire Act is s.78**, and it sits in Part VIII (HIGH
  COURT). Verbatim: "Nothing in this Part shall affect the application to the common High Court of
  Jammu and Kashmir of any provisions of the Constitution." It saves nothing outside the High Court.
- **s.99 "Legal proceedings" does not reach this.** Verbatim: it applies "Where, immediately before
  the appointed day, the existing State of Jammu and Kashmir is a party to any legal proceedings
  **with respect to any property, rights or liabilities subject to apportionment** among the
  successor Union territories under this Act". It is an apportionment-substitution clause.
- **s.100 "Transfer of pending proceedings" is the nearest thing to a savings provision, and it is
  TERRITORIAL, not institutional.** Verbatim s.100(1): "Every proceeding pending immediately before
  the appointed day before a court (other than High Court), tribunal, authority or officer in any
  area which on that day falls within the State of Jammu and Kashmir shall, **if it is a proceeding
  relating exclusively to the territory, which as from that day are the territories of any Union
  territory, stand transferred to the corresponding court, tribunal, authority or officer of that
  Union territory.**" s.100(3)(b) defines "corresponding court, tribunal authority or officer" as
  "(i) the court, tribunal, authority or officer in which, or before whom, **the proceeding would
  have laid if it had been instituted after the appointed day**; or (ii) in case of doubt, such
  court, tribunal, authority, or officer in that Union territory, as may be determined after the
  appointed day by the Government or administration of that Union territory, or the Central
  Government…".

**THE FINDING, AT THE RIGHT PRECISION. Not "the Act has no savings provision" — that is an oversight
claim and it is wrong. The correct statement is: A SAVINGS PROVISION EXISTS AND IS INOPERABLE FOR AN
ABOLISHED BODY. That is a structural consequence, not an omission, and it is the stronger finding.**

The mechanism, in full: the Act contains
a general transfer provision, and its operative test is whether a **corresponding** body exists —
defined as the body before which the proceeding "would have laid if it had been instituted after the
appointed day". Where the Act's own Fifth Schedule repeals the enabling statute, no body exists
before which such a proceeding could have been instituted after the appointed day, so s.100(3)(b)(i)
is empty by construction. The Act does not say what happens then; s.100(3)(b)(ii) leaves it to be
"determined" by the UT or Central Government, and s.103 gives the President a five-year power to
remove difficulties. **Whether either power was exercised in respect of the abolished commissions is
a question of fact, addressed in §2.3 and §4.** This is a stronger statement than an absence of
savings, because it identifies the two powers that could have cured it.

**One further mechanism I could NOT resolve and must flag:** s.6 of the General Clauses Act 1897
ordinarily preserves pending proceedings under a repealed enactment. Whether it applies to the
repeal of a **State** law by a **Central** Act operating on a reorganised territory is a question I
found no retrieved judicial determination on. **I do not assert either way.** It is the single
largest open legal question in this part, and a hostile reader will reach for it.

### 1.2 THE FIFTH SCHEDULE HAS FOUR TABLES — which table each institution sits in

The Fifth Schedule opens "(See Sections 95 and 96)". Table headings, verbatim:

| Table | Heading, verbatim |
|---|---|
| TABLE-1 | "CENTRAL LAWS MADE APPLICABLE TO THE UNION TERRITORY OF JAMMU AND KASHMIR; AND UNION TERRITORY OF LADAKH" |
| TABLE-2 | "STATE LAWS WHICH SHALL BE APPLICABLE TO THE UNION TERRITORY OF JAMMU AND KASHMIR AND UNION TERRITORY OF LADAKH WITH AMENDMENTS" |
| TABLE-3 | "STATE LAWS INCLUDING GOVERNOR'S ACTS WHICH ARE REPEALED IN UNION TERRITORY OF JAMMU AND KASHMIR; AND UNION TERRITORY OF LADAKH" |
| TABLE-4 | "STATE ACTS INCLUDING GOVERNOR'S ACTS THAT SHALL REMAIN IN FORCE IN UNION TERRITORY OF JAMMU AND KASHMIR; AND UNION TERRITORY OF LADAKH" |

**Per the coordinator's instruction I tested every institution against Table-4 as well as Table-3,
by grepping the whole retrieved text for each Act name and recording every line on which it
appears.** Result — each of the repealed statutes occurs EXACTLY ONCE in the Act, inside Table-3;
none is also in Table-4:

| Institution's statute | Occurs at | Table | Entry | Effect |
|---|---|---|---|---|
| J&K Accountability Commission Act, 2002 (XXXVIII of 2002) | one line only | **TABLE-3** | **1** | repealed |
| J&K [State] Commission for Women Act, 1999 (V of 1999) | one line only | **TABLE-3** | 23 | repealed |
| J&K Protection of Human Rights Act, 1997 (XV of 1997) | one line only | **TABLE-3** | **117** | repealed |
| J&K Right to Information Act, 2009 (VIII of 2009) | one line only | **TABLE-3** | **134** | repealed |
| J&K State Commission for Protection of Women and Child Rights Act, 2018 (Governor's Act XLVI of 2018) | one line only | **TABLE-3**, Governor's Acts sub-list | 10 | repealed |
| **J&K State Vigilance Commission Act, 2011 (I of 2011)** | one line only | **TABLE-4** | **164** | **REMAINS IN FORCE** |

**The Vigilance Commission line is the single most consequential thing in this table and it is new
ground.** The J&K anti-corruption architecture was not abolished wholesale: the *Accountability*
Commission was repealed and the *Vigilance* Commission was expressly preserved. §4 works this out.

Corresponding Table-1 entries — the central statutes extended on the same day, verbatim:

- Entry **86**: "The Protection of Human Rights Act, **1994**. Proviso to sub-section (2) of section 1
  shall be omitted." — **so the OFFICIAL GAZETTE reads 1994, and India Code's consolidated copy of
  the same entry reads 1993.** See §1.4: two official texts of the same entry differ, phase 11's
  "1994" was right, and an intermediate draft of this file wrongly "corrected" it. **The Gazette
  form is the enacted form and is the one to quote.**
- Entry **95**: "The Right to Information Act, 2005. In sub-section (2) of section 1, words, 'except
  the State of Jammu and Kashmir' shall be omitted."
- Entry **75**: "The Prevention of Corruption Act, 1988." — extended, same formula.
- Entry **66**: "The National Commission for Women Act, 1990." — extended, same formula.
- Entry **12**: "The Commissions of Inquiry Act, 1952. Proviso to sub-section (2) of section 1 shall
  be omitted."
- **The Central Vigilance Commission Act 2003 and the Lokpal and Lokayuktas Act 2013 are NOT in
  Table-1.** Grepping the whole Act for "Vigilance" returns exactly one line — Table-4 entry 164 —
  and for "Lokpal" and "Lokayukta" returns zero lines. This is load-bearing for §4.

### 1.2a A SECOND, INDEPENDENT PRIMARY — the official Gazette

**RETRIEVED.** *The Gazette of India, Extraordinary, Part II Section 1*, No. 53, 9 August 2019, from
the Gazette's own file store: `https://egazette.gov.in/WriteReadData/2019/210407.pdf` — HTTP 200,
1,324,210 bytes. **T1, and it is the enacted text rather than a consolidation.** I retrieved it
specifically to adjudicate a conflict (§1.4) and it is now the controlling copy for every quotation
of the Fifth Schedule in this part.

**Counts, taken from the Gazette text by parsing the entry numbers** rather than by eye:

- **TABLE-3 (repealed): 164 items — 153 State Acts plus a separate sub-list of 11 Governor's Acts.**
  The first entry of the main list is the Accountability Commission Act 2002; the last is entry 153,
  the J&K Wildlife (Protection) Act 1978.
- **TABLE-4 (remain in force): 166 entries**, numbered 1 to 166, last being the J&K Willow
  (Prohibition on Export and Movement) Act 2000.

### 1.3 THE ORGANISING FINDING — what the same schedule repealed and what it kept

**This is the spine of the part.** One instrument, one appointed day, two tables:

**REPEALED by Table-3 — every body in J&K that could receive a citizen's complaint against the state:**

| Body | Statute | Table-3 entry |
|---|---|---|
| State Human Rights Commission | J&K Protection of Human Rights Act 1997 | **117** |
| Accountability Commission | J&K Accountability Commission Act 2002 | **1** |
| State Information Commission | J&K Right to Information Act 2009 | **134** |
| State Commission for Women | J&K [State] Commission for Women Act 1999 | **23** |
| State Commission for Protection of Women and Child Rights | Governor's Act XLVI of 2018 | **10** of the Governor's Acts sub-list |

**RETAINED by Table-4 — including the statute under which the state detains without charge:**

| Statute | Table-4 entry |
|---|---|
| **J&K Public Safety Act, 1978 (VI of 1978)** | **123** |
| J&K State Vigilance Commission Act, 2011 (I of 2011) | **164** |
| J&K Public Services Guarantee Act, 2011 (IX of 2011) | 124 |

**The same schedule, on the same day, repealed the bodies that hear complaints against the state and
preserved the statute under which the state detains without charge.** That is one instrument making
a choice, and it is a far stronger finding than the SHRC story standing alone.

**And the choice is not indiscriminate, which makes it sharper rather than weaker.** Table-4 keeps
the **Vigilance** Commission — the body that pursues public *servants* for corruption on the state's
behalf — and keeps the **Public Services Guarantee** Act, which is a service-delivery timeliness
mechanism. What Table-3 removes is the class of body before which a citizen brings a grievance
*against* a public functionary and gets an adjudication. **The retained bodies look inward at the
administration's own staff; the repealed bodies looked outward at the citizen's complaint.**

### 1.4 TWO OFFICIAL TEXTS OF THE SAME ENTRY DISAGREE — a first-class finding

I retrieved the Fifth Schedule twice, from two official sources, and they differ:

| | Table-1 entry 86, verbatim |
|---|---|
| **Gazette of India Extraordinary No. 53, 9 Aug 2019** (`egazette.gov.in/WriteReadData/2019/210407.pdf`) | "The Protection of Human Rights Act, **1994**." |
| **India Code consolidated PDF** (`indiacode.nic.in/bitstream/123456789/15875/1/…`) | "The Protection of Human Rights Act, **1993**." |

Both retrieved in this run, both HTTP 200, both T1 on their face.

**What is going on, stated without inventing a reason.** The statute in question is short-titled "The
Protection of Human Rights Act, 1993" and is Act No. 10 **of 1994**. The Gazette's "1994" is
therefore a defensible-but-nonstandard citation, or a slip, in the enacted text; India Code's copy
prints "1993". **India Code carries no visible note that it has altered the entry.**

**Consequences for the corpus, and I am correcting myself here:**
1. **Phase 11 recorded "The Protection of Human Rights Act, 1994" and was RIGHT** — it matches the
   enacted Gazette text. An intermediate draft of this file "corrected" phase 11 to 1993 on the
   strength of the India Code copy alone. **That correction was wrong and has been reversed.**
2. **This is exactly the case my brief names as first-class: a quantity — here a citation — on which
   two sources disagree.** It is small, and it is the cleanest demonstration in the part that
   retrieving one official copy is not the same as retrieving the official copy.
3. **Method rule this establishes for stage 3:** where a consolidated text and the Gazette differ,
   quote the Gazette and record the divergence. Do not silently prefer the tidier text.

**I checked the entries this part relies on against BOTH copies. Every other entry matches**:
Table-3 entries 1, 23, 117, 134 and Table-4 entries 123 and 164 read identically in the Gazette and
in India Code. Only entry 86's year differs.

### 1.5 A CONFLICT WITH A SIBLING PART, RESOLVED AGAINST IT — the Vigilance Commission

A sibling researching Article 370 reported, and the coordinator relayed, that **four** accountability
institutions were repealed by Table-3 including "**Vigilance Commission — Table-3 entry 164**".

**That is wrong, and I resolved it against two independent primary copies before writing it down.**

- In the **Gazette** text, TABLE-3 begins at the line bearing its heading and TABLE-4 begins 218
  lines later. The J&K State Vigilance Commission Act 2011 appears **220 lines after the TABLE-4
  heading** — inside Table-4.
- **Table-3 contains no entry numbered 164.** Its main list runs 1–153 and its Governor's Acts
  sub-list runs 1–11. **164 is the TOTAL number of items in Table-3 (153 + 11), not an entry number
  in it.** That is almost certainly the source of the error: a count read as an ordinal.
- The India Code copy agrees: one occurrence of the Act, inside Table-4.

**So the J&K State Vigilance Commission Act 2011 was RETAINED, not repealed.** Corroborated
independently by a second instrument (§4.3(b)): the J&K State Vigilance Commission Rules 2019 were
made under s.18 of that Act in April 2019 and the ACB's own website still lists the Vigilance
Commission as a live link.

**The count of repealed complaint-receiving bodies is therefore four — Human Rights, Accountability,
Information, Women (five if the 2018 Women and Child Rights Governor's Act is counted separately) —
and the Vigilance Commission belongs on the RETAINED side of the ledger, alongside the Public Safety
Act.** Stage 3 must not carry the sibling's version. **This does not weaken the organising finding in
§1.3; it sharpens it**, because the retained/repealed line turns out to track exactly the distinction
between bodies that look inward at the administration's staff and bodies that receive the citizen's
complaint against the state.

### 1.6 THE PATTERN, STATED PLAINLY

Read together, the three tables execute one manoeuvre repeatedly: **a J&K state commission is
repealed in Table-3 and the corresponding national commission's jurisdiction is extended in
Table-1.** Human rights: J&K PHRA 1997 out, PHRA 1993 carve-out deleted. Women: J&K Commission for
Women Act 1999 out, National Commission for Women Act 1990 in. Information: J&K RTI Act 2009 out,
RTI Act 2005 in. Corruption is the exception that proves it: the Accountability Commission is
repealed and **no national equivalent is extended** — see §4.

Whether that manoeuvre is a substitution or an abolition is the whole contested question, and it
turns on whether the national body's powers reach what the state body's reached. §5 answers it on
the instruments.

---

## 2. THE ABOLITION OF THE J&K STATE HUMAN RIGHTS COMMISSION

### 2.1 The instrument

Fifth Schedule **Table-3 entry 117**, verbatim, now RETRIEVED as primary (phase 11 held this
RELAYED): "The Jammu and Kashmir Protection of Human Rights Act, 1997. XV of 1997". Repealed on the
appointed day, 31 October 2019. Not in Table-4. The Commission's enabling statute was extinguished
and the Commission with it.

### 2.2 What replaced it, on the face of the Act

Nothing named. No successor body is constituted anywhere in the Act. The only thing that changes on
the same day is Table-1 entry 86 deleting the PHRA 1993 J&K proviso, which extends the **national**
Commission's ordinary jurisdiction to the two UTs. Whether that is a substitution is §5.

### 2.3 Pending complaints — the ~630 figure

Phase 11 records roughly **630 pending complaints** alleging murder, enforced disappearance and rape
as having abated, with the records physically locked in the former SHRC premises since 31 October
2019, established by an RTI reply — and grades it **RELAYED, the RTI reply itself not retrieved**.

**I attempted to improve the ~630 FIGURE and could not.** Its status is carried forward **UNCHANGED
as RELAYED**; §7 sets out what I did establish about its provenance. **But the disposal of the
Commission itself is no longer relayed at all — see §2A, which is primary.**

---

## 2A. THE WINDING-UP ORDERS — SEVEN COMMISSIONS, ONE DAY, SEVEN CONSECUTIVE ORDER NUMBERS

**This is the best primary evidence in the part and it was not in anyone's brief.** A sibling
strand retrieved the State Information Commission's winding-up order from the J&K General
Administration Department's own order server. **I inferred that companion orders for the other
commissions would sit at neighbouring identifiers, probed the adjacent range, and found the whole
family.** All RETRIEVED from `https://jkgad.nic.in/common/showOrder.aspx?actCode=O<code>`, HTTP 200,
`application/pdf`. **T1 — Government of Jammu and Kashmir orders from the issuing department's own
server.**

| Order No. | Date | Commission wound up | actCode |
|---|---|---|---|
| **1143-GAD of 2019** | 23.10.2019 | **J&K State Human Rights Commission** | O33003 |
| 1144-GAD of 2019 | 23.10.2019 | J&K State Information Commission | O33004 |
| 1145-GAD of 2019 | 23.10.2019 | J&K State Consumer Disputes Redressal Commission | O33005 |
| 1146-GAD of 2019 | 23.10.2019 | J&K State Electricity Regulatory Commission | O33006 |
| 1147-GAD of 2019 | 23.10.2019 | J&K State Commission for Persons with Disabilities | O33007 |
| 1148-GAD of 2019 | 23.10.2019 | J&K State Commission for Protection of Women & Child Rights | O33008 |
| **1149-GAD of 2019** | 23.10.2019 | **J&K State Accountability Commission** | O33009 |

**Seven consecutive order numbers, one date, one file number — No. GAD(Adm)43/2019-III — one
signatory, Dr Farooq Ahmad Lone, IAS, Secretary to the Government.** The identifiers on either side
of the run are unrelated business (compassionate appointments, the Darbar Move, a Finance Department
expenditure restriction), and O33010 upward returned no readable order. **The seven were issued as
one act of administration.**

### 2A.1 The SHRC order, verbatim — Government Order No. 1143-GAD of 2019

> "Subject: Winding up of Jammu and Kashmir State Human Rights Commission constituted under the
> Jammu & Kashmir Protection of Human Rights Act, 1997 repealed in terms of Jammu and Kashmir
> Reorganization Act, 2019.
>
> Consequent upon repeal of the Jammu & Kashmir Protection of Human Rights Act, 1997 by the Jammu
> and Kashmir Reorganization Act, 2019, sanction is hereby accorded to the winding up of Jammu and
> Kashmir State Human Rights Commission with effect from 31-10-2019 i.e. the appointed date for the
> formation of the Union Territory of Jammu and Kashmir and Union Territory of Ladakh.
>
> It is further ordered that:-
> (i) The Chairperson and Members of the Jammu and Kashmir Human Rights Commission shall cease to
> hold office w.e.f. 31.10.2019.
> (ii) All the staff posted in the Jammu and Kashmir Human Rights Commission drawn from various
> Departments shown in Annexure-A to this order shall report to the concerned Administrative
> Departments by 30.10.2019.
> (iii) The vehicles allotted to or purchased for the Jammu and Kashmir Human Rights Commission from
> time to time shall be handed over to the Director, State Motor Garages Department.
> (iv) Secretary, Jammu and Kashmir State Human Rights Commission shall handover building(s) housing
> the Commission alongwith furniture and electronic gadgets to the Director Estates, J&K Government.
> **(v) Secretary, Jammu and Kashmir Human Rights Commission shall transfer all records pertaining
> to the Commission to the Department of Law, Justice [&] Parliamentary Affairs for record.**
>
> By order of the Government of Jammu and Kashmir."

### 2A.2 The Accountability Commission order — Government Order No. 1149-GAD of 2019

The same template, clause for clause. Operative words: "sanction is hereby accorded to the winding up
of Jammu & Kashmir State Accountability Commission with effect from 31-10-2019"; the
"Chairperson/Member(s)… shall cease to hold office w.e.f. 31.10.2019"; staff report back; vehicles to
the State Motor Garages; buildings, furniture and electronic gadgets to the Director Estates; and
"(v) Secretary… shall transfer all records pertaining to the Commission to the Department of Law,
Justice & Parliamentary Affairs **for record**."

### 2A.3 WHAT THE ORDERS DO NOT SAY — and this is the finding

**Not one of the orders contains a single word about pending complaints, petitions, inquiries or
appeals.** The words "pending", "complaint", "petition", "inquiry", "transfer to the National Human
Rights Commission" and "successor" do not appear in the SHRC order or the Accountability Commission
order at all.

**What the orders do dispose of, explicitly: office-holders, staff, vehicles, buildings, furniture
and electronic gadgets.** Five clauses, and the live business of the commissions appears only in
clause (v), and only as "**records**… **for record**" — that is, as an archiving instruction to an
administrative department, not as a transfer of proceedings to any forum.

**This converts the central claim of this part from relayed to primary.** Phase 11 recorded that the
Act "contains no transitional or savings provision for pending complaints" and rested the
consequences on an RTI reply known only through the press. It is now established on the face of the
executive instruments that actually wound the bodies up: **the administration, given the occasion to
say what should happen to the caseload, addressed the furniture and did not address the caseload.**

**It also settles a route.** The Department of Law, Justice and Parliamentary Affairs is the named
transferee **on the face of Government Order No. 1143-GAD of 2019** — not the General Administration
Department, which is where phase-11 absence B7 pointed. And it independently corroborates the RTI
trail in §7, where that same department later said the records had never been formally handed over
and were not accessible to it. **The order says they were to be transferred; the department says
they never were. That is a documented failure to execute a written instruction, established from
both ends.**

**One honest limitation.** There is no separate winding-up order for the **State Commission for
Women** (J&K Act V of 1999, Table-3 entry 23) in the run I retrieved; order 1148 winds up the State
Commission for Protection of Women & Child Rights (the 2018 Governor's Act body). Whether the 1999
commission had already been subsumed into the 2018 body, or whether its winding-up order sits
elsewhere in the repository, **I did not establish.**

---

## 3. NHRC AS A MEASURED SERIES — J&K COMPLAINT COUNTS BEFORE AND AFTER 31 OCTOBER 2019

**This is the measured spine of the part, and it is fully RETRIEVED.** My brief said that if NHRC
publishes J&K complaint counts before and after 31 October 2019 that is a real series and I should
retrieve it. It does, and I have.

**Sources, all RETRIEVED in this run by curl + DoH from NHRC's own server, `nhrc.nic.in`, HTTP 200
in every case. T1.** Annual Reports 2017-18, 2018-19, 2019-20, 2020-21, 2021-22, 2022-23, 2023-24
(the file index at `https://nhrc.nic.in/publications/annual-reports` was retrieved first and the PDF
URLs taken from it). The 2016-17 report was additionally retrieved from MHA's server
(`https://www.mha.gov.in/sites/default/files/NHRCAnnualReportEng_2016-2017_27022019.pdf`, HTTP 200
with a browser user-agent; HTTP 403 without one).

### 3.1 The table

Annexure-1 of each report, titled in the 2019-20 volume "Statement Showing State-Wise No. of Cases
Registered From 01/04/2019 To 31/03/2020". Column heads, verbatim: "Complaints | Suo motu
Cognizance | **Intimation Received about Custodial Deaths and Rapes**: Police Custodial
Deaths/Rapes · Judicial Custodial Deaths/Rapes · **Defence/Para-Military Custodial Deaths/Rapes** |
Intimations Received about Encounter Deaths | Total".

**Cases registered, Jammu and Kashmir row:**

| FY | Complaints | Suo motu | Police cust. | Judicial cust. | **Defence/Para-Mil cust.** | Encounter | **Total** | Ladakh row |
|---|---|---|---|---|---|---|---|---|
| 2017-18 | 189 | 0 | 0 | 4 | **0** | 1 | **194** | — none — |
| 2018-19 | 210 | 0 | 0 | 8 | **0** | 0 | **218** | — none — |
| **2019-20** | 153 | 0 | 0 | 5 | **0** | 2 | **160** | **3** |
| 2020-21 | 267 | 1 | 2 | 7 | **0** | 5 | **282** | 1 |
| 2021-22 | 400 | 1 | 2 | 15 | **0** | 47 | **465** | 9 |
| 2022-23 | 326 | 0 | 2 | 8 | **0** | 43 | **379** | 5 |
| 2023-24 | 982 | -- | 2 | 3 | -- | 8 | **995** | 4 |

All-India totals in the same column set: 2017-18 grand total 79,612 (Defence/Para-Mil column **1**);
2018-19 89,584 (**2**); 2019-20 76,628 (**0**); 2020-21 74,968 (**1**); 2021-22 1,11,082 (**1**);
2022-23 1,04,128 (**6**); 2023-24 76,891 (**2**).

**Disposal, Annexure-2, "Transferred to SHRCs" column, Jammu and Kashmir row** — the abolition
visible inside NHRC's own arithmetic:

| FY | Transferred to SHRCs |
|---|---|
| 2017-18 | **38** |
| 2018-19 | **51** |
| 2019-20 | **10** |
| 2020-21 | **0** |
| 2021-22 | **0** |
| 2022-23 | **0** |
| 2023-24 | **--** (nil) |

NHRC sent 38 and then 51 J&K cases to the State Commission in the last two full years of its
existence, 10 in the year that straddles its abolition, and **none in any year since**. The J&K
column of a national referral series goes to zero and stays there. This is the cleanest single
number in the part.

### 3.2 THE PERIODISATION BITES, AND NHRC CANNOT BREAK ITS OWN SERIES

**The 31 October 2019 administrative-unit break falls in the middle of NHRC's reporting year.**
NHRC reports on financial years, 1 April to 31 March. The referent of the row labelled "Jammu &
Kashmir" changes on 31 October 2019 — from a State including Ladakh to a UT excluding it — which is
**212 days into the 2019-20 reporting year**. A separate "Ladakh" row appears for the first time in
that same 2019-20 volume, carrying 3 cases for what NHRC presents as the whole year, though Ladakh
existed as a UT for only the last 152 days of it.

**NHRC nowhere states where inside the year the boundary falls.** The 2019-20 J&K figure of 160 is
therefore a hybrid of two territorial definitions, and the 3 attributed to Ladakh cannot be
allocated to a period. **Any authored series must break at 2019-20 and must mark that year as
straddling rather than as a point on either side.** The pre-break comparators are 2018-19 and
earlier; the post-break comparators are 2020-21 and later.

This is the exact case my brief named: the official series remained formally intact across the
break, and the damage is not to its existence but to its referent.

### 3.3 THE RESPONDENT-FORCE QUESTION — the arithmetic of substitution, and why nobody has it

The substitution question turns on **what fraction of J&K complaints concern forces NHRC may not
investigate**. Phase 11 established the bar: PHRA s.19 confines NHRC on armed-forces complaints to
seeking a report from the Central Government, and s.2(1)(a) pulls "any other armed forces of the
Union" — the CAPFs — inside it.

**NHRC publishes both dimensions and never crosses them.** Established on the retrieved reports:

1. **A state/UT dimension** — Annexure-1 and Annexure-2 above, which carry no respondent field at
   all except the custodial-death intimation columns.
2. **A respondent-category dimension, all-India only** — a table headed "Statement Showing No. of
   Cases Registered (Data as per CMS)" which counts complaints by NHRC's own incident codes,
   including two that are exactly the categories at issue: **"Defence Forces (Inc. Code 1600-1617)"**
   and **"Para-Military Forces (Inc. Code 1700-1717)"**.

**The two are never cross-tabulated.** There is no table anywhere in any retrieved report giving
complaints by state AND by respondent category. **So the fraction of J&K complaints concerning
forces NHRC may not investigate is not published — and it is the number on which the entire
substitution claim rests.** See absence A2 in §8.

### 3.4 THE RESPONDENT-CATEGORY SERIES WAS DISCONTINUED AFTER 2021-22

The category table, all-India, as printed (Defence Forces / Para-Military Forces rows):

| Report | Column labels as printed | Defence Forces | Para-Military Forces |
|---|---|---|---|
| AR 2017-18 | 2013-2014 … 2017-2018 | 144, 144, 128, 72, **103** | 141, 178, 160, 152, **95** |
| AR 2018-19 | 2013-2014 … 2017-2018 | 144, 144, 128, 72, **98** | 141, 178, 160, 152, **132** |
| AR 2019-20 | 2014-2015 … 2018-2019 | 144, 128, 72, 98, **------** | 178, 160, 152, 132, **------** |
| AR 2020-21 | (five columns) | 128, 72, 98, 94, 66 | 160, 152, 132, 135, 157 |
| AR 2021-22 | 2017 … 2021 | 72, 103, 98, 94, 65 | 152, 95, 132, 135, 157 |
| AR 2022-23 | — **table absent** — | — | — |
| AR 2023-24 | — **table absent** — | — | — |

**Two first-class findings sit in that table.**

**(a) Two NHRC reports disagree about the same labelled year.** AR 2017-18 and AR 2018-19 both print
a table headed "Financial Year 2013-2014 … 2017-2018". Their first four columns are identical. Their
**2017-2018 column differs in every single row**: Defence Forces 103 against 98, Para-Military 95
against 132, Police 26,391 against 27,491, Women 7,460 against 7,843, Rape 498 against 701, Children
906 against 1,340, Health 1,210 against 1,377, Jail 2,416 against 2,669, Bonded Labour 210 against
355, Inaction 9,982 against 10,929, Gang Rape 392 against 422, Child Labour 46 against 76, SC/ST/OBC
2,679 against 2,660. Neither report carries a revision note. A partial-year explanation is the
obvious candidate but the documents defeat it: AR 2017-18 states its own Investigation Division
period as "01-04-2017 to 31-03-2018", a full year, and two of the restated values move **upward**
(Defence Forces, SC/ST/OBC), which a truncated period cannot produce. **Two official documents from
the same body disagree on the same quantity for the same labelled year, and neither says so.**

**(b) The series was first dashed and then dropped.** AR 2019-20 prints "------" in the final column
for every category, so the category counts stop at 2018-19 in that volume. AR 2022-23 and AR 2023-24
do not print the table at all — grepping both for "Inc. Code" returns zero lines. **The only
published dimension that ever identified armed-forces and paramilitary complaints as such was
discontinued after the 2021-22 report.** It was all-India and never J&K-specific; now it is nothing.

### 3.5 THE DEFENCE/PARA-MILITARY CUSTODIAL COLUMN — an amendment to L-0121, not a duplicate

**L-0121 holds that deaths in Army and central-force custody "have no cell in any official
instrument".** That is established on NCRB and it remains correct as to NCRB. **It is not correct as
a general statement, and this part must say so.** NHRC's Annexure-1 has carried a column headed
**"Defence/Para-Military Custodial Deaths/Rapes"** in every report from 2017-18 to 2023-24. The cell
exists.

What the cell contains: **0, 0, 0, 0, 0, 0, --** for Jammu and Kashmir across all seven years, and
**1, 2, 0, 1, 1, 6, 2** for all India. In 2019-20 the national figure is zero — the report states it
in words at para 2.44.1, verbatim: "**No death in para-military/defence forces custody was reported
during the review period.**"

**The distinction that matters:** the column counts **intimations received**, not deaths. The
intimation duty phase 11 established runs to District Magistrates and Superintendents of Police, and
no Army formation or central-force command is an addressee — so a column fed by that duty will read
near-zero whatever happens, and reading it as a death count is a category error. **This does not
weaken L-0121; it sharpens it.** The honest form is: NCRB has no cell, NHRC has a cell fed by a
reporting duty that does not bind the forces the cell names, and the cell reads zero in the one
theatre where those forces do most of the holding. **L-0121 should be amended, not duplicated** —
its `unmeasured[0].why` currently says the quantity "has nowhere to be recorded", and the retrieved
NHRC annexure shows it has a place to be recorded and no duty to record it there. That is a better
finding than the one on file.

### 3.6 PUBLICATION LAG, ON THE DOCUMENTS' OWN METADATA

PHRA s.20 requires the annual report to be laid before Parliament. PDF creation dates, read off the
retrieved files (`pdfinfo`), are the only date evidence I hold; they are metadata and are marked as
such, not stated publication dates:

| Report year | PDF CreationDate | Elapsed from year end |
|---|---|---|
| 2017-18 | 3 February 2020 | ~22 months |
| 2018-19 | 17 January 2020 | ~10 months |
| 2019-20 | 20 August 2020 | ~5 months |
| **2020-21** | **5 June 2025** | **~50 months** |
| 2021-22 | 31 July 2023 | ~16 months |
| 2022-23 | 8 October 2024 | ~19 months |
| 2023-24 | 18 September 2024 | ~6 months |

**The 2020-21 report was produced after the 2021-22, 2022-23 and 2023-24 reports.** The series was
published out of order, with the missing year filled in nearly four years late. And **the 2017-18
report was produced after the 2018-19 report** — the same inversion at the other end, which is the
likeliest mechanical explanation for the restatement in §3.4(a) and does not excuse the absence of a
note.

**As at this run (3 August 2026) the most recent NHRC Annual Report published is 2023-24.** No
2024-25 report is on the index. So the current lag on the newest year is about 28 months.

### 3.7 A FORM CHANGE WORTH RECORDING

In AR 2020-21 the state-wise annexures are **embedded as raster images rather than as text**, unlike
every other year retrieved. I initially read the pages as blank because text extraction returned
zero characters, and corrected this by rendering the pages — **the tables are present and legible**.
Recording the error because the correction is the point: a "missing table" finding would have been
wrong, and the discipline that caught it was rendering rather than trusting extraction. Machine
readability was lost for that year; the data was not.

Separately, the disposal annexure's column set changes in AR 2023-24: the "Dismissed in Limine"
column present in every earlier year is dropped. Any disposal series must break there.

---

## 4. THE J&K ACCOUNTABILITY COMMISSION — entirely new ground

"Accountability Commission" returns **zero hits corpus-wide**. Nothing below duplicates an existing
record. Everything in this section rests on instruments retrieved in this run.

### 4.1 What it was — RETRIEVED PRIMARY

**RETRIEVED.** *The Jammu and Kashmir Accountability Commission Act, 2002* (XXXVIII of 2002),
24 pages, from the J&K General Administration Department's own order server:
`https://jkgad.nic.in/common/showOrder.aspx?actCode=N11091` — HTTP 200, 608,309 bytes,
`application/pdf`. **T1.** (The PDF is a scan of the printed Act with imperfect OCR; quotations
below are given as the text reads, and OCR noise is visible in the original.)

Long title, verbatim: "An Act to provide for the establishment of the Institution of Accountability
Commission **to inquire into grievances and allegations against public functionaries** and for
matters connected therewith." Assented 13 December 2002, gazetted 16 December 2002, brought into
force by SRO-17 of 21 January 2003 with effect from 25 January 2003.

**Its jurisdiction reached elected politicians.** s.2(16), verbatim: "'public functionary' means a
person who is or was at any time— (i) the Chief Minister or a Minister; (ii) a Member of the State
Legislature; (iii) an Officer referred to in Clause 14; (iv) a Chairman, Vice-Chairman, a Member of
a local authority or a Chairman of its Standing or Subject Committee; (v) a Vice-Chancellor or
Registrar of a University…; (vi) a Chairman, Vice-Chairman, Managing Director or a Member of the
Board of Directors… of any statutory body or corporation…".

**What it could inquire into.** s.2(3) defines "allegations" to include that the functionary "is
guilty of corruption, favouritism, nepotism or lack of integrity", "was actuated in the discharge of
his functions by personal interest or improper or corrupt motive", "has abused or misused his
position to obtain any gain or favour", "has failed to act in accordance with the norms of integrity
and conduct", or holds "pecuniary resources or property disproportionate to his known sources of
income". s.2(9) separately defines "grievance". **So it was a maladministration-and-corruption body
on citizen complaint — a Lokayukta in substance.**

**Its composition made it judicial.** s.3(2) as amended: a Chairperson "who has been a Judge of the
Supreme Court or a Judge of a High Court", with Members who must have been High Court judges. s.4:
appointed by the Governor on the recommendation of a committee of the Chief Minister, the Speaker,
the Chief Justice of the J&K High Court and the Law Minister. It had powers of a civil court and
could "summon and enforce the attendance of any person and examine [him]", and reported to the
Governor.

**That is the body that was repealed.** A judge-led body, appointed on a plural nomination, taking
complaints from citizens against ministers and legislators.

### 4.2 The repeal

Fifth Schedule **Table-3 entry 1** — the very first entry in the table — verbatim: "The Jammu and
Kashmir Accountability Commission Act, 2002. XXXVIII of 2002". **RETRIEVED PRIMARY.** Not in
Table-4. Repealed 31 October 2019. Like the SHRC, no savings, and s.100's "corresponding authority"
is empty by construction (§1.1).

### 4.3 What took the function — answered on instruments, and the answer is three-part

**(a) The Lokpal did not.** Grepping the entire retrieved Act for "Lokpal" and "Lokayukta" returns
**zero lines**. The Lokpal and Lokayuktas Act 2013 is not in Table-1 and was not extended by the
Fifth Schedule. Neither is the Central Vigilance Commission Act 2003 — "Vigilance" appears exactly
once in the whole Act, at Table-4 entry 164. **No national anti-corruption commission was extended
to J&K to replace the repealed one.** This is the exception to the pattern in §1.3: for human
rights, women, and information the state body was repealed and the national counterpart extended;
for corruption the state body was repealed and **nothing national was put in its place.**

**(b) The State Vigilance Commission was expressly PRESERVED, not abolished.** Table-4 entry 164:
"The Jammu and Kashmir State Vigilance Commission Act, 2011. I of 2011" — under the heading "STATE
ACTS… THAT SHALL REMAIN IN FORCE". This is the coordinator's Table-4 point biting exactly where it
was predicted to: a body abolished and a body preserved are different findings and the difference is
one table. **RETRIEVED PRIMARY** and corroborated by a second instrument made under that Act shortly
before the break: **RETRIEVED**, SRO 301 of 23 April 2019, "the Jammu and Kashmir State Vigilance
Commission Rules, 2019", made "In exercise of the powers conferred by section 18 of the Jammu and
Kashmir State Vigilance Commission Act, 2011", from `http://www.jkacb.in/downloads/state-vigilance-commision-rules-2019.pdf`
— HTTP 200, 407,418 bytes. **T1** (a Government of J&K notification; note it is served from the
ACB's own website, which sits on a `.in` rather than a `.gov.in` domain).

**But the Vigilance Commission is a different animal from the Accountability Commission.** On the
2019 Rules' own definition, a "complaint" is "receipt of information about corruption, malpractice
or misconduct on the part of **public servant**… constituting an offence under the Prevention of
Corruption Act, Samvat 2006". Public servants, not public functionaries — **the class that the
Accountability Commission alone reached, ministers and members of the legislature, is not the
Vigilance Commission's class.** The preserved body does not cover the repealed body's distinctive
jurisdiction.

**(c) The working successor is an executive investigating bureau, and its own legal basis was
repealed under it on the same day.**

- **RETRIEVED**, SRO 486 of 26 October 2018, Government of J&K, General Administration Department
  (Vigilance Section), from `http://www.jkacb.in/orders/SRO_486_26102018.pdf` — HTTP 200, 69,124
  bytes. **T1.** Verbatim: "In exercise of the powers conferred by sub-section (1) of section 10 of
  the **Prevention of Corruption Act, Samvat, 2006, (Act No. XIII of 2006)**, the Government hereby
  establishes a Bureau under the title of **Anti Corruption Bureau**, for investigation of offences,
  under the said Act. By Order of the Governor." Reference No. GAD(Vig)20-Adm/2018-Part-II.
- **The parent Act was then repealed.** Fifth Schedule **Table-3 entry 107**: "The Jammu and Kashmir
  Prevention of Corruption Act, Samvat 2006. XIII of Svt. 2006" — repealed 31 October 2019. (Entry
  97 repeals the Prevention of Corruption Ordinance 2001 as well.) Meanwhile **Table-1 entry 75**
  extends the central Prevention of Corruption Act 1988.
- **And the Bureau was re-based on central law.** **RETRIEVED**, S.O. 231 of 2020, Government of
  J&K, GAD, from `http://www.jkacb.in/orders/SO_231_2020_ACB.pdf` — HTTP 200, 42,947 bytes. **T1.**
  Verbatim: "In exercise of the powers conferred by clause (s) of section 2 of the Code of Criminal
  Procedure, 1973 (2 of 1974) and **in supersession of all notifications issued on the subject**,
  the Government hereby declares the places mentioned in column II as 'Police Stations of Anti
  Corruption Bureau' and further notifies the territorial jurisdiction… **for investigation of
  offences triable under the Prevention of Corruption Act, 1988 (49 of 1988)**".

**So the chain is complete and it is entirely executive.** The judge-led complaint commission was
repealed; the vigilance commission was preserved but reaches only public servants; and the function
that actually operates is a police bureau — established under a state Act, that Act repealed, the
bureau re-notified under the central Prevention of Corruption Act and the central CrPC, reporting
within the administration rather than to an independent appointing college.

### 4.4 What this means for the record

**The corruption case is the cleanest instance in the phase of abolition without substitution**,
because unlike human rights, women's rights and information there is no national commission extended
to J&K at all. A citizen who wished to complain about a minister to a judge-led commission could do
so before 31 October 2019 and cannot now, and the instruments say so without needing any inference
about how the successor performs.

**What I could NOT establish, and it matters:**
- Whether the Accountability Commission had a sitting Chairperson and Members on 31 October 2019, or
  how many complaints were pending before it when it was extinguished. **No figure of any kind was
  retrieved.** Press accounts describe it as having become non-functional before the reorganisation;
  those are RELAYED and I did not retrieve a document establishing it. **The pending-caseload
  question for the Accountability Commission is entirely open — there is no ~630 equivalent.**
- Whether any J&K Lokayukta has been constituted for the Union territory since. Not established.
- Whether the State Vigilance Commission has had Commissioners appointed since 31 October 2019.
  `jksvc.gov.in` did not respond (connection timeout, repeated). The ACB's website carries a live
  "Vigilance Commission, J&K" link, which shows the body is referenced but proves nothing about
  whether it is staffed.

---

## 5. NHRC JURISDICTION BEFORE AND AFTER — the substitution question, answered on the instruments

This is the institutional record phase 11 did not author. It is stated as a before/after, because
the hostile reader's question is exactly whether the after replaces the before.

### 5.1 What changed

**One thing changed.** J&K Reorganisation Act, Fifth Schedule Table-1 entry 86, verbatim (RETRIEVED
primary in this run): "The Protection of Human Rights Act, **1993**. Proviso to sub-section (2) of
section 1 shall be omitted." The deleted proviso, verbatim (phase 11, RETRIEVED from NHRC's own
hosted copy): "Provided that it shall apply to the State of Jammu and Kashmir only insofar as it
pertains to the matters relatable to any of the entries enumerated in List I or List III in the
Seventh Schedule to the Constitution as applicable to that State."

**So from 31 October 2019 the NHRC has ordinary, undiminished-by-territory jurisdiction over the two
Union territories for the first time.** Before that date it was confined in J&K to Union and
Concurrent List matters, which left ordinary policing — a State List subject there — outside it.

### 5.2 What did not change

**Section 19 is untouched.** It is not in Table-1, it is not amended anywhere in the Act, and the
Act's only operation on the PHRA is the deletion of the s.1(2) proviso. Phase 11's retrieved text
stands: for complaints of human-rights violation by members of the armed forces the Commission "may,
either on its own motion or on receipt of a petition, seek a report from the Central Government" and
then "either not proceed with the complaint or… make its recommendations to that Government" — with
ss.13, 14 and 17 disapplied by the opening "Notwithstanding anything contained in this Act". And
s.2(1)(a) defines armed forces to include "any other armed forces of the Union", which carries the
CRPF, BSF, ITBP, SSB, CISF, NSG and Assam Rifles inside the same restriction.

**The 24-hour custodial-death intimation regime is untouched.** Its addressees remain District
Magistrates and Superintendents of Police (phase 11, RETRIEVED). No Army formation, Rashtriya Rifles
unit or central-force sector command is an addressee.

### 5.3 The pincer before, and the shape after

**Before 31 October 2019** the two commissions divided the subject matter and neither could reach
the forces: NHRC covered Union and Concurrent subjects, the SHRC covered State and Concurrent
subjects (PHRA s.21(5) drawing the corresponding line), and s.19 removed the armed forces from
NHRC's investigative reach on either side of the division. OHCHR June 2018 para 95, verbatim (phase
11, RETRIEVED): "SHRC did not send a notice to the Indian Army as it does not have jurisdiction over
forces controlled by the central government operating in Kashmir." **Nobody with investigative
powers could reach the Army or the CAPFs. That is the true baseline, and any account that treats
2019 as the moment accountability was lost is wrong about the starting position.**

**After 31 October 2019** the division is gone, because one side of it is gone. One commission now
covers everything — with s.19 unchanged. **So the change is real and it is in one direction only:
the subject-matter carve-out was removed and the force-based carve-out was not.** The territorial
limit on NHRC's jurisdiction was lifted; the limit on its powers over the forces most present in the
territory was not.

### 5.4 DID NHRC SUBSTITUTE FOR THE SHRC? — the answer, and what the answer rests on

**The government's own answer is yes, and it is on the record.** The J&K administration told the
Supreme Court, through the Solicitor General, that "the National Human Rights Commission (NHRC), not
the State Human Rights Commission, would be the appropriate statutory panel to deal with human
rights issues in J&K because of its status as a Union Territory", noting that the state laws
constituting such commissions "had already been repealed and some new panels were set up under
central laws". **RETRIEVED** press account, The Tribune, 20 March 2023
(`https://www.tribuneindia.com/news/nhrc-not-jk-body-to-deal-with-human-rights-cases-jk-administration-to-supreme-court-489516/`,
HTTP 200) — **T4. The affidavit itself was NOT retrieved and is RELAYED.** Per the same account the
affidavit listed the human rights, women and child rights, disabilities, information, consumer
disputes, electricity regulatory and accountability commissions as standing repealed — which matches
the Fifth Schedule tables I retrieved directly, and is the one point where a press account and a
primary instrument agree exactly.

**On the instruments, the substitution is partial, and the part it fails on is nameable.** For every
complaint whose respondent is a State-police or civil-administration actor, NHRC now has powers the
SHRC had, plus a national machinery, and the substitution is complete or better. For every complaint
whose respondent is the Army, the Rashtriya Rifles or a CAPF, **neither body could ever investigate
and neither can now** — so on the hardest cases nothing was substituted because nothing was lost;
the incapacity is continuous across 31 October 2019.

**The proposition that actually decides the argument is therefore arithmetical: what fraction of J&K
complaints concern forces NHRC may not investigate?** And §3.3 established that this is exactly the
quantity NHRC does not publish. It publishes complaints by state and complaints by respondent
category, never crossed; and the respondent-category series was discontinued after the 2021-22
report. **The substitution is neither proved nor refuted on published data, because the arithmetic
of the substitution has never been published by anyone.** That is the finding, and it is stronger
than a verdict either way.

### 5.5 NHRC exercising the new jurisdiction — what the record does and does not show

On NHRC's own retrieved reports:
- **Complaint registrations from J&K rose after the break** — 160 in 2019-20 to 995 in 2023-24 (§3.1)
  — and the 2023-24 complaints figure of 982 is more than four times the last pre-break full year
  (210 in 2018-19). The Commission is plainly receiving and registering J&K matters.
- **NHRC recommended monetary relief in J&K cases**: 2 cases totalling ₹37,00,000 in 2020-21
  (Annexure-4), and 4 cases totalling ₹18,00,000 in 2023-24 (Annex 9.1). **RETRIEVED**, both from
  NHRC's own reports.
- **Camp sittings and open hearings, which are NHRC's mechanism for going to a place, were held at
  Shillong, Guwahati, Chennai and Vijayawada in the years retrieved. Annual Report 2023-24, para
  2.3, verbatim: "Two camp sittings/ open hearings were held by the Commission, at Guwahati, Assam,
  on 17th November, 2023, and at Vijayawada, Andhra Pradesh on 6th March, 2024". No camp sitting in
  Jammu and Kashmir appears in any annual report retrieved, 2017-18 through 2023-24.**
- A Srinagar camp sitting and open public hearing is reported in the press as having been held over
  7–9 February, and a Supreme Court bench led by the Chief Justice is reported to have directed a
  mechanism letting people in J&K file complaints to NHRC from J&K itself. **Both RELAYED — press
  only; I retrieved neither the order nor an NHRC record of the sitting.** The sitting falls in a
  reporting year for which **no NHRC Annual Report has been published** (§3.6), so it cannot
  currently be verified on NHRC's own record at all. **This is the publication lag doing real
  evidentiary work: the single best piece of evidence for the substitution case sits in the gap.**

---

## 5A. THE OTHER TWO COMMISSIONS — new ground, and the retained/repealed line

Neither the State Commission for Women nor the State Vigilance Commission appears anywhere in the
corpus. Both were outside my original brief and are added here on the coordinator's instruction.

### 5A.1 The State Commission for Women — REPEALED, and the substitution is the same shape

**On the instruments, all RETRIEVED primary (Gazette):**
- **Table-3 entry 23** repeals "The Jammu and Kashmir [State] Commission for Women Act, 1999. V of
  1999".
- **Table-3, Governor's Acts sub-list entry 10** repeals "The Jammu and Kashmir State Commission for
  Protection of Women and Child Rights Act, 2018. XLVI of 2018" — a body created just one year
  before, by the same Governor's rule that was administering the State.
- **Table-1 entry 66** extends "The National Commission for Women Act, 1990"; **Table-1 entry 11**
  extends "The Commissions for Protection of Child Rights Act, 2006"; **Table-1 entry 87** extends
  the Protection of Women from Domestic Violence Act 2005; **Table-1 entry 85** the POCSO Act.

**So the women's-rights architecture follows the identical manoeuvre as human rights**: the state
commission is repealed and the national commission's jurisdiction is extended in the same schedule.
And it carries the identical defect: **no transitional provision, and s.100's "corresponding
authority" is empty for the same reason** (§1.1). Whatever was pending before either women's
commission on 31 October 2019 is in exactly the position of the SHRC's caseload.

**Two things make this less severe than the human-rights case, and I state them because they are the
strongest points against treating the two as equivalent.** First, the National Commission for Women
has no s.19 equivalent — there is no armed-forces carve-out in the NCW Act, so the extended national
body is not disabled on the class of respondent most present in the territory. Second, the repealed
2018 Act had been in force for barely a year and can have accumulated little.

**What I could NOT establish:** the text of either repealed statute (not retrieved — I did not locate
a retrievable official copy and did not guess URLs); the number of matters pending before either
commission on 31 October 2019; whether the NCW publishes complaint counts by state/UT for J&K.
**None of these was retrieved and none should be asserted.**

### 5A.2 The State Vigilance Commission — RETAINED, and that is the point

Established in §1.5 against two primary copies: **Table-4 entry 164, retained.** Its enabling Act is
the J&K State Vigilance Commission Act 2011 (I of 2011), under which the J&K State Vigilance
Commission Rules 2019 were made by SRO 301 of 23 April 2019 (**RETRIEVED**, §4.3(b)).

**What it covers, on its own Rules' definition (RETRIEVED, verbatim):** a "complaint" is "receipt of
information about corruption, malpractice or misconduct on the part of **public servant**, from
whatever source, constituting an offence under the Prevention of Corruption Act, Samvat 2006 or an
offence with which any official specified in sub-section (2) of section 8 of the Act may under the
Code of Criminal Procedure, 1989 be charged at the same trial". Its Rules also provide that the
Commission "shall have its offices both at Srinagar and Jammu and shall move from Srinagar to Jammu
and vice-versa on Annual Darbar Move of offices" — a provision now overtaken, since the Darbar Move
was discontinued.

**Note the two dangling references.** The Rules are anchored to the **Prevention of Corruption Act,
Samvat 2006** and the **Code of Criminal Procedure, 1989** — and Table-3 repealed both (the state
PoC Act at entry 107, the state CrPC at entry 21). **So a statute retained in Table-4 operates
through Rules that point at statutes repealed in Table-3.** The ACB's re-notification under the
central Prevention of Corruption Act 1988 and the central CrPC 1973 (S.O. 231 of 2020, RETRIEVED,
§4.3(c)) repairs the chain for the *Bureau*. **Whether the Vigilance Commission's own Rules were
correspondingly adapted under s.96 within the one-year window I could not establish** — no
adaptation order for them was retrieved. This is a live, specific, checkable question and it is
recorded as such rather than resolved.

**Why the retention matters to a part about rights institutions.** It is the control case. The same
schedule that could not find a way to preserve four complaint-receiving bodies found a way to
preserve this one. The difference is not drafting capacity.

---

**And the referral column reads zero.** NHRC transferred 5,736 cases to State Human Rights
Commissions nationally in 2023-24 "under Section 13(6) of the PHRA, 1993" (AR 2023-24 para 2.2,
RETRIEVED). J&K's share of that mechanism is nil and structurally must be, because there is no
commission to transfer to. **Every other State's complainants have two bodies. J&K's have one.**

---

## 6. THE THREE DELEGATED STRANDS — headline findings, with the detail in their own files

Three strands were delegated to opus sub-agents, each required to write its own file rather than
return text. **All three files exist on disk** and are the citable record for their subjects:

- `08b-ohchr-access.md` (422 lines)
- `08b-state-information-commission.md` (181 lines)
- `08b-civil-society-capacity.md` (378 lines)

### 6.1 OHCHR and UN access — the dispute is live, and it is about access

The decisive facts, all RETRIEVED by that strand from OHCHR's own databases on 3 August 2026:

- **India has held a STANDING INVITATION to all thematic special procedures since 14 September
  2011.** This is the fact that gives the dispute its shape: India is not a state that refuses
  special procedures in principle.
- **The last completed country visit to India by any mandate holder was the Special Rapporteur on
  water and sanitation, 27 October – 10 November 2017** — twenty-one months before the
  constitutional break. **The count of completed special-procedures visits to India since 5 August
  2019 is ZERO**, on OHCHR's own record rather than on journalism.
- The special procedures have continued to publish on Kashmir throughout, most recently a joint
  statement of **eleven mandates on 24 November 2025** concerning the aftermath of the 22 April 2025
  Pahalgam attack. **So the dispute is live in 2026 and is not historical.**
- **Every factual claim in that 2025 statement is hedged — "reports of", "reportedly", "around
  2,800", "around 8,000". That hedging is the signature of remote monitoring without access**, and
  it is the circularity of §5's structure made visible in the text: the material is unverified
  because access was denied, and it is dismissed as unverified by the party that denied it.

**On my brief's specific question — does P-82 or P-87 already cover this?** I checked both records'
text. **P-87 carries the circularity in its `notes` field, but P-87's SUBJECT is the termination of
the JKCCS/APDP instrument; P-82's subject is the AFSPA reporting asymmetry. Neither record's subject
is the access dispute.** **The provenance candidate therefore stands** (P-cand-3, §12), and the
strand file supplies the retrieved material to author it.

**A cross-link established in this part, not in that one:** the RTI trail in §7 reports that a group
of UN Special Rapporteurs wrote to the Union government in **July 2020** specifically about the
SHRC's abandoned pending cases, and received no reply. **That is the access dispute and the
abolition of the SHRC touching the same file.** RELAYED — neither this strand nor I retrieved that
communication, and the strand records a retrieval failure against the special-procedures
communications database.

### 6.2 The State Information Commission — the winding-up order, and the silence in it

That strand retrieved **Government Order No. 1144-GAD of 2019 of 23.10.2019** winding up the SIC —
the order whose neighbours I then used to find the SHRC and Accountability Commission orders (§2A).
Its finding on pending business is the same as mine and was reached independently: **the order
disposes of the Commissioner, the staff, the vehicles, the buildings, the furniture and the
electronic gadgets, and sends "all records pertaining to the Commission" to the General
Administration Department "for record". It contains no clause about pending appeals or complaints,
and the words "second appeal", "complaint", "pending" and "transfer to the Central Information
Commission" do not occur in it.**

**Note the one divergence between the orders, which matters for routes:** the SIC's records go to the
**General Administration Department**; the SHRC's and the Accountability Commission's go to the
**Department of Law, Justice and Parliamentary Affairs**. **A single route naming one department for
all of them would be wrong.**

### 6.3 Civil-society capacity — my brief's assumption was WRONG, and that is the finding

My brief anticipated that FCRA data would exist only at all-India level and instructed me to record
that as a denominator problem. **The strand established the opposite and I record the correction
rather than the expectation.** From the FCRA portal's own JSON endpoints, retrieved 3 August 2026:
**Jammu & Kashmir — 78 active, 78 cancelled, 71 expired, 228 registrations ever**, against all-India
14,436 active / 22,496 cancelled / 15,224 expired. And from a **RETRIEVED parliamentary reply**
(Rajya Sabha Unstarred Question No. 3253, answered 29 March 2023, MoS Home Shri Nityanand Rai):
**10 FCRA cancellations in Jammu & Kashmir over 2020 to 22 March 2023**, with J&K foreign-contribution
receipts of ₹50.03cr, ₹56.05cr and ₹55.77cr in FY2019-20 to FY2021-22.

**So state/UT granularity exists and the denominator is fine-grained. There is no denominator problem
of the kind assumed.** What there is instead is a **periodisation problem, which is the phase's own
fixed break biting in an unexpected place: the FCRA tables list 32 States/UTs and carry NO LADAKH
ROW.** The FCRA geography is still the pre-31-October-2019 geography, so "Jammu & Kashmir" in the
FCRA data **has not changed referent when it should have**. That is the mirror image of the NHRC
problem in §3.2, where the referent changed mid-year without being marked. **One instrument broke its
denominator silently and the other has not broken it at all.**

---

## 7. THE ~630 COMPLAINTS AND THE CUSTODY OF THE RECORDS

### 7.1 What I retrieved, and what remains relayed

**RETRIEVED**, The Wire, "J&K: Complaints About Human Rights Violations Have Remained Locked for
More Than 2 Years", `https://m.thewire.in/article/rights/records-of-alleged-human-rights-violations-in-jk-locked-up-since-shrc-wound-up-rti`
— HTTP 200, 136,825 bytes. **T4.** Also **RETRIEVED**, Deccan Herald (PTI copy) of the same story,
published 13 February 2022, HTTP 200 — but its article body did not render in extraction, so I rely
on The Wire.

**The RTI replies themselves were NOT retrieved and remain RELAYED**, exactly as phase 11 graded
them. What is now improved is that a document carrying their content has been retrieved and can be
quoted, and the requester is named.

From The Wire, verbatim: "Files pertaining to **more than 630 cases** of allegations of murder,
enforced disappearances, rape, and other kinds of human rights violations allegedly perpetrated by
security forces on residents of Jammu and Kashmir have been lying locked up in the premises of the
erstwhile Jammu and Kashmir State Human Rights Commission (JKSHRC) for nearly 27 months now, Right
to Information (RTI) queries filed by transparency advocate and human rights activist **Venkatesh
Nayak** have revealed."

And: "**no effort was made to transfer these important files** pertaining to the alleged human
rights violations in the state to the National Human Rights Commission. It was revealed to him that
the JKSHRC, which was the custodian of these files, had handed them over to the Law Department.
However, **the Law Department only acknowledged that these files were lying locked up in the
commission's premises and did not divulge any information about their transfer.**"

**The requester is Venkatesh Nayak — the same named requester as the AFSPA section 7 RTI and CIC
second appeal that phase 11 built L-0122 and P-82 on.** Two of the three hardest disclosure
questions in this domain trace to one individual. That is worth recording about the instrument: **the
supply of pressure on these files is not institutional, it is one person.**

### 7.2 A UN thread that belongs to §6

The same article reports that "a group of **UN Special Rapporteurs** had in **July 2020** sent a
special communication to the Union government, urging action on these pending cases. However, the
Union government has not bothered to reply to their concerns until date." **RELAYED** — I did not
retrieve the communication. It is a specific, dated, checkable item in the special-procedures
communications database and it is flagged for the OHCHR strand (§6).

### 7.3 THE `withheld` TEST, APPLIED STRICTLY — and it FAILS

This looks like the strongest `withheld` candidate in the phase. **It is not one.** Applying the
schema's test element by element:

| Element required for `withheld` | Present? |
|---|---|
| Named requester | **YES** — Venkatesh Nayak |
| Specific request | **YES** — the number of complaints pending before the SHRC as at 31 October 2019, and the custody and transfer of the records |
| Date | **YES** — RTI replies reported 13 February 2022 |
| **Release REFUSED** | **NO** |

**The requests were answered, not refused.** The Law, Justice and Parliamentary Affairs Department's
answer was that the records are locked in a designated room at the former Commission's premises, were
not formally handed over, and are therefore not accessible to the department. **That is a claim of
non-access by the holder, not a refusal to disclose.** There is no identifiable refusal by an
identifiable authority on a stated ground — which is precisely what distinguished the AFSPA case
(L-0122), where the CIC refused on section 8(1)(a) with reasons on the record.

**Classification: `not-published`.** This confirms phase 11's classification rather than changing it,
and it now rests on the strict test rather than on impression. **Phase 10 demoted two on this test
and phase 11 demoted one; this is the phase-12 instance, and it is a demotion that would have been
easy to get wrong**, because every surface feature except the operative one is present.

### 7.4 The route, improved

Phase 11's route was "an RTI to the J&K General Administration Department… addressee could not be
verified because jkhome.nic.in was unreachable". §0 establishes that `jkhome.nic.in` still does not
resolve, so that limitation stands. **But the route can be improved on the evidence now held**, and
the improvement is that the correct addressee is identified by the RTI trail itself:

**The holder is the J&K Department of Law, Justice and Parliamentary Affairs**, which answered
Nayak's RTI and is the department to which the Commission's records were said to have been handed
over — not the General Administration Department. **A route naming the wrong department is a
placeholder route, and my brief says a placeholder route is worse than none.**

---

## 8. ABSENCES, CLASSIFIED STRICTLY

The four values are applied in the order the schema states, and the test is whether the data exists.

| # | What is not measured | Class | Route |
|---|---|---|---|
| **A1** | The number of complaints pending before the J&K SHRC on 31 October 2019, their disposal status, and the custody of the Commission's records | **`not-published`** — the records physically exist, in a locked room at the former Commission's premises; the holder's answer is inaccessibility, not refusal (§7.3). Producible under compulsion. | RTI or a writ to the **J&K Department of Law, Justice and Parliamentary Affairs** — the department that answered the 2022 RTI and the stated transferee — for an inventory of the former Commission's records and the disposal status of the complaints pending on 31 October 2019. **Not the General Administration Department.** |
| **A2** | **The fraction of J&K complaints to the NHRC whose respondent is the Army, the Rashtriya Rifles or a central armed police force** | **`not-published`** — NHRC registers every complaint against a named respondent and publishes the two dimensions separately (state-wise, and all-India by incident code including Defence Forces 1600-1617 and Para-Military Forces 1700-1717). The cross-tabulation exists in its case-management system and is producible; it has never been printed. | RTI to the NHRC, which is a public authority under the RTI Act, for cases registered from Jammu and Kashmir since 1 April 2017 broken down by incident code; or a parliamentary question to MHA. **This is the number that decides the substitution question (§5.4).** |
| **A3** | Complaints by respondent category, all-India, after 2021-22 | **`not-published`** — the series was published for years and then dropped; NHRC plainly still holds the incident codes, since it codes every case. | Same RTI as A2, extended to the all-India series, framed on the discontinuation after AR 2021-22. |
| **A4** | The number of matters pending before the J&K Accountability Commission, the State Commission for Women and the State Commission for Protection of Women and Child Rights on 31 October 2019 | **`not-published`** — the same physical-custody position as A1 is likely but is **not established**; no figure of any kind was retrieved for any of the three. | The same addressee as A1, extended to all commissions wound up on 31 October 2019. **Flagged honestly: for these three there is no ~630 equivalent and no RTI trail was located.** |
| **A5** | Whether any J&K complaint to the NHRC has been *investigated* rather than referred for a report | **`not-collected`** — NHRC's published disposal categories are dismissal in limine, disposal with directions, transfer to SHRCs, and conclusion after receipt of reports. **There is no published category for "investigated by the Commission's own Investigation Division" broken down by state**, and for armed-forces respondents s.19 forecloses investigation as a matter of law. | Partly closed by A2's RTI; but note that for the s.19 class the answer is knowable a priori and needs no data. |
| **A6** | The number of appeals and complaints pending before the J&K State Information Commission on 31 October 2019 and their fate | **`not-published`** — Government Order No. 1144-GAD of 2019 sent "all records pertaining to the Commission" to the General Administration Department "for record", so a holder is named on the face of the instrument and the material is producible under compulsion. No figure is published. | RTI to the **General Administration Department** (not the Law Department — the two orders name different transferees, §6.2) for the inventory of the former Commission's records and the number of appeals and complaints pending on 31 October 2019. `jkgad.nic.in` is live. |
| **A9** | Jammu and Kashmir's FCRA figures on the post-31-October-2019 territorial definition | **`not-collected`** — the FCRA tables carry 32 States/UTs and **no Ladakh row**, so the data has never been gathered on the current geography; the holder compelled tomorrow could not produce a Ladakh-excluding back-series because registrations were never coded that way. | Not a disclosure route: it requires MHA to add Ladakh to the FCRA state master and restate. State it as such rather than offering a placeholder RTI. |
| **A7** | Whether the J&K State Vigilance Commission Rules 2019 were adapted under s.96 after their anchoring statutes were repealed, and whether the Commission has had Commissioners since 31 October 2019 | **`not-published`** — adaptation orders under s.96 were gazetted and are producible; the Commission's composition is an administrative fact the GAD holds. | The Gazette's file store (`egazette.gov.in/WriteReadData/<year>/<id>.pdf`) for the J&K Reorganisation (Adaptation of State Laws) Orders; and an RTI to the GAD (Vigilance Section), whose order server `jkgad.nic.in` is live. |
| **A8** | Perpetrator-force attribution for the ~630 SHRC complaints | **`never-defined`** is WRONG here and I reject it; the complaints name respondents on their face. **`not-published`**, subsumed in A1. | As A1. |

**Nothing in this part meets `withheld`.** The one candidate that had all the surface features fails
on the refusal limb (§7.3). **I am not proposing any new enum value**, and I note that the two known
gaps — the L-0086 shape (in force, testable in principle, awaiting external adjudication) and the
L-0092 shape (presentational findings) — are to be decided after this phase, not here.

**A note on `not-collected` versus `not-published` for A2**, because it is the classification most at
risk of being got wrong. It would be easy to call A2 `not-collected` on the ground that NHRC has
never compiled the cross-tabulation. **That is the wrong test.** The schema's test is whether the
data exists, not whether the table has been built: NHRC assigns an incident code to every case and
records the state of origin of every case, and it prints both facts separately in the same document.
A body that can print two columns can produce their intersection. **`not-published`.**

---

## 9. THE LEDGER QUESTION — tested against `differentFacts` criterion (c)

**I read the criterion's text in `schemas/ledger.schema.json` before answering, as instructed.** Its
three conditions, of which the third is operative: (a) precondition — the two cases cite different
underlying quantities, not the same one weighted differently; (b) precondition — neither case
contradicts the other's factual claim; (c) **operative** — no single measure exists, **or could be
constructed from available data**, that places both sides' facts on one ledger. "An UNBUILT
comparison FAILS (c): if a common denominator exists in principle and merely has not been built, that
is a gap in the instrument, not a property of the argument."

**Condition (b) is satisfied.** Grant the FOR case its strongest fact in full — that the SHRC had no
jurisdiction over centrally controlled forces, established by OHCHR June 2018 para 95 — and the
AGAINST case is untouched: 630 complaints still abated and s.19 still bars NHRC. Grant the AGAINST
case its strongest fact in full and the FOR case survives too. **Neither contradicts the other.**

**Condition (a) is arguable and I do not need to resolve it, because (c) decides.**

**CONDITION (c) FAILS, AND SO `differentFacts` IS FALSE.** The common measure exists in principle and
is nameable in one sentence: **the number of complaints from Jammu and Kashmir registered by the
NHRC, cross-tabulated by respondent category, with disposal.** That single table would place both
sides' facts on one ledger. If the share of J&K complaints whose respondent is the Army, the
Rashtriya Rifles or a CAPF is small, the FOR case is right that the abolished body's incapacity was
marginal and the national extension is a net gain. If it is large, the AGAINST case is right that
the replacement is barred from the bulk of the caseload. **The two sides are not counting different
objects; they are weighting the same object without knowing its size.**

**And every input to that table already exists in one holder's hands.** NHRC assigns an incident code
to every case — including codes 1600-1617 for Defence Forces and 1700-1717 for Para-Military Forces
— and records the state of origin of every case, and it prints both facts, separately, in the same
annual report. The comparison is **unbuilt, not unbuildable**. That is the textbook description of
what fails criterion (c).

**Answer to the brief's question, explicitly: NO single instrument currently places both sides' facts
on one ledger. But one could be constructed from data already collected, so this is a gap in the
instrument and not a property of the argument. `differentFacts` = FALSE, and the record should carry
a `differentFactsNote` on the false flag saying exactly this** — the schema expressly permits and
values a note on a false flag, and L-0118 is the worked precedent. **This is the judgement most at
risk of being made silently, and marking it true would have been the easy error.**

**A `revisitTrigger` follows directly:** if NHRC ever publishes, or is compelled to disclose, J&K
complaints by respondent category, the common measure becomes buildable and this record should be
re-tested.

---

## 10. BOTH CASES, EACH AT ITS STRONGEST, IN ITS OWN TERMS

### 10.1 FOR — the abolition removed a duplicate layer that was already incapable

The pre-2019 architecture was a **second** state-level commission sitting under a national one, and
on the hardest cases in Jammu and Kashmir it could do nothing at all: OHCHR's own June 2018 report
records at para 95 that the State Commission "did not send a notice to the Indian Army as it does not
have jurisdiction over forces controlled by the central government operating in Kashmir". A body that
cannot notice the principal respondent in the theatre is not an accountability mechanism for that
theatre. Its recommendations were in any case non-binding, as the NHRC's own 2021 record of its
SHRC meeting concedes for state commissions generally — the Commission itself asked the Central
Government to amend the PHRA "to make NHRC and SHRCs recommendations binding on the Government".

Against that, the reorganisation did something no previous arrangement had done: **it deleted the
proviso that had kept the national Protection of Human Rights Act out of Jammu and Kashmir for
matters on the State List**, so for the first time the National Human Rights Commission — better
resourced, with a national investigation division, with statutory reporting to Parliament — has
ordinary jurisdiction over the territory. The same schedule extended the central Right to Information
Act 2005, with its penalty provisions, and the National Commission for Women Act, and the Commissions
for Protection of Child Rights Act, and the Prevention of Corruption Act 1988. The J&K
administration's position to the Supreme Court is precisely this: the NHRC "would be the appropriate
statutory panel to deal with human rights issues in J&K because of its status as a Union Territory".

And the record shows the national body working the territory: **J&K complaint registrations to NHRC
rose from 210 in the last full pre-break year to 982 in 2023-24**, monetary relief has been
recommended in J&K cases in multiple years, and a Supreme Court bench has pressed for a mechanism to
let people file with NHRC from J&K itself. **On this reading, a duplicate and partly ornamental layer
was removed and a stronger one was extended, and the rise in registrations is what substitution
looks like when it works.**

### 10.2 AGAINST — a body with 630 live complaints was extinguished and no one took the caseload

A commission actively examining **more than 630 complaints alleging murder, enforced disappearance
and rape by security forces** was extinguished by a line in a schedule, with no transitional
provision, no successor named, and no arrangement for its files. Its records have sat in a locked
room at its former premises ever since; the department said to hold them says they were never
formally handed over and are not accessible to it; **no effort was made to transfer them to the
National Human Rights Commission**; and a group of UN Special Rapporteurs who wrote to the Union
government about those pending cases in July 2020 has, on the account available, received no reply.

The body said to have replaced it **cannot investigate the respondents those complaints name.**
Section 19 was not touched by the reorganisation: for any complaint against the armed forces — a
class that s.2(1)(a) defines to include "any other armed forces of the Union", and so the CRPF and
BSF — the Commission may only seek a report from the Central Government and then drop the matter or
recommend. It cannot summon, cannot compel, and cannot establish a fact of its own. **In the one
territory where central forces do most of the holding, the substitute is statutorily blind to the
principal respondent**, and the 24-hour custodial-death intimation duty does not run to those forces
either.

Nor is the substitution visible in the instruments that would show it. **NHRC's referrals of J&K
cases to a state commission ran at 38 and 51 in the two full years before the abolition and have been
zero in every year since** — every other State's complainants have two bodies and J&K's have one.
**No NHRC camp sitting or open hearing was held in Jammu and Kashmir in any year for which an annual
report has been published.** The one dimension that ever identified armed-forces and paramilitary
complaints as such was all-India only, was never crossed with the state dimension, and **was
discontinued after the 2021-22 report.** The annual report for 2020-21 arrived nearly four years
late, out of sequence; **and the year containing the first reported NHRC sitting in Srinagar has no
published report at all.**

**And the abolition was not an isolated act.** The same Fifth Schedule, on the same day, repealed the
Human Rights Commission, the Accountability Commission, the Information Commission and the Commission
for Women — every body before which a citizen could bring a grievance against the state — while
retaining, at Table-4 entry 123, the **Public Safety Act 1978**, the statute under which the state
detains without charge. **The arithmetic that would settle whether any of this amounts to
substitution has never been published, because nobody publishes what fraction of J&K complaints
concern forces the National Commission may not investigate.**

---

## 11. THE TWO PHASE-11 TRAPS — where each bites in this part

**Trap (1): a source that looks independent and is media-derived from official reporting is not a
check.** This bites hardest on the ~630 figure and everything around it. The Wire, Deccan Herald,
The Print, Scroll and The Tribune all carry the same story, and they are not five sources — **they
are one RTI reply to one requester, redistributed.** The Deccan Herald copy is explicitly PTI. **A
source that looks independent and is media-derived from official reporting is not a check**, and a
reader counting five outlets as corroboration is counting one document five times. The same applies
to the Supreme Court affidavit in §5.4: multiple outlets, one affidavit, which I did not retrieve.

**It bites a second time, and less obviously, on the NHRC series.** NHRC's registration figures look
like an independent measure of rights conditions in J&K. They are not. They are a count of complaints
*received by NHRC*, which depends on whether people in J&K know to complain to Delhi, can reach it,
and believe it will help — and the Supreme Court is reported to have had to press for a mechanism to
let them file from J&K at all. **A rise from 210 to 982 registrations is consistent with better
access, with worse conditions, or with the removal of the state-level alternative, and the series
cannot distinguish them.** It is a measure of the instrument's reach, not of the world.

**Trap (2): two-sidedness of format does not survive one-sidedness of production.** This part can be
written with a FOR and an AGAINST that look symmetrical, and §10 does exactly that. **The symmetry is
false in one respect that must be stated:** the FOR case is built from instruments the state
produces and maintains — the Act, the Gazette, NHRC's annual reports, the administration's own
affidavit — while the AGAINST case depends on a caseload figure that exists only because **one
private individual filed an RTI**, on records nobody can see, about a body that no longer exists,
documented by organisations that have since been closed, defunded or prosecuted (phase 11: JKCCS's
domain repurposed, its coordinator in custody since November 2021, Amnesty International India
halted in September 2020). **The two cases are not drawing on comparably productive apparatuses, and
presenting them in parallel columns implies a parity of evidentiary supply that does not exist.**
Stage 3 should carry that asymmetry in the record rather than let the format imply it away.

---

## 12. WHAT STAGE 3 SHOULD DO WITH THIS — records, amendments and boundaries

**Amend, do not duplicate:**

1. **L-0121** — amend. Its finding that Army/CAPF custodial deaths "have no cell in any official
   instrument" is correct for NCRB and **wrong as a general statement**: NHRC's Annexure-1 has
   carried a "Defence/Para-Military Custodial Deaths/Rapes" column in every year 2017-18 to 2023-24,
   reading 0 for J&K throughout and 0–6 nationally. The sharper finding is that **a cell exists and
   the reporting duty that would fill it does not bind the forces it names** (§3.5). Its sources[]
   can also be upgraded: the J&K Reorganisation Act is no longer T4 relayed — the **Gazette** text is
   now retrieved (T1), as is India Code's consolidation.
2. **L-0004** — the SHRC unmarked-graves record currently cites SATP at T4. Unchanged by this part,
   but note that the body whose report it rests on was abolished, which is §2's subject.
3. **L-0122 / P-82** — unchanged, but record the link found here: **the same named requester,
   Venkatesh Nayak, is behind both the AFSPA s.7 disclosure route and the SHRC records RTI** (§7.1).
4. **L-0085 / L-0086 — BOUNDARY, do not duplicate.** Those are all-India records about the RTI
   amendment and the DPDP amendment to s.8(1)(j). **This part's information-commission material is
   territorial and institutional — the repeal of the J&K RTI Act 2009 and the extinction of the J&K
   State Information Commission — and is a different subject from the service-conditions and
   exemptions questions those records carry.** State the boundary; do not restate L-0085's argument.

**New records this part supports** (for the authoring stage to weigh, not decided here):
- **The seven winding-up orders of 23 October 2019** (§2A) — seven consecutive order numbers,
  1143–1149-GAD of 2019, one file number, one signatory, disposing of vehicles and furniture and
  saying nothing about pending complaints. **This is the strongest primary evidence in the part and
  it should carry its own record rather than be folded into the SHRC one.**
- The abolition of the J&K State Human Rights Commission and the substitution question (§2, §5).
  `institutional`; `differentFacts` **false** with a note (§9); the arithmetic absence A2 attached.
- The J&K Accountability Commission's repeal and its executive successor (§4) — **zero corpus
  coverage; entirely new**.
- The Fifth Schedule's retained/repealed choice as a single finding (§1.3) — four complaint-receiving
  bodies repealed against the Public Safety Act retained.
- NHRC's J&K complaint series with its 2019-20 straddling break (§3.1–3.2).

**Provenance candidates:**
- **P-cand-1: NHRC's two dimensions that are never crossed** (§3.3–3.4), including the restatement of
  the same labelled financial year between AR 2017-18 and AR 2018-19 with no revision note, the
  dashing of the category series in AR 2019-20, and its disappearance after AR 2021-22.
- **P-cand-2: the Gazette/India Code divergence at Table-1 entry 86** (§1.4) and the method rule it
  establishes — quote the Gazette, record the divergence.
- **P-cand-3: the OHCHR access dispute as a dispute about ACCESS, not about numbers.** Phase 11
  flagged this and it was not authored as such. **I checked: P-87 carries it in its `notes`, but
  P-87's SUBJECT is the termination of the JKCCS/APDP instrument, and P-82's subject is AFSPA
  reporting asymmetry. Neither record's subject is the access dispute.** So the candidate stands. See
  the OHCHR strand file for the current position.

**Sibling correction to carry:** the Vigilance Commission is **Table-4 entry 164 (retained)**, not
Table-3 entry 164; Table-3 has no entry 164 (§1.5).


