import { test, expect } from '@playwright/test';

/**
 * THE COUNT THAT COULD NEVER BE RIGHT.
 *
 * `/search/` shipped two `aria-live` regions. One was `ListingFacets`' readout, which tracks the
 * filter. The other was `SearchSort` printing `{count} shown` from an immutable prop — and because
 * filtering toggles `hidden` on rows rather than moving the DOM, that number was **structurally
 * incapable of ever changing**. A screen reader met both, and the wrong one announced 619 whatever
 * the reader had filtered to.
 *
 * `interface-invariants` asserts there is exactly ONE live region, which is the condition that made
 * the old one wrong. **It cannot assert that the surviving one UPDATES**, because that needs a
 * browser to click a facet and re-read the DOM. That is this file.
 */
test.describe('search result count', () => {
  // Width is set by the `desktop` project in `playwright.config.ts`.

  test('tracks the filter, in the DOM and in the live region', async ({ page }) => {
    await page.goto('/search/');

    const readout = page.locator('.facets-count');
    const rows = page.locator('#search-cards [data-row]');

    // Unfiltered: every row is visible and the readout names the whole set.
    const total = await rows.count();
    expect(total).toBeGreaterThan(100);
    await expect(rows.locator('visible=true')).toHaveCount(total);
    await expect(readout).toContainText(`All ${total}`);

    // The live region must be announced, not merely present.
    await expect(readout).toHaveAttribute('aria-live', 'polite');

    // Filter to one record by layer AND text.
    await page.getByLabel('Layer').selectOption('ledger');
    await page.getByRole('searchbox').fill('demonetisation');

    // The DOM and the announcement must agree, and both must say one.
    await expect(rows.locator('visible=true')).toHaveCount(1);
    await expect(readout).toContainText(`Showing 1 of ${total}`);

    // The withdrawn defect, asserted as an absence in its own context: no second element inside the
    // page content may announce a different figure.
    //
    // SCOPED TO `main` DELIBERATELY. A bare `[aria-live]` count is FLAKY — Next injects a route
    // announcer outside `main`, so the assertion passed or failed depending on whether that element
    // happened to exist at that instant. Observed at 2 on one run and 1 on the next. The framework's
    // announcer is legitimate and is not what this test is about.
    await expect(page.locator('main [aria-live]')).toHaveCount(1);

    // And clearing restores the full set — a filter that cannot be undone is its own defect.
    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(rows.locator('visible=true')).toHaveCount(total);
  });
});
