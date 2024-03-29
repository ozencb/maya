import { IDatabase } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { User } from '@Models';
import { sqlFileResolver as sql } from '@Utils';
import { cache } from '@Lib';
import { UserDetail, UserNonSensitive } from '@Types';

export class UserRepository {
  constructor(private db: IDatabase<any>) {}

  async add(username: string, password: string): Promise<User> {
    return this.db.one(sql('add'), [username, password]);
  }

  async findById(id: number): Promise<User | null> {
    return this.db.oneOrNone(sql('findById'), +id);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.db.oneOrNone(sql('findByUsername'), [username]);
  }

  async findDetailByUsername(username: string): Promise<UserDetail | null> {
    return this.db.oneOrNone(sql('findDetailByUsername'), [username]);
  }

  async findNonSensitiveByUsername(
    username: string
  ): Promise<UserNonSensitive> {
    return this.db.one(sql('findNonSensitiveByUsername'), [username]);
  }

  async findExistsByUsername(username: string): Promise<boolean> {
    return (await this.db.one(sql('findExistsByUsername'), [username])).exists;
  }

  async deleteById(id: number): Promise<number> {
    return this.db.result(sql('deleteById'), +id, (r: IResult) => r.rowCount);
  }

  async all(): Promise<User[]> {
    const callback = () => this.db.any(sql('all'));
    return cache.getOrSetOnCache<User[]>({ key: 'users', callback });
  }

  async total(): Promise<number> {
    return this.db.one(
      'SELECT count(*) FROM app_user',
      [],
      (a: { count: string }) => +a.count
    );
  }
}
