import { RoleEnum } from '@Common/types';
import { db } from '@Lib';

export const getDetailByUsername = (username: string) =>
  db.user.findDetailByUsername(username);

export const addUserRole = (userId: number, userRole: RoleEnum) =>
  db.role.addUserRole(userId, userRole);
