import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CALCULATOR_LEAD_STORAGE_KEY,
  CALCULATOR_LEAD_TTL_MS,
  CALCULATOR_LEAD_VERSION,
  type CalculatorLeadData,
} from '../calculatorLead.types';
import {
  clearCalculatorLead,
  isCalculatorLeadData,
  readCalculatorLead,
  saveCalculatorLead,
} from '../calculatorLeadStorage';

function makeLead(overrides: Partial<CalculatorLeadData> = {}): CalculatorLeadData {
  return {
    version: CALCULATOR_LEAD_VERSION,
    calculatorType: 'excavation',
    createdAt: Date.now(),
    inputs: { 'Cut Length': '10 m' },
    results: { 'Excavation volume': '100.00 m³' },
    message: 'I used the Bellhouse excavation calculator.',
    ...overrides,
  };
}

describe('calculatorLeadStorage', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  afterEach(() => {
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  describe('isCalculatorLeadData', () => {
    it('accepts a well-formed lead', () => {
      expect(isCalculatorLeadData(makeLead())).toBe(true);
    });

    it.each([
      ['null', null],
      ['a string', 'not an object'],
      ['wrong version', makeLead({ version: 2 as unknown as 1 })],
      ['unknown calculatorType', { ...makeLead(), calculatorType: 'trench' }],
      ['non-numeric createdAt', { ...makeLead(), createdAt: 'yesterday' }],
      ['non-string message', { ...makeLead(), message: 123 }],
      ['non-object inputs', { ...makeLead(), inputs: null }],
      ['inputs with a numeric value', { ...makeLead(), inputs: { length: 10 } }],
      ['results with a boolean value', { ...makeLead(), results: { weight: true } }],
    ])('rejects %s', (_label, value) => {
      expect(isCalculatorLeadData(value)).toBe(false);
    });
  });

  describe('saveCalculatorLead / readCalculatorLead (serialization round-trip)', () => {
    it('round-trips a saved lead exactly', () => {
      const lead = makeLead();
      expect(saveCalculatorLead(lead)).toBe(true);
      expect(readCalculatorLead()).toEqual(lead);
    });

    it('returns null when nothing has been stored', () => {
      expect(readCalculatorLead()).toBeNull();
    });
  });

  describe('expiry', () => {
    it('returns the lead when read just under the TTL', () => {
      const lead = makeLead({ createdAt: Date.now() - (CALCULATOR_LEAD_TTL_MS - 1000) });
      saveCalculatorLead(lead);
      expect(readCalculatorLead()).toEqual(lead);
    });

    it('discards and clears a lead older than the TTL', () => {
      const lead = makeLead({ createdAt: Date.now() - (CALCULATOR_LEAD_TTL_MS + 1000) });
      saveCalculatorLead(lead);

      expect(readCalculatorLead()).toBeNull();
      expect(window.sessionStorage.getItem(CALCULATOR_LEAD_STORAGE_KEY)).toBeNull();
    });
  });

  describe('malformed data', () => {
    it('returns null and clears the entry for invalid JSON', () => {
      window.sessionStorage.setItem(CALCULATOR_LEAD_STORAGE_KEY, '{not json');
      expect(readCalculatorLead()).toBeNull();
      expect(window.sessionStorage.getItem(CALCULATOR_LEAD_STORAGE_KEY)).toBeNull();
    });

    it('returns null and clears the entry for a structurally invalid payload', () => {
      window.sessionStorage.setItem(
        CALCULATOR_LEAD_STORAGE_KEY,
        JSON.stringify({ foo: 'bar' }),
      );
      expect(readCalculatorLead()).toBeNull();
      expect(window.sessionStorage.getItem(CALCULATOR_LEAD_STORAGE_KEY)).toBeNull();
    });
  });

  describe('missing / unavailable storage', () => {
    it('save fails safely (returns false, does not throw) when sessionStorage throws', () => {
      const setItemSpy = vi
        .spyOn(window.sessionStorage.__proto__, 'setItem')
        .mockImplementation(() => {
          throw new Error('QuotaExceededError');
        });

      expect(() => saveCalculatorLead(makeLead())).not.toThrow();
      expect(saveCalculatorLead(makeLead())).toBe(false);

      setItemSpy.mockRestore();
    });

    it('read fails safely (returns null, does not throw) when sessionStorage throws', () => {
      const getItemSpy = vi
        .spyOn(window.sessionStorage.__proto__, 'getItem')
        .mockImplementation(() => {
          throw new Error('SecurityError');
        });

      expect(() => readCalculatorLead()).not.toThrow();
      expect(readCalculatorLead()).toBeNull();

      getItemSpy.mockRestore();
    });

    it('clear fails safely when sessionStorage throws', () => {
      const removeItemSpy = vi
        .spyOn(window.sessionStorage.__proto__, 'removeItem')
        .mockImplementation(() => {
          throw new Error('SecurityError');
        });

      expect(() => clearCalculatorLead()).not.toThrow();

      removeItemSpy.mockRestore();
    });

    it('all operations no-op safely when window is undefined (SSR)', () => {
      const originalWindow = globalThis.window;
      // @ts-expect-error simulating a server (non-browser) environment
      delete globalThis.window;

      try {
        expect(saveCalculatorLead(makeLead())).toBe(false);
        expect(readCalculatorLead()).toBeNull();
        expect(() => clearCalculatorLead()).not.toThrow();
      } finally {
        globalThis.window = originalWindow;
      }
    });
  });
});
