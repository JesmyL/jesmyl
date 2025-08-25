import { bibleMyTranslatesAtom } from '$bible/basis/lib/store/atoms';
import { bibleTranslatesIDB } from '$bible/basis/lib/store/bibleIDB';
import { soki } from 'front/soki';
import { bibleTsjrpcBaseClient, bibleTsjrpcClient } from './tsjrpc';

export const bibleInitialInvokes = () => {
  bibleTsjrpcBaseClient.$$register();

  const getFreshes = async () => {
    const lastModifiedAt = await bibleTranslatesIDB.get.lastModifiedAt();
    const myTranslates = bibleMyTranslatesAtom.get();

    bibleTsjrpcClient.requestFreshes({ lastModifiedAt, myTranslates });
  };

  soki.onBeforeAuthorizeEvent.listen(() => {
    bibleTranslatesIDB.remove.lastModifiedAt();
  });

  soki.listenOnConnectionOpenEvent(getFreshes);
  soki.onAuthorizeEvent.listen(getFreshes);
};
