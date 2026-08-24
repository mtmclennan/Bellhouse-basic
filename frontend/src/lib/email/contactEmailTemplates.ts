import type { QuoteUploadEmailFile } from '@/lib/uploads/shared/uploadTypes';
import { formatUploadSize } from '@/lib/uploads/shared/uploadLimits';
import type { LeadAttribution } from '@/lib/tracking/attribution';

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  workType: string;
  message: string;

  // ✅ SMS consent audit fields (optional, but used when phone exists)
  smsConsent?: boolean;
  smsDisclosureShown?: boolean;
  smsConsentAt?: string; // ISO timestamp
  leadId?: string;
  attribution?: LeadAttribution;
  uploads?: QuoteUploadEmailFile[];
  uploadLinkExpiryNote?: string;
};

export function buildBusinessEmail(data: ContactPayload) {
  const submittedOn = new Date().toLocaleString();

  const phoneProvided = !!data.phone?.trim();
  const uploadsSection = buildUploadsSection(data);
  const attributionSection = buildAttributionSection(data.attribution);

  const smsConsentSection = phoneProvided
    ? `
      <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
      <h3 style="color: #ffc302;">SMS Consent</h3>
      <p>
        <strong>✅ Consent:</strong> ${data.smsConsent ? 'YES' : 'NO'}<br/>
        <strong>📄 Disclosure Shown:</strong> ${data.smsDisclosureShown ? 'YES' : 'NO'}<br/>
        <strong>🕒 Consent Timestamp (UTC):</strong> ${
          data.smsConsentAt ? escapeHtml(data.smsConsentAt) : 'Not recorded'
        }
      </p>
      <p style="font-size: 12px; color: #555;">
        Note: Consent is required when a phone number is provided. Keep this record for carrier compliance.
      </p>
    `
    : '';

  return {
    subject: `🔔 New ${data.workType} Estimate Request`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #ffffff; color: #202020;">
      <div style="background-color: #202020; padding: 15px; text-align: center;">
        <img src="https://bellhouseexcavating.ca/assets/BellhouseLogo-text-LS.png" alt="Bellhouse Excavating Logo" style="max-width: 200px; margin-bottom: 10px;">
        <h2 style="color: #ffc302;">New Estimate Request</h2>
      </div>

      <div style="padding: 20px;">
        <p><strong>📌 Submitted On:</strong> ${escapeHtml(submittedOn)}</p>

        <hr style="border: none; border-top: 2px solid #ffc302; margin: 15px 0;">

        <h3 style="color: #ffc302;">Customer Details</h3>
        <p><strong>👤 Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>📧 Email:</strong> <a href="mailto:${escapeAttr(data.email)}" style="color: #202020; text-decoration: none;">${escapeHtml(data.email)}</a></p>
        <p><strong>📞 Phone:</strong> ${phoneProvided ? escapeHtml(data.phone!) : 'Not provided'}</p>

        ${smsConsentSection}

        <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">

        <h3 style="color: #ffc302;">Request Details</h3>
        ${
          data.leadId
            ? `<p><strong>Lead ID:</strong> ${escapeHtml(data.leadId)}</p>`
            : ''
        }
        <p><strong>🚧 Service Requested:</strong> ${escapeHtml(data.workType)}</p>
        ${attributionSection}
        <p><strong>📝 Message:</strong><br>${
          data.message
            ? escapeHtml(data.message).replace(/\n/g, '<br/>')
            : '<em>No additional details provided.</em>'
        }</p>

        ${uploadsSection}

        <hr style="border: none; border-top: 2px solid #ffc302; margin: 15px 0;">
        <p><strong>⚠️ Action Required:</strong> Please follow up with the customer as soon as possible.</p>
      </div>

      <div style="text-align: center; background-color: #202020; padding: 10px; color: #ffffff;">
        <p><strong>Bellhouse Excavating</strong></p>
        <p>📞 <a href="tel:5197528500" style="color: #ffc302; text-decoration: none;">519-752-8500</a> |
           📧 <a href="mailto:info@bellhouseexcavating.ca" style="color: #ffc302; text-decoration: none;">info@bellhouseexcavating.ca</a> |
           🌐 <a href="https://bellhouseexcavating.ca" style="color: #ffc302; text-decoration: none;">bellhouseexcavating.ca</a>
        </p>
      </div>
    </div>
    `,
  };
}

export function buildCustomerEmail(data: ContactPayload) {
  return {
    subject: `We Received Your Request for ${data.workType}!`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 10px; background-color: #ffffff; color: #202020;">
      <div style="background-color: #202020; padding: 20px; text-align: center;">
        <img src="https://bellhouseexcavating.ca/assets/BellhouseLogo-text.png" alt="Bellhouse Excavating Logo" style="max-width: 250px; margin-bottom: 10px;">
      </div>

      <div style="padding: 20px;">
        <h2 style="color: #ffc302; text-align: center;">Thank You for Contacting Bellhouse Excavating!</h2>
        <p>Hello <strong>${escapeHtml(data.name)}</strong>,</p>
        <p>Thank you for reaching out to us regarding <strong>${escapeHtml(data.workType)}</strong>. We have received your message and will get back to you as soon as possible.</p>
        <p>Our team typically responds within <strong>24 hours</strong>, but if your request is urgent, please feel free to call us at
          <a href="tel:5197528500" style="color: #ffc302; text-decoration: none;"><strong>519-752-8500</strong></a>.
        </p>
        ${
          data.uploads?.length
            ? '<p>If photos were included, Bellhouse will use them only to review and respond to your request.</p>'
            : ''
        }

        <p style="text-align: center;">
          <a href="https://bellhouseexcavating.ca" style="display: inline-block; background-color: #ffc302; color: #202020; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Visit Our Website</a>
        </p>
      </div>

      <hr style="border: none; border-top: 2px solid #ffc302; margin: 20px 0;">

      <div style="text-align: center; background-color: #202020; padding: 15px; color: #ffffff;">
        <p><strong>Best regards,</strong><br>The Bellhouse Excavating Team</p>
        <p>
          📞 <a href="tel:5197528500" style="color: #ffc302; text-decoration: none;">519-752-8500</a> |
          📧 <a href="mailto:info@bellhouseexcavating.ca" style="color: #ffc302; text-decoration: none;">info@bellhouseexcavating.ca</a> |
          🌐 <a href="https://bellhouseexcavating.ca" style="color: #ffc302; text-decoration: none;">bellhouseexcavating.ca</a>
        </p>
      </div>
    </div>
    `,
  };
}

