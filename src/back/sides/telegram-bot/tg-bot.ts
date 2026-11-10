import md5 from 'md5';
import TgBot, { InlineKeyboardButton, InlineKeyboardMarkup, SendMessageOptions, User } from 'node-telegram-bot-api';
import { makeRegExp } from 'regexpert';
import { SokiAuthLogin } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { Stream } from 'stream';
import { JTgBotCallbackQuery, JTgBotChatMessageCallback } from './model';
import { JesmylTelegramBotWrapper } from './tg-bot-wrapper';

const botName = 'jesmylbot';
const emojiesSet: Set<string> = new Set();

export type FreeAnswerCallbackQueryOptions = OmitOwn<Partial<TgBot.AnswerCallbackQueryOptions>, 'callback_query_id'>;

/** Бот конкретного чата: хранит chatId и уникальный префикс, а отправку делегирует обёртке. */
export class JesmylTelegramBot {
  chatId: number;
  private _bot: JesmylTelegramBotWrapper;
  botName = botName;
  uniqPrefix: string;
  sendMessage: (
    userOrId: User | number,
    text: string,
    options?: TgBot.SendMessageOptions | null,
  ) => ReturnType<typeof this._bot.sendMessage>;

  /** Запоминает чат и обёртку, заранее привязывая HTML-разметку к каждой отправке. */
  constructor(props: { chatId: number; bot: JesmylTelegramBotWrapper; uniqPrefix: string }) {
    this.chatId = props.chatId;
    this._bot = props.bot;
    this.sendMessage = (userOrId, text, options) =>
      this._bot.sendMessage(userOrId, text, { parse_mode: 'HTML', ...options });

    // Префикс должен быть уникальным в пределах процесса — иначе кнопки разных ботов перепутаются.
    if (emojiesSet.has(props.uniqPrefix)) throw `ununique uniqPrefix ${props.uniqPrefix}`;

    emojiesSet.add(props.uniqPrefix);
    this.uniqPrefix = props.uniqPrefix;
  }

  get isStarted() {
    return this._bot.isStarted;
  }

  async getChat() {
    if (!this._bot.isStarted) return null;

    return this._bot.bot.getChat(this.chatId);
  }

  async forwardMessage(fromChatId: TgBot.ChatId, messageId: number, options?: TgBot.ForwardMessageOptions) {
    if (!this._bot.isStarted) return null;

    return this._bot.bot.forwardMessage(this.chatId, fromChatId, messageId, options);
  }

  async sendPhoto(photo: string | Stream | Buffer, options?: TgBot.SendPhotoOptions, fileOptions?: TgBot.FileOptions) {
    if (!this._bot.isStarted) return null;

    return this._bot.bot.sendPhoto(this.chatId, photo, { parse_mode: 'HTML', ...options }, fileOptions);
  }

  async sendMediaBased(message: TgBot.Message, options?: TgBot.SendPhotoOptions, fileOptions?: TgBot.FileOptions) {
    if (!this._bot.isStarted) return null;

    const [actionName, field] = message.photo
      ? (['sendPhoto', message.photo[0].file_id] as const)
      : message.video
        ? (['sendVideo', message.video.file_id] as const)
        : message.audio
          ? (['sendAudio', message.audio.file_id] as const)
          : message.document
            ? (['sendDocument', message.document.file_id] as const)
            : message.voice
              ? (['sendVoice', message.voice.file_id] as const)
              : message.sticker
                ? (['sendSticker', message.sticker.file_id] as const)
                : ([null, null] as const);

    if (actionName === null) throw Error;

    return this._bot.bot[actionName](this.chatId, field, { parse_mode: 'HTML', ...options }, fileOptions);
  }

  convertNickFromId = (() => {
    const reg = makeRegExp('/./g');
    const callback = (all: string) => 'jesmylibot'[all as never];

    return (id: number, addTPrefix?: boolean) => (addTPrefix === false ? '' : 't:') + ('' + id).replace(reg, callback);
  })();

  static makeLoginFromId = (id: number): SokiAuthLogin => ('T' + md5('' + id).slice(1)) as never;

  makeSendMessageOptions(keyboard: (InlineKeyboardButton & { cb: JTgBotCallbackQuery })[][], keyPrefix?: string) {
    return this._bot.makeOptionsKeyboard(this, keyboard, false, keyPrefix);
  }

  /** Ловля сообщений чата намеренно отключена: тело оставлено заглушкой, чтобы не терять точку расширения. */
  onChatMessages(_cb: JTgBotChatMessageCallback) {
    // this._bot.registerChatMessagesCallback(this, this.chatId, cb);
  }

  /** Ловля callback-запросов чата тоже отключена — по тем же причинам. */
  onChatQueries(_cb: JTgBotCallbackQuery) {
    // this._bot.registerChatCallbackQueryCallback(this, this.chatId, cb);
  }

  async deleteMessage(messageId: number, chatId?: number) {
    if (!this._bot.isStarted) return false;

    return this._bot.bot.deleteMessage(chatId ?? this.chatId, messageId);
  }

  /** Правит текст сообщения в своём чате, перенося только inline-клавиатуру из переданных опций. */
  async editMessageText(messageId: number, text: string, keyboard?: SendMessageOptions) {
    if (!this._bot.isStarted) return;

    try {
      await this._bot.bot.editMessageText(text, {
        chat_id: this.chatId,
        message_id: messageId,
        parse_mode: 'HTML',
        reply_markup:
          keyboard === undefined
            ? undefined
            : {
                inline_keyboard: (keyboard.reply_markup as InlineKeyboardMarkup)?.inline_keyboard,
              },
      });
    } catch (_error) {
      // Сообщение могло быть уже удалено или не изменено — молча игнорируем эту штатную ошибку.
    }
  }

  getAdmins = () => {
    if (!this._bot.isStarted) return Promise.resolve<TgBot.ChatMember[]>([]);

    return this._bot.bot.getChatAdministrators(this.chatId);
  };

  async getUserData(id: number) {
    if (!this._bot.isStarted) return null;

    return this._bot.bot.getChatMember(this.chatId, id).catch(emptyFunc);
  }

  async tryIsUserMember(id: number) {
    const member = await this.getUserData(id);

    if (!member || member.status === 'kicked' || member.status === 'left') throw Error();

    return member;
  }

  messageCase = (prefix: `/${string}`, text: string) => {
    return prefix === text || `${prefix}@${botName}` === text;
  };
}
