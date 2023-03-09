import { AdminController } from '@Controllers';
import { trpcRouter } from '@Lib';

import { requireAutharization } from '@Middlewares';

const autharizationProcedure = requireAutharization('ACCESS_ADMIN_PANEL');
//const authenticationProcedure = requireAuthentication;

//authenticationProcedure.use(autharizationProcedure);

export default trpcRouter({
  userCount: autharizationProcedure.query(({ ctx }) =>
    AdminController.getUserCount(ctx)
  ),
});
