import { jesmylTgBot } from '../bot';
import { tglogger } from '../log/log-bot';
import { PostJRPCMessageScope } from '../postJRPCMessage';
import { JesmylTelegramBot } from '../tg-bot';

export const jesmylChangesBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1002210099106,
  logger: tglogger,
  uniqPrefix: '*',
  scope: PostJRPCMessageScope.Changes,
});
