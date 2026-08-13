import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

/**
 * LINT — narrow on purpose, and it is the third answer to the audit's "no lint command".
 *
 * ============================ WHAT THIS IS FOR, AND WHAT IT IS NOT FOR ========================
 *
 * `tsc --noEmit` already runs `strict`, plus `noUnusedLocals`, `noUnusedParameters`,
 * `noFallthroughCasesInSwitch` and `noImplicitOverride` — added on 2026-08-13 when this install was
 * blocked. **Those checks are not repeated here.** What ESLint adds that the compiler cannot see is
 * React and Next semantics: a hook called conditionally, a dependency array that lies, an `<a>` where
 * a `<Link>` belongs, an `<img>` in a project whose images are unoptimised by design.
 *
 * **The rules are the Next presets and nothing invented on top.** A house style enforced by a linter
 * is a second rulebook to keep current, and this repository already has one that is
 * hand-written and load-bearing. Formatting is not linted at all.
 *
 * ============================ WHY IT IS NOT IN `npm run build` ================================
 *
 * The build gates the CORPUS and the rendered output — it is what runs on every commit and on the
 * Vercel deploy, and every second in it is paid on both. Lint findings are code-quality signals
 * about source that `typecheck` has already proven type-correct; they belong in CI beside the e2e
 * suite, which is the same judgement made for the same reason.
 *
 * **`npm run lint`, and a CI step.** If a rule here ever catches something that would have shipped a
 * defect, that is the argument for promoting it into the chain — and the argument should be made
 * with the case, not in advance.
 */
/**
 * IMPORTED DIRECTLY, NOT THROUGH `FlatCompat`. `eslint-config-next@16.3.0` already ships flat
 * config — `core-web-vitals` is an array of 4 and `typescript` an array of 5 — and putting the
 * eslintrc shim in front of them made ESLint 10 die in its own config validator with
 * `Converting circular structure to JSON`. Checked what the package exports rather than assuming it
 * needed the shim.
 */
const config = [
  {
    ignores: [
      'out/**',
      '.next/**',
      'node_modules/**',
      'data/**',
      // Generated, and regenerating them is the gate that governs them.
      'review/**',
      'docs/derivations.md',
      // Playwright's own artefacts.
      'test-results/**',
      'playwright-report/**',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      /**
       * OFF, DELIBERATELY, AND THE REASON IS IN `next.config`.
       *
       * `images: { unoptimized: true }` with `output: 'export'` — this instrument publishes no
       * raster images at all, so `next/image` would add a component and a config surface to solve a
       * problem it does not have. The rule assumes an app that serves photographs.
       */
      '@next/next/no-img-element': 'off',
    },
  },
];

export default config;
