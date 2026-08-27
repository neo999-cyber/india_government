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
  test('landing is visual-first and the fourteen subjects are reachable', async ({ page }) => {
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
     * **BOTH PICTURES ARE ASSERTED, AND THE ORDER BETWEEN THEM IS THE POINT.** The landscape must
     * finish before the constellation begins: if that ever inverts, the page has quietly gone back
     * to leading with the abstract picture.
     */
    const landscape = page.locator('.lsc-svg');
    const constellation = page.locator('.rc-window');
    await expect(landscape).toBeVisible();
    await expect(constellation).toBeVisible();

    const lb = await landscape.boundingBox();
    const cb = await constellation.boundingBox();
    expect(lb, 'the landscape is missing').not.toBeNull();
    expect(cb, 'the constellation is missing').not.toBeNull();
    expect(lb!.y, 'the constellation appears above the landscape').toBeLessThan(cb!.y);

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
    const pins = page.locator('a.lsc-pin');
    await expect(pins).toHaveCount(14);
    await expect(pins.first()).toBeVisible();
    await expectTouchTarget(pins.first(), 'landscape pin');

    // The readout carries the counts the single-word pills no longer do.
    // The readout carries the counts the single-word pins do not.
    await expect(page.locator('.lsc-read-name')).toContainText('subjects, one landscape');

    /* THE TWO-STEP, WHICH IS THE OTHER HALF OF THE SAME REPORT. A tap used to go straight to the
       subject page, so a touch reader never saw the readout at all. First tap selects. */
    await page.locator('a.lsc-pin[data-k="governance"]').tap();
    await expect(page.locator('.lsc-read-name')).toHaveText('Governance');
    await expect(page).toHaveURL(/\/$/);

    const government = page.locator('.rc-node-btn[data-area="government"]');
    await government.tap();
    await expect(government).toHaveAttribute('aria-pressed', 'true');
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
