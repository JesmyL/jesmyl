import { makeRegExp } from 'regexpert';
import { jesmylTgBot } from '../bot';
import { tgBotDTO } from '../complect/dto';
import { tgBotUrlController } from '../complect/url-controller';
import { tglogger } from '../log/log-bot';
import { postJRPCMessage, PostJRPCMessageScope } from '../postJRPCMessage';
import { JesmylTelegramBot } from '../tg-bot';

export const gul94iTelegramBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1001862285194,
  logger: tglogger,
  uniqPrefix: '@',
  scope: PostJRPCMessageScope.Gul94i,
});

export const gul94iAdminTelegramBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1002202471829,
  logger: tglogger,
  uniqPrefix: '@!',
  scope: PostJRPCMessageScope.Gul94iAdmin,
});

tgBotDTO.gul94iAdminTelegramBot = gul94iAdminTelegramBot;
tgBotDTO.gul94iTelegramBot = gul94iTelegramBot;

const msgForCheck = 'пров';
const msgForPublicate = 'пуб!';
const spoilerDiv = `<span class="tg-spoiler">-------------------------</span>`;

const makeAndSendPoll = async (text: string, chatId: number) => {
  const [head, ...options] = text.split(makeRegExp('/\n{2,}/'));
  const aboutLabelMatch = head.match(makeRegExp('/^(Об? .+)$/m'));

  if (aboutLabelMatch === null) return;

  const [, aboutLabel] = aboutLabelMatch;
  const sentOptions = options.map(option => option.slice(0, 100));

  await jesmylTgBot.bot.sendPoll(
    chatId,
    `#ЧАОпрос\n\nЧестно. Анонимно. ${aboutLabel}\n\n-------------------------\n\n` +
      `всегда есть ответы, которые от нас хотят услышать, но этот опрос - не тест на знание. ` +
      `выбери пункты, как оно есть для тебя 🤗`,
    sentOptions,
    {
      allows_multiple_answers: true,
      is_anonymous: true,
      explanation_parse_mode: 'HTML',
    },
  );

  sentOptions.forEach((sentOption, sentOptioni) => {
    if (sentOption.length !== options[sentOptioni]?.length) {
      postJRPCMessage(
        spoilerDiv +
          `\n\n${sentOptioni + 1}-й пункт войдёт не полностью!\n\n` +
          options[sentOptioni] +
          `\n\n<b>стало:</b>\n${sentOption}\n\n` +
          spoilerDiv,
        { tgBot: gul94iAdminTelegramBot, tg: { parse_mode: 'HTML' } },
      );
    }
  });
};

gul94iAdminTelegramBot.onChatMessages(async (bot, message) => {
  if (message.text == null) return;
  const chaoHashTagRegExp = makeRegExp('/#ЧАОпрос/i');

  if (message.reply_to_message?.text?.match(chaoHashTagRegExp) != null) {
    if (message.text === msgForPublicate) {
      makeAndSendPoll(message.reply_to_message.text, gul94iTelegramBot.chatId);
      await bot.deleteMessage(message.message_id);

      postJRPCMessage('Опрос опубликован', {
        tgBot: bot,
        tg: {
          reply_to_message_id: message.reply_to_message.message_id,
        },
      });
    }

    if (message.text === msgForCheck) {
      makeAndSendPoll(message.reply_to_message.text, gul94iAdminTelegramBot.chatId);
      await bot.deleteMessage(message.message_id);
    }

    return;
  }

  if (message.text.match(chaoHashTagRegExp)) {
    postJRPCMessage(
      `#ЧАОпрос\n\n` +
        `сделай ответ на своё 👆🏻 сообщение, чтобы:\n` +
        `-- опубликовать опрос - "${msgForPublicate}";\n` +
        `-- проверить - "${msgForCheck}"`,
      { tgBot: bot, tg: { reply_to_message_id: message.message_id } },
    );
  }
});

tgBotUrlController(gul94iTelegramBot, gul94iAdminTelegramBot);
