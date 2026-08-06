# CLAUDE.md — India Roadmap Instrument

Longitudinal research instrument: India's condition and trajectory, UPA baseline (frozen May 2014) through the Modi-era terms (T1 2014-19, T2 2019-24, T3 2024-, living). Private audience; research rigour is non-negotiable.

## Architecture
- Three data layers, all JSON in `/data`, each governed by a schema in `/schemas`:
  - **series** — indicator time series, India + peer panel (BGD, VNM, IDN, CHN)
  - **ledger** — discrete reform/event/episode records
  - **provenance** — measurement-dispute records (P-xx), first-class citizens
- Next.js, static export, deployed to Vercel. No server, no database, no auth.
- Data enters via `/data/incoming/` drops from research sessions → validate → merge.

## Non-negotiable data rules
1. **Schema validation gates every merge.** A record failing validation never enters `/data`. Build the validator as a CLI (`npm run validate`) and wire it into the build so an invalid repo cannot deploy.
2. **Never splice across a break.** Series with `breaks[]` render with a visible seam (the dual GDP series is the canonical case, P-01). No smoothing, no interpolation across breaks, no trend lines fitted through them.
3. **Status renders visibly.** `approx` and `pending` points are visually distinct from `verified` everywhere they appear. Pending never renders without a flag.
3a. **A caveat never truncates, anywhere, at any density.** `caveat` is a schema field on both the ledger and series schemas. A record carrying one would mislead without it, so it renders wherever the record appears — detail pages, index tables, domain and term pages, cited-by grids — in full, every time. No ellipsis, no clamp, no truncation to fit a cell, no hiding it behind a hover or a disclosure. A qualification cut to fit is the failure the field exists to prevent: a half-read caveat is worse than none, because it looks like the whole of it. This binds future table and density work — if a caveat will not fit a layout, the layout is what changes. Ordinary uncertainty is not a caveat and belongs in `notes`.
4. **Blanks are unreported, not zero.** Same discipline as the paper-leaks instrument.
4a. **An absence renders unlike a finding.** Distinguish a gap in the data from a gap in the world. A blank cell says "not reported this period" (rule 4); where *nothing measures a thing at all*, that is a fact about the record and often the most important thing on the page — it renders, named, rather than being left off. PMAY-G is the canonical case: sanctioned and completed are published, occupancy is not, and a reader shown only the first two would reasonably take completion for the end of the chain. Use the `Absence` mark: dashed, unfilled, no figure, no table, visibly not a panel of results. An absence styled like a finding invites a reader to treat the frame as the content, and nothing is ever estimated into the space. Expect several in infrastructure.
5. **All three GDP regimes always.** GDP growth exists on three incompatible bases: 2004-05 (as contemporaneously reported, ends FY2013-14), 2011-12 (FY2013-14 to FY2024-25), and 2022-23 (from FY2023-24, released 27 Feb 2026, P-10). No spliced back-series exists for either revision. Rules that follow from that:
   - Never present any one base alone as "GDP growth". Anywhere the regimes could be confused, all three render, in base order, with every seam intact.
   - **Overlap years carry every valid figure.** FY2013-14 reads 4.7% (2004-05 base) and 6.9% (2011-12 base); FY2023-24 and FY2024-25 each read differently on the 2011-12 and 2022-23 bases. Both figures are official and current — the instrument shows them adjacent and picks neither. A single number for an overlap year is a claim the published statistics do not support.
   - **A seam knows which side it is on.** Where one regime ends and the next begins, the same period means opposite things: FY2013-14 is the terminus of the 2004-05 base and the origin of the 2011-12 base. A seam at the end of a series renders below the last row and names its successor; a seam at the start renders above the first row and names what it supersedes; a seam mid-series renders above the row it takes effect in. A handoff is never rendered as two unrelated series.
   - When MoSPI publishes the 2022-23 back-series, it is a new record, not an edit: the regimes stay separate and the bridge is documented in provenance.
5a. **A denominator break is not a series break.** The 2022-23 rebasing lowered the level of nominal GDP by 3-4%, so every ratio-to-GDP (`fiscal-deficit`, `genl-govt-debt`, `exports-gdp`, `gfcf-gdp`) steps at 27 Feb 2026 with no change in underlying activity. Any chart or table of those spanning that date must mark it, and mark it **differently** from a series break: the seam is a solid red stop meaning do not splice, the denominator break is a dashed umber band meaning the line may continue but the values either side are divided by different things. Never render an arithmetic step as if it were activity. The marker is derived, not stored — a series qualifies when its unit is a ratio to GDP and it carries the restating provenance record — so no schema change is needed and none was made.
5b. **An NPA ratio never renders alone, and never without its basis.** Two banking rules, both structural:
   - **The write-off adjustment is always offered** (P-17). The fall from the 2018 peak mixes genuine recovery with write-offs (₹16.6 lakh crore gross, ~16% recovered) and with a denominator expanded by credit growth. Any view of `scb-gross-npa` or `psb-gross-npa` carries a toggle to gross NPAs plus cumulative write-offs over the same denominator. Where an input is missing the adjusted view says so and shows nothing — an adjusted line on an assumed denominator overstates the cleanup exactly as the reported ratio does.
   - **The reporting basis is stated wherever the figure appears** (P-18). Domestic and global operations are different populations: the 2018 peak is 14.58% (PSB, global) or 11.46% (SCB, domestic). Series on different bases never share an axis, and a series that states no basis renders as "basis not stated" rather than being assumed onto one.
5c. **A derived quantity inherits its inputs' contests.** Any ratio, percentage, share or per-unit figure whose numerator or denominator appears in a `differentFacts` pair carries the divergence forward as a RANGE with each bound attributed to its source — or is not stated at all. Picking one side silently converts a recorded disagreement into a settled number, and the record that carries the pair is precisely the one a reader trusts not to do that. **Arithmetic hand-checking cannot catch this class and neither can any gate**: both computations are correct in isolation, each against its own input, and the defect is only visible by asking where the input came from. L-0200 is the first identified instance — thirteen emergency-procurement contracts stated by the Ministry of Defence at ₹1,981.90 crore in June 2025 and ₹1,958.80 crore in December, against a ₹2,000 crore outlay, giving 99.1 or 97.9 per cent committed depending on which total is used. State the range and say why the range exists, distinguishing a contested numerator from an uncertain denominator; where the range is too wide to support the argument being made, the argument is what changes.

