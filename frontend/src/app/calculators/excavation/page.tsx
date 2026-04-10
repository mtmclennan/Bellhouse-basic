import type { Metadata } from 'next';
import { CalculatorPageShell } from '@/features/calculators/components/CalculatorPageShell';
import { validateMetadata } from '@/lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Excavation Calculator | Bellhouse',
  description:
    'Use the Bellhouse excavation calculator to estimate excavation volume, tonnage, and rough truck loads before requesting a quote.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/calculators/excavation',
  },
  openGraph: {
    title: 'Excavation Calculator | Bellhouse',
    description:
      'Estimate excavation volume, tonnage, and rough truck loads with the Bellhouse excavation calculator.',
    url: 'https://bellhouseexcavating.ca/calculators/excavation',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function ExcavationCalculatorPage() {
  return <CalculatorPageShell kind="excavation" />;
}
