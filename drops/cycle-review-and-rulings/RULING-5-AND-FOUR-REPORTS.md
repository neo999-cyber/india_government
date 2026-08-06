# Ruling 5, and four reports

Written 2026-08-06 against `004fd5f`. **One rule written; four reports. No record authored, no record
edited, no enum value added or removed, no gate built, no phase opened.**

**Verdicts moved: 0**, proven mechanically rather than asserted — `assessment` compared for all 223
ledger records between `HEAD` and the working tree, emitted scope printed with the count. That was
the condition the rule had to meet to be written at all.

Every figure names the script that emitted it and the scope that script bound. Where no gate emits a
figure, that is said rather than glossed.

---

# 1. The four phase-16 questions, verbatim

From `PHASE-16-CALIBRATION-SCOPE.md` §*WHAT MUST BE SETTLED BEFORE THE PHASE OPENS*, quoted in full
because the last report referenced them by letter and stated none of them:

> **(a) Is `shock` external-only?** The schema's own usage note states the external reading and admits
> it does not hold. **The note is also stale in both its numbers, and that is a fact about this batch's
> reading, not a proposal to edit it:** it says *"fits three of the five"* and there are **eight**
> `type: shock` records at `fa518f4`.

> **(b) Is "shock" one axis or two?** The reflexive cases (*"This record IS the shock"*) and the
> downstream cases (*"COVID disrupted FY2020-21 construction"*) are being carried by one field.
> Whether *being* a shock and *being exposed to* one are the same axis decides whether `type: shock`
> survives the calibration at all, or becomes an exposure entry pointing at itself.

> **(c) Does a shock become a record, a provenance entry, or neither?** The corpus does all three today
> — L-0020 is a ledger record, P-10 and P-21 are provenance, and the 2022 heat shock is prose in six
> records and nothing else. **A first-class shock object presupposes an answer**, and this one is the
> gating question: it decides whether the phase is a new layer, a use of provenance, or a field.

> **(d) The three properties — window, shared-with-panel, breaks-a-series — are they the right three?**
> They are what the existing prose already carries. Nothing establishes they are sufficient, and adding
> a fourth after 66 records are migrated is more expensive than deciding it now.

**Report 4 below bears directly on (b) and answers part of it as measurement rather than as a
ruling: the field carries two jobs, not one, and refusal is a third thing that is not a job at all.
Report 5 bears on (a) and reports what L-0091's test would have to say to be written down.** Neither
resolves anything; (a) and (c) remain the operator's.

---

# 2. THE RULE — Ruling 5, written

**Written into three places in one commit**, per the convention the first two rulings established:
`CLAUDE.md`; the `assessment` definition in `schemas/ledger.schema.json`; the `Assessment` doc
comment in `lib/types.ts`. **No enum member added or removed** — `enum-parity` reports *48 members
across 6 axes agree in schema, type and label map · 3 axes exempted by name*, unchanged. The schema
edit is one insertion and one deletion on a description line, the same shape as the mirror ruling's.

> **A duty imposed by an external authority is a legitimate objective for scoring, provided the
> record names the instrument and the duty.**

External authority means an authority other than the body being assessed. The record states the
instrument, the duty in the instrument's own words, and the duty-holder.

**Four conditions travel with it, and each was earned by one of the nine records the external review
named** — not invented as a precaution:

1. **The obligation is imposed, not volunteered**, and an instrument's silence on a deadline does not
   move an imposed duty to `no-objective`.
2. **The duty must be the one the finding is about.** Ruling 1a's *bear on the limb in dispute*, one
   level up: there it qualifies a source, here an objective.
3. **Naming an instrument is not breaching it.** Without this the rule degrades into "the note
   mentions a statute", which 33 of 170 notes do.
4. **An absent duty is not a duty.**

**And what it does not reach:** an objective *internal* to the measure. L-0108 is named in the rule
itself so a later cycle does not cite it as an instance and widen the rule by example.

## All nine tested, against the rule as written

