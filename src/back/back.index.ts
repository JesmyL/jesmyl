import { cmCatServerInvocatorBase } from './apps/cm/cm-cat-invocator.base';
import { cmComServerInvocatorBase } from './apps/cm/cm-com-invocator.base';
import { cmComOrderServerInvocatorBase } from './apps/cm/cm-com-order-invocator.base';
import { cmServerInvocatorBase } from './apps/cm/cm-freshes-invocator.base';
import sokiServer from './complect/soki/SokiServer';
import { supportTelegramBot } from './sides/telegram-bot/support/support-bot';

supportTelegramBot.getAdmins().finally(() => sokiServer.start());

cmComServerInvocatorBase.$$register();
cmCatServerInvocatorBase.$$register();
cmComOrderServerInvocatorBase.$$register();
cmServerInvocatorBase.$$register();
