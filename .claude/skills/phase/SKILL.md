---
name: phase
description: "Run one domain phase of the India Roadmap Instrument end to end — scope, research, author, self-check, reconcile, merge, gate, reachability sweep, log and PR — stopping only at the six named triggers. Use when the user invokes /phase <subject>, or asks to run a phase, author a new domain, or take a research subject from nothing to a merged PR. The argument is a research SUBJECT, not a domain enum value."
---

# /phase

Runs one domain phase of the India Roadmap Instrument. Contract: `docs/phase-command-spec-v2.md`. Read it before a run that changes behaviour; this file is the executable form, not a replacement.

**The design goal is not fewer stops.** It is that every stop is a real decision and no real decision passes silently. Automation that buries judgement is the failure mode.

---

## Three standing design rules

These govern every stage and every rule this command adds. All three were paid for by real regressions.

### Rule 1 — Observe the output, do not restate the belief

A check that encodes the assumption which produced the data cannot detect that assumption failing. The absence-suppression bug survived three phases because the data was correct throughout: validation passed, typecheck was clean, the gate had nothing to catch.

- A rule about what the instrument **shows** reads built HTML.
- A rule about what the instrument **holds** belongs in the validator.
- Two details decide whether an output-reading rule works at all rather than always passing: **strip `<script>` blocks first** (the framework embeds the whole payload as escaped JSON, so a mark rendering nowhere is still in the file), and **normalise the needle on both sides** so entity escaping cannot cause a false failure.

### Rule 2 — Test the assertion against a real regression, not a model of one

Prove a rule fails on an actually-broken build before trusting it to pass on a working one. The first reachability rule reported 185/185 on a genuinely regressed site because it measured the one surface that could not fail.

Where a rule reads output, its fires-correctly fixture must **derive from a real regressed build** — break the thing, build it, capture the output, restore. A hand-written negative alone does not satisfy trigger C.

### Rule 3 — Decide and act; do not round-trip a decision whose evidence is in the tree

Added 2026-08-03, after a cycle in which every reversal proposed back to the operator was accepted
and each round trip cost a turn that changed nothing.

**Proceed yourself** when the answer follows from any of: a record's own text or sources; a schema's
written contract; an enum's per-value definition; a precedent already logged; or consistency with a
sibling record decided the same way. Apply, gate, log, and report what you did and why. **Report a
reversal of an instruction as a decision taken, not as a question.**

**Stop and ask** for: an enum add or removal, or a schema change that alters a contract rather than
documenting one; a decision that sets precedent rather than applies one; a rescore the text genuinely
underdetermines; a scope boundary between phases; deploy; and `/data` edits at source (phase 4b).

**HARD STOP, never delegated and never inferred: entering a document as a source that has not been
retrieved.** No downstream check catches a fabricated or unread citation — it is valid JSON, valid
against the schema, and every reference resolves. Judgement is the only guard there is. **A
reproduction on a private portal is not retrieval.** Two records reached a scored assessment resting
on instruments nobody in the project had read (L-0028's Reconstruction Scheme, L-0033's ECL
directions); both are now `no-objective` and both say so on the record.

**Batch what must be asked** into one consolidated set at the end of a cycle, each item with a
recommendation and its evidence. Default when unsure: reversible, cheap and gated → act and report.
Irreversible, expensive or precedent-setting → ask.

---

## Five method rules

Added 2026-08-03 from phases 12 and 13. Each was paid for by a defect that reached a record or came within one
step of it, and each is about **how a finding is established**, not about what the instrument holds —
so none of them belongs in the validator.

### M1 — A reachability failure is not a fact until it survives a second resolver, a second process and a second client

Phase 12 recorded a dozen Indian government hosts as dead. **The cause was a DNS resolver artefact.**
The system resolver and 8.8.8.8 returned SERVFAIL where `dig @1.1.1.1` resolved and `curl --resolve`
returned 200. Three distinct failure modes were eventually separated, each with its own fix:

