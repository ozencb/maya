import { MikroORM } from '@mikro-orm/core';
import config from '../config/mikro-orm.config';

const startOrm = async () =>
  MikroORM.init({
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
      emit: 'ts' // migration generation mode
    }
  });

export default startOrm;
