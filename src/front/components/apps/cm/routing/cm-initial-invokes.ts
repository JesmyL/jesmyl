import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { cmTsjrpcClient } from '$cm/tsjrpc/basic.tsjrpc.methods';
import { cmShareTsjrpcBaseClient } from '$cm/tsjrpc/tsjrpc.shares.base';
import { soki } from 'front/soki';

export const cmInitialInvokes = () => {
  cmShareTsjrpcBaseClient.$$register();

  const getFreshes = async () => {
    const lastModfiedAt = await cmIDB.get.lastModifiedAt();
    await cmTsjrpcClient.requestFreshes({ lastModfiedAt });
  };

  soki.onBeforeAuthorizeEvent.listen(() => cmIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
