import { ExpressContext, logger } from '@Lib';
import { AdminService } from '@Services';
import { TRPCError } from '@trpc/server';

export const getUserCount = async ({ req }: ExpressContext) => {
  try {
    const data = await AdminService.getUserCount();

    logger.info({
      createdBy: req.session.username,
      action: 'getUserCount',
      payload: { username: req.body.username },
    });

    return data;
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'getUserCount',
      payload: { username: req.body.username },
      error: err,
    });

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
};
