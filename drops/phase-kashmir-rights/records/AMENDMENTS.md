# AMENDMENTS — phase 12, kashmir-rights

**Proposals only. Nothing here has been applied. No live record was edited by this stage, and `/data` was not touched.**

Each item states the record, exactly what changes, the evidence, and why it is an amendment rather than a new record.

---

## L-0081 — "Internet shutdowns and Anuradha Bhasin compliance"

**Three amendments, of which the first is a one-token defect and the second is a tier problem.**

### (a) `domains` is a defect — add `kashmir`

L-0081 carries `domains: ["governance"]` while its own `summary` names the J&K suspension as the longest in
India's history, and **P-54, which L-0081 itself references, already carries `affectsDomains: ["governance",
"kashmir"]`.** The provenance record is broader than the ledger record that depends on it. This is a
one-token amendment and it should be made whether or not any new J&K shutdown record lands.

**Why an amendment and not a new record:** the finding does not change. Only its filing does.

### (b) The `not-collected` on an official count now has two retrieved T1 primaries, where it had none

L-0081's second `unmeasured` entry reads "No central register of shutdown orders is published",
`reasonKind: not-collected`, with no primary source anywhere in the corpus behind it. Two now exist and both
were retrieved in this phase:

- **Rajya Sabha Unstarred Question No. 1791, answered 10 March 2021**, verbatim: *"Centralized data of
  internet shutdown is not maintained by the Ministry of Home affairs. Orders issued by the Ministry of Home
  Affairs (MHA) are available at MHA website."*
  `https://www.mha.gov.in/MHA1/Par2017/pdfs/par2021-pdfs/rs-10022021/1791.pdf` — **T1, retrieved.**
- **Standing Committee on Communications and Information Technology, 26th Report, December 2021**, Part VII
  "Official Data on Internet Shutdown", paras 22-26, 39-41, retrieved in full from an Internet Archive
  capture of the Lok Sabha Secretariat's own file dated the day after presentation.

The second sentence of the parliamentary answer is a real limit and must travel with it: **the Union does
publish its own orders.** What it does not maintain is centralised data on shutdowns generally. The absence
is precisely at the point of aggregation across the federal boundary.

**This confirms `not-collected` rather than disturbing it** — and it upgrades the classification from
inference to admission. The mechanism is also now stated by the Ministry itself (26th Report para 26): a
national counting apparatus exists, internet suspension was classified outside its ambit, and *"there is no
proposal in MHA at least to collect this information at a central level."*

### (c) The January 2024 sentence is J&K-specific and is T4 on the evidence actually held

L-0081's `summary` and `caseFor` state that the Court "reiterated the publication requirement in January
2024". On the relayed evidence that reiteration was made in **Foundation for Media Professionals v. UT of
Jammu and Kashmir, MA 1086 of 2020** — a *J&K compliance* proceeding, not a fresh case or a general
restatement. **This phase could not retrieve either the 30 January 2024 or the 23 February 2024 order.** The
only index into the Supreme Court's opaque document identifiers is CAPTCHA-gated and was not bypassed as a
matter of conduct; the alternative host is a Cloudflare interstitial whose sole archive capture is a capture
of the interstitial.

**Amendment: either retrieve the order or re-tier the assertion to T4/RELAYED. It should not stand as
though it were T1.** If the sentence is kept in L-0081 it should say the reiteration was in a J&K compliance
proceeding; if that fact moves to a J&K record it should be removed from L-0081.

---

## P-54 — "Internet shutdown counts: no official series, three unofficial ones"

**Two amendments.**

### (a) The trackers are not merely "unaudited" — three of the four are not mutually independent

P-54 says the trackers are "unchallenged but also unaudited". What is now established **from their own
published methodology pages** is stronger and different: **they are not mutually independent, so their
agreement is not corroboration.**

- SFLC.in states, verbatim: *"At the moment, almost all of our raw data is collected from reports published
  in national and regional newspapers … we currently rely entirely on secondary sources."*
- Access Now names SFLC as a data source and its 2025 India rows link to SFLC's media files.
- Top10VPN names SFLC in its own methodology.
- Only Internet Society Pulse detects independently of both press and government, and it is the least cited.

