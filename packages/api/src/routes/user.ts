import express from 'express';
import { UserController } from '@Controllers';

const router = express.Router();

export default (() => {
  router.get('/me', UserController.me);

  return router;
})();
