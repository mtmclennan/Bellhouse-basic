import { formatNumber, formatTruckLoads } from '../utils/format';
import type { CalculatorResult } from '../types/calculator';

type CalculatorResultsProps = {
  result: CalculatorResult | null;
};

export function CalculatorResults({ result }: CalculatorResultsProps) {
  if (!result) {
    return (
      <div className="rounded-2xl border p-6">
        <p>Enter your project details to see estimated results.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-6 space-y-3">
      <h2 className="text-xl font-semibold">Estimated Results</h2>

      <div>
        <strong>Base Volume:</strong> {formatNumber(result.baseVolumeM3)} m³
      </div>

      <div>
        <strong>Adjusted Volume:</strong>{' '}
        {formatNumber(result.adjustedVolumeM3)} m³
      </div>

      <div>
        <strong>Cubic Yards:</strong> {formatNumber(result.cubicYards)} yd³
      </div>

      <div>
        <strong>Estimated Weight:</strong> {formatNumber(result.tons)} tonnes
      </div>

      <div>
        <strong>Estimated Truck Loads:</strong>{' '}
        {formatTruckLoads(result.truckLoads)}
      </div>

      <p className="text-sm text-gray-600">
        Estimates are based on typical material densities and conditions. Actual
        quantities may vary depending on site conditions and material moisture.
      </p>
    </div>
  );
}
