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

4b. **AN ABSENCE MUST REACH A READER, AND 4a DOES NOT MAKE IT DO SO.** Ruled 2026-08-06. It appears on
every surface that LISTS the record, in the caveat's idiom, and it PRECEDES the argument on the
record's own page. **A declaration only a reader who opens the record and scrolls past two argument
blocks can find is housekeeping, whatever it looks like when they get there.**

**THE TWO RULES BIND DIFFERENT PROPERTIES AND FAIL INDEPENDENTLY, WHICH IS WHY THIS IS A CLAUSE
BESIDE 4a AND NOT A REWRITE OF IT.** 4a binds how an absence LOOKS; 4b binds where it APPEARS and
when. An absence can be styled perfectly — dashed, unfilled, no figure, no table, unmistakably not a
panel of results — and reach nobody; and an absence can be everywhere a reader looks and still be
styled like a results panel. **Neither implies the other.**

**AND THE FIRST IS WHAT HAPPENED, ON 374 DECLARATIONS ACROSS 199 RECORDS.** They complied with 4a
completely and appeared on NO listing surface at all — not the index, not a term page, not a domain
page — while sitting below `caseFor` and `caseAgainst` on the record itself. **4a was working and the
thing it was thought to protect was unprotected**: this is the shape of *a guard binds a scope, and
the claim it protects has its own*, where the gap between the two is silent by construction because
the guard passes.

**One thing 4b does not license: a corpus-wide count.** An absence total on the index would read as a
completeness score, and the rule that forbids a verdict number for a term forbids one for the
instrument's own coverage. **Per record, on every listing; never summed.**
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

**A CORRECTION QUOTES WHAT IT WITHDREW, IN THE SAME FIELD — and until 2026-08-06 this was described
here as the instrument's practice while being true of 6 fields out of 30.** The convention is real
and it was largely aspirational; it is stated as a requirement now and the backlog was backfilled
from git in the same batch that wrote this, because a convention asserted and not kept is worse than
one not asserted — every later cycle cites it as though it had held. **THE ONE EXCEPTION, and it is
not a gap: the convention does not apply where the FIELD DID NOT EXIST before the correction.**
L-0011's `assessmentNote` is the case — the record carried a failure verdict with no stated
reasoning and the correction *created* the note, so there is no withdrawn wording, because nothing
was withdrawn. A correction of an absence says that it is one. Without this exception written down,
a backfill comes up exactly one short and the gap reads as an oversight.

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

**A GUARD THAT RUNS AFTER THE DESTRUCTIVE OPERATION IS A POST-MORTEM, NOT A GUARD.** Every check
that decides whether a write is safe runs BEFORE the write, in the same operation, and the write is
reached only on its success. **Earned 2026-08-06 by destroying a file**: a read-modify-write script
did `open(path,'w').write(new)` and then asserted, further down, that a string it expected was
present. Python truncates on open, the assertion never ran because it came second, and a 918-line
memory file became 45 lines. It was rebuilt from session transcripts with a ~50-line hole that is
marked inline and cannot be recovered.

**It is the same class as a gate reading a stale build and reporting clean** — the check and the
thing it checks are in the wrong order, and the output looks identical to a real pass. `M2` says a
write is verified by diffing, and `verify-and-commit` exists because `;` and `&&` are the same
keystroke effort; this rule is the missing third: **verification before, diff after, and the write
in between**.

**The mechanical forms.** Read the file, compute the new content, ASSERT on the computed content,
then write. Where the target is not in version control, write to a temporary path, assert on THAT,
and rename over the original — a rename is atomic and a failed assertion leaves the original
untouched. **And put the file in git if you can**, which is cheaper and stronger than any rule here:
the memory directory was not tracked, which is the only reason a recoverable edit was not
recoverable.

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

### The governing principle, ruled by the operator 2026-08-06

> **No record or claim stands on a source that is not credibly independent of what it establishes.**

This is the principle the rest of the sourcing discipline serves, and it is stated here as a
principle because it decides cases the specific rules do not reach. It asks a different question
from the tier ladder. **The ladder grades the artefact; this grades the relationship between the
artefact and the claim it is made to carry.** Both questions are asked of every citation and they
have different answers: a ministry press release is a T1 document and, on the question of whether
that ministry succeeded, no evidence at all. Nothing about the ladder was wrong — it was never
asked this question.

Four rulings follow from it, all effective 2026-08-06. The first two are written into the
`assessment` definition in `schemas/ledger.schema.json` and the `Assessment` doc comment in
`lib/types.ts`; the second two are the two enum values authorised in the same batch.

**RULING 1 — `worked` REQUIRES EVIDENCE INDEPENDENT OF THE ANNOUNCING BODY.** A press release from
the party being assessed is not credible evidence that the party succeeded. **Where no independent
source exists, the record is not `failed`.** The outcome is *unestablished*, not negative, and
unestablished is `partly` where part of the objective is independently established, or `contested`
where the readings genuinely diverge. Getting this half right is the trap: a standard that converts
missing evidence into a negative finding is as unsound as one that converts it into a positive one,
and it would make the instrument's own evidentiary weakness read as a finding about the government.
Independence is a matter of degree and the record states which it has — a different institution of
the same state measuring the announcing body (the RBI on the Ministry of Finance, the CEA on the
MNRE, a later Finance Commission on an earlier one) is *weaker* than a non-state source and
*stronger* than the announcing body's own release, and the note says which of the three it is
rather than asserting "independent" flatly.

**RULING 1a — THE INTRA-STATE TEST, ruled by the operator 2026-08-06.** Ruling 1 assumed two
categories and the corpus has three. Intra-state evidence satisfies the principle **where the
measuring institution publishes the figure as part of its own statutory or routine function**, and
**not where the figure appears in support of the claim**. The RBI's *Financial Stability Report*
qualifies; a joint ministry-and-regulator release does not. **The test is on the PUBLICATION, not on
the institution** — the same body can produce a qualifying figure and a non-qualifying one on the
same subject in the same month, and which it is turns on whether the document exists to report or
to persuade. A CAG performance audit is the paradigm qualifying case: a constitutional auditor
reporting to Parliament on its own initiative. A PIB release carrying a regulator's number is the
paradigm failing case, whoever computed the number, because the document is the claim.

