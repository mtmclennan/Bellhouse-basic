'use client';

import { useMemo, useState } from 'react';
import { materials, getMaterialById } from '../config/materials';
import { calculateProjectMaterial } from '../logic/calculator';
import { CalculatorResults } from './CalculatorResults';
import { AdvancedSettings } from './AdvancedSettings';
import type {
  CalculatorKind,
  CalculatorInput,
  UpdateCalculatorField,
} from '../types/calculator';
import { calculatorConfigs } from '../config/calculators';
import { normalizeCalculatorInput } from '../logic/normalizeInput';

type CalculatorFormProps = {
  kind: CalculatorKind;
};

export function CalculatorForm({ kind }: CalculatorFormProps) {
  const config = calculatorConfigs[kind];

  const [input, setInput] = useState<CalculatorInput>({
    length: '',
    width: '',
    depth: '',
    unitSystem: 'metric',
    materialId: config.defaultMaterialId,
    useAdvanced: false,
    swellFactor: '',
    compactionFactor: '',
    isWet: false,
    truckCapacityTons: 21.5,
  });

  const allowedMaterials = materials.filter((material) =>
    config.allowedMaterialIds.includes(material.id),
  );

  const material = getMaterialById(input.materialId);

  const result = useMemo(() => {
    if (!material) return null;

    const normalizedInput = normalizeCalculatorInput(input);
    if (!normalizedInput) return null;

    return calculateProjectMaterial(normalizedInput, material);
  }, [input, material]);

  const updateField: UpdateCalculatorField = (field, value) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-2xl border p-6">
        <h1 className="text-2xl font-bold">{config.title}</h1>
        <p>{config.description}</p>

        <label className="block">
          <span className="block mb-1">Unit System</span>
          <select
            value={input.unitSystem}
            onChange={(e) =>
              updateField(
                'unitSystem',
                e.target.value as CalculatorInput['unitSystem'],
              )
            }
            className="w-full rounded border px-3 py-2"
          >
            <option value="metric">{config.unitHints.metric}</option>
            <option value="imperial">{config.unitHints.imperial}</option>
          </select>
        </label>

        <label className="block">
          <span className="block mb-1">{config.dimensionLabels.length}</span>
          <input
            type="number"
            value={input.length}
            onChange={(e) =>
              updateField(
                'length',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className="w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block mb-1">{config.dimensionLabels.width}</span>
          <input
            type="number"
            value={input.width}
            onChange={(e) =>
              updateField(
                'width',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className="w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block mb-1">{config.dimensionLabels.depth}</span>
          <input
            type="number"
            value={input.depth}
            onChange={(e) =>
              updateField(
                'depth',
                e.target.value === '' ? '' : Number(e.target.value),
              )
            }
            className="w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="block mb-1">Material</span>
          <select
            value={input.materialId}
            onChange={(e) =>
              updateField(
                'materialId',
                e.target.value as CalculatorInput['materialId'],
              )
            }
            className="w-full rounded border px-3 py-2"
          >
            {allowedMaterials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={input.useAdvanced}
            onChange={(e) => updateField('useAdvanced', e.target.checked)}
          />
          <span>Use advanced settings</span>
        </label>

        {input.useAdvanced && (
          <AdvancedSettings
            swellFactor={input.swellFactor}
            compactionFactor={input.compactionFactor}
            isWet={input.isWet}
            truckCapacityTons={input.truckCapacityTons}
            onChange={updateField}
            allowSwell={config.allowSwell}
            allowCompaction={config.allowCompaction}
            allowWetToggle={config.allowWetToggle}
          />
        )}
      </div>

      <CalculatorResults result={result} />
    </div>
  );
}
