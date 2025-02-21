import '../styles/main.scss';
import schema from '../data/schema.json';
import Script from 'next/script';
import { Metadata } from 'next';
import { validateMetadata } from '../lib/utils/seoValidation';

// export const metadata: Metadata = {
//   title: 'Bellhouse Excavating - Foundation Digging & Dump Truck Services',
//   description:
//     'Bellhouse Excavating specializes in site preparation, aggregates, and excavation in Brant County and nearby regions. Contact us for quality excavation work!',
// };

// validateMetadata(metadata.title, metadata.description);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="beforeInteractive"
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
