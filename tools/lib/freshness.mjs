/**
 * Build-freshness assertion for gates that read built output.
 *
 * WHY, AND WHICH DIRECTION MATTERS. Phase 14 batch 3 saw `selftest` exit 1 once and not reproduce:
 * its live-corpus output-gate check had read `out/` before the rebuild that contained the new
 * records. That was recorded as an ordering artefact and it was one — a false FAILURE, which is
 * loud, gets investigated, and costs an hour.
 *
 * **The same ordering produces a false PASS, and that one is silent.** Edit a record, forget to
 * rebuild, run the gates: `reachability` reads the previous build, finds every mark it knew about
 * already rendering, and reports clean. The new record's marks were never looked for. Nothing in
 * the output distinguishes "checked and fine" from "checked something else". The instrument's whole
 * premise is that a green gate means something, and a gate reading a stale artefact is green about
 * a build nobody is shipping.
 *
 * So the assertion is not "warn if old". It REFUSES TO RUN, with exit 2 — the same code both gates
 * already use for "no built output at all", because the two situations have the same remedy and the
 * same meaning: this gate cannot answer the question it was asked. Exit 1 is reserved for a real
 * finding, and a refusal is not a finding.
 *
 * WHAT COUNTS AS AN INPUT. `data/` because it is the content, and `app/`, `components/` and `lib/`
 * because they decide what renders — the phase-10 `education` defect was a `lib/types.ts` omission
 * with correct data, so limiting this to `data/` would miss the class of change that motivated
 * `domain-coverage` in the first place. `schemas/`, `tools/` and `docs/` are excluded: the first two
 * cannot change the rendered page without one of the four above changing too, and the third never
 * renders.
 *
 * FIXTURE PAIRS ARE EXEMPT, and that is deliberate rather than a loophole. A fixture supplies its
 * own `--data` and `--out` as a hermetic pair whose mtimes are whenever git happened to write them,
 * so comparing them tests the checkout, not the build. The gates therefore assert freshness only
 * when running against the repository's real directories, or when a caller passes `--check-freshness`
 * to exercise this code path on purpose — which is how the selftest drives both controls through the
 * real call site rather than testing this function in isolation.
 */
import { readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

/** Newest mtime under a directory tree, or 0 if it does not exist. */
function newestMtime(dir) {
  if (!existsSync(dir)) return 0;
  let newest = 0;
  let newestPath = null;
  const walk = (d) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.')) continue;
      const full = join(d, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile()) {
        const m = statSync(full).mtimeMs;
        if (m > newest) { newest = m; newestPath = full; }
      }
    }
  };
  walk(dir);
  return { newest, newestPath };
}

/**
 * Refuse (exit 2) if any input is newer than the newest built artefact.
 *
 * @param {string} gate      name, for the message
 * @param {string} outDir    the built output being read
 * @param {string[]} inputs  directories whose contents decide what that output should contain
 */
export function assertFresh(gate, outDir, inputs) {
  const out = newestMtime(outDir);
  if (!out.newest) {
    console.error(`${gate}: no built output under ${outDir} — run the build first`);
    process.exit(2);
  }
  let worst = null;
  for (const dir of inputs) {
    const inp = newestMtime(dir);
    if (!inp.newest) continue;
    if (inp.newest > out.newest && (!worst || inp.newest > worst.newest)) worst = inp;
  }
  if (!worst) return;

  const seconds = Math.round((worst.newest - out.newest) / 1000);
  console.error(
    `${gate}: REFUSING TO RUN — the built output is stale.\n` +
      `  newest input:  ${worst.newestPath}\n` +
      `  newest output: ${out.newestPath}\n` +
      `  the input is ${seconds}s newer than anything in the build.\n\n` +
      `  This gate reads built output. Against a stale build it would check the PREVIOUS\n` +
      `  corpus and report clean — a green result about a build nobody is shipping, which is\n` +
      `  indistinguishable in the output from a real pass. Run \`npm run build\` and try again.`,
  );
  process.exit(2);
}
