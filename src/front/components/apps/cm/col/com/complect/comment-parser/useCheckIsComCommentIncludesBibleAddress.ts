import { CmComWid } from '../../../../../../../../shared/api/complect/apps/cm/complect/enums';
import { useComCommentText } from '../../../../com-comments-manager';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';

let isWasOpenComWithBibleAddressInComment = false;

export const useCheckIsComCommentIncludesBibleAddress = (com: Com | und) => {
  const comment = useComCommentText(com?.wid ?? CmComWid.def);

  if (isWasOpenComWithBibleAddressInComment) return true;

  isWasOpenComWithBibleAddressInComment = !!(
    com && comment?.match(ComBlockCommentMakerCleans.firstCommentBibleAddressRegExp)
  );

  return isWasOpenComWithBibleAddressInComment;
};
