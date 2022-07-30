import { IDatabase } from 'pg-promise';
import { IResult } from 'pg-promise/typescript/pg-subset';
import { User } from '../models';
import { users as sql } from '../sql';

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/

export class UsersRepository {
  constructor(private db: IDatabase<any>) {}

  // Adds a new user, and returns the new object;
  async add(name: string, password: string): Promise<User> {
    return this.db.one(sql.add, [name, password]);
  }

  // Tries to delete a user by id, and returns the number of records deleted;
  async remove(id: number): Promise<number> {
    return this.db.result(
      'DELETE FROM users WHERE id = $1',
      +id,
      (r: IResult) => r.rowCount
    );
  }

  // Tries to find a user from id;
  async findById(id: number): Promise<User | null> {
    return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
  }

  // Tries to find a user from name;
  async findByName(name: string): Promise<User | null> {
    return this.db.oneOrNone('SELECT * FROM users WHERE name = $1', name);
  }

  // Returns all user records;
  async all(): Promise<User[]> {
    return this.db.any('SELECT * FROM users');
  }

  // Returns the total number of users;
  async total(): Promise<number> {
    return this.db.one(
      'SELECT count(*) FROM users',
      [],
      (a: { count: string }) => +a.count
    );
  }
}
