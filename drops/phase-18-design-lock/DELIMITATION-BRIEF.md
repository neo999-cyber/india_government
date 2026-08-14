# National delimitation — scope settled, primaries retrieved, one fact short of a record

**Raised 2026-08-13 by the phase-13 check. Scope settled. Two primary documents retrieved and held.
The record is still not written, and the reason is now specific rather than general.**

---

## 1. THE BRIEF'S OWN PREMISE WAS WRONG, AND RETRIEVAL IS WHAT SHOWED IT

The first version of this brief argued the record was in scope **even though nothing had happened
yet** — a pending constitutional trigger, on the `L-0225` precedent.

**Something has happened.** Three Bills were introduced in Lok Sabha on **16 April 2026**, and two of
them are the subject:

- **Bill No. 107 of 2026** — the Constitution (One Hundred and Thirty-first Amendment) Bill, 2026
- **Bill No. 108 of 2026** — the Delimitation Bill, 2026

Both texts were retrieved in this run and are quoted below. **A brief written from the corpus alone
asserted a state of the world that one retrieval overturned** — which is rule 5d's whole point,
demonstrated against my own writing.

---

## 2. WHAT THE PRIMARIES SAY — verbatim, from documents retrieved 2026-08-13

**Retrieval path:** both PDFs from `prsindia.org/files/bills_acts/bills_parliament/2026/`. Under the
mirror rule the document keeps the tier it earns — **a Bill as introduced in Lok Sabha is a primary**
— and the path is recorded because the host is not the publisher.

### Bill No. 107, on the freeze

> *"4. In article 82 of the Constitution,–– … (d) the third proviso shall be omitted."*

**The third proviso is the freeze.** The Bill's own Statement of Objects and Reasons says what it
does:

> *"The third proviso to article 82 and the third proviso to clause (3), of article 170, inter alia,
> provide that there shall be no fresh readjustment of constituencies until the relevant figures for
> the first census taken after the year 2026 have been published."*

### On the size of the House

> *"(1) The House of the People shall consist of— (a) not more than eight hundred and fifteen members
> chosen by direct election from territorial constituencies in the States; and (b) not more than
> thirty-five members to represent the Union territories…"*

### On which census

> *"'population' means the population as ascertained at such census, as Parliament may by law
> determine, of which the relevant figures have been published."*

### THE STATED OBJECTIVE IS NOT SEAT REALLOCATION — AND THIS IS THE FINDING

The Statement of Objects and Reasons puts women's reservation first, and delimitation as its vehicle:

> *"6. The next census and the consequential delimitation exercise thereafter will take considerable
> time and thus, delay the effective and dedicated participation of women in our democratic polity.
> Hence, the objective of the proposed Bill is to operationalise one-third reservation for women…
> through delimitation exercise to be undertaken on the basis of the population figures of the latest
> published census."*

It also records what the earlier amendments did:

> *"The Constitution (Eighty-fourth Amendment) Act, 2001 amended articles 55, 81, 82, 170, 330 and 332
> to freeze the allocation of seats … on the basis of the 1971 census until the first census conducted
> after the year 2026, while providing for the readjustment of territorial constituencies on the basis
> of the figures of the 1991 census."*

> *"the Constitution (Eighty-seventh Amendment) Act, 2003 amended articles 81, 82, 170 and 330 to
> provide for readjustment of territorial constituencies … based on the figures of 2001 census,
> without affecting the total number of seats allotted to the States."*

### Bill No. 108, the machinery

> *"to provide for the readjustment of the allocation of seats in the House of the People to the
> States and Union territories…"* and it defines *"'latest census figures' means the latest census
> figures published as on the date of the constitution of the Commission"*.

---

## 3. THE ONE FACT THAT STOPS THE RECORD

**A think-tank bill tracker states the Constitution (131st Amendment) Bill was NEGATIVED in Lok Sabha
on 17 April 2026** — the day after introduction. Read verbatim from that page:

> *"Introduced Lok Sabha Apr 16, 2026 · Negatived Lok Sabha Apr 17, 2026"*

**That is an ACCOUNT, and under the mirror rule an account is T4.** The primary was sought and not
retrieved:

- `sansad.in/ls/legislation/bills` returns **HTTP 200 and a JavaScript shell** — the bill table is
  empty in the HTML and the page itself says to *"refer to the Gazette copies of the Acts and Bills
  for authentic version"*. **Under rule 3 that is not a retrieval.** No data endpoint is exposed in
  the served HTML.
- `loksabha.nic.in` returns **HTTP 000** and does not resolve under `dig +short @1.1.1.1`.
- `egazette.gov.in` is up (HTTP 200), **but a negatived Bill is not gazetted** — only enacted Acts
  are, so the gazette cannot confirm a defeat.

