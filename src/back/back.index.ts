import { bibleSokiInvocatorBaseServer } from './apps/bible/invocators';
import { cmBasicServerInvocatorBase } from './apps/cm/basic-invocator.base';
import { indexServerInvocatorBase } from './apps/index/basics-invocator.base';
import { startCrTgAlarm } from './apps/index/crTgAlarm';
import { scheduleWidgetMessageCatcher } from './apps/index/schedules/tg-bot-inform/message-catchers';
import { initTgScheduleInform } from './apps/index/schedules/tg-bot-inform/tg-inform';
import { sokiServer } from './complect/soki/SokiServer';
import { baseMessagesCatcher } from './sides/telegram-bot/complect/message-catchers';

sokiServer.start();

bibleSokiInvocatorBaseServer.$$register();
cmBasicServerInvocatorBase.$$register();
indexServerInvocatorBase.$$register();

initTgScheduleInform();

baseMessagesCatcher.register();
scheduleWidgetMessageCatcher.register();

startCrTgAlarm();