5d. **A claim about what EXISTS is not a claim about what the SOURCES CONTAIN, and only the second is checkable.** "No explanation is available", "no other body publishes this", "this is the only case" — each asserts something about the world that no retrieval can establish, because retrieval bounds what was found and never what there is. Rewrite as the observation actually made: *the documents retrieved contain no explanation*, *no other publisher was located*, *this is the only case in the corpus*. The rewrite is not hedging; it is the difference between a statement a later reader can test against the same sources and one they cannot test at all. **Writing a finding from zero primaries produces a record about my search, not about the world** — the same failure at full strength, and it is at its most tempting when the absence looks obvious. Arc G's UNSC advocacy was closed with no record on exactly this ground: nothing retrieved stated the advocacy as a commitment with a trigger, and a record saying so would have documented the search.

**Superlatives are the loudest symptom and not the only one.** The class also covers a bare "unexplained", an "unprecedented", and any negative existential smuggled in as background. **The test is mechanical: could a single document, if it turned up tomorrow, falsify the sentence without any figure in the record changing?** If yes, it is a claim about existence and must be re-grounded on what was searched, where, and what was found.

Caught in cycle 2026-08-04o. L-0200 said same-publisher divergence had "no equivalent explanation available", when a post-signature revision, a tax-basis difference or a redrawn subset all fit and ₹23.10 crore is 1.17 per cent of the total — one revised contract's worth. It now rests on a property of the documents: the later one acknowledges no revision and does not contain the earlier figure. **Ordinary explanations being available is compatible with none being published, and the record must say which it means.**

6. **Tier tags travel with claims.** Any rendered number can be traced to source name, URL, tier. T5 (contested indices) always carries a dispute record covering its own domain, so a contested number never renders without the dispute — P-08 for the governance indices (RSF, Freedom House, V-Dem), P-29 for the Global Hunger Index. The rule is "its dispute", not "P-08": naming one record was right only while every T5 series was a governance index, and demanding P-08 of a human-development index would require a reference the relevance check forbids.
7. **Peer panel vintage discipline** (P-09): panel values carry `source.vintage`; UI shows the vintage date on peer views.
8. **Counterfactual views show both methods** (UPA-trend extrapolation AND peer-index normalisation, 2014=100) and show endpoint sensitivity for trend fits. No composite score of any kind, ever.
9. **English only; no title counts** — n/a here, but: no aggregate "verdict number" for a term or for the government. Scorecards roll up to counts of assessments, not to a grade.

## Research and verification discipline

Every rule here was earned by a defect that got through. None is a precaution against something
imagined. **A rule earned mid-batch is written into this file in the same commit that earns it** —
otherwise it lives only in a verification-log entry and in the head of whoever was working, and the
next cycle silently drops it. A phase-14 audit found 23 of 28 standing rules present nowhere but the
log. **And a rule that names a tool as the only sanctioned path requires that path to exist at
the moment the rule is written.** Batch 13 wrote "every scan of retrieved text goes through the
corpus-search helper" while the helper could read nothing but `/data` — an unfollowable instruction
that reads exactly like a control, and would have been cited by a later cycle as though it had held.
Build the path in the same commit, or write a weaker rule that is true.

**Rule 1 — read at the moment of quoting.** Record text is read from `/data` in the same operation
that quotes or edits it. Never reconstructed from memory, never carried forward from an earlier
read. Anchor every prose edit on a string read in that operation and abort if the string is absent.
Detect indentation from the file being written; do not assume it.

**Rule 3 — a document is a source only if it was retrieved in this run.** An unretrieved URL is not
a source. **A 200 serving a JavaScript shell is not a retrieval** — check that the body contains the
document, not just that the request succeeded. **OCR output is not the document**: it may locate a
passage, but a quote drawn from it is tiered as OCR, not as the instrument.

**M1 — a reachability failure is retested from a second process, with both resolver and client
varied, before it is recorded as an environment fact.** Expect a meaningful fraction of URLs to need
the fallback. Known environment facts, not to be re-derived: `mod.gov.in` and `ddpmod.gov.in`
resolve and refuse port 443; `pca-cpa.org` is Cloudflare-gated; `mea.gov.in` serves a JS shell;
`federalregister.gov` CAPTCHAs full-text endpoints while its API works. Hosts needing an explicit
resolver: `ppac.gov.in` 164.100.198.160, `mea.gov.in` 13.224.236.14, `www.pib.gov.in` 94.202.207.57.

**M2 — a write is verified by diffing `/data`, never by the writer's own count.** Declare the
expected diff shape before the edit — keys added, line delta — and abort on mismatch. A non-zero
report with an empty or wrong diff is a failure, not a success. **A JSON round-trip is not a safe
way to edit a file whose formatting you did not choose**: four whole-file reformats were caught this
way, each reported clean by the script that caused it.

**A correction guard asserts a presence, never an absence.** When a record is corrected, the
withdrawn wording survives in the sentence that records the withdrawal — that is the form every
correction in this instrument takes, because stating the change inside the record is what
distinguishes a correction from a silent edit. **A guard that forbids a token therefore fails on a
correctly corrected record.** Assert the specific string in its specific context — "the withdrawn
phrase appears exactly once, inside the sentence beginning CORRECTED" — not that it is gone. Caught
in cycle 2026-08-05b, where a guard demanding the absence of "binding" aborted an edit that had
correctly withdrawn the word and said so.

**The system resolver on this machine is broken — pin before recording any host as unreachable.**
Government hosts return HTTP 000 to a plain `curl` and resolve normally under
`dig +short @1.1.1.1`; `curl --resolve host:443:<ip>` then works. Correction cycle 1 measured ten
live government hosts as unreachable, including `pib.gov.in`, from which that same session had
retrieved dozens of documents. This is an ENVIRONMENT FACT, not a finding about the hosts, and
writing it up as one would have been the class-of-sources error committed in the cycle that audited
for it. Known pins live with the retrieval notes; add to them rather than re-deriving.

