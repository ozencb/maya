import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';

import routes from '@Routes';
import { ONE_DAY_IN_MS, __PROD__ } from '@Constants';
import { redisClient } from '@Lib';

const SESSION_SECRET = process.env.SESSION_SECRET!;

const expressLoaders = (app: Application) => {
  const RedisStore = connectRedis(session);

  app.use(
    (
      err: ErrorRequestHandler,
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' });
      } else {
        next(err);
      }
    }
  );

  app.use((_req, res, next) => {
    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.set('Expires', '-1');
    res.set('Pragma', 'no-cache');
    next();
  });

  app.use(cookieParser());

  if (__PROD__) {
    app.use(helmet());
  }

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(compression());

  app.use(
    cors({
      origin: (_origin, callback) => {
        callback(null, true);
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    })
  );

  app.use(
    session({
      name: 'sid',
      secret: SESSION_SECRET,
      saveUninitialized: true,
      resave: false,
      store: new RedisStore({ client: redisClient }),
      cookie: {
        secure: __PROD__ ? true : false,
        httpOnly: __PROD__ ? true : false,
        maxAge: ONE_DAY_IN_MS,
      },
    })
  );

  app.use('/api', routes);
};

export default expressLoaders;