| Mode | Symptom | Fix |
|---|---|---|
| resolver | SERVFAIL on system/8.8.8.8, resolves on 1.1.1.1 | `dig @1.1.1.1` then `curl --resolve host:443:ip` |
| process | one agent cannot reach a host another reaches on the same machine | delegate a retry |
| client | 403 to `curl` and to the fetch tool, 200 to a headless browser | drive a browser |

`ncrb.gov.in`, `indiacode.nic.in`, `sansad.in`, `egazette.gov.in` were all mode 1. `eci.gov.in` was
mode 3 and yielded nine primary documents including a 32 MB delimitation compendium. **A "could not
retrieve" is not established until all three are tried** — and a retrieval failure recorded against a
live host is a false finding that hardens into a record.

**The rule does not say every host is reachable.** `jkhome.nic.in` and `jklegislativeassembly.nic.in`
failed on every resolver and are genuinely gone, which is why phase 11's findings on them stand. The
point is that the claim has to be earned.

### M2 — Quiescence is not completion

A grandchild outlives its parent and keeps writing after the parent reports "completed", so files keep
growing after the orchestrator believes the stage is finished. Phase 12 launched stage 3 against five
files that were still being written; one was read at **181 lines of an eventual 751**, and nothing in
the authored output would have shown it.

Two mitigations were tried and **both failed**: checksum stability (twelve identical five-second polls
— the author was between writes, and acting on it raced a live writer) and trusting the parent's
completion notification (parents report completion while their children write).

**What works: the consuming stage re-stats and re-reads its inputs at the point of use, and is given
mtimes rather than assurances.** The spec's "a stage may not run against partial input" is right and
had no mechanism behind it. This is the mechanism.

**The producer-side half, added 2026-08-04 and paid for at roughly two million tokens.** Phase 13's
stage 2 ran seven `opus` agents that fanned out freely and each held its report in context to write
at the end. The session limit hit mid-stage and **five of seven parts had ZERO BYTES ON DISK** — all
the retrieval was real, all of it was lost, and `STATE.md` could only record that it had happened.

The fix is one instruction in every research brief: **create the output file in the first few tool
calls and APPEND each section as it is finished; never hold the report in context to write at the
end. Cap fan-out at 2.** It was tested the hard way — two more agents died under the new rule and
**both survived, at 165 KB and 68 KB.** That is the difference between a liveness failure costing a
retry and costing the whole stage. Consumer-side re-reading cannot recover a file that was never
written; only the producer can.

**Corollary, and it is the THIRD instance of this shape: a structural check passes on a stub.**
Part 06's `## FORWARD REFERENCES` section existed, and its entire content was `_(pending)_`. A
header-presence check pronounced the part complete, and the forward-reference assertion — the very
gate that exists to stop stage 3 running on partial research — counted zero outbound references from
that part and read it as "needs nothing" rather than "never written". **A completeness check asserts
CONTENT, never the presence of a heading.** The cheap form is a floor on substantive characters
after the heading and an explicit scan for placeholder tokens; the honest form is that a section
claiming to enumerate something must enumerate it or say "none, because —".

### M3 — A negative result is worth exactly what the sweep behind it is worth

Phase 12's parliamentary sweep matched only double-quoted `href="…"`. MHA's 2019 pages emit single
quotes. The pass returned 1,711 URLs and **silently dropped 1,862 — the entirety of Winter Session
2019**, with three of the strand's key T1 replies inside the missed batch. Every page returned HTTP
200 and the corpus looked complete. It was caught only by asking why a session known to have sat
produced zero files.

Had it not been, the part would have reported "no Winter 2019 questions on the blackout" **while never
having searched Winter 2019** — a false negative indistinguishable from a true one, which would have
hardened into a `not-collected` absence.

**A sweep is not verified by its status codes. Verify a corpus against a known-present item before
reporting anything absent from it.** The CAG local-bodies query in the same phase is the standard to
meet: the filter that should return nothing returns nothing, and a positive control proves the filter
works.

### M4 — A correction relayed from a subagent is verified before it is relayed onward

The orchestrator received M1 from a child, propagated it to three siblings, and had to issue a
narrowing correction minutes later: the child had reported that *every* host recorded as dead
resolves, and two do not. The over-claim would have produced a false "route now verified" amendment
against a **correct** phase-11 absence.

