import express from 'express';
import { AuthController } from '../controllers';

const router = express.Router();

export default (() => {
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.post('/refresh-token', AuthController.refreshToken);
  router.post('/logout', AuthController.logOut);

  return router;
})();
