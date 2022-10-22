import { Request, Response } from 'express';

import { success, HTTPStatus, error } from '@Constants';
import { logger } from '@Lib';
import { UserService } from '@Services';

export const me = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;

    const result = await UserService.getDetailByUsername(username);

    logger.info({
      createdBy: username,
      action: 'me',
      payload: { username: req.body.username },
    });

    res.status(HTTPStatus.SUCCESS).send({ ...success, result });
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'me',
      payload: { username: req.body.username },
      error: err,
    });

    res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
