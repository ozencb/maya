import { IDatabase } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { User } from '@Models';
import { users as sql } from '@SQL';
import { getOrSetOnCache } from '@Lib';

export class UsersRepository {
  constructor(private db: IDatabase<any>) {}

  async add(name: string, password: string): Promise<User> {
    return this.db.one(sql.add, [name, password]);
  }

  async remove(id: number): Promise<number> {
    return this.db.result(
      'DELETE FROM users WHERE id = $1',
      +id,
      (r: IResult) => r.rowCount
    );
  }

  async findById(id: number): Promise<User | null> {
    return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
  }

  async findByName(name: string): Promise<User | null> {
    return this.db.oneOrNone('SELECT * FROM users WHERE name = $1', name);
  }

  async all(): Promise<User[]> {
    const query = () => this.db.any('SELECT * FROM users');
    return getOrSetOnCache<User[]>('allUsers', query);
  }

  async total(): Promise<number> {
    return this.db.one(
      'SELECT count(*) FROM users',
      [],
      (a: { count: string }) => +a.count
    );
  }
}
