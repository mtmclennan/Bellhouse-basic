import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3000';

async function getCalcEvents(page: any): Promise<any[][]> {
  const dataLayer: any[][] = await page.evaluate(() =>
    ((window as any).dataLayer || []).map((entry: any) => Array.from(entry))
  );
  return dataLayer.filter((e) => typeof e[1] === 'string' && e[1].startsWith('calculator_'));
}

test('excavation calculator fires the full event set with no PII', async ({ page }) => {
  await page.goto(`${BASE}/resources/calculators/excavation`);

  // Before any input: no calculator_started yet.
  expect((await getCalcEvents(page)).length).toBe(0);

  await page.getByLabel('Cut Length').fill('10');

  let events = await getCalcEvents(page);
  const startedEvents = events.filter((e) => e[1] === 'calculator_started');
  expect(startedEvents.length).toBe(1);
  expect(startedEvents[0][2]).toEqual({ calculator_type: 'excavation' });

  await page.getByLabel('Cut Width').fill('5');
  await page.getByLabel('Cut Depth').fill('2');

  // Still only one calculator_started despite multiple changes.
  events = await getCalcEvents(page);
  expect(events.filter((e) => e[1] === 'calculator_started').length).toBe(1);

  // Wait past the debounce window for calculator_completed.
  await page.waitForTimeout(900);
  events = await getCalcEvents(page);
  const completedEvents = events.filter((e) => e[1] === 'calculator_completed');
  expect(completedEvents.length).toBe(1);
  expect(completedEvents[0][2]).toEqual({
    calculator_type: 'excavation',
    unit_system: 'metric',
    material_type: 'native-soil',
  });

  // Open advanced section.
  await page.getByRole('button', { name: /Advanced features/i }).click();
  await page.waitForTimeout(100);
  events = await getCalcEvents(page);
  const advancedEvents = events.filter((e) => e[1] === 'calculator_advanced_opened');
  expect(advancedEvents.length).toBe(1);
  expect(advancedEvents[0][2]).toEqual({ calculator_type: 'excavation' });

  // Closing should NOT fire again.
  await page.getByRole('button', { name: /Advanced features/i }).click();
  await page.waitForTimeout(100);
  events = await getCalcEvents(page);
  expect(events.filter((e) => e[1] === 'calculator_advanced_opened').length).toBe(1);

  // Quote click.
  await page.getByRole('link', { name: 'Request a project estimate' }).click();
  await page.waitForURL('**/contact?service=excavation&source=calculator');
  events = await getCalcEvents(page);
  const quoteEvents = events.filter((e) => e[1] === 'calculator_quote_clicked');
  expect(quoteEvents.length).toBe(1);
  expect(quoteEvents[0][2]).toEqual({
    calculator_type: 'excavation',
    unit_system: 'metric',
    has_valid_result: true,
  });

  // No PII / raw calculated values anywhere in any calculator_* payload.
  const forbidden = ['name', 'email', 'phone', 'address', 'location', 'message', 'volume', 'weight', 'truckload', 'length', 'width', 'depth'];
  for (const [, , payload] of events) {
    for (const key of Object.keys(payload ?? {})) {
      expect(forbidden.some((f) => key.toLowerCase().includes(f))).toBe(false);
    }
  }
});

test('related service and calculator links fire calculator_service_link_clicked', async ({ page }) => {
  await page.goto(`${BASE}/resources/calculators/excavation`);
  await page.getByRole('link', { name: 'Open Gravel Calculator' }).click();
  await page.waitForURL('**/resources/calculators/gravel');

  const events = await getCalcEvents(page);
  const linkEvents = events.filter((e) => e[1] === 'calculator_service_link_clicked');
  expect(linkEvents.length).toBe(1);
  expect(linkEvents[0][2]).toEqual({
    calculator_type: 'excavation',
    service_slug: 'gravel',
    destination_type: 'calculator',
  });
});

test('related Bellhouse service link fires with destination_type "service"', async ({ page }) => {
  await page.goto(`${BASE}/resources/calculators/excavation`);
  await page.getByRole('link', { name: 'View Foundation Excavation' }).first().click();
  await page.waitForURL('**/services/foundation-excavation');

  const events = await getCalcEvents(page);
  const linkEvents = events.filter((e) => e[1] === 'calculator_service_link_clicked');
  expect(linkEvents.length).toBe(1);
  expect(linkEvents[0][2]).toEqual({
    calculator_type: 'excavation',
    service_slug: 'foundation-excavation',
    destination_type: 'service',
  });
});

test('gravel and topsoil calculators fire calculator_started/completed correctly', async ({ page }) => {
  await page.goto(`${BASE}/resources/calculators/gravel`);
  await page.getByLabel('Area Length').fill('20');
  await page.getByLabel('Area Width').fill('3');
  await page.getByLabel('Gravel Depth').fill('150');
  await page.waitForTimeout(900);

  let events = await getCalcEvents(page);
  expect(events.filter((e) => e[1] === 'calculator_started' && e[2].calculator_type === 'gravel').length).toBe(1);
  expect(events.some((e) => e[1] === 'calculator_completed' && e[2].calculator_type === 'gravel')).toBe(true);

  await page.goto(`${BASE}/resources/calculators/topsoil`);
  await page.getByLabel('Coverage Length').fill('12');
  await page.getByLabel('Coverage Width').fill('8');
  await page.getByLabel('Topsoil Depth').fill('100');
  await page.waitForTimeout(900);

  events = await getCalcEvents(page);
  expect(events.filter((e) => e[1] === 'calculator_started' && e[2].calculator_type === 'topsoil').length).toBe(1);
  expect(events.some((e) => e[1] === 'calculator_completed' && e[2].calculator_type === 'topsoil')).toBe(true);
});
