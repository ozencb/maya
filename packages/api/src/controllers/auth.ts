import { Request, Response } from 'express';

import { success, HTTPStatus, error } from '@Constants';
import { logger } from '@Lib';

export const register = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    logger.info({
      createdBy: username,
      action: 'register',
      payload: { username: req.body.username },
    });

    res.status(HTTPStatus.SUCCESS).send({ ...success });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'register',
      payload: { username: req.body.username },
      error: err,
    });

    res.status(HTTPStatus.ERROR).send({ ...error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    logger.info({
      createdBy: username,
      action: 'login',
      payload: { username: req.body.username },
    });

    res.status(HTTPStatus.SUCCESS).send({ ...success });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'login',
      payload: { username: req.body.username },
      error: err,
    });

    res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
