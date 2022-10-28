import { NextFunction, Request, Response } from 'express';
import { error, HTTPStatus } from '@Constants';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.session;

    if (!username) {
      req.session.destroy((_) => {});
      res.clearCookie('sid');
      return res.status(HTTPStatus.UNAUTHORIZED).send({ ...error });
    }

    return next();
  } catch (err) {
    if (err.isJoi) console.log(err);

    return res
      .status(HTTPStatus.ERROR)
      .send({ ...error, message: err.details });
  }
};
