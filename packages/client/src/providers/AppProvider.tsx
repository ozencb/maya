import React, { ReactNode, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';

import { ErrorFallback, Notifications } from '@UtilityComponents';
import { trpc, queryClient } from '@Lib';
import { getFetch } from '@trpc/client';

type Props = {
  children: ReactNode;
};

const AppProvider = ({ children }: Props) => {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink(),
        httpBatchLink({
          url: 'http://localhost:4000/api/trpc',
          fetch: async (input, init?) => {
            console.log(input, init);

            const fetch = getFetch();
            const res = fetch(input, {
              ...init,
              credentials: 'include',
            });

            return res;
          },
        }),
      ],
    })
  );

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
