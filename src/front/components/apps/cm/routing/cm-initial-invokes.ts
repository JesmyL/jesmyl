import { cmIDB } from '$cm/basis/lib/cmIDB';
import { onLocalComCommentsSendEvent } from '$cm/com-comments-manager';
import { cmFreshesSokiInvocatorClient } from '$cm/invocators/fresh-invocator.methods';
import { cmSokiInvocatorBaseClient } from '$cm/invocators/invocator.shares.base';
import { soki } from 'front/soki';

export const cmInitialInvokes = () => {
  cmSokiInvocatorBaseClient.$$register();

  const getFreshes = async () => {
    const lastModified = await cmIDB.get.lastModifiedAt();
    await cmFreshesSokiInvocatorClient.requestFreshes(null, lastModified);

    onLocalComCommentsSendEvent.invoke();
  };

  soki.onBeforeAuthorizeEvent.listen(() => cmIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
