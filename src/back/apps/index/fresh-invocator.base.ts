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
  LocalSokiAuth,
  makeTwiceKnownName,
  NounPronsType,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
} from 'shared/api';
import { IndexBasicsSokiInvocatorModel } from 'shared/api/invocators/index/basics-invocators.model';
import { itNNull, smylib } from 'shared/utils';
import { indexServerInvocatorShareMethods } from './invocators.shares';
import { schedulesFileStore } from './schedules/base-invocators/file-stores';
import { schGeneralSokiInvocatorBaseServer } from './schedules/base-invocators/general-invocators.base';
import { schServerInvocatorShareMethods } from './schedules/invocators.shares';

const deviceIdPostfixSymbols = '!@#$%^&*;.,?/|\\+=-'.split('');

export const nounPronsWordsFileStore = new FileStore<NounPronsType>('/apps/index/nounPronsWords.json', {
  nouns: {},
  pronouns: {},
});

export const appVersionFileStore = new FileStore<{ num: number }>('/+version.json', { num: 0 });
export const valuesFileStore = new FileStore<IndexValues>('/values', { chatUrl: '' });

const makeAuthFromUser = async (user: OmitOwn<TelegramBot.User, 'is_bot'>) => {
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

class IndexBasicsSokiInvocatorBaseServer extends SokiInvocatorBaseServer<IndexBasicsSokiInvocatorModel> {
  constructor() {
    super('IndexBasicsSokiInvocatorBaseServer', {
      getFreshes:
        ({ client, auth }) =>
        async lastModfiedMs => {
          const isNoAuth = auth == null;
          const schedules = schedulesFileStore
            .getValue()
            .map((sch): IScheduleWidget | null => {
              const removedSch = { w: sch.w, isRemoved: 1 } as IScheduleWidget;

              if (scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public)) return sch;
              if (isNoAuth) return removedSch;
              if (!sch.ctrl.users.some(user => user.login === auth.login)) return removedSch;
              if (sch.m <= lastModfiedMs) return null;

              return sch;
            })
            .filter(itNNull);

          schServerInvocatorShareMethods.refreshSchedules(client, schedules);

          if (appVersionFileStore.fileModifiedAt() > lastModfiedMs) {
            const modifiedAt = appVersionFileStore.fileModifiedAt();
            indexServerInvocatorShareMethods.appVersion(null, appVersionFileStore.getValue().num, modifiedAt);
          }

          if (valuesFileStore.fileModifiedAt() > lastModfiedMs) {
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

      authMeByTelegramNativeButton: () => async user => {
        const auth = await makeAuthFromUser(user);
        return { token: jwt.sign(auth, tokenSecretFileStore.getValue().token), auth };
      },

      authMeByTelegramBotNumber: () => async secretNumber => {
        const user = supportTelegramAuthorizations[secretNumber]?.().from;
        if (user == null) throw new Error('code is invalid');
        const auth = await makeAuthFromUser(user);
        return { token: jwt.sign(auth, tokenSecretFileStore.getValue().token), auth };
      },
    });
  }
}
export const indexServerInvocatorBase = new IndexBasicsSokiInvocatorBaseServer();

schGeneralSokiInvocatorBaseServer.$$register();
