import { compare, hash } from 'bcryptjs';

import { AuthorityEnum } from '@Common/types';
import { db } from '@Lib';

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

export const hasAuthority = async (
  userId: number,
  authority: AuthorityEnum
): Promise<boolean> => await db.authority.hasAuthority(userId, authority);
