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

### 5. L-0052 and `re-capacity` — **RESOLVED. ALL FOUR APPLIED IN BATCH 2 (g).**

> **SUPERSEDED 2026-08-05.** This section said the corrections were owed and not applied. They were
> applied in batch 2 under the narrow source-edit amendment, each carrying its withdrawn wording
> inside itself, and verified on the deployed pages. **The list below is retained as the statement of
> what was wrong, not as outstanding work.** See BATCH 2 RESOLUTIONS, item (g), lower in this file.

The four, as they stood before correction:
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

### 6. The rendering audit — **RESOLVED. ALL THREE LAYERS SWEPT IN BATCH 2.**

> **SUPERSEDED 2026-08-05.** This section said only the LEDGER layer had been swept. All three were
> swept in batch 2 and the audit is now a tool in the build — `npm run field-render-audit`. Result:
> **ledger 15 fields · provenance 6 · series 11 · 0 invisible.** The series sweep found the defect at
> a second site: `points[].note` rendered nowhere on any PEER series because `SeriesTable`'s panel
> branch had no note cell. Fixed. The original finding stands as history: `assessmentNote` was
> invisible on 164 records and `revisitTrigger` on 62.

## Retrieval notes — pins and traps, verified this run

**THE NPP MONTH-STAMPED ARCHIVE — the reusable result of batch 4, and the answer to "CEA publishes
only the current month".** CEA's own index pages do carry only the current month; that is enumerated,
not assumed. But the **National Power Portal mirrors the same CEA reports under a dated path**, and
the convention was read off a live `href` on `npp.gov.in/publishedReports` rather than guessed:

```
https://npp.gov.in/public-reports/cea/monthly/<category>/<YYYY>/<MON>/<file>
  installed capacity :  installcap/2025/MAR/capacity1-2025-03.pdf
  categories observed:  dgr · fuel · generation · installcap · transmission
```

Pin `npp.gov.in` 45.127.74.236. `<MON>` is the three-letter uppercase month; the filename repeats the
year and a two-digit month.

**IT IS CROSS-VALIDATED AT BOTH ENDS OF THE CAPACITY SERIES, which is why the series can span three
sources without a seam.** At **31.03.2024** NPP gives thermal 243,216.92 · hydro 46,928.17 · RES
143,644.51 · nuclear 8,180.00 · total 441,969.60 against the General Review's 243,217 · 46,928 ·
143,645 · 8,180 · 441,970 — **every difference under 0.5 MW**, explained by the General Review
rounding to whole MW, and the non-fossil share identical at 44.97 per cent. At **31.03.2026** NPP
gives 532,739.72 against the Executive Summary's 532,739.68 — **0.04 MW**, non-fossil identical.
**Note the asymmetry: the GENERATION series has no such overlap anywhere and its FY2024-25 join is
therefore declared as a seam (P-126).**

**Also note the RES column convention differs by document and must be checked per file:** NPP and the
General Review put hydro in its own column and EXCLUDE it from RES; the Executive Summary's `RES*`
INCLUDES large hydro. Adding hydro to an Executive Summary RES figure double-counts about 51 GW.

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
*Executive Summary March 2026*: capacity and generation for **FY2024-25 and FY2025-26**.
**SUPERSEDED 2026-08-05 — the sentence this line used to carry was wrong.** It said 31.03.2025 'is
not [a published stock] — both guessable archive URLs 404'. That was true of the URLs and was not a
search: batch 4 retrieved the stock from the National Power Portal's month-stamped archive (see the
retrieval notes below), and the FY2024-25 capacity hole is **filled**, not deliberate. **There is no
hole in these series.**
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

**Route 1 CORRECTED 2026-08-05 — THE CAPABILITY WAS NEVER SHOWN ABSENT AND THE EARLIER ENTRY WAS WRONG.**
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


## ARC B — CLOSED PROVENANCE-ONLY, 2026-08-05. One targeted attempt made and it did not land.

**The attempt, as instructed: the XV Finance Commission city-wise, year-wise PM10/PM2.5 targets, by
named document rather than portal. IT DID NOT LAND, and both halves of the failure are specific:**
- **The targets are not printed in the primary that describes them.** The Annual Report says the
  Ministry 'has been appointed as the nodal ministry … to develop' them. Appointment to develop is
  not publication.
- **The framework document is not in MoEFCC's publications index.** All 18 PDFs enumerated; no match
  for the framework, for air quality, or for the grant. It is a named document — 'Assessment of
  Performance and Outcomes for Air Quality Management in Million Plus Cities for XV-Finance
  Commission Grant' — and it is not on the index that would carry it.

**WHAT THE ATTEMPT DID YIELD went into P-125 and is sharper than the targets would have been.** The
grant's 'performance' is scored on FOUR parameters and **only one is air quality**; the other three
are an institutional framework, a source analysis, and progress against action plans. Half the money
was released with no performance criteria at all. **And the report states that the relative weightings
'are provided' and then does not provide them** — so the weight on the single outcome parameter is not
establishable from the document that describes the framework.

### ARC B FINAL STATE — provenance-only, no ledger record, and this is the whole of it

| Piece | State |
|---|---|
| Target wording | **RETRIEVED**, T1 — '20-30% reduction of particulate matter concentration by 2024' |
| Base year | **NOT ESTABLISHED.** 0 hits for 'base year' across 961,735 characters, positive controls passing |
| Outturn (city PM series) | **BLOCKED** — behind `prana.cpcb.gov.in`, client-rendered, and BOTH available rendering clients fail here |
| 40%-by-2025-26 revision | **NOT RETRIEVED, NOT ASSERTED** — absent from the one primary in hand |
| XV-FC city-wise targets | **NOT RETRIEVED** — not printed in the primary, not on the publications index |
| Ledger record | **NONE, and correctly none.** Nothing is scoreable without the base year and an outturn |