**The main loop verifies before it propagates.** This is Rule 1 applied to the orchestrator's own
relaying: a subagent's finding is a claim, and passing it on unchecked converts it into a premise for
three more agents at once.

### M5 — A substring test is not a claim check

A claim audit asserts **the claim**, not a token from it.

Auditing a re-authored `caseFor` against its own record, the check for "Parliament has used nomination
… for Anglo-Indians … **until 2020**" searched the record for `2020`. It matched — inside the file stem
`11012/02/2020-SRA`, which has nothing to do with Anglo-Indians, nomination, or the year as a date.
**A claim with no support on the record passed a check designed to catch exactly that**, and it
survived only because the audit was read by eye afterwards.

Bare years, section numbers and short figures are the worst offenders, because they recur everywhere
in a corpus of statutes and file references. **Test the proposition — the entity, the predicate and the
figure together, or the distinctive phrase that carries them.** Where a claim cannot be reduced to a
searchable proposition, it does not get a mechanical check: read it, and say that you read it.

**The corollary matters more than the rule.** A passing claim audit is evidence the claim is supported
only to the strength of the needle used. **Report the needle, not just the verdict.**

---

## Invocation

```
/phase <subject>            # full run to PR
/phase <subject> --dry      # run to the drop, stop before merge
/phase <subject> --from-research <path>
```

`--dry` is the default posture for an unfamiliar subject.

**The argument is a research subject, not a domain value.** Phase 7 produced eight records filed across seven domain values. A phase and a domain are not the same object, and the enum has never tracked the phases.

---

## Stages

| # | Stage | Model | Stops at |
|---|-------|-------|----------|
| 1 | Scope | haiku | E, D (§ enum rule) |
| 2 | Research | opus | — |
| 3 | Author | **opus** | A, B, D |
| 4 | Self-check | haiku | — |
| 5 | Reconcile | haiku | ID/schema drift, F |
| 6 | Merge and gate | haiku | C, any gate failure |
| 7 | Reachability sweep | haiku | any unreachable mark |
| 8 | Log and PR | haiku | — |

Stages 1–5 run as subagents. Stages 6–8 run in the main loop: they touch git and the deploy, and a subagent reporting "the gate passed" is a restatement of belief where the gate output itself is the observation (Rule 1).

### 1 — Scope

Dispatch a read-only subagent. It must:

- Read the **live** domain enum, and the written definitions for `assessment`, `tier`, `reasonKind`, `disputeKind`, and every other enum in `/schemas`. Read them from the schemas, not from memory.
- Report which existing records already touch the subject, which domain values the phase would write into, whether a **new enum value** would be needed, and what must not be duplicated.
- **Enum precondition (§6).** Any enum value lacking a written definition is **trigger D before authoring begins** — not after. Nine for nine so far: `assessment`, `differentFacts`, `tier`, `reasonKind`, then `domain`, `type`, `confidence`, `directionOfBias`, `country`. Assume the tenth exists until the audit says otherwise.

Produces a scope note. **Does not author.**

### 2 — Research

Dispatch an `opus` subagent with a brief **written fresh for this subject**.

**Do not use a fixed query template.** The research brief has been written against the subject each phase and that continues — this skill orchestrates the stage, it does not script the questions. A template would ask phase 9's questions of phase 12's material.

The brief must, however, always require:

- Primary sources prioritised; relayed evidence graded as relayed (that is what `tier` means — it grades the document retrieved, not the institution the subject belongs to).
- For every contested item: the strongest case on **each** side, in its own terms, using its own preferred data. Then identify whether the two rest on **different facts** or on different weightings of the same facts.
- First-class findings for: data not collected, not published, withheld, never defined; definitional breaks; reporting-base shifts; and any quantity where two sources disagree.

**Two operational requirements on every stage-2 brief, both from M2's producer-side half:**

1. **The agent creates its output file in its first few tool calls and appends each section as it is
   completed.** Not at the end. A research agent that dies holding its report loses everything, and
   phase 13 lost five parts of seven that way in a single run.
