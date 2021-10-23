import { Application } from 'express';

const expressLoaders = (app: Application) => {
  app.get('/', (_req, res) => {
    res.send('Hello!');
  });
};

export default expressLoaders;
