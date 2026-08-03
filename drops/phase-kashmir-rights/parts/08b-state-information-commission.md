# 08b — The J&K State Information Commission: the institution that stopped existing

**Model that served this research agent: claude-opus-5 (Opus 5).**

Research sub-agent for phase 12 (kashmir-rights). Every document below is graded
**RETRIEVED** (I fetched it myself; exact URL and HTTP status given) or
**RELAYED** (I know it only through another document quoting or describing it).
No URL appears here that I did not fetch.

Absences are classified with exactly four values: `not-collected`, `not-published`,
`withheld`, `never-defined`.

---

## Status: COMPLETE — research run finished 3 August 2026.

Headline: the winding-up order **was** retrieved (Government Order No. 1144-GAD of 2019,
dated 23.10.2019) and it says **nothing whatever about pending appeals and complaints**.
The pendency figure for 31 October 2019 does not exist in any document I could reach.
Host `jksic.nic.in`, `jkshrc.nic.in` and `jkhome.nic.in` all fail DNS resolution
(curl error 6, Cloudflare DoH) as tested in this run.

## 1. The winding-up order — RETRIEVED

**Government Order No. 1144-GAD of 2019, dated 23.10.2019**, Government of Jammu and
Kashmir, General Administration Department, Civil Secretariat, Srinagar. File No.
GAD(Adm)43/2019-III. Signed Sd/- (Dr. Farooq Ahmad Lone), IAS, Secretary to the
Government; attested (Girdhari Lal) KAS, Deputy Secretary.

**RETRIEVED.** URL: `https://jkgad.nic.in/common/showOrder.aspx?actCode=O33004` —
HTTP 200, `application/pdf`, 6 pages, PDF internal CreationDate **Wed Oct 23 15:12:15
2019 +04**. Page 1 carries no text layer (scanned image, Acrobat "Paper Capture"); I
rendered page 1 to PNG at 200 dpi and read the image directly. Pages 2–6 have an OCR
text layer which I extracted with `pdftotext -layout`.

### Operative words, verbatim (page 1)

> Subject: Winding up of Jammu and Kashmir State Information Commission constituted
> under the Jammu and Kashmir Right to Information Act, 2009 repealed in terms of
> Jammu & Kashmir Reorganization Act, 2019.
>
> **Government Order No. 1144-GAD of 2019**
> **Dated: 23.10.2019**
>
> Consequent upon repeal of the Jammu and Kashmir Right to Information Act, 2009 by
> the Jammu and Kashmir Reorganization Act, 2019, sanction is hereby accorded to the
> winding up of Jammu and Kashmir State Information Commission with effect from
> **31-10-2019** i.e. the appointed date for the formation of the Union Territory of
> Jammu and Kashmir and Union Territory of Ladakh.
>
> It is further ordered that:-
>
> (i) The State Information Commissioner of the Jammu and Kashmir State Information
> Commission shall cease to hold office **w.e.f. 31.10.2019**.
>
> (ii) All the staff posted in the Jammu and Kashmir State Information Commission
> drawn from various Departments shown in **Annexure-A** to this order shall report to
> the concerned Administrative Departments **by 30.10.2019**.
>
> (iii) The staff posted/deployed in the Jammu and Kashmir State Information
> Commission by the General Administration Department drawn from various
> Corporations/PSUs/Organizations shown in **Annexure-B** to this order is repatriated
> to their respective Corporations/PSUs/Organizations with immediate effect.

Continuing on page 2:

> (iv) The vehicles allotted to or purchased for the Jammu and Kashmir State
> Information Commission from time to time shall be handed over to the Director, State
> Motor Garages Department.
>
> (v) Secretary, Jammu and Kashmir State Information Commission shall handover
> building(s) housing the Commission alongwith furniture and electronic gadgets to the
> Director Estates, J&K Government.
>
> (vi) Secretary, Jammu and Kashmir State Information Commission shall transfer all
> records pertaining to the Commission to the General Administration Department for
> record.
>
> By order of the Government of Jammu and Kashmir.

That is the entire operative content. Annexure-A lists **23** named officers/officials
(Secretary, Registrar-level, private secretaries, section officers, assistants,
jamadar; parent departments General Administration, Law/Justice/Parliamentary Affairs,
Finance). Annexure-B lists **26** named staff repatriated to Corporations/PSUs (J&K
Industries Ltd, J&K Agro Industries Development Corporation, Handloom Development
Corporation, J&K Cements, J&K Cooperative Supply and Marketing Federation). Row-count
is my own count off a degraded scan of a broken table and should be treated as
approximate, not as a figure the order states.

### What the order does NOT say

