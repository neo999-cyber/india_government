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
