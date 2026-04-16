import type { Metadata } from 'next';
import { validateMetadata } from '@/lib/utils/seoValidation';
import type { CalculatorKind } from '../types/calculator';

const baseUrl = 'https://bellhouseexcavating.ca';

export const calculatorSeoConfig: Record<
  CalculatorKind,
  {
    title: string;
    description: string;
    resourcePath: string;
    legacyPath: string;
  }
> = {
  excavation: {
    title: 'Excavation Calculator for Volume & Loads | Bellhouse',
    description:
      'Estimate excavation volume, loose material, truck loads, and weight for foundation digs, trenching, and cut-and-haul planning with Bellhouse.',
    resourcePath: '/resources/excavation-calculator/',
    legacyPath: '/calculators/excavation',
  },
  gravel: {
    title: 'Gravel Calculator for Base & Truck Loads | Bellhouse',
    description:
      'Estimate gravel quantity, compacted base volume, truck loads, and weight for driveways, pads, lanes, and aggregate delivery with Bellhouse.',
    resourcePath: '/resources/gravel-calculator/',
    legacyPath: '/calculators/gravel',
  },
  topsoil: {
    title: 'Topsoil Calculator for Coverage & Loads | Bellhouse',
    description:
      'Estimate topsoil coverage, placed volume, truck loads, and weight for finish grading, yard shaping, and delivery planning with Bellhouse.',
    resourcePath: '/resources/topsoil-calculator/',
    legacyPath: '/calculators/topsoil',
  },
};

export function getCalculatorMetadata(
  kind: CalculatorKind,
  canonicalPath: string = calculatorSeoConfig[kind].resourcePath,
): Metadata {
  const config = calculatorSeoConfig[kind];
  const canonicalUrl = `${baseUrl}${canonicalPath}`;

  const metadata: Metadata = {
    title: config.title,
    description: config.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      siteName: 'Bellhouse Excavating',
      type: 'website',
    },
  };

  validateMetadata(metadata.title, metadata.description);

  return metadata;
}
