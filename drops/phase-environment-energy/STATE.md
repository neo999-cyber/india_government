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


## ARC B — ~~CLOSED PROVENANCE-ONLY~~ **SUPERSEDED: see the open-items entry 1b.** 2026-08-05

> **STATE CORRECTED 2026-08-05 (batch 13).** This heading said CLOSED PROVENANCE-ONLY while the
> open-items list simultaneously carried Arc B as having untried routes — **two states for one arc
> in one file.** The later state governs: **Arc B is BLOCKED WITH UNTRIED ROUTES**, on one capability
> gap (content behind a client-rendered page) plus one independent alternative (`data.gov.in`).
> The account below is what the targeted attempt of that batch found and remains accurate as history.

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

## 3. FIVE `contested` RECORDS — **NOTES WRITTEN 2026-08-05. None was work left undone.**
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

**CORRECTED 2026-08-05 (batch 13): this read "reframes EVERY e-Gazette-blocked absence in the corpus", and the blast radius measured in the same batch found exactly ONE — this run's own, in P-121.** L-0218's two were already corrected before phase 15 began and L-0219's is about client-and-day generally. The reframing is real and its scope was one record, not the corpus. **Same over-tidy-summary class as the four the standing rule has caught — and written into the very passage reporting one of those catches.** The sound statement: for any absence that DOES rest on this channel, the question is no longer "can the
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


---

# THE FIVE `contested` RECORDS — CLOSED 2026-08-05, and a structural finding falls out

**L-0018 · L-0025 · L-0059 · L-0068 · L-0076.** Each note now states which two readings are live and
why the record declines. **None turned out to be work left undone** — every one already carried a
substantive caseFor and caseAgainst resting on retrieved sources, which was the outcome worth checking
and is reported as a negative result rather than assumed.

## THE FINDING: `contested` is carrying two different things, and the corpus already has vocabulary for the distinction

| Record | Contest | Why the record declines |
|---|---|---|
| **L-0018** RCEP withdrawal | **EVIDENTIARY** | What separates the readings is what Chinese import growth WOULD have been inside RCEP. **No observation of a world India did not enter exists for anyone** |
| L-0025 loan write-offs | NORMATIVE | Prudential correctness against economic incidence. Both true of the same numbers |
| L-0059 unemployment | NORMATIVE | Absorption against structural transformation. The dispute is over the criterion, not the measurement |
| L-0068 farmers implicitly taxed | NORMATIVE | Consumer welfare against producer welfare — whose side of a transfer is the measure |
| L-0076 CBI general consent | NORMATIVE | Legality against functional effect |

**Four of five are NORMATIVE — the facts are agreed and the disagreement is about which frame
governs. Only one is EVIDENTIARY.** These are different objects wearing one value: a normative
contest cannot be resolved by any retrieval, while an evidentiary one names exactly what would
resolve it.

**And the corpus already has this vocabulary — `disputeKind: evidentiary | normative`** — defined in
the schema and used on `unmeasured[]` entries, where "evidentiary: the stated reason is contradicted
by evidence that the data exists" and "normative: the factual claim is not contested; what is
contested is the characterisation". **The distinction the assessment layer needs is already written
down one layer over.**

**REPORTED, NOT BUILT.** Extending `disputeKind` to the assessment layer is a schema change and
therefore a stop. What this cycle establishes is that **65 records carry `contested`** and the value
is doing at least two jobs — which bears directly on the `commitmentState` proposal, since the same
argument (a state a record can reach, with a written definition, rendered and gated) applies here and
the two should be designed together rather than in sequence.

## Method note

Each note also carries a `revisitTrigger` naming what would sharpen the contest **without pretending
it would settle a normative one** — for the four normative records the trigger explicitly says the
measurement would not resolve the criterion question. That distinction is the point of writing them.

---

# THE 67 `contested` RECORDS, READ INDIVIDUALLY — and the joint design that follows

**COUNT CORRECTION FIRST. It is 67, not 65.** 67 at `6e26544` and 67 at `2537cd8`, so nothing moved:
the previous report asserted a figure no gate emitted, which is the sixth unstated delta and the
second I have produced myself. The delta is zero; the error was in the reporting.

## THE HYPOTHESIS IS FALSE. Normative is a third of the corpus, not most of it

The brief's premise was that if the five-record sample generalised, most of the 67 would be normative
disputes. **It does not generalise.** Each record was classified by reading its own `caseFor`,
`caseAgainst` and `differentFactsNote` and asking one question: **what would settle this contest?**

| Ground | n | What would settle it |
|---|---|---|
| **criterion** (normative) | **22** | Nothing. The facts are agreed; the dispute is which frame or objective governs |
| **interpretation** | **13** | An authoritative reading of a document or statute. None has been given, or two inconsistent ones have |
| **evidence-withheld** | **11** | A specific figure or document that exists or is producible, and is not published |
| **measure** | **10** | Nothing, but the rival measures are enumerable — several valid published measures of one object point opposite ways and no party committed to one in advance |
| **evidence-unobservable** | **5** | Nothing. The settling fact is a counterfactual, or is unbuildable while the practice stands |
| **time** | **4** | Elapsed time. The readings make divergent predictions |
| *(vocabulary residue)* | *2* | Not a ground — the record says `contested` is standing in for a value that does not exist |

**criterion** — L-0015 · L-0019 · L-0020 · L-0025 · L-0040 · L-0059 · L-0068 · L-0076 · L-0084 ·
L-0085 · L-0088 · L-0096 · L-0099 · L-0105 · L-0125 · L-0126 · L-0152 · L-0165 · L-0170 · L-0171 ·
L-0173 · L-0203
**interpretation** — L-0075 · L-0100 · L-0101 · L-0113 · L-0115 · L-0128 · L-0158 · L-0159 · L-0160 ·
L-0163 · L-0195 · L-0224 · L-0226
**evidence-withheld** — L-0042 · L-0057 · L-0070 · L-0110 · L-0114 · L-0137 · L-0144 · L-0148 ·
L-0168 · L-0178 · L-0179
**measure** — L-0043 · L-0058 · L-0060 · L-0074 · L-0078 · L-0083 · L-0091 · L-0102 · L-0132 · L-0141
**evidence-unobservable** — L-0018 · L-0056 · L-0079 · L-0116 · L-0136
**time** — L-0031 · L-0082 · L-0118 · L-0145
**vocabulary residue** — L-0092 · L-0129

### WHY THE SAMPLE MISLED, and it was not only phase skew

The obvious explanation is that the five sat in the L-0015 to L-0076 range while the later phases —
J&K, federalism, GST — carry the interpretation and evidence cases. **That explanation is
insufficient.** In that same early range the 19 contested records split 8 criterion, 4 measure, 3
evidence-withheld, 2 evidence-unobservable, 1 time, 1 interpretation — **42 per cent normative, not
80.** The five were unrepresentative of their own neighbourhood. **Five records is too few to carry a
distribution and the previous report should not have invited one from them.**

### The two-value split does not fit, and the corpus said so before I did

**`disputeKind: evidentiary | normative` cannot be lifted onto the assessment layer.** Read verbatim
from the schema: *"evidentiary: the stated reason is contradicted by evidence that the data exists or
was held"*; *"normative: the factual claim is not contested; what is contested is the
characterisation of the non-release"*. **Both definitions are about the stated reason for an
absence.** Neither has any meaning applied to a contest between two readings of a measure. The
previous report's claim that "the distinction the assessment layer needs is already written down one
layer over" is **withdrawn**: the names transfer, the definitions do not, and the report reached that
conclusion from the names.

