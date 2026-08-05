# Assessment audit — phases 1–13 against CLAUDE.md as it now stands

**Read-only sweep, 2026-08-05, from `0ab052e`. Nothing was amended. No `/data` commit.**

Scope: 619 records authored before phase 14 — 183 ledger (L-0001…L-0183), 118 provenance
(P-01…P-118), 60 pairs, 258 series. Phase 14's own output (`data/ledger/foreign-trade.json`,
`data/series/foreign-trade.json`, P-119, P-120) is excluded, since it was written against these
rules and would flatter the result.

## How this sweep was conducted, and its limits

Detectors were written deliberately loose and every output treated as a **candidate list, not a
finding** — the rule under audit applies to the audit. Where a detector produced a set small enough
to read in full, it was read in full; where it produced hundreds, a stated sample was read and the
detector was then corrected and re-run. **The single largest result of this sweep is that most
detectors were wrong, not most records.** Two detectors had to be rewritten mid-audit after their
output was read:

- The 5d detector treated "there is no X" as an existence claim. The corpus's actual idiom is
  "there is no **published** X" / "no **official** X" / "not in **any form**" — which is exactly
  what 5d requires. Adding those to the hedge set cut the candidate set from 168 hits to 74, and
  reading those 74 showed most of the remainder are quotations from sources or statements of legal
  fact.
- The share-shaped detector fired on every percentage without a nearby "of", which caught growth
  rates, tax rates and risk weights — none of which is share-shaped at all.

**What was NOT done:** all 619 records were not read end to end. Small candidate sets (5c: 11
records; raw-count: 30; withheld: 1) were read completely. Large sets (5d, share-shaped,
corroboration, single-host) were sampled at 8–14 records each after tightening. Counts below
distinguish *candidates* from *read and confirmed* throughout.

---

## Findings by rule

### 1. T1 on a bare domain root — **REAL DEFECT, 113 records**

The only large, unambiguous, mechanically certain finding in the sweep.

**141 T1 citations across 113 records resolve to a bare domain root** — 50 distinct URLs, led by
`sansad.in/` (15), `indiacode.nic.in/` (13), `mospi.gov.in/` (10), `main.sci.gov.in/` (9),
`ncrb.gov.in/` (5), `pib.gov.in/` (5), `indiabudget.gov.in/` (5), `censusindia.gov.in/` (5),
`morth.nic.in/` (5). A bare root names a *publisher*, not a source: it asserts primary strength for
a citation that retrieves nothing, which is the rule's own wording.

Distribution — and it does **not** favour the early phases:

| phase / layer | count | | phase / layer | count |
|---|---|---|---|---|
| provenance, series, pairs | 49 | | agriculture (7) | 7 |
| rights-institutions (9) | 22 | | baseline (1) | 6 |
| education (10) | 20 | | welfare (4) | 4 |
| infrastructure (5) | 14 | | employment (6) | 3 |
| kashmir-rights (12) | 13 | | kashmir-security (11) | 2 |
| | | | banking (3) | 1 |

**Triage: real defect, but knowingly grandfathered.** CLAUDE.md says "**No new** bare-domain
roots" — the rule was written forward-only, with this corpus in view. These are not violations of
the rule as written; they are the condition the rule was written to stop growing.

**One separate item inside this set:** `internetshutdowns.in` is cited at **T1** (2 citations). It
is a civil-society tracker, not a primary publisher. That is a tier question, not a URL question,
and is the only tier misassignment the sweep surfaced.

### 2. Rule 5c — derived quantity inheriting a contested input — **0 defects, 11 candidates read in full**

Candidates: L-0023, L-0028, L-0029, L-0066, L-0077, L-0094, L-0110, L-0114, L-0158, L-0159, L-0183.

All read. Every hit is a **directly published figure**, not one derived from a contested quantity —
the 14 per cent GST compensation rate, the 4.85 per cent borrowing cost, ophthalmic outcome rates
from a named clinical series. The detector fired on "record carries `differentFacts: true` AND
prints a percentage", which is far too loose: a record may carry a contested pair on one quantity
and print unrelated published percentages elsewhere.

