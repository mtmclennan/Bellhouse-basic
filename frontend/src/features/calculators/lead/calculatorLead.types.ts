import type { CalculatorKind } from '../types/calculator';

export const CALCULATOR_LEAD_VERSION = 1 as const;
export const CALCULATOR_LEAD_STORAGE_KEY = 'bellhouse:calculatorLead';
export const CALCULATOR_LEAD_TTL_MS = 2 * 60 * 60 * 1000;

export const CALCULATOR_KINDS = [
  'excavation',
  'gravel',
  'topsoil',
] as const satisfies readonly CalculatorKind[];

/**
 * Handoff payload from a calculator to the contact form. Every value is a
 * pre-formatted display string (not a raw number) because this data is only
 * ever rendered into a message body — keeping it string-only means the
 * contact form never needs calculator config or unit-conversion logic to
 * use it, and the runtime type guard stays trivial.
 */
export type CalculatorLeadData = {
  version: typeof CALCULATOR_LEAD_VERSION;
  calculatorType: CalculatorKind;
  createdAt: number;
  inputs: Record<string, string>;
  results: Record<string, string>;
  message: string;
};
