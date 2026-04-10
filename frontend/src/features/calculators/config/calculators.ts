import type {
  CalculatorDimensionBehavior,
  CalculatorDimensionFormInput,
  CalculatorFormInput,
  CalculatorKind,
  MaterialId,
  OutputUnitPreference,
  MetricDimensionUnit,
  UnitSystem,
} from '../types/calculator';

type CalculatorFieldLabels = {
  inputUnits: string;
  resultDisplay: string;
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

type CalculatorResultDisplaySettings = {
  options: readonly OutputUnitPreference[];
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
  dimensionBehavior: Record<'length' | 'width' | 'depth', CalculatorDimensionBehavior>;
  resultDisplay: CalculatorResultDisplaySettings;
  advancedSettings: CalculatorAdvancedSettingVisibility;
};

function createInitialDimensionInput(
  defaultMetricUnit: MetricDimensionUnit,
): CalculatorDimensionFormInput {
  return {
    metricValue: '',
    metricUnit: defaultMetricUnit,
    feet: '',
    inches: '',
  };
}

export const calculatorConfigs: Record<CalculatorKind, CalculatorConfig> = {
  excavation: {
    kind: 'excavation',
    title: 'Excavation Volume Calculator',
    description:
      'Estimate excavation volume, weight, and truck loads for excavation projects.',
    defaults: {
      materialId: 'native-soil',
      inputUnitSystem: 'metric',
      outputUnitPreference: 'same',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: ['native-soil', 'clay'],
    labels: {
      inputUnits: 'Input Units',
      resultDisplay: 'Result Display',
      material: 'Excavated Material',
      useAdvanced: 'Use advanced excavation settings',
      dimensions: {
        length: 'Excavation Length',
        width: 'Excavation Width',
        depth: 'Excavation Depth',
      },
      advanced: {
        swellFactor: 'Swell Factor',
        wetMaterialPercentage: 'Wet Material Adjustment (%)',
        compactionPercentage: 'Compaction Adjustment (%)',
        truckCapacityTons: 'Truck Capacity (tons)',
        halfLoadToggle: 'Half-load season / road restriction',
      },
    },
    unitHints: {
      metric: 'Metric',
      imperial: 'Imperial',
    },
    dimensionBehavior: {
      length: {
        defaultMetricUnit: 'm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'feet-inches',
      },
      width: {
        defaultMetricUnit: 'm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'feet-inches',
      },
      depth: {
        defaultMetricUnit: 'm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'feet-inches',
      },
    },
    resultDisplay: {
      options: ['same', 'metric', 'imperial', 'both'],
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
      outputUnitPreference: 'same',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: ['granular-a', 'granular-b'],
    labels: {
      inputUnits: 'Input Units',
      resultDisplay: 'Result Display',
      material: 'Aggregate Type',
      useAdvanced: 'Use advanced gravel settings',
      dimensions: {
        length: 'Project Length',
        width: 'Project Width',
        depth: 'Gravel Depth',
      },
      advanced: {
        swellFactor: 'Swell Factor',
        wetMaterialPercentage: 'Wet Material Adjustment (%)',
        compactionPercentage: 'Compaction Adjustment (%)',
        truckCapacityTons: 'Truck Capacity (tons)',
        halfLoadToggle: 'Half-load season / road restriction',
      },
    },
    unitHints: {
      metric: 'Metric',
      imperial: 'Imperial',
    },
    dimensionBehavior: {
      length: {
        defaultMetricUnit: 'm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'feet-inches',
      },
      width: {
        defaultMetricUnit: 'm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'feet-inches',
      },
      depth: {
        defaultMetricUnit: 'mm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'inches',
      },
    },
    resultDisplay: {
      options: ['same', 'metric', 'imperial', 'both'],
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
      outputUnitPreference: 'same',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: ['topsoil'],
    labels: {
      inputUnits: 'Input Units',
      resultDisplay: 'Result Display',
      material: 'Soil Type',
      useAdvanced: 'Use advanced topsoil settings',
      dimensions: {
        length: 'Coverage Length',
        width: 'Coverage Width',
        depth: 'Topsoil Depth',
      },
      advanced: {
        swellFactor: 'Swell Factor',
        wetMaterialPercentage: 'Wet Material Adjustment (%)',
        compactionPercentage: 'Compaction Adjustment (%)',
        truckCapacityTons: 'Truck Capacity (tons)',
        halfLoadToggle: 'Half-load season / road restriction',
      },
    },
    unitHints: {
      metric: 'Metric',
      imperial: 'Imperial',
    },
    dimensionBehavior: {
      length: {
        defaultMetricUnit: 'm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'feet-inches',
      },
      width: {
        defaultMetricUnit: 'm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'feet-inches',
      },
      depth: {
        defaultMetricUnit: 'mm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'inches',
      },
    },
    resultDisplay: {
      options: ['same', 'metric', 'imperial', 'both'],
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

export function getCalculatorConfig(kind: CalculatorKind): CalculatorConfig {
  return calculatorConfigs[kind];
}

export function createCalculatorFormInput(
  config: CalculatorConfig,
): CalculatorFormInput {
  return {
    length: createInitialDimensionInput(
      config.dimensionBehavior.length.defaultMetricUnit,
    ),
    width: createInitialDimensionInput(
      config.dimensionBehavior.width.defaultMetricUnit,
    ),
    depth: createInitialDimensionInput(
      config.dimensionBehavior.depth.defaultMetricUnit,
    ),
    inputUnitSystem: config.defaults.inputUnitSystem,
    outputUnitPreference: config.defaults.outputUnitPreference,
    materialId: config.defaults.materialId,
    useAdvanced: false,
    swellFactor: '',
    wetMaterialPercentage: '',
    compactionPercentage: '',
    isHalfLoad: false,
    truckCapacityTons: config.defaults.truckCapacityTons,
  };
}
