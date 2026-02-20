import '../styles/main.scss';
import schema from '../data/schema.json';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body>{children}</body>
    </html>
  );
}
