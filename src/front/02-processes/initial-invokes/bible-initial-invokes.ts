import { bibleIDB, bibleTranslatesIDB } from '#basis/lib/idb/bible';
import { bibleSokiInvocatorBaseClient, bibleSokiInvocatorClient } from '#basis/lib/invocators/bible/invocator';
import { soki } from '#basis/lib/soki';

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
