# 08b — Civil society capacity to document rights in Jammu and Kashmir: is it measurable?

**Model serving this research agent: claude-opus-5 (Opus 5).**

Research date: 2026-08-03. All retrieval attempts logged below with exact URL and HTTP status.
Every document is marked **RETRIEVED** (I fetched it myself, status given) or **RELAYED**
(known only through another document quoting it). No URL appears in this file that I did not
myself request.

_Status: COMPLETE. Sections 1–9 below; §7 is the exhaustive list of what could not be established; §8 is the consolidated absence register._

---
## 1. FCRA and the denominator problem

### 1.1 What the FCRA portal actually is, as of 3 August 2026

`fcraonline.nic.in` no longer serves content of its own. Both
`https://fcraonline.nic.in/` and `https://fcraonline.nic.in/home/index.aspx`
**302/301 to `https://fcraonline.gov.in/`** (curl reports `url_effective`
`https://fcraonline.gov.in/`, HTTP **200**, 564 bytes). **RETRIEVED.**

The 564 bytes are a React single-page-application shell — `<div id="root"></div>`
and one module script. There is no server-rendered list of associations, no
`.aspx` result table, and nothing a plain fetch or a search engine can index. I
downloaded the bundle:

- `https://fcraonline.gov.in/assets/index-hHePIDY5.js` — **200**, 1,137,098 bytes. **RETRIEVED.**
- `https://fcraonline.gov.in/assets/PublicDashboard-CPFITLYP.js` — **200**, 537,649 bytes. **RETRIEVED.**

and read the endpoint table out of it. The public (unauthenticated) data
surface is six JSON endpoints. All six answered a plain anonymous `curl` — no
key, no session, no captcha:

| Endpoint | Method | HTTP | Bytes | What it returns |
|---|---|---|---|---|
| `https://fcraonline.gov.in/api/hpdashboard/state-counts` | GET | **200** | 2,165 | `{total, stateName, stateCode}` × 36 |
| `https://fcraonline.gov.in/api/hpdashboard/india-map-rest` | GET | **200** | 3,236 | `{ACTIVE, CANCELLED, EXPIRED, stateName, statecode}` × 36 |
| `https://fcraonline.gov.in/api/hpdashboard/state-bar-data` | GET | **200** | 920 | same three series as parallel arrays |
| `https://fcraonline.gov.in/api/hpdashboard/pie-data` | GET | **200** | 76 | all-India `{Active, Cancelled, Expired}` |
| `https://fcraonline.gov.in/api/filterasso/getFilterData` | POST | **200** | varies | **named list** of associations |
| `https://fcraonline.gov.in/api/filterasso/getYearWiseCount` | POST | **200** | 322 | registration-year histogram |

All **RETRIEVED** by me on 2026-08-03 (timestamps inside the responses read
`03-08-2026-14:06` / `14:07`, i.e. the server stamps its own retrieval time —
useful, and I am recording it).

### 1.2 THE DECIDING QUESTION: is it published at state/UT granularity?

**Yes — and this is the opposite of what a denominator problem looks like.**
The FCRA portal publishes, without login, a per-state three-way split of
registrations, plus a per-state NAMED list. So on the pure question the parent
asked — *is there a denominator* — there is one, and it is fine-grained.

Verbatim from `india-map-rest`, retrieved 2026-08-03:

```json
{"CANCELLED":78,"ACTIVE":78,"stateName":"Jammu & Kashmir","EXPIRED":71,"statecode":"15"}
```

and from `state-counts`:

```json
{"total":228,"stateName":"Jammu & Kashmir","stateCode":"15"}
```

**Jammu & Kashmir, as at 2026-08-03: 78 active, 78 cancelled, 71 expired,
228 total ever.** All-India for the same instant: 14,436 active / 22,496
cancelled / 15,224 expired (`pie-data`), 52,879 summed across the 36 rows
(`state-counts`).

### 1.3 Four defects in that denominator, which matter more than its existence

**(a) There is no Ladakh.** The response has exactly 36 rows and I printed all
36: there is no `Ladakh` row, and `Daman and Diu` and `Dadra & Nagar Haveli`
are still separate (they merged in 2020), and `Orissa` and `Pondicherry` carry
pre-2011 spellings. `statecode` `15` is the *pre-2019* State of Jammu and
Kashmir. Proof from the named list itself: among the 78 active associations
returned for code 15 are `TASHI GYAPHEL CULTURAL AND WELFARE SOCIETY`
(address `SABU GANPA, Saboo, 194101` — Leh), `KARMA CHANGCHEN JAMPALING…`
(`Choglamsar (LEH), 194101`), and `ASSOCIATION FOR MEDICINE EDUCATION AND
DEVELOPMENT AMED ZANASKAR` (`…Zanskar Distt Kargil UT Ladakh, Padum, 194302`).
The address string *says* "UT Ladakh" while the record is filed under Jammu &
Kashmir. So the J&K denominator is **the old state's**, silently, seven years
after the reorganisation. Any J&K-only rate computed off it is wrong by an
unstated Ladakh fraction. The geography of the register has not been
re-cut to match the geography of the territory.

**(b) The named list is the ACTIVE list only.** `getFilterData` with
`{"mode":"STATE_DIST","stateCode":"15"}` returned **200**, 14,921 bytes,
**exactly 78 rows** — the same 78 as `ACTIVE`. Fields are `S.No.`,
`RegistrationNo`, `AssociationName`, `Address`, `Nature`. **There is no status
field, and no date field of any kind** — not a registration date, not a
cancellation date, not a validity end date. So the *count* of cancellations in
J&K is public (78) and the *identity* of the 78 cancelled bodies is not
reachable through this API. The cancelled are a number without names.
→ classify: **`not-published`** (the register plainly holds the names — the
same table produced the count; it is producible under compulsion).
Route: RTI to the FCRA Wing, MHA, under s.6(1) RTI Act, asking for the list of
associations registered under FCRA in the erstwhile State of J&K whose
registration has been cancelled, with association name, registration number,
district, date of cancellation and the section invoked; and separately a
Parliamentary Question seeking the same in tabular form, which is how FCRA
figures have historically been extracted (see §2).

**(c) No date anywhere in the public surface.** Neither list nor dashboard
carries a date column. The one temporal cut available is
`getYearWiseCount`, and it is a histogram of *registration year of the
currently-active*, not a time series of events. For `stateCode 15`, verbatim:

```json
[{"year":"2025","count":3},{"year":"2023","count":4},{"year":"2021","count":1},
 {"year":"2019","count":1},{"year":"2017","count":4},{"year":"2016","count":6},
 {"year":"2013","count":4},{"year":"2012","count":3},{"year":"2011","count":5},
 {"year":"2010","count":47}]
```

Sum = 78, so this is a decomposition of the survivors. Read it carefully: it is
a survivorship curve, not a grant series. **2014, 2015, 2018, 2020, 2022 and
2024 are absent entirely** — meaning no association registered in those years
is still active in J&K, which is *not* the same statement as "none was
registered". The two cannot be told apart from published data. The rate at
which J&K bodies newly acquired foreign-funding capacity, year by year, is
**`not-published`** — MHA's own grant register has the dates.
Route: RTI for year-wise FCRA registrations *granted* for J&K 2010–2026,
irrespective of current status.

