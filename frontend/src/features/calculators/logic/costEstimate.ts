import { m3ToCubicYards } from './conversions';
import type {
  CalculatorEditableNumber,
  CalculatorPriceMode,
  CalculatorResult,
  UnitSystem,
} from '../types/calculator';

export type CalculatorCostEstimate = {
  mode: Exclude<CalculatorPriceMode, ''>;
  rate: number;
  quantity: number;
  quantityLabel: string;
  total: number;
};

export function buildCalculatorCostEstimate(
  result: CalculatorResult,
  mode: CalculatorPriceMode,
  rate: CalculatorEditableNumber,
  inputUnitSystem: UnitSystem,
): CalculatorCostEstimate | null {
  if (mode === '' || rate === '' || !Number.isFinite(rate) || rate <= 0) {
    return null;
  }

  if (mode === 'load') {
    const quantity = Math.ceil(result.estimatedTruckLoads * 2) / 2;

    return {
      mode,
      rate,
      quantity,
      quantityLabel: quantity === 1 ? 'load' : 'loads',
      total: rate * quantity,
    };
  }

  const quantity =
    inputUnitSystem === 'imperial'
      ? m3ToCubicYards(result.adjustedMaterialVolumeM3)
      : result.adjustedMaterialVolumeM3;

  return {
    mode,
    rate,
    quantity,
    quantityLabel: inputUnitSystem === 'imperial' ? 'yd3' : 'm3',
    total: rate * quantity,
  };
}
