import { useLiveQuery } from 'dexie-react-hooks';
import { authIDB } from 'front/components/index/db/auth-idb';
import { CmComWid } from '../../../../shared/api/complect/apps/cm/complect/enums';
import { cmIDB } from './_db/cm-idb';
import { cmUserStoreSokiInvocatorClient } from './invocators/user-store-invocator.methods';

export const useComComment = (comw: CmComWid) => useLiveQuery(() => cmIDB.db.comComments.get(comw), [comw])?.comment;

let trySend = async (comw: CmComWid, comment: string, setIsLoading?: (is: boolean) => void) => {
  const auth = await authIDB.get.auth();
  if (auth?.login == null) {
    trySend = () => Promise.resolve();
    return;
  } else {
    trySend = async (comw: CmComWid, comment: string, setIsLoading?: (is: boolean) => void) => {
      setIsLoading?.(true);
      const prevComment = (await cmIDB.db.comComments.get(comw))?.comment;

      if (prevComment === comment) return;

      clearTimeout(updateComCommentTimeOut[comw]);
      updateComCommentTimeOut[comw] = setTimeout(async () => {
        await cmUserStoreSokiInvocatorClient.setComComment(null, comw, comment);
        setIsLoading?.(false);
      }, 1000);
    };

    trySend(comw, comment, setIsLoading);
  }
};

let updateComCommentTimeOut = {} as Record<CmComWid, TimeOut>;
export const updateComComment = async (comw: CmComWid, comment: string, setIsLoading?: (is: boolean) => void) => {
  await trySend(comw, comment, setIsLoading);

  await cmIDB.db.comComments.put({ comw, comment });
};
