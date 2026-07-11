import { SQL } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../drizzle.schema';
import { lazyEnvJson } from '../envJson';

const queryClient = postgres(lazyEnvJson().dbUrl);
const dbNative = drizzle(queryClient, { schema });
export const db = dbNative as OmitOwn<typeof dbNative, 'update'>;

export const dbUpdate = <TTable extends PgTable>(schema: TTable, set: Partial<TTable['$inferInsert']>, where: SQL) =>
  dbNative.update(schema).set(set).where(where);
