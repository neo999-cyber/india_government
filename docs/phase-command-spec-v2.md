# `/phase` — specification v2.2

**Status:** built. Implemented at `.claude/skills/phase/SKILL.md`.
**Supersedes:** v2.1, revised in place. Changes from v1 in §9, from v2 in §10, from v2.1 in §11.
**Scope:** runs one domain phase of the India Roadmap end to end, stopping only where judgement is genuinely needed.
**Evidence base:** phase 9 and its seven follow-on cycles (08-01e through 08-01i.2). One phase. See §8.

---

## 1. What this is for

A phase currently costs roughly a dozen human turns, of which about four carry judgement. The rest is relay.

`/phase` runs the mechanical work hands-off and stops at named conditions. The design goal is not fewer stops. It is that **every stop is a real decision and no real decision passes silently**.

The failure mode to avoid is automation that buries judgement rather than surfacing it.

---

## 2. Two standing design rules

These govern every stage and every rule the command adds. Both were paid for.

### Rule 1 — Observe the output, do not restate the belief
A check that encodes the assumption which produced the data cannot detect that assumption failing. The absence-suppression bug survived three phases because the data was correct throughout: validation passed, typecheck was clean, the gate had nothing to catch. A validator rule encoding "the pair pools them" would have agreed with the belief that broke.

**Consequence:** any rule about what the instrument *shows* reads built output. Only rules about what the instrument *holds* belong in the validator. Two details decide whether an output-reading rule works at all rather than always passing — strip script blocks first, since the framework embeds the whole payload as escaped JSON and a mark rendering nowhere is still present in the file; and normalise the needle on both sides so entity escaping cannot cause a false failure.

### Rule 2 — Test the assertion against a real regression, not a model of one
A rule must be proven to fail on an actually-broken build before it is trusted to pass on a working one. The first version of the reachability rule reported 185/185 on a genuinely regressed site, because it measured the one surface that could not fail. That result is only obtainable by building the broken thing.

**Consequence:** trigger C's fixture requirement is not satisfied by a hand-written negative case alone. The fires-correctly fixture must derive from a real regressed build wherever the rule reads output.

---

## 3. Invocation

```
/phase <subject>
```

The argument names a **research subject**, not a domain enum value. Phase 7 produced eight records filed across seven domain values. A phase and a domain are not the same object.

- `--dry` — run to the drop and stop before merge. Default for an unfamiliar subject.
- `--from-research <path>` — author from an existing report.

---

## 4. Stages

| # | Stage | Model | Stops? |
|---|-------|-------|--------|
| 1 | Scope | mechanical | triggers D, E |
| 2 | Research | strongest available | — |
| 3 | Author | strongest available | triggers A, B, D |
| 4 | Self-check | mechanical | — |
| 5 | Reconcile | mechanical | ID or schema drift, trigger F |
| 6 | Merge and gate | mechanical | trigger C, any gate failure |
| 7 | Reachability sweep | mechanical | any unreachable mark |
| 8 | Log and PR | mechanical | — |

**Stages 1–5 run as subagents. Stages 6–8 run in the main loop.** This follows from Rule 1: a subagent reporting "the gate passed" restates the belief, where the gate output itself is the observation. The orchestrator must see the output, not a summary of it.

### 1 — Scope
Read the live domain enum, assessment definitions, tier definition, `reasonKind` definitions, and the existing ledger. Report which records already touch the subject, which domain values the phase will write into, whether a new enum value would be needed, and what must not be duplicated. Produces a scope note; does not author.

### 2 — Research
Gather evidence, prioritising primary sources. For every contested item, gather the strongest case on each side in its own terms using its own preferred data, and identify where the two rest on different facts rather than different weightings.

Flag as first-class findings: data not collected, not published, withheld, never defined; definitional breaks; reporting-base shifts; and any quantity where two sources disagree.

### 3 — Author
Write series, ledger, provenance and pairs against the live schemas — read them, do not assume them.

### 4 — Self-check
Cross-references resolve. IDs unique. Every scored record carries both cases. Provenance `whatChanged` meets minimum length. No stray non-Latin script. **Arithmetic in every summary matches the authored points** — this caught a wrong ratio in the phase-9 debt patch before it shipped.

### 5 — Reconcile
Grep the true maximum ID per file; renumber and fix cross-references in one pass. Compare authored field names against live schemas. Rename where the concept exists under another name; extend additively where genuinely new.

**Never drop a field to make validation pass. Never pre-filter a field the schema would reject.** See trigger F.

### 6 — Merge and gate
Merge to `/data`. Run validate, selftest, typecheck, build.

### 7 — Reachability sweep
**Per-record, corpus-wide, reading built output.**

Every mark that can be suppressed by a competing view must render **on the page of the record that declares it**. Corpus-wide equality is insufficient: an index page listing every declaration satisfies a total-count assertion while individual record pages stay silent. That is precisely how the absence bug survived.

