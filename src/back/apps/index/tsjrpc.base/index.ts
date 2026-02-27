import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { makeAuthFromEmail, makeLoginFromEmail } from 'back/sides/emailer/lib/makeEmailLogin';
import { sendEmailMessage } from 'back/sides/emailer/lib/sendEmailMessage';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { supportTelegramAuthorizations } from 'back/sides/telegram-bot/prod/authorize';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { exec } from 'child_process';
import jwt from 'jsonwebtoken';
import { escapeRegExpSymbols, makeRegExp } from 'regexpert';
import { LocalSokiAuth } from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { smylib } from 'shared/utils';
import { switchCRUDAccesRightValue } from 'shared/utils/index/utils';
import {
  accessRightTitlesFileStore,
  appVersionFileStore,
  indexStameskaIconsFileStore,
  indexUserLoginBindsFileStorage,
  nounsFileStore,
  pronounsFileStore,
  userAccessRightsAndRolesFileStore,
  valuesFileStore,
} from '../file-stores';
import { indexTakeRootLoginRecursively } from '../lib/takeRootLoginRecursively';
import { schGeneralTsjrpcBaseServer } from '../schedules/base-tsjrpc/general.tsjrpc.base';
import { indexServerTsjrpcShareMethods } from '../tsjrpc.methods';
import { emailCodesDto } from './const/emailCodesDto';
import { indexTSJRPCBaseGetIconExistsPacks } from './lib/getIconExistsPacks';
import { indexAuthByTgUser } from './lib/makeAuthFromUser';
import { makeUserAccessRights } from './lib/makeUserAccessRights';
import { indexTSJRPCBaseRequestFreshes } from './lib/requestFreshes';
import { indexTSJRPCBaseUpdateUserAccessRight } from './lib/updateUserAccessRight';

const deviceIdPostfixSymbols = '!@#$%^&*;.,?/|\\+=-'.split('');

appVersionFileStore.watchFile(value => {
  tglogger.log(`Version upgrade: ${value.num}`);

  const command = 'chmod +x /var/www/jesmyl.ru/assets/';

  setTimeout(() => {
    tglogger.log(`${command} start`);

    exec(command, (error, stdout, stderr) => {
      tglogger[error ? 'error' : 'log'](`${command}\n\n${JSON.stringify({ error, stdout, stderr }, null, ' ')}`);
    });
  }, 2000);
});

