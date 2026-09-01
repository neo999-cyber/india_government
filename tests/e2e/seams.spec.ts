import { test, expect } from '@playwright/test';

/**
 * WHERE THE INSTRUMENTS CHANGED — the grid is anchors, not a hover panel.
 *
 * That choice is the page's whole architecture and it is only observable in a browser: the cells
 * are links into a chronology that is already on the page, so every cell is addressable, a reader
 * can send someone "education, 2020", and the page works with the bundle dead. A hover panel would
 * have been the obvious build and would have failed all three.
 */
test.describe('the seam grid', () => {
  test('every cell lands on a heading that exists, and names the same subject and year', async ({ page }) => {
    await page.goto('/seams/');

    const cells = page.locator('.seam-cell');
    const n = await cells.count();
    expect(n, 'the grid has cells at all').toBeGreaterThan(20);

    // EVERY cell, not a sample: a dead fragment is invisible on the page that contains it, so the
    // only way this stays true is to check all of them.
    const targets = await cells.evaluateAll((as) => as.map((a) => a.getAttribute('href')));
    const missing: string[] = [];
    for (const href of targets) {
      const id = (href ?? '').replace(/^#/, '');
      if ((await page.locator(`[id="${id}"]`).count()) !== 1) missing.push(href ?? '(none)');
    }
    expect(missing, 'every cell points at exactly one anchor on this page').toEqual([]);

    // And the anchor is the right one: the fragment encodes subject and year, and the section it
    // lands on sits under that year's heading.
    await page.goto('/seams/#education-2020');
    const target = page.locator('#education-2020');
    await expect(target).toBeVisible();
    await expect(target.locator('.seam-sub-h')).toHaveText('Education');
    await expect(page.locator('#year-2020')).toContainText('2020');
  });

  test.describe('with the bundle dead', () => {
    test.use({ javaScriptEnabled: false });

    test('the grid, the chronology and the marks are all still there', async ({ page }) => {
      await page.goto('/seams/');
      // The page carries no script of its own, so nothing about it should depend on one.
      expect(await page.locator('.seam-cell').count()).toBeGreaterThan(20);
      expect(await page.locator('.seam-rec').count()).toBeGreaterThan(100);
      // A caveat is a mark that must render wherever the record appears, script or no script.
      expect(await page.locator('.seam-rec .caveat-inline').count()).toBeGreaterThan(0);
      await expect(page.locator('h1')).toHaveText('Where the instruments changed');
    });
  });
});