Scope: every record in the instrument, not the phase's own. The regression that motivated this stage was invisible for three phases because nobody re-checked shipped records.

Currently guarded classes: absence declarations, notes, caveats, `differentFactsNote`. Any new mark subject to view-delegation joins this list at the point it is built, not afterwards.

**This stage invokes the existing reachability gate — `npm run reachability`, already wired into `npm run build` and into `vercel.json` — it is not new work.** Report its counts. Build a new sweep only if a mark class is found that the existing tool does not cover, and then under trigger C.

Verify on production in an authenticated browser. If production is unreachable, say plainly what was checked instead.

### 8 — Log and PR
Draft the verification-log entry as an **append-only delta** with a cycle letter in the heading. Open a PR. Never append to the log directly.

---

## 5. Stop triggers

A stop halts, reports, and waits. It does not guess.

**Triggers outrank `--dry`'s stopping point.** A stop halts wherever it fires, which may be earlier than the drop. A `--dry` run that halts at stage 1 has behaved correctly and has produced a scope note, not a drop.

**A — Assessment value used outside its written definition.** Not "a new value is needed" — nothing complained when `reversed` covered both self-withdrawal and judicial strike-down. The check is whether the record's *mechanism* matches the definition's mechanism.

**B — A figure whose basis cannot be established from the sources retrieved.** Never infer a base from convention. Retrieve the primary, or hold the points `pending` with the reason recorded. An uninterpretable number must not render.

**C — A new gate rule without both fixtures.** Fires-correctly and stays-quiet. Where the rule reads output, the fires-correctly fixture derives from a real regressed build (Rule 2).

**D — A definitional term applied outside its existing usage, or created without one.** Covers every enum. Two limbs:

- **Application** — a term used outside its existing usage, including a subject with no matching enum value. Diagnostic; fires against usage.
- **Creation** — a term or value introduced without a written definition. Preventive (§6); fires at authoring time, before the value has any usage to be audited against.

**E — Scope collision. Record-level, not phase-level.** The subject overlaps one or more individual records authored in another phase — a single record is enough to fire it. Report the collision and the proposed boundary; do not author across it unilaterally.

**F — A migration would remove or pre-filter a field the schema rejects.** This converts a gate failure into prose somebody has to notice. Disarming the guard is worse than the original error.

**Not triggers:** sharp disagreement in sources; a high proportion of `contested` records; a low-confidence record honestly marked. Properties of the material, not faults in the run.

---

## 6. The enum rule

**An enum without written per-value meanings will be misapplied, and it will not surface until someone audits the values against their own text.**

**Nine for nine.** Four found by audit: `assessment` (`reversed` covering two mechanisms), `differentFacts` (seventeen records under a criterion that meant nothing), `tier` (grading the subject rather than the evidence), `reasonKind` (`never-defined` with one legitimate member in eight).

Five more found by the first dry run, all previously undefined: **`domain`** (14 values, declared in all four schemas, and the one the education phase needed), **`type`** (5), **`confidence`** (3), **`directionOfBias`** (7), **`country`** (5). On definition, three came back inconsistent — `directionOfBias` conflates a direction axis with a defect-kind axis and has an unused value, `shock` covers both external disruptions and domestic failures, and `confidence` is ambiguous between the finding and its retrieval. The rule holds: none surfaced until the values were audited against their own text.

**Threshold — what counts as written.** A `description` qualifies only if it explains **what the values mean**, not what the field is. `term` qualifies: its 73 characters say "baseline = pre-May-2014, T1 = 2014-19…". `confidence` did not: it had no description at all, and a description reading "how confident the record is" would not have qualified either. The test is whether a reader could assign a value correctly from the text alone.

**The rule as stated is diagnostic.** All nine cases were found by audit *after* misapplication. Nothing yet prevents the tenth.

**Preventive form.** A new enum, or a new value added to an existing enum, ships with per-value definitions **in the same commit**, meeting the threshold above. **An enum value without a definition is not mergeable.** This is the half that can close the loop: the diagnostic half only ever runs after the value has users to be misapplied to.

**Consequence for this command:** stage 1 reads every enum's written definitions. If a value has none, that is trigger D before authoring begins — not after. Stage 3 is bound by the preventive form: a value it introduces carries its definition into the same commit, or it does not land.

---

## 7. Model routing

A recommendation with its reason, not a hard pin, so a run whose model is unavailable or routed away by safeguards degrades to a known-good model rather than the session default.

| Stage | Recommended | Reason |
|-------|-------------|--------|
| 2 Research | strongest available | Cross-checking contested claims and spotting different-facts splits is reasoning work. |
| 3 Author | **strongest available — the one that matters** | Argument pairs a hostile reader would concede is the hardest thing in the project, and it runs unsupervised between stops. No trigger catches a weak pair. |
| 1, 4–8 | cheapest adequate | Mechanical. |

Mechanism: per-subagent `model:`, or `model:` in command frontmatter.

