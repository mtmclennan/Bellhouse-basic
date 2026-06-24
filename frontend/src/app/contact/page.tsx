import React, { Suspense } from 'react';
import Contact from './Contact-page';
import { Metadata } from 'next';
import Script from 'next/script';
import { validateMetadata } from '@/lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Contact Bellhouse Excavating | Request a Quote',
  description:
    'Contact Bellhouse Excavating for excavation, grading, hauling, demolition, pond, and site work quotes in Brantford, Paris, and Brant County.',
  alternates: {
    canonical: 'https://bellhouseexcavating.ca/contact',
  },
  openGraph: {
    title:
      'Contact Bellhouse Excavating | Brantford, Paris & Brant County',
    description:
      'Call, text, or request a quote from Bellhouse Excavating for excavation, grading, hauling, and site work in Brantford, Paris, Brant County, and nearby serviced areas.',
    url: 'https://bellhouseexcavating.ca/contact',
    siteName: 'Bellhouse Excavating',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

validateMetadata(metadata.title, metadata.description);

export default function page() {
  return (
    <>
      {/* ReCAPTCHA */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="beforeInteractive"
      />
      <Suspense>
        <Contact />
      </Suspense>
    </>
  );
}
