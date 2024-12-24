import { SendMessageOptions } from 'node-telegram-bot-api';
import { jesmylTgBot } from '../bot';
import { tgBotUrlController } from '../complect/url-controller';
import { logTelegramBot, tglogger } from '../log/log-bot';
import { prodTelegramBot } from '../prod/prod-bot';
import { supportTelegramBot } from '../support/support-bot';
import { JesmylTelegramBot } from '../tg-bot';

export const controlTelegramBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1002054074700,
  logger: tglogger,
  uniqPrefix: ':',
});

const devStartOptions: SendMessageOptions = controlTelegramBot.makeSendMessageOptions([
  [
    {
      text: 'Обновить список админов',
      callback_data: 'refresh_admins',
      cb: async bot => {
        Promise.all([bot.refreshAdmins(), prodTelegramBot.refreshAdmins(), supportTelegramBot.refreshAdmins()])
          .then(() => {
            bot.postMessage('Список админов обновлён');
          })
          .catch(error => {
            bot.postMessage(`Ошибка обновления списка админов ${error}`);
          });
      },
    },
  ],
]);

controlTelegramBot.onChatMessages(async (bot, message) => {
  if (!message.text) return;

  if (bot.messageCase('/start', message.text)) {
    bot.postMessage('Действия', devStartOptions);
  }
});

tgBotUrlController(controlTelegramBot, logTelegramBot);
