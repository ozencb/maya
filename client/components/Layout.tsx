import React from 'react';

import App from './App';
import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <App>{children}</App>
    </>
  );
};

export default Layout;
