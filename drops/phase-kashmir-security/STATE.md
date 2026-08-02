# STATE — phase 11, kashmir-security, `--dry`

Run date 2026-08-02. Posture `--dry`: run to the drop, stop before merge. `/data` is NOT touched by this run.

## Stage status

| Stage | Model | Status | Notes |
|---|---|---|---|
| 1 Scope | haiku | COMPLETE | Enum audit clean — verified independently, mechanically, across all four schemas. Counts re-derived from all files, not from `seed.json`. |
| 2 Research | opus | COMPLETE (after one liveness failure + repair) | See below. |
| 3 Author | opus | — | |
| 4 Self-check | haiku | — | |
| 5 Reconcile | haiku | — | |
| 6-8 | — | NOT RUN — `--dry` | |

## Stage 2 liveness failure and repair — recorded, not a trigger

The stage-2 orchestrator died on an API session limit (`resets 10:20pm Asia/Dubai`) after writing 13 of its 15 parts. This is a **liveness failure, not a stop trigger**.

**What was lost and how it was recovered:**

1. **13 parts survived on disk** (~200KB) — 00-sources, 01-periodisation, 02-absences, 03, 04, 05, 06, 08, 09, 10, 11, 12. Nothing was re-derived that already existed.
2. **One fan-out child (`a5e0c13e26c5d7d0b`) returned AFTER the orchestrator died**, so its report was never folded into any part. Preserved verbatim as `parts/06b-caso-and-source-attribution.md`. Its core finding (the 417 = 228+189 redefinition arithmetic) was independently present in five other parts; what is unique to it is the `Source: CID, J&K` attribution, the twice-published 2022-23 report, the publication-lag table, and SATP's architectural separation of its count from MHA's.
3. **One fan-out child (`a927422485bfdb92c`, MHA parliamentary questions) failed outright** and returned nothing.
4. **Two parts were never written, and both were load-bearing:**
   - `07-pellet-and-crowd-control.md` — dangling forward-references to it existed in `00-sources.md:268` and `02-absences.md:175`. A downstream reader would have read those lines and believed quantity (h) was covered.
   - `00-head.md` — carries the per-quantity LEDGER QUESTION answer, which the operator reserved for a decision of their own. `00-sources.md` section 4 forwarded to it and contained nothing else.

   Both were closed by a scoped stage-2 continuation on `claude-opus-5` (model observed, not merely requested), briefed to READ the existing parts rather than redo the stage. Neither existing part was modified.

**The trap this avoided.** Had stage 3 run on the drop as it stood, quantity (h) and the ledger question would have been absent while two parts asserted they were covered elsewhere. Per the spec, a stage may not run against partial input from a prior stage — the gap would have been invisible in the authored output, because authoring launders a gap into finished records.

## Parts on disk (read the PARTS, not an assembly)

There is **no assembled `research.md`, by design.** Two prior cycles were bitten by an assembly that went stale while its sources kept arriving.

| Part | Carries |
|---|---|
| `00-head.md` | Index · consolidated could-not-establish · **the per-quantity ledger answer** |
| `00-sources.md` | The source-instrument map, built by definition not by number |
| `01-periodisation.md` | Every point at which a counting basis changed, dated, with the series to break |
| `02-absences.md` | Absences classified against the four `reasonKind` values as written |
| `03-decline-since-2019.md` | Contested: has militancy declined, and on what measure |
| `04-local-recruitment.md` | Contested: did local recruitment fall or was it reclassified |
| `05-stone-pelting.md` | Contested: consent or suppression |
| `06-encounters-amshipora.md` | Contested: lawful counter-insurgency or extrajudicial killing |
| `06b-caso-and-source-attribution.md` | CASO non-count · the encounters column · `Source: CID, J&K` · SATP methodology (RECOVERED) |
| `07-pellet-and-crowd-control.md` | Contested: pellet shotgun · RS Q.511 refusal · the J&K HC affidavit figures |
| `08-identity-and-burials.md` | Contested: disputed identity of those killed, burial away from home districts |
| `09-provenance-candidates.md` | Candidate provenance records PC-1..n — definitional divergences |
| `10-answerability.md` | The J&K legislature as a counting instrument, and its removal |
| `11-retrieval.md` | Retrieval environment — what was retrieved, what was not, what has gone |
| `12-rights-instruments.md` | Custodial deaths · NHRC · AFSPA s.7 sanction · JKCCS · APDP · OHCHR |

## Resume order if this run dies

1. Read every part in `parts/`. Do not reconstruct from any summary.
2. Read `records/` — if non-empty, stage 3 partially completed; reconcile against the parts before adding.
3. Stage 3 authors against the LIVE schemas in `/schemas`, read at authoring time, not from memory.
4. `--dry` means: never run stage 6. Do not merge to `/data`. Do not open a PR.