**A claim about a CLASS of sources is tested by varying the host, not by accumulating failures
within one.** Two failed retrievals from the same domain are one observation, not two. Before
writing "sources of kind X are unavailable", retrieve something of kind X from a DIFFERENT
publisher; only a failure that survives the change of host is a fact about the class. Phase 14 came
one step from recording that neighbourhood policy primaries were unretrievable, on two MEA failures
in a row; the next country was taken specifically because its route was RBI rather than MEA, and it
retrieved on the first attempt. The real finding was four words narrower — MEA is the blocked
channel — and it reopened two countries that the broader claim would have closed. **The wrong
generalisation suppresses records silently and looks like diligence**, which is why it needs a rule
and not a resolution: nothing downstream fails, the corpus is simply smaller and no gate can tell.

**Any scan of retrieved text goes through `tools/lib/corpus-search.mjs`** — `scanText`, or the
`node tools/scan-text.mjs <file> <term>...` runner. The word-boundary default only ever protected
scans that went through the helper, and until batch 14 the helper could read nothing but `/data`,
so every scan of a fetched page was ad-hoc BY CONSTRUCTION. One of them matched `fenc` inside
**"Fengal"** — the cyclone — in the document being checked for whether a ministry reported any
fencing progress. That is the fourth substring false positive of the phase and the first that would
have produced a POSITIVE finding: a spurious hit in a document checked for an absence converts an
established absence into a fabricated presence, and nothing downstream would have contradicted it.
`--substring` remains available and is printed in the output when used, so the opt-out is visible
rather than silent.

**A zero from a boundary scan is retried with morphological variants before it is banked as an
absence** — `node tools/scan-text.mjs <file> <term> --variants`, which scans plural, singular and
hyphenation forms and prints a loud line when the base term scored zero and a variant did not. A
scan for `Official Creditor` returned 0 on a document reading "Official Creditors' Committee",
because `\b` after `Creditor` fails on the following `s`; it was caught only because the phrase
happened to be visible in another term's context window. **Boundaries produce false negatives
exactly as substring matching produces false positives.** The default stays where it is — a false
negative costs a missed candidate, a false positive costs a fabricated finding — and the retry is
what makes the safe default affordable.

**Bound a search by the record, never by a character count.** `t[i:i+9000]` from a record's id
missed L-0110's SATP source because the record is longer than the window. A fixed-size window over
variable-length records is a silent-miss generator: it finds the anchor on short records, misses it
on long ones, and gives no sign which happened. Bound the span from the record's id to the next id.
That failure was loud only because the code asserted instead of skipping — write anchors that abort,
never anchors that shrug.

**`record.get(field) or []` renders an ABSENT field and an EMPTY one identically, and they are not
the same fact.** An empty array says the author looked and found nothing; a missing key says the
question was never asked. L-0072 carried no `unmeasured` key at all while a read printed `[]` for
it, and any sweep written for empty-but-present would have skipped it silently. Test `field in
record`, print which case it is, and let an anchored edit ABORT rather than create a field it has
invented.

**Verification and commit go through `npm run commit`, not through the shell.** The rule below has
been broken by its own author four cycles after it was written — a `;` where an `&&` belonged let a
commit run against a build that had already printed INVALID, and the corpus was pushed in a state
the gate had refused. `;` and `&&` are the same keystroke effort and the shell gives no sign which
was meant, so the ordering is not left to the shell: `tools/verify-and-commit.mjs` runs the gates
and reaches `git commit` only on green, takes its message from a FILE rather than argv, and has no
flag that skips a gate. **A rule that is right and keeps not being followed is a mechanism problem.**

**Run record edits and their allowlist deletions as ONE chained operation.** Cycle 8 ran them as
newline-separated commands; the edit aborted and the deletion ran anyway, leaving `/data` holding
four bare roots the allowlist had already dropped. Only the ratchet's new-direction check caught it.
Two writes that must agree are one operation, and shell newlines do not enforce that — `&&` or a
single script does.

**Search the NOUN that cannot be paraphrased away, not the assertion around it.** One false claim —
that a single figure was the only pellet quantity any government had published — existed in three
phrasings across five records, and each search found only the phrasing it was written for:
`any government has ever published` found two, `any government has published` found a third,
`in the public record` found two more. Only `only pellet quantity` surfaced all of them. A claim
propagates in the author's own paraphrases, and the assertion is what gets rewritten while the
subject noun survives. Search the subject.

**When verifying a claim about state you have just modified, verify against the state as it was when
the claim was made.** A check of whether every record from L-0001 to L-0024 lacked an
`assessmentNote` returned FALSE, and was one step from being written up as a correction — it returned
false because one of those records had been filled twenty minutes earlier, by the same session. The
control was measuring its own edit. Same shape as `url-check` reporting "0 to check" after the push
it was meant to check. Re-read the claim's own timestamp before trusting a re-run.

**A tier moves only when the EVIDENCE moved, and the merge asserts which direction.** Not "never
move a tier" — move it when the stated reason for the tier no longer holds, and prove which case you
are in before writing. P-80 moved T4 to T3 because its stated reason, "the paper itself was not
opened", had stopped being true once the abstract was retrieved and every cited figure matched.
P-86 stayed T4 in the same sweep because its stated reason — the operative text unretrieved — still
held, and a working URL had changed only the URL. The four SATP citations stayed T4 for a third
reason: retrieval improved, the SOURCE did not, and the recorded figures still derive from the
archive snapshot rather than the page now reachable. **Same mechanical assertion in the merge, with
the expected value chosen deliberately in each case.**

**Sweep by self-documented failure, not by host count.** A record whose source name already states
a retrieval failure has isolated the missing variable: the gap is specified rather than searched for,
so closing it is the cheapest work available. Scanning for that language turned up 22 such citations
and produced, in two cycles, one closed Gazette gap, one paper identified by PMID with every figure
matched, and live hosts for most of the rest. Note the scope trap in the method itself — the first
scan matched "not retrieved" and reported eight; widening it to "relayed", "could not", "no
response" and HTTP codes returned 22, and some of those are false positives that say "Retrieved
directly and read". State the pattern beside the count.

