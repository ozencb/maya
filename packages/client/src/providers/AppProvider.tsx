import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import { ErrorFallback } from '@Layout';
import Routes from './RouteProvider';
import { queryClient } from '@Lib';

const AppProvider = () => {
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <Router>
              <Routes />
            </Router>
          </HelmetProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppProvider;
