import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider, RouteProvider } from '@Providers';
import { BrowserRouter as Router } from 'react-router-dom';

import './globals.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <RouteProvider />
      </Router>
    </AppProvider>
  </React.StrictMode>
);