**SCOPE: the nine records named by the external review, read from `data/ledger/*.json` in the
operation that quotes them; `assessment`, `assessmentNote` and `claimAtLaunch`.**

| record | imposed duty? | names instrument + duty? | verdict | moved? |
|---|---|---|---|---|
| **L-0095** | RTE 2009 **s.26** — vacancies not above ten per cent; Union as appointing authority | yes — note: *"the objective being a number in the statute rather than a policy claim"* | `failed` | **no** |
| **L-0106** | RTE 2009 **s.25 + Schedule** — norm maintained in each school by 31 Mar 2013 | yes — note: *"the Schedule's staffing norm maintained in each school by 31 March 2013"* | `failed` | **no** |
| **L-0162** | **Art. 279A(11)** — *"shall establish a mechanism"*; GST Council | yes, **and uniquely in `claimAtLaunch` as well**: *"The constitutional text itself"* | `failed` | **no** |
| **L-0108** | **no — internal object**, *"appointing teachers on merit"* | yes, but the rule does not reach it | `failed`, under the **ordinary** definition | **no** |
| **L-0094** | no instrument at all | n/a — note reasons from the announcement | `no-objective` | **no** |
| **L-0154** | Art. 281 imposes one — **and it was discharged**; the finding is about undefined verbs | condition 2 excludes it | `no-objective` | **no** |
| **L-0122** | AFSPA (J&K) s.7 **named, not breached** — it sets no standard on the grant rate | condition 3 excludes it | `no-objective` | **no** |
| **L-0164** | **the absence of a duty is the finding** — Arts. 200–201 fix no period | condition 4 excludes it | `no-objective` | **no** |
| **L-0167** | **unresolved** — commission recommendations impose nothing; the ISC Order was not retrieved | the record names no duty | `no-objective` | **no** |

**Nine of nine hold. The rule describes what the corpus was already doing.** That is the whole of its
claim: seven were already correctly distinguished, and each stated its ground in its own note.

**L-0167 is the one the rule deliberately leaves open, and it leaves it open in the right place.**
The record as it stands names no duty, so `no-objective` is correct *on the record*. If the
Presidential Order of 28 May 1990 turns out to prescribe a minimum ISC meeting frequency, the record
acquires a duty, names it, and becomes scorable — and the rule now says exactly what would have to be
true. **A rule that converts an open retrieval into a specified one has done its job.**

## L-0162 and L-0210 — the pair an adversary reads together

Both are **stated, binary and undated**. They take opposite values. Read side by side without a rule,
that is Gemini's finding and there is no text to answer it with. With the rule:

| | **L-0162** | **L-0210** |
|---|---|---|
| the obligation | Article 279A(11): *"shall establish a mechanism to adjudicate any dispute"* | the MHA's own recommendation that the Free Movement Regime be scrapped |
| who imposed it | **the Constitution, on the GST Council** | **MHA, on itself** |
| binds absent any statement by the duty-holder? | **yes** — it binds the Council whether or not the Council ever said anything | **no** — it binds MHA only as far as MHA committed itself, and MHA committed itself to a recommendation |
| `claimAtLaunch` | *"The constitutional text itself: to adjudicate disputes arising out of the Council's recommendations or their implementation."* | *"That the FMR … be scrapped … No date of effect, no notification number, no replacement arrangement and no test of completion accompany it."* |
| governed by | **Ruling 5** — imposed; the missing deadline does not move it | **Ruling 3's ladder and *an objective is a target that can be failed*** — volunteered, binary, no completion test |
| value | **`failed`** | **`no-objective`** |

**The discriminator is who imposed the obligation, and until this commit it was written in neither
record and in no definition.** Both records already say the right thing in their own notes; neither
says the thing that connects them. That is the defect, and it is the subject of report 3.

