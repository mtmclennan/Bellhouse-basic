import { describe, expect, it } from 'vitest';
import {
  calculatorConfigs,
  createCalculatorAreaFormInput,
  createCalculatorFormInput,
} from '../../config/calculators';
import {
  buildCalculatorShareUrl,
  readCalculatorShareHash,
} from '../calculatorShareState';

describe('calculatorShareState', () => {
  it('round-trips multiple areas, settings, and cost inputs', () => {
    const config = calculatorConfigs.excavation;
    const input = createCalculatorFormInput(config);
    input.length.metricValue = 10;
    input.width.metricValue = 5;
    input.depth.metricValue = 1;
    input.priceMode = 'load';
    input.pricePerUnit = 500;
    input.useAdvanced = true;

    const secondArea = createCalculatorAreaFormInput(config);
    secondArea.length.metricValue = 2;
    secondArea.width.metricValue = 2;
    secondArea.depth.metricValue = 1;
    input.additionalAreas.push(secondArea);

    const url = buildCalculatorShareUrl(
      'https://example.com/resources/calculators/excavation',
      'excavation',
      input,
    );
    const restored = readCalculatorShareHash(
      new URL(url).hash,
      'excavation',
      config,
    );

    expect(restored).toEqual(input);
  });

  it('rejects a link for a different calculator kind', () => {
    const input = createCalculatorFormInput(calculatorConfigs.excavation);
    const url = buildCalculatorShareUrl('https://example.com', 'excavation', input);

    expect(
      readCalculatorShareHash(
        new URL(url).hash,
        'gravel',
        calculatorConfigs.gravel,
      ),
    ).toBeNull();
  });

  it('rejects malformed state', () => {
    expect(
      readCalculatorShareHash(
        '#estimate=not-valid-state',
        'topsoil',
        calculatorConfigs.topsoil,
      ),
    ).toBeNull();
  });
});
