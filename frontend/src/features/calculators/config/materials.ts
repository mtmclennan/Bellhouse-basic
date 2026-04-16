import type { Material, MaterialId } from '../types/calculator';

export const excavationMaterialIds = [
  'native-soil',
  'clay',
  'sand',
  'silt',
  'topsoil',
  'gravel',
  'mixed-fill',
] as const satisfies readonly MaterialId[];

export const materials: Material[] = [
  {
    id: 'native-soil',
    name: 'Native Soil',
    densityTonsPerM3: 1.85,
    defaultSwellFactor: 1.2,
    defaultMoistureLevel: 'normal',
    defaultWetMaterialPercentage: 8,
  },
  {
    id: 'clay',
    name: 'Clay',
    densityTonsPerM3: 2.0,
    defaultSwellFactor: 1.4,
    defaultMoistureLevel: 'normal',
    defaultWetMaterialPercentage: 12,
  },
  {
    id: 'sand',
    name: 'Sand',
    densityTonsPerM3: 1.6,
    defaultSwellFactor: 1.12,
    defaultMoistureLevel: 'dry',
    defaultWetMaterialPercentage: 3,
  },
  {
    id: 'silt',
    name: 'Silt',
    densityTonsPerM3: 1.75,
    defaultSwellFactor: 1.3,
    defaultMoistureLevel: 'normal',
    defaultWetMaterialPercentage: 9,
  },
  {
    id: 'gravel',
    name: 'Gravel',
    densityTonsPerM3: 1.95,
    defaultSwellFactor: 1.1,
    defaultMoistureLevel: 'normal',
    defaultWetMaterialPercentage: 3,
  },
  {
    id: 'mixed-fill',
    name: 'Mixed Fill',
    densityTonsPerM3: 1.9,
    defaultSwellFactor: 1.2,
    defaultMoistureLevel: 'normal',
    defaultWetMaterialPercentage: 7,
  },
  {
    id: 'granular-a',
    name: 'Granular A',
    densityTonsPerM3: 2.2,
    defaultCompactionPercentage: 12,
    defaultSwellFactor: 1.05,
    defaultMoistureLevel: 'normal',
    defaultWetMaterialPercentage: 3,
  },
  {
    id: 'granular-b',
    name: 'Granular B',
    densityTonsPerM3: 2.0,
    defaultCompactionPercentage: 15,
    defaultSwellFactor: 1.05,
    defaultMoistureLevel: 'normal',
    defaultWetMaterialPercentage: 3,
  },
  {
    id: 'topsoil',
    name: 'Topsoil',
    densityTonsPerM3: 1.35,
    defaultSwellFactor: 1.25,
    defaultMoistureLevel: 'normal',
    defaultCompactionPercentage: 5,
    defaultWetMaterialPercentage: 10,
  },
];

export function getMaterialById(id: MaterialId) {
  return materials.find((material) => material.id === id);
}

export function getMaterialsByIds(ids: readonly MaterialId[]): Material[] {
  return ids.flatMap((id) => {
    const material = getMaterialById(id);
    return material ? [material] : [];
  });
}
