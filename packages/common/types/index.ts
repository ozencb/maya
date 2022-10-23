export type UserDetail = {
  id: number;
  createdAt: Date;
  username: string;
  role: RoleEnum;
  authority: AuthorityEnum[];
};

export enum AuthorityEnum {
  ACCESS_ADMIN_PANEL = 'Access Admin Panel'
}

export enum RoleEnum {
  ADMIN = 'Admin',
  MODERATOR = 'Moderator',
  USER = 'User'
}