**`inherit` is forbidden for stages 2 and 3.** `inherit` adopts the session default, which is precisely the outcome this section exists to prevent falling back to. A stage-3 run on an unstated model is worse than a stage-3 run that stopped.

**Degradation is explicit**, and named in the run report:

```
opus  →  sonnet  →  stop and report
haiku →  sonnet  →  stop and report
```

Selectable values in the current environment are `sonnet`, `opus`, `haiku`, `fable`. "Strongest available" maps to `opus`; "cheapest adequate" to `haiku`. There is no model literally named "strongest available" — the mapping is a decision, and it is stated here so it is not re-derived per run.

**Caveat to carry in the command file.** Contested political material can trigger safeguards routing to a different model. In conversation a differently-shaped response is noticeable; unsupervised it is not. If a run's authoring reads differently than expected, routing is a plausible cause before quality is.

---

## 8. Known weaknesses

**One phase of evidence.** Every trigger derives from phase 9. Expect 10–12 to add more. Ship thin, let it miss things, widen it.

**Trigger C is a proxy.** Predicate ambiguity is not mechanically detectable; missing fixtures is a stand-in.

**D and E depend on the run noticing the stretch** — the same judgement they exist to escalate.

**Nothing catches a weak argument pair.** The largest remaining exposure. Mitigated only by model routing at stage 3 and human review of the PR diff. Read this line closely before approving.

**Stage 7 proves reachability, not usefulness.** A mark can render on the right page and still be buried.

**A count assembled from one data file under-reports silently as the corpus grows.** Stage 1's first dry run read `data/series/seed.json` alone and reported 123 series against a true 136 — `rights-institutions.json` had been added and the count did not know. The failure is silent because a plausible number is returned. Counts come from the gate's own summary line, or from every file in the layer.

**Gitignored fixture trees.** A fixture whose artefacts sit under an ignored path is silently dropped from the commit and passes because it is absent. Verify fixtures survive a clean clone.

**The three known-inconsistent enums are recorded, not resolved.** `directionOfBias` conflates two axes — four of seven values state a direction, three state a defect kind and carry 35 of 58 records. A split into direction and defect-kind is the likely fix and is **deliberately deferred**: resolving a taxonomy in the same pass that discovers it is how `differentFacts` shipped at seventeen records. Revisit as its own cycle, with both fixtures.

`type` (`shock` covering both external disruptions and domestic failures) and `confidence` (ambiguous between the finding and its retrieval) are deferred on the same grounds. Until then a run reads the definitions as written, including the recorded inconsistency, and does not resolve one mid-phase.

---

## 9. Changes from v1

1. Stage 7 rewritten: per-record, reading built output, corpus-wide in scope. v1's corpus-wide equality would have passed on the regressed build.
2. §2 added — the two design rules, previously implicit in a single check.
3. §6 added — the enum rule promoted from an observation to a stage-1 precondition.
4. Trigger C strengthened: real regressed build required for output-reading rules.
5. Stage 4 gains explicit arithmetic verification.
6. Gitignored-fixture weakness added to §8.

---

## 10. Changes from v2

Revised in place after the first dry run (`/phase education --dry`, which halted at stage 1 on triggers D, D and E).

1. §4 table — stage 1 stops on **D and E**, not E alone. §6 already made the enum audit a stage-1 trigger D; the table contradicted it.
2. §4 — stages 1–5 are subagents, **stages 6–8 run in the main loop**, derived from Rule 1.
3. §4 stage 7 — states it **invokes the existing reachability gate**, not new work.
4. §5 — **triggers outrank `--dry`'s stopping point**; a stop halts wherever it fires.
5. §5 trigger E — collision is **record-level**, not phase-level. As written it was ambiguous enough that the education collision with L-0063 might not have fired.
6. §6 — **threshold added** for what counts as a written definition: it must explain what the values mean, not what the field is.
7. §6 — **four for four becomes nine for nine**, naming the five the first dry run found.
8. §7 — **`inherit` forbidden** for stages 2–3, with an explicit degradation chain and the environment's selectable model values recorded. v2's mechanism line offered `inherit` while its own rationale forbade the session default.
9. §8 — **single-file counts** added as a known weakness.

---

## 11. Changes from v2.1

One addition, in three places. v2.1's enum rule was diagnostic only — every one of the nine was caught by audit after the value was already in use, so nothing in it could have prevented the tenth.

1. §6 — **the preventive half.** A new enum, or a new value on an existing enum, ships with per-value definitions in the same commit. An undefined value is not mergeable.
2. §5 trigger D — **extended to creation.** D was written against application alone, which cannot fire on a value that has no usage yet. It now has two limbs, application and creation.
3. §8 — **the three known-inconsistent enums recorded as deferred**, with the reason for deferring: `differentFacts` reached seventeen records because a taxonomy was resolved in the pass that discovered it.

This is the last revision. Later evidence goes to the verification log and, if it changes behaviour, to a v3.
