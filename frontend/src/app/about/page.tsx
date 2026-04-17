import React from 'react';
import About from './About-page';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'About Bellhouse Excavating | Southern Ontario Excavation',
  description:
    'Learn about Bellhouse Excavating, serving Brantford and Southern Ontario with excavation, grading, hauling, and site work since 1982.',
  pathname: '/about',
});

export default function page() {
  return <About />;
}
