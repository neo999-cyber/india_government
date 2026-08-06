# Phase 16 — the statutory-benchmark triage, the 38/66 reconciliation, and the exposure calibration

Written 2026-08-06 against `fa518f4`. **One report, one reconciliation, one proposal. No records
authored, no record edited, no schema touched, no verdict moved.**

Every figure below names the script that emitted it and the scope that script bound. **No gate emits
any of them**, and that is stated rather than glossed: `shockExposure`, `claimAtLaunch` and the
benchmark class are outside every gate in the build. Section 4 proposes closing exactly that.

---

# 1. The phase list, quoted as committed

`CLAUDE.md` at `fa518f4`, section *THE PHASE LIST — this is it, and there was not one before*,
verbatim:

| # | phase | state |
|---|---|---|
| 1–9 | the domain phases | closed |
| **10** | **INSERTED — not on the original list.** Numbering in any pre-insertion note is therefore offset by one from this table. | closed |
| 11 | | closed |
| 12 | **partly covered delimitation** | closed, but see below |
| 13 | | **NOT SAFE TO TREAT AS COMPLETE until the delimitation overlap with phase 12 is checked** — the coverage was split across the two and neither closed on it explicitly |
| 14–15 | 15 = environment and energy | closed |
| — | the adversarial-review and rulings cycle | closed 2026-08-06, in `drops/cycle-review-and-rulings/` |
| **16** | **shocks calibration** — input is the whole corpus | **next** |
| **17** | **independence** — the field proposed in `PROPOSALS-2026-08-06.md` | this slot was the counterfactual engine; it is freed, see below |
| **18** | **design lock** | |
| **19** | **polish** | |

**This is the operator correction, committed.** 16 shocks calibration · 17 independence · 18 design
lock · 19 polish. The counterfactual engine is recorded in the same file as **considered and
declined**, with the reasoning, so a later cycle does not rediscover it as an obvious gap — not as
unbuilt.

**AND `STATE.md` STILL CONTRADICTED IT until this batch.** The cold-read entry file
(`drops/cycle-review-and-rulings/STATE.md`, section *AFTER THE CLOSE*) carried
*"**Phase 16 is the COUNTERFACTUAL ENGINE**, fixed in `CLAUDE.md`. The name *shocks calibration* came
from a note outside the repository and was withdrawn on checking."* That sentence was true at
`699f135` and false from `fa518f4` onward, and it sits in the file a cold read is told to start from.
**The defect the phase list was written to prevent had reappeared in the file that points at it**, in
the opposite direction: the authority now says shocks and the entry point said engine. Corrected in
this batch, quoting what it withdrew.

---

# 2. REPORT — the statutory double standard, triaged for the first time

**Status coming in.** `STATE.md` §*Artefact* records it as *"Named by both Gemini reports and by
neither ChatGPT report — so **not cross-family convergent**… **Open, not confirmed.**"* The last batch
reported it as *located and counted* on ten records. **That was a different set and a different
claim** — those ten were records with an evaluative verdict and an empty `claimAtLaunch`, and the
same batch then corrected itself: all ten name their benchmark in `assessmentNote`, so the finding
there is placement, not a double standard. **The charge itself has never been tested.** It is tested
here.

**The charge, as Gemini put it:** L-0095, L-0106, L-0108 and L-0162 are scored `failed` against
statutory or constitutional benchmarks, while L-0094, L-0122, L-0154, L-0164 and L-0167 carry the
same shape and are `no-objective`.

All nine read in full from `/data` in this operation.

## The question the nine have to be sorted by

Not "does the record mention a statute" — six of the nine do. The question that separates them is:

> **Does an instrument other than the record's own subject impose an obligation on an identified
> duty-holder, whose non-performance the record's own evidence establishes?**

## The four scored `failed`

