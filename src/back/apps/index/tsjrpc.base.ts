import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { supportTelegramAuthorizations } from 'back/sides/telegram-bot/prod/authorize';
import { prodTelegramBot } from 'back/sides/telegram-bot/prod/prod-bot';
import { supportTelegramBot } from 'back/sides/telegram-bot/support/support-bot';
import { JesmylTelegramBot } from 'back/sides/telegram-bot/tg-bot';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { exec } from 'child_process';
import jwt from 'jsonwebtoken';
import TelegramBot from 'node-telegram-bot-api';
import { makeRegExp } from 'regexpert';
import {
  IScheduleWidget,
  IScheduleWidgetUser,
  LocalSokiAuth,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  TelegramNativeAuthUserData,
} from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { itIt, itNNil, itNNull, smylib } from 'shared/utils';
import { updateCRUDAccesRightValue } from 'shared/utils/index/utils';
import { knownStameskaIconNames, knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { StameskaIconName, stameskaIconPack } from 'stameska-icon/pack';
import { StameskaIconKind, StameskaIconPack } from 'stameska-icon/utils';
import {
  accessRightTitlesFileStore,
  appVersionFileStore,
  userAccessRightsFileStore,
  valuesFileStore,
} from './file-stores';
import { schGeneralTsjrpcBaseServer } from './schedules/base-tsjrpc/general.tsjrpc.base';
import { schedulesFileStore } from './schedules/file-stores';
import { schServerTsjrpcShareMethods } from './schedules/tsjrpc.shares';
import { indexServerTsjrpcShareMethods } from './tsjrpc.methods';

const deviceIdPostfixSymbols = '!@#$%^&*;.,?/|\\+=-'.split('');

const stameskaKindPostfixReplaceRegExp = makeRegExp(
  `/(${smylib
    .keys({
      BulkRounded: 0,
      DuotoneRounded: 0,
      SolidRounded: 0,
      SolidSharp: 0,
      StrokeRounded: 0,
      StrokeSharp: 0,
      TwotoneRounded: 0,
    } satisfies Record<StameskaIconKind, 0>)
    .join('|')}|Icon)$/`,
);

const makeAuthFromUser = async (user: OmitOwn<TelegramBot.User, 'is_bot'>) => {
  try {
    await prodTelegramBot.tryIsUserMember(user.id);
  } catch (_error) {
    throw new Error('Не состоит в канале');
  }

  const admin = (await supportTelegramBot.getAdmins()).find(admin => admin.user.id === user.id);

  return {
    level: admin
      ? admin.status === 'creator'
        ? 100
        : 'custom_title' in admin && smylib.isStr(admin.custom_title)
          ? +admin.custom_title || 3
          : 3
      : 3,
    nick: user.username,
    tgId: user.id,
    login: JesmylTelegramBot.makeLoginFromId(user.id),
    fio: `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`,
  } satisfies LocalSokiAuth;
};

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

const authByTgUser = async ({ user }: { user: TelegramNativeAuthUserData }) => {
  const auth = await makeAuthFromUser(user);
  return { token: jwt.sign(auth, tokenSecretFileStore.getValue().token, { expiresIn: '100 D' }), auth };
};
const iconSearchCache: Record<string, StameskaIconPack[]> = {};

export const indexServerTsjrpcBase = new (class Index extends TsjrpcBaseServer<IndexTsjrpcModel> {
  constructor() {
    const extractIcon = <Icon>(it: { icon?: Icon }) => it.icon;
    const extractAllScheduleIcons = (sch: IScheduleWidget) => {
      return [
        //
        sch.tatts.map(extractIcon),
        sch.ctrl.roles.map(extractIcon),
        sch.lists.cats.map(extractIcon),
      ];
    };

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
        requestFreshes: async (
          { lastModfiedAt, iconPacks: userIconPacks, iconsMd5Hash: userIconsMd5Hash },
          { client, auth },
        ) => {
          const isNoAuth = auth == null;
          const login = auth?.login;
          const someScheduleUser = (user: IScheduleWidgetUser) => user.login === login;
          const userRights = userAccessRightsFileStore.getValue();

          if (login != null && userRights[login] != null && userRights[login].info.m > lastModfiedAt) {
            const { info, ...rights } = userRights[login];
            indexServerTsjrpcShareMethods.refreshAccessRights({ rights });
          }

          const schedules = schedulesFileStore
            .getValue()
            .map((sch): IScheduleWidget | null => {
              const removedSch = { w: sch.w, isRemoved: 1 } as IScheduleWidget;

              if (scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public)) {
                if (sch.m <= lastModfiedAt) return null;
                return sch;
              }
              if (isNoAuth) return removedSch;
              if (!sch.ctrl.users.some(someScheduleUser)) return removedSch;

              if (sch.m <= lastModfiedAt) return null;

              return sch;
            })
            .filter(itNNull);

          const isStaticUserIconsInactual =
            !userIconPacks?.length || userIconsMd5Hash !== knownStameskaIconNamesMd5Hash;
          const isSchedulesWasUpdated = !userIconPacks?.length || !!schedules.length;

          if (isStaticUserIconsInactual || isSchedulesWasUpdated) {
            const userActualIconDict: PRecord<KnownStameskaIconName, StameskaIconPack | null> = {};
            const knownIconNamesSet = new Set(knownStameskaIconNames);

            if (isStaticUserIconsInactual) {
              userIconPacks?.forEach(iconName => {
                if (knownIconNamesSet.has(iconName)) {
                  knownIconNamesSet.delete(iconName);

                  if (userActualIconDict[iconName] === null) {
                    delete userActualIconDict[iconName];
                  }
                  return;
                }

                userActualIconDict[iconName] = null;
              });

              knownIconNamesSet.forEach(knownIconName => {
                userActualIconDict[knownIconName] = stameskaIconPack[knownIconName];
              });
            }

            if (isSchedulesWasUpdated) {
              const userIconPacksSet = new Set(userIconPacks);

              // TODO: replace on schedules
              schedulesFileStore
                .getValue()
                .map(extractAllScheduleIcons)
                .flat(2)
                .filter(itNNil)
                .forEach(iconName => {
                  if (userIconPacksSet.has(iconName)) return;
                  userActualIconDict[iconName] = stameskaIconPack[iconName];
                });
            }

            indexServerTsjrpcShareMethods.updateKnownIconPacks(
              {
                actualIconPacks: userActualIconDict,
                iconsMd5Hash: knownStameskaIconNamesMd5Hash,
              },
              // TODO: remove soon
              visit => !!visit?.version && visit?.version >= 1019,
            );
          }

          if (schedules.length) schServerTsjrpcShareMethods.refreshSchedules({ schs: schedules }, client);
        },
        getIconExistsPacks: async ({ pageSize, page, searchTerm }) => {
          let iconPacks: StameskaIconPack[] | null = null;

          if (searchTerm) {
            const nameBeats = searchTerm
              .trim()
              .replace(/.*?([^/]+$)/, '$1')
              .split(/(\d+)|\W|([A-Z][a-z]+)/)
              .filter(itIt)
              .map(name => `${name[0].toUpperCase()}${name.slice(1)}`);

            const exactIconName = nameBeats.join('').replace(stameskaKindPostfixReplaceRegExp, '') as StameskaIconName;

            if (stameskaIconPack[exactIconName] !== undefined) return { packs: [stameskaIconPack[exactIconName]] };

            iconPacks = iconSearchCache[nameBeats.sort().join('')] ??= (() => {
              const foundIconPacks: StameskaIconPack[] = [];

              smylib.keys(stameskaIconPack).forEach(iconName => {
                if (!nameBeats.some(beat => iconName.includes(beat))) return;
                foundIconPacks.push(stameskaIconPack[iconName]);
              });

              return foundIconPacks;
            })();
          }

          return {
            packs: (iconPacks ?? smylib.values(stameskaIconPack)).slice(page * pageSize, page * pageSize + pageSize),
          };
        },
        getDeviceId: async () => {
          return (makeTwiceKnownName().replace(makeRegExp('/ /g'), '_') +
            '_' +
            Array(5)
              .fill(0)
              .map(() => smylib.randomItem(deviceIdPostfixSymbols))
              .join('')) as never;
        },

        authMeByTelegramNativeButton: authByTgUser,
        authMeByTelegramMiniButton: authByTgUser,
        authMeByTelegramInScheduleDay: authByTgUser,

        authMeByTelegramBotNumber: async ({ secretNumber }) => {
          const user = supportTelegramAuthorizations[secretNumber]?.().from;

          if (user == null) throw 'Не верный код';
          return authByTgUser({ user });
        },

        getFreshAppVersion: async () => appVersionFileStore.getValue().num,
        getIndexValues: async () => valuesFileStore.getValue(),

        getAccessRightTitles: async () => accessRightTitlesFileStore.getValue(),
        getUserAccessRights: async () => userAccessRightsFileStore.getValue(),
        updateUserAccessRight: async ({ login, rule, scope, value, operation }) => {
          const rights = userAccessRightsFileStore.getValue();

          if (rights[login] == null) return null;

          rights[login][scope] ??= {};
          rights[login][scope][rule] = updateCRUDAccesRightValue(rights[login][scope][rule] ?? 0, operation, value);

          rights[login].info ??= { fio: 'unknown', m: Date.now() };
          rights[login].info.m = Date.now();

          if (!rights[login][scope][rule]) delete rights[login][scope][rule];
          if (!smylib.keys(rights[login][scope]).length) delete rights[login][scope];

          userAccessRightsFileStore.saveValue();
          const { info, ...userRights } = rights[login];
          indexServerTsjrpcShareMethods.refreshAccessRights({ rights: userRights }, { login });

          return rights;
        },
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
