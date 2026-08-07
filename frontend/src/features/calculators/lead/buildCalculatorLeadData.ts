import type { CalculatorConfig } from '../config/calculators';
import { m3ToCubicYards, tonnesToShortTons } from '../logic/conversions';
import { formatNumber, formatTruckLoads } from '../utils/format';
import type {
  CalculatorDimensionBehavior,
  CalculatorDimensionFormInput,
  CalculatorFormInput,
  CalculatorKind,
  CalculatorResult,
  Material,
  OutputUnitPreference,
  UnitSystem,
} from '../types/calculator';
import { CALCULATOR_LEAD_VERSION, type CalculatorLeadData } from './calculatorLead.types';

export type BuildCalculatorLeadDataParams = {
  kind: CalculatorKind;
  config: CalculatorConfig;
  input: CalculatorFormInput;
  material: Material;
  result: CalculatorResult;
  assumptionsSummary?: string | null;
  now?: number;
};

function formatDimensionValue(
  value: CalculatorDimensionFormInput,
  unitSystem: UnitSystem,
  behavior: CalculatorDimensionBehavior,
): string {
  if (unitSystem === 'metric') {
    return `${value.metricValue} ${value.metricUnit}`;
  }

  if (behavior.imperialMode === 'inches') {
    return `${value.inches} in`;
  }

  const feet = typeof value.feet === 'number' ? value.feet : 0;
  const inches = typeof value.inches === 'number' ? value.inches : 0;

  if (feet > 0 && inches > 0) {
    return `${feet} ft ${inches} in`;
  }

  if (feet > 0) {
    return `${feet} ft`;
  }

  return `${inches} in`;
}

function formatVolumeText(cubicMetres: number, outputUnitPreference: OutputUnitPreference): string {
  if (outputUnitPreference === 'imperial') {
    return `${formatNumber(m3ToCubicYards(cubicMetres))} yd³`;
  }

  return `${formatNumber(cubicMetres)} m³`;
}

function formatWeightText(metricTonnes: number, outputUnitPreference: OutputUnitPreference): string {
  if (outputUnitPreference === 'imperial') {
    return `${formatNumber(tonnesToShortTons(metricTonnes), 1)} short tons`;
  }

  return `${formatNumber(metricTonnes, 1)} metric tonnes`;
}

/**
 * Builds the contact-form handoff payload for any calculator kind from the
 * same config/labels the results panel already renders — no per-kind
 * branching, so adding a fourth calculator needs no changes here.
 */
export function buildCalculatorLeadData({
  kind,
  config,
  input,
  material,
  result,
  assumptionsSummary,
  now = Date.now(),
}: BuildCalculatorLeadDataParams): CalculatorLeadData {
  const { outputUnitPreference, inputUnitSystem } = input;
  const { resultPresentation, dimensionBehavior, labels } = config;

  const dimensionDisplay = {
    length: formatDimensionValue(input.length, inputUnitSystem, dimensionBehavior.length),
    width: formatDimensionValue(input.width, inputUnitSystem, dimensionBehavior.width),
    depth: formatDimensionValue(input.depth, inputUnitSystem, dimensionBehavior.depth),
  };

  const inputs: Record<string, string> = {
    [labels.dimensions.length]: dimensionDisplay.length,
    [labels.dimensions.width]: dimensionDisplay.width,
    [labels.dimensions.depth]: dimensionDisplay.depth,
    [labels.material]: material.name,
  };

  if (assumptionsSummary) {
    inputs.Assumptions = assumptionsSummary;
  }

  const results: Record<string, string> = {
    [resultPresentation.volumeLabel]: formatVolumeText(
      result[resultPresentation.volumeValueSource],
      outputUnitPreference,
    ),
  };

  if (resultPresentation.adjustedVolumeLabel && resultPresentation.adjustedVolumeValueSource) {
    results[resultPresentation.adjustedVolumeLabel] = formatVolumeText(
      result[resultPresentation.adjustedVolumeValueSource],
      outputUnitPreference,
    );
  }

  if (resultPresentation.secondaryVolumeLabel && resultPresentation.secondaryVolumeValueSource) {
    results[resultPresentation.secondaryVolumeLabel] = formatVolumeText(
      result[resultPresentation.secondaryVolumeValueSource],
      outputUnitPreference,
    );
  }

  results[resultPresentation.weightLabel] = formatWeightText(
    result.adjustedWeightTons,
    outputUnitPreference,
  );
  results[resultPresentation.truckLoadsLabel] = formatTruckLoads(result.estimatedTruckLoads);

  const dimensionsLine = `${dimensionDisplay.length} × ${dimensionDisplay.width} × ${dimensionDisplay.depth}`;

  const messageLines = [
    `I used the Bellhouse ${kind} calculator.`,
    '',
    `Dimensions: ${dimensionsLine}`,
    `Material: ${material.name}`,
    ...Object.entries(results).map(([label, value]) => `${label}: ${value}`),
    '',
    'Project location:',
    'Preferred timeline:',
    'Additional project details:',
  ];

  return {
    version: CALCULATOR_LEAD_VERSION,
    calculatorType: kind,
    createdAt: now,
    inputs,
    results,
    message: messageLines.join('\n'),
  };
}
