# 03b — PARLIAMENTARY ANSWERS ON INTERNET AND COMMUNICATIONS SUSPENSION IN J&K
Stage-2 research part, phase 12. Model: claude-opus-5. **STATUS: COMPLETE.**

Rule applied throughout: no URL is written here that was not actually fetched; no
parliamentary answer is quoted that was not read in a retrieved PDF. Every document is
marked **RETRIEVED** or **RELAYED**.

## 0. Retrieval log

### 0.1 Host reachability, tested by this child on 2026-08-03

All tests: `curl -s -o /dev/null -w "%{http_code}"` with browser User-Agent
`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36`.
`000` = connection/DNS failure, not an HTTP status.

| Host (https://) | Status | Verdict |
|---|---|---|
| www.mha.gov.in | **200** | REACHABLE — primary target |
| mha.gov.in (bare, no www) | 301 | redirects to www; must use `-L` or rewrite. **The MHA date pages emit PDF links on the BARE host**, so a naive fetch of the emitted href silently yields a redirect body, not a PDF. Rewrite to `www.` |
| www.pib.gov.in | 302 | reachable |
| prsindia.org | **200** | reachable |
| web.archive.org | **200** | reachable by curl |
| www.dot.gov.in | 000 (https) / **301** (http) | https fails, http redirects; see 0.3 |
| dot.gov.in (bare) | 000 | FAILED |
| sansad.in | 000 | FAILED |
| eparlib.nic.in | 000 | FAILED |
| eparlib.sansad.in | 000 | FAILED |
| loksabhadocs.nic.in | 000 | FAILED |
| digitalsansad.nic.in | 000 | FAILED |
| indiacode.nic.in | 000 | FAILED |
| egazette.nic.in | 000 | FAILED |
| loksabha.nic.in | 000 | FAILED |
| loksabhaph.nic.in | 000 | FAILED |
| 164.100.47.193 | 000 | FAILED |
| 164.100.47.194 | 000 | FAILED |
| jkhome.nic.in | 000 | FAILED |

### 0.1a ⚠️ CORRECTION TO 0.1 — the `000` results above are a DNS RESOLVER ARTEFACT, not dead hosts

A sibling process flagged, and **this process then independently verified**, that the system
resolver and 8.8.8.8 return SERVFAIL for several of these hosts while **1.1.1.1 resolves them
correctly**. Method used to retest (resolve via 1.1.1.1, pin the IP in curl):

```
ip=$(dig +short @1.1.1.1 <host> A | grep -E '^[0-9]+\.' | head -1)
curl -sL --max-time 20 -A "<browser UA>" --resolve "<host>:443:$ip" --resolve "<host>:80:$ip" "https://<host>/"
```

**Retest results, run and observed by THIS process:**

| Host | A record via 1.1.1.1 | HTTP | Revised verdict |
|---|---|---|---|
| **sansad.in** | 164.100.252.170 | **200** | **REACHABLE** — 0.1 was WRONG |
| **dot.gov.in** | 164.100.220.84 | **200** | **REACHABLE** — 0.1 was WRONG |
| **www.dot.gov.in** | 94.202.207.50 | **200** | **REACHABLE** — 0.1 was WRONG |
| **indiacode.nic.in** | 94.202.207.51 | **302** | **REACHABLE** — 0.1 was WRONG |
| eparlib.sansad.in | 164.100.166.186 | 000 | resolves but no HTTP response — genuinely unreachable |
| eparlib.nic.in | **no A record** | — | does not resolve on 1.1.1.1 either |
| loksabhadocs.nic.in | **no A record** | — | does not resolve on 1.1.1.1 either |
| 164.100.47.193 | n/a (literal IP) | 000 | genuinely unreachable; the SC 26th Report was obtained from the Internet Archive instead (§3.0) |
| **jkhome.nic.in** | **no A record on 1.1.1.1** | — | **see the caution below** |

**Rule this establishes, and it is a phase-wide one: a retrieval failure recorded against a
live host hardens into a false finding downstream.** The table in §0.1 would have supported a
claim like "the Parliament questions portal is unavailable" — which is false. Everything
in §0.1 marked FAILED should be read only through §0.1a. This part's substantive findings
are unaffected (they rest on documents actually retrieved and read), but the reachability
claims are corrected here.

**On `jkhome.nic.in` specifically — do NOT overclaim.** A sibling reports NXDOMAIN on 1.1.1.1,
9.9.9.9 and 208.67.222.222 and reads that as the domain having ceased to exist. This process
confirms only the **1.1.1.1** leg (no A record). One resolver's NXDOMAIN is not proof of
de-listing, and this process did **not** independently test 9.9.9.9 or 208.67.222.222. If the
disappearance of the J&K Home Department host is to be used as a finding — and it would be a
significant one, since that is the very site the Union told Parliament the orders are
published on (§1.3) — it must be established by a process that actually ran those queries and
recorded them. **Marked here as NOT ESTABLISHED BY THIS PROCESS.** See §4.

### 0.1b Consequence for provenance

All parliamentary answers quoted in §1 come from the **Ministry of Home Affairs' own mirror of
its replies** on `www.mha.gov.in`, which was reachable throughout and is an official Indian
government publication of the reply text — graded **T1** where the PDF was fetched and read.
The MHA mirror carries only MHA's own answers; it does not carry Ministry of Communications /
DoT replies. That gap is what §0.1's error mattered for, and it is addressed in §5 below.

### 0.2 MHA parliamentary Q&A corpus — route and counts

- Index RETRIEVED: `https://www.mha.gov.in/MHA1/Par2017/PArQueAnsPage-new.html` (200) —
  lists session pages `ParBud2013` … `ParBud2026`, `ParMonsoon2013` … `ParMonsoon2026`,
  `ParWinter2013` … `ParWinter2025`.
- 21 session pages RETRIEVED covering 2019–2026 (`ParBud2019`–`ParBud2026`,
  `ParMonsoon2019`–`ParMonsoon2025`, `ParWinter2019`, `ParWinter2021`–`ParWinter2025`).
  Note: **there is no `ParWinter2020.html`** on the index — the 2020 Winter Session was
  cancelled (COVID), consistent with the record.
- **152 date pages RETRIEVED** (`https://www.mha.gov.in/MHA1/Par2017/{LS|RS}DDMMYYYY.html`).
- **1,711 distinct answer-PDF URLs extracted** from those date pages.
- Route sanity check RETRIEVED and read:
  `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2022-pdfs/RS20072022/371.pdf` (200) —
  confirmed to be Rajya Sabha Unstarred Q. No. 371, answered 20 July 2022, subject
  "INCIDENTS OF TERROR ATTACKS IN KASHMIR", asked by Shri M. Shanmugam.

## 1. Answers found

### 1.1 LS Unstarred Q. No. 1440, answered 20 September 2020 — "INTERNET BLOCKADE IN KASHMIR"  **[RETRIEVED / T1]**

- **URL RETRIEVED:** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2020-pdfs/ls-21092020/1440.pdf` (HTTP 200; note the MHA date-page directory is `ls-21092020` although the answer date printed on the paper is 20.09.2020)
- **House:** Lok Sabha. **Type:** Unstarred. **Q. No.:** 1440.
- **Date answered (as printed):** "TO BE ANSWERED ON THE 20TH SEPTEMBER, 2020/BHADRAPADA 29, 1942 (SAKA)"
- **Member:** SHRI UTTAM KUMAR REDDY NALAMADA.
- **Subject heading (verbatim):** "INTERNET BLOCKADE IN KASHMIR"
- **Answered by:** "MINISTER OF STATE IN THE MINISTRY OF HOME AFFAIRS (SHRI G. KISHAN REDDY)"

**The question asked, verbatim:**

> "(a) the reasons due to which the Government has not yet completely lifted the internet blockade in Kashmir;
> (b) the date by which the Government intends to restore unrestricted access to the internet in Kashmir considering the Supreme Court's ruling that an indefinite suspension of internet services is not permissible;
> (c) the details of restrictions imposed on internet access in Kashmir, including a list of whitelisted sites, types of internet connectivity that have been restored, areas where access has and has not been allowed and internet speed restrictions; and
> (d) the estimated economic loss caused by the internet blockade since it was imposed and the impact on services like healthcare, education as well as access to justice for concerned domiciles?"

**Operative answer text, verbatim (a) & (b):**

> "Considering the over all security scenario and in the interest of the sovereignty and integrity of India, the Government of Union territory of Jammu and Kashmir issues orders from time to time regulating telecom/internet services in the Union territory of Jammu and Kashmir in terms of the applicable rules and the principles laid down and directions contained in the judgment of the Hon'ble Supreme Court of India in the matter of Anuradha Bhasin Vs Union of India & Ors.
>
> The internet services are already available in Kashmir on fixed line (without any speed related restrictions) as well as Mobile Data services (at 2G speed) since 24.01.2020. Restrictions on accessing social media sites were also lifted on 04.03.2020. Further, high speed mobile data services too have been commenced in the districts of Ganderbal (Kashmir Division) and Udhampur (Jammu Division) with effect from 16.08.2020."

**Verbatim (c):**

> "Fixed line Internet connectivity is available without any speed related restrictions, with Mac-binding. The Mobile Data services are presently restricted to 2G speed in districts other than the two districts mentioned in (a) above. There is no restriction on accessing any sites, including the social media sites."

**Verbatim (d) — the economic-loss question:**

> "The businesses have had access to internet through fixed line connectivity and internet kiosks opened in large numbers across the Valley without any speed restrictions.
>
> The 2G mobile internet speed is not an impediment in covid control measures including dissemination of information to the general public as well as health workers. Also, e-learning apps and education/e-learning websites of the Government of India/ Government of J&K are accessible over 2G internet for downloading e-books and other study material. Further, the restriction on high speed mobile internet services has not been an impediment in the administration of justice and the Courts have taken special measures to conduct their proceedings during the pandemic by providing video links/URLs to the lawyers and the litigants."

**Why this matters (against task items b, c, d, e):**

- **(b) restoration dates put on the record by the Union itself, T1:** fixed-line and 2G mobile "since **24.01.2020**"; social-media access restriction lifted "**04.03.2020**"; high-speed mobile data commenced in Ganderbal and Udhampur "with effect from **16.08.2020**". These are *government-stated* restoration milestones and are usable as T1 anchors.
- **(d) NO economic-loss figure is given, and none is rejected.** The member asked expressly for "the estimated economic loss". The reply does not produce a figure, does not say a figure exists, does not say one does not exist, and does not say an assessment was or was not done. It substitutes an assertion of *no impediment*. This is a clean instance of an **answer that is responsive in form and silent in substance** — the absence is not denied, it is bypassed. Classify: the Union has never put an economic-loss estimate for the J&K suspension on the parliamentary record in this reply.
- **(e) Union vs UT:** the reply says in the Union's own words that "**the Government of Union territory of Jammu and Kashmir issues orders**". The Union Home Ministry places authorship of the orders with the UT administration.
- **(c) Anuradha Bhasin:** the Union asserts compliance ("in terms of the applicable rules and the principles laid down and directions contained in the judgment ... in the matter of Anuradha Bhasin Vs Union of India & Ors") **but does not state that any order has been published**, and does not mention the Review Committee at all. Compliance is asserted, not evidenced.

**TRAP APPLIED — two-sidedness of format does not survive one-sidedness of production.** Every substantive fact in this reply about the state of connectivity in Kashmir is a fact about the UT administration's own conduct, restated by the Union in the Union's voice. A Union Minister reciting the UT's restoration dates in Parliament is not the Union checking the UT; it is the UT's account travelling under a Union letterhead. The two-sided appearance — Member of Parliament asks, Union Minister answers — does not make the underlying production two-sided.

### 1.2 LS Unstarred Q. No. 1405, answered 20 September 2020 — "DETENTION UNDER PUBLIC SAFETY ACT" (asked by Rahul Gandhi; parts (c)–(f) are on 4G)  **[RETRIEVED / T1]**

- **URL RETRIEVED:** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2020-pdfs/ls-21092020/1405.pdf` (HTTP 200)
- **House:** Lok Sabha. **Type:** Unstarred. **Q. No.:** 1405.
- **Date answered (as printed):** "TO BE ANSWERED ON THE 20TH SEPTEMBER, 2020/BHADRAPADA 29, 1942 (SAKA)"
- **Member:** SHRI RAHUL GANDHI.
- **Subject heading (verbatim):** "DETENTION UNDER PUBLIC SAFETY ACT"
- **Answered by:** "MINISTER OF STATE IN THE MINISTRY OF HOME AFFAIRS (SHRI G. KISHAN REDDY)"

**Question, verbatim (relevant parts):**

> "(c) whether the Government proposes to restore 4G services in Jammu and Kashmir;
> (d) if so, the timeline for restoration of 4G services;
> (e) whether the Government has examined the impact of restriction of 4G services on the provisioning of essential services and online education during the COVID-19 pandemic in Jammu and Kashmir; and
> (f) if so, the details thereof?"

**Verbatim (a) & (b) — the detention figure, which is a J&K-produced number:**

> "The Government of Jammu and Kashmir has reported that in view of the constitutional changes effected by the Parliament with regard to the erstwhile State of Jammu and Kashmir in August, 2019, various measures were taken to maintain public order which included preventive detention of certain persons. As on 11.09.2020, 223 persons are under detention."

**Verbatim (c) & (d):**

> "The telecom/internet services are regulated under the Indian Telegraph Act, 1885 and the Temporary Suspension of Telecom Services (Public Emergency or Public Safety) Rules, 2017. The restrictions are imposed in the interests of the sovereignty and integrity of India, the security of the State and for maintaining public order, as provided under section 5 (2) of the Indian Telegraph Act, 1885.
>
> The internet services are already available in Kashmir on fixed line (without any speed related restrictions) as well as Mobile Data services (at 2G speed) since 24.01.2020. Restrictions on accessing Social media sites were also lifted on 04.03.2020. Further, from 16.08.2020, high speed mobile data services too have been commenced in the districts of Ganderbal and Udhampur.
>
> The regulation of internet has been undertaken, for limited duration, with orders being issued from time to time, after due assessment, in accordance with the law and with strict adherence to the principles laid down and directions contained in the judgment of the Hon'ble Supreme Court of India."

**Verbatim (e) & (f) — the impact-assessment question:**

> "The businesses have had access to internet through fixed line connectivity without any speed restrictions. Prior to that, internet kiosks were opened in large numbers across the Valley. However, due to the pandemic, economic activities have been impacted to some extent.
>
> The 2G mobile internet speed is not an impediment in covid control measures including dissemination of information to the general public as well as health workers. Also, e-learning apps and education /e-learning websites of the Government are accessible over 2G internet for downloading e-books and other study material. The restriction on high speed mobile internet services has not been an impediment in the administration of justice; the Courts have taken special measures to conduct their proceedings during the pandemic by providing video links/URLs to the lawyers and the litigants."

**Why this matters:**

- **A direct "whether the Government has examined the impact" question — never answered yes or no.** The member asked in terms (e) whether an examination had been *done*. The reply neither claims an examination was done nor admits none was. It asserts conclusions ("not an impediment") without producing or citing any study. Set this beside the Standing Committee finding at §3 below, which states that DoT and MHA had **not** conducted any such study — i.e. **the assertion "not an impediment" was made in Parliament in September 2020 with, on the Standing Committee's own record fourteen months later, no underlying assessment.** That juxtaposition is the strongest documented item in this part.
- **"orders being issued from time to time, after due assessment"** — the Union asserts that assessment precedes each order, without stating who performs it, in what document, or whether any such document is published.
- **TRAP APPLIED again:** the detention figure of 223 persons is expressly attributed — "**The Government of Jammu and Kashmir has reported**". Same structure as the internet answer, only here the relay is visible on the face of the text. *Two-sidedness of format does not survive one-sidedness of production.* The Union is the reporter of the UT's number, not its auditor.

### 1.3 RS Unstarred Q. No. 1182, answered 27 July 2022 — "ARREST OF JOURNALISTS IN JAMMU AND KASHMIR"  **[RETRIEVED / T1]** — **THE HIGHEST-VALUE ITEM IN THIS PART**

- **URL RETRIEVED:** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2022-pdfs/RS27072022/1182.pdf` (HTTP 200)
- **House:** Rajya Sabha. **Type:** Unstarred. **Q. No.:** 1182.
- **Date answered (as printed):** "TO BE ANSWERED ON THE 27TH JULY, 2022/ SRAVANA 5, 1944 (SAKA)"
- **Member:** PROF. MANOJ KUMAR JHA.
- **Subject heading (verbatim):** "ARREST OF JOURNALISTS IN JAMMU AND KASHMIR"
- **Answered by:** "MINISTER OF STATE IN THE MINISTRY OF HOME AFFAIRS (SHRI NITYANAND RAI)"

**The question, verbatim IN FULL — note that it asks the counting question directly:**

> "(a) whether it is a fact that since the revocation of Articles 370 and 35-A, Jammu and Kashmir has seen an increase in detention of journalists and local media organizations and an increase in the number of internet shutdowns by authorities in the region;
> (b) whether Government maintains any data regarding the same; and
> (c) if not, the reasons therefor?"

**The answer, verbatim IN FULL (parts (a) to (c) answered together):**

> "After the Constitutional changes of 5th August, 2019, the internet services were temporarily suspended in Jammu and Kashmir for the maintenance of law and order and to ensure the safety and security of public. However, the internet services were restored in a graded manner.
>
> Presently, there is no restriction on internet services in Jammu and Kashmir. As a law enforcing agency, Police is duty bound to take action under law against any person (without any discrimination of profession or otherwise) who is found involved in such activities prejudicial to the security and sovereignty of the country. During the current year, two individuals associated with media organizations have been detained under Public Safety Act as reported by the Government of Jammu and Kashmir.
>
> The orders of temporary suspension of internet services, issued by the competent authority, under the Temporary Suspension of Telecom Services (Public Emergency or Public Safety) Rules, 2017, during emergent situations, are uploaded on the official website of the Government of Jammu and Kashmir."

**Findings — read this against task items (a), (b), (c) and (e):**

**(i) The counting question was asked in terms and was not answered.** Prof. Jha asked at (b) "**whether Government maintains any data regarding the same**" — "the same" expressly including "an increase in the number of internet shutdowns" — and asked at (c) for "**the reasons therefor**" if not. The Union's reply, answering (a) to (c) together:
- gives **no number of internet shutdowns** in J&K, for any period;
- does **not say** that data is maintained;
- does **not say** that data is not maintained;
- gives **no reason**, having triggered no branch of the (b)/(c) fork.

This is not a refusal and not a denial. **It is a non-answer to a direct question about the existence of a count.** For the corpus's absence taxonomy this is the decisive shape: the Union was asked, on the record, whether it holds the number, and declined to occupy either position. An absence recorded on the strength of this reply is not "government says no data exists" — it is "**government, asked whether the data exists, did not say**." That is a materially different and more defensible classification, and it is now backed by a retrieved primary document.

**⚠️ CORPUS-CRITICAL CAUTION for record P-54.** P-54 asserts "no official series" for all-India internet shutdowns with no retrieved primary source behind it. **This reply does NOT supply that missing source.** It does not contain the words "not centrally maintained", does not invoke the Seventh Schedule, and does not say police/public order are State subjects. Do **not** upgrade P-54 on the strength of 1182. What 1182 supplies is something narrower and cleaner: *a retrieved instance of the Union being asked for the J&K count in Parliament and not producing it.* Write it as that and nothing more.

**(ii) The publication sentence — this settles `not-published` vs `withheld` for J&K.** The final sentence is the Union Home Ministry stating in Parliament, in its own voice, that:

> "The orders of temporary suspension of internet services, issued by the competent authority, under the Temporary Suspension of Telecom Services (Public Emergency or Public Safety) Rules, 2017, during emergent situations, are uploaded on the official website of the Government of Jammu and Kashmir."

Consequences — **SCOPED; read the correction immediately below before using this**:
- The Union **affirms that J&K suspension orders ARE published**. The primary documents exist and are asserted by the Union to be publicly posted.
- The absence that survives is therefore **not an absence of orders — it is the absence of an AGGREGATE**. Nobody in government is asserted to hold, or to publish, a *count* or a *series* derived from those orders. The orders are published one by one; the number is produced by nobody. **This is an absence of the derived series, not of the underlying record**, and the phase should classify it that way. It is a much sharper claim than "shutdown data is hidden", and it is the claim the retrieved evidence actually supports.

**⚠️ SCOPE CORRECTION — this reply speaks only to the POST-*Bhasin* order series.**

My first formulation of this ("so for J&K the orders are not `withheld` and not `not-published`") was **too broad and is withdrawn**. Two limits:

1. **Temporal.** Q. 1182 was answered on 27 July 2022 and describes a then-current practice of uploading orders. The publication practice it describes is a consequence of the *Anuradha Bhasin* direction of January 2020. **It says nothing whatever about the orders issued in and after August 2019**, before that direction — and those are precisely the orders on which the phase's classification turns. Nothing in this reply, or in any document retrieved by this process, establishes that the August 2019 orders were ever published.
2. **Evidential.** Even for the post-2020 period, this is the Union's *assertion* that the UT publishes, not this process's verification that it does. This process **could not check**: `jkhome.nic.in` did not resolve (§0.1a), so the published series was never inspected here.

**Correct formulation:** the Union's 2022 statement establishes publication of the **post-*Bhasin*** order series, and therefore **narrows** the absence to (i) the **2019 orders** and (ii) the **derived count**. It does not establish that nothing is withheld.

**RELAYED, NOT RETRIEVED BY THIS PROCESS — flagged for the coordinator, not adopted as my finding.** A sibling process reports having retrieved from the *Anuradha Bhasin* judgment that the Supreme Court ordered production of the blocking orders on 16.10.2019, that the Solicitor General claimed privilege, that the State produced only "sample orders", and that the Court held difficulty "is not a valid ground to refuse production of orders"; and separately that IFF's RTI IFF/RTI/2024/112 (15 May 2024) for Review Committee findings was refused, ordered released by the First Appellate Authority on 5 August 2024, and refused again on 29 October 2024 as "not available in the records". **This process did not fetch the judgment or the RTI correspondence and quotes neither.** If that account holds, the 2019 orders are `withheld` rather than `not-published`, on a named-requester/specific-request/date/refusal basis — but that determination belongs to the process that actually read those documents. **Tier from here: T4 (relayed), pending verification by the sibling's own retrieval log.**
- **The tension the task asked about is confirmed and is real, but it runs the opposite way to the one hypothesised.** The hypothesis was: government says "no central record" while a numbered J&K series is published. What the retrieved record shows is the Union *pointing at* the published J&K series ("uploaded on the official website of the Government of Jammu and Kashmir") **as its answer to a question about whether it holds data** — i.e. the Union discharges a question about *its own* records by directing Parliament to *the UT's* website. It never says whether the Union holds copies. See (iii).

**(iii) Union vs UT — item (e), and the trap in its purest form.** Three separate devices in one short reply push production down to the UT and away from the Union:
1. the orders are "issued by **the competent authority**" — the authority is not named, and the Union does not say it is the Union;
2. the orders are on "the official website of **the Government of Jammu and Kashmir**" — not on any Union site, and the Union does not say it holds copies;
3. the only hard number in the reply — two detained media individuals — is expressly "**as reported by the Government of Jammu and Kashmir**".

**TRAP APPLIED — two-sidedness of format does not survive one-sidedness of production.** A Rajya Sabha question to the Union Home Minister, answered by a Union Minister of State, looks like the Union being held to account for J&K. It is not. Every factual element in the reply is either the UT's own report or a pointer to the UT's own website. The Union is here a conduit, not a checker: it neither verifies the UT's figure nor claims to possess the UT's orders. **The format is bilateral; the production is unilateral.** Any downstream use of this reply as "the Union of India stated X about J&K" must carry that qualification.

### 1.4 ⭐⭐ RS Unstarred Q. No. 1791, answered 10 March 2021 — "METHODOLOGY FOR CONTROLLING FAKE NEWS AND MISINFORMATION"  **[RETRIEVED / T1]** — **THE T1 PRIMARY SOURCE FOR "NO OFFICIAL COUNT", IN A PARLIAMENTARY REPLY**

- **URL RETRIEVED:** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/rs-10022021/1791.pdf` (HTTP 200). *(Note the MHA directory is `rs-10022021` while the answer date printed on the paper is 10 March 2021 — the directory name is mis-stamped by MHA. The document itself governs.)*
- **House:** Rajya Sabha. **Type:** Unstarred. **Q. No.:** 1791.
- **Date answered (as printed):** "TO BE ANSWERED ON THE 10TH MARCH, 2021/ PHALGUNA 19, 1942 (SAKA)"
- **Member:** SHRI TIRUCHI SIVA.
- **Subject heading (verbatim):** "METHODOLOGY FOR CONTROLLING FAKE NEWS AND MISINFORMATION"
- **Answered by:** "MINISTER OF STATE IN THE MINISTRY OF HOME AFFAIRS (SHRI G. KISHAN REDDY)"

**Question, verbatim IN FULL:**

> "(a) the methodology of Government to control fake news and misinformation during tensions and riots, whether internet shutdowns are a prescribed method; and
> (b) **the kind of data being maintained on internet shutdowns in India, the details thereof?**"

**Answer, verbatim IN FULL:**

> "Challenges of cyber space are many, which flow from its vastness and borderless characters. Information in cyber space flows fast and has potential of misuse. During tensions and riots, suspension of telecom services / internet shutdown is done by the appropriate authorities in the States / UTs concerned in the interest of maintaining public safety and averting public emergency, as per procedures defined in the 'Temporary Suspension of Telecom Services (Amendment) Rules, 2020'. **Centralized data of internet shutdown is not maintained by the Ministry of Home affairs. Orders issued by the Ministry of Home Affairs (MHA) are available at MHA website.**"

**✅ THIS IS THE ITEM (a) THE TASK CALLED THE HIGHEST-VALUE ONE, IN A PARLIAMENTARY REPLY.**

Unlike Q. 1182 (§1.3), which dodged, **this reply answers the counting question squarely and in the negative**:

> "**Centralized data of internet shutdown is not maintained by the Ministry of Home affairs.**"

That is the government, in its own words, on the floor of the Rajya Sabha, in a document this process fetched and read. **It is the first T1 primary source in the corpus for the proposition behind P-54.** It is nine months earlier than the Standing Committee report (§3.1) and says the same thing in one sentence.

**How to use it, precisely:**
- It is **all-India in scope** ("data of internet shutdown", not J&K-specific), and it is **MHA-specific** — it says *MHA* maintains no centralized data. It does not speak for DoT. For DoT, use SC 26th Report paras 23/24/39 (§3.1), which cover DoT expressly.
- Together, §1.4 (MHA, March 2021) + §3.1 paras 22–25 (MHA *and* DoT, December 2021) give **both Union bodies, on the record, within nine months, saying no record is kept.** P-54 can now be sourced to two independent retrieved primaries.
- The second sentence is a real limit and must be carried: "**Orders issued by the Ministry of Home Affairs (MHA) are available at MHA website.**" So the Union *does* publish its **own** orders. What it does not do is maintain centralized data on shutdowns **generally** — i.e. those ordered by States and UTs. The absence is precisely at the point of aggregation across the federal boundary, exactly as §3.2 describes.

**TRAP APPLIED.** Note the structure once more: "suspension … is done by the appropriate authorities in the **States / UTs concerned**". J&K is a UT, and this sentence sweeps it in with the States for the purpose of disclaiming a central record — while §1.3 shows the Union able to say exactly where J&K's orders sit. *Two-sidedness of format does not survive one-sidedness of production:* a Rajya Sabha answer disclaiming knowledge is still the Union choosing what it produces about itself, and the choice here is to characterise J&K as somebody else's record-keeping problem.

### 1.5 LS Unstarred Q. No. 2470, answered 3 December 2019 — "ECONOMY OF VALLEY"  **[RETRIEVED / T1]** — the Winter-2019 economic-loss question

- **URL RETRIEVED:** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2019-pdfs/ls-03122019/2470.pdf` (HTTP 200)
- **House:** Lok Sabha. **Type:** Unstarred. **Q. No.:** 2470.
- **Date answered (as printed):** "TO BE ANSWERED ON THE 3RD DECEMBER, 2019/ AGRAHAYANA 12, 1941 (SAKA)"
- **Members:** SHRI SRIDHAR KOTAGIRI; SHRI BALLI DURGA PRASAD RAO.
- **Subject heading (verbatim):** "ECONOMY OF VALLEY"
- **Answered by:** "MINISTER OF STATE IN THE MINISTRY OF HOME AFFAIRS (SHRI G. KISHAN REDDY)"

**Question, verbatim:**

> "(a) whether it is a fact that the shutdown in the valley, since the last three months or so has crippled the valley's economy;
> (b) if so, the details thereof;
> (c) **the total amount of money which the business community in the valley has suffered losses;**
> (d) whether the Government proposes to provide incentive by way of relaxing income tax to these business people; and
> (e) if so, the details thereof and if not, the reasons therefor?"

**Answer (a) to (c), verbatim — the operative sentence is the third paragraph:**

> "Full potential and economy in Jammu, Kashmir and Ladakh regions could not be realized for the last 70 years as the people of Jammu and Kashmir have suffered from terrorist violence and separatism supported from across the border for the past many decades. On account of article 35A and certain other constitutional ambiguities, the people of this region were denied full rights enshrined in the Constitution of India and other benefits of various Central Laws that were being enjoyed by other citizens of the country.
>
> After the Declaration issued by the President under article 370, based on recommendation of the Parliament, and reorganisation of the erstwhile State of Jammu and Kashmir into Union Territory of Jammu and Kashmir and Union Territory of Ladakh, all such aspects have been addressed. The people and business community of these regions can now realize full potential in all sectors of economy and businesses like in other parts of the country.
>
> Due to these recent decisions, certain precautionary measures taken initially have been substantially relaxed. **There is no specific report received from the Government of Jammu and Kashmir or Administration of Ladakh regarding any new financial implications for businesses and economy in Jammu, Kashmir and Ladakh regions on account of such preventive steps taken as short term measure.**
>
> Under the Rs.80,068 Crores Prime Minister's package announced on 7th November 2015, 63 major development projects in Road, Power, Health, Tourism, Agriculture, Horticulture, Skill Development sectors are already under various stages of implementation. …"

**✅ THIS IS ITEM (d), AND IT IS THE EARLIEST OF THE SET — four months after the blackout began.**

- **No economic-loss figure is given, and the mechanism of the absence is stated:** "**There is no specific report received from the Government of Jammu and Kashmir or Administration of Ladakh regarding any new financial implications.**" The Union does not say it assessed and found no loss. It says **nobody sent it a report.** The Union's knowledge of the economic effect of the shutdown is, by its own account, entirely dependent on the UT volunteering one — and the UT had not.
- Note the phrasing "**any new financial implications**" and "preventive steps taken as **short term measure**" — the reply's framing pre-classifies the blackout as short-term and its effects as nil-by-default.
- Members asked for "the total amount of money which the business community in the valley has suffered losses". **The reply supplies a development-spending figure instead** (Rs. 80,068 crore PM's package, announced in 2015, four years before the events asked about). A number is offered; it is not the number requested and it does not measure the thing asked about.

**TRAP APPLIED — and this is the purest example in the whole part.** The Union's answer to "what did the shutdown cost?" is "the UT has not reported anything to us." **The party that imposed the measure is the sole source of information about the measure's effects, and it has not spoken; the Union treats that silence as the answer.** A question in Parliament, answered by a Union Minister, appears to hold someone to account — but the entire evidentiary content is the absence of a report from the very administration whose conduct is in issue. *Two-sidedness of format does not survive one-sidedness of production.* No independent assessment is asserted anywhere, and none was made: compare §3.6, where MHA told the Standing Committee two years later that no impact assessment exists at all.

**Chronology worth stating plainly, all three legs T1 and retrieved:**
| Date | Document | What government said about impact |
|---|---|---|
| 3 Dec 2019 | LS 2470 (§1.5) | No report received from J&K on financial implications |
| 20 Sep 2020 | LS 1440 / 1405 (§1.1, §1.2) | 2G "not an impediment" to health, education, justice |
| Dec 2021 | SC 26th Report (§3.6) | "no impact assessment study has been done"; "no assessment is available with MHA" |

The middle entry asserts an outcome. The entries either side of it establish that no assessment underlay the assertion — one because nothing had been reported, the other because nothing had been studied.

### 1.6 Two further J&K answers with dated facts  **[RETRIEVED / T1]**

**RS Unstarred Q. No. 1012, answered 28 July 2021 — "PROPOSAL TO REINSTATE THE STATEHOOD IN J&K"**
- **URL RETRIEVED:** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/RS28072021/1012.pdf` (HTTP 200)
- **Member:** SMT. PRIYANKA CHATURVEDI. **Answered by:** SHRI NITYANAND RAI, MoS Home.
- Question part (d), verbatim: "whether some efforts have been made to end the year long ban on different means of communication?"
- Answer (d), verbatim:
  > "In view of the constitutional changes and bifurcation of the erstwhile state of the Jammu and Kashmir into Union territory of Jammu and Kashmir and Union territory of Ladakh, in national interest and also in the Interest of security of J&K, temporary restrictions on various communication channels like internet and mobile services were resorted to in Jammu and Kashmir.
  >
  > Subsequently, the matter was reviewed from time to time and restrictions imposed were gradually eased out in a phased manner and **4G internet data services were restored in the entire Union territory of Jammu and Kashmir w.e.f. 05.02.2021.**"
- **Value:** a hard, government-stated end-date for the 4G restriction — **5 February 2021** — completing the restoration timeline. Note the reply does **not** give a start date, does not state a duration, does not say how many orders were issued, and describes review only as "the matter was reviewed from time to time" with no reviewing body named. **T1 for the date; silent on everything countable.**

**LS Unstarred Q. No. 82, answered 2 February 2021 — "STIMULUS PACKAGE FOR J&K"**
- **URL RETRIEVED:** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/LS-02022021/82.pdf` (HTTP 200)
- **Member:** SHRI SAPTAGIRI SANKAR ULAKA. **Answered by:** SHRI G. KISHAN REDDY, MoS Home.
- The question is the only one found in this sweep that uses the phrase **"communication blockade"**, verbatim: "whether the Government has created a stimulus package for Jammu and Kashmir to address the economic slump caused by the yearlong lockdown and communication blockade".
- Answer, verbatim:
  > "(a) and (b): **The Government of Jammu and Kashmir has approved business revival package of Rs. 1,352.99 Crore on 25th September, 2020.**
  > (c) and (d): An amount of Rs. 434.08 crore was released up to 31st December, 2020, out of which Rs. 250 crore was as Economic Package and Rs. 184.08 crore as COVID-19 Relief. The amount of Rs. 434.08 crore has been fully utilized by 31 December, 2020."
- **Value and limit:** the Union answers a question about the blockade's economic damage with **remediation spending, not damage measurement**. It neither accepts nor rejects the premise of an "economic slump caused by the yearlong lockdown and communication blockade". A relief package is not a loss estimate, and it must not be read downstream as government quantification of harm.
- **TRAP APPLIED:** the package is the **UT's** — "The Government of Jammu and Kashmir has approved". Again the Union relays the UT's figure about the UT's own conduct.

**(iv) "Presently, there is no restriction on internet services in Jammu and Kashmir"** — a dated Union assertion, as of 27 July 2022, that restrictions had ended. Usable as a T1 end-point marker for the post-2019 restriction period, with the caveat that it is an assertion about the UT's conduct made by the Union without stated verification.

### 1.7 RS Unstarred Q. No. 1034, answered 27 November 2019 — "LOSS DUE TO RESTRICTION IN JAMMU AND KASHMIR"  **[RETRIEVED / T1]** — the earliest economic-loss refusal found

- **URL RETRIEVED:** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2019-pdfs/rs-27112019/1034.pdf` (HTTP 200)
- **House:** Rajya Sabha. **Type:** Unstarred. **Q. No.:** 1034. **Date:** "TO BE ANSWERED ON THE 27TH NOVEMBER, 2019/ AGRAHAYANA 6, 1941 (SAKA)"
- **Member:** SHRI K. SOMAPRASAD. **Answered by:** SHRI G. KISHAN REDDY, MoS Home.

**Question, verbatim:**

> "(a) whether Government has noticed the burden, loss of income and jobs of people of Jammu and Kashmir following the restriction imposed in recent days, if so, the details thereof;
> (b) whether Government intends to declare a compensation package for those who lost jobs and earnings in Jammu and Kashmir following the restriction imposed in recent days, if so, the details thereof; and
> (c) **whether any report has been received about the loss in the IT and Tourism sector in Jammu and Kashmir during the recent restriction periods**, if so, the details thereof?"

**Operative sentence of the answer, verbatim:**

> "Due to these recent decisions, certain precautionary measures taken initially have already been substantially relaxed. **There is no specific report received from the Government of Jammu and Kashmir regarding any new losses on account of such preventive steps taken as a short-term measure.**"

**Value.** This is the **earliest** retrieved instance — 27 November 2019, under four months after the blackout — of the Union answering a direct economic-loss question by reporting the absence of a report from the UT. It is the same formula later used in LS 2470 of 3 December 2019 (§1.5), almost word for word, and it establishes that the formula was in use from the first parliamentary session after the events. Member (c) asked expressly whether *any report has been received*; the answer is that none has. **TRAP APPLIED:** identical structure to §1.5 — the Union's knowledge of the effects of the measure depends wholly on the UT reporting them, and the UT had reported nothing.

**Curiosity worth noting for provenance, not for argument.** Several of the Winter 2019 MHA answer PDFs carry the footer, verbatim: "Printed by BoltPDF (c) NCH Software. Free for non-commercial use only." — observed on RS 372, RS 1000, RS 1034 and RS *34. It is a watermark from unlicensed/trial PDF software in the MHA publication chain. It bears on document provenance (these are the ministry's own files, not re-processed copies) and on nothing else. **Do not build any argument on it.**

### 1.8 Two further Winter-2019 answers that bear on the "no assessment" pattern  **[RETRIEVED / T1]**

**RS Unstarred Q. No. 1000, 27 November 2019 — "COST INCURRED BY GOVERNMENT AFTER ABROGATION OF ARTICLE 370"** (`.../par2019-pdfs/rs-27112019/1000.pdf`, HTTP 200). SHRIMATI SHANTA CHHETRI asked "the details of increase of expenditure incurred by Government on the Union Territory of Jammu and Kashmir ever since the abrogation of Article 370". The **entire answer**, verbatim:

> "The reorganisation of erstwhile State of Jammu and Kashmir into Union territory of Jammu and Kashmir and Union territory of Ladakh as per the Jammu and Kashmir Reorganisation Act, 2019 has no additional financial implication as such for the Union territory of Jammu and Kashmir."

A cost question answered with a bare assertion of no cost, no figure, and no reference to any costing exercise.

**RS Starred Q. No. *34, 20 November 2019 — "RESTORATION OF NORMALCY IN KASHMIR VALLEY"** (`.../par2019-pdfs/rs-20112019/34.pdf`, HTTP 200). DR. T. SUBBARAMI REDDY asked about school attendance, medical services and when normalcy would be restored. Statement laid on the Table, verbatim:

> "**Government of Jammu and Kashmir has reported that** after initial restrictions, all the schools and colleges are now open in Jammu and Kashmir including the Kashmir valley. Currently, the examinations for 10th and 12th standard are going on and there has been over 98% attendance of students. There are no restrictions on movement of students in the Valley. Further all hospitals, and health centres are open and all related medical services are fully functional."

**TRAP APPLIED.** A *Starred* question — the highest-accountability instrument the House has, admitting supplementaries — answered by a Statement whose every factual claim is prefixed "**Government of Jammu and Kashmir has reported that**". The most formally two-sided instrument in the parliamentary toolkit, carrying content produced entirely by the administration under scrutiny. *Two-sidedness of format does not survive one-sidedness of production* — and the starred/unstarred distinction makes no difference to it whatsoever. Compare LS 288 of 19 November 2019 ("IMPACT OF REVOCATION OF ARTICLE 370", `.../par2019-pdfs/ls-19112019/288.pdf`, HTTP 200), where SHRI PRASUN BANERJEE asked for "the number of times pellet guns have been used in Kashmir since August 5" and the entire answer to that limb is: "**Pellet guns have been used as a matter of abundant caution, only to deal with severe law and order problem, to avoid civilian causalities.**" A question asking for **a number** answered with **a justification**. No count is given and none is said to exist.

## 2. Negative results

**These are findings, not gaps in effort. Each is stated with the number of documents actually searched.**

### 2.1 Corpus actually swept

| Item | Count |
|---|---|
| MHA session pages retrieved (2019–2026) | 21 |
| MHA date pages retrieved | **152** |
| Distinct answer-PDF URLs extracted | **3,573** |
| PDFs successfully downloaded | **3,557** |
| PDFs converted to text and searched | **3,447** |
| PDFs with no extractable text layer (scanned) | **0** |
| Sessions covered | Budget/Monsoon/Winter 2019 → Budget 2026 (all MHA answers published on the MHA mirror for that span) |

**⚠️ METHOD FAULT FOUND AND CORRECTED MID-SWEEP — record this, it nearly produced a false negative.** The first extraction pass matched only double-quoted `href="…"` attributes. **The MHA date pages for 2019 emit single-quoted `href='…'`**, so the first pass returned 1,711 URLs and **silently omitted 1,862 more — including the entirety of Winter Session 2019**, the single most important session for this phase. The omission was invisible: the date pages fetched with HTTP 200, and the corpus looked complete. It was caught only by checking why a session known to have sat produced zero files. Had it not been caught, this part would have reported "no Winter 2019 questions on the blackout" while never having searched Winter 2019 at all — and **§1.4 (RS 1791, the T1 "centralized data … is not maintained" reply) and §1.5/§1.7 (the economic-loss refusals) were all in the missed batch.** A negative result is only worth what the sweep behind it is worth.

Search terms applied case-insensitively across all 3,447 extracted texts: `internet`, `shutdown`, `shut down`, `suspension of telecom`, `telecom services`, `communication blockade`, `communications blockade`, `blockade`, `broadband`, `2G`, `4G`, `SMS`, `Anuradha Bhasin`, `Bhasin`, `Review Committee`, `Jammu`.

### 2.2 ⭐ Winter Session 2019 — swept exhaustively; **NO question asked the Union for the extent of the communications blackout**

**369 MHA answer PDFs** covering all seven sitting dates on which MHA answered (LS 19.11.2019 – 47; RS 20.11.2019 – 58; RS 27.11.2019 – 54; LS 03.12.2019 – 60; RS 04.12.2019 – 53; LS 10.12.2019 – 46; RS 11.12.2019 – 51). All downloaded, all converted, all searched.

**82** of the 369 mention Jammu and Kashmir. Their subject headings were enumerated in full. **Exactly ONE answer in the entire session has a subject heading about internet in Kashmir:**

- **RS Unstarred Q. 372, 20.11.2019 — "INTERNET SERVICES IN KASHMIR VALLEY DESPITE TOTAL BAN"** (`.../par2019-pdfs/rs-20112019/372.pdf`, RETRIEVED, HTTP 200), SHRI RAJKUMAR DHOOT. And it is **not** a question about the blackout's extent. It asks "whether it is a fact that internet of separatist leaders in Kashmir valley was working despite total ban on it in the valley". The **entire answer** is:
  > "(a) No such instance has been reported.
  > (b) and (c) Question does not arise"

  **The only internet question in the first session after the blackout was a question about whether the ban was leaking, not about the ban itself.** The phrase "total ban" appears in the House's own subject heading, so the fact of a total ban was not in dispute — nobody asked the Union to describe it.

**Therefore, established negatives for Winter Session 2019 (369 documents searched):**
1. **No question asked how many orders suspending telecom/internet services had been issued in J&K.** Zero.
2. **No question asked the duration of the August 2019 suspension**, and no answer states a start date, an end date, or a duration.
3. **No answer mentions the Temporary Suspension of Telecom Services Rules, 2017** — the legal instrument under which the blackout was imposed is **not named once in 369 MHA replies** across the session.
4. **No answer mentions the Review Committee** in the Telegraph Rules sense. (17 corpus-wide "Review Committee" hits were checked individually and **all are "Under-Trial Review Committees"**, an unrelated prisons body — see §2.4.)
5. **No answer mentions *Anuradha Bhasin***. The petition was pending; the judgment came 10 January 2020, after the session.
6. **No economic-loss figure is given.** Two questions asked for one (RS 1034, §1.7; LS 2470, §1.5) and both were answered with "no specific report received from the Government of Jammu and Kashmir".

**This is itself the finding.** In the first parliamentary session after a total communications blackout of some seven million people, the Union was never once asked, in either House, for the number of orders, their duration, or their legal basis — and volunteered none of it. The absence at this date is **not a refusal**: it is prior to refusal. Nothing was withheld in Winter 2019 because nothing was demanded. Classify accordingly, and do not cite Winter 2019 as evidence of concealment.

### 2.3 Sessions swept with no hit on the target terms

Every session listed in §2.1 was searched in full with the term list in §2.1. Outside the answers written up in §1, **the entire 3,447-document MHA corpus 2019–2026 contains no further answer on internet or telecom suspension in J&K.** Specifically:

- **`communication blockade` / `communications blockade`: 1 hit corpus-wide** — and it is in a *member's question*, not a government answer (LS 82 of 02.02.2021, §1.6). **The Government of India has never used the phrase in any MHA reply in this corpus.**
- **`Anuradha Bhasin` / `Bhasin`: 1 hit corpus-wide** — LS 1440 of 20.09.2020 (§1.1). In **3,447 MHA answers spanning 2019 to 2026, the Supreme Court's leading judgment on internet shutdowns is named exactly once.**
- **`shutdown` / `suspension of telecom` / `telecom services` / `blockade`: 6 documents corpus-wide**, all written up in §1, plus one false positive (LS 427 of 25.06.2019, "NAXAL AFFECTED DISTRICTS", where "shut down" refers to centrally sponsored schemes being discontinued — no relation).
- **`2G` / `4G`: 9 documents**, of which only 3 concern J&K (§1.1, §1.2, §1.6); the remaining 6 are Left Wing Extremism mobile-tower rollout and BharatNet answers, unrelated.
- **Budget Session 2020 (Feb–Mar 2020)** — the session immediately following the *Anuradha Bhasin* judgment of 10 January 2020 — **swept in full with no hit** on any target term in relation to J&K internet. **No MHA answer in that session mentions the judgment, its compliance directions, or the publication of orders.** The judgment landed between sessions and generated no MHA parliamentary answer in the next one.
- **Monsoon 2021, Budget 2022, Budget 2023, Monsoon 2023** (the task's priority-3 sessions) — swept in full; the only hits are RS 1012 of 28.07.2021 (§1.6) and RS 1182 of 27.07.2022 (§1.3).
- **2024, 2025 and 2026 sessions** — swept in full. **No MHA answer on J&K internet suspension after 27 July 2022 was found.** The last substantive MHA reply on the subject in this corpus is §1.3. The `internet` hits in 2024–2026 are all cybercrime/I4C, BharatNet or police-infrastructure answers.

### 2.4 The Review Committee — corpus-wide negative

`Review Committee` matches **17 documents**. **All 17 were opened and checked individually. Every one refers to "Under-Trial Review Committees"** (the NALSA/prisons mechanism for undertrial prisoners) or to a one-off committee reviewing police-reform recommendations. **Not one refers to the Review Committee constituted under Rule 5 of the Temporary Suspension of Telecom Services Rules, 2017.**

**So: in 3,447 MHA parliamentary answers from 2019 to 2026, the statutory oversight body for internet shutdowns is never mentioned.** No answer states whether it has been constituted for J&K, how many times it has met, what it found, or whether its findings are published. This bears directly on the `not-published` vs `withheld` question for Review Committee findings: **there is no MHA parliamentary statement on the subject at all, in either direction.** Combine with §3.5, where DoT told the Standing Committee it does not monitor whether these committees even exist and MHA said the question was DoT's to answer.

### 2.5 Question types that were NOT found — enumerate before concluding

Searched for and **not found anywhere in the 3,447-document corpus**:
- any MHA answer giving **a number of internet suspension orders** for J&K or for India;
- any MHA answer giving **a duration** for the August 2019 suspension;
- any MHA answer giving or rejecting **an economic-loss estimate** in rupees;
- any MHA answer stating that an **impact assessment** was or was not conducted (the Standing Committee elicited that; no parliamentary answer does);
- any MHA answer invoking the **Seventh Schedule** or "State subject" to explain absent shutdown records (RS 1791, §1.4, says "not maintained" but gives **no reason**; the reason appears only in the Standing Committee report, §3.1);
- any MHA answer on whether **Review Committee decisions are published**.

## 3. Standing Committee 26th Report — **RETRIEVED IN FULL**

### 3.0 Retrieval

- **Live official host `164.100.47.193` is UNREACHABLE from this environment (status 000).** So is every other Parliament host (see §0.1).
- **The report PDF was RETRIEVED from the Internet Archive** and read in full:
  - Wayback URL fetched (HTTP 200, 575,051 bytes):
    `http://web.archive.org/web/20211202141356if_/http://164.100.47.193/lsscommittee/Communications%20and%20Information%20Technology/17_Communications_and_Information_Technology_26.pdf`
  - Original URL it archives: `http://164.100.47.193/lsscommittee/Communications and Information Technology/17_Communications_and_Information_Technology_26.pdf`
  - Archive timestamp **20211202141356** = 2 December 2021, the day after presentation. The capture is contemporaneous with the official publication.
  - Located via Wayback CDX: `http://web.archive.org/cdx/search/cdx?url=164.100.47.193/lsscommittee/*&output=text&fl=original,timestamp&collapse=urlkey&limit=5000` (HTTP 200, 2,414 rows).
  - `pdftotext -layout` yielded a clean 154 KB text layer; the PDF is digitally typeset, not scanned.
- **Cover page reads, verbatim:** "STANDING COMMITTEE ON COMMUNICATIONS AND INFORMATION TECHNOLOGY (2021-22) / SEVENTEENTH LOK SABHA / MINISTRY OF COMMUNICATIONS (DEPARTMENT OF TELECOMMUNICATIONS) / SUSPENSION OF TELECOM SERVICES/INTERNET AND ITS IMPACT / TWENTY- SIXTH REPORT / LOK SABHA SECRETARIAT NEW DELHI / December, 2021/Agrahayana, 1943 (Saka)".
- **Tier: T1.** This is the Lok Sabha Secretariat's own published PDF, retrieved and read by this process. The retrieval route is the Internet Archive rather than the live official host — that is a transport fact, not a provenance fact; the bytes are the official document as published at the official URL on 2 December 2021. Flag the route in any citation, but do not downgrade to T4: this is not a press account of the report, it is the report.

### 3.1 ⭐ THE HIGHEST-VALUE PASSAGE IN THE ENTIRE PHASE — "no records maintained", in the government's own words

Report Part VII is headed, verbatim: **"VII. Official Data on Internet Shutdown"**.

**Para 22, verbatim:**

> "The Department in their initial submission of Background Note on the subject informed the Committee that concerned State Governments are empowered to issue orders for temporary suspension of internet services to maintain law and order in the State or part thereof under the provisions contained in the Temporary Suspension of Telecom Services (Public Emergency or Public Safety) Rules, 2017. **Records related to telecom services/internet shutdowns ordered by State Governments are not maintained by Ministry of Home Affairs (MHA).**"

**Para 23, verbatim — this is the Seventh Schedule reasoning, given expressly:**

> "On being asked about the reasons for not maintaining records related to telecom services/internet shutdowns ordered by the State Governments, the Department have stated that **police and public order are State subjects as per the Constitution** and States are responsible for prevention, detection and investigation of crimes through their law enforcement machinery. **Records related to internet shutdowns ordered by State Governments are not maintained by DoT.**"

**Para 24, verbatim:**

> "The Department have further informed the Committee that DoT/TRAI have information related to the telecom services license service area-wise. **DoT does not maintain any information on State subjects.**"

**Para 25, verbatim — the Secretary, DoT, in oral evidence:**

> "As Central Government, we do not have a mechanism in which we review as to how many States have given such orders, what were the details given, what were the reasons etc. Sir, essentially Police and Public Order are State Subjects. So, whether they would be enthusiastic about sharing this information, we can explore this."

**Para 19, verbatim:**

> "The Committee wanted to know the number of occasions when internet shutdown has been invoked on reasons other than 'Public Emergency' and 'Public Safety'. To this, **the Department informed that they do not maintain any records related to internet shutdown.**"

**Para 39, verbatim:**

> "On the number of cases where State Governments have used the powers under Section 144 of Cr.P.C. to suspend telecom/internet services and whether orders issued under Cr.P.C. are not in contravention of Suspension Rules, 2017, the Department have replied that **DoT do not maintain any records related to internet shutdown.**"

**Para 40, verbatim:**

> "MHA have also replied that Union Home Secretary issues directions for suspension of telecom services under Suspension of Telecom Services (Amendment) Rules, 2020. **Ministry of Home Affairs has also no information on the number of internet shutdown done by the State under Section 144 of Cr.P.C.**"

**Para 41, verbatim — no records even of PROCEDURE:**

> "As per Suspension Rules, orders of temporary suspension of telecom services are to be issued by Union/State Home Secretary only. The Committee desired to know as to whether proper procedures have been followed in all the internet suspension orders and in how many occasions orders have been issued by officers other than those permitted under the Rules. To this, **the Department in their written submission have stated that DoT do not maintain any records related to the procedure followed in the internet shutdown.** As per Rule 6 of the Temporary Suspension of Telecom Services (Public Emergency & Public Safety) Rules, 2017, the Review committee records its finding whether the directions issued for the suspension are in accordance with the provisions of section 5(2) of the Indian Telegraph Act,1885. **Records related to orders not in accordance with the Rules may be furnished from the concerned Review Committees.**"

**The Committee's own finding, verbatim (Observations/Recommendations chapter):**

> "…agencies have compiled the number of internet shutdowns in the country. As per one Media Report, between January 2012 and March 2021, there were 518 Government imposed internet shutdown across India resulting in the highest number of internet blockings in the world by far. However, **there is no mechanism to verify this claim/assertion as both DoT and MHA do not maintain any record of internet shutdown orders by the States. It is surprising to note that records related to internet shutdowns ordered by State Governments are not maintained by either DoT or MHA and both the Ministries/Departments are not aware of the number of internet shutdowns imposed by the States.** They have made the plea that police and public order are essentially State subjects and suspension of Internet does not actually come under the ambit of crimes. **This has resulted in the absence of any appropriate mechanism to verify the number of internet shutdowns in the country and the reasons for imposing such shutdowns.** The Committee observe that in the absence of such a verifiable mechanism, the Department/MHA **do not have any means to ascertain whether internet shutdowns have been clamped strictly as per the Suspension Rules or the order given by the Supreme Court. The Committee are not satisfied with such a reply** and draw attention of the Department to the Standard Operating Procedure for interception laid down in the Notification No. G.S.R. 780 (E) dated 27th October, 2009 under Section 69(2) of the IT Act, 2000 which provides for maintenance of records by designated officer, review of…"

**✅ THIS RESOLVES THE TASK'S HIGHEST-VALUE ITEM (a), AND IT RESOLVES P-54.**

Record P-54 asserts "no official series" for all-India internet shutdowns with no retrieved primary source. **That source now exists and is retrieved.** The government's own words, submitted in writing and in oral evidence to a Lok Sabha standing committee and printed in that committee's published report, are:

1. "Records related to telecom services/internet shutdowns ordered by State Governments are **not maintained by Ministry of Home Affairs (MHA)**" (para 22);
2. "Records related to internet shutdowns ordered by State Governments are **not maintained by DoT**" (para 23);
3. the reason given is expressly the constitutional division — "**police and public order are State subjects as per the Constitution**" (para 23) — i.e. exactly the Seventh Schedule argument the task anticipated;
4. "**DoT does not maintain any information on State subjects**" (para 24);
5. the Secretary, DoT, on the record: "**As Central Government, we do not have a mechanism in which we review as to how many States have given such orders**" (para 25);
6. and the Committee's own conclusion that consequently there is "**no mechanism to verify**" any shutdown count and that both bodies "**are not aware of the number of internet shutdowns imposed by the States**".

This is a **T1 primary source for the non-existence of an official all-India series** — the first in the corpus. P-54 should be upgraded and re-sourced to this document, with the pin-cites above. Note also that it is more than "no series is published": it is **no record is kept at all**, at either ministry, by their own admission. The absence is not `not-published` and not `withheld`. It is **`not-collected`** — the underlying administrative record was never created at Union level. That is the correct classification and it is now evidenced.

### 3.2 The tension with J&K — **the task's hypothesis is CONFIRMED, and it is sharper than expected**

Set two retrieved T1 documents side by side:

| | Document | What it says |
|---|---|---|
| A | **SC 26th Report, paras 22–25** (Dec 2021) | Neither DoT nor MHA maintains any record of State/UT internet shutdown orders; reason given = police and public order are State subjects under the Constitution |
| B | **RS Unstarred Q. 1182, 27 Jul 2022** (§1.3 above) | Union Home Ministry states J&K suspension orders "are uploaded on the official website of the Government of Jammu and Kashmir" |

**The tension is real and it is a finding. State it as follows.** The Union's stated ground for holding no record is *constitutional* — police and public order are State subjects, so the Union neither keeps nor can be expected to keep the orders. **But Jammu and Kashmir is not a State.** From 31 October 2019 it is a Union Territory, and under the J&K Reorganisation Act the police and public order of that UT are **not** devolved in the way the para-23 argument assumes — they sit with the Union through the Lieutenant Governor. The Seventh Schedule "State subject" defence, whatever its force for Punjab or Rajasthan, **does not on its own terms cover the one territory where suspensions have been most frequent and most prolonged.**

And the record shows the Union knows perfectly well where the J&K orders are: it told the Rajya Sabha in July 2022 that they are on the J&K government's website. So the position that emerges from the two documents together is:

> The Union does not keep a count of J&K internet suspensions, it says it need not because police and public order are State subjects, J&K is not a State, and the Union can nevertheless point Parliament to precisely where the J&K orders are published.

That is not an inability to obtain the data. **It is a declined aggregation.** The orders are published, individually and serially; the Union knows the location; nobody totals them. Downstream, this should be classified as an absence of the **derived series**, produced by a **choice not to compile**, dressed in a **federalism argument that does not fit the territory it is being used for**. Do not soften this into "data unavailable".

**TRAP APPLIED — two-sidedness of format does not survive one-sidedness of production.** The Standing Committee proceeding has the full apparatus of scrutiny: a committee of parliamentarians, written submissions, oral evidence from a Secretary to Government, a printed report. But look at what the Committee was actually able to establish. Every factual claim about how many shutdowns occurred, on what grounds, and by whose order had to come from the executive — and the executive's answer was that it holds none of it. The Committee could not verify the 518 figure because there was nothing to verify it against; it says so in terms ("there is no mechanism to verify this claim/assertion"). **A scrutiny body that can only ask, of a producer that has chosen not to record, is not scrutiny — it is the form of scrutiny over a one-sided production.** The Committee's own frustration ("It is surprising to note…", "The Committee are not satisfied with such a reply") is the sound of that structure failing in public. Cite the Committee's dissatisfaction as evidence *of the absence*, never as evidence that the absence was corrected.

### 3.3 MHA on why it will not collect the data centrally — para 26, verbatim

Representative of MHA, in oral evidence before the Committee:

> "…..xxxxx…we have a National Crime Records Bureau which collects information on certain aspects of crime. Communal riots is one of them. That information is collected on a regular basis. It is published on a regular basis. **Our view at the moment is that the suspension of internet for purposes of public order, etc. does not actually come under the ambit of crimes. So, this is not within the present purview of the NCRB. At the moment, there is no proposal in MHA at least to collect this information at a central level.**"

(The "xxxxx" is in the printed report — it marks expunged/withheld evidence, not an ellipsis of mine.)

**This is the mechanism of the absence, stated by the ministry.** India has a functioning national statistical apparatus for exactly this kind of aggregation — the NCRB, which MHA describes as collecting "on a regular basis" and publishing "on a regular basis". Internet suspensions are excluded from it by a **classification decision**: they are "not…within the ambit of crimes", therefore outside NCRB's purview, therefore uncounted. And MHA states there is "**no proposal**" to change that.

For the corpus this is decisive as to *kind* of absence. It is not capacity, not cost, not security. **A capable national counting machine exists, and this phenomenon was defined out of its scope.** That is an absence by categorisation. Record it as such.

### 3.4 ⭐ J&K's OWN NUMBER, put on the record by the UT — para 27, verbatim

> "When the Committee desired information on total number of internet and telecom shutdown decisions in last two years, the Government of NCT, Delhi informed the Committee that no decisions have been taken by Govt. of NCT of Delhi in the last two years on shutting down internet and telecom services in Delhi. **UT of J&K in their written submission stated that since issuance of the directions by the Hon'ble Supreme Court, a total of 93 orders, including 76 orders issued by the competent authority to the effect of confirming the directions by the authorized officers, have been issued. All these orders are in the public domain and can be accessed on the official website of the Home Department.**"

(Para 28 records Bihar's parallel submission: six directions in three districts between August 2018 and 25 August 2020.)

**This is the single hardest J&K number found in this sweep.** Parse it carefully:

- **93 orders total**, "since issuance of the directions by the Hon'ble Supreme Court" — i.e. counting from the *Anuradha Bhasin* judgment of 10 January 2020 to the date of the UT's written submission to the Committee (the report is of December 2021; the submission is undated in the printed text, so **the closing date of the 93 is not established** — see §4).
- Of those 93, **76 are confirmatory** — "orders issued by the competent authority to the effect of confirming the directions by the authorized officers". So the structure is: an authorized officer issues a direction, and the competent authority afterwards confirms it. The 76 are the confirmations. That leaves **17 orders that are not described**, and the report does not say what they are. **Do not assume 93 = 93 distinct suspension events.** On the face of the text, 93 is a count of *orders*, of at least two different kinds, and the mapping from orders to suspension episodes is not given.
- **"All these orders are in the public domain and can be accessed on the official website of the Home Department."** This is the UT itself, in writing to a parliamentary committee, asserting publication — and it corroborates, from an independent document and a year earlier, the same claim MHA later made to the Rajya Sabha in Q. 1182 (§1.3).

**TRAP APPLIED — two-sidedness of format does not survive one-sidedness of production, and this is the cleanest instance in the phase.** The 93 is a **UT-produced figure**. The Committee did not count the orders; it asked, and J&K wrote back a number. Nothing in the report indicates the Committee verified it, sampled the website, reconciled 93 against the published series, or asked what the 17 non-confirmatory orders were. The figure now sits inside an official Lok Sabha report and will look, to any downstream reader, like a parliamentary finding. **It is not a parliamentary finding. It is a J&K Home Department self-report, printed.** The container is a scrutiny document; the content is the scrutinised party's own arithmetic about itself. Cite it as: *93 orders, as stated by the UT of J&K in written submission to the Standing Committee* — never as "the Standing Committee found 93 orders". This is the exact failure mode the trap names, and here the report's own formatting makes it easy to miss.

Note also the asymmetry the paragraph creates: the Committee asked *the States/UTs* because it could not ask the Union, the Union having said it holds nothing. **So the only shutdown counts anywhere in this report are self-reported by the bodies doing the shutting down.** There is no independent number in the document at all — a fact the Committee effectively concedes when it says there is "no mechanism to verify".

### 3.5 Review Committees — item (c). DoT does not know where they exist.

**Para 50, verbatim:**

> "As per the Temporary Suspension Rules, State Review Committee shall consist of Chief Secretary, Law Secretary and one other Secretary. During the evidence, the Committee were informed that **Review Committee was yet to be constituted in Delhi.** In this background, the Committee desired to know whether Review Committees have been constituted in all the States including Delhi and the measures taken by the Department to ensure that Review Committees are constituted in all the States. To this, the Department submitted that **constitution of the Review Committee is the responsibility of the State Government. Status of formation of Review Committee or otherwise is not monitored by DoT.**"

**Para 51, DoT representative in oral evidence, verbatim:**

> "I would like to submit that the Department has to work within the framework of law which, obviously, all of us know. When an Act is made in the Parliament and it has certain provisions, then it is the duty to follow those provisions. Now, police and public order, without doubt, are State subjects and States are responsible for prevention, detection and investigation of crimes through their law enforcement machinery. That is one point.
>
> Secondly, under the Act and the rules, the concerned State Governments have been empowered to issue orders for temporary suspension of telecom services. **We believe that the States are responsible entities and with due application of mind and in public interest, they would be exercising these powers. We have not been reviewing this for what each state has done in this belief that they are empowered to do it and they are accountable in their own systems on how they do it** and in the structure which we have of governance. **We have not thought to ask each State.** Even if such information was sought by any hon. Member, the nodal Ministry for law and order and for police and issues relating to such suspension is the Ministry of Home Affairs. It is because even in our scheme of things, when the Central Government has to make any such suspension, it is not the Department of Telecommunications, it is the Home Secretary who orders this."

**The Committee's finding, verbatim:**

> "The Committee have been informed that **Review Committee is yet to be constituted in Delhi.** When the Committee desired to know the status of constitution of Review Committees in all the States, the Department replied that constitution of the Review Committee is the responsibility of the State Governments and **the status of formation of Review Committee or otherwise is not monitored by DoT. MHA have also replied that this has to be replied by DoT.**
>
> The Committee feel that constitution of Review Committee by all States/UTs is an essential pre-requisite to ensure adequate checks and balances in exercising the Suspension Rules. It is, therefore, absolutely necessary that the Review Committees are constituted in all the states. Considering this, **the Committee find it strange that the Department do not have information whether Review Committees have been constituted in all States/UTs.** The Department have simply replied that it is the responsibility of the State Governments and **there is no mechanism to ascertain whether Review Committees have been constituted in all States/UTs.** … The Committee recommend the Department to take necessary action to ensure that Review Committees are constituted in all the States in a time bound manner. The Committee also recommend that **the data regarding constitution of Review Committee by all States/UTs are obtained and record maintained by the Department with periodic monitoring.**"

**Findings on item (c):**

1. **The oversight body's existence is itself unverified.** The Review Committee is the *sole* safeguard the Rules provide against misuse of suspension powers. As of December 2021 the Union department that made the Rules did not know in which States and UTs that safeguard existed. In at least one jurisdiction (Delhi) it did not exist at all.
2. **The circularity, on the record:** DoT says this is MHA's subject; **"MHA have also replied that this has to be replied by DoT."** Each Union ministry names the other. Neither holds it. This is not obstruction — it is a genuine hole in the machinery, and both halves of it are printed in an official document. It is a very strong item for the phase.
3. **Nothing whatever is said about whether Review Committee decisions are published.** The report establishes that under Rule 6 the Review Committee "shall record its finding" — para 41 adds that "Records related to orders not in accordance with the Rules **may be furnished from the concerned Review Committees**", i.e. DoT does not hold them either. There is **no statement anywhere in the retrieved report that any Review Committee finding has ever been published**, and no statement of how many times any Review Committee has met. See §4.
4. **"We have not thought to ask each State"** — the Secretary-level admission that the non-collection is not a legal impediment but an unexercised option. Combine with §3.3 ("no proposal in MHA…to collect this information at a central level"). Both ministries could ask; neither has.

### 3.6 Impact assessment — item (d). No study, by either ministry, and each says it is the other's job.

**Committee's finding, verbatim:**

> "…services/ internet greatly affect the local economy, healthcare services, freedom of press and education, etc. From the information provided by the Department, **the Committee note that no impact assessment study has been done by the Department.** As per the Department of Telecommunications, since the actual shutdown is ordered either by the State Governments or by the Ministry of Home Affairs, **the Department are not assessing whether the objectives have been achieved or not, and the responsibility for assessing the effectiveness of Internet Shutdown lies completely with the Ministry of Home Affairs or the concerned State Government. The Committee have also been informed that no assessment is available with MHA.** According to them, internet shutdown is done as a preventive measure if the situation arises concerning the interest of the public safety, the sovereignty and integrity of India, the security of the State, friendly relations with foreign states or public order or the prevention of incitement to the commission of an offence. Suspension is revoked when the situation comes under control. When the Committee pointed out that communal riots took place during pre-internet era also and enquired if any study has been conducted by DoT/MHA to establish the correlation between internet and riots, **both DoT and MHA have informed the Committee that they have not conducted any study to establish the link between internet shutdown and communal riots.**"

And, verbatim:

> "The Committee find that **no study has been conducted by the Department to understand or analyse the telecom/internet shutdown rules adopted in other democratic countries** like USA, UK and other European countries. They have also submitted that **no information is available with them regarding States/UTs frequently resorting to internet shutdowns on grounds of 'Public Emergency' and 'Public Safety' in the country.** The Department have simply stated that sufficient safeguards are inbuilt in the Suspension Rules, 2017…"

**Findings on item (d):**

- **No economic-loss figure is accepted by government, and none is rejected — because no assessment exists.** "No impact assessment study has been done by the Department" and "no assessment is available with MHA". Both, retrieved, T1.
- **The same evasion structure as the Review Committees:** DoT says responsibility "lies completely with the Ministry of Home Affairs or the concerned State Government"; MHA has nothing. The subject is passed between two Union bodies and lands nowhere.
- **The efficacy premise is unevidenced by admission.** Shutdowns are justified as preventive; asked for the study linking shutdowns to prevention, "both DoT and MHA have informed the Committee that they have not conducted any study to establish the link". **A measure defended by its effects has never had its effects measured, and the government said so to Parliament.**
- **⚠️ Read this back against §1.2.** In September 2020 MHA told the Lok Sabha that 2G speed "is not an impediment" to covid response, education, or justice in J&K. Fourteen months later the same ministry told the Standing Committee it holds no impact assessment at all. **The parliamentary assertion of no-harm was not backed by any assessment, on the government's own later admission.** This pairing — one retrieved MHA answer asserting no impact, one retrieved parliamentary report recording MHA's admission that it never assessed impact — is the strongest evidentiary construction available in this part, and both halves are T1.

### 3.7 J&K in the Committee's own voice

**Verbatim:**

> "While the Committee expressed concern about the prolonged internet shutdown in Jammu and Kashmir, **Government indicated that this was undertaken for reasons of national security.**"

> "With regard to Jammu and Kashmir, the Committee hope that the Government can devise **less sweeping methods to intercept terrorist communications in order to avoid recourse to methods that have a disproportionate impact on innocent citizens.**"

The Committee raised J&K; the Government's answer was the national-security formula; the Committee's response was a "hope". **No J&K-specific finding, no J&K-specific recommendation, and no J&K figure other than the UT's self-reported 93 of §3.4.**

### 3.8 The Committee's own proceedings — members tried to stop the inquiry

The report's minutes record, verbatim, that when the subject was taken up:

> "**As some Members raised objection to discussing the subject due to its sensitive nature**, he assured the Members that the Committee were not dealing with any issues relating, in any way, to the direct problems and sensitivities of nation's national security apparatus…"

> "Before the witnesses could be called, **the same Members again raised objection on the ground that under Rule 331E of the Rules of Procedure and Conduct of Business, the subject cannot be taken up by the Committee since it relates to day-to-day activity of the Ministry.**"

> "**The dissenting Members**, thereafter, invited attention of Chairperson to Rule 261 … **They demanded that the questions whether the Committee can examine the subject should be put to vote** … They also pointed out that **the subject is sub-juice and any matter that is being discussed in the Court should not be taken up.**"

> "As Members continued to demand a voting, **Chairperson invoked Direction 54 of 'Directions by the Speaker Lok Sabha'** … He informed the House that some Members are trying to reopen a question i.e. not to discuss the subject and in the instant case Committee have already decided to examine the subject and **he is not allowing them to reopen the question under Direction 54.** Thereafter, he directed that the witness be called in."

Also recorded: **the Secretaries of DoT and MHA did not attend** — "Secretaries of DoT and MHA have sought exemption from attending the sitting as they had to attend meeting chaired by Hon'ble Prime Minister" — and an Additional Secretary was sent instead, after the Chairperson spoke to the Home Secretary by phone about "two questions that remain pending i.e. **compliance with the Supreme Court directive on review of internet shutdown in the UT of Jammu and Kashmir and maintenance of records on the number of internet shutdown by all the States.**"

**Why this belongs in the record.** The two questions the Chairperson had to negotiate access to by telephone are *precisely* the two questions this phase turns on: J&K review compliance, and whether anyone keeps the numbers. The inquiry that produced the only T1 evidence of the absence was itself resisted from inside the committee on grounds of sensitivity and sub judice, survived only by a Speaker's Direction, and was answered by deputies rather than the accountable Secretaries. **The scrutiny that exposed the absence nearly did not happen.** That is context for how much weight this single report has to carry — and for why there is no comparable document before or after it.

### 3.9 Action Taken Report on the 26th Report — **NOT RETRIEVED**

Searched for and not found. Evidence of the search:

- Wayback CDX over the whole committee directory returned 2,414 rows:
  `http://web.archive.org/cdx/search/cdx?url=164.100.47.193/lsscommittee/*&output=text&fl=original,timestamp&collapse=urlkey&limit=5000` (HTTP 200).
- The complete set of 17th-Lok-Sabha Communications & IT report PDFs ever archived on that host is: **19, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36**. Nothing above 36.
- Reports 27–36 were each **RETRIEVED from Wayback and their title pages read** to identify them. Result:
  - **27** — "ETHICAL STANDARDS IN MEDIA COVERAGE" (December 2021)
  - **28** — ATR on the Committee's **Twenty-second** Report
  - **29** — ATR on the **Twenty-third** Report
  - **30** — ATR on the **Twenty-fourth** Report
  - **31** — ATR on the **Twenty-fifth** Report
  - **32, 33, 34, 35** — Demands for Grants (March 2022)
  - **36** — ATR on the **Twenty-first** Report
- So the ATR series had reached the 25th Report by early 2022. **The ATR on the 26th would be numbered 37 or above, and no such file was ever archived on `164.100.47.193`.** The live host is unreachable (§0.1a), `eparlib.sansad.in` resolves but returns no HTTP response, and `eparlib.nic.in` / `loksabhadocs.nic.in` have no A record on 1.1.1.1.

**CONCLUSION: the Action Taken Report on the 26th Report was NOT retrieved and its contents are NOT known to this process.** Nothing in this part is drawn from it. **Do not paraphrase it from memory downstream.** Whether the government accepted, partly accepted, or rejected the recommendation that DoT maintain shutdown records and constitute Review Committees in all States/UTs is **UNESTABLISHED** — and that matters, because it is the question of whether the December 2021 absence was ever remedied.

### 3.10 PRS summary — corroboration only  **[RETRIEVED / T4]**

- **RETRIEVED:** `https://prsindia.org/policy/report-summaries/suspension-of-telecom-services-internet-and-its-impact` (HTTP 200), full text read.
- Used **only** to cross-check that this process's reading of the primary report matches an independent reading. It does. PRS records the same points: the 2017 Rules' inadequacy, undefined grounds, Review Committee composition, selective blocking, and — verbatim from the PRS page — "**The Committee noted that the DoT did not have data on the constitution of review committees in all states/UTs**" and "**It observed that the DoT and the Ministry of Home Affairs have not conducted any study to assess the impact of internet shutdowns.**"
- **Tier T4** (third-party summary). **Nothing in §3 is sourced to PRS.** Every quotation in §3.1–§3.8 is from the retrieved report PDF itself. PRS is recorded here as a corroborating read, not as authority. PRS also notes it summarises but does not reproduce the report.

## 4. What could NOT be established

Listed exhaustively. Each entry says what was tried.

### 4.1 ❌ The DoT / Pemmasani Chandra Sekhar March 2025 reply — **NOT RETRIEVED. RELAYED ONLY. T4.**

**What was tried:**
- `dot.gov.in` CMS API (reachable after the DNS fix, §0.1a), queried at
  `https://dot.gov.in/cms/wp-json/wp/v2/search?search=<terms>&per_page=20&subtype=documents` for `internet shutdown`, `internet suspension`, `suspension of telecom` — HTTP 200 in each case. **Zero parliamentary answers.** The only matching documents are the Rules themselves (see §4.5).
- `https://dot.gov.in/cms/wp-json/wp/v2/media?search=<terms>&per_page=30` for `shutdown`, `internet suspension`, `suspension`, `lok sabha internet` — HTTP 200; **0, 0, 2 and 0 rows.** The two hits are the 2017 and 2024 Rules.
- `sansad.in` — reachable (§0.1a) but its questions data is served by a protected backend. `https://sansad.in/api_ls/questions` returns **HTTP 403 `{"error":"Forbidden"}`**, with and without `Referer`/`Accept` headers. Sibling routes (`/api_ls/question/questionSearch`, `/ls/api/questions`, `/api/questions`, `/apiservice/questions`) return 404. The rendered page is a Next.js shell with no data and no API path in `__NEXT_DATA__` or the 38 JS chunks downloaded and grepped.
- The `getFile/loksabhaquestions/annex/<session>/AU<n>.pdf?source=pqals` route **works** and was mapped by probing sessions 1–30, but it resolves only to **16th Lok Sabha** sessions (session 6 = Dec 2015, 11 = Feb 2017, 17 = Feb 2019). No session index reaching March 2025 was found.
- Browser automation was attempted and **failed**: the Playwright backend uses the system resolver, which is the very resolver that SERVFAILs on `sansad.in` (§0.1a). `net::ERR_NAME_NOT_RESOLVED`. The `--resolve` workaround is available to curl but not to the browser tool.

**What is known, and its tier.** A web search returned a report by *The Week* (13 March 2025) stating that Minister of State for Communications Dr. Pemmasani Chandra Sekhar told Parliament on 12 March 2025 that DoT has conducted no assessment of the economic and social impact of internet shutdowns, that he did not answer a question on the number and details of shutdown orders issued between January 2023 and January 2025, and that DoT "does not centrally maintain" details of suspension orders issued by States and UTs.

> **⚠️ THIS PROCESS DID NOT RETRIEVE THE UNDERLYING REPLY AND DOES NOT QUOTE IT.** The account above is a **press characterisation**, not the document. The question number, the House, the member who asked, the exact subject heading and the exact wording are all **UNKNOWN to this process**. **Tier T4 (RELAYED).** Do not render this as a parliamentary quotation downstream, and do not attribute any words to the Minister on this basis.

**Bearing on the phase.** If retrieved, this would be a 2025 restatement of the §3.1 position and would show the absence persisting three-plus years after the Standing Committee criticised it — valuable, but **confirmatory rather than novel**. The proposition it would support is already established at **T1** twice over by §1.4 (RS 1791, March 2021) and §3.1 (SC 26th Report, December 2021). **The phase does not depend on it.** Flagged as a clean follow-up for a process whose browser can resolve `sansad.in`.

### 4.2 ❌ Ministry of Communications / DoT parliamentary answers generally — structurally out of reach here

The MHA mirror at `www.mha.gov.in` carries **only MHA's own replies**. There is no equivalent DoT mirror: the DoT CMS publishes rules, notifications and press items, not Q&A. **Every DoT parliamentary answer on internet shutdowns is therefore outside the 3,447-document corpus swept in §2**, and the negatives in §2 must **not** be read as covering the Ministry of Communications. **§2's negatives are MHA-only. State that limitation wherever they are used.**

### 4.3 ❌ The August 2019 orders themselves; and the J&K published series

- **Not inspected.** `jkhome.nic.in` — the host the Union told Parliament the orders are published on (§1.3) — **has no A record on 1.1.1.1**. This process therefore could not verify the Union's publication claim, could not count the published orders, and could not check whether the August–December 2019 orders are among them.
- A sibling reports NXDOMAIN across three resolvers and reads the host as gone. **This process confirmed only the 1.1.1.1 leg and does not adopt that conclusion** (§0.1a). If true it would be significant — the Union's 2022 assurance pointing at a host that no longer exists — but it must be established by the process that ran those queries.
- The *Anuradha Bhasin* production history and the IFF RTI refusals are **RELAYED from a sibling and not retrieved here** (§1.3 scope correction). **T4 from this process.**

### 4.4 ❌ Review Committee operation — no evidence found either way

Not established by anything retrieved: whether a Review Committee was constituted for the UT of J&K; how many times any Review Committee has met; whether any Review Committee has ever recorded a finding that a suspension order was **not** in accordance with s. 5(2); and whether any Review Committee finding has ever been published. §3.5 establishes only that as of December 2021 **DoT did not know where these committees existed** and MHA said it was DoT's question; §2.4 establishes that **MHA has never mentioned the body in 3,447 parliamentary answers.** Those are findings about the *absence of oversight information*, not about the oversight itself.

### 4.5 Incidental finding — a superseding instrument, flagged not analysed  **[RETRIEVED / T1]**

The DoT media API returned two rule documents, both fetched as live `source_url` PDFs:
- `https://www.dot.gov.in/static/uploads/2025/07/b3988f93980e465b7bac089ecec336ee.pdf` — "Temporary Suspension of Services Rules 2017"
- `https://www.dot.gov.in/static/uploads/2025/07/317156a5e7caccda619ab1a589213347.pdf` — "**Telecommunications-Temporary Suspension of Services Rules, 2024**"

**The 2024 Rules were not on this part's radar and are not analysed here.** Their existence matters: the entire §3 record concerns the **2017** Rules as amended in 2020, and the Standing Committee's recommendations were directed at those. If the 2024 Rules replaced them, the question "was the December 2021 absence ever remedied?" has a possible answer sitting in a document this part did not read. **Flagged for the phase; deliberately not characterised, since it was not read.**

### 4.6 Open items, stated plainly

- The **duration** of the August 2019 suspension is **not stated in any retrieved government document.** Restoration milestones are (24.01.2020 fixed line + 2G; 04.03.2020 social media; 16.08.2020 high-speed in two districts; 05.02.2021 4G UT-wide) — but no document gives a start date, a total, or a day count. Any duration figure downstream is **derived**, and must be labelled derived.
- **No count of J&K suspension orders exists in any Union document retrieved.** The only count anywhere is the **UT's own self-reported 93** (§3.4), whose closing date is not stated in the report and is therefore **unknown**.
- **No economic-loss figure** is accepted or rejected by government in any retrieved document.

## 5. Model that served this child

**claude-opus-5** — as instructed. Reasoning and retrieval were performed by Opus 5 throughout; no delegation to another model or subagent occurred, and the WebFetch tool's internal summarising model was used only once (on the PRS page, §3.10), whose output was then **replaced** by a raw `curl` + HTML-strip of the same page so that no quotation in this file passes through a summariser.

### 5.1 Summary of what this part establishes

| # | Finding | Source | Tier |
|---|---|---|---|
| 1 | "Centralized data of internet shutdown is not maintained by the Ministry of Home affairs" | RS 1791, 10.03.2021 (§1.4) | **T1 RETRIEVED** |
| 2 | Neither DoT nor MHA maintains any record of State/UT shutdown orders; reason = police and public order are State subjects | SC 26th Report paras 22–25 (§3.1) | **T1 RETRIEVED** |
| 3 | No impact assessment by DoT or MHA; no study of the shutdown–riot link | SC 26th Report (§3.6) | **T1 RETRIEVED** |
| 4 | DoT does not know whether Review Committees exist in all States/UTs; MHA says it is DoT's question | SC 26th Report paras 50–51 (§3.5) | **T1 RETRIEVED** |
| 5 | MHA: internet suspension is outside NCRB's ambit; "no proposal in MHA at least to collect this information at a central level" | SC 26th Report para 26 (§3.3) | **T1 RETRIEVED** |
| 6 | J&K suspension orders are published on the J&K government website (post-*Bhasin* series) | RS 1182, 27.07.2022 (§1.3) | **T1 RETRIEVED** |
| 7 | Asked directly whether it holds the J&K shutdown count, the Union answered neither yes nor no | RS 1182, 27.07.2022 (§1.3) | **T1 RETRIEVED** |
| 8 | UT of J&K self-reported 93 orders (incl. 76 confirmatory) since *Bhasin*; unverified by the Committee | SC 26th Report para 27 (§3.4) | **T1 doc / UT-produced figure** |
| 9 | Economic-loss questions answered with "no specific report received from the Government of Jammu and Kashmir" | RS 1034, 27.11.2019; LS 2470, 03.12.2019 (§1.7, §1.5) | **T1 RETRIEVED** |
| 10 | Restoration dates: 24.01.2020, 04.03.2020, 16.08.2020, 05.02.2021 | LS 1440, LS 1405, RS 1012 (§1.1, §1.2, §1.6) | **T1 RETRIEVED** |
| 11 | Winter Session 2019: no question asked the extent of the blackout, in 369 MHA answers | §2.2 | **T1 negative** |
| 12 | *Anuradha Bhasin* is named exactly once in 3,447 MHA answers, 2019–2026 | §2.3 | **T1 negative** |
| 13 | The Rule-5 Review Committee is never mentioned in 3,447 MHA answers | §2.4 | **T1 negative** |
| 14 | DoT March 2025 statement | press account only (§4.1) | **T4 RELAYED — do not quote** |

**The single most important correction this part makes to the corpus:** P-54's "no official series" claim now has a retrieved T1 primary source — in fact two (§1.4 and §3.1) — and the absence is more precisely characterised than "no series published". **No record is kept at all, at either Union ministry, by their own admission, because the phenomenon was defined outside the national statistical apparatus and no proposal exists to bring it in.** That is `not-collected`, not `not-published` and not `withheld` — for the all-India series. For J&K specifically the post-*Bhasin* orders **are** published, which narrows the J&K absence to the 2019 orders and the derived count.

**STATUS: COMPLETE.**

---

# 6. CLOSED BY THE ORCHESTRATOR — 2026-08-03

**Status header at line 2 says `IN PROGRESS`. It is superseded by this section: the file is COMPLETE.**
Sections 0–5 are all written and closed, including §4 ("What could NOT be established"), whose absence
would have made every negative in this part untrustworthy.

**⚠ CORRECTION TO THIS SECTION AS FIRST WRITTEN — the error was mine and it is instructive.**
I appended §6 asserting that the child had *died before writing §5* and that its model was
*NOT CONFIRMED*. **Both were false.** I had polled the file's checksum and found it byte-identical
across twelve consecutive five-second reads, and concluded from sixty seconds of quiet that the author
was gone. It was not — it was between writes, and it went on to complete §5 in full. The append raced
a live writer.

**No damage resulted** (§5 landed intact, §6 followed it, nothing duplicated or truncated) — but that
is luck, not method. **Quiescence is not completion.** A file is finished when its author says so or
when the author is confirmed dead, and a checksum that has not changed for a minute establishes
neither. This is the same error shape as the stale-assembly trap the spec already names, one level
down: I read a *snapshot* as a *state*.

**Model: `claude-opus-5`, self-reported in §5**, with the useful detail that the fetch tool's internal
summarising model touched one page and its output was then replaced by a raw retrieval of the same
page, so no quotation here passes through a summariser. Still a self-report and not a transcript
reading — recorded at that strength, as the spec requires.

**The one thing in this file that outranks its own subject** — §2.1, and it belongs in the method
record, not only here:

> The first sweep of MHA's question corpus matched only double-quoted `href="…"`. **MHA's 2019 date
> pages emit single-quoted `href='…'`.** The pass returned 1,711 URLs and **silently omitted 1,862
> more — the entirety of Winter Session 2019**, the most important session for this phase. Every page
> fetched HTTP 200 and the corpus looked complete. It was caught only by asking why a session known to
> have sat had produced zero files. **§1.4 (RS 1791, the T1 "centralized data … is not maintained"
> reply) and §1.5/§1.7 (the economic-loss refusals) were all in the missed batch.**

Had it not been caught, this part would have reported "no Winter 2019 questions on the blackout"
**while never having searched Winter 2019 at all** — a false negative indistinguishable from a true
one, and it would have hardened into a `not-collected` absence in a record.

**The rule that follows: a negative result is worth exactly what the sweep behind it is worth, and a
sweep is not verified by its HTTP status codes.** Verify a corpus against a known-present item before
reporting anything absent from it.
