'use client';

import { formatNumber } from '../../utils/format';
import {
  getMoistureLevelLabel,
  resolveActiveCompactionPercentage,
  resolveActiveSwellFactor,
  resolveActiveTruckPayloadTons,
  resolveActiveWetMaterialPercentage,
  resolveMoistureLevelPercentage,
} from '../../logic/calculator';
import type {
  CalculatorAssumptionsSection,
} from '../calculatorController.types';
import type {
  CalculatorConfig,
} from '../../config/calculators';
import type {
  CalculatorCalculationInput,
  CalculatorFormInput,
  CalculatorKind,
  Material,
} from '../../types/calculator';

type BuildCalculatorAssumptionsParams = {
  kind: CalculatorKind;
  config: CalculatorConfig;
  input: CalculatorFormInput;
  material?: Material;
  normalizedInput: CalculatorCalculationInput | null;
};

function isDefined(value: string | null): value is string {
  return value !== null;
}

function formatPayload(
  payloadTons: number,
  isHalfLoad: boolean,
) {
  return isHalfLoad
    ? `${formatNumber(payloadTons, 1)} metric tonnes (half-load applied)`
    : `${formatNumber(payloadTons, 1)} metric tonnes`;
}

export function buildCalculatorAssumptions({
  kind,
  config,
  input,
  material,
  normalizedInput,
}: BuildCalculatorAssumptionsParams): CalculatorAssumptionsSection | null {
  if (!material || !normalizedInput) {
    return null;
  }

  const swellFactor = resolveActiveSwellFactor(normalizedInput, material);
  const truckPayload = resolveActiveTruckPayloadTons(normalizedInput);
  const wetMaterialPercentage = resolveActiveWetMaterialPercentage(
    normalizedInput,
    material,
  );
  const compactionPercentage = resolveActiveCompactionPercentage(
    normalizedInput,
    material,
  );
  const summaryParts =
    kind === 'excavation'
      ? [
          `${material.name}`,
          `${formatNumber(swellFactor)}x swell`,
          `${getMoistureLevelLabel(input.moistureLevel).toLowerCase()} moisture`,
          `${formatPayload(
            truckPayload,
            normalizedInput.useAdvanced && normalizedInput.isHalfLoad,
          )} payload`,
        ]
      : [
          `${material.name}`,
          compactionPercentage !== undefined
            ? `${formatNumber(compactionPercentage, 1)}% compaction`
            : null,
          wetMaterialPercentage !== undefined
            ? `${formatNumber(wetMaterialPercentage, 1)}% wet material`
            : null,
          `${formatPayload(
            truckPayload,
            normalizedInput.useAdvanced && normalizedInput.isHalfLoad,
          )} payload`,
        ].filter(isDefined);

  const detailItems =
    normalizedInput.useAdvanced
      ? kind === 'excavation'
        ? [
            `Material to haul: ${material.name}`,
            `Swell factor: ${formatNumber(swellFactor)}x`,
            `Moisture: ${getMoistureLevelLabel(input.moistureLevel)}`,
            `Truck payload: ${formatPayload(
              truckPayload,
              normalizedInput.isHalfLoad,
            )}`,
          ]
        : [
            `Material: ${material.name}`,
            compactionPercentage !== undefined
              ? `Compaction adjustment: ${formatNumber(compactionPercentage, 1)}%`
              : null,
            wetMaterialPercentage !== undefined
              ? `Wet material adjustment: ${formatNumber(
                  wetMaterialPercentage,
                  1,
                )}%`
              : null,
            `Truck payload: ${formatPayload(
              truckPayload,
              normalizedInput.isHalfLoad,
            )}`,
          ].filter(isDefined)
      : undefined;

  return {
    title: 'Estimate based on',
    summary: summaryParts.join(', ') + '.',
    items: detailItems,
  };
}
