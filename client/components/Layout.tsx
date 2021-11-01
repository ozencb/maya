import React from 'react';
import { Provider } from 'react-redux';

import store from '../store';
import App from './App';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <App>{children}</App>
      </Provider>
    </>
  );
};

export default Layout;
