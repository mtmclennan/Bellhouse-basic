import type { MetricDimensionUnit } from '../types/calculator';

export const FEET_TO_METERS = 0.3048;
export const INCHES_TO_METERS = 0.0254;
export const M3_TO_CUBIC_YARDS = 1.30795;
export const TONNES_TO_SHORT_TONS = 1.10231;
export const TONNES_TO_KILOGRAMS = 1000;
export const TONNES_TO_POUNDS = 2204.62;

const METRIC_UNIT_TO_METERS: Record<MetricDimensionUnit, number> = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
};

export function metricDimensionToMeters(
  value: number,
  unit: MetricDimensionUnit,
): number {
  return value * METRIC_UNIT_TO_METERS[unit];
}

export function feetAndInchesToMeters(feet: number, inches: number): number {
  return feet * FEET_TO_METERS + inches * INCHES_TO_METERS;
}

export function inchesToMeters(inches: number): number {
  return inches * INCHES_TO_METERS;
}

export function m3ToCubicYards(m3: number): number {
  return m3 * M3_TO_CUBIC_YARDS;
}

export function tonnesToShortTons(tonnes: number): number {
  return tonnes * TONNES_TO_SHORT_TONS;
}

export function tonnesToKilograms(tonnes: number): number {
  return tonnes * TONNES_TO_KILOGRAMS;
}

export function tonnesToPounds(tonnes: number): number {
  return tonnes * TONNES_TO_POUNDS;
}
