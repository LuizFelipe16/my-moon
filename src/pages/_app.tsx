import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

import { GlobalStyle } from '../styles/global';
import { theme } from '../styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthSessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyle />
      </ChakraProvider>
    </NextAuthSessionProvider>
  );
}

export default MyApp;