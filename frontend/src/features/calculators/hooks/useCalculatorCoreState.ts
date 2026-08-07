'use client';

import { useCallback, useMemo, useState } from 'react';
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
  /**
   * Called whenever the user mutates the calculator input (never on the
   * initial render). Generic on purpose — this hook has no idea analytics
   * exists; the caller decides what "a user changed something" means to it.
   */
  onUserChange?: () => void;
};

export function useCalculatorCoreState({
  config,
  createInitialInput,
  onUserChange,
}: UseCalculatorCoreStateParams) {
  const [input, setRawInput] = useState<CalculatorFormInput>(createInitialInput);

  const setInput = useCallback<typeof setRawInput>(
    (update) => {
      onUserChange?.();
      setRawInput(update);
    },
    [onUserChange],
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
