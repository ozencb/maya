import { Request, Response } from 'express';

import { success, HTTPStatus, error } from '@Constants';
import { logger } from '@Lib';
import { UserService } from '@Services';

export const me = async (req: Request, res: Response) => {
  try {
    const { username } = req.session;

    if (!username) {
      req.session.destroy((_) => {});
      res.clearCookie('sid');
      return res.status(HTTPStatus.UNAUTHORIZED).send({ ...error });
    }

    const data = await UserService.getNonSensitiveByUsername(username);

    logger.info({
      createdBy: username,
      action: 'me',
      payload: { username: req.body.username },
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success, data });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'me',
      payload: { username: req.body.username },
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
