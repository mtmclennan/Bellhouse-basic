'use client';

import { useDefaultCalculatorKindBehavior } from './useDefaultCalculatorKindBehavior';
import type { CalculatorKindBehavior, CalculatorKindBehaviorParams } from '../calculatorController.types';

export function useGravelCalculatorKindBehavior(
  params: CalculatorKindBehaviorParams,
): CalculatorKindBehavior {
  return useDefaultCalculatorKindBehavior(params);
}
