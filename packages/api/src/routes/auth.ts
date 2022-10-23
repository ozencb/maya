import express from 'express';
import { AuthController } from '@Controllers';
import { validator } from '@Middlewares';

const router = express.Router();

export default (() => {
  router.post('/register', validator('register'), AuthController.register);
  router.post('/login', validator('login'), AuthController.login);
  router.post('/logout', AuthController.logout);
  router.get('/has-authority', AuthController.hasAuthority);

  return router;
})();
