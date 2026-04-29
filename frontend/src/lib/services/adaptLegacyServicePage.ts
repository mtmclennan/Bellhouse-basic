import type { CmsServicePage } from '@/types/services/cms';
import type { LegacyServicePage } from '@/types/services/legacy';

export function adaptLegacyServicePage(
  _service: LegacyServicePage,
): CmsServicePage | null {
  // TODO: Map the legacy service shape into CmsServicePage without pulling
  // resolver/layout fallback logic into the new normalized loader path.
  return null;
}
