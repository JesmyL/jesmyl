import { backConfig } from 'back/config/backConfig';
import { insertDashMessage } from 'back/dash/visits';
import TgBot from 'node-telegram-bot-api';
import { makeRegExp } from 'regexpert';
import { UserLogin } from 'shared/api';
import { DashMessageKind } from 'shared/model/index/visitsDashboard';
import { emptyFunc } from 'shared/utils';
import { JesmylTelegramBot } from './tg-bot';

const methodCodeReg = makeRegExp('/<code>([^<]*)<\\/code>/');
const htmlTagReg = makeRegExp('/<[^>]*>/g');
const secretCodeReg = makeRegExp('/\\b\\d{5,6}\\b|[\\w.+-]+@[\\w.-]+\\.[\\w.-]+/g');
const whitespaceReg = makeRegExp('/\\s+/g');

const takeSupportDashMessage = (html: string) => {
  const method = html.match(methodCodeReg)?.[1];

  if (method) return method.slice(0, 100);

  return html
    .replace(htmlTagReg, ' ')
    .replace(secretCodeReg, '***')
    .replace(whitespaceReg, ' ')
    .trim()
    .slice(0, 200);
};

export const enum PostJRPCMessageScope {
  Changes,
  Credit,
  Control,
  Error,
  Gul94i,
  Gul94iAdmin,
  Log,
  Prod,
  Support,
  Visit,
}

const dashKindByScope: Record<PostJRPCMessageScope, DashMessageKind> = {
  [PostJRPCMessageScope.Changes]: DashMessageKind.Changes,
  [PostJRPCMessageScope.Credit]: DashMessageKind.Log,
  [PostJRPCMessageScope.Control]: DashMessageKind.Log,
  [PostJRPCMessageScope.Error]: DashMessageKind.Errors,
  [PostJRPCMessageScope.Gul94i]: DashMessageKind.Log,
  [PostJRPCMessageScope.Gul94iAdmin]: DashMessageKind.Log,
  [PostJRPCMessageScope.Log]: DashMessageKind.Log,
  [PostJRPCMessageScope.Prod]: DashMessageKind.Log,
  [PostJRPCMessageScope.Support]: DashMessageKind.Support,
  [PostJRPCMessageScope.Visit]: DashMessageKind.VisitError,
};

export const postJRPCMessage = async (
  html: string,
  options: {
    tgBot: JesmylTelegramBot;
    scope?: PostJRPCMessageScope;
    dashMessage?: string;
    login?: UserLogin | nil;

    tg?: TgBot.SendMessageOptions & { chatId?: number };
  },
) => {
  if (backConfig.isTest) return;

  const kind = dashKindByScope[options.scope ?? options.tgBot.scope];
  const dashMessage = options.dashMessage ?? (kind === DashMessageKind.Support ? takeSupportDashMessage(html) : html);

  insertDashMessage(dashMessage, null, kind, options.login ?? null).catch(emptyFunc);

  if (!options.tgBot.isStarted) return;

  await options.tgBot.postMessage(html, options.tg, options.tg?.chatId).catch(emptyFunc);
};
