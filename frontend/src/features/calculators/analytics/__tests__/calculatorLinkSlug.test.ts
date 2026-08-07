import { describe, expect, it } from 'vitest';
import { extractCalculatorLinkSlug } from '../calculatorLinkSlug';

describe('extractCalculatorLinkSlug', () => {
  it('extracts the trailing slug from a service href', () => {
    expect(extractCalculatorLinkSlug('/services/foundation-excavation')).toBe(
      'foundation-excavation',
    );
  });

  it('extracts the trailing slug from a calculator href', () => {
    expect(extractCalculatorLinkSlug('/resources/calculators/gravel')).toBe('gravel');
  });

  it('strips query strings and hashes', () => {
    expect(
      extractCalculatorLinkSlug('/services/dirt-gravel-delivery?ref=calc#top'),
    ).toBe('dirt-gravel-delivery');
  });

  it('falls back to the raw path when there is no trailing segment', () => {
    expect(extractCalculatorLinkSlug('/')).toBe('/');
  });
});
