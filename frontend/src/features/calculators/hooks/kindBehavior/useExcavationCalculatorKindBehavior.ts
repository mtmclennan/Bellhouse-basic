'use client';

import { useMemo, useState } from 'react';
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

const inactiveAdvancedState: CalculatorAdvancedState = {
  values: null,
  hasManualOverrides: false,
  canResetToMaterialDefaults: false,
  statusMessage: null,
};

function resolveEditablePositiveValue(
  value: CalculatorEditableNumber,
  fallback: number,
) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

export function useExcavationCalculatorKindBehavior({
  kind,
  config,
  input,
  material,
  normalizedInput,
  result,
  setInput,
}: CalculatorKindBehaviorParams): CalculatorKindBehavior {
  const isExcavation = kind === 'excavation';
  const [hasManualOverrides, setHasManualOverrides] = useState(false);

  const materialDefaults = useMemo(() => {
    if (!isExcavation || !material) {
      return null;
    }

    return getMaterialDefaultAssumptions(
      kind,
      material,
      config.defaults.truckCapacityTons,
    );
  }, [config.defaults.truckCapacityTons, isExcavation, kind, material]);

  const activeSettings = useMemo(() => {
    if (!isExcavation || !materialDefaults) {
      return null;
    }

    const enteredTruckPayloadTons = resolveEditablePositiveValue(
      input.truckCapacityTons,
      materialDefaults.truckCapacityTons,
    );
    const isHalfLoadActive = input.useAdvanced ? input.isHalfLoad : false;

    return {
      swellFactor: resolveEditablePositiveValue(
        input.swellFactor,
        materialDefaults.swellFactor,
      ),
      moistureLevel: input.moistureLevel,
      truckCapacityTons: enteredTruckPayloadTons,
      isHalfLoad: isHalfLoadActive,
    };
  }, [
    input.isHalfLoad,
    input.moistureLevel,
    input.swellFactor,
    input.truckCapacityTons,
    input.useAdvanced,
    isExcavation,
    materialDefaults,
  ]);

  const advancedState = useMemo<CalculatorAdvancedState>(() => {
    if (!isExcavation || !activeSettings) {
      return inactiveAdvancedState;
    }

    return {
      values: {
        swellFactor: activeSettings.swellFactor,
        moistureLevel: activeSettings.moistureLevel,
        wetMaterialPercentage: input.wetMaterialPercentage,
        compactionPercentage: 0,
        truckCapacityTons: activeSettings.truckCapacityTons,
        isHalfLoad: activeSettings.isHalfLoad,
      },
      hasManualOverrides,
      canResetToMaterialDefaults: Boolean(material),
      statusMessage: hasManualOverrides
        ? 'Manual overrides are active. Changing material keeps these values until you reset to material defaults.'
        : "Material changes load that material's defaults automatically until you edit these settings.",
    };
  }, [
    activeSettings,
    hasManualOverrides,
    input.wetMaterialPercentage,
    isExcavation,
    material,
  ]);

  const assumptions = useMemo(() => {
    if (!isExcavation || !result || !activeSettings) {
      return null;
    }

    return buildCalculatorAssumptions({
      kind,
      config,
      input,
      material,
      normalizedInput,
    });
  }, [activeSettings, config, input, isExcavation, kind, material, normalizedInput, result]);

  const updateAdvancedNumberField = (
    field: CalculatorNumberField,
    value: CalculatorEditableNumber,
  ) => {
    if (!isExcavation) {
      return;
    }

    setHasManualOverrides(true);
    setInput((prev) => ({
      ...prev,
      useAdvanced: true,
      [field]: value,
    }));
  };

  const updateAdvancedToggleField = (
    field: CalculatorToggleField,
    value: boolean,
  ) => {
    if (!isExcavation) {
      return;
    }

    setHasManualOverrides(true);
    setInput((prev) => ({
      ...prev,
      useAdvanced: true,
      [field]: value,
    }));
  };

  const updateAdvancedSelectField = <
    K extends Extract<CalculatorSelectField, 'moistureLevel'>
  >(
    field: K,
    value: CalculatorFormInput[K],
  ) => {
    if (!isExcavation) {
      return;
    }

    setHasManualOverrides(true);
    setInput((prev) => ({
      ...prev,
      useAdvanced: true,
      [field]: value,
    }));
  };

  const updateMaterialSelection = (
    materialId: CalculatorFormInput['materialId'],
  ) => {
    if (!isExcavation) {
      return;
    }

    setInput((prev) => {
      const nextMaterial = getMaterialById(materialId);

      if (!nextMaterial) {
        return {
          ...prev,
          materialId,
        };
      }

      if (hasManualOverrides) {
        return {
          ...prev,
          materialId,
        };
      }

      const nextDefaults = getMaterialDefaultAssumptions(
        kind,
        nextMaterial,
        config.defaults.truckCapacityTons,
      );

      return {
        ...prev,
        materialId,
        moistureLevel: nextDefaults.moistureLevel,
        swellFactor: nextDefaults.swellFactor,
        wetMaterialPercentage: '',
        compactionPercentage: 0,
        truckCapacityTons: nextDefaults.truckCapacityTons,
        isHalfLoad: nextDefaults.isHalfLoad,
      };
    });
  };

  const resetMaterialDefaults = () => {
    if (!isExcavation || !material) {
      return;
    }

    const nextDefaults = getMaterialDefaultAssumptions(
      kind,
      material,
      config.defaults.truckCapacityTons,
    );

    setInput((prev) => ({
      ...prev,
      useAdvanced: false,
      moistureLevel: nextDefaults.moistureLevel,
      swellFactor: nextDefaults.swellFactor,
      wetMaterialPercentage: '',
      compactionPercentage: 0,
      truckCapacityTons: nextDefaults.truckCapacityTons,
      isHalfLoad: nextDefaults.isHalfLoad,
    }));
    setHasManualOverrides(false);
  };

  return {
    assumptions,
    advanced: advancedState,
    actions: {
      updateAdvancedNumberField,
      updateAdvancedToggleField,
      updateAdvancedSelectField,
      updateMaterialSelection,
      resetMaterialDefaults,
    },
  };
}
