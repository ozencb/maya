import { Application } from 'express';

import expressLoader from './express';
import mikroOrm from './mikro-orm';

export default async (app: Application) => {
  expressLoader(app);
  const orm = await mikroOrm();
  return { orm };
};
