import React from 'react';
import About from './About-page';
import { Metadata } from 'next';
import { validateMetadata } from '../../lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'About Bellhouse Excavating | Brantford & Brant County Excavation',
  description:
    'Learn about Bellhouse Excavating, a Brantford-area excavation company serving Brant County and nearby communities with site work, grading, and hauling since 1982.',
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return <About />;
}
