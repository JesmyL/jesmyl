import { bibleMyTranslatesAtom } from '$bible/basis/lib/store/atoms';
import { bibleTranslatesIDB } from '$bible/basis/lib/store/bibleIDB';
import { soki } from 'front/soki';
import { bibleTsjrpcClient } from './tsjrpc';

export const bibleInitialInvokes = () => {
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
