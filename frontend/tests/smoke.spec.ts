import { test, expect } from '@playwright/test';

function attachFailureWatchers(page: import('@playwright/test').Page) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  const failedRequests: string[] = [];
  const badResponses: string[] = [];

  page.on('console', (msg) => {
    // Only collect real errors. Warnings are annoying, but not usually outages.
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err?.message ?? String(err));
  });

  page.on('requestfailed', (req) => {
    const failure = req.failure();
    failedRequests.push(
      `${req.method()} ${req.url()} :: ${failure?.errorText ?? 'request failed'}`,
    );
  });

  page.on('response', (res) => {
    // Catch 4xx/5xx on document and XHR/fetch. Ignore images/fonts to reduce noise.
    const status = res.status();
    const url = res.url();
    const rt = res.request().resourceType();

    const isNoisyAsset =
      rt === 'image' || rt === 'font' || rt === 'stylesheet' || rt === 'media';

    if (!isNoisyAsset && status >= 400) {
      badResponses.push(`${status} ${rt} ${url}`);
    }
  });

  return { consoleErrors, pageErrors, failedRequests, badResponses };
}

async function assertNoSoftErrors(page: import('@playwright/test').Page) {
  // Catch common “looks fine but it’s actually an error page” situations.
  await expect(page.locator('body')).not.toContainText(
    /application error|server error|something went wrong|internal server error|bad gateway|service unavailable/i,
  );
}

function throwIfProblems(label: string, problems: Record<string, string[]>) {
  const lines: string[] = [];

  for (const [k, arr] of Object.entries(problems)) {
    if (arr.length) {
      lines.push(`\n=== ${label}: ${k} (${arr.length}) ===`);
      lines.push(...arr.slice(0, 20).map((x) => `- ${x}`));
      if (arr.length > 20) lines.push(`- ...and ${arr.length - 20} more`);
    }
  }

  if (lines.length) {
    throw new Error(lines.join('\n'));
  }
}

test('homepage renders cleanly', async ({ page }) => {
  const w = attachFailureWatchers(page);

  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await assertNoSoftErrors(page);

  // Basic “is this the real homepage?” assertion
  await expect(page.locator('body')).toContainText(/Bellhouse/i);

  throwIfProblems('homepage', {
    consoleErrors: w.consoleErrors,
    pageErrors: w.pageErrors,
    failedRequests: w.failedRequests,
    badResponses: w.badResponses,
  });
});

test('contact page renders and form is present (no submit)', async ({
  page,
}) => {
  const w = attachFailureWatchers(page);

  await page.goto('/contact', { waitUntil: 'domcontentloaded' });

  await assertNoSoftErrors(page);

  await expect(
    page.getByRole('heading', { name: /tell us about your project/i }),
  ).toBeVisible();

  // Form fields exist and are interactable
  await expect(page.locator('#name')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#phone')).toBeVisible();
  await expect(page.locator('#workType')).toBeVisible();
  await expect(page.locator('#message')).toBeVisible();

  // Touch inputs lightly to prove the UI isn’t dead/hydration-broken
  await page.locator('#name').fill('Playwright Bot');
  await page.locator('#email').fill('monitor@bellhouseexcavating.ca');
  await page
    .locator('#message')
    .fill('Smoke test: UI render check (no submit).');

  // Do NOT submit: reCAPTCHA + CI = flaky nonsense.
  throwIfProblems('contact', {
    consoleErrors: w.consoleErrors,
    pageErrors: w.pageErrors,
    failedRequests: w.failedRequests,
    badResponses: w.badResponses,
  });
});
