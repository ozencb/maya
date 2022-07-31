import { NextFunction, Request, Response } from 'express';

import { error, Status } from '@Constants';
import schemas from '@Schemas';

export default (schema: keyof typeof schemas) => {
  if (!schemas.hasOwnProperty(schema))
    throw new Error(`'${schema}' validator is not exist`);

  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await schemas[schema].parseAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err.isJoi) console.log(err);

      res.status(Status.ERROR).send({ ...error, message: err.details });
    }
  };
};
