import React from 'react';

type AppProps = {
  children: React.ReactNode;
};

const App: React.FC<AppProps> = ({ children }) => {
  return <>{children}</>;
};

export default App;
