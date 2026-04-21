import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { emailerConfigFileStorage } from '../file-stores';
import { EmailerAuthConfigKey } from '../model';

const transporters: PRecord<
  EmailerAuthConfigKey,
  nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>
> = {};
type Options = Mail.Options;

export const sendEmailMessage = async (key: EmailerAuthConfigKey, options: Options & { isSameTo?: boolean }) => {
  const auth = emailerConfigFileStorage.getValue()[key];

  if (auth == null) return;
  const { promise, reject, resolve } = Promise.withResolvers<SMTPTransport.SentMessageInfo>();

  transporters[key] ??= nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth,
  });
  const from = options.from ?? `"Jesmyl Space" <${auth.user}>`;
  const sendOptions = {
    to: options.isSameTo ? from : undefined,
    ...options,
    from,
    html: options.html ? `<div style='white-space:pre-line'>${options.html}</div>` : undefined,
  };

  transporters[key].sendMail(sendOptions, (error, info) => {
    if (error) reject(error);
    else resolve(info);
  });

  return promise;
};
