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
  OutputUnitPreference,
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

export type CalculatorUnitsSection = {
  title: string;
  label: string;
  value: CalculatorFormInput['inputUnitSystem'];
  metricLabel: string;
  imperialLabel: string;
  onChange: (value: CalculatorFormInput['inputUnitSystem']) => void;
};

export type CalculatorDimensionFieldModel = {
  key: CalculatorDimensionKey;
  label: string;
  behavior: CalculatorDimensionBehavior;
  inputUnitSystem: CalculatorFormInput['inputUnitSystem'];
  value: CalculatorFormInput[CalculatorDimensionKey];
  onValueChange: (
    field: CalculatorDimensionValueField,
    value: CalculatorEditableNumber,
  ) => void;
  onUnitChange: (value: MetricDimensionUnit) => void;
};

export type CalculatorDimensionsSection = {
  title: string;
  fields: CalculatorDimensionFieldModel[];
};

export type CalculatorMaterialSection = {
  title: string;
  label: string;
  value: CalculatorFormInput['materialId'];
  options: Material[];
  onChange: (materialId: CalculatorFormInput['materialId']) => void;
};

export type CalculatorAdvancedFieldsModel = {
  labels: CalculatorConfig['labels']['advanced'];
  visibility: CalculatorConfig['advancedSettings'];
  values: CalculatorAdvancedValues;
  onSwellFactorChange: (value: CalculatorEditableNumber) => void;
  onMoistureLevelChange: (value: CalculatorFormInput['moistureLevel']) => void;
  onWetMaterialPercentageChange: (value: CalculatorEditableNumber) => void;
  onCompactionPercentageChange: (value: CalculatorEditableNumber) => void;
  onTruckCapacityTonsChange: (value: CalculatorEditableNumber) => void;
  onHalfLoadChange: (value: boolean) => void;
  onResetDefaults?: () => void;
};

export type CalculatorAdvancedShellModel = {
  title: string;
  note: string;
};

export type CalculatorAdvancedSection = {
  shell: CalculatorAdvancedShellModel;
  content:
    | {
        mode: 'managed';
        statusMessage: string | null;
        fields: CalculatorAdvancedFieldsModel;
      }
    | {
        mode: 'standard';
        enabled: boolean;
        toggleLabel: string;
        inactiveMessage: string;
        onEnabledChange: (value: boolean) => void;
        fields: CalculatorAdvancedFieldsModel | null;
      };
};

export type CalculatorResultCardModel = {
  label: string;
  value: string;
  meta?: string;
  tone: 'primary' | 'muted';
};

export type CalculatorAssumptionItem = {
  label: string;
  value: string;
};

export type CalculatorAssumptionsSection = {
  title: string;
  items: CalculatorAssumptionItem[];
};

export type CalculatorResultsSection = {
  title: string;
  outputDisplay: {
    label: string;
    value: OutputUnitPreference;
    onChange: (value: OutputUnitPreference) => void;
    metricLabel: string;
    imperialLabel: string;
  };
  placeholderMessage: string;
  primaryCards: CalculatorResultCardModel[];
  secondaryCards: CalculatorResultCardModel[];
  assumptions: CalculatorAssumptionsSection | null;
  disclaimer: string;
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
  kind: CalculatorKind;
  config: CalculatorConfig;
  sections: {
    inputPanel: {
      title: string;
      units: CalculatorUnitsSection;
      dimensions: CalculatorDimensionsSection;
      material: CalculatorMaterialSection;
      advanced: CalculatorAdvancedSection;
    };
    results: CalculatorResultsSection;
  };
  state: {
    input: CalculatorFormInput;
    material: Material | undefined;
    normalizedInput: ReturnType<typeof normalizeCalculatorInput>;
    result: CalculatorResult | null;
  };
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
  assumptions: CalculatorAssumptionsSection | null;
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
