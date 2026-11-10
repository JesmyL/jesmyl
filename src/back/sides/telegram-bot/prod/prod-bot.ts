import { valuesFileStore } from 'back/apps/index/file-stores';
import { backConfig } from 'back/config/backConfig';
import { SendMessageOptions } from 'node-telegram-bot-api';
import { hostConfig } from 'shared/api';
import { jesmylTgBot } from '../bot';
import { JesmylTelegramBot } from '../tg-bot';
import { authorizeTelegramCb } from './authorize';

/** Бот продакшн-чата: отдельный логгер и scope ему больше не нужны — работает только отправка сообщений. */
export const prodTelegramBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: backConfig.tgProdChatId,
  uniqPrefix: '',
});

/** Набор кнопок под приветственным сообщением: единственная кнопка запускает авторизацию через Telegram. */
export const prodStartOptions: SendMessageOptions = prodTelegramBot.makeSendMessageOptions([
  [
    {
      text: 'Авторизоваться',
      callback_data: 'authorize',
      cb: authorizeTelegramCb,
    },
  ],
]);

const prodStartMessage = (botName: string) => `
Привет!
Теперь есть возможность авторизоваться в приложении <a href="${hostConfig.url}">JesmyL</a> через Телеграм-бота

Для этого:
  1. Нужно состоять в <a href="${valuesFileStore.getValue().chatUrl}">группе</a>
  2. Запусти <a href="https://t.me/${botName}">бота</a>
  3. Нажми "Авторизоваться" под этим сообщением или в закрепе
  4. Перейди в <a href="https://t.me/${botName}">бот</a> и следуй инструкции там.

В дальнейшем начинай с пункта 3`;

// Обработчик сообщений продакшн-чата: чистит сервисные сообщения и отвечает на `/start` приветствием с кнопкой авторизации.
prodTelegramBot.onChatMessages((bot, message) => {
  if (message.new_chat_members) {
    bot.deleteMessage(message.message_id);
  }

  if (!message.text) return;

  if (bot.messageCase('/start', message.text)) {
    // Отправляем приветствие с кнопкой авторизации прямо в чат, откуда пришла команда.
    bot.sendMessage(message.chat.id, prodStartMessage(bot.botName), prodStartOptions);
  }
});
