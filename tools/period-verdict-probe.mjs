#!/usr/bin/env node
/**
 * PERIOD-VERDICT PROBE — report-only, NOT in the build, and the reason is a measured ratio.
 *
 * Domain period prose cites the ledger ids it is written from. If one of those records is rescored,
 * the prose asserts a verdict it no longer holds and no gate can see it — the prose-shadow class at
 * page level. This asks the narrow version of that question: **does every id in a period's `from`
 * still carry an assessment the period's body names?**
 *
 * ============================ WHY IT IS A PROBE AND NOT A GATE ================================
 *
 * **Measured over 11 periods and 49 cited ids: 9 candidates, 1 real. One in nine.** Turning that
 * red would fail the build on eight correct paragraphs, which is the shape `withdrawn-wording` and
 * `phase-name` were both designed around — assert a presence in context, never an absence.
 *
 * The eight fail in two ways and neither is fixable lexically:
 *   - **A period cites a record it DESCRIBES without scoring.** L-0157 and L-0176 are named for the
 *     cesses they levied; the *"scored too-early"* beside L-0022 and L-0021 refers to four trade
 *     agreements sitting in the same sentence.
 *   - **A verdict can be asserted in PARAPHRASE.** *"entered with no target to score at all"* is
 *     `no-objective` stated correctly and contains none of the token.
 *
 * ============================ WHAT IT FOUND, WHICH IS WHY IT IS KEPT ==========================
 *
 * On its first run it caught a real one that reading had missed: the `macro` 2014–2016 period called
 * L-0014 *"settled rather than argued"* five days after that record was rescored `worked` →
 * `contested`. Run it when period prose changes or when a cited record is rescored.
 *
 * **Its own first run also produced a false candidate from a hand-typed enum** — `reversed` was
 * missing, so a period saying in terms *"the corpus's only reversed record"* was flagged. The enum
 * is read from the schema now. A checker measuring whether checking is feasible must not itself be
 * the thing that fails.
 */
const { DOMAIN_PERIODS } = await import(process.cwd() + '/lib/domain-copy.ts');
const { ledger } = await import(process.cwd() + '/lib/data.ts');
const byId = new Map(ledger.map((l) => [l.id, l]));

// THE ENUM IS READ FROM THE SCHEMA, NOT TYPED. Typing it produced a false candidate on the first
// run: `reversed` was missing, so L-0066 — whose period says in terms "the corpus's only reversed
// record" — was reported as a mismatch. A hand-typed vocabulary is the keyword-scan trap wearing a
// different hat, and this file is measuring whether a CHECK is buildable, so its own list must not
// be the thing that fails.
const { createRequire } = await import('node:module');
const VALUES = createRequire(process.cwd() + '/x.js')('./schemas/ledger.schema.json')
  .properties.assessment.enum;

let periods = 0, ids = 0, dangling = 0, asserted = 0, mismatched = 0;
const notes = [];
for (const [domain, ps] of Object.entries(DOMAIN_PERIODS)) {
  for (const p of ps) {
    periods++;
    for (const id of p.from) {
      ids++;
      const r = byId.get(id);
      if (!r) { dangling++; notes.push(`DANGLING  ${domain}  ${id}`); continue; }
      // Which verdict words does this period's prose actually use?
      const used = VALUES.filter((v) => new RegExp(`\\b${v}\\b`, 'i').test(p.body));
      if (!used.length) continue;
      if (used.includes(r.assessment)) asserted++;
      else { mismatched++; notes.push(`  CHECK   ${domain}  ${id} is "${r.assessment}"; period names only ${used.join(', ')}`); }
    }
  }
}
console.log(`periods: ${periods} · ids cited: ${ids} · dangling: ${dangling}`);
console.log(`ids whose own verdict appears verbatim in their period: ${asserted}`);
console.log(`ids whose verdict does NOT appear in their period: ${mismatched}  <- candidates, not defects`);
for (const n of notes.slice(0, 30)) console.log(n);
