'use client';

import { createElement, Fragment, useMemo, useState } from 'react';
import { createCalculatorFormInput, getCalculatorConfig } from '../config/calculators';
import { getMaterialById, getMaterialsByIds } from '../config/materials';
import { calculateProjectMaterial } from '../logic/calculator';
import {
  m3ToCubicYards,
  tonnesToKilograms,
  tonnesToPounds,
  tonnesToShortTons,
} from '../logic/conversions';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import { formatNumber, formatTruckLoads, formatWholeNumber } from '../utils/format';
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

function formatCubicUnit(value: string, unitLabel: 'm' | 'yd') {
  return createElement(
    Fragment,
    null,
    value,
    ' ',
    unitLabel,
    createElement('sup', null, '3'),
  );
}

function formatVolume(
  cubicMetres: number,
  outputUnitPreference: CalculatorFormInput['outputUnitPreference'],
) {
  if (outputUnitPreference === 'imperial') {
    return formatCubicUnit(formatNumber(m3ToCubicYards(cubicMetres)), 'yd');
  }

  return formatCubicUnit(formatNumber(cubicMetres), 'm');
}

function formatWeight(
  metricTonnes: number,
  outputUnitPreference: CalculatorFormInput['outputUnitPreference'],
) {
  if (outputUnitPreference === 'imperial') {
    return `${formatNumber(tonnesToShortTons(metricTonnes))} short tons`;
  }

  return `${formatNumber(metricTonnes)} metric tonnes`;
}

function formatSupportingWeight(
  metricTonnes: number,
  outputUnitPreference: CalculatorFormInput['outputUnitPreference'],
) {
  if (outputUnitPreference === 'imperial') {
    return `${formatWholeNumber(tonnesToPounds(metricTonnes))} lbs`;
  }

  return `${formatWholeNumber(tonnesToKilograms(metricTonnes))} kg`;
}

type ResultCardId =
  | 'volume'
  | 'adjustedVolume'
  | 'weight'
  | 'truckLoads'
  | 'secondaryVolume';

function buildResultCardMap(
  config: CalculatorController['config'],
  result: NonNullable<CalculatorController['state']['result']>,
  outputUnitPreference: CalculatorFormInput['outputUnitPreference'],
): Partial<Record<ResultCardId, CalculatorResultCardModel>> {
  return {
    volume: {
      id: 'volume',
      label: config.resultPresentation.volumeLabel,
      value: formatVolume(
        config.resultPresentation.adjustedVolumeLabel
          ? result.rawProjectVolumeM3
          : result.adjustedMaterialVolumeM3,
        outputUnitPreference,
      ),
      meta: config.resultPresentation.showCardMeta
        ? 'Adjusted total material volume.'
        : undefined,
      tone: 'primary',
    },
    adjustedVolume: config.resultPresentation.adjustedVolumeLabel
      ? {
          id: 'adjustedVolume',
          label: config.resultPresentation.adjustedVolumeLabel,
          value: formatVolume(
            result.adjustedLooseMaterialVolumeM3,
            outputUnitPreference,
          ),
          meta: config.resultPresentation.showCardMeta
            ? 'Expanded volume to haul away.'
            : undefined,
          tone: 'primary',
        }
      : undefined,
    weight: {
      id: 'weight',
      label: config.resultPresentation.weightLabel,
      value: formatWeight(result.adjustedWeightTons, outputUnitPreference),
      supportingValue: formatSupportingWeight(
        result.adjustedWeightTons,
        outputUnitPreference,
      ),
      meta: config.resultPresentation.showCardMeta
        ? 'Based on material density and moisture.'
        : undefined,
      tone: 'muted',
    },
    truckLoads: {
      id: 'truckLoads',
      label: config.resultPresentation.truckLoadsLabel,
      value: formatTruckLoads(result.estimatedTruckLoads),
      meta: config.resultPresentation.showCardMeta
        ? 'Rounded for quick hauling estimates.'
        : undefined,
      tone: 'primary',
    },
    secondaryVolume: config.resultPresentation.secondaryVolumeLabel
      ? {
          id: 'secondaryVolume',
          label: config.resultPresentation.secondaryVolumeLabel,
          value: formatVolume(result.rawProjectVolumeM3, outputUnitPreference),
          meta: config.resultPresentation.showCardMeta
            ? 'Before advanced adjustments.'
            : undefined,
          tone: 'muted',
        }
      : undefined,
  };
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
    title: config.sectionCopy.dimensionsTitle,
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

  const resultCardMap = result
    ? buildResultCardMap(config, result, input.outputUnitPreference)
    : null;

  const primaryCards: CalculatorResultCardModel[] = result
    ? config.resultPresentation.primaryCardIds.flatMap((cardId) => {
        const card = resultCardMap?.[cardId];
        return card ? [card] : [];
      })
    : [];

  const secondaryCards: CalculatorResultCardModel[] = result
    ? (config.resultPresentation.secondaryCardIds ?? []).flatMap((cardId) => {
        const card = resultCardMap?.[cardId];
        return card ? [card] : [];
      })
    : [];

  return {
    kind,
    config,
    sections: {
      inputPanel: {
        title: config.sectionCopy.inputPanelTitle,
        units: {
          title: config.sectionCopy.unitsTitle,
          label: config.labels.inputUnits,
          value: input.inputUnitSystem,
          metricLabel: config.unitHints.metric,
          imperialLabel: config.unitHints.imperial,
          onChange: updateInputUnitSystem,
        },
        dimensions: dimensionsSection,
        material:
          allowedMaterials.length > 1
            ? {
                title: config.sectionCopy.materialTitle,
                label: config.labels.material,
                value: input.materialId,
                options: allowedMaterials,
                onChange: kindBehavior.actions.updateMaterialSelection,
              }
            : null,
        advanced: kindBehavior.advanced.values
          ? {
              shell: {
                title: config.sectionCopy.advancedTitle,
                note: config.sectionCopy.advancedNote,
              },
              content: {
                mode: 'managed',
                statusMessage: kindBehavior.advanced.statusMessage,
                fields: advancedManagedFields,
              },
            }
          : {
              shell: {
                title: config.sectionCopy.advancedTitle,
                note: config.sectionCopy.advancedNote,
              },
              content: {
                mode: 'standard',
                enabled: input.useAdvanced,
                toggleLabel: config.labels.useAdvanced,
                inactiveMessage: config.sectionCopy.advancedInactiveMessage,
                onEnabledChange: (value: boolean) =>
                  updateToggleField('useAdvanced', value),
                fields: input.useAdvanced ? advancedManagedFields : null,
              },
            },
      },
      results: {
        title: config.sectionCopy.resultsTitle,
        outputDisplay: {
          label: config.labels.resultDisplay,
          value: input.outputUnitPreference,
          onChange: (value) => updateSelectField('outputUnitPreference', value),
          metricLabel: 'Metric',
          imperialLabel: 'Imperial',
        },
        placeholderMessage: config.sectionCopy.resultsPlaceholder,
        primaryCards,
        secondaryCards,
        assumptions: kindBehavior.assumptions,
        disclaimer: config.sectionCopy.disclaimer,
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
