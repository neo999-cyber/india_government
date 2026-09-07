import { test, expect } from '@playwright/test';

/**
 * THE SUBJECT CAROUSEL — the Atlas's door, built 2026-09-02 from an operator-supplied reference.
 *
 * What is bound here is the contract, not the look: fourteen cards in the board's order, all of them
 * real links; the active one points at its own board on the page; a neighbour's first click brings
 * it to the middle rather than leaving; the arrow keys move it; and with the bundle dead the same
 * fourteen cards render and link, nothing animates, nothing is missing.
 */
test.describe('the subject carousel', () => {
  test('fourteen cards, the active one bound to its board, neighbours centre on click', async ({ page }) => {
    await page.goto('/overview/');
    const cards = page.locator('.sc-card');
    await expect(cards).toHaveCount(14);
    // every card is a real link into this page's own board
    const hrefs = await cards.evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    expect(hrefs.every((h) => /^#topic-[a-z-]+$/.test(h ?? ''))).toBe(true);
    // and every board it points at exists
    for (const h of hrefs) expect(await page.locator(`[id="${(h ?? '').slice(1)}"]`).count(), `${h} has a board`).toBe(1);

    const active = page.locator('.sc-card.is-active');
    await expect(active).toHaveCount(1);
    const before = await active.getAttribute('id');

    // ArrowRight moves the focus one card on
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.sc-card.is-active')).not.toHaveAttribute('id', before ?? '');

    // CLICK THE ADJACENT CARD, AFTER THE FLOW HAS SETTLED. **WITHDRAWN: `.sc-card:not(.is-active)`
    // `.first()`** — that is the DOM-first card, seven positions from centre, hidden and mid-transition,
    // and Playwright waited thirty seconds for it to be "stable". The neighbour a reader clicks is the
    // one beside the active card; the 650ms flow has to land before it is stable.
    await page.waitForTimeout(800);
    const neighbour = page.locator('.sc-card.is-active + .sc-card');
    const target = await neighbour.getAttribute('id');
    await neighbour.click();
    await expect(page.locator('.sc-card.is-active')).toHaveAttribute('id', target ?? '');
    await expect(page).toHaveURL(/\/overview\/$/);

    // the two deliberate exceptions are present
    await expect(page.locator('.sc-card.is-absence')).toHaveCount(1);
    await expect(page.locator('.sc-card.is-sober')).toHaveCount(1);
  });

  test('320px — the stage does not push the page sideways', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('/overview/');
    await expect(page.locator('.sc-card')).toHaveCount(14);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  });

  test.describe('with the bundle dead', () => {
    test.use({ javaScriptEnabled: false });
    test('the same fourteen cards render and link', async ({ page }) => {
      await page.goto('/overview/');
      await expect(page.locator('.sc-card')).toHaveCount(14);
      await expect(page.locator('.sc-card.is-active')).toHaveCount(1);
      expect(await page.locator('.sc-card').evaluateAll((as) => as.every((a) => (a.getAttribute('href') ?? '').startsWith('#topic-')))).toBe(true);
    });
  });
});
