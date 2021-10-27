import Redis, { RedisOptions } from 'ioredis';

export const createRedisInstance = (options: RedisOptions) => {
  const cacheInstance = new Redis(options);

  cacheInstance.on('connect', () => console.log('Connected'));
  cacheInstance.on('ready', () => console.log('Ready'));
  cacheInstance.on('reconnecting', () => console.log('Reconnecting'));
  cacheInstance.on('error', () => console.log('Error'));
  cacheInstance.on('end', () => console.log('End'));

  return cacheInstance;
};
