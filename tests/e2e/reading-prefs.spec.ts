import { test, expect, type Page } from '@playwright/test';

/**
 * READING PREFERENCES — the four switches, and the two things about them that only a browser knows.
 *
 * ============================ WHY THESE PROPERTIES CANNOT BE GATES ============================
 *
 * `interface-invariants` reads built bytes, and the built bytes of this feature are four attribute
 * selectors and a `<details>`. **Everything that could go wrong here is a computed value:** whether
 * scaling the root actually moved the body text, whether a 125% page still fits a 320px phone,
 * whether the panel opens inside the viewport, and whether the control correctly REMOVES itself
 * when script never runs. None of those is visible in the HTML.
 *
 * ============================ THE OVERFLOW TESTS ARE THE POINT ================================
 *
 * A "larger text" switch is the single most likely thing in this codebase to break a layout,
 * because **media queries are in px and do not scale with it.** At `largest` on a 320px phone the
 * page is rendering at 125% inside a viewport the breakpoint ladder still calls narrow, so every
 * fixed-width assumption is being asked a question it has never been asked. `overflow.spec.ts` and
 * `constellation.spec.ts` both assert no sideways scroll at the DEFAULT size; neither would notice
 * this. That is why the scale is a page zoom — root font-size, so rem spacing grows with the type —
 * and why it is asserted at all three sizes rather than trusted.
 *
 * ============================ AND THE NO-SCRIPT TEST IS NOT A DETAIL =========================
 *
 * The whole site works with the bundle dead; this control cannot. A `<details>` full of inert
 * buttons is a control that lies about what it does, so it hides until `BOOT` proves script is
 * running. **That is asserted here with `javaScriptEnabled: false`, which is the only way to
 * observe it** — the element is in the HTML either way.
 */

const openPanel = async (page: Page) => {
  const d = page.locator('details.prefs');
  await d.locator('summary').click();
  await expect(d).toHaveJSProperty('open', true);
  return d;
};

/** Press one switch by its visible label, within its own labelled group. */
const setSwitch = async (page: Page, group: string, label: string) => {
  await page.locator(`[role="group"][aria-label="${group}"]`).getByRole('button', { name: label, exact: true }).click();
};

const rootAttr = (page: Page, attr: string) =>
  page.evaluate((a) => document.documentElement.getAttribute(a), attr);

const scrollsSideways = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);

