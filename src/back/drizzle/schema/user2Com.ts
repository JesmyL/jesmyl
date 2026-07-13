import { bigint, boolean, integer, jsonb, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { CmComCommentBlockDict } from 'shared/api';
import { comDB } from './com';
import { userDB } from './user';

export const user2ComDB = pgTable(
  'user2Com',
  {
    userId: integer('userId')
      .notNull()
      .references(() => userDB.id, { onDelete: 'cascade' }),

    comId: integer('comId')
      .notNull()
      .references(() => comDB.id, { onDelete: 'cascade' }),

    commentMod: bigint('commentMod', { mode: 'number' })
      .notNull()
      .$defaultFn(() => Date.now()),

    comment: jsonb('comment').$type<(CmComCommentBlockDict | nil)[]>(),

    isFav: boolean('isFavourite').notNull().default(false),
  },
  table => [primaryKey({ columns: [table.userId, table.comId] })],
);
