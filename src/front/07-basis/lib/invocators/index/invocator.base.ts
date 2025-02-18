import { indexIDB } from '#basis/lib/idb/index/index';
import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { IndexSokiInvocatorSharesModel } from 'shared/api/invocators/index/invocators.shares.model';
import { schSokiInvocatorBaseClient } from '../schedules/invocator.base';

class IndexSokiInvocatorBaseClient extends SokiInvocatorBaseClient<IndexSokiInvocatorSharesModel> {}
export const indexSokiInvocatorBaseClient = new IndexSokiInvocatorBaseClient('IndexSokiInvocatorBaseClient', {
  appVersion: () => async appVersion => indexIDB.set.appVersion(appVersion),
  indexValues: () => async value => indexIDB.set.values(value),
});

schSokiInvocatorBaseClient.$$register();
