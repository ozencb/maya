import { RoleEnum } from '@Common/types';
import { db } from '@Lib';

export const getNonSensitiveByUsername = (username: string) =>
  db.user.findNonSensitiveByUsername(username);

export const addUserRole = (userId: number, userRole: RoleEnum) =>
  db.role.addUserRole(userId, userRole);
