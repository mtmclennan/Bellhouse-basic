import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/tracking/google', () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from '@/lib/tracking/google';
import { trackCalculatorEvent } from '../trackCalculatorEvent';

describe('trackCalculatorEvent', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('forwards the event name and params to the sitewide trackEvent helper', () => {
    trackCalculatorEvent('calculator_started', { calculator_type: 'excavation' });

    expect(trackEvent).toHaveBeenCalledWith('calculator_started', {
      calculator_type: 'excavation',
    });
  });

  it('does not throw when the tracking helper throws', () => {
    vi.mocked(trackEvent).mockImplementation(() => {
      throw new Error('gtag exploded');
    });

    expect(() =>
      trackCalculatorEvent('calculator_started', { calculator_type: 'gravel' }),
    ).not.toThrow();
  });

  it('does not throw when the analytics library is missing (trackEvent no-ops)', () => {
    // Mirrors trackEvent()'s own real behaviour when window.gtag is undefined.
    vi.mocked(trackEvent).mockImplementation(() => undefined);

    expect(() =>
      trackCalculatorEvent('calculator_completed', {
        calculator_type: 'topsoil',
        unit_system: 'metric',
        material_type: 'topsoil',
      }),
    ).not.toThrow();
  });
});
