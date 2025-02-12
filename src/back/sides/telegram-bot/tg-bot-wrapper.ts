import TgBot, { BotCommand, InlineKeyboardButton, User } from 'node-telegram-bot-api';
import { Eventer, EventerCallback, EventerListeners, smylib } from 'shared/utils';
import { TgLogger } from './log/log-bot';
import {
  JTgBotCallbackQuery,
  JTgBotCallbackQueryWithoutBot,
  JTgBotChatMessageCallback,
  JTgBotChatMessageCallbackWithoutBot,
  TgBotWrapperCallbackCatcher,
  TgBotWrapperMessageCatcher,
} from './model';
import { FreeAnswerCallbackQueryOptions, JesmylTelegramBot } from './tg-bot';

export class JesmylTelegramBotWrapper {
  bot: TgBot;
  private fromOptionsOnCallbackQueryCallback: Record<string, { cb: JTgBotCallbackQueryWithoutBot; chatId: number }> =
    {};
  private chatCallbackQueryCallbacks: Record<string, JTgBotCallbackQueryWithoutBot> = {};
  private chatMessagesCallbacks: Record<string, JTgBotChatMessageCallbackWithoutBot[]> = {};
  private personalMessageListeners: EventerListeners<TgBot.Message> = [];
  private personalQueryListeners: EventerListeners<TgBot.CallbackQuery, void, string | FreeAnswerCallbackQueryOptions> =
    [];
  private messageCatchers: Set<TgBotWrapperMessageCatcher> = new Set();
  private callbackCatchers: Set<TgBotWrapperCallbackCatcher> = new Set();

  private _message: TgBot.Message = null!;
  private _metadata: TgBot.Metadata = null!;
  private _cbQuery: TgBot.CallbackQuery = null!;
  private _cbQueryAnswer = (_options: string | FreeAnswerCallbackQueryOptions) => 'answered' as const;

  constructor(token: string, options: TgBot.ConstructorOptions) {
    this.bot = new TgBot(token, options);

    this.bot.on('message', async (message, metadata) => {
      this._message = message;
      this._metadata = metadata;

      if (this.messageCatchers.size) {
        this.messageCatchers.forEach(this.invokeMessageCatcherItem);
      }

      if (this.chatMessagesCallbacks[0] !== undefined) {
        this.chatMessagesCallbacks[0].forEach(this.invokeMessageCallbacks);
      }

      if (this.chatMessagesCallbacks[message.chat.id] !== undefined) {
        this.chatMessagesCallbacks[message.chat.id].forEach(this.invokeMessageCallbacks);
        return;
      }

      if (this.personalMessageListeners.length > 0 && message.from?.id === message.chat.id) {
        Eventer.invoke(this.personalMessageListeners, message);
        return;
      }
    });

    this.bot.on('callback_query', async query => {
      const answer = (options: string | FreeAnswerCallbackQueryOptions) => {
        if (options === '') return 'answered' as const;

        this.bot.answerCallbackQuery(
          query.id,
          smylib.isStr(options)
            ? { text: options, callback_query_id: query.id }
            : { show_alert: true, ...options, callback_query_id: query.id },
        );

        return 'answered' as const;
      };

      if (this.callbackCatchers.size) {
        this._cbQuery = query;
        this._cbQueryAnswer = answer;
        this.callbackCatchers.forEach(this.invokeCallbackQueryCatcherItem, this);
      }

      if (query.data && this.fromOptionsOnCallbackQueryCallback[query.data] !== undefined) {
        const { cb, chatId } = this.fromOptionsOnCallbackQueryCallback[query.data];

        if (query.message?.chat.id !== chatId) return;

        const answerResult = await cb(query, answer);
        if (answerResult !== undefined) {
          answer(answerResult);
          return;
        }
      }

      if (query.message !== undefined && this.chatCallbackQueryCallbacks[query.message.chat.id] !== undefined) {
        const answerResult = await this.chatCallbackQueryCallbacks[query.message.chat.id](query, answer);
        if (answerResult !== undefined) answer(answerResult);
      }

      if (this.personalQueryListeners.length > 0 && query.from.id === query.message?.chat.id) {
        const event = await Eventer.invoke(this.personalQueryListeners, query);
        if (event.stoppedValue !== undefined && (smylib.isStr(event.stoppedValue) || event.stoppedValue.text))
          answer(event.stoppedValue);
      }
    });
  }

