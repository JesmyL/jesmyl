import { SQL } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { checkIsNil } from 'shared/utils/checkIs';
import * as schema from '../drizzle.schema';
import { lazyEnvJson } from '../envJson';

const omitKeys = ['delete', 'update'] satisfies (keyof typeof dbNative)[];
type OmitKey = (typeof omitKeys)[number];

const queryClient = postgres(lazyEnvJson().dbUrl);
const dbNative = drizzle(queryClient, { schema });

const dbProtected = Object.create(dbNative);

omitKeys.forEach(key => (dbProtected[key] = null));

export const db = dbProtected as OmitOwn<typeof dbNative, OmitKey>;

const anywhere = 'ANYWHERE!';

export const dbUpdate = <TTable extends PgTable>(
  schema: TTable,
  set: Partial<TTable['$inferInsert']>,
  where: SQL | typeof anywhere,
) => {
  checkWhere(schema, where, 'update');

  return dbNative
    .update(schema)
    .set(set)
    .where(where === anywhere ? undefined : where);
};

const checkWhere = <TTable extends PgTable>(schema: TTable, where: SQL | typeof anywhere, key: OmitKey) => {
  if (checkIsNil(where)) throw `Where is empty - parameter of db.${key}(${schema._.name}).where(${where})`;
};

export const dbDelete = <TTable extends PgTable>(schema: TTable, where: SQL | typeof anywhere) => {
  checkWhere(schema, where, 'delete');

  return dbNative.delete(schema).where(where === anywhere ? undefined : where);
};
