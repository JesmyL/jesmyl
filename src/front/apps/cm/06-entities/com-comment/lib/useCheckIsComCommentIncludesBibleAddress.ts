import { CmComCommentBlockSpecialSelector, CmComWidDef } from 'shared/api';
import { CmCom } from 'shared/const/cm/Com';
import { cmComCommentHeadBibleAddressRegExp } from '../utils/commentHeadBibleAddressRegExp';
import { useCmComCommentTextBlockTakerWithoutComments } from './useCmComCommentBlock';

let isWasOpenComWithBibleAddressInComment = false;

export const useCmComCommentCheckIsIncludesBibleAddress = (com: CmCom | und) => {
  const comw = com?.wid ?? CmComWidDef;
  const takeCommentTexts = useCmComCommentTextBlockTakerWithoutComments(comw);

  if (isWasOpenComWithBibleAddressInComment) return true;
  const comment = takeCommentTexts(CmComCommentBlockSpecialSelector.Head)?.join('\n') || '';

  isWasOpenComWithBibleAddressInComment = !!(com && comment?.match(cmComCommentHeadBibleAddressRegExp.regExp));

  return isWasOpenComWithBibleAddressInComment;
};
