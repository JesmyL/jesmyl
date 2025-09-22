import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { supportTelegramAuthorizations } from 'back/sides/telegram-bot/prod/authorize';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { exec } from 'child_process';
import { makeRegExp } from 'regexpert';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { smylib } from 'shared/utils';
import {
  accessRightTitlesFileStore,
  appVersionFileStore,
  userAccessRightsFileStore,
  valuesFileStore,
} from '../file-stores';
import { schGeneralTsjrpcBaseServer } from '../schedules/base-tsjrpc/general.tsjrpc.base';
import { indexTSJRPCBaseGetIconExistsPacks } from './lib/getIconExistsPacks';
import { indexAuthByTgUser } from './lib/makeAuthFromUser';
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
        getIndexValues: { minLevel: 0, minVersion: 0 },
        getFreshAppVersion: { minLevel: 0, minVersion: 0 },
        authMeByTelegramBotNumber: { minLevel: 0 },
        authMeByTelegramInScheduleDay: { minLevel: 0 },
        authMeByTelegramMiniButton: { minLevel: 0 },
        authMeByTelegramNativeButton: { minLevel: 0 },
        getDeviceId: { minLevel: 0, minVersion: 0 },
        requestFreshes: { minLevel: 0 },
      },
      methods: {
        requestFreshes: indexTSJRPCBaseRequestFreshes,
        getIconExistsPacks: indexTSJRPCBaseGetIconExistsPacks,
        updateUserAccessRight: indexTSJRPCBaseUpdateUserAccessRight,

        getDeviceId: async () => {
          return (makeTwiceKnownName().replace(makeRegExp('/ /g'), '_') +
            '_' +
            Array(5)
              .fill(0)
              .map(() => smylib.randomItem(deviceIdPostfixSymbols))
              .join('')) as never;
        },

        authMeByTelegramNativeButton: indexAuthByTgUser,
        authMeByTelegramMiniButton: indexAuthByTgUser,
        authMeByTelegramInScheduleDay: indexAuthByTgUser,

        authMeByTelegramBotNumber: async ({ secretNumber }) => {
          const user = supportTelegramAuthorizations[secretNumber]?.().from;

          if (user == null) throw 'Не верный код';
          return indexAuthByTgUser({ user });
        },

        getFreshAppVersion: async () => appVersionFileStore.getValue().num,
        getIndexValues: async () => valuesFileStore.getValue(),

        getAccessRightTitles: async () => accessRightTitlesFileStore.getValue(),
        getUserAccessRights: async () => userAccessRightsFileStore.getValue(),
      },
      onEachFeedback: {
        authMeByTelegramBotNumber: (_, { auth }) =>
          `Авторизация ${auth.fio} (@${auth.nick ?? '??'}) через TG-код\n\n<blockquote expandable>` +
          `${JSON.stringify(auth, null, 1)}</blockquote>`,

        authMeByTelegramNativeButton: (_, { auth }) =>
          `Авторизация ${auth.fio} (@${auth.nick ?? '??'}) через TG-auth-native кнопку\n\n` +
          `<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>`,

        authMeByTelegramMiniButton: (_, { auth }) =>
          `Авторизация ${auth.fio} (@${auth.nick ?? '??'}) через TG-mini-icon кнопку\n\n` +
          `<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>`,

        authMeByTelegramInScheduleDay: (_, { auth }) =>
          `Авторизация ${auth.fio} (@${auth.nick ?? '??'}) в расписании дня\n\n` +
          `<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>`,

        getDeviceId: (_, deviceId) => `Запрос DeviceId - ${deviceId}`,

        requestFreshes: null,
        getFreshAppVersion: null,
        getIndexValues: null,
        getAccessRightTitles: null,
        getUserAccessRights: null,
        updateUserAccessRight: null,
        getIconExistsPacks: null,
      },
    });
  }
})();

schGeneralTsjrpcBaseServer.$$register();
