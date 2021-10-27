import jwt from 'jsonwebtoken';

import { User } from '../entities';

export const generateAccessToken = (user: User) => {
  const { id, username } = user;

  return jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (user: User) => {
  const { id } = user;
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '15d',
  });
};
