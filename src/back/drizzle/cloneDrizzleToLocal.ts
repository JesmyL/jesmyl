import { lazyEnvJson } from 'back/envJson';
import { makeGreenLogTextBg } from 'back/utils.exec';
import { PgTable } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Do } from 'shared/enums';
import { dbUpdate } from './drizzle.db';
import { comDB, sch2ComDB, schComHistoryDB, scheduleDB, user2ComDB, userDB, userExtDB, userRoleDB } from './schema';

export const cloneDrizzleToLocal = async () => {
  const serverClient = postgres(lazyEnvJson('.server').dbUrl);
  const localClient = postgres(lazyEnvJson().dbUrl);

  const dbServer = drizzle(serverClient);
  const dbLocal = drizzle(localClient);

  const mkConfig = <const T extends PgTable>(table: T, update: (table: T) => PromiseOr<unknown>) => ({ table, update });

  try {
    const tables = [
      mkConfig(userDB, table => dbUpdate(table, { m: Date.now() }, 'ANYWHERE!')),

      mkConfig(userRoleDB, table => dbUpdate(table, { m: Date.now() }, 'ANYWHERE!')),

      mkConfig(comDB, table => dbUpdate(table, { m: Date.now(), amMod: Date.now() }, 'ANYWHERE!')),

      mkConfig(scheduleDB, table => dbUpdate(table, { m: Date.now() }, 'ANYWHERE!')),

      //

      mkConfig(sch2ComDB, table => dbUpdate(table, { intpMod: Date.now() }, 'ANYWHERE!')),

      mkConfig(schComHistoryDB, () => {}),

      mkConfig(user2ComDB, table => dbUpdate(table, { commentMod: Date.now() }, 'ANYWHERE!')),

      mkConfig(userExtDB, table =>
        dbUpdate(table, { cmFavComMod: Date.now(), cmFavComToolsMod: Date.now() }, 'ANYWHERE!'),
      ),
    ];

    for (const { table, update } of tables) {
      const data = await dbServer.select().from(table);

      if (data.length > 0) {
        await dbLocal.delete(table);
        await dbLocal.insert(table).values(data);

        if (Do.It) await update(table as never);
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
