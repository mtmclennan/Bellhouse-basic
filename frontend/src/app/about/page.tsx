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
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <About />;
}
