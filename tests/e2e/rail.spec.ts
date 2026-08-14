import { test, expect } from '@playwright/test';

/**
 * THE CONTENTS RAIL — one piece of markup, two presentations, and the seam between them.
 *
 * The frame is 84rem and prose is a 68-character column, so a large screen keeps empty space beside
 * the text. Widening the frame does not close that — it makes the ribbon of text look narrower
 * against more emptiness. The rail closes it by putting navigation there.
 *
 * **A CLAIM THAT WAS IN THIS COMMENT AND DID NOT SURVIVE ITS CONTROL.** It said a wide table would
 * push the grid track past its share and carry the rail off the page, and that `minmax(0, 1fr)` was
 * the only thing stopping it. Removing the `minmax` changed nothing — same tracks, same rail
 * position, no overflow — on five topic pages at two widths, and the e2e suite stayed green, which
 * is how the claim was caught. `.table-wrap` establishes a scroll container, so a table's intrinsic
 * width never reaches the track. **What these tests bind is the outcome — the rail beside the page,
 * inside it, at four widths — and not a mechanism.**
 *
 * **AND THE PAGES WITHOUT A RAIL ARE PART OF THE CONTRACT.** `:has()` scopes the grid, so ~690 pages
 * must be untouched — no reserved column, no shift. A rule that lost its `:has()` would look correct
 * on the topic pages and silently reserve 13rem on every other page.
 */

const box = async (page: import('@playwright/test').Page, sel: string) => {
  const b = await page.locator(sel).first().boundingBox();
  return b!;
};

test.describe('contents rail', () => {
  for (const width of [1280, 1440, 1710] as const) {
    test(`${width}px — the rail sits beside the page and stays inside it`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/domains/education/');

      const rail = await box(page, '.rail');
      const h1 = await box(page, 'h1');
      const main = await box(page, 'main');

      expect(rail.x, 'the rail is not beside the content').toBeGreaterThan(h1.x + h1.width);
      expect(rail.x + rail.width, 'the rail runs past its container').toBeLessThanOrEqual(
        main.x + main.width + 1,
      );
      expect(rail.x + rail.width, 'the rail runs off the viewport').toBeLessThanOrEqual(width + 1);
      expect(await page.locator('.rail').evaluate((el) => getComputedStyle(el).position)).toBe(
        'sticky',
      );

      const scrolls = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(scrolls, 'the two-column layout makes the page scroll sideways').toBe(false);
    });
  }

  test('1279px — one pixel below the breakpoint it is the horizontal strip again', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1279, height: 900 });
    await page.goto('/domains/education/');

    const rail = await box(page, '.rail');
    const h1 = await box(page, 'h1');

    // Above the content, not beside it, and full width — which is what it always was.
    expect(rail.y, 'the rail should sit below the heading in the flow').toBeGreaterThan(h1.y);
    expect(rail.width, 'the rail should span the column, not a 13rem track').toBeGreaterThan(600);
    expect(await page.locator('.rail').evaluate((el) => getComputedStyle(el).position)).toBe(
      'static',
    );
  });

  test('a page with no rail keeps a single column and reserves nothing', async ({ page }) => {
    await page.setViewportSize({ width: 1710, height: 900 });

    for (const path of ['/lenses/', '/method/', '/']) {
      await page.goto(path);
      expect(await page.locator('.rail').count(), `${path} unexpectedly has a rail`).toBe(0);
      const cols = await page
        .locator('main')
        .evaluate((el) => getComputedStyle(el).gridTemplateColumns);
      expect(cols, `${path} reserved a rail column it does not use`).toBe('none');
    }
  });

  test('the rail needs no JavaScript — it is jump links, and they resolve', async ({ page }) => {
    await page.setViewportSize({ width: 1710, height: 900 });
    await page.goto('/domains/education/');

    const links = page.locator('.rail a');
    await expect(links).toHaveCount(4);

    for (const href of await links.evaluateAll((els) =>
      els.map((e) => e.getAttribute('href')!),
    )) {
      expect(href.startsWith('#'), `${href} is not a fragment`).toBe(true);
      expect(
        await page.locator(href).count(),
        `${href} points at nothing on this page`,
      ).toBe(1);
    }
  });
});
