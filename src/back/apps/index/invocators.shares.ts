import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { IndexSokiInvocatorSharesMethods } from 'shared/api/invocators/index/invocators.shares.model';

class IndexSokiInvocatorServer extends SokiInvocatorServer<IndexSokiInvocatorSharesMethods> {
  constructor() {
    super('IndexSokiInvocatorServer', {
      statisticData: true,
    });
  }
}
export const indexServerInvocatorShareMethods = new IndexSokiInvocatorServer();