Two things follow that must be written on the record rather than assumed. **A qualifying source has
to bear on the LIMB IN DISPUTE** — the RBI's *Financial Stability Report* qualifies on capital
adequacy and says nothing about whether bank mergers produced efficiencies. And **the qualifying
document has to be HELD**: three of the five intra-state `worked` records reach the *Financial
Stability Report* only through a news site's account of it, which under the mirror rule is T4 and is
not the document. **A test passed against a source the instrument does not hold is not passed.**

And it is stated plainly wherever these records are read: **they rest on one arm of government
measuring another.** That is better than a department scoring itself and it is not the same thing as
independent evidence, and a reader is told which they are looking at.

**RULING 2 — AN UNMEASURED LIMB PREVENTS `worked`.** Where a commitment states several objectives
and **any one of them is unmeasured**, `worked` is unavailable and the verdict is `partly`. **This
governs the class, not the three records that exposed it.** There is no centrepiece exception and
the method does not permit objectives to be weighted after the results are known. A record whose
own note explains why one limb should weigh less has **documented a departure from the definition,
not authorised one** — the same finding batch 9 reached about L-0026 and the reason an anticipatory
note is never a defence.

**RULING 3 — A STATED, QUANTIFIED COMMITMENT WITH NO DEADLINE IS NOT `no-objective`.** It takes its
own value, `undated-commitment`: *stated and quantified, no deadline, cannot fall due*. `no-objective`
had been doing two contradictory jobs — nothing was claimed, and something concrete was claimed with
no date attached — and the second reading had the effect of insulating a quotable promise from ever
being scored. **Progress against such a commitment is reportable even though it can never become
overdue.** The value says the clock is missing, not the objective.

**RULING 4 — A FOREIGN GOVERNMENT PRIMARY TAKES ITS OWN TIER, `T1F`.** T1 is Indian official and T2
is multilateral; a non-Indian national government is neither, and 19 citations sat in T1 by default
because the ladder had nowhere to put them. A letter rather than a number, because the ladder's
numbers descend in evidentiary strength and a foreign gazette is not weaker than a contested
composite index. It also does work the ladder could not: under Ruling 1 a foreign government primary
**is** independent of the Indian body being assessed and an Indian official release is not, and one
tier holding both hid exactly that.

**RULING 5 — AN OBJECTIVE MAY BE IMPOSED AS WELL AS ANNOUNCED, ruled by the operator 2026-08-06.**
`failed` and `no-objective` were both defined around the government's own announcement — *"the
measure did not achieve the objective stated at announcement"*, and *"an objective is a target that
can be failed"*. **Neither reaches an obligation imposed ON the government by a statute, a
constitutional provision or a court direction — and four records were already scoring `failed`
against exactly such an obligation.** They were scoring it correctly. The discriminator that let them
lived in each record's own `assessmentNote` and nowhere else, which is the same defect as the phase
list living only in prose references: **a rule that is applied correctly and written down nowhere
cannot be checked, so a second version of it can run for months without contradiction.**

**THE RULE: A DUTY IMPOSED BY AN EXTERNAL AUTHORITY IS A LEGITIMATE OBJECTIVE FOR SCORING, PROVIDED
THE RECORD NAMES THE INSTRUMENT AND THE DUTY.** External authority means an authority other than the
body being assessed. The record states the instrument, the duty in the instrument's own words, and
the duty-holder — all three, on the record and not in a later reader's inference.

**Four conditions, each earned by one of the nine records the external review named.** All nine were
tested against the rule before it was written and **not one verdict moved**, which is the test a rule
codifying existing practice has to pass to be written at all.

1. **THE OBLIGATION IS IMPOSED, NOT VOLUNTEERED — and the absence of a deadline in the instrument
   does NOT move an imposed duty to `no-objective`.** Ruling 3's `undated-commitment`, and the
   *"an objective is a target that can be failed"* test, both govern what a government **volunteered**.
   **L-0162 and L-0210 are the pair an adversary reads together**: both are stated, binary and
   undated, and they take `failed` and `no-objective` respectively. Article 279A(11) binds the GST
   Council whether or not the Council ever said anything; the Free Movement Regime position binds the
   Ministry of Home Affairs only as far as the Ministry committed itself, and it committed itself to
   a recommendation. **Who imposed the obligation is the discriminator, and until now it was written
   in neither record.**
2. **THE DUTY MUST BE THE ONE THE FINDING IS ABOUT.** L-0154 is the case: Article 281 imposes a real
   duty — lay an explanatory memorandum on the action taken — and the Union **discharged** it. The
   record's finding is about five undefined action verbs, which no instrument reaches. **A duty in
   the vicinity is not a duty in dispute.** This is Ruling 1a's *bear on the limb in dispute* one
   level up: there it qualifies a SOURCE, here it qualifies an OBJECTIVE.
3. **NAMING AN INSTRUMENT IS NOT BREACHING IT.** L-0122 names AFSPA (J&K) 1990 section 7 as the source
   of the sanction requirement; section 7 sets no standard on the grant rate, so fifty requests and
   zero grants breach nothing in it. **Without this condition the rule degrades into "the note
   mentions a statute", which 33 of 170 notes do.**
4. **AN ABSENT DUTY IS NOT A DUTY.** L-0164's entire finding is that Articles 200 and 201 fix no
   period for the Governor or the President. **A record whose finding IS the absence of an obligation
   is the structural inverse of a record scored against one**, and reading it as an instance is the
   most available misreading of this rule.

