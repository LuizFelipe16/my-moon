import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthSessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        <ToastContainer closeButton={false} theme="dark" />
      </ChakraProvider>
    </NextAuthSessionProvider>
  );
}

export default MyApp;