**Why an amendment and not a new record:** P-54's subject is exactly this — the disagreement between the
unofficial counts. Authoring a second provenance record on the same instruments would duplicate it. (Note
that the provenance id space is now exhausted in any event — see NOTES.md.)

### (b) `when` and `whatChanged` should carry the 22 November 2024 regime change

P-54's `when` is "2012-2026" and its `whatChanged` describes only the tracker disagreement. **The statutory
basis changed on 22 November 2024**, when the Telecommunications (Temporary Suspension of Services) Rules
2024 commenced, and those rules **require publication of every suspension order.** That is a counting-basis
event for any future official series and P-54 is where it belongs.

### (c) NOT proposed: duplicating PR-15

**PR-15 must not be duplicated.** For J&K specifically its B-side is no longer empty after January 2020, so
a J&K pair is a *different* pair rather than a restatement. `PR-38` in this drop is authored on that footing
and says so in its own `notes`.

---

## L-0121 — "Deaths in Army and central-force custody have no cell in any official instrument"

**Four amendments, of which the second materially qualifies the record's own `caseAgainst` and the third
is a tier upgrade.**

### (a) Tier: the Fifth Schedule source moves T4 → T1

L-0121's third source reads: *"J&K Reorganisation Act 2019, Fifth Schedule Table-1 entry 86 … and Table-3
entry 117 … Relayed - indiacode.nic.in failed DNS resolution and the bare Act text was not retrieved; must
not be quoted as verbatim primary"*, tier **T4**.

**Both entries are now confirmed verbatim from the Gazette**, retrieved in this phase at
`https://egazette.gov.in/WriteReadData/2019/210407.pdf` (MD5 `0e16a53f5e362636f3d65294e562259f`, verified
byte-identical against an independent copy). Table-1 entry 86 reads *"The Protection of Human Rights Act,
1994. — Proviso to sub-section (2) of section 1 shall be omitted"* — **including the Gazette's own
misdating of the central Act as 1994**, which phase 11 relayed correctly and which is in the instrument, not
in the relay. Table-3 entry 117 reads *"The Jammu and Kashmir Protection of Human Rights Act, 1997. — XV of
1997."*

**Amendment: replace the source with the Gazette citation, move the tier to T1, and strike the "must not be
quoted as verbatim primary" warning.** The record's finding does not change; its evidence does.

**Method rule that falls out and should travel:** where the Gazette and India Code disagree, quote the
Gazette. India Code is a consolidation; the Gazette is the instrument.

### (b) "No savings provision" should be qualified — and the qualification strengthens the finding

L-0121's `caseAgainst` says the State Human Rights Commission "was extinguished on 31 October 2019 with
roughly 630 pending complaints and **no savings provision**." Having now read the Act, that is not quite
right, and what replaces it is better.

**Section 100 "Transfer of pending proceedings" exists and is not limited to courts:** *"Every proceeding
pending immediately before the appointed day before a court (other than High Court), **tribunal, authority
or officer** … shall … stand transferred to the **corresponding** court, tribunal, authority or officer of
that Union territory."* But s.100(3)(b) defines "corresponding" as *"the court, tribunal, authority or
officer in which, or before whom, the proceeding would have laid **if it had been instituted after the
appointed day**"*, or, in case of doubt, such body as may be determined by the UT administration or the
Central Government.

**So the machinery exists and cannot reach these complaints.** A complaint that would have lain before the
SHRC could not have been instituted after the appointed day at all, because Table-3 entry 117 repealed its
enabling Act on that very day. Limb (i) is empty; limb (ii) is discretionary and **no retrieved document
shows it was exercised.**

**Amendment: replace "no savings provision" with "a general transfer provision whose own definition of a
corresponding authority cannot be satisfied where the same Act abolished the authority, with a discretionary
fallback that no retrieved document shows was exercised."** This slightly weakens the bare wording and
strengthens the finding: Parliament turned its mind to pending proceedings in general and the abolished
commissions still fell through.

### (c) Add an `unmeasured` — deaths of J&K detenus in prisons outside the territory