**A finding produced by a correction cycle gets the same scrutiny as the finding it corrects.** A
correction arrives with the authority of having just fixed something, which is exactly why it is the
least questioned thing in the room. The phase-14 audit's tier error was corrected in cycle 1 — and
that same correction invented a 99-strong "untiered" class that does not exist, which cycle 2's brief
then inherited unchecked. Cycle 2 in turn flagged a 42 per cent value defect in
`gdp-per-capita-usd`, which cycle 3's brief inherited, and which also does not exist: that series
alone lists countries alphabetically, so `points[0]` is Bangladesh. **Three consecutive cycles
each produced a false finding while fixing a real one.** Re-derive a correction's own claims before
building on them.

**An identification is not established by a match at ONE point. Match every point the record
carries.** Correction cycle 2 attached a WDI indicator to `credit-gdp-peer` on a 0.74 per cent
agreement at 2014 and rationalised the second point away as a vintage revision; the second point was
32 per cent out and destroyed the identification. One agreement is a coincidence with a plausible
story attached. Where a record carries a panel, check the panel: it was checking all ten cells that
showed India's 2024 figure to be the single divergence, three of the other four matching WDI within
about one per cent.

**A PARTIAL match is more dangerous than no match.** No match prompts a search; a partial match
prompts a theory, and the theory then explains away the part that does not fit. Bangladesh's 2024
GDP-per-capita sitting within 0.05 per cent of India's produced the coherent false pattern "2024
agrees, 2014 is 42 per cent out", which reads exactly like a currency-basis problem — and a brief was
written instructing that the 2024 agreement was "the constraint any explanation must satisfy". The
constraint was an artefact of reading the wrong row.

**READ THE LABEL BESIDE THE VALUE.** Five iterations of one error in four cycles: `tier` read
without `name`; `tier` looked for inside `source` when series carry it on the record; `points[0]`
read without `country`; and a record's `notes` — which said in terms "World Bank has not extended
India's series past 2020", answering the question the cycle was asking — not read at all. The next
instance will be a different field, so the rule is not about these four: **before concluding from a
field, read the record.**

**When an identification could be GUESSED correctly, match it against the record's own value
instead, and record the query in the source name.** WDI indicator codes are guessable from an
indicator's name, which is what makes assigning them from memory feel safe and makes it rule 3.
Fetch the candidate, compare it to the figure the record already publishes, and write the query and
the returned value into the citation so a later reader re-runs the identification rather than
trusting it. Where the match fails, say so IN THE RECORD and attach no identification:
`credit-gdp-peer` carries "THE INDICATOR IS NOT ESTABLISHED" for that reason.

**A FIELD VALUE is no more a finding than a count is.** Context-before-count extends to any single
field read without the fields beside it. The 2026-08-05 audit judged a source's tier from the `tier`
field plus the host name, without reading the `name` field next to it, and accused two records of a
tier misassignment when they were citing a **government order** that a civil-society site re-hosts —
applying the rule the audit accused them of breaking. The correction then repeated the error one
cycle later: it reported "99 citations with no tier at all" because the detector looked for `tier`
INSIDE the object holding `url`, and on series the tier sits on the record. All 99 carry a tier. **A
field is a fragment of a record, and a fragment read alone misleads exactly as a count does.**

**A detector's scope silently defines the size of its finding, so state the scope beside the count.**
Filtering on `tier == 'T1'` reported 141 bare-domain roots where the real figure was 313, and
because the filter excluded them, the report never mentioned the group it had hidden. A count with
an unstated scope is not conservative — it is wrong by an amount nobody can see, including the
author. Say what was searched, not only what was found.

**WHERE AN AXIS IS STORED IN MORE THAN ONE PLACE, THE UNION GOES IN `lib/data.ts` WITH THE COST OF
GETTING IT WRONG WRITTEN BESIDE IT, AND NOTHING COUNTS THAT AXIS BY HAND ANYWHERE ELSE.** `tier` is
asserted INSIDE each `sources[]` entry on ledger and provenance and ON THE RECORD for a series, whose
`source` is a bare `SourceRef` carrying no tier at all. A count that reads one site sees a corpus
missing the other, and the miss is silent in the worst direction: `series.source.tier` is
`undefined`, which tallies as *untiered* rather than raising anything. That is how `/method` came to
publish "752 of 1,205 citations are T1" when the figure is 965 — 752 is exactly ledger plus
provenance with all 269 series dropped — and to describe 213 official statistical sources as
journalism. Closed by `citations()` and `tierCounts()`, which are now the only sanctioned way to
count a citation.

**TYPESCRIPT CANNOT CATCH THIS CLASS AND IT IS WORTH KNOWING WHY.** It objects when two same-named
fields have different TYPES; it is silent when they have the same type at different DEPTHS. `tier:
Tier` on `Series` and `tier: Tier` inside `TieredSource` are both legal reads and nothing
distinguishes "the tier of this series" from "the tier of this citation" — the defect is a
SET-CONSTRUCTION error, not a type error, so the fix is an accessor and a comment, never a signature.
The near-miss proves the rule: `status` is split worse (two enums, two depths, two layers, one name)
and has never once misfired, because its two values have different types and the compiler refuses the
confusion. **Second instance of the pattern, not the first** — `ledgerUnderLens()` already unions a
lens read from `lenses[]` and from the legacy `domains[]`, with the count that would otherwise be lost
written into its own header. Two instances is enough to make it a rule. **The next candidate is the
domain axis**, which has three shapes and a fourth name, and where `provenanceInDomain` carries an
`'all'` branch the other two readers do not — a unification that forgets it drops every
filed-against-every-domain record silently, and that would not be a type error either.

**A NON-ZERO count is a candidate list, not a finding, and the context is read before the count is
banked.** The number returned reads like an answer and is not one. DPIIT's Year End Review 2025
returns twelve hits for `corridor` in a document being checked for IMEC, and every one of them is
the National Industrial Corridor Development Programme — a domestic scheme sharing a word. Banked
as a count it would have supported the opposite of the true finding. **No scanner catches this**:
the term matches, the boundaries are correct, the variants are irrelevant. Only reading the
surrounding text does, which is why `scanText` returns contexts and not just totals.

