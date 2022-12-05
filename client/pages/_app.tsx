import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "../store/store";
import { Provider } from "react-redux";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <CookiesProvider>
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </CookiesProvider>
  );
}
