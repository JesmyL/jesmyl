import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';
import { makeRegExp } from 'regexpert';
import { JTgBotCallbackQuery } from '../model';
import { JesmylTelegramBot } from '../tg-bot';

export const tgBotUrlController = async (
  targetBot: JesmylTelegramBot,
  adminBot: JesmylTelegramBot,
  keyPrefix?: string,
) => {
  let chat: TelegramBot.Chat | null = null;
  let knownUrls: string[] = [];

  const urlWordParts = '-\\w@_%';
  const domainRegStr = `[a-z][${urlWordParts}]+\\.[${urlWordParts}./]{2,}`;
  const urlRegStr = `${domainRegStr}[${urlWordParts}?.#=$&]*`;

  const urlReg = makeRegExp(`/(${urlRegStr})/`);
  const domainReg = makeRegExp(`/(${domainRegStr})/g`);

  const knownUrlsSet: Set<string> = new Set();

  const keys: (TelegramBot.InlineKeyboardButton & { cb: JTgBotCallbackQuery })[][] = [
    [
      {
        text: '✅ Отправить ✅',
        callback_data: 'send-URL-message',
        cb: async (_bot, query, answer) => {
          if (query.message?.text === undefined || query.message.reply_to_message === undefined) return;

          try {
            await targetBot.forwardMessage(adminBot.chatId, query.message.reply_to_message.message_id ?? 0);
            await adminBot.editMessageText(query.message.message_id, 'Сообщение отправлено');

            answer({ text: 'Отправлено!', show_alert: true });
          } catch (error) {
            answer({ text: '' + error });
          }
        },
      },
      {
        text: '❌ Отменить ❌',
        callback_data: `delete-URL-message`,
        cb: async (_bot, query, answer) => {
          if (!query.message?.text) return;

          try {
            await adminBot.editMessageText(query.message.message_id, 'Отмена отправки сообщения');
          } catch (error) {
            answer({ text: '' + error });
          }
        },
      },
    ],
    [
      {
        text: '🔄 Перечитать информацию группы 🔄',
        callback_data: 'refresh-dsc',
        cb: async () => {
          const knowns = await refreshDescription();

          adminBot.postMessage(`Информация группы перечитана. Известные ссылки:\n\n${knowns.join('\n')}`);
        },
      },
    ],
  ];

  const botOptions: SendMessageOptions = adminBot.makeSendMessageOptions(keys, keyPrefix);

  const refreshDescription = async () => {
    chat = await targetBot.getChat();
    chat.description?.replace(domainReg, (all, address) => {
      knownUrlsSet.add(address);
      return all;
    });

    knownUrls = Array.from(knownUrlsSet);
    return knownUrls;
  };

  refreshDescription();

  targetBot.onChatMessages(async (bot, message) => {
    if (message.from == null || message.from.is_bot) return;

    const senderId = message.from.id;
    if ((await bot.getAdmins()).some(admin => admin.user.id === senderId)) return;

    const sendText = message.text ?? message.caption;

    if (sendText === undefined) return;

    const usedUnknownUrls: string[] = [];
    const urlParts = sendText.split(urlReg);

    if (urlParts == null) return;

    for (let i = 0; i < urlParts.length; i += 2) {
      const url = urlParts[i + 1];
      if (url == null || knownUrls.some(knownUrl => url.startsWith(knownUrl))) continue;

      usedUnknownUrls.push(url);
    }

    if (usedUnknownUrls.length === 0) return;

    const forwardedSentMessage = await adminBot.forwardMessage(bot.chatId, message.message_id);

    await adminBot.postMessage('Что делаем с сообщением?', {
      ...botOptions,
      reply_to_message_id: forwardedSentMessage.message_id,
    });

    await bot.deleteMessage(message.message_id);
  });
};
