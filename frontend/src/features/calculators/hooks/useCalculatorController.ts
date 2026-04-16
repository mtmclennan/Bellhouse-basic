'use client';

import { useMemo } from 'react';
import { createCalculatorFormInput, getCalculatorConfig } from '../config/calculators';
import { buildCalculatorResultCardMap } from './buildCalculatorResultCards';
import type {
  CalculatorAdvancedFieldsModel,
  CalculatorController,
  CalculatorKindBehaviorParams,
} from './calculatorController.types';
import { useCalculatorCoreState } from './useCalculatorCoreState';
import { useCalculatorKindBehavior } from './useCalculatorKindBehavior';
import type {
  CalculatorDimensionKey,
  CalculatorDimensionValueField,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorKind,
  MetricDimensionUnit,
} from '../types/calculator';

export function useCalculatorController(kind: CalculatorKind): CalculatorController {
  const config = getCalculatorConfig(kind);

  const {
    input,
    setInput,
    allowedMaterials,
    material,
    normalizedInput,
    result,
    updateNumberField,
    updateDimensionValueField,
    updateDimensionUnitField,
    updateToggleField,
    updateSelectField,
    updateInputUnitSystem,
  } = useCalculatorCoreState({
    config,
    createInitialInput: () => createCalculatorFormInput(config),
  });

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

  const showDetailedResults = input.useAdvanced;

  const resultCardMap = result
    ? buildCalculatorResultCardMap(
        config,
        result,
        input.outputUnitPreference,
        showDetailedResults,
      )
    : null;

  const primaryCards = result
    ? (
        showDetailedResults
          ? config.resultPresentation.primaryCardIds
          : config.resultPresentation.defaultPrimaryCardIds
      ).flatMap((cardId) => {
        const card = resultCardMap?.[cardId];
        return card ? [card] : [];
      })
    : [];

  const secondaryCards =
    result && showDetailedResults
      ? (config.resultPresentation.secondaryCardIds ?? []).flatMap((cardId) => {
          const card = resultCardMap?.[cardId];
          return card ? [card] : [];
        })
      : [];

  const advancedShell = {
    title: config.sectionCopy.advancedTitle,
    note: config.sectionCopy.advancedNote,
    toggle: {
      label: config.labels.useAdvanced,
      enabled: input.useAdvanced,
      onChange: (value: boolean) => updateToggleField('useAdvanced', value),
    },
  } satisfies CalculatorController['sections']['inputPanel']['advanced']['shell'];

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
                helperText: config.sectionCopy.materialHelperText,
                value: input.materialId,
                options: allowedMaterials,
                onChange: kindBehavior.actions.updateMaterialSelection,
              }
            : null,
        advanced: kindBehavior.advanced.values
          ? {
              shell: advancedShell,
              content: {
                mode: 'managed',
                enabled: input.useAdvanced,
                statusMessage: kindBehavior.advanced.statusMessage,
                inactiveMessage: config.sectionCopy.advancedInactiveMessage,
                fields: advancedManagedFields,
              },
            }
          : {
              shell: advancedShell,
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
