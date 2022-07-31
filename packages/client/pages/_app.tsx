import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import store from '@Store';
import { AppPropsWithLayout } from '@Types/layout';

import '@Styles/globals.scss';
import { App } from '@Components';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <>
        <App>{getLayout(<Component {...pageProps} />)}</App>
        <Toaster />
      </>
    </Provider>
  );
}
export default MyApp;
