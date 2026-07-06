import { bigint, boolean, integer, jsonb, pgTable, serial, text, varchar } from 'p/d';
import {
  CmComIntensityLevel,
  CmComLangi,
  CmComMod,
  CmComWid,
  HttpNumLeadLink,
  IExportableCom,
  IExportableOrder,
} from 'shared/api';
import { Do } from 'shared/Do.enum';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { itIt } from 'shared/utils';

const initStringArray = (columnName: string) => text(columnName).array().notNull().default([]);

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
    .$defaultFn(() => Date.now())
    .$onUpdateFn(() => Date.now()),

  n: varchar('title', { length: 256 }).notNull(),

  // a: varchar('author', { length: 256 }),

  t: initStringArray('texts'),

  c: initStringArray('chords'),

  b: boolean('isBemoled').default(false),

  bpm: integer('bpm'),

  d: integer('tempDrive').$type<CmComIntensityLevel>(),

  l: integer('language').$type<CmComLangi>().default(CmComLangi.Ru).notNull(),

  p: integer('transposition'),

  s: integer('size').$type<CmComMetricNum>(),

  o: jsonb('orders').$type<IExportableOrder[]>(),

  al: initStringArray('audios').$type<HttpNumLeadLink[]>(),

  nl: jsonb('newliner').$type<Required<IExportableCom>['nl']>(),

  isRemoved: boolean('isRemoved').default(false),
});

if (!Do.It) itIt<Required<IExportableCom>>(comsDB.$inferSelect);
