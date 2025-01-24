import { FileStore } from 'back/complect/FileStorage';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IndexValues, IScheduleWidget, makeTwiceKnownName, NounPronsType } from 'shared/api';
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

              if (isNoAuth) return removedSch;
              if (!sch.ctrl.users.some(user => user.login === auth.login)) return removedSch;
              if (sch.m <= lastModfiedMs) return null;

              return sch;
            })
            .filter(itNNull);

          schServerInvocatorShareMethods.freshSchedules(client, schedules);

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
    });
  }
}
export const indexServerInvocatorBase = new IndexBasicsSokiInvocatorBaseServer();

schGeneralSokiInvocatorBaseServer.$$register();
