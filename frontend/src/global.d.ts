export {};

declare global {
  interface Window {
    grecaptcha?: {
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
      ready: (callback: () => void) => void;
    };
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          size?: 'normal' | 'compact' | 'flexible' | 'invisible';
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
        },
      ) => string;
      execute: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
