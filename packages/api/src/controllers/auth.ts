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

    const user = await AuthService.login(req.body);

    if (!user)
      return res
        .status(HTTPStatus.ERROR)
        .send({ ...error, message: 'Wrong username or password' });

    req.session.username = user.username;
    req.session.userId = user.id;

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
  const username = req.session.username;
  try {
    req.session.destroy((_) => {});
    res.clearCookie('sid');

    logger.info({
      createdBy: username,
      action: 'logout',
      payload: req.body,
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success });
  } catch (err) {
    logger.warn({
      createdBy: username,
      action: 'logout',
      payload: req.body,
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};

export const hasAuthority = async (req: Request, res: Response) => {
  try {
    const { username, userId } = req.session;

    if (!userId) return res.status(HTTPStatus.ERROR).send({ ...error });

    const data = await AuthService.hasAuthority(userId, req.body.authority);

    logger.info({
      createdBy: username,
      action: 'hasAuthority',
      payload: req.body,
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success, data });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'hasAuthority',
      payload: req.body,
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
