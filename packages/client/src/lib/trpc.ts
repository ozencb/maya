import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '@Server/routes';

export const trpc = createTRPCReact<AppRouter>();
