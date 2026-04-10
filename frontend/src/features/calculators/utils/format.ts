export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '0';
  return value.toFixed(digits);
}

export function formatTruckLoads(value: number): string {
  if (!Number.isFinite(value)) return '0';
  return value < 1 ? value.toFixed(1) : value.toFixed(2);
}