function buildAttributionSection(attribution?: LeadAttribution) {
  if (!attribution || !Object.values(attribution).some(Boolean)) {
    return '';
  }

  const attributionRows: Array<[string, string | undefined]> = [
    ['Source', attribution.utmSource],
    ['Medium', attribution.utmMedium],
    ['Campaign', attribution.utmCampaign],
    ['Content', attribution.utmContent],
    ['Search term / UTM term', attribution.utmTerm],
    ['GCLID', attribution.gclid],
    ['GBRAID', attribution.gbraid],
    ['WBRAID', attribution.wbraid],
    ['FBCLID', attribution.fbclid],
    ['MSCLKID', attribution.msclkid],
    ['Initial landing page', attribution.initialLandingPage],
    ['Current page', attribution.currentPage],
    ['Referrer', attribution.referrer],
    ['Initial timestamp', attribution.initialTimestamp],
    ['Requested service', attribution.requestedService],
  ];

  const rows = attributionRows
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value ?? '')}</p>`,
    )
    .join('');

  return `
    <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
    <h3 style="color: #ffc302;">Lead Attribution</h3>
    ${rows}
  `;
}

function buildUploadsSection(data: ContactPayload) {
  const uploads = data.uploads ?? [];

  if (!uploads.length) {
    return `
      <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
      <h3 style="color: #ffc302;">Uploaded Photos</h3>
      <p>No photos were uploaded with this request.</p>
    `;
  }

  const listItems = uploads
    .map((upload) => {
      const cleanLink =
        upload.status === 'clean' && upload.signedUrl
          ? `<br/><a href="${escapeAttr(upload.signedUrl)}" style="color: #202020; text-decoration: underline;">Open cleaned photo</a>`
          : '';
      const rejection = upload.rejectionReason
        ? `<br/><span style="color: #b42318;">${escapeHtml(
            upload.rejectionReason,
          )}</span>`
        : '';

      return `
        <li style="margin-bottom: 10px;">
          <strong>${escapeHtml(upload.originalName)}</strong><br/>
          ${escapeHtml(upload.contentType)} - ${escapeHtml(
            formatUploadSize(upload.sizeBytes),
          )}<br/>
          Status: ${escapeHtml(upload.status)}
          ${cleanLink}
          ${rejection}
        </li>
      `;
    })
    .join('');

  return `
    <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
    <h3 style="color: #ffc302;">Uploaded Photos</h3>
    <p>${uploads.length} photo${
      uploads.length === 1 ? '' : 's'
    } received. Photos are linked below as cleaned, private, expiring review links. No files are attached to this email.</p>
    ${
      data.uploadLinkExpiryNote
        ? `<p style="font-size: 12px; color: #555;">${escapeHtml(
            data.uploadLinkExpiryNote,
          )}</p>`
        : ''
    }
    <ul style="padding-left: 20px;">${listItems}</ul>
  `;
}

// Basic escaping so a spicy customer can’t inject HTML into your emails
function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttr(input: string) {
  return escapeHtml(input).replaceAll('`', '&#096;');
}
