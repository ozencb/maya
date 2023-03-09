import { IDatabase } from 'pg-promise';
import { Log } from '@Models';
import { sqlFileResolver as sql } from '@Utils';

export class LogRepository {
  constructor(private db: IDatabase<any>) {}

  async add({
    createdAt,
    createdBy,
    action,
    level,
    error,
    payload,
  }: Log): Promise<Log> {
    return this.db.one(sql('add'), [
      createdAt,
      createdBy,
      action,
      level,
      error,
      payload,
    ]);
  }
}
