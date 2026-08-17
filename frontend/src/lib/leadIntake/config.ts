// Config boundary for the Bellhouse -> Estivor lead intake integration.
// Everything here reads from env vars only — no secrets or endpoints are
// hardcoded, so this stays inert until Estivor credentials actually exist.

export const LEAD_INTAKE_MODES = ['legacy', 'dual-write', 'estivor-primary'] as const;
export type LeadIntakeMode = (typeof LEAD_INTAKE_MODES)[number];

const DEFAULT_MODE: LeadIntakeMode = 'legacy';

export function getLeadIntakeMode(): LeadIntakeMode {
  const raw = process.env.LEAD_INTAKE_MODE?.trim();
  if ((LEAD_INTAKE_MODES as readonly string[]).includes(raw ?? '')) {
    return raw as LeadIntakeMode;
  }
  return DEFAULT_MODE;
}

export type EstivorConfig = {
  apiUrl: string;
  apiKey: string;
  workspaceId: string;
  timeoutMs: number;
  maxRetries: number;
};

export function getEstivorConfig(): EstivorConfig {
  return {
    apiUrl: process.env.ESTIVOR_INTAKE_API_URL?.trim() || '',
    apiKey: process.env.ESTIVOR_INTAKE_API_KEY?.trim() || '',
    workspaceId: process.env.ESTIVOR_WORKSPACE_ID?.trim() || '',
    timeoutMs: Number(process.env.ESTIVOR_INTAKE_TIMEOUT_MS) || 8000,
    maxRetries: Number(process.env.ESTIVOR_INTAKE_MAX_RETRIES) || 2,
  };
}

export function isEstivorConfigured(config: EstivorConfig = getEstivorConfig()) {
  return Boolean(config.apiUrl && config.apiKey);
}

// Gate used by the lead intake service: only attempt Estivor when an
// operator has both opted in (mode) and supplied real credentials (config).
// This keeps 'legacy' mode (the default) a total no-op in production until
// someone deliberately turns the integration on.
export function shouldSubmitToEstivor(): boolean {
  const mode = getLeadIntakeMode();
  return mode !== 'legacy' && isEstivorConfigured();
}
