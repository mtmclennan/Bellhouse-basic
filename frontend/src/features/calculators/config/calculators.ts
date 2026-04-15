import type {
  CalculatorDimensionBehavior,
  CalculatorDimensionKey,
  CalculatorDimensionFormInput,
  CalculatorFormInput,
  CalculatorKind,
  MaterialId,
  OutputUnitPreference,
  MetricDimensionUnit,
  UnitSystem,
} from '../types/calculator';
import { getMaterialById } from './materials';
import { getMaterialDefaultAssumptions } from '../logic/calculator';

type CalculatorFieldLabels = {
  inputUnits: string;
  resultDisplay: string;
  material: string;
  useAdvanced: string;
  dimensions: Record<CalculatorDimensionKey, string>;
  advanced: {
    swellFactor: string;
    moistureLevel: string;
    wetMaterialPercentage: string;
    compactionPercentage: string;
    truckCapacityTons: string;
    halfLoadToggle: string;
  };
};

type CalculatorAdvancedSettingVisibility = {
  swellFactor: boolean;
  moistureLevel: boolean;
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

type CalculatorResultPresentation = {
  volumeLabel: string;
  adjustedVolumeLabel?: string;
  weightLabel: string;
  truckLoadsLabel: string;
  secondaryVolumeLabel?: string;
  showCardMeta: boolean;
};

export type CalculatorConfig = {
  kind: CalculatorKind;
  title: string;
  description: string;
  defaults: CalculatorDefaults;
  allowedMaterialIds: readonly MaterialId[];
  labels: CalculatorFieldLabels;
  dimensionKeys: readonly CalculatorDimensionKey[];
  unitHints: {
    metric: string;
    imperial: string;
  };
  dimensionBehavior: Record<'length' | 'width' | 'depth', CalculatorDimensionBehavior>;
  resultDisplay: CalculatorResultDisplaySettings;
  resultPresentation: CalculatorResultPresentation;
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
      outputUnitPreference: 'metric',
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
        swellFactor: 'Swell factor',
        moistureLevel: 'Moisture level',
        wetMaterialPercentage: 'Moisture level',
        compactionPercentage: 'Compaction adjustment (%)',
        truckCapacityTons: 'Truck payload (tons)',
        halfLoadToggle: 'Half-load restrictions',
      },
    },
    dimensionKeys: ['length', 'width', 'depth'],
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
      options: ['metric', 'imperial'],
    },
    resultPresentation: {
      volumeLabel: 'Excavation volume',
      adjustedVolumeLabel: 'Estimated loose material',
      weightLabel: 'Estimated weight',
      truckLoadsLabel: 'Estimated truck loads',
      showCardMeta: false,
    },
    advancedSettings: {
      swellFactor: true,
      moistureLevel: true,
      wetMaterialPercentage: false,
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
      outputUnitPreference: 'metric',
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
        moistureLevel: 'Moisture level',
        wetMaterialPercentage: 'Wet Material Adjustment (%)',
        compactionPercentage: 'Compaction Adjustment (%)',
        truckCapacityTons: 'Truck Capacity (tons)',
        halfLoadToggle: 'Half-load season / road restriction',
      },
    },
    dimensionKeys: ['length', 'width', 'depth'],
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
      options: ['metric', 'imperial'],
    },
    resultPresentation: {
      volumeLabel: 'Estimated volume',
      weightLabel: 'Estimated weight',
      truckLoadsLabel: 'Estimated truck loads',
      secondaryVolumeLabel: 'Base volume',
      showCardMeta: true,
    },
    advancedSettings: {
      swellFactor: true,
      moistureLevel: false,
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
      outputUnitPreference: 'metric',
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
        moistureLevel: 'Moisture level',
        wetMaterialPercentage: 'Wet Material Adjustment (%)',
        compactionPercentage: 'Compaction Adjustment (%)',
        truckCapacityTons: 'Truck Capacity (tons)',
        halfLoadToggle: 'Half-load season / road restriction',
      },
    },
    dimensionKeys: ['length', 'width', 'depth'],
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
      options: ['metric', 'imperial'],
    },
    resultPresentation: {
      volumeLabel: 'Estimated volume',
      weightLabel: 'Estimated weight',
      truckLoadsLabel: 'Estimated truck loads',
      secondaryVolumeLabel: 'Base volume',
      showCardMeta: true,
    },
    advancedSettings: {
      swellFactor: true,
      moistureLevel: false,
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
  const defaultMaterial = getMaterialById(config.defaults.materialId);
  const materialDefaults = defaultMaterial
    ? getMaterialDefaultAssumptions(
        config.kind,
        defaultMaterial,
        config.defaults.truckCapacityTons,
      )
    : {
        swellFactor: 1,
        moistureLevel: 'normal' as const,
        wetMaterialPercentage: 0,
        compactionPercentage: 0,
        truckCapacityTons: config.defaults.truckCapacityTons,
        isHalfLoad: false,
      };

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
    moistureLevel: materialDefaults.moistureLevel,
    useAdvanced: false,
    swellFactor: materialDefaults.swellFactor,
    wetMaterialPercentage: config.advancedSettings.wetMaterialPercentage
      ? materialDefaults.wetMaterialPercentage
      : '',
    compactionPercentage: materialDefaults.compactionPercentage,
    isHalfLoad: materialDefaults.isHalfLoad,
    truckCapacityTons: materialDefaults.truckCapacityTons,
  };
}