**Records: P-125 only.** Do not spend a third batch on Arc B without a rendering client — that single
capability is what gates the outturn, and everything else here is downstream of it.

## ARC D — THE EMISSIONS-INTENSITY LIMB. **L-0223 written 2026-08-05.** One limb, not the arc.

**Retrieved: MoEFCC, India's Long-Term Low-Emission Development Strategy** (submitted to the UNFCCC
November 2022), 8,973,260 bytes, 283,363 characters, T1 — found on MoEFCC's `/publications` index by
enumeration. It carries both NDC wordings and, uniquely among anything retrieved this phase, **an
outturn against a target with a named base year**:
> 2015 NDC: "reducing the emissions intensity of its GDP by 33-35% below 2005 levels by 2030"
> 2022 update: "Reduce the emission intensity of the GDP by 45% below 2005 levels by 2030"
> Outturn: "the emissions intensity of India's GDP had already reduced by 24% from 2005 levels until
> 2016 (MoEFCC, 2021)"

**Scored `too-early`** — state (a), trigger 2030, obstacle is elapsed time. **The two findings that
do NOT wait for 2030 are the point of the record:** intensity is a RATIO and can fall while absolute
emissions rise, so the commitment constrains carbon efficiency and not carbon; and the target was
RAISED to 45 per cent after 24 points had already been banked, which is the opposite of the
flattering-basis pattern found elsewhere in this phase and is recorded as such.

### What Arc D still owes — this was one limb of four

1. **A post-2016 intensity reading.** The only outturn retrieved is a 2016 figure published in 2021
   and quoted in 2022 — a decade old. A Biennial Update Report or National Communication would carry
   a later one. **Not attempted.**
2. **An absolute GHG emissions series from 2005.** This is what decides whether the intensity fall
   coincided with rising totals. **L-0223 asserts nothing about it** and declares no absence, because
   none was searched for — the new stated-search rule forbids calling it unpublished on no search.
3. **The remaining limbs, none attempted:** the 1-billion-tonne cumulative emissions reduction, the
   2.5-3.0 GtCO2e carbon sink, and **net-zero-by-2070**. Expect the flagged shape on net-zero: a year
   with no interim phasing is likely state (d), unfalsifiable by construction, and must not be forced
   to (a) merely because a year is named.

## ARC D — TWO QUANTIFIED LIMBS. **L-0224 written 2026-08-05.** Net-zero-2070 NOT in this batch.

**L-0224 covers both limbs in one record because they share one defect:** an absolute tonnage, a
date, and **no stated baseline.**
- **One billion tonnes** (Panchamrit element 3, COP26): 'reduce the total projected carbon emissions
  by one billion tonnes from now onwards till 2030'. The baseline is a PROJECTION — a counterfactual,
  not observable — and India's own Long-Term Low-Emission Development Strategy publishes none:
  `projected emissions`, `baseline scenario`, `reference scenario` all **0** across 283,363
  characters, positive controls `emission intensity` 3 / `carbon sink` 5 / `2030` 51 passing. The
  four `business-as-usual` hits are transport and finance discussion, read in context.
- **2.5-3.0 GtCO2e carbon sink** (2015 NDC): 'additional' to a reference no retrieved document
  states — `additional to` returns **0** — and it is a RANGE of half a gigatonne, so 2.6 both meets
  and misses it, the same shape as NCAP's 20-30 per cent. The only stock offered is 'The carbon
  stock in forests is estimated to be 7,204 million tonnes', **with no unit basis stated** against a
  target explicitly in CO2 equivalent.

### THE ENUM QUESTION THIS RAISES — flagged, NOT resolved. Operator decision.

**These two limbs are a THIRD unscoreable shape and the vocabulary has no value for it.**
- Not (d): (d) is *a total with **no date**, no phasing and no annual target*. Both carry 2030.
  `no-objective` was therefore **not** scored and the definition was **not** stretched to reach them.
- Not honestly `too-early` either, which is what was scored: that value's definition says the
  obstacle is elapsed time *and the evidence time accumulates*. **Here time accumulates nothing** —
  what is missing is a baseline, not a reading, and both limbs will be exactly as unscoreable in 2030
  as today.

**The shape: dated, quantified, and unscoreable for want of a stated baseline.** Distinct from (a),
(b), (c) and (d). Creating or stretching an enum value mid-phase is precisely what this project's
enum rule forbids, so it is recorded here for decision rather than settled in a record. **If a fifth
state is admitted it needs a written definition in the same commit, per the preventive half of the
enum rule.**

### Arc D remaining — one limb, and it gets its own batch

**Net-zero-by-2070 is NOT in this batch, deliberately.** STATE.md flags it as likely (d) and warns
against forcing it to (a) because a year is named — and the two limbs written here sharpen why that
warning matters: a year plus a quantity was still not enough to make these scoreable. **Net-zero
needs its announcing wording retrieved first**, not recalled, and then the (a)/(d) test applied to
what it actually says. It should also be decided AFTER the enum question above, because if a fifth
state is admitted, net-zero may belong in it rather than in (d).

## ARC D — COMPLETE, 2026-08-05. Four limbs, three records, and the enum question closed.

**L-0223** emissions intensity (`too-early`) · **L-0224** the two quantified tonnages
(`contested`, re-filed) · **L-0225** net zero by 2070 (`too-early`).

### THE ENUM QUESTION IS CLOSED — no fifth state, and no new vocabulary anywhere.

