# `no-unguarded-prose-field` fixtures

Two injected guarded-marks lists, used through the gate's `--marks-json` seam.

- `marks-full.json` — the real list. The gate must stay SILENT on it.
- `marks-without-assessmentnote.json` — the same list with `assessmentNote` removed. The gate must
  FIRE and must name `ledger.assessmentNote`.

`assessmentNote` is the field chosen deliberately: its absence from the guarded list is the actual
defect that shipped 164 invisible marks in phase 15, so the fixture reproduces the real regression
rather than a modelled one.

**These are GENERATED from `tools/lib/guarded-marks.mjs`.** If the guarded list changes, regenerate
them — a stale `marks-full.json` would let the positive control pass against a list the gate no
longer uses, which is the whole failure this pair exists to catch. The selftest additionally runs
the gate with NO seam at all, against the live schemas, so a stale fixture cannot hide a real break.
