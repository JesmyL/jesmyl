import { CmComWid } from 'shared/api';
import { CmCom } from '../../com/lib/Com';
import { CmComCommentMakerCleans } from './Cleans';
import { useCmComCommentBlock } from './useCmComCommentBlock';

let isWasOpenComWithBibleAddressInComment = false;

export const useCmComCommentCheckIsIncludesBibleAddress = (com: CmCom | und) => {
  const { takeCommentTexts } = useCmComCommentBlock(com?.wid ?? CmComWid.def);

  if (isWasOpenComWithBibleAddressInComment) return true;
  const comment = takeCommentTexts('head')?.join('\n') || '';

  isWasOpenComWithBibleAddressInComment = !!(
    com && comment?.match(CmComCommentMakerCleans.commentHeadBibleAddressRegExp.regExp)
  );

  return isWasOpenComWithBibleAddressInComment;
};
