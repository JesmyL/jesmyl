import { CmComWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { useComComment } from '../../../../com-comments-manager';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';

let isWasOpenComWithBibleAddressInComment = false;

export const useCheckIsComCommentIncludesBibleAddress = (com: Com | und) => {
  const comment = useComComment(com?.wid ?? CmComWid.def);

  if (isWasOpenComWithBibleAddressInComment) return true;

  isWasOpenComWithBibleAddressInComment = !!(
    com && comment?.match(ComBlockCommentMakerCleans.firstCommentBibleAddressRegExp)
  );

  return isWasOpenComWithBibleAddressInComment;
};
