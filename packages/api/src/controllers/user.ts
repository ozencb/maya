import { success } from '@Constants';
import { ExpressContext, logger } from '@Lib';
import { UserService } from '@Services';
import { TRPCError } from '@trpc/server';

export const getAll = async ({ req }: ExpressContext) => {
  try {
    const data = UserService.getAll();

    logger.info({
      createdBy: req.session.username,
      action: 'allUsers',
      payload: req.body,
    });

    return { ...success, data };
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'allUsers',
      payload: req.body,
      error: err,
    });

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err,
    });
  }
};

export const me = async ({ req }: ExpressContext) => {
  try {
    const data = await UserService.getNonSensitiveByUsername(
      req.session.username!
    );

    logger.info({
      createdBy: req.session.username,
      action: 'me',
      payload: req.body,
    });

    return { ...success, data };
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'me',
      payload: req.body,
      error: err,
    });

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err,
    });
  }
};
