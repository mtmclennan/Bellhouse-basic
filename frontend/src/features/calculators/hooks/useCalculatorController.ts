'use client';

import { useMemo, useState } from 'react';
import { createCalculatorFormInput, getCalculatorConfig } from '../config/calculators';
import { getMaterialById, getMaterialsByIds } from '../config/materials';
import { calculateProjectMaterial } from '../logic/calculator';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import { useCalculatorKindBehavior } from './useCalculatorKindBehavior';
import type {
  CalculatorController,
  CalculatorDimensionEntry,
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

  const dimensionEntries: CalculatorDimensionEntry[] = (
    ['length', 'width', 'depth'] as CalculatorDimensionKey[]
  ).map((dimensionKey) => ({
    key: dimensionKey,
    label: config.labels.dimensions[dimensionKey],
    behavior: config.dimensionBehavior[dimensionKey],
    value: input[dimensionKey],
  }));

  return {
    config,
    state: {
      input,
      material: material ?? undefined,
      normalizedInput,
      result,
      assumptions: kindBehavior.assumptions,
    },
    options: {
      allowedMaterials,
      dimensionEntries,
    },
    advanced: kindBehavior.advanced,
    actions: {
      updateNumberField,
      updateDimensionValueField,
      updateDimensionUnitField,
      updateToggleField,
      updateAdvancedNumberField: kindBehavior.actions.updateAdvancedNumberField,
      updateAdvancedToggleField: kindBehavior.actions.updateAdvancedToggleField,
      updateAdvancedSelectField: kindBehavior.actions.updateAdvancedSelectField,
      updateSelectField,
      updateMaterialSelection: kindBehavior.actions.updateMaterialSelection,
      resetMaterialDefaults: kindBehavior.actions.resetMaterialDefaults,
      updateInputUnitSystem,
    },
  };
}
