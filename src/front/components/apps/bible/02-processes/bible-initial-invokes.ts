import { bibleIDB, bibleTranslatesIDB } from '$bible/basis/lib/bibleIDB';
import { soki } from 'front/soki';
import { bibleSokiInvocatorBaseClient, bibleSokiInvocatorClient } from './invocator';

export const bibleInitialInvokes = () => {
  bibleSokiInvocatorBaseClient.$$register();

  const getFreshes = async () => {
    const lastModifiedAt = await bibleTranslatesIDB.get.lastModifiedAt();
    const myTranslates = await bibleIDB.get.myTranslates();

    bibleSokiInvocatorClient.requestFreshes({ lastModifiedAt, myTranslates });
  };

  soki.onBeforeAuthorizeEvent.listen(() => {
    bibleTranslatesIDB.remove.lastModifiedAt();
  });

  soki.listenOnConnectionOpenEvent(getFreshes);
  soki.onAuthorizeEvent.listen(getFreshes);
};
