# Phase 18 — design lock. STATE.

**This file did not exist until 2026-08-11, and five commits of phase-18 work had landed without
it.** The live queue was in `drops/phase-17-design-lock/STATE.md` — a directory whose name is
recorded as wrong inside its own first line — and nothing in this phase's own directory carried
state. That is the defect CLAUDE.md names about the phase list itself: *a fact that lives only in
prose references cannot be checked, so a second version of it can run for months without
contradiction.* The queue below supersedes the one at line 2152 of that file, which is quoted where
an item is inherited.

**Read `drops/phase-17-design-lock/STATE.md` as phase 18's opening measurement**, per the CLAUDE.md
phase table. Nothing there is withdrawn by this file except the queue rows restated below.

---

## THE QUEUE, WHOLE, at 13fd64a + this batch

**Nothing blocks the design work.** Every item below is either closed or is a small, scoped,
operator-owned record change. No verdict is in question and no schema or enum is open.

| item | owner | state |
|---|---|---|
| NPA basis — rule 5b failing on 3 of 5 | closed | **CLOSED 2026-08-11.** Basis in the title on `psb-gross-npa` (global operations), `pvt-gross-npa` and `net-npa` (basis not stated); the prohibition in `caveat` on `pvt-gross-npa`. Verified on all four surfaces the figure reaches, with a negative control |
| **overview board dropped 199 declarations** | closed | **CLOSED 2026-08-11, found by the verification above.** The mini wall listed 250 series with no marks — 141 caveats, 58 absences — and `listing-marks` could not see it because its card filter read `grid-title` and the minis carry `mini-t`. Fixed at all three levels: the `OSeries` projection carries the marks, the wall renders them, and the gate's card-class list is named. `listing-marks` 2,634→**2,787** rows, 3,717→**3,916** marks |
| environment: 0 of 15 caveats | closed | **CLOSED — zero is correct**, explanation (a). See the preceding entry and the brief below |
| `$ref` class sweep | closed | **CLOSED.** Two refs in the corpus, both fixed; the resolver is global; no other construct hides a field |
| `pairs.status` — two conventions | **OPERATOR — record change** | **OPEN, trivial.** Schema says `live (default)`, so absence is the intent. The 12 explicit values are **PR-48 to PR-60, one contiguous block** — one session that began writing the default. Consistency = delete `status: "live"` from 12 records. No meaning changes |
| `pairs.status` ⟺ `pairRenders` unenforced | **OPERATOR — contract change** | **OPEN, cheap.** A pure `/data` derivation, ~40 lines, could fold into `validate`. Both directions fail differently: a pending pair whose sides resolve is held and hidden; an unmarked pair that breaks is the A-3 defect that cost eleven pairs |
| `pairs.ledgerRefs` (45 of 60) unread | **OPERATOR** | OPEN debt, exempted with the reason in the schema. A pair naming the ledger records it bears on is real and unbuilt |
| `net-npa` may warrant a prohibition | **OPERATOR — record change** | OPEN. Its basis is unstated, so the axis argument that applies to `pvt-gross-npa` may apply to it. **Not authored, because its note carries no prohibition and writing one would invent a judgement** |
| NAV: 18 distinct destinations | **DESIGN** | OPEN and unchanged. The three additions are grouped; the full grouping is the reserved design item |

### The two debts the pairs extension exposed, recorded rather than folded in

Neither is a rendering gap. Both are fields **carried by records and read by nothing at all** — the
pairs-layer equivalents of `higherIsBetter` and `xAxis`, and found by the same mechanism that found
those: a gate finally able to see the field.

- **`pairs.ledgerRefs` — 45 of 60 pairs carry it.** Its only other appearance in the repository is
  the type declaration in `lib/types.ts`. No view, no accessor, no gate. What it is FOR — a pair
  naming the ledger records it bears on — is real and unbuilt.
- **`pairs.status` — 14 of 60 carry `declared-pending` or `live`.** Nothing reads either, so a
  pending pair is indistinguishable from a live one on every surface that shows it.

