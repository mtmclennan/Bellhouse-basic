'use client';

import { useExcavationCalculatorKindBehavior } from './kindBehavior/useExcavationCalculatorKindBehavior';
import { useGravelCalculatorKindBehavior } from './kindBehavior/useGravelCalculatorKindBehavior';
import { useTopsoilCalculatorKindBehavior } from './kindBehavior/useTopsoilCalculatorKindBehavior';
import type { CalculatorKind } from '../types/calculator';
import type { CalculatorKindBehavior, CalculatorKindBehaviorParams } from './calculatorController.types';

export function useCalculatorKindBehavior(
  kind: CalculatorKind,
  params: CalculatorKindBehaviorParams,
): CalculatorKindBehavior {
  const excavationBehavior = useExcavationCalculatorKindBehavior(params);
  const gravelBehavior = useGravelCalculatorKindBehavior(params);
  const topsoilBehavior = useTopsoilCalculatorKindBehavior(params);

  switch (kind) {
    case 'excavation':
      return excavationBehavior;
    case 'gravel':
      return gravelBehavior;
    case 'topsoil':
      return topsoilBehavior;
    default:
      return gravelBehavior;
  }
}