**WHAT THE RULE DOES NOT REACH: an objective INTERNAL to the measure.** L-0108 is `failed` against
*"the recruitment process's own object — appointing teachers on merit"*, which the Supreme Court's
adopted findings establish it did not achieve. That is the ORDINARY definition of `failed` — an
objective stated at enactment, not one imposed from outside — and it is named here so a later cycle
does not cite it as an instance of this rule and widen the rule by example.

**The rule is a description of practice, not a new standard.** Seven of the nine were already
correctly distinguished and each stated its ground in its own note. What changes is that the ground
is stated ONCE, where a reader and an adversary can find it, instead of nine times where only the
author could.

**RULING 6 — `shock` IS EXTERNAL TO THE STATE'S OWN DECISIONS, ruled by the operator 2026-08-06.**
The `type` enum's usage note has recorded since phase 13 that `shock` covers both external
disruptions and domestically caused failures, and deferred the question. It is settled now:
**a chain of state decisions is not a shock, however severe its consequences.**

**L-0091 stated the test and is correct**, and it is quoted rather than paraphrased because it is the
only reasoned application of the boundary anywhere in the corpus — and it sits in a `shockExposure`
field, not in a schema: *"the record is typed as an episode rather than a shock precisely because
closure duration in India was a sequence of state decisions rather than an external event."*

**L-0020 and L-0064 assert the type and give no reason.** L-0020 carries no `assessmentNote` at all,
and **its own prose argues against its own type in two places** — `whatHappened`: *"indicating India's
depth was substantially policy and lockdown-driven rather than purely pandemic-driven"*;
`caseAgainst`: *"points to lockdown design, not the pandemic"*. **The four-hour notice of March 2020
appears in three records — L-0020 `shock`, L-0064 `shock`, L-0091 `episode` — one chain of state
decisions, two types, and the only record stating the test came out the other way.**

**The line is whether an act of policy caused it, NOT whose asset failed or how severe it was.** Both
halves matter. Severity is not the test: the migrant exodus was among the largest internal migrations
in India's recent history and is a consequence of a decision. Ownership is not the test either: the
July 2012 grid collapse (L-0001) was a failure of state-**owned** infrastructure and no policy act.

**RULING 7 — TYPE BY WHAT THE RECORD IS ABOUT, NOT BY WHAT FAILED, ruled by the operator 2026-08-06.**
A record about the STATE'S RESPONSE to an event is typed by the response. **L-0028 already does this
and nothing told it to**: Yes Bank's failure is a domestic non-state event, and the record is
`episode` because its subject is the RBI moratorium and the reconstruction scheme. L-0091 reaches the
same answer about the same question, and neither cites the other — **the second instance of a rule
the corpus was applying correctly and had written down nowhere.**

**IL&FS follows the same way, and THERE IS NO THIRD BRANCH.** The domestic non-state category is
real and has at least four members typed four ways — IL&FS (`shock`), the bank frauds of L-0032
(`episode`, with *"None material"* against its own exposure field), the 2012 grid collapse
(`event`), and the 2022 heat shock (**no record at all**, prose in three). **A third branch would
have made the type turn on the nature of the EVENT. Ruling 7 makes it turn on the SUBJECT OF THE
RECORD, which resolves all four without one** — a record about a private failure is typed by what
the record is doing with it, and a record about the state's response to that failure is a response
record.

**RULING 8 — A SHOCK IS PROVENANCE, NOT A LEDGER RECORD, ruled by the operator 2026-08-06.** **The
corpus authored it that way twice with no rule telling it to** — L-0022 → P-10 and L-0033 → P-21,
both records whose `shockExposure` says the record is a confound *for others*, both reaching for
provenance unprompted. **A shock is a fact about the measurement environment, not a government
claim.** The ledger scores what the state did; a shock announces nothing, and six of the eight
records currently typed `shock` take `no-objective` or `baseline-context` for exactly that reason —
the ledger's apparatus of `claimAtLaunch`, `caseFor`, `caseAgainst` and a verdict is apparatus a
shock cannot use.

**TWO THINGS THIS RULING DOES NOT SETTLE, recorded here so they are inherited rather than
rediscovered:**

1. **WHERE A SHOCK THAT BREAKS NO SERIES LIVES.** P-10 and P-21 are provenance because each *is* a
   comparability break. A shock with no break — the 2022 heat shock, the 2014-16 oil collapse — has
   no home under this ruling and the ruling does not give it one.
2. **THAT `ProvenanceRecord`'S OWN SUBJECT IS A MEASUREMENT DISPUTE.** The layer is defined as
   measurement-dispute records; admitting shocks widens that definition, and **the widening is a
   schema question this ruling authorises nobody to answer.** Settle it before the layer is used,
   not while it is being used — the same discipline that forbids resolving a taxonomy inside the
   phase that discovers it.

**RETYPING IS VERDICT-ADJACENT AND IS NOT AUTHORISED BY THESE RULINGS.** What moves under 6 and 7 is
reported, and the move is a separate, deliberate act.

**RULING 9 — THE MULTI-OBJECTIVE DISCLOSURE RULE, ruled by the operator 2026-08-06.** Ruling 2 said
an unmeasured limb prevents `worked`. It governs one value, and **43 of the 86 records carrying a
`claimAtLaunch` announce more than one objective** — 20 `partly`, 8 `too-early`, 7 `failed`, 5
`contested`, and the rest. Ruling 2 speaks to none of them.

> **Where a commitment states several objectives and the verdict rests on fewer than all of them, the
> record names which objectives ground the verdict, which do not, and why — and every ungrounded
> objective is entered as an absence.**

**IT IS A DISCLOSURE REQUIREMENT AND IT RESTRICTS ONE VALUE ONLY.** One consequence per class,
and they differ because the four values fail in different directions:

- **`worked` — unavailable.** Ruling 2, unchanged. A positive verdict on a subset asserts more than
  the evidence carries.
