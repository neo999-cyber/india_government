import { test, expect } from '@playwright/test';

/**
 * THE ALL-PAGES DISCLOSURE DISMISSES.
 *
 * A bare `<details>` closes on exactly one thing — a second click on its own summary — and that is
 * what shipped. Measured on production: open the panel, click anywhere else, still open; press
 * Escape, still open; follow one of its own links, and because client-side navigation never
 * rebuilds the element, the panel hangs open over the page it just took you to.
 *
 * **All three are behaviour, so none of them can be a build gate.** `interface-invariants` reads
 * built bytes and would see an identical `<details>` before and after the fix. This is the only
 * place the difference is observable.
 *
 * **AND THE NO-SCRIPT GUARANTEE IS ASSERTED TOO.** The element is still a `<details>` whose state
 * belongs to the browser, which is what lets the masthead work when the bundle fails. A future
 * rewrite to a React-controlled overlay would pass every dismissal test here and quietly break
 * that, so the last test binds the element rather than the behaviour.
 */

const open = async (page: import('@playwright/test').Page) => {
  const d = page.locator('details.allpages');
  await d.locator('summary').click();
  await expect(d).toHaveJSProperty('open', true);
  return d;
};

test.describe('all-pages disclosure', () => {
  test('a click anywhere else closes it', async ({ page }) => {
    await page.goto('/');
    const d = await open(page);

    /**
     * THE POINT IS FOUND BY SCANNING, NOT COMPUTED — two earlier versions got it wrong and the
     * assertion below is what said so.
     *
     * The first clicked `main` at (5, 5); the open panel overlays the top of the page, so a link
     * intercepted it. The second took the `<details>` box and went 80px below it — still inside,
     * because the panel is positioned and the element's own box covers little more than the
     * summary. **Both would have asserted the opposite of this test's name.**
     *
     * So: walk down the viewport until `elementFromPoint` reports something outside the disclosure,
     * and fail loudly if no such point exists. Self-correcting against any future layout.
     */
    const point = await page.evaluate(() => {
      const x = Math.round(window.innerWidth / 2);
      for (let y = 10; y < window.innerHeight - 10; y += 10) {
        const hit = document.elementFromPoint(x, y);
        if (hit && !hit.closest('details.allpages') && !hit.closest('header')) return { x, y };
      }
      return null;
    });
    expect(point, 'no point in the viewport sits outside the open disclosure').not.toBeNull();

    await page.mouse.click(point!.x, point!.y);
    await expect(d).toHaveJSProperty('open', false);
  });

  test('Escape closes it and returns focus to the summary', async ({ page }) => {
    await page.goto('/');
    const d = await open(page);

    await page.keyboard.press('Escape');
    await expect(d).toHaveJSProperty('open', false);
    await expect(d.locator('summary')).toBeFocused();
  });

  test('following one of its own links closes it', async ({ page }) => {
    await page.goto('/');
    const d = await open(page);

    await d.locator('a').first().click();
    await expect(d).toHaveJSProperty('open', false);
  });

  test('clicking inside the panel does not close it', async ({ page }) => {
    await page.goto('/');
    const d = await open(page);

    // A group label is inert text inside the panel. Selecting or mis-tapping there must not
    // dismiss — the guard is containment, and a naive document-level handler would fail this.
    await d.locator('.allpages-label').first().click();
    await expect(d).toHaveJSProperty('open', true);
  });

  /**
   * THE OPEN PANEL STAYS INSIDE THE VIEWPORT.
   *
   * It was `right: 0` — pinned to the summary's right edge and growing LEFTWARD from a control that
   * sits near the shell's left margin. At 1280px the panel's left edge measured **-120px**: a fifth
   * of it off-screen, unreachable, and with no horizontal scroll to recover it, because an
   * absolutely positioned box does not extend the scroll area leftward. **It fitted on a wide
   * window, which is exactly why it survived** — so this checks the narrow ones too.
   */
  for (const width of [1024, 1280, 1440] as const) {
    test(`${width}px — the open panel is fully inside the viewport`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await open(page);

      const box = (await page.locator('.allpages-panel').boundingBox())!;
      expect(box.x, 'panel runs off the left edge').toBeGreaterThanOrEqual(-1);
      expect(box.x + box.width, 'panel runs off the right edge').toBeLessThanOrEqual(width + 1);

      // And it must not have bought that by making the document scroll sideways.
      const scrolls = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(scrolls, 'the open panel makes the document scroll sideways').toBe(false);
    });
  }

  test('the summary still toggles it shut, which is the no-script path', async ({ page }) => {
    await page.goto('/');
    const d = await open(page);

    await d.locator('summary').click();
    await expect(d).toHaveJSProperty('open', false);

    // The element itself, not the behaviour: a React-controlled overlay would pass every test
    // above and lose the masthead on any page whose bundle failed.
    expect(await d.evaluate((el) => el.tagName)).toBe('DETAILS');
  });
});
