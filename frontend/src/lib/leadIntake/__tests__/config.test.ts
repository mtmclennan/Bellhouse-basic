import { afterEach, describe, expect, it, vi } from 'vitest';
import { getLeadIntakeMode, isEstivorConfigured, shouldSubmitToEstivor } from '../config';

const ENV_KEYS = [
  'LEAD_INTAKE_MODE',
  'ESTIVOR_INTAKE_API_URL',
  'ESTIVOR_INTAKE_API_KEY',
] as const;

afterEach(() => {
  for (const key of ENV_KEYS) delete process.env[key];
  vi.unstubAllEnvs();
});

describe('getLeadIntakeMode', () => {
  it('defaults to legacy when unset', () => {
    expect(getLeadIntakeMode()).toBe('legacy');
  });

  it('defaults to legacy on an unrecognized value', () => {
    process.env.LEAD_INTAKE_MODE = 'yolo';
    expect(getLeadIntakeMode()).toBe('legacy');
  });

  it('accepts a valid mode', () => {
    process.env.LEAD_INTAKE_MODE = 'dual-write';
    expect(getLeadIntakeMode()).toBe('dual-write');
  });
});

describe('isEstivorConfigured', () => {
  it('is false with no credentials', () => {
    expect(isEstivorConfigured({ apiUrl: '', apiKey: '', workspaceId: '', timeoutMs: 1, maxRetries: 0 })).toBe(
      false,
    );
  });

  it('is true once both url and key are present', () => {
    expect(
      isEstivorConfigured({
        apiUrl: 'https://intake.estivor.example/leads',
        apiKey: 'secret',
        workspaceId: '',
        timeoutMs: 1,
        maxRetries: 0,
      }),
    ).toBe(true);
  });
});

describe('shouldSubmitToEstivor', () => {
  it('is false in legacy mode even with credentials configured', () => {
    process.env.ESTIVOR_INTAKE_API_URL = 'https://intake.estivor.example/leads';
    process.env.ESTIVOR_INTAKE_API_KEY = 'secret';
    expect(shouldSubmitToEstivor()).toBe(false);
  });

  it('is false in dual-write mode without credentials', () => {
    process.env.LEAD_INTAKE_MODE = 'dual-write';
    expect(shouldSubmitToEstivor()).toBe(false);
  });

  it('is true in dual-write mode with credentials', () => {
    process.env.LEAD_INTAKE_MODE = 'dual-write';
    process.env.ESTIVOR_INTAKE_API_URL = 'https://intake.estivor.example/leads';
    process.env.ESTIVOR_INTAKE_API_KEY = 'secret';
    expect(shouldSubmitToEstivor()).toBe(true);
  });
});
