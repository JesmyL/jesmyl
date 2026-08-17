import { bigint, integer, pgTable } from 'drizzle-orm/pg-core';
import type { CmComInSchDayEvWr, CmComWid, ScheduleWidgetDayEventMi, ScheduleWidgetDayi } from 'shared/api';
import { scheduleDB, SchId } from './schedule';
import { userDB, UserId } from './user';

export const schComHistoryDB = pgTable('schComHistory', {
  schId: bigint('schId', { mode: 'number' })
    .notNull()
    .$type<SchId>()
    .references(() => scheduleDB.id, { onDelete: 'cascade' }),

  userId: bigint('userId', { mode: 'number' })
    .notNull()
    .$type<UserId>()
    .references(() => userDB.id, { onDelete: 'cascade' }),

  dayi: integer('dayi').$type<ScheduleWidgetDayi>().notNull(),
  eventMi: integer('eventMi').$type<ScheduleWidgetDayEventMi>().notNull(),

  w: bigint('writedAt', { mode: 'number' })
    .unique()
    .notNull()
    .$type<CmComInSchDayEvWr>()
    .$defaultFn(() => Date.now() as CmComInSchDayEvWr),

  comws: bigint('comws', { mode: 'number' }).array().$type<CmComWid[]>().default([]).notNull(),
});
