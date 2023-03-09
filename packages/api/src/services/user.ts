import { RoleEnum } from '@Types';
import { db } from '@Lib';

export const getAll = () => db.user.all();

export const getNonSensitiveByUsername = (username: string) =>
  db.user.findNonSensitiveByUsername(username);

export const addUserRole = (userId: number, userRole: RoleEnum) =>
  db.role.addUserRole(userId, userRole);

export const userExists = (username: string) =>
  db.user.findExistsByUsername(username);
