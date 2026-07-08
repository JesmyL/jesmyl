import { bigint, integer, jsonb, pgTable, serial, smallint, text, varchar } from 'p/d';
import {
  CmComIntensityLevel,
  CmComLangi,
  CmComMod,
  CmComWid,
  HttpNumLeadLink,
  IExportableCom,
  IExportableOrder,
} from 'shared/api';
import { Bool, Do } from 'shared/enums';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { itIt } from 'shared/utils';

const initStringArray = (columnName: string) => text(columnName).array().default([]);

export const comsDB = pgTable('coms', {
  id: serial('id').primaryKey().notNull(),

  w: bigint('writedAt', { mode: 'number' })
    .unique()
    .notNull()
    .$type<CmComWid>()
    .$defaultFn(() => Date.now()),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$type<CmComMod>()
    .$defaultFn(() => Date.now()),

  n: varchar('title', { length: 256 }).notNull(),

  // a: varchar('author', { length: 256 }),

  t: initStringArray('texts').notNull(),

  c: initStringArray('chords').notNull(),

  b: smallint('isBemoled').default(Bool.False).$type<Bool>(),

  bpm: integer('bpm'),

  d: integer('tempDrive').$type<CmComIntensityLevel>(),

  l: integer('language').$type<CmComLangi>().default(CmComLangi.Ru).notNull(),

  p: integer('transposition'),

  s: integer('size').$type<CmComMetricNum>(),

  o: jsonb('orders').$type<IExportableOrder[]>(),

  al: initStringArray('audios').$type<HttpNumLeadLink[]>(),

  nl: jsonb('newliner').$type<Required<IExportableCom>['nl']>(),

  isRemoved: smallint('isRemoved').default(Bool.False).$type<Bool>(),

  // external

  visits: integer('visits').notNull().default(0),
});

if (!Do.It) itIt<Required<IExportableCom>>(comsDB.$inferSelect);
