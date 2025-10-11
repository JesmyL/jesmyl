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
  indexStameskaIconsFileStore,
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
        getIndexValues: { minVersion: 0 },
        getFreshAppVersion: { minVersion: 0 },
        getDeviceId: { minVersion: 0 },
      },
      methods: {
        requestFreshes: indexTSJRPCBaseRequestFreshes,
        getIconExistsPacks: indexTSJRPCBaseGetIconExistsPacks,
        updateUserAccessRight: indexTSJRPCBaseUpdateUserAccessRight,

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

        authMeByTelegramBotNumber: async ({ secretNumber }) => {
          const user = supportTelegramAuthorizations[secretNumber]?.().from;

          if (user == null) throw 'Не верный код авторизации';

          return await indexAuthByTgUser('через TG-код')({ user });
        },

        getFreshAppVersion: async () => ({ value: appVersionFileStore.getValue().num }),
        getIndexValues: async () => ({ value: valuesFileStore.getValue() }),

        getAccessRightTitles: async () => ({ value: accessRightTitlesFileStore.getValue() }),
        getUserAccessRights: async () => ({ value: userAccessRightsFileStore.getValue() }),
        getIconPack: async ({ icon }) => ({ value: { pack: indexStameskaIconsFileStore.getValue()[icon] } }),
      },
    });
  }
})();

schGeneralTsjrpcBaseServer.$$register();