**Operator decision: no fifth commitment state.** "Unscoreable for want of a stated baseline" is a
measurement fact, not a commitment state, and belongs in `unmeasured[]` with a `reasonKind`.
**Implemented, and it needed nothing new at any level:**
- No fifth commitment state.
- No new `assessment` value — `contested` fits L-0224 and is what `no-objective`'s own definition
  ROUTES to: *"Use where nothing was claimed, not where a claim exists and its outcome is unmeasured
  — that remains contested (see L-0096)."* L-0096 is the precedent and its note says *"What is scored
  is the documented ACT, not the outcome"*, which is exactly L-0224's construction.
- **No new `reasonKind` either.** `not-published` carries all three new absence entries, chosen as
  the WEAKER candidate over `never-defined` in every case, because `never-defined` asserts that no
  agreed definition exists anywhere and this run observed only that the retrieved documents state
  none.

### The filing correction, and why `too-early` was wrong on L-0224 but right on L-0225

`too-early` asserts two things: **the obstacle is elapsed time**, and **the evidence time
accumulates**. Both must hold.
- **L-0224 — both FALSE.** The obstacle is a missing baseline; time supplies no baseline; in 2030
  those limbs are exactly as unscoreable as today. Filing them there told a reader to come back and
  find out, which licenses a wasted revisit. **Re-filed `contested`, and its revisit trigger is no
  longer a date** — it is the publication of a national baseline projection, or a stated reference
  for "additional to".
- **L-0225 — both TRUE.** The obstacle is that 2070 has not arrived, and national net emissions are
  measured and reported annually, so evidence does accumulate toward an endpoint the international
  framework defines. `too-early` is earned rather than defaulted.

**Two records of the same announcement shape take different values, and the difference is readable
off the printed definitions.** That is the test any future commitment record should be put to.

### What Arc D does NOT establish

- **No outturn for any limb after 2016.** The intensity reading is a 2016 figure published in 2021.
- **The 2015 NDC's own lodged text was never retrieved** (P-124). If it fixes the sink's reference or
  the net-zero scope, two `unmeasured[]` entries close and L-0224's verdict should be revisited.
- **Net zero's scope is undefined in the retrieved documents** and India reports its own emissions
  EXCLUDING LULUCF — the one accounting choice that decides the target's difficulty is made in the
  reporting and not in the target.


---

# PHASE 15 — EVERYTHING STILL OPEN. One list. 2026-08-05.

**"One arc left" is false and a cold read must not close the phase on Arc C.** Five items are
outstanding and only the first is an arc.

## 1. ARC C — forest clearances. **CLOSED PROVENANCE-ONLY 2026-08-05 on P-127. Clearances NOT retrieved.**
The one unstarted arc. ISFR's definition of "forest cover" is the known trap: it admits plantations,
orchards and tea gardens, so a cover figure is not a forest figure. **Establish the definition from
the primary before touching any cover number.** Also: the Van (Sanrakshan Evam Samvardhan) Adhiniyam
2023 amendment, FCA diversion figures, CAMPA. `fsi.nic.in` returned 302 on last observation;
`moef.gov.in` is live and its `/annual-report` and `/publications` indexes are already enumerated.

## 1b. ARC B — air quality. **THREE OF THE FOUR ROUTES ARE ONE CAPABILITY, not three chances.**
**Corrected 2026-08-05 so a cold read does not count four independent shots.** Routes (i), (ii) and
(iii) all reduce to the same missing capability — **reaching content behind a client-rendered page**:
(i) resolve the host explicitly and render, (ii) enumerate data endpoints out of the JS bundle so no
rendering is needed, (iii) `sansad.in`, **which is itself a JavaScript shell** (200, 2,578 characters
of font declarations), so it fails the same way unless its question PDFs sit at static paths.
**Only route (iv), `data.gov.in` CSV, is genuinely independent.** So Arc B has ONE capability gap and
ONE independent alternative — not four routes. *(Note the e-Gazette precedent above: a shell at the
front door does not imply the documents are unreachable, and static paths behind it may work. That is
what makes (ii) and the sansad-PDF form of (iii) worth trying rather than assuming.)*
**Not exhausted.** The "no rendering client" finding was withdrawn: Playwright's failure was DNS
(`ERR_NAME_NOT_RESOLVED`), not rendering, while curl reached the same host at HTTP 200 in the same
environment. Four untried routes in cost order are listed under the correction below — resolve-then-
retry, read the JS bundle for data endpoints, `sansad.in` static PDFs, `data.gov.in` CSV.

## 2. ARC A REMAINDER — **CLOSED 2026-08-05 with L-0226.** Curtailment measurement still absent.
*Not carried into the Arc C batch by instruction.* The dependencies are on disk: the CEA RE
Generation Portal daily reports (`gen-re.cea.gov.in/reports`, live) and the NEP's BESS scenarios
(`nep.pdf`, Exhibit 5.5a: 38.71-67.04 GW / 193.55-335.2 GWh across scenarios). **This is the cheapest
outstanding work in the phase** — retrieval is done, only authoring remains.

## 3. FIVE `contested` RECORDS WITH NO STATED GROUND.
L-0018, L-0025, L-0059, L-0068, L-0076 — the five of the eight review-sample records that still carry
no `assessmentNote`, all five `contested`. **Contested is where stated ground matters most**: it reads
as self-explanatory and is not, and without a note a reader cannot tell which two readings are live or
whether the record declines because the evidence underdetermines it or because nobody did the work.
Corpus-wide the figure is 58 records with no note, 29 of them contested; **these five are the ones a
reader was demonstrably shown.**