**Boundary matching is meaningless beside a punctuation character, not merely strict.** A scan for
`%` returned 0 on a document whose headline read "30%", because `\b` after `%` demands a word
character on both sides of a position where neither is one — the scan reported an absence that
could never have been a presence, which is the worst shape a scanner can have when absence claims
are built on zeros. `matcher()` now attaches each boundary only where the adjacent character of the
TERM is a word character, and `whole` additionally forbids a trailing hyphen, since `\bduty\b`
matches "duty-bearing" by design and an exact-token search should not.

**A zero from a document that predates the question is not an absence, and it looks identical in the
count.** Before recording an absence, check that the document could have contained the thing: a
series ending January 2023 says nothing about an arrangement that would first appear in 2023-24, and
a zero from it establishes nothing at all. This is distinct from a CHECKED absence, where the
document is the natural place, covers the period, and does not carry the item — which is what makes
`not-published` assertable. Godda is the standing instance: the count has been zero across every
document scanned in two cycles and no absence has been claimed, because the measured series stops
before the question becomes answerable.

**Assert per record, never sweep.** A keyword or pattern search generates CANDIDATES; the judgement
is made per record and written down per record. Three substring sweeps in one phase produced 59, 197
and 7 false candidates respectively. **Word boundaries are the default** in corpus search
(`tools/lib/corpus-search.mjs`); `substring: true` is the explicit, reviewable opt-out.

**Observe the effect, do not match the spelling.** Where a property can be observed, observe it. A
static scan for `writeFileSync` missed the only mutating gate because it shelled out to `touch`; a
grep for top-level `build()` calls would encode a belief about how a side effect looks. Import the
module and look at the disk.

**Every negative control needs a same-form positive that passes THROUGH the restriction the negative
depends on.** A check reporting clean with no positive beside it proves the needle absent, not the
search working. If the negative depends on "mentions China", the positive must also mention China.

**A NEGATIVE CONTROL ASSERTS AGAINST A STRING READ FROM `/data` AT THE TIME OF WRITING, IN THE
CONTEXT IT APPEARS IN.** Never a needle typed from an idea of what the record says, and never a bare
"this token must be absent". Two failures in two batches, both of them controls written from a
memory of the record rather than from the record:
- **Needles from memory.** Two deployed-page checks failed against pages that were rendering
  perfectly, because the record said `FUSES` in capitals where the needle was lower-case, and
  `Incapsula WAF stub` where the needle omitted the WAF. The pages were right and the controls were
  wrong, which is the worst direction for a control to fail in — it sends someone hunting a
  rendering bug that does not exist.
- **A bare absence assertion against a correctly corrected record.** A check asserted that `28.84`
  must be ABSENT from a page where it correctly appears **inside the sentence that withdraws it**.
  This file already documents that shape — *"a guard that forbids a token therefore fails on a
  correctly corrected record"* — and it was written anyway, because the control was composed from
  the intent ("the old figure is gone") instead of from the text.

**The mechanical form: read the value from `/data` in the same operation, assert it in its
surrounding sentence, and COUNT OCCURRENCES.** "28.84 appears exactly once, inside the clause
beginning `that construction gives`" is checkable and survives a correction; "28.84 is absent" is
neither. The same rule is why `tools/field-render-audit.mjs` derives every needle from the record
rather than carrying a list.

**Every zero result is confirmed by relaxing one restriction at a time until it goes non-zero — the
restriction that flips it is the finding.** A zero that stays zero under full relaxation is the only
citable zero. Record which relaxation flipped it.

**No new bare-domain roots.** Deep-link every source. T1 on a bare root is worse than T4: it asserts
primary strength for a citation that retrieves nothing. Partner-side and multilateral sources are as
citable as domestic ones and often more retrievable — tier them honestly, by the document actually
retrieved rather than the institution behind it.

**A publication choice is not a retrieval failure.** The test: could a better retrieval technique
produce the figure? For a Cloudflare gate, a JS shell, a textless scan or a refused port — yes in
principle; the document exists and the channel failed, and that is retrieval-capability material.
Where the documents retrieve perfectly and the content simply was not published, it is ordinary
corpus material and belongs to its subject arc.

**AN ABSENCE-OF-PUBLICATION CLAIM REQUIRES A STATED SEARCH, AND TRYING GUESSED IDENTIFIERS IS NOT A
SEARCH.** State which of these was done, in the record: an INDEX ENUMERATED (the publisher's own
listing read and its links extracted); an ARCHIVE CONVENTION READ OFF A LIVE PAGE (a real href
observed, then varied); or NAMED ROUTES EXHAUSTED (each host and path listed with what it returned).
Absent one of those, the honest wording is **"not searched"**, not "not published".

**"Not published" has meant "not searched" three times in phase 15 alone, and each time the document
was there.** A ministry's website was dead while PIB served its documents. `L-0052` carried
`reasonKind: not-published` for the renewable generation share while CEA published tables titled
*"Monthly Renewable Energy as % of Total Electricity Generated"*. And a capacity year was recorded as
a hole "not published at any guessable URL" — true, and not a search: CEA's own index does carry only
the current month, but `npp.gov.in` mirrors the same CEA reports under a month-stamped path, the
convention was sitting in an href on a live page, and the recovered figure cross-checks to **0.04 MW**
against the other channel.

**The asymmetry is why this needs a rule rather than care.** A guessed URL that 404s produces the
same silence as a document that does not exist, and the silence is indistinguishable at the point of
writing. Guessing also fails in a way that FEELS like evidence — three 404s in a row read as
confirmation. They are three observations of a filename convention, not one observation about
publication. **`reasonKind: not-published` and `not-collected` are claims about the world and inherit
rule 5d in full; `not-searched` is not a schema value, so where that is the truth the entry says so
in its `why` and takes the weaker of the available kinds.**

**Read the previous batch's report as an adversary before starting new work.** A batch cannot
proofread its own output — it knows what it meant — but it can audit the batch before it, and that is
where most of this phase's corrections came from. **Run the checks in this order, which is by observed yield and not by ease.** Before
touching the arc:
1. **COUNTS** — every count reconciled against the gate's own emitted scope, at that batch's own END
   commit. Mid-batch gate runs are the specific trap.
