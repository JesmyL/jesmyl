import { drizzle } from 'drizzle-orm/postgres-js'; // ИСПРАВЛЕНО: импортируем правильный драйвер для Postgres
import postgres from 'postgres';
import * as schema from '../drizzle.schema';
import { lazyEnvJson } from '../envJson';

const queryClient = postgres(lazyEnvJson().dbUrl);
export const db = drizzle(queryClient, { schema });