**One thing the pair also shows, and it is the strongest single argument for the rule's naming
condition:** L-0162 is the only one of the four `failed` records that carries its instrument in
`claimAtLaunch` rather than only in `assessmentNote`. The other three declare the benchmark in the
reasoning field alone, which is the placement finding from `fa518f4` — **the rule now requires the
naming and does not yet require the placement**, and the `claimAtLaunch` `BENCHMARK` proposal is
where the placement would be fixed. Named so the two are not confused: **Ruling 5 says the record
must name the duty; it does not say in which field, and that is deliberate — the field question is a
schema change that has not been authorised.**

## One thing found while writing it, and it is a real gap

**`no-objective` had no bullet of its own in `lib/types.ts` for the whole of its life.** The
`Assessment` doc comment listed nine of the ten enum members; `no-objective` appeared only *inside*
`undated-commitment`'s bullet, as the thing it is distinct from — while carrying roughly half the
ledger. `enum-parity` could not see it: it compares enum **sets** across schema, type and label map,
and the member is present in all three. **A missing definition is not a missing member**, and nothing
in the instrument checks that a member carrying half the corpus has been defined where the type
declares it. The bullet is written in this commit, and it says it was missing.

---

# 3. REPORT — THE PER-RECORD DEFENCE

**The name.** *A rule the corpus applies correctly, states only in the record that applies it, and
therefore cannot be checked, re-applied, or defended in the aggregate.*

Three findings this cycle share it, and they were each found the same way — an external reader
noticed an apparent inconsistency, and the instrument then discovered that the rule was real and
unwritten:

| finding | measured | state now |
|---|---|---|
| **the unmeasured limb** | 8 records state multiple announced objectives; **5 treat an unmeasured limb as disqualifying a definitive verdict, 3 do not.** *"It is not that three records break a rule. No rule exists"* | **Ruling 2, written 2026-08-06** |
| **independence** | *"the axis five rulings turned on. It is recorded nowhere."* **11 of 223 state an independence finding in `assessmentNote`, in four different vocabularies; 212 carry no statement of any kind** | **field proposed, NOT built — phase 17** |
| **the external duty** | 4 records score `failed` against an imposed duty; the discriminator lives in `assessmentNote` and nowhere else | **Ruling 5, written this batch** |

## Why it is a class and not three coincidences

**Five properties, and the first is why no gate has ever fired on one:**

1. **The practice is CORRECT.** Nothing is wrong in the data, so nothing downstream fails. This is the
   same shape as `assessmentNote` rendering on 0 of 164 records with every gate green *precisely
   because the data was correct*.
2. **The justification exists — once per record.** It is not missing. It is distributed.
3. **The vocabulary drifts, because each author writes it fresh.** Independence is the proof: **eleven
   records, four vocabularies.**
4. **It is invisible to every render gate BY CONSTRUCTION.** `no-unguarded-prose-field` binds the
   guarded-marks list to the schema; `reachability` proves each mark reaches its record's page;
   `field-render-audit` observes the built output. **All three prove the note is THERE. None reads
   what it SAYS.** A rule stated in a rendered field is, to this instrument, indistinguishable from
   a rule not stated at all.
5. **It presents as a defect, never as a gap.** The reviewer sees a double standard, an inconsistency,
   three records breaking a rule. The instrument then finds there was no rule to break. **Three times
   this cycle, and each time the reviewer's charge was wrong and the underlying finding was real.**

## The asymmetry that makes it expensive

**The charge is one sentence. The defence is N records.** An adversary writes *"L-0162 and L-0210 are
the same shape and score differently"* in ten words; answering it required reading nine records and
writing a rule. **That asymmetry does not improve with corpus size — it gets worse**, because every
new record written under an unwritten rule adds one more place the defence has to be assembled from.

## THE INVENTORY — what else is governed only by `assessmentNote`

**Emitted by `scratchpad/notegov.mjs`. SCOPE: the 170 of 223 ledger records carrying a non-empty
`assessmentNote`; word-boundary `scanText` over `assessmentNote` ALONE. Every group is a CANDIDATE
list, not a finding** — the term lists match ordinary prose, and no per-record judgement was made
outside the nine of report 2. **No gate emits any of these counts.**

