import { soki } from '#shared/soki';
import { storagesIDB } from '../state/storagesIDB';
import { storagesTsjrpcClient } from './basic.tsjrpc.methods';
import { storagesStoresSharesTsjrpcBaseClient } from './tsjrpc.base';

export const storagesInitialInvokes = () => {
  storagesStoresSharesTsjrpcBaseClient.$$register();

  const getFreshes = async () => {
    const lastModfiedAt = await storagesIDB.get.lastModifiedAt();
    await storagesTsjrpcClient.requestFreshes({ lastModfiedAt });
  };

  soki.onBeforeAuthorizeEvent.listen(() => storagesIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
