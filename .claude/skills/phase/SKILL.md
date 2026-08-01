---
name: phase
description: "Run one domain phase of the India Roadmap Instrument end to end — scope, research, author, self-check, reconcile, merge, gate, reachability sweep, log and PR — stopping only at the six named triggers. Use when the user invokes /phase <subject>, or asks to run a phase, author a new domain, or take a research subject from nothing to a merged PR. The argument is a research SUBJECT, not a domain enum value."
---

# /phase

Runs one domain phase of the India Roadmap Instrument. Contract: `docs/phase-command-spec-v2.md`. Read it before a run that changes behaviour; this file is the executable form, not a replacement.

**The design goal is not fewer stops.** It is that every stop is a real decision and no real decision passes silently. Automation that buries judgement is the failure mode.

---

## Two standing design rules

These govern every stage and every rule this command adds. Both were paid for by real regressions.

### Rule 1 — Observe the output, do not restate the belief

A check that encodes the assumption which produced the data cannot detect that assumption failing. The absence-suppression bug survived three phases because the data was correct throughout: validation passed, typecheck was clean, the gate had nothing to catch.

- A rule about what the instrument **shows** reads built HTML.
- A rule about what the instrument **holds** belongs in the validator.
- Two details decide whether an output-reading rule works at all rather than always passing: **strip `<script>` blocks first** (the framework embeds the whole payload as escaped JSON, so a mark rendering nowhere is still in the file), and **normalise the needle on both sides** so entity escaping cannot cause a false failure.

### Rule 2 — Test the assertion against a real regression, not a model of one

Prove a rule fails on an actually-broken build before trusting it to pass on a working one. The first reachability rule reported 185/185 on a genuinely regressed site because it measured the one surface that could not fail.

Where a rule reads output, its fires-correctly fixture must **derive from a real regressed build** — break the thing, build it, capture the output, restore. A hand-written negative alone does not satisfy trigger C.

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
- **Enum precondition (§6).** Any enum value lacking a written definition is **trigger D before authoring begins** — not after. This has been four for four: `assessment`, `differentFacts`, `tier`, `reasonKind`. Assume the fifth exists until the audit says otherwise.

Produces a scope note. **Does not author.**

### 2 — Research

Dispatch an `opus` subagent with a brief **written fresh for this subject**.

**Do not use a fixed query template.** The research brief has been written against the subject each phase and that continues — this skill orchestrates the stage, it does not script the questions. A template would ask phase 9's questions of phase 12's material.

The brief must, however, always require:

- Primary sources prioritised; relayed evidence graded as relayed (that is what `tier` means — it grades the document retrieved, not the institution the subject belongs to).
- For every contested item: the strongest case on **each** side, in its own terms, using its own preferred data. Then identify whether the two rest on **different facts** or on different weightings of the same facts.
- First-class findings for: data not collected, not published, withheld, never defined; definitional breaks; reporting-base shifts; and any quantity where two sources disagree.

### 3 — Author

Dispatch an `opus` subagent. **This is the stage that matters** — see model routing.

Write series, ledger, provenance and pairs **against the live schemas — read them, do not assume them.** Field names drift between the authoring session's reconstruction and the live contract; that is stage 5's problem to catch, but stage 3 should not create it.

Stops at A, B, D.

### 4 — Self-check

Cross-references resolve · IDs unique · every scored record carries both cases · provenance `whatChanged` meets minimum length · no stray non-Latin script · **arithmetic in every summary matches the authored points**.

That last one caught a wrong ratio in the phase-9 debt patch before it shipped. Check it explicitly; it is not implied by validation.

### 5 — Reconcile

- Grep the **true maximum ID per file**. Renumber and fix every internal cross-reference in one pass.
- Compare authored field names against the live schemas. **Rename** where the concept exists under another name; **extend additively** where genuinely new.
- **Never drop a field to make validation pass. Never pre-filter a field the schema would reject** — that converts a gate failure into prose somebody has to notice. See trigger F.

### 6 — Merge and gate

Merge to `/data`. Run, and report the actual output of:

```
npm run validate && npm run validate:selftest && npm run typecheck && npm run build
```

`npm run build` ends in the reachability check. Any failure stops.

### 7 — Reachability sweep

**Per-record, corpus-wide, reading built output.**

Every mark that can be suppressed by a competing view must render **on the page of the record that declares it**. Corpus-wide equality is insufficient — an index page listing every declaration satisfies a total-count assertion while individual record pages stay silent. That is precisely how the absence bug survived.

- Scope is **every record in the instrument**, not the phase's own. The regression was invisible for three phases because nobody re-checked shipped records.
- Guarded classes today: absence declarations, `notes`, `caveat`, `differentFactsNote`. **Any new mark subject to view-delegation joins this list at the point it is built, not afterwards.**
- `npm run reachability` performs this. Report its counts.
- Verify on production in an authenticated browser. **If production is unreachable, say plainly what was checked instead** — never imply production verification that did not happen.

### 8 — Log and PR

Draft the verification-log entry as an **append-only delta with a cycle letter in the heading**. Open a PR. **Never append to the log directly** — it has two authors and wholesale replacement has destroyed correct work three times.

---

## Stop triggers

A stop **halts, reports, and waits. It does not guess.** Report the trigger letter, the record, and the specific judgement needed.

**A — Assessment value used outside its written definition.** Not "a new value is needed". Nothing complained when `reversed` covered both self-withdrawal and judicial strike-down. The check is whether the record's *mechanism* matches the definition's mechanism.

**B — A figure whose basis cannot be established from the sources retrieved.** Never infer a base from convention. Retrieve the primary, or hold the points `pending` with the reason recorded. **An uninterpretable number must not render.**

**C — A new gate rule without both fixtures.** Fires-correctly and stays-quiet. Where the rule reads output, fires-correctly derives from a real regressed build (Rule 2). Verify fixtures survive a clean clone — a fixture under a gitignored path is silently dropped and passes because it is absent.

**D — A definitional term applied outside its existing usage.** Covers every enum, including a subject with no matching enum value.

**E — Scope collision.** The subject overlaps records authored in another phase. Report the collision and the proposed boundary; **do not author across it unilaterally.**

**F — A migration would remove or pre-filter a field the schema rejects.** Disarming the guard is worse than the original error.

**Not triggers.** Sharp disagreement in sources; a high proportion of `contested` records; a low-confidence record honestly marked. These are properties of the material, not faults in the run.

**Do not add a seventh trigger.** The set grows from evidence, not anticipation. If a run suggests one is needed, report it and stop.

---

## The enum rule

**An enum without written per-value meanings will be misapplied, and it will not surface until someone audits the values against their own text.**

Four for four so far: `assessment` (`reversed` covering two mechanisms), `differentFacts` (seventeen records under a criterion that meant nothing), `tier` (grading the subject rather than the evidence), `reasonKind` (`never-defined` with one legitimate member in eight).

**Stage 1 reads every enum's written definitions.** A value with none is trigger D **before** authoring begins.

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