| record | instrument | duty-holder | the obligation | what the record measures against it |
|---|---|---|---|---|
| **L-0095** | RTE Act 2009, s.26 | the Union, as appointing authority for KVS and NVS | vacancies **not to exceed ten per cent** of sanctioned strength | 14.7 → **17.1 %** (KVS) and 23.6 → **29.6 %** (NVS), same twelve months, both at 31 December |
| **L-0106** | RTE Act 2009, s.25 and the Schedule | the appropriate Government | the staffing norm maintained **"in each school"**, **by 31 March 2013** | ~**100,843** single-teacher schools thirteen years past the deadline |
| **L-0162** | Constitution, Art. 279A(11) | the GST Council | *"**shall** establish a mechanism to adjudicate any dispute"* | non-establishment over ten years; four minuted demands; committees index swept 3 Aug 2026 with a positive control |
| **L-0108** | *the recruitment process's own object* | the WB Central School Service Commission | appointment on merit | the 2016 panel set aside **en bloc**, upheld 2025 INSC 437 |

Three of the four answer the question **yes**, on an external instrument, with an identified obligor
and a measured or adjudicated shortfall. **L-0108 is different in kind and should be named as such:**
its benchmark is internal to the measure, not an external instrument. What carries it is that the
non-performance is *adjudicated* — a Supreme Court judgment on the Court's own adopted findings of
fact, which is the strongest independent evidence the corpus recognises. Its verdict is sound; it
does not belong in the same row as the other three, and the record's note already says which
benchmark it used.

## The five scored `no-objective`

| record | the instrument in play | was an obligation breached? |
|---|---|---|
| **L-0094** | none | **No.** Nothing requires the Ministry to table the figure. The nearest thing is a Standing Committee's *"imperative… to seek the data"* — a recommendation. The note reasons it out: *"A disclosure practice is not a measure."* |
| **L-0154** | Constitution, Art. 281 | **No — and the Union complied.** Art. 281 requires the President to **lay** a memorandum on action taken. It was laid. Nothing anywhere requires the five verbs to be defined. The note: *"The Union never claimed the verbs meant anything in particular; that is the finding."* |
| **L-0164** | Constitution, Arts. 200–201 | **No — the finding is the absence of the obligation.** The record's whole subject is that the scheme fixes no period for the Governor or the President. Structurally the inverse of L-0095. |
| **L-0122** | AFSPA (J&K) 1990, s.7 | **No, on the record as written.** S.7 requires prior sanction before prosecution; it sets no standard on the grant rate, so fifty requests and zero grants breaches nothing in s.7. **But see the qualification below.** |
| **L-0167** | three commissions' recommendations; the Inter-State Council | **Not established either way — and this is the one that is genuinely open.** Commission recommendations are advisory and non-implementation breaches nothing. **The Inter-State Council is a separate matter, and it was not tested.** |

## The answer: the shape is not the same in seven of nine — but the charge finds a real defect it mislocates

**Seven of the nine are correctly distinguished** and each names its own ground in `assessmentNote`.
L-0154, L-0164 and L-0094 in particular are not near-misses: in one the duty was discharged, in one
the absence of a duty *is* the finding, and in one there is no instrument at all.

**Two carry unfinished business, and neither is a rescore.**

- **L-0167 — the one place the charge may land, untested.** The record establishes that the
  Inter-State Council *"has met eleven times in thirty-six years and not once in the last ten"*. If
  the Presidential Order of 28 May 1990 constituting the Council under Art. 263 prescribes a minimum
  meeting frequency, then L-0167 has **exactly the L-0095 shape**: a quantified obligation, an
  identified body, and measured non-performance — and it is `no-objective`. **The Order was not
  retrieved in this run.** Routes tried and what each returned: `interstatecouncil.gov.in` pinned to
  164.100.252.222, port 443 refused the connection and port 80 redirected to it; two Internet Archive
  captures of the Order PDF and of the Council page, both 404; `www.mha.gov.in` under a pinned
  resolver (94.206.5.97) on three paths, all 404. Secondary summaries were located and are **not
  adopted** — they are coaching-site accounts, they disagree between *"may meet"* and *"shall meet"*,
  and under rule 3 an unretrieved instrument is not a source. **This is "not retrieved by this
  client", not "not published", and the question stays open with the retrieval named.**