| group | what the note is doing | candidates | split across values |
|---|---|---:|---|
| **D** | declares an **external duty** as the benchmark | **33** | partly 8 · failed 7 · contested 8 · no-objective 7 · worked 1 · awaiting-adj 2 |
| **E** | declares **"no objective was stated"** | **29** | no-objective 25 · contested 3 · partly 1 |
| **C** | declares an **unmeasured or partly-measured limb** | **27** | partly 10 · contested 8 · too-early 4 · failed 3 · worked 1 · no-objective 1 |
| **F** | carries a **correction or rescoring history** | **27** | no-objective 12 · partly 8 · awaiting-adj 3 · contested 2 · failed 1 · undated 1 |
| **A** | **argues against another enum value** — "Not failed", "not reversed", "not contested" | **17** | no-objective 8 · contested 4 · partly 3 · too-early 2 |
| **B** | declares an **independence / source-relationship** judgement | **11** | partly 8 · worked 1 · no-objective 1 · contested 1 |
| **G** | appeals to **the written definition** | **16** | see below |

**Group G is NOT a risk and my first reading of it was wrong.** A loose term list returned 22 and
looked like documented departures. Broken down by term: **`departure` appears in exactly ONE note —
L-0026, the known Ruling 2 case** — and the 16 are `the written definition`, which is records
*appealing to* the definition, i.e. the practice working. **Context before count, applied to my own
scan before it shipped.**

**Group F is the counter-example that proves the class is closable.** It is the one group that got a
mechanism: `tools/withdrawn-wording.mjs` gates it, with 23 wordings recovered from git and 34
exemptions named. **A per-record defence with a gate stops being a per-record defence.**

## WHERE THE NEXT EXTERNAL REVIEW LANDS — the prediction, and why

Ranked by the three properties that made the first three findable: **the class is large · the
practice is split across values · no field records the judgement.**

1. **Group C — Ruling 2 is written and UNENFORCEABLE. This is the strongest prediction.** R2 says an
   unmeasured limb prevents `worked`. **Nothing in the corpus records that a record announced
   multiple objectives, or which of them are measured.** So R2 cannot be re-applied, cannot be
   audited, and its 27 candidates are split across six values. **Writing a rule does not close a
   per-record defence — the rule is now in three files and the facts it operates on are still in 27
   notes.** This is precisely the *"a rule that cannot be re-applied is a rule that will drift"* the
   independence proposal warns about, and it is already true of a rule written this same cycle.
2. **Group A — 17 records defending a value boundary one record at a time.** *"Not failed either"*,
   *"Not contested"*, *"not reversed"*. Each is a boundary between two enum members, argued once. Two
   of these boundaries have since been ruled on (`reversed`'s scope, `no-objective` vs
   `undated-commitment`); the rest have not. **An adversary comparing any two records across one of
   those boundaries gets report 2's finding again, with different ids.**
3. **Group B — independence, 11 of 223 in four vocabularies.** Already proposed, already scheduled
   (phase 17), and it is the one the reviewers found once and would find again.
4. **Group E — 29 notes stating "no objective was stated" while `claimAtLaunch` is empty on 137
   records.** The corpus cannot distinguish *stated absence* from *unfilled field*. Already proposed.

**Groups D and F are now closed** — D by this batch's rule, F by a gate. **That is two of seven, and
the pattern's own measure of progress.**

---

# 4. REPORT — `shockExposure` does two jobs, not three, and the third thing is not a job

**SCOPE: all 66 records carrying the key `shockExposure` in `data/ledger/*.json`, read verbatim in
this operation. Assignment by reading, one primary class per record; the tally is mechanical and
verified exhaustive and disjoint — universe 66, assigned 66, duplicates 0, unassigned 0.** Emitted by
`scratchpad/dump66.mjs` and `scratchpad/tally.mjs`. **No gate emits this.**

