# The design research, read and dispositioned — 2026-08-10

Thirteen inputs: seven HTML mocks, four PDFs, one external critique, two reference sites. All read
in full. This file records what each one is worth and which part of it survives into
`DESIGN-SCOPE.md`, so a later cycle can tell **considered and rejected** from **never seen**.

## The headline

**The direction rev2 reached is right.** Every rejection in its §7 traces to a rule this corpus
earned — citability, defensible encodings, no model output as evidence, no composite — rather than
to taste. The external critique in `chatgpt.docx` was high quality, its seven changes were all
correctly adopted as rev2's ⟳ marks, and nothing it proposed was wrongly taken.

**The one systematic over-reach:** the rejected designs were rejected for **what they would
assert**, and the experience was discarded along with the assertion. Three come back in
`DESIGN-SCOPE.md` §4d with the assertion removed.

**The one factual failure:** rev2 named renewables "the richest uncertainty material in the corpus"
without measuring it. It is the corpus's only domain with a 0% series-caveat rate. Corrected in
§11a.

## Per artifact

| Artifact | What it is | Disposition |
|---|---|---|
| `01_policy_graph.html` | Dark force-graph; policies, indicators, shocks, sources as nodes; evidence-weighted edges; AI query box | **Causal edges rejected, rightly** — `affectsSeries` is deliberately narrow ("series this record is *specifically about*, NOT everything it bears on"), so drawing policy→outcome would assert what the corpus refuses. **Three ideas survive:** its typed edge vocabulary → §4d.1 connections diagram; its edge-strength honesty (solid/dashed/dotted) → the relation-type labels; its "query resolves to a subgraph, never answers from memory" → plain structured search (§7). |
| `03_policy_debugger.html` | inputs → intervention → expected → observed; ✓/△/✕/? trace; confidence chips | **The best mock of the set, already adopted** as the record structure. Maps 1:1 onto `objectives[]` with `grounds`/`measurement`, `unmeasured[]`, `shockExposure` role=confound. Corrections stand: no software metaphor, **no "Mixed" summary score** (a composite by the back door), symbols always with words, "Promised" → "What was proposed or changed." |
| `04_infinite_zoom.html` | India → domain → topic → record → evidence, no page changes | **Rejected rightly** — unlinkable, no back button, uncitable. **The sequence survives**: that hierarchy is already pages with URLs. §4d.2 adds View Transitions between them, so the feel returns and citability is kept. |
| `variation_1_atlas.html` | Warm paper, semantic zones, year slider, right detail panel | **Closest to the right register.** Zones (not treemap) → Explore shape. Detail panel → bottom sheet on phones. Year slider waits for §7a's three-state rules. |
| `variation_2_timeline.html` | Dark, timeline-first, year rail + scrubber | Timeline as *the* organizing frame: no — chronology is one lens. **Survives** as the postponed Time surface: term bands behind calendar years, event cards to records. The ledger is date-rich and supports it. |
| `variation_3_editorial.html` | "India, Explained" — questions first, evidence drawer | **The largest single donor to the adopted direction.** Question-led entry, progressive disclosure, "what the data cannot tell us" as a first-class section — all present in the scope. Name over-promises; §10. |
| `variation_4_evidence_explorer.html` | Dense workspace: left nav, chip filters, always-on inspector | Wrong register for the public front — **but this is approximately what the deployed instrument already is.** It survives as the evidence layer the §4b control opens into, which is what the one-site decision settles. |
| `India_Nodal_Discovery_Mock.html` + `India_Nodal_Discovery_Architecture.pdf` | Embeddings + UMAP similarity map; blend sliders; "why related?" panel | **Rejected rightly, and the deck contains its own tell:** it requires a "Why related?" explainer for every position. If every position needs an explanation, position is the wrong primary encoding. UMAP distance is a model's opinion rendered as navigation. **Survives:** the discovery loop as §4d.3 "related records with stated reasons". Its integrity slide (area/distance/colour must have explicit meaning; never subjective importance) is already corpus law and worth keeping as a reference. |
| `India_2014_Today_UX_Foundation_Atlas_Update.pdf` | The soberest input: three engagement depths; nav = Overview/Explore/Timeline/Compare/Search; Atlas interaction model; semantic territories; "borrow the interaction, not the trade treemap" | **Mostly right and mostly already absorbed.** Its nav model resolves the thirteen-destination queue item (§10a). Its "counts are a credibility signal later, never the lead" matches the no-database-size rule. Its treemap warning is rule 7 restated. Its "complexity available, not mandatory" is the §4b control's thesis. |
| `Website Layout Recommendations.pdf` | Brainstorm: graph / galaxy / causal explorer / data cube / infinite zoom / AI nav / X-ray / debugger, star-rated | The idea factory the scope docs filtered — **and the filter was applied correctly.** Everything it rates highest on *technical ambition* fails a corpus rule; the two it rates highest on *usability* (debugger, X-ray) are the two that survived, in better forms. Its §6 "AI as query compiler" was the one idea ruled on nowhere; now ruled in §7. |
| `Dashboard style ideas.pdf` | Fintech and health dashboards: KPI tiles, gauges, glassmorphism, dark neon, avatars | **Rejected whole**, and it answers a register question rather than a layout one. Every sample says *product*; this must say *record*. Its value is as the anti-reference: §6's exclusion list is precisely this deck. |
| `chatgpt.docx` | External critique of rev1 | **High quality. All seven changes correctly adopted** as rev2's ⟳ marks. Sharpest point — the coverage map as opening image contradicts the nihilism guard — produced §3a, the single most important structural fix in the revision. Nothing wrongly adopted; the gaps it left are the two decisions and the AI ruling now in §1 and §7. |
| `justus-john.com` | Reference: palette + smoothness | **Smoothness transfers** as motion language: restrained scroll choreography, charts that draw themselves. **Palette does not transfer by citation** — rev1 cites it for warm off-white `#faf9f7`; retrieved 2026-08-10 it reads dark. Verify visually before adopting a hex. §6. |
| `atlas.hks.harvard.edu/explore/treemap` | Reference: the deep one | **Five properties adopted, the treemap not:** overview before records · a persistent year control · progressive drill-down · several views of one dataset · **every state URL-encoded**. The last is exactly §7a's citability demand, and it is the property the infinite-zoom mock failed. Area encoding only where defensible — §4c's evaluability view qualifies with rev2's wording; "importance" never does. |

## What this changed in the scope

1. §9 rewritten — the three prerequisites are closed, the inventory exists, architecture closed.
2. §11a — story subject moved from renewables to education, on measurement, withdrawn wording quoted.
3. §3b — homepage charts bound to the inventory's five non-fiscal subjects.
4. §1 — site model and prototype form settled by the operator.
5. §7 — the AI query layer ruled out, on architecture and on method.
6. §4d — three rejected experiences returned with their assertions removed.
7. §10a — the thirteen-destination nav item resolved.
8. §6 — palette reference qualified rather than cited.
9. §12 — acceptance criteria, which neither revision had.
