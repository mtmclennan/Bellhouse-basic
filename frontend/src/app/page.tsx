import React from 'react';
import HomePage from './Home-page';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/siteMetadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Bellhouse Excavating | Excavation, Site Prep & Trucking',
  description:
    'Bellhouse handles residential excavation, rural site work, and contractor-led hauling and grading across Brantford and nearby Southern Ontario communities.',
  pathname: '/',
  openGraphTitle:
    'Bellhouse Excavating | Excavation, Site Prep & Trucking Across Southern Ontario',
  openGraphDescription:
    'Bellhouse supports homeowners, rural properties, and contractor-led projects with excavation, site prep, grading, and trucking across Southern Ontario.',
});

export default function page() {
  return <HomePage />;
}
