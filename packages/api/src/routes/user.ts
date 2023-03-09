import { UserController } from '@Controllers';
import { publicProcedure, trpcRouter } from '@Lib';
import { authenticationMiddleware } from '@Middlewares';

const procedure = publicProcedure.use(authenticationMiddleware);

export default trpcRouter({
  all: procedure.query(({ ctx }) => UserController.getAll(ctx)),
  me: procedure.query(({ ctx }) => UserController.me(ctx)),
});
