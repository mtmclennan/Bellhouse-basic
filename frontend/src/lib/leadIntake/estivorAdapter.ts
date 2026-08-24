import { getEstivorConfig, isEstivorConfigured } from './config';
import { estivorLeadPayloadSchema, type EstivorLeadPayload, type EstivorSubmitResult } from './types';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postOnce(
  payload: EstivorLeadPayload,
  config: ReturnType<typeof getEstivorConfig>,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  try {
    return await fetch(config.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
        'Idempotency-Key': payload.submissionId,
        ...(config.workspaceId ? { 'X-Estivor-Workspace': config.workspaceId } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

// Server-to-server only. Never call this from client code — the API key
// must never reach the browser. Retries on network failure or 5xx with a
// short backoff; 4xx responses are not retried since the payload itself
// would be rejected again. Idempotency-Key lets Estivor de-dupe retried
// submissions of the same lead.
export async function submitLeadToEstivor(
  rawPayload: EstivorLeadPayload,
): Promise<EstivorSubmitResult> {
  const config = getEstivorConfig();
  if (!isEstivorConfigured(config)) {
    return { ok: false, reason: 'not_configured' };
  }

  const parsed = estivorLeadPayloadSchema.safeParse(rawPayload);
  if (!parsed.success) {
    return {
      ok: false,
      reason: 'invalid_payload',
      error: parsed.error.errors[0]?.message || 'Invalid Estivor payload.',
    };
  }

  const payload = parsed.data;
  let lastError = '';
  let lastStatus: number | undefined;

  for (let attempt = 0; attempt <= config.maxRetries; attempt += 1) {
    try {
      const response = await postOnce(payload, config);

      if (response.ok) {
        return { ok: true, status: response.status };
      }

      lastStatus = response.status;
      lastError = `Estivor responded with ${response.status}`;

      if (response.status >= 400 && response.status < 500) {
        break; // client-side rejection — retrying won't help
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : 'Estivor request failed.';
    }

    if (attempt < config.maxRetries) {
      await sleep(300 * 2 ** attempt);
    }
  }

  return { ok: false, reason: 'request_failed', status: lastStatus, error: lastError };
}
