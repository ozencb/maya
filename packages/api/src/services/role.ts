import { db } from '@Lib';

export const getAllRoles = async () => db.role.all();
export const getUserRoles = async () => db.role.userRoles();
