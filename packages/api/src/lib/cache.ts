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

export const redisClient = createRedisInstance(options);

export const getOrSetOnCache = async <T>({
  key,
  callback,
  expiration = 600,
  refreshOnBackground = true,
}: {
  key: String;
  callback: () => Promise<T>;
  expiration?: number;
  refreshOnBackground?: boolean;
}): Promise<T> => {
  const res = await redisClient.get(key as KeyType);

  if (!res) {
    const dbRes = await callback();
    redisClient.setex(key as KeyType, expiration, JSON.stringify(dbRes));
    return dbRes;
  } else if (refreshOnBackground) {
    (async () => {
      redisClient.setex(
        key as KeyType,
        expiration,
        JSON.stringify(await callback())
      );
    })();
  }

  return JSON.parse(res);
};
