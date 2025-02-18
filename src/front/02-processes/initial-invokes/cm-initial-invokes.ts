import { cmIDB } from '#basis/lib/idb/cm';
import { cmFreshesSokiInvocatorClient } from '#basis/lib/invocators/cm/fresh-invocator.methods';
import { cmSokiInvocatorBaseClient } from '#basis/lib/invocators/cm/invocator.shares.base';
import { soki } from '#basis/lib/soki';
import { onLocalComCommentsSendEvent } from '../../components/apps/cm/com-comments-manager';

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
