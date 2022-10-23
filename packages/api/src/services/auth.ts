import { db } from '@Lib';
import { compare, hash } from 'bcryptjs';

export const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const hashedPassword = await hash(password, 12);
  return db.user.add(username, hashedPassword);
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await db.user.findByUsername(username);

  if (!user) return;

  const isValid = await compare(password, user.password);
  if (!isValid) return;

  return user;
};
