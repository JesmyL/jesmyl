import { bigint, doublePrecision, index, jsonb, pgTable, smallint, varchar } from 'p/d';
import { CmCatKind, CmCatWid, CmComWid, IExportableCat } from 'shared/api';
import { Bool, Do } from 'shared/enums';
import { itIt } from 'shared/utils';

export const catDB = pgTable(
  'cats',
  {
    w: doublePrecision('w').primaryKey().$type<CmCatWid>(),

    m: bigint('m', { mode: 'number' }).notNull(),

    n: varchar('n', { length: 256 }).notNull(),

    k: smallint('k').$type<CmCatKind>().notNull(),

    s: jsonb('s').$type<CmComWid[]>(),
    d: jsonb('d').$type<PRecord<CmComWid, number>>(),

    isRemoved: smallint('isRemoved').default(Bool.False).$type<Bool>(),
  },
  table => [index('cats_m_idx').on(table.m)],
);

if (!Do.It) itIt<Required<IExportableCat>>(catDB.$inferSelect);
