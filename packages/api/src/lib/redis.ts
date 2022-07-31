import Redis, { RedisOptions } from 'ioredis';

export const createRedisInstance = (options: RedisOptions) => {
  const cacheInstance = new Redis(options);

  cacheInstance.on('connect', () => console.log('Redis Connected'));
  cacheInstance.on('ready', () => console.log('Redis Ready'));
  cacheInstance.on('reconnecting', () => console.log('Redis Reconnecting'));
  cacheInstance.on('error', () => console.log('Redis Error'));
  cacheInstance.on('end', () => console.log('Redis End'));

  return cacheInstance;
};
