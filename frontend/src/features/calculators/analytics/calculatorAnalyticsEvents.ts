import type { CalculatorKind, MaterialId, UnitSystem } from '../types/calculator';

export type CalculatorDestinationType = 'service' | 'calculator';

/**
 * Single source of truth for calculator event names and their parameter
 * shapes. Components never reference a raw event-name string — they go
 * through the typed action helpers in calculatorAnalyticsActions.ts.
 *
 * Coexistence with the sitewide delegated click tracker (TrackingClickEvents):
 * that tracker fires a generic `service_cta_click` for ANY link to /contact
 * anywhere on the site, with no calculator context. `calculator_quote_clicked`
 * below is calculator-specific (fires only from the calculator results CTA)
 * and carries calculator_type/unit_system/has_valid_result, enabling a
 * calculator-only funnel the generic event can't provide. Both events will
 * fire on the same click — that's intentional, not a bug, and each serves a
 * different report (sitewide CTA volume vs. calculator funnel completion).
 */
export const CALCULATOR_ANALYTICS_EVENTS = {
  started: 'calculator_started',
  completed: 'calculator_completed',
  advancedOpened: 'calculator_advanced_opened',
  quoteClicked: 'calculator_quote_clicked',
  serviceLinkClicked: 'calculator_service_link_clicked',
} as const;

export type CalculatorAnalyticsEventName =
  (typeof CALCULATOR_ANALYTICS_EVENTS)[keyof typeof CALCULATOR_ANALYTICS_EVENTS];

export type CalculatorAnalyticsEventParams = {
  [CALCULATOR_ANALYTICS_EVENTS.started]: {
    calculator_type: CalculatorKind;
  };
  [CALCULATOR_ANALYTICS_EVENTS.completed]: {
    calculator_type: CalculatorKind;
    unit_system: UnitSystem;
    material_type: MaterialId;
  };
  [CALCULATOR_ANALYTICS_EVENTS.advancedOpened]: {
    calculator_type: CalculatorKind;
  };
  [CALCULATOR_ANALYTICS_EVENTS.quoteClicked]: {
    calculator_type: CalculatorKind;
    unit_system: UnitSystem;
    has_valid_result: boolean;
  };
  [CALCULATOR_ANALYTICS_EVENTS.serviceLinkClicked]: {
    calculator_type: CalculatorKind;
    service_slug: string;
    destination_type: CalculatorDestinationType;
  };
};
