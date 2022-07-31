import * as promise from 'bluebird'; // best promise library today
import pgPromise, { IInitOptions, IDatabase, IMain } from 'pg-promise'; // pg-promise core library

import { IExtensions, UsersRepository, LogsRepository } from '@Repositories';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> = {
  // Using a custom promise library, instead of the default ES6 Promise:
  promiseLib: promise,

  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj: ExtendedProtocol, _dc: any) {
    obj.users = new UsersRepository(obj);
    obj.logs = new LogsRepository(obj);
  },
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export { db, pgp };
