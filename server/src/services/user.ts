import { db } from '@Lib';

export const getDetailById = async (id: number) => {
  return db.users.findById(id);
};
