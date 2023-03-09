import { UserController } from '@Controllers';
import { trpcRouter } from '@Lib';
import { requireAuthentication } from '@Middlewares';

const procedure = requireAuthentication;

export default trpcRouter({
  all: procedure.query(({ ctx }) => UserController.getAll(ctx)),
  me: procedure.query(({ ctx }) => UserController.me(ctx)),
});
