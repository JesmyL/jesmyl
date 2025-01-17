import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { SchSokiInvocatorSharesMethods } from 'shared/api/invocators/schedules/invocators.shares.model';

class SchSokiInvocatorServer extends SokiInvocatorServer<SchSokiInvocatorSharesMethods> {
  constructor() {
    super('SchSokiInvocatorServer', {
      editedSchedule: true,
      freshSchedules: true,
    });
  }
}
export const schServerInvocatorShareMethods = new SchSokiInvocatorServer();
