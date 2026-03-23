import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { emailerConfigFileStorage } from '../file-stores';

let transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;
type Options = Mail.Options;

export const sendEmailMessage = async (options: Options & { isSameTo?: boolean }) => {
  const auth = emailerConfigFileStorage.getValue().first;

  if (auth == null) return;
  const { promise, reject, resolve } = Promise.withResolvers<SMTPTransport.SentMessageInfo>();

  transporter ??= nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth,
  });
  const from = options.from ?? `"Jesmyl Space" <${auth.user}>`;

  transporter.sendMail(
    {
      to: options.isSameTo ? from : undefined,
      ...options,
      from,
    },
    (error, info) => {
      if (error) reject(error);
      else resolve(info);
    },
  );

  return promise;
};
