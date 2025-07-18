import { makeTwiceKnownName } from 'back/complect/makeTwiceKnownName';
import { tokenSecretFileStore } from 'back/complect/soki/file-stores';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { supportTelegramAuthorizations } from 'back/sides/telegram-bot/prod/authorize';
import { prodTelegramBot } from 'back/sides/telegram-bot/prod/prod-bot';
import { supportTelegramBot } from 'back/sides/telegram-bot/support/support-bot';
import { JesmylTelegramBot } from 'back/sides/telegram-bot/tg-bot';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
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
import { IndexSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';
import { itNNull, smylib } from 'shared/utils';
import { appVersionFileStore, valuesFileStore } from './file-stores';
import { schGeneralSokiInvocatorBaseServer } from './schedules/base-invocators/general-invocators.base';
import { schedulesFileStore } from './schedules/file-stores';
import { schServerInvocatorShareMethods } from './schedules/invocators.shares';

const deviceIdPostfixSymbols = '!@#$%^&*;.,?/|\\+=-'.split('');

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

export const indexServerInvocatorBase = new (class Index extends SokiInvocatorBaseServer<IndexSokiInvocatorModel> {
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
        requestFreshes: async ({ lastModfiedAt }, { client, auth }) => {
          const isNoAuth = auth == null;
          const someScheduleUser = (user: IScheduleWidgetUser) => user.login === auth!.login;

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

          if (schedules.length) schServerInvocatorShareMethods.refreshSchedules({ schs: schedules }, client);
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
      },
    });
  }
})();

schGeneralSokiInvocatorBaseServer.$$register();
