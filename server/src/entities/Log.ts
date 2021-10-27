import { Entity, JsonType, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'logs' })
export class Log {
  @PrimaryKey()
  id!: number;

  @Property()
  createdAt: Date = new Date();

  @Property()
  createdBy: string;

  @Property()
  action: string;

  @Property()
  level: string;

  @Property({ nullable: true, columnType: 'text' })
  error: string | null;

  @Property({ nullable: true })
  payload: JsonType | null;

  constructor(
    createdBy: string,
    action: string,
    level: string,
    error: string | null = null,
    payload: JsonType | null
  ) {
    this.createdBy = createdBy;
    this.action = action;
    this.level = level;
    this.error = error;
    this.payload = payload;
  }
}
