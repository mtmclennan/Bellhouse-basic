import React from 'react';
import Contact from './Contact-page';
import { Metadata } from 'next';
import Script from 'next/script';
import { validateMetadata } from '@/lib/utils/seoValidation';

export const metadata: Metadata = {
  title: 'Contact Bellhouse Excavating | Brantford, ON',
  description:
    'Contact Bellhouse Excavating for excavation, grading, hauling, and site work pricing across Brantford and nearby Southern Ontario areas.',
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
      <Contact />
    </>
  );
}
