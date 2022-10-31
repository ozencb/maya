import { IDatabase } from 'pg-promise';
import { Role, UserRole } from '@Common/models';
import { RoleEnum } from '@Common/types';
import { role as sql } from '@SQL';
import { cache } from '@Lib';

export class RoleRepository {
  constructor(private db: IDatabase<any>) {}

  async addUserRole(userId: number, role: RoleEnum) {
    return this.db.none(sql.addUserRole, [userId, role]);
  }

  async all(): Promise<Role[]> {
    const callback = () => this.db.any(sql.all);
    return cache.getOrSetOnCache<Role[]>({ key: 'roles', callback });
  }

  async userRoles(): Promise<UserRole[]> {
    const callback = () => this.db.any(sql.userRoles);
    return cache.getOrSetOnCache<UserRole[]>({ key: 'userRoles', callback });
  }
}
