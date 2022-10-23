import { IDatabase } from 'pg-promise';
import { Role } from '@Common/models';
import { role as sql } from '@SQL';
import { getOrSetOnCache } from '@Lib';

export class AuthorityRepository {
  constructor(private db: IDatabase<any>) {}

  async all(): Promise<Role[]> {
    const query = () => this.db.any(sql.all);
    return getOrSetOnCache<Role[]>('authorities', query);
  }
}
