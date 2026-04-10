import type { CalculatorKind, MaterialId } from '../types/calculator';

export type CalculatorConfig = {
  kind: CalculatorKind;
  title: string;
  description: string;
  defaultMaterialId: MaterialId;
  allowedMaterialIds: MaterialId[];
  allowSwell: boolean;
  allowCompaction: boolean;
  allowWetToggle: boolean;
  dimensionLabels: {
    length: string;
    width: string;
    depth: string;
  };
  unitHints: {
    metric: string;
    imperial: string;
  };
};

export const calculatorConfigs: Record<CalculatorKind, CalculatorConfig> = {
  excavation: {
    kind: 'excavation',
    title: 'Excavation Volume Calculator',
    description:
      'Estimate excavation volume, weight, and truck loads for excavation projects.',
    defaultMaterialId: 'native-soil',
    allowedMaterialIds: ['native-soil', 'clay'],
    allowSwell: true,
    allowCompaction: false,
    allowWetToggle: true,
    dimensionLabels: {
      length: 'Length',
      width: 'Width',
      depth: 'Depth',
    },
    unitHints: {
      metric: 'Metric (m / m / m)',
      imperial: 'Imperial (ft / ft / in)',
    },
  },
  gravel: {
    kind: 'gravel',
    title: 'Gravel Calculator',
    description:
      'Estimate gravel volume, tonnage, and truck loads for driveways, pads, and base preparation.',
    defaultMaterialId: 'granular-a',
    allowedMaterialIds: ['granular-a', 'granular-b'],
    allowSwell: true,
    allowCompaction: true,
    allowWetToggle: true,
    dimensionLabels: {
      length: 'Length',
      width: 'Width',
      depth: 'Gravel Depth',
    },
    unitHints: {
      metric: 'Metric (m / m / m)',
      imperial: 'Imperial (ft / ft / in)',
    },
  },
  topsoil: {
    kind: 'topsoil',
    title: 'Topsoil Calculator',
    description:
      'Estimate topsoil volume, weight, and truck loads for grading and landscaping projects.',
    defaultMaterialId: 'topsoil',
    allowedMaterialIds: ['topsoil'],
    allowSwell: true,
    allowCompaction: true,
    allowWetToggle: true,
    dimensionLabels: {
      length: 'Length',
      width: 'Width',
      depth: 'Topsoil Depth',
    },
    unitHints: {
      metric: 'Metric (m / m / m)',
      imperial: 'Imperial (ft / ft / in)',
    },
  },
};