The order contains **no clause about pending appeals or complaints**. It disposes of
the Commissioner (ceases to hold office), the staff (report back / repatriated), the
vehicles (State Motor Garages), the buildings, furniture and electronic gadgets
(Director Estates), and "all records pertaining to the Commission" (to GAD "for
record"). Six clauses, and case files appear only as clause (vi) — as *records*, sent
to an administrative department for storage, not as live proceedings transferred to a
successor forum. Nothing in the order names a body that inherits the jurisdiction; the
words "second appeal", "complaint", "pending", "transfer to the Central Information
Commission" do not occur anywhere in the document.

### How I found it (the repository has no working search)

`https://jkgad.nic.in/En/SearchOrder.aspx` (HTTP 200) exposes a real search form
(type radio, subject keyword, subject category, date-from/date-to). **Every POST to
it is rejected by an NIC web application firewall** with an HTML page headed
"Unauthorized Request Blocked" (HTTP 200, 4,905 bytes) — I tried it with correct
`__VIEWSTATE`/`__VIEWSTATEGENERATOR`, session cookie, browser UA, Referer, Origin,
Accept and Accept-Language headers, on both `SearchOrder.aspx` and the paginated
`OrderCirculer.aspx` grid. Same block every time. `ArchiveOrders.aspx` (year dropdown
1959–2026) is likewise postback-driven and therefore equally unusable.

So the browse and search interfaces are, for an outside retriever, decorative. GET on
`showOrder.aspx?actCode=O#####` does work. I sampled the numeric ID space until I
bracketed October 2019 (O33000 = Government Order No. 1133-GAD of 2019, dated
22-10-2019), then swept IDs O32950–O33150 and read the first lines of every PDF. That
found the whole cluster:

| actCode | Subject (RETRIEVED, HTTP 200) |
|---|---|
| O33003 | Winding up of J&K State Human Rights Commission |
| **O33004** | **Winding up of J&K State Information Commission — Order 1144-GAD of 2019** |
| O33005 | Winding up of J&K State Consumer Disputes Redressal Commission |
| O33006 | Winding up of J&K State Electricity Regulatory Commission |
| O33007 | Winding up of J&K State Commission for Persons with Disabilities |
| O33008 | Winding up of J&K State Commission for Protection of Women & Child Rights |
| O33009 | Winding up of J&K State Accountability Commission |
| O33024 | Winding up of J&K District Consumer Forums (Food, Civil Supplies & Consumer Affairs Dept) |

Seven commissions plus the district consumer forums, consecutive order numbers, one
afternoon. The SIC was the second file in the stack.

## 2. The pending appeals and complaints

### 2.1 What the transition documents said — RELAYED, not retrieved

Press Trust of India report carried by Kashmir Observer, **"All Appeals, Complaints
Pending Under RTI In JK To Be Dealt By CIC: Govt", 2 December 2019** — **RETRIEVED**,
`https://kashmirobserver.net/2019/12/02/all-appeals-complaints-pending-under-rti-in-jk-to-be-dealt-by-cic-govt/`,
HTTP 200, 186,542 bytes. The PTI copy states, on documents obtained under RTI by
transparency activist **Venkatesh Nayak** of the Commonwealth Human Rights Initiative:

- the **Union Ministry of Personnel wrote to the CIC on 15 October 2019** setting out
  the steps for transition from the J&K RTI Act 2009 to the central RTI Act 2005, and
  that "All appeals and complaints pending before the JK Information Commission were to
  be transferred to the CIC, according to the Personnel Ministry action plan";
- the **CIC in its meeting held on 25 October 2019** agreed to the Ministry's
  suggestions and recommended that "due seniority be given to second
  appeals/complaints pending with the Jammu and Kashmir State Information Commission";
- the **J&K GAD on 29 October 2019 formed a five-member committee** under the
  administrative secretary, GAD, to examine whether the UT would come under the CIC or
  need a separate commission.

**These three documents are RELAYED, not retrieved.** I hold none of them. The DoPT
letter of 15.10.2019 and the CIC's minutes of 25.10.2019 exist only in this reporter's
description of copies Nayak obtained under RTI. The GAD committee order of 29.10.2019
I searched for directly in the jkgad.nic.in order repository and did not find: actCodes
O33032–O33048 and O33051–O33177 return the repository's "Sorry" page (HTTP 200, 1,579
bytes of HTML, not a PDF), and the surrounding orders that do exist for 29.10.2019
(e.g. O33022, Establishment of Winter Secretariat, Order 1178-GAD of 2019 dated
29-10-2019) are not it. The repository is sparse; large blocks of consecutive IDs are
simply absent.

**Nothing in the winding-up order itself (1144-GAD, retrieved above) mentions the
transfer.** The transfer, if it happened, happened in correspondence between Delhi and
the Commission — not in the instrument that abolished the forum.

### 2.2 How many were pending — no figure I can stand behind

PTI's own words are "**A large number of applications and appeals filed under the
Jammu and Kashmir Right to Information Act, 2009, would have been pending on the date
of bifurcation**" — a conditional, not a count. I could not retrieve any document
stating a number of second appeals and complaints pending before the J&K SIC on
31 October 2019.

What would have carried such a number, and what became of it:

- The **J&K SIC's own annual report** and its case registers. Under s.16 of the J&K RTI
  Act 2009 the Commission reported annually to the State Government. Those registers
  are precisely what Government Order 1144-GAD clause (vi) sent to the General
  Administration Department "for record". Nobody has been under a duty to publish them
  since.
- The SIC's own website, **jksic.nic.in**, is dead: **NXDOMAIN**, confirmed in this run
  (no A record; curl with DNS-over-HTTPS to Cloudflare resolves nothing). The
  institution's published record went with the institution.

I therefore record the pendency figure as an absence, classified below.
### 2.3 The one number that exists is a current one, not a 2019 one

**Some 600 second appeals from J&K pending at the CIC, on the CIC Secretary's own
figure — RELAYED.** The Wire, "High Court Puts J&K Administration on Notice Over
Pending RTI Appeals", Jehangir Ali — **RETRIEVED**,
`https://m.thewire.in/article/law/high-court-puts-jk-administration-on-notice-over-pending-rti-appeals`,
HTTP 200, 123,838 bytes. It reports:

> Some 600 second appeals under the RTI Act related to Jammu and Kashmir are pending in
> the Central Information Commission (CIC), Rashmi Chowdhary, secretary CIC noted in a
> letter to Jammu and Kashmir chief secretary Atal Dulloo on January 12.

Whose figure: **the Secretary of the Central Information Commission**, in a letter to
the J&K Chief Secretary. The letter is dated 12 January (the hearing it precedes is
before a division bench of Chief Justice Arun Palli and Justice Rajnesh Oswal on
Tuesday 10 February — 10 February falls on a Tuesday in 2026, so the letter is
12 January 2026). **The letter is RELAYED. I did not retrieve it; The Wire says a copy
is with them.** It is a live-pendency figure at the CIC in 2026, not a count of what
the SIC held in 2019.

