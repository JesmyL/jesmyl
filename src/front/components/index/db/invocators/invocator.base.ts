import { schSokiInvocatorBaseClient } from 'front/complect/schedule-widget/invocators/invocator.base';
import { statisticAtom } from 'front/components/index/atoms';
import { indexIDB } from 'front/components/index/db/index-idb';
import { SokiInvocatorBaseClient } from 'front/SokiInvocatorBase.client';
import { IndexSokiInvocatorSharesMethods } from 'shared/api/invocators/index/invocators.shares.model';

let lastModifiedLocal: null | number = null;
export const setLastModifiedValue = async (lastModified: number) => {
  lastModifiedLocal ??= await indexIDB.getSingleValue('lastModified', 0);

  if (lastModifiedLocal >= lastModified) return;
  lastModifiedLocal = lastModified;

  indexIDB.setSingleValue('lastModified', lastModified);
};

class IndexSokiInvocatorBaseClient extends SokiInvocatorBaseClient<IndexSokiInvocatorSharesMethods> {}
export const indexSokiInvocatorBaseClient = new IndexSokiInvocatorBaseClient('IndexSokiInvocatorBaseClient', {
  statisticData: () => async statistic => statisticAtom.set(statistic),
});

schSokiInvocatorBaseClient.$$register();
