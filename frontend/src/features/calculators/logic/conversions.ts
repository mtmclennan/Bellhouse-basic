export const FEET_TO_METERS = 0.3048;
export const INCHES_TO_METERS = 0.0254;
export const M3_TO_CUBIC_YARDS = 1.30795;

export function dimensionsToMeters(
  length: number,
  width: number,
  depth: number,
  unitSystem: 'metric' | 'imperial',
) {
  if (unitSystem === 'metric') {
    return { lengthM: length, widthM: width, depthM: depth };
  }

  return {
    lengthM: length * FEET_TO_METERS,
    widthM: width * FEET_TO_METERS,
    depthM: depth * INCHES_TO_METERS,
  };
}

export function m3ToCubicYards(m3: number): number {
  return m3 * M3_TO_CUBIC_YARDS;
}
