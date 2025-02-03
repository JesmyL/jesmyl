import { soki } from 'front/soki';
import { bibleIDB, bibleTranslatesIDB } from '../_db/bibleIDB';
import { bibleSokiInvocatorBaseClient, bibleSokiInvocatorClient } from '../invoctors/invocator';

export const bibleInitialInvokes = () => {
  bibleSokiInvocatorBaseClient.$$register();

  soki.listenOnConnectionOpenEvent(async () => {
    const myTranslates = await bibleIDB.get.myTranslates();
    const lastModifiedAt = await bibleTranslatesIDB.get.lastModifiedAt();

    bibleSokiInvocatorClient.requestFreshes(null, lastModifiedAt, myTranslates);
  });

  soki.onAuthorizeEvent.listen(() => bibleTranslatesIDB.updateLastModifiedAt(0));
};
