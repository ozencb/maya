import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core';
import { Application } from 'express';
import config from '../config/mikro-orm.config';

import { User } from '../entities';

const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
};

const initOrm = async (app: Application) => {
  DI.orm = await MikroORM.init({
    ...config,
    cache: { enabled: false },
    migrations: {
      tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
      path: './migrations', // path to the folder with migrations
      pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
      transactional: true, // wrap each migration in a transaction
      disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
      allOrNothing: true, // wrap all migrations in master transaction
      dropTables: true, // allow to disable table dropping
      safe: false, // allow to disable table and column dropping
      emit: 'ts', // migration generation mode
    },
  });
  DI.em = DI.orm.em;
  DI.userRepository = DI.orm.em.getRepository(User);

  app.use((_req, _res, next) => {
    RequestContext.create(DI.orm.em, next);
  });
};

export { DI, initOrm };
