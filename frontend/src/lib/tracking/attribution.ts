export type LeadAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  fbclid?: string;
  msclkid?: string;
  initialLandingPage?: string;
  referrer?: string;
  initialTimestamp?: string;
  currentPage?: string;
  requestedService?: string;
};

const ATTRIBUTION_STORAGE_KEY = 'bellhouse.leadAttribution.v1';
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;

const QUERY_FIELD_MAP = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_content: 'utmContent',
  utm_term: 'utmTerm',
  gclid: 'gclid',
  gbraid: 'gbraid',
  wbraid: 'wbraid',
  fbclid: 'fbclid',
  msclkid: 'msclkid',
} as const;

function cleanValue(value: string | null | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return trimmed.slice(0, 300);
}

function hasCampaignParams(searchParams: URLSearchParams) {
  return Object.keys(QUERY_FIELD_MAP).some((key) => searchParams.has(key));
}

function readStoredAttribution(): LeadAttribution | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as LeadAttribution;
    const ts = parsed.initialTimestamp
      ? new Date(parsed.initialTimestamp).getTime()
      : 0;

    if (!ts || Date.now() - ts > ATTRIBUTION_TTL_MS) {
      window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeStoredAttribution(attribution: LeadAttribution) {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(attribution),
    );
  } catch {
    // Attribution should never block form submission.
  }
}

export function captureAttribution(requestedService?: string) {
  if (typeof window === 'undefined') return null;

  const currentPage = `${window.location.pathname}${window.location.search}`;
  const searchParams = new URLSearchParams(window.location.search);
  const stored = readStoredAttribution();
  const hasParams = hasCampaignParams(searchParams);

  const next: LeadAttribution = {
    ...(stored ?? {}),
    currentPage,
    requestedService: cleanValue(requestedService) ?? stored?.requestedService,
  };

  if (!stored || hasParams) {
    next.initialLandingPage = stored?.initialLandingPage ?? currentPage;
    next.initialTimestamp =
      stored?.initialTimestamp ?? new Date().toISOString();
    next.referrer = stored?.referrer ?? cleanValue(document.referrer);
  }

  for (const [queryKey, attributionKey] of Object.entries(QUERY_FIELD_MAP)) {
    const value = cleanValue(searchParams.get(queryKey));
    if (value) {
      (next as Record<string, string | undefined>)[attributionKey] = value;
    }
  }

  if (Object.values(next).some(Boolean)) {
    writeStoredAttribution(next);
  }

  return next;
}

export function getLeadAttribution(requestedService?: string) {
  const attribution = captureAttribution(requestedService) ?? {};
  const cleanedRequestedService = cleanValue(requestedService);

  return {
    ...attribution,
    requestedService:
      cleanedRequestedService ?? attribution.requestedService,
  };
}
