import type { ContactData } from '@/app/actions/contact';
import { logMonitorEvent } from '@/lib/monitor/eventLog';
import { shouldSubmitToEstivor } from './config';
import { submitLeadToEstivor } from './estivorAdapter';
import { mapContactDataToEstivorPayload } from './mapToEstivorPayload';

// Entry point called from processContactCore. Intentionally never throws —
// this must never be able to block or fail the legacy email/Sheets lead
// path. In 'legacy' mode (the default) this is a no-op with no network
// call, so shipping this file changes nothing about current production
// behavior until an operator opts in via LEAD_INTAKE_MODE + real Estivor
// credentials.
export async function submitLeadToEstivorIntake(lead: ContactData): Promise<void> {
  if (!shouldSubmitToEstivor()) return;

  try {
    const payload = mapContactDataToEstivorPayload(lead);
    const result = await submitLeadToEstivor(payload);

    if (!result.ok && result.reason !== 'not_configured') {
      await logMonitorEvent({
        ts: new Date().toISOString(),
        type: 'ESTIVOR_SUBMIT_FAIL',
        message:
          result.reason === 'invalid_payload' || result.reason === 'request_failed'
            ? result.error
            : 'Estivor submission failed.',
        meta: { leadId: lead.leadId, reason: result.reason },
      });
    }
  } catch (error) {
    await logMonitorEvent({
      ts: new Date().toISOString(),
      type: 'ESTIVOR_SUBMIT_FAIL',
      message: error instanceof Error ? error.message : 'Unknown Estivor error.',
      meta: { leadId: lead.leadId },
    });
  }
}
