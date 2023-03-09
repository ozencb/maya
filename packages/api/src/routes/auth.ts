import { AuthController } from '@Controllers';
import { trpcRouter, publicProcedure } from '@Lib';
import schemas from '@Schemas';

export default trpcRouter({
  register: publicProcedure
    .input(schemas.register)
    .mutation(({ ctx }) => AuthController.register(ctx)),
  login: publicProcedure
    .input(schemas.login)
    .mutation(({ ctx }) => AuthController.login(ctx)),
  logout: publicProcedure.mutation(({ ctx }) => AuthController.logout(ctx)),
  hasAuthority: publicProcedure.query(({ ctx }) =>
    AuthController.hasAuthority(ctx)
  ),
});
