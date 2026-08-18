import '../styles/main.scss';
import type { Metadata, Viewport } from 'next';
import { Open_Sans, Oswald } from 'next/font/google';
import schema from '../data/schema.json';
import Script from 'next/script';
import LayoutHome from './components/layoutsWeb/layoutHome';
import SkipToContent from './components/UI/SkipToContent';
import AttributionTracker from './components/tracking/AttributionTracker';
import GoogleTrackingScripts from './components/tracking/GoogleTrackingScripts';
import TrackingClickEvents from './components/tracking/TrackingClickEvents';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-open-sans',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-oswald',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bellhouseexcavating.ca'),
};

export const viewport: Viewport = {
  themeColor: '#272727',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${openSans.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
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

        <SkipToContent />

        {/* Local Business Schema */}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        <LayoutHome>{children}</LayoutHome>
        <AttributionTracker />
        <GoogleTrackingScripts />
        <TrackingClickEvents />
      </body>
    </html>
  );
}
