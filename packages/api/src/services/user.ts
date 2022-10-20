import { db } from '@Lib';

export const getDetailById = (id: number) => db.user.findById(id);

export const getDetailByUsername = (username: string) =>
  db.user.findByName(username);

export const getAll = () => db.user.all();
