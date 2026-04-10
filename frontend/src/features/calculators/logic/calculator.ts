import { dimensionsToMeters, m3ToCubicYards } from './conversions';
import type {
  CalculatorCalculationInput,
  CalculatorResult,
  Material,
} from '../types/calculator';

const DEFAULT_TRUCK_CAPACITY_TONS = 21.5;
const HALF_LOAD_CAPACITY_MULTIPLIER = 0.5;

function percentageToMultiplier(percentage?: number) {
  if (percentage === undefined) {
    return 1;
  }

  return 1 + percentage / 100;
}

export function calculateProjectMaterial(
  input: CalculatorCalculationInput,
  material: Material,
): CalculatorResult {
  const { lengthM, widthM, depthM } = dimensionsToMeters(
    input.length,
    input.width,
    input.depth,
    input.inputUnitSystem,
  );

  const baseVolumeM3 = lengthM * widthM * depthM;

  let adjustedVolumeM3 = baseVolumeM3;

  const swellFactor = input.swellFactor ?? material.defaultSwellFactor ?? 1;
  const compactionPercentage =
    input.compactionPercentage ?? material.defaultCompactionPercentage;
  const compactionMultiplier = percentageToMultiplier(compactionPercentage);

  if (input.useAdvanced) {
    adjustedVolumeM3 *= swellFactor;
    adjustedVolumeM3 *= compactionMultiplier;
  }

  const wetMaterialPercentage =
    input.wetMaterialPercentage ?? material.defaultWetMaterialPercentage;
  const wetMaterialMultiplier =
    input.useAdvanced ? percentageToMultiplier(wetMaterialPercentage) : 1;

  const tons =
    adjustedVolumeM3 * material.densityTonsPerM3 * wetMaterialMultiplier;

  const enteredTruckCapacityTons =
    input.useAdvanced && input.truckCapacityTons && input.truckCapacityTons > 0
      ? input.truckCapacityTons
      : DEFAULT_TRUCK_CAPACITY_TONS;

  const effectiveTruckCapacityTons =
    input.useAdvanced && input.isHalfLoad
      ? enteredTruckCapacityTons * HALF_LOAD_CAPACITY_MULTIPLIER
      : enteredTruckCapacityTons;

  const truckLoads = tons / effectiveTruckCapacityTons;

  return {
    baseVolumeM3,
    adjustedVolumeM3,
    tons,
    truckLoads,
    cubicYards: m3ToCubicYards(adjustedVolumeM3),
  };
}