**(d) Refusals and rejected renewals do not appear at all.** The public API
exposes three states — ACTIVE, CANCELLED, EXPIRED. An application that was
**refused**, and a renewal that was **rejected**, produce no row: a body that
never got in is invisible, and "EXPIRED" merges "let it lapse" with "renewal
refused". This is the sharpest measurement gap on the portal, because refusal
is the low-visibility instrument. Refusals and renewal rejections by state are
**`not-published`** (MHA adjudicated each one and holds the file).
Route: RTI to the FCRA Wing for the number of FC-3A/FC-3C applications
received, granted and refused for J&K by year, plus the number of renewals
rejected; and the standing Parliamentary Question route.

### 1.4 The trap that actually bites here

The parent asked me to say where trap (1) bites — a source that looks
independent but is media-derived from official reporting **is not a check**.
It bites *immediately* on FCRA. There is no independent register of who holds
foreign-contribution permission in India; every count in circulation, in every
newspaper and in most NGO-sector reports, traces to this same MHA table. When a
news story reports "X FCRA licences cancelled", that story **is not a check on
MHA's figure — it is a re-publication of it**. The number has no second
witness. I could compute 78 myself only because MHA served me its own JSON.
The measurement is therefore *single-sourced by construction*: MHA is
simultaneously the regulator, the sole record-keeper, and the sole publisher,
and the register is not reproducible from any independent observation.

### 1.5 What MHA itself says about refusals — retrieved

The live portal does publish one document that speaks directly to refusal.
Retrieved by POST to the portal's own document endpoint:

- `https://fcraonline.gov.in/api/home-page/viewDocument` with body
  `{"fileName":"fc_notice_11112024.pdf"}` — HTTP **200**, 3,191,580 bytes,
  `application/pdf`. **RETRIEVED.** It is a scanned MHA Public Notice,
  Foreigners-II Division (FCRA), No. II/21022/23(04)/2024-FCRA-II, dated
  November 2024, subject: *"Denial/Refusal of Applications of Registration and
  Renewal – Reasons for denial/refusal reg."* Extracted with `pdftotext -layout`
  (the scan is legible but OCR-noisy; quotations below preserve the OCR).

The notice states the mechanism plainly. Verbatim: "An E-mail message from FCRA
portal is sent to E-mail ID of the association whose application is denied,
conveying the reason of denial". And: the Ministry received representations
that "reasons for denial of their application are not clear", so it decided
"to disseminate the consolidated reasons of denial", giving "an illustrative
list", closing at para 3: "The above reasons of denial are only illustrative
and not exhaustive."

This is the decisive document for the measurement question. It establishes, on
MHA's own record, that (i) a refusal decision and its reason **do exist in
writing** for every refused application; (ii) they are transmitted **privately**
to the applicant by e-mail and SMS; (iii) what is published is a taxonomy, not
the decisions. Refusals are therefore emphatically **`not-published`**, not
`not-collected` — the file exists, per-application, and would be producible
under compulsion.

The taxonomy also matters for what a J&K denominator would be measuring. The
published grounds include, verbatim from the table: "Field inquiry has revealed
adverse inputs against the association [e.g., involvement in anti-developmental
activities, inciting protests with malicious intentions, linkage with terrorist
organisation / anti-natsonal [sic] organisations etc.]" (s.12(4)(a)(vi),
12(4)(f)(ii)/(iii)); "Association OR its office bearer(s) … having linkage(s)
with radical/terrorist entities"; and "Field agency has reported adverse inputs
… acceptance of FC is likely to affect social/religious harmony". So the
operative input to a refusal can be a **field-agency report**, which is not
itself a published or reviewable document. The determination is made on
material the applicant never sees and no third party can audit. Whatever the
merits, this is a measurement fact: the evidentiary basis of an FCRA refusal is
**`not-published`** and, in the security-input case, arguably **`not-collected`
as a disclosable artefact** — the field agency's input is an intelligence
product, not a record designed to be produced. Route for the first:
RTI for the number of J&K applications refused on each enumerated ground; MHA
will likely claim s.8(1)(a)/(g) exemption on the underlying inputs, and a
refusal to that RTI, if made, is precisely what would convert this line from
`not-published` to `withheld`. **I found no such refused RTI, so I classify it
`not-published` and not `withheld`.**

### 1.6 The archived record: what the OLD portal published that the new one does not

I did not guess any of the following URLs. I pulled the Internet Archive CDX
index for `fcraonline.nic.in*` (4,000 rows,
`http://web.archive.org/cdx/search/cdx?url=fcraonline.nic.in*&output=text&fl=original,timestamp,statuscode&collapse=urlkey&limit=4000`,
HTTP **200**, 421,510 bytes — **RETRIEVED**) and a second CDX pass restricted to
`fcraonline.nic.in/home/PDF_Doc/*` (233 rows, HTTP **200**, 21,049 bytes —
**RETRIEVED**), and worked only from URLs the index says were captured with
status 200.

The old ASP.NET portal had, among others, `fc8_cancel_query.aspx` (captured
2013-12-16, status 200 per CDX) and `fc8_statewise.aspx` (captured 2013-10-03,
status 200) — i.e. a **cancellation query page** existed as a first-class page
on the old site. The CDX index also shows later captures of
`https://fcraonline.nic.in/fc_out.aspx?aspxerrorpath=/fc8_cancel_query.aspx`
(2022-07-01, status 200), and I **RETRIEVED** that capture —
`https://web.archive.org/web/20220701114116if_/https://fcraonline.nic.in/fc_out.aspx?aspxerrorpath=/fc8_cancel_query.aspx`,
HTTP **200**, 17,293 bytes. It is the old site's *error* handler, carrying
`/fc8_cancel_query.aspx` as the failed path, i.e. the cancellation query page
was already broken by mid-2022 while the rest of the site (Acts, Rules, validity
extensions) still rendered.
The current React portal has no equivalent route at all: the route table I
extracted from the bundle contains `/public-dashboard` and `/search` and no
cancellation listing. **A published surface that once existed no longer does.**

Named cancellation material that I did retrieve from the archive:

- `https://web.archive.org/web/20231203141448if_/https://fcraonline.nic.in/home/PDF_Doc/revocation_list.pdf`
  — HTTP **200**, 313,194 bytes. **RETRIEVED.** It reproduces a Gazette of
  India Extraordinary notification, Ministry of Home Affairs, New Delhi,
  **16 June 2006, S.O. 924(E)**, cancelling registrations under the FCRA
  **1976** for failure to furnish accounts for 2001-02, 2002-03 and 2003-04.
  It is a **named list with a state column** — the format that no longer
  exists. It contains ~332 numbered rows and **six carry the state value
  `J&K`**, verbatim:

  | Reg. no. | Association | State |
  |---|---|---|
  | 152670016 | Kristu Jyoti Social Welfare Society | J&K |
  | 152680004 | Lungnag Youth Association | J&K |
  | 152680009 | Rangdum Gunpa Cultural and Welfare | J&K |
  | 152680009 | Rangdum Gonpa Cultural and Welfare | J&K (duplicate entry, variant spelling) |
  | 152740003 | Modern Cultural Club | J&K |
  | 152610002 | Rahmat-E-Aalam Hospital Trust | J&K |

  Note the register's own data quality: 152680009 appears twice under two
  spellings. Note also the ground — non-filing of returns — which is
  administrative, and note that none of these is a rights-documentation body.
  This is the **only** official, named, state-tagged FCRA cancellation record
  covering J&K that I was able to retrieve, and it is twenty years old and
  under a repealed statute.

- `https://web.archive.org/web/20210309194103if_/https://fcraonline.nic.in/home/PDF_Doc/FCRACancellationOrder_180315.pdf`
  — HTTP **200**, 817,210 bytes. **RETRIEVED**, and **unreadable**:
  `pdftotext -layout` yields 64 bytes of text. It is an image-only scan.
