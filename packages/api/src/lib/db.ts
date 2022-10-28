import pgPromise, { IInitOptions, IDatabase, IMain } from 'pg-promise'; // pg-promise core library

import {
  IExtensions,
  UserRepository,
  LogRepository,
  RoleRepository,
  AuthorityRepository,
} from '@Repositories';
import { __PROD__ } from '@Constants';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> = {
  // Extending the database protocol with our custom repositories;
  // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
  extend(obj: ExtendedProtocol, _dc: any) {
    obj.user = new UserRepository(obj);
    obj.log = new LogRepository(obj);
    obj.role = new RoleRepository(obj);
    obj.authority = new AuthorityRepository(obj);
  },
  query(e) {
    if (!__PROD__) console.log(e.query);
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