Both are exempted by name with the debt stated in the schema description, **not rendered**: a view
added only to satisfy a gate is worse than the gap it closes.

---

## COLD-START BRIEF — environment's caveat rate  ·  ANSWERED 2026-08-11, KEPT FOR THE REASONING

**The answer is (a): the fifteen genuinely need no caveat.** The brief below is left in place
because it named the three explanations and the evidence chose between them — deleting it would
leave the conclusion with no argument attached, and this question has been re-opened three times.

**The observation.** Environment & energy holds 15 series and **0 of them carry a `caveat`**,
against a corpus rate of about 48 per cent. It is the only domain at zero. Raised in phase 17,
carried unresolved through phase 18.

**WHY NO DESIGN BATCH CAN CLOSE IT.** Nothing about it is answerable from the repository. The
question is whether those 15 records SHOULD carry a caveat — a judgement about each record against
the caveat definition, which needs the sources read. A design session can only observe that the rate
is anomalous, which is what every batch since phase 17 has done.

**WHAT SUCH A SESSION WOULD HAVE TO ESTABLISH**, stated so it can be picked up cold:

1. **Read all 15 environment series against the caveat definition** — *a record carrying one would
   mislead without it*; ordinary uncertainty is not a caveat and belongs in `notes`. Per record, not
   as a sweep: a keyword scan produces candidates and the judgement is made and written down one
   record at a time.
2. **Decide which of three explanations holds, and say which**, because they have different
   consequences. (a) The 15 genuinely need none — environment's series are CEA and MNRE capacity and
   generation figures, which are among the cleanest in the corpus, and a zero rate would then be a
   true fact about the subject. (b) The phase-15 authoring under-applied the field, in which case
   the caveats are owed and the batch that wrote them is identifiable from the history. (c) The
   caveat definition is being read differently by different authoring sessions, in which case the
   fix is the definition and not the records.
3. **If (a), record it as a finding rather than leaving the anomaly unexplained.** A zero that is
   correct and unexplained reads exactly like a zero that is an oversight, which is why this item
   has survived three batches.
4. **Check the neighbouring claim before relying on it.** Phase 17 measured environment's four
   uncertainty traps as living in 7 provenance records rather than in series caveats. If that is the
   explanation, the finding is that this domain expresses uncertainty in a different LAYER — which
   is a fact about the corpus's shape and belongs in `/method`, not a backlog of 15 edits.

**Verdict-adjacent: a caveat added to a scored record can change how its verdict reads, so this is
operator-owned in the same way a rescore is.** The session reports; it does not silently edit.

---|---|
| board: events, performance | **CLOSED 2026-08-11.** 125 event ticks over 12 of 14 areas; Kashmir and Poverty carry none and say so in words. Slider step median 2.5ms / p90 3.8ms / 0 long tasks over 48 steps, desktop; mid-tier is a stated 4x assumption, not measured |
| **NAV: nineteen destinations** | **OPEN AND WORSE — see below. Inherited as "thirteen"; it is nineteen, and three of the six added are mine.** |
| environment 0% vs corpus 48% series-caveat rate | OPEN — research, not answerable from the repo; needs the 15 records read against the caveat definition by a session that owns record truth |
| seam-span: 26 spans not declaring, 12 frozen | open deferral with a measured rate. **Re-run 2026-08-11: 127 spans, 101 declare, 26 do not, 12 frozen, 14 wide-only out of scope. Unchanged.** Re-run the tool; never quote this line |
| `field-render-audit` pairs non-prose half | open debt, stated in the gate's own emitted scope as `[prose only, non-prose owed]`. `RENDERINGS` carries no pairs keys and `leafFields` returns `a`/`b` without descending, so `a.label` and `b.label` are not enumerated at all |
| `withdrawn-wording` quotation-identity | open named gap; the input exists (`gen-record-history`), the gate is not built |
| DESIGN: caveat-in-CARD form | **CLOSED 2026-08-11.** Re-derived by balanced scan: 2,320 grid cards, 747 with a caveat, 509 over 300 chars, longest 1,320, on `/ledger/` `/provenance/` `/series/` `/stories/`. The inherited row read 746/466 and named the six TABLE surfaces, which already carried `CaveatRow`. Fixed by one rule — a caveat-bearing card takes the full grid row. **No gate can bind the form**: the HTML is byte-identical either way and the difference is one CSS rule; see the log entry for the two weaker things that are bindable |
| DESIGN: caveat-in-cell form (tables) | **LOOKS CLOSED — verify before re-opening.** All six old table surfaces carry `CaveatRow`; grid cards carry `caveat-inline` with `text-overflow: clip` and no clamp or max-height; `field-render-audit` reports 0 invisible on 4 layers. The inherited row read "open, unchanged" and was stale |

