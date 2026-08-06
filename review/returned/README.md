# Returned adversarial reviews — pass A, structural

Two independent reviews of `review/pass-a-structural.md`, run separately on two non-Claude model
families with no contact between them, returned 6 August 2026.

- `pass-a-review-A-2026-08-06.pdf` / `.txt` — "Adversarial structural review", 8 findings
- `pass-a-gemini-2026-08-06.pdf` / `.txt` — Gemini, 3 sections

**Captured verbatim. Nothing in these files has been edited, answered or rebutted** — the triage is
in `drops/phase-environment-energy/STATE.md` under BATCH 7, and it classifies rather than resolves.

**Both describe the corpus at `059912b`**, the commit the extract was generated from, NOT at HEAD.
`contestedGround` shipped and `commitmentState` was backed out after they were written. Classify
against `059912b` or a fixed defect will be recorded as a reviewer error.

The `.txt` files are `pdftotext -layout` extractions, kept because a PDF is not greppable and every
later cycle will want to search these rather than reopen them.

## Pass B — deep reading, returned 6 August 2026

- `pass-b-review-2026-08-06.pdf` / `.txt` — "Where the instrument breaks", 11 sections

**ONE review, not two.** The batch that commissioned the triage described "two independent pass-B
reviews"; only one was delivered. **Nothing in the pass-B set is convergent-by-independence**, and the
weighting that governed the pass-A triage — a finding two reviewers reached separately carries more
than either alone — does not apply here. Every pass-B finding is single-source and is classified as
such.

It read `pass-b-deep.md` as generated at `1af2d61` — the corrected extract, with full assessment notes
and correction clauses intact. Its findings therefore rest on evidence the pass-A extract had removed,
which is why it reaches the opposite conclusion on L-0026.
