import { bibleSokiInvocatorBaseServer } from './apps/bible/invocators';
import { cmFreshServerInvocatorBase } from './apps/cm/fresh-invocator.base';
import { indexServerInvocatorBase } from './apps/index/basics-invocator.base';
import { initTgScheduleInform } from './apps/index/schedules/tg-bot-inform/tg-inform';
import sokiServer from './complect/soki/SokiServer';
import { supportTelegramBot } from './sides/telegram-bot/support/support-bot';

supportTelegramBot.getAdmins().finally(() => sokiServer.start());

bibleSokiInvocatorBaseServer.$$register();
cmFreshServerInvocatorBase.$$register();
indexServerInvocatorBase.$$register();

initTgScheduleInform();
