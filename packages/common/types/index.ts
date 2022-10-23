export type UserDetail = {
  id: number;
  createdAt: Date;
  username: string;
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