2. **Fan-out is capped at 2 concurrent descendants.** Uncapped fan-out is what exhausted the session
   in the first place, and a descendant's model is unenforceable anyway (see model routing).

State both in the brief in those words. A brief that omits them is not a stage-2 brief.

### 3 — Author

Dispatch an `opus` subagent. **This is the stage that matters** — see model routing.

Write series, ledger, provenance and pairs **against the live schemas — read them, do not assume them.** Field names drift between the authoring session's reconstruction and the live contract; that is stage 5's problem to catch, but stage 3 should not create it.

Stops at A, B, D.

### 4 — Self-check

```
node tools/stage4-selfcheck.mjs <drop-records-dir>
```

Runs the mechanical half: IDs unique and non-colliding · **every cross-reference form resolves** ·
every scored record carries both cases · provenance `whatChanged` meets minimum length · no stray
non-Latin script · per-record schema validity.

**`unmeasured-route` severity is derived from `reasonKind`, not chosen.** Two of the four values
entail a route in their own written definitions — `not-published` is "producible under compulsion",
`withheld` "requires an identifiable refusal", so a holder and often a request are already
established. An absence on either value with no `wouldFill` contradicts the value it declares, so it
is an **error**. `not-collected` and `never-defined` stay **warnings**: for those no route may exist,
and demanding one invites a placeholder. **A placeholder route is worse than none — it enters the
verification queue and cannot be worked.** Both branches are pinned by fixture
(`unmeasured-route-producible` fires, `unmeasured-route-uncollectable` stays clean), so flattening
the severity back to a uniform warn fails loudly instead of quietly reopening the gap.

**"Cross-references resolve" is not one check, and it is not a list.** Writing it as one line is how
the education run got six of nine forms and reported clean. The enumeration is now gone.

**Forms are DERIVED, not listed.** `deriveRefForms` reads each layer's id *contract* from its own
schema — `^L-\d{4}$`, `^P-\d{2}$`, `^PR-\d{2}$` — then walks every string in every record and asks
whether that string IS an id. Any field path whose values are ids is a reference form. It cannot be
short by a field nobody remembered, because it never names a field. Twelve forms, 12/12 matching the
corrected hand list, no thirteenth.

**The schemas do not mark reference fields as references, and that is why the obvious derivation
fails.** Only `id` carries a pattern; `seriesRefs`, `provenanceRefs`, `affectsSeries` and the rest are
bare strings with no pattern and mostly no description. Nothing in the contract says "this holds an
id" — so derivation has to run off the id contracts and observed values instead.

**Derivation has one blind spot, so the old list survives as a FLOOR.** A form that is legal per
schema with *zero* instances presents no value to recognise. Two are in that state:
`pairs.a.absenceFrom` and `pairs.a.competingAccountsFrom`. `pairs.b.competingAccountsFrom` has
exactly one instance corpus-wide and is one deletion from joining them. `assertDerivedCoversFloor`
reports any floor entry derivation missed and never drops it — "no instances" is a fact about today's
data, not about the contract.

Two forms carry a companion the id alone does not validate: `absenceIndex` must be in range for the
target's `unmeasured[]`, and `competingAccountsFrom` requires the target to actually carry
`competingAccounts`. Those are contract facts, so they stay declared rather than derived.

**Two report-only passes run alongside, over the drop and the live corpus separately.** Neither
gates and neither auto-fixes; both name candidates for a judgement.

- **Bidirectional references.** Three one-way links were found by hand in two cycles. `integrity.mjs`
  checks provenance → series and not the reverse, which is the direction all three misses were in.
  Only series ↔ provenance is genuinely two-way — nothing on a series points back at a ledger record
  and provenance has no `affectsLedger` — so the other forms are out of scope by construction, not by
  omission. **Asymmetry is often correct**: P-04 scopes to `all` and cannot list every series it
  touches. Hence report, never mirror. **Triage before fixing.** The 2026-08-02 sweep found 83
  candidates and classified them 63 by-design / 20 likely-omission on evidence — scope breadth,
  `affectsDomains: [all]`, and cited-count against listed-count. Mass-mirroring would have written 63
  false links. Table: `docs/backlink-triage-2026-08-02.md`.
