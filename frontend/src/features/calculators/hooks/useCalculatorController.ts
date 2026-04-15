'use client';

import { useMemo, useState } from 'react';
import { createCalculatorFormInput, getCalculatorConfig } from '../config/calculators';
import { getMaterialById, getMaterialsByIds } from '../config/materials';
import { calculateProjectMaterial } from '../logic/calculator';
import { m3ToCubicYards } from '../logic/conversions';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import { formatNumber, formatTruckLoads } from '../utils/format';
import { useCalculatorKindBehavior } from './useCalculatorKindBehavior';
import type {
  CalculatorAdvancedFieldsModel,
  CalculatorController,
  CalculatorResultCardModel,
  CalculatorKindBehaviorParams,
} from './calculatorController.types';
import type {
  CalculatorDimensionKey,
  CalculatorDimensionValueField,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorKind,
  CalculatorNumberField,
  CalculatorSelectField,
  CalculatorToggleField,
  MetricDimensionUnit,
} from '../types/calculator';

function formatVolume(
  cubicMetres: number,
  outputUnitPreference: CalculatorFormInput['outputUnitPreference'],
) {
  if (outputUnitPreference === 'imperial') {
    return `${formatNumber(m3ToCubicYards(cubicMetres))} yd3`;
  }

  return `${formatNumber(cubicMetres)} m3`;
}