2. **ATTRIBUTIONS** — what a delta is said to consist of, checked against what actually changed.
3. **SCOPES** — every figure traced to the gate that emitted it, and named. A figure no gate emitted
   is a fabricated scope even when it is true, and it is invisible to every consistency check there is.
4. Every state line in `STATE.md` matched against the resolution recorded below it.
5. No verdict contradicted by its own note; no claim resting on a premise the same report undermines.
6. **ARITHMETIC last.** Recompute it, but expect nothing: **the phase-15 close audit recomputed 34
   arithmetic claims across ten batches and 33 were exact, the one miss being 0.01 of a point — while
   the same ten batches carried four count-or-attribution defects, one of them an explanation
   constructed for a delta that never happened, which survived all ten.** The instrument gates
   arithmetic and gates none of the other three, and the defects follow the gaps.
Write what this finds into `STATE.md` as queue items before starting the arc, so the findings survive
if the batch dies. Earned three times over: a headline pairing a stock with a flow and stating a gap
that matched neither; a corpus count attached to a gate that had never emitted one; a `reasonKind`
correction that made a record flatly false while reasoning about which value sounded weaker. Each was
visible in the report that contained it.

**STOP and report, do not proceed:** a shipped verdict changes, or a schema, enum or gate contract
changes. **Commit the work already done and the finding to `STATE.md` first, then stop** — a stop that
discards the evidence costs the next cycle the same retrieval.

**Report at the end of the batch, keep working:** a structural finding spans phases, or the run is
about to file something it cannot fully justify. Where it cannot fully justify a filing, it files the
value that makes the fewest false assertions and states in the note which assertions that value makes
that are false.

**Everything else runs to completion:** plan, arc, self-audit, gates, commit. **Push is not autonomous
while the deployment is public and unauthenticated.**

**A flag raised against a record is checked against the RECORD, not against the report that describes
it.** Two prompt-side flags in three batches were wrong for this reason — P-127 was said to name
forest cover where the record says "forest and tree cover", and L-0225's revisit trigger was said to
be 2070 where the record already named two events and said a date revisit was not useful. In both the
report was the thing being read. **A report is a lossy summary written by the party being audited**,
and the same rule that forbids reconstructing a record from memory forbids auditing one from its own
description: open the record, quote the field, then judge.

## Session cost

Orientation is paid for at the start of every session, so it is measured and kept small.

**What a session must read:** this file (54 KB) and the phase's `STATE.md` (143 KB) — about 197 KB.
`docs/verification-log.md` is 684 KB and is **not** read whole; it is grepped for the specific
question. `/data` is 2.7 MB across 682 records and **is not read for orientation at all** — read
`docs/corpus-manifest.md` (70 KB), which is generated by `tools/gen-manifest.mjs` as a build step and
carries one line per record: id, domains, lenses, title. A hand-kept index of a corpus that grows
every cycle is stale within one cycle, and a stale index is worse than none because it is read with
the same confidence as a fresh one.

**CORRECTED 2026-08-06. Every figure in the paragraph above was stale, and the staleness is the
finding rather than the typo.** It previously read *"this file (22 KB) and the phase's `STATE.md`
(16 KB) — about 38 KB"*, with the log at 438 KB, `/data` at 2.3 MB across 645 records and the
manifest at 66 KB. Measured at `1825b85`: 54 KB, 143 KB, 684 KB, 2.7 MB across 682 records, 70 KB.
**Orientation now costs about 197 KB against the 38 KB this section was written to hold it to — five
times the budget the rule exists to enforce, and the rule read as though it were being met.** A
section that states a measurement has to be re-measured or it becomes a claim about the past
wearing the present tense; that this one is the *session-cost* section makes it the worst place in
the file for the defect to sit. **The number to act on is `STATE.md` at 143 KB**, which is one
phase's working notes read whole at every cold start; the rest is a growth curve and this one is a
structure problem.

**Gates are silent on success.** One summary line each; full detail only on failure, or with
`--verbose`. A passing `validate` used to print 190 lines, 149 of them open-research warnings
unchanged between cycles — which is how a real warning stops being read. Anything asserting on a
gate's PASSING output must pass `--verbose` explicitly; the selftest does this for `url-check`.

**Retrievals are bounded by default.** Fetch what answers the question — a targeted extract around
the passage sought — and raise the limit per document only when the document warrants it. The MoD
Year End Review is 654,000 characters; almost every use of it needed four passages.

**Author the batch, then gate.** Do not interleave a full gate run with each record. Gates are a
check on the batch, and running them per record multiplies the cost of the slowest part of the cycle
without finding anything a single run at the end would miss. Validate early only when a schema
question is genuinely open.

## Gate discipline

**Gates that read built output refuse to run against a stale build** (exit 2), and exit 2
distinguishes "no build" from "stale build" — both used to land in one silent-skip branch. The
direction that matters is the false PASS: a gate reading the previous build finds every mark it
already knew about and reports clean, and nothing in the output distinguishes that from a real pass.

**Every fixture asserts the specific failure it tests for — the branch, the message — never merely
that a failure occurred.** Two lens fixtures asserted exit 1, got exit 1, and tested the wrong branch
for two cycles while the selftest reported green.

**Generated fixtures carry `GENERATED-FROM.json` and the selftest fails on enum drift**, naming
`npm run regen:lens-fixtures` as the fix. A discipline requirement is what M2 and build-freshness
exist to replace.

**A failing check, re-run with no fix applied, must still fail.** Both assertions are required: a
fast self-repair heals before the check runs and fails assertion one; a lazy self-repair passes run
one and fails run two. **No checker imports from its own repair path** — asserted by importing each
library in a child process and requiring the fixture tree to be byte-identical afterwards.

**Any gate asserting a property of a field cites the schema.** If the property is not in the schema,
either put it there or drop the assertion.

**A GUARD BINDS A SCOPE, AND THE CLAIM IT PROTECTS HAS ITS OWN. WHEN YOU ADD A GUARD, WRITE DOWN
BOTH — what it binds and what it does not.** The gap between the two is silent by construction: the
guard passes, because it is checking the thing it binds, and the claim outside its scope is
unprotected with nothing to report it. **Three instances in one batch, all found by hand and none by
any gate:**
- `reachability` binds a LIST of marks; the claim is about every prose field on the record type.
  `assessmentNote` and `revisitTrigger` were outside the list — 226 marks invisible.
  Closed by `no-unguarded-prose-field`, which binds the list to the schema.
