import { db } from '../lib';
import { compare, hash } from 'bcryptjs';

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

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await db.users.findByName(username);

  if (!user) throw new Error('Could not find user');

  const isValid = await compare(password, user.password);

  if (!isValid) throw new Error('Password is wrong');

  return user;
};
