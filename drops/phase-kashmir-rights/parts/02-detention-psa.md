# 02 — DETENTION AND THE JAMMU AND KASHMIR PUBLIC SAFETY ACT

Stage-2 research. **No records authored here.** Everything below is graded on the document I actually held.

---

## 0. RETRIEVAL ENVIRONMENT — READ FIRST, IT BOUNDS EVERYTHING BELOW

**Every Indian government host failed DNS resolution in this session.** Probed directly with `dig` and independently through the fetcher:

| Host | Result |
|---|---|
| `www.indiacode.nic.in` / `indiacode.nic.in` | DNS timeout; fetcher `getaddrinfo ENOTFOUND` |
| `www.mha.gov.in` | DNS timeout to curl; **HTTP 403** to fetcher |
| `sansad.in` | DNS timeout |
| `ncrb.gov.in` | DNS timeout |
| `egazette.gov.in` | DNS timeout |
| `legislative.gov.in` | DNS timeout |
| `jkhighcourt.nic.in` | DNS timeout |
| `igr.jk.gov.in` | connection failed |
| `indiankanoon.org` | HTTP 403 |
| `prsindia.org`, `hrlibrary.umn.edu`, `amnesty.org`, `ohchr.org` (asset paths) | resolve and serve |

### 0.1 AND THEN A DELEGATED AGENT REACHED MHA FROM THE SAME MACHINE — read this before concluding anything about reachability

**A stage-2 research subagent I dispatched (running on `claude-opus-5`, model id reported verbatim on request) reached `www.mha.gov.in` with HTTP 200, by `curl` with a browser User-Agent, throughout its run** — and retrieved, text-extracted and grepped **1,301 MHA parliamentary reply PDFs** plus the 16 MB MHA Annual Report 2019-20. **The same host returned 403 to the fetcher tool for that agent too**, exactly as phase 11 recorded.

**So the failure documented in the table above was specific to MY process, not to the network, not to the machine, and not to the hosts.** I record this prominently because the wrong lesson is available and would corrupt future phases: **"the host is down" and "my process cannot resolve the host" are different facts, and I could not tell them apart from inside my own session.** Phase 11 said as much about SATP and was right to.

**Operational rule this yields, and stage 3 should promote it into the phase discipline: a retrieval failure must be retested from a second process before it is written down as an environment fact.** One delegated probe converted "MHA unreachable" into "MHA fully available" and turned the single largest evidence gap in this part into its strongest section (§4).

### 0.2 What this leaves genuinely unretrieved

Marked honestly and separated from the above:

- **Retrieved by me, directly:** Amnesty ASA 20/001/2011 (PDF), Amnesty ASA 20/5959/2022 (PDF), OHCHR Kashmir update 8 July 2019 (PDF), JKCCS/APDP *Annual Human Rights Review 2019* (PDF via mirror), the PSA reproduction at `hrlibrary.umn.edu`, the S.O. 1229(E) reproduction at LegitQuest, and a dozen news and NGO pages named in place.
- **Retrieved by the delegated agent, verbatim quotations reported to me:** all MHA parliamentary replies in §4, and the MHA Annual Report 2019-20. **Marked "RETRIEVED (delegated)" throughout. I did not personally hold these PDFs and I say so rather than blurring it.**
- **Still not retrieved by anyone in this phase:** the bare text of the PSA in any version, the J&K Reorganisation Act and its Fifth Schedule, Article 22 of the Constitution, any NCRB volume, any J&K High Court judgment, any J&K Legislative Assembly proceedings record, the CHRI RTI documents, and the J&K Home Department document of 31 August 2023.

**Standing instruction to stage 3: nothing in this part supports a claim that a document does not exist.** A source nobody reached is a different fact from a source that does not exist.

**One further reachability note:** OHCHR's `www.ohchr.org` served its Kashmir update report PDF to the fetcher in this session, where phase 11 recorded 403 to both fetcher and curl. The delegated agent also found that **the fetcher refuses `web.archive.org` outright while `curl` to the same host returns 200** — which is how it read two Cloudflare-blocked ThePrint articles. **Host reachability in this instrument is process-dependent and must be re-probed each phase, not inherited.**

---

## 1. THE INSTRUMENT ITSELF

### 1.1 What I retrieved, and what I did not — say this before any quotation

**NOT RETRIEVED: the official text of the Jammu and Kashmir Public Safety Act, 1978, in any version.** The India Code copy exists at a URL that appears in search results (`indiacode.nic.in/bitstream/123456789/16496/1/public_safety_act,_1978.pdf`) — **I have not fetched it and it is not cited below as a source.** The host does not resolve.

**RETRIEVED: a reproduction of the Act at the University of Minnesota Human Rights Library**, `https://hrlibrary.umn.edu/research/jammu-publicsafetyact1978.html`, fetched and read. **This is a reproduction on a third-party academic portal, not an official Indian source, and it grades T4.** Under the standing rule a reproduction on a private portal is not retrieval of the Act; I fetched and read the page itself, so it is not RELAYED either. The honest description is: *retrieved reproduction, unverified against the official text.*

**AND — this is the sharpest single caveat in the part — the reproduction I hold is the UNAMENDED 1978 text.** It shows section 18 at twelve months / two years, section 14 appointment "in consultation with the Chief Justice", and section 10 permitting removal "from one place of detention to another place of detention **in the State**". All three of those provisions have since been changed (§1.4, §1.5, §3). **There is no consolidated current text of the PSA in this part. I could not obtain one.** Stage 3 must not present any section of the PSA as the law in force on the strength of this part alone.

### 1.2 What the Act does — from the retrieved reproduction (T4)

**Preamble:** "Whereas it is necessary in the interest of the security of the State and public order to make law providing for the measures hereinafter appearing."

**Section 8 — the power.** The Government may detain a person if satisfied that it is necessary "with a view to preventing him from acting in any manner prejudicial to (i) the security of the State or the maintenance of the public order." Divisional Commissioners and District Magistrates may also exercise the power. An officer-made order lapses in twelve days unless approved by the Government (s.8(4)).

Note the two limbs: **security of the State** and **maintenance of public order**. They carry different maximum periods, and the confusion between them is a recurring quashing ground (§5.4).

**Section 13 — grounds.** "When a person is detained in pursuance of a detention order, the authority making the order shall, as soon as may be but ordinarily not later than five days… communicate to him the grounds on which the order has been made." **And immediately: "Nothing in sub-section (1) shall require the authority to disclose facts which it considers to be against the public interest to disclose."**

**Sections 14–17 — the Advisory Board.** Board of a Chairman "who is or has been a Judge of the High Court, and two other members who are, or have been, or are qualified to be appointed as Judges of the High Court." Government must place the grounds before the Board within four weeks of the order; the Board reports within eight weeks of detention; if the Board finds no sufficient cause the Government "shall revoke the detention order and cause the person to be released forthwith."

**Section 16(5) bars legal representation before the Advisory Board.** Confirmed independently by Amnesty 2011 (RETRIEVED, §5.2): persons "shall not… appear by any legal practitioner in any matter connected with the reference to the Advisory Board."

**Section 18 — maximum periods.** Twelve months for the public-order limb; **two years for the security-of-the-State limb.**

**Section 19(2) — the re-detention gateway.** Quoted by Amnesty 2011 (RETRIEVED): "there shall be no bar to making of a fresh order of detention against a person on the same facts as an earlier order of detention" where the earlier order "is not legal on account of any technical defect" or "has been revoked by reason of any apprehension, of for avoiding any challenge that such order or its continuance is not legal on account of any technical defect."

**Section 22 — immunity.** A complete bar on criminal, civil or "any other legal proceedings… against any person for anything done or intended to be done in good faith in pursuance of the provisions of this Act" (Amnesty 2011, RETRIEVED).

### 1.3 What a detention order does NOT require, and why this is a counting fact and not a rhetorical one

**A detention order requires no charge, no trial, no conviction, and no FIR.** It is issued by an executive officer — the Government, a Divisional Commissioner or a District Magistrate — on satisfaction as to what the person *might* do. Judicial review comes, if at all, only through Article 226 / habeas corpus, which the Act itself does not provide (OHCHR 2019 para 84, RETRIEVED: "The PSA does not provide for a judicial review of detention").

**The counting consequence, stated flatly: a PSA detention is invisible to every crime statistic.** It is not an arrest, so it does not enter an arrest series. There is no FIR, so it does not enter a case-registration series. There is no trial, so it cannot appear in a conviction or acquittal series. **A person can be held for two years and leave no trace in any published crime table.** This is not an oversight in the statistics; it is a structural property of preventive detention, and it is why the rest of this part is about instruments that were never designed to count it.

### 1.4 The 2012 amendment — RELAYED, and it changes the headline periods

**5 April 2012**, the J&K legislature amended the PSA. RELAYED through search extraction of a Library of Congress *Global Legal Monitor* item of 11 April 2012 — **`www.loc.gov` returned HTTP 403 to the fetcher and I did NOT read the item itself.** Corroborated in outline by multiple secondary accounts. Reported changes:

1. **Persons under 18 may not be detained under the PSA.**
2. Grounds must be given in a language the detenu understands.
3. **First-instance detention on the security-of-the-State limb reduced from two years to six months**, extendable to two years "if the conduct of the person detained does not improve".

**Flag for stage 3: the widely repeated "two years without trial" headline is the 1978 ceiling, and after April 2012 it is the ceiling reached by extension, not the first-instance period.** I could not verify the amended section text against any retrieved instrument. Do not quote the amended periods as verbatim statute.

### 1.5 Survival after 31 October 2019 — RETAINED, and the mechanism matters

**Answer: the PSA was RETAINED, not repealed, and then ADAPTED by executive order.**

**Fifth Schedule — I could NOT check Table-1 and Table-3 directly, as instructed.** The Act text does not resolve from any host available to me. What I have:

- **The PSA sits in Table 4 of the Fifth Schedule**, per The Wire, 10 April 2021, reporting the J&K administration's own submission to the High Court — **RELAYED, T4**, `https://m.thewire.in/article/government/jk-public-safety-act-shall-be-deemed-to-be-an-act-passed-by-parliament-admin-tells-hc` (RETRIEVED as an article; its account of the Act is relayed).
- **Table-1 entry 86 and Table-3 entry 117** are the two Fifth Schedule entries phase 11 established (PHRA proviso omitted; J&K Protection of Human Rights Act 1997 repealed). **Neither is the PSA.** The PSA is in neither of the two tables I was asked to check, on the only account I could obtain. **This is a correction to the brief's premise and stage 3 should carry it: the retention instrument is Table 4, not Table-1 or Table-3.** I could not verify Table 4's caption.

**The administration's own constitutional argument, RELAYED via The Wire (T4):** the PSA "shall be deemed to have been passed by the Parliament under Article 22(7)". **This is doing real constitutional work and should not be passed over as boilerplate.** Article 22(7) is the clause under which *Parliament* — not a State legislature — may prescribe the circumstances in which a person may be detained beyond three months without an Advisory Board opinion. A State Act cannot invoke it. By arguing that retention in the Fifth Schedule converts the PSA into parliamentary legislation, the administration is claiming for a 1978 State enactment a constitutional footing it did not have before 31 October 2019. **I did not retrieve Article 22 verbatim** — `indiacode.nic.in` down, Wikisource path 404 — so the constitutional characterisation above is my reading of a clause I did not hold, and stage 3 should treat it as such.

**The adaptation instrument: S.O. 1229(E), the Jammu and Kashmir Reorganisation (Adaptation of State Laws) Order, 2020, dated 31 March 2020**, made under **section 96** of the Reorganisation Act. Its PSA entry is **entry 104**. **RETRIEVED as a reproduction at LegitQuest** (`https://www.legitquest.com/act/jammu-and-kashmir-reorganisation-adaptation-of-state-laws-order-2020/CC70`) — a private legal portal, **T4**, not the Gazette. Entry 104, as reproduced:

- throughout the Act, "the State" → "the Union territory of Jammu and Kashmir";
- "Code of Criminal Procedure, Samvat 1989" → "Code of Criminal Procedure, 1973 (2 of 1974)";
- "Ranbir Penal Code, Samvat, 1989" → "Indian Penal Code (45 of 1860)";
- **section 10: "Omit the proviso."**
- **section 14(3): substituted (see §1.6).**

**Judicially tested, and upheld, in 2026.** *Tanveer Ahmad Mir v. Union Territory of J&K*, **2026:JKLHC-SR:1587**, Justice Wasim Sadiq Nargal, High Court of Jammu & Kashmir and Ladakh. The petitioner argued that substituting "security of the Union Territory" for "security of the State" could be done only by Parliament, not by executive notification. The Court held the adaptation fell within the power Parliament itself delegated by section 96 — "Once the parent law itself gives such power, the action taken under it cannot" be ultra vires — and that S.O. 1229(E) preserved the law's character unchanged. **The petition was dismissed and the detention order upheld.**
**RELAYED, T4.** The judgment itself was not retrieved (`jkhighcourt.nic.in` does not resolve). Two press accounts read: Verdictum (`https://www.verdictum.in/jammu-ladakh-high-court/tanveer-ahmad-mir-v-union-territory-of-jk-2026jklhc-sr1587-jk-psa-1614198`, dating it 18 May 2026) and ETV Bharat (`https://www.etvbharat.com/en/bharat/public-safety-act-remains-valid-in-jammu-kashmir-even-after-reorganisation-says-high-court-enn26051602045`, dating it 16 May 2026). **The two accounts give different dates for the same judgment.** A third (Kashmir Observer) is indexed at 15 May 2026. Not retrieved; date unresolved. **Do not assert a date for this judgment.**

**So the survival answer, precisely: retained by Fifth Schedule Table 4; adapted State→UT by executive order S.O. 1229(E) of 31 March 2020 under s.96; that adaptation challenged and upheld by the High Court in May 2026; and its constitutional footing now argued by the administration to be Article 22(7) parliamentary legislation rather than a State Act.**

### 1.6 THE ADVISORY BOARD WAS RESTAFFED BY THE EXECUTIVE — TWICE, IN TWO YEARS

This is the strongest institutional finding in the part and it is not in general circulation.

**Original s.14 (1978, retrieved reproduction, T4):** Board members "appointed by the Government **in consultation with the Chief Justice of the High Court**."

**Change 1 — 22 May 2018.** The requirement to consult the Chief Justice while constituting the Advisory Board was **removed**. Instrument named by OHCHR at footnote 112: **"India, Jammu and Kashmir (Preventive Detention Laws) Order, 2018, 22 May 2018."** **RELAYED via OHCHR's 8 July 2019 update, which I RETRIEVED as a PDF and read** (`https://www.ohchr.org/sites/default/files/Documents/Countries/IN/KashmirUpdateReport_8July2019.pdf`) — **the OHCHR document is T2 RETRIEVED; the 2018 Order is RELAYED through it and grades T4.** OHCHR para 89: "In May 2018, the State Government further diluted the checks and balances in the application of the PSA by removing the need to consult Jammu and Kashmir High Court Chief Justice while constituting the Advisory Board."

**Change 2 — 31 March 2020, S.O. 1229(E) entry 104.** New s.14(3), as reproduced at LegitQuest (T4), verbatim:

> "The Chairman and the other Members of the Board shall be appointed by the Government on the recommendations of the Search-cum-Selection Committee consisting of the following:- (a) Chief Secretary........ Chairman; (b) Administrative Secretary, Home Department........ Member; (c) Administrative Secretary, Department of Law, Justice and Parliamentary Affairs....... Member: Provided that no sitting Judge of the High Court or the sitting District and Sessions Judge shall be appointed as Chairman or Member of the Board except In consultation with the Chief Justice of the High Court."

**State what this does in plain terms.** The body that reviews detention orders is now selected by a committee of three executive officers, chaired by the head of the administration that makes the orders, and including **the Administrative Secretary of the Home Department — the parent department of the detaining authorities**. Judicial consultation survives only in the narrow residual case of appointing a *sitting* judge. **The composition qualification (a serving or former High Court judge as Chairman) appears untouched; what changed is who chooses the person.**

**A dissent from my own reading, recorded because it is fair.** The 2020 formulation is a standard Indian search-cum-selection template used across statutory tribunals, and it makes the appointment process written and repeatable where the previous formulation ("in consultation with the Chief Justice") was unstructured. That is a real argument and it is not answered by pointing at the Home Department's seat. What the argument does not answer is the specific conflict: this is a tribunal reviewing the executive's own orders.

---

---

## 1A. PERIODISATION FOR THIS SUBJECT — five seams, and they are not all the standard two

The instrument's fixed periodisation applies, and this subject adds three seams of its own. **Listed in date order, with what breaks at each.**

| Date | What it is | What breaks |
|---|---|---|
| **5 April 2012** | 2012 amendment | **A LEGAL-DEFINITION SEAM.** Under-18s barred; first-instance security-of-State period cut from 2 years to 6 months. **A "PSA detention" before and after this date is not the same legal object**, and a maximum-period statement must say which side of it applies. |
| **22 May 2018** | J&K (Preventive Detention Laws) Order 2018 | Chief Justice consultation removed from Advisory Board constitution. **Institutional seam.** |
| **13 July 2018** *(contested — see §3.2)* | J&K PSA (Amendment) Act 2018 | Bar on holding permanent residents outside the territory removed, on one account. **Geographic seam on where a detenu is.** |
| **5 August 2019** | **CONSTITUTIONAL BREAK** (instrument-fixed) | See below — **this is where the two source families part company.** |
| **31 October 2019** | **ADMINISTRATIVE-UNIT BREAK** (instrument-fixed) | J&K ceases to be a State **including** Ladakh and becomes a UT **excluding** it. **Every series whose geographic denominator is "Jammu and Kashmir" changes referent here and must break** — including NCRB's detenu row (§2.3) and any habeas corpus count, since the High Court became the High Court of Jammu & Kashmir **and Ladakh**. |
| **31 March 2020** | S.O. 1229(E) | State→UT adaptation; s.10 proviso omitted; **Advisory Board appointment transferred to an executive committee.** |
| **during 2020** | High Court case-type relabelling | "HCP" → "Writ Petition (Criminal) Habeas Corpus Petition" (§2.6). **A REPORTING-BASE SHIFT inside the only instrument that yields a count**, declared nowhere but an NGO footnote. |

**May 2014 is NOT a seam here and I do not treat it as one.** It is a government change, not a counting-basis change; nothing in the PSA, in NCRB's schedule, or in the High Court's docket changed on it.

### The August 2019 break hits the two source families differently — record it, do not work around it

**This is the instrument's standing rule and this subject is its cleanest illustration.**

**Official series were formally intact across 5 August 2019.** MHA answered in Parliament on 20 November 2019 and again on 5 December 2019; the J&K Home Department went on numbering detention orders; the High Court registry went on receiving petitions. Nothing in the official production line stopped.

