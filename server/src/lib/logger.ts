import winston from 'winston';
import Transport, { TransportStreamOptions } from 'winston-transport';
import DailyRotateFile, {
  DailyRotateFileTransportOptions,
} from 'winston-daily-rotate-file';

import { DB } from '../lib';
import { Log } from '../entities';

const logConfig = {
  logFolder: './logs/',
  logFile: '%DATE%.log',
};

class PgTransport extends Transport {
  constructor(opts: TransportStreamOptions) {
    super(opts);
  }

  async log(info: any, callback: any) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    const { level, message } = info;

    const { createdBy, payload, action, error } = message;

    const errorRecord = error
      ? JSON.stringify(error, Object.getOwnPropertyNames(error))
      : null;

    const log = new Log(createdBy, action, level, errorRecord, payload);
    await DB.orm.em.persistAndFlush([log]);

    callback();
  }
}

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.splat(),
  winston.format.prettyPrint({ colorize: true })
);

const fileTransport = new DailyRotateFile({
  filename: logConfig.logFolder + logConfig.logFile,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '20m',
  maxFiles: '15d',
  prepend: true,
  level: 'silly',
} as DailyRotateFileTransportOptions);

const dbTransport = new PgTransport({
  level: 'info',
});

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    fileTransport,
    dbTransport,
    new winston.transports.Console({
      level: 'warn',
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: './logs/exceptions.log' }),
  ],
});

export { logger };
