import { sql } from 'drizzle-orm';

export const emptyJSONArraySQL = sql`'[]'::jsonb`;
export const emptyJSONObjectSQL = sql`'{}'::jsonb`;

export const emptyTextArraySQL = sql`'{}'::text[]`;
