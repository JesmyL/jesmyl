import { bigint, jsonb, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { IExportableComInterpretation } from 'shared/api';
import { comDB, ComId } from './com';
import { scheduleDB, SchId } from './schedule';

export const sch2ComDB = pgTable(
  'sch2Com',
  {
    schId: bigint('schId', { mode: 'number' })
      .notNull()
      .$type<SchId>()
      .references(() => scheduleDB.id, { onDelete: 'cascade' }),

    comId: bigint('comId', { mode: 'number' })
      .notNull()
      .$type<ComId>()
      .references(() => comDB.id, { onDelete: 'cascade' }),

    intpMod: bigint('intpMod', { mode: 'number' })
      .notNull()
      .$defaultFn(() => Date.now()),

    intp: jsonb('intp').$type<IExportableComInterpretation>(),
  },
  table => [primaryKey({ columns: [table.schId, table.comId] })],
);
