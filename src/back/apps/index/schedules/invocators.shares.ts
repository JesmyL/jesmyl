import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { SchSokiInvocatorSharesModel } from 'shared/api/invocators/schedules/invocators.shares.model';

class SchSokiInvocatorServer extends SokiInvocatorServer<SchSokiInvocatorSharesModel> {
  constructor() {
    super('SchSokiInvocatorServer', {
      editedSchedule: true,
      refreshSchedules: true,
    });
  }
}
export const schServerInvocatorShareMethods = new SchSokiInvocatorServer();
