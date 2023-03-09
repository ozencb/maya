import { APIError } from '@Utils';
import { Authorities } from '@Types';
import { db, trpcMiddleware } from '@Lib';

export default (requiredAuth: Authorities) =>
  trpcMiddleware(async ({ ctx, next }) => {
    try {
      const { userId } = ctx.req.session;

      if (!userId) {
        throw new APIError({
          code: 'UNAUTHORIZED',
        });
      }

      const hasAuthority = await db.authority.hasAuthority(
        userId,
        requiredAuth
      );

      if (!hasAuthority) {
        throw new APIError({
          code: 'UNAUTHORIZED',
        });
      }

      return next({ ctx });
    } catch (err) {
      throw err;
    }
  });
