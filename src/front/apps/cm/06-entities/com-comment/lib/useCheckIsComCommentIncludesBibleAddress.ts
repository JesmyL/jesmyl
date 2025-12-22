import { CmComWid } from 'shared/api';
import { CmCom } from '../../com/lib/Com';
import { cmComCommentHeadBibleAddressRegExp } from '../utils/commentHeadBibleAddressRegExp';
import { useCmComCommentBlock } from './useCmComCommentBlock';

let isWasOpenComWithBibleAddressInComment = false;

export const useCmComCommentCheckIsIncludesBibleAddress = (com: CmCom | und) => {
  const { takeCommentTexts } = useCmComCommentBlock(com?.wid ?? CmComWid.def);

  if (isWasOpenComWithBibleAddressInComment) return true;
  const comment = takeCommentTexts('head')?.join('\n') || '';

  isWasOpenComWithBibleAddressInComment = !!(com && comment?.match(cmComCommentHeadBibleAddressRegExp.regExp));

  return isWasOpenComWithBibleAddressInComment;
};