## 4. SEAM-SPAN TRIAGE — 29 candidates.
`tools/seam-span-report.mjs` is written and REPORT-ONLY: 117 record-by-break spans, 88 declaring the
break, **29 not**. Twenty-nine is a candidate list, not a defect count — L-0222 is among them and is a
false positive. **Gateable only once the 29 are triaged per record and the heuristic narrowed**, most
likely to periods co-occurring in one sentence rather than anywhere in the record. This is flag (e),
still open.

## 5. DEPLOYMENT AUTH — ANOOP'S DECISION, OUTSTANDING.
`india-government.vercel.app` serves the full corpus **unauthenticated** (HTTP 200); the team alias
302s to SSO. Same build, same edge IPs. Mechanism: `ssoProtection = { enabled: true, deploymentType:
"all_except_custom_domains" }`. **Untouched by every batch since it was found, correctly** — an auth
change is a stop condition and the configuration may be deliberate. **It is not arc work and closing
Arc C will not close it.**

## Also logged, not scheduled — a guard-scope candidate found 2026-08-05

**Commitment state (a)/(b)/(c)/(d) exists ONLY IN PROSE.** It is a first-class analytical category in
CLAUDE.md — every commitment record "resolves into one, stated rather than implied" — and there is no
`state` field on the ledger schema, so nothing derives it, nothing renders it as a mark, and no gate
can check that a commitment record states one at all. **That is the guard-scope class again**: the
claim lives one level out from anything that binds it. Adding a field is a schema change and
therefore a stop, so it is recorded here for decision rather than done.


## ARC C — OPENED. P-127 only. The definition is established; the clearances are not.

**Done: the trap, from the primary.** ISFR 2023 Volume 1 retrieved (20,145,512 bytes, 670,500
characters, T1), reached by enumerating FSI's own report index. Forest cover is defined as **'all
lands, more than one hectare with a tree canopy density of more than or equal to 10% irrespective of
ownership, legal status and land use. Such lands may not necessarily be a recorded forest area. It
also includes orchards, bamboo and palm'.** Ten per cent canopy, any land use, orchards included, and
explicitly severed from the legal category. **The same volume also carries a shorter definition that
drops the land-use clause and the orchards/bamboo/palm clause entirely** — two definitions of one
term in one report.

**And ISFR 2023 moved the base on Tree Cover**, in changes the report flags as firsts: trees of 5-10
cm diameter included in Tree Cover and Growing Stock, and bamboo cover 'estimated for the first time
and included in Tree cover'. So the headline **8,27,356.95 km2 / 25.17 per cent** (Forest Cover
7,15,342.61 / 21.76; Tree Cover 1,12,014.34 / 3.41) is **not like-for-like with ISFR 2021's**, and no
restatement of 2021 on the new basis was retrieved.

**HOST TRAP, recorded because it nearly went wrong:** `fsi.gov.in` is the **FISHERY** Survey of India
and answers HTTP 200 with a plausible-looking index of fish-festival and regional-office pages. The
**FOREST** Survey of India is **`fsi.nic.in` (14.139.254.74)**. Two organisations, one acronym,
near-identical domains, and the wrong one is live.

### STILL NOT DONE in Arc C — the arc's actual subject

1. **Forest clearances themselves.** Diversion of forest land under the Forest (Conservation) Act —
   how much, to what, over what period. **Not retrieved, not attempted.**
2. **The Van (Sanrakshan Evam Samvardhan) Adhiniyam 2023 amendment** and what it changed about which
   land requires clearance. **Not retrieved.**
3. **CAMPA** — compensatory afforestation funds collected against funds spent. **Not retrieved.**
4. **The cover trend itself.** No cover figure is scored and no trend is stated; P-127 establishes
   only what the figures mean and why two editions are not comparable. **A ledger record on cover
   change needs the 2021 restatement that does not exist, or an explicit statement that the change
   cannot be decomposed.**


---

# CORRECTION — ARC B's "no rendering client" was two different failures read as one

**STATE.md recorded the rendering capability as confirmed absent. That is withdrawn: it was never
earned.** Playwright returned **`ERR_NAME_NOT_RESOLVED`**, which is a **DNS failure** — the browser
never reached the host and so never attempted to render anything. In the same environment and the
same batch, `curl --resolve prana.cpcb.gov.in:443:164.100.61.207` reached the host at **HTTP 200 with
21,735 characters**. **Two failures with different causes were read as one finding**, and the finding
that resulted — "this environment cannot render" — does not follow from either. The in-app browser's
refusal is a third, separately-caused failure and was folded in with the other two.

This is the class-of-sources rule turned inward: the rule says two failures from one host are one
observation, and the same discipline applies to two failures from one CLIENT for different reasons.
A DNS error and a render failure are not evidence of the same thing.

**ARC B IS THEREFORE RESTORED TO THE OPEN-ITEMS LIST as blocked-but-untried, not blocked-and-exhausted.**

### Untried routes, in cost order. NOT RUN THIS BATCH.

**(i) Resolve the host explicitly, then retry the browser.** The failure is DNS, and DNS is exactly
what `--resolve` fixes for curl. The browser equivalents: an `/etc/hosts` entry, or Chromium's
`--host-resolver-rules="MAP prana.cpcb.gov.in 164.100.61.207"`. **This is the cheapest route and it
addresses the actual observed error**, which no previous attempt did.

**(ii) Fetch the JavaScript bundle and enumerate the data endpoints out of it — do not render at
all.** `curl` already reaches the host and returns the shell; the shell references its own scripts,
and a client-rendered portal fetches its data from endpoints named in those scripts. Reading the
bundle turns a rendering problem into a retrieval problem, and the retrieval half already works here.

**(iii) `sansad.in` question archives.** Parliamentary answers on NCAP would carry the target, base
year, city list and outturn in one document. It serves **static PDFs** and is a **different estate**
from PIB's `Allrel.aspx` postback form, which is why the PIB failure says nothing about it. Pin on
record from phase 14: `sansad.in` 164.100.252.170.

