import React from 'react';
import ReactDOM from 'react-dom/client';

import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { AppRoutes } from '@Routes';
import { ErrorFallback } from '@Layout';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>loading</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <Router>
              <AppRoutes />
            </Router>
          </HelmetProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  </React.StrictMode>
);
