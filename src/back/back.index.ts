import { cmFreshServerInvocatorBase } from './apps/cm/fresh-invocator.base';
import { indexServerInvocatorBase } from './apps/index/fresh-invocator.base';
import sokiServer from './complect/soki/SokiServer';
import { supportTelegramBot } from './sides/telegram-bot/support/support-bot';

supportTelegramBot.getAdmins().finally(() => sokiServer.start());

cmFreshServerInvocatorBase.$$register();
indexServerInvocatorBase.$$register();
