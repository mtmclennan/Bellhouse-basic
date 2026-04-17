import React from 'react';
import Services from './Services-page';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Residential, Rural & Contractor Services | Bellhouse',
  description:
    'Browse Bellhouse excavation, grading, hauling, and site support for residential jobs, rural properties, and contractor-led work across Southern Ontario.',
  pathname: '/services',
  openGraphDescription:
    'Bellhouse service overview for residential excavation, rural site work, and contractor-led hauling, grading, and project support across Southern Ontario.',
});

export default function page() {
  return <Services />;
}
