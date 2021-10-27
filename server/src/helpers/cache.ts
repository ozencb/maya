import { promisify } from 'util';
import { createRedisInstance } from '../lib/redis';

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
};

const client = createRedisInstance(options);

export const get = promisify(client.get).bind(client);
export const setCacheObject = async ({
  key,
  expiration,
  data,
  secondaryIdentifier = undefined,
}: {
  key: string;
  expiration: number;
  data: any;
  secondaryIdentifier: string | number | undefined;
}) => {
  const tmpKey = secondaryIdentifier ? `${key}-${secondaryIdentifier}` : key;
  if (data) {
    await client.setex(tmpKey, expiration, JSON.stringify(data));
  }
};
