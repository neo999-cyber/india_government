import { test, expect } from '@playwright/test';

/**
 * A REGION THAT SCROLLS MUST BE REACHABLE BY THE KEYBOARD.
 *
 * `.table-wrap` scrolls horizontally at narrow widths and carried no `tabindex`, so a reader using
 * a keyboard could see that a table continued past the edge and had no way to move it. 31 of them,
 * on 20 files.
 *
 * A static check can assert the attribute is present. **It cannot assert the element actually takes
 * focus and actually scrolls** — that needs a browser with layout and a real key press, because an
 * element with `tabindex="0"` inside a hidden ancestor, or one that no longer overflows, is not a
 * fixed defect.
 */
test.describe('horizontal scrollers', () => {
  // Width is set by the `mobile` project in `playwright.config.ts`.

  test('a scrolling table region takes focus and moves with the arrow keys', async ({ page }) => {
    await page.goto('/series/');

    const wrap = page.locator('.table-wrap').first();
    await expect(wrap).toHaveAttribute('tabindex', '0');

    // THE POSITIVE CONTROL: if the region does not actually overflow at this width, the rest of
    // this test proves nothing, and a silent pass is exactly what it is here to prevent.
    const overflows = await wrap.evaluate((el) => el.scrollWidth > el.clientWidth + 1);
    expect(overflows, 'the wrapper must actually overflow at 375px, or this test is vacuous').toBe(true);

    await wrap.focus();
    await expect(wrap).toBeFocused();

    const before = await wrap.evaluate((el) => el.scrollLeft);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    const after = await wrap.evaluate((el) => el.scrollLeft);

    expect(after, 'arrow keys must scroll the focused region').toBeGreaterThan(before);
  });
});
