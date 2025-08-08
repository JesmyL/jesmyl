import { jesmylTgBot } from '../bot';
import { tgBotDTO } from './dto';

export const anonymousQuestionService = (id: string, title: string, botName: keyof typeof tgBotDTO) => {
  const command = `/anonymousquestion${id}`;

  jesmylTgBot.catchMessages((message, bot) => {
    if (message.from?.id === message.chat.id) {
      if (message.text === command || message.text?.startsWith(`${command}@`)) {
        bot.deleteMessage(message.chat.id, message.message_id);

        bot.sendMessage(
          message.chat.id,
          `${command}\n\nСделай ответ на данное сообщение, чтоб отправить свой анонимный запрос в чат Гулячи`,
        );

        return;
      }

      if (message.text && message.reply_to_message?.text?.startsWith(command)) {
        tgBotDTO[botName]?.postMessage(`<b>Анонимное сообщение</b>\n\n${message.text}`);
        return;
      }
    }

    return;
  });

  return {
    command,
    description: `Анонимный вопрос в чат ${title}`,
  };
};
