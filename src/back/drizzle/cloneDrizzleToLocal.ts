import { lazyEnvJson } from 'back/envJson';
import { makeGreenLogTextBg } from 'back/utils.exec';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { comDB, sch2ComDB, schComHistoryDB, scheduleDB, user2ComDB, userDB, userExtDB, userRoleDB } from './schema';

export const cloneDrizzleToLocal = async () => {
  const serverClient = postgres(lazyEnvJson('.server').dbUrl);
  const localClient = postgres(lazyEnvJson().dbUrl);

  const dbServer = drizzle(serverClient);
  const dbLocal = drizzle(localClient);

  try {
    const tables = [
      userDB,
      userRoleDB,
      comDB,
      scheduleDB,

      //

      sch2ComDB,
      schComHistoryDB,
      user2ComDB,
      userExtDB,
    ];

    for (const table of tables) {
      const data = await dbServer.select().from(table);

      if (data.length > 0) {
        await dbLocal.delete(table);
        await dbLocal.insert(table).values(data);
      }
    }
    console.info(makeGreenLogTextBg('Копирование серверной Базы Данных прошло успешно'));
  } catch (e) {
    console.error(e);
  } finally {
    await serverClient.end();
    await localClient.end();
  }
};
