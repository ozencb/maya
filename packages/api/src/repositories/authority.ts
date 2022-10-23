import { IDatabase } from 'pg-promise';
import { Role } from '@Common/models';
import { authority as sql } from '@SQL';
import { getOrSetOnCache } from '@Lib';
import { AuthorityEnum } from '@Common/types';

export class AuthorityRepository {
  constructor(private db: IDatabase<any>) {}

  async all(): Promise<Role[]> {
    const query = () => this.db.any(sql.all);
    return getOrSetOnCache<Role[]>('authorities', query);
  }

  async hasAuthority(
    userId: number,
    authority: AuthorityEnum
  ): Promise<boolean> {
    return (await this.db.one(sql.hasAuthority, [userId, authority])).exists;
  }
}
