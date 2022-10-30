import { User } from '../models';

export type UserNonSensitive = Omit<User, 'password'>;

export type UserDetail = UserNonSensitive & {
  createdAt: Date;
  role: RoleEnum;
  authorities: AuthorityEnum[];
};

export enum AuthorityEnum {
  'Elevated Privileges' = 'ELEVATED_PRIVILEGES',
  'Access Admin Panel' = 'ACCESS_ADMIN_PANEL'
}

export enum RoleEnum {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER'
}
