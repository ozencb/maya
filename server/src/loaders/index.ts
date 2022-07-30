import { Application } from 'express';

import expressLoader from './express';

export default async (app: Application) => {
  expressLoader(app);
};
