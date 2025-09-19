import { useCmComCommentBlock } from '$cm/basis/lib/store/useCmComCommentBlock';
import { CmComWid } from 'shared/api';
import { Com } from '../../Com';
import { ComBlockCommentMakerCleans } from './Cleans';

let isWasOpenComWithBibleAddressInComment = false;

export const useCheckIsComCommentIncludesBibleAddress = (com: Com | und) => {
  const { takeCommentTexts } = useCmComCommentBlock(com?.wid ?? CmComWid.def);

  if (isWasOpenComWithBibleAddressInComment) return true;
  const comment = takeCommentTexts('head')?.join('\n') || '';

  isWasOpenComWithBibleAddressInComment = !!(
    com && comment?.match(ComBlockCommentMakerCleans.commentHeadBibleAddressRegExp.regExp)
  );

  return isWasOpenComWithBibleAddressInComment;
};
