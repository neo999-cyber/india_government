import { defineConfig, devices } from '@playwright/test';

const E2E_PORT = Number(process.env.E2E_PORT ?? 4321);
const E2E_URL = `http://localhost:${E2E_PORT}`;

/**
 * END-TO-END TESTS — browser-only properties, including named phone profiles.
 *
 * ============================ WHY THESE PROPERTIES LIVE HERE ==================================
 *
 * `tools/interface-invariants.mjs` runs inside `npm run build` and states, in its own header,
 * exactly what it cannot do: **it cannot click a facet and watch a count change, measure a rendered
 * target, tab through a page, detect horizontal overflow, or exercise a touch/mobile browser
 * context.** Those need a browser with layout. The named phone projects add viewport, device-scale,
 * touch, mobile user-agent and browser-engine coverage; they remain emulation, not physical-device
 * evidence.
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
    baseURL: E2E_URL,
    trace: 'retain-on-failure',
  },
  // EACH SPEC RUNS AT THE ONE WIDTH IT IS ABOUT, declared here rather than skipped inside the test.
  // The first version used `test.skip` at describe level and every spec ran in both projects and
  // then errored, which is a suite that reports failure without testing anything.
  //
  // **A SPEC NAMED IN NEITHER `testMatch` RUNS ZERO TESTS AND THE SUITE STILL REPORTS GREEN.**
  // `constellation.spec.ts` was written, saved, and reported as passing by a run that never opened
  // it — the count stayed at 17 and nothing said why. That is the `gate-scope` defect one level up:
  // the suite passed while examining less than it was asked to. **A new spec file must be added to
  // a project here, and the count in the run output is the thing that proves it was.**
  projects: [
    {
      name: 'desktop',
      testMatch: /(search-count|target-size|allpages|rail|chart-labels|overview-state|atlas-modes|keyboard-interactions|navigation-ia|reading-prefs|seams|carousel|pictures)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 } },
    },
    {
      name: 'mobile',
      testMatch: /(keyboard-scroll|overflow|constellation|atlas-modes|navigation-ia|reading-prefs)\.spec\.ts/,
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 } },
    },
    {
      name: 'phone-iphone-se',
      testMatch: /phone-journeys\.spec\.ts/,
      use: { ...devices['iPhone SE (3rd gen)'] },
    },
    {
      name: 'phone-iphone-16',
      testMatch: /phone-journeys\.spec\.ts/,
      use: { ...devices['iPhone 16'] },
    },
    {
      name: 'phone-pixel-9',
      testMatch: /phone-journeys\.spec\.ts/,
      use: { ...devices['Pixel 9'] },
    },
    {
      name: 'phone-galaxy-s24',
      testMatch: /phone-journeys\.spec\.ts/,
      use: { ...devices['Galaxy S24'] },
    },
  ],
  webServer: {
    command: `PORT=${E2E_PORT} node tools/serve-out.mjs`,
    url: `${E2E_URL}/`,
    // Reusing a server can make a green suite inspect another worktree's stale `out/`. A developer
    // with the default port occupied chooses E2E_PORT; the suite never guesses that old pages are
    // the build it was asked to test.
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
