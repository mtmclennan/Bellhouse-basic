'use client';

import { useMemo } from 'react';
import {
  createCalculatorFormInput,
  getCalculatorConfig,
  MAX_CALCULATOR_AREAS,
  resolveOutputUnitPreference,
} from '../config/calculators';
import { trackCalculatorAdvancedOpened } from '../analytics/calculatorAnalyticsActions';
import { useCalculatorCompletionTracking } from '../analytics/useCalculatorCompletionTracking';
import { useCalculatorStartedTracking } from '../analytics/useCalculatorStartedTracking';
import { buildCalculatorResultCardMap } from './buildCalculatorResultCards';
import { buildCalculatorCostEstimate } from '../logic/costEstimate';
import {
  M3_TO_CUBIC_YARDS,
  tonnesToShortTons,
} from '../logic/conversions';
import { formatNumber } from '../utils/format';
import { useCalculatorShareState } from './useCalculatorShareState';
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
  const { markStarted } = useCalculatorStartedTracking(kind);

  const {
    input,
    setInput,
    replaceInput,
    allowedMaterials,
    material,
    normalizedInput,
    result,
    updateNumberField,
    updateAreaDimensionValueField,
    updateAreaDimensionUnitField,
    addArea,
    removeArea,
    updateToggleField,
    updateSelectField,
    updateInputUnitSystem,
  } = useCalculatorCoreState({
    config,
    createInitialInput: () => createCalculatorFormInput(config),
    onUserChange: markStarted,
  });

  const share = useCalculatorShareState({ kind, config, input, replaceInput });

  useCalculatorCompletionTracking({
    calculatorType: kind,
    hasResult: Boolean(result),
    normalizedInput,
    materialId: material?.id,
    unitSystem: input.inputUnitSystem,
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

  const costEstimate = result
    ? buildCalculatorCostEstimate(
        result,
        input.priceMode,
        input.pricePerUnit,
        input.inputUnitSystem,
      )
    : null;
  const currencyFormatter = new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  });
  const costEstimateModel = costEstimate
    ? {
        value: currencyFormatter.format(costEstimate.total),
        meta: `${currencyFormatter.format(costEstimate.rate)} per ${
          costEstimate.mode === 'load'
            ? 'load'
            : costEstimate.quantityLabel === 'm3'
              ? 'm\u00b3'
              : costEstimate.quantityLabel === 'yd3'
                ? 'yd\u00b3'
                : costEstimate.quantityLabel
        } \u00d7 ${formatNumber(
          costEstimate.quantity,
          costEstimate.mode === 'load' ? 1 : 2,
        )}`,
      }
    : null;

  const areaInputs = [
    { length: input.length, width: input.width, depth: input.depth },
    ...input.additionalAreas,
  ];
  const singleAreaLabel = kind === 'excavation' ? 'Dig area' : 'Coverage area';
  const addAreaLabel =
    kind === 'excavation' ? 'Add dig area' : 'Add coverage area';

  const dimensionsSection = {
    title: config.sectionCopy.dimensionsTitle,
    areas: areaInputs.map((area, areaIndex) => ({
      id: `calculator-area-${areaIndex}`,
      title: areaInputs.length === 1 ? singleAreaLabel : `Area ${areaIndex + 1}`,
      fields: config.dimensionKeys.map((dimensionKey) => ({
        key: dimensionKey,
        label: config.labels.dimensions[dimensionKey],
        behavior: config.dimensionBehavior[dimensionKey],
        inputUnitSystem: input.inputUnitSystem,
        value: area[dimensionKey],
        onValueChange: (
          field: CalculatorDimensionValueField,
          value: CalculatorEditableNumber,
        ) =>
          updateAreaDimensionValueField(
            areaIndex,
            dimensionKey,
            field,
            value,
          ),
        onUnitChange: (value: MetricDimensionUnit) =>
          updateAreaDimensionUnitField(areaIndex, dimensionKey, value),
      })),
      onRemove:
        areaInputs.length > 1 ? () => removeArea(areaIndex) : undefined,
    })),
    addAreaLabel,
    canAddArea: areaInputs.length < MAX_CALCULATOR_AREAS,
    maxAreas: MAX_CALCULATOR_AREAS,
    onAddArea: addArea,
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

  const resolvedOutputUnitPreference = resolveOutputUnitPreference(
    input.outputUnitPreference,
    input.inputUnitSystem,
  );

  const resultCardMap = result
    ? buildCalculatorResultCardMap(
        config,
        result,
        resolvedOutputUnitPreference,
        showDetailedResults,
      )
    : null;

  const metricResultCardMap = result
    ? buildCalculatorResultCardMap(config, result, 'metric', showDetailedResults)
    : null;

  const imperialResultCardMap = result
    ? buildCalculatorResultCardMap(config, result, 'imperial', showDetailedResults)
    : null;

  const activeCardIds = showDetailedResults
    ? [
        ...config.resultPresentation.primaryCardIds,
        ...(config.resultPresentation.secondaryCardIds ?? []),
      ]
    : config.resultPresentation.defaultPrimaryCardIds;

  const measurementComparisonRows =
    result && metricResultCardMap && imperialResultCardMap
      ? activeCardIds.flatMap((cardId) => {
          const metricCard = metricResultCardMap[cardId];
          const imperialCard = imperialResultCardMap[cardId];

          if (!metricCard || !imperialCard) {
            return [];
          }

          return [
            {
              id: cardId,
              label: metricCard.label,
              metricValue: metricCard.value,
              imperialValue: imperialCard.value,
            },
          ];
        })
      : [];
  const comparisonRows = costEstimateModel
    ? [
        ...measurementComparisonRows,
        {
          id: 'cost',
          label: 'Est. job cost',
          metricValue: costEstimateModel.value,
          imperialValue: costEstimateModel.value,
        },
      ]
    : measurementComparisonRows;

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

  const referenceAdjustmentLabel =
    config.workflow.kind === 'swell-based' ? 'Swell' : 'Compaction';

  const referenceRows = allowedMaterials.map((allowedMaterial) => {
    const adjustment =
      config.workflow.kind === 'swell-based'
        ? allowedMaterial.defaultSwellFactor
          ? `+${Math.round((allowedMaterial.defaultSwellFactor - 1) * 100)}%`
          : 'Base'
        : allowedMaterial.defaultCompactionPercentage
          ? `+${allowedMaterial.defaultCompactionPercentage}%`
          : 'Base';

    return {
      id: allowedMaterial.id,
      label: allowedMaterial.name,
      adjustment,
      weight:
        input.inputUnitSystem === 'imperial'
          ? formatNumber(
              tonnesToShortTons(
                allowedMaterial.densityTonsPerM3 / M3_TO_CUBIC_YARDS,
              ),
              2,
            )
          : allowedMaterial.densityTonsPerM3.toFixed(2),
      isActive: allowedMaterial.id === input.materialId,
    };
  });

  const advancedShell = {
    title: config.sectionCopy.advancedTitle,
    note: config.sectionCopy.advancedNote,
    toggle: {
      label: config.labels.useAdvanced,
      enabled: input.useAdvanced,
      onChange: (value: boolean) => updateToggleField('useAdvanced', value),
    },
    onOpen: () => trackCalculatorAdvancedOpened(kind),
  } satisfies CalculatorController['sections']['inputPanel']['advanced']['shell'];

  return {
    kind,
    config,
    sections: {
      inputPanel: {
        title: config.sectionCopy.inputPanelTitle,
        units: {
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
        cost: {
          title: 'Price per',
          value: input.pricePerUnit,
          mode: input.priceMode,
          volumeUnitLabel:
            input.inputUnitSystem === 'imperial' ? 'yd\u00b3' : 'm\u00b3',
          onValueChange: (value) => updateNumberField('pricePerUnit', value),
          onModeChange: (mode) =>
            updateSelectField(
              'priceMode',
              input.priceMode === mode ? '' : mode,
            ),
        },
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
          options: config.resultDisplay.options,
          metricLabel: 'Metric',
          imperialLabel: 'Imperial',
        },
        placeholderMessage: config.sectionCopy.resultsPlaceholder,
        reference: {
          title: `${referenceAdjustmentLabel} & weight reference`,
          unitLabel:
            input.inputUnitSystem === 'imperial' ? 'short t / yd\u00b3' : 't / m\u00b3',
          rows: referenceRows,
        },
        primaryCards,
        secondaryCards,
        comparisonRows,
        assumptions: kindBehavior.assumptions,
        costEstimate: costEstimateModel,
        share,
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
