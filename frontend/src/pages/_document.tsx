import { Html, Head, Main, NextScript } from 'next/document';
import schema from '../data/schema.json';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.png" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
