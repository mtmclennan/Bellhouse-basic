import '../styles/main.scss';
import type { Metadata } from 'next';
import schema from '../data/schema.json';
import Script from 'next/script';
import LayoutHome from './components/layoutsWeb/layoutHome';
import GoogleTrackingScripts from './components/tracking/GoogleTrackingScripts';
import TrackingClickEvents from './components/tracking/TrackingClickEvents';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Oswald:wght@400;500;600;700&display=swap"
        />
      </head>
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

        <LayoutHome>{children}</LayoutHome>
        <GoogleTrackingScripts />
        <TrackingClickEvents />
      </body>
    </html>
  );
}