- **L-0122 — an obligation-shaped fact whose governing instrument the record does not name.** The
  record establishes, on the custodians' own attestations to the statutory information authority,
  that **no written criteria for the exercise of the s.7 power exist in documentary form**. That is
  not a s.7 breach. Whether some other instrument requires such norms to exist and be published is a
  question the record does not ask. **The candidate is RTI s.4(1)(b)(iv) and it is named here as a
  candidate only — it was not retrieved in this run and is not cited.** If it bears, the record
  acquires a benchmark it currently lacks. That is a retrieval, not a rescore.

## THE VERDICT-LEVEL FINDING, and it is not the one Gemini stated

**The rule that distinguishes the four from the five is not written down anywhere.** It lives in nine
separate `assessmentNote` fields, one per record, composed by the author of that record.

The enum's own definitions do not supply it. `failed` is defined as *"the measure achieved the
objective stated at announcement"* — negated. `no-objective` rests on *"an objective is a target that
can be failed"*. **Both are framed around the government's own announcement, and neither reaches an
obligation imposed by a statute, the Constitution or a court.** Yet four records score `failed`
against precisely such an obligation. The discriminator they use is real, it is applied consistently
across these nine, and **no definition in the instrument supplies it.**

**The sharpest instance is three undated obligations taking three different values:**

| record | shape | value | the rule that governs it |
|---|---|---|---|
| L-0209 (Myanmar fence) | stated, **quantified**, undated | `undated-commitment` | **written** — Ruling 3 |
| L-0210 (Free Movement Regime) | stated, **binary**, undated | `no-objective` | **written** — *"an objective is a target that can be failed"*; tested and recorded in `STATE.md` |
| **L-0162 (Art. 279A(11))** | stated, **binary**, undated | **`failed`** | **NOT WRITTEN** |

L-0162 is stated, binding, binary and undated, and it is `failed`. L-0210 is stated, binary and
undated, and it is `no-objective`. The distinction — that a constitutional **"shall"** can be failed
where an announced binary position cannot, because the obligation is imposed rather than volunteered
— is correct and is nowhere stated. **On the corpus's own written rules, an adversary reading L-0210
and L-0162 side by side gets Gemini's finding and there is no text to answer them with.**

So the charge is **not confirmed as a double standard** — the practice is consistent — and it is
**not artefact either**. It is a live gap in the definitions, of the same class as `no-objective`
doing two jobs before Ruling 3, and the same class as the phase list existing only in prose
references. **A rule that lives only in per-record notes cannot be checked, so a second version of it
can run for months without contradiction.**

**Reported, not acted on. Writing the rule is a definition change to the `assessment` enum's
governing text and therefore a stop.** What it would take is one paragraph, and its shape is already
visible in the four records: *where the objective is imposed by an instrument other than the
announcement — a statute, a constitutional provision or a court direction — the record is scored
against that instrument, names it, and identifies the duty-holder; the absence of a deadline in the
instrument does not move it to `no-objective`, because an imposed duty is not a volunteered
commitment.*

## The class, bounded

**Emitted by `scratchpad/bench.mjs`. Scope: the 170 of 223 ledger records carrying a non-empty
`assessmentNote`; word-boundary scan of `assessmentNote` ALONE for
`statute, statutory, Constitution, constitutional, Article, section, Act, court, judgment, Schedule,
Supreme Court, High Court`. 57 records match. These are CANDIDATES, not findings** — the term list
matches `section` and `Act` in ordinary prose, and no per-record judgement was made beyond the nine.

| value | candidates | ids |
|---|---:|---|
| contested | 18 | L-0092 L-0096 L-0099 L-0101 L-0224 L-0226 L-0159 L-0160 L-0163 L-0165 L-0168 L-0173 L-0125 L-0136 L-0141 L-0115 L-0076 L-0088 |
| no-objective | 12 | L-0028 L-0164 L-0166 L-0167 L-0172 L-0177 L-0185 L-0187 L-0199 L-0131 L-0138 L-0147 |
| partly | 9 | L-0024 L-0026 L-0098 L-0221 L-0047 L-0052 L-0012 L-0081 L-0038 |
| failed | 8 | L-0095 L-0097 L-0106 L-0108 L-0156 L-0162 L-0077 L-0080 |
| too-early | 5 | L-0225 L-0201 L-0204 L-0205 L-0139 |
| awaiting-adjudication | 3 | L-0134 L-0143 L-0086 |
| reversed | 1 | L-0066 |
| worked | 1 | L-0151 |

