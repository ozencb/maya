import { IDatabase } from 'pg-promise';
import { Log } from '@Models';
import { logs as sql } from '@SQL';

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/

export class LogsRepository {
  constructor(private db: IDatabase<any>) {}

  // Adds a new user, and returns the new object;
  async add({
    createdAt,
    createdBy,
    action,
    level,
    error,
    payload,
  }: Log): Promise<Log> {
    return this.db.one(sql.add, [
      createdAt,
      createdBy,
      action,
      level,
      error,
      payload,
    ]);
  }
}
