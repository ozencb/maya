import { ExpressContext, logger } from '@Lib';
import { UserService } from '@Services';

export const getAll = async ({ req }: ExpressContext) => {
  try {
    const data = UserService.getAll();

    logger.info({
      createdBy: req.session.username,
      action: 'allUsers',
      payload: req.body,
    });

    return data;
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'allUsers',
      payload: req.body,
      error: err,
    });

    throw err;
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

    return data;
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'me',
      payload: req.body,
      error: err,
    });

    throw err;
  }
};
