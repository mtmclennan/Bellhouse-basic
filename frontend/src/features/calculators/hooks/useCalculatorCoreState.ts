'use client';

import { useMemo, useState } from 'react';
import { getMaterialById, getMaterialsByIds } from '../config/materials';
import { calculateProjectMaterial } from '../logic/calculator';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import type { CalculatorConfig } from '../config/calculators';
import type {
  CalculatorDimensionKey,
  CalculatorDimensionValueField,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorNumberField,
  CalculatorSelectField,
  CalculatorToggleField,
  MetricDimensionUnit,
} from '../types/calculator';

type UseCalculatorCoreStateParams = {
  config: CalculatorConfig;
  createInitialInput: () => CalculatorFormInput;
};

export function useCalculatorCoreState({
  config,
  createInitialInput,
}: UseCalculatorCoreStateParams) {
  const [input, setInput] = useState<CalculatorFormInput>(createInitialInput);

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

  return {
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
  };
}
