import { APIError } from '@Utils';
import { trpcMiddleware } from '@Lib';

export default trpcMiddleware(({ ctx, next }) => {
  try {
    const { username } = ctx.req.session;

    if (!username) {
      ctx.req.session.destroy((_) => {});
      ctx.res.clearCookie('sid');
      throw new APIError({
        code: 'UNAUTHORIZED',
      });
    }

    return next({ ctx });
  } catch (err) {
    throw err;
  }
});
