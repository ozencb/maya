import { RoleController } from '@Controllers';
import { trpcRouter, publicProcedure } from '@Lib';

export default trpcRouter({
  all: publicProcedure.query(({ ctx }) => RoleController.getAllRoles(ctx)),
  userRoles: publicProcedure.query(({ ctx }) =>
    RoleController.getUserRoles(ctx)
  ),
});
