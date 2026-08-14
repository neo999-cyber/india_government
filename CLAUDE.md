# CLAUDE.md — India Roadmap Instrument

Longitudinal research instrument: India's condition and trajectory, UPA baseline (frozen May 2014)
through the Modi-era terms (T1 2014-19, T2 2019-24, T3 2024-, living). Private audience; research
rigour is non-negotiable.

**THIS FILE IS THE RULEBOOK. `docs/rules-earned.md` IS ITS REASONS.** Every rule here was earned by
a defect, a measurement or an operator ruling, and the evidence that earned it is in that file under
the key in brackets — `[R-xxxxxx]` — copied verbatim, not paraphrased. Read a key when you need to
know why a rule exists or whether it still applies. **Do not delete a rule because its reason is not
in front of you: a rule with no visible reason is exactly what a future pass rationalises away, and
that has nearly happened twice.** Split 2026-08-11; before that everything below carried its
evidence inline and the file cost ~30,400 tokens on every turn.

## Architecture
- Three data layers, all JSON in `/data`, each governed by a schema in `/schemas`:
  - **series** — indicator time series, India + peer panel (BGD, VNM, IDN, CHN)
  - **ledger** — discrete reform/event/episode records
  - **provenance** — measurement-dispute records (P-xx), first-class citizens
- Next.js, static export, deployed to Vercel. No server, no database, no auth.
- Data enters via `/data/incoming/` drops from research sessions → validate → merge.

## Non-negotiable data rules

1. **Schema validation gates every merge.** A record failing validation never enters `/data`.
   *Enforced by `validate`, in the build.* `[R-f4869f]`
2. **Never splice across a break.** Series with `breaks[]` render with a visible seam. No smoothing,
   no interpolation across breaks, no trend lines fitted through them. `[R-f4869f]`
3. **Status renders visibly.** `approx` and `pending` are visually distinct from `verified`
   everywhere. Pending never renders without a flag. `[R-f4869f]`
3a. **A caveat never truncates, anywhere, at any density.** It renders wherever the record appears,
   in full, every time — no ellipsis, clamp, hover or disclosure. **If a caveat will not fit a
   layout, the layout is what changes.** A half-read caveat is worse than none, because it looks
   like the whole of it. Ordinary uncertainty is not a caveat and belongs in `notes`. `[R-f4869f]`
4. **Blanks are unreported, not zero.** `[R-f4869f]`
4a. **An absence renders unlike a finding.** Distinguish a gap in the data from a gap in the world.
   Where *nothing measures a thing at all*, that is a fact about the record and often the most
   important thing on the page. Use the `Absence` mark: dashed, unfilled, no figure, no table,
   visibly not a panel of results. Nothing is ever estimated into the space. `[R-f4869f]`
4b. **AN ABSENCE MUST REACH A READER, AND 4a DOES NOT MAKE IT DO SO.** It appears on every surface
   that LISTS the record, in the caveat's idiom, and it PRECEDES the argument on the record's own
   page. **4a binds how an absence LOOKS; 4b binds where it APPEARS and when. Neither implies the
   other** — 374 declarations across 199 records once satisfied 4a completely and reached nobody.
   **One thing 4b does not license: a corpus-wide count.** Per record, on every listing; never
   summed. `[R-2d97a5]` `[R-7b6789]` `[R-46557b]` `[R-77d4cb]`
5. **All three GDP regimes always.** 2004-05 (ends FY2013-14), 2011-12 (FY2013-14 to FY2024-25),
   2022-23 (from FY2023-24, P-10). No spliced back-series exists for either revision.
   - Never present one base alone as "GDP growth". All three render, in base order, seams intact.
   - **Overlap years carry every valid figure.** FY2013-14 reads 4.7% and 6.9%; the instrument shows
     both adjacent and picks neither. A single number for an overlap year is a claim the published
     statistics do not support.
   - **A seam knows which side it is on.** End-of-series seams render below the last row and name
     their successor; start seams render above the first row and name what they supersede;
     mid-series seams render above the row they take effect in. Never two unrelated series.
   - When MoSPI publishes the 2022-23 back-series it is a new record, not an edit. `[R-f4869f]`
5a. **A denominator break is not a series break.** Every ratio-to-GDP steps at 27 Feb 2026 with no
   change in activity. **The discriminator is SOLID against DASHED, plus words in both bands** — a
   series break is a solid red stop meaning do not splice; a denominator break is a dashed brass
   band meaning the values either side are divided by different things. Never render an arithmetic
   step as activity. Derived from unit + provenance ref; no schema change. `[R-f4869f]`
5b. **An NPA ratio never renders alone, and never without its basis.**
   - **The write-off adjustment is always offered** (P-17). Any view of `scb-gross-npa` or
     `psb-gross-npa` carries a toggle to gross NPAs plus cumulative write-offs over the same
     denominator. Where an input is missing the adjusted view says so and shows nothing.
   - **The reporting basis is stated wherever the figure appears** (P-18). Series on different bases
     never share an axis; a series stating no basis renders as "basis not stated". `[R-f4869f]`
5c. **A derived quantity inherits its inputs' contests.** Any ratio, percentage, share or per-unit
   figure whose numerator or denominator appears in a `differentFacts` pair carries the divergence
   forward as a RANGE with each bound attributed — or is not stated at all. **No gate can catch this
   class**: both computations are correct against their own input, and the defect is visible only by
   asking where the input came from. Distinguish a contested numerator from an uncertain
   denominator; where the range is too wide to support the argument, the argument changes.
   `[R-f4869f]`
5d. **A claim about what EXISTS is not a claim about what the SOURCES CONTAIN, and only the second
   is checkable.** Rewrite as the observation actually made: *the documents retrieved contain no
   explanation*, *no other publisher was located*, *this is the only case in the corpus*. **The test
   is mechanical: could a single document, if it turned up tomorrow, falsify the sentence without
   any figure in the record changing?** If yes, re-ground it on what was searched, where, and what
   was found. Superlatives are the loudest symptom and not the only one — a bare "unexplained", an
   "unprecedented", any negative existential smuggled in as background. **Writing a finding from
   zero primaries produces a record about my search, not about the world.** `[R-77bea8]` `[R-287a44]`
6. **Tier tags travel with claims.** Any rendered number traces to source name, URL, tier. T5 always
   carries a dispute record covering its own domain — the rule is "its dispute", not "P-08".
   `[R-761639]`
7. **Peer panel vintage discipline** (P-09): panel values carry `source.vintage`; the UI shows it.
8. **Counterfactual views show both methods** and endpoint sensitivity. No composite score, ever.
   *Read as the method-and-rendering rule for every modelled quantity the corpus already carries —
   the engine itself is declined.* `[R-fa94f7]`
9. **English only; no aggregate verdict number** for a term or for the government. Scorecards roll
   up to counts of assessments, never to a grade.

## Research and verification discipline

Every rule here was earned by a defect that got through. **A rule earned mid-batch is written into
this file in the same commit that earns it**, and its evidence into `docs/rules-earned.md`.
**A rule naming a tool as the only sanctioned path requires that path to exist when the rule is
written** — build it in the same commit, or write a weaker rule that is true. `[R-f961b7]`