| class | what the field is doing | n |
|---|---|---:|
| **CONFOUND** | the shock degrades the measurement or makes attribution unclean | **23** |
| **CAUSE** | the shock produced part of the outcome the verdict credits or debits | **19** |
| **NONE STATED** | a stated absence — *"None material"*, *"None external"*, *"None yet"* | **9** |
| **IS-THE-SHOCK** | reflexive: the record's subject IS the event | **6** |
| **REFUSED (sole)** | the whole of the field is a rejection of an offered explanation | **4** |
| **AMBIGUOUS** | the sentence as written does not settle which job it is doing | **4** |
| **NOT AN EXPOSURE** | the field carries something else entirely | **1** |

**CONFOUND (23):** L-0013 L-0014 L-0018 L-0023 L-0024 L-0025 L-0026 L-0028 L-0034 L-0036 L-0037
L-0038 L-0039 L-0042 L-0043 L-0044 L-0045 L-0048 L-0053 L-0058 L-0070 L-0072 L-0090
**CAUSE (19):** L-0015 L-0017 L-0029 L-0031 L-0040 L-0046 L-0052 L-0054 L-0055 L-0056 L-0057 L-0059
L-0060 L-0062 L-0065 L-0066 L-0068 L-0069 L-0073
**NONE STATED (9):** L-0011 L-0022 L-0030 L-0032 L-0033 L-0035 L-0047 L-0050 L-0071
**IS-THE-SHOCK (6):** L-0020 L-0021 L-0027 L-0064 L-0184 L-0186 — **exactly the six `type: shock`
records that carry the field**, which is an independent check on the reading
**REFUSED, sole (4):** L-0016 L-0041 L-0063 L-0067
**AMBIGUOUS (4):** L-0012 L-0049 L-0051 L-0061
**NOT AN EXPOSURE (1):** L-0091

## The finding: refusal is a MODIFIER, not a job

**11 further records carry a refusal as a clause inside a confound or cause statement** — L-0013
L-0029 L-0036 L-0037 L-0042 L-0044 L-0046 L-0055 L-0059 L-0060 L-0065. **So 15 of 66 refuse or limit
the shock, and only 4 do so as the whole of what the field says.**

