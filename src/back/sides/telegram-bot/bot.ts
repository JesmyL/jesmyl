import { tgBotConfig } from './file-stores';
import { JesmylTelegramBotWrapper } from './tg-bot-wrapper';

export const jesmylTgBot = new JesmylTelegramBotWrapper(tgBotConfig.getValue().token, {
  polling: true,
});

jesmylTgBot.setCommands([
  {
    command: '/start',
    description: 'Старт бота',
  },
  {
    command: '/do',
    description: 'Действия',
  },
  {
    command: '/init',
    description: 'Инициализировать',
  },
]);

jesmylTgBot.catchMessages((message, bot) => {
  if (message.text?.startsWith('/init@') || message.text === '/init') {
    bot.deleteMessage(message.chat.id, message.message_id);

    bot.sendMessage(message.chat.id, `Выберите пункт`, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Пригласительная база',
              callback_data: '/inviteChatManagment',
            },
          ],
        ],
      },
    });
  }

  return;
});
