'use client';

export async function getInvisibleTurnstileToken({
  container,
  siteKey,
}: {
  container: HTMLElement | null;
  siteKey: string;
}) {
  const turnstile = window.turnstile;

  if (!siteKey || !container || !turnstile) {
    throw new Error('Photo uploads are not ready. Please submit without photos or text them to 519-752-8500.');
  }

  return new Promise<string>((resolve, reject) => {
    let widgetId = '';
    let settled = false;

    const cleanup = () => {
      if (widgetId) {
        turnstile.remove(widgetId);
      }
    };

    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(
        new Error(
          'Photo upload verification timed out. Please try again or submit without photos.',
        ),
      );
    }, 20_000);

    widgetId = turnstile.render(container, {
      sitekey: siteKey,
      size: 'invisible',
      callback: (token) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        cleanup();
        resolve(token);
      },
      'error-callback': () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        cleanup();
        reject(
          new Error(
            'Photo upload verification failed. Please try again or submit without photos.',
          ),
        );
      },
      'expired-callback': () => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        cleanup();
        reject(
          new Error(
            'Photo upload verification expired. Please try again or submit without photos.',
          ),
        );
      },
    });

    turnstile.execute(widgetId);
  });
}
