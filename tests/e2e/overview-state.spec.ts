import { test, expect } from '@playwright/test';

/**
 * THE ATLAS VIEW IS CITABLE. A selected year and set of topics survive reload in the URL, while
 * the default old route still shows the complete fixed-order board. This needs a browser: static
 * output can prove the controls exist, but not that using them changes both the view and its URL.
 */
test.describe('Atlas view state', () => {
  test('a shared year and topic focus restore, change and clear', async ({ page }) => {
    await page.goto('/overview/?year=2020&topics=education,employment');

    await expect(page.locator('.scrub-out')).toHaveText('2020');
    await expect(page.locator('.cards > .card')).toHaveCount(2);
    await expect(page.locator('.card-title')).toHaveText(['Employment', 'Education']);
    await expect(page.locator('.board-visible')).toHaveText('Showing 2 topics');

    await page.getByRole('button', { name: 'Next year' }).click();
    await expect(page.locator('.scrub-out')).toHaveText('2021');
    await expect(page).toHaveURL(/year=2021/);

    await page.locator('.board-focus summary').click();
    await page.getByRole('button', { name: 'Infrastructure', exact: true }).click();
    await expect(page.locator('.cards > .card')).toHaveCount(3);
    await expect(page).toHaveURL(/topics=employment%2Cinfrastructure%2Ceducation/);

    await page.getByRole('button', { name: 'Show all topics' }).click();
    await expect(page.locator('.cards > .card')).toHaveCount(14);
    await expect(page.locator('.board-visible')).toHaveText('Showing 14 topics');
    await expect(page).not.toHaveURL(/topics=/);
  });

  test('invalid shared state falls back to the complete Atlas', async ({ page }) => {
    await page.goto('/overview/?year=2001&topics=not-a-topic');

    await expect(page.locator('.scrub-out')).toHaveText('—');
    await expect(page.locator('.cards > .card')).toHaveCount(14);
    await expect(page.locator('.board-visible')).toHaveText('Showing 14 topics');
  });
});

/**
 * THE FIRST YEAR WAS UNREACHABLE FROM THE UNSET STATE, ON BOTH SCRUBBERS.
 *
 * While no year is chosen the thumb parks at the slider's minimum, so asking for the minimum
 * changes nothing, fires no `change`, and the reader is left looking at the unset readout with the
 * thumb sitting on the year they just asked for. Measured on both surfaces before the fix, each
 * with a positive control: the third year moved the readout, the first never did.
 *
 * **IT NEEDS REAL EVENTS AND THAT IS THE POINT.** A synthetic `input` event cannot exercise the
 * fix, because the fix reads `pointerup`/`keyup` — an interaction that produced no value change is
 * itself taken as a selection. The first probe written for this dispatched synthetic events and
 * reported the bug as still present after it had been fixed.
 *
 * Both assertions are required and each carries its own positive control, so a test that stopped
 * driving the control could not pass by finding nothing.
 */
test.describe('the year scrubbers reach their first year', () => {
  for (const [label, url, slider, readout, unset, first, second] of [
    // The two surfaces say "no year" differently and the assertion has to be told which: the Atlas
    // always renders `.scrub-out` and prints an em-dash into it, while the landing brief has no
    // heading at all until a year is chosen. Asserting one shape for both passed on the landing
    // page and failed on the Atlas for a reason that had nothing to do with the defect.
    ['atlas', '/overview/', '.scrub input[type=range]', '.scrub-out', 'dash', '2010', '2011'],
    ['landing', '/', '#lsc-yr', '.lsc-brief-h', 'absent', '2014', '2015'],
  ] as const) {
    test(`${label}: Home selects the first year from the unset state`, async ({ page }) => {
      await page.goto(url);
      const input = page.locator(slider).first();
      await input.scrollIntoViewIfNeeded();

      // As the page ships, no year is chosen and the readout does not name one.
      if (unset === 'absent') await expect(page.locator(readout)).toHaveCount(0);
      else await expect(page.locator(readout)).toHaveText('\u2014');

      await input.focus();
      await page.keyboard.press('Home');
      await expect(page.locator(readout)).toContainText(first);

      // POSITIVE CONTROL: an ordinary move must also land, so a test that had stopped driving the
      // control could not pass by asserting a readout that never changed.
      await page.keyboard.press('ArrowRight');
      await expect(page.locator(readout)).toContainText(second);
    });
  }
});

