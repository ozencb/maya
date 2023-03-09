import { TRPCError } from '@trpc/server';
import { Authorities } from '@Types';
import { db, publicProcedure, trpcMiddleware } from '@Lib';

export default (requiredAuth: Authorities) =>
  publicProcedure.use(
    trpcMiddleware(async ({ ctx, next }) => {
      try {
        const { userId } = ctx.req.session;

        if (!userId) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
          });
        }

        const hasAuthority = await db.authority.hasAuthority(
          userId,
          requiredAuth
        );

        if (!hasAuthority) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
          });
        }

        return next({ ctx });
      } catch (err) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: err.details,
        });
      }
    })
  );