- **`ref-unexplained`** (renamed from "orphan references", and the rename is the finding). It was
  built for the P-52 shape — a reference with no substantive connection to the record. Tested against
  the reconstructed pre-removal state it **does** fire on P-52; the earlier claim that it missed its
  own motivating case was wrong, inferred from output taken after P-52 had been removed. What it
  cannot do is separate P-52 from P-65 *on the same record*, and P-65 is correct. So it does not find
  unconnected references — it finds references the record's prose never names by id, which is a
  documentation property, not a correctness one. **The P-52 shape is caught by `ref-relevant` in
  `integrity.mjs`**, on domain coverage, as an error. Do not leave a check in the tree that is named
  for a case it cannot isolate.

**`url-check` runs on the drop, and needs `--drop` to see it.**

```
node tools/url-check.mjs --drop <drop-records-dir>
```

The default mode diffs `/data` against `origin/main`. On a `--dry` run the drop deliberately never
reaches `/data`, so the default reports **"0 to check"** and exits clean — a right answer about the
wrong tree, and the fifth instance of that shape in this project. It is also the mode in which the
gate matters most: the drop is the moment before the citations become load-bearing, and after a
merge it is too late to be cheap. Observed 2026-08-04 on phase 13, whose 63 new URLs the tool could
not see at all and which had to be checked by hand outside it.

`--drop` reads the flat drop layout (`ledger.json` beside `series.json`, not `ledger/*.json`) and
implies `--all`, because every URL in a drop is new and there is no base to diff against. Same
predicate, same three outcomes — **a 401/403/429 is a refusal, not evidence the document is absent**
— and the same fixtures. Only the corpus reader changes.

**Arithmetic in every summary must match the authored points, and no tool does this.** It is read by
hand, against the points and against `parts/`. It caught a wrong ratio in the phase-9 debt patch, and
in the education run it caught a Ministry share stated against the wrong denominator and wrong by a
factor of four — inherited verbatim from three places in `parts/`, so the fix had to go there too or
it re-enters on the next run. **Correct the research, not only the record.**

### 5 — Reconcile

- Grep the **true maximum ID per file**. Renumber and fix every internal cross-reference in one pass.
- Compare authored field names against the live schemas. **Rename** where the concept exists under another name; **extend additively** where genuinely new.
- **Never drop a field to make validation pass. Never pre-filter a field the schema would reject** — that converts a gate failure into prose somebody has to notice. See trigger F.

### 6 — Merge and gate

Merge to `/data`. Run, and report the actual output of:

```
npm run validate && npm run typecheck && npm run build && npm run validate:selftest
```

`npm run build` ends in the reachability check. Any failure stops.

**BUILD BEFORE SELFTEST, and the order is not cosmetic.** `validate:selftest` has a live-corpus arm
that reads `out/`, so run before a build it reports on **the previous build's artefact**. Observed
2026-08-03: the selftest reported *"reachability failed on the live corpus"* and the build seconds
later reported **599/599**. Both were correct — a `caveat` had been edited and `out/` did not yet carry
it. The selftest was not wrong about anything except which tree it was describing.

**Fourth instance of one shape**, and it is worth naming as such: a check that is sound, and reads a
stale artefact. The others are the absence bug (three phases green on correct data), stage 1 counting
series from `seed.json` alone, and stage 2's `research.md` assembled before six of its parts landed.
**A check reads what is on disk at the moment it runs; where that is generated, generate it first.**
The failure mode is not a wrong answer — it is a right answer to a question about yesterday.

### 7 — Reachability sweep

**Per-record, corpus-wide, reading built output.**

Every mark that can be suppressed by a competing view must render **on the page of the record that declares it**. Corpus-wide equality is insufficient — an index page listing every declaration satisfies a total-count assertion while individual record pages stay silent. That is precisely how the absence bug survived.

- Scope is **every record in the instrument**, not the phase's own. The regression was invisible for three phases because nobody re-checked shipped records.
- Guarded classes today: absence declarations, `notes`, `caveat`, `differentFactsNote`. **Any new mark subject to view-delegation joins this list at the point it is built, not afterwards.**
- `npm run reachability` performs this. Report its counts.
- Verify on production in an authenticated browser. **If production is unreachable, say plainly what was checked instead** — never imply production verification that did not happen.

