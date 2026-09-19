import { soki } from '#shared/soki';
import { bibleMyTranslatesAtom } from '../state/atoms';
import { bibleTBCVTranslatesIDB } from '../state/bibleIDB';
import { bibleTsjrpcClient } from './tsjrpc';

export const bibleInitialInvokes = () => {
  const getFreshes = async () => {
    const lastModifiedAt = await bibleTBCVTranslatesIDB.get.lastModifiedAt();
    const myTranslates = bibleMyTranslatesAtom.get();

    bibleTsjrpcClient.requestFreshes({ lastModifiedAt, myTranslates });
  };

  soki.onBeforeAuthorizeEvent.listen(() => {
    bibleTBCVTranslatesIDB.remove.lastModifiedAt();
  });

  soki.listenOnConnectionOpenEvent(getFreshes);
  soki.onAuthorizeEvent.listen(getFreshes);
};
