import { AdminController } from '@Controllers';
import { publicProcedure, trpcRouter } from '@Lib';

import {
  autharizationMiddleware,
  authenticationMiddleware,
} from '@Middlewares';

const protetectedProcedure = publicProcedure.use(
  authenticationMiddleware.unstable_pipe(
    autharizationMiddleware('ACCESS_ADMIN_PANEL')
  )
);

export default trpcRouter({
  userCount: protetectedProcedure.query(({ ctx }) =>
    AdminController.getUserCount(ctx)
  ),
});
