import { test, expect } from '@playwright/test';

/**
 * THE RECORD CONSTELLATION — the landing artwork, and the one defect in it that was invisible.
 *
 * **WHY THIS FILE EXISTS RATHER THAN A LINE IN `overflow.spec.ts`.** The name caption under the
 * eight controls was first written as a per-button tooltip: absolutely positioned, `left: 50%`,
 * `white-space: nowrap`, `visibility: hidden` until hover. **A `visibility: hidden` element still
 * occupies layout**, so at 320px the captions on the edge buttons extended past the viewport and
 * pushed the document sideways — 343px of scrollWidth in a 320px window — *while invisible*.
 *
 * That is the shape worth a regression test: nothing on the screen looked wrong, the element
 * causing it could not be seen, and `overflow.spec.ts` runs at 375px where it did not yet bite. So
 * this asserts at **320px, the narrowest width the brief names**, and it asserts with the caption
 * REVEALED as well as hidden — a check that only ever measures the resting state would have passed
 * over the bug in one direction and over its fix in the other.
 *
 * The rest holds the interaction contract the brief specifies: eight controls, real buttons,
 * `aria-pressed`, selecting toggles back off, and the unselected constellations stay PRESENT rather
 * than being removed — they are context, and `display: none` would be the easy wrong fix.
 */

test.describe('record constellation', () => {
  test('320px — nothing pushes the document sideways, caption hidden or shown', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');

    /**
     * THE RIGHT EDGE ONLY, and that is not laziness.
     *
     * The first version of this also failed anything with `left < -1`, and it caught `.skip-link` —
     * the site's skip-to-content link, parked off-screen to the LEFT until it takes focus. That is
     * the standard idiom, it is deliberate, and in a left-to-right document it cannot scroll
     * anything: there is nothing to scroll to left of the origin. **A check that fails on a correct
     * accessibility affordance would be removed within a cycle, and the real assertion would go with
     * it.** Same semantics as `overflow.spec.ts`, for the same reason.
     */
    const measure = () =>
      page.evaluate(() => {
        const de = document.documentElement;
        const offenders: string[] = [];
        for (const el of document.body.querySelectorAll('*')) {
          const r = el.getBoundingClientRect();
          if (r.right > de.clientWidth + 1 && !el.closest('.table-wrap, .dtabs, [data-scroll-x]')) {
            const c = el.className;
            offenders.push(
              typeof c === 'string'
                ? c
                : ((c as unknown as SVGAnimatedString)?.baseVal ?? el.tagName),
            );
          }
        }
        return { scrollWidth: document.body.scrollWidth, clientWidth: de.clientWidth, offenders };
      });

    const resting = await measure();
    expect(resting.offenders, 'at rest, nothing may extend past the viewport').toEqual([]);
    expect(resting.scrollWidth).toBeLessThanOrEqual(resting.clientWidth);

    // Reveal the LONGEST caption — "Government and the states" — on the LAST control, which is the
    // one furthest right and therefore the one that overflowed.
    const controls = page.locator('.rc-btn');
    await controls.last().focus();

    const revealed = await measure();
    expect(revealed.offenders, 'with the caption shown, still nothing past the viewport').toEqual(
      [],
    );
    expect(revealed.scrollWidth).toBeLessThanOrEqual(revealed.clientWidth);
  });

  test('eight controls, each a real button with a 44px target and an accessible name', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');

    const controls = page.locator('.rc-btn');
    await expect(controls).toHaveCount(8);

    for (let i = 0; i < 8; i++) {
      const b = controls.nth(i);
      expect(await b.evaluate((el) => el.tagName)).toBe('BUTTON');
      const name = await b.getAttribute('aria-label');
      expect(name, 'every control names its area').toBeTruthy();
      const box = await b.boundingBox();
      expect(box!.width, `${name} width`).toBeGreaterThanOrEqual(44);
      expect(box!.height, `${name} height`).toBeGreaterThanOrEqual(44);
    }
  });

  test('selecting focuses one constellation, selecting again returns to all eight', async ({
    page,
  }) => {
    await page.goto('/');

    const status = page.locator('.rc-status');
    await expect(status).toContainText('All eight constellations');

    const gov = page.locator('.rc-btn[aria-label^="Government"]');
    await expect(gov).toHaveAttribute('aria-pressed', 'false');
    await gov.click();

    await expect(gov).toHaveAttribute('aria-pressed', 'true');
    await expect(status).toContainText('Government and the states');
    await expect(page.locator('.rc-group[data-area="government"]')).toHaveAttribute(
      'data-state',
      'on',
    );

    // THE UNSELECTED ONES REMAIN. Quieter, and still on the page — the brief requires them for
    // context and `display: none` is the fix that would pass a weaker assertion.
    const edu = page.locator('.rc-group[data-area="education"]');
    await expect(edu).toHaveAttribute('data-state', 'off');
    await expect(edu).toBeVisible();
    expect(await edu.locator('.rc-node').count()).toBeGreaterThan(0);

    await gov.click();
    await expect(gov).toHaveAttribute('aria-pressed', 'false');
    await expect(status).toContainText('All eight constellations');
    await expect(page.locator('.rc-group[data-area="government"]')).toHaveAttribute(
      'data-state',
      'all',
    );
  });

  test('the map, the conceptual-position note and the attribution all render', async ({ page }) => {
    await page.goto('/');

    // The official sheet actually loads — a broken href would leave the marks floating on nothing
    // and every other assertion here would still pass.
    const res = await page.request.get('/map/india-political-2026-soi-13th-edition.jpg');
    expect(res.status()).toBe(200);
    expect(Number(res.headers()['content-length'])).toBeGreaterThan(100_000);

    await expect(page.locator('.rc-note')).toContainText(
      'Conceptual positions — not geographic values',
    );
    await expect(page.locator('.rc-attrib')).toContainText('Survey of India');
    await expect(page.locator('.rc-attrib')).toContainText('Government of India copyright 2026');
  });
});
