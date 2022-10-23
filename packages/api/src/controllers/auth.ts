import { Request, Response } from 'express';

import { success, HTTPStatus, error } from '@Constants';
import { logger } from '@Lib';
import { AuthService, UserService } from '@Services';
import { RoleEnum } from '@Common/types';

export const register = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const createdUser = await AuthService.register(req.body);
    await UserService.addUserRole(createdUser.id, RoleEnum.User);

    logger.info({
      createdBy: username,
      action: 'register',
      payload: { username: req.body.username },
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'register',
      payload: { username: req.body.username },
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const user = await AuthService.login(req.body);

    if (!user)
      return res
        .status(HTTPStatus.ERROR)
        .send({ ...error, message: 'Wrong username or password' });

    req.session.username = user.username;
    req.session.userId = user.id;

    logger.info({
      createdBy: username,
      action: 'login',
      payload: { username: req.body.username },
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'login',
      payload: { username: req.body.username },
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
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

    return res.status(HTTPStatus.SUCCESS).send({ ...success });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'logout',
      payload: { username: req.body.username },
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
