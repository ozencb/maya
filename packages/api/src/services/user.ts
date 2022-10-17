import { db } from '@Lib';

export const getDetailById = (id: number) => db.users.findById(id);

export const getAll = () => db.users.all();