- `https://web.archive.org/web/20210309173243if_/https://fcraonline.nic.in/home/PDF_Doc/FCRACAncellationOrder_270415.pdf`
  — HTTP **200**, 20,202 bytes. **RETRIEVED**, text extraction yields **2 bytes**.
  Image-only scan.
- `https://web.archive.org/web/20231203134348if_/https://fcraonline.nic.in/home/PDF_Doc/FCRACancellationOrder_16062016.pdf`
  — HTTP **200**, but the download truncated at exactly 1,048,576 bytes and
  `pdftotext` failed with `Invalid XRef entry 15 / xref num 15 not found`.
  **Retrieval PARTIAL — I could not read this document and do not use it.**

That three of the four cancellation-order documents are unsearchable scans is
itself a measurement fact and not a trivial one: a scanned image of a list is
formally published and practically unmeasurable. It defeats counting without
defeating the claim of transparency.

- `https://web.archive.org/web/20250504045051if_/https://fcraonline.nic.in/home/PDF_Doc/fc_list_22122017.pdf`
  — HTTP **200**, 38,144 bytes. **RETRIEVED.** Not a cancellation list — it is
  the list of FCRA-designated banks (J&K Bank appears at #19). Recorded here so
  the negative is on the record: the file name pattern `fc_list_*` does **not**
  denote an association list.

---

## 2. MHA's year-wise FCRA statistics and the parliamentary channel

### 2.1 The one document that gives J&K a cancellation number with a date range

**RETRIEVED.** `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2023-pdfs/RS29032023/3253.pdf`
— HTTP **200**, 541,138 bytes, `application/pdf`, 5 pages, extracted with
`pdftotext -layout`. (Note for reproducibility: mha.gov.in serves **403** to a
default user-agent; the fetch above used a browser UA. That is a retrieval
obstacle, not a publication gap, but it is the reason this class of document is
under-cited.)

Identification, verbatim from the head of the document: "GOVERNMENT OF INDIA /
MINISTRY OF HOME AFFAIRS / RAJYA SABHA / UNSTARRED QUESTION NO. 3253 / TO BE
ANSWERED ON THE 29TH MARCH, 2023/ CHAITRA 8, 1945 (SAKA) / FUNDS RECEIVED BY
NGOS FROM ABROAD / 3253. SHRI PARIMAL NATHWANI". Answered by the Minister of
State in the Ministry of Home Affairs, **Shri Nityanand Rai**.

The operative passage, verbatim: "During the last three years i.e. 2020 to 2022
and current year, the FCRA Registration Certificates of 1,828 associations have
been cancelled under section 14 of the Foreign Contribution (Regulation) Act,
2010 due to violation of the provisions of the Act and rules made thereunder.
State/UT-wise details of these cancellations are enclosed as Annexure –III."

**Annexure III, verbatim, the J&K row:**

| S. No. | State/UT | Number of associations whose FCRA registration have been cancelled [2020 to 2023 (upto 22.03.2023)] |
|---|---|---|
| 12 | Jammu & Kashmir | **10** |

For scale, the same annexure gives Tamil Nadu 219, Maharashtra 207, West Bengal
193, Delhi 73. The table lists **32 States/UTs and no Ladakh row** — the same
pre-2019 geography as the live portal.

Annexures I and II of the same reply give **J&K's foreign-contribution receipts
and utilisation**, which is the money-side denominator and is the only place I
retrieved it at UT level:

| J&K, Rs. crore | FY 2019-20 | FY 2020-21 | FY 2021-22 |
|---|---|---|---|
| FC received | 50.03 | 56.05 | 55.77 |
| FC utilised | 53.97 | 51.03 | 55.68 |

(both "based on Annual Returns submitted as on 22.03.2023"). Flat. Against
all-India receipts in the thousands of crore for Delhi, Karnataka, Tamil Nadu,
J&K's ~Rs. 55 crore is roughly 0.3% of the national total — with, per §1, a
denominator that still contains Ladakh.

### 2.2 What this reply does and does not measure

The question asked (d) for "the action taken against the NGOs who have violated
[FCRA] during the said period, State-wise/UT-wise". The answer supplied
**cancellations only**. It does not give refusals, does not give renewal
rejections, does not give suspensions under s.13, does not name a single
association, and does not break the 10 J&K cancellations down by year, by
district, by ground, or by the nature of the body. So:

- J&K cancellations **by year** within 2020–2023: **`not-published`**. Route: a
  fresh Parliamentary Question in the same form as RS USQ 3253 but seeking
  year-wise and State-wise columns; MHA has answered exactly this shape before,
  so the request is proven answerable.
- J&K **suspensions** under s.13 FCRA: **`not-published`**. Suspension is the
  instrument that stops funds *without* a cancellation ever appearing in the
  three-state dashboard, and it appears in no retrieved source at state level.
  Route: RTI/PQ for State-wise s.13 suspension orders issued and their
  durations.
- The **ground** for each of the 10 J&K cancellations: **`not-published`**.
  s.14 requires the Central Government to give the association an opportunity of
  being heard, so a reasoned order exists in every one of the 10 cases. Route:
  RTI for copies of the s.14 cancellation orders for associations registered in
  J&K, 2020 onward, with names and reasons.
- The **identity** of the 10: **`not-published`** (as §1.3(b)).

### 2.3 Publication gap: there is no FCRA statistical annual

I want to be precise about a thing that is easy to state loosely. MHA's FCRA
Wing does **not** publish a periodic statistical report on FCRA. What exists is
(i) the live dashboard, which is a **stock as-at-today** with no history and no
archive — I retrieved 78/78/71 for J&K on 2026-08-03 and there is no way, from
the portal, to retrieve what it said on any earlier date; and (ii) parliamentary
answers, which are **episodic**, shaped by whatever a member happened to ask,
and use whatever cut-off the Ministry chose that week ("upto 22.03.2023").

That is the publication gap, and it is structural rather than a lapse: **the
time series exists only as a by-product of somebody asking**. There is no
obligation to publish, no schedule, no fixed table, and therefore no guarantee
of comparability between two answers. A researcher wanting J&K FCRA
cancellations 2010–2026 as a series cannot assemble one from published
sources; they can assemble a handful of non-aligned snapshots.
Classification of the series itself: **`not-published`** — MHA's register
generated both the 2023 answer and the 2026 dashboard from the same underlying
rows, so it is producible under compulsion. Route: PQ or RTI for the register
extract with cancellation dates, which is a single SQL query at the holder's end.

**Trap (1) again, in its sharpest form.** Every media figure in circulation —
"16,000 FCRA licences cancelled in 9 years", "20,600 NGOs barred", "1,827 NGOs
2018–22" — is a restatement of an MHA parliamentary answer. I saw those
headlines in search results and did **not** use them, because using them would
be double-counting the government's own number and presenting it as
corroboration. **A press report of an MHA figure is not a check on that figure;
it is the same figure with a byline.** The only genuine cross-check available to
me was internal-consistency: RS 3253's Annexure III sums, and its J&K row (10,
2020–2023) sits inside the live dashboard's cumulative J&K cancelled count (78,
all-time, 2026) without contradiction. That is a weak check and I am calling it
weak.

---

## 3. Named J&K organisations: what is on a retrieved OFFICIAL record

### 3.1 What I can put on an official record — six names, from 2006