- **`failed` — THE VERDICT STANDS AND ITS GROUND IS STATED.** Restricting it would convert a
  demonstrated failure into a non-finding: L-0011 fails on two of four announced objectives and the
  two are decisive on the government's own sources. **Ruling 1 already settled the symmetry — a
  standard that converts missing evidence into a negative finding is as unsound as one that converts
  it into a positive one — and the answer in this direction is disclosure, not restriction.**
- **`partly` — disclosure only.** It already means *part of the objective*, and it is where Ruling 2
  sends records, so a rule that also barred it would have nowhere left to send them.
- **`contested` — disclosure only.** The contest is about readings, not coverage; where the
  unmeasured limb IS the contest, `contestedGround` already records it.
- **`too-early` — disclosure only, AND IT IS NAMED EXPLICITLY HERE**, because a rule written for the
  `failed` side sweeps in eight records where nothing is wrong: the value's own definition says the
  evidence has not accrued, so an unmeasured limb is expected rather than defective.

**Three things it must not do, each earned by a live record.** It must not make an unmeasured limb an
excuse — L-0030 is `failed` **because** the transfer did not happen and its efficiency limb is
unmeasurable for the same reason, so a record may not convert its own central finding into a
measurement gap. It must not treat an **unquantified** limb as an unmeasured one — L-0209 announces a
quantified fence and a patrol track with no length, and **an unmeasured limb has a denominator nobody
published while an unquantified limb has none at all**, only the second being a defect of the
announcement. And it must not sweep in `too-early`.

**THIS RULE IS UNENFORCEABLE TODAY AND SAYS SO.** Nothing in the corpus records that a record
announced several objectives, so no gate can find the records it binds — it joins Ruling 2 as a rule
in three files that nothing can apply. **That is stated inside the rule rather than discovered later**,
because this file already warns that a rule naming a path requires the path to exist when the rule is
written, and here the path does not.

**AND THE RULE IS WHAT TELLS `objectives[]` WHAT TO HOLD, WHICH IS WHY IT IS WRITTEN FIRST.** The
proposed field needs the objectives as a list and a measurement state per objective — and, because of
this rule, **a flag for whether each objective GROUNDS the verdict.** That third requirement is
invisible until the rule exists: designing the field first would have produced one that records
measurement and not relevance, and the rule would then have been fitted to the field. **Four `failed`
records already satisfy the rule unprompted** — L-0011, L-0016, L-0041 and L-0030 each name which
limbs ground the verdict and which do not.

**A STRUCTURED VALUE NEVER MOVES ALONE — the point-of-change rule, 2026-08-06.** When a `type`,
`assessment`, `contestedGround`, `tier`, `reasonKind` or `directionOfBias` value changes, **the prose
fields that restate it are searched and corrected in the SAME operation**, before the write. The
record is read whole, not the field being changed.

**IT IS A RULE AND NOT A CHECK, AND THE MEASUREMENT IS THE ARGUMENT.** Over 223 ledger and 127
provenance records across fourteen prose fields, a scan can only find a restatement where the value's
spelling cannot occur in ordinary prose. `no-objective`, `too-early`, `awaiting-adjudication`,
`undated-commitment`, `evidence-withheld` and `overstates-pre-2014` are findable — **`shock`,
`event`, `episode`, `reform`, `institutional`, `criterion`, `measure`, `time`, `worked` and `failed`
are ordinary English words.** So `type` and `contestedGround` return **zero** findable restatements at
any precision, **and `type` is the axis on which the defect actually happened.** A gate built on this
measurement would report clean on the failure it was built for.

**And the second half of the argument is the ratio.** Of 32 prose mentions naming a value other than
the record's own, **31 are correct** — value-boundary defences and dated rescoring history preserved
under the correction convention — and one was stale. A token check would fire on thirty-one right
answers. **The distinguishing context is semantic, not lexical: *"Not too-early"* and *"Filed
too-early"* differ by one word and by everything.**

**The nearest mechanism that exists is `withdrawn-wording`'s sibling assertion**, which binds only
fields already carrying a correction marker — it reaches the second half of the defect and not the
first. Extending it to fire when a STRUCTURED field changes between commits is buildable and would
need the previous commit's value, which is a different contract from every gate in the build.

**A VALUE LANDS IN THE SCHEMA, THE TYPE AND THE LABEL MAP IN ONE COMMIT, OR IT IS A PROMISE THE VIEW
CANNOT KEEP.** Adding a member to a JSON Schema enum used to be silent: `no-unguarded-prose-field`
and `field-render-audit` both walk the corpus, so a value no record carries yet is, to them, nothing
at all — no record holds it, no page prints it, no gate speaks — and the first record authored into
it would render as `undefined`. `tools/enum-parity.mjs` closes that: per axis, the schema set, the
`lib/types.ts` declaration and the label map the view renders through must be **equal in both
directions**, a label for a dropped member being a view promising a value the data cannot hold. Run
before the type and the view exist it names the new member against both, which is what proving a
guard fires *before* the change means. Its first live run caught a real one: a perl edit adding the
source tier `T1F` to every `"T1", "T2"` pair in the schemas had also landed it in `term`, an unrelated
axis that shares the spelling by accident. Declarations are compared as sets; **`allOf` / `if` /
`then` branches are CONSTRAINTS**, checked as subsets whose every omission is declared by name in
`CONSTRAINT_OMISSIONS` — that is what forced `undated-commitment` into the rule requiring `caseFor`
and `caseAgainst`, which a set comparison alone would have let slip.

**A DEFECT FIXED ON ONE SURFACE IS CHECKED AGAINST EVERY SURFACE OF THE SAME KIND IN THE SAME
COMMIT — the local-fix rule, ruled by the operator 2026-08-06.** A fix applied where the defect was
noticed and nowhere else leaves the same defect standing everywhere it was not noticed, and the
instrument has paid for this at least three times: the reading-order defect fixed for the caveat,
found again for absences, found again for the verdict chip; the cross-link built for `/unmeasured`
and then not built for `/exposure` or `/contested`, both of which were authored *after* it; and the
ad-hoc normaliser, corrected four separate times before it was written down as a class. **The
correction is not the fix. The correction is the SWEEP** — name the class, enumerate its members
from the code rather than from memory, and report the ones already clean alongside the ones changed,
because a sweep that reports only its finds cannot be distinguished from a sweep that did not run.

