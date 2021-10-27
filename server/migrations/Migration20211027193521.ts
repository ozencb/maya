import { Migration } from '@mikro-orm/migrations';

export class Migration20211027193521 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "app_user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "username" varchar(255) not null, "password" varchar(255) not null);'
    );
    this.addSql(
      'alter table "app_user" add constraint "app_user_username_unique" unique ("username");'
    );

    this.addSql(
      'create table "logs" ("id" serial primary key, "created_at" timestamptz(0) not null, "created_by" varchar(255) not null, "action" varchar(255) not null, "level" varchar(255) not null, "error" text null, "payload" jsonb null);'
    );
  }
}
