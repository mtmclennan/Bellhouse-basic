export type UnitSystem = 'metric' | 'imperial';
export type OutputUnitPreference = 'metric' | 'imperial';
export type MetricDimensionUnit = 'm' | 'cm' | 'mm';
export type ImperialDimensionMode = 'feet-inches' | 'inches';
export type MoistureLevel = 'dry' | 'normal' | 'wet';

export type CalculatorKind = 'excavation' | 'gravel' | 'topsoil';

export type MaterialId =
  | 'native-soil'
  | 'clay'
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

export type CalculatorDimensionBehavior = {
  defaultMetricUnit: MetricDimensionUnit;
  metricUnits: readonly MetricDimensionUnit[];
  imperialMode: ImperialDimensionMode;
};

export type CalculatorNumberField =
  | 'swellFactor'
  | 'wetMaterialPercentage'
  | 'compactionPercentage'
  | 'truckCapacityTons';

export type CalculatorToggleField = 'useAdvanced' | 'isHalfLoad';

export type CalculatorSelectField =
  | 'inputUnitSystem'
  | 'outputUnitPreference'
  | 'materialId'
  | 'moistureLevel';

export type CalculatorFormInput = {
  length: CalculatorDimensionFormInput;
  width: CalculatorDimensionFormInput;
  depth: CalculatorDimensionFormInput;
  inputUnitSystem: UnitSystem;
  outputUnitPreference: OutputUnitPreference;
  materialId: MaterialId;
  moistureLevel: MoistureLevel;
  useAdvanced: boolean;
  swellFactor: CalculatorEditableNumber;
  wetMaterialPercentage: CalculatorEditableNumber;
  compactionPercentage: CalculatorEditableNumber;
  isHalfLoad: boolean;
  truckCapacityTons: CalculatorEditableNumber;
};

export type CalculatorCalculationInput = {
  lengthM: number;
  widthM: number;
  depthM: number;
  materialId: MaterialId;
  useAdvanced: boolean;
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
