import { TRPCError } from '@trpc/server';

import { ExpressContext, logger } from '@Lib';
import { AuthService, UserService } from '@Services';
import { APIError } from '@Utils';

export const register = async ({ req }: ExpressContext) => {
  try {
    const { username } = req.body;

    const userExists = await UserService.userExists(username);

    if (userExists)
      throw new APIError({
        code: 'CONFLICT',
        message: 'This username is taken.',
        notifyClient: true,
      });

    const createdUser = await AuthService.register(req.body);
    await UserService.addUserRole(createdUser.id, 'USER');

    const user = await AuthService.login(req.body);

    req.session.username = user!.username;
    req.session.userId = user!.id;

    logger.info({
      createdBy: username,
      action: 'register',
      payload: { username: req.body.username },
    });

    return 'Succesfully registered!';
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'register',
      payload: { username: req.body.username },
      error: err,
    });

    console.log(err);

    throw err;
  }
};

export const login = async ({ req }: ExpressContext) => {
  try {
    const { username } = req.body;

    const user = await AuthService.login(req.body);

    if (!user)
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Wrong username or password',
      });

    req.session.username = user.username;
    req.session.userId = user.id;

    logger.info({
      createdBy: username,
      action: 'login',
      payload: { username: req.body.username },
    });

    return 'Successfully logged in!';
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'login',
      payload: { username: req.body.username },
      error: err,
    });

    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
};

export const logout = async ({ req, res }: ExpressContext) => {
  const username = req.session.username;
  try {
    req.session.destroy((_) => {});
    res.clearCookie('sid');

    logger.info({
      createdBy: username,
      action: 'logout',
      payload: req.body,
    });

    return 'Successfully logged out!';
  } catch (err) {
    logger.warn({
      createdBy: username,
      action: 'logout',
      payload: req.body,
      error: err,
    });

    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: err,
    });
  }
};

export const hasAuthority = async ({ req }: ExpressContext) => {
  try {
    const { username, userId } = req.session;

    if (!userId)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'No user',
      });

    const hasAuthority = await AuthService.hasAuthority(
      userId,
      req.body.authority
    );

    logger.info({
      createdBy: username,
      action: 'hasAuthority',
      payload: req.body,
    });

    return hasAuthority;
  } catch (err) {
    logger.warn({
      createdBy: req.body.username,
      action: 'hasAuthority',
      payload: req.body,
      error: err,
    });

    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: err,
    });
  }
};