That changes the design. Refusal is not a third value parallel to confound and cause — it is an
**adjudication attached to one of them**, and it takes three states the prose already writes:
*accepted* (L-0054: *"accounts for a substantial share of route discontinuation"*), *limited*
(L-0037: *"explains part but not all of the slippage"*), *refused* (L-0067: *"Neither explains the
shortfall in the pre-2020 years"*). **Two axes, not three: WHAT the shock did, and WHETHER the record
accepts it.**

## Why the two jobs cannot share a field: they point opposite ways at a verdict

- **L-0017** (`partly`) states the collision in terms: *"the shock may have caused the win rather than
  obscured it."* **The record itself names the ambiguity the field cannot express.**
- **L-0015** (`contested`): *"Entirely shock-driven — the policy exists only because of the 2014-16
  global oil collapse, which was external and unearned."* A cause that **debits** the government.
- **L-0090** (`partly`): *"Any attribution rests on two points either side of a shock whose depth is
  unmeasured."* A pure confound that **debits nobody** — it degrades the measurement.

`partly` on L-0017 and `partly` on L-0090 mean different things and render identically.

## The four ambiguous, quoted, because they are the argument

- **L-0012** — *"COVID … severely distorts the revenue trajectory **and precipitated the compensation
  dispute**"*. Confound in the first clause, cause in the second, one sentence, no marker.
- **L-0049** — *"COVID suppressed traffic and therefore exposure …, flattering those years."* Whether
  a shock producing a favourable reading is noise on the measurement or a cause of the outcome
  **depends on what is being measured, and the record does not say.**
- **L-0051** (`failed`) — *"the 2021-22 coal price shock raised power purchase costs sharply."* In a
  failure verdict this is either a mitigating cause or irrelevant noise. Unmarked.
- **L-0061** (`too-early`) — *"COVID … **is the stated reason** for much of the delay."* An
  explanation **offered by someone else**, and the record does not say whether it accepts it. **This
  is the counter-explanation job with the adjudication missing**, and it is the clearest single
  argument for making the adjudication a value.

## Three further jobs the field is carrying that nobody decided it should

- **OUTBOUND (3)** — L-0022, L-0033, L-0064 use the field to say the record is a confound **for
  others**: *"this record is itself a confound for every other macro assessment in the project, which
  is why it also exists as provenance record P-10."* That is a statement about the corpus, in a field
  named for this record's exposure, and it is the one that already reaches provenance.
- **A FINDING (1)** — L-0034 puts substantive evidence in it: *"of 24 crore free refills offered in
  FY2020-21, only about 60% were taken up by September 2020, itself evidence of a demand rather than
  supply constraint."* That is a finding about the record's own subject, in the exposure field.
- **A TYPING DECISION (1)** — **L-0091 carries no exposure at all.** It carries the reason the record
  is not typed `shock`. Report 5 is about that sentence.

## What survives, and it is most of the field

**The corpus is good at this and the defect is structural, not editorial.** Nine records state an
absence rather than leaving the field empty — against `claimAtLaunch`, where 137 are silently empty.
Direction is routinely recorded (*flatters*, *cuts both ways*, *pulling in both directions*).
Nettability against the peer panel is stated where it matters. **Every one of the 66 is a judgement
somebody made; none is a placeholder.** The calibration's job is to mark which judgement each one is,
not to write them again.

---

# 5. REPORT — the eight `type: shock` records against L-0091's test

**L-0091's test, verbatim from `data/ledger/education.json`, read in this operation.** It is in the
`shockExposure` field of a record typed `episode`:

> The pandemic itself is the shock; this record is about the response to it and its measurement, not
> about the disease. Note that the record is typed as an episode rather than a shock **precisely
> because closure duration in India was a sequence of state decisions rather than an external
> event.**

**The test, extracted: is the thing the record is about a sequence of Indian state decisions, or an
event arriving from outside the Indian state's control?**

**SCOPE: all 8 records with `type === "shock"` in `data/ledger/*.json`, read in full in this
operation.** Emitted by the cross-tab in `scratchpad/`; no gate emits it.

| record | subject | against L-0091's test |
|---|---|---|
| **L-0002** taper tantrum | Bernanke's May 2013 taper signal → EM capital flight | **PASSES.** A US Federal Reserve signal. (The record also covers Rajan's FCNR(B) response, which is an Indian decision — carried as a stabiliser inside the record, not as its subject.) |
| **L-0021** US tariffs | the United States imposed 25%, then 50% | **PASSES.** A foreign executive act. |
| **L-0184** the fifty per cent wall | EO 14257 and EO 14329 | **PASSES.** Two US executive orders. |
| **L-0186** section 122 surcharge | Proclamation 11012 under a US statute | **PASSES.** |
| **L-0064** the migrant exodus | *"The March 2020 lockdown, **announced with four hours' notice**, triggered the largest internal migration…"* | **FAILS — on the record's own words.** The schema's usage note already quotes its `caseAgainst`: the notice *"was a choice"*. This is a sequence of state decisions and their consequence. |
| **L-0216** Indus Waters Treaty in abeyance | *"the **Cabinet Committee on Security decided** that the Indus Waters Treaty … will be held in abeyance"* | **FAILS, decisively.** The Indian government acting. Note the record's own trigger — the Pahalgam attack — is external; **the record's SUBJECT is the decision, not the attack.** |
| **L-0020** COVID contraction **and fiscal response** | *"National lockdown from March 2020 produced a … contraction … The fiscal deficit spiked to 9.2% of GDP"* | **MIXED, and it contradicts L-0091 directly.** The contraction is external; the fiscal response is a sequence of state decisions. **L-0091 covers the school-closure response to the same pandemic and is typed `episode` on this exact ground; L-0020 covers the fiscal response to the same pandemic and is typed `shock`.** One pandemic, two "response" objects, two types, one stated test applied to one of them. |
| **L-0027** IL&FS collapse | default by a private infrastructure financier, ₹99,355 crore | **THE TEST CANNOT ANSWER IT.** IL&FS is neither a state decision nor external to India. **L-0091's test is binary and the corpus has a third case.** |