**The media-derived and NGO-derived series were degraded at exactly that moment, and the degradation is stated by the producers themselves.** JKCCS/APDP, RETRIEVED, on their own 2019 detention data: **"The location of about 45% of the detainees remains unknown to our knowledge. This gap in knowledge is due to the restrictions of mobility and communications-imposed post August 5."** And, on their wider work, the sentence phase 11 already carries: "complete information collapse in Kashmir."

**So at the single most important moment in this subject's history, the official instrument kept producing numbers whose definitions it would not state, and the non-official instrument that would have stated its definitions lost the ability to observe.** Stage 3 must not smooth this into "data quality declined in 2019". **Two source families broke in opposite ways on the same date, and the reason the post-August-2019 figures cannot be reconciled (§4) is that neither family was in a position to check the other.**

---

## 2. WHO COUNTS DETENTIONS, AND ON WHAT DEFINITION — THE HEART OF THE PART

### 2.1 Three different objects, named as the brief requires

Every figure in circulation is one of three things, and almost nothing that quotes them says which:

- **(a) DETENUS** — persons held under a preventive-detention law **on a given date**. A **STOCK**. This is what a prison census counts.
- **(b) PERSONS DETAINED under the PSA** — persons against whom a PSA order was executed **during a period**. A **FLOW of persons**.
- **(c) PSA DETENTION ORDERS ISSUED** — a **FLOW of instruments**. A person detained, released on quashing, and re-detained on fresh grounds is **one person and two orders**.

**These diverge violently in J&K specifically, because re-detention is routine.** Amnesty 2011 (RETRIEVED) documents individuals held under **up to eight successive PSA detention orders** — Shabir Ahmad Shah, Masarat Alam Bhat — and OHCHR 2019 para 85 (RETRIEVED) records Masarat Alam "charged for the 37th time in November 2018". **In a population where one person can generate 37 orders, (b) and (c) are not approximations of each other.** Any series must declare which it is.

**A fourth object contaminates the August 2019 numbers and must be kept out:** persons taken into **preventive custody under ordinary criminal procedure** (CrPC s.107 read with s.151). Amnesty 2011 (RETRIEVED): these are "sometimes used in J&K only to detain individuals while the paperwork for PSA detention orders or criminal charges are being prepared." **A s.107/151 detention is not a PSA detention and the large post-August-2019 figures are mostly the former** (§4).

### 2.2 The source-instrument map

| Instrument | Counts | Excludes | Publication status |
|---|---|---|---|
| **MHA Annual Report** | **NOTHING. Zero occurrences of "Public Safety Act" and zero of "detenu" in AR 2019-20** — grep-verified on the retrieved 16 MB PDF | everything | Published annually; **the flagship instrument does not mention the Act in the year of the lockdown** |
| **MHA parliamentary replies** | point figures on **five different objects**, ad hoc; **one PSA order count ever (444)**; one PSA stock (396); legal basis stated once | no series, and geography and start date move between answers | Produced **on request only**. "Public Safety Act" appears in **5 of 1,301** replies grep-searched across four sittings |
| **NCRB *Prison Statistics India*** | **(a) DETENUS as at 31 December** | everyone released before 31 Dec; law-wise split unverified | Published annually; J&K row breaks 31 Oct 2019 |
| **NCRB *Crime in India*** | preventive-detention returns; **not PSA-identified** | see §2.5 | Published annually |
| **J&K High Court docket** | **habeas corpus PETITIONS** — i.e. *litigated* detentions | every detenu who did not petition | Raw docket public; **no aggregate published by the Court** |
| **J&K Home Department** | (b) and transfers-out | — | **Not published; produced under RTI and to press** |
| **JKCCS / APDP** | mixed (a),(b) and petitions — **conflated in their own text** | — | Series ends 2019 |
| **Amnesty International** | derived from the HC docket | — | India operations halted 29 Sept 2020 |

### 2.3 *Prison Statistics India* — the most likely official series, and what I could establish

**NCRB does carry detenus as a separate inmate category, and there is a J&K series going back to 1995.** Established from Amnesty 2011 Table 1 (RETRIEVED, ASA 20/001/2011), which reproduces NCRB figures explicitly labelled **"detainees as of 31 Dec"** — confirming NCRB's unit is a **STOCK on 31 December**, object (a):

| Year | 1995 | 1996 | 1997 | 1998 | 1999 | 2000 | 2001 | 2002 | 2003 | 2004 | 2005 | 2006 | 2007 | 2008 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **NCRB, detenus in J&K at 31 Dec** | 799 | 1022 | 725 | 303 | 269 | 497 | 416 | 444 | 397 | 451 | 377 | 369 | 275 | 266 |
| **Greater Kashmir, "Year Wise Detentions"** | 1819 | 1560 | 414 | 460 | 441 | — | — | — | — | — | — | — | — | — |

**These are two different objects and Amnesty prints them in one table without saying so.** NCRB's row is a year-end stock; *Greater Kashmir*'s is a within-year flow. **In 1995 the flow is 2.3× the stock; in 1997 the stock is 1.75× the flow.** A flow cannot be smaller than a year-end stock unless the stock includes people detained in earlier years — which it does, since detention runs up to two years. **The pair is internally coherent only once you name the two objects, and neither the newspaper nor Amnesty names them.** This is the cleanest illustration in the part of the (a)/(b) confusion.

**Also from Amnesty 2011 (RETRIEVED), a ratio worth carrying:** "At its lowest, the percentage of administrative detainees (within the overall prison population) in J&K prisons was 11.5% (2008). This is over 14 times higher than the national average."

**NCRB's own definition of "detenu" appears to be a COMPOSITE with no law-wise split — RELAYED, and this needs closing before it is used.** A definitional note attributed to NCRB reads that detenus "include inmates detained under preventive laws such as **COFEPOSA, NDPS, NSA, PSA, PITNDPS, PBMSECA etc.**" **RELAYED through search extraction only; I did not retrieve any NCRB volume and this sentence must not be quoted as verbatim NCRB text.** If it is accurate, it settles the question in the negative: **the PSA is one of at least six laws inside a single undifferentiated "detenu" cell, and PSA detenus are NOT separable in NCRB's published architecture.**

**NOT ESTABLISHED, and I chased it hard:** whether any *Prison Statistics India* volume carries a table splitting detenus **by the law under which detained**. `ncrb.gov.in` does not resolve for me; a direct volume URL exists in search results and **I have not fetched it, so it is not cited here**. **The J&K detenu figures above are for ALL preventive-detention laws, not the PSA alone**, and stage 3 must not label them "PSA detenus". **The latest volume is *Prison Statistics India 2024*, released around 8 May 2026 — RELAYED — so this is a live series and the test is cheap for any process that can reach the host.**

**Phase 11's P-83 break applies here and I confirm it independently:** phase 11 established that the break at 31 October 2019 sits in *Prison Statistics India* Table 8.1 as well as *Crime in India* Chapter 16A. J&K is a **State** row through the 2019 volume and a **UT** row thereafter with Ladakh split out. **Any detenu series for J&K breaks there and the post-break figure covers less territory.**

### 2.4 *Crime in India* — carries preventive detention, does NOT identify the PSA

**Established, RELAYED (search extraction of NCRB-derived reporting; the volumes were not retrieved):** *Crime in India* carries a preventive-detention return. **2017: 67,084 persons detained as a preventive measure nationally**, of whom 48,815 released within one to six months and 18,269 in custody or still detained at year end. **NSA detentions: 741 in 2020, 483 in 2021**, of which 241 in custody or still detained at end-2021. **J&K recorded the highest number of preventive detentions among Union Territories in 2021.**

**Two things must be said about this and neither is comfortable.**

First: **the return is law-wise at least to the extent of naming the NSA — so a law-wise architecture exists.** Whether a J&K PSA row exists inside it is **NOT ESTABLISHED**. If it does, it is the single most important series in this subject and it has been sitting in a published volume unremarked.

Second: **the same reporting carries a flat contradiction** — that NCRB "does not include cases under the NSA in its data because no FIRs are registered," alongside NCRB figures for NSA detentions. Both cannot be true as stated. The likely resolution is that the FIR-based crime-head tables exclude preventive detention while a separate non-FIR return carries it, but **I could not verify that against a volume and I am not going to guess a table structure.** Flagged as unresolved.

**Phase 11's NCRB finding transfers directly and stage 3 should reuse rather than re-derive it: NCRB's unit of account is the State/UT police, and every row is a State or UT.** The consequence for this part is specific and severe — **a person detained under the PSA and lodged in Agra Central Jail is, on 31 December, an inmate of a Uttar Pradesh prison.** Whether *Prison Statistics India* attributes such a detenu to J&K (the detaining authority) or to UP (the holding prison) is **NOT ESTABLISHED**, and it determines whether a J&K detenu series silently loses 1,122 people between 2018 and 2023 (§3.3). **This is the single most consequential unresolved question in the part.**

### 2.5 The J&K High Court docket — the only instrument that yields a count, and it counts the wrong thing

**Amnesty International, 2 September 2022, ASA 20/5959/2022, RETRIEVED as PDF and read**, states the position in one sentence:

> "In the absence of any publicly available or disaggregated data on the use of administrative and pre-trial detention in Jammu & Kashmir, Amnesty International reviewed 1346 cases available on the website of the High Court of Jammu & Kashmir and Ladakh."

**Every independent quantification of PSA detention I could find uses this same source.** Amnesty 2022, Rhythm Buaria's LiveLaw study of 13 February 2021, JKCCS/APDP's 2019 review, and The Wire's 2023 and 2026 reporting all read the J&K High Court's case-status pages or registry. **There is no second measured spine.**

