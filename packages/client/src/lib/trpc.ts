import { createTRPCReact } from '@trpc/react-query';

import type { AppRouter } from '../../../api/src/routes';

export const trpc = createTRPCReact<AppRouter>();
