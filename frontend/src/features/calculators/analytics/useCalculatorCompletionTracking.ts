'use client';

import { useEffect, useRef } from 'react';
import type {
  CalculatorCalculationInput,
  CalculatorKind,
  MaterialId,
  UnitSystem,
} from '../types/calculator';
import { CALCULATOR_ANALYTICS_EVENTS, type CalculatorAnalyticsEventParams } from './calculatorAnalyticsEvents';
import { buildCalculatorResultSignature } from './calculatorResultSignature';
import { createCalculatorCompletionTracker } from './createCalculatorCompletionTracker';
import { trackCalculatorEvent } from './trackCalculatorEvent';

type UseCalculatorCompletionTrackingParams = {
  calculatorType: CalculatorKind;
  hasResult: boolean;
  normalizedInput: CalculatorCalculationInput | null;
  materialId: MaterialId | undefined;
  unitSystem: UnitSystem;
};

/**
 * Fires calculator_completed after the calculator produces a valid result,
 * debounced so it doesn't fire on every keystroke, and deduped so an
 * unchanged calculation never fires twice. No raw calculated values are
 * used anywhere in this hook — only a non-personal internal signature.
 */
export function useCalculatorCompletionTracking({
  calculatorType,
  hasResult,
  normalizedInput,
  materialId,
  unitSystem,
}: UseCalculatorCompletionTrackingParams): void {
  const trackerRef = useRef<ReturnType<
    typeof createCalculatorCompletionTracker<CalculatorAnalyticsEventParams['calculator_completed']>
  > | null>(null);

  if (!trackerRef.current) {
    trackerRef.current = createCalculatorCompletionTracker({
      onFire: (params) => trackCalculatorEvent(CALCULATOR_ANALYTICS_EVENTS.completed, params),
    });
  }

  useEffect(() => {
    return () => {
      trackerRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!hasResult || !normalizedInput || !materialId) {
      return;
    }

    const signature = buildCalculatorResultSignature(calculatorType, normalizedInput);

    trackerRef.current?.notifyResult(signature, {
      calculator_type: calculatorType,
      unit_system: unitSystem,
      material_type: materialId,
    });
  }, [calculatorType, hasResult, normalizedInput, materialId, unitSystem]);
}
