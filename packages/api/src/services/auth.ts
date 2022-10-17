import { db } from '@Lib';
import { hash } from 'bcryptjs';

export const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const hashedPassword = await hash(password, 12);

  await db.users.add(username, hashedPassword);

  return true;
};
