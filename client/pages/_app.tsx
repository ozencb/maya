import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import store from '../store';
import { AppPropsWithLayout } from '../types/layout';

import '../styles/globals.scss';

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
