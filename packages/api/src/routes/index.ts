import { AuthorityEnum } from '@Common/types';
import { requireAutharization, requireAuthentication } from '@Middlewares';
import express from 'express';

import AdminRouter from './admin';
import AuthRouter from './auth';
import UserRouter from './user';

const router = express.Router();

router.use(
  '/admin',
  requireAutharization(AuthorityEnum['Access Admin Panel']),
  AdminRouter
);
router.use('/auth', AuthRouter);
router.use('/user', requireAuthentication, UserRouter);

export default router;