export function useCalculatorController(kind: CalculatorKind): CalculatorController {
  const config = getCalculatorConfig(kind);

  const [input, setInput] = useState<CalculatorFormInput>(() =>
    createCalculatorFormInput(config),
  );

  const allowedMaterials = useMemo(() => {
    return getMaterialsByIds(config.allowedMaterialIds);
  }, [config.allowedMaterialIds]);

  const material = getMaterialById(input.materialId);

  const normalizedInput = useMemo(() => {
    return normalizeCalculatorInput(input, config, material);
  }, [config, input, material]);

  const result = useMemo(() => {
    if (!material || !normalizedInput) {
      return null;
    }

    return calculateProjectMaterial(normalizedInput, material);
  }, [material, normalizedInput]);

  const behaviorParams: CalculatorKindBehaviorParams = {
    kind,
    config,
    input,
    material: material ?? undefined,
    normalizedInput,
    result,
    setInput,
  };

  const kindBehavior = useCalculatorKindBehavior(kind, behaviorParams);

  const updateNumberField = (
    field: CalculatorNumberField,
    value: CalculatorEditableNumber,
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateDimensionValueField = (
    dimension: CalculatorDimensionKey,
    field: CalculatorDimensionValueField,
    value: CalculatorEditableNumber,
  ) => {
    setInput((prev) => ({
      ...prev,
      [dimension]: {
        ...prev[dimension],
        [field]: value,
      },
    }));
  };

  const updateDimensionUnitField = (
    dimension: CalculatorDimensionKey,
    value: MetricDimensionUnit,
  ) => {
    setInput((prev) => ({
      ...prev,
      [dimension]: {
        ...prev[dimension],
        metricUnit: value,
      },
    }));
  };

  const updateToggleField = (
    field: CalculatorToggleField,
    value: boolean,
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSelectField = <K extends CalculatorSelectField>(
    field: K,
    value: CalculatorFormInput[K],
  ) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateInputUnitSystem = (
    nextUnitSystem: CalculatorFormInput['inputUnitSystem'],
  ) => {
    setInput((prev) => ({
      ...prev,
      inputUnitSystem: nextUnitSystem,
      outputUnitPreference:
        prev.outputUnitPreference === prev.inputUnitSystem
          ? nextUnitSystem
          : prev.outputUnitPreference,
    }));
  };

  const dimensionsSection = {
    title: 'Dimensions',
    fields: config.dimensionKeys.map((dimensionKey) => ({
      key: dimensionKey,
      label: config.labels.dimensions[dimensionKey],
      behavior: config.dimensionBehavior[dimensionKey],
      inputUnitSystem: input.inputUnitSystem,
      value: input[dimensionKey],
      onValueChange: (
        field: CalculatorDimensionValueField,
        value: CalculatorEditableNumber,
      ) => updateDimensionValueField(dimensionKey, field, value),
      onUnitChange: (value: MetricDimensionUnit) =>
        updateDimensionUnitField(dimensionKey, value),
    })),
  } satisfies CalculatorController['sections']['inputPanel']['dimensions'];

  const advancedManagedFields: CalculatorAdvancedFieldsModel = {
    labels: config.labels.advanced,
    visibility: config.advancedSettings,
    values: kindBehavior.advanced.values ?? {
      swellFactor: input.swellFactor,
      moistureLevel: input.moistureLevel,
      wetMaterialPercentage: input.wetMaterialPercentage,
      compactionPercentage: input.compactionPercentage,
      truckCapacityTons: input.truckCapacityTons,
      isHalfLoad: input.isHalfLoad,
    },
    onSwellFactorChange: (value: CalculatorEditableNumber) =>
      kindBehavior.advanced.values
        ? kindBehavior.actions.updateAdvancedNumberField('swellFactor', value)
        : updateNumberField('swellFactor', value),
    onMoistureLevelChange: (value: CalculatorFormInput['moistureLevel']) =>
      kindBehavior.advanced.values
        ? kindBehavior.actions.updateAdvancedSelectField('moistureLevel', value)
        : updateSelectField('moistureLevel', value),
    onWetMaterialPercentageChange: (value: CalculatorEditableNumber) =>
      kindBehavior.advanced.values
        ? kindBehavior.actions.updateAdvancedNumberField(
            'wetMaterialPercentage',
            value,
          )
        : updateNumberField('wetMaterialPercentage', value),
    onCompactionPercentageChange: (value: CalculatorEditableNumber) =>
      kindBehavior.advanced.values
        ? kindBehavior.actions.updateAdvancedNumberField(
            'compactionPercentage',
            value,
          )
        : updateNumberField('compactionPercentage', value),
    onTruckCapacityTonsChange: (value: CalculatorEditableNumber) =>
      kindBehavior.advanced.values
        ? kindBehavior.actions.updateAdvancedNumberField('truckCapacityTons', value)
        : updateNumberField('truckCapacityTons', value),
    onHalfLoadChange: (value: boolean) =>
      kindBehavior.advanced.values
        ? kindBehavior.actions.updateAdvancedToggleField('isHalfLoad', value)
        : updateToggleField('isHalfLoad', value),
    onResetDefaults: kindBehavior.advanced.canResetToMaterialDefaults
      ? kindBehavior.actions.resetMaterialDefaults
      : undefined,
  };

  const primaryCards: CalculatorResultCardModel[] = result
    ? [
        {
          label: config.resultPresentation.volumeLabel,
          value: formatVolume(
            config.resultPresentation.adjustedVolumeLabel
              ? result.rawProjectVolumeM3
              : result.adjustedMaterialVolumeM3,
            input.outputUnitPreference,
          ),
          meta: config.resultPresentation.showCardMeta
            ? 'Adjusted total material volume.'
            : undefined,
          tone: 'primary' as const,
        },
        ...(config.resultPresentation.adjustedVolumeLabel
          ? [
              {
                label: config.resultPresentation.adjustedVolumeLabel,
                value: formatVolume(
                  result.adjustedLooseMaterialVolumeM3,
                  input.outputUnitPreference,
                ),
                tone: 'primary' as const,
              },
            ]
          : []),
        {
          label: config.resultPresentation.weightLabel,
          value: `${formatNumber(result.adjustedWeightTons)} tonnes`,
          meta: config.resultPresentation.showCardMeta
            ? 'Based on material density and wet adjustment.'
            : undefined,
          tone: 'primary' as const,
        },
        {
          label: config.resultPresentation.truckLoadsLabel,
          value: formatTruckLoads(result.estimatedTruckLoads),
          meta: config.resultPresentation.showCardMeta
            ? 'Based on truck capacity and half-load mode if used.'
            : undefined,
          tone: 'primary' as const,
        },
      ]
    : [];

  const secondaryCards: CalculatorResultCardModel[] =
    result && config.resultPresentation.secondaryVolumeLabel
    ? [
        {
          label: config.resultPresentation.secondaryVolumeLabel,
          value: formatVolume(result.rawProjectVolumeM3, input.outputUnitPreference),
          meta: config.resultPresentation.showCardMeta
            ? 'Before advanced adjustments.'
            : undefined,
          tone: 'muted' as const,
        },
      ]
    : [];

  return {
    kind,
    config,
    sections: {
      inputPanel: {
        title: 'Inputs',
        units: {
          title: 'Units',
          label: config.labels.inputUnits,
          value: input.inputUnitSystem,
          metricLabel: config.unitHints.metric,
          imperialLabel: config.unitHints.imperial,
          onChange: updateInputUnitSystem,
        },
        dimensions: dimensionsSection,
        material: {
          title: 'Material',
          label: config.labels.material,
          value: input.materialId,
          options: allowedMaterials,
          onChange: kindBehavior.actions.updateMaterialSelection,
        },
        advanced: kindBehavior.advanced.values
          ? {
              shell: {
                title: 'Advanced Options',
                note: 'Swell, moisture, compaction, and hauling overrides.',
              },
              content: {
                mode: 'managed',
                statusMessage: kindBehavior.advanced.statusMessage,
                fields: advancedManagedFields,
              },
            }
          : {
              shell: {
                title: 'Advanced Options',
                note: 'Swell, moisture, compaction, and hauling overrides.',
              },
              content: {
                mode: 'standard',
                enabled: input.useAdvanced,
                toggleLabel: config.labels.useAdvanced,
                inactiveMessage:
                  'Turn on advanced options to adjust swell, moisture, compaction, truck payload, and half-load mode.',
                onEnabledChange: (value: boolean) =>
                  updateToggleField('useAdvanced', value),
                fields: input.useAdvanced ? advancedManagedFields : null,
              },
            },
      },
      results: {
        title: 'Results',
        outputDisplay: {
          label: config.labels.resultDisplay,
          value: input.outputUnitPreference,
          onChange: (value) => updateSelectField('outputUnitPreference', value),
          metricLabel: 'Metric',
          imperialLabel: 'Imperial',
        },
        placeholderMessage:
          'Enter dimensions to see volume, material, weight, and truck loads.',
        primaryCards,
        secondaryCards,
        assumptions: kindBehavior.assumptions,
        disclaimer:
          'Estimate only. Site conditions, moisture, compaction, and hauling limits can affect actual quantities.',
      },
    },
    state: {
      input,
      material: material ?? undefined,
      normalizedInput,
      result,
    },
  };
}