**L-0110 was checked in depth** as the one candidate with the right shape — an 87.7 per cent fall
computed from a series the record itself says was restated. It is not a 5c defect: the record's
`differentFactsNote` states that the contest is *structural, not numeric* ("the second is not a
quantity"), so there is no competing numeric account to inherit, and the figure sits inside an
explicitly attributed passage ("Every measure the state publishes moves the same way").

**Triage: false positive throughout.**

### 3. Rule 5d — existence claim dressed as a claim about the sources — **~3 real, small**

168 raw hits → 74 after correcting the hedge set → of the 14 read, the large majority are
quotations from sources (L-0150, L-0153, L-0159 quote the Union and Kerala verbatim), statements of
legal fact (L-0094: no national definition of sanctioned strength, because recruitment is a state
function), or bounded sets (L-0102: "the only one of the two").

5d names **superlatives** as the loudest symptom, and that is mechanically detectable: **52 hits
across 43 records, 46 unhedged across 40**. Reading 14 of them, most are attributed quotations
(L-0096 and L-0090 both quote the Ministry and ASER's director respectively), checkable legal firsts
(L-0061: statutory standing for gig workers), or checkable statistical firsts (L-0106: the teaching
workforce crossing one crore).

**Genuine candidates, unhedged and in the author's own voice:**

- **L-0032** — "the largest in Indian banking history" (ABG Shipyard, ₹22,842 crore).
- **L-0064** — "the largest internal migration in India's recent history"; repeated as "the largest
  internal displacement in decades".
- **L-0099** — "no other state saw anything comparable"; the record does describe a national
  comparison, so this is the weakest of the three.

**Triage: cosmetic → real at the margin.** Each is a one-clause rewrite ("the largest recorded in
the retrieved material"), none changes a finding.

### 4. The four measurement categories — **0 defects found**

The sharpest sub-test is *agreement between incommensurable instruments read as corroboration*: 86
hits across 63 records, 12 sampled.

Not one is the error. Several are its **opposite** — the corpus naming the error explicitly, in
phases 6 and 12, years before the category was written down:

- **L-0062**: "citing KLEMS as corroboration cites the survey back to itself".
- **jk-psa-detenus-transferred-out**: "The apparent corroboration is not corroboration." — two
  documents three months apart reproducing a single source paper.

The remaining hits are legitimate independent corroboration at T1 (Economic Survey 2025-26
confirming UDISE enrolment; FC-XV para 4.25 confirming the cess share).

**Triage: false positive. The category was a codification of existing practice.**

### 5. The four commitment states, especially (d) misfiled — **not retroactively applicable**

Zero detections, and the honest reading is not that the corpus passes: **phases 1–13 predate the
commitment-state framework entirely**, so their records were never filed into states (a)/(b)/(c) at
all. There is no misfiling because there was no filing. State (d) was derived in phase 14 from
L-0209 and confirmed on L-0213.

**Triage: false positive by construction — the rule does not apply retroactively.** If the framework
is ever applied backwards it is a re-authoring exercise, not a correction, and should be scoped as
one.

### 6. Share-shaped figures with unnamed numerator or denominator — **0 confirmed, 79 candidates**

379 raw hits → 188 after tightening to genuine population-share language, across 79 records. Twelve
sampled; every one names its basis in adjacent text ("manufacturing's **GDP share**", "as a **share
of the all-India total**", "16 per cent **of government primary school teachers**").

**Triage: false positive at the sampled rate.** Not exhaustively verified — this is the one rule
where a full read might still surface individual cases.

### 7. Context before count — findings resting on a raw count — **3 cosmetic gaps, 30 candidates read in full**

All 30 read. **20 already state a positive control or a search scope**, several in a form the
phase-14 rule would accept unchanged:

- **L-0183**: "the word derivation appears zero times in its main report **against a positive
  control of fifty-seven for collection**".
- **L-0155**: "own audit-report index **with a positive control** returns no document containing
  'net proceeds'".
- **P-88 / L-0135 / jk-detenus-psi**: "'Ladakh' returns zero occurrences in every volume up to and
  including PSI 2019 **and 178 in PSI 2020** — a clean binary across eleven volumes".
- **L-0117**: "Established by **exhaustive search across seventeen retrieved reports**".
- **jk-encounters-ct-ops**: "**by two independent searches**".

Of the 10 that looked bare, 7 are detector artefacts on reading — **L-0100**'s zero for "Hindi" is
followed immediately by "Sanskrit is named twice", which *is* a positive control; **L-0128** states a
2,839-answer corpus; **L-0093** lists everything the report does contain; **L-0151** describes what
an argument omits rather than grounding an absence.

**Genuine cosmetic gaps — a stated zero with no control or scope in the record text:**
**L-0127** (Annual Report 2024-25, 'statehood' and 'Article 370'), **L-0133** (Annual Report
2019-20, 'Public Safety Act' and 'detenu'), **L-0105** (the intent notification and caste).

**Triage: cosmetic.** The searches were plainly run; the control counts are not in the record, so a
later reader cannot distinguish an absence from a failed fetch without re-running them.

### 8. Class of sources — absence concluded from a single host — **small residue, cosmetic**

143 `unmeasured` entries carry `not-published` or `withheld`. Of these, **30 across 24 records** sit
in a record citing one host with no second check named in `why`. On reading, several name multiple
documents that the detector missed — `parakh-grade3-proficient-language` names four ("the National
Report, the FAQ, the Operational Guidelines or the document PARAKH publishes as a technical
report"), `jk-security-forces-killed` names seventeen report years.

**Triage: cosmetic, thin residue.** Distribution: education 13, seed 7, kashmir-security 6,
federalism 4.

### 9. `withheld` without named requester, specific request and date — **0 defects**

143 unmeasured entries checked mechanically; exactly one flagged, **L-0114** — and on reading it
names the requester (Prof. M. V. Rajeev Gowda), the specific instrument (Rajya Sabha Unstarred
Question No. 511) and the date (answered 7 February 2018). The detector missed the requester because
it looked for the words "request"/"refused" rather than a named person and question number.

**Triage: false positive. This discipline was applied consistently across the whole corpus**, which
is consistent with the standing note that phases lose `withheld` claims to `not-published` at
authoring time.

---

## The distribution question, answered

**The failures do not cluster in phases 3–6, and the early corpus was not written to a lower
standard.** The one real defect class — bare-domain T1 roots — is spread across every phase and is
*heaviest in the later ones*: rights-institutions (22), education (20) and the shared
provenance/series/pairs layers (49) account for 91 of 141, against 6 in baseline and 1 in banking.

The rules that were expected to expose an early-corpus quality gap — 5c, 5d, the measurement
categories, context-before-count, `withheld` hygiene — found essentially nothing, because **most of
CLAUDE.md was codification of practice the corpus was already following**, written down in phase 14
so it would survive into later ones. Two of the phase-14 rules were being applied, by name, in
phases 6 and 12.

**Recommendation: cheap corrections, no remediation phase.**

## Suggested correction cycles, in priority order

Each is a separate cycle under the L-0021 precedent. None is urgent; none changes a finding.

1. **Bare-root citations (113 records).** The largest and the only mechanical one. Best done as a
   sweep with a gate afterwards — a `no-bare-root` check that errors on new ones and carries an
   explicit allowlist of the 141 legacy citations, so the count can only fall. Deep-linking 141
   citations is research work, not editing, and should be split by file.
2. **The `internetshutdowns.in` T1 tier** (2 citations). One decision, then apply.
3. **Three unhedged superlatives** — L-0032, L-0064, L-0099. One-clause rewrites.
4. **Three bare zeros** — L-0127, L-0133, L-0105. Add the control counts, which requires re-running
   three searches through `tools/scan-text.mjs`.

## What this audit could not establish

- The share-shaped rule was sampled, not exhaustively verified; a full read of the 79 candidate
  records could still surface individual cases.
- Commitment states were not assessed retroactively, because the framework postdates every record
  swept. Whether phases 1–13 *should* be filed into states is a scoping question, not a defect.
- No detector can find a term that matches and means something else. The one instance the sweep did
  surface was found by reading, not by matching.


---

# CORRECTIONS — appended 2026-08-05 by correction cycle 1

Appended rather than edited in place, so the errors stay visible. Each names what it supersedes.

## C1. The bare-root count was understated. Supersedes finding 1's headline.

Finding 1 reported **141 T1 citations across 113 records**. That was the T1 slice only, because the
detector filtered on `tier == 'T1'`. The full figure is **313 bare-root citations across 255
records — 302 unique (record, url) pairs**:

| tier | citations |
|---|---|
| T1 | 141 |
| **no tier at all** | **99** |
| T4 | 50 |
| T2 | 13 |
| T3 | 6 |
| T5 | 4 |

The 99 untiered citations are the more interesting half and finding 1 missed them entirely: a source
with neither a tier nor a retrievable URL asserts nothing a reader can check in either dimension.
`data.worldbank.org/` alone accounts for 14 of them.

## C2. The `internetshutdowns.in` tier finding was WRONG. Supersedes finding 1's closing paragraph.

Finding 1 said `internetshutdowns.in` is "cited at **T1** (2 citations)… a civil-society tracker, not
a primary publisher… the only tier misassignment the sweep surfaced." **Every part of that
characterisation is wrong except the count.**

Reading the two T1 citations — which the audit did not do, having stopped at the tier field:

- **L-0139** cites, at T1, *"Government of Jammu and Kashmir, Home Department, Government Order No.
  Home-01 (TSTS) of 2025 dated 14 January 2025… Retrieved twice and matched in every particular: once
  from an Internet Archive capture of the Department's own file, and once live from the SFLC.in media
  directory."*
- **L-0140** cites, at T1, *"at least eleven distinct 2025 J&K suspension orders re-hosted on the
  organisation's own infrastructure… One retrieved live, rendered and matched in every particular
  against the archive copy… the other ten inventoried by filename only and not opened."*

The T1 document is a **government order**. SFLC.in is the host that serves it. CLAUDE.md's own rule
is to tier "**by the document actually retrieved rather than the institution behind it**", so T1 is
correct and the corpus was applying the rule the audit accused it of breaking. The same tracker is
cited at **T3** where the document is its methodology page (P-54, L-0081) and at **T4** where the
document is its homepage disclaimer (P-95) — the corpus tiers the same host three ways according to
what was retrieved from it, which is the rule working exactly as written.

**There is no tier misassignment.** The only defect in those two citations is the bare-root URL, and
they are already in the allowlist under finding 1.

**The audit error worth naming:** a tier was judged from the `tier` field and the host name without
reading the `name` field beside them. That is the context-before-count failure in a new dress — a
field value is no more a finding than a count is.

## C3. No citations were deep-linked this cycle, and the reason is specific.

Correction cycle 1 built the gate and fixed nothing. Every candidate host returned HTTP 000 to a
plain request — **including `pib.gov.in`, from which this session retrieved dozens of documents.**
The cause is the broken system resolver already recorded for this machine, not dead hosts:
`dig @1.1.1.1` resolves them (`sansad.in` → 164.100.252.170, `mospi.gov.in` → 103.210.81.67), and
`curl --resolve` works. `www.indiacode.nic.in` is a CNAME to `indiacode.nic.in.edgesuite.net`.

So deep-linking needs a resolver pin per host AND, after that, per-citation research to locate the
document the `name` field describes and match it. That is a research cycle, not a sweep, and calling
it cheap was wrong.

**Revised recommendation for cycle 2:** work one host at a time, pin first, and delete allowlist
entries as each citation is verified — the gate now forces that deletion, so progress is visible in
the entry count and cannot be faked.


## C4. C1 was also wrong. The "99 untiered" do not exist. Supersedes C1's table.

C1 reported that the largest group of bare-root citations was **99 with no tier at all**, and called
them the worst class in the set because they assert nothing checkable in either dimension.

**All 99 carry a tier.** The detector looked for `tier` inside the object holding `url`; on series
the tier sits on the *record*, beside `source`, not inside it. Checked directly: of the 99, the
count with a tierless parent record is **zero**.

This is the third iteration of one error in two cycles — the original tier finding, C2's correction
of it, and now C1's own count — and every iteration is the same mistake: **a single field read
without the fields beside it.** It is now a rule in CLAUDE.md, along with the scope rule that would
have caught the 141-versus-313 undercount at the time.

The bare-root defect itself is unchanged and real: 313 citations across 255 records. What is wrong
is only the claim that 99 of them lacked a tier.


## C5. Cycle 2's `gdp-per-capita-usd` value defect does not exist. Supersedes it.

Correction cycle 2 flagged "a 42 per cent gap that is not a revision" between the World Bank API's
1,553.88 for India in 2014 and the record's 1,094.5, and queued it as a probable value defect.

**There is no defect.** `gdp-per-capita-usd` is the only peer panel in `seed.json` that lists
countries ALPHABETICALLY — BGD, CHN, IDN, IND, VNM — where all twelve others list India first.
India's recorded 2014 value is 1,553.9 and its 2024 value is 2,592.0, matching the API's 1,553.88
and 2,591.99. The 1,094.5 is Bangladesh's.

The coincidence that made it look like a partial match was load-bearing: Bangladesh's 2024 figure
(2,593.4) sits within 0.05 per cent of India's (2,591.99), so the "2024 agrees, 2014 does not"
pattern looked like a currency-basis problem rather than a wrong row.

**Fourth iteration of one error** — `points[0]` read without the `country` field beside it. The
series is now deep-linked, and its citation carries a note naming the alphabetical ordering so the
next reader does not repeat it.

## C6. The real defect found by cycle 3's sweep: `credit-gdp-peer`.

Verifying all thirteen peer series' India values against the API on both years, eleven are clean.
Two differ by plausible revisions (`cereal-yield-peer` 2024 by 0.8 per cent,
`agri-value-per-worker-peer` 2024 by 3.7 per cent). One does not:

**`credit-gdp-peer` records 51.5 (2014) and 55.0 (2024); WDI returns 51.88 and 41.61.** 55.0 appears
nowhere in WDI's India series for any year from 2010 to 2024, and in no peer's 2024 cell.
`FD.AST.PRVT.GD.ZS` returns values identical to `FS.AST.PRVT.GD.ZS`, so this is not a choice between
codes. Cycle 2 attached a WDI indicator URL to this series on a 0.74 per cent near-match at 2014 and
called the difference a vintage revision; **that identification does not survive checking the second
point.**

No value was changed. The record names *IMF Financial Soundness Indicators* as a co-source and its
figures may come from there. WDI's own India series also breaks between 2015 (51.87) and 2016
(38.20) — a 13.7-point one-year fall that is a definitional change, and the likeliest reason
credit-to-GDP diverges between publishers. The citation now states all of this and that the
indicator is not established.
