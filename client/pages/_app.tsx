import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.scss';

import store from '../store';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </>
    </Provider>
  );
}
export default MyApp;
