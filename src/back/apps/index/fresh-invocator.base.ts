import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IScheduleWidget } from 'shared/api';
import { IndexFreshSokiInvocatorMethods } from 'shared/api/invocators/index/fresh-invocators.model';
import { itNNull } from 'shared/utils';
import { schedulesFileStore, schSokiInvocatorBaseServer } from './schedules/invocators.base';
import { schServerInvocatorShareMethods } from './schedules/invocators.shares';

class IndexFreshSokiInvocatorBaseServer extends SokiInvocatorBaseServer<IndexFreshSokiInvocatorMethods> {
  constructor() {
    super('IndexFreshSokiInvocatorBaseServer', {
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
        },
    });
  }
}
export const indexServerInvocatorBase = new IndexFreshSokiInvocatorBaseServer();

schSokiInvocatorBaseServer.$$register();