A second structural hole of the same family, and it is **not** covered by the existing entry, which is about
Army and central-force custody. NCRB's unit of account is the State or UT police and the holding prison
answers to a different State, so **a J&K PSA detenu who dies in a prison in another State is a judicial-custody
death attributed, if anywhere, to that State and severed from J&K entirely.** One such death is documented —
a detenu who died in Naini jail, Prayagraj, on 23 December 2019, whose family learned of it only afterwards.

Proposed: `reasonKind: not-collected`; **no `wouldFill`**, and deliberately, for the same reason as phase
11's B1 — creating the count requires a change to NCRB's schedule, not a request. (This drop carries the
same absence on `jk-psa-detenus-transferred-out`; whether it is better placed there or here is a stage-5
judgement.)

### (d) The NCRB Chapter 16A sources are recoverable and should be re-retrieved

L-0121's first source is graded T4 on the ground that "ncrb.gov.in gave no HTTP response in this phase and
the volumes were not retrieved from the host." **That failure was a DNS resolver artefact.** Two independent
routes work from this machine: `dig @1.1.1.1 ncrb.gov.in` → `45.127.74.245`, then `curl --resolve`; and
`curl` to `web.archive.org` for the `id_` raw-snapshot form. Thirteen full PSI volumes were retrieved in this
phase by those routes. **The Chapter 16A findings do not need to stay relayed.**

**Note the correction to a claim that circulated inside this phase and must not be propagated: the browser
User-Agent is not what fixes `ncrb.gov.in`. The `--resolve` is.**

---

## L-0123 — "Two J&K security quantities lost their only legislative route in 2018, and it did not resume in 2024"

**Four amendments. The third is a scope qualification that cuts against the record's generality, and the
fourth must be stated at a very precise strength.**

### (a) The Act text is retrieved — sources move T4 → T1

L-0123's first source carries: *"Relayed: indiacode.nic.in failed DNS resolution and neither section 32(1)
nor section 46(1) was retrieved as bare Act text, so neither may be quoted as verbatim primary."*

**Both are now retrieved verbatim from the Gazette.** s.32(1): *"…the Legislative Assembly may make laws …
with respect to any of the matters enumerated in the State List **except the subjects mentioned at entries 1
and 2, namely 'Public Order' and 'Police'** …"* s.46(1) proviso (c): *"Provided that the Lieutenant Governor
**shall**, after consultation with the Speaker of the Legislative Assembly, make rules— … (c) for prohibiting
the discussion of, or the asking of questions on, any matter which affects the discharge of the functions of
the Lieutenant Governor…"*

**Amendment: add the Gazette as a T1 source and strike the warning.** Note the verb: **"shall … make
rules"**, not "may". Phase 11 could not establish whether such rules exist; that question is now *sharper*
rather than answered — the Act mandates them, so their absence, if they are absent, is a separate fact worth
having.

### (b) A third quantity, better evidenced than either the record carries

**PSA detention figures were answered on the floor of the J&K Legislative Assembly**, on the exact quantity
that is unpublished today:

- **October 2010** — the Chief Minister, who also held the Home portfolio, informed the Assembly that **724
  people had been detained in 2009 and 2010, of which 322 between January and September 2010**.
- **March 2010** — the J&K Home Department, answering an opposition legislator, gave details of **334 persons
  booked under the PSA between 5 January and 14 February 2010 alone**.

Both relayed through Amnesty International ASA 20/001/2011, retrieved and read. **Carry the internal
contradiction with them: 334 in six weeks against 322 in nine months.** Amnesty's own comment — "The real
numbers may be even higher" — is the counting body flagging the state's own inconsistency.

**Proposed: add PSA detentions as a third quantity in `whatHappened`.** The forum that produced these answers
is now barred from the subject matter by s.32(1).

### (c) SCOPE QUALIFICATION — the termination is subject-matter-specific, not chamber-wide

L-0123's finding is that the restored assembly is barred from the subject matter, so the route did not
resume. **That holds for security. It does not hold for revenue subjects.** Domicile and land are Revenue
Department matters within the UT legislature's competence, and **the restored assembly demonstrably worked
the route twice in 2025**, extracting the two quantities the Union had not published:

- **April 2025** — 83,742 domicile certificates granted to persons described as "non-state subjects" in the
  preceding two years.
