import { cmIDB } from '@cm/shared/lib/cmIdb';
import { soki } from 'front/soki';
import { onLocalComCommentsSendEvent } from '../com-comments-manager';
import { cmFreshesSokiInvocatorClient } from '../invocators/fresh-invocator.methods';
import { cmSokiInvocatorBaseClient } from '../invocators/invocator.shares.base';

export const cmInitialInvokes = () => {
  cmSokiInvocatorBaseClient.$$register();

  const getFreshes = async (lastModified: number) => {
    await cmFreshesSokiInvocatorClient.requestFreshes(null, lastModified);

    onLocalComCommentsSendEvent.invoke();
  };

  soki.listenOnConnectionOpenEvent(async () => {
    const lastModified = await cmIDB.get.lastModifiedAt();
    getFreshes(lastModified);
  });

  soki.onAuthorizeEvent.listen(async () => {
    await cmIDB.updateLastModifiedAt(0);
    await getFreshes(0);
  });
};
