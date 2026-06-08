import '../styles/main.scss';
import type { Metadata } from 'next';
import schema from '../data/schema.json';
import Script from 'next/script';
import LayoutHome from './components/layoutsWeb/layoutHome';

export const metadata: Metadata = {
  metadataBase: new URL('https://bellhouseexcavating.ca'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        {/*
          Mark the document JS-ready before paint so reveal animations apply
          only as progressive enhancement. Without JS this class is never added
          and all `.landing-reveal` content stays visible by default.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />

        {/* Local Business Schema */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Global site tag (gtag.js) for GA4 and Google Ads */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-WQYLQLSB57"
        />

        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Google Analytics
              gtag('config', 'G-WQYLQLSB57');

              // Google Ads
              gtag('config', 'AW-16958173496');
            `,
          }}
        />

        <LayoutHome>{children}</LayoutHome>
      </body>
    </html>
  );
}
