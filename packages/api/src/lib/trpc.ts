import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { Request, Response } from 'express';
import { APIError } from 'utils/error';
import { ZodError } from 'zod';

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res });

type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        notifyClient: (error as APIError).notifyClient || false,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
});

export const trpcRouter = t.router;
export const trpcMiddleware = t.middleware;
export const publicProcedure = t.procedure;

export type ExpressContext = {
  req: Request;
  res: Response;
};
