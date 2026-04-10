import type {
  CalculatorCalculationInput,
  CalculatorEditableNumber,
  CalculatorFormInput,
} from '../types/calculator';

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

export function normalizeCalculatorInput(
  input: CalculatorFormInput,
): CalculatorCalculationInput | null {
  const length = normalizeRequiredPositiveNumber(input.length);
  const width = normalizeRequiredPositiveNumber(input.width);
  const depth = normalizeRequiredPositiveNumber(input.depth);

  if (length === null || width === null || depth === null) {
    return null;
  }

  if (!input.useAdvanced) {
    return {
      length,
      width,
      depth,
      inputUnitSystem: input.inputUnitSystem,
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
    length,
    width,
    depth,
    inputUnitSystem: input.inputUnitSystem,
    materialId: input.materialId,
    useAdvanced: input.useAdvanced,
    swellFactor,
    wetMaterialPercentage,
    compactionPercentage,
    isHalfLoad: input.isHalfLoad,
    truckCapacityTons,
  };
}
