import { NextFunction, Request, Response } from 'express';
import { error, HTTPStatus } from '@Constants';
import { AuthorityEnum } from '@Common/types';
import { db } from '@Lib';

export default (requiredAuth: AuthorityEnum) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.session;

      if (!userId) {
        return res.status(HTTPStatus.UNAUTHORIZED).send({ ...error });
      }

      const hasAuthority = await db.authority.hasAuthority(
        userId,
        requiredAuth
      );

      if (!hasAuthority) {
        return res
          .status(HTTPStatus.UNAUTHORIZED)
          .send({
            ...error,
            message: 'You are not authorized for this action!',
          });
      }

      return next();
    } catch (err) {
      if (err.isJoi) console.log(err);

      return res
        .status(HTTPStatus.ERROR)
        .send({ ...error, message: err.details });
    }
  };
};
