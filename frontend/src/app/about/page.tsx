import React from 'react';
import About from './About-page';
import { Metadata } from 'next';
import { validateMetadata } from '../../lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'About Bellhouse Excavating | Brant County Contractors',
  description:
    'Learn about Bellhouse Excavating, a Brant County excavation and hauling company supporting site work, grading, trucking, demolition, and contractor projects.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/about',
  },
  openGraph: {
    title: 'About Bellhouse Excavating | Brant County Contractors',
    description:
      'Learn about Bellhouse Excavating, a Brant County excavation and hauling company supporting site work, grading, trucking, demolition, and contractor projects.',
    url: 'https://bellhouseexcavating.ca/about',
    siteName: 'Bellhouse Excavating',
    type: 'website',
    images: [
      {
        url: 'https://bellhouseexcavating.ca/assets/Bellhouse-excavating-contractor.jpg',
        alt: 'Bellhouse Excavating contractor working on a job site in Brant County',
        width: 1200,
        height: 630,
      },
    ],
  },
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <About />;
}
