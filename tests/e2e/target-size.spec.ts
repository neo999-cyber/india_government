import { test, expect } from '@playwright/test';

/**
 * TARGET SIZE — measured on the rendered page, which is the only place it exists.
 *
 * An external audit found **393 of 583 links on `/series/` under a 24x24 target**, the commonest
 * being the span strip's bars at 418x4 and the smallest at 3x4. The strip's density is its function
 * — 269 rows at 24px would take it from 1,614px to 6,456px — so WCAG 2.5.8's *Essential* exception
 * is invoked there deliberately, and the bars were taken out of the tab order instead, because
 * every series on the strip is a full row of the table below it on the same page.
 *
 * **So the property to hold is not "no small element". It is: nothing a keyboard can reach is
 * small.** That is what this asserts, and it is the shape that stops the fix being quietly undone —
 * if a later pass puts the bars back in the tab order, this fails.
 *
 * No static check can do it: a CSS rule does not tell you the rendered box.
 */
const MIN = 24;

test.describe('target size', () => {
  // Width is set by the `desktop` project in `playwright.config.ts`.

  test('nothing reachable by keyboard on /series/ is under 24x24', async ({ page }) => {
    await page.goto('/series/');

    const small = await page.evaluate((min) => {
      return [...document.querySelectorAll('a, button, [tabindex]')]
        .filter((el) => (el as HTMLElement).tabIndex >= 0)
        // WCAG 2.5.8's INLINE exception, applied deliberately: a link inside a sentence is sized by
        // the line-height of the text around it, and padding it breaks the line it sits in. This is
        // the standard's own carve-out, not a weakening of the test — and it is why the assertion
        // below is about standalone controls. 106 inline links on this page fall under it.
        .filter((el) => getComputedStyle(el).display !== 'inline')
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { w: Math.round(r.width), h: Math.round(r.height), cls: el.className || '(none)', text: (el.textContent ?? '').trim().slice(0, 40) };
        })
        // A zero-height element is hidden, not undersized — a different fault, and not this one's.
        .filter((b) => b.h > 0 && b.w > 0 && (b.h < min || b.w < min));
    }, MIN);

    expect(small, `keyboard-reachable targets under ${MIN}px: ${JSON.stringify(small.slice(0, 8), null, 1)}`).toEqual([]);
  });

  test('the span strip is still out of the tab order, and still there', async ({ page }) => {
    await page.goto('/series/');
    // The positive half: the bars exist and are drawn. Without it this test would pass on a page
    // that had simply lost the strip.
    const bars = page.locator('a.strip-bar');
    expect(await bars.count()).toBeGreaterThan(200);
    const reachable = await page.evaluate(
      () => [...document.querySelectorAll('a.strip-bar')].filter((a) => (a as HTMLElement).tabIndex >= 0).length,
    );
    expect(reachable).toBe(0);
  });

  test('the Atlas year and focus controls keep a 44px touch target', async ({ page }) => {
    await page.goto('/overview/');
    await page.locator('.board-focus summary').click();

    const small = await page.evaluate(() =>
      [...document.querySelectorAll('.scrub button, .board-tools button, .board-focus summary')]
        .filter((el) => (el as HTMLElement).offsetParent !== null)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            text: (el.textContent ?? '').trim().slice(0, 35),
            width: Math.round(r.width),
            height: Math.round(r.height),
          };
        })
        .filter((box) => box.width < 44 || box.height < 44),
    );

    expect(small, `Atlas controls under 44px: ${JSON.stringify(small, null, 1)}`).toEqual([]);
  });
});