**Two things it does not say.** It does not say fix every surface: where a member of the class is
deliberately different, the sweep records why and leaves it. And it does not reach ACROSS classes —
"same kind" is the defect's own shape (reading order, cross-link, normaliser), not the file or the
phase. Widening it to "check everything whenever anything changes" makes it unfollowable, which is
the failure mode the rules in this file are written to avoid.

**No gate reaches this.** Whether two surfaces are "of the same kind" is a reading, and the class is
usually named for the first time by the fix itself. What can be checked is that the sweep HAPPENED:
the batch report states the class and its enumerated members. That is a discipline on the report,
not a check on the code, and it is stated here rather than left implied.

**EVERY RULE IS EVALUATED AGAINST ONE SNAPSHOT, AND THE CORPUS IS WRITTEN ONCE — the single-snapshot
rule, ruled by the operator 2026-08-06.** Where two rules read the same field, applying them in
sequence makes the ORDER decide the outcome, and the order is an accident of how the batch was
written. This was not hypothetical: the qualifying intra-state sources for L-0023, L-0026 and L-0029
were four `abclive.in` citations, and band A re-tiered exactly those citations T1 → T4 in the same
pass. **Re-tier first and all three fail the independence test on ordering; test independence first
and all three pass on a tier the pass is about to withdraw.** Neither is a finding about the
evidence. So: read the corpus into memory, evaluate every rule against **that** snapshot, collect
the changes, and write once. A rule never reads a value another rule in the same pass has already
changed. Where the outcome genuinely depends on the order — where rule B's input is rule A's output
— that is a dependency to be **stated in the pass and decided deliberately**, not resolved by
whichever loop happened to run first.

### THE PHASE LIST — this is it, and there was not one before

**Nothing in this repository enumerated the phases until 2026-08-06.** They were referred to by
number in prose across this file, the verification log and the drop files; the `drops/` directories
are named by subject; no file carried the list. **That is how two names for phase 16 ran in parallel
for a scoping batch** — one from the verification log, one from a note kept outside the repository,
neither checkable against the other. **A fact that lives only in prose references cannot be checked,
so a second version of it can run for months without contradiction.** The list is here now, and a
phase name asserted from memory is a premise until it is read off this table.

| # | phase | state |
|---|---|---|
| 1–9 | the domain phases | closed |
| **10** | **INSERTED — not on the original list.** Numbering in any pre-insertion note is therefore offset by one from this table. | closed |
| 11 | | closed |
| 12 | **partly covered delimitation** | closed, but see below |
| 13 | | **NOT SAFE TO TREAT AS COMPLETE until the delimitation overlap with phase 12 is checked** — the coverage was split across the two and neither closed on it explicitly |
| 14–15 | 15 = environment and energy | closed |
| — | the adversarial-review and rulings cycle | closed 2026-08-06, in `drops/cycle-review-and-rulings/` |
| **16** | **shocks calibration** — input is the whole corpus | **CLOSED 2026-08-06**, in `drops/phase-16-shocks/` |
| **17** | **independence** — the field proposed in `PROPOSALS-2026-08-06.md`. **`objectives[]` sequences FIRST within it**, because commitment state attaches to the limb and is a property of that array. | **CLOSED 2026-08-10**, in `drops/phase-17-design-lock/` — **the directory name records a NAME COLLISION, not a renumbering; see below.** Architecture closed at the end of it: nine walks, A-1 to A-5 fixed, walk 9's one phase-0 finding fixed in-batch. **The reopening condition is stated in that file: any future off-queue walk find reopens the closure.** |
| **18** | **design lock** | **OPEN 2026-08-10**, in `drops/phase-18-design-lock/`. Governed by `DESIGN-SCOPE.md` there, which is revision 3 and supersedes the two pre-phase drafts kept in its `inputs/`. |
| **19** | **polish** | |

**A THIRD, ADDED AND RESOLVED 2026-08-06: A PHASE-NAME COLLISION, RULED IN THE TABLE'S FAVOUR.**
Phase 17 was opened by the operator with the name *design lock*, and this table reads **17
independence, 18 design lock**. **The operator has ruled that the table is right.** Phase 17 is
independence; the design-lock work belongs to 18.

**AND THE DESIGN WORK SEQUENCES BY DEPENDENCY, NOT BY THE NUMBER IT WAS GIVEN.** The batch that
opened under the wrong name measured the deployed site against the corpus, and its output stands —
it is in `drops/phase-17-design-lock/`, whose DIRECTORY NAME IS NOW WRONG AND IS LEFT WRONG on the
same principle that leaves a withdrawn wording quoted: renaming it would erase the collision that is
the reason this paragraph exists. **Read the directory as phase 18's opening measurement.**

**`phase-name` MISSED IT, AND THE GAP WAS MEASURED BEFORE IT WAS FIXED.** The gate bound an
assertion of the form *phase N **is** &lt;name&gt;*, and the collision arrived as a HEADING — *"Phase
17 — design lock"* — carrying a number and a name and no verb between them. **Every heading and
every table row takes that form**, so the gate was blind to the two places a phase name is most
likely to be written down. Widened 2026-08-06 on operator authorisation; the predicate now reaches
headings and table rows, and the widening is proven against this collision as it stood at `c34e83a`.

**Two things a cold read must not assume.** Phase 10 was inserted, so any note written before it
carries numbering one behind this table. And **delimitation was partly covered in phase 12**, which
makes phase 13's completeness an open question rather than a closed one — check the overlap before
treating 13 as done.

### THE COUNTERFACTUAL ENGINE — CONSIDERED AND DECLINED, 2026-08-06