**And the docket counts LITIGATED detentions, not detentions.** A detenu who never petitions — because the family cannot afford it, because the detenu is in Agra and counsel is in Srinagar, because there is no lawyer — is invisible to every one of these instruments. **Amnesty 2011 documented exactly this class effect** (RETRIEVED): "Most of the detainees belong to low- or middle-income groups… Systemic oppression due to the duality of class factor and occupation hinders them to legally challenge their cases" (the phrasing is JKCCS's; Amnesty makes the same point about the cost of Jammu/Srinagar-only filing). **So the only available count is biased in a known direction: it undercounts the poorest detenus.** Stage 3 must carry that as a property of the instrument, not as a caveat.

### 2.6 THE DOCKET GIVES THREE DIFFERENT ANSWERS FOR THE SAME YEAR — a first-class finding

Habeas corpus petitions filed in 2019, from the same court, by four readers:

| Figure | Reader | Stated source | Retrieved? |
|---|---|---|---|
| **761** | Amnesty International, 2 Sept 2022 | "the website of Jammu & Kashmir and Ladakh High Court" | **RETRIEVED** (Amnesty PDF read) |
| **761** (681 Srinagar + 80 Jammu) | Rhythm Buaria, LiveLaw, 13 Feb 2021 | "data available on the High Court's website as on January 18, 2021" | **RETRIEVED** (article read) |
| **662** | JKCCS/APDP, *Annual Human Rights Review 2019* | "procured from the J&K High court registry" | **RETRIEVED** (PDF read via `kashmir-scholars.org` mirror) |
| **507** | The Wire, Shakir Mir, 29 July 2023 | "high court data accessed by The Wire" | **RETRIEVED** (article read) |

**Amnesty and Buaria agree exactly at 761 — because they used the same method on the same web interface.** That agreement is not corroboration; it is a single measurement made twice. **JKCCS's 662 and The Wire's 507 are materially different and nobody has reconciled them.**

**And there is a documented reason at least one of them could be low. Amnesty 2022, footnote 66, verbatim:**

> "Earlier the courts used the term HCP for habeas corpus petitions in the title of such petitions. In 2020, it was changed to Writ Petition (Criminal) Habeas Corpus Petition."

**The court changed its own case-type label in 2020.** Anyone querying the docket for "HCP" after that change reads a different universe. **This is a reporting-base shift inside the only instrument that yields a number, and it is undeclared anywhere except a footnote in an NGO briefing.** Stage 3 should treat it as a seam on the docket-derived series, distinct from and additional to the 31 October 2019 territorial break.

### 2.7 JKCCS conflates a petition with a detention — in its own table caption

The *Annual Human Rights Review 2019* (RETRIEVED) says in prose:

> "As per data obtained by JKCCS and APDP, as many as 662 fresh PSA detentions were registered in 2019 out of whom the majority (412) were registered post August 5, 2019. (See Table 4)"

**Table 4's own heading is "Habeas Corpus Petitions filed in J&K High Court."** Its rows are: total HCPs filed 2019 = 662; before 5 August = 250; after 5 August = 412; **"Total number of PSA's quashed in 2019 = 8, including of 3 minors."** Footer: "The above data has been procured from the J&K High court registry."

**662 is a count of petitions. The prose calls it detentions.** A detenu who did not petition is not in it, and a person who petitioned twice is in it twice. **This is the definitional error the brief asked me to name, committed by the most careful non-state counter in the field, inside a single paragraph.**

**JKCCS also publishes a second, different number for the same year.** Table 1.1, a district-wise compilation, totals **635 PSA cases** for 2019 (Pulwama highest at 105, Ramban lowest at 1; 387 post-5-August, 247 pre; 116 disposed of). Its stated provenance is different again: "compiled for the year 2019 through information gathered from the **RTI filed by JKCCS and APDP in Jammu and Kashmir High Court** along with extensive field work". **So JKCCS has 662 from the registry and 635 from an RTI to the same court plus fieldwork, and calls both "PSA cases".**

**JKCCS states its own floor, and it should be quoted rather than smoothed:** "We are treating this data cautiously as we anticipate a more number of cases, which are yet to have surfaced either in our data collection or any list produced by the state."

**ARITHMETIC CHECKS I PERFORMED ON JKCCS TABLE 1.1** — recorded because a table that has been checked is a different object from one that has not:
- district column sums to **635** exactly; post-5-August column to **387**; pre-5-August to **247**; disposed to **116**, splitting **14** post and **102** pre. All four internally consistent.
- **387 + 247 = 634, against a stated total of 635. One case is unallocated between the two periods.** Small, but it is the kind of thing that becomes an unexplained discrepancy three hands downstream, so it is recorded here rather than smoothed.
- JKCCS's claim that post-5-August cases "form 60% of the total" checks out: 387/635 = 60.9%.
- **Table 1.3 (locations) sums to 636 against the same population of 635** — 239 shifted out of J&K, 110 not shifted, 287 unknown. Another single-unit inconsistency.
- JKCCS's "nearly 37.4%… moved to jails in various states" checks against 239/635 = 37.6%; "about 45%… location remains unknown" against 287/635 = 45.2%.

**None of this impeaches the compilation. It establishes that the compilation is a hand-built list with one or two transcription slips, which is exactly what JKCCS says it is — and it is still the most complete PSA enumeration in existence for any year.**

**And "8 PSA's quashed in 2019" cannot be reconciled with 161 quashings of 2019-filed petitions (§5.1) — because they are different objects.** JKCCS counts quashings *occurring within calendar 2019*; Buaria counts quashings *of petitions filed in 2019*, measured in January 2021, by which time most had been decided. **Do not reconcile these. The gap is the two-year lag between filing and decision, and that lag is itself the finding.**

---

## 3. WHERE A DETENU IS HELD — the section 10 proviso

### 3.1 The rule and its three-stage history

Amnesty 2011, RETRIEVED, Box 8: "Between 1990 and 2002, there was no provision restricting detention of PSA detainees to within the state. During this period detainees from J&K were regularly held in prisons outside the state… Following a 2002 amendment to the PSA, detainees who are permanent residents of J&K can no longer be held in prisons outside the state."

The proviso inserted in 2002, as quoted in press accounts (**RELAYED**): *"Provided that the detenues who are permanent residents of the state shall not be lodged in jails outside the state."*

### 3.2 THREE DATES ARE IN CIRCULATION FOR ITS REMOVAL AND I CANNOT SETTLE IT — this is a finding, not a gap in my work

| Date | Instrument named | Source | Grade |
|---|---|---|---|
| **13 July 2018** | **"Jammu and Kashmir Public Safety Act (Amendment) Act, 2018"** | **OHCHR update 8 July 2019, footnote 103** — I RETRIEVED and read the OHCHR PDF; the Act itself is RELAYED | T4 (relayed instrument) |
| 11–13 July 2018 | State Administrative Council 3rd meeting recommended deletion; assent from Raj Bhavan; in force 13 July | press (Greater Kashmir, The Statesman) — **NOT RETRIEVED**: Greater Kashmir 404, The Statesman 403 | RELAYED via search extraction only — thin |
| **June 2019** | "amendment to section 10 of PSA brought in by the Governor administration in June 2019" | **JKCCS/APDP Annual Human Rights Review 2019 — RETRIEVED** | T4 |
| **31 March 2020** | **S.O. 1229(E), Adaptation of State Laws Order 2020, entry 104: "Omit the proviso."** | **LegitQuest reproduction — RETRIEVED page, T4** | T4 |

**The tension is real and it is not a reporting sloppiness I can wave away.** If the J&K PSA (Amendment) Act of 13 July 2018 validly omitted the proviso and remained in force, **there was nothing for S.O. 1229(E) to omit on 31 March 2020.** That the 2020 Order does omit it is evidence that, in the drafters' view, the proviso was still on the statute book at that date. The competing explanation is that entry 104 was drafted against the un-amended base text and repeated the omission for certainty. **I could not distinguish these, because I could not retrieve either instrument.**

**Why it matters, concretely.** OHCHR (RETRIEVED, para 86) records that following the July 2018 amendment "**At least 40 people**, chiefly separatist political leaders charged under the PSA" were transferred out. **And the J&K Home Department's own figures record 295 transfers in 2019** (§3.3) — i.e. **before 31 March 2020**. **If the operative removal is the 2020 Order, then the 2019 transfers — including the post-5-August cohort — were made while the proviso arguably still stood.** That is a live legal question and it is currently before a court (§3.4). **Stage 3 must not pick a date. Record all four rows and the tension.**

### 3.3 THE STATE PUBLISHES A TRANSFER SERIES BUT NOT A DETENTION SERIES

**A document of the Jammu and Kashmir Home Department dated 31 August 2023** gives PSA detenus transferred to jails outside J&K:

| 2018 | 2019 | 2020 | 2021 | 2022 | 2023 (to 1 Aug) | **Total** |
|---|---|---|---|---|---|---|
| 44 | 295 | **absent** | 146 | 585 | 52 | **1,122** |

**RELAYED, T4**, through two independent accounts I retrieved and read: FairPlanet, Umer Maqbool, 18 September 2023 (`https://www.fairplanet.org/story/kashmir-people-detained-public-safety-act-india/`), which attributes it to "a document issued on 31 August 2023 by Kashmir's Home Department"; and The Polis Project, Sajad Hameed and Qazi Shibli, 22 December 2023 (`https://thepolisproject.com/read/geographical-displacement-and-medical-negligence-the-plight-of-kashmiris-detained-under-the-public-safety-act/`). **The Home Department document itself was not retrieved.**

**Arithmetic check I performed: 44 + 295 + 146 + 585 + 52 = 1,122 exactly.** So the published total is internally consistent with **zero transfers in 2020**, and 2020 is not a dropped row — it is a whole-year zero, in the COVID year when inter-state prisoner movement was suspended. Record it as a stated zero, not as missing data.

**Same document: 408 PSA detenus, including 29 foreigners, held outside J&K as at that date.**

### 3.3A AND THERE IS A SECOND, OFFICIAL, PARLIAMENTARY OUT-OF-TERRITORY SERIES — RETRIEVED

**Rajya Sabha Unstarred Question No. 1818, answered 4 December 2019**, to **Shri M.P. Veerendra Kumar**, "POLITICAL DETENTION IN KASHMIR" — **RETRIEVED (delegated)**, `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2019-pdfs/rs-04122019/1818.pdf`. Tabled from J&K prison records:

| Year end | Convicted | Under trial | **"Detained"** | Total in J&K | **Lodged in UP** | **Lodged in Haryana** | Grand total |
|---|---|---|---|---|---|---|---|
| 2014 | 288 | 1711 | **7** | 2006 | 0 | 0 | 2006 |
| 2015 | 277 | 1714 | **54** | 2045 | 0 | 0 | 2045 |
| 2016 | 243 | 1728 | **395** | 2366 | 0 | 0 | 2366 |
| 2017 | 196 | 1936 | **172** | 2304 | 0 | 0 | 2304 |
| 2018 | 192 | 2283 | **253** | 2728 | 0 | **41** | 2769 |
| **2019 (to Nov)** | 169 | 2723 | **356** | 3248 | **234** | **27** | **3509** |

**Three things, and each is load-bearing.**

**(i) This is a year-wise official series for the "Detained" prison category, 2014 to 2019 — and it is the only one that exists.** It is a **year-end STOCK**, object (a), from prison records, and **it is not PSA-identified** — it is all preventive-detention detenus in J&K prisons. **It is not the PSA series, and stage 3 must not label it one.**

**(ii) It independently confirms the section 10 story from the government's own numbers.** Out-of-territory lodging is **zero in 2014, 2015, 2016 and 2017**; **41 in 2018**, in Haryana only; **261 by November 2019**. **The step change is exactly where the section 10 amendment story says it should be, and MHA tabled it.** That is stronger corroboration of §3.2 than anything in the press, and it slightly favours the 2018 date over the 2020 one — while not settling it, since 41 transfers in 2018 could also reflect non-permanent-residents, whom the proviso never covered.

**(iii) The 2016 spike — 395, against 7 two years earlier — is the Burhan Wani year.** Detenus in J&K prisons rose 56-fold between 2014 and 2016 and had not returned to the 2014 level by 2019. **Stage 3 should note that this series contains the 2016 mass-mobilisation signal that the caseFor rests on (§8.1), which makes it unusually valuable: it is one official table on which both sides' 2016 claims can be read.**

**And the same reply is the one whose published PDF stops mid-sentence** (§4.5).

**Now the finding.** The J&K Home Department can produce, on a single sheet, a five-year year-wise series of PSA detenus moved out of the territory. **It has never published a five-year year-wise series of PSA detenus.** The apparatus that generates the first necessarily generates the second — you cannot count which detenus you moved without counting detenus. **This is decisive for the classification in §6: the PSA detention count is `not-published`, not `not-collected`.**

**A second, independent proof of producibility: every PSA detention order carries a district-year serial number.** Visible in Amnesty 2011's case citations (RETRIEVED) — `01/DMK/PSA/2006`, `117/DMB/PSA/2009`, `07/DMS/PSA/2010`, `DMS/PSA/29/2006` — and in the 2025 order against MLA Mehraj Malik, **"Detention Order No. 05 of 2025"** issued by the District Magistrate, Doda. **A serial number is a count. Every District Magistrate in J&K necessarily knows how many PSA orders they issued in a year, because they numbered them.**

### 3.4 The challenge to the transfer power

The J&K High Court Bar Association filed a writ petition against the section 10 amendment (JKCCS 2019, RETRIEVED: "The matter is pending before the Court"). **The Supreme Court transferred the matter to the High Court of J&K on 16 May 2023**, where a challenge to the constitutional validity was already pending; still under adjudication at the end of 2023 (**RELAYED**, Polis Project). **Current status NOT ESTABLISHED.**

The administration's stated justification, **RELAYED**: overcrowding, security within the correctional system, and avoiding the mingling of "hardcore" insurgents with other prisoners; the 2018 escape of a militant from a Srinagar hospital cited as precedent.

### 3.5 What holding a detenu outside the territory does to accountability — documented, not asserted

- **The families.** JKCCS 2019 (RETRIEVED): "Nearly 37.4% of the detainees in PSA related cases have been moved to jails in various states across India"; and "**The location of about 45% of the detainees remains unknown to our knowledge**", attributed to the post-5-August mobility and communications restrictions. Its Table 1.3 locates detenus at District Jail Agra (85), Ambedkar Nagar (60), Varanasi (30), Lucknow (24), Bareilly (20), Central Jail Naini/Prayagraj (16+4), not shifted (110), **unknown (287)**.
- **A death.** JKCCS 2019 (RETRIEVED): a Jamaat-e-Islami detenu died in Naini jail, Prayagraj, on 23 December 2019, in prison since July; "his family had no inkling of his illness. The family was informed only after the inmate's death."
- **The information barrier is legally enforced.** See §6, absence D4: Agra Central Prison refused to disclose **even the number** of J&K detenus it held.

---

## 4. THE AUGUST 2019 DETENTIONS — competing numbers, and why they must not be reconciled

**Per figure: who stated it, in what forum, on what date, on what definition, covering what period.**

**Every MHA figure below is RETRIEVED (delegated) from the actual reply PDF on `mha.gov.in`, with question number, House, date, questioner and Minister.** Every one is answered by **Shri G. Kishan Reddy, Minister of State in the Ministry of Home Affairs**, and **every one attributes the figure to "The Government of Jammu and Kashmir has reported…"** — **MHA relays; MHA does not own the number.** That attribution formula is itself trap (2) in the government's own words and stage 3 should quote it.

### 4.1 THE SENTENCE THAT SETTLES THE DEFINITIONAL QUESTION

**Rajya Sabha Unstarred Question No. 1958, answered 11 March 2020**, to Sardar Sukhdev Singh Dhindsa and Shri Tiruchi Siva, "DETENTION UNDER PSA IN KASHMIR" — **RETRIEVED (delegated)**, `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2020-pdfs/rs-11032020/1958.pdf`:

> "…cumulatively 7357 persons including stone pelters, miscreants, over ground workers (OGWs), separatists, etc. were taken into preventive custody since August, 2019. Out of these, 451 such persons are presently under preventive detention, which includes 396 persons under Jammu and Kashmir Public Safety Act (PSA).
> **Detentions have been made u/s 107 Cr.PC, as also under J&K Public Safety Act, 1978.**"

**That last sentence is the most useful thing the Government of India has ever put on the record on this subject, and it does the work of this entire part.** It establishes, from the government's own pen, that **the large circulating figures are NOT PSA figures** — they are preventive custody by executive magistrates under **section 107 of the Criminal Procedure Code**, with PSA detentions a sub-set. **7,357 is a CrPC-class number. 396 is the PSA number. The gap of 55 between 451 and 396 is the CrPC-107 residue, and the government stated it.**

**So the answer to "how many of the post-August-2019 detentions were under the PSA" is not unknowable and was not withheld. It was answered on 11 March 2020, and almost nobody quoting 7,357 has said so.**

### 4.2 AND THE ONLY PSA ORDER COUNT MHA HAS EVER GIVEN

**Rajya Sabha Unstarred Question No. 349, answered 5 February 2020**, to Shri Rajkumar Dhoot, "REVIEW OF DETENTION CASES IN J&K" — **RETRIEVED (delegated)**, `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2020-pdfs/rs-05022020/349.pdf`:

> "…detention orders were issued against **444 persons** under the Jammu and Kashmir Public Safety Act (PSA), 1978, since August 2019. At present, **389 persons** are in detention under PSA."

**This is object (c) and object (a) in one sentence, and it is the only time MHA has produced object (c) at all.** Note the phrasing: "detention orders were issued **against 444 persons**" — persons, not orders. **So even the order count is expressed per-person, and the re-detention multiplier (§2.1) is invisible in it.**

### 4.3 The full table

| Figure | Object counted | Stater / forum / date / questioner | Period and geography | Retrieval |
|---|---|---|---|---|
| **5,161 preventive arrests; 609 still detained; ~218 stone pelters** | **preventive arrests by magistrates** — NOT PSA | **RS Starred Q. *38, 20 Nov 2019**, asked by **Shri Tiruchi Siva** | since 4 Aug 2019; **Kashmir Valley only** | **RETRIEVED (delegated)** |
| same 5,161 / 609 / ~218 | same | **RS US Q.1021, 27 Nov 2019**, Shri Elamaram Kareem | "**since August 2019**" — start date silently changed from 4 Aug | RETRIEVED (delegated) |
| **765 arrested in 190 cases** | arrests in stone-pelting / law-and-order cases | **LS US Q.344, 19 Nov 2019** | 5 Aug – 15 Nov 2019 | RETRIEVED (delegated) |
| **194 cases** | cases registered for breach of peace | **RS US Q.1821, 4 Dec 2019**, Shri Elamaram Kareem | after 5 Aug 2019, J&K | RETRIEVED (delegated) |
| **Detained-category prisoners: 7 (2014), 54 (2015), 395 (2016), 172 (2017), 253 (2018), 356 (to Nov 2019)**; lodged outside J&K: 0, 0, 0, 0, **41 (Haryana, 2018)**, **234 UP + 27 Haryana (2019)** | **prison inmates in the "Detained" category at year end — a STOCK, from J&K prison records, NOT PSA-identified** | **RS US Q.1818, 4 Dec 2019**, asked by **Shri M.P. Veerendra Kumar** | 2014 → Nov 2019 | **RETRIEVED (delegated)** |
| **444 PSA detention orders; 389 in PSA detention** | **(c) then (a), PSA-identified** | **RS US Q.349, 5 Feb 2020**, Shri Rajkumar Dhoot | since Aug 2019 | **RETRIEVED (delegated)** |
| **6,605 preventive custody; 437 still detained, "amongst whom none is minor"** | preventive custody by magistrates | **RS US Q.360, 5 Feb 2020**, Shri Binoy Viswam | since Aug 2019; **Jammu + Kashmir + Ladakh** | **RETRIEVED (delegated)** |
| **7,357 preventive custody; 451 detained, of which 396 PSA; "u/s 107 Cr.PC, as also under PSA"** | both objects, and the legal basis stated | **RS US Q.1958, 11 Mar 2020** | since Aug 2019; **geography not stated** | **RETRIEVED (delegated)** |
| **"nearly 450"** | preventive detention stock | **LS US Q.3745, 17 Mar 2020** | as at answer date | RETRIEVED (delegated) |
| **223 under detention; NO person under house arrest; NSA political detentions "Nil"** | undefined stock | **LS US Q.247, 15 Sep 2020**, Prof. Saugata Ray | as on **11 Sep 2020** | **RETRIEVED (delegated)** |
| **613 detained / 430 released** | **undefined — a fourth series** | **RS US Q.208, 3 Feb 2021**, Shri Ripun Bora and Smt. Priyanka Chaturvedi | since 1 Aug 2019 | RETRIEVED (delegated) |
| **627 detained / 454 released** | same undefined category | **LS US Q.2303, 9 Mar 2021** | since 1 Aug 2019 | RETRIEVED (delegated) |
| **4,844 arrested; 1,281 in custody; 3,563 released; 177 politicians; 746 PSA arrestees still in jail; 235 shifted to UP** | mixed, from **LEAKED OFFICIAL DOCUMENTS** | ThePrint, Ananya Bhardwaj, **26 Nov 2019** | arrests to 30 Sep 2019; PSA/lodging to 31 Oct 2019 | **RETRIEVED (delegated) via `web.archive.org`** |
| **>3,800 arrested, ~2,600 released** | "arrested", basis unstated | an unnamed **government report dated 6 Sep 2019**, seen by **Reuters** | to 6 Sep 2019 | **RELAYED** through HRW's release of 16 Sep 2019 (retrieved) |
| **"at least 4,000" under PSA** | claimed PSA detentions | **an anonymous magistrate, to AFP**, ~18 Aug 2019; figure said to be collated by satellite phone during the blackout | since 5 Aug 2019 | **RELAYED, and weak — single anonymous source, self-described improvised collation. Do not carry it as a PSA figure.** |
| **"at least 2,300"** | detained, mostly young men | **AP**, citing "top Kashmir police and arrest statistics reviewed by AP", ~20 Aug 2019 | since 5 Aug 2019 | **RELAYED** |
| **"several thousand"; ~400 elected officials and political leaders** | preventive detention | **Human Rights Watch**, 16 Sep 2019 | since 5 Aug 2019 | RETRIEVED (delegated) |
| **239 shifted outside J&K; 110 not shifted; 287 location unknown; 635 PSA cases** | (b), PSA, location-resolved | **JKCCS/APDP** | 2019 | **RETRIEVED** by me |
| **~43 politicians at SKICC Srinagar; ~58 house arrests in Srinagar** | political detentions, not PSA-identified | **JKCCS/APDP** | around 5 Aug 2019 | **RETRIEVED** by me |
| **at least 25 booked under the PSA, 14 of them Apr–Jun** | (b), PSA | **JKCCS/APDP** | Jan–Jun 2019 | **RETRIEVED** by me |
| **144 children aged 9–18 arrested; 142 released; 2 sent to juvenile homes** | juvenile arrests, **produced by the police** | **Juvenile Justice Committee, J&K High Court**, to the Supreme Court, ~1 Oct 2019 | since 5 Aug 2019 | **RELAYED** — no report, order or court record retrieved by anyone |
| **1,003 persons detained under the PSA** | (b), PSA, **disclosed under RTI** | J&K Home Dept / District Magistrates, to the J&K RTI Movement | **4 Mar 2016 – Aug 2017** | **RELAYED** via PUCL/CHRI (page retrieved) |
| **295 transferred out; 408 held outside** | transfers, PSA | **J&K Home Department document, 31 Aug 2023** | 2019 / Aug 2023 | **RELAYED** (§3.3) |

### 4.4 THE THREE BIG NUMBERS ARE ONE SERIES WITH TWO SILENT SCOPE CHANGES

**5,161 → 6,605 → 7,357 are the same running count at three dates. But the geography changed underneath it and nobody said so.**

- **5,161** (20 Nov 2019): stated as **"in Kashmir Valley"**.
- **6,605** (5 Feb 2020): the question was headed "DETENTIONS IN JAMMU, KASHMIR **AND LADAKH**" and the answer is not confined to the Valley.
- **7,357** (11 Mar 2020): **no geography stated at all.**

**A series whose denominator moves from the Kashmir Valley to Jammu-Kashmir-and-Ladakh to unstated, inside sixteen weeks, is not a series.** And the start date moved too: 4 August in the 20 November reply, "August 2019" in the 27 November reply, "1 August 2019" in the 2021 replies. **Record this as a definitional break inside a single instrument, not as growth.**

**DO NOT RECONCILE 7,357, 451, 396, 444, 389, 437, 609, 223, 613 AND 627.** They are, in order: CrPC-107-class flow; preventive-detention stock; PSA stock; PSA orders (per person); PSA stock at an earlier date; preventive-detention stock; preventive-detention stock; an undefined stock; and an undefined flow given twice with a fourteen-case discrepancy five weeks apart. **On 5 February 2020 the same Minister gave two different "still detained" figures on the same day — 389 and 437 — because they count different populations. That is not an error and stage 3 must not treat it as one.**

### 4.5 THE QUESTION ASKED WAS NEVER THE QUESTION ANSWERED

**This is a finding in its own right and it is grep-verified across a complete corpus.** The delegated agent downloaded and text-searched **every MHA reply from Winter Session 2019 (370 replies) and Budget 2020, Monsoon 2020 and Budget 2021 (931 replies) — 1,301 in total.**

**At least eight questions asked specifically for a count of POLITICAL LEADERS detained.** RS *38 ("POLITICAL LEADERS DETAINED DURING LOCKDOWN IN KASHMIR"), RS 1021 ("POLITICAL LEADERS UNDER HOUSE ARREST"), RS 1818 ("POLITICAL DETENTION IN KASHMIR"), RS 1821, LS 3745 ("DETENTION OF POLITICAL LEADERS"), LS 1405 (asked by **Rahul Gandhi**, for "the details of political leaders detained under the Public Safety Act… and the period of detention"), RS 208 and LS 2303. **Not one answer gives a political-leader count.** Every one substitutes the aggregate preventive-custody figure, or states that no person is under house arrest.

**The only leader-adjacent number ever given is "Nil" — for political leaders detained under the National Security Act** (LS US 247, 15 Sep 2020), a statute nobody had alleged was being used.

**"Public Safety Act" appears in exactly five of the 1,301 replies** — RS 349, RS 1958, LS 1405, RS 208 and LS 2303 — **and in three of those five it appears only in the question, not substantively in the answer.**

**And LS US Q.2417 of 3 December 2019 asked for itemised names, dates, places and current status. The answer declined, and the published PDF is two pages, ending mid-clause: "…it is not possible for the Government to give any" — the sentence stops there. The reply as published on `mha.gov.in` is truncated.** Page count verified. **Whether the missing text is a website defect or the tabled answer itself is unknown, and stage 3 should not assume either.**

### 4.6 There was no official figure at all for fifteen weeks

**The delegated agent searched for and could not establish a single instance of the J&K administration or its spokesperson giving a detention total at any Srinagar press briefing in August or September 2019.** The frequently-cited deflection attributed to Rohit Kansal — inviting critics to "give me a specific case" — **could not be retrieved and is not quoted here as established.**

**On the record as it stands, the first official total of any kind is the 5,161 tabled in the Rajya Sabha on 20 November 2019 — roughly fifteen weeks after 5 August.** In that interval the only numbers in existence were a leaked government report seen by Reuters, an anonymous magistrate's estimate to AFP, and arrest statistics reviewed by AP. **This is the periodisation point of §1A made concrete: the official instrument was silent for fifteen weeks while the media-derived instrument was operating under a communications blackout. Neither family was in a position to check the other, and that is why the numbers from that window cannot be reconciled.**

### 4.7 Political leaders — what is established and what is not

JKCCS 2019 (RETRIEVED) records that three former Chief Ministers were detained — **Farooq Abdullah**, a sitting Member of Parliament, **Omar Abdullah** and **Mehbooba Mufti** — and that "The detention of politicians of all shades post August 5 abrogation of Article 370 was unprecedented in Kashmir… **It was also for the first time that pro-India political workers were also held in detention.**"

**The only firmly retrieved date is Mehbooba Mufti's release: 13 October 2020, on revocation of the PSA, after roughly fourteen months** — Al Jazeera, 13 October 2020, RETRIEVED (delegated).

**Everything else about the three orders is RELAYED from press reached through search summaries and is NOT good enough to print as fact.** The reported shape is: Farooq Abdullah, PSA order 15 September 2019 by the District Magistrate, Srinagar, extended 13 December 2019 and again in March 2020, released 13 March 2020; Omar Abdullah, PSA order 5 February 2020, released 24 March 2020; Mehbooba Mufti, PSA order **5 or 6 February 2020 — sources conflict and the conflict is unresolved**. **No detention order, no dossier and no revocation order was retrieved for any of the three by me or by the delegated agent.** Stage 3 must not harden these dates.

**The 177-politicians figure is not official and must not be presented as such.** It comes from ThePrint, 26 November 2019, from "documents accessed through sources in the security establishment" — party breakdown NC 71, PDP 35, JKPM 28, Congress 19, People's Conference 10, AIP 8, **BJP 1**, with most arrests from Bandipora. **RETRIEVED (delegated) via `web.archive.org`.** **Trap (1) in its purest form: a leaked official document reported by a newspaper is official reporting obtained by another route, not an independent check on official reporting.** HRW's "approximately 400 elected officials and political leaders" (16 Sep 2019, retrieved) is an NGO estimate and is a different object again.

**And the finding that matters most here is the absence, not any of these numbers: MHA was asked at least eight times for a count of political leaders detained, including once by the Leader of the Opposition in the Lok Sabha, and never gave one** (§4.5).

### 4.8 Minors — and the trap-(2) instance that matters most in this part

**Statutory position:** the 2012 amendment bars detention of persons under 18 (§1.4, RELAYED).

**What MHA said, and how narrow it is.** **RS US Q.360, 5 February 2020**, to Shri Binoy Viswam, whose question expressly asked about adults **and minors** — RETRIEVED (delegated): of the 6,605 taken into preventive custody since August 2019, "**437 persons, amongst whom none is minor, are presently under preventive detention.**"

**Read that clause exactly. It is a statement about the 437 people still held on 5 February 2020. It says NOTHING about how many minors were among the 6,605 ever taken into custody.** The delegated agent grep-verified the complete 1,301-reply corpus: **MHA has never stated how many minors were taken into custody in J&K at any point.** The question was asked; the answer changed the denominator.

**What the court route produced.** The Supreme Court took up allegations of detention of children after 5 August 2019 and referred verification to the **Juvenile Justice Committee of the J&K High Court**. **The Committee's first report, filed around 1 October 2019, recorded 144 children aged 9 to 18 arrested, of whom 142 were released and 2 sent to juvenile homes — and it was "merely a record of the data it received from the local police and juvenile justice homes… without any independent inquiry."** On **6 November 2019** a bench of Justices N.V. Ramana, R. Subhash Reddy and B.R. Gavai **directed the Committee to verify the allegations again, precisely because the earlier report "had merely relied on police information."** On the fresh report the Court said it was satisfied that no minor was illegally detained.

**RELAYED in its entirety. Neither I nor the delegated agent retrieved the Committee's report, either Supreme Court order, or any court record.** The agent found no Wayback snapshot of the reporting and could not reach `eparlib.nic.in` or `loksabhaph.nic.in`. **The 144 / 142 / 2 figures are press-attributed to a court committee, not a document anyone in this phase has read.**

**The 144 and the "none is minor" do NOT contradict each other and must not be set against one another.** 144 counts children *arrested* over two months; "none is minor" describes the 437 people *still in preventive detention* five months later. **A denial about a February 2020 stock is not a rebuttal of an October 2019 flow, and treating it as one would be exactly the reconciliation error this part exists to prevent.**

**THIS IS TRAP (2), and it bites harder here than in phase 11 because the presenting institution is a court.** Phase 11's rule is: *two-sidedness of format does not survive one-sidedness of production — check who produces the series an institution presents as its own.* A judicial committee's report, laid before the Supreme Court, has the form of independent verification. **Its factual base was the return of the agency whose conduct was in question.** The Supreme Court itself said so, in terms, and ordered it done again. **A finding of "no illegal detention of minors" resting on a police return is not a check on the police.** Stage 3 should record the Court's own 6 November 2019 direction as the proof of the point, not as an allegation.

**And JKCCS (RETRIEVED) records 3 minors among the 8 PSA quashings it counted in 2019** — i.e. minors were both detained under the PSA and released by the High Court in the same year the police return said essentially none were held. **NOT RECONCILED, and I do not attempt to: "arrested and released within a day" and "held under a PSA order until a court quashed it" are different objects again.**

---

## 5. HABEAS CORPUS AS A MEASURE

### 5.1 A quashing rate IS establishable — but only from a private reading of a public docket

**Rhythm Buaria, "Law, Liberty And The Lack Of Urgency…", LiveLaw, 13 February 2021 — RETRIEVED and read.** Source stated by the author, verbatim: **"data available on the High Court's website as on January 18, 2021."** No RTI, no registry certificate, no court publication.

Petitions **filed in 2019**, status as at 18 January 2021:

| | Srinagar Wing | Jammu Wing |
|---|---|---|
| Filed (all) | 681 | 80 |
| **Challenging PSA orders** | **656** | **60** |
| Disposed | 526 | 44 |
| **Quashed ("allowed")** | **144** | **17** |
| Upheld as legal and valid | 41 | 1 |
| **Infructuous** | **212** | **20** |
| Withdrawn | 10 | 3 |
| Reserved for judgment | 13 | — |
| Reasons unclear | 106 | 3 |
| Pending | 130 | 16 |
| Mean days to a quashing | **252.5** | **~211** |

**2020 filings, as at 10 February 2021:** Srinagar 203 filed, 61 disposed, 142 pending; Jammu 48 filed, 24 disposed.

**THE RATE DEPENDS ENTIRELY ON THE DENOMINATOR, AND THE THREE DENOMINATORS TELL THREE DIFFERENT STORIES:**

- **against petitions filed:** 161 quashed of 716 PSA petitions = **22.5%**
- **against petitions disposed:** 161 of 570 = **28.2%**
- **against petitions actually decided on the merits** (quashed + upheld = 161 + 42 = 203): **161 / 203 = 79.3%**

**The third is the honest one for the question "does the Advisory Board's confirmation survive judicial scrutiny", and it says four detention orders in five that a judge examined were bad.** The first is the honest one for the question "does habeas corpus get you out", and it says fewer than one in four.

**And the wedge between them has a name: 232 petitions — 40.7% of all disposals — were declared INFRUCTUOUS.** (**Buaria's own prose says 227 where his tables sum to 232 — a five-case internal inconsistency in the source, flagged not smoothed.**) Buaria: "227 petitions were rendered infructuous mainly due to the time period that elapsed between the filing of these petitions and their determination, by which time either the detention order would have expired on its own terms or the detention order may have been revoked or the detenu would have been released…" **The detention ran its course before the court reached it. The remedy was not refused; it was outlived.** Mean time to a quashing at Srinagar was 252.5 days against a first-instance public-order maximum of twelve months.

**Grade this carefully. It is T4.** A practising lawyer's reading of case-status entries on a court website is not a court publication and is not an official statistic. But it is derived from primary court records rather than from press reporting, and it is the best measurement that exists. **Trap (1) applies in a modified form and stage 3 should state it in these words: this is not an independent check on the High Court, because it is the High Court's own docket read back; it is, however, an independent check on the DETAINING AUTHORITY, because the docket records outcomes the executive did not choose.**

### 5.2 THE ADVISORY BOARD CONFIRMS ~99%; THE HIGH COURT QUASHES ~81% OF THE SAME ORDERS

**OHCHR update, 8 July 2019, para 89 — RETRIEVED and read (T2 document; the underlying RTI is RELAYED through it), verbatim:**

> "A right to information (RTI) inquiry revealed that while the PSA Advisory Board confirmed almost 99 percent of the detention orders, the Jammu and Kashmir High Court reversed over 81 percent of these detention orders."

**Underlying source, named at OHCHR footnotes 109 and 111:** Commonwealth Human Rights Initiative, "RTI reveals advisory board under J&K Public Safety Act spent 75% of its budget upholding detention orders which J&K High Court quashed later on", **2 August 2018**. **NOT RETRIEVED** — the CHRI URL cited by OHCHR returns HTTP 404. Search extraction indicates the RTI was filed by **Venkatesh Nayak** of CHRI and that the 81% figure covers **2016 to 2018**. **The CHRI document is RELAYED at one remove through OHCHR and at another through search; do not quote its internals.**

**This is the ledger question in miniature (§7).** Two review mechanisms operate on the same population of orders. The statutory one, whose members are now selected by a committee chaired by the Chief Secretary, confirms essentially everything. The constitutional one quashes four in five of what it examines. **They are not measuring different things; they are reviewing the same orders and returning near-opposite verdicts.**

**OHCHR also records what the Advisory Board is, at footnote 110 — and stage 3 should note the tense: "Formerly under Section 14…"** OHCHR was writing in July 2019, after the 22 May 2018 Order removed Chief Justice consultation.

### 5.3 Pendency now, and it is the same source

**The Wire, Junaid Dar, 16 July 2026 — RETRIEVED and read**, verbatim:

> "According to the high court's e-court web site, the pendency of PSA cases has risen sharply in recent years, particularly in Kashmir, where two cases from 2023 are pending, seven from 2024, 115 from 2025 and 78 from 2026. At the Jammu bench of the High Court, two PSA cases are pending from 2023, four from 2024, 13 from 2025 and 40 from 2026."

Total pending on that reading: **261** (Kashmir 202, Jammu 59). **Source: the eCourts portal. Again not a court publication.**

**Filings by year, "high court data accessed by The Wire" (Shakir Mir, 29 July 2023, RETRIEVED):** 2019 — 507; 2020 — 203; 2021 — 327; 2022 — 841; 2023 to date — 266, of which **16 disposed and 250 pending**.

**Amnesty 2022 (RETRIEVED):** 585 HCPs filed in the first seven months of 2022, **569 of them PSA**; only **14 disposed** by 4 August 2022; Srinagar wing 556 against Jammu 29; **UAPA invoked alongside the PSA in 179 of the 569 PSA cases (31%)**, and only in Srinagar-wing petitions.

**Note the collision: The Wire gives 841 filings in 2022 and Amnesty gives 585 in the first seven months.** These are compatible in principle (full year vs seven months) and I have not verified either. **The 2019 collision — 507 against 761 — is not compatible and is unresolved (§2.6).**

### 5.4 What the court says when it quashes — and why the reasons matter for measurement

**All RELAYED via reporting I retrieved and read.** These are not colour; they establish that quashings turn on the *absence of a record*, which is itself a measurement fact about the detaining apparatus.

- **Justice Rahul Bharti, 5 February 2026** (Shabir Ahmad Dar), via The Wire, Jehangir Ali, 28 February 2026: the PSA "has been invoked by non-seriousness of standard with which even a motorist is not subjected to a routine traffic challan." The District Magistrate approved detention "literally on the dictation of the SSP".
- **Justice Rahul Bharti, 9 July 2026** (Seerat-ul-Hassan Dhar), via The Wire, Junaid Dar, 16 July 2026: "The petitioner's preventive detention is nothing but a sheer abuse of process of law resorted to by the Senior Superintendent of Police." Ground: re-detention under a fresh PSA order (11 October 2024) immediately on expiry of the first, showing "preconceived intention".
- **Kashmir Times, 15 October 2025** (byline withheld for reporter safety), documenting: grounds of detention that "actually referred to another individual, not the petitioner"; grounds that are "mere reproduction of the dossier"; a 2004 FIR on which the detenu had been **acquitted**; a bar association presidency cited as "provid[ing] a platform for terrorism"; bail orders withheld from the detaining authority. And **Imtiyaz Ahmad Ganie, detained 15 April 2024, order quashed 3 September 2025 after 520+ days — and still imprisoned after the quashing.**

**That last item is the 2011 pattern still running in 2025.** Amnesty 2011 (RETRIEVED) quoted a 19 March 1999 directive from the Principal Secretary, Home Department, to the Superintendent, Central Jail Srinagar: "You are as such directed **not to release any PSA detainee on quashment of their detention orders** by the Hon'ble High Court without obtaining clearance from Home Department and CID." The High Court disposed of a Bar Association challenge on 13 August 1999 on the Home Department's statement that the directions had been withdrawn.

### 5.5 The senior lawyer's account of why the quashing rate does not matter to the detaining authority

Amnesty 2011, RETRIEVED, verbatim — carry this whole, because it is the mechanism that reconciles a 79% merits-quashing rate with an unchanged practice:

> "The detaining authorities know well that the detention orders will be challenged in the High Court and will be often quashed, but they also know that the entire process will usually take about six months… irrespective of what they write in the grounds, the detainee cannot be released before six months… if they want to hold the person further, they will get another detention order passed. The order may be for two years but even if it gets quashed, their objective will be achieved as the person is in jail for six months. **They can keep on doing this as no one holds them accountable.**"

**Section 22 immunity is why the last sentence is accurate rather than rhetorical.**

### 5.6 The Screening Committees — a non-statutory body making the real decision

Amnesty 2011, RETRIEVED: the J&K government established **Screening Committees** at State and district level, comprising representatives of the Home Department, police, intelligence agencies, army and other security forces, deliberating in private, which "make the effective decision on whether a person should be released or continue to remain in detention". **"The Screening Committees have no legal basis and are purely executive bodies; the PSA itself does not refer to such mechanisms."**

**So the statutory review body (Advisory Board) confirms ~99%, and a body with no statutory existence at all makes the operative call.** Whether the Screening Committees still operate post-2019 is **NOT ESTABLISHED**.

---

## 5A. THE TWO PHASE-11 TRAPS — WHERE THEY BITE HERE

Applied as instructed, and named in the required terms.

### Trap (1) — "a source that looks independent and is media-derived from official reporting IS NOT A CHECK"

**It bites in four places in this part, and in one of them it has already misled.**

**(i) The transfer series. THIS IS THE WORST INSTANCE AND STAGE 3 MUST NOT MISS IT.** The 1,122 / 408 figures (§3.3) appear in FairPlanet (18 Sept 2023) and The Polis Project (22 Dec 2023) — two outlets, two authors, three months apart, which a reader would naturally treat as mutual corroboration. **They are not. Both are reproducing one document: the J&K Home Department paper of 31 August 2023.** There is one source, seen twice. **A source that looks independent and is media-derived from official reporting is not a check** — and here it is not even a check on the arithmetic, since neither outlet reports having verified the totals (I did; §3.3).

**(ii) The parliamentary figures in §4.** Every one is press-relayed from an official statement. **Deccan Herald reporting what a Minister told the Rajya Sabha is not a second source for what the Minister said; it is the only source I have for it, and it is not a check on the Ministry.** Graded T4 throughout on exactly that ground.

**(iii) ThePrint's 81-of-134 (2020) and 49-of-749 (2022) PSA quashing figures.** I found these referenced but **could not retrieve ThePrint** (browser-check page). They are attributed to "data accessed by ThePrint" from an unnamed holder, in a piece framed around how police are building "tighter" cases. **A police-sourced count of how often police orders were struck down, relayed by a newspaper, is the detaining authority marking its own work. I have therefore NOT carried the 134 and 749 figures into any table in this part**, and stage 3 should not import them from elsewhere without provenance. They also fail an internal check: 749 PSA detentions in 2022 against 841 habeas corpus petitions filed the same year (§5.3) is impossible unless the two count different objects, and nobody says which.

**(iv) Amnesty 2022 and Buaria at 761.** Flagged already (§2.6) and restated because it is the subtlest form: **two organisations, two years apart, agreeing to the digit — because they ran the same query against the same web interface. Agreement between two readings of one instrument is not corroboration.**

**(v) ThePrint's 4,844 / 177 / 746 / 235, and the Reuters "over 3,800".** Both are **leaked official documents reported by journalists**. They read as independent verification of the government's parliamentary figures and they are nothing of the kind — **they are official reporting obtained by another route, with different cut-off dates (30 September and 31 October 2019) from every tabled figure.** Where they diverge from the parliamentary numbers, the divergence is evidence about cut-off dates, not about competing observation. **Say it in the required words: a source that looks independent and is media-derived from official reporting is not a check.**

**A NECESSARY QUALIFICATION, because trap (1) can be over-applied and would damage this part if it were.** Saying a leak is not an *independent check* is not saying it is worthless. **The ThePrint documents contain a party-wise breakdown of detained politicians that the government has never tabled despite eight requests (§4.5, D10), and a dated prison-by-prison transfer schedule that appears in no official publication.** A leak is a route to *unpublished official data*, and its value is precisely that it shows what the holder holds. **Trap (1) governs its use as CORROBORATION. It does not govern its use as evidence of producibility — and for the `not-published` classifications in §6 that is exactly what it is.**

### Trap (2) — "two-sidedness of FORMAT does not survive one-sidedness of PRODUCTION: check WHO PRODUCES the series an institution presents as its own"

**It bites in three places, and in the first of them the institution is a court, which is a harder case than phase 11 faced.**

**(i) The Juvenile Justice Committee report (§4.2).** A committee of High Court judges reported to the Supreme Court on whether minors were detained. **The report was the police's own return, re-presented in judicial form.** The Supreme Court said so itself on 6 November 2019 and ordered re-verification. **Stage 3 should record this as the strongest available demonstration that the trap is not a claim about bad faith: nobody deceived anyone; the form of the instrument simply did not correspond to the production of its content, and the Court itself caught it.**

**(ii) NCRB, transferred through from phase 11.** *Crime in India* and *Prison Statistics India* are Union publications, but their content is "As per data provided by States/UTs" — phase 11 established this verbatim. **The detenu counts in §2.3 are therefore J&K's own returns, published under NCRB's cover.** A J&K detenu figure in an NCRB volume is not an independent count of J&K detenus.

**(iii) The Advisory Board.** Statutorily a judicial-looking body — chaired by a serving or former High Court judge — and therefore presenting as an independent check on the executive's detention orders. **Since 31 March 2020 its members are selected by a committee of three executive officers chaired by the Chief Secretary and seating the Home Department** (§1.6). **The form is judicial; the production of the membership is executive.** That is trap (2) applied not to a statistical series but to a review institution, and it is the same shape.

---

## 6. ABSENCES, CLASSIFIED

Tested in the schema's order. **`withheld` requires a named requester, a specific request and a date — all three or it is `not-published`.** Phase 11 demoted one on this test and phase 10 demoted two; I have demoted three below and promoted one.

### D1 — The number of persons detained under the PSA, year by year — `not-published`

**What is not measured, stated positively:** a published year-wise count of persons detained under the Jammu and Kashmir Public Safety Act.

**Why no figure exists as a series.** MHA has produced PSA-identified point figures on request — **444 detention orders and 389 in PSA detention (RS US 349, 5 February 2020); 396 in PSA detention (RS US 1958, 11 March 2020)** — and never a series. It tabled a year-wise 2014–2019 series for the *all-laws* "Detained" prison category (§3.3A) but never one for the PSA. The J&K Home Department disclosed **1,003 persons detained 4 March 2016 – August 2017** in answer to RTIs. **The data is producible; it has been produced more than once, in both Houses and under the RTI Act; it is not published as a series.**

**And the flagship instrument is silent, which is a separate fact from the absence of a series.** The MHA Annual Report 2019-20 — the report covering the year of the lockdown — contains **zero occurrences of "Public Safety Act" and zero of "detenu"**, grep-verified on the retrieved PDF. **This is the same editorial pattern phase 11 recorded at A4: MHA holds the data, produces it to Parliament on request, and omits it from the flagship.** Stage 3 should pair the two.

**Decisive evidence of producibility, and it is unusually strong:** the same Home Department produced a **five-year year-wise series of PSA detenus transferred out of the territory** on 31 August 2023 (§3.3). You cannot count which detenus you moved without counting detenus. And every detention order carries a district-year serial (§3.3).

**STATED REASON: none. No body has explained the omission.**

**Classification: `not-published`.** High confidence — this is the best-evidenced `not-published` in the part.

**Route.** A parliamentary question to MHA for the year-wise number of persons detained under the J&K Public Safety Act since 2016, **and separately the number of detention orders issued**, with the definition of each. **The definitional rider is what makes the route worth filing** — the bare number would reproduce the (b)/(c) confusion. This route has worked before in kind: MHA answered the PSA-identified 396/451 split in March 2020.

### D2 — The number of PSA detention ORDERS issued, as distinct from persons detained — `never-defined`, on the strict test, plus a `not-published` inside it

**What is not measured:** whether any instrument counts orders or persons, and therefore what any published figure means.

**Why.** Not one instrument in §2.2 states which of objects (a), (b) and (c) it counts. NCRB's detenu row is a 31 December stock and says so; **nothing else declares anything.** JKCCS calls a petition count "PSA detentions" in its own table (§2.7). Parliamentary replies give bare numbers. **In a population where a single person can generate up to eight or thirty-seven successive orders, the difference is not a rounding matter.**

**Classification: `never-defined` for the definitional question**, on the strict test as written: no agreed definition exists for what a PSA detention figure counts, so the quantity could not be collected consistently even in principle. This is not "nobody has studied it" — a great deal has been counted; what has never been settled is what is being counted.

**A distinct absence inside it, `not-published`: the order count itself.** Every District Magistrate serially numbers their orders. The count exists in every district office in J&K.

**Route for the `not-published` part.** An RTI to each District Magistrate in J&K for the number of detention orders issued under the PSA, year-wise, since 2016. **This route has a track record: the J&K RTI Movement filed exactly this class of application to all district DMs in June 2017 and got answers** (§6, D3). **Caveat that must travel with it: phase 11 could not verify J&K addressee designations because J&K hosts were unreachable, and neither could I.**

### D3 — Rules and Standard Operating Procedures under the PSA — `not-collected`, on the holder's own admission

**What does not exist:** any rules or SOPs governing how a District Magistrate decides to issue a PSA detention order.

**STATED REASON, and here the responsible body has spoken.** The **J&K Home Department confirmed that "the State Government has not made any Rules or Standard Operating Procedures (SOPs)" under the 1978 Act during its four decades of existence.** Established through RTIs filed by members of the **J&K RTI Movement led by Dr Shaikh Ghulam Rasool** — to the Home Department, and in **June 2017** to District Magistrates across all J&K districts — asking for "A clear photocopy of the latest version of the Rules framed under the J&K Public Safety Act, 1978" and "A clear photocopy of the Standard Operating Procedures (SOPs) that provide guidance to the District Magistrate".

**Source: Venkatesh Nayak (CHRI), 1 February 2018, reproduced by PUCL — RETRIEVED and read** (`https://pucl.org/manage-reports/rti-reveals-even-after-four-decades-rules-and-sops-do-not-exist-for-ordering-preventive-detentions-under-jk-psa/`). **T4** — an NGO reproduction of an NGO note quoting RTI replies; **the RTI replies themselves were not retrieved.**

**Classification: `not-collected`.** On the holder's own account there is nothing to produce.

**No route is offered, and that is deliberate.** An RTI for a document the holder has already said does not exist returns a nil reply, which does not close the absence. **If a route is wanted it must be framed differently** — a parliamentary question to MHA asking under what written criteria a detaining authority in J&K satisfies itself under section 8, which asks for the basis rather than for a document.

**PHASE-11 PARALLEL, and stage 3 should pair them: this is the same shape as phase 11's B3 — the AFSPA section 7 sanction decision rule, which both the Ministry of Defence and Army Headquarters attested they do not hold.** Two of the three coercive powers operating in J&K have, on their holders' own record, no written decision rule. That is a pattern, not two coincidences.

### D4 — The identity, and even the NUMBER, of J&K detenus held in Agra Central Prison — **`withheld`**

**This is the cleanest `withheld` in the part and it passes all three tests.**

- **NAMED REQUESTER:** Venkatesh Nayak, Commonwealth Human Rights Initiative.
- **SPECIFIC REQUEST:** an RTI application to **Agra Central Prison, Uttar Pradesh**, seeking the complete list of J&K detainees with names, age, gender and addresses; medical examination reports on admission; and the documentation enabling detainees to file representations against their detention orders.
- **DATE:** received by the prison **29 August 2019** (sent by speed post).
- **REFUSAL:** the Public Information Officer declined, relying on a **2008 circular of the Uttar Pradesh Administrative Reforms Department** and characterising the information as **"third party" data** under the RTI Act.
- **AND THE BARE NUMBER WAS REFUSED TOO** — not merely the identities.

**Source: National Herald, RETRIEVED and read** (`https://www.nationalheraldindia.com/india/agra-jail-refuses-to-provide-even-the-number-of-jandk-detainees-under-rti`). **T4.** The CHRI blog post carrying the primary documents (`humanrightsinitiative.org/blog/agra-central-prison-refuses-details-of-jk-detenues-under-the-rti-act-calling-it-third-party-information`) **returned HTTP 404 and was NOT retrieved.** **The refusal letter itself has not been seen.** No appeal outcome established.

**Why this one matters beyond itself.** The detenus are J&K's, detained by J&K's authorities, under J&K's statute. The prison holding them answers to Uttar Pradesh. **Moving a detenu across the territorial boundary moved the RTI addressee too — and the new addressee has no relationship with the detenu's family, community, courts or press.** The transfer power (§3) and the information refusal are the same fact seen twice.

**Route.** A first appeal and second appeal to the Uttar Pradesh State Information Commission against the Agra Central Prison refusal, confined to the **aggregate number** of J&K detenus held — which cannot be third-party information about any identifiable person. If that has already run, a parliamentary question to MHA for the number of J&K PSA detenus lodged in prisons in each other State and Union Territory, year-wise. **The J&K Home Department has already produced exactly this shape of figure once (408 as at 31 August 2023), which makes a refusal informative.**

### D5 — The reasons for amending section 10 — `not-published` (**DEMOTED from `withheld`**)

**What is not measured:** the reasons, facts and materials on which the section 10 proviso was omitted.

**OHCHR para 88, RETRIEVED, verbatim:** "The state government is obligated under the Jammu and Kashmir Right to Information Act 2009 to publicly provide 'detailed reasons, facts and materials that form the basis of this amendment'. However, Jammu and Kashmir authorities have not provided any details on why section 10 of the PSA was amended…"

**Why I demote it.** There is a plain **legal requirement** (proactive disclosure under the J&K RTI Act 2009) and a plain non-compliance. The schema's `withheld` definition admits "specifically requested **or legally required**". **But this phase's operating rule is stricter and I follow the stricter one: a named requester, a specific request and a date, all three.** I have the legal requirement and no named requester and no dated refusal. **`not-published`.**

**A further wrinkle stage 3 must not miss: the obligation OHCHR invoked no longer exists.** **The Jammu and Kashmir Right to Information Act 2009, and the Rules under it, were repealed by the Reorganisation Act with effect from 31 October 2019, and the central Right to Information Act 2005 applies in its place. RELAYED, search extraction only — I could not read the Fifth Schedule and did not retrieve any repeal entry.** If that is right, the specific proactive-disclosure obligation OHCHR relied on in July 2019 lapsed **115 days later** — the identical interval, and the identical shape, as phase 11's finding that India's rejection of the OHCHR report rested on the sufficiency of the J&K State Human Rights Commission, which was abolished 115 days after publication. **Two OHCHR premises expired on the same day for the same reason. That coincidence is worth a line in stage 3, and it is not a coincidence: both were State institutions and the Fifth Schedule disposed of State institutions in one instrument.**

**The substitution cuts both ways and the FOR side gets the better of one half of it:** the central Act **widened** who may file, from State Subjects of the erstwhile State to any citizen of India. The narrowed thing is the specific proactive-disclosure duty OHCHR was invoking; the widened thing is standing to ask. **Do not present the repeal as a pure contraction.**

**Route.** An RTI to the J&K Home Department for the file notings and the Cabinet/State Administrative Council note underlying the omission of the proviso to section 10. Addressee unverified — `jkhome.nic.in` unreachable in phase 11 and does not resolve here.

### D6 — Whether *Prison Statistics India* attributes an out-of-territory J&K detenu to J&K or to the holding State — `not-published`, **classification held at LOW CONFIDENCE**

**What is not established:** the attribution rule.

**Why it matters:** 1,122 PSA detenus were moved out of J&K between 2018 and 2023. If NCRB attributes them to the holding prison's State, **the J&K detenu series silently lost them**, and the post-2019 decline in any J&K detenu figure is partly a relocation artefact rather than a reduction in detention.

**Classification: `not-published` provisionally** — NCRB operates a compilation rule and a rule exists in writing for the returns to be filled. **But I could not open a single volume, and this may not be an absence at all: the rule may be stated in a footnote I have not read.** Recorded at low confidence, as a retrieval failure of this session rather than an established absence. **Stage 3 must resolve this before authoring anything on it.**

**Route.** An RTI to the Director, National Crime Records Bureau, for the instructions or proforma issued to States and UTs for compiling the inmate-category returns in *Prison Statistics India*, specifically the attribution rule for inmates transferred between States. **This is the highest-value single route in this part**, because it also resolves whether a law-wise detenu split exists.

### D7 — A published habeas corpus disposal statistic from any court — `not-published`, and arguably not an absence at all

**What is not published:** any aggregate of habeas corpus filings, disposals, quashings or pendency by the High Court of Jammu & Kashmir and Ladakh.

**But the underlying docket IS public**, and has been aggregated four times by four private parties, producing materially different answers (§2.6). **So this is an UNBUILT AGGREGATE over public data rather than data in a holder's hands and withheld.** I classify it `not-published` because no holder publishes the aggregate, and I flag prominently that it fails the usual intuition: nobody is refusing anything.

**Route.** The National Judicial Data Grid already carries case-type disposal statistics for High Courts; the aggregate is constructible today by anyone. **A route that asks for something already obtainable is a weak route and I say so.** The stronger request is an RTI to the Registrar General of the High Court for the case-type code used for habeas corpus petitions **before and after the 2020 relabelling** (§2.6), which is the thing that makes independent counts disagree and which no private reader can resolve.

### D8 — Deaths of J&K detenus in prisons outside J&K — `not-collected`

**What is not measured:** deaths of J&K PSA detenus held in prisons in other States.

**Why.** Phase 11's L-0121 establishes that NCRB's custodial-death chapter is police custody and lockup only, with the State or UT police as unit of account. **A PSA detenu who dies in Naini jail, Prayagraj is a judicial-custody death in an Uttar Pradesh prison** — attributed, if anywhere, to Uttar Pradesh, and severed from J&K entirely. JKCCS documented one such death (23 December 2019, §3.5) and the family learned of it only after it happened.

**Classification: `not-collected`.** No instrument has a cell in which "J&K PSA detenu who died in another State's prison" can be recorded.

**Route.** None that is honest. **This is the same shape as phase 11's B1 — creating the count requires a change to NCRB's schedule, not a request.** Stated as such rather than given a placeholder.

### D9 — What happened to the ~630 abated SHRC complaints — **not re-researched here.** Owned by phase 11 (L-0121). Named only because PSA detention complaints were among them.

### D10 — The number of political leaders detained after 5 August 2019 — `not-published` (**and I explain why I did NOT make it `withheld`**)

**What is not measured, stated positively:** the number of political leaders and elected representatives detained in J&K after 5 August 2019, and the periods of their detention.

**Why.** At least eight parliamentary questions asked for it, some in terms — **Lok Sabha Unstarred Q.1405, answered 20 September 2020, asked by Shri Rahul Gandhi, sought "the details of political leaders detained under the Public Safety Act in Jammu and Kashmir since August 5, 2019 and the period of detention."** The answer stated that 223 persons were under detention as on 11 September 2020, gave no political-leader figure, no PSA breakdown and no periods. **Every other such question was answered the same way** (§4.5).

**The data exists in some form.** ThePrint published a party-wise breakdown of 177 detained politicians in November 2019 from documents sourced in the security establishment. **Somebody classified detainees by party affiliation; the classification was not created by the newspaper.**

**Classification: `not-published`. HERE IS WHY IT IS NOT `withheld`, stated so the judgement is not made silently downstream.** The `withheld` test needs a named requester, a specific request and a date — **and I have all three: Rahul Gandhi, LS US Q.1405, 20 September 2020.** What I do not have is a **refusal**. MHA did not decline; it answered a different question. **Evasion by substitution is not the same act as refusal, and collapsing the two would inflate `withheld` into a sink** — which is the failure mode phases 10 and 11 both corrected for. If stage 3 disagrees, the disagreement is about whether a non-responsive answer to a question that was formally answered constitutes a refusal, and that is a real question. **I have taken the strict reading and I flag that I have.**

**A `never-defined` candidate sits inside this and I reject it:** one might argue "political leader" has no agreed definition, so the quantity could not be collected in principle. **That fails, because the security establishment's own document used party membership as the classifier — an operational definition existed and was applied.**

**Route.** A parliamentary question to MHA for the number of persons detained after 5 August 2019 who held elected office at any level in J&K — panchayat, municipal, Assembly or Parliament — which replaces the undefined "political leader" with a verifiable status and removes the ground on which a substituted answer could be given.

---

## 7. THE LEDGER QUESTION

**I read the text of `differentFacts` criterion (c) in `schemas/ledger.schema.json` first, as instructed.** It reads:

> "(c) OPERATIVE — no single measure exists, or could be constructed from available data, that places both sides' facts on one ledger. **An UNBUILT comparison FAILS (c):** if a common denominator exists in principle and merely has not been built, that is a gap in the instrument, not a property of the argument. A counterpart that is DECLARED UNMEASURABLE passes (c). In practice (c) admits only arguments that cross a category boundary — a quantity against a legal ruling, a constitutional process, or a stated absence."

### 7.1 Does any single instrument place both sides' facts on one ledger?

**Answer: YES — one does, and it is the reason this record should NOT be flagged `differentFacts`.**

**The J&K High Court's habeas corpus docket carries both sides' facts.** The public-order case says: preventive detention is used against people the state has reason to fear, subject to review. The due-process case says: the orders do not survive examination and are reissued when they fail. **Both of those are propositions about the same population of detention orders, and the docket records, order by order, whether a judge found the order sustainable.** The 79.3% merits-quashing rate and the 40.7% infructuous rate are computed from one dataset. **A common denominator exists.**

It is **unbuilt as an official series** — no court publishes it (D7). **But criterion (c) says in terms that an UNBUILT comparison FAILS (c).** That is exactly this case: the comparison has been built four times by private parties from public data, disagreeing at the margins, and never built by the holder. **That is a gap in the instrument, not a property of the argument.**

**And there is a SECOND candidate ledger, which is T1 and tabled in Parliament.** The "Detained" prison series of RS US Q.1818 (§3.3A) runs 7 → 54 → **395** → 172 → 253 → 356 across 2014 to November 2019. **The 2016 spike is the caseFor's own central fact — mass mobilisation following the Burhan Wani killing — expressed as a detenu count; and the persistence of elevated numbers through 2017–2019 is the caseAgainst's fact about routine use, expressed in the same column of the same table.** Both sides can be read off one series that the government itself published. **That makes the failure of (c) doubly clear: not only could a common ledger be constructed, one has been tabled.**

**Therefore: `differentFacts` FALSE.**

**And `differentFactsNote` is permitted and meaningful on false — the schema says so explicitly and names L-0118 as the worked instance. It should be used here, because this is precisely the judgement most at risk of being made silently.** The note should say: the two sides look like they cross a category boundary — a security claim against a legality claim — but they do not, because the High Court docket is a single ledger on which a security-justified order and a legality verdict meet, order by order. The failure is that nobody publishes the ledger, not that no ledger could exist.

### 7.2 Where the two sides genuinely part company

**They rest on DIFFERENT WEIGHTINGS OF THE SAME FACTS, with one exception.**

Neither side disputes: that detention is preventive and requires no charge; that the maximum is one or two years; that the Advisory Board confirms nearly everything; that the High Court quashes most of what it examines on the merits; that orders are reissued after quashing; that detenus are held outside the territory; that no count is published. **All of that is common ground.** The disagreement is over what weight to give a quashing (a defect in paperwork, or a finding that liberty was taken unlawfully) and what weight to give the absence of mass casualties after 2019.

**The exception, and it IS a different-facts disagreement:** the two sides do not agree on **how many people were detained**, and they cannot, because the objects are different (§4). **That specific sub-dispute is a definitional one — the state's 5,161 and the state's 396 and JKCCS's 662 and 635 are not competing estimates of one quantity.** If a record is authored on the August 2019 detentions specifically, `differentFacts` may be true **for that record** on the ground that no common denominator exists *because no definition exists* — and a quantity that is `never-defined` (D2) is the schema's "counterpart DECLARED UNMEASURABLE", which passes (c). **Stage 3 should treat the instrument record and the August-2019 record differently on this field.**

---

## 8. BOTH CASES, AT THEIR STRONGEST

### 8.1 The case FOR

Preventive detention is not an aberration in Indian constitutional law; it is provided for in **Article 22** of the Constitution itself, which contemplates detention without trial and prescribes the safeguards that must attend it — communication of grounds, the opportunity to make a representation, and review by an Advisory Board of persons who are or are qualified to be High Court judges within three months. The J&K Public Safety Act operates inside that framework, not outside it. Parliament, in retaining the Act through the Fifth Schedule of the Reorganisation Act in 2019, made a deliberate legislative choice about a territory it had just taken direct responsibility for; the High Court held in 2026 that the executive adaptation of the Act was squarely within the power Parliament had itself delegated by section 96, and dismissed the challenge as devoid of merit.

The theatre in which the Act operates is not hypothetical. It has a documented history of mass mobilisation converting rapidly into lethal violence — 2008, 2010 and above all 2016, when the killing of a single militant commander produced months of casualties. **The state's answer to the charge that it detains people who have committed no offence is that this is the entire point of preventive detention: to act on the person who is organising the mobilisation before the mobilisation happens, precisely because once it happens the alternative instrument is the bullet.** A criminal prosecution requires a completed offence. On this reading the choice in August 2019 was not between detention and liberty but between detention and the casualty figures of 2010 and 2016 — and the casualty figures of 2019 and 2020 were not those figures.

The safeguards are real and they demonstrably operate. Orders are reviewed by an Advisory Board within statutory time limits. Habeas corpus lies to the High Court and is used — hundreds of petitions a year — and the High Court quashes orders, repeatedly, in reported judgments that name the officers responsible in blunt terms. **A system in which a District Magistrate's order is struck down by a judge who compares it unfavourably with a traffic challan is a system in which judicial review is functioning, not one in which it has been suppressed.** Government has also progressively narrowed the Act by its own hand: the 2012 amendment barred detention of minors, required grounds in a language the detenu understands, and cut the first-instance security-of-the-State period from two years to six months. And the appointment reform of 2020 replaced an unstructured "consultation" with a written search-and-selection procedure of the kind used across Indian statutory tribunals.

On the counting charge, the government's position is stronger than its critics allow, and the strongest version of it should be stated. **The figures were produced whenever Parliament asked.** MHA told the Rajya Sabha on 5 February 2020 that detention orders had issued against 444 persons under the PSA and 389 were then in PSA detention; on 11 March 2020 that 451 were in preventive detention of whom 396 were under the PSA; and, in the same answer, **it stated the legal basis in terms — "Detentions have been made u/s 107 Cr.PC, as also under J&K Public Safety Act, 1978."** On 4 December 2019 it tabled a six-year prison table showing detenu numbers and out-of-territory lodging year by year. **The charge that the government concealed how many of the post-August-2019 detentions were under the PSA is not sustainable on the record: it was asked and it answered, and the answer was 396 of 451.** That the figure has been widely ignored in favour of the 7,357 preventive-custody aggregate is a failure of the people quoting it, not a concealment by the ministry. **Nothing in 1,301 replies searched shows MHA refusing to state a PSA number, or claiming the data is not maintained.** And the reorganisation *widened* the information route rather than narrowing it: the repeal of the J&K Right to Information Act 2009 and the extension of the central RTI Act 2005 to the territory on 31 October 2019 replaced a right reserved to State Subjects with one exercisable by any citizen of India — which is why an applicant in Delhi could address Agra Central Prison at all.

### 8.2 The case AGAINST

A person can be taken from their home by an executive order, held for up to two years, and never charged with anything, never tried, never convicted, and never told the facts against them if the detaining authority considers disclosure contrary to the public interest — **section 13(2) puts that in the statute in terms.** They may not be represented by a lawyer before the body that reviews the detention: section 16(5). If they can afford a petition, they may reach the High Court, which will take on average **252 days** to decide it — against a public-order maximum of twelve months. **In 40.7% of disposals in the 2019 cohort the court never reached the merits at all, because the detention had already run its course.** The remedy is not refused; it is outrun.

Where the court does reach the merits, it strikes down **roughly four orders in five**. Against that, the statutory Advisory Board — whose members are now chosen by a committee chaired by the Chief Secretary and including the Administrative Secretary of the Home Department, the parent department of the detaining authorities — **confirms about 99%**. Two bodies review the same orders and reach opposite conclusions, and the one with the higher confirmation rate is the one the executive staffs.

**And a quashing does not end the detention.** Section 19(2) permits a fresh order where the earlier one failed on a "technical defect", and the authorities have used it to reissue on the same or similar grounds — sometimes revoking pre-emptively days before judgment to avoid a quashing altogether. Individuals have been held under **up to eight successive orders**; one man was served with his **37th**. The Supreme Court held in 1985 that a fresh order on the same grounds is not available after a *judicial quashing* as distinct from a governmental revocation; the practice continued anyway. In 1999 the Home Department directed the Central Jail Srinagar in writing not to release quashed detenus without clearance; in September 2025 a man whose order had been quashed after 520 days **remained in prison**. **The mechanism has outlived every attempt to stop it, and section 22 bars any proceeding against the officers who operate it.**

There are **no Rules and no SOPs under the Act, on the Home Department's own admission, after four decades.** So an order that deprives a person of liberty for up to two years is made under no written criteria at all — which is also why the grounds, when a court finally reads them, turn out to name the wrong person, or to reproduce the police dossier verbatim, or to rest on an FIR from 2004 on which the detenu was acquitted.

Since 2018 the detenu can be held anywhere in India. **1,122 were moved out between 2018 and 2023**; 408 were outside the territory in August 2023. That puts them 900 miles from their families and their counsel, in prisons where — as CHRI found — **even the number of J&K detenus held is refused under the RTI Act as "third party" information.** One died in Prayagraj in December 2019 and his family learned of it after the fact.

**And it is counted only when somebody makes it be counted.** There is no published series of PSA detentions and never has been; the number of orders has been stated once, ever, for one period; **the flagship MHA Annual Report for the year of the lockdown does not contain the words "Public Safety Act" at all**; and across 1,301 replies searched, the Act is named in five. For fifteen weeks after 5 August 2019 the government gave no total of any kind, while the only people in a position to count independently were under a communications blackout. **When Parliament asked eight times how many political leaders had been detained — once in the name of the Leader of the Opposition, expressly under the PSA and expressly with periods — it was told eight times how many people in total were in preventive custody.** The party-wise breakdown existed; a newspaper obtained it from a leak. The only continuing quantification anyone has is a private reading of the court's own docket, which by construction counts only the detenus who could afford a lawyer, and which three readers of the same docket have read three different ways. **A power exercised without written criteria, reviewed by a board the executive staffs, escaped by reissuing the order, immunised against suit, exercised across a territorial boundary that defeats the information law — and published in no series, in no annual report, and to no forum that can compel an answer to the question actually asked.**

---

## 9. CROSS-BOUNDARY: PHASE-11 RECORDS THIS MATERIAL BEARS ON

**No re-authoring. Amendments named, not written.**

**L-0121** — "Deaths in Army and central-force custody have no cell in any official instrument."
**AMENDMENT:** a second structural hole of the same kind. **A J&K PSA detenu who dies in a prison in another State is severed from J&K in NCRB's architecture**, because the unit of account is the State/UT police and the holding prison answers to a different State. The record's `unmeasured[0]` covers Army/CAPF custody; this is judicial custody, out of territory, and it is not covered. **Suggested amendment: add an `unmeasured` entry, `reasonKind: not-collected`, `wouldFill`: none honest** — for the same reason as B1, creating the count requires a change to NCRB's schedule. The record's existing `caveat` about the 31 October 2019 break already covers half of what is needed.

**L-0123** — "Two J&K security quantities lost their only legislative route in 2018, and it did not resume in 2024."
**AMENDMENT:** a **third** such quantity, and it is better evidenced than either of the two the record carries. **PSA detention figures were answered on the floor of the J&K Legislative Assembly.** Amnesty 2011 (RETRIEVED) records the Chief Minister, who also held the Home portfolio, informing the Assembly in **October 2010** that **724 people had been detained in 2009 and 2010, of which 322 between January and September 2010**; and the J&K Home Department, answering an opposition legislator in the Assembly in **March 2010**, giving details of **334 persons booked under the PSA between 5 January and 14 February 2010 alone**. **Note the internal contradiction the record should carry: 334 in six weeks against 322 in nine months.** Amnesty's comment — "The real numbers may be even higher" — is the counting body flagging the state's own inconsistency. **These are Assembly answers on the exact quantity §6/D1 finds unpublished today, and the forum that produced them is now barred by section 32(1) from the subject matter.** Suggested amendment: add PSA detentions as a third quantity in `whatHappened`, with the October 2010 and March 2010 answers.

**L-0083** — "UAPA use, bail and conviction rates."
**AMENDMENT:** a J&K-specific overlay from a retrieved source. **Amnesty 2022 (RETRIEVED) found UAPA invoked alongside the PSA in 179 of 569 PSA habeas corpus petitions in 2022 — 31% — and only in Srinagar-wing petitions**, none in Jammu. Amnesty also reports a **12% increase in UAPA use in J&K since 2019** from published NCRB data. **The relevant point for L-0083 is mechanical and belongs in its `caseAgainst`: the PSA and the UAPA are used in combination on the same person, so the section 43D(5) bail bar and a preventive detention order operate together, and neither series shows the other.** L-0083's `unmeasured` already records that NCRB does not maintain UAPA-against-journalists data; this is a different absence — **no instrument shows the PSA/UAPA overlap, and it is only visible because Amnesty read a court docket.**

**Phase 11 part 02, absence A4** — "Organised stone-pelting: published once, to Parliament, never in the flagship."
**PAIRING, not an amendment:** the PSA is the second confirmed instance of the identical pattern, and the pair makes it a practice rather than an oddity. **MHA produced PSA figures to Parliament on request (444 orders, 396 detenus, and a six-year detenu table) and its Annual Report 2019-20 contains zero occurrences of "Public Safety Act" and zero of "detenu".** A4's route — a parliamentary question, because the route has already worked once — applies here verbatim. **Stage 3 should consider whether "MHA answers what it will not publish" is worth its own record; on the evidence of two independent instances found in two phases, I think it is, and it would be the sort of finding that only appears once an instrument has run several phases over the same ministry.**

**P-83** — I did not re-derive it; I confirmed independently that the 31 October 2019 break lands in *Prison Statistics India* as well as *Crime in India*, which is what phase 11 recorded. **No amendment proposed.**

**A NOTE ON PHASE 11'S OWN RETRIEVAL RECORD, offered as a correction rather than an amendment.** Phase 11's part 11 stated that `www.mha.gov.in` gives "200 to curl with a browser user-agent; 403 to the standard fetcher" and called that "the single most consequential fact about this phase's evidence base". **That is confirmed exactly, by a second process, eight months later.** But phase 11 also recorded several J&K and NCRB hosts as unreachable and drew a pattern from it ("Every J&K territorial source failed; every Union source and every international source succeeded"). **My session would have produced a completely different and completely false pattern — every Indian host failed — had I not retested from a second process.** Phase 11 was right to state the pattern and decline to explain it. **The discipline that should be added to part 11's standing note is: re-probe from a second process before recording a reachability pattern at all.**

**Explicitly NOT researched here**, per the scope boundary: incidents, casualties, infiltration, recruitment, encounters, pellet and crowd-control injuries, custodial deaths as a quantity.

---

## 10. RECORD-SHAPE FLAGS — as instructed, no new enum value proposed

**One L-0086 shape (in force, testable in principle, awaiting external adjudication — currently filed `too-early`):**

**The challenge to the section 10 transfer power.** The J&K High Court Bar Association's writ petition against the omission of the section 10 proviso, plus the constitutional-validity challenge the Supreme Court transferred to the High Court on **16 May 2023**, remain undecided on the last account I could obtain (December 2023). The power is in force; 1,122 people have been moved under it; whether it is lawful is testable and is before a court that has not ruled. **If a record is authored on the transfer power, it is the L-0086 shape.** **On the written definitions as they stand today I would file it `too-early`** — the schema's `too-early` reads "the measure is in force but has not run long enough for its stated objective to be testable", which fits awkwardly, since the obstacle is not elapsed time but a pending judgment. **I flag the mismatch and do not propose a value.** `contested` would be wrong here: the evidence does not support two defensible readings; one reading is pending confirmation by the only body entitled to give it.

**A second, weaker instance of the same shape:** *Mehraj Malik*, MLA for Doda East and AAP's J&K president, detained **8 September 2025** under Detention Order No. 05 of 2025 made by the District Magistrate, Doda; HCP 139/2025; arguments completed and **order reserved 23 February 2026**; still in custody at the last account. **RELAYED via Wikipedia, which I retrieved and read; no court record retrieved.** Listed for completeness, not recommended as a record — a single detention is an instance, not a finding.

**No L-0092 shape (presentational findings) arose in this part.** The absences here are of publication, not of presentation: nothing I found is a case of a body presenting a figure in a misleading form. The closest candidate — JKCCS calling a petition count "PSA detentions" — is an error by a non-state counter, not a presentational choice by a publishing authority, and it belongs in the record's `caveat`, not in an assessment value.

---

## 10A. WHAT COULD AND COULD NOT BE MADE INTO A SERIES

**Recorded so stage 3 does not attempt a series this part cannot carry.**

**Not authorable as a series on what I hold:**
- *PSA detentions, year-wise.* Point figures only, on three different objects, none defined. **A series would be a fabrication.**
- *PSA detention orders, year-wise.* No figure at all.
- *Detenus in J&K, year-wise.* The NCRB row exists (§2.3) but I hold 1995–2008 only, through Amnesty's reproduction, and it is all preventive-detention laws rather than the PSA. **Would need NCRB volumes I could not open.**

**AUTHORABLE, and this is the one to build — but label it precisely:**
- ***"Detained" prison category, Jammu and Kashmir, year-end, 2014–2019*** — 7, 54, 395, 172, 253, 356 — from **RS Unstarred Q.1818, 4 December 2019, RETRIEVED (delegated)**. **T1.** One holder, one document, six values, tabled in Parliament. **It is a STOCK of all preventive-detention detenus in J&K prisons, NOT a PSA count and NOT a flow.** It ends at November 2019 and **must break at 31 October 2019** in any case. The companion out-of-territory row (0, 0, 0, 0, 41, 261) is authorable on the same basis. **This is the only T1 year-wise series in the whole subject and it should not be left on the table.**

**Potentially authorable, with a break and a caveat, if stage 3 accepts a T4 docket-derived spine:**
- *Habeas corpus petitions filed, J&K High Court, by year.* 2019 is contested three ways (§2.6); 2020–2023 rest on a single reading each; 2022 has two incompatible readings. **Any such series must break at the 2020 case-type relabelling as well as at 31 October 2019, and must be labelled a count of PETITIONS, not detentions.** My recommendation is that it is too unstable to author.
- *PSA detenus transferred out of J&K, 2018–2023.* **This is the only clean year-wise run in the part**: one holder, one document, five values plus a stated zero, totals reconciling exactly. **It is T4 (relayed through two press accounts) and it is a transfer count, not a detention count.** If any series is authored from this material, it is this one — and the fact that the *only* authorable series is of transfers rather than detentions is itself the finding.

**Provenance-record candidate (P-nn):** the three-way disagreement over habeas corpus filings in 2019 — 761 / 662 / 507, all four readers citing the same court (§2.6), with the 2020 case-type relabelling as a documented mechanism for at least part of it. **This is a measurement dispute in the strict sense and it belongs in provenance, not in a ledger caveat.**

---

## 11. WHAT I COULD NOT ESTABLISH — stated plainly

1. **The text of the PSA in force.** Not the official 1978 text, not the 2012 amendment, not the 22 May 2018 Order, not the 13 July 2018 Amendment Act, not a consolidated version. **The only Act text I hold is an unamended reproduction on a US university server.**
2. **Fifth Schedule Table-1 and Table-3 — the two tables I was told to check directly.** The Act does not resolve from any host available to me. **The PSA appears to sit in Table 4, on a single relayed account.** Table 4's caption is unknown to me.
3. **Article 22 of the Constitution, verbatim.** The constitutional framing in §1.5 and §8.1 is my reading of a clause I did not retrieve.
4. **Whether *Prison Statistics India* carries a detenu split BY LAW**, and therefore whether PSA detenus are separable from NSA/COFEPOSA/PIT-NDPS detenus anywhere in any NCRB volume. `ncrb.gov.in` does not resolve for me. **A relayed NCRB definitional note suggests the answer is NO — that "detenu" is a single composite cell across at least six preventive laws (§2.3) — but I did not retrieve it.** **A second delegated probe of NCRB was dispatched and had not reported when this part was closed.** Given that the delegated agent reached `mha.gov.in` where I could not (§0.1), **NCRB is very likely reachable to some process and this gap is probably cheap to close. It should be closed before any detenu series is authored.**
5. **The J&K detenu series after 2008.** Amnesty's reproduction of NCRB stops at 2008. I have no NCRB detenu figure for J&K for any year from 2009 onward.
6. **Whether NCRB attributes an out-of-territory detenu to J&K or to the holding State** (D6). This determines whether any post-2018 J&K detenu series is meaningful at all.
7. ~~Any parliamentary reply PDF.~~ **CLOSED by the delegated agent** — seventeen replies retrieved with question numbers, Houses, dates and questioners (§4). **What remains open: the reply to LS US Q.2417 of 3 December 2019 is truncated mid-clause in the published PDF, and I do not know whether the tabled answer was longer.**
8. ~~Whether MHA's Annual Reports mention the PSA.~~ **CLOSED for one year: AR 2019-20 mentions it zero times.** **Still open: every other year.** Phase 11 established that the J&K chapter of AR 2024-25 contains zero occurrences of "human right", "custody" or "compensation"; the PSA was not among the strings it searched. **A grep of "Public Safety Act" and "detenu" across all seventeen Annual Reports is cheap for a process with MHA access and would settle whether 2019-20 is typical or exceptional. NOT DONE.**
8a. **Whether MHA has ever said the PSA data "is not maintained".** The delegated agent found the deflection formula to be *"The Government of Jammu and Kashmir has reported that…"* rather than a not-maintained claim, and found the Entry-4 State-subject formula used on prisons generally (RS US 354 and 371, both 20 November 2019) but **not** on J&K detention questions. **No "not maintained" reply on the PSA was found in 1,301 replies across four sittings. That is a strong negative but it is four sittings, not all of them.**
8b. **The definition behind the 613 (3 February 2021) and 627 (9 March 2021) figures.** The questions asked about the PSA; the answers say only "detained at various points of time". **A fourth undefined series, given twice five weeks apart with a fourteen-case difference, and nobody has asked what it counts.**
9. **The CHRI RTI documents.** The 2 August 2018 Advisory Board post (404) and the Agra Central Prison refusal post (404). Both are known only at one remove. **The 99% / 81% figures rest on a document I have not seen, relayed through a document I have.**
10. **Which instrument actually removed the section 10 proviso, and when** (§3.2). Three dates, four sources, unresolved.
11. **The date of the 2026 High Court judgment upholding the PSA adaptation.** Three press accounts give 15, 16 and 18 May 2026.
12. **Whether the Screening Committees still operate.** Documented in 2011, not since.
13. **Whether the J&K Right to Information Act 2009 survived 31 October 2019**, and therefore whether the proactive-disclosure obligation OHCHR relied on in para 88 still exists.
14. **Detention order and revocation dates for Farooq Abdullah, Omar Abdullah and Mehbooba Mufti.** No order, dossier or revocation order was retrieved by me or by the delegated agent. **Only Mehbooba Mufti's release date (13 October 2020) is firmly retrieved.** Mufti's PSA order date is given as 5 February in some accounts and 6 February in others; unresolved (§4.7).
15. **The Juvenile Justice Committee's first or second report, or any Supreme Court order in that matter.** No Wayback snapshot; `eparlib.nic.in` and `loksabhaph.nic.in` unreachable to the delegated agent (curl exit 28). **The 144 figure is entirely relayed.**
15a. **Any figure the Government of India gave to a UN body or in an affidavit** that differs from its parliamentary figures. Searched for; not found. **A UN Special Procedures figure of roughly 2,800 arbitrarily detained surfaced in search results dated November 2025 — NOT retrieved, and it is a UN estimate rather than an Indian submission. It is recorded here only so that it is not later mistaken for a 2019 figure.**
15b. **Any detention total given by the J&K administration at an Aug–Sep 2019 press briefing.** None found. The Rohit Kansal deflection commonly quoted could not be retrieved and is not treated as established (§4.6).
15c. **Whether J&K detenus were held at Jodhpur.** No official confirmation in any reply. The named prisons in the government's own record are in Uttar Pradesh and Haryana only.
16. **Any J&K Legislative Assembly proceedings record** — the same failure phase 11 recorded, unchanged. The 2010 Assembly answers in §9 are relayed through Amnesty, which is one better than phase 11 had, but still not a proceedings record.
17. **Current status of the constitutional challenge to the section 10 amendment** after December 2023.

**A discipline on all of the above, carried from phase 11 and restated because this session was worse:** guessed or search-surfaced URLs that returned 404 cannot be distinguished from removed documents. **Do not record any document named here as non-existent.**

---

# ✅ RESOLVED — this part was incomplete and is now closed. Orchestrator note, 2026-08-03

**Kept on the record rather than deleted**, so that the gap and its closure are both visible.

The author dispatched a probe on the NCRB / *Prison Statistics India* detenu question and **died on an
API session limit before it returned**. Nothing above was retracted. The three questions below were
open; **all three are now closed in §12**, from ten full official PSI volumes (2011, 2013–2021)
retrieved via the Internet Archive, with supporting logs in `02b-psi-archive-retrieval.md` and
`02b-psi-live-host.md`.

**Read §12.4 before using anything above it** — it is a change-list, because nothing above was edited.

The three questions, as originally posed:

1. Whether *Prison Statistics India* carries **detenus** as a distinct inmate category, and whether
   any table gives a **law-wise split** separating PSA detenus from other preventive-detention detenus.
2. Whether the J&K detenu series in PSI **breaks at 31 October 2019** the way the custodial-death
   series does (phase 11's P-83 establishes that pattern for NCRB Ch.16A and PSI Table 8.1).
3. Whether PSI's unit of account is the **holding state** or the **detaining state** — which decides
   whether a J&K PSA detenu held in Uttar Pradesh (the 2018 amendment permits out-of-territory
   detention, and Agra Central Prison refused the count) appears in UP's row or in J&K's, or nowhere.

**Consequence if not closed:** any detenu series built from PSI has an unestablished denominator, and
item 3 may be a structural absence of the same family as phase-11 absence B1 (Army/CAPF custody has
no cell). It must not be authored as though settled.

---

# 12. NCRB *PRISON STATISTICS INDIA* — THE THREE OPEN QUESTIONS, CLOSED

*Appended by the original author after the session limit reset. **Nothing above is modified.** The orchestrator's ⚠ banner above stands until the orchestrator removes it.*

## 12.0 RETRIEVAL — and my own lesson applied to myself

**`ncrb.gov.in` remained DNS-dead from my process on retest** (`dig`: no servers reachable; `curl` exit 6; fetcher `getaddrinfo ENOTFOUND`). Per the standing rule I did not record that as an environment fact. I retested by another route from the same process:

**`web.archive.org` IS reachable by `curl` from my process** (DNS resolves to 207.241.237.3), **while the fetcher tool is blocked from it.** The Wayback CDX API returned a full index of NCRB's archived Prison Statistics India files. **The volumes were then retrieved in full.**

**RETRIEVED BY ME, directly, and text-extracted with `pdftotext -layout`:**

| Document | Size | Wayback snapshot fetched |
|---|---|---|
| **PSI 2019 — complete volume** | 35.9 MB | `https://web.archive.org/web/20200907005407id_/https://ncrb.gov.in/sites/default/files/PSI-2019-27-08-2020.pdf` |
| **PSI 2018 — complete volume** | 36.9 MB | `https://web.archive.org/web/20200401014546id_/http://ncrb.gov.in/sites/default/files/PSI-2018.pdf` |
| **PSI 2021 — Glossary** | 115 KB | `https://web.archive.org/web/20221209015724id_/https://ncrb.gov.in/sites/default/files/PSI-2021/Glossary_ncrb-2021.pdf` |
| **PSI 2013 — Glossary** | 63 KB | `https://web.archive.org/web/20191029081848id_/http://ncrb.gov.in:80/StatPublications/PSI/Prison2013/Glossary-2013.pdf` |

**These are NCRB's own published volumes, retrieved as PDFs and read. I grade them T1** — the archive is a faithful copy of the official file, not a third-party reproduction or a relaying account, and the `id_` snapshot form returns the original bytes. **A reader who disagrees with that grading should read it as T1-via-archive; nothing below depends on the distinction.**

**The lesson generalises and I state it as a rule, because it has now paid twice in one phase:** when a `.gov.in` host is unreachable, **the Internet Archive by `curl` is the route**, and it works from processes that cannot reach the live host and cannot use the fetcher against the archive either. Phase 11 lost the NCRB volumes to `ncrb.gov.in` being unreachable and graded its Chapter 16A findings T4 as relayed. **They did not need to be. The volumes were retrievable then by this route, and L-0121's NCRB source should be re-graded on re-retrieval rather than left at T4.**

---

## 12.1 QUESTION 1 — detenus as a category, and the law-wise split

### (a) Detenus ARE a distinct inmate category. Confirmed.

Detenus are one of the four top-level inmate categories throughout PSI, appearing as a row alongside **CONVICTS**, **UNDERTRIALS** and **OTHERS** in every inmate-population table, separately for Indian and Foreign inmates.

**NCRB's own definition, RETRIEVED verbatim from the PSI 2021 Glossary:**

> "**Detenues**$
> Any person detained in prison on the orders of the competent authority under the relevant preventive laws."

**And from the PSI 2013 Glossary, RETRIEVED verbatim — near-identical, eight years earlier:**

> "**Detenue**
> Any person detained in prison on the orders of competent authority under the relevant preventive detention law."

**The definition is stable across at least 2013–2021. Two things in it are load-bearing:**

1. **"detained in prison".** A person held in a police lock-up, an army camp, a Joint Interrogation Centre, or an unnotified "subsidiary jail" is **not a detenu for PSI purposes**. The category is defined by the *place of confinement*, not by the legal instrument. **This matters directly for J&K: JKCCS (RETRIEVED) documented Dak Bungalows and the Sher-i-Kashmir International Convention Centre used as detention centres in 2019 (§4.3). And PSI's own Glossary definition of "Prison/Jail" — RETRIEVED verbatim — expressly EXCLUDES "any place which has been declared by the State Government by general or special order, to be a subsidiary jail."** **So a person held under the PSA in a place that is not a notified prison, or in a declared subsidiary jail, is outside PSI's universe altogether. That is a second structural exclusion and it was not in my brief.**

**CAUTION ON THAT POINT, because I nearly overstated it.** A headline indexed in search — Deccan Herald, "J&K declares 2 detention locations as subsidiary jails" — suggests J&K did use this device in the relevant period. **I did NOT retrieve that article and it is named here only so the lead is not lost.** Whether the exclusion actually bit in J&K in 2019 is **NOT ESTABLISHED**. What IS established is the exclusion's existence in NCRB's own definition. **A subsidiary-jail declaration would, on the face of the Glossary, move detenus out of the counted universe — but it is also arguable that the exclusion is aimed at the *jail-infrastructure* tables rather than the *inmate* tables, and I could not resolve which. Stage 3 must not author on this without settling it.**

2. **The definition is NOT NCRB's.** The 2021 Glossary carries a footnote marker on "Detenues$" and the key at the foot of the page reads, verbatim: **"$ - Model Prison Manual-2016, published by MHA"**. **The categories NCRB counts by are defined by the Ministry of Home Affairs, not by the statistical agency.** That is trap (2) at the level of the *definition* rather than the data: the producer of the concept and the answering ministry are the same body.

### (b) THE LAW-WISE SPLIT DOES NOT EXIST. Stated plainly, with how I established it.

**NCRB names the PSA — in a footnote, as an example, in a list, with no numbers attached.** PSI 2019, note under Tables 2.18 and 2.19, **RETRIEVED verbatim including NCRB's own typographical errors:**

> "Note: Detenues includes inmates detained under preventive laws such as **COFEPSAA, NDPS, NSA, PSA, PIT, NDPS, PBMSECA** etc."

*("COFEPSAA" for COFEPOSA; "PIT, NDPS" for PIT-NDPS; and NDPS appears twice. NCRB's errors, reproduced. My earlier RELAYED fragment at §2.3 is hereby **VERIFIED** against the volume — it was accurate.)*

**"such as… etc." is the whole answer. The laws are named as an illustrative list to explain what the composite contains, and there is no table anywhere that disaggregates it.**

**How I established the negative — this is a search over the volume, not an inference.** I extracted the complete PSI 2019 volume to text and enumerated **every table concerning detenus**, from the volume's own list of tables:

| Table | Title, as printed |
|---|---|
| **2.12A** | Education Profile of Detenues as on 31st December, 2019 |
| **2.12B** | Domicile of Detenues as on 31st December, 2019 |
| **2.12C** | Religion of Detenues as on 31st December, 2019 |
| **2.12D** | Caste of Detenues as on 31st December, 2019 |
| **3.4** | Detenues (Indian Prisoners) in Jails by Sex and Age-groups |
| **7.5** | Detenues Released |
| plus | detenu ROWS inside the general inmate tables (2.18, 2.19 and others), and a foreigner-detenu distribution table |

**NCRB disaggregates detenus by education, domicile, religion, caste, sex, age, jail type and mode of release. It does not disaggregate them by the law under which they are detained. There is no such table in the volume.**

**ANSWER TO Q1: YES to detenus as a distinct category; NO to any law-wise split. PSA detenus are NOT separable from NSA, COFEPOSA, PIT-NDPS or PBMSECA detenus anywhere in Prison Statistics India.** The J&K detenu figures in §2.3 and below are **all-preventive-laws** figures and must never be labelled "PSA detenus".

**This converts §2.3's "NOT ESTABLISHED" into an established structural absence**, and it strengthens D2: not only does no instrument declare which of the three objects it counts, **the one official series that carries detenus at all cannot tell you which statute produced them.**

### (c) Figures recovered in passing — J&K detenu counts, RETRIEVED

- **All-India detenus rose from 2,384 (2018) to 3,223 (2019)** — PSI 2019 executive summary, verbatim: "The number of detenues has increased from 2,384 in 2018 to 3,223 in 2019."
- **Jammu & Kashmir reported 404 detenus as on 31 December 2019 — 12.5% of the national total, the second-highest in India**, behind Tamil Nadu (1,240, 38.5%). PSI 2019, verbatim: "Tamil Nadu has reported the most number of detenues (38.5%, 1240) … and Jammu & Kashmir (12.5%, 404)".
- **This closes part of §11 item 5** — I now have a J&K detenu figure post-2008. It is **404 for 2019**, and it is not a PSA figure.

---

## 12.2 QUESTION 3 — HOLDING STATE OR DETAINING STATE

*(Taken before Q2 because it is the one that changes a classification, and because the same table answers it.)*

### ANSWER: THE HOLDING STATE. Established from the table's own structure, not by inference.

**PSI's row is the State/UT whose prisons hold the inmate. Domicile is a COLUMN, not a row.** This is visible on the face of **Table 2.12B, "Domicile of Detenues as on 31st December, 2019"**, which has exactly three domicile columns: **"Belongs to State" | "Belongs to other State" | "Belongs to other Country"**.

**A row therefore reads: *of the detenus held in this State's prisons, this many are locals, this many are from elsewhere in India, this many are foreign.* The unit of account is unambiguously the holding State.**

### And the J&K transfers are visible in it — in the WRONG rows

**RETRIEVED verbatim from Table 2.12B, PSI 2019:**

| State/UT | Belongs to State | **Belongs to other State** | Belongs to other Country | Total |
|---|---|---|---|---|
| **JAMMU & KASHMIR** | 373 | **0** | 31 | **404** |
| **UTTAR PRADESH** | 74 | **188** | 0 | **262** |
| **HARYANA** | 0 | **27** | 0 | **27** |
| GUJARAT | 683 | 15 | 0 | 698 |
| TAMIL NADU | 1146 | 94 | 0 | 1240 |
| **TOTAL (ALL-INDIA)** | 2824 | **359** | 40 | **3223** |

**Read the three rows that matter together.**

- **Uttar Pradesh held 188 detenus who "belong to other State" — 72% of everyone it held.**
- **Haryana held 27 detenus, ALL of them from another State. Its own-State count is zero.**
- **Jammu & Kashmir's "belongs to other State" cell is 0.** J&K's 404 are its own residents plus 31 foreigners.

**188 + 27 = 215 out-of-State detenus in exactly the two States to which J&K PSA detenus were transferred.**

**And the corroboration is exact.** MHA told the Rajya Sabha on 4 December 2019 (RS US Q.1818, §3.3A) that **27** J&K prisoners were lodged in Haryana. **Table 2.12B shows Haryana holding exactly 27 out-of-State detenus, and no others.** The figure matches to the unit, from two independent instruments — a parliamentary answer and a statistical volume — neither of which cites the other. **That is the strongest corroboration anywhere in this part, and it is corroboration between two OFFICIAL sources rather than between a source and its own echo, so trap (1) does not touch it.**

(The UP figures differ — 234 in the parliamentary answer against 188 here — because MHA counted **all J&K prisoners** up to November 2019 while PSI counts **detenus only**, as on 31 December. Different objects. **Do not reconcile them; the difference is roughly the J&K convicts and undertrials in UP jails, which is a real quantity nobody has stated.**)

### WHAT THIS DOES TO A J&K DETENU COUNT BUILT FROM PSI

**J&K's published detenu figure for 2019 is 404. The number of detenus detained on the orders of J&K authorities on that date was approximately 619 — 404 plus the 215 held in UP and Haryana. NCRB publishes the first and not the second, and states nowhere that the first is incomplete.**

**A J&K detenu series built from PSI therefore undercounts J&K's detention activity by roughly a third in 2019, and the undercount grows exactly as the transfer practice grows** — 44 transfers in 2018, 295 in 2019, 146 in 2021, 585 in 2022 (§3.3). **The 2022 volume's J&K row will be missing the largest cohort of all.** **This means the apparent trend in a PSI-derived J&K detenu series is partly a measurement artefact of the section 10 amendment, and stage 3 must not read a fall in J&K's row as a fall in J&K detentions.**

### BUT THE ABSENCE IS SUBTLER THAN "NO CELL", AND I WAS WRONG TO EXPECT B1'S SHAPE

**My brief and the orchestrator both anticipated a structural absence of the same family as phase-11 absence B1 (deaths in Army/CAPF custody have no cell anywhere). IT IS NOT THAT SHAPE, and the difference matters.**

**There IS a cell. Table 2.12B's "Belongs to other State" column records the fact of out-of-State detention, and it is published.** What the column does not record is **WHICH** other State. It is an aggregate: UP's 188 could be from J&K, Punjab, Bihar or anywhere.

**So the correct classification is `not-published`, not `not-collected`** — and the producibility test is satisfied twice over:
1. **The prison that holds a detenu necessarily knows which State's authority detained them**, because the detention order travels with the prisoner and is the authority for holding them. A prison cannot lawfully hold a detenu whose detaining authority it cannot identify.
2. **The J&K Home Department produced a year-wise transfer series on one sheet (§3.3), and MHA produced a State-by-State lodging table in Parliament (§3.3A).** Both prove the origin-attribution exists in official hands.

**D6 (§6) is hereby ANSWERED and its classification CONFIRMED at `not-published`, with the low-confidence flag REMOVED.** Its "what is not measured" should now read: **not the attribution rule — which is established, and is the holding State — but the destination-and-origin matrix. There is no published table of detenus by holding State cross-tabulated against detaining State.**

**Route, and it is a good one because it asks for a cross-tabulation of two columns NCRB already collects:** a request to the Director, NCRB, for Table 2.12B disaggregated by State of domicile rather than by the binary "other State" — i.e. the origin-destination matrix underlying a column already published. **Failing that, an RTI to the Director General (Prisons), Uttar Pradesh, for the number of detenus held in UP prisons on the orders of authorities in Jammu & Kashmir, year-wise. Note that this is the request Agra Central Prison already refused as "third party" information (D4) — so a refusal is precedented, and that precedent is itself why D4 is the phase's cleanest `withheld`.**

**One further consequence, and it cuts AGAINST the case I have been building, so I record it prominently.** Because PSI counts by holding State, **the 215 J&K detenus in UP and Haryana are NOT lost from the national count** — they are in it, in the wrong rows. **The all-India detenu total of 3,223 is complete.** The transfer practice damages the *J&K* series and the *attribution*, not the national aggregate. **Anyone arguing that transferred detenus "disappear from the statistics" is overstating it, and stage 3 should not write that.**

---

## 12.3 QUESTION 2 — does the J&K detenu series break at 31 October 2019?

### ANSWER: IT BREAKS — but at the VOLUME boundary, not at the legal event, and the gap between the two is the finding.

**All four volumes retrieved and the State/UT lists read directly. Table 2.12B in each, plus a whole-volume string search for "Ladakh".**

| Volume (reference date) | Where J&K is listed | Ladakh | Occurrences of "Ladakh" in the whole volume |
|---|---|---|---|
| **PSI 2018** (31 Dec 2018) | **STATES**, Sl. No. 10 | absent | **0** |
| **PSI 2019** (31 Dec 2019) | **STATES**, Sl. No. 10 | absent | **0** |
| **PSI 2020** (31 Dec 2020) | **UNION TERRITORIES**, Sl. No. 33 | **present, Sl. No. 34** | **178** |
| **PSI 2021** (31 Dec 2021) | **UNION TERRITORIES**, Sl. No. 33 | **present, Sl. No. 34** | — |

**So: PSI 2020 is the FIRST volume in which Jammu & Kashmir appears as a Union Territory and Ladakh appears as a separate row.** The break is at the 2019/2020 volume boundary.

**This CONFIRMS phase 11's P-83 rather than refuting it** — phase 11 recorded J&K as a State row through the 2019 volume and a UT thereafter with Ladakh split out, and that is exactly what the volumes show. **I have now verified it on the actual documents, for the DETENU tables specifically, where phase 11 had it relayed and could reach neither volume.**

**But there is a nuance phase 11 could not see without the volumes, and it is the real answer to the question as asked.**

**The 31 October 2019 legal break and the statistical break are FOURTEEN MONTHS APART.**

**PSI 2019's reference date is 31 December 2019 — sixty-one days AFTER Jammu & Kashmir ceased to exist as a State.** On that date there was no State of Jammu and Kashmir and there was a Union Territory of Ladakh. **NCRB nonetheless published the 2019 data under a State of Jammu & Kashmir, in the STATES block, with no Ladakh row anywhere in a 15,000-line volume.**

**Consequences, and they are practical:**

1. **The 2019 data point is mislabelled on its own terms.** Its 404 detenus are reported against an entity that did not exist at the reference date.
2. **The 2019 figure's territorial referent is UNSTATED and probably the old one.** With no Ladakh row, Ladakh's detenus — if any — are either inside the 404 or nowhere. **PSI 2020 and 2021 both report Ladakh with zero detenus, so the practical distortion is likely nil**, but "likely nil" is an inference about magnitude, not a statement about the referent. **The referent genuinely changes between the 2019 and 2020 volumes and a series must break there.**
3. **The break is a property of the VOLUME'S State/UT list, not of any individual table.** The same list governs every table in the volume, so **Table 2.12B (Domicile of Detenues) and Table 8.1 (Deaths of inmates in Prisons) break at the identical point.** Phase 11 located the break at Table 8.1; **it is not table-specific, it is volume-wide, and stage 3 should record it that way** — which also means it applies to every J&K quantity anyone ever draws from PSI, not only to custodial deaths and detenus.

**So the honest formulation for stage 3: the administrative-unit break is 31 October 2019; the STATISTICAL break in Prison Statistics India is the 2019/2020 volume boundary; and the 2019 volume straddles them, reporting a post-break reference date under a pre-break entity.**

### The J&K detenu series, RETRIEVED — four points, and it is not a PSA series

From Table 2.12B in each volume ("Total" column, J&K row):

| As on 31 December | 2018 | 2019 | 2020 | 2021 |
|---|---|---|---|---|
| **J&K detenus** | **283** | **404** | **228** | **252** |
| of whom, belongs to J&K | 253 | 373 | 211 | 248 |
| of whom, foreign nationals | 30 | 31 | 17 | 4 |
| **J&K listed as** | State | State | **UT** | **UT** |
| All-India detenus | 2,384 | 3,223 | 3,590 | 3,470 |

**Read with the caveats already established and it is a usable but treacherous series.** It is **all preventive-detention laws, not the PSA** (§12.1b). It is a **31 December stock**, not a flow. It **excludes the J&K detenus held in UP and Haryana** (§12.2). And it **breaks between 2019 and 2020**.

**The apparent collapse from 404 to 228 between 2019 and 2020 is the trap.** It is not established that detention fell. In the same interval the out-of-State detenu counts in UP and Haryana also fell — UP 188 → 29, Haryana 27 → 12 — which is consistent with mass releases during the COVID decongestion of 2020, with the transfer series' own stated zero transfers in 2020 (§3.3), and with a real fall. **Three readings, and PSI cannot distinguish them.**

### The transfer practice is visible in NCRB's own table, and it corroborates §3

**"Belongs to other State" detenus, the two receiving States:**

| As on 31 December | 2018 | 2019 | 2020 | 2021 |
|---|---|---|---|---|
| **Uttar Pradesh** | **0** | **188** | 29 | 110 |
| **Haryana** | 27 | 27 | 12 | 28 |

**Uttar Pradesh held ZERO out-of-State detenus on 31 December 2018 and 188 on 31 December 2019.** **That step is the August 2019 transfer, recorded in NCRB's own published table, from the receiving end.** It is independent of the J&K Home Department document, of the parliamentary answers and of JKCCS — **a fourth instrument, official, and it agrees.**

**This materially strengthens §3 and it should be carried into any record on the transfer power.** And note what it does to the dating dispute of §3.2: **the practice at scale begins in the 2019 volume, not the 2018 one.** Haryana's 27 out-of-State detenus were already there at end-2018 — consistent with the 13 July 2018 amendment having operated — but the volume change comes with the 2019 cohort. **It still does not settle which instrument removed the proviso, and I do not claim it does.**

---

## 12.4 WHAT THESE ANSWERS CHANGE ABOVE — a change-list, since nothing above is edited

| Where | What changes |
|---|---|
| **§2.3** | "NOT ESTABLISHED — whether PSI carries a law-wise detenu split" is now **ESTABLISHED: it does not.** The relayed COFEPOSA/NSA/PSA fragment is **VERIFIED** as genuine NCRB text (PSI 2019, note to Tables 2.18/2.19). The J&K series now has four retrieved points, 2018–2021. |
| **§2.3 / P-83** | Phase 11's break finding is **CONFIRMED on the documents** and refined: the break is **volume-wide, not table-specific**, and falls at the **2019/2020 volume boundary, fourteen months after the legal event**. |
| **§6, D6** | **ANSWERED.** Unit of account is the **holding State**. Low-confidence flag **REMOVED**; classification **`not-published` CONFIRMED**. Its "what" should be restated as the missing **origin-destination matrix**, since the "other State" aggregate IS published. |
| **§6, D6** | **NOT** the shape of phase-11 B1. There is a cell; it is just not attributed. **Stage 3 should not file it alongside B1.** |
| **§10A** | A second authorable series appears: **J&K detenus at 31 December, 2018–2021 (283 / 404 / 228 / 252), T1, from PSI Table 2.12B** — with a mandatory break at the 2019/2020 volume boundary, a mandatory label of "all preventive-detention laws, not PSA", and a mandatory caveat that it excludes detenus held outside the territory. |
| **§11 item 4** | **CLOSED.** |
| **§11 item 5** | **CLOSED for 2018–2021.** Still open for 2009–2017 and 2022 onward; those volumes are archived and retrievable by the same route. |
| **§11 item 6** | **CLOSED** — holding State. |
| **§0** | The retrieval lesson gains a second limb: **when a `.gov.in` host is unreachable, try `curl` to `web.archive.org`.** It worked from the same process that could not resolve `ncrb.gov.in` and cannot use the fetcher against the archive. |

## 12.5 STILL NOT ESTABLISHED after this work

1. **Any PSA-specific detenu count from NCRB, in any year.** Not a retrieval failure — **the disaggregation does not exist.** Nothing would settle it short of NCRB adding a law-wise table, or an RTI to NCRB for the underlying State returns if those carry law-wise detail.
2. **Whether the State returns NCRB compiles carry law-wise detenu detail that NCRB aggregates away.** This is the difference between `not-collected` and `not-published` for the law-wise split, and I could not test it. **Settled by: an RTI to the Director, NCRB, for the proforma issued to States/UTs for the prison returns.** This is the same route already recommended at D6 and it now answers two questions.
3. **J&K detenu figures for 2009–2017 and 2022 onward.** Volumes are archived; I stopped at four for time. **Straightforwardly retrievable by the route in §12.0.**
4. **Whether the "subsidiary jail" exclusion in PSI's Glossary bites on the inmate tables or only the infrastructure tables** (§12.1a caution).
5. **Whether the 404 → 228 fall between 2019 and 2020 is release, transfer, or COVID decongestion.** PSI cannot distinguish them.

---

# 13. BEYOND THE THREE QUESTIONS — THE DNS WORKAROUND, AND THE OFFICIAL PSA TEXT AT LAST

*Not what I was asked for. It arrived because closing Q1–Q3 exposed the cause of the retrieval failure, and it closes the largest gap in the part.*

## 13.1 THE CAUSE WAS THE RESOLVER, NOT THE NETWORK

A delegated agent (model `claude-opus-5`, its own log at `parts/02b-psi-live-host.md`) isolated it:

- system resolver and `8.8.8.8`: **SERVFAIL / timeout** for `ncrb.gov.in`
- **`dig @1.1.1.1 ncrb.gov.in` → `45.127.74.245`**
- `curl --resolve ncrb.gov.in:443:45.127.74.245` → **HTTP 200, full site access**

**The browser User-Agent was never the fix. The `--resolve` is.** I then tested every host this phase recorded as dead, from my own process, against `1.1.1.1`. **All resolve:**

| Host | via 1.1.1.1 |
|---|---|
| `ncrb.gov.in` | 45.127.74.245 |
| `indiacode.nic.in` / `www.indiacode.nic.in` | 94.202.207.51 |
| `sansad.in` | 164.100.252.170 |
| `jkhighcourt.nic.in` | 164.100.220.61 |
| `egazette.gov.in` | 164.100.190.144 |
| `legislative.gov.in` | 164.100.220.71 |
| `www.mha.gov.in` | 94.202.207.57 |

**Every "unreachable Indian government host" in §0 was a DNS-resolver artefact.** Not a takedown, not geo-blocking, not a network fault. **§0's table should be read as a record of a broken resolver and nothing else.**

**And this reaches back into phase 11.** Phase 11 built a pattern from reachability — "Every J&K territorial source failed; every Union source and every international source succeeded" — and declined to explain it, correctly. **That pattern is now very likely a resolver artefact too, and `jkhighcourt.nic.in` resolving here is direct evidence against it.** Phase 11's T4 gradings on NCRB Chapter 16A, on the Reorganisation Act Fifth Schedule and on `indiacode.nic.in` statutes were all forced by a failure that had this three-line fix. **They are recoverable, and L-0121 and L-0123 should be re-retrieved rather than left relayed.**

**The rule, final form: a `.gov.in` or `.nic.in` host that will not resolve is a RESOLVER problem until proved otherwise. Test `dig @1.1.1.1`, then `curl --resolve`. Only then, `curl` to `web.archive.org`. Only after all three may a host be recorded as unreachable.**

## 13.2 THE OFFICIAL PSA — RETRIEVED, T1

**`https://www.indiacode.nic.in/bitstream/123456789/16496/1/public_safety_act,_1978.pdf`** — HTTP 200, 359,256 bytes, fetched with `--resolve` and read. **This is the official consolidated text, with amendment footnotes. It is the first T1 statutory document in this phase.** §1.1's central caveat — that the only PSA text held was an unamended third-party reproduction — **is now discharged.**

### (a) SECTION 10 — THE DATING DISPUTE IS SETTLED

**Section 10 as it now stands, verbatim:** a detenu is liable "(b) to be removed from one place of detention to another place of detention **[x x x x]** by order of the Government" — the bracket marking omitted words.

**The two footnotes to section 10, verbatim:**
> "1. Words **"in the State"** omitted by **Act VIII of 2002, s. 2**."
> "2. **Proviso omitted by S.O. 1229(E) dated 31.03.2020**."

**And the complete list of amending instruments cited anywhere in the Act:** Act II of 1982 · Act IV of 1985 · Act II of 1988 · Act XII of 1988 · Act VIII of 2001 · Act VIII of 2002 · Act VII of 2012 · S.O. 3912(E) dated 30.09.2019 · S.O. 1229(E) dated 31.03.2020.

**There is no 2018 instrument. The string "2018" does not occur anywhere in the Act.**

**RESOLUTION OF §3.2, stated with its remaining uncertainty intact.** The official consolidated Act attributes the omission of the proviso **solely to S.O. 1229(E) of 31 March 2020**, and records no 2018 amendment of any kind. **My inference at §3.2 — that the 2020 Order had a proviso to omit because the proviso was still on the books — is confirmed by the best available evidence.**

**But I do not declare OHCHR wrong.** OHCHR's footnote 103 names "Jammu and Kashmir Public Safety Act (Amendment) Act, 2018, 13 July 2018", and a State Administrative Council decision of 11 July 2018 is separately reported. **The reconciliation I consider most likely — and cannot prove — is that the 2018 Act was made under Governor's Rule, lapsed or was never brought into force, and the 2020 Order therefore had to omit a proviso still standing.** An India Code consolidation that silently omits a lapsed enactment is entirely normal. **What is now established: the proviso was on the statute book until 31 March 2020 and was removed by S.O. 1229(E). What is NOT established: what the 13 July 2018 Act did, or why it left no trace.** **Settled by: the Gazette notification of the 2018 Act — `egazette.gov.in` now resolves.**

**This sharpens §3 considerably.** The 295 PSA detenus transferred out of J&K during 2019, and the 188 out-of-State detenus NCRB recorded in Uttar Pradesh on 31 December 2019, were moved **while the proviso barring exactly that was, on the face of the official text, still in force.**

### (b) SECTION 18 — AND THE 2012 AMENDMENT WAS TWO-SIDED, WHICH §1.4 GOT HALF-RIGHT

**Section 18 as it now stands, verbatim:**
> "(a) [**three months in the first instance which may be extended up to twelve months**] from the date of detention in the case of persons acting in any manner prejudicial to the maintenance of public order [x x x];
> [(a-1) **twelve months** from the date of detention in the case of the persons indulging in smuggling of timber; and]
> (b) [**six months in the first instance which may be extended up to two years**] from the date of detention in the case of persons acting in any manner prejudicial to the security of the [**Union territory of Jammu and Kashmir**]."

**The footnotes, verbatim, and they carry the finding:**
> "2. Substituted for the words **"twelve weeks"** by **Act VII of 2012, s. 6**."
> "5. Substituted for the words **"two years"** ibid."
> "6. Substituted by **S.O. 1229(E) dated 31.03.2020** for "State"."

**So Act VII of 2012 did TWO OPPOSITE THINGS in one section:**
- **public order: raised the ceiling from TWELVE WEEKS to TWELVE MONTHS** — a fourfold increase;
- **security of the State: cut the first instance from TWO YEARS to SIX MONTHS**, extendable back to two years.

**§1.4 relayed only the liberalising half, because that is the half the secondary literature reports.** The amendment that is universally described as narrowing the Act **quadrupled the maximum detention available on the public-order limb** — the limb used against protesters and stone-pelters, and the limb under which MLA Mehraj Malik was detained in 2025 (§10). **This belongs in caseAgainst and it was invisible until the bare Act was read.**

**It also corrects §1.2 and §8.1.** The "up to two years without trial" headline is now precisely: two years is reachable only on the security limb, by extension from a six-month first instance; the public-order limb tops out at twelve months, from a three-month first instance.

### (c) SECTION 19(2) — THE PROVISO THAT MAKES THE MAXIMUM PERIOD NOT A MAXIMUM

**Verbatim, from the official text, immediately after the re-detention gateway quoted at §1.2:**

> "**Provided that in computing the maximum period for which a person against whom such fresh order of detention has been issued may be detained, the period during which such person was under the earlier order of detention shall be excluded.**"

**Read that against §5.5 and §2.1.** The statute expressly directs that time already served under a quashed or revoked order **does not count** towards the maximum under the fresh order. **The clock restarts.** So a person subjected to eight successive orders, as Amnesty documented, is not detained for two years with paperwork churn — **each order carries its own fresh maximum, and the statutory ceiling constrains no individual's total detention at all.**

**This is the legal mechanism behind the practice the whole of §5 documents, and it is one sentence in the Act.** It was not in my brief, it is not in the secondary literature I read, and it is the single most important thing the bare text added. **Stage 3 should put it in caseAgainst, verbatim.**

### (d) Two smaller confirmations, and one discrepancy

- **Section 13** now requires grounds to be communicated "**in the language which is understandable to him**", ordinarily within five days, "and in exceptional circumstances and for reasons to be recorded in writing, not later than ten days". The **five-day/ten-day** structure and the language requirement are confirmed from the official text. **Sub-section (2) — no duty to disclose facts against the public interest — is UNAMENDED and stands.**
- **Section 14(3)** in the official text is the Search-cum-Selection Committee form, **confirming §1.6 from a T1 source.** **DISCREPANCY: India Code reads "(b) Additional Secretary, Home Department" where the LegitQuest reproduction at §1.6 read "Administrative Secretary, Home Department".** The official text governs. **The substance — the Home Department sits on the committee selecting its own reviewers — is unaffected.**
- **S.O. 3912(E) dated 30.09.2019** appears once, construing "Jammu and Kashmir State" — a Central adaptation order made 31 days before the appointed day, not previously noted anywhere in this part.

## 13.3 WHAT §13 CHANGES

| Where | Change |
|---|---|
| **§0, §11 item 1** | **DISCHARGED.** The official PSA text is retrieved, T1. |
| **§1.2, §1.4, §8.1** | Maximum periods **corrected**: public order 3 months → 12 months; timber 12 months; security 6 months → 2 years. The 2012 amendment **raised** the public-order ceiling fourfold. |
| **§1.6** | **CONFIRMED from T1**, with "Additional" not "Administrative" Secretary. |
| **§3.2** | **RESOLVED to 31 March 2020** on the official consolidated text, with the 2018 Act's fate stated as still unestablished. |
| **§5, §8.2** | **New, and important:** section 19(2)'s proviso excludes earlier detention from the maximum-period computation. |
| **§11 items 2, 3, 10, 11, 17** | All now **testable** — `indiacode.nic.in`, `egazette.gov.in`, `jkhighcourt.nic.in` and `sansad.in` all resolve via `1.1.1.1`. **None retrieved; I stopped here because Q1–Q3 were the assignment.** |
| **Phase 11** | Its reachability pattern is probably a resolver artefact; its relayed statutory and NCRB sources are recoverable. |

**Still not established, and I am not going to pretend otherwise:** what the 13 July 2018 Act did; the Fifth Schedule Table captions; Article 22 verbatim; the J&K High Court judgments. **All four are now behind a working route and none of them is retrieved. That is a stopping point, not a conclusion.**
