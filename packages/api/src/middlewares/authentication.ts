import { TRPCError } from '@trpc/server';
import { publicProcedure, trpcMiddleware } from '@Lib';

export default publicProcedure.use(
  trpcMiddleware(({ ctx, next }) => {
    try {
      const { username } = ctx.req.session;

      if (!username) {
        ctx.req.session.destroy((_) => {});
        ctx.res.clearCookie('sid');
        throw new TRPCError({
          code: 'BAD_REQUEST',
        });
      }

      return next({ ctx });
    } catch (err) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: err.details,
      });
    }
  })
);
