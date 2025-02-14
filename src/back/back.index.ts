import { bibleSokiInvocatorBaseServer } from './apps/bible/invocators';
import { cmFreshServerInvocatorBase } from './apps/cm/fresh-invocator.base';
import { indexServerInvocatorBase } from './apps/index/basics-invocator.base';
import { startCrTgAlarm } from './apps/index/crTgAlarm';
import { scheduleWidgetMessageCatcher } from './apps/index/schedules/tg-bot-inform/message-catchers';
import { initTgScheduleInform } from './apps/index/schedules/tg-bot-inform/tg-inform';
import { sokiServer } from './complect/soki/SokiServer';
import { baseMessagesCatcher } from './sides/telegram-bot/complect/message-catchers';
import { invitesTgBotListener } from './sides/telegram-bot/invites/invites.bot';

sokiServer.start();

bibleSokiInvocatorBaseServer.$$register();
cmFreshServerInvocatorBase.$$register();
indexServerInvocatorBase.$$register();

initTgScheduleInform();

baseMessagesCatcher.register();
scheduleWidgetMessageCatcher.register();

startCrTgAlarm();
invitesTgBotListener();
