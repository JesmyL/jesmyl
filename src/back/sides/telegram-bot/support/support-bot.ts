import { jesmylTgBot } from '../bot';
import { tgBotUrlController } from '../complect/url-controller';
import { logTelegramBot, tglogger } from '../log/log-bot';
import { prodStartOptions } from '../prod/prod-bot';
import { JesmylTelegramBot } from '../tg-bot';

export const supportTelegramBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1001938269237,
  logger: tglogger,
  uniqPrefix: '+',
});

tgBotUrlController(supportTelegramBot, logTelegramBot, '&');

supportTelegramBot.onChatMessages(async (bot, message) => {
  if (!message.text) return;
  const id = message.from?.id;

  if (id == null) return;

  try {
    const isCreator = (await bot.getAdmins()).find(admin => admin.user.id === id)?.status === 'creator';

    if (!isCreator) return;
  } catch (error) {
    return;
  }

  if (bot.messageCase('/start', message.text)) {
    bot.postMessage('Новая авторизация', prodStartOptions);
  }
});
