import "../styles/main.scss";

import type { AppProps } from "next/app";
import { AuthContextProvider } from "@/store/auth-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />;
    </AuthContextProvider>
  );
}
