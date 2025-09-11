import { userAccessRightsFileStore } from 'back/apps/index/file-stores';
import { hosts } from 'shared/api';
import { jesmylTgBot } from '../bot';
import { prodTelegramBot } from '../prod/prod-bot';
import { JesmylTelegramBot } from '../tg-bot';

const initScheduleInform_ = '/initScheduleInform';
const requestAccessRights_ = '/requestAccessRights';

export const baseMessagesCatcher = jesmylTgBot.catchMessages(async (message, bot) => {
  if (!message.text?.startsWith('/start')) return;
  const id = message.from?.id;
  if (message.from?.id === message.chat.id) {
    await bot.sendMessage(message.chat.id, `Действия`, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Запросить права JesmyL',
              callback_data: requestAccessRights_,
            },
          ],
        ],
      },
    });
  } else if (id != null && (await prodTelegramBot.getAdmins()).find(admin => admin.user.id === id) != null) {
    await bot.sendMessage(message.chat.id, `Действия`, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Получить реквизиты чата',
              callback_data: initScheduleInform_,
            },
          ],
        ],
      },
    });
  }
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
  if (query.message == null) return answer('');

  if (query.data === initScheduleInform_) {
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
  } else if (query.data === requestAccessRights_) {
    const rights = userAccessRightsFileStore.getValueWithAutoSave();
    const user = query.from;

    rights[JesmylTelegramBot.makeLoginFromId(query.from.id)] ??= {
      info: {
        fio: `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`,
        m: Date.now(),
        isRequest: true,
      },
    };

    await bot.deleteMessage(query.message.chat.id, query.message.message_id);

    return answer({ text: 'Запрос подан. Свяжитесь с админом' });
  }

  return answer('...');
});
