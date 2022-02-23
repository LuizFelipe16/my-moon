import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '../services/queryClient';
import { ReactQueryDevtools } from 'react-query/devtools';

import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthSessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
          <ToastContainer closeButton={false} theme="dark" />
        </ChakraProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </NextAuthSessionProvider>
  );
}

export default MyApp;