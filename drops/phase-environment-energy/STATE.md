# Phase 15 — environment and energy. State.

**B1 `<this commit>` arc A: renewables against coal, plus the 226-invisible-marks fix.**

## BATCH 1 CLOSED — 2026-08-05. Arc A only.

**11 records: L-0221, L-0222 in `data/ledger/environment.json` (NEW FILE); P-121, P-122 appended to
`data/provenance.json`; seven series in `data/series/environment.json` (NEW FILE). Corpus 662 → 673.**

Both new files are 1-space, matching `provenance.json`, `pairs.json` and the plurality of ledger
files. **`data/ledger/foreign-trade.json`, `education.json`, `baseline.json`, `kashmir-*.json` and
`rights-institutions.json` are 2-space** — indentation is NOT uniform in this repo and a wrong-indent
write reformats the whole file. Measure the file you are writing.

## The arc's spine, in one line

**Non-fossil plant is 54.18 per cent of installed capacity and supplies 29.2 per cent of the
electricity.** Every Indian renewable target is written in capacity; the one commitment written in
energy is the one nobody reports against.

## What is authored

| id | subject | assessment |
|---|---|---|
| **L-0221** | the capacity/generation gap; the 50 per cent milestone; the 51.5 per cent figure | `partly` |
| **L-0222** | thermal-coal-import stop missed in its own year; production +85pc; new-coal build doubled | `failed` |
| **P-121** | four concurrent official boundaries for "renewable"; large hydro reclassified Mar 2019 | `obscures` |
| **P-122** | RES generation imputed not metered up to FY2013-14 — break at the UPA baseline | `overstates-pre-2014` |

Series: `res-capacity-share` · `res-generation-share` · `non-fossil-capacity-share` ·
`non-fossil-generation-share` · `coal-production` · `coal-plf` · `coal-imports-total`.

## NOT DONE — the live backlog

### 1. Arc A remainder — grid absorption, curtailment, storage

*What:* whether renewable output is being curtailed, and what storage exists against it. *Why
deferred:* room; the arc's spine was the capacity/generation distinction and it is complete without
this. *Depends on:* CEA RE Generation Portal daily reports (`gen-re.cea.gov.in/reports`, retrieved,
live) and the NEP's BESS scenarios (already retrieved in `nep.pdf`, Exhibit 5.5a carries
38.71–67.04 GW / 193.55–335.2 GWh across scenarios).

### 2. Arc B — air quality. NOT STARTED.

NCAP (launched Jan 2019, target and base year to be retrieved), CPCB monitoring network, `delhi-pm25`
is a ONE-POINT series (2014, 153 µg/m³, T2 WHO) and needs a spine. **`cpcb.nic.in` (45.127.74.241)
shows the same TLS-reset fingerprint as Grid-India: TCP OPEN, handshake reset, zero bytes read.**
Vary the host before concluding anything — CPCB data is also carried by state boards and by the
National Clean Air Programme portal.

### 3. Arc C — forest clearances. NOT STARTED.

ISFR's definition of "forest cover" (plantations, orchards and tea gardens are the known trap),
the Van (Sanrakshan Evam Samvardhan) Adhiniyam 2023 amendment, FCA diversion figures, CAMPA.
`fsi.nic.in` resolves to 14.139.254.74 and returned 302; `moef.gov.in` (164.100.221.70) is live and
carries 126 KB of text.

### 4. Arc D — the wider climate-commitment set. PARTLY PRE-EMPTED.

The electricity limbs are done in L-0221. What remains: the emissions-intensity limb (45 per cent by
2030 from 2005, the only base year named anywhere in the set), the 1-billion-tonne carbon reduction,
the 2.5–3 billion tonne carbon sink, and **net-zero-by-2070**. Expect the user's flagged shape:
**net-zero 2070 with no interim phasing is likely state (d), unfalsifiable by construction — do NOT
force it to (a) because a year is named.** A year with no phasing and no interim target cannot fall
due before it arrives. A total WITH a date is (a); this one needs its wording retrieved before the
test is applied.

### 5. L-0052 and `re-capacity` — CORRECTIONS OWED, RAISED NOT APPLIED

`/data` edits at source are an operator decision. Four items, all evidenced in the log entry:
- `unmeasured[0].reasonKind` is `not-published`; **the datum is published** — CEA's monthly RE report
  carries tables literally titled "Monthly Renewable Energy as % of Total Electricity Generated".
  The record's own `why` says "in anything retrieved", which was right; the `reasonKind` overclaimed.
- The `unmeasured[0]` entry can be **closed outright**, not re-graded — `res-generation-share` and
  `non-fossil-generation-share` now supply exactly what it asks for.
