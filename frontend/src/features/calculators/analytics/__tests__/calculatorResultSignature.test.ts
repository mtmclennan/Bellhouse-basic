import { describe, expect, it } from 'vitest';
import type { CalculatorCalculationInput } from '../../types/calculator';
import { buildCalculatorResultSignature } from '../calculatorResultSignature';

function baseInput(
  overrides: Partial<CalculatorCalculationInput> = {},
): CalculatorCalculationInput {
  return {
    lengthM: 10,
    widthM: 5,
    depthM: 2,
    materialId: 'native-soil',
    useAdvanced: false,
    workflowKind: 'swell-based',
    swellFactor: 1.2,
    isHalfLoad: false,
    truckCapacityTons: 21.5,
    ...overrides,
  };
}

describe('buildCalculatorResultSignature', () => {
  it('is identical for identical inputs', () => {
    expect(buildCalculatorResultSignature('excavation', baseInput())).toBe(
      buildCalculatorResultSignature('excavation', baseInput()),
    );
  });

  it('changes when a dimension changes', () => {
    expect(buildCalculatorResultSignature('excavation', baseInput())).not.toBe(
      buildCalculatorResultSignature('excavation', baseInput({ lengthM: 11 })),
    );
  });

  it('changes when an additional area changes', () => {
    const first = baseInput({
      additionalAreas: [{ lengthM: 2, widthM: 2, depthM: 1 }],
    });
    const second = baseInput({
      additionalAreas: [{ lengthM: 3, widthM: 2, depthM: 1 }],
    });

    expect(buildCalculatorResultSignature('excavation', first)).not.toBe(
      buildCalculatorResultSignature('excavation', second),
    );
  });

  it('changes when material changes', () => {
    expect(buildCalculatorResultSignature('excavation', baseInput())).not.toBe(
      buildCalculatorResultSignature('excavation', baseInput({ materialId: 'clay' })),
    );
  });

  it('changes when advanced settings change', () => {
    expect(buildCalculatorResultSignature('excavation', baseInput())).not.toBe(
      buildCalculatorResultSignature(
        'excavation',
        baseInput({ useAdvanced: true, isHalfLoad: true }),
      ),
    );
  });

  it('changes when calculator kind changes for an otherwise-identical input', () => {
    expect(buildCalculatorResultSignature('excavation', baseInput())).not.toBe(
      buildCalculatorResultSignature('gravel', baseInput()),
    );
  });
});
