import type { Material, MaterialId } from '../types/calculator';

export const materials: Material[] = [
  {
    id: 'native-soil',
    name: 'Native Soil',
    densityTonsPerM3: 1.8,
    defaultSwellFactor: 1.2,
    defaultWetMaterialPercentage: 8,
  },
  {
    id: 'clay',
    name: 'Clay',
    densityTonsPerM3: 1.9,
    defaultSwellFactor: 1.4,
    defaultWetMaterialPercentage: 10,
  },
  {
    id: 'granular-a',
    name: 'Granular A',
    densityTonsPerM3: 2.2,
    defaultCompactionPercentage: 12,
    defaultSwellFactor: 1.05,
    defaultWetMaterialPercentage: 3,
  },
  {
    id: 'granular-b',
    name: 'Granular B',
    densityTonsPerM3: 2.0,
    defaultCompactionPercentage: 15,
    defaultSwellFactor: 1.05,
    defaultWetMaterialPercentage: 3,
  },
  {
    id: 'topsoil',
    name: 'Topsoil',
    densityTonsPerM3: 1.4,
    defaultSwellFactor: 1.25,
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
