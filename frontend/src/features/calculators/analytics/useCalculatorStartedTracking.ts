'use client';

import { useRef } from 'react';
import type { CalculatorKind } from '../types/calculator';
import { CALCULATOR_ANALYTICS_EVENTS } from './calculatorAnalyticsEvents';
import { trackCalculatorEvent } from './trackCalculatorEvent';

/**
 * Returns a `markStarted` callback that fires calculator_started at most
 * once per component mount (i.e. once per calculator page session), and
 * only when explicitly called — never from the initial render or default
 * values, since it's wired to actual user-input mutations, not to render.
 */
export function useCalculatorStartedTracking(calculatorType: CalculatorKind) {
  const hasStartedRef = useRef(false);

  function markStarted() {
    if (hasStartedRef.current) {
      return;
    }

    hasStartedRef.current = true;
    trackCalculatorEvent(CALCULATOR_ANALYTICS_EVENTS.started, {
      calculator_type: calculatorType,
    });
  }

  return { markStarted };
}
