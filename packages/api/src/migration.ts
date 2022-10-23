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
    createAppUserTable: `create table app_user
                        (
                            id         bigserial primary key,
                            created_at timestamp default now(),
                            username   varchar(255) not null,
                            password   varchar(255) not null
                        );`,
    createAppUserUniqueUsernameIndex: `create unique index app_user_username_unq_idx on app_user (username);`,
    createLogTable: `create table log
                    (
                        id         bigserial primary key,
                        created_at timestamp default now(),
                        created_by varchar(255),
                        action     varchar(255) not null,
                        level      varchar(255) not null,
                        error      text,
                        payload    jsonb
                    );`,
    createAuthorityTable: `create table authority
                          (
                              id          bigserial primary key,
                              created_at  timestamp default now(),
                              created_by  varchar(255),
                              code        varchar(255) not null,
                              description varchar(255),
                              unique (code)
                          );`,
    createRoleTable: `create table role
                      (
                          id          serial primary key,
                          created_at  timestamp default now(),
                          created_by  varchar(255),
                          code        varchar(255) not null,
                          description varchar(255),
                          unique (code)
                      );`,
    createUserRoleTable: `
                      create table user_role
                      (
                          id          serial primary key,
                          user_id     bigint references app_user(id),
                          role_id     int references role(id),
                          unique (user_id)
                      );`,
    createRoleAuthorityTable: `
                      create table role_authority
                      (
                          id               serial primary key,
                          role_id          int references role(id),
                          authority_id     int references authority(id)
                      );`,
    insertAuthorities: (() => {
      let query = '';
      (Object.keys(AuthorityEnum) as (keyof typeof AuthorityEnum)[]).forEach(
        (code) => {
          query += `INSERT INTO authority(created_by, created_at, code, description) VALUES('ozencb', now(), '${code}', '${AuthorityEnum[code]}');`;
        }
      );
      return query;
    })(),
    insertRoles: (() => {
      let query = '';
      (Object.keys(RoleEnum) as (keyof typeof RoleEnum)[]).forEach((code) => {
        query += `INSERT INTO role(created_by, created_at, code, description) VALUES('ozencb', now(), '${code}', '${RoleEnum[code]}');`;
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
