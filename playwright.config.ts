import { defineConfig, devices } from '@playwright/test';

/**
 * END-TO-END TESTS — and this file exists to bind FOUR properties, not to become a second test suite.
 *
 * ============================ WHY THESE FOUR AND NOTHING ELSE =================================
 *
 * `tools/interface-invariants.mjs` runs inside `npm run build` and states, in its own header,
 * exactly what it cannot do: **it cannot click a facet and watch a count change, measure a rendered
 * target, tab through a page, or detect horizontal overflow at 375px.** Those four need a real
 * browser with layout. This suite is those four and no more.
 *
 * **EVERYTHING A STATIC CHECK CAN BIND STAYS IN THE BUILD.** A browser test is slower, needs a
 * downloaded binary, and does not run on the Vercel deploy — so a property that could have been a
 * gate and is put here instead has been quietly demoted. That would be the worse outcome, because
 * the build is the thing that runs on every commit and every deploy.
 *
 * ============================ WHY IT IS NOT IN `npm run build` ================================
 *
 * The build runs on Vercel, which has no browser binaries. Adding this to the chain would fail every
 * deploy. It runs as `npm run e2e` locally and as its own CI step, where Playwright's browsers cache
 * between runs — the same reasoning that keeps `tools/deploy-check.mjs` out of the build because it
 * needs the network.
 *
 * ============================ IT TESTS THE BUILD, NOT A DEV SERVER ============================
 *
 * `webServer` serves `out/` through `tools/serve-out.mjs`. All four properties are properties of
 * what a reader actually receives; a dev server is a different document with its own overlays.
 */
export default defineConfig({
  testDir: './tests/e2e',
  // A failing e2e test here means a real regression, so a retry would only hide a flake we would
  // rather see. If one of these turns out to be genuinely flaky, fix the test, do not add retries.
  retries: 0,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'retain-on-failure',
  },
  // EACH SPEC RUNS AT THE ONE WIDTH IT IS ABOUT, declared here rather than skipped inside the test.
  // The first version used `test.skip` at describe level and every spec ran in both projects and
  // then errored, which is a suite that reports failure without testing anything.
  projects: [
    {
      name: 'desktop',
      testMatch: /(search-count|target-size)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'mobile',
      testMatch: /(keyboard-scroll|overflow)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: 'node tools/serve-out.mjs',
    url: 'http://localhost:4321/',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
