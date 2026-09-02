import { expect, test } from '@playwright/test';

/**
 * THE FOUR PICTURES OF 2026-09-02, AND THE TWO PERFORMANCE FACTS THEY RIDE ON.
 *
 * Each block asserts the shape a reader meets, against `/data`-derived counts where the number is
 * stable by construction (13 years, 14 subjects, 3 scored terms, 9 assessments) and against the
 * page's own idiom otherwise. The prefetch assertion is the one that guards the site-wide fix: it
 * scrolls the Atlas end to end and counts route payloads fetched — 120 before, 0 after.
 */
const brief = (page: import('@playwright/test').Page) =>
  page.locator('.lsc-brief').first().innerText().then((t) => t.replace(/\s+/g, ' ').trim());

test.describe('the landing scrubber spans years', () => {
  test('a linked window opens the FROM thumb and the brief counts across it', async ({ page }) => {
    await page.goto('/#education-2016-2020');
    await expect(page.locator('#lsc-from')).toHaveValue('2016');
    await expect(page.locator('#lsc-yr')).toHaveValue('2020');
    await expect(page.locator('.lsc-span')).toHaveText('Single year');
    const t = await brief(page);
    expect(t).toContain('Education 2016 to 2020');
    expect(t).toMatch(/\d+ series reported/);
    expect(t).toMatch(/changes? of basis inside this window/);
    // education's lead breaks in 2020, so the window is refused rather than read across the seam
    expect(t).toContain('Not comparable across this window');
    expect(t).toContain('changed in 2020');
  });

  test('closing the span leaves the single year, and the hash follows', async ({ page }) => {
    await page.goto('/#education-2016-2020');
    await page.locator('.lsc-span').click();
    await expect(page.locator('#lsc-from')).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => location.hash)).toBe('#education-2020');
    expect(await brief(page)).toContain('Education in 2020');
  });

  test('a window never inverts: FROM dragged past TO drags TO with it', async ({ page }) => {
    await page.goto('/#education-2016-2020');
    await page.locator('#lsc-from').focus();
    await page.keyboard.press('End');
    await expect(page.locator('#lsc-yr')).toHaveValue('2026');
    await expect.poll(() => page.evaluate(() => location.hash)).toBe('#education-2026');
  });

  test('the archive itself reads across a window, distinct series and summed filings', async ({ page }) => {
    await page.goto('/');
    await page.locator('.lsc-span').click();
    const t = await brief(page);
    expect(t).toContain('The archive 2014 to 2026');
    expect(t).toMatch(/\d+ series reported \d+ filings dated inside/);
  });
});

test.describe('the subject timeline on a topic page', () => {
  test('thirteen cells, a linked year selected, a click moves the brief and the hash', async ({ page }) => {
    await page.goto('/domains/education/#y-2019');
    await expect(page.locator('.stl-cell')).toHaveCount(13);
    await expect(page.locator('.stl-cell.is-on .stl-y')).toHaveText('2019');
    expect(await brief(page)).toContain('Education in 2019');
    await page.locator('#y-2022').click();
    expect(await brief(page)).toContain('Education in 2022');
    await expect.poll(() => page.evaluate(() => location.hash)).toBe('#y-2022');
  });

  test('every cell is a real link to its year page, so the row works without script', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/domains/poverty/');
    await expect(page.locator('.stl-cell a')).toHaveCount(13);
    await expect(page.locator('.stl-cell a').first()).toHaveAttribute('href', '/years/2014/');
    // poverty is empty in most years, and an empty cell renders in the absence idiom
    expect(await page.locator('.stl-cell.is-empty').count()).toBeGreaterThan(5);
    await ctx.close();
  });
});

test.describe('the year page carries the picture and the strip', () => {
  test('the still lights only this year, and each pin and cell opens the subject at it', async ({ page }) => {
    await page.goto('/years/2019/');
    const lit = await page.locator('.lsc-still .lsc-fm:not(.is-off)').count();
    const off = await page.locator('.lsc-still .lsc-fm.is-off').count();
    expect(lit).toBeGreaterThan(0);
    expect(off).toBeGreaterThan(lit); // one year of thirteen lights a minority of the marks
    await expect(page.locator('.lsc-still .lsc-label')).toContainText(`${lit} marks lit of ${lit + off}`);
    await expect(page.locator('.lsc-still .lsc-pin')).toHaveCount(14);
    await expect(page.locator('.lsc-still .lsc-pin').first()).toHaveAttribute('href', /\/domains\/[a-z-]+\/#y-2019$/);
    await expect(page.locator('.yss-cell')).toHaveCount(14);
    await expect(page.locator('.yss-cell a').first()).toHaveAttribute('href', /#y-2019$/);
    // Kashmir has no series, and its cell says so rather than showing a zero as a finding
    await expect(page.locator('.yss-cell', { hasText: 'Kashmir' })).toContainText('0 series');
  });
});

test.describe('the three terms side by side', () => {
  test('fourteen rows of three bars, nine swatches in the key, counts printed, no grade', async ({ page }) => {
    await page.goto('/overview/#terms');
    await expect(page.locator('.tb-row')).toHaveCount(14);
    await expect(page.locator('.tb-bar')).toHaveCount(42);
    await expect(page.locator('.tb-key .tb-a')).toHaveCount(9);
    // every non-empty bar prints its count beside it
    const bars = page.locator('.tb-bar:not(:has(.is-empty)) .tb-n');
    expect(await bars.count()).toBeGreaterThan(30);
    for (const t of await bars.allInnerTexts()) expect(t).toMatch(/^\d+$/);
    await expect(page.locator('.tb-bar:has(.is-empty) .tb-n').first()).toHaveText('none filed');
    // the caveat travels with the picture
    await expect(page.locator('#terms-side-by-side + .sec-note')).toContainText('not how the term went');
  });
});

test.describe('performance facts', () => {
  test('scrolling the Atlas end to end prefetches no route payloads', async ({ page }) => {
    const txt: string[] = [];
    page.on('response', (r) => { if (/\.txt(\?|$)/.test(r.url())) txt.push(r.url()); });
    await page.goto('/overview/', { waitUntil: 'networkidle' });
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 700) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1500);
    expect(txt).toEqual([]);
    // and a link still navigates client-side, fetching its own payload once
    await page.evaluate(() => scrollTo(0, 0));
    await page.locator('a[href="/domains/education/"]').first().click();
    await expect(page).toHaveURL(/\/domains\/education\//);
    await expect(page.locator('h1')).toHaveText('Education');
  });

  test('the flow animates transform and opacity only — no filter on any card or its art', async ({ page }) => {
    await page.goto('/overview/');
    const filters = await page.evaluate(() =>
      [...document.querySelectorAll<HTMLElement>('.sc-card')].map(
        (c) => getComputedStyle(c).filter + '|' + getComputedStyle(c.querySelector('img')!).filter,
      ),
    );
    expect(new Set(filters)).toEqual(new Set(['none|none']));
    const t = await page.evaluate(() => getComputedStyle(document.querySelector('.sc-card')!).transitionProperty);
    expect(t).not.toContain('filter');
    // intrinsic sizes on every image, so a card never reflows when its art lands
    const sized = await page.locator('.sc-card img[width][height]').count();
    expect(sized).toBe(14);
  });
});