**Two things this bounds.** Eight of the corpus's sixteen `failed` records reason from benchmark
language in the note — so the class the unwritten rule governs is half of every failure verdict in
the instrument. And **three of Gemini's five `no-objective` records — L-0094, L-0122, L-0154 — do not
appear here at all**, because their notes name no instrument. Their `no-objective` is reasoned from
the announcement, which is the reading the written definitions do support.

---

# 3. RECONCILIATION — 38 against 66

**They are different fields, different populations, and different KINDS of measurement. Neither is
a measurement error. One of the two is not reproducible as it was stated, and that is the finding.**

## 66 — `shockExposure`, a field-presence count

**Emitted by `scratchpad/measure.mjs`. Scope: every record in `data/ledger/*.json`, N = 223.
Method: `'shockExposure' in record` — the key-in test, not `record.shockExposure || ''`, because an
absent key and an empty string are different facts.**

- key present: **66**
- key present **and** a non-empty string: **66** — the two agree, so the field is never present-empty
- `type: 'shock'`: **8** — L-0002 L-0020 L-0021 L-0027 L-0064 L-0184 L-0186 L-0216
- of the 8, carrying `shockExposure`: **6** — L-0020 L-0021 L-0027 L-0064 L-0184 L-0186
- of the 8, **not** carrying it: **2** — **L-0002** and **L-0216**
- union of the two populations: **68**

**Deterministic and exact.** Re-running it on the same commit returns the same number. It measures
*which records carry the field*, and nothing about what the field says.

## 38 — an exogenous-event prose scan, a candidate count

**Emitted by `scratchpad/exo.mjs` through `scanText` from `tools/lib/corpus-search.mjs` (word
boundaries by default). Scope: all 223 ledger records; the four prose fields `assessmentNote`,
`caseFor`, `caseAgainst`, `whatHappened`; a record counts once however many fields hit.**

**The term list was never recorded**, and the count moves with it:

| term list | records matching | carry `type: shock` or `shockExposure` | carry neither |
|---|---:|---:|---:|
| core 5 — COVID, pandemic, lockdown, war, shock | **39** | 23 | **16** |
| core + morphological variants, 9 (adds the plurals) | 40 | 24 | **16** |
| + named events, 11 (demonetisation, IL&FS, taper, tariff, drought, cyclone) | 48 | 25 | 23 |
| wide, 19 | 52 | 25 | 27 |

**The headline is term-list dependent and the load-bearing claim is not.** The set of sixteen
carrying neither field is **byte-identical** at the core-5 list and at the variants-9 list:
L-0079 L-0089 L-0092 L-0099 L-0105 L-0109 L-0116 L-0133 L-0135 L-0159 L-0161 L-0171 L-0185 L-0189
L-0195 **L-0222** — and it names the same records the last batch quoted (L-0116, L-0099, L-0105,
L-0159). **L-0222 is the only evaluative record in that set at both lists**, which is the claim the
scope rests on, and it holds.

**Every record the wider lists add is a false positive, checked by reading the context, not the
count.** `sanctions` matches *"retirements, resignations, promotions and new sanctions create posts"*
(L-0095), CAATSA in L-0199 and L-0202, and procurement sanctions in L-0200. `tariff` matches
Bhutanese electricity export tariffs eleven times in L-0207 and a Petroleum Ministry duty table in
L-0180. **The three extra "evaluative and unnamed" records the 11-term list appears to find are all
spurious**, which is the `corridor`-in-DPIIT case exactly: the term matches, the boundaries are
correct, and only reading the surrounding text distinguishes it.

## The reconciliation

| | 66 | 38 |
|---|---|---|
| what it counts | records **carrying a field** | records whose **prose argues from an exogenous event** |
| where it looks | `shockExposure` | `assessmentNote` · `caseFor` · `caseAgainst` · `whatHappened` |
| kind | field presence — exact, deterministic | keyword candidates — a term list is a scope, and it decides the number |
| reproducible from the report? | yes | **no, as stated; yes once the term list is named** |
| my re-derivation | **66, exact** | **39** at the nearest defensible list |

