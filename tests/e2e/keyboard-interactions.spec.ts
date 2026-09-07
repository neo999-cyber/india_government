import { test, expect } from '@playwright/test';

test.describe('chart and dialog keyboard interactions', () => {
  test('arrow keys move between chart points', async ({ page }) => {
    await page.goto('/series/res-capacity-share/');
    const points = page.locator('.chart-svg [data-chart-point]');
    expect(await points.count()).toBeGreaterThan(2);

    await points.first().focus();
    await page.keyboard.press('ArrowRight');
    await expect(points.nth(1)).toBeFocused();
    await page.keyboard.press('End');
    await expect(points.last()).toBeFocused();
    await page.keyboard.press('Home');
    await expect(points.first()).toBeFocused();
  });

  test('command palette traps focus and returns it on Escape', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: /Quick Search/ });
    await trigger.click();
    await expect(page.getByRole('dialog', { name: 'Quick search' })).toBeVisible();
    await expect(page.getByRole('combobox')).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog', { name: 'Quick search' })).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('provenance drawer traps focus, updates the URL and returns focus', async ({ page }) => {
    await page.goto('/series/res-capacity-share/');
    const trigger = page.locator('a[href^="/provenance/P-"]').first();
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(page).toHaveURL(/provenance=P-/);
    await expect(page.getByRole('button', { name: 'Close provenance drawer' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(page).not.toHaveURL(/provenance=/);
    await expect(trigger).toBeFocused();
  });
});
