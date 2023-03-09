import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { Request, Response } from 'express';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

export const trpcRouter = t.router;
export const trpcMiddleware = t.middleware;
export const publicProcedure = t.procedure;

export type ExpressContext = {
  req: Request;
  res: Response;
};