### 2.4 The litigation — *Junaid Javid v. Union of India*

A PIL by **Junaid Javid**, a resident of Uri, Baramulla, sought a mandamus directing
the CIC to decide pending second appeals, particularly those from J&K residents, within
45 days. Disposed of by a Division Bench of **Acting Chief Justice Sanjeev Kumar and
Justice Mohd Yousuf Wani** of the High Court of Jammu & Kashmir and Ladakh, reported
early July 2026: the Court declined to fix a 45-day timeline because the RTI Act
prescribes none for second appeals, but held the CIC "cannot sit over the appeals for
an unduly long period and keep them undecided for years together" and directed it to
improve its mechanism for clearing pendency. The CIC's own response to the Court cited
infrastructural limitations and the volume of appeals.

**The judgment itself is NOT retrieved.** Reports RETRIEVED:
- `https://www.barandbench.com/news/cic-cannot-keep-rti-appeals-pending-for-years-must-improve-its-functioning-jk-high-court` — HTTP 200 (Bar & Bench, 7 July 2026)
- `https://kashmirobserver.net/2026/07/04/hc-refuses-45-day-deadline-for-cic-appeals/` — HTTP 200 (Kashmir Observer, 4 July 2026)
- `https://www.etvbharat.com/en/!state/rti-appeals-from-jammu-and-kashmir-face-long-delays-at-central-information-commission-enn25071104373` — HTTP 200

I tried to retrieve the order text from **indiankanoon.org** and got **HTTP 403** on
both the search endpoint and individual document pages, via curl and via WebFetch. The
LiveLaw page fetched (HTTP 200, 788 KB) but its article body is behind a JS loader and
yielded no extractable text.

---

## 3. Where a J&K second appeal goes now

### 3.1 The instrument, verbatim

**RETRIEVED:** the RTI Act 2005 as published by the Central Information Commission,
`https://cic.gov.in/sites/default/files/RTI_English.pdf` — HTTP 200, 355,456 bytes,
`application/pdf`, 25 pages, bare text layer, extracted with `pdftotext -layout`. Its
footnote to s.1(2) records the J&K amendment itself: "The words 'except the State of
Jammu and Kashmir' omitted by Act 34 of 2019, s. 95 and the Fifth Schedule
(w.e.f. 31-10-2019)."

**Section 2(a):**

> (a) "appropriate Government" means in relation to a public authority which is
> established, constituted, owned, controlled or substantially financed by funds
> provided directly or indirectly—
>   (i) by the Central Government or the Union territory administration, the Central
>   Government;
>   (ii) by the State Government, the State Government;

**Section 19(3):**

> (3) A second appeal against the decision under sub-section (1) shall lie within ninety
> days from the date on which the decision should have been made or was actually
> received, with the Central Information Commission or the State Information
> Commission:
>
> Provided that the Central Information Commission or the State Information Commission,
> as the case may be, may admit the appeal after the expiry of the period of ninety days
> if it is satisfied that the appellant was prevented by sufficient cause from filing the
> appeal in time.

**Section 15(1)**, for completeness, is the reason there is no other option:

> 15. Constitution of State Information Commission.—(1) Every State Government shall, by
> notification in the Official Gazette, constitute a body to be known as the .........
> (name of the State) Information Commission…

**One line:** because s.2(a)(i) makes the **Central Government** the "appropriate
Government" for a public authority financed by a **Union territory administration**,
and only a *State* Government can constitute a State Information Commission under
s.15(1), every J&K public authority became a central-appropriate-Government authority
on 31 October 2019 and the only forum s.19(3) leaves open for its second appeals is the
Central Information Commission in New Delhi.

### 3.2 The empirical test — CIC decisions against J&K, RETRIEVED

The CIC's decision index is searchable by GET (unlike the J&K order repository) at
`https://dsscic.nic.in/cause-list-report-web/view-decision-all/1`. J&K public
authorities are registered under the code **UTOJK**, and every one of them appears under
the single public-authority name "**UT of Jammu and Kashmir**".

**Query RETRIEVED** (HTTP 200): `public_authority=Jammu`, `frdate=01/11/2019`,
`todate=31/12/2020`, `page_length=100` → "Showing 1 of 3 Pages of **224 Records**".
Sorted by order date, the earliest UTOJK decisions in that window are all dated
**15/05/2020**, uploaded 18–19 May 2020. Concrete instances from the CIC's own index:

| File No. | Appellant | Public Authority | Information Commissioner | Order date |
|---|---|---|---|---|
| **CIC/UTOJK/A/2020/160730** | Chanchal Yogi | UT of Jammu and Kashmir | Divya Prakash Sinha | **15/05/2020** |
| CIC/UTOJK/A/2020/110011 | Vipan Sharma | UT of Jammu and Kashmir | Divya Prakash Sinha | 15/05/2020 |
| CIC/UTOJK/C/2020/160860 | Vipan Sharma | UT of Jammu and Kashmir | Divya Prakash Sinha | 15/05/2020 |
| CIC/UTOJK/A/2020/154970 | Showkat Ali Batt | UT of Jammu and Kashmir | Divya Prakash Sinha | 15/05/2020 |

That answers the question asked: yes, J&K second appeals are decided by the CIC after
31 October 2019, and here are file numbers and dates.

It also produces a second finding I did not expect. **A repeat query bounded
`frdate=01/11/2019&todate=14/05/2020` returns "Showing 1 of 1 Pages of 0 Records."**
On the Commission's own index there is **no decision at all against a Jammu and Kashmir
UT public authority for the six and a half months between the abolition of the SIC on
31 October 2019 and 15 May 2020.** (Decisions in that window against *central* bodies
that happen to sit in Jammu — Central University of Jammu, IIT Jammu — do exist and are
not J&K UT authorities.) A single instrument closed one forum on 31 October 2019 and
the forum that inherited its work issued its first J&K decision on 15 May 2020.

