import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { SchSokiInvocatorSharesModel } from 'shared/api/invocators/schedules/invocators.shares.model';

export const schServerInvocatorShareMethods =
  new (class SchSokiInvocatorServer extends SokiInvocatorServer<SchSokiInvocatorSharesModel> {
    constructor() {
      super({
        className: 'SchSokiInvocatorServer',
        methods: {
          editedSchedule: true,
          refreshSchedules: true,
        },
      });
    }
  })();
