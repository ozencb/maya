import express from 'express';
import { AuthController } from '@Controllers';
import { validator } from '@Middlewares';

const router = express.Router();

export default (() => {
  router.post('/register', validator('register'), AuthController.register);

  return router;
})();