### 3.3 What I could not retrieve: the decision PDFs themselves

The CIC index rows carry a "View PDF" button which is a **POST** to
`https://dsscic.nic.in/cause-list-report-web/download` with a CSRF token and a
base64-encoded filename. I reproduced the POST exactly (correct `_csrfToken`, correct
`filename=Q2hhbmNoYWxfWW9naV8xNjA3MzAucGRm` = `Chanchal_Yogi_160730.pdf`, session
cookie, Referer). It returns **HTTP 200 with an HTML page reading: "The application is
currently in migration mode. Any change in the application is not allowed."** Direct
GETs at `/files/upload_decision/`, `/files/decisions/` and
`/cause-list-report-web/files/upload_decision/` all return HTTP 404, including for a
non-J&K decision filename that a search engine had indexed. A Wayback CDX query for
archived `dsscic.nic.in` URLs matching `UTOJK` returned zero rows (HTTP 200, empty).

So: **as of this run the Central Information Commission's decision index is public and
its decision documents are not downloadable.** I hold the index rows, not the orders.

The nearest I got to a full J&K decision text is a third-party reproduction:
`https://www.casemine.com/judgement/in/63b7488a614ef961802515a7` — **RETRIEVED**,
HTTP 200, 337,082 bytes — carrying *Bansi Lal Balwal v. UT of Jammu and Kashmir*,
Case No. **CIC/UTOJK/A/2021/140517** (clubbed with CIC/UTOJK/A/2021/148016 and
CIC/UTOJK/A/2021/126121), date of hearing 04.01.2023, decided 5 January 2023, Chief
Information Commissioner **Shri Y. K. Sinha**, appeals against the CPIO/Sr. Programmer,
**Jammu and Kashmir Housing Board**. This is a **reproduction**, not the Commission's
own PDF, and I grade it as such.

---

## 4. Does the CIC publish its caseload by State/UT?

**Short answer: no. The Commission's own appeal-and-complaint figures are published as
three all-India totals and are not broken down by State or Union Territory anywhere in
the annual report.**

### 4.1 The annual reports, and the lag

**RETRIEVED**, index page `https://cic.gov.in/circular-reports-conventions` (HTTP 200),
and the English annual reports themselves, all HTTP 200 `application/pdf` from
`https://cic.gov.in/sites/default/files/Reports/AR<year>E.pdf`:

| Year | Bytes | Pages | Text layer |
|---|---|---|---|
| 2018-19 | 28,567,514 | 222 | yes |
| 2019-20 | 23,099,985 | 242 | yes |
| 2020-21 | 60,941,762 | 302 | yes |
| 2021-22 | 13,461,786 | 260 | yes |
| 2022-23 | 28,799,446 | 258 | yes |
| 2023-24 | 29,114,596 | 274 | yes |
| **2024-25** | 47,979,147 | 274 | **none — image-only scan** |

(The web page's stated file sizes — "305.91 KB" for four consecutive years — are wrong;
the files are tens of megabytes and all seven have distinct MD5s. I checked.)

**Most recent year available: 2024-25**, i.e. the year ending 31 March 2025, published
and online as of 3 August 2026. So the CIC's published caseload runs roughly **12–16
months behind**. The 2024-25 report carries **no text layer at all**: it is a scanned
image of a printed book, so it is not searchable, not machine-readable, and not
accessible to a screen reader. I read the pages I needed by rendering them to PNG at
130–150 dpi and reading the images.

### 4.2 The Commission's own caseload: three national numbers

AR 2023-24, §3.2.2 — **RETRIEVED**, verbatim:

> Number of Second Appeals/Complaints Registered during reporting year — **20361**
> Number of Second Appeals/Complaints disposed during reporting year — **16790**
> Number of Second Appeals/Complaints pending for disposal as on 1st April 2024 — **23078**

That is the whole of it. No table anywhere in the report distributes those 20,361
registrations, 16,790 disposals or 23,078 pending cases across States, Union
Territories, or even Ministries. §3.2.1 says the workflow system generates
"expandable hyperlink for details of the cases in all four categories" with "file
number, name of appellant/complainant, PA, date of registration, date of hearing and
the date of disposal … against each Information Commissioner" — so the underlying
records are per-case and per-PA, and the published aggregation deliberately is not.

**The one place a per-entity second-appeal count appears** is Table 2.7, "Number of RTI
Requests, First Appeals and Second Appeals/Complaints received in top 20
Ministries/Departments/Independent PAs (**In terms of percentage of Requests
Rejected**)". "UT of Jammu and Kashmir" is not in that top 20 in 2023-24 — it is not a
high-rejection authority — so its second-appeal count is not printed. The selection rule
publishes the number only for entities that reject a lot.

**Finding: the CIC publishes no State/UT-wise breakdown of appeals and complaints. The
number of second appeals and complaints from Jammu and Kashmir is not a published
quantity in the CIC's annual report, in any year 2019-20 through 2024-25.** It is,
however, plainly *held*: the Commission's decision index is queryable by public
authority (see §3.2 — I ran the query and got 224 records for a 14-month window and
1,721 for the unbounded one), and the CIC Secretary was able to state a J&K pendency
figure of ~600 in a letter to the J&K Chief Secretary in January 2026.

---

## 5. Are RTI application numbers for J&K published — before and after?

### 5.1 Before: yes, up to 2013-14, and then the trail stops

The J&K State Information Commission published annual reports. Its website is now
**NXDOMAIN** (`jksic.nic.in` — no A record; confirmed this run), but the Internet
Archive holds the reports and I retrieved them.

