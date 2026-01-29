import { test, expect } from '@playwright/test';

test('homepage renders', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('body')).toContainText(/Bellhouse/i);
});

test('contact page renders and form is present', async ({ page }) => {
  await page.goto('/contact', { waitUntil: 'domcontentloaded' });

  await expect(
    page.getByRole('heading', { name: /tell us about your project/i }),
  ).toBeVisible();

  await expect(page.locator('#name')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#phone')).toBeVisible();
  await expect(page.locator('#workType')).toBeVisible();
  await expect(page.locator('#message')).toBeVisible();

  // Don’t click submit: reCAPTCHA + CI = flaky nonsense.
});
