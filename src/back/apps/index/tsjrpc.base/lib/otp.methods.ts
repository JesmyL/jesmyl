import { getBibleTranslateTexts } from 'back/complect/lib/make-bible-texts';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { usersDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { jsonParseSecure, jsonStringifySecure } from 'back/json-secure';
import { makeAuthFromEmail, makeLoginFromEmail } from 'back/sides/emailer/lib/makeEmailLogin';
import { sendEmailMessage } from 'back/sides/emailer/lib/sendEmailMessage';
import { EmailerAuthConfigKey } from 'back/sides/emailer/model';
import { logTelegramBot, tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { postJRPCMessage, PostJRPCMessageScope } from 'back/sides/telegram-bot/postJRPCMessage';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { arrayOverlaps, eq, or } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { makeRegExp } from 'regexpert';
import { LocalSokiAuth } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { constantsConfigurator } from 'shared/const/cm/constants.def';
import { howMillisecondsInMin } from 'shared/const/ms';
import { smylib, wait } from 'shared/utils';
import { emailTextingLetterVariantsFileStorage, sentEmailOTPFileStorage } from '../../file-stores';
import { constantsConfigFileStore } from '../../schedules/file-stores';

const minutesUntilExpire = 5;
const expireOTP = (otp: number) => sentEmailOTPFileStorage.setValue(verifies => verifies.filter(it => it.otp !== otp));
const checkIsOTPTimeStampExpired = (timeStamp: number) =>
  timeStamp < Date.now() - howMillisecondsInMin * minutesUntilExpire;

let bibleTexts: ReturnType<typeof getBibleTranslateTexts> | nil;
let bibleTextsExpireTimeOut: TimeOut;

const getRandomBibleChapterText = () => {
  bibleTexts ??= getBibleTranslateTexts();

  clearTimeout(bibleTextsExpireTimeOut);
  bibleTextsExpireTimeOut = setTimeout(() => (bibleTexts = null), howMillisecondsInMin * 30);

  return smylib.randomItem(smylib.randomItem(bibleTexts.chapters)).join(' ');
};

const subjects = [
  'Код верификации',
  'Код для идентификации почты',
  'Код для аутентификации почты',
  'Одноразовый код авторизации',
  'Секретный одноразовый код авторизации',
  'Одноразовый код верификации',
  'Одноразовый верификационный код',
  'Номер-пароль для аутентификации',

  ...['Аутентификационный', 'Авторизационный', 'Верификационный', 'Одноразовый', 'Секретный']
    .map(pre => ['код', 'код-пароль', 'номер-пароль', 'пароль'].map(post => `${pre} ${post}`))
    .flat(),
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

const sendEmailOTP: ServerTsjrpcSatisfy<IndexTsjrpcModel>['sendEmailOTP_v1'] = async (
  { email },
  { auth, visitInfo },
) => {
  await wait(5000);

  const { availEmailDomainZone } = constantsConfigFileStore.getValue();
  const availEmailDomainZoneError = constantsConfigurator.availEmailDomainZone.error(availEmailDomainZone, email);

  if (availEmailDomainZoneError) throw `${email} - ${availEmailDomainZoneError}`;

  const verifies = sentEmailOTPFileStorage.getValue();
  let userVerify = verifies.find(({ deviceId, auth: verifyAuth }) => {
    return (
      (deviceId && visitInfo?.deviceId === deviceId) ||
      (auth && ((email && auth.email === email) || auth.login === verifyAuth.login || auth.nick === verifyAuth.nick))
    );
  });

  if (userVerify && !checkIsOTPTimeStampExpired(userVerify.ts)) throw `${email} - Запросите отправку кода чуть позже`;

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
  const timeout = setTimeout(expire, howMillisecondsInMin * minutesUntilExpire);
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
    } код станет недействительным${randomBibleText}`;

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
};

export const otpTSJRPCMethods = {
  sendBindEmailOTP: async (args, props) => {
    const newLogin = makeLoginFromEmail(args.email);

    const userBinded = (
      await db
        .select({ l: usersDB.l })
        .from(usersDB)
        .where(or(eq(usersDB.l, newLogin), arrayOverlaps(usersDB.ls, [newLogin])))
    ).at(0);

    if (userBinded) throw `E-mail уже привязан к ${userBinded.l === props.auth?.login ? 'вашему' : 'другому'} аккаунту`;

    return await sendEmailOTP(args, props);
  },

  sendEmailOTP_v1: sendEmailOTP,

  bindEmailByOTP: async ({ otp }, { auth: userAuth }) => {
    const auth = takeLogginedAuthOrThrow(userAuth);

    await wait(5000);

    const verifies = sentEmailOTPFileStorage.getValue();
    const from = verifies.find(it => it.otp === otp);

    if (!from) throw 'Не верный код';
    if (checkIsOTPTimeStampExpired(from.ts)) throw 'Время кода истекло';
    if (!from.auth?.login) throw 'Ошибка привязки - неизвестный профиль';
    if (from.auth.login !== auth.login) throw 'Ошибка привязки - другой аккаунт';
    if (!from.auth.email) throw 'Ошибка привязки - e-mail не определён';

    const newLogin = makeLoginFromEmail(from.auth.email);

    if (newLogin === from.auth.login) throw 'Не возможно привязать почту к тому же аккаунту';

    const [user] = await db
      .select({ l: usersDB.l, ls: usersDB.ls })
      .from(usersDB)
      .where(eq(usersDB.l, from.auth.login));

    if (user) {
      await db
        .update(usersDB)
        .set({ ls: [...(user.ls ?? []), newLogin] })
        .where(eq(usersDB.l, from.auth.login));
    } else {
      await db.insert(usersDB).values({
        ls: [newLogin],
        auth: jsonStringifySecure(from.auth),
        rules: {},
        l: from.auth.login,
      });
    }

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
    const loginByEmail = makeLoginFromEmail(from.auth.email);
    const user = (
      await db
        .select({ l: usersDB.l, auth: usersDB.auth })
        .from(usersDB)
        .where(or(eq(usersDB.l, loginByEmail), arrayOverlaps(usersDB.ls, [loginByEmail])))
    ).at(0);

    const rootAuth = user?.auth ? jsonParseSecure(user.auth) : null;

    const emailNick = from.auth.email.split('@', 1)[0];
    const auth: LocalSokiAuth = {
      ...rootAuth,
      ...emailAuth,
      login: user?.l ?? loginByEmail,
      email: rootAuth?.email ?? emailAuth.email,
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
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