Per §1.6, the Gazette notification **S.O. 924(E) of 16 June 2006**, retrieved as
`revocation_list.pdf` from the Internet Archive capture of the MHA FCRA site,
names six associations with the state value `J&K` whose FCRA registrations were
cancelled for failure to file accounts for 2001-02 to 2003-04: Kristu Jyoti
Social Welfare Society (152670016), Lungnag Youth Association (152680004),
Rangdum Gunpa/Gonpa Cultural and Welfare (152680009, listed twice), Modern
Cultural Club (152740003), Rahmat-E-Aalam Hospital Trust (152610002).
**RETRIEVED, official, named, state-tagged — and twenty years old.**

**And here is a live integrity defect I can demonstrate.** Two of those six
appear in the **currently ACTIVE** J&K list I pulled on 2026-08-03 from
`getFilterData`, under the identical registration numbers:

- `152680004 | Lungnag Youth Association | Raru, Padum, Zanskar Kargil, J&K`
- `152680009 | Rangdum Gonpa Cultural and Welfare Society | Rangdum Labrang, … Kargil (J&K)-194101`

Either they were restored/re-registered after 2006 and the register does not
say so, or the register is internally inconsistent. **Published data does not
let me tell which.** There is no status-history field, no
cancellation-and-restoration event log, and no date. This is the concrete
demonstration that the FCRA public data is a *snapshot without provenance*: two
official MHA documents, both retrieved, disagree about the same registration
number, and nothing published reconciles them. The reconciliation is
**`not-published`** — the register has the transition rows. Route: RTI for the
status-change history of registration numbers 152680004 and 152680009.

### 3.2 The one recent named case, and its evidentiary status

The most-reported recent FCRA cancellation touching this territory is
**SECMOL** (Students' Educational and Cultural Movement of Ladakh, founded by
Sonam Wangchuk), reported cancelled on/around **25 September 2025** under
s.14(1). I searched for an official record and **did not find one**:

- The live FCRA portal's complete published-document list (retrieved via
  `https://fcraonline.gov.in/api/home-page/getOcgAndLn`, HTTP **200**) contains
  **no cancellation orders at all** — 33 PDFs, all validity extensions,
  charters, SOPs, FAQs and procedural clarifications. The most recent,
  `fc_notice_30092025.pdf`, I retrieved and read (POST `viewDocument`, HTTP
  **200**, 1,445,862 bytes): it is F. No. II/21022/23(22)/2020-FCRA-II dated
  30 September 2025, subject *"Clarification regarding timely submission of
  application for renewal of registration certificate"* — **not** the SECMOL
  order. **MHA does not publish s.14 cancellation orders.**
- SECMOL is **absent from the 78-row active J&K list** I retrieved. That is
  official evidence of *absence from the current register*. It is **not**
  official evidence of *cancellation*, and I will not treat it as such — a body
  can be absent for lapse, expiry, or never having been under statecode 15.

Everything else I have on SECMOL — the sections cited, the specific
transactions, the show-cause dates — reached me only through press accounts and
NGO-sector alerts. **RELAYED, and I am not entering the specifics into this
record.** Naming the outlets would create the appearance of corroboration
where there is none: they are all narrating the same unpublished MHA order.
**Trap (1) exactly: a press report describing an official order is not an
independent check on that order; it is the order, minus the text.** The order
itself is **`not-published`**.
Route: RTI for a copy of the s.14 cancellation order in respect of SECMOL,
and/or for all s.14 orders issued in 2025 in respect of associations under
state code 15.

### 3.3 The refusal side: nothing named, anywhere

I found **no** official record naming any J&K association whose FCRA
registration application or renewal was **refused**. Not on the portal, not in
the retrieved parliamentary answer, not in the archive. Per §1.5 the reason is
structural: refusal reasons go out by e-mail to the applicant. Named refusals
are **`not-published`**.

### 3.4 A published-but-unmeasurable surface, and a thing I deliberately did not do

The portal *does* hold per-association dates. I found the endpoint
`https://fcraonline.gov.in/api/public/fcra-validity/verify` and read its
client code: it returns `registrationNumber, associationName, address,
district, state, pinCode, lastRenewedOn, validFrom, validTo` — precisely the
temporal fields missing from the bulk list. The client sends
`{rcn, captchaInput, captchaHash, captchaTimestamp}`, with `rcn` capped at
exactly 9 characters. I confirmed this **against the server, not just the
bundle**: an empty POST to that URL (`-d '{}'`) returned HTTP **200** with

```json
{"success":false,"message":"Validation failed","errors":{"message":"VALIDATION_ERROR",
 "fields":{"rcn":"FCRA Registration Number is required","captchaTimestamp":"Captcha timestamp is required",
 "captchaHash":"Captcha hash is required","captchaInput":"Access Code is required"}}}
```

**RETRIEVED** (`timestamp` in the response: `2026-08-03T14:29:35`). So the
server itself states the gate: **you must already know the registration number,
and you must solve a CAPTCHA, per association.**

I did not attempt the CAPTCHA. Solving bot-detection is outside what I will
do, and it would in any case not change the finding — it would confirm it.
The finding is: **the dates exist, are published one-at-a-time behind an
anti-automation gate, and are therefore not measurable in aggregate by
anyone outside MHA.** A dataset that can only be read one row at a time,
each row requiring a human, is published in form and withheld in effect —
but *not* `withheld` in this instrument's sense, because no one has made a
specific request that was refused. Classify: **`not-published`** (as a
dataset). Route: RTI/PQ for a bulk extract of `validFrom`, `validTo`,
`lastRenewedOn` and current status for all registrations under state code 15
— the fields already exist in the exact shape the API returns them.

---

## 4. Amnesty International India: both accounts, in their own words

### 4.1 Amnesty's account — RETRIEVED

`https://www.amnesty.org/en/latest/news/2020/09/amnesty-international-india-halts-its-work-on-upholding-human-rights-in-india-due-to-reprisal-from-government/`
— HTTP **200**, 116,027 bytes, redirecting to
`https://www.amnesty.org/en/latest/press-release/2020/09/amnesty-international-india-halts-its-work-on-upholding-human-rights-in-india-due-to-reprisal-from-government-of-india/`.
**RETRIEVED 2026-08-03.**

**Date: Press Release, 29 September 2020.** Amnesty's own framing, verbatim:
the release is "Responding to Amnesty International India's bank accounts being
frozen by the Enforcement Directorate, an investigative agency of the
Government in India", and quotes **Julie Verhaar, Acting Secretary General**:

> "This is an egregious and shameful act by the Indian Government, which forces
> us to cease the crucial human rights work of Amnesty International India for
> now."

> "The Amnesty movement is very proud of the vital work carried out by our
> outstanding colleagues in India regardless of the risks they faced, including
> their unequivocal calls for accountability for the actions of the authorities
> during the Delhi riots and **in Jammu and Kashmir** and their work on gender
> based violence. Sadly, this enormously important work standing up for victims
> has been met with the heavy-handed tactics that Indian civil society has
> become increasingly familiar with – part of the government's drive to silence
> critical voices and stoke a climate of fear."

> "The staff of Amnesty India have shown great dignity in the face of a
> concerted and vicious smear campaign of spurious allegations, raids by various
> investigative agencies, malicious media leaks, and intimidation without an
> iota of credible evidence of wrongdoing. **No laws have been broken.**"

So: **the cause Amnesty gives is reprisal for its human-rights work, including
its work on Jammu and Kashmir; the mechanism is the freezing of its bank
accounts by the Enforcement Directorate; the date it ceased operations is
29 September 2020.**

### 4.2 The Government of India's account — RETRIEVED

