import { db } from '@Lib';

export const getDetailByUsername = (username: string) =>
  db.user.findDetailByUsername(username);
