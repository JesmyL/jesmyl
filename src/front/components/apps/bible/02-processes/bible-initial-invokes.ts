import { bibleIDB, bibleTranslatesIDB } from '$bible/basis/lib/bibleIDB';
import { soki } from 'front/soki';
import { bibleTsjrpcBaseClient, bibleTsjrpcClient } from './tsjrpc';

export const bibleInitialInvokes = () => {
  bibleTsjrpcBaseClient.$$register();

  const getFreshes = async () => {
    const lastModifiedAt = await bibleTranslatesIDB.get.lastModifiedAt();
    const myTranslates = await bibleIDB.get.myTranslates();

    bibleTsjrpcClient.requestFreshes({ lastModifiedAt, myTranslates });
  };

  soki.onBeforeAuthorizeEvent.listen(() => {
    bibleTranslatesIDB.remove.lastModifiedAt();
  });

  soki.listenOnConnectionOpenEvent(getFreshes);
  soki.onAuthorizeEvent.listen(getFreshes);
};
