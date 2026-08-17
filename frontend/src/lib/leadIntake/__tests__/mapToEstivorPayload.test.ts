import { describe, expect, it } from 'vitest';
import type { ContactData } from '@/app/actions/contact';
import { mapContactDataToEstivorPayload } from '../mapToEstivorPayload';
import { estivorLeadPayloadSchema } from '../types';

function baseLead(overrides: Partial<ContactData> = {}): ContactData {
  return {
    name: 'Jordan Smith',
    email: 'jordan@example.com',
    phone: '5195551234',
    workType: 'Foundation Excavation',
    message: 'Need a quote for a new basement dig.',
    leadId: 'lead-123',
    ...overrides,
  };
}

describe('mapContactDataToEstivorPayload', () => {
  it('maps required fields and validates against the outbound schema', () => {
    const payload = mapContactDataToEstivorPayload(baseLead());

    expect(payload.submissionId).toBe('lead-123');
    expect(payload.source).toBe('bellhouse-website');
    expect(payload.contact).toEqual({
      name: 'Jordan Smith',
      email: 'jordan@example.com',
      phone: '5195551234',
    });
    expect(payload.project.serviceType).toBe('Foundation Excavation');
    expect(estivorLeadPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it('derives leadSource from gclid over other attribution signals', () => {
    const payload = mapContactDataToEstivorPayload(
      baseLead({
        attribution: {
          gclid: 'abc123',
          utmSource: 'facebook',
          referrer: 'https://facebook.com',
        },
      }),
    );

    expect(payload.attribution?.leadSource).toBe('google_ads');
  });

  it('falls back to direct when no attribution signal is present', () => {
    const payload = mapContactDataToEstivorPayload(
      baseLead({ attribution: { currentPage: '/contact' } }),
    );

    expect(payload.attribution?.leadSource).toBe('direct');
  });

  it('omits optional sections entirely when there is nothing to send', () => {
    const payload = mapContactDataToEstivorPayload(
      baseLead({ email: '', phone: undefined, attribution: undefined }),
    );

    expect(payload.contact.email).toBeUndefined();
    expect(payload.contact.phone).toBeUndefined();
    expect(payload.attribution).toBeUndefined();
    expect(payload.consent).toBeUndefined();
  });

  it('generates a submissionId when leadId is missing', () => {
    const payload = mapContactDataToEstivorPayload(baseLead({ leadId: undefined }));
    expect(payload.submissionId.length).toBeGreaterThan(0);
  });
});
