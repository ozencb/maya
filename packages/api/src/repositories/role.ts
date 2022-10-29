import { IDatabase } from 'pg-promise';
import { Role } from '@Common/models';
import { RoleEnum } from '@Common/types';
import { role as sql } from '@SQL';
import { getOrSetOnCache } from '@Lib';

export class RoleRepository {
  constructor(private db: IDatabase<any>) {}

  async addUserRole(userId: number, role: RoleEnum) {
    return this.db.none(sql.addUserRole, [userId, role]);
  }

  async all(): Promise<Role[]> {
    const query = () => this.db.any(sql.all);
    return getOrSetOnCache<Role[]>({ key: 'roles', callback: query });
  }
}
