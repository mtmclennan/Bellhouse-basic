import type { BackgroundTone, BackgroundVariant } from '@/types/sections';

export type ServiceSectionAppearance = {
  backgroundVariant: Extract<BackgroundVariant, 'light' | 'dark'>;
  backgroundTone: BackgroundTone;
};
