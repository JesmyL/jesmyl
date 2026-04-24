import { getBibleTranslateTexts } from 'back/complect/lib/make-bible-texts';
import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { makeAuthFromEmail, makeLoginFromEmail } from 'back/sides/emailer/lib/makeEmailLogin';
import { sendEmailMessage } from 'back/sides/emailer/lib/sendEmailMessage';
import { EmailerAuthConfigKey } from 'back/sides/emailer/model';
import { logTelegramBot, tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { postJRPCMessage, PostJRPCMessageScope } from 'back/sides/telegram-bot/postJRPCMessage';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import jwt from 'jsonwebtoken';
import { makeRegExp } from 'regexpert';
import { LocalSokiAuth } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { smylib, wait } from 'shared/utils';
import {
  emailTextingLetterVariantsFileStorage,
  indexUserLoginBindsFileStorage,
  sentEmailOTPFileStorage,
} from '../../file-stores';
import { indexTakeRootLoginRecursively } from '../../lib/takeRootLoginRecursively';

const minutesUntilExpire = 5;
const expireOTP = (otp: number) => sentEmailOTPFileStorage.setValue(verifies => verifies.filter(it => it.otp !== otp));
const checkIsOTPTimeStampExpired = (timeStamp: number) =>
  timeStamp < Date.now() - smylib.howMs.inMin * minutesUntilExpire;

let bibleTexts: ReturnType<typeof getBibleTranslateTexts> | nil;
let bibleTextsExpireTimeOut: TimeOut;

const getRandomBibleChapterText = () => {
  bibleTexts ??= getBibleTranslateTexts();

  clearTimeout(bibleTextsExpireTimeOut);
  bibleTextsExpireTimeOut = setTimeout(() => (bibleTexts = null), smylib.howMs.inMin * 30);

  return smylib.randomItem(smylib.randomItem(bibleTexts.chapters)).join(' ');
};

const subjects = [
  'Код верификации',
  'Секретный код',
  'Секретный код верификации',
  'Код для идентификации почты',
  'Код для аутентификации почты',
  'Одноразовый код',
  'Одноразовый пароль',
  'Одноразовый код авторизации',
  'Секретный одноразовый код авторизации',
  'Одноразовый код верификации',
  'Одноразовый верификационный код',
  'Номер-пароль для аутентификации',
  'Аутентификационный пароль',
  'Аутентификационный код',
  'Аутентификационный код-пароль',
  'Аутентификационный номер-пароль',
  'Авторизационный код',
  'Авторизационный пароль',
  'Авторизационный номер-пароль',
  'Авторизационный код-пароль',
  'Верификационный номер-пароль',
  'Верификационный код-пароль',
  'Верификационный пароль',
  'Верификационный код',
];

const randomBibleChapterTextingList = [
  'Случайная глава из Писания',
  'Случайный текст из Библии',
  'Библейский текст',
  'Текст из Библии, взятый случайным образом',
  'Текст Писания для назидания (взят случайным образом)',
  'Назидание из Библейского Писания случайно выбранной главы',
  'Глава из Библейскго текста выбранная случайным образом',
  'Назидательный текст Священного Библейского Писания',
  'Взятый случайным образом текст из Библии',
  'Текст Священного Писания',
  'Библейский Священный текст в назидание',
  'Текст для назидания',
];

const makeMailtoButton = ({
  text,
  email,
  subject,
  buttonText,
}: {
  email: string;
  subject: string;
  text: string;
  buttonText: string;
}) =>
  `<a href="mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}"><button>${buttonText}</button></a>`;

export const otpTSJRPCMethods = {
  sendEmailOTP: async ({ email }, { auth, visitInfo }) => {
    await wait(5000);

    const verifies = sentEmailOTPFileStorage.getValue();
    let userVerify = verifies.find(({ deviceId, auth: verifyAuth }) => {
      return (
        (deviceId && visitInfo?.deviceId === deviceId) ||
        (auth && ((email && auth.email === email) || auth.login === verifyAuth.login || auth.nick === verifyAuth.nick))
      );
    });

    if (userVerify && !checkIsOTPTimeStampExpired(userVerify.ts)) throw 'Запросите отправку кода чуть позже';

    let otp;
    const oldOtpSet = new Set(verifies.map(it => it.otp));

    do otp = smylib.randomOf(12345, 987654);
    while (oldOtpSet.has(otp));

    const defaultVerify = {
      deviceId: visitInfo?.deviceId,
      auth: makeAuthFromEmail(email, auth),
      otp,
      ts: Date.now(),
    };

    if (!userVerify) {
      userVerify = defaultVerify;
      verifies.push(userVerify);
    } else Object.assign(userVerify, defaultVerify);

    sentEmailOTPFileStorage.saveValue();

    const text = smylib.randomItem(emailTextingLetterVariantsFileStorage.getValue().texts);

    const expire = () => {
      clearTimeout(timeout);
      expireOTP(otp);
    };
    const timeout = setTimeout(expire, smylib.howMs.inMin * minutesUntilExpire);
    let randomBibleText = '';

    try {
      randomBibleText = `\n\n\n${smylib.randomItem(randomBibleChapterTextingList)}:\n\n${getRandomBibleChapterText()}`;
    } catch {
      //
    }

    const makeText = (asHtml = true) =>
      `${text.replace(makeRegExp('/{c}/'), asHtml ? `<b style='font-size:1.5em'>${otp}</b>` : `${otp}`).replace(makeRegExp('/{n}/'), 'JesmyL')}\n\nЧерез ${minutesUntilExpire} ${
        //
        smylib.declension(minutesUntilExpire, 'минуту', 'минуты', 'минут')
      } код станет не действительным${randomBibleText}`;

    let logScope = PostJRPCMessageScope.Support;

    const html = makeText();

    try {
      await sendEmailMessage(EmailerAuthConfigKey.Space, {
        to: email,
        subject: smylib.randomItem(subjects),
        html,
      });
    } catch (e) {
      logScope = PostJRPCMessageScope.Error;
      tglogger.error(`Произошла ошибка\n\n${e}`);

      const sendMailtoButton = (scope: EmailerAuthConfigKey) =>
        postJRPCMessage(
          `${makeMailtoButton({
            email,
            subject: smylib.randomItem(subjects),
            text: makeText(false),
            buttonText: 'СФОРМИРОВАТЬ ПИСЬМО',
          })}\n\n\n\n\n${html}`,
          {
            tgBot: logTelegramBot,
            scope: PostJRPCMessageScope.Error,
          },
          scope,
        );

      try {
        await sendMailtoButton(EmailerAuthConfigKey.Space);
      } catch {
        tglogger.error(`Произошла вторичная ошибка\n\n${e}`);

        await sendMailtoButton(EmailerAuthConfigKey.Official);
      }
    }

    return {
      value: { email },
      description: `Запрос ОТП кода на E-mail ${email}\n\n\n${html}`,
      logScope,
    };
  },

  bindEmailByOTP: async ({ otp }, { auth }) => {
    if (auth == null) throw 'Не авторизован';

    await wait(5000);

    const verifies = sentEmailOTPFileStorage.getValue();
    const from = verifies.find(it => it.otp === otp);

    if (from == null) throw 'Не верный код';
    if (checkIsOTPTimeStampExpired(from.ts)) throw 'Время кода истекло';
    if (from.auth?.login == null) throw 'Ошибка привязки - неизвестный профиль';
    if (from.auth.login !== auth.login) throw 'Ошибка привязки - другой аккаунт';
    if (!from.auth.email) throw 'Ошибка привязки - e-mail не определён';

    const binds = indexUserLoginBindsFileStorage.getValue();
    const newLogin = makeLoginFromEmail(from.auth.email);

    if (binds[newLogin] != null)
      throw `E-mail уже привязан к ${(smylib.isStr(binds[newLogin]) ? binds[newLogin] : binds[newLogin].login) === auth.login ? 'вашему' : 'другому'} аккаунту`;
    if (newLogin === from.auth.login) throw 'Не возможно привязать почту к тому же аккаунту';

    binds[from.auth.login] ??= { ...from.auth, login: undefined as never };
    binds[newLogin] = from.auth.login;

    indexUserLoginBindsFileStorage.saveValue();
    expireOTP(otp);
    const fioOrNick = from.auth.fio ?? from.auth.nick ?? '???';

    return {
      value: { fioOrNick },
      description: `Привязка E-mail ${from.auth.email} к аккаунту для ${fioOrNick}`,
      logScope: PostJRPCMessageScope.Support,
    };
  },

  authByEmailOTP: async ({ otp }) => {
    await wait(5000);

    const verifies = sentEmailOTPFileStorage.getValue();
    const from = verifies.find(it => it.otp === otp);

    if (from == null) throw 'Не верный код';
    if (checkIsOTPTimeStampExpired(from.ts)) throw 'Время кода истекло';
    if (!from.auth.email) throw 'Ошибка привязки - e-mail не определён';

    const emailAuth = makeAuthFromEmail(from.auth.email, from.auth);
    const binds = indexUserLoginBindsFileStorage.getValue();
    const rootLogin = indexTakeRootLoginRecursively(makeLoginFromEmail(from.auth.email));
    const rootAuth = smylib.isObj(binds[rootLogin]) ? binds[rootLogin] : null;
    const emailNick = from.auth.email.split('@')[0];
    const auth: LocalSokiAuth = {
      ...rootAuth,
      ...emailAuth,
      login: rootLogin,
      nick: rootAuth?.nick || emailNick,
      fio: rootAuth?.fio || emailNick,
    };
    expireOTP(otp);

    return {
      value: {
        auth,
        token: jwt.sign(auth, tokenSecretFileStore.getValue().token, { expiresIn: '200 D' }),
      },
      description: `Авторизация по E-mail ${from.auth.email} (${auth.fio ?? auth.nick ?? auth.login ?? '???'})`,
      logScope: PostJRPCMessageScope.Support,
    };
  },
} satisfies Partial<ConstructorParameters<typeof TsjrpcBaseServer<IndexTsjrpcModel>>[0]['methods']>;
