import { bigint, jsonb, pgTable, serial, text } from 'p/d';
import { Do } from 'shared/enums';
import { IndexAccessScopeRules, UserAccessRole, UserAccessRoleInfo } from 'shared/model/index/access-rights';
import { itIt } from 'shared/utils';

export const userRoleDB = pgTable('userRole', {
  id: serial('id').primaryKey().notNull(),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now())
    .$onUpdateFn(() => Date.now()),

  n: text('name').unique().$type<UserAccessRole>().notNull(),

  r: jsonb('rules').$type<IndexAccessScopeRules>(),
});

if (!Do.It) itIt<UserAccessRoleInfo>(userRoleDB.$inferSelect);
