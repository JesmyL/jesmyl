import { bigint, jsonb, pgTable, serial, smallint, text } from 'p/d';
import type {
  IScheduleWidget,
  IScheduleWidgetCtrl,
  IScheduleWidgetDay,
  IScheduleWidgetLists,
  IScheduleWidgetPeriod,
  IScheduleWidgetTeamGames,
  ScheduleWidgetAppAttCustomized,
  ScheduleAppInform,
  ScheduleWidgetDayListItemTypeBox,
  ScheduleWidgetWid,
} from 'shared/api';
import { Bool, Do } from 'shared/enums';
import { itIt } from 'shared/utils';
import { emptyJSONArraySQL, emptyJSONObjectSQL } from './lib/const';

export type SchId = NumberBrand<'SchId'>;

export const scheduleDB = pgTable('schedule', {
  id: serial('id').primaryKey().$type<SchId>().notNull(),

  w: bigint('writedAt', { mode: 'number' })
    .unique()
    .notNull()
    .$type<ScheduleWidgetWid>()
    .$defaultFn(() => Date.now() as ScheduleWidgetWid),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now()),

  isRemoved: smallint('isRemoved').notNull().$type<Bool>().default(Bool.False),
  withTech: smallint('withTech').notNull().$type<Bool>().default(Bool.False),
  isPaused: smallint('isPaused').notNull().$type<Bool>().default(Bool.False),
  appInform: smallint('appInform').$type<ScheduleAppInform>().default(1),

  start: bigint('start', { mode: 'number' }).notNull().default(0),
  prevStart: bigint('prevStart', { mode: 'number' }).default(0),
  period: jsonb('period').$type<IScheduleWidgetPeriod>(),

  title: text('title').notNull().default(''),
  topic: text('topic').notNull().default(''),
  dsc: text('dsc').notNull().default(''),

  days: jsonb('days').$type<IScheduleWidgetDay[]>().notNull().default(emptyJSONArraySQL),
  types: jsonb('types').$type<ScheduleWidgetDayListItemTypeBox[]>().notNull().default(emptyJSONArraySQL),
  tatts: jsonb('tatts').$type<ScheduleWidgetAppAttCustomized[]>().notNull().default(emptyJSONArraySQL),

  ctrl: jsonb('ctrl').$type<IScheduleWidgetCtrl>().notNull().default(emptyJSONObjectSQL),
  games: jsonb('games').$type<IScheduleWidgetTeamGames>().default(emptyJSONObjectSQL),
  lists: jsonb('lists').$type<IScheduleWidgetLists>().notNull().default(emptyJSONObjectSQL),
});

if (!Do.It) itIt<IScheduleWidget>(scheduleDB.$inferSelect);
