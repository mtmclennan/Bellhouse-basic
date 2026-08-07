import type { CalculatorKind, UnitSystem } from '../types/calculator';
import { CALCULATOR_ANALYTICS_EVENTS, type CalculatorDestinationType } from './calculatorAnalyticsEvents';
import { extractCalculatorLinkSlug } from './calculatorLinkSlug';
import { trackCalculatorEvent } from './trackCalculatorEvent';

/** Fires when the advanced-options section transitions from closed to open. */
export function trackCalculatorAdvancedOpened(calculatorType: CalculatorKind): void {
  trackCalculatorEvent(CALCULATOR_ANALYTICS_EVENTS.advancedOpened, {
    calculator_type: calculatorType,
  });
}

type TrackCalculatorQuoteClickedParams = {
  calculatorType: CalculatorKind;
  unitSystem: UnitSystem;
  hasValidResult: boolean;
};

/** Fires when a calculator-specific quote CTA is clicked. */
export function trackCalculatorQuoteClicked({
  calculatorType,
  unitSystem,
  hasValidResult,
}: TrackCalculatorQuoteClickedParams): void {
  trackCalculatorEvent(CALCULATOR_ANALYTICS_EVENTS.quoteClicked, {
    calculator_type: calculatorType,
    unit_system: unitSystem,
    has_valid_result: hasValidResult,
  });
}

type TrackCalculatorServiceLinkClickedParams = {
  calculatorType: CalculatorKind;
  href: string;
  destinationType: CalculatorDestinationType;
};

/** Fires when a related Bellhouse service/tool link is clicked from a calculator page. */
export function trackCalculatorServiceLinkClicked({
  calculatorType,
  href,
  destinationType,
}: TrackCalculatorServiceLinkClickedParams): void {
  trackCalculatorEvent(CALCULATOR_ANALYTICS_EVENTS.serviceLinkClicked, {
    calculator_type: calculatorType,
    service_slug: extractCalculatorLinkSlug(href),
    destination_type: destinationType,
  });
}