**Environment fact established in this run, per M1** (retested from a second client): 
`legislative.gov.in` returns **403 to WebFetch and 200 to curl with a browser user-agent.** It is not
unreachable; it refuses one client.

### WHY THAT ONE FACT IS DECISIVE

**The verdict turns on it entirely.** If the Bill was defeated, the record is about an attempt that
failed; if it is live, the record is about a pending change. Those are different records with
different assessments.

**And a verdict resting on a single T4 account is exactly what this instrument refuses.** The
governing principle: *no record or claim stands on a source that is not credibly independent of what
it establishes* — and one tracker, uncorroborated, on the pivotal fact, is not a basis for scoring
the defeat of a constitutional amendment.

---

## 3b. A SECOND ATTEMPT, 2026-08-13 — MORE ACCOUNTS, STILL NO RECORD

Retried with the variables varied, per M1. **The outcome is now multiply attested and still entirely
T4.** What the accounts add:

- **The division figures.** One legal-news report: *"298 members present out of 528 members present
  and voting approved the Bill, 230 members voted against it."* A search summary gives the same
  298/230 and puts the special-majority threshold at 352.
- **The companion Bill was WITHDRAWN.** The same report's headline: *"Centre Withdraws Delimitation
  Bill."* That is a second event and is not the same as a defeat.
- **The mechanism.** A constitutional amendment needs the Article 368(2) special majority — two-thirds
  of those present and voting AND more than half the total membership.

**None of it moves the tier.** The legal-news report is **paywalled beyond the summary** and, on its
own account, **does not cite the Lok Sabha's own record**. Every other hit is an aggregator, a
coaching-notes site, an encyclopaedia or a commentary blog. **Independence is satisfied — these are
outside the government — but the tier is not: they are accounts, and an account is T4 however
official its subject.**

**This is the shape the corpus already names as thinnest.** `L-0014` carries the note *"THE SOURCING
IS ALSO THE THINNEST IN THE CORPUS FOR A SCORED CLAIM: one T4 trade-press note"* — and that record
scores something far smaller than the defeat of a constitutional amendment.

**Two facts are now owed rather than one**, and both sit in the same document:
1. the division on the Constitution (131st Amendment) Bill, and
2. the withdrawal of the Delimitation Bill.

## 3c. THIRD ATTEMPT, 2026-08-13 — ONE MORE T1 GAINED, THE OUTCOME STILL NOT REACHABLE

**Gained, and it is a real gain:** a PIB release dated **17 APR 2026** — *"Union Home Minister … 
replies in Lok Sabha to the discussion on the Delimitation Bill, 2026; the Constitution (131st
Amendment) Bill, 2026; and the Union Territories Laws (Amendment) Bill, 2026"*. **A government
primary establishing that the debate happened, on that date, on all three Bills together.**

**It carries no outcome, and would not.** Searched in full: no *negatived*, no division, no *Ayes*, no
withdrawal. A government release does not publish a defeat, and its absence there is not evidence of
anything.

**Every remaining route to the division was tried, resolver and client varied per M1:**

| route | result |
|---|---|
| `eparlib.sansad.in` — the Digital Library, where the Bulletins live | **resolves to 164.100.166.186 and returns HTTP 000, plain AND pinned.** Genuinely unreachable from here, not DNS |
| `sansad.in/ls/debates/view-debate?...` — the official transcript | **JS shell: 5,860 bytes, 0 characters of visible text.** Rule 3 — not a retrieval |
| `sansad.in/ls/legislation/bills` | JS shell, empty table, no data endpoint in any of its 8 bundles |
| `eparlib.nic.in`, `loksabhadocs.nic.in`, `loksabha.nic.in` | do not resolve |
| `egazette.gov.in` | up — **but a negatived Bill is never gazetted** |
| `web.archive.org` | HTTP 498 |

**Three attempts, three different approaches. The division is not reachable from this environment.**

## 3d. AND IT COULD NOT BE WRITTEN EVEN IF I ACCEPTED T4

This is the decisive point, and it is not about sourcing etiquette.

**The assessment would be wrong.** `too-early` asserts that the outcome is not yet known. **The
outcome IS known** — multiple independent accounts say the Bill was negatived on 17 April 2026 — and
I simply cannot source it at T1. Writing `too-early` would publish a false assessment while the
sources say otherwise; writing `failed` would rest a scored verdict about a constitutional amendment
on accounts alone.

**There is no admissible value.** That is why the record waits for one document rather than being
written around it.


## 3e. FOURTH ATTEMPT, 2026-08-14 — THE OUTCOME IS NOW T1, AND THE BLOCKER IS GONE

**The document was never the only route. Parliament publishes a JSON API and nobody here had looked
for it.**

### THE ENVIRONMENT FACT THAT WAS WRONG

