import { JsonSecureString } from 'back/json-secure';
import { sql } from 'drizzle-orm';
import { bigint, jsonb, pgTable, serial, text } from 'p/d';
import { UserAuth, UserInfo, UserLogin } from 'shared/api';
import { Do } from 'shared/enums';
import { IndexAccessScopeRules, UserAccessRole } from 'shared/model/index/access-rights';
import { iife, itIt } from 'shared/utils';
import { db } from '../drizzle.db';

export type UserId = NumberBrand<'UserId'>;

export const userDB = pgTable('users', {
  id: serial('id').primaryKey().$type<UserId>().notNull(),

  l: text('login').unique().$type<UserLogin>().notNull(),
  ls: text('logins').array().$type<UserLogin[]>().notNull(),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now()),

  auth: text('secureAuth').$type<JsonSecureString<OmitOwn<UserAuth, 'login'>>>().notNull(),

  rights: jsonb('rules').$type<IndexAccessScopeRules>().notNull(),

  r: text('role').$type<UserAccessRole>(),
});

if (!Do.It) itIt<UserInfo>(userDB.$inferSelect);

iife(async () => {
  await db.execute(sql`SELECT setval(pg_get_serial_sequence('users','id'),COALESCE(MAX(id),0)+1,false)FROM users;`);
});
