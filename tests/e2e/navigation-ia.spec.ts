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
    // Each section link is wrapped in `.pnav-sec` so its menu can position against it, 2026-09-01.
    // The property this test asserts is unchanged — seven section links, in one order — and the
    // selector says so explicitly rather than relying on them being the nav's direct children.
    const links = page.locator('nav[aria-label="Main"] > .pnav-sec > a');
    await expect(links).toHaveCount(MAIN.length);
    for (let index = 0; index < MAIN.length; index += 1) {
      await expect(links.nth(index)).toHaveText(MAIN[index][0]);
      await expect(links.nth(index)).toHaveAttribute('href', MAIN[index][1]);
    }
  });

  /**
   * THE SECTION MENUS ARE CSS, AND THAT IS THE PROPERTY WORTH ASSERTING.
   *
   * They open on `:hover` and on `:focus-within`, with no state and no listeners, so navigation
   * keeps working when the bundle does not. The keyboard path is the one that is easy to get wrong:
   * `display: none` would take the items out of the tab order and `:focus-within` could then never
   * fire, because there would be nothing inside to focus.
   */
  test('a section menu opens on hover and on keyboard focus, without script', async ({ page }) => {
    // This file runs in both projects and `mobile` is 375px wide, where the menus are deliberately
    // not rendered — asserted by its own test below rather than skipped into silence.
    test.skip((page.viewportSize()?.width ?? 0) < 900, 'the menus exist only at 900px and wider');
    await page.goto('/');
    const atlas = page.locator('nav[aria-label="Main"] > .pnav-sec').first();
    const menu = atlas.locator('.pnav-menu');

    await expect(menu).toBeHidden();
    await atlas.hover();
    await expect(menu).toBeVisible();
    await expect(menu.locator('a')).toHaveText([
      'In short', 'Topics', 'Timeline', 'Years', 'Lenses', 'Terms of government',
    ]);

    // Keyboard alone, with the pointer parked well away from the masthead.
    await page.mouse.move(700, 700);
    await expect(menu).toBeHidden();
    await atlas.locator('> a').focus();
    await expect(menu).toBeVisible();
    // And the items are reachable: the next Tab must land inside the menu, not skip past it.
    await page.keyboard.press('Tab');
    await expect(page.locator('nav[aria-label="Main"] .pnav-menu a:focus')).toHaveCount(1);
  });

  /**
   * BELOW 900px THE MENUS ARE NOT RENDERED, and this asserts it rather than leaving it to chance.
   * The first version rested at `visibility: hidden`, and an absolutely positioned box still
   * contributes to the document's scrollable width while invisible: a 13rem menu at 320px pushed
   * the page sideways and failed nine overflow tests on pages unrelated to the masthead.
   */
  test('below 900px no menu is rendered at all', async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) >= 900, 'this is the narrow-viewport behaviour');
    await page.goto('/');
    const menus = page.locator('nav[aria-label="Main"] .pnav-menu');
    await expect(menus.first()).toHaveCSS('display', 'none');
    // The section links themselves are untouched, so nothing became unreachable.
    await expect(page.locator('nav[aria-label="Main"] > .pnav-sec > a')).toHaveCount(7);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      'and the page does not scroll sideways',
    ).toBe(true);
  });

  test.describe('with the bundle dead', () => {
    test.use({ javaScriptEnabled: false });

    test('the menus still open, because they were never script', async ({ page }) => {
      test.skip((page.viewportSize()?.width ?? 0) < 900, 'the menus exist only at 900px and wider');
      await page.goto('/');
      const gaps = page.locator('nav[aria-label="Main"] > .pnav-sec').nth(5);
      await expect(gaps.locator('> a')).toHaveText('Gaps');
      await expect(gaps.locator('.pnav-menu')).toBeHidden();
      await gaps.hover();
      await expect(gaps.locator('.pnav-menu')).toBeVisible();
      await expect(gaps.locator('.pnav-menu a').last()).toHaveText('Verification queue');
    });
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