**RETRIEVED:** `https://web.archive.org/web/20161119194148if_/http://jksic.nic.in/Annual%20Report%202013-14%20.pdf`
— HTTP 200, 2,446,045 bytes, `application/pdf`. Also retrieved: the 2012-13 report
(`.../20160730163314if_/http://jksic.nic.in/Annual%20Report%202012-13.pdf`, HTTP 200,
4,051,186 bytes, 61 pp.) and the combined 2009-12 report
(`.../20160730163246if_/http://jksic.nic.in/JKSIC%20ANNUAL%20REPORT%202009-12%20.pdf`,
HTTP 200, 3,070,133 bytes, 104 pp.).

The 2013-14 report's abstract table, verbatim (the Commission's own figures):

| Item | 2009-10 | 2010-11 | 2011-12 | 2012-13 | 2013-14 |
|---|---|---|---|---|---|
| No. of RTI requests received by Public Authorities | 741 | 3,110 | 12,136 | 27,619 | **29,846** |
| Percentage of rejection of requests | 9% | 4% | 1.37% | 1.54% | 2.76% |
| First appeals received by the FAAs | – | – | – | 1,279 | 1,877 |
| Complaints/2nd Appeals received by the Commission | 13 | 24 | 974 | 741 | **747** |
| Complaints/2nd Appeals decided by the Commission | 0 | 3 | 589 | 902 | 681 |
| Cases in which penalty imposed u/s 17 | 0 | 0 | 5 | 7 | 9 |

And its Table No. 3, the receipt/disposal/closing-balance series — the only published
pendency series the institution ever produced:

| Year | Opening balance | Received | Disposed | Closing balance |
|---|---|---|---|---|
| 2009-10 | – | 13 | – | 13 |
| 2010-11 | 13 | 24 | 3 | 34 |
| 2011-12 | 34 | 974 | 589 | 419 |
| 2012-13 | 419 | 741 | 902 | 258 − 124 defective = **134** |
| 2013-14 | 134 | 747 | 681 | 200 − 51 defective = **149** |

So the last publicly known pendency of the J&K State Information Commission is **149
complaints/second appeals as at 31 March 2014** — five and a half years before it was
abolished.

**After that, nothing.** The Commission's own "Annual Report" index page, as archived on
5 May 2015, lists reports through 2013-14. The last live capture of that index page
(via the homepage snapshot of **8 October 2019**) adds one more line — "Annual Report
2014-15, 2015-16, 2016-17" — pointing at a single file, `AR 2014-17 writeup.pdf`.
**That file was never archived** (a Wayback CDX query over the whole `jksic.nic.in`
domain returns no capture of it) and the host is dead, so I cannot retrieve it. No
report for 2017-18 or 2018-19 was ever listed at all.

**The Commission's website died with the Commission.** Wayback captures of
`http://jksic.nic.in/` return HTTP 200 on 8 October 2019 and **HTTP 404 from 7 November
2019 onward** — the first failed capture falls in the window that contains the appointed
day, 31 October 2019. (CDX, RETRIEVED: `…20191008040832 200`, `…20191107110131 404`,
and 404 continuously thereafter.)

### 5.2 After: yes, but only from 2023-24, and only as an aggregate

J&K public authorities appear in the CIC's annual report as one Ministry-equivalent
grouping, "UT of Jammu and Kashmir". What is published, by year (all figures the CIC's,
from the reports I retrieved above):

| CIC AR year | J&K in the report | RTI requests received | Rejected | PAs registered | PAs filing all four quarterly returns |
|---|---|---|---|---|---|
| 2018-19 | absent | — | — | — | — |
| **2019-20** | **absent entirely** | — | — | — | — |
| 2020-21 | present | not in any published table | — | 40 | **7 (17.50%)** |
| 2021-22 | present | not in any published table | — | 40 | **7 (17.50%)** |
| 2022-23 | present | not in any published table | — | 43 | **23 (53.49%)** |
| 2023-24 | Table 2.5, rank 18 | **15,296** | 416 (2.72%) | 43 | 43 (100%) |
| 2024-25 | Table 2.5, rank 15 | **19,210** | 634 (3.30%) | 43 | — (not checked; report is image-only) |

The 2023-24 and 2024-25 rows I read off the reports themselves — 2023-24 from the text
layer, 2024-25 by rendering PDF page 18 (printed page 13) to PNG and reading it, because
that report has no text layer.

Three things follow.

**One: the first full reporting year after the change, 2019-20, contains no Jammu and
Kashmir at all.** The reporting year 1 April 2019 – 31 March 2020 spans the appointed
day; the word "Jammu" appears in AR 2019-20 only for central bodies that happen to sit
there (IIT Jammu, CSIR-IIIM Jammu, SISI-Jammu, Registrar of Companies Jammu). The UT's
own public authorities were not yet registered with the Commission. There is no
published count of RTI applications made in Jammu and Kashmir for the year the RTI
regime changed.

**Two: for 2020-21 and 2021-22, seven out of forty J&K public authorities filed their
annual return** — 17.5%. For 2022-23, 23 of 43. Any J&K aggregate for those years, if
computed, would be built from under a fifth and then a half of the authorities. The
apparent jump to 15,296 requests in 2023-24 is at least partly the jump to 100% return
compliance, not a jump in citizen demand.

**Three: what is published per J&K department is requests and first appeals, never
second appeals.** Annexure-1 of AR 2023-24 (PDF page 184, printed page 178 — read as an
image) gives, department by department for the UT of J&K, the opening balance, requests
received, requests transferred, **first** appeals received and disposed, replies,
rejections, fees, and the count of CAPIOs/CPIOs/FAAs. Sample figures for 2023-24, from
that page: Rural Development 561 requests received, Revenue 3,170, Horticulture 258,
Youth Services and Sports 101, Public Works 18. There is **no row anywhere in the
annexure for second appeals or complaints filed with the CIC**. The number that measures
whether the abolition of the forum hurt anyone is the one number the annexure does not
carry.

