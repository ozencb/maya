import express from 'express';
import { AdminController } from '@Controllers';

const router = express.Router();

export default (() => {
  router.get('/user-count', AdminController.getUserCount);

  return router;
})();