**Rule 1 — read at the moment of quoting.** Record text is read from `/data` in the same operation
that quotes or edits it. Never reconstructed from memory, never carried forward. Anchor every prose
edit on a string read in that operation and abort if absent. Detect indentation from the file being
written. `[R-fed88f]`

**Rule 3 — a document is a source only if it was retrieved in this run.** A 200 serving a JavaScript
shell is not a retrieval. OCR output is not the document. `[R-ec8f93]`

**M1 — a reachability failure is retested from a second process, with both resolver and client
varied, before it is recorded as an environment fact.** Known environment facts, not to be
re-derived: `mod.gov.in` and `ddpmod.gov.in` resolve and refuse 443; `pca-cpa.org` is
Cloudflare-gated; `mea.gov.in` serves a JS shell; `federalregister.gov` CAPTCHAs full text while its
API works. **`legislative.gov.in` refuses one CLIENT and not the request** — 403 to the WebFetch
user-agent, 200 to `curl` with a browser one, established 2026-08-13 by retesting from a second
client. **`sansad.in` REFUSES ONE CLIENT AND PUBLISHES A JSON API — corrected 2026-08-14, and the withdrawn wording is quoted because it stopped three retrieval attempts.** It read: *"**`sansad.in` serves a JavaScript shell** for its bill list AND its debate transcripts: HTTP 200, an empty table, 0 characters of visible text, and no data endpoint in any of its bundles."* To curl with a browser user-agent it returns **319,236 bytes** of server-rendered Next.js, the same refuse-one-client shape as `legislative.gov.in` and `www.pib.gov.in`. **It also exposes a public JSON API at `/api_ls/` and `/api_rs/`** — `legislation/getBills`, `debate/debate-search`, `business/getAllLoksabhaAndSession` and more, whose inventory is recoverable from the Wayback CDX index over the domain. **A page that renders empty is a statement about the client, and the API was never in the bundles because it is a different origin path.**
**`eparlib.sansad.in` — the Parliament Digital Library, where the Bulletins live — resolves to
164.100.166.186 and returns HTTP 000 plain AND pinned**, so it is unreachable rather than
misresolved. `loksabha.nic.in`, `eparlib.nic.in` and `loksabhadocs.nic.in` do not resolve at all.
**`www.pib.gov.in` refuses the WebFetch client with 403 and serves 200 to curl**, like
`legislative.gov.in`. All established 2026-08-13 by retesting with the client and resolver varied. Resolver pins: `ppac.gov.in` 164.100.198.160, `mea.gov.in` 13.224.236.14,
`www.pib.gov.in` 94.202.207.57. `[R-66976a]`

**M2 — a write is verified by diffing `/data`, never by the writer's own count.** Declare the
expected diff shape before the edit and abort on mismatch. A non-zero report with an empty or wrong
diff is a failure. **A JSON round-trip is not a safe way to edit a file whose formatting you did not
choose.** `[R-6a8f99]`

**A CORRECTION QUOTES WHAT IT WITHDREW, IN THE SAME FIELD.** *Gated by `quotation-identity` for
whether the quotation matches a value the field held; nothing gates whether a correction was made at
all.* **The one exception: the convention does not apply where the FIELD DID NOT EXIST before the
correction** — a correction of an absence says that it is one. `[R-8a7dff]`

**A correction guard asserts a presence, never an absence.** A guard forbidding a token fires on a
correctly corrected record, because the withdrawn wording survives inside the sentence recording the
withdrawal. Assert the specific string in its specific context and count occurrences. `[R-f674d0]`

**The system resolver on this machine is broken — pin before recording any host as unreachable.**
Government hosts return HTTP 000 to a plain `curl` and resolve under `dig +short @1.1.1.1`;
`curl --resolve host:443:<ip>` then works. This is an ENVIRONMENT FACT, not a finding. `[R-03cdc0]`

**A claim about a CLASS of sources is tested by varying the host, not by accumulating failures
within one.** Two failures from one domain are one observation. Before writing "sources of kind X
are unavailable", retrieve something of kind X from a DIFFERENT publisher. **The wrong
generalisation suppresses records silently and looks like diligence.** `[R-5bd94b]`

**Any scan of retrieved text goes through `tools/lib/corpus-search.mjs`** — `scanText`, or
`node tools/scan-text.mjs <file> <term>...`. Word boundaries are the default; `--substring` is the
visible opt-out and is printed in the output. `[R-60cee4]`

**A zero from a boundary scan is retried with morphological variants before it is banked as an
absence** — `--variants`. Boundaries produce false negatives exactly as substring matching produces
false positives; a false negative costs a missed candidate and a false positive costs a fabricated
finding, which is why the default stays and the retry is what makes it affordable. `[R-60cd4c]`

**Bound a search by the record, never by a character count.** A fixed window over variable-length
records finds the anchor on short records and misses it on long ones with no sign which happened.
Write anchors that abort, never anchors that shrug. `[R-cc1836]`

**`record.get(field) or []` renders an ABSENT field and an EMPTY one identically, and they are not
the same fact.** Test `field in record`, print which case it is, and let an anchored edit ABORT
rather than create a field it has invented. `[R-6563b5]`

**A GUARD THAT RUNS AFTER THE DESTRUCTIVE OPERATION IS A POST-MORTEM, NOT A GUARD.** Every check
deciding whether a write is safe runs BEFORE the write, in the same operation. **The mechanical
form: read, compute, ASSERT on the computed content, then write.** Where the target is not in
version control, write to a temporary path, assert on THAT, and rename over the original. **And put
the file in git**, which is cheaper and stronger than any rule here. `[R-976cb5]` `[R-5b397f]`
`[R-fe93aa]`

**Verification and commit go through `npm run commit`, not through the shell.** It runs the gates,
reaches `git commit` only on green, takes its message from a FILE, and has no flag that skips a
gate. **A rule that is right and keeps not being followed is a mechanism problem.** `[R-8f2b10]`

**Run record edits and their allowlist deletions as ONE chained operation.** Two writes that must
agree are one operation; shell newlines do not enforce that. `[R-c0895b]`

**Search the NOUN that cannot be paraphrased away, not the assertion around it.** A claim propagates
in the author's own paraphrases; the assertion gets rewritten while the subject noun survives.
`[R-fba1ee]`

**When verifying a claim about state you have just modified, verify against the state as it was when
the claim was made.** Re-read the claim's own timestamp before trusting a re-run. `[R-6465ca]`

### The governing principle, ruled by the operator 2026-08-06

> **No record or claim stands on a source that is not credibly independent of what it establishes.**

**The tier ladder grades the artefact; this grades the relationship between the artefact and the
claim it is made to carry.** Both are asked of every citation and they have different answers: a
ministry press release is a T1 document and, on whether that ministry succeeded, no evidence at all.
`[R-fe2307]`

**RULING 1 — `worked` REQUIRES EVIDENCE INDEPENDENT OF THE ANNOUNCING BODY.** **Where no independent
source exists the record is not `failed`** — the outcome is *unestablished*, which is `partly` where
part is independently established or `contested` where readings diverge. A standard converting
missing evidence into a negative finding is as unsound as one converting it into a positive one.
Independence is a matter of degree and the record states which it has. `[R-ec004c]`

