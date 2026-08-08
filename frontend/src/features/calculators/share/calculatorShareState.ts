import {
  createCalculatorFormInput,
  MAX_CALCULATOR_AREAS,
  type CalculatorConfig,
} from '../config/calculators';
import type {
  CalculatorAreaFormInput,
  CalculatorDimensionBehavior,
  CalculatorDimensionFormInput,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorKind,
  MetricDimensionUnit,
} from '../types/calculator';

const CALCULATOR_SHARE_VERSION = 1;
const SHARE_PARAM = 'estimate';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readEditableNumber(
  value: unknown,
  fallback: CalculatorEditableNumber,
): CalculatorEditableNumber | null {
  if (value === '') return '';
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? value
    : fallback === value
      ? fallback
      : null;
}

function readDimension(
  value: unknown,
  behavior: CalculatorDimensionBehavior,
): CalculatorDimensionFormInput | null {
  if (!isRecord(value)) return null;

  const metricValue = readEditableNumber(value.metricValue, '');
  const feet = readEditableNumber(value.feet, '');
  const inches = readEditableNumber(value.inches, '');
  const metricUnit = value.metricUnit;

  if (
    metricValue === null ||
    feet === null ||
    inches === null ||
    typeof metricUnit !== 'string' ||
    !behavior.metricUnits.includes(metricUnit as MetricDimensionUnit)
  ) {
    return null;
  }

  return {
    metricValue,
    metricUnit: metricUnit as MetricDimensionUnit,
    feet,
    inches,
  };
}

function readArea(
  value: unknown,
  config: CalculatorConfig,
): CalculatorAreaFormInput | null {
  if (!isRecord(value)) return null;

  const length = readDimension(value.length, config.dimensionBehavior.length);
  const width = readDimension(value.width, config.dimensionBehavior.width);
  const depth = readDimension(value.depth, config.dimensionBehavior.depth);

  return length && width && depth ? { length, width, depth } : null;
}

function sanitizeSharedInput(
  value: unknown,
  config: CalculatorConfig,
): CalculatorFormInput | null {
  if (!isRecord(value)) return null;

  const defaults = createCalculatorFormInput(config);
  const primaryArea = readArea(value, config);
  const rawAdditionalAreas = value.additionalAreas;

  if (
    !primaryArea ||
    !Array.isArray(rawAdditionalAreas) ||
    rawAdditionalAreas.length >= MAX_CALCULATOR_AREAS
  ) {
    return null;
  }

  const additionalAreas = rawAdditionalAreas.map((area) => readArea(area, config));
  if (additionalAreas.some((area) => area === null)) return null;

  const inputUnitSystem = value.inputUnitSystem;
  const outputUnitPreference = value.outputUnitPreference;
  const materialId = value.materialId;
  const moistureLevel = value.moistureLevel;
  const priceMode = value.priceMode;
  const useAdvanced = value.useAdvanced;
  const isHalfLoad = value.isHalfLoad;

  if (
    (inputUnitSystem !== 'metric' && inputUnitSystem !== 'imperial') ||
    !config.resultDisplay.options.includes(
      outputUnitPreference as CalculatorFormInput['outputUnitPreference'],
    ) ||
    typeof materialId !== 'string' ||
    !config.allowedMaterialIds.includes(materialId as CalculatorFormInput['materialId']) ||
    (moistureLevel !== 'dry' && moistureLevel !== 'normal' && moistureLevel !== 'wet') ||
    (priceMode !== '' && priceMode !== 'load' && priceMode !== 'volume') ||
    typeof useAdvanced !== 'boolean' ||
    typeof isHalfLoad !== 'boolean'
  ) {
    return null;
  }

  const swellFactor = readEditableNumber(value.swellFactor, defaults.swellFactor);
  const wetMaterialPercentage = readEditableNumber(
    value.wetMaterialPercentage,
    defaults.wetMaterialPercentage,
  );
  const compactionPercentage = readEditableNumber(
    value.compactionPercentage,
    defaults.compactionPercentage,
  );
  const truckCapacityTons = readEditableNumber(
    value.truckCapacityTons,
    defaults.truckCapacityTons,
  );
  const pricePerUnit = readEditableNumber(value.pricePerUnit, '');

  if (
    swellFactor === null ||
    wetMaterialPercentage === null ||
    compactionPercentage === null ||
    truckCapacityTons === null ||
    pricePerUnit === null
  ) {
    return null;
  }

  return {
    ...defaults,
    ...primaryArea,
    additionalAreas: additionalAreas as CalculatorAreaFormInput[],
    inputUnitSystem,
    outputUnitPreference: outputUnitPreference as CalculatorFormInput['outputUnitPreference'],
    materialId: materialId as CalculatorFormInput['materialId'],
    moistureLevel,
    priceMode,
    pricePerUnit,
    useAdvanced,
    swellFactor,
    wetMaterialPercentage,
    compactionPercentage,
    isHalfLoad,
    truckCapacityTons,
  };
}

function encodeBase64Url(value: string): string {
  return globalThis
    .btoa(value)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
  return globalThis.atob(normalized + padding);
}

export function buildCalculatorShareUrl(
  currentUrl: string,
  kind: CalculatorKind,
  input: CalculatorFormInput,
): string {
  const payload = encodeBase64Url(
    JSON.stringify({ version: CALCULATOR_SHARE_VERSION, kind, input }),
  );
  const url = new URL(currentUrl);
  url.hash = `${SHARE_PARAM}=${payload}`;
  return url.toString();
}

export function readCalculatorShareHash(
  hash: string,
  kind: CalculatorKind,
  config: CalculatorConfig,
): CalculatorFormInput | null {
  try {
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const token = params.get(SHARE_PARAM);
    if (!token || token.length > 20_000) return null;

    const parsed: unknown = JSON.parse(decodeBase64Url(token));
    if (!isRecord(parsed)) return null;

    if (
      parsed.version !== CALCULATOR_SHARE_VERSION ||
      parsed.kind !== kind
    ) {
      return null;
    }

    return sanitizeSharedInput(parsed.input, config);
  } catch {
    return null;
  }
}
