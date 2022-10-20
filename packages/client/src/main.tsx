import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppRoutes } from '@Routes';
import { AppProvider } from '@Providers';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </React.StrictMode>
);
