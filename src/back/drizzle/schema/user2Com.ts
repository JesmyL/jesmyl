import { bigint, boolean, jsonb, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { CmComCommentBlockDict } from 'shared/api';
import { comDB, ComId } from './com';
import { userDB, UserId } from './user';

export const user2ComDB = pgTable(
  'user2Com',
  {
    userId: bigint('userId', { mode: 'number' })
      .notNull()
      .$type<UserId>()
      .references(() => userDB.id, { onDelete: 'cascade' }),

    comId: bigint('comId', { mode: 'number' })
      .notNull()
      .$type<ComId>()
      .references(() => comDB.id, { onDelete: 'cascade' }),

    commentMod: bigint('commentMod', { mode: 'number' })
      .notNull()
      .$defaultFn(() => Date.now()),

    comment: jsonb('comment').$type<(CmComCommentBlockDict | nil)[]>(),

    isFav: boolean('isFavourite').notNull().default(false),
  },
  table => [primaryKey({ columns: [table.userId, table.comId] })],
);
