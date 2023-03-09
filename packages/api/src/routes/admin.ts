import { AdminController } from '@Controllers';
import { trpcRouter } from '@Lib';

import { AuthorityEnum } from '@Types';
import { requireAutharization } from '@Middlewares';

const autharizationProcedure = requireAutharization(
  AuthorityEnum['Access Admin Panel']
);
//const authenticationProcedure = requireAuthentication;

//authenticationProcedure.use(autharizationProcedure);

export default trpcRouter({
  userCount: autharizationProcedure.query(({ ctx }) =>
    AdminController.getUserCount(ctx)
  ),
});