**Not unbuilt. Declined, with the reasoning recorded, so a later cycle does not rediscover it as an
obvious gap and build it.** The operator's ground: modelled output asserting what would have happened
otherwise is the corpus citing itself, and that shape has now been ruled on twice — a self-audit
leaves the ledger, and engine output may not be cited by a scored record.

**Where that reasoning is strongest, and where it is not, because the distinction matters if the
question reopens.** It is strongest against a counterfactual a record then rests on: the model's
assumptions decide the output, the output decides the verdict, and nothing outside the corpus has to
change for the finding to change. It is weaker as an argument against the engine EXISTING as a
non-citable view — peer-index normalisation runs on external series (the fixed four-country panel,
P-09), so its inputs are not the corpus, and the citation ruling already stops a record resting on
it. **The decision does not stand on that argument alone and should not be defended with it.**

**What the decision does stand on.** (1) Rule 8 already requires both methods, endpoint sensitivity
and no composite — applied honestly to Indian data of this quality the output is usually *"the two
methods disagree and the fit is endpoint-sensitive"*, which is a true statement the corpus can make in
prose without an engine. (2) The verification log requires a statistical review of the method **as it
is built**, and this project has never been able to commission the independent review it has promised
since before phase 15; building a method whose required check cannot be obtained is building an
unchecked method. (3) The whole 2026-08-06 cycle removed things that resemble measurement without
being it. **An engine whose own specification describes it as producing "output that resembles
measurement" runs against that, and a hatched band is still a line on a chart.**

**RULE 8 NOW GOVERNS SOMETHING THAT WILL NOT BE BUILT, which is exactly the unfollowable-instruction
defect this file warns about.** It is not deleted, because it still binds: it applies to every
modelled, projected, imputed or extrapolated quantity the corpus ALREADY carries — 67 of 269 series
mention one, P-122's imputed renewable generation is the canonical case, and 765 observations carry
`approx` status. **Read rule 8 as the method-and-rendering rule for modelled quantities generally,
not as a specification for a view that is not coming.** The rendering proposal in
`drops/cycle-review-and-rulings/PROPOSALS-2026-08-06.md` survives on the same footing and applies to
the same set.

**ENGINE OUTPUT MAY NOT BE CITED BY A SCORED RECORD — ruled by the operator 2026-08-06, and it is
the self-audit rule applied to a second case.** A counterfactual is model output. **A record scored
using that model, citing that model's output as its evidence, is a source that is not independent of
what it establishes** — the same shape as the corpus citing itself, and the governing principle
refuses both for the same reason. So: the engine's output lives in **its own layer**, is rendered
**visibly unlike measured data**, and **never enters a record's `sources[]`**. A record may reason
about a counterfactual in prose and say that it is one; it may not rest on it. **The two rulings
answer one question and should be read together** — if nothing outside this corpus would have to
change for a finding to change, it is method, not evidence.

**A SELF-AUDIT DOES NOT BELONG IN THE SCORED LEDGER — ruled by the operator 2026-08-06.** The tier
ladder grades external documents by their DISTANCE FROM THE EVENT, and a derivation over the
corpus's own `/data` is at no distance: it is the corpus restating itself. That is why band C had no
place on the ladder and why inventing a class for it would have been the wrong repair. Under the
governing principle, **a source is not independent of what it establishes when it IS what it
establishes.** L-0218, L-0219 and L-0220 left the ledger on 2026-08-06. **Their findings are real
and stay published** — as method and derivation content at `/derivations`, where the rule is printed
beside every number and a reader can recompute it. What a scored record could carry and a derivation
cannot is recorded there too, rather than quietly dropped: the `caseFor` and `caseAgainst`, the
`caveat`, the `revisitTrigger` and the declared absences. **The test for a future record is whether
anything outside this corpus would have to change for the finding to change.** If nothing would, it
is method.

**GRADE THE DOCUMENT, NOT THE SERVER — the mirror rule, ruled by the operator 2026-08-06.** Identical
bytes ARE the document. A High Court judgment retrieved from a legal-news mirror, or a ministry PDF
retrieved from the Internet Archive, **is the document** and keeps the tier the document earns. An
ACCOUNT of a document is T4 — a newspaper reporting what a report said is journalism however official
the subject is. **The line is between holding the artefact and holding somebody's description of it,
not between which server sent the bytes.**

**Two authoring requirements follow and neither is optional.** Record the RETRIEVAL PATH with the
citation, so a reader knows the bytes came by a third party and can weigh that. And **where the
original no longer resolves, record that beside the citation** — a publisher's deletion is evidence
about the publisher, not about the evidence.

**The ruling rests on a measurement, and the measurement is why it went this way.** 77 citations are
served by a third party, 65 of them by `web.archive.org` and 63 of those tagged T1. **Of 17 distinct
archived primaries tested through a pinned resolver, 2 still answered at their original host** — six
404, three no response, four no DNS record. **For 13 of 17 the archived copy is the only surviving
copy.** Grading mirrors down would have told a reader the evidence was weak when the true position is
that the evidence is strong and the publisher deleted it — **the exact inversion this ladder exists to
prevent, applied at scale.**

**What this rule does NOT settle, and the gap is still open:** a foreign government primary retrieved
directly — a US Executive Order from the Federal Register — has no class in this ladder at all, because
T1 is defined *Indian* official and T2 is multilateral. 19 citations sit in that hole. **A missing
class is not a mis-tag and this ruling does not reach it.**

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

**THE PROSE SHADOW — a prose field that RESTATES a structured value goes stale silently when the
structured value moves, and no gate can see it.** Named 2026-08-06. The three render gates prove a
prose field is THERE; none reads what it SAYS, so a sentence asserting `type` or `assessment` keeps
asserting it after the field has moved, with every gate green and the data perfectly valid.

**Earned by the Ruling 6 and 7 retypes.** L-0064 and L-0027 both carried *"This record is the shock"*
in `shockExposure`. **Had the retype touched `type` alone, both records would have asserted a type
they no longer carry** — and nothing would have reported it. Both were corrected in the same
operation, which is the rule: **a structured value never moves alone. Search the corpus for prose
restating it, in the same operation, and correct or withdraw every instance before the write.**

