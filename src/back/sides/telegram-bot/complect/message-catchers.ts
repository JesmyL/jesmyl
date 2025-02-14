import { hosts } from 'shared/api';
import { jesmylTgBot } from '../bot';
import { prodTelegramBot } from '../prod/prod-bot';

const initScheduleInform_ = '/initScheduleInform';

const initScheduleInformMarkup = {
  inline_keyboard: [
    [
      {
        text: 'Получить реквизиты чата',
        callback_data: initScheduleInform_,
      },
    ],
  ],
};

export const baseMessagesCatcher = jesmylTgBot.catchMessages(async (message, bot) => {
  if (!message.text?.startsWith('/start')) return;
  const id = message.from?.id;
  if (id == null || (await prodTelegramBot.getAdmins()).find(admin => admin.user.id === id) == null) return;

  await bot.sendMessage(message.chat.id, `Дейстаия`, { reply_markup: initScheduleInformMarkup });
  await bot.deleteMessage(message.chat.id, message.message_id);
});

jesmylTgBot.catchMessages(async (message, bot) => {
  if (message.from === undefined || !message.text?.startsWith('/printMsg')) return;

  bot.sendMessage(
    message.from.id,
    `msg from ${message.chat.title ?? message.chat.last_name}\n\n<code>${JSON.stringify(message, null, ' ')}</code>`,
    { parse_mode: 'HTML' },
  );
});

export const baseCallbackCatcher = jesmylTgBot.catchCallbackQuery(async (query, bot, answer) => {
  if (query.data !== initScheduleInform_ || query.message == null) return answer('');
  const requisites = `${query.message.chat.id}/${query.chat_instance}`;

  await bot.sendMessage(
    query.message.chat.id,
    `1. Для связывания этого чата с JesmyL-мероприятием необходимо ` +
      `вставить следующую строчку в поле управления мероприятием в приложении ${hosts.host}` +
      `\n\n<code>${requisites}</code>\n\n` +
      `2. Закрепите следующее сообщение для быстрого доступа к расписанию дня\n\n` +
      `3. Удалите это сообщение - оно больше не понадобится`,
    { parse_mode: 'HTML' },
  );

  await bot.sendMessage(query.message.chat.id, `Посмотреть`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: 'Расписание дня',
            url: 'https://t.me/jesmylbot/jesmylapp',
          },
        ],
      ],
    },
  });

  await bot.deleteMessage(query.message.chat.id, query.message.message_id);

  return answer(requisites);
});