---

## THE NAV REGRESSION, STATED AGAINST MYSELF

The inherited item reads: *"DESIGN: thirteen nav destinations | open, unchanged"*, under the
operator's ruling that the accretion is **design work, not architecture**.

**It is nineteen now.** PRIMARY 3 (`/overview/`, `/domains/`, `/stories/`) plus EVIDENCE 16, with
`/domains/` appearing in both — **eighteen distinct destinations**. Three of the additions are mine,
landed 2026-08-11 in `4bcfcb3`: `/publishers/`, `/corrections/`, `/data/`.

**I added them to a list whose length was already a standing open item, and did not note it.** Each
is defensible on its own — they answer *who published this*, *has this been revised*, and *can I have
the whole thing as data* — and that is exactly how a list gets from thirteen to nineteen: one
defensible item at a time, each one noted nowhere.

**Not fixed here, deliberately.** Grouping the nav is the design decision the operator reserved, and
undoing my three would remove three working surfaces to make a number smaller rather than to make
the nav legible. The honest options, for the operator:

1. **Group the three under one evidence sub-heading** — they are one kind of thing (the corpus about
   itself) and would read as one destination. Contained; touches only what I added.
2. **Take the whole nav** — the reserved design item, now unavoidable at eighteen.
3. **Leave it** — and this file is then the record that the number moved and why.

---

## WHAT LANDED IN PHASE 18 SO FAR

Five commits, 2026-08-10 to 2026-08-11. Each has a verification-log entry; this is the index, not
the account.

| commit | what |
|---|---|
| `040866e` | The overview rebuilt from a status grid into a movement board, on the operator's second rejection. Unit changed from status to movement |
| `4bcfcb3` | The adversarial data-model critique, tested and acted on in part: `/data/v1/` published with its schemas, JSON-LD on 620 pages, git-derived correction history and `/corrections/`, facets on three listing surfaces, `/publishers/` |
| `a88cf7d` | **The deploy was never running the gates.** `vercel.json` carried a four-step copy of a twenty-two-step chain; 18 gates had never run against the deployed artefact. One chain now, bound by `tools/deploy-chain.mjs` |
| `73b0f3a` | Bone & Indigo applied as tokens across the three prototypes. **The Overview grid STOPPED on its own condition** — the shape is not in the data |
| `72a4a12` | The grid's readout ships without the grid: composition and status per area, recognisability order, the §4c framing, live ρ |

**The grid stop is the one to carry forward.** Measured before building: Education 12 solid of 13
against Defence's 11; at a finer grain the ordering inverts (Defence 56 per cent of series reporting,
Education 36) because share-of-series-reporting tracks how many series an area holds. **A later cycle
must not rediscover the grid as an obvious gap and build it** — the measurement is in the
2026-08-11 verification-log entry and the encoding does not carry.

---

## NOT A QUEUE ITEM, BUT INHERITED AND UNRESOLVED

**Phase 13's completeness is an open question**, per the CLAUDE.md phase table: delimitation was
partly covered in phase 12 and neither phase closed on the overlap explicitly. Nothing in phase 18
touches it, and it is restated here so a cold read does not treat 13 as closed.

**`drops/phase-17-design-lock/` is named wrong on purpose** and is left wrong, on the same principle
that leaves a withdrawn wording quoted: renaming it erases the name collision that its own contents
document.