**THE AXES MOST AT RISK ARE THE ONES A MECHANICAL CHECK CANNOT REACH, and that is the whole
difficulty.** A scan can find a shadow only where the value's spelling cannot occur in ordinary
prose. `no-objective`, `too-early`, `awaiting-adjudication`, `undated-commitment`,
`evidence-withheld`, `overstates-pre-2014` are findable. **`shock`, `event`, `episode`, `reform`,
`institutional`, `criterion`, `measure`, `time`, `worked`, `failed` are ordinary English words**, so
the `type` and `contestedGround` axes — one of which is where the defect actually happened — return
ZERO findable restatements at any precision. **A gate here would report clean on the axis that
failed.**

**And a mention of another value is USUALLY CORRECT, which is why this cannot be a token check.**
Measured 2026-08-06 over 223 ledger and 127 provenance records: 73 restatements on findable tokens,
32 naming a value other than the record's own, and **31 of the 32 are right** — value-boundary
defences (*"Not awaiting-adjudication: nothing is pending before any body outside…"*) or dated
rescoring history preserved under the correction convention. **One was stale**: L-0209's
`revisitTrigger` still said what would move the record *"out of no-objective"* after the record had
been rescored to `undated-commitment` and its `assessmentNote` rewritten — **the note was corrected
in the rescore and the trigger beside it was not.**

**The defect is therefore per-field, not per-record**: a rescore that rewrites one prose field leaves
its siblings asserting the old value. `withdrawn-wording`'s sibling check is the nearest existing
mechanism and it binds only fields carrying a correction marker.

**A COUNT DERIVED FROM A KEYWORD SCAN IS NOT A FINDING UNTIL THE MEMBERS ARE READ, AND THE TERM LIST
IS REPORTED WITH THE COUNT OR THE COUNT IS NOT REPORTED.** Both halves, and the second is what makes
the first checkable. **Earned by four inflated counts of my own in three consecutive batches, every
one labelled "candidates" at the moment it was produced and spent as a finding one paragraph later:**

- *"38 records reason from an exogenous event"* — re-derived at **39 / 40 / 48 / 52** depending on a
  term list that was never written down.
- *"22 records document a departure from the written definition"* — `departure` appears in **exactly
  one** note; the other 21 were records *appealing to* the definition, which is the practice working.
- *"27 candidates split across six values"*, used to predict where the next external review would
  land — **~12** on reading; four of the rest cite a written rule and two use `limb` for the halves
  of a dispute.
- *"17 records defending a value boundary one record at a time"*, ranked second in the same
  prediction — all 17 are real, and **15 are governed by a written definition or by the
  `contestedGround` field**, so the group is nearly closed rather than open.

**LABELLING A COUNT AS CANDIDATES DOES NOT STOP IT BEING SPENT AS A FINDING.** In all four the
label was present and the number was used anyway, one paragraph later, to rank a risk or size a
population. So the rule is not "say it is a candidate" — it is **read the members, or do not state
the number**. A count with unread members may be reported only as a bound with the reading owed
named: *"at most N, members unread"*.

**And the term list is part of the count.** A figure whose scan is unrecorded cannot be re-derived,
which means it cannot be corrected, which means it survives every later check — the fabricated-scope
defect wearing a true number. Where a count comes from a field test rather than a scan, say that:
`assessment === 'failed'` is exact and reproducible and needs no term list, and the distinction is
worth stating because the two look identical in a report.

**One further trap, and it is the one that produced the largest error.** A scan over
`assessmentNote` measures **what records SAY about themselves**, not what is true of them. The
multi-objective sweep that produced Ruling 2 stated its scope honestly — *"eight records state
multiple announced objectives **in their own notes**"* — and every downstream use dropped the
qualifier and read it as a census. Reading all 16 `failed` records finds **six** that announce more
than one objective, against the sweep's one. **The sweep was right about what it measured and wrong
about nothing; the summary of it was a different claim.**

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

**A VERIFICATION READS THE PAGE THROUGH THE GATE'S OWN NORMALISER, OR IT IS NOT A CHECK.** Import
`norm` and `pageTextFromHtml` from `tools/lib/page-text.mjs`. Do not reimplement them, do not "just
strip the tags", and do not fold entities inline at the call site. **Four ad-hoc checks in ONE
session reported a correct page broken, and all four were the same mechanism** — the check
normalised the page one way and its needle another, so the miss was an assertion about the check's
own regex and not about the artefact:
- period labels authored `FY2013-14` and rendered `FY2013–14` with an en dash;
- the `P-xx` linkifier turning "See P-26." into "See P-26 ." once tags are stripped;
- **React's SSR comment separators**, which become a SPACE if `<!-- -->` is stripped as a tag, so
  `lens · Europe` reads `lens ·  Europe`;
- a curly apostrophe on the page against a straight one in the needle.

**The cost runs in the worst direction every time.** A false failure sends someone hunting a
rendering bug that does not exist, and three of the first field-render audit's 55 "invisible" values
were CAVEATS — where a spurious truncation hit points at a clamp rule 3a forbids and that was never
there. **And the gate was right in all four cases**: `field-render-audit` reported 0 invisible on the
same fields through its single normaliser while the hand-written check reported failures. **A
disagreement between the gate and an ad-hoc check is evidence about the check.** Read the raw bytes
of one failing page before concluding anything else.

**The deploy path is no longer hand-written.** `tools/deploy-check.mjs` derives every needle from
`/data` in the same operation, renders non-prose values through `tools/lib/value-renderings.mjs`,
normalises through the module above, and carries a same-form negative control on every page — a title
belonging to a DIFFERENT record must be absent, or a proxy serving one page for every URL would pass
every positive in the run. It is deliberately NOT in the build: it needs the network, and a gate that
fails when the host is slow blocks every commit on somebody else's uptime.

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

