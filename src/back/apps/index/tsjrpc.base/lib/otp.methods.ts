import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { makeAuthFromEmail, makeLoginFromEmail } from 'back/sides/emailer/lib/makeEmailLogin';
import { sendEmailMessage } from 'back/sides/emailer/lib/sendEmailMessage';
import { PostJRPCMessageScope } from 'back/sides/telegram-bot/postJRPCMessage';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import jwt from 'jsonwebtoken';
import { LocalSokiAuth } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { smylib } from 'shared/utils';
import {
  emailTextingLetterVariantsFileStorage,
  indexUserLoginBindsFileStorage,
  sentEmailOTPFileStorage,
} from '../../file-stores';
import { indexTakeRootLoginRecursively } from '../../lib/takeRootLoginRecursively';

const expireOTP = (otp: number) => sentEmailOTPFileStorage.setValue(verifies => verifies.filter(it => it.otp !== otp));
const checkIsOTPTimeStampExpired = (timeStamp: number) => timeStamp < Date.now() - smylib.howMs.inMin * 5;

export const otpTSJRPCMethods = {
  sendEmailOTP: async ({ email }, { auth, visitInfo }) => {
    const verifies = sentEmailOTPFileStorage.getValue();
    let userVerify = verifies.find(({ deviceId, auth: verifyAuth }) => {
      return (
        (deviceId && visitInfo?.deviceId === deviceId) ||
        (auth && ((email && auth.email === email) || auth.login === verifyAuth.login || auth.nick === verifyAuth.nick))
      );
    });

    if (userVerify && !checkIsOTPTimeStampExpired(userVerify.ts)) throw 'Запросите отправку кода чуть позже';
    const otp = smylib.randomOf(12345, 98765);

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

    const expireMinutes = 3;
    const text = smylib.randomItem(emailTextingLetterVariantsFileStorage.getValue().texts);

    const expire = () => {
      clearTimeout(timeout);
      expireOTP(otp);
    };
    const timeout = setTimeout(expire, smylib.howMs.inMin * expireMinutes);

    const html = `${
      //
      text.replace(/{c}/, `<b style='font-size:1.5em'>${otp}</b>`).replace(/{n}/, 'JesmyL')
    }\n\nЧерез ${expireMinutes} минуты код станет не действительным`;

    try {
      await sendEmailMessage('second', {
        to: email,
        subject: 'Код верификации',
        html,
      });
    } catch (e) {
      throw `Произошла ошибка\n\n${e}`;
    }

    return {
      value: { email },
      description: `Запрос ОТП кода на E-mail ${email}<br/><br/><br/>${html}`,
      logScope: PostJRPCMessageScope.Support,
    };
  },

  bindEmailByOTP: ({ otp }, { auth }) => {
    if (auth == null) throw 'Не авторизован';
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

  authByEmailOTP: ({ otp }) => {
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
