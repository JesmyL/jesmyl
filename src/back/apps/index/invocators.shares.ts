import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { IndexSokiInvocatorSharesModel } from 'shared/api/invocators/index/invocators.shares.model';

class IndexSokiInvocatorServer extends SokiInvocatorServer<IndexSokiInvocatorSharesModel> {}
export const indexServerInvocatorShareMethods = new IndexSokiInvocatorServer('IndexSokiInvocatorServer', {
  appVersion: true,
  indexValues: true,
});