**RULING 1a — THE INTRA-STATE TEST.** Intra-state evidence qualifies **where the measuring
institution publishes the figure as part of its own statutory or routine function**, and not where
it appears in support of the claim. **The test is on the PUBLICATION, not the institution.** A CAG
performance audit qualifies; a PIB release carrying a regulator's number does not, whoever computed
it. The qualifying source must bear on the LIMB IN DISPUTE, and the document must be HELD — a test
passed against a source the instrument does not hold is not passed. State plainly that such records
rest on one arm of government measuring another. `[R-16013f]`

**RULING 2 — AN UNMEASURED LIMB PREVENTS `worked`.** Where any one announced objective is unmeasured,
`worked` is unavailable and the verdict is `partly`. No centrepiece exception; objectives are not
weighted after the results are known. `[R-f4af24]`

**RULING 3 — A STATED, QUANTIFIED COMMITMENT WITH NO DEADLINE IS NOT `no-objective`.** It takes
`undated-commitment`. Progress is reportable though it can never become overdue. `[R-520b85]`

**RULING 4 — A FOREIGN GOVERNMENT PRIMARY TAKES ITS OWN TIER, `T1F`.** `[R-84fb82]`

**RULING 5 — AN OBJECTIVE MAY BE IMPOSED AS WELL AS ANNOUNCED.** **A duty imposed by an external
authority is a legitimate objective for scoring, provided the record names the instrument, the duty
in the instrument's own words, and the duty-holder.** Four conditions: the obligation is imposed,
not volunteered, and an absent deadline does NOT move an imposed duty to `no-objective`; the duty
must be the one the finding is about; naming an instrument is not breaching it; an absent duty is
not a duty. **Does not reach an objective INTERNAL to the measure**, which is the ordinary
definition of `failed`. `[R-cb7e00]` `[R-569903]` `[R-7610f8]` `[R-551f68]` `[R-6da271]` `[R-51946f]`

**RULING 6 — `shock` IS EXTERNAL TO THE STATE'S OWN DECISIONS.** A chain of state decisions is not a
shock, however severe. **The line is whether an act of policy caused it, NOT whose asset failed or
how severe it was.** `[R-145be1]` `[R-33d3ab]` `[R-2dd929]` `[R-6fbc49]`

**RULING 7 — TYPE BY WHAT THE RECORD IS ABOUT, NOT BY WHAT FAILED.** A record about the state's
RESPONSE to an event is typed by the response. There is no third branch for domestic non-state
events. `[R-e86225]` `[R-38d599]`

**RULING 8 — A SHOCK IS PROVENANCE, NOT A LEDGER RECORD.** A shock is a fact about the measurement
environment, not a government claim. **Two things unsettled and inherited rather than rediscovered:**
where a shock that breaks no series lives, and that admitting shocks widens `ProvenanceRecord`'s own
definition — a schema question this ruling authorises nobody to answer. `[R-de6468]` `[R-c00b66]`
`[R-9604fc]`

**RETYPING IS VERDICT-ADJACENT AND IS NOT AUTHORISED BY THESE RULINGS.** `[R-8b468a]`

**RULING 9 — THE MULTI-OBJECTIVE DISCLOSURE RULE.**

> **Where a commitment states several objectives and the verdict rests on fewer than all of them,
> the record names which objectives ground the verdict, which do not, and why — and every ungrounded
> objective is entered as an absence.**

**It is a disclosure requirement and it restricts one value only.** `worked` unavailable (Ruling 2);
`failed` STANDS with its ground stated, because restricting it would convert a demonstrated failure
into a non-finding; `partly`, `contested` and `too-early` are disclosure only, and `too-early` is
named explicitly because a rule written for the `failed` side would otherwise sweep in records where
nothing is wrong. **Three things it must not do:** make an unmeasured limb an excuse; treat an
*unquantified* limb as an unmeasured one; sweep in `too-early`. **THIS RULE IS UNENFORCEABLE TODAY
AND SAYS SO** — nothing in the corpus records that a record announced several objectives.
`[R-9d8edc]` `[R-aebca0]` `[R-827cba]` `[R-668a84]` `[R-2250c6]` `[R-54ddd7]` `[R-b2aea3]`

**A STRUCTURED VALUE NEVER MOVES ALONE — the point-of-change rule.** When a `type`, `assessment`,
`contestedGround`, `tier`, `reasonKind` or `directionOfBias` value changes, **the prose fields that
restate it are searched and corrected in the SAME operation**, before the write. Read the record
whole, not the field being changed.

**IT IS A RULE AND NOT A CHECK, AND THE MEASUREMENT IS THE ARGUMENT.** A scan finds a restatement
only where the value's spelling cannot occur in ordinary prose. `no-objective`, `too-early`,
`awaiting-adjudication`, `undated-commitment`, `evidence-withheld` and `overstates-pre-2014` are
findable; **`shock`, `event`, `episode`, `reform`, `institutional`, `criterion`, `measure`, `time`,
`worked` and `failed` are ordinary English words**, so `type` and `contestedGround` return zero
findable restatements at any precision — **and `type` is the axis on which the defect happened. A
gate built on this measurement would report clean on the failure it was built for.** And a mention
of another value is usually CORRECT: 31 of 32 measured. `[R-9a2207]` `[R-91e5c3]` `[R-e60ad7]`
`[R-94d865]`

**A VALUE LANDS IN THE SCHEMA, THE TYPE AND THE LABEL MAP IN ONE COMMIT.** *Enforced by
`enum-parity`, which compares declarations as sets in both directions and checks `allOf`/`if`/`then`
branches as subsets whose omissions are declared by name in `CONSTRAINT_OMISSIONS`.* `[R-ef2ff4]`

**SELECTING BY A STATED, CHECKABLE CRITERION IS NOT RANKING.** Rule 9 was doing a second job nobody
intended — because any lead implies a choice, every page dumped everything at equal weight, and a
corpus that contains everything says nothing.

**THE DISTINCTION IS WHETHER THE CRITERION IS STATED AND CHECKABLE, NOT WHETHER SOMETHING COMES
FIRST.** *"Chosen for the longest unbroken run in this area, not for importance"* is a fact a reader
can verify and disagree with. *"The most important series in this area"* is a judgement with nothing
behind it. **The first is selection; only the second is ranking.**

Three conditions, all required. **The criterion is printed where the selection is made**, not on a
method page. **It is computed from the data**, so a later cycle re-derives it. **And it does not
smuggle a merit claim** — longest run, most recent, largest N, earliest all describe the record;
*best*, *most significant*, *headline* do not.

**WHAT THIS DOES NOT LICENSE.** Not an exception to rule 9; no ranked list, no score, no order
presented as merit. What it permits is ONE thing shown first with its reason attached — and where
the reason cannot be stated in a checkable sentence, everything shows at equal weight.

**A pinned editorial choice is the other legitimate form and is NOT this one.** The overview board's
headline series are hand-picked with the governing rule cited. That is an authored decision defended
by a rule; this is a derived selection defended by a criterion. **Each says which it is.**
`[R-2fa82b]` `[R-06c902]` `[R-43051b]` `[R-6a789c]`

