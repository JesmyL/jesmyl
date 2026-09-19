import { soki } from '#shared/soki';
import { cmIDB } from '../state/cmIDB';
import { cmTsjrpcClient } from './basic.tsjrpc.methods';

export const cmInitialInvokes = () => {
  const getFreshes = async () => {
    const lastModfiedAt = await cmIDB.get.lastModifiedAt();
    await cmTsjrpcClient.requestFreshes({ lastModfiedAt });
  };

  soki.onBeforeAuthorizeEvent.listen(() => cmIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