**(iv) `data.gov.in`** — CPCB publishes monitoring datasets there as CSV, which is neither a portal
nor a PDF and needs no rendering.

**None of these has been attempted.** The honest state of Arc B's outturn is UNTRIED ON FOUR NAMED
ROUTES, not unreachable.

---

# SCOPE ONLY — the `commitmentState` field. Proposed, NOT built. Backfill is its own batch.

## The measurement first, with its scope stated

**Pattern:** commitment-state vocabulary across the 8 prose fields of all ledger records —
`(commitment )state…([a-d])`, `is ([a-d])`, `not yet due`, `due and undelivered`,
`unfalsifiable by construction`, `no-objective`.
**Scope:** all **225** ledger records.

- **44 records** use the vocabulary at all. That is a CANDIDATE count, not a finding — several match
  only on `no-objective`, which is an assessment value rather than a state assertion.
- **Only 24 letter-tokens exist in the entire corpus: (a) x21, (b) x1, (d) x2.** No record asserts (c).
- **181 records assert nothing.**
- The two batches that did (a)/(d) work carefully — L-0223, L-0224, L-0225 — are three of the 44.

**So the (a)/(d) reasoning of the last two batches is unverifiable against the other 222 records, and
that is the actual finding.** Nothing derives the state, nothing renders it, nothing filters on it and
no gate can ask whether a commitment record states one.

## THE DENOMINATOR PROBLEM, which governs the design

**There is no marker for "this is a commitment record."** `type` does not capture it — reform 71,
episode 75, institutional 53, event 18, shock 8 — and a commitment can be announced inside any of
them. The closest proxy is `claimAtLaunch`, carried by **88 records**. **So the field cannot be made
required corpus-wide**, and any gate must key on a proxy and allow a named exemption, exactly as
`no-unguarded-prose-field` does for prose fields.

## The proposal

**Field:** `commitmentState` on `ledger.schema.json`, optional, alongside `assessment`.

**Enum — named values, not bare letters.** `not-yet-due` · `due-undelivered` · `abandoned` ·
`unfalsifiable-by-construction`. Bare `(a)`-`(d)` is unreadable on a page and un-greppable in prose,
which is half of why this went untracked. **Per-value definitions ship in the same commit**, lifted
verbatim from CLAUDE.md's existing text — the preventive half of the enum rule, and no new principle
is created because the four states already have written definitions.

**Three gates, in increasing cost:**
1. **`commitment-state-declared`** — a record carrying `claimAtLaunch` either carries
   `commitmentState` or is exempted by name in its own schema description. Same guarded-or-exempted
   shape as `no-unguarded-prose-field`, and the same "no third state" property.
2. **`commitment-state-consistent`** — where `commitmentState` is `unfalsifiable-by-construction`,
   `assessment` MUST be `no-objective`. CLAUDE.md already prescribes this mapping in terms
   ("Score it `no-objective`"), so the gate cites the rule rather than inventing one. It is the only
   one of the four with a prescribed assessment, so no other pair is asserted.
3. **`commitmentState` joins `tools/lib/guarded-marks.mjs`** so `reachability` proves it reaches the
   record's own page — and per the rule written in batch 2, **the field lands in the schema, the TYPE
   (`lib/types.ts`), a VIEW and the guarded list in ONE commit**, or it repeats the 226-invisible-marks
   defect exactly.

**Precedent is phase 11's `lenses[]`:** a mid-phase field addition where three places move together —
`schemas/*.schema.json` (enum + per-value definitions), `lib/types.ts`, `lib/format.ts` labels — with
a gate that refuses the build rather than trusting an author to notice.

**Backfill is its own batch and is NOT part of this proposal.** 88 candidate records carry
`claimAtLaunch`; 44 already assert something in prose that a backfill would have to reconcile against
rather than overwrite. **Assert per record, never sweep** — the 44 are a candidate list.

## ARC C, BATCH 10 — the amending instrument was NOT retrieved, so no diversion figure was scored.

**The instruction's precondition was not met and the batch stopped at it.** Establish what the Van
(Sanrakshan Evam Samvardhan) Adhiniyam 2023 changed *from the amending instrument itself* before any
diversion figure is scored — the instrument did not land, so **nothing about clearances was written,
and no FCA diversion, CAMPA or amendment figure appears anywhere in this batch.** Writing one from
recall would be the hard stop.

### Routes tried, with enumerated and guessed distinguished — the stated-search rule

| Route | How | Result |
|---|---|---|
| `moef.gov.in/forest-conservation` | **ENUMERATED** — the page's own PDF links extracted | Live, **11 PDFs, every one dated 2013-2018.** The index is stale; no 2023 amendment on it |
| `moef.gov.in/acts-rules`, `/rules-regulations`, `/legislations` | **GUESSED** — and saying so, because three 404s from guessed paths are not a search | 404 each. They establish nothing |
| `moef.gov.in/divisions` | **ENUMERATED** | Live; names a Forest Conservation (FC) division page, not followed this batch |
| `www.indiacode.nic.in` **(94.202.207.59)** | Host probed, index enumerated | **Live, HTTP 200, 27,989 characters.** The canonical repository for an Act of Parliament |
| India Code `simple-search?query=…` | Real endpoint taken off the index page | HTTP 200 but **no matching results** for the Act or the 2023 amendment |
| India Code `browse?type=actyear&value=2023` | Real endpoint taken off the index page | HTTP 200, **zero acts listed.** The DSpace interface does not yield to URL-form queries here |

