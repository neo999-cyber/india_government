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

## THE QUEUE, WHOLE, at 1b8c7a9 + this batch

| item | owner | state |
|---|---|---|
| masthead / nav placement | closed | **CLOSED.** Four destinations — Overview · Explore · Stories · Search. The five groups moved whole into a footer directory; no route changed, nothing behind a disclosure. `/search/` built rather than the item omitted; weight measured and cut from 416 to **178 KB gzipped** |
| domain page rebuild | **PATTERN DONE, 13 OWED** | **macro CLOSED.** Lead by stated criterion, four authored periods citing their records, chart grid, records as items, three disclosures. **The other thirteen render the same page without the periods block** — the structure is generic, the writing is not |
| explore index | closed | **CLOSED.** Fourteen cards with an authored one-line character and the lead series' current value. Schema order, nothing sorted |
| type scale | closed | **CLOSED.** Body 17px, Spectral display at clamp(2.4rem, 5.5vw, 4rem), mono reserved. One declared exception: `.table-wrap table` at 0.8125rem, because a 269-row table is not prose |
| selection ≠ ranking | closed | **CLOSED.** Written into CLAUDE.md. Rule 9 was forcing every page to dump everything; a stated checkable criterion is selection, an unstated judgement is ranking |
| guard-shape class | closed as a report | **REPORTED.** `listing-marks` is the only markup-bound gate and necessarily so — it is the only one asking about PROXIMITY, which needs a container. Recommendation is neither shape nor attribute but a **loud gap**: report any record link inside no recognised row shape. Not built |
| **share cards** | **OPERATOR — accepted, unbuilt** | Text-only OG tags, per `SHARE-CARDS-SCOPE.md`. Decision recorded; implementation is a later batch |
| **the thirteen domain pages** | **WRITING — later batch** | Four periods per area, ~90 words each, each naming the records it draws on. Governance has 110 records, poverty has 3 and would take one period not four. ~2 areas per batch, ~7 batches. **The only part that cannot be generated** |

---|---|---|
| copy against newly-marked feature charts | closed | **CLOSED.** 4 surfaces, 3 marked series. **Two distinct problems**: the homepage opening was UNDER-qualified *and inoculating* — it named the FY2020-21 restatement, so a reader had been told the denominator was handled, while the caveat's subject is an ongoing decline making half the trend an artefact. The homepage stop and the story callout were DUPLICATING their caveats. All three rewritten; no caveat softened |
| nav grouping | closed | **CLOSED — the whole nav.** 18 destinations, 3 groups → 5: primary · browse · records · limits · about the record. No route moved, nothing behind a disclosure, every surface still one click from every page |
| `ledgerRefs` reverse index | closed | **CLOSED.** `pairsNaming()`, 65 rows across 51 records, under the connections diagram. Zero overlap with hosted pairs. Tripped `listing-marks` correctly and widened `isPairRow` from `<td>` to any element-wrapped `PR-xx` — the third guard bound to one shape of several |
| **share cards** | **OPERATOR — two decisions** | **SCOPED, NOT BUILT.** `SHARE-CARDS-SCOPE.md`. (1) `next/og` is UNAVAILABLE — tested, fails the build under `output: export`; recommendation is text-only OG tags, and the reason is a rule conflict rather than cost. (2) `X-Robots-Tag: noindex, nofollow` is served on every route, so cards work for a pasted link and nothing for search discovery — two settings made at different times, and only the operator can say which is intended |

### The standing design item, unchanged

Nothing else is queued for design. The two items the phase opened with — nav, and a caveat rendering
in full inside a table cell — are both closed.

---|---|
| `pairs.status` — two conventions | **CLOSED.** `status: "live"` deleted from 12 records (PR-48…PR-60). Declared numstat 0/12, actual 2/14 — two records carried it as the last key, so `],` became `]`. The key-level assertion held exactly |
| correspondence unenforced | **CLOSED.** `pair-status` in `checkIntegrity`, so it runs inside `validate` at no build cost. Both directions proven by `tests/fixtures/pair-status/` and two `ISOLATED` selftest entries; the enforcement itself was proven by removing a fixture and watching the selftest name the unmet expectation |
| `pairs.ledgerRefs` | **CLOSED as a question — it is a DEBT, not dead.** 45/60 pairs, 68 refs, 53 records, **0 dangling**, and **no ledger record names a pair**, so it is not derivable and deleting it loses information. The unbuilt thing is the REVERSE index: L-0074 never learns PR-14 exists. A view, not a report |
| `net-npa` prohibition | **CLOSED — the evidence does not support one.** It is the ONLY net NPA ratio in the corpus; `pvt-gross-npa` is one of three gross ratios on the same unit. A prohibition needs something to prohibit. No record changed; the reasoning is in the log so it closes |
| the 199-declaration hole | **CLOSED and the CLASS is named** — see CLAUDE.md. Three shapes: the listing row, the narrowing projection, the embedded feature. Swept: 10 projections, 1 instance (fixed); 668 pages, 1 empirical candidate — **the homepage, and it was real** |
| **NAV: 18 distinct destinations** | **OPEN — DESIGN, reserved.** The only item left. The three additions are grouped under *about the record*; the full grouping is the design decision |

### Found and fixed inside this batch, not inherited

**`SeriesChart` rendered no marks for its whole life.** The homepage's opening chart is
`higher-ed-ger`, whose caveat says roughly half the headline rise is denominator shrinkage — under a
takeaway reporting the rise and a heading calling it well measured. Both render gates were correct
and both were out of scope: a feature chart is not a listing row, and the field does reach the
record's own page. Fixed; the 622-character caveat renders in full on the homepage.

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
