import { cmServerInvocatorBase } from './apps/cm/cm-invocator.base';
import sokiServer from './complect/soki/SokiServer';
import { supportTelegramBot } from './sides/telegram-bot/support/support-bot';

supportTelegramBot.getAdmins().finally(() => sokiServer.start());

cmServerInvocatorBase.$$register();
