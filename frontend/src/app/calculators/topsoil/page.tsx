import type { Metadata } from 'next';
import { CalculatorPageShell } from '@/features/calculators/components/CalculatorPageShell';
import { validateMetadata } from '@/lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Topsoil Calculator | Bellhouse',
  description:
    'Use the Bellhouse topsoil calculator to estimate coverage volume, tonnage, and rough truck loads for grading and finish work.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/calculators/topsoil',
  },
  openGraph: {
    title: 'Topsoil Calculator | Bellhouse',
    description:
      'Estimate coverage volume, tonnage, and rough truck loads with the Bellhouse topsoil calculator.',
    url: 'https://bellhouseexcavating.ca/calculators/topsoil',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
};

validateMetadata(metadata.title, metadata.description);

export default function TopsoilCalculatorPage() {
  return <CalculatorPageShell kind="topsoil" />;
}
