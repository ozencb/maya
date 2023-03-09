import { Application } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';

import { createContext, t } from '@Lib';
import AdminRouter from './admin';
import AuthRouter from './auth';

/* const appRouter = trpcRouter({
  admin: AdminRouter,
  auth: AuthRouter,
  role: RoleRouter,
  user: UserRouter,
}); */

const appRouter = t.mergeRouters(AdminRouter, AuthRouter);
export type AppRouter = typeof appRouter;

const addTrpcRouters = (app: Application) => {
  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
};

export default addTrpcRouters;
