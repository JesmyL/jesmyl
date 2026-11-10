import { Langi } from 'shared/api';
import { CmComOrders } from 'shared/const/cm/Com/parents/20-Orders';
import { Do } from 'shared/enums';
import { emptyFunc, iife, wait } from 'shared/utils';
import { bibleTsjrpcBaseServer } from './apps/bible/tsjrpc';
import { cmServerTsjrpcBase } from './apps/cm/tsjrpc.base';
import { initSchedulePushInform } from './apps/index/schedules/app-inform/schedule-informer';
import { initVisitsDigest } from './apps/index/schedules/visits-digest/visits-digest';
import { indexServerTsjrpcBase } from './apps/index/tsjrpc.base';
import { questionerAdminServerTsjrpcBase } from './apps/q/tsjrpc/admin.tsjrpc.base';
import { questionerUserServerTsjrpcBase } from './apps/q/tsjrpc/user.tsjrpc.base';
import { storagesServerTsjrpcBase } from './apps/storages/tsjrpc.base';
import { initUserLangiFileStore } from './complect/userLangiFileStore';
import { sokiServer } from './complect/soki/SokiServer';
import { backConfig } from './config/backConfig';
import { localeDynamicEn } from './locales/dynamic/en';
import { localeDynamicKz } from './locales/dynamic/kz';
import { localeDynamicRu } from './locales/dynamic/ru';
import { localeDynamicUa } from './locales/dynamic/ua';

// Точка старта бэкенда: инициализация, регистрация TSJRPC-серверов и запуск фоновых задач.
iife(async () => {
  if (!backConfig.isTest) await import('./initBack').then(m => m.initBack());

  if (!Do.It) if (backConfig.isTest) await import('./drizzle/cloneDrizzleToLocal').then(m => m.cloneDrizzleToLocal());

  const ws = sokiServer.start();
  if (Do.It) await import('./startExpressRouting').then(m => m.startExpressRouting(ws));

  bibleTsjrpcBaseServer.$$register();
  cmServerTsjrpcBase.$$register();
  storagesServerTsjrpcBase.$$register();
  questionerAdminServerTsjrpcBase.$$register();
  questionerUserServerTsjrpcBase.$$register();
  indexServerTsjrpcBase.$$register();

  initSchedulePushInform();
  initUserLangiFileStore().catch(emptyFunc);

  initVisitsDigest();

  await wait(5000);
  await import('./drizzle/drizzleInitiator').then(m => m.drizzleInitiator());
});

const langLocales = {
  [Langi.Kz]: localeDynamicKz,
  [Langi.Ru]: localeDynamicRu,
  [Langi.Ua]: localeDynamicUa,
  [Langi.En]: localeDynamicEn,
};

CmComOrders.getLangLocales = langi => langLocales[langi];
