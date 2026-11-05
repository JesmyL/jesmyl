import { backLocaleError, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { getBibleTranslateTexts } from 'back/complect/lib/make-bible-texts';
import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { userDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { jsonParseSecure, jsonStringifySecure } from 'back/json-secure';
import { makeAuthFromEmail, makeLoginFromEmail } from 'back/sides/emailer/lib/makeEmailLogin';
import { sendEmailMessage } from 'back/sides/emailer/lib/sendEmailMessage';
import { EmailerAuthConfigKey } from 'back/sides/emailer/model';
import { logTelegramBot, tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { postJRPCMessage, PostJRPCMessageScope } from 'back/sides/telegram-bot/postJRPCMessage';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { arrayOverlaps, eq, or } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { UserAuth } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { constantsConfigurator } from 'shared/const/cm/constants.def';
import { howMillisecondsInMin } from 'shared/const/ms';
import { randomItem, randomOf } from 'shared/randoms';
import { emptyFunc, wait } from 'shared/utils';
import { checkIsStartsWith } from 'shared/utils/checkIs';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { sentEmailOTPFileStorage } from '../../file-stores';
import { constantsConfigFileStore } from '../../schedules/file-stores';
import { sendSchedulePush } from '../../schedules/app-inform/web-push';
import { resetUserTiny } from '../../tinies/userTiny';

const minutesUntilExpire = 5;
const minutesUntilEmail = 1;
const emailTimeouts = new Map<number, TimeOut>();

const cancelOtpEmail = (otp: number) => {
  const emailTimeout = emailTimeouts.get(otp);

  if (emailTimeout) clearTimeout(emailTimeout);
  emailTimeouts.delete(otp);
};

const expireOTP = (otp: number) => {
  cancelOtpEmail(otp);
  sentEmailOTPFileStorage.setValue(verifies => verifies.filter(it => it.otp !== otp));
};
const checkIsOTPTimeStampExpired = (timeStamp: number) =>
  timeStamp < Date.now() - howMillisecondsInMin * minutesUntilExpire;

let bibleTexts: ReturnType<typeof getBibleTranslateTexts> | nil;
let bibleTextsExpireTimeOut: TimeOut;

const getRandomBibleChapterText = () => {
  bibleTexts ??= getBibleTranslateTexts();

  clearTimeout(bibleTextsExpireTimeOut);
  bibleTextsExpireTimeOut = setTimeout(() => (bibleTexts = null), howMillisecondsInMin * 30);

  return randomItem(randomItem(bibleTexts.chapters)).join(' ');
};

const otpBibleChapterIntroKeys = [
  BackLocaleKey.OtpBibleChapterIntro1,
  BackLocaleKey.OtpBibleChapterIntro2,
  BackLocaleKey.OtpBibleChapterIntro3,
  BackLocaleKey.OtpBibleChapterIntro4,
  BackLocaleKey.OtpBibleChapterIntro5,
  BackLocaleKey.OtpBibleChapterIntro6,
  BackLocaleKey.OtpBibleChapterIntro7,
  BackLocaleKey.OtpBibleChapterIntro8,
  BackLocaleKey.OtpBibleChapterIntro9,
  BackLocaleKey.OtpBibleChapterIntro10,
  BackLocaleKey.OtpBibleChapterIntro11,
  BackLocaleKey.OtpBibleChapterIntro12,
];

const otpEmailLetterKeys = [
  BackLocaleKey.OtpLetter1,
  BackLocaleKey.OtpLetter2,
  BackLocaleKey.OtpLetter3,
  BackLocaleKey.OtpLetter4,
  BackLocaleKey.OtpLetter5,
  BackLocaleKey.OtpLetter6,
  BackLocaleKey.OtpLetter7,
  BackLocaleKey.OtpLetter8,
  BackLocaleKey.OtpLetter9,
  BackLocaleKey.OtpLetter10,
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

const takeOtpPushUserId = async (email: string, auth: UserAuth | nil) => {
  const emailLogin = makeLoginFromEmail(email);
  const userByEmail = (
    await db
      .select({ id: userDB.id })
      .from(userDB)
      .where(or(eq(userDB.l, emailLogin), arrayOverlaps(userDB.ls, [emailLogin])))
      .limit(1)
  ).at(0);

  if (userByEmail) return userByEmail.id;
  if (!auth?.login) return null;

  return (
    (await db.select({ id: userDB.id }).from(userDB).where(eq(userDB.l, auth.login)).limit(1)).at(0)?.id ?? null
  );
};

const sendEmailOTP: ServerTsjrpcSatisfy<IndexTsjrpcModel>['sendEmailOTP_v1'] = async (
  { email },
  { auth, visitInfo },
) => {
  await wait(5000);

  const langi = visitInfo?.langi;
  const subject = translateBackTexts(langi, BackLocaleKey.OtpEmailSubject);
  const { availEmailDomainZone } = constantsConfigFileStore.getValue();
  const availEmailDomainZoneError = constantsConfigurator.availEmailDomainZone.error?.(availEmailDomainZone, email);

  if (availEmailDomainZoneError) throw backLocaleError(BackLocaleKey.EmailDomainInvalid, { e: email, r: `${availEmailDomainZoneError}` });

  const verifies = sentEmailOTPFileStorage.getValue();
  let userVerify = verifies.find(({ deviceId, auth: verifyAuth }) => {
    return (
      (deviceId && visitInfo?.deviceId === deviceId) ||
      (auth && ((email && auth.email === email) || auth.login === verifyAuth.login || auth.nick === verifyAuth.nick))
    );
  });

  if (userVerify && !checkIsOTPTimeStampExpired(userVerify.ts)) throw backLocaleError(BackLocaleKey.OtpRequestLater, { e: email });

  let otp;
  const oldOtpSet = new Set(verifies.map(it => it.otp));

  do otp = randomOf(12345, 987654);
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

  const letterKey = randomItem(otpEmailLetterKeys);

  const expire = () => {
    clearTimeout(timeout);
    expireOTP(otp);
  };
  const timeout = setTimeout(expire, howMillisecondsInMin * minutesUntilExpire);
  let randomBibleText = '';

  try {
    randomBibleText = `\n\n\n${translateBackTexts(langi, randomItem(otpBibleChapterIntroKeys))}:\n\n${getRandomBibleChapterText()}`;
  } catch {
    //
  }

  const makeText = (asHtml = true) =>
    `${translateBackTexts(langi, letterKey, {
      c: asHtml ? `<b style='font-size:1.5em'>${otp}</b>` : otp,
      n: 'JesmyL',
    })}\n\n${translateBackTexts(langi, BackLocaleKey.OtpEmailExpireTail, {
      n: minutesUntilExpire,
    })}${randomBibleText}`;

  const html = makeText();
  const pushUserId = await takeOtpPushUserId(email, auth);

  if (pushUserId !== null)
    await sendSchedulePush([pushUserId], {
      title: translateBackTexts(langi, BackLocaleKey.OtpPushTitle, { c: otp }),
      body: '',
      url: '/',
      tag: 'otp',
    }).catch(emptyFunc);

  emailTimeouts.set(
    otp,
    setTimeout(async () => {
      emailTimeouts.delete(otp);

      const pending = sentEmailOTPFileStorage.getValue().find(it => it.otp === otp);
      if (!pending || checkIsOTPTimeStampExpired(pending.ts)) return;

      try {
        await sendEmailMessage(EmailerAuthConfigKey.Space, {
          to: email,
          subject,
          html,
        });
      } catch (e) {
        tglogger.error(`Произошла ошибка\n\n${e}`);

        await postJRPCMessage(
          `${makeMailtoButton({
            email,
            subject,
            text: makeText(false),
            buttonText: translateBackTexts(null, BackLocaleKey.OtpTelegramMakeLetterButton),
          })}\n\n\n\n\n${html}`,
          {
            tgBot: logTelegramBot,
            scope: PostJRPCMessageScope.Error,
            dashMessage: translateBackTexts(null, BackLocaleKey.OtpTelegramSendError),
            login: auth?.login,
          },
        );
      }
    }, howMillisecondsInMin * minutesUntilEmail),
  );

  return {
    value: { email },
    description: `${backLocaleError(BackLocaleKey.DashOtpRequestEmail, { e: email })}\n\n\n${html}`,
    logScope: PostJRPCMessageScope.Support,
  };
};

export const otpTSJRPCMethods = {
  sendBindEmailOTP: async (args, props) => {
    const newLogin = makeLoginFromEmail(args.email);
    const userBinded = (
      await db
        .select({ l: userDB.l })
        .from(userDB)
        .where(or(eq(userDB.l, newLogin), arrayOverlaps(userDB.ls, [newLogin])))
        .limit(1)
    ).at(0);

    if (userBinded)
      throw userBinded.l === props.auth?.login
        ? backLocaleError(BackLocaleKey.EmailAlreadyBound)
        : backLocaleError(BackLocaleKey.EmailAlreadyBoundOther);

    return await sendEmailOTP(args, props);
  },

  sendEmailOTP_v1: sendEmailOTP,

  bindEmailByOTP: async ({ otp }, { auth: userAuth }) => {
    const auth = takeLogginedAuthOrThrow(userAuth);

    await wait(5000);

    const verifies = sentEmailOTPFileStorage.getValue();
    const from = verifies.find(it => it.otp === otp);

    if (!from) throw backLocaleError(BackLocaleKey.OtpIncorrect);
    if (checkIsOTPTimeStampExpired(from.ts)) throw backLocaleError(BackLocaleKey.OtpExpired);
    if (!from.auth?.login) throw backLocaleError(BackLocaleKey.OtpUnknownProfile);
    if (from.auth.login !== auth.login) throw backLocaleError(BackLocaleKey.OtpOtherAccount);
    if (!from.auth.email) throw backLocaleError(BackLocaleKey.OtpEmailMissing);

    cancelOtpEmail(otp);

    const newLogin = makeLoginFromEmail(from.auth.email);

    if (newLogin === from.auth.login) throw backLocaleError(BackLocaleKey.OtpSameAccount);

    const [user] = await db.select({ l: userDB.l, ls: userDB.ls }).from(userDB).where(eq(userDB.l, from.auth.login));

    if (user) {
      await dbUpdate(userDB, { ls: [...(user.ls ?? []), newLogin] }, eq(userDB.l, from.auth.login));
    } else {
      await db.insert(userDB).values({
        ls: [newLogin],
        auth: jsonStringifySecure(from.auth),
        l: from.auth.login,
        rights: {},
      });
    }

    expireOTP(otp);
    const fioOrNick = takeUserAuthName(from.auth) || '???';

    return {
      value: { fioOrNick },
      description: backLocaleError(BackLocaleKey.DashOtpBindEmail, { e: from.auth.email, f: fioOrNick }),
      logScope: PostJRPCMessageScope.Support,
    };
  },

  authByEmailOTP: async ({ otp }) => {
    await wait(5000);

    const verifies = sentEmailOTPFileStorage.getValue();
    const from = verifies.find(it => it.otp === otp);

    if (from == null) throw backLocaleError(BackLocaleKey.OtpIncorrect);
    if (checkIsOTPTimeStampExpired(from.ts)) throw backLocaleError(BackLocaleKey.OtpExpired);
    if (!from.auth.email) throw backLocaleError(BackLocaleKey.OtpEmailMissing);

    cancelOtpEmail(otp);

    const emailAuth = makeAuthFromEmail(from.auth.email, from.auth);
    const loginByEmail = makeLoginFromEmail(from.auth.email);
    const user = (
      await db
        .select({ l: userDB.l, auth: userDB.auth })
        .from(userDB)
        .where(or(eq(userDB.l, loginByEmail), arrayOverlaps(userDB.ls, [loginByEmail])))
        .limit(1)
    ).at(0);

    const rootAuth = user?.auth ? jsonParseSecure(user.auth) : null;

    const emailNick = from.auth.email.split('@', 1)[0];
    const auth = {
      ...rootAuth,
      ...emailAuth,
      login: user?.l ?? loginByEmail,
      email: rootAuth?.email ?? emailAuth.email,
      nick: rootAuth?.nick || emailNick,
      fio: rootAuth?.fio || emailNick,
    } satisfies UserAuth;

    if (!user) {
      await db.insert(userDB).values({
        l: auth.login,
        ls: [],
        auth: jsonStringifySecure({
          ...auth,
          login: undefined,
          fio: auth.nick === auth.fio ? undefined : auth.fio,
          nick: auth.email && auth.nick && checkIsStartsWith(auth.email, `${auth.nick}@`) ? undefined : auth.nick,
        }),
        rights: {},
      });

      resetUserTiny({ l: auth.login });
    }

    expireOTP(otp);

    return {
      value: {
        auth,
        token: jwt.sign(auth, tokenSecretFileStore.getValue().token, { expiresIn: '200 D' }),
      },
      description: backLocaleError(BackLocaleKey.DashOtpAuthEmail, {
        e: from.auth.email,
        f: takeUserAuthName(auth) || '???',
      }),
      logScope: PostJRPCMessageScope.Support,
    };
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;