- `caseFor` rests on "renewables meeting over half of demand in a peak month". That is the 51.5 per
  cent figure, which is a single-instant power ratio on 29 July 2025. See L-0221's caveat.
- Sole source is a bare root, `https://mnre.gov.in/`, graded T1.
- **`re-capacity`'s notes and L-0052 both attach 283.46 GW to July 2025.** It is a capacity stock as
  on 31.03.2026.

### 6. The rendering audit, only half run

Phase 15 swept the LEDGER layer for fields that render nowhere and found two (`assessmentNote` 164,
`revisitTrigger` 62). **The series and provenance layers have not been swept.** The audit is one
loop: for each schema field, count records carrying it against records whose own built page contains
it. Anything at zero is invisible.

## Retrieval notes — pins and traps, verified this run

**Pins (all returned real text bodies):** `cea.nic.in` 45.127.74.41 · `gen-re.cea.gov.in`
164.100.114.49 · `mnre.gov.in` 164.100.51.103 · `coal.nic.in` / `coal.gov.in` 164.100.166.94 ·
`moef.gov.in` 164.100.221.70 · `fsi.nic.in` 14.139.254.74 · `npp.gov.in` 45.127.74.236 ·
`www.pib.gov.in` 94.202.207.57.

**Traps, each paid for this run:**
- **Large PDFs on `cea.nic.in` truncate silently at HTTP 200** and still pass `file(1)` as a PDF.
  The General Review failed twice at ~2 MB of 12.15 MB; the NEP returned 1.19 MB of 19.54 MB. `HEAD`
  for `Content-Length`, then `curl -C -` or `--retry 5 --retry-all-errors`, and check extracted TEXT
  length. **Measure text, never bytes and never the status code.**
- **`unfccc.int` serves a 212-byte Incapsula stub at HTTP 200** for a `.pdf` URL, and `pdftotext`
  accepts it rather than refusing. A cookie-jar two-step plus `?download` worked for the stage-2
  agent and did NOT reproduce in the main loop or through `WebFetch`. Treat as client-dependent.
- **`pib.gov.in` without `www.`** returns HTTP 301 with a 0-byte body. Use `www.`, and append
  `&reg=3&lang=1` or the request 302s to a Hindi variant. Older releases live at
  `/newsite/PrintRelease.aspx?relid=NNNNN`.
- **`grid-india.in`, `posoco.in`, `cpcb.nic.in`:** TCP OPEN, TLS handshake reset, zero bytes read,
  identical across three clients, four IPs and three resolvers. **Not a claim that they are down** —
  one estate, one observation.

## Method this batch added, in CLAUDE.md

**A schema field with no view renders nowhere and every gate stays green.** `reachability` guards a
LIST; a field absent from it is unguarded by construction. When a field is added to a schema, it is
added to the type, to a view, and to the guarded-marks list in the same commit. TypeScript does not
save you — `revisitTrigger` was absent from `LedgerRecord` for its whole life and `typecheck` was
green throughout.

---

# BATCH 2 QUEUE — written 2026-08-05 BEFORE resolution

Recorded first so that each item stands on its own if the batch dies. Every item states the
defect, why it matters, and what would settle it. **(a)–(f) are unresolved as written here.**
(g) is a carried correction. Anything below that is later resolved keeps its statement of the
defect intact and gains a RESOLUTION line — the statement is not rewritten to match the answer.

## (a) The Arc A headline compares a stock to a flow without establishing the periods

L-0221 and the batch-1 report pair **54.18 per cent capacity** with **29.2 per cent generation** as
one comparison. But 54.18 − 29.2 = **24.98**, against a stated endpoint gap of **21.46**. Those
cannot both be the same comparison. The 21.46 comes from FY2023-24 (44.97 capacity − 23.51
generation, CEA General Review Tables 1.2/1.3); the 54.18 is at 30.06.2026 and the 29.2 is FY2025-26.
**Establish the as-of date and period of each figure and state them at every site the pair appears.**
Capacity is a STOCK at a date; generation is a FLOW over a year. Facing tables in one publication are
not automatically one period — that assumption is what produced a three-figure headline with two
different gaps in it. *Depends on:* nothing external; `GR2025.txt`, the CEA installed-capacity report
for 30.06.2026 and PIB 2250039 are all on disk or re-retrievable from the pins in this file.

## (b) L-0222's 264.53 MT may not measure the limb it is scored against

