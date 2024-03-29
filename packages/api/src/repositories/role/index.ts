import { IDatabase } from 'pg-promise';
import { Role, UserRole } from '@Models';
import { Roles } from '@Types';
import { cache } from '@Lib';
import { sqlFileResolver as sql } from '@Utils';

export class RoleRepository {
  constructor(private db: IDatabase<any>) {}

  async addUserRole(userId: number, role: Roles) {
    return this.db.none(sql('addUserRole'), [userId, role]);
  }

  async all(): Promise<Role[]> {
    const callback = () => this.db.any(sql('all'));
    return cache.getOrSetOnCache<Role[]>({ key: 'roles', callback });
  }

  async userRoles(): Promise<UserRole[]> {
    const callback = () => this.db.any(sql('userRoles'));
    return cache.getOrSetOnCache<UserRole[]>({ key: 'userRoles', callback });
  }
}