- `reachability`'s own `ownPage()` bound `series | ledger`; the MARKS entries admit any `layers[]`.
  Adding the first `provenance` mark made 185 records report "no page built", which reads like a
  broken build rather than a broken lookup. **The enumeration scope had leaked one level down, into
  the gate's own path resolution.**
- `breaks[]` binds a SERIES — the note renders, no line is drawn across the seam — and does NOT
  reach a DERIVED COMPARISON stated in a ledger record's prose. A widening was stated from a year
  sitting on the imputed side of a basis break, understating the opening gap and overstating the
  widening, with every gate green.

**The test is one question asked at the moment the guard is written: if the claim moved one level
out — to another field, another layer, another record, a sentence about the data rather than the
data — would this guard still see it?** Where the answer is no, say so in the guard's own header.
`tools/lib/guarded-marks.mjs` and `tools/field-render-audit.mjs` both carry that paragraph, and
`tools/seam-span-report.mjs` exists because the third instance is not closed: it reports 125 spans
of which 34 are undeclared, and 34 is a candidate list rather than a defect count, so it stays
report-only until the triage narrows it. **A deferral with a measured rate and a named next step is
a different object from a deferral that says "logged".** **CORRECTED 2026-08-06: this read 117 and
29, which is what the tool emitted at `d69c729`, the commit that wrote it.** The tool has not
changed since; the corpus has, and neither this line nor `STATE.md`'s carried item was re-run
against it. **A deferral with a measured rate has to have the rate RE-MEASURED, or it degrades into
exactly the deferral-that-says-logged the sentence above distinguishes it from** — and it degrades
silently, because a report-only tool is in no build and nothing fails when its number goes stale.
Re-run `node tools/seam-span-report.mjs` and quote it, rather than quoting this line.

**A field lands in the schema, the TYPE, a VIEW and `reachability`'s guarded-marks list in ONE
commit.** Miss either of the last two and the field renders nowhere while every gate stays green,
because `reachability` guards a LIST and a field absent from that list is unguarded BY CONSTRUCTION —
not by oversight. **Where a field is deliberately not rendered, write that in its schema description
and leave it off the list.** An unrendered field with no such line is a defect; a view added only to
satisfy this rule is worse than the defect, and a mark rendered somewhere other than the page of the
record declaring it does not count.

**Run the field-render audit every phase at stage 7 and state its count, per layer.** It is a tool —
`npm run field-render-audit` — and it is in the build, so this instruction is now mechanical rather
than remembered. For each schema field it counts the records carrying it against the records whose
own built page contains it; any non-zero difference is invisible data. **All three layers were swept
on 2026-08-05: ledger 15 fields, provenance 6, series 11, 0 invisible.** The series sweep found the
defect at a second site — `points[].note` rendered nowhere on any PEER series, because the panel
branch of `SeriesTable` had no note cell at all.

**Normalise the page and the value with the SAME function, and never hand-roll a second one.** The
audit's first run reported 55 invisible values and 53 were its own artefacts: period labels render
`FY2013–14` with an EN DASH against a hyphen in the data, and the `P-xx` linkifier turns "See P-26."
into "See P-26 ." — three of those were CAVEATS, the worst possible false positive, since a spurious
truncation hit sends someone hunting a clamp that rule 3a forbids and that does not exist. Same shape
as phase 13's Indian digit grouping. **And when checking a deployed page, assert values READ FROM
`/data` in that operation, never needles typed from memory** — two hand-written needles failed
against pages that were rendering perfectly, because the record said `FUSES` in capitals and
`Incapsula WAF stub` with the WAF.

Earned phase 15, and the numbers are the argument for the two instructions above. `assessmentNote`
rendered on **0 of the 164 records carrying it** and `revisitTrigger` on **0 of 62**: 226 marks
written, validated, shipped and invisible across every phase since each field was added, with every
gate green throughout precisely because the data was correct — the same shape as the absence bug that
survived three phases. It voided the previous cycle's entire output: the assessment-audit sequence had
just written reasoning into 33 verdicts so that no verdict stood without stated ground, and **not one
of those 33 had ever reached a reader.** A verdict shown without its argument is what this instrument
exists not to do. **TypeScript does not protect this class** — `revisitTrigger` was absent from
`LedgerRecord` for its whole life, so no view could have rendered it even by accident and `typecheck`
was green the entire time.

**Do not pipe gates** — an exit code does not survive a pipe. And a structural check passes on a
stub: structure passing is not content passing.

**`figure-consistency`** checks declared arithmetic claims against BOTH their source values and their
printed operands. A non-reconstructing figure must be declared, not merely correct. The claims file's
own source values are checked, not typed from memory. Separators are normalised.

**The gate list, run in full every cycle:** `validate` · `typecheck` · `validate:selftest` ·
`reachability` · `no-unguarded-prose-field` · `field-render-audit` · `domain-coverage` (which
carries `lens-empty`) · `figure-consistency` · `enum-stamp` · `url-check` on `/data`. Plus an
arithmetic hand-check of every derived figure including internal consistency, a check that every
declared lens returns a non-empty and correct set, and zero forward references between `parts/`
files.

**The three rendering gates are different in kind and none subsumes another.** `reachability` walks
the guarded-marks list and proves each mark reaches its own record's page — but it is
ENUMERATION-SCOPED, so it can only ever check what the list contains.
`no-unguarded-prose-field` binds that list to the schemas: every prose field on `LedgerRecord` and
`ProvenanceRecord` is guarded or exempted BY NAME in its own schema description, with no third
state, so a field cannot be merely forgotten. `field-render-audit` ignores both and observes the
built output directly, asserting every prose field on every layer reaches its own page — it is what
catches a field that is nominally guarded and suppressed anyway.

## Authoring conventions

**The four measurement categories.** A record must say which it is:

1. **`differentFacts` pair** — two instruments measuring the SAME quantity and disagreeing. Both
   sides retrieved, same period and basis, methodological reason stated where known. Never averaged,
   never picked. (P-119, India-China trade.)
2. **Single-sided** — one party publishes and the other does not. Not a pair; the absence is the
   finding, localised by relaxation before it is recorded. (L-0191.)
3. **Incommensurable** — instruments measuring DIFFERENT quantities. Not a dispute and not an
   absence. No conversion, no side-by-side placement. **Agreement between them is as unsound as
   disagreement and reviews clean** — "SIPRI broadly confirms the trend" is the same category error
   wearing a friendlier face. (L-0197, TIV against rupees against HS 93.)
4. **Mutually declined** — BOTH parties decline the same quantity, and differently. Not a pair
   (neither gives a conflicting figure), not the single-sided case (both withhold). Record the
   absences separately with their own `reasonKind`: `withheld` where there is an identifiable
   refusal to a specific request, `not-published` where release is simply absent. (L-0202, the S-400
   delivery schedule: `withheld` on the Russian side, `not-published` on the Indian.)

**Share-shaped figures name their numerator and denominator.** If either is unstated in the source,
that is the finding — do not infer the obvious one. Three distinct quantities shared the word
"indigenisation" in one ministry's publications.

**Commitment states.** Every commitment record resolves into one, stated rather than implied:
**(a)** not yet due — the trigger date or condition, named; **(b)** due and undelivered — the date
passed, with evidence of non-delivery; **(c)** abandoned — evidence of abandonment. **Absence of news
is not (c).** A commitment whose source names no due date cannot leave (a) by the passage of time
alone, and the record says so rather than inventing a trigger.

**(d) unfalsifiable by construction** — a total with no date, no phasing and no annual target. It
has no trigger, so it is not (a); it can never fall due, so it cannot reach (b); and absence does
not evidence abandonment, so it is not (c). Such a commitment sits outside the other three rather
than between them, and the record says which of the three tests it fails and why. **Score it
`no-objective`: an objective is a target that can be failed.** This is not a finding that the thing
is undone or that the commitment was insincere — it is that the announcement as made cannot be
scored against itself at any future moment. L-0209 is the instance: the entire 1,643 km of the
Myanmar border, announced with a starting position and no date. Note what survives the test — a
total WITH a date is (a), and a condition rather than a date is still (a) if the condition is
observable, as in L-0205's exchange of notifications.

**Procurement filing rule, settled.** Acquisition cost, capital-budget share, payment schedule and
escalation file `macro`; indigenisation share, offsets, exports and DAP domestic content file
`foreign`; a G2G deal read as a diplomatic instrument files `foreign`. The `defence-sector` lens goes
on all of them; counterparty lenses where the record is genuinely about the relationship. `defence`
as a DOMAIN remains armed conflict and counter-insurgency, per phase 11.

**A lens is admitted when its records land, not when it is planned**, and only where the instrument
holds a FILE — several records read together because the counterparty is itself the policy object. A
lens over one record is a filter that returns what the reader already had.

## Phase stop conditions

Distinct from the code-session stops in Build workflow below. A phase run halts, reports and waits
only for:

1. A source that cannot be retrieved and that a record materially depends on — scoped to that
   record's file, not to its arc.
2. A lens or enum change requiring a new principle rather than an application of an existing one.
3. A gate failure surviving two independent reproductions per M1.
4. Anything requiring a phase 11 or 13 record's SUBSTANCE to change. Lens additions are not
   substance and do not stop.

Room is a real constraint and is not a stop condition. **A clean partial beats thin records** — close
what is done, state what is not, and say whether it was attempted.

## Build workflow
- Run phases autonomously: plan → apply → self-verify → commit → push.
- Stop only for: (a) new security surface — new routes serving user data, auth changes, anything beyond static rendering; (b) destructive/irreversible actions — deleting data files, force-pushes, history rewrites.
- Additive-only for `/data`: corrections happen by editing the record and noting the change in `docs/verification-log.md`, never by silent deletion.
- **NARROW SOURCE-EDIT AMENDMENT (2026-08-05).** The standing rule is that code does not edit `/data` at source — inconsistencies are raised and the operator applies them. That rule was earned by a real regression: a correct `exports-gdp` fix made in code was silently reverted twice by the next wholesale drop, because the drop regenerates its file wholesale. **The amendment is that a correction THE SAME BATCH ITSELF RAISED AND EVIDENCED may be applied by the run that raised it.** The reversion hazard does not apply, because the evidence and the edit are in one commit and the log entry names both. Three conditions, all required: the defect was written into `STATE.md` or the log **before** it was resolved, so the statement of the defect cannot be quietly reshaped to fit the answer; the evidence is a document retrieved in that run; and the edit is to a citation, a reason, a scope or a wording — **never to a `points[]` value or an `assessment`**, which stay operator decisions without exception. A correction inherited from an earlier batch, or one resting on a source nobody in the run opened, is still raised and not applied.
- **A closed verification-log entry is never edited.** Corrections are APPENDED and name what they supersede. The log has been append-only since the first cycle, and the reason is not bookkeeping: an append-only log that gets edited whenever an entry turns out to be wrong records only the errors nobody caught, which inverts what it is for. The record is corrected in place — that is what `/data` is — and the entry that stated the error stands, with the later entry governing. Same discipline as stating a correction inside the record rather than making it silently.
- Visual verification: Playwright screenshots (desktop 1440px, mobile 390px) on every view after significant UI changes; review renders before considering a phase done.
- Verify on the production deploy after push, not just locally.

## Design system (provisional — locked properly in a later session)
- Instrument register, not dashboard-flashy: restrained, archival, dense-but-legible.
- Light canvas. Red reserved for deaths, alerts, and break-seams. No decorative gradients.
- Mono for system labels and figures (tabular-nums), humanist sans for prose.
- Every view must answer: "what does this number rest on?" — one click to source + tier + provenance.

## Roles
- Chat sessions own research and the truth of `/data` records (drafted to schema, delivered to `/data/incoming/`).
- Code sessions own everything else: pipeline, validation, views, deploy.
- The schemas are the contract. Code may propose schema changes but they're agreed in chat before hardening, since research sessions author against them.