Twenty-three records would have to be forced into one of two boxes that fit neither: **interpretation
is not normative** (a court can settle it, and in L-0163 two courts did, seven months apart) **and
measure-selection is not evidentiary** (no missing datum exists — the problem in L-0141 is, in that
record's own words, *"not the absence of a common measure but an embarrassment of them"*).

## THE JOINT DESIGN — one rule, two instances. PROPOSAL ONLY, NOTHING BUILT, ENUM UNTOUCHED

### The rule

**The assessment enum answers exactly one question: what the record concludes about the measure.
Every other question a record must answer gets its own field, with its own written definitions,
rendered and gated.** `contested` and `commitmentState` are the same problem — a second axis being
pushed into a value on the first — and the corpus has already refused that move twice on this exact
reasoning: no fifth `reasonKind`, and no fifth commitment state. L-0224's own note states the
precedent in the form needed here: *"THE UNSCOREABILITY ITSELF IS NOT IN THE VERDICT AT ALL; it is a
measurement fact and it sits in `unmeasured[]`."*

So **neither proposal is an enum change.** Both are new second-axis fields carried beside the
assessment:

- **`contestGround`** — required when `assessment` is `contested`. Six values, each populated by at
  least four records that were read individually. Not invented vocabulary: every value was derived
  from the distribution above, and several records already name their own ground in prose.
- **`commitmentState`** — required on records carrying a dated commitment. States (a)/(b)/(c)/(d) per
  CLAUDE.md, unchanged.

Both share the schema shape the corpus already uses for `reasonDisputed` → `disputeKind`: an `allOf`
`if/then` that makes the second field required when the first takes a particular value.

### THE THIRD THING, AND IT IS WHY THEY MUST BE DESIGNED TOGETHER RATHER THAN IN SEQUENCE

**No gate asserts that an enum-valued or boolean field reaches its record's page.** This is not an
inference — both gates derive their scope the same way, and both exclude it by construction:
`field-render-audit` at line 54 tests `v.type === 'string' && !v.enum && !v.format && !v.pattern`,
and `no-unguarded-prose-field` derives identically. Their own output says so: *"32 prose field(s)"*,
*"19 prose field(s)"*. **`contestGround` and `commitmentState` are both enum fields and would both
land in the one hole the instrument has already fallen down once** — enumeration-scoped blindness is
what put 226 marks on the site invisibly with every gate green.

Two observations from the built output, script-stripped, confirm the hole is occupied rather than
theoretical:

- **29 ledger records render no verdict at all.** Every one is `no-objective` — L-0021, L-0022,
  L-0069, L-0071, L-0073, L-0087, L-0089, L-0103 and 21 others. This may well be a deliberate view
  decision, and printing "No objective" as a verdict chip would read oddly. **The finding is not that
  it is broken. It is that nothing asserts it either way and no written decision records the choice.**
- **`differentFacts: true` renders a label — "These cases don't share a common measure" — and `false`
  renders nothing.** The schema calls the false flag *"the judgement most at risk of being made
  silently"* and requires a note for it; the note reaches the page under `reachability`, **and the
  flag it explains does not.** 24 of the 67 carry `false`.

**Corrected in passing: my first probe reported 27 records whose `differentFacts` flag was
unrendered. That number is a probe artefact** — it searched for the literal field name where the view
paraphrases, the same class as `field-render-audit`'s first run reporting 53 false invisibles. It is
not reported as a defect.

### What the joint change would therefore have to supply

1. Two fields, two sets of written definitions, one conditional-required shape.
2. **A coverage assertion**: every `contested` record has a `contestGround`, every commitment record
   a `commitmentState`. Validator-level, cheap, and the thing that makes the field mean something.
3. **A render assertion for non-prose fields** — the general form, not one carved for these two.
   Without it the fields can ship invisible exactly as the 226 marks did.
4. A backfill of 67 grounds. The classification above is the backfill, already done by reading.

**(3) is the load-bearing item and it is a new gate, so it stops.** (1) is a schema change and stops.
Neither is built here.

### Two records that fall out of the reading and are NOT proposals

- **L-0075** (Vijay Madanlal) and **L-0101** (Samagra Shiksha) are candidates for
  `awaiting-adjudication` rather than `contested`. Each has a live proceeding before a body outside
  the enacting authority — review petitions admitted in 2022 and unheard, and Tamil Nadu's Article
  131 suit — which is `awaiting-adjudication`'s written test. **Candidates, not findings**: the
  contest in each may survive the ruling, and deciding that requires reading the pleadings rather
  than the docket. Logged for a batch that can retrieve them.
- **L-0092 and L-0129** both say in their own notes that `contested` is standing in for a
  presentational-finding value that does not exist, and both ask to be reviewed together. **L-0141's
  note independently names the same shape.** Three records, not two.

---

# SCOPE: a consistency check for STATE.md — and why the cheap version would have caught one of two

STATE.md is the cold-start authority, the lean-prompt form depends on it, and it is the only
load-bearing artefact with no gate. Two batches running have found one carrying contradictory states.

**What a state line is.** A line asserting the status of a named object — an arc, a queue item, a
route, a record — using a status token (CLOSED, BLOCKED, COMPLETE, OPEN, SUPERSEDED). It is
recognisable only if the object and the token are both identifiable, and **today neither is marked**:
both real instances lived in ordinary prose and in headings, not in any structured field.

**How a SUPERSEDED block is recognised.** Currently: not at all. I have written three by hand across
two batches, each in a shape I chose at the time. A checkable convention needs a superseding line to
(i) sit adjacent to what it supersedes, (ii) name it, (iii) state what is true instead — and the
checker must then treat the superseded line as **not live**, which is the whole point.

**What it would mean for two live lines to conflict.** Two live lines about the same object carrying
different tokens. **The hard term is "the same object", and this is where the cheap gate fails.**

| Instance | Would a token-matching check catch it? |
|---|---|
| **Arc B: heading "CLOSED PROVENANCE-ONLY" against an open-item entry listing untried routes** | **YES.** Same file, same name "Arc B", two tokens |
| **Phase 14: "the one unreachable, unduplicated channel" against line 133 recording L-0218's correction** | **NO.** The lines name different subjects on their face — a channel and a record — and are contradictory only underneath |

**One of two. Reported as one of two, because a sweep is worth what it catches (M3).** A gate
advertising STATE.md consistency while missing the instance that propagated a false claim into P-121
is worse than no gate, because it licenses the trust it does not earn.

**What would have caught both** is not a checker but a convention: **every state line carries the
date it was written and the object it is about, so the latest line about an object governs and every
earlier one is mechanically superseded.** The phase-14 lines would have been dated before line 133
and demoted without anyone having to notice they conflicted. That is an authoring change with a
trivial checker behind it, and it is the recommendation.

**Scope only. A new gate is a contract change and stops.**

---

# MINOR: `figure-consistency` cannot express the arithmetic L-0226 now prints

The claims file supports subtraction only — `printedA`, `printedB`, `printedDifference`. L-0226
prints two ratios, 11.11x and 2.56x, which are derived arithmetic a reader can check and **which
cannot be declared even by an author who wants to.** Three claims are declared on this record and the
gate reads 18; the ratios are outside its vocabulary. Noted, not built.

---

# PHASE-15 CLOSE AUDIT, PART 1 — THE ADVERSARIAL READ OF BATCHES 1-10

**QUEUE ITEMS. Written before any is resolved, per the standing rule. Nothing here is fixed in this
batch.** Batches 1-10 (cycles `af` through `ao`) were never read under the adversarial rule, which
entered at batch 11. Method: every arithmetic claim recomputed; every count reconciled against
`/data` at that batch's own end commit and against `reachability --data <commit>` run on the current
build; every report checked for a claim its own text undermines.

**METHOD LIMITS, stated so the negatives are worth what they cost.** (i) Historical reachability is
recomputed under **today's** MARKS list, which did not exist before `193ab72` — so **batch 1's
1147/1147 is not comparable** and is not audited. (ii) Historical data is checked against the
**current** build, so a mark whose text was later rewritten reports "renders nowhere" as a
cross-commit artefact, not a defect; two such appear (b1's `re-capacity` note, b7's L-0224 pair) and
neither is filed. (iii) Page counts cannot be reproduced this way and are not audited.

## THE HEADLINE NEGATIVE: THE ARITHMETIC WAS NEVER THE PROBLEM

**34 arithmetic claims recomputed across ten batches. 33 reconstruct exactly.** Every share, every
sum, every ratio, every percentage — the four NPP column sums to their printed totals, both non-fossil
shares, the 51.5 per cent GW ratio, the coal growth multiple, `24/35` and `24/33`, `45 − 34`, every
corpus subtotal, `30 + 8 = 38`, `33 + 3 + 1 = 37`, `164 + 62 = 226`.

**The one miss is 0.01 of a point** (Q-A1 below). **Not one substantive defect in ten batches was
arithmetic. Every one was a count, an attribution, or a scope** — and the instrument has a gate for
arithmetic and none for any of the other three.

## CLASS 1 — FABRICATED SCOPE (a figure asserted from no gate). INVISIBLE TO A DELTA CHECK

`validate` printed no record count until batch 6 (`d117832`). **Every record count in a batch-1 to
batch-5 gate line was therefore attached by hand to a gate that had not emitted it.** A delta check
cannot see this class: a fabricated figure that happens to be right passes every consistency test
there is.

- **Q-F1 · af "Corpus 662 → 673".** Recomputed: `966eb6a` = 662, `454e1fc` = 673. **Both correct, both
  fabricated.** The same entry's gate line reads `validate VALID 0 errors` with no scope — the entry
  holds the gate's real scope and an asserted one, three screens apart.
- **Q-F2 · ag "0 errors over 675 records".** Recomputed at `d4a1fdd` = 675. Correct, fabricated.
- **Q-F3 · ah "over 675 records".** Recomputed at `3b32f61` = 675. Correct, fabricated.
- **Q-F4 · ai "over 678 records".** Recomputed at `b20f2bb` = **676. WRONG.** Already superseded by
  aj, and it was caught only because batch 5 went looking — no gate could have caught it, because no
  gate had said anything.
- **Q-F5 · ao's commitment-state counts are not reproducible from the report.** *"the entire corpus
  contains 24 letter-tokens: (a) x21, (b) x1, (d) x2, and no (c) anywhere"*, and *"44 use
  commitment-state vocabulary"*. **The needle is not reported.** A naive reproduction over the same 8
  prose fields at the same commit gives **82 tokens across 31 records, including 16 of `(c)`** —
  because the corpus is full of statutory citations of the form `12(1)(c)`. **That probe over-fires
  and does NOT refute ao.** What it establishes is that the claim cannot be checked from the report,
  and that **"no (c) anywhere" is a strong negative published without its needle** — which is the
  corollary the phase itself wrote at M5.

## CLASS 2 — UNSTATED DELTA (a count that moved without being accounted)

- **Q-D1 · ai and aj emitted NO reachability count at all** — *"over every guarded mark on 656
  pages"*, *"every guarded mark on its own page"*. A gate whose entire output is a count, reported
  without one. **Omitted scope is worse than an unstated delta**: it breaks the chain, and it is why
  the next stated figure (ak's 1343) had no predecessor to be checked against.
- **Q-D2 · reachability moved four times with no delta stated:** ah 1336 → **ak 1343** (+7, spanning
  the two silent batches) → **al 1347** (+4) → **am 1352** (+5) → **an 1354** (+2). All four
  recomputed and all four correct. Unaccounted, not wrong.
- **Q-D3 · al, am and an each state the PREVIOUS batch's corpus delta and not their own.** al's head
  item is *"Corpus 676 → 678 is L-0223 and P-126… the DELTA was not [stated], for the third batch
  running"* — and al's own 678 → 679 (L-0224) is unstated, as are am's 679 → 680 (L-0225) and an's
  680 → 681 (P-127). **The fix was applied backwards each time and never to the batch applying it.**

## CLASS 3 — FALSE COUNT AND FALSE ATTRIBUTION. THE MOST CONSEQUENTIAL FINDING OF THE AUDIT

- **Q-W1 · ag's `reachability 1332/1332` is a MID-BATCH figure.** 1332 is the count at `193ab72`; the
  batch's final commit `d4a1fdd` is **1336**. Verified by running the gate at both: `--data 193ab72`
  → 1332, `--data d4a1fdd` → 1336. The gate was run before the batch finished adding P-123 and P-124,
  and the mid-batch number was reported as the batch's.

- **Q-W2 · ah's "reachability 1332 → 1336 is exactly P-123 and P-124" is false three ways.**
  1. **P-123 and P-124 were added in batch 2**, not batch 3 — provenance went 122 → 124 at `d4a1fdd`.
  2. **Batch 3 added no record and no mark.** The per-field breakdown at `d4a1fdd` and `3b32f61` is
     identical in all seven fields. **The true delta was ZERO.**
  3. The entry says *"Recomputed from the same MARKS list at both commits; no pre-existing record's
     count moved"* — **a method that would have returned 1336 at both ends.**

  **An explanation was constructed for a delta that never happened, in order to reconcile the
  previous batch's stale number.** It is internally coherent, it is arithmetically correct (2 records
  × 2 marks = 4), it names real records, and every part of it is wrong. **This is precisely the shape
  the adversarial rule exists to catch, and it survived ten batches** — where all five flags the
  conversational reviewer got wrong were caught within one or two.

- **Q-W3 · ag's "185 provenance records reported 'no page built'".** Provenance held **122** records
  at `193ab72`. 185 is `notes` (80) + `bridgeNote` (105) = **185 MARKS**. A mark count wearing a
  record label — and **numerically impossible as written**, 185 records where 122 exist.

- **Q-W4 · ai's "3 are this phase's own new records (L-0221, L-0222 and one other)".** Measured at
  `b20f2bb`, the three are L-0221, L-0222 and **L-0220 — a phase-14 record.** `33 + 3 + 1 = 37`
  holds; the label on the 3 does not. **The unnamed "one other" is the tell**: the report
  characterised a member it had not identified.

## CLASS 4 — A CLAIM AGAINST A PREMISE THE SAME REPORT UNDERMINES

- **Q-P1 · ai contained its own refutation and shipped the conclusion anyway.** Verbatim:
  *"Playwright returns `ERR_NAME_NOT_RESOLVED` against PRANA — **it inherits the broken system
  resolver** — and the in-app browser denied the navigation. **Two rendering clients, both fail:
  tested, not assumed.**"* The DNS cause is stated **in the same sentence** as the rendering
  conclusion. Batch 10 withdrew the conclusion and presented the DNS finding as new. **It was not
  new. It was printed in the entry that made the claim, and it went unused for six batches** while
  Arc B was recorded as blocked on a capability that was never tested.

- **Q-P2 · ao's "181 records assert nothing" is stated as exact and is a bound.** It is `225 − 44`,
  where the same paragraph calls 44 *"a candidate list, since some match only on `no-objective`, an
  assessment value rather than a state"*. If 44 over-counts the asserting set then 181
  **under**-counts the silent one. The direction is conservative and the argument survives; **the
  defect is the exactness**, not the number.

## CLASS 5 — VERDICT AGAINST ITS OWN NOTE. JUDGMENT FINDINGS, FLAGGED NOT RESOLVED

Per the batch's own instruction, and per item 4: this pass reads its own past output and is expected
to be stronger on arithmetic than on judgement. It produced **two** judgement flags and resolves
neither.

- **Q-V1 · al filed L-0224 `too-early` in an entry that argues `too-early` is wrong.** Verbatim:
  *"They are not honestly `too-early` either, **which is what WAS scored**: that value's definition
  says the obstacle is elapsed time and the evidence time accumulates, and here time accumulates
  nothing."* The entry states the verdict is unsound, files it, and defers to an enum question. Batch
  8 re-filed it `contested`. **The verdict shipped for one batch under an argument against itself**,
  and the deferral was to a question the same entry had already answered on the printed definitions.
- **Q-V2 · ah's "No shipped verdict reopened: L-0221 stays `partly`, L-0222 stays `failed`"** holds —
  both stand today. Recorded as a check that passed, not a finding.

## PHASE-15-LOCAL vs CORPUS-WIDE — only the first blocks closing

**PHASE-15-LOCAL (blocks closing):** Q-F1 · Q-F2 · Q-F3 · Q-F4 · Q-W1 · Q-W2 · Q-W3 · Q-W4 · Q-D1 ·
Q-D2 · Q-D3 · Q-A1. All are figures or attributions inside this phase's own log, and the log is the
phase's product.

**CORPUS-WIDE (does NOT block closing):**
- **`validate` printed no record count until `d117832`, so EVERY gate line in the log quoting a
  record count before that commit is a fabricated scope by construction.** That reaches back through
  all fourteen prior phases, not five batches. **This is the largest finding of the audit and it is
  not phase 15's to fix.**
- The needle-less negative (Q-F5's class) — M5's corollary is a method rule with nothing enforcing it.
- A report containing its own refutation (Q-P1's class).
- A verdict filed under an argument against itself, deferred to an open question (Q-V1's class).

## Q-A1 — the one arithmetic miss, and it is 0.01

ai states *"the seam alone was inflating the widening by **1.29** points"*, computed as
`11.77 − 10.48`. **The record prints 10.47**, the unrounded figure, with the artefact declared — so on
the record's own basis the inflation is **1.30**. The entry names the 10.47/10.48 artefact two
sentences earlier and then derives from the operand it had just set aside. Local, trivial, and
exactly the class this phase caught four times.

---

# PHASE-15 CLOSE AUDIT, PART 2 — THE FOUR RESIDUALS AND THE SHIPPED-RECORD AUDIT

**FINDINGS ONLY. Nothing resolved.** No verdict is contradicted by anything below, so no stop.

## 1. The 0.01 miss, fully identified — and it is live in a shipped record

**Batch 4 (cycle `ai`). The claim: *"the seam alone was inflating the widening by 1.29 points."*
The record: L-0221, field `summary`,** where it still reads *"starting there instead gave 11.77
points, so the seam alone was inflating the widening by 1.29."* It is repeated in the `note` of
L-0221's declared widening claim in `tools/lib/figure-claims.json`.

**It does NOT fall inside a declared rounding artefact.** L-0221's summary declares two artefacts —
`10.47/10.48` for the widening and `24.24/24.25` for the full-window gap — and **neither covers 1.29.**
1.29 is a **third** derived quantity, `11.77 − 10.48`, computed from the printed-operand value the
same sentence sets aside two clauses earlier in favour of 10.47. **On the record's own leading basis
the seam contribution is 1.30.**

**It does not contradict a figure declared source-exact either**, and the precise statement matters:
the widening claim IS declared, with unrounded sources reconstructing to 10.47 exactly — but 11.77 is
itself an undeclared printed-operand figure, so 1.29 is **an undeclared third rounding artefact
derived from an operand the record rejected**, not a contradiction of a source-exact one.
`figure-consistency` cannot see it: claims are declared, never mined. Same class as L-0226's
undeclarable ratios and L-0223's two loose figures.

## 2. The letter-token distribution, re-run WITH THE NEEDLE PRINTED

```
NEEDLE     (?<![0-9A-Za-z\)])\(([a-d])\)
EXCLUSION  a '(' immediately preceded by [0-9A-Za-z)] — the statutory-citation form.
           29 such occurrences excluded corpus-wide: 12(1)(c), 239AA(7)(b), 370(1)(d), 43D(5), 60(5)(c).
```

**69 tokens survive, across 24 records — and they are THREE DIFFERENT VOCABULARIES:**

| vocabulary | tokens | records |
|---|---|---|
| **commitment states** | 39 | 15 |
| **`differentFacts` criteria (a)(b)(c)** | 16 | L-0132, L-0133, L-0141, L-0144, L-0145, L-0146, L-0148 |
| other enumerations (CAATSA's three statutory states in L-0199, list markers) | 14 | 7 |

**THE SUBSTANTIVE FINDING SURVIVES AND IS NOW EARNED: no record asserts commitment state (c).**
Read individually, the positive self-assertions are **(a) on twelve records** — L-0188, L-0194,
L-0196, L-0201, L-0204, L-0205, L-0212, L-0216, L-0221, L-0223, L-0224, L-0225 — **(b) on two**
(L-0188, L-0222), **(d) on one** (L-0213), **and (c) on none.** The only two `(c)` tokens in a
commitment-state context are explicit negatives: L-0209 *"cannot reach (c) abandoned"* and L-0213
*"nothing evidences abandonment, so it is not (c)"*.

**`ao`'S STATED DISTRIBUTION DOES NOT SURVIVE.**
- *"no (c) anywhere"* is **false as a token claim.** `(c)` occurs 18 times — and **L-0224's own
  `assessmentNote`, written two batches BEFORE `ao`, reads "Not (c) — nothing retrieved repudiates
  them."** The claim was falsified at the moment it was made, by a record the same phase authored.
- *"(b) ×1"* is **false on any needle.** L-0188 and L-0222 both assert (b) at `ao`'s own commit.
- The totals (24 / 21 / 1 / 2) are not reproducible under any needle constructible from the report.

**AND A THIRD FINDING BEARS DIRECTLY ON THE DESIGN: the corpus already runs three separate `(a)-(d)`
vocabularies in the same prose fields.** A bare-letter `commitmentState` would collide with the
`differentFacts` criteria on seven records that use both. That is independent confirmation of batch
10's recommendation of NAMED values — reached from the data rather than from readability.

## 3. "Fabricated by construction" — SCOPED, AND MY OWN CLASSIFICATION WAS WRONG

**`manifest` emits a record count.** `manifest OK — 682 records, 71,554 bytes`. It has been in the
build chain throughout, and **nine gate lines in the log quote it.** Batch 15 filed *"every record
count in a gate line before `d117832` is a fabricated scope by construction — fourteen phases"* as the
audit's largest corpus-wide finding. **That is wrong and is withdrawn.**

**The true scope is three lines.** Exactly three lines in the entire log attribute a record count to
`validate`, the gate that never emitted one — cycles `ag` (675, correct), `ah` (675, correct) and `ai`
(678, **wrong, 676**). **All three are phase 15.** The finding is phase-15-LOCAL, not corpus-wide, and
it moves from the non-blocking list to the blocking one.

**LOAD-BEARING sites — a count cited as evidence rather than printed in a gate line:**

| site | count | what it carries |
|---|---|---|
| cycle `p`, assessment audit of phases 1-13 | **619 records swept — 183 ledger, 118 provenance, 60 pairs, 258 series** | the audit's own COVERAGE claim, repeated in its limits statement. Sum reconstructs (183+118+60+258=619) |
| cycle `p` | *"141 T1 citations across 113 records"* | **already corrected** one cycle later to *"313 bare-root citations across 255 records"* — the detector had filtered on `tier == 'T1'`. Proof the class is real AND that it was caught |
| phase 10 merge | *"91 records merged; unified corpus 390"* | merge completeness |
| phase 12 merge | *"15 pairs (PR-33-PR-47). Corpus 444 → 511"* | merge completeness |
| federalism merge | *"106 records: 34 ledger…"* | merge completeness |
| the shape sweep | *"149 records, no value added"* | sweep coverage, in a heading |

**Everything else is decorative** — a gate line quoting `manifest`, `reachability` or
`domain-coverage`, all of which emit their own scope. **Reported, not corrected, per instruction.**

## 4. The adversarial-read rule reordered by observed yield — DONE, in `CLAUDE.md`

Checks now run **counts → attributions → scopes → STATE.md state lines → verdict-against-note and
self-undermining premises → arithmetic LAST**, with the reason recorded in the rule itself: 34
arithmetic claims recomputed across ten batches, 33 exact, the one miss 0.01 of a point — against four
count-or-attribution defects in the same ten, one of them an explanation constructed for a delta that
never happened. **The instrument gates arithmetic and gates none of the other three, and the defects
follow the gaps.**

---

# THE SHIPPED-RECORD AUDIT — L-0221 to L-0226, P-121 to P-127

Method: every commit that touched each record, field by field, then the **untouched** fields read for
residues. **The prediction held — corrections landed in some fields and not others.**

| record | edits after creation | fields corrected | fields never touched |
|---|---|---|---|
| L-0221 | 4 | summary, whatHappened, assessmentNote, provenanceRefs | **caseFor, caseAgainst, caveat** |
| L-0222 | 1 | summary, whatHappened | caseFor, caseAgainst |
| L-0223 | 1 | whatHappened, caseAgainst | summary, caseFor |
| L-0224 | 2 | assessment, assessmentNote, revisitTrigger, unmeasured | **summary, whatHappened, caseFor, caseAgainst** |
| L-0225 | 1 | assessmentNote, unmeasured | summary, whatHappened |
| L-0226 | 2 | whatHappened, caseAgainst | **summary** |
| P-121 | 1 | notes | whatChanged, bridgeNote |
| P-125 | 2 | whatChanged | notes, bridgeNote |
| P-127 | 1 | bridgeNote | whatChanged |
| P-122 · P-123 · P-124 · P-126 | 0 | — | all |

## FINDING R1 — L-0226's `summary` still carries the truncation the record was corrected for

**`summary` was never edited.** It reads: *"…about 1 per cent of renewable generation will not be
absorbed in 2026-27 and around 3.3 per cent in 2031-32 — and that on a different assumption about how
far coal plants can turn down, **the 2026-27 figure falls to 0.09 per cent.**"*

**Both years for the 55 per cent minimum-technical-load projection; only 2026-27 for the 40 per cent
variant.** The 2031-32 figure of 1.29 per cent is absent. That is **exactly the truncation batch 13
corrected in `whatHappened`** and batch 14 refined in `caseAgainst` — and the omission is the one that
flatters the record's argument, since it leaves the 11.11x near-year sensitivity standing without the
2.56x far-year one beside it.

**Worse than an ordinary residue: `summary` is the field a reader meets first**, and both corrections
sit downstream of it. **NOT A STOP** — the verdict is `contested` on the guarantee-against-projection
relationship, which the sensitivity magnitude does not touch.

## FINDING R2 — P-123 carries 28.84 per cent as its own figure, one batch after it was corrected to 28.96

P-123 was written in batch 2 and **has never been edited.** Its `whatChanged` reads: *"on the figures
both are measured by, non-fossil sources were 53.21 per cent of installed capacity at 31.03.2026 and
**supplied 28.84 per cent** of the electricity generated over FY2025-26."*

**Batch 3 established that 28.84 puts CEA's Bhutan import inside the denominator and outside the
numerator — a population mismatch inside a share — and corrected L-0221 to 28.96.** The correction was
propagated to L-0221 and to all four affected series notes. **It was not propagated to P-123**, which
states the superseded figure flat, with no contrast, no correction and no pointer.

**The corpus therefore carries two values for one quantity in two records, and the superseded one is
presented as fact.** NOT A STOP: P-123 is provenance and carries no verdict, and 0.12 of a point does
not touch L-0221's `partly`, which rests on element 2 having no reporting at all.

## Reported as defensible rather than as defects

- **L-0221's `caseFor`** — never edited across four correction passes — says *"non-fossil generation
  reached 29.2% in FY2025-26 on the Ministry's own figure"* where the summary leads on 28.96. **This
  is sound**: the figure is explicitly attributed to the Ministry, and `whatHappened` carries the
  reconciliation (28.96 removes the import from both sides; 29.27 counts it on both, close to the
  Ministry's 29.2). The only weakness is that `caseFor` gives no pointer to it.
- **L-0221's `caseAgainst`** says two releases *"announce the capacity limb as though it were that
  goal"* — where "that goal" is Panchamrit element 2. **That is the CORRECTED claim, not the withdrawn
  one**, and it agrees with P-123.
- **P-123's "COP26 announced no such limb"** is scoped to the *"50 per cent of installed electric
  power capacity"* formulation, which Glasgow genuinely did not announce. **The withdrawn claim was
  the unscoped one about the capacity limb generally.** Surface similarity, different object.
- **P-126's 28.84** is a live use and correct: it names 28.84 as the error against 28.96, which is the
  record's purpose. **My detector flagged it as a live claim — a detector artefact**, because P-126
  draws the contrast without using the words `CORRECTED` or `previously`.

**Corpus-wide sweep for the other superseded phase-15 figures: `24.37` — 0 occurrences. `9.69` — 0
occurrences.** Both fully purged.

---

# PHASE-15 CLOSE AUDIT, PART 3 — RESOLUTION, AND THE PHASE CLOSES

## 1. P-123 DOES carry an assessment. Batch 16 passed a stop-check on an unchecked premise

P-123 carries **`directionOfBias: "obscures"`**. Batch 16 passed R2 as no-stop on the ground that
"P-123 is provenance and carries no verdict" — **a premise it never checked, in a phase where P-121
carries `obscures` and P-122 carries `overstates-pre-2014` two records away.**

**The conclusion survives on the correct ground.** P-123's finding is that a capacity number is
offered against an energy-shaped promise; correcting 28.84 to 28.96 moves the generation term by 0.12
of a point and leaves `obscures` exactly where it was. **Verified, not assumed: all seven phase-15
`directionOfBias` values and all six assessments are unchanged from `8964806`.** Recorded as
instructed and the run continues.

## 2. The load-bearing counts — ALL FOUR RECONSTRUCT, and my first recomputation was the error

| claim | recomputed | verdict |
|---|---|---|
| assessment audit: **619 swept** — 183 ledger, 118 provenance, 60 pairs, 258 series | 183 · 118 · 60 · 258 = **619** | **exact** |
| phase 10 education: **91 merged, corpus 390** | +91 (20 ledger, 50 series, 12 prov, 9 pairs) → **390** | **exact** |
| phase 12 kashmir-rights: **444 → 511** | 444 → 511, +67 = 25 · 15 · 12 · 15 | **exact, per layer** |
| phase 13 federalism: **+106** | +106 = 34 ledger · 42 series · 19 prov · 11 pairs | **exact, per layer** |
| shape sweep: **149 records** | ledger at that commit = 149 | **exact** |

**The 619 disagreed on first recomputation — 623 — and the disagreement was MINE.** The audit
excludes `data/series/foreign-trade.json` as well as the ledger file and P-119/P-120, and says so
**two lines below the figure**: 262 − 4 = 258. **I recomputed the number without reading the sentence
that scoped it**, which is the same class as the field-render audit's 53 false invisibles. Filing
these as sites needing verification was right; the verification cleared every one.

## 3. The 39/40 tokens accounted, per token, assert against mention

**69 tokens under the published needle: 40 commitment-state · 17 `differentFacts` criteria · 8
CAATSA statutory (L-0199) · 4 other.** Of the 40:

| | tokens |
|---|---|
| **ASSERTS a state for the record itself** | **17** |
| mentions: **rules a state OUT** for itself | 13 |
| mentions: **prospective** — a state a revisit trigger says it would move to | 6 |
| mentions: **quotes CLAUDE.md's definition** | 2 |
| mentions: **cross-reference** to another record | 2 |

**ASSERTING RECORDS: (a) 12 · (b) 2 · (d) 1 · (c) 0.** L-0188 asserts both (a) and (b) for different
limbs, so the distinct set is **14 records**.

**THE "NO (c)" FINDING HOLDS AND IS NOW EARNED AT TOKEN LEVEL: four `(c)` tokens sit in a
commitment-state context and every one is a mention** — L-0209 *"cannot reach (c) abandoned"*, L-0213
*"nothing evidences abandonment, so it is not (c)"*, L-0224 *"Not (c) — nothing retrieved repudiates
them"*, and L-0188's list marker for a limb that is expressly *"neither"*. **Zero assertions.**
Batch 16's record-level distribution (12 · 2 · 1 · 0) is confirmed; what it lacked was this
distinction, which is what the finding rests on.

**A NEEDLE-SENSITIVITY FINDING, against this batch's own method.** The commitment-state token count
moved **39 → 40** between batch 16 and this batch with no data change, because the **context window**
changed from 140/120 characters to 130/110 and one L-0225 token crossed a bucket boundary. **The
window is part of the needle and publishing the pattern alone is not enough.** An automatic classifier
also mislabelled three tokens — reading `Not (c) —` as an assertion twice, and L-0223's *"is
commitment state (a). NOT awaiting-adjudication"* as a negation, where the NOT governs the next
clause. **All three were corrected by reading. A substring test is not a claim check (M5), and that
holds against a classifier as firmly as against a grep.**

## 4. RESOLUTION OF EVERY QUEUED FINDING

**Batch 15's log says "twelve findings written into STATE.md". IT FILED SIXTEEN** — seventeen `Q-`
labels of which `Q-V2` is a check that passed. **My own miscount, in the batch whose subject was
uncounted and fabricated figures.** Corrected here.

### Corrections applied to shipped records — three, each carrying its withdrawn wording

- **L-0221 `summary` (Q-A1).** *"inflating the widening by 1.29"* → **"by 1.30 on the unrounded basis
  this record leads on, or 1.29 on the printed operands"**, with the withdrawn form and its
  derivation stated: 1.29 is `11.77 − 10.48`, computed from the printed-operand widening the same
  paragraph sets aside in favour of 10.47, and the summary's two artefact declarations cover the
  widening and the full-window gap but not this third quantity.
- **L-0226 `summary` (R1).** Now gives **both** 40-per-cent-minimum-technical-load variants — 0.09 per
  cent for 2026-27 **and 1.29 per cent for 2031-32** — with the withdrawn sentence named as the same
  truncation corrected in `whatHappened` two batches earlier and never carried forward.
- **P-123 `whatChanged` (R2).** 28.84 → **28.96**, with the Bhutan-import basis defect stated, the
  failed propagation named, and `directionOfBias` recorded as unchanged on the face of the record.

### Findings closed as recorded — the defect is historical and the class is now guarded

**Q-F1 · Q-F2 · Q-F3** fabricated scopes whose figures were correct (662→673, 675, 675). **Q-F4**
`ai`'s 678, wrong at 676, superseded by `aj` before this audit. **Q-D1** `ai` and `aj` emitting no
reachability count. **Q-D2** four unstated reachability deltas, all four recomputed correct. **Q-D3**
`al`, `am` and `an` each stating the previous batch's corpus delta and not their own. **Q-W1** `ag`'s
mid-batch 1332 against its own 1336. **Q-W2** `ah`'s explanation for a zero delta. **Q-W3** 185 marks
labelled 185 records over a 122-record layer. **Q-W4** L-0220, a phase-14 record, counted among "this
phase's own new records". **Q-P1** `ai` printing its own refutation in the sentence that made the
claim. **Q-V1** `al` filing `too-early` in the entry arguing against it, superseded by batch 8.
**Q-V2** a check that passed and is not a finding.

**None of these is fixable by editing text: they are defects in reports that the append-only rule
preserves.** What closes them is the guard — **`validate` now prints its own scope, and the
adversarial-read rule now runs counts, attributions and scopes FIRST.** Recorded, not rewritten.

### Corrected with a recomputation

- **Q-P2** — `ao`'s *"181 records assert nothing"*. Recomputed against the published needle:
  **14 records assert a commitment state, so 211 assert nothing at `ao`'s own commit** (225 − 14) and
  212 at HEAD. **`ao` undercounted the silent set by 30**, in exactly the direction batch 16 predicted
  when it called 181 a bound rather than a value.
- **Q-F5** — `ao`'s distribution. **Withdrawn and replaced** by section 3 above. *"No (c) anywhere"*
  was false as a token claim when written, falsified by L-0224's own note two batches earlier;
  *"(b) ×1"* is false on any needle. **The substantive claim it was carrying survives and is now
  earned.**

### WITHDRAWN — an artefact, not a defect

- **Batch 16's near-miss list stands as reported**, but one entry is upgraded: **P-126's live 28.84
  was flagged by my own detector and cleared by reading — it is correct usage.** It stays cleared.
- **Batch 15's "fourteen phases" scope claim** was already withdrawn in batch 16 and is not reopened.
- **The 619 recomputation disagreement is withdrawn as MY error, not the audit's** (section 2).

## 5. LOGGED, NOT FIXED — `figure-consistency` has the enumeration-scope defect it exists to catch

**`figure-consistency` checks claims that are DECLARED and never mines for undeclared ones.** Its own
header says so and gives the reason — a mining pass reported 197 failures on a corpus with two real
cases. **The consequence is that an author who does not declare a derived figure is outside the gate
entirely**, and this phase produced four instances: L-0223's *"roughly two-thirds"* and *"about ten
points"*, L-0226's two ratios (which the subtraction-only claim format cannot express even if
declared), and L-0221's 1.29 — **all four found by hand, none by the gate.**

**This is the same enumeration-scope class as `reachability`'s list and `ownPage()`'s default: the
guard binds what it enumerates, and silence about a figure is doing the work of a decision.** It sits
in the gate meant to catch arithmetic. **A mining pass is a gate contract change and therefore a stop
— it belongs to the structural cycle, not to this one.** Logged.

---

# PHASE 15 — ENVIRONMENT AND ENERGY — CLOSED

## Shipped

**6 ledger records · 7 provenance records · 7 series**, in two new files
(`data/ledger/environment.json`, `data/series/environment.json`).

| | |
|---|---|
| **L-0221** `partly` | Non-fossil capacity against non-fossil generation. **The phase's central finding: 53.21 per cent of capacity, 28.96 per cent of generation, and a gap that widened 10.47 points FY2014-15→FY2023-24 inside one document** |
| **L-0222** `failed` | "India will stop importing thermal coal from FY2023-24" — 205.72 MT of non-coking imports in the target year, the series maximum; CIL 773.81 MT against 1,000 |
| **L-0223** `too-early` | Emissions intensity: 33-35% raised to 45% below 2005 by 2030, **after 24 points had already been banked** |
| **L-0224** `contested` | One billion tonnes and a 2.5-3.0 GtCO2e sink — **dated, quantified, and unscoreable for want of a stated baseline** |
| **L-0225** `too-early` | Net zero by 2070. One clause, no scope, no interim milestone |
| **L-0226** `contested` | A rule guarantees no RE capacity is backed down; the plan built on it projects that some will not be absorbed |
| **P-121 · P-122** | Four concurrent official boundaries for "renewable"; renewable generation imputed, not metered, to FY2013-14 — **a break at 1 April 2014, weeks from the frozen baseline** |
| **P-123 · P-124** | A 50-per-cent-of-CAPACITY target published as a COP26 goal when Glasgow's 50 per cent limb was ENERGY; the NDC substitution |
| **P-125 · P-126 · P-127** | NCAP's target construction; the FY2024-25 generation seam; ISFR 2023's two definitions of forest cover and its moved base |

## Arcs

**A CLOSED** — spine in batch 1, remainder in L-0226. **C CLOSED PROVENANCE-ONLY** — the definition
established, clearances untouched, and the record says so. **D COMPLETE.** **B BLOCKED** on one
untested capability: `prana.cpcb.gov.in` is client-rendered and the "no rendering client" claim was
withdrawn as a DNS failure misread. Four routes stand in cost order, none run.

## What the phase built besides records

`no-unguarded-prose-field` · `field-render-audit` · `tools/lib/guarded-marks.mjs` · `validate`
printing its own scope · `seam-span-report` (report-only) · and **226 marks that had shipped invisible
through every prior phase, fixed and proven on a real regression.**

## OPEN AND OWNED BY THE NEXT CYCLE — not phase-15 residue

These are **structural, corpus-wide and explicitly not closed by this phase.** They do not belong to
environment and energy and must not be inherited as leftovers.

1. **`figure-consistency`'s mining gap** — section 5. Four undeclared derived figures this phase, none
   caught by the gate. A gate contract change.
2. **`commitmentState`** — scoped batch 10, distribution established batch 16 and confirmed here:
   14 records assert, 212 do not, none asserts (c), and **three separate `(a)-(d)` vocabularies run in
   the same prose fields**, so named values are required rather than preferred. A schema change.
3. **The `contested` split** — 67 records read individually: criterion 22 · interpretation 13 ·
   evidence-withheld 11 · measure 10 · evidence-unobservable 5 · time 4 · vocabulary residue 2.
   **To be designed WITH `commitmentState`, since both need a render assertion for non-prose fields
   that no gate supplies.**
4. **The seam-span triage** — 117 spans, 29 undeclared, report-only, untriaged.
5. **Arc B's capability** — one rendering client against a resolvable host.
6. **The deployment-auth decision** — the operator's, outstanding. `india-government.vercel.app`
   serves the full corpus unauthenticated. **No auth setting has been changed by any run.**

---

# PUBLICATION — 2026-08-06

## OPERATOR DECISION, STANDING: the site is deliberately public

**Recorded 2026-08-06 as a decision, not a default.** `india-government.vercel.app` serves the full
corpus unauthenticated because the operator intends it to. The reasoning is that the instrument is
built from primary documents that are already public, so publishing the record of them discloses
nothing the sources do not. **Push is autonomous from this date.** The deployment-auth item, open
since batch 3 when the exposure was first reported and deliberately left unchanged by every run
since, is **CLOSED**.

**A distinct setting is unchanged and is also a choice:** `app/layout.tsx` sets
`robots: { index: false, follow: false }`. **Public is not the same as indexed** — reachable to
anyone with the link, not surfaced by search. No instruction covered indexing and none was inferred.

**Seven commits pushed**, `57a6722..059912b`. Deployment verified against the artefact rather than a
status field, with three positive and three same-form negative controls on the same pages: L-0221's
`1.30 on the unrounded basis` present and the pre-correction sentence absent; L-0226's `0.09 per cent
and 1.29 per cent respectively` present and the truncated sentence absent; P-123's `supplied 28.96`
present and `supplied 28.84` absent. **Six of six.**

## THE FOOTER WAS FALSE AND IS REPLACED — and one claim in the replacement did not survive checking

*"Private research instrument. Not for publication."* is gone. What replaced it states what the
instrument is, that it has one author working with an AI assistant, and that no independent review
has been run — with the substance on `/method#limits` and a short form in the footer itself.

**THE OPERATOR'S OWN FRAMING WAS CORRECTED, and this is a decision taken rather than a question
asked.** The instruction described the corpus as *"built entirely from public government
primaries."* **Measured, it is not.** Of **1,205 source citations: T1 752 · T4 102 · T2 51 · T3 25 ·
T5 6 · untiered 269**, and **287 citations are not on an Indian government host at all** — UN
Comtrade, World Bank, ASER, `govinfo.gov`, OHCHR, PubMed, JKCCS, SATP.

**Publishing "entirely government primaries" would have been a false claim on a public page, and
false in the direction that matters most.** The non-governmental sources are concentrated exactly
where the state does not measure or is itself the disputed party — pellet injuries recorded by
hospital ophthalmologists in peer-reviewed journals, J&K civilian deaths, shutdown durations. **Those
records depend on non-government evidence BECAUSE the government does not publish it, which is the
finding.** A footer erasing that would have flattered the corpus by misdescribing its strongest work.
The published wording gives the real mix and the grading rule.

**Left for the operator to settle, and only this:** the byline. The draft says *"one author, written
with an AI assistant"* and names nobody. Whether to name a person is not a call the evidence settles.

## READER-FACING SURFACE AUDIT — one real defect, found and fixed; one detector artefact, withdrawn

**Corrections and withdrawn wording all reach a reader.** `field-render-audit` compares the **full
normalised value**, not a prefix, so a `CORRECTED 2026-08-05:` passage appended mid-field or at the
tail is covered — which matters, because `reachability` probes only the **first 60 characters** and
would not have caught a clamped tail on its own. **The two gates are complementary by design and the
complementarity is load-bearing.** Prose, all layers: **32 fields, 0 invisible.**

**Absences reach a reader in full**: `unmeasured[].what` 150/150, `.why` 150/150, `.wouldFill`
131/131 on ledger, and the same three on series. `reasonKind` renders on **379 of 379**.

**THE DEFECT: `disputeKind` reached no reader on any of its 19 entries.** The schema **requires** it
whenever `reasonDisputed` is true; `components/marks.tsx` read `reasonDisputed`, printed
*"— stated reason disputed"*, and **never read `disputeKind` at all.** No comment explained the
omission — **the silence was doing the work of a decision, which is the 226-marks shape exactly, in
the field batch 14 examined as the donor vocabulary for the `contested` split.**

It matters because the two are different findings. **`evidentiary` means the holder's stated reason
is contradicted by evidence the data exists — the government's account is falsified.** `normative`
means nobody disputes the facts and what is contested is the characterisation, usually against a
legal obligation. A reader told only "disputed" cannot tell a caught misstatement from a legal
argument. **15 ledger records and 4 series were affected**, including L-0074 (ED case affiliations),
L-0114 (pellet injuries), L-0136 (shutdown orders) and L-0052.

**Fixed in the view**: the label now reads *"stated reason disputed on the evidence"* or *"…on the
characterisation"*. **19 of 19 now render.** **The GUARD is not fixed and is not this batch's**:
adding an enum field to `guarded-marks.mjs` extends a gate's scope, which is a contract change and
belongs to the structural cycle — where it joins the render assertion for non-prose fields that
`commitmentState` and the `contested` split both need.

**WITHDRAWN as a detector artefact:** a first sweep reported **96 invisible `reasonKind` values**.
They render — as `never collected` and `collected, not published`, the view's own labels — and my
needle searched for the raw enum tokens. **Re-run against `REASON_KIND_LABELS` itself: 379 of 379.**
Third instance this phase of a detector, not the artefact, being wrong; caught the same way each time,
by reading the page before believing the count.

## PHASE 15 — OPEN ITEMS: NONE

Arcs A, C and D closed; B blocked on one untested capability and recorded as blocked, not complete.
Six ledger records, seven provenance records, seven series shipped. The close audit's sixteen queued
findings are resolved, corrected or withdrawn. **The deployment-auth decision is closed above, and it
was the last item.**

**Carried to the structural cycle, owned by it and not by this phase:** `figure-consistency`'s mining
gap · `commitmentState` · the `contested` split · the render assertion for non-prose fields, now with
`disputeKind` as its worked instance · the 29-candidate seam-span triage · Arc B's rendering
capability. **And the deferred verification plan — the adversarial model pass was specified as due
"after phase 15", which is now.**

## DEPLOYMENT ANOMALY — recorded, because it will recur

**`385a4a0` was pushed, GitHub had it on `main`, and Vercel created NO deployment for twenty
minutes** where every one of the previous twenty commits deployed in under three. `list_deployments`
with `since` returned **count 0** — not a slow build, no build. A CLI production deploy
(`vercel deploy --prod`) **aborted on upload**, the working tree carrying the 662-page `out/`.

**Resolved with an empty commit** — `c76009f`, no data change, gates not re-run because the tree was
byte-identical to the tree that had just passed them. **The webhook fired and the build was live
inside sixty seconds.** So the integration was working and had simply missed one event.

**The lesson is the one this phase keeps relearning: `git push` succeeding is not deployment, and a
deployment's absence looks exactly like a slow build for the first several minutes.** The check that
settled it was `list_deployments --since`, which reports **count 0** rather than a stale row — a
status field that can distinguish "not started" from "in progress". **Nine minutes of polling the
site could not have told those apart, and did not.**

## LIVE VERIFICATION — 11 controls, all passing

Against `india-government.vercel.app`, scripts stripped, positives and negatives in the same form on
the same pages: new footer **present** and *"Private research instrument. Not for publication."*
**absent** · the limits disclosure and authorship line **present** · *"752 are graded T1"* **present**
and *"built entirely from public government primaries"* **absent** · *"no part of this has been
checked by anyone who did not write it"* **present** · `disputed on the evidence` on L-0074 and
`disputed on the characterisation` on L-0081 **present**, with the wrong kind **absent** from L-0074
· batch-17's `1.30 on the unrounded basis` still live on L-0221.

`<meta name="robots" content="noindex, nofollow">` confirmed unchanged on the live page.

---

# RESUME HERE — written 2026-08-06 for a cold start

**Phase 15 is CLOSED and has no open items. `main` @ `356a7df` + this commit, 0 unpushed, live and
verified at https://india-government.vercel.app (public by decision, `noindex` by a separate one).**

**THE NEXT SESSION IS THE STRUCTURAL CYCLE. It is not phase 16 and it is not phase-15 leftovers.**
Six items, and the first four are ONE design because all of them need the same missing gate:

1. **The non-prose render assertion.** `field-render-audit` excludes enum, format and pattern fields
   **by construction** (`!v.enum && !v.format && !v.pattern`), so nothing asserts that a verdict, a
   boolean or an enum reaches a reader. **Two instances are already proven**: `disputeKind` shipped
   invisible on 19 entries until 2026-08-06, and 29 `no-objective` records render no verdict at all
   with no written decision saying whether that is intended. **Build this first — items 2 and 3 land
   in the same hole without it.**
2. **`commitmentState`.** Scoped batch 10, distribution earned batches 16-17: **14 records assert, 212
   do not, (a) 12 · (b) 2 · (d) 1 · (c) 0.** Named values, not bare letters — the corpus runs **three
   separate `(a)-(d)` vocabularies in the same prose fields.** Schema change = stop, so it is agreed
   before it is built.
3. **The `contested` split.** 67 records classified by what would settle each: criterion 22 ·
   interpretation 13 · evidence-withheld 11 · measure 10 · evidence-unobservable 5 · time 4 · residue
   2. **`disputeKind` does NOT transfer** — its two values are defined against the stated reason for an
   *absence*, not against two readings of a measure.
4. **`figure-consistency`'s mining gap.** It checks DECLARED claims and never mines, so an undeclared
   derived figure is outside the gate entirely — four this phase, all found by hand. Its claim format
   is also subtraction-only and cannot express a ratio. Gate contract change = stop.
5. **The seam-span triage** — 117 spans, 29 undeclared, report-only, untriaged.
6. **Arc B's capability** — one thing, not four routes: resolve `prana.cpcb.gov.in` to
   **164.100.61.207** and retry a rendering client. **No attempt has yet addressed the actual observed
   error**, which was DNS, not rendering.

**AND ONE THING THAT IS NOT A CYCLE ITEM BUT IS NOW OVERDUE:** the deferred verification plan
specified an **adversarial model pass after phase 15** — a model with no history of this project,
prompted to attack rather than confirm. Phase 15 is closed. `/method#limits` now tells every reader it
has not been run.

**Two operational facts a cold start will otherwise pay for again.** A `git push` that succeeds is not
a deployment — check `list_deployments --since`, which returns **count 0** for "never started" where
polling the site cannot tell that from a slow build. And `vercel deploy --prod` from this repo
**aborts on upload** because the working tree carries the 662-page `out/`; an empty commit re-triggers
the webhook instead.

---

# STRUCTURAL CYCLE, BATCH 1 — THE ADVERSARIAL PASS INPUT IS BUILT. 2026-08-06

**The pass is NOT run. This batch produced the file it will be run against.** `/data` is untouched —
0 lines changed under `data/` — and no schema, enum or gate contract moved.

## What was built

| artefact | what it is |
|---|---|
| `review/adversarial-pass-input.md` | **501,533 bytes, 4,170 lines.** The single document handed to a reviewer with no repo, no `CLAUDE.md`, no `STATE.md` and no second turn |
| `tools/gen-adversarial-pass-input.mjs` | the transformation, deterministic; same commit → byte-identical file |
| `tools/gen-record-history.mjs` → `review/record-history.json` | per-record edit history reconstructed from git, because two selection criteria are historical and `/data` holds only the present |
| `review/gate-scopes.txt` | every gate's summary line, captured by RUNNING it at `1825b85`. Nothing retyped |

**Four extracts, plus a brief and a stated-omissions section.** (A) structural, all 226 ledger and 127
provenance records, complete and unsampled — id, verdict, `directionOfBias`, claim, first substantive
sentence of the reasoning, tier counts, `unmeasured[]` reasonKinds, correction markers, plus the
cross-tabs (verdict × tier, verdict × term, verdict × domain, the full verdict-change table).
(B) 35 records in full prose. (C) method, sliced out of `CLAUDE.md` and the schemas **by anchor, with
the generator aborting if an anchor has moved** — one anchor had, and it aborted, which is the guard
working. (D) corrections and withdrawn wording, with the needle printed.

**Extract B's selection, and the two thresholds that are judgements:**
1. **the closing phase's hardest calls** — 10, named by hand and flagged in the file as contestable;
2. **corrected more than once** — 13, defined as **two or more edits by commits touching ≤5 records**.
   The threshold is load-bearing: **8 records reach three edits purely by being caught in three
   corpus-wide sweeps** (the bulk rescore, a note-reconciliation pass, the phase-14 lens migration) —
   three commits and no correction of that record at all. The 8 are named in the file;
3. **assessment changed after shipping, individually** — 11, i.e. all 36 minus the 25 moved by the
   single `no-objective` commit. The 25 get their full `assessmentNote` in an appendix and the
   complete 36-row change table sits in Extract A;
4. **a spread of `contested`** — 7, lowest id in each of the seven grounds. Checked at generation:
   the batch-14 classification's 67 ids are **exactly** the 67 records carrying `contested` at HEAD.

## FOUR FINDINGS, ALL FOUND WHILE BUILDING THE FILE. None is a stop

### F1 — `seam-span-report` is 125/34, not 117/29. CORRECTED IN `CLAUDE.md`

117 spans / 29 undeclared is what the tool emitted at `d69c729`, the commit that wrote it. **The tool
has not been touched since** (one commit in its whole history) — the corpus grew and nobody re-ran it.
The carried figure appears in `CLAUDE.md`'s guard-scope section and in this file's resume block, item
5, both stating it as current. **Re-run at `1825b85`: 125 record-by-break spans, 91 declaring the
break, 34 not.** `CLAUDE.md` is corrected with the withdrawn figures stated. **The class matters more
than the number: a report-only tool is in no build, so nothing fails when its rate goes stale, and a
deferral-with-a-measured-rate silently becomes the deferral-that-says-logged that the same paragraph
distinguishes it from.**

### F2 — THE LIVE PUBLIC PAGE UNDERSTATES T1 BY 213, AND ITS NEXT SENTENCE IS FALSE. NOT FIXED

`app/method/page.tsx:38` reads: *"Of 1,205 citations, 752 are graded T1"*, and the sentence after it
says the rest are *"multilateral statistics, peer-reviewed research, documentary journalism and NGO
datasets"*. **1,205 is right. 752 is not: measured over all three layers the figure is 965.**

```
ledger      640 citations   T1 523  T2 36  T3 11  T4 68  T5 2
provenance  296 citations   T1 229  T2 15  T3 14  T4 34  T5 4
series      269 citations   T1 213  T2 29  T3  3  T4 22  T5 2
all       1,205             T1 965  T2 80  T3 28  T4 124 T5 8   untiered 0
```

523 + 229 = **752 exactly.** The published count read `tier` INSIDE the object holding `url` and
missed the 269 series, every one of which carries a tier **on the record** — **the fifth recorded
instance of that exact defect**, after the "99 citations with no tier at all" correction and the
141-vs-313 bare-root filter. It was inherited from the publication batch's own tally, which reported
"untiered 269" and did not ask what 269 was the size of.

**Two consequences, and only the second is a false statement.** The T1 figure errs CONSERVATIVELY —
it makes the corpus look less primary-sourced than it is. But *"the rest"* then denotes 453 citations
of which **213 are Indian official statistical sources**, and describing those as journalism and NGO
datasets is false, on a public page, about the corpus's own sourcing.

**Not applied: this batch's sizing is the extract only, and the fix is a view file.** Drafted for the
next cycle, one sentence: *"Of 1,205 citations, 965 are graded T1 — Indian official statistical or
institutional documents retrieved directly. The remaining 240 are multilateral statistics (80),
peer-reviewed research (28), documentary journalism and NGO datasets (124) and contested composite
indices (8)…"* — recompute before applying; do not copy these numbers forward. **The extract file
prints the measured table and names the discrepancy rather than resolving it**, so the reviewer does
not spend budget rediscovering it.

### F3 — FOUR SCHEMA DESCRIPTIONS STATE DISTRIBUTIONS THE DATA CONTRADICTS. REPORTED, NOT TOUCHED

A schema edit is a stop, so nothing was changed. Measured at `1825b85`:

| schema text | what it says | measured |
|---|---|---|
| `provenance.directionOfBias` | the three directionless values *"carry 35 of the 58 records"* | **100 of 127** |
| `provenance.directionOfBias` | *"`overstates-pre-2014` has NO users at all"* — **UNATTESTED** | **1 user** (P-122) |
| `ledger.confidence` | *"63 high, 24 medium, 2 low across 89 records"* | **172 · 53 · 1 across 226** |
| `ledger.assessment` / `no-objective` | *"Roughly half the ledger is in this state"* | **73 of 226 = 32.3%** |
| `ledger.assessment` / `awaiting-adjudication` | *"a sweep of all 149 ledger records"* | 149 was right then; the corpus is 226 |

**`overstates-pre-2014` is the one to act on**, because it is not a stale count but a wrong kind of
claim: a schema asserting a value is unattested while a record uses it. The others are dated
observations that read as present-tense facts. **The pattern is F1's and the session-cost
paragraph's** — a measurement written into a file that is never re-measured. The extract file handles
all of them by printing the schema text and the measured distribution side by side and telling the
reviewer they do not always agree.

### F4 — THE SESSION-COST SECTION IS FIVE TIMES OVER ITS OWN BUDGET. CORRECTED IN `CLAUDE.md`

*"this file (22 KB) and the phase's `STATE.md` (16 KB) — about 38 KB"*. Measured: **54 KB and 143 KB,
about 197 KB.** The log is 684 KB against 438; `/data` is 2.7 MB across 682 records against 2.3 MB
across 645; the manifest 70 KB against 66. **The section whose subject is keeping orientation small
was reporting a budget it had exceeded fivefold, in the present tense.** Corrected with the withdrawn
figures stated. **The number to act on is `STATE.md` at 143 KB** — one phase's working notes, read
whole at every cold start. That is a structure problem, not a growth curve, and it is now a cycle
item.

## What was deliberately left out of the extract, and why

- **Series (269) and pairs (60).** Two of four layers. **A reviewer can test whether a verdict follows
  from its own prose and cannot test whether the underlying figures say what the prose says** — named
  in the file as the single largest thing it cannot check.
- **Full `assessmentNote` for the 128 ledger records outside Extract B and its appendix**; Extract A
  carries the first substantive sentence, with a leading dated correction clause skipped so the thesis
  shows. The skip is stated and the `corrected` marker still names the field.
- **Full prose for the 198 ledger and 120 provenance records outside Extract B.**
- **The rendered site, the 684 KB verification log, and everything never researched.**
- **The asymmetry is stated in the file:** A is complete, B is selected for trouble, so a pattern in A
  is a pattern in the corpus and a density in B is a density in the selection.

## Standing on the corrections question

Corrections and withdrawn wording are **in** the file, and the file says so twice — in the brief and
in Extract D — with the needle printed and the caution that a needle bounds what it finds and never
what there is. 60 ledger and provenance records and 6 series carry one. **The brief tells the reviewer
that reporting a corrected error as live is a finding about visibility, not noise.**

---

# RESUME HERE — updated 2026-08-06, after the structural cycle's first batch

**The adversarial pass input is BUILT and the pass is NOT RUN.** `review/adversarial-pass-input.md`
at 501,533 bytes. Running it is the next act and needs no repo work: hand the file to a model with no
history of this project and ask for findings tied to record ids plus a statement of what it could not
check.

**The six structural-cycle items are unchanged and none was started**, except that item 5's figure is
now **125 spans / 34 undeclared**, not 117/29 (F1).

**Two new items, both from F2 and F4:**
7. **`app/method/page.tsx:38` states 752 T1 where the measured figure is 965, and the sentence after
   it is false about 213 citations.** Live and public. Drafted fix in F2; recompute before applying.
8. **`STATE.md` is 143 KB and is read whole at every cold start.** The session-cost rule budgets 38 KB
   for orientation and the real figure is 197 KB.

**And one that is reported and not actionable without a stop:** four schema descriptions state
distributions the data contradicts (F3), one of them asserting a value is unattested while P-122 uses
it. A schema edit is a stop, so it is agreed before it is made.

---

# STRUCTURAL CYCLE, BATCH 2 — 2026-08-06. The live sourcing claim is fixed; the pass input is split in three

`/data` untouched again — `git diff --numstat -- data` returns nothing. No schema, enum or gate
contract moved.

## 1. `/method` FIXED, and the fix is that the page no longer holds a number

The paragraph said **752 of 1,205 citations are T1** and described the rest as *"multilateral
statistics, peer-reviewed research, documentary journalism and NGO datasets"*. **The T1 figure is 965
and the description was false about 213 Indian official statistical sources.**

**Both figures are now derived at build time.** `lib/data.ts` gains `citations()` and `tierCounts()`,
and the page counts through them. The composition is stated for real: **965 T1 · 80 T2 · 28 T3 ·
124 T4 · 8 T5 = 1,205**, each named for what it is rather than lumped as "the rest". The tier table
below it, which had a single `Series` column showing 213 against a prose figure of 752 with no way to
reconcile them, now breaks out **ledger / provenance / series / all** and totals to the same 1,205.

**And the page says what it got wrong**, in the same paragraph, in the corpus's own withdrawn-wording
form: that it read 752 until 6 August 2026, that the error was 213, and that the cause was reading the
tier in one of the two places it lives. **This is the second time in two batches that a claim about
the corpus's own sourcing was wrong on a public page** — the footer said "built entirely from public
government primaries" and was corrected downward; this said 752 and was wrong upward. **Opposite
directions, one cause: a figure typed into a page instead of counted from the data.** No hand-typed
corpus figure remains on `/method`.

## 2. THE TIER ASYMMETRY — what one accessor takes, and what else is split the same way

### What `citations()` takes, and why it is an accessor rather than a type

The asymmetry is real and is in the types: `TieredSource` is `{name, url, tier}` and lives in
`sources[]` on ledger and provenance; a series carries `source: SourceRef` = `{name, url, vintage}`
with **`tier` on the record**. `citations()` flattens all three layers to
`{layer, recordId, recordTitle, href, name, url, tier, vintage?}` and is the only place allowed to
know which site a tier came from. If `tier` ever moves, one function changes and every caller keeps
working.

**Why a type could not have caught this.** Both sites are a legal `Tier`. `s.source.tier` on a series
is not a type error — the field is simply absent, so it reads `undefined` and tallies as untiered.
**TypeScript objects when two same-named fields have different types; it cannot object when they have
the same type at different depths.** The defect was a set-construction error, not a type error, which
is why the fix is an accessor and a comment stating the cost, not a signature.

**`vintage` is the mirror asymmetry and it is a real gap, not a cosmetic one.** Only a series
`SourceRef` can carry a vintage; `TieredSource` has no such field, so **no ledger or provenance
citation can record the vintage of the document it cites** — and the peer-panel vintage discipline
(P-09) is a standing rule of this instrument. `citations()` preserves the field rather than
flattening it away, so the gap is visible in the returned shape instead of being invisible.

### Every other field split the same way, enumerated from the schemas

| axis | where it lives | held by the type system? |
|---|---|---|
| **`tier`** | `ledger:sources[].tier` · `provenance:sources[].tier` · **`series:tier`** | **NO** — same type, different depth. This is the one that fired |
| `name` / `url` | `sources[].name`/`url` · `series:source.name`/`url` | n/a — both sit inside a source-shaped object, so a reader that has the object is right either way |
| `vintage` | **`series:source.vintage` only** | n/a — the field does not exist on the other two layers at all |
| **`status`** | `series:points[].status` (`verified`/`approx`/`pending`, per OBSERVATION) · `pairs:status` (`live`/`declared-pending`, per RECORD) | **YES** — two different enums on two different interfaces, so a wrong read is a type error. `statusCounts()` is typed `Series[]` and a pair cannot reach it |
| domain axis | `ledger:domains[]` · `series:domain` · `pairs:domain` · **`provenance:affectsDomains[]`** | partly — three shapes and a fourth NAME, with three separate readers in `lib/data.ts` |
| `notes` | series · provenance · pairs — **absent on ledger** | n/a — a `notes` accessor would silently return nothing for a whole layer |
| `caveat` | ledger · series — absent on provenance and pairs | n/a |
| `lenses` | ledger · series · pairs — absent on provenance | n/a |
| time axis | `ledger:date`/`dateEnd` · `provenance:when` (free string) · `series:calendar` + `points[].period` | n/a — four names, no shared reader exists or could |

**Only `tier` had the shape that produces a silent miscount**, and the reason is stated above: same
type, different depth, both reads legal. **`status` is the near-miss** and it is instructive — it is
split *worse* than `tier` (two enums, two depths, two layers, one name) and has never produced a
defect, because the two values have different types and TypeScript refuses the confusion.

**The domain axis is the one to watch next.** `seriesInDomain` uses `.domain ===`,
`ledgerInDomain` uses `.domains.includes`, and `provenanceInDomain` uses
`.affectsDomains.includes(domain) || .includes('all')` — **and that third one carries an extra
semantic the other two do not.** Any future unification that forgets the `'all'` branch silently
drops every provenance record filed against every domain, or adds them everywhere. It would not be a
type error either.

**The project has already solved this shape once and did not generalise it.** `ledgerUnderLens()`
reads a lens from BOTH `lenses[]` and the legacy `domains[]`, with a comment giving the count that
would otherwise be lost (19 records carrying `kashmir`, 13 carrying `federalism`). That is exactly
what `citations()` now does for tier. **Two instances of one pattern — an axis with two storage sites
and a reader that must know about both — is enough to name it: where an axis is stored in more than
one place, the union goes in `lib/data.ts` with the cost of getting it wrong written beside it, and
nothing counts that axis by hand anywhere else.**

**REPORT ONLY. No schema change is proposed here** — moving `tier` into the series `source` object, or
adding `vintage` to `TieredSource`, are both schema changes and therefore stops.

## 3. THE 13,163 BYTES, ACCOUNTED IN FULL — five causes, and the table was the defect

The previous batch reported a section table summing to **488,370** against a stated file size of
**501,533**. Recomputed at the same commit:

| cause | bytes |
|---|---:|
| **A whole row omitted** — Extract B's header and selection criteria, a real section, absent from the table | **+5,002** |
| **A stale row** — Extract A.1 measured on a build two regenerations old (124,258 against 125,988) | **+1,730** |
| **Characters counted, bytes reported** — the table summed string indices, the file size was `Buffer.byteLength`; UTF-8 punctuation (— · × “ ”) is the difference | **+7,105** |
| **A row rounded by hand** — the brief, 11,334 typed as "12,000" | **−666** |
| **A row rounded by hand** — Extract C, 29,880 typed as "29,900" | **−20** |
| **A stale row** — omissions, 1,881 against 1,893 | **+12** |
| **total** | **13,163** |

488,370 + 5,002 + 1,730 − 666 − 20 + 12 = **494,428 characters**, and 494,428 + 7,105 = **501,533
bytes**. Exact, both steps.

**Three of the five causes are the class this instrument keeps catching.** Two rows were hand-typed
figures presented inside a measured table — a fabricated scope, and the smaller of the two (20 bytes)
is the more damning, because rounding by twenty serves no purpose except that the number was being
typed rather than read. Two rows were measured against a build that no longer existed. **And the
unit mismatch is the same shape as pairing a stock with a flow**: two numbers presented as
comparable, computed over different things, with nothing in the presentation to show it.

**FIXED MECHANICALLY, not by resolving to be careful.** The generator now emits
`review/pass-sizes.txt` itself — every section and every file, **in bytes, with the units stated in
the header** — and a table the tool prints cannot omit a row that exists, cannot go stale against its
own output, and cannot round.

## 4. PROPOSED, NOT DONE — the `STATE.md` archive split

**The problem, measured:** `STATE.md` was **157 KB** when this entry was drafted and is **172 KB** with the
entry in it — it grew 15 KB while being written about, which is the argument in miniature. It is read
a session-cost rule budgeting 38 KB for all orientation. It is the largest single item a cold read
pays for and roughly 85 per cent of it is closed phase-15 material that no future cycle will act on.
**The lean-prompt form depends on this file being readable**, so its growth is not a tidiness question.

**The proposal.**

```
drops/phase-environment-energy/
  STATE.md            LIVE — open items, standing hazards, retrieval pins, resume block
  state/
    phase-15-batches-1-10.md
    phase-15-close-audit.md
    phase-15-publication.md
    structural-cycle.md          (batches 1-2, appended as they close)
```

**The live file keeps four things and nothing else:**
1. **RESUME HERE** — what the next session starts on, always last in the file.
2. **OPEN ITEMS** — one entry each, with the evidence inline, never a pointer to an archive.
3. **STANDING HAZARDS AND PINS** — the retrieval pins, the resolver facts, the traps that cost a
   cycle if rediscovered. These are consulted, not read; they stay.
4. **THE ARCHIVE INDEX** — one line per archived file saying what it holds and what it settled.

**THE RULE THAT KEEPS A COLD READ COMPLETE, and it is the whole of the proposal:**

> **Nothing moves to the archive until it is CLOSED, and closed means: no open item depends on it,
> and no rule it earned lives only there.** A rule earned in archived material is already in
> `CLAUDE.md` — that is what the same-commit rule exists for — so archiving prose can never orphan a
> rule. An open item that cites archived evidence **carries that evidence inline in the live file**;
> the archive is where the reasoning went, never where the current state is.

**Why that rule and not "archive by date".** A cold read must be complete from the live file alone,
or the split has traded 172 KB of reading for an unbounded number of lookups, which is worse — it
looks cheap and is not, and the failure is silent because a session that never opens the archive
cannot tell it needed to. **Test before splitting: read the proposed live file cold and try to answer
every open item from it.** Anything that sends you to the archive belongs in the live file.

**Expected size:** the live file lands around **20-25 KB** — the resume block, eight open items, the
pins section, and the index. Orientation drops from about 212 KB to about 80 KB, which is still about twice
the stated budget but is within the same order as the rule that governs it.

**One risk, named:** this file is append-only by habit rather than by rule, and moving prose out of it
is the first non-append operation ever performed on it. It should be done as a **pure move** — bytes
transplanted, nothing rewritten — with `git diff --numstat` proving deletions from `STATE.md` equal
insertions across `state/`, and the archive index written in the same commit. **Not done. Proposed.**

## 5. THE PASS INPUT IS SPLIT IN THREE, and the combined file is still generated

One generator, one section registry, **no second copy of any shared block** — the brief, the known
limits, the gate scopes and Extract C are built once and emitted into every file.

| file | carries | bytes | for |
|---|---|---:|---|
| `pass-a-structural.md` | A + C | **240,802** | patterns across the complete population |
| `pass-b-deep.md` | B + C + D | **305,294** | verdicts against their own evidence; claims against their sources |
| `pass-c-method.md` | C + E + D | **297,193** | rule-following; absences asserted without a search |
| `adversarial-pass-input.md` | A + B + C + D + E | **752,715** | the combined document |

**EXTRACT E IS NEW and it is what makes pass C runnable.** A rulebook with no material is an
invitation to form an impression. E is the corpus text each rule actually binds: **E.0** names the four
rules a data-only reviewer *cannot* test, so budget is not spent on them; **E.1** gives all 68
strongest absence claims in full (`withheld`, `never-defined`, and every disputed stated reason);
**E.2** lists the remaining absence population by id and states plainly that the stated-search rule
cannot be tested against them from that file; **E.3** gives 291 candidate sentences making a claim
about what EXISTS, with the needle printed and labelled a candidate list; **E.4** gives the commitment
states, which are prose-only and therefore the least-guarded vocabulary in the instrument; **E.5**
prints all 75 correction-carrying fields in full, because the withdrawn-wording convention can only be
judged on the sentence; **E.6** gives the filing rule's surface.

**The combined file grew from 501,533 to 752,715 bytes and the growth is Extract E**, which did not
exist before. **It is not free: E.5 reprints field text that Extract B also carries** for records in
both, so the combined file is genuinely redundant in a way the three passes are not — which is an
argument for running the passes and not the combined document.

**Each pass carries per-file self-description checks that assert by CONTENT, not by the composition
list** — the list is where a mistake would be made. A file declaring Extract A complete is checked
against all 353 record ids; every file is checked for the gate block, the limits, the method and the
"tie every finding to a record id" instruction. A missing shared block aborts the generator.

**Why three.** A reviewer given 500 KB anchors on what it read first and produces one set of priors
applied to everything. Three reviews with no shared context cannot contaminate each other, and where
two independently reach the same finding, the agreement is evidence in a way one reviewer's
confidence is not.

---

# RESUME HERE — updated 2026-08-06, after structural-cycle batch 2

**The adversarial pass input is built, split in three, and STILL NOT RUN.** Run
`review/pass-a-structural.md`, `review/pass-b-deep.md` and `review/pass-c-method.md` as three separate
reviews against models with no history of this project. Do not run the combined file unless one review
is all that is affordable.

**Closed since batch 1:** item 7 — `/method`'s 752-vs-965 sourcing claim, fixed and derived at build
time. Item 8's measurement stands and now has a proposal (section 4 above), not a fix.

**Open, unchanged:** the non-prose render assertion · `commitmentState` · the `contested` split ·
`figure-consistency`'s mining gap · the seam-span triage, **125 spans / 34 undeclared** · Arc B's one
capability. **Plus:** the `STATE.md` archive split, proposed and awaiting a decision; and the four
stale schema descriptions, reported and not touched because a schema edit is a stop.

**One rule this batch earned, already in the report above:** where an axis is stored in more than one
place, the union goes in `lib/data.ts` with the cost of getting it wrong written beside it, and
nothing counts that axis by hand anywhere else. Two instances now — `ledgerUnderLens()` and
`citations()`.

---

# STRUCTURAL CYCLE, BATCH 3 — 2026-08-06. Vintage scoped, growth accounted, pass C resized, pass A NOT RUN

`/data` untouched — `git diff --numstat -- data` returns nothing. No schema, enum or gate contract
moved.

## 1. `vintage` ON LEDGER AND PROVENANCE SOURCES — REPORTED, NOTHING CHANGED

### The premise needs correcting first, and the correction is the finding

The brief says no ledger or provenance source can record **when its content dates from**. True. But the
field that exists on the series layer does **not** record that either. Read from the schema:

> `vintage` — *"Download/access date, to whatever precision the source states. Required for WDI and
> any source that revises history."*

**That is an ACCESS date, not a content date**, and the data confirms it is used as one: of 269 series,
**201 carry a vintage**, and the values cluster on the dates the research sessions ran —
`2026-08`×104 · `2026-07-31`×39 · `2026-08-03`×15 · `2026-08-01`×12 · `2026-07-30`×8 · `2026-08-05`×7.
Only 14 values sit outside the project's own working window. **This is correct usage, not drift** —
I checked the schema before calling it drift, which is the one thing this file keeps having to relearn.

So there are **two different fields** in play and the report has to keep them apart:

| | what it records | where it exists | what it is for |
|---|---|---|---|
| **access date** (`vintage` as defined) | when THIS run downloaded it | series only, 201/269 | identifying WHICH revision was read — P-09's WDI back-propagation case |
| **content edition** (does not exist anywhere) | which edition/reference period the document IS | **no layer** | separating a claim's date from its source's date |

**Extending `vintage` to ledger and provenance would give those layers the access date and would not
give them the content edition.** Adopting the existing name for the stronger meaning would be the
two-axes-in-one-field defect this instrument has now hit five times.

### (a) What carrying it would take — five places, and one is a prerequisite

1. **Two schema files, byte-identically.** `TieredSource` is duplicated in `ledger.schema.json` and
   `provenance.schema.json`, both `additionalProperties: false` — so a `vintage` today is **rejected**,
   not silently ignored. The `tier` description is already byte-identical across the two and the new
   property would have to be. **This is the schema change and therefore the stop.**
2. **`lib/types.ts`** — `TieredSource` gains `vintage?: string`.
3. **A VIEW, and it is not the one that already works.** `SourceLine` renders `source.vintage`
   today — but it takes a `SourceRef` and serves series and peers only. Ledger and provenance render
   through **`SourceList`**, which prints name, url and tier and **nothing else**. A vintage added to
   the schema and the type would render nowhere until `SourceList` changes.
4. **`reachability`'s guarded-marks list, or an exemption line by name in the schema description.**
   No third state.
5. **THE PREREQUISITE, and this is the load-bearing part of the answer.** `vintage` carries a
   `pattern`. **Both render gates filter on `!v.enum && !v.format && !v.pattern`** — so
   `field-render-audit` would not observe it and `no-unguarded-prose-field` would not require it to be
   guarded or exempted. **It would be unguarded BY CONSTRUCTION from the day it landed**, which is the
   `disputeKind` shape exactly: schema-required, correct in the data, and invisible on all 19 entries
   until it was found by hand. **The non-prose render assertion — open structural-cycle item 1 — is a
   prerequisite for this field, not an improvement to schedule after it.**

### (b) How many citations would need one

**936 ledger and provenance citations across 353 records** (ledger 640, provenance 296) — the whole
population, since none can carry the field today.

Under the schema's **own** trigger — *"WDI and any source that revises history"* — the mechanically
identifiable set is **146 citations on hosts that revise** (World Bank, Comtrade, MoSPI, CEA, RBI,
Budget, NCRB, Census, EPFO, AISHE, UDISE, IMF, OECD, ILO, UNESCO). **That count is a candidate list,
not a finding:** the host is a proxy for the behaviour, and a ministry press release on a revising
publisher's host does not itself revise.

### (c) How many could be filled from documents already on disk — ZERO, and the reason matters

**No retrieved source document is on disk.** `data/incoming/` holds a README and nothing else; the only
committed non-code artefacts are test fixtures, build output and one coverage-audit text file. **Every
retrieval in this project is transient** — fetched, read, quoted, discarded. There is no cache to fill
from, so **any backfill of the access date is a re-retrieval of 936 documents, and re-retrieving
tomorrow records tomorrow's access date, which is not the access date the claim rests on.** For the
field as defined, **the information is not recoverable at all** — it was never written down and cannot
be reconstructed.

What *can* be filled from what is already on disk is the **content edition**, out of the record's own
text:

| source of the edition | citations | caveat |
|---|---:|---|
| `name` carries a year beside a periodical word (*Report, Review, Survey, Annual, Bulletin, Census, Round, Findings…*) | **178** | edition-shaped; the strongest candidates |
| `name` carries a bare year | **584** | **ambiguous — may be the year of the THING, not the edition.** *"Farm Laws Repeal Act 2021 and parliamentary record"* dates the statute and says nothing about which parliamentary record was read |
| `name` carries no year at all | **174** | e.g. *"NCRB Accidental Deaths and Suicides in India"* — a title with an annual edition and no edition named |
| `url` carries a date token | 233 | overlaps the above |
| **neither name nor url carries any date** | **150** | nothing to fill from |

**The 584 are the argument for the field, not against it.** A year inside a free-text name cannot be
told apart from the year of the subject, which is exactly what a typed field fixes — and the
stock-versus-flow error that cost four correction cycles was of this shape: two dates conflated
because neither had a place of its own.

**REPORT ONLY. Nothing was changed.** If it is built: the render assertion first, the content edition
as a NEW field rather than a reuse of `vintage`, and the 178 edition-shaped names as the pilot, since
they can be filled without re-retrieval and their fill is checkable against the name that carries it.

## 2. THE COMBINED FILE'S 251,251 BYTES, ACCOUNTED — same form as the 13,163

Measured section by section against `aa80fad`, in **bytes**, both files sectioned by the same anchors:

| section | `aa80fad` | `9a62fec` | delta |
|---|---:|---:|---:|
| opening + brief | 4,327 | 4,980 | **+653** |
| limits | 4,705 | 4,705 | 0 |
| gates | 2,373 | 2,342 | **−31** |
| Extract A | 196,776 | 196,776 | 0 |
| Extract B | 257,043 | 257,043 | 0 |
| Extract C | 30,073 | 30,073 | 0 |
| Extract D | 4,337 | 4,337 | 0 |
| **Extract E** | **0** | **248,976** | **+248,976** |
| omissions | 1,899 | 2,361 | **+462** |
| cut note | 0 | 1,191 | **+1,191** |
| **total** | **501,533** | **752,784** | **+251,251** |

Sum of deltas equals the file delta exactly. **Extract E is 99.1 per cent of the growth** and did not
exist before; the remaining 2,275 bytes are the pass-split machinery — a per-file contents block, the
omissions paragraph about which extracts a given cut omits, and the table explaining the three-way cut.
The gates block **shrank by 31 bytes**, which is a re-capture at a later commit and not a content
change.

**A, B, C and D are byte-identical across the refactor.** That is the check worth having: the section
registry moved every block into a new composition path and changed none of them.

## 3. EXTRACT D IS NOW CARRIED BY PASS B ONLY. Extract E stands with C alone

**What pass B loses: nothing.** It keeps D.

**What pass C loses: 4,337 bytes and no capability**, provided one thing moved with it — and it had to.
D carried three things pass C needed: **the needle**, the exclusion reasoning (*ordinary uses of
"withdrawn" and "superseded" describe the world and are excluded by construction*), and the instruction
that **reporting a corrected error as live is a finding about visibility, not noise**. E.5 printed all
75 correction-carrying fields in full but carried none of those three, and opened *"Extract D indexes
these"* — a dangling reference the moment D left. **E.5 now carries all three and names its own
population** (60 ledger and provenance records, 6 series). Checked after regeneration: `EXTRACT D`
appears 0 times in pass C and no reference to it survives.

**Does Extract E stand with C alone? Yes.** E was written against C — every subsection tests a rule
stated there — and E.5 is strictly stronger than D for this pass's purpose: D indexed which fields
carry a correction, E.5 prints them. D's one unique column was the verdict or bias beside each
corrected record, and **pass C carries no verdict material at all**, so that column had nothing to
anchor to there.

### The resize is real and it is small, and pretending otherwise would be the defect

| file | before | after |
|---|---:|---:|
| `pass-a-structural.md` | 240,871 | 240,871 |
| `pass-b-deep.md` | 305,363 | 305,363 |
| `pass-c-method.md` | 297,262 | **293,898** |
| combined | 752,784 | 753,885 |

**1.1 per cent off pass C.** The brief's premise is that 501 KB gets skimmed; 294 KB is not obviously
safe from the same fate, and **removing Extract D does not address that** — it removes an index, and
the weight is elsewhere. Stated so the number is not read as a solution:

- **pass C's weight is E.5 at 97 KB** (75 correction fields in full) and **E.3 at 72 KB** (291
  existence-claim candidate sentences). Together 58 per cent of the file. Both are the pass's actual
  subject; cutting either removes the material the review exists to read, not padding.
- **pass B's weight is Extract B at 257 KB** — 35 records in full prose. The only lever is fewer
  records, which is a change to the selection criteria and a different decision from a resize.

**No further cut is made, because the evidence does not settle one.** The choice between a shorter
review and a complete one is the operator's, and the honest statement is that the three-way split
bought focus and separation of priors, not brevity.

## 4. PASS A — NOT RUN. NO NON-CLAUDE MODEL IS USABLE FROM THIS ENVIRONMENT

**Stopped and reporting, as instructed. No Claude run was substituted.**

**The precise claim, and the precision is the point.** It is not that no non-Claude model is
*reachable* — the network reaches them. It is that **no credential for one exists in this
environment**, so none is usable. Four channels varied, per the rule that a claim about a class is
tested by varying the channel and not by accumulating failures within one:

| channel | result |
|---|---|
| environment variables | `ANTHROPIC_BASE_URL` only, and it resolves to `api.anthropic.com` — Claude, not a multi-model gateway. No OpenAI/Google/Mistral/DeepSeek/Groq/OpenRouter key |
| shell rc and dotfiles | `.zshrc`, `.zshenv`, `.zprofile`, `.bashrc`, `.profile`, `~/.env` — no non-Claude provider mentioned |
| CLIs | `llm`, `openai`, `gemini`, `ollama`, `aichat`, `mods`, `sgpt`, `chatgpt`, `gcloud` — **none installed** |
| local inference servers | nothing on 11434 (Ollama), 1234 (LM Studio), 8080, 8000, 4000, 3000. **Port 5000 answers and is macOS AirTunes** — identified rather than assumed, because an open port is not an inference endpoint |
| MCP connectors | registry search for `openai · gpt · gemini · llm · inference · model` returns **empty** |

**Positive control, through the same restriction the negative depends on:** `api.openai.com/v1/models`
returns **401** and `generativelanguage.googleapis.com/v1beta/models` returns **403**. Both hosts
resolve and answer. **The network is not the blocker and this is not a resolver artefact** — which
this machine has produced before, and which is why the control is here.

**One channel considered and declined.** A logged-in chat UI could be driven through the browser. It
was not, for three reasons: it would use the operator's account for a substantial action nobody
authorised; a 241 KB document cannot be pasted into a chat surface reliably or verifiably; and the
result would not be a controlled run whose exact input could be reproduced. **A pass whose input
cannot be reproduced cannot be re-run against a changed corpus, which is the whole reason the extract
is deterministic.**

**What the operator needs to run it externally:** `review/pass-a-structural.md`, 240,871 bytes,
generated from the corpus at `059912b`. Capture the reply verbatim to
`review/pass-a-<model>-<date>.md`. **Do not paste it into a Claude model** — the plan specifies an
independent pass, and running it on the family that authored the corpus shares the blind spots the
pass exists to find.

---

# RESUME HERE — updated 2026-08-06, after structural-cycle batch 3

**PASS A IS BUILT AND BLOCKED ON AN EXTERNAL RUN.** `review/pass-a-structural.md` (240,871 bytes) is
ready to hand to a non-Claude frontier model. **No such model is usable from this environment** —
credentials, not reachability; evidence in section 4 above. **The next batch cannot start with the
triage it was going to start with**, because there is nothing to triage until the pass is run.

**Runnable now, in this environment, if the pass stays blocked:** the six structural-cycle items are
untouched and none needs an external model. **Item 1, the non-prose render assertion, has just
acquired a second dependant** — `vintage` cannot safely land until it exists, alongside
`commitmentState` and the `contested` split. That makes it the item with three things waiting on it
and the obvious next build.

**Closed this batch:** the 251,251-byte growth is accounted to Extract E (99.1 per cent) with A, B, C
and D byte-identical across the refactor. Extract D is now carried by pass B only; E.5 absorbed the
needle, the exclusion reasoning and the visibility instruction, and pass C carries no reference to D.

**Open, unchanged:** the non-prose render assertion · `commitmentState` · the `contested` split ·
`figure-consistency`'s mining gap · the seam-span triage, 125 spans / 34 undeclared · Arc B's one
capability · the `STATE.md` archive split (proposed) · four stale schema descriptions and the
tier/vintage asymmetry (schema edits are stops).

---

# STRUCTURAL CYCLE, BATCH 4 — 2026-08-06. THE NON-PROSE RENDER ASSERTION IS BUILT

Operator-sanctioned gate contract change, this batch only. `/data` untouched —
`git diff --numstat -- data` returns nothing. **No schema or enum contract moved:** two schema
DESCRIPTIONS gained an exemption line, which is the mechanism the prose half has used since it was
built, and no property, type, enum value or validation rule changed.

## 1. THE GUARD — what it binds, and what it found

### The hole it closes

Both render gates selected fields with `!enum && !format && !pattern`. **Every verdict, tier, stated
reason, boolean and formatted number in the corpus was therefore outside every render assertion by
construction** — not by oversight, and not visibly. `disputeKind` was the worked instance:
schema-REQUIRED whenever `reasonDisputed` is true, correct in the data on all 19 entries, read by no
view for the whole of its life, found by hand.

### What was built

| file | what it does |
|---|---|
| `tools/lib/schema-fields.mjs` | ONE leaf enumeration, shared by both gates. **Prose is defined positively and non-prose is the complement**, so a JSON Schema construct nobody anticipated lands IN scope rather than falling out of it |
| `tools/lib/value-renderings.mjs` | how each non-prose value LOOKS once rendered — `identity`, `labels`, `phrase`, `number`. **Labels are parsed out of the modules that render them and never retyped**; a map that has moved aborts the gate |
| `tools/field-render-audit.mjs` | extended to observe non-prose in built output |
| `tools/no-unguarded-prose-field.mjs` | extended to bind non-prose at authoring time, with a `--renderings-json` seam |
| `tools/regen-render-fixtures.mjs` | regenerates both controls from the live lists, with `GENERATED-FROM.json` |

### PROVEN TO FIRE ON THE REAL CORPUS, BEFORE ANY FIX — the exact counts

```
  ledger
    lenses          non-prose  carried   43  rendered   11  missing   32  ** INVISIBLE **
    differentFacts  non-prose  carried   82  rendered   72  missing   10  ** INVISIBLE **
  series
    lenses          non-prose  carried   54  rendered   21  missing   33  ** INVISIBLE **

field-render-audit FAILED — 2 non-prose field(s) neither declared nor exempted:
  series.higherIsBetter
  series.xAxis
```

**75 invisible record-fields across three fields, and 2 fields nobody had decided about at all.**

### The three findings, and none is the one that was expected

**(a) `lenses` reached no reader on the record that declares it — 65 records.** It rendered on
`/lenses`, on each lens page and on the domain pages, and nowhere on the ledger or series record
carrying it. **CLAUDE.md already forbids exactly this**: *"a mark rendered somewhere other than the
page of the record declaring it does not count"* — the rule existed, no gate could see it, and a
reader on L-0189 could not tell the record is also read under Russia and the United States.
**FIXED**: both record pages now render the lens axis, styled apart from a domain tag because the two
are different claims and rendering them alike invites reading one as the other.

**(b) `differentFacts: false` with no note rendered NOTHING — 10 records.** The negative mark was
gated on the presence of a note, so a record that had been tested and recorded false was
indistinguishable, to a reader, from one where the question was never asked. **The schema's own line
calls the false judgement "the judgement most at risk of being made silently", and gating its mark on
prose was making it silently.** FIXED: the mark now renders on the flag.

**(c) TWO FIELDS ARE DECLARED, TYPED, POPULATED AND READ BY NOTHING.** `higherIsBetter` — 70 series
declare a direction of merit and `lib/types.ts` is the only file in the repository that mentions it,
so the directional colour its own description requires **has never existed**. `xAxis` — two series
declare `lok-sabha-term` and both render as an ordinary yearly series, **which is what that field's
own description forbids**, so this is a live rendering defect on those records rather than merely an
unrendered field. **EXEMPTED BY NAME, and the exemption text says it is a DEBT and not a decision.**
An exemption claiming a decision where there was none is worse than the gap.

**(d) Found by the enumeration rather than by the audit: `competingAccounts` was outside BOTH gates.**
Its items are a `oneOf` of `{holder, position}` or a bare string, and the old walk followed only
`items.properties` — so the most literally delegatable field in the corpus, on 81 records, was
unguarded with nobody having decided it should be. **Added to the guarded-marks list**, which is why
`reachability` moves 1368 → **1580 marks**.

### Controls, both directions, through the same seam

- **NEGATIVE**: `--renderings-json` with `ledger.assessment` dropped → gate exits 1 and **names
  `ledger.assessment`**. Asserting the exit code alone would have tested the wrong branch, which two
  lens fixtures did for two cycles.
- **POSITIVE**: the full table injected **through the same seam** → exits 0. A positive run through a
  different path would leave open that the negative fired for an unrelated reason.
- **LIVE**: no seam at all, against the live schemas → exits 0.
- **The dropped key is the VERDICT**, chosen deliberately: a gate that stays quiet about the one value
  a reader cannot do without is broken in the way that matters.

### The selftest assertion proven live by sabotaging its fixture

`provenance.bridgeExists` was removed from the POSITIVE fixture (42 → 41 keys). **Both new assertions
went red**: the positive control fired through the seam, and the freshness check named the drift —
*"stamp says 8 marks / 42 renderings, fixtures hold 8 / 41, live lists hold 8 / 42"*. **Re-run with no
fix applied, it failed identically** — both runs required, because a fast self-repair heals before the
check and a lazy one passes run one. Restored byte-identically (`git diff` clean on that file) and the
selftest returned green.

### Gate lines, before and after

| gate | before | after |
|---|---|---|
| `field-render-audit` | 32 prose fields, 0 invisible | **36 prose + 42 non-prose, 0 invisible, 2 exempted** |
| `no-unguarded-prose-field` | 19 prose (7 guarded, 12 exempted) | **20 prose (8 guarded, 12 exempted) · 44 non-prose (42 declared, 2 exempted)** |
| `reachability` | 1368/1368 marks | **1580/1580 marks** |

Prose rose 32 → 36 and 19 → 20 for the same reason: the shared enumeration sees `competingAccounts`
and `denominator`, which the old walks did not. **`denominator` is `["string","null"]`, and a strict
`type === "string"` test threw a plain sentence out of the prose audit and into the non-prose one**,
where it demanded a rendering declaration it should never have needed.

## 2. A SOURCE CACHE — REPORTED ONLY

**The exposure, stated precisely.** 1,205 citations, **zero cached sources**, every retrieval
transient. The corpus cannot be re-verified against its own evidence without re-retrieving, and this
phase alone logged four estates that changed behaviour mid-project: the e-Gazette moved from
unreachable to live, `mea.gov.in` serves a JS shell whose Internet Archive snapshot is the same shell,
`prana.cpcb.gov.in` is client-rendered, and a set of hosts share a TLS-reset fingerprint from this
machine. **A quotation whose source has since changed cannot be distinguished from a misquotation**,
and the corpus is now public.

### Storage shape

**Content-addressed, not URL-addressed.** `cache/<sha256[0:2]>/<sha256>.txt` plus a manifest keyed by
citation. A URL-keyed store cannot represent the thing the corpus actually needs — that the SAME URL
returned different bytes on two dates — and that is the whole failure mode.

### What it holds, and the answer is not "bytes"

| candidate | verdict |
|---|---|
| **raw bytes** | **No.** The MoD Year End Review alone is 654,000 characters and the corpus holds 1,205 citations; a repository that is currently 2.7 MB of data would gain hundreds of megabytes of third-party PDFs, and **the deployment is public, so re-hosting government PDFs is a distribution decision and not a storage one** |
| **extracted text** | **Yes, bounded.** The instrument already retrieves bounded extracts by rule — *"fetch what answers the question"* — so the natural unit is the passage actually read, not the document. Roughly 4-40 KB per citation |
| **hash** | **Yes, and it is the load-bearing part.** A sha256 of the full retrieved body answers *"is this the document I read?"* at negligible cost, and it is the only part that gives a re-retrieval a verdict rather than a diff to eyeball |

**So: hash always, extract usually, bytes never.** The hash is the assertion; the extract is what
survives a host going dark; the bytes are somebody else's copyright and a hosting decision.

### How a gate would use it

A `source-drift` gate, **report-only at first for the reason `seam-span-report` is** — the first run
produces a candidate list, not a defect count. Re-retrieve on a rotation, hash, compare:
**unchanged** → silent; **changed** → name the citation and the records resting on it, because a
changed source under a quoted figure is a research finding; **unreachable** → the estate moved, which
is the fact `url-check` already tracks; **never cached** → the backlog.

**It cannot be in the build.** It needs the network, and a gate that fails when a ministry is down
would block every commit on somebody else's uptime.

### What already exists

**`url-check` is half of it, and the half that matters least.** It diffs `/data` against
`origin/main` and checks that new URLs resolve — **liveness, never content**, so a URL that now serves
a different document passes. `no-bare-root` asserts a citation deep-links, which is a precondition for
caching a passage rather than a homepage. The 277-citation frozen allowlist is the shape of the
backlog register. **The retrieval discipline in CLAUDE.md is the other half and is already written:**
a document is a source only if retrieved in this run, a 200 serving a JS shell is not a retrieval, OCR
output is not the document. **What is missing is the artefact, not the rules.**

## 3. THE 584 BARE-YEAR NAMES, RESTATED HONESTLY

The previous batch counted 584 names carrying a bare year and called them the argument for a
content-edition field. **That was true and it was not the whole statement**: it did not say how many
could be resolved without opening the document, and resolving one by re-retrieval costs what the
original retrieval cost.

Split by what the record itself already carries:

| | citations | recoverable without re-retrieval? |
|---|---:|---|
| a **full date** in the name — `28 July 2025`, `2026-08-05`, **`answered 02.08.2023`** | **413** | **Yes.** The document's own date is written down; the field would be a transcription, not a retrieval |
| a **dated path** in the URL, name undated | **40** | **Yes, weakly.** The publisher's filing date, which is the document's date for a press release and is not for a report published late |
| a bare year and **nothing else** | **131** | **No.** Someone must open the document |
| **total** | **584** | **453 recoverable, 131 not** |

**A correction to my own first pass, made before the count was banked.** The first needle scored 155
unrecoverable, because it matched `28 July 2025` and ISO dates and **missed `dd.mm.yyyy`** — which is
how every parliamentary answer in this corpus is dated. Reading the sample is what caught it:
*"Rajya Sabha Unstarred Question 1460, answered 02.08.2023"* was sitting in the NOT-RECOVERABLE list
carrying its own date in plain sight. **A non-zero count is a candidate list until the context is
read**, and this is the fourth instance of that rule paying for itself this phase.

**What the 131 actually are**, read rather than counted: statutes and policies cited by their year
(*Farm Laws Repeal Act 2021*, *National Education Policy 2020*), multi-edition series cited across a
span (*Union Budget Statements, FY2009-10 to FY2026-27*), and working papers cited by section. **For
the statutes the bare year is not a missing edition at all** — the Act of 2021 is the Act of 2021 —
so the honest count of citations that genuinely lack a recoverable edition is **smaller than 131**,
and establishing how much smaller is a per-record judgement rather than a needle.

**The corrected claim: of 584 bare-year names, 453 carry their document's date somewhere in the
record already and 131 do not — and the 131 include an unmeasured number for which a year is the
complete and correct citation.**

---

# RESUME HERE — updated 2026-08-06, after structural-cycle batch 4

**The non-prose render assertion is BUILT and green.** It was the item with three dependants;
`commitmentState`, the `contested` split and `vintage` are now unblocked, and each remains a schema
change and therefore a stop to be agreed before it is built.

**PASS A IS STILL BUILT AND STILL NOT RUN** — `review/pass-a-structural.md`, no non-Claude model is
credentialled on this machine, and the operator runs it externally.

**Two debts recorded in schema exemptions, not fixed:** `higherIsBetter`, read by nothing on 70
series; `xAxis`, where two series render in the form their own field description forbids. Both are
now visible to the gate as exemptions rather than invisible to it as filtered-out fields.

**Open, unchanged:** `figure-consistency`'s mining gap · the seam-span triage, 125 spans / 34
undeclared · Arc B's one capability · the `STATE.md` archive split (proposed) · four stale schema
descriptions · the tier/vintage asymmetry. **Newly proposed and not built:** the source cache, scoped
in section 2 above — hash always, bounded extract usually, raw bytes never, and report-only out of the
build because it needs the network.

---

# STRUCTURAL CYCLE, BATCH 5 — 2026-08-06. One normaliser; the cache costed; the joint design proposed

`/data` untouched — `git diff --numstat -- data` returns nothing. No schema or enum contract moved.

## 1. ONE NORMALISER, AND THE DEPLOY PATH IMPORTS IT

Four ad-hoc checks in one session reported a correct page broken, all by the same mechanism, and each
was fixed only in the reader that produced it. **The mechanism is now closed at the source.**

`tools/lib/page-text.mjs` holds `norm` and `pageTextFromHtml`, extracted out of
`field-render-audit` with its output byte-identical afterwards. Its header carries the four failures
that earned it: an en dash against a hyphen; the `P-xx` linkifier making `"See P-26 ."`; **React's SSR
comment separators, which become a SPACE if `<!-- -->` is stripped as a tag**, so `lens · Europe` reads
`lens ·  Europe`; and a curly apostrophe against a straight needle.

**`tools/deploy-check.mjs` replaces the hand-written deploy script.** It derives every needle from
`/data` in the same operation, renders non-prose through `value-renderings.mjs`, enumerates fields
through `schema-fields.mjs`, and normalises through the module above — **the same four imports the
build gate uses**. Deterministic, evenly-spaced sample by sorted id, so a failure is reproducible and
a re-run cannot "fix" a defect by not drawing it.

**A same-form negative control on EVERY page**: a title belonging to a different record of that layer
must be absent. Without it a proxy serving one page for every URL, or a fetch silently following a
redirect to the index, passes every positive in the run.

**Both assertion paths proven to fire**, by reintroducing the defects: the value assertion pointed at
a string no page can carry, and the negative control pointed at the page's own title. **Sabotaged
exit 1, 27 value assertions and the control both failing; clean exit 0 on the same record.** Live run:
**27 record pages, 27 negative controls, 0 values missing.**

**Not in the build, deliberately** — it needs the network and a live deployment, and a gate that fails
when the host is slow blocks every commit on somebody else's uptime.

**Rule written into `CLAUDE.md`:** *a verification reads the page through the gate's own normaliser,
or it is not a check* — with the four failures, the reason the cost always runs in the worst
direction, and the corollary that **a disagreement between the gate and an ad-hoc check is evidence
about the check**.

## 2. THE 212 MARKS — ACCOUNTED AGAINST THE GATE'S OWN OUTPUT

`reachability --verbose` emits per field:

```
unmeasured 379/379 · caveat 234/234 · notes 329/329 · differentFactsNote 72/72 ·
assessmentNote 173/173 · revisitTrigger 71/71 · bridgeNote 110/110 · competingAccounts 212/212
```

**1368 + 212 = 1580.** The whole delta is `competingAccounts` and nothing else moved.

**The premise that one field per record should move it by 81 mistakes a per-record FIELD for a
per-entry MARK LIST.** The `MARKS` contract is `each: (record) => string[]` — an array, not a value —
and every entry it returns is a mark probed separately. `unmeasured` has behaved this way since it was
added: **379 marks over 202 carrying records**, not 202.

81 records carry **212 entries**: 3 records with 1 · **41 with 2** · 27 with 3 · 6 with 4 · 2 with 5 ·
2 with 6. Sum 212, exactly the emitted figure. By shape, 146 entries are `{holder, position}` objects
and 66 are bare strings — the `oneOf` that hid the field from the old walk in the first place.

**Per-entry is not an accident of implementation, it is the only correct granularity for this field.**
The median record carries two competing accounts, because two sides is what a dispute record IS. **A
per-record mark would assert that ONE of the two reaches the page** — so a view rendering the first
account and dropping the second would pass a guard whose entire purpose is that both are shown.

## 3. THE CACHE, RE-COSTED — and raw bytes were ruled out without the cost being stated

The previous batch said "raw bytes: no" and gave no number. Corrected here, **against a measured
sample rather than remembered figures.**

### What was measured, and its limits

**A deterministic 40-URL sample of the 479 distinct URLs** (evenly spaced by sorted URL), HEAD with a
12-second timeout. **13 returned a `Content-Length`; 9 of those exceed 10 KB and are plausibly the
document.** Basis n=9. **The sample is not stratified by document type and n=9 is thin — this is an
estimate with its basis stated, not a measurement of the corpus.**

| shape | n | mean | sizes measured |
|---|---:|---:|---|
| PDF / xlsx | 6 | **15.2 MB** | 32.9 · 22.5 · 12.6 · 12.2 · 10.2 · 0.6 MB |
| HTML | 3 | **248 KB** | 449 · 165 · 131 KB |

**27 of 40 returned no `Content-Length` at all** — every `pib.gov.in` PressReleasePage, every
`sansad.in` getFile, `egazette.gov.in`, `cag.gov.in`, `cea.nic.in`. **That is a fact about the HEAD
response, not about the documents**: chunked transfer, or a server that declines HEAD. Confirming any
of it needs a GET — **which costs what building the cache costs, and is itself an argument in the
proposal below.**

**Three sampled URLs returned something that is not the document**, and they are candidates rather
than findings for the same reason: `indiabudget.gov.in/.../cen0221.pdf` answered **1,245 bytes of
`text/html`**; `tutorial.gst.gov.in/.../final_monthly_gst_data...` answered **18 bytes of
`application/pdf`**; `imf.org/en/Publications/WEO` answered **15 bytes**. An 18-byte PDF is not a PDF.
**A GET would settle all three, and `url-check` passes every one of them today**, because it asserts
that a URL resolves and never what it returns.

### The three options, costed over 479 distinct URLs

| | size | what it costs | what it preserves when a source REVISES | what it preserves when a source DISAPPEARS |
|---|---:|---|---|---|
| **hash only** | **116 KB** | one 247-byte entry per URL; a rotation of GETs to refresh | **That it changed, the date it changed, and every record resting on it.** Not one word of what it said, so the corpus can say *"the document behind L-0114 is not the document we read"* and nothing more | **Nothing.** The claim becomes unverifiable and the instrument can only record that it is |
| **bounded extract** | **~4–20 MB** | the passage actually read, which the retrieval discipline already bounds — *"fetch what answers the question"* | **The quoted passage, so the change can be characterised**: a revised figure, a deleted paragraph, a reworded commitment. This is what turns a hash alert into a research finding | **The evidence for the specific claim**, which is what a reader needs. Not the document, and not enough to re-derive anything the record did not already quote |
| **raw bytes** | **0.6–2.8 GB — A DECISION INPUT, NOT A MEASUREMENT** | 2.81 GB on the measured PDF mean; 0.61 GB if PDFs average 3 MB. **1,000× the 2.7 MB `/data` layer at the low end** | Everything | Everything — **and this is the only option under which a disappeared source can still be read by someone who was not there** |

> **LABEL ON THE 0.6–2.8 GB RANGE, AND IT IS NOT MODESTY.** That range rests on **n=9 sized URLs**,
> unstratified, projected onto 479 URLs whose measured members span **15 bytes to 34.5 MB** — three
> and a half orders of magnitude. Six of the nine were PDFs and every one was an annual report, a set
> of minutes or a survey volume, which is the fat end of the distribution and not its middle. The
> range is wide enough to decide with — *"hash is 116 KB and raw bytes are gigabytes"* is robust to
> any plausible correction — and **it is not a figure to quote forward.** A later cycle that writes
> "the cache would be 2.8 GB" will be stating a number this sample cannot support.
>
> **What would replace it: 479 GETs recording `Content-Length`.** That is the whole measurement, it
> costs one sweep, and until it is run the honest form of this row is an order of magnitude and a
> direction.


### The judgement, restated with the cost visible

**Raw bytes are not ruled out because they are expensive.** 0.6–2.8 GB is affordable storage. They
are ruled out for three reasons the size figure does not carry, and the size is the least of them:

1. **Re-hosting.** The deployment is public. Mirroring several hundred government PDFs, journalism and
   NGO datasets is a **distribution decision**, not a storage one, and it is not this instrument's to
   make quietly.
2. **The repository is the wrong container.** Git stores every revision forever; a 20 MB PDF replaced
   once costs 40 MB permanently, and `vercel deploy --prod` already **aborts on upload** because the
   tree carries a 662-page `out/`.
3. **It is the wrong artefact for the actual failure.** The failure this phase logged four times is a
   *host changing behaviour* — the e-Gazette going from unreachable to live, `mea.gov.in` serving a JS
   shell **whose Internet Archive snapshot is the same shell**, a client-rendered portal, a shared
   TLS-reset fingerprint. **A hash detects every one of those; raw bytes detect none of them any
   better.** What raw bytes uniquely buy is the disappeared-source case in the last column.

**The recommendation is unchanged and now has its cost stated: hash for all 479, bounded extract for
the citations a claim rests on, raw bytes never in this repository.** If the disappeared-source case
is judged to matter, the answer is an external archive with a recorded location — not bytes in git.

**And a cheap correction to this whole section, available for the asking: 479 GETs with
`Content-Length` recorded would replace every estimate above with a measurement.** It was not run
here because the sizing said items 1–3 are small and 479 government GETs against this machine's
resolver is not.

---

# PROPOSAL — `commitmentState` AND THE `contested` SPLIT, AS ONE DESIGN

**PROPOSAL ONLY. Nothing built, no enum touched, no schema edited.** Both are schema changes and
therefore stops; this is the document they are agreed from.

## Why they are one design and not two

They fail the same way. Each is a judgement the corpus **already makes**, recorded only in prose,
where nothing validates it, no gate sees it, and no reader can filter on it. Batch 10 established that
no `state` field exists and that **nothing marks a record as a commitment record at all**; batch 14
classified all 67 `contested` records by reading them. Both distributions are known, both are stable,
and **both need the same thing to be safe: an assertion that a non-prose value reaches a reader** —
which did not exist when they were scoped and does now.

**And they must be designed together because they collide.** The corpus runs **three separate
`(a)–(d)` vocabularies in the same prose fields** — commitment states, the `differentFacts` criteria,
and ordinary list markers — across 24 records, 7 of which use two of them. **Bare letters are
therefore ruled out on evidence, not on taste.** Both fields take named values.

## FIELD 1 — `commitmentState`

**What it is.** The state of the obligation a record's own `claimAtLaunch` created, as at `asOf`.
It is **not** a verdict: `assessment` scores what happened, `commitmentState` says whether the thing
is yet answerable. A record can be `partly` and `due-and-undelivered` at once, and today the second
half is sayable only in prose.

**Values, from CLAUDE.md's four states, named rather than lettered:**

| value | definition | today's prose |
|---|---|---|
| `not-yet-due` | a trigger date or an observable condition is named and has not arrived | (a), 12 records |
| `due-undelivered` | the trigger passed, with evidence of non-delivery | (b), 2 records |
| `abandoned` | there is evidence of abandonment. **Absence of news is not this** | (c), **0 records** |
| `no-trigger` | a total with no date, no phasing and no annual target: it has no trigger, so it is not `not-yet-due`; it can never fall due, so it cannot reach `due-undelivered`; and absence does not evidence abandonment, so it is not `abandoned` | (d), 1 record |

**`abandoned` would ship with zero members and that is the point of declaring it.** Its emptiness is a
finding — across 226 records the instrument has never once concluded that a commitment was abandoned —
and a value that exists and is unused says that out loud, where a value that does not exist says
nothing. The same argument was made for `overstates-pre-2014`, which sat unattested until P-122 used
it.

**WHAT MARKS A RECORD AS IN SCOPE, and it needs no new field.** A record is a commitment record when
it carries **`claimAtLaunch`** — the field that records what the government said the thing would
achieve. **89 of 226 records carry it.**

**Tested rather than asserted: all 15 records that assert a commitment state in prose today carry
`claimAtLaunch`, and none is outside the 89.** Zero misses, zero strays. The scope marker is already
in the schema and already populated.

**The tension the scope marker exposes, and it is a finding rather than an objection.** 13 records are
scored `no-objective` — *"no objective was stated at announcement"* — **and carry a `claimAtLaunch`
anyway** (L-0184, L-0187, L-0206, L-0208, L-0209, L-0210 among them). That is not a contradiction: it
is exactly the `no-trigger` population, where something WAS announced and cannot be scored against
itself. **`commitmentState: no-trigger` is the field that makes those 13 legible**, and at present a
reader sees only `no-objective` and cannot tell them from the 60 `no-objective` records that carry no
claim at all.

**Cardinality:** required on the 89, absent on the other 137. Not optional-everywhere — an optional
field on every record reproduces exactly the silence this is meant to end.

## FIELD 2 — `contestedGround`

**What it is.** What would settle the contest, on a record the instrument declines to score.
**Not a hedge about confidence** — it is the answer to *"what would have to be true for this to
resolve?"*, and for three of the seven values the honest answer is "nothing".

**Values, from batch 14's read of all 67:**

| value | n | what would settle it |
|---|---:|---|
| `criterion` | 22 | Nothing. The facts are agreed; the dispute is which frame governs |
| `interpretation` | 13 | An authoritative reading of a document or statute — none given, or two inconsistent ones |
| `evidence-withheld` | 11 | A specific figure or document that exists or is producible, and is not published |
| `measure` | 10 | Nothing, but the rival measures are enumerable: several valid published measures of one object point opposite ways and none was committed to in advance |
| `evidence-unobservable` | 5 | Nothing. The settling fact is a counterfactual, or unbuildable while the practice stands |
| `time` | 4 | Elapsed time. The readings make divergent predictions |
| *(residue)* | 2 | **Not a value.** L-0092 and L-0129 say `contested` is standing in for a value that does not exist |

**The residue is not given a value, and that is deliberate.** Minting `other` would absorb exactly the
two records that are evidence the vocabulary is short. They stay unvalued and the field stays
optional-within-scope, so their absence is visible.

**WHAT MARKS A RECORD AS IN SCOPE.** `assessment === 'contested'` — no marker needed, the verdict is
the marker. **67 records at HEAD, and batch 14's 67 ids are exactly the 67 records carrying `contested`
now**, checked at generation time by the extract generator on every run.

**`disputeKind` does NOT transfer and this was tested.** Its two values are defined against *the stated
reason for an absence*: `evidentiary` means the holder's reason is contradicted by evidence the data
exists; `normative` means the facts are agreed and the characterisation is contested. **Neither has
meaning applied to two readings of a measure.** Forcing 23 records into those two boxes was the batch-14
proposal that was **withdrawn** — the names transfer, the definitions do not.

## WHAT GATE BINDS THEM — and it exists now

Both are enums, so both are **non-prose**, which until this week meant outside every render assertion
by construction. That hole is closed. Landing each field means:

1. **`no-unguarded-prose-field`** — declared in `tools/lib/value-renderings.mjs` or exempted by name.
   No third state. Fires at authoring time, needs no build.
2. **`field-render-audit`** — observes the built page and asserts the value reaches the record's own
   page, through the one normaliser.
3. **`validate`** — required-when-in-scope: `commitmentState` present iff `claimAtLaunch` is present;
   `contestedGround` permitted only where `assessment === 'contested'`. **Both are conditional-required
   rules of the shape `unmeasured` already uses** for `disputeKind` when `reasonDisputed` is true, so
   the validator needs no new machinery.
4. **`enum-stamp`** — the fixtures pick up the new values and the selftest fails on drift.
5. **`tools/deploy-check.mjs`** — carries them to the deployed artefact for free, since it enumerates
   from the schema rather than from a list.

**And a label map in `lib/format.ts`, in the same commit**, because a value with no label renders as
its own token and the renderings table would have to declare `identity` — which is legal and is
almost never what a reader should see.

## HOW THE BACKFILL RUNS — 89 + 67 records, and no file it never touched

**The hazard is documented and specific.** A JSON round-trip is not a safe way to edit a file whose
formatting you did not choose: **four whole-file reformats were caught this way**, each reported clean
by the script that caused it. And **indentation is not uniform** — most ledger files and
`provenance.json` are 1-space; `foreign-trade`, `education`, `baseline`, `kashmir-*` and
`rights-institutions` are 2-space.

**So the backfill is a per-record ANCHORED STRING INSERT, never a parse-and-serialise.**

1. **Bound each record's span by its own id, to the next id** — never a fixed character window. A
   `t[i:i+9000]` window missed L-0110's source because the record is longer than the window, and a
   fixed window is a silent-miss generator: it finds the anchor on short records and misses it on long
   ones with no sign which happened.
2. **Anchor on the `"assessment"` line inside that span**, which every ledger record carries, and
   insert the new key on the line after it. **Detect the indentation from the line being anchored on**,
   never assume it.
3. **ABORT on any anchor that is absent or occurs more than once in the span.** Write anchors that
   abort, never anchors that shrug.
4. **Declare the expected diff shape before the edit and abort on mismatch** — for `commitmentState`,
   *89 insertions, 0 deletions, across the 9 ledger files that hold the 89*; for `contestedGround`,
   *65 insertions, 0 deletions* (67 records less the 2 residue). Verify with `git diff --numstat`,
   never with the writer's own count: **a non-zero report with an empty or wrong diff is a failure**.
5. **A file with no in-scope record is never opened.** That is the "never touched" requirement, and it
   is checkable: the numstat must name only the files holding in-scope records, and every other path
   must be absent from the diff entirely.
6. **The VALUES are not mechanical.** 15 records have a state asserted in prose and can be transcribed;
   **the other 74 require a judgement per record**, and per the standing rule the judgement is made and
   written per record, never swept. `contestedGround` has all 67 already classified by reading, so it
   transcribes — but **the classification is a report and the rule is that a flag is checked against
   the RECORD, not against the report that describes it**, so each one is re-read against its own
   `caseFor`/`caseAgainst` before it is written.
7. **Land the schema, the type, a view, the renderings declaration and the validator rule in ONE
   commit**, then backfill in a second. A field that lands without its view renders nowhere while every
   gate stays green — except that now, for the first time, one of them would not.

## WHAT THIS PROPOSAL DOES NOT SETTLE

- **Whether `commitmentState` should be required on all 89 or only where a state is determinable.**
  Requiring it forces 74 judgements at once; permitting absence reintroduces the silence. My reading is
  that required-on-89 is right and the work is the point, but it is the operator's call.
- **Whether the 2 vocabulary-residue records get a value.** Leaving them unvalued is proposed above.
- **Whether `no-objective` should be re-examined for the 13 records that carry a claim.** Naming them
  `no-trigger` may make the verdict look wrong where it is right. **A shipped verdict changing is a
  stop**, so nothing here proposes touching one.

---

# RESUME HERE — updated 2026-08-06, after structural-cycle batch 5

**The joint `commitmentState` + `contested`-split design is PROPOSED and awaits agreement.** It is a
schema change and therefore a stop. Everything it needs now exists: the non-prose render assertion,
the scope markers (`claimAtLaunch` for one, the verdict itself for the other, both already populated
and both tested against the known asserting population), and a backfill method that does not
round-trip a file.

**PASS A IS STILL BUILT AND STILL NOT RUN** — no non-Claude model is credentialled on this machine.

**New this batch:** `tools/lib/page-text.mjs` is the one normaliser and `tools/deploy-check.mjs` is the
deploy-control path, both proven to fire. `npm run deploy-check`.

**Open, unchanged:** the two schema-exemption debts (`higherIsBetter`, `xAxis`) · `figure-consistency`'s
mining gap · the seam-span triage, 125 spans / 34 undeclared · Arc B's one capability · the `STATE.md`
archive split (proposed) · four stale schema descriptions · the tier/vintage asymmetry · the source
cache, now costed at 116 KB / ~4-20 MB / 0.6-2.8 GB for its three options.

---

# STRUCTURAL CYCLE, BATCH 6 — 2026-08-06. `contestedGround` SHIPPED · `commitmentState` STOPPED

Operator-authorised schema change. **One of the two fields was built. The other is a STOP, on
evidence found while building it.**

## 1. STOP — `commitmentState`'s four values cannot express a commitment that was MET

**The vocabulary has no state for "due and delivered", and 9 records are in it.**

CLAUDE.md's four states are: **(a)** not yet due · **(b)** due and undelivered · **(c)** abandoned ·
**(d)** unfalsifiable by construction. Read them against the scope. A commitment whose trigger passed
and which WAS met is not (a) — it is due. It is not (b) — that requires evidence of non-delivery. It
is not (c), and it is not (d), which requires that it can never fall due. **It has no value.**

**This is not a reading of mine. The corpus already had to stretch the vocabulary and did it
silently.** L-0212's own `whatHappened` reads:

> **COMMITMENT STATE (a) RESOLVED, AND QUICKLY.** The instrument named on 16 December 2024 as
> something officials were instructed to finalise is spoken of on 5 April 2025 as existing … which is
> delivery inside four months against a commitment that carried no date.

**(a) is "not yet due". It is being used to record delivery.** That is the same defect this file has
already documented twice — `too-early` where "83 per cent of that value was occupied by a state its
own definition did not describe", and `reversed`, which "attracts anything that ends".

**The scope of the gap, measured:** of the 89 records carrying `claimAtLaunch`, **9 are scored
`worked`** — L-0014, L-0023, L-0026, L-0029, L-0047, L-0052, L-0053, L-0151, L-0207 — and **28 are
`partly`**, most with a met limb and an unmet one. Filing any of them under one of the four would put
a value on a record its own definition contradicts, on a public page, in the field whose entire
purpose is to say precisely which state a commitment is in.

**Why this is a stop and not a fix.** The remedy is a fifth value — and the authorisation was to build
**per the proposal**, which specified four. **A fifth enum value is an enum contract change**, which
is a stop under the standing rule and under this batch's own conditions. It also needs a written
definition agreed before it is minted, not invented mid-backfill.

**Everything for `commitmentState` was backed out** — schema property, conditional rule, type, label
map, rendering declaration, guarded mark and view. `validate` is VALID and the tree carries no half of
it. **What the aborted build proved and is worth keeping:**
- the schema rule fired on **exactly 89 records** (178 errors = 89 × 2, ajv emitting the specific
  failure and its enclosing `then`), confirming `claimAtLaunch` as an exact scope marker;
- `no-unguarded-prose-field` **fired on both fields before any view existed**, exit 1, naming
  `ledger.commitmentState` and `ledger.contestedGround` — the render guard proven on each, per the
  batch's condition, before the thing it guards was written.

**What a fifth value would have to say, for the agreement:** *due and delivered — the trigger passed
and the commitment was met.* Note it does not duplicate `assessment`: `worked` scores the measure
against its objective, this would score the obligation against its clock, and L-0212 is `partly`
while its commitment resolved completely.

## 2. SHIPPED — `contestedGround` on 65 of 67 records

**Landed in one commit: schema · type · label map · rendering declaration · guarded-marks list ·
view.** Scope marker is the verdict itself — the schema permits the field only where `assessment` is
`contested`, in the conditional-required shape `unmeasured` already uses for `disputeKind`.

| ground | written | what would settle it |
|---|---:|---|
| `criterion` | 22 | nothing — the facts are agreed, the dispute is which frame governs |
| `interpretation` | 13 | an authoritative reading; none given, or two inconsistent ones |
| `evidence-withheld` | 11 | a figure that exists or is producible and is unpublished |
| `measure` | 10 | nothing, but the rival measures are enumerable |
| `evidence-unobservable` | 5 | nothing — a counterfactual, or unbuildable while the practice stands |
| `time` | 4 | elapsed time |
| **total** | **65** | |

**L-0092 and L-0129 ship UNVALUED, with the reason in the schema description.** Both say in their own
prose that `contested` is standing in for a value that does not exist. Minting an `other` would have
absorbed exactly the two records that are the evidence this vocabulary is short.

**Checked at write time rather than trusted:** every classified id was required to be `contested` at
HEAD before anything was written — a stale classification writing a ground onto a rescored record is
the "flag checked against the report, not the record" trap — and the scope reconciled
**65 valued + 2 unvalued = 67 contested**, which is the gate's own figure.

### The backfill, and the numstat agreed

**Declared before any write**, from the data: **65 insertions, 0 deletions, across 13 files**, with
`baseline.json` named as the file that must not be opened.

```
ACTUAL git diff --numstat -- data/ledger
  2 agriculture · 2 banking · 7 education · 3 employment · 2 environment · 12 federalism
  2 foreign-trade · 2 infrastructure · 10 kashmir-rights · 6 kashmir-security · 4 macro-fiscal
  10 rights-institutions · 3 welfare
DECLARED 65 insertions / 0 deletions across 13 files
ACTUAL   65 insertions / 0 deletions across 13 files — AGREED
```

**Per-record anchored string insert, never a parse-and-serialise.** Span bounded by the record's own
id to the next id, never a fixed window. Anchor asserted UNIQUE within the span. **Indentation read
off the anchored line** — `/data` is 2-space in eight of these files and 4-space in five.

**And every assertion ran BEFORE the write**, which is the rule this session earned by destroying a
file the other way round: the file was transformed in memory, re-parsed, compared record-for-record
against the original with every other field required byte-identical, the line delta checked, and only
then written.

### Gate movement

| gate | before | after |
|---|---|---|
| `reachability` | 1580/1580 | **1645/1645** — exactly +65 |
| `field-render-audit` | 36 prose + 42 non-prose | **36 + 43**, 0 invisible, 2 exempted |
| `no-unguarded-prose-field` | 44 non-prose | **45 non-prose** (43 declared, 2 exempted) |

**The fixture-freshness check fired on its own, unprompted, and was right.** After the mark and the
rendering landed, `validate:selftest` failed with *"stamp says 8 marks / 42 renderings, fixtures hold
8 / 42, live lists hold 9 / 43"* — a positive control cut from a list the gate no longer used.
`npm run regen:render-fixtures` restored it. That guard was built two batches ago and this is the
first time it caught something real.

## 3. THE ORDERING RULE, in `CLAUDE.md`

*A guard that runs after the destructive operation is a post-mortem, not a guard.* Earned by
truncating `project_india_roadmap.md` from 918 lines to 45: the script wrote first and asserted
second, Python truncates on open, and the assertion never ran. **Same class as a gate reading a stale
build and reporting clean** — the check and the thing it checks in the wrong order, with output
identical to a real pass. The mechanical forms are stated: assert on the computed content before
writing; or write to a temporary path, assert on that, and rename over the original.

**And the memory directory is now a git repository** — `400353d`, 34 files, no remote, and no remote
without a deliberate decision because those files carry personal context. **That is cheaper and
stronger than the rule**: the directory being untracked is the only reason a recoverable edit was not
recoverable.

## 4. THE CACHE RANGE, LABELLED

The 0.6–2.8 GB row now carries its own health warning in this file: **a decision input, not a
measurement** — n=9 sized URLs, unstratified, projected onto 479 spanning 15 bytes to 34.5 MB, with
six of the nine being annual reports and minutes, the fat end of the distribution. **Robust enough to
decide with, not a figure to quote forward.** 479 GETs recording `Content-Length` would replace it.

---

# BATCH 6, ITEM 1 — THE 479-URL SWEEP. Report only, nothing corrected

`tools/source-response-check.mjs`, all **479 distinct URLs** from **622 records**, ranged GET with a
2 MB ceiling and the 1.1.1.1 resolver fallback. **185 URLs were reachable only through the fallback**,
which is the standing environment fact and not a finding.

## The count, with this sweep's own artefacts removed and named

**86 flagged raw. 19 of those are defects in the sweep, not in the corpus**, and they are named
rather than quietly dropped:

| artefact | n | why it is not a finding |
|---|---:|---|
| `stub:captcha` on a large body | 5 | the signature was a word search. It fired on a **100 KB Wikipedia article** because MediaWiki ships `CaptchaNeededForGenericEdit` in its JS config, and on five full pages of 29–155 KB. **An interstitial that replaces a document is a few KB; a 100 KB body IS the document.** The tool now requires a body under 25 KB before a stub signature counts |
| `js-shell` on a truncated body | 3 | the text-density test measured the first 16 KB of a **206**. `tradingeconomics.com` was flagged and carries **33,301 characters of text in full**. The tool no longer applies the test to a cut body |
| HTTP 429 | 11 | **every one is `comtradeapi.un.org` and every one returns 200 when fetched serially.** The sweep rate-limited itself at 8 concurrent. Banking them would have reported eleven dead citations that are alive. Concurrency lowered to 4 and the hazard written into the tool's header |

**67 URLs remain, across 167 records** — and that number still overstates the corpus's problem:

- **40 are BARE DOMAIN ROOTS** (116 records). `pib.gov.in/`, `ncrb.gov.in/`, `morth.nic.in/`,
  `powermin.gov.in/`, `data.gov.in/`. These are the **already-tracked** population —
  `no-bare-root` holds 277 allowlisted legacy citations frozen 2026-08-05 — and a root answering with
  a redirect, a JS landing page or nothing is what a bare root does. **Not new, and not this sweep's
  finding.**
- **27 are DEEP LINKS** (53 records): `http-error` 14 · `no-response` 7 · `too-small` 2 · `empty` 2 ·
  `js-shell` 2 · `not-a-pdf` 1 · `type-mismatch` 1 · `stub:incapsula` 1.

## THE FINDING: 6 URLs return a 2xx that is not the cited document, across 13 records

**`url-check` passes every one of these**, because it asserts a URL resolves and has never asserted
what comes back. This is the class the batch was asked to sweep for.

| what comes back | records |
|---|---|
| **601,485 bytes beginning `<?xml version="1.0"` served as `application/pdf`.** A PDF begins `%PDF`. This one does not | **L-0114 · P-79 · P-80** |
| **212-byte Incapsula interstitial** for the India Updated First NDC. **The already-logged unfccc.int stub, confirmed still live** — and `pdftotext` accepts it | **P-124** |
| **0 bytes, `application/octet-stream`,** for a `download.php?file=…pdf` on `ppac.gov.in` | **L-0189** |
| **58 bytes: `{"count":0,"data":[],"error":""}`** — a Comtrade query returning an **empty result set**, confirmed serially so it is not the rate limit | **L-0191** |
| **3,770-byte JS shell** at an Internet Archive wrapper for `udise.in` — the archived snapshot is the shell, which is the `mea.gov.in` shape exactly | **L-0106 · P-63** + 3 series |
| 307 with 0 bytes on `ncrb.gov.in/en/crime-india` — a redirect the fallback could not complete, so **probably environment rather than defect** | L-0121 · P-83 |

**NOTHING IS CORRECTED AND NOTHING SHOULD BE, YET.** Two reasons, both binding:

1. **A citation change can move a verdict.** L-0114 is the pellet-injury record and L-0191 is the
   corpus's worked instance of the single-sided measurement category, where **the absence IS the
   finding** — a Comtrade query now returning `count: 0` bears directly on what that record asserts
   and is a research question, not a link fix.
2. **A response is a fact about this machine, this moment and this user-agent.** This phase has logged
   four estates changing behaviour mid-project, and this sweep produced 19 of its own artefacts before
   triage. **A failure here is not evidence the citation was wrong when it was made.**

**The honest next step is per record, not per URL:** open each of the 13, establish what the citation
was for, and decide whether the document moved, the host changed, or the record's claim needs
re-grounding. That is research work and belongs to a phase, not to a sweep.

## What the sweep says about `url-check`

`url-check` asserts liveness. **Of the 6 content-shape cases it passes 6.** The two gates are
complementary in the same way `reachability` and `field-render-audit` are — one asserts the URL is
there, the other asks whether what is there could be the document — and neither subsumes the other.
`source-response-check` stays **report-only and out of the build**: it needs the network, it produced
a 22 per cent artefact rate on its first run, and a gate that fails when a ministry is slow would
block every commit on somebody else's uptime.

---

# BATCH 7 — TRIAGE OF THE TWO ADVERSARIAL REVIEWS. 2026-08-06

**Nothing resolved. No record, schema or verdict touched.** `/data` diff is empty.

## 0. Where the reviews were found, and what they were reviewing

**The reports are NOT at `review/pass-a-*.md`.** That glob matches only the input extract. They are
two PDFs in `~/Downloads`: `adversarial-structural-review.pdf` (**Review A**) and
`AI Review of Government Performance Claims - Google Gemini.pdf` (**Review G**). Recording that
because a later cycle looking for them at the stated path will find the extract and mistake it for
the output.

**Both describe the corpus at `059912b`**, and every classification below was measured against a
`git archive` of that commit, never against HEAD.

**What the intervening batches changed, so no reviewer is blamed for a fixed defect and no new one is
credited to them:**

| change | which finding it touches |
|---|---|
| **`contestedGround` shipped**, 65 of 67 records (`6ab86dc`) | Review A's finding 4 says the ground distinction "exists only as a project classification, **not as a data field**". **That sentence was true at `059912b` and is false at HEAD.** The structural half of the complaint is closed; the substantive half is not |
| **`commitmentState` backed out** (`6ab86dc`) | Review A's finding 1 attacks the commitment-state rule that routes undated commitments into `no-objective`. The field was stopped for an unrelated reason. **The reviews are new, independent evidence against re-authorising it** — see §8 |
| **The 479-URL response sweep** (`f063ec2`) | Found L-0114's source returning XML as `application/pdf`. L-0114 is one of Review A's 11 `evidence-withheld` contested records — **the two findings meet on one record**, see §5 |
| non-prose render assertion (`6b72097`) | Review G's could-not-check item 4 (whether fields render) is now gated, though not for the reason it asked |

## 1-2. CLASSIFICATION, ordered by convergence

**Convergent findings first — both reviewers reached these independently, with no contact.**

### C1 · `worked` sourcing asymmetry — **CONFIRMED, and it SURVIVES the series layer**

Measured at `059912b`: `worked` **9 records, 13 citations, mean 1.4**, against `failed` 3.3,
`partly` 2.9, `contested` 2.8. Tier profile **T1×12 T4×1 — no T2, no T3.** Seven of nine carry a
single ledger citation. **Exactly as both reviews stated.**

**Review A hedged this on the omitted series and the hedge does not save it.** Eight of the nine
resolve `seriesRefs`, and **every resolved series is T1**: L-0023 3×T1 · L-0026 3×T1 · L-0029 2×T1 ·
L-0151 5×T1 · L-0047 1×T1 · L-0052 1×T1 · L-0053 2×T1 · L-0014 1×T1. **L-0207 has no series at all.**
So the series layer adds volume and **does not add independence** — the success verdicts rest on
Indian official material at both layers. **The reviewers' conclusion strengthens on the data they
could not see.**

### C2 · zero `worked` in Term 2 — **CONFIRMED exactly**

`worked` by term: **T1 8 · T2 0 · T3 1**, against **74 T2 records**. T2 holds 32 `contested`,
19 `no-objective`, 11 `partly`, 5 `failed`, 3 `too-early`, 3 `awaiting-adjudication`, 1 `reversed`.
**Elapsed time cannot explain zero successes in a completed term.** Neither review could distinguish
authoring-order drift from a real finding and neither claimed to. **OPEN.**

### C3 · `no-objective` insulating statutory failure — **CONFIRMED as a pattern, OPEN as a defect**

The nine records are exactly as Review G lists them. **L-0095, L-0106, L-0108, L-0162 are `failed`
against statutory benchmarks with `claimAtLaunch` empty; L-0094, L-0122, L-0154, L-0164, L-0167 have
the same shape and are `no-objective`.** The corpus's rule is that a verdict scores a *stated*
objective, so a statutory duty is not an announcement — but it is applied in both directions, and
**nothing in the records says which way the line runs.** L-0122 is the sharpest instance: 0 of 50
AFSPA sanction requests granted, filed `no-objective`.

### C4 · `awaiting-adjudication` inconsistent — **SPLIT: one half ARTEFACT, one half CONFIRMED**

**The "three of four still argue for the withdrawn class" half is an ARTEFACT — of my extract, not of
the corpus.** All three records (L-0086, L-0127, L-0134) **name `awaiting-adjudication` in their own
notes and carry a `RESCORED`/`CORRECTED` marker**. What the reviewer saw was the first substantive
sentence — *"Scored too-early because…"* — because **Extract A prints only that sentence and my
generator additionally strips a leading dated correction clause.** The withdrawal is in the sentence
the extract cut. **This is the most important single result of the triage: the extract manufactured a
finding in the direction of accusing the corpus of not correcting itself, when the correction was
there.** See §9.

**The other half is CONFIRMED.** L-0075, L-0082, L-0163, L-0165, L-0168 sit in `contested` with a
pending outside adjudication. And a larger finding falls out that neither review made: **24 of the 67
`contested` records carry NO `assessmentNote` at all** at `059912b`, including L-0075 and L-0082 —
a declined verdict with no stated ground.

### C5 · `contested` absorbing missing evidence — **CONFIRMED, and partly a DISAGREEMENT**

By the corpus's own classification: **`evidence-withheld` 11 + `evidence-unobservable` 5 = 16 of 67**.
The count is the corpus's own and is not in dispute. **The disagreement is about what follows.** The
instrument's stated position is that declining to score is a statement about the evidence rather than
a hedge, and that a state controlling the missing evidence is a finding rather than a reason to
convict. **Review A's charge — that non-publication can prevent an adverse verdict — is a real
mechanism and the instrument accepts it deliberately; what it has never done is say so where a reader
sees it.** At HEAD `contestedGround` renders, so the reader can now see which of the six grounds a
record rests on. **OPEN: whether `evidence-withheld` should carry a different verdict, not just a
different ground.**

### C6 · method text desynchronised — **CONFIRMED, three instances, still live at HEAD**

| method text says | data says |
|---|---|
| `too-early` has "two remaining members, L-0061 and L-0139" | **13 members** |
| `overstates-pre-2014` "UNATTESTED — no record uses this value" | **P-122 uses it** |
| non-directional values "carry 35 of the 58 records" | **100 of 127** |

All three were logged as open in batch 1 and deliberately not fixed, **because a schema-description
edit was a stop then.** Both reviews found them independently. **They are the cheapest confirmed
findings in the set and the only ones with no judgement in them.**

### Non-convergent findings

| # | finding | state | evidence |
|---|---|---|---|
| A1/G2A | `no-objective` shields undated commitments; **13 records carry a claim** — L-0184 L-0187 L-0206 L-0208 L-0209 L-0210 L-0211 L-0213 L-0215 L-0217 L-0218 L-0219 L-0220 | **CONFIRMED (fact) / OPEN (defect)** | the 13 ids reproduce exactly. The corpus's answer is `(d) unfalsifiable by construction`, which is a *reason* rather than a *rebuttal* |
| A3 | L-0026 `worked` while its own note says two objectives resolve differently; L-0207 `worked` on delivery alone while L-0206/L-0208 are `no-objective` | **OPEN** | needs full prose and sources; neither is in Extract B |
| A6 | `directionOfBias` 19:6 against post-2014 | **CONFIRMED (count) / DISAGREEMENT (inference)** | 19 `overstates-post-2014`, 6 `understates-post-2014` reproduce exactly. **The instrument has never claimed directional balance in provenance** — a measurement-dispute record records what a defect does, and expecting parity is a standard it rejects. The named per-record doubts (P-11, P-36, P-63) are **OPEN** |
| G1B | `too-early` on measures not in force (L-0205, L-0188) | **OPEN** | both records address it explicitly — L-0205: *"the obstacle is elapsed time and the procedural steps time carries"*; the trigger is an observable condition, which the commitment-state rule expressly allows. **But the verdict definition's first clause literally says "the measure is in force", and these are not.** Practice and definition diverge: the definition needs a word, not the records |
| G1C | `not-published` used 206 times without a stated search | **CONFIRMED — see §4** | |
| G3B | domain distortion | **CONFIRMED numerically — see §5** | |
| A5b | the source table cannot establish what a verdict rests on because series are omitted | **ARTEFACT of the extract, and a correct one** | the reviewer identified a real limit of the document rather than of the corpus |

## 3. HOW MANY VERDICTS WOULD MOVE

**Not moving any. Counting only.**

| finding | records at risk | current verdicts |
|---|---:|---|
| F1 `no-objective` with a populated claim | 13 | `no-objective` 13 |
| F2 statutory failure into `no-objective` | 5 | `no-objective` 5 |
| F3 `awaiting-adjudication` left in `contested` | 5 | `contested` 5 |
| F4 `worked` on one government citation | 9 | `worked` 9 |
| F5 `contested` absorbing missing evidence | 16 | `contested` 16 |
| F6 `too-early` not in force | 2 | `too-early` 2 |
| F7 multi-objective inconsistency | 2 | `worked` 2 |

**49 DISTINCT RECORDS — 22 per cent of the ledger** — currently `contested` 20 · `no-objective` 18 ·
`worked` 9 · `too-early` 2. Overlaps: L-0168 in F3∩F5; L-0026 and L-0207 in F4∩F7. **All nine
`worked` verdicts are in the set**, which is why these are decided together or not at all.

## 4. `not-published` MEASURED AGAINST RULE C.5 — the finding is worse than stated, and it is a RULE CONFLICT

**206 entries at `059912b`** (162 ledger across 103 records, 44 series). Needles printed:

```
index enumerated        /index (page|was|read|enumerated)|enumerat\w+ the (index|listing)|publisher.s own listing/i   → 0
archive convention      /archive convention|convention .{0,30}href|month-stamped path/i                              → 0
routes exhausted        /routes? exhausted|each host and path|named routes|every (host|route)/i                       → 0
scoped document absence /appears? in (no|any)\b|does not appear in|no .{0,40} in (any )?(the )?<Doc>(report|reply…)/i → 10
bare "not retrieved"    /no such document was retrieved|not retrieved|was not located|no document/i                   → 13
```

**ZERO of 206 state any of rule C.5's three accepted search forms. Ten state a scoped document
absence — the weakest form that names what was checked. 196 (95%) state neither.**

**But reading them changes what the finding IS, and this is the part neither review reached.** The
`why` texts do not argue that a search was run; they argue that **the holder has the data** — *"held
by the scheme operators and the identity authority"*, *"It holds both the old and the new bases and
could produce a dual run"*. That is **rule C.4's producibility test, applied correctly.** All 206
carry a `wouldFill`.

**So the corpus is satisfying C.4 and failing C.5, and the two rules do not agree.** C.4: *"exists in
a holder's hands, not released. The test is producibility under compulsion, **not whether anyone has
asked**."* C.5: *"An absence-of-publication claim requires a stated search."* **A record can pass one
and fail the other by construction, and 196 do.** This is the L-0052 error at scale — and it is not
carelessness, it is two rules pulling opposite ways with no precedence stated. **OPEN, and it needs a
ruling on precedence before any record is re-labelled.**

## 5. THE DOMAIN CROSS-TABULATION — confirmed exactly, and the WORSE version is REFUTED

**Review G's figures reproduce to the decimal**, on its own definition (`contested` + `no-objective`
as the non-evaluative share):

| domain | n | worked | failed | non-evaluative | Review G said |
|---|---:|---:|---:|---:|---|
| kashmir | 46 | **0** | **0** | 76.1% | 46, 0, 0, 76.1% ✓ |
| governance | 113 | 1 | 8 | 74.3% | 113, 1, 74.3% ✓ |
| infrastructure | 24 | 4 | 1 | 37.5% (54.2% worked+partly) | 54.1% delivery ✓ |
| welfare | 21 | 1 | 2 | 38.1% (42.9%) | 42.8% ✓ |

**One correction to my own assumption, made before it reached the report:** I expected `kashmir` to be
a lens rather than a domain. It is in `domains[]` on all 46 and in `lenses[]` on none. **The reviewer
was right and my prior was wrong.**

### The cross with the citation sweep — and it runs the OTHER way

The feared finding was that the least-evaluative domains are also the weakest-cited. **They are not.
They are the best-cited by volume.**

| | records | citations/record | T4 share | records touched by a deep-link problem | "not the document" |
|---|---:|---:|---:|---:|---:|
| **least evaluative** (<25% evaluative) | 276 | **3.35** | 11.5% | 27 | 7 |
| **most evaluative** (≥45%) | 75 | **1.68** | 9.9% | 3 | 1 |

kashmir 4% evaluative on **3.5 citations/record**; infrastructure 58% evaluative on **1.8**; banking
54% on **1.1**; welfare 52% on **1.3**. **L-0114 is a real dead citation in a well-cited domain, not
the tip of a weak one.**

**The two convergent findings therefore meet on one mechanism, and it is the opposite of the one
proposed: an evaluative verdict in this corpus is CHEAP — reached on fewer sources — and a
non-evaluative one is EXPENSIVE.** Whether that is rigour (declining to score costs more evidence) or
timidity (evidence accumulates until scoring feels unsafe) is **OPEN and is the single most important
question the reviews raise.**

## 6. THE SIX DEAD-RESPONSE RECORDS — classified, none resolved

| record(s) | response | classification |
|---|---|---|
| **L-0191** | Comtrade returns `{"count":0,"data":[]}` | **OPEN, and the sharpest in the set.** The record's assertion is that the absence IS the finding. Three incompatible readings: the same finding restated · a changed API contract · changed underlying reality. **They are three different records and no evidence here distinguishes them** |
| **L-0114 · P-79 · P-80** | 601,485 bytes of XML served as `application/pdf` | **CONFIRMED dead citation, OPEN as to effect.** L-0114 is also in Review A's `evidence-withheld` set — **the only record both the sweep and both reviews touch** |
| **L-0189** | 0 bytes, `application/octet-stream` | **OPEN** — a `download.php` route, plausibly session-dependent |
| **L-0106 · P-63** + 3 series | 3,770-byte JS shell behind an Archive wrapper for `udise.in` | **OPEN.** L-0106 is also in Review G's statutory-failure set (F2) |
| **P-124** | 212-byte Incapsula stub | **CONFIRMED and ALREADY LOGGED** — the known `unfccc.int` case, still live |
| **L-0121 · P-83** | 307, 0 bytes | **ARTEFACT, probably** — a redirect the resolver fallback could not complete |

## 7. STANDING OPEN ITEM — **SELECTION BIAS**

Review A's could-not-check list contains the question no internal audit reaches:

> *"The selection denominator: which government claims or policy areas were never entered into the
> corpus."*

**Logged under its own name because it is not a defect in any record and no gate can ever see it.**
Every count this instrument emits — 226 ledger records, 22% of verdicts at risk, 74% non-evaluative
in governance — is conditional on a population nobody has characterised. **The corpus can be internally
perfect and still be a biased sample of what the government said.**

**What would partially address it, in increasing cost:**
1. **An enumerated frame.** Take one exhaustive published list — a year's PIB releases, a Budget
   speech's announcements, a manifesto — and record what fraction entered the corpus and why the rest
   did not. **Partial, cheap, and the only one runnable now.**
2. **A NO-RECORD register.** The instrument already decides not to record and calls it a result;
   phase 14 closed five subjects that way. **Those decisions live in the log, not in `/data`, so they
   are invisible to any reader.** A layer for them would make the denominator partly visible.
3. **An external nomination.** Ask someone outside to name ten claims they expect to find, then report
   how many are there. It measures the gap against an outsider's expectation rather than the author's.

**None of these measures the true denominator, and the item should say so permanently rather than be
closed by any of them.**

## 8. `commitmentState` — the four-value proposal does NOT survive the reviews unchanged

It was already stopped because the four states cannot express a commitment that was **met**. **The
reviews add a second, independent objection from the opposite direction**, and it is stronger:

- **Both reviews attack `no-objective` directly** — Review A rates it Critical.
- **The proposal's `no-trigger` value routes undated commitments INTO `no-objective`**, which is the
  exact mechanism Review A calls out: *"an indefinitely drafted promise can never become overdue while
  the verdict says nothing was claimed."*

**So the field as proposed would formalise, in a schema, the behaviour two independent reviewers
identified as the corpus's most serious structural defect.** Shipping it would make the defect
harder to fix, not easier.

**Whether the scope changes: yes, and in a way that matters.** The proposal scoped it by
`claimAtLaunch`, 89 records. **The 13 `no-objective` records carrying a claim are the contested
population**, and they are exactly where `no-trigger` would apply. **The field cannot be agreed before
the `no-objective` question is**, and the order is now the reverse of what was proposed: decide
whether an undated commitment is scoreable, then decide whether a field records the answer.

## 9. WHAT NEITHER REVIEWER COULD CHECK, AND WHETHER PASS B OR C WOULD REACH IT

**The extract manufactured at least one finding.** C4's first half is an artefact of Extract A
printing only the first substantive sentence of `assessmentNote` **and my generator stripping the
leading dated correction clause on top of that** — so a corrected record shows the sentence arguing
for the old verdict and not the sentence withdrawing it. **Both reviewers were reasoning correctly
from a document that had removed the evidence against their conclusion.** That is the extract's
defect and the first thing to fix.

**Shared could-not-check list, both reviews:** the 269 series and 60 pairs · full prose for most
records · the render layer · the verification log · the selection denominator · whether cited
documents support their summaries and carry the right tiers.

**Would the built passes answer anything? Mostly NO, and the reason is that they were selected for a
different question.**

| flagged record | in Pass B? |
|---|---|
| L-0026, L-0207 (A3, verdict-level) | **no** |
| L-0082, L-0209, L-0122, L-0191 | **no** |
| L-0075, L-0114 | yes |

**Two of eight.** Pass B's criteria — corrected more than once, rescored, a contested spread — do not
intersect the reviewers' findings, which cluster on `worked`, `no-objective` and the statutory line.

**Pass C is worse placed on the one finding it was built for.** Its **E.2 lists 311 absence entries by
id only, without the `why`** — and the `why` is the entire evidence for whether a `not-published`
claim states a search. **The pass cannot test its own most important convergent finding.**

**What a third extract must carry, in priority order:**
1. **Full `assessmentNote`, never a first sentence** — this defect fabricated a finding.
2. **The `why` of every `unmeasured` entry**, at least for all 206 `not-published`.
3. **Series tier and point count for every `seriesRefs`**, so a source-profile claim can be tested at
   the layer the verdicts actually rest on. The `worked` finding needed this and got it only because
   the triage ran it afterwards.
4. **A verdict-neighbourhood selection**: for each finding class, the records that took the verdict
   AND the near-identical records that did not. Both reviews reasoned by comparison — L-0026 against
   L-0048, L-0095 against L-0094 — and the extract gave them no systematic way to do it.
5. **Domain and term cross-tabs with citation counts joined**, which is what turned §5 from a
   suspicion into a refutation.

**Recommendation: do not run Pass B or Pass C as built.** Reshape Extract B's selection around the 49
records at risk, and give Extract C the `why` texts. Neither is a large change and both are
mechanical.

---

# BATCH 8 — PREPARING THE 49-RECORD DECISION. 2026-08-06

**Nothing decided, no verdict moved, `/data` untouched.**

## 1. THE EXTRACT DEFEATED THE REVIEW ON EVERY FLAGGED RECORD, NOT ONE

Re-checked all 34 records the two reports name. **The extract cut prose from all 34.** Median cut
~400 bytes; the worst showed 30–107 bytes of a 1,100–1,300-byte note. **L-0205 showed 10 bytes of a
242-byte note.**

**Corpus-wide: the first-sentence rule cut 87 per cent of `assessmentNote` by volume and removed the
correction marker from 49 of the 173 records carrying one.**

**Which findings the cut prose actually defeats, strengthens, or leaves standing:**

| finding | what the full note says | effect |
|---|---|---|
| **A2 awaiting-adjudication** | all three name their current value and carry `RESCORED` | **DEFEATED** — already recorded |
| **A3 on L-0026** | *"Worked is therefore asserted on the recapitalisation objective … and NOT on consolidation"* | **PREMISE DEFEATED.** The reviewer's *"unless omitted evidence establishes…"* condition is met. It survives as a design question — may a verdict score one announced objective and record the other as an absence? — not as an inconsistency |
| **A3 on L-0207** | *"Scored on delivery and on delivery only … A reader should take this score as saying the electricity flows, not that the deal is good"* | **STRENGTHENED.** The record concedes the exact mechanism the reviewer alleges |
| **A1 on L-0209** | *"an objective is a target that can be failed … This is not a judgement that the fence is unbuilt"* | **CONVERTED to a DISAGREEMENT.** The record agrees with the reviewer's characterisation and differs on what the value should be called |
| **G2A on L-0122** | `VALUE-AND-NOTE RECONCILED`: rescored *"in the pass that introduced no-objective **to drain the contested sink**"* | **STRENGTHENED.** The record supplies a motive the reviewer did not have |

**So the defect ran in both directions**: it manufactured one finding, and it withheld the evidence
that would have sharpened two others.

### The generator is fixed

- **A correction clause is never stripped.** The `PROVENANCE_OPENER` strip is gone.
- **`assessmentNote` prints IN FULL** in Extract A. It is the argument for the verdict, and the
  instrument's own words are that a verdict shown without its argument is what it exists not to do.
- **Provenance `whatChanged` keeps its first sentence but never loses a correction** — 5 of the 6
  records carrying one had it beyond the first sentence, so the carrier sentence is appended with an
  elision mark.
- **Verified: 40 of 40 ledger and 4 of 4 provenance corrections now reach the extract.** The one
  apparent miss, P-49, was my verification regex matching *"previously enrolled in by default"* —
  ordinary prose about farmers. The generator's needle correctly ignored it.
- `pass-a-structural.md` 240,871 → **351,423 bytes**.

## 2. THE 24 `contested` RECORDS WITH NO `assessmentNote` — none is a missing ground

**All 24 carry BOTH a substantial `caseFor` and `caseAgainst`** — 338 to 1,719 bytes each, none under
330 — **and all 24 now carry a classified `contestedGround`.**

| ground | n | ids |
|---|---:|---|
| criterion | 7 | L-0015 L-0019 L-0020 L-0040 L-0084 L-0085 L-0126 |
| measure | 7 | L-0043 L-0058 L-0060 L-0074 L-0078 L-0083 L-0132 |
| evidence-withheld | 4 | L-0042 L-0057 L-0070 L-0148 |
| time | 2 | L-0031 L-0082 |
| evidence-unobservable | 2 | L-0056 L-0079 |
| interpretation | 2 | L-0075 L-0128 |

**Batch 13 generalised from five and the generalisation holds, but for a reason it did not state.**
`assessmentNote` is defined as *"a note on the assessment VALUE itself — typically that the existing
vocabulary does not cleanly fit"*. **Its absence means no strain was recorded about the value, not
that no reasoning exists.** The reasoning is in `caseFor`/`caseAgainst` — **which Extract A omitted
entirely**, which is why both reviewers read `contested` as under-argued.

**What this does to the reviewers' finding: it weakens the general charge and sharpens the specific
one.** 18 of 24 rest on a criterion, measure, interpretation or time ground — two readings of shared
evidence, which is what `contested` is for. **6 of 24 rest on `evidence-withheld` or
`evidence-unobservable`** — and those are the records where the reviewers' description is accurate:
the verdict is declined because a fact is missing, not because two readings compete.

## 3. THE TIMIDITY TEST — the method is working on the heavily-cited set, with 8 exceptions

**82 per cent of high-citation non-evaluative records cite sources that disagree**, and the rate
rises with citation count:

| | records | showing a source-conflict signal |
|---|---:|---:|
| non-evaluative with ≥4 citations | 45 | **37 (82%)** |
| non-evaluative with <4 citations | 95 | 61 (64%) |

The dominant signal is a declared provenance record carrying `competingAccounts` (24 of the 37) —
the record points at a measurement dispute that literally holds two parties' positions.
**So the extra citations on non-evaluative records are the two sides of a dispute. That is the method
working, and the "timidity" reading is not supported for the heavily-cited set.**

Contested records on a **missing-evidence** ground carry *more* citations (mean 3.1) than those on a
**two-readings** ground (2.7), which cuts mildly against the ignorance reading too.

### The residual, and it converges with the other findings

**8 records are heavily cited, non-evaluative, and show no source conflict at all:**

`L-0123` `L-0021` `L-0164` `L-0166` `L-0213` `L-0131` `L-0167` `L-0018`

**Five are constitutional or statutory-duty records** (L-0164, L-0166, L-0167, L-0123, L-0131) —
Article 356 proclamations, Governor assent, Inter-State Council non-meetings, the Public Safety Act.
**L-0164 and L-0167 are also in Review G's statutory double-standard set, and L-0213 is in Review A's
undated-commitment set.** **Three findings converge on the same records: heavily evidenced, sources
that agree, constitutional duty, and no verdict.** That is the sharpest form of the timidity charge
and it is where the decision should look first.

## 4. THE DECISION BRIEF — 49 records, two questions

### QUESTION (a): is a commitment with a target and NO DEADLINE scoreable?

**Reviewers:** Review A rates this Critical. *"An indefinitely drafted promise can never become
overdue while the verdict says nothing was claimed."*
**Measurement:** 13 `no-objective` records carry a populated `claimAtLaunch`; the ids reproduce
exactly. L-0209's own note agrees on the facts and differs on the name: *"an objective is a target
that can be failed."*

| ruling | records that move | what it commits the instrument to |
|---|---:|---|
| **Not scoreable (status quo)** | **0** | Saying so **where a reader sees it**. `no-objective` currently reads "no objective was stated at announcement", which is **false on all 13**. The value would need renaming or a mandatory note. It also keeps a live incentive: an undated announcement is permanently unscoreable |
| **Scoreable — undated targets take a real verdict** | **up to 13**, and fewer on inspection: **at least 3 (L-0218, L-0219, L-0220) are records about the INSTRUMENT'S OWN retrieval, not government commitments**, and do not move | Scoring against announcements with no due date everywhere, which means a verdict that can never be falsified by time — the objection that produced `no-objective` in the first place |
| **A third value: "announced, undated, unfalsifiable"** | 13 relabelled, **0 verdicts change direction** | An enum change, and it is what `commitmentState`'s `no-trigger` was — see below |

### QUESTION (b): does a single government press release support `worked`?

**Reviewers:** both, independently. Review G: *"Awarding an unqualified `worked` verdict based on a
single T1 government press release accepts government self-reporting as ground truth."*
**Measurement:** `worked` 9 records, mean **1.4** citations against `failed` 3.3. **T1×12 T4×1, no T2,
no T3.** Eight of nine resolve `seriesRefs` and **every resolved series is T1** — the series add
volume, not independence. L-0207 has no series at all.

| ruling | records that move | what it commits the instrument to |
|---|---:|---|
| **Yes, sufficient** | **0** | Disclosing it. The corpus's strongest claim about itself is that a verdict traces to its evidence; a success verdict resting on one government release is a property a reader must be told about, not one they should have to derive |
| **No — `worked` needs corroboration outside the announcing body** | **up to 7** (the single-citation `worked` set: L-0023 L-0026 L-0029 L-0047 L-0052 L-0053 L-0014) | **A sourcing floor, which the instrument has never had for any verdict** |
| **A floor of ≥2 citations for every scored verdict** | **61 records across seven classes** — `no-objective` 17 · `contested` 15 · `partly` 15 · `worked` 7 · `failed` 4 · `too-early` 2 · `awaiting-adjudication` 1 | Symmetry. **`partly` is 47 per cent single-citation and `failed` 25 per cent**, so a floor applied only to `worked` would be the asymmetry the reviewers allege, inverted |

**The symmetry number is the one to hold on to: `worked` is 78 per cent single-citation, `partly` 47
per cent, `failed` 25 per cent.** The asymmetry is real and it is a gradient, not a `worked`-only
defect.

### The other two classes in the 49

**`contested` (20 records).** 5 have a pending outside adjudication and could move to
`awaiting-adjudication` — a reclassification within existing vocabulary, no enum change, and the
records' own notes explain why they were not (L-0163, L-0165: *"both readings rest on the same
admitted text"*). 16 rest on a missing-evidence ground; moving them needs a value that does not exist.

**`too-early` (2 records).** L-0188 and L-0205 reason explicitly from the obstacle and the commitment
rule allows an observable condition in place of a date. **The definition's first clause says "the
measure is in force" and they are not.** The cheapest fix in the whole set: **amend the definition's
wording, move no verdict.**

### WHAT BOTH ANSWERS IMPLY FOR `commitmentState`

**The field cannot be designed before question (a) is answered, and the answer determines whether it
exists at all.**

- **If undated targets are NOT scoreable**, `no-trigger` is the right value and the field is
  coherent — but it then **formalises in a schema the exact behaviour both reviews attack**, and
  shipping it makes the defect harder to reverse.
- **If undated targets ARE scoreable**, `no-trigger` should not exist, and the field reduces to three
  states — plus the fifth value the last batch found missing (*due and delivered*), giving four again
  but a different four.
- **Either way the scope changes.** The proposal scoped it by `claimAtLaunch`, 89 records. **The 13
  contested records are exactly the ones `no-trigger` would apply to**, and at least 3 of the 13 are
  instrument-meta records that should not be in scope at all. **The scope marker needs a second
  condition: the claim must be a GOVERNMENT commitment, not the corpus's own account of its
  retrieval.**

## 5. BOTH PASSES RESHAPED — not run

**Pass B was reselected against what the triage knows.** The two largest previous criteria —
*corrected more than once*, *rescored after shipping* — **carried 2 of the 8 records the reviewers
argued about, and are dropped.** A criterion selecting for the author's own correction history
selects for what the author already knew was wrong. Their counts stay in Extract A's change table.

**Now: 73 records** — the 49 at risk **grouped by the finding each belongs to, with their comparison
sets** (`L-0095 L-0106 L-0108 L-0162` beside `L-0094 L-0122 L-0154 L-0164 L-0167`; `L-0048 L-0212`
beside the nine `worked`), because **both reviewers had to reason by comparison and the first extract
gave them no way to do it** — plus the phase's 10 hardest calls **as a control**, so a second round
has undisputed records to calibrate against. 305,363 → **616,172 bytes**.

**Pass C's E.2 now carries the `why` for all 311 entries.** It was ids-only, which is why the pass
could not test the `not-published` finding it exists for. The section states the measurement — zero
of 206 meet the stated-search rule while the `why` texts argue producibility — and tells the reviewer
to **read the two rules against each other, not just against the records.** 293,898 → **521,039
bytes**.

**Neither is run.** `pass-a-structural.md` is also regenerated at 351,423 bytes and **a second Pass A
would now be a different document** — every finding that turned on truncated prose would be
re-derivable or refutable from the file itself.

---

# BATCH 9 — TRIAGE OF THE PASS-B REVIEW. 2026-08-06

**Nothing resolved, no verdict moved, `/data` untouched.**

## 0. ONE REVIEW RETURNED, NOT TWO

The brief describes "two independent pass-B reviews". **Only one was delivered** —
`pass-b-deep-adversarial-review.pdf`, committed to `review/returned/`. Searched `~/Downloads`,
`~/Desktop`, `~/Documents` and the whole home tree for anything newer than 12:00; there is one file.

**This matters to how the findings are weighted.** The pass-A triage ranked by convergence — a
finding two reviewers reached separately outranks either alone. **Nothing in the pass-B set is
convergent-by-independence**, and every finding below is classified as single-source. Where pass B
agrees with pass A that is convergence across ROUNDS, which is weaker: pass B read the corrected
extract, so it saw pass A's material plus the prose pass A was denied.

## 1. L-0026 OVERTURNED — the batch-7 classification was wrong, and pass B is right

**The instrument has NO stated rule permitting objectives to be weighted after results are known.**
Searched `CLAUDE.md` and `schemas/ledger.schema.json` for *centrepiece · principal objective ·
primary objective · dominant objective · weighted after · which objective governs*: **zero hits in
both files.** Saying so plainly, as asked: **no such rule exists.**

The definitions decide it:

> **worked** — the measure achieved **the** objective stated at announcement.
> **partly** — the measure achieved **part of** its stated objective.

| record | its own note's first assertion | verdict | against the definition |
|---|---|---|---|
| **L-0026** | *"TWO OBJECTIVES WERE ANNOUNCED AND THEY DO NOT RESOLVE THE SAME WAY"* | `worked` | **partly** |
| **L-0029** | *"THREE OBJECTIVES WERE ANNOUNCED; TWO ARE MEASURED AND MET"* | `worked` | **partly** |
| **L-0048** (control) | *"TWO OBJECTIVES WERE ANNOUNCED; ONE IS MET AND THE OTHER IS MEASURED AND NOT MET"* | `partly` | **correct** |

**L-0026 and L-0048 state the same structure in nearly the same words and take different verdicts.**
Batch 7 classified pass A's finding as *defeated* because the full note says worked is asserted on
recapitalisation and not consolidation. **That reasoning was wrong**: the note explains the choice,
and the definition does not permit it. **A record that explains why it departs from the definition
has documented a departure, not authorised one.** Pass B's phrase is exact — *the anticipatory notes
do not cure the defect; they confess it.*

**L-0047 is weaker but not clean.** Its argument is different — *"the asset is the service"*, that
electrification converts without behavioural change — but it **carries `unmeasured: "Net emissions
change from electrification"` with `reasonKind: not-published`**, and its own note calls emissions
part of the announced object. **CONFIRMED for L-0026 and L-0029; OPEN for L-0047**, which turns on
whether an unmeasured limb is an unachieved one.

**This is the first reviewer finding to overturn a prior triage classification of mine.** The
mechanism is worth recording: batch 7 accepted a record's *explanation* as an *answer*, which is the
same error as reading a report instead of the record.

## 2. THE TIER AUDIT — 39 T1 citations do not survive the ladder, in five bands

Swept all **1,205** citations. Host-classified against the ladder's own definitions; every band is
listed because the bands differ in how settled they are.

| band | n | verdict |
|---|---:|---|
| **A** journalism ACCOUNT of a document tagged T1 — Business Standard on an RBI Annual Report, `abclive` on the RBI Financial Stability Report | **7** | **Unambiguous violation.** The rule's own example is *"a CAG finding known only through a newspaper's account of an RTI reply is T4"* |
| **B** multilateral tagged T1 — UN Treaty Series, UN Comtrade, World Bank | **5** | **Unambiguous.** T2 by definition |
| **C** the instrument or its private repository tagged T1 | **3** | **Unambiguous.** Not an official Indian source on any reading — see §3 |
| **D** foreign government primary tagged T1 — `govinfo.gov`, `whitehouse.gov`, `ustr.gov`, `supremecourt.gov` | **19** | **NOT a mis-tag — a TAXONOMY GAP.** T1 is defined *Indian* official; T2 is multilateral. **A US Executive Order retrieved directly from the Federal Register has no class in this ladder.** The reviewer's wording is exactly right |
| **E** full document on a mirror — Bar and Bench judgment, `internetshutdowns.in` government orders | **5** | **AMBIGUOUS, and the corpus has already ruled on it once, the other way** |

**Band E is the interesting one and it is a live contradiction in the instrument's own texts.**
`CLAUDE.md` records that a 2026-08-05 audit *"accused two records of a tier misassignment when they
were citing a government order that a civil-society site re-hosts"* and treats that audit as the
error. But the ladder says *"Grade what you hold, not what it is about."* **The two cannot both be
right, and nothing reconciles them.** The distinction that would — *the document itself on another
server* versus *someone's account of it* — is not written down anywhere. **Band A is the account
case and band E is the mirror case; the ladder does not distinguish them.**

**A false positive I caught before reporting it:** 4 citations to `rchiips.org/nfhs` classified as
academic. **IIPS is an Indian institute of national importance and NFHS is an official statistical
publication — T1 is correct.** Host-classing would have made this a violation.

### The corrected T1 figure — REPORTED, NOT SHIPPED

**Published on `/method`: 965 of 1,205.**

| band treatment | corrected T1 |
|---|---:|
| A+B+C leave T1 (D unclassifiable, E stays on the prior ruling) | **950** |
| A+B+C+D leave | **931** |
| strict — A+B+C+D+E all leave | **926** |

**The honest public figure is a range, 926–950, and the page cannot state one number until band D has
a class and band E is reconciled.** Not shipped, per the sizing.

## 3. THREE RECORDS CITE THE INSTRUMENT ITSELF AS T1, ON A PRIVATE REPOSITORY

| record | what it asserts | its source |
|---|---|---|
| **L-0218** | three Indian government publication channels cannot be read by an ordinary reader | *"Retrieval observations, phase 14, recorded in `docs/verification-log.md`"* — **T1**, with the URL pointing at `mea.gov.in`, **the page being tested, not the log** |
| **L-0219** | of 278 citations naming a publisher rather than a document, half cannot be addressed | one source: `github.com/neo999-cyber/india_government`, **T1**, whose own name field reads *"INTERNAL REFERENCE, NOT AN OPENABLE URL — and the point is conceded rather than hidden"* |
| **L-0220** | thirteen schemes across five domains show a systematic pattern | *"This corpus's own ledger records L-0012, L-0034…"* — **T1**, same repository URL |

**The repository is private.** The URL returns 404 to every reader; the deployment metadata records
`githubRepoVisibility: private`.

**What a reader can check: nothing.** Not the 278, not the 92 roots, not the 139 unaddressable, not
the thirteen-scheme pattern, not the claim that the verdicts predated the synthesis.

**What would make them checkable**, cheapest first:
1. **Publish the derivation, not the repository.** These are counts over `/data`, which IS public.
   A generated table — the 278 citations listed, partitioned, with the threshold stated — turns an
   assertion into a reproducible one. `no-bare-root` already emits a version of this.
2. **Re-tier to a class that admits self-reference**, or state in the record that the evidence is the
   instrument's own and cannot be independently checked. T1 asserts the opposite of that.
3. **Withdraw the counts and keep the qualitative finding**, which stands without them.

**Second defect on the same three records:** batch 8 found L-0218, L-0219 and L-0220 are records
about the corpus's own retrieval rather than government commitments, and excluded them from the
undated-commitment decision on that ground. **They are now flagged twice on two independent grounds,
which is the strongest signal in the pass-B set that a whole record class needs a decision** — not
whether each is right, but whether a corpus should carry records about itself in the same ledger,
under the same verdict vocabulary, as records about the government.

## 4. L-0116 AND THE NEGATIVE-EXISTENTIAL SWEEP

**L-0116 confirmed.** Four sentences match, including *"No written order, circular or SOP
establishing the practice has ever been published"* and *"no published series exists"*. Rule 5d's
mechanical test — could one document turning up tomorrow falsify the sentence with no figure
changing? — is met by both.

**Sweep, needle printed in the log: 39 sentences across 30 records.** Highest counts: L-0114 (4),
**L-0116 (4)**, L-0093 (2), L-0168 (2), L-0115 (2).

**This is a CANDIDATE LIST and is not a finding.** The needle matches the FORM. Several will be
correctly grounded on a stated search in the surrounding sentence — L-0155's *"It has never been
published as a document of the Comptroller and Auditor General for any year"* names the publisher and
the scope, which is close to the honest form. **Only reading each settles it, and that is the work,
not this sweep.** Recorded so the population is known: **30 records carry the form.**

## 5. L-0226 — CONFIRMED, and it violates the rule its own caveat states

The rule for incommensurable quantities is category 3 of the four measurement categories:

> instruments measuring DIFFERENT quantities. Not a dispute and not an absence. **No conversion, no
> side-by-side placement.**

L-0226's caveat: *"'Not absorbed' and 'backed down' are treated as distinct quantities throughout
this record and must not be read as synonyms… no retrieved document states the relationship between
them."*

**The record diagnoses category 3 and then does the thing category 3 prohibits.** Its title — *"A
rule guarantees no renewable capacity is backed down; the plan built on it projects that some will not
be absorbed"* — is the side-by-side placement, and the `contested` verdict rests on it. Its
`contestedGround` is `interpretation`, which asserts two readings of one thing; the caveat says there
are two things.

**And it never declared its category at all: `differentFacts` is `undefined` on L-0226** — not false,
absent — while the four-categories rule says *"A record must say which it is."*

**CONFIRMED.** The caveat anticipates the objection and does not answer it. This is also the one
finding in the set that runs **against** the government.

## 6. DIRECTION BY LAYER — both hold, and they point opposite ways

| layer | measure | direction |
|---|---|---|
| **provenance** | `overstates-post-2014` **19** vs `understates-post-2014` **6** | **3.2:1 against the government** |
| **ledger** | alleged verdict errors, by which way they would move if upheld | **13 against : 1 toward** — L-0026, L-0029, L-0047, L-0014, L-0207, L-0188, L-0209, L-0210, L-0122, L-0094, L-0154, L-0164, L-0167 against; **L-0226** toward |

**Both hold as counts. Neither is a measurement of bias, and the difference matters.** The provenance
figure counts LABELS the corpus applied; the ledger figure counts ERRORS a reviewer alleges. **A
finding set's direction is a property of the reviewer as much as of the corpus** — and this one came
from a single reviewer whose own bottom line is that the verdict errors lean pro-government, so the
count is not independent of the conclusion it supports.

### What a reader should be told, and this is the part the instrument most owes

**The honest statement is not "we are balanced" and not "we lean".** It is:

> The measurement-dispute records lean 3.2:1 toward finding that post-2014 figures flatter
> performance. That is a property of which measurement problems were investigated, not a
> finding about the government. **Separately, where external review has found the verdict
> vocabulary misapplied, the errors have run predominantly in the government's favour.**
> **The two point opposite ways and neither cancels the other.** A reader should treat the
> provenance direction as a statement about the instrument's attention and the verdict
> direction as a statement about its discipline.

**Nothing is published from this yet** — it is a triage finding and the page is not touched in this
batch. But it is the sentence `/method` will have to carry once the 70-record decision lands.

## 7. THE DECISION SET GROWS: 49 → **70 RECORDS**

Pass B adds 38 records, **21 of them new**: L-0011 L-0015 L-0019 L-0021 L-0033 L-0093 L-0106 L-0115
L-0139 L-0140 L-0155 L-0166 L-0175 L-0185 L-0186 L-0189 L-0199 L-0216 L-0221 L-0224 L-0226.

| class | records | new |
|---|---:|---:|
| `worked` against the `partly` definition (L-0048 control) | 3 | 0 |
| `worked` on a proxy · on an inferred objective | 2 | 0 |
| tier: journalism account tagged T1 | 3 | **3** |
| tier: full document on a mirror (ambiguous) | 3 | 2 |
| tier: multilateral tagged T1 | 3 | 1 |
| tier: foreign primary, no class exists | 8 | **5** |
| self-citation as T1 on a private repo | 3 | 0 |
| rule-5d negative existentials | 12 | **9** |
| incommensurable placed side by side | 1 | 1 |
| stated-search not met on a named record | 3 | 1 |

**The classes that grew are the SOURCING and ABSENCE-CLAIM classes, not the verdict classes.** Pass A
found the verdict problems; pass B found that the evidence layer beneath them is tagged wrong. **That
is the more serious direction of growth**: a verdict can be re-argued, and a tier that is wrong makes
every count built on it wrong, including the one on the public page.

**A third operator question now joins the two from batch 8:**
**(c) does the ladder grade the SERVER or the DOCUMENT — and what class does a foreign government
primary take?** It is unanswerable from the current ladder, it blocks 24 of the 70, and it is the
only one of the three that changes a published number.

---

# BATCH 10 — PREPARATION FOR THE 70-RECORD DECISION. 2026-08-06

**Measurement and drafting only. No verdict, tier, record or schema touched.**

## 1. THE `worked` ASYMMETRY DOES NOT DEPEND ON THE TIER TAGS AT ALL

**Zero of the nine `worked` records carry a disputed citation.** All 13 of their citations survive the
audit untouched. Recomputed both ways:

| verdict class | n | citations | mean | ex-disputed | mean ex | disputed |
|---|---:|---:|---:|---:|---:|---:|
| `no-objective` | 73 | 232 | 3.2 | 209 | **2.9** | **23** |
| `contested` | 67 | 187 | 2.8 | 184 | 2.7 | 3 |
| `partly` | 32 | 92 | 2.9 | 91 | 2.8 | 1 |
| `failed` | 16 | 53 | 3.3 | 52 | **3.3** | 1 |
| `too-early` | 13 | 31 | 2.4 | 27 | 2.1 | 4 |
| **`worked`** | **9** | **13** | **1.4** | **13** | **1.4** | **0** |

**The finding is identical under both treatments: `worked` 1.4 against `failed` 3.3.** No `worked`
record changes position — not one of the nine gains or loses a citation, and the tier profile stays
T1×12 T4×1.

**Which record changes position: none.**

```
L-0023 [T1] -> 1 surviving      L-0151 [T1,T1,T1,T1] -> 4      L-0052 [T1] -> 1
L-0026 [T1] -> 1                L-0207 [T1,T1]       -> 2      L-0053 [T1] -> 1
L-0029 [T1] -> 1                L-0047 [T1]          -> 1      L-0014 [T4] -> 1
```

**The audit's weight falls on the OTHER side of the comparison.** `no-objective` loses 23 citations
(3.2 → 2.9) and `too-early` loses 4 (2.4 → 2.1) — the non-evaluative classes were carrying the
disputed foreign-primary and self-citation tags. **So correcting the tiers makes the non-evaluative
records look thinner and leaves the `worked` records exactly where they were.** If anything the
asymmetry widens.

**For the decision: question (b) — does one government press release support `worked`? — can be
answered before question (c) — does the ladder grade the server or the document?** They were assumed
coupled. They are not.

## 2. THE 30 NEGATIVE-EXISTENTIAL RECORDS, TRIAGED

39 sentences across 30 records. Split by whether the sentence is scoped to what was searched:

| | sentences | records |
|---|---:|---:|
| **retrieval-scoped — the honest form** | 11 | 9 |
| **world-claiming — candidates** | 28 | 22 |

**But reading the 28 reduces them, and the reduction is most of the point.** Three buckets:

**(a) ALREADY HANDLED — 2 sentences, and both are the corpus working.**
- **L-0114 `caveat`** — the match is the WITHDRAWN wording quoted inside its own correction:
  *"CORRECTED 2026-08-05 … the summary previously read 'the only pellet quantity any government has
  ever published'."* **The detector found the corpus fixing this exact defect.**
- **L-0124 `revisitTrigger`** — *"That check must be run before any claim that nobody publishes the
  perpetrator split after 2019 is treated as settled."* **It guards against the claim.**

**(b) NOT A PUBLICATION-EXISTENCE CLAIM — 6 sentences.** L-0088 (*"a scale no other body attempts"* —
comparative), L-0221 (*"the only quantity a government can directly control"* — analytical),
L-0191, L-0106 (a positive statement about what WAS published), L-0116's Hyderpora sentence,
`jk-assembly-turnout`. **The needle matched the shape, not the claim.**

**(c) GENUINE CANDIDATES — 20 sentences across 15 records:**
`L-0093` `L-0115` `L-0116` `L-0118` `L-0144` `L-0148` `L-0166` `L-0168` `L-0175` `L-0224`
`P-101` `P-113` `P-114` `tn-direct-goi-transfers-to-sias` `jk-organised-stone-pelting`

The sharpest are the ones asserting an order does not exist rather than was not found —
**L-0168** *"the order itself has never been published"* (twice) · **L-0115** *"The Court of Inquiry
has never been published"* · **L-0116** *"No written order, circular or SOP … has ever been
published"* · **L-0118** and `jk-organised-stone-pelting` *"no body has ever defined 'organized'"*.

**Corrected nothing.** And the honest scope statement: **the 30 → 22 → 15 narrowing was done by
reading, and the last step is a judgement per sentence that a later cycle should re-make rather than
inherit.** The population is 15 records; the count is not the finding.

## 3. THE MIRROR QUESTION — NEITHER TEXT DECIDES IT, AND THAT IS THE DEFECT

**TEXT 1 — `schemas/ledger.schema.json`, `sources[].tier`, verbatim:**

> Evidence grade of the DOCUMENT ACTUALLY RETRIEVED, not of the institution the subject belongs to.
> This is the operative rule and the one that goes wrong: a CAG finding known only through a
> newspaper's account of an RTI reply is T4, because the subject is official but the evidence is
> relayed. Grade what you hold, not what it is about.
> - T1: official Indian statistical or institutional source, **retrieved directly** …
> - T4: reported or documentary journalism, NGO datasets, and **anything RELAYED rather than
>   retrieved** — including an official figure known only through a press account, and an RTI reply
>   cited but not obtained.

**TEXT 2 — `CLAUDE.md` lines 250-256, verbatim:**

> The 2026-08-05 audit judged a source's tier from the `tier` field plus the host name, without
> reading the `name` field next to it, and accused two records of a tier misassignment when they were
> citing a **government order** that a civil-society site re-hosts — applying the rule the audit
> accused them of breaking.

### Where they conflict, precisely

**They do not conflict on the tier. They conflict on what has been DECIDED.**

- **Text 2 rebuts a METHOD, not a tier.** Its complaint is that the audit judged from `tier` + host
  *"without reading the `name` field"*, and its stated rule is *"a field is a fragment of a record,
  and a fragment read alone misleads"*. **It asserts what the records were citing. It never states
  what tier that citation should carry.**
- **Text 1's criterion is the evidence chain, and its examples never reach the case.** All three T4
  examples are ACCOUNTS OF a document — *"a newspaper's account of an RTI reply"*, *"an official
  figure known only through a press account"*, *"an RTI reply cited but not obtained"*. **None is the
  full text of the document served by a third party.**

**So: Text 1 does not decide the mirror case, and Text 2 does not decide the tier.** The instrument
has been treating a methodological rebuttal as a substantive ruling — including by me, one batch ago,
when I described the two as contradicting each other. **They do not contradict. There is a hole, and
inference has been filling it.**

**The undecided question, stated so it can be settled:** *is a document RELAYED when a third party
serves the identical bytes, or only when a third party describes it?* Text 1 leans T4 through
*"retrieved directly"*, and never says so.

**It bites on 5 citations now** — the Bar and Bench judgment on L-0114/P-79/P-80 and the J&K Home
Department orders on L-0139/L-0140 — **and on every future archived or mirrored primary, which is a
growing class**: 65 citations already resolve through `web.archive.org`.

## 4. DRAFT FOR `/method` — the directional split. FOR OPERATOR REVIEW, NOT SHIPPED

> **Two directional counts, and they point opposite ways.**
>
> Of the 127 measurement-dispute records, 100 assert no direction at all. Of the 27 that do,
> **19 find that a post-2014 figure flatters performance and 6 that one understates it — about
> 3.2 to 1.** Separately, where outside reviewers have found this instrument's verdict vocabulary
> misapplied, **the errors have run predominantly in the government's favour** — on one reviewer's
> count, 13 alleged errors that would move a verdict against the government against 1 that would move
> one toward it.
>
> **Neither number measures bias, and they measure different things.**
>
> The first counts LABELS this instrument applied. It is a property of **which measurement problems
> were investigated** — a corpus that went looking for definitional breaks and reporting-base shifts
> will find them where a basis changed, and bases changed more often after 2014 because more was
> rebased. It is a statement about the instrument's **attention**, not about the government.
>
> The second counts ERRORS a reviewer alleges, not errors established. It comes from a single review
> whose stated conclusion is the direction the count supports, so the count is **not independent of
> the argument it is offered for**. It is a statement about this instrument's **discipline** —
> specifically, that where the verdict vocabulary has been applied loosely, the looseness has favoured
> the government.
>
> **Neither cancels the other and a reader should not net them.** A corpus can pay close attention to
> flattering measurement and still score generously; that combination is what these two numbers
> together describe.

**What a reader needs in order not to be misled by either**, and the draft above carries all four:
1. **the denominators** — 100 of 127 assert no direction, so 19:6 is a ratio over a fifth of the layer;
2. **that the first is a count of labels applied, not defects found**;
3. **that the second is one reviewer's allegations, not adjudicated errors, and is not independent of
   that reviewer's conclusion**;
4. **that they are not commensurable and must not be netted.**

**Not published in this batch.** It goes up when the 70-record decision lands, because the second
number changes as findings are resolved or rejected.

## 5. PUBLISHING THE DERIVATION — SCOPE FOR L-0218, L-0219, L-0220

The three cite the private repository as T1 with URLs that 404. **Their claims split into two kinds,
and only one kind can be published from `/data`.**

### Derivable from public data, given a published RULE

**L-0219's 278 citations and 92 roots.** A reader trying this today gets neither number: **288 by the
obvious bare-root rule, 277 from the `no-bare-root` gate's own line.** Three figures for what sounds
like one quantity. **Publishing `/data` is not enough — the RULE is the missing artefact**: what
counts as naming a publisher rather than a document, and how the 302 → 278 reduction was scoped.

**L-0220's thirteen schemes.** The record already names them in its source field (L-0012, L-0034 to
L-0037, L-0039, L-0044, L-0048 …), so a reader can open each. **This one is nearly reproducible now**
and needs only the shape criterion stated as a rule rather than as a conclusion.

**Cost: one generator, in the shape of `no-bare-root` and `gen-manifest`** — reads `/data`, applies a
published rule, emits a table into `docs/`. Its output becomes the citation, replacing the repo URL.
The rule lands in the record or in `docs/`, not in the log.

### NOT derivable from any public artefact

**L-0219's 139 unaddressable** and **L-0218's three unreadable channels** rest on *requesting each
root through an explicit resolver and measuring the response as text*. **That is a retrieval result,
and no retrieval is stored** — the finding that produced the source-cache proposal. `/data` cannot
carry it because `/data` holds citations, not responses.

**Three options, and they are the operator's:**
1. **Store the retrieval.** The scoped cache — hash and a bounded extract per URL — makes these
   reproducible and is the only option that does. Cost: the cache, already scoped at ~116 KB for
   hashes alone.
2. **Re-scope the records to what `/data` supports.** L-0219 keeps 278 and 92 and drops 139; L-0218
   keeps the qualitative finding and drops the count. **Cheapest, and it narrows two records.**
3. **State in the record that the evidence is the instrument's own and cannot be independently
   checked.** Honest, and incompatible with a T1 tag on any reading of the ladder.

**Also in scope and not resolvable by any of the three: `tools/source-response-check.mjs` now
re-measures the same estates on demand.** It found the `mea.gov.in` JS shell and 40 bare-root
problems on its own run — **so L-0218's finding is now independently re-derivable by a tool in the
repository, even though the record's own evidence is not.** Pointing the record at the tool rather
than at the log is a fourth option and probably the best one.

---

# BATCH 11 — DERIVATION GENERATOR, MIRROR POPULATION, QUESTION (b). 2026-08-06

**No verdict, tier, record or schema touched.** One tool added.

## 0. A CORRECTION TO BATCH 10, MADE BEFORE ANYTHING WAS BUILT ON IT

Batch 10 recommended pointing L-0218 at `tools/source-response-check.mjs` "which re-derives the
finding independently — it found the `mea.gov.in` JS shell on its own run". **That is false.** The
sweep's own output for MEA:

```
https://www.mea.gov.in/                HTTP 200 · text/html · 77,919b · problems=[]
https://www.mea.gov.in/press-releases.htm  HTTP 200 · text/html · 82,719b · problems=[]
```

**Neither was flagged.** The js-shell hits in that run were `pib.gov.in`, `education.gov.in`,
`meity.gov.in`, `dot.gov.in`, `jkccs.net`, `ucdp.uu.se` — **MEA is not among them**, and at 78–83 KB
it sits far above the tool's 60 KB shell ceiling. **I read a list of government roots flagged as
shells and asserted that a specific one was on it.** Same class as reading a report instead of the
record.

## 1. `tools/gen-derivations.mjs` — and the rule was the missing artefact, exactly as scoped

`npm run derivations` → `docs/derivations.md`, 6.5 KB, over public `/data`.

### The three numbers are three UNITS, not three rules

| unit | count |
|---|---:|
| bare-root citation **occurrences** | **288** |
| distinct **(record, url) pairs** — the gate keys a Map on `${id} ${url}` | **277** |
| distinct **roots** | **93** |
| records affected | 231 |

**288 − 277 = 11, and all eleven are duplication** — ten records citing one root twice or three
times (L-0105 `censusindia.gov.in` ×3; L-0074, L-0089, L-0097, L-0132, L-0146, P-52, P-53, P-58,
P-68 ×2). **L-0219's 278 is one above the pair count**, and the allowlist's own `history` records
citations closed after that record was written.

**So no number was ever wrong. A count is not reproducible until its UNIT is stated**, and none of
the three sources stated one. The generator prints the rule beside every figure:

```
isBareRoot(u) = /^https?:\/\/[^/?#]+\/?$/.test(u)
scope: every object carrying a `url` at any depth, every file under /data except incoming/
```

### L-0219's second partition also derives

**246 citations name no document** under a stated and deliberately generous rule — no four-digit year
AND no multi-digit number anywhere in the citation name. Against the record's 139. **The gap is the
rule, again**: the record's own scope was the 278 bare roots, not all 1,205 citations.

### L-0220 reproduces EXACTLY — and a first draft of mine did not

**13 of 13 handover records carry `partly`; 2 of 2 controls carry `worked`; 0 of the 15 ever changed
verdict** — the last from `review/record-history.json`, which is generated from git, so *"the scores
predated the pattern"* is now checkable with `npm run record-history`.

**My first draft reconstructed the thirteen from the record's summary and got two wrong** — it
included L-0057 and L-0058, both `contested`, and printed a refutation of L-0220's claim **built
entirely out of my own guess**. The record names its thirteen in its source field. **Taking the list
from the record instead of from my reading of it turned a false refutation into an exact
confirmation**, and the generator now carries that note.

### What the generator cannot do, and says so

L-0219's **139 returning no document** (54 refused / 50 under 500 characters / 23 no DNS / 12
forbidden) is a **retrieval result. No retrieval is stored**, so no generator over `/data` can produce
it. The file states the boundary rather than printing a number that looks like it.

**Nothing re-cited.** A citation change may move a verdict and the 70-record decision is pending.

## 2. L-0218 — the sweep covers ONE of three channels and re-derives NONE

| channel L-0218 asserts | in the sweep? | result |
|---|---|---|
| Ministry of External Affairs | yes | **HTTP 200, 78–83 KB, NOT flagged** |
| Ministry of Defence (`mod.gov.in`) | **no** — no citation in `/data` uses that host | — |
| Department of Defence Production (`ddpmod.gov.in`) | **no** — same | — |

**What remains unreproducible: all three findings.** Two channels cannot be swept because nothing in
`/data` cites them — their unreachability is recorded in `CLAUDE.md`'s retrieval notes (*"`mod.gov.in`
and `ddpmod.gov.in` resolve and refuse port 443"*) and nowhere a reader can reach. The third is
swept and does not reproduce.

**Batch 10's fourth option is withdrawn.** L-0218's real options are the three already listed: store
the retrieval, re-scope the record to what `/data` supports, or state that the evidence is the
instrument's own. **The tool is not a substitute** — it measures what hosts do today, and L-0218's
claim is about what they did during phase 14.

## 3. THE MIRROR POPULATION — 77 citations, and the ruling is bigger than it looked

| served by | citations | tiers |
|---|---:|---|
| `web.archive.org` | **65** | **T1×63** T4×2 |
| `internetshutdowns.in` | 6 | T1×2 T3×3 T4×1 |
| `assettype` (Bar and Bench) | 3 | T1×3 |
| image/CDN re-host | 3 | T1×3 |
| **total** | **77** of 1,205 (**6.4%**) across **51 records** |

**The primaries behind the 65 archive citations**, by original host: `dsel.education.gov.in` 17 ·
`education.gov.in` 7 · `ncrb.gov.in` 7 · `udise.in` 5 · `cbic.gov.in` 5 · Lok Sabha `164.100.47.193`
5 · `ppac.gov.in` 3 · `lawmin.nic.in` 2 · `jkhome.nic.in` 2 · `jkgad.nic.in` 2 · and four others.

### And this is the finding: the originals are mostly gone

18 distinct original URLs extracted, 17 tested through a pinned resolver:

| result | n |
|---|---:|
| **200 — still live at the original host** | **2** |
| 404 — gone | 6 |
| no response | 3 |
| no DNS record | 4 |
| 301/302 — redirect, indeterminate | 2 |

**Two of seventeen.** For 13 of 17 the archived copy is not a convenience — **it is the only
surviving copy.**

**So the operator's question is not the one it looked like.** It is not *"should a mirror count as
T1"*. It is: **what tier does a document take when the only surviving copy is a mirror?** Grading
those T4 would tell a reader the evidence is weak when the real position is that the evidence is
strong and the publisher deleted it. **63 T1 citations turn on the answer, and the class grows every
time a ministry reorganises a website** — which the dead-response sweep has already shown happening.

## 4. QUESTION (b), PREPARED FOR DECISION — free-standing, answerable now

### The nine `worked` records, full evidence

| record | ledger cites | series refs | points | unmeasured | |
|---|---|---|---:|---:|---|
| L-0023 | 1 [T1] | 3 [T1×3] | 37 | 1 | Asset Quality Review |
| L-0026 | 1 [T1] | 3 [T1×3] | 24 | 1 | PSB recapitalisation |
| L-0029 | 1 [T1] | 2 [T1×2] | 3 | 2 | Digital public infrastructure |
| L-0047 | 1 [T1] | 1 [T1×1] | 5 | 1 | Railway electrification |
| L-0052 | 1 [T1] | 1 [T1×1] | 5 | 1 | Renewable capacity |
| L-0053 | 1 [T1] | 2 [T1×2] | 10 | 1 | Port efficiency |
| L-0014 | 1 [**T4**] | 1 [T1×1] | 12 | 1 | Flexible inflation targeting |
| L-0151 | 4 [T1×4] | 5 [T1×5] | 75 | 0 | Fourteenth Finance Commission |
| **L-0207** | 2 [T1×2] | **0** | **0** | **2** | **Punatsangchhu-II** |

**L-0207 is the outlier on every measure**: no series, no data points, two unmeasured entries, and
the only `worked` record resting on nothing but two ledger citations. **L-0151 is the opposite** and
would survive any floor.

### The gradient

`baseline-context` 91% · **`worked` 78%** · `partly` 47% · `failed` 25% · `awaiting-adjudication` 25%
· `no-objective` 23% · `contested` 22% · `too-early` 15% · `reversed` 0% — records with ≤1 citation.

### What a ≥2-citation floor moves

| floor | scope | below it | composition |
|---|---:|---:|---|
| **`worked` only** | 9 | **7** (78%) | `worked` 7 |
| **all definitive verdicts** (`worked`/`failed`/`reversed`) | 26 | **11** (42%) | `worked` 7 · `failed` 4 |
| **every scored verdict** | 215 | **61** (28%) | `no-objective` 17 · `contested` 15 · `partly` 15 · `worked` 7 · `failed` 4 · `too-early` 2 · `awaiting-adjudication` 1 |

**And the number that should decide the shape of the floor: if series count as evidence, a
`worked`-only floor moves ZERO.** All seven single-citation `worked` records resolve at least one
series. At the definitive level it is also zero; only at the every-scored-verdict level does a
series-aware floor still move anything — **13 of 61**.

### What each floor commits the instrument to where one primary genuinely settles it

**This is the real cost and it is not symmetric.**

- **A `worked`-only floor** commits the instrument to saying that a success claim needs corroboration
  a failure claim does not. **That is defensible only if stated as a deliberate asymmetry** — that
  the burden is higher for agreeing with the government than for disagreeing — and the instrument
  would have to publish that, because a reader who discovers it unstated will read it as bias in the
  other direction.
- **A definitive-verdict floor** is symmetric and moves 4 `failed` records with it. **Symmetry costs
  something real**: L-0030 (*no PSB has been privatised*) rests on one citation and one primary
  genuinely settles it — a single authoritative statement that a thing did not happen is not weak
  evidence, it is the right evidence.
- **An every-scored-verdict floor** moves 61 records, most of them non-evaluative, and **would
  penalise exactly the records the corpus is most careful about** — a `contested` record declining to
  score on one well-chosen source is not under-evidenced.
- **A series-aware floor** — counting a resolved series as corroboration — **moves nothing at the
  `worked` level and is therefore not an answer to the reviewers' finding.** The reviewers' point was
  that both layers are Indian official material, and a floor that counts them is blind to it.

**The honest framing for the decision: the floor is not really about counting. It is about whether
`worked` requires evidence INDEPENDENT OF THE ANNOUNCING BODY.** A count is a proxy for that and a
poor one — L-0151's four citations are all T1 government, and L-0014's single citation is the only
non-government source in the whole `worked` class.

## 5. THE 20 SENTENCES, WITH THE WORDING THAT WOULD SCOPE THEM

**21 sentences across 15 records** (one more than batch 10's count — L-0116 carries four, not three).
Each pairs the live wording with the retrieval-scoped form, so the correction pass is mechanical when
authorised. **Not applied.**

| record · field | the world-claim | the scoped form |
|---|---|---|
| L-0093 `summary` | "No back-cast, no dual-basis year and no reconciliation **exists**" | "…**appears in any UDISE+ report retrieved**" |
| L-0093 `caseAgainst` | "**has never been published**" | "**is not in any UDISE+ publication retrieved in this run**" |
| L-0115 `whatHappened` | Army inquiry sentence | already scoped to what the Army stated — **leave** |
| L-0115 `caveat` | "The Court of Inquiry **has never been published**" | "**No published Court of Inquiry was located; the Ministry's releases and the Tribunal record retrieved carry none**" |
| L-0116 `summary` | "No written order, circular or SOP … **has ever been published**" | "**No written order, circular or SOP was located in the J&K Police and Home Department material retrieved**, and on the police's own account none exists" |
| L-0116 `whatHappened` ×2 | "no published…" | "**none was retrieved**" |
| L-0116 `caveat` | "no published…" | "**no reconciling figure was located in the sources retrieved**" |
| L-0118 `caveat` · `jk-organised-stone-pelting` `caveat` | "**no body has ever defined** 'organized'" | "**no definition of 'organized' appears in any NCRB publication or Ministry reply retrieved**" |
| L-0144 `differentFactsNote` | "is not published, and **the only figure that exists**" | "**the only figure located**" |
| L-0148 `caseAgainst` | "**has never been published, because nobody publishes** what fraction" | "**was not located in any of the sources retrieved, none of which publishes** what fraction" |
| L-0166 `caseAgainst` | "**The only cumulative figure that exists**" | "**The only cumulative figure located**" |
| L-0168 `caseAgainst` · `assessmentNote` | "the order itself **has never been published**" | "**the order was not produced in Parliament and no published copy was located**" — the Union's non-production is the checkable fact and the record already has it |
| L-0175 `caseAgainst` | "**the only party that states** the figure" | "**the only party located stating** the figure" |
| L-0224 `caseAgainst` | "**the only stock figure the strategy offers**" | already scoped to the strategy document — **leave** |
| P-101 `bridgeNote` | "**is the only place** the quantity appears" | "**is the only source located** carrying the quantity" |
| P-113 `bridgeNote` | "**nobody publishes it**" | "**no publication of it was located**" |
| P-114 `bridgeNote` | "The order itself **has never been published**" | as L-0168 |
| `tn-direct-goi-transfers-to-sias` `notes` | "**appears in neither government's own account**" | "**appears in neither government's account as retrieved**" |

**Three of the 21 need no change** — L-0115's Army sentence and L-0224's are already scoped to a
named document, and one L-0116 sentence is about an inquiry's inertness rather than publication.
**The pattern in every rewrite is the same and it is one word: `exists` → `located`, `published` →
`retrieved`, `nobody` → `no source retrieved`.**

---

# BATCH 12 — BOTH PASS-B REVIEWS, RE-WEIGHTED. 2026-08-06

**No verdict moved, no tier changed, no record touched.** One operator ruling written into two texts.

## 0. STANDING CONVENTION, and the failure that earned it

**External reviews land in `review/returned/` and nowhere else.** Three rounds arrived in
`~/Downloads`; the Gemini pass-B review was there as `gemini.docx` — **not `gemini.doc`** — and batch
9 searched, did not find it, and **triaged the round as one review, weighting every finding
single-source.** Both are now committed with `.txt` extractions, named
`pass-<pass>-<family>-<date>`, and pass A's files are renamed to match.

## 1-2. THE CONVERGENCE MATRIX — and it corrects the brief on three counts

Tested each finding against all four returned reports mechanically:

| finding | A-chatgpt | A-gemini | B-chatgpt | B-gemini | families |
|---|:--:|:--:|:--:|:--:|:--:|
| **L-0026 against the `partly` definition** | ✓ | ✓ | ✓ | ✓ | **2** |
| **L-0207's `worked`** | ✓ | ✓ | ✓ | ✓ | **2** |
| **`too-early` on L-0188 and L-0205** | ✓ | ✓ | ✓ | ✓ | **2** |
| **`not-published` without a stated search** | — | ✓ | ✓ | ✓ | **2** |
| **`worked` thin sourcing, the same eight** | ✓ | ✓ | — | ✓ | **2** |
| **method-text desync** | ✓ | ✓ | — | — | **2** |
| statutory double standard, the nine | — | ✓ | — | ✓ | **1** |
| no `worked`/`failed` in governance etc. | — | ✓ | — | ✓ | **1** |
| L-0092 · L-0114 | — | — | — | ✓ | 1 |
| L-0226 incommensurable · tier ladder | — | — | ✓ | — | 1 |

**Three corrections to the brief, all measured:**

1. **The statutory double standard is NOT cross-family.** Both Gemini reports name the same nine
   records; **neither ChatGPT report mentions a single one of the nine** — zero occurrences of
   L-0095, L-0106, L-0108, L-0162, L-0094, L-0122, L-0154, L-0164 or L-0167 in either. It is one
   family finding the same thing twice, which is repetition, not independent convergence.
2. **"No `worked`/`failed` in governance" is likewise Gemini-only, both rounds.**
3. **The brief omits the most convergent finding in the entire set. `L-0026` against the `partly`
   definition appears in ALL FOUR reports** — both families, both rounds.

### The re-weighting that matters

**Batch 9 overturned batch 7 on L-0026 while recording it as single-source.** It is the opposite:
**four reports, two families, two rounds.** The overturn was right and was under-weighted, and
`L-0026`/`L-0029` now carry the strongest evidential support of any finding in the decision set.

**Six findings are cross-family** (the five above plus method desync). **Two are single-family-repeated**
— which is weaker than cross-family and stronger than single-report, and the decision set should
carry that as a third tier rather than collapsing it into either.

## 3. THE TWO UNTRIAGED GEMINI FINDINGS

### L-0092 — CONFIRMED as a vocabulary gap; the record concedes it in terms

Gemini: scoring a presentational act `contested` equates data manipulation with a précis reading and
creates false balance.

**The record's own `assessmentNote`:** *"The assessment vocabulary is built for measures with stated
objectives and **this record is a presentational act**. `contested` is used on its written definition …
**The value may change on review if a value for presentational findings is added.**"*

**So `contested` is technically correct and substantively a placeholder, and the record says so.**
L-0092 is also **one of the two records deliberately left without a `contestedGround`**, on exactly
the ground that `contested` is standing in for a value that does not exist. **The corpus flagged this
before the reviewer did and shipped it anyway.** Gemini's contribution is naming the effect on a
reader: a `contested` verdict reads as *the evidence is balanced*, and here the record's own
`caseAgainst` is not balanced — *"a leap manufactured by deleting the peak"*.

**Classification: CONFIRMED, vocabulary gap, and it belongs with the `commitmentState` question rather
than with the verdict corrections** — both are the same defect, a value used because no accurate one
exists.

### L-0114 — the named charge is DEFEATED; a different one in the next field is CONFIRMED

Gemini: the caveat *"attempts to bound the frame to 'Union government publication' to preserve the
claim"*, but the J&K Chief Minister published 6,221 pellet injuries 26 days before MHA's refusal.

**The caveat is not a device to preserve the framing — it is the CORRECTION of exactly that
overclaim, dated 2026-08-05, before the review:** *"the summary previously read 'the only pellet
quantity any government has ever published'. **That was contradicted by this record's own next
field**, which reports the Jammu and Kashmir Chief Minister giving 6,221 injured by pellets …
**Restated to what was located, in a Union publication.**" **The reviewer read the corrected wording
and described it as the manoeuvre the correction had just undone.**

**But reading past the caveat, a live defect is there — in a different field.** The `assessmentNote`
says: *"**the state** holds the measurements for both sides of its own trade-off, publishes the term
favourable to it and **refuses the term unfavourable to it**."* **The record's own `whatHappened`
reports a state government publishing the unfavourable term.** If "the state" includes the J&K
government, the assessmentNote is contradicted by the record's own account.

**Classification: the caveat charge DEFEATED; the `assessmentNote` charge CONFIRMED.** The reviewer
found a real defect while mis-locating it — the summary was fixed and the note was not.

## 4. THE MULTI-OBJECTIVE SWEEP — L-0048 IS THE WRONG CONTROL, AND L-0012 IS THE RIGHT ONE

**Eight records state multiple announced objectives in their own notes.** Not three, and not a rule
nobody follows:

| verdict | n | records |
|---|---:|---|
| `partly` | 5 | L-0012 · L-0017 · L-0048 · L-0062 · L-0093 |
| `failed` | 1 | L-0016 |
| `worked` | 2 | **L-0026 · L-0029** |

**L-0048 is not the same structure as L-0026 and the reviewers' comparison is imprecise.** L-0048:
*"ONE IS MET AND THE OTHER IS **MEASURED AND NOT MET**"*. L-0026: one met, the other **NOT
ESTABLISHED** — not measured at all. **A limb measured and failed and a limb never measured are
different situations**, and any rule has to say which one bears on the verdict.

**L-0012 IS the clean control, and it is decisive.** *"FOUR THINGS WERE PROMISED AND THIS RECORD
MEASURES TWO. Measured: revenue, which grew to a record ₹22.08 lakh crore … and the registrant base,
which passed 1.51 crore. Not measured here: revenue BUOYANCY …"* — **two measured limbs, both
positive, two unmeasured, and the verdict is `partly`.**

**L-0029 is the same shape: *"THREE OBJECTIVES WERE ANNOUNCED; TWO ARE MEASURED AND MET, AND THE
THIRD IS THE ONE THE CASE AGAINST IS ABOUT."* Two measured and met, one unmeasured — and the verdict
is `worked`.**

**So the corpus counts unmeasured limbs against the verdict in L-0012 and does not in L-0029, on
identical structures.** L-0016 shows the same question on the other side: two targets, one measured
and decisively missed, and it goes `failed` rather than `partly`.

**The finding restated, and it is different from the reviewers' version and from batch 9's:** it is
not that three records break a rule. **It is that no rule exists for how an unmeasured announced
limb bears on a verdict, and the practice is inconsistent — 5 records treat unmeasured limbs as
disqualifying a definitive verdict, 3 do not.** That is a vocabulary defect, not three bad calls, and
it means **fixing L-0026 and L-0029 alone would leave the inconsistency in place.**

## 5. THE MIRROR RULING, WRITTEN IN

**Written verbatim into `CLAUDE.md` and into the ladder's own text in BOTH schemas, byte-identically
(checked).** Two schema DESCRIPTION edits, 1 insertion / 1 deletion each; no property, type, enum
value or validation rule touched.

> **Grade the document, not the server.** Identical bytes ARE the document. An ACCOUNT of a document
> is T4. The line is between holding the artefact and holding somebody's description of it, not
> between which server sent the bytes. **Record the retrieval path with the citation**, and **where
> the original no longer resolves, record that beside it** — a publisher's deletion is evidence about
> the publisher, not about the evidence.

### Which citations change class

| | n | under the ruling |
|---|---:|---|
| band E — mirror, identical bytes (Bar and Bench, `internetshutdowns.in`) | 5 | **stay T1 — settled** |
| `web.archive.org` citations | **65** (63 T1) | **stay T1 — the ruling protects them** |
| band A — an ACCOUNT of a document | 7 | **→ T4**, confirmed not changed |
| band B — multilateral | 5 | → T2, unaffected by this ruling |
| band C — self-citation | 3 | no class, unaffected |
| band D — foreign government primary | 19 | **NO CLASS EXISTS. The ruling explicitly does not reach it** |

**CORRECTED T1 RANGE: 931–950, against a published 965.** The ruling **removes the 926 floor** — band
E was the only thing between 926 and 931 — and **the sole remaining variable is band D**, which is a
missing class rather than a mis-tag. **Nothing re-tiered.**

## 6. QUESTION (b), AS IT NOW STANDS

**The floor is not the question, and the counting made it look like one.**

> **Does `worked` require evidence independent of the announcing body?**

**The facts the decision rests on:**
- Nine `worked` records. **Thirteen ledger citations: T1×12, T4×1.**
- Eight of nine resolve `seriesRefs`, and **every resolved series is also T1** — so the second layer
  adds volume and not independence.
- **L-0014's single T4 is the only non-government citation in the entire `worked` class**, and it is
  the record ChatGPT attacks for resting on a proxy.
- A ≥2-citation floor moves 7 of 9 — **but if a resolved series counts as corroboration it moves
  ZERO**, because all seven single-citation records have one.

**So a count-based floor cannot express the question.** It either moves everything or nothing
depending on whether series count, and neither setting tests independence.

**The three answers and what each commits the instrument to:**
1. **No — one official source can establish `worked`.** Then the instrument must publish that a
   success verdict may rest entirely on the announcing body's own account, and the reviewers'
   finding stands as a disclosed property rather than a defect.
2. **Yes, for `worked` only.** A deliberate asymmetry: a higher burden for agreeing with the
   government than for disagreeing. **Defensible, but it must be published as such** — a reader who
   finds it unstated will read it as bias in the other direction.
3. **Yes, for every definitive verdict.** Symmetric, and it moves 4 `failed` records too — including
   L-0030, where one authoritative statement that no PSB was privatised is not weak evidence but the
   right evidence.

**Question (b) is answerable now. It does not wait on the tier audit** — no `worked` record carries a
disputed citation — **and it does not wait on question (c)**, which is about band D alone.

---

## WHAT HAPPENED AFTER THIS PHASE CLOSED — read this before treating anything above as current

Phase 15 closed 2026-08-05 with no open items. The cycle that followed authored no records and
changed what a record has to prove. **Nine records said `worked`; one does.** Question (b), left open
at the end of this file, was answered: **yes, `worked` requires evidence independent of the
announcing body**, with a further test for evidence from one arm of the state about another.

**Everything about that cycle is in [`drops/cycle-review-and-rulings/STATE.md`](../cycle-review-and-rulings/STATE.md).**
Start there, not here, for anything after 2026-08-05.

Two records authored in this phase moved in that cycle: **L-0221 and L-0222 are unchanged**, but
**L-0052 (renewable capacity) fell from `worked` to `partly`** on the unmeasured-limb rule — the
capacity-against-generation gap this phase's whole arc was about is the limb that bars the verdict.
The arc's spine sentence above is now the reason a verdict moved, which is the strongest thing this
phase produced.
