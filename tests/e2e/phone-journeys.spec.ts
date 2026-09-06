import { test, expect, type Page } from '@playwright/test';

/**
 * NAMED PHONE PROFILES — the journeys most likely to fail differently under touch, a mobile user
 * agent, device-scale rendering or WebKit. The broad 375px suite still owns template coverage;
 * repeating all of it four times would spend CI on duplication rather than a new contract.
 *
 * These are browser device profiles, not physical phones. They close reproducible iPhone/Android
 * layout and interaction coverage while leaving hardware, thermal and carrier-network checks as a
 * manual release task.
 */

async function expectNoBodyOverflow(page: Page) {
  const width = await page.evaluate(() => {
    const viewport = document.documentElement.clientWidth;
    const offenders = [...document.querySelectorAll<HTMLElement>('body *')]
      .flatMap((element) => {
        const box = element.getBoundingClientRect();
        if (box.right <= viewport + 1 || element.closest('.table-wrap, .dtabs, [data-scroll-x]')) return [];
        return [{
          tag: element.tagName.toLowerCase(),
          className: element.className.toString().slice(0, 80),
          parent: element.parentElement?.className.toString().slice(0, 80) ?? '',
          grandparent: element.parentElement?.parentElement?.className.toString().slice(0, 80) ?? '',
          href: element instanceof HTMLAnchorElement ? element.getAttribute('href') : null,
          left: Math.round(box.left),
          right: Math.round(box.right),
          width: Math.round(box.width),
        }];
      })
      .slice(0, 8);
    const priorX = window.scrollX;
    window.scrollTo(100_000, window.scrollY);
    const windowScrollX = window.scrollX;
    window.scrollTo(priorX, window.scrollY);
    return {
      body: document.body.scrollWidth,
      document: document.documentElement.scrollWidth,
      viewport,
      windowScrollX,
      offenders,
    };
  });
  expect(
    width.windowScrollX,
    `the phone viewport can scroll ${width.windowScrollX}px sideways; document ${width.document}px, body ${width.body}px: ${JSON.stringify(width.offenders, null, 1)}`,
  ).toBe(0);
  expect(
    width.document,
    `document extends ${width.document - width.viewport}px past the phone viewport; body reports ${width.body}px: ${JSON.stringify(width.offenders, null, 1)}`,
  ).toBeLessThanOrEqual(
    width.viewport,
  );
}

async function expectTouchTarget(locator: import('@playwright/test').Locator, label: string) {
  const box = await locator.boundingBox();
  expect(box, `${label} is not rendered`).not.toBeNull();
  expect(box!.height, `${label} is shorter than 44px`).toBeGreaterThanOrEqual(44);
}