`https://mha.gov.in/sites/default/files/2022-09/MHA_Amnesty29092020_0%5B1%5D_1.pdf`
— HTTP **200**, 197,364 bytes, `application/pdf`. **RETRIEVED 2026-08-03**,
extracted with `pdftotext -layout`. It is a Press Information Bureau /
Government of India release carried on MHA's own site, headed **"Human Rights
cannot be an excuse for defying the law of the land"**, dated **New Delhi,
September 29, 2020** — the same day. Verbatim, at length, because the parent
asked for it at its strongest:

> "The stand taken and the statements made by Amnesty International are
> unfortunate, exaggerated and far from the truth."

> "Amnesty International had received permission under the Foreign Contribution
> (Regulation) Act (FCRA) only once and that too twenty years ago (19.12.2000).
> Since then Amnesty International, despite its repeated applications, has been
> denied FCRA approval by successive governments since as per law it is not
> eligible to get such an approval."

> "However, in order to circumvent the FCRA regulations, Amnesty UK remitted
> large amounts of money to four entities registered in India, by classifying it
> as Foreign Direct Investment (FDI). A significant amount of foreign money was
> also remitted to Amnesty (India) without MHA's approval under FCRA. This mala
> fide rerouting of money was in contravention of extant legal provisions."

> "Owing to these illegal practices of Amnesty, the previous government had also
> rejected the repeated applications of Amnesty to receive funds from overseas.
> This had led Amnesty to suspend its India operations once during that period
> as well. This bipartisan and purely legal approach towards Amnesty, under
> different governments, makes it clear that the entire fault lies in the
> dubious processes adopted by Amnesty to secure funds for its operations."

> "All the glossy statements about humanitarian work and speaking truth to power
> are nothing but a ploy to divert attention from their activities which were in
> clear contravention of laid down Indian laws."

> "Amnesty is free to continue humanitarian work in India, as is being done by
> many other organizations. However, India, by settled law, does not allow
> interference in domestic political debates by entities funded by foreign
> donations. This law applies equally to all and it shall apply to Amnesty
> International as well."

> "India has a rich and pluralistic democratic culture with a free press,
> independent judiciary and tradition of vibrant domestic debate. The people of
> India have placed unprecedented trust in the current government. Amnesty's
> failure to comply with local regulations does not entitle them to make
> comments on the democratic and plural character of India."

Note the two structural claims the Government makes, both of which are
*measurement* claims and both of which point at the same gap: (i) Amnesty was
**refused** FCRA repeatedly, by governments of both parties — a claim about a
sequence of refusal decisions that appear in **no** published register (§1.3(d)
/ §3.3); and (ii) the eligibility bar is legal and applies equally. **I do not
adjudicate either.** I record that the Government's own strongest defence is a
history of refusals that the public record does not contain, and that this is
precisely the series whose absence I classified `not-published` in §1.3(d).
The one date the Government does put on the record — **19.12.2000**, the single
FCRA permission — is the only Amnesty-India FCRA date in any retrieved document.

### 4.3 Where trap (2) bites

Here, and hard. Both statements are dated 29 September 2020 and both are
retrieved in full; the *format* of §4 is two-sided. But the two parties were
not equally able to produce material. The Government's account rests on
records only it holds — application files, refusal orders, remittance
classifications, ED findings — and it discloses the conclusions of those
records without the records. Amnesty's account rests on a claim ("No laws have
been broken") it could only substantiate by reference to the same files, plus
its own accounts, which by then it could not operate. **A document that
presents both sides is not balanced if only one side was able to produce
material.** In this case one side holds the only evidentiary corpus that could
settle the question, and neither the corpus nor any independent extract of it
has been published. Presenting the two statements side by side is honest about
positions and silent about proof — and the silence is not symmetric.

There is a second-order version of the same trap that matters for §5: after
29 September 2020, Amnesty continued to publish research on India *from
outside India*. That does not restore the missing capacity; it relocates it.
An account produced from outside a territory by an organisation excluded from
it, and an account produced inside it by the authorities, are not two
comparable observations.

---

## 5. Successors: who is publishing periodic documentation now

### 5.1 JKCCS — the site is live, and it stopped in August 2020

I retrieved JKCCS's own site. (Retrieval note: `jkccs.info` is intermittently
unreachable — repeated `curl: (35) Recv failure: Connection reset by peer` at
TLS. It is **not** DNS: Cloudflare DoH resolves `jkccs.info` to `103.53.43.114`
(HTTP status 0, Status:0/NOERROR). Pages succeed on retry, typically on the
2nd–4th attempt. I record this because "flaky" and "blocked" look identical
from one attempt, and I will not claim either.)

- `https://jkccs.info/` — HTTP **200**, 129,063 bytes. **RETRIEVED.**
- `https://jkccs.info/reports/` — HTTP **200**, 90,676 bytes (4th attempt). **RETRIEVED.**
- `https://jkccs.info/annual-human-rights-review/` — HTTP **200**, 86,812 bytes. **RETRIEVED.**
- `https://jkccs.info/report-kashmirs-internet-siege/` — HTTP **200**, 1,345,069 bytes. **RETRIEVED.**
- `https://jkccs.info/feed/` — HTTP **200**, 75,639 bytes. **RETRIEVED.** This is
  the decisive artefact: it is the site's own machine-readable publication log.

**The most recent `<pubDate>` in JKCCS's own RSS feed is `Wed, 12 Aug 2020
14:57:26 +0000`.** The full list of the ten most recent items, by the site's own
timestamps: 12 Aug 2020; 1 Jul 2020; 31 Dec 2019 (×2); 3 Jul 2019; 26 Jun 2019;
30 May 2019; 20 May 2019; 9 May 2019; 5 Apr 2019.

So, answering the parent's question directly: **yes, there is retrievable JKCCS
material after the 2019 Annual Human Rights Review** — two items, both from
2020 — and **nothing whatever after 12 August 2020**:

1. *"Bi-annual HR Review: 229 killings, 107 CASO's, 55 internet shutdowns, 48
   properties destroyed"*, 1 July 2020, covering 1 January – 30 June 2020.
2. *"Kashmir's Internet Siege"*, August 2020 — the homepage still labels it
   "Latest Report". I retrieved the report page (1.3 MB) and it renders a
   day-by-day log from 02/08/2019 onward with sections on freedom of the press
   and the right to social life, and offers "DOWNLOAD PDF [18.4 MB]" and a
   low-bandwidth "DOWNLOAD PDF for 2g [3.2 MB]" — the 2G variant is itself an
   artefact of the conditions being documented.
3. A press statement of 12 Aug 2020 on the Amshipora/Rajouri killings.

The `/annual-human-rights-review/` index page lists reviews for **2010 through
2018** and stops. The 2019 review exists as a separate post. **There is no
annual review for 2020 or any later year.** The `/reports/` page lists the
thematic corpus (*Torture: Indian State's Instrument of Control…*, *Structures
of Violence*, *Buried Evidence*, *Alleged Perpetrators*, *State versus Khurram
Parvez*, and others) — all pre-2020.

The site's own contact block still reads "The Bund, Amira Kadal Srinagar-190001",
"+91 194 248 2820", "mail@jkccs.org", "www.jkccs.net". I checked
**`https://jkccs.net/`**: it returns HTTP **200** but `url_effective` is
**`https://www.critterz.xyz/`** (377,099 bytes) — the organisation's own
advertised domain now resolves to an unrelated site. The domain is gone. The
frozen site points at a dead address for itself.

