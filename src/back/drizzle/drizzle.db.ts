import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../drizzle.schema';
import { lazyEnvJson } from '../envJson';

const queryClient = postgres(lazyEnvJson().dbUrl);
export const db = drizzle(queryClient, { schema });
