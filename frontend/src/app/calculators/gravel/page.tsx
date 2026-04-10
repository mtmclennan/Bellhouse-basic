import type { Metadata } from 'next';
import { CalculatorPageShell } from '@/features/calculators/components/CalculatorPageShell';
import { validateMetadata } from '@/lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Gravel Calculator | Bellhouse',
  description:
    'Use the Bellhouse gravel calculator to estimate aggregate volume, tonnage, and likely truck loads for pads, driveways, and base work.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/calculators/gravel',
  },
  openGraph: {
    title: 'Gravel Calculator | Bellhouse',
    description:
      'Estimate aggregate volume, tonnage, and truck loads with the Bellhouse gravel calculator.',
    url: 'https://bellhouseexcavating.ca/calculators/gravel',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function GravelCalculatorPage() {
  return <CalculatorPageShell kind="gravel" />;
}