Recorded in CLAUDE.md and quoted here because it is what stopped three attempts:

> *"`sansad.in` serves a JavaScript shell for its bill list AND its debate transcripts: HTTP 200, an
> empty table, 0 characters of visible text, and no data endpoint in any of its bundles."*

**It refuses one CLIENT, exactly as `legislative.gov.in` and `www.pib.gov.in` do.** To curl with a
browser user-agent, `sansad.in/ls/debates/text-of-debates` returns **319,236 bytes** of server-
rendered Next.js, and the site exposes a public JSON API at **`/api_ls/`** and **`/api_rs/`**. The
endpoint inventory was recovered from the Wayback CDX index over the domain, not guessed.

### WHAT THE API ESTABLISHES — all retrieved 2026-08-14, all T1

`GET https://sansad.in/api_rs/legislation/getBills?house=Lok%20Sabha&billStatus=Negatived&...`

> `billNumber 107 · "THE CONSTITUTION (ONE HUNDRED AND THIRTY-FIRST AMENDMENT) BILL, 2026" ·`
> `billCategory "Constitutional Amendment Bill" · ministryName "LAW AND JUSTICE" ·`
> `billIntroducedDate "2026-04-16 00:00:00.0" · **status "Negatived"**`

`GET https://sansad.in/api_ls/debate/debate-search?loksabha=18&sessionNumber=7&searchKeyword=Delimitation`

> `dbSlno 5667 · debateDate "17/04/2026" · debateTypeDesc "GOVERNMENT BILLS" · debateTitle`
> `" The Constitution (One Hundred and Thirty-First Amendment) Bill, 2026 and Union Territories`
> `Laws (Amendment) Bill, 2026 and Delimitation Bill, 2026?Contd.. - **not passed**"`

`GET https://sansad.in/api_ls/business/getAllLoksabhaAndSession?locale=en`

> 18th Lok Sabha, **session 7: "28/01/2026 to 02/04/2026", "16/04/2026 to 18/04/2026"**

**The outcome the record waited on is established by the House's own database, on two independent
endpoints, and it agrees with the T4 accounts.**

### AND ONE PLACE THE T4 ACCOUNTS ARE CONTRADICTED

The legal-news report headline was *"Centre Withdraws Delimitation Bill."* Parliament's API says:

> `billNumber 108 · "THE DELIMITATION BILL, 2026." · billCategory "Financial Bill" ·`
> `billIntroducedDate "2026-04-16 00:00:00.0" · **status "Pending"**`

**"Withdrawn" is a value this API can emit** — `getBillStatus` returns
`["Withdrawn","Negatived","Assented","Passed","Pending","Lapsed","Removed","Repealed","Part-discussed"]`
— and 90 Lok Sabha Bills carry it, most recently one introduced 2025-08-18. So the field is
populated, not vestigial.

**Two readings and this brief picks neither.** Either the Bill was not withdrawn, or the database has
not been updated for it. **What weighs against the second:** Bill 107 was before the House on the
same day and its status DID move. **A record must not assert the withdrawal on the T4 headline
alone**, and it cannot assert the negative either — the honest entry is that the House's database
carries the Delimitation Bill as pending, and says why that is contested.

### WHAT IS STILL NOT HELD, WITH THE SEARCH STATED

**The division figures — 298 for, 230 against, threshold 352 — remain T4 and are not in the API.**

- **Bulletin Part I.** The archive convention was read off live URLs, not guessed:
  `getFile/bull1mk/{ls}/{session-in-roman}/{DDMMYYYY}.pdf?source=loksabhadocs`. **Positive control
  passed** — `18/III/02112024.pdf` returns a 30-page PDF, `18/I/24062024.pdf` an 18-page one. Under
  session `VII`, six known session-7 sitting dates and three date formats all return 404.
- **The verbatim debate text.** Same method on `getFile/debatestextmk/{ls}/{session}/`. **Positive
  control passed** (`15/I/0306.pdf`, 211 KB); `18/VII/` returns 404 in every form tried.
- `eparlib.sansad.in` **retested in all four combinations** — http and https, plain and pinned to
  164.100.166.186 — and returns 000 in each. Unreachable, not misresolved.

**Named routes were exhausted with a positive control beside them. That is not the same as "not
published"** and this brief does not say it is: for a sitting four months old, not-yet-uploaded is
at least as likely as not-published, and nothing here distinguishes them.

### STATUS AFTER THIS ATTEMPT

**Closed:** the outcome. `Negatived` is T1, on the record of the House itself.

**Open, and it is now a drafting question rather than a retrieval one:** the record's assessment. The
brief's own §3d said no value was admissible because `too-early` would be false and `failed` would
rest on T4 alone. **The second objection is answered.** The first still holds, so `too-early` is out.

