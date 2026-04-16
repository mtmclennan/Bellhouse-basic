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

function formatDensity(material: Material) {
  return `${formatNumber(material.densityTonsPerM3)} t/m3`;
}

function formatPayload(
  payloadTons: number,
  isHalfLoad: boolean,
) {
  return isHalfLoad
    ? `${formatNumber(payloadTons, 1)} tons (half-load applied)`
    : `${formatNumber(payloadTons, 1)} tons`;
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

  const items =
    kind === 'excavation'
      ? [
          `Material to haul: ${material.name}`,
          `Loose material density: ${formatDensity(material)}`,
          `Swell factor: ${formatNumber(swellFactor)}x`,
        ]
      : [
          `Material: ${material.name}`,
          `Density: ${formatDensity(material)}`,
          `Swell factor: ${formatNumber(swellFactor)}x`,
        ];

  if (config.advancedSettings.moistureLevel) {
    const moisturePercentage = resolveMoistureLevelPercentage(
      input.moistureLevel,
      material,
    );
    items.push(
      `Moisture: ${getMoistureLevelLabel(input.moistureLevel)} (${formatNumber(
        moisturePercentage,
        1,
      )}% weight adjustment)`,
    );
  } else if (config.advancedSettings.wetMaterialPercentage) {
    items.push(
      wetMaterialPercentage !== undefined
        ? `Wet material adjustment: ${formatNumber(wetMaterialPercentage, 1)}%`
        : 'Wet material adjustment: none',
    );
  }

  if (config.advancedSettings.compactionPercentage) {
    items.push(
      compactionPercentage !== undefined
        ? `Compaction adjustment: ${formatNumber(compactionPercentage, 1)}%`
        : 'Compaction adjustment: none',
    );
  }

  items.push(
    `Truck payload: ${formatPayload(
      truckPayload,
      normalizedInput.useAdvanced && normalizedInput.isHalfLoad,
    )}`,
  );

  const summaryByKind: Record<CalculatorKind, string> = {
    excavation: `Based on ${material.name.toLowerCase()} removal and loose material quantities after swell, using the current hauling inputs below.`,
    gravel: `Based on ${material.name.toLowerCase()} and the current ordering and hauling inputs below.`,
    topsoil: `Based on ${material.name.toLowerCase()} and the current placement and hauling inputs below.`,
  };

  return {
    title: kind === 'excavation' ? 'Loose Material Assumptions' : 'Assumptions',
    summary: summaryByKind[kind],
    items,
  };
}
