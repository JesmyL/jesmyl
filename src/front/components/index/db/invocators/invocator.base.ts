import { schSokiInvocatorBaseClient } from '#widgets/schedule/invocators/invocator.base';
import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { IndexSokiInvocatorSharesModel } from 'shared/api/invocators/index/invocators.shares.model';
import { indexIDB } from '../index-idb';

class IndexSokiInvocatorBaseClient extends SokiInvocatorBaseClient<IndexSokiInvocatorSharesModel> {}
export const indexSokiInvocatorBaseClient = new IndexSokiInvocatorBaseClient('IndexSokiInvocatorBaseClient', {
  appVersion: () => async appVersion => indexIDB.set.appVersion(appVersion),
  indexValues: () => async value => indexIDB.set.values(value),
});

schSokiInvocatorBaseClient.$$register();
