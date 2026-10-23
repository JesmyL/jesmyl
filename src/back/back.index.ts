import { Langi } from 'shared/api';
import { CmComOrders } from 'shared/const/cm/Com/parents/20-Orders';
import { Do } from 'shared/enums';
import { iife } from 'shared/utils';
import { bibleTsjrpcBaseServer } from './apps/bible/tsjrpc';
import { cmServerTsjrpcBase } from './apps/cm/tsjrpc.base';
import { startCrTgAlarm } from './apps/index/crTgAlarm';
import { scheduleWidgetMessageCatcher } from './apps/index/schedules/tg-bot-inform/message-catchers';
import { initTgScheduleInform } from './apps/index/schedules/tg-bot-inform/tg-inform';
import { indexServerTsjrpcBase } from './apps/index/tsjrpc.base';
import { questionerAdminServerTsjrpcBase } from './apps/q/tsjrpc/admin.tsjrpc.base';
import { questionerUserServerTsjrpcBase } from './apps/q/tsjrpc/user.tsjrpc.base';
import { storagesServerTsjrpcBase } from './apps/storages/tsjrpc.base';
import type { CmAudiosMigrationSummary } from './audio/migrateCmAudiosToMd5Tails.model';
import { sokiServer } from './complect/soki/SokiServer';
import { backConfig } from './config/backConfig';
import { localeDynamicEn } from './locales/dynamic/en';
import { localeDynamicKz } from './locales/dynamic/kz';
import { localeDynamicRu } from './locales/dynamic/ru';
import { localeDynamicUa } from './locales/dynamic/ua';
import { baseMessagesCatcher } from './sides/telegram-bot/complect/message-catchers';
import { makeGreenLogText, makeRedLogText, makeYellowLogText } from './utils.exec';

const logCmAudiosMigrationSummary = (summary: CmAudiosMigrationSummary) => {
  const message = `[Миграция аудио] песен: ${summary.totalComs}, изменено: ${summary.changedComs}, al: ${summary.audioValuesMigrated}, am: ${summary.markKeysMigrated}, ждут скачивания: ${summary.pendingDownloads}, ошибок: ${summary.failures}`;

  console.info((summary.failures ? makeYellowLogText : makeGreenLogText)(message));
};

const migrateCmAudiosAtStartup = () =>
  import('./audio/migrateCmAudiosToMd5Tails')
    .then(m => m.migrateCmAudiosToMd5Tails({ allowDownloads: false }))
    .then(logCmAudiosMigrationSummary)
    .catch(error => console.error(makeRedLogText(`[Миграция аудио] критическая ошибка: ${String(error)}`)));

iife(async () => {
  if (Do.It) await import('./initBack').then(m => m.initBack());

  if (Do.It) if (backConfig.isTest) await import('./drizzle/cloneDrizzleToLocal').then(m => m.cloneDrizzleToLocal());

  if (Do.It) await import('./drizzle/drizzleInitiator').then(m => m.drizzleInitiator());

  const ws = sokiServer.start();
  if (Do.It) await import('./startExpressRouting').then(m => m.startExpressRouting(ws));

  migrateCmAudiosAtStartup();

  bibleTsjrpcBaseServer.$$register();
  cmServerTsjrpcBase.$$register();
  storagesServerTsjrpcBase.$$register();
  questionerAdminServerTsjrpcBase.$$register();
  questionerUserServerTsjrpcBase.$$register();
  indexServerTsjrpcBase.$$register();

  initTgScheduleInform();

  baseMessagesCatcher.register();
  scheduleWidgetMessageCatcher.register();

  startCrTgAlarm();
});

const langLocales = {
  [Langi.Kz]: localeDynamicKz,
  [Langi.Ru]: localeDynamicRu,
  [Langi.Ua]: localeDynamicUa,
  [Langi.En]: localeDynamicEn,
};

CmComOrders.getLangLocales = langi => langLocales[langi];
