import { Request, Response } from 'express';

import { success, HTTPStatus, error } from '@Constants';
import { logger } from '@Lib';
import { UserService } from '@Services';

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = UserService.getAll();

    logger.info({
      createdBy: 'test',
      action: 'allUsers',
      payload: req.body,
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success, data });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'allUsers',
      payload: req.body,
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const username = req.session.username!;

    const data = await UserService.getNonSensitiveByUsername(username);

    logger.info({
      createdBy: username,
      action: 'me',
      payload: req.body,
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success, data });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'me',
      payload: req.body,
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
