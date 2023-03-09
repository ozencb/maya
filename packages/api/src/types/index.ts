import { User } from '@Models';

export type UserNonSensitive = Omit<User, 'password'>;

export type UserDetail = UserNonSensitive & {
  createdAt: Date;
  role: Roles;
  authorities: Authorities[];
};

const AuthorityEnum = {
  'Elevated Privileges': 'ELEVATED_PRIVILEGES',
  'Access Admin Panel': 'ACCESS_ADMIN_PANEL',
} as const;
export type Authorities = typeof AuthorityEnum[keyof typeof AuthorityEnum];

const RoleEnum = {
  Admin: 'ADMIN',
  Moderator: 'MODERATOR',
  User: 'USER',
} as const;
export type Roles = typeof RoleEnum[keyof typeof RoleEnum];
