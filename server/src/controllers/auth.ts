import { Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import Utils from '@Utils';
import { success, Status, error } from '@Constants';
import { AuthServices, UserServices } from '@Services';
import { logger } from '@Lib';
import {
  setRefreshToken,
  setEmptyRefreshToken,
  compareRefreshTokensOnStore,
  storeRefreshToken,
} from '../helpers';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const registeredUser = await AuthServices.register({ username, password });

    logger.info({
      createdBy: username,
      action: 'register',
      payload: { username: req.body.username },
    });

    res.status(Status.SUCCESS).send({ ...success, data: registeredUser });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'register',
      payload: { username: req.body.username },
      error: err,
    });

    res.status(Status.ERROR).send({ ...error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const loggedInUser = await AuthServices.login({ username, password });

    const accessToken = Utils.generateAccessToken(loggedInUser);
    const refreshToken = Utils.generateRefreshToken(loggedInUser);

    setRefreshToken(res, refreshToken);
    storeRefreshToken(loggedInUser, refreshToken);

    logger.info({
      createdBy: username,
      action: 'login',
      payload: { username: req.body.username },
    });

    res.status(Status.SUCCESS).send({ ...success, data: { accessToken } });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'login',
      payload: { username: req.body.username },
      error: err,
    });

    res.status(Status.ERROR).send({ ...error });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token: string = req.cookies['RT'];

    if (!token) {
      setEmptyRefreshToken(res);
      return res.status(Status.SUCCESS).send({ ...success });
    }

    let payload: JwtPayload;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
    } catch (err) {
      setEmptyRefreshToken(res);
      return res
        .status(Status.UNAUTHORIZED)
        .send({ ...error, data: { accessToken: '' } });
    }

    const user = await UserServices.getDetailById(payload.id);

    if (!user) {
      setEmptyRefreshToken(res);
      return res
        .status(Status.UNAUTHORIZED)
        .send({ ...error, data: { accessToken: '' } });
    }

    if (!(await compareRefreshTokensOnStore(user, token))) {
      setEmptyRefreshToken(res);
      return res
        .status(Status.UNAUTHORIZED)
        .send({ ...error, data: { accessToken: '' } });
    }

    const accessToken = Utils.generateAccessToken(user);
    const refreshToken = Utils.generateRefreshToken(user);
    setRefreshToken(res, refreshToken);
    storeRefreshToken(user, refreshToken);

    return res
      .status(Status.SUCCESS)
      .send({ ...success, data: { accessToken } });
  } catch (err) {
    logger.warn({
      createdBy: 'system',
      action: 'register',
      error: err,
    });

    return res.status(Status.ERROR).send({ ...error });
  }
};

export const logOut = async (_req: Request, res: Response) => {
  try {
    setEmptyRefreshToken(res);
    res.status(Status.SUCCESS).send({ ...success, data: true });
  } catch (err) {
    logger.warn({
      createdBy: 'system',
      action: 'register',
      error: err,
    });
    res.status(Status.ERROR).send({ ...error });
  }
};
