'use client';

import { useMemo } from 'react';
import { getMaterialById } from '../../config/materials';
import { getMaterialDefaultAssumptions } from '../../logic/calculator';
import type {
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorNumberField,
  CalculatorSelectField,
  CalculatorToggleField,
} from '../../types/calculator';
import type {
  CalculatorAdvancedState,
  CalculatorKindBehavior,
  CalculatorKindBehaviorParams,
} from '../calculatorController.types';
import { buildCalculatorAssumptions } from './buildCalculatorAssumptions';

const defaultAdvancedState: CalculatorAdvancedState = {
  values: null,
  hasManualOverrides: false,
  canResetToMaterialDefaults: false,
  statusMessage: null,
};

export function useDefaultCalculatorKindBehavior({
  kind,
  config,
  input,
  material,
  normalizedInput,
  setInput,
}: CalculatorKindBehaviorParams): CalculatorKindBehavior {
  const assumptions = useMemo(() => {
    return buildCalculatorAssumptions({
      kind,
      config,
      input,
      material,
      normalizedInput,
    });
  }, [config, input, kind, material, normalizedInput]);

  const updateAdvancedNumberField = (
    _field: CalculatorNumberField,
    _value: CalculatorEditableNumber,
  ) => {};

  const updateAdvancedToggleField = (
    _field: CalculatorToggleField,
    _value: boolean,
  ) => {};

  const updateAdvancedSelectField = <
    K extends Extract<CalculatorSelectField, 'moistureLevel'>
  >(
    _field: K,
    _value: CalculatorFormInput[K],
  ) => {};

  const updateMaterialSelection = (
    materialId: CalculatorFormInput['materialId'],
  ) => {
    setInput((prev) => {
      const material = getMaterialById(materialId);

      if (!material) {
        return {
          ...prev,
          materialId,
        };
      }

      const nextDefaults = getMaterialDefaultAssumptions(
        kind,
        material,
        config.defaults.truckCapacityTons,
      );

      return {
        ...prev,
        materialId,
        moistureLevel: nextDefaults.moistureLevel,
        swellFactor: nextDefaults.swellFactor,
        wetMaterialPercentage: config.advancedSettings.wetMaterialPercentage
          ? nextDefaults.wetMaterialPercentage
          : '',
        compactionPercentage: nextDefaults.compactionPercentage,
        truckCapacityTons: nextDefaults.truckCapacityTons,
        isHalfLoad: nextDefaults.isHalfLoad,
      };
    });
  };

  return {
    assumptions,
    advanced: defaultAdvancedState,
    actions: {
      updateAdvancedNumberField,
      updateAdvancedToggleField,
      updateAdvancedSelectField,
      updateMaterialSelection,
      resetMaterialDefaults: () => {},
    },
  };
}
