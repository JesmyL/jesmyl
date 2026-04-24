import { backConfig } from 'back/config/backConfig';
import TgBot from 'node-telegram-bot-api';
import Mail from 'nodemailer/lib/mailer';
import { sendEmailMessage } from '../emailer/lib/sendEmailMessage';
import { EmailerAuthConfigKey } from '../emailer/model';
import { JesmylTelegramBot } from './tg-bot';

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

const scopeTitleDict: Record<PostJRPCMessageScope, string> = {
  [PostJRPCMessageScope.Changes]: 'Changes',
  [PostJRPCMessageScope.Credit]: 'Credit',
  [PostJRPCMessageScope.Control]: 'Control',
  [PostJRPCMessageScope.Error]: 'Error',
  [PostJRPCMessageScope.Gul94i]: 'Gul94i',
  [PostJRPCMessageScope.Gul94iAdmin]: 'Gul94iAdmin',
  [PostJRPCMessageScope.Log]: 'Log',
  [PostJRPCMessageScope.Prod]: 'Prod',
  [PostJRPCMessageScope.Support]: 'Support',
  [PostJRPCMessageScope.Visit]: 'Visit',
};

export const postJRPCMessage = async (
  html: string,
  options: {
    tgBot: JesmylTelegramBot;
    scope?: PostJRPCMessageScope;

    tg?: TgBot.SendMessageOptions & { chatId?: number };
    email?: Mail.Options;
  },
  emailKey = EmailerAuthConfigKey.Self,
) => {
  if (backConfig.isTest) return;

  await sendEmailMessage(emailKey, {
    isSameTo: true,
    subject: `SYSTEM: ${new Date().toLocaleDateString('ru')} (${scopeTitleDict[options.scope ?? options.tgBot.scope]})`,
    html,
    ...options.email,
  });

  //   await options.tgBot.postMessage(text, options.tg, options.tg?.chatId);
};
