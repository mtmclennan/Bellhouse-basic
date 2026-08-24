import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { CalculatorConfig } from '../config/calculators';
import { normalizeCalculatorInput } from '../logic/normalizeInput';
import type {
  CalculatorDimensionBehavior,
  CalculatorAreaFormInput,
  CalculatorDimensionKey,
  CalculatorDimensionValueField,
  CalculatorEditableNumber,
  CalculatorFormInput,
  CalculatorKind,
  CalculatorNumberField,
  CalculatorPriceMode,
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
  value: CalculatorAreaFormInput[CalculatorDimensionKey];
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

export type CalculatorDimensionAreaModel = {
  id: string;
  title: string;
  fields: CalculatorDimensionFieldModel[];
  onRemove?: () => void;
};

export type CalculatorDimensionsSection = {
  title: string;
  areas: CalculatorDimensionAreaModel[];
  addAreaLabel: string;
  canAddArea: boolean;
  maxAreas: number;
  onAddArea: () => void;
};

export type CalculatorMaterialSection = {
  title: string;
  label: string;
  helperText?: string;
  value: CalculatorFormInput['materialId'];
  options: Material[];
  onChange: (materialId: CalculatorFormInput['materialId']) => void;
};

export type CalculatorCostSection = {
  title: string;
  value: CalculatorEditableNumber;
  mode: CalculatorPriceMode;
  volumeUnitLabel: string;
  onValueChange: (value: CalculatorEditableNumber) => void;
  onModeChange: (mode: Exclude<CalculatorPriceMode, ''>) => void;
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
  toggle: {
    label: string;
    enabled: boolean;
    onChange: (value: boolean) => void;
  };
  /** Called when the advanced-options disclosure transitions closed -> open. */
  onOpen?: () => void;
};

export type CalculatorAdvancedSection = {
  shell: CalculatorAdvancedShellModel;
  content:
    | {
        mode: 'managed';
        enabled: boolean;
        statusMessage: string | null;
        inactiveMessage: string;
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
  id: string;
  label: string;
  value: ReactNode;
  supportingValue?: string;
  meta?: string;
  tone: 'primary' | 'muted';
};

export type CalculatorAssumptionsSection = {
  title: string;
  summary: string;
  items?: string[];
};

export type CalculatorResultsSection = {
  title: string;
  outputDisplay: {
    label: string;
    value: OutputUnitPreference;
    onChange: (value: OutputUnitPreference) => void;
    options: readonly OutputUnitPreference[];
    metricLabel: string;
    imperialLabel: string;
  };
  placeholderMessage: string;
  reference: {
    title: string;
    unitLabel: string;
    rows: Array<{
      id: string;
      label: string;
      adjustment: string;
      weight: string;
      isActive: boolean;
    }>;
  };
  primaryCards: CalculatorResultCardModel[];
  secondaryCards: CalculatorResultCardModel[];
  comparisonRows: Array<{
    id: string;
    label: string;
    metricValue: ReactNode;
    imperialValue: ReactNode;
  }>;
  assumptions: CalculatorAssumptionsSection | null;
  costEstimate: {
    value: string;
    meta: string;
  } | null;
  share: {
    label: string;
    isCopied: boolean;
    onClick: () => void;
  };
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
      material: CalculatorMaterialSection | null;
      cost: CalculatorCostSection;
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