**A TOPIC IS ONE PAGE, NOT FIVE — merged 2026-08-14.** `/domains/<d>/` carries the lead chart, the
period narrative, then `#indicators`, `#records`, `#disputes` and `#missing` as sections. The five-
route form was measured first: **70 pages, 6.36 MB, and every overview's records 100% contained in
its own tabs.** The lens pages had already been doing all four on one surface. **What was lost is
stated rather than glossed: a tab was a URL and a section is a fragment** — addressable, no longer
isolable. `/domains/` itself was folded into `/overview/`, which linked the same fourteen topics
with the same counts and the same derived lead; the one thing it carried alone, the topic character
line, moved onto the board's cards. *`interface-invariants` binds the four sections and their
orientation lines; `domain-coverage`'s index is now `/overview/`.*

**A MARK CAN GO MISSING IN THREE DISTINCT SHAPES, AND A GUARD USUALLY BINDS ONE.**
1. **THE LISTING ROW** — the surface lists the record and omits the mark. `listing-marks` binds this
   and is the only one of the three any gate binds.
2. **THE NARROWING PROJECTION** — a type or function between `/data` and the view drops the field,
   so the component never had it. **No care in the component catches this.**
3. **THE EMBEDDED FEATURE** — the component HAS the whole record and renders no marks, on a surface
   that is not a listing.

**Both render gates were correct on 2 and 3**: `listing-marks` binds listing ROWS and a feature chart
is not a row; `field-render-audit` asks whether a field reaches its OWN record's page, and it does.
A record embedded as a feature is outside both scopes by construction. `[R-a1dcda]` `[R-aa2ac9]`
`[R-8a49a7]`

**A DEFECT FIXED ON ONE SURFACE IS CHECKED AGAINST EVERY SURFACE OF THE SAME KIND IN THE SAME
COMMIT — the local-fix rule.** **The correction is not the fix. The correction is the SWEEP** — name
the class, enumerate its members from the code rather than from memory, and report the ones already
clean alongside the ones changed, because a sweep reporting only its finds cannot be distinguished
from a sweep that did not run. **Two things it does not say:** it does not say fix every surface —
where a member is deliberately different, record why and leave it; and it does not reach ACROSS
classes. **No gate reaches this** — whether two surfaces are "of the same kind" is a reading. What is
checkable is that the sweep HAPPENED: the batch report states the class and its enumerated members.
`[R-b202cb]` `[R-3ab92a]` `[R-91dd62]`

**EVERY RULE IS EVALUATED AGAINST ONE SNAPSHOT, AND THE CORPUS IS WRITTEN ONCE — the single-snapshot
rule.** Where two rules read the same field, applying them in sequence makes the ORDER decide the
outcome, and the order is an accident of how the batch was written. Read the corpus into memory,
evaluate every rule against **that** snapshot, collect the changes, write once. Where the outcome
genuinely depends on order, that is a dependency to be **stated and decided deliberately**.
`[R-ffda02]`

### THE PHASE LIST — this is it, and there was not one before

**A phase name asserted from memory is a premise until it is read off this table.** `[R-67fdb6]`

| # | phase | state |
|---|---|---|
| 1–9 | the domain phases | closed |
| **10** | **INSERTED — not on the original list.** Numbering in any pre-insertion note is offset by one. | closed |
| 11 | | closed |
| 12 | **partly covered delimitation** | closed. The *see below* was 13's condition, met 2026-08-13 |
| 13 | | **CHECKED 2026-08-13 — the overlap is resolved and this row's condition is met.** The phase-12 overlap is J&K delimitation and both phases covered it: 15 records use delimitation vocabulary and **every one is Jammu and Kashmir**. **What neither covered is NATIONAL delimitation** — the freeze on Lok Sabha seat reallocation — which is a CORPUS gap raised in `drops/phase-18-design-lock/STATE.md`, not a phase-13 residual |
| 14–15 | 15 = environment and energy | closed |
| — | the adversarial-review and rulings cycle | closed 2026-08-06, `drops/cycle-review-and-rulings/` |
| **16** | **shocks calibration** | **CLOSED 2026-08-06**, `drops/phase-16-shocks/` |
| **17** | **independence** — `objectives[]` sequences FIRST within it | **CLOSED 2026-08-10**, `drops/phase-17-design-lock/` — the directory name records a NAME COLLISION, not a renumbering |
| **18** | **design lock** | **OPEN**, `drops/phase-18-design-lock/`, governed by its `DESIGN-SCOPE.md` rev 3 |
| **19** | **polish** | |

**Phase 17 is independence; the design-lock work belongs to 18** — the operator ruled the table
right against the name it was opened under. The phase-17 directory name is wrong and is LEFT wrong,
on the same principle that leaves a withdrawn wording quoted. **Two things a cold read must not
assume:** phase 10 was inserted, so pre-10 notes are one behind; and delimitation was partly covered
in phase 12 — **13's completeness was open on that ground until 2026-08-13 and is now closed on it**,
the overlap being J&K in both phases. *`phase-name` gates assertions of a phase name in
tracked files, including headings and table rows.* `[R-908845]` `[R-85acb6]` `[R-6190af]`
`[R-786c55]` `[R-74972d]`

### THE COUNTERFACTUAL ENGINE — CONSIDERED AND DECLINED, 2026-08-06

**Not unbuilt. Declined, with the reasoning recorded**, so a later cycle does not rediscover it as
an obvious gap and build it. **The decision stands on three things**, and not on the weakest of them:
rule 8 applied honestly to Indian data usually outputs *"the two methods disagree and the fit is
endpoint-sensitive"*, which prose can say without an engine; the statistical review the verification
log requires has never been obtainable; and the 2026-08-06 cycle removed things that resemble
measurement without being it. `[R-fdcdaa]` `[R-1fa1c2]` `[R-a28f8d]` `[R-fa94f7]`

**ENGINE OUTPUT MAY NOT BE CITED BY A SCORED RECORD.** Output lives in its own layer, renders visibly
unlike measured data, and never enters `sources[]`. A record may reason about a counterfactual in
prose and say that it is one; it may not rest on it. `[R-73d8de]`

**A SELF-AUDIT DOES NOT BELONG IN THE SCORED LEDGER.** A derivation over the corpus's own `/data` is
the corpus restating itself. Such findings stay published as method at `/derivations`. **The test for
a future record is whether anything outside this corpus would have to change for the finding to
change.** If nothing would, it is method. `[R-83a20d]`

**GRADE THE DOCUMENT, NOT THE SERVER — the mirror rule.** Identical bytes ARE the document; a
judgment from a legal-news mirror or a ministry PDF from the Internet Archive keeps the tier the
document earns. **An ACCOUNT of a document is T4.** The line is between holding the artefact and
holding somebody's description of it. **Two authoring requirements, neither optional:** record the
RETRIEVAL PATH with the citation, and where the original no longer resolves record that beside it —
a publisher's deletion is evidence about the publisher, not about the evidence. **What this does not
settle:** a foreign government primary retrieved directly still has no class in the ladder.
`[R-e375af]` `[R-16e4cc]` `[R-db06cf]` `[R-10304c]`

**A tier moves only when the EVIDENCE moved, and the merge asserts which direction.** Move it when
the stated reason for the tier no longer holds, and prove which case you are in before writing.
`[R-4294bb]`

**Sweep by self-documented failure, not by host count.** A record whose source name already states a
retrieval failure has isolated the missing variable. State the pattern beside the count. `[R-0121e4]`

**A finding produced by a correction cycle gets the same scrutiny as the finding it corrects.** A
correction arrives with the authority of having just fixed something, which is why it is the least
questioned thing in the room. **Three consecutive cycles each produced a false finding while fixing
a real one.** Re-derive a correction's own claims before building on them. `[R-64b076]`

