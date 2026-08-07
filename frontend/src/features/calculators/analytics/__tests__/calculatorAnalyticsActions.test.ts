import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/tracking/google', () => ({
  trackEvent: vi.fn(),
}));

import { trackEvent } from '@/lib/tracking/google';
import {
  trackCalculatorAdvancedOpened,
  trackCalculatorQuoteClicked,
  trackCalculatorServiceLinkClicked,
} from '../calculatorAnalyticsActions';

const ALLOWED_PARAM_KEYS = [
  'calculator_type',
  'unit_system',
  'material_type',
  'has_valid_result',
  'destination_type',
  'service_slug',
];

describe('calculatorAnalyticsActions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calculator_advanced_opened carries only calculator_type', () => {
    trackCalculatorAdvancedOpened('excavation');

    expect(trackEvent).toHaveBeenCalledWith('calculator_advanced_opened', {
      calculator_type: 'excavation',
    });
  });

  it('calculator_quote_clicked carries calculator_type, unit_system, has_valid_result', () => {
    trackCalculatorQuoteClicked({
      calculatorType: 'gravel',
      unitSystem: 'imperial',
      hasValidResult: true,
    });

    expect(trackEvent).toHaveBeenCalledWith('calculator_quote_clicked', {
      calculator_type: 'gravel',
      unit_system: 'imperial',
      has_valid_result: true,
    });
  });

  it('calculator_service_link_clicked extracts the slug and carries destination_type', () => {
    trackCalculatorServiceLinkClicked({
      calculatorType: 'topsoil',
      href: '/services/land-grading-drainage',
      destinationType: 'service',
    });

    expect(trackEvent).toHaveBeenCalledWith('calculator_service_link_clicked', {
      calculator_type: 'topsoil',
      service_slug: 'land-grading-drainage',
      destination_type: 'service',
    });
  });

  it('calculator_service_link_clicked to another calculator uses destination_type "calculator"', () => {
    trackCalculatorServiceLinkClicked({
      calculatorType: 'excavation',
      href: '/resources/calculators/gravel',
      destinationType: 'calculator',
    });

    expect(trackEvent).toHaveBeenCalledWith('calculator_service_link_clicked', {
      calculator_type: 'excavation',
      service_slug: 'gravel',
      destination_type: 'calculator',
    });
  });

  it.each(['excavation', 'gravel', 'topsoil'] as const)(
    'never sends a parameter outside the allowed list for %s',
    (kind) => {
      trackCalculatorAdvancedOpened(kind);
      trackCalculatorQuoteClicked({ calculatorType: kind, unitSystem: 'metric', hasValidResult: false });
      trackCalculatorServiceLinkClicked({
        calculatorType: kind,
        href: '/services/foundation-excavation',
        destinationType: 'service',
      });

      vi.mocked(trackEvent).mock.calls.forEach(([, params]) => {
        Object.keys(params ?? {}).forEach((key) => {
          expect(ALLOWED_PARAM_KEYS).toContain(key);
        });
      });
    },
  );
});
