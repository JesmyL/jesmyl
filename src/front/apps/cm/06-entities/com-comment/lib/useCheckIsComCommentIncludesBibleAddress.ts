import { CmCom } from '$cm/ext';
import { CmComCommentBlockSpecialSelector, CmComWid } from 'shared/api';
import { cmComCommentHeadBibleAddressRegExp } from '../utils/commentHeadBibleAddressRegExp';
import { useCmComCommentTextBlockTakerWithoutComments } from './useCmComCommentBlock';

let isWasOpenComWithBibleAddressInComment = false;

export const useCmComCommentCheckIsIncludesBibleAddress = (com: CmCom | und) => {
  const comw = com?.wid ?? CmComWid.def;
  const takeCommentTexts = useCmComCommentTextBlockTakerWithoutComments(comw);

  if (isWasOpenComWithBibleAddressInComment) return true;
  const comment = takeCommentTexts(CmComCommentBlockSpecialSelector.Head)?.join('\n') || '';

  isWasOpenComWithBibleAddressInComment = !!(com && comment?.match(cmComCommentHeadBibleAddressRegExp.regExp));

  return isWasOpenComWithBibleAddressInComment;
};
