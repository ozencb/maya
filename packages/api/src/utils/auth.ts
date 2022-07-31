import jwt from 'jsonwebtoken';
import { User } from '@Models';

export const generateAccessToken = (user: User) => {
  const { id, name } = user;

  return jwt.sign({ id, name }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (user: User) => {
  const { id } = user;
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '15d',
  });
};