**They do not overlap the way a reader would guess: 45 of the 68 records carrying an exposure field
do not use exogenous-event language in the four scanned fields.** That is consistent rather than
contradictory — `shockExposure` is *where the shock is named*, and the four scanned fields are *where
it is argued*. A record that names COVID in its exposure field and then never mentions it in its
reasoning is the normal case.

**The defect, stated plainly.** The last batch's *"38 ledger records reason from an exogenous event"*
is a candidate count reported without its scope. Re-derived it is 39, or 40, or 48, or 52. **A count
whose scope is unstated is wrong by an amount nobody can see, including the author** — and the same
batch that published it wrote that sentence into `CLAUDE.md` about a different count. The number is
close to right and the method was not recorded, so nothing downstream could have caught it. **The
correct figure to carry forward is not a number at all: it is the sixteen ids and the term list that
produced them.**

---

# 4. PROPOSAL — the calibration. Exposure as a property

**Proposal only.** No schema written, no field added, no record touched.

## What is actually there

**Emitted by `scratchpad/measure.mjs` and by reading all 66 values verbatim.**

`shockExposure` is free prose on 66 records, rendered in exactly one place —
`app/ledger/[id]/page.tsx:124`, as a `<dd>` in the record's own definition list. Nothing else in the
repository reads it: no index, no filter, no cross-tab, no lens, no gate. `tools/enum-parity`,
`figure-consistency`, `reachability` and `domain-coverage` are all blind to it. `field-render-audit`
observes that it reaches its own page and asserts nothing about its content. The only other reader is
`tools/gen-adversarial-pass-input.mjs:720`, which labels it **"Confounding shocks"** — a narrower
thing than *exposure*, and the mismatch between those two words is the phase's subject.

**The corpus is far better at this than the field's status suggests, which is why this is calibration
and not repair.** Reading all 66:

- **A stated-absence vocabulary already exists in the wild**, unprompted and near-consistent:
  *"None material"* (L-0032, L-0035, L-0047, L-0050, L-0071), *"None material — the programme
  continued through COVID"*, *"None yet"* (L-0033), *"None external"* (L-0011), *"None —"* (L-0022).
  **Unlike `claimAtLaunch`, where 137 records are silently empty, this field's absences are stated.**
- **Direction is routinely recorded** — *"flatters the outcome"* (L-0028), *"flattering those years"*
  (L-0049), *"cuts both ways"* (L-0060), *"pulling the utilisation series in both directions"*
  (L-0039).
- **Nettability against the peer panel is routinely recorded** — L-0186: *"Applied to all trading
  partners, so unlike L-0184 this one IS shared with the peer panel and can be netted against it"*;
  L-0184 and L-0021: *"India-specific in severity… cannot be netted out by peer comparison."*
- **Reflexive cases are marked** — *"This record IS the shock"* (L-0020, L-0064, L-0027), and *"this
  record is itself a confound for every other macro assessment in the project"* (L-0022 → P-10,
  L-0033 → P-21), which is already the right instinct: a shock that breaks comparability gets a
  provenance record.
- **And the field is doing at least three unmarked jobs at once.** A *confound* on the measurement
  (L-0044: *"COVID interrupted FY2020-21 construction"*); a *cause of the outcome the verdict is
  crediting* (L-0017: *"the shock may have caused the win rather than obscured it"*; L-0015:
  *"the policy exists only because of the 2014-16 global oil collapse"*); and a *counter-explanation
  the record refuses* (L-0067, L-0041: *"Neither explains the shortfall in the pre-2020 years"*).
  **These have opposite consequences for a verdict and render identically.**

## What a shock would be as a first-class object

**A shock is a dated exogenous event that more than one record reasons from, and whose properties are
facts about the event rather than about any record.** Three properties are the whole of it, and each
is one the corpus is *already* restating per record, which is what makes them the right three:

