import type { CalculatorInput } from '../types/calculator';
import type { CalculatorCalculationInput } from './calculator';

export function normalizeCalculatorInput(
  input: CalculatorInput,
): CalculatorCalculationInput | null {
  if (
    input.length === '' ||
    input.width === '' ||
    input.depth === '' ||
    input.length <= 0 ||
    input.width <= 0 ||
    input.depth <= 0
  ) {
    return null;
  }

  return {
    length: input.length,
    width: input.width,
    depth: input.depth,
    unitSystem: input.unitSystem,
    materialId: input.materialId,
    useAdvanced: input.useAdvanced,
    swellFactor: input.swellFactor === '' ? undefined : input.swellFactor,
    compactionFactor:
      input.compactionFactor === '' ? undefined : input.compactionFactor,
    isWet: input.isWet,
    truckCapacityTons:
      input.truckCapacityTons === '' ? undefined : input.truckCapacityTons,
  };
}
