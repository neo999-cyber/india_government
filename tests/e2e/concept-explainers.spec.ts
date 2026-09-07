import { test, expect } from '@playwright/test';

test.describe('guided topic explanations', () => {
  test('every topic opens with the same three-part reading guide', async ({ page }) => {
    const domains = ['macro', 'banking', 'employment', 'infrastructure', 'education', 'human-development', 'welfare', 'poverty', 'governance', 'federalism', 'environment', 'defence', 'foreign', 'kashmir'];
    for (const domain of domains) {
      await page.goto(`/domains/${domain}/`);
      const primer = page.locator('.topic-primer');
      await expect(primer.getByRole('heading', { name: 'What to notice before opening the evidence' })).toBeVisible();
      await expect(primer.locator('article')).toHaveCount(3);
      await expect(primer.getByRole('link', { name: 'Read the limits →' })).toHaveAttribute('href', '#missing');
    }
  });

  test('employment separates job counts from the kinds of work', async ({ page }) => {
    await page.goto('/domains/employment/');
    const explainer = page.locator('.eex');

    await expect(explainer).toBeVisible();
    await expect(explainer.getByRole('heading', { name: 'Employment rose, but what kind of work was it?' })).toBeVisible();
    await expect(explainer.getByRole('tab')).toHaveCount(3);
    await expect(explainer).toContainText('FY2023-24');
    await expect(explainer).toContainText('FY2020-21');
    await expect(explainer).toContainText('Survey estimate');
    await expect(explainer).toContainText('Primary source pending');
    await expect(explainer.locator('.eex-bars article.is-muted').first()).toHaveCSS('opacity', '1');

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

  for (const example of [
    { domain: 'education', heading: 'Learning results cannot be placed on one seamless line', measurement: 'Household assessment' },
    { domain: 'welfare', heading: 'An LPG connection and an LPG refill answer different questions', measurement: 'Cumulative delivery' },
    { domain: 'federalism', heading: 'Forty-one per cent of a pool is not forty-one per cent of all tax revenue', measurement: 'Certified revenue share' },
    { domain: 'banking', heading: 'Lower bad-loan ratios do not measure recoveries alone', measurement: 'Year-end stock ratio' },
  ]) {
    test(`${example.domain} explains unlike measures without hiding their evidence status`, async ({ page }) => {
      await page.goto(`/domains/${example.domain}/`);
      const explainer = page.locator('.eex');
      await expect(explainer.getByRole('heading', { name: example.heading })).toBeVisible();
      await expect(explainer).toContainText(example.measurement);
      await expect(explainer.getByText('See data and source →')).toHaveCount(2);
      if (example.domain !== 'federalism') {
        await expect(explainer.locator('.eex-unscaled')).toHaveCount(2);
        await expect(explainer).toContainText('Separate measure · do not subtract');
      }
    });
  }
});