L-0222 scores `failed` against "India will stop importing **thermal** coal from FY2023-24" and cites
**264.53 MT** for FY2023-24. In the source table (Coal Controller / DGCI&S Table 8.1) 264.53 is the
**Total Coal** column — coking plus non-coking. Coking coal is not thermal coal and is not
substitutable for geological reasons the record itself concedes. **Verify against the primary on disk
which quantity 264.53 is.** If it is total coal, the headline evidence does not measure the limb and
must be restated to the non-coking figure (205.72 MT on the same row) **whether or not the verdict
survives the restatement.** A verdict that survives on a different number is still a verdict that
cited the wrong one. *Depends on:* `Import-of-Coal-and-Coke-last-ten-years.pdf`, already retrieved.

## (c) L-0221's `partly` may be discounting a met commitment for someone else's reporting error

L-0221 is `partly` while its own `caseFor` says the capacity milestone is real and was met early on a
metric fixed in advance. The `partly` rests on Panchamrit element 2 (energy requirements) being
unreported. **Confirm what the commitment as recorded actually covers.** If the record's
`claimAtLaunch` covers the capacity limb only, then scoring `partly` marks down a commitment that was
met, on the ground that *third parties misreported a different limb* — and misattribution by a
publisher is a measurement fact, which belongs in **provenance**, not in a verdict. If it covers both
limbs, `partly` stands. Note element 2 is state (a), not yet due, which on its own cannot support a
markdown. *Depends on:* L-0221's own text and PIB 1768712, both on disk.

## (d) "COP26 announced no such goal" is wrong as written

L-0221 and the batch-1 log say two releases attribute to COP26 a goal "which COP26 did not state".
**COP26 is where Panchamrit was announced, including the 500 GW non-fossil capacity goal.** As
written the sentence denies that, and it is false. The real defect is narrower and survives: the
**50 per cent** limb announced at Glasgow was *"50 percent of its energy requirements from renewable
energy"* — an ENERGY share of a RENEWABLE numerator — whereas the *"50 per cent of installed
capacity from non-fossil sources"* target comes from the **August 2022 NDC update**. The releases
fuse element 2's percentage with the NDC's denominator and label the result COP26. **Restate to the
specific limb everywhere the claim appears** — it appears in L-0221's `whatHappened`, and in the
verification-log entry for cycle 2026-08-05af, which is append-only and takes a superseding entry
rather than an edit.

## (e) P-122's seam is not carried by the derived gap comparison that spans it

P-122 places the RES-generation basis seam at FY2014-15 and establishes the pre-seam (normative)
basis as the HIGHER one. The gap series and L-0221's "widened from 9.69 to 21.46" **start at
FY2013-14, on the imputed side of that seam.** So the opening gap is understated and the widening
overstated, by an amount nobody has quantified. **The `breaks[]` contract binds the SERIES; it does
not reach a derived comparison stated in a ledger record's prose.** That is a structural gap in the
break machinery, not only a wording problem. Either the derived claim carries the caveat in its own
text, or the start-year comparison goes and the claim starts at FY2014-15. *Depends on:* nothing
external.

## (f) The corpus arithmetic does not add up

Batch 1 reports the corpus moving **660 → 673**, thirteen records, while naming **11 additions**
(2 ledger + 2 provenance + 7 series). **Account for the remaining 2.** Candidates to check before
assuming: whether 660 was the correct pre-batch count or was itself carried from the phase-14
STATE.md without re-measurement; and whether any series were added to `seed.json` or elsewhere
between 966eb6a and 7124b1f. *Depends on:* `git show 966eb6a:` versus the working tree, both local.

## (g) The four L-0052 / `re-capacity` corrections raised in batch 1

Raised with evidence in batch 1 and NOT applied. Under the source-edit amendment (see CLAUDE.md,
"Build workflow") a correction the batch itself raised and evidenced may be applied by the run.

1. **`L-0052.unmeasured[0].reasonKind` is `not-published` and the datum is published.** CEA's
   monthly RE report carries tables titled **"Monthly Renewable Energy as % of Total Electricity
   Generated"** and **"Cumulative Renewable Energy as % of Total Electricity Generated"**, by State
   and All-India. The record's own `why` says "in anything retrieved", which was the honest form;
   the `reasonKind` asserts something about the world and four retrieved documents falsify it.
2. **The same `unmeasured[0]` entry can be CLOSED, not re-graded** — `res-generation-share` and
   `non-fossil-generation-share` now supply exactly the quantity it asks for.
3. **`L-0052.caseFor` rests on "renewables meeting over half of demand in a peak month".** That is
   the 51.5 per cent figure, which is a single-instant GW/GW power ratio for **29 July 2025**
   (solar 44.50 + wind 29.89 + hydro 30.29 = 104.68 GW over 203 GW), not a month.