**Result: 4 pass, 2 fail, 1 mixed, 1 unreachable by the test as written.** Not "three of five", and not
"five of eight" either.

## The cross-tab that decides L-0216 independently of any taxonomy

**SCOPE: the 8 `type: shock` records, key-in tests.**

| | `claimAtLaunch` | `shockExposure` | assessment |
|---|---|---|---|
| L-0002 | absent | **absent** | baseline-context |
| L-0020 | absent | present | contested |
| L-0021 | absent | present | no-objective |
| L-0027 | absent | present | no-objective |
| L-0064 | absent | present | no-objective |
| L-0184 | **present** | present | no-objective |
| L-0186 | absent | present | no-objective |
| **L-0216** | **present** | **absent** | **partly** |

**L-0216 is the only record in the set that carries a `claimAtLaunch`, carries no `shockExposure`,
and holds an evaluative verdict — and it is the only evaluative verdict among the eight.** Each of
those three is what a *measure* looks like: a shock announces no objective, is exposed to other
shocks, and is not scored. **The taxonomy question does not have to be settled to see that this
record is behaving as a `reform` or an `event` in every field except `type`.**

**L-0184's `claimAtLaunch` is not the same thing and must not be read as one:** it quotes a **United
States** executive order stating its own objective. The announcing body is foreign and no Indian
claim is being scored. L-0216's `claimAtLaunch` is the Cabinet Committee on Security's own condition.

## What the test would need to say to be written into the schema

**Report only. The standing rule forbids resolving the taxonomy inside the phase that uses it, and
the phase has not opened.** Four things L-0091's sentence does not supply:

1. **THREE TERMS, NOT TWO.** L-0091 offers *state decisions* against *external event* and L-0027 is
   neither — a domestic non-state failure. The corpus needs a third term (a monsoon failure and a
   corporate collapse are the same class), or an explicit ruling that domestic non-state events are
   or are not shocks.
2. **THE LOCUS OF THE CAUSING ACT, NOT OF THE EFFECT.** COVID's effects in India are entirely
   domestic; the disease is not. Without this, every shock becomes arguable, because every shock in
   this corpus is measured through Indian data.
3. **A BUNDLING RULE.** L-0020 is one record covering an event and the state's response to it, and
   L-0091 is a second record covering a different response to the same event with a different type.
   The test must say whether the type follows the record's **subject** — and if it does, L-0020's
   title says it has two.
4. **IT MUST BE A TEST ON THE RECORD'S SUBJECT, NOT ON ITS DOMAIN OR ITS TRIGGER.** L-0216 is the
   case: an external trigger and a domestic subject. Stated loosely, any of the three fails would
   pass on its trigger.

**And the sentence is currently load-bearing in the worst possible place.** It governs no schema, no
gate and no other record; it is in a `shockExposure` field, which report 4 shows is not where a
typing decision belongs; and it is the only reasoned application of the boundary anywhere in the
corpus. **A test that exists once, in a field named for something else, is a per-record defence — the
same class as report 3, on a different axis.**

---

# 6. REPORT — could a check have reached the STATE.md contradiction?

**Yes. This one is mechanically reachable, and it is the first of the four that is.**

## What happened

`CLAUDE.md` at `fa518f4` said phase 16 is **shocks calibration**. `drops/cycle-review-and-rulings/STATE.md`
said, in the same tree, *"**Phase 16 is the COUNTERFACTUAL ENGINE**, fixed in `CLAUDE.md`"* — pointing
at the file that said the opposite, in the file a cold read is told to start from. It stood for one
commit.

## Against the batch-19 answer

Batch 14's cycle recorded, and `docs/verification-log.md` carries it:

> A state line asserts a named object's status with a token; today neither the object nor the token is
> marked… A token-matching check would catch **Arc B** (same file, same name, two tokens) and would
> **NOT** catch **phase 14** (a line about a channel against a line about a record, contradictory only
> underneath)… **What would catch both is a convention, not a checker** — every state line dated and
> object-named. Scope only; a new gate is a contract change.

**That conclusion was right for its two instances and does not govern this one.** The three properties
this instance has and phase 14's did not:

1. **The object is explicitly named and machine-identifiable** — a phase number, `phase 16`.
2. **The authority is declared in the corpus itself.** `CLAUDE.md`'s phase table says *"a phase name
   asserted from memory is a premise until it is read off this table."* There is a stated single
   source of truth; batch 19's instances had none.
3. **The vocabulary is closed** — four phase names, in one table.

**Where there is a named object, a declared authority and a closed vocabulary, a checker is possible.
Batch 19's un-catchable instance had none of the three.**

## Sizing it

**SCOPE: tracked files, `git grep`, excluding `node_modules`.**

- Bare references — `phase 1[0-9]` anywhere: **904 mentions across 91 files.** Far too wide; most are
  *"phase 15 found X"*, which asserts nothing about a name.
- **Assertion form** — `phase 1[0-9] (is|was|becomes|=)`: **25 hits.** That is the surface a
  phase-name check would bind, and it is small enough to enumerate and review.

## And the trap, which is the reason to design it carefully rather than build it now

Of the four hits that assert a name for phase 16 **against** the current table, **three are correct
and must not fire**:

- `docs/verification-log.md:1009` — *"Phase 16 is the exception. The counterfactual engine…"*. **The
  log is append-only and a closed entry is never edited**, by a rule whose stated reason is that an
  editable log records only the errors nobody caught. This entry correctly stands; the later entry
  governs.
- `drops/…/STATE.md:196` and `PHASE-16-CALIBRATION-SCOPE.md:38` — both quote the withdrawn wording
  **inside the sentence that withdraws it**, which is the correction convention working.
- `PROPOSALS-2026-08-06.md:3` and `PHASE-16-SCOPE.md` — historical scoping documents written while
  the question was open.

**A guard that forbade the token would fire on three correct instances and zero incorrect ones.** This
is exactly the shape `CLAUDE.md` already documents — *"a guard that forbids a token therefore fails on
a correctly corrected record"* — and it is the second time it would have been written anyway.

## The design, stated and not built

**The mechanism already exists and should be reused rather than re-invented: `tools/withdrawn-wording.mjs`
asserts a PRESENCE IN CONTEXT, never an absence.** A phase-name check is the same object:

1. `CLAUDE.md`'s phase table is parsed as the single source; a table that has moved or changed shape
   **aborts the check**, never falls back — the rule `value-renderings.mjs` already follows.
2. Every assertion-form mention in a tracked file must **agree with the table**, or **appear inside a
   correction sentence** (the `withdrawn-wording` predicate, already written and already gating), or
   live in a file named in an **append-only exemption list** — `docs/verification-log.md` first.
3. Two-sided control: change one table row and assert exactly the disagreeing lines are named; run
   the current tree and assert silence.
4. **Its header states what it does not bind:** a phase named in prose without its number (*"the
   shocks phase"*), an untracked file, and any state line about anything other than a phase.

**Not built. A gate is a contract change and this batch was sized at one rule and four reports.** But
the answer to the question asked is: **not convention only — this instance is reachable, the general
one still is not, and the general convention (every state line dated and object-named) remains
unbuilt and remains right.**

## The fourth instance is the finding

**This is the fourth time this cycle a fact has been correct in one place and stale in another**, and
the pattern is the same as report 3's with the object changed from a rule to a state line: **the
authority was updated and its references were not.** What distinguishes it is that a mechanism is
available here and is not available for a per-record defence — **a phase name is one token against one
table; an unwritten rule is a judgement against nothing.**

---

**One rule written into three files in one commit. Four reports. 0 verdicts moved, proven. No record
authored, no record edited, no enum value added or removed, no gate built, no phase opened, and
neither (a) nor (c) resolved.**