---

## 6. Classification of the absences

Tests applied in order: `not-collected` (never gathered — compelled tomorrow, the holder
has nothing to produce); `not-published` (exists in a holder's hands, not released — the
test is producibility under compulsion); `withheld` (exists, release *specifically
requested* and refused — requester, request and date all three named, or it is
`not-published`); `never-defined` (no agreed definition, uncollectable in principle).

### 6.1 Number of appeals and complaints pending before the J&K SIC on 31 October 2019 — `not-published`

The Commission ran registries at Jammu, Srinagar and a central office, issued weekly
cause lists (the 2019-20 cause-list page, captured 22 August 2019, lists monthly cause
lists for April through August 2019 across three registries), and published a
receipt/disposal/closing-balance table in its annual reports. A pendency figure for
31 October 2019 was therefore computable from records that existed on that date, and
Government Order 1144-GAD clause (vi) directed those records to the General
Administration Department. The GAD can be compelled to produce them.

**Route:** an RTI application to the **General Administration Department, Government of
Jammu and Kashmir, Civil Secretariat** (the CPIO of GAD, which is itself now a public
authority under the central RTI Act and registered with the CIC), citing Government Order
No. 1144-GAD of 2019 dated 23.10.2019 clause (vi), asking for the SIC's institution and
disposal registers as they stood on 31.10.2019, and for the file GAD(Adm)43/2019-III.
Not a placeholder: the order names GAD as the custodian in its own operative text, and
GAD is a registered CIC public authority so the s.19(3) route is live.

Not `withheld`: I found no named requester who asked the GAD for this specific figure on
a specific date and was refused. (The nearest analogue is the SHRC, where an RTI reply
did produce the answer that the records are physically locked in a room — reported by
Deccan Herald, The Week and The Wire in February 2022. That is a different commission
and I have not retrieved those documents, so I do not carry it across.)

### 6.2 Number of second appeals and complaints from J&K pending at the CIC, by year — `not-published`

The CIC holds this at case level. Its public decision index is queryable by public
authority and returns J&K rows with file numbers and dates; its Secretary put a figure
(~600) in a letter to the J&K Chief Secretary in January 2026. It is simply not in the
annual report, which aggregates only to three national totals.

**Route:** an RTI application to the **CPIO, Central Information Commission, Baba Gangnath
Marg, Munirka, New Delhi**, for the number of second appeals and complaints registered,
disposed and pending against public authorities of the UT of Jammu and Kashmir (PA code
UTOJK), year by year since 31.10.2019 — the same cut the workflow system already
produces per Information Commissioner. Not a placeholder: the CIC's own workflow, as
described in AR 2023-24 §3.2.1, generates exactly these fields per case, and §3.2.2 shows
it already aggregates them.

### 6.3 Fate of each individual case pending before the SIC on 31 October 2019 — `not-published`

The DoPT action plan of 15.10.2019 and the CIC's decision of 25.10.2019 (both RELAYED)
say the pending cases were to be transferred to the CIC with "due seniority". Whether any
particular appeal was in fact re-registered, and under what number, is knowable only from
the CIC's registry and the transferred records. It is a producible fact, not published.

**Route:** the same two RTI applications as 6.1 and 6.2, asking specifically for the
transfer list — the schedule of cases moved from the J&K SIC to the CIC, with old and new
file numbers.

### 6.4 The DoPT letter of 15.10.2019 and the CIC minutes of 25.10.2019 — `not-published`

Both exist: a named activist obtained copies under the RTI Act and PTI quoted them in
December 2019. Neither is on `dopt.gov.in` or `cic.gov.in` as far as I could reach; the
CIC's own "Circulars and Office Orders" page (RETRIEVED, HTTP 200) does not carry them.
Producible under compulsion — they already have been produced once.

**Route:** RTI to the CPIO, DoPT (IR Division), North Block, New Delhi, for the
communication to the CIC dated 15.10.2019 on transition from the J&K RTI Act 2009 to the
RTI Act 2005 and all file notings; and to the CPIO, CIC, for the minutes of the
Commission's meeting of 25.10.2019.

### 6.5 The GAD committee order of 29.10.2019 — `not-published`

Reported by PTI: a five-member committee under the administrative secretary, GAD, to
examine whether the UT would come under the CIC. I could not find it in the jkgad.nic.in
repository (see §2.1 for exactly what I tried).

**Route:** RTI to the CPIO, GAD, for the order constituting the committee, its terms of
reference, and its report.

### 6.6 J&K SIC annual reports for 2014-15 to 2018-19 — `not-published` (and partly `not-collected`)

`not-published` for 2014-15 through 2016-17: the Commission's own website linked a file
called `AR 2014-17 writeup.pdf`, so a document existed; it is now unreachable and its
custodian is the GAD under clause (vi). Route: RTI to the CPIO, GAD.

`not-collected` for **2017-18 and 2018-19**: no such report was ever listed on the
Commission's site, right up to its last live capture on 8 October 2019, and the
Commission that would have written them ceased to exist on 31 October 2019. There is no
holder who could produce them tomorrow. The underlying quarterly returns from public
authorities may survive in the transferred records — that part is `not-published` — but
the report itself was never made.

### 6.7 RTI applications filed in J&K for 2019-20 — `not-collected`

The J&K SIC, which collected returns from J&K public authorities under the J&K RTI Act,
stopped existing four months into that reporting year. The CIC, which collects returns
from central public authorities, had not yet registered the UT's public authorities:
"UT of Jammu and Kashmir" does not appear in CIC AR 2019-20 at all. Neither body gathered
the year. Compelled tomorrow, neither has a return to produce for 1 April 2019 –
31 March 2020. This is a hole cut by the transition itself, not a withholding.

