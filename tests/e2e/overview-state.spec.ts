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