  invokeMessageCatcherItem = (cb: TgBotWrapperMessageCatcher) => cb(this._message, this.bot);
  invokeMessageCallbacks = (cb: JTgBotChatMessageCallbackWithoutBot) => cb(this._message, this._metadata);

  invokeCallbackQueryCatcherItem = (cb: TgBotWrapperCallbackCatcher) =>
    cb(this._cbQuery, this.bot, this._cbQueryAnswer);

  catchMessages(catcher: TgBotWrapperMessageCatcher) {
    this.messageCatchers.add(catcher);

    return { register: () => {}, off: () => this.messageCatchers.delete(catcher) };
  }

  catchCallbackQuery(catcher: TgBotWrapperCallbackCatcher) {
    this.callbackCatchers.add(catcher);

    return { register: () => {}, off: () => this.callbackCatchers.delete(catcher) };
  }

  sendMessage(userOrId: User | number, text: string, logger: TgLogger, options?: TgBot.SendMessageOptions | null) {
    return new Promise<{ ok: false; value: string } | { ok: true; value: TgBot.Message }>(res => {
      this.bot
        .sendMessage(smylib.isNum(userOrId) ? userOrId : userOrId.id, text, {
          parse_mode: 'HTML',
          ...options,
        })
        .then(message => res({ ok: true, value: message }))
        .catch(error => {
          logger.error(
            `Попытка отправки сообщения неизвестному пользователю\n\n<code>${JSON.stringify(
              userOrId,
              null,
              1,
            )}</code>\n\n${text}\n\n${error}`,
          );
          res({ ok: false, value: 'Бот @jesmylbot не запущен' });
        });
    });
  }

  listenPersonalMessages = (cb: EventerCallback<TgBot.Message>) => {
    return Eventer.listen(this.personalMessageListeners, cb);
  };

  listenPersonalQueries = (cb: EventerCallback<TgBot.CallbackQuery, void, string | FreeAnswerCallbackQueryOptions>) => {
    return Eventer.listen(this.personalQueryListeners, cb);
  };

  setCommands(commands: BotCommand[]) {
    this.bot.setMyCommands(commands);
  }

  makeOptionsKeyboard(
    bot: JesmylTelegramBot,
    keyboard: (InlineKeyboardButton & { cb: JTgBotCallbackQuery })[][],
    isRewriteButtonOnSameKey?: boolean,
    keyPrefix?: string,
  ) {
    const prefix = `${bot.uniqPrefix}${keyPrefix ? ` ${keyPrefix}` : ''}`;

    keyboard.flat().forEach(key => {
      if (!key.callback_data || !key.cb) return;
      const cbData = `${prefix}${key.callback_data}`;

      if (isRewriteButtonOnSameKey !== true && this.fromOptionsOnCallbackQueryCallback[cbData] !== undefined)
        throw Error(`Повторяющиеся ключи callback_query: ${cbData}`);

      const cb = key.cb;

      this.fromOptionsOnCallbackQueryCallback[cbData] = {
        cb: (message, answer) => cb(bot, message, answer),
        chatId: bot.chatId,
      };
    });

    return {
      reply_markup: {
        inline_keyboard: keyboard.map(line => {
          return line.map(key => {
            return {
              ...key,
              callback_data: `${prefix}${key.callback_data}`,
            };
          });
        }),
      },
    };
  }

  registerChatMessagesCallback(bot: JesmylTelegramBot, chatId: number, cb: JTgBotChatMessageCallback) {
    if (this.chatMessagesCallbacks[chatId] == null)
      this.chatMessagesCallbacks[chatId] = [(message, metadata) => cb(bot, message, metadata)];
    else this.chatMessagesCallbacks[chatId].push((message, metadata) => cb(bot, message, metadata));
  }

  registerChatCallbackQueryCallback(bot: JesmylTelegramBot, chatId: number, cb: JTgBotCallbackQuery) {
    this.chatCallbackQueryCallbacks[chatId] = (query, answerCallback) => cb(bot, query, answerCallback);
  }
}
