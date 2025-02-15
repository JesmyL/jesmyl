import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';
import { makeRegExp } from 'shared/utils';
import { JTgBotCallbackQuery } from '../model';
import { JesmylTelegramBot } from '../tg-bot';

const getFullName = ({ first_name, last_name }: { first_name: string; last_name?: string }) =>
  `${first_name}${last_name === undefined ? '' : ` ${last_name}`}`;

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
  const makeUrlHyperlink = (url: string) => `<a href="http://${url}">${url}</a>`;

  const message1Separation = `.
Попытка отправить сообщение содержащее следующие неизвестные ссылки в группе `;
  const messageJSONSeparation = `JSON-код сообщения следующего содержания:`;
  const message2Separation = `
Отправку такого сообщения нужно подтвердить Админу.

`;

  const keys: (TelegramBot.InlineKeyboardButton & { cb: JTgBotCallbackQuery })[][] = [
    [
      {
        text: '✅ Отправить ✅',
        callback_data: 'send-URL-message',
        cb: async (_bot, query, answer) => {
          try {
            if (query.message === undefined) return;
            const text = query.message.text ?? query.message.caption;
            if (!text) return;

            const jsonSplittedMessage = text.split(messageJSONSeparation);
            const parsedMessage: TelegramBot.Message = JSON.parse(jsonSplittedMessage[1]);

            const messageText = `<b>${text.split(message1Separation)[0]}</b>:\n\n${
              jsonSplittedMessage[0].split(message2Separation)[1]
            }`;

            try {
              await targetBot.sendMediaBased(parsedMessage, {
                caption: messageText,
                reply_to_message_id: parsedMessage.media_group_id ? parsedMessage.message_id + 1 : undefined,
              });
            } catch (error) {
              if (parsedMessage.media_group_id)
                try {
                  await targetBot.sendMediaBased(parsedMessage, { caption: messageText });
                } catch (error) {
                  await targetBot.postMessage(messageText);
                }
              else await targetBot.postMessage(messageText);
            }

            adminBot.deleteMessage(query.message.message_id);
            adminBot.postMessage(
              'В чат' +
                (chat === null ? '' : ` <b>${chat.title}</b>`) +
                ` отправлено сообщение\n\n<blockquote expandable>${messageText}</blockquote>`,
            );
          } catch (error) {
            answer({ text: '' + error });
          }
        },
      },
      {
        text: '❌ Отменить ❌',
        callback_data: `delete-URL-message`,
        cb: async (_bot, query, answer) => {
          try {
            if (!query.message?.text) return;
            const messageText =
              '<b>Отмена отправки сообщения:</b>\n\n<tg-spoiler><b>ТЕКСТ\nОТПРАВЛЕННОГО\nСООБЩЕНИЯ</b>:\n\n' +
              query.message.text.split(message2Separation)[1] +
              '</tg-spoiler>';

            await adminBot.editMessageText(query.message.message_id, messageText);
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
    const id = message.from.id;
    if ((await bot.getAdmins()).some(admin => admin.user.id === id)) return;

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

    const messageFrom = message.from;
    bot.deleteMessage(message.message_id);

    const alertMessage = `Сообщения, содержащие неизвестные ссылки (не указанные в описании группы <b>${message.chat.title}</b>), должны пройти модерацию от Админов.\nСообщение, которое вы отправили будет переслано обратно в автоматическом режиме после прохождения модерации.`;

    try {
      await bot.sendMessage(id, alertMessage);
    } catch (error) {
      const deleteTime = 30;
      const sentMessage = await bot.postMessage(
        `${alertMessage}\n\n<b>Это сообщение будет удалено через ${deleteTime} секунд</b>`,
      );

      setTimeout(() => bot.deleteMessage(sentMessage.message_id), deleteTime * 1000);
    }

    try {
      await adminBot.sendMediaBased(message, { caption: 'Это вложение содержится в следующем сообщении' });
    } catch (error) {}

    adminBot.postMessage(
      (messageFrom.username ? `t.me/${messageFrom.username}, ` : '') +
        getFullName(messageFrom) +
        message1Separation +
        `<b>${message.chat.title}</b>:\n` +
        usedUnknownUrls.map(makeUrlHyperlink).join('\n') +
        message2Separation +
        '<blockquote expandable>' +
        sendText +
        '</blockquote>' +
        messageJSONSeparation +
        '<blockquote expandable>' +
        JSON.stringify(message) +
        '</blockquote>',
      botOptions,
    );
  });
};
