import { MikroORM, ReflectMetadataProvider } from '@mikro-orm/core';

import * as entities from '../entities';

export default {
  type: 'postgresql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  entities: Object.values(entities),
  debug: process.env.APP_ENV === 'development',
  tsNode: process.env.APP_ENV === 'development',
  metadataProvider: ReflectMetadataProvider,
} as Parameters<typeof MikroORM.init>[0];
