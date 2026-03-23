import { jesmylTgBot } from '../bot';
import { tgBotUrlController } from '../complect/url-controller';
import { logTelegramBot, tglogger } from '../log/log-bot';
import { PostJRPCMessageScope } from '../postJRPCMessage';
import { JesmylTelegramBot } from '../tg-bot';

export const controlTelegramBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1002054074700,
  logger: tglogger,
  uniqPrefix: ':',
  scope: PostJRPCMessageScope.Control,
});

tgBotUrlController(controlTelegramBot, logTelegramBot);
