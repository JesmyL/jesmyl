import { JsonSecureString } from 'back/json-secure';
import { bigint, jsonb, pgTable, serial, text } from 'p/d';
import { UserAuth, UserInfo, UserLogin } from 'shared/api';
import { Do } from 'shared/enums';
import { IndexAccessScopeRules, UserAccessRole } from 'shared/model/index/access-rights';
import { itIt } from 'shared/utils';

export const userDB = pgTable('users', {
  id: serial('id').primaryKey().notNull(),

  l: text('login').unique().$type<UserLogin>().notNull(),
  ls: text('logins').array().$type<UserLogin[]>().notNull(),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now()),

  auth: text('secureAuth').$type<JsonSecureString<UserAuth>>().notNull(),

  rights: jsonb('rules').$type<IndexAccessScopeRules>().notNull(),

  r: text('role').$type<UserAccessRole>(),
});

if (!Do.It) itIt<UserInfo>(userDB.$inferSelect);
