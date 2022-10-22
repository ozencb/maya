import { Request, Response } from 'express';

import { success, HTTPStatus, error } from '@Constants';
import { logger } from '@Lib';
import { AuthService } from '@Services';

export const register = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const response = await AuthService.register(req.body);

    logger.info({
      createdBy: username,
      action: 'register',
      payload: { username: req.body.username },
    });

    res.status(HTTPStatus.SUCCESS).send({ ...success, response });
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

    const response = await AuthService.login(req.body);

    if (response) {
      req.session.username = response.username;
      req.session.userId = response.id;
    }

    logger.info({
      createdBy: username,
      action: 'login',
      payload: { username: req.body.username },
    });

    res
      .status(HTTPStatus.SUCCESS)
      .send({ ...success, id: response.id, username: response.username });
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

export const logout = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    req.session.destroy((_) => {});
    res.clearCookie('sid');

    logger.info({
      createdBy: username,
      action: 'logout',
      payload: { username: req.body.username },
    });

    res.status(HTTPStatus.SUCCESS).send({ ...success });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'logout',
      payload: { username: req.body.username },
      error: err,
    });

    res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
