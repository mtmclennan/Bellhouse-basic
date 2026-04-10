import type { Material, MaterialId } from '../types/calculator';

export const materials: Material[] = [
  {
    id: 'native-soil',
    name: 'Native Soil',
    densityTonsPerM3: 1.8,
    defaultSwellFactor: 1.2,
    wetDensityMultiplier: 1.08,
  },
  {
    id: 'clay',
    name: 'Clay',
    densityTonsPerM3: 1.9,
    defaultSwellFactor: 1.4,
    wetDensityMultiplier: 1.1,
  },
  {
    id: 'granular-a',
    name: 'Granular A',
    densityTonsPerM3: 2.2,
    defaultCompactionFactor: 1.12,
    defaultSwellFactor: 1.05,
    wetDensityMultiplier: 1.03,
  },
  {
    id: 'granular-b',
    name: 'Granular B',
    densityTonsPerM3: 2.0,
    defaultCompactionFactor: 1.15,
    defaultSwellFactor: 1.05,
    wetDensityMultiplier: 1.03,
  },
  {
    id: 'topsoil',
    name: 'Topsoil',
    densityTonsPerM3: 1.4,
    defaultSwellFactor: 1.25,
    defaultCompactionFactor: 1.05,
    wetDensityMultiplier: 1.1,
  },
];

export function getMaterialById(id: MaterialId) {
  return materials.find((material) => material.id === id);
}