**PIN CORRECTION:** STATE.md carried `indiacode 94.202.207.51` from phase 14. That address now
**302s with an empty body**, and `indiacode.nic.in` resolves to 94.206.5.74 which also 302s.
**The working host is `www.indiacode.nic.in` at 94.202.207.59.** Recorded so the next cycle does not
re-derive it.

### Untried routes for the amending instrument, in cost order — NOT RUN

1. **India Code via its own UI rather than URL forms** — the search is a DSpace instance and likely
   needs a POST or a paginated browse; the host is live and this is the canonical text.
2. **`sansad.in`** (164.100.252.170) — carries Bills as introduced and as passed, serves static PDFs.
   A different estate from both PIB and India Code.
3. **`moef.gov.in/division/forest-divisions-2/forest-conservation-fc/…`** — the FC division's own
   pages, enumerated as existing but not followed.
4. **PRS Legislative Research** — non-government, so T3 at best, and usable for locating the Act's
   gazette reference rather than as the source itself.

**What Arc C holds after two batches: P-127 only** — the forest-cover definition and the ISFR 2023
base change. **The arc's actual subject, clearances, is untouched.**

---

# ADVERSARIAL READ OF BATCH 10's REPORT — run 2026-08-05, first act of batch 11

The rule's first run. Findings written here before the arc was touched.

## FINDING 1 — "all 11 PDFs are 2013-2018" is FALSE. Corrected.

Batch 10 reported `moef.gov.in/forest-conservation` as stale on the ground that **"all 11 PDFs are
2013–2018"**. Re-enumerated against the page itself: **nine** are under `/uploads/2018/03/` and are
forest-conservation guidelines dated 2013-2014. **Two are not**, and neither is from that window:
- `/storage/GIGW_3.0_STQC_Compliance_Statement_2025-26_798_signed.pdf` — **2025-26**
- `/uploads/2021/09/National_cyber_security_policy-20131.pdf` — **2021**

Both are site-wide boilerplate rather than forest documents, so **the conclusion survives — the
amendment is not on that index** — but the claim as written is wrong. **The defect is the shape, not
the size:** an over-tidy generalisation made an index look more conclusively stale than the evidence
showed, and "all 11" would have been quoted forward as though every link had been examined and dated.
The honest form is "nine of eleven are 2018-03 uploads of 2013-14 guidelines; the other two are
site-wide boilerplate; none is the 2023 amendment."

## What the audit checked and found CLEAN

- **Arithmetic recomputed.** (a)21 + (b)1 + (d)2 = 24 ✓. 225 − 44 = 181 ✓.
- **Counts against gate-emitted scope.** Every gate figure in batch 10's line matches the gate's own
  output, including `no-bare-root`'s "277 from 277 frozen" and `validate`'s per-layer counts.
- **Open-items count.** Six claimed; six headings present in STATE.md (1, 1b, 2, 3, 4, 5) ✓.
- **No verdict changed in batch 10**, so no verdict-versus-note contradiction was possible.
- **STATE.md state lines against the resolutions below them** — Arc C's "clearances NOT touched" and
  Arc B's "untried, not exhausted" both match what is recorded beneath them.

## The pattern across three runs of this class

All three earlier instances and this one share a shape: **a summary sentence that is tidier than the
evidence it summarises.** A stock paired with a flow; a count attributed to a gate that never emitted
one; a `reasonKind` chosen for how it sounded; and now "all 11" where nine were checked. **None was a
retrieval failure and none would have been caught by a gate** — each was visible in the report that
contained it, to anyone reading it as an adversary rather than as its author.


---

# PINS RE-CHECKED 2026-08-05. **A pin is an observation, not a property of the host.**

Every pin below was probed on **2026-08-05** with `curl --resolve`, and the current DNS answer from
1.1.1.1 recorded beside it. **Dates are part of the record from now on**: phase 14's `indiacode .51`
moved silently and was carried forward for a phase and a half as though it were a fact about the host.

| Host | Pin | DNS 2026-08-05 | Probe | Note |
|---|---|---|---|---|
| `cea.nic.in` | 45.127.74.41 | same | 200, 93,051 chars | stable |
| `gen-re.cea.gov.in` | 164.100.114.49 | same | 200, 27,190 | stable |
| `mnre.gov.in` | 164.100.51.103 | same | 200, 76,544 | stable |
| `coal.gov.in` | 164.100.166.94 | same | 200, 15,615 | stable |
| `moef.gov.in` | 164.100.221.70 | same | 200, 126,006 | stable |
| `fsi.nic.in` | 14.139.254.74 | same | 200, 26,285 | **FOREST** Survey — not `fsi.gov.in`, which is Fishery |
| `npp.gov.in` | 45.127.74.236 | same | 200, 23,954 | stable; carries the month-stamped CEA archive |
| `www.pib.gov.in` | 94.202.207.57 | **94.206.5.16** | 200 | **DNS moved, PIN STILL VALID — see below** |
| `indiacode.nic.in` | ~~94.202.207.51~~ | 94.202.207.59 | 302, empty | **pin dead; use `www.indiacode.nic.in`** |
| `www.indiacode.nic.in` | **94.202.207.59** | same | 200, 27,989 | the working India Code host |
| `sansad.in` | 164.100.252.170 | same | 200, 2,578 | **JavaScript shell** — see below |
| `prana.cpcb.gov.in` | 164.100.61.207 | same | 200, 21,732 | reachable; client-rendered (Arc B) |

## The PIB entry is why a root probe is not a pin test

