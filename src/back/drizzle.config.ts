import { lazyEnvJson } from 'back/envJson';
import { defineConfig } from 'drizzle-kit';

const { dbUrl, hostRootDir } = lazyEnvJson();

export default defineConfig({
  schema: `${hostRootDir}/drizzle.schema.cjs`,
  out: `drizzle.migrations`,
  dialect: 'postgresql',
  dbCredentials: { url: dbUrl },
});
