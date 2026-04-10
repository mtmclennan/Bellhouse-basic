import { dimensionsToMeters, m3ToCubicYards } from './conversions';
import type {
  CalculatorResult,
  Material,
  UnitSystem,
  MaterialId,
} from '../types/calculator';

const DEFAULT_TRUCK_CAPACITY_TONS = 21.5;

export type CalculatorCalculationInput = {
  length: number;
  width: number;
  depth: number;
  unitSystem: UnitSystem;
  materialId: MaterialId;
  useAdvanced: boolean;
  swellFactor?: number;
  compactionFactor?: number;
  isWet: boolean;
  truckCapacityTons?: number;
};

export function calculateProjectMaterial(
  input: CalculatorCalculationInput,
  material: Material,
): CalculatorResult {
  const { lengthM, widthM, depthM } = dimensionsToMeters(
    input.length,
    input.width,
    input.depth,
    input.unitSystem,
  );

  const baseVolumeM3 = lengthM * widthM * depthM;

  let adjustedVolumeM3 = baseVolumeM3;

  const swellFactor = input.swellFactor ?? material.defaultSwellFactor ?? 1;
  const compactionFactor =
    input.compactionFactor ?? material.defaultCompactionFactor ?? 1;

  if (input.useAdvanced) {
    adjustedVolumeM3 *= swellFactor;
    adjustedVolumeM3 *= compactionFactor;
  }

  const wetMultiplier =
    input.useAdvanced && input.isWet ? (material.wetDensityMultiplier ?? 1) : 1;

  const tons = adjustedVolumeM3 * material.densityTonsPerM3 * wetMultiplier;

  const truckCapacityTons =
    input.truckCapacityTons && input.truckCapacityTons > 0
      ? input.truckCapacityTons
      : DEFAULT_TRUCK_CAPACITY_TONS;

  const truckLoads = tons / truckCapacityTons;

  return {
    baseVolumeM3,
    adjustedVolumeM3,
    tons,
    truckLoads,
    cubicYards: m3ToCubicYards(adjustedVolumeM3),
  };
}