A root-path probe of `www.pib.gov.in` on the old pin returned **553 characters**, which read like a
degraded host, and DNS had moved to 94.206.5.16. **Tested on the path the citations actually use, both
addresses are identical and healthy**: `PressReleasePage.aspx?PRID=1768712` returns 36,467 characters
of text with the Panchamrit passage verbatim on **each**. **The old pin is not stale and dozens of
citations are unaffected.** Had the root probe alone been recorded, STATE.md would now carry a false
"PIB moved" warning. **Probe a pin on the path the corpus depends on, not on `/`.**

## `sansad.in` is a JavaScript shell, which bears on Arc B route (iii)

200 with 2,578 characters that are font declarations and styling — the same class as
`prana.cpcb.gov.in`, not a different one. **Route (iii) will not work by fetching the site root.** It
may still work if question PDFs sit at static paths, since those need no rendering; that is the form
the route has to take and it is untried.


---

# ARC C — CLOSED PROVENANCE-ONLY, 2026-08-05. P-127 is the whole of it.

**The amending instrument did not land on any of four routes across three estates, so no FCA
diversion, CAMPA or amendment figure was written.** Per the batch instruction Arc C does not get a
third batch, and it is closed here rather than left open-ended.

## India Code — four query forms, one estate, and a specific dead end

| Form | Result |
|---|---|
| `simple-search?query=Van+Sanrakshan…` | 200, **no matching results** |
| `simple-search?query=forest+conservation+amendment+2023` | 200, **no results** |
| `browse?type=actyear&value=2023` (constructed) | 200, **zero acts** |
| `browse?type=actyear&order=ASC&rpp=20&value=2023` — **the page's OWN href, followed verbatim** | 200, **zero acts** |

**The year-facet enumeration DID work and is the reusable part**: paginating
`browse?type=actyear&order=ASC&rpp=20&offset=N` lists the available years, and **2023, 2024 and 2025
are all present in the facet**. So the collection advertises 2023 and returns nothing for it.
**That is a specific, checkable dead end rather than a failed guess** — the index says the year
exists and the browse yields no items under it.

## THE E-GAZETTE IS LIVE — phase 14's carried gap is FALSIFIED

**`egazette.gov.in` at 164.100.190.144 returns HTTP 200 with 12,079 characters** and a working ASP.NET
navigation — `GazetteDirectory.aspx`, `RecentUploads.aspx?Category=1..5`, `Circulars.aspx`. **Phase 14
recorded it as "unreachable and unduplicated" and carried it forward as the one real retrieval gap of
that phase.** That is no longer true and the phase-14 entry should be read as stale.

**This is bigger than Arc C** and is reported rather than acted on here: the e-Gazette is the channel
of legal record, and a live one reopens every absence that was justified by its being dead. Finding
a specific instrument in it still needs its search, which is a postback form of the same family as
PIB's `Allrel.aspx` — so "live" is not yet "queryable", and that distinction is the next thing to
establish.

## Also live, not attempted: `prsindia.org` (13.235.249.201, 200, 13,107 chars)

A **different estate** from every government host tried. It mirrors Acts with bill-tracker pages.
**Not attempted, and it would be T3 at best** — a mirror is not the authentic text, and for an
amending instrument the gazette or India Code is what the instrument should rest on. Useful for
locating the Act's gazette reference rather than as the source itself.

## What Arc C holds, and what it does not

**HOLDS: P-127 only** — the forest-cover definition (ten per cent canopy, any land use, orchards
bamboo and palm included, severed from the legal category), the second incompatible definition in the
same volume, and the ISFR 2023 base change with its scope fixed to tree cover and the combined total.

**DOES NOT HOLD, and none of it was written:** the Van (Sanrakshan Evam Samvardhan) Adhiniyam 2023
and what it changed · FCA diversion figures · CAMPA collections against spend · any cover trend or
scored cover figure.

**Reopening it needs the amending instrument first**, and the cheapest untried route is now the
e-Gazette's own directory rather than India Code.

---

# ADVERSARIAL READ OF BATCH 11's REPORT — 2026-08-05, first act of batch 12

## FINDING 1 — "Arcs A/C/D closed" contradicts the file the same batch had just written.

Batch 11 closed with *"Phase 15's arcs are done — A, C and D closed."* **STATE.md's own open-items
list, edited in that same batch, carries `## 2. ARC A REMAINDER — grid absorption, curtailment,
storage. NOT STARTED`.** Arc A's spine closed in batch 1; its remainder never did, and it is item 3
of the next batch's brief. **The report contradicted the file it had just written**, and the sentence
would have let a cold read treat Arc A as finished. Corrected wording: **A's spine and C and D are
closed; A's remainder is outstanding.**

## FINDING 2 — "(c) has zero members in 225 records" presupposes a field that does not exist.

There is no `commitmentState` and no `state` field on the ledger schema — this run established that
itself in batch 9 and proposed the field in batch 10. **So there is nothing for (c) to be a member
OF**, and "zero members" is a category error dressed as a measurement. What was actually measured is
narrower and still sufficient: **no record asserts state (c) anywhere in the eight prose fields**,
against (a)x21, (b)x1, (d)x2. **The substantive finding survives untouched** — abandonment is never
evidenced, and governments retire commitments by substitution — but the framing claimed a stronger
kind of evidence than prose-scanning provides.

## Checked and CLEAN

- The 11-PDF split (9 under `/uploads/2018/03/`, 2 not) re-verified against the page.
- `assessment: reversed` is exactly one record, L-0066 ✓.
- 225 ledger records ✓. Every gate figure matches its gate's own emitted line ✓.
- The e-Gazette, PIB dual-address, PRS and India Code character counts all match the probes that
  produced them ✓.

**Both findings are the same class as the previous three: a summary sentence tidier or stronger than
the evidence under it.** Neither is a retrieval failure; both were visible in the report.

---

