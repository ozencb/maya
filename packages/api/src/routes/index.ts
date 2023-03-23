import * as trpcExpress from '@trpc/server/adapters/express';

import { createContext, trpcRouter } from '@Lib';
import AdminRouter from './admin';
import AuthRouter from './auth';
import RoleRouter from './role';
import UserRouter from './user';

const appRouter = trpcRouter({
  admin: AdminRouter,
  auth: AuthRouter,
  role: RoleRouter,
  user: UserRouter,
});

export type AppRouter = typeof appRouter;

const routes = trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext,
  batching: {
    enabled: false,
  },
});

export default routes;
