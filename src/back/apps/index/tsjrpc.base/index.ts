import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { supportTelegramAuthorizations } from 'back/sides/telegram-bot/prod/authorize';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { exec } from 'child_process';
import { makeRegExp } from 'regexpert';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { smylib } from 'shared/utils';
import { switchCRUDAccesRightValue } from 'shared/utils/index/utils';
import {
  accessRightTitlesFileStore,
  appVersionFileStore,
  indexStameskaIconsFileStore,
  userAccessRightsAndRolesFileStore,
  valuesFileStore,
} from '../file-stores';
import { schGeneralTsjrpcBaseServer } from '../schedules/base-tsjrpc/general.tsjrpc.base';
import { indexServerTsjrpcShareMethods } from '../tsjrpc.methods';
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
      },
    });
  }
})();

schGeneralTsjrpcBaseServer.$$register();