**An identification is not established by a match at ONE point. Match every point the record
carries.** One agreement is a coincidence with a plausible story attached. **A PARTIAL match is more
dangerous than no match** — no match prompts a search; a partial match prompts a theory, and the
theory then explains away the part that does not fit. `[R-b605d2]` `[R-16c962]`

**READ THE LABEL BESIDE THE VALUE.** Five iterations of one error in four cycles. **Before concluding
from a field, read the record.** `[R-3e8eef]`

**When an identification could be GUESSED correctly, match it against the record's own value instead,
and record the query in the source name.** Where the match fails, say so IN THE RECORD and attach no
identification. `[R-2e7641]`

**A FIELD VALUE is no more a finding than a count is.** A fragment read alone misleads exactly as a
count does. `[R-cb1d32]`

**A detector's scope silently defines the size of its finding, so state the scope beside the count.**
A count with an unstated scope is wrong by an amount nobody can see, including the author.
`[R-bd9713]`

**WHERE AN AXIS IS STORED IN MORE THAN ONE PLACE, THE UNION GOES IN `lib/data.ts` WITH THE COST OF
GETTING IT WRONG WRITTEN BESIDE IT, AND NOTHING COUNTS THAT AXIS BY HAND ANYWHERE ELSE.** `tier` sits
inside `sources[]` on ledger and provenance and ON THE RECORD for a series. `citations()` and
`tierCounts()` are the only sanctioned way to count a citation. **TypeScript cannot catch this class**
— it objects when two same-named fields have different TYPES and is silent when they have the same
type at different DEPTHS, so the fix is an accessor and a comment, never a signature. **The next
candidate is the domain axis**, which has three shapes and a fourth name. `[R-c328f8]` `[R-ada599]`

**A NON-ZERO count is a candidate list, not a finding, and the context is read before the count is
banked.** No scanner catches a term that matches correctly and means something else; only reading the
surrounding text does, which is why `scanText` returns contexts. `[R-294fe9]`

**Boundary matching is meaningless beside a punctuation character, not merely strict.** `matcher()`
attaches each boundary only where the adjacent character of the TERM is a word character. `[R-a1b937]`

**A zero from a document that predates the question is not an absence, and it looks identical in the
count.** Check the document could have contained the thing. Distinct from a CHECKED absence, where
the document is the natural place, covers the period, and does not carry the item. `[R-469c01]`

**THE PROSE SHADOW — a prose field that RESTATES a structured value goes stale silently when the
structured value moves, and no gate can see it.** The three render gates prove a prose field is
THERE; none reads what it SAYS. **The defect is per-field, not per-record**: a rescore that rewrites
one prose field leaves its siblings asserting the old value. `[R-271615]` `[R-eb0d5d]` `[R-5800e0]` `[R-72b77c]` `[R-f90ab5]`

**A COUNT DERIVED FROM A KEYWORD SCAN IS NOT A FINDING UNTIL THE MEMBERS ARE READ, AND THE TERM LIST
IS REPORTED WITH THE COUNT OR THE COUNT IS NOT REPORTED.** **LABELLING A COUNT AS CANDIDATES DOES NOT
STOP IT BEING SPENT AS A FINDING** — in four measured instances the label was present and the number
was used anyway, one paragraph later, to rank a risk or size a population. So: **read the members, or
do not state the number.** A count with unread members may be reported only as a bound with the
reading owed named. **Where a count comes from a field test rather than a scan, say that** —
`assessment === 'failed'` is exact and needs no term list. **One further trap:** a scan over
`assessmentNote` measures what records SAY about themselves, not what is true of them. `[R-213374]` `[R-114a0f]` `[R-76d131]` `[R-aa3685]`

**Assert per record, never sweep.** A keyword or pattern search generates CANDIDATES; the judgement
is made per record and written down per record. Three substring sweeps in one phase produced 59, 197
and 7 false candidates. **Word boundaries are the default; `substring: true` is the explicit,
reviewable opt-out.** `[R-8c16f1]`

**Observe the effect, do not match the spelling.** Where a property can be observed, observe it.
Import the module and look at the disk. `[R-ad48e3]`

**Every negative control needs a same-form positive that passes THROUGH the restriction the negative
depends on.** A check reporting clean with no positive beside it proves the needle absent, not the
search working. `[R-a1532f]`

**A VERIFICATION READS THE PAGE THROUGH THE GATE'S OWN NORMALISER, OR IT IS NOT A CHECK.** Import
`norm` and `pageTextFromHtml` from `tools/lib/page-text.mjs`. Do not reimplement them, do not "just
strip the tags", do not fold entities at the call site. **The cost runs in the worst direction every
time** — a false failure sends someone hunting a rendering bug that does not exist. **A disagreement
between the gate and an ad-hoc check is evidence about the check.** `[R-1376b1]`

**The deploy path is no longer hand-written.** `tools/deploy-check.mjs` derives every needle from
`/data` in the same operation and carries a same-form negative control on every page. Deliberately
NOT in the build: it needs the network. `[R-f68889]`

**A NEGATIVE CONTROL ASSERTS AGAINST A STRING READ FROM `/data` AT THE TIME OF WRITING, IN THE
CONTEXT IT APPEARS IN.** Never a needle typed from an idea of what the record says, and never a bare
"this token must be absent". **The mechanical form: read the value from `/data` in the same
operation, assert it in its surrounding sentence, and COUNT OCCURRENCES.** `[R-d58761]` `[R-d982ba]`

**Every zero result is confirmed by relaxing one restriction at a time until it goes non-zero — the
restriction that flips it is the finding.** A zero that stays zero under full relaxation is the only
citable zero. `[R-441811]`

**No new bare-domain roots.** Deep-link every source. T1 on a bare root is worse than T4: it asserts
primary strength for a citation that retrieves nothing. *Gated by `no-bare-root` on `/data`.*
`[R-70fa69]`

**A publication choice is not a retrieval failure.** The test: could a better retrieval technique
produce the figure? `[R-2e173d]`

**AN ABSENCE-OF-PUBLICATION CLAIM REQUIRES A STATED SEARCH, AND TRYING GUESSED IDENTIFIERS IS NOT A
SEARCH.** State which was done: an INDEX ENUMERATED, an ARCHIVE CONVENTION READ OFF A LIVE PAGE, or
NAMED ROUTES EXHAUSTED with what each returned. **Absent one of those the honest wording is "not
searched", not "not published".** "Not published" has meant "not searched" three times in phase 15
alone, and each time the document was there. **The asymmetry is why this needs a rule rather than
care:** a guessed URL that 404s produces the same silence as a document that does not exist, and
three 404s read as confirmation when they are three observations of a filename convention.
**`reasonKind: not-published` and `not-collected` are claims about the world and inherit rule 5d in
full; `not-searched` is not a schema value, so where that is the truth the entry says so in its
`why` and takes the weaker of the available kinds.** `[R-c7cf4d]` `[R-c4248e]` `[R-06e946]`

