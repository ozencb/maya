import {
  EntityManager,
  EntityRepository,
  MikroORM,
  RequestContext,
} from '@mikro-orm/core';
import { Application } from 'express';

import { User, Log } from '../entities';
import config from '../config/mikro-orm.config';

const DB = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  logRepository: EntityRepository<Log>;
};

const initOrm = async (app: Application) => {
  DB.orm = await MikroORM.init({
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
  DB.em = DB.orm.em;
  DB.userRepository = DB.orm.em.getRepository(User);

  app.use((_req, _res, next) => {
    RequestContext.create(DB.orm.em, next);
  });
};

export { DB, initOrm };