**Still owed, and neither blocks the record:** the division figures, and the true status of the
Delimitation Bill.


## 3f. FIFTH ATTEMPT, 2026-08-14 — THE WITHDRAWAL HAS A POSITIVE CONTROL AND FAILS IT

**The Delimitation Bill question is now answered as far as the record can answer it, and the answer
is stated as what the sources CONTAIN.**

`GET /api_ls/debate/debate-search?loksabha=18&sessionNumber=7&fromDate=17/04/2026&toDate=17/04/2026`
returns the **complete eight-item record of that day's business**: papers laid, two committee
presentations, a ministerial correction, two statutory resolutions (both *adopted*), a point of
order, and the single GOVERNMENT BILLS entry covering all three Bills. **No withdrawal motion, and
no division record.**

The same index for **18/04/2026** returns **one item** — *"The Speaker made Valedictory Reference on
the conclusion of the 7th Session"*. No legislative business on the session's last sitting day.

### THE POSITIVE CONTROL, WHICH IS WHAT MAKES THE ABSENCE MEAN ANYTHING

Searching session 7 for `withdraw` returns five matches, and one is exactly the form a withdrawal
takes in this index:

> *"The Jan Vishwas (Amendment of Provisions) Bill, 2025-**Withdrawn**"* — 17/03/2026

**So the index records Bill withdrawals, with that suffix, and did so in this very session a month
earlier.** Its silence on the Delimitation Bill is therefore an observation and not a gap in
coverage. It sits alongside the legislation database carrying Bill 108 as `Pending` while emitting
`Withdrawn` for 90 other Lok Sabha Bills.

**What this does NOT license.** It is not a finding that no withdrawal happened — that is a claim
about the world, and rule 5d governs it. It is a finding that **two parliamentary indexes which
demonstrably record withdrawals record none for this Bill.** A record may state that; it may not
state the negative existential.

### THE DIVISION FIGURES: THE SEARCH IS NOW EXHAUSTIVE AND STILL EMPTY

Every route tried, each with a control where one exists:

| route | result |
|---|---|
| `getFile/bull1mk/18/VII/` — Bulletin Part I | 404 on six known sitting dates, three date formats. **Control passes:** `18/III/02112024.pdf` is a 30-page PDF |
| `getFile/debatestextmk/18/VII/` — verbatim text | 404 in every form. **Control passes:** `15/I/0306.pdf`, 211 KB |
| `api_ls/debate/synopsis-*`, `uncorrected-*`, `participationInBills` | 404 on every parameter style copied from the working `debate-search` call |
| a division or voting endpoint | **none exists** in the Wayback CDX inventory of `api_ls`/`api_rs` |
| the day's own eight-item business record | carries no division |
| `eparlib.sansad.in` | 000 in all four combinations — http and https, plain and pinned |

**The figures are not reachable from here, and this is now a stated search rather than an
impression.** 298/230 against a threshold of 352 remains T4 and unretrieved in any run since.

## 4. WHAT A RESEARCH PASS NEEDS TO DO — and it is now one step, not a survey

**Retrieve the Lok Sabha record of 17 April 2026.** Bulletin Part I, the day's Revised List of
Business, or the debate transcript. Any one of them settles it and makes the record writable
immediately, because everything else is already held and quoted above.

**Then the assessment follows from what that document says**, and the rulings narrow it:

- **Negatived** → the record is about a failed attempt. Note the special-majority requirement for a
  constitutional amendment; whether it fell for want of that is itself a fact to retrieve, not to
  infer.
- **Still live** → `too-early`, on the `L-0225` shape.
- **`undated-commitment` is wrong either way** — Ruling 3 covers a commitment with no deadline, and
  the freeze has one in the instrument.
- **`no-objective` is wrong** — the objective is imposed by the Constitution and stated in the Bill's
  own Statement of Objects and Reasons. Ruling 5.

**Two traps, both live:**

1. **`date` against `term`.** The validator warns only on the late side from 2026-08-13 — narrowed
   for exactly this class — so an instrument date decades before the term is expected. **Do not
   back-date a record to silence a warning.**
2. **Rule 5d on the distributional claim.** *"Southern states will lose seats"* is a projection, not a
   measurement. It must carry its method and attribution, or a range with each bound attributed, or
   not be stated. **Note that the Bill's own stated objective is women's reservation** — a record that
   leads with seat reallocation is describing the effect rather than the announced purpose, and under
   the two-truths discipline both belong on the page.

---

## 5. STATUS

**Closed:** phase-13 completeness; the scope question; and the premise that nothing had happened,
which retrieval overturned.

**Held:** both Bill texts, quoted above, retrieved 2026-08-13.

**Owed:** one primary — the Lok Sabha record of 17 April 2026 — and then the record itself.
