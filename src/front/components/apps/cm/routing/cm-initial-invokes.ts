import { soki } from 'front/soki';
import { cmIDB } from '../_db/cm-idb';
import { onLocalComCommentsSendEvent } from '../com-comments-manager';
import { cmFreshesSokiInvocatorClient } from '../invocators/fresh-invocator.methods';
import { cmSokiInvocatorBaseClient } from '../invocators/invocator.shares.base';

export const cmInitialInvokes = () => {
  cmSokiInvocatorBaseClient.$$register();

  soki.listenOnConnectionOpenEvent(async () => {
    const lastModified = await cmIDB.get.lastModifiedAt();
    await cmFreshesSokiInvocatorClient.requestFreshes(null, lastModified);

    onLocalComCommentsSendEvent.invoke();
  });

  soki.onAuthorizeEvent.listen(() => cmIDB.updateLastModifiedAt(0));
};