**Read the previous batch's report as an adversary before starting new work.** A batch cannot
proofread its own output but it can audit the batch before it. **Run the checks in this order, by
observed yield and not by ease:** 1. COUNTS reconciled against the gate's own emitted scope at that
batch's END commit — mid-batch gate runs are the specific trap. 2. ATTRIBUTIONS — what a delta is
said to consist of against what changed. 3. SCOPES — every figure traced to the gate that emitted it,
and named; a figure no gate emitted is a fabricated scope even when true. 4. Every state line matched
against its resolution. 5. No verdict contradicted by its own note. 6. **ARITHMETIC LAST** — 33 of 34
recomputed claims were exact while the same batches carried four count-or-attribution defects. Write
what this finds into `STATE.md` as queue items **before** starting the arc. `[R-664100]`

**A STOP WHOSE PREMISE LOOKS WRONG IS STILL A STOP.** **What a run does when it believes a stop's
premise is wrong: report the measurement and the objection TOGETHER, and stop.** Not the measurement
alone — the objection is the useful half. Not the redesign — that is the decision the stop reserved.
**The distinguishing question is cheap: would the operator recognise what shipped as the thing they
asked for?** Where the answer is no, the run is deciding rather than reporting, however good the
substitute. `[R-3cf975]` `[R-f7360d]`

**STOP and report, do not proceed:** a shipped verdict changes, or a schema, enum or gate contract
changes. **Commit the work already done and the finding to `STATE.md` first, then stop.**

**Report at the end of the batch, keep working:** a structural finding spans phases, or the run is
about to file something it cannot fully justify — in which case file the value that makes the fewest
false assertions and state in the note which of those assertions are false.

**Everything else runs to completion:** plan, arc, self-audit, gates, commit, **and push.** Push is
autonomous; the gates are the condition and `npm run commit` has no flag that skips one. **Verify on
the production deploy after pushing.** `[R-43a113]` `[R-6130f6]` `[R-a9231c]` `[R-cc1d03]` `[R-eeb577]` `[R-212c73]`

**A flag raised against a record is checked against the RECORD, not against the report that describes
it.** **A report is a lossy summary written by the party being audited.** Open the record, quote the
field, then judge. `[R-bf648a]`

## Session cost

Orientation is paid for at the start of every session, so it is measured and kept small.
**Every figure in this section is a measurement with a date, and it has gone stale twice.** Re-measure
before quoting.

**Measured 2026-08-11, after the rulebook split:**

| file | before the split | after |
|---|---|---|
| `CLAUDE.md`, charged every turn | 121,001 B / ~30,250 tok | **51,457 B / ~12,900 tok** |
| live `STATE.md`, read cold at session start | 20,231 B / ~5,060 tok | **5,465 B / ~1,370 tok** |
| **orientation total** | **141,232 B / ~35,300 tok** | **56,922 B / ~14,200 tok** |

**~21,000 tokens saved per turn**, and CLAUDE.md is charged on every turn rather than once per
session, so the saving multiplies by the turn count of a batch.

**Read on demand, never resident:** `docs/rules-earned.md` (132 KB, by key),
`state/phase-18.md` (20 KB, the archive index in the live file points into it).

**`docs/verification-log.md` is 991 KB and is never read whole** — grep it for the question.
**`/data` is not read for orientation at all** — read `docs/corpus-manifest.md` (71 KB), generated by
`tools/gen-manifest.mjs` as a build step. **A hand-kept index of a corpus that grows every cycle is
stale within one cycle, and a stale index is worse than none.** `docs/rules-earned.md` is **not** an
orientation file: it is read by key, when a rule's reason is in question. `[R-ec1181]` `[R-37d513]`

**DOM PROBES ARE AUTHORITATIVE; DO NOT ATTEMPT SCREENSHOTS.** The Browser pane reports
`document.hidden === true`. Three consequences are recorded environment facts, not bugs: Chrome
clamps `setInterval` to ≥1000 ms, CSS transitions do not run, and **screenshot capture returns a
blank image after any scroll.** Verify rendered output by reading the DOM — geometry via
`getBoundingClientRect`, computed styles via `getComputedStyle`, text via `textContent` — and by
reading the built HTML bytes. **The blank capture has cost a diagnosis roughly six times**, and every
attempt spends an image plus the reasoning around it. A screenshot is worth one call only for a first
above-the-fold view immediately after navigation, before any scroll.

**DELEGATE MEASUREMENT TO A SUBAGENT.** A sweep over the built site, a distribution count across
`/data`, or a codebase investigation reads many files and returns one number. **That reading belongs
in a separate context which reports the number back, not in the main one**, where every file read
stays resident for the rest of the batch. Send the question and the method; require the answer to
name the scope it was computed over, so the returned number is usable under the count-and-scope rule
above. Keep in the main context only what the batch must reason about directly — the records being
edited, the gate output, the file being written.

**A GATE'S SCOPE IS CHECKED, NOT JUST ITS VERDICT.** A gate can PASS while examining less than it
did, and a floor catches only the collapse to nothing — **a scope that halves still passes a floor.**
On 2026-08-13 a change took `listing-marks` from 4,167 rows to 3,041, dropping 1,126 real listings,
and every gate stayed green; it was caught because a baseline had been written down by hand, which is
luck about note-taking rather than a property of the system. `docs/gate-scopes.json` records what each
watched gate EXAMINES — never what it finds — and `gate-scope` fails on any movement, so the number
has to reach a commit message. **A pattern that stops matching is also a failure**, because a
reworded summary line silently removes a figure from the ledger and that is the same defect one level
up. `[R-scope1]`

**Gates are silent on success.** One summary line each; full detail only on failure or with
`--verbose`. Anything asserting on a gate's PASSING output must pass `--verbose` explicitly.
`[R-7894db]`

**Retrievals are bounded by default.** Fetch what answers the question and raise the limit per
document only when the document warrants it. `[R-e118e7]`

**Author the batch, then gate.** Do not interleave a full gate run with each record. `[R-7b3c48]`

## Gate discipline

**Gates that read built output refuse to run against a stale build** (exit 2), and exit 2
distinguishes "no build" from "stale build". **The direction that matters is the false PASS:** a gate
reading the previous build finds every mark it already knew about and reports clean. `[R-29afe7]`

**Every fixture asserts the specific failure it tests for — the branch, the message — never merely
that a failure occurred.** `[R-fa2f72]`

**Generated fixtures carry `GENERATED-FROM.json` and the selftest fails on enum drift**, naming
`npm run regen:lens-fixtures` as the fix. `[R-ca95b0]`

**A failing check, re-run with no fix applied, must still fail.** Both assertions are required.
**No checker imports from its own repair path.** `[R-cd47c6]`

**Any gate asserting a property of a field cites the schema.** If the property is not in the schema,
either put it there or drop the assertion. `[R-3766d7]`

**A GUARD BINDS A SCOPE, AND THE CLAIM IT PROTECTS HAS ITS OWN. WHEN YOU ADD A GUARD, WRITE DOWN
BOTH.** The gap between them is silent by construction: the guard passes, and the claim outside its
scope is unprotected with nothing to report it. **The test is one question asked at the moment the
guard is written: if the claim moved one level out — to another field, another layer, another record,
a sentence about the data rather than the data — would this guard still see it?** Where the answer is
no, say so in the guard's own header. **A deferral with a measured rate and a named next step is a
different object from a deferral that says "logged"** — and the rate must be RE-MEASURED, or it
degrades into the second kind silently, because a report-only tool is in no build. `[R-a87935]`
`[R-9016c2]`

