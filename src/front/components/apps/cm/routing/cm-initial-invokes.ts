import { cmIDB } from '$cm/basis/lib/cmIDB';
import { onLocalComCommentsSendEvent } from '$cm/com-comments-manager';
import { cmFreshesSokiInvocatorClient } from '$cm/invocators/fresh-invocator.methods';
import { cmSokiInvocatorBaseClient } from '$cm/invocators/invocator.shares.base';
import { soki } from 'front/soki';

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
