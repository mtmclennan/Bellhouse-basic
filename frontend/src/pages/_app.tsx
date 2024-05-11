import "../styles/main.scss";
import { Open_Sans } from "next/font/google";

import type { AppProps } from "next/app";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={openSans.className}>
        <Component {...pageProps} />;
      </main>
    </>
  );
}
