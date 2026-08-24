import { describe, expect, it } from 'vitest';
import { buildCalculatorCostEstimate } from '../costEstimate';
import type { CalculatorResult } from '../../types/calculator';

const result: CalculatorResult = {
  rawProjectVolumeM3: 10,
  adjustedLooseMaterialVolumeM3: 12,
  adjustedMaterialVolumeM3: 12,
  adjustedWeightTons: 24,
  estimatedTruckLoads: 6.1,
};

describe('buildCalculatorCostEstimate', () => {
  it('uses the displayed half-load increment for per-load pricing', () => {
    expect(buildCalculatorCostEstimate(result, 'load', 500, 'metric')).toEqual({
      mode: 'load',
      rate: 500,
      quantity: 6.5,
      quantityLabel: 'loads',
      total: 3250,
    });
  });

  it('uses adjusted material volume for per-volume pricing', () => {
    const estimate = buildCalculatorCostEstimate(result, 'volume', 20, 'metric');
    expect(estimate?.quantity).toBe(12);
    expect(estimate?.total).toBe(240);
  });

  it('stays inactive until both a positive price and mode are supplied', () => {
    expect(buildCalculatorCostEstimate(result, '', 500, 'metric')).toBeNull();
    expect(buildCalculatorCostEstimate(result, 'load', '', 'metric')).toBeNull();
  });
});
