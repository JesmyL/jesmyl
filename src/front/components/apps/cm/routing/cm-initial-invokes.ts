import { cmIDB } from '$cm/basis/lib/cmIDB';
import { onLocalComCommentsSendEvent } from '$cm/com-comments-manager';
import { cmSokiInvocatorClient } from '$cm/invocators/basic-invocator.methods';
import { cmShareSokiInvocatorBaseClient } from '$cm/invocators/invocator.shares.base';
import { soki } from 'front/soki';

export const cmInitialInvokes = () => {
  cmShareSokiInvocatorBaseClient.$$register();

  const getFreshes = async () => {
    const lastModfiedAt = await cmIDB.get.lastModifiedAt();
    await cmSokiInvocatorClient.requestFreshes({ lastModfiedAt });

    onLocalComCommentsSendEvent.invoke();
  };

  soki.onBeforeAuthorizeEvent.listen(() => cmIDB.remove.lastModifiedAt());
  soki.onAuthorizeEvent.listen(getFreshes);

  soki.listenOnConnectionOpenEvent(getFreshes);
};
