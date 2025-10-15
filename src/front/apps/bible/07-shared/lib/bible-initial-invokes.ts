import { soki } from '#shared/soki';
import { bibleMyTranslatesAtom } from '../state/atoms';
import { bibleTranslatesIDB } from '../state/bibleIDB';
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
