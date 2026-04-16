'use client';

import { useExcavationCalculatorKindBehavior } from './kindBehavior/useExcavationCalculatorKindBehavior';
import { useDefaultCalculatorKindBehavior } from './kindBehavior/useDefaultCalculatorKindBehavior';
import type { CalculatorKind } from '../types/calculator';
import type { CalculatorKindBehavior, CalculatorKindBehaviorParams } from './calculatorController.types';

export function useCalculatorKindBehavior(
  kind: CalculatorKind,
  params: CalculatorKindBehaviorParams,
): CalculatorKindBehavior {
  const excavationBehavior = useExcavationCalculatorKindBehavior(params);
  const defaultBehavior = useDefaultCalculatorKindBehavior(params);

  switch (kind) {
    case 'excavation':
      return excavationBehavior;
    default:
      return defaultBehavior;
  }
}