test.describe('phone journeys', () => {
  test('landing gives every subject a clear phone-sized route', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('What we can actually know');

    /**
     * THE LANDSCAPE IS THE DOOR, THE CONSTELLATION IS STILL THE THESIS — 2026-08-27, option D.
     *
     * **WITHDRAWN: a count of 5 `.home-path` cards and their href-by-position list.** Those cards
     * are gone. They handed a first-time reader a TOOL each — a timeline, a filter, a story, a
     * search box — and a reader who does not yet know what the archive holds cannot choose between
     * tools. The landscape names the fourteen subjects instead.
     *
     * **BOTH BLOCKS ARE ASSERTED, AND THE ORDER BETWEEN THEM IS THE POINT.** The landscape must
     * finish before the evidence base begins: if that ever inverts, the page has gone back to
     * leading with something other than the fourteen named subjects.
     *
     * **WITHDRAWN: `.rc-window`, the constellation.** It left the landing page on 2026-09-01 —
     * there is no geography in this corpus for an outline of India to encode — and is now one of
     * the Atlas's four views, where `constellation.spec.ts` tests it. What stands here instead is
     * the evidence base: 1,205 citations, one mark each, banded by tier.
     */
    const topics = page.locator('.lsc-mobile-topics a');
    const evidence = page.locator('.evb-tiers');
    await expect(topics).toHaveCount(14);
    await expect(topics.first()).toBeVisible();
    await expect(evidence).toBeVisible();

    const lb = await page.locator('.lsc-mobile-topics').boundingBox();
    const cb = await evidence.boundingBox();
    expect(lb, 'the phone topic grid is missing').not.toBeNull();
    expect(cb, 'the evidence base is missing').not.toBeNull();
    expect(lb!.y, 'the evidence base appears above the topic choices').toBeLessThan(cb!.y);

    /**
     * THE PINS ARE HTML OVER THE PICTURE, NOT TEXT INSIDE IT — rewritten 2026-08-28.
     *
     * **WITHDRAWN: assertions on the SVG pill locator, and that the first was HIDDEN below 760px.**
     * Labels drawn inside the SVG scaled with the viewBox: 9.6px on a 1280px desktop, 4.9px on a
     * folding tablet's inner screen, and hidden outright below 768px — which left that screen a
     * still picture with no labels and no interaction at all, exactly as the operator reported.
     *
     * A pin is now HTML at a fixed CSS size. It is PRESENT at every width. Below 900px it collapses
     * to a dot and opens into its name when selected, so the assertion is on the TAP TARGET, which
     * is the thing that has to survive a small screen.
     */
    const hrefs = await topics.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(new Set(hrefs).size).toBe(14);
    expect(hrefs.every((href) => /^\/domains\/[a-z-]+\/$/.test(href ?? ''))).toBe(true);
    await expectTouchTarget(topics.first(), 'first subject route');

    // The dense illustration is still available, but no longer competes with the topic routes.
    await expect(page.locator('.lsc-svg')).toBeHidden();
    const pictureToggle = page.getByRole('button', { name: 'View illustrated landscape' });
    await expectTouchTarget(pictureToggle, 'illustrated landscape toggle');
    await pictureToggle.tap();
    await expect(page.locator('.lsc-svg')).toBeVisible();
    await expect(page.locator('.lsc-pins')).toBeHidden();

    /* **WITHDRAWN: tapping `.rc-node-btn[data-area="government"]` and asserting `aria-pressed`.**
       The constellation left the landing page on 2026-09-01. Its touch contract did not go
       untested — it moved with the component to `constellation.spec.ts`, which runs at 375px and
       taps the same buttons. What stands here now has no controls to tap: the evidence base is a
       field of 1,205 marks, so the property left to hold at this width is that it does not push
       the document sideways. */
    await expect(page.locator('.evb-marks i').first()).toBeVisible();
    await expectNoBodyOverflow(page);
  });

  test('Atlas state, modes and active-view search work by touch', async ({ page }) => {
    await page.goto('/overview/?view=timeline&year=2020&topics=education,employment');

    await expect(page.getByRole('tab', { name: /Timeline/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.scrub-out')).toHaveText('2020');

    const viewSearch = page.getByRole('searchbox', { name: 'Search within the active Atlas view' });
    await viewSearch.fill('education');
    await expect(page).toHaveURL(/q=education/);

    const compare = page.getByRole('tab', { name: /Compare/ });
    await expectTouchTarget(compare, 'Compare mode');
    await compare.tap();
    await expect(page).toHaveURL(/view=compare/);
    await expect(page.locator('.compare-workbench')).toBeVisible();

    const comparisonSearch = page.getByRole('searchbox', { name: 'Find a comparison preset' });
    await comparisonSearch.fill('education');
    await expect(comparisonSearch).toHaveValue('education');
    await expectNoBodyOverflow(page);
  });

  test('provenance drawer exposes its payload and closes by touch', async ({ page }) => {
    await page.goto('/series/res-capacity-share/');

    const trigger = page.locator('a[href^="/provenance/P-"]').first();
    await trigger.tap();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'What changed and what is disputed' })).toBeVisible();
    await expect(dialog.getByRole('heading', { name: 'Primary sources and archive' })).toBeVisible();
    await expect(dialog.locator('[data-provenance-full]')).toHaveAttribute('href', /\/provenance\/P-/);
    await expectNoBodyOverflow(page);

    const close = page.getByRole('button', { name: 'Close provenance drawer' });
    await expectTouchTarget(close, 'provenance close button');
    await close.tap();
    await expect(dialog).toHaveCount(0);
    await expect(page).not.toHaveURL(/provenance=/);
  });

  test('question gateways lead to a readable question route', async ({ page }) => {
    await page.goto('/questions/');

    await expect(page.locator('.qcard')).toHaveCount(9);
    await expect(page.locator('.qcard-glyph')).toHaveCount(9);
    const firstQuestion = page.locator('.qcard a').first();
    await expectTouchTarget(firstQuestion, 'first question gateway');
    await firstQuestion.tap();
    await expect(page).toHaveURL(/\/questions\/(improved|worsened|too-early|publication-stopped|sources-disagree|measured-well)\//);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expectNoBodyOverflow(page);
  });
});
