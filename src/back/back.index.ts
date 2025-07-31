import { bibleTsjrpcBaseServer } from './apps/bible/tsjrpc';
import { cmServerTsjrpcBase } from './apps/cm/tsjrpc.base';
import { startCrTgAlarm } from './apps/index/crTgAlarm';
import { scheduleWidgetMessageCatcher } from './apps/index/schedules/tg-bot-inform/message-catchers';
import { initTgScheduleInform } from './apps/index/schedules/tg-bot-inform/tg-inform';
import { indexServerTsjrpcBase } from './apps/index/tsjrpc.base';
import { sokiServer } from './complect/soki/SokiServer';
import { baseMessagesCatcher } from './sides/telegram-bot/complect/message-catchers';

sokiServer.start();

bibleTsjrpcBaseServer.$$register();
cmServerTsjrpcBase.$$register();
indexServerTsjrpcBase.$$register();

initTgScheduleInform();

baseMessagesCatcher.register();
scheduleWidgetMessageCatcher.register();

startCrTgAlarm();
