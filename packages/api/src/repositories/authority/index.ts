import { IDatabase } from 'pg-promise';
import { Role } from '@Common/models';
import { sqlFileResolver as sql } from '@Utils';
import { cache } from '@Lib';
import { AuthorityEnum } from '@Common/types';

export class AuthorityRepository {
  constructor(private db: IDatabase<any>) {}

  async all(): Promise<Role[]> {
    const callback = () => this.db.any(sql('all'));
    return cache.getOrSetOnCache<Role[]>({
      key: 'authorities',
      callback,
    });
  }

  async hasAuthority(
    userId: number,
    authority: AuthorityEnum
  ): Promise<boolean> {
    return (await this.db.one(sql('hasAuthority'), [userId, authority])).exists;
  }
}
