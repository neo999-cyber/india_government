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
