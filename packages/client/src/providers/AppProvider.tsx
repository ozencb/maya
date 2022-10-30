import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

import { ErrorFallback, Notifications } from '@UtilityComponents';
import Routes from './RouteProvider';
import { queryClient } from '@Lib';

const AppProvider = () => {
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HelmetProvider>
            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
            <Notifications />
            <Router>
              <Routes />
            </Router>
          </HelmetProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </React.Suspense>
  );
};

export default AppProvider;