1. **window** — a start and an end. Already present, per record, in prose, and drifting: *"COVID"*,
   *"2020-22"*, *"FY2020-21 and FY2021-22"*, *"the acute phase"* all appear for the same event.
2. **shared with the peer panel, or India-specific** — decides whether peer-index normalisation nets
   it out. This is *the* property that is currently retyped in three records (L-0021, L-0184, L-0186)
   in nearly the same sentence, two saying one thing and one the opposite about three different
   events. **A property of the event stated three times in three records is a property that can
   drift, and nothing would report it.**
3. **whether it breaks a series** — and if so, the provenance record that carries the break. L-0022 →
   P-10 and L-0033 → P-21 are the existing instances.

**The eight `type: shock` records are NOT the corpus's shock inventory, and this is the finding that
sizes the phase.** The events actually reasoned from across the 66 include COVID, the national
lockdown, demonetisation, GST, the 2014-16 global oil collapse, the 2022 commodity / food /
fertiliser / coal price shock, the 2022 heat shock, IL&FS, the AQR credit squeeze, the 2021-22 global
shipping disruption, the global solar module price fall, China+1, and the 2025-26 US tariffs.
**Most of those have no `type: shock` record.** The inventory lives in 66 prose fields and is larger
than the eight; `type: shock` selects the events that were *important enough to get their own
record*, which is a different question.

## How a record's exposure to one would be recorded

**Structured reference plus the reasoning, never the reference alone.** The existing prose is the
asset and must survive verbatim — it is where the judgement is, and a field that replaced it with an
id would destroy the thing being calibrated. The shape:

- **which shock**, by reference rather than by spelling — this is what makes exposure countable and
  queryable, and it is the whole mechanical gain;
