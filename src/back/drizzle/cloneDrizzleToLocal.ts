import { lazyEnvJson } from 'back/envJson';
import { makeGreenLogTextBg, makeYellowLogText } from 'back/utils.exec';
import { getTableColumns, getTableName, sql } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { Do } from 'shared/enums';
import { objectKeys } from 'shared/utils/object.utils';
import { dbUpdate } from './drizzle.db';
import {
  audioLinkDB,
  catDB,
  comDB,
  dashErrorDB,
  dashReadDB,
  eventCommentsDB,
  pushSubscriptionsDB,
  questionerBlankDB,
  questionerUserAnswerDB,
  sch2ComDB,
  schComHistoryDB,
  scheduleDB,
  user2ComDB,
  userDB,
  userExtDB,
  userRoleDB,
  visitDB,
  visitDayDB,
} from './schema';

const describeError = (error: unknown) => (error instanceof Error ? error.message : String(error));

const warnServerDbSkipped = (reason: string) =>
  console.warn(
    makeYellowLogText(
      `[Предупреждение] Серверная БД: ${reason} — копирование пропущено, используются локальные данные`,
    ),
  );

export const cloneDrizzleToLocal = async () => {
  const serverClient = postgres(lazyEnvJson('.server').dbUrl, { connect_timeout: 5 });
  const localClient = postgres(lazyEnvJson().dbUrl);

  const dbServer = drizzle(serverClient);
  const dbLocal = drizzle(localClient);

  const mkConfig = <const T extends PgTable>(table: T, update: (table: T) => PromiseOr<unknown>) => ({ table, update });

  const isServerDbReachable = async () => {
    try {
      await serverClient`select 1`;
      return true;
    } catch (error) {
      warnServerDbSkipped(`недоступна (${describeError(error)})`);
      return false;
    }
  };

  try {
    if (!(await isServerDbReachable())) return;

    const tables = [
      mkConfig(userDB, table => dbUpdate(table, { m: Date.now() }, 'ANYWHERE!')),

      mkConfig(userRoleDB, table => dbUpdate(table, { m: Date.now() }, 'ANYWHERE!')),

      mkConfig(comDB, table => dbUpdate(table, { m: Date.now(), amMod: Date.now() }, 'ANYWHERE!')),

      mkConfig(catDB, table => dbUpdate(table, { m: Date.now() }, 'ANYWHERE!')),

      mkConfig(scheduleDB, table => dbUpdate(table, { m: Date.now() }, 'ANYWHERE!')),

      mkConfig(eventCommentsDB, () => {}),

      mkConfig(questionerBlankDB, table => dbUpdate(table, { m: Date.now(), mod: Date.now() }, 'ANYWHERE!')),

      mkConfig(questionerUserAnswerDB, table => dbUpdate(table, { mod: Date.now() }, 'ANYWHERE!')),

      //

      mkConfig(sch2ComDB, table => dbUpdate(table, { intpMod: Date.now() }, 'ANYWHERE!')),

      mkConfig(schComHistoryDB, () => {}),

      mkConfig(user2ComDB, table => dbUpdate(table, { commentMod: Date.now() }, 'ANYWHERE!')),

      mkConfig(userExtDB, table =>
        dbUpdate(table, { cmFavComMod: Date.now(), cmFavComToolsMod: Date.now() }, 'ANYWHERE!'),
      ),

      mkConfig(audioLinkDB, () => {}),

      //

      mkConfig(pushSubscriptionsDB, () => {}),

      mkConfig(visitDB, () => {}),

      mkConfig(visitDayDB, () => {}),

      mkConfig(dashErrorDB, () => {}),

      mkConfig(dashReadDB, table => dbUpdate(table, { m: Date.now() }, 'ANYWHERE!')),
    ];

    for (const { table, update } of tables) {
      const data = await dbServer.select().from(table);

      if (data.length === 0) continue;

      const tableName = getTableName(table);
      const columns = getTableColumns(table);
      const maxBatchRows = Math.max(1, Math.floor(65000 / objectKeys(columns).length));

      await dbLocal.transaction(async tx => {
        await tx.delete(table);

        for (let i = 0; i < data.length; i += maxBatchRows) {
          await tx.insert(table).values(data.slice(i, i + maxBatchRows));
        }

        if ('id' in columns) {
          await tx.execute(
            sql`select case when s.seq is null then null else setval(s.seq, s.maxId + 1, false) end from (select pg_get_serial_sequence(quote_ident(${tableName}), 'id') seq, coalesce(max(id), 0) maxId from ${sql.identifier(tableName)}) s`,
          );
        }
      });

      if (Do.It) await update(table as never);
    }
    console.info(makeGreenLogTextBg('Копирование серверной Базы Данных прошло успешно'));
  } catch (error) {
    warnServerDbSkipped(`ошибка при копировании (${describeError(error)})`);
  } finally {
    await serverClient.end();
    await localClient.end();
  }
};