- **31 October 2025** — 631 non-resident land buyers, 386 kanal, Rs 129.97 crore, split by division.

**The Union's own statement of the competence boundary supports this**, given six weeks after the appointed
day (MHA to Rajya Sabha, 11 December 2019, verbatim): *"The powers to make laws under the State List and
Concurrent List that relate to land and property are vested with the Legislative Assembly of the Union
Territory of Jammu and Kashmir."*

**Amendment: qualify the record's scope — the 2018 termination and 2024 non-resumption are
subject-matter-specific.** The finding is not weakened; it is made precise, and the precision is what makes
it a finding about s.32(1) rather than about the assembly.

### (d) A live Assembly host exists — STATE THIS AT EXACTLY THIS STRENGTH AND NO FURTHER

L-0123's caveat records that `jklegislativeassembly.nic.in` could not be reached. **That host is genuinely
dead — NXDOMAIN on multiple resolvers — so the caveat was true as to that host and remains true as written.**

What is now correctable is the *conclusion* it supports. **A live J&K Legislative Assembly web presence
exists on the National e-Vidhan platform at `jkla.neva.gov.in` (resolves 45.127.75.72, HTTP 200), with a
sibling `.nic.in` control resolving normally in the same command.** It was used in this phase **only for a
member directory**, from which this drop takes one fact: ninety honourable members and, on the directory's
own filter, **zero nominated members**, as at 3 August 2026.

**DO NOT write that L-0123's relayed T4 sources can now be upgraded to T1.** Whether that host carries the
*proceedings and question answers* L-0123 depends on — the March and October 2010 PSA replies, the
pellet-injury and local-recruitment answers, the 2025 refusals — **is not established.** Finding the site is
not finding the documents. **Recommend the check; do not assert its result.**

---

## P-86 — "The producer and the publisher of the J&K security figures became the same ministry"

**Same amendment as L-0123(a):** P-86's `sources[]` carry the identical warning on s.32(1). The Gazette is
retrieved; add it as a T1 source and strike the warning. The record's finding does not change.

**A second, optional extension, flagged rather than pressed.** The relay formula P-86 records as
*"(Source: UT of J&K)"* on the security series is the same chain this phase found on **eleven separate
replies** covering domicile and land, in the words *"As per the information provided by the Government of
Jammu & Kashmir"*. If stage 5 prefers one record for the chain, P-86 should be extended to revenue subjects
and `P-89` in this drop trimmed to its unit-and-category findings. If it prefers two, they stand as authored.
**This is a stage-5 call and either is defensible.**

---

## P-83 — "Custodial deaths: the unit of account is the State police, and the J&K series breaks on 31 October 2019"

**Confirmed on the documents rather than amended, with one refinement.**

Phase 11 recorded the break as landing in *Prison Statistics India* Table 8.1 and *Crime in India*
Chapter 16A. **Thirteen PSI volumes were retrieved in this phase and the break is confirmed exactly** — J&K
at Sl. No. 10 in the STATES block with zero occurrences of "Ladakh" anywhere in the volume through PSI 2019,
and at Sl. No. 33 in the UNION TERRITORIES block with Ladakh at Sl. No. 34 from PSI 2020.

**The refinement: the break is a property of the volume's single State/UT list and therefore governs every
table in the volume, not Table 8.1 alone.** It applies to every J&K quantity anyone ever draws from PSI.

**And a second fact phase 11 could not see without the volumes: the break in the instrument is fourteen
months later than the break in the referent.** PSI 2019's reference date of 31 December 2019 is sixty-one
days after J&K ceased to be a State, and that volume still reports a State of Jammu & Kashmir with Ladakh
folded in and no footnote at the row.

**No amendment is required. Recorded here because the confirmation is worth having on the record and because
the volume-wide point extends the record's reach.**

---

## L-0083 — "UAPA use, bail and conviction rates"

**One amendment, mechanical, and it belongs in `caseAgainst`.**

Amnesty International ASA 20/5959/2022 (retrieved and read) found the **UAPA invoked alongside the PSA in
179 of 569 PSA habeas corpus petitions in 2022 — 31 per cent — and only in Srinagar-wing petitions**, none
in Jammu. It also reports a 12 per cent increase in UAPA use in J&K since 2019 from published NCRB data.

