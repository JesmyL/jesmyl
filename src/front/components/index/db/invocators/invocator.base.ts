import { schSokiInvocatorBaseClient } from 'front/complect/schedule-widget/invocators/invocator.base';
import { indexIDB } from 'front/components/index/db/index-idb';
import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { IndexSokiInvocatorSharesModel } from 'shared/api/invocators/index/invocators.shares.model';

let lastModifiedLocal: null | number = null;
export const setLastModifiedValue = async (lastModified: number) => {
  lastModifiedLocal ??= await indexIDB.get.lastModified();

  if (lastModifiedLocal >= lastModified) return;
  lastModifiedLocal = lastModified;

  indexIDB.set.lastModified(lastModified);
};

class IndexSokiInvocatorBaseClient extends SokiInvocatorBaseClient<IndexSokiInvocatorSharesModel> {}
export const indexSokiInvocatorBaseClient = new IndexSokiInvocatorBaseClient('IndexSokiInvocatorBaseClient', {
  appVersion: () => async (appVersion, modifiedAt) => {
    indexIDB.set.appVersion(appVersion);
    setLastModifiedValue(modifiedAt);
  },
});

schSokiInvocatorBaseClient.$$register();
