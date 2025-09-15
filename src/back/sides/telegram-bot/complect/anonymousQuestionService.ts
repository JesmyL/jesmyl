import { jesmylTgBot } from '../bot';
import { tgBotDTO } from './dto';

export const telegramAnonymousChatMessageService = ({
  botAdminName,
  botName,
  chatTitle,
  id,
}: {
  id: string;
  chatTitle: string;
  botAdminName: keyof typeof tgBotDTO;
  botName: keyof typeof tgBotDTO;
}) => {
  const writeCommand = `/anonymous${id}letter`;
  const sendQuery = `&#*sendAnonLetter${id}`;

  jesmylTgBot.catchMessages((message, bot) => {
    if (message.from?.id === message.chat.id) {
      if (message.text === writeCommand || message.text?.startsWith(`${writeCommand}@`)) {
        bot.deleteMessage(message.chat.id, message.message_id);

        bot.sendMessage(
          message.chat.id,
          `${writeCommand}\n\nСделай ответ на данное сообщение, чтоб отправить анонимное сообщение в чат ${chatTitle}`,
        );

        return;
      }

      if (message.text && message.reply_to_message?.text?.startsWith(writeCommand)) {
        tgBotDTO[botAdminName]?.postMessage(message.text, {
          reply_markup: { inline_keyboard: [[{ text: 'Отправить анонимку в чат', callback_data: sendQuery }]] },
        });

        return;
      }
    }

    return;
  });

  setTimeout(() => {
    tgBotDTO[botAdminName]?.onChatQueries(async (_bot, query, answer) => {
      if (query.data === sendQuery && query.message?.text) {
        await tgBotDTO[botAdminName]?.editMessageText(query.message.message_id, query.message.text);
        await tgBotDTO[botName]?.postMessage(`<b>Анонимное сообщение</b>\n\n${query.message.text}`, {
          protect_content: true,
          allow_sending_without_reply: true,
        });

        answer({ text: 'Отправлено' });
      }
    });
  }, 500);

  return {
    command: writeCommand,
    description: `Анонимное сообщение в чат ${chatTitle}`,
  };
};
