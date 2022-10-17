import IORedis, { RedisOptions } from 'ioredis';

const createRedisInstance = (options: RedisOptions) => {
  const cacheInstance = new IORedis(options);

  cacheInstance.on('connect', () => console.log('Redis Connected'));
  cacheInstance.on('ready', () => console.log('Redis Ready'));
  cacheInstance.on('reconnecting', () => console.log('Redis Reconnecting'));
  cacheInstance.on('error', () => console.log('Redis Error'));
  cacheInstance.on('end', () => console.log('Redis End'));

  return cacheInstance;
};

const port: number = +process.env.REDIS_PORT! || 6379;
const host: string = process.env.REDIS_HOST || '127.0.0.1';

const options = {
  port: port,
  host: host,
  maxRetriesPerRequest: 100, // Watch for some time, might be overkill
  retryStrategy(times: number) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  reconnectOnError(err: any) {
    console.log(err.message);
    return true;
  },
} as IORedis.RedisOptions;

const client = createRedisInstance(options);

export const getOrSetOnCache = async <T>(
  key: String,
  callback: () => Promise<T>,
  expiration: number = 600
): Promise<T> => {
  const res = await client.get(key as KeyType);

  if (!res) {
    const dbRes = await callback();
    client.setex(key as KeyType, expiration, JSON.stringify(dbRes));
    return dbRes;
  }

  return JSON.parse(res);
};
