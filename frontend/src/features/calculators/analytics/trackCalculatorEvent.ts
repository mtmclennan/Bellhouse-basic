import { trackEvent } from '@/lib/tracking/google';
import type {
  CalculatorAnalyticsEventName,
  CalculatorAnalyticsEventParams,
} from './calculatorAnalyticsEvents';

/**
 * Safe wrapper around the sitewide trackEvent() helper. Analytics must never
 * break the calculator, so any failure here (missing gtag, a throwing
 * tracking helper, storage/consent issues) is swallowed silently.
 */
export function trackCalculatorEvent<T extends CalculatorAnalyticsEventName>(
  name: T,
  params: CalculatorAnalyticsEventParams[T],
): void {
  try {
    trackEvent(name, params);
  } catch {
    // Analytics failures must never prevent the calculator from working.
  }
}
