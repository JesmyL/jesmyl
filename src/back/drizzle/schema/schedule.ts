import { bigint, integer, jsonb, pgTable, serial, smallint, text } from 'p/d';
import {
  IScheduleWidget,
  IScheduleWidgetCtrl,
  IScheduleWidgetDay,
  IScheduleWidgetLists,
  IScheduleWidgetTeamGames,
  IScheduleWidgetWid,
  ScheduleWidgetAppAttCustomized,
  ScheduleWidgetDayListItemTypeBox,
} from 'shared/api';
import { Bool, Do } from 'shared/enums';
import { itIt } from 'shared/utils';
import { emptyJSONArraySQL, emptyJSONObjectSQL } from './lib/const';

export const scheduleDB = pgTable('schedule', {
  id: serial('id').primaryKey().notNull(),

  w: bigint('writedAt', { mode: 'number' })
    .unique()
    .notNull()
    .$type<IScheduleWidgetWid>()
    .$defaultFn(() => Date.now()),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now()),

  isRemoved: smallint('isRemoved').notNull().$type<Bool>().default(Bool.False),
  withTech: smallint('withTech').notNull().$type<Bool>().default(Bool.False),
  tgInform: smallint('tgInform').$type<Bool>().default(Bool.True),

  start: bigint('start', { mode: 'number' }).notNull().default(0),
  prevStart: bigint('prevStart', { mode: 'number' }).default(0),

  tgInformTime: integer('tgInformTime').notNull().default(0),

  title: text('title').notNull().default(''),
  topic: text('topic').notNull().default(''),
  dsc: text('dsc').notNull().default(''),
  tgChatReqs: text('tgChatReqs').notNull().default(''),

  days: jsonb('days').$type<IScheduleWidgetDay[]>().notNull().default(emptyJSONArraySQL),
  types: jsonb('types').$type<ScheduleWidgetDayListItemTypeBox[]>().notNull().default(emptyJSONArraySQL),
  tatts: jsonb('tatts').$type<ScheduleWidgetAppAttCustomized[]>().notNull().default(emptyJSONArraySQL),

  ctrl: jsonb('ctrl').$type<IScheduleWidgetCtrl>().notNull().default(emptyJSONObjectSQL),
  games: jsonb('games').$type<IScheduleWidgetTeamGames>().default(emptyJSONObjectSQL),
  lists: jsonb('lists').$type<IScheduleWidgetLists>().notNull().default(emptyJSONObjectSQL),
});

if (!Do.It) itIt<IScheduleWidget>(scheduleDB.$inferSelect);
