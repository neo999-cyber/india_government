import { test, expect, type Page } from '@playwright/test';

/**
 * ONE PUBLIC HIERARCHY.
 *
 * The masthead used to offer seven concepts while All pages regrouped the same destinations under
 * three unrelated headings. These checks bind the reader-facing result: the seven labels and their
 * order, the specialist routes whose visible parent changed, and the local landing gateways. URLs
 * themselves are asserted rather than inferred from copy, because preserving them is the contract.
 */

const MAIN = [
  ['Atlas', '/overview/'],
  ['Questions', '/questions/'],
  ['Stories', '/stories/'],
  ['Records', '/search/'],
  ['Compare', '/compare/'],
  ['Gaps', '/unmeasured/'],
  ['About', '/about/'],
] as const;

async function expectGateway(page: Page, route: string, hrefs: readonly string[]) {
  await page.goto(route);
  const links = page.locator('.section-nav a');
  await expect(links).toHaveCount(hrefs.length);
  for (let index = 0; index < hrefs.length; index += 1) {
    await expect(links.nth(index)).toHaveAttribute('href', hrefs[index]);
  }
}

test.describe('seven-section information architecture', () => {
  test('the masthead exposes the seven public sections in one stable order', async ({ page }) => {
    await page.goto('/');
    const links = page.locator('nav[aria-label="Main"] > a');
    await expect(links).toHaveCount(MAIN.length);
    for (let index = 0; index < MAIN.length; index += 1) {
      await expect(links.nth(index)).toHaveText(MAIN[index][0]);
      await expect(links.nth(index)).toHaveAttribute('href', MAIN[index][1]);
    }
  });

  test('cross-filed routes identify their public parent, not their URL prefix', async ({ page }) => {
    for (const [route, parent] of [
      ['/peers/', 'Compare'],
      ['/questions/unanswerable/', 'Gaps'],
      ['/questions/publication-stopped/', 'Gaps'],
      ['/publishers/', 'About'],
    ] as const) {
      await page.goto(route);
      const current = page.locator('nav[aria-label="Main"] a[aria-current="page"]');
      await expect(current).toHaveCount(1);
      await expect(current).toHaveText(parent);
    }
  });

  test('All pages mirrors the same seven groups', async ({ page }) => {
    await page.goto('/directory/');
    const groups = page.locator('.dir-group');
    await expect(groups).toHaveCount(MAIN.length);
    for (let index = 0; index < MAIN.length; index += 1) {
      const heading = groups.nth(index).locator('h2 a');
      await expect(heading).toHaveText(MAIN[index][0]);
      await expect(heading).toHaveAttribute('href', MAIN[index][1]);
    }

    const questions = groups.nth(1).locator('ul a');
    await expect(questions).toHaveCount(6);
    await expect(questions.first()).toHaveAttribute('href', '/questions/improved/');
    await expect(questions.last()).toHaveAttribute('href', '/questions/measured-well/');

    const stories = groups.nth(2).locator('ul a');
    await expect(stories).toHaveCount(7);
    await expect(stories.first()).toHaveAttribute('href', '/stories/can-indian-children-read/');
    await expect(stories.last()).toHaveAttribute('href', '/stories/a-zero-that-is-not-a-zero/');
  });

  test('section landing pages expose their existing child routes', async ({ page }) => {
    // `/in-short/` joins the Atlas group at its head, 2026-08-27. It is the way IN to the Atlas
    // rather than an eighth public section — the masthead's seven are untouched, which the first
    // test in this file still asserts exactly.
    await expectGateway(page, '/overview/', [
      '/in-short/',
      '/overview/#topics',
      '/overview/?view=timeline#topics',
      '/years/',
    ]);
    await expectGateway(page, '/search/', ['/ledger/', '/series/', '/provenance/', '/contested/']);
    await expectGateway(page, '/compare/', ['/compare/#series-comparison', '/peers/']);
    // `/seams/` joins Gaps 2026-09-01, between what the record does not carry and what would close
    // it: a break is not an absence, but it is the other way the published record stops being
    // readable straight through.
    await expectGateway(page, '/unmeasured/', [
      '/questions/unanswerable/',
      '/unmeasured/#declared-absences',
      '/questions/publication-stopped/',
      '/seams/',
      '/unmeasured/#verification-queue',
    ]);
    await expectGateway(page, '/about/', ['/method/', '/publishers/', '/data/', '/derivations/', '/corrections/']);
  });

  test('Questions and Stories remain their own complete child indexes', async ({ page }) => {
    await page.goto('/questions/');
    const filtered = [
      'improved',
      'worsened',
      'too-early',
      'publication-stopped',
      'sources-disagree',
      'measured-well',
    ];
    for (const slug of filtered) {
      // Scope to the question index. The same route may also appear in the footer and All pages;
      // those cross-links are the hierarchy working, not duplicate question cards.
      await expect(page.locator(`.qlist a[href="/questions/${slug}/"]`)).toHaveCount(1);
    }

    await page.goto('/stories/');
    await expect(page.locator('.grid > a')).toHaveCount(7);
  });
});
