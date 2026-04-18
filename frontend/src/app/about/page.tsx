import React from 'react';
import About from './About-page';
import { Metadata } from 'next';
import { validateMetadata } from '../../lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'About Bellhouse Excavating | Brantford Excavation',
  description:
    'Learn about Bellhouse Excavating, serving Brantford and Southern Ontario with excavation, grading, hauling, and site work since 1982.',
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <About />;
}
