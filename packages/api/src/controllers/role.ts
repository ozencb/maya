import { ExpressContext, logger } from '@Lib';
import { RoleService } from '@Services';

export const getAllRoles = async ({ req }: ExpressContext) => {
  try {
    const data = await RoleService.getAllRoles();

    logger.info({
      createdBy: req.session.username,
      action: 'getAllRoles',
      payload: { username: req.body.username },
    });

    return data;
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'getAllRoles',
      payload: { username: req.body.username },
      error: err,
    });

    throw err;
  }
};

export const getUserRoles = async ({ req }: ExpressContext) => {
  try {
    const data = await RoleService.getUserRoles();

    logger.info({
      createdBy: req.session.username,
      action: 'getUserRoles',
      payload: { username: req.body.username },
    });

    return data;
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'getUserRoles',
      payload: { username: req.body.username },
      error: err,
    });

    throw err;
  }
};
