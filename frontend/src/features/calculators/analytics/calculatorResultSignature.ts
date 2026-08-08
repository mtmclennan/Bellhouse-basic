import type { CalculatorCalculationInput, CalculatorKind } from '../types/calculator';

/**
 * Builds a stable, non-personal signature that changes if and only if the
 * calculated result would change. Used only to decide whether a NEW
 * calculator_completed event is warranted — this string is never sent to
 * GA4 and never leaves this module.
 */
export function buildCalculatorResultSignature(
  kind: CalculatorKind,
  normalizedInput: CalculatorCalculationInput,
): string {
  return [
    kind,
    normalizedInput.lengthM,
    normalizedInput.widthM,
    normalizedInput.depthM,
    (normalizedInput.additionalAreas ?? [])
      .map((area) => `${area.lengthM},${area.widthM},${area.depthM}`)
      .join(';'),
    normalizedInput.materialId,
    normalizedInput.useAdvanced,
    normalizedInput.workflowKind,
    normalizedInput.swellFactor ?? '',
    normalizedInput.wetMaterialPercentage ?? '',
    normalizedInput.compactionPercentage ?? '',
    normalizedInput.isHalfLoad,
    normalizedInput.truckCapacityTons ?? '',
  ].join('|');
}
