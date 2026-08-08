'use client';

import { useCallback, useMemo, useState } from 'react';
import { getMaterialById, getMaterialsByIds } from '../config/materials';
import {
  createCalculatorAreaFormInput,
  MAX_CALCULATOR_AREAS,
} from '../config/calculators';
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

  const replaceInput = useCallback((nextInput: CalculatorFormInput) => {
    setRawInput(nextInput);
  }, []);

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

  const updateAreaDimensionValueField = (
    areaIndex: number,
    dimension: CalculatorDimensionKey,
    field: CalculatorDimensionValueField,
    value: CalculatorEditableNumber,
  ) => {
    if (areaIndex === 0) {
      updateDimensionValueField(dimension, field, value);
      return;
    }

    setInput((prev) => ({
      ...prev,
      additionalAreas: prev.additionalAreas.map((area, index) =>
        index === areaIndex - 1
          ? {
              ...area,
              [dimension]: {
                ...area[dimension],
                [field]: value,
              },
            }
          : area,
      ),
    }));
  };

  const updateAreaDimensionUnitField = (
    areaIndex: number,
    dimension: CalculatorDimensionKey,
    value: MetricDimensionUnit,
  ) => {
    if (areaIndex === 0) {
      updateDimensionUnitField(dimension, value);
      return;
    }

    setInput((prev) => ({
      ...prev,
      additionalAreas: prev.additionalAreas.map((area, index) =>
        index === areaIndex - 1
          ? {
              ...area,
              [dimension]: {
                ...area[dimension],
                metricUnit: value,
              },
            }
          : area,
      ),
    }));
  };

  const addArea = () => {
    setInput((prev) => {
      if (prev.additionalAreas.length + 1 >= MAX_CALCULATOR_AREAS) {
        return prev;
      }

      return {
        ...prev,
        additionalAreas: [
          ...prev.additionalAreas,
          createCalculatorAreaFormInput(config),
        ],
      };
    });
  };

  const removeArea = (areaIndex: number) => {
    setInput((prev) => {
      const areas = [
        { length: prev.length, width: prev.width, depth: prev.depth },
        ...prev.additionalAreas,
      ];

      if (areas.length <= 1 || areaIndex < 0 || areaIndex >= areas.length) {
        return prev;
      }

      const remainingAreas = areas.filter((_, index) => index !== areaIndex);
      const [primaryArea, ...additionalAreas] = remainingAreas;

      return {
        ...prev,
        ...primaryArea,
        additionalAreas,
      };
    });
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
    }));
  };

  return {
    input,
    setInput,
    replaceInput,
    allowedMaterials,
    material,
    normalizedInput,
    result,
    updateNumberField,
    updateDimensionValueField,
    updateDimensionUnitField,
    updateAreaDimensionValueField,
    updateAreaDimensionUnitField,
    addArea,
    removeArea,
    updateToggleField,
    updateSelectField,
    updateInputUnitSystem,
  };
}
