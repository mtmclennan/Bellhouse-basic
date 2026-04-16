export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '0';
  return value.toFixed(digits);
}

export function formatTruckLoads(value: number): string {
  if (!Number.isFinite(value)) return '0';

  const roundedLoads = Math.ceil(value * 2) / 2;

  if (Number.isInteger(roundedLoads)) {
    return roundedLoads.toFixed(0);
  }

  return roundedLoads.toFixed(1);
}

export function formatWholeNumber(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return Math.round(value).toLocaleString('en-US');
}
