import pgPromise, { IInitOptions, IDatabase, IMain } from 'pg-promise'; // pg-promise core library
import chalk from 'chalk';

import {
  IExtensions,
  UserRepository,
  LogRepository,
  RoleRepository,
  AuthorityRepository,
} from '@Repositories';
import { __PROD__ } from '@Constants';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

function camelizeColumns(data: any) {
  const tmp = data[0];
  for (const prop in tmp) {
    const camel = pgPromise.utils.camelize(prop);
    if (!(camel in tmp)) {
      for (let i = 0; i < data.length; i++) {
        const d = data[i];
        d[camel] = d[prop];
        delete d[prop];
      }
    }
  }
}

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
    if (!__PROD__) console.log(chalk.cyan(e.query));
  },
  receive({ data }) {
    camelizeColumns(data);
  },
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp({
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'mayadb',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
});

export { db, pgp };
