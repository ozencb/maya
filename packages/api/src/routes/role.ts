import express from 'express';
import { RoleController } from '@Controllers';

const router = express.Router();

export default (() => {
  router.get('/all', RoleController.getAllRoles);
  router.get('/user-roles', RoleController.getUserRoles);

  return router;
})();
