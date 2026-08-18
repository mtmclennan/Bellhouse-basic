export const GOOGLE_ADS_ROUTE_PREFIXES = ['/landing', '/services'] as const;
export const GOOGLE_ADS_EXACT_ROUTES = ['/contact'] as const;

export function shouldUseGoogleAdsTracking(pathname: string) {
  return (
    GOOGLE_ADS_EXACT_ROUTES.includes(
      pathname as (typeof GOOGLE_ADS_EXACT_ROUTES)[number],
    ) ||
    GOOGLE_ADS_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}
