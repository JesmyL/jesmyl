import { cmIDB } from '$cm/basis/lib/store/cmIDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { CmComWid } from 'shared/api';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';

let isWasOpenComWithBibleAddressInComment = false;

export const useCheckIsComCommentIncludesBibleAddress = (com: Com | und) => {
  const comw = com?.wid ?? CmComWid.def;
  const localCommentBlock = useLiveQuery(() => cmIDB.tb.localComCommentBlocks.get(comw), [comw]);
  const commentBlock = useLiveQuery(() => cmIDB.tb.comCommentBlocks.get(comw), [comw]);

  if (isWasOpenComWithBibleAddressInComment) return true;
  const comment = (localCommentBlock?.d.head || commentBlock?.d.head)?.join('\n') || '';

  isWasOpenComWithBibleAddressInComment = !!(
    com && comment?.match(ComBlockCommentMakerCleans.firstCommentBibleAddressRegExp.regExp)
  );

  return isWasOpenComWithBibleAddressInComment;
};
