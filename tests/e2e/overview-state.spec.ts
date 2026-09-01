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
