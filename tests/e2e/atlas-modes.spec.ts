import { test, expect } from '@playwright/test';

test.describe('coherent Atlas modes', () => {
  test('view, year and topic state share one URL and keyboard mode switcher', async ({ page }) => {
    await page.goto('/overview/?view=timeline&year=2020&topics=education,employment');

    await expect(page.getByRole('tab', { name: /Timeline/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.atlas-timeline-row')).toHaveCount(2);
    await expect(page.locator('.scrub-out')).toHaveText('2020');

    await page.getByRole('tab', { name: /Timeline/ }).focus();
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: /Constellation/ })).toBeFocused();
    await expect(page).toHaveURL(/view=constellation/);
    await expect(page.locator('.rc-group[data-area="education"] .rc-node')).not.toHaveCount(0);
    await expect(page.locator('.rc-group[data-area="security"] .rc-node')).toHaveCount(0);
  });

  test('search narrows the active visual and remains shareable', async ({ page }) => {
    await page.goto('/overview/');
    const search = page.getByRole('searchbox', { name: 'Search within the active Atlas view' });
    await search.fill('banking');

    await expect(page.locator('.cards > .card')).toHaveCount(1);
    await expect(page.locator('.card-title')).toContainText('Banking');
    await expect(page).toHaveURL(/q=banking/);

    await page.reload();
    await expect(search).toHaveValue('banking');
    await expect(page.locator('.cards > .card')).toHaveCount(1);
  });

  test('compare is an Atlas mode and invalid modes fall back to Movement', async ({ page }) => {
    await page.goto('/overview/?view=compare&topics=education');
    await expect(page.getByRole('tab', { name: /Compare/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.compare-workbench')).toBeVisible();

    await page.goto('/overview/?view=compare&topics=employment');
    await expect(page.locator('.compare-preset-domain')).toContainText([
      'Unemployment rate, usual status',
      'Labour force participation rate, usual status',
    ]);

    await page.goto('/overview/?view=unknown');
    await expect(page.getByRole('tab', { name: /Movement/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.locator('.cards > .card')).toHaveCount(14);
  });
});
