import React, { useEffect } from 'react';

import AuthRoute from './AuthRoute';
import initApplication from '@Helpers/init';

type AppProps = {
  children: React.ReactNode;
};

const App: React.FC<AppProps> = ({ children }) => {
  useEffect(() => {
    (async () => {
      await initApplication();
    })();
  }, []);

  //if (configReducer.loading) return <Loading />;

  return <AuthRoute>{children}</AuthRoute>;
};

export default App;
