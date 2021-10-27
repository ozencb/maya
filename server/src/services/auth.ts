import { DI } from '../lib';
import { compare, hash } from 'bcryptjs';
import { User } from '../entities';

export const register = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const hashedPassword = await hash(password, 12);

  DI.userRepository.persist(new User(username, hashedPassword));
  await DI.orm.em.flush();

  return true;
};

export const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const user = await DI.userRepository.findOne({ username });

  if (!user) throw new Error('Could not find user');

  const isValid = await compare(password, user.password);

  if (!isValid) throw new Error('Password is wrong');

  return user;
};