**A field lands in the schema, the TYPE, a VIEW and `reachability`'s guarded-marks list in ONE
commit.** Miss either of the last two and the field renders nowhere while every gate stays green,
because `reachability` guards a LIST and a field absent from it is unguarded BY CONSTRUCTION. **Where
a field is deliberately not rendered, write that in its schema description and leave it off the
list.** A view added only to satisfy this rule is worse than the defect. `[R-f0bf87]`

**A GUARD'S FIELD FILTER IS A SCOPE, AND `!enum && !format && !pattern` WAS THE LARGEST ONE IN THIS
INSTRUMENT.** Both render gates once selected prose by that test, so every verdict, tier, stated
reason, boolean and formatted number sat outside every render assertion by construction. **A
non-prose value cannot be looked for as itself**, so every non-prose field declares how it renders in
`tools/lib/value-renderings.mjs`, and **the labels there are PARSED OUT OF THE MODULES THAT RENDER
THEM rather than retyped**; a map that has moved or changed shape aborts the gate and never falls
back. **There is no third state: DECLARED or EXEMPTED BY NAME in the field's own schema
description**, and where an exemption is a debt rather than a decision it records the debt.
**Enumerate the complement, never the shapes you know about** — the enumeration lives once, in
`tools/lib/schema-fields.mjs`. `[R-353784]` `[R-6b8cdc]` `[R-d013f0]` `[R-6a56ef]`

**Run the field-render audit every phase at stage 7 and state its count, per layer.** `npm run
field-render-audit`, in the build. Any non-zero difference between records carrying a field and
records whose own page contains it is invisible data. `[R-0a475f]`

**Normalise the page and the value with the SAME function, and never hand-roll a second one.**
`[R-1376b1]` `[R-e26127]` `[R-badc0f]`

**THE DEPLOY RUNS THE BUILD.** `vercel.json` calls `npm run build`, and `tools/deploy-chain.mjs` —
first step in that chain — fails if it ever restates the steps instead of calling them. **What it
cannot bind, and says so:** a build command set in the Vercel dashboard overrides the file and no gate
here can see it. `[R-0ca710]` `[R-0aa8bc]` `[R-3759c7]`

**Do not pipe gates** — an exit code does not survive a pipe. **And a structural check passes on a
stub: structure passing is not content passing.** `[R-bf851c]`

**`figure-consistency`** checks declared arithmetic claims against BOTH their source values and their
printed operands. A non-reconstructing figure must be declared, not merely correct. `[R-8f1967]`

**The gate list, run in full every cycle:** `deploy-chain` · `validate` · `typecheck` ·
`validate:selftest` · `reachability` · `no-unguarded-prose-field` · `field-render-audit` ·
`quotation-identity` · `domain-coverage` (carrying `lens-empty`) · `figure-consistency` ·
`css-vars` · `enum-stamp` · `phase-name` · `listing-marks` · `rendered-space` · `unrecognised-rows` · `gate-scope` · `url-check`
on `/data`. Plus an arithmetic hand-check of every derived figure, a check that every declared lens
returns a non-empty and correct set, and zero forward references between `parts/` files.
`[R-7d9f2e]`

**`css-vars` IS THE FIRST GATE OVER THE STYLESHEET ITSELF, AND A FALLBACK IS WHAT MADE ITS DEFECT
INVISIBLE.** `--mono` was never a token — the name is `--font-mono` — and eleven rules asked for it,
every one a system label, every one silently rendering in the inherited sans. **A TWELFTH SURVIVED
THE HAND SWEEP THAT FIXED THE ELEVEN**, because `var(--mono, monospace)` fell back to a generic
monospace: invisible to a search for the broken pattern and invisible on the page. **A fallback does
not make an undeclared property correct; it makes it quiet**, which is why the gate's control
asserts the fallback case specifically. Declarations are collected from the stylesheets, from
`next/font` `variable:` entries, and from TSX inline styles in BOTH spellings the codebase uses —
reading one would have reported `--scrub-t` and `--w` as phantoms. It found `--rule-strong`, used
twice and declared nowhere, on its first run. *It says nothing about UNUSED declarations: that is
dead weight, not a rendering defect, and folding them together would make one failure mean two
things.*

**`rendered-space` is the first gate over the SHAPE of rendered prose rather than its presence.** SWC
trims whitespace at the start of a JSX text chunk spanning a newline, so `{total} series begin` welds
when the line wraps after `begin`. **The defect appears and disappears with paragraph re-wrapping**,
which is why care does not reach it and a gate does. The fix is `{' '}` after the expression, every
time. `[R-f7bc74]` `[R-3ed5fb]` `[R-1e5114]`

**`quotation-identity` is the second gate over something `/data` does not contain, and the first was
`record-history`.** Its input is git. It gates rather than reporting because the measured backlog is
zero, and it skips on a shallow checkout. `[R-df9df5]`

**`phase-name` is the first gate over PROSE ABOUT the corpus rather than over the corpus.** It is
buildable only because the object is named, the authority is declared and the vocabulary is closed;
**where any one of the three is missing, this form does not transfer.** It asserts a PRESENCE IN
CONTEXT and never an absence. `[R-6093f0]`

**The three rendering gates are different in kind and none subsumes another.** `reachability` walks
the guarded-marks list and is ENUMERATION-SCOPED. `no-unguarded-prose-field` binds that list to the
schemas, so a field cannot be merely forgotten. `field-render-audit` ignores both and observes the
built output directly — it is what catches a field nominally guarded and suppressed anyway.
`[R-25cd70]`

## Authoring conventions

**The four measurement categories.** A record must say which it is:
1. **`differentFacts` pair** — two instruments measuring the SAME quantity and disagreeing. Both
   sides retrieved, same period and basis. Never averaged, never picked.
2. **Single-sided** — one party publishes and the other does not. The absence is the finding,
   localised by relaxation before it is recorded.
3. **Incommensurable** — instruments measuring DIFFERENT quantities. No conversion, no side-by-side.
   **Agreement between them is as unsound as disagreement and reviews clean.**
4. **Mutually declined** — BOTH parties decline the same quantity, differently. Record the absences
   separately with their own `reasonKind`. `[R-4791d6]` `[R-8c67e9]`

**Share-shaped figures name their numerator and denominator.** If either is unstated in the source,
that is the finding — do not infer the obvious one. `[R-96117a]`

**Commitment states.** Every commitment record resolves into one, stated rather than implied:
**(a)** not yet due — trigger date or condition named; **(b)** due and undelivered, with evidence of
non-delivery; **(c)** abandoned, with evidence. **Absence of news is not (c).**
**(d) unfalsifiable by construction** — a total with no date, no phasing, no annual target. It sits
outside the other three and the record says which test it fails. **Score it `no-objective`: an
objective is a target that can be failed.** A total WITH a date is (a); a condition rather than a
date is still (a) if the condition is observable. `[R-2664d8]` `[R-525ce4]`

**Procurement filing rule, settled.** Acquisition cost, capital-budget share, payment schedule and
escalation file `macro`; indigenisation share, offsets, exports and DAP domestic content file
`foreign`; a G2G deal read as a diplomatic instrument files `foreign`. `defence-sector` lens on all
of them. `defence` as a DOMAIN remains armed conflict and counter-insurgency. `[R-cd9080]`

