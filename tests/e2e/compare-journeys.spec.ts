import { test, expect } from '@playwright/test';

test.describe('comparison evidence journeys', () => {
  test('record links open the selected series and compact charts retain evidence labels', async ({ page }) => {
    await page.goto('/compare/?pair=PR-02');

    const recordLinks = page.getByRole('link', { name: 'View record' });
    await expect(recordLinks).toHaveCount(2);
    await expect(recordLinks.nth(0)).toHaveAttribute('href', '/series/jjm-tap-coverage/');
    await expect(recordLinks.nth(1)).toHaveAttribute('href', '/series/jjm-functionality/');

    await expect(page.locator('.compare-table')).toContainText('FY2019-20');
    await expect(page.locator('.compare-table')).toContainText('Hollow point: approximate observation.');

    const custom = page.locator('.compare-custom');
    await expect(custom).not.toHaveAttribute('open', '');
    await custom.getByText('Build a custom comparison').click();
    await expect(custom).toHaveAttribute('open', '');
    await expect(custom.locator('select')).toHaveCount(2);

    await recordLinks.nth(0).click();
    await expect(page).toHaveURL(/\/series\/jjm-tap-coverage\/$/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Rural households with tap water connection');
  });
});
