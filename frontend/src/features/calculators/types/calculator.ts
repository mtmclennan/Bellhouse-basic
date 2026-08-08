export type UnitSystem = 'metric' | 'imperial';
export type ResolvedOutputUnitPreference = 'metric' | 'imperial';
export type OutputUnitPreference = 'same' | ResolvedOutputUnitPreference | 'both';
export type MetricDimensionUnit = 'm' | 'cm' | 'mm';
export type ImperialDimensionMode = 'feet-inches' | 'inches';
export type MoistureLevel = 'dry' | 'normal' | 'wet';
export type CalculatorPriceMode = '' | 'load' | 'volume';
export type CalculatorWorkflowKind =
  | 'swell-based'
  | 'compaction-based'
  | 'swell-then-compaction';
export type CalculatorVolumeValueSource =
  | 'rawProjectVolumeM3'
  | 'adjustedLooseMaterialVolumeM3'
  | 'adjustedMaterialVolumeM3';

export type CalculatorKind = 'excavation' | 'gravel' | 'topsoil';

export type MaterialId =
  | 'native-soil'
  | 'clay'
  | 'sand'
  | 'silt'
  | 'gravel'
  | 'mixed-fill'
  | 'granular-a'
  | 'granular-b'
  | 'topsoil';

export type Material = {
  id: MaterialId;
  name: string;
  densityTonsPerM3: number;
  defaultSwellFactor?: number;
  defaultMoistureLevel?: MoistureLevel;
  defaultCompactionPercentage?: number;
  defaultWetMaterialPercentage?: number;
};

export type CalculatorEditableNumber = number | '';
export type CalculatorDimensionKey = 'length' | 'width' | 'depth';
export type CalculatorDimensionValueField =
  | 'metricValue'
  | 'feet'
  | 'inches';

export type CalculatorDimensionFormInput = {
  metricValue: CalculatorEditableNumber;
  metricUnit: MetricDimensionUnit;
  feet: CalculatorEditableNumber;
  inches: CalculatorEditableNumber;
};

export type CalculatorAreaFormInput = Record<
  CalculatorDimensionKey,
  CalculatorDimensionFormInput
>;

export type CalculatorDimensionBehavior = {
  defaultMetricUnit: MetricDimensionUnit;
  metricUnits: readonly MetricDimensionUnit[];
  imperialMode: ImperialDimensionMode;
};

export type CalculatorNumberField =
  | 'swellFactor'
  | 'wetMaterialPercentage'
  | 'compactionPercentage'
  | 'truckCapacityTons'
  | 'pricePerUnit';

export type CalculatorToggleField = 'useAdvanced' | 'isHalfLoad';

export type CalculatorSelectField =
  | 'inputUnitSystem'
  | 'outputUnitPreference'
  | 'materialId'
  | 'moistureLevel'
  | 'priceMode';

export type CalculatorFormInput = {
  length: CalculatorDimensionFormInput;
  width: CalculatorDimensionFormInput;
  depth: CalculatorDimensionFormInput;
  additionalAreas: CalculatorAreaFormInput[];
  inputUnitSystem: UnitSystem;
  outputUnitPreference: OutputUnitPreference;
  materialId: MaterialId;
  priceMode: CalculatorPriceMode;
  pricePerUnit: CalculatorEditableNumber;
  moistureLevel: MoistureLevel;
  useAdvanced: boolean;
  swellFactor: CalculatorEditableNumber;
  wetMaterialPercentage: CalculatorEditableNumber;
  compactionPercentage: CalculatorEditableNumber;
  isHalfLoad: boolean;
  truckCapacityTons: CalculatorEditableNumber;
};

export type CalculatorCalculationAreaInput = {
  lengthM: number;
  widthM: number;
  depthM: number;
};

export type CalculatorCalculationInput = {
  lengthM: number;
  widthM: number;
  depthM: number;
  additionalAreas?: CalculatorCalculationAreaInput[];
  materialId: MaterialId;
  useAdvanced: boolean;
  workflowKind: CalculatorWorkflowKind;
  swellFactor?: number;
  wetMaterialPercentage?: number;
  compactionPercentage?: number;
  isHalfLoad: boolean;
  truckCapacityTons?: number;
};

export type CalculatorResult = {
  rawProjectVolumeM3: number;
  adjustedLooseMaterialVolumeM3: number;
  adjustedMaterialVolumeM3: number;
  adjustedWeightTons: number;
  estimatedTruckLoads: number;
};

export type CalculatorField = keyof CalculatorFormInput;