Classification of JKCCS's post-2020 documentation: **`not-collected`**.
This is the honest value and it is the severe one. The Annual Human Rights
Review was a *product of fieldwork* — habeas corpus petition counts, CASO
tallies, family interviews. If the organisation is not operating, that fieldwork
did not happen; there is no unpublished 2021–2026 dataset sitting in a drawer
that compulsion could produce. **Nothing exists to be released.** The
counterfactual test the instrument requires — compelled tomorrow, what can the
holder produce? — returns *nothing*, because the holder no longer performed the
collection. That is what makes this a capacity finding rather than a
transparency finding. (I make no claim here about *why* it stopped; the
retrieved record establishes the date and the silence, not the mechanism.)

### 5.2 The institutional layer that was repealed — RETRIEVED statute

JKCCS was not the only thing that stopped. The domestic *statutory* rights-
documentation machinery for the territory was repealed by primary legislation,
and I retrieved the statute itself:

`https://www.indiacode.nic.in/bitstream/123456789/15875/1/the_jammu_and_kashmir_reorganisation_act_2019.pdf`
— HTTP **200**, 748,052 bytes, extracted with `pdftotext -layout`. **RETRIEVED.**

In the **Fifth Schedule, TABLE-3**, headed verbatim "STATE LAWS INCLUDING
GOVERNOR'S ACTS WHICH ARE REPEALED IN UNION TERRITORY OF JAMMU AND KASHMIR;
AND UNION TERRITORY OF LADAKH", the following appear:

| S.No. in Table-3 | Act repealed | No. |
|---|---|---|
| 1 | The Jammu and Kashmir Accountability Commission Act, 2002 | XXXVIII of 2002 |
| **117** | **The Jammu and Kashmir Protection of Human Rights Act, 1997** | **XV of 1997** |
| 134 | The Jammu and Kashmir Right to Information Act, 2009 | VIII of 2009 |
| 164 | The Jammu and Kashmir State Vigilance Commission Act, 2011 | I of 2011 |

Correspondingly, **TABLE-1** (Central laws extended) item **86** reads "The
Protection of Human Rights Act, 1993. Proviso to sub-section (2) of section 1
shall be omitted", and item **95** does the same for "The Right to Information
Act, 2005". And **TABLE-4**, headed "STATE ACTS … THAT SHALL REMAIN IN FORCE",
retains at item **123** "The Jammu and Kashmir Public Safety Act, 1978
(VI of 1978)".

Set out plainly, because the asymmetry is the finding: **the statute under
which people are administratively detained survived the reorganisation; the
statute that created the State Human Rights Commission did not.** The 1997 Act
was the legal basis of the J&K State Human Rights Commission, so with the
repeal the SHRC's own series of complaints, inquiries and recommendations
terminated. Its jurisdiction passed to the NHRC under the central 1993 Act.
Whether the NHRC's J&K-specific caseload is published as a comparable series is
**outside what I established** (see §6) — I did not retrieve NHRC data and I
will not assert either way.

The SHRC's post-2019 series: **`not-collected`** (the body ceased to exist; no
one gathered it). The SHRC's *historic* case files and registers up to
31 October 2019: **`not-published`** — they were created, and a successor
administration holds them. Route: RTI to the General Administration
Department, UT of J&K, for the record-transfer memorandum and the disposal
register of the erstwhile SHRC; and to the NHRC for J&K complaint/disposal
counts by year since 2019, which would let someone test continuity of the
series across the repeal.

### 5.3 Kashmir Law & Justice Project — yes, it publishes, monthly, and I verified the cadence

**RETRIEVED**, all on 2026-08-03:

- `https://www.kljp.org/` — HTTP **200**, 22,055 bytes.
- `https://www.kljp.org/about` — HTTP **200**, 6,943 bytes.
- `https://www.kljp.org/category/publications` — HTTP **200**, 34,065 bytes,
  and pages 2 through 13 of the same listing, each HTTP **200**.
- One full report page and its PDF:
  `https://www.kljp.org/articles/key-developments-in-the-human-rights-situation-in-indian-administered-kashmir-june-1---june-30-2026`
  — HTTP **200**, 13,290 bytes; and the linked PDF
  `https://cdn.prod.website-files.com/6031a13f23a42e1120a8c37c/6a62881b2a79168665ba4bff_KEY_DEVELOPMENTS_for_June_2026%20v.F.pdf`
  — HTTP **200**, 224,719 bytes, read with `pdftotext -layout`.

**What it publishes.** A monthly series, *"Key Developments in the Human Rights
Situation in Indian-Administered Kashmir"*, bylined **"Project South, KLJP,
KSCAN"**. I walked the paginated archive and recorded the period label on every
issue. The series is **unbroken from "September 29 – October 31, 2022" through
"June 1 – June 30, 2026"** — every calendar month present across pages 1–13,
i.e. roughly **45 consecutive monthly issues**. That is a real periodic series
with a stable format, which is what makes it measurable at all.

It also publishes standing pieces: a **"Shadow Report on India's Compliance with
[ICERD] in Indian-Administered Kashmir"** (KLJP with FIDH, originally published
July 2026), which its own abstract says is "submitted for the CERD's review of
India's combined twentieth and twenty-first periodic reports at its 118th
Session, held from 10 to 25 August 2026", structured as "1. Grave Violations by
State Forces and Structural Impunity; 2. Post-2019 Discriminatory
Disempowerment and Suppression of Dissent; 3. Hate Speech and Denial of
Religious Freedom". And it hosts an archive of **historical reports** by other
bodies (PUDR, APCLC, PUCL, Institute of Kashmir Studies, Human Rights Watch,
1990–2001), re-posted to KLJP in July 2026 — i.e. it is also acting as a
repository for a documentary tradition whose original publishers are gone.

**Stated method.** There is no methods statement in the conventional sense —
no sampling frame, no verification protocol, no case-definition appendix. What
there is instead is an explicit **limitation notice**, printed in every issue.
Verbatim from the June 2026 PDF:

> "Note: Due to ongoing repression by Indian authorities, key developments in
> the human rights situation in IAK have gone unreported. Indian authorities
> have criminalized independent journalism and human rights work; all reporting
> from IAK is state-controlled. Indian authorities label pro-human rights and
> pro-self-determination activity 'terrorism' and systematically legitimate
> violations against people in IAK through unsubstantiated, demonizing labels,
> including: 'terrorist,' 'militant,' 'secessionist,' … 'overground worker (or
> OGW),' 'hybrid militant,' … 'intruder,' and 'infiltrator."

**This note is the single most important methodological sentence I retrieved in
this whole exercise, and it cuts against the document that carries it.** The
compiler is telling you that the series is not a count of events but a count of
*events that surfaced*, and that the surfacing channel is one the compiler
regards as state-controlled. And the entries bear that out: the June 2026 issue
sources its items to dated public occurrences and to published articles — it
closes with a "PUBLIC STATEMENTS, COMMUNICATIONS, AND REPORTS" section citing,
among others, an Indian Express piece on illegal mining, a piece in The
Conversation, a Rumpus book review, and a panel discussion.

**So trap (1) bites the successor too, and I will say it in the required
words: a source that looks independent but is media-derived from official
reporting is not a check.** KLJP is independent of the Indian state in
governance, funding and location. It is *not* independent of the Indian state
in **inputs**, because a monthly compilation assembled largely from what got
published inside a reporting environment the compiler itself calls
state-controlled inherits that environment's selection. Its numerator moves
with press coverage, not with events. It is genuine documentation and it is
**not a second measurement** of the same underlying quantity that MHA reports
on; it is a different quantity — *reported* incidents — and it should never be
differenced against official figures as though the two were commensurable.

