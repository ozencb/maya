import React from 'react';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <Toaster />
    </>
  );
};

export default App;
