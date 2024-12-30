import TgBot, { CallbackQuery } from 'node-telegram-bot-api';
import { JesmylTelegramBot } from './tg-bot';
import { JesmylTelegramBotWrapper } from './tg-bot-wrapper';

export type FreeAnswerCallbackQueryOptions = OmitOwn<Partial<TgBot.AnswerCallbackQueryOptions>, 'callback_query_id'>;
export type JTgBotCallbackQueryWithoutBot = (
  query: CallbackQuery,
  answer: (options: string | FreeAnswerCallbackQueryOptions) => 'answered',
) => string | void | undefined | Promise<FreeAnswerCallbackQueryOptions | undefined | void | string>;
export type JTgBotCallbackQuery = (
  bot: JesmylTelegramBot,
  query: CallbackQuery,
  answer: (options: string | FreeAnswerCallbackQueryOptions) => 'answered',
) => string | void | undefined | Promise<FreeAnswerCallbackQueryOptions | undefined | void | string>;
export type JTgBotChatMessageCallbackWithoutBot = (message: TgBot.Message, metadata: TgBot.Metadata) => any;
export type JTgBotChatMessageCallback = (
  bot: JesmylTelegramBot,
  message: TgBot.Message,
  metadata: TgBot.Metadata,
) => any;
export type JTgBotPersonalMessageCallback = (
  bot: JesmylTelegramBotWrapper,
  message: TgBot.Message,
  metadata: TgBot.Metadata,
) => any;

export type TgBotWrapperMessageCatcher = (message: TgBot.Message, bot: TgBot) => void;

export type TgBotWrapperCallbackCatcher = (
  query: TgBot.CallbackQuery,
  bot: TgBot,
  answer: (options: string | FreeAnswerCallbackQueryOptions) => 'answered',
) => Promise<'answered'> | 'answered';
