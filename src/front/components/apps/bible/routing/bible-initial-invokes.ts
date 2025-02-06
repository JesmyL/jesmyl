import { soki } from 'front/soki';
import { bibleIDB, bibleTranslatesIDB } from '../_db/bibleIDB';
import { bibleSokiInvocatorBaseClient, bibleSokiInvocatorClient } from '../invoctors/invocator';

export const bibleInitialInvokes = () => {
  bibleSokiInvocatorBaseClient.$$register();

  const getFreshes = async (lastModifiedAt: number) => {
    const myTranslates = await bibleIDB.get.myTranslates();

    bibleSokiInvocatorClient.requestFreshes(null, lastModifiedAt, myTranslates);
  };

  soki.listenOnConnectionOpenEvent(async () => {
    const lastModifiedAt = await bibleTranslatesIDB.get.lastModifiedAt();
    await getFreshes(lastModifiedAt);
  });

  soki.onAuthorizeEvent.listen(async () => {
    await bibleTranslatesIDB.updateLastModifiedAt(0);
    await getFreshes(0);
  });
};
