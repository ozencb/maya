import { db } from '../lib';

export const getDetailById = async (id: number) => {
  return db.users.findById(id);
};
