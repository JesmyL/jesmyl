import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { objectValues } from 'shared/utils/object.utils';
import { emailerConfigFileStorage } from '../file-stores';
import { EmailerAuthConfigKey } from '../model';

const transporters: PRecord<string, nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>> = {};
type Options = Mail.Options;

let sentCount = 0;
let sentIncrementTimeOut: TimeOut;

export const sendEmailMessage = async (key: EmailerAuthConfigKey, options: Options & { isSameTo?: boolean }) => {
  clearTimeout(sentIncrementTimeOut);
  sentIncrementTimeOut = setTimeout(() => (sentCount = 0), 1000);

  if (sentCount++ > 20) return;

  const authDict = emailerConfigFileStorage.getValue();
  const auth = authDict[key] ?? objectValues(authDict).find(Boolean);

  if (!auth) throw new Error(`Почтовый аккаунт не настроен: ключ "${key}" отсутствует и запасных аккаунтов нет`);
  const { promise, reject, resolve } = Promise.withResolvers<SMTPTransport.SentMessageInfo>();

  const transporter = (transporters[auth.user] ??= nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth,
  }));
  const from = options.from ?? `"Jesmyl Space" <${auth.user}>`;
  const sendOptions = {
    to: options.isSameTo ? from : undefined,
    ...options,
    from,
    html: options.html ? `<div style='white-space:pre-line'>${options.html}</div>` : undefined,
  };

  transporter.sendMail(sendOptions, (error, info) => {
    if (error) reject(error);
    else resolve(info);
  });

  return promise;
};
