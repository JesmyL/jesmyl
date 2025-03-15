import { bibleIDB, bibleTranslatesIDB } from '$bible/_db/bibleIDB';
import { bibleSokiInvocatorBaseClient, bibleSokiInvocatorClient } from '$bible/invoctors/invocator';
import { soki } from 'front/soki';

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
