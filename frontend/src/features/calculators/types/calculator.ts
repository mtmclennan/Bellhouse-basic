export type UnitSystem = 'metric' | 'imperial';
export type OutputUnitPreference = 'metric' | 'imperial' | 'both';

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
  defaultCompactionPercentage?: number;
  defaultWetMaterialPercentage?: number;
};

export type CalculatorEditableNumber = number | '';

export type CalculatorNumberField =
  | 'length'
  | 'width'
  | 'depth'
  | 'swellFactor'
  | 'wetMaterialPercentage'
  | 'compactionPercentage'
  | 'truckCapacityTons';

export type CalculatorToggleField = 'useAdvanced' | 'isHalfLoad';

export type CalculatorSelectField =
  | 'inputUnitSystem'
  | 'outputUnitPreference'
  | 'materialId';

export type CalculatorFormInput = {
  length: CalculatorEditableNumber;
  width: CalculatorEditableNumber;
  depth: CalculatorEditableNumber;
  inputUnitSystem: UnitSystem;
  outputUnitPreference: OutputUnitPreference;
  materialId: MaterialId;
  useAdvanced: boolean;
  swellFactor: CalculatorEditableNumber;
  wetMaterialPercentage: CalculatorEditableNumber;
  compactionPercentage: CalculatorEditableNumber;
  isHalfLoad: boolean;
  truckCapacityTons: CalculatorEditableNumber;
};

export type CalculatorCalculationInput = {
  length: number;
  width: number;
  depth: number;
  inputUnitSystem: UnitSystem;
  materialId: MaterialId;
  useAdvanced: boolean;
  swellFactor?: number;
  wetMaterialPercentage?: number;
  compactionPercentage?: number;
  isHalfLoad: boolean;
  truckCapacityTons?: number;
};

export type CalculatorResult = {
  baseVolumeM3: number;
  adjustedVolumeM3: number;
  tons: number;
  truckLoads: number;
  cubicYards: number;
};

export type CalculatorField = keyof CalculatorFormInput;
