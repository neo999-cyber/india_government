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
- **Enum precondition (§6).** Any enum value lacking a written definition is **trigger D before authoring begins** — not after. Nine for nine so far: `assessment`, `differentFacts`, `tier`, `reasonKind`, then `domain`, `type`, `confidence`, `directionOfBias`, `country`. Assume the tenth exists until the audit says otherwise.

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