### 6.8 RTI applications filed in J&K for 2020-21, 2021-22, 2022-23 — `not-published`, on a partial base

The returns exist for the authorities that filed (7 of 40, 7 of 40, 23 of 43). The CIC
holds them — Annexure-1 of each report is built from them — but no aggregate for the UT
was printed in those years because J&K did not make the published top-20. Route: RTI to
the CPIO, CIC, for the UT-of-J&K ministry total from the online Annual Return database
for each year, which the system computes as a column already.

### 6.9 `withheld` — nothing qualifies

I could not satisfy the three-part test (named requester + specific request + date +
refusal) for any of the above. Where refusal-shaped facts exist in reporting, I do not
hold the underlying refusal documents, so I do not grade them `withheld`.

### 6.10 `never-defined` — nothing qualifies

Every quantity here has a settled definition in the RTI Acts themselves: an RTI request,
a first appeal, a second appeal, a complaint, a pending case. None of these absences is
an absence of definition. That matters: it means each one is a choice about publication,
not a conceptual impossibility.

---

## 7. What I could not establish

Exhaustively, with what I tried:

1. **The number of appeals and complaints pending before the J&K SIC on 31 October
   2019.** No document I retrieved states it. PTI's formulation — "A large number …
   would have been pending" — is the closest any retrieved source comes, and it is a
   conditional. The last published pendency of any kind is 149 as at 31 March 2014, from
   the Commission's own 2013-14 annual report.
2. **The DoPT letter of 15 October 2019.** Known only through PTI's description of a copy
   obtained under RTI by Venkatesh Nayak. Not on cic.gov.in's circulars page (retrieved);
   not found by search on dopt.gov.in.
3. **The CIC's meeting minutes of 25 October 2019.** Same status. RELAYED only.
4. **The J&K GAD order of 29 October 2019 constituting the five-member committee.** Not
   in the jkgad.nic.in repository at any actCode I could reach: O33032–O33048 and
   O33051–O33177 all return the repository's "Sorry" HTML page (HTTP 200, 1,579 bytes),
   and the surrounding real orders for that date are other subjects. The repository's
   own search and browse interfaces are POST-only and every POST is blocked by an NIC WAF
   ("Unauthorized Request Blocked", HTTP 200, 4,905 bytes) — tried with correct
   VIEWSTATE, session cookie, browser UA, Referer, Origin, Accept, Accept-Language on
   both SearchOrder.aspx and OrderCirculer.aspx.
5. **The text of the J&K High Court judgment in *Junaid Javid v. Union of India*.**
   indiankanoon.org returns **HTTP 403** to both curl and WebFetch, on the search
   endpoint and on document pages. I have the holding only through four news reports,
   all retrieved.
6. **The letter of the CIC Secretary Rashmi Chowdhary to Chief Secretary Atal Dulloo
   dated 12 January (2026) stating ~600 pending J&K second appeals.** RELAYED via The
   Wire, which holds a copy. Not retrieved.
7. **Any CIC decision PDF.** The Commission's decision index is public and I queried it
   successfully; the documents behind it are not downloadable — the download endpoint
   answers "The application is currently in migration mode. Any change in the application
   is not allowed" (HTTP 200), and every direct-path guess returns HTTP 404. Wayback holds
   no archived UTOJK decision PDF (CDX query returned zero rows). I have file numbers,
   parties, commissioners and dates from the index; I do not have a single order as the
   CIC published it.
8. **J&K SIC annual reports for 2014-15 onward.** `AR 2014-17 writeup.pdf` was linked from
   the Commission's site as late as 8 October 2019 but was never archived; the host is
   NXDOMAIN.
9. **Any parliamentary reply putting a number on J&K RTI pendency.** I searched for one
   and found none I could retrieve. I do not assert that none exists.
10. **The J&K-specific total of RTI requests for 2020-21, 2021-22 and 2022-23.** The CIC
    annual reports for those years contain the per-department annexure columns but print
    no UT-of-J&K aggregate, and J&K is absent from the published top-20 tables for those
    years. I read the annexure pages as images and confirmed the per-department figures
    are small and partial (2022-23: Public Works 11, Horticulture 38, Youth Services 29,
    Tribal Affairs 19 requests received), consistent with 23 of 43 authorities reporting.
11. **Whether the ~600 J&K second appeals now at the CIC include any case inherited from
    the SIC in 2019.** Nothing I retrieved distinguishes legacy transfers from fresh
    filings. The CIC's file numbers all begin at CIC/UTOJK/A/2020/… or later; I saw no
    file number carrying an SIC-era identity.

Two dead hosts, confirmed NXDOMAIN in this run and named so that nobody wastes time on
them again: **jksic.nic.in** (the Commission's own site — its record survives only in the
Internet Archive) and **jkshrc.nic.in**. **jkhome.nic.in** is likewise NXDOMAIN live, but
the Internet Archive holds thousands of its PDFs.

---

## 8. The shape of it

A single sheet of paper signed on 23 October 2019 by a Secretary to the Government
abolished the forum. Its six operative clauses disposed of a Commissioner, 23 officials,
26 repatriated staff, some vehicles, a building, furniture, electronic gadgets, and
"all records pertaining to the Commission" — the last of these handed to an
administrative department **for record**. The word "pending" does not appear in it. The
plan for the pending cases lived in a letter from Delhi dated eight days earlier that
neither I nor, so far as I can find, any public repository holds.

The Commission's website returned HTTP 200 on 8 October 2019 and HTTP 404 by 7 November.
Its last published pendency figure dates from 31 March 2014. The forum that inherited its
work issued its first decision against a Jammu and Kashmir public authority on 15 May
2020 — 197 days later — and publishes its caseload only as three national totals, in a
report that is currently sixteen months behind and, in its most recent edition, a
photograph of a book.