4. **`re-capacity`'s notes and L-0052's `whatHappened` both attach 283.46 GW to July 2025.** It is a
   capacity stock **as on 31.03.2026**. Also: `L-0052`'s sole source is a bare root,
   `https://mnre.gov.in/`, graded T1.

---

# BATCH 2 RESOLUTIONS — 2026-08-05

Each item's statement of the defect above is left as written. These are the answers.

**(a) RESOLVED, and the headline was wrong.** The three figures are not one comparison.
`54.18%` is a non-fossil share of installed CAPACITY, **a stock as on 30.06.2026** (CEA installed-
capacity report). `29.2%` is a share of GENERATION, **a flow over FY2025-26** (PIB 2250039, "during
2025-26 (up to March 2026)"). They are a quarter apart and are different kinds of quantity, so
`54.18 − 29.2 = 24.98` is a subtraction nobody should perform. `21.46` was always the FY2023-24 pair
(44.97 capacity at 31.03.2024 − 23.51 generation over FY2023-24) and was correct.
**The matched FY2025-26 pair, both from CEA *Executive Summary March 2026*:** non-fossil capacity at
31.03.2026 = (8,780 nuclear + 274,688.09 RES-incl-large-hydro) ÷ 532,739.68 total = **53.21%**;
non-fossil generation over FY2025-26 = (55.19 + 167.20 + 310.59) ÷ 1,847.94 = **28.84%**; gap
**24.37 points**. L-0221's summary now leads on that pair. *Residual, stated in the record:* even a
matched pair sets an END-OF-PERIOD capacity stock against a WHOLE-PERIOD flow, so the gap is
somewhat overstated; CEA publishes no average-capacity series. Note also CEA and PIB differ slightly
on the same quantity (28.84% from CEA's components against PIB's published 29.2%).

**(b) RESOLVED, and the record cited the wrong quantity.** Coal Controller / DGCI&S Table 8.1 has
three quantity columns — Coking, Non Coking, Total Coal. FY2023-24 reads coking **58.813** +
non-coking **205.718** = total **264.531**. So 264.53 MT is TOTAL coal including coking, and the
commitment named THERMAL coal. Coking coal is metallurgical and not substitutable, which L-0222's
own caseFor concedes. **The verdict survives — 205.72 MT against a target of zero is a total miss and
is itself the series maximum — but the evidence has been restated to the non-coking column**, with
the total retained as context and labelled as such.

**(c) RESOLVED — `partly` stands, but its ground was wrong and has been narrowed.** The conditional
does not obtain: L-0221's `claimAtLaunch` names BOTH limbs verbatim, the 500 GW capacity limb and
"India will meet 50 percent of its energy requirements from renewable energy by 2030". So the record
scores a two-limb package, not a single met commitment discounted for a third party's error.
**But the ground cited in the assessmentNote was partly a reporting fact** — that two releases
restate the capacity limb and misattribute it — and that is a fact about PUBLISHERS, not about what
the government achieved. It has been moved to **P-123** and removed from the verdict's ground, which
now rests on one thing only: element 2 is the sole limb of the five with no reporting of any kind,
so a reader cannot track it before 2030.

**(d) RESOLVED — the sentence was false and is corrected in two places.** "COP26 announced no such
goal" is wrong: Glasgow is where Panchamrit was announced, including the 500 GW non-fossil CAPACITY
goal. The defect is narrower and survives — the 50 per cent limb announced at Glasgow was 50 per cent
of **energy requirements** from **renewable** energy, while "about 50 per cent of cumulative electric
power installed capacity from non-fossil sources" is the **August 2022 NDC update's** goal 4. The
releases fuse element 2's percentage with the NDC's denominator. Corrected in L-0221's
`whatHappened` with the withdrawn wording quoted inside the correction, and written up as **P-123**.
The verification-log entry for cycle 2026-08-05af carries the same wrong sentence and is append-only,
so it takes a superseding entry rather than an edit.

**(e) RESOLVED — the comparison's start year moved.** The widening ran from FY2013-14, which sits on
the IMPUTED side of P-122's basis seam where RES generation is normative and higher than metered.
That understates the opening gap and overstates the widening. **The `breaks[]` contract binds the
SERIES and does not reach a derived comparison stated in a record's prose — that is a structural gap
in the break machinery, not only a wording problem, and it is logged as such.** The claim now runs
**FY2014-15 (10.98 points) to FY2023-24 (21.46)**, entirely on the actual-generation basis, and the
record states why the start year moved.

**(f) RESOLVED — nothing is unaccounted for; the base was wrong.** Measured across the boundary:
`966eb6a` held ledger 220 + series 262 + provenance 120 + pairs 60 = **662**. `7124b1f` held 222 +
269 + 122 + 60 = **673**. 662 + 11 = 673 exactly. **"660" was phase 14's closing figure**, before the
assessment-audit sequence added L-0219 and L-0220. STATE.md and the verification-log entry both say
662 → 673 correctly; the wrong figure appeared only in the spoken batch report, quoted from the
phase-14 STATE.md instead of measured — the stale-index hazard, in speech rather than in the repo.

**(g) APPLIED under the narrow source-edit amendment** (now written into CLAUDE.md, Build workflow).
All four, each carrying the withdrawn wording inside the correction:
1. `L-0052.unmeasured[0].reasonKind` `not-published` → `not-collected`, and the entry **closed**,
   because `res-generation-share` and `non-fossil-generation-share` now carry exactly what it asked
   for. The record's own `why` had said "in anything retrieved", which was the honest form.
2. `L-0052.caseFor` no longer rests on "renewables meeting over half of demand in a peak month".
3. `L-0052.whatHappened` and `re-capacity.notes` — 283.46 GW redated from July 2025 to **31.03.2026**,
   and the 51.5 per cent pairing removed from the series note.
4. `L-0052`'s bare-root T1 source `https://mnre.gov.in/` replaced with a deep-linked CEA document.

**ITEM 8 — the adversarial reviews read `/data`, NOT the deployed site, so their coverage was not
vacuous and the closure note stands unamended.** `tools/gen-review-extract.mjs` reads
`join(ROOT, 'data', 'ledger')` and writes `review/adversarial-extract.md` from a committed fixed
sample; it never touches `out/` or the deployment. The extract renders `assessmentNote` inline under
**Verdict** (38 verdict paragraphs in the file), so reviewers saw verdict reasoning wherever a record
carried it — and the review's finding that 33 verdicts carried none was a true finding about `/data`,
correctly obtained, which is what drove triage 3 and 4 to write them.
**The corollary is worth more than the answer.** Had the reviews been run against the deployed site —
the more "realistic" choice, and the one a future cycle might reach for — every verdict would have
appeared to lack reasoning, and the reviewers would have reported a corpus defect that was really a
rendering defect. The extract pipeline's independence from the rendering pipeline is what protected
the review, and that independence should be preserved deliberately rather than by luck.

---

# BATCH 3 HEAD ITEMS — resolved 2026-08-05

**1. The gap series is regenerated and the terminal years now agree.** The four share series ran to
FY2023-24 while the corrected headline quoted FY2025-26 — they did not meet. Extended from CEA
*Executive Summary March 2026*: capacity **FY2025-26 only** (31.03.2026 is a published stock;
31.03.2025 is not — both guessable archive URLs 404, consistent with CEA publishing only the current
month), generation **FY2024-25 and FY2025-26**. So `non-fossil-capacity-share` has a deliberate hole
at FY2024-25 and its generation twin does not. **Blanks are unreported, not zero.**
- **Opening gap FY2014-15: 10.98 points** (31.53 capacity − 20.55 generation). First year after
  P-122's seam, which is why the claim starts there.
- **Closing gap FY2025-26: 24.24 points** (53.21 − 28.96).
- Intermediate FY2023-24: 21.46.
- **Terminal year of headline and series is now the same, FY2025-26.**
- **The seven batch-1 series did NOT carry a superseded basis.** They were computed from General
  Review Tables 1.2/1.3 and that construction is the one the corrected headline now uses. What was
  superseded was the headline's CHOICE OF PAIR, which never existed in a series at all.

**AND A BASIS DEFECT FOUND WHILE DOING IT, in a figure this run wrote.** The 28.84 per cent carried
since batch 2 put CEA's **Bhutan import inside the denominator and outside the numerator** — an
import in one and not the other, a population mismatch inside a share, and precisely the class this
instrument exists to catch. Three constructions are defensible and the one that was here is not:
removing the import from both sides gives **28.96** (the General Review basis, and what the series
uses); counting the imported hydro on both sides gives **29.27**, close to the Ministry's published
29.2. Corrected to 28.96. The gap moved 24.37 → **24.24**, and `figure-consistency` then caught that
24.24 is the difference of the UNROUNDED ratios while the printed operands give 24.25 — declared as
a rounding artefact in the record's own text.

**2. FY2023-24 IS the maximum of the non-coking series specifically** — 205.718 MT, against
159.388 · 149.365 · 161.245 · 183.510 · 196.704 · 164.054 · 151.504 · 181.615 · **205.718** · 186.046
across FY2015-16 to FY2024-25. It is also the total-coal maximum. **The claim survives the (b)
restatement**, and the record already bounds it correctly as "the highest in the published ten-year
table" — the table spans ten years and nothing older is in it.

**3. THE TWO HOSTNAMES SERVE THE SAME BUILD UNDER DIFFERENT PROTECTION — SEE THE REPORT.**
`india-government.vercel.app` returns **HTTP 200 unauthenticated**; `india-government-anoop-osn.vercel.app`
returns **302 to Vercel SSO**. Same edge IPs, same content. Mechanism:
`ssoProtection = { enabled: true, deploymentType: "all_except_custom_domains" }`. **Not changed by
this run — an auth change is a stop condition and may be deliberate.**

**5. (e) STAYS DEFERRED, with a measured rate and a named next step.** `tools/seam-span-report.mjs`
is written and is **report-only, not in the build**: 117 record-by-break spans, **88 declare the
break, 29 do not**. Twenty-nine is a candidate list, not a defect count — the heuristic matches any
year anywhere in a record's prose against any break on any series it cites, so it over-fires.
**L-0222 is in the 29 and is a false positive**: it names FY2013-14 and FY2024-25 for COAL quantities
while citing the non-fossil generation share for context, and crosses P-122's seam in no claim at
all. Gateable once the 29 are triaged per record and the heuristic narrowed — most likely to periods
co-occurring in one sentence rather than anywhere in the record. **The guard-scope class is now a
rule in CLAUDE.md.**

**6. reachability 1332 → 1336 is exactly P-123 and P-124**, each contributing a guarded `notes` and a
guarded `bridgeNote` (both provenance marks since batch 2). Verified by recomputing the mark count at
`193ab72` and `de66d65` from the same MARKS list: 1332 and 1336. **No pre-existing record's mark
count changed.**

**6b. The extract/verdict overlap, and it QUALIFIES item 8 without overturning it.** The extract
samples **38 records, all scored, so all 38 owe a verdict paragraph.** At the extract's generating
commit `1d08a2f`, **30 of the 38 already carried an `assessmentNote`** — so reviewer coverage of
verdict reasoning was substantive, not vacuous, and item 8's conclusion stands. **But the records the
audit later wrote reasoning into were overwhelmingly OUTSIDE the sample: only 3 of them are in it
(L-0066, L-0023, L-0011).** So the reviewers' observation that verdicts lacked reasoning rested on
roughly 8 of their 38, and the corpus-wide figure was established by the AUDIT, not by the reviewers.
*Measurement note:* 37 records gained an `assessmentNote` after `1d08a2f` against the log's figure of
33 unjustified verdicts; the difference is at least partly corrections written in the same sequence
(L-0011's note begins "CORRECTED ... adversarial triage 2"), and **the decomposition has not been
done** — 37 is what was measured, 33 is what the log claims, and they are not asserted to be the same
set.

## ARC B — AIR QUALITY: **TARGET RETRIEVED. OUTTURN NOT. REVISION NOT. NO LEDGER RECORD.**

State it in those four clauses and not as one word — it is neither BLOCKED nor DONE, and the two
halves are blocked for different reasons that must not be collapsed:

| Piece | State | Blocking cause, specifically |
|---|---|---|
| **The target's wording** | **RETRIEVED**, T1 | none — MoEFCC Annual Report 2020-21 carries it verbatim |
| **The target's BASE YEAR** | NOT retrieved | the retrieved report states none; the NCAP document itself is behind the client-rendered portal |
| **The OUTTURN** (city PM series) | NOT retrieved | **`prana.cpcb.gov.in` is CLIENT-RENDERED and this environment has no rendering client.** Playwright returns `ERR_NAME_NOT_RESOLVED` (inherits the broken system resolver); the in-app browser denies the navigation. Both tested this batch. `cpcb.nic.in` and `airquality.cpcb.gov.in` refuse TLS on different IPs |
| **The 40%-by-2025-26 REVISION** | NOT retrieved, NOT asserted | no primary located; it is reported elsewhere and that is not a source |
| **A ledger record** | **NONE, deliberately** | nothing is scoreable without the base year and the outturn. P-125 is provenance, not a verdict |


**BLOCKED — read this before treating Arc B as done.** Zero records were written and the routes are
OPEN, not exhausted. **The blocking cause is named: the NCAP portal `prana.cpcb.gov.in` is
CLIENT-RENDERED and this environment has no rendering client**, so the designated channel returns
HTTP 200 and no document. That is a capability gap on this machine, not a property of the programme
and not a finding about publication. A cold read must not take the absence of records for a
completed arc: nothing here has been decided about air quality.

**No record written, and writing one from recall would have been the hard stop.** No announcing primary for the
National Clean Air Programme was retrieved in this run, so nothing about its target is assertable.
**The figures that would have gone into such a record — a 20-30 per cent reduction by 2024 against a
2017 base, revised to 40 per cent by 2025-26 — are widely circulated and easy to recall, which is
exactly what makes writing them without the primary the HARD STOP: entering a document as a source
that has not been retrieved.** They are named here only to say they were NOT used.

### The attempt record, five attempts across three estates

| Host | Result |
|---|---|
| `cpcb.nic.in` (45.127.74.241) | HTTP 000, TLS reset — the fingerprint already recorded for Grid-India |
| `airquality.cpcb.gov.in` (115.112.199.4) | HTTP 000, same fingerprint. A DIFFERENT IP, so this is a second observation, not a repeat |
| `prana.cpcb.gov.in` (164.100.61.207) | **HTTP 200, 21,735 characters — and a JAVASCRIPT SHELL.** The body is font-face CSS and chrome; the NCAP portal renders client-side. A 200 serving a shell is not a retrieval |
| `moef.gov.in` (164.100.221.70) | Live, 126 KB of real text, but `/national-clean-air-programme` and `/ncap` both 404, and the **Control of Pollution division page carries no programme content at all** — 102 KB in which the only date hits are the copyright footer and a visitor counter |
| `www.pib.gov.in` | Live. Three release IDs tried and none carried NCAP — **they were GUESSED, which is the identifier-guessing trap, and guessing is why they failed rather than anything about PIB** |

### What this is and is not

**It IS a class-of-sources result, obtained the way the rule requires** — by varying the host, not by
accumulating failures within one. Three CPCB hosts on three different IPs: two refuse TLS, one
answers and renders client-side. So the correct narrow statement is that **CPCB's estate is reachable
and its flagship portal is unreadable to a non-rendering client**, which is a different and more
useful fact than "CPCB is down".

**It is NOT evidence that NCAP material is unpublished.** The phase-14 finding applies directly: a
failure to read a ministry's website is not evidence that its documents are unpublished, and that
inference was wrong three times in that phase. PIB almost certainly carries NCAP status replies; this
run did not find them because it guessed identifiers instead of searching.

### What opens it, in order of expected cost

1. **A rendering client against `prana.cpcb.gov.in`.** The portal is live and is the designated NCAP
   channel, carrying city-wise PM data and the target. This is the single highest-value route and it
   needs a headless browser, which is M1 mode 3 — recorded as UNAVAILABLE in this environment on
   2026-08-04, so confirm that is still true before assuming it.
2. **PIB via its own search rather than guessed PRIDs.** A Lok Sabha or Rajya Sabha reply on NCAP
   status would carry the target, the base year and the city count in one document.
3. **The NCAP document itself**, a 2019 MoEFCC publication. Not located on `moef.gov.in`, whose
   Control of Pollution division page carries no programme content.

### The one thing Arc B must get right when it is written

**The target is share-shaped and its base year is the whole question.** A percentage reduction in PM
means nothing without the base year, the pollutant (PM10 and PM2.5 are different series), and the
city set — and the programme is reported to have been revised once, which if true means two targets
with two horizons and possibly two bases. Expect the phase-15 pattern to repeat: **a revision that
moves the goalposts and a headline quoted on whichever basis is kinder.** Establish the base year
from the announcing primary before touching any outturn figure.


### ARC B REOPENED THE SAME DAY — route 1 dead, route 3 landed a primary

**Route 1 (rendering client against PRANA) is EXHAUSTED and the capability is confirmed absent.**
Playwright returns `ERR_NAME_NOT_RESOLVED` — it inherits the broken system resolver, so M1 mode 3
remains unavailable exactly as recorded on 2026-08-04. The in-app browser denied the navigation.
**Two rendering clients, both fail: this is now tested rather than assumed.**

**Route 2 (PIB by its own search) is NOT a URL-addressable route.** `Allrel.aspx` returns real
content but is an ASP.NET postback form; ministry-and-date filtering needs viewstate, not a query
string. Recorded so the next cycle does not spend the attempt.

**Route 3 LANDED.** MoEFCC's `/annual-report` page lists 26 report PDFs — a real index, found by
enumeration rather than by guessing a path. **Annual Report 2020-21** (11,387,012 bytes, 961,735
characters of text, T1) carries NCAP. Written up as **P-125**. Verbatim:
> "The program is designed to support the government's target of 20-30% reduction of particulate
> matter concentration by 2024."
> "…122 non-attainment cities which were identified by CPCB based on air quality levels exceeding
> National Ambient Air Quality Standards (NAAQS) from 2014-2018."

**Extraction note that matters for reuse:** this is a TWO-COLUMN PDF and `pdftotext -layout`
interleaves the columns into unreadable prose. `pdftotext` WITHOUT `-layout` reflows it correctly.
The target sentence is only legible in the second form — a layout flag chosen for tables silently
corrupts running text.

**What P-125 establishes, and it is the shape STATE.md predicted before the document was opened:**
the target names no base year (0 hits for "base year" across the whole report, against positive
controls of NCAP=8 in the same file and form), is a ten-point RANGE, and says "particulate matter"
without saying PM10 or PM2.5. NCAP is also described as "designed to SUPPORT the government's
target", so programme and objective are two things in the Ministry's own wording.

### STILL BLOCKED, and this is what the next cycle must not skip

1. **The base year.** P-125 says only that the RETRIEVED DOCUMENT states none. **Establish it from
   the NCAP document itself before any outturn figure is touched.** If a base year exists, P-125's
   scope narrows to the annual report; if none exists anywhere, the target is unscoreable by
   construction and that is a much larger finding.
2. **All outturn data.** The city-level particulate series live behind `prana.cpcb.gov.in`, which
   needs the rendering client this environment does not have. **No PM figure has been retrieved and
   none may be written from recall.**
3. **The revision.** The target is reported elsewhere to have been revised to 40 per cent by 2025-26.
   NOT retrieved and NOT asserted. If it exists it means two targets, two horizons and possibly two
   bases — the phase-15 pattern of a revision that moves the goalposts, and the reason to get the
   base year first.


## QUEUED — the five `contested` records with no stated ground

Of the eight review-sample records that carried no `assessmentNote` at review time, **five still carry
none today and all five are `contested`: L-0018, L-0025, L-0059, L-0068, L-0076.**

**Contested is where stated ground matters most, and it is the value most likely to be left bare.**
Every other scored value asserts an outcome and invites the question "on what evidence?"; `contested`
asserts that the evidence supports more than one reading and the record does not choose — which reads
as self-explanatory and is not. Without a note, a reader cannot tell WHICH two readings are live,
whether they rest on different facts or on different weightings of the same facts (the distinction the
research standard turns on), or whether the record declines to choose because the evidence genuinely
underdetermines it or because nobody has done the work. **Those are three different records wearing
one word.**

*Scope note, so this is not mistaken for the whole problem:* these five are the intersection of the
abstention backlog with the 38-record review sample. The corpus-wide figure is the one already
queued — 58 records with no note, of which 29 are `contested`. **These five are simply the ones a
reader was demonstrably shown.**


### ARC B, BATCH 5 — the outturn and the revision are STILL NOT RETRIEVED

**Routes tried this batch and what each returned, so none is retried blind:**
- **Newer MoEFCC annual report.** The `/annual-report` index was re-enumerated: **2020-21 is the
  newest English report listed.** There is no later one to carry a 2024 outturn.
- **The 40% revision, inside the report already retrieved.** Checked and ABSENT: `2025-26` returns 0
  across 961,735 characters, and the single `40%` hit is a Montreal Protocol HCFC baseline, read in
  context and discounted. So the revision is not in the one MoEFCC primary in hand.
- **A MoEFCC search endpoint.** There is none usable: `/search?q=` returns HTTP 500 and `/?s=` returns
  200 with zero matches. Recorded so the next cycle does not spend the attempt.
- **PIB `Allrel.aspx`** — confirmed last batch as an ASP.NET postback, not URL-addressable.

**WHAT DID COME OUT OF THE ATTEMPT, and it is in P-125 as an amendment.** The same report carries the
Fifteenth Finance Commission air-quality grant, and it has exactly the specificity NCAP's headline
lacks: the Ministry is nodal 'to develop a) city-wise and year-wise targets on ambient air quality
based on annual average concentrations of PM10 and PM2.5', with the second instalment disbursed
'against the stipulated performance-based outcomes in terms of year on year improvement'. **City-wise,
year-wise, pollutant-named, and enforced by money** — where the national target is a ten-point range
over unspecified 'particulate matter' with no base year. The scale is not comparable either: 224.74
crore released and 111 crore sanctioned under NCAP across two years, against 4,400 crore under the
grant.

**The city-wise targets themselves were NOT retrieved** — the report says the Ministry was appointed
to DEVELOP them and describes a framework, without printing them. That is the next specific thing to
look for, and it is a better-shaped target than NCAP's because it is per-city and per-year.

**Still not retrieved and still not assertable: any PM outturn figure, the NCAP base year, and the
40%-by-2025-26 revision.** No ledger record has been written for Arc B and none should be until the
base year is established from a primary.
