import {
  CALCULATOR_KINDS,
  CALCULATOR_LEAD_STORAGE_KEY,
  CALCULATOR_LEAD_TTL_MS,
  CALCULATOR_LEAD_VERSION,
  type CalculatorLeadData,
} from './calculatorLead.types';

function isStringRecord(value: unknown): value is Record<string, string> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false;
  }

  return Object.values(value).every((entry) => typeof entry === 'string');
}

export function isCalculatorLeadData(value: unknown): value is CalculatorLeadData {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    candidate.version === CALCULATOR_LEAD_VERSION &&
    typeof candidate.calculatorType === 'string' &&
    (CALCULATOR_KINDS as readonly string[]).includes(candidate.calculatorType) &&
    typeof candidate.createdAt === 'number' &&
    Number.isFinite(candidate.createdAt) &&
    typeof candidate.message === 'string' &&
    isStringRecord(candidate.inputs) &&
    isStringRecord(candidate.results)
  );
}

function isExpired(data: CalculatorLeadData, now: number): boolean {
  return now - data.createdAt > CALCULATOR_LEAD_TTL_MS;
}

/** Persists a calculator lead. Never throws; returns whether it succeeded. */
export function saveCalculatorLead(data: CalculatorLeadData): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    window.sessionStorage.setItem(CALCULATOR_LEAD_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads and validates the stored lead. Returns null (and clears the entry)
 * if storage is unavailable, the entry is missing, malformed, or expired.
 */
export function readCalculatorLead(now: number = Date.now()): CalculatorLeadData | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(CALCULATOR_LEAD_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);

    if (!isCalculatorLeadData(parsed) || isExpired(parsed, now)) {
      clearCalculatorLead();
      return null;
    }

    return parsed;
  } catch {
    // Unparseable JSON or a storage access error — either way, don't leave
    // a broken entry behind for the next read to trip over again.
    clearCalculatorLead();
    return null;
  }
}

/** Removes any stored lead. Never throws. */
export function clearCalculatorLead(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.removeItem(CALCULATOR_LEAD_STORAGE_KEY);
  } catch {
    // Storage unavailable (e.g. private browsing) — nothing to clean up.
  }
}