**A lens is admitted when its records land, not when it is planned**, and only where the instrument
holds a FILE. A lens over one record is a filter returning what the reader already had. `[R-c244ce]`

## Phase stop conditions

Distinct from the code-session stops above. A phase run halts, reports and waits only for:
1. A source that cannot be retrieved and that a record materially depends on — scoped to that
   record's file, not its arc.
2. A lens or enum change requiring a new principle rather than an application of an existing one.
3. A gate failure surviving two independent reproductions per M1.
4. Anything requiring a phase 11 or 13 record's SUBSTANCE to change. Lens additions are not substance.

**Room is a real constraint and is not a stop condition. A clean partial beats thin records** — close
what is done, state what is not, and say whether it was attempted. `[R-db403e]`

## Build workflow

- Run phases autonomously: plan → apply → self-verify → commit → push.
- Stop only for: (a) new security surface; (b) destructive or irreversible actions.
- **Additive-only for `/data`:** corrections edit the record and note the change in
  `docs/verification-log.md`, never by silent deletion.
- **NARROW SOURCE-EDIT AMENDMENT.** Code does not edit `/data` at source — except that **a correction
  THE SAME BATCH ITSELF RAISED AND EVIDENCED may be applied by the run that raised it.** Three
  conditions, all required: the defect was written into `STATE.md` or the log **before** it was
  resolved; the evidence is a document retrieved in that run; and the edit is to a citation, a
  reason, a scope or a wording — **never to a `points[]` value or an `assessment`.** A correction
  inherited from an earlier batch is still raised and not applied.
- **A closed verification-log entry is never edited.** Corrections are APPENDED and name what they
  supersede. An append-only log that gets edited whenever an entry turns out wrong records only the
  errors nobody caught, which inverts what it is for.
- Visual verification after significant UI changes — **by DOM probe, per the session-cost section.**
- **Verify on the production deploy after push, not just locally.** `[R-58363a]`

## Design system

- Instrument register, not dashboard-flashy: restrained, archival, dense-but-legible.
- **Dark canvas, from 2026-08-13 — this supersedes "Light canvas", which is quoted here rather
  than deleted.** Warm near-black `#1c1c1a`; the bone `#efeae0` that used to be the paper is now
  the ink. **The palette is the same palette read from the other side**, and the light one is kept
  whole under `:root[data-theme='light']` with its own measured ratios, so the decision reverses by
  one attribute. Red is still reserved for deaths, alerts and break-seams. No decorative gradients.
  **Every text token is measured against the HARDER of the two papers — which on a dark canvas is
  `--surface`, the lighter one. The direction flips; the method does not.** `--alert` is the one
  value chosen by measurement rather than inversion: at `#e5484d` it scored 3.88 and failed the 4.5
  it needs where it carries words. `color-scheme: dark` is declared, because a dark canvas with
  light native selects and scrollbars is the tell that a theme was painted on rather than declared.
- Mono for system labels and figures (tabular-nums), humanist sans for prose.
- Every view answers "what does this number rest on?" — one click to source, tier and provenance.
- Palette is Bone & Indigo, defined as tokens; nothing hardcodes a literal. `[R-34510f]`
- **ONE PAGE WIDTH, 84rem, AND THE TWO-TRACK VERSION IS QUOTED BECAUSE IT SHIPPED AND WAS WRONG.**
  It read *"TWO WIDTH TRACKS — `.shell` is 68rem and holds prose; `--wide` (84rem) with the `.bleed`
  pattern is for surfaces that are NOT prose"*. It gave the artwork 84rem and the text 68rem, and
  **the left edge moved as a reader scrolled past the map.** One frame now, prose at `--measure`
  inside it. *Bound by `constellation.spec.ts`, which asserts the artwork and the h1 share a left
  edge at five widths — it previously asserted the opposite and failed, correctly.*
- **`--measure` DOES NOT REACH INSIDE A TABLE, AND THAT IS WHERE THE LONG LINES WERE.** A `td`, a
  `.t-note` and an `li` take their width from the layout, so widening the frame took 1,003 elements
  past 80 characters a line across seven pages, worst 127. Capped at 78ch — **1,003 to 5**, worst
  114, the five being `t-note` inside cells where `max-width` is only advisory in an auto table
  layout. **Caps, not widths:** a short cell is unaffected, no table changed width, none began to
  scroll, and `/lenses/`, `/directory/` and `/peers/` did not move. Table pages get taller —
  `/series/` by ~5,100px — which is what shorter lines cost.
- **A CONTENTS RAIL FILLS THE SPACE BESIDE A 68ch COLUMN; A WIDER FRAME DOES NOT.** `.rail` is one
  piece of markup in two presentations — the horizontal strip below 1280px, a sticky 13rem column
  above it — scoped by `main:has(.rail)` so the ~690 pages without one reserve nothing. No
  JavaScript: jump links, no current-section highlighting, works with the bundle dead. *Bound by
  `rail.spec.ts` at 1280/1440/1710, at 1279 for the seam, and on three rail-less pages.*
- **MEASURING LINE LENGTH: measure the TEXT-BEARING BLOCK against ITS OWN FONT.** This instrument
  was wrong twice in one session and both errors inflated the count. Measuring the `td` rather than
  the capped span inside it reported cells as over-long when the text was not; and dividing a span's
  pixel width by the PARENT's character width inflates the ratio whenever the two fonts differ. Walk
  down to the block that actually holds the text, and take `ch` from that element.
- **THE LANDING ARTWORK SHIPS TWO THIRD-PARTY COPYRIGHTED ASSETS, AND THEY ARE THE ONLY ONES.**
  Both are the Survey of India *Political Map of India*, 13th edition: the **vector outline** in
  `lib/india-outline.ts`, which is what a reader sees, and the **published sheet** in `public/map/`,
  which sits behind it at 6% opacity as texture. The official depiction is used because the
  J&K/Ladakh/POK/LOC boundary treatment is not something a generic outline gets right. **The sheet
  bears "© Government of India copyright 2026".** Put to the operator before anything was built;
  they ruled it usable 2026-08-14. Attribution renders unconditionally, and **the obligation travels
  with the assets** — anyone moving, re-encoding or reusing them inherits the question.
  `components/RecordConstellation.tsx` holds the full note.
- **`lib/india-outline.ts` IS M/L/Z ONLY AND THAT IS LOAD-BEARING.** `lib/constellation.ts` tests
  every mark for containment with an even-odd crossing count, so the marks sit *inside* India. A
  path containing curve commands would be silently mis-parsed — so `polygons()` asserts instead.
- **`RecordConstellation` is a deliberate exception to "no undefensible position", and it is the
  only one.** Mark POSITION is conceptual and says so in the visible note AND in the SVG
  description; mark DENSITY is proportional to real filings and is the one true encoding in the
  picture. **The eight areas are a reader-facing grouping over all fourteen domains, and totality is
  asserted at module load** — a domain with no home fails the build, because the brief this was
  built from named seven areas covering 34% of the corpus and captioned them as the whole of it.

## Roles

- Chat sessions own research and the truth of `/data` records, drafted to schema and delivered to
  `/data/incoming/`.
- Code sessions own everything else: pipeline, validation, views, deploy.
- **The schemas are the contract.** Code may propose schema changes; they are agreed in chat before
  hardening, since research sessions author against them. `[R-68f3af]`