export const indexServerTsjrpcBase = new (class Index extends TsjrpcBaseServer<IndexTsjrpcModel> {
  constructor() {
    super({
      scope: 'Index',
      beforeEachTools: {
        getIndexValues: { minVersion: 0 },
        getFreshAppVersion: { minVersion: 0 },
        getDeviceId: { minVersion: 0 },
      },
      methods: {
        requestFreshes: indexTSJRPCBaseRequestFreshes,
        getIconExistsPacks: indexTSJRPCBaseGetIconExistsPacks,
        updateUserAccessRight: indexTSJRPCBaseUpdateUserAccessRight,

        updateUserAccessRole: async ({ login, role }, { auth }) => {
          if (auth?.login == null) throw 'Не авторизован 56552391123';
          if (auth.login === login) throw 'Нельзя поменять роль себе же';

          const { rights, roles } = userAccessRightsAndRolesFileStore.getValue();
          const authUserRole = rights[auth.login]?.info.role;

          if (authUserRole == null || authUserRole !== 'TOP') throw 'Нет прав на это действие 55412304234670';

          rights[login] ??= { info: { fio: 'unknown 1523612', m: 0 } };
          rights[login].info.role = role ?? undefined;
          rights[login].info.m = Date.now();

          userAccessRightsAndRolesFileStore.saveValue();
          indexServerTsjrpcShareMethods.refreshAccessRights(
            {
              rights: makeUserAccessRights(login),
              lastModifiedAt: rights[login].info.m,
            },
            { login },
          );

          return { value: { rights, roles } };
        },

        addNewAccessRole: async ({ role }) => {
          const { roles, rights } = userAccessRightsAndRolesFileStore.getValue();
          if (roles[role] !== undefined) throw 'Такая роль уже существует';

          roles[role] = { info: { m: Date.now() } };

          userAccessRightsAndRolesFileStore.saveValue();

          return { value: { roles, rights } };
        },

        updateRoleAccessRight: async ({ operation, rule, scope, role }, { auth }) => {
          if (auth?.login == null) throw 'Не авторизован 77237192';

          const { rights, roles } = userAccessRightsAndRolesFileStore.getValue();
          const authUserRole = rights[auth.login]?.info.role;

          if (authUserRole == null || authUserRole !== 'TOP') throw 'Нет прав на это действие 068234765';

          roles[role] ??= { info: { m: 0 } };
          roles[role][scope] ??= {};
          const lastModifiedAt = (roles[role].info.m = Date.now());

          roles[role][scope][rule] = switchCRUDAccesRightValue(roles[role][scope][rule] ?? 0, operation);

          if (!roles[role][scope][rule]) delete roles[role][scope][rule];
          if (!smylib.keys(roles[role][scope]).length) delete roles[role][scope];

          userAccessRightsAndRolesFileStore.saveValue();

          indexServerTsjrpcShareMethods.refreshAccessRights({ rights: {}, lastModifiedAt: 0 }, (_, auth, client) => {
            if (auth?.login != null && rights[auth.login]?.info.role === role) {
              indexServerTsjrpcShareMethods.refreshAccessRights(
                {
                  rights: makeUserAccessRights(auth.login),
                  lastModifiedAt,
                },
                client,
              );
            }

            return false;
          });

          return { value: { rights, roles } };
        },

        getDeviceId: async () => {
          const deviceId =
            makeTwiceKnownName().replace(makeRegExp('/ /g'), '_') +
            '_' +
            Array(5)
              .fill(0)
              .map(() => smylib.randomItem(deviceIdPostfixSymbols))
              .join('');

          return {
            value: deviceId as never,
            description: `Запрос DeviceId - ${deviceId}`,
          };
        },

        authMeByTelegramNativeButton: indexAuthByTgUser('через TG-auth-native кнопку'),
        authMeByTelegramMiniButton: indexAuthByTgUser('через TG-mini-icon кнопку'),
        authMeByTelegramInScheduleDay: indexAuthByTgUser('в расписании дня'),

        authMeByTelegramBotNumber: async ({ secretNumber }, tool) => {
          const user = supportTelegramAuthorizations[secretNumber]?.().from;

          if (user == null) throw 'Не верный код авторизации';

          return await indexAuthByTgUser('через TG-код')({ user }, tool);
        },

        getFreshAppVersion: async () => ({ value: appVersionFileStore.getValue().num }),
        getIndexValues: async () => ({ value: valuesFileStore.getValue() }),

        getAccessRightTitles: async () => ({ value: accessRightTitlesFileStore.getValue() }),
        getUserAccessRightsAndRoles: async () => ({ value: userAccessRightsAndRolesFileStore.getValue() }),
        getIconPack: async ({ icon }) => ({ value: { pack: indexStameskaIconsFileStore.getValue()[icon] } }),

        getNounPron: args => {
          const allNouns = smylib.keys(nounsFileStore.getValue().words);
          const allProns = smylib.keys(pronounsFileStore.getValue().words);
          const e$e: Record<string, string> = { е: '[её]', ё: '[её]', Е: '[её]', Ё: '[её]' };
          let nouns: string[] | und = undefined;
          let prons: string[] | und = undefined;

          if (args.noun && args.noun.length > 2) {
            const reg = makeRegExp(
              `/${args.noun
                .split('')
                .map(letter => e$e[letter] ?? escapeRegExpSymbols(letter))
                .join('.*?')}/i`,
            );
            nouns = allNouns
              .filter(key => key.match(reg))
              .sort((a, b) => a.length - b.length || a.localeCompare(b))
              .slice(0, 10)
              .map(word => word.toUpperCase());
          }

          if (args.pron && args.pron.length > 2) {
            const reg = makeRegExp(
              `/${args.pron
                .split('')
                .map(letter => e$e[letter] ?? escapeRegExpSymbols(letter))
                .join('.*?')}/i`,
            );
            prons = allProns
              .filter(key => key.match(reg))
              .sort((a, b) => a.length - b.length || a.localeCompare(b))
              .slice(0, 10)
              .map(word => word.toUpperCase());
          }

          return { value: { nouns, prons, result: makeTwiceKnownName(' ', args.pron, args.noun, false) } };
        },

        writeNounPron: ({ noun, pron, level }) => {
          if (noun) {
            const { words } = nounsFileStore.getValue();
            delete words[''];
            words[noun] = level || 1;
            words[''] = 0;

            nounsFileStore.saveValue();
          }
          if (pron) {
            if (!pron.endsWith('й') && !pron.endsWith('йся')) throw 'Прилагательное должно заканчиваться на й или йся';

            const { words } = pronounsFileStore.getValue();
            delete words[''];
            words[pron] = level || 1;
            words[''] = 0;

            pronounsFileStore.saveValue();
          }
        },

        sendEmailOTP: async ({ email }, { auth }) => {
          const otp = smylib.randomOf(12345, 98765);
          const expireMinutes = 3;

          const expire = () => {
            clearTimeout(timeout);
            delete emailCodesDto[otp];
          };
          const timeout = setTimeout(expire, smylib.howMs.inMin * expireMinutes);

          emailCodesDto[otp] = {
            auth: makeAuthFromEmail(email, auth),
            expire,
            email,
          };

          await sendEmailMessage({
            to: email,
            subject: 'Код авторизации',
            text: `${otp} | ${expireMinutes} минуты`,
          });

          return { value: { email } };
        },

        bindEmailByOTP: ({ otp }, { auth }) => {
          if (auth == null) throw 'Не авторизован';
          const from = emailCodesDto[otp];

          if (from == null) throw 'Не верный код';
          if (from.auth?.login == null) throw 'Ошибка привязки - неизвестный профиль';
          if (from.auth.login !== auth.login) throw 'Ошибка привязки - другой аккаунт';
          if (!from.auth.email) throw 'Ошибка привязки - не E-mail';

          const binds = indexUserLoginBindsFileStorage.getValue();
          const newLogin = makeLoginFromEmail(from.auth.email);

          if (binds[newLogin] != null)
            throw `E-mail уже привязан к ${(smylib.isStr(binds[newLogin]) ? binds[newLogin] : binds[newLogin].login) === auth.login ? 'вашему' : 'другому'} аккаунту`;

          binds[from.auth.login] ??= { ...from.auth, login: undefined as never };
          binds[newLogin] = from.auth.login;

          indexUserLoginBindsFileStorage.saveValue();
          from.expire();

          return { value: { fioOrNick: from.auth.fio ?? from.auth.nick ?? '???' } };
        },

        authByEmailOTP: ({ otp }) => {
          const from = emailCodesDto[otp];

          if (from == null) throw 'Не верный код';

          const emailAuth = makeAuthFromEmail(from.email, from.auth);
          const binds = indexUserLoginBindsFileStorage.getValue();
          const rootLogin = indexTakeRootLoginRecursively(makeLoginFromEmail(from.email));
          const rootAuth = smylib.isObj(binds[rootLogin]) ? binds[rootLogin] : null;
          const emailNick = from.email.split('@')[0];
          const auth: LocalSokiAuth = {
            ...rootAuth,
            ...emailAuth,
            login: rootLogin,
            email: from.email,
            nick: rootAuth?.nick || emailNick,
            fio: rootAuth?.fio || emailNick,
          };

          return {
            value: {
              auth,
              token: jwt.sign(auth, tokenSecretFileStore.getValue().token, { expiresIn: '100 D' }),
            },
          };
        },
      },
    });
  }
})();

schGeneralTsjrpcBaseServer.$$register();
