import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import loaders from './loaders';
import { logger } from './lib';

(async () => {
  const port = process.env.PORT || 8888;

  const app = express();

  loaders(app);

  app.listen(port, () => {
    logger.verbose(`Server is running on port ${port}`);
  });
})();
