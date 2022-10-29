import { Request, Response } from 'express';

import { success, HTTPStatus, error } from '@Constants';
import { logger } from '@Lib';
import { AdminService } from '@Services';

export const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const data = await AdminService.getAllAdmins();

    logger.info({
      createdBy: req.session.username,
      action: 'getAllAdmins',
      payload: { username: req.body.username },
    });

    return res.status(HTTPStatus.SUCCESS).send({ ...success, data });
  } catch (err) {
    logger.warn({
      createdBy: req.session.username,
      action: 'getAllAdmins',
      payload: { username: req.body.username },
      error: err,
    });

    return res.status(HTTPStatus.ERROR).send({ ...error });
  }
};
