import { bigint, integer, jsonb, pgTable, serial, smallint, text, varchar } from 'p/d';
import {
  CmComAudioMarkPack,
  CmComIntensityLevel,
  CmComMod,
  CmComWid,
  HttpNumLeadLink,
  IExportableCom,
  IExportableOrder,
  Langi,
} from 'shared/api';
import { TonType } from 'shared/const/cm/enums';
import { Bool, Do } from 'shared/enums';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { itIt } from 'shared/utils';

const initStringArray = (columnName: string) => text(columnName).array().default([]);

export type ComId = NumberBrand<'ComId'>;

export const comDB = pgTable('coms', {
  id: serial('id').primaryKey().$type<ComId>().notNull(),

  w: bigint('writedAt', { mode: 'number' })
    .unique()
    .notNull()
    .$type<CmComWid>()
    .$defaultFn(() => Date.now() as never),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$type<CmComMod>()
    .$defaultFn(() => Date.now()),

  n: varchar('title', { length: 256 }).notNull(),

  // a: varchar('author', { length: 256 }),

  t: initStringArray('texts').notNull(),

  c: initStringArray('chords').notNull(),

  b: smallint('isBemoled').default(TonType.Diezed).$type<TonType>(),

  bpm: integer('bpm'),

  d: integer('tempDrive').$type<CmComIntensityLevel>(),

  l: integer('language').$type<Langi>().default(Langi.Ru).notNull(),

  p: integer('transposition'),

  s: integer('size').$type<CmComMetricNum>(),

  o: jsonb('orders').$type<IExportableOrder[]>(),

  al: initStringArray('audios').$type<HttpNumLeadLink[]>(),

  nl: jsonb('newliner').$type<Required<IExportableCom>['nl']>(),

  isRemoved: smallint('isRemoved').default(Bool.False).$type<Bool>(),

  // external

  visits: integer('visits').notNull().default(0),

  am: jsonb('audioMarks').$type<CmComAudioMarkPack>(),
  amMod: bigint('amMod', { mode: 'number' }).notNull().default(0),
});

if (!Do.It) itIt<Required<IExportableCom>>(comDB.$inferSelect);
