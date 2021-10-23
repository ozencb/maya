import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity({ tableName: 'app_user' })
export class User extends BaseEntity {
  @Unique()
  @Property()
  username!: string;

  @Property()
  password: string;

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}