- **what role it plays**, from a small closed set, because the three jobs above have opposite
  consequences: `confound` (it degrades the measurement) · `cause` (it produced part of the outcome
  the verdict credits or debits) · `refused` (it is an explanation offered by someone else and the
  record rejects it) · `is-the-shock` (the record's subject *is* the event);
- **direction**, where the record states one — `flatters` / `depresses` / `both` / `unstated`;
- **the prose, unchanged**, carrying why.

And **a stated absence is a value, not an empty field** — the corpus already writes *"None
material"*, *"None external"*, *"None yet"*; the proposal is that it be a value the corpus can count
rather than a phrase it happens to use.

**The migration is a transcription and it is genuinely small**: 66 records already hold the sentence,
and the shock named in each is legible from it.

## What a gate would check

**Four assertions, and the fourth is the one worth building.** Each states what it binds and, per the
guard rule, what it does not.

1. **Every shock reference resolves.** Binds: the reference. Does not bind: whether the right shock
   was named.
2. **A `type: shock` record states its own exposure.** **This fires today on L-0002 and L-0216** — two
   records typed as shocks with the key absent. Binds: presence. Does not bind: content.
3. **A record whose window overlaps a shock's window, and which reasons from an exogenous event in
   its four prose fields, has either an exposure entry or a stated absence.** This is the heuristic
   half, and it is a **ratchet** exactly as `seam-span` is: it will emit candidates, the residual is
   semantic, and it cannot gate on the heuristic alone. Freeze the judged set with the judgement
   beside each, fail on anything new. **The current candidate list is the sixteen from §3, and it is
   stable across two term lists.**
4. **A shock's properties are asserted once.** Where a record's prose contradicts the shock object it
   references on nettability or window, the gate names both. **This is the only one of the four that
   catches something no reading would**, because the two sentences are in different files and each is
   correct in isolation — the same shape as the derived-quantity rule 5c, where both computations are
   right and only the provenance of the input is wrong.

**What none of them checks, and it goes in the header rather than being implied by a green line:**
whether the exposure a record states is the *right* one. No gate can reach that.

## What the corpus could then answer that it cannot today

1. **"Which verdicts are exposed to COVID?"** — unanswerable now; 66 prose fields and no index. This
   is the reader question the phase should be measured against, per the last batch's own standard:
   *not the number of shocks found, but whether a reader can tell, for any record, which exogenous
   events the verdict is exposed to and which it refuses.*
2. **The separation the field currently hides.** *Confound* and *cause* point opposite ways at a
   verdict. Today `partly` on L-0017 (the shock may have caused the win) and `partly` on L-0044 (the
   shock degraded the measurement) are indistinguishable to everything except a reader of both.
3. **Whether a shock is netted or carried, consistently.** Rule 8 governs peer-index normalisation
   for every modelled quantity the corpus already carries; whether an event is shared with the panel
   decides whether that method is available. That judgement exists in three records' prose and
   nowhere a method page can read it.
4. **The reflexive case, properly.** A record that *is* a shock is a confound for others. L-0022 and
   L-0033 say so in words. With a reference, "which records are downstream of this shock" is a query.
5. **And it would have caught the §3 defect.** A counted, referenced exposure makes *"38 records
   reason from an exogenous event"* a query with a fixed scope instead of a keyword sweep whose term
   list was never written down.

## WHAT MUST BE SETTLED BEFORE THE PHASE OPENS — stated, not settled

**The standing rule is binding and is quoted rather than paraphrased**, from
`.claude/skills/phase/SKILL.md`:

> **Do not resolve one mid-phase**; `differentFacts` reached seventeen records because a taxonomy was
> resolved in the pass that discovered it.

**So the phase may not fix the definition of the thing it is calibrating.** These are the questions,
with the material each needs, and they are for the operator before phase 16 opens — not for the phase.

**(a) Is `shock` external-only?** The schema's own usage note states the external reading and admits
it does not hold. **The note is also stale in both its numbers, and that is a fact about this batch's
reading, not a proposal to edit it:** it says *"fits three of the five"* and there are **eight**
`type: shock` records at `fa518f4`. On the external reading the members that do not fit are:

- **L-0027, IL&FS** — a domestic corporate collapse. Named in the schema note. The instance the
  operator named.
- **L-0064, the migrant exodus** — named in the schema note, which quotes the record's own
  `caseAgainst`: the four hours' notice *"was a choice"*.
- **L-0216, the Indus Waters Treaty put in abeyance** — **not named in the schema note, because it
  postdates it.** This is the Cabinet Committee on Security's own decision of 23 April 2025: the
  Indian government acting, which is the schema's definition of `reform` (*"a measure the state
  deliberately introduced"*) or `event`, and the opposite of *"a disruption arriving from outside the
  government's control"*. **A third member, and on the external reading the clearest of the three.**

**The corpus already contains a reasoned application of the boundary, and it cuts the other way.**
L-0091 declines shock typing in terms: *"the record is typed as an episode rather than a shock
precisely because closure duration in India was a sequence of state decisions rather than an external
event."* **So one record applies the external test explicitly and three sit against it.** That is the
inconsistency at full size — not one member, four — and L-0091 is where the test is already written.

**(b) Is "shock" one axis or two?** The reflexive cases (*"This record IS the shock"*) and the
downstream cases (*"COVID disrupted FY2020-21 construction"*) are being carried by one field.
Whether *being* a shock and *being exposed to* one are the same axis decides whether `type: shock`
survives the calibration at all, or becomes an exposure entry pointing at itself.

**(c) Does a shock become a record, a provenance entry, or neither?** The corpus does all three today
— L-0020 is a ledger record, P-10 and P-21 are provenance, and the 2022 heat shock is prose in six
records and nothing else. **A first-class shock object presupposes an answer**, and this one is the
gating question: it decides whether the phase is a new layer, a use of provenance, or a field.

**(d) The three properties — window, shared-with-panel, breaks-a-series — are they the right three?**
They are what the existing prose already carries. Nothing establishes they are sufficient, and adding
a fourth after 66 records are migrated is more expensive than deciding it now.

**Until (a) and (c) are settled, the phase can measure and cannot record.** That is not a blocker on
opening it — the measurement half is real work and none of it presupposes the taxonomy: the sixteen
unnamed records, L-0002 and L-0216's absent exposure, the 66 read for role and direction, and the
inventory of events actually reasoned from. **The recording half waits.**

---

**No records authored, none edited, no schema touched, no gate added, no verdict moved. One report,
one reconciliation, one proposal, and one stale line in `STATE.md` corrected.**
