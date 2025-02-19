import { schSokiInvocatorBaseClient } from 'front/complect/schedule-widget/invocators/invocator.base';
import { indexIDB } from 'front/components/index/db/index-idb';
import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { IndexSokiInvocatorSharesModel } from 'shared/api/invocators/index/invocators.shares.model';

class IndexSokiInvocatorBaseClient extends SokiInvocatorBaseClient<IndexSokiInvocatorSharesModel> {}
export const indexSokiInvocatorBaseClient = new IndexSokiInvocatorBaseClient('IndexSokiInvocatorBaseClient', {
  appVersion: () => async appVersion => indexIDB.set.appVersion(appVersion),
  indexValues: () => async value => indexIDB.set.values(value),
});

schSokiInvocatorBaseClient.$$register();
