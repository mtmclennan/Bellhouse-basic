import type {
  CalculatorDimensionBehavior,
  CalculatorDimensionKey,
  CalculatorAreaFormInput,
  CalculatorDimensionFormInput,
  CalculatorFormInput,
  CalculatorKind,
  CalculatorVolumeValueSource,
  CalculatorWorkflowKind,
  MaterialId,
  OutputUnitPreference,
  ResolvedOutputUnitPreference,
  MetricDimensionUnit,
  UnitSystem,
} from '../types/calculator';
import { excavationMaterialIds, getMaterialById } from './materials';
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

type CalculatorResultCardId =
  | 'volume'
  | 'adjustedVolume'
  | 'weight'
  | 'truckLoads'
  | 'secondaryVolume';

type CalculatorResultPresentation = {
  volumeLabel: string;
  volumeValueSource: CalculatorVolumeValueSource;
  volumeSupportingText?: string;
  adjustedVolumeLabel?: string;
  adjustedVolumeValueSource?: CalculatorVolumeValueSource;
  adjustedVolumeSupportingText?: string;
  weightLabel: string;
  weightSupportingText?: string;
  truckLoadsLabel: string;
  truckLoadsSupportingText?: string;
  secondaryVolumeLabel?: string;
  secondaryVolumeValueSource?: CalculatorVolumeValueSource;
  secondaryVolumeSupportingText?: string;
  defaultPrimaryCardIds: readonly CalculatorResultCardId[];
  primaryCardIds: readonly CalculatorResultCardId[];
  secondaryCardIds?: readonly CalculatorResultCardId[];
  showCardMeta: boolean;
};

type CalculatorWorkflow = {
  kind: CalculatorWorkflowKind;
};

