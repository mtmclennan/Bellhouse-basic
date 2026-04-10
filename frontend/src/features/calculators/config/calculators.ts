import type {
  CalculatorKind,
  MaterialId,
  OutputUnitPreference,
  UnitSystem,
} from '../types/calculator';

type CalculatorFieldLabels = {
  inputUnits: string;
  outputUnits: string;
  material: string;
  useAdvanced: string;
  dimensions: {
    length: string;
    width: string;
    depth: string;
  };
  advanced: {
    swellFactor: string;
    wetMaterialPercentage: string;
    compactionPercentage: string;
    truckCapacityTons: string;
    halfLoadToggle: string;
  };
};

type CalculatorAdvancedSettingVisibility = {
  swellFactor: boolean;
  wetMaterialPercentage: boolean;
  compactionPercentage: boolean;
  truckCapacityTons: boolean;
  halfLoadToggle: boolean;
};

type CalculatorDefaults = {
  materialId: MaterialId;
  inputUnitSystem: UnitSystem;
  outputUnitPreference: OutputUnitPreference;
  truckCapacityTons: number;
};

export type CalculatorConfig = {
  kind: CalculatorKind;
  title: string;
  description: string;
  defaults: CalculatorDefaults;
  allowedMaterialIds: readonly MaterialId[];
  labels: CalculatorFieldLabels;
  unitHints: {
    metric: string;
    imperial: string;
  };
  advancedSettings: CalculatorAdvancedSettingVisibility;
};

export const calculatorConfigs: Record<CalculatorKind, CalculatorConfig> = {
  excavation: {
    kind: 'excavation',
    title: 'Excavation Volume Calculator',
    description:
      'Estimate excavation volume, weight, and truck loads for excavation projects.',
    defaults: {
      materialId: 'native-soil',
      inputUnitSystem: 'metric',
      outputUnitPreference: 'both',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: ['native-soil', 'clay'],
    labels: {
      inputUnits: 'Input Units',
      outputUnits: 'Output Units',
      material: 'Excavated Material',
      useAdvanced: 'Use advanced excavation settings',
      dimensions: {
        length: 'Excavation Length',
        width: 'Excavation Width',
        depth: 'Excavation Depth',
      },
      advanced: {
        swellFactor: 'Swell Factor',
        wetMaterialPercentage: 'Wet Material Percentage (%)',
        compactionPercentage: 'Compaction Percentage (%)',
        truckCapacityTons: 'Truck Capacity (tonnes)',
        halfLoadToggle: 'Half-load season / road restriction',
      },
    },
    unitHints: {
      metric: 'Metric (m / m / m)',
      imperial: 'Imperial (ft / ft / in)',
    },
    advancedSettings: {
      swellFactor: true,
      wetMaterialPercentage: true,
      compactionPercentage: true,
      truckCapacityTons: true,
      halfLoadToggle: true,
    },
  },
  gravel: {
    kind: 'gravel',
    title: 'Gravel Calculator',
    description:
      'Estimate gravel volume, tonnage, and truck loads for driveways, pads, and base preparation.',
    defaults: {
      materialId: 'granular-a',
      inputUnitSystem: 'metric',
      outputUnitPreference: 'both',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: ['granular-a', 'granular-b'],
    labels: {
      inputUnits: 'Input Units',
      outputUnits: 'Output Units',
      material: 'Aggregate Type',
      useAdvanced: 'Use advanced gravel settings',
      dimensions: {
        length: 'Project Length',
        width: 'Project Width',
        depth: 'Gravel Depth',
      },
      advanced: {
        swellFactor: 'Swell Factor',
        wetMaterialPercentage: 'Wet Material Percentage (%)',
        compactionPercentage: 'Compaction Percentage (%)',
        truckCapacityTons: 'Truck Capacity (tonnes)',
        halfLoadToggle: 'Half-load season / road restriction',
      },
    },
    unitHints: {
      metric: 'Metric (m / m / m)',
      imperial: 'Imperial (ft / ft / in)',
    },
    advancedSettings: {
      swellFactor: true,
      wetMaterialPercentage: true,
      compactionPercentage: true,
      truckCapacityTons: true,
      halfLoadToggle: true,
    },
  },
  topsoil: {
    kind: 'topsoil',
    title: 'Topsoil Calculator',
    description:
      'Estimate topsoil volume, weight, and truck loads for grading and landscaping projects.',
    defaults: {
      materialId: 'topsoil',
      inputUnitSystem: 'metric',
      outputUnitPreference: 'both',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: ['topsoil'],
    labels: {
      inputUnits: 'Input Units',
      outputUnits: 'Output Units',
      material: 'Soil Type',
      useAdvanced: 'Use advanced topsoil settings',
      dimensions: {
        length: 'Coverage Length',
        width: 'Coverage Width',
        depth: 'Topsoil Depth',
      },
      advanced: {
        swellFactor: 'Swell Factor',
        wetMaterialPercentage: 'Wet Material Percentage (%)',
        compactionPercentage: 'Compaction Percentage (%)',
        truckCapacityTons: 'Truck Capacity (tonnes)',
        halfLoadToggle: 'Half-load season / road restriction',
      },
    },
    unitHints: {
      metric: 'Metric (m / m / m)',
      imperial: 'Imperial (ft / ft / in)',
    },
    advancedSettings: {
      swellFactor: true,
      wetMaterialPercentage: true,
      compactionPercentage: true,
      truckCapacityTons: true,
      halfLoadToggle: true,
    },
  },
};
