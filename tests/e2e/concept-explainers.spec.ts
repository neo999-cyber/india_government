import { test, expect } from '@playwright/test';

test.describe('guided topic explanations', () => {
  test('employment separates job counts from the kinds of work', async ({ page }) => {
    await page.goto('/domains/employment/');
    const explainer = page.locator('.eex');

    await expect(explainer).toBeVisible();
    await expect(explainer.getByRole('heading', { name: 'Employment rose, but what kind of work was it?' })).toBeVisible();
    await expect(explainer.getByRole('tab')).toHaveCount(3);
    await expect(explainer).toContainText('FY2023-24');
    await expect(explainer).toContainText('FY2020-21');

    const first = explainer.getByRole('tab', { name: /Employed ≠ salaried/ });
    const unpaid = explainer.getByRole('tab', { name: /Notice unpaid work/ });
    await first.focus();
    await page.keyboard.press('End');
    await expect(unpaid).toBeFocused();
    await expect(unpaid).toHaveAttribute('aria-selected', 'true');
    await expect(explainer.getByRole('tabpanel')).toContainText('shown separately');
    await expect(explainer.locator('a[href="/series/unpaid-helper-share/"]')).toHaveText('See data and source →');
  });

  test('environment distinguishes installed capacity from annual generation', async ({ page }) => {
    await page.goto('/domains/environment/');
    const explainer = page.locator('.eex');

    await expect(explainer.getByRole('heading', { name: 'Half the fleet is not half the electricity' })).toBeVisible();
    await expect(explainer).toContainText('44.97');
    await expect(explainer).toContainText('23.51');
    await explainer.getByRole('tab', { name: /Read them together/ }).click();
    await expect(explainer.locator('.eex-bars article.is-active')).toHaveCount(2);
    await expect(explainer.locator('.eex-caveat')).toContainText('stock at year-end');
    await expect(explainer.locator('.eex-caveat')).toContainText('flow across the year');
  });

  test('the explanation does not animate when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/domains/environment/');

    await expect(page.locator('.eex-panel')).toHaveCSS('animation-name', 'none');
    await expect(page.locator('.eex-track span').first()).toHaveCSS('animation-name', 'none');
  });
});