test.describe('reading preferences', () => {
  test('the control is present, and BOOT has declared script alive', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('data-js', 'on');
    const prefs = page.locator('details.prefs');
    await expect(prefs).toBeVisible();
    await expect(prefs.locator('summary')).toHaveText('Reading');
  });

  test('each switch sets its own attribute, and nothing else moves', async ({ page }) => {
    await page.goto('/');
    await openPanel(page);

    /**
     * AN UNSET PREFERENCE IS AN ABSENT ATTRIBUTE, NOT A DEFAULT VALUE — and the first version of
     * this test asserted `'dark'` here and failed, correctly. `BOOT` writes an attribute only for a
     * value it found in storage, and the stylesheet's default palette is bare `:root` with no
     * `[data-theme='dark']` rule at all. So "as the site ships" IS the absence, and asserting a
     * string would have locked in a defaulting behaviour the CSS does not have.
     *
     * The property this test's name claims is therefore UNCHANGED, not equal-to-a-fallback: a panel
     * that wrote all four attributes on every press would pass a per-switch check while silently
     * resetting a reader's other three choices.
     */
    const others = ['data-theme', 'data-links', 'data-motion'] as const;
    const before = await Promise.all(others.map((a) => rootAttr(page, a)));
    expect(before, 'nothing is set before a reader chooses anything').toEqual([null, null, null]);

    await setSwitch(page, 'Text size', 'Large');
    expect(await rootAttr(page, 'data-text')).toBe('large');
    expect(await Promise.all(others.map((a) => rootAttr(page, a)))).toEqual(before);

    await setSwitch(page, 'Canvas', 'Light');
    expect(await rootAttr(page, 'data-theme')).toBe('light');
    expect(await rootAttr(page, 'data-text')).toBe('large');

    await setSwitch(page, 'Links', 'Always underlined');
    expect(await rootAttr(page, 'data-links')).toBe('underline');

    await setSwitch(page, 'Motion', 'Stop animation');
    expect(await rootAttr(page, 'data-motion')).toBe('off');
  });

  test('a choice survives a navigation, restored before the first paint', async ({ page }) => {
    await page.goto('/');
    await openPanel(page);
    await setSwitch(page, 'Canvas', 'Light');

    // A full document load, not a client-side route change: this is what BOOT exists for.
    await page.goto('/method/');
    expect(await rootAttr(page, 'data-theme')).toBe('light');

    // And it is genuinely the light palette, not merely the attribute.
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).toBe('rgb(239, 234, 224)');
  });

  test('the switches change what they claim to change', async ({ page }) => {
    await page.goto('/');
    const bodySize = () => page.evaluate(() => getComputedStyle(document.body).fontSize);
    const before = await bodySize();

    await openPanel(page);
    await setSwitch(page, 'Text size', 'Largest');
    const after = await bodySize();
    // 17px -> 21.25px. The assertion is the RATIO, so the test survives a change to the base size.
    expect(parseFloat(after) / parseFloat(before)).toBeCloseTo(1.25, 2);

    await setSwitch(page, 'Links', 'Always underlined');
    const dec = await page.evaluate(() => {
      const a = document.querySelector('main a')!;
      const s = getComputedStyle(a);
      return { line: s.textDecorationLine, color: s.textDecorationColor, ink: s.color };
    });
    expect(dec.line).toBe('underline');
    // currentColor, not the `--rule` hairline — underlining in a colour nobody can see is the same
    // defect one level down.
    expect(dec.color).toBe(dec.ink);
  });

  /**
   * THE RISK THIS FEATURE ACTUALLY CARRIES. Media queries are px and do not scale with the root, so
   * a 125% page inside a 320px viewport is the case nothing else in this suite exercises.
   */
  for (const width of [320, 375, 768, 1280] as const) {
    for (const size of ['large', 'largest'] as const) {
      test(`${width}px at ${size} — the page still does not scroll sideways`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto('/');
        await page.evaluate((s) => document.documentElement.setAttribute('data-text', s), size);
        await page.waitForTimeout(150);
        expect(await scrollsSideways(page)).toBe(false);
      });
    }
  }

  for (const width of [320, 375, 768, 1280] as const) {
    test(`${width}px — the open panel is fully inside the viewport`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await openPanel(page);

      const box = (await page.locator('.prefs-panel').boundingBox())!;
      expect(box.x, 'panel runs off the left edge').toBeGreaterThanOrEqual(-1);
      expect(box.x + box.width, 'panel runs off the right edge').toBeLessThanOrEqual(width + 1);
      expect(await scrollsSideways(page), 'the open panel makes the page scroll sideways').toBe(false);

      // Every switch is a real target. A control built for readers with a motor or vision
      // difficulty is the last place in this instrument to ship an undersized one.
      for (const b of await page.locator('.prefs-opt').all()) {
        const bb = (await b.boundingBox())!;
        expect(bb.height, `"${(await b.textContent())?.trim()}" target height`).toBeGreaterThanOrEqual(44);
      }
    });
  }

  test('Escape closes it and returns focus to the summary', async ({ page }) => {
    await page.goto('/');
    const d = await openPanel(page);
    await page.keyboard.press('Escape');
    await expect(d).toHaveJSProperty('open', false);
    await expect(d.locator('summary')).toBeFocused();
  });

  test('pressing a switch does NOT close the panel', async ({ page }) => {
    await page.goto('/');
    const d = await openPanel(page);
    await setSwitch(page, 'Text size', 'Large');
    // `AllPagesDisclosure` closes on any click inside, because its contents are links. Copying that
    // here would shut the panel on the one interaction it exists for.
    await expect(d).toHaveJSProperty('open', true);
  });

  test('the motion switch reaches a component that decides in JavaScript', async ({ page }) => {
    await page.goto('/overview/');
    // The board renders its play control only when motion is permitted; `motionReduced()` ORs the
    // system preference with this switch, so throwing it must withdraw the control live.
    const play = page.locator('.scrub-play');
    await expect(play).toHaveCount(1);

    await openPanel(page);
    await setSwitch(page, 'Motion', 'Stop animation');
    await expect(play).toHaveCount(0);
  });

  test.describe('with the bundle dead', () => {
    test.use({ javaScriptEnabled: false });

    test('the control removes itself rather than shipping inert switches', async ({ page }) => {
      await page.goto('/');
      // It is in the HTML — this is a static export, the markup is always there.
      await expect(page.locator('details.prefs')).toHaveCount(1);
      // And it is not shown, because nothing it contains could work.
      await expect(page.locator('details.prefs')).toBeHidden();
      await expect(page.locator('html')).not.toHaveAttribute('data-js', 'on');
      // The rest of the page is unaffected, which is the property this must not cost.
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('.allpages, .allpages-link').first()).toBeAttached();
    });
  });
});
