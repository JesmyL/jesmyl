import { FileStore } from 'back/complect/FileStore';
import { tokenSecretFileStore } from 'back/complect/soki/SokiServer';
import { supportTelegramAuthorizations } from 'back/sides/telegram-bot/prod/authorize';
import { supportTelegramBot } from 'back/sides/telegram-bot/support/support-bot';
import { JesmylTelegramBot } from 'back/sides/telegram-bot/tg-bot';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import jwt from 'jsonwebtoken';
import TelegramBot from 'node-telegram-bot-api';
import {
  IndexValues,
  IScheduleWidget,
  IScheduleWidgetUser,
  LocalSokiAuth,
  makeTwiceKnownName,
  NounPronsType,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  TelegramNativeAuthUserData,
} from 'shared/api';
import { IndexBasicsSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';
import { itNNull, smylib } from 'shared/utils';
import { indexServerInvocatorShareMethods } from './invocators.shares';
import { schGeneralSokiInvocatorBaseServer } from './schedules/base-invocators/general-invocators.base';
import { schedulesFileStore } from './schedules/file-stores';
import { schServerInvocatorShareMethods } from './schedules/invocators.shares';

const deviceIdPostfixSymbols = '!@#$%^&*;.,?/|\\+=-'.split('');

export const nounPronsWordsFileStore = new FileStore<NounPronsType>('/apps/index/nounPronsWords.json', {
  nouns: {},
  pronouns: {},
});

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', { chatUrl: '' });

const makeAuthFromUser = async (user: OmitOwn<TelegramBot.User, 'is_bot'>) => {
  try {
    await supportTelegramBot.tryIsUserMember(user.id);
  } catch (error) {
    throw new Error('Не состоит в канале');
  }

  const admin = (await supportTelegramBot.getAdmins())[user.id];

  return {
    level: admin ? (admin.status === 'creator' ? 100 : +(admin as any).custom_title) : 3,
    nick: user.username,
    tgId: user.id,
    login: JesmylTelegramBot.makeLoginFromId(user.id),
    fio: `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`,
  } satisfies LocalSokiAuth;
};

appVersionFileStore.watchFile((value, state) => {
  indexServerInvocatorShareMethods.appVersion(null, value.num, state.mtimeMs);
});

valuesFileStore.watchFile((value, state) => {
  indexServerInvocatorShareMethods.indexValues(null, value, state.mtimeMs);
});

const authByTgUser = () => async (user: TelegramNativeAuthUserData) => {
  const auth = await makeAuthFromUser(user);
  return { token: jwt.sign(auth, tokenSecretFileStore.getValue().token, { expiresIn: '100 D' }), auth };
};

class IndexBasicsSokiInvocatorBaseServer extends SokiInvocatorBaseServer<IndexBasicsSokiInvocatorModel> {
  constructor() {
    super(
      'IndexBasicsSokiInvocatorBaseServer',
      {
        requestFreshes:
          ({ client, auth }) =>
          async lastModfiedAt => {
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

            if (schedules.length) schServerInvocatorShareMethods.refreshSchedules(client, schedules);

            if (appVersionFileStore.fileModifiedAt() > lastModfiedAt) {
              const modifiedAt = appVersionFileStore.fileModifiedAt();
              indexServerInvocatorShareMethods.appVersion(null, appVersionFileStore.getValue().num, modifiedAt);
            }

            if (valuesFileStore.fileModifiedAt() > lastModfiedAt) {
              const modifiedAt = valuesFileStore.fileModifiedAt();
              indexServerInvocatorShareMethods.indexValues(null, valuesFileStore.getValue(), modifiedAt);
            }
          },
        getDeviceId: () => async () => {
          return (makeTwiceKnownName(
            smylib.randomItem(smylib.keys(nounPronsWordsFileStore.getValue().pronouns)),
            smylib.randomItem(smylib.keys(nounPronsWordsFileStore.getValue().nouns)),
          ).join('_') +
            '_' +
            Array(5)
              .fill(0)
              .map(() => smylib.randomItem(deviceIdPostfixSymbols))
              .join('')) as never;
        },

        authMeByTelegramNativeButton: authByTgUser,
        authMeByTelegramMiniButton: authByTgUser,
        authMeByTelegramInScheduleDay: authByTgUser,

        authMeByTelegramBotNumber: () => async secretNumber => {
          const user = supportTelegramAuthorizations[secretNumber]?.().from;
          if (user == null) throw new Error('code is invalid');
          return authByTgUser()(user);
        },
      },
      {
        authMeByTelegramBotNumber: ({ auth }) =>
          `Авторизация ${auth.fio} (${auth.nick ?? '??'}) через TG-код\n\n<blockquote expandable>` +
          `${JSON.stringify(auth, null, 1)}</blockquote>`,

        authMeByTelegramNativeButton: ({ auth }) =>
          `Авторизация ${auth.fio} (${auth.nick ?? '??'}) через TG-auth-native кнопку\n\n` +
          `<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>`,

        authMeByTelegramMiniButton: ({ auth }) =>
          `Авторизация ${auth.fio} (${auth.nick ?? '??'}) через TG-mini-icon кнопку\n\n` +
          `<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>`,

        authMeByTelegramInScheduleDay: ({ auth }) =>
          `Авторизация ${auth.fio} (${auth.nick ?? '??'}) в расписании дня\n\n` +
          `<blockquote expandable>${JSON.stringify(auth, null, 1)}</blockquote>`,

        getDeviceId: deviceId => `Запрос DeviceId - ${deviceId}`,
        requestFreshes: () => ``,
      },
    );
  }
}
export const indexServerInvocatorBase = new IndexBasicsSokiInvocatorBaseServer();

schGeneralSokiInvocatorBaseServer.$$register();
