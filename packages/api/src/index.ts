import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import loaders from '@Loaders';
import { logger } from '@Lib';

(async () => {
  const port = process.env.PORT || 8888;

  const app = express();

  await loaders(app);

  app.listen(port, () => {
    logger.verbose(`Server is running on port ${port}`);
  });
})();
