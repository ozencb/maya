export type UserDetail = {
  id: number;
  createdAt: Date;
  username: string;
  role: RoleEnum;
  authority: AuthorityEnum[];
};

export enum AuthorityEnum {
  'Access Admin Panel' = 'ACCESS_ADMIN_PANEL'
}

export enum RoleEnum {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER'
}
