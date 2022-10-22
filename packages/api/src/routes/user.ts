import express from 'express';
import { UserController } from '@Controllers';
import { UserService } from '@Services/index';
import { HTTPStatus, success } from '@Constants/http';

const router = express.Router();

export default (() => {
  router.get('/me', UserController.me);
  router.get('/all', async (_req, res) => {
    console.log('geldi');
    const data = await UserService.getAll();
    res.status(HTTPStatus.SUCCESS).send({ ...success, data });
  });

  return router;
})();