**How funded.** **I could not establish this.** The About page states only:
"Kashmir Law and Justice Project is an advocacy organization led by Kashmiri
diaspora lawyers … We work with allies around the world. For inquiries or
further information please email us at kashmirlaw@protonmail.com." That is the
entire About page. **No funder is named, no budget, no fiscal sponsor, no
registration number, no jurisdiction of incorporation, no board, no staff
list, no postal address.** The June 2026 PDF's footer gives three ProtonMail /
org contacts and three URLs: `kashmirlaw@protonmail.com`,
`kashmirscholarsnetwork@protonmail.com`, `legal@projectsouth.org`,
`https://www.kljp.org/`, `https://kashmir-scholars.org/`,
`https://projectsouth.org/`. I retrieved the two partners' sites —
`https://kashmir-scholars.org/` HTTP **200**, 159,126 bytes (KSCAN, self-described
as "an interdisciplinary group of scholars from various countries and regions
engaged in research on the region of Kashmir"), and `https://projectsouth.org/`
HTTP **200**, 150,398 bytes (a US organisation whose site is dominated by
US immigration-detention and Southern organising work) — and **neither states
anything about funding the Kashmir series.**

KLJP's funding: **`never-defined`** is wrong here, and `withheld` is wrong here
— nobody has demanded it and been refused. It is **`not-published`**: the
organisation certainly knows its own funding sources. Route: if KLJP or Project
South is a US 501(c)(3), the IRS Form 990 series is a public filing and the
correct route is an IRS/ProPublica Nonprofit Explorer lookup on the filing
entity — but **I did not do this lookup and therefore do not assert that any
such filing exists.**

**Where based.** **I could not establish this either.** "Kashmiri diaspora
lawyers" is the only locational claim on the site, and ProtonMail contacts and
absent addresses are consistent with deliberate non-disclosure. I note without
inferring: the two operating decisions that make KLJP *durable* — being outside
the territory and being unidentifiable — are the same two decisions that make
it **unauditable**. An organisation that cannot be located cannot be verified,
subpoenaed, funded transparently, or checked. That trade is the shape of the
whole finding: what replaced the in-territory documentation is out-of-territory,
anonymous, and compiled from press.

### 5.4 The successor ledger, stated plainly

| Function | Pre-2019/2020 | Now |
|---|---|---|
| In-territory NGO fieldwork series (JKCCS Annual Review) | 2010–2019 annual + 2020 bi-annual | **ceased 12 Aug 2020** |
| Statutory domestic complaints body (J&K SHRC) | 1997 Act | **repealed** 31 Oct 2019 by Fifth Sch. Table-3 item 117 |
| International NGO with in-country operation (Amnesty India) | to 29 Sep 2020 | **ceased 29 Sep 2020** |
| Periodic monthly documentation | — | **KLJP/Project South/KSCAN, Sept 2022 – June 2026, unbroken** |

The gap between August 2020 and September 2022 has **no** periodic
documentation series that I could retrieve from any source. Two years. That
absence is **`not-collected`**.

---

## 6. The composition finding — what the 78 actually are

The parent's subject is whether the capacity *to document rights* is
measurable. The FCRA register turns out to answer a sharper question than the
count does, because it carries `AssociationName`, `Address` and `Nature` for
every active body. I read all 78 rows retrieved on 2026-08-03.

**Geography.** Classifying by address (Leh / Ladakh / Kargil / Zanskar / Nubra /
Padum / 194xxx pincodes), **46 of the 78 are in what is now the Union Territory
of Ladakh** and 32 are in what is now the UT of Jammu and Kashmir. So the
headline "78 FCRA-registered associations in Jammu & Kashmir" is, in current
geography, **32**. And one of the 32 — `Dar-Ul-Fazl Childrens Home`, address
"P.O Box 54, Manali, Dist: Kullu, Himachal Pradesh -175131" — is not in the
territory at all. Call it **31**, with an error bar I cannot close because the
register's own address strings are free text.

**Purpose.** The `Nature` field is drawn from a fixed vocabulary: Religious,
Cultural, Economic, Educational, Social. The modal values are "Educational,
Social" (15), "Social" (15), "Educational" (9). Reading the 78 names: they are
monasteries and gonpas (Hemis, Thiksay, Lamayuru, Rangdum, Phyang, Lingshed),
schools and educational trusts, shrine boards (Shri Amarnathji, Shri Mata
Vaishno Devi), missions and hospitals (Ramakrishna Mission, Diocese of Jammu
Srinagar, John Bishop Memorial Hospital, Society of the Franciscan Sisters of
Mary), a university, health and environment bodies (Leh Nutrition Project,
Ladakh Ecological Development Group, Ladakh Heart Foundation), and a small
number of welfare/development NGOs.

**Not one of the 78 is a human-rights documentation organisation.** There is no
`Nature` value for it — the vocabulary has no such category — and no body on the
list does it. This is worth stating exactly, because it is easy to over-read:
it does **not** show that such bodies were excluded. What it shows is that
**the register cannot represent the activity at all.** "Documenting rights
violations" is not one of the five natures. A body doing it must file as
Educational or Social, and if it does, the register will not show what it does.

Therefore: **the number of J&K organisations with foreign-funding permission
whose function is rights documentation is `never-defined`.** No agreed
definition exists in the instrument that would have to hold it; the FCRA schema
has no category, the parliamentary answers have no category, and no published
Indian dataset classifies associations by whether they document rights. This is
the one absence in this file that no RTI and no Parliamentary Question can cure,
because there is nothing to ask for. A route would have to *create* the
category first. **A placeholder route here would be worse than none, so I give
none.**

That, and not the cancellation count, is the deepest answer to the parent's
question. The capacity of civil society to document rights in Jammu and Kashmir
is **partially measurable and never as such**: you can count registered
associations (78, ex-Ladakh ~31), count cancellations (78 cumulative; 10 in
2020–March 2023), count money (Rs. ~55 crore/year), and count publications
(JKCCS: zero since Aug 2020; KLJP: 45 monthly issues since Sept 2022) — but the
thing itself has no unit, no register, and no definition anyone maintains.

---

## 7. What I could NOT establish — exhaustively

Every one of these is a genuine gap in *my* work, not a claim about the world.

1. **The names of the 78 cancelled J&K registrations.** Not published; not in
   the archive; not in the parliamentary reply. `not-published`.
2. **The dates of any of them.** Same. The only per-association dates
   (`validFrom`/`validTo`/`lastRenewedOn`) sit behind `/api/public/fcra-validity/verify`,
   which needs the 9-digit registration number **and a CAPTCHA per lookup**.
   I did not attempt the CAPTCHA and will not. Even with 78 known registration
   numbers this would be 78 manual lookups, and the cancelled ones are precisely
   the numbers I do not have.
3. **Whether the 78 cancelled include any Kashmir-Valley body doing rights
   work.** Unknowable from published data.
4. **Any refusal, anywhere, named or counted, for J&K.** Nothing published
   at any granularity. The MHA notice of Nov 2024 confirms per-application
   reasons exist and go out privately by e-mail.
5. **Suspensions under s.13 FCRA for J&K.** Zero published data at any level.
6. **A J&K FCRA time series.** Not assemblable from public sources — the
   dashboard is a stock with no history and no archive.
7. **An official record of the SECMOL cancellation.** MHA publishes no s.14
   orders; the only trace I can verify officially is SECMOL's absence from the
   active list, which is not proof of cancellation.
8. **Whether 152680004 and 152680009 were restored after the 2006 gazette or
   whether the register is simply inconsistent.** Two retrieved official
   documents disagree and nothing published reconciles them.
9. **The text of `FCRACancellationOrder_16062016.pdf`.** My download truncated
   at exactly 1,048,576 bytes and `pdftotext` failed with `Invalid XRef entry 15`.
   I do not use it and make no claim about its contents.
10. **The contents of `FCRACancellationOrder_180315.pdf` and
    `FCRACAncellationOrder_270415.pdf`.** Retrieved (HTTP 200) but they are
    image-only scans yielding 64 and 2 bytes of text. Machine-unreadable. I did
    not OCR them.
11. **KLJP's funding.** Not stated anywhere on its site or in its PDFs. I did
    **not** run a US nonprofit-filings lookup and therefore assert nothing about
    whether such filings exist.
12. **KLJP's jurisdiction, legal form, or physical location.** Not stated.
13. **KSCAN's and Project South's roles in funding the Kashmir series.** Their
    sites say nothing about it.
14. **NHRC's post-2019 J&K caseload.** I did not retrieve NHRC data at all.
    Whether the SHRC series has a comparable successor is open.
15. **Whether the erstwhile J&K SHRC's case registers survive and where.**
    Not established.
16. **Whether anything at all was published as periodic J&K rights
    documentation between 12 August 2020 and 29 September 2022.** I found
    nothing; I cannot prove nothing exists.
17. **Whether `jkccs.info`'s intermittent TLS resets are network flakiness,
    rate-limiting, or filtering.** Repeated `curl: (35) Recv failure: Connection
    reset by peer`, succeeding on retry. DNS resolves fine. I cannot
    distinguish the causes and do not speculate.
18. **A PIB press-release ID for the MHA Amnesty statement.** I retrieved the
    statement as a PDF from mha.gov.in. I guessed one PRID
    (`PressReleasePage.aspx?PRID=1659874`), got HTTP 200 and an **unrelated**
    tourism release, and discarded it. **This is exactly the failure mode the
    parent warned about, and I am recording that I walked into it and backed
    out.** I also guessed two URLs for the J&K Reorganisation Act
    (`indiacode.nic.in/bitstream/123456789/12289/…` → 302;
    `mha.gov.in/sites/default/files/JK_Reorganisation_Act_2019.pdf` → 404) before
    finding the real one via search. **Those two non-200s are evidence of
    nothing except my own bad guesses**, and must not be read as documents
    having been removed.
19. **MHA Annual Reports as a source of FCRA statistics.** I did not retrieve
    or read any MHA Annual Report. My §2.3 statement that there is no FCRA
    statistical annual rests on the absence of any such document from the FCRA
    portal's own complete published-document list (`getOcgAndLn`, 33 PDFs, all
    procedural), not on an exhaustive sweep of MHA publications. Treat it as
    established for the FCRA portal and **unverified for MHA at large.**

