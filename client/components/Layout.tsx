import React from 'react';

import App from './App';
import NavBar from './NavBar';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <App>
      <NavBar />
      {children}
    </App>
  );
};

export default Layout;
