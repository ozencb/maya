import { Request, Response } from 'express';

import { success, HTTPStatus, error } from '@Constants';
import { logger } from '@Lib';
import { RoleService } from '@Services';

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const data = await RoleService.getAllRoles();

    logger.info({
      createdBy: req.session.username,
      action: 'getAllRoles',
      payload: { username: req.body.username },
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success, data });
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'getAllRoles',
      payload: { username: req.body.username },
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};

export const getUserRoles = async (req: Request, res: Response) => {
  try {
    const data = await RoleService.getUserRoles();

    logger.info({
      createdBy: req.session.username,
      action: 'getUserRoles',
      payload: { username: req.body.username },
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success, data });
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'getUserRoles',
      payload: { username: req.body.username },
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
