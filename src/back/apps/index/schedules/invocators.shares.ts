import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { SchSokiInvocatorSharesModel } from 'shared/api/invocators/schedules/invocators.shares.model';

export const schServerInvocatorShareMethods = new (class Sch extends SokiInvocatorServer<SchSokiInvocatorSharesModel> {
  constructor() {
    super({
      scope: 'Sch',
      methods: {
        editedSchedule: true,
        refreshSchedules: true,
      },
    });
  }
})();
