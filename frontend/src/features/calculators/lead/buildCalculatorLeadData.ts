import type { CalculatorConfig } from '../config/calculators';
import { resolveOutputUnitPreference } from '../config/calculators';
import { m3ToCubicYards, tonnesToShortTons } from '../logic/conversions';
import { buildCalculatorCostEstimate } from '../logic/costEstimate';
import { formatNumber, formatTruckLoads } from '../utils/format';
import type {
  CalculatorAreaFormInput,
  CalculatorDimensionBehavior,
  CalculatorDimensionFormInput,
  CalculatorFormInput,
  CalculatorKind,
  CalculatorResult,
  Material,
  ResolvedOutputUnitPreference,
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

function isDimensionEntered(
  value: CalculatorDimensionFormInput,
  unitSystem: UnitSystem,
  behavior: CalculatorDimensionBehavior,
): boolean {
  if (unitSystem === 'metric') {
    return typeof value.metricValue === 'number' && value.metricValue > 0;
  }

  if (behavior.imperialMode === 'inches') {
    return typeof value.inches === 'number' && value.inches > 0;
  }

  const feet = typeof value.feet === 'number' ? value.feet : 0;
  const inches = typeof value.inches === 'number' ? value.inches : 0;
  return feet > 0 || inches > 0;
}

function isCompleteArea(
  area: CalculatorAreaFormInput,
  unitSystem: UnitSystem,
  dimensionBehavior: CalculatorConfig['dimensionBehavior'],
): boolean {
  return (['length', 'width', 'depth'] as const).every((dimension) =>
    isDimensionEntered(
      area[dimension],
      unitSystem,
      dimensionBehavior[dimension],
    ),
  );
}

function formatVolumeText(
  cubicMetres: number,
  outputUnitPreference: ResolvedOutputUnitPreference,
): string {
  if (outputUnitPreference === 'imperial') {
    return `${formatNumber(m3ToCubicYards(cubicMetres))} yd³`;
  }

  return `${formatNumber(cubicMetres)} m³`;
}

function formatWeightText(
  metricTonnes: number,
  outputUnitPreference: ResolvedOutputUnitPreference,
): string {
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
  const resolvedOutputUnitPreference = resolveOutputUnitPreference(
    outputUnitPreference,
    inputUnitSystem,
  );
  const { resultPresentation, dimensionBehavior, labels } = config;

  const formAreas: CalculatorAreaFormInput[] = [
    { length: input.length, width: input.width, depth: input.depth },
    ...input.additionalAreas,
  ];
  const areaDisplays = formAreas
    .filter((area) =>
      isCompleteArea(area, inputUnitSystem, dimensionBehavior),
    )
    .map((area) => {
      const display = {
        length: formatDimensionValue(
          area.length,
          inputUnitSystem,
          dimensionBehavior.length,
        ),
        width: formatDimensionValue(
          area.width,
          inputUnitSystem,
          dimensionBehavior.width,
        ),
        depth: formatDimensionValue(
          area.depth,
          inputUnitSystem,
          dimensionBehavior.depth,
        ),
      };

      return {
        ...display,
        summary: `${display.length} \u00d7 ${display.width} \u00d7 ${display.depth}`,
      };
    });
  const primaryDisplay = areaDisplays[0];

  const inputs: Record<string, string> = {};

  if (areaDisplays.length === 1 && primaryDisplay) {
    inputs[labels.dimensions.length] = primaryDisplay.length;
    inputs[labels.dimensions.width] = primaryDisplay.width;
    inputs[labels.dimensions.depth] = primaryDisplay.depth;
  } else {
    areaDisplays.forEach((area, index) => {
      inputs[`Area ${index + 1}`] = area.summary;
    });
  }

  inputs[labels.material] = material.name;

  const costEstimate = buildCalculatorCostEstimate(
    result,
    input.priceMode,
    input.pricePerUnit,
    inputUnitSystem,
  );
  const currencyFormatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  });

  if (costEstimate) {
    const rateUnit =
      costEstimate.mode === 'load'
        ? 'load'
        : costEstimate.quantityLabel === 'm3'
        ? 'm\u00b3'
        : costEstimate.quantityLabel === 'yd3'
          ? 'yd\u00b3'
          : costEstimate.quantityLabel;
    inputs['Price per'] = `${currencyFormatter.format(costEstimate.rate)} per ${rateUnit}`;
  }

  if (assumptionsSummary) {
    inputs.Assumptions = assumptionsSummary;
  }

  const results: Record<string, string> = {
    [resultPresentation.volumeLabel]: formatVolumeText(
      result[resultPresentation.volumeValueSource],
      resolvedOutputUnitPreference,
    ),
  };

  if (resultPresentation.adjustedVolumeLabel && resultPresentation.adjustedVolumeValueSource) {
    results[resultPresentation.adjustedVolumeLabel] = formatVolumeText(
      result[resultPresentation.adjustedVolumeValueSource],
      resolvedOutputUnitPreference,
    );
  }

  if (resultPresentation.secondaryVolumeLabel && resultPresentation.secondaryVolumeValueSource) {
    results[resultPresentation.secondaryVolumeLabel] = formatVolumeText(
      result[resultPresentation.secondaryVolumeValueSource],
      resolvedOutputUnitPreference,
    );
  }

  results[resultPresentation.weightLabel] = formatWeightText(
    result.adjustedWeightTons,
    resolvedOutputUnitPreference,
  );
  results[resultPresentation.truckLoadsLabel] = formatTruckLoads(result.estimatedTruckLoads);

  if (costEstimate) {
    results['Estimated cost'] = currencyFormatter.format(costEstimate.total);
  }

  const dimensionMessageLines =
    areaDisplays.length === 1 && primaryDisplay
      ? [`Dimensions: ${primaryDisplay.summary}`]
      : [
          'Areas:',
          ...areaDisplays.map(
            (area, index) => `Area ${index + 1}: ${area.summary}`,
          ),
        ];

  const messageLines = [
    `I used the Bellhouse ${kind} calculator.`,
    '',
    ...dimensionMessageLines,
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
