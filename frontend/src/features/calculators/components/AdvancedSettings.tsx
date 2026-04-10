import type {
  CalculatorInput,
  UpdateCalculatorField,
} from '../types/calculator';

type AdvancedSettingsProps = {
  swellFactor?: CalculatorInput['swellFactor'];
  compactionFactor?: CalculatorInput['compactionFactor'];
  isWet: CalculatorInput['isWet'];
  truckCapacityTons?: CalculatorInput['truckCapacityTons'];
  onChange: UpdateCalculatorField;
  allowSwell: boolean;
  allowCompaction: boolean;
  allowWetToggle: boolean;
};

export function AdvancedSettings({
  swellFactor,
  compactionFactor,
  isWet,
  truckCapacityTons,
  onChange,
  allowSwell,
  allowCompaction,
  allowWetToggle,
}: AdvancedSettingsProps) {
  return (
    <div className="rounded-2xl border p-4 space-y-4">
      <h3 className="font-semibold">Advanced Settings</h3>

      {allowSwell && (
        <label className="block">
          <span className="block mb-1">Swell Factor</span>
          <input
            type="number"
            step="0.01"
            value={swellFactor ?? ''}
            onChange={(e) =>
              onChange(
                'swellFactor',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className="w-full rounded border px-3 py-2"
          />
        </label>
      )}

      {allowCompaction && (
        <label className="block">
          <span className="block mb-1">Compaction Factor</span>
          <input
            type="number"
            step="0.01"
            value={compactionFactor ?? ''}
            onChange={(e) =>
              onChange(
                'compactionFactor',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className="w-full rounded border px-3 py-2"
          />
        </label>
      )}

      {allowWetToggle && (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isWet}
            onChange={(e) => onChange('isWet', e.target.checked)}
          />
          <span>Material is wet</span>
        </label>
      )}

      <label className="block">
        <span className="block mb-1">Truck Capacity (tonnes)</span>
        <input
          type="number"
          step="0.1"
          value={truckCapacityTons ?? ''}
          onChange={(e) =>
            onChange(
              'truckCapacityTons',
              e.target.value === '' ? '' : Number(e.target.value),
            )
          }
          className="w-full rounded border px-3 py-2"
        />
      </label>
    </div>
  );
}
