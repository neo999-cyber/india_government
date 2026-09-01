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
    /* **WITHDRAWN: `/series/`.** It merged into `/search/` on 2026-09-01, and `/search/` renders
       cards rather than a table — so there is no `.table-wrap` on it to focus. `/publishers/` is
       the same shape the test was written for: a wide table in a focusable wrapper, and it
       overflows at 375px, which the positive control below still proves rather than assumes. */
    await page.goto('/publishers/');

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
    /* POLLED, NOT READ ONCE. The stylesheet sets `scroll-behavior: smooth`, so `scrollLeft` has
       not landed on the tick after the keypress — a single read returns the value from before the
       animation and the test failed on a region that scrolls perfectly well. Measured: 0 read
       immediately, 80 after 200ms on the same page. */
    await expect
      .poll(() => wrap.evaluate((el) => el.scrollLeft), {
        message: 'arrow keys must scroll the focused region',
      })
      .toBeGreaterThan(before);
  });
});