### 8 — Log and PR

Draft the verification-log entry as an **append-only delta with a cycle letter in the heading**. Open a PR. **Never append to the log directly** — it has two authors and wholesale replacement has destroyed correct work three times.

**A gate's exit code does not survive a pipe. Read the summary line, not the shell status.**
Observed 2026-08-04: `url-check` was invoked as `node tools/url-check.mjs … | tail -25`, so the
shell reported the exit status of `tail` — **0** — while node had exited **1** on a real failure.
The harness logged a clean run. Nothing in the output was wrong; the wrong thing was read.

This is the same family as the PR-status rule below, and the two should be read together: in both,
a status field is a *proxy* for the thing you care about, and the proxy is supplied by something
other than the process that knows the answer. **Assert on the gate's own report — `url-check OK`,
`STAGE 4 CLEAN`, `599/599` — not on `$?`, and not on a status field some intermediary produced.**

**After any merge, verify the artefact exists on `main`. Never read the PR status.** A stacked PR
whose base has already landed merges into a dead branch and is a silent no-op for `main`, and every
status field reports success. Observed 2026-08-03: PR #3 merged into `lens-axis` ten minutes after
`lens-axis` had gone to `main`; both PRs read MERGED and `main` had neither the new tool nor the new
build step, while `validate` passed cleanly throughout because nothing about a missing gate is
visible to it. Check out `origin/main` and run the tool — this is Rule 1 applied to git.

---

## Stop triggers

A stop **halts, reports, and waits. It does not guess.** Report the trigger letter, the record, and the specific judgement needed.

**A — Assessment value used outside its written definition.** Not "a new value is needed". Nothing complained when `reversed` covered both self-withdrawal and judicial strike-down. The check is whether the record's *mechanism* matches the definition's mechanism.

**B — A figure whose basis cannot be established from the sources retrieved.** Never infer a base from convention. Retrieve the primary, or hold the points `pending` with the reason recorded. **An uninterpretable number must not render.**

**C — A new gate rule without both fixtures.** Fires-correctly and stays-quiet. Where the rule reads output, fires-correctly derives from a real regressed build (Rule 2). Verify fixtures survive a clean clone — a fixture under a gitignored path is silently dropped and passes because it is absent.

**D — A definitional term applied outside its existing usage, or created without one.** Covers every enum. Two limbs: **application** — a term used outside its existing usage, including a subject with no matching enum value; and **creation** — a term or value introduced without a written definition. The second is preventive and fires at authoring time, before the value has any usage to be audited against.

**E — Scope collision.** The subject overlaps records authored in another phase. Report the collision and the proposed boundary; **do not author across it unilaterally.**

**F — A migration would remove or pre-filter a field the schema rejects.** Disarming the guard is worse than the original error.

**Not triggers.** Sharp disagreement in sources; a high proportion of `contested` records; a low-confidence record honestly marked. These are properties of the material, not faults in the run.

**Do not add a seventh trigger.** The set grows from evidence, not anticipation. If a run suggests one is needed, report it and stop.

---

## The enum rule

**An enum without written per-value meanings will be misapplied, and it will not surface until someone audits the values against their own text.**

Nine for nine. Four found by audit: `assessment` (`reversed` covering two mechanisms), `differentFacts` (seventeen records under a criterion that meant nothing), `tier` (grading the subject rather than the evidence), `reasonKind` (`never-defined` with one legitimate member in eight). Five more found by the first dry run, all previously undefined: `domain`, `type`, `confidence`, `directionOfBias`, `country`.

**Stage 1 reads every enum's written definitions.** A value with none is trigger D **before** authoring begins. That half is diagnostic — it only runs once the value has users.

**Preventive half — this is the one that can close the loop.** A new enum, or a new value added to an existing enum, ships with per-value definitions **in the same commit**. An enum value without a definition is not mergeable. Stage 3 is bound by this: a value it introduces carries its definition, or it does not land.