**The point for L-0083 is mechanical: the PSA and the UAPA are used in combination on the same person, so the
s.43D(5) bail bar and a preventive detention order operate together, and neither series shows the other.**

L-0083's existing `unmeasured` records that NCRB does not maintain UAPA-against-journalists data. **This is a
different absence: no instrument shows the PSA/UAPA overlap at all, and it is visible only because an NGO
read a court docket.** Whether to add it as a second `unmeasured` entry or to carry it in `caseAgainst` is a
stage-5 judgement; the evidence supports either.

---

## L-0010 — "J&K floods and assembly election" (baseline)

**Do not "correct" the 65.91 per cent. Add the basis.**

L-0010 records 65.91 per cent turnout for the December 2014 assembly election. Widely circulated accounts,
and the ECI's own headline, say 65.52 per cent. **Both are printed in the same ECI statistical report, seven
pages apart:**

- p. 6, HIGHLIGHTS: electors who voted **at polling stations** 4,794,374 → **65.52 %**
- p. 13, ELECTORS DATA SUMMARY: 2,499,904 + 2,294,469 + 1 + **postal 28,402** = 4,822,776 → **65.91 %**

**L-0010's value is the postal-inclusive turnout and it is correct.** The ECI's headline excludes postal
ballots. **Amendment: leave the value alone and put the basis on the face of it.**

Note for completeness that the equivalent cannot be computed for 2024, because the ECI has published no
statistical report for the 2024 J&K assembly election — or for any of the eight state assemblies polled that
year.

---

## The three baseline records — L-0003, L-0005, L-0010

`records/BASELINE-DOMAINS.md` decided their substantive domains and expressly did **not** apply them,
because a `/data` edit at source is phase 4b. **That decision stands and nothing in this drop disturbs it.**
Recorded here only so the two files are read together:

- **L-0003** → `["governance", "kashmir"]`
- **L-0005** → `["governance", "kashmir"]`
- **L-0010** → `["governance", "kashmir"]`, with the flood half carrying no domain because no value fits
  without being stretched.

Every record authored in this drop carries a substantive domain alongside `kashmir`, so the three-baseline
defect is not repeated.

---

## The two undecided enum shapes — which records in this drop are which

The phase brief forbids proposing a new value and requires each record of either shape to be filed on the
written definition with the stretch recorded in `assessmentNote`. **Every one below does that.** They are
listed together so the decision can be taken across the whole set rather than record by record.

**L-0086 shape** — in force, testable in principle, awaiting external adjudication. Filed `too-early`:

| Record | What is in force | What is awaited |
|---|---|---|
| **L-0127** | The undertaking to restore statehood | Applications pending before the Supreme Court since October 2025 |
| **L-0134** | The power to lodge a J&K detenu outside the territory | Challenge transferred to the High Court on 16 May 2023, undecided |
| **L-0139** | The Telecommunications (Temporary Suspension of Services) Rules 2024 in J&K | Whether every post-commencement order is published with reasons, and whether any has been set aside |
| **L-0143** | The five nominated seats, in force since 26 December 2023 | Whether they carry a vote — before the High Court, adjourned repeatedly |

The strain is the same in all four and is stated on each: **`too-early` was written for a measure that needs
time to work, and these are measures that need a decision.** L-0143 is the sharpest instance, because the
provisions have been in force for two and a half years and have **never once been exercised**.

**L-0092 shape** — presentational findings. Filed `contested`:

| Record | The presentational fact |
|---|---|
| **L-0129** | The official Constitution prints the C.O. 272 substitution as good law four and a half months after five judges held it ultra vires, and prints it corruptly |
| **L-0141** | Delimitation — the value is carrying a *weighting* dispute rather than an evidentiary one |

A third presentational finding sits **inside** L-0143 rather than defining it: the statute says **nominate**
and the Government's own account of its own Bill says **reservation**, five times, on the day the Bill
passed. A reserved seat is filled by election and its holder has an elected member's rights; a nominated seat
is filled by discretion and carries no stated rights at all.

**No new enum value is proposed anywhere in this drop.**
