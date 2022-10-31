import { db } from '@Lib';

export const getUserCount = async (): Promise<number> => db.user.total();