type CalculatorSectionCopy = {
  inputPanelTitle: string;
  dimensionsTitle: string;
  materialTitle: string;
  materialHelperText?: string;
  advancedTitle: string;
  advancedNote: string;
  advancedInactiveMessage: string;
  resultsTitle: string;
  resultsPlaceholder: string;
  disclaimer: string;
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
  workflow: CalculatorWorkflow;
  resultDisplay: CalculatorResultDisplaySettings;
  resultPresentation: CalculatorResultPresentation;
  advancedSettings: CalculatorAdvancedSettingVisibility;
  sectionCopy: CalculatorSectionCopy;
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

export const MAX_CALCULATOR_AREAS = 6;

export function createCalculatorAreaFormInput(
  config: Pick<CalculatorConfig, 'dimensionBehavior'>,
): CalculatorAreaFormInput {
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
  };
}
export const calculatorConfigs: Record<CalculatorKind, CalculatorConfig> = {
  excavation: {
    kind: 'excavation',
    title: 'Excavation Calculator',
    description:
      'Estimate cut volume, loose haul-out, tonnage, and truck loads for excavation work.',
    defaults: {
      materialId: 'native-soil',
      inputUnitSystem: 'metric',
      outputUnitPreference: 'same',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: excavationMaterialIds,
    labels: {
      inputUnits: 'Enter dimensions in',
      resultDisplay: 'Show results in',
      material: 'Material to haul',
      useAdvanced: 'Use advanced features',
      dimensions: {
        length: 'Cut Length',
        width: 'Cut Width',
        depth: 'Cut Depth',
      },
      advanced: {
        swellFactor: 'Swell factor',
        moistureLevel: 'Moisture level',
        wetMaterialPercentage: 'Moisture level',
        compactionPercentage: 'Compaction adjustment (%)',
        truckCapacityTons: 'Legal truck payload (metric tonnes)',
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
        defaultMetricUnit: 'm',
        metricUnits: ['m', 'cm', 'mm'],
        imperialMode: 'feet-inches',
      },
    },
    workflow: {
      kind: 'swell-based',
    },
    resultDisplay: {
      options: ['same', 'imperial', 'metric', 'both'],
    },
    resultPresentation: {
      volumeLabel: 'In-place volume',
      volumeValueSource: 'rawProjectVolumeM3',
      volumeSupportingText: 'Bank measure',
      adjustedVolumeLabel: 'Loose (hauled)',
      adjustedVolumeValueSource: 'adjustedLooseMaterialVolumeM3',
      adjustedVolumeSupportingText: 'After material swell',
      weightLabel: 'Material weight',
      weightSupportingText: 'Based on density and moisture',
      truckLoadsLabel: 'Truck loads',
      truckLoadsSupportingText: 'Based on effective legal payload',
      defaultPrimaryCardIds: ['volume', 'adjustedVolume', 'truckLoads', 'weight'],
      primaryCardIds: ['volume', 'adjustedVolume', 'truckLoads', 'weight'],
      showCardMeta: false,
    },
    advancedSettings: {
      swellFactor: true,
      moistureLevel: true,
      wetMaterialPercentage: false,
      compactionPercentage: false,
      truckCapacityTons: true,
      halfLoadToggle: true,
    },
    sectionCopy: {
      inputPanelTitle: 'Excavation details',
      dimensionsTitle: 'Cut dimensions',
      materialTitle: 'Material to haul',
      materialHelperText:
        'Excavated material expands when broken loose, so swell affects loose volume and hauling.',
      advancedTitle: 'Advanced features',
      advancedNote: 'Swell, moisture, and hauling limits for removed material.',
      advancedInactiveMessage:
        'Turn on advanced features to adjust swell, moisture, truck payload, and half-load mode.',
      resultsTitle: 'Excavation estimate',
      resultsPlaceholder:
        'Enter length, width, and depth to see volume, truck loads, and weight.',
      disclaimer:
        'Estimates only. Actual site conditions, access, and hauling limits affect final quantities.',
    },
  },
  gravel: {
    kind: 'gravel',
    title: 'Gravel Calculator',
    description:
      'Estimate imported aggregate volume, tonnage, and truck loads for pads, lanes, and base prep.',
    defaults: {
      materialId: 'granular-a',
      inputUnitSystem: 'metric',
      outputUnitPreference: 'same',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: ['granular-a', 'granular-b'],
    labels: {
      inputUnits: 'Enter dimensions in',
      resultDisplay: 'Show results in',
      material: 'Aggregate type',
      useAdvanced: 'Use advanced features',
      dimensions: {
        length: 'Area Length',
        width: 'Area Width',
        depth: 'Gravel Depth',
      },
      advanced: {
        swellFactor: 'Swell factor',
        moistureLevel: 'Moisture level',
        wetMaterialPercentage: 'Wet material adjustment (%)',
        compactionPercentage: 'Compaction adjustment (%)',
        truckCapacityTons: 'Legal truck payload (metric tonnes)',
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
    workflow: {
      kind: 'compaction-based',
    },
    resultDisplay: {
      options: ['same', 'imperial', 'metric', 'both'],
    },
    resultPresentation: {
      volumeLabel: 'Compacted base volume',
      volumeValueSource: 'adjustedMaterialVolumeM3',
      volumeSupportingText: 'Placed and compacted volume',
      weightLabel: 'Material weight',
      weightSupportingText: 'Based on density and moisture',
      truckLoadsLabel: 'Truck loads',
      truckLoadsSupportingText: 'Based on effective legal payload',
      secondaryVolumeLabel: 'Base volume',
      secondaryVolumeValueSource: 'rawProjectVolumeM3',
      secondaryVolumeSupportingText: 'Before compaction allowance',
      defaultPrimaryCardIds: ['volume', 'truckLoads', 'weight'],
      primaryCardIds: ['volume', 'truckLoads', 'weight'],
      secondaryCardIds: ['secondaryVolume'],
      showCardMeta: true,
    },
    advancedSettings: {
      swellFactor: false,
      moistureLevel: false,
      wetMaterialPercentage: true,
      compactionPercentage: true,
      truckCapacityTons: true,
      halfLoadToggle: true,
    },
    sectionCopy: {
      inputPanelTitle: 'Gravel details',
      dimensionsTitle: 'Area and depth',
      materialTitle: 'Aggregate',
      advancedTitle: 'Advanced features',
      advancedNote: 'Compaction, moisture, and hauling adjustments.',
      advancedInactiveMessage:
        'Turn on advanced features to adjust compaction, wet material, truck payload, and half-load mode.',
      resultsTitle: 'Material estimate',
      resultsPlaceholder:
        'Enter length, width, and depth to see material volume, truck loads, and weight.',
      disclaimer:
        'Estimates only. Subgrade conditions, compaction, and delivery access affect final quantities.',
    },
  },
  topsoil: {
    kind: 'topsoil',
    title: 'Topsoil Calculator',
    description:
      'Estimate topsoil coverage volume, tonnage, and truck loads for finish grading and placement.',
    defaults: {
      materialId: 'topsoil',
      inputUnitSystem: 'metric',
      outputUnitPreference: 'same',
      truckCapacityTons: 21.5,
    },
    allowedMaterialIds: ['topsoil'],
    labels: {
      inputUnits: 'Enter dimensions in',
      resultDisplay: 'Show results in',
      material: 'Topsoil type',
      useAdvanced: 'Use advanced features',
      dimensions: {
        length: 'Coverage Length',
        width: 'Coverage Width',
        depth: 'Topsoil Depth',
      },
      advanced: {
        swellFactor: 'Swell factor',
        moistureLevel: 'Moisture level',
        wetMaterialPercentage: 'Wet material adjustment (%)',
        compactionPercentage: 'Compaction adjustment (%)',
        truckCapacityTons: 'Legal truck payload (metric tonnes)',
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
    workflow: {
      kind: 'compaction-based',
    },
    resultDisplay: {
      options: ['same', 'imperial', 'metric', 'both'],
    },
    resultPresentation: {
      volumeLabel: 'Placed topsoil volume',
      volumeValueSource: 'adjustedMaterialVolumeM3',
      volumeSupportingText: 'Placed finish volume',
      weightLabel: 'Material weight',
      weightSupportingText: 'Based on density and moisture',
      truckLoadsLabel: 'Truck loads',
      truckLoadsSupportingText: 'Based on effective legal payload',
      secondaryVolumeLabel: 'Area volume',
      secondaryVolumeValueSource: 'rawProjectVolumeM3',
      secondaryVolumeSupportingText: 'Before finish allowance',
      defaultPrimaryCardIds: ['volume', 'truckLoads', 'weight'],
      primaryCardIds: ['volume', 'truckLoads', 'weight'],
      secondaryCardIds: ['secondaryVolume'],
      showCardMeta: true,
    },
    advancedSettings: {
      swellFactor: false,
      moistureLevel: false,
      wetMaterialPercentage: true,
      compactionPercentage: true,
      truckCapacityTons: true,
      halfLoadToggle: true,
    },
    sectionCopy: {
      inputPanelTitle: 'Topsoil details',
      dimensionsTitle: 'Coverage and depth',
      materialTitle: 'Material',
      advancedTitle: 'Advanced features',
      advancedNote: 'Compaction, moisture, and hauling adjustments.',
      advancedInactiveMessage:
        'Turn on advanced features to adjust compaction, wet material, truck payload, and half-load mode.',
      resultsTitle: 'Material estimate',
      resultsPlaceholder:
        'Enter length, width, and depth to see placed volume, truck loads, and weight.',
      disclaimer:
        'Estimates only. Existing grade, cleanup, moisture, and finish depth affect final quantities.',
    },
  },
};

export function getCalculatorConfig(kind: CalculatorKind): CalculatorConfig {
  return calculatorConfigs[kind];
}

export function resolveOutputUnitPreference(
  outputUnitPreference: OutputUnitPreference,
  inputUnitSystem: ResolvedOutputUnitPreference,
): ResolvedOutputUnitPreference {
  if (outputUnitPreference === 'same' || outputUnitPreference === 'both') {
    return inputUnitSystem;
  }

  return outputUnitPreference;
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

  const initialArea = createCalculatorAreaFormInput(config);

  return {
    ...initialArea,
    additionalAreas: [],
    inputUnitSystem: config.defaults.inputUnitSystem,
    outputUnitPreference: config.defaults.outputUnitPreference,
    materialId: config.defaults.materialId,
    priceMode: '',
    pricePerUnit: '',
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
