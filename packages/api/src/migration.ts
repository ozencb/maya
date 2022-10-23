import 'dotenv/config';
import pgPromise, { IMain } from 'pg-promise';
import { AuthorityEnum, RoleEnum } from '@Common/types';

/* Helper script for setting up a fresh db  */

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
    createAppUserTable: `CREATE TABLE app_user
                        (
                            id         bigserial PRIMARY KEY,
                            created_at timestamp DEFAULT NOW(),
                            username   varchar(255) NOT NULL,
                            password   varchar(255) NOT NULL
                        );`,
    createAppUserUniqueUsernameIndex: `CREATE UNIQUE INDEX app_user_username_unq_idx ON app_user (username);`,
    createLogTable: `CREATE TABLE log
                    (
                        id         bigserial PRIMARY KEY,
                        created_at timestamp DEFAULT NOW(),
                        created_by varchar(255),
                        action     varchar(255) NOT NULL,
                        level      varchar(255) NOT NULL,
                        error      text,
                        payload    jsonb
                    );`,
    createAuthorityTable: `CREATE TABLE authority
                          (
                              id          bigserial PRIMARY KEY,
                              created_at  timestamp DEFAULT NOW(),
                              created_by  varchar(255),
                              code        varchar(255) NOT NULL,
                              description varchar(255),
                              UNIQUE (code)
                          );`,
    createRoleTable: `CREATE TABLE role
                      (
                          id          serial PRIMARY KEY,
                          created_at  timestamp DEFAULT NOW(),
                          created_by  varchar(255),
                          code        varchar(255) NOT NULL,
                          description varchar(255),
                          UNIQUE (code)
                      );`,
    createUserRoleTable: `CREATE TABLE user_role
                          (
                              id      serial PRIMARY KEY,
                              user_id bigint REFERENCES app_user (id) NOT NULL,
                              role_id int REFERENCES role (id),
                              UNIQUE (user_id)
                          );`,
    createRoleAuthorityTable: `CREATE TABLE role_authority
                              (
                                  id           serial PRIMARY KEY,
                                  role_id      int REFERENCES role (id)      NOT NULL,
                                  authority_id int REFERENCES authority (id) NOT NULL
                              );`,
    insertAuthorities: (() => {
      let query = '';
      (Object.keys(AuthorityEnum) as (keyof typeof AuthorityEnum)[]).forEach(
        (authority) => {
          query += `INSERT INTO authority(created_by, created_at, code, description) VALUES('ozencb', now(), '${AuthorityEnum[authority]}', '${authority}');`;
        }
      );
      return query;
    })(),
    insertRoles: (() => {
      let query = '';
      (Object.keys(RoleEnum) as (keyof typeof RoleEnum)[]).forEach((role) => {
        query += `INSERT INTO role(created_by, created_at, code, description) VALUES('ozencb', now(), '${RoleEnum[role]}', '${role}');`;
      });
      return query;
    })(),
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
    dropLogTable: 'DROP TABLE IF EXISTS log;',
    dropUserRoleTable: 'DROP TABLE IF EXISTS user_role;',
    dropRoleAuthorityTable: 'DROP TABLE IF EXISTS role_authority;',
    droAuthorityTable: 'DROP TABLE IF EXISTS authority;',
    dropRoleTable: 'DROP TABLE IF EXISTS role;',
    dropAppUserTable: 'DROP TABLE IF EXISTS app_user;',
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
