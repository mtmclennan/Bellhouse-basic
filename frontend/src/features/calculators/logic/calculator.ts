import type {
  CalculatorCalculationInput,
  CalculatorResult,
  CalculatorKind,
  Material,
  MoistureLevel,
} from '../types/calculator';

const DEFAULT_TRUCK_CAPACITY_TONS = 21.5;
const HALF_LOAD_CAPACITY_MULTIPLIER = 0.5;
const WET_MOISTURE_BONUS_PERCENTAGE = 5;

function percentageToMultiplier(percentage?: number) {
  if (percentage === undefined) {
    return 1;
  }

  return 1 + percentage / 100;
}

function roundPercentage(value: number) {
  return Math.round(value * 10) / 10;
}

export function getMoistureLevelLabel(level: MoistureLevel) {
  switch (level) {
    case 'dry':
      return 'Dry';
    case 'wet':
      return 'Wet';
    default:
      return 'Normal';
  }
}

export function resolveMoistureLevelPercentage(
  level: MoistureLevel,
  material: Material,
) {
  const normalPercentage = material.defaultWetMaterialPercentage ?? 0;

  if (level === 'dry') {
    return 0;
  }

  if (level === 'wet') {
    return roundPercentage(
      Math.max(
        normalPercentage + WET_MOISTURE_BONUS_PERCENTAGE,
        normalPercentage * 1.5,
      ),
    );
  }

  return normalPercentage;
}

export function getMaterialDefaultAssumptions(
  kind: CalculatorKind,
  material: Material,
  defaultTruckPayloadTons: number,
) {
  const moistureLevel = material.defaultMoistureLevel ?? 'normal';

  return {
    swellFactor: material.defaultSwellFactor ?? 1,
    moistureLevel,
    wetMaterialPercentage:
      kind === 'excavation'
        ? resolveMoistureLevelPercentage(moistureLevel, material)
        : material.defaultWetMaterialPercentage ?? 0,
    compactionPercentage: material.defaultCompactionPercentage ?? 0,
    truckCapacityTons: defaultTruckPayloadTons,
    isHalfLoad: false,
  };
}

export function resolveActiveSwellFactor(
  input: CalculatorCalculationInput,
  material: Material,
) {
  if (input.workflowKind === 'compaction-based') {
    return 1;
  }

  return input.swellFactor ?? material.defaultSwellFactor ?? 1;
}

export function resolveActiveWetMaterialPercentage(
  input: CalculatorCalculationInput,
  material: Material,
) {
  if (input.wetMaterialPercentage !== undefined) {
    return input.wetMaterialPercentage;
  }

  if (!input.useAdvanced) {
    return undefined;
  }

  return material.defaultWetMaterialPercentage;
}

export function resolveActiveCompactionPercentage(
  input: CalculatorCalculationInput,
  material: Material,
) {
  if (input.workflowKind === 'swell-based') {
    return undefined;
  }

  if (input.workflowKind === 'compaction-based') {
    return input.compactionPercentage ?? material.defaultCompactionPercentage;
  }

  if (!input.useAdvanced) {
    return undefined;
  }

  return input.compactionPercentage ?? material.defaultCompactionPercentage;
}

export function resolveActiveTruckPayloadTons(
  input: CalculatorCalculationInput,
) {
  const enteredTruckCapacityTons =
    input.truckCapacityTons && input.truckCapacityTons > 0
      ? input.truckCapacityTons
      : DEFAULT_TRUCK_CAPACITY_TONS;

  return input.useAdvanced && input.isHalfLoad
    ? enteredTruckCapacityTons * HALF_LOAD_CAPACITY_MULTIPLIER
    : enteredTruckCapacityTons;
}

export function calculateProjectMaterial(
  input: CalculatorCalculationInput,
  material: Material,
): CalculatorResult {
  // Start from in-place dimensions, then let the calculator workflow decide
  // whether this job behaves like excavation swell, compacted placement,
  // or a combined adjusted-material workflow.
  const primaryAreaVolumeM3 = input.lengthM * input.widthM * input.depthM;
  const additionalAreaVolumeM3 = (input.additionalAreas ?? []).reduce(
    (total, area) => total + area.lengthM * area.widthM * area.depthM,
    0,
  );
  const rawProjectVolumeM3 = primaryAreaVolumeM3 + additionalAreaVolumeM3;

  const swellFactor = resolveActiveSwellFactor(input, material);
  const compactionPercentage = resolveActiveCompactionPercentage(input, material);
  const compactionMultiplier = percentageToMultiplier(compactionPercentage);

  let adjustedLooseMaterialVolumeM3 = rawProjectVolumeM3;
  let adjustedMaterialVolumeM3 = rawProjectVolumeM3;

  switch (input.workflowKind) {
    case 'swell-based':
      adjustedLooseMaterialVolumeM3 = rawProjectVolumeM3 * swellFactor;
      adjustedMaterialVolumeM3 = adjustedLooseMaterialVolumeM3;
      break;
    case 'compaction-based':
      adjustedLooseMaterialVolumeM3 = rawProjectVolumeM3;
      adjustedMaterialVolumeM3 = input.useAdvanced
        ? rawProjectVolumeM3 * compactionMultiplier
        : rawProjectVolumeM3;
      break;
    case 'swell-then-compaction':
    default:
      adjustedLooseMaterialVolumeM3 = rawProjectVolumeM3 * swellFactor;
      adjustedMaterialVolumeM3 = input.useAdvanced
        ? adjustedLooseMaterialVolumeM3 * compactionMultiplier
        : adjustedLooseMaterialVolumeM3;
      break;
  }

  const wetMaterialPercentage = resolveActiveWetMaterialPercentage(input, material);
  const wetMaterialMultiplier = percentageToMultiplier(wetMaterialPercentage);

  const adjustedWeightTons =
    adjustedMaterialVolumeM3 * material.densityTonsPerM3 * wetMaterialMultiplier;

  const activeTruckPayloadTons = resolveActiveTruckPayloadTons(input);

  const estimatedTruckLoads = adjustedWeightTons / activeTruckPayloadTons;

  return {
    rawProjectVolumeM3,
    adjustedLooseMaterialVolumeM3,
    adjustedMaterialVolumeM3,
    adjustedWeightTons,
    estimatedTruckLoads,
  };
}
