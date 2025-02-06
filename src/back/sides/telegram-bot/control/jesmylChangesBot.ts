import { jesmylTgBot } from '../bot';
import { tglogger } from '../log/log-bot';
import { JesmylTelegramBot } from '../tg-bot';

export const jesmylChangesBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1002210099106,
  logger: tglogger,
  uniqPrefix: '*',
});