# E-GAZETTE — BLAST RADIUS MEASURED, AND MY OWN BATCH-11 FINDING WAS HALF WRONG

## The corpus already knew. Batch 11 announced a discovery the records had recorded first.

**L-0218 carries the correction and has since the assessment-audit sequence**, before phase 15 began:
> *"The e-Gazette was offered here as the case that proves it, being unreachable and unduplicated;
> that example is WITHDRAWN, because the e-Gazette turned out to be reachable and its documents
> retrievable."*

So batch 11's "phase 14 carried it as unreachable, that is falsified" was **right about the STATE.md
and wrong about the corpus.** What was stale was a *summary file*, not the records.

## The blast radius is small, and most of it is mine

Twenty records mention the e-Gazette. **Read in context rather than counted:**

| Class | Count | Status |
|---|---|---|
| Cite an e-Gazette URL as a source | **15** | Citations, not availability claims. **Two static PDFs among them retrieve today** — see below |
| Prose tying the e-Gazette to unavailability | **4 sentences** | L-0218 x2 **already corrected in place**; L-0219's caveat is about client-and-day generally, not this channel; **P-121's was mine and was FALSE** |
| Series/pairs | 1 (`jk-assembly-seats`) | incidental |

**P-121 said "the e-Gazette remains the unreachable channel". Corrected 2026-08-05.** That sentence
was written in phase 15 batch 1 and **inherited from phase 14's STATE.md rather than from L-0218's
corrected text** — the same file carries the correction at line 133 and the superseded wording at
lines 43 and 393. **This is the read-the-record-not-the-summary failure operating at the scale of a
whole phase**, and it is the second time this batch that a stale summary beat a corrected record.

**NOT REWRITTEN, per instruction:** phase-14's records and STATE.md. A phase-14 reasoning defect is
its own cycle. **What was rewritten is one sentence in P-121, which this phase wrote and which was
false.**

## IS LIVE QUERYABLE? RETRIEVAL YES, DISCOVERY NO — and the answer was already in the corpus

The search is a postback form of PIB's `Allrel.aspx` family, but **it is not the only door.** The
corpus's own citations use a **static, enumerable path**:

```
https://egazette.gov.in/WriteReadData/<year>/<number>.pdf     pin 164.100.190.144
```

Both cited notifications retrieve **today**, with real text layers:
- `WriteReadData/2019/210407.pdf` — HTTP 200, 1,324,210 bytes, **241,662 characters**
- `WriteReadData/2019/210049.pdf` — HTTP 200, 245,421 bytes, **7,412 characters**

Each is a Gazette *Extraordinary* with the standard masthead. **So a notification whose number is
known is retrievable without touching the search.** What the postback form provides is the
**discovery** step — number from description — and that remains unsolved.

**This reframes every e-Gazette-blocked absence in the corpus:** the question is no longer "can the
channel be read" but "is the notification number known or findable". For P-121's Ministry of Power
Order that is now the whole of the gap. `RecentUploads.aspx?Category=1..5` and `GazetteDirectory.aspx`
are enumerable entry points and are **untried**.


---

# ARC A REMAINDER — CLOSED 2026-08-05. L-0226.

**Written entirely from dependencies already on disk**, as predicted — no new retrieval was needed,
which is what made this the cheapest remaining record work.

**The finding is a tension inside one document.** CEA's National Electricity Plan states the Must-Run
Rules of 22 October 2021 *"ensure that no RE capacity is backed down"*, and the same volume projects
that **about 1 per cent of renewable generation will not be absorbed in 2026-27 and around 3.3 per
cent in 2031-32.** Neither text reconciles them.

**And the projection is mostly an assumption.** The Plan says so itself: *"Studies carried out are at
55% Minimum technical load but CEA regulation has been brought out as per which 40 % Minimum technical
load can be achieved, considering 40% minimum technical load the RE based generation not absorbed will
decrease to 0.09%."* **One per cent against 0.09 — an eleven-fold range from how far coal plant is
assumed able to turn down**, with the higher figure reported as the headline. A third value survives
in the consultation table: the draft carried **3.48 per cent** for 2026-27.

**Scored `contested`**, by the route `no-objective`'s definition prescribes and on L-0096's
construction — the documented ACT is scored, not the outcome. **`too-early` was rejected and its
assertions named as false**: five years of evidence already exist since the rule took effect and are
simply not published, so time has already passed and produced nothing visible.

**`caveat` carries the distinction the record turns on:** *not absorbed* is a modelled system outcome,
*backed down* is an instruction to a generator. **The Plan uses only the second and the rule addresses
only the first, and no retrieved document states the relationship.** The record shows that the
relationship is unstated; it does not assert a contradiction.

## The absence that closes the arc, and it is a checked one

**No curtailment measure exists in CEA's three principal statistical publications.** `curtail`,
`backed down`, `not absorbed` and `must run` all return **zero** across the General Review 2025 and
the Executive Summaries for March and June 2026, against a positive control of `generation` returning
**192, 34 and 33** in the same files and the same form. `reasonKind: not-published` on the
data-existence test — despatch instructions exist in the grid operator's hands.

**Storage, for the record:** Exhibit 5.5a puts battery storage at **38.71-67.04 GW / 193.55-335.2
GWh** across the five 2031-32 scenarios. Carried in the record as context; no storage series authored.

## Noted, not claimed — a divergence worth a later look

The Plan states renewable-plus-large-hydro generation at **22.1 per cent for 2021-22**. The General
Review's own tables give **21.73 per cent** for FY2021-22 on what appears to be the same basis
(hydro + RES over total). **0.4 points apart, and not investigated** — plausibly vintage or universe.
Recorded so it is not rediscovered as a finding, and it is NOT asserted as a differentFacts pair.
