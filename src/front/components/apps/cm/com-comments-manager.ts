import { authIDB } from '$index/db/auth-idb';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid } from 'shared/api';
import { Eventer } from 'shared/utils';
import { cmIDB } from './07-basis/lib/cmIDB';
import { cmFreshesSokiInvocatorClient } from './invocators/fresh-invocator.methods';
import { cmUserStoreSokiInvocatorClient } from './invocators/user-store-invocator.methods';

export const useComCommentText = (comw: CmComWid) =>
  useLiveQuery(() => cmIDB.tb.comComments.get(comw), [comw])?.comment;
export const useComComment = (comw: CmComWid) => useLiveQuery(() => cmIDB.tb.comComments.get(comw), [comw]);

export const onLocalComCommentsSendEvent = Eventer.createValue();

onLocalComCommentsSendEvent.listen(async () => {
  const localComments = await cmIDB.tb.comComments.where({ isSavedLocal: 1 }).toArray();

  if (!localComments.length) return;

  const freshComments = await cmFreshesSokiInvocatorClient.exchangeFreshComComments(
    null,
    localComments.map(comment => ({ ...comment, isSavedLocal: undefined })),
    Date.now(),
  );

  cmIDB.tb.comComments.bulkPut(freshComments);
});

const sendLocalComments = async () => {
  window.removeEventListener('online', sendLocalComments);
  onLocalComCommentsSendEvent.invoke();
};

let trySend = async (comw: CmComWid, comment: string, setIsLoading: (is: boolean) => void) => {
  const auth = await authIDB.get.auth();
  if (auth?.login == null) {
    trySend = () => Promise.resolve();
    return;
  } else {
    trySend = async (comw, comment, setIsLoading) => {
      const prevComment = (await cmIDB.tb.comComments.get(comw))?.comment;

      if (prevComment === comment) return;

      const onCantSend = async () => {
        setIsLoading(false);
        await cmIDB.tb.comComments.put({ isSavedLocal: 1, m: Date.now(), comment, comw });

        window.removeEventListener('online', sendLocalComments);
        window.addEventListener('online', sendLocalComments);
      };

      if (!navigator.onLine) {
        await onCantSend();
        throw new Error('#offline');
      }

      setIsLoading(true);

      clearTimeout(updateComCommentTimeOut[comw]);
      updateComCommentTimeOut[comw] = setTimeout(async () => {
        const timeOut = setTimeout(onCantSend, 5000);
        await cmUserStoreSokiInvocatorClient.setComComment(null, comw, comment);
        clearTimeout(timeOut);
        setIsLoading(false);
      }, 1000);
    };

    await trySend(comw, comment, setIsLoading);
  }
};

const updateComCommentTimeOut = {} as Record<CmComWid, TimeOut>;
export const updateComComment = async (comw: CmComWid, comment: string, setIsLoading: (is: boolean) => void) => {
  try {
    await trySend(comw, comment, setIsLoading);
    await cmIDB.tb.comComments.put({ comment, comw });
  } catch (_error) {
    //
  }
};