---

## 8. Absence register (consolidated)

| # | Absent thing | Class | Route |
|---|---|---|---|
| 1 | Names of cancelled FCRA registrations, J&K | `not-published` | RTI, MHA FCRA Wing: name, reg. no., district, date, section, for all s.14 cancellations under state code 15 |
| 2 | Dates of registration / cancellation / renewal, J&K, in bulk | `not-published` | RTI/PQ for bulk extract of `validFrom`, `validTo`, `lastRenewedOn`, status — fields the portal already returns one-at-a-time |
| 3 | Year-wise FCRA registrations *granted*, J&K | `not-published` | RTI for grants 2010–2026 irrespective of current status |
| 4 | Refusals and renewal rejections, J&K, counted | `not-published` | RTI for FC-3A/FC-3C received/granted/refused by year for J&K |
| 5 | Grounds cited in each J&K refusal | `not-published` | RTI for refusals by enumerated ground (the Nov 2024 notice supplies the taxonomy to ask against) |
| 6 | Field-agency inputs underlying refusals | `not-published` | RTI; expect s.8(1)(a)/(g) claim. If specifically requested and refused, reclassify to `withheld` — **not yet, no such request identified** |
| 7 | s.13 suspensions, J&K | `not-published` | RTI/PQ for State-wise suspension orders and durations |
| 8 | Grounds for the 10 J&K cancellations 2020–2023 | `not-published` | RTI for copies of the s.14 orders (s.14 requires a hearing, so reasoned orders exist) |
| 9 | J&K FCRA cancellations as a *time series* | `not-published` | PQ in the RS USQ 3253 form with a year × State grid — proven answerable |
| 10 | s.14 order in respect of SECMOL | `not-published` | RTI for the order, or for all 2025 s.14 orders under state code 15 |
| 11 | Status history of reg. nos. 152680004 and 152680009 | `not-published` | RTI for status-change history of those two numbers |
| 12 | JKCCS documentation 2021–2026 | `not-collected` | none — the fieldwork was not performed; nothing exists to release |
| 13 | J&K SHRC series after 31 Oct 2019 | `not-collected` | none — body abolished by Fifth Sch. Table-3 item 117 |
| 14 | J&K SHRC historic case registers to 31 Oct 2019 | `not-published` | RTI to GAD, UT of J&K, for the record-transfer memorandum and disposal register; RTI to NHRC for J&K complaints/disposals by year since 2019 |
| 15 | Periodic J&K rights documentation, Aug 2020 – Sept 2022 | `not-collected` | none |
| 16 | KLJP funding sources | `not-published` | public nonprofit filings of the filing entity, **if** it is a US 501(c)(3) — I did not verify that it is |
| 17 | KLJP jurisdiction / legal form / location | `not-published` | none that does not defeat the organisation's own security posture; I offer none rather than a placeholder |
| 18 | Count of J&K bodies whose function is rights documentation | `never-defined` | **none — the category does not exist in any Indian register.** A route would have to create the definition first |
| 19 | Events in J&K that went unreported (KLJP's own caveat) | `never-defined` | none — an unobserved-event count has no producible referent |

---

## 9. Where the two traps bite — collected

**Trap (1): a source that looks independent but is media-derived from official
reporting is not a check.** It bites in four places, all named above:
(i) every press figure on FCRA cancellations is a restatement of an MHA
parliamentary answer (§2.3); (ii) the entire SECMOL account available to me is
press narration of an unpublished MHA order (§3.2); (iii) there is no
independent register of foreign-funding permission in India at all, so MHA's
count has no second witness by construction (§1.4); and — the one that is easy
to miss — (iv) **KLJP's monthly series, which is genuinely independent in
governance and location, is media-derived in inputs, by its own printed
admission that "all reporting from IAK is state-controlled" (§5.3).** Its
monthly counts must not be differenced against official counts as though the
two measured the same thing.

**Trap (2): two-sidedness of format does not survive one-sidedness of
production.** It bites hardest on Amnesty (§4.3): I retrieved both statements
in full, on the same date, and quoted both at their strongest — and the
symmetry is cosmetic, because the Government's case rests on application files,
refusal orders and remittance findings that only it holds and has not
published, while Amnesty's rebuttal ("No laws have been broken") could only be
substantiated from those same files. It bites again structurally across this
whole file: **the state side of the J&K rights record is produced by
institutions that still exist and still publish; the civil-society side is
produced by an organisation that stopped in 2020 and a diaspora group that
cannot say where it is.** Any document that sets the two "sides" beside each
other is balanced in format and unbalanced in production, and should say so on
its face.

---

_End. Compiled 2026-08-03 by an Opus 5 research agent. Every URL in this file
was requested by me; every status code is one I observed._
