import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { IndexSokiInvocatorSharesModel } from 'shared/api/invocators/index/invocators.shares.model';

class IndexSokiInvocatorServer extends SokiInvocatorServer<IndexSokiInvocatorSharesModel> {
  constructor() {
    super('IndexSokiInvocatorServer', {
      appVersion: true,
    });
  }
}
export const indexServerInvocatorShareMethods = new IndexSokiInvocatorServer();
