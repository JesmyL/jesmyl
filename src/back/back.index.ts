import { hostConfig, Langi } from 'shared/api';
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
import { sokiServer } from './complect/soki/SokiServer';
import { backConfig } from './config/backConfig';
import { localeDynamicKz } from './locales/dynamic/kz';
import { localeDynamicRu } from './locales/dynamic/ru';
import { localeDynamicUa } from './locales/dynamic/ua';
import { baseMessagesCatcher } from './sides/telegram-bot/complect/message-catchers';
import { updateAllStarts } from './updateAllStarts';

iife(async () => {
  if (Do.It) await import('./initBack').then(m => m.initBack());

  if (!Do.It) if (backConfig.isTest) await import('./drizzle/cloneDrizzleToLocal').then(m => m.cloneDrizzleToLocal());

  if (Do.It) await import('./drizzle/drizzleInitiator').then(m => m.drizzleInitiator());

  const ws = sokiServer.start();
  if (Do.It) await import('./startExpressRouting').then(m => m.startExpressRouting(ws));

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

  if (hostConfig.isUpdateAllStarts) updateAllStarts();
});

const langLocales = {
  [Langi.Kz]: localeDynamicKz,
  [Langi.Ru]: localeDynamicRu,
  [Langi.Ua]: localeDynamicUa,
};

CmComOrders.getLangLocales = langi => langLocales[langi];
