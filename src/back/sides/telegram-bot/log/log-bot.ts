import { backConfig } from 'back/config/backConfig';
import { SendMessageOptions } from 'node-telegram-bot-api';
import { jesmylTgBot } from '../bot';
import { postJRPCMessage, PostJRPCMessageScope } from '../postJRPCMessage';
import { JesmylTelegramBot } from '../tg-bot';

export const logTelegramBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1002087759235,
  logger: null!,
  uniqPrefix: '#',
  scope: PostJRPCMessageScope.Log,
});

if (!backConfig.isTest) postJRPCMessage('>>> Сервис логирования запущен', { tgBot: logTelegramBot });

logTelegramBot.onChatMessages((bot, message) => {
  postJRPCMessage(`${message.text}\n\n#${message.message_id}`, { tgBot: bot });
});

export class TgLogger {
  bot: JesmylTelegramBot;

  private replyMessages = {
    error: 833,
    systemError: 838,
    log: 837,
    codeRequest: 841,
    jsonCode: 871,
    visit: 3343,
    userErrors: 94330,
  };

  constructor(bot: JesmylTelegramBot) {
    this.bot = bot;
  }

  private replyToScope(
    scope: keyof typeof this.replyMessages,
    options?: OmitOwn<SendMessageOptions, 'reply_to_message_id'>,
  ) {
    if (!this.replyMessages[scope]) return undefined;

    return { ...options, reply_to_message_id: this.replyMessages[scope] };
  }

  error(text: string) {
    postJRPCMessage(`<b>${text}</b>`, {
      tgBot: this.bot,
      tg: this.replyToScope('error'),
      scope: PostJRPCMessageScope.Error,
    });
  }

  systemError(text: string) {
    postJRPCMessage(`<b>${text}</b>`, {
      tgBot: this.bot,
      tg: this.replyToScope('systemError'),
      scope: PostJRPCMessageScope.Error,
    });
  }

  log(text: string) {
    console.info(text);
    postJRPCMessage(text, {
      tgBot: this.bot,
      tg: this.replyToScope('log'),
    });
  }

  visit(text: string) {
    postJRPCMessage(text, {
      tgBot: this.bot,
      tg: this.replyToScope('visit'),
      scope: PostJRPCMessageScope.Visit,
    });
  }

  userErrors(text: string) {
    postJRPCMessage(text, {
      tgBot: this.bot,
      tg: this.replyToScope('userErrors'),
      scope: PostJRPCMessageScope.Error,
    });
  }

  codeRequest(text: string) {
    postJRPCMessage(text, {
      tgBot: this.bot,
      tg: this.replyToScope('codeRequest'),
    });
  }

  jsonCode(data: unknown) {
    try {
      postJRPCMessage(`<code>${JSON.stringify(data, null, 1)}</code>`, {
        tgBot: this.bot,
        tg: this.replyToScope('jsonCode'),
      });
    } catch (_error) {
      //
    }
  }
}

export const tglogger = new TgLogger(logTelegramBot);
