import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import routes from '@Routes';
import { __prod__ } from '@Constants';

const expressLoaders = (app: Application) => {
  app.use((_req, res, next) => {
    res.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.set('Expires', '-1');
    res.set('Pragma', 'no-cache');
    next();
  });

  app.use(cookieParser());

  if (__prod__) {
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

  app.use('/api', routes);
};

export default expressLoaders;
