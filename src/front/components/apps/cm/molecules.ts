import { useLiveQuery } from 'dexie-react-hooks';
import { indexIDB } from 'front/components/index/db/index-idb';
import { CmComWid } from '../../../../shared/api/complect/apps/cm/complect/enums';
import { Molecule } from '../../../complect/atoms';
import { cmIDB } from './_db/cm-idb';
import { CmState } from './Cm.model';
import { CmEditorStoraged } from './editor/CmEditor.model';
import { cmUserStoreSokiInvocatorClient } from './invocators/user-store-invocator.methods';

export const useComComment = (comw: CmComWid) => useLiveQuery(() => cmIDB.db.comComments.get(comw), [comw])?.comment;

let trySend = async (comw: CmComWid, comment: string, setIsLoading?: (is: boolean) => void) => {
  const auth = await indexIDB.get.auth();
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

export const cmMolecule = new Molecule<CmState & CmEditorStoraged>(
  {
    meetings: { contexts: [] },

    // editor
    rules: [],
  },
  'cm',
);

export const cmMeetingsAtom = cmMolecule.select(s => s.meetings);
