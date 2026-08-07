/**
 * Extracts a bare slug from an internal href for use as the service_slug
 * analytics parameter, e.g. "/services/foundation-excavation" -> "foundation-excavation",
 * "/resources/calculators/gravel" -> "gravel".
 */
export function extractCalculatorLinkSlug(href: string): string {
  const [pathname] = href.split(/[?#]/);
  const segments = pathname.split('/').filter(Boolean);
  return segments[segments.length - 1] ?? pathname;
}
