import { AuthorityEnum, RoleEnum } from '@Types';

export type User = {
  id: number;
  username: string;
  password: string;
};

export type Log = {
  id: number;
  createdAt: Date;
  createdBy: string;
  action: string;
  level: string;
  error: string | null;
  payload: JSON | null;
};

export type Authority = {
  id: number;
  createdAt: Date;
  createdBy: string;
  code: AuthorityEnum;
  description: string;
};

export type Role = {
  id: number;
  createdAt: Date;
  createdBy: string;
  code: RoleEnum;
  description: string;
};

export type UserRole = {
  username: string;
  userId: number;
  role: string;
  roleDescription: string;
};