The one J&K-specific number anyone has put on the record since is ~600 pending second
appeals, and it exists because the Commission's Secretary wrote it in a letter to a Chief
Secretary in January 2026, and a newspaper obtained a copy.

---

## 9. Retrieval ledger

**RETRIEVED (I fetched and read these):**

| Document | URL | Status |
|---|---|---|
| Govt Order 1144-GAD of 2019, 23.10.2019 — winding up of J&K SIC | `https://jkgad.nic.in/common/showOrder.aspx?actCode=O33004` | 200, PDF, 6 pp |
| Companion winding-up orders (SHRC, SCDRC, SERC, SCPWD, SCPWCR, SAC, District Consumer Forums) | `https://jkgad.nic.in/common/showOrder.aspx?actCode=O33003` and O33005–O33009, O33024 | 200, PDF each |
| Govt Order 1133-GAD of 2019, 22.10.2019 (dating anchor) | `.../showOrder.aspx?actCode=O33000` | 200, PDF |
| J&K GAD order repository search form | `https://jkgad.nic.in/En/SearchOrder.aspx` | 200 (GET); all POSTs blocked |
| RTI Act 2005 (CIC's published text) | `https://cic.gov.in/sites/default/files/RTI_English.pdf` | 200, PDF, 25 pp |
| CIC annual reports 2018-19 … 2024-25 (English) | `https://cic.gov.in/sites/default/files/Reports/AR<year>E.pdf` | 200 each, PDF |
| CIC annual-reports index | `https://cic.gov.in/circular-reports-conventions` | 200 |
| CIC decision index, J&K query, 01/11/2019–31/12/2020 | `https://dsscic.nic.in/cause-list-report-web/view-decision-all/1?...public_authority=Jammu&frdate=01/11/2019&todate=31/12/2020...` | 200, 224 records |
| Same, bounded to 14/05/2020 | `...&public_authority=UT%20of%20Jammu&frdate=01/11/2019&todate=14/05/2020` | 200, **0 records** |
| J&K SIC Annual Report 2013-14 | `https://web.archive.org/web/20161119194148if_/http://jksic.nic.in/Annual%20Report%202013-14%20.pdf` | 200, PDF |
| J&K SIC Annual Report 2012-13 | `https://web.archive.org/web/20160730163314if_/http://jksic.nic.in/Annual%20Report%202012-13.pdf` | 200, PDF |
| J&K SIC Annual Report 2009-12 | `https://web.archive.org/web/20160730163246if_/http://jksic.nic.in/JKSIC%20ANNUAL%20REPORT%202009-12%20.pdf` | 200, PDF |
| J&K SIC homepage, last live capture | `https://web.archive.org/web/20191008040832/http://jksic.nic.in/` | 200 |
| J&K SIC annual-report index page (archived) | `https://web.archive.org/web/20191008040832/http://jksic.nic.in/Annual%20Report%20s.htm` | 200 |
| J&K SIC 2019-20 cause-list page (archived 22.08.2019) | `https://web.archive.org/web/20190822150621/http://jksic.nic.in/Cause%20List/2019-20/cause%20lis%202019-20.htm` | 200 |
| PTI via Kashmir Observer, 02.12.2019 | `https://kashmirobserver.net/2019/12/02/all-appeals-complaints-pending-under-rti-in-jk-to-be-dealt-by-cic-govt/` | 200 |
| The Wire, HC puts J&K administration on notice | `https://m.thewire.in/article/law/high-court-puts-jk-administration-on-notice-over-pending-rti-appeals` | 200 |
| Bar & Bench, 07.07.2026 | `https://www.barandbench.com/news/cic-cannot-keep-rti-appeals-pending-for-years-must-improve-its-functioning-jk-high-court` | 200 |
| Kashmir Observer, 04.07.2026 | `https://kashmirobserver.net/2026/07/04/hc-refuses-45-day-deadline-for-cic-appeals/` | 200 |
| ETV Bharat, RTI appeals from J&K face long delays | `https://www.etvbharat.com/en/!state/rti-appeals-from-jammu-and-kashmir-face-long-delays-at-central-information-commission-enn25071104373` | 200 |
| *Bansi Lal Balwal v. UT of J&K*, CIC/UTOJK/A/2021/140517 (third-party reproduction) | `https://www.casemine.com/judgement/in/63b7488a614ef961802515a7` | 200 |
| HuffPost India archive piece on J&K RTI delays (via WebFetch) | `https://www.huffpost.com/archive/in/entry/kashmir-article-370-narendra-modi-goverment-rti-news_in_5fb535bbc5b695be82feeab2` | 406 to curl; content read via WebFetch |

**RELAYED (known only through another document):** the DoPT letter of 15.10.2019; the
CIC minutes of 25.10.2019; the GAD five-member-committee order of 29.10.2019; the CIC
Secretary's letter of 12 January 2026 stating ~600 pending J&K second appeals; the text
of the *Junaid Javid* judgment.

**FAILED RETRIEVALS, with the failure mode:** `jksic.nic.in` NXDOMAIN; `jkshrc.nic.in`
NXDOMAIN; `jkhome.nic.in` NXDOMAIN; `rti.gov.in` connection timeout after 77 s;
`indiankanoon.org` HTTP 403 (curl and WebFetch); `indiacode.nic.in` bitstream PDFs
302-redirect to an HTML shell; `cic.gov.in/annual-reports` HTTP 404;
`dsscic.nic.in/cause-list-report-web/download` HTTP 200 but "migration mode" refusal;
`dsscic.nic.in/files/upload_decision/*` HTTP 404; jkgad.nic.in POST endpoints
"Unauthorized Request Blocked"; `humanrightsinitiative.org/in-the-news/*` HTTP 404;
`dailyexcelsior.com` article on the LG–CIC meeting HTTP 404;
`indiatvnews.com` connection timeout.
