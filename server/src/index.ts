import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import loaders from './loaders';
import { User } from './entities';

(async () => {
  const port = process.env.PORT || 8888;
  const app = express();

  const { orm } = await loaders(app);

  // Test insert/read
  const users = [
    new User('user1', 'password1'),
    new User('user2', 'password2')
  ];
  const existingUsers = await orm.em.find(User, {});
  if (!existingUsers) {
    await orm.em.persistAndFlush(users);
  }

  console.log(await orm.em.find(User, {}));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    // logger.verbose('Server is running on port %s', port);
  });
})();