/**
 * THE LANDING BRIEF IS CITABLE, which is the same property this file already asserts for the Atlas
 * and for the same reason: static output can prove the control exists, not that using it changes
 * the view AND its URL.
 *
 * The hash is a FALLBACK the reader's own choices override, not a seed copied into state — so the
 * assertions are that a link opens on its subject-year, that a nonsense hash pins nothing, and that
 * reading writes the address bar without filling the back button.
 */
test.describe('the landing brief is citable', () => {
  test('a shared subject-year opens on it, and reading rewrites the hash', async ({ page }) => {
    await page.goto('/#education-2019');
    await expect(page.locator('.lsc-brief-h')).toContainText('Education');
    await expect(page.locator('.lsc-brief-h')).toContainText('2019');

    // POSITIVE CONTROL: a hash naming no subject must pin nothing, so a test that passed by
    // matching any brief at all would fail here.
    await page.goto('/#notasubject-2019');
    await expect(page.locator('.lsc-brief-idle')).toBeVisible();
    await expect(page.locator('.lsc-brief-h')).toHaveCount(0);

    await page.goto('/');
    const before = await page.evaluate(() => history.length);
    const slider = page.locator('#lsc-yr');
    await slider.scrollIntoViewIfNeeded();
    await slider.focus();
    await page.keyboard.press('Home');
    for (let i = 0; i < 6; i += 1) await page.keyboard.press('ArrowRight');
    await page.locator('a.lsc-pin[data-k="kashmir"]').hover();
    await expect(page).toHaveURL(/#kashmir-2020$/);
    // `replaceState`, so scrubbing a decade leaves one entry rather than thirteen.
    expect(await page.evaluate(() => history.length)).toBe(before);
  });
});

/**
 * THE LANDMARK PINS TAKE TWO PRESSES, FROM EVERY POINTER.
 *
 * Operator, 2026-09-01: "first click activates it and use the scroller, then double click goes to
 * the domain". A hover-only selection could not survive the reader moving to the year control, so
 * a mouse reader had no way to hold a subject while scrubbing.
 *
 * **THE MOUSE WORK NEEDS BOTH ELEMENTS ON SCREEN FIRST.** Scrolling to one can put the other
 * outside the viewport, where a mouse move is clamped and lands somewhere else; the probe that
 * found this bug dragged at a clamped coordinate, changed no year, and read as a page defect.
 */
test.describe('the landmark pins', () => {
  test('first press selects, the year control still works, the second press opens', async ({ page }) => {
    await page.goto('/');
    await page.locator('.lsc-year').scrollIntoViewIfNeeded();
    const pin = page.locator('a.lsc-pin[data-k="education"]');
    await expect(pin).toBeInViewport();
    await expect(page.locator('#lsc-yr')).toBeInViewport();

    await pin.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(pin).toHaveClass(/is-armed/);
    // A first press that does not navigate has to say so, or it reads as a broken link.
    await expect(page.locator('.lsc-read-foot')).toContainText('press again to open Education');

    // The year control lives inside the same block, so working it must not disarm the selection.
    const track = (await page.locator('#lsc-yr').boundingBox())!;
    await page.mouse.move(track.x + track.width * 0.1, track.y + track.height / 2);
    await page.mouse.down();
    await page.mouse.move(track.x + track.width * 0.45, track.y + track.height / 2, { steps: 8 });
    await page.mouse.up();
    await expect(page.locator('.lsc-brief-h')).toContainText('Education');
    await expect(pin).toHaveClass(/is-armed/);

    await pin.click();
    await expect(page).toHaveURL(/\/domains\/education\/$/);
  });

  test('a keyboard press opens at once, and leaving the block disarms', async ({ page }) => {
    // POSITIVE CONTROL for the two-step: a keyboard activation has already selected by focusing, so
    // making it press twice would buy nothing and look broken. `detail === 0` is the discriminator.
    await page.goto('/');
    await page.locator('a.lsc-pin[data-k="defence"]').focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/domains\/defence\/$/);

    // And an armed pin does not stay armed once the pointer has left: a stray click minutes later
    // must not navigate. The brief keeps the subject; only the armed state resets.
    await page.goto('/');
    await page.locator('.lsc-year').scrollIntoViewIfNeeded();
    const pin = page.locator('a.lsc-pin[data-k="education"]');
    await pin.click();
    await expect(pin).toHaveClass(/is-armed/);
    await page.mouse.move(20, 20, { steps: 6 });
    await expect(pin).not.toHaveClass(/is-armed/);
    await expect(page.locator('.lsc-read-name')).toHaveText('Education');
  });
});
