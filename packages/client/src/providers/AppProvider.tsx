import React, { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { httpLink } from '@trpc/client';

import { ErrorFallback, Notifications } from '@UtilityComponents';

import { trpc } from '@Lib';
import toast from 'react-hot-toast/headless';

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchInterval: false,
        retry: false,
        onError: (err) => {
          const { message } = (err as any).shape;
          const { notifyClient } = (err as any).shape.data;
          if (notifyClient && message) {
            console.log('errrrrr');
            toast.error(message);
          }
        },
      },
      mutations: {
        onError: (err) => {
          const { message } = (err as any).shape;
          const { notifyClient } = (err as any).shape.data;
          if (notifyClient && message) {
            console.log('errrrrr');
            toast.error(message);
          }
        },
      },
    },
  });

  const trpcClient = trpc.createClient({
    links: [
      // loggerLink(),
      httpLink({
        url: 'http://localhost:4000/api/trpc',
        fetch(url, options) {
          return fetch(url, {
            ...options,
            credentials: 'include',
          });
        },
      }),
    ],
  });

  return (
    <React.Suspense fallback={<div>loading</div>}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HelmetProvider>
              {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
              <Notifications />
              {children}
            </HelmetProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </trpc.Provider>
    </React.Suspense>
  );
};

export default AppProvider;
