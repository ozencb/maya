import { IDatabase } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { User } from '@Models';
import { user as sql } from '@SQL';
import { getOrSetOnCache } from '@Lib';

export class UserRepository {
  constructor(private db: IDatabase<any>) {}

  async add(username: string, password: string): Promise<User> {
    return this.db.one(sql.add, [username, password]);
  }

  async remove(id: number): Promise<number> {
    return this.db.result(
      'DELETE FROM app_user WHERE id = $1',
      +id,
      (r: IResult) => r.rowCount
    );
  }

  async findById(id: number): Promise<User | null> {
    return this.db.oneOrNone('SELECT * FROM app_user WHERE id = $1', +id);
  }

  async findByName(username: string): Promise<User | null> {
    return this.db.oneOrNone(
      'SELECT * FROM app_user WHERE username = $1',
      username
    );
  }

  async all(): Promise<User[]> {
    const query = () => this.db.any('SELECT * FROM app_user');
    return getOrSetOnCache<User[]>('allUsers', query);
  }

  async total(): Promise<number> {
    return this.db.one(
      'SELECT count(*) FROM app_user',
      [],
      (a: { count: string }) => +a.count
    );
  }
}
