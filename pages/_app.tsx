import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { StylesProvider } from "@mui/styles";
import { AppThemeProvider } from "src/providers";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { Web3ReactProvider } from "@web3-react/core";

import { Layout } from "src/views/common/Layout";
import { GlobalStyles } from "src/styles/GlobalStyles";
import createEmotionCache from "src/utils/emotion/createEmotionCache";

// * Type imports
import type { FC } from "react";
import type { AppProps } from "next/app";
import type { EmotionCache } from "@emotion/react";
import { connectors } from "src/utils/connectors";
import { getConnectorName } from "src/utils/getConnectorName";

// if (typeof window !== 'undefined') {
//   ReactGA.initialize(process.env.NEXT_PUBLIC_GA)
//   ReactGA.pageview(window.location.pathname + window.location.search)
//   hotjar.initialize(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID), 6)
// }

type CustomAppProps = AppProps & {
  emotionCache?: EmotionCache;
  fallback: { [key: string]: any };
};

const clientSideEmotionCache = createEmotionCache();

const CustomApp: FC<CustomAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Manekiki</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GlobalStyles />
      <Web3ReactProvider
        connectors={connectors}
        key={connectors.map(([connector]) => getConnectorName(connector)).join("__")}
      >
        <StylesProvider injectFirst>
          <NextThemeProvider
            forcedTheme="light"
            defaultTheme="light"
            themes={["light", "dark"]}
            enableSystem={true}
            enableColorScheme={false}
            attribute="class"
          >
            <AppThemeProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AppThemeProvider>
          </NextThemeProvider>
        </StylesProvider>
      </Web3ReactProvider>
    </CacheProvider>
  );
};

export default CustomApp;
