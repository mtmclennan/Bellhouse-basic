import type {
  CalculatorCalculationInput,
  Material,
  CalculatorDimensionBehavior,
  CalculatorDimensionFormInput,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorDimensionKey,
} from '../types/calculator';
import type { CalculatorConfig } from '../config/calculators';
import {
  feetAndInchesToMeters,
  inchesToMeters,
  metricDimensionToMeters,
} from './conversions';
import { resolveMoistureLevelPercentage } from './calculator';

function normalizeRequiredPositiveNumber(
  value: CalculatorEditableNumber,
): number | null {
  if (value === '' || !Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value;
}

function normalizeOptionalPositiveNumber(
  value: CalculatorEditableNumber,
): number | undefined | null {
  if (value === '') {
    return undefined;
  }

  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value;
}

function normalizeOptionalNonNegativeNumber(
  value: CalculatorEditableNumber,
): number | undefined | null {
  if (value === '') {
    return undefined;
  }

  if (!Number.isFinite(value) || value < 0) {
    return null;
  }

  return value;
}

function normalizeRequiredMetricDimension(
  input: CalculatorDimensionFormInput,
  behavior: CalculatorDimensionBehavior,
): number | null {
  if (!behavior.metricUnits.includes(input.metricUnit)) {
    return null;
  }

  const value = normalizeRequiredPositiveNumber(input.metricValue);
  if (value === null) {
    return null;
  }

  return metricDimensionToMeters(value, input.metricUnit);
}

function normalizeFeetAndInchesDimension(
  input: CalculatorDimensionFormInput,
): number | null {
  const feet = normalizeOptionalNonNegativeNumber(input.feet);
  const inches = normalizeOptionalNonNegativeNumber(input.inches);

  if (feet === null || inches === null) {
    return null;
  }

  const totalFeet = feet ?? 0;
  const totalInches = inches ?? 0;

  if (totalFeet <= 0 && totalInches <= 0) {
    return null;
  }

  return feetAndInchesToMeters(totalFeet, totalInches);
}

function normalizeInchesDimension(
  input: CalculatorDimensionFormInput,
): number | null {
  const inches = normalizeRequiredPositiveNumber(input.inches);

  if (inches === null) {
    return null;
  }

  return inchesToMeters(inches);
}

function normalizeDimensionInput(
  input: CalculatorDimensionFormInput,
  unitSystem: CalculatorFormInput['inputUnitSystem'],
  behavior: CalculatorDimensionBehavior,
): number | null {
  if (unitSystem === 'metric') {
    return normalizeRequiredMetricDimension(input, behavior);
  }

  if (behavior.imperialMode === 'inches') {
    return normalizeInchesDimension(input);
  }

  return normalizeFeetAndInchesDimension(input);
}

export function normalizeCalculatorInput(
  input: CalculatorFormInput,
  config: Pick<
    CalculatorConfig,
    'advancedSettings' | 'dimensionBehavior' | 'workflow'
  >,
  material?: Material,
): CalculatorCalculationInput | null {
  const lengthM = normalizeDimensionInput(
    input.length,
    input.inputUnitSystem,
    config.dimensionBehavior.length,
  );
  const widthM = normalizeDimensionInput(
    input.width,
    input.inputUnitSystem,
    config.dimensionBehavior.width,
  );
  const depthM = normalizeDimensionInput(
    input.depth,
    input.inputUnitSystem,
    config.dimensionBehavior.depth,
  );

  if (lengthM === null || widthM === null || depthM === null) {
    return null;
  }

  if (!input.useAdvanced) {
    const swellFactor = normalizeOptionalPositiveNumber(input.swellFactor);
    const truckCapacityTons = normalizeOptionalPositiveNumber(input.truckCapacityTons);

    if (swellFactor === null || truckCapacityTons === null) {
      return null;
    }

    return {
      lengthM,
      widthM,
      depthM,
      materialId: input.materialId,
      useAdvanced: false,
      workflowKind: config.workflow.kind,
      isHalfLoad: false,
      swellFactor,
      truckCapacityTons,
      wetMaterialPercentage:
        config.advancedSettings.moistureLevel && material
          ? resolveMoistureLevelPercentage(input.moistureLevel, material)
          : undefined,
    };
  }

  const swellFactor = normalizeOptionalPositiveNumber(input.swellFactor);
  const wetMaterialPercentage = config.advancedSettings.moistureLevel
    ? material
      ? resolveMoistureLevelPercentage(input.moistureLevel, material)
      : null
    : normalizeOptionalNonNegativeNumber(input.wetMaterialPercentage);
  const compactionPercentage = config.advancedSettings.compactionPercentage
    ? normalizeOptionalNonNegativeNumber(input.compactionPercentage)
    : undefined;
  const truckCapacityTons = normalizeOptionalPositiveNumber(input.truckCapacityTons);

  if (
    swellFactor === null ||
    wetMaterialPercentage === null ||
    (config.advancedSettings.compactionPercentage &&
      compactionPercentage === null) ||
    truckCapacityTons === null
  ) {
    return null;
  }

  return {
    lengthM,
    widthM,
    depthM,
    materialId: input.materialId,
    useAdvanced: input.useAdvanced,
    workflowKind: config.workflow.kind,
    swellFactor: swellFactor ?? undefined,
    wetMaterialPercentage: wetMaterialPercentage ?? undefined,
    compactionPercentage: compactionPercentage ?? undefined,
    isHalfLoad: input.isHalfLoad,
    truckCapacityTons: truckCapacityTons ?? undefined,
  };
}
