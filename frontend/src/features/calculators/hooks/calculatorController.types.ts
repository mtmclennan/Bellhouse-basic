import type { Dispatch, SetStateAction } from 'react';
import type { CalculatorConfig } from '../config/calculators';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import type {
  CalculatorDimensionBehavior,
  CalculatorDimensionKey,
  CalculatorDimensionValueField,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorKind,
  CalculatorNumberField,
  CalculatorResult,
  CalculatorSelectField,
  CalculatorToggleField,
  Material,
  MetricDimensionUnit,
} from '../types/calculator';

export type CalculatorDimensionEntry = {
  key: CalculatorDimensionKey;
  label: string;
  behavior: CalculatorDimensionBehavior;
  value: CalculatorFormInput[CalculatorDimensionKey];
};

export type CalculatorControllerAssumptions = {
  material: string;
  swellFactor: number;
  truckPayloadTons: number;
  moistureLevel?: string;
  isHalfLoad?: boolean;
  compactionPercentage?: number;
};

export type CalculatorAdvancedValues = {
  swellFactor: CalculatorEditableNumber;
  moistureLevel: CalculatorFormInput['moistureLevel'];
  wetMaterialPercentage: CalculatorEditableNumber;
  compactionPercentage: CalculatorEditableNumber;
  truckCapacityTons: CalculatorEditableNumber;
  isHalfLoad: boolean;
};

export type CalculatorAdvancedState = {
  values: CalculatorAdvancedValues | null;
  hasManualOverrides: boolean;
  canResetToMaterialDefaults: boolean;
  statusMessage: string | null;
};

export type CalculatorControllerActions = {
  updateNumberField: (
    field: CalculatorNumberField,
    value: CalculatorEditableNumber,
  ) => void;
  updateDimensionValueField: (
    dimension: CalculatorDimensionKey,
    field: CalculatorDimensionValueField,
    value: CalculatorEditableNumber,
  ) => void;
  updateDimensionUnitField: (
    dimension: CalculatorDimensionKey,
    value: MetricDimensionUnit,
  ) => void;
  updateToggleField: (field: CalculatorToggleField, value: boolean) => void;
  updateAdvancedNumberField: (
    field: CalculatorNumberField,
    value: CalculatorEditableNumber,
  ) => void;
  updateAdvancedToggleField: (
    field: CalculatorToggleField,
    value: boolean,
  ) => void;
  updateAdvancedSelectField: <
    K extends Extract<CalculatorSelectField, 'moistureLevel'>
  >(
    field: K,
    value: CalculatorFormInput[K],
  ) => void;
  updateSelectField: <K extends CalculatorSelectField>(
    field: K,
    value: CalculatorFormInput[K],
  ) => void;
  updateMaterialSelection: (
    materialId: CalculatorFormInput['materialId'],
  ) => void;
  resetMaterialDefaults: () => void;
  updateInputUnitSystem: (
    nextUnitSystem: CalculatorFormInput['inputUnitSystem'],
  ) => void;
};

export type CalculatorController = {
  config: CalculatorConfig;
  state: {
    input: CalculatorFormInput;
    material: Material | undefined;
    normalizedInput: ReturnType<typeof normalizeCalculatorInput>;
    result: CalculatorResult | null;
    assumptions: CalculatorControllerAssumptions | null;
  };
  options: {
    allowedMaterials: Material[];
    dimensionEntries: CalculatorDimensionEntry[];
  };
  advanced: CalculatorAdvancedState;
  actions: CalculatorControllerActions;
};

export type CalculatorKindBehaviorParams = {
  kind: CalculatorKind;
  config: CalculatorConfig;
  input: CalculatorFormInput;
  material: Material | undefined;
  normalizedInput: ReturnType<typeof normalizeCalculatorInput>;
  result: CalculatorResult | null;
  setInput: Dispatch<SetStateAction<CalculatorFormInput>>;
};

export type CalculatorKindBehavior = {
  assumptions: CalculatorControllerAssumptions | null;
  advanced: CalculatorAdvancedState;
  actions: Pick<
    CalculatorControllerActions,
    | 'updateAdvancedNumberField'
    | 'updateAdvancedToggleField'
    | 'updateAdvancedSelectField'
    | 'updateMaterialSelection'
    | 'resetMaterialDefaults'
  >;
};
