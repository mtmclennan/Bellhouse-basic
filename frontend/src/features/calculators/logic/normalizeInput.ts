import type {
  CalculatorCalculationInput,
  CalculatorDimensionBehavior,
  CalculatorDimensionFormInput,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorDimensionKey,
} from '../types/calculator';
import {
  feetAndInchesToMeters,
  inchesToMeters,
  metricDimensionToMeters,
} from './conversions';

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
  dimensionBehavior: Record<CalculatorDimensionKey, CalculatorDimensionBehavior>,
): CalculatorCalculationInput | null {
  const lengthM = normalizeDimensionInput(
    input.length,
    input.inputUnitSystem,
    dimensionBehavior.length,
  );
  const widthM = normalizeDimensionInput(
    input.width,
    input.inputUnitSystem,
    dimensionBehavior.width,
  );
  const depthM = normalizeDimensionInput(
    input.depth,
    input.inputUnitSystem,
    dimensionBehavior.depth,
  );

  if (lengthM === null || widthM === null || depthM === null) {
    return null;
  }

  if (!input.useAdvanced) {
    return {
      lengthM,
      widthM,
      depthM,
      materialId: input.materialId,
      useAdvanced: false,
      isHalfLoad: false,
    };
  }

  const swellFactor = normalizeOptionalPositiveNumber(input.swellFactor);
  const wetMaterialPercentage = normalizeOptionalNonNegativeNumber(
    input.wetMaterialPercentage,
  );
  const compactionPercentage = normalizeOptionalNonNegativeNumber(
    input.compactionPercentage,
  );
  const truckCapacityTons = normalizeOptionalPositiveNumber(input.truckCapacityTons);

  if (
    swellFactor === null ||
    wetMaterialPercentage === null ||
    compactionPercentage === null ||
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
    swellFactor,
    wetMaterialPercentage,
    compactionPercentage,
    isHalfLoad: input.isHalfLoad,
    truckCapacityTons,
  };
}
