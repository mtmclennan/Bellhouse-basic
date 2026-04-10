export type UnitSystem = 'metric' | 'imperial';

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
  defaultCompactionFactor?: number;
  wetDensityMultiplier?: number;
};

export type CalculatorInput = {
  length: number | '';
  width: number | '';
  depth: number | '';
  unitSystem: UnitSystem;
  materialId: MaterialId;
  useAdvanced: boolean;
  swellFactor?: number | '';
  compactionFactor?: number | '';
  isWet: boolean;
  truckCapacityTons?: number | '';
};

export type CalculatorResult = {
  baseVolumeM3: number;
  adjustedVolumeM3: number;
  tons: number;
  truckLoads: number;
  cubicYards: number;
};

export type CalculatorField = keyof CalculatorInput;

export type UpdateCalculatorField = <K extends CalculatorField>(
  field: K,
  value: CalculatorInput[K],
) => void;
