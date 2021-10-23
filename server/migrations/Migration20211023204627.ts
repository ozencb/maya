import { Migration } from '@mikro-orm/migrations';

export class Migration20211023204627 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "app_user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) null, "username" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('alter table "app_user" add constraint "app_user_username_unique" unique ("username");');
  }

}
