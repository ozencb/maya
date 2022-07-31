import { Response } from 'express';
import { User } from '@Models';
import { __prod__ } from '@Constants';
import { get, setCacheObject } from './cache';

export const setRefreshToken = (res: Response, token: string) => {
  const HOUR = 3600000; // milliseconds

  res.cookie('RT', token, {
    httpOnly: true,
    secure: __prod__ ? true : false,
    maxAge: HOUR * 24 * 7,
  });
};

export const setEmptyRefreshToken = (res: Response) => {
  res.cookie('RT', '');
};

export const storeRefreshToken = async (user: User, token: string) => {
  const HOUR = 60 * 60;
  await setCacheObject({
    key: 'refreshToken',
    secondaryIdentifier: user.id,
    expiration: HOUR * 24 * 7,
    data: { token },
  });
};

export const compareRefreshTokensOnStore = async (
  user: User,
  token: string
) => {
  const cacheResponse = await get(`refreshToken-${user.id}`);
  if (!cacheResponse) return false;
  return JSON.parse(cacheResponse).token === token;
};
