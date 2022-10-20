import 'dotenv/config';
import pgPromise, { IMain } from 'pg-promise'; // pg-promise core library

const pgp: IMain = pgPromise();

const db = pgp({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const runUp = async () => {
  const queries = {
    createAppUserTable: `create table app_user
                        (
                            id       bigserial primary key,
                            username varchar(255),
                            password varchar(255)
                        );`,
    createAppUserUniqueUsernameIndex: `create unique index app_user_username_unq_idx on app_user (username);`,
    createLogTable: `create table log
                    (
                        id         bigserial primary key,
                        created_at timestamp,
                        created_by varchar(255),
                        action     varchar(255),
                        level      varchar(255),
                        error      varchar(255),
                        payload    jsonb
                    );`,
  };

  return db.task(async (t) => {
    const tasks = Object.entries(queries).map(async ([key, query]) => {
      console.log(`Running ${key} query`);
      return t.none(query);
    });
    await t.batch(tasks);
  });
};

const runDown = async () => {
  const queries = {
    dropAppUserTable: 'DROP TABLE IF EXISTS app_user;',
    dropLogTable: 'DROP TABLE IF EXISTS log;',
  };

  return db.task(async (t) => {
    const tasks = Object.entries(queries).map(async ([key, query]) => {
      console.log(`Running ${key} query`);
      return t.none(query);
    });
    await t.batch(tasks);
  });
};

(async () => {
  for (var i = 0; i < process.argv.length; i++) {
    switch (process.argv[i]) {
      case 'up':
        await runUp();
        break;
      case 'down':
        await runDown();
        break;
    }
  }
})();
