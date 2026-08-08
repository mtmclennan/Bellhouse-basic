import { describe, expect, it } from 'vitest';
import {
  calculatorConfigs,
  createCalculatorAreaFormInput,
  createCalculatorFormInput,
} from '../../config/calculators';
import { getMaterialById } from '../../config/materials';
import { calculateProjectMaterial } from '../../logic/calculator';
import { normalizeCalculatorInput } from '../../logic/normalizeInput';
import { buildCalculatorLeadData } from '../buildCalculatorLeadData';

describe('buildCalculatorLeadData', () => {
  it('builds excavation lead data with correct labels, units, and message body', () => {
    const config = calculatorConfigs.excavation;
    const input = createCalculatorFormInput(config);
    input.length = { ...input.length, metricValue: 10, metricUnit: 'm' };
    input.width = { ...input.width, metricValue: 5, metricUnit: 'm' };
    input.depth = { ...input.depth, metricValue: 2, metricUnit: 'm' };

    const material = getMaterialById(input.materialId)!;
    const normalizedInput = normalizeCalculatorInput(input, config, material)!;
    const result = calculateProjectMaterial(normalizedInput, material);

    const lead = buildCalculatorLeadData({
      kind: 'excavation',
      config,
      input,
      material,
      result,
      assumptionsSummary:
        'Native Soil, 1.20x swell, normal moisture, 21.5 metric tonnes payload.',
      now: 1000,
    });

    expect(lead.version).toBe(1);
    expect(lead.calculatorType).toBe('excavation');
    expect(lead.createdAt).toBe(1000);

    // Matches the hand-verified 10x5x2m native-soil case: 100 m3 bank volume,
    // 1.20x swell -> 120 m3 loose, x1.85 t/m3 x1.08 moisture -> 239.8t,
    // /21.5t payload -> rounds up to the nearest half-load -> 11.5 loads.
    expect(lead.inputs['Cut Length']).toBe('10 m');
    expect(lead.inputs['Cut Width']).toBe('5 m');
    expect(lead.inputs['Cut Depth']).toBe('2 m');
    expect(lead.inputs['Material to haul']).toBe('Native Soil');
    expect(lead.inputs.Assumptions).toContain('1.20x swell');

    expect(lead.results['In-place volume']).toBe('100.00 m³');
    expect(lead.results['Loose (hauled)']).toBe('120.00 m³');
    expect(lead.results['Material weight']).toBe('239.8 metric tonnes');
    expect(lead.results['Truck loads']).toBe('11.5');

    expect(lead.message).toContain('I used the Bellhouse excavation calculator.');
    expect(lead.message).toContain('Dimensions: 10 m × 5 m × 2 m');
    expect(lead.message).toContain('Material: Native Soil');
    expect(lead.message).toContain('In-place volume: 100.00 m³');
    expect(lead.message).toContain('Material weight: 239.8 metric tonnes');
    expect(lead.message).toContain('Truck loads: 11.5');
    expect(lead.message).toContain('Project location:');
    expect(lead.message).toContain('Preferred timeline:');
    expect(lead.message).toContain('Additional project details:');
  });

  it('omits Assumptions when no summary is supplied', () => {
    const config = calculatorConfigs.excavation;
    const input = createCalculatorFormInput(config);
    input.length = { ...input.length, metricValue: 4, metricUnit: 'm' };
    input.width = { ...input.width, metricValue: 4, metricUnit: 'm' };
    input.depth = { ...input.depth, metricValue: 1, metricUnit: 'm' };
    const material = getMaterialById(input.materialId)!;
    const normalizedInput = normalizeCalculatorInput(input, config, material)!;
    const result = calculateProjectMaterial(normalizedInput, material);

    const lead = buildCalculatorLeadData({ kind: 'excavation', config, input, material, result });

    expect(lead.inputs.Assumptions).toBeUndefined();
  });

  it('combines complete areas and includes each one in the quote handoff', () => {
    const config = calculatorConfigs.excavation;
    const input = createCalculatorFormInput(config);
    input.length = { ...input.length, metricValue: 10 };
    input.width = { ...input.width, metricValue: 5 };
    input.depth = { ...input.depth, metricValue: 1 };

    const secondArea = createCalculatorAreaFormInput(config);
    secondArea.length = { ...secondArea.length, metricValue: 2 };
    secondArea.width = { ...secondArea.width, metricValue: 2 };
    secondArea.depth = { ...secondArea.depth, metricValue: 1 };
    input.additionalAreas.push(secondArea);

    const material = getMaterialById(input.materialId)!;
    const normalizedInput = normalizeCalculatorInput(input, config, material)!;
    const result = calculateProjectMaterial(normalizedInput, material);
    const lead = buildCalculatorLeadData({
      kind: 'excavation',
      config,
      input,
      material,
      result,
    });

    expect(normalizedInput.additionalAreas).toHaveLength(1);
    expect(result.rawProjectVolumeM3).toBe(54);
    expect(lead.inputs['Area 1']).toBe('10 m × 5 m × 1 m');
    expect(lead.inputs['Area 2']).toBe('2 m × 2 m × 1 m');
    expect(lead.message).toContain('Areas:');
    expect(lead.message).toContain('Area 2: 2 m × 2 m × 1 m');
  });

  it('keeps a valid estimate when a newly added area is still empty', () => {
    const config = calculatorConfigs.gravel;
    const input = createCalculatorFormInput(config);
    input.length = { ...input.length, metricValue: 8 };
    input.width = { ...input.width, metricValue: 3 };
    input.depth = { ...input.depth, metricValue: 100, metricUnit: 'mm' };
    input.additionalAreas.push(createCalculatorAreaFormInput(config));

    const material = getMaterialById(input.materialId)!;
    const normalizedInput = normalizeCalculatorInput(input, config, material);

    expect(normalizedInput).not.toBeNull();
    expect(normalizedInput?.additionalAreas).toEqual([]);
  });

  it('includes an optional user-entered cost estimate in the handoff', () => {
    const config = calculatorConfigs.excavation;
    const input = createCalculatorFormInput(config);
    input.length = { ...input.length, metricValue: 10 };
    input.width = { ...input.width, metricValue: 5 };
    input.depth = { ...input.depth, metricValue: 1 };
    input.priceMode = 'load';
    input.pricePerUnit = 500;

    const material = getMaterialById(input.materialId)!;
    const normalizedInput = normalizeCalculatorInput(input, config, material)!;
    const result = calculateProjectMaterial(normalizedInput, material);
    const lead = buildCalculatorLeadData({
      kind: 'excavation',
      config,
      input,
      material,
      result,
    });

    expect(lead.inputs['Price per']).toBe('$500 per load');
    expect(lead.results['Estimated cost']).toBe('$3,000');
    expect(lead.message).toContain('Estimated cost: $3,000');
  });

  it('adapts field labels and includes the secondary volume for gravel (compaction workflow)', () => {
    const config = calculatorConfigs.gravel;
    const input = createCalculatorFormInput(config);
    input.length = { ...input.length, metricValue: 20, metricUnit: 'm' };
    input.width = { ...input.width, metricValue: 3, metricUnit: 'm' };
    input.depth = { ...input.depth, metricValue: 150, metricUnit: 'mm' };

    const material = getMaterialById(input.materialId)!;
    const normalizedInput = normalizeCalculatorInput(input, config, material)!;
    const result = calculateProjectMaterial(normalizedInput, material);

    const lead = buildCalculatorLeadData({ kind: 'gravel', config, input, material, result });

    expect(lead.calculatorType).toBe('gravel');
    expect(lead.inputs['Area Length']).toBe('20 m');
    expect(lead.inputs['Gravel Depth']).toBe('150 mm');
    expect(lead.results['Compacted base volume']).toBeDefined();
    expect(lead.results['Base volume']).toBeDefined();
    expect(lead.results['Truck loads']).toBeDefined();
    expect(lead.message).toContain('I used the Bellhouse gravel calculator.');
  });

  it('adapts field labels for topsoil (compaction workflow, single material)', () => {
    const config = calculatorConfigs.topsoil;
    const input = createCalculatorFormInput(config);
    input.length = { ...input.length, metricValue: 12, metricUnit: 'm' };
    input.width = { ...input.width, metricValue: 8, metricUnit: 'm' };
    input.depth = { ...input.depth, metricValue: 100, metricUnit: 'mm' };

    const material = getMaterialById(input.materialId)!;
    const normalizedInput = normalizeCalculatorInput(input, config, material)!;
    const result = calculateProjectMaterial(normalizedInput, material);

    const lead = buildCalculatorLeadData({ kind: 'topsoil', config, input, material, result });

    expect(lead.calculatorType).toBe('topsoil');
    expect(lead.inputs['Coverage Length']).toBe('12 m');
    expect(lead.inputs['Topsoil type']).toBe('Topsoil');
    expect(lead.message).toContain('I used the Bellhouse topsoil calculator.');
  });

  it('formats imperial feet/inches dimensions and imperial output units', () => {
    const config = calculatorConfigs.excavation;
    const input = createCalculatorFormInput(config);
    input.inputUnitSystem = 'imperial';
    input.outputUnitPreference = 'imperial';
    input.length = { ...input.length, feet: 32, inches: 10 };
    input.width = { ...input.width, feet: 16, inches: 0 };
    input.depth = { ...input.depth, feet: 0, inches: 6 };

    const material = getMaterialById(input.materialId)!;
    const normalizedInput = normalizeCalculatorInput(input, config, material)!;
    const result = calculateProjectMaterial(normalizedInput, material);

    const lead = buildCalculatorLeadData({ kind: 'excavation', config, input, material, result });

    expect(lead.inputs['Cut Length']).toBe('32 ft 10 in');
    expect(lead.inputs['Cut Width']).toBe('16 ft');
    expect(lead.inputs['Cut Depth']).toBe('6 in');
    expect(lead.results['In-place volume']).toMatch(/ yd³$/);
    expect(lead.results['Material weight']).toMatch(/ short tons$/);
  });
});
