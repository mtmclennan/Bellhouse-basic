import crypto from 'crypto';
import type { ContactData } from '@/app/actions/contact';
import type { LeadAttribution } from '@/lib/tracking/attribution';
import type { EstivorLeadPayload } from './types';

function deriveLeadSource(attribution?: LeadAttribution) {
  if (!attribution) return undefined;
  if (attribution.gclid || attribution.gbraid || attribution.wbraid) return 'google_ads';
  if (attribution.fbclid) return 'meta_ads';
  if (attribution.msclkid) return 'microsoft_ads';
  if (attribution.utmSource) return attribution.utmSource;
  if (attribution.referrer) return 'referral';
  return 'direct';
}

function mapAttribution(attribution?: LeadAttribution) {
  if (!attribution) return undefined;

  const mapped = {
    utmSource: attribution.utmSource,
    utmMedium: attribution.utmMedium,
    utmCampaign: attribution.utmCampaign,
    utmContent: attribution.utmContent,
    utmTerm: attribution.utmTerm,
    gclid: attribution.gclid,
    gbraid: attribution.gbraid,
    wbraid: attribution.wbraid,
    fbclid: attribution.fbclid,
    msclkid: attribution.msclkid,
    leadSource: deriveLeadSource(attribution),
    initialLandingPageUrl: attribution.initialLandingPage,
    currentPageUrl: attribution.currentPage,
    referrer: attribution.referrer,
    initialTimestamp: attribution.initialTimestamp,
  };

  return Object.values(mapped).some(Boolean) ? mapped : undefined;
}

export function mapContactDataToEstivorPayload(lead: ContactData): EstivorLeadPayload {
  return {
    submissionId: lead.leadId ?? crypto.randomUUID(),
    source: 'bellhouse-website',
    formName: lead.formName,
    submittedAt: new Date().toISOString(),
    contact: {
      name: lead.name,
      email: lead.email || undefined,
      phone: lead.phone || undefined,
    },
    project: {
      serviceType: lead.workType || undefined,
      location: lead.location || undefined,
      message: lead.message || undefined,
    },
    consent:
      lead.smsConsent === undefined &&
      lead.smsDisclosureShown === undefined &&
      lead.smsConsentAt === undefined
        ? undefined
        : {
            smsConsent: lead.smsConsent,
            smsDisclosureShown: lead.smsDisclosureShown,
            smsConsentAt: lead.smsConsentAt,
          },
    attribution: mapAttribution(lead.attribution),
    uploads: lead.uploads?.length
      ? lead.uploads.map((upload) => ({
          originalName: upload.originalName,
          status: upload.status,
          signedUrl: upload.signedUrl,
        }))
      : undefined,
  };
}
