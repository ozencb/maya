import express from 'express';
import { AdminController } from '@Controllers';

const router = express.Router();

export default (() => {
  router.get('/all-admins', AdminController.getAllAdmins);

  return router;
})();