**Everything else runs to completion:** plan, arc, self-audit, gates, commit, **and push**.

**PUSH IS AUTONOMOUS AGAIN, ruled by the operator 2026-08-06.** WITHDRAWN WORDING, quoted so the
correction can be checked rather than taken on trust: this passage previously read *"Push is not
autonomous while the deployment is public and unauthenticated."* **The condition it named no longer
holds** — the operator has ruled the site DELIBERATELY public, so publication is the intent rather
than a hazard the rule was guarding against, and a rule whose stated condition has lapsed is a rule
that stops binding on its own terms rather than by amendment.

**WHAT SUSPENDING IT COST, MEASURED, BECAUSE IT IS THE ARGUMENT FOR THE CHANGE.** At `c34e83a` the
deployed site served `fa518f4` — **nine commits and the whole of phase 16 behind**, for two weeks.
A reader could not see Ruling 5, Rulings 6 to 9, the point-of-change rule, three retypes, L-0209's
two-limb correction or the structured exposure field. **The gap between what the corpus held and
what it showed was one operator action wide and stayed there**, which is a worse failure than
anything the suspension was protecting against.

**The gates are the condition now, and they already are.** `npm run commit` reaches `git commit`
only on green and has no flag that skips a gate, so an invalid corpus cannot become a commit and
therefore cannot become a deployment. **Verify on the production deploy after pushing** — that
instruction is in Build workflow below and is not new; what changes is that the push happens without
waiting.

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

**A GUARD'S FIELD FILTER IS A SCOPE, AND `!enum && !format && !pattern` WAS THE LARGEST ONE IN THIS
INSTRUMENT.** Both render gates selected prose by that test, so every verdict, tier, stated reason,
boolean and formatted number in the corpus sat outside every render assertion **by construction** —
not by oversight, and not visibly. `disputeKind` is the proven instance: schema-REQUIRED whenever
`reasonDisputed` is true, correct in the data on all 19 entries, and read by no view for the whole of
its life. It was found by hand. **Closed 2026-08-06, and the numbers are the argument: turning the
non-prose half on produced 75 more invisible record-fields and 2 fields nobody had decided about at
all.**

**A non-prose value cannot be looked for as itself, which is why this needed a mechanism and not
care.** `assessment: "no-objective"` renders as *"No stated objective"*; `bridgeExists: false` as
*"no bridge"*; `264500000` as *"26,45,00,000"*. An audit hunting the raw token reports a field
invisible when it renders perfectly — which already happened, in the sweep that claimed 96 invisible
`reasonKind` values that were all on the page under the view's own labels. So **every non-prose field
declares how it renders, in `tools/lib/value-renderings.mjs`, and the labels there are PARSED OUT OF
THE MODULES THAT RENDER THEM rather than retyped.** A map that has moved or changed shape aborts the
gate; it never falls back.

**The structure is the same as prose and there is still no third state: DECLARED or EXEMPTED BY NAME
in the field's own schema description.** Two fields took the exemption and both are debts rather than
decisions, and the exemption text says so — `higherIsBetter`, carried by 70 series and read by
`lib/types.ts` alone, so the directional colour its own description requires has never existed; and
`xAxis`, where two series declare `lok-sabha-term` and are rendered as an ordinary yearly series,
**which is what that field's own description forbids.** An exemption that claims a decision where
there was none is worse than the gap, so where it is a debt the exemption records the debt.

**Enumerate the complement, never the shapes you know about.** Prose is defined positively — a
string with no enum, format or pattern — and non-prose is *everything else*, so a JSON Schema
construct nobody anticipated lands IN scope rather than falling out of it. The old walk tested for
known shapes and missed `competingAccounts` entirely, because its items are a `oneOf` and the walk
only followed `items.properties`: the most literally delegatable field in the corpus, on 81 records,
outside both render gates with nobody having decided it should be. The enumeration now lives once,
in `tools/lib/schema-fields.mjs`, because two gates with a copy each is the same defect waiting.

**Run the field-render audit every phase at stage 7 and state its count, per layer.** It is a tool —
`npm run field-render-audit` — and it is in the build, so this instruction is now mechanical rather
than remembered. For each schema field it counts the records carrying it against the records whose
own built page contains it; any non-zero difference is invisible data. **Swept 2026-08-06 with the
non-prose half live: 36 prose + 42 non-prose fields across three layers, 0 invisible, 2 exempted by
name.** The 2026-08-05 sweep read ledger 15, provenance 6, series 11 — prose only, and that was the
whole of what any render gate could then see. The series sweep found the defect at a second site —
`points[].note` rendered nowhere on any PEER series, because the panel branch of `SeriesTable` had no
note cell at all.

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
carries `lens-empty`) · `figure-consistency` · `enum-stamp` · `phase-name` · `url-check` on `/data`.

**`phase-name` is the first gate over PROSE ABOUT the corpus rather than over the corpus** —
`tools/phase-name-consistency.mjs`, added 2026-08-06. Every assertion of the form *phase N is
&lt;name&gt;* in a tracked file must agree with the table above, or say in its own text that the name
was withdrawn, or live in a file that is append-only by rule. **It is buildable only because the
object is named, the authority is declared and the vocabulary is closed** — a phase number, this
table saying in terms that a name asserted from memory is a premise until read off it, and a
committed list of withdrawn names. Batch 14 concluded that the general STATE.md consistency problem
needs a convention and not a checker, and that is still true: **where any one of the three
properties is missing, this form does not transfer, and every state line dated and object-named is
still owed.** The gate asserts a PRESENCE IN CONTEXT and never an absence, for the reason
`withdrawn-wording` does: at the moment it was written, **six of the six disagreeing assertions in
the repository were CORRECT** — one in the append-only log, two quoting the withdrawn name inside
the sentence withdrawing it, and three in a scoping file that says at the top it is superseded. A
guard forbidding the token would have fired on six right answers and no wrong ones. Plus an
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
