import { bigint, index, integer, jsonb, pgTable, serial, text } from 'p/d';
import { DeviceId, UserLogin } from 'shared/api';
import { DashMessageKind } from 'shared/model/index/visitsDashboard';
import { emptyJSONObjectSQL } from './lib/const';

export type VisitId = NumberBrand<'VisitId'>;
export type DashErrorId = NumberBrand<'DashErrorId'>;

export const visitDB = pgTable(
  'visits',
  {
    id: serial('id').primaryKey().$type<VisitId>().notNull(),

    l: text('login').$type<UserLogin>(),
    deviceId: text('deviceId').$type<DeviceId>(),
    url: text('url').notNull(),
    agent: text('agent').notNull(),
    v: integer('version').notNull(),

    createdAt: bigint('createdAt', { mode: 'number' })
      .notNull()
      .$defaultFn(() => Date.now()),
  },
  table => [index('visits_createdAt_idx').on(table.createdAt)],
);

export const visitDayDB = pgTable('visitDays', {
  date: text('date').primaryKey(),

  total: integer('total').notNull(),
  uniq: integer('uniq').notNull(),
  visitors: jsonb('visitors').$type<PRecord<UserLogin, number>>().notNull().default(emptyJSONObjectSQL),
  hours: jsonb('hours').$type<number[]>().notNull(),
  maxOnline: integer('maxOnline').notNull().default(0),

  createdAt: bigint('createdAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now()),
});

export const dashErrorDB = pgTable(
  'dashErrors',
  {
    id: serial('id').primaryKey().$type<DashErrorId>().notNull(),

    kind: integer('kind').notNull().$type<DashMessageKind>().default(DashMessageKind.VisitError),
    l: text('login').$type<UserLogin>(),
    m: text('message').notNull(),
    visit: text('visit').notNull().default(''),

    createdAt: bigint('createdAt', { mode: 'number' })
      .notNull()
      .$defaultFn(() => Date.now()),
  },
  table => [index('dashErrors_createdAt_idx').on(table.createdAt)],
);

export const dashReadDB = pgTable('dashReads', {
  l: text('login').primaryKey().$type<UserLogin>().notNull(),
  reads: jsonb('reads').$type<PRecord<DashMessageKind, number>>().notNull().default(emptyJSONObjectSQL),

  m: bigint('modifiedAt', { mode: 'number' })
    .notNull()
    .$defaultFn(() => Date.now()),
});