**Three are known-inconsistent and deferred, not resolved** — `directionOfBias` (a direction axis conflated with a defect-kind axis), `type` (`shock` covering external and domestic alike), `confidence` (finding versus retrieval). Read them as written, inconsistency included. **Do not resolve one mid-phase**; `differentFacts` reached seventeen records because a taxonomy was resolved in the pass that discovered it.

---

## Model routing

A **recommendation with its reason, not a hard pin.**

| Stage | Recommended | Reason |
|-------|-------------|--------|
| 2 Research | `opus` — strongest available | Cross-checking contested claims and spotting different-facts splits is reasoning work. |
| 3 Author | **`opus` — the one that matters** | Argument pairs a hostile reader would concede is the hardest thing in the project, and it runs unsupervised between stops. **No trigger catches a weak pair.** |
| 1, 4–8 | `haiku` — cheapest adequate | Mechanical. |

**Degradation.** If the recommended model is unavailable or routed away, fall back **explicitly** to the next known-good model and say so in the run report:

```
opus  →  sonnet  →  stop and report
haiku →  sonnet  →  stop and report
```

**Never fall back to the session default and never pass `inherit` for stages 2 and 3.** `inherit` silently adopts whatever the session happens to be running, which is the outcome the routing exists to prevent. A stage-3 run on an unstated model is worse than a stage-3 run that stopped.

### Fan-out within a stage is unrouted

A stage subagent may spawn subagents of its own. **Nothing binds those descendants to the stage's model, and this file claims no enforcement.** Instruct inheritance in the brief, then **verify: each subagent transcript records the model that served it, so the run report states the observed model, not the requested one** (Rule 1).

Observed once — stage 2 of the education run fanned out to five; the two surviving transcripts both record `claude-opus-5`, the stage's own model. Inheritance looks like the default. One observation is not a guarantee.

**Stage 3 does not fan out.** No trigger catches a weak argument pair, and an unrouted descendant writing them is the exposure this section exists to close.

### Safeguards-routing caveat — carried here deliberately

Contested political material can trigger safeguards routing to a different model than the one requested. In conversation a differently-shaped response is noticeable. **Unsupervised it is not.**

If a run's authoring reads differently than expected — thinner argument pairs, hedged assessments, reluctance on a contested record — **routing is a plausible cause before quality is.** Check which model actually served the stage before concluding the material was hard or the model was weak.

---

## Known weaknesses

Read these before trusting a run.

- **One phase of evidence.** Every trigger derives from phase 9. Expect 10–12 to add more.
- **Trigger C is a proxy.** Predicate ambiguity is not mechanically detectable; missing fixtures stand in for it.
- **D and E depend on the run noticing the stretch** — the same judgement they exist to escalate.
- **Nothing catches a weak argument pair.** The largest remaining exposure, mitigated only by model routing at stage 3 and human review of the PR diff.
- **Stage 7 proves reachability, not usefulness.** A mark can render on the right page and still be buried.
- **Gitignored fixture trees.** Verify fixtures survive a clean clone.
- **A stage can die for infrastructure reasons** — session limit, API failure, agent death. **Liveness failure, not a trigger.** See resumability below.
- **Any assembly is stale the moment its sources keep arriving.** Read the parts, not a prior assembly.

### Resumability — required of every stage

When a stage terminates without completing, **preserve its partial output to the drop directory** and write a `STATE.md` recording what completed, what is missing, and the resume order. **Preserving is not authoring and does not violate `--dry`** — no records are written, `/data` is not touched.

The first occurrence lost three subagent reports that existed only in the orchestrator's context; they were recovered only because their transcripts happened to survive on disk.

**A stage may NOT run against partial input from a prior stage. It halts and reports.** A drop built on truncated research is complete-looking and its gap is invisible in the output — no downstream check recovers a question the research never asked. Authoring launders the gap into finished records.

**The stale-assembly trap, stated generally.** Any artefact assembled at a point in time, from sources that keep arriving, reads whole and is not. Two instances: stage 1 counting series from `seed.json` alone (123 against a true 136); stage 2's `research.md` assembled before six of its parts landed. **A consumer reads the parts, or re-assembles.**
