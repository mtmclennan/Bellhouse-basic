import { test, expect } from '@playwright/test';

test('excavation calculator to contact form handoff', async ({ page }) => {
  await page.goto('http://localhost:3000/resources/calculators/excavation');

  await page.getByLabel('Cut Length').fill('10');
  await page.getByLabel('Cut Width').fill('5');
  await page.getByLabel('Cut Depth').fill('2');

  await expect(page.getByText('100.00', { exact: false })).toBeVisible();

  await page.getByRole('link', { name: 'Request a project estimate' }).click();

  await page.waitForURL('**/contact?service=excavation&source=calculator');

  const message = await page.locator('#message').inputValue();
  expect(message).toContain('I used the Bellhouse excavation calculator.');
  expect(message).toContain('Dimensions: 10 m × 5 m × 2 m');
  expect(message).toContain('Excavation volume: 100.00 m³');
  expect(message).toContain('Truck loads: 11.5');

  // Excavation must map to the generic site-work option, never Foundation Excavation.
  await expect(page.getByLabel('Type of Work Required')).toHaveValue(
    'General Excavation / Site Work',
  );

  const stored = await page.evaluate(() => window.sessionStorage.getItem('bellhouse:calculatorLead'));
  expect(stored).toBeNull();

  // Refresh: no stored data left, message field should now be empty, no crash.
  await page.reload();
  await expect(page.locator('#message')).toHaveValue('');
});

test('direct /contact visit with no calculator context behaves normally', async ({ page }) => {
  await page.goto('http://localhost:3000/contact');
  await expect(page.locator('#message')).toHaveValue('');
  const select = page.locator('select').first();
  await expect(select).toHaveValue('');
});

test('malformed sessionStorage lead is discarded safely', async ({ page }) => {
  await page.goto('http://localhost:3000/contact');
  await page.evaluate(() => window.sessionStorage.setItem('bellhouse:calculatorLead', '{not-valid-json'));
  await page.goto('http://localhost:3000/contact?service=excavation&source=calculator');
  await expect(page.locator('#message')).toHaveValue('');
  const stored = await page.evaluate(() => window.sessionStorage.getItem('bellhouse:calculatorLead'));
  expect(stored).toBeNull();
});

test('gravel calculator to contact form handoff', async ({ page }) => {
  await page.goto('http://localhost:3000/resources/calculators/gravel');
  await page.getByLabel('Area Length').fill('20');
  await page.getByLabel('Area Width').fill('3');
  const depthInput = page.getByLabel('Gravel Depth');
  await depthInput.fill('150');

  await page.getByRole('link', { name: 'Request a project estimate' }).click();
  await page.waitForURL('**/contact?service=gravel&source=calculator');

  const message = await page.locator('#message').inputValue();
  expect(message).toContain('I used the Bellhouse gravel calculator.');
  await expect(page.getByLabel('Type of Work Required')).toHaveValue('Gravel Delivery');
});

test('topsoil calculator to contact form handoff', async ({ page }) => {
  await page.goto('http://localhost:3000/resources/calculators/topsoil');
  await page.getByLabel('Coverage Length').fill('12');
  await page.getByLabel('Coverage Width').fill('8');
  await page.getByLabel('Topsoil Depth').fill('100');

  await page.getByRole('link', { name: 'Request a project estimate' }).click();
  await page.waitForURL('**/contact?service=topsoil&source=calculator');

  const message = await page.locator('#message').inputValue();
  expect(message).toContain('I used the Bellhouse topsoil calculator.');
  await expect(page.getByLabel('Type of Work Required')).toHaveValue('Topsoil Delivery');
});

test('unknown calculator type leaves the work-type field unselected', async ({ page }) => {
  await page.goto('http://localhost:3000/contact?service=trenching&source=calculator');
  await expect(page.getByLabel('Type of Work Required')).toHaveValue('');
});

test('a non-calculator ?service= link keeps its existing exact-match behaviour', async ({ page }) => {
  // No source=calculator here — this must NOT go through the calculator
  // mapping, and must still match DEFAULT_WORK_TYPE_OPTIONS exactly as before.
  await page.goto('http://localhost:3000/contact?service=Gravel%20Delivery');
  await expect(page.getByLabel('Type of Work Required')).toHaveValue('Gravel Delivery');

  // A bare "gravel" (lowercase, matching the calculator kind) without
  // source=calculator must NOT be mapped either — it doesn't exactly match
  // any dropdown option, so the field stays unselected.
  await page.goto('http://localhost:3000/contact?service=gravel');
  await expect(page.getByLabel('Type of Work Required')).toHaveValue('');
});

test('does not overwrite a work type the user already selected', async ({ page }) => {
  await page.goto('http://localhost:3000/resources/calculators/excavation');
  await page.getByLabel('Cut Length').fill('10');
  await page.getByLabel('Cut Width').fill('5');
  await page.getByLabel('Cut Depth').fill('2');
  await page.getByRole('link', { name: 'Request a project estimate' }).click();
  await page.waitForURL('**/contact?service=excavation&source=calculator');

  const select = page.getByLabel('Type of Work Required');
  await expect(select).toHaveValue('General Excavation / Site Work');

  // User changes their mind — this must stick, not get reverted.
  await select.selectOption('Utility Trenches');
  await expect(select).toHaveValue('Utility Trenches');
});
