import { bigint, integer, pgTable, serial, text, unique } from 'p/d';
import { ScheduleWidgetDayEventMi, ScheduleWidgetWid } from 'shared/api';
import { userDB, UserId } from './user';

export type EventCommentId = NumberBrand<'EventCommentId'>;

export const eventCommentsDB = pgTable(
  'eventComments',
  {
    id: serial('id').primaryKey().$type<EventCommentId>().notNull(),

    schw: bigint('schw', { mode: 'number' }).notNull().$type<ScheduleWidgetWid>(),
    eventMi: integer('eventMi').notNull().$type<ScheduleWidgetDayEventMi>(),

    userId: bigint('userId', { mode: 'number' })
      .notNull()
      .$type<UserId>()
      .references(() => userDB.id, { onDelete: 'cascade' }),

    text: text('text').notNull(),

    createdAt: bigint('createdAt', { mode: 'number' })
      .notNull()
      .$defaultFn(() => Date.now()),
  },
  table => [unique('eventComments_schw_eventMi_userId_uq').on(table.schw, table.eventMi, table.userId)],
);
