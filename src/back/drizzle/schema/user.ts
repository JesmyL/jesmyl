import { JsonSecureString } from 'back/json-secure';
import { bigint, jsonb, pgTable, serial, text } from 'p/d';
import { SokiAuthLogin, UserAuth } from 'shared/api';
import { IndexAccessScopeRules } from 'shared/model/index/access-rights';

export const usersDB = pgTable('users', {
  id: serial('id').primaryKey().notNull(),

  l: text('login').unique().$type<SokiAuthLogin>().notNull(),
  ls: text('logins').array().$type<SokiAuthLogin[]>().notNull(),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now())
    .$onUpdateFn(() => Date.now()),

  auth: text('secureAuth').$type<JsonSecureString<UserAuth>>().notNull(),

  rules: jsonb('rules').$type<IndexAccessScopeRules>().notNull(),

  r: text('role'),
});